"use client";
import React from "react";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Bell,
} from "lucide-react";

function DashboardMockup() {
  return (
    <div className="w-full h-full bg-[#0f0f0f] p-4 md:p-6 text-white overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-white">MakiCalls Dashboard</h3>
          <p className="text-xs text-slate-500">Son 30 gün</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Bell className="w-4 h-4 text-slate-400" />
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#a78bfa]" />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { icon: <MessageSquare className="w-4 h-4" />, label: "Mesajlar", value: "12,849", change: "+23%" },
          { icon: <Users className="w-4 h-4" />, label: "Müşteriler", value: "3,421", change: "+12%" },
          { icon: <Clock className="w-4 h-4" />, label: "Ort. Yanıt", value: "1.2s", change: "-45%" },
          { icon: <TrendingUp className="w-4 h-4" />, label: "Dönüşüm", value: "%89", change: "+8%" },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#a78bfa]">{stat.icon}</span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                {stat.change}
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-lg font-bold text-white">{stat.value}</p>
            <p className="text-[10px] text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-slate-400">Mesaj Trafiği</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[10px] text-[#8b5cf6]">
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" /> WhatsApp
            </span>
            <span className="flex items-center gap-1 text-[10px] text-[#c4b5fd]">
              <span className="w-2 h-2 rounded-full bg-[#c4b5fd]" /> Instagram
            </span>
          </div>
        </div>
        {/* Mock chart bars */}
        <div className="flex items-end gap-1 h-24">
          {[35, 55, 40, 70, 60, 85, 75, 90, 65, 80, 95, 70, 85, 60, 75, 90, 80, 95, 85, 70].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col gap-0.5">
              <div
                className="w-full rounded-sm bg-gradient-to-t from-[#7c3aed] to-[#a78bfa]"
                style={{ height: `${h * 0.6}%` }}
              />
              <div
                className="w-full rounded-sm bg-gradient-to-t from-[#a78bfa]/60 to-[#c4b5fd]/60"
                style={{ height: `${(100 - h) * 0.4}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/5">
        <span className="text-xs font-medium text-slate-400 mb-3 block">Son Mesajlar</span>
        {[
          { name: "Ahmet Y.", msg: "Randevu almak istiyorum", time: "2dk", platform: "WhatsApp" },
          { name: "Elif K.", msg: "Fiyat bilgisi alabilir miyim?", time: "5dk", platform: "Instagram" },
          { name: "Murat D.", msg: "Sipariş durumu nedir?", time: "8dk", platform: "WhatsApp" },
        ].map((m, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-[10px] text-white font-medium">
                {m.name[0]}
              </div>
              <div>
                <p className="text-xs font-medium text-white">{m.name}</p>
                <p className="text-[10px] text-slate-500">{m.msg}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block">{m.time}</span>
              <span className={`text-[9px] ${m.platform === 'WhatsApp' ? 'text-emerald-400' : 'text-[#a78bfa]'}`}>{m.platform}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPreview() {
  return (
    <section className="relative bg-[#0a0a0a] overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-medium uppercase tracking-[0.2em] text-[#a78bfa] mb-4 block"
            >
              Kontrol Paneli
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Her Şey{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e9d5ff] to-[#a78bfa]">
                Tek Ekranda
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base md:text-lg">
              Tüm mesajlarınızı, müşteri verilerinizi ve otomasyon performansınızı
              gerçek zamanlı takip edin.
            </p>
          </>
        }
      >
        <DashboardMockup />
      </ContainerScroll>
    </section>
  );
}
