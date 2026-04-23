# Account Deletion Grace Period

**Finding 9 Implementation:** Soft delete with 30-day grace period

---

## Overview

Users who request account deletion enter a 30-day grace period before permanent data purge. This prevents accidental data loss and allows recovery from account takeover attacks.

## User Flow

### 1. User Requests Deletion

**Endpoint:** `DELETE /api/account/delete`

**Behavior:**
- Sets `user.deleted_at` timestamp
- Marks profile with `_pendingDeletion` flag
- User immediately loses login access
- Returns purge date (30 days from request)

**Response:**
```json
{
  "success": true,
  "message": "Account deletion scheduled. You have 30 days to cancel this request.",
  "purgeDate": "2026-05-20T10:00:00Z",
  "cancelUrl": "/api/account/cancel-deletion"
}
```

### 2. User Attempts Login (During Grace Period)

**Endpoint:** `POST /api/auth/signin`

**Behavior:**
- Password is validated
- Login is rejected with 403 Forbidden
- Response includes deletion details and cancellation instructions

**Response:**
```json
{
  "error": "Account is scheduled for deletion",
  "deletedAt": "2026-04-20T10:00:00Z",
  "purgeAfter": "2026-05-20T10:00:00Z",
  "message": "Your account deletion is in progress. To cancel and restore access, contact support or use the cancellation link from your deletion confirmation email."
}
```

### 3. User Cancels Deletion (Optional)

**Endpoint:** `POST /api/account/cancel-deletion`

**Requirements:**
- Must be within 30-day grace period
- Must be authenticated (via session token from before deletion or magic link)

**Behavior:**
- Clears `user.deleted_at` timestamp
- Removes `_pendingDeletion` flags from profile
- Restores full account access immediately

**Response:**
```json
{
  "success": true,
  "message": "Account deletion cancelled. Your account has been restored."
}
```

### 4. Automatic Purge (After 30 Days)

**Endpoint:** `GET /api/cron/purge-deleted-accounts`

**Schedule:** Daily at 2 AM UTC (cron: `0 2 * * *`)

**Behavior:**
- Finds all accounts where `deleted_at < (now - 30 days)`
- Permanently deletes:
  - User sessions (logout all devices)
  - Profile data (scrubbed to `{_purged: true}`)
  - Mood entries
  - Coach sessions
  - Patient assignments
- Preserves audit logs via SET NULL foreign keys:
  - `distress_event.user_id` → `null`
  - `moderation_log.user_id` → `null`
  - `lesson_feedback.user_id` → `null`

---

## Setup Instructions

### 1. Database Migration

The `deleted_at` column is added automatically via `scripts/docker-entrypoint.js`:

```sql
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "deleted_at" TIMESTAMP WITH TIME ZONE;
```

This runs on next deployment.

### 2. Cron Job Setup

#### Option A: Vercel Cron (Recommended for Vercel deployments)

Create `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/purge-deleted-accounts",
      "schedule": "0 2 * * *"
    }
  ]
}
```

Vercel automatically injects the `Authorization` header using `CRON_SECRET`.

#### Option B: n8n Workflow (Recommended for Dokploy/self-hosted)

1. In n8n, create a new workflow:
   - **Trigger:** Cron node (`0 2 * * *`)
   - **HTTP Request:**
     - **Method:** GET
     - **URL:** `https://mental-health-education.soloframehub.com/api/cron/purge-deleted-accounts`
     - **Headers:**
       - `Authorization`: `Bearer {{$env.ADMIN_API_SECRET}}`

2. Activate the workflow

#### Option C: GitHub Actions

Create `.github/workflows/purge-deleted-accounts.yml`:

```yaml
name: Purge Deleted Accounts

on:
  schedule:
    - cron: '0 2 * * *'
  workflow_dispatch: # Allow manual trigger

jobs:
  purge:
    runs-on: ubuntu-latest
    steps:
      - name: Call purge endpoint
        run: |
          curl -X GET \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            https://mental-health-education.soloframehub.com/api/cron/purge-deleted-accounts
```

Add `CRON_SECRET` to GitHub Secrets (use same value as `ADMIN_API_SECRET`).

---

## Security Considerations

