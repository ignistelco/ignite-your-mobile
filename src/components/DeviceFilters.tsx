
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDeviceModels } from "@/hooks/useDeviceModels";
import { useGigsDeviceModels } from "@/hooks/useGigsDeviceModels";
import { useMemo } from "react";

interface DeviceFiltersProps {
  filters: {
    lifestyle: string;
    manufacturer: string;
    priceRange: string;
    storage: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
}

const DeviceFilters = ({ filters, onFilterChange }: DeviceFiltersProps) => {
  const { data: devices } = useDeviceModels();
  const { data: gigsDevices } = useGigsDeviceModels();

  // Extract unique values from actual data
  const filterOptions = useMemo(() => {
    const lifestyles = new Set<string>();
    const manufacturers = new Set<string>();
    const storageOptions = new Set<number>();
    
    // Extract from device product models
    devices?.forEach(device => {
      const specs = device.specs as any;
      
      // Lifestyle/Category
      if (specs?.category) lifestyles.add(specs.category);
      if (specs?.lifestyle) lifestyles.add(specs.lifestyle);
      if (specs?.type) lifestyles.add(specs.type);
      
      // Manufacturer
      if (specs?.manufacturer) manufacturers.add(specs.manufacturer);
      if (specs?.brand) manufacturers.add(specs.brand);
      
      // Storage from variants
      device.device_product_model_variants?.forEach((variant: any) => {
        if (variant.storage_gb) storageOptions.add(variant.storage_gb);
      });
    });
    
    // Extract manufacturers from Gigs device models
    gigsDevices?.forEach(device => {
      if (device.brand) manufacturers.add(device.brand);
    });

    return {
      lifestyles: Array.from(lifestyles).sort(),
      manufacturers: Array.from(manufacturers).sort(),
      storageOptions: Array.from(storageOptions).sort((a, b) => a - b)
    };
  }, [devices, gigsDevices]);

  const priceRanges = [
    { label: "Under $500", value: "0-500" },
    { label: "$500 - $800", value: "500-800" },
    { label: "$800 - $1200", value: "800-1200" },
    { label: "Over $1200", value: "1200+" }
  ];

  return (
    <div className="space-y-6">
      {filterOptions.lifestyles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-normal">Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filterOptions.lifestyles.map((lifestyle) => (
              <div key={lifestyle} className="flex items-center space-x-2">
                <Checkbox
                  id={lifestyle}
                  checked={filters.lifestyle === lifestyle}
                  onCheckedChange={(checked) => 
                    onFilterChange('lifestyle', checked ? lifestyle : '')
                  }
                />
                <Label 
                  htmlFor={lifestyle}
                  className="text-sm font-light cursor-pointer"
                >
                  {lifestyle}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {filterOptions.manufacturers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-normal">Manufacturer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filterOptions.manufacturers.map((manufacturer) => (
              <div key={manufacturer} className="flex items-center space-x-2">
                <Checkbox
                  id={manufacturer}
                  checked={filters.manufacturer === manufacturer}
                  onCheckedChange={(checked) => 
                    onFilterChange('manufacturer', checked ? manufacturer : '')
                  }
                />
                <Label 
                  htmlFor={manufacturer}
                  className="text-sm font-light cursor-pointer"
                >
                  {manufacturer}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-normal">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={filters.priceRange}
            onValueChange={(value) => onFilterChange('priceRange', value)}
            className="space-y-3"
          >
            {priceRanges.map((range) => (
              <div key={range.value} className="flex items-center space-x-2">
                <RadioGroupItem value={range.value} id={range.value} />
                <Label 
                  htmlFor={range.value}
                  className="text-sm font-light cursor-pointer"
                >
                  {range.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {filterOptions.storageOptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-normal">Storage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filterOptions.storageOptions.map((storage) => (
              <div key={storage} className="flex items-center space-x-2">
                <Checkbox
                  id={`${storage}GB`}
                  checked={filters.storage === `${storage}GB`}
                  onCheckedChange={(checked) => 
                    onFilterChange('storage', checked ? `${storage}GB` : '')
                  }
                />
                <Label 
                  htmlFor={`${storage}GB`}
                  className="text-sm font-light cursor-pointer"
                >
                  {storage}GB
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DeviceFilters;
