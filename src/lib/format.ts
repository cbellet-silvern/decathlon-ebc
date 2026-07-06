/** Compact EUR, e.g. €1.45M / €620K. */
export function eur(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 1_000_000) return `€${(value / 1_000_000).toFixed(2)}M`
  if (abs >= 1_000) return `€${Math.round(value / 1_000)}K`
  return `€${value}`
}

/** Full EUR with separators, e.g. €1,450,000. */
export function eurFull(value: number): string {
  return `€${value.toLocaleString('en-US')}`
}

export function pct(ratio: number, digits = 0): string {
  return `${(ratio * 100).toFixed(digits)}%`
}

export function signedPct(ratio: number, digits = 1): string {
  const s = (ratio * 100).toFixed(digits)
  return ratio >= 0 ? `+${s}%` : `${s}%`
}

/** Short month-year from an ISO date, e.g. "Mar 2026". */
export function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

/** Bare month from an ISO date, e.g. "Mar" — for chart axis ticks. */
export function monthTick(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short' })
}
