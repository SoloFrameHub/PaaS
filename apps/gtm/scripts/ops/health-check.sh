#!/usr/bin/env bash
# health-check.sh — Comprehensive health monitoring for all SoloFrameHub services
#
# Usage:
#   ./health-check.sh            # Run all checks, alert on state changes
#   ./health-check.sh --verbose  # Print detailed output
#   ./health-check.sh --test     # Send a test alert email
#
# Cron: */5 * * * * /root/ops/health-check.sh >> /var/log/ops/health.log 2>&1

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "${SCRIPT_DIR}/ops.conf"
source "${SCRIPT_DIR}/lib.sh"

ensure_dirs

VERBOSE=false
TEST_MODE=false
for arg in "$@"; do
  case "$arg" in
    --verbose|-v) VERBOSE=true ;;
    --test) TEST_MODE=true ;;
  esac
done

# ============================================================================
# TEST MODE
# ============================================================================

if $TEST_MODE; then
  log "Sending test alert email..."
  send_alert "Health Check Test" "This is a test alert from health-check.sh on $(hostname) at $(date)."
  exit $?
fi

# ============================================================================
# RESULTS TRACKING
# ============================================================================

TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0
WARNINGS=0
declare -a FAILURES=()
declare -a WARN_MSGS=()

record_pass() {
  local name="$1"
  TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
  PASSED_CHECKS=$((PASSED_CHECKS + 1))
  $VERBOSE && log "PASS: $name"
}

record_fail() {
  local name="$1"
  local detail="${2:-}"
  TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
  FAILED_CHECKS=$((FAILED_CHECKS + 1))
  FAILURES+=("${name}: ${detail}")
  warn "FAIL: $name — $detail"
}

record_warn() {
  local name="$1"
  local detail="${2:-}"
  TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
  WARNINGS=$((WARNINGS + 1))
  WARN_MSGS+=("${name}: ${detail}")
  warn "WARN: $name — $detail"
}

# ============================================================================
# CHECK: HTTP ENDPOINTS
# ============================================================================

check_http_endpoints() {
  log "Checking HTTP endpoints..."

  for service in "${!HEALTH_URLS[@]}"; do
    local url="${HEALTH_URLS[$service]}"
    local http_code
    http_code=$(curl -s -o /dev/null -w "%{http_code}" \
      --max-time "${HEALTH_CHECK_TIMEOUT}" \
      -L "$url" 2>/dev/null) || http_code="000"

    if [[ "$http_code" =~ ^(200|301|302|303|307|308)$ ]]; then
      record_pass "http-${service}"
      handle_recovery "http-${service}" "$url"
    else
      record_fail "http-${service}" "HTTP ${http_code} from ${url}"
      handle_failure "http-${service}" "HTTP ${http_code} from ${url}"
    fi
  done
}

# ============================================================================
# CHECK: DOCKER CONTAINERS
# ============================================================================

check_docker_containers() {
  log "Checking Docker containers..."

  for container_pattern in "${EXPECTED_CONTAINERS[@]}"; do
    if container_running "$container_pattern"; then
      record_pass "container-${container_pattern}"
      handle_recovery "container-${container_pattern}" "running"
    else
      record_fail "container-${container_pattern}" "Container not running"
      handle_failure "container-${container_pattern}" "Container not running: ${container_pattern}"
    fi
  done
}

# ============================================================================
# CHECK: POSTGRESQL CONNECTIVITY
# ============================================================================

