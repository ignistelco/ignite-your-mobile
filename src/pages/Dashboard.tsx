
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  CreditCard, 
  Package, 
  Settings, 
  Download, 
  AlertCircle,
  CheckCircle,
  Smartphone,
  Wifi,
  User
} from "lucide-react";

const Dashboard = () => {
  // Mock data - in real app, this would come from API
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "(555) 123-4567"
  };

  const currentPlan = {
    name: "Ignis Go",
    price: "$25/month",
    dataUsed: "8.2 GB",
    dataTotal: "15 GB",
    daysLeft: 12
  };

  const recentOrders = [
    {
      id: "ORD-12345",
      date: "Dec 15, 2024",
      status: "Delivered",
      items: ["iPhone 15 Pro", "Ignis Go Plan"],
      total: "$1,224"
    },
    {
      id: "ORD-12344",
      date: "Nov 28, 2024",
      status: "Processing",
      items: ["Plan Upgrade"],
      total: "$35"
    }
  ];

  const devices = [
    {
      name: "iPhone 15 Pro",
      number: "(555) 123-4567",
      status: "Active",
      imei: "***-***-***-1234"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              Welcome back, <span className="font-bold">{user.name}</span>
            </h1>
            <p className="text-gray-600 font-light">Manage your Ignis Mobile account and services</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Account Overview */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-ignis-purple" />
                    <span className="font-normal">Account Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-normal text-gray-900 mb-2">Current Plan</h3>
                      <div className="bg-gradient-to-r from-ignis-purple/10 to-ignis-teal/10 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-normal text-lg">{currentPlan.name}</span>
                          <span className="text-lg font-light">{currentPlan.price}</span>
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm">
                            <span>Data Usage</span>
                            <span>{currentPlan.dataUsed} / {currentPlan.dataTotal}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-ignis-gradient h-2 rounded-full" style={{width: '55%'}}></div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 font-light">
                          {currentPlan.daysLeft} days remaining in cycle
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-normal text-gray-900 mb-2">Quick Actions</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start font-light">
                          <Download className="h-4 w-4 mr-2" />
                          Download Bill
                        </Button>
                        <Button variant="outline" className="w-full justify-start font-light">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Payment Methods
                        </Button>
                        <Button variant="outline" className="w-full justify-start font-light">
                          <Settings className="h-4 w-4 mr-2" />
                          Account Settings
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Devices */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="h-5 w-5 text-ignis-purple" />
                    <span className="font-normal">My Devices</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {devices.map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-normal text-gray-900">{device.name}</h4>
                        <p className="text-gray-600 font-light">{device.number}</p>
                        <p className="text-sm text-gray-500 font-light">IMEI: {device.imei}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {device.status}
                        </Badge>
                        <Button variant="ghost" size="sm" className="mt-2 font-light">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4 font-light">
                    Add New Device
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-ignis-purple" />
                    <span className="font-normal">Recent Orders</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-normal text-gray-900">{order.id}</h4>
                          <p className="text-gray-600 font-light">{order.date}</p>
                          <p className="text-sm text-gray-500 font-light">
                            {order.items.join(", ")}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={
                            order.status === "Delivered" 
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }>
                            {order.status}
                          </Badge>
                          <p className="font-normal mt-1">{order.total}</p>
                          <Button variant="ghost" size="sm" className="mt-1 font-light">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 font-light">
                    View All Orders
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Info */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-normal">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-light text-gray-500">Name</label>
                    <p className="font-normal">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-light text-gray-500">Email</label>
                    <p className="font-normal">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-light text-gray-500">Phone</label>
                    <p className="font-normal">{user.phone}</p>
                  </div>
                  <Button variant="outline" className="w-full font-light">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Support */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-normal">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start font-light">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start font-light">
                    <Wifi className="h-4 w-4 mr-2" />
                    Live Chat
                  </Button>
                  <Button variant="outline" className="w-full justify-start font-light">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Report Issue
                  </Button>
                </CardContent>
              </Card>

              {/* Network Status */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-normal">Network Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-normal">All Systems Operational</span>
                  </div>
                  <p className="text-sm text-gray-600 font-light">
                    No known outages in your area
                  </p>
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

export default Dashboard;
