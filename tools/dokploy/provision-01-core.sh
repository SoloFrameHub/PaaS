#!/usr/bin/env bash
# provision-01-core.sh — idempotent bootstrap of the solofame-prod project.
#
# Steps:
#   1. Create project `solofame-prod` (skips if exists).
#   2. Read default environment id (environmentId).
#   3. Create `postgres-primary` with pgvector/pg16 image (skips if exists).
#   4. Create `redis-primary` (skips if exists).
#   5. Persist ids + generated passwords to:
#        - infra/dokploy/state.json  (ids only, committed)
#        - .env.local                (secrets, gitignored, NEVER committed)
#
# Re-run safe: each step checks existing resources first. Passwords are only
# generated on the first successful create and then stored; re-runs never
# rotate them.
#
# Usage:
#   tools/dokploy/provision-01-core.sh

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
DK="$HERE/dk"
STATE_FILE="$ROOT/infra/dokploy/state.json"
ENV_LOCAL="$ROOT/.env.local"

mkdir -p "$(dirname "$STATE_FILE")"

PROJECT_NAME="solofame-prod"
POSTGRES_NAME="postgres-primary"
POSTGRES_APPNAME="postgres-primary"
POSTGRES_DB="solofame"
POSTGRES_USER="app_user"
POSTGRES_IMAGE="pgvector/pgvector:pg16"
REDIS_NAME="redis-primary"
REDIS_APPNAME="redis-primary"
REDIS_IMAGE="redis:7-alpine"

# ---------- helpers ----------
j() { python3 -c "import json,sys; print(json.dumps(sys.argv[1]))" "$1"; }
jq_q() { python3 -c "import json,sys; d=json.load(sys.stdin); print(eval(sys.argv[1]))" "$1"; }

gen_password() {
  # 32 urlsafe bytes; no punctuation that breaks shell env files.
  python3 -c "import secrets; print(secrets.token_urlsafe(24))"
}

# Append/replace a KEY=VAL line in $ENV_LOCAL. Creates the file if missing.
put_env() {
  local key="$1" val="$2"
  touch "$ENV_LOCAL"
  # Remove any existing line for this key, then append fresh.
  python3 - "$ENV_LOCAL" "$key" "$val" <<'PY'
import sys, re
path, key, val = sys.argv[1], sys.argv[2], sys.argv[3]
try:
    lines = open(path).read().splitlines()
except FileNotFoundError:
    lines = []
kept = [ln for ln in lines if not re.match(rf'^\s*{re.escape(key)}\s*=', ln)]
kept.append(f'{key}={val}')
open(path, 'w').write('\n'.join(kept) + '\n')
PY
}

# Read a KEY from $ENV_LOCAL if present.
get_env() {
  local key="$1"
  [ -f "$ENV_LOCAL" ] || return 1
  grep -E "^${key}=" "$ENV_LOCAL" | tail -n1 | cut -d= -f2- || return 1
}

# Update infra/dokploy/state.json with `key = value` at root.
put_state() {
  local key="$1" val="$2"
  python3 - "$STATE_FILE" "$key" "$val" <<'PY'
import json, os, sys
path, key, val = sys.argv[1], sys.argv[2], sys.argv[3]
try:
    data = json.load(open(path)) if os.path.getsize(path) else {}
except (FileNotFoundError, ValueError):
    data = {}
data[key] = val
open(path, 'w').write(json.dumps(data, indent=2) + '\n')
PY
}

log() { printf '\033[36m[provision]\033[0m %s\n' "$*" >&2; }
ok()  { printf '\033[32m  ✓\033[0m %s\n' "$*" >&2; }
warn(){ printf '\033[33m  !\033[0m %s\n' "$*" >&2; }
die() { printf '\033[31m  ✗\033[0m %s\n' "$*" >&2; exit 1; }

# ---------- 1. project ----------
log "1/4 project.all"
PROJECTS_JSON="$("$DK" GET /api/project.all)"
PROJECT_ID="$(printf '%s' "$PROJECTS_JSON" \
  | python3 -c "import json,sys; d=json.load(sys.stdin); [print(p['projectId']) for p in d if p['name']=='$PROJECT_NAME']" \
  | head -n1 || true)"

if [ -z "$PROJECT_ID" ]; then
  log "creating project '$PROJECT_NAME'"
  CREATE_JSON="$("$DK" POST /api/project.create "$(python3 -c "
import json
print(json.dumps({
    'name': '$PROJECT_NAME',
    'description': 'SoloFrame Platform production — monorepo verticals (gtm, dwa, tenant-runtime, studio) + workers.'
}))")")"
  PROJECT_ID="$(printf '%s' "$CREATE_JSON" | python3 -c "
import json, sys
d = json.load(sys.stdin)
# dokploy returns {'project': {...}, 'environment': {...}} OR just the project; handle both
pid = d.get('projectId') or d.get('project',{}).get('projectId')
print(pid or '')
")"
  [ -n "$PROJECT_ID" ] || die "project.create returned no projectId: $CREATE_JSON"
  ok "project created: $PROJECT_ID"
