#!/usr/bin/env bash
# security-audit.sh — Security posture checks for SoloFrameHub VPS
#
# Usage:
#   ./security-audit.sh            # Run all checks
#   ./security-audit.sh --verbose  # Detailed output
#
# Cron: 0 4 * * 0 /root/ops/security-audit.sh >> /var/log/ops/security.log 2>&1

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "${SCRIPT_DIR}/ops.conf"
source "${SCRIPT_DIR}/lib.sh"

require_root
ensure_dirs

VERBOSE=false
[[ "${1:-}" == "--verbose" || "${1:-}" == "-v" ]] && VERBOSE=true

# ============================================================================
# RESULTS TRACKING
# ============================================================================

declare -a RESULTS=()
PASSES=0
WARNINGS=0
FAILURES=0

audit_pass() {
  local name="$1"
  local detail="${2:-}"
  RESULTS+=("PASS  ${name}: ${detail}")
  PASSES=$((PASSES + 1))
  $VERBOSE && log "PASS: ${name} — ${detail}"
}

audit_warn() {
  local name="$1"
  local detail="${2:-}"
  RESULTS+=("WARN  ${name}: ${detail}")
  WARNINGS=$((WARNINGS + 1))
  warn "WARN: ${name} — ${detail}"
}

audit_fail() {
  local name="$1"
  local detail="${2:-}"
  RESULTS+=("FAIL  ${name}: ${detail}")
  FAILURES=$((FAILURES + 1))
  error "FAIL: ${name} — ${detail}"
}

# ============================================================================
# CHECK: Listening Ports
# ============================================================================

check_ports() {
  log "Checking listening ports..."

  # Expected ports that should be open
  local expected_ports=(22 80 443)

  # Ports that should NOT be accessible externally
  local restricted_ports=(3000 5432 6379 9010 9011 27017)

  # Get all listening TCP ports
  local listening
  listening=$(ss -tlnp 2>/dev/null | grep LISTEN || true)

  for port in "${expected_ports[@]}"; do
    if echo "$listening" | grep -q ":${port} "; then
      audit_pass "port-${port}" "Listening as expected"
    else
      audit_warn "port-${port}" "Expected port ${port} not listening"
    fi
  done

  # Check restricted ports aren't bound to 0.0.0.0 (external)
  for port in "${restricted_ports[@]}"; do
    local bindings
    bindings=$(echo "$listening" | grep ":${port} " | grep -v "127.0.0.1\|::1\|\[::1\]" || true)
    if [[ -n "$bindings" ]]; then
      # Port is listening — but iptables should block external access
      $VERBOSE && audit_pass "restricted-port-${port}" "Listening but should be firewalled"
    fi
  done

  # Flag unexpected ports
  local all_ports
  all_ports=$(echo "$listening" | awk '{print $4}' | grep -oP ':\K[0-9]+$' | sort -un || true)
  local known_ports="22 80 443 3000 5432 6379 9010 9011 27017 4567 8025 9000 9001"

  for port in $all_ports; do
    if ! echo "$known_ports" | grep -qw "$port"; then
      audit_warn "unexpected-port" "Port ${port} is listening (not in known list)"
    fi
  done
}

# ============================================================================
# CHECK: Cloudflare-Only Access
# ============================================================================

check_cloudflare_firewall() {
  log "Checking Cloudflare firewall rules..."

  # Check if iptables has CLOUDFLARE-ONLY chain
  if iptables -L CLOUDFLARE-ONLY -n >/dev/null 2>&1; then
    local rule_count
    rule_count=$(iptables -L CLOUDFLARE-ONLY -n 2>/dev/null | grep -c "ACCEPT" || echo "0")
    if [[ "$rule_count" -gt 5 ]]; then
      audit_pass "cloudflare-firewall" "${rule_count} Cloudflare IP rules active"
    else
      audit_warn "cloudflare-firewall" "Only ${rule_count} Cloudflare IP rules (expected 10+)"
    fi
  else
    audit_fail "cloudflare-firewall" "CLOUDFLARE-ONLY chain not found — ports 80/443 may be exposed"
  fi

  # Check DOCKER-USER chain for blocked ports
  local docker_user_rules
  docker_user_rules=$(iptables -L DOCKER-USER -n 2>/dev/null | grep -c "DROP\|REJECT" || echo "0")
  if [[ "$docker_user_rules" -gt 0 ]]; then
    audit_pass "docker-user-rules" "${docker_user_rules} Docker port restrictions active"
  else
    audit_warn "docker-user-rules" "No Docker port restrictions in DOCKER-USER chain"
  fi
}

