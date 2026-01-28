import React, { createContext, useContext, useMemo, useState } from 'react';

type AuthState = { token: string | null; userId: string | null };
type AuthApi = AuthState & { setAuth: (token: string, userId: string) => void; clear: () => void };

const AuthCtx = createContext<AuthApi | null>(null);

const STORAGE_KEY = 'stepup_auth_token_v1';
const STORAGE_UID = 'stepup_auth_uid_v1';

/**
 * Admin UI uses the same JWT as the user UI for simplicity.
 * In production you may separate admin realm/roles, but token storage mechanics are identical.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));
  const [userId, setUserId] = useState<string | null>(() => localStorage.getItem(STORAGE_UID));

  const api = useMemo<AuthApi>(() => ({
    token,
    userId,
    setAuth: (t, uid) => {
      setToken(t);
      setUserId(uid);
      localStorage.setItem(STORAGE_KEY, t);
      localStorage.setItem(STORAGE_UID, uid);
      // backward-compat
      localStorage.setItem('token', t);
      localStorage.setItem('userId', uid);
    },
    clear: () => {
      setToken(null);
      setUserId(null);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_UID);
      // backward-compat
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  }), [token, userId]);

  return <AuthCtx.Provider value={api}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('AuthProvider missing');
  return ctx;
}
