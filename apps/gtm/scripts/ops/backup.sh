#!/usr/bin/env bash
# backup.sh — Automated backup for all SoloFrameHub services
#
# Usage:
#   ./backup.sh                  # Full backup of all services
#   ./backup.sh --service caa-pg # Backup specific service only
#   ./backup.sh --no-offsite     # Skip S3/R2 upload
#   ./backup.sh --dry-run        # Show what would be backed up
#
# Cron: 0 2 * * * /root/ops/backup.sh >> /var/log/ops/backup.log 2>&1

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "${SCRIPT_DIR}/ops.conf"
source "${SCRIPT_DIR}/lib.sh"

require_root
ensure_dirs

# ============================================================================
# ARGUMENTS
# ============================================================================

SINGLE_SERVICE=""
SKIP_OFFSITE=false
DRY_RUN=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --service) SINGLE_SERVICE="$2"; shift 2 ;;
    --no-offsite) SKIP_OFFSITE=true; shift ;;
    --dry-run) DRY_RUN=true; shift ;;
    *) die "Unknown argument: $1" ;;
  esac
done

# ============================================================================
# SETUP
# ============================================================================

TIMESTAMP=$(backup_timestamp)
BACKUP_DIR="${BACKUP_LOCAL_DIR}/${TIMESTAMP}"
MANIFEST_FILE="${BACKUP_DIR}/manifest.json"

declare -a BACKED_UP=()
declare -a FAILED=()
TOTAL_SIZE=0

should_backup() {
  local service="$1"
  [[ -z "$SINGLE_SERVICE" ]] || [[ "$SINGLE_SERVICE" == "$service" ]]
}

do_backup() {
  if $DRY_RUN; then
    log "[DRY RUN] Would backup: $1"
    return 0
  fi
  return 0
}

mkdir -p "$BACKUP_DIR"
log "=========================================="
log "Backup started: ${TIMESTAMP}"
log "Target: ${BACKUP_DIR}"
log "=========================================="

# ============================================================================
# BACKUP: CAA PostgreSQL
# ============================================================================

backup_caa_postgres() {
  local service="caa-postgres"
  should_backup "$service" || return 0
  log "Backing up CAA PostgreSQL..."

  local container
  container=$(find_container "$CAA_PG_CONTAINER")
  if [[ -z "$container" ]]; then
    error "CAA PostgreSQL container not found"
    FAILED+=("$service")
    return 1
  fi

  local outfile="${BACKUP_DIR}/${service}-${TIMESTAMP}.sql.gz"
  local pg_user="${CAA_PG_USER:-$DEFAULT_PG_USER}"
  local pg_db="${CAA_PG_DB:-$DEFAULT_PG_DB}"

  if $DRY_RUN; then
    log "[DRY RUN] pg_dump ${pg_db} from ${container}"
    return 0
  fi

  docker exec "$container" pg_dump -U "$pg_user" -d "$pg_db" --no-owner --no-acl 2>/dev/null \
    | gzip > "$outfile" || {
      error "pg_dump failed for CAA PostgreSQL"
      FAILED+=("$service")
      return 1
    }

  local size
  size=$(file_size "$outfile")
  log "  CAA PostgreSQL: ${size} → $(basename "$outfile")"
  BACKED_UP+=("${service}|${outfile}|${size}")
}

# ============================================================================
# BACKUP: MHE PostgreSQL
# ============================================================================

backup_mhe_postgres() {
  local service="mhe-postgres"
  should_backup "$service" || return 0
  log "Backing up MHE PostgreSQL..."

  local container
  container=$(find_container "$MHE_PG_CONTAINER")
  if [[ -z "$container" ]]; then
    error "MHE PostgreSQL container not found"
    FAILED+=("$service")
    return 1
  fi

  local outfile="${BACKUP_DIR}/${service}-${TIMESTAMP}.sql.gz"
  local pg_user="${MHE_PG_USER:-$DEFAULT_PG_USER}"
  local pg_db="${MHE_PG_DB:-$DEFAULT_PG_DB}"

  if $DRY_RUN; then
    log "[DRY RUN] pg_dump ${pg_db} from ${container}"
    return 0
  fi

  docker exec "$container" pg_dump -U "$pg_user" -d "$pg_db" --no-owner --no-acl 2>/dev/null \
    | gzip > "$outfile" || {
      error "pg_dump failed for MHE PostgreSQL"
      FAILED+=("$service")
      return 1
    }

  local size
  size=$(file_size "$outfile")
  log "  MHE PostgreSQL: ${size} → $(basename "$outfile")"
  BACKED_UP+=("${service}|${outfile}|${size}")
}

# ============================================================================
# BACKUP: CAA Redis
# ============================================================================

