"use client";

import { useSyncExternalStore } from "react";
import {
  getConsent,
  getConsentServerSnapshot,
  subscribeConsent,
  isAnalyticsAllowed,
  type ConsentValue,
} from "@/lib/consent";

/**
 * Saf consent state'i için React hook (useSyncExternalStore tabanlı).
 *
 * NEDEN: useSyncExternalStore React'in resmi external-store senkronizasyon
 * primitivedir. setState-in-effect anti-pattern'i ortadan kalkar; SSR'da
 * snapshot null döner (hydration mismatch yok), mount sonrası gerçek
 * değer + multi-tab + same-tab değişimleri otomatik yakalanır.
 */
export function useConsent(): ConsentValue | null {
  return useSyncExternalStore(
    subscribeConsent,
    getConsent,
    getConsentServerSnapshot,
  );
}

/** Analitik yüklenmeli mi? (consent === "accepted") */
export function useIsAnalyticsAllowed(): boolean {
  // Hook çağrısı consent değiştikçe rerender'ı tetikler
  useConsent();
  return isAnalyticsAllowed();
}
