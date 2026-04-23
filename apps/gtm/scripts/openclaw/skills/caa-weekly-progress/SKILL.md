---
name: caa-weekly-progress
description: Sends weekly progress report emails to active users every Monday morning via the CAA API and Resend.
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
    emoji: "📊"
---

# CAA Weekly Progress Report

Generates and sends personalized weekly progress emails to active platform users.

## Schedule

Runs every **Monday at 9:00 AM UTC**.

## What to Do

1. Call the progress report API to get user progress data:

```bash
curl -X POST "${CAA_API_URL}/api/admin/weekly-progress" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${CAA_ADMIN_SECRET}" \
  -d '{"action": "generate-and-send"}'
```

2. The API handles:
   - Querying active users (logged in within last 14 days)
   - Calculating week-over-week progress (lessons completed, XP earned, streak)
   - Generating personalized email content
   - Sending via Resend

3. Log the number of emails sent and any failures.

## Note

This endpoint needs to be created in the CAA app at `/api/admin/weekly-progress`. Until then, this skill is a placeholder for the workflow.
