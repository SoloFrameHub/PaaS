---
name: caa-health-check
description: Periodic health check of the CAA platform — checks app, database, Redis, and forum connectivity.
version: 1.0.0
metadata:
  openclaw:
    requires:
      env:
        - CAA_API_URL
      bins:
        - curl
    emoji: "🏥"
---

# CAA Health Check

Checks the health of all CAA platform services.

## Schedule

Runs every **15 minutes**.

## What to Do

1. Check the health endpoint:

```bash
curl -sf "${CAA_API_URL}/api/health" -o /dev/null -w "%{http_code}"
```

2. If the response is not 200, log a warning with the status code and response body.

3. On 3 consecutive failures, this is a critical alert. The delivery mode should announce to the configured alert channel.

## Delivery

On failure (3+ consecutive), announce via the configured channel (Telegram/Slack/Discord).
On success, no output needed (silent).