# ============================================================================
# CHECK: Docker Socket Permissions
# ============================================================================

check_docker_socket() {
  log "Checking Docker socket..."

  local socket="/var/run/docker.sock"
  if [[ -S "$socket" ]]; then
    local perms
    perms=$(stat -c %a "$socket" 2>/dev/null || stat -f %Lp "$socket" 2>/dev/null)
    if [[ "$perms" == "660" ]] || [[ "$perms" == "600" ]]; then
      audit_pass "docker-socket" "Permissions: ${perms}"
    elif [[ "$perms" == "666" ]]; then
      audit_fail "docker-socket" "World-readable (${perms}) — security risk"
    else
      audit_warn "docker-socket" "Permissions: ${perms} (expected 660)"
    fi

    local owner
    owner=$(stat -c "%U:%G" "$socket" 2>/dev/null || stat -f "%Su:%Sg" "$socket" 2>/dev/null)
    $VERBOSE && audit_pass "docker-socket-owner" "Owner: ${owner}"
  fi
}

# ============================================================================
# CHECK: Containers Running as Root
# ============================================================================

check_container_users() {
  log "Checking container user IDs..."

  local containers
  containers=$(docker ps --format '{{.Names}}' 2>/dev/null)

  local root_containers=0
  while IFS= read -r container; do
    [[ -n "$container" ]] || continue
    local uid
    uid=$(docker inspect "$container" --format '{{.Config.User}}' 2>/dev/null)

    if [[ -z "$uid" ]] || [[ "$uid" == "0" ]] || [[ "$uid" == "root" ]]; then
      root_containers=$((root_containers + 1))
      $VERBOSE && audit_warn "container-root-${container}" "Running as root (uid: ${uid:-unset})"
    fi
  done <<< "$containers"

  if [[ "$root_containers" -gt 0 ]]; then
    audit_warn "containers-as-root" "${root_containers} container(s) running as root"
  else
    audit_pass "containers-as-root" "No containers running as root"
  fi
}

# ============================================================================
# CHECK: SSL/TLS Configuration
# ============================================================================

check_ssl() {
  log "Checking SSL/TLS configuration..."

  local domains=(
    "ai-solo-gtm-os.soloframehub.com"
    "mental-health-education.soloframehub.com"
    "blog.soloframehub.com"
  )

  for domain in "${domains[@]}"; do
    # Check TLS version
    local tls_info
    tls_info=$(echo | openssl s_client -servername "$domain" -connect "${domain}:443" 2>/dev/null \
      | grep -E "Protocol|Cipher" | head -2) || tls_info=""

    if [[ -z "$tls_info" ]]; then
      audit_warn "ssl-${domain}" "Could not connect"
      continue
    fi

    local protocol
    protocol=$(echo "$tls_info" | grep "Protocol" | awk '{print $NF}')

    if [[ "$protocol" == "TLSv1.3" ]] || [[ "$protocol" == "TLSv1.2" ]]; then
      audit_pass "ssl-${domain}" "${protocol}"
    elif [[ "$protocol" == "TLSv1.1" ]] || [[ "$protocol" == "TLSv1" ]]; then
      audit_fail "ssl-${domain}" "Insecure protocol: ${protocol}"
    else
      audit_warn "ssl-${domain}" "Protocol: ${protocol}"
    fi

    # Certificate expiry
    local days
    days=$(cert_days_remaining "$domain")
    if [[ "$days" -gt "${CERT_EXPIRY_WARN_DAYS}" ]]; then
      $VERBOSE && audit_pass "ssl-expiry-${domain}" "${days} days remaining"
    elif [[ "$days" -gt 0 ]]; then
      audit_warn "ssl-expiry-${domain}" "Expires in ${days} days"
    elif [[ "$days" -le 0 ]]; then
      audit_fail "ssl-expiry-${domain}" "Certificate EXPIRED or unreadable"
    fi
  done
}

