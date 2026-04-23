# Operations Runbook

**For anyone maintaining the Customer Acquisition Academy platform.**
**Last Updated:** 2026-02-20

---

## 1. Architecture Overview

Everything runs on a single VPS (`46.202.88.248`) managed by Dokploy. Pushing to `main` on GitHub auto-deploys the app.

```
GitHub (main branch)
    │ push
    ▼
Dokploy (container orchestrator)
    │ builds Docker image, deploys
    ▼
┌─────────────────────────────────────────────┐
│  VPS: 46.202.88.248                         │
│                                             │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  │
│  │ CAA App  │  │ Postgres │  │   Redis   │  │
│  │ (Next.js)│  │ (data)   │  │  (cache)  │  │
│  │ :3000    │  │ :5432    │  │  :6379    │  │
│  └─────────┘  └──────────┘  └───────────┘  │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐ │
│  │ NodeBB   │  │ Metabase │  │ Listmonk  │ │
│  │ (forum)  │  │(analytics)│  │ (email)   │ │
│  └──────────┘  └──────────┘  └───────────┘ │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐ │
│  │   n8n    │  │  MinIO   │  │  Traefik  │ │
│  │(workflow) │  │ (storage)│  │ (routing) │ │
│  └──────────┘  └──────────┘  └───────────┘ │
│                                             │
│  Traefik handles SSL + routing for all      │
│  subdomains via Let's Encrypt               │
└─────────────────────────────────────────────┘
         │
    Cloudflare (DNS proxy)
         │
    *.soloframehub.com
```

---

## 2. Common Operations

### Deploy a Code Change

The normal flow — make changes, push, it auto-deploys:

```bash
# On your dev machine
git add <files>
git commit -m "description of changes"
git push origin main
# Dokploy detects the push and rebuilds automatically
```

If pushing from the VPS (no stored credentials):
```bash
# Temporarily add PAT to remote URL
git remote set-url origin https://<GITHUB_PAT>@github.com/SoloFrameHub/customer-acquisition-academy-vps.git
git push origin main
# ALWAYS clean up immediately
git remote set-url origin https://github.com/SoloFrameHub/customer-acquisition-academy-vps.git
```

### Force Redeploy (No Code Change)

Via Dokploy UI:
1. Go to `http://46.202.88.248:3000`
2. Find the CAA application
3. Click "Deploy" or "Rebuild"

Via API:
```bash
curl -X POST http://46.202.88.248:3000/api/application.deploy \
  -H "x-api-key: <DOKPLOY_DEPLOY_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"applicationId": "7tDDUfiTNW_hchmoz9qsD"}'
```

### Restart the App (Without Rebuild)

```bash
ssh root@46.202.88.248
docker restart $(docker ps -q --filter "name=app-override-solid-state-panel")
```

### View App Logs

```bash
ssh root@46.202.88.248
docker logs --tail 100 -f $(docker ps -q --filter "name=app-override-solid-state-panel")
```

### Check if Everything is Running

```bash
ssh root@46.202.88.248
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

Or run the health check script:
```bash
ssh root@46.202.88.248
/root/ops/health-check.sh
```

---

## 3. Environment Variables

Environment variables are set in two places:

### Dokploy (Production)
All runtime secrets live here. To view/edit:
1. Open `http://46.202.88.248:3000`
2. Navigate to the CAA application
3. Go to "Environment" tab
4. Edit variables and redeploy

Or via API:
```bash
# Get current env vars
curl -X POST http://46.202.88.248:3000/api/application.one \
  -H "x-api-key: <DOKPLOY_DEPLOY_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"applicationId": "7tDDUfiTNW_hchmoz9qsD"}' | jq '.env'

# Update env vars (replaces ALL env vars — include existing ones)
curl -X POST http://46.202.88.248:3000/api/application.update \
  -H "x-api-key: <DOKPLOY_DEPLOY_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"applicationId": "7tDDUfiTNW_hchmoz9qsD", "env": "KEY=value\nKEY2=value2"}'
```

### .env.local (Local Development)
For running locally. Contains `OPENROUTER_API_KEY`, model overrides, and `DOKPLOY_DEPLOY_API_KEY`. See `SUCCESSION-ACCESS-CREDENTIALS.md` for values.

---

## 4. Database Operations

