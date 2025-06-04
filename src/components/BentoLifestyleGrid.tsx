
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { 
  Gamepad2, 
  Briefcase, 
  Camera, 
  Mountain, 
  Shield, 
  Plane, 
  DollarSign, 
  Smartphone 
} from "lucide-react";

const BentoLifestyleGrid = () => {
  const { ref, inView } = useInView({ 
    triggerOnce: true,
    rootMargin: '-10% 0px'
  });

  const lifestyleSegments = [
    {
      title: "Gaming & Streaming",
      icon: Gamepad2,
      gradient: "from-purple-500 to-pink-500",
      devices: ["ASUS ROG Phone 8 Pro", "RedMagic 9 Pro", "Samsung S25"],
      size: "large"
    },
    {
      title: "Entrepreneur PowerUser",
      icon: Briefcase,
      gradient: "from-blue-500 to-cyan-500",
      devices: ["iPhone 15", "OPPO Find N3 Flip", "Honor 400 Pro"],
      size: "medium"
    },
    {
      title: "Photography & Film",
      icon: Camera,
      gradient: "from-orange-500 to-red-500",
      devices: ["Sony Xperia 1 VII", "Vivo X200 Pro", "OPPO Reno13 Pro"],
      size: "medium"
    },
    {
      title: "Rugged & Outdoor",
      icon: Mountain,
      gradient: "from-green-500 to-emerald-500",
      devices: ["Nokia XR21", "Ulefone Armor 23 Ultra", "Sonim XP400"],
      size: "large"
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      gradient: "from-gray-500 to-slate-600",
      devices: ["Librem 5", "Pixel 6 (GrapheneOS)", "Murena One"],
      size: "small"
    },
    {
      title: "Travel & Excursion",
      icon: Plane,
      gradient: "from-sky-500 to-blue-500",
      devices: ["Motorola Edge 50 Pro", "Infinix Zero Ultra"],
      size: "small"
    },
    {
      title: "Essential & Affordable",
      icon: DollarSign,
      gradient: "from-yellow-500 to-orange-500",
      devices: ["Nothing Phone (2)", "Motorola Moto G 2025"],
      size: "small"
    },
    {
      title: "Crypto",
      icon: Smartphone,
      gradient: "from-violet-500 to-purple-500",
      devices: ["Cryptodata Impulse"],
      size: "small"
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
            Ignis Mobile: <span className="font-normal">Ignite Your Lifestyle</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Inspired by the power of ignis /fire/, we're building a mobile ecosystem that fuels your passions, 
            connects you with what matters, and empowers you to live life to the fullest
          </p>
        </motion.div>

        {/* Lifestyle Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {lifestyleSegments.map((segment, index) => (
            <Button
              key={index}
              variant="outline"
              className="border-gray-200 hover:border-ignis-purple hover:text-ignis-purple transition-colors"
            >
              <segment.icon className="h-4 w-4 mr-2" />
              {segment.title}
            </Button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {lifestyleSegments.map((segment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className={`
                relative overflow-hidden rounded-2xl group cursor-pointer
                ${segment.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                ${segment.size === 'medium' ? 'md:col-span-2' : ''}
                ${segment.size === 'small' ? 'col-span-1' : ''}
              `}
            >
              <div className={`
                absolute inset-0 bg-gradient-to-br ${segment.gradient} opacity-90 
                group-hover:opacity-100 transition-opacity duration-300
              `} />
              
              <div className="relative p-8 h-full flex flex-col justify-between text-white min-h-[200px]">
                <div>
                  <segment.icon className="h-8 w-8 mb-4 opacity-80" />
                  <h3 className="text-xl font-medium mb-3">{segment.title}</h3>
                </div>
                
                <div>
                  <div className="space-y-1 mb-4">
                    {segment.devices.slice(0, 3).map((device, deviceIndex) => (
                      <div key={deviceIndex} className="text-sm opacity-80">
                        {device}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-white/20 text-white hover:bg-white hover:text-gray-900 transition-colors"
                  >
                    View Devices
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoLifestyleGrid;
