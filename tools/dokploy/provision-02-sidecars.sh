#!/usr/bin/env bash
# provision-02-sidecars.sh — idempotent bootstrap of n8n + metabase as
# Dokploy applications under the solofame-prod/production environment.
#
# What this script sets up (minimal on purpose):
#   n8n       — n8nio/n8n pinned, SQLite backing store (default), volume
#               at /home/node/.n8n. Encryption key generated and stashed
#               in .env.local. No external port, no domain yet (Traefik
#               wiring comes in provision-03 once apps/* are lifted).
#   metabase  — metabase/metabase pinned, H2 backing store (default),
#               volume at /metabase-data. Same — no external exposure
#               yet. Later we'll migrate its metadata DB to postgres and
#               hand it a read-only role over postgres-primary.
#
# Re-runs are safe: existing applications are detected and only the
# delta (missing mounts, missing env vars, status=idle deploys) is
# applied. It will NOT delete or overwrite resources you've adjusted
# manually — mounts are added only if no mount exists at the same path.
#
# Flags:
#   --dry-run   print the mutation plan, don't call any write endpoints
#
# Prereqs:
#   infra/dokploy/state.json has `projectId` + `environmentId`
#   .env.local has DOKPLOY_URL + DOKPLOY_API_KEY (via dk wrapper)
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
DK="$HERE/dk"
STATE_FILE="$ROOT/infra/dokploy/state.json"
ENV_LOCAL="$ROOT/.env.local"

DRY_RUN=0
for a in "$@"; do
  case "$a" in
    --dry-run) DRY_RUN=1 ;;
    *) echo "unknown arg: $a" >&2; exit 2 ;;
  esac
done

log() { printf '\033[36m[provision-02]\033[0m %s\n' "$*" >&2; }
ok()  { printf '\033[32m  ✓\033[0m %s\n' "$*" >&2; }
plan(){ printf '\033[33m  »\033[0m %s\n' "$*" >&2; }
die() { printf '\033[31m  ✗\033[0m %s\n' "$*" >&2; exit 1; }

gen_secret() {
  python3 -c 'import secrets; print(secrets.token_hex(32))'
}

put_env() {
  local key="$1" val="$2"
  touch "$ENV_LOCAL"
  KEY="$key" VAL="$val" FILE="$ENV_LOCAL" python3 <<'PY'
import os, re
path = os.environ['FILE']; key = os.environ['KEY']; val = os.environ['VAL']
try: lines = open(path).read().splitlines()
except FileNotFoundError: lines = []
pat = re.compile(rf'^\s*{re.escape(key)}\s*=')
kept = [ln for ln in lines if not pat.match(ln)]
kept.append(f'{key}={val}')
open(path, 'w').write('\n'.join(kept) + '\n')
PY
}

get_env() {
  [ -f "$ENV_LOCAL" ] || return 1
  local line; line="$(grep -E "^$1=" "$ENV_LOCAL" | tail -n1 || true)"
  [ -n "$line" ] || return 1
  printf '%s\n' "${line#*=}"
}

get_state() {
  [ -f "$STATE_FILE" ] || die "state.json missing — run provision-01-core.sh first"
  KEY="$1" FILE="$STATE_FILE" python3 <<'PY'
import json, os
d = json.load(open(os.environ['FILE']))
v = d.get(os.environ['KEY'], '')
print(v or '')
PY
}

put_state() {
  KEY="$1" VAL="$2" FILE="$STATE_FILE" python3 <<'PY'
import json, os
path = os.environ['FILE']
data = json.load(open(path)) if os.path.getsize(path) else {}
data[os.environ['KEY']] = os.environ['VAL']
open(path, 'w').write(json.dumps(data, indent=2) + '\n')
PY
}

# dk call wrapper honoring --dry-run for write methods
call() {
  local method="$1" path="$2" body="${3:-}"
  if [ "$DRY_RUN" = "1" ] && [ "$method" != "GET" ]; then
    plan "$method $path ${body:+<$(printf '%s' "$body" | head -c 200)...>}"
    echo '{}'
    return 0
  fi
  if [ -n "$body" ]; then "$DK" "$method" "$path" "$body"; else "$DK" "$method" "$path"; fi
}

