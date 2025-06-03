
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BentoLifestyleGrid from "@/components/BentoLifestyleGrid";
import PlansSection from "@/components/PlansSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <BentoLifestyleGrid />
      <PlansSection />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default Index;
