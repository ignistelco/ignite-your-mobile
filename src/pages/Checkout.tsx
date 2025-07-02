
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, Truck, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

const Checkout = () => {
  const [step, setStep] = useState(1);
  
  // Mock cart data - in real app, this would come from cart context/state
  const cartItems = [
    {
      id: 1,
      type: "plan",
      name: "Ignis Go",
      description: "15GB High-Speed Data",
      price: 25,
      quantity: 1
    },
    {
      id: 2,
      type: "device",
      name: "iPhone 15 Pro",
      description: "128GB, Natural Titanium",
      price: 999,
      quantity: 1
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  const [formData, setFormData] = useState({
    // Contact Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Payment
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // In real app, this would integrate with your checkout API
    console.log('Processing checkout...', formData);
    // Redirect to success page or show confirmation
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              <span className="font-bold">Secure</span> <span className="font-normal">Checkout</span>
            </h1>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Lock className="h-4 w-4" />
              <span className="font-light">Your information is protected with SSL encryption</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Contact Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-ignis-gradient text-white rounded-full flex items-center justify-center text-sm">1</div>
                    <span className="font-normal">Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-1">First Name</label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-1">Last Name</label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-1">Email Address</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-1">Phone Number</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Step 2: Shipping Address */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-ignis-gradient text-white rounded-full flex items-center justify-center text-sm">2</div>
                    <span className="font-normal">Shipping Address</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-1">Street Address</label>
                    <Input
                      value={formData.address1}
                      onChange={(e) => handleInputChange('address1', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-1">Apartment, Suite, etc. (Optional)</label>
                    <Input
                      value={formData.address2}
                      onChange={(e) => handleInputChange('address2', e.target.value)}
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-1">City</label>
                      <Input
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-1">State</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        required
                      >
                        <option value="">Select State</option>
                        <option value="NY">New York</option>
                        <option value="CA">California</option>
                        <option value="TX">Texas</option>
                        {/* Add more states */}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-1">ZIP Code</label>
                      <Input
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3: Payment Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-ignis-gradient text-white rounded-full flex items-center justify-center text-sm">3</div>
                    <span className="font-normal">Payment Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-1">Card Number</label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-1">Expiry Date</label>
                      <Input
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-1">CVV</label>
                      <Input
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-1">Name on Card</label>
                      <Input
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg sticky top-8">
                <CardHeader>
                  <CardTitle className="font-normal">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-normal text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600 font-light">{item.description}</p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500 font-light">Qty: {item.quantity}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-normal">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-light text-gray-600">Subtotal</span>
                      <span className="font-normal">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-light text-gray-600">Tax</span>
                      <span className="font-normal">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-light text-gray-600">Shipping</span>
                      <span className="font-normal text-green-600">FREE</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between">
                      <span className="font-normal text-lg">Total</span>
                      <span className="font-normal text-lg">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 text-blue-800">
                      <Truck className="h-4 w-4" />
                      <span className="font-light text-sm">Free shipping on all orders</span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleSubmit}
                    className="w-full bg-ignis-gradient text-white font-light"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Complete Order
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-gray-500 font-light">
                      By completing your order, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
