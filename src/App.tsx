import { useState } from 'react'
import { Header } from './components/Header'
import { KpiCard } from './components/KpiCard'
import { Panel } from './components/Panel'
import { NetworkMap } from './components/NetworkMap'
import { CountryMix } from './components/CountryMix'
import { PipelineChart } from './components/PipelineChart'
import { ScoreDistribution } from './components/ScoreDistribution'
import { ApplicationsTable } from './components/ApplicationsTable'
import { ApplicationDetail } from './components/ApplicationDetail'
import { APPLICATIONS } from './data/applications'
import { STORES } from './data/stores'
import { PIPELINE } from './data/pipeline'
import {
  approvalRate,
  avgScore,
  networkRevenue,
  openApplications,
  qualifiedInvestment,
  receivedTotal,
} from './lib/metrics'
import { eur, pct } from './lib/format'

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(APPLICATIONS[0]?.id ?? null)
  const selected = APPLICATIONS.find((a) => a.id === selectedId) ?? APPLICATIONS[0]
  const open = openApplications(APPLICATIONS)

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-6">
      <Header />

      {/* KPI row */}
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
          value={eur(qualifiedInvestment(APPLICATIONS))}
          sub={`avg candidate score ${avgScore(open)}`}
        />
      </div>

      {/* Map row */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel
          title="Franchise network"
          subtitle="Existing stores and candidate locations — click a candidate to inspect"
          className="lg:col-span-2"
        >
          <NetworkMap
            stores={STORES}
            applications={APPLICATIONS}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </Panel>
        <Panel title="Applications by country" subtitle="Active applications">
          <CountryMix applications={APPLICATIONS} />
        </Panel>
      </div>

      {/* Pipeline row */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel
          title="Application pipeline"
          subtitle="Received vs. approved, trailing 12 months"
          className="lg:col-span-2"
        >
          <PipelineChart />
        </Panel>
        <Panel title="Score distribution" subtitle="Active applications, weighted score">
          <ScoreDistribution applications={APPLICATIONS} />
        </Panel>
      </div>

      {/* Applications row */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel
          title="Applications"
          subtitle="Click a row to inspect the scoring"
          className="lg:col-span-2"
        >
          <ApplicationsTable
            applications={APPLICATIONS}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </Panel>
        <Panel title="Candidate assessment" subtitle="Criteria validation & weighted scoring">
          <ApplicationDetail application={selected} />
        </Panel>
      </div>

      <footer className="mt-8 pb-4 text-center text-xs text-muted">
        Demo data · Decathlon Franchise Intelligence · built with Claude Code
      </footer>
    </div>
  )
}