check_postgres() {
  log "Checking PostgreSQL databases..."

  local pg_user="${CAA_PG_USER:-$DEFAULT_PG_USER}"
  local pg_db="${CAA_PG_DB:-$DEFAULT_PG_DB}"

  # CAA PostgreSQL
  if container_running "$CAA_PG_CONTAINER"; then
    local result
    result=$(docker_exec_output "$CAA_PG_CONTAINER" "psql -U ${pg_user} -d ${pg_db} -c 'SELECT 1' -t -A" 2>&1) || result=""
    if [[ "$result" == *"1"* ]]; then
      record_pass "postgres-caa"
      handle_recovery "postgres-caa" "connected"
    else
      record_fail "postgres-caa" "Query failed: ${result:0:100}"
      handle_failure "postgres-caa" "PostgreSQL CAA query failed"
    fi
  else
    record_fail "postgres-caa" "Container not running"
    handle_failure "postgres-caa" "PostgreSQL CAA container not running"
  fi

  # MHE PostgreSQL
  local mhe_pg_user="${MHE_PG_USER:-$DEFAULT_PG_USER}"
  local mhe_pg_db="${MHE_PG_DB:-$DEFAULT_PG_DB}"

  if container_running "$MHE_PG_CONTAINER"; then
    local result
    result=$(docker_exec_output "$MHE_PG_CONTAINER" "psql -U ${mhe_pg_user} -d ${mhe_pg_db} -c 'SELECT 1' -t -A" 2>&1) || result=""
    if [[ "$result" == *"1"* ]]; then
      record_pass "postgres-mhe"
      handle_recovery "postgres-mhe" "connected"
    else
      record_fail "postgres-mhe" "Query failed: ${result:0:100}"
      handle_failure "postgres-mhe" "PostgreSQL MHE query failed"
    fi
  else
    record_fail "postgres-mhe" "Container not running"
    handle_failure "postgres-mhe" "PostgreSQL MHE container not running"
  fi
}

# ============================================================================
# CHECK: REDIS CONNECTIVITY
# ============================================================================

check_redis() {
  log "Checking Redis..."

  if container_running "$CAA_REDIS_CONTAINER"; then
    local result
    result=$(docker_exec_output "$CAA_REDIS_CONTAINER" "redis-cli PING" 2>&1) || result=""
    if [[ "$result" == *"PONG"* ]]; then
      record_pass "redis-caa"
      handle_recovery "redis-caa" "connected"
    else
      record_fail "redis-caa" "PING failed: ${result:0:100}"
      handle_failure "redis-caa" "Redis PING failed"
    fi
  else
    record_fail "redis-caa" "Container not running"
    handle_failure "redis-caa" "Redis container not running"
  fi
}

# ============================================================================
# CHECK: DISK SPACE
# ============================================================================

check_disk_space() {
  log "Checking disk space..."

  local mounts
  mounts=$(df -h --output=target,pcent 2>/dev/null | tail -n +2 | grep -E '^/' || true)

  while IFS= read -r line; do
    local mount_point
    mount_point=$(echo "$line" | awk '{print $1}')
    local usage
    usage=$(echo "$line" | awk '{gsub(/%/,""); print $2}')

    if [[ -n "$usage" ]] && [[ "$usage" =~ ^[0-9]+$ ]]; then
      if [[ "$usage" -ge "${DISK_WARN_PERCENT}" ]]; then
        record_warn "disk-${mount_point}" "${usage}% used (threshold: ${DISK_WARN_PERCENT}%)"
        handle_failure "disk-space" "Disk ${mount_point} at ${usage}% (threshold: ${DISK_WARN_PERCENT}%)"
      else
        record_pass "disk-${mount_point}"
      fi
    fi
  done <<< "$mounts"
}

# ============================================================================
# CHECK: MEMORY
# ============================================================================

check_memory() {
  log "Checking memory..."

  local usage
  usage=$(memory_usage_percent)
  if [[ -n "$usage" ]] && [[ "$usage" =~ ^[0-9]+$ ]]; then
    if [[ "$usage" -ge "${MEMORY_WARN_PERCENT}" ]]; then
      record_warn "memory" "${usage}% used (threshold: ${MEMORY_WARN_PERCENT}%)"
      handle_failure "memory" "Memory at ${usage}% (threshold: ${MEMORY_WARN_PERCENT}%)"
    else
      record_pass "memory"
    fi
  fi
}

# ============================================================================
# CHECK: SSL CERTIFICATES
# ============================================================================

check_ssl_certs() {
  log "Checking SSL certificates..."

  local domains=(
    "ai-solo-gtm-os.soloframehub.com"
    "mental-health-education.soloframehub.com"
    "blog.soloframehub.com"
    "ai-caa-forum.soloframehub.com"
    "metabase.soloframehub.com"
    "n8n.soloframehub.com"
  )

  for domain in "${domains[@]}"; do
    local days
    days=$(cert_days_remaining "$domain")
    if [[ "$days" -lt 0 ]]; then
      record_warn "ssl-${domain}" "Could not check certificate"
    elif [[ "$days" -le "${CERT_EXPIRY_WARN_DAYS}" ]]; then
      record_warn "ssl-${domain}" "Expires in ${days} days"
      handle_failure "ssl-${domain}" "SSL certificate for ${domain} expires in ${days} days"
    else
      record_pass "ssl-${domain}"
      $VERBOSE && log "  ${domain}: ${days} days remaining"
    fi
  done
}

