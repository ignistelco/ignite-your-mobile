
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Smartphone, Users, ShoppingCart, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AdminDashboard = () => {
  // Query for basic stats
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      const [plansRes, devicesRes, usersRes, ordersRes] = await Promise.all([
        supabase.from('plan_product_models').select('*', { count: 'exact', head: true }),
        supabase.from('device_product_models').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true })
      ]);

      return {
        plans: plansRes.count || 0,
        devices: devicesRes.count || 0,
        users: usersRes.count || 0,
        orders: ordersRes.count || 0
      };
    }
  });

  const handleSyncGigsData = async () => {
    try {
      toast.loading("Syncing Gigs data...");
      
      const { data, error } = await supabase.functions.invoke('admin-api/admin/sync-gigs-data', {
        method: 'POST'
      });
      
      if (error) throw error;
      if (!data.success) throw new Error(data.error);
      
      toast.success(`Gigs data synced successfully! Plans: ${data.synced.plans}, Devices: ${data.synced.deviceModels}`);
    } catch (error) {
      toast.error(`Sync failed: ${error.message}`);
    }
  };

  const statCards = [
    {
      title: "Product Plans",
      value: stats?.plans || 0,
      icon: Package,
      link: "/admin/product-plans"
    },
    {
      title: "Device Models",
      value: stats?.devices || 0,
      icon: Smartphone,
      link: "/admin/device-models"
    },
    {
      title: "Users",
      value: stats?.users || 0,
      icon: Users,
      link: "/admin/users"
    },
    {
      title: "Orders",
      value: stats?.orders || 0,
      icon: ShoppingCart,
      link: "/admin/orders"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your Ignis Mobile platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "-" : stat.value}
              </div>
              <Button asChild variant="link" className="p-0 h-auto">
                <Link to={stat.link}>View all</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Product Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full">
              <Link to="/admin/product-plans/create">Create New Plan</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/device-models/create">Create New Device</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleSyncGigsData}
              className="w-full"
              variant="outline"
            >
              Sync Gigs Data
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Import latest plans and device models from Gigs API
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/users">Manage Users</Link>
            </Button>
            <Button asChild variant="outline" className="w-full mt-2">
              <Link to="/admin/orders">View Orders</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
