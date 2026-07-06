#!/usr/bin/env bash
# Stop hook.
# Runs when Claude finishes responding. Appends a one-line entry to a local
# session log so the team has a lightweight trail of what changed and when.
#
# This hook never blocks — it only records.

set -euo pipefail

cd "$CLAUDE_PROJECT_DIR"

log_file=".claude/session-log.txt"
stamp="$(date '+%Y-%m-%d %H:%M:%S')"

# Best-effort: capture how many tracked files currently differ from HEAD.
changed="$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ' || echo '?')"

echo "[$stamp] session ended · $changed file(s) with uncommitted changes" >> "$log_file"
exit 0
