
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PlansSection from "@/components/PlansSection";
import DeviceCards from "@/components/DeviceCards";
import PulseOSSection from "@/components/PulseOSSection";
import CarrierDifferentiation from "@/components/CarrierDifferentiation";
import CommunitySection from "@/components/CommunitySection";
import LifestyleCuration from "@/components/LifestyleCuration";
import LifestyleSegments from "@/components/LifestyleSegments";
import BentoLifestyleGrid from "@/components/BentoLifestyleGrid";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";
import InteractiveBackground from "@/components/InteractiveBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <InteractiveBackground />
      <Header />
      
      <main className="relative z-10">
        <Hero />
        <PlansSection />
        <DeviceCards />
        <PulseOSSection />
        <CarrierDifferentiation />
        <CommunitySection />
        <LifestyleCuration />
        <LifestyleSegments />
        <BentoLifestyleGrid />
        <NewsletterSignup />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
