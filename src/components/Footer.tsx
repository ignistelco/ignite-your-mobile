
import { DevicePhoneMobileIcon, FireIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 bg-ignis-gradient rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-ignis-orange rounded-full"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 text-ignis-orange">
                  🔥
                </div>
              </div>
              <span className="text-xl font-poppins font-bold bg-ignis-gradient bg-clip-text text-transparent">
                Ignis Mobile
              </span>
            </div>
            <p className="font-opensans text-gray-400 max-w-xs">
              Redefining mobile experiences with passion, innovation, and community at the heart of everything we do.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
                <span className="text-sm">f</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
                <span className="text-sm">t</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
                <span className="text-sm">in</span>
              </div>
            </div>
          </div>

          {/* Plans */}
          <div className="space-y-4">
            <h3 className="font-roboto font-bold text-lg">Plans</h3>
            <ul className="space-y-2 font-opensans text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Spark (6 months)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ignite (12 months)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blaze (24 months)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compare Plans</a></li>
            </ul>
          </div>

          {/* Lifestyle */}
          <div className="space-y-4">
            <h3 className="font-roboto font-bold text-lg">Lifestyle</h3>
            <ul className="space-y-2 font-opensans text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Adventure Seekers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Creative Professionals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tech Innovators</a></li>
              <li><a href="#" className="hover:text-white transition-colors">All Segments</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-roboto font-bold text-lg">Support</h3>
            <ul className="space-y-2 font-opensans text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Device Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-opensans text-gray-400">
              © 2024 Ignis Mobile. All rights reserved.
            </p>
            <div className="flex space-x-6 font-opensans text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
