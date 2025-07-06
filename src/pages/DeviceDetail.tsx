
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import AddToCartModal from "@/components/AddToCartModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useDeviceModel } from "@/hooks/useDeviceModels";
import { Skeleton } from "@/components/ui/skeleton";

const DeviceDetail = () => {
  const { slug } = useParams();
  const { data: device, isLoading, error } = useDeviceModel(slug || '');
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [showAddToCart, setShowAddToCart] = useState(false);

  // Set default variant when device loads
  useState(() => {
    if (device?.device_product_model_variants?.[0] && !selectedVariant) {
      setSelectedVariant(device.device_product_model_variants[0]);
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <Skeleton className="w-full h-96 rounded-lg" />
                <div className="flex gap-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="w-20 h-20 rounded-lg" />
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-1/2" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !device) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Device Not Found</h1>
            <p className="text-gray-600">The device you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const specs = device.specs as any;
  const variants = device.device_product_model_variants || [];
  const currentVariant = selectedVariant || variants[0];
  const price = currentVariant ? currentVariant.base_price_cents / 100 : 0;

  // Extract images from specs
  const images = specs?.images || ["/placeholder.svg"];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Gallery */}
            <div>
              <ProductGallery images={images} />
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-4 bg-ignis-gradient text-white">
                  {specs?.category || specs?.type || "Device"}
                </Badge>
                <h1 className="text-4xl font-light text-gray-900 mb-2">
                  {device.name}
                </h1>
                <p className="text-xl text-gray-600 font-light">
                  {specs?.manufacturer || specs?.brand || "Unknown Brand"}
                </p>
              </div>

              {/* Device Description */}
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {specs?.description || "Experience cutting-edge technology with this premium device."}
                </p>
              </div>

              {/* Specifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-normal text-gray-900">Key Features</h3>
                <div className="grid grid-cols-1 gap-3">
                  {specs?.processor && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Processor</span>
                      <span className="text-gray-900 font-medium">{specs.processor}</span>
                    </div>
                  )}
                  {specs?.display && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Display</span>
                      <span className="text-gray-900 font-medium">{specs.display}</span>
                    </div>
                  )}
                  {specs?.camera && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Camera</span>
                      <span className="text-gray-900 font-medium">{specs.camera}</span>
                    </div>
                  )}
                  {specs?.battery && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Battery</span>
                      <span className="text-gray-900 font-medium">{specs.battery}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Variant Selection */}
              {variants.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-normal text-gray-900">Configuration</h3>
                  
                  {/* Color Selection */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Color</p>
                    <div className="flex gap-2">
                      {variants.map((variant: any) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                            selectedVariant?.id === variant.id
                              ? 'border-ignis-purple bg-ignis-purple text-white'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {variant.color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Storage Selection */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Storage</p>
                    <div className="flex gap-2">
                      {[...new Set(variants.map((v: any) => v.storage_gb))].map((storage: number) => (
                        <button
                          key={storage}
                          onClick={() => {
                            const variant = variants.find((v: any) => 
                              v.storage_gb === storage && 
                              v.color === selectedVariant?.color
                            ) || variants.find((v: any) => v.storage_gb === storage);
                            if (variant) setSelectedVariant(variant);
                          }}
                          className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                            selectedVariant?.storage_gb === storage
                              ? 'border-ignis-purple bg-ignis-purple text-white'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {storage}GB
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Price and Add to Cart */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-3xl font-light text-gray-900">
                      {price > 0 ? `$${price}` : "Price TBD"}
                    </p>
                    {currentVariant && (
                      <p className="text-sm text-gray-600">
                        {currentVariant.color} • {currentVariant.storage_gb}GB
                      </p>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={() => setShowAddToCart(true)}
                  className="w-full bg-ignis-gradient hover:opacity-90 text-white py-3 text-lg font-light"
                  disabled={!currentVariant}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Add to Cart Modal */}
      <AddToCartModal 
        open={showAddToCart}
        onOpenChange={setShowAddToCart}
        device={device}
        selectedVariant={currentVariant}
      />
    </div>
  );
};

export default DeviceDetail;
