#!/usr/bin/env bash
# lib.sh — Shared functions for all SoloFrameHub operations scripts
# Source after ops.conf: source "$(dirname "$0")/lib.sh"

# ============================================================================
# LOGGING
# ============================================================================

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] INFO  $*"
}

warn() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] WARN  $*" >&2
}

error() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR $*" >&2
}

die() {
  error "$@"
  exit 1
}

# ============================================================================
# PREREQUISITES
# ============================================================================

require_root() {
  [[ $EUID -eq 0 ]] || die "Must run as root"
}

require_conf() {
  local conf_file="${OPS_DIR:-$(dirname "${BASH_SOURCE[0]}")}/ops.conf"
  if [[ -z "${OPS_DIR:-}" ]]; then
    # shellcheck source=ops.conf
    source "$conf_file" || die "Failed to source ops.conf"
  fi
}

ensure_dirs() {
  mkdir -p "${OPS_LOG_DIR:-/var/log/ops}"
  mkdir -p "${OPS_STATE_DIR:-/var/run/ops}"
  mkdir -p "${BACKUP_LOCAL_DIR:-/backups}"
}

# ============================================================================
# EMAIL ALERTS (via Resend API)
# ============================================================================

send_alert() {
  local subject="$1"
  local body="$2"
  local priority="${3:-normal}"  # normal or urgent

  if [[ -z "${RESEND_API_KEY:-}" ]]; then
    warn "RESEND_API_KEY not set — skipping email alert: $subject"
    return 1
  fi

  if [[ -z "${ALERT_TO:-}" ]]; then
    warn "ALERT_TO not set — skipping email alert: $subject"
    return 1
  fi

  local prefix=""
  if [[ "$priority" == "urgent" ]]; then
    prefix="[URGENT] "
  fi

  local json
  json=$(cat <<ENDJSON
{
  "from": "${ALERT_FROM:-SoloFrameHub Ops <ops@soloframehub.com>}",
  "to": ["${ALERT_TO}"],
  "subject": "${prefix}[${OPS_HOSTNAME:-VPS}] ${subject}",
  "html": "<pre style=\"font-family: monospace; font-size: 13px; white-space: pre-wrap;\">${body}</pre>"
}
ENDJSON
)

  local http_code
  http_code=$(curl -s -o /dev/null -w "%{http_code}" \
    -X POST "${RESEND_API_URL:-https://api.resend.com/emails}" \
    -H "Authorization: Bearer ${RESEND_API_KEY}" \
    -H "Content-Type: application/json" \
    -d "$json" \
    --max-time 15 2>/dev/null) || true

  if [[ "$http_code" == "200" ]] || [[ "$http_code" == "201" ]]; then
    log "Alert email sent: $subject"
    return 0
  else
    warn "Failed to send alert email (HTTP $http_code): $subject"
    return 1
  fi
}

# ============================================================================
# CONTAINER DISCOVERY
# ============================================================================

# Find a running Docker container by name pattern (Dokploy appName prefix)
find_container() {
  local pattern="$1"
  docker ps --filter "name=${pattern}" --format '{{.Names}}' 2>/dev/null | head -1
}

# Check if a container is running
container_running() {
  local pattern="$1"
  local name
  name=$(find_container "$pattern")
  [[ -n "$name" ]]
}

# Execute a command inside a Docker container
# Usage: docker_exec <container_pattern> <command>
docker_exec() {
  local pattern="$1"
  shift
  local container
  container=$(find_container "$pattern")
  if [[ -z "$container" ]]; then
    error "Container not found for pattern: $pattern"
    return 1
  fi
  docker exec "$container" sh -c "$*"
}

# Execute command and capture output
docker_exec_output() {
  local pattern="$1"
  shift
  local container
  container=$(find_container "$pattern")
  if [[ -z "$container" ]]; then
    error "Container not found for pattern: $pattern"
    return 1
  fi
  docker exec "$container" sh -c "$*" 2>&1
}

# Get Docker volume mount path for a container
get_volume_path() {
  local pattern="$1"
  local mount_dest="${2:-/data}"
  local container
  container=$(find_container "$pattern")
  if [[ -z "$container" ]]; then
    return 1
  fi
  docker inspect "$container" --format "{{range .Mounts}}{{if eq .Destination \"${mount_dest}\"}}{{.Source}}{{end}}{{end}}" 2>/dev/null
}

# ============================================================================
# BACKUP HELPERS
# ============================================================================

backup_timestamp() {
  date '+%Y-%m-%d_%H-%M-%S'
}

