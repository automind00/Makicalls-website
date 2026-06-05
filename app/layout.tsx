import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  // Not: app/icon.tsx ve app/apple-icon.tsx Next.js convention'i ile otomatik
  // <link rel="icon"> ve apple touch icon eklerler. Aşağıda ekstra olarak
  // SVG fallback + yüksek çözünürlüklü PNG logo veriyoruz (Google tercih eder).
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "32x32", type: "image/png" },
      { url: "/logo", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MakiCalls — AI Çağrı Merkezi ve Türkçe Sesli Asistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
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
        <Analytics />
      </body>
    </html>
  );
}
