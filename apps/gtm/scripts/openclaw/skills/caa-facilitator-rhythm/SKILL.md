---
name: caa-facilitator-rhythm
description: Triggers the AI facilitator weekly rhythm (Monday kickoff, Wednesday nudge, Friday synthesis) by calling the CAA admin API endpoint.
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
    emoji: "🎯"
---

# CAA Facilitator Rhythm

Triggers the AI facilitator to post weekly discussion prompts in the NodeBB forum.

## Schedule

This skill runs on three cron schedules:

- **Monday 8:00 AM UTC** — Weekly kickoff post
- **Wednesday 8:00 AM UTC** — Mid-week nudge
- **Friday 8:00 AM UTC** — Weekly synthesis

## What It Does

Calls `POST ${CAA_API_URL}/api/admin/facilitator` with the `ADMIN_API_SECRET` header to trigger the facilitator service. The service determines which day it is and generates the appropriate post type.

## Tool Usage

Use curl to call the CAA facilitator endpoint:

```bash
curl -X POST "${CAA_API_URL}/api/admin/facilitator" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${CAA_ADMIN_SECRET}" \
  -d '{"action": "run"}'
```

If the response status is 200, the facilitator ran successfully. Log the response body.
If the response status is not 200, report the error and retry on the next scheduled run.