### Connect to PostgreSQL

```bash
ssh root@46.202.88.248

# Find the postgres container
docker ps --filter "name=postgres-reboot"

# Connect with psql
docker exec -it $(docker ps -q --filter "name=postgres-reboot") psql -U <DB_USER> -d <DB_NAME>
```

The `DATABASE_URL` in Dokploy env vars has the full connection string.

### Run Migrations

Migrations run automatically on container start via `scripts/docker-entrypoint.js`. To run manually:

```bash
ssh root@46.202.88.248
docker exec -it $(docker ps -q --filter "name=app-override-solid-state-panel") node scripts/docker-entrypoint.js
```

### Quick Database Queries

```sql
-- Count users
SELECT count(*) FROM "user";

-- Check recent signups
SELECT id, email, email_verified, created_at FROM "user" ORDER BY created_at DESC LIMIT 10;

-- Check active subscriptions
SELECT * FROM subscription WHERE status = 'active';

-- Check recent AI chat sessions
SELECT cs.id, cs.user_id, cs.message_count, cs.created_at
FROM chat_session cs ORDER BY created_at DESC LIMIT 10;
```

---

## 5. Backups

### Automated Backups
Daily at 2 AM via cron. Backs up PostgreSQL, Redis, MinIO, and Dokploy config.

- **Local retention:** 7 days at `/backups/`
- **Offsite retention:** 30 days at `s3://soloframehub-backups/`

### Manual Backup

```bash
ssh root@46.202.88.248
/root/ops/backup.sh
```

### Restore from Backup

```bash
# List available backups
/root/ops/restore.sh --list

# Restore PostgreSQL from local backup
/root/ops/restore.sh <TIMESTAMP> caa-postgres

# Restore from S3
/root/ops/restore.sh --remote <TIMESTAMP> caa-postgres
```

### Verify Backups Are Running

```bash
ls -la /backups/ | head -20
# Should see recent dated directories
```

---

## 6. Troubleshooting

### App Won't Start

1. **Check container logs:**
   ```bash
   docker logs --tail 200 $(docker ps -aq --filter "name=app-override-solid-state-panel" | head -1)
   ```

2. **Check if database is up:**
   ```bash
   docker ps --filter "name=postgres-reboot"
   # If not running, restart it from Dokploy UI
   ```

3. **Check disk space:**
   ```bash
   df -h /
   # If >90% full, clean Docker:
   docker system prune -f
   ```

4. **Check memory:**
   ```bash
   free -h
   # If low, check for runaway containers:
   docker stats --no-stream
   ```

### AI Features Not Working

1. **Check OpenRouter key is set** in Dokploy env vars (`OPENROUTER_API_KEY`)
2. **Check OpenRouter balance** at `https://openrouter.ai/settings/credits`
3. **Check logs for errors:**
   ```bash
   docker logs $(docker ps -q --filter "name=app-override") 2>&1 | grep -i "ai\|openai\|openrouter" | tail -20
   ```
4. **Voice not working?** Check `OPENAI_API_KEY` is set (voice uses direct OpenAI, not OpenRouter)

### Emails Not Sending

1. **Check Resend dashboard** at `https://resend.com` for delivery status
2. **Check `RESEND_API_KEY`** is set in Dokploy env vars
3. **Check DNS:** Verify `mail.soloframehub.com` MX/DKIM/SPF records in Cloudflare
4. **Check logs:**
   ```bash
   docker logs $(docker ps -q --filter "name=app-override") 2>&1 | grep -i "resend\|email\|verification" | tail -20
   ```

### Payments Not Working

1. **Check Polar mode:** `POLAR_MODE` should be `production` for real payments (currently `sandbox`)
2. **Check webhook:** Verify webhook URL in Polar dashboard points to `https://ai-solo-gtm-os.soloframehub.com/api/webhook/polar`
3. **Check `POLAR_WEBHOOK_SECRET`** matches what's in Polar dashboard
4. **Check logs:**
   ```bash
   docker logs $(docker ps -q --filter "name=app-override") 2>&1 | grep -i "polar\|webhook\|subscription" | tail -20
   ```

### Forum Not Syncing

