import {
  ASSISTANT_MODEL,
  ASSISTANT_MAX_TOKENS,
  SYSTEM_PROMPT,
  WHATSAPP_DISPLAY as WA,
  getAnthropic,
  type AssistantMessage as ClientMessage,
} from "@/lib/makicalls-assistant";

export const runtime = "nodejs";
export const maxDuration = 30;

// Per-IP rate limit (in-memory, per server instance — yeterli basit koruma).
const RATE_LIMIT = 25; // istek
const WINDOW_MS = 60_000; // 60 sn
const hits = new Map<string, { count: number; resetAt: number }>();

function getIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > RATE_LIMIT;
}

function textResponse(text: string, status = 200): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
  return new Response(stream, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}

const FALLBACK = `Merhaba! 👋 Şu an canlı asistanımız geçici olarak bağlı değil. Sorularınız için WhatsApp'tan yazabilir (${WA}) veya sayfadaki "Canlı Demo Talep Et" formunu doldurabilirsiniz — en kısa sürede dönüş yaparız.`;

export async function POST(req: Request) {
  const ip = getIp(req);
  if (rateLimited(ip)) {
    return textResponse(
      `Çok fazla mesaj gönderildi, lütfen biraz sonra tekrar deneyin. Acil sorular için WhatsApp: ${WA}.`,
    );
  }

  let body: { messages?: ClientMessage[] };
  try {
    body = await req.json();
  } catch {
    return textResponse("Geçersiz istek.", 400);
  }

  const messages = (body.messages ?? [])
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return textResponse("Geçersiz mesaj.", 400);
  }

  const client = getAnthropic();
  if (!client) {
    return textResponse(FALLBACK);
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const llm = client.messages.stream({
          model: ASSISTANT_MODEL,
          max_tokens: ASSISTANT_MAX_TOKENS,
          system: [
            {
              type: "text",
              text: SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages,
        });

        for await (const event of llm) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        console.error("[api/chat] error:", err);
        controller.enqueue(
          encoder.encode(
            `\n\nÜzgünüm, bir hata oluştu. WhatsApp'tan yazabilirsiniz: ${WA}.`,
          ),
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
