#!/usr/bin/env bash
# PostToolUse hook (Edit|Write|MultiEdit).
# Enforces a CLAUDE.md house rule: money is ALWAYS formatted through
# src/lib/format.ts (usd / usdFull / pct) and never hand-formatted inside a
# component. When Claude hand-rolls a currency string in a component, this hook
# blocks and points it at the helpers, so the convention is enforced automatically
# instead of being caught (or missed) in review.
#
# Contract: receives the tool event as JSON on stdin. Exit 2 + stderr => the
# message is returned to Claude so it can fix the problem in the same turn.

set -euo pipefail

input="$(cat)"

# Extract the edited file path from the hook payload.
file_path="$(printf '%s' "$input" | python3 -c \
  "import sys, json; print(json.load(sys.stdin).get('tool_input', {}).get('file_path', ''))" \
  2>/dev/null || true)"

# Only guard React components — lib/, data/, and charts format their own way.
case "$file_path" in
  */src/components/*.tsx) ;;
  *) exit 0 ;;
esac

[ -f "$file_path" ] || exit 0

# Hand-rolled currency we don't allow in a component:
#   `€${expr}`  — template-literal euro interpolation
#   "€" + / '€' + — string concatenation onto a euro sign
#   (legacy $ variants kept so old habits are caught too)
pattern='€\$?\{|["'\'']€["'\''][[:space:]]*\+|\$\$\{|["'\'']\$["'\''][[:space:]]*\+'

if hits="$(grep -nE "$pattern" "$file_path")"; then
  echo "🛑 house-style: hand-formatted currency in $(basename "$file_path"):" >&2
  printf '%s\n' "$hits" | sed 's/^/   /' >&2
  echo "" >&2
  echo "Per CLAUDE.md, money must be formatted via src/lib/format.ts:" >&2
  echo "  • eur()      compact, e.g. €1.45M / €620K" >&2
  echo "  • eurFull()  full separators, e.g. €1,450,000" >&2
  echo "  • pct()      percentages" >&2
  echo "Import the helper and replace the inline string, then re-save." >&2
  exit 2
fi

exit 0
