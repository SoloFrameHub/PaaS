#!/usr/bin/env bash
# restore.sh — Interactive restore from local or offsite backups
#
# Usage:
#   ./restore.sh list                                  # List available backups
#   ./restore.sh list --remote                         # List offsite backups
#   ./restore.sh verify <timestamp>                    # Verify backup integrity
#   ./restore.sh restore <timestamp>                   # Interactive: choose services
#   ./restore.sh restore <timestamp> --service caa-postgres  # Restore specific service
#
# SAFETY: All restores require explicit "yes" confirmation.
# NEVER run this from cron — manual use only.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "${SCRIPT_DIR}/ops.conf"
source "${SCRIPT_DIR}/lib.sh"

require_root
ensure_dirs

# ============================================================================
# ARGUMENT PARSING
# ============================================================================

COMMAND="${1:-help}"
shift || true

TIMESTAMP=""
SERVICE_FILTER=""
REMOTE_ONLY=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --remote) REMOTE_ONLY=true; shift ;;
    --service) SERVICE_FILTER="$2"; shift 2 ;;
    --*) die "Unknown option: $1" ;;
    *) TIMESTAMP="$1"; shift ;;
  esac
done

# ============================================================================
# HELPERS
# ============================================================================

confirm() {
  local message="$1"
  echo ""
  echo "WARNING: $message"
  echo ""
  read -rp "Type 'yes' to confirm: " answer
  [[ "$answer" == "yes" ]]
}

list_local_backups() {
  if [[ ! -d "${BACKUP_LOCAL_DIR}" ]]; then
    echo "No local backups found (${BACKUP_LOCAL_DIR} does not exist)"
    return
  fi

  echo "Local backups in ${BACKUP_LOCAL_DIR}:"
  echo "---"

  local found=false
  for dir in "${BACKUP_LOCAL_DIR}"/*/; do
    [[ -d "$dir" ]] || continue
    found=true
    local ts
    ts=$(basename "$dir")
    local manifest="${dir}manifest.json"
    local file_count
    file_count=$(find "$dir" -type f -not -name "manifest.json" | wc -l)

    echo -n "  ${ts}  (${file_count} files"

    if [[ -f "$manifest" ]]; then
      # Extract failed count from manifest
      local failed_count
      failed_count=$(grep -c '"FAIL"' "$manifest" 2>/dev/null || echo "0")
      if [[ "$failed_count" -gt 0 ]]; then
        echo -n ", ${failed_count} failures"
      fi
    fi

    # Total size
    local total_size
    total_size=$(du -sh "$dir" 2>/dev/null | awk '{print $1}')
    echo "  ${total_size})"
  done

  if ! $found; then
    echo "  (none)"
  fi
}

list_remote_backups() {
  if ! s3_available; then
    echo "S3 offsite not configured"
    return
  fi

  echo ""
  echo "Remote backups in s3://${S3_BUCKET}/backups/:"
  echo "---"
  s3_list "backups/" 2>/dev/null | awk '{print "  " $NF}' || echo "  (none or error)"
}

# ============================================================================
# COMMAND: LIST
# ============================================================================

cmd_list() {
  if ! $REMOTE_ONLY; then
    list_local_backups
  fi
  list_remote_backups
}

# ============================================================================
# COMMAND: VERIFY
# ============================================================================

cmd_verify() {
  [[ -n "$TIMESTAMP" ]] || die "Usage: restore.sh verify <timestamp>"

  local backup_dir="${BACKUP_LOCAL_DIR}/${TIMESTAMP}"
  local manifest="${backup_dir}/manifest.json"

  if [[ ! -d "$backup_dir" ]]; then
    # Try downloading from offsite
    if s3_available; then
      log "Backup not found locally. Checking offsite..."
      local remote_manifest
      remote_manifest=$(s3_list "backups/${TIMESTAMP}/manifest.json" 2>/dev/null || true)
      if [[ -n "$remote_manifest" ]]; then
        echo "Backup exists in offsite storage. Download it first with:"
        echo "  mkdir -p ${backup_dir}"
        echo "  aws s3 sync s3://${S3_BUCKET}/backups/${TIMESTAMP}/ ${backup_dir}/"
        return 0
      fi
    fi
    die "Backup not found: ${TIMESTAMP}"
  fi

  if [[ ! -f "$manifest" ]]; then
    die "No manifest.json in backup — cannot verify integrity"
  fi

  echo "Verifying backup: ${TIMESTAMP}"
  echo "---"

  local all_ok=true

  # Parse manifest and check checksums
  # Simple JSON parsing with grep/awk (no jq dependency)
  while IFS= read -r line; do
    local file sha256
    file=$(echo "$line" | grep -oP '"file":\s*"\K[^"]+' || true)
    sha256=$(echo "$line" | grep -oP '"sha256":\s*"\K[^"]+' || true)
    local svc
    svc=$(echo "$line" | grep -oP '"service":\s*"\K[^"]+' || true)

    [[ -n "$file" ]] || continue
    [[ "$file" != "skipped" ]] || continue

    local full_path="${backup_dir}/${file}"
    if [[ ! -f "$full_path" ]]; then
      echo "  MISSING  ${svc}: ${file}"
      all_ok=false
      continue
    fi

    if [[ -n "$sha256" ]]; then
      local actual
      actual=$(file_checksum "$full_path")
      if [[ "$actual" == "$sha256" ]]; then
        echo "  OK       ${svc}: ${file} ($(file_size "$full_path"))"
      else
        echo "  CORRUPT  ${svc}: ${file} (checksum mismatch)"
        all_ok=false
      fi
    else
      echo "  NOCHECK  ${svc}: ${file} (no checksum in manifest)"
    fi
  done < "$manifest"

  echo "---"
  if $all_ok; then
    echo "All files verified successfully."
  else
    echo "Some files are MISSING or CORRUPT."
    return 1
  fi
}

# ============================================================================
# COMMAND: RESTORE
# ============================================================================

cmd_restore() {
  [[ -n "$TIMESTAMP" ]] || die "Usage: restore.sh restore <timestamp> [--service <name>]"

  local backup_dir="${BACKUP_LOCAL_DIR}/${TIMESTAMP}"

  if [[ ! -d "$backup_dir" ]]; then
    if s3_available; then
      log "Backup not found locally. Downloading from offsite..."
      mkdir -p "$backup_dir"
      s3_download "backups/${TIMESTAMP}/" "$backup_dir" || die "Failed to download backup"
    else
      die "Backup not found: ${TIMESTAMP}"
    fi
  fi

  log "Restore from backup: ${TIMESTAMP}"
  echo ""

  # List available service backups
  echo "Available service backups:"
  local services=()
  for file in "${backup_dir}"/*; do
    local fname
    fname=$(basename "$file")
    [[ "$fname" != "manifest.json" ]] || continue
    [[ -f "$file" ]] || continue

    # Extract service name from filename: <service>-<timestamp>.<ext>
    local svc
    svc=$(echo "$fname" | sed "s/-${TIMESTAMP}.*//" )
    services+=("$svc")
    echo "  - ${svc} ($(file_size "$file"))"
  done

  if [[ -n "$SERVICE_FILTER" ]]; then
    # Restore single service
    restore_service "$backup_dir" "$SERVICE_FILTER"
  else
    echo ""
    echo "Which service(s) to restore? (Enter service name, 'all', or 'quit')"
    while true; do
      read -rp "> " choice
      case "$choice" in
        quit|q|exit) echo "Cancelled."; exit 0 ;;
        all)
          for svc in "${services[@]}"; do
            restore_service "$backup_dir" "$svc" || true
          done
          break
          ;;
        *)
          if printf '%s\n' "${services[@]}" | grep -qx "$choice"; then
            restore_service "$backup_dir" "$choice" || true
          else
            echo "Unknown service: ${choice}. Available: ${services[*]}"
          fi
          ;;
      esac
    done
  fi

  log "Restore operations complete."
}

