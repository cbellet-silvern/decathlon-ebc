import type { TooltipProps } from 'recharts'

// Shared Recharts styling so every chart matches the dark Decathlon theme.
export const axisStyle = {
  stroke: '#8b96b2',
  tick: { fill: '#8b96b2', fontSize: 12 },
  tickLine: false,
  axisLine: { stroke: '#26314f' },
} as const

export const gridStyle = {
  stroke: '#26314f',
  strokeDasharray: '3 3',
  vertical: false,
} as const

// Categorical series slots — validated (dataviz six checks) against the panel
// surface #151b2c in dark mode. Assign in order, never cycle.
export const SERIES = ['#3987e5', '#199e70', '#c98500', '#9085e9', '#e66767', '#d95926'] as const

// Fixed status scale (reserved meaning — never used as "series N"). Always
// paired with a label or icon so color never carries meaning alone.
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
    <div className="rounded-xl border border-edge bg-panel2/95 px-3 py-2 text-xs shadow-xl backdrop-blur">
      <div className="mb-1 font-semibold text-white">{label}</div>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-muted">
            <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
            {entry.name}
          </span>
          <span className="font-medium text-silver">
            {formatter ? formatter(entry.value as number) : entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}
