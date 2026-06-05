import type { MetadataRoute } from "next";

// Web App Manifest — Google ve diğer tarayıcılar logo bilgisini buradan da
// alır. PWA özellikleri için de gerekli. icons array'i schema.org'un yanı
// sıra tarayıcının "Add to Home Screen" deneyiminde de kullanılır.

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MakiCalls",
    short_name: "MakiCalls",
    description:
      "Türkiye'nin AI çağrı merkezi ve Türkçe sesli asistan platformu.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#8b5cf6",
    lang: "tr-TR",
    icons: [
      {
        src: "/icon",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
