"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, AlertCircle } from "lucide-react";
import { SECTORS, getSectorHref, type SectorConfig } from "@/lib/sectors";
import { ACCENT_THEMES, SHOWCASE_ICONS } from "@/components/sector/icon-map";

function SectorCard({ sector, i }: { sector: SectorConfig; i: number }) {
  const theme = ACCENT_THEMES[sector.accent];
  const Icon = SHOWCASE_ICONS[sector.iconKey];
  const href = getSectorHref(sector);
  const topPain = sector.pains[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      className="h-full"
    >
      <Link href={href} className="block h-full">
        <div
          className={`group relative h-full rounded-2xl bg-[color:var(--color-elevated)] border border-[color:var(--color-border)] ${theme.hoverBorder} p-5 md:p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]`}
        >
          {/* Accent glow on hover */}
          <div
            className={`absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl ${theme.bg}`}
          />

          {/* Icon */}
          <div
            className={`relative w-12 h-12 rounded-xl ${theme.bg} border ${theme.border} flex items-center justify-center ${theme.text} mb-4`}
          >
            {Icon && <Icon className="w-6 h-6" />}
          </div>

          {/* Title + arrow */}
          <div className="relative flex items-start justify-between gap-3 mb-2">
            <h3 className="text-base sm:text-lg font-semibold text-[color:var(--color-fg)] leading-tight">
              {sector.name}
            </h3>
            <ArrowUpRight
              className={`w-4 h-4 ${theme.text} flex-shrink-0 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all`}
            />
          </div>

          {/* Short description */}
          <p className="relative text-xs sm:text-sm text-[color:var(--color-fg-muted)] leading-relaxed mb-4">
            {sector.shortDesc}
          </p>

          {/* Top pain teaser */}
          {topPain && (
            <div className="relative mt-auto pt-4 border-t border-[color:var(--color-border)]">
              <div className="flex items-center gap-1.5 mb-1.5">
                <AlertCircle className="w-3 h-3 text-red-400" />
                <span className="text-[10px] uppercase tracking-wider font-medium text-red-400">
                  Sektörün derdi
                </span>
              </div>
              <p className="text-xs text-[color:var(--color-fg-secondary)] line-clamp-2">
                {topPain.title}
              </p>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function SectorShowcase() {
  return (
    <section
      id="sektorler"
      className="relative py-16 md:py-24 bg-[color:var(--color-page)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-brand/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-fuchsia-500/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-14 max-w-2xl mx-auto"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-3 block">
            Sektör çözümleri
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-[1.1]">
            Her sektörün{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              kendi acı noktası,
            </span>{" "}
            kendi çözümü
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[color:var(--color-fg-muted)] leading-relaxed">
            Hizmet temeli aynı: 7/24 AI asistan. Sektörün gerçek derdine göre kurulur — kart üzerine tıklayın, sektörünüzün kendi sayfasını görün.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {SECTORS.map((s, i) => (
            <SectorCard key={s.slug} sector={s} i={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-xs sm:text-sm text-[color:var(--color-fg-muted)]"
        >
          Sektörünüz listede yok mu?{" "}
          <a
            href="#iletisim"
            className="text-brand-soft hover:text-white underline-offset-4 hover:underline transition-colors"
          >
            Bize özel çözüm için yazın →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
