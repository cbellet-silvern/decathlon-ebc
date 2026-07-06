# Decathlon — Franchise Network Intelligence

Internal dashboard for Decathlon's franchise expansion: it **scores franchise
applications** against validation criteria, tracks the **application pipeline**, and maps
the **store network with candidate locations**. This file is Claude Code's project
memory — it's loaded into context automatically at the start of every session. Keep it
accurate and concise.

## What this app is

A tabbed React app for the franchise development team — **Overview** (KPIs, map,
pipeline), **Application Review** (a clean applications table; opening a row shows the
**candidate page**: assessment with score/radar/gates, the document file, reviewer
notes, Approve/Waitlist/Reject decisions, and the interactive due-diligence board),
and **Store Network** (store table, revenue by country).

All data is **mock/seed data** today (`src/data/`); review actions mutate React state
seeded from it. There is no backend yet — the GitHub and Asana MCP integrations are the
live, external surfaces (see below).

## Tech stack

- **Vite + React 18 + TypeScript** (strict mode)
- **Tailwind CSS** — light theme on the Decathlon graphic charter (Decathlon Blue
  `#3643ba`), tokens in `tailwind.config.js`
- **Recharts** for charts, **Leaflet** (plain, no react-leaflet) for the network map
- No state library. `App.tsx` owns the live state (active tab, applications, review
  progress, selection) and passes it down; components stay presentational.

## Commands

| Task            | Command         |
| --------------- | --------------- |
| Dev server      | `npm run dev`   |
| Production build| `npm run build` |
| Type-check only | `npm run lint`  |

Always run `npm run build` before committing — it runs `tsc -b` and will fail on type
errors. Strict TS is on, including `noUnusedLocals`/`noUnusedParameters`.

## Architecture & conventions

```
src/
  data/         # types + seed data — the single source of truth for the demo
  lib/          # pure functions: scoring model, metrics (selectors), formatting
  components/   # presentational React components (one component per file)
  App.tsx       # layout & composition only — no business logic here
```

- **The scoring model lives in `src/lib/scoring.ts`** — criteria weights, hard gates
  (minimum investment, minimum retail experience), `overallScore`, `validateApplication`,
  and `recommend`. The recommendation is always **derived, never stored** in seed data.
- **Rollups live in `src/lib/metrics.ts`**, not in components. New KPI? Add a selector
  first.
- **Money is always formatted through `src/lib/format.ts`** (`eur`, `eurFull`, `pct`).
  Never hand-format currency in a component. Amounts are EUR.
- **Types live in `src/data/types.ts`** and are imported with `import type`.
- **Chart colors come from `SERIES`/`STATUS_COLORS` in `src/components/chartTheme.tsx`**
  — a palette validated for CVD safety and contrast on the white panel surface (light
  theme). Assign series slots in order; status colors are reserved for state and always
  ship with a glyph or label; text wears the darker text-grade theme tokens (`ok`,
  `warn`, `danger`), never mark colors. No raw hex in JSX except inside chart/map
  components, which need literal colors for Recharts/Leaflet/SVG fills.
- Chart styling is centralized in `chartTheme.tsx` — reuse `axisStyle`, `gridStyle`, and
  `<ChartTooltip>` so every chart stays visually consistent.

## Domain glossary

- **Application** — a candidate franchise request; has criteria scores, a workflow
  status, and optional risk flags. See `FranchiseApplication` in `src/data/types.ts`.
- **Criteria** — financial capacity (30%), location potential (25%), retail experience
  (20%), brand fit (15%), compliance & risk (10%). Each scored 0–100.
- **Hard gates** — minimum €800K investment and 3 years retail experience; failing one
  rejects regardless of score.
- **Recommendation** — `Approve` (score ≥ 75, all gates, no risk flags) / `Review`
  (score ≥ 55) / `Reject`. Derived by `recommend()` — distinct from workflow **status**.
- **Store formats** — Full Store, City Store, Outlet.
- **Pipeline** — monthly application intake volume (`src/data/pipeline.ts`); the
  applications table holds the currently active subset.
- **Artifacts** — each candidate's file: required documents (fixed
  `DOCUMENT_TEMPLATE`, per-app statuses Missing/Received/Verified) and reviewer notes,
  seeded in `src/data/artifacts.ts` and owned as live App state (documents cycle on
  click; notes are appendable).
- **Due diligence** — the review checklist (business plan, legal, financing, site &
  operations, compliance) in `src/data/reviews.ts`. The template is fixed; per-app
  progress overlays it, and `src/lib/review.ts` assembles the effective checklist from
  a `ReviewProgress` value (live App state, seeded from `REVIEW_PROGRESS`). Untracked
  items are always Pending — status never fabricates checks; approved seeds carry
  explicit fully-validated records. Review progress is process tracking — independent
  of the scoring recommendation. Decisions (Approve/Waitlist/Reject) set workflow
  **status**, toggle back to In Review, and never rewrite recorded checks; the
  recommendation stays derived.

## Working agreements for Claude

- This is a **customer-facing demo**. Favor clarity and visual polish over cleverness.
- When adding data, keep it internally consistent: criteria scores should support the
  intended recommendation, and map coordinates must be real city centroids.
- Prefer small, composable components. If a component exceeds ~120 lines, split it.
- Don't introduce new dependencies without a clear reason — the demo should stay lean.

## External integrations (MCP)

This repo is configured for two MCP servers (see `.mcp.json`):

- **GitHub** — issues, PRs, and code review (repo: `cbellet-silvern/decathlon-ebc`).
- **Asana** — project management. Use it to turn flagged applications and expansion
  actions into tracked tasks.
