
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search, ShoppingCart, MapPin, MessageCircle, User, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      {/* Top bar with service categories */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center h-10 space-x-8 text-sm font-roboto text-gray-700">
            <a href="#" className="hover:text-ignis-purple transition-colors">WIRELESS</a>
            <a href="#" className="hover:text-ignis-purple transition-colors">BUSINESS</a>
            <a href="#" className="hover:text-ignis-purple transition-colors">PREPAID</a>
            <a href="#" className="hover:text-ignis-purple transition-colors">INTERNET</a>
          </div>
        </div>
      </div>

      {/* Main header */}
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
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-1 cursor-pointer hover:text-ignis-purple transition-colors">
              <span className="font-roboto text-gray-900">Plans</span>
              <ChevronDown size={16} />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-ignis-purple transition-colors">
              <span className="font-roboto text-gray-900">Phones & devices</span>
              <ChevronDown size={16} />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-ignis-purple transition-colors">
              <span className="font-roboto text-gray-900">Deals</span>
              <ChevronDown size={16} />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-ignis-purple transition-colors">
              <span className="font-roboto text-gray-900">Coverage</span>
              <ChevronDown size={16} />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-ignis-purple transition-colors">
              <span className="font-roboto text-gray-900">Join Us</span>
              <ChevronDown size={16} />
            </div>
          </nav>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-700 hover:text-ignis-purple transition-colors cursor-pointer">
              <MapPin size={18} />
              <span className="font-roboto text-sm">Find a store</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-700 hover:text-ignis-purple transition-colors cursor-pointer">
              <MessageCircle size={18} />
              <span className="font-roboto text-sm">Contact & support</span>
              <ChevronDown size={14} />
            </div>
            <div className="flex items-center space-x-1 text-gray-700 hover:text-ignis-purple transition-colors cursor-pointer">
              <ShoppingCart size={18} />
              <span className="font-roboto text-sm">Cart</span>
            </div>
            <Search size={18} className="text-gray-700 hover:text-ignis-purple transition-colors cursor-pointer" />
            <div className="flex items-center space-x-1 cursor-pointer">
              <Button className="bg-ignis-gradient hover:opacity-90 text-white font-roboto px-4 py-2 text-sm">
                <User size={16} className="mr-2" />
                My account
                <ChevronDown size={14} className="ml-1" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-700"></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-4">
              <a href="#plans" className="font-roboto text-gray-700">Plans</a>
              <a href="#devices" className="font-roboto text-gray-700">Phones & devices</a>
              <a href="#deals" className="font-roboto text-gray-700">Deals</a>
              <a href="#coverage" className="font-roboto text-gray-700">Coverage</a>
              <a href="#join" className="font-roboto text-gray-700">Join Us</a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="font-roboto">Find a store</Button>
                <Button className="bg-ignis-gradient text-white font-roboto">My account</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
