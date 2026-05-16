import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import TrustStrip from "@/components/sections/trust-strip";
import DashboardMockup from "@/components/sections/dashboard-mockup";
import Sectors from "@/components/sections/sectors";
import Integrations from "@/components/sections/integrations";
import Services from "@/components/sections/services";
import Process from "@/components/sections/process";
import CtaBanner from "@/components/sections/cta-banner";
import ContactForm from "@/components/sections/contact-form";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <DashboardMockup />
        <Sectors />
        <Integrations />
        <Services />
        <Process />
        <CtaBanner />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
