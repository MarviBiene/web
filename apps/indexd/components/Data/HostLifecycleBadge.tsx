import { Badge, Tooltip } from '@siafoundation/design-system'

export type HostLifecycle = 'healthy' | 'quarantine' | 'permanentBan'

export function HostLifecycleBadge({
  lifecycle,
  activeContract = true,
}: {
  lifecycle?: HostLifecycle
  activeContract?: boolean
}) {
  // Keep the existing neutral appearance for hosts without a contract;
  // a tooltip still exposes an operator ban or temporary quarantine.
  const inactive = !activeContract
  const variant = inactive || !lifecycle
    ? 'gray'
    : lifecycle === 'permanentBan'
      ? 'red'
      : lifecycle === 'quarantine'
        ? 'amber'
        : 'green'
  const label = inactive
    ? 'No contract'
    : !lifecycle
      ? 'Unknown'
      : lifecycle === 'permanentBan'
      ? 'Permanent ban'
      : lifecycle === 'quarantine'
        ? 'Quarantine'
        : 'Healthy'
  const explanation =
    !lifecycle
      ? 'Lifecycle status requires the matching enhanced indexd backend.'
      : lifecycle === 'permanentBan'
      ? 'Operator-controlled ban. Manual unblocking required.'
      : lifecycle === 'quarantine'
        ? 'Temporary usability failure. Existing paid contract is retained.'
        : 'Host is eligible for use.'

  return (
    <Tooltip content={inactive ? `${label} · ${explanation}` : explanation}>
      <Badge size="small" variant={variant}>
        {label}
      </Badge>
    </Tooltip>
  )
}
