import React, { createContext, useContext, useMemo, useState } from 'react';
import { login as apiLogin, type LoginResponse } from '@shared/api';

type AuthState = {
  token: string | null;
  userId: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [userId, setUserId] = useState<string | null>(() => localStorage.getItem('userId'));

  const value = useMemo<AuthState>(() => ({
    token,
    userId,
    async login(username: string, password: string) {
      const res: LoginResponse = await apiLogin({ username, password });
      setToken(res.token);
      setUserId(res.userId);
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.userId);
    },
    logout() {
      setToken(null);
      setUserId(null);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  }), [token, userId]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
