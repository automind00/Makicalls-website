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
    <section className="relative py-16 md:py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#8b5cf6]/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#a78bfa]/5 rounded-full blur-[120px]" />
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 mb-4">
              <Globe className="w-3.5 h-3.5 text-[#a78bfa]" />
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#a78bfa]">
                Çoklu dil desteği
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[-0.02em] leading-tight mb-4">
              Hasta hangi dilde yazarsa{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e9d5ff] to-[#a78bfa]">
                aynı dilde cevap alır
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-5">
              Türkçe asıl çalışma dili. Sağlık turizmi kliniklerimiz için 14 ek dil hazır — İngilizce,
              Almanca, Rusça, Arapça ön planda.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                15 dil canlı
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]" />
                Aksan algılama
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
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
                      ? "bg-gradient-to-br from-[#8b5cf6]/12 to-transparent border-[#8b5cf6]/30 hover:border-[#a78bfa]/60"
                      : "bg-white/[0.03] border-white/10 hover:border-[#8b5cf6]/30"
                  }`}
                >
                  <div className="text-[9px] uppercase tracking-wider font-bold text-[#a78bfa] mb-1">
                    {lang.code}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-white leading-tight truncate">
                    {lang.native}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 truncate">{lang.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
