
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DeviceGrid from "@/components/DeviceGrid";
import DeviceFilters from "@/components/DeviceFilters";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Devices = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    lifestyle: searchParams.get('lifestyle') || '',
    manufacturer: searchParams.get('manufacturer') || '',
    priceRange: searchParams.get('priceRange') || '',
    storage: searchParams.get('storage') || ''
  });

  useEffect(() => {
    // Update URL when filters change
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6">
              <span className="font-bold">Premium</span> <span className="font-normal">Devices</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Discover our curated selection of cutting-edge devices
            </p>
          </div>

          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <div className="w-1/4 min-w-[280px]">
              <DeviceFilters 
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Device Grid */}
            <div className="flex-1">
              <DeviceGrid filters={filters} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Devices;
