import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

interface ProductCardProps {
  device: Device;
  view?: 'grid' | 'list';
}

const ProductCard = ({ device, view = 'grid' }: ProductCardProps) => {
  const minPrice = Math.min(...device.variants.map(v => v.price));
  const maxPrice = Math.max(...device.variants.map(v => v.price));
  const priceRange = minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`;

  if (view === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="flex">
          <div className="w-48 h-48 bg-gray-100 relative flex-shrink-0">
            {device.images?.[0] && (
              <img
                src={device.images[0]}
                alt={device.name}
                className="w-full h-full object-cover"
              />
            )}
            {device.badge && (
              <Badge className="absolute top-2 left-2" variant="secondary">
                {device.badge}
              </Badge>
            )}
          </div>
          <CardContent className="flex-1 p-6">
            <div className="flex justify-between h-full">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">{device.manufacturer}</div>
                <h3 className="text-xl font-semibold">{device.name}</h3>
                <div className="text-sm text-muted-foreground">{device.category}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {device.variants.slice(0, 3).map((variant, index) => (
                    <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                      {variant.storage}
                    </span>
                  ))}
                  {device.variants.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{device.variants.length - 3} more</span>
                  )}
                </div>
              </div>
              <div className="text-right space-y-4">
                <div className="text-2xl font-bold">{priceRange}</div>
                <Button asChild>
                  <Link to={`/devices/${device.slug}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="aspect-square bg-gray-100 relative">
        {device.images?.[0] && (
          <img
            src={device.images[0]}
            alt={device.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {device.badge && (
          <Badge className="absolute top-2 left-2" variant="secondary">
            {device.badge}
          </Badge>
        )}
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="text-sm text-muted-foreground">{device.manufacturer}</div>
        <h3 className="font-semibold text-lg">{device.name}</h3>
        <div className="text-sm text-muted-foreground">{device.category}</div>
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">{priceRange}</div>
          <Button asChild size="sm">
            <Link to={`/devices/${device.slug}`}>View</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;