import { ImageResponse } from "next/og";

// Apple touch icon (180x180) — iOS ana ekrana eklenince çıkar,
// Google bazı surface'larda buna da bakar.

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 60%, #6d28d9 100%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 110,
          fontWeight: 900,
          letterSpacing: "-0.05em",
          borderRadius: 40,
        }}
      >
        M
      </div>
    ),
    { ...size },
  );
}
