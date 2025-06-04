
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-purple-100 text-gray-800">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        
        {/* Top Section */}
        <div className="flex justify-center items-center py-8 mb-12 border-b border-purple-200">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-light text-gray-800">What ignites your passion?</h2>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-light text-gray-800">
                Ignis Mobile
              </span>
            </div>
            <p className="font-light text-gray-600 max-w-xs">
              Redefining mobile experiences with passion, innovation, and community at the heart of everything we do.
            </p>
          </div>

          {/* Switch to Ignis */}
          <div className="space-y-4">
            <h3 className="font-normal text-lg text-gray-800">Switch to Ignis</h3>
            <ul className="space-y-2 font-light text-gray-600">
              <li><a href="#" className="hover:text-gray-800 transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-gray-800 transition-colors">Help Guides</a></li>
              <li><a href="#" className="hover:text-gray-800 transition-colors">Track your order</a></li>
              <li><a href="#" className="hover:text-gray-800 transition-colors">What is Sim/Esim</a></li>
              <li><a href="#" className="hover:text-gray-800 transition-colors">Physical Sim Activation</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <div className="space-y-2 font-light text-gray-600">
              <a href="#" className="block hover:text-gray-800 transition-colors">Privacy Policy</a>
              <a href="#" className="block hover:text-gray-800 transition-colors">Return Policy</a>
              <a href="#" className="block hover:text-gray-800 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-purple-200">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            
            {/* Copyright and Admin Portal */}
            <div>
              <p className="font-light text-gray-600 mb-2">
                © 2024 Ignis Mobile. All rights reserved.
              </p>
              <a href="#" className="font-light text-gray-600 hover:text-gray-800 transition-colors text-sm">
                Admin Portal
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center hover:bg-purple-300 transition-colors cursor-pointer">
                <Facebook size={18} />
              </div>
              <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center hover:bg-purple-300 transition-colors cursor-pointer">
                <span className="text-sm font-normal">TT</span>
              </div>
              <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center hover:bg-purple-300 transition-colors cursor-pointer">
                <span className="text-sm font-normal">X</span>
              </div>
              <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center hover:bg-purple-300 transition-colors cursor-pointer">
                <Instagram size={18} />
              </div>
              <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center hover:bg-purple-300 transition-colors cursor-pointer">
                <span className="text-sm font-normal">TW</span>
              </div>
              <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center hover:bg-purple-300 transition-colors cursor-pointer">
                <span className="text-sm font-normal">SC</span>
              </div>
              <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center hover:bg-purple-300 transition-colors cursor-pointer">
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
