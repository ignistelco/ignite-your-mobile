
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Smartphone, 
  Filter, 
  Package, 
  Plus, 
  Settings,
  TestTube
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminProfile } from '@/hooks/useAdminProfile';

const AdminSidebar = () => {
  const location = useLocation();
  const { data } = useAdminProfile();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER', 'CUSTOMER_SUPPORT'] },
    { name: 'Devices', href: '/admin/devices', icon: Smartphone, roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER'] },
    { name: 'Filters', href: '/admin/filters', icon: Filter, roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER'] },
    { name: 'Plans', href: '/admin/plans', icon: Package, roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER'] },
    { name: 'Addons', href: '/admin/addons', icon: Plus, roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER'] },
    { name: 'Dev Console', href: '/admin/dev/gigs-test', icon: TestTube, roles: ['SUPER_ADMIN'] },
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(data?.role)
  );

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">Admin Portal</h2>
        <p className="text-sm text-gray-400">{data?.role}</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredNavigation.map((item) => {
            const isActive = location.pathname === item.href || 
                           (item.href !== '/admin/dashboard' && location.pathname.startsWith(item.href));
            
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
