
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search, ShoppingCart, MapPin, MessageCircle, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      {/* Top bar with service categories */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-8 text-sm font-light text-gray-700">
              <Link to="/pulseos" className="hover:text-ignis-purple transition-colors">PULSEOS</Link>
              <Link to="/business" className="hover:text-ignis-purple transition-colors">BUSINESS</Link>
              <Link to="/byod" className="hover:text-ignis-purple transition-colors">BRING YOUR OWN DEVICE</Link>
              <Link to="/internet" className="hover:text-ignis-purple transition-colors">INTERNET</Link>
            </div>
            
            {/* Phone number - far right */}
            <div className="text-sm font-light text-gray-700">
              844-MY-IGNIS
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Text Only - moved much further left with more space */}
          <div className="flex items-center mr-24">
            <Link to="/" className="text-2xl font-light text-gray-900">
              Ignis Mobile
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/plans" className="font-light text-gray-900 cursor-pointer hover:text-ignis-purple transition-colors">Plans</Link>
            <Link to="/devices" className="font-light text-gray-900 cursor-pointer hover:text-ignis-purple transition-colors">Devices</Link>
            <Link to="/deals" className="font-light text-gray-900 cursor-pointer hover:text-ignis-purple transition-colors">Deals</Link>
            <span className="font-light text-gray-900 cursor-pointer hover:text-ignis-purple transition-colors">Coverage</span>
            <Link to="/join-us" className="font-light text-gray-900 cursor-pointer hover:text-ignis-purple transition-colors">Join Us</Link>
          </nav>

          {/* Right side actions - moved to far right */}
          <div className="hidden lg:flex items-center space-x-4 ml-auto">
            <div className="flex items-center space-x-1 text-gray-700 hover:text-ignis-purple transition-colors cursor-pointer">
              <MapPin size={18} />
              <span className="font-light text-sm">Find a store</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-700 hover:text-ignis-purple transition-colors cursor-pointer">
              <MessageCircle size={18} />
              <span className="font-light text-sm">Contact & support</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-700 hover:text-ignis-purple transition-colors cursor-pointer">
              <ShoppingCart size={18} />
              <span className="font-light text-sm">Cart</span>
            </div>
            <Search size={18} className="text-gray-700 hover:text-ignis-purple transition-colors cursor-pointer" />
            <div className="flex items-center space-x-1 cursor-pointer">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-ignis-purple transition-colors font-light text-sm">
                <User size={16} />
                <span>My account</span>
              </button>
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
              <Link to="/plans" className="font-light text-gray-700">Plans</Link>
              <Link to="/devices" className="font-light text-gray-700">Devices</Link>
              <Link to="/deals" className="font-light text-gray-700">Deals</Link>
              <a href="#coverage" className="font-light text-gray-700">Coverage</a>
              <Link to="/join-us" className="font-light text-gray-700">Join Us</Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="font-light">Find a store</Button>
                <Button className="bg-ignis-gradient text-white font-light">My account</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
