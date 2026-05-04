"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Mail,
  Building2,
  MessageSquare,
  Calendar,
  ArrowLeft,
  LogOut,
  RefreshCw,
  Inbox,
  CheckCircle2,
  Clock,
  Archive,
  AlertCircle,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { ContactSubmission, ContactSubmissionStatus } from "@/lib/supabase/types";

const STATUS_LABEL: Record<ContactSubmissionStatus, string> = {
  yeni: "Yeni",
  iletisim_kuruldu: "İletişim Kuruldu",
  kapandi: "Kapandı",
};

const STATUS_STYLE: Record<ContactSubmissionStatus, string> = {
  yeni: "bg-[#8b5cf6]/15 text-[#c4b5fd] border-[#8b5cf6]/40",
  iletisim_kuruldu: "bg-amber-500/15 text-amber-300 border-amber-500/40",
  kapandi: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
};

const STATUS_ICON: Record<ContactSubmissionStatus, React.ReactNode> = {
  yeni: <Inbox className="w-3 h-3" />,
  iletisim_kuruldu: <Clock className="w-3 h-3" />,
  kapandi: <Archive className="w-3 h-3" />,
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const router = useRouter();
  const [authState, setAuthState] = useState<"checking" | "authed" | "unauthed">("checking");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<ContactSubmissionStatus | "all">("all");
  const [refreshing, setRefreshing] = useState(false);

  const supabase = getSupabaseBrowserClient();

  // Auth check
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!mounted) return;

      if (error || !data.session) {
        setAuthState("unauthed");
        router.replace("/admin/login");
        return;
      }

      setUserEmail(data.session.user.email ?? null);
      setAuthState("authed");
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, session: { user?: { email?: string | null } } | null) => {
      if (!session) {
        setAuthState("unauthed");
        router.replace("/admin/login");
      } else {
        setUserEmail(session.user?.email ?? null);
        setAuthState("authed");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const loadSubmissions = useCallback(async () => {
    setError(null);
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);

      if (error) throw error;
      setSubmissions((data ?? []) as ContactSubmission[]);
    } catch (err) {
      console.error("[Admin] load error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Form kayıtları yüklenemedi. Yetkiniz olmayabilir.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [supabase]);

  // Initial load + realtime subscription
  useEffect(() => {
    if (authState !== "authed") return;
    loadSubmissions();

    const channel = supabase
      .channel("contact_submissions_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_submissions" },
        () => {
          loadSubmissions();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [authState, supabase, loadSubmissions]);

  const handleStatusChange = async (id: number, newStatus: ContactSubmissionStatus) => {
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)));
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status: newStatus })
      .eq("id", id);
    if (error) {
      console.error("[Admin] status update error:", error);
      loadSubmissions();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadSubmissions();
  };

  const filtered =
    filter === "all" ? submissions : submissions.filter((s) => s.status === filter);

  const stats = {
    total: submissions.length,
    yeni: submissions.filter((s) => s.status === "yeni").length,
    iletisim_kuruldu: submissions.filter((s) => s.status === "iletisim_kuruldu").length,
    kapandi: submissions.filter((s) => s.status === "kapandi").length,
  };

  if (authState === "checking") {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#a78bfa] animate-spin" />
      </main>
    );
  }

  if (authState === "unauthed") {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Subtle glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8b5cf6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Ana sayfa
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Maki<span className="text-[#a78bfa]">Calls</span>{" "}
              <span className="text-slate-500 font-normal">/ admin</span>
            </h1>
            {userEmail && <p className="text-xs text-slate-500 mt-1">{userEmail}</p>}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-slate-300 transition-colors disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Yenile
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-300 text-xs text-slate-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Çıkış
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Toplam", value: stats.total, status: "all" as const },
            { label: "Yeni", value: stats.yeni, status: "yeni" as const },
            { label: "İletişim Kuruldu", value: stats.iletisim_kuruldu, status: "iletisim_kuruldu" as const },
            { label: "Kapandı", value: stats.kapandi, status: "kapandi" as const },
          ].map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setFilter(s.status)}
              className={`text-left p-4 rounded-xl border transition-all ${
                filter === s.status
                  ? "bg-[#8b5cf6]/10 border-[#8b5cf6]/40"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20"
              }`}
            >
              <p className="text-xs text-slate-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-white">{s.value}</p>
            </button>
          ))}
        </div>

        {error && (
          <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-300 mb-4">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Hata</p>
              <p className="text-xs text-red-300/80 mt-0.5">{error}</p>
              <p className="text-xs text-red-300/60 mt-1">
                Bu e-posta adresi <code className="font-mono">admin_users</code> tablosunda yetkili
                olarak listelenmiş mi kontrol edin.
              </p>
            </div>
          </div>
        )}

        {/* List */}
        <div className="space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-[#a78bfa] animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-dashed border-white/10">
              <Inbox className="w-10 h-10 text-slate-700 mx-auto mb-3" />
              <p className="text-sm text-slate-500">
                {filter === "all"
                  ? "Henüz form gönderimi yok."
                  : `\"${STATUS_LABEL[filter as ContactSubmissionStatus]}\" durumunda kayıt yok.`}
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {filtered.map((s) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  layout
                  className="p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/[0.02]"
                >
                  <div className="bg-[#111111] rounded-2xl p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-semibold text-white truncate">{s.name}</h3>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${STATUS_STYLE[s.status]}`}
                          >
                            {STATUS_ICON[s.status]}
                            {STATUS_LABEL[s.status]}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {formatDate(s.created_at)}
                          </span>
                        </div>
                      </div>

                      <select
                        value={s.status}
                        onChange={(e) =>
                          handleStatusChange(s.id, e.target.value as ContactSubmissionStatus)
                        }
                        className="text-xs bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-[#8b5cf6]/60 cursor-pointer"
                      >
                        <option value="yeni" className="bg-[#111111]">
                          Yeni
                        </option>
                        <option value="iletisim_kuruldu" className="bg-[#111111]">
                          İletişim Kuruldu
                        </option>
                        <option value="kapandi" className="bg-[#111111]">
                          Kapandı
                        </option>
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2 mb-3 text-xs">
                      <a
                        href={`mailto:${s.email}`}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5 text-slate-300 hover:text-white transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#a78bfa]" />
                        <span className="truncate">{s.email}</span>
                      </a>
                      {s.company && (
                        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300">
                          <Building2 className="w-3.5 h-3.5 text-[#a78bfa]" />
                          <span className="truncate">{s.company}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-start gap-2 px-3 py-3 rounded-lg bg-white/[0.02] border border-white/5 text-sm text-slate-300">
                      <MessageSquare className="w-3.5 h-3.5 text-[#a78bfa] mt-0.5 flex-shrink-0" />
                      <p className="leading-relaxed whitespace-pre-wrap">{s.message}</p>
                    </div>

                    {s.status === "kapandi" && (
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" /> Kapandı olarak işaretlendi
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </main>
  );
}
