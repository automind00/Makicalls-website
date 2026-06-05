import { ImageResponse } from "next/og";

// Open Graph image — Twitter, LinkedIn, WhatsApp, Facebook'ta link
// paylaşıldığında bu görsel çıkar. Next.js auto-detect eder ve OG meta
// tag'lerine bunu yerleştirir.

export const runtime = "edge";
export const alt = "MakiCalls — AI Çağrı Merkezi & Türkçe Sesli Asistan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Mor radial glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            height: 900,
            background:
              "radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0) 65%)",
            borderRadius: "50%",
          }}
        />
        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 200,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            zIndex: 1,
            marginBottom: 32,
          }}
        >
          <span style={{ color: "#ffffff" }}>Maki</span>
          <span
            style={{
              background:
                "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 60%, #7c3aed 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Calls
          </span>
        </div>
        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#94a3b8",
            zIndex: 1,
            letterSpacing: "-0.01em",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          AI Çağrı Merkezi · Türkçe Sesli Asistan · WhatsApp & Instagram Bot
        </div>
        {/* Alt vurgu çubuğu */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 24,
            zIndex: 1,
            fontSize: 22,
            color: "#a78bfa",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          <span>7/24 cevaplar</span>
          <span style={{ color: "#475569" }}>·</span>
          <span>Randevu açar</span>
          <span style={{ color: "#475569" }}>·</span>
          <span>Müşteri kaçırmaz</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