### Authentication

The purge endpoint requires `Authorization: Bearer {CRON_SECRET}` header.

**Environment Variables:**
- `CRON_SECRET` (preferred, dedicated secret)
- `ADMIN_API_SECRET` (fallback if CRON_SECRET not set)

**Do NOT** expose this endpoint publicly without authentication.

### Audit Logging

All deletion and purge events are logged with structured logger:

```typescript
logger.info('account_deletion_initiated', { userId, email });
logger.info('account_soft_deleted', { userId, email, purgeAfter });
logger.info('deletion_cancelled', { userId, email, daysSinceDeletion });
logger.info('account_purged', { userId, email });
```

Check logs in production to monitor deletion patterns and detect abuse.

---

## Email Notifications (TODO)

**Deletion Confirmation Email:**
- Sent when user requests deletion
- Includes:
  - Purge date (30 days from request)
  - Cancellation link with magic token
  - Warning about data loss

**Purge Reminder Email (7 days before purge):**
- Sent 23 days after deletion request
- Final warning before permanent data loss
- Includes cancellation link

**Purge Completion Email:**
- Sent after successful purge
- Confirms account data has been permanently deleted
- No recovery possible

---

## Testing

### Test Soft Delete

```bash
# 1. Create test account
curl -X POST https://mental-health-education.soloframehub.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "SecurePass123!"}'

# 2. Sign in and get session cookie
curl -X POST https://mental-health-education.soloframehub.com/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "SecurePass123!"}' \
  -c cookies.txt

# 3. Request deletion
curl -X DELETE https://mental-health-education.soloframehub.com/api/account/delete \
  -b cookies.txt

# 4. Verify login is blocked
curl -X POST https://mental-health-education.soloframehub.com/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "SecurePass123!"}'
# Should return 403 with deletion message
```

### Test Cancellation

```bash
# 1-3. Same as above

# 4. Cancel deletion (use session from before deletion)
curl -X POST https://mental-health-education.soloframehub.com/api/account/cancel-deletion \
  -b cookies.txt

# 5. Verify login works again
curl -X POST https://mental-health-education.soloframehub.com/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "SecurePass123!"}' \
  -c cookies2.txt
# Should return 200 with new session
```

### Test Manual Purge

```bash
# Trigger purge job manually (requires ADMIN_API_SECRET)
curl -X GET https://mental-health-education.soloframehub.com/api/cron/purge-deleted-accounts \
  -H "Authorization: Bearer $ADMIN_API_SECRET"
```

---

## Metrics to Monitor

- **Deletion requests per week:** Spike may indicate UX issue or attack
- **Cancellation rate:** High rate (>50%) suggests accidental deletions
- **Time to purge:** Average days between deletion and purge
- **Failed purges:** Errors during cleanup (DB constraints, missing data)

Query logs with:
```typescript
logger.search({
  event: ['account_deletion_initiated', 'deletion_cancelled', 'account_purged'],
  timestamp: { $gte: '2026-04-01' }
})
```

---

## Compliance

### GDPR Article 17 (Right to Erasure)

✅ **Compliant:** 30-day grace period is allowed for technical reasons. GDPR allows "reasonable delays" for data erasure (Recital 65).

### HIPAA §164.526 (Right to Amend)

✅ **Compliant:** Soft delete preserves audit logs via SET NULL foreign keys. Deleted PHI is anonymized but statistical records remain.

### CCPA (California Consumer Privacy Act)

✅ **Compliant:** Grace period is disclosed in deletion confirmation. User retains right to cancel.

---

## Rollback Plan

If grace period causes issues:

1. **Disable purge cron:** Stop automatic cleanup
2. **Revert deletion endpoint:** Change back to immediate hard delete
3. **Manually purge pending deletions:**
   ```sql
   DELETE FROM "user" WHERE deleted_at IS NOT NULL;
   ```

---

## Future Enhancements

- [ ] Email confirmation before deletion (require clicking link in email)
- [ ] Provider notification when patient account is deleted
- [ ] Admin dashboard showing pending deletions
- [ ] Export user data before purge (GDPR data portability)
- [ ] Graduated purge (anonymize profile → delete PHI → delete account over 3 stages)
