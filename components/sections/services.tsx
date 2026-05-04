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
    features: [
      "WhatsApp Business API entegrasyonu",
      "Instagram DM otomasyonu",
      "Akıllı cevap sistemi",
      "Randevu ve sipariş yönetimi",
      "Müşteri segmentasyonu",
      "Detaylı analitik dashboard",
    ],
  },
  {
    icon: <Mic className="w-7 h-7" />,
    title: "Chatbot + Sesli Asistan",
    subtitle: "Tam Entegrasyon",
    description: "Chatbot özelliklerinin yanında sesli arama asistanı ile müşteri deneyimini üst seviyeye taşıyın.",
    popular: true,
    features: [
      "Chatbot paketinin tüm özellikleri",
      "AI sesli arama asistanı",
      "Gelen çağrı karşılama",
      "Giden arama otomasyonu",
      "Çağrı kaydı ve analizi",
      "CRM entegrasyonu",
    ],
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Özel Çözümler",
    subtitle: "İhtiyacınıza Özel",
    description: "İşletmenize özel tasarlanmış, tamamen kişiselleştirilmiş otomasyon çözümleri.",
    features: [
      "Özel AI model eğitimi",
      "Çoklu platform entegrasyonu",
      "API geliştirme",
      "Mevcut sistem entegrasyonu",
      "Öncelikli teknik destek",
      "Sınırsız özelleştirme",
    ],
  },
];

export default function Services() {
  const scrollToContact = () => {
    const el = document.getElementById("iletisim");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hizmetler" className="relative py-16 md:py-32 bg-[#0a0a0a]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8b5cf6]/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[#8b5cf6]/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#a78bfa] mb-3 sm:mb-4 block">
            Hizmetlerimiz
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-[-0.02em] leading-tight">
            İşletmeniz İçin{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e9d5ff] to-[#a78bfa]">
              Doğru Paketi
            </span>{" "}
            Seçin
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-xl mx-auto">
            Her işletmenin ihtiyacına uygun, ölçeklenebilir çözümler sunuyoruz.
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
                  <span className="px-4 py-1.5 text-xs font-semibold bg-[#8b5cf6] text-white rounded-full shadow-[0_0_20px_-2px_#8b5cf6]">
                    En Popüler
                  </span>
                </div>
              )}

              <div
                className={`relative h-full rounded-2xl overflow-hidden bg-[#111111] border ${
                  pkg.popular ? "border-[#8b5cf6]/40 shadow-[0_0_40px_-12px_#8b5cf6]" : "border-white/10"
                }`}
              >
                <BorderBeam
                  size={pkg.popular ? 280 : 220}
                  duration={pkg.popular ? 12 : 16}
                  delay={i * 2}
                  colorFrom="#a78bfa"
                  colorTo="#7c3aed"
                />

                <div className="relative h-full p-6 lg:p-8 flex flex-col">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-white mb-5 ${
                      pkg.popular
                        ? "bg-[#8b5cf6] shadow-[0_0_20px_-4px_#8b5cf6]"
                        : "bg-white/5 border border-white/10"
                    }`}
                  >
                    {pkg.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{pkg.title}</h3>
                  <span className="text-sm text-slate-400 mb-3">{pkg.subtitle}</span>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">{pkg.description}</p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#a78bfa] mt-0.5 flex-shrink-0" />
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
                        ? "bg-[#8b5cf6] text-white hover:bg-[#7c3aed] shadow-[0_0_30px_-8px_#8b5cf6]"
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-[#8b5cf6]/40"
                    }`}
                  >
                    Teklif Al
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
