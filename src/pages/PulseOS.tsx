
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Cpu, Shield, Zap } from "lucide-react";

const PulseOS = () => {
  const features = [
    {
      icon: Cpu,
      title: "Advanced AI Integration",
      description: "Built-in AI assistant that learns your preferences and optimizes your experience"
    },
    {
      icon: Shield,
      title: "Privacy-First Design",
      description: "Your data stays yours with end-to-end encryption and transparent privacy controls"
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Optimized for speed with intelligent resource management and battery optimization"
    },
    {
      icon: Smartphone,
      title: "Seamless Integration",
      description: "Works perfectly with Ignis Mobile network for the ultimate connected experience"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-ignis-gradient text-white text-lg px-4 py-2">
              Coming Soon
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6">
              <span className="font-bold">PulseOS</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light mb-8">
              The future of mobile operating systems. Built for privacy, powered by AI, optimized for life.
            </p>
            <Button size="lg" className="bg-ignis-gradient hover:opacity-90 text-white font-light px-8">
              Join Waitlist
            </Button>
          </div>

          {/* Hero Image/Video Section */}
          <div className="mb-20">
            <div className="relative bg-gradient-to-br from-ignis-purple/10 to-ignis-teal/10 rounded-3xl h-96 flex items-center justify-center">
              <div className="text-center">
                <Smartphone className="h-24 w-24 text-ignis-purple mx-auto mb-4" />
                <p className="text-lg text-gray-600 font-light">Experience Preview Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                <span className="font-bold">Revolutionary</span> <span className="font-normal">Features</span>
              </h2>
              <p className="text-lg text-gray-600 font-light">
                PulseOS redefines what a mobile operating system can be
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto mb-6 w-16 h-16 bg-ignis-gradient rounded-full flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-normal text-lg text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-light text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-ignis-purple/5 to-ignis-teal/5">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                <span className="font-bold">Be Among</span> <span className="font-normal">the First</span>
              </h2>
              <p className="text-lg text-gray-600 font-light mb-8 max-w-2xl mx-auto">
                Join our exclusive waitlist to get early access to PulseOS devices and be part of the mobile revolution.
              </p>
              <Button size="lg" className="bg-ignis-gradient hover:opacity-90 text-white font-light px-8">
                Reserve Your Spot
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PulseOS;
