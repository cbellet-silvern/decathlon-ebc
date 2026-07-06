import type { CriteriaScores, FranchiseApplication, Recommendation } from '../data/types'
import { eur } from './format'

/**
 * The franchise scoring model. Weights sum to 1; the overall score is the
 * weighted sum of the five criteria (0–100). Hard gates below can reject an
 * application regardless of its score.
 */
export const CRITERIA: { key: keyof CriteriaScores; label: string; weight: number }[] = [
  { key: 'financial', label: 'Financial capacity', weight: 0.3 },
  { key: 'location', label: 'Location potential', weight: 0.25 },
  { key: 'experience', label: 'Retail experience', weight: 0.2 },
  { key: 'brandFit', label: 'Brand fit', weight: 0.15 },
  { key: 'compliance', label: 'Compliance & risk', weight: 0.1 },
]

export const MIN_INVESTMENT = 800_000
export const MIN_RETAIL_YEARS = 3
export const MIN_COMPLIANCE_SCORE = 60
export const APPROVE_THRESHOLD = 75
export const REVIEW_THRESHOLD = 55

export function overallScore(app: FranchiseApplication): number {
  const sum = CRITERIA.reduce((acc, c) => acc + app.criteria[c.key] * c.weight, 0)
  return Math.round(sum)
}

export interface CriterionCheck {
  label: string
  detail: string
  passed: boolean
}

/** The validation gates shown in the assessment panel. */
export function validateApplication(app: FranchiseApplication): CriterionCheck[] {
  return [
    {
      label: 'Investment capacity',
      detail: `${eur(app.investment)} committed · minimum ${eur(MIN_INVESTMENT)}`,
      passed: app.investment >= MIN_INVESTMENT,
    },
    {
      label: 'Retail experience',
      detail: `${app.retailYears} yrs · minimum ${MIN_RETAIL_YEARS} yrs`,
      passed: app.retailYears >= MIN_RETAIL_YEARS,
    },
    {
      label: 'Compliance screening',
      detail: `score ${app.criteria.compliance} · minimum ${MIN_COMPLIANCE_SCORE}`,
      passed: app.criteria.compliance >= MIN_COMPLIANCE_SCORE,
    },
    {
      label: 'Risk flags',
      detail: app.riskFlags.length === 0 ? 'none raised' : `${app.riskFlags.length} open`,
      passed: app.riskFlags.length === 0,
    },
  ]
}

/**
 * Approve requires clearing the score threshold, every hard gate, and having
 * no open risk flags; a failed hard gate rejects outright. Everything between
 * goes to human review.
 */
export function recommend(app: FranchiseApplication): Recommendation {
  const gatesPass = app.investment >= MIN_INVESTMENT && app.retailYears >= MIN_RETAIL_YEARS
  if (!gatesPass) return 'Reject'
  const score = overallScore(app)
  if (
    score >= APPROVE_THRESHOLD &&
    app.riskFlags.length === 0 &&
    app.criteria.compliance >= MIN_COMPLIANCE_SCORE
  ) {
    return 'Approve'
  }
  if (score >= REVIEW_THRESHOLD) return 'Review'
  return 'Reject'
}