# ============================================================================
# CHECK: BACKUP FRESHNESS
# ============================================================================

check_backup_freshness() {
  log "Checking backup freshness..."

  if [[ ! -d "${BACKUP_LOCAL_DIR}" ]]; then
    record_warn "backup-freshness" "Backup directory does not exist: ${BACKUP_LOCAL_DIR}"
    return
  fi

  local latest
  latest=$(find "${BACKUP_LOCAL_DIR}" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' 2>/dev/null \
    | sort -rn | head -1 | awk '{print $2}')

  if [[ -z "$latest" ]]; then
    record_fail "backup-freshness" "No backups found in ${BACKUP_LOCAL_DIR}"
    handle_failure "backup-freshness" "No backups found!"
    return
  fi

  local latest_epoch
  latest_epoch=$(stat -c %Y "$latest" 2>/dev/null || stat -f %m "$latest" 2>/dev/null)
  local now_epoch
  now_epoch=$(date +%s)
  local age_hours=$(( (now_epoch - latest_epoch) / 3600 ))

  if [[ "$age_hours" -ge "${BACKUP_STALE_HOURS}" ]]; then
    record_warn "backup-freshness" "Latest backup is ${age_hours} hours old (threshold: ${BACKUP_STALE_HOURS}h)"
    handle_failure "backup-freshness" "Latest backup is ${age_hours} hours old"
  else
    record_pass "backup-freshness"
    $VERBOSE && log "  Latest backup: $(basename "$latest") (${age_hours}h ago)"
  fi
}

# ============================================================================
# ALERT STATE MANAGEMENT (debounce + cooldown)
# ============================================================================

handle_failure() {
  local service="$1"
  local detail="$2"

  inc_fail_count "$service"
  local fail_count
  fail_count=$(get_fail_count "$service")
  local prev_state
  prev_state=$(get_health_state "$service")

  # Debounce: only alert after N consecutive failures
  if [[ "$fail_count" -ge "${HEALTH_DEBOUNCE_COUNT}" ]]; then
    if [[ "$prev_state" != "unhealthy" ]]; then
      # State change: healthy → unhealthy
      set_health_state "$service" "unhealthy"
      if can_send_alert "$service"; then
        send_alert "Service DOWN: ${service}" \
          "Service: ${service}\nStatus: UNHEALTHY\nDetail: ${detail}\nTime: $(date)\nHost: $(hostname)\n\nConsecutive failures: ${fail_count}" \
          "urgent"
        record_alert_sent "$service"
      fi
    fi
  fi
}

handle_recovery() {
  local service="$1"
  local detail="$2"

  local prev_state
  prev_state=$(get_health_state "$service")

  if [[ "$prev_state" == "unhealthy" ]]; then
    # State change: unhealthy → healthy
    set_health_state "$service" "healthy"
    send_alert "Service RECOVERED: ${service}" \
      "Service: ${service}\nStatus: HEALTHY\nDetail: ${detail}\nTime: $(date)\nHost: $(hostname)" \
      "normal"
  fi

  reset_fail_count "$service"
  set_health_state "$service" "healthy"
}

# ============================================================================
# MAIN
# ============================================================================

main() {
  local start_time
  start_time=$(date +%s)

  log "=== Health check started ==="

  check_http_endpoints
  check_docker_containers
  check_postgres
  check_redis
  check_disk_space
  check_memory
  check_ssl_certs
  check_backup_freshness

  local end_time
  end_time=$(date +%s)
  local duration=$((end_time - start_time))

  log "=== Health check completed in $(format_duration $duration) ==="
  log "Results: ${PASSED_CHECKS} passed, ${FAILED_CHECKS} failed, ${WARNINGS} warnings (${TOTAL_CHECKS} total)"

  if [[ ${#FAILURES[@]} -gt 0 ]]; then
    log "Failures:"
    for f in "${FAILURES[@]}"; do
      log "  - $f"
    done
  fi

  if [[ ${#WARN_MSGS[@]} -gt 0 ]]; then
    log "Warnings:"
    for w in "${WARN_MSGS[@]}"; do
      log "  - $w"
    done
  fi

  # Exit with failure count for cron monitoring
  if [[ $FAILED_CHECKS -gt 0 ]]; then
    exit 1
  fi
  exit 0
}

main "$@"
