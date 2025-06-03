
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserGroupIcon, ChatBubbleLeftRightIcon, StarIcon } from "@heroicons/react/24/outline";

const CommunitySection = () => {
  return (
    <section id="community" className="py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-poppins font-black leading-tight tracking-tight">
                Join a community that 
                <span className="bg-ignis-gradient bg-clip-text text-transparent block mt-2"> shares </span>
                <span className="block mt-2">your fire</span>
              </h2>
              <p className="text-xl lg:text-2xl font-opensans text-slate-600 leading-relaxed font-light">
                Connect with like-minded individuals who share your passions. From adventure planning 
                to creative collaborations, our community is where connections ignite possibilities.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-ignis-gradient rounded-2xl flex items-center justify-center shadow-xl">
                  <UserGroupIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-2xl mb-3">Lifestyle Groups</h3>
                  <p className="font-opensans text-slate-600 text-lg leading-relaxed">
                    Join specialized groups based on your interests and lifestyle segment
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-ignis-gradient rounded-2xl flex items-center justify-center shadow-xl">
                  <ChatBubbleLeftRightIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-2xl mb-3">Exclusive Events</h3>
                  <p className="font-opensans text-slate-600 text-lg leading-relaxed">
                    Access member-only events, workshops, and meetups in your area
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-ignis-gradient rounded-2xl flex items-center justify-center shadow-xl">
                  <StarIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-2xl mb-3">Member Rewards</h3>
                  <p className="font-opensans text-slate-600 text-lg leading-relaxed">
                    Earn points for community participation and redeem for exclusive perks
                  </p>
                </div>
              </div>
            </div>

            <Button className="bg-ignis-gradient hover:opacity-90 text-white font-roboto px-10 py-5 text-lg rounded-xl shadow-xl shadow-ignis-purple/30 animate-glow">
              Explore Community
            </Button>
          </div>

          {/* Right Content - Premium Community Cards */}
          <div className="space-y-8">
            <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl bg-white/80 backdrop-blur-sm">
              <div className="h-40 bg-gradient-to-br from-emerald-500 to-teal-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="font-poppins font-bold text-xl">Adventure Seekers</h4>
                  <p className="text-sm opacity-90 font-opensans">2,847 members</p>
                </div>
                <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white font-poppins font-bold">
                  🏔️
                </div>
              </div>
              <CardContent className="p-6">
                <p className="font-opensans text-slate-600 leading-relaxed mb-4">
                  "Planning a weekend hiking trip to the mountains. Who's in? The weather looks perfect!"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 bg-ignis-gradient rounded-full border-2 border-white shadow-lg"></div>
                    ))}
                  </div>
                  <span className="text-sm font-roboto text-slate-500 font-medium">24 replies</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl bg-white/80 backdrop-blur-sm">
              <div className="h-40 bg-gradient-to-br from-violet-500 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="font-poppins font-bold text-xl">Creative Professionals</h4>
                  <p className="text-sm opacity-90 font-opensans">1,532 members</p>
                </div>
                <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white font-poppins font-bold">
                  🎬
                </div>
              </div>
              <CardContent className="p-6">
                <p className="font-opensans text-slate-600 leading-relaxed mb-4">
                  "Just finished editing this amazing sunset timelapse using the new editing suite!"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 bg-ignis-gradient rounded-full border-2 border-white shadow-lg"></div>
                    ))}
                  </div>
                  <span className="text-sm font-roboto text-slate-500 font-medium">18 replies</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl bg-white/80 backdrop-blur-sm">
              <div className="h-40 bg-gradient-to-br from-blue-500 to-cyan-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="font-poppins font-bold text-xl">Tech Innovators</h4>
                  <p className="text-sm opacity-90 font-opensans">3,201 members</p>
                </div>
                <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white font-poppins font-bold">
                  🚀
                </div>
              </div>
              <CardContent className="p-6">
                <p className="font-opensans text-slate-600 leading-relaxed mb-4">
                  "PulseOS beta is incredible! The customization options are next level"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-8 h-8 bg-ignis-gradient rounded-full border-2 border-white shadow-lg"></div>
                    ))}
                  </div>
                  <span className="text-sm font-roboto text-slate-500 font-medium">42 replies</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
