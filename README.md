# Decathlon — Franchise Network Intelligence

A demo dashboard for Decathlon's **franchise expansion**: it scores franchise
applications against validation criteria, tracks the intake pipeline, and maps the store
network with candidate locations — built to showcase how
[Claude Code](https://claude.com/claude-code) works on a real project: project memory
(`CLAUDE.md`), **skills**, **hooks**, and **MCP** integrations (GitHub + Asana).

![stack](https://img.shields.io/badge/Vite-React%2018-3643ba) ![ts](https://img.shields.io/badge/TypeScript-strict-22c48b)

## The app

A tabbed React app on the Decathlon graphic charter (light theme, Decathlon Blue):

- **Overview** — KPI cards, the interactive network map (existing stores + candidate
  locations, colored by recommendation), pipeline trend, and score distribution
- **Application Review** — the working surface: sortable applications table with live
  review progress, a candidate assessment panel (criteria radar, validation gates,
  risk flags) with **Approve / Waitlist / Reject** decisions, and a due-diligence
  board where reviewers record ● / ✓ / ✕ checks across business plan, legal,
  financing, site & operations, and compliance
- **Store Network** — the store estate with revenue and performance, plus revenue by
  country

Review actions mutate live React state seeded from `src/data/` — approve a candidate
and every badge, KPI, and progress bar updates.

All figures are illustrative seed data in `src/data/`; the scoring model lives in
`src/lib/scoring.ts` and every rollup is recomputed via selectors in
`src/lib/metrics.ts` — nothing is hand-tallied.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## How the Claude Code pieces fit together

This repo is itself the demo. Each capability maps to a file you can open and show:

| Capability | Where | What it does |
| ---------- | ----- | ------------ |
| **CLAUDE.md** | `CLAUDE.md` | Project memory: stack, architecture, conventions, domain glossary — loaded into every session automatically. |
| **Skills** | `.claude/skills/*/SKILL.md` | Repeatable workflows: `new-application` adds a candidate to the seed data consistently and verifies the build. |
| **Hooks** | `.claude/hooks/*.sh` | `typecheck.sh` runs `tsc` after every edit; `format-guard.sh` enforces the "money goes through `format.ts`" house rule; `guard-data.sh` blocks destructive shell commands. |
| **MCP** | `.mcp.json` | GitHub (issues/PRs on `cbellet-silvern/decathlon-ebc`) and Asana (turn flagged applications into tracked tasks). |
| **Security** | `/security-review` | Claude reviews the branch for security issues before it ships. |

## Scoring model

| Criterion | Weight |
| --------- | ------ |
| Financial capacity | 30% |
| Location potential | 25% |
| Retail experience | 20% |
| Brand fit | 15% |
| Compliance & risk | 10% |

Hard gates: **€800K minimum investment** and **3 years retail experience** — failing
either rejects regardless of score. Score ≥ 75 with all gates passed and no open risk
flags ⇒ **Approve**; ≥ 55 ⇒ **Review**; otherwise **Reject**.
