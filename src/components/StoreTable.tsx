import type { FranchiseStore } from '../data/types'
import { eur, shortDate } from '../lib/format'
import { PerformanceBadge } from './Badges'

interface Props {
  stores: FranchiseStore[]
}

export function StoreTable({ stores }: Props) {
  const rows = [...stores].sort((a, b) => b.annualRevenue - a.annualRevenue)
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-edge text-xs uppercase tracking-wider text-muted">
            <th className="py-2 pr-3 font-medium">Store</th>
            <th className="py-2 pr-3 font-medium">Location</th>
            <th className="py-2 pr-3 font-medium">Format</th>
            <th className="py-2 pr-3 font-medium">Opened</th>
            <th className="py-2 pr-3 font-medium">Revenue</th>
            <th className="py-2 font-medium">Performance</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={s.id} className="border-b border-edge/50">
              <td className="py-2.5 pr-3 font-medium text-ink">{s.name}</td>
              <td className="py-2.5 pr-3">
                {s.city}
                <span className="text-muted"> · {s.country}</span>
              </td>
              <td className="py-2.5 pr-3">{s.format}</td>
              <td className="py-2.5 pr-3 text-muted">{shortDate(s.opened)}</td>
              <td className="py-2.5 pr-3 tabular-nums font-medium text-ink">
                {eur(s.annualRevenue)}
              </td>
              <td className="py-2.5">
                <PerformanceBadge value={s.performance} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