backup_caa_redis() {
  local service="caa-redis"
  should_backup "$service" || return 0
  log "Backing up CAA Redis..."

  local container
  container=$(find_container "$CAA_REDIS_CONTAINER")
  if [[ -z "$container" ]]; then
    error "CAA Redis container not found"
    FAILED+=("$service")
    return 1
  fi

  if $DRY_RUN; then
    log "[DRY RUN] redis BGSAVE from ${container}"
    return 0
  fi

  # Trigger save and wait
  docker exec "$container" redis-cli BGSAVE >/dev/null 2>&1 || true
  sleep 3

  # Copy RDB file from container
  local outfile="${BACKUP_DIR}/${service}-${TIMESTAMP}.rdb"
  docker cp "${container}:/data/dump.rdb" "$outfile" 2>/dev/null || {
    # Try alternate location
    docker cp "${container}:/var/lib/redis/dump.rdb" "$outfile" 2>/dev/null || {
      warn "Could not copy Redis RDB file — Redis may be ephemeral"
      BACKED_UP+=("${service}|skipped|0B")
      return 0
    }
  }

  local size
  size=$(file_size "$outfile")
  log "  CAA Redis: ${size} → $(basename "$outfile")"
  BACKED_UP+=("${service}|${outfile}|${size}")
}

# ============================================================================
# BACKUP: MinIO (S3 storage data)
# ============================================================================

backup_minio() {
  local service="minio"
  should_backup "$service" || return 0
  log "Backing up MinIO data..."

  local container
  container=$(find_container "${CAA_MINIO_COMPOSE}" | grep -i minio | head -1)
  if [[ -z "$container" ]]; then
    # Try broader search
    container=$(docker ps --format '{{.Names}}' | grep -i "minio" | head -1)
  fi

  if [[ -z "$container" ]]; then
    warn "MinIO container not found — skipping"
    FAILED+=("$service")
    return 1
  fi

  if $DRY_RUN; then
    log "[DRY RUN] tar MinIO data from ${container}"
    return 0
  fi

  local outfile="${BACKUP_DIR}/${service}-${TIMESTAMP}.tar.gz"

  # Get MinIO data volume path
  local vol_path
  vol_path=$(docker inspect "$container" --format '{{range .Mounts}}{{if eq .Destination "/data"}}{{.Source}}{{end}}{{end}}' 2>/dev/null)

  if [[ -n "$vol_path" ]] && [[ -d "$vol_path" ]]; then
    tar -czf "$outfile" -C "$(dirname "$vol_path")" "$(basename "$vol_path")" 2>/dev/null || {
      error "Failed to tar MinIO data"
      FAILED+=("$service")
      return 1
    }
  else
    # Fallback: copy from container
    docker cp "${container}:/data" "${BACKUP_DIR}/minio-tmp" 2>/dev/null || {
      warn "Could not access MinIO data"
      FAILED+=("$service")
      return 1
    }
    tar -czf "$outfile" -C "${BACKUP_DIR}" "minio-tmp" 2>/dev/null
    rm -rf "${BACKUP_DIR}/minio-tmp"
  fi

  local size
  size=$(file_size "$outfile")
  log "  MinIO: ${size} → $(basename "$outfile")"
  BACKED_UP+=("${service}|${outfile}|${size}")
}

# ============================================================================
# BACKUP: Generic Docker volume backup (for compose services)
# ============================================================================

backup_compose_volume() {
  local service="$1"
  local search_pattern="$2"
  local data_path="${3:-/data}"

  should_backup "$service" || return 0
  log "Backing up ${service}..."

  # Find containers matching the compose pattern
  local container
  container=$(docker ps --format '{{.Names}}' | grep -i "${search_pattern}" | head -1)

  if [[ -z "$container" ]]; then
    warn "${service} container not found — skipping"
    FAILED+=("$service")
    return 1
  fi

  if $DRY_RUN; then
    log "[DRY RUN] volume backup from ${container}:${data_path}"
    return 0
  fi

  local outfile="${BACKUP_DIR}/${service}-${TIMESTAMP}.tar.gz"

  # Try host volume path first
  local vol_path
  vol_path=$(docker inspect "$container" --format "{{range .Mounts}}{{if eq .Destination \"${data_path}\"}}{{.Source}}{{end}}{{end}}" 2>/dev/null)

  if [[ -n "$vol_path" ]] && [[ -d "$vol_path" ]]; then
    tar -czf "$outfile" -C "$(dirname "$vol_path")" "$(basename "$vol_path")" 2>/dev/null || {
      error "Failed to tar ${service} data"
      FAILED+=("$service")
      return 1
    }
  else
    # Fallback: docker cp
    local tmpdir="${BACKUP_DIR}/${service}-tmp"
    docker cp "${container}:${data_path}" "$tmpdir" 2>/dev/null || {
      warn "Could not access ${service} data at ${data_path}"
      FAILED+=("$service")
      return 1
    }
    tar -czf "$outfile" -C "${BACKUP_DIR}" "$(basename "$tmpdir")" 2>/dev/null
    rm -rf "$tmpdir"
  fi

  local size
  size=$(file_size "$outfile")
  log "  ${service}: ${size} → $(basename "$outfile")"
  BACKED_UP+=("${service}|${outfile}|${size}")
}

