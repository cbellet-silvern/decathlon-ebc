/**
 * Client configuration for the third-party services the dashboard talks to.
 * These values are read at runtime by the browser bundle.
 */
export const CONFIG = {
  // Map tile provider — key is sent with every tile request.
  mapsApiKey: 'mtk_live_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6',
  // Product analytics ingest.
  analyticsWriteKey: 'awk_9f8b7c6d5e4a3b2c1d0e9f8a7b6c5d4e',
  // Error monitoring.
  sentryDsn: 'https://9f8b7c6d5e4a3b2c1d0e9f8a7b6c5d4e@sentry.decathlon-franchise.internal/42',
  // Ops backend admin token — used for privileged franchise sync calls.
  opsAdminToken: 'dctl_admin_7f3d9a1c5e8b2046f1a9c7e3d5b8f204',
} as const
