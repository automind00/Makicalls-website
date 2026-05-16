import React from "react";
import { dentalFaqJsonLd } from "./dental-faq";

const SITE_URL = "https://makicalls.com";

export default function DentalJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "MakiCalls",
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.svg`,
        sameAs: ["https://www.instagram.com/makicalls/"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          availableLanguage: ["Turkish", "English"],
          areaServed: "TR",
        },
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/dis-klinikleri#service`,
        name: "AI Resepsiyonist — Diş Klinikleri",
        serviceType: "AI Receptionist",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "City", name: "İstanbul" },
        audience: { "@type": "BusinessAudience", audienceType: "Diş klinikleri" },
        description:
          "İstanbul diş klinikleri için 7/24 çalışan AI çağrı asistanı. Sesli arama, WhatsApp, web chat ve Instagram DM tek asistandan yönetilir.",
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: "200",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "200",
            priceCurrency: "USD",
            unitText: "MONTH",
          },
          eligibleQuantity: { "@type": "QuantitativeValue", value: 3 },
          description:
            "Pilot programı: $500 tek seferlik kurulum + $200/ay (ilk 3 ay sabit). İlk 3 İstanbul kliniği için geçerli.",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/dis-klinikleri#faq`,
        mainEntity: dentalFaqJsonLd,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Diş Klinikleri İçin AI Resepsiyonist",
            item: `${SITE_URL}/dis-klinikleri`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
