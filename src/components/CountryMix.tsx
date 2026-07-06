import type { FranchiseApplication } from '../data/types'
import { countryMix } from '../lib/metrics'
import { SERIES } from './chartTheme'

interface Props {
  applications: FranchiseApplication[]
}

// Countries are nominal categories of one measure, so every bar wears the
// same slot-1 hue with a direct value label (dataviz nominal-bar rule).
export function CountryMix({ applications }: Props) {
  const mix = countryMix(applications)
  const max = Math.max(...mix.map((m) => m.count), 1)
  return (
    <ul className="space-y-3">
      {mix.map((m) => (
        <li key={m.country}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-silver">{m.country}</span>
            <span className="font-medium tabular-nums text-muted">{m.count}</span>
          </div>
          <div className="h-2 rounded-full bg-panel2">
            <div
              className="h-2 rounded-full"
              style={{ width: `${(m.count / max) * 100}%`, background: SERIES[0] }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
