"use client";
import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Globe } from "lucide-react";

const Instagram = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="28"
    height="28"
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

const channels = [
  {
    icon: <Phone className="w-7 h-7" />,
    title: "Sesli Arama",
    body: "Klinik numaranıza gelen her çağrıyı Türkçe karşılar, randevu açar, sık sorulanları yanıtlar.",
    badge: "NetGSM entegre",
  },
  {
    icon: <MessageCircle className="w-7 h-7" />,
    title: "WhatsApp",
    body: "WhatsApp Business API üzerinden 7/24 yazılı mesajları yanıtlar, hatırlatma gönderir.",
    badge: "İşletme onaylı",
  },
  {
    icon: <Globe className="w-7 h-7" />,
    title: "Web Chat",
    body: "Sitenize gömülü sohbet widget'ı. Hasta klinikte gezerken anında randevu alabilir.",
    badge: "Tek satır kod",
  },
  {
    icon: <Instagram className="w-7 h-7" />,
    title: "Instagram DM",
    body: "Reklam veya postlardan gelen DM'leri otomatik yanıtlar, randevu defterine yönlendirir.",
    badge: "Reklam ROI artar",
  },
];

export default function Omnichannel() {
  return (
    <section className="relative py-16 md:py-24 bg-[color:var(--color-surface)]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16 max-w-2xl mx-auto"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-3 block">
            Tek asistan, dört kanal
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-tight">
            Hasta nereden yazarsa{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              aynı asistan cevaplar
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[color:var(--color-fg-muted)]">
            Aynı klinik tonu, aynı randevu kuralları, aynı hasta geçmişi — kanal ne olursa olsun.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {channels.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-brand/25 via-[color:var(--color-border)] to-transparent hover:from-brand/50 transition-colors"
            >
              <div className="h-full bg-[color:var(--color-elevated)] rounded-2xl p-5 lg:p-6 shadow-[var(--shadow-md)]">
                <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/30 flex items-center justify-center text-brand-soft mb-4">
                  {c.icon}
                </div>
                <h3 className="text-base font-semibold text-[color:var(--color-fg)] mb-2">{c.title}</h3>
                <p className="text-sm text-[color:var(--color-fg-muted)] leading-relaxed mb-4">{c.body}</p>
                <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-brand-soft px-2 py-1 rounded bg-brand/10 border border-brand/20">
                  {c.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
