
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Wifi, Users, Headphones, Shield } from "lucide-react";

const CarrierDifferentiation = () => {
  const { ref, inView } = useInView({ 
    triggerOnce: true,
    rootMargin: '-10% 0px'
  });

  const features = [
    {
      icon: Wifi,
      title: "5G Network Excellence",
      description: "Powered by nationwide 5G infrastructure, delivering reliable connectivity across the country.",
      details: "Experience premium network quality with our unique lifestyle-focused approach to mobile connectivity."
    },
    {
      icon: Users,
      title: "Lifestyle Segments",
      description: "Eight carefully curated lifestyle segments designed around how you actually live.",
      details: "From adventurers to creators, each segment gets devices and plans tailored to their unique needs."
    },
    {
      icon: Headphones,
      title: "Premium Support",
      description: "Dedicated support that understands your lifestyle and mobile needs.",
      details: "Get help from experts who know your segment and can provide personalized recommendations."
    },
    {
      icon: Shield,
      title: "Device Protection",
      description: "Comprehensive protection plans designed for active lifestyles.",
      details: "From rugged cases to insurance coverage, we protect what matters most to your mobile experience."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6">
            More Than Just <span className="font-normal">Connectivity</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            We're redefining what it means to be a mobile carrier by putting your lifestyle first
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-ignis-gradient rounded-full mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-light text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 font-light mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    {feature.details}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarrierDifferentiation;
