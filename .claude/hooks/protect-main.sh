#!/usr/bin/env bash
# PreToolUse hook (Bash).
# Enforces the team's remediation process: changes reach `main` only through a
# PR from a dedicated branch (see .claude/skills/work-ticket). It blocks the two
# back-door shortcuts that skip review — committing while checked out on `main`,
# and pushing directly to the `main` ref — so a PR is always in the loop.
#
# Contract: receives the tool event as JSON on stdin. Exit 2 + stderr => the
# message is returned to Claude so it can correct course in the same turn.

set -euo pipefail

input="$(cat)"

command="$(printf '%s' "$input" | python3 -c \
  "import sys, json; print(json.load(sys.stdin).get('tool_input', {}).get('command', ''))" \
  2>/dev/null || true)"

# PROTECT_MAIN_TEST_BRANCH overrides the detected branch — used only by the
# hook's own tests; unset in normal operation.
branch="${PROTECT_MAIN_TEST_BRANCH:-$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '')}"

# 1) Block committing while on the mainline branch.
if printf '%s' "$command" | grep -Eq '(^|[;&|[:space:]])git[[:space:]]+commit([[:space:]]|$)'; then
  if [ "$branch" = "main" ] || [ "$branch" = "master" ]; then
    echo "🛑 protect-main: direct commits to '$branch' are blocked." >&2
    echo "Remediation goes through the ticket flow: branch off main as dfn-<n>-<slug>," >&2
    echo "commit there, and open a PR to main (see .claude/skills/work-ticket)." >&2
    exit 2
  fi
fi

# 2) Block pushing directly to the main ref (e.g. 'git push origin main' or '…:main').
if printf '%s' "$command" | grep -Eq '(^|[;&|[:space:]])git[[:space:]]+push([[:space:]]|$)'; then
  if printf '%s' "$command" | grep -Eq '(:main([[:space:]]|$)|[[:space:]]main([[:space:]]|$))'; then
    echo "🛑 protect-main: pushing directly to 'main' is blocked — open a PR and merge it instead." >&2
    echo "Fix branches (dfn-<n>-<slug>) push to their own ref, then reach main via a merged PR." >&2
    exit 2
  fi
fi

exit 0
