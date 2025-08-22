import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from '@mui/material';
import {
  Dashboard,
  Devices,
  Category,
  LocalOffer,
  AttachMoney,
  Assessment,
  People,
  Business,
  Warehouse,
  Settings,
  ContentPaste,
  Publish,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAdminProfile } from '@/hooks/useAdminProfile';

const drawerWidth = 280;

interface MenuItem {
  text: string;
  path: string;
  icon: React.ReactElement;
  roles: string[];
}

const menuItems: MenuItem[] = [
  { text: 'Dashboard', path: '/admin/dashboard', icon: <Dashboard />, roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER', 'CUSTOMER_SUPPORT'] },
  { text: 'CMS Content', path: '/admin/cms', icon: <ContentPaste />, roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER'] },
  { text: 'Device Publishing', path: '/admin/devices/publish', icon: <Publish />, roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER'] },
  { text: 'Plan Publishing', path: '/admin/plans/publish', icon: <LocalOffer />, roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER'] },
  { text: 'Devices', path: '/admin/devices', icon: <Devices />, roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER'] },
  { text: 'Plans', path: '/admin/plans', icon: <Category />, roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER'] },
  { text: 'Daily Income Reports', path: '/admin/reports/income', icon: <AttachMoney />, roles: ['SUPER_ADMIN', 'CUSTOMER_SUPPORT'] },
  { text: 'Statistics & Analytics', path: '/admin/statistics', icon: <Assessment />, roles: ['SUPER_ADMIN', 'CUSTOMER_SUPPORT'] },
  { text: 'Agent Management', path: '/admin/agents', icon: <People />, roles: ['SUPER_ADMIN'] },
  { text: 'Customer Management', path: '/admin/customers', icon: <People />, roles: ['SUPER_ADMIN', 'CUSTOMER_SUPPORT'] },
  { text: 'Dealer Portal', path: '/admin/dealers', icon: <Business />, roles: ['SUPER_ADMIN'] },
  { text: 'Warehouse Management', path: '/admin/warehouse', icon: <Warehouse />, roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER'] },
  { text: 'Configuration Settings', path: '/admin/config', icon: <Settings />, roles: ['SUPER_ADMIN'] },
];

export default function MaterialAdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = useAdminProfile();

  const filteredItems = menuItems.filter(item => 
    data?.role && item.roles.includes(data.role)
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'grey.900',
          color: 'white',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: 'white' }}>
          Ignis Admin Portal
        </Typography>
      </Toolbar>
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="body2" sx={{ color: 'grey.400' }}>
          Role: {data?.role}
        </Typography>
        <Typography variant="body2" sx={{ color: 'grey.400' }}>
          {data?.user.email}
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: 'grey.700' }} />
      <List sx={{ pt: 2 }}>
        {filteredItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'grey.800',
                },
                '&:hover': {
                  bgcolor: 'grey.700',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}