# JSON-build from F_<name> env vars (string values only).
json_from_env() {
  VARS="$*" python3 <<'PY'
import json, os
names = [n for n in os.environ['VARS'].split(',') if n]
print(json.dumps({n: os.environ.get('F_' + n, '') for n in names}))
PY
}

PROJECT_ID="$(get_state projectId)"
ENV_ID="$(get_state environmentId)"
[ -n "$PROJECT_ID" ] || die "no projectId in $STATE_FILE"
[ -n "$ENV_ID" ]     || die "no environmentId in $STATE_FILE"
log "project=$PROJECT_ID env=$ENV_ID dry_run=$DRY_RUN"

# Fetch environment.one once so we can look up existing applications and mounts.
ENV_JSON="$("$DK" GET "/api/environment.one?environmentId=$ENV_ID")"

# Look up an application by name within this environment, return its id or empty.
find_app_id() {
  local name="$1"
  ENV="$ENV_JSON" NAME="$name" python3 <<'PY'
import json, os
d = json.loads(os.environ['ENV'])
for a in d.get('applications', []):
    if a.get('name') == os.environ['NAME']:
        print(a.get('applicationId', ''))
        break
PY
}

# Fetch application.one (full), if id is known.
get_app_one() {
  local id="$1"
  "$DK" GET "/api/application.one?applicationId=$id"
}

app_has_mount_at() {
  local app_json="$1" mpath="$2"
  J="$app_json" P="$mpath" python3 <<'PY'
import json, os, sys
d = json.loads(os.environ['J'])
for m in d.get('mounts', []):
    if m.get('mountPath') == os.environ['P']:
        print('yes'); sys.exit(0)
print('')
PY
}

app_env() {
  local app_json="$1"
  J="$app_json" python3 -c 'import json,os; print(json.loads(os.environ["J"]).get("env") or "")'
}

app_status() {
  local app_json="$1"
  J="$app_json" python3 -c 'import json,os; print(json.loads(os.environ["J"]).get("applicationStatus",""))'
}

