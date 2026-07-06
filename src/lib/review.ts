import { REVIEW_PROGRESS, REVIEW_TEMPLATE } from '../data/reviews'
import type { FranchiseApplication, ReviewArea, ReviewItemStatus } from '../data/types'

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
export function reviewChecklist(app: FranchiseApplication): ChecklistItem[] {
  const progress = REVIEW_PROGRESS[app.id] ?? {}
  return REVIEW_TEMPLATE.flatMap(({ area, items }) =>
    items.map((item) => ({ area, item, status: progress[item] ?? defaultStatus(app) })),
  )
}

export interface AreaProgress {
  area: ReviewArea
  items: ChecklistItem[]
  validated: number
  failed: number
  total: number
}

export function areaProgress(app: FranchiseApplication): AreaProgress[] {
  const checklist = reviewChecklist(app)
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
export function reviewCompletion(app: FranchiseApplication): number {
  const checklist = reviewChecklist(app)
  if (checklist.length === 0) return 0
  return checklist.filter((c) => c.status === 'Validated').length / checklist.length
}

/** Failed checks across the whole checklist — the review blockers. */
export function failedItems(app: FranchiseApplication): ChecklistItem[] {
  return reviewChecklist(app).filter((c) => c.status === 'Failed')
}
