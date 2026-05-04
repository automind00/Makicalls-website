import type { Metadata } from "next";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description:
    "MakiCalls — web sitesi ve hizmetlerinin kullanım koşulları, hak ve yükümlülükler.",
};

export default function SartlarPage() {
  return (
    <>
      <Navbar />
      <LegalLayout title="Kullanım Şartları" updatedAt="2 Mayıs 2026">
        <p>
          MakiCalls (&quot;Şirket&quot;, &quot;Biz&quot;) web sitesini ve hizmetlerini kullanarak,
          aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız. Lütfen siteyi kullanmadan önce bu
          metni dikkatlice okuyunuz.
        </p>

        <h2>1. Tanımlar</h2>
        <ul>
          <li>
            <strong>Site:</strong> makicalls.com adresinde yayınlanan web sitesi
          </li>
          <li>
            <strong>Hizmet:</strong> Şirket tarafından sunulan WhatsApp & Instagram chatbot, sesli
            asistan, otomasyon ve danışmanlık çözümleri
          </li>
          <li>
            <strong>Kullanıcı:</strong> Siteyi ziyaret eden veya hizmetlerden yararlanan gerçek/tüzel
            kişi
          </li>
        </ul>

        <h2>2. Kabul ve Değişiklik</h2>
        <p>
          Siteyi kullanmaya başladığınız andan itibaren bu kullanım şartlarını kabul etmiş
          sayılırsınız. Şirket, şartları herhangi bir zamanda güncelleme hakkını saklı tutar.
          Güncellenen şartlar bu sayfada yayınlandığı tarihte yürürlüğe girer.
        </p>

        <h2>3. Hizmetlerin Kapsamı</h2>
        <p>
          Sitede sunulan bilgiler ve hizmet tanımları genel bilgilendirme amaçlıdır ve sözleşmesel
          bir teklif niteliği taşımaz. Hizmet ilişkisi, taraflar arasında imzalanan ayrı bir
          sözleşmeyle kurulur.
        </p>
        <p>
          Şirket, hizmet kapsamı, içeriği ve fiyatlandırmasında değişiklik yapma hakkını saklı
          tutar. Bu değişiklikler, mevcut müşterilerle yapılmış sözleşmeleri etkilemez.
        </p>

        <h2>4. Kullanıcı Yükümlülükleri</h2>
        <p>Kullanıcı, siteyi kullanırken aşağıdaki kurallara uymayı taahhüt eder:</p>
        <ul>
          <li>Yürürlükteki mevzuata, ahlaka ve adaba uygun davranmak</li>
          <li>Üçüncü kişilerin haklarını ihlal etmemek</li>
          <li>Sitenin güvenliğini tehdit edecek eylemlerden kaçınmak (zararlı yazılım, otomatik bot, izinsiz veri çekme vb.)</li>
          <li>İletişim formunda doğru ve güncel bilgi vermek</li>
          <li>Site içeriğini izinsiz kopyalamamak, dağıtmamak veya ticari amaçla kullanmamak</li>
        </ul>

        <h2>5. Fikri Mülkiyet Hakları</h2>
        <p>
          Sitedeki tüm içerikler (metin, görsel, logo, kod, tasarım) MakiCalls&apos;a veya lisans
          verenlerine aittir ve <strong>5846 sayılı Fikir ve Sanat Eserleri Kanunu</strong>{" "}
          kapsamında korunmaktadır. İzinsiz kullanım, çoğaltım veya dağıtım yasaktır.
        </p>

        <h2>6. Hizmet Sürekliliği</h2>
        <p>
          Şirket, sitenin kesintisiz ve hatasız çalışacağını taahhüt etmez. Bakım, güncelleme veya
          teknik sorunlar nedeniyle erişim geçici olarak kesintiye uğrayabilir. Bu tür kesintilerden
          kaynaklanan zararlardan Şirket sorumlu tutulamaz.
        </p>

        <h2>7. Sorumluluk Sınırlaması</h2>
        <p>
          Site ve hizmetler &quot;olduğu gibi&quot; sunulmaktadır. Şirket, sitenin kullanımından
          doğabilecek doğrudan veya dolaylı zararlardan, üçüncü taraf hizmetlerden kaynaklanan
          sorunlardan ve kullanıcının hatalı kullanımından sorumlu tutulamaz.
        </p>
        <p>
          Yasal mevzuatın izin verdiği azami sınırlar içinde, Şirket&apos;in toplam sorumluluğu
          kullanıcının ilgili hizmet için ödediği tutarla sınırlıdır.
        </p>

        <h2>8. Üçüncü Taraf Hizmetler</h2>
        <p>
          Site, üçüncü taraf hizmetlerine (örneğin sosyal medya bağlantıları, analitik araçlar,
          ödeme sağlayıcıları) bağlantılar içerebilir. Bu hizmetlerin kullanım şartları ve gizlilik
          uygulamaları ilgili sağlayıcının sorumluluğundadır.
        </p>

        <h2>9. Kişisel Verilerin Korunması</h2>
        <p>
          Kişisel verilerinizin işlenmesi hakkında detaylı bilgi için{" "}
          <a href="/kvkk">KVKK Aydınlatma Metni</a> ve{" "}
          <a href="/gizlilik">Gizlilik Politikası</a> sayfalarını inceleyiniz.
        </p>

        <h2>10. Sona Erme</h2>
        <p>
          Şirket, bu şartlara aykırı davrandığını tespit ettiği kullanıcıların site erişimini
          önceden bildirim yapmaksızın kısıtlama veya sonlandırma hakkını saklı tutar.
        </p>

        <h2>11. Uyuşmazlıkların Çözümü</h2>
        <p>
          İşbu kullanım şartlarından doğabilecek uyuşmazlıklarda <strong>Türkiye Cumhuriyeti
          kanunları</strong> uygulanacak olup, <strong>İstanbul Mahkemeleri ve İcra
          Daireleri</strong> yetkilidir.
        </p>

        <h2>12. İletişim</h2>
        <p>
          Bu kullanım şartlarıyla ilgili sorularınız için ana sayfamızdaki iletişim formunu
          kullanabilirsiniz. Resmi iletişim kanallarımız yakında aktif olacaktır.
        </p>
      </LegalLayout>
      <Footer />
    </>
  );
}
