
import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ProductGallery from "@/components/ProductGallery";
import AddToCartModal from "@/components/AddToCartModal";

const DeviceDetail = () => {
  const { slug } = useParams();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [showAddToCart, setShowAddToCart] = useState(false);

  // Mock device data - in real app this would come from API
  const device = useMemo(() => {
    const devices = {
      "asus-rog-phone-8-pro": {
        id: "asus-rog-phone-8-pro",
        name: "ASUS ROG Phone 8 Pro",
        manufacturer: "ASUS",
        category: "Gaming & Streaming",
        description: "The ultimate gaming smartphone with flagship performance, advanced cooling, and gaming-focused features. Built for serious mobile gamers who demand the best.",
        images: [
          "/placeholder.svg",
          "/placeholder.svg", 
          "/placeholder.svg"
        ],
        badge: "Gaming Beast",
        variants: [
          { color: "Phantom Black", storage: "256GB", price: 1099 },
          { color: "Phantom Black", storage: "512GB", price: 1199 },
          { color: "Storm White", storage: "512GB", price: 1199 }
        ],
        features: [
          "Snapdragon 8 Gen 3 Processor",
          "24GB LPDDR5X RAM",
          "165Hz AMOLED Display",
          "GameCool 8 Cooling System",
          "6000mAh Battery with 65W Charging",
          "AirTrigger 8 Gaming Controls"
        ]
      }
      // Add other devices as needed
    };
    return devices[slug as keyof typeof devices];
  }, [slug]);

  if (!device) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-light text-gray-900">Device not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const currentVariant = device.variants[selectedVariant];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Gallery */}
            <div>
              <ProductGallery images={device.images} />
            </div>

            {/* Product Information */}
            <div className="space-y-8">
              <div>
                <div className="text-sm text-ignis-purple font-light mb-2">
                  {device.category}
                </div>
                <h1 className="text-4xl font-light text-gray-900 mb-4">
                  {device.name}
                </h1>
                <Badge className="bg-ignis-gradient text-white mb-6">
                  {device.badge}
                </Badge>
                <p className="text-lg text-gray-600 font-light leading-relaxed">
                  {device.description}
                </p>
              </div>

              {/* Variant Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-normal text-gray-900">Choose Configuration</h3>
                <div className="grid gap-3">
                  {device.variants.map((variant, index) => (
                    <Card 
                      key={index}
                      className={`cursor-pointer transition-all ${
                        selectedVariant === index 
                          ? 'ring-2 ring-ignis-purple bg-purple-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedVariant(index)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-normal text-gray-900">
                              {variant.color} • {variant.storage}
                            </div>
                          </div>
                          <div className="text-xl font-light text-gray-900">
                            ${variant.price}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-normal text-gray-900">Key Features</h3>
                <div className="grid gap-2">
                  {device.features.map((feature, index) => (
                    <div key={index} className="text-gray-600 font-light">
                      • {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price and Add to Cart */}
              <div className="space-y-6 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-light text-gray-900">
                      ${currentVariant.price}
                    </div>
                    <div className="text-sm text-gray-600 font-light">
                      {currentVariant.color} • {currentVariant.storage}
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="lg"
                  className="w-full bg-ignis-gradient hover:opacity-90 text-white font-light"
                  onClick={() => setShowAddToCart(true)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <AddToCartModal 
        isOpen={showAddToCart}
        onClose={() => setShowAddToCart(false)}
        device={device}
        selectedVariant={currentVariant}
      />
    </div>
  );
};

export default DeviceDetail;
