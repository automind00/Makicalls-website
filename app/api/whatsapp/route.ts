import crypto from "crypto";
import { generateReply } from "@/lib/makicalls-assistant";

export const runtime = "nodejs";
export const maxDuration = 30;

const API_VERSION = process.env.WHATSAPP_API_VERSION || "v21.0";

type WhatsAppMessage = { from: string; type: string; text?: { body?: string } };
type WhatsAppWebhook = {
  entry?: { changes?: { value?: { messages?: WhatsAppMessage[] } }[] }[];
};

// Gönderen başına basit hız limiti (instance bazlı, maliyet/spam koruması).
const RATE_LIMIT = 12; // mesaj
const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(sender: string): boolean {
  const now = Date.now();
  const rec = hits.get(sender);
  if (!rec || now > rec.resetAt) {
    hits.set(sender, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > RATE_LIMIT;
}

/**
 * GET — Meta webhook doğrulaması.
 * Meta, kurulum sırasında hub.verify_token gönderir; eşleşirse hub.challenge'ı geri döneriz.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge ?? "", { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

function verifySignature(raw: string, header: string | null): boolean {
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret) return true; // secret tanımlı değilse imza kontrolünü atla (test modu)
  if (!header) return false;
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(raw).digest("hex");
  try {
    const a = Buffer.from(header);
    const b = Buffer.from(expected);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

async function sendWhatsApp(to: string, body: string) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId) {
    console.warn("[whatsapp] WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID tanımlı değil — yanıt gönderilemedi.");
    return;
  }
  const res = await fetch(`https://graph.facebook.com/${API_VERSION}/${phoneId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: body.slice(0, 4000), preview_url: false },
    }),
  });
  if (!res.ok) {
    console.error("[whatsapp] gönderim hatası:", res.status, await res.text().catch(() => ""));
  }
}

/**
 * POST — gelen WhatsApp mesajları.
 * Meta'nın tekrar denemesini önlemek için her durumda hızlıca 200 döneriz.
 */
export async function POST(req: Request) {
  const raw = await req.text();

  if (!verifySignature(raw, req.headers.get("x-hub-signature-256"))) {
    return new Response("Forbidden", { status: 403 });
  }

  let body: WhatsAppWebhook;
  try {
    body = JSON.parse(raw) as WhatsAppWebhook;
  } catch {
    return new Response("ok", { status: 200 });
  }

  try {
    // value.messages[] -> sadece metin mesajlarını işle
    const msg = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (msg && msg.type === "text" && msg.text?.body) {
      const from = msg.from;
      if (!rateLimited(from)) {
        const text = msg.text.body.slice(0, 2000);
        const reply = await generateReply([{ role: "user", content: text }]);
        await sendWhatsApp(from, reply);
      }
    }
  } catch (err) {
    console.error("[whatsapp] işleme hatası:", err);
  }

  return new Response("ok", { status: 200 });
}
