import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Specification {
  category: string;
  specs: Array<{
    name: string;
    value: string;
  }>;
}

interface Feature {
  name: string;
  description: string;
  icon?: string;
}

interface SpecsTabsProps {
  specifications: Specification[];
  features: Feature[];
  description?: string;
}

const SpecsTabs = ({ specifications, features, description }: SpecsTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Product Description</h3>
            <div className="prose prose-sm max-w-none">
              {description ? (
                <p className="text-muted-foreground leading-relaxed">{description}</p>
              ) : (
                <p className="text-muted-foreground">No description available.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {features.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Key Features</h3>
              <div className="grid gap-3">
                {features.slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    {feature.icon && (
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">{feature.icon}</span>
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{feature.name}</div>
                      <div className="text-sm text-muted-foreground">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="specifications" className="space-y-4">
        {specifications.map((specGroup, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">{specGroup.category}</h3>
              <div className="space-y-3">
                {specGroup.specs.map((spec, specIndex) => (
                  <div key={specIndex} className="flex justify-between py-2 border-b border-muted last:border-0">
                    <span className="font-medium">{spec.name}</span>
                    <span className="text-muted-foreground text-right max-w-[60%]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {specifications.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No specifications available.</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="features" className="space-y-4">
        <div className="grid gap-4">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {feature.icon && (
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">{feature.icon}</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{feature.name}</h4>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {features.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No features information available.</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default SpecsTabs;