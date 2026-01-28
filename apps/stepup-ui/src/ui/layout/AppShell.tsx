import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/auth';

/**
 * Minimal banking-like shell for end-user app.
 */
export function AppShell() {
  const nav = useNavigate();
  const { token, logout } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} variant="h6">Step-Up</Typography>
          <Button color="inherit" onClick={() => nav('/')}>Authorize</Button>
          <Button color="inherit" onClick={() => nav('/history')}>History</Button>
          {token ? (
            <Button color="inherit" onClick={() => { logout(); nav('/login'); }}>Logout</Button>
          ) : (
            <Button color="inherit" onClick={() => nav('/login')}>Login</Button>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3, flex: 1 }}>
        <Outlet />
      </Container>

      <Box component="footer" sx={{ py: 2, textAlign: 'center', opacity: 0.7 }}>
        <Typography variant="body2">Step-Up Auth Demo</Typography>
      </Box>
    </Box>
  );
}
