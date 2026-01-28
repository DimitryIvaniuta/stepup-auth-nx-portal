import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@shared/api';

export function toErrorMessage(e: unknown): string {
  const ax = e as AxiosError<ErrorResponse>;
  const msg = ax?.response?.data?.message;
  if (msg) return msg;
  if (ax?.message) return ax.message;
  return 'Unexpected error';
}
