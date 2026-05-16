"use client";
import React from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight, MicVocal } from "lucide-react";

export default function DentalHero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a] pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#8b5cf6]/12 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#a78bfa]/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#8b5cf6]/30 mb-6 sm:mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_#a78bfa] animate-pulse" />
          <span className="text-[10px] sm:text-xs text-slate-200 font-medium tracking-wide uppercase">
            İstanbul Diş Klinikleri İçin · Pilot Programı Açık
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.02em] leading-[1.05] mb-5 sm:mb-7"
        >
          Kliniğinizin telefonunu{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#a78bfa] via-[#c4b5fd] to-[#8b5cf6]">
            7/24 açan
          </span>{" "}
          AI resepsiyonist
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10"
        >
          Mesai dışı kaçırılan randevular yok yere kayıp. MakiCalls dakikalar içinde devreye girer,
          <span className="text-slate-200"> Türkçe konuşur,</span> randevu defterinizle entegre çalışır.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo("pilot-basvuru")}
            className="relative group px-7 sm:px-8 py-4 rounded-full text-sm sm:text-base font-semibold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors shadow-[0_0_50px_-10px_#8b5cf6]"
          >
            <span className="flex items-center justify-center gap-2">
              Pilot Programa Başvur
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo("hesaplayici")}
            className="px-7 sm:px-8 py-4 rounded-full text-sm sm:text-base font-medium text-slate-200 border border-[#8b5cf6]/30 hover:border-[#a78bfa]/60 hover:text-white hover:bg-[#8b5cf6]/10 transition-all backdrop-blur-sm bg-white/[0.02]"
          >
            <span className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-[#a78bfa]" />
              Kaybınızı hesaplayın
            </span>
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="text-xs text-slate-500"
        >
          İlk 3 İstanbul kliniği için <span className="text-[#a78bfa]">$500 kurulum + $200/ay</span> pilot fiyatı · Sözleşme yok
        </motion.p>
      </div>
    </section>
  );
}
