#!/usr/bin/env bash
# cloudflare-firewall.sh — Lock down VPS to Cloudflare-only access
#
# What it does:
#   1. Allows SSH (port 22) from anywhere (safety net)
#   2. Restricts ports 80/443 to Cloudflare IPs only (via DOCKER-USER + INPUT)
#   3. Blocks external access to Dokploy panel (3000) and MinIO (9010/9011)
#   4. Installs a cron job to refresh Cloudflare IPs weekly
#   5. Saves rules persistently via iptables-persistent
#
# Usage:
#   scp scripts/cloudflare-firewall.sh root@46.202.88.248:/root/
#   ssh root@46.202.88.248 'chmod +x /root/cloudflare-firewall.sh && /root/cloudflare-firewall.sh apply'
#
# Commands:
#   apply     — Apply firewall rules (with 5-min auto-rollback safety)
#   confirm   — Confirm rules are working (cancels auto-rollback)
#   rollback  — Immediately restore previous rules
#   refresh   — Re-fetch Cloudflare IPs and update rules (for cron)
#   status    — Show current firewall state
#   disable   — Remove all custom rules

set -euo pipefail

CLOUDFLARE_IPS_V4_URL="https://www.cloudflare.com/ips-v4"
CLOUDFLARE_IPS_V6_URL="https://www.cloudflare.com/ips-v6"
BACKUP_DIR="/root/.firewall-backup"
CF_IPS_FILE="/etc/cloudflare-ips.txt"
CHAIN_NAME="CLOUDFLARE-ONLY"
DOCKER_CHAIN="DOCKER-USER"
ROLLBACK_TIMER=300  # 5 minutes
ROLLBACK_MARKER="/tmp/.firewall-rollback-pending"

# Ports to block from external access (Docker-published)
BLOCKED_DOCKER_PORTS=(3000 9010 9011)

# Internal networks that should always have access
INTERNAL_NETS=("127.0.0.0/8" "10.0.0.0/8" "172.16.0.0/12" "192.168.0.0/16")

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
die() { log "ERROR: $*" >&2; exit 1; }

require_root() {
    [[ $EUID -eq 0 ]] || die "Must run as root"
}

fetch_cloudflare_ips() {
    log "Fetching Cloudflare IP ranges..."
    local tmpfile
    tmpfile=$(mktemp)

    if ! curl -sf --max-time 15 "$CLOUDFLARE_IPS_V4_URL" > "$tmpfile"; then
        die "Failed to fetch Cloudflare IPv4 ranges"
    fi

    # Validate — should be CIDR ranges, at least 10 lines
    local count
    count=$(grep -cE '^[0-9]+\.' "$tmpfile" || true)
    if [[ $count -lt 10 ]]; then
        rm -f "$tmpfile"
        die "Cloudflare IP list looks wrong (only $count entries). Aborting."
    fi

    # Append IPv6 (best-effort, don't fail if unavailable)
    curl -sf --max-time 15 "$CLOUDFLARE_IPS_V6_URL" >> "$tmpfile" 2>/dev/null || true

    mv "$tmpfile" "$CF_IPS_FILE"
    log "Saved $(wc -l < "$CF_IPS_FILE") Cloudflare IP ranges to $CF_IPS_FILE"
}

backup_rules() {
    mkdir -p "$BACKUP_DIR"
    iptables-save > "$BACKUP_DIR/iptables.rules.bak"
    ip6tables-save > "$BACKUP_DIR/ip6tables.rules.bak" 2>/dev/null || true
    log "Backed up current iptables rules to $BACKUP_DIR/"
}

restore_rules() {
    if [[ -f "$BACKUP_DIR/iptables.rules.bak" ]]; then
        iptables-restore < "$BACKUP_DIR/iptables.rules.bak"
        ip6tables-restore < "$BACKUP_DIR/ip6tables.rules.bak" 2>/dev/null || true
        log "Restored previous iptables rules"
    else
        die "No backup found at $BACKUP_DIR/"
    fi
}

flush_custom_rules() {
    # Remove our custom chain from INPUT
    iptables -D INPUT -j "$CHAIN_NAME" 2>/dev/null || true
    iptables -F "$CHAIN_NAME" 2>/dev/null || true
    iptables -X "$CHAIN_NAME" 2>/dev/null || true

    ip6tables -D INPUT -j "$CHAIN_NAME" 2>/dev/null || true
    ip6tables -F "$CHAIN_NAME" 2>/dev/null || true
    ip6tables -X "$CHAIN_NAME" 2>/dev/null || true

    # Remove DOCKER-USER rules (tagged with our comment)
    # Clear all rules we added — iterate in reverse to avoid index shifts
    local rule_nums
    rule_nums=$(iptables -L "$DOCKER_CHAIN" --line-numbers -n 2>/dev/null \
        | grep "CF-FIREWALL" | awk '{print $1}' | sort -rn) || true
    for num in $rule_nums; do
        iptables -D "$DOCKER_CHAIN" "$num" 2>/dev/null || true
    done
}

