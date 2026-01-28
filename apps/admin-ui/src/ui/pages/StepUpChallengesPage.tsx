import { SimpleTablePage } from './_SimpleTablePage';
import { listChallenges } from '@shared/api';
import type { StepUpChallengeRow } from '@shared/api';

export function StepUpChallengesPage() {
  return (
    <SimpleTablePage<StepUpChallengeRow>
      title="Step‑Up Challenges"
      load={listChallenges}
      columns={[
        { key: 'id', label: 'Challenge ID', render: (v) => String(v).slice(0, 8) + '…' },
        { key: 'userId', label: 'User', render: (v) => String(v).slice(0, 8) + '…' },
        { key: 'decisionId', label: 'Decision', render: (v) => String(v).slice(0, 8) + '…' },
        { key: 'status', label: 'Status' },
        { key: 'attempts', label: 'Attempts' },
        { key: 'createdAt', label: 'Created' }
      ]}
    />
  );
}
