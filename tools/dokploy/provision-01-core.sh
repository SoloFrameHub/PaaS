#!/usr/bin/env bash
# provision-01-core.sh — idempotent bootstrap of the solofame-prod project.
#
# Steps:
#   1. Create project `solofame-prod` (skips if exists).
#   2. Read default environment id.
#   3. Create `postgres-primary` with pgvector/pg16 image (skips if exists).
#   4. Create `redis-primary` (skips if exists).
#   5. Persist ids + generated passwords:
#        infra/dokploy/state.json  — ids only (committed)
#        .env.local                — secrets (gitignored, NEVER committed)
#
# Re-runs are safe: existing resources are detected and skipped.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
DK="$HERE/dk"
STATE_FILE="$ROOT/infra/dokploy/state.json"
ENV_LOCAL="$ROOT/.env.local"

mkdir -p "$(dirname "$STATE_FILE")"

PROJECT_NAME="solofame-prod"
PROJECT_DESC="SoloFrame Platform production — monorepo verticals (gtm, dwa, tenant-runtime, studio) + workers."
POSTGRES_NAME="postgres-primary"
POSTGRES_APPNAME="postgres-primary"
POSTGRES_DB="solofame"
POSTGRES_USER="app_user"
POSTGRES_IMAGE="pgvector/pgvector:pg16"
POSTGRES_DESC="Shared Postgres — pgvector/pg16. RLS + tenant isolation. See ADR 0003."
REDIS_NAME="redis-primary"
REDIS_APPNAME="redis-primary"
REDIS_IMAGE="redis:7-alpine"
REDIS_DESC="Shared Redis — quota counters (§6.5), session cache, BullMQ bridge when >500 evt/s (ADR 0009)."

log() { printf '\033[36m[provision]\033[0m %s\n' "$*" >&2; }
ok()  { printf '\033[32m  ✓\033[0m %s\n' "$*" >&2; }
die() { printf '\033[31m  ✗\033[0m %s\n' "$*" >&2; exit 1; }

gen_password() {
  python3 -c 'import secrets; print(secrets.token_urlsafe(24))'
}

put_env() {
  local key="$1" val="$2"
  touch "$ENV_LOCAL"
  KEY="$key" VAL="$val" FILE="$ENV_LOCAL" python3 <<'PY'
import os, re
path = os.environ['FILE']
key  = os.environ['KEY']
val  = os.environ['VAL']
try:
    lines = open(path).read().splitlines()
except FileNotFoundError:
    lines = []
pat = re.compile(rf'^\s*{re.escape(key)}\s*=')
kept = [ln for ln in lines if not pat.match(ln)]
kept.append(f'{key}={val}')
open(path, 'w').write('\n'.join(kept) + '\n')
PY
}

get_env() {
  local key="$1"
  [ -f "$ENV_LOCAL" ] || return 1
  local line
  line="$(grep -E "^${key}=" "$ENV_LOCAL" | tail -n1 || true)"
  [ -n "$line" ] || return 1
  printf '%s\n' "${line#*=}"
}

put_state() {
  local key="$1" val="$2"
  KEY="$key" VAL="$val" FILE="$STATE_FILE" python3 <<'PY'
import json, os, sys
path = os.environ['FILE']
key  = os.environ['KEY']
val  = os.environ['VAL']
try:
    data = json.load(open(path)) if os.path.getsize(path) else {}
except (FileNotFoundError, ValueError):
    data = {}
data[key] = val
open(path, 'w').write(json.dumps(data, indent=2) + '\n')
PY
}

# JSON-encode an object from NAMED env vars (comma-separated). Supports only
# string values, which is all the Dokploy create endpoints need.
json_obj() {
  VARS="$*" python3 <<'PY'
import json, os
names = [n for n in os.environ['VARS'].split(',') if n]
body = {n: os.environ.get('F_' + n, '') for n in names}
print(json.dumps(body))
PY
}

# ---------- 1. project ----------
log "1/4 project.all"
PROJECTS_JSON="$("$DK" GET /api/project.all)"
PROJECT_ID="$(PROJECTS="$PROJECTS_JSON" NAME="$PROJECT_NAME" python3 -c '
import json, os
d = json.loads(os.environ["PROJECTS"])
for p in d:
    if p["name"] == os.environ["NAME"]:
        print(p["projectId"]); break
')"

if [ -z "$PROJECT_ID" ]; then
  log "creating project '$PROJECT_NAME'"
  export F_name="$PROJECT_NAME"
  export F_description="$PROJECT_DESC"
  BODY="$(json_obj name,description)"
  unset F_name F_description
  CREATE_JSON="$("$DK" POST /api/project.create "$BODY")"
  PROJECT_ID="$(BODY="$CREATE_JSON" python3 -c '
import json, os
d = json.loads(os.environ["BODY"])
pid = d.get("projectId") or d.get("project",{}).get("projectId")
print(pid or "")
')"
  [ -n "$PROJECT_ID" ] || die "project.create returned no projectId: $CREATE_JSON"
  ok "project created: $PROJECT_ID"
else
  ok "project exists: $PROJECT_ID"
fi
put_state "projectId" "$PROJECT_ID"

# ---------- 2. default environment ----------
log "2/4 resolve default environmentId"
PROJECTS_JSON="$("$DK" GET /api/project.all)"
ENV_ID="$(PROJECTS="$PROJECTS_JSON" PID="$PROJECT_ID" python3 -c '
import json, os
d = json.loads(os.environ["PROJECTS"])
pid = os.environ["PID"]
for p in d:
    if p["projectId"] != pid: continue
    for e in p.get("environments", []):
        if e.get("isDefault"):
            print(e["environmentId"]); break
    break
