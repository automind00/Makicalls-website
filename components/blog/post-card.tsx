"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface Props {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

export default function PostCard({ post, index = 0, featured }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={`group relative h-full ${featured ? "md:col-span-2" : ""}`}
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div
          className={`h-full rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-elevated)] p-6 md:p-7 hover:border-brand/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] overflow-hidden ${
            featured ? "md:p-9" : ""
          }`}
        >
          {/* Tag chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium uppercase tracking-wider text-brand-soft px-2 py-1 rounded bg-brand/10 border border-brand/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title + arrow */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3
              className={`font-bold text-[color:var(--color-fg)] tracking-tight leading-snug ${
                featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
              }`}
            >
              {post.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-brand-soft flex-shrink-0 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all mt-1" />
          </div>

          {/* Excerpt */}
          <p
            className={`text-[color:var(--color-fg-muted)] leading-relaxed mb-5 ${
              featured ? "text-base" : "text-sm"
            }`}
          >
            {post.excerpt}
          </p>

          {/* Meta footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[color:var(--color-border)] text-xs text-[color:var(--color-fg-muted)]">
            <span>{formatDate(post.publishedAt)}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {post.readingTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
