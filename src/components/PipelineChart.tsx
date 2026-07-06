import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { PIPELINE } from '../data/pipeline'
import { monthTick } from '../lib/format'
import { axisStyle, gridStyle, ChartTooltip, SERIES } from './chartTheme'

const data = PIPELINE.map((m) => ({ ...m, label: monthTick(m.month) }))

export function PipelineChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="pipelineReceived" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={SERIES[0]} stopOpacity={0.35} />
            <stop offset="100%" stopColor={SERIES[0]} stopOpacity={0.03} />
          </linearGradient>
        </defs>
        <CartesianGrid {...gridStyle} />
        <XAxis dataKey="label" {...axisStyle} />
        <YAxis {...axisStyle} allowDecimals={false} />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#e3e7f2' }} />
        <Legend
          iconType="plainline"
          wrapperStyle={{ fontSize: 12, color: '#5f6a87' }}
          formatter={(value: string) => <span className="text-muted">{value}</span>}
        />
        <Area
          name="Received"
          dataKey="received"
          stroke={SERIES[0]}
          strokeWidth={2}
          fill="url(#pipelineReceived)"
        />
        <Area
          name="Approved"
          dataKey="approved"
          stroke={SERIES[1]}
          strokeWidth={2}
          fill="none"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
