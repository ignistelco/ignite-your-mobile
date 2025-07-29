import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductGrid from "@/components/shop/ProductGrid";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List, Filter } from "lucide-react";
import { useShopFilters } from "@/hooks/useShopFilters";
import { useShopDevices } from "@/hooks/useShopDevices";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const DevicesPage = () => {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  
  const filters = useMemo(() => ({
    categories: searchParams.getAll('category'),
    manufacturers: searchParams.getAll('manufacturer'),
    colors: searchParams.getAll('color'),
    storage: searchParams.getAll('storage'),
    priceRange: [
      parseInt(searchParams.get('minPrice') || '0'),
      parseInt(searchParams.get('maxPrice') || '2000')
    ] as [number, number],
    search: searchParams.get('search') || '',
    sortBy
  }), [searchParams, sortBy]);

  const { data: filterOptions, isLoading: filtersLoading } = useShopFilters();
  const { data: devicesData, isLoading: devicesLoading } = useShopDevices(filters);

  const handleFilterChange = (newFilters: any) => {
    // Filters are managed by URL sync in FilterSidebar
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-6xl font-light mb-4">
              <span className="font-bold">Premium</span> <span className="font-normal">Devices</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl font-light">
              Discover our curated selection of cutting-edge devices
            </p>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              {/* Mobile Filter Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter size={16} className="mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <div className="p-6">
                    <h2 className="font-semibold mb-4">Filters</h2>
                    {filterOptions && (
                      <FilterSidebar
                        filters={filterOptions}
                        onFilterChange={handleFilterChange}
                      />
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {devicesData && (
                <span className="text-sm text-muted-foreground">
                  {devicesData.total} devices found
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="hidden md:flex border rounded-md">
                <Button
                  variant={view === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setView('grid')}
                  className="rounded-r-none"
                >
                  <Grid size={16} />
                </Button>
                <Button
                  variant={view === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setView('list')}
                  className="rounded-l-none"
                >
                  <List size={16} />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              {filterOptions && (
                <FilterSidebar
                  filters={filterOptions}
                  onFilterChange={handleFilterChange}
                />
              )}
            </div>

            {/* Product Grid */}
            <div className="flex-1 min-w-0">
              <ProductGrid
                devices={devicesData?.devices || []}
                loading={devicesLoading}
                view={view}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DevicesPage;