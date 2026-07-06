#!/usr/bin/env bash
# PreToolUse hook (Bash).
# A lightweight safety net for a customer-facing demo: block obviously
# destructive shell commands before they run.
#
# Contract: receives the tool event as JSON on stdin. Exit 2 => the command is
# blocked and the stderr message is returned to Claude.

set -euo pipefail

input="$(cat)"

command="$(printf '%s' "$input" | python3 -c \
  "import sys, json; print(json.load(sys.stdin).get('tool_input', {}).get('command', ''))" \
  2>/dev/null || true)"

# Patterns we never want to run unattended during a demo.
blocked=(
  'rm -rf /'
  'rm -rf ~'
  'rm -rf \*'
  'git push --force'
  'git push -f'
  'git reset --hard'
  ':(){:|:&};:'
)

for pattern in "${blocked[@]}"; do
  if [[ "$command" == *"$pattern"* ]]; then
    echo "🛑 Blocked by guard-data hook: command matches \"$pattern\"." >&2
    echo "If this is intentional, run it manually outside Claude Code." >&2
    exit 2
  fi
done

exit 0
