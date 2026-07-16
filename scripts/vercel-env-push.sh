#!/usr/bin/env bash
# Push environment variables from a local env file to the linked Vercel project.
#
# Fill REAL values into the env file first (default: .env.prod, which is
# gitignored). This script reads that file and sets each variable on Vercel.
# It never prints the values, and it skips anything still set to a placeholder.
#
# Usage:
#   ./scripts/vercel-env-push.sh [env-file] [environments...]
#
# Examples:
#   ./scripts/vercel-env-push.sh                          # .env.prod -> production + preview
#   ./scripts/vercel-env-push.sh .env.prod production     # production only
#   ./scripts/vercel-env-push.sh .env.local development   # local dev environment
#
# Requires: the Vercel CLI, logged in (`vercel login`) and linked (`vercel link`).

set -euo pipefail

ENV_FILE="${1:-.env.prod}"
shift || true
ENVIRONMENTS=("$@")
[ ${#ENVIRONMENTS[@]} -eq 0 ] && ENVIRONMENTS=(production preview)

# Only these keys are pushed (comments and anything else in the file are ignored).
KEYS=(AIRTABLE_TOKEN AIRTABLE_BASE_ID AIRTABLE_TABLE TRKIT_PUBLIC_KEY TRKIT_SECRET_KEY)

if [ ! -f "$ENV_FILE" ]; then
  echo "env file not found: $ENV_FILE" >&2
  exit 1
fi

for key in "${KEYS[@]}"; do
  val="$(grep -E "^${key}=" "$ENV_FILE" | tail -1 | cut -d= -f2-)"
  if [ -z "$val" ] || printf '%s' "$val" | grep -q 'XXXX'; then
    echo "skip  $key (empty or placeholder)"
    continue
  fi
  for env in "${ENVIRONMENTS[@]}"; do
    vercel env rm "$key" "$env" --yes >/dev/null 2>&1 || true
    printf '%s' "$val" | vercel env add "$key" "$env" >/dev/null
    echo "set   $key -> $env"
  done
done

echo
echo "Done. Redeploy for the changes to take effect:  vercel --prod"
