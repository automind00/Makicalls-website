"use client";
import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mic, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

const packages = [
  {
    icon: <MessageCircle className="w-7 h-7" />,
    title: "Chatbot Paketi",
    subtitle: "WhatsApp & Instagram",
    description: "Müşterilerinize 7/24 otomatik yanıt verin, randevu alın ve bilgi paylaşın.",
    price: "$199",
    priceNote: "/ay",
    priceDetail: "Kurulum ücreti yok",
    ctaLabel: "Bu Paketi Seç",
    features: [
      "WhatsApp Business API entegrasyonu",
      "Instagram DM otomasyonu",
      "7/24 akıllı, bağlam farkında cevaplar",
      "Randevu hatırlatma (24 saat + 2 saat önce)",
      "Google yorum otomasyonu",
      "Temel yönetim paneli (CRM görünümü)",
    ],
  },
  {
    icon: <Mic className="w-7 h-7" />,
    title: "Chatbot + Sesli Asistan",
    subtitle: "Tam Entegrasyon",
    description: "Chatbot özelliklerinin yanında sesli arama asistanı ile müşteri deneyimini üst seviyeye taşıyın.",
    popular: true,
    price: "$599",
    priceNote: "/ay",
    priceDetail: "Kurulum ücreti yok • İlk 14 gün risksiz",
    ctaLabel: "Bu Paketi Seç",
    features: [
      "Chatbot paketinin tüm özellikleri",
      "AI sesli arama asistanı (Türkçe, 7/24)",
      "Gelen çağrı karşılama + randevu oluşturma",
      "Ayda 3.000 dakika sesli görüşme dahil (aşımda dk. başı $0.30)",
      "Çağrı kaydı, transkript ve güven skoru",
      "Gelişmiş CRM + özel dashboard (tüm kanallar tek ekranda)",
    ],
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Özel Çözümler",
    subtitle: "İhtiyacınıza Özel",
    description: "İşletmenize özel tasarlanmış, tamamen kişiselleştirilmiş otomasyon çözümleri.",
    price: "Özel Fiyatlandırma",
    priceDetail: "Görüşme sonrası net teklif",
    ctaLabel: "Fiyat Teklifi Alın",
    features: [
      "Özel AI model eğitimi",
      "Çoklu platform / çoklu şube entegrasyonu",
      "API geliştirme + üçüncü parti CRM entegrasyonu",
      "Mevcut sisteminize tam entegrasyon",
      "Öncelikli teknik destek",
      "Sınırsız özelleştirme, sınırsız kullanım kotası",
    ],
  },
];

export default function Services() {
  const scrollToContact = () => {
    const el = document.getElementById("iletisim");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hizmetler" className="relative py-16 md:py-32 bg-[color:var(--color-page)]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-brand/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-3 sm:mb-4 block">
            Hizmetlerimiz
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-fg)] mb-3 sm:mb-4 tracking-[-0.02em] leading-tight">
            AI Çağrı Merkezi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              Paketleri
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[color:var(--color-fg-muted)] max-w-xl mx-auto">
            Sesli arama, WhatsApp, Instagram — müşterin nereden geliyorsa orada cevap veren paketler.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative"
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <span className="px-4 py-1.5 text-xs font-semibold bg-brand text-white rounded-full shadow-[0_0_20px_-2px_rgb(var(--brand))]">
                    En Popüler
                  </span>
                </div>
              )}

              <div
                className={`relative h-full rounded-2xl overflow-hidden bg-[color:var(--color-elevated)] border shadow-[var(--shadow-md)] ${
                  pkg.popular ? "border-brand/40 shadow-[0_0_40px_-12px_rgb(var(--brand))]" : "border-[color:var(--color-border)]"
                }`}
              >
                <BorderBeam
                  size={pkg.popular ? 280 : 220}
                  duration={pkg.popular ? 12 : 16}
                  delay={i * 2}
                  colorFrom="rgb(var(--brand-soft))"
                  colorTo="rgb(var(--brand-deep))"
                />

                <div className="relative h-full p-6 lg:p-8 flex flex-col">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-white mb-5 ${
                      pkg.popular
                        ? "bg-brand shadow-[0_0_20px_-4px_rgb(var(--brand))]"
                        : "bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-brand-soft"
                    }`}
                  >
                    {pkg.icon}
                  </div>

                  <h3 className="text-xl font-bold text-[color:var(--color-fg)] mb-1">{pkg.title}</h3>
                  <span className="text-sm text-[color:var(--color-fg-muted)] mb-3">{pkg.subtitle}</span>

                  <div className="flex items-baseline gap-1.5 mt-4 mb-1">
                    <span
                      className={`font-bold text-[color:var(--color-fg)] tracking-tight ${
                        pkg.priceNote ? "text-3xl lg:text-4xl" : "text-xl lg:text-2xl"
                      }`}
                    >
                      {pkg.price}
                    </span>
                    {pkg.priceNote && (
                      <span className="text-sm text-[color:var(--color-fg-muted)]">{pkg.priceNote}</span>
                    )}
                  </div>
                  {pkg.priceDetail && (
                    <span className="text-xs text-brand-soft font-medium mb-4 block">{pkg.priceDetail}</span>
                  )}

                  <p className="text-sm text-[color:var(--color-fg-muted)] mb-6 leading-relaxed">{pkg.description}</p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((feature, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-[color:var(--color-fg-secondary)]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-soft mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={scrollToContact}
                    className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                      pkg.popular
                        ? "bg-brand text-white hover:bg-brand-deep shadow-[0_0_30px_-8px_rgb(var(--brand))]"
                        : "bg-[color:var(--color-surface)] text-[color:var(--color-fg)] border border-[color:var(--color-border)] hover:bg-brand/5 hover:border-brand/40"
                    }`}
                  >
                    {pkg.ctaLabel}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
