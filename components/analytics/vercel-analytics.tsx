"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { isAnalyticsAllowed, subscribeConsent } from "@/lib/consent";

/**
 * Vercel Analytics — consent-aware wrapper.
 * Sadece kullanıcı analytics'e onay verdiyse mount edilir.
 */
export default function VercelAnalyticsConsentAware() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(isAnalyticsAllowed());
    return subscribeConsent(() => setAllowed(isAnalyticsAllowed()));
  }, []);

  if (!allowed) return null;
  return <Analytics />;
}
