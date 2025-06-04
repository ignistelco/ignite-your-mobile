
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Smartphone, Zap, Settings, Globe } from "lucide-react";

const PulseOSSection = () => {
  const { ref, inView } = useInView({ 
    triggerOnce: true,
    rootMargin: '-10% 0px'
  });

  const features = [
    {
      icon: Settings,
      title: "Lifestyle Environments",
      description: "Seamlessly switch between dedicated lifestyle modes optimized for your specific needs and activities."
    },
    {
      icon: Globe,
      title: "Google Ecosystem Integration",
      description: "Enjoy familiar Google services while maintaining complete control over your privacy and data."
    },
    {
      icon: Zap,
      title: "AI-Powered Optimization",
      description: "Intelligent performance optimization that learns from your usage patterns and preferences."
    }
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-ignis-teal rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * 600,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-3 bg-ignis-gradient/10 border border-ignis-purple/20 rounded-full px-6 py-3 mb-8"
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(99, 102, 241, 0.3)",
                "0 0 40px rgba(6, 182, 212, 0.3)",
                "0 0 20px rgba(99, 102, 241, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Smartphone className="h-5 w-5 text-ignis-purple" />
            <span className="text-ignis-purple font-light text-sm tracking-wide uppercase">
              Future-Proofing Your Mobile Life
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-light text-white mb-6">
            Introducing <span className="font-normal bg-ignis-gradient bg-clip-text text-transparent">PulseOS</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
            We're not content with the status quo. Our vision of PulseOS is a revolutionary operating system 
            that blends seamlessly into your lifestyle, offering unparalleled customization and control.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Features */}
          <div className="space-y-8">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="flex items-start space-x-4 p-6 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-ignis-gradient rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 font-light text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="pt-6"
            >
              <Button 
                size="lg"
                className="bg-ignis-gradient hover:opacity-90 text-white font-light px-12 py-6 text-lg h-auto rounded-2xl shadow-2xl"
              >
                Join PulseOS Waitlist
              </Button>
              <p className="text-gray-400 text-sm font-light mt-3">
                Be among the first to experience the future of mobile operating systems
              </p>
            </motion.div>
          </div>

          {/* Right side - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Holographic rings */}
              {[1, 2].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute inset-0 border border-ignis-teal/30 rounded-3xl"
                  style={{
                    scale: 1 + ring * 0.1,
                  }}
                  animate={{
                    rotate: ring % 2 === 0 ? 360 : -360,
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    rotate: { duration: 8 + ring * 2, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 2, repeat: Infinity, delay: ring * 0.5 }
                  }}
                />
              ))}

              {/* Phone */}
              <div className="w-80 h-[500px] bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-[3.5rem] shadow-2xl relative overflow-hidden border border-gray-700/50">
                <div className="m-6 h-[calc(100%-48px)] bg-black rounded-[3rem] relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-ignis-gradient opacity-95"
                    animate={{
                      background: [
                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
                        "linear-gradient(135deg, #06b6d4 0%, #6366f1 50%, #8b5cf6 100%)",
                        "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #6366f1 100%)",
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  <div className="relative z-10 p-8 text-white h-full flex flex-col justify-center text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Smartphone className="h-16 w-16 mx-auto mb-6 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-light mb-2">PulseOS</h3>
                    <p className="text-sm opacity-90 font-light">
                      Revolutionary Mobile Experience
                    </p>
                    
                    <div className="mt-8 space-y-3">
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-white/60 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "90%" }}
                          transition={{ delay: 1, duration: 2, repeat: Infinity, repeatDelay: 2 }}
                        />
                      </div>
                      <p className="text-xs opacity-75">Lifestyle Mode: Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PulseOSSection;
