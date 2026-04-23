#!/usr/bin/env bash
# provision-06-ops.sh — register the ops-runner application and its
# manual-trigger schedules.
#
# The ops-runner is a long-running container on the Swarm overlay with
# internal access to postgres-primary + redis-primary. We don't expose
# a port; we don't expect HTTP traffic. Commands are invoked by hitting
# Dokploy's `/api/schedule.runManually` — each schedule is registered
# with a "never" cron so nothing fires autonomously.
#
# Deploy order on a fresh environment:
#   provision-01-core → pg + redis
#   provision-02-sidecars → n8n + metabase
#   provision-03-apps + 04 + 05 → gtm + dwa live
#   provision-06-ops → ops-runner + schedules (this file)
#
# Once the ops-runner container is deployed + running, seed the first
# tenant with:
#   tools/dokploy/dk POST /api/schedule.runManually \
#     '{"scheduleId":"<seed-tenant-demo scheduleId from state.json>"}'
#
# Flags: --dry-run
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
DK="$HERE/dk"
STATE_FILE="$ROOT/infra/dokploy/state.json"
ENV_LOCAL="$ROOT/.env.local"

GIT_URL="https://github.com/SoloFrameHub/PaaS.git"
GIT_BRANCH="main"
DOCKERFILE="./Dockerfile.ops"
DOCKER_CONTEXT="."
APP_NAME="ops-runner"

# "Never" cron — Jan 1 at 00:00 once a year. Combined with enabled:false
# this means the schedule only runs when explicitly triggered via
# schedule.runManually. Valid 5-field cron, accepted by Dokploy's parser.
NEVER_CRON="0 0 1 1 *"

DRY_RUN=0
for a in "$@"; do
  case "$a" in
    --dry-run) DRY_RUN=1 ;;
    *) echo "unknown arg: $a" >&2; exit 2 ;;
  esac
done

log()  { printf '\033[36m[provision-06]\033[0m %s\n' "$*" >&2; }
ok()   { printf '\033[32m  ✓\033[0m %s\n' "$*" >&2; }
plan() { printf '\033[33m  »\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[31m  ✗\033[0m %s\n' "$*" >&2; exit 1; }

get_state() {
  [ -f "$STATE_FILE" ] || die "state.json missing"
  KEY="$1" FILE="$STATE_FILE" python3 -c '
import json, os
d = json.load(open(os.environ["FILE"]))
print(d.get(os.environ["KEY"], "") or "")
'
}

put_state() {
  KEY="$1" VAL="$2" FILE="$STATE_FILE" python3 -c '
import json, os
path = os.environ["FILE"]
data = json.load(open(path)) if os.path.getsize(path) else {}
data[os.environ["KEY"]] = os.environ["VAL"]
open(path, "w").write(json.dumps(data, indent=2) + "\n")
'
}

get_env() {
  [ -f "$ENV_LOCAL" ] || return 1
  local line; line="$(grep -E "^$1=" "$ENV_LOCAL" | tail -n1 || true)"
  [ -n "$line" ] || return 1
  printf '%s\n' "${line#*=}"
}

call() {
  local method="$1" path="$2" body="${3:-}"
  if [ "$DRY_RUN" = "1" ] && [ "$method" != "GET" ]; then
    plan "$method $path ${body:+<$(printf '%s' "$body" | head -c 220)...>}"
    echo '{}'
    return 0
  fi
  if [ -n "$body" ]; then "$DK" "$method" "$path" "$body"; else "$DK" "$method" "$path"; fi
}

PROJECT_ID="$(get_state projectId)"
ENV_ID="$(get_state environmentId)"
[ -n "$PROJECT_ID" ] || die "no projectId in state.json"
[ -n "$ENV_ID" ]     || die "no environmentId in state.json"
log "project=$PROJECT_ID env=$ENV_ID dry_run=$DRY_RUN"

# ─── 1. find-or-create ops-runner application ───────────────────────────
ENV_JSON="$("$DK" GET "/api/environment.one?environmentId=$ENV_ID")"
APP_ID="$(printf '%s' "$ENV_JSON" | NAME="$APP_NAME" python3 -c '
import json, os, sys
d = json.load(sys.stdin)
for a in d.get("applications", []):
    if a.get("name") == os.environ["NAME"]:
        print(a.get("applicationId", ""))
        break
')"

if [ -z "$APP_ID" ]; then
  log "application.create $APP_NAME"
  body="$(NAME="$APP_NAME" ENV_ID="$ENV_ID" python3 -c '
import json, os
print(json.dumps({
  "name": os.environ["NAME"],
  "environmentId": os.environ["ENV_ID"],
  "description": "Platform ops runner — migrations, tenant seeding, leak harness. Invoked via schedule.runManually.",
}))')"
  res="$(call POST /api/application.create "$body")"
  APP_ID="$(printf '%s' "$res" | python3 -c '
import json, sys
d = json.load(sys.stdin) if sys.stdin.readable() else {}
print(d.get("applicationId") or d.get("id") or "")
')"
  [ "$DRY_RUN" = "1" ] && APP_ID="DRY-ops"
  [ -n "$APP_ID" ] || die "application.create returned no id: $res"
  ok "created $APP_NAME -> $APP_ID"
else
  ok "exists $APP_NAME -> $APP_ID"
fi
put_state "opsApplicationId" "$APP_ID"

