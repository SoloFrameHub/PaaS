---
name: caa-persona-responder
description: Handles delayed AI persona responses in forum threads. Receives webhook from NodeBB, waits a randomized delay, then triggers the persona response API.
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
    emoji: "🤖"
---

# CAA Persona Responder

When a human posts in a pod discussion thread, this skill is triggered via webhook from NodeBB. It waits a randomized delay (1-4 hours) to simulate natural conversation timing, then calls the persona response endpoint.

## Webhook Trigger

This skill is NOT cron-based. It is triggered by the NodeBB webhook at:
`POST /api/webhooks/nodebb`

The webhook sends: `{ personaId, podId, threadId }`

## What to Do

1. Receive the webhook payload with `personaId`, `podId`, and `threadId`
2. Wait a random delay between 1-4 hours (to simulate human-like response timing)
3. Call the persona response endpoint:

```bash
curl -X POST "${CAA_API_URL}/api/internal/persona-respond" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${CAA_ADMIN_SECRET}" \
  -d '{"personaId": "<personaId>", "podId": "<podId>", "threadId": <threadId>}'
```

4. Log success or failure

## Personas

- **alex-skeptic** (UID 3) — Challenges assumptions, asks hard questions
- **jordan-builder** (UID 4) — Action-oriented, shares what worked
- **morgan-perfectionist** (UID 5) — Detail-focused, asks for data
- **sam-mentor** (UID 6) — Encouraging, connects dots between concepts
