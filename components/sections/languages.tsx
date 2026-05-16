"use client";
import React from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

type Lang = { code: string; name: string; native: string; priority?: boolean };

const languages: Lang[] = [
  { code: "TR", name: "Türkçe", native: "Türkçe", priority: true },
  { code: "EN", name: "İngilizce", native: "English", priority: true },
  { code: "DE", name: "Almanca", native: "Deutsch", priority: true },
  { code: "RU", name: "Rusça", native: "Русский", priority: true },
  { code: "AR", name: "Arapça", native: "العربية", priority: true },
  { code: "FR", name: "Fransızca", native: "Français" },
  { code: "ES", name: "İspanyolca", native: "Español" },
  { code: "NL", name: "Hollandaca", native: "Nederlands" },
  { code: "IT", name: "İtalyanca", native: "Italiano" },
  { code: "FA", name: "Farsça", native: "فارسی" },
  { code: "PT", name: "Portekizce", native: "Português" },
  { code: "ZH", name: "Çince", native: "中文" },
  { code: "JA", name: "Japonca", native: "日本語" },
  { code: "KO", name: "Korece", native: "한국어" },
  { code: "PL", name: "Lehçe", native: "Polski" },
];

export default function Languages() {
  return (
    <section className="relative py-16 md:py-24 bg-[color:var(--color-surface)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-brand-soft/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center"
        >
          <div className="lg:col-span-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/30 mb-4">
              <Globe className="w-3.5 h-3.5 text-brand-soft" />
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft">
                Çoklu dil desteği
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-tight mb-4">
              Hasta hangi dilde yazarsa{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
                aynı dilde cevap alır
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[color:var(--color-fg-muted)] leading-relaxed mb-5">
              Türkçe asıl çalışma dili. Sağlık turizmi kliniklerimiz için 14 ek dil hazır — İngilizce,
              Almanca, Rusça, Arapça ön planda.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 text-xs text-[color:var(--color-fg-muted)]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                15 dil canlı
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-soft" />
                Aksan algılama
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Otomatik geçiş
              </span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-2.5">
              {languages.map((lang, i) => (
                <motion.div
                  key={lang.code}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: i * 0.025 }}
                  className={`group relative p-3 sm:p-3.5 rounded-xl border transition-all hover:scale-105 ${
                    lang.priority
                      ? "bg-gradient-to-br from-brand/12 to-transparent border-brand/30 hover:border-brand-soft/60"
                      : "bg-[color:var(--color-elevated)] border-[color:var(--color-border)] hover:border-brand/30"
                  }`}
                >
                  <div className="text-[9px] uppercase tracking-wider font-bold text-brand-soft mb-1">
                    {lang.code}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[color:var(--color-fg)] leading-tight truncate">
                    {lang.native}
                  </div>
                  <div className="text-[10px] text-[color:var(--color-fg-muted)] mt-0.5 truncate">
                    {lang.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
