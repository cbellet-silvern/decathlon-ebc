import type { ApplicationStatus, FranchiseApplication } from '../data/types'
import { shortDate } from '../lib/format'
import { overallScore, recommend, validateApplication } from '../lib/scoring'
import { RecommendationBadge, StatusBadge } from './Badges'
import { CriteriaRadar } from './CriteriaRadar'
import { STATUS_COLORS } from './chartTheme'

interface Props {
  application: FranchiseApplication
  onDecision: (status: ApplicationStatus) => void
}

export function ApplicationDetail({ application, onDecision }: Props) {
  const checks = validateApplication(application)
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold text-ink">{application.candidate}</div>
          <div className="text-xs text-muted">
            {application.company} · {application.city}, {application.country} · submitted{' '}
            {shortDate(application.submitted)}
          </div>
        </div>
        <RecommendationBadge value={recommend(application)} />
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-4xl font-bold tracking-tight text-ink">
          {overallScore(application)}
        </span>
        <span className="text-sm text-muted">/ 100 weighted score</span>
      </div>

      <CriteriaRadar application={application} />

      <ul className="mt-2 space-y-2">
        {checks.map((c) => (
          <li key={c.label} className="flex items-start gap-2.5 text-sm">
            <span
              aria-hidden
              className="mt-0.5 text-xs font-bold"
              style={{ color: c.passed ? STATUS_COLORS.good : STATUS_COLORS.critical }}
            >
              {c.passed ? '✓' : '✕'}
            </span>
            <div>
              <span className="text-ink">{c.label}</span>
              <span className="text-xs text-muted"> — {c.detail}</span>
            </div>
          </li>
        ))}
      </ul>

      {application.riskFlags.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {application.riskFlags.map((flag) => (
            <div
              key={flag}
              className="rounded-lg border border-danger/30 bg-danger/5 px-3 py-2 text-xs text-danger"
            >
              ⚠ {flag}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-edge pt-4">
        <DecisionButton
          label="Approve"
          className="border-ok/30 bg-ok/10 text-ok hover:bg-ok/20"
          active={application.status === 'Approved'}
          onClick={() => onDecision('Approved')}
        />
        <DecisionButton
          label="Waitlist"
          className="border-edge bg-panel2 text-muted hover:text-ink"
          active={application.status === 'Waitlist'}
          onClick={() => onDecision('Waitlist')}
        />
        <DecisionButton
          label="Reject"
          className="border-danger/30 bg-danger/10 text-danger hover:bg-danger/20"
          active={application.status === 'Rejected'}
          onClick={() => onDecision('Rejected')}
        />
        <span className="ml-auto">
          <StatusBadge value={application.status} />
        </span>
      </div>
    </div>
  )
}

function DecisionButton({
  label,
  className,
  active,
  onClick,
}: {
  label: string
  className: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${className} ${
        active ? 'ring-2 ring-brand/30' : ''
      }`}
    >
      {label}
    </button>
  )
}
