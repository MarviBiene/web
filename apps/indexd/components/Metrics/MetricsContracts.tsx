import {
  RemoteDataStates,
  StateError,
  StateNoneYet,
  useRemoteData,
  Skeleton,
} from '@siafoundation/design-system'
import { useAdminStatsContracts } from '@siafoundation/indexd-react'
import { humanBytes } from '@siafoundation/units'
import { InfoRow } from '../Data/PanelInfoRow'

export function MetricsContracts() {
  const contracts = useAdminStatsContracts()
  const stats = useRemoteData(
    {
      contracts,
    },
    (data) => ({
      ...data.contracts,
    }),
  )
  return (
    <RemoteDataStates
      data={stats}
      error={
        <StateError message="Error loading metrics. Please try again later." />
      }
      loading={
        <div className="flex flex-col gap-5 w-full">
          <InfoRow
            label="Contracts"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Bad Contracts"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Renewing Contracts"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Total Capacity"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Total Size"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
        </div>
      }
      notFound={<StateNoneYet message="No metrics found." />}
      loaded={(stats) => (
        <div className="flex flex-col gap-5 w-full">
          <InfoRow label="Contracts" value={stats.contracts.toLocaleString()} />
          <InfoRow
            label="Bad Contracts"
            value={stats.badContracts.toLocaleString()}
          />
          <ContractLifecycleMetrics stats={stats} />
          <InfoRow
            label="Renewing Contracts"
            value={stats.renewing.toLocaleString()}
          />
          <InfoRow
            label="Total Capacity"
            value={humanBytes(stats.totalCapacity)}
          />
          <InfoRow label="Total Size" value={humanBytes(stats.totalSize)} />
        </div>
      )}
    />
  )
}


// These fields are supplied by the enhanced indexd backend. Older indexd
// deployments continue to render their original statistics unchanged.
function ContractLifecycleMetrics({ stats }: { stats: unknown }) {
  const record = stats as Record<string, unknown>
  const count = (key: string) => typeof record[key] === 'number'
    ? (record[key] as number).toLocaleString()
    : '—'
  const bytes = (key: string) => typeof record[key] === 'number'
    ? humanBytes(record[key] as number)
    : '—'
  if (typeof record.healthyContracts !== 'number') {
    return null
  }
  return (
    <>
      <InfoRow label="Healthy Contracts" value={count('healthyContracts')} />
      <InfoRow label="Quarantine Contracts" value={count('quarantineContracts')} />
      <InfoRow label="Permanent Ban Contracts" value={count('permanentBanContracts')} />
      <InfoRow label="Other Bad Contracts" value={count('otherBadContracts')} />
      <InfoRow label="Healthy Capacity" value={bytes('healthyCapacity')} />
      <InfoRow label="Quarantine Capacity" value={bytes('quarantineCapacity')} />
      <InfoRow label="Permanent Ban Capacity" value={bytes('permanentBanCapacity')} />
    </>
  )
}
