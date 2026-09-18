import {
  RemoteDataStates,
  StateError,
  StateNoneYet,
  useRemoteData,
  Skeleton,
} from '@siafoundation/design-system'
import { useAdminStatsSectors } from '@siafoundation/indexd-react'
import { InfoRow } from '../Data/PanelInfoRow'

export function MetricsRepair() {
  const sectors = useAdminStatsSectors()
  const stats = useRemoteData(
    {
      sectors,
    },
    (data) => ({
      ...data.sectors,
    }),
  )
  return (
    <RemoteDataStates
      data={stats}
      error={
        <StateError message="Error loading repair metrics. Please try again later." />
      }
      loading={
        <div className="flex flex-col gap-5 w-full">
          <InfoRow
            label="Repair Threshold"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Degraded Slabs"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Waiting for Threshold"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="To Migrate Slabs"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Ready to Migrate"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Deferred / Backoff"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Retrying Slabs"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Stuck Slabs"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Unrecoverable Slabs"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Degraded Sectors"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
        </div>
      }
      notFound={<StateNoneYet message="No repair metrics found." />}
      loaded={(stats) => (
        <div className="flex flex-col gap-5 w-full">
          <InfoRow
            label="Repair Threshold"
            value={`${stats.repairThreshold.toLocaleString()} sectors`}
          />
          <InfoRow
            label="Degraded Slabs"
            value={stats.degradedSlabs.toLocaleString()}
          />
          <InfoRow
            label="Waiting for Threshold"
            value={stats.waitingForThresholdSlabs.toLocaleString()}
          />
          <InfoRow
            label="To Migrate Slabs"
            value={stats.toMigrateSlabs.toLocaleString()}
          />
          <InfoRow
            label="Ready to Migrate"
            value={stats.readyToMigrateSlabs.toLocaleString()}
          />
          <InfoRow
            label="Deferred / Backoff"
            value={stats.deferredMigrationSlabs.toLocaleString()}
          />
          <InfoRow
            label="Retrying Slabs"
            value={stats.retryingSlabs.toLocaleString()}
          />
          <InfoRow
            label="Stuck Slabs"
            value={stats.stuckSlabs.toLocaleString()}
          />
          <InfoRow
            label="Unrecoverable Slabs"
            value={stats.unrecoverableSlabs.toLocaleString()}
          />
          <InfoRow
            label="Degraded Sectors"
            value={stats.degradedSectors.toLocaleString()}
          />
        </div>
      )}
    />
  )
}
