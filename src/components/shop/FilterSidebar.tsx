import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

interface FilterSidebarProps {
  filters: {
    categories: string[];
    manufacturers: string[];
    priceRange: [number, number];
    storage: string[];
    colors: string[];
  };
  onFilterChange: (filters: any) => void;
}

const FilterSidebar = ({ filters, onFilterChange }: FilterSidebarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState({
    categories: searchParams.getAll('category') || [],
    manufacturers: searchParams.getAll('manufacturer') || [],
    priceRange: [
      parseInt(searchParams.get('minPrice') || '0'),
      parseInt(searchParams.get('maxPrice') || '2000')
    ] as [number, number],
    storage: searchParams.getAll('storage') || [],
    colors: searchParams.getAll('color') || []
  });

  useEffect(() => {
    const params = new URLSearchParams();
    
    selectedFilters.categories.forEach(cat => params.append('category', cat));
    selectedFilters.manufacturers.forEach(mfr => params.append('manufacturer', mfr));
    selectedFilters.storage.forEach(stor => params.append('storage', stor));
    selectedFilters.colors.forEach(color => params.append('color', color));
    
    if (selectedFilters.priceRange[0] > 0) params.set('minPrice', selectedFilters.priceRange[0].toString());
    if (selectedFilters.priceRange[1] < 2000) params.set('maxPrice', selectedFilters.priceRange[1].toString());
    
    setSearchParams(params);
    onFilterChange(selectedFilters);
  }, [selectedFilters, setSearchParams, onFilterChange]);

  const handleCheckboxChange = (filterType: keyof typeof selectedFilters, value: string, checked: boolean) => {
    if (filterType === 'priceRange') return;
    
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: checked
        ? [...(prev[filterType] as string[]), value]
        : (prev[filterType] as string[]).filter(item => item !== value)
    }));
  };

  const handlePriceChange = (values: number[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      priceRange: [values[0], values[1]] as [number, number]
    }));
  };

  return (
    <div className="w-80 space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-3">
          {filters.categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedFilters.categories.includes(category)}
                onCheckedChange={(checked) => 
                  handleCheckboxChange('categories', category, checked as boolean)
                }
              />
              <Label htmlFor={`category-${category}`}>{category}</Label>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Manufacturers</h3>
        <div className="space-y-3">
          {filters.manufacturers.map(manufacturer => (
            <div key={manufacturer} className="flex items-center space-x-2">
              <Checkbox
                id={`manufacturer-${manufacturer}`}
                checked={selectedFilters.manufacturers.includes(manufacturer)}
                onCheckedChange={(checked) => 
                  handleCheckboxChange('manufacturers', manufacturer, checked as boolean)
                }
              />
              <Label htmlFor={`manufacturer-${manufacturer}`}>{manufacturer}</Label>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="px-2">
          <Slider
            value={selectedFilters.priceRange}
            onValueChange={handlePriceChange}
            max={2000}
            min={0}
            step={50}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${selectedFilters.priceRange[0]}</span>
            <span>${selectedFilters.priceRange[1]}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Storage</h3>
        <div className="space-y-3">
          {filters.storage.map(storage => (
            <div key={storage} className="flex items-center space-x-2">
              <Checkbox
                id={`storage-${storage}`}
                checked={selectedFilters.storage.includes(storage)}
                onCheckedChange={(checked) => 
                  handleCheckboxChange('storage', storage, checked as boolean)
                }
              />
              <Label htmlFor={`storage-${storage}`}>{storage}</Label>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Colors</h3>
        <div className="space-y-3">
          {filters.colors.map(color => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={selectedFilters.colors.includes(color)}
                onCheckedChange={(checked) => 
                  handleCheckboxChange('colors', color, checked as boolean)
                }
              />
              <Label htmlFor={`color-${color}`}>{color}</Label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FilterSidebar;