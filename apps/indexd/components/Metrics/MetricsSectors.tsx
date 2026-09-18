import {
  RemoteDataStates,
  StateError,
  StateNoneYet,
  useRemoteData,
  Skeleton,
} from '@siafoundation/design-system'
import { useAdminStatsSectors } from '@siafoundation/indexd-react'
import { InfoRow } from '../Data/PanelInfoRow'

export function MetricsSectors() {
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
        <StateError message="Error loading sector metrics. Please try again later." />
      }
      loading={
        <div className="flex flex-col gap-5 w-full">
          <InfoRow
            label="Slabs"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Repair Threshold"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Degraded Slabs"
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
            label="Waiting for Threshold"
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
          <InfoRow
            label="Migrated Sectors"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Pinned Sectors"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Unpinnable Sectors"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Unpinned Sectors"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Lost Sectors"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Checked Sectors"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
          <InfoRow
            label="Check Failed Sectors"
            value={<Skeleton className="h-12 w-[150px]" />}
          />
        </div>
      }
      notFound={<StateNoneYet message="No metrics found." />}
      loaded={(stats) => (
        <div className="flex flex-col gap-5 w-full">
          <InfoRow label="Slabs" value={stats.slabs.toLocaleString()} />
          <InfoRow
            label="Repair Threshold"
            value={`${stats.repairThreshold.toLocaleString()} sectors`}
          />
          <InfoRow
            label="Degraded Slabs"
            value={stats.degradedSlabs.toLocaleString()}
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
            label="Waiting for Threshold"
            value={stats.waitingForThresholdSlabs.toLocaleString()}
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
          <InfoRow
            label="Migrated Sectors"
            value={stats.migrated.toLocaleString()}
          />
          <InfoRow
            label="Pinned Sectors"
            value={stats.pinned.toLocaleString()}
          />
          <InfoRow
            label="Unpinnable Sectors"
            value={stats.unpinnable.toLocaleString()}
          />
          <InfoRow
            label="Unpinned Sectors"
            value={stats.unpinned.toLocaleString()}
          />
          <InfoRow
            label="Lost Sectors"
            value={stats.lost.toLocaleString()}
          />
          <InfoRow
            label="Checked Sectors"
            value={stats.checked.toLocaleString()}
          />
          <InfoRow
            label="Check Failed Sectors"
            value={stats.checkFailed.toLocaleString()}
          />
        </div>
      )}
    />
  )
}
