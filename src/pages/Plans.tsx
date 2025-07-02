
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const Plans = () => {
  const plans = [
    {
      name: "Ignis Connect",
      price: "$15",
      period: "/month",
      description: "Perfect for essential connectivity",
      features: [
        "5GB High-Speed Data",
        "Unlimited Talk & Text",
        "Premium Network",
        "Mobile Hotspot",
        "Basic Support"
      ],
      popular: false,
      gradient: "from-gray-50 to-gray-100"
    },
    {
      name: "Ignis Go",
      price: "$25",
      period: "/month",
      description: "Ideal for everyday power users",
      features: [
        "15GB High-Speed Data",
        "Unlimited Talk & Text",
        "Premium 5G Network",
        "10GB Mobile Hotspot",
        "Priority Support",
        "International Texting"
      ],
      popular: true,
      gradient: "from-ignis-purple/5 to-ignis-teal/5"
    },
    {
      name: "Ignis Ultimate",
      price: "$35",
      period: "/month",
      description: "Maximum performance for creators",
      features: [
        "Unlimited High-Speed Data",
        "Unlimited Talk & Text",
        "Premium 5G Ultra",
        "Unlimited Mobile Hotspot",
        "Premium Support",
        "International Calling",
        "Device Protection"
      ],
      popular: false,
      gradient: "from-ignis-orange/5 to-ignis-purple/5"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6">
              <span className="font-normal">Choose Your</span> <span className="font-bold">Plan</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Find the perfect plan that ignites your mobile experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div key={index} className="relative">
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-ignis-gradient text-white z-10">
                    Most Popular
                  </Badge>
                )}
                
                <Card className={`
                  h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300
                  ${plan.popular ? 'ring-2 ring-ignis-purple/20 scale-105' : ''}
                  bg-gradient-to-br ${plan.gradient}
                `}>
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-light text-gray-900">
                      {plan.name}
                    </CardTitle>
                    <div className="flex items-center justify-center">
                      <span className="text-4xl font-light text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 font-light">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 font-light">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5 text-ignis-purple mr-3 mt-0.5 flex-shrink-0" />
                          <span className="font-light text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`
                        w-full font-light
                        ${plan.popular 
                          ? 'bg-ignis-gradient hover:opacity-90 text-white' 
                          : 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-900'
                        }
                      `}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Choose Plan
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Plans;
