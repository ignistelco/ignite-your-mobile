import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Card,
  CardContent,
  Button,
  IconButton,
} from '@mui/material';
import {
  Dashboard,
  DevicesOther,
  ViewAgenda,
  Assessment,
  People,
  Store,
  Settings,
  Menu as MenuIcon,
  AttachMoney,
  AdminPanelSettings,
  ViewList,
  Warehouse,
} from '@mui/icons-material';
import { useAdminProfile } from '@/hooks/useAdminProfile';

const drawerWidth = 240;

interface AdminSection {
  id: string;
  title: string;
  icon: React.ReactElement;
  description: string;
  roles: string[];
}

const adminSections: AdminSection[] = [
  {
    id: 'dashboard',
    title: 'Dashboard Overview',
    icon: <Dashboard />,
    description: 'System overview and key metrics',
    roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER', 'CUSTOMER_SUPPORT']
  },
  {
    id: 'device-cms',
    title: 'Device CMS',
    icon: <DevicesOther />,
    description: 'Publish and manage devices to device pages',
    roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER']
  },
  {
    id: 'plan-cms',
    title: 'Plan CMS',
    icon: <ViewAgenda />,
    description: 'Publish new plans to plan pages',
    roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER']
  },
  {
    id: 'content-management',
    title: 'Content Management',
    icon: <ViewList />,
    description: 'Manage website content and CMS',
    roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER']
  },
  {
    id: 'daily-income',
    title: 'Daily Income Reports', 
    icon: <AttachMoney />,
    description: 'View daily income forms for reporting statistics',
    roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER']
  },
  {
    id: 'agent-view',
    title: 'Agent View & Config',
    icon: <AdminPanelSettings />,
    description: 'Agent view and configuration settings',
    roles: ['SUPER_ADMIN', 'CUSTOMER_SUPPORT']
  },
  {
    id: 'warehouse-info',
    title: 'Warehouse Information',
    icon: <Warehouse />,
    description: 'View warehouse query and configuration',
    roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER']
  },
  {
    id: 'customer-management',
    title: 'Customer Management',
    icon: <People />,
    description: 'Customer management module',
    roles: ['SUPER_ADMIN', 'CUSTOMER_SUPPORT']
  },
  {
    id: 'dealer-portal',
    title: 'Dealer Management Portal',
    icon: <Store />,
    description: 'Dealer management and configuration',
    roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER']
  },
  {
    id: 'system-settings',
    title: 'Configuration Settings',
    icon: <Settings />,
    description: 'System configuration and settings',
    roles: ['SUPER_ADMIN']
  },
];

const AdminDashboardNew = () => {
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data } = useAdminProfile();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const filteredSections = adminSections.filter(section => 
    section.roles.includes(data?.role || '')
  );

  const renderSectionContent = () => {
    const section = adminSections.find(s => s.id === selectedSection);
    if (!section) return null;

    switch (selectedSection) {
      case 'dashboard':
        return (
          <Box>
            <Typography variant="h5" gutterBottom>Dashboard Overview</Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
              <Card sx={{ minWidth: 200, flex: 1 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Total Revenue</Typography>
                  <Typography variant="h4" color="primary">$24,500</Typography>
                  <Typography variant="body2" color="textSecondary">+12% from last month</Typography>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 200, flex: 1 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Active Subscriptions</Typography>
                  <Typography variant="h4" color="primary">1,234</Typography>
                  <Typography variant="body2" color="textSecondary">+5% from last month</Typography>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 200, flex: 1 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Devices Sold</Typography>
                  <Typography variant="h4" color="primary">456</Typography>
                  <Typography variant="body2" color="textSecondary">+8% from last month</Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        );
      
      case 'device-cms':
        return (
          <Box>
            <Typography variant="h5" gutterBottom>Device Content Management</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
              <Button variant="contained" color="primary" size="large">
                Add New Device
              </Button>
              <Button variant="outlined" color="primary" size="large">
                Manage Existing Devices
              </Button>
            </Box>
            <Paper sx={{ p: 3 }}>
              <Typography variant="body1">
                Use this section to publish devices to the main device pages, manage device specifications, 
                pricing, and availability status.
              </Typography>
            </Paper>
          </Box>
        );

      case 'plan-cms':
        return (
          <Box>
            <Typography variant="h5" gutterBottom>Plan Content Management</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
              <Button variant="contained" color="primary" size="large">
                Add New Plan
              </Button>
              <Button variant="outlined" color="primary" size="large">
                Manage Existing Plans
              </Button>
            </Box>
            <Paper sx={{ p: 3 }}>
              <Typography variant="body1">
                Publish new wireless plans to plan pages, configure pricing tiers, and manage plan features.
              </Typography>
            </Paper>
          </Box>
        );

      default:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>{section.title}</Typography>
            <Paper sx={{ p: 3 }}>
              <Typography variant="body1" gutterBottom>
                {section.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                This section is under development. Advanced features will be available soon.
              </Typography>
              <Button variant="contained">
                Configure {section.title}
              </Button>
            </Paper>
          </Box>
        );
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Admin Portal
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {filteredSections.map((section) => (
          <ListItem key={section.id} disablePadding>
            <ListItemButton
              selected={selectedSection === section.id}
              onClick={() => setSelectedSection(section.id)}
            >
              <ListItemIcon>
                {section.icon}
              </ListItemIcon>
              <ListItemText primary={section.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Ignis Mobile Admin Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" sx={{ mr: 2 }}>
            {data?.user.email} ({data?.role})
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {renderSectionContent()}
      </Box>
    </Box>
  );
};

export default AdminDashboardNew;