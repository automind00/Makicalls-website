export type QA = { q: string; a: string };

export const faqItems: QA[] = [
  {
    q: "AI çağrı merkezi tam olarak nedir?",
    a: "Telefonu gerçek bir resepsiyonist gibi açıp Türkçe konuşan, randevu açan, soru cevaplayan ve gerektiğinde size bağlayan yapay zeka asistanı. Mesai dışı saatlerde de çalışır, hiç hasta düşürmez.",
  },
  {
    q: "Kurulum nasıl ilerliyor? Altyapı gerekir mi?",
    a: "Tek ihtiyacımız bir telefon numarası ve hizmet listeniz; kurulum, eğitim ve entegrasyonu biz hallederiz. Ekstra donanım, kurulum bilgisayarı veya IT projesi yok. Süreç ve takvim ön görüşmede netleşir.",
  },
  {
    q: "Fiyatlandırma nasıl çalışıyor?",
    a: "Chatbot Paketi $199/ay, Chatbot + Sesli Asistan $599/ay — ikisi de sabit fiyat, kurulum ücreti yok. Sesli Asistan paketi ayda 3.000 dakika görüşme içerir, aşımı dakika başı $0.30. Çoklu şube veya özel entegrasyon gerekiyorsa Özel Çözümler paketiyle ihtiyacınıza göre teklif çıkarıyoruz.",
  },
  {
    q: "KVKK ve hasta verisi güvenliği nasıl yönetiliyor?",
    a: "Tüm görüşmeler şifreli kanaldan akar, ses kayıtları AB veri merkezlerinde tutulur, hasta verisi 3. taraf reklamcılığa kullanılmaz. KVKK aydınlatma metni size özel hazırlanır.",
  },
  {
    q: "Yanlış cevap verirse ne olur?",
    a: "Her aramada transkript + güven skoru üretilir; düşük güvenli yanıtlar size gerçek-zamanlı uyarı düşer. İlk hafta her aramayı sizinle birlikte gözden geçirir, asistanı sizin tonunuza ayarlarız.",
  },
  {
    q: "Google yorum sistemi nasıl çalışıyor?",
    a: "Tedaviden bir gün sonra hastaya otomatik takip mesajı gider. Hasta memnuniyetini belirtirse AI tek tıklık Google yorum linkini gönderir; memnun değilse problemini öğrenip kliniğe özel iletir. Böylece olumlu yorumlar Google'a çıkar, olumsuz deneyimler herkesin önünde değil sizin elinizde çözülür — akıllı kötü yorum filtresi gibi.",
  },
  {
    q: "Hangi entegrasyonlarla çalışır?",
    a: "WhatsApp Business API, Instagram DM, Google Calendar, NetGSM, Stripe, Calendly ve Supabase tabanlı CRM. Mevcut sisteminiz farklıysa n8n üzerinden bağlarız.",
  },
  {
    q: "İptal etmek istersem ne olur?",
    a: "Uzun süreli sözleşmeye kilitlenmiyorsunuz. Ay sonu fesih hakkı her zaman sizde, ceza yok. Tüm arama kayıtları, transkriptler ve CRM verileriniz talep ettiğinizde size teslim edilir.",
  },
];
