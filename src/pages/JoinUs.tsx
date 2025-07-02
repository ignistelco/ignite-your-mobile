
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const JoinUs = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle waitlist signup
    setSubmitted(true);
  };

  const benefits = [
    "First access to PulseOS devices",
    "Exclusive early bird pricing",
    "Beta testing opportunities",
    "Direct feedback to our team",
    "Special launch day perks"
  ];

  const programs = [
    {
      title: "Franchise Retailer",
      description: "Partner with us to bring Ignis Mobile to your community",
      cta: "Learn More"
    },
    {
      title: "Affiliate Marketing Program",
      description: "Earn commissions by promoting our services",
      cta: "Join Program"
    },
    {
      title: "Influencer Program",
      description: "Collaborate with us to showcase mobile innovation",
      cta: "Apply Now"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6">
              <span className="font-bold">Join</span> <span className="font-normal">Our Journey</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Be part of the mobile revolution with PulseOS and Ignis Mobile
            </p>
          </div>

          {/* PulseOS Waitlist Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-ignis-purple/5 to-ignis-teal/5">
              <CardHeader className="text-center pb-8">
                <Badge className="mx-auto mb-4 bg-ignis-gradient text-white">
                  Coming Soon
                </Badge>
                <CardTitle className="text-3xl font-light text-gray-900 mb-4">
                  PulseOS Device Waitlist
                </CardTitle>
                <p className="text-lg text-gray-600 font-light">
                  Get early access to revolutionary mobile operating system devices
                </p>
              </CardHeader>
              
              <CardContent className="px-8 pb-8">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 h-12 text-lg"
                      />
                      <Button 
                        type="submit"
                        size="lg"
                        className="bg-ignis-gradient hover:opacity-90 text-white font-light px-8"
                      >
                        Join Waitlist
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-2xl font-light text-ignis-purple mb-4">🎉</div>
                    <h3 className="text-xl font-normal text-gray-900 mb-2">You're on the list!</h3>
                    <p className="text-gray-600 font-light">We'll notify you when PulseOS devices are available.</p>
                  </div>
                )}

                <div className="mt-8">
                  <h4 className="font-normal text-lg text-gray-900 mb-4 text-center">What you'll get:</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center text-gray-700 font-light">
                        <div className="w-2 h-2 bg-ignis-purple rounded-full mr-3"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Partnership Programs */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                <span className="font-bold">Partnership</span> <span className="font-normal">Programs</span>
              </h2>
              <p className="text-lg text-gray-600 font-light">
                Grow with us through our various partnership opportunities
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-normal text-gray-900 mb-4">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 font-light mb-6">
                      {program.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-ignis-purple text-ignis-purple hover:bg-ignis-purple hover:text-white font-light"
                    >
                      {program.cta}
                    </Button>
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

export default JoinUs;
