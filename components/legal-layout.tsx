import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalLayoutProps {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, updatedAt, children }: LegalLayoutProps) {
  return (
    <main className="flex-1 bg-[#0a0a0a] text-white">
      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 py-24 md:py-32">
        {/* Subtle accent glow */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#8b5cf6]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Back link */}
        <Link
          href="/"
          className="relative inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Ana sayfa
        </Link>

        {/* Title */}
        <header className="relative mb-10 pb-8 border-b border-white/10">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#a78bfa] mb-3 block">
            Yasal
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            {title}
          </h1>
          <p className="text-sm text-slate-500">Son güncelleme: {updatedAt}</p>
        </header>

        {/* Content */}
        <article
          className="relative
            text-slate-300 leading-relaxed
            [&>h2]:text-xl [&>h2]:md:text-2xl [&>h2]:font-semibold [&>h2]:text-white [&>h2]:mt-10 [&>h2]:mb-4
            [&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-white [&>h3]:mt-6 [&>h3]:mb-3
            [&>p]:my-4 [&>p]:text-slate-300
            [&>ul]:my-4 [&>ul]:space-y-2 [&>ul>li]:relative [&>ul>li]:pl-6 [&>ul>li]:text-slate-300
            [&>ul>li:before]:content-[''] [&>ul>li:before]:absolute [&>ul>li:before]:left-0 [&>ul>li:before]:top-2.5 [&>ul>li:before]:w-1.5 [&>ul>li:before]:h-1.5 [&>ul>li:before]:rounded-full [&>ul>li:before]:bg-[#8b5cf6]
            [&_a]:text-[#a78bfa] [&_a]:underline-offset-4 hover:[&_a]:underline
            [&_strong]:text-white [&_strong]:font-semibold"
        >
          {children}
        </article>
      </div>
    </main>
  );
}
