"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";

type Row = { label: string; old: string; maki: string };

const rows: Row[] = [
  { label: "Mesai dışı", old: "Boşa çalar", maki: "7/24 açılır" },
  { label: "Yanıt hızı", old: "Sırada bekletir", maki: "İlk saniyede" },
  { label: "Kanallar", old: "Dağınık, ayrı", maki: "Tek panelde" },
  { label: "Randevu", old: "Elle, unutulur", maki: "Otomatik CRM’e" },
  { label: "Çağrı kaydı", old: "Genelde yok", maki: "Transkript + öneri" },
  { label: "Kapasite", old: "Tek hat tıkanır", maki: "Sınırsız eşzamanlı" },
  { label: "Maliyet", old: "Maaş + SGK + mola", maki: "Tek sabit abonelik" },
  { label: "Tutarlılık", old: "Akşam düşer", maki: "Hep aynı kalite" },
];

export default function Comparison() {
  return (
    <section className="relative py-16 md:py-28 bg-[color:var(--color-page)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-brand/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-brand-soft/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
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
            Eski yöntem{" "}
            <span className="text-[color:var(--color-fg-muted)] font-light">vs</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              MakiCalls
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[color:var(--color-fg-muted)]">
            Aynı iş. Yarısı emek, katı sonuç.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-elevated)] overflow-hidden shadow-[0_0_70px_-24px_rgb(var(--brand))]"
        >
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr_1.15fr]">
            <div className="px-3 sm:px-6 py-4 text-[9px] sm:text-xs uppercase tracking-[0.18em] font-semibold text-[color:var(--color-fg-muted)] flex items-end">
              Karşılaştırma
            </div>
            <div className="px-3 sm:px-6 py-4 text-[11px] sm:text-sm font-semibold text-[color:var(--color-fg-muted)] border-l border-[color:var(--color-border)] flex items-end">
              Eski yöntem
            </div>
            <div className="relative px-3 sm:px-6 py-4 border-l border-brand/40 bg-gradient-to-b from-brand/20 to-brand/5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand text-white text-[8px] sm:text-[10px] font-semibold mb-1.5">
                <Sparkles className="w-2.5 h-2.5" /> ÖNERİLEN
              </span>
              <div className="text-sm sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-brand-soft to-brand">
                MakiCalls AI
              </div>
            </div>
          </div>

          {/* Rows */}
          {rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="grid grid-cols-[1fr_1fr_1.15fr] border-t border-[color:var(--color-border)]"
            >
              {/* Label */}
              <div className="px-3 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-[color:var(--color-fg)] flex items-center">
                {r.label}
              </div>
              {/* Old */}
              <div className="px-3 sm:px-6 py-3.5 sm:py-4 border-l border-[color:var(--color-border)] flex items-center gap-1.5 sm:gap-2">
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400/60 flex-shrink-0" />
                <span className="text-[11px] sm:text-sm text-[color:var(--color-fg-muted)] line-through decoration-red-400/30">
                  {r.old}
                </span>
              </div>
              {/* Maki — highlighted winner column */}
              <div className="px-3 sm:px-6 py-3.5 sm:py-4 border-l border-brand/30 bg-brand/[0.06] flex items-center gap-1.5 sm:gap-2">
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" strokeWidth={3} />
                </span>
                <span className="text-[11px] sm:text-sm font-medium text-[color:var(--color-fg)]">
                  {r.maki}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
