import type { Country, FranchiseApplication, FranchiseStore, PipelineMonth } from '../data/types'
import { overallScore, recommend } from './scoring'

export function receivedTotal(pipeline: PipelineMonth[]): number {
  return pipeline.reduce((acc, m) => acc + m.received, 0)
}

export function approvedTotal(pipeline: PipelineMonth[]): number {
  return pipeline.reduce((acc, m) => acc + m.approved, 0)
}

export function approvalRate(pipeline: PipelineMonth[]): number {
  const received = receivedTotal(pipeline)
  return received === 0 ? 0 : approvedTotal(pipeline) / received
}

/** Applications still moving through the funnel. */
export function openApplications(apps: FranchiseApplication[]): FranchiseApplication[] {
  return apps.filter((a) => a.status === 'New' || a.status === 'In Review' || a.status === 'Waitlist')
}

export function avgScore(apps: FranchiseApplication[]): number {
  if (apps.length === 0) return 0
  return Math.round(apps.reduce((acc, a) => acc + overallScore(a), 0) / apps.length)
}

/**
 * Committed investment across the qualified pipeline: a manual Approve counts
 * regardless of the derived recommendation; undecided applications must pass
 * the screening (not recommended for rejection).
 */
export function qualifiedInvestment(apps: FranchiseApplication[]): number {
  return apps
    .filter(
      (a) => a.status === 'Approved' || (a.status !== 'Rejected' && recommend(a) !== 'Reject'),
    )
    .reduce((acc, a) => acc + a.investment, 0)
}

export function networkRevenue(stores: FranchiseStore[]): number {
  return stores.reduce((acc, s) => acc + s.annualRevenue, 0)
}

export function revenueByCountry(stores: FranchiseStore[]): { country: Country; revenue: number }[] {
  const totals = new Map<Country, number>()
  for (const s of stores) totals.set(s.country, (totals.get(s.country) ?? 0) + s.annualRevenue)
  return [...totals.entries()]
    .map(([country, revenue]) => ({ country, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
}

export function countryMix(apps: FranchiseApplication[]): { country: Country; count: number }[] {
  const counts = new Map<Country, number>()
  for (const a of apps) counts.set(a.country, (counts.get(a.country) ?? 0) + 1)
  return [...counts.entries()]
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
}

/** Histogram of overall scores in fixed 10-point buckets. */
export function scoreBuckets(apps: FranchiseApplication[]): { bucket: string; count: number }[] {
  const buckets = [40, 50, 60, 70, 80, 90].map((lo) => ({
    lo,
    bucket: `${lo}–${lo + 9}`,
    count: 0,
  }))
  for (const a of apps) {
    const score = overallScore(a)
    const b = buckets.find((x) => score >= x.lo && score < x.lo + 10)
    if (b) b.count += 1
  }
  return buckets.map(({ bucket, count }) => ({ bucket, count }))
}
