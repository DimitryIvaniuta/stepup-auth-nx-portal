import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar, Box, Toolbar, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider, Button
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PolicyIcon from '@mui/icons-material/Policy';
import ShieldIcon from '@mui/icons-material/Shield';
import StorageIcon from '@mui/icons-material/Storage';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth } from '../../state/auth';

const drawerWidth = 280;

type NavItem = { to: string; label: string; icon: React.ReactNode; auth?: boolean };

const nav: NavItem[] = [
  { to: '/', label: 'Admin Dashboard', icon: <DashboardIcon />, auth: true },
  { to: '/risk/decisions', label: 'Risk Decisions', icon: <PolicyIcon />, auth: true },
  { to: '/risk/challenges', label: 'Step‑Up Challenges', icon: <ShieldIcon />, auth: true },
  { to: '/ops/outbox', label: 'Outbox', icon: <StorageIcon />, auth: true },
  { to: '/ops/events', label: 'Monitoring Events', icon: <EventNoteIcon />, auth: true },
  { to: '/login', label: 'Login', icon: <LoginIcon /> }
];

export function AppLayout() {
  const { token, clear, userId } = useAuth();
  const loc = useLocation();
  const navTo = useNavigate();

  const items = nav.filter((i) => (i.auth ? Boolean(token) : true));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Step‑Up Admin Console
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {token ? (
              <>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  User: {userId?.slice(0, 8)}…
                </Typography>
                <Button
                  color="inherit"
                  startIcon={<LogoutIcon />}
                  onClick={() => {
                    clear();
                    navTo('/login');
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Not signed in
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', pt: 8 }
        }}
      >
        <List>
          {items.map((i) => (
            <ListItemButton key={i.to} component={Link} to={i.to} selected={loc.pathname === i.to}>
              <ListItemIcon>{i.icon}</ListItemIcon>
              <ListItemText primary={i.label} />
            </ListItemButton>
          ))}
        </List>

        <Divider />

        <Box sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Ops tip: Outbox failures are the first signal of broken monitoring pipelines.
          </Typography>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>

        <Divider sx={{ mt: 3 }} />

        <Box sx={{ py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Admin Console (demo)
          </Typography>
          <Typography variant="caption" color="text.secondary">
            API: {import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
