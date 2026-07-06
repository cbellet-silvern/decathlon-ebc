import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import type { FranchiseApplication } from '../data/types'
import { CRITERIA } from '../lib/scoring'
import { SERIES } from './chartTheme'

interface Props {
  application: FranchiseApplication
}

export function CriteriaRadar({ application }: Props) {
  const data = CRITERIA.map((c) => ({
    criterion: c.label.replace(' & risk', ''),
    value: application.criteria[c.key],
  }))
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="#26314f" />
        <PolarAngleAxis dataKey="criterion" tick={{ fill: '#8b96b2', fontSize: 11 }} />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <Radar
          name={application.candidate}
          dataKey="value"
          stroke={SERIES[0]}
          strokeWidth={2}
          fill={SERIES[0]}
          fillOpacity={0.3}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
