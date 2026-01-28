import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { authorizeTransaction } from '@shared/api';
import { useAuth } from '../../state/auth';

export function AuthorizePage() {
  const nav = useNavigate();
  const { token } = useAuth();

  const [amount, setAmount] = useState('5000.00');
  const [deviceId, setDeviceId] = useState('device-new-999');
  const [country, setCountry] = useState('US');
  const [busy, setBusy] = useState(false);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Authorize transaction</Typography>

      <Box sx={{ display: 'grid', gap: 2, maxWidth: 520 }}>
        <TextField label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <TextField label="X-Device-Id" value={deviceId} onChange={(e) => setDeviceId(e.target.value)} />
        <TextField label="X-Country" value={country} onChange={(e) => setCountry(e.target.value)} />

        <Button
          variant="contained"
          disabled={busy}
          onClick={async () => {
            if (!token) {
              toast.error('Please login first');
              nav('/login');
              return;
            }

            setBusy(true);
            try {
              const res = await authorizeTransaction(
                  deviceId,
                  country,
                    { actionType: 'TRANSFER', amount }
              );

              if (res.decision === 'APPROVED') {
                toast.success('Approved');
                return;
              }

              toast.warning('Step-up required');
              nav(`/verify/${res.challengeId}`, { state: { otpPreview: res.otpPreview } });
            } catch (e: any) {
              toast.error(e?.message ?? 'Authorize failed');
            } finally {
              setBusy(false);
            }
          }}
        >
          Authorize
        </Button>
      </Box>
    </Paper>
  );
}
