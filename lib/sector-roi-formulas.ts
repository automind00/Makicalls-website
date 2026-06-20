/**
 * Sektörel ROI compute fonksiyonları.
 *
 * NEDEN AYRI DOSYA?
 * Function tipleri Server Component → Client Component prop olarak
 * pass edilemez (Next.js 16 serializability). sectors.ts içinde tutarsak
 * tüm sector objesi client'a aktarılırken hata verir.
 *
 * Bu dosya client-only consume edilir (SectorRoiCalculator "use client").
 * Slug ile compute fonksiyonu lookup edilir.
 */

import type { RoiResult } from "@/lib/sectors";

const TL = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});

export const ROI_FORMULAS: Record<
  string,
  (a: number, b: number, c: number) => RoiResult
> = {
  // OTELLER — OTA komisyon kaybı
  oteller: (rooms, otaPct, rate) => {
    const otaRooms = rooms * (otaPct / 100);
    const monthlyCommission = otaRooms * rate * 0.16;
    const annualCommission = monthlyCommission * 12;
    const recovery = annualCommission * 0.5;
    return {
      lossLabel: "Yıllık OTA komisyon kaybı",
      lossAmount: annualCommission,
      lossSubtext: `Aylık ortalama: ${TL.format(monthlyCommission)}`,
      recoveryLabel: "Direkt rezervasyonla kurtarabilirsiniz",
      recoveryAmount: recovery,
      recoverySubtext:
        "7/24 çoklu dil AI asistan ile OTA payının ~%50'si direkt kanala kayar",
    };
  },

  // SAÇ EKİMİ — geç cevap kaybı
  "sac-ekimi": (leadsWeek, lateRatePct, usd) => {
    const usdTry = 35;
    const lateLeadsPerMonth = leadsWeek * (lateRatePct / 100) * 4;
    const lostLeads = lateLeadsPerMonth * 0.62;
    const lostRevenue = lostLeads * 0.04 * usd * usdTry;
    const annual = lostRevenue * 12;
    const recovery = annual * 0.7;
    return {
      lossLabel: "Yıllık kayıp gelir",
      lossAmount: annual,
      lossSubtext: `Aylık ortalama: ${TL.format(lostRevenue)}`,
      recoveryLabel: "AI asistan ile kurtarabilirsiniz",
      recoveryAmount: recovery,
      recoverySubtext:
        "7/24 çoklu dil yanıt + foto ön analiz ile kayıp lead'in ~%70'i geri kazanılır",
    };
  },

  // ESTETİK — sezon talep kaybı
  "estetik-klinikleri": (callsDay, missPct, avgPackage) => {
    const missedPerDay = callsDay * (missPct / 100);
    const conversionRate = 0.1;
    const monthlyLoss = missedPerDay * 30 * conversionRate * avgPackage;
    const seasonalLoss = monthlyLoss * 4;
    const recovery = seasonalLoss * 0.8;
    return {
      lossLabel: "Sezonluk kayıp gelir (4 ay)",
      lossAmount: seasonalLoss,
      lossSubtext: `Sezon aylık: ${TL.format(monthlyLoss)}`,
      recoveryLabel: "AI ile sezon talebini yakalayın",
      recoveryAmount: recovery,
      recoverySubtext:
        "Eş zamanlı sınırsız konuşma + DM otomasyonu ile yoğun saatte kaybın ~%80'i geri kazanılır",
    };
  },

  // SAĞLIK TURİZMİ — dil uyumsuzluk kaybı
  "saglik-turizmi": (monthlyLeads, languageMissPct, packageUSD) => {
    const usdTry = 35;
    const lostLeads = monthlyLeads * (languageMissPct / 100);
    const conversion = 0.06;
    const monthlyLoss = lostLeads * conversion * packageUSD * usdTry;
    const annual = monthlyLoss * 12;
    const recovery = annual * 0.65;
    return {
      lossLabel: "Yıllık kayıp paket geliri",
      lossAmount: annual,
      lossSubtext: `Aylık: ${TL.format(monthlyLoss)}`,
      recoveryLabel: "6 dilli AI ile kurtarabilirsiniz",
      recoveryAmount: recovery,
      recoverySubtext:
        "Hastanın ana dilinde 7/24 yanıt — kayıp lead'in ~%65'i geri kazanılır",
    };
  },

  // ARAÇ KİRALAMA — callback kaybı
  "arac-kiralama": (dailyQueries, callbackPct, avgRental) => {
    const callbackPerDay = dailyQueries * (callbackPct / 100);
    const lostPerDay = callbackPerDay * 0.63;
    const conversion = 0.4;
    const monthlyLoss = lostPerDay * 30 * conversion * avgRental;
    const annual = monthlyLoss * 12;
    const recovery = annual * 0.75;
    return {
      lossLabel: "Yıllık kayıp gelir",
      lossAmount: annual,
      lossSubtext: `Aylık: ${TL.format(monthlyLoss)}`,
      recoveryLabel: "AI müsaitlik asistanı ile kurtarın",
      recoveryAmount: recovery,
      recoverySubtext:
        "Filo sistemine canlı bağlı asistan ile 'geri arayacağım' bitiyor, kaybın ~%75'i geri kazanılır",
    };
  },

  // E-TİCARET — sepet terki kaybı
  "e-ticaret": (dailyMsgs, slowPct, avgBasket) => {
    const slowMsgs = dailyMsgs * (slowPct / 100);
    const abandoned = slowMsgs * 0.41;
    const monthlyLoss = abandoned * 30 * avgBasket;
    const annual = monthlyLoss * 12;
    const recovery = annual * 0.6;
    return {
      lossLabel: "Yıllık kayıp ciro",
      lossAmount: annual,
      lossSubtext: `Aylık: ${TL.format(monthlyLoss)}`,
      recoveryLabel: "AI ile darboğazı kıracaksınız",
      recoveryAmount: recovery,
      recoverySubtext:
        "Eş zamanlı sınırsız konuşma + kargo + iade otomasyonu ile sepet terkinin ~%60'ı geri kazanılır",
    };
  },

  // GAYRİMENKUL — kalifiye olmayan lead kaybı
  gayrimenkul: (inquiries, unqualifiedPct, avgCommission) => {
    const unqualified = inquiries * (unqualifiedPct / 100);
    const lostQualifiedDeals = unqualified * 0.02;
    const monthlyLoss = lostQualifiedDeals * avgCommission;
    const annual = monthlyLoss * 12;
    const recovery = annual * 0.8;
    return {
      lossLabel: "Yıllık kayıp komisyon",
      lossAmount: annual,
      lossSubtext: `Aylık: ${TL.format(monthlyLoss)}`,
      recoveryLabel: "AI kalifikasyon ile kurtarın",
      recoveryAmount: recovery,
      recoverySubtext:
        "Bütçe + kredi + ihtiyaç ön sorgusu ile danışmana sadece nitelikli lead düşer, kaybın ~%80'i kazanılır",
    };
  },
};
