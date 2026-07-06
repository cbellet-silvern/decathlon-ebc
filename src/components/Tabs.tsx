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
  return (
    <div role="tablist" aria-label="Sections" className="mb-5 flex gap-6 border-b border-edge">
      {TABS.map((t) => {
        const isActive = t.id === active
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(t.id)}
            className={`-mb-px border-b-2 pb-2.5 text-sm font-extrabold uppercase italic tracking-wide transition-colors ${
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
