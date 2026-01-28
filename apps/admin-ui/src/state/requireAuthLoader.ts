import type { LoaderFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';

/**
 * Router loader guard. Uses localStorage because loaders run outside React context.
 */
export async function requireAuthLoader(_args: LoaderFunctionArgs) {
  const token = localStorage.getItem('stepup_auth_token_v1');
  if (!token) throw redirect('/login');
  return null;
}
