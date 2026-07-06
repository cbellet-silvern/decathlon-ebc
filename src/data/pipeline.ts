import type { PipelineMonth } from './types'

/**
 * Application pipeline volume, trailing 12 months. The table in
 * applications.ts holds the currently active subset; this series is the full
 * intake funnel the KPIs and trend chart report on.
 */
export const PIPELINE: PipelineMonth[] = [
  { month: '2025-07-01', received: 9, approved: 2 },
  { month: '2025-08-01', received: 11, approved: 3 },
  { month: '2025-09-01', received: 12, approved: 3 },
  { month: '2025-10-01', received: 14, approved: 4 },
  { month: '2025-11-01', received: 13, approved: 4 },
  { month: '2025-12-01', received: 15, approved: 4 },
  { month: '2026-01-01', received: 16, approved: 5 },
  { month: '2026-02-01', received: 18, approved: 6 },
  { month: '2026-03-01', received: 17, approved: 5 },
  { month: '2026-04-01', received: 19, approved: 6 },
  { month: '2026-05-01', received: 21, approved: 7 },
  { month: '2026-06-01', received: 22, approved: 7 },
]
