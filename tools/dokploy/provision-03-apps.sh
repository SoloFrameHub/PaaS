#!/usr/bin/env bash
# provision-03-apps.sh — register apps/gtm and apps/dwa as Dokploy
# applications under solofame-prod/production.
#
# Scope on purpose:
#   * create application records with matching names
#   * point them at the public GitHub repo + main branch via the
#     generic git provider (no GitHub App / OAuth needed — the repo
#     is public)
#   * set buildType=dockerfile targeting the repo-root Dockerfile
#     with a per-app APP build arg so the same Dockerfile builds
#     both apps
#   * DO NOT auto-deploy — first build is an iteration cycle and we
#     want the user to hit "Deploy" in the Dokploy UI and watch the
#     logs. After the first successful build, re-running this
#     script is safe and idempotent.
#
# Env + domain wiring are intentionally NOT set from here:
#   * env: requires DATABASE_URL + Redis URL with the correct
#     internal swarm service names, which differ by deployment.
#     Set manually in the Dokploy UI's Environment tab for now;
#     provision-04 will template them once we lock the naming.
#   * domains: Traefik routing comes in provision-04 as well.
#
# Flags:
#   --dry-run   print the mutation plan, don't call any write endpoints
#
# Prereqs:
#   infra/dokploy/state.json has projectId + environmentId
#   .env.local has DOKPLOY_URL + DOKPLOY_API_KEY (via dk wrapper)
#   Dockerfile exists at the repo root (committed in d81b7fd)
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
DK="$HERE/dk"
STATE_FILE="$ROOT/infra/dokploy/state.json"

GIT_URL="https://github.com/SoloFrameHub/PaaS.git"
GIT_BRANCH="main"
DOCKERFILE="./Dockerfile"
DOCKER_CONTEXT="."

DRY_RUN=0
for a in "$@"; do
  case "$a" in
    --dry-run) DRY_RUN=1 ;;
    *) echo "unknown arg: $a" >&2; exit 2 ;;
  esac
done

log()  { printf '\033[36m[provision-03]\033[0m %s\n' "$*" >&2; }
ok()   { printf '\033[32m  ✓\033[0m %s\n' "$*" >&2; }
plan() { printf '\033[33m  »\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[31m  ✗\033[0m %s\n' "$*" >&2; exit 1; }

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

# dk call with dry-run passthrough for writes.
call() {
  local method="$1" path="$2" body="${3:-}"
  if [ "$DRY_RUN" = "1" ] && [ "$method" != "GET" ]; then
    plan "$method $path ${body:+<$(printf '%s' "$body" | head -c 200)...>}"
    echo '{}'
    return 0
  fi
  if [ -n "$body" ]; then "$DK" "$method" "$path" "$body"; else "$DK" "$method" "$path"; fi
}

PROJECT_ID="$(get_state projectId)"
ENV_ID="$(get_state environmentId)"
[ -n "$PROJECT_ID" ] || die "no projectId in $STATE_FILE"
[ -n "$ENV_ID" ]     || die "no environmentId in $STATE_FILE"
log "project=$PROJECT_ID env=$ENV_ID dry_run=$DRY_RUN"

ENV_JSON="$("$DK" GET "/api/environment.one?environmentId=$ENV_ID")"

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

get_app_one() {
  local id="$1"
  "$DK" GET "/api/application.one?applicationId=$id"
}

# Provision one app. Args: name, build_arg_app
provision_app() {
  local name="$1" build_arg_app="$2"

  log "app: $name"

  # 1. Create application record if it doesn't exist.
  local app_id; app_id="$(find_app_id "$name")"
  if [ -z "$app_id" ]; then
    log "  application.create"
    local body
    body="$(NAME="$name" ENV_ID="$ENV_ID" python3 <<'PY'
import json, os
name = os.environ["NAME"]
print(json.dumps({
  "name": name,
  "environmentId": os.environ["ENV_ID"],
  "description": f"SoloFrame vertical app ({name}) — built from monorepo Dockerfile at repo root.",
}))
PY
)"
    local res; res="$(call POST /api/application.create "$body")"
    app_id="$(BODY="$res" python3 -c '
