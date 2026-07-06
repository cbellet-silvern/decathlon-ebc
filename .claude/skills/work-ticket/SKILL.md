---
name: work-ticket
description: >
  Work a Jira ticket from the DFN board end-to-end through the team's mandatory
  process: read the To Do ticket, post a remediation plan and move it to In Progress,
  wait for the user to validate the plan, develop on a dedicated branch, open a PR and
  move the ticket to In Review, and mark it Done only once the PR is merged. Use
  whenever the user asks to work on / pick up / fix a DFN ticket (e.g. "work on
  DFN-9", "pick up the next ticket", "fix the XSS ticket"), or reports that a plan is
  approved or a ticket's PR is merged.
---

# Work a DFN Jira ticket

Drive one ticket from **To Do → In Progress → In Review → Done**, in that order, with
a user checkpoint between planning and coding. Never skip a step, never jump a status
forward, and never batch several tickets through one branch/PR unless the user
explicitly asks for it.

## Constants

- **Jira cloudId:** `silvern-team-xkhpj9tj.atlassian.net`
- **Project:** `DFN` — board: https://silvern-team-xkhpj9tj.atlassian.net/jira/software/projects/DFN/boards/35
- **Transitions** (global, any→any): To Do = `11`, In Progress = `21`, In Review = `31`, Done = `41`.
  If a transition call fails, re-fetch with `getTransitionsForJiraIssue` and match by
  target status name instead of assuming these IDs.
- **GitHub repo:** `cbellet-silvern/decathlon-ebc`, PRs target `main`.
- Jira tools are the `mcp__claude_ai_Atlassian__*` MCP tools; GitHub via `gh` CLI or
  the GitHub MCP tools.

## Resuming mid-flight

The ticket's **current status tells you which step you're on** — always fetch the
ticket first (`getJiraIssue`) and resume from there:

| Ticket status | Your next action |
| --- | --- |
| To Do | Step 1–2: read, plan, post plan, move to In Progress |
| In Progress, plan not yet validated | Wait for user validation (step 3 gate) |
| In Progress, user validated plan | Step 3: branch + develop |
| In Review | Step 4 done — check PR state; if merged, step 5 |
| Done | Nothing to do; tell the user |

## Step 1 — Read the ticket (To Do)

- If the user named a ticket, fetch it with `getJiraIssue`. If they said "pick up the
  next ticket", list To Do tickets with `searchJiraIssuesUsingJql`
  (`project = DFN AND status = "To Do" ORDER BY priority DESC, key ASC`), pick the
  top-priority one, and say which you picked.
- Confirm the status is **To Do**. If it isn't, follow the resume table above instead
  of restarting the flow.
- Read the description fully (file:line references, failure scenario, suggested fix)
  and open the referenced files in the repo to verify the issue still exists as
  described. If the code has drifted from the ticket, note that in the plan.

## Step 2 — Plan and move to In Progress

- Write a short **remediation plan**: root cause, files to change, the intended fix,
  how you'll verify it (`npm run build` at minimum, plus exercising the affected
  flow), and anything out of scope.
- Post the plan as a comment on the ticket (`addCommentToJiraIssue`,
  `contentFormat: markdown`), prefixed with `**Remediation plan**`.
- Transition the ticket to **In Progress** (`transitionJiraIssue`, transition `21`).
- Show the same plan to the user in the conversation and **stop — do not write any
  code yet.**

## Step 3 — Gate: user validates the plan, then develop

- **Hard gate:** only proceed when the user explicitly approves the plan in the
  conversation ("go ahead", "plan validated", edits accepted, …). If they request
  changes, revise the plan, post the updated plan as a new Jira comment, and wait
  again.
- Once validated:
  - Create a branch off `main`: `git fetch origin && git checkout -b dfn-<n>-<slug> origin/main`
    (slug = 2–4 kebab-case words from the summary, e.g. `dfn-9-utc-date-formatting`).
  - Implement the fix following the plan and CLAUDE.md conventions.
  - Verify: `npm run build` must pass; exercise the affected behavior when feasible.
  - Commit with the ticket key in the message: `DFN-<n>: <what changed>`.

## Step 4 — PR and move to In Review

- Push the branch and open a PR against `main`:
  - Title: `DFN-<n>: <ticket summary>`
  - Body: what/why, how it was verified, and a link to the Jira ticket
    (`https://silvern-team-xkhpj9tj.atlassian.net/browse/DFN-<n>`).
- Comment the PR URL on the ticket (`addCommentToJiraIssue`).
- Transition the ticket to **In Review** (transition `31`).
- Tell the user the PR is ready and **stop — do not merge the PR yourself.**

## Step 5 — Merge confirmed → Done

- Trigger: the user says the PR is merged, or asks you to check. Verify with
  `gh pr view <url> --json state,mergedAt` — proceed only if actually merged; if the
  PR was closed without merging, tell the user and leave the ticket In Review.
- Transition the ticket to **Done** (transition `41`) and add a closing comment
  linking the merged PR.
- Confirm to the user, and offer the next To Do ticket.

## Guardrails

- One ticket = one branch = one PR.
- Never transition a ticket to a status ahead of the real state of the work, and
  never mark Done on an unmerged PR.
- If anything fails mid-step (build failure, push rejected, transition error), fix or
  report it — do not advance the ticket status past the failure.
