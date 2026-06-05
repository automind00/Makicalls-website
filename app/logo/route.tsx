import { ImageResponse } from "next/og";

// 512x512 PNG logo endpoint — schema.org Organization.logo bunu kullanır.
// Google Knowledge Graph kare, en az 112x112 PNG ister; biz 512 veriyoruz.
// Cache: 1 saat browser + 24 saat CDN (edge).
export const runtime = "edge";

export async function GET() {
  const img = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 60%, #6d28d9 100%)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-0.04em",
        }}
      >
        <div style={{ fontSize: 360, fontWeight: 900, lineHeight: 1 }}>M</div>
      </div>
    ),
    { width: 512, height: 512 },
  );

  // ImageResponse zaten Response döner; cache header'larını override edelim
  img.headers.set(
    "Cache-Control",
    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
  );
  return img;
}