apply_rules() {
    log "Applying firewall rules..."

    [[ -f "$CF_IPS_FILE" ]] || die "$CF_IPS_FILE not found. Run with 'refresh' first."

    # --- INPUT chain: Cloudflare-only for 80/443 ---
    iptables -N "$CHAIN_NAME" 2>/dev/null || iptables -F "$CHAIN_NAME"

    # Always allow established connections and loopback
    iptables -A "$CHAIN_NAME" -m state --state ESTABLISHED,RELATED -j RETURN
    iptables -A "$CHAIN_NAME" -i lo -j RETURN

    # Allow SSH from anywhere (safety net — never lock yourself out)
    iptables -A "$CHAIN_NAME" -p tcp --dport 22 -j RETURN

    # Allow Cloudflare IPs to ports 80/443
    while IFS= read -r cidr; do
        [[ -z "$cidr" || "$cidr" =~ ^# ]] && continue
        # Skip IPv6 ranges for iptables (handle with ip6tables)
        if [[ "$cidr" =~ : ]]; then
            continue
        fi
        iptables -A "$CHAIN_NAME" -s "$cidr" -p tcp -m multiport --dports 80,443 -j RETURN
    done < "$CF_IPS_FILE"

    # Drop non-Cloudflare traffic to 80/443
    iptables -A "$CHAIN_NAME" -p tcp -m multiport --dports 80,443 \
        -j DROP -m comment --comment "CF-FIREWALL: non-CF traffic blocked"

    # Insert our chain at the top of INPUT (if not already there)
    if ! iptables -C INPUT -j "$CHAIN_NAME" 2>/dev/null; then
        iptables -I INPUT 1 -j "$CHAIN_NAME"
    fi

    # --- IPv6: same logic ---
    ip6tables -N "$CHAIN_NAME" 2>/dev/null || ip6tables -F "$CHAIN_NAME"
    ip6tables -A "$CHAIN_NAME" -m state --state ESTABLISHED,RELATED -j RETURN
    ip6tables -A "$CHAIN_NAME" -i lo -j RETURN
    ip6tables -A "$CHAIN_NAME" -p tcp --dport 22 -j RETURN

    while IFS= read -r cidr; do
        [[ -z "$cidr" || "$cidr" =~ ^# ]] && continue
        [[ "$cidr" =~ : ]] || continue  # Only IPv6 here
        ip6tables -A "$CHAIN_NAME" -s "$cidr" -p tcp -m multiport --dports 80,443 -j RETURN
    done < "$CF_IPS_FILE"

    ip6tables -A "$CHAIN_NAME" -p tcp -m multiport --dports 80,443 \
        -j DROP -m comment --comment "CF-FIREWALL: non-CF traffic blocked"

    if ! ip6tables -C INPUT -j "$CHAIN_NAME" 2>/dev/null; then
        ip6tables -I INPUT 1 -j "$CHAIN_NAME"
    fi

    # --- DOCKER-USER chain: block external access to internal services ---
    # Docker bypasses INPUT chain, so we must use DOCKER-USER
    if iptables -L "$DOCKER_CHAIN" -n &>/dev/null; then
        for port in "${BLOCKED_DOCKER_PORTS[@]}"; do
            # Allow internal networks
            for net in "${INTERNAL_NETS[@]}"; do
                iptables -I "$DOCKER_CHAIN" 1 -s "$net" -p tcp --dport "$port" \
                    -j ACCEPT -m comment --comment "CF-FIREWALL: internal access port $port"
            done
            # Allow Docker bridge networks (containers talking to each other)
            iptables -I "$DOCKER_CHAIN" -i br+ -p tcp --dport "$port" \
                -j ACCEPT -m comment --comment "CF-FIREWALL: docker bridge port $port"
            # Drop everything else to this port
            iptables -A "$DOCKER_CHAIN" -p tcp --dport "$port" \
                -j DROP -m comment --comment "CF-FIREWALL: block external port $port"
        done
        log "Blocked external access to Docker ports: ${BLOCKED_DOCKER_PORTS[*]}"
    else
        log "WARNING: $DOCKER_CHAIN chain not found — Docker may not be running"
    fi

    log "Firewall rules applied successfully"
}

save_persistent() {
    if command -v netfilter-persistent &>/dev/null; then
        netfilter-persistent save
        log "Rules saved via netfilter-persistent"
    elif command -v iptables-save &>/dev/null; then
        iptables-save > /etc/iptables/rules.v4 2>/dev/null || \
            iptables-save > /etc/iptables.rules 2>/dev/null || true
        ip6tables-save > /etc/iptables/rules.v6 2>/dev/null || \
            ip6tables-save > /etc/ip6tables.rules 2>/dev/null || true
        log "Rules saved to /etc/iptables/"
    else
        log "WARNING: Install iptables-persistent for rules to survive reboot"
        log "  apt install -y iptables-persistent"
    fi
}

install_cron() {
    local cron_line="0 3 * * 0 /root/cloudflare-firewall.sh refresh >> /var/log/cloudflare-firewall.log 2>&1"
    if ! crontab -l 2>/dev/null | grep -qF "cloudflare-firewall.sh"; then
        (crontab -l 2>/dev/null; echo "$cron_line") | crontab -
        log "Installed weekly cron job (Sunday 3am) to refresh Cloudflare IPs"
    else
        log "Cron job already installed"
    fi
}

schedule_rollback() {
    log "SAFETY: Auto-rollback in ${ROLLBACK_TIMER}s if not confirmed"
    log "  Run: $0 confirm"
    touch "$ROLLBACK_MARKER"
    # Schedule rollback in background
    (
        sleep "$ROLLBACK_TIMER"
        if [[ -f "$ROLLBACK_MARKER" ]]; then
            echo "[$(date '+%Y-%m-%d %H:%M:%S')] Auto-rollback triggered — rules not confirmed" >> /var/log/cloudflare-firewall.log
            restore_rules
            rm -f "$ROLLBACK_MARKER"
        fi
    ) &
    disown
}

cmd_apply() {
    require_root
    fetch_cloudflare_ips
    backup_rules
    flush_custom_rules
    apply_rules
    schedule_rollback

    echo ""
    echo "============================================"
    echo "  FIREWALL APPLIED — VERIFY ACCESS NOW"
    echo "============================================"
    echo ""
    echo "  1. Test SSH still works (open a NEW terminal):"
    echo "     ssh root@46.202.88.248"
    echo ""
    echo "  2. Then confirm to make permanent:"
    echo "     /root/cloudflare-firewall.sh confirm"
    echo ""
    echo "  Auto-rollback in ${ROLLBACK_TIMER}s if not confirmed."
    echo "============================================"
}

cmd_confirm() {
    require_root
    if [[ -f "$ROLLBACK_MARKER" ]]; then
        rm -f "$ROLLBACK_MARKER"
        save_persistent
        install_cron
        log "Firewall rules confirmed and saved permanently"
    else
        log "No pending rollback to confirm"
    fi
}

cmd_rollback() {
    require_root
    rm -f "$ROLLBACK_MARKER"
    restore_rules
    save_persistent
    log "Rolled back to previous rules"
}

cmd_refresh() {
    require_root
    fetch_cloudflare_ips
    flush_custom_rules
    apply_rules
    save_persistent
    log "Cloudflare IPs refreshed and rules updated"
}

cmd_status() {
    require_root
    echo "=== CLOUDFLARE-ONLY chain (INPUT) ==="
    iptables -L "$CHAIN_NAME" -n --line-numbers 2>/dev/null || echo "(not created)"
    echo ""
    echo "=== DOCKER-USER rules (CF-FIREWALL tagged) ==="
    iptables -L "$DOCKER_CHAIN" -n --line-numbers 2>/dev/null | grep -E "(num|CF-FIREWALL)" || echo "(none)"
    echo ""
    echo "=== Cloudflare IPs loaded ==="
    [[ -f "$CF_IPS_FILE" ]] && wc -l < "$CF_IPS_FILE" || echo "none"
    echo ""
    echo "=== Cron job ==="
    crontab -l 2>/dev/null | grep "cloudflare-firewall" || echo "(not installed)"
    echo ""
    if [[ -f "$ROLLBACK_MARKER" ]]; then
        echo "WARNING: Rollback is PENDING — run '$0 confirm' to keep rules"
    fi
}

cmd_disable() {
    require_root
    flush_custom_rules
    save_persistent
    log "All custom firewall rules removed"
}

# --- Main ---
case "${1:-help}" in
    apply)   cmd_apply ;;
    confirm) cmd_confirm ;;
    rollback) cmd_rollback ;;
    refresh) cmd_refresh ;;
    status)  cmd_status ;;
    disable) cmd_disable ;;
    *)
        echo "Usage: $0 {apply|confirm|rollback|refresh|status|disable}"
        echo ""
        echo "  apply     Apply rules (with 5-min auto-rollback safety net)"
        echo "  confirm   Confirm rules work, save permanently"
        echo "  rollback  Restore previous rules immediately"
        echo "  refresh   Re-fetch Cloudflare IPs and update (for cron)"
        echo "  status    Show current firewall state"
        echo "  disable   Remove all custom rules"
        ;;
esac
