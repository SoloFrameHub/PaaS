#!/bin/bash
set -e

# Deploy distress classifier to VPS WITH fine-tuned model
# Run from project root: bash deploy-classifier-with-model.sh

echo "=== Deploying Distress Classifier (with fine-tuned model) to VPS ==="

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

# 2. Copy service files
echo "→ Copying service files..."
sshpass -p "$VPS_PASS" scp -o StrictHostKeyChecking=no \
    services/distress-classifier/app.py \
    services/distress-classifier/requirements.txt \
    services/distress-classifier/finetune.py \
    services/distress-classifier/evaluate.py \
    services/distress-classifier/metrics.json \
    "$VPS_HOST:$REMOTE_DIR/"

# 3. Copy the FINE-TUNED MODEL (only inference files, ~260MB - excludes training checkpoints)
echo "→ Copying fine-tuned model weights and config (260MB)..."
sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no "$VPS_HOST" "mkdir -p $REMOTE_DIR/model"
sshpass -p "$VPS_PASS" scp -o StrictHostKeyChecking=no \
    services/distress-classifier/model/model.safetensors \
    services/distress-classifier/model/config.json \
    services/distress-classifier/model/tokenizer.json \
    services/distress-classifier/model/tokenizer_config.json \
    services/distress-classifier/model/training_args.bin \
    "$VPS_HOST:$REMOTE_DIR/model/"
echo "✓ Fine-tuned model transferred (256MB - trained weights only, no training checkpoints)"

# 4. Install Python and dependencies
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

# 5. Create systemd service
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

# 6. Start the service
echo "→ Starting classifier service (with fine-tuned model)..."
sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no "$VPS_HOST" << 'ENDSSH'
# Stop any existing instance
systemctl stop distress-classifier 2>/dev/null || true

# Start with fine-tuned model
systemctl start distress-classifier

# Wait for startup
sleep 15

# Health check
echo "→ Running health check..."
for i in 1 2 3 4 5; do
  response=$(curl -s --connect-timeout 5 http://localhost:8001/health 2>/dev/null || echo "")
  if echo "$response" | grep -q '"status":"ok"'; then
    echo "✓ Classifier is running with fine-tuned model!"
    echo "$response" | python3 -m json.tool
    break
  fi
  echo "Waiting... attempt $i/5"
  sleep 10
done
ENDSSH

# 7. Test classification with a sample crisis-level input
echo ""
echo "→ Testing classification..."
sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no "$VPS_HOST" << 'ENDSSH'
curl -s -X POST http://localhost:8001/classify \
  -H "Content-Type: application/json" \
  -d '{"text": "I feel completely hopeless and cannot go on anymore"}' | python3 -m json.tool
ENDSSH

echo ""
echo "=== ✓ Deployment Complete with Fine-Tuned Model ==="
echo ""
echo "Service running: ssh root@46.202.88.248 'systemctl status distress-classifier'"
echo "View logs:      ssh root@46.202.88.248 'tail -f /opt/distress-classifier/classifier.log'"
echo "Test health:    ssh root@46.202.88.248 'curl http://localhost:8001/health'"
echo ""
echo "✓ Distress classifier is now accessible at http://localhost:8001 (internal VPS only)"
echo "✓ Dokploy env var should be: DISTRESS_CLASSIFIER_URL=http://localhost:8001"
echo ""
