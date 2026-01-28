import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/auth';

export function LoginPage() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('demo12345');
  const [busy, setBusy] = useState(false);

  return (
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '70vh' }}>
      <Paper sx={{ p: 3, width: 420 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Sign in</Typography>

        <TextField label="Username" fullWidth sx={{ mb: 2 }} value={username}
                   onChange={(e) => setUsername(e.target.value)} />

        <TextField label="Password" type="password" fullWidth sx={{ mb: 2 }} value={password}
                   onChange={(e) => setPassword(e.target.value)} />

        <Button
          variant="contained"
          fullWidth
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              await login(username, password);
              toast.success('Logged in');
              nav('/');
            } catch (e: any) {
              toast.error(e?.message ?? 'Login failed');
            } finally {
              setBusy(false);
            }
          }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
