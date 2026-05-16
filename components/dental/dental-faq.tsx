"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "AI Türkçe ne kadar iyi konuşuyor? Aksanlı veya robotik mi?",
    a: "Doğal Türkçe ses motorları ve kliniğe özel ton ayarıyla çalışıyoruz. Hastalar genelde gerçek bir resepsiyonistle konuştuğunu düşünüyor. İsterseniz canlı demo çağrısında kendiniz dinlersiniz.",
  },
  {
    q: "Mevcut randevu defterim / CRM'imle uyumlu mu?",
    a: "Yaygın randevu yazılımları (Dentafy, MediKlinik, Cleo gibi) ve Google Calendar ile entegre çalışır. Özel sisteminiz varsa kurulum aşamasında API tarafını biz hallederiz.",
  },
  {
    q: "Kurulum ne kadar sürer? Klinik tarafından kaç saat alır?",
    a: "Toplam 3 iş günü. Sizden tek bir 15 dakikalık bilgi toplama formu istiyoruz: çalışma saatleri, hizmet listesi, randevu kuralları, sık sorulanlar. Geri kalanı bizim işimiz.",
  },
  {
    q: "Hasta kişisel verileri nasıl korunuyor? KVKK uyumlu mu?",
    a: "Veriler Türkiye'de barındırılan Supabase altyapısında, KVKK uyumlu şekilde tutuluyor. Çağrı kayıtları sadece sizin erişimde, üçüncü taraflarla paylaşılmıyor. Sözleşmede açıkça yazıyor.",
  },
  {
    q: "Pilot süresinden sonra sözleşme zorunluluğu var mı?",
    a: "Hayır. 3 ay sonra istediğiniz zaman ayrılabilirsiniz, taahhüt yok. Asistan kayıtları + hasta verileri size ait, dışa aktarımı ücretsiz.",
  },
  {
    q: "Hasta gerçekten bir doktorla konuşmak isterse ne oluyor?",
    a: "Asistan ihtiyaç duyduğu anda çağrıyı klinikteki nöbetçi numaraya yönlendiriyor veya tıbbi soru tespit ederse 'doktorumuz size dönüş yapacak' diyerek not alıp size iletiyor.",
  },
];

export default function DentalFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-16 md:py-24 bg-[color:var(--color-page)]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-3 block">
            Sıkça sorulanlar
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-tight">
            Aklınızdaki sorular
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl bg-[color:var(--color-elevated)] border border-[color:var(--color-border)] overflow-hidden shadow-[var(--shadow-sm)]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left hover:bg-brand/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-medium text-[color:var(--color-fg)]">{f.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-brand-soft flex-shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 text-sm text-[color:var(--color-fg-muted)] leading-relaxed">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const dentalFaqJsonLd = faqs.map((f) => ({
  "@type": "Question",
  name: f.q,
  acceptedAnswer: { "@type": "Answer", text: f.a },
}));
