#!/bin/bash
set -e

# Deploy distress classifier to VPS
# Run from project root: bash deploy-classifier.sh

echo "=== Deploying Distress Classifier to VPS ==="

VPS_HOST="root@46.202.88.248"
VPS_PASS="scJx4BdYgGBgMuuDrja86#"
REMOTE_DIR="/opt/distress-classifier"

# Check if sshpass is installed
if ! command -v sshpass &> /dev/null; then
    echo "Installing sshpass..."
    brew install hudochenkov/sshpass/sshpass
fi

# 1. Create directory structure on VPS
echo "→ Creating directory on VPS..."
sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no "$VPS_HOST" "mkdir -p $REMOTE_DIR"

# 2. Copy service files (not the model - too big)
echo "→ Copying service files..."
sshpass -p "$VPS_PASS" scp -o StrictHostKeyChecking=no \
    services/distress-classifier/app.py \
    services/distress-classifier/requirements.txt \
    services/distress-classifier/finetune.py \
    services/distress-classifier/evaluate.py \
    services/distress-classifier/metrics.json \
    "$VPS_HOST:$REMOTE_DIR/"

# 3. Install Python and dependencies
echo "→ Installing dependencies on VPS..."
sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no "$VPS_HOST" << 'ENDSSH'
set -e
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
sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no "$VPS_HOST" << 'ENDSSH'
cat > /etc/systemd/system/distress-classifier.service << 'EOF'
[Unit]
Description=Mental Health Distress Classifier
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=5
User=root
WorkingDirectory=/opt/distress-classifier
ExecStart=/opt/distress-classifier/venv/bin/python app.py
StandardOutput=append:/opt/distress-classifier/classifier.log
StandardError=append:/opt/distress-classifier/classifier.log
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable distress-classifier
echo "✓ Systemd service created"
ENDSSH

# 5. Start the service
echo "→ Starting classifier service..."
sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no "$VPS_HOST" << 'ENDSSH'
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
sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no "$VPS_HOST" << 'ENDSSH'
curl -s -X POST http://localhost:8001/classify \
  -H "Content-Type: application/json" \
  -d '{"text": "I feel completely hopeless and cannot go on anymore"}' | python3 -m json.tool
ENDSSH

echo ""
echo "=== ✓ Deployment Complete ==="
echo ""
echo "Service status: ssh root@46.202.88.248 'systemctl status distress-classifier'"
echo "View logs:      ssh root@46.202.88.248 'tail -f /opt/distress-classifier/classifier.log'"
echo ""
echo "Next step: Add DISTRESS_CLASSIFIER_URL=http://localhost:8001 to Dokploy env vars"
