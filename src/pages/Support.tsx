
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Package, HelpCircle, Phone, MessageCircle, Mail } from "lucide-react";

const Support = () => {
  const supportSections = [
    {
      title: "Help Guides",
      icon: HelpCircle,
      description: "Find answers to common questions and step-by-step guides",
      items: [
        "Getting Started with Ignis Mobile",
        "Setting up your device",
        "Managing your account",
        "Troubleshooting network issues",
        "Understanding your bill"
      ]
    },
    {
      title: "Track Your Order",
      icon: Package,
      description: "Check the status of your recent orders and shipments",
      content: (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input placeholder="Enter your order number" className="flex-1" />
            <Button className="bg-ignis-gradient text-white">Track</Button>
          </div>
          <p className="text-gray-600 text-sm font-light">
            You can find your order number in your confirmation email or account dashboard.
          </p>
        </div>
      )
    },
    {
      title: "What is SIM/eSIM",
      icon: Phone,
      description: "Learn about SIM cards and eSIM technology",
      items: [
        "Physical SIM vs eSIM differences",
        "Compatible devices for eSIM",
        "How to activate your eSIM",
        "Switching between SIM types",
        "International roaming with eSIM"
      ]
    },
    {
      title: "Physical SIM Activation",
      icon: Phone,
      description: "Step-by-step guide to activate your physical SIM card",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-normal text-gray-900 mb-2">Activation Steps:</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 font-light">
              <li>Insert your SIM card into your device</li>
              <li>Power on your device and connect to Wi-Fi</li>
              <li>Visit ignis.com/activate or call 844-MY-IGNIS</li>
              <li>Enter your SIM card number (found on the card)</li>
              <li>Follow the on-screen instructions</li>
            </ol>
          </div>
          <Button className="bg-ignis-gradient text-white">Start Activation</Button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
              <span className="font-bold">Contact</span> <span className="font-normal">& Support</span>
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
              We're here to help you get the most out of your Ignis Mobile experience
            </p>
          </div>

          {/* Quick Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <Phone className="h-12 w-12 text-ignis-purple mx-auto mb-4" />
                <h3 className="font-normal text-lg text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 font-light mb-4">844-MY-IGNIS</p>
                <p className="text-sm text-gray-500 font-light">Mon-Fri 8AM-8PM EST</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <MessageCircle className="h-12 w-12 text-ignis-purple mx-auto mb-4" />
                <h3 className="font-normal text-lg text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 font-light mb-4">Chat with our experts</p>
                <Button className="bg-ignis-gradient text-white font-light">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <Mail className="h-12 w-12 text-ignis-purple mx-auto mb-4" />
                <h3 className="font-normal text-lg text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 font-light mb-4">Get help via email</p>
                <Button variant="outline" className="font-light">Send Email</Button>
              </CardContent>
            </Card>
          </div>

          {/* Support Sections */}
          <div className="space-y-8">
            {supportSections.map((section, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <section.icon className="h-6 w-6 text-ignis-purple" />
                    <CardTitle className="text-xl font-normal text-gray-900">
                      {section.title}
                    </CardTitle>
                  </div>
                  <p className="text-gray-600 font-light">{section.description}</p>
                </CardHeader>
                <CardContent>
                  {section.content ? (
                    section.content
                  ) : (
                    <ul className="space-y-2">
                      {section.items?.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-ignis-purple rounded-full flex-shrink-0"></div>
                          <span className="text-gray-600 font-light hover:text-ignis-purple cursor-pointer transition-colors">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="mt-16">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-light text-gray-900">
                  <span className="font-bold">Still Need</span> <span className="font-normal">Help?</span>
                </CardTitle>
                <p className="text-gray-600 font-light">Send us a message and we'll get back to you</p>
              </CardHeader>
              <CardContent className="max-w-2xl mx-auto">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                  </div>
                  <Input placeholder="Email Address" type="email" />
                  <Input placeholder="Phone Number" />
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">Subject</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Select a topic</option>
                      <option>Billing Question</option>
                      <option>Technical Support</option>
                      <option>Account Management</option>
                      <option>Device Issue</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <Textarea placeholder="How can we help you?" rows={4} />
                  <Button className="w-full bg-ignis-gradient text-white font-light">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
