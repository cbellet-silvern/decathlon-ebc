import type { ApplicationStatus, Recommendation } from '../data/types'
import { STATUS_COLORS } from './chartTheme'

// Status colors always ship with a glyph + label — color never carries the
// meaning alone (dataviz status rule).
const REC_STYLE: Record<Recommendation, { color: string; glyph: string }> = {
  Approve: { color: STATUS_COLORS.good, glyph: '✓' },
  Review: { color: STATUS_COLORS.warning, glyph: '!' },
  Reject: { color: STATUS_COLORS.critical, glyph: '✕' },
}

export function RecommendationBadge({ value }: { value: Recommendation }) {
  const { color, glyph } = REC_STYLE[value]
  return (
    <span
      className="pill border"
      style={{ color, borderColor: `${color}55`, background: `${color}14` }}
    >
      <span aria-hidden className="text-[10px] font-bold">
        {glyph}
      </span>
      {value}
    </span>
  )
}

const STATUS_DOT: Record<ApplicationStatus, string> = {
  New: 'bg-accent',
  'In Review': 'bg-review',
  Approved: 'bg-ok',
  Rejected: 'bg-danger',
  Waitlist: 'bg-muted',
}

export function StatusBadge({ value }: { value: ApplicationStatus }) {
  return (
    <span className="pill border border-edge bg-panel2/60 text-silver">
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[value]}`} />
      {value}
    </span>
  )
}
