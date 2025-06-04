
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const LifestyleCuration = () => {
  const [activeLifestyle, setActiveLifestyle] = useState(0);

  const lifestyles = [
    {
      title: "Gaming & Streaming",
      icon: Gamepad2,
      description: "High-performance devices with cutting-edge displays and processing power for seamless gaming experiences and content creation.",
      approach: "We curate devices with 120Hz+ displays, flagship processors, and advanced cooling systems to ensure zero lag and maximum performance."
    },
    {
      title: "Entrepreneur PowerUser",
      icon: Briefcase,
      description: "Professional-grade devices with enterprise security, productivity features, and reliable connectivity for business excellence.",
      approach: "Our selection focuses on devices with exceptional battery life, enterprise security features, and seamless integration with business tools."
    },
    {
      title: "Photography & Film",
      icon: Camera,
      description: "Camera-first devices with professional-grade sensors, advanced image processing, and creative tools for visual storytelling.",
      approach: "We prioritize devices with multi-lens systems, RAW capture capabilities, and professional video recording features."
    },
    {
      title: "Rugged & Outdoor",
      icon: Mountain,
      description: "Ultra-durable devices built to withstand extreme conditions while maintaining peak performance in any environment.",
      approach: "Every device is tested for military-grade durability, water resistance, and extended battery life for outdoor adventures."
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      description: "Privacy-first devices with hardware-level security, open-source operating systems, and complete data control.",
      approach: "We select devices with hardware kill switches, degoogled OS options, and transparent privacy practices."
    },
    {
      title: "Travel & Excursion",
      icon: Plane,
      description: "Lightweight, versatile devices optimized for global connectivity and travel-friendly features.",
      approach: "Our curation emphasizes global band support, dual-SIM capabilities, and compact form factors perfect for travelers."
    },
    {
      title: "Essential & Affordable",
      icon: DollarSign,
      description: "Value-focused devices that deliver essential features without compromising on quality or user experience.",
      approach: "We carefully balance price and performance, ensuring every device meets our quality standards while remaining accessible."
    },
    {
      title: "Crypto",
      icon: Smartphone,
      description: "Specialized devices with enhanced security features and blockchain integration for the crypto-native user.",
      approach: "Our selection includes devices with hardware wallets, enhanced encryption, and crypto-specific security features."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6">
            Our Philosophy: <span className="font-normal">Curating for Your Lifestyle</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto font-light">
            At Ignis Mobile, we believe that technology should seamlessly integrate into your life, not just be a tool. 
            We've moved beyond the one-size-fits-all approach and embraced a curation-first philosophy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Lifestyle buttons */}
          <div className="space-y-4">
            <h3 className="text-2xl font-light text-gray-900 mb-8">Understanding Our 8 Lifestyle Segments</h3>
            {lifestyles.map((lifestyle, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveLifestyle(index)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                  activeLifestyle === index 
                    ? 'border-ignis-purple bg-ignis-purple/5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <lifestyle.icon className={`h-8 w-8 ${
                    activeLifestyle === index ? 'text-ignis-purple' : 'text-gray-600'
                  }`} />
                  <span className={`text-lg font-light ${
                    activeLifestyle === index ? 'text-ignis-purple' : 'text-gray-900'
                  }`}>
                    {lifestyle.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right side - Description */}
          <div className="lg:pl-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLifestyle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    {lifestyles[activeLifestyle].icon && (
                      <lifestyles[activeLifestyle].icon className="h-8 w-8 text-ignis-purple" />
                    )}
                    <h3 className="text-3xl font-light text-gray-900">
                      {lifestyles[activeLifestyle].title}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-600 font-light leading-relaxed mb-6">
                    {lifestyles[activeLifestyle].description}
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="text-xl font-light text-gray-900 mb-3">Our Curation Approach</h4>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {lifestyles[activeLifestyle].approach}
                  </p>
                </div>

                <div className="pt-4">
                  <Button className="bg-ignis-gradient hover:opacity-90 text-white font-light px-8 py-3">
                    Explore {lifestyles[activeLifestyle].title} Devices
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleCuration;
