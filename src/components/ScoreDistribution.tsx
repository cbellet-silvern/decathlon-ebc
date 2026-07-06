import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { FranchiseApplication } from '../data/types'
import { scoreBuckets } from '../lib/metrics'
import { axisStyle, gridStyle, ChartTooltip, SERIES } from './chartTheme'

interface Props {
  applications: FranchiseApplication[]
}

// Score buckets are ordered magnitude bins of one measure, so every bar wears
// the same slot-1 hue — the bar height carries the value.
export function ScoreDistribution({ applications }: Props) {
  const data = scoreBuckets(applications)
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }} barCategoryGap="28%">
        <CartesianGrid {...gridStyle} />
        <XAxis dataKey="bucket" {...axisStyle} />
        <YAxis {...axisStyle} allowDecimals={false} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(139,150,178,0.08)' }} />
        <Bar name="Applications" dataKey="count" fill={SERIES[0]} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