')"
[ -n "$ENV_ID" ] || die "no default environment found for project $PROJECT_ID"
put_state "environmentId" "$ENV_ID"
ok "environmentId: $ENV_ID"

# ---------- 3. postgres-primary ----------
log "3/4 postgres-primary"
PG_ID="$(PROJECTS="$PROJECTS_JSON" PID="$PROJECT_ID" EID="$ENV_ID" python3 -c '
import json, os
d = json.loads(os.environ["PROJECTS"])
for p in d:
    if p["projectId"] != os.environ["PID"]: continue
    for e in p.get("environments", []):
        if e["environmentId"] != os.environ["EID"]: continue
        for pg in e.get("postgres", []):
            print(pg["postgresId"]); break
')"

if [ -z "$PG_ID" ]; then
  PG_PW="$(get_env SOLOFAME_POSTGRES_PASSWORD || gen_password)"
  put_env SOLOFAME_POSTGRES_PASSWORD "$PG_PW"
  log "creating postgres-primary (image $POSTGRES_IMAGE)"
  export F_name="$POSTGRES_NAME"
  export F_appName="$POSTGRES_APPNAME"
  export F_databaseName="$POSTGRES_DB"
  export F_databaseUser="$POSTGRES_USER"
  export F_databasePassword="$PG_PW"
  export F_dockerImage="$POSTGRES_IMAGE"
  export F_environmentId="$ENV_ID"
  export F_description="$POSTGRES_DESC"
  BODY="$(json_obj name,appName,databaseName,databaseUser,databasePassword,dockerImage,environmentId,description)"
  unset F_name F_appName F_databaseName F_databaseUser F_databasePassword F_dockerImage F_environmentId F_description
  PG_RES="$("$DK" POST /api/postgres.create "$BODY")"
  PG_ID="$(BODY="$PG_RES" python3 -c '
import json, os
d = json.loads(os.environ["BODY"])
print(d.get("postgresId") or d.get("id") or "")
')"
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
REDIS_ID="$(PROJECTS="$PROJECTS_JSON" PID="$PROJECT_ID" EID="$ENV_ID" python3 -c '
import json, os
d = json.loads(os.environ["PROJECTS"])
for p in d:
    if p["projectId"] != os.environ["PID"]: continue
    for e in p.get("environments", []):
        if e["environmentId"] != os.environ["EID"]: continue
        for r in e.get("redis", []):
            print(r["redisId"]); break
')"

if [ -z "$REDIS_ID" ]; then
  REDIS_PW="$(get_env SOLOFAME_REDIS_PASSWORD || gen_password)"
  put_env SOLOFAME_REDIS_PASSWORD "$REDIS_PW"
  log "creating redis-primary (image $REDIS_IMAGE)"
  export F_name="$REDIS_NAME"
  export F_appName="$REDIS_APPNAME"
  export F_databasePassword="$REDIS_PW"
  export F_dockerImage="$REDIS_IMAGE"
  export F_environmentId="$ENV_ID"
  export F_description="$REDIS_DESC"
  BODY="$(json_obj name,appName,databasePassword,dockerImage,environmentId,description)"
  unset F_name F_appName F_databasePassword F_dockerImage F_environmentId F_description
  R_RES="$("$DK" POST /api/redis.create "$BODY")"
  REDIS_ID="$(BODY="$R_RES" python3 -c '
import json, os
d = json.loads(os.environ["BODY"])
print(d.get("redisId") or d.get("id") or "")
')"
  [ -n "$REDIS_ID" ] || die "redis.create returned no id: $R_RES"
  ok "redis created: $REDIS_ID"
else
  ok "redis exists: $REDIS_ID"
fi
put_state "redisId" "$REDIS_ID"
put_state "redisName" "$REDIS_NAME"
put_state "redisImage" "$REDIS_IMAGE"

# ---------- 5. deploy idle services ----------
# Dokploy create endpoints only record config; they don't start containers.
# Deploy iff the current applicationStatus is 'idle' (fresh or manually stopped)
# — avoid noisy redeploys of 'running' or 'done' services.
deploy_if_idle() {
  local kind="$1"       # postgres | redis
  local id_field="$2"   # postgresId | redisId
  local id_val="$3"
  local status
  status="$("$DK" GET "/api/${kind}.one?${id_field}=${id_val}" \
    | BODY="$(cat)" python3 -c 'import json,os; d=json.loads(os.environ["BODY"]); print(d.get("applicationStatus",""))' 2>/dev/null \
    || true)"
  # The pipeline above eats the input. Redo without the pipe dance.
  RESP="$("$DK" GET "/api/${kind}.one?${id_field}=${id_val}")"
  status="$(BODY="$RESP" python3 -c 'import json,os; d=json.loads(os.environ["BODY"]); print(d.get("applicationStatus",""))')"
  case "$status" in
    idle)
      log "deploying $kind (status=$status)"
      export F_key_id="$id_val"
      BODY="{\"$id_field\":\"$id_val\"}"
      unset F_key_id
      "$DK" POST "/api/${kind}.deploy" "$BODY" > /dev/null
      ok "$kind deploy kicked off"
      ;;
    running|done)
      ok "$kind already $status"
      ;;
    *)
      ok "$kind status=$status (leaving alone)"
      ;;
  esac
}
log "5/5 deploy idle services"
deploy_if_idle postgres postgresId "$PG_ID"
deploy_if_idle redis redisId "$REDIS_ID"

log "state file: $STATE_FILE"
cat "$STATE_FILE"
log "secrets written to $ENV_LOCAL (gitignored)"
log "✓ provision-01-core complete."
