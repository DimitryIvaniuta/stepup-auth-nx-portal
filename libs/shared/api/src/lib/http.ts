import axios from 'axios';

/**
 * Shared HTTP client used across apps.
 * 
 * - Reads API base URL from Vite env (per app)
 * - Adds Authorization header when token is present in localStorage
 */
export const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL ?? 'http://localhost:8080';

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('stepup_auth_token_v1') ?? localStorage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});
