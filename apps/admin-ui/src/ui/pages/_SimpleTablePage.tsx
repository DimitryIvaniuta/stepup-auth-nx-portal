import { useEffect, useState } from 'react';
import { Alert, Box, Card, CardContent, CircularProgress, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { toast } from 'sonner';

import { toErrorMessage } from '../lib/errors';

type Props<T> = {
  title: string;
  load: () => Promise<T[]>;
  columns: { key: keyof T; label: string; render?: (v: any, row: T) => React.ReactNode }[];
  actions?: (row: T) => React.ReactNode;
};

export function SimpleTablePage<T extends { id: string }>(props: Props<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    setErr(null);
    try {
      const r = await props.load();
      setRows(r);
    } catch (e) {
      const msg = toErrorMessage(e);
      setErr(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refresh(); }, []);

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Card>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>{props.title}</Typography>
          <Button variant="outlined" onClick={refresh} disabled={loading}>Refresh</Button>
        </CardContent>
      </Card>

      {err && <Alert severity="error">{err}</Alert>}

      <Card>
        <CardContent>
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CircularProgress size={20} />
              <Typography color="text.secondary">Loading…</Typography>
            </Box>
          ) : (
            <Table size="small" aria-label={props.title}>
              <TableHead>
                <TableRow>
                  {props.columns.map(c => <TableCell key={String(c.key)}>{c.label}</TableCell>)}
                  {props.actions && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    {props.columns.map(c => (
                      <TableCell key={String(c.key)}>
                        {c.render ? c.render((row as any)[c.key], row) : String((row as any)[c.key] ?? '')}
                      </TableCell>
                    ))}
                    {props.actions && <TableCell>{props.actions(row)}</TableCell>}
                  </TableRow>
                ))}
                {!rows.length && (
                  <TableRow>
                    <TableCell colSpan={props.columns.length + (props.actions ? 1 : 0)}>
                      <Typography color="text.secondary">No data.</Typography>
                      <Typography variant="caption" color="text.secondary">
                        If you don&apos;t have these admin endpoints yet, implement them in backend or adjust API routes in <code>libs/shared/api/src/lib/adminApi.ts</code>.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
