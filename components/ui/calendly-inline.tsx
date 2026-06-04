"use client";

import { useEffect, useRef } from "react";

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
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
      }) => void;
    };
  }
}

/**
 * Calendly inline embed — booking takes place ON the site, no redirect.
 * Themed against the Makicalls dark / violet palette via Calendly query params.
 */
export function CalendlyInline({
  url,
  height = 720,
  className = "",
}: CalendlyInlineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);

  // Calendly accepts theming via query params on the embed URL.
  // 0a0a0a = --bg-page, ffffff = --text-primary, 8b5cf6 = --brand
  const themedUrl = `${url}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=8b5cf6`;

  useEffect(() => {
    if (initializedRef.current || !containerRef.current) return;

    const SCRIPT_ID = "calendly-widget-script";
    const STYLE_ID = "calendly-widget-style";

    // Calendly's official stylesheet (rendered controls only — does not override our colors)
    if (!document.getElementById(STYLE_ID)) {
      const link = document.createElement("link");
      link.id = STYLE_ID;
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    const mount = () => {
      if (!containerRef.current || initializedRef.current) return;
      if (!window.Calendly) return;
      window.Calendly.initInlineWidget({
        url: themedUrl,
        parentElement: containerRef.current,
      });
      initializedRef.current = true;
    };

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      if (window.Calendly) mount();
      else existing.addEventListener("load", mount, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.addEventListener("load", mount, { once: true });
    document.body.appendChild(script);
  }, [themedUrl]);

  return (
    <div
      ref={containerRef}
      className={`calendly-inline-widget w-full rounded-3xl overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-page)] ${className}`}
      style={{ minWidth: 320, height }}
    />
  );
}
