
import { Button } from "@/components/ui/button";
import { DevicePhoneMobileIcon, FireIcon } from "@heroicons/react/24/outline";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-ignis-gradient rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-ignis-gradient rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-6 lg:px-12 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
          
          {/* Left Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-ignis-orange">
                <FireIcon className="h-7 w-7 animate-flame-pulse" />
                <span className="font-roboto font-medium text-lg tracking-wide">Ignite Your Lifestyle</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-poppins font-black leading-[0.9] tracking-tight">
                Mobile that 
                <span className="bg-ignis-gradient bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%] block mt-2">
                  ignites
                </span>
                <span className="block mt-2">your passions</span>
              </h1>
              
              <p className="text-xl lg:text-2xl font-opensans text-slate-600 leading-relaxed max-w-2xl font-light">
                Experience a mobile service that's as vibrant and dynamic as your lifestyle. 
                Curated device bundles, personalized plans, and a community built around your passions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button size="lg" className="bg-ignis-gradient hover:opacity-90 text-white font-roboto px-10 py-5 text-lg h-auto rounded-xl shadow-2xl shadow-ignis-purple/20 animate-glow">
                Discover Your Plan
              </Button>
              <Button size="lg" variant="outline" className="font-roboto px-10 py-5 text-lg h-auto rounded-xl border-2 border-slate-200 hover:border-ignis-purple/40 hover:bg-slate-50">
                View Devices
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="flex flex-wrap gap-12 pt-12">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-poppins font-black bg-ignis-gradient bg-clip-text text-transparent">8</div>
                <div className="font-opensans text-slate-500 font-medium tracking-wide">Lifestyle Segments</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-poppins font-black bg-ignis-gradient bg-clip-text text-transparent">24mo</div>
                <div className="font-opensans text-slate-500 font-medium tracking-wide">Flexible Plans</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-poppins font-black bg-ignis-gradient bg-clip-text text-transparent">99%</div>
                <div className="font-opensans text-slate-500 font-medium tracking-wide">Coverage</div>
              </div>
            </div>
          </div>

          {/* Right Content - Premium Phone Showcase */}
          <div className="relative flex justify-center">
            <div className="relative w-96 h-96 lg:w-[450px] lg:h-[450px]">
              {/* Enhanced Glow Effects */}
              <div className="absolute inset-0 bg-ignis-gradient rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute inset-4 bg-ignis-gradient rounded-full blur-2xl opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              {/* Premium Phone Container */}
              <div className="relative z-10 transform rotate-12 hover:rotate-6 transition-transform duration-1000 ease-out">
                <div className="w-72 h-96 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-[3rem] shadow-2xl mx-auto overflow-hidden border border-slate-700/50 backdrop-blur-sm">
                  {/* Enhanced Screen */}
                  <div className="m-4 h-[calc(100%-32px)] bg-black rounded-[2.5rem] relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-ignis-gradient opacity-95"></div>
                    
                    {/* Screen Content */}
                    <div className="relative z-10 p-8 text-white h-full flex flex-col justify-center">
                      <div className="text-center space-y-6">
                        <div className="relative">
                          <FireIcon className="h-16 w-16 mx-auto text-white animate-flame-pulse drop-shadow-lg" />
                          <div className="absolute inset-0 h-16 w-16 mx-auto bg-white/20 rounded-full blur-xl"></div>
                        </div>
                        <div>
                          <div className="font-poppins font-black text-2xl tracking-tight">Ignis Mobile</div>
                          <div className="font-opensans text-base opacity-90 font-light tracking-wide mt-2">Your lifestyle, amplified</div>
                        </div>
                        
                        {/* Premium UI Elements */}
                        <div className="space-y-3 mt-8">
                          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                            <div className="w-3/4 h-full bg-white/60 rounded-full animate-pulse"></div>
                          </div>
                          <div className="flex justify-between text-xs opacity-75">
                            <span>Connected</span>
                            <span>99% Coverage</span>
                          </div>
                        </div>
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
