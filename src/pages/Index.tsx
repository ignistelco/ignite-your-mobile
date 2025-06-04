
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BentoLifestyleGrid from "@/components/BentoLifestyleGrid";
import PlansSection from "@/components/PlansSection";
import DeviceCards from "@/components/DeviceCards";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <BentoLifestyleGrid />
      <DeviceCards />
      <PlansSection />
      <Footer />
    </div>
  );
};

export default Index;
