import type { Metadata } from "next";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "MakiCalls — kişisel verilerin korunması, çerez kullanımı ve gizlilik uygulamaları hakkında bilgilendirme.",
};

export default function GizlilikPage() {
  return (
    <>
      <Navbar />
      <LegalLayout title="Gizlilik Politikası" updatedAt="2 Mayıs 2026">
        <p>
          MakiCalls (&quot;Şirket&quot;, &quot;Biz&quot;) olarak ziyaretçilerimizin ve müşterilerimizin
          gizliliğine önem veriyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde
          veya hizmetlerimizden yararlandığınızda toplanan, kullanılan ve korunan bilgileri
          açıklamaktadır.
        </p>

        <h2>1. Topladığımız Bilgiler</h2>
        <p>Aşağıdaki kategorilerde bilgi toplayabiliriz:</p>
        <ul>
          <li>
            <strong>Tarafınızca verilen bilgiler:</strong> İletişim formunda paylaştığınız ad,
            e-posta, telefon, işletme adı ve mesaj içeriği
          </li>
          <li>
            <strong>Otomatik olarak toplanan bilgiler:</strong> IP adresi, tarayıcı türü, işletim
            sistemi, ziyaret edilen sayfalar, ziyaret zamanı
          </li>
          <li>
            <strong>Çerezler:</strong> Web sitesinin doğru çalışması için zorunlu olan çerezler
          </li>
        </ul>

        <h2>2. Bilgilerin Kullanım Amacı</h2>
        <p>Toplanan bilgiler aşağıdaki amaçlar için kullanılır:</p>
        <ul>
          <li>Talep ve sorularınıza yanıt vermek</li>
          <li>Size özel teklif ve hizmet sunmak</li>
          <li>Hizmet kalitesini iyileştirmek ve site deneyimini geliştirmek</li>
          <li>Yasal yükümlülükleri yerine getirmek</li>
          <li>Site güvenliğini ve dolandırıcılığı önlemek</li>
        </ul>

        <h2>3. Bilgilerin Paylaşımı</h2>
        <p>
          Kişisel verileriniz, açık rızanız olmadan üçüncü kişilere satılmaz, kiralanmaz veya
          paylaşılmaz. İstisna durumlarda paylaşım şu şekilde olabilir:
        </p>
        <ul>
          <li>Yasal zorunluluklar veya yetkili kamu kurumlarının talebi</li>
          <li>Hizmet sağlayıcılarımız (hosting, e-posta, analitik) — yalnızca hizmet sürecinin gerektirdiği ölçüde</li>
          <li>Şirket birleşmesi, devri veya satışı durumlarında halefimiz</li>
        </ul>

        <h2>4. Çerezler ve Takip Teknolojileri</h2>
        <p>
          Sitemiz, kullanıcı deneyimini iyileştirmek için <strong>zorunlu çerezler</strong>{" "}
          kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri reddedebilir veya silebilirsiniz; ancak
          bu durum sitenin bazı özelliklerinin çalışmamasına neden olabilir.
        </p>
        <p>
          Pazarlama veya analitik amaçlı üçüncü taraf çerezler eklendiğinde, bu durum politika
          metninde güncellenecek ve gerektiğinde rıza alınacaktır.
        </p>

        <h2>5. Veri Güvenliği</h2>
        <p>
          Kişisel verilerinizin yetkisiz erişim, kayıp ve değişiklikten korunması için makul
          teknik ve idari tedbirleri uygulamaktayız: HTTPS şifreleme, erişim kontrolü, düzenli
          güvenlik denetimleri ve güncel altyapı. Hiçbir güvenlik önleminin %100 koruma sağlamadığı
          unutulmamalıdır.
        </p>

        <h2>6. Veri Saklama Süresi</h2>
        <p>
          Kişisel verileriniz, işlenme amacının gerektirdiği süre kadar veya yasal saklama
          sürelerine uygun olarak saklanır. Süre sonunda veriler güvenli şekilde silinir veya
          anonimleştirilir.
        </p>

        <h2>7. Kullanıcı Hakları</h2>
        <p>
          KVKK kapsamındaki haklarınızın tamamı için{" "}
          <a href="/kvkk">KVKK Aydınlatma Metni</a> sayfasını inceleyebilirsiniz. Bu kapsamda;
          verilerinize erişme, düzeltme, silinme talep etme ve aktarımına itiraz etme haklarına
          sahipsiniz.
        </p>

        <h2>8. Üçüncü Taraf Bağlantılar</h2>
        <p>
          Sitemiz, kontrolümüz dışındaki üçüncü taraf sitelere bağlantılar içerebilir. Bu sitelerin
          gizlilik uygulamalarından sorumlu değiliz; ziyaret etmeden önce ilgili sitenin gizlilik
          politikasını incelemenizi öneririz.
        </p>

        <h2>9. Çocukların Gizliliği</h2>
        <p>
          Hizmetlerimiz 18 yaş altı kullanıcılara yönelik değildir. 18 yaşın altındaki bireylerden
          bilerek kişisel veri toplamıyoruz.
        </p>

        <h2>10. Politika Değişiklikleri</h2>
        <p>
          Bu Gizlilik Politikası gerektiğinde güncellenebilir. Güncelleme tarihi sayfa başında
          belirtilir. Önemli değişiklikler durumunda kullanıcılara bildirimde bulunulur.
        </p>

        <h2>11. İletişim</h2>
        <p>
          Bu politika veya kişisel verilerinizle ilgili sorularınız için ana sayfamızdaki iletişim
          formunu kullanabilirsiniz. Resmi iletişim kanallarımız yakında aktif olacaktır.
        </p>
      </LegalLayout>
      <Footer />
    </>
  );
}
