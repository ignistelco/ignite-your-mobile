
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { 
  Settings, 
  Package, 
  Smartphone, 
  Plus, 
  Database,
  Users,
  ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: Settings,
    },
    {
      title: "Product Plans",
      url: "/admin/product-plans",
      icon: Package,
    },
    {
      title: "Device Models",
      url: "/admin/device-models",
      icon: Smartphone,
    },
    {
      title: "Create Plan",
      url: "/admin/product-plans/create",
      icon: Plus,
    },
    {
      title: "Create Device",
      url: "/admin/device-models/create",
      icon: Plus,
    },
    {
      title: "Sync Gigs Data",
      url: "/admin/sync",
      icon: Database,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: ShoppingCart,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="w-64">
          <SidebarContent>
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Admin Portal</h2>
              <p className="text-sm text-muted-foreground">Ignis Mobile</p>
            </div>
            
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link 
                          to={item.url}
                          className={isActive(item.url) ? "bg-muted text-primary font-medium" : "hover:bg-muted/50"}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1">
          <header className="h-12 flex items-center border-b px-4">
            <SidebarTrigger className="mr-2" />
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </header>
          
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