restore_service() {
  local backup_dir="$1"
  local service="$2"

  # Find the backup file
  local backup_file
  backup_file=$(find "$backup_dir" -name "${service}-*" -type f | head -1)

  if [[ -z "$backup_file" ]]; then
    error "No backup file found for service: ${service}"
    return 1
  fi

  echo ""
  echo "=== Restoring: ${service} ==="
  echo "  Source: $(basename "$backup_file") ($(file_size "$backup_file"))"

  case "$service" in
    caa-postgres)
      restore_postgres "$backup_file" "$CAA_PG_CONTAINER" \
        "${CAA_PG_USER:-$DEFAULT_PG_USER}" "${CAA_PG_DB:-$DEFAULT_PG_DB}" "CAA"
      ;;
    mhe-postgres)
      restore_postgres "$backup_file" "$MHE_PG_CONTAINER" \
        "${MHE_PG_USER:-$DEFAULT_PG_USER}" "${MHE_PG_DB:-$DEFAULT_PG_DB}" "MHE"
      ;;
    caa-redis)
      restore_redis "$backup_file" "$CAA_REDIS_CONTAINER"
      ;;
    listmonk-pg)
      restore_postgres "$backup_file" "listmonk" "listmonk" "listmonk" "Listmonk"
      ;;
    *)
      # Generic volume restore
      restore_volume "$backup_file" "$service"
      ;;
  esac
}

