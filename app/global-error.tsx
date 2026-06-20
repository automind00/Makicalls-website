"use client";

/**
 * Global error boundary — Next.js convention.
 * Layout/root seviyesinde hata yakalanırsa bu sayfa render edilir.
 * Kendi <html> + <body>'sini içerir çünkü root layout fail durumunda
 * olabilir.
 *
 * Daha lokalize hatalar için ileride bölüm bazlı error.tsx eklenebilir.
 */

import { useEffect } from "react";
import { ArrowRight, Home, RefreshCw, AlertOctagon } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hata Vercel function loglarına düşer — admin bakabilir
    // (Sentry vs. eklenebilir ileride)
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="tr" className="dark h-full antialiased">
      <body
        style={{
          minHeight: "100vh",
          background: "#0a0a0a",
          color: "#ffffff",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          margin: 0,
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 400,
            background:
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 65%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 560,
            width: "100%",
          }}
        >
          {/* Icon */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "rgba(244, 63, 94, 0.1)",
              border: "1px solid rgba(244, 63, 94, 0.3)",
              color: "#f43f5e",
              marginBottom: 24,
            }}
          >
            <AlertOctagon style={{ width: 32, height: 32 }} />
          </div>

          {/* Badge */}
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "#a78bfa",
              marginBottom: 16,
            }}
          >
            500 · Beklenmeyen Hata
          </span>

          {/* Title */}
          <h1
            style={{
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Bir şeyler ters gitti.
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: "#94a3b8",
              marginBottom: 32,
              maxWidth: 440,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Sayfayı yüklerken beklenmeyen bir hata oluştu. Sorunu kayıt ettik
            ve inceliyoruz. Bu arada sayfayı yenileyebilir veya ana sayfaya
            dönebilirsin.
          </p>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 28px",
                minHeight: 52,
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 600,
                color: "#ffffff",
                background:
                  "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 60%, #7c3aed 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow:
                  "0 12px 40px -10px rgba(139,92,246,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
            >
              <RefreshCw style={{ width: 18, height: 18 }} />
              Tekrar Dene
            </button>
            {/*
              global-error sayfasında <a> kullanıyoruz çünkü Next.js
              Link bileşeni root layout'a bağlı; root fail olunca güvenli değil.
              Bu sayfa zaten hard reload trigger ediyor.
            */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 28px",
                minHeight: 52,
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 500,
                color: "#cbd5e1",
                background: "rgba(17, 17, 17, 0.6)",
                border: "1px solid rgba(255,255,255,0.18)",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <Home style={{ width: 18, height: 18 }} />
              Ana Sayfa
              <ArrowRight style={{ width: 14, height: 14, color: "#a78bfa" }} />
            </a>
          </div>

          {/* Digest (debug için sadece prod-safe ID) */}
          {error.digest && (
            <p
              style={{
                marginTop: 32,
                paddingTop: 24,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                fontSize: 11,
                color: "#475569",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              Hata kodu: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
