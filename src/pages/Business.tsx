
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Phone, Wifi, Smartphone } from "lucide-react";

const Business = () => {
  const businessSolutions = [
    {
      icon: Phone,
      title: "Business Voice",
      description: "Professional communication solutions",
      features: [
        "Unlimited business calling",
        "Conference calling up to 50 participants",
        "Voicemail to email transcription",
        "Auto-attendant system",
        "Call forwarding & routing"
      ],
      price: "$45",
      popular: false
    },
    {
      icon: Wifi,
      title: "Business Data",
      description: "High-speed connectivity for your team",
      features: [
        "Unlimited high-speed data",
        "Priority network access",
        "Mobile hotspot up to 100GB",
        "VPN-ready connectivity",
        "24/7 business support"
      ],
      price: "$65",
      popular: true
    },
    {
      icon: Smartphone,
      title: "Business Devices",
      description: "Enterprise-grade mobile devices",
      features: [
        "Bulk device pricing",
        "Mobile device management",
        "Enterprise security features",
        "Device insurance included",
        "Same-day replacement"
      ],
      price: "Custom",
      popular: false
    }
  ];

  const benefits = [
    "Volume discounts for 5+ lines",
    "Dedicated business support",
    "Flexible billing options",
    "Custom enterprise solutions",
    "24/7 priority support"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-ignis-gradient text-white text-lg px-4 py-2">
              Enterprise Solutions
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6">
              <span className="font-bold">Business</span> <span className="font-normal">Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Empower your business with enterprise-grade mobile connectivity
            </p>
          </div>

          {/* Business Solutions Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {businessSolutions.map((solution, index) => (
              <div key={index} className="relative">
                {solution.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-ignis-gradient text-white z-10">
                    Most Popular
                  </Badge>
                )}
                
                <Card className={`
                  h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300
                  ${solution.popular ? 'ring-2 ring-ignis-purple/20 scale-105' : ''}
                  bg-gradient-to-br from-gray-50 to-white
                `}>
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 w-16 h-16 bg-ignis-gradient rounded-full flex items-center justify-center">
                      <solution.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-light text-gray-900">
                      {solution.title}
                    </CardTitle>
                    <p className="text-gray-600 font-light">{solution.description}</p>
                    <div className="flex items-center justify-center mt-4">
                      <span className="text-4xl font-light text-gray-900">{solution.price}</span>
                      {solution.price !== "Custom" && <span className="text-gray-600 font-light">/month</span>}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5 text-ignis-purple mr-3 mt-0.5 flex-shrink-0" />
                          <span className="font-light text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`
                        w-full font-light
                        ${solution.popular 
                          ? 'bg-ignis-gradient hover:opacity-90 text-white' 
                          : 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-900'
                        }
                      `}
                      variant={solution.popular ? "default" : "outline"}
                    >
                      {solution.price === "Custom" ? "Get Quote" : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-ignis-purple/5 to-ignis-teal/5">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light text-gray-900 mb-4">
                  <span className="font-bold">Why Choose</span> <span className="font-normal">Ignis Business?</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-gray-700 font-light">
                    <Check className="h-5 w-5 text-ignis-purple mr-3 flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-ignis-gradient hover:opacity-90 text-white font-light px-8">
                  Contact Sales Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Business;
