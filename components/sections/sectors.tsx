"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Stethoscope, Scissors, Sparkles, Plane } from "lucide-react";

type Sector = {
  icon: React.ReactNode;
  title: string;
  shortDesc: string;
  longDesc: string;
  href?: string;
  status: "live" | "coming";
};

const sectors: Sector[] = [
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: "Diş Klinikleri",
    shortDesc: "Randevu, ücret bilgisi, tedavi soruları",
    longDesc:
      "Mesai dışı çağrıları yakalar, randevu defterine ekler. Sık sorulan tedavi/fiyat sorularını klinik tonunda yanıtlar.",
    href: "/dis-klinikleri",
    status: "live",
  },
  {
    icon: <Scissors className="w-6 h-6" />,
    title: "Saç Ekimi",
    shortDesc: "Uluslararası hasta, paket fiyatı, fotoğraf analizi",
    longDesc:
      "İngilizce + Arapça + Rusça konuşur. Hasta fotoğrafını alır, AI ön analiz raporu hazırlar, paket fiyatı önerir.",
    status: "coming",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Estetik Klinikler",
    shortDesc: "Botoks, dolgu, lazer epilasyon",
    longDesc:
      "Yüksek dönüşüm potansiyelli leadleri ayrıştırır. Konsültasyon randevusu açar, ön bilgileri toplar.",
    status: "coming",
  },
  {
    icon: <Plane className="w-6 h-6" />,
    title: "Sağlık Turizmi",
    shortDesc: "Çoklu dil, paket fiyatı, konaklama",
    longDesc:
      "15+ dil. Uluslararası lead'leri kalifiye eder, vize/uçuş/konaklama paket sorularını yönetir.",
    status: "coming",
  },
];

export default function Sectors() {
  return (
    <section className="relative py-16 md:py-24 bg-[color:var(--color-page)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-brand/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-soft/5 rounded-full blur-[120px]" />
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
            Hangi sektördesiniz?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-tight">
            Her klinik tipinin{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              ayrı bir asistanı
            </span>{" "}
            var
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[color:var(--color-fg-muted)]">
            Aynı temel teknoloji, sektöre özel eğitim: hizmet listesi, soru kalıpları, randevu kuralları, fiyat sınırları.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {sectors.map((s, i) => {
            const card = (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className={`group relative h-full p-[1px] rounded-2xl transition-all ${
                  s.status === "live"
                    ? "bg-gradient-to-b from-brand/40 via-[color:var(--color-border)] to-transparent hover:from-brand/70"
                    : "bg-gradient-to-b from-[color:var(--color-border)] to-transparent"
                }`}
              >
                <div
                  className={`h-full bg-[color:var(--color-elevated)] rounded-2xl p-5 lg:p-6 flex flex-col shadow-[var(--shadow-sm)] ${
                    s.status === "coming" ? "opacity-75" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        s.status === "live"
                          ? "bg-brand/10 border border-brand/30 text-brand-soft"
                          : "bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-[color:var(--color-fg-muted)]"
                      }`}
                    >
                      {s.icon}
                    </div>
                    {s.status === "coming" ? (
                      <span className="text-[9px] uppercase tracking-wider font-medium text-[color:var(--color-fg-muted)] px-2 py-1 rounded-full bg-[color:var(--color-surface)] border border-[color:var(--color-border)]">
                        Yakında
                      </span>
                    ) : (
                      <span className="text-[9px] uppercase tracking-wider font-medium text-emerald-600 dark:text-emerald-300 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        Aktif
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-[color:var(--color-fg)] mb-1.5">{s.title}</h3>
                  <p className="text-[11px] uppercase tracking-wider text-brand-soft mb-3 font-medium">
                    {s.shortDesc}
                  </p>
                  <p className="text-sm text-[color:var(--color-fg-muted)] leading-relaxed mb-5 flex-1">
                    {s.longDesc}
                  </p>

                  {s.status === "live" && s.href ? (
                    <div className="flex items-center gap-1.5 text-sm font-medium text-brand-soft group-hover:gap-2.5 transition-all">
                      Detayları gör
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="text-xs text-[color:var(--color-fg-muted)]">
                      Şu an İstanbul diş klinikleri ile başlıyoruz
                    </div>
                  )}
                </div>
              </motion.div>
            );

            return s.status === "live" && s.href ? (
              <Link key={s.title} href={s.href} className="block h-full">
                {card}
              </Link>
            ) : (
              <div key={s.title} className="h-full">
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
