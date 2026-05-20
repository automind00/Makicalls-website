"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

type Row = { label: string; old: string; maki: string };

const rows: Row[] = [
  { label: "Mesai dışı arama", old: "Kaçar, müşteri rakibe gider", maki: "7/24 cevaplanır, randevu açılır" },
  { label: "Yanıt hızı", old: "Telefon çalar, kimse açmaz", maki: "İlk çalışta cevap, sıraya alma yok" },
  { label: "WhatsApp & Instagram", old: "Ayrı ayrı operatör/araç", maki: "Tek asistan, tek panel" },
  { label: "Randevu defterine yazma", old: "Manuel · sık unutulur", maki: "Otomatik · CRM’e düşer" },
  { label: "Çağrı kaydı & analiz", old: "Çoğu zaman yok", maki: "Tüm aramalar transkript + öneri" },
  { label: "Hata ölçüm", old: "Şikayet gelirse anlaşılır", maki: "Hatalı yanıtlar gerçek-zamanlı uyarır" },
  { label: "Yoğun saat kapasitesi", old: "Tek operatör tıkanır", maki: "Aynı anda sınırsız konuşma" },
  { label: "Yorulma & insan hatası", old: "Akşamları düşer", maki: "İlk aramada da sonuncuda da aynı kalite" },
];

export default function Comparison() {
  return (
    <section className="relative py-16 md:py-28 bg-[color:var(--color-page)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-brand/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-brand-soft/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14 max-w-2xl mx-auto"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-3 block">
            Neden MakiCalls
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-tight">
            Eski çağrı merkezi <span className="text-[color:var(--color-fg-muted)]">vs</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              MakiCalls AI
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[color:var(--color-fg-muted)]">
            Aynı iş — daha az emek, daha düşük maliyet, daha hızlı.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-elevated)] shadow-[var(--shadow-md)] overflow-hidden"
        >
          {/* Header row */}
          <div className="grid grid-cols-12 bg-[color:var(--color-surface)] border-b border-[color:var(--color-border)]">
            <div className="col-span-4 sm:col-span-5 px-4 sm:px-6 py-4 text-[10px] sm:text-xs uppercase tracking-[0.18em] font-semibold text-[color:var(--color-fg-muted)]">
              Karşılaştırma
            </div>
            <div className="col-span-4 sm:col-span-3 px-4 sm:px-6 py-4 text-[11px] sm:text-sm font-semibold text-[color:var(--color-fg-secondary)] border-l border-[color:var(--color-border)]">
              Eski yöntem
            </div>
            <div className="col-span-4 px-4 sm:px-6 py-4 text-[11px] sm:text-sm font-bold text-brand-soft border-l border-brand/30 bg-brand/5">
              MakiCalls AI
            </div>
          </div>

          {/* Rows */}
          {rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={`grid grid-cols-12 ${i < rows.length - 1 ? "border-b border-[color:var(--color-border)]" : ""}`}
            >
              <div className="col-span-4 sm:col-span-5 px-4 sm:px-6 py-4 text-xs sm:text-sm font-medium text-[color:var(--color-fg)]">
                {r.label}
              </div>
              <div className="col-span-4 sm:col-span-3 px-4 sm:px-6 py-4 text-xs sm:text-sm text-[color:var(--color-fg-muted)] border-l border-[color:var(--color-border)]">
                <div className="flex items-start gap-2">
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400/70 mt-0.5 flex-shrink-0" />
                  <span>{r.old}</span>
                </div>
              </div>
              <div className="col-span-4 px-4 sm:px-6 py-4 text-xs sm:text-sm text-[color:var(--color-fg-secondary)] border-l border-brand/20 bg-brand/[0.04]">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{r.maki}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
