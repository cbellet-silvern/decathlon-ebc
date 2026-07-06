export type TabId = 'overview' | 'applications' | 'network'

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'applications', label: 'Application Review' },
  { id: 'network', label: 'Store Network' },
]

interface Props {
  active: TabId
  onChange: (tab: TabId) => void
}

export function Tabs({ active, onChange }: Props) {
  const activeIndex = TABS.findIndex((t) => t.id === active)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const delta = e.key === 'ArrowRight' ? 1 : -1
    const next = TABS[(activeIndex + delta + TABS.length) % TABS.length]
    onChange(next.id)
    document.getElementById(`tab-${next.id}`)?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label="Sections"
      onKeyDown={onKeyDown}
      className="mb-5 flex gap-6 border-b border-edge"
    >
      {TABS.map((t) => {
        const isActive = t.id === active
        return (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(t.id)}
            className={`-mb-px border-b-2 pb-2.5 text-sm font-extrabold uppercase italic tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 ${
              isActive ? 'border-brand text-brand' : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