# Create SHA256 checksum of a file
file_checksum() {
  local file="$1"
  sha256sum "$file" 2>/dev/null | awk '{print $1}'
}

# Get file size in human-readable format
file_size() {
  local file="$1"
  du -h "$file" 2>/dev/null | awk '{print $1}'
}

# Clean up files older than N days in a directory
cleanup_old() {
  local dir="$1"
  local days="$2"
  if [[ -d "$dir" ]]; then
    local count
    count=$(find "$dir" -mindepth 1 -maxdepth 1 -mtime "+${days}" -print | wc -l)
    if [[ "$count" -gt 0 ]]; then
      find "$dir" -mindepth 1 -maxdepth 1 -mtime "+${days}" -exec rm -rf {} +
      log "Cleaned up $count items older than ${days} days from $dir"
    fi
  fi
}

# ============================================================================
# S3 OFFSITE OPERATIONS
# ============================================================================

s3_available() {
  [[ -n "${S3_ENDPOINT:-}" ]] && [[ -n "${S3_ACCESS_KEY:-}" ]] && [[ -n "${S3_SECRET_KEY:-}" ]] && [[ -n "${S3_BUCKET:-}" ]]
}

# Upload a file to S3/R2
s3_upload() {
  local local_path="$1"
  local remote_key="$2"

  if ! s3_available; then
    warn "S3 not configured — skipping offsite upload"
    return 1
  fi

  AWS_ACCESS_KEY_ID="${S3_ACCESS_KEY}" \
  AWS_SECRET_ACCESS_KEY="${S3_SECRET_KEY}" \
  aws s3 cp "$local_path" "s3://${S3_BUCKET}/${remote_key}" \
    --endpoint-url "${S3_ENDPOINT}" \
    --region "${S3_REGION:-auto}" \
    --quiet 2>&1 || {
      error "S3 upload failed: $local_path → s3://${S3_BUCKET}/${remote_key}"
      return 1
    }
  log "Uploaded to s3://${S3_BUCKET}/${remote_key}"
}

# Upload an entire directory to S3/R2
s3_upload_dir() {
  local local_dir="$1"
  local remote_prefix="$2"

  if ! s3_available; then
    warn "S3 not configured — skipping offsite upload"
    return 1
  fi

  AWS_ACCESS_KEY_ID="${S3_ACCESS_KEY}" \
  AWS_SECRET_ACCESS_KEY="${S3_SECRET_KEY}" \
  aws s3 sync "$local_dir" "s3://${S3_BUCKET}/${remote_prefix}" \
    --endpoint-url "${S3_ENDPOINT}" \
    --region "${S3_REGION:-auto}" \
    --quiet 2>&1 || {
      error "S3 sync failed: $local_dir → s3://${S3_BUCKET}/${remote_prefix}"
      return 1
    }
  log "Synced to s3://${S3_BUCKET}/${remote_prefix}"
}

# List remote backups
s3_list() {
  local prefix="${1:-}"

  if ! s3_available; then
    warn "S3 not configured"
    return 1
  fi

  AWS_ACCESS_KEY_ID="${S3_ACCESS_KEY}" \
  AWS_SECRET_ACCESS_KEY="${S3_SECRET_KEY}" \
  aws s3 ls "s3://${S3_BUCKET}/${prefix}" \
    --endpoint-url "${S3_ENDPOINT}" \
    --region "${S3_REGION:-auto}" 2>&1
}

# Download from S3/R2
s3_download() {
  local remote_key="$1"
  local local_path="$2"

  if ! s3_available; then
    die "S3 not configured — cannot download"
  fi

  AWS_ACCESS_KEY_ID="${S3_ACCESS_KEY}" \
  AWS_SECRET_ACCESS_KEY="${S3_SECRET_KEY}" \
  aws s3 cp "s3://${S3_BUCKET}/${remote_key}" "$local_path" \
    --endpoint-url "${S3_ENDPOINT}" \
    --region "${S3_REGION:-auto}" \
    --quiet 2>&1 || {
      error "S3 download failed: s3://${S3_BUCKET}/${remote_key}"
      return 1
    }
  log "Downloaded s3://${S3_BUCKET}/${remote_key} → $local_path"
}

