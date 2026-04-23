#!/bin/sh
# run-and-trace — wrapper that captures a command's stdout/stderr/exit code
# and logs it to `system_audit` for out-of-band debugging. Used by the
# Dokploy schedule wrappers so failed runs produce a readable record we can
# query from outside the Swarm (no SSH into the VPS, no tailing
# /etc/dokploy/schedules/ log files).
#
# Usage: run-and-trace <tag> <cmd> [args...]
#
# Writes a row to `system_audit`:
#   actor_kind  = 'ops_runner'
#   action      = <tag>
#   resource_kind = 'schedule'
#   outcome     = 'ok' | 'error'
#   meta.exit   = numeric exit code
#   meta.out    = first 4000 bytes of combined stdout/stderr
#
# Re-exits with the child's code so Dokploy's schedule sees the right
# status (done / error) unchanged.

set -eu
cd /repo

TAG="$1"
shift

# Capture stdout+stderr to tmpfile so we can both write-to-DB and forward.
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

set +e
"$@" > "$TMP" 2>&1
EC=$?
set -e

# Dump to actual stdout so Dokploy's schedule log still gets the content.
cat "$TMP"

# Best-effort trace to system_audit. Failure here is ignored (we don't want
# to mask the child's exit code). Use base64 so quoting isn't fragile.
OUT_B64="$(head -c 4000 "$TMP" | base64 -w0 2>/dev/null || head -c 4000 "$TMP" | base64 | tr -d '\n')"
OUTCOME="ok"
[ "$EC" -ne 0 ] && OUTCOME="error"

if [ -n "${DATABASE_URL:-}" ]; then
  psql "$DATABASE_URL" -v ON_ERROR_STOP=0 -q -v "tag=$TAG" -v "ec=$EC" -v "out=$OUT_B64" -v "outcome=$OUTCOME" <<'SQL' 2>/dev/null || true
-- system_audit CHECK constraint: actor_kind IN ('user','system','workflow','api_key')
--                                outcome     IN ('ok','denied','error')
-- Using 'system' for the runner, and 'error' when the child exits non-zero
-- (outcome='ok' stays valid for success).
INSERT INTO system_audit (actor_kind, action, resource_kind, outcome, meta)
VALUES (
  'system',
  :'tag',
  'schedule',
  :'outcome',
  jsonb_build_object(
    'runner', 'ops_runner',
    'exit', :'ec'::int,
    'out_b64', :'out'
  )
);
SQL
fi

exit "$EC"