1. **Check NodeBB is running:** Visit `https://ai-caa-forum.soloframehub.com`
2. **Check `NODEBB_URL` and `NODEBB_API_KEY`** in Dokploy env vars
3. **Trigger manual sync:**
   ```bash
   curl -X POST https://ai-solo-gtm-os.soloframehub.com/api/admin/forum-sync \
     -H "Authorization: Bearer <ADMIN_API_SECRET>"
   ```

### SSL Certificate Issues

Traefik handles Let's Encrypt certificates automatically. If a cert expires:
1. Check Traefik logs in Dokploy
2. Verify the domain's DNS points to `46.202.88.248` in Cloudflare
3. Restart Traefik from Dokploy if needed

---

## 7. Scaling Considerations

The platform currently runs on a single VPS. If it needs to scale:

- **More CPU/RAM:** Upgrade the Hostinger VPS plan
- **Database performance:** Add connection pooling (PgBouncer) or migrate to managed Postgres
- **Redis:** Currently optional; ensure it's enabled for production rate limiting
- **CDN:** Static assets are served through Cloudflare proxy
- **Separate services:** NodeBB, Metabase, and Listmonk could be moved to separate servers if the VPS runs out of resources

---

## 8. Monitoring & Alerts

### Health Check Endpoints
| Service | Health URL |
|---------|-----------|
| CAA App | `https://ai-solo-gtm-os.soloframehub.com/api/health` |
| Forum | `https://ai-caa-forum.soloframehub.com` |
| Metabase | `https://metabase.soloframehub.com` |
| Listmonk | `https://listmonk.soloframehub.com` |
| n8n | `https://n8n.soloframehub.com` |

### Alerts
Configured via ops scripts. Health check failures trigger email alerts via Resend.
- Alert cooldown: 1 hour per service
- Alert recipient: configured in `/root/.ops-secrets` (`ALERT_TO`)

### Cron Jobs
Installed via `scripts/ops/install-crons.sh`:
- **Daily 2 AM:** Full backup (Postgres, Redis, MinIO, Dokploy config)
- **Every 5 min:** Health checks on all services

---

## 9. Admin API Quick Reference

All admin endpoints require `Authorization: Bearer <ADMIN_API_SECRET>` header.

```bash
# List form submissions
curl -H "Authorization: Bearer <SECRET>" \
  "https://ai-solo-gtm-os.soloframehub.com/api/admin/forms?page=1&limit=20"

# Export submissions as CSV
curl -H "Authorization: Bearer <SECRET>" \
  "https://ai-solo-gtm-os.soloframehub.com/api/admin/forms/export?slug=beta-signup"

# Trigger forum sync
curl -X POST -H "Authorization: Bearer <SECRET>" \
  "https://ai-solo-gtm-os.soloframehub.com/api/admin/forum-sync"

# Trigger facilitator posts (used by n8n cron Mon/Wed/Fri)
curl -X POST -H "Authorization: Bearer <SECRET>" \
  -H "Content-Type: application/json" \
  -d '{"dayOfWeek": "monday"}' \
  "https://ai-solo-gtm-os.soloframehub.com/api/admin/facilitator"

# Initialize forum structure (one-time, idempotent)
curl -X POST -H "Authorization: Bearer <SECRET>" \
  "https://ai-solo-gtm-os.soloframehub.com/api/admin/forum-setup"
```

---

## 10. Disaster Recovery

### Total Platform Loss (Rebuild from Scratch)

1. Provision a new VPS (Ubuntu/Debian, 4+ GB RAM)
2. Install Dokploy: `curl -sSL https://dokploy.com/install.sh | sh`
3. Restore Dokploy config from backup
4. Set all env vars in Dokploy (see `SUCCESSION-ACCESS-CREDENTIALS.md`)
5. Update DNS in Cloudflare to point to new VPS IP
6. Restore PostgreSQL from backup
7. Push any code change to trigger a fresh deploy
8. Restore MinIO files from backup
9. Re-install cron jobs: `scripts/ops/install-crons.sh`
10. Verify all health check endpoints

### Database-Only Recovery

```bash
/root/ops/restore.sh <TIMESTAMP> caa-postgres
# Then restart the app container
docker restart $(docker ps -q --filter "name=app-override-solid-state-panel")
```

### Expected Recovery Times
- **App restart:** < 2 minutes
- **Database restore:** < 30 minutes (depends on data size)
- **Full platform rebuild:** 2-4 hours