# ============================================================================
# BACKUP: Compose PostgreSQL (for services with their own PG)
# ============================================================================

backup_compose_postgres() {
  local service="$1"
  local search_pattern="$2"
  local pg_user="${3:-postgres}"
  local pg_db="${4:-postgres}"

  should_backup "$service" || return 0
  log "Backing up ${service} PostgreSQL..."

  local container
  container=$(docker ps --format '{{.Names}}' | grep -i "${search_pattern}" | grep -i "postgres\|pg\|db" | head -1)

  if [[ -z "$container" ]]; then
    warn "${service} PostgreSQL container not found — skipping"
    FAILED+=("$service")
    return 1
  fi

  if $DRY_RUN; then
    log "[DRY RUN] pg_dump from ${container}"
    return 0
  fi

  local outfile="${BACKUP_DIR}/${service}-${TIMESTAMP}.sql.gz"

  docker exec "$container" pg_dump -U "$pg_user" -d "$pg_db" --no-owner --no-acl 2>/dev/null \
    | gzip > "$outfile" || {
      error "pg_dump failed for ${service}"
      FAILED+=("$service")
      return 1
    }

  # Check if dump is essentially empty (just headers)
  local raw_size
  raw_size=$(stat -c %s "$outfile" 2>/dev/null || stat -f %z "$outfile" 2>/dev/null)
  if [[ "${raw_size:-0}" -lt 100 ]]; then
    warn "${service} dump appears empty (${raw_size} bytes)"
    FAILED+=("$service")
    return 1
  fi

  local size
  size=$(file_size "$outfile")
  log "  ${service}: ${size} → $(basename "$outfile")"
  BACKED_UP+=("${service}|${outfile}|${size}")
}

# ============================================================================
# BACKUP: Dokploy Configuration
# ============================================================================

backup_dokploy_config() {
  local service="dokploy-config"
  should_backup "$service" || return 0
  log "Backing up Dokploy configuration..."

  if $DRY_RUN; then
    log "[DRY RUN] tar Dokploy configs"
    return 0
  fi

  local outfile="${BACKUP_DIR}/${service}-${TIMESTAMP}.tar.gz"
  local tmpdir="${BACKUP_DIR}/dokploy-tmp"
  mkdir -p "$tmpdir"

  # Traefik dynamic configs
  if [[ -d /etc/dokploy/traefik ]]; then
    cp -r /etc/dokploy/traefik "$tmpdir/traefik" 2>/dev/null || true
  fi

  # Dokploy data directory
  if [[ -d /etc/dokploy ]]; then
    # Copy non-binary config files
    find /etc/dokploy -name "*.yml" -o -name "*.yaml" -o -name "*.json" -o -name "*.toml" -o -name "*.conf" \
      | while read -r f; do
          local rel="${f#/etc/dokploy/}"
          mkdir -p "$tmpdir/dokploy/$(dirname "$rel")"
          cp "$f" "$tmpdir/dokploy/$rel" 2>/dev/null || true
        done
  fi

  # Docker compose files from Dokploy
  if [[ -d /etc/dokploy/compose ]]; then
    cp -r /etc/dokploy/compose "$tmpdir/compose" 2>/dev/null || true
  fi

  tar -czf "$outfile" -C "${BACKUP_DIR}" "dokploy-tmp" 2>/dev/null
  rm -rf "$tmpdir"

  local size
  size=$(file_size "$outfile")
  log "  Dokploy config: ${size} → $(basename "$outfile")"
  BACKED_UP+=("${service}|${outfile}|${size}")
}

# ============================================================================
# MANIFEST
# ============================================================================

