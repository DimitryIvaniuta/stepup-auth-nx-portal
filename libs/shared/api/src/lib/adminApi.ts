import { http } from './http';
import type { RiskDecisionRow, StepUpChallengeRow, OutboxRow, MonitoringEventRow } from './types';

/**
 * Admin API client.
 * 
 * These endpoints are a production-grade, common-sense set for step-up systems:
 * - decisions/challenges for audit and investigations
 * - outbox for operational monitoring
 * - monitoring events stream
 * 
 * If your backend uses different routes, adjust only this file.
 */
export async function listRiskDecisions(): Promise<RiskDecisionRow[]> {
  const r = await http.get<RiskDecisionRow[]>('/api/admin/risk-decisions');
  return r.data;
}

export async function listChallenges(): Promise<StepUpChallengeRow[]> {
  const r = await http.get<StepUpChallengeRow[]>('/api/admin/stepup-challenges');
  return r.data;
}

export async function listOutbox(): Promise<OutboxRow[]> {
  const r = await http.get<OutboxRow[]>('/api/admin/outbox');
  return r.data;
}

export async function retryOutbox(id: string): Promise<void> {
  await http.post(`/api/admin/outbox/${id}/retry`);
}

export async function listMonitoringEvents(): Promise<MonitoringEventRow[]> {
  const r = await http.get<MonitoringEventRow[]>('/api/admin/monitoring/events');
  return r.data;
}
