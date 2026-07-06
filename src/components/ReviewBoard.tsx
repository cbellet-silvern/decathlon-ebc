import type { FranchiseApplication, ReviewItemStatus, ReviewProgress } from '../data/types'
import { areaProgress } from '../lib/review'
import { Icon, type IconKind } from './Icon'
import { SERIES, STATUS_COLORS } from './chartTheme'

// Distinct glyph per status so state never rides on color alone. Text-grade
// theme tokens keep the glyphs readable on white.
const STATUS_GLYPH: Record<ReviewItemStatus, { kind: IconKind; className: string }> = {
  Validated: { kind: 'check', className: 'text-ok' },
  Failed: { kind: 'cross', className: 'text-danger' },
  'In Progress': { kind: 'dot', className: 'text-brand' },
  Pending: { kind: 'circle', className: 'text-muted' },
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
            <span className="flex items-center gap-1.5 text-xs tabular-nums">
              {a.failed > 0 && (
                <span className="inline-flex items-center gap-0.5 font-semibold text-danger">
                  <Icon kind="cross" className="h-2.5 w-2.5" />
                  {a.failed}
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
              const toggle = (target: ReviewItemStatus) =>
                onSetItem(item.item, item.status === target ? 'Pending' : target)
              return (
                <li key={item.item} className="group flex items-center gap-2 text-xs">
                  <span className={`w-3 shrink-0 ${s.className}`}>
                    <Icon kind={s.kind} className="h-3 w-3" />
                  </span>
                  <span
                    className={`flex-1 py-0.5 ${item.status === 'Pending' ? 'text-muted' : 'text-ink'}`}
                    title={item.status}
                  >
                    {item.item}
                  </span>
                  <span className="flex gap-1 opacity-60 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                    <CheckButton
                      label={`Mark in progress: ${item.item}`}
                      kind="dot"
                      active={item.status === 'In Progress'}
                      activeClass="border-transparent bg-brand text-white"
                      onClick={() => toggle('In Progress')}
                    />
                    <CheckButton
                      label={`Validate: ${item.item}`}
                      kind="check"
                      active={item.status === 'Validated'}
                      activeClass="border-transparent bg-ok text-white"
                      onClick={() => toggle('Validated')}
                    />
                    <CheckButton
                      label={`Fail: ${item.item}`}
                      kind="cross"
                      active={item.status === 'Failed'}
                      activeClass="border-transparent bg-danger text-white"
                      onClick={() => toggle('Failed')}
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
  kind,
  active,
  activeClass,
  onClick,
}: {
  label: string
  kind: IconKind
  active: boolean
  activeClass: string
  onClick: () => void
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 ${
        active ? activeClass : 'border-edge bg-panel text-muted hover:text-ink'
      }`}
    >
      <Icon kind={kind} className="h-2.5 w-2.5" />
    </button>
  )
}
