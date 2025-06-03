
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon, FireIcon } from "@heroicons/react/24/outline";

const plans = [
  {
    name: "Spark",
    duration: "6 months",
    price: "$45",
    description: "Perfect for getting started",
    features: [
      "15GB Premium Data",
      "Unlimited Talk & Text",
      "Device Bundle Discount",
      "Basic Lifestyle Apps",
      "Community Access"
    ],
    popular: false,
    gradient: "from-slate-100 to-slate-200"
  },
  {
    name: "Ignite",
    duration: "12 months", 
    price: "$65",
    description: "Most popular choice",
    features: [
      "35GB Premium Data",
      "Unlimited Talk & Text",
      "Premium Device Bundle",
      "Lifestyle App Suite",
      "Community Premium",
      "PulseOS Beta Access"
    ],
    popular: true,
    gradient: "from-ignis-purple/10 to-ignis-teal/10"
  },
  {
    name: "Blaze",
    duration: "24 months",
    price: "$85", 
    description: "Ultimate experience",
    features: [
      "Unlimited Premium Data",
      "Unlimited Talk & Text",
      "Flagship Device Bundle",
      "Complete App Ecosystem",
      "VIP Community Access",
      "PulseOS Full Access",
      "Priority Support"
    ],
    popular: false,
    gradient: "from-slate-100 to-slate-200"
  }
];

const PlansSection = () => {
  return (
    <section id="plans" className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-ignis-gradient rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-ignis-gradient rounded-full blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-poppins font-black mb-8 tracking-tight">
            Choose Your 
            <span className="bg-ignis-gradient bg-clip-text text-transparent block mt-2"> Journey </span>
          </h2>
          <p className="text-xl lg:text-2xl font-opensans text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            Flexible plans designed to grow with your lifestyle. All plans include our curated device bundles 
            and access to our passionate community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'transform scale-105 z-10' : ''} transition-all duration-500 hover:shadow-2xl border-0 rounded-3xl overflow-hidden bg-gradient-to-br ${plan.gradient} backdrop-blur-sm`}>
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-ignis-gradient text-white px-6 py-3 rounded-2xl text-sm font-roboto font-bold flex items-center space-x-2 shadow-xl">
                    <FireIcon className="h-5 w-5 animate-flame-pulse" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}
              
              {plan.popular && (
                <div className="absolute inset-0 bg-ignis-gradient p-[2px] rounded-3xl">
                  <div className="bg-white rounded-3xl h-full w-full"></div>
                </div>
              )}
              
              <div className="relative z-10 p-8 lg:p-10">
                <CardHeader className="text-center pb-6 px-0">
                  <CardTitle className="text-3xl font-poppins font-black tracking-tight">{plan.name}</CardTitle>
                  <div className="space-y-4">
                    <div className="text-5xl lg:text-6xl font-poppins font-black bg-ignis-gradient bg-clip-text text-transparent">
                      {plan.price}
                    </div>
                    <div className="text-sm font-roboto text-slate-500 font-medium tracking-wide">per month / {plan.duration}</div>
                    <p className="font-opensans text-slate-600 text-lg">{plan.description}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-8 px-0">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-6 h-6 bg-ignis-gradient rounded-full flex items-center justify-center">
                          <CheckIcon className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-opensans text-slate-700 text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full font-roboto text-lg h-14 rounded-xl ${
                      plan.popular 
                        ? 'bg-ignis-gradient hover:opacity-90 text-white shadow-xl shadow-ignis-purple/30 animate-glow' 
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg'
                    }`}
                  >
                    {plan.popular ? 'Start Igniting' : 'Get Started'}
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="font-opensans text-slate-600 mb-6 text-lg">
            All plans include device protection, nationwide coverage, and no hidden fees
          </p>
          <Button variant="outline" className="font-roboto px-8 py-4 text-lg rounded-xl border-2 border-slate-200 hover:border-ignis-purple/40">
            Compare All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
