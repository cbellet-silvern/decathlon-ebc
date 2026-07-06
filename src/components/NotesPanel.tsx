import { useState } from 'react'
import type { ReviewNote } from '../data/types'
import { shortDate } from '../lib/format'

interface Props {
  notes: ReviewNote[]
  onAdd: (text: string) => void
}

export function NotesPanel({ notes, onAdd }: Props) {
  const [draft, setDraft] = useState('')

  const submit = () => {
    const text = draft.trim()
    if (!text) return
    onAdd(text)
    setDraft('')
  }

  return (
    <div>
      <ul className="max-h-64 space-y-3 overflow-y-auto pr-1">
        {notes.length === 0 && <li className="text-xs text-muted">No notes yet.</li>}
        {notes.map((n) => (
          <li key={n.id} className="rounded-lg border border-edge bg-panel2/60 px-3 py-2">
            <div className="flex items-baseline justify-between gap-2 text-xs">
              <span className="font-semibold text-ink">{n.author}</span>
              <span className="text-muted">{shortDate(n.date)}</span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-ink">{n.text}</p>
          </li>
        ))}
      </ul>

      <div className="mt-3 border-t border-edge pt-3">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit()
          }}
          rows={2}
          placeholder="Add a note to the file…"
          className="w-full resize-none rounded-lg border border-edge bg-panel px-3 py-2 text-xs text-ink placeholder:text-muted focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
        <button
          onClick={submit}
          disabled={draft.trim().length === 0}
          className="mt-2 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
        >
          Add note
        </button>
      </div>
    </div>
  )
}