restore_postgres() {
  local dump_file="$1"
  local container_pattern="$2"
  local pg_user="$3"
  local pg_db="$4"
  local display_name="$5"

  local container
  container=$(find_container "$container_pattern")
  if [[ -z "$container" ]]; then
    error "${display_name} PostgreSQL container not found"
    return 1
  fi

  echo "  Target: ${container} (database: ${pg_db})"

  # Show current table count
  local table_count
  table_count=$(docker exec "$container" psql -U "$pg_user" -d "$pg_db" -t -A \
    -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public'" 2>/dev/null || echo "?")
  echo "  Current tables: ${table_count}"

  confirm "This will DROP and RECREATE the '${pg_db}' database on ${display_name}. ALL EXISTING DATA WILL BE LOST." || {
    echo "Skipped."
    return 0
  }

  log "Restoring ${display_name} PostgreSQL from $(basename "$dump_file")..."

  # Decompress if gzipped and pipe to psql
  if [[ "$dump_file" == *.gz ]]; then
    # Drop and recreate database
    docker exec "$container" psql -U "$pg_user" -d postgres \
      -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='${pg_db}' AND pid <> pg_backend_pid();" 2>/dev/null || true
    docker exec "$container" psql -U "$pg_user" -d postgres \
      -c "DROP DATABASE IF EXISTS \"${pg_db}\";" 2>/dev/null || true
    docker exec "$container" psql -U "$pg_user" -d postgres \
      -c "CREATE DATABASE \"${pg_db}\";" 2>/dev/null || {
        error "Failed to recreate database"
        return 1
      }

    # Restore
    gunzip -c "$dump_file" | docker exec -i "$container" psql -U "$pg_user" -d "$pg_db" --quiet 2>/dev/null || {
      error "pg restore failed"
      return 1
    }
  else
    error "Unsupported dump format: $dump_file"
    return 1
  fi

  # Post-restore verification
  local new_table_count
  new_table_count=$(docker exec "$container" psql -U "$pg_user" -d "$pg_db" -t -A \
    -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public'" 2>/dev/null || echo "?")
  log "  Restored ${display_name} PostgreSQL: ${new_table_count} tables"
  echo "  Post-restore tables: ${new_table_count}"
}

restore_redis() {
  local rdb_file="$1"
  local container_pattern="$2"

  local container
  container=$(find_container "$container_pattern")
  if [[ -z "$container" ]]; then
    error "Redis container not found"
    return 1
  fi

  echo "  Target: ${container}"

  confirm "This will replace the Redis data. Current cached data will be lost." || {
    echo "Skipped."
    return 0
  }

  log "Restoring Redis from $(basename "$rdb_file")..."

  # Stop Redis, replace RDB, start Redis
  docker exec "$container" redis-cli SHUTDOWN NOSAVE 2>/dev/null || true
  sleep 2

  docker cp "$rdb_file" "${container}:/data/dump.rdb" 2>/dev/null || {
    docker cp "$rdb_file" "${container}:/var/lib/redis/dump.rdb" 2>/dev/null || {
      error "Could not copy RDB file to container"
      return 1
    }
  }

  # Container should auto-restart via Docker restart policy
  sleep 5

  # Verify
  local ping
  ping=$(docker exec "$container" redis-cli PING 2>/dev/null || echo "FAIL")
  if [[ "$ping" == *"PONG"* ]]; then
    log "  Redis restored and responding"
  else
    warn "  Redis may not have restarted properly — check manually"
  fi
}

restore_volume() {
  local tar_file="$1"
  local service="$2"

  echo "  This is a volume-based backup."
  echo "  Manual restore steps:"
  echo ""
  echo "    1. Find the container: docker ps | grep ${service}"
  echo "    2. Stop it: docker stop <container>"
  echo "    3. Extract: tar -xzf ${tar_file} -C /path/to/volume/"
  echo "    4. Restart: docker start <container>"
  echo ""
  echo "  Tar contents:"
  tar -tzf "$tar_file" 2>/dev/null | head -20
  echo "  ..."
  echo ""
  echo "  Auto-restore for volume services is intentionally manual"
  echo "  to prevent data loss from incorrect volume paths."
}

# ============================================================================
# COMMAND: HELP
# ============================================================================

cmd_help() {
  cat <<'EOF'
SoloFrameHub Restore Tool

Commands:
  list                                  List available backups (local + offsite)
  list --remote                         List offsite backups only
  verify <timestamp>                    Verify backup integrity (checksums)
  restore <timestamp>                   Interactive: choose services to restore
  restore <timestamp> --service <name>  Restore specific service

Services:
  caa-postgres    CAA PostgreSQL database
  mhe-postgres    MHE PostgreSQL database
  caa-redis       CAA Redis cache
  listmonk-pg     Listmonk PostgreSQL
  ghost           Ghost blog data
  nodebb          NodeBB forum data
  n8n             n8n workflow data
  metabase        Metabase analytics data
  typebot         Typebot data
  heyform         Heyform data
  minio           MinIO/S3 storage data
  dokploy-config  Dokploy platform configuration

Examples:
  ./restore.sh list
  ./restore.sh verify 2026-02-10_02-00-00
  ./restore.sh restore 2026-02-10_02-00-00
  ./restore.sh restore 2026-02-10_02-00-00 --service caa-postgres
EOF
}

# ============================================================================
# MAIN
# ============================================================================

case "$COMMAND" in
  list) cmd_list ;;
  verify) cmd_verify ;;
  restore) cmd_restore ;;
  help|--help|-h) cmd_help ;;
  *) cmd_help; exit 1 ;;
esac
