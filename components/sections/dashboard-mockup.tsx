"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Inbox,
  Phone,
  Users,
  Bot,
  Workflow,
  Settings,
  TrendingUp,
  MessageCircle,
  Mic,
  Sparkles,
  CalendarCheck,
  CalendarDays,
  Wallet,
  Globe,
  Clock,
} from "lucide-react";

type TabId = "overview" | "inbox" | "calls" | "appointments" | "pipeline";
type Channel = "whatsapp" | "instagram" | "voice" | "web";

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Genel Bakış", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
  { id: "inbox", label: "Gelen Kutusu", icon: <Inbox className="w-3.5 h-3.5" /> },
  { id: "calls", label: "Çağrılar", icon: <Phone className="w-3.5 h-3.5" /> },
  { id: "appointments", label: "Randevular", icon: <CalendarDays className="w-3.5 h-3.5" /> },
  { id: "pipeline", label: "Lead Pipeline", icon: <Users className="w-3.5 h-3.5" /> },
];

const InstagramGlyph = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const CHANNEL_META: Record<Channel, { label: string; color: string; icon: React.ReactNode }> = {
  whatsapp: { label: "WhatsApp", color: "text-emerald-400", icon: <MessageCircle className="w-3 h-3" /> },
  instagram: { label: "Instagram", color: "text-rose-400", icon: <InstagramGlyph className="w-3 h-3" /> },
  voice: { label: "Sesli", color: "text-[#a78bfa]", icon: <Mic className="w-3 h-3" /> },
  web: { label: "Web Chat", color: "text-blue-400", icon: <Globe className="w-3 h-3" /> },
};

function ChannelTag({ channel, showLabel = false }: { channel: Channel; showLabel?: boolean }) {
  const m = CHANNEL_META[channel];
  return (
    <span className={`inline-flex items-center gap-1 ${m.color}`}>
      {m.icon}
      {showLabel && <span className="text-[9px] font-medium">{m.label}</span>}
    </span>
  );
}

/** Sahte rakamlar tasarım amaçlı — gerçek müşteri verisi değil. */
const KPIS = [
  { label: "Yanıtlanan Mesaj", value: "1.284", sub: "WhatsApp · Instagram · Web", trend: "+18%", icon: <MessageCircle className="w-4 h-4" />, iconBg: "bg-blue-500/10 text-blue-300" },
  { label: "Karşılanan Arama", value: "342", sub: "7/24 otomatik · 0 kaçan", trend: "+12%", icon: <Phone className="w-4 h-4" />, iconBg: "bg-[#8b5cf6]/10 text-[#a78bfa]" },
  { label: "Kazanılan Randevu", value: "97", sub: "AI dönüşümü %64", trend: "+24%", icon: <CalendarCheck className="w-4 h-4" />, iconBg: "bg-emerald-500/10 text-emerald-300" },
  { label: "Tahmini Tasarruf", value: "₺128.500", sub: "operatör maliyetine kıyasla", trend: "+31%", icon: <Wallet className="w-4 h-4" />, iconBg: "bg-amber-500/10 text-amber-300", highlight: true },
];

const WEEKLY = [
  { d: "Pzt", v: 62 }, { d: "Sal", v: 78 }, { d: "Çar", v: 54 }, { d: "Per", v: 90 },
  { d: "Cum", v: 100 }, { d: "Cmt", v: 73 }, { d: "Paz", v: 41 },
];

const CHANNELS: { label: string; pct: number; color: string }[] = [
  { label: "WhatsApp", pct: 42, color: "bg-emerald-400" },
  { label: "Sesli Arama", pct: 28, color: "bg-[#a78bfa]" },
  { label: "Instagram DM", pct: 18, color: "bg-rose-400" },
  { label: "Web Chat", pct: 12, color: "bg-blue-400" },
];

