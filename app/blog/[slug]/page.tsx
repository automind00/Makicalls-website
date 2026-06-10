import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import BlogBody from "@/components/blog/blog-body";
import PostCard from "@/components/blog/post-card";
import PostJsonLd from "@/components/blog/post-jsonld";
import { POSTS, POSTS_BY_SLUG } from "@/lib/blog";

const SITE_URL = "https://makicalls.com";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS_BY_SLUG[slug];
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.metadata.title,
    description: post.metadata.description,
    keywords: post.metadata.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url,
      siteName: "MakiCalls",
      title: post.metadata.title,
      description: post.metadata.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description,
    },
    robots: { index: true, follow: true },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = POSTS_BY_SLUG[slug];
  if (!post) notFound();

  // İlgili / sonraki yazılar (en yeni 2 tane, kendisi hariç)
  const related = POSTS.filter((p) => p.slug !== post.slug)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 2);

  return (
    <>
      <PostJsonLd post={post} />
      <Navbar />
      <main className="flex-1 pt-24 sm:pt-28 pb-20 sm:pb-28 bg-[color:var(--color-page)]">
        {/* Hero */}
        <section className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand/8 rounded-full blur-[140px] pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 mb-10 md:mb-14">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-[color:var(--color-fg-muted)] hover:text-brand-soft transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Tüm yazılar
            </Link>

            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium uppercase tracking-wider text-brand-soft px-2 py-1 rounded bg-brand/10 border border-brand/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-[1.15] mb-5">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-[color:var(--color-fg-muted)] leading-relaxed mb-6">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[color:var(--color-fg-muted)] pb-6 border-b border-[color:var(--color-border)]">
              <span className="inline-flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-soft to-brand-deep flex items-center justify-center text-white text-[11px] font-semibold">
                  {post.author.name.charAt(0)}
                </span>
                <span className="text-[color:var(--color-fg-secondary)]">
                  {post.author.name}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="relative">
          <article className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <BlogBody blocks={post.body} />
          </article>
        </section>

        {/* Inline CTA after body */}
        <section className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 mt-14">
          <div className="rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/10 via-transparent to-brand-soft/5 p-6 md:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-[color:var(--color-fg)] mb-2 tracking-tight">
              Kendi işletmenize uyarlayalım
            </h3>
            <p className="text-sm text-[color:var(--color-fg-muted)] mb-5 max-w-md mx-auto">
              30 dakikalık bir görüşmede sizin sektörünüze özel AI asistanı birlikte planlayalım.
            </p>
            <Link
              href="/#randevu"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-brand hover:bg-brand-deep transition-colors shadow-[0_8px_30px_-8px_rgb(var(--brand))]"
            >
              15 Dakika Ayır, Konuşalım
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 mt-16 sm:mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[color:var(--color-fg-muted)]">
                Sonraki yazılar
              </span>
              <span className="flex-1 h-px bg-[color:var(--color-border)]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map((p, i) => (
                <PostCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
