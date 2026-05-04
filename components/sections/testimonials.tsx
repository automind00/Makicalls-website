"use client";
import React from "react";
import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmet Yılmaz",
    role: "Restoran Sahibi",
    body: "MakiCalls sayesinde WhatsApp üzerinden otomatik sipariş alıyoruz. Müşteri memnuniyetimiz %40 arttı!",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Elif Kaya",
    role: "E-ticaret Yöneticisi",
    body: "Instagram DM'lere 7/24 otomatik yanıt verebilmek satışlarımızı ikiye katladı.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Murat Demir",
    role: "Klinik Müdürü",
    body: "Sesli asistan ile randevu sürecimiz tamamen otomatize oldu.",
    img: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    name: "Ayşe Öztürk",
    role: "Butik Otel Sahibi",
    body: "Misafirlerimiz chatbot ile anında bilgi alabiliyor. Çok profesyonel!",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Can Arslan",
    role: "Dijital Pazarlama",
    body: "Dashboard müthiş! Tüm metrikleri tek yerden takip edebiliyorum.",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Zeynep Acar",
    role: "Güzellik Salonu",
    body: "Müşterilerim artık WhatsApp'tan kolayca randevu alabiliyor.",
    img: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    name: "Burak Şahin",
    role: "Spor Salonu",
    body: "Üyelik hatırlatmaları otomatik gidiyor. Kayıp oranımız yarıya düştü.",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Selin Koç",
    role: "Eğitim Danışmanı",
    body: "7/24 bilgi veren chatbot sayesinde kayıtlarımız çok arttı.",
    img: "https://randomuser.me/api/portraits/women/28.jpg",
  },
];

function TestimonialCard({ name, role, body, img }: (typeof testimonials)[number]) {
  return (
    <div className="w-[280px] p-[1px] rounded-2xl bg-gradient-to-b from-white/15 to-transparent mb-3">
      <div className="bg-[#111111] rounded-2xl p-5 h-full">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="size-10 border-2 border-white/10">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback className="bg-[#8b5cf6] text-white text-sm font-medium">
              {name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-white">{name}</p>
            <p className="text-xs text-slate-500">{role}</p>
          </div>
        </div>
        <div className="flex gap-0.5 mb-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          ))}
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const firstSet = testimonials.slice(0, half);
  const secondSet = testimonials.slice(half);

  return (
    <section id="musteriler" className="relative py-16 md:py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8b5cf6]/5 rounded-full blur-[128px]" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#a78bfa]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#a78bfa] mb-3 sm:mb-4 block">
            Müşteri Yorumları
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-[-0.02em] leading-tight">
            Müşterilerimiz{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e9d5ff] to-[#a78bfa]">
              Ne Diyor?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Yüzlerce işletme MakiCalls ile dijital dönüşümünü başlattı.
          </p>
        </motion.div>
      </div>

      {/* Mobile: simple horizontal marquee, no perspective */}
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden md:hidden">
        <Marquee pauseOnHover repeat={2} className="[--duration:40s]">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
      </div>

      {/* Desktop: 3D perspective vertical marquee */}
      <div className="relative hidden md:flex h-[600px] w-full max-w-7xl mx-auto items-center justify-center overflow-hidden gap-4 px-4 [perspective:400px]">
        <div
          className="flex flex-row items-center gap-4"
          style={{
            transform:
              "translateX(0px) translateY(0px) translateZ(-50px) rotateX(12deg) rotateY(-6deg) rotateZ(10deg)",
          }}
        >
          <Marquee vertical pauseOnHover repeat={2} className="[--duration:50s]">
            {firstSet.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover reverse repeat={2} className="[--duration:50s]">
            {secondSet.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover repeat={2} className="hidden lg:flex [--duration:55s]">
            {firstSet.map((t) => (
              <TestimonialCard key={`alt-${t.name}`} {...t} />
            ))}
          </Marquee>
        </div>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
      </div>
    </section>
  );
}
