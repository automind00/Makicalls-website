/**
 * KVKK + GDPR uyumu için merkezi consent yönetimi.
 *
 * Üç olası state:
 *   - "accepted"  → tüm analitik (GA4, Vercel Analytics, vs) yüklensin
 *   - "essential" → sadece zorunlu çerezler (Supabase auth, form CSRF gibi)
 *   - null        → kullanıcı henüz karar vermedi, banner göster
 *
 * SSR-safe: tüm okumalar sadece client-side. Server'dan render edilen
 * UI 'pending' (null) varsayar; hydration sonrası gerçek state alınır.
 *
 * Subscribe/publish pattern ile tüm dinleyiciler (GoogleAnalytics,
 * CookieBanner, vs) consent değişimini anında alır.
 */

export type ConsentValue = "accepted" | "essential";

const STORAGE_KEY = "mc_consent_v1";
const EVENT = "mc:consent-change";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "accepted" || v === "essential") return v;
    return null;
  } catch {
    return null;
  }
}

export function setConsent(value: ConsentValue) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // localStorage erişimi yoksa (private browsing edge case) sessizce ignore
  }
  // Aynı tab'da diğer component'ler için event dispatch
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

/**
 * React useSyncExternalStore için subscribe.
 * IMPORTANT: dönen fonksiyon SAME REFERENCE olmalı her çağrıda — React
 * aynı subscribe ile event listener kuracak.
 */
export function subscribeConsent(callback: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  // Aynı tab: custom event
  window.addEventListener(EVENT, callback);
  // Farklı tab: storage event
  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", storageHandler);
  };
}

/** SSR snapshot — server'da hep null (karar verilmedi varsay) */
export function getConsentServerSnapshot(): ConsentValue | null {
  return null;
}

export const ANALYTICS_OK_VALUES: ConsentValue[] = ["accepted"];

/** Analitik (GA4, Vercel Analytics) yüklenmeli mi? */
export function isAnalyticsAllowed(): boolean {
  const v = getConsent();
  return v !== null && ANALYTICS_OK_VALUES.includes(v);
}