import json, os
d = json.loads(os.environ["BODY"] or "{}")
print(d.get("applicationId") or d.get("id") or "")
')"
    [ "$DRY_RUN" = "1" ] && app_id="DRY-$name"
    [ -n "$app_id" ] || die "application.create returned no id: $res"
    ok "  created $name -> $app_id"
  else
    ok "  exists $name -> $app_id"
  fi
  if [ "$DRY_RUN" != "1" ] || [[ "$app_id" != DRY-* ]]; then
    put_state "${name}ApplicationId" "$app_id"
  fi

  # Fetch current app state.
  local app_json
  if [ "$DRY_RUN" = "1" ] && [[ "$app_id" == DRY-* ]]; then
    app_json='{}'
  else
    app_json="$(get_app_one "$app_id")"
  fi

  # 2. Git provider — use saveGitProvider (generic, public repo, no auth).
  # Dokploy supports a `customGitUrl` field on application.saveGitProvider
  # for public repos. If the field names diverge in future, adjust here.
  local current_git
  current_git="$(J="$app_json" python3 -c 'import json,os; print(json.loads(os.environ["J"] or "{}").get("customGitUrl") or "")')"
  if [ "$current_git" != "$GIT_URL" ]; then
    log "  saveGitProvider -> $GIT_URL (branch $GIT_BRANCH)"
    local body
    body="$(APP="$app_id" URL="$GIT_URL" BR="$GIT_BRANCH" python3 -c '
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
    ok "  git provider set"
  else
    ok "  git provider already $GIT_URL"
  fi

  # 3. Build type — dockerfile at repo root.
  # Note: Dokploy's saveBuildType does NOT accept build args. The APP=<name>
  # build arg is set via application.saveEnvironment's `buildArgs` field below.
  local current_bt
  current_bt="$(J="$app_json" python3 -c 'import json,os; print(json.loads(os.environ["J"] or "{}").get("buildType") or "")')"
  if [ "$current_bt" != "dockerfile" ]; then
    log "  saveBuildType dockerfile"
    local body
    body="$(APP="$app_id" DF="$DOCKERFILE" CTX="$DOCKER_CONTEXT" python3 -c '
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
    ok "  buildType set"
  else
    ok "  buildType already dockerfile"
  fi

  # 4. Build args (APP=<name>) via saveEnvironment. Env vars are set via the
  # Dokploy UI per docs/deployment-env.md; buildArgs are separate and go here.
  local want_build_args="APP=$build_arg_app"
  local current_build_args
  current_build_args="$(J="$app_json" python3 -c 'import json,os; print(json.loads(os.environ["J"] or "{}").get("buildArgs") or "")')"
  local current_env
  current_env="$(J="$app_json" python3 -c 'import json,os; print(json.loads(os.environ["J"] or "{}").get("env") or "")')"
  if [ "$current_build_args" != "$want_build_args" ]; then
    log "  saveEnvironment (preserving env, setting buildArgs=$want_build_args)"
    local body
    body="$(APP="$app_id" ENV="$current_env" BA="$want_build_args" python3 <<'PY'
import json, os
print(json.dumps({
  "applicationId": os.environ["APP"],
  "env": os.environ["ENV"],
  "buildArgs": os.environ["BA"],
  "buildSecrets": "",
  "createEnvFile": False,
}))
PY
)"
    call POST /api/application.saveEnvironment "$body" > /dev/null
    ok "  buildArgs set"
  else
    ok "  buildArgs already $want_build_args"
  fi
}

provision_app "gtm" "gtm"
provision_app "dwa" "dwa"

log "done — next steps:"
log "  1. Dokploy UI → each app → Environment tab: set DATABASE_URL,"
log "     REDIS_URL, TENANT_ROOT_DOMAINS, NEXT_PUBLIC_APP_URL, Lucia"
log "     secrets, etc. See docs/deployment-env.md for the list."
log "  2. Dokploy UI → each app → Deploy. Watch the build log — first"
log "     attempt often surfaces Dockerfile edge cases (turbo prune,"
log "     workspace resolution). Iterate with commits."
log "  3. Once both build clean, provision-04 wires Traefik domains."
