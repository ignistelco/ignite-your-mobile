
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Sparkles, Zap, Rocket, ArrowRight } from "lucide-react";
import InteractiveBackground from "./InteractiveBackground";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PlanModal from "./PlanModal";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingElements = [
    { icon: Sparkles, delay: 0, duration: 3 },
    { icon: Zap, delay: 1, duration: 4 },
    { icon: Rocket, delay: 2, duration: 3.5 },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <InteractiveBackground />
      
      {/* Dynamic cursor follower */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-ignis-purple rounded-full mix-blend-difference z-50 pointer-events-none"
        animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-ignis-teal rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-6 lg:px-12 pt-32 pb-20 z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center min-h-[85vh]" ref={ref}>
          
          {/* Left Content */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, x: -100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3 text-ignis-orange"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-6 w-6" />
              </motion.div>
              <span className="font-light text-lg tracking-wide uppercase">
                Lifestyle-First Mobile Experience
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-6xl lg:text-8xl font-light leading-[0.85] tracking-tighter text-white">
                Ignite your
                <motion.span 
                  className="block bg-ignis-gradient bg-clip-text text-transparent bg-[length:200%_200%] font-normal"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  lifestyle
                </motion.span>
                <span className="block text-gray-300 font-light">today</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl font-light"
            >
              Ignis Mobile was born from a desire to create a mobile experience as vibrant and dynamic as the passions that drive you. 
              We believe technology should ignite your life, not constrain it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                  >
                    <Button 
                      size="lg" 
                      className="relative overflow-hidden bg-ignis-gradient hover:opacity-90 text-white font-light px-12 py-6 text-lg h-auto rounded-2xl shadow-2xl group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ x: "-100%" }}
                        animate={isHovered ? { x: "0%" } : { x: "-100%" }}
                        transition={{ duration: 0.3 }}
                        style={{ opacity: 0.1 }}
                      />
                      <span className="relative z-10 flex items-center">
                        Explore Plans
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-black/95 border-gray-800">
                  <PlanModal />
                </DialogContent>
              </Dialog>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="font-light px-12 py-6 text-lg h-auto rounded-2xl border-2 border-gray-600 bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  Join Waitlist
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-12 pt-12"
            >
              {[
                { value: "5G", label: "Network Ready", suffix: "" },
                { value: "8", label: "Lifestyle Segments", suffix: "" },
                { value: "Premium", label: "Device Curation", suffix: "" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="text-center cursor-pointer"
                >
                  <motion.div 
                    className="text-4xl lg:text-5xl font-light bg-ignis-gradient bg-clip-text text-transparent"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}{stat.suffix}
                  </motion.div>
                  <div className="text-gray-400 font-light tracking-wide text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Phone */}
          <motion.div
            style={{ y: y2 }}
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px]">
              {/* Holographic rings */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute inset-0 border border-ignis-teal/30 rounded-full"
                  style={{
                    scale: 1 + ring * 0.2,
                  }}
                  animate={{
                    rotate: ring % 2 === 0 ? 360 : -360,
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    rotate: { duration: 10 + ring * 2, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 2, repeat: Infinity, delay: ring * 0.5 }
                  }}
                />
              ))}

              {/* Floating elements */}
              {floatingElements.map((Element, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    top: `${20 + index * 25}%`,
                    right: `${10 + index * 15}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 360],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: Element.duration,
                    repeat: Infinity,
                    delay: Element.delay,
                  }}
                >
                  <div className="w-12 h-12 bg-ignis-gradient rounded-xl flex items-center justify-center shadow-2xl">
                    <Element.icon className="h-6 w-6 text-white" />
                  </div>
                </motion.div>
              ))}
              
              {/* Main Phone */}
              <motion.div
                className="relative z-10 transform perspective-1000"
                animate={{
                  rotateY: [0, 5, 0, -5, 0],
                  rotateX: [0, 2, 0, -2, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05, rotateY: 15 }}
              >
                <div className="w-80 h-[500px] bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-[3.5rem] shadow-2xl mx-auto overflow-hidden border border-gray-700/50 backdrop-blur-sm relative">
                  {/* Screen with dynamic content */}
                  <div className="m-6 h-[calc(100%-48px)] bg-black rounded-[3rem] relative overflow-hidden shadow-inner">
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
                    
                    {/* Screen Content */}
                    <div className="relative z-10 p-8 text-white h-full flex flex-col justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className="text-center space-y-8"
                      >
                        <motion.div
                          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <Sparkles className="h-20 w-20 mx-auto text-white drop-shadow-lg" />
                        </motion.div>
                        
                        <div>
                          <motion.div 
                            className="font-poppins font-black text-3xl tracking-tight"
                            animate={{ opacity: [1, 0.8, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            Ignis Mobile
                          </motion.div>
                          <div className="font-opensans text-lg opacity-90 font-light tracking-wide mt-2">
                            Lifestyle Powered Network
                          </div>
                        </div>
                        
                        {/* Dynamic UI Elements */}
                        <div className="space-y-4">
                          <motion.div
                            className="w-full h-3 bg-white/20 rounded-full overflow-hidden"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 2, duration: 1.5 }}
                          >
                            <motion.div
                              className="h-full bg-white/60 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: "85%" }}
                              transition={{ delay: 2.5, duration: 2 }}
                            />
                          </motion.div>
                          
                          <div className="flex justify-between text-sm opacity-75">
                            <span>5G Ultra Connected</span>
                            <span>85% Network Optimization</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
