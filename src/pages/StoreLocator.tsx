
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Navigation, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const StoreLocator = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // Mock store data - in real app, this would come from API
  const stores = [
    {
      id: 1,
      name: "Ignis Mobile - Downtown",
      address: "123 Main Street, Downtown, NY 10001",
      phone: "(555) 123-4567",
      hours: "Mon-Sat 10AM-8PM, Sun 12PM-6PM",
      services: ["Device Sales", "Repairs", "Account Support"],
      coordinates: [-74.006, 40.7128]
    },
    {
      id: 2,
      name: "Ignis Mobile - Midtown",
      address: "456 Broadway, Midtown, NY 10036",
      phone: "(555) 234-5678",
      hours: "Mon-Sat 9AM-9PM, Sun 11AM-7PM",
      services: ["Device Sales", "Business Solutions", "Tech Support"],
      coordinates: [-73.9857, 40.7589]
    },
    {
      id: 3,
      name: "Ignis Mobile - Brooklyn",
      address: "789 Atlantic Avenue, Brooklyn, NY 11238",
      phone: "(555) 345-6789",
      hours: "Mon-Fri 10AM-7PM, Sat-Sun 10AM-6PM",
      services: ["Device Sales", "Repairs", "BYOD Support"],
      coordinates: [-73.9442, 40.6782]
    }
  ];

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.006, 40.7128], // NYC coordinates
      zoom: 11
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add store markers
    stores.forEach(store => {
      if (map.current) {
        // Create marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.style.width = '30px';
        markerElement.style.height = '30px';
        markerElement.style.borderRadius = '50%';
        markerElement.style.background = 'linear-gradient(135deg, #8B5CF6, #06B6D4)';
        markerElement.style.border = '2px solid white';
        markerElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        markerElement.style.cursor = 'pointer';

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div class="p-2">
            <h3 class="font-normal text-gray-900 mb-1">${store.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${store.address}</p>
            <p class="text-sm text-gray-600 mb-2">${store.phone}</p>
            <p class="text-sm text-gray-600">${store.hours}</p>
          </div>`
        );

        // Add marker to map
        new mapboxgl.Marker(markerElement)
          .setLngLat(store.coordinates as [number, number])
          .setPopup(popup)
          .addTo(map.current);
      }
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  const handleSearch = () => {
    // In real app, this would geocode the search location and update map
    console.log('Searching for stores near:', searchLocation);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
              <span className="font-bold">Find a</span> <span className="font-normal">Store</span>
            </h1>
            <p className="text-xl text-gray-600 font-light">
              Visit one of our locations for personalized service and support
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <Card className="border-0 shadow-lg max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter your city, state, or ZIP code"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <Button onClick={handleSearch} className="bg-ignis-gradient text-white h-12 px-6">
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </Button>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="ghost" className="font-light text-ignis-purple">
                    <Navigation className="h-4 w-4 mr-2" />
                    Use My Current Location
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="lg:order-2">
              <Card className="border-0 shadow-lg h-96 lg:h-[600px]">
                <CardContent className="p-0 h-full">
                  {!mapboxToken ? (
                    <div className="h-full flex flex-col items-center justify-center bg-gray-50 rounded-lg">
                      <MapPin className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-normal text-gray-600 mb-2">Map Integration</h3>
                      <p className="text-gray-500 font-light text-center max-w-sm mb-4">
                        To view the interactive map, please add your Mapbox public token.
                      </p>
                      <div className="space-y-2 w-full max-w-sm px-4">
                        <Input
                          placeholder="Enter your Mapbox public token"
                          value={mapboxToken}
                          onChange={(e) => setMapboxToken(e.target.value)}
                        />
                        <p className="text-xs text-gray-400 font-light">
                          Get your token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-ignis-purple">mapbox.com</a>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div ref={mapContainer} className="h-full rounded-lg" />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Store List */}
            <div className="lg:order-1 space-y-6">
              <h2 className="text-2xl font-light text-gray-900">
                <span className="font-bold">Nearby</span> <span className="font-normal">Stores</span>
              </h2>
              
              {stores.map((store) => (
                <Card key={store.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="font-normal text-lg text-gray-900">
                          {store.name}
                        </CardTitle>
                        <div className="flex items-center text-gray-600 font-light mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{store.address}</span>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Open</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600 font-light">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{store.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600 font-light">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{store.hours}</span>
                      </div>
                      <div>
                        <h4 className="font-normal text-gray-900 mb-2">Services Available:</h4>
                        <div className="flex flex-wrap gap-2">
                          {store.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="font-light">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button className="bg-ignis-gradient text-white font-light flex-1">
                          Get Directions
                        </Button>
                        <Button variant="outline" className="font-light">
                          Call Store
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StoreLocator;
