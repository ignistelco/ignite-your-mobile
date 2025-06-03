
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 bg-ignis-gradient rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-ignis-orange rounded-full animate-flame-pulse"></div>
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
          </div>

          {/* Switch to Ignis */}
          <div className="space-y-4">
            <h3 className="font-roboto font-bold text-lg">Switch to Ignis</h3>
            <ul className="space-y-2 font-opensans text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track your order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">What is Sim/Esim</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Physical Sim Activation</a></li>
            </ul>
          </div>

          {/* Admin Portal */}
          <div className="space-y-4">
            <h3 className="font-roboto font-bold text-lg">Admin Portal</h3>
            <ul className="space-y-2 font-opensans text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">API Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CMS Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ADD/Remove Devices</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ADD/Remove Plans</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Add/Remove Deals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support chat</a></li>
            </ul>
          </div>

          {/* User Management */}
          <div className="space-y-4">
            <h3 className="font-roboto font-bold text-lg">Manage Users</h3>
            <ul className="space-y-2 font-opensans text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Add/Delete Users</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Activate/Deactivate Service</a></li>
            </ul>
          </div>

          {/* Marketing */}
          <div className="space-y-4">
            <h3 className="font-roboto font-bold text-lg">Marketing</h3>
            <ul className="space-y-2 font-opensans text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Manage social media hyperlinks</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Resend marketing emails</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pages</a></li>
            </ul>
          </div>
        </div>

        {/* Center Section with Animated Flame */}
        <div className="flex justify-center items-center py-8 border-t border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="text-2xl animate-flame-pulse">🔥</div>
            <h2 className="text-2xl font-poppins font-bold text-white">What ignites your passion?</h2>
            <div className="text-2xl animate-flame-pulse" style={{ animationDelay: '0.5s' }}>🔥</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            
            {/* Copyright and Legal Links */}
            <div className="flex flex-col space-y-4">
              <p className="font-opensans text-gray-400">
                © 2024 Ignis Mobile. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-6 font-opensans text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Return Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
                <Facebook size={18} />
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
                <span className="text-sm font-bold">TT</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
                <span className="text-sm font-bold">X</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
                <Instagram size={18} />
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
                <span className="text-sm font-bold">TW</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
                <span className="text-sm font-bold">SC</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
                <Linkedin size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
