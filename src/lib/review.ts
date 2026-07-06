import { REVIEW_TEMPLATE } from '../data/reviews'
import type { FranchiseApplication, ReviewArea, ReviewItemStatus } from '../data/types'

/**
 * Live review state: application id → item label → status. Seeded from
 * data/reviews.ts and owned by App state so reviewers can record checks.
 */
export type ReviewProgress = Record<string, Record<string, ReviewItemStatus>>

export interface ChecklistItem {
  area: ReviewArea
  item: string
  status: ReviewItemStatus
}

/** Items not explicitly tracked default by workflow status. */
function defaultStatus(app: FranchiseApplication): ReviewItemStatus {
  return app.status === 'Approved' ? 'Validated' : 'Pending'
}

/** The effective due-diligence checklist for one application. */
export function reviewChecklist(
  app: FranchiseApplication,
  progress: ReviewProgress,
): ChecklistItem[] {
  const appProgress = progress[app.id] ?? {}
  return REVIEW_TEMPLATE.flatMap(({ area, items }) =>
    items.map((item) => ({ area, item, status: appProgress[item] ?? defaultStatus(app) })),
  )
}

export interface AreaProgress {
  area: ReviewArea
  items: ChecklistItem[]
  validated: number
  failed: number
  total: number
}

export function areaProgress(app: FranchiseApplication, progress: ReviewProgress): AreaProgress[] {
  const checklist = reviewChecklist(app, progress)
  return REVIEW_TEMPLATE.map(({ area }) => {
    const items = checklist.filter((c) => c.area === area)
    return {
      area,
      items,
      validated: items.filter((c) => c.status === 'Validated').length,
      failed: items.filter((c) => c.status === 'Failed').length,
      total: items.length,
    }
  })
}

/** Share of checklist items validated, 0–1. */
export function reviewCompletion(app: FranchiseApplication, progress: ReviewProgress): number {
  const checklist = reviewChecklist(app, progress)
  if (checklist.length === 0) return 0
  return checklist.filter((c) => c.status === 'Validated').length / checklist.length
}

/** Failed checks across the whole checklist — the review blockers. */
export function failedItems(
  app: FranchiseApplication,
  progress: ReviewProgress,
): ChecklistItem[] {
  return reviewChecklist(app, progress).filter((c) => c.status === 'Failed')
}
