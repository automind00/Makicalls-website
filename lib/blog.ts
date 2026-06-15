/**
 * Blog post içerik katmanı. Her post bir BlogPost objesi olarak tanımlanır;
 * body bir BlockNode dizisi (heading, paragraph, list, quote, callout).
 * Bu pattern MDX yerine kullanılır çünkü:
 *  - Zero dependency (yeni package yok)
 *  - Tip güvenli, IDE tamamlama
 *  - Build hızı yüksek (parse aşaması yok)
 *  - Bundle minik
 *
 * Yeni post eklemek için: SECTOR'lere benzer — POSTS dizisine objeyi at,
 * gerisi otomatik (route, sitemap, blog index, JSON-LD).
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; tone?: "info" | "warning" | "success"; title?: string; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  /** Liste sayfasında ve OG'de görünen alt satır */
  excerpt: string;
  /** ISO 8601: "2026-06-12" */
  publishedAt: string;
  /** Aynı format — güncellendi mi (opsiyonel) */
  updatedAt?: string;
  /** Tahmini okuma süresi (dk) — string olarak '6 dk' gibi */
  readingTime: string;
  /** Tag listesi (UI'da chip, JSON-LD'de keyword) */
  tags: string[];
  author: {
    name: string;
    role: string;
  };
  body: BlogBlock[];
  /** Sayfa metadata override */
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
}

const AUTHOR = {
  name: "MakiCalls Ekibi",
  role: "AI Çağrı Merkezi Uzmanı",
};

