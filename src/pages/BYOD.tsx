
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, Smartphone } from "lucide-react";
import { useState } from "react";

const BYOD = () => {
  const [imei, setImei] = useState("");
  const [checkResult, setCheckResult] = useState<string | null>(null);

  const handleImeiCheck = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate IMEI check
    if (imei.length >= 15) {
      setCheckResult("compatible");
    } else {
      setCheckResult("invalid");
    }
  };

  const plans = [
    {
      name: "BYOD Connect",
      price: "$12",
      period: "/month",
      description: "Basic connectivity for your device",
      features: [
        "3GB High-Speed Data",
        "Unlimited Talk & Text",
        "Premium Network Access",
        "Mobile Hotspot (2GB)",
        "Standard Support"
      ],
      popular: false
    },
    {
      name: "BYOD Go",
      price: "$20",
      period: "/month",
      description: "Perfect for everyday use",
      features: [
        "12GB High-Speed Data",
        "Unlimited Talk & Text",
        "Premium 5G Network",
        "Mobile Hotspot (8GB)",
        "Priority Support",
        "International Texting"
      ],
      popular: true
    },
    {
      name: "BYOD Ultimate",
      price: "$30",
      period: "/month",
      description: "Maximum performance for power users",
      features: [
        "Unlimited High-Speed Data",
        "Unlimited Talk & Text",
        "Premium 5G Ultra",
        "Unlimited Mobile Hotspot",
        "Premium Support",
        "International Calling",
        "Device Protection"
      ],
      popular: false
    }
  ];

  const benefits = [
    "Keep your current device",
    "No upgrade fees",
    "Same premium network",
    "Easy activation process",
    "Full feature compatibility"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-ignis-gradient text-white text-lg px-4 py-2">
              Bring Your Own Device
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6">
              <span className="font-bold">Keep Your Device,</span> <span className="font-normal">Upgrade Your Network</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Bring your existing device and enjoy our premium network at special BYOD pricing
            </p>
          </div>

          {/* IMEI Checker */}
          <div className="max-w-2xl mx-auto mb-16">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-ignis-purple/5 to-ignis-teal/5">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-ignis-gradient rounded-full flex items-center justify-center">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-light text-gray-900">
                  Check Device Compatibility
                </CardTitle>
                <p className="text-gray-600 font-light">
                  Enter your device's IMEI to see if it's compatible with our network
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleImeiCheck} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Enter IMEI (15 digits)"
                      value={imei}
                      onChange={(e) => setImei(e.target.value.replace(/\D/g, '').slice(0, 15))}
                      className="h-12 text-lg text-center"
                      maxLength={15}
                    />
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      Find your IMEI in Settings → About Phone or dial *#06#
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-ignis-gradient hover:opacity-90 text-white font-light"
                    disabled={imei.length < 15}
                  >
                    Check Compatibility
                  </Button>
                </form>

                {checkResult && (
                  <div className="mt-6 p-4 rounded-lg text-center">
                    {checkResult === "compatible" ? (
                      <div className="bg-green-50 text-green-800 border border-green-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">✅</div>
                        <h3 className="font-semibold mb-2">Great news! Your device is compatible</h3>
                        <p className="text-sm">You can bring your device to our network and start saving today.</p>
                      </div>
                    ) : (
                      <div className="bg-red-50 text-red-800 border border-red-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">❌</div>
                        <h3 className="font-semibold mb-2">Invalid IMEI</h3>
                        <p className="text-sm">Please check your IMEI and try again.</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                <span className="font-bold">BYOD</span> <span className="font-normal">Benefits</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-gray-700 font-light bg-gray-50 p-4 rounded-lg">
                  <Check className="h-5 w-5 text-ignis-purple mr-3 flex-shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          {/* BYOD Plans */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                <span className="font-bold">BYOD</span> <span className="font-normal">Plans</span>
              </h2>
              <p className="text-lg text-gray-600 font-light">
                Special pricing for customers bringing their own devices
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
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
                    bg-gradient-to-br from-gray-50 to-white
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BYOD;
