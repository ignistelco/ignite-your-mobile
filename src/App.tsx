
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import Index from "./pages/Index";
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
