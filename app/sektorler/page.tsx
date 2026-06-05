import type { Metadata } from "next";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import SectorShowcase from "@/components/sections/sector-showcase";

const SITE_URL = "https://makicalls.com";
const PAGE_URL = `${SITE_URL}/sektorler`;
const PAGE_TITLE = "Sektörler | MakiCalls — Sektöre Özel AI Müşteri Asistanları";
const PAGE_DESCRIPTION =
  "Diş kliniği, otel, saç ekimi, estetik, sağlık turizmi, araç kiralama, e-ticaret, gayrimenkul — her sektörün gerçek derdine özel kurulmuş AI asistan çözümleri.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "sektörel AI asistan",
    "AI müşteri hizmetleri sektör",
    "diş kliniği AI",
    "otel AI",
    "saç ekimi AI",
    "estetik klinik AI",
    "e-ticaret chatbot",
    "gayrimenkul AI",
    "MakiCalls sektörler",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: PAGE_URL,
    siteName: "MakiCalls",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: PAGE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function SectorsIndexPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <SectorShowcase />
      </main>
      <Footer />
    </>
  );
}
