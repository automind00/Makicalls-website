import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import VercelAnalyticsConsentAware from "@/components/analytics/vercel-analytics";
import CookieBanner from "@/components/analytics/cookie-banner";
import StickyMobileCta from "@/components/sections/sticky-mobile-cta";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://makicalls.com";
const SITE_NAME = "MakiCalls";
const SITE_TITLE = "MakiCalls — AI Çağrı Merkezi & Türkçe Sesli Asistan";
const SITE_DESCRIPTION =
  "Telefonu cevaplayan AI sesli asistan, WhatsApp ve Instagram chatbotu. 7/24 Türkçe konuşur, randevu açar, müşteriyi kaçırmaz.";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | MakiCalls",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI çağrı merkezi",
    "yapay zeka çağrı merkezi",
    "AI sesli asistan",
    "Türkçe sesli AI",
    "AI telefon asistanı",
    "AI resepsiyonist",
    "sanal çağrı merkezi",
    "çağrı merkezi otomasyonu",
    "WhatsApp chatbot",
    "Instagram chatbot",
    "Türkçe chatbot",
    "müşteri otomasyonu",
    "randevu botu",
    "MakiCalls",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  // Not: app/icon.tsx (96x96), app/apple-icon.tsx (180x180), app/logo (512x512)
  // Next.js convention'i ile otomatik <link rel="icon"> ekliyorlar.
  // Burada ek olarak SVG fallback + sıralama veriyoruz.
  // Sıralama önemli: Google ilk tanıdığı uygun boyutu tercih eder.
  icons: {
    icon: [
      { url: "/icon", sizes: "96x96", type: "image/png" },
      { url: "/logo", sizes: "512x512", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: { url: "/icon", type: "image/png" },
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  // openGraph.images ve twitter.images burada belirtilmiyor —
  // app/opengraph-image.tsx Next.js convention'i ile otomatik
  // /opengraph-image endpoint'i üretir ve meta tag'lerini ekler.
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[color:var(--color-page)] text-[color:var(--color-fg)]">
        {children}
        {/* Analytics — sadece consent verildiyse yüklenir (KVKK uyumu) */}
        <VercelAnalyticsConsentAware />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        {/* Mobile sticky CTA — consent kararı sonrası görünür */}
        <Suspense fallback={null}>
          <StickyMobileCta />
        </Suspense>
        {/* KVKK consent banner — karar verilmedikçe görünür */}
        <CookieBanner />
      </body>
    </html>
  );
}
