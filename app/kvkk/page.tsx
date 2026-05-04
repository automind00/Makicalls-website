import type { Metadata } from "next";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "MakiCalls — 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.",
};

export default function KvkkPage() {
  return (
    <>
      <Navbar />
      <LegalLayout title="KVKK Aydınlatma Metni" updatedAt="2 Mayıs 2026">
        <p>
          İşbu aydınlatma metni, <strong>6698 sayılı Kişisel Verilerin Korunması Kanunu</strong>{" "}
          (&quot;KVKK&quot;) kapsamında, MakiCalls (&quot;Şirket&quot;, &quot;Biz&quot;) tarafından
          toplanan kişisel verilerinizin işlenme süreçleri hakkında bilgilendirme amacıyla
          hazırlanmıştır.
        </p>

        <h2>1. Veri Sorumlusunun Kimliği</h2>
        <p>
          KVKK uyarınca veri sorumlusu sıfatıyla <strong>MakiCalls</strong> hareket etmektedir.
          İletişim bilgileri ve resmi yazışma adresi yakında bu sayfada güncellenecektir.
        </p>

        <h2>2. İşlenen Kişisel Veriler</h2>
        <p>
          Web sitemizin iletişim formu ve hizmetlerimiz aracılığıyla aşağıdaki kişisel veriler
          işlenmektedir:
        </p>
        <ul>
          <li>
            <strong>Kimlik bilgileri:</strong> Ad, soyad
          </li>
          <li>
            <strong>İletişim bilgileri:</strong> E-posta adresi, telefon numarası, işletme adı
          </li>
          <li>
            <strong>Müşteri işlem bilgileri:</strong> Talep ettiğiniz hizmet, mesaj içeriği,
            iletişim geçmişi
          </li>
          <li>
            <strong>Teknik bilgiler:</strong> IP adresi, tarayıcı bilgisi, ziyaret zamanı, çerez
            verileri
          </li>
        </ul>

        <h2>3. Kişisel Verilerin İşlenme Amaçları</h2>
        <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
        <ul>
          <li>İletişim taleplerinize yanıt vermek ve teklif sunmak</li>
          <li>Hizmet süreçlerini yürütmek ve sözleşme yükümlülüklerini yerine getirmek</li>
          <li>Müşteri memnuniyetini ve hizmet kalitesini ölçmek</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          <li>Web sitesi performansının ve güvenliğinin sağlanması</li>
        </ul>

        <h2>4. Kişisel Verilerin İşlenmesinin Hukuki Sebepleri</h2>
        <p>
          Kişisel verileriniz, KVKK&apos;nın 5. maddesinde belirtilen aşağıdaki hukuki sebeplerle
          işlenmektedir:
        </p>
        <ul>
          <li>Açık rızanızın bulunması</li>
          <li>Sözleşmenin kurulması veya ifası için gerekli olması</li>
          <li>Hukuki yükümlülüğün yerine getirilmesi</li>
          <li>Meşru menfaatlerin korunması</li>
        </ul>

        <h2>5. Kişisel Verilerin Aktarılması</h2>
        <p>
          Kişisel verileriniz, açık rızanız olmadan üçüncü kişilerle paylaşılmamaktadır. Yasal
          zorunluluklar veya hizmet sürecinin gerektirdiği durumlarda, KVKK&apos;nın 8. ve 9.
          maddelerinde belirtilen şartlara uygun olarak yetkili kamu kurumlarıyla, iş ortaklarımızla
          ve hizmet aldığımız tedarikçilerle paylaşılabilir.
        </p>

        <h2>6. Veri Sahibinin Hakları</h2>
        <p>
          KVKK&apos;nın 11. maddesi uyarınca veri sahipleri olarak aşağıdaki haklara sahipsiniz:
        </p>
        <ul>
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme</li>
          <li>İşlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
          <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
          <li>KVKK&apos;da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
          <li>Yapılan işlemlerin üçüncü kişilere bildirilmesini isteme</li>
          <li>İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç doğmasına itiraz etme</li>
          <li>Hukuka aykırı işleme nedeniyle zarara uğramanız hâlinde tazminat talep etme</li>
        </ul>

        <h2>7. Başvuru Yöntemi</h2>
        <p>
          Yukarıda belirtilen haklarınızı kullanmak için talebinizi, kimliğinizi tevsik edici
          belgeler ve hak konunuzu içeren açıklamayla birlikte tarafımıza iletebilirsiniz. İletişim
          kanallarımız yakında aktif olacaktır; bu süre zarfında talepleriniz için ana sayfamızdaki
          formu kullanabilirsiniz.
        </p>

        <h2>8. Çerez Politikası</h2>
        <p>
          Web sitemiz, ziyaret deneyiminizi iyileştirmek amacıyla teknik nitelikli çerezler
          kullanmaktadır. Pazarlama ve analitik çerezler kullanılması durumunda ayrıca rıza
          alınacaktır.
        </p>

        <h2>9. Değişiklikler</h2>
        <p>
          MakiCalls, işbu aydınlatma metnini gerektiğinde güncelleme hakkını saklı tutar.
          Güncellemeler bu sayfada yayınlandığı tarihte yürürlüğe girer.
        </p>
      </LegalLayout>
      <Footer />
    </>
  );
}
