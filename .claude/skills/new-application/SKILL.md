---
name: new-application
description: >
  Add a new franchise application to the dashboard's seed data correctly and
  consistently. Use when the user says "add an application", "we received an
  application from <candidate>", or wants a new candidate to appear in the table,
  map, KPIs, and score distribution. Handles the data edit, keeps the scoring
  consistent, and verifies the build.
---

# Add a new franchise application

## Gather (ask only for what's missing)

1. Candidate name, company, city + country (must be one of the `Country` union
   values in `src/data/types.ts` — extend the union first if it's a new market).
2. Store format, committed investment (EUR), years of retail experience.
3. Any known risk flags (funding, litigation, territory overlap…).

## Apply

1. Look up the **real city centroid** for `lat`/`lng` — the map renders honestly.
2. Append the entry to `src/data/applications.ts` with a new sequential `ap-NN` id
   and `submitted` set to today. Status starts at `New`.
3. Set the five criteria scores (0–100) so they support the story the user wants:
   the overall score is the weighted sum in `src/lib/scoring.ts` (financial 30%,
   location 25%, experience 20%, brand fit 15%, compliance 10%). Remember the hard
   gates: investment < €800K or < 3 yrs experience ⇒ `Reject` regardless of score.
   Never store a score or recommendation — both are derived.
4. If the user gave risk flags, add them verbatim to `riskFlags` (flags block an
   `Approve` recommendation).
5. Seed the candidate's file in `src/data/artifacts.ts`: a `DOCUMENTS` entry (use
   the `docs(...)` helper — a New application typically has a couple of documents
   `Received` and the rest `Missing`) and an intake note in `NOTES` (author, date =
   today). Without a `DOCUMENTS` entry the candidate page falls back to an
   all-Missing file, which is acceptable but tells no story.

## Verify

1. `npm run build` must pass.
2. State the derived overall score and recommendation back to the user so they can
   confirm it matches the intent (e.g. "scores 78 → Review because of the open
   risk flag").
