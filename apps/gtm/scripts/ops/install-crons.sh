#!/usr/bin/env bash
# install-crons.sh — Set up all cron jobs and prerequisites on VPS
#
# Usage:
#   ./install-crons.sh            # Install everything
#   ./install-crons.sh --verify   # Just verify current setup
#   ./install-crons.sh --remove   # Remove all ops cron jobs
#
# Run this ONCE after deploying scripts to /root/ops/

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "${SCRIPT_DIR}/ops.conf"
source "${SCRIPT_DIR}/lib.sh"

require_root

MODE="${1:-install}"

# ============================================================================
# CRON DEFINITIONS
# ============================================================================

CRON_MARKER="# SoloFrameHub Operations"

read -r -d '' CRON_JOBS << 'CRON_EOF' || true
# SoloFrameHub Operations — managed by install-crons.sh
# DO NOT edit manually between the markers

# Daily backup at 2:00 AM
0 2 * * * /root/ops/backup.sh >> /var/log/ops/backup.log 2>&1

# Weekly maintenance at 3:00 AM Sunday
0 3 * * 0 /root/ops/maintenance.sh >> /var/log/ops/maintenance.log 2>&1

# Health checks every 5 minutes
*/5 * * * * /root/ops/health-check.sh >> /var/log/ops/health.log 2>&1

# Weekly security audit at 4:00 AM Sunday
0 4 * * 0 /root/ops/security-audit.sh >> /var/log/ops/security.log 2>&1

# END SoloFrameHub Operations
CRON_EOF

# ============================================================================
# VERIFY MODE
# ============================================================================

cmd_verify() {
  log "Verifying ops setup..."

  local issues=0

  # Check directories
  for dir in "$OPS_LOG_DIR" "$OPS_STATE_DIR" "$BACKUP_LOCAL_DIR"; do
    if [[ -d "$dir" ]]; then
      log "  OK  Directory exists: $dir"
    else
      warn "  MISSING  Directory: $dir"
      issues=$((issues + 1))
    fi
  done

  # Check scripts are executable
  for script in backup.sh restore.sh maintenance.sh health-check.sh security-audit.sh; do
    local path="${SCRIPT_DIR}/${script}"
    if [[ -x "$path" ]]; then
      log "  OK  Executable: $script"
    elif [[ -f "$path" ]]; then
      warn "  WARN  Not executable: $script"
      issues=$((issues + 1))
    else
      warn "  MISSING  Script: $script"
      issues=$((issues + 1))
    fi
  done

  # Check cron jobs installed
  local cron_count
  cron_count=$(crontab -l 2>/dev/null | grep -c "SoloFrameHub\|/root/ops/" || echo "0")
  if [[ "$cron_count" -gt 0 ]]; then
    log "  OK  ${cron_count} cron job lines installed"
  else
    warn "  MISSING  No ops cron jobs found"
    issues=$((issues + 1))
  fi

  # Check secrets file
  if [[ -f "${SECRETS_FILE}" ]]; then
    log "  OK  Secrets file exists: ${SECRETS_FILE}"
    local perms
    perms=$(stat -c %a "${SECRETS_FILE}" 2>/dev/null || stat -f %Lp "${SECRETS_FILE}" 2>/dev/null)
    if [[ "$perms" == "600" ]]; then
      log "  OK  Secrets file permissions: ${perms}"
    else
      warn "  WARN  Secrets file permissions: ${perms} (should be 600)"
      issues=$((issues + 1))
    fi
  else
    warn "  MISSING  Secrets file: ${SECRETS_FILE}"
    warn "           Create it with: RESEND_API_KEY, ALERT_TO, S3_* vars"
    issues=$((issues + 1))
  fi

  # Check aws CLI
  if command -v aws >/dev/null 2>&1; then
    log "  OK  AWS CLI installed"
  else
    warn "  MISSING  AWS CLI (needed for offsite backups)"
    issues=$((issues + 1))
  fi

  # Check RESEND_API_KEY
  if [[ -n "${RESEND_API_KEY:-}" ]]; then
    log "  OK  RESEND_API_KEY configured"
  else
    warn "  MISSING  RESEND_API_KEY (email alerts disabled)"
    issues=$((issues + 1))
  fi

  # Check ALERT_TO
  if [[ -n "${ALERT_TO:-}" ]]; then
    log "  OK  ALERT_TO: ${ALERT_TO}"
  else
    warn "  MISSING  ALERT_TO (email alerts disabled)"
    issues=$((issues + 1))
  fi

  echo ""
  if [[ $issues -eq 0 ]]; then
    log "All checks passed."
  else
    warn "${issues} issue(s) found."
  fi

  return $issues
}

# ============================================================================
# REMOVE MODE
# ============================================================================

cmd_remove() {
  log "Removing ops cron jobs..."

  local existing
  existing=$(crontab -l 2>/dev/null || true)

  if [[ -z "$existing" ]]; then
    log "No crontab found — nothing to remove"
    return 0
  fi

  # Remove everything between markers
  local new_crontab
  new_crontab=$(echo "$existing" | sed "/^${CRON_MARKER}/,/^# END SoloFrameHub/d")

  # Also remove any individual ops lines that might exist outside markers
  new_crontab=$(echo "$new_crontab" | grep -v "/root/ops/" || true)

  echo "$new_crontab" | crontab -
  log "Ops cron jobs removed."
}

