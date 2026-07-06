import { useMemo, useState } from 'react'
import type { FranchiseApplication, ReviewProgress } from '../data/types'
import { eur, pct } from '../lib/format'
import { failedItems, reviewCompletion } from '../lib/review'
import { overallScore, recommend } from '../lib/scoring'
import { RecommendationBadge, StatusBadge } from './Badges'
import { Icon } from './Icon'
import { SERIES } from './chartTheme'

type SortKey = 'score' | 'investment' | 'submitted'

interface Props {
  applications: FranchiseApplication[]
  progress: ReviewProgress
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ApplicationsTable({ applications, progress, selectedId, onSelect }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('score')

  const rows = useMemo(() => {
    const sorted = [...applications]
    if (sortKey === 'score') sorted.sort((a, b) => overallScore(b) - overallScore(a))
    if (sortKey === 'investment') sorted.sort((a, b) => b.investment - a.investment)
    if (sortKey === 'submitted') sorted.sort((a, b) => b.submitted.localeCompare(a.submitted))
    return sorted
  }, [applications, sortKey])

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-edge text-xs uppercase tracking-wider text-muted">
            <th className="py-2 pr-3 font-medium">Candidate</th>
            <th className="py-2 pr-3 font-medium">Location</th>
            <th className="py-2 pr-3 font-medium">Format</th>
            <SortHeader label="Investment" active={sortKey === 'investment'} onClick={() => setSortKey('investment')} />
            <SortHeader label="Score" active={sortKey === 'score'} onClick={() => setSortKey('score')} />
            <th className="py-2 pr-3 font-medium">Review</th>
            <th className="py-2 pr-3 font-medium">Recommendation</th>
            <th className="py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => {
            const score = overallScore(a)
            const failed = failedItems(a, progress).length
            const completion = reviewCompletion(a, progress)
            const selected = a.id === selectedId
            return (
              <tr
                key={a.id}
                tabIndex={0}
                onClick={() => onSelect(a.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelect(a.id)
                  }
                }}
                aria-label={`Open ${a.candidate}'s application file`}
                className={`cursor-pointer border-b border-edge/50 transition-colors focus-visible:bg-panel2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/60 ${
                  selected ? 'bg-panel2' : 'hover:bg-panel2/60'
                }`}
              >
                <td className="py-2.5 pr-3">
                  <div className="font-medium text-ink">{a.candidate}</div>
                  <div className="text-xs text-muted">{a.company}</div>
                </td>
                <td className="py-2.5 pr-3">
                  {a.city}
                  <span className="text-muted"> · {a.country}</span>
                </td>
                <td className="py-2.5 pr-3">{a.format}</td>
                <td className="py-2.5 pr-3 tabular-nums">{eur(a.investment)}</td>
                <td className="py-2.5 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 tabular-nums font-semibold text-ink">{score}</span>
                    <span className="h-1.5 w-10 rounded-full bg-edge">
                      <span
                        className="block h-1.5 rounded-full"
                        style={{ width: `${score}%`, background: SERIES[0] }}
                      />
                    </span>
                  </div>
                </td>
                <td className="py-2.5 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-10 rounded-full bg-edge">
                      <span
                        className="block h-1.5 rounded-full"
                        style={{ width: `${completion * 100}%`, background: SERIES[0] }}
                      />
                    </span>
                    <span className="w-8 text-xs tabular-nums text-muted">{pct(completion)}</span>
                    {failed > 0 && (
                      <span
                        className="inline-flex items-center gap-0.5 text-xs font-semibold tabular-nums text-danger"
                        title={`${failed} failed check(s)`}
                      >
                        <Icon kind="cross" className="h-2.5 w-2.5" />
                        {failed}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-2.5 pr-3">
                  <RecommendationBadge value={recommend(a)} />
                </td>
                <td className="py-2.5">
                  <StatusBadge value={a.status} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function SortHeader({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <th className="py-2 pr-3 font-medium">
      <button
        onClick={onClick}
        className={`uppercase tracking-wider ${active ? 'text-brand' : 'text-muted hover:text-ink'}`}
      >
        {label} {active && '↓'}
      </button>
    </th>
  )
}
