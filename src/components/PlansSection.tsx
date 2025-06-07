
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const PlansSection = () => {
  const plans = [
    {
      id: "connect",
      name: "Connect",
      tagline: "Stay connected with essential coverage",
      price: 25,
      originalPrice: 35,
      savings: 10,
      features: [
        "Unlimited talk & text",
        "5GB high-speed data",
        "Mobile hotspot included",
        "Nationwide coverage",
        "5G access where available"
      ],
      badge: "Popular",
      badgeColor: "bg-blue-500"
    },
    {
      id: "go",
      name: "Go",
      tagline: "Perfect for active lifestyles",
      price: 35,
      originalPrice: 45,
      savings: 10,
      features: [
        "Unlimited talk & text",
        "15GB high-speed data",
        "Mobile hotspot included",
        "Nationwide coverage",
        "5G access where available",
        "International texting"
      ],
      badge: "Best Value",
      badgeColor: "bg-green-500"
    },
    {
      id: "ultimate",
      name: "Ultimate",
      tagline: "Unlimited everything for power users",
      price: 45,
      originalPrice: 55,
      savings: 10,
      features: [
        "Unlimited talk & text",
        "Unlimited high-speed data",
        "Unlimited mobile hotspot",
        "Nationwide coverage",
        "Premium 5G access",
        "International calling & texting",
        "HD video streaming",
        "Mobile security suite"
      ],
      badge: "Premium",
      badgeColor: "bg-purple-500"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            All plans include unlimited talk & text with no annual contracts. 
            Switch or cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                plan.id === 'go' ? 'scale-105 border-2 border-green-500' : 'hover:scale-105'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-4 right-4">
                  <Badge className={`${plan.badgeColor} text-white`}>
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-light text-gray-900">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {plan.tagline}
                </CardDescription>
                
                <div className="pt-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-light text-gray-900">
                      ${plan.price}
                    </span>
                    <div className="text-left">
                      <div className="text-sm text-gray-500 line-through">
                        ${plan.originalPrice}
                      </div>
                      <div className="text-sm text-gray-600">/month</div>
                    </div>
                  </div>
                  <div className="text-sm text-green-600 font-medium mt-1">
                    Save ${plan.savings}/month
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="px-6 pt-4">
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium"
                >
                  Choose {plan.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include our 30-day money-back guarantee
          </p>
          <div className="flex items-center justify-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
            <span className="ml-2 text-gray-600">
              Rated 4.8/5 by our customers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