create_manifest() {
  if $DRY_RUN; then
    log "[DRY RUN] Would create manifest"
    return 0
  fi

  log "Creating backup manifest..."

  {
    echo "{"
    echo "  \"timestamp\": \"${TIMESTAMP}\","
    echo "  \"hostname\": \"$(hostname)\","
    echo "  \"created_at\": \"$(date -Iseconds)\","
    echo "  \"services\": ["

    local first=true
    for entry in "${BACKED_UP[@]}"; do
      IFS='|' read -r svc path size <<< "$entry"
      local checksum=""
      if [[ -f "$path" ]]; then
        checksum=$(file_checksum "$path")
      fi

      if ! $first; then echo ","; fi
      first=false
      printf '    {"service": "%s", "file": "%s", "size": "%s", "sha256": "%s"}' \
        "$svc" "$(basename "${path:-skipped}")" "$size" "$checksum"
    done

    echo ""
    echo "  ],"

    echo "  \"failed\": ["
    local first=true
    for svc in "${FAILED[@]}"; do
      if ! $first; then echo ","; fi
      first=false
      printf '    "%s"' "$svc"
    done
    echo ""
    echo "  ]"

    echo "}"
  } > "$MANIFEST_FILE"

  log "  Manifest: $(basename "$MANIFEST_FILE")"
}

# ============================================================================
# OFFSITE UPLOAD
# ============================================================================

upload_offsite() {
  if $SKIP_OFFSITE || $DRY_RUN; then
    $DRY_RUN && log "[DRY RUN] Would upload to S3"
    return 0
  fi

  if ! s3_available; then
    warn "S3 offsite not configured — skipping upload"
    return 0
  fi

  log "Uploading to offsite storage..."
  s3_upload_dir "$BACKUP_DIR" "backups/${TIMESTAMP}/" || {
    warn "Offsite upload failed"
    FAILED+=("offsite-upload")
    return 1
  }
}

# ============================================================================
# CLEANUP
# ============================================================================

cleanup_old_backups() {
  if $DRY_RUN; then
    log "[DRY RUN] Would clean up old backups"
    return 0
  fi

  log "Cleaning up old backups..."
  cleanup_old "$BACKUP_LOCAL_DIR" "$LOCAL_RETENTION_DAYS"

  if s3_available && ! $SKIP_OFFSITE; then
    s3_cleanup_old "backups/" "$OFFSITE_RETENTION_DAYS" || true
  fi
}

# ============================================================================
# SEND SUMMARY
# ============================================================================

send_summary() {
  if $DRY_RUN; then
    return 0
  fi

  local status="SUCCESS"
  local priority="normal"
  if [[ ${#FAILED[@]} -gt 0 ]]; then
    status="PARTIAL FAILURE"
    priority="urgent"
  fi

  local body="Backup Report: ${status}\n"
  body+="Timestamp: ${TIMESTAMP}\n"
  body+="Host: $(hostname)\n\n"

  body+="Backed up (${#BACKED_UP[@]}):\n"
  for entry in "${BACKED_UP[@]}"; do
    IFS='|' read -r svc path size <<< "$entry"
    body+="  OK  ${svc} (${size})\n"
  done

  if [[ ${#FAILED[@]} -gt 0 ]]; then
    body+="\nFailed (${#FAILED[@]}):\n"
    for svc in "${FAILED[@]}"; do
      body+="  FAIL  ${svc}\n"
    done
  fi

  body+="\nLocal: ${BACKUP_DIR}\n"
  if s3_available && ! $SKIP_OFFSITE; then
    body+="Offsite: s3://${S3_BUCKET}/backups/${TIMESTAMP}/\n"
  fi

  send_alert "Backup ${status}" "$body" "$priority"
}

# ============================================================================
# MAIN
# ============================================================================

main() {
  local start_time
  start_time=$(date +%s)

  # Run all backups (each handles its own errors)
  backup_caa_postgres || true
  backup_mhe_postgres || true
  backup_caa_redis || true
  backup_minio || true

  # Compose services — volume-based backups
  backup_compose_volume "ghost" "ghost" "/var/lib/ghost/content" || true
  backup_compose_volume "nodebb" "nodebb" "/data" || true
  backup_compose_volume "n8n" "n8n" "/home/node/.n8n" || true
  backup_compose_volume "metabase" "metabase" "/metabase.db" || true
  backup_compose_volume "typebot" "typebot" "/data" || true
  backup_compose_volume "heyform" "heyform" "/data" || true

  # Compose services with their own PostgreSQL
  backup_compose_postgres "listmonk-pg" "listmonk" "listmonk" "listmonk" || true

  # Dokploy platform configuration
  backup_dokploy_config || true

  # Create manifest and upload
  create_manifest
  upload_offsite || true
  cleanup_old_backups

  local end_time
  end_time=$(date +%s)
  local duration=$((end_time - start_time))

  log "=========================================="
  log "Backup completed in $(format_duration $duration)"
  log "Backed up: ${#BACKED_UP[@]} services"
  log "Failed: ${#FAILED[@]} services"
  log "=========================================="

  # Send email summary
  send_summary

  # Exit with error if anything failed
  if [[ ${#FAILED[@]} -gt 0 ]]; then
    exit 1
  fi
  exit 0
}

main "$@"