# ─── 2. git provider ────────────────────────────────────────────────────
log "saveGitProvider -> $GIT_URL ($GIT_BRANCH)"
body="$(APP="$APP_ID" URL="$GIT_URL" BR="$GIT_BRANCH" python3 -c '
import json, os
print(json.dumps({
  "applicationId": os.environ["APP"],
  "customGitUrl": os.environ["URL"],
  "customGitBranch": os.environ["BR"],
  "customGitBuildPath": "/",
  "watchPaths": [],
  "enableSubmodules": False,
  "customGitSSHKeyId": None,
}))')"
call POST /api/application.saveGitProvider "$body" > /dev/null
ok "git provider set"

# ─── 3. build type — Dockerfile.ops ─────────────────────────────────────
log "saveBuildType -> $DOCKERFILE"
body="$(APP="$APP_ID" DF="$DOCKERFILE" CTX="$DOCKER_CONTEXT" python3 -c '
import json, os
print(json.dumps({
  "applicationId": os.environ["APP"],
  "buildType": "dockerfile",
  "dockerfile": os.environ["DF"],
  "dockerContextPath": os.environ["CTX"],
  "dockerBuildStage": "",
  "herokuVersion": "",
  "railpackVersion": "",
  "isStaticSpa": False,
}))')"
call POST /api/application.saveBuildType "$body" > /dev/null
ok "buildType set (Dockerfile.ops)"

# ─── 4. env vars (same pg + redis + internal as gtm/dwa) ────────────────
POSTGRES_PW="$(get_env SOLOFAME_POSTGRES_PASSWORD || die 'SOLOFAME_POSTGRES_PASSWORD missing')"
REDIS_PW="$(get_env SOLOFAME_REDIS_PASSWORD     || die 'SOLOFAME_REDIS_PASSWORD missing')"
DATABASE_URL="postgres://app_user:${POSTGRES_PW}@postgres-primary:5432/solofame"
REDIS_URL="redis://:${REDIS_PW}@redis-primary:6379"

ENV_STR="$(cat <<EOF
# --- infrastructure (set by provision-06) ---
DATABASE_URL=$DATABASE_URL
PLATFORM_DATABASE_URL=$DATABASE_URL
REDIS_URL=$REDIS_URL
TEST_DATABASE_URL=$DATABASE_URL
NODE_ENV=production
EOF
)"

log "saveEnvironment for ops-runner"
body="$(APP="$APP_ID" ENV="$ENV_STR" python3 -c '
import json, os
print(json.dumps({
  "applicationId": os.environ["APP"],
  "env": os.environ["ENV"],
  "buildArgs": "",
  "buildSecrets": "",
  "createEnvFile": False,
}))')"
call POST /api/application.saveEnvironment "$body" > /dev/null
ok "env set"

# ─── 5. schedules (register one per ops command; all "never" cron) ──────
# Each schedule is a named command that we can trigger via schedule.runManually.
# Re-running this script is safe: existing schedules with the same name are
# detected and skipped.

# Fetch existing schedules for this application.
APP_ONE="$("$DK" GET "/api/application.one?applicationId=$APP_ID")"

register_schedule() {
  local sched_name="$1" command="$2"

  local existing_id
  existing_id="$(printf '%s' "$APP_ONE" | NAME="$sched_name" python3 -c '
import json, os, sys
d = json.load(sys.stdin)
for s in d.get("schedules", []):
    if s.get("name") == os.environ["NAME"]:
        print(s.get("scheduleId", ""))
        break
')"

  if [ -n "$existing_id" ]; then
    ok "schedule exists: $sched_name -> $existing_id"
    put_state "schedule_${sched_name//-/_}" "$existing_id"
    return 0
  fi

  log "schedule.create $sched_name"
  body="$(APP="$APP_ID" NAME="$sched_name" CMD="$command" CRON="$NEVER_CRON" python3 -c '
import json, os
print(json.dumps({
  "name": os.environ["NAME"],
  "cronExpression": os.environ["CRON"],
  "command": os.environ["CMD"],
  "script": "",
  "shellType": "sh",
  "scheduleType": "application",
  "applicationId": os.environ["APP"],
  "enabled": False,
  "timezone": "UTC",
}))')"
  res="$(call POST /api/schedule.create "$body")"
  local sched_id
  sched_id="$(printf '%s' "$res" | python3 -c '
import json, sys
d = json.load(sys.stdin) if sys.stdin.readable() else {}
print(d.get("scheduleId", ""))
')"
  [ "$DRY_RUN" = "1" ] && sched_id="DRY-$sched_name"
  [ -n "$sched_id" ] || die "schedule.create returned no id: $res"
  put_state "schedule_${sched_name//-/_}" "$sched_id"
  ok "created $sched_name -> $sched_id"
}

# Seeding / migrations.
register_schedule "ops-apply-migrations"   "ops-apply-migrations"
register_schedule "ops-seed-tenant-demo"   "ops-seed-tenant --slug demo --parent-manifest-id dwa"
register_schedule "ops-seed-tenant-gtm"    "ops-seed-tenant --slug gtm-demo --parent-manifest-id gtm"
register_schedule "ops-leak-harness"       "ops-leak-harness"

log "done."
log "Next:"
log "  1. First deploy happens automatically on next push to main, or click"
log "     Deploy in the Dokploy UI for ops-runner."
log "  2. Once ops-runner is running, trigger schedules via:"
log "     SID=\$(python3 -c 'import json;print(json.load(open(\"infra/dokploy/state.json\"))[\"schedule_ops_seed_tenant_demo\"])')"
log "     tools/dokploy/dk POST /api/schedule.runManually '{\"scheduleId\":\"'\$SID'\"}'"
