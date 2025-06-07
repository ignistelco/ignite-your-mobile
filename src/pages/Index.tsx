
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LifestyleCuration from "@/components/LifestyleCuration";
import CarrierDifferentiation from "@/components/CarrierDifferentiation";
import PulseOSSection from "@/components/PulseOSSection";
import DeviceCards from "@/components/DeviceCards";
import PlansSection from "@/components/PlansSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <LifestyleCuration />
      <CarrierDifferentiation />
      <DeviceCards />
      <PulseOSSection />
      <PlansSection />
      <Footer />
    </div>
  );
};

export default Index;
