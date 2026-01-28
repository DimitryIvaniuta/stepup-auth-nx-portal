import { AppBar, Box, Toolbar, Typography } from '@mui/material';

/**
 * Very small shared layout wrapper for the admin app.
 * The main banking UI keeps its richer layout inside its own app.
 */
export function AdminLayout(props: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Step‑Up Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>{props.children}</Box>
    </Box>
  );
}
