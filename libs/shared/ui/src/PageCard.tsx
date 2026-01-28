import { Card, CardContent, Typography } from '@mui/material';

/**
 * Small shared primitive used by multiple apps.
 */
export function PageCard(props: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {props.title}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {props.children}
        </Typography>
      </CardContent>
    </Card>
  );
}
