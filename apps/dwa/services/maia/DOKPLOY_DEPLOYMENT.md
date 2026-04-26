# Maia Service Deployment Guide — Dokploy

## Why Deploy Maia?

The new Maia service replaces the old `distress-classifier` with a unified multi-classifier system:

**Old distress-classifier:**
- Single classifier (distress only)
- Endpoints: `/health`, `/classify`
- Does NOT support `/v1/health` or `/v1/classify/{classifier}`

**New Maia:**
- Four classifiers: distress, forum-topic, content-quality, content-atomization
- Backwards compatible: `/health`, `/classify` still work
- New unified API: `/v1/health`, `/v1/classify/{classifier}`
- Matches what `lib/ai/maia-client.ts` expects

---

## Pre-Deployment Checklist

- [ ] **Update MAIA_URL** in Dokploy (Next.js app environment variables):
  - Current: `http://distress-classifier:8001`
  - New: `http://maia:8001`
  - Redeploy Next.js app after changing
- [x] Code pushed to GitHub main branch
- [ ] Dokploy access ready
- [ ] Ready to stop old distress-classifier container

**Note:** You can update MAIA_URL before OR after deploying Maia. If you do it before, the Next.js app will show "unavailable" until Maia is deployed. If you do it after, the app will still connect to the old distress-classifier until you change it.

---

## Deployment Steps

### 1. Create New Dokploy Compose App

**In Dokploy UI:**

1. Navigate to your project
2. Click **"Create Service"** → **"Docker Compose"**
3. Configure:
   - **Name:** `maia`
   - **App Name (ID):** `maia` (used for Docker service DNS)
   - **Repository:** `https://github.com/SoloFrameHub/mental-health-education-platform`
   - **Branch:** `main`
   - **Compose Path:** `services/maia/docker-compose-dokploy.yml`
   - **Auto Deploy:** ✅ Enabled (deploys on push to main)

4. Click **"Create"**

### 2. Deploy Maia

1. In the new `maia` app, click **"Deploy"**
2. Wait for build to complete (~3-5 minutes)
   - Docker will pull Python 3.11 base image
   - Install dependencies (transformers, torch, fastapi)
   - Load 4 DistilBERT models (90 second start-period in healthcheck)
3. Monitor logs for:
   ```
   Maia starting — loading classifiers...
     [distress] ready
     [forum-topic] ready
     [content-quality] ready
     [content-atomization] ready
   Maia ready — 4/4 classifiers loaded
   ```

### 3. Verify Maia is Accessible

**SSH into VPS:**
```bash
# Use your SSH key and ~/.ssh/config — the previous sshpass+password pattern
# was removed because it committed a plaintext root password into the repo
# (B-049). Host key must be primed in ~/.ssh/known_hosts; do not add
# StrictHostKeyChecking=no.
ssh "$CLASSIFIER_SSH_HOST"
```

**Check service is running:**
```bash
docker ps | grep maia
```
Should show: `maia-classifier` container

**Check network alias:**
```bash
docker network inspect dokploy-network --format '{{json .Containers}}' | \
  jq -r 'to_entries[] | select(.value.Name | contains("maia")) | {Name: .value.Name, Aliases: .value}'
```
Should show DNS alias: `maia`

**Test health endpoint:**
```bash
docker exec maia-classifier curl -s http://localhost:8001/v1/health | jq '.'
```
Should return:
```json
{
  "status": "healthy",
  "classifiers": {
    "distress": { "name": "distress", "loaded": true, "model": "..." },
    "forum-topic": { "name": "forum-topic", "loaded": true, "model": "..." },
    "content-quality": { "name": "content-quality", "loaded": true, "model": "..." },
    "content-atomization": { "name": "content-atomization", "loaded": true, "model": "..." }
  },
  "total_loaded": 4,
  "total_registered": 4
}
```

### 4. Remove Old Distress-Classifier

**IMPORTANT:** Only do this AFTER verifying Maia is working!

```bash
# Stop old container
docker stop compose-bypass-open-source-alarm-1opms6-distress-classifier-1

# Remove it
docker rm compose-bypass-open-source-alarm-1opms6-distress-classifier-1
```

This frees up port 8001 conflict (though both use dokploy-network so no actual conflict).

### 5. Verify from Next.js App

**Check health endpoint:**
```bash
curl -s "https://mental-health-education.soloframehub.com/api/health?diag=maia" | jq '.checks.maia'
```

Should return: `"ok"` (not "unavailable")

**Full diagnostics:**
```bash
curl -s "https://mental-health-education.soloframehub.com/api/health?diag=maia" | jq '.'
```

Should show:
```json
{
  "checks": {
    "maia": "ok",
    "maia_classifiers": "4/4",
    "maia_url": "http://maia:8001"
  }
}
```

---

## Expected Results

✅ **Maia service running** on dokploy-network with DNS name `maia`  
✅ **Health check passing** at `/v1/health`  
✅ **4 classifiers loaded** (distress, forum-topic, content-quality, content-atomization)  
✅ **Next.js app connected** — no more "CRITICAL: Crisis detection offline"  
✅ **Old distress-classifier removed** — no port conflicts

---

## Troubleshooting

### Maia shows "unavailable" after deployment

**Check logs:**
```bash
docker logs maia-classifier --tail 50
```

Common issues:
- Models not loading (missing models/ directory in repo)
- Healthcheck timing out (increase start-period in docker-compose)
- Port 8001 conflict with old distress-classifier

### "No such container: maia-classifier"

Service name mismatch. Check:
```bash
docker ps | grep maia
```

If container has different name, update docker-compose-dokploy.yml:
```yaml
services:
  maia:
    container_name: maia-classifier  # Must match
```

### Next.js still shows "unavailable"

1. Verify MAIA_URL is set correctly:
   ```bash
   curl -s "https://mental-health-education.soloframehub.com/api/health?diag=maia" | jq '.checks.maia_url'
   ```
   Should be: `"http://maia:8001"`

2. Verify Maia is on dokploy-network:
   ```bash
   docker network inspect dokploy-network | grep -A 5 maia
   ```

3. Test connectivity from Next.js container:
   ```bash
   docker exec <nextjs-container-name> curl -s http://maia:8001/v1/health
   ```

---

## Rollback Plan

If Maia deployment fails:

1. **Restart old distress-classifier:**
   ```bash
   docker start compose-bypass-open-source-alarm-1opms6-distress-classifier-1
   ```

2. **Revert MAIA_URL in Dokploy:**
   - Change back to `http://distress-classifier:8001`
   - Redeploy Next.js app

3. **Remove broken Maia deployment:**
   - In Dokploy UI, delete the `maia` service
   - Or via CLI: `docker-compose -f services/maia/docker-compose-dokploy.yml down`

---

## Post-Deployment Tasks

After successful deployment:

1. **Update audit status:**
   - Maia connectivity issue resolved
   - Crisis detection system operational

2. **Monitor for 24 hours:**
   - Check distress classification is working in production
   - Monitor logs for any errors
   - Verify crisis alerts are triggering correctly

3. **Test all classifiers:**
   - Distress: Journal entries, assessments
   - Forum-topic: Forum posts (when forum integration complete)
   - Content-quality: Lesson content scoring
   - Content-atomization: Marketing content extraction

4. **Clean up old code:**
   - Archive `services/distress-classifier/` directory
   - Update documentation to reference Maia

---

## References

- Maia source code: `services/maia/`
- Maia client: `lib/ai/maia-client.ts`
- Health endpoint: `app/api/health/route.ts`
- Docker Compose: `services/maia/docker-compose-dokploy.yml`
- Dockerfile: `services/maia/Dockerfile`
