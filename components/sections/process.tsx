"use client";
import React from "react";
import { motion } from "framer-motion";
import OrbitingSkills, { type OrbitSkillConfig } from "@/components/ui/orbiting-skills";
import {
  Search,
  Settings,
  Headphones,
  MessageCircle,
  Mic,
  Bot,
  Zap,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <Search className="w-6 h-6" />,
    title: "Analiz",
    subtitle: "İşletmenizi tanıyoruz",
    description:
      "İşletmenizin ihtiyaçlarını, müşteri davranışlarını ve mevcut süreçlerinizi detaylı olarak analiz ediyoruz.",
  },
  {
    number: "02",
    icon: <Settings className="w-6 h-6" />,
    title: "Kurulum",
    subtitle: "Sisteminizi hazırlıyoruz",
    description:
      "Size özel chatbot ve otomasyon araçlarını tasarlıyor, entegre ediyor ve test ediyoruz.",
  },
  {
    number: "03",
    icon: <Headphones className="w-6 h-6" />,
    title: "Destek",
    subtitle: "7/24 yanınızdayız",
    description:
      "Lansman sonrası sürekli izleme, optimizasyon ve teknik destek sağlıyoruz.",
  },
];

const orbitSkills: OrbitSkillConfig[] = [
  {
    id: "chatbot",
    orbitRadius: 110,
    size: 56,
    speed: 0.6,
    phaseShift: 0,
    glowColor: "violet",
    accent: "#8b5cf6",
    label: "WhatsApp & Instagram Chatbot",
    icon: <MessageCircle className="w-6 h-6" />,
  },
  {
    id: "voice",
    orbitRadius: 110,
    size: 56,
    speed: 0.6,
    phaseShift: (2 * Math.PI) / 3,
    glowColor: "violet",
    accent: "#a78bfa",
    label: "AI Sesli Asistan",
    icon: <Mic className="w-6 h-6" />,
  },
  {
    id: "custom",
    orbitRadius: 110,
    size: 56,
    speed: 0.6,
    phaseShift: (4 * Math.PI) / 3,
    glowColor: "violet",
    accent: "#c4b5fd",
    label: "Özel Çözümler",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: "ai",
    orbitRadius: 200,
    size: 48,
    speed: -0.4,
    phaseShift: 0,
    glowColor: "violet",
    accent: "#7c3aed",
    label: "AI Eğitimi",
    icon: <Bot className="w-5 h-5" />,
  },
  {
    id: "settings",
    orbitRadius: 200,
    size: 48,
    speed: -0.4,
    phaseShift: (2 * Math.PI) / 3,
    glowColor: "violet",
    accent: "#8b5cf6",
    label: "Otomasyon",
    icon: <Settings className="w-5 h-5" />,
  },
  {
    id: "sparkle",
    orbitRadius: 200,
    size: 48,
    speed: -0.4,
    phaseShift: (4 * Math.PI) / 3,
    glowColor: "violet",
    accent: "#a78bfa",
    label: "Optimizasyon",
    icon: <Sparkles className="w-5 h-5" />,
  },
];

const orbitConfigs = [
  { radius: 110, glowColor: "violet" as const, delay: 0 },
  { radius: 200, glowColor: "violet" as const, delay: 1.5 },
];

export default function Process() {
  return (
    <section id="surec" className="relative py-16 md:py-32 bg-[color:var(--color-page)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[128px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-brand/4 rounded-full blur-[128px] -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-3 sm:mb-4 block">
            Nasıl Çalışırız
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-fg)] mb-3 sm:mb-4 tracking-[-0.02em] leading-tight">
            Çalışma{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              Sürecimiz
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[color:var(--color-fg-muted)] max-w-xl mx-auto">
            Ek altyapı yok, kurulum dahil. Analiz, devreye alma, canlı destek — biz hallederiz.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1 }}
            className="flex justify-center order-2 lg:order-1 scale-[0.62] -my-24 sm:scale-100 sm:my-0"
          >
            <OrbitingSkills
              centerIcon={
                <div className="text-center">
                  <span className="text-sm font-bold tracking-[-0.02em] text-[color:var(--color-fg)]">
                    Maki<span className="text-brand-soft">Calls</span>
                  </span>
                </div>
              }
              skills={orbitSkills}
              orbitConfigs={orbitConfigs}
            />
          </motion.div>

          <div className="space-y-8 order-1 lg:order-2">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative group"
              >
                <div className="flex items-start gap-5">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-brand opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="relative w-16 h-16 rounded-2xl bg-brand flex items-center justify-center text-white shadow-[0_0_20px_-4px_rgb(var(--brand))]">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[color:var(--color-elevated)] border-2 border-[color:var(--color-border-strong)] flex items-center justify-center shadow-[var(--shadow-sm)]">
                      <span className="text-[10px] font-bold text-[color:var(--color-fg)]">{step.number}</span>
                    </div>
                  </div>

                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-bold text-[color:var(--color-fg)] mb-1">{step.title}</h3>
                    <p className="text-sm text-brand-soft font-medium mb-2">{step.subtitle}</p>
                    <p className="text-sm text-[color:var(--color-fg-muted)] leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {i < steps.length - 1 && (
                  <div className="absolute left-8 top-16 w-px h-8 bg-gradient-to-b from-[color:var(--color-border-strong)] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
