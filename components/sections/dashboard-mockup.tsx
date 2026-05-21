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
  Wallet,
} from "lucide-react";

type TabId = "overview" | "inbox" | "calls" | "pipeline";

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Genel Bakış", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
  { id: "inbox", label: "Gelen Kutusu", icon: <Inbox className="w-3.5 h-3.5" /> },
  { id: "calls", label: "Çağrılar", icon: <Phone className="w-3.5 h-3.5" /> },
  { id: "pipeline", label: "Lead Pipeline", icon: <Users className="w-3.5 h-3.5" /> },
];

/** Sahte rakamlar tasarım amaçlı — gerçek müşteri verisi değil. */
const KPIS = [
  {
    label: "Yanıtlanan Mesaj",
    value: "1.284",
    sub: "WhatsApp · Instagram · Web",
    trend: "+18%",
    icon: <MessageCircle className="w-4 h-4" />,
    iconBg: "bg-blue-500/10 text-blue-300",
  },
  {
    label: "Karşılanan Arama",
    value: "342",
    sub: "7/24 otomatik · 0 kaçan",
    trend: "+12%",
    icon: <Phone className="w-4 h-4" />,
    iconBg: "bg-[#8b5cf6]/10 text-[#a78bfa]",
  },
  {
    label: "Kazanılan Randevu",
    value: "97",
    sub: "AI dönüşümü %64",
    trend: "+24%",
    icon: <CalendarCheck className="w-4 h-4" />,
    iconBg: "bg-emerald-500/10 text-emerald-300",
  },
  {
    label: "Tahmini Tasarruf",
    value: "₺128.500",
    sub: "operatör maliyetine kıyasla",
    trend: "+31%",
    icon: <Wallet className="w-4 h-4" />,
    iconBg: "bg-amber-500/10 text-amber-300",
    highlight: true,
  },
];

const WEEKLY = [
  { d: "Pzt", v: 62 },
  { d: "Sal", v: 78 },
  { d: "Çar", v: 54 },
  { d: "Per", v: 90 },
  { d: "Cum", v: 100 },
  { d: "Cmt", v: 73 },
  { d: "Paz", v: 41 },
];

const CHANNELS = [
  { label: "WhatsApp", pct: 42, color: "bg-emerald-400" },
  { label: "Sesli Arama", pct: 28, color: "bg-[#a78bfa]" },
  { label: "Instagram DM", pct: 18, color: "bg-rose-400" },
  { label: "Web Chat", pct: 12, color: "bg-blue-400" },
];

const INBOX_ITEMS = [
  { initials: "AY", name: "Ayşe G.", flag: "TR", preview: "Saç ekimi fiyatları hakkında...", time: "2 dk", color: "from-rose-500 to-pink-500" },
  { initials: "JA", name: "James W.", flag: "GB", preview: "I'd like to know about Botox...", time: "15 dk", color: "from-blue-500 to-indigo-500" },
  { initials: "HA", name: "Hans M.", flag: "DE", preview: "Ich möchte mich über Rhinopla...", time: "32 dk", color: "from-emerald-500 to-teal-500" },
  { initials: "AH", name: "Анна K.", flag: "RU", preview: "Здравствуйте, хочу узнать о л...", time: "1 sa", color: "from-violet-500 to-purple-500" },
];

