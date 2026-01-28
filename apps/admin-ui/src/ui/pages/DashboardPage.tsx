import { Card, CardContent, Typography, Box } from '@mui/material';

/**
 * Admin dashboard: entry point for ops/security users.
 */
export function DashboardPage() {
  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Operations overview
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Use the left navigation to inspect Risk Decisions, Step‑Up Challenges, Outbox and Monitoring events.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
