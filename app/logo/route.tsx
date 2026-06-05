import { ImageResponse } from "next/og";

// 512x512 PNG logo endpoint — schema.org Organization.logo bunu kullanır.
// Google Knowledge Graph kare logo bekler; içinde markanın tam wordmark'ı:
// beyaz "Maki" + mor "Calls", koyu zemin üzerinde.
export const runtime = "edge";

export async function GET() {
  const img = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Mor parıltı */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 380,
            height: 380,
            background:
              "radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0) 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 110,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
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
    { width: 512, height: 512 },
  );

  img.headers.set(
    "Cache-Control",
    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
  );
  return img;
}
