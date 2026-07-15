import { ImageResponse } from "next/og";
import { POSTS_BY_SLUG } from "@/lib/blog";

// Blog yazısına özel Open Graph görseli — link paylaşıldığında
// generic marka kartı yerine yazının kendi başlığı çıkar.

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MakiCalls blog yazısı";

export default async function BlogPostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS_BY_SLUG[slug];

  const eyebrow = post?.tags[0] ?? "MakiCalls Blog";
  const heading = post?.title ?? "MakiCalls Blog";
  const readingTime = post?.readingTime;

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
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            color: "#ffffff",
            textAlign: "center",
            zIndex: 1,
            maxWidth: 1000,
          }}
        >
          {heading}
        </div>

        {readingTime && (
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#94a3b8",
              zIndex: 1,
              marginTop: 28,
            }}
          >
            {readingTime} okuma
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
