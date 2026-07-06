import type { ApplicationStatus, Recommendation, StorePerformance } from '../data/types'

// Status colors always ship with a glyph + label — color never carries the
// meaning alone (dataviz status rule). Badge text uses darker text-grade
// steps from the theme so it stays readable on white.
const REC_STYLE: Record<Recommendation, { glyph: string; className: string }> = {
  Approve: { glyph: '✓', className: 'text-ok border-ok/30 bg-ok/10' },
  Review: { glyph: '!', className: 'text-warn border-warn/30 bg-warn/10' },
  Reject: { glyph: '✕', className: 'text-danger border-danger/30 bg-danger/10' },
}

export function RecommendationBadge({ value }: { value: Recommendation }) {
  const { glyph, className } = REC_STYLE[value]
  return (
    <span className={`pill border ${className}`}>
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
    <span className="pill border border-edge bg-panel2 text-ink">
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[value]}`} />
      {value}
    </span>
  )
}

const PERF_STYLE: Record<StorePerformance, { glyph: string; className: string }> = {
  Outperforming: { glyph: '▲', className: 'text-ok border-ok/30 bg-ok/10' },
  'On Target': { glyph: '●', className: 'text-brand border-brand/30 bg-brand/10' },
  Underperforming: { glyph: '▼', className: 'text-warn border-warn/30 bg-warn/10' },
}

export function PerformanceBadge({ value }: { value: StorePerformance }) {
  const { glyph, className } = PERF_STYLE[value]
  return (
    <span className={`pill border ${className}`}>
      <span aria-hidden className="text-[9px]">
        {glyph}
      </span>
      {value}
    </span>
  )
}
