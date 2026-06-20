"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useIsAnalyticsAllowed } from "@/lib/use-consent";

/**
 * Google Analytics 4 (GA4) entegrasyonu — consent-aware.
 *
 * Sadece kullanıcı "accepted" verdiyse yüklenir. "essential" veya
 * karar verilmemiş durumda hiçbir GA script çalışmaz.
 *
 * Çalışması için:
 *   1. https://analytics.google.com → yeni property oluştur (GA4)
 *   2. Tracking ID'yi al: G-XXXXXXXXXX formatında
 *   3. Vercel → Project → Settings → Environment Variables'a ekle:
 *        NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
 *   4. Re-deploy — kullanıcı "Tümünü Kabul Et" dedikten sonra Realtime
 *      raporda veri görünmeye başlar
 *
 * KVKK uyumu için anonymize_ip on, cookie_flags Secure.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Custom event tetiklemek için: `track("demo_request", { source: "hero" })` */
export function track(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params ?? {});
}

/** Sayfa görüntülemesini manuel tetikler (route değiştiğinde). */
function trackPageview(url: string) {
  if (!GA_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", GA_ID, { page_path: url });
}

/** Next.js client-side route change'lerinde pageview tetikleyici */
function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID) return;
    const qs = searchParams?.toString();
    const url = pathname + (qs ? `?${qs}` : "");
    trackPageview(url);
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  const analyticsAllowed = useIsAnalyticsAllowed();

  // GA_ID env yok ya da consent verilmedi → hiçbir script yüklenmez
  if (!GA_ID || !analyticsAllowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'SameSite=Lax;Secure'
          });
        `}
      </Script>
      <RouteChangeTracker />
    </>
  );
}
