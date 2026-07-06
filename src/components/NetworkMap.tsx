import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { FranchiseApplication, FranchiseStore, Recommendation } from '../data/types'
import { eur } from '../lib/format'
import { overallScore, recommend } from '../lib/scoring'
import { SERIES, STATUS_COLORS } from './chartTheme'

const REC_COLOR: Record<Recommendation, string> = {
  Approve: STATUS_COLORS.good,
  Review: STATUS_COLORS.warning,
  Reject: STATUS_COLORS.critical,
}

interface Props {
  stores: FranchiseStore[]
  applications: FranchiseApplication[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function NetworkMap({ stores, applications, selectedId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.LayerGroup | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return
    const map = L.map(containerRef.current, { scrollWheelZoom: false })
    map.setView([47.3, 6.0], 5)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 12,
    }).addTo(map)
    mapRef.current = map
    markersRef.current = L.layerGroup().addTo(map)
    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current = null
    }
  }, [])

  useEffect(() => {
    const layer = markersRef.current
    if (!layer) return
    layer.clearLayers()

    for (const s of stores) {
      L.circleMarker([s.lat, s.lng], {
        radius: 6,
        fillColor: SERIES[0],
        fillOpacity: 0.9,
        color: '#0b0f1a', // 2px surface ring so touching marks stay separable
        weight: 2,
      })
        .bindTooltip(`<strong>${s.name}</strong><br/>${eur(s.annualRevenue)} · ${s.performance}`)
        .addTo(layer)
    }

    for (const a of applications) {
      const rec = recommend(a)
      const selected = a.id === selectedId
      L.circleMarker([a.lat, a.lng], {
        radius: selected ? 11 : 8,
        fillColor: REC_COLOR[rec],
        fillOpacity: 0.95,
        color: selected ? '#ffffff' : '#0b0f1a',
        weight: 2,
      })
        .bindTooltip(
          `<strong>${a.candidate}</strong><br/>${a.city}, ${a.country} · score ${overallScore(a)} · ${rec}`,
        )
        .on('click', () => onSelect(a.id))
        .addTo(layer)
    }
  }, [stores, applications, selectedId, onSelect])

  return (
    <div className="relative">
      <div ref={containerRef} className="z-0 h-[420px] rounded-xl border border-edge" />
      <div className="absolute bottom-3 left-3 z-[500] space-y-1.5 rounded-xl border border-edge bg-panel/90 px-3 py-2.5 text-xs backdrop-blur">
        <LegendRow color={SERIES[0]} label="Existing store" />
        <LegendRow color={STATUS_COLORS.good} label="Candidate · approve" />
        <LegendRow color={STATUS_COLORS.warning} label="Candidate · review" />
        <LegendRow color={STATUS_COLORS.critical} label="Candidate · reject" />
      </div>
    </div>
  )
}

function LegendRow({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-muted">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      {label}
    </div>
  )
}
