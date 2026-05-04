"use client";
import React from "react";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import { RevealText } from "@/components/ui/reveal-text";
import { ArrowRight, MessageCircle, Mic, Bot } from "lucide-react";

const PARTICLES = [
  { id: 0, x: 12, y: 18, size: 2.4, duration: 14, delay: 0.5 },
  { id: 1, x: 28, y: 62, size: 1.8, duration: 18, delay: 2.1 },
  { id: 2, x: 45, y: 24, size: 3.2, duration: 12, delay: 1.4 },
  { id: 3, x: 63, y: 78, size: 2.0, duration: 16, delay: 3.0 },
  { id: 4, x: 81, y: 35, size: 2.8, duration: 13, delay: 0.8 },
  { id: 5, x: 8, y: 88, size: 1.6, duration: 19, delay: 4.2 },
  { id: 6, x: 92, y: 12, size: 2.2, duration: 15, delay: 1.7 },
  { id: 7, x: 36, y: 50, size: 1.4, duration: 17, delay: 2.6 },
  { id: 8, x: 71, y: 6, size: 3.0, duration: 11, delay: 0.3 },
  { id: 9, x: 19, y: 41, size: 2.6, duration: 14, delay: 3.5 },
  { id: 10, x: 54, y: 94, size: 1.9, duration: 18, delay: 1.2 },
  { id: 11, x: 88, y: 70, size: 2.3, duration: 13, delay: 4.0 },
  { id: 12, x: 4, y: 30, size: 1.7, duration: 16, delay: 2.3 },
  { id: 13, x: 67, y: 47, size: 2.9, duration: 12, delay: 0.6 },
  { id: 14, x: 33, y: 84, size: 1.5, duration: 19, delay: 3.8 },
];

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(139, 92, 246, 0.07)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/12 rounded-full blur-[140px] animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#a78bfa]/8 rounded-full blur-[140px] animate-pulse"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/30"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

const subtitleWords = [
  { text: "WhatsApp", delay: 0 },
  { text: "&", delay: 50 },
  { text: "Instagram", delay: 100 },
  { text: "chatbot,", delay: 200 },
  { text: "sesli", delay: 300 },
  { text: "asistan", delay: 350 },
  { text: "ve", delay: 450 },
  { text: "özel", delay: 500 },
  { text: "çözümlerle", delay: 600 },
  { text: "müşterilerinizle", delay: 700 },
  { text: "7/24", delay: 800, accent: true },
  { text: "iletişimde", delay: 900 },
  { text: "kalın.", delay: 1000 },
];

export default function Hero() {
  const scrollToContact = () => {
    const el = document.getElementById("iletisim");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    const el = document.getElementById("hizmetler");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
    { icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />, label: "WhatsApp & Instagram", labelLong: "WhatsApp & Instagram Chatbot" },
    { icon: <Mic className="w-4 h-4 sm:w-5 sm:h-5" />, label: "Sesli Asistan", labelLong: "Sesli Asistan" },
    { icon: <Bot className="w-4 h-4 sm:w-5 sm:h-5" />, label: "Özel Çözümler", labelLong: "Özel Çözümler" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <AnimatedGrid />
      <FloatingParticles />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-24 sm:py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] shadow-[0_0_8px_#8b5cf6] animate-pulse" />
              <span className="text-[10px] sm:text-xs text-slate-300 font-medium tracking-wide uppercase">
                Dijital Otomasyon Ajansı
              </span>
            </motion.div>

            <div className="mb-3 sm:mb-4 lg:flex lg:justify-start flex justify-center">
              <RevealText
                text="MakiCalls"
                fontSize="text-[44px] sm:text-6xl md:text-7xl lg:text-[88px]"
                letterDelay={0.07}
                gradient
              />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl sm:text-3xl md:text-4xl font-light text-slate-200 mb-5 sm:mb-6 leading-tight tracking-tight"
            >
              İşletmenizi{" "}
              <span className="text-[#a78bfa] font-semibold">dijital otomasyonla</span>{" "}
              büyütün.
            </motion.h2>

            <p className="text-sm sm:text-lg text-slate-400 max-w-xl lg:mx-0 mx-auto mb-8 sm:mb-10 leading-relaxed">
              {subtitleWords.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.4, delay: 0.9 + w.delay / 1000 }}
                  className={`inline-block mr-1.5 ${w.accent ? "text-white font-semibold" : ""}`}
                >
                  {w.text}
                </motion.span>
              ))}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center lg:justify-start sm:justify-center gap-3 sm:gap-4 mb-8 sm:mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="relative group px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors duration-300 shadow-[0_0_40px_-10px_#8b5cf6]"
              >
                <span className="flex items-center justify-center gap-2">
                  Teklif Al
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToServices}
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-medium text-slate-200 border border-[#8b5cf6]/30 hover:border-[#a78bfa]/60 hover:text-white hover:bg-[#8b5cf6]/10 transition-all duration-300 backdrop-blur-sm bg-white/[0.02]"
              >
                Hizmetleri Keşfet
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="flex flex-wrap items-center lg:justify-start justify-center gap-3"
            >
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.4 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#8b5cf6]/40 hover:bg-white/10 transition-all duration-300 cursor-default"
                >
                  <span className="text-[#a78bfa]">{s.icon}</span>
                  <span className="text-sm text-slate-300">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full hidden md:block"
          >
            <div className="absolute inset-0 rounded-3xl bg-[#8b5cf6]/8 blur-3xl" />
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-[5]" />
    </section>
  );
}
