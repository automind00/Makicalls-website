"use client";
import React from "react";
import { motion } from "framer-motion";
import { Clock, UserMinus, Inbox } from "lucide-react";

const pains = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Mesai dışı çalan telefon",
    body: "Akşam 18 sonrası, hafta sonu ve tatil günleri çalan telefonlar cevapsız kalıyor. Hasta sizi aramaya bir kez sıkılır, sonra rakibi arar.",
    stat: "Aramaların %32'si mesai dışı saatlerde yapılır",
  },
  {
    icon: <UserMinus className="w-6 h-6" />,
    title: "Resepsiyonist devir hızı",
    body: "Bir resepsiyonist yetiştirmek 2 hafta sürüyor, ortalama kalış süresi 11 ay. Her gidişinde randevu defteri, hasta tonu, marka sesi sıfırlanıyor.",
    stat: "Klinik personel turnover %35-40 aralığında",
  },
  {
    icon: <Inbox className="w-6 h-6" />,
    title: "Kanal kargaşası",
    body: "WhatsApp, telefon, Instagram DM, web formu — her biri ayrı yerde. Hasta dört yerden yazıyor, kim ne istedi karışıyor, randevular düşüyor.",
    stat: "Hasta ortalama 2.4 kanaldan iletişim deniyor",
  },
];

export default function PainPoints() {
  return (
    <section className="relative py-16 md:py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-red-500/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16 max-w-2xl mx-auto"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#a78bfa] mb-3 block">
            Klinik sahiplerinin günlük problemi
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[-0.02em] leading-tight">
            Telefonu açan biri olmadığında{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[#fca5a5] to-[#f87171]">
              hasta kaybediyorsunuz
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {pains.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent"
            >
              <div className="h-full bg-[#111111] rounded-2xl p-6 md:p-7">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-300 mb-5">
                  {p.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{p.body}</p>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs text-slate-500 italic">{p.stat}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
