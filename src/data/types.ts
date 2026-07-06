export type Country =
  | 'France'
  | 'Belgium'
  | 'Netherlands'
  | 'Germany'
  | 'Spain'
  | 'Portugal'
  | 'Italy'
  | 'Poland'
  | 'Sweden'

export type StoreFormat = 'Full Store' | 'City Store' | 'Outlet'

/** Workflow state of an application — set by the franchise team. */
export type ApplicationStatus = 'New' | 'In Review' | 'Approved' | 'Rejected' | 'Waitlist'

/** Derived from the weighted score + validation gates (see lib/scoring.ts) — never stored. */
export type Recommendation = 'Approve' | 'Review' | 'Reject'

/** Per-criterion assessment, 0–100. */
export interface CriteriaScores {
  financial: number
  location: number
  experience: number
  brandFit: number
  compliance: number
}

export interface FranchiseApplication {
  id: string
  candidate: string
  company: string
  city: string
  country: Country
  lat: number
  lng: number
  format: StoreFormat
  /** Committed investment capacity in EUR. */
  investment: number
  retailYears: number
  submitted: string // ISO date
  status: ApplicationStatus
  criteria: CriteriaScores
  riskFlags: string[]
}

export type StorePerformance = 'Outperforming' | 'On Target' | 'Underperforming'

export interface FranchiseStore {
  id: string
  name: string
  city: string
  country: Country
  lat: number
  lng: number
  format: StoreFormat
  opened: string // ISO date
  annualRevenue: number // EUR
  performance: StorePerformance
}

/** One month of application pipeline volume. */
export interface PipelineMonth {
  month: string // ISO date, first of month
  received: number
  approved: number
}

/** Due-diligence workstream an application is reviewed under. */
export type ReviewArea =
  | 'Business Plan'
  | 'Legal'
  | 'Financing'
  | 'Site & Operations'
  | 'Compliance'

export type ReviewItemStatus = 'Pending' | 'In Progress' | 'Validated' | 'Failed'
