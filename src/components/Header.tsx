
import { DevicePhoneMobileIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-8 h-8 bg-ignis-gradient rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-ignis-orange rounded-full animate-flame-pulse"></div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 text-ignis-orange">
                🔥
              </div>
            </div>
            <span className="text-2xl font-poppins font-bold bg-ignis-gradient bg-clip-text text-transparent">
              Ignis Mobile
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#plans" className="font-roboto text-gray-700 hover:text-ignis-purple transition-colors">Plans</a>
            <a href="#devices" className="font-roboto text-gray-700 hover:text-ignis-purple transition-colors">Devices</a>
            <a href="#lifestyle" className="font-roboto text-gray-700 hover:text-ignis-purple transition-colors">Lifestyle</a>
            <a href="#community" className="font-roboto text-gray-700 hover:text-ignis-purple transition-colors">Community</a>
            <a href="#support" className="font-roboto text-gray-700 hover:text-ignis-purple transition-colors">Support</a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="font-roboto">
              Sign In
            </Button>
            <Button className="bg-ignis-gradient hover:opacity-90 text-white font-roboto px-6 animate-glow">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Bars3Icon className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-4">
              <a href="#plans" className="font-roboto text-gray-700">Plans</a>
              <a href="#devices" className="font-roboto text-gray-700">Devices</a>
              <a href="#lifestyle" className="font-roboto text-gray-700">Lifestyle</a>
              <a href="#community" className="font-roboto text-gray-700">Community</a>
              <a href="#support" className="font-roboto text-gray-700">Support</a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="font-roboto">Sign In</Button>
                <Button className="bg-ignis-gradient text-white font-roboto">Get Started</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
