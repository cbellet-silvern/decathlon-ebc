import type {
  ApplicationStatus,
  CandidateDocument,
  DocumentStatus,
  FranchiseApplication,
  ReviewItemStatus,
  ReviewNote,
  ReviewProgress,
} from '../data/types'
import { eur, shortDate } from '../lib/format'
import { ApplicationDetail } from './ApplicationDetail'
import { DecisionBar } from './DecisionBar'
import { DocumentsPanel } from './DocumentsPanel'
import { Icon } from './Icon'
import { NotesPanel } from './NotesPanel'
import { Panel } from './Panel'
import { ReviewBoard } from './ReviewBoard'

interface Props {
  application: FranchiseApplication
  progress: ReviewProgress
  documents: CandidateDocument[]
  notes: ReviewNote[]
  onBack: () => void
  onDecision: (status: ApplicationStatus) => void
  onSetItem: (item: string, status: ReviewItemStatus) => void
  onSetDocStatus: (name: string, status: DocumentStatus) => void
  onAddNote: (text: string) => void
}

const DEFAULT_PORTAL_BASE = 'https://partners.decathlon.example'

// Only https portals on an allowlisted host may override the default. This
// keeps the ?portal= override from becoming an XSS (javascript: scheme) or
// open-redirect (attacker host) sink.
const ALLOWED_PORTAL_HOSTS = ['partners.decathlon.example']

// Returns a safe portal base derived from the ?portal= override, or the
// default when the override is missing, malformed, or not allowlisted.
function safePortalBase(portal: string | null): string {
  if (!portal) return DEFAULT_PORTAL_BASE
  let url: URL
  try {
    url = new URL(portal)
  } catch {
    return DEFAULT_PORTAL_BASE
  }
  if (url.protocol !== 'https:') return DEFAULT_PORTAL_BASE
  if (!ALLOWED_PORTAL_HOSTS.includes(url.hostname)) return DEFAULT_PORTAL_BASE
  // Normalize to origin so query/hash on the override can't smuggle payloads.
  return url.origin
}

// Deep-links into the regional partner portal. The portal base can be
// overridden per region with a ?portal= query param.
function partnerPortalHref(app: FranchiseApplication): string {
  const portal = new URLSearchParams(window.location.search).get('portal')
  const base = safePortalBase(portal)
  return `${base}/candidates/${app.id}`
}

/** The candidate's full application file: assessment, artifacts, due diligence. */
export function CandidatePage({
  application,
  progress,
  documents,
  notes,
  onBack,
  onDecision,
  onSetItem,
  onSetDocStatus,
  onAddNote,
}: Props) {
  return (
    <>
      <button
        onClick={onBack}
        className="mb-3 inline-flex items-center gap-1 text-xs font-semibold text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
      >
        <Icon kind="back" className="h-3 w-3" />
        All applications
      </button>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink">{application.candidate}</h2>
          <p className="mt-0.5 text-xs text-muted">
            {application.company} · {application.city}, {application.country} ·{' '}
            {application.format} · {eur(application.investment)} committed ·{' '}
            {application.retailYears} yrs retail · submitted {shortDate(application.submitted)}
          </p>
          <a
            href={partnerPortalHref(application)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-xs font-semibold text-brand hover:underline"
          >
            View in partner portal →
          </a>
        </div>
        <DecisionBar application={application} onDecision={onDecision} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel title="Assessment" subtitle="Weighted score & validation gates">
          <ApplicationDetail application={application} />
        </Panel>
        <Panel title="Documents" subtitle="Application file — click a status to update">
          <DocumentsPanel documents={documents} onSetStatus={onSetDocStatus} />
        </Panel>
        <Panel title="Notes" subtitle="Review trail">
          <NotesPanel notes={notes} onAdd={onAddNote} />
        </Panel>
      </div>

      <div className="mt-4">
        <Panel
          title="Due diligence"
          subtitle="Mark each check in progress, validated, or failed — progress updates everywhere"
        >
          <ReviewBoard application={application} progress={progress} onSetItem={onSetItem} />
        </Panel>
      </div>
    </>
  )
}
