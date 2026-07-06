import { useState } from 'react'
import { Header } from './components/Header'
import { Tabs, type TabId } from './components/Tabs'
import { OverviewTab } from './components/OverviewTab'
import { ApplicationsTab } from './components/ApplicationsTab'
import { CandidatePage } from './components/CandidatePage'
import { NetworkTab } from './components/NetworkTab'
import { APPLICATIONS } from './data/applications'
import { DOCUMENTS, NOTES, missingDocuments } from './data/artifacts'
import { REVIEW_PROGRESS } from './data/reviews'
import type {
  ApplicationStatus,
  CandidateDocument,
  DocumentStatus,
  ReviewItemStatus,
  ReviewNote,
  ReviewProgress,
} from './data/types'

export default function App() {
  const [tab, setTab] = useState<TabId>('overview')
  const [view, setView] = useState<'list' | 'candidate'>('list')
  const [applications, setApplications] = useState(APPLICATIONS)
  const [progress, setProgress] = useState<ReviewProgress>(REVIEW_PROGRESS)
  const [documents, setDocuments] = useState<Record<string, CandidateDocument[]>>(DOCUMENTS)
  const [notes, setNotes] = useState<Record<string, ReviewNote[]>>(NOTES)
  const [selectedId, setSelectedId] = useState<string | null>(APPLICATIONS[0]?.id ?? null)

  const selected = applications.find((a) => a.id === selectedId) ?? applications[0]

  const openCandidate = (id: string) => {
    setSelectedId(id)
    setView('candidate')
    setTab('applications')
  }
  const setItemStatus = (item: string, status: ReviewItemStatus) => {
    if (!selected) return
    setProgress((p) => ({ ...p, [selected.id]: { ...p[selected.id], [item]: status } }))
  }
  const setAppStatus = (status: ApplicationStatus) => {
    if (!selected) return
    setApplications((apps) => apps.map((a) => (a.id === selected.id ? { ...a, status } : a)))
  }
  const setDocStatus = (name: string, status: DocumentStatus) => {
    if (!selected) return
    setDocuments((d) => ({
      ...d,
      [selected.id]: (d[selected.id] ?? missingDocuments(selected.submitted)).map((doc) =>
        doc.name === name ? { ...doc, status, updated: new Date().toISOString() } : doc,
      ),
    }))
  }
  const addNote = (text: string) => {
    if (!selected) return
    const note: ReviewNote = {
      id: crypto.randomUUID(),
      author: 'Charlotte B.',
      date: new Date().toISOString(),
      text,
    }
    setNotes((n) => ({ ...n, [selected.id]: [...(n[selected.id] ?? []), note] }))
  }

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-6">
      <Header />
      <Tabs
        active={tab}
        onChange={(t) => {
          setTab(t)
          if (t === 'applications') setView('list') // tab always lands on the list
        }}
      />

      {tab === 'overview' && (
        <OverviewTab
          applications={applications}
          selectedId={selectedId}
          onSelectCandidate={openCandidate}
        />
      )}

      {tab === 'applications' &&
        (view === 'candidate' && selected ? (
          <CandidatePage
            application={selected}
            progress={progress}
            documents={documents[selected.id] ?? missingDocuments(selected.submitted)}
            notes={notes[selected.id] ?? []}
            onBack={() => setView('list')}
            onDecision={setAppStatus}
            onSetItem={setItemStatus}
            onSetDocStatus={setDocStatus}
            onAddNote={addNote}
          />
        ) : (
          <ApplicationsTab applications={applications} progress={progress} onOpen={openCandidate} />
        ))}

      {tab === 'network' && <NetworkTab />}

      <footer className="mt-8 pb-4 text-center text-xs text-muted">
        Demo data · Decathlon Franchise Intelligence · built with Claude Code
      </footer>
    </div>
  )
}
