import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Toaster } from 'sonner';
import { theme } from '@shared/ui';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from './state/auth';

/**
 * Step-Up (end-user) application entrypoint.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
