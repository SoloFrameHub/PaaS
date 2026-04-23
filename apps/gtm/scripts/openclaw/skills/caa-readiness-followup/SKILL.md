---
name: caa-readiness-followup
description: Sends follow-up email to readiness score quiz takers who haven't signed up within 24 hours.
version: 1.0.0
metadata:
  openclaw:
    requires:
      env:
        - CAA_API_URL
        - CAA_ADMIN_SECRET
        - RESEND_API_KEY
      bins:
        - curl
    primaryEnv: CAA_ADMIN_SECRET
    emoji: "📬"
---

# CAA Readiness Score Follow-Up

Checks for readiness quiz completions from 24 hours ago that haven't converted to platform signups, and sends a personalized follow-up email highlighting their specific gaps.

## Schedule

Runs daily at **10:00 AM UTC**.

## What to Do

1. Call the follow-up API:

```bash
curl -X POST "${CAA_API_URL}/api/admin/readiness-followup" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${CAA_ADMIN_SECRET}" \
  -d '{"action": "send-followups"}'
```

2. The API handles:
   - Finding quiz submissions from ~24h ago where `convertedToUser` is false
   - Generating personalized email based on their score breakdown
   - Sending via Resend with the user's lowest-scoring tracks highlighted
   - Optionally adding them to a Listmonk drip campaign

3. Log results.

## Note

This endpoint needs to be created in the CAA app at `/api/admin/readiness-followup`. Until then, this skill is a placeholder.
