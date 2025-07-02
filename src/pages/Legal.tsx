
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Legal = () => {
  const legalSections = [
    {
      title: "General Terms & Conditions",
      content: "Our comprehensive terms and conditions govern your use of Ignis Mobile services. By using our services, you agree to these terms which cover service usage, billing, limitations, and customer responsibilities."
    },
    {
      title: "Acceptable Use Policy",
      content: "This policy outlines acceptable and prohibited uses of our network and services. We maintain these guidelines to ensure optimal service for all customers and compliance with regulatory requirements."
    },
    {
      title: "Product Terms",
      content: "Specific terms applicable to individual products and services, including device warranties, plan limitations, feature availability, and product-specific conditions."
    },
    {
      title: "Social Media Terms of Service",
      content: "Guidelines for interacting with Ignis Mobile on social media platforms, including community standards, content policies, and acceptable communication practices."
    },
    {
      title: "Privacy Notice",
      content: "Our commitment to protecting your privacy. This notice explains how we collect, use, store, and protect your personal information in compliance with applicable privacy laws."
    },
    {
      title: "Phone Return Policy",
      content: "Detailed information about returning devices purchased from Ignis Mobile, including return timeframes, condition requirements, restocking fees, and refund processes."
    },
    {
      title: "30 Day Money Back Guarantee",
      content: "Our satisfaction guarantee allows you to try our service risk-free for 30 days. Learn about eligibility requirements, what's covered, and how to request a refund."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
              <span className="font-bold">Legal</span> <span className="font-normal">Information</span>
            </h1>
            <p className="text-xl text-gray-600 font-light">
              Important terms, policies, and legal information for Ignis Mobile services
            </p>
          </div>

          <div className="space-y-8">
            {legalSections.map((section, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-normal text-gray-900">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {section.content}
                  </p>
                  <div className="mt-4">
                    <button className="text-ignis-purple hover:text-ignis-teal font-light transition-colors">
                      Read Full Document →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl">
            <h2 className="text-2xl font-light text-gray-900 mb-4 text-center">
              <span className="font-bold">Questions</span> <span className="font-normal">About Our Policies?</span>
            </h2>
            <p className="text-gray-600 font-light text-center mb-6">
              Our customer support team is here to help clarify any legal or policy questions you may have.
            </p>
            <div className="text-center">
              <button className="bg-ignis-gradient hover:opacity-90 text-white font-light px-8 py-3 rounded-lg transition-opacity">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;
