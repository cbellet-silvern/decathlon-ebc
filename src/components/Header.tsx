export function Header() {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand">
          <span className="text-lg font-extrabold italic tracking-tight text-white">D</span>
        </div>
        <div>
          <h1 className="text-lg font-extrabold uppercase tracking-wide text-white">Decathlon</h1>
          <p className="text-xs text-muted">Franchise Network Intelligence</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-edge bg-panel2/60 px-3 py-1.5 text-xs text-muted sm:flex">
          <span className="h-2 w-2 rounded-full bg-accent2" />
          Live · synced 2m ago
        </div>
        <div className="rounded-lg border border-edge bg-panel2/60 px-3 py-1.5 text-xs font-medium text-silver">
          FY26 · Expansion Wave 2
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
          CB
        </div>
      </div>
    </header>
  )
}
