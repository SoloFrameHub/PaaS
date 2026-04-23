---
name: caa-forum-sync
description: Nightly forum sync — pushes NodeBB analytics data to PostgreSQL for Metabase dashboards.
version: 1.0.0
metadata:
  openclaw:
    requires:
      env:
        - CAA_API_URL
        - CAA_ADMIN_SECRET
      bins:
        - curl
    primaryEnv: CAA_ADMIN_SECRET
    emoji: "🔄"
---

# CAA Forum Sync

Syncs NodeBB forum activity data to the CAA PostgreSQL database so Metabase dashboards stay current.

## Schedule

Runs daily at **2:00 AM UTC**.

## Tool Usage

```bash
curl -X POST "${CAA_API_URL}/api/admin/forum-sync" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${CAA_ADMIN_SECRET}" \
  -d '{"action": "sync"}'
```

Report success or failure. On failure, the next nightly run will catch up.
