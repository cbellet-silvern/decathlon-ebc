import type { CandidateDocument, DocumentStatus } from '../data/types'
import { fullDate } from '../lib/format'
import { Icon, type IconKind } from './Icon'

const STATUS_STYLE: Record<DocumentStatus, { kind: IconKind; className: string }> = {
  Verified: { kind: 'check', className: 'text-ok border-ok/30 bg-ok/10 hover:bg-ok/20' },
  Received: { kind: 'dot', className: 'text-brand border-brand/30 bg-brand/10 hover:bg-brand/20' },
  Missing: { kind: 'cross', className: 'text-danger border-danger/30 bg-danger/10 hover:bg-danger/20' },
}

/** Clicking a status advances it: Missing → Received → Verified → Missing. */
const NEXT: Record<DocumentStatus, DocumentStatus> = {
  Missing: 'Received',
  Received: 'Verified',
  Verified: 'Missing',
}

interface Props {
  documents: CandidateDocument[]
  onSetStatus: (name: string, status: DocumentStatus) => void
}

export function DocumentsPanel({ documents, onSetStatus }: Props) {
  if (documents.length === 0) {
    return <p className="text-xs text-muted">No document file yet.</p>
  }
  return (
    <ul className="space-y-2">
      {documents.map((doc) => {
        const s = STATUS_STYLE[doc.status]
        return (
          <li key={doc.name} className="flex items-center justify-between gap-3 text-sm">
            <div className="min-w-0">
              <div className="truncate text-ink">{doc.name}</div>
              <div className="text-xs text-muted">updated {fullDate(doc.updated)}</div>
            </div>
            <button
              onClick={() => onSetStatus(doc.name, NEXT[doc.status])}
              aria-label={`${doc.name}: ${doc.status} — mark as ${NEXT[doc.status]}`}
              title={`Mark as ${NEXT[doc.status]}`}
              className={`pill shrink-0 border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 ${s.className}`}
            >
              <Icon kind={s.kind} className="h-2.5 w-2.5" />
              {doc.status}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
