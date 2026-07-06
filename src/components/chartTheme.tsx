import type { TooltipProps } from 'recharts'

// Shared Recharts styling so every chart matches the light Decathlon theme.
export const axisStyle = {
  stroke: '#5f6a87',
  tick: { fill: '#5f6a87', fontSize: 12 },
  tickLine: false,
  axisLine: { stroke: '#e3e7f2' },
} as const

export const gridStyle = {
  stroke: '#e3e7f2',
  strokeDasharray: '3 3',
  vertical: false,
} as const

// Categorical series slots — validated (dataviz six checks) against the white
// panel surface in light mode. Slot 1 is Decathlon Blue. Assign in order,
// never cycle; sub-3:1 slots (aqua/yellow/magenta) require direct labels or a
// table view alongside.
export const SERIES = ['#3643ba', '#1baf7a', '#eda100', '#e34948', '#e87ba4', '#eb6834'] as const

// Fixed status scale (reserved meaning — never used as "series N"). Always
// paired with a glyph or label so color never carries meaning alone.
export const STATUS_COLORS = {
  good: '#0ca30c',
  warning: '#fab219',
  serious: '#ec835a',
  critical: '#d03b3b',
} as const

interface ChartTooltipProps extends TooltipProps<number, string> {
  formatter?: (v: number) => string
}

export function ChartTooltip({ active, payload, label, formatter }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rounded-xl border border-edge bg-panel/95 px-3 py-2 text-xs shadow-lg shadow-ink/5 backdrop-blur">
      <div className="mb-1 font-semibold text-ink">{label}</div>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-muted">
            <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
            {entry.name}
          </span>
          <span className="font-medium text-ink">
            {formatter ? formatter(entry.value as number) : entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}