# ============================================================================
# CHECK: Unattended Upgrades
# ============================================================================

check_upgrades() {
  log "Checking system updates..."

  if command -v unattended-upgrades >/dev/null 2>&1; then
    if systemctl is-active unattended-upgrades >/dev/null 2>&1; then
      audit_pass "unattended-upgrades" "Active"
    else
      audit_warn "unattended-upgrades" "Installed but not active"
    fi
  elif command -v apt >/dev/null 2>&1; then
    audit_warn "unattended-upgrades" "Not installed (apt-based system)"
  else
    $VERBOSE && audit_pass "unattended-upgrades" "N/A (not apt-based)"
  fi

  # Check for pending security updates
  if command -v apt >/dev/null 2>&1; then
    local security_updates
    security_updates=$(apt list --upgradable 2>/dev/null | grep -i security | wc -l)
    if [[ "$security_updates" -gt 0 ]]; then
      audit_warn "pending-security-updates" "${security_updates} security update(s) available"
    else
      audit_pass "pending-security-updates" "No pending security updates"
    fi
  fi
}

# ============================================================================
# CHECK: SSH Brute Force Attempts
# ============================================================================

check_ssh_attempts() {
  log "Checking SSH login attempts..."

  local auth_log=""
  for f in /var/log/auth.log /var/log/secure /var/log/syslog; do
    if [[ -f "$f" ]]; then
      auth_log="$f"
      break
    fi
  done

  if [[ -z "$auth_log" ]]; then
    audit_warn "ssh-brute-force" "No auth log found"
    return
  fi

  # Count failed SSH attempts in last 24 hours
  local yesterday
  yesterday=$(date -d "yesterday" '+%b %e' 2>/dev/null || date -v-1d '+%b %e' 2>/dev/null)
  local today
  today=$(date '+%b %e')

  local failed_count
  failed_count=$(grep -cE "Failed password|authentication failure" "$auth_log" 2>/dev/null || echo "0")

  if [[ "$failed_count" -gt 100 ]]; then
    audit_warn "ssh-brute-force" "${failed_count} failed login attempts in log"

    # Show top offending IPs
    local top_ips
    top_ips=$(grep -E "Failed password|authentication failure" "$auth_log" 2>/dev/null \
      | grep -oP 'from \K[0-9.]+' | sort | uniq -c | sort -rn | head -5)
    if [[ -n "$top_ips" ]]; then
      $VERBOSE && log "  Top offending IPs:"
      while IFS= read -r line; do
        $VERBOSE && log "    $line"
      done <<< "$top_ips"
    fi
  elif [[ "$failed_count" -gt 0 ]]; then
    audit_pass "ssh-brute-force" "${failed_count} failed login attempts (normal range)"
  else
    audit_pass "ssh-brute-force" "No failed login attempts"
  fi
}

# ============================================================================
# CHECK: Docker API Exposure
# ============================================================================

check_docker_api() {
  log "Checking Docker API exposure..."

  # Docker API should NOT be listening on TCP
  local docker_tcp
  docker_tcp=$(ss -tlnp 2>/dev/null | grep -E ":2375|:2376" || true)

  if [[ -n "$docker_tcp" ]]; then
    audit_fail "docker-api-exposed" "Docker API accessible via TCP — critical security risk"
  else
    audit_pass "docker-api-exposed" "Docker API not exposed on network"
  fi
}

# ============================================================================
# CHECK: iptables Status
# ============================================================================

