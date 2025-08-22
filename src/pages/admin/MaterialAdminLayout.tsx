import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import RequireAdmin from '@/components/admin/RequireAdmin';
import MaterialAdminSidebar from '@/components/admin/MaterialAdminSidebar';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const drawerWidth = 280;

export default function MaterialAdminLayout() {
  return (
    <RequireAdmin>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <MaterialAdminSidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
    </RequireAdmin>
  );
}