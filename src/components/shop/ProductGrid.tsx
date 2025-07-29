import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "./ProductCard";

interface Device {
  id: string;
  slug: string;
  name: string;
  manufacturer: string;
  category: string;
  base_price: number;
  images: string[];
  badge?: string;
  variants: Array<{
    color: string;
    storage: string;
    price: number;
  }>;
}

interface ProductGridProps {
  devices: Device[];
  loading: boolean;
  view?: 'grid' | 'list';
}

const ProductGrid = ({ devices, loading, view = 'grid' }: ProductGridProps) => {
  if (loading) {
    return (
      <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (devices.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">No devices found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {devices.map((device) => (
        <ProductCard
          key={device.id}
          device={device}
          view={view}
        />
      ))}
    </div>
  );
};

export default ProductGrid;