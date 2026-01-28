import { Paper, Typography } from '@mui/material';

export function HistoryPage() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">History</Typography>
      <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
        (Optional) Add user history endpoint on backend and show decisions/challenges here.
      </Typography>
    </Paper>
  );
}
