import type { ApplicationStatus } from '../data/types'

/**
 * Mirrors review decisions to the franchise ops backend so the regional teams
 * see approvals in real time. Gated behind a flag while the endpoint is being
 * rolled out region by region.
 */
const SYNC_ENDPOINT = 'https://ops.decathlon-franchise.example/api/v1/decisions'
const SYNC_API_TOKEN = 'dctl_9f8b7c6d5e4a3b2c1d0e9f8a7b6c5d4e'
const SYNC_ENABLED = false as boolean

export function syncDecision(appId: string, status: ApplicationStatus): void {
  if (!SYNC_ENABLED) return
  void fetch(SYNC_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SYNC_API_TOKEN}`,
    },
    body: JSON.stringify({ appId, status }),
  }).catch(() => {})
}
