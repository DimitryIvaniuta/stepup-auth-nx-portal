import { createTheme } from '@mui/material/styles';

/**
 * Shared MUI theme for all apps in the monorepo.
 * Keep it stable to ensure a consistent banking-like look and feel.
 */
export const theme = createTheme({
  palette: { mode: 'light', background: { default: '#f6f7fb' } },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'].join(',')
  }
});
