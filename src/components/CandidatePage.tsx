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
          <h2 className="text-xl font-black italic tracking-tight text-ink">
            {application.candidate}
          </h2>
          <p className="mt-0.5 text-xs text-muted">
            {application.company} · {application.city}, {application.country} ·{' '}
            {application.format} · {eur(application.investment)} committed ·{' '}
            {application.retailYears} yrs retail · submitted {shortDate(application.submitted)}
          </p>
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
