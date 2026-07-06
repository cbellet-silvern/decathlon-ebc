import type { ReviewArea, ReviewItemStatus, ReviewProgress } from './types'

/**
 * The due-diligence checklist every application is reviewed against. The
 * template is fixed; per-application progress lives in REVIEW_PROGRESS below
 * and the effective checklist is assembled in lib/review.ts.
 */
export const REVIEW_TEMPLATE: { area: ReviewArea; items: string[] }[] = [
  {
    area: 'Business Plan',
    items: ['Market & catchment study', '5-year P&L projections', 'Local competition analysis'],
  },
  {
    area: 'Legal',
    items: [
      'Corporate structure & ownership',
      'Litigation & sanctions screening',
      'Franchise agreement terms',
    ],
  },
  {
    area: 'Financing',
    items: ['Proof of funds', 'Bank guarantee / financing letter', 'Debt ratio & capital structure'],
  },
  {
    area: 'Site & Operations',
    items: ['Site survey & lease terms', 'Staffing & operations plan'],
  },
  {
    area: 'Compliance',
    items: ['KYC / UBO verification', 'Data protection & trade compliance'],
  },
]

/** Every template item marked Validated — the seed state of approved applications. */
const ALL_VALIDATED: Record<string, ReviewItemStatus> = Object.fromEntries(
  REVIEW_TEMPLATE.flatMap((t) => t.items).map((item) => [item, 'Validated' as const]),
)

/**
 * Review work actually performed, keyed by application id then item label.
 * Items not listed are Pending — nothing is ever inferred from workflow
 * status, so the board only shows checks that were really recorded.
 */
export const REVIEW_PROGRESS: ReviewProgress = {
  // Amélie Rousseau / Elena Ricci — approved after full due diligence
  'ap-01': { ...ALL_VALIDATED },
  'ap-05': { ...ALL_VALIDATED },
  // Jonas De Vries — advanced review, financing letter outstanding
  'ap-02': {
    'Market & catchment study': 'Validated',
    '5-year P&L projections': 'Validated',
    'Local competition analysis': 'Validated',
    'Corporate structure & ownership': 'Validated',
    'Litigation & sanctions screening': 'Validated',
    'Franchise agreement terms': 'In Progress',
    'Proof of funds': 'Validated',
    'Bank guarantee / financing letter': 'In Progress',
    'Site survey & lease terms': 'Validated',
    'KYC / UBO verification': 'Validated',
  },
  // Carla Moreno — mid review
  'ap-03': {
    'Market & catchment study': 'Validated',
    '5-year P&L projections': 'In Progress',
    'Corporate structure & ownership': 'Validated',
    'Proof of funds': 'Validated',
    'KYC / UBO verification': 'In Progress',
  },
  // Piotr Nowak — early review
  'ap-04': {
    'Market & catchment study': 'In Progress',
    'Corporate structure & ownership': 'Validated',
    'KYC / UBO verification': 'Validated',
  },
  // Thomas Weber — advanced review, lease under negotiation
  'ap-06': {
    'Market & catchment study': 'Validated',
    '5-year P&L projections': 'Validated',
    'Local competition analysis': 'Validated',
    'Corporate structure & ownership': 'Validated',
    'Litigation & sanctions screening': 'Validated',
    'Proof of funds': 'Validated',
    'Bank guarantee / financing letter': 'Validated',
    'Debt ratio & capital structure': 'Validated',
    'Site survey & lease terms': 'In Progress',
    'KYC / UBO verification': 'Validated',
    'Data protection & trade compliance': 'Validated',
  },
  // Marc Dubois — rejected: financing and KYC failed
  'ap-08': {
    'Market & catchment study': 'Validated',
    'Proof of funds': 'Failed',
    'KYC / UBO verification': 'Failed',
  },
  // Ingrid Johansson — waitlisted: review paused after initial checks
  'ap-09': {
    'Market & catchment study': 'Validated',
    'Corporate structure & ownership': 'Validated',
    'KYC / UBO verification': 'Validated',
  },
  // Luca Bianchi — site check failed on territory overlap
  'ap-10': {
    'Market & catchment study': 'In Progress',
    'Site survey & lease terms': 'Failed',
    'KYC / UBO verification': 'Validated',
  },
  // Hugo Fernández — litigation screening failed, rest on hold
  'ap-12': {
    'Market & catchment study': 'Validated',
    '5-year P&L projections': 'Validated',
    'Corporate structure & ownership': 'Validated',
    'Litigation & sanctions screening': 'Failed',
    'Proof of funds': 'Validated',
    'KYC / UBO verification': 'In Progress',
  },
}