# Provision one sidecar. Args: name, image, envFile(KEY=VAL\n string), mountPath, description
provision_sidecar() {
  local name="$1" image="$2" envstr="$3" mount_path="$4" description="$5"

  log "sidecar: $name"
  local app_id; app_id="$(find_app_id "$name")"

  if [ -z "$app_id" ]; then
    log "  creating application record"
    export F_name="$name" F_environmentId="$ENV_ID" F_description="$description"
    local body; body="$(json_from_env name,environmentId,description)"
    unset F_name F_environmentId F_description
    local res; res="$(call POST /api/application.create "$body")"
    app_id="$(BODY="$res" python3 -c '
import json, os
d = json.loads(os.environ["BODY"] or "{}")
print(d.get("applicationId") or d.get("id") or "")
')"
    if [ "$DRY_RUN" = "1" ]; then
      app_id="DRY-$name"
    fi
    [ -n "$app_id" ] || die "application.create returned no id: $res"
    ok "  created $name -> $app_id"
  else
    ok "  exists $name -> $app_id"
  fi
  # Never persist placeholder ids from dry-run into state.json.
  if [ "$DRY_RUN" != "1" ] || [[ "$app_id" != DRY-* ]]; then
    put_state "${name}ApplicationId" "$app_id"
  fi

  # Get current app state (skipped in dry-run for unknown id).
  local app_json
  if [ "$DRY_RUN" = "1" ] && [[ "$app_id" == DRY-* ]]; then
    app_json='{}'
  else
    app_json="$(get_app_one "$app_id")"
  fi

  # saveDockerProvider — idempotent (sets image).
  local current_image
  current_image="$(J="$app_json" python3 -c 'import json,os; print(json.loads(os.environ["J"] or "{}").get("dockerImage") or "")')"
  if [ "$current_image" != "$image" ]; then
    log "  saveDockerProvider -> $image"
    export F_applicationId="$app_id" F_dockerImage="$image" F_username="" F_password="" F_registryUrl=""
    local body; body="$(json_from_env applicationId,dockerImage,username,password,registryUrl)"
    unset F_applicationId F_dockerImage F_username F_password F_registryUrl
    call POST /api/application.saveDockerProvider "$body" > /dev/null
    ok "  image set"
  else
    ok "  image already $image"
  fi

  # saveEnvironment — write full env string (dokploy treats this as replace).
  # If envstr is empty we skip unconditionally, so manual env edits in the
  # Dokploy UI for that sidecar aren't clobbered on re-run.
  local current_env; current_env="$(app_env "$app_json")"
  if [ -z "$envstr" ]; then
    ok "  env: no declared baseline (manual edits in Dokploy UI preserved)"
  elif [ "$current_env" != "$envstr" ]; then
    log "  saveEnvironment ($(printf '%s' "$envstr" | grep -c '^' || true) lines)"
    export F_applicationId="$app_id" F_env="$envstr" F_buildArgs="" F_buildSecrets="" F_createEnvFile="false"
    # createEnvFile needs to be a bool, not a string. Build JSON with python.
    local body
    body="$(APP="$app_id" ENV="$envstr" python3 -c '
import json, os
print(json.dumps({
  "applicationId": os.environ["APP"],
  "env": os.environ["ENV"],
  "buildArgs": "",
  "buildSecrets": "",
  "createEnvFile": False,
}))
')"
    unset F_applicationId F_env F_buildArgs F_buildSecrets F_createEnvFile
    call POST /api/application.saveEnvironment "$body" > /dev/null
    ok "  env set"
  else
    ok "  env already current"
  fi

  # mount — only create if no mount at this path.
  local has_mount; has_mount="$(app_has_mount_at "$app_json" "$mount_path")"
  if [ -z "$has_mount" ]; then
    log "  mounts.create volume at $mount_path"
    local body
    body="$(APP="$app_id" MP="$mount_path" python3 -c '
import json, os
print(json.dumps({
  "type": "volume",
  "mountPath": os.environ["MP"],
  "serviceId": os.environ["APP"],
  "serviceType": "application",
}))
')"
    call POST /api/mounts.create "$body" > /dev/null
    ok "  mount created"
  else
    ok "  mount at $mount_path exists"
  fi

  # Deploy if idle (never redeploy a running/done service from this script).
  local status; status="$(app_status "$app_json")"
  case "$status" in
    idle|"")
      log "  application.deploy (status=$status)"
      local body; body="{\"applicationId\":\"$app_id\"}"
      call POST /api/application.deploy "$body" > /dev/null
      ok "  deploy kicked off"
      ;;
    *)
      ok "  status=$status (leaving alone)"
      ;;
  esac
}

# --- n8n ---
N8N_KEY="$(get_env N8N_ENCRYPTION_KEY || gen_secret)"
put_env N8N_ENCRYPTION_KEY "$N8N_KEY"
N8N_IMAGE="n8nio/n8n:1.70.0"
N8N_ENV="$(printf '%s\n' \
  "N8N_ENCRYPTION_KEY=$N8N_KEY" \
  "GENERIC_TIMEZONE=UTC" \
  "N8N_HOST=0.0.0.0" \
  "N8N_PROTOCOL=http" \
  "N8N_SECURE_COOKIE=false" \
  "N8N_PORT=5678" \
)"
N8N_DESC="Workflow automation (ADR 0010). Default SQLite store; migrate to postgres backend later. See infra/dokploy/README.md."

# --- metabase ---
MB_IMAGE="metabase/metabase:v0.52.4"
MB_ENV=""   # H2 default, no env required.
MB_DESC="Analytics dashboarding (pooled sidecar). Default H2 metadata store; migrate to postgres backend later. Tenanted reads go through views on postgres-primary."

provision_sidecar "n8n"      "$N8N_IMAGE" "$N8N_ENV" "/home/node/.n8n" "$N8N_DESC"
provision_sidecar "metabase" "$MB_IMAGE"  "$MB_ENV"  "/metabase-data"  "$MB_DESC"

log "state file:"
cat "$STATE_FILE"
suffix=""
[ "$DRY_RUN" = "1" ] && suffix=" (dry-run)"
log "✓ provision-02-sidecars complete$suffix."
