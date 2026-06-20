"use client";

import { Analytics } from "@vercel/analytics/next";
import { useIsAnalyticsAllowed } from "@/lib/use-consent";

/**
 * Vercel Analytics — consent-aware wrapper.
 * Sadece kullanıcı analytics'e onay verdiyse mount edilir.
 * useSyncExternalStore sayesinde setState-in-effect anti-pattern'i yok.
 */
export default function VercelAnalyticsConsentAware() {
  const allowed = useIsAnalyticsAllowed();
  if (!allowed) return null;
  return <Analytics />;
}
