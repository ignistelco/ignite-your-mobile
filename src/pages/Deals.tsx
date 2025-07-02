
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Deals = () => {
  const featuredDeals = [
    {
      title: "Limited Time Offer",
      subtitle: "Save 50% on Your First 6 Months",
      description: "Get premium connectivity at half the price",
      cta: "Claim Offer",
      background: "bg-ignis-gradient"
    },
    {
      title: "Bundle & Save",
      subtitle: "Device + Plan Combo",
      description: "Save up to $200 when you bundle",
      cta: "Shop Bundles",
      background: "bg-gradient-to-r from-ignis-orange to-ignis-purple"
    }
  ];

  const dealCards = [
    {
      title: "Student Discount",
      discount: "25% OFF",
      description: "Valid student ID required",
      originalPrice: "$25",
      salePrice: "$18.75",
      badge: "Student Deal"
    },
    {
      title: "Family Plan Special",
      discount: "4th Line FREE",
      description: "Add family members and save",
      originalPrice: "$100",
      salePrice: "$75",
      badge: "Family Offer"
    },
    {
      title: "Senior Discount",
      discount: "20% OFF",
      description: "Ages 55+ qualify",
      originalPrice: "$25",
      salePrice: "$20",
      badge: "Senior Deal"
    },
    {
      title: "Military Discount",
      discount: "30% OFF",
      description: "Active duty & veterans",
      originalPrice: "$35",
      salePrice: "$24.50",
      badge: "Military"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6">
              <span className="font-bold">Exclusive</span> <span className="font-normal">Deals</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Save big on premium plans and devices
            </p>
          </div>

          {/* Featured Banner Deals */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredDeals.map((deal, index) => (
              <div key={index} className={`${deal.background} rounded-3xl p-8 text-white relative overflow-hidden`}>
                <div className="relative z-10">
                  <h2 className="text-3xl font-light mb-2">{deal.title}</h2>
                  <h3 className="text-4xl font-bold mb-4">{deal.subtitle}</h3>
                  <p className="text-lg font-light mb-6 opacity-90">{deal.description}</p>
                  <Button variant="secondary" size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                    {deal.cta}
                  </Button>
                </div>
                <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full"></div>
              </div>
            ))}
          </div>

          {/* Deal Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealCards.map((deal, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-ignis-gradient text-white">
                    {deal.badge}
                  </Badge>
                  
                  <h3 className="text-xl font-normal text-gray-900 mb-2">
                    {deal.title}
                  </h3>
                  
                  <div className="text-2xl font-bold text-ignis-purple mb-2">
                    {deal.discount}
                  </div>
                  
                  <p className="text-sm text-gray-600 font-light mb-4">
                    {deal.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-gray-500 line-through">
                      Was {deal.originalPrice}/month
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      Now {deal.salePrice}/month
                    </div>
                  </div>

                  <Button className="w-full bg-ignis-gradient hover:opacity-90 text-white font-light">
                    Get Deal
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Deals;
