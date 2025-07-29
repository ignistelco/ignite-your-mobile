import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaGallery from "@/components/shop/MediaGallery";
import VariantSelector from "@/components/shop/VariantSelector";
import SpecsTabs from "@/components/shop/SpecsTabs";
import PlanPicker from "@/components/shop/PlanPicker";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useShopDevice } from "@/hooks/useShopDevice";
import { useShopPlans } from "@/hooks/useShopPlans";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Heart, Share2 } from "lucide-react";

const DeviceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: device, isLoading: deviceLoading } = useShopDevice(slug!);
  const { data: plans, isLoading: plansLoading } = useShopPlans();
  
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState<'monthly' | 'yearly'>('monthly');

  if (deviceLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-square rounded-lg" />
              <div className="space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-12 w-1/3" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!device) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <h1 className="text-2xl font-bold mb-4">Device Not Found</h1>
            <p className="text-muted-foreground">The device you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Product Header */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Media Gallery */}
            <div>
              <MediaGallery images={device.images} alt={device.name} />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-muted-foreground">{device.manufacturer}</span>
                  {device.badge && (
                    <Badge variant="secondary">{device.badge}</Badge>
                  )}
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{device.name}</h1>
                <p className="text-muted-foreground">{device.category}</p>
              </div>

              {device.description && (
                <p className="text-muted-foreground leading-relaxed">{device.description}</p>
              )}

              {/* Variant Selection */}
              {device.variants && device.variants.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <VariantSelector
                      variants={device.variants}
                      selectedVariant={selectedVariant}
                      onVariantSelect={setSelectedVariant}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  size="lg" 
                  className="flex-1"
                  disabled={!selectedVariant}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart size={18} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 size={18} />
                </Button>
              </div>

              {/* Quick Info */}
              {selectedVariant && (
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Selected Configuration</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedVariant.color} • {selectedVariant.storage}
                        </div>
                      </div>
                      <div className="text-2xl font-bold">
                        ${selectedVariant.price}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <Separator className="my-16" />

          {/* Plans Section */}
          {plans && plans.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Choose Your Plan</h2>
              <div className="max-w-4xl">
                <PlanPicker
                  plans={plans}
                  selectedPlan={selectedPlan}
                  selectedTerm={selectedTerm}
                  onPlanSelect={setSelectedPlan}
                  onTermSelect={setSelectedTerm}
                  devicePrice={selectedVariant?.price || device.base_price}
                />
              </div>
            </div>
          )}

          <Separator className="my-16" />

          {/* Specifications & Features */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Product Details</h2>
            <SpecsTabs
              specifications={device.specifications || []}
              features={device.features || []}
              description={device.description}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DeviceDetailPage;