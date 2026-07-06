/**
 * Client configuration for the third-party services the dashboard talks to.
 * These values are read at runtime by the browser bundle.
 *
 * SECURITY: everything in this object is shipped verbatim in the public JS
 * bundle and is readable by any visitor. Only put values here that are safe to
 * expose to unauthenticated clients (e.g. a domain-restricted map tile key).
 * Privileged credentials — backend admin/ops tokens, analytics write keys,
 * Sentry DSNs, database/SMTP secrets — must NEVER live in client code; they
 * belong on the server and are supplied to the browser only via
 * narrowly-scoped, server-mediated calls.
 */
export const CONFIG = {
  // Map tile provider — key is sent with every tile request, so it is public
  // by design and must be a domain-restricted, read-only tile key.
  mapsApiKey: 'mtk_live_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6',
} as const