const INBOX_ITEMS: { initials: string; name: string; flag: string; channel: Channel; preview: string; time: string; unread?: boolean; color: string }[] = [
  { initials: "AG", name: "Ayşe G.", flag: "TR", channel: "whatsapp", preview: "Diş beyazlatma için fiyat bilgisi alabilir miyim?", time: "2 dk", unread: true, color: "from-rose-500 to-pink-500" },
  { initials: "MK", name: "Mehmet K.", flag: "TR", channel: "instagram", preview: "İmplant konsültasyonu için ne zaman randevu alabilirim?", time: "15 dk", unread: true, color: "from-blue-500 to-indigo-500" },
  { initials: "ED", name: "Elif D.", flag: "TR", channel: "web", preview: "Ortodonti kontrolümü yarına alabilir miyiz?", time: "32 dk", color: "from-emerald-500 to-teal-500" },
  { initials: "CY", name: "Can Y.", flag: "TR", channel: "whatsapp", preview: "Dolgu için bugün müsait bir saat var mı?", time: "1 sa", color: "from-violet-500 to-purple-500" },
  { initials: "ZA", name: "Zeynep A.", flag: "TR", channel: "instagram", preview: "Kanal tedavisi sonrası kontrol için bilgi almak istiyorum.", time: "2 sa", color: "from-amber-500 to-orange-500" },
];

const CALL_LIST: { caller: string; language: string; dir: "Gelen" | "Giden"; duration: string; status: string; statusColor: string; active?: boolean }[] = [
  { caller: "Ayşe G.", language: "TR", dir: "Gelen", duration: "5:38", status: "Randevu açıldı", statusColor: "text-emerald-300", active: true },
  { caller: "Mehmet K.", language: "TR", dir: "Giden", duration: "2:14", status: "Geri arandı", statusColor: "text-blue-300" },
  { caller: "John D.", language: "EN", dir: "Gelen", duration: "3:52", status: "Bilgi verildi", statusColor: "text-slate-300" },
  { caller: "Fatma Y.", language: "TR", dir: "Gelen", duration: "1:07", status: "Mesaja düştü", statusColor: "text-amber-300" },
];

const CALL_DEMO = {
  summary: "Ayşe Hanım implant tedavisi için bilgi almak amacıyla aradı. Daha önce başka bir klinikte muayene olmuş, fiyat ve süreci karşılaştırıyor. Sabah saatlerini tercih ediyor.",
  fields: [
    { label: "Hasta", value: "Ayşe G. (42 yaş)" },
    { label: "Tedavi", value: "İmplant" },
    { label: "Tercih", value: "Sabah randevusu" },
    { label: "Durum", value: "Fiyat karşılaştırıyor" },
  ],
  suggestion: "Hasta yüksek niyetli (skor: 88). Bugün içinde net bir fiyat teklifiyle dönün ve sabah saatine randevu önerin — başka klinikle kıyaslıyor, hızlı dönüş kararını etkileyebilir.",
};

