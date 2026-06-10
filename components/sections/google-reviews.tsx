"use client";
import React from "react";
import { motion } from "framer-motion";
import { MessageSquareHeart, Star, ShieldAlert, ArrowRight } from "lucide-react";

const GoogleGlyph = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
    />
  </svg>
);

const steps = [
  {
    icon: <MessageSquareHeart className="w-5 h-5" />,
    tag: "01 · Otomatik takip",
    title: "Tedaviden bir gün sonra mesaj",
    desc: "“Geçmiş olsun, memnun kaldınız mı?” — AI, hastaya doğal bir takip mesajı gönderir. Hiçbir personel uğraşmaz.",
  },
  {
    icon: <Star className="w-5 h-5" />,
    tag: "02 · Memnun hasta",
    title: "Doğrudan Google’a yönlendirilir",
    desc: "Hasta memnuniyetini ifade ederse, AI anında tek tıklık Google yorum linkini gönderir. 5 yıldızlı yorumlar birikir.",
  },
  {
    icon: <ShieldAlert className="w-5 h-5" />,
    tag: "03 · Memnuniyetsiz hasta",
    title: "Şikayet size iletilir, herkese değil",
    desc: "Memnun değilse AI problemi öğrenir ve kliniğe özel olarak iletir. Olumsuz deneyim Google’a değil, size düşer.",
  },
];

export default function GoogleReviews() {
  return (
    <section id="google-yorum" className="relative py-16 md:py-28 bg-[color:var(--color-page)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[600px] h-[500px] bg-brand/6 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-brand-soft/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16 max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-4">
            <GoogleGlyph className="w-4 h-4" />
            Google Yorum Otomasyonu
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-tight">
            Memnun hastayı{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              Google’a
            </span>
            , şikayeti size yönlendirir
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[color:var(--color-fg-muted)]">
            Akıllı kötü yorum filtresi: yıldız puanınız yükselirken, olumsuz deneyimler herkesin önünde değil sizin elinizde çözülür.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4 lg:gap-5 mb-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.tag}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative h-full p-[1px] rounded-2xl bg-gradient-to-b from-brand/30 via-[color:var(--color-border)] to-transparent"
            >
              <div className="h-full bg-[color:var(--color-elevated)] rounded-2xl p-6 flex flex-col shadow-[var(--shadow-sm)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-brand/10 border border-brand/30 text-brand-soft flex items-center justify-center flex-shrink-0">
                    {s.icon}
                  </div>
                  <span className="text-[11px] uppercase tracking-wider font-medium text-brand-soft">{s.tag}</span>
                </div>
                <h3 className="text-lg font-semibold text-[color:var(--color-fg)] mb-2 leading-snug">{s.title}</h3>
                <p className="text-sm text-[color:var(--color-fg-muted)] leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Result band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 to-transparent p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((n) => (
                <Star key={n} className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <div>
              <div className="text-base sm:text-lg font-semibold text-[color:var(--color-fg)]">
                Daha çok 5 yıldız, daha az olumsuz yorum
              </div>
              <div className="text-xs sm:text-sm text-[color:var(--color-fg-muted)]">
                Yüksek Google puanı = arama sonuçlarında üst sıra = daha çok yeni hasta.
              </div>
            </div>
          </div>
          <a
            href="#randevu"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-brand hover:bg-brand-deep transition-colors shadow-[0_0_30px_-8px_rgb(var(--brand))] whitespace-nowrap"
          >
            Süreci Birlikte Planlayalım
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
