
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Mountain, 
  Palette, 
  Cpu, 
  Activity, 
  Briefcase, 
  Camera,
  Gamepad2,
  Music
} from 'lucide-react';

const lifestyleData = [
  {
    title: "Adventure Seekers",
    description: "Ruggedized quantum devices for extreme environments",
    icon: Mountain,
    image: "photo-1518495973542-4542c06a5843",
    gradient: "from-emerald-400 via-teal-500 to-blue-600",
    size: "large",
    stats: { members: "12.8K", engagement: "94%" }
  },
  {
    title: "Creative Minds",
    description: "AI-enhanced tools for artistic expression",
    icon: Palette,
    image: "photo-1581091226825-a6a2a5aee158",
    gradient: "from-purple-400 via-pink-500 to-red-500",
    size: "medium",
    stats: { members: "8.2K", engagement: "97%" }
  },
  {
    title: "Tech Pioneers",
    description: "Early access to consciousness-level AI",
    icon: Cpu,
    image: "photo-1488590528505-98d2b5aba04b",
    gradient: "from-blue-400 via-indigo-500 to-purple-600",
    size: "medium",
    stats: { members: "15.6K", engagement: "99%" }
  },
  {
    title: "Fitness Enthusiasts",
    description: "Biometric integration with neural feedback",
    icon: Activity,
    image: "photo-1581090464777-f3220bbe1b8b",
    gradient: "from-orange-400 via-red-500 to-pink-600",
    size: "small",
    stats: { members: "6.9K", engagement: "91%" }
  },
  {
    title: "Business Leaders",
    description: "Quantum-encrypted enterprise solutions",
    icon: Briefcase,
    image: "photo-1470813740244-df37b8c1edcb",
    gradient: "from-gray-400 via-slate-500 to-zinc-600",
    size: "small",
    stats: { members: "4.2K", engagement: "89%" }
  },
  {
    title: "Content Creators",
    description: "Holographic recording capabilities",
    icon: Camera,
    image: "photo-1500673922987-e212871fec22",
    gradient: "from-amber-400 via-orange-500 to-red-600",
    size: "medium",
    stats: { members: "11.1K", engagement: "96%" }
  },
  {
    title: "Gamers",
    description: "Neural interface gaming with 0ms latency",
    icon: Gamepad2,
    image: "photo-1542751371-adc38448a05e",
    gradient: "from-green-400 via-emerald-500 to-teal-600",
    size: "small",
    stats: { members: "18.7K", engagement: "98%" }
  },
  {
    title: "Music Lovers",
    description: "3D spatial audio with emotional resonance AI",
    icon: Music,
    image: "photo-1493225457124-a3eb161ffa5f",
    gradient: "from-violet-400 via-purple-500 to-indigo-600",
    size: "small",
    stats: { members: "9.3K", engagement: "95%" }
  }
];

const BentoLifestyleGrid = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1, once: true });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-2 md:row-span-1';
      case 'small':
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  return (
    <section className="py-32 bg-black relative overflow-hidden" ref={ref}>
      {/* Dynamic background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-6xl lg:text-7xl font-poppins font-black mb-8 tracking-tight text-white leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Neural
            <motion.span 
              className="block bg-ignis-gradient bg-clip-text text-transparent bg-[length:200%_200%]"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Communities
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl lg:text-2xl font-opensans text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Join consciousness-connected communities where shared experiences 
            amplify collective intelligence and creativity.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-6 h-[1200px]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 1 }}
        >
          {lifestyleData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                className={`${getSizeClasses(item.size)} group cursor-pointer`}
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ 
                  delay: 0.8 + index * 0.1, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 2,
                  z: 50
                }}
              >
                <Card className="h-full overflow-hidden border-0 bg-transparent group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/95 backdrop-blur-sm rounded-2xl" />
                  
                  {/* Background image with overlay */}
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700">
                    <img 
                      src={`https://images.unsplash.com/${item.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60 rounded-2xl`} />
                  </div>

                  {/* Animated border */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{
                      background: `linear-gradient(45deg, transparent, ${item.gradient.split(' ')[1]}, transparent)`,
                      padding: '2px'
                    }}
                  >
                    <div className="w-full h-full bg-transparent rounded-2xl" />
                  </motion.div>

                  <CardContent className="p-8 h-full flex flex-col justify-between relative z-10">
                    <div>
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                        animate={hoveredCard === index ? { rotate: 360 } : {}}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </motion.div>

                      <h3 className="text-2xl lg:text-3xl font-poppins font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {item.title}
                      </h3>

                      <p className="font-opensans text-gray-300 leading-relaxed text-lg mb-6 group-hover:text-white transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Stats */}
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-400">
                          <span className="font-semibold text-white">{item.stats.members}</span> members
                        </div>
                        <div className="text-sm text-gray-400">
                          <span className="font-semibold text-green-400">{item.stats.engagement}</span> active
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-2 bg-gradient-to-r ${item.gradient} rounded-full`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: item.stats.engagement } : {}}
                          transition={{ delay: 1 + index * 0.1, duration: 1 }}
                        />
                      </div>

                      {/* CTA */}
                      <motion.div
                        className="flex items-center text-white font-medium group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 cursor-pointer transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        Join Neural Link
                        <motion.svg 
                          className="ml-2 h-4 w-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          animate={hoveredCard === index ? { x: 5 } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default BentoLifestyleGrid;
