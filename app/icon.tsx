import { ImageResponse } from "next/og";

// Next.js app icon convention — bu dosya otomatik olarak /icon endpoint'i olur
// ve <link rel="icon"> tag'ini head'e yerleştirir.
// Google favicon best practice: en az 48x48, multiples of 48 önerilir.
// 96x96 seçtik — Google'ın doğru ölçeklemesi için yeterli ve hızlı.

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 64,
          fontWeight: 900,
          letterSpacing: "-0.05em",
          borderRadius: 20,
        }}
      >
        M
      </div>
    ),
    { ...size },
  );
}
