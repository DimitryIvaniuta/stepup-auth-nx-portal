import { SimpleTablePage } from './_SimpleTablePage';
import { listMonitoringEvents } from '@shared/api';
import type { MonitoringEventRow } from '@shared/api';

export function MonitoringEventsPage() {
  return (
    <SimpleTablePage<MonitoringEventRow>
      title="Monitoring Events"
      load={listMonitoringEvents}
      columns={[
        { key: 'id', label: 'ID', render: (v) => String(v).slice(0, 8) + '…' },
        { key: 'type', label: 'Type' },
        { key: 'createdAt', label: 'Created' },
        { key: 'decisionId', label: 'Decision', render: (v) => (v ? String(v).slice(0, 8) + '…' : '') },
        { key: 'userId', label: 'User', render: (v) => (v ? String(v).slice(0, 8) + '…' : '') }
      ]}
    />
  );
}
