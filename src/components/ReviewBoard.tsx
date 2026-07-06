import type { FranchiseApplication, ReviewItemStatus } from '../data/types'
import { areaProgress } from '../lib/review'
import { STATUS_COLORS } from './chartTheme'

// Distinct glyph per status so state never rides on color alone.
const STATUS_GLYPH: Record<ReviewItemStatus, { glyph: string; color: string }> = {
  Validated: { glyph: '✓', color: STATUS_COLORS.good },
  Failed: { glyph: '✕', color: STATUS_COLORS.critical },
  'In Progress': { glyph: '●', color: '#5b6cff' },
  Pending: { glyph: '○', color: '#8b96b2' },
}

interface Props {
  application: FranchiseApplication
}

export function ReviewBoard({ application }: Props) {
  const areas = areaProgress(application)
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {areas.map((a) => (
        <div key={a.area} className="rounded-xl border border-edge bg-panel2/40 p-3.5">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-silver">
              {a.area}
            </h3>
            <span className="text-xs tabular-nums text-muted">
              {a.validated}/{a.total}
            </span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-panel">
            <div
              className="h-1.5 rounded-full"
              style={{
                width: `${(a.validated / a.total) * 100}%`,
                background: a.failed > 0 ? STATUS_COLORS.critical : STATUS_COLORS.good,
              }}
            />
          </div>
          <ul className="mt-3 space-y-2">
            {a.items.map((item) => {
              const s = STATUS_GLYPH[item.status]
              return (
                <li key={item.item} className="flex items-start gap-2 text-xs">
                  <span
                    aria-hidden
                    className="mt-px w-3 shrink-0 text-center font-bold"
                    style={{ color: s.color }}
                  >
                    {s.glyph}
                  </span>
                  <span
                    className={item.status === 'Pending' ? 'text-muted' : 'text-silver'}
                    title={item.status}
                  >
                    {item.item}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
