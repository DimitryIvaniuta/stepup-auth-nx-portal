export type ErrorResponse = {
  timestamp: string | number;
  status: number;
  error: string;
  message: string;
  path: string;
};

export type RegisterRequest = { username: string; password: string };
export type LoginRequest = { username: string; password: string };
export type LoginResponse = { userId: string; token: string };

export type AuthorizeTransactionRequest = { actionType: string; amount: string };

export type AuthorizeTransactionResponse = {
  decision: 'APPROVED' | 'STEP_UP_REQUIRED';
  decisionId: string;
  riskScore: number;
  riskLevel: string;
  challengeId?: string | null;
  otpPreview?: string | null;
};

export type StepUpVerifyRequest = { otp: string };
export type StepUpVerifyResponse = { status: string; decisionId: string };

// Admin-oriented types (best-effort; backend can adjust easily)
export type RiskDecisionRow = {
  id: string;
  userId: string;
  actionType: string;
  amount: string;
  country: string;
  riskScore: number;
  riskLevel: string;
  decision: string;
  createdAt: string;
  stepUpChallengeId?: string | null;
};

export type StepUpChallengeRow = {
  id: string;
  userId: string;
  decisionId: string;
  status: string;
  attempts: number;
  createdAt: string;
  verifiedAt?: string | null;
};

export type OutboxRow = {
  id: string;
  aggregateId: string;
  type: string;
  payloadJson: string;
  status: string;
  createdAt: string;
  lastError?: string | null;
};

export type MonitoringEventRow = {
  id: string;
  type: string;
  decisionId?: string;
  userId?: string;
  createdAt: string;
  payload?: any;
};
