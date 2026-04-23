#!/usr/bin/env bash
# maintenance.sh — Routine maintenance for all SoloFrameHub services
#
# Usage:
#   ./maintenance.sh            # Run all maintenance tasks
#   ./maintenance.sh --task vacuum   # Run specific task
#   ./maintenance.sh --dry-run       # Show what would be done
#
# Cron: 0 3 * * 0 /root/ops/maintenance.sh >> /var/log/ops/maintenance.log 2>&1

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "${SCRIPT_DIR}/ops.conf"
source "${SCRIPT_DIR}/lib.sh"

require_root
ensure_dirs

SINGLE_TASK=""
DRY_RUN=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --task) SINGLE_TASK="$2"; shift 2 ;;
    --dry-run) DRY_RUN=true; shift ;;
    *) die "Unknown argument: $1" ;;
  esac
done

should_run() {
  [[ -z "$SINGLE_TASK" ]] || [[ "$SINGLE_TASK" == "$1" ]]
}

declare -a REPORT=()
report() {
  REPORT+=("$1")
  log "$1"
}

# ============================================================================
# TASK: PostgreSQL VACUUM ANALYZE
# ============================================================================

task_vacuum() {
  should_run "vacuum" || return 0
  report "--- PostgreSQL Maintenance ---"

  # CAA PostgreSQL
  local container
  container=$(find_container "$CAA_PG_CONTAINER")
  if [[ -n "$container" ]]; then
    local pg_user="${CAA_PG_USER:-$DEFAULT_PG_USER}"
    local pg_db="${CAA_PG_DB:-$DEFAULT_PG_DB}"

    if $DRY_RUN; then
      report "  [DRY RUN] Would VACUUM ANALYZE CAA database"
    else
      report "  Running VACUUM ANALYZE on CAA..."
      local result
      result=$(docker exec "$container" psql -U "$pg_user" -d "$pg_db" \
        -c "VACUUM (VERBOSE, ANALYZE);" 2>&1 | tail -5) || result="FAILED"
      report "  CAA VACUUM complete"

      # Check for bloated tables
      local bloat
      bloat=$(docker exec "$container" psql -U "$pg_user" -d "$pg_db" -t -A -c "
        SELECT relname, n_dead_tup, n_live_tup,
               CASE WHEN n_live_tup > 0 THEN round(100.0 * n_dead_tup / n_live_tup) ELSE 0 END as dead_pct
        FROM pg_stat_user_tables
        WHERE n_dead_tup > 100
        ORDER BY n_dead_tup DESC
        LIMIT 5;" 2>/dev/null) || bloat=""

      if [[ -n "$bloat" ]]; then
        report "  CAA table bloat (top 5):"
        while IFS='|' read -r table dead live pct; do
          report "    ${table}: ${dead} dead / ${live} live (${pct}%)"
        done <<< "$bloat"
      else
        report "  CAA: No significant table bloat"
      fi
    fi
  else
    report "  CAA PostgreSQL container not found — skipping"
  fi

  # MHE PostgreSQL
  container=$(find_container "$MHE_PG_CONTAINER")
  if [[ -n "$container" ]]; then
    local pg_user="${MHE_PG_USER:-$DEFAULT_PG_USER}"
    local pg_db="${MHE_PG_DB:-$DEFAULT_PG_DB}"

    if $DRY_RUN; then
      report "  [DRY RUN] Would VACUUM ANALYZE MHE database"
    else
      report "  Running VACUUM ANALYZE on MHE..."
      docker exec "$container" psql -U "$pg_user" -d "$pg_db" \
        -c "VACUUM (VERBOSE, ANALYZE);" >/dev/null 2>&1 || true
      report "  MHE VACUUM complete"
    fi
  else
    report "  MHE PostgreSQL container not found — skipping"
  fi
}

# ============================================================================
# TASK: Redis Memory Optimization
# ============================================================================

task_redis() {
  should_run "redis" || return 0
  report "--- Redis Maintenance ---"

  local container
  container=$(find_container "$CAA_REDIS_CONTAINER")
  if [[ -z "$container" ]]; then
    report "  Redis container not found — skipping"
    return 0
  fi

  if $DRY_RUN; then
    report "  [DRY RUN] Would check Redis memory and purge"
    return 0
  fi

  # Memory usage
  local mem_info
  mem_info=$(docker exec "$container" redis-cli INFO memory 2>/dev/null | grep -E "used_memory_human|maxmemory_human|mem_fragmentation_ratio" || true)

  local used
  used=$(echo "$mem_info" | grep "used_memory_human" | head -1 | cut -d: -f2 | tr -d '[:space:]')
  local frag
  frag=$(echo "$mem_info" | grep "mem_fragmentation_ratio" | cut -d: -f2 | tr -d '[:space:]')

  report "  Memory used: ${used:-unknown}"
  report "  Fragmentation ratio: ${frag:-unknown}"

  # Try memory purge (Redis 4.0+)
  docker exec "$container" redis-cli MEMORY PURGE >/dev/null 2>&1 && \
    report "  MEMORY PURGE executed" || \
    report "  MEMORY PURGE not supported"

  # Key count
  local dbsize
  dbsize=$(docker exec "$container" redis-cli DBSIZE 2>/dev/null | awk '{print $NF}')
  report "  Total keys: ${dbsize:-unknown}"
}

# ============================================================================
# TASK: Stale Session Cleanup
# ============================================================================

task_sessions() {
  should_run "sessions" || return 0
  report "--- Session Cleanup ---"

  # CAA sessions
  local container
  container=$(find_container "$CAA_PG_CONTAINER")
  if [[ -n "$container" ]]; then
    local pg_user="${CAA_PG_USER:-$DEFAULT_PG_USER}"
    local pg_db="${CAA_PG_DB:-$DEFAULT_PG_DB}"

    if $DRY_RUN; then
      report "  [DRY RUN] Would clean stale sessions from CAA"
    else
      local before_count
      before_count=$(docker exec "$container" psql -U "$pg_user" -d "$pg_db" -t -A \
        -c "SELECT COUNT(*) FROM session;" 2>/dev/null) || before_count="?"

      local deleted
      deleted=$(docker exec "$container" psql -U "$pg_user" -d "$pg_db" -t -A \
        -c "DELETE FROM session WHERE expires_at < NOW(); SELECT COUNT(*) FROM session;" 2>/dev/null | tail -1) || deleted="?"

      report "  CAA sessions: ${before_count} → ${deleted} (after cleanup)"
    fi
  fi

  # MHE sessions
  container=$(find_container "$MHE_PG_CONTAINER")
  if [[ -n "$container" ]]; then
    local pg_user="${MHE_PG_USER:-$DEFAULT_PG_USER}"
    local pg_db="${MHE_PG_DB:-$DEFAULT_PG_DB}"

    if $DRY_RUN; then
      report "  [DRY RUN] Would clean stale sessions from MHE"
    else
      docker exec "$container" psql -U "$pg_user" -d "$pg_db" \
        -c "DELETE FROM session WHERE expires_at < NOW();" >/dev/null 2>&1 || true
      report "  MHE stale sessions cleaned"
    fi
  fi
}

# ============================================================================
# TASK: Docker Cleanup
# ============================================================================

task_docker() {
  should_run "docker" || return 0
  report "--- Docker Cleanup ---"

  if $DRY_RUN; then
    report "  [DRY RUN] Would prune dangling images and volumes"
    docker system df 2>/dev/null | while IFS= read -r line; do
      report "  $line"
    done
    return 0
  fi

  # Prune dangling images
  local image_output
  image_output=$(docker image prune -f 2>&1)
  local reclaimed
  reclaimed=$(echo "$image_output" | grep "reclaimed" | tail -1)
  report "  Images: ${reclaimed:-no space reclaimed}"

  # Prune dangling volumes (NOT all unused — only unreferenced)
  local vol_output
  vol_output=$(docker volume prune -f 2>&1)
  reclaimed=$(echo "$vol_output" | grep "reclaimed" | tail -1)
  report "  Volumes: ${reclaimed:-no space reclaimed}"

  # Builder cache
  docker builder prune -f --keep-storage 2G >/dev/null 2>&1 || true
  report "  Builder cache pruned (kept 2GB)"

  # System disk usage
  report "  Docker disk usage:"
  docker system df 2>/dev/null | while IFS= read -r line; do
    report "    $line"
  done
}

# ============================================================================
# TASK: Log Rotation
# ============================================================================

task_logs() {
  should_run "logs" || return 0
  report "--- Log Rotation ---"

  if $DRY_RUN; then
    report "  [DRY RUN] Would rotate ops logs"
    return 0
  fi

  local log_dir="${OPS_LOG_DIR}"
  if [[ ! -d "$log_dir" ]]; then
    report "  Log directory does not exist — skipping"
    return 0
  fi

  local rotated=0
  for logfile in "${log_dir}"/*.log; do
    [[ -f "$logfile" ]] || continue
    local size_kb
    size_kb=$(du -k "$logfile" | awk '{print $1}')

    # Rotate if > 10MB
    if [[ "$size_kb" -gt 10240 ]]; then
      mv "$logfile" "${logfile}.$(date '+%Y%m%d')"
      touch "$logfile"
      rotated=$((rotated + 1))
    fi
  done

  # Remove rotated logs older than 4 weeks
  find "${log_dir}" -name "*.log.*" -mtime +28 -delete 2>/dev/null || true

  report "  Rotated ${rotated} log files, cleaned old archives"
}

# ============================================================================
# TASK: Disk Usage Report
# ============================================================================

task_disk() {
  should_run "disk" || return 0
  report "--- Disk Usage Report ---"

  # Filesystem usage
  report "  Filesystem:"
  df -h 2>/dev/null | grep -E "^/|Filesystem" | while IFS= read -r line; do
    report "    $line"
  done

  # Backup directory size
  if [[ -d "${BACKUP_LOCAL_DIR}" ]]; then
    local backup_size
    backup_size=$(du -sh "${BACKUP_LOCAL_DIR}" 2>/dev/null | awk '{print $1}')
    report "  Backup directory: ${backup_size}"
  fi

  # Docker volumes
  report "  Largest Docker volumes:"
  docker system df -v 2>/dev/null | grep -A 100 "VOLUME NAME" | tail -n +2 | head -10 | while IFS= read -r line; do
    report "    $line"
  done
}

# ============================================================================
# TASK: Temp File Cleanup
# ============================================================================

task_temp() {
  should_run "temp" || return 0
  report "--- Temp Cleanup ---"

  if $DRY_RUN; then
    report "  [DRY RUN] Would clean /tmp files older than 7 days"
    return 0
  fi

  local count
  count=$(find /tmp -type f -mtime +7 -not -path "/tmp/ops*" 2>/dev/null | wc -l)
  find /tmp -type f -mtime +7 -not -path "/tmp/ops*" -delete 2>/dev/null || true
  report "  Cleaned ${count} temp files older than 7 days"
}

# ============================================================================
# MAIN
# ============================================================================

main() {
  local start_time
  start_time=$(date +%s)

  log "=========================================="
  log "Maintenance started: $(date)"
  log "=========================================="

  task_vacuum
  task_redis
  task_sessions
  task_docker
  task_logs
  task_disk
  task_temp

  local end_time
  end_time=$(date +%s)
  local duration=$((end_time - start_time))

  log "=========================================="
  log "Maintenance completed in $(format_duration $duration)"
  log "=========================================="

  # Build and send email report
  local body=""
  for line in "${REPORT[@]}"; do
    body+="${line}\n"
  done
  body+="\nCompleted in $(format_duration $duration)"

  send_alert "Weekly Maintenance Report" "$body" "normal"
}

main "$@"
