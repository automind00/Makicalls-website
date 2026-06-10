/**
 * Tüm sektör landing sayfalarının verisi. Config-driven — her sektör
 * için aynı UI bileşenleri (hero, pains, channels, process, faq, form)
 * farklı içerikle render edilir.
 *
 * Pain points kasıtlı olarak HER SEKTÖR İÇİN FARKLI yazılmıştır;
 * hizmet temeli aynı, problem dili sektörün gerçek derdine basar.
 */

export type SectorPain = {
  iconKey: PainIconKey;
  title: string;
  body: string;
  stat?: string;
};

export type PainIconKey =
  | "Clock"
  | "PhoneOff"
  | "Inbox"
  | "UserMinus"
  | "Globe"
  | "DollarSign"
  | "AlertTriangle"
  | "Languages"
  | "Star"
  | "Calendar"
  | "FileWarning"
  | "Truck"
  | "TrendingDown"
  | "Camera"
  | "MessageSquareWarning"
  | "MapPin";

export type ChannelKey = "voice" | "whatsapp" | "web" | "instagram";

export type SectorFaq = { q: string; a: string };

export type SectorProcessStep = {
  n: string;
  title: string;
  body: string;
  time: string;
};

export type SectorConfig = {
  /** URL slug — yeni rotalar /sektorler/<slug> altında çıkar */
  slug: string;
  /** Eğer mevcut bir top-level rota varsa (ör. /dis-klinikleri) buraya yaz; navbar/showcase link'i buna gider */
  legacyHref?: string;
  /** Showcase kartlarında görünecek sektör adı */
  name: string;
  /** Kısa açıklama (showcase kartında) */
  shortDesc: string;
  /** Showcase kartında kullanılan lucide-react ikon adı */
  iconKey: ShowcaseIconKey;
  /** Showcase gradient renkleri */
  accent: "violet" | "rose" | "amber" | "emerald" | "cyan" | "indigo" | "fuchsia" | "orange";

  hero: {
    badge: string;
    /** Başlık 3 parça: düz / gradient / düz */
    titleStart: string;
    titleMid: string;
    titleEnd: string;
    subtitle: string;
  };

  /** Sektörün KENDİ acı noktaları — kasıtlı olarak farklı yazılır */
  pains: SectorPain[];

  /** İsteğe bağlı pain-points başlığı override (sektöre göre dil değişir) */
  painsHeading?: {
    badge: string;
    titleStart: string;
    titleEnd: string;
  };

  /** Omnichannel section override — yoksa default 4 kanal */
  channels?: ChannelKey[];

  /** Hangi kanalın hangi rolde kullanıldığı (kanal kartı açıklamaları sektöre göre değişir) */
  channelCopy?: Partial<
    Record<ChannelKey, { title: string; body: string; badge: string }>
  >;

  /** Process steps — yoksa default 3 adım kullanılır */
  processSteps?: SectorProcessStep[];

  faqs: SectorFaq[];

  /** form submission içine eklenecek kaynak tag'i */
  formSourceTag: string;

  /** Form section başlığı */
  formCopy: {
    badge: string;
    titleStart: string;
    titleEnd: string;
    subtitle: string;
  };

  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export type ShowcaseIconKey =
  | "Stethoscope"
  | "Scissors"
  | "Sparkles"
  | "Plane"
  | "Hotel"
  | "Car"
  | "ShoppingBag"
  | "Building2";

// =====================================================================
// SECTORS
// =====================================================================

export const SECTORS: SectorConfig[] = [
  // ---------------------------------------------------------------- DENTAL
  {
    slug: "dis-klinikleri",
    legacyHref: "/dis-klinikleri",
    name: "Diş Klinikleri",
    shortDesc: "Randevu, ücret bilgisi, tedavi soruları — mesai dışı kaçırılan hasta kalmasın",
    iconKey: "Stethoscope",
    accent: "violet",
    hero: {
      badge: "İstanbul Diş Klinikleri İçin · 7/24 AI Resepsiyonist",
      titleStart: "Kliniğinizin telefonunu",
      titleMid: "7/24 açan",
      titleEnd: "AI resepsiyonist",
      subtitle:
        "Mesai dışı kaçırılan randevular yok yere kayıp. MakiCalls dakikalar içinde devreye girer, Türkçe konuşur, randevu defterinizle entegre çalışır.",
    },
    pains: [
      {
        iconKey: "Clock",
        title: "Mesai dışı çalan telefon",
        body: "Akşam 18 sonrası, hafta sonu ve tatil günleri çalan telefonlar cevapsız kalıyor. Hasta sizi aramaya bir kez sıkılır, sonra rakibi arar.",
        stat: "Aramaların %32'si mesai dışı saatlerde yapılır",
      },
      {
        iconKey: "UserMinus",
        title: "Resepsiyonist devir hızı",
        body: "Bir resepsiyonist yetiştirmek 2 hafta sürüyor, ortalama kalış süresi 11 ay. Her gidişinde randevu defteri, hasta tonu, marka sesi sıfırlanıyor.",
        stat: "Klinik personel turnover %35-40 aralığında",
      },
      {
        iconKey: "Inbox",
        title: "Kanal kargaşası",
        body: "WhatsApp, telefon, Instagram DM, web formu — her biri ayrı yerde. Hasta dört yerden yazıyor, kim ne istedi karışıyor, randevular düşüyor.",
        stat: "Hasta ortalama 2.4 kanaldan iletişim deniyor",
      },
    ],
    faqs: [
      {
        q: "AI Türkçe ne kadar iyi konuşuyor? Aksanlı veya robotik mi?",
        a: "Doğal Türkçe ses motorları ve kliniğe özel ton ayarıyla çalışıyoruz. Hastalar genelde gerçek bir resepsiyonistle konuştuğunu düşünüyor.",
      },
      {
        q: "Mevcut randevu defterim / CRM'imle uyumlu mu?",
        a: "Yaygın randevu yazılımları (Dentafy, MediKlinik, Cleo gibi) ve Google Calendar ile entegre çalışır. Özel sisteminiz varsa API tarafını biz hallederiz.",
      },
      {
        q: "Hasta gerçekten bir doktorla konuşmak isterse?",
        a: "Asistan ihtiyaç anında çağrıyı nöbetçi numaraya yönlendirir veya tıbbi soruyu not alıp size iletir.",
      },
      {
        q: "Hasta kişisel verileri nasıl korunuyor? KVKK uyumlu mu?",
        a: "Veriler Türkiye'de barındırılan altyapıda, KVKK uyumlu şekilde tutuluyor. Çağrı kayıtları sadece sizin erişimde.",
      },
      {
        q: "Sözleşme zorunluluğu var mı?",
        a: "Uzun süreli taahhüt yok. İstediğiniz zaman ayrılabilirsiniz, veriler size ait.",
      },
    ],
    formSourceTag: "sector_dis_klinikleri",
    formCopy: {
      badge: "Pilot Başvurusu",
      titleStart: "Kliniğinize özel",
      titleEnd: "AI asistanı dinleyin",
      subtitle:
        "Formu doldurun, 24 saat içinde dönüş yapıyoruz. Uygun bulursak kısa demo görüşmesi kuruyoruz.",
    },
    metadata: {
      title: "Diş Klinikleri İçin AI Resepsiyonist | MakiCalls",
      description:
        "Diş kliniğinizin telefonunu 7/24 açan, Türkçe konuşan AI resepsiyonist. Mesai dışı randevu kaybetmeyin, hasta kaçırmayın.",
      keywords: [
        "diş kliniği AI asistan",
        "AI resepsiyonist",
        "diş kliniği randevu otomasyonu",
        "klinik çağrı merkezi",
      ],
    },
  },

  // ---------------------------------------------------------------- HOTELS (NEW)
  {
    slug: "oteller",
    name: "Oteller",
    shortDesc: "7/24 rezervasyon, çoklu dil, OTA komisyonu yerine direkt satış",
    iconKey: "Hotel",
    accent: "amber",
    hero: {
      badge: "Otel & Butik Konaklama İçin · Çoklu Dil AI Resepsiyon",
      titleStart: "Gece çalan rezervasyon telefonunu",
      titleMid: "asla kaçırmayın",
      titleEnd: ", her dilde cevaplayın",
      subtitle:
        "Booking, Hotels.com komisyonunu ödemeden direkt rezervasyon almak için resepsiyonun açık kalmalı. AI asistan Türkçe + İngilizce + Arapça konuşur, müsaitlik kontrol eder, ödeme linki bile gönderir.",
    },
    painsHeading: {
      badge: "Otel sahiplerinin gerçek derdi",
      titleStart: "Çalmayan telefon =",
      titleEnd: "OTA'ya kaçan rezervasyon",
    },
    pains: [
      {
        iconKey: "Clock",
        title: "Gece arayan rezervasyon kayıp",
        body: "Avrupa veya Körfez'den misafir saat 02:00'da arıyor; resepsiyon uyuyor. Sabah hatırladığında çoktan Booking üzerinden başka otele kayıt yapmış. Sizin için sadece komisyonlu rezervasyon kalmış.",
        stat: "Direkt aramaların %46'sı 22:00–08:00 arasında",
      },
      {
        iconKey: "Languages",
        title: "Yabancı misafirin dil baskısı",
        body: "Yabancı misafire İngilizce / Arapça / Rusça açıklama yapacak bir resepsiyonist gece nöbetinde yok. Müsaitlik soruluyor, oda tipi açıklanamıyor, satış kaybediliyor.",
        stat: "Yabancı misafirin %71'i kendi dilinde rezervasyon yapmak istiyor",
      },
      {
        iconKey: "DollarSign",
        title: "OTA komisyonları her gece can yakıyor",
        body: "Booking %15, Hotels.com %18, Expedia %20 komisyon alır. Aynı misafiri direkt rezervasyon edebilirsen geceliğin %20'sini cebinde tutarsın. Sorun: direkt rezervasyon kanalın 7/24 açık değil.",
        stat: "Direkt rezervasyon = oda başı 200–800 TL ek kâr",
      },
    ],
    channels: ["voice", "whatsapp", "web", "instagram"],
    channelCopy: {
      voice: {
        title: "Sesli Arama",
        body: "Resepsiyon numaranıza gelen her çağrıyı 4 dilde karşılar, müsaitlik gösterir, fiyat verir, rezervasyon açar.",
        badge: "TR/EN/AR/RU",
      },
      whatsapp: {
        title: "WhatsApp",
        body: "Misafir 'odanız var mı 14-16 Temmuz' yazdı; asistan PMS'inizi sorgulayıp anında müsaitlik + ödeme linki gönderir.",
        badge: "Ödeme linki entegre",
      },
      web: {
        title: "Web Chat",
        body: "Otel sitenize gömülü asistan. Misafir oda tipi açıklaması istiyor, fotoğrafları gönderir, anında 'şimdi rezerve et' butonuna iter.",
        badge: "Tek satır kod",
      },
      instagram: {
        title: "Instagram DM",
        body: "Manzara fotoğrafına 'fiyatı ne kadar' diyen takipçiyi DM'den anında rezervasyona dönüştürür. Reklam ROI'si direkt çıkar.",
        badge: "Reels'ten satış",
      },
    },
    processSteps: [
      {
        n: "01",
        title: "Otel bilgilerini paylaşın",
        body: "Oda tipleri, sezonsal fiyatlar, dahil hizmetler, transfer kuralları, check-in/out — tek formda.",
        time: "Sizden 20 dk",
      },
      {
        n: "02",
        title: "PMS / kanal yöneticinizle entegrasyon",
        body: "Cloudbeds, Siteminder, RoomCloud veya kendi sisteminize bağlanırız. Müsaitlik gerçek zamanlı senkron.",
        time: "Bizim işimiz",
      },
      {
        n: "03",
        title: "Yayına geçer, direkt rezervasyon başlar",
        body: "Asistan canlı. Her hafta direkt rezervasyon sayısı + OTA'dan kaçırdığınız komisyon raporu gönderilir.",
        time: "Sürekli",
      },
    ],
    faqs: [
      {
        q: "PMS sistemimle çalışır mı? Müsaitlik gerçek zamanlı mı?",
        a: "Cloudbeds, Siteminder, RoomCloud, Eviivo, mews, RMS gibi yaygın PMS'lerle entegre çalışır. Sistem yoksa Google Calendar / Sheets gibi basit yapı da yeter — müsaitlik anlık güncellenir.",
      },
      {
        q: "Asistan hangi dilleri konuşuyor?",
        a: "Türkçe, İngilizce, Arapça, Rusça, Almanca, Fransızca standart. İhtiyaç olursa İspanyolca/İtalyanca açılır. Misafirin kullandığı dile otomatik geçer.",
      },
      {
        q: "Ödemeyi nasıl alıyor? Kredi kartı bilgisi alıyor mu?",
        a: "Asistan kart bilgisi almaz; iyzico, paytr, stripe gibi ödeme sağlayıcılarınız üzerinden tek seferlik güvenli link gönderir. PCI-DSS sorumluluğu sizde kalmaz.",
      },
      {
        q: "İptal / değişiklik taleplerini yönetebiliyor mu?",
        a: "İptal kuralı, son cezasız iptal saati, değişiklik kuralları config'e girilir; asistan kurala göre cevap verir, iptali PMS'e işler.",
      },
      {
        q: "OTA fiyat paritesini bozmadan nasıl direkt satış yaptırıyor?",
        a: "Parite zorunluluğu varsa fiyat eşit kalır; ama asistan transfer, kahvaltı, geç çıkış gibi 'paketleyici' uplift'leri otomatik teklif ederek direkt satışı çekici hale getirir.",
      },
      {
        q: "Sözleşme süresi?",
        a: "Aylık çalışırız, taahhüt yok. İlk 30 günde verim yoksa para iadesi.",
      },
    ],
    formSourceTag: "sector_oteller",
    formCopy: {
      badge: "Otel İçin Demo Talep Et",
      titleStart: "Otelinize özel",
      titleEnd: "AI rezervasyon asistanı dinleyin",
      subtitle:
        "Form doldurun, 24 saat içinde otelinizin dilinde örnek bir asistan çağrısı dinleyelim.",
    },
    metadata: {
      title: "Oteller İçin AI Rezervasyon Asistanı | MakiCalls",
      description:
        "Otelinizin telefonunu 7/24, 4 dilde açan AI asistan. Gece arayan rezervasyonu OTA'ya kaptırmayın, direkt satışla komisyon ödemeyin.",
      keywords: [
        "otel AI asistan",
        "otel rezervasyon AI",
        "otel çağrı merkezi",
        "otel chatbot",
        "Booking komisyon",
        "direkt rezervasyon",
        "otel müşteri hizmetleri otomasyonu",
        "AI resepsiyonist otel",
      ],
    },
  },

  // ---------------------------------------------------------------- HAIR TRANSPLANT
  {
    slug: "sac-ekimi",
    name: "Saç Ekimi Klinikleri",
    shortDesc: "Uluslararası hasta, fotoğraf analizi, ön bilgi otomasyonu",
    iconKey: "Scissors",
    accent: "rose",
    hero: {
      badge: "Saç Ekimi Klinikleri İçin · Çoklu Dil AI Asistan",
      titleStart: "Avrupa'dan gece arayan hastayı",
      titleMid: "uykuda kaybetmeyin",
      titleEnd: ", anında bilgi verin",
      subtitle:
        "Saç ekimi hastası ortalama 4 kliniği aynı anda araştırır. İlk net cevap veren, satışı alır. AI asistan İngilizce + Arapça konuşur, fotoğraftan ön analiz başlatır, paketi açıklar.",
    },
    painsHeading: {
      badge: "Saç ekimi kliniği gerçeği",
      titleStart: "İlk cevap veren",
      titleEnd: "hastayı kapar",
    },
    pains: [
      {
        iconKey: "Globe",
        title: "Avrupa zaman farkı, kayıp lead",
        body: "Almanya'dan saat 23:00'da WhatsApp'tan yazan hastaya sabah dönüş yapıyorsunuz. O sırada Türkiye'deki 3 rakip klinik gece 02:00'da cevaplamış. Hasta artık onların ajandasında.",
        stat: "Saç ekimi liderlerinin %62'si 18:00 sonrası gelir",
      },
      {
        iconKey: "Camera",
        title: "Fotoğraf üzerinden ön bilgi beklentisi",
        body: "Hasta saç çizgisi fotoğrafı atıp 'kaç greft lazım, fiyat ne' diyor. Doktorun bakması gerekiyor, vakit yok. Hasta cevap gelmeyince başka kliniğe yazıyor.",
        stat: "Lead'lerin %58'i 2 saat içinde cevap bekliyor",
      },
      {
        iconKey: "DollarSign",
        title: "Yüksek bilet, hızlı satış kaybı",
        body: "Saç ekimi paketi 3.000–6.000 USD bilet — bir hasta kaybetmek bir aylık personel maaşı kadar zarar. Resepsiyonist 'fiyatı ne kadar' sorusunu yakalayamadığında kayıp gerçek.",
        stat: "Ortalama paket: 4.500 USD",
      },
    ],
    faqs: [
      {
        q: "Asistan hangi dilleri konuşuyor?",
        a: "Türkçe, İngilizce, Arapça, Almanca, Fransızca, İspanyolca standart. Hastanın dilini otomatik algılayıp ona göre geçer.",
      },
      {
        q: "Fotoğraf analizi gerçekten yapabiliyor mu?",
        a: "Asistan ön analiz için yapay zekayla bölge hassasiyeti, yoğunluk tahmini ve donor kapasite tahmini yapar — 'kesin sonuç doktor görüşmesinde' diyerek randevuya çevirir.",
      },
      {
        q: "Mevcut WhatsApp Business numarama eklenir mi?",
        a: "Evet. WhatsApp Business API üzerinden mevcut numaranıza entegre olur, geçmiş konuşmalar bozulmaz.",
      },
      {
        q: "Paket / fiyat bilgisi vermek istemiyorum, nasıl olacak?",
        a: "Asistana 'fiyat aralığı verme, randevuya çevir' kuralı yazılır; hastanın bütçe sorusunu profesyonel şekilde randevuya yönlendirir.",
      },
      {
        q: "Hasta transfer + otel + tedavi paketi soruyor?",
        a: "Paket detaylarınızı asistana tek seferde tanımlarız; transfer dahil mi, otel kaç gece, refakatçi politikası — net cevap verir.",
      },
    ],
    formSourceTag: "sector_sac_ekimi",
    formCopy: {
      badge: "Demo Talep Et",
      titleStart: "Kliniğiniz için",
      titleEnd: "4 dilli AI asistan kurun",
      subtitle:
        "Formu doldurun, kliniğinize özel hazırlanmış örnek bir WhatsApp + çağrı demo'su gönderelim.",
    },
    metadata: {
      title: "Saç Ekimi Klinikleri İçin Çoklu Dil AI Asistan | MakiCalls",
      description:
        "Saç ekimi kliniğinizin Avrupa & Körfez hastalarını gece bile kaybetmeyin. Türkçe + İngilizce + Arapça konuşan AI asistan, fotoğraftan ön analiz başlatır.",
      keywords: [
        "saç ekimi AI asistan",
        "saç ekimi chatbot",
        "hair transplant clinic AI",
        "saç ekimi WhatsApp otomasyon",
        "uluslararası hasta otomasyonu",
      ],
    },
  },

  // ---------------------------------------------------------------- AESTHETIC
  {
    slug: "estetik-klinikleri",
    name: "Estetik Klinikler",
    shortDesc: "Botoks, dolgu, lazer — sezon talep patlamasını yönetin",
    iconKey: "Sparkles",
    accent: "fuchsia",
    hero: {
      badge: "Estetik & Güzellik Klinikleri İçin · AI Resepsiyonist",
      titleStart: "Influencer reklamından sonra",
      titleMid: "tıkanan",
      titleEnd: "telefonu rahatlat",
      subtitle:
        "Yaz sezonu, post sonrası, kampanya günlerinde DM ve telefon bombardımanı oluyor. AI asistan eş zamanlı yüzlerce müşteriye cevap verir, fiyat verir, randevu açar.",
    },
    painsHeading: {
      badge: "Estetik kliniğin sezon derdi",
      titleStart: "Talep patladığında",
      titleEnd: "resepsiyon kilitlenir",
    },
    pains: [
      {
        iconKey: "TrendingDown",
        title: "Sezon başında ani talep patlaması",
        body: "Mayıs-Haziran lazer epilasyon, ekim botoks dönemi açıldığında telefon eş zamanlı çalmaya başlar. 3 hattınız var ama 30 müşteri sırada. İlk 15'ten sonra hepsi başka kliniğe gider.",
        stat: "Sezon başında ortalama 4x arama hacmi",
      },
      {
        iconKey: "MessageSquareWarning",
        title: "'Fiyatınız ne kadar' bombardımanı",
        body: "Aramaların %70'i fiyat sorgusu. Resepsiyonist saatlerce fiyat söylüyor, randevu açmaya vakti kalmıyor. AI asistan paket fiyatlarını standart şekilde sunup ödeme niyetini test eder.",
        stat: "Çağrıların %68-72'si fiyat sorgusu",
      },
      {
        iconKey: "Star",
        title: "Influencer DM patlaması",
        body: "Tanınmış bir hesap kliniğinizi paylaştığında Instagram DM'leriniz binlerce mesajla dolar. Sosyal medya yöneticisi 24 saat içinde yetişemez, lead'ler kararıp gider.",
        stat: "Viral post sonrası ortalama 2,400 DM",
      },
    ],
    faqs: [
      {
        q: "Lazer epilasyon, botoks, dolgu — her hizmetin kuralı farklı, asistan nasıl ayırır?",
        a: "Hizmet bazlı kural seti tanımlanır: hangi yaş aralığı, hangi kontrendikasyon, kaç seans ön bilgi — asistan ona göre konuşur.",
      },
      {
        q: "Doktorun manuel onayı gereken sorularda ne yapıyor?",
        a: "Asistan 'doktorumuz size dönüş yapacak' diyerek not alır, otomatik olarak doktorun WhatsApp'ına iletir; doktor tek dokunuşla cevaplar.",
      },
      {
        q: "Sezon kampanyasını asistana hızlıca yansıtabilir miyim?",
        a: "Kampanya başlatma 2 dakika: indirim oranı, geçerlilik tarihi, dahil hizmetler — asistan o günden itibaren yeni kampanyayı konuşur.",
      },
      {
        q: "Hasta gizlilik açısından AI ile konuşmaktan rahatsız olmaz mı?",
        a: "Asistan başlangıçta 'kliniğin dijital asistanıyım' diyebilir veya gizli kalabilir — sizin tercih ettiğiniz tonda çalışır.",
      },
    ],
    formSourceTag: "sector_estetik",
    formCopy: {
      badge: "Estetik Klinik Demo",
      titleStart: "Kliniğinize özel",
      titleEnd: "AI asistanı dinleyin",
      subtitle:
        "Form doldurun, sezonun yoğun günlerini birlikte planlayalım.",
    },
    metadata: {
      title: "Estetik Klinikleri İçin AI Asistan | MakiCalls",
      description:
        "Estetik kliniğinizin sezon talep patlamasını AI asistanla yönetin. Lazer, botoks, dolgu fiyat sorularını yanıtlar, randevu açar, DM patlamasını çözer.",
      keywords: [
        "estetik klinik AI",
        "botoks chatbot",
        "lazer epilasyon randevu otomasyonu",
        "estetik klinik müşteri hizmetleri",
      ],
    },
  },

  // ---------------------------------------------------------------- MEDICAL TOURISM
  {
    slug: "saglik-turizmi",
    name: "Sağlık Turizmi",
    shortDesc: "Çoklu dil, paket koordinasyonu, transfer + konaklama",
    iconKey: "Plane",
    accent: "cyan",
    hero: {
      badge: "Sağlık Turizmi Acentaları İçin · Çoklu Dil AI",
      titleStart: "Uçak + tedavi + otel",
      titleMid: "tek koordinatör",
      titleEnd: "olarak AI çalışsın",
      subtitle:
        "Sağlık turizminde hasta 6-8 sorudan ibarettir: tedavi paketi, transfer, otel, refakatçi, ödeme, ek tedavi. AI asistan altı dilde, 7/24, tek elden cevaplar.",
    },
    painsHeading: {
      badge: "Sağlık turizmi koordinasyonu",
      titleStart: "Lead toplandı",
      titleEnd: "ama koordinasyon koparıyor",
    },
    pains: [
      {
        iconKey: "Languages",
        title: "6 dilde aynı anda konuşmak",
        body: "Hastanız Almanya'dan Almanca, Suudi Arabistan'dan Arapça, Rusya'dan Rusça yazıyor. Resepsiyonun bunların hepsini konuşan bir kadrosu yok. Çeviri yazılımına bel bağlamak garantili lead kaybı.",
        stat: "Sağlık turizmi lead'lerinin %78'i ana dilinde iletişim istiyor",
      },
      {
        iconKey: "FileWarning",
        title: "Paket detayları sürekli sorgulanıyor",
        body: "'Transfer dahil mi, refakatçim kaç gece kalır, otelden hastaneye ne kadar uzaklıkta' — aynı sorular her hasta için tekrarlanıyor. Operasyon ekibi saatlerce aynı şeyleri yazıyor.",
        stat: "Aynı soruya günde ortalama 32 kez cevap veriliyor",
      },
      {
        iconKey: "MapPin",
        title: "Diaspora ve VKM uyumu kayboluyor",
        body: "Yurtdışından gelen hasta KVKK + ülkesinin tıbbi turizm kurallarını sormak istiyor. Bilgi acentede dağınık, müşteri hizmetleri tutarsız konuşuyor, güven kaybı oluşuyor.",
        stat: "Cevapsız uyum sorusu = lead'in %44 sızması",
      },
    ],
    faqs: [
      {
        q: "Hangi tedavi alanlarını destekliyor?",
        a: "Saç ekimi, estetik cerrahi, diş tedavisi, IVF, ortopedi, bariatrik cerrahi — tedavi paketleri config'e yüklenir, asistan ona göre konuşur.",
      },
      {
        q: "Otel ve transfer entegrasyonu nasıl?",
        a: "Anlaşmalı otel listeniz, transfer firma bilgileri, fiyat aralıkları config'te. Asistan paket bütün olarak sunar, ödeme linkini tek seferde gönderir.",
      },
      {
        q: "Tıbbi soruları yanıtlayabiliyor mu?",
        a: "Genel bilgi (operasyon süresi, iyileşme dönemi) verir; özel tıbbi durum sorularında 'doktor ekibimiz dönüş yapacak' diyerek randevuya çevirir.",
      },
      {
        q: "Asistan hangi sigortalarla / kart ödemeleriyle çalışıyor?",
        a: "iyzico, Stripe, PayPal, banka havalesi destekli. Yurtdışı kart kabul eden tüm sağlayıcılarla entegre ödeme linki gönderir.",
      },
    ],
    formSourceTag: "sector_saglik_turizmi",
    formCopy: {
      badge: "Sağlık Turizmi Demo",
      titleStart: "Acentanıza özel",
      titleEnd: "çoklu dil AI asistan",
      subtitle:
        "Form doldurun, çalıştığınız hedef pazarlarda örnek bir asistan dinleyelim.",
    },
    metadata: {
      title: "Sağlık Turizmi İçin Çoklu Dil AI Asistan | MakiCalls",
      description:
        "Sağlık turizmi acentanız için 6 dilde çalışan AI koordinatör. Paket, transfer, otel sorularını otomatik yanıtlar, lead kaybını sıfırlar.",
      keywords: [
        "sağlık turizmi AI",
        "medical tourism chatbot",
        "hasta koordinasyon otomasyonu",
        "uluslararası hasta WhatsApp",
      ],
    },
  },

  // ---------------------------------------------------------------- CAR RENTAL
  {
    slug: "arac-kiralama",
    name: "Araç Kiralama",
    shortDesc: "Sezonsal rezervasyon, müsaitlik, depozito ve hasarsızlık",
    iconKey: "Car",
    accent: "emerald",
    hero: {
      badge: "Araç Kiralama Şirketleri İçin · 7/24 Rezervasyon AI",
      titleStart: "Havalimanı gecesi arayan müşteriye",
      titleMid: "anında müsaitlik",
      titleEnd: "ve fiyat verin",
      subtitle:
        "Müşteri uçaktan iner, telefonuna sarılır, ofisinizi arar. 30 saniyede cevap gelmezse rakibinizi arar. AI asistan saat fark etmez, müsaitliği sorgular, rezervasyonu açar.",
    },
    painsHeading: {
      badge: "Araç kiralama gerçeği",
      titleStart: "Müsaitlik bilgisi 30 saniyede gelmezse",
      titleEnd: "müşteri rakibe geçer",
    },
    pains: [
      {
        iconKey: "Calendar",
        title: "Sezonsal müsaitlik baskısı",
        body: "Yaz ortası, Kurban Bayramı, Yılbaşı — talep katlanır. Müşteri 'Toyota Corolla 14-18 Temmuz var mı' diye soruyor; resepsiyonist hangi araç müsait şu an bilmiyor, geri arayacağım diyor, geç kalıyor.",
        stat: "Sezonda 'geri arayacağım' = %63 lead kaybı",
      },
      {
        iconKey: "FileWarning",
        title: "Depozito ve hasarsızlık açıklama yorgunluğu",
        body: "Her müşteriye aynı: 'depozito ne kadar, kaza olursa ne olur, ek sürücü ücreti var mı'. Aynı 8 soru günde 40 kez. Operasyon ekibi randevu açmaktan başka iş yapamaz hale geliyor.",
        stat: "Çağrıların %52'si standart sözleşme sorusu",
      },
      {
        iconKey: "MapPin",
        title: "Çoklu lokasyon koordinasyon kabusu",
        body: "Havalimanı bürosu Sabiha Gökçen, IST, ofis Maltepe, depo Kartal. Müşteri 'havalimanından alıp Antalya'da bırakabilir miyim' diyor. Hangi lokasyon ne sunuyor, fiyat farkı ne — kafa karışıyor, satış kaybı oluyor.",
        stat: "Multi-loc kiralama oranı %38, koordinasyon kayıp %20+",
      },
    ],
    faqs: [
      {
        q: "Filo yönetim sistemim varsa entegre olur mu?",
        a: "Rentware, AutoRent, MyRent gibi popüler filo yazılımları ve kendi Excel/Sheets sisteminizle entegre olur. Müsaitlik anlık güncellenir.",
      },
      {
        q: "Asistan ödeme alabilir mi?",
        a: "Direkt kart bilgisi almaz; iyzico, paytr, Stripe linki gönderir. Depozito blokesi yine sizin POS'tan alınır.",
      },
      {
        q: "Sigorta ve sözleşme detaylarını doğru cevaplıyor mu?",
        a: "Sözleşme kuralları config'e yazılır; asistan tam metinleri kullanır, yorum yapmaz. Tıkanırsa 'temsilcimiz arayacak' diyerek randevuya çevirir.",
      },
      {
        q: "Yabancı müşteriler için dil desteği?",
        a: "Standart İngilizce, Arapça, Rusça, Almanca. Turist sezonunda anlamlı ROI sağlar.",
      },
    ],
    formSourceTag: "sector_arac_kiralama",
    formCopy: {
      badge: "Filo İçin Demo",
      titleStart: "Filonuza özel",
      titleEnd: "rezervasyon asistanı kurun",
      subtitle:
        "Form doldurun, filonuzun büyüklüğüne göre özel çözümle dönüş yapalım.",
    },
    metadata: {
      title: "Araç Kiralama İçin AI Rezervasyon Asistanı | MakiCalls",
      description:
        "Araç kiralama şirketinizin 7/24 müsaitlik sorgulayan, rezervasyon açan AI asistanı. Sezon yoğunluğunu, depozito sorularını otomatikleştirin.",
      keywords: [
        "araç kiralama AI",
        "rent a car chatbot",
        "araç rezervasyon otomasyonu",
        "havalimanı araç kiralama AI",
      ],
    },
  },

  // ---------------------------------------------------------------- E-COMMERCE
  {
    slug: "e-ticaret",
    name: "E-ticaret",
    shortDesc: "Sipariş takibi, iade, ürün soruları — kampanya tıkanmaları",
    iconKey: "ShoppingBag",
    accent: "indigo",
    hero: {
      badge: "E-ticaret Markaları İçin · Çok Kanallı Müşteri AI",
      titleStart: "Black Friday'de patlamak",
      titleMid: "müşteri hizmetlerinizi değil",
      titleEnd: ", satışı tetiklesin",
      subtitle:
        "Aramaların ve DM'lerin %80'i 'kargom nerede' ve 'iade nasıl'. AI asistan kargo durumunu API'den çeker, iade akışını başlatır, ürün sorusunu yanıtlar — müşteri temsilciniz sadece gerçek vakaya odaklanır.",
    },
    painsHeading: {
      badge: "E-ticaret derdi",
      titleStart: "Kampanya geldiğinde",
      titleEnd: "ekip bayılır, satış kaçar",
    },
    pains: [
      {
        iconKey: "Truck",
        title: "'Kargom nerede' bombardımanı",
        body: "Müşterilerin %52'si kargo durum sorusu için arıyor/yazıyor. Müşteri temsilcisi her seferinde kargo sitesine girip durumu kopyalıyor. Saatlerce robotik iş, satış desteğine vakit yok.",
        stat: "Çağrıların %47-55'i kargo takibi",
      },
      {
        iconKey: "TrendingDown",
        title: "Kampanya günü ekip yetişemiyor",
        body: "BF, Ramazan, 11.11 — talep 5-10x artar. Müşteri hizmetleri 3 kat genişleseniz bile yetişemez. Bekleyen müşteri sepeti terk eder, geri dönüş %3'ün altına düşer.",
        stat: "Yavaş cevap = sepet terki +%41",
      },
      {
        iconKey: "AlertTriangle",
        title: "İade akışı manuel ve uzun",
        body: "Müşteri 'iade edeceğim' diyor; temsilci kargo etiketi gönderiyor, iade kodunu açıyor, hesabı güncelliyor. 12 dakikalık manuel iş. AI asistan tüm akışı 90 saniyede tamamlar.",
        stat: "Manuel iade ortalaması: 12 dk, AI ile: 90 sn",
      },
    ],
    faqs: [
      {
        q: "Shopify / Ideasoft / Ticimax ile entegre olur mu?",
        a: "Yaygın e-ticaret altyapılarıyla (Shopify, Ideasoft, Ticimax, T-Soft, kendi API'niz) sipariş, ürün, müşteri verilerini senkronize eder.",
      },
      {
        q: "Kargo entegrasyonu hangi firmalarla çalışıyor?",
        a: "Yurtiçi, Aras, MNG, PTT, Sürat, UPS, FedEx — gönderi takibi otomatik yapılır; müşteriye link yerine durum mesajı gider.",
      },
      {
        q: "Çok dilli mağaza için?",
        a: "Mağazanız hangi dillerde satıyorsa o dillerde asistan kurulur. Müşterinin dilini otomatik tespit eder.",
      },
      {
        q: "Müşteri temsilcisinin işine son mu veriyor?",
        a: "Hayır — robotik soruları çözüp ekibi gerçek değer üreten taleplere yönlendirir. Genelde temsilcilerin verimliliği 3-4x artar.",
      },
    ],
    formSourceTag: "sector_eticaret",
    formCopy: {
      badge: "E-ticaret Demo",
      titleStart: "Markanıza özel",
      titleEnd: "müşteri AI'si kurun",
      subtitle:
        "Form doldurun, mağazanızın altyapısına göre demo planlayalım.",
    },
    metadata: {
      title: "E-ticaret İçin AI Müşteri Hizmetleri | MakiCalls",
      description:
        "E-ticaret markanız için 'kargom nerede' ve 'iade nasıl' sorularını otomatikleştiren AI asistan. Kampanya günlerinde tıkanmadan satış yapın.",
      keywords: [
        "e-ticaret AI chatbot",
        "shopify chatbot",
        "kargo takibi otomasyon",
        "iade otomasyonu",
        "müşteri hizmetleri AI",
      ],
    },
  },

  // ---------------------------------------------------------------- REAL ESTATE
  {
    slug: "gayrimenkul",
    name: "Gayrimenkul",
    shortDesc: "İlan sorgusu, gezme randevusu, lead kalifikasyonu",
    iconKey: "Building2",
    accent: "orange",
    hero: {
      badge: "Gayrimenkul Ofisleri İçin · 7/24 Lead AI",
      titleStart: "Hafta sonu 02:00'da",
      titleMid: "ilanınızı arayan",
      titleEnd: "alıcıyı kaybetmeyin",
      subtitle:
        "Gayrimenkul lead'inin yarısı mesai dışı geliyor. 'Hala satılık mı, kaç odalı, kredi çıkar mı' — AI asistan ilan veritabanından cevap verir, alıcıyı kalifiye eder, gezme randevusu açar.",
    },
    painsHeading: {
      badge: "Gayrimenkul ofis gerçeği",
      titleStart: "Lead'in yarısı",
      titleEnd: "yanlış kişiye gidiyor",
    },
    pains: [
      {
        iconKey: "PhoneOff",
        title: "'Hala satılık mı' tekrar sorusu",
        body: "Aynı ilana 30 kez 'hala satılık mı' yazılıyor. Danışman her seferinde manuel cevap veriyor. AI asistan ilan durumunu canlı senkron tutar, anında cevap verir.",
        stat: "İlan başına ortalama 24 tekrar soru",
      },
      {
        iconKey: "Calendar",
        title: "Hafta sonu gezme randevusu kaosu",
        body: "Cumartesi sabah 5 alıcı aynı saatte gezme istiyor. Danışman aynı anda 3 yerde olamaz. Asistan boş saatleri bilir, gezme rotasını otomatik planlar.",
        stat: "Cumartesi randevu çakışması %38",
      },
      {
        iconKey: "TrendingDown",
        title: "Kalifiye olmayan lead'le zaman kaybı",
        body: "Danışman bir alıcıyla 45 dk konuşuyor; sonunda 'kredi çıkmadı' diye iş düşüyor. AI asistan ön kalifikasyonu (bütçe, kredi durumu, peşinat) en başta yapar, sadece gerçek alıcıyı danışmana iletir.",
        stat: "Lead'lerin %71'i kalifiye değil",
      },
    ],
    faqs: [
      {
        q: "İlan veritabanımla nasıl bağlanır?",
        a: "sahibinden API, hepsiemlak XML feed, kendi CRM'iniz (REM, Endeksa Pro, ne olursa) ile entegre eder. İlan durumu, fiyat değişiklikleri anlık güncel.",
      },
      {
        q: "Asistan lead kalifikasyonunu nasıl yapıyor?",
        a: "Sizin tanımladığınız sorularla yapar: bütçe aralığı, peşinat durumu, kredi geçmişi, taşınma zamanı. Kuralları siz çiziyorsunuz.",
      },
      {
        q: "Danışmanlar arasında nasıl dağıtılıyor?",
        a: "Bölge bazlı, uzmanlık bazlı veya rotasyonla danışmana atar. Müsaitlik takip eder, yoğun danışmanı atlayabilir.",
      },
      {
        q: "WhatsApp Business numarama eklenir mi?",
        a: "Mevcut Business numaranıza entegre olur; danışmanlarınızın elinden çıkmadan müşteriyle konuşur, gerektiğinde devri otomatik yapar.",
      },
    ],
    formSourceTag: "sector_gayrimenkul",
    formCopy: {
      badge: "Gayrimenkul Demo",
      titleStart: "Ofisinize özel",
      titleEnd: "lead asistanı kurun",
      subtitle:
        "Form doldurun, portföyünüze göre özel asistan demo'su gönderelim.",
    },
    metadata: {
      title: "Gayrimenkul Ofisleri İçin AI Lead Asistanı | MakiCalls",
      description:
        "Gayrimenkul ofisinizin lead'lerini kalifiye eden, gezme randevusu açan AI asistan. 'Hala satılık mı' tekrar sorularını otomatikleştirin.",
      keywords: [
        "gayrimenkul AI",
        "emlak chatbot",
        "ilan otomasyonu",
        "lead kalifikasyon AI",
        "gayrimenkul WhatsApp asistan",
      ],
    },
  },
];

export const SECTORS_BY_SLUG: Record<string, SectorConfig> = Object.fromEntries(
  SECTORS.map((s) => [s.slug, s]),
);

export function getSectorHref(s: SectorConfig): string {
  return s.legacyHref ?? `/sektorler/${s.slug}`;
}