else
  ok "project exists: $PROJECT_ID"
fi
put_state "projectId" "$PROJECT_ID"

# ---------- 2. default environment ----------
log "2/4 resolve default environmentId"
PROJECTS_JSON="$("$DK" GET /api/project.all)"
ENV_ID="$(printf '%s' "$PROJECTS_JSON" | python3 -c "
import json, sys
d = json.load(sys.stdin)
for p in d:
    if p['projectId'] != '$PROJECT_ID': continue
    for e in p.get('environments', []):
        if e.get('isDefault'):
            print(e['environmentId']); break
    break
")"
[ -n "$ENV_ID" ] || die "no default environment found for project $PROJECT_ID"
put_state "environmentId" "$ENV_ID"
ok "environmentId: $ENV_ID"

# ---------- 3. postgres-primary ----------
log "3/4 postgres-primary"
# Check if already exists by scanning project.
PG_ID="$(printf '%s' "$PROJECTS_JSON" | python3 -c "
import json, sys
d = json.load(sys.stdin)
for p in d:
    if p['projectId'] != '$PROJECT_ID': continue
    for e in p.get('environments', []):
        if e['environmentId'] != '$ENV_ID': continue
        for pg in e.get('postgres', []):
            print(pg['postgresId']); break
")"

if [ -z "$PG_ID" ]; then
  PG_PW="$(get_env SOLOFAME_POSTGRES_PASSWORD || gen_password)"
  put_env SOLOFAME_POSTGRES_PASSWORD "$PG_PW"
  log "creating postgres-primary (image $POSTGRES_IMAGE)"
  PG_RES="$("$DK" POST /api/postgres.create "$(python3 -c "
import json
print(json.dumps({
    'name': '$POSTGRES_NAME',
    'appName': '$POSTGRES_APPNAME',
    'databaseName': '$POSTGRES_DB',
    'databaseUser': '$POSTGRES_USER',
    'databasePassword': '$PG_PW',
    'dockerImage': '$POSTGRES_IMAGE',
    'environmentId': '$ENV_ID',
    'description': 'Shared Postgres — pgvector/pg16. RLS + tenant isolation. See ADR 0003.'
}))")")"
  PG_ID="$(printf '%s' "$PG_RES" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('postgresId') or d.get('id') or '')")"
  [ -n "$PG_ID" ] || die "postgres.create returned no id: $PG_RES"
  ok "postgres created: $PG_ID"
else
  ok "postgres exists: $PG_ID"
fi
put_state "postgresId" "$PG_ID"
put_state "postgresName" "$POSTGRES_NAME"
put_state "postgresImage" "$POSTGRES_IMAGE"
put_state "postgresDatabase" "$POSTGRES_DB"
put_state "postgresUser" "$POSTGRES_USER"

# ---------- 4. redis-primary ----------
log "4/4 redis-primary"
PROJECTS_JSON="$("$DK" GET /api/project.all)"
REDIS_ID="$(printf '%s' "$PROJECTS_JSON" | python3 -c "
import json, sys
d = json.load(sys.stdin)
for p in d:
    if p['projectId'] != '$PROJECT_ID': continue
    for e in p.get('environments', []):
        if e['environmentId'] != '$ENV_ID': continue
        for r in e.get('redis', []):
            print(r['redisId']); break
")"

if [ -z "$REDIS_ID" ]; then
  REDIS_PW="$(get_env SOLOFAME_REDIS_PASSWORD || gen_password)"
  put_env SOLOFAME_REDIS_PASSWORD "$REDIS_PW"
  log "creating redis-primary (image $REDIS_IMAGE)"
  R_RES="$("$DK" POST /api/redis.create "$(python3 -c "
import json
print(json.dumps({
    'name': '$REDIS_NAME',
    'appName': '$REDIS_APPNAME',
    'databasePassword': '$REDIS_PW',
    'dockerImage': '$REDIS_IMAGE',
    'environmentId': '$ENV_ID',
    'description': 'Shared Redis — quota counters (§6.5), session cache, event fanout bridge when >500 evt/s (ADR 0009).'
}))")")"
  REDIS_ID="$(printf '%s' "$R_RES" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('redisId') or d.get('id') or '')")"
  [ -n "$REDIS_ID" ] || die "redis.create returned no id: $R_RES"
  ok "redis created: $REDIS_ID"
else
  ok "redis exists: $REDIS_ID"
fi
put_state "redisId" "$REDIS_ID"
put_state "redisName" "$REDIS_NAME"
put_state "redisImage" "$REDIS_IMAGE"

# ---------- done ----------
log "state file: $STATE_FILE"
cat "$STATE_FILE"
log "secrets written to $ENV_LOCAL (gitignored)"
log "✓ provision-01-core complete."