type ApptStatus = "confirmed" | "upcoming" | "pending" | "cancelled" | "completed";
const STATUS_META: Record<ApptStatus, { label: string; cls: string }> = {
  confirmed: { label: "Onaylandı", cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  upcoming: { label: "Yaklaşıyor", cls: "bg-blue-500/15 text-blue-300 border-blue-500/30" },
  pending: { label: "Onay bekliyor", cls: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
  cancelled: { label: "İptal", cls: "bg-red-500/15 text-red-300 border-red-500/30" },
  completed: { label: "Tamamlandı", cls: "bg-slate-500/15 text-slate-400 border-slate-500/30" },
};

const APPT_STATS = [
  { label: "Bugün", value: "5", color: "text-white" },
  { label: "Yaklaşan", value: "12", color: "text-blue-300" },
  { label: "Onay bekleyen", value: "3", color: "text-amber-300" },
  { label: "İptal (hafta)", value: "2", color: "text-red-300" },
];

const APPOINTMENTS: { name: string; service: string; time: string; channel: Channel; status: ApptStatus }[] = [
  { name: "Ayşe Gündüz", service: "İmplant konsültasyonu", time: "Bugün 14:30", channel: "voice", status: "confirmed" },
  { name: "Mehmet Kaya", service: "Diş beyazlatma", time: "Bugün 16:00", channel: "whatsapp", status: "upcoming" },
  { name: "Elif Demir", service: "Ortodonti kontrol", time: "Yarın 10:00", channel: "instagram", status: "pending" },
  { name: "Can Yılmaz", service: "Dolgu", time: "Yarın 11:30", channel: "web", status: "confirmed" },
  { name: "Zeynep Ak", service: "Kanal tedavisi", time: "23 May 09:00", channel: "whatsapp", status: "cancelled" },
  { name: "Burak Şen", service: "Çekim sonrası kontrol", time: "23 May 15:00", channel: "voice", status: "completed" },
];

function SidebarItem({ icon, label, active, badge, onClick, interactive = true }: { icon: React.ReactNode; label: string; active?: boolean; badge?: number; onClick?: () => void; interactive?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!interactive}
      aria-pressed={active}
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors text-left ${
        active
          ? "bg-[#8b5cf6]/15 text-white border border-[#8b5cf6]/30"
          : interactive
            ? "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03] border border-transparent cursor-pointer"
            : "text-slate-500 border border-transparent cursor-default opacity-70"
      }`}
    >
      <span className={active ? "text-[#a78bfa]" : "text-slate-500"}>{icon}</span>
      <span className="flex-1 truncate">{label}</span>
      {badge !== undefined && (
        <span className="px-1.5 py-0.5 rounded-full bg-[#8b5cf6] text-white text-[9px] font-semibold">{badge}</span>
      )}
      {active && <span className="w-1 h-1 rounded-full bg-[#a78bfa] shadow-[0_0_6px_#a78bfa]" />}
    </button>
  );
}

function OverviewScreen() {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white">Genel Bakış</h4>
          <p className="text-[11px] text-slate-500">Demo Klinik — Son 30 gün</p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-slate-400 font-medium">Canlı</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {KPIS.map((s) => (
          <div key={s.label} className={`p-3 rounded-xl border ${s.highlight ? "bg-gradient-to-br from-[#8b5cf6]/20 to-transparent border-[#8b5cf6]/40" : "bg-white/[0.02] border-white/[0.06]"}`}>
            <div className="flex items-center justify-between mb-2.5">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.iconBg}`}>{s.icon}</div>
              <span className="text-[9px] text-emerald-300 font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-2.5 h-2.5" /> {s.trend}
              </span>
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white tabular-nums leading-none">{s.value}</div>
            <div className="text-[10px] text-slate-300 mt-1.5 font-medium truncate">{s.label}</div>
            <div className="text-[9px] text-slate-500 mt-0.5 truncate">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-white">Haftalık konuşma hacmi</span>
            <span className="text-[9px] text-slate-500">son 7 gün</span>
          </div>
          <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-24">
            {WEEKLY.map((b, i) => (
              <div key={b.d} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex items-end h-20">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${b.v}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
                    className={`w-full rounded-md ${b.v === 100 ? "bg-gradient-to-t from-[#8b5cf6] to-[#a78bfa]" : "bg-gradient-to-t from-[#8b5cf6]/40 to-[#a78bfa]/30"}`}
                  />
                </div>
                <span className="text-[8px] text-slate-500">{b.d}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <span className="text-[11px] font-semibold text-white block mb-3">Kanal dağılımı</span>
          <div className="space-y-2.5">
            {CHANNELS.map((c, i) => (
              <div key={c.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-300">{c.label}</span>
                  <span className="text-[10px] text-slate-400 tabular-nums font-medium">%{c.pct}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${c.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
                    className={`h-full rounded-full ${c.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InboxScreen() {
  return (
    <div className="p-4 sm:p-5 space-y-2">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h4 className="text-base font-bold text-white">Gelen Kutusu</h4>
          <p className="text-[10px] text-slate-500">WhatsApp · Instagram · Web Chat — tek akış</p>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 text-[9px] text-[#a78bfa] font-medium">8 okunmamış</span>
      </div>
      {INBOX_ITEMS.map((m, i) => (
        <motion.div
          key={m.name}
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className={`flex items-center gap-3 p-2.5 rounded-lg border transition-colors ${m.unread ? "bg-white/[0.03] border-white/10" : "border-transparent hover:bg-white/[0.02]"}`}
        >
          <div className="relative flex-shrink-0">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-[10px] font-bold text-white`}>{m.initials}</div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#0a0a0a] flex items-center justify-center">
              <ChannelTag channel={m.channel} />
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-xs font-medium text-white truncate">{m.name}</span>
              <span className="text-[9px] uppercase font-medium text-slate-600">{m.flag}</span>
              {m.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]" />}
            </div>
            <div className="text-[10px] text-slate-500 truncate">{m.preview}</div>
          </div>
          <div className="text-[9px] text-slate-600 flex-shrink-0">{m.time}</div>
        </motion.div>
      ))}
    </div>
  );
}

function CallsScreen() {
  return (
    <div className="p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-white">Çağrılar</h4>
          <p className="text-[10px] text-slate-500">Sesli AI görüşme kayıtları</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/30">
          <Mic className="w-2.5 h-2.5 text-[#a78bfa]" />
          <span className="text-[9px] text-[#a78bfa] font-medium">Demo Dinle</span>
        </div>
      </div>

      <div className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-white/[0.02] border-b border-white/5 text-[9px] uppercase text-slate-500 tracking-wider font-medium">
          <span className="col-span-4">Kişi</span>
          <span className="col-span-2">Yön</span>
          <span className="col-span-2">Süre</span>
          <span className="col-span-4">Durum</span>
        </div>
        {CALL_LIST.map((c) => (
          <div key={c.caller} className={`grid grid-cols-12 gap-2 px-3 py-2 text-[10px] items-center border-b border-white/5 last:border-0 ${c.active ? "bg-[#8b5cf6]/[0.06]" : ""}`}>
            <span className="col-span-4 text-white font-medium truncate">{c.caller} <span className="text-slate-600 ml-1">{c.language}</span></span>
            <span className={`col-span-2 ${c.dir === "Gelen" ? "text-blue-300" : "text-violet-300"}`}>{c.dir}</span>
            <span className="col-span-2 text-slate-300 tabular-nums">{c.duration}</span>
            <span className={`col-span-4 ${c.statusColor} truncate`}>✓ {c.status}</span>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-gradient-to-br from-[#8b5cf6]/10 to-transparent border border-[#8b5cf6]/20 p-3 sm:p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-[#a78bfa]" />
          <span className="text-xs font-semibold text-white">Arama Özeti & Satış Önerisi</span>
          <span className="text-[9px] text-slate-500">— Ayşe G.</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed">{CALL_DEMO.summary}</p>
        <div className="grid grid-cols-2 gap-1.5">
          {CALL_DEMO.fields.map((f) => (
            <div key={f.label} className="text-[9px]">
              <span className="text-slate-500">{f.label}: </span>
              <span className="text-slate-200">{f.value}</span>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <Sparkles className="w-3 h-3 text-amber-300 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-[9px] uppercase tracking-wider text-amber-300 font-semibold">Öneri</span>
            <p className="text-[10px] text-slate-300 leading-relaxed mt-0.5">{CALL_DEMO.suggestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppointmentsScreen() {
  return (
    <div className="p-4 sm:p-5 space-y-3">
      <div>
        <h4 className="text-base font-bold text-white">Randevular</h4>
        <p className="text-[10px] text-slate-500">Sesli, WhatsApp ve Instagram’dan otomatik açıldı</p>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-4 gap-2">
        {APPT_STATS.map((s) => (
          <div key={s.label} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-center">
            <div className={`text-base sm:text-lg font-bold tabular-nums leading-none ${s.color}`}>{s.value}</div>
            <div className="text-[8px] sm:text-[9px] text-slate-500 mt-1 truncate">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Appointment list */}
      <div className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-white/[0.02] border-b border-white/5 text-[9px] uppercase text-slate-500 tracking-wider font-medium">
          <span className="col-span-5">Hasta / Hizmet</span>
          <span className="col-span-3">Zaman</span>
          <span className="col-span-1 text-center">Kanal</span>
          <span className="col-span-3 text-right">Durum</span>
        </div>
        {APPOINTMENTS.map((a, i) => {
          const st = STATUS_META[a.status];
          return (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`grid grid-cols-12 gap-2 px-3 py-2.5 items-center border-b border-white/5 last:border-0 ${a.status === "cancelled" ? "opacity-60" : ""}`}
            >
              <div className="col-span-5 min-w-0">
                <div className={`text-[11px] font-medium text-white truncate ${a.status === "cancelled" ? "line-through" : ""}`}>{a.name}</div>
                <div className="text-[9px] text-slate-500 truncate">{a.service}</div>
              </div>
              <div className="col-span-3 flex items-center gap-1 text-[10px] text-slate-300 min-w-0">
                <Clock className="w-2.5 h-2.5 text-slate-500 flex-shrink-0" />
                <span className="truncate">{a.time}</span>
              </div>
              <div className="col-span-1 flex justify-center">
                <ChannelTag channel={a.channel} />
              </div>
              <div className="col-span-3 flex justify-end">
                <span className={`px-2 py-0.5 rounded-full border text-[8px] sm:text-[9px] font-medium whitespace-nowrap ${st.cls}`}>{st.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const PIPELINE = [
  { label: "YENI", count: 4, color: "bg-slate-500/15 text-slate-300 border-slate-500/30", cards: [{ name: "Yeni Klinik A", svc: "İlk inceleme", score: 25 }] },
  { label: "AI QUALIFYING", count: 4, color: "bg-blue-500/15 text-blue-300 border-blue-500/30", cards: [{ name: "Klinik B", svc: "WhatsApp", score: 55 }] },
  { label: "🔥 HOT LEAD", count: 2, color: "bg-red-500/15 text-red-300 border-red-500/30", cards: [{ name: "Diş Klinik C", svc: "Sesli arama", score: 88 }] },
  { label: "NURTURING", count: 2, color: "bg-amber-500/15 text-amber-300 border-amber-500/30", cards: [{ name: "Klinik D", svc: "Form", score: 45 }] },
  { label: "RANDEVU", count: 1, color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", cards: [{ name: "Klinik E", svc: "Onay", score: 82 }] },
];

function PipelineScreen() {
  return (
    <div className="p-4 sm:p-5 space-y-3">
      <div>
        <h4 className="text-base font-bold text-white">Lead Pipeline</h4>
        <p className="text-[10px] text-slate-500">Hasta adaylarını AI puanıyla takip edin</p>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {PIPELINE.map((col) => (
          <div key={col.label} className="space-y-2">
            <div className={`flex items-center justify-between gap-1 px-2 py-1.5 rounded-md border text-[9px] font-medium ${col.color}`}>
              <span className="truncate">{col.label}</span>
              <span className="opacity-80">{col.count}</span>
            </div>
            {col.cards.map((c) => (
              <div key={c.name} className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="text-[9px] font-medium text-white truncate">{c.name}</div>
                <div className="text-[8px] text-slate-500 truncate">{c.svc}</div>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className={`text-[8px] font-bold tabular-nums px-1.5 py-0.5 rounded ${c.score > 75 ? "bg-red-500/15 text-red-300" : c.score > 50 ? "bg-amber-500/15 text-amber-300" : "bg-slate-500/15 text-slate-400"}`}>{c.score}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenRenderer({ tab }: { tab: TabId }) {
  switch (tab) {
    case "overview": return <OverviewScreen />;
    case "inbox": return <InboxScreen />;
    case "calls": return <CallsScreen />;
    case "appointments": return <AppointmentsScreen />;
    case "pipeline": return <PipelineScreen />;
  }
}

export default function DashboardMockup() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [autoplay, setAutoplay] = useState(true);

  const selectTab = (id: TabId) => {
    setActiveTab(id);
    setAutoplay(false);
  };

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => {
      setActiveTab((prev) => {
        const order: TabId[] = ["overview", "inbox", "calls", "appointments", "pipeline"];
        const idx = order.indexOf(prev);
        return order[(idx + 1) % order.length];
      });
    }, 5000);
    return () => window.clearInterval(id);
  }, [autoplay]);

  return (
    <section className="relative py-16 md:py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#8b5cf6]/8 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14 max-w-2xl mx-auto"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#a78bfa] mb-3 block">
            Klinik paneliniz · Canlı önizleme
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[-0.02em] leading-tight">
            Hastayla her temas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e9d5ff] to-[#a78bfa]">
              tek panelden
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Sesli arama, WhatsApp, Instagram, web chat ve randevular — hepsi tek yerde. Sekmelere tıklayıp gezin.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => selectTab(t.id)}
              aria-pressed={activeTab === t.id}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all border ${
                activeTab === t.id
                  ? "bg-[#8b5cf6] text-white border-[#8b5cf6] shadow-[0_0_20px_-4px_#8b5cf6]"
                  : "bg-white/[0.03] text-slate-300 border-white/10 hover:border-[#8b5cf6]/40 hover:text-white"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/15 via-[#8b5cf6]/20 to-transparent shadow-[0_30px_80px_-30px_rgba(139,92,246,0.4)]"
        >
          <div className="rounded-3xl bg-[#080808] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0d0d0d] border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
              </div>
              <div className="ml-4 flex-1 max-w-md mx-auto">
                <div className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[10px] text-slate-500 text-center truncate">
                  panel.makicalls.com / demo-klinik
                </div>
              </div>
              <div className="w-12" />
            </div>

            <div className="grid grid-cols-12 min-h-[440px] sm:min-h-[500px]">
              <div className="hidden md:flex md:col-span-3 lg:col-span-2 flex-col gap-1 p-3 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d0d] border-r border-white/5">
                <div className="flex items-center gap-2 px-2 py-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center text-[10px] font-bold text-white">DK</div>
                  <div className="leading-tight">
                    <div className="text-[10px] font-semibold text-white">Demo Klinik</div>
                    <div className="text-[9px] text-slate-500">Pilot</div>
                  </div>
                </div>
                <SidebarItem icon={<LayoutGrid className="w-3.5 h-3.5" />} label="Genel Bakış" active={activeTab === "overview"} onClick={() => selectTab("overview")} />
                <SidebarItem icon={<Inbox className="w-3.5 h-3.5" />} label="Gelen Kutusu" active={activeTab === "inbox"} badge={8} onClick={() => selectTab("inbox")} />
                <SidebarItem icon={<Phone className="w-3.5 h-3.5" />} label="Çağrılar" active={activeTab === "calls"} onClick={() => selectTab("calls")} />
                <SidebarItem icon={<CalendarDays className="w-3.5 h-3.5" />} label="Randevular" active={activeTab === "appointments"} badge={5} onClick={() => selectTab("appointments")} />
                <SidebarItem icon={<Users className="w-3.5 h-3.5" />} label="Lead Pipeline" active={activeTab === "pipeline"} onClick={() => selectTab("pipeline")} />
                <SidebarItem icon={<Bot className="w-3.5 h-3.5" />} label="AI Asistan" interactive={false} />
                <SidebarItem icon={<Workflow className="w-3.5 h-3.5" />} label="İş Akışları" interactive={false} />
                <div className="mt-auto pt-3 border-t border-white/5">
                  <SidebarItem icon={<Settings className="w-3.5 h-3.5" />} label="Hesap Ayarları" interactive={false} />
                </div>
              </div>

              <div className="col-span-12 md:col-span-9 lg:col-span-10 bg-[#0a0a0a]">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                  <ScreenRenderer tab={activeTab} />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="mt-6 text-center text-[11px] text-slate-500">
          Tasarım amaçlı önizleme. Veriler örnektir, gerçek müşteri verisi değildir.
        </p>
      </div>
    </section>
  );
}
