
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
    color: "border-gray-200"
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
    color: "border-ignis-purple shadow-lg"
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
    color: "border-gray-200"
  }
];

const PlansSection = () => {
  return (
    <section id="plans" className="py-20 bg-ignis-gradient-subtle">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold mb-6">
            Choose Your 
            <span className="bg-ignis-gradient bg-clip-text text-transparent"> Journey </span>
          </h2>
          <p className="text-xl font-opensans text-gray-600 max-w-3xl mx-auto">
            Flexible plans designed to grow with your lifestyle. All plans include our curated device bundles 
            and access to our passionate community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.color} ${plan.popular ? 'transform scale-105' : ''} transition-all duration-300 hover:shadow-xl`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-ignis-gradient text-white px-4 py-2 rounded-full text-sm font-roboto font-medium flex items-center space-x-1">
                    <FireIcon className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-poppins font-bold">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-4xl font-poppins font-bold bg-ignis-gradient bg-clip-text text-transparent">
                    {plan.price}
                  </div>
                  <div className="text-sm font-roboto text-gray-500">per month / {plan.duration}</div>
                  <p className="font-opensans text-gray-600">{plan.description}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckIcon className="h-5 w-5 text-ignis-teal flex-shrink-0" />
                      <span className="font-opensans text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full font-roboto ${
                    plan.popular 
                      ? 'bg-ignis-gradient hover:opacity-90 text-white animate-glow' 
                      : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
                  }`}
                >
                  {plan.popular ? 'Start Igniting' : 'Get Started'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="font-opensans text-gray-600 mb-4">
            All plans include device protection, nationwide coverage, and no hidden fees
          </p>
          <Button variant="outline" className="font-roboto">
            Compare All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
