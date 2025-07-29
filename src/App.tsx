
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import Index from "./pages/Index";
import Plans from "./pages/Plans";
import Devices from "./pages/Devices";
import DevicesPage from "./pages/DevicesPage";
import DeviceDetail from "./pages/DeviceDetail";
import DeviceDetailPage from "./pages/DeviceDetailPage";
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
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DeviceListPage from "./pages/admin/DeviceListPage";
import DeviceFormPage from "./pages/admin/DeviceFormPage";
import FilterManagerPage from "./pages/admin/FilterManagerPage";
import PlanFormPage from "./pages/admin/PlanFormPage";
import AddonManagerPage from "./pages/admin/AddonManagerPage";
import GigsTestPage from "./pages/admin/GigsTestPage";
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
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/devices/:slug" element={<DeviceDetailPage />} />
            <Route path="/legacy/devices" element={<Devices />} />
            <Route path="/legacy/devices/:slug" element={<DeviceDetail />} />
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
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="devices" element={<DeviceListPage />} />
              <Route path="devices/new" element={<DeviceFormPage />} />
              <Route path="devices/:id" element={<DeviceFormPage />} />
              <Route path="filters" element={<FilterManagerPage />} />
              <Route path="plans/:id" element={<PlanFormPage />} />
              <Route path="addons" element={<AddonManagerPage />} />
              <Route path="dev/gigs-test" element={<GigsTestPage />} />
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
