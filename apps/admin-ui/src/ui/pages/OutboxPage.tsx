import { Button } from '@mui/material';
import { SimpleTablePage } from './_SimpleTablePage';
import { listOutbox, retryOutbox } from '@shared/api';
import type { OutboxRow } from '@shared/api';

export function OutboxPage() {
  return (
    <SimpleTablePage<OutboxRow>
      title="Outbox"
      load={listOutbox}
      columns={[
        { key: 'id', label: 'ID', render: (v) => String(v).slice(0, 8) + '…' },
        { key: 'type', label: 'Type' },
        { key: 'status', label: 'Status' },
        { key: 'createdAt', label: 'Created' },
        { key: 'lastError', label: 'Last error' }
      ]}
      actions={(row) => (
        <Button
          size="small"
          variant="outlined"
          disabled={row.status !== 'FAILED'}
          onClick={() => retryOutbox(row.id)}
        >
          Retry
        </Button>
      )}
    />
  );
}
