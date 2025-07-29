import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Variant {
  id: string;
  color: string;
  storage: string;
  price: number;
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  onVariantSelect: (variant: Variant) => void;
}

const VariantSelector = ({ variants, selectedVariant, onVariantSelect }: VariantSelectorProps) => {
  const colors = [...new Set(variants.map(v => v.color))];
  const storageOptions = [...new Set(variants.map(v => v.storage))];
  
  const selectedColor = selectedVariant?.color;
  const selectedStorage = selectedVariant?.storage;

  const getVariantByColorAndStorage = (color: string, storage: string) => {
    return variants.find(v => v.color === color && v.storage === storage);
  };

  const getAvailableStorageForColor = (color: string) => {
    return storageOptions.filter(storage => 
      variants.some(v => v.color === color && v.storage === storage && v.stock_status !== 'out_of_stock')
    );
  };

  const getAvailableColorsForStorage = (storage: string) => {
    return colors.filter(color => 
      variants.some(v => v.color === color && v.storage === storage && v.stock_status !== 'out_of_stock')
    );
  };

  const handleColorSelect = (color: string) => {
    const availableStorage = getAvailableStorageForColor(color);
    const newStorage = selectedStorage && availableStorage.includes(selectedStorage) 
      ? selectedStorage 
      : availableStorage[0];
    
    if (newStorage) {
      const variant = getVariantByColorAndStorage(color, newStorage);
      if (variant) onVariantSelect(variant);
    }
  };

  const handleStorageSelect = (storage: string) => {
    const availableColors = getAvailableColorsForStorage(storage);
    const newColor = selectedColor && availableColors.includes(selectedColor) 
      ? selectedColor 
      : availableColors[0];
    
    if (newColor) {
      const variant = getVariantByColorAndStorage(newColor, storage);
      if (variant) onVariantSelect(variant);
    }
  };

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <div className="space-y-3">
        <h3 className="font-semibold">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map(color => {
            const isAvailable = getAvailableStorageForColor(color).length > 0;
            const isSelected = selectedColor === color;
            
            return (
              <Button
                key={color}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                disabled={!isAvailable}
                onClick={() => handleColorSelect(color)}
                className={`${!isAvailable ? 'opacity-50' : ''}`}
              >
                {color}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Storage Selection */}
      <div className="space-y-3">
        <h3 className="font-semibold">Storage</h3>
        <div className="grid grid-cols-2 gap-3">
          {storageOptions.map(storage => {
            const isAvailable = selectedColor ? 
              getVariantByColorAndStorage(selectedColor, storage)?.stock_status !== 'out_of_stock' :
              getAvailableColorsForStorage(storage).length > 0;
            const isSelected = selectedStorage === storage;
            const variant = selectedColor ? getVariantByColorAndStorage(selectedColor, storage) : null;
            
            return (
              <Card 
                key={storage}
                className={`cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-primary' : ''
                } ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
                onClick={() => isAvailable && handleStorageSelect(storage)}
              >
                <CardContent className="p-3 text-center">
                  <div className="font-medium">{storage}</div>
                  {variant && (
                    <div className="text-sm text-muted-foreground mt-1">
                      ${variant.price}
                    </div>
                  )}
                  {variant?.stock_status === 'low_stock' && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      Low Stock
                    </Badge>
                  )}
                  {variant?.stock_status === 'out_of_stock' && (
                    <Badge variant="destructive" className="mt-1 text-xs">
                      Out of Stock
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Selected Variant Info */}
      {selectedVariant && (
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">
                  {selectedVariant.color} • {selectedVariant.storage}
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedVariant.stock_status === 'in_stock' && 'In Stock'}
                  {selectedVariant.stock_status === 'low_stock' && 'Limited Stock'}
                  {selectedVariant.stock_status === 'out_of_stock' && 'Out of Stock'}
                </div>
              </div>
              <div className="text-xl font-bold">
                ${selectedVariant.price}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VariantSelector;