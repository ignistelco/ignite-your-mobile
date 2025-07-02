
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

const planSchema = z.object({
  name: z.string().min(1, "Name is required"),
  tagline: z.string().optional(),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  gigs_plan_id: z.string().min(1, "Gigs plan selection is required"),
  is_active: z.boolean().default(true),
  terms: z.array(z.object({
    term_length_months: z.number().min(1),
    monthly_price_cents: z.number().min(0),
    total_cost_cents: z.number().min(0)
  })).optional()
});

type PlanFormData = z.infer<typeof planSchema>;

const ProductPlanCreate = () => {
  const [features, setFeatures] = useState<string[]>([""]);
  const [terms, setTerms] = useState<Array<{
    term_length_months: number;
    monthly_price_cents: number;
    total_cost_cents: number;
  }>>([]);

  const queryClient = useQueryClient();

  const form = useForm<PlanFormData>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: "",
      tagline: "",
      features: [""],
      is_active: true,
      terms: []
    }
  });

  // Fetch Gigs plans for dropdown
  const { data: gigsPlans, isLoading: gigsPlansLoading } = useQuery({
    queryKey: ['admin-gigs-plans'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-api/admin/gigs-plans');
      if (error) throw error;
      return data.data;
    }
  });

  // Create plan mutation
  const createPlanMutation = useMutation({
    mutationFn: async (planData: PlanFormData) => {
      const { data, error } = await supabase.functions.invoke('admin-api/admin/product-plans', {
        body: {
          ...planData,
          features: features.filter(f => f.trim() !== ""),
          terms: terms.length > 0 ? terms : undefined
        }
      });
      
      if (error) throw error;
      if (!data.success) throw new Error(data.error);
      
      return data.data;
    },
    onSuccess: () => {
      toast.success("Product plan created successfully!");
      queryClient.invalidateQueries({ queryKey: ['product-plans'] });
      form.reset();
      setFeatures([""]);
      setTerms([]);
    },
    onError: (error) => {
      toast.error(`Failed to create plan: ${error.message}`);
    }
  });

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addTerm = () => {
    setTerms([...terms, {
      term_length_months: 12,
      monthly_price_cents: 0,
      total_cost_cents: 0
    }]);
  };

  const removeTerm = (index: number) => {
    setTerms(terms.filter((_, i) => i !== index));
  };

  const updateTerm = (index: number, field: string, value: number) => {
    const newTerms = [...terms];
    newTerms[index] = { ...newTerms[index], [field]: value };
    setTerms(newTerms);
  };

  const onSubmit = (data: PlanFormData) => {
    createPlanMutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Product Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Ignis Go" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tagline</FormLabel>
                    <FormControl>
                      <Input placeholder="Short description of the plan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gigs_plan_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link to Gigs Plan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Gigs plan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gigsPlansLoading ? (
                          <SelectItem value="" disabled>Loading...</SelectItem>
                        ) : (
                          gigsPlans?.map((plan: any) => (
                            <SelectItem key={plan.gigs_plan_id} value={plan.gigs_plan_id}>
                              {plan.name} - ${(plan.price_amount_cents / 100).toFixed(2)}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Features</FormLabel>
                <div className="space-y-2 mt-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="Enter a feature"
                      />
                      {features.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeFeature(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addFeature}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>
              </div>

              <div>
                <FormLabel>Plan Terms (Optional)</FormLabel>
                <div className="space-y-4 mt-2">
                  {terms.map((term, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium">Term {index + 1}</h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeTerm(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <FormLabel>Length (months)</FormLabel>
                            <Input
                              type="number"
                              value={term.term_length_months}
                              onChange={(e) => updateTerm(index, 'term_length_months', Number(e.target.value))}
                            />
                          </div>
                          <div>
                            <FormLabel>Monthly Price (cents)</FormLabel>
                            <Input
                              type="number"
                              value={term.monthly_price_cents}
                              onChange={(e) => updateTerm(index, 'monthly_price_cents', Number(e.target.value))}
                            />
                          </div>
                          <div>
                            <FormLabel>Total Cost (cents)</FormLabel>
                            <Input
                              type="number"
                              value={term.total_cost_cents}
                              onChange={(e) => updateTerm(index, 'total_cost_cents', Number(e.target.value))}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTerm}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Term
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={createPlanMutation.isPending}
              >
                {createPlanMutation.isPending ? "Creating..." : "Create Plan"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPlanCreate;
