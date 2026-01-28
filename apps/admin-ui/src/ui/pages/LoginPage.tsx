import { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { login } from '@shared/api';
import { useAuth } from '../../state/auth';
import { toErrorMessage } from '../lib/errors';

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});
type Form = z.infer<typeof schema>;

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const auth = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { username: '', password: '' }
  });

  return (
    <Card sx={{ maxWidth: 520 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Admin Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(async (v) => {
            setLoading(true);
            try {
              const r = await login(v);
              auth.setAuth(r.token, r.userId);
              toast.success('Signed in');
              nav('/');
            } catch (e) {
              toast.error(toErrorMessage(e));
            } finally {
              setLoading(false);
            }
          })}
          sx={{ display: 'grid', gap: 2, mt: 2 }}
        >
          <TextField label="Username" {...register('username')} error={Boolean(errors.username)} helperText={errors.username?.message} />
          <TextField label="Password" type="password" {...register('password')} error={Boolean(errors.password)} helperText={errors.password?.message} />

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Signing in…' : 'Login'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
