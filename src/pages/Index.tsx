
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LifestyleSegments from "@/components/LifestyleSegments";
import PlansSection from "@/components/PlansSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <LifestyleSegments />
      <PlansSection />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default Index;
