import { ImageResponse } from "next/og";
import { SECTORS_BY_SLUG } from "@/lib/sectors";

// Sektöre özel Open Graph görseli — link WhatsApp/LinkedIn/Twitter'da
// paylaşıldığında bu görsel çıkar. Kök `/opengraph-image.tsx`'teki genel
// görsel yerine, o sektörün kendi adı ve derdiyle kişiselleştirilmiş.

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MakiCalls sektör asistanı";

export default async function SectorOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = SECTORS_BY_SLUG[slug];

  const eyebrow = sector?.hero.badge ?? "AI Çağrı Merkezi";
  const heading = sector
    ? `${sector.hero.titleStart} ${sector.hero.titleMid} ${sector.hero.titleEnd}`
    : "MakiCalls";
  const painTitle = sector?.pains[0]?.title;

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
          padding: "0 90px",
        }}
      >
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#a78bfa",
            zIndex: 1,
            marginBottom: 28,
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            color: "#ffffff",
            textAlign: "center",
            zIndex: 1,
            maxWidth: 1000,
          }}
        >
          {heading}
        </div>

        {painTitle && (
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#94a3b8",
              zIndex: 1,
              marginTop: 28,
              textAlign: "center",
              maxWidth: 900,
            }}
          >
            {painTitle}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            bottom: 50,
            display: "flex",
            alignItems: "baseline",
            fontSize: 40,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            zIndex: 1,
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
      </div>
    ),
    { ...size },
  );
}
