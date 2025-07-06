
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useMemo } from "react";

interface DeviceGridProps {
  filters: {
    lifestyle: string;
    manufacturer: string;
    priceRange: string;
    storage: string;
  };
}

const DeviceGrid = ({ filters }: DeviceGridProps) => {
  const allDevices = [
    {
      id: "asus-rog-phone-8-pro",
      name: "ASUS ROG Phone 8 Pro",
      manufacturer: "ASUS",
      category: "Gaming & Streaming",
      price: 1199,
      features: ["Snapdragon 8 Gen 3", "24GB RAM", "165Hz Display"],
      image: "/placeholder.svg",
      badge: "Gaming Beast",
      storage: "512GB"
    },
    {
      id: "sony-xperia-1-vii",
      name: "Sony Xperia 1 VII",
      manufacturer: "Sony",
      category: "Photography & Film",
      price: 1399,
      features: ["4K 120fps Video", "Pro Camera", "21:9 Display"],
      image: "/placeholder.svg",
      badge: "Pro Camera",
      storage: "256GB"
    },
    {
      id: "librem-5",
      name: "Librem 5",
      manufacturer: "Librem",
      category: "Privacy & Security",
      price: 899,
      features: ["Hardware Kill Switches", "PureOS", "Open Source"],
      image: "/placeholder.svg",
      badge: "Privacy First",
      storage: "128GB"
    },
    {
      id: "nokia-xr21",
      name: "Nokia XR21",
      manufacturer: "Nokia",
      category: "Rugged & Outdoor",
      price: 649,
      features: ["IP68 Certified", "MIL-STD-810H", "Gorilla Glass"],
      image: "/placeholder.svg",
      badge: "Ultra Rugged",
      storage: "256GB"
    },
    {
      id: "iphone-15-pro-max",
      name: "iPhone 15 Pro Max",
      manufacturer: "Apple",
      category: "Premium Flagship",
      price: 1199,
      features: ["A17 Pro Chip", "48MP Camera", "Titanium Design"],
      image: "/placeholder.svg",
      badge: "Flagship",
      storage: "512GB"
    },
    {
      id: "galaxy-s24-ultra",
      name: "Samsung Galaxy S24 Ultra",
      manufacturer: "Samsung",
      category: "AI-Powered",
      price: 1299,
      features: ["Galaxy AI", "S Pen", "200MP Camera"],
      image: "/placeholder.svg",
      badge: "AI Ready",
      storage: "1TB"
    }
  ];

  const filteredDevices = useMemo(() => {
    return allDevices.filter(device => {
      // Lifestyle filter
      if (filters.lifestyle && device.category !== filters.lifestyle) {
        return false;
      }

      // Manufacturer filter
      if (filters.manufacturer && device.manufacturer !== filters.manufacturer) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(p => 
          p === '+' ? Infinity : parseInt(p)
        );
        if (device.price < min || (max && device.price > max)) {
          return false;
        }
      }

      // Storage filter
      if (filters.storage && device.storage !== filters.storage) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div>
      <div className="mb-6 text-sm text-gray-600 font-light">
        Showing {filteredDevices.length} of {allDevices.length} devices
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDevices.map((device) => (
          <Card key={device.id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white">
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
                    ${device.price}
                  </span>
                  <Link to={`/devices/${device.id}`}>
                    <Button 
                      size="sm"
                      className="bg-ignis-gradient hover:opacity-90 text-white font-light"
                    >
                      View Device
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DeviceGrid;
