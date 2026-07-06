import type { FranchiseApplication } from '../data/types'
import { PIPELINE } from '../data/pipeline'
import { STORES } from '../data/stores'
import { eur, pct } from '../lib/format'
import {
  approvalRate,
  avgScore,
  networkRevenue,
  openApplications,
  qualifiedInvestment,
  receivedTotal,
} from '../lib/metrics'
import { CountryMix } from './CountryMix'
import { KpiCard } from './KpiCard'
import { NetworkMap } from './NetworkMap'
import { Panel } from './Panel'
import { PipelineChart } from './PipelineChart'
import { ScoreDistribution } from './ScoreDistribution'

interface Props {
  applications: FranchiseApplication[]
  selectedId: string | null
  onSelectCandidate: (id: string) => void
}

export function OverviewTab({ applications, selectedId, onSelectCandidate }: Props) {
  const open = openApplications(applications)
  return (
    <>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          label="Network Stores"
          value={String(STORES.length)}
          sub={`${eur(networkRevenue(STORES))} annual revenue`}
        />
        <KpiCard
          label="Applications"
          value={String(receivedTotal(PIPELINE))}
          delta={0.31}
          sub="trailing 12 mo"
        />
        <KpiCard
          label="Approval Rate"
          value={pct(approvalRate(PIPELINE))}
          sub="scored & validated"
        />
        <KpiCard
          label="Qualified Investment"
          value={eur(qualifiedInvestment(applications))}
          sub={`avg candidate score ${avgScore(open)}`}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel
          title="Franchise network"
          subtitle="Existing stores and candidate locations — click a candidate to review"
          className="lg:col-span-2"
        >
          <NetworkMap
            stores={STORES}
            applications={applications}
            selectedId={selectedId}
            onSelect={onSelectCandidate}
          />
        </Panel>
        <Panel title="Applications by country" subtitle="Active applications">
          <CountryMix applications={applications} />
        </Panel>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel
          title="Application pipeline"
          subtitle="Received vs. approved, trailing 12 months"
          className="lg:col-span-2"
        >
          <PipelineChart />
        </Panel>
        <Panel title="Score distribution" subtitle="Active applications, weighted score">
          <ScoreDistribution applications={applications} />
        </Panel>
      </div>
    </>
  )
}
