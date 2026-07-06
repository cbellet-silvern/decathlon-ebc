import type { FranchiseStore } from '../data/types'
import { eur } from '../lib/format'
import { revenueByCountry } from '../lib/metrics'
import { SERIES } from './chartTheme'

interface Props {
  stores: FranchiseStore[]
}

// Countries are nominal categories of one measure — same slot-1 hue per bar,
// value carried by length + direct label (dataviz nominal-bar rule).
export function RevenueByCountry({ stores }: Props) {
  const mix = revenueByCountry(stores)
  const max = Math.max(...mix.map((m) => m.revenue), 1)
  return (
    <ul className="space-y-3">
      {mix.map((m) => (
        <li key={m.country}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-ink">{m.country}</span>
            <span className="font-medium tabular-nums text-muted">{eur(m.revenue)}</span>
          </div>
          <div className="h-2 rounded-full bg-edge">
            <div
              className="h-2 rounded-full"
              style={{ width: `${(m.revenue / max) * 100}%`, background: SERIES[0] }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
