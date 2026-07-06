import type { ApplicationStatus, FranchiseApplication } from '../data/types'
import { recommend } from '../lib/scoring'
import { StatusBadge } from './Badges'
import { Icon } from './Icon'

interface Props {
  application: FranchiseApplication
  onDecision: (status: ApplicationStatus) => void
}

/** Approve / Waitlist / Reject actions + workflow status, in the page header. */
export function DecisionBar({ application, onDecision }: Props) {
  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge value={application.status} />
        <DecisionButton
          label="Approve"
          className="border-ok/30 bg-ok/10 text-ok hover:bg-ok/20"
          active={application.status === 'Approved'}
          target="Approved"
          onToggle={onDecision}
        />
        <DecisionButton
          label="Waitlist"
          className="border-edge bg-panel2 text-muted hover:text-ink"
          active={application.status === 'Waitlist'}
          target="Waitlist"
          onToggle={onDecision}
        />
        <DecisionButton
          label="Reject"
          className="border-danger/30 bg-danger/10 text-danger hover:bg-danger/20"
          active={application.status === 'Rejected'}
          target="Rejected"
          onToggle={onDecision}
        />
      </div>
      {application.status === 'Approved' && recommend(application) !== 'Approve' && (
        <div className="flex items-center gap-1.5 rounded-lg border border-warn/30 bg-warn/10 px-3 py-1.5 text-xs text-warn">
          <Icon kind="bang" className="h-3 w-3 shrink-0" />
          Overrides a “{recommend(application)}” recommendation — flagged for committee sign-off.
        </div>
      )}
    </div>
  )
}

// Clicking the active decision reverts the application to In Review, so no
// decision is a dead end.
function DecisionButton({
  label,
  className,
  active,
  target,
  onToggle,
}: {
  label: string
  className: string
  active: boolean
  target: ApplicationStatus
  onToggle: (status: ApplicationStatus) => void
}) {
  return (
    <button
      onClick={() => onToggle(active ? 'In Review' : target)}
      aria-pressed={active}
      title={active ? 'Click again to reopen the review' : undefined}
      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 ${className} ${
        active ? 'ring-2 ring-brand/50 ring-offset-1' : ''
      }`}
    >
      {label}
    </button>
  )
}
