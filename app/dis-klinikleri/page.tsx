import type { Metadata } from "next";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import TrustStrip from "@/components/sections/trust-strip";
import Integrations from "@/components/sections/integrations";
import DentalHero from "@/components/dental/dental-hero";
import PainPoints from "@/components/dental/pain-points";
import Omnichannel from "@/components/dental/omnichannel";
import ProcessSteps from "@/components/dental/process-steps";
import RevenueCalculator from "@/components/dental/revenue-calculator";
import DentalFaq from "@/components/dental/dental-faq";
import PilotForm from "@/components/dental/pilot-form";
import DentalJsonLd from "@/components/dental/dental-jsonld";

const SITE_URL = "https://makicalls.com";
const PAGE_URL = `${SITE_URL}/dis-klinikleri`;
const PAGE_TITLE = "İstanbul Diş Klinikleri İçin AI Resepsiyonist";
const PAGE_DESCRIPTION =
  "Kliniğinizin telefonunu 7/24 açan AI asistan. Mesai dışı kaçırılan randevular yok yere kayıp olmasın — Türkçe konuşur, randevu defterinize entegre olur, hasta düşürmez.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "diş kliniği AI asistan",
    "AI resepsiyonist",
    "diş kliniği randevu otomasyonu",
    "İstanbul diş kliniği yazılım",
    "klinik çağrı merkezi",
    "MakiCalls",
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

export default function DentalLandingPage() {
  return (
    <>
      <DentalJsonLd />
      <Navbar />
      <main className="flex-1">
        <DentalHero />
        <TrustStrip />
        <PainPoints />
        <Omnichannel />
        <ProcessSteps />
        <RevenueCalculator />
        <Integrations />
        <DentalFaq />
        <PilotForm />
      </main>
      <Footer />
    </>
  );
}
