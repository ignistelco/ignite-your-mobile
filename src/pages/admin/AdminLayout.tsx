
import { Outlet } from 'react-router-dom';
import RequireAdmin from '@/components/admin/RequireAdmin';
import AdminSidebar from '@/components/admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <RequireAdmin>
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </RequireAdmin>
  );
};

export default AdminLayout;
