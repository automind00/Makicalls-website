"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mic, MessageCircle, Globe, PhoneOutgoing, Database } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

type Channel = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  span?: boolean;
};

const channels: Channel[] = [
  {
    icon: <Mic className="w-6 h-6" />,
    title: "Sesli AI",
    desc: "Her aramayı 7/24, 15+ dilde yanıtlar. Randevu açar, soru cevaplar, gerektiğinde size bağlar.",
    span: true,
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "WhatsApp",
    desc: "Fiyat sorgusu, randevu ve SSS — tamamen otomatik yanıtlanır.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Web Chat",
    desc: "Site ziyaretçisini kalifiye eder, anında randevuya çevirir.",
  },
  {
    icon: <PhoneOutgoing className="w-6 h-6" />,
    title: "Giden Arama",
    desc: "Yeni gelen lead'i 60 saniye içinde arar — sıcakken yakalar.",
  },
  {
    icon: <InstagramIcon className="w-6 h-6" />,
    title: "Instagram DM",
    desc: "DM ve story yanıtlarını otomatik randevuya dönüştürür.",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "CRM & Lead Takibi",
    desc: "Her aramayı, mesajı ve lead'i tek panelde toplar, puanlar ve takip eder.",
    span: true,
  },
];

export default function Omnichannel() {
  return (
    <section className="relative py-16 md:py-28 bg-[color:var(--color-surface)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-brand/6 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-brand-soft/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16 max-w-2xl mx-auto"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-3 block">
            Omnichannel
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-tight">
            Her kanal.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              Tek platform.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[color:var(--color-fg-muted)]">
            Müşteri hangi kanaldan gelirse gelsin tek bir asistan cevap verir — aynı hafıza, aynı ton, tek panel.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {channels.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`group relative h-full p-[1px] rounded-2xl bg-gradient-to-b from-brand/30 via-[color:var(--color-border)] to-transparent hover:from-brand/60 transition-all ${
                c.span ? "lg:col-span-2" : ""
              }`}
            >
              <div className="h-full bg-[color:var(--color-elevated)] rounded-2xl p-5 lg:p-6 flex flex-col shadow-[var(--shadow-sm)]">
                <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/30 text-brand-soft flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                  {c.icon}
                </div>
                <h3 className="text-lg font-semibold text-[color:var(--color-fg)] mb-2">{c.title}</h3>
                <p className="text-sm text-[color:var(--color-fg-muted)] leading-relaxed">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
