import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import TrustStrip from "@/components/sections/trust-strip";
import Integrations from "@/components/sections/integrations";
import Services from "@/components/sections/services";
import Process from "@/components/sections/process";
import DashboardPreview from "@/components/sections/dashboard-preview";
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
        <Integrations />
        <Services />
        <Process />
        <DashboardPreview />
        <CtaBanner />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
