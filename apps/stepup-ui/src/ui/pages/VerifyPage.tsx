import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'sonner';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { verifyStepUp } from '@shared/api';
import { useAuth } from '../../state/auth';

export function VerifyPage() {
  const { challengeId } = useParams();
  const nav = useNavigate();
  const loc = useLocation() as any;
  const { token } = useAuth();

  const preview = loc?.state?.otpPreview as string | undefined;
  const [otp, setOtp] = useState(preview ?? '');
  const [busy, setBusy] = useState(false);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Verify step-up</Typography>
      <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
        Challenge: {challengeId}
      </Typography>

      <Box sx={{ display: 'grid', gap: 2, maxWidth: 520 }}>
        <TextField label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />

        <Button
          variant="contained"
          disabled={busy}
          onClick={async () => {
            if (!token) {
              toast.error('Please login first');
              nav('/login');
              return;
            }
            if (!challengeId) {
              toast.error('Missing challengeId');
              return;
            }
            setBusy(true);
            try {
              await verifyStepUp(challengeId, { otp }, { token });
              toast.success('Verified');
              nav('/');
            } catch (e: any) {
              toast.error(e?.message ?? 'Verify failed');
            } finally {
              setBusy(false);
            }
          }}
        >
          Verify
        </Button>
      </Box>
    </Paper>
  );
}
