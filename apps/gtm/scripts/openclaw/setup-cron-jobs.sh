#!/usr/bin/env bash
# Setup OpenClaw cron jobs for CAA platform automation.
# Run after OpenClaw gateway is started and onboarding is complete.
#
# Usage: ./setup-cron-jobs.sh
# Requires: openclaw CLI available (docker exec or direct)

set -euo pipefail

OPENCLAW_CMD="${OPENCLAW_CMD:-docker compose exec openclaw-gateway openclaw}"
CAA_URL="${CAA_API_URL:-https://ai-solo-gtm-os.soloframehub.com}"

echo "Setting up OpenClaw cron jobs for CAA..."

# 1. Facilitator Rhythm — Mon/Wed/Fri at 8 AM UTC
$OPENCLAW_CMD cron add \
  --name "caa-facilitator-rhythm" \
  --cron "0 8 * * 1,3,5" \
  --tz "UTC" \
  --session isolated \
  --message "Run the caa-facilitator-rhythm skill: POST ${CAA_URL}/api/admin/facilitator with x-admin-secret header" \
  --delivery webhook \
  --to "${CAA_URL}/api/health"
echo "  [+] facilitator-rhythm (Mon/Wed/Fri 8am UTC)"

# 2. Forum Sync — Daily at 2 AM UTC
$OPENCLAW_CMD cron add \
  --name "caa-forum-sync" \
  --cron "0 2 * * *" \
  --tz "UTC" \
  --session isolated \
  --message "Run the caa-forum-sync skill: POST ${CAA_URL}/api/admin/forum-sync with x-admin-secret header"
echo "  [+] forum-sync (daily 2am UTC)"

# 3. Health Check — Every 15 minutes
$OPENCLAW_CMD cron add \
  --name "caa-health-check" \
  --cron "*/15 * * * *" \
  --tz "UTC" \
  --session isolated \
  --message "Check CAA health: curl -sf ${CAA_URL}/api/health. Report only on failure." \
  --thinking low \
  --light-context
echo "  [+] health-check (every 15min)"

# 4. Weekly Progress Report — Monday 9 AM UTC
$OPENCLAW_CMD cron add \
  --name "caa-weekly-progress" \
  --cron "0 9 * * 1" \
  --tz "UTC" \
  --session isolated \
  --message "Run the caa-weekly-progress skill: POST ${CAA_URL}/api/admin/weekly-progress with x-admin-secret header"
echo "  [+] weekly-progress (Mon 9am UTC)"

# 5. Readiness Follow-up — Daily at 10 AM UTC
$OPENCLAW_CMD cron add \
  --name "caa-readiness-followup" \
  --cron "0 10 * * *" \
  --tz "UTC" \
  --session isolated \
  --message "Run the caa-readiness-followup skill: POST ${CAA_URL}/api/admin/readiness-followup with x-admin-secret header"
echo "  [+] readiness-followup (daily 10am UTC)"

echo ""
echo "All cron jobs created. Verify with:"
echo "  $OPENCLAW_CMD cron list"
