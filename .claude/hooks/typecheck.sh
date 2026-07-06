#!/usr/bin/env bash
# PostToolUse hook (Edit|Write|MultiEdit).
# After Claude edits a TypeScript file, run the type checker so any error is fed
# straight back into the conversation instead of surfacing later at build time.
#
# Contract: receives the tool event as JSON on stdin. Exit 2 + stderr => the
# message is shown to Claude so it can fix the problem in the same turn.

set -euo pipefail

input="$(cat)"

# Extract the edited file path from the hook payload.
file_path="$(printf '%s' "$input" | python3 -c \
  "import sys, json; print(json.load(sys.stdin).get('tool_input', {}).get('file_path', ''))" \
  2>/dev/null || true)"

# Only react to TypeScript sources.
case "$file_path" in
  *.ts | *.tsx) ;;
  *) exit 0 ;;
esac

cd "$CLAUDE_PROJECT_DIR"

if ! out="$(npx --no-install tsc --noEmit 2>&1)"; then
  echo "🛑 TypeScript check failed after editing $file_path:" >&2
  echo "$out" | tail -20 >&2
  exit 2
fi

echo "✅ Type check passed."
exit 0
