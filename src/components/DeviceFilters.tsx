
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
  const lifestyles = [
    "Gaming & Streaming",
    "Photography & Film", 
    "Privacy & Security",
    "Rugged & Outdoor",
    "Premium Flagship",
    "AI-Powered"
  ];

  const manufacturers = [
    "Apple",
    "Samsung", 
    "ASUS",
    "Sony",
    "Nokia",
    "Librem"
  ];

  const priceRanges = [
    { label: "Under $500", value: "0-500" },
    { label: "$500 - $800", value: "500-800" },
    { label: "$800 - $1200", value: "800-1200" },
    { label: "Over $1200", value: "1200+" }
  ];

  const storageOptions = ["128GB", "256GB", "512GB", "1TB"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-normal">Lifestyle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {lifestyles.map((lifestyle) => (
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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-normal">Manufacturer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {manufacturers.map((manufacturer) => (
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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-normal">Storage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {storageOptions.map((storage) => (
            <div key={storage} className="flex items-center space-x-2">
              <Checkbox
                id={storage}
                checked={filters.storage === storage}
                onCheckedChange={(checked) => 
                  onFilterChange('storage', checked ? storage : '')
                }
              />
              <Label 
                htmlFor={storage}
                className="text-sm font-light cursor-pointer"
              >
                {storage}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceFilters;
