
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Users, Zap, Heart } from "lucide-react";

const CarrierDifferentiation = () => {
  const { ref, inView } = useInView({ 
    triggerOnce: true,
    rootMargin: '-10% 0px'
  });

  const differentiators = [
    {
      icon: Heart,
      title: "Lifestyle-Centric Curation",
      description: "While companies like Mint Mobile and Tello focus primarily on low-cost service, we craft a mobile ecosystem deeply integrated with your individual lifestyle.",
      detail: "We don't offer one-size-fits-all solutions. We cater to you – our 8 distinct lifestyle segments – with carefully curated device bundles."
    },
    {
      icon: Users,
      title: "Community & Connection",
      description: "We're not just selling products; we're building a community around shared passions.",
      detail: "We foster a space where users connect, share experiences, and inspire each other through their mobile lifestyle journey."
    },
    {
      icon: Zap,
      title: "T-Mobile Network Excellence", 
      description: "Powered by T-Mobile's nationwide 5G network, delivering reliable connectivity across the country.",
      detail: "As a trusted T-Mobile MVNO partner, we provide the same network quality with our unique lifestyle-focused approach."
    },
    {
      icon: Shield,
      title: "Value Beyond Price Point",
      description: "While competitive pricing is important, we prioritize value – delivering premium experiences and curated selections.",
      detail: "Our 6-month service plans aren't just deals; they're investments in your mobile freedom with carefully selected accessories."
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
          <p className="text-xl text-gray-600 max-w-4xl mx-auto font-light">
            Ignis Mobile isn't just about connectivity; we're about empowering you to live your passions. 
            Here's what sets us apart from traditional mobile providers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-ignis-gradient rounded-xl flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 font-light mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarrierDifferentiation;
