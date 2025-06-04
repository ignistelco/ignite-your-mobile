
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        
        {/* Top Section */}
        <div className="flex justify-center items-center py-8 mb-12 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="text-2xl animate-flame-pulse">🔥</div>
            <h2 className="text-2xl font-light text-white">What ignites your passion?</h2>
            <div className="text-2xl animate-flame-pulse" style={{ animationDelay: '0.5s' }}>🔥</div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-light bg-ignis-gradient bg-clip-text text-transparent">
                Ignis Mobile
              </span>
            </div>
            <p className="font-light text-gray-400 max-w-xs">
              Redefining mobile experiences with passion, innovation, and community at the heart of everything we do.
            </p>
          </div>

          {/* Switch to Ignis */}
          <div className="space-y-4">
            <h3 className="font-normal text-lg">Switch to Ignis</h3>
            <ul className="space-y-2 font-light text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track your order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">What is Sim/Esim</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Physical Sim Activation</a></li>
            </ul>
          </div>

          {/* Legal and Admin */}
          <div className="space-y-4">
            <div className="space-y-2 font-light text-gray-400">
              <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block hover:text-white transition-colors">Return Policy</a>
              <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="admin-portal" className="border-gray-700">
                <AccordionTrigger className="font-normal text-lg hover:no-underline">
                  Admin Portal
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 font-light text-gray-400 pl-4">
                    <li><a href="#" className="hover:text-white transition-colors">API Management</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">CMS Management</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">ADD/Remove Devices</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">ADD/Remove Plans</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Add/Remove Deals</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Help guides</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Support chat</a></li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* User Management & Marketing */}
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="user-management" className="border-gray-700">
                <AccordionTrigger className="font-normal text-lg hover:no-underline">
                  Manage Users
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 font-light text-gray-400 pl-4">
                    <li><a href="#" className="hover:text-white transition-colors">Add/Delete Users</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Activate/Deactivate Service</a></li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="marketing" className="border-gray-700">
                <AccordionTrigger className="font-normal text-lg hover:no-underline">
                  Marketing
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 font-light text-gray-400 pl-4">
                    <li><a href="#" className="hover:text-white transition-colors">Manage social media hyperlinks</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Resend marketing emails</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Pages</a></li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            
            {/* Copyright */}
            <div>
              <p className="font-light text-gray-400">
                © 2024 Ignis Mobile. All rights reserved.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
                <Facebook size={18} />
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
                <span className="text-sm font-normal">TT</span>
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
                <span className="text-sm font-normal">X</span>
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
                <Instagram size={18} />
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
                <span className="text-sm font-normal">TW</span>
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
                <span className="text-sm font-normal">SC</span>
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-ignis-gradient transition-colors cursor-pointer">
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
