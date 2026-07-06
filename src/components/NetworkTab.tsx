import { STORES } from '../data/stores'
import { eur } from '../lib/format'
import { networkRevenue } from '../lib/metrics'
import { Panel } from './Panel'
import { RevenueByCountry } from './RevenueByCountry'
import { StoreTable } from './StoreTable'

export function NetworkTab() {
  return (
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
  )
}
