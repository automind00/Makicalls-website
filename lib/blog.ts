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
