import type { ApplicationStatus, Recommendation } from '../data/types'
import { Icon, type IconKind } from './Icon'

// Status colors always ship with a glyph + label — color never carries the
// meaning alone (dataviz status rule). Badge text uses darker text-grade
// steps from the theme so it stays readable on white.
const REC_STYLE: Record<Recommendation, { kind: IconKind; className: string }> = {
  Approve: { kind: 'check', className: 'text-ok border-ok/30 bg-ok/10' },
  Review: { kind: 'bang', className: 'text-warn border-warn/30 bg-warn/10' },
  Reject: { kind: 'cross', className: 'text-danger border-danger/30 bg-danger/10' },
}

export function RecommendationBadge({ value }: { value: Recommendation }) {
  const { kind, className } = REC_STYLE[value]
  return (
    <span className={`pill border ${className}`}>
      <Icon kind={kind} className="h-2.5 w-2.5" />
      {value}
    </span>
  )
}

const STATUS_DOT: Record<ApplicationStatus, string> = {
  New: 'bg-brand',
  'In Review': 'bg-review',
  Approved: 'bg-ok',
  Rejected: 'bg-danger',
  Waitlist: 'bg-muted',
}

export function StatusBadge({ value }: { value: ApplicationStatus }) {
  return (
    <span className="pill border border-edge bg-panel2 text-ink">
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[value]}`} />
      {value}
    </span>
  )
}
