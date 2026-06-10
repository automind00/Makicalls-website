import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import TrustStrip from "@/components/sections/trust-strip";
import Integrations from "@/components/sections/integrations";
import Omnichannel from "@/components/sections/omnichannel";
import Comparison from "@/components/sections/comparison";
import Services from "@/components/sections/services";
import Process from "@/components/sections/process";
import DashboardMockup from "@/components/sections/dashboard-mockup";
import GoogleReviews from "@/components/sections/google-reviews";
import Faq from "@/components/sections/faq";
import CtaBanner from "@/components/sections/cta-banner";
import Booking from "@/components/sections/booking";
import Footer from "@/components/sections/footer";
import JsonLd from "@/components/seo/json-ld";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Integrations />
        <Omnichannel />
        <Comparison />
        <Services />
        <Process />
        <DashboardMockup />
        <GoogleReviews />
        <CtaBanner />
        {/* "İletişim" navbar linki Booking bölümüne anchor olarak inisin */}
        <span id="iletisim" aria-hidden="true" />
        <Booking />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
