import type { ReactNode } from 'react'

interface PanelProps {
  title: string
  subtitle?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export function Panel({ title, subtitle, action, children, className = '' }: PanelProps) {
  return (
    <section className={`card card-pad ${className}`}>
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  )
}
