// Inline SVG status glyphs. Unicode marks (✓ ✕ ● ⚠) fall back to the color
// emoji font on some platforms — the webfont's latin subset doesn't cover
// them — which ignores CSS `color`. SVG + currentColor renders identically
// everywhere.
export type IconKind = 'check' | 'cross' | 'dot' | 'circle' | 'bang' | 'up' | 'down' | 'back'

interface Props {
  kind: IconKind
  className?: string
}

export function Icon({ kind, className = 'h-3 w-3' }: Props) {
  switch (kind) {
    case 'dot':
      return (
        <svg viewBox="0 0 12 12" className={className} aria-hidden>
          <circle cx="6" cy="6" r="3.5" fill="currentColor" />
        </svg>
      )
    case 'circle':
      return (
        <svg viewBox="0 0 12 12" className={className} aria-hidden>
          <circle cx="6" cy="6" r="3.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    case 'up':
      return (
        <svg viewBox="0 0 12 12" className={className} aria-hidden>
          <path d="M6 2.5l4 6.5H2z" fill="currentColor" />
        </svg>
      )
    case 'down':
      return (
        <svg viewBox="0 0 12 12" className={className} aria-hidden>
          <path d="M6 9.5L2 3h8z" fill="currentColor" />
        </svg>
      )
    case 'bang':
      return (
        <svg viewBox="0 0 12 12" className={className} aria-hidden>
          <path d="M6 2v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="6" cy="9.75" r="1.1" fill="currentColor" />
        </svg>
      )
    case 'back':
      return (
        <svg viewBox="0 0 12 12" className={className} aria-hidden>
          <path
            d="M7.5 2.5L4 6l3.5 3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'check':
      return (
        <svg viewBox="0 0 12 12" className={className} aria-hidden>
          <path
            d="M2.5 6.5l2.5 2.5 4.5-5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'cross':
      return (
        <svg viewBox="0 0 12 12" className={className} aria-hidden>
          <path
            d="M3 3l6 6M9 3l-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )
  }
}
