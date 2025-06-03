
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon, Zap, Shield, Cpu } from 'lucide-react';

const plans = [
  {
    name: "Spark",
    price: "$45",
    description: "AI-Enhanced Starter",
    features: [
      "15GB Quantum Data",
      "Neural Network Optimization",
      "Basic Lifestyle AI",
      "Community Access",
      "Biometric Security"
    ],
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
    popular: false
  },
  {
    name: "Ignite",
    price: "$65",
    description: "Consciousness-Level AI",
    features: [
      "35GB Quantum Data",
      "Predictive Usage AI",
      "Full Lifestyle Suite",
      "VR Community Access",
      "Quantum Encryption",
      "PulseOS Beta"
    ],
    icon: Cpu,
    gradient: "from-purple-500 to-pink-500",
    popular: true
  },
  {
    name: "Blaze",
    price: "$85",
    description: "Singularity Experience",
    features: [
      "Unlimited Quantum Data",
      "AGI Personal Assistant",
      "Holographic Interface",
      "Metaverse Integration",
      "Neural Link Ready",
      "PulseOS Full Access",
      "Priority Support"
    ],
    icon: Shield,
    gradient: "from-orange-500 to-red-500",
    popular: false
  }
];

const PlanModal = () => {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = async (index: number) => {
    setIsProcessing(true);
    setSelectedPlan(index);
    // Simulate processing
    setTimeout(() => setIsProcessing(false), 1500);
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-poppins font-black text-white mb-4">
          Choose Your
          <span className="block bg-ignis-gradient bg-clip-text text-transparent">
            Quantum Experience
          </span>
        </h2>
        <p className="text-gray-300 text-lg">
          AI-powered plans that evolve with your consciousness
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan, index) => {
          const IconComponent = plan.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className={`relative cursor-pointer ${
                selectedPlan === index ? 'ring-2 ring-ignis-purple' : ''
              }`}
              onClick={() => handleSelectPlan(index)}
            >
              <div className={`bg-gradient-to-br ${plan.gradient} p-[1px] rounded-2xl`}>
                <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl p-6 h-full relative overflow-hidden">
                  {plan.popular && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-3 -right-3 bg-ignis-gradient text-white px-4 py-2 rounded-xl text-sm font-bold"
                    >
                      POPULAR
                    </motion.div>
                  )}

                  <div className="text-center mb-6">
                    <motion.div
                      animate={{ rotate: selectedPlan === index ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-poppins font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-400 mb-4">{plan.description}</p>
                    <div className="text-4xl font-poppins font-black bg-ignis-gradient bg-clip-text text-transparent">
                      {plan.price}
                      <span className="text-sm text-gray-400 font-normal">/month</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + featureIndex * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className={`w-5 h-5 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <CheckIcon className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <AnimatePresence>
                    {selectedPlan === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-700 pt-4"
                      >
                        <Button
                          className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white font-medium py-3 rounded-xl`}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : (
                            'Activate Neural Link'
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-gray-400 text-sm"
      >
        All plans include quantum encryption, neural network optimization, and consciousness-level AI
      </motion.div>
    </div>
  );
};

export default PlanModal;
