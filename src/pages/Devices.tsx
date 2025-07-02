
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Devices = () => {
  const devices = [
    {
      name: "ASUS ROG Phone 8 Pro",
      category: "Gaming & Streaming",
      price: "$1,199",
      features: ["Snapdragon 8 Gen 3", "24GB RAM", "165Hz Display"],
      image: "/placeholder.svg",
      badge: "Gaming Beast"
    },
    {
      name: "Sony Xperia 1 VII",
      category: "Photography & Film",
      price: "$1,399",
      features: ["4K 120fps Video", "Pro Camera", "21:9 Display"],
      image: "/placeholder.svg",
      badge: "Pro Camera"
    },
    {
      name: "Librem 5",
      category: "Privacy & Security",
      price: "$899",
      features: ["Hardware Kill Switches", "PureOS", "Open Source"],
      image: "/placeholder.svg",
      badge: "Privacy First"
    },
    {
      name: "Nokia XR21",
      category: "Rugged & Outdoor",
      price: "$649",
      features: ["IP68 Certified", "MIL-STD-810H", "Gorilla Glass"],
      image: "/placeholder.svg",
      badge: "Ultra Rugged"
    },
    {
      name: "iPhone 15 Pro Max",
      category: "Premium Flagship",
      price: "$1,199",
      features: ["A17 Pro Chip", "48MP Camera", "Titanium Design"],
      image: "/placeholder.svg",
      badge: "Flagship"
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      category: "AI-Powered",
      price: "$1,299",
      features: ["Galaxy AI", "S Pen", "200MP Camera"],
      image: "/placeholder.svg",
      badge: "AI Ready"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6">
              <span className="font-bold">Premium</span> <span className="font-normal">Devices</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Discover our curated selection of cutting-edge devices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {devices.map((device, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={device.image} 
                      alt={device.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-ignis-gradient text-white">
                      {device.badge}
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <div className="text-sm text-ignis-purple font-light mb-2">
                      {device.category}
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
      </main>

      <Footer />
    </div>
  );
};

export default Devices;
