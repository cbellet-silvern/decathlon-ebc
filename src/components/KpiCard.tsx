import type { ReactNode } from 'react'
import { signedPct } from '../lib/format'

interface KpiCardProps {
  label: string
  value: string
  /** Optional period-over-period delta as a ratio (e.g. 0.12 = +12%). */
  delta?: number
  /** When true, a negative delta is "good" (e.g. churn, at-risk ACV). */
  invertDelta?: boolean
  sub?: string
  icon?: ReactNode
}

export function KpiCard({ label, value, delta, invertDelta = false, sub, icon }: KpiCardProps) {
  const isGood = delta === undefined ? true : invertDelta ? delta <= 0 : delta >= 0
  return (
    <div className="card card-pad">
      <div className="flex items-start justify-between">
        <span className="label-muted">{label}</span>
        {icon && <span className="text-muted">{icon}</span>}
      </div>
      <div className="mt-3 text-3xl font-bold tracking-tight text-white">{value}</div>
      <div className="mt-2 flex items-center gap-2 text-sm">
        {delta !== undefined && (
          <span className={isGood ? 'text-accent2' : 'text-danger'}>{signedPct(delta)}</span>
        )}
        {sub && <span className="text-muted">{sub}</span>}
      </div>
    </div>
  )
}
