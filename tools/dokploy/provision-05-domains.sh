#!/usr/bin/env bash
# provision-05-domains.sh — wire Traefik routes for gtm + dwa via
# application domains with Let's Encrypt certs.
#
# Prereqs:
#   * DNS A records for gtm.<root> and dwa.<root> point at the VPS.
#     Confirmed for soloframehub.com → 152.53.192.190 on 2026-04-23.
#   * Apps already deployed (provision-03 + 04 ran) and Dokploy shows
#     applicationStatus=done for both.
#
# What the script does:
#   1. For each app, check if a domain already exists (idempotent).
#   2. POST /api/domain.create with:
#        - host = <app>.<ROOT_DOMAIN>
#        - port = 3000    (matches Dockerfile's EXPOSE)
#        - https = true
#        - certificateType = letsencrypt
#        - domainType = application
#   3. On first request to the new host Traefik completes the ACME
#      HTTP-01 challenge (no additional config needed — Dokploy's
#      Traefik has the resolver set up by default).
#
# Flags: --dry-run
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
DK="$HERE/dk"
STATE_FILE="$ROOT/infra/dokploy/state.json"

ROOT_DOMAIN="${ROOT_DOMAIN:-soloframehub.com}"

DRY_RUN=0
for a in "$@"; do
  case "$a" in
    --dry-run) DRY_RUN=1 ;;
    --root=*)  ROOT_DOMAIN="${a#--root=}" ;;
    *) echo "unknown arg: $a" >&2; exit 2 ;;
  esac
done

log()  { printf '\033[36m[provision-05]\033[0m %s\n' "$*" >&2; }
ok()   { printf '\033[32m  ✓\033[0m %s\n' "$*" >&2; }
plan() { printf '\033[33m  »\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[31m  ✗\033[0m %s\n' "$*" >&2; exit 1; }

get_state() {
  [ -f "$STATE_FILE" ] || die "state.json missing"
  KEY="$1" FILE="$STATE_FILE" python3 <<'PY'
import json, os
d = json.load(open(os.environ['FILE']))
print(d.get(os.environ['KEY'], '') or '')
PY
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

# Find an existing domain with this host on this app. Returns the domainId
# or empty. Looks at the app's .domains array from application.one.
# NB: can't use `cmd | python3 <<PY` — bash merges the pipe stdin with the
# heredoc into python's stdin, so python tries to parse the pipe output as
# source code. Using `python3 -c '...'` keeps stdin free for the pipe.
find_domain_id() {
  local app_id="$1" host="$2"
  "$DK" GET "/api/application.one?applicationId=$app_id" \
    | HOST="$host" python3 -c '
import json, os, sys
d = json.load(sys.stdin)
for dom in d.get("domains", []):
    if dom.get("host") == os.environ["HOST"]:
        print(dom.get("domainId", ""))
        break
'
}

provision_domain() {
  local name="$1" app_id="$2"
  local host="${name}.${ROOT_DOMAIN}"

  log "app: $name → $host"
  local existing; existing="$(find_domain_id "$app_id" "$host")"
  if [ -n "$existing" ]; then
    ok "  domain exists (domainId=$existing) — no change"
    return 0
  fi

  local body
  body="$(APP="$app_id" HOST="$host" python3 <<'PY'
import json, os
print(json.dumps({
  "host": os.environ["HOST"],
  "applicationId": os.environ["APP"],
  "port": 3000,
  "https": True,
  "certificateType": "letsencrypt",
  "domainType": "application",
  "path": "/",
  "stripPath": False,
}))
PY
)"
  call POST /api/domain.create "$body" > /dev/null
  ok "  domain created → https://$host"
}

GTM_ID="$(get_state gtmApplicationId)"
DWA_ID="$(get_state dwaApplicationId)"
[ -n "$GTM_ID" ] || die "no gtmApplicationId — run provision-03 first"
[ -n "$DWA_ID" ] || die "no dwaApplicationId — run provision-03 first"
log "root=$ROOT_DOMAIN dry_run=$DRY_RUN"

provision_domain "gtm" "$GTM_ID"
provision_domain "dwa" "$DWA_ID"

log "done. First HTTP(S) request triggers the Let's Encrypt challenge."
log "If ACME fails, check: DNS actually resolves (dig +short <host>),"
log "port 80 is reachable (HTTP-01 challenge), Dokploy's Traefik has a"
log "configured resolver (should be default). Retry by curling the host."
