import { useState } from 'react'
import { Header } from './components/Header'
import { Tabs, type TabId } from './components/Tabs'
import { KpiCard } from './components/KpiCard'
import { Panel } from './components/Panel'
import { NetworkMap } from './components/NetworkMap'
import { CountryMix } from './components/CountryMix'
import { PipelineChart } from './components/PipelineChart'
import { ScoreDistribution } from './components/ScoreDistribution'
import { ApplicationsTable } from './components/ApplicationsTable'
import { ApplicationDetail } from './components/ApplicationDetail'
import { ReviewBoard } from './components/ReviewBoard'
import { StoreTable } from './components/StoreTable'
import { RevenueByCountry } from './components/RevenueByCountry'
import { APPLICATIONS } from './data/applications'
import { REVIEW_PROGRESS } from './data/reviews'
import { STORES } from './data/stores'
import { PIPELINE } from './data/pipeline'
import type { ApplicationStatus, ReviewItemStatus } from './data/types'
import type { ReviewProgress } from './lib/review'
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
  const [tab, setTab] = useState<TabId>('overview')
  const [applications, setApplications] = useState(APPLICATIONS)
  const [progress, setProgress] = useState<ReviewProgress>(REVIEW_PROGRESS)
  const [selectedId, setSelectedId] = useState<string | null>(APPLICATIONS[0]?.id ?? null)

  const selected = applications.find((a) => a.id === selectedId) ?? applications[0]
  const open = openApplications(applications)

  const setItemStatus = (item: string, status: ReviewItemStatus) => {
    if (!selected) return
    setProgress((p) => ({ ...p, [selected.id]: { ...p[selected.id], [item]: status } }))
  }
  const setAppStatus = (status: ApplicationStatus) => {
    if (!selected) return
    setApplications((apps) => apps.map((a) => (a.id === selected.id ? { ...a, status } : a)))
  }
  const selectAndShowReview = (id: string) => {
    setSelectedId(id)
    if (tab === 'overview') setTab('applications')
  }

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-6">
      <Header />
      <Tabs active={tab} onChange={setTab} />

      {tab === 'overview' && (
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
                onSelect={selectAndShowReview}
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
      )}

      {tab === 'applications' && selected && (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Panel
              title="Applications"
              subtitle="Click a row to review the candidate"
              className="lg:col-span-2"
            >
              <ApplicationsTable
                applications={applications}
                progress={progress}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </Panel>
            <Panel title="Candidate assessment" subtitle="Criteria validation & decision">
              <ApplicationDetail application={selected} onDecision={setAppStatus} />
            </Panel>
          </div>

          <div className="mt-4">
            <Panel
              title={`Due diligence — ${selected.candidate}`}
              subtitle="Record checks with ✓ / ✕ — progress updates everywhere"
            >
              <ReviewBoard application={selected} progress={progress} onSetItem={setItemStatus} />
            </Panel>
          </div>
        </>
      )}

      {tab === 'network' && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Panel
            title="Store network"
            subtitle={`${STORES.length} stores · ${eur(networkRevenue(STORES))} annual revenue`}
            className="lg:col-span-2"
          >
            <StoreTable stores={STORES} />
          </Panel>
          <Panel title="Revenue by country" subtitle="Existing network, annual">
            <RevenueByCountry stores={STORES} />
          </Panel>
        </div>
      )}

      <footer className="mt-8 pb-4 text-center text-xs text-muted">
        Demo data · Decathlon Franchise Intelligence · built with Claude Code
      </footer>
    </div>
  )
}
