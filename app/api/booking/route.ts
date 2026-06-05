import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 15;

const ADMIN_EMAIL = "ekremhndolu@gmail.com";

// Per-IP rate limit (simple in-memory, abuse protection)
const RATE_LIMIT = 8;
const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; resetAt: number }>();

function getIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const slot = hits.get(ip);
  if (!slot || slot.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  slot.count += 1;
  return slot.count > RATE_LIMIT;
}

interface BookingPayload {
  name: string;
  email: string;
  phone?: string;
  clinic?: string;
  notes?: string;
  date: string; // formatted, e.g. "15 Haziran 2026 Pazartesi"
  time: string; // "14:00"
}

function isValid(p: unknown): p is BookingPayload {
  if (!p || typeof p !== "object") return false;
  const o = p as Record<string, unknown>;
  return (
    typeof o.name === "string" &&
    o.name.trim().length > 1 &&
    typeof o.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o.email) &&
    typeof o.date === "string" &&
    typeof o.time === "string"
  );
}

async function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return await Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timeout`)), ms),
    ),
  ]);
}

/** Try writing the booking to Supabase. Best-effort — never throws. */
async function writeToSupabase(payload: BookingPayload, userAgent: string | null) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { ok: false, skipped: true, reason: "env-missing" };

  const composedMessage = [
    `RANDEVU TALEBİ`,
    `Tarih: ${payload.date}`,
    `Saat: ${payload.time}`,
    payload.phone ? `Telefon: ${payload.phone}` : null,
    payload.notes ? `\nNot: ${payload.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const supa = createClient(url, key, { auth: { persistSession: false } });
    const insert = supa.from("contact_submissions").insert({
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      company: payload.clinic?.trim() || null,
      message: composedMessage,
      user_agent: userAgent,
    });
    const { error } = await withTimeout(
      Promise.resolve(insert),
      6_000,
      "supabase",
    );
    if (error) return { ok: false, error: error.message, code: error.code };
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg };
  }
}

/** Email fallback via Formsubmit — survives Supabase outage. Best-effort. */
async function sendEmailFallback(payload: BookingPayload) {
  try {
    const body = {
      _subject: `Yeni Randevu — ${payload.name} (${payload.date} ${payload.time})`,
      _captcha: "false",
      _template: "table",
      "Ad Soyad": payload.name,
      "E-posta": payload.email,
      Telefon: payload.phone ?? "-",
      Klinik: payload.clinic ?? "-",
      Tarih: payload.date,
      Saat: payload.time,
      Not: payload.notes ?? "-",
    };
    const res = await withTimeout(
      fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }),
      6_000,
      "formsubmit",
    );
    if (!res.ok) return { ok: false, status: res.status };
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg };
  }
}

export async function POST(req: Request) {
  const ip = getIp(req);
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Çok hızlı deniyorsunuz. Lütfen biraz bekleyin." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Geçersiz istek" }, { status: 400 });
  }

  if (!isValid(payload)) {
    return Response.json(
      { ok: false, error: "Lütfen adınızı, e-postanızı, tarih ve saati doldurun." },
      { status: 400 },
    );
  }

  const userAgent = req.headers.get("user-agent");

  // Run both sinks in parallel — neither is allowed to block the user.
  const [supaResult, emailResult] = await Promise.all([
    writeToSupabase(payload, userAgent),
    sendEmailFallback(payload),
  ]);

  // Log every booking — visible in Vercel function logs even when DB is down.
  console.log(
    "[booking]",
    JSON.stringify({
      ip,
      payload: { ...payload, userAgent },
      supaResult,
      emailResult,
      ts: new Date().toISOString(),
    }),
  );

  // We consider the request successful if at LEAST ONE sink worked, OR
  // both failed but the failure is recoverable (logs still have it).
  // For the user's UX we always return ok unless both completely silent-failed.
  const anyOk = supaResult.ok || emailResult.ok;

  return Response.json({
    ok: true,
    storedInDb: supaResult.ok,
    emailedAdmin: emailResult.ok,
    bestEffortNote: anyOk
      ? undefined
      : "Veriler loglara yazıldı, admin manuel olarak takip edecek.",
  });
}
