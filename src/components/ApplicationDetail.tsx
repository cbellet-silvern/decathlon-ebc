import type { FranchiseApplication } from '../data/types'
import { overallScore, recommend, validateApplication } from '../lib/scoring'
import { RecommendationBadge } from './Badges'
import { CriteriaRadar } from './CriteriaRadar'
import { Icon } from './Icon'

interface Props {
  application: FranchiseApplication
}

/** Scoring & validation-gates panel of the candidate page. */
export function ApplicationDetail({ application }: Props) {
  const checks = validateApplication(application)
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight text-ink">
            {overallScore(application)}
          </span>
          <span className="text-sm text-muted">/ 100 weighted score</span>
        </div>
        <RecommendationBadge value={recommend(application)} />
      </div>

      <CriteriaRadar application={application} />

      <ul className="mt-2 space-y-2">
        {checks.map((c) => (
          <li key={c.label} className="flex items-start gap-2.5 text-sm">
            <span className={`mt-1 ${c.passed ? 'text-ok' : 'text-danger'}`}>
              <Icon kind={c.passed ? 'check' : 'cross'} className="h-3 w-3" />
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
              className="flex items-center gap-1.5 rounded-lg border border-danger/30 bg-danger/5 px-3 py-2 text-xs text-danger"
            >
              <Icon kind="bang" className="h-3 w-3 shrink-0" /> {flag}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
