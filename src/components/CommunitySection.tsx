
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserGroupIcon, ChatBubbleLeftRightIcon, StarIcon } from "@heroicons/react/24/outline";

const CommunitySection = () => {
  return (
    <section id="community" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-poppins font-bold">
                Join a community that 
                <span className="bg-ignis-gradient bg-clip-text text-transparent"> shares </span>
                your fire
              </h2>
              <p className="text-xl font-opensans text-gray-600 leading-relaxed">
                Connect with like-minded individuals who share your passions. From adventure planning 
                to creative collaborations, our community is where connections ignite possibilities.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-ignis-gradient rounded-lg flex items-center justify-center">
                  <UserGroupIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-roboto font-bold text-lg mb-2">Lifestyle Groups</h3>
                  <p className="font-opensans text-gray-600">
                    Join specialized groups based on your interests and lifestyle segment
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-ignis-gradient rounded-lg flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-roboto font-bold text-lg mb-2">Exclusive Events</h3>
                  <p className="font-opensans text-gray-600">
                    Access member-only events, workshops, and meetups in your area
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-ignis-gradient rounded-lg flex items-center justify-center">
                  <StarIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-roboto font-bold text-lg mb-2">Member Rewards</h3>
                  <p className="font-opensans text-gray-600">
                    Earn points for community participation and redeem for exclusive perks
                  </p>
                </div>
              </div>
            </div>

            <Button className="bg-ignis-gradient hover:opacity-90 text-white font-roboto px-8 py-4 text-lg">
              Explore Community
            </Button>
          </div>

          {/* Right Content - Community Cards */}
          <div className="space-y-6">
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-32 bg-gradient-to-r from-green-400 to-blue-500 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-poppins font-bold">Adventure Seekers</h4>
                  <p className="text-sm opacity-90">2,847 members</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="font-opensans text-gray-600 text-sm">
                  "Planning a weekend hiking trip to the mountains. Who's in? 🏔️"
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 bg-ignis-gradient rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="text-xs font-roboto text-gray-500">24 replies</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-32 bg-gradient-to-r from-purple-400 to-pink-500 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-poppins font-bold">Creative Professionals</h4>
                  <p className="text-sm opacity-90">1,532 members</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="font-opensans text-gray-600 text-sm">
                  "Just finished editing this amazing sunset timelapse using the new editing suite! 🎬"
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-6 h-6 bg-ignis-gradient rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="text-xs font-roboto text-gray-500">18 replies</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-32 bg-gradient-to-r from-blue-400 to-cyan-500 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-poppins font-bold">Tech Innovators</h4>
                  <p className="text-sm opacity-90">3,201 members</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="font-opensans text-gray-600 text-sm">
                  "PulseOS beta is incredible! The customization options are next level 🚀"
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-6 h-6 bg-ignis-gradient rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="text-xs font-roboto text-gray-500">42 replies</span>
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
