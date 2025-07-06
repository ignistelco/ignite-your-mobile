
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useDeviceModels } from "@/hooks/useDeviceModels";
import { Skeleton } from "@/components/ui/skeleton";

interface DeviceGridProps {
  filters: {
    lifestyle: string;
    manufacturer: string;
    priceRange: string;
    storage: string;
  };
}

const DeviceGrid = ({ filters }: DeviceGridProps) => {
  const { data: devices, isLoading, error } = useDeviceModels();

  const filteredDevices = useMemo(() => {
    if (!devices) return [];

    return devices.filter(device => {
      // Extract specs for filtering
      const specs = device.specs as any;
      
      // Manufacturer filter - check if specs contain manufacturer info
      if (filters.manufacturer) {
        const manufacturer = specs?.manufacturer || specs?.brand;
        if (!manufacturer || !manufacturer.toLowerCase().includes(filters.manufacturer.toLowerCase())) {
          return false;
        }
      }

      // Price range filter - check variants for pricing
      if (filters.priceRange && device.device_product_model_variants) {
        const [min, max] = filters.priceRange.split('-').map(p => 
          p === '+' ? Infinity : parseInt(p)
        );
        
        const hasValidPrice = device.device_product_model_variants.some((variant: any) => {
          const price = variant.base_price_cents / 100; // Convert cents to dollars
          return price >= min && (max === Infinity || price <= max);
        });
        
        if (!hasValidPrice) {
          return false;
        }
      }

      // Storage filter - check variants for storage options
      if (filters.storage && device.device_product_model_variants) {
        const storageValue = parseInt(filters.storage.replace('GB', ''));
        const hasValidStorage = device.device_product_model_variants.some((variant: any) => 
          variant.storage_gb === storageValue
        );
        
        if (!hasValidStorage) {
          return false;
        }
      }

      // Lifestyle filter - check specs for lifestyle/category info
      if (filters.lifestyle) {
        const category = specs?.category || specs?.lifestyle || specs?.type;
        if (!category || !category.toLowerCase().includes(filters.lifestyle.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [devices, filters]);

  if (isLoading) {
    return (
      <div>
        <div className="mb-6 text-sm text-gray-600 font-light">
          Loading devices...
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="border-0 bg-white">
              <CardContent className="p-0">
                <Skeleton className="w-full h-48 rounded-t-lg" />
                <div className="p-6">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-9 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error loading devices</p>
        <p className="text-gray-600">Please try refreshing the page</p>
      </div>
    );
  }

  if (!devices || devices.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No devices found</p>
        <p className="text-sm text-gray-500">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 text-sm text-gray-600 font-light">
        Showing {filteredDevices.length} of {devices.length} devices
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDevices.map((device) => {
          const specs = device.specs as any;
          const firstVariant = device.device_product_model_variants?.[0];
          const basePrice = firstVariant ? firstVariant.base_price_cents / 100 : 0;
          
          return (
            <Card key={device.id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={specs?.images?.[0] || "/placeholder.svg"} 
                    alt={device.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-ignis-gradient text-white">
                    {specs?.category || specs?.type || "Device"}
                  </Badge>
                </div>
                
                <div className="p-6">
                  <div className="text-sm text-ignis-purple font-light mb-2">
                    {specs?.manufacturer || specs?.brand || "Unknown Brand"}
                  </div>
                  <h3 className="font-normal text-xl text-gray-900 mb-2">
                    {device.name}
                  </h3>
                  <div className="space-y-1 mb-4">
                    {specs?.processor && (
                      <div className="text-sm text-gray-600 font-light">
                        • {specs.processor}
                      </div>
                    )}
                    {specs?.display && (
                      <div className="text-sm text-gray-600 font-light">
                        • {specs.display}
                      </div>
                    )}
                    {specs?.camera && (
                      <div className="text-sm text-gray-600 font-light">
                        • {specs.camera}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-light text-gray-900">
                      {basePrice > 0 ? `$${basePrice}` : "Price TBD"}
                    </span>
                    <Link to={`/devices/${device.id}`}>
                      <Button 
                        size="sm"
                        className="bg-ignis-gradient hover:opacity-90 text-white font-light"
                      >
                        View Device
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceGrid;
