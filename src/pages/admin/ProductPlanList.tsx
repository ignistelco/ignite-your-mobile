
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Plus, Edit, Eye } from "lucide-react";

const ProductPlanList = () => {
  const { data: plans, isLoading, error } = useQuery({
    queryKey: ['admin-product-plans'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-api/admin/product-plans');
      if (error) throw error;
      return data.data;
    }
  });

  if (isLoading) {
    return <div>Loading product plans...</div>;
  }

  if (error) {
    return <div>Error loading plans: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Plans</h1>
        <Button asChild>
          <Link to="/admin/product-plans/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Plan
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {plans?.map((plan: any) => (
          <Card key={plan.product_id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.tagline && (
                    <p className="text-sm text-muted-foreground mt-1">{plan.tagline}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Badge variant={plan.is_active ? "default" : "secondary"}>
                    {plan.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Features:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {plan.features?.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {plan.plan_product_terms && plan.plan_product_terms.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Available Terms:</h4>
                    <div className="space-y-2">
                      {plan.plan_product_terms.map((term: any) => (
                        <div key={term.term_id} className="text-sm bg-muted p-2 rounded">
                          {term.term_length_months} months - ${(term.monthly_price_cents / 100).toFixed(2)}/month
                          (Total: ${(term.total_cost_cents / 100).toFixed(2)})
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!plans || plans.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">No product plans found</p>
            <Button asChild>
              <Link to="/admin/product-plans/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Plan
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductPlanList;