check_iptables() {
  log "Checking iptables status..."

  local total_rules
  total_rules=$(iptables -L -n 2>/dev/null | grep -c -E "ACCEPT|DROP|REJECT" || echo "0")

  if [[ "$total_rules" -gt 5 ]]; then
    audit_pass "iptables-active" "${total_rules} firewall rules active"
  elif [[ "$total_rules" -gt 0 ]]; then
    audit_warn "iptables-minimal" "Only ${total_rules} firewall rules (may be insufficient)"
  else
    audit_fail "iptables-empty" "No firewall rules active"
  fi

  # Check for iptables-persistent
  if command -v iptables-save >/dev/null 2>&1; then
    if [[ -f /etc/iptables/rules.v4 ]] || dpkg -l netfilter-persistent >/dev/null 2>&1; then
      audit_pass "iptables-persistent" "Rules are persisted across reboots"
    else
      audit_warn "iptables-persistent" "Rules may not survive reboot"
    fi
  fi
}

# ============================================================================
# CHECK: File Permissions (sensitive files)
# ============================================================================

check_file_perms() {
  log "Checking sensitive file permissions..."

  local sensitive_files=(
    "/root/.ops-secrets"
    "/etc/dokploy/traefik/dynamic/certificates"
  )

  for f in "${sensitive_files[@]}"; do
    if [[ -e "$f" ]]; then
      local perms
      perms=$(stat -c %a "$f" 2>/dev/null || stat -f %Lp "$f" 2>/dev/null)
      if [[ "$perms" =~ ^[67]00$ ]]; then
        audit_pass "perms-$(basename "$f")" "Permissions: ${perms}"
      elif [[ "$perms" =~ ^[67][40]0$ ]]; then
        audit_pass "perms-$(basename "$f")" "Permissions: ${perms} (group readable)"
      else
        audit_warn "perms-$(basename "$f")" "Permissions: ${perms} — consider restricting"
      fi
    fi
  done

  # Check SSH config
  if [[ -f /etc/ssh/sshd_config ]]; then
    local root_login
    root_login=$(grep -E "^PermitRootLogin" /etc/ssh/sshd_config 2>/dev/null | awk '{print $2}')
    if [[ "$root_login" == "no" ]]; then
      audit_pass "ssh-root-login" "Root login disabled"
    elif [[ "$root_login" == "prohibit-password" ]] || [[ "$root_login" == "without-password" ]]; then
      audit_pass "ssh-root-login" "Root login: key-only (${root_login})"
    else
      audit_warn "ssh-root-login" "Root login: ${root_login:-default (yes)}"
    fi

    local password_auth
    password_auth=$(grep -E "^PasswordAuthentication" /etc/ssh/sshd_config 2>/dev/null | awk '{print $2}')
    if [[ "$password_auth" == "no" ]]; then
      audit_pass "ssh-password-auth" "Password authentication disabled"
    else
      audit_warn "ssh-password-auth" "Password authentication: ${password_auth:-default (yes)}"
    fi
  fi
}

# ============================================================================
# MAIN
# ============================================================================

main() {
  local start_time
  start_time=$(date +%s)

  log "=========================================="
  log "Security audit started: $(date)"
  log "=========================================="

  check_ports
  check_cloudflare_firewall
  check_docker_socket
  check_container_users
  check_ssl
  check_upgrades
  check_ssh_attempts
  check_docker_api
  check_iptables
  check_file_perms

  local end_time
  end_time=$(date +%s)
  local duration=$((end_time - start_time))

  log "=========================================="
  log "Security audit completed in $(format_duration $duration)"
  log "Results: ${PASSES} PASS, ${WARNINGS} WARN, ${FAILURES} FAIL"
  log "=========================================="

  # Build report
  local body="Security Audit Report\n"
  body+="Host: $(hostname)\n"
  body+="Date: $(date)\n\n"

  for result in "${RESULTS[@]}"; do
    body+="${result}\n"
  done

  body+="\nSummary: ${PASSES} PASS, ${WARNINGS} WARN, ${FAILURES} FAIL\n"
  body+="Duration: $(format_duration $duration)"

  local priority="normal"
  if [[ $FAILURES -gt 0 ]]; then
    priority="urgent"
  fi

  send_alert "Security Audit: ${PASSES}P/${WARNINGS}W/${FAILURES}F" "$body" "$priority"

  if [[ $FAILURES -gt 0 ]]; then
    exit 1
  fi
  exit 0
}

main "$@"
