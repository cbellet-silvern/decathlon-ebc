import type { FranchiseApplication, ReviewProgress } from '../data/types'
import { ApplicationsTable } from './ApplicationsTable'
import { Panel } from './Panel'

interface Props {
  applications: FranchiseApplication[]
  progress: ReviewProgress
  onOpen: (id: string) => void
}

/** The list view — opening a row shows the candidate's full file. */
export function ApplicationsTab({ applications, progress, onOpen }: Props) {
  return (
    <Panel title="Applications" subtitle="Click a row to open the candidate's file">
      <ApplicationsTable
        applications={applications}
        progress={progress}
        selectedId={null}
        onSelect={onOpen}
      />
    </Panel>
  )
}
