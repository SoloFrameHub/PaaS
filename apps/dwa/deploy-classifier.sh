#!/bin/bash
set -euo pipefail

# Deploy distress classifier to a VPS via SSH + rsync.
# Run from apps/dwa: bash deploy-classifier.sh
#
# Required environment variables:
#   CLASSIFIER_SSH_HOST   e.g. root@vps.example.com
#   CLASSIFIER_REMOTE_DIR e.g. /opt/distress-classifier   (optional, defaults below)
#
# Authentication:
#   SSH key only (SSH_AUTH_SOCK / ~/.ssh/config). Password auth is NOT used;
#   the previous sshpass-based flow was removed because it committed a
#   plaintext root password into the repo (B-049).
#
# Host key verification:
#   The VPS's host key MUST be in ~/.ssh/known_hosts before running this
#   script. The previous `StrictHostKeyChecking=no` + `UserKnownHostsFile=/dev/null`
#   shortcut meant any MITM on the first connection would silently succeed.
#   Prime the host key once with:   ssh-keyscan "$host" >> ~/.ssh/known_hosts
#   after verifying the fingerprint out-of-band.

: "${CLASSIFIER_SSH_HOST:?Set CLASSIFIER_SSH_HOST (e.g. root@vps.example.com)}"
REMOTE_DIR="${CLASSIFIER_REMOTE_DIR:-/opt/distress-classifier}"

echo "=== Deploying Distress Classifier to $CLASSIFIER_SSH_HOST ==="

# 1. Create directory structure on VPS
echo "→ Creating directory on VPS..."
ssh "$CLASSIFIER_SSH_HOST" "mkdir -p $REMOTE_DIR"

# 2. Copy service files (not the model — too big; use deploy-classifier-with-model.sh for that)
echo "→ Copying service files..."
scp \
    services/distress-classifier/app.py \
    services/distress-classifier/requirements.txt \
    services/distress-classifier/finetune.py \
    services/distress-classifier/evaluate.py \
    services/distress-classifier/metrics.json \
    "$CLASSIFIER_SSH_HOST:$REMOTE_DIR/"

# 3. Install Python and dependencies
echo "→ Installing dependencies on VPS..."
ssh "$CLASSIFIER_SSH_HOST" bash -s <<'ENDSSH'
set -euo pipefail
cd /opt/distress-classifier

# Install Python 3.11 if needed
if ! python3.11 --version &>/dev/null; then
  echo "Installing Python 3.11..."
  apt-get update -q && apt-get install -y python3.11 python3.11-venv python3.11-dev
fi
echo "Python: $(python3.11 --version)"

# Create virtual environment
if [ ! -d venv ]; then
  python3.11 -m venv venv
fi

# Install dependencies
source venv/bin/activate
pip install -q --upgrade pip
pip install -q -r requirements.txt
echo "✓ Dependencies installed"
ENDSSH

# 4. Create systemd service
echo "→ Creating systemd service..."
ssh "$CLASSIFIER_SSH_HOST" bash -s <<'ENDSSH'
set -euo pipefail
cat > /etc/systemd/system/distress-classifier.service <<'EOF'
[Unit]
Description=Mental Health Distress Classifier
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=5
# Run as a non-root service user; create it if missing.
User=distress-classifier
WorkingDirectory=/opt/distress-classifier
ExecStart=/opt/distress-classifier/venv/bin/python app.py
StandardOutput=append:/opt/distress-classifier/classifier.log
StandardError=append:/opt/distress-classifier/classifier.log
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
EOF

if ! id -u distress-classifier >/dev/null 2>&1; then
  useradd --system --home-dir /opt/distress-classifier --shell /usr/sbin/nologin distress-classifier
fi
chown -R distress-classifier:distress-classifier /opt/distress-classifier

systemctl daemon-reload
systemctl enable distress-classifier
echo "✓ Systemd service created"
ENDSSH

# 5. Start the service
echo "→ Starting classifier service..."
ssh "$CLASSIFIER_SSH_HOST" bash -s <<'ENDSSH'
set -euo pipefail
# Stop any existing instance
systemctl stop distress-classifier 2>/dev/null || true

# Start with base model (will download on first run)
systemctl start distress-classifier

# Wait for startup
sleep 15

# Health check
echo "→ Running health check..."
for i in 1 2 3 4 5; do
  response=$(curl -s --connect-timeout 5 http://localhost:8001/health 2>/dev/null || echo "")
  if echo "$response" | grep -q '"status":"ok"'; then
    echo "✓ Classifier is running!"
    echo "$response" | python3 -m json.tool
    break
  fi
  echo "Waiting... attempt $i/5"
  sleep 10
done
ENDSSH

# 6. Test classification
echo ""
echo "→ Testing classification..."
ssh "$CLASSIFIER_SSH_HOST" bash -s <<'ENDSSH'
curl -s -X POST http://localhost:8001/classify \
  -H "Content-Type: application/json" \
  -d '{"text": "I feel completely hopeless and cannot go on anymore"}' | python3 -m json.tool
ENDSSH

echo ""
echo "=== ✓ Deployment Complete ==="
echo ""
echo "Service status: ssh $CLASSIFIER_SSH_HOST 'systemctl status distress-classifier'"
echo "View logs:      ssh $CLASSIFIER_SSH_HOST 'tail -f $REMOTE_DIR/classifier.log'"
echo ""
echo "Next step: Add DISTRESS_CLASSIFIER_URL=http://localhost:8001 to Dokploy env vars"