# ============================================================================
# INSTALL MODE
# ============================================================================

cmd_install() {
  log "=========================================="
  log "Installing SoloFrameHub Operations"
  log "=========================================="

  # 1. Create directories
  log "Creating directories..."
  mkdir -p "$OPS_LOG_DIR"
  mkdir -p "$OPS_STATE_DIR"
  mkdir -p "$BACKUP_LOCAL_DIR"
  log "  ${OPS_LOG_DIR}"
  log "  ${OPS_STATE_DIR}"
  log "  ${BACKUP_LOCAL_DIR}"

  # 2. Make scripts executable
  log "Setting script permissions..."
  chmod +x "${SCRIPT_DIR}"/*.sh
  log "  All scripts in ${SCRIPT_DIR} are executable"

  # 3. Create secrets template if not exists
  if [[ ! -f "${SECRETS_FILE}" ]]; then
    log "Creating secrets template at ${SECRETS_FILE}..."
    cat > "${SECRETS_FILE}" << 'SECRETS_EOF'
# SoloFrameHub Operations Secrets
# This file is sourced by ops.conf — set your actual values below
# Permissions should be 600: chmod 600 /root/.ops-secrets

# Email Alerts (required for notifications)
RESEND_API_KEY=""
ALERT_TO=""

# S3/R2 Offsite Backups (optional but recommended)
S3_ENDPOINT=""
S3_ACCESS_KEY=""
S3_SECRET_KEY=""
S3_BUCKET="soloframehub-backups"
S3_REGION="auto"

# Database Credentials (defaults work for most Dokploy setups)
# CAA_PG_USER="postgres"
# CAA_PG_DB="postgres"
# MHE_PG_USER="postgres"
# MHE_PG_DB="postgres"
SECRETS_EOF
    chmod 600 "${SECRETS_FILE}"
    log "  Created ${SECRETS_FILE} — EDIT THIS FILE with your actual values"
  else
    log "  Secrets file already exists: ${SECRETS_FILE}"
  fi

  # 4. Install AWS CLI if not present (for S3 offsite)
  if ! command -v aws >/dev/null 2>&1; then
    log "Installing AWS CLI for offsite backups..."
    if command -v apt >/dev/null 2>&1; then
      apt-get update -qq && apt-get install -y -qq awscli >/dev/null 2>&1 || \
        warn "  Failed to install AWS CLI via apt — install manually"
    elif command -v apk >/dev/null 2>&1; then
      apk add --no-cache aws-cli >/dev/null 2>&1 || \
        warn "  Failed to install AWS CLI via apk — install manually"
    else
      warn "  Cannot install AWS CLI — install manually for offsite backups"
    fi
  else
    log "  AWS CLI already installed"
  fi

  # 5. Set up logrotate
  log "Setting up log rotation..."
  local logrotate_conf="/etc/logrotate.d/soloframehub-ops"
  cat > "$logrotate_conf" << 'LOGROTATE_EOF'
/var/log/ops/*.log {
    weekly
    rotate 4
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
}
LOGROTATE_EOF
  log "  Created ${logrotate_conf}"

  # 6. Install cron jobs
  log "Installing cron jobs..."

  # Get existing crontab (excluding our old entries)
  local existing
  existing=$(crontab -l 2>/dev/null || true)
  local cleaned
  cleaned=$(echo "$existing" | sed "/^${CRON_MARKER}/,/^# END SoloFrameHub/d" | grep -v "/root/ops/" || true)

  # Append our cron jobs
  local new_crontab
  new_crontab="${cleaned}

${CRON_JOBS}"

  echo "$new_crontab" | crontab -
  log "  Cron jobs installed:"
  log "    - Backup: daily at 2:00 AM"
  log "    - Maintenance: Sunday at 3:00 AM"
  log "    - Health check: every 5 minutes"
  log "    - Security audit: Sunday at 4:00 AM"

  # 7. Run verification
  log ""
  log "Running verification..."
  cmd_verify || true

  # 8. Test health check
  log ""
  log "Running initial health check..."
  "${SCRIPT_DIR}/health-check.sh" --verbose 2>&1 || true

  log ""
  log "=========================================="
  log "Installation complete!"
  log "=========================================="
  log ""
  log "NEXT STEPS:"
  log "  1. Edit ${SECRETS_FILE} with your actual credentials"
  log "  2. Test email: source ${SCRIPT_DIR}/lib.sh && source ${SCRIPT_DIR}/ops.conf && send_alert 'Test' 'Hello from ops'"
  log "  3. Test backup: ${SCRIPT_DIR}/backup.sh --dry-run"
  log "  4. Run real backup: ${SCRIPT_DIR}/backup.sh"
  log "  5. Verify: ${SCRIPT_DIR}/install-crons.sh --verify"
}

# ============================================================================
# MAIN
# ============================================================================

case "$MODE" in
  install|--install) cmd_install ;;
  verify|--verify) cmd_verify ;;
  remove|--remove) cmd_remove ;;
  *)
    echo "Usage: install-crons.sh [install|verify|remove]"
    exit 1
    ;;
esac
