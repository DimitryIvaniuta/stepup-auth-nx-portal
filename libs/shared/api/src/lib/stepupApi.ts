import { http } from './http';
import type {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
  AuthorizeTransactionRequest,
  AuthorizeTransactionResponse,
  StepUpVerifyRequest,
  StepUpVerifyResponse
} from './types';

export async function register(req: RegisterRequest): Promise<void> {
  await http.post('/api/public/register', req);
}

export async function login(req: LoginRequest): Promise<LoginResponse> {
  const r = await http.post<LoginResponse>('/api/public/login', req);
  return r.data;
}

export async function authorize(deviceId: string, country: string, req: AuthorizeTransactionRequest): Promise<AuthorizeTransactionResponse> {
  console.log('Device Id:', deviceId);
  console.log('country Id:', country);
  const r = await http.post<AuthorizeTransactionResponse>('/api/transactions/authorize', req, {
    headers: { 'X-Device-Id': deviceId, 'X-Country': country }
  });
  return r.data;
}

export async function verifyOtp(challengeId: string, req: StepUpVerifyRequest): Promise<StepUpVerifyResponse> {
  const r = await http.post<StepUpVerifyResponse>(`/api/stepup/${challengeId}/verify`, req);
  return r.data;
}


/**
 * Newer, explicit API name used by UIs.
 * Kept as a thin wrapper for backwards compatibility.
 */
export async function authorizeTransaction(
  deviceId: string,
  country: string,
  req: AuthorizeTransactionRequest
): Promise<AuthorizeTransactionResponse> {
  return authorize(deviceId, country, req);
}

/**
 * Newer, explicit API name used by UIs.
 * Kept as a thin wrapper for backwards compatibility.
 */
export async function verifyStepUp(
  challengeId: string,
  req: StepUpVerifyRequest
): Promise<StepUpVerifyResponse> {
  return verifyOtp(challengeId, req);
}
