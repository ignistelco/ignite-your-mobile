import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  description: string;
  data_amount: string;
  price_monthly: number;
  price_yearly?: number;
  features: string[];
  is_unlimited: boolean;
  is_popular?: boolean;
}

interface PlanPickerProps {
  plans: Plan[];
  selectedPlan: Plan | null;
  selectedTerm: 'monthly' | 'yearly';
  onPlanSelect: (plan: Plan) => void;
  onTermSelect: (term: 'monthly' | 'yearly') => void;
  devicePrice?: number;
}

const PlanPicker = ({ 
  plans, 
  selectedPlan, 
  selectedTerm, 
  onPlanSelect, 
  onTermSelect,
  devicePrice = 0 
}: PlanPickerProps) => {
  const calculateSavings = (plan: Plan) => {
    if (!plan.price_yearly) return 0;
    const monthlyTotal = plan.price_monthly * 12;
    return monthlyTotal - plan.price_yearly;
  };

  const getTotalPrice = () => {
    if (!selectedPlan) return devicePrice;
    
    const planPrice = selectedTerm === 'yearly' && selectedPlan.price_yearly 
      ? selectedPlan.price_yearly 
      : selectedPlan.price_monthly;
    
    return devicePrice + planPrice;
  };

  return (
    <div className="space-y-6">
      {/* Term Selection */}
      <div className="space-y-3">
        <h3 className="font-semibold">Billing Term</h3>
        <RadioGroup value={selectedTerm} onValueChange={onTermSelect} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly">Monthly</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yearly" id="yearly" />
            <Label htmlFor="yearly">Yearly</Label>
            <Badge variant="secondary" className="text-xs">Save up to 20%</Badge>
          </div>
        </RadioGroup>
      </div>

      {/* Plans Grid */}
      <div className="space-y-3">
        <h3 className="font-semibold">Choose Your Plan</h3>
        <div className="grid gap-4">
          {plans.map((plan) => {
            const isSelected = selectedPlan?.id === plan.id;
            const currentPrice = selectedTerm === 'yearly' && plan.price_yearly 
              ? plan.price_yearly 
              : plan.price_monthly;
            const savings = calculateSavings(plan);
            
            return (
              <Card 
                key={plan.id}
                className={`cursor-pointer transition-all relative ${
                  isSelected ? 'ring-2 ring-primary shadow-md' : 'hover:shadow-md'
                } ${plan.is_popular ? 'border-primary' : ''}`}
                onClick={() => onPlanSelect(plan)}
              >
                {plan.is_popular && (
                  <Badge className="absolute -top-2 left-4 bg-primary">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        ${currentPrice}
                        <span className="text-sm font-normal text-muted-foreground">
                          /{selectedTerm === 'yearly' ? 'year' : 'month'}
                        </span>
                      </div>
                      {selectedTerm === 'yearly' && savings > 0 && (
                        <div className="text-xs text-green-600">
                          Save ${savings}/year
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-semibold">
                      {plan.is_unlimited ? 'Unlimited Data' : plan.data_amount}
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check size={12} className="text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Check size={14} className="text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Total Summary */}
      {selectedPlan && (
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Device Price</span>
                <span>${devicePrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{selectedPlan.name} ({selectedTerm})</span>
                <span>
                  ${selectedTerm === 'yearly' && selectedPlan.price_yearly 
                    ? selectedPlan.price_yearly 
                    : selectedPlan.price_monthly}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${getTotalPrice()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlanPicker;