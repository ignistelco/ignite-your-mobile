
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DeviceCards = () => {
  const { ref, inView } = useInView({ 
    triggerOnce: true,
    rootMargin: '-10% 0px'
  });

  const hotDevices = [
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
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6">
            Hot <span className="font-normal">Devices</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Discover our curated selection of premium devices, handpicked for each lifestyle segment
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {hotDevices.map((device, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeviceCards;
