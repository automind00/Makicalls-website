import React from "react";
import { Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { BlogBlock } from "@/lib/blog";

const calloutThemes = {
  info: {
    icon: Info,
    border: "border-brand/40",
    bg: "bg-brand/5",
    text: "text-brand-soft",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-amber-500/40",
    bg: "bg-amber-500/5",
    text: "text-amber-400",
  },
  success: {
    icon: CheckCircle2,
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/5",
    text: "text-emerald-400",
  },
} as const;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[ışğüöç]/g, (c) =>
      ({ ı: "i", ş: "s", ğ: "g", ü: "u", ö: "o", ç: "c" })[c] ?? c,
    )
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p
                key={i}
                className="text-[15px] sm:text-base leading-[1.8] text-[color:var(--color-fg-secondary)]"
              >
                {b.text}
              </p>
            );

          case "h2": {
            const id = b.id ?? slugify(b.text);
            return (
              <h2
                key={i}
                id={id}
                className="scroll-mt-24 text-2xl sm:text-3xl font-bold text-[color:var(--color-fg)] tracking-tight mt-10 mb-2"
              >
                {b.text}
              </h2>
            );
          }

          case "h3": {
            const id = b.id ?? slugify(b.text);
            return (
              <h3
                key={i}
                id={id}
                className="scroll-mt-24 text-lg sm:text-xl font-semibold text-[color:var(--color-fg)] tracking-tight mt-6 mb-1"
              >
                {b.text}
              </h3>
            );
          }

          case "ul":
            return (
              <ul key={i} className="space-y-2.5 pl-1">
                {b.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-[15px] sm:text-base leading-relaxed text-[color:var(--color-fg-secondary)]"
                  >
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-soft flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={i} className="space-y-3">
                {b.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-[15px] sm:text-base leading-relaxed text-[color:var(--color-fg-secondary)]"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand/15 border border-brand/30 text-[12px] font-semibold text-brand-soft flex-shrink-0">
                      {j + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-brand/60 pl-5 italic text-[15px] sm:text-base text-[color:var(--color-fg)]"
              >
                <p>&ldquo;{b.text}&rdquo;</p>
                {b.cite && (
                  <cite className="not-italic block mt-2 text-sm text-[color:var(--color-fg-muted)]">
                    — {b.cite}
                  </cite>
                )}
              </blockquote>
            );

          case "callout": {
            const tone = b.tone ?? "info";
            const t = calloutThemes[tone];
            const Icon = t.icon;
            return (
              <div
                key={i}
                className={`rounded-2xl border ${t.border} ${t.bg} p-5 sm:p-6`}
              >
                <div className="flex gap-3">
                  <Icon className={`w-5 h-5 ${t.text} flex-shrink-0 mt-0.5`} />
                  <div>
                    {b.title && (
                      <h4
                        className={`text-sm font-semibold ${t.text} mb-1.5 uppercase tracking-wider`}
                      >
                        {b.title}
                      </h4>
                    )}
                    <p className="text-[15px] leading-relaxed text-[color:var(--color-fg)]">
                      {b.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