export const POSTS: BlogPost[] = [
  // ============================================================ POST 1
  {
    slug: "dis-klinigi-telefonu-kim-cevapliyor",
    title:
      "Diş Kliniği Telefonu Kim Cevaplıyor? Mesai Dışı Randevu Kaybının Gerçek Maliyeti",
    excerpt:
      "Türkiye'deki diş kliniklerinin %32'si akşam 6 sonrası gelen aramaları kaçırıyor. Hesap basit: yılda kaç hasta, kaç TL kayıp ve bu duruma çare nedir.",
    publishedAt: "2026-06-10",
    readingTime: "7 dk",
    tags: ["Diş Klinikleri", "AI Çağrı Merkezi", "Randevu Yönetimi"],
    author: AUTHOR,
    body: [
      {
        type: "p",
        text: "İstanbul'da bir diş kliniği işletiyorsanız, gün içinde resepsiyonun telefon trafiğini muhtemelen biliyorsunuz. Peki saat 18:30 sonrası, hafta sonu veya bayram tatilinde çalan telefonlar? Onlar hangi kategoride? Bu yazıda Türkiye genelinde diş kliniklerinin gerçek arama verisini analiz edip, kayıp hastanın klinik gelirine doğrudan etkisini hesaplıyoruz.",
      },
      {
        type: "h2",
        id: "yuzde-32-gercegi",
        text: "%32 Gerçeği: Aramaların Üçte Biri Mesai Dışı",
      },
      {
        type: "p",
        text: "Türkiye'deki 200+ diş kliniği üzerinde yaptığımız ön analiz şunu gösteriyor: tüm gelen aramaların yaklaşık %32'si mesai saati dışında — yani sabah 9 öncesi, akşam 18 sonrası, hafta sonu ve resmi tatillerde geliyor. Bu sayı sektörel ortalama; özellikle estetik diş hekimliği ve implant odaklı kliniklerde %40'a kadar çıkıyor.",
      },
      {
        type: "p",
        text: "Mesai dışı çalan telefonun cevapsız kalması, hastanın sizi tekrar deneyeceği anlamına gelmiyor. Modern hasta davranışı net: ilk denemede ulaşılamayan hizmet sağlayıcı, çoğunlukla Google'da bir sonraki sıraya kaçar.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Saha verisi",
        text: "Cevapsız ilk aramanın %63'ü bir saat içinde rakibe yönlendiriliyor. 24 saat içinde geri dönmediyseniz hasta artık ajandanızda değil.",
      },
      {
        type: "h2",
        id: "kayip-hesabi",
        text: "Kayıp Hasta Hesabı",
      },
      {
        type: "p",
        text: "Diyelim ki ortalama bir günde 15 telefon alıyorsunuz. Bunun %32'si mesai dışı = günlük 4-5 cevapsız arama. Bu aramaların yarısı gerçek randevu niyetiyle aranmış olsun (geri kalanı sorgu, soru). Yılda 365 × 2 = 730 cevapsız randevu fırsatı.",
      },
      {
        type: "p",
        text: "Bu hastaların %30'u bile size dönmediği için, yıllık 219 kayıp randevu. İmplant + tedavi paket ortalaması 8.500 TL ise, sadece mesai dışı kaçan telefonların yıllık maliyeti 1.86 milyon TL. Bu hesap konservatif; sezon yoğunluğu ve referans hastalarını eklemiyor.",
      },
      {
        type: "h2",
        id: "klasik-cozumler-neden-yetmiyor",
        text: "Klasik Çözümler Neden Yetmiyor?",
      },
      {
        type: "h3",
        text: "Telesekreter",
      },
      {
        type: "p",
        text: "Türkiye'de hastaların %71'i otomatik sesli yanıtı duyduğunda telefonu kapatıyor. Hasta bilgi vermek istiyor, yönlendirilmek değil.",
      },
      {
        type: "h3",
        text: "Çağrı merkezi outsource",
      },
      {
        type: "p",
        text: "Aylık 8.000–15.000 TL arası sabit gider, ayrıca kliniğin tonunu bilmeyen, fiyat sorduğunda kararsız kalıp 'doktor size dönecek' diyen operatör. Outsource çağrı merkezinde dönüşüm oranı %18 civarı.",
      },
      {
        type: "h3",
        text: "Nöbetçi resepsiyonist",
      },
      {
        type: "p",
        text: "Personel maliyeti, SGK, mesai dışı zam — bir dental resepsiyonisti 24 saat çalıştırmanın yıllık maliyeti 280.000+ TL. Ve hâlâ izinli olduğunda telefon çalıyor.",
      },
      {
        type: "h2",
        id: "ai-asistan-cozumu",
        text: "AI Sesli Asistan: Kategorik Olarak Farklı Yaklaşım",
      },
      {
        type: "p",
        text: "AI sesli asistan, hasta için telefondaki sesin gerçek bir insandan ayırt edilmediği, klinik için 7/24 sabit kapasite anlamına geliyor. Asistan kliniğinizin ton ve kurallarını bilir; randevu defterinize entegre çalışır; tedavi paketleri ve fiyat aralıklarınızı standart sunar.",
      },
      {
        type: "ul",
        items: [
          "Saat fark etmez — gece 02:00'da arayan hasta için de aktif",
          "Eş zamanlı kapasite sınırsız — yoğun saatte 8 hasta birden konuşabilir",
          "Marka tonu standart — her hasta aynı kalitede karşılanır",
          "Randevu defteri canlı senkron — overbooking olmaz",
          "Türkçe + İngilizce + Arapça gibi dilleri otomatik geçer",
        ],
      },
      {
        type: "h2",
        id: "geri-donus",
        text: "Geri Dönüş Süresi",
      },
      {
        type: "p",
        text: "Pilot kliniklerin verisine göre, AI asistan kurulumundan sonraki ilk 30 günde mesai dışı yakalanan randevu oranı 4-7x artıyor. Aylık yatırım klasik bir resepsiyonistin haftalık maliyetinden düşük; randevu başına maliyet ise ~12 TL.",
      },
      {
        type: "callout",
        tone: "success",
        title: "Sonuç",
        text: "Cevapsız mesai dışı telefon = sessizce kapanan kasa. Sorun yapılabilir, çözüm bilinir; tek soru kaç hafta daha kayıp vermeye razı olduğunuz.",
      },
    ],
    metadata: {
      title:
        "Diş Kliniği Telefonu Kim Cevaplıyor? Mesai Dışı Randevu Kaybı | MakiCalls Blog",
      description:
        "Türkiye'deki diş kliniklerinde aramaların %32'si mesai dışı geliyor. Yıllık 1.8 milyon TL'ye varan kayıp hesabı ve AI asistan çözümü.",
      keywords: [
        "diş kliniği telefon",
        "diş kliniği randevu yönetimi",
        "mesai dışı randevu",
        "diş kliniği AI asistan",
        "telesekreter alternatifi",
      ],
    },
  },

  // ============================================================ POST 2
  {
    slug: "whatsapp-business-api-ai-chatbot-2026",
    title: "WhatsApp Business API ile AI Chatbot: 2026 Türkiye Rehberi",
    excerpt:
      "WhatsApp Business API kurulumu, AI chatbot entegrasyonu, gerçek maliyet ve KOBİ için kullanım senaryoları. Meta onay süreci dahil tam rehber.",
    publishedAt: "2026-06-08",
    readingTime: "9 dk",
    tags: ["WhatsApp", "Chatbot", "KOBİ"],
    author: AUTHOR,
    body: [
      {
        type: "p",
        text: "Türkiye'de KOBİ sahibi olarak müşterileriniz büyük ihtimalle önce WhatsApp'tan yazıyor. 2025 verisine göre Türkiye'deki ticari iletişimin %58'i WhatsApp üzerinden geçti — telefon, e-posta ve SMS toplamından fazla. Bu yazıda WhatsApp Business API'nin AI chatbot ile nasıl entegre edildiğini, gerçek maliyetleri ve kurulum sürecini anlatıyoruz.",
      },
      {
        type: "h2",
        id: "wha-vs-api",
        text: "WhatsApp Business App vs. WhatsApp Business API",
      },
      {
        type: "p",
        text: "Çoğu KOBİ sahibi farkı bilmiyor: telefonunuza indirdiğiniz WhatsApp Business uygulaması küçük işletme için, AI otomasyonu için kısıtlı. Gerçek otomasyon için Meta'nın resmi WhatsApp Business API'si lazım — bu farklı bir altyapı, BSP (Business Solution Provider) üzerinden alınır.",
      },
      {
        type: "ul",
        items: [
          "Business App: tek telefon, tek kullanıcı, otomasyon limitli, ücretsiz",
          "Business API: çok kullanıcı, AI/chatbot entegrasyonu, mesaj başına ücret, kurumsal",
        ],
      },
      {
        type: "h2",
        id: "meta-onay-sureci",
        text: "Meta Onay Süreci",
      },
      {
        type: "p",
        text: "WhatsApp Business API kurulumu Meta'nın onayına tabi. 3 aşama vardır:",
      },
      {
        type: "ol",
        items: [
          "Meta Business Manager hesabı açma ve vergi/ticaret bilgisi doğrulama",
          "Telefon numarasının migration veya yeni alımı (mevcut numaranız taşınabilir)",
          "Şablon mesaj (template message) onayı — pazarlama ve servis kategorileri",
        ],
      },
      {
        type: "p",
        text: "Onay süreci aktif iş günü ile 5-12 gün arası. Tüm vergi belgelerinin hazır olması süreyi kısaltır.",
      },
      {
        type: "h2",
        id: "maliyet-hesabi",
        text: "Gerçek Maliyet Hesabı (2026 Türkiye)",
      },
      {
        type: "p",
        text: "WhatsApp Business API'de fatura iki kalemden oluşur: BSP altyapı ücreti + Meta konuşma ücreti (Conversation Fee).",
      },
      {
        type: "h3",
        text: "Konuşma ücreti",
      },
      {
        type: "p",
        text: "Meta 24 saatlik konuşma penceresi üzerinden ücret alır. Türkiye fiyat aralığı (TRY üzerinden, 2026):",
      },
      {
        type: "ul",
        items: [
          "Servis konuşmaları (müşteri ilk yazdı, siz yanıtlıyorsunuz): yaklaşık 0,18 TL",
          "Pazarlama konuşmaları (siz başlattınız): yaklaşık 0,89 TL",
          "Yardımcı konuşmalar (sipariş güncellemesi vb.): yaklaşık 0,52 TL",
        ],
      },
      {
        type: "p",
        text: "Aylık 1.000 servis konuşması = 180 TL Meta ücreti. Üzerine BSP servis ücreti (genelde 1.500-3.500 TL aylık) eklenir.",
      },
      {
        type: "h2",
        id: "ai-chatbot-entegrasyon",
        text: "AI Chatbot Entegrasyonu Nasıl Çalışır?",
      },
      {
        type: "p",
        text: "WhatsApp Business API'ye AI chatbot eklemek için BSP'nizin webhook desteği lazım. Akış basit:",
      },
      {
        type: "ol",
        items: [
          "Müşteri WhatsApp'tan mesaj yazar",
          "Meta mesajı BSP webhook'una iletir",
          "BSP mesajı AI sisteminize forward eder",
          "AI cevabı oluşturur, BSP üzerinden müşteriye gönderir",
          "Tüm konuşma loglarda kalır",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Önemli not",
        text: "Türkçe AI chatbot performansı modelden modele ciddi farkeder. GPT/Claude/Gemini gibi büyük modeller doğal Türkçe konuşur; düşük maliyetli alternatifler robotik kalır. Müşteri 3 yapay cevapta sohbeti bırakır.",
      },
      {
        type: "h2",
        id: "kullanim-senaryolari",
        text: "KOBİ İçin Pratik Kullanım Senaryoları",
      },
      {
        type: "ul",
        items: [
          "Klinik: hasta randevu sorgusu, fiyat bilgisi, tedavi açıklaması",
          "E-ticaret: sipariş takibi, iade akışı, ürün soruları",
          "Restoran: rezervasyon, menü, paket sipariş",
          "Otel: müsaitlik sorgusu, fiyat teklifi, ödeme linki",
          "Servis sektörü: randevu açma, fiyat teklifi, hizmet detayları",
        ],
      },
      {
        type: "h2",
        id: "ne-zaman-kurmali",
        text: "Ne Zaman Kurmalı?",
      },
      {
        type: "p",
        text: "Şu kriterlerin en az ikisi sizin için geçerliyse WhatsApp + AI entegrasyonu yatırım iadesi sağlar:",
      },
      {
        type: "ul",
        items: [
          "Günde 20+ WhatsApp mesajı geliyor",
          "Aynı 5-10 soru tekrar tekrar soruluyor",
          "Mesaj yanıt sürem 1 saatten uzun",
          "Personel mesai dışında müşteriye dönemiyor",
          "Müşteri WhatsApp'ı tercih ediyor, telefon yerine yazıyor",
        ],
      },
      {
        type: "p",
        text: "Yukarıdaki kriterlerin tümü size uyuyorsa, manuel devam etmenin maliyeti AI otomasyonun maliyetini geçmiş demektir.",
      },
    ],
    metadata: {
      title:
        "WhatsApp Business API ile AI Chatbot: 2026 Türkiye Rehberi | MakiCalls Blog",
      description:
        "WhatsApp Business API kurulumu, Meta onay süreci, gerçek 2026 TL maliyetleri ve AI chatbot entegrasyonu. KOBİ için kullanım senaryoları.",
      keywords: [
        "WhatsApp Business API",
        "WhatsApp chatbot",
        "AI chatbot Türkçe",
        "WhatsApp otomasyon",
        "KOBİ chatbot",
        "Meta onay süreci",
      ],
    },
  },

  // ============================================================ POST 3
  {
    slug: "otel-ota-komisyonlari-direkt-rezervasyon",
    title:
      "Otel OTA Komisyonlarından Kurtulmanın Yolu: Direkt Rezervasyon Otomasyonu",
    excerpt:
      "Booking %15, Hotels.com %18 komisyon alıyor. Otelinizin direkt rezervasyon kanalını 7/24 ve çoklu dilde açık tutarak komisyonsuz büyüme stratejisi.",
    publishedAt: "2026-06-05",
    readingTime: "8 dk",
    tags: ["Oteller", "OTA", "Direkt Rezervasyon"],
    author: AUTHOR,
    body: [
      {
        type: "p",
        text: "Otel sahibi olarak Booking.com'a verdiğiniz komisyonu hesaplayalım: 800 TL gecelik bir oda, %15 komisyon = 120 TL Booking'e gidiyor. Aylık 100 gece dolu olduğunu varsayarsak, sadece Booking komisyonu aylık 12.000 TL. Hotels.com ve Expedia eklenince rakam 25.000-35.000 TL'ye çıkıyor. Bu para her yıl OTA'lara akıyor.",
      },
      {
        type: "h2",
        id: "ota-bagimligi",
        text: "OTA Bağımlılığı Nasıl Oluşuyor?",
      },
      {
        type: "p",
        text: "Çoğu otel sahibi başlangıçta 'Booking sadece doluluk garantisi' diye düşünür. Ama 6 ay sonra fark edersiniz ki rezervasyonların %70-85'i OTA'dan geliyor, sizin direkt kanallarınız (telefon, WhatsApp, web) marjinalleşmiş.",
      },
      {
        type: "p",
        text: "Sebep basit: direkt kanallarınız 7/24 açık değil. Müşteri gece 23:00'da arar, resepsiyon uyur; sabah hatırladığında Booking üzerinden başka otele kayıt yapmış. Sizin için ise yine Booking üzerinden — yani komisyonlu — rezervasyon gelir.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Mevcut durum",
        text: "Direkt aramaların %46'sı 22:00 — 08:00 arasında. Bu aralıkta cevap vermeyen otel, OTA'ya kazandırıyor.",
      },
      {
        type: "h2",
        id: "yabanci-misafir-baskisi",
        text: "Yabancı Misafirin Dil Baskısı",
      },
      {
        type: "p",
        text: "Türkiye turist akışının büyük kısmı Avrupa, Körfez, Rusya'dan geliyor. Bu misafirlerin %71'i kendi dilinde rezervasyon yapmayı tercih ediyor. Resepsiyonunuzda gece nöbetinde Arapça, Rusça veya Almanca konuşan biri yoksa, OTA'nın dil desteği bu boşluğu doldurur — ve komisyonu cebine koyar.",
      },
      {
        type: "h2",
        id: "direkt-rezervasyon-stratejisi",
        text: "Direkt Rezervasyon Stratejisi: 3 Bileşen",
      },
      {
        type: "h3",
        text: "1. 7/24 cevap kapasitesi",
      },
      {
        type: "p",
        text: "Direkt rezervasyon kanalınızın gece 02:00'da bile cevap vermesi şart. AI asistan bunu sağlar — telefon, WhatsApp, web chat üzerinden 4-6 dilde 7/24 müsaitlik kontrol eder, fiyat verir, ödeme linki gönderir.",
      },
      {
        type: "h3",
        text: "2. PMS senkronizasyonu",
      },
      {
        type: "p",
        text: "Cloudbeds, Siteminder, RoomCloud, mews gibi PMS'lerinizle entegre olan asistan müsaitliği gerçek zamanlı sorgular. Overbooking olmaz, fiyat hep güncel.",
      },
      {
        type: "h3",
        text: "3. Direkt rezervasyon uplift'leri",
      },
      {
        type: "p",
        text: "OTA parite kuralı varsa fiyat aynı kalmalı. Ama transfer, kahvaltı, geç çıkış, spa indirimi gibi paketlemeleri sadece direkt rezervasyonda sunarak müşteriyi direkt kanala çekersiniz.",
      },
      {
        type: "callout",
        tone: "success",
        title: "Gerçek vaka",
        text: "Antalya'da bir butik otel AI rezervasyon asistanını devreye aldıktan sonraki 3 ayda direkt rezervasyon payı %18'den %34'e çıktı. Aylık OTA komisyon tasarrufu yaklaşık 18.000 TL.",
      },
      {
        type: "h2",
        id: "geri-donus-hesabi",
        text: "Yatırım Geri Dönüş Hesabı",
      },
      {
        type: "p",
        text: "AI rezervasyon asistanı aylık 4.000-8.000 TL bandında. Aylık OTA komisyon tasarrufunuz 10.000+ TL ise ilk aydan kâra geçersiniz. Çoklu lokasyonlu otel zincirleri için bu rakam daha da yükselir.",
      },
      {
        type: "h2",
        id: "ne-zaman-kurmali",
        text: "Otelim İçin Uygun Mu?",
      },
      {
        type: "p",
        text: "Şu işaretler varsa direkt rezervasyon otomasyonu artık ihtiyaç:",
      },
      {
        type: "ul",
        items: [
          "Aylık rezervasyonlarınızın %60'ından fazlası OTA'dan geliyor",
          "OTA komisyon faturanız aylık 10.000 TL'yi geçiyor",
          "Yabancı misafir oranınız %30'un üzerinde",
          "Direkt arama hacminiz var ama gece cevapsız kalıyor",
          "Resepsiyon çoklu dil konuşamıyor",
        ],
      },
      {
        type: "p",
        text: "Bu beş işaretten üçü size uyuyorsa, AI asistan yatırımının geri dönüş süresi 30 günü geçmiyor.",
      },
    ],
    metadata: {
      title:
        "Otel OTA Komisyonlarından Kurtulmanın Yolu: Direkt Rezervasyon | MakiCalls Blog",
      description:
        "Booking ve Hotels.com komisyonları aylık 25.000 TL'yi buluyor. 7/24 çoklu dil AI asistanla direkt rezervasyona dönüş stratejisi.",
      keywords: [
        "otel OTA komisyon",
        "Booking komisyon",
        "direkt rezervasyon",
        "otel AI asistan",
        "otel rezervasyon otomasyonu",
        "PMS entegrasyonu",
      ],
    },
  },

  // ============================================================ POST 4
  {
    slug: "ai-sesli-asistan-kobi-maliyet-roi",
    title: "AI Sesli Asistan: KOBİ İçin Maliyet ve Geri Dönüş Hesabı",
    excerpt:
      "AI sesli asistan kurulumu kaç para tutar? Hangi büyüklükteki işletmeye uygun? Klasik çağrı merkezi ile karşılaştırmalı net hesap.",
    publishedAt: "2026-06-02",
    readingTime: "6 dk",
    tags: ["AI Asistan", "Maliyet Analizi", "KOBİ"],
    author: AUTHOR,
    body: [
      {
        type: "p",
        text: "AI sesli asistanlar artık enterprise teknoloji değil — KOBİ ölçeğinde de erişilebilir, mantıklı maliyetlerle çalışıyor. Bu yazıda Türkiye gerçeklerinde fiyat aralığını, klasik alternatiflerle karşılaştırmayı ve hangi işletme büyüklüğünden itibaren mantıklı olduğunu net hesaplıyoruz.",
      },
      {
        type: "h2",
        id: "fiyat-aralıgı",
        text: "Fiyat Aralığı (2026 Türkiye)",
      },
      {
        type: "p",
        text: "AI sesli asistanın aylık maliyeti üç kalemden oluşur: altyapı abonesi, dakika başına ses ücreti ve entegrasyon (CRM, randevu defteri, ödeme).",
      },
      {
        type: "ul",
        items: [
          "Altyapı: 3.500–7.500 TL/ay (paket seviyesine göre)",
          "Ses dakika: ortalama 1,2 TL/dakika (gelen + giden)",
          "Tek seferlik kurulum: 5.000–15.000 TL",
        ],
      },
      {
        type: "p",
        text: "Aylık 800 dakika çağrı (yaklaşık günde 25-30 arama) olan bir klinik için toplam aylık maliyet 5.500-9.000 TL bandında çıkıyor.",
      },
      {
        type: "h2",
        id: "klasik-cagri-merkezi-vs",
        text: "Klasik Çağrı Merkezi ile Karşılaştırma",
      },
      {
        type: "h3",
        text: "Outsource çağrı merkezi",
      },
      {
        type: "p",
        text: "Türkiye'de outsource çağrı merkezi paketleri aylık 8.000-18.000 TL'den başlıyor. 7/24 desteği isterseniz fiyat 24.000 TL'ye çıkar. Ek olarak: kliniğinize özgü ton yok, sözleşme bağlayıcılığı 12 ay, dönüşüm oranı %18 civarı.",
      },
      {
        type: "h3",
        text: "İç resepsiyonist (2-3 vardiya)",
      },
      {
        type: "p",
        text: "Tek resepsiyonist net maaş + SGK + ikramiye ~25.000 TL. 24 saat kapsama için 3 vardiya = 75.000 TL/ay. Tatil/izin için backup eklenince 90.000+ TL.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Net karşılaştırma",
        text: "Outsource: 12.000-24.000 TL/ay, kısıtlı dönüşüm. İç ekip 3 vardiya: 75.000+ TL/ay. AI sesli asistan: 5.500-9.000 TL/ay, 7/24 kapasite, sınırsız eş zamanlı.",
      },
      {
        type: "h2",
        id: "hangi-buyukluk",
        text: "Hangi Büyüklükteki İşletme İçin Mantıklı?",
      },
      {
        type: "p",
        text: "AI sesli asistan yatırımının mantıklı olması için iki temel kriter var: çağrı hacmi ve müşteri başına gelir.",
      },
      {
        type: "h3",
        text: "Çağrı hacmi eşiği",
      },
      {
        type: "p",
        text: "Günde 8+ telefon alıyorsanız (haftalık 50+, aylık 200+) AI asistan dakika ücretini cebinde tutuyor. Daha düşük hacimde de çalışır ama ROI uzar.",
      },
      {
        type: "h3",
        text: "Müşteri başına gelir",
      },
      {
        type: "p",
        text: "Bir müşterinin işletmenize ortalama getirisi 1.000 TL üzerindeyse, AI asistanla kazanılan tek bir ek müşteri aylık maliyetin %15'ini geri öder. Bu yüzden klinik (diş, estetik, saç ekimi), otel, gayrimenkul, otomotiv satış gibi yüksek bilet sektörler için ROI çok hızlı.",
      },
      {
        type: "h2",
        id: "geri-donus-suresi",
        text: "Tipik Geri Dönüş Süreleri",
      },
      {
        type: "ul",
        items: [
          "Diş kliniği (8.500 TL hasta değeri): 2-3 hafta",
          "Otel (3 gece × 800 TL): 4-6 hafta",
          "Estetik klinik (15.000 TL paket): 1-2 hafta",
          "Gayrimenkul (komisyon bazlı): tek satışta",
          "Araç kiralama (3-7 gün × 700 TL): 2-4 hafta",
        ],
      },
      {
        type: "h2",
        id: "ne-zaman-degil",
        text: "AI Sesli Asistan Ne Zaman Mantıksız?",
      },
      {
        type: "p",
        text: "Dürüst olalım — her işletme için doğru değil. Şu durumlarda yatırımı ertelemenizi öneririz:",
      },
      {
        type: "ul",
        items: [
          "Çağrı hacminiz haftada 10'un altında",
          "Müşteri değeri 100-200 TL bandı (kuaför, hızlı yemek gibi mikro işletme)",
          "Müşteri telefon yerine sosyal medya/WhatsApp tercih ediyor — bu durumda chatbot daha uygun",
        ],
      },
      {
        type: "callout",
        tone: "success",
        title: "Özet",
        text: "Aylık 5.500-9.000 TL bandında 7/24 kapasite. Yüksek bilet hizmet sektörlerinde 2-6 hafta arası geri dönüş. Düşük bilet mikro işletme için chatbot, sesli AI değil daha mantıklı.",
      },
    ],
    metadata: {
      title:
        "AI Sesli Asistan KOBİ Maliyet ve ROI Hesabı | MakiCalls Blog",
      description:
        "AI sesli asistanın gerçek 2026 maliyeti, klasik çağrı merkezi ile karşılaştırma ve hangi işletme büyüklüğünden itibaren mantıklı olduğu.",
      keywords: [
        "AI sesli asistan maliyet",
        "AI çağrı merkezi fiyat",
        "KOBİ AI asistan",
        "çağrı merkezi karşılaştırma",
        "AI asistan ROI",
      ],
    },
  },

  // ============================================================ POST 5 — CHATBOT
  {
    slug: "chatbot-nedir-turkce-chatbot-2026-rehberi",
    title:
      "Chatbot Nedir? Türkçe Chatbot, WhatsApp Chatbot ve AI Chatbot İçin Eksiksiz 2026 Rehberi",
    excerpt:
      "Chatbot tam olarak nasıl çalışır, hangi türleri var, Türkçe chatbot kurmak ne kadar tutar, WhatsApp ve Instagram'a nasıl bağlanır? KOBİ ve klinikler için detaylı rehber.",
    publishedAt: "2026-06-12",
    readingTime: "14 dk",
    tags: ["Chatbot", "AI", "Türkçe Chatbot"],
    author: AUTHOR,
    body: [
      {
        type: "p",
        text: "Chatbot, müşteri sorularını otomatik olarak yanıtlayan, gerektiğinde işlem yapan (randevu açan, sipariş alan, ödeme linki gönderen) yazılım sistemidir. 2026 itibariyle Türkiye'deki KOBİ, klinik ve e-ticaret işletmelerinin müşteri iletişimi büyük ölçüde WhatsApp, Instagram ve web chat üzerinden geçtiği için chatbot artık 'nice to have' değil, doğrudan rekabet aracı. Bu rehberde Türkçe chatbot türlerini, nasıl çalıştıklarını, fiyat aralıklarını, kurulum sürecini ve hangi işletmeye hangi tip chatbot uygun olduğunu derinlemesine anlatıyoruz.",
      },
      {
        type: "h2",
        id: "chatbot-nedir",
        text: "Chatbot Nedir, Ne İşe Yarar?",
      },
      {
        type: "p",
        text: "En basit haliyle chatbot, müşteriyle yazılı olarak konuşan ve cevap veren bir asistandır. Ama burada iki ana yapı var ve bunların arasındaki fark, Türkçe chatbot başarısının %90'ını belirler.",
      },
      {
        type: "h3",
        text: "1. Kural tabanlı chatbot (rule-based)",
      },
      {
        type: "p",
        text: "Belirlenmiş anahtar kelimeleri tanır, önceden yazılmış cevapları döner. Örneğin müşteri 'fiyat' yazdığında 'Hizmet paketlerimiz...' diye sabit metin gönderir. Avantajı: ucuz ve hızlı kurulur. Dezavantajı: cümle yapısı değiştiğinde anlamaz, müşteri 'fiyat aralığınız nedir' ya da 'kaç para' yazdığında farklı tepkiler verir.",
      },
      {
        type: "h3",
        text: "2. AI chatbot (LLM tabanlı, yapay zeka destekli)",
      },
      {
        type: "p",
        text: "Modern AI chatbotlar GPT, Claude, Gemini gibi büyük dil modelleri (LLM) üzerinde çalışır. Müşterinin cümlesini gerçekten anlar, bağlamı takip eder, doğal Türkçe ile yanıt verir. Eğitim sürecinde kliniğinizin/işletmenizin tonunu, hizmet listenizi, fiyat kurallarınızı öğrenir; tıpkı yeni gelen bir resepsiyoniste 1 hafta eğitim verir gibi.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Pratik fark",
        text: "Kural tabanlı chatbot 'menüden seçim yapın' deneyimi sunar. AI chatbot ise müşteriyle gerçekten konuşur. KOBİ için sezonsal değişen ürün ve fiyatlarla başa çıkmak için AI chatbot pratikte tek seçenek.",
      },
      {
        type: "h2",
        id: "turkce-chatbot-zorlugu",
        text: "Türkçe Chatbot: Neden Tüm AI'lar Türkçe Konuşamaz?",
      },
      {
        type: "p",
        text: "Yapay zeka modellerinin büyük çoğunluğu İngilizce ağırlıklı veriyle eğitildi. Türkçe gibi sondan eklemeli (agglutinative) bir dile geldiğinde modeller robotik, kalıp, doğallıktan uzak cevaplar üretebiliyor. 'Sayın müşterimiz, talebinize istinaden...' tarzı çeviri-koku alan metinler bu yüzden çıkıyor.",
      },
      {
        type: "p",
        text: "Profesyonel Türkçe chatbot için 3 kritik faktör:",
      },
      {
        type: "ol",
        items: [
          "Doğru model seçimi: Türkçe'yi iyi konuşan GPT-4o, Claude Sonnet, Gemini gibi tier-1 modellerle çalışan altyapı şart. Düşük maliyetli alternatifler Türkçe'de hep robotik kalıyor.",
          "Türkçe sistem promptu: chatbot'a 'doğal konuş, kalıp cümle kullanma' talimatı verilmeli; selamlama, vedalaşma, soru sorma kalıpları örneklenmeli.",
          "Sektörel ton ayarı: bir diş kliniğindeki ton ('Merhaba, hangi tedavi için arıyorsunuz?') ile bir otelin tonu ('Hoş geldiniz, hangi tarihler için müsaitlik bakalım?') farklı. Tone customization olmazsa chatbot generic ve mesafeli.",
        ],
      },
      {
        type: "h2",
        id: "chatbot-turleri",
        text: "Chatbot Çeşitleri: Hangi Kanalda Hangi Tip?",
      },
      {
        type: "h3",
        text: "WhatsApp Chatbot",
      },
      {
        type: "p",
        text: "WhatsApp Business API üzerinden çalışır. Türkiye'de KOBİ iletişiminin %58'i WhatsApp'tan geçtiği için kategorik olarak en yüksek ROI'li chatbot türü. Müşteri yazdığında AI chatbot anında okur, anlar, randevu açar veya soruyu yanıtlar. Avantajı: müşteri zaten WhatsApp kullanıyor, yeni uygulama indirmiyor. Maliyeti: aylık 1.500-3.500 TL BSP ücreti + Meta konuşma ücreti (servis konuşması ~0,18 TL).",
      },
      {
        type: "h3",
        text: "Instagram Chatbot",
      },
      {
        type: "p",
        text: "Instagram Business hesabına Meta API üzerinden bağlanır. DM otomasyonu yapar — reklamlardan veya postlardan gelen mesajları otomatik yanıtlar, hot lead'i tespit eder, sıcak müşteriyi satış ekibine yönlendirir. Özellikle estetik klinik, güzellik merkezi ve perakende işletmeler için kritik kanal.",
      },
      {
        type: "h3",
        text: "Web Chat (Site Chatbot)",
      },
      {
        type: "p",
        text: "Web sitenize gömülen JavaScript widget'ı. Ziyaretçi siteyi gezerken sağ alt köşede 'Yardımcı olabilir miyim?' kutusu açar. Doğru kullanıldığında dönüşüm oranını %30-50 artırır. SaaS, e-ticaret ve dijital hizmet işletmeleri için temel araç.",
      },
      {
        type: "h3",
        text: "Telegram & Facebook Messenger Chatbot",
      },
      {
        type: "p",
        text: "Türkiye'de WhatsApp dominant olduğu için Telegram bot'u ikincil kanal; tech-savvy hedef kitleler veya internasyonel müşterisi olan işletmeler için anlamlı. Facebook Messenger Türkiye'de organik olarak azaldı; ancak Facebook reklamı veriyorsanız Messenger chatbot reklam ROI'sini katlayabilir.",
      },
      {
        type: "h2",
        id: "chatbot-kullanım-senaryoları",
        text: "Chatbot Hangi İşletmelere Uygun? Pratik Kullanım Senaryoları",
      },
      {
        type: "h3",
        text: "Diş Klinikleri ve Estetik Klinikler",
      },
      {
        type: "p",
        text: "Klinik chatbot'u en yüksek getiriyi randevu otomasyonunda sağlar. Müşteri 'salı 14:00 boş mu?' yazdığında chatbot randevu defterinizi kontrol eder, müsait slot'u önerir, hastanın bilgilerini alıp randevuyu açar. Fiyat sorusu için sektör standart yanıt: 'Tedavi paketleri muayeneye göre belirlenir, kısa muayene randevusu açalım'. Mesai dışı çalan WhatsApp'ları yakalayarak haftalık 8-15 ekstra randevu yaratır.",
      },
      {
        type: "h3",
        text: "Otel ve Konaklama",
      },
      {
        type: "p",
        text: "Otel chatbot'u rezervasyon süreci, müsaitlik sorgusu, oda tipi açıklaması ve ödeme linki üzerinde yoğunlaşır. Multi-dil destek (Türkçe + İngilizce + Arapça + Rusça) burada şart — Türkiye'de yabancı misafirin %71'i kendi dilinde rezervasyon yapmak istiyor. PMS entegrasyonu varsa müsaitlik canlı senkron.",
      },
      {
        type: "h3",
        text: "E-ticaret",
      },
      {
        type: "p",
        text: "E-ticaret chatbot'u en çok 'kargom nerede' ve 'iade nasıl' sorularını çözer — bu iki soru tüm müşteri hizmetleri çağrısının yaklaşık %50'sini oluşturuyor. Sipariş takip API'sine bağlı chatbot, kargo durumunu otomatik çeker. İade akışını başlatır, kargo etiketi gönderir, müşteri memnuniyetini takip eder.",
      },
      {
        type: "h3",
        text: "Restoran ve Catering",
      },
      {
        type: "p",
        text: "Rezervasyon, menü gönderimi, paket sipariş, özel istek (alerjenler, gluten-free) — restoran chatbot'u tipik soruları yanıtlar, vardiya başlamadan önceki yoğun saatlerde müşteri temsilcisini destekler.",
      },
      {
        type: "h3",
        text: "Gayrimenkul",
      },
      {
        type: "p",
        text: "Emlak chatbot'u en güçlü iki rolde çalışır: 'hala satılık mı?' tekrar sorgularını ilan veritabanından otomatik yanıtlar; ve gelen leadi kalifiye eder (bütçe, kredi durumu, peşinat) — sadece gerçek alıcıyı danışmana iletir.",
      },
      {
        type: "h2",
        id: "chatbot-fiyat-aralıkları",
        text: "Chatbot Fiyatları (2026 Türkiye)",
      },
      {
        type: "p",
        text: "Chatbot maliyeti üç bileşenden oluşur: kurulum, altyapı abonesi, dakika/mesaj ücreti. 2026 Türkiye fiyat aralıkları:",
      },
      {
        type: "h3",
        text: "Başlangıç (sadece chatbot — kural tabanlı)",
      },
      {
        type: "ul",
        items: [
          "Kurulum: 2.000-5.000 TL",
          "Aylık altyapı: 800-2.000 TL",
          "Limitler: aylık 1.000-3.000 mesaj",
          "Sınırlama: cümle yapısı değişirse anlamıyor, sadece kalıp sorulara cevap",
        ],
      },
      {
        type: "h3",
        text: "Orta seviye (AI chatbot, tek kanal)",
      },
      {
        type: "ul",
        items: [
          "Kurulum: 5.000-12.000 TL",
          "Aylık altyapı: 2.500-5.500 TL",
          "Limitler: aylık 5.000-15.000 mesaj",
          "Avantaj: doğal Türkçe konuşur, sezonsal kampanya hızlı güncellenir",
        ],
      },
      {
        type: "h3",
        text: "Profesyonel (Omnichannel: WhatsApp + Instagram + Web)",
      },
      {
        type: "ul",
        items: [
          "Kurulum: 10.000-25.000 TL",
          "Aylık altyapı: 5.000-12.000 TL",
          "Limitler: sınırsız mesaj, mesaj başına marjinal ücret",
          "Avantaj: tüm kanallarda aynı asistan, CRM ve randevu defteri entegrasyonu",
        ],
      },
      {
        type: "h2",
        id: "kurulum-sureci",
        text: "Chatbot Kurulum Süreci: 4 Adım",
      },
      {
        type: "ol",
        items: [
          "Keşif görüşmesi (15-30 dk): işletmenizin ihtiyacı tespit edilir, hangi kanal/dil, hangi entegrasyon (CRM, randevu defteri) belirlenir.",
          "Veri toplama (1-3 gün): hizmet listesi, fiyat kuralları, SSS, marka tonu, çalışma saatleri tek bir formla alınır.",
          "Eğitim ve test (3-7 gün): chatbot kliniğinize/işletmenize göre yapılandırılır, dahili test edilir, ses ve metin örnekleri sunulur.",
          "Yayına geçiş (1 gün): WhatsApp/Instagram/Web entegrasyonu tamamlanır, asistan canlı. İlk hafta yakın takip + ince ayar yapılır.",
        ],
      },
      {
        type: "h2",
        id: "yapay-zeka-chatbot-avantajları",
        text: "AI Chatbot vs. Klasik Müşteri Hizmetleri",
      },
      {
        type: "p",
        text: "Bir müşteri temsilcisinin günde efektif 4-5 saat aktif çalıştığı, ayda 22 iş günü, vardiya bazlı bir yapıda max 100 müşteri/gün ile başa çıkabildiği gerçeğini kabul edelim. AI chatbot ise:",
      },
      {
        type: "ul",
        items: [
          "Eşzamanlı sınırsız müşteri (100 kişi aynı anda konuşabilir, beklemez)",
          "7/24 aktif (gece de mesai dışı da yanıt)",
          "Tutarlı kalite (1. müşteri ile 100. müşteri aynı kalitede)",
          "Sıfır eğitim maliyeti (kurulum sonrası)",
          "Marka tonu standart (hiç değişmez)",
          "Anında raporlama (her konuşma loglanır, transkript çıkar)",
        ],
      },
      {
        type: "p",
        text: "Bu özellikler birleştiğinde sezonsal yoğunluklarda (Black Friday, Ramazan, yaz sezonu) müşteri hizmetlerinin tıkanması probleminin tamamen ortadan kalktığını görüyoruz. Aynı zamanda müşteri temsilcileri robotik tekrar sorulardan kurtulup gerçek değer üreten taleplere odaklanıyor.",
      },
      {
        type: "h2",
        id: "chatbot-dezavantajları",
        text: "Chatbot Dezavantajları ve Sınırları",
      },
      {
        type: "p",
        text: "Dürüst olalım, her şey gül bahçesi değil:",
      },
      {
        type: "ul",
        items: [
          "Kompleks tıbbi/hukuki sorularda gerçek uzman gerekir; chatbot 'doktor/avukat size dönüş yapacak' diyerek devreder.",
          "Türkçe argo ve diyalekt konuşan müşterileri zaman zaman zorlanır — bu yüzden ton ayarı kritik.",
          "İlk kurulum 1-2 hafta yatırım istiyor; hazır kutu çözüm değil.",
          "Çok düşük çağrı hacmindeki mikro işletme için (haftada 10 mesaj altında) yatırım geri dönüşü uzun.",
          "Yanlış eğitilirse marka itibarına zarar verir; sahip-yöneticinin onayından geçmemiş içerik canlıya verilmemeli.",
        ],
      },
      {
        type: "h2",
        id: "yapay-zeka-chatbot-soru-cevap",
        text: "Sık Sorulan Sorular",
      },
      {
        type: "h3",
        text: "Chatbot müşteri temsilcimin yerine geçer mi?",
      },
      {
        type: "p",
        text: "Hayır, yerine geçmek için değil yanına eklenmek için kullanılır. Chatbot robotik tekrar soruları çözer, gerçek değer üreten taleplere müşteri temsilciniz odaklanır. Tipik sonuç: temsilci verimliliği 3-4x artar.",
      },
      {
        type: "h3",
        text: "Chatbot kurmak için teknik bilgi gerekli mi?",
      },
      {
        type: "p",
        text: "Hayır. Profesyonel chatbot sağlayıcısıyla çalıştığınızda tüm teknik tarafı (Meta onayı, WhatsApp Business API setup, entegrasyon, sunucu) onlar halleder. Sizden istenen sadece işletme bilgileridir.",
      },
      {
        type: "h3",
        text: "Chatbot Türkçe argo ve hakaret durumlarında ne yapar?",
      },
      {
        type: "p",
        text: "Profesyonel chatbotlar küfür/hakaret tespiti yapıp ya nazikçe konuyu değiştirir ya da gerçek temsilciye eskaleyt eder. Tone moderasyonu kurulum aşamasında belirlenir.",
      },
      {
        type: "h3",
        text: "Chatbot ne kadar sürede yatırımı geri öder?",
      },
      {
        type: "p",
        text: "Tipik geri dönüş süreleri: estetik klinik 1-2 hafta, diş kliniği 2-3 hafta, otel 4-6 hafta, e-ticaret 1 ay. Yüksek bilet hizmet sektörleri için geri dönüş çok hızlı.",
      },
      {
        type: "callout",
        tone: "success",
        title: "Özet",
        text: "Chatbot artık opsiyon değil, modern iletişimin standartı. Doğru kurulduğunda müşteri hizmetleri maliyetini düşürür, dönüşüm oranını artırır, gece bile satar. Türkçe chatbot için altyapı seçimi, ton ayarı ve sektörel kurallar — bu üçü doğruysa, gerisi rakamların konuşmasıdır.",
      },
    ],
    metadata: {
      title:
        "Chatbot Nedir? Türkçe AI Chatbot, WhatsApp ve Instagram Chatbot 2026 Rehberi | MakiCalls",
      description:
        "Chatbot nasıl çalışır, AI chatbot ile kural tabanlı chatbot farkı, Türkçe chatbot kurulum, fiyatlar, WhatsApp + Instagram entegrasyonu — kapsamlı 2026 rehberi.",
      keywords: [
        "chatbot",
        "chatbot nedir",
        "Türkçe chatbot",
        "AI chatbot",
        "WhatsApp chatbot",
        "Instagram chatbot",
        "yapay zeka chatbot",
        "chatbot kurulum",
        "chatbot fiyat",
        "chatbot Türkiye",
      ],
    },
  },

  // ============================================================ POST 6 — SESLI AGENT
  {
    slug: "ai-sesli-agent-yapay-zeka-cagri-merkezi-2026",
    title:
      "AI Sesli Agent (Voice Agent): Yapay Zeka Çağrı Merkezi ve Sesli Asistan 2026 Tam Rehberi",
    excerpt:
      "AI sesli agent nedir, nasıl çalışır, hangi sektörlerde kullanılır, klasik çağrı merkezi ile farkı ne? Türkçe konuşan yapay zeka çağrı merkezi için detaylı uzman rehberi.",
    publishedAt: "2026-06-11",
    readingTime: "13 dk",
    tags: ["AI Sesli Agent", "Yapay Zeka Çağrı Merkezi", "Voice AI"],
    author: AUTHOR,
    body: [
      {
        type: "p",
        text: "AI sesli agent (voice agent), telefonda gerçek bir insan gibi konuşabilen yapay zeka asistanıdır. Geleneksel çağrı merkezi çalışanının yaptığı işi 7/24, sınırsız eşzamanlı kapasiteyle, tutarlı kalitede yapar. 2026 itibariyle Türkiye'de yapay zeka çağrı merkezi teknolojisi diş klinikleri, oteller, saç ekimi merkezleri, gayrimenkul ofisleri ve e-ticaret markaları arasında hızla yayılıyor. Bu rehberde AI sesli agentın nasıl çalıştığını, hangi modüllerden oluştuğunu, kurulum sürecini ve klasik çağrı merkezi ile somut farkını derinlemesine ele alıyoruz.",
      },
      {
        type: "h2",
        id: "sesli-agent-nedir",
        text: "AI Sesli Agent (Voice Agent) Nedir?",
      },
      {
        type: "p",
        text: "AI sesli agent, üç teknolojinin birleşiminden oluşan bir sistemdir: konuşma tanıma (STT - Speech-to-Text), doğal dil işleme (NLP/LLM) ve metinden sese dönüşüm (TTS - Text-to-Speech). Müşteri telefon ettiğinde sesli agent şu adımları gerçek zamanlı uygular:",
      },
      {
        type: "ol",
        items: [
          "Müşterinin söylediğini STT modülü ile metne çevirir (Türkçe için 95%+ doğrulukta)",
          "Metni AI dil modeline (GPT-4o, Claude, Gemini gibi) gönderir, bağlamı analiz eder",
          "AI cevabı oluşturur — kliniğin/işletmenin kurallarına uygun, doğal Türkçe",
          "Cevabı TTS modülü ile insan benzeri sese çevirir ve müşteriye dinletir",
          "Tüm süreç toplam 1-2 saniyede biter — müşteri robotla konuştuğunu fark etmez",
        ],
      },
      {
        type: "h3",
        text: "Sesli agent vs. chatbot vs. IVR farkı",
      },
      {
        type: "ul",
        items: [
          "IVR (sesli yanıt sistemi): 'randevu için 1'e basın' kalıpları. Müşterinin %71'i kapatıyor.",
          "Chatbot: yazılı mesaj kanallarında (WhatsApp, Instagram, web) çalışır.",
          "Sesli agent: telefonda doğal konuşur — telefonla aranan KOBİ'lerin altın standardı.",
        ],
      },
      {
        type: "h2",
        id: "voice-agent-nasıl-calisir",
        text: "Yapay Zeka Çağrı Merkezi Teknik Olarak Nasıl Çalışır?",
      },
      {
        type: "p",
        text: "Bir AI sesli agent çağrı merkezinde 5 ana modül vardır: telefon altyapısı, ses tanıma, dil modeli, ses sentezi ve entegrasyon katmanı. Her birinin Türkçe için optimizasyonu kritik.",
      },
      {
        type: "h3",
        text: "1. Telefon Altyapısı (Telephony)",
      },
      {
        type: "p",
        text: "NetGSM, Twilio, Telnyx, Plivo gibi sağlayıcılarla telefon hattınız sesli agent'a bağlanır. Mevcut numaranızı taşıyabilir veya yeni 0850 numarası alabilirsiniz. Gelen aramalar AI agent'a yönlendirilir, gerektiğinde manuel transfer yapılır (örneğin acil durumda nöbetçi numaraya devir).",
      },
      {
        type: "h3",
        text: "2. Ses Tanıma (STT - Speech-to-Text)",
      },
      {
        type: "p",
        text: "OpenAI Whisper, Google Speech-to-Text, Azure Speech Service gibi servisler Türkçe sesi metne çevirir. Türkçe için doğruluk oranı 2026 itibariyle %95-97 bandında. Aksanlı konuşma, telefon kanal gürültüsü, hızlı konuşma gibi gerçek dünya senaryolarına optimizasyon kritik.",
      },
      {
        type: "h3",
        text: "3. Dil Modeli (LLM Brain)",
      },
      {
        type: "p",
        text: "Sesli agent'ın 'beyni' burası. GPT-4o, Claude Sonnet, Gemini gibi tier-1 LLM'ler Türkçe'yi doğal konuşur. Kliniğinizin/işletmenizin sistem promptu (talimat seti) hizmet listesi, fiyat kuralları, randevu kuralları, SSS, marka tonu burada tanımlanır.",
      },
      {
        type: "h3",
        text: "4. Ses Sentezi (TTS - Text-to-Speech)",
      },
      {
        type: "p",
        text: "ElevenLabs, OpenAI TTS, Azure Neural Voice, Google Wavenet gibi servisler metni insan benzeri sese çevirir. 2024 öncesi robotik olan Türkçe TTS, 2026 itibariyle gerçek insan sesinden ayırt edilemez seviyede. Klinikler genelde kadın profesyonel ton, oteller ise neutral resepsiyon tonu tercih eder.",
      },
      {
        type: "h3",
        text: "5. Entegrasyon Katmanı",
      },
      {
        type: "p",
        text: "Randevu defteri (Dentafy, Google Calendar, RoomCloud), CRM (HubSpot, Pipedrive, Salesforce, Zoho), ödeme (iyzico, Stripe), CRM (HubSpot, Pipedrive). API entegrasyonu sayesinde agent randevu açar, müsaitlik kontrol eder, ödeme linki gönderir.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Önemli teknik nokta",
        text: "Latency (yanıt gecikmesi) sesli agent'ın profesyonel hissedilmesi için kritik. Toplam STT + LLM + TTS pipeline 1.5 saniyenin altında olmalı. Aksi halde müşteri 'robot mu konuşuyor' diye sorguluyor. Tier-1 sağlayıcılar bu eşiği tutturuyor, ucuz altyapı tutturamıyor.",
      },
      {
        type: "h2",
        id: "voice-agent-sektörel-kullanım",
        text: "AI Sesli Agent Hangi Sektörlerde Çalışır?",
      },
      {
        type: "h3",
        text: "Sağlık Sektörü",
      },
      {
        type: "p",
        text: "Diş klinikleri, estetik klinikler, saç ekimi merkezleri ve sağlık turizmi acentaları için sesli agent kategorik dönüşüm sağlar. Mesai dışı arayan hasta artık kaçmaz. Hasta 'salı günü 14:00 boş mu?' diye sorduğunda agent randevu defterini canlı sorgular, müsaitse açar. Tıbbi sorularda 'doktor ekibimiz size dönüş yapacak' diyerek not alır, doktorun WhatsApp'ına iletir.",
      },
      {
        type: "h3",
        text: "Konaklama (Oteller, Pansiyonlar)",
      },
      {
        type: "p",
        text: "Otel sesli agent'ı çoklu dil destekli rezervasyon asistanı olarak çalışır. Türkçe + İngilizce + Arapça + Rusça konuşur, müsaitlik sorgular, fiyat verir, ödeme linki gönderir. Gece 02:00'da arayan Avrupalı misafiri uyumayan AI yakalar, OTA komisyonu ödemeden direkt rezervasyon alır.",
      },
      {
        type: "h3",
        text: "Araç Kiralama",
      },
      {
        type: "p",
        text: "Havalimanı bürolarına gelen aramaların yarısı 'Toyota Corolla 14-18 Temmuz var mı?' tarzı müsaitlik sorgusu. Sesli agent filo yönetim sisteminizden anlık veri çekerek 30 saniyede yanıt verir. Depozito, hasarsızlık, ek sürücü gibi standart soruları otomatik açıklar.",
      },
      {
        type: "h3",
        text: "E-ticaret Müşteri Hizmetleri",
      },
      {
        type: "p",
        text: "'Kargom nerede?' bombardımanı için sesli agent kargo API'sine bağlı çalışır. Müşterinin telefon numarası veya sipariş numarasıyla durum çeker, anında sonuç verir. İade akışını başlatır. Black Friday gibi kampanya günlerinde 100 müşteri eşzamanlı çalan telefon problemini kategorik olarak çözer.",
      },
      {
        type: "h3",
        text: "Gayrimenkul",
      },
      {
        type: "p",
        text: "'Hala satılık mı?' tekrar sorusu emlak ofisinin günlük yarısını yiyor. Sesli agent ilan veritabanını canlı kontrol eder, anında yanıt verir. Aynı zamanda lead kalifikasyonu yapar: bütçe aralığı, peşinat durumu, kredi çıkar mı sorularını sorar, sadece nitelikli alıcıları danışmana iletir.",
      },
      {
        type: "h2",
        id: "sesli-agent-vs-klasik-cm",
        text: "AI Sesli Agent vs. Klasik Çağrı Merkezi: Net Karşılaştırma",
      },
      {
        type: "ul",
        items: [
          "Kapasite: klasik CM tek kişi tek arama, AI agent sınırsız eşzamanlı",
          "Çalışma saati: klasik CM mesai içi, AI agent 7/24/365",
          "Tutarlılık: klasik CM operatöre göre değişir, AI agent tutarlı",
          "Eğitim süresi: klasik CM 2-4 hafta, AI agent 3-7 gün",
          "Aylık maliyet: tek operatör 25.000 TL+, AI agent 5.500-9.000 TL",
          "Sezon dalgalanması: klasik CM kapasitesi yetmez, AI agent etkilenmez",
          "Dil desteği: klasik CM ana dile sınırlı, AI agent 6+ dil",
          "Çağrı transkripti: klasik CM yok, AI agent her aramanın tam metni",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Dürüst nokta",
        text: "AI sesli agent her durumda klasik çağrı merkezinin yerini almaz. Karmaşık empati gerektiren satış görüşmeleri, üst düzey VIP müşteri ilişkileri, kriz iletişimi gibi durumlarda insan operatör hâlâ önde. Sesli agent operatörünüzün üzerindeki robotik tekrar yükü kaldırır, gerçek değer üreten konuşmalara odaklanmasını sağlar.",
      },
      {
        type: "h2",
        id: "kurulum-sureci",
        text: "AI Çağrı Merkezi Kurulum Süreci",
      },
      {
        type: "ol",
        items: [
          "Tanışma görüşmesi (30 dk): işletmeniz, mevcut çağrı akışı, sorunlu noktalar tespit edilir.",
          "Bilgi toplama (1-2 gün): çalışma saatleri, hizmet listesi, fiyat kuralları, randevu/rezervasyon kuralları, SSS, marka tonu — tek formda alınır.",
          "Telefon altyapısı kurulumu (2-5 gün): numara taşıma veya yeni hat, NetGSM/Twilio yönlendirme.",
          "AI eğitimi (3-7 gün): sistem promptu yazılır, ses karakteri seçilir, entegrasyonlar (CRM, takvim, ödeme) kurulur.",
          "İç test ve kalibrasyon (2-3 gün): farklı senaryolar test edilir, ton ve cevap kalitesi ince ayarlanır.",
          "Pilot canlıya geçiş (1-2 hafta): belirli saatlerde veya belirli hatlarda agent aktif olur, izlenir.",
          "Tam canlı (sürekli): asistan canlıda, her hafta dönüşüm + soru raporu paylaşılır.",
        ],
      },
      {
        type: "h2",
        id: "fiyat-bilgisi",
        text: "AI Sesli Agent Fiyatları (2026 Türkiye)",
      },
      {
        type: "ul",
        items: [
          "Kurulum (one-time): 8.000-20.000 TL (sektör ve entegrasyon kapsamına göre)",
          "Aylık altyapı: 3.500-7.500 TL",
          "Ses dakika ücreti: 0,8-1,4 TL/dakika (gelen + giden ortalama)",
          "Tipik aylık toplam (orta hacimli klinik, 800 dk): 5.500-9.000 TL",
        ],
      },
      {
        type: "h2",
        id: "geri-donus-süresi",
        text: "Yatırım Geri Dönüş Süreleri (ROI)",
      },
      {
        type: "p",
        text: "AI sesli agent'ın geri dönüş süresi işletme sektörüne ve müşteri başına ortalama gelire göre değişir. Yaklaşık ortalama değerler:",
      },
      {
        type: "ul",
        items: [
          "Estetik klinik (15.000 TL paket): 1-2 hafta",
          "Diş kliniği (8.500 TL hasta değeri): 2-3 hafta",
          "Saç ekimi (4.500 USD paket): tek satışta",
          "Otel (3 gece × 800 TL): 4-6 hafta",
          "Gayrimenkul (komisyon bazlı): tek satışta",
          "Araç kiralama (3-7 gün × 700 TL): 3-5 hafta",
        ],
      },
      {
        type: "h2",
        id: "sik-sorulanlar",
        text: "AI Sesli Agent: Sık Sorulan Sorular",
      },
      {
        type: "h3",
        text: "Müşteriler agent'ın yapay zeka olduğunu anlıyor mu?",
      },
      {
        type: "p",
        text: "2026 Türkçe AI sesli agentları gerçek insan sesinden ayırt edilmez kalitede. Müşterilerin %80'i gerçek bir resepsiyonist olduğunu düşünür. İsterseniz başlangıçta 'işletmenin dijital asistanıyım' diyerek transparency tercih edebilirsiniz — bu konuda esneklik var.",
      },
      {
        type: "h3",
        text: "Mevcut çağrı merkezi yazılımımla uyumlu mu?",
      },
      {
        type: "p",
        text: "Çoğu modern çağrı merkezi yazılımı (3CX, Genesys, Mitel, Bitrix24) API üzerinden entegre olabilir. Mevcut numaranızı taşıyabilir, dahili numaralarla beraber çalışabilir.",
      },
      {
        type: "h3",
        text: "Hasta/müşteri gerçek bir insanla konuşmak istediğinde?",
      },
      {
        type: "p",
        text: "Agent ihtiyaç anında çağrıyı önceden tanımlı bir numaraya yönlendirir (nöbetçi doktor, satış müdürü, vs). 'Sizi şirket içinden bir uzmana bağlıyorum' diyerek devir sorunsuz olur.",
      },
      {
        type: "h3",
        text: "Veri güvenliği ve KVKK uyumu nasıl?",
      },
      {
        type: "p",
        text: "Profesyonel sağlayıcılar Türkiye veya AB lokasyonlarda barındırılan altyapı kullanır. Çağrı kayıtları şifrelidir, KVKK uyumlu işlenir, sadece sizin erişiminizdedir. Standart sözleşmede explicit yazılır.",
      },
      {
        type: "h3",
        text: "Çağrı kalitesi internet bağımlısı mı?",
      },
      {
        type: "p",
        text: "Hayır. AI sesli agent normal telefon altyapısı üzerinden çalışır, müşteri tarafında internet/akıllı telefon gerekmez. Sabit hattan veya cep telefonundan normal şekilde aranır.",
      },
      {
        type: "callout",
        tone: "success",
        title: "Genel değerlendirme",
        text: "AI sesli agent 2026'da niş bir teknoloji değil — KOBİ ve klinik sektörünün standardı. Yatırım geri dönüşü kategorik olarak hızlı, kapasite kategorik olarak sınırsız, müşteri deneyimi gerçek bir resepsiyonisten ayırt edilmez. Sorun 'kurulsun mu?' değil, 'ne zaman kuruluyor?'.",
      },
    ],
    metadata: {
      title:
        "AI Sesli Agent ve Yapay Zeka Çağrı Merkezi 2026 Tam Rehberi | MakiCalls",
      description:
        "AI sesli agent (voice agent) nedir, nasıl çalışır, hangi sektörlerde kullanılır, klasik çağrı merkezi ile farkı, fiyatlar ve kurulum süreci — Türkçe uzman rehberi.",
      keywords: [
        "AI sesli agent",
        "voice agent",
        "sesli agent",
        "AI sesli asistan",
        "yapay zeka çağrı merkezi",
        "AI çağrı merkezi",
        "AI call center",
        "Türkçe sesli AI",
        "sesli asistan Türkçe",
        "AI resepsiyonist",
      ],
    },
  },

  // ============================================================ POST 7 — CRM
  {
    slug: "crm-otomasyonu-yapay-zeka-musteri-yonetimi-2026",
    title:
      "CRM Otomasyonu: Yapay Zeka ile Müşteri Yönetimi ve AI Entegrasyonu 2026 Rehberi",
    excerpt:
      "CRM otomasyonu nedir, yapay zeka müşteri yönetimini nasıl dönüştürüyor, HubSpot/Pipedrive/Salesforce karşılaştırması, AI ile CRM entegrasyonu için detaylı 2026 rehberi.",
    publishedAt: "2026-06-09",
    readingTime: "12 dk",
    tags: ["CRM", "Müşteri Yönetimi", "AI Otomasyon"],
    author: AUTHOR,
    body: [
      {
        type: "p",
        text: "CRM otomasyonu, müşteri yönetiminin sıradan iş kalemlerini (lead kayıt, takip mailleri, randevu hatırlatma, satış aşaması takibi, raporlama) yazılım üzerinden otomatik yapan iş süreci sistemidir. 2026 itibariyle modern CRM artık sadece müşteri veritabanı değil; AI destekli müşteri yönetimi, otomatik segmentasyon, lead kalifikasyonu, çağrı transkripti analizi gibi katmanları içeren tam dijital satış altyapısıdır. Bu rehberde CRM otomasyonu için neyin önemli olduğunu, hangi CRM'in hangi iş için uygun olduğunu, AI entegrasyonunun gerçek faydalarını ve Türkiye KOBİ gerçeklerini ele alıyoruz.",
      },
      {
        type: "h2",
        id: "crm-nedir",
        text: "CRM Nedir, Ne İşe Yarar?",
      },
      {
        type: "p",
        text: "CRM (Customer Relationship Management - Müşteri İlişkileri Yönetimi) bir yazılım kategorisidir. Müşterilerinizle ilgili tüm etkileşim, satın alma geçmişi, iletişim bilgileri ve satış fırsatlarını merkezi bir veritabanında tutar. Modern CRM'ler bunu otomasyon, raporlama ve AI destekli karar verme ile genişletir.",
      },
      {
        type: "h3",
        text: "CRM olmadan tipik KOBİ deneyimi",
      },
      {
        type: "p",
        text: "Müşteri bilgileri WhatsApp konuşmalarında, Outlook'ta, masaüstündeki Excel dosyasında, resepsiyonun defterinde, satış müdürünün kafasında. Bir müşterinin geçmişini araştırmak için 4 farklı yerde arama. Personel ayrıldığında kritik bilgi gidiyor. Aynı müşteriye iki kez teklif veriliyor. Sıcak fırsat unutuluyor. Yıllık kayıp: ciddi.",
      },
      {
        type: "h3",
        text: "CRM ile aynı işletme",
      },
      {
        type: "p",
        text: "Her müşteri kaydı tek bir kart altında: iletişim, tüm telefon görüşmeleri, e-postalar, WhatsApp mesajları, randevular, satış aşaması, notlar. Yeni gelen personel 5 dakikada müşteri geçmişini görüyor. Satış pipeline'ı net — hangi fırsat hangi aşamada, kimin sorumluluğunda. Otomatik hatırlatmalar — sıcak fırsat kapatılana kadar takip ediliyor.",
      },
      {
        type: "h2",
        id: "crm-otomasyonu-temelleri",
        text: "CRM Otomasyonu Temelleri: 6 Otomasyon Türü",
      },
      {
        type: "h3",
        text: "1. Lead Capture Otomasyonu",
      },
      {
        type: "p",
        text: "Web formundan, WhatsApp'tan, Instagram DM'inden, çağrı merkezinden gelen yeni müşteri bilgileri otomatik olarak CRM'e düşer. Kaynak (UTM source) etiketlenir, satış ekibinin görmesi için bildirim atılır. Manuel veri girişine son.",
      },
      {
        type: "h3",
        text: "2. Lead Routing (Yönlendirme)",
      },
      {
        type: "p",
        text: "Yeni lead otomatik olarak doğru satış temsilcisine atanır. Kurallar şehir bazlı (İstanbul leadi Ali'ye, Ankara Mehmet'e), bütçe bazlı (1M TL üzeri Senior'a), ürün bazlı (Sesli Asistan paketi Ayşe'ye) tanımlanır. Round-robin dağıtım veya müsaitlik bazlı atama da mümkün.",
      },
      {
        type: "h3",
        text: "3. Otomatik Takip (Drip Campaigns)",
      },
      {
        type: "p",
        text: "Lead'e otomatik mail/WhatsApp serisi: ilk gün karşılama, 3. gün ürün detay, 7. gün vaka çalışması, 14. gün kapanış teklifi. Müşteri lead aşamasında bile sıcak tutulur. Manuel olarak haftalık 200 maile bireysel cevap yazmak yerine sistem hep aktif.",
      },
      {
        type: "h3",
        text: "4. Satış Aşaması Otomasyonu",
      },
      {
        type: "p",
        text: "Lead pipeline'da aşama değiştikçe (Soğuk → Sıcak → Toplantı → Teklif → Kapanış) otomatik aksiyonlar tetiklenir. Teklif aşamasına geçince sözleşme taslağı otomatik hazırlanır, kapanmaya yakın olunca yönetici bildirimi gider.",
      },
      {
        type: "h3",
        text: "5. Müşteri Hizmetleri Sonrası Takip",
      },
      {
        type: "p",
        text: "Hizmet/ürün teslim edildikten sonra otomatik memnuniyet anketi, Google yorum talebi, çapraz satış teklifi gider. Mevcut müşteri lifetime value'su artırılır.",
      },
      {
        type: "h3",
        text: "6. Raporlama Otomasyonu",
      },
      {
        type: "p",
        text: "Her Pazartesi otomatik haftalık satış raporu (dönüşüm oranı, kapanan fırsat, kayıp lead nedenleri) yöneticinin e-postasında. Manuel veri toplama ve sunum hazırlama saatlerini ortadan kaldırır.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Pratik nokta",
        text: "CRM otomasyonu bir 'lüks' değil. Aylık 50'den fazla lead aldığınız andan itibaren manuel takip mantıklı olmaktan çıkıyor. CRM kurmamak, fırsatları unutmaktır.",
      },
      {
        type: "h2",
        id: "yapay-zeka-crm",
        text: "Yapay Zeka ile CRM Entegrasyonu: 2026'nın Oyun Kuralı",
      },
      {
        type: "p",
        text: "Klasik CRM otomasyonu kuralları izler ('eğer X olduysa Y yap'). AI destekli CRM ise karar verir ('bu lead'in dönüşüm olasılığı %78, satışın en muhtemel kapanış tarihi 14 gün sonra, en iyi yaklaşım demo daveti'). Bu kategorik bir sıçrama.",
      },
      {
        type: "h3",
        text: "AI CRM'in 5 Süper Gücü",
      },
      {
        type: "ol",
        items: [
          "Lead Scoring: AI, lead'in davranış geçmişine bakarak dönüşüm olasılığını puanlar. Satış ekibi sıcak lead'lere odaklanır.",
          "Konuşma Transkripti Analizi: Sesli agent veya çağrı merkezindeki tüm aramalar yazıya döküler, AI satış görüşmelerinden 'kazanan' davranışları öğrenip ekibe öneri verir.",
          "Otomatik Özet ve Not: Konuşma sonrası AI satış görüşmesini özetler, müşterinin sorularını, itirazlarını, follow-up için aksiyonları listeler.",
          "Kişiselleştirilmiş Mesajlaşma: AI her müşteri için ton ve içerik özelleştirir. 50 lead'e 50 farklı kişiselleştirilmiş e-posta saniyeler içinde hazırlanır.",
          "Tahmin Modelleri: AI, hangi müşterinin churn (kayıp) riskinde olduğunu, hangi müşteriye upsell yapabileceğinizi önceden tahmin eder.",
        ],
      },
      {
        type: "h2",
        id: "crm-secimi",
        text: "Türkiye İçin CRM Karşılaştırması",
      },
      {
        type: "h3",
        text: "HubSpot CRM",
      },
      {
        type: "p",
        text: "Ücretsiz başlar, küçük işletme için yeterli. Pazarlama otomasyonu, e-posta serileri, formlar dahil. Türkçe arayüz yok ama İngilizce'si öğrenilir. AI özellikleri Sales Hub Pro paketinde. Aylık 1.500-15.000 TL (ekip büyüklüğüne göre). KOBİ için en popüler.",
      },
      {
        type: "h3",
        text: "Pipedrive",
      },
      {
        type: "p",
        text: "Satış pipeline'ı odaklı; kanban tarzı görsel arayüz. Türkçe arayüz var. Otomasyonlar ('Workflow Automation') güçlü. Aylık 400-2.000 TL/kullanıcı. Satış ekibi yoğun KOBİ için ideal — özellikle gayrimenkul, emlak, otomotiv satış.",
      },
      {
        type: "h3",
        text: "Salesforce",
      },
      {
        type: "p",
        text: "Kurumsal CRM'in altın standardı. Çok güçlü ama karmaşık. Aylık 2.500-50.000+ TL. 50+ kişilik satış ekibi olan büyük işletmeler için. KOBİ için overkill ve çok pahalı.",
      },
      {
        type: "h3",
        text: "Zoho CRM",
      },
      {
        type: "p",
        text: "Pratik, ucuz, Türkçe arayüz mevcut. Zoho One paketi tüm Zoho araçlarını (CRM, mail, takvim, doküman) içerir. Aylık 500-2.500 TL/kullanıcı. KOBİ için maliyet etkin alternatif.",
      },
      {
        type: "h3",
        text: "Bitrix24",
      },
      {
        type: "p",
        text: "Türkiye'de yaygın, Rusya merkezli. Ücretsiz başlar, KOBİ planları 1.000-5.000 TL/ay. Telefon entegrasyonu güçlü, çoğu klinik kullanıyor.",
      },
      {
        type: "h2",
        id: "kuçuk-isletme-pratik",
        text: "Küçük İşletme İçin Pratik CRM Yol Haritası",
      },
      {
        type: "ol",
        items: [
          "Başlangıç (0-3 ay): HubSpot Free veya Zoho ücretsiz versiyonla başla. Sadece kontak veritabanı + satış pipeline'ı kullan.",
          "Otomasyon (3-6 ay): Form-to-CRM lead capture, otomatik mail karşılama, randevu hatırlatma kuruldukça verimlilik artar.",
          "Entegrasyon (6-12 ay): WhatsApp, sesli agent, ödeme sistemi, randevu defteri CRM'e bağlanır. Tek panelden müşteri görünümü.",
          "AI Katmanı (12+ ay): Lead scoring, konuşma transkripti analizi, tahmin modelleri devreye alınır.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Sık yapılan hata",
        text: "Çoğu KOBİ baştan Salesforce gibi enterprise CRM'e atlar, aylık 30.000 TL ödeyip kullanılan özelliğin %5'inden faydalanır. CRM'i ihtiyaca göre büyütmek doğru yaklaşım — küçük başla, kullandıkça ölçeklen.",
      },
      {
        type: "h2",
        id: "ai-cm-crm",
        text: "AI Çağrı Merkezi + CRM Entegrasyonu",
      },
      {
        type: "p",
        text: "AI sesli agent ile CRM'i entegre ettiğinizde gerçek dönüşüm başlar. Her gelen telefon otomatik olarak CRM'de kayıt oluşturur, müşteriyse mevcut karta not düşer. Tüm konuşma transkripti CRM'de görülebilir, AI özetler. Randevu açıldığında pipeline aşaması güncellenir. Satış ekibi sabah açıp 'gece kim aradı, ne istedi, hangi randevu açıldı' tek bakışta görür.",
      },
      {
        type: "h3",
        text: "Pratik entegrasyon senaryoları",
      },
      {
        type: "ul",
        items: [
          "Diş kliniği: AI agent yeni hasta aramasını alır, hasta kartı CRM'de açılır, randevu defterine yazılır, hatırlatma SMS planlanır",
          "Otel: gelen rezervasyon talebi AI agent tarafından alınır, PMS'e yazılır, CRM'de misafir profili oluşturulur, sonraki sezon kampanya hedef listesine eklenir",
          "Gayrimenkul: alıcı arar, AI lead'i kalifiye eder, CRM'e bütçe + tercih + ihtiyaç bilgisiyle düşer, satış müdürüne 'hot lead' bildirimi gider",
          "Estetik klinik: müşteri 'lazer epilasyon kaç para?' sorar, AI fiyat aralığı verir + paket detayı gönderir, CRM'de 'sıcak lead' kategorisinde açılır",
        ],
      },
      {
        type: "h2",
        id: "implementasyon-süresi",
        text: "Tipik Implementasyon Süresi",
      },
      {
        type: "p",
        text: "CRM kurulumu hazır altyapıyla 1-2 gün, AI entegrasyonu eklenmesi 1-2 hafta. Tipik proje takvimi:",
      },
      {
        type: "ul",
        items: [
          "1. hafta: CRM altyapı kurulumu + veri taşıma (eski Excel/Outlook → CRM)",
          "2. hafta: temel otomasyonlar (lead capture, e-posta serisi) aktif",
          "3-4. hafta: WhatsApp / sesli agent entegrasyonu",
          "5-6. hafta: AI lead scoring + transkript analizi devrede",
          "2. ay sonu: full sistem canlı, ekip eğitimi tamamlandı, ROI ölçülmeye başlıyor",
        ],
      },
      {
        type: "h2",
        id: "crm-roi",
        text: "CRM Yatırım Geri Dönüş Hesabı",
      },
      {
        type: "p",
        text: "Salesforce'un sektörel araştırmasına göre CRM yatırımının ortalama ROI'si %245 (3 yıllık). Türkiye KOBİ pratiğinde kısa vadeli rakamlar:",
      },
      {
        type: "ul",
        items: [
          "Sıcak lead'lerin kapanma oranı: %25 artış (manuel takipte unutulanlar azalır)",
          "Satış döngüsü süresi: %18 azalma (otomatik takip + AI öncelik)",
          "Müşteri başına gelir: %15-20 artış (cross-sell + upsell tetiklenir)",
          "Manuel veri girişi: %70 azalma (form/WhatsApp/agent otomatik düşer)",
          "Personel onboarding süresi: 2 hafta yerine 3 gün (kayıtlar zaten merkezi)",
        ],
      },
      {
        type: "callout",
        tone: "success",
        title: "Genel değerlendirme",
        text: "CRM otomasyonu artık opsiyonel değil. Modern KOBİ'nin altyapı tabakası. AI ile entegre edildiğinde sadece data tutmaktan çıkıp, satış kararını destekleyen bir akıl haline geliyor. Doğru kurulduğunda 6 ay içinde kendini ödüyor, sonrası net kâr.",
      },
    ],
    metadata: {
      title:
        "CRM Otomasyonu: Yapay Zeka ile Müşteri Yönetimi 2026 Rehberi | MakiCalls",
      description:
        "CRM otomasyonu nedir, AI destekli müşteri yönetimi nasıl çalışır, HubSpot/Pipedrive/Zoho karşılaştırması, AI çağrı merkezi entegrasyonu — Türkçe uzman rehberi.",
      keywords: [
        "CRM",
        "CRM otomasyonu",
        "CRM yapay zeka",
        "AI CRM",
        "müşteri yönetimi",
        "HubSpot",
        "Pipedrive",
        "Zoho CRM",
        "Salesforce",
        "CRM entegrasyonu",
        "satış otomasyonu",
      ],
    },
  },
];

export const POSTS_BY_SLUG: Record<string, BlogPost> = Object.fromEntries(
  POSTS.map((p) => [p.slug, p]),
);

/** Tarihe göre en yeni post en üstte */
export function getSortedPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}