# Clean up old offsite backups
s3_cleanup_old() {
  local prefix="$1"
  local days="$2"
  local cutoff_date
  cutoff_date=$(date -d "-${days} days" '+%Y-%m-%d' 2>/dev/null || date -v "-${days}d" '+%Y-%m-%d' 2>/dev/null)

  if ! s3_available; then
    return 0
  fi

  log "Cleaning S3 backups older than ${days} days (before ${cutoff_date})"
  local dirs
  dirs=$(s3_list "$prefix" 2>/dev/null | awk '{print $NF}' | grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}' || true)

  for dir in $dirs; do
    local dir_date="${dir%%_*}"  # extract YYYY-MM-DD from YYYY-MM-DD_HH-MM-SS/
    dir_date="${dir_date%/}"
    if [[ "$dir_date" < "$cutoff_date" ]]; then
      log "Removing old offsite backup: $dir"
      AWS_ACCESS_KEY_ID="${S3_ACCESS_KEY}" \
      AWS_SECRET_ACCESS_KEY="${S3_SECRET_KEY}" \
      aws s3 rm "s3://${S3_BUCKET}/${prefix}${dir}" --recursive \
        --endpoint-url "${S3_ENDPOINT}" \
        --region "${S3_REGION:-auto}" \
        --quiet 2>/dev/null || warn "Failed to remove s3://${S3_BUCKET}/${prefix}${dir}"
    fi
  done
}

# ============================================================================
# HEALTH CHECK STATE MANAGEMENT
# ============================================================================

# Get previous health state for a service
get_health_state() {
  local service="$1"
  local state_file="${OPS_STATE_DIR}/health-${service}.state"
  if [[ -f "$state_file" ]]; then
    cat "$state_file"
  else
    echo "unknown"
  fi
}

# Set health state for a service
set_health_state() {
  local service="$1"
  local state="$2"  # healthy or unhealthy
  local state_file="${OPS_STATE_DIR}/health-${service}.state"
  echo "$state" > "$state_file"
}

# Get failure count for debouncing
get_fail_count() {
  local service="$1"
  local count_file="${OPS_STATE_DIR}/health-${service}.failcount"
  if [[ -f "$count_file" ]]; then
    cat "$count_file"
  else
    echo "0"
  fi
}

# Increment failure count
inc_fail_count() {
  local service="$1"
  local count_file="${OPS_STATE_DIR}/health-${service}.failcount"
  local current
  current=$(get_fail_count "$service")
  echo $((current + 1)) > "$count_file"
}

# Reset failure count
reset_fail_count() {
  local service="$1"
  local count_file="${OPS_STATE_DIR}/health-${service}.failcount"
  echo "0" > "$count_file"
}

# Check if alert cooldown has elapsed for a service
can_send_alert() {
  local service="$1"
  local cooldown_file="${OPS_STATE_DIR}/health-${service}.lastalert"
  if [[ ! -f "$cooldown_file" ]]; then
    return 0
  fi
  local last_alert
  last_alert=$(cat "$cooldown_file")
  local now
  now=$(date +%s)
  local elapsed=$((now - last_alert))
  [[ $elapsed -ge ${HEALTH_ALERT_COOLDOWN:-3600} ]]
}

# Record that an alert was sent
record_alert_sent() {
  local service="$1"
  local cooldown_file="${OPS_STATE_DIR}/health-${service}.lastalert"
  date +%s > "$cooldown_file"
}

# ============================================================================
# UTILITY
# ============================================================================

# Check disk usage percentage of a mount point
disk_usage_percent() {
  local mount="${1:-/}"
  df "$mount" 2>/dev/null | awk 'NR==2 {gsub(/%/,""); print $5}'
}

# Check memory usage percentage
memory_usage_percent() {
  free 2>/dev/null | awk '/^Mem:/ {printf "%.0f", $3/$2 * 100}'
}

# Check SSL certificate expiry days remaining
cert_days_remaining() {
  local domain="$1"
  local expiry
  expiry=$(echo | openssl s_client -servername "$domain" -connect "${domain}:443" 2>/dev/null \
    | openssl x509 -noout -enddate 2>/dev/null \
    | sed 's/notAfter=//')
  if [[ -z "$expiry" ]]; then
    echo "-1"
    return
  fi
  local expiry_epoch
  expiry_epoch=$(date -d "$expiry" +%s 2>/dev/null || date -jf "%b %d %H:%M:%S %Y %Z" "$expiry" +%s 2>/dev/null)
  local now_epoch
  now_epoch=$(date +%s)
  echo $(( (expiry_epoch - now_epoch) / 86400 ))
}

# Pretty-print a duration in seconds
format_duration() {
  local seconds=$1
  local minutes=$((seconds / 60))
  local secs=$((seconds % 60))
  if [[ $minutes -gt 0 ]]; then
    echo "${minutes}m ${secs}s"
  else
    echo "${secs}s"
  fi
}
