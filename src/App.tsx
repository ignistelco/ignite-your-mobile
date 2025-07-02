
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import Index from "./pages/Index";
import Plans from "./pages/Plans";
import Devices from "./pages/Devices";
import Deals from "./pages/Deals";
import JoinUs from "./pages/JoinUs";
import Business from "./pages/Business";
import BYOD from "./pages/BYOD";
import Legal from "./pages/Legal";
import Internet from "./pages/Internet";
import PulseOS from "./pages/PulseOS";
import Support from "./pages/Support";
import Dashboard from "./pages/Dashboard";
import StoreLocator from "./pages/StoreLocator";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductPlanList from "./pages/admin/ProductPlanList";
import ProductPlanCreate from "./pages/admin/ProductPlanCreate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="/business" element={<Business />} />
            <Route path="/byod" element={<BYOD />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/internet" element={<Internet />} />
            <Route path="/pulseos" element={<PulseOS />} />
            <Route path="/support" element={<Support />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/store-locator" element={<StoreLocator />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="product-plans" element={<ProductPlanList />} />
              <Route path="product-plans/create" element={<ProductPlanCreate />} />
              <Route path="device-models" element={<div>Device Models - Coming Soon</div>} />
              <Route path="device-models/create" element={<div>Create Device - Coming Soon</div>} />
              <Route path="users" element={<div>Users Management - Coming Soon</div>} />
              <Route path="orders" element={<div>Orders Management - Coming Soon</div>} />
              <Route path="sync" element={<div>Sync Data - Coming Soon</div>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
