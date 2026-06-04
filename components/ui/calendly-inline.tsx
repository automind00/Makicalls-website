"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

interface CalendlyInlineProps {
  /** Calendly event URL, e.g. https://calendly.com/ekremhndolu/30min */
  url: string;
  /** px height of the embed. Calendly recommends ~700 for the booking flow. */
  height?: number;
  className?: string;
}

declare global {
  interface Window {
    Calendly?: {
      initInlineWidgets?: () => void;
      initInlineWidget?: (opts: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

/**
 * Calendly inline embed — booking takes place ON the site, no redirect.
 * Uses Calendly's auto-init pattern (`.calendly-inline-widget` + data-url) so
 * the script picks up the widget itself; a manual fallback re-init also runs
 * after mount in case the script loaded before the div existed.
 *
 * Theming params: dark background (#0a0a0a), white text, violet brand.
 */
export function CalendlyInline({
  url,
  height = 720,
  className = "",
}: CalendlyInlineProps) {
  const themedUrl = `${url}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=8b5cf6`;
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  // Belt-and-suspenders: if the script already loaded before this mounted, or
  // auto-init missed our div, call init manually. Then watch for the iframe
  // Calendly injects; if it never appears after 8s, surface a fallback link.
  useEffect(() => {
    let cancelled = false;

    const tryInit = () => {
      const cal = window.Calendly;
      if (!cal || !widgetRef.current) return false;
      if (cal.initInlineWidget) {
        cal.initInlineWidget({
          url: themedUrl,
          parentElement: widgetRef.current,
        });
        return true;
      }
      if (cal.initInlineWidgets) {
        cal.initInlineWidgets();
        return true;
      }
      return false;
    };

    const interval = setInterval(() => {
      if (cancelled) return;
      if (widgetRef.current?.querySelector("iframe")) {
        clearInterval(interval);
        return;
      }
      tryInit();
    }, 300);

    const timeout = setTimeout(() => {
      if (cancelled) return;
      if (!widgetRef.current?.querySelector("iframe")) {
        setFailed(true);
      }
      clearInterval(interval);
    }, 8000);

    return () => {
      cancelled = true;
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [themedUrl]);

  return (
    <>
      {/* Calendly's stylesheet — Next will hoist this to <head> */}
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <div className={`relative w-full ${className}`}>
        <div
          ref={widgetRef}
          className="calendly-inline-widget w-full"
          data-url={themedUrl}
          style={{ minWidth: 320, height }}
        />
        {failed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-[color:var(--color-page)]">
            <p className="text-[color:var(--color-fg-muted)] mb-4">
              Takvim yüklenemedi. Yeni sekmede deneyebilirsiniz:
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand hover:bg-brand-deep text-white font-semibold transition-colors"
            >
              Calendly&apos;de Aç
            </a>
          </div>
        )}
      </div>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
