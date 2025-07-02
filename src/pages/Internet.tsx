
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, Router, Signal } from "lucide-react";

const Internet = () => {
  const dataPlans = [
    {
      name: "Data Connect 50",
      data: "50GB",
      price: "$35",
      description: "Perfect for light home internet use",
      features: ["50GB High-Speed Data", "Hotspot Capable", "No Contract", "Easy Setup"]
    },
    {
      name: "Data Connect 100",
      data: "100GB",
      price: "$50",
      description: "Great for streaming and remote work",
      features: ["100GB High-Speed Data", "Priority Network", "Hotspot Capable", "24/7 Support"],
      popular: true
    },
    {
      name: "Data Connect Unlimited",
      data: "Unlimited",
      price: "$75",
      description: "For heavy internet users and families",
      features: ["Unlimited High-Speed Data", "Priority Network", "Multiple Device Support", "Premium Support"]
    }
  ];

  const devices = [
    {
      name: "MiFi X Pro",
      type: "Mobile Hotspot",
      icon: Router,
      price: "$199",
      features: ["WiFi 6 Support", "24-hour battery", "Connects 30 devices", "5G Ready"],
      image: "/placeholder.svg"
    },
    {
      name: "Home Gateway Plus",
      type: "Home Internet Device",
      icon: Wifi,
      price: "$149",
      features: ["High-gain antennas", "Ethernet ports", "WiFi 6E", "Easy setup"],
      image: "/placeholder.svg"
    },
    {
      name: "Travel Router Mini",
      type: "Portable Router",
      icon: Signal,
      price: "$99",
      features: ["Ultra-portable", "8-hour battery", "Connects 10 devices", "Global ready"],
      image: "/placeholder.svg"
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
              Data-Only Plans
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6">
              <span className="font-bold">Internet</span> <span className="font-normal">Everywhere</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              High-speed data plans and devices for home, office, and on-the-go connectivity
            </p>
          </div>

          {/* Data Plans Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                <span className="font-bold">Data-Only</span> <span className="font-normal">Plans</span>
              </h2>
              <p className="text-lg text-gray-600 font-light">
                Pure data connectivity without the voice features
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {dataPlans.map((plan, index) => (
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
                    <CardContent className="p-8 text-center">
                      <div className="mb-6">
                        <div className="text-4xl font-light text-ignis-purple mb-2">
                          {plan.data}
                        </div>
                        <h3 className="text-xl font-normal text-gray-900 mb-2">
                          {plan.name}
                        </h3>
                        <p className="text-gray-600 font-light text-sm">
                          {plan.description}
                        </p>
                      </div>

                      <div className="mb-6">
                        <span className="text-3xl font-light text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 font-light">/month</span>
                      </div>

                      <ul className="space-y-2 mb-8 text-left">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-700 font-light text-sm">
                            <div className="w-2 h-2 bg-ignis-purple rounded-full mr-3"></div>
                            {feature}
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

          {/* Devices Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                <span className="font-bold">Internet</span> <span className="font-normal">Devices</span>
              </h2>
              <p className="text-lg text-gray-600 font-light">
                MiFi hotspots and WiFi devices to keep you connected
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {devices.map((device, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg h-48 bg-gradient-to-br from-ignis-purple/10 to-ignis-teal/10 flex items-center justify-center">
                      <device.icon className="h-16 w-16 text-ignis-purple" />
                    </div>
                    
                    <div className="p-6">
                      <div className="text-sm text-ignis-purple font-light mb-2">
                        {device.type}
                      </div>
                      <h3 className="font-normal text-xl text-gray-900 mb-2">
                        {device.name}
                      </h3>
                      <div className="space-y-1 mb-4">
                        {device.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="text-sm text-gray-600 font-light">
                            • {feature}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-light text-gray-900">
                          {device.price}
                        </span>
                        <Button 
                          size="sm"
                          className="bg-ignis-gradient hover:opacity-90 text-white font-light"
                        >
                          View Device
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Internet;
