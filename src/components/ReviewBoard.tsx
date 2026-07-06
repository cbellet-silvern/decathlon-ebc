import type { FranchiseApplication, ReviewItemStatus } from '../data/types'
import { areaProgress, type ReviewProgress } from '../lib/review'
import { SERIES, STATUS_COLORS } from './chartTheme'

// Distinct glyph per status so state never rides on color alone.
const STATUS_GLYPH: Record<ReviewItemStatus, { glyph: string; color?: string; className?: string }> =
  {
    Validated: { glyph: '✓', color: STATUS_COLORS.good },
    Failed: { glyph: '✕', color: STATUS_COLORS.critical },
    'In Progress': { glyph: '●', className: 'text-accent' },
    Pending: { glyph: '○', className: 'text-muted' },
  }

interface Props {
  application: FranchiseApplication
  progress: ReviewProgress
  onSetItem: (item: string, status: ReviewItemStatus) => void
}

export function ReviewBoard({ application, progress, onSetItem }: Props) {
  const areas = areaProgress(application, progress)
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {areas.map((a) => (
        <div key={a.area} className="rounded-xl border border-edge bg-panel2/60 p-3.5">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">{a.area}</h3>
            <span className="flex items-baseline gap-1.5 text-xs tabular-nums">
              {a.failed > 0 && (
                <span className="font-semibold" style={{ color: STATUS_COLORS.critical }}>
                  ✕{a.failed}
                </span>
              )}
              <span className="text-muted">
                {a.validated}/{a.total}
              </span>
            </span>
          </div>
          {/* Blue segment = validated share; red segment = failed share. */}
          <div className="mt-2 flex h-1.5 gap-px overflow-hidden rounded-full bg-edge">
            {a.validated > 0 && (
              <div
                className="h-1.5"
                style={{ width: `${(a.validated / a.total) * 100}%`, background: SERIES[0] }}
              />
            )}
            {a.failed > 0 && (
              <div
                className="h-1.5"
                style={{
                  width: `${(a.failed / a.total) * 100}%`,
                  background: STATUS_COLORS.critical,
                }}
              />
            )}
          </div>
          <ul className="mt-3 space-y-1.5">
            {a.items.map((item) => {
              const s = STATUS_GLYPH[item.status]
              return (
                <li key={item.item} className="group flex items-center gap-2 text-xs">
                  <span
                    aria-hidden
                    className={`w-3 shrink-0 text-center font-bold ${s.className ?? ''}`}
                    style={s.color ? { color: s.color } : undefined}
                  >
                    {s.glyph}
                  </span>
                  <span
                    className={`flex-1 py-0.5 ${item.status === 'Pending' ? 'text-muted' : 'text-ink'}`}
                    title={item.status}
                  >
                    {item.item}
                  </span>
                  <span className="flex gap-1 opacity-40 transition-opacity group-hover:opacity-100">
                    <CheckButton
                      label={`Validate: ${item.item}`}
                      glyph="✓"
                      active={item.status === 'Validated'}
                      activeColor={STATUS_COLORS.good}
                      onClick={() =>
                        onSetItem(item.item, item.status === 'Validated' ? 'Pending' : 'Validated')
                      }
                    />
                    <CheckButton
                      label={`Fail: ${item.item}`}
                      glyph="✕"
                      active={item.status === 'Failed'}
                      activeColor={STATUS_COLORS.critical}
                      onClick={() =>
                        onSetItem(item.item, item.status === 'Failed' ? 'Pending' : 'Failed')
                      }
                    />
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

function CheckButton({
  label,
  glyph,
  active,
  activeColor,
  onClick,
}: {
  label: string
  glyph: string
  active: boolean
  activeColor: string
  onClick: () => void
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`flex h-5 w-5 items-center justify-center rounded-md border text-[10px] font-bold transition-colors ${
        active ? 'border-transparent text-white' : 'border-edge bg-panel text-muted hover:text-ink'
      }`}
      style={active ? { background: activeColor } : undefined}
    >
      {glyph}
    </button>
  )
}
