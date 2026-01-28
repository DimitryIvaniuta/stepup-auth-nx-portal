import { SimpleTablePage } from './_SimpleTablePage';
import { listRiskDecisions } from '@shared/api';
import type { RiskDecisionRow } from '@shared/api';

export function RiskDecisionsPage() {
  return (
    <SimpleTablePage<RiskDecisionRow>
      title="Risk Decisions"
      load={listRiskDecisions}
      columns={[
        { key: 'id', label: 'Decision ID', render: (v) => String(v).slice(0, 8) + '…' },
        { key: 'userId', label: 'User', render: (v) => String(v).slice(0, 8) + '…' },
        { key: 'actionType', label: 'Action' },
        { key: 'amount', label: 'Amount' },
        { key: 'country', label: 'Country' },
        { key: 'riskScore', label: 'Score' },
        { key: 'riskLevel', label: 'Level' },
        { key: 'decision', label: 'Decision' }
      ]}
    />
  );
}
