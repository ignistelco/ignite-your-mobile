
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  device: {
    name: string;
    category: string;
  };
  selectedVariant: {
    color: string;
    storage: string;
    price: number;
  };
}

const AddToCartModal = ({ isOpen, onClose, device, selectedVariant }: AddToCartModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");

  const plans = [
    {
      id: "connect",
      name: "Connect",
      tagline: "Essential connectivity",
      price: 25,
      features: ["5GB Data", "Unlimited Talk & Text", "Basic Support"]
    },
    {
      id: "go",
      name: "Go", 
      tagline: "Perfect for most users",
      price: 45,
      features: ["25GB Data", "Unlimited Talk & Text", "Premium Support", "International Roaming"]
    },
    {
      id: "ultimate",
      name: "Ultimate",
      tagline: "Maximum everything",
      price: 65,
      features: ["Unlimited Data", "Unlimited Talk & Text", "Priority Support", "Global Roaming", "Device Protection"]
    }
  ];

  const terms = [
    { months: 12, discount: 0 },
    { months: 24, discount: 0.1 },
    { months: 36, discount: 0.15 }
  ];

  const handleAddToCart = () => {
    if (!selectedPlan || !selectedTerm) {
      toast({
        title: "Please select a plan and term",
        description: "Both a plan and term length are required.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would add to cart via API
    toast({
      title: "Added to cart!",
      description: `${device.name} with ${selectedPlan} plan added to your cart.`
    });
    
    onClose();
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);
  const selectedTermData = terms.find(t => t.months.toString() === selectedTerm);
  
  const devicePrice = selectedTermData 
    ? selectedVariant.price * (1 - selectedTermData.discount)
    : selectedVariant.price;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">
            Choose Your Plan
          </DialogTitle>
          <div className="text-gray-600 font-light">
            {device.name} • {selectedVariant.color} • {selectedVariant.storage}
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* Plan Selection */}
          <div>
            <h3 className="text-lg font-normal mb-4">Select a Plan</h3>
            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
              <div className="grid gap-4">
                {plans.map((plan) => (
                  <Card 
                    key={plan.id}
                    className={`cursor-pointer transition-all ${
                      selectedPlan === plan.id 
                        ? 'ring-2 ring-ignis-purple bg-purple-50' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value={plan.id} id={plan.id} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-normal text-xl">{plan.name}</h4>
                              <p className="text-sm text-gray-600 font-light">{plan.tagline}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-light">${plan.price}</div>
                              <div className="text-sm text-gray-600 font-light">per month</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {plan.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Term Selection */}
          {selectedPlan && (
            <div>
              <h3 className="text-lg font-normal mb-4">Choose Term Length</h3>
              <RadioGroup value={selectedTerm} onValueChange={setSelectedTerm}>
                <div className="grid gap-3">
                  {terms.map((term) => (
                    <Card 
                      key={term.months}
                      className={`cursor-pointer transition-all ${
                        selectedTerm === term.months.toString() 
                          ? 'ring-2 ring-ignis-purple bg-purple-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedTerm(term.months.toString())}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={term.months.toString()} id={term.months.toString()} />
                          <div className="flex-1 flex items-center justify-between">
                            <div>
                              <span className="font-normal">{term.months} months</span>
                              {term.discount > 0 && (
                                <Badge className="ml-2 bg-green-100 text-green-800">
                                  Save {(term.discount * 100).toFixed(0)}%
                                </Badge>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="font-light">
                                ${(devicePrice / term.months).toFixed(0)}/month
                              </div>
                              {term.discount > 0 && (
                                <div className="text-sm text-gray-600 line-through">
                                  ${(selectedVariant.price / term.months).toFixed(0)}/month
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Summary */}
          {selectedPlan && selectedTerm && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-normal mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Device ({selectedTermData?.months} months)</span>
                  <span>${devicePrice.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Plan ({selectedPlanData?.name})</span>
                  <span>${selectedPlanData?.price}/month</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-normal">
                  <span>Total Monthly</span>
                  <span>
                    ${((devicePrice / (selectedTermData?.months || 1)) + (selectedPlanData?.price || 0)).toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <Button 
            size="lg"
            className="w-full bg-ignis-gradient hover:opacity-90 text-white font-light"
            onClick={handleAddToCart}
            disabled={!selectedPlan || !selectedTerm}
          >
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal;
