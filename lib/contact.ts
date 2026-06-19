/**
 * Telefon ve WhatsApp gibi iletişim kanallarını tek noktadan yönetir.
 * Env var'lar:
 *   NEXT_PUBLIC_DEMO_PHONE          → uluslararası format, ör: +905551234567
 *   NEXT_PUBLIC_DEMO_PHONE_DISPLAY  → kullanıcıya gösterilecek format, ör: 0555 123 45 67
 *   NEXT_PUBLIC_WHATSAPP_NUMBER     → uluslararası, '+' SİZ format, ör: 905551234567
 *
 * Hiçbiri tanımlı değilse helper'lar null döner ve UI tarafı
 * kendiliğinden hiçbir telefon/WA elementi render etmez.
 */

export type DemoPhone = {
  /** tel: linki için, +90 ile başlayan uluslararası format */
  tel: string;
  /** ekranda gösterilecek görsel format */
  display: string;
};

/**
 * Hem dev (`NEXT_PUBLIC_DEMO_PHONE` env tanımlıysa) hem prod'da çalışan
 * tek source-of-truth. Numara değişirse yalnızca env güncellenir.
 */
export function getDemoPhone(): DemoPhone | null {
  const tel = process.env.NEXT_PUBLIC_DEMO_PHONE?.trim();
  if (!tel) return null;
  // Display açıkça tanımlı değilse, tel'den yumuşak bir görsel format türet
  // (+90 5XX XXX XX XX → 0XXX XXX XX XX). Edge case yoksa olduğu gibi.
  const explicit = process.env.NEXT_PUBLIC_DEMO_PHONE_DISPLAY?.trim();
  if (explicit) return { tel, display: explicit };

  // Türkiye numaraları için minimal autoformat
  if (tel.startsWith("+90") && tel.length === 13) {
    const d = tel.slice(3); // 5XXXXXXXXX
    return {
      tel,
      display: `0${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}`,
    };
  }
  return { tel, display: tel };
}

/**
 * WhatsApp Business linki üretir. Numara `+` SİZ formatında olmalı
 * (örn: 905551234567). Yoksa null döner.
 */
export function getWhatsAppLink(): string | null {
  const num = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  if (!num) return null;
  // wa.me sadece sayıları kabul eder
  const clean = num.replace(/[^\d]/g, "");
  if (!clean) return null;
  return `https://wa.me/${clean}`;
}