const PIPELINE = [
  { label: "YENI", count: 4, color: "bg-slate-500/15 text-slate-300 border-slate-500/30", cards: [{ name: "Yeni Klinik A", svc: "İlk inceleme", score: 25 }] },
  { label: "AI QUALIFYING", count: 4, color: "bg-blue-500/15 text-blue-300 border-blue-500/30", cards: [{ name: "Klinik B", svc: "WhatsApp", score: 55 }] },
  { label: "🔥 HOT LEAD", count: 2, color: "bg-red-500/15 text-red-300 border-red-500/30", cards: [{ name: "Diş Klinik C", svc: "Sesli arama", score: 88 }] },
  { label: "NURTURING", count: 2, color: "bg-amber-500/15 text-amber-300 border-amber-500/30", cards: [{ name: "Klinik D", svc: "Form", score: 45 }] },
  { label: "RANDEVU", count: 1, color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", cards: [{ name: "Klinik E", svc: "Onay", score: 82 }] },
];

const CALL_DEMO = {
  caller: "Ayşe G.",
  language: "TR",
  duration: "5:38",
  handler: "AI Asistan",
  status: "Tamamlandı",
  summary:
    "Ayşe Hanım eşi için saç ekimi araştırıyor. DHI tekniğine ilgi gösterdi. Bütçe: 3.000-4.000$. İstanbul'a ulaşım ve konaklama dahil paket fiyatı talep etti.",
  fields: [
    { label: "Hasta", value: "Eşi (erkek, 35-40 yaş)" },
    { label: "Tercih", value: "DHI yöntemi" },
    { label: "Bütçe", value: "3.000 - 4.000$" },
    { label: "Konum", value: "Ankara" },
    { label: "Zaman", value: "Haziran" },
  ],
  suggestion: "Hasta yüksek niyetli (skor: 88). DHI All-Inclusive paket teklif edin (3.500$). Fotoğrafları bugün isteyin — 24 saat içinde kişisel analiz raporu gönderin.",
};

function SidebarItem({
  icon,
  label,
  active,
  badge,
  onClick,
  interactive = true,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
  interactive?: boolean;
}) {
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
        <span className="px-1.5 py-0.5 rounded-full bg-[#8b5cf6] text-white text-[9px] font-semibold">
          {badge}
        </span>
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

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {KPIS.map((s) => (
          <div
            key={s.label}
            className={`p-3 rounded-xl border ${
              s.highlight
                ? "bg-gradient-to-br from-[#8b5cf6]/20 to-transparent border-[#8b5cf6]/40"
                : "bg-white/[0.02] border-white/[0.06]"
            }`}
          >
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

      {/* Chart + channels */}
      <div className="grid lg:grid-cols-3 gap-3">
        {/* Weekly activity */}
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
                    className={`w-full rounded-md ${
                      b.v === 100
                        ? "bg-gradient-to-t from-[#8b5cf6] to-[#a78bfa]"
                        : "bg-gradient-to-t from-[#8b5cf6]/40 to-[#a78bfa]/30"
                    }`}
                  />
                </div>
                <span className="text-[8px] text-slate-500">{b.d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Channel breakdown */}
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
    <div className="flex h-full">
      <div className="w-full p-4 sm:p-5 space-y-2">
        <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-500 mb-3">
          🔍 Konuşma ara...
        </div>
        {INBOX_ITEMS.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-colors"
          >
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}>
              {m.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] uppercase font-medium text-slate-500">{m.flag}</span>
                <span className="text-xs font-medium text-white truncate">{m.name}</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate">{m.preview}</div>
            </div>
            <div className="text-[9px] text-slate-600 flex-shrink-0">{m.time}</div>
          </motion.div>
        ))}
      </div>
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
        <div className="grid grid-cols-5 gap-2 px-3 py-2 bg-white/[0.02] border-b border-white/5 text-[9px] uppercase text-slate-500 tracking-wider font-medium">
          <span>Kişi</span>
          <span>Yön</span>
          <span>Süre</span>
          <span>İşleyen</span>
          <span>Durum</span>
        </div>
        <div className="grid grid-cols-5 gap-2 px-3 py-2.5 text-[10px] items-center">
          <span className="text-white font-medium">{CALL_DEMO.caller} <span className="text-slate-600 ml-1">{CALL_DEMO.language}</span></span>
          <span className="text-blue-300">✓ Gelen</span>
          <span className="text-slate-300 tabular-nums">{CALL_DEMO.duration}</span>
          <span className="text-[#a78bfa]">{CALL_DEMO.handler}</span>
          <span className="text-emerald-300">✓ {CALL_DEMO.status}</span>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-[#8b5cf6]/10 to-transparent border border-[#8b5cf6]/20 p-3 sm:p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-[#a78bfa]" />
          <span className="text-xs font-semibold text-white">Arama Özeti & Satış Önerisi</span>
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

function PipelineScreen() {
  return (
    <div className="p-4 sm:p-5 space-y-3">
      <div>
        <h4 className="text-base font-bold text-white">Lead Pipeline</h4>
        <p className="text-[10px] text-slate-500">Hasta adaylarını takip edin</p>
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
                  <span className={`text-[8px] font-bold tabular-nums px-1.5 py-0.5 rounded ${c.score > 75 ? "bg-red-500/15 text-red-300" : c.score > 50 ? "bg-amber-500/15 text-amber-300" : "bg-slate-500/15 text-slate-400"}`}>
                    {c.score}
                  </span>
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
    case "overview":
      return <OverviewScreen />;
    case "inbox":
      return <InboxScreen />;
    case "calls":
      return <CallsScreen />;
    case "pipeline":
      return <PipelineScreen />;
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
        const order: TabId[] = ["overview", "inbox", "calls", "pipeline"];
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
            Sesli arama, WhatsApp, web chat, Instagram DM — hepsi tek gelen kutusunda. AI hangi hasta sıcak, hangisi soğuk söyler.
          </p>
        </motion.div>

        {/* Tab switcher */}
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

        {/* Mockup frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/15 via-[#8b5cf6]/20 to-transparent shadow-[0_30px_80px_-30px_rgba(139,92,246,0.4)]"
        >
          <div className="rounded-3xl bg-[#080808] overflow-hidden">
            {/* Browser bar */}
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

            {/* App body */}
            <div className="grid grid-cols-12 min-h-[420px] sm:min-h-[480px]">
              {/* Sidebar */}
              <div className="hidden md:flex md:col-span-3 lg:col-span-2 flex-col gap-1 p-3 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d0d] border-r border-white/5">
                <div className="flex items-center gap-2 px-2 py-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center text-[10px] font-bold text-white">
                    DK
                  </div>
                  <div className="leading-tight">
                    <div className="text-[10px] font-semibold text-white">Demo Klinik</div>
                    <div className="text-[9px] text-slate-500">Pilot</div>
                  </div>
                </div>
                <SidebarItem icon={<LayoutGrid className="w-3.5 h-3.5" />} label="Genel Bakış" active={activeTab === "overview"} onClick={() => selectTab("overview")} />
                <SidebarItem icon={<Inbox className="w-3.5 h-3.5" />} label="Gelen Kutusu" active={activeTab === "inbox"} badge={8} onClick={() => selectTab("inbox")} />
                <SidebarItem icon={<Phone className="w-3.5 h-3.5" />} label="Çağrılar" active={activeTab === "calls"} onClick={() => selectTab("calls")} />
                <SidebarItem icon={<Users className="w-3.5 h-3.5" />} label="Lead Pipeline" active={activeTab === "pipeline"} onClick={() => selectTab("pipeline")} />
                <SidebarItem icon={<Bot className="w-3.5 h-3.5" />} label="AI Asistan" interactive={false} />
                <SidebarItem icon={<Workflow className="w-3.5 h-3.5" />} label="İş Akışları" interactive={false} />
                <div className="mt-auto pt-3 border-t border-white/5">
                  <SidebarItem icon={<Settings className="w-3.5 h-3.5" />} label="Hesap Ayarları" interactive={false} />
                </div>
              </div>

              {/* Main */}
              <div className="col-span-12 md:col-span-9 lg:col-span-10 bg-[#0a0a0a]">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
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
