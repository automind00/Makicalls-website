import { faqItems } from "@/components/sections/faq-data";

const SITE_URL = "https://makicalls.com";
const LOGO_URL = `${SITE_URL}/logo`; // 512x512 PNG endpoint

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: "MakiCalls",
  alternateName: ["Maki Calls", "MakiCalls AI"],
  url: SITE_URL,
  // Google Knowledge Graph için ImageObject formatı — sadece URL string yetmez,
  // boyut bilgisi şart. 512x512 kare logo, sırf bu amaç için /logo endpoint'i.
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: 512,
    height: 512,
    caption: "MakiCalls",
  },
  image: LOGO_URL,
  description:
    "Türkiye'nin AI çağrı merkezi ve sesli asistan platformu. Telefonu cevaplayan yapay zeka, WhatsApp ve Instagram chatbotu.",
  slogan: "Çalmayan telefon, kaçan müşteri demek",
  email: "info@makicalls.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "İstanbul",
    addressCountry: "TR",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "info@makicalls.com",
      areaServed: "TR",
      availableLanguage: ["Turkish", "English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "destek@makicalls.com",
      areaServed: "TR",
      availableLanguage: ["Turkish"],
    },
  ],
  areaServed: { "@type": "Country", name: "Türkiye" },
  // sameAs — Google'a "bu marka şu hesaplarda" sinyali verir, Knowledge Graph eşleştirir.
  // Kullanıcı yeni hesap açtıkça buraya eklenmeli.
  sameAs: [
    "https://www.instagram.com/makicalls/",
    // "https://www.linkedin.com/company/makicalls",
    // "https://twitter.com/makicalls",
    // "https://www.youtube.com/@makicalls",
    // "https://www.facebook.com/makicalls",
  ],
  knowsAbout: [
    "AI Çağrı Merkezi",
    "Türkçe Sesli Asistan",
    "WhatsApp Chatbot",
    "Instagram Chatbot",
    "Randevu Otomasyonu",
    "Müşteri İletişim Otomasyonu",
  ],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: "MakiCalls",
  inLanguage: "tr-TR",
  publisher: { "@id": `${SITE_URL}#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Çağrı Merkezi ve Sesli Asistan",
  provider: { "@id": `${SITE_URL}#organization` },
  areaServed: { "@type": "Country", name: "Türkiye" },
  audience: { "@type": "BusinessAudience", audienceType: "Klinikler, KOBİ" },
  description:
    "Türkçe konuşan AI sesli asistan, WhatsApp ve Instagram chatbot. Randevu açar, soru cevaplar, müşteriyi kaçırmaz.",
  url: `${SITE_URL}/#hizmetler`,
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
