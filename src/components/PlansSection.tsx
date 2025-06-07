
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import PlanModal from "@/components/PlanModal";
import { useState } from "react";

const PlansSection = () => {
  const { ref, inView } = useInView({ 
    triggerOnce: true,
    rootMargin: '-10% 0px'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const plans = [
    {
      name: "Ignis Connect",
      price: "$15",
      period: "/month",
      description: "Perfect for essential connectivity",
      features: [
        "5GB High-Speed Data",
        "Unlimited Talk & Text",
        "Premium Network",
        "Mobile Hotspot",
        "Basic Support"
      ],
      popular: false,
      gradient: "from-gray-50 to-gray-100"
    },
    {
      name: "Ignis Go",
      price: "$25",
      period: "/month",
      description: "Ideal for everyday power users",
      features: [
        "15GB High-Speed Data",
        "Unlimited Talk & Text",
        "Premium 5G Network",
        "10GB Mobile Hotspot",
        "Priority Support",
        "International Texting"
      ],
      popular: true,
      gradient: "from-ignis-purple/5 to-ignis-teal/5"
    },
    {
      name: "Ignis Ultimate",
      price: "$35",
      period: "/month",
      description: "Maximum performance for creators",
      features: [
        "Unlimited High-Speed Data",
        "Unlimited Talk & Text",
        "Premium 5G Ultra",
        "Unlimited Mobile Hotspot",
        "Premium Support",
        "International Calling",
        "Device Protection"
      ],
      popular: false,
      gradient: "from-ignis-orange/5 to-ignis-purple/5"
    }
  ];

  const dataPlanss = [
    {
      name: "Data Go",
      price: "$10",
      description: "For tablets & watches",
      data: "5GB"
    },
    {
      name: "Data Connect",
      price: "$50",
      description: "Home internet solution",
      data: "100GB"
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
            <span className="font-normal">Plans</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light mb-8">
            Ignis Mobile: Where Connectivity Sparks Adventure
          </p>
          
          {/* Plan Duration Options */}
          <div className="flex justify-center space-x-2 mb-12">
            {["6 months", "12 months", "24 months"].map((duration) => (
              <Button
                key={duration}
                variant="outline"
                className="border-gray-200 hover:border-ignis-purple hover:text-ignis-purple font-light"
              >
                {duration}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Main Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="relative"
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-ignis-gradient text-white z-10">
                  Most Popular
                </Badge>
              )}
              
              <Card className={`
                h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300
                ${plan.popular ? 'ring-2 ring-ignis-purple/20 scale-105' : ''}
                bg-gradient-to-br ${plan.gradient}
              `}>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-light text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-light text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 font-light">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 font-light">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-ignis-purple mr-3 mt-0.5 flex-shrink-0" />
                        <span className="font-light text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`
                      w-full font-light
                      ${plan.popular 
                        ? 'bg-ignis-gradient hover:opacity-90 text-white' 
                        : 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-900'
                      }
                    `}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Data Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-2xl font-light text-gray-900 mb-8">Data Plans</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {dataPlanss.map((plan, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <h4 className="text-xl font-light text-gray-900 mb-2">{plan.name}</h4>
                  <div className="text-2xl font-light text-gray-900 mb-2">{plan.price}/month</div>
                  <p className="text-gray-600 font-light mb-2">{plan.description}</p>
                  <div className="text-ignis-purple font-light">{plan.data}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Plan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black/90 backdrop-blur-sm rounded-3xl max-w-6xl mx-4 max-h-[90vh] overflow-auto">
            <div className="relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl z-10"
              >
                ×
              </button>
              <PlanModal />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PlansSection;
