import React, { createContext, useContext, useMemo, useState } from 'react';
import { login as apiLogin, type LoginResponse } from '@shared/api';

/**
 * Single storage contract shared by all apps.
 * Using one key prevents situations where UI "re-logins" but HTTP layer still reads an older token
 * from a different key.
 */
const STORAGE_TOKEN = 'stepup_auth_token_v1';
const STORAGE_UID = 'stepup_auth_uid_v1';

// Backward-compat keys (older builds)
const LEGACY_TOKEN = 'token';
const LEGACY_UID = 'userId';

type AuthState = {
  token: string | null;
  userId: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthState | null>(null);

function readToken(): string | null {
  return localStorage.getItem(STORAGE_TOKEN) ?? localStorage.getItem(LEGACY_TOKEN);
}

function readUserId(): string | null {
  return localStorage.getItem(STORAGE_UID) ?? localStorage.getItem(LEGACY_UID);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(readToken);
  const [userId, setUserId] = useState<string | null>(readUserId);

  const value = useMemo<AuthState>(() => ({
    token,
    userId,
    async login(username: string, password: string) {
      const res: LoginResponse = await apiLogin({ username, password });

      setToken(res.token);
      setUserId(res.userId);

      // Write canonical keys
      localStorage.setItem(STORAGE_TOKEN, res.token);
      localStorage.setItem(STORAGE_UID, res.userId);

      // Write legacy keys too to avoid breaking any old reads
      localStorage.setItem(LEGACY_TOKEN, res.token);
      localStorage.setItem(LEGACY_UID, res.userId);
    },
    logout() {
      setToken(null);
      setUserId(null);

      // Remove canonical keys
      localStorage.removeItem(STORAGE_TOKEN);
      localStorage.removeItem(STORAGE_UID);

      // Remove legacy keys
      localStorage.removeItem(LEGACY_TOKEN);
      localStorage.removeItem(LEGACY_UID);
    }
  }), [token, userId]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
