import type { CandidateDocument, DocumentStatus, ReviewNote } from './types'

/** The artifacts every application file must contain, in display order. */
export const DOCUMENT_TEMPLATE = [
  'Business plan',
  'Financial statements (3 yrs)',
  'Proof of funds letter',
  'ID & company registration',
  'Lease heads of terms',
  'Signed application form',
] as const

/** Build one file's document list from per-template statuses. */
function docs(statuses: DocumentStatus[], updated: string): CandidateDocument[] {
  return DOCUMENT_TEMPLATE.map((name, i) => ({ name, status: statuses[i] ?? 'Missing', updated }))
}

/** The starting file for an application with no recorded documents yet. */
export function missingDocuments(updated: string): CandidateDocument[] {
  return DOCUMENT_TEMPLATE.map((name) => ({ name, status: 'Missing', updated }))
}

export const DOCUMENTS: Record<string, CandidateDocument[]> = {
  'ap-01': docs(['Verified', 'Verified', 'Verified', 'Verified', 'Verified', 'Verified'], '2026-04-02'),
  'ap-02': docs(['Verified', 'Verified', 'Received', 'Verified', 'Received', 'Verified'], '2026-06-24'),
  'ap-03': docs(['Verified', 'Received', 'Verified', 'Verified', 'Missing', 'Verified'], '2026-06-12'),
  'ap-04': docs(['Received', 'Received', 'Missing', 'Verified', 'Missing', 'Verified'], '2026-05-15'),
  'ap-05': docs(['Verified', 'Verified', 'Verified', 'Verified', 'Verified', 'Verified'], '2026-03-18'),
  'ap-06': docs(['Verified', 'Verified', 'Verified', 'Verified', 'Received', 'Verified'], '2026-06-28'),
  'ap-07': docs(['Received', 'Missing', 'Missing', 'Received', 'Missing', 'Received'], '2026-06-14'),
  'ap-08': docs(['Received', 'Received', 'Missing', 'Verified', 'Missing', 'Verified'], '2026-04-10'),
  'ap-09': docs(['Verified', 'Received', 'Received', 'Verified', 'Missing', 'Verified'], '2026-05-06'),
  'ap-10': docs(['Received', 'Missing', 'Missing', 'Received', 'Received', 'Received'], '2026-05-20'),
  'ap-11': docs(['Received', 'Received', 'Missing', 'Received', 'Missing', 'Received'], '2026-06-27'),
  'ap-12': docs(['Verified', 'Verified', 'Verified', 'Verified', 'Missing', 'Verified'], '2026-06-02'),
}

export const NOTES: Record<string, ReviewNote[]> = {
  'ap-01': [
    { id: 'n-01-1', author: 'Marie Lefèvre', date: '2026-03-28', text: 'Full committee sign-off. Strong multi-site operator, prime Nantes catchment.' },
  ],
  'ap-02': [
    { id: 'n-02-1', author: 'Marie Lefèvre', date: '2026-06-18', text: 'ING bank guarantee letter requested — expected by end of month.' },
    { id: 'n-02-2', author: 'Charlotte B.', date: '2026-06-25', text: 'Franchise agreement redlines returned to legal; targeting July signature.' },
  ],
  'ap-03': [
    { id: 'n-03-1', author: 'Tomás Iglesias', date: '2026-06-10', text: 'P&L projections look conservative; asked for the upside scenario and footfall study.' },
  ],
  'ap-04': [
    { id: 'n-04-1', author: 'Marie Lefèvre', date: '2026-05-12', text: 'Kraków catchment study in progress with the Poland expansion team.' },
  ],
  'ap-05': [
    { id: 'n-05-1', author: 'Charlotte B.', date: '2026-03-15', text: 'Approved — flagship candidate for the Italy corridor, opening target Q4 FY26.' },
  ],
  'ap-06': [
    { id: 'n-06-1', author: 'Charlotte B.', date: '2026-06-20', text: 'Lease negotiation on the Altona site ongoing; landlord pushing on term length.' },
    { id: 'n-06-2', author: 'Marie Lefèvre', date: '2026-06-30', text: 'All financing checks cleared. Strongest file in the German pipeline.' },
  ],
  'ap-07': [
    { id: 'n-07-1', author: 'Tomás Iglesias', date: '2026-06-16', text: 'Intake screening done. Requested financial statements and proof of funds.' },
  ],
  'ap-08': [
    { id: 'n-08-1', author: 'Marie Lefèvre', date: '2026-04-08', text: 'Funding source could not be verified after two follow-ups. Recommending rejection.' },
    { id: 'n-08-2', author: 'Charlotte B.', date: '2026-04-14', text: 'Rejection confirmed and communicated to the candidate.' },
  ],
  'ap-09': [
    { id: 'n-09-1', author: 'Charlotte B.', date: '2026-05-02', text: 'Solid operator but Gothenburg is outside the FY26 expansion corridor — waitlisted for Wave 3.' },
  ],
  'ap-10': [
    { id: 'n-10-1', author: 'Tomás Iglesias', date: '2026-05-22', text: 'Proposed territory overlaps the Milan catchment. Asked candidate to consider Genoa instead.' },
  ],
  'ap-11': [
    { id: 'n-11-1', author: 'Marie Lefèvre', date: '2026-06-28', text: 'Strong first screening. Scheduling the discovery call for early July.' },
  ],
  'ap-12': [
    { id: 'n-12-1', author: 'Tomás Iglesias', date: '2026-05-25', text: 'Litigation with former franchise partner confirmed ongoing — legal reviewing court filings.' },
    { id: 'n-12-2', author: 'Charlotte B.', date: '2026-06-08', text: 'Hold Approve until litigation screening clears; candidate notified of the delay.' },
  ],
}
