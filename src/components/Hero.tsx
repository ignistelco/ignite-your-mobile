
import { Button } from "@/components/ui/button";
import { DevicePhoneMobileIcon, FireIcon } from "@heroicons/react/24/outline";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white via-ignis-gradient-subtle to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-flame-pattern opacity-30"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-ignis-orange">
                <FireIcon className="h-6 w-6 animate-flame-pulse" />
                <span className="font-roboto font-medium">Ignite Your Lifestyle</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-poppins font-bold leading-tight">
                Mobile that 
                <span className="bg-ignis-gradient bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                  {" "}ignites{" "}
                </span>
                your passions
              </h1>
              
              <p className="text-xl font-opensans text-gray-600 leading-relaxed max-w-xl">
                Experience a mobile service that's as vibrant and dynamic as your lifestyle. 
                Curated device bundles, personalized plans, and a community built around your passions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-ignis-gradient hover:opacity-90 text-white font-roboto px-8 py-4 text-lg animate-glow">
                Discover Your Plan
              </Button>
              <Button size="lg" variant="outline" className="font-roboto px-8 py-4 text-lg border-2 border-ignis-purple/20 hover:border-ignis-purple/40">
                View Devices
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-poppins font-bold bg-ignis-gradient bg-clip-text text-transparent">8</div>
                <div className="font-opensans text-gray-600">Lifestyle Segments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-poppins font-bold bg-ignis-gradient bg-clip-text text-transparent">24mo</div>
                <div className="font-opensans text-gray-600">Flexible Plans</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-poppins font-bold bg-ignis-gradient bg-clip-text text-transparent">99%</div>
                <div className="font-opensans text-gray-600">Coverage</div>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Showcase */}
          <div className="relative">
            <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-ignis-gradient rounded-full blur-3xl opacity-20 animate-pulse"></div>
              
              {/* Phone Container */}
              <div className="relative z-10 transform rotate-12 hover:rotate-6 transition-transform duration-700">
                <div className="w-64 h-80 bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl shadow-2xl mx-auto overflow-hidden border border-gray-700">
                  {/* Screen */}
                  <div className="m-3 h-[calc(100%-24px)] bg-black rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-ignis-gradient opacity-90"></div>
                    <div className="relative z-10 p-6 text-white">
                      <div className="text-center space-y-4 mt-16">
                        <FireIcon className="h-12 w-12 mx-auto text-white animate-flame-pulse" />
                        <div className="font-poppins font-bold text-xl">Ignis Mobile</div>
                        <div className="font-opensans text-sm opacity-90">Your lifestyle, amplified</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
