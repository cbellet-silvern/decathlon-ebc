import type { FranchiseApplication } from '../data/types'
import { shortDate } from '../lib/format'
import { overallScore, recommend, validateApplication } from '../lib/scoring'
import { RecommendationBadge } from './Badges'
import { CriteriaRadar } from './CriteriaRadar'
import { STATUS_COLORS } from './chartTheme'

interface Props {
  application: FranchiseApplication
}

export function ApplicationDetail({ application }: Props) {
  const checks = validateApplication(application)
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold text-white">{application.candidate}</div>
          <div className="text-xs text-muted">
            {application.company} · {application.city}, {application.country} · submitted{' '}
            {shortDate(application.submitted)}
          </div>
        </div>
        <RecommendationBadge value={recommend(application)} />
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-4xl font-bold tracking-tight text-white">
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
              <span className="text-silver">{c.label}</span>
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
              className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-xs text-silver"
            >
              ⚠ {flag}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
