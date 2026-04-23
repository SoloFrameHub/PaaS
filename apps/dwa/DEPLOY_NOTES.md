# Deployment Configuration Notes

## Dokploy Environment Variables

**CRITICAL:** Set these in Dokploy UI for production:

### MAIA_URL (Required for Crisis Detection)
```
MAIA_URL=http://maia:8001
```

**Why:** The main Next.js app needs to communicate with the Maia AI classifier service (distress detection) via Docker's internal network. The service name `maia` comes from `services/maia/docker-compose-dokploy.yml`.

**Audit Finding #1:** Without this, crisis detection silently fails and returns `{level:'none', crisis:false}` for all content.

---

## Database Migration

The Docker entrypoint (`scripts/docker-entrypoint.js`) automatically runs database migrations on every deployment. This includes:

- ✅ All base tables (user, session, profile, etc.)
- ✅ Provider portal tables
- ✅ Distress event table
- ✅ **Maia AI Classification Layer (4 tables):**
  - `ai_classification_event` - unified audit log
  - `forum_topic_classification` - forum routing
  - `content_quality_score` - lesson quality tracking
  - `content_atomization_tag` - marketing content extraction
- ✅ HIPAA compliance fixes (FK cascade → set null)

**No manual migration needed** - just push to main and Dokploy auto-deploys.

---

## Maia Service Deployment

The Maia service is deployed separately in Dokploy using:
- `services/maia/docker-compose-dokploy.yml`
- Exposed on port 8001
- Connected to `dokploy-network`
- Health check: `http://localhost:8001/health`

---

## Production Checklist

Before marking deployment complete:

1. ✅ Set `MAIA_URL=http://maia:8001` in Dokploy
2. ✅ Verify Maia service is running (`http://maia:8001/health`)
3. ✅ Check `/api/health` returns 200
4. ✅ Test distress classification: POST `/api/safety/classify`
5. ✅ Verify database tables exist (run `\dt` in Postgres)
