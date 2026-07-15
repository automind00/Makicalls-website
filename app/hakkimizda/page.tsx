import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  HeartHandshake,
  Lock,
  XCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SITE_URL = "https://makicalls.com";
const PAGE_URL = `${SITE_URL}/hakkimizda`;
const PAGE_TITLE =
  "Hakkımızda | MakiCalls — Türkiye'nin AI Çağrı Merkezi Platformu";
const PAGE_DESCRIPTION =
  "MakiCalls'ın hikayesi, neye inandığımız, neyi yapmadığımız ve veri güvenliği yaklaşımımız. KOBİ'lerin gerçek iletişim derdine kategorik çözüm.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "MakiCalls hakkında",
    "MakiCalls hikaye",
    "AI çağrı merkezi şirketi",
    "Türkiye AI çağrı merkezi",
    "KVKK uyumlu AI",
    "Türkçe sesli asistan firma",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: PAGE_URL,
    siteName: "MakiCalls",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": PAGE_URL,
  url: PAGE_URL,
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  inLanguage: "tr-TR",
  isPartOf: { "@id": `${SITE_URL}#website` },
  about: { "@id": `${SITE_URL}#organization` },
};

export default function HakkimizdaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Navbar />
      <main className="flex-1 bg-[color:var(--color-page)]">
        {/* Hero */}
        <section className="relative overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-brand/10 rounded-full blur-[160px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-brand-soft/6 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] text-brand-soft mb-5">
              Hakkımızda
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-[1.1] mb-6">
              Çalmayan telefon,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
                kaçan müşteri demek.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[color:var(--color-fg-muted)] leading-relaxed">
              MakiCalls, Türkiye&apos;deki KOBİ ve klinik sahiplerinin yıllardır
              sessizce kaybettiği telefon çağrılarını, AI ile yakalama
              fikrinden doğdu. Bir ekibiz, üç ilkeyle çalışıyoruz.
            </p>
          </div>
        </section>

        {/* Neden Var Olduk */}
        <section className="relative py-16 sm:py-20 border-t border-[color:var(--color-border)]">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-2 block">
                Hikaye
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-fg)] tracking-tight">
                Neden var olduk
              </h2>
            </div>

            <div className="space-y-6 text-[15px] sm:text-base text-[color:var(--color-fg-secondary)] leading-[1.8]">
              <p>
                Türkiye&apos;de bir KOBİ sahibi olmak — bir diş kliniği, butik otel,
                araç kiralama ofisi yönetmek — sürekli telefonla yarışmak
                demektir. Mesai bitince çalan telefon, hafta sonu kaçırılan
                rezervasyon, akşam ondan sonraki WhatsApp mesajı. Çoğu işletme
                sahibi bu kayıpların ne kadar büyük olduğunu, tek tek
                hesaplamadığı için fark edemiyor.
              </p>
              <p>
                Klasik çözümler ya çok pahalı (24 saat çağrı merkezi, çok
                vardiyalı resepsiyon) ya çok robotik (telesekreter, sabit IVR
                menüleri). Hasta ya da müşteri ikisinden de kaçıyor. Asıl çözüm
                ortadaydı ama yoktu: gerçek bir insan gibi konuşan, kliniğinin
                tonunu bilen, randevu defterine entegre çalışan bir asistan.
                Gece üçte arayan birine, sabah ondan beklediği özen ile cevap
                verebilen.
              </p>
              <p>
                2024-2025&apos;te büyük dil modelleri (LLM) Türkçe konusunda
                kategorik bir sıçrama yaptı. Aynı dönemde Türkçe ses sentezi
                gerçek insan sesinden ayırt edilemez seviyeye geldi. Bu iki
                teknoloji bir araya gelince, KOBİ ölçeğinde mantıklı bir AI
                çağrı merkezi mümkün hale geldi. MakiCalls bu boşluğu, doğru
                tonla, gerçek müşterilere hizmet edecek şekilde doldurmak için
                kuruldu.
              </p>
            </div>
          </div>
        </section>

        {/* Kurucu */}
        <section className="relative py-16 sm:py-20 border-t border-[color:var(--color-border)]">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 sm:p-8 rounded-2xl bg-[color:var(--color-elevated)] border border-[color:var(--color-border)]">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 ring-1 ring-brand/30">
                <AvatarFallback className="bg-gradient-to-br from-brand/25 to-brand-soft/10 text-brand-soft text-2xl font-bold">
                  EH
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-[color:var(--color-fg)]">
                  Ekrem Hindioğlu
                </h3>
                <p className="text-sm text-brand-soft font-medium mb-3">
                  Kurucu &amp; CEO
                </p>
                <p className="text-sm text-[color:var(--color-fg-muted)] leading-relaxed mb-4 max-w-md">
                  MakiCalls&apos;ı kurdu. Türkiye&apos;deki KOBİ ve
                  kliniklere AI destekli sesli ve mesaj asistanları
                  kuruyor.
                </p>
                <a
                  href="https://www.linkedin.com/in/ekrem-hindioglu-495bb726a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-brand-soft hover:text-white underline-offset-4 hover:underline transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  LinkedIn&apos;de bağlantı kur
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Ne Yapmıyoruz (dürüstlük signal) */}
        <section className="relative py-16 sm:py-20 bg-[color:var(--color-surface)] border-y border-[color:var(--color-border)]">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-2 block">
                Şeffaflık
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-fg)] tracking-tight mb-3">
                Ne <span className="text-red-400">yapmıyoruz</span>
              </h2>
              <p className="text-sm sm:text-base text-[color:var(--color-fg-muted)] leading-relaxed">
                Pazarlama dilinde her şey güllük gülistanlık. Biz dürüst
                olalım: bunları yapmıyoruz, asla yapmayacağız.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {[
                {
                  title: "Uzun süreli sözleşme zorlamıyoruz",
                  body: "Aylık çalışırız, istediğiniz zaman ayrılırsınız. Asistan kayıtları + müşteri verileriniz size aittir.",
                },
                {
                  title: "AI'yı insan yerine satmıyoruz",
                  body: "Kompleks tıbbi soru, kriz iletişimi, üst düzey VIP — bunlarda asistan susup uzmanı devreye sokar. Yanlış cevap risk taşır.",
                },
                {
                  title: "Çağrı verilerinizi üçüncü tarafa satmıyoruz",
                  body: "Konuşma kayıtları, müşteri bilgileri sadece sizin erişiminizde. Reklam profilleme veya veri pazarlama yok.",
                },
                {
                  title: "Türkçe değilmiş gibi konuşmuyoruz",
                  body: "Çeviri kokulu kalıp cümleler ('sayın müşterimiz, talebinize istinaden') asistanın ton sözlüğünde yasaklıdır.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 p-5 sm:p-6 rounded-2xl bg-[color:var(--color-elevated)] border border-[color:var(--color-border)]"
                >
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[color:var(--color-fg)] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[color:var(--color-fg-muted)] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Üç ilkemiz */}
        <section className="relative py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-2 block">
                İlkelerimiz
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-fg)] tracking-tight">
                Üç değer, üç ilke
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  icon: PhoneCall,
                  title: "Gerçek konuşma",
                  body: "Asistan robotik değil, kliniğinizin tonunda konuşur. Müşteri gerçek bir resepsiyonistle konuştuğunu düşünür. Bu detay üzerinde haftalarca çalışırız.",
                },
                {
                  icon: HeartHandshake,
                  title: "Ortaklık, çözüm sağlayıcılığı değil",
                  body: "Kurulduktan sonra 'müşteri portföyüne' eklenmezsiniz. Haftalık raporlar, kalibrasyon, sorun çıktığında doğrudan ekipten yanıt alırsınız.",
                },
                {
                  icon: ShieldCheck,
                  title: "Veri ahlakı",
                  body: "KVKK uyumlu, Türkiye/AB barındırma. Çağrı kayıtları şifreli. Sözleşme açık: veriler size ait, dışarıya çıkmaz.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="relative p-[1px] rounded-2xl bg-gradient-to-b from-brand/25 to-transparent"
                  >
                    <div className="h-full p-6 rounded-2xl bg-[color:var(--color-elevated)] border border-[color:var(--color-border)]">
                      <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/30 flex items-center justify-center text-brand-soft mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-[color:var(--color-fg)] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[color:var(--color-fg-muted)] leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Kimle Çalışıyoruz */}
        <section className="relative py-16 sm:py-20 bg-[color:var(--color-surface)] border-y border-[color:var(--color-border)]">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-2 block">
              Sektörel coverage
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-fg)] tracking-tight mb-4">
              Kimle çalışıyoruz
            </h2>
            <p className="text-sm sm:text-base text-[color:var(--color-fg-muted)] leading-relaxed mb-10 max-w-xl mx-auto">
              Her sektörün gerçek derdi farklı; çözümler de farklı kurulur.
              Şu an 8 sektör için özel asistanlar üretiyoruz.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
              {[
                "Diş Klinikleri",
                "Oteller",
                "Saç Ekimi",
                "Estetik Klinikler",
                "Sağlık Turizmi",
                "Araç Kiralama",
                "E-ticaret",
                "Gayrimenkul",
              ].map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[color:var(--color-elevated)] border border-[color:var(--color-border)] text-xs sm:text-sm text-[color:var(--color-fg-secondary)] font-medium"
                >
                  <Sparkles className="w-3 h-3 text-brand-soft" />
                  {s}
                </span>
              ))}
            </div>

            <Link
              href="/sektorler"
              className="inline-flex items-center gap-2 text-sm sm:text-base text-brand-soft hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              Sektör çözümlerini incele
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Veri Güvenliği — kısa ve net */}
        <section className="relative py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/8 via-transparent to-brand-soft/5 p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6">
                <div className="w-14 h-14 rounded-2xl bg-brand/15 border border-brand/30 flex items-center justify-center text-brand-soft flex-shrink-0">
                  <Lock className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-[color:var(--color-fg)] tracking-tight mb-3">
                    Veri güvenliği ve KVKK
                  </h2>
                  <p className="text-sm sm:text-base text-[color:var(--color-fg-muted)] leading-relaxed mb-4">
                    Konuşma kayıtları ve müşteri verileri Türkiye veya AB
                    bölgelerinde barındırılan altyapılarda, şifreli olarak
                    tutulur. Sadece sizin erişiminizdedir. KVKK aydınlatma
                    metnimiz ve gizlilik politikamız her zaman sayfanın
                    altındadır.
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Link
                      href="/kvkk"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-brand-soft hover:text-white underline-offset-4 hover:underline transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      KVKK Aydınlatma Metni
                    </Link>
                    <Link
                      href="/gizlilik"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-brand-soft hover:text-white underline-offset-4 hover:underline transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Gizlilik Politikası
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20 sm:py-24">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold text-[color:var(--color-fg)] tracking-tight mb-4 leading-tight">
              Sizinki için de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
                konuşalım.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[color:var(--color-fg-muted)] mb-8 max-w-md mx-auto leading-relaxed">
              30 dakikalık bir görüşmede sektörünüze özel asistanı birlikte
              planlayalım.
            </p>
            <Link
              href="/#randevu"
              className="inline-flex items-center gap-2 px-7 py-3.5 min-h-[52px] rounded-full text-[15px] sm:text-base font-semibold text-white bg-gradient-to-br from-brand-soft via-brand to-brand-deep active:from-brand-deep transition-colors shadow-[0_12px_40px_-10px_rgb(var(--brand)),inset_0_1px_0_rgba(255,255,255,0.15)] ring-1 ring-inset ring-white/10"
            >
              15 Dakika Ayır, Konuşalım
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
