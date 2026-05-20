import { faqItems } from "@/components/sections/faq-data";

const SITE_URL = "https://makicalls.com";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MakiCalls",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description:
    "Türkiye'nin AI çağrı merkezi ve sesli asistan platformu. Telefonu cevaplayan yapay zeka, WhatsApp ve Instagram chatbotu.",
  email: "info@makicalls.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "İstanbul",
    addressCountry: "TR",
  },
  areaServed: { "@type": "Country", name: "Türkiye" },
  sameAs: ["https://www.instagram.com/makicalls/"],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: "MakiCalls",
  inLanguage: "tr-TR",
  publisher: { "@type": "Organization", name: "MakiCalls" },
};

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Çağrı Merkezi ve Sesli Asistan",
  provider: { "@type": "Organization", name: "MakiCalls", url: SITE_URL },
  areaServed: { "@type": "Country", name: "Türkiye" },
  audience: { "@type": "BusinessAudience", audienceType: "Klinikler, KOBİ" },
  description:
    "Türkçe konuşan AI sesli asistan, WhatsApp ve Instagram chatbot. Randevu açar, soru cevaplar, müşteriyi kaçırmaz.",
  url: `${SITE_URL}#hizmetler`,
};

const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function JsonLd() {
  const blocks = [organization, website, service, faq];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // schema.org JSON-LD content — not user-derived, safe to inject
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
