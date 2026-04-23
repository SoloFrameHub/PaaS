# Backup & Disaster Recovery Policy

**Status:** Documentation created April 18, 2026 (Finding 17)  
**Owner:** Platform Operations  
**Review Frequency:** Quarterly

---

## Current Status (ACTION REQUIRED)

⚠️ **The following items must be verified in Dokploy:**

1. **PostgreSQL Backup Configuration**
   - [ ] Verify automated backups are enabled
   - [ ] Confirm backup frequency (target: daily minimum)
   - [ ] Verify backup retention period (target: 30 days active, 6 years audit logs)
   - [ ] Confirm offsite backup location (required for HIPAA)
   - [ ] Test backup encryption (required for PHI)

2. **Redis Backup Configuration**
   - [ ] Verify Redis persistence mode (RDB or AOF)
   - [ ] Confirm backup frequency
   - [ ] Verify backup storage location

3. **Application Data**
   - [ ] Lesson content (MDX files) backed up via git repository
   - [ ] User-uploaded assets (if any) — verify backup strategy

---

## HIPAA Requirements (§164.308(a)(7))

### Audit Log Retention
- **Requirement:** 6-year retention for all audit logs
- **Affected tables:**
  - `distress_event` (crisis detection logs)
  - `moderation_log` (forum moderation decisions)
  - `ai_classification_event` (Maia classifier audit trail)
  - `lesson_feedback` (user feedback — non-PHI but business-critical)

**Implementation Notes:**
- FK constraints use `onDelete: 'set null'` to preserve logs when users delete accounts
- Consider separate long-term archive for audit logs older than 30 days
- Document quarterly restore testing for audit logs specifically

### PHI Data Retention
- **Requirement:** Secure deletion when no longer needed
- **Right-to-delete:** Implemented via DELETE `/api/account/delete` (Finding 9)
- **Affected tables:**
  - `profile.data` (JSONB user PHI)
  - `mood_entry` (user-generated mental health data)
  - `coach_session` (AI chat transcripts)
  - `patient_assignment` (provider-patient relationships)

---

## Recovery Objectives

### RPO (Recovery Point Objective)
**24 hours** — Maximum acceptable data loss

- Daily backups meet this target
- Critical: Ensure backups complete before 24-hour window

### RTO (Recovery Time Objective)
**4 hours** — Maximum acceptable downtime

Includes:
1. Detect failure (monitoring alerts)
2. Provision new database instance
3. Restore from backup
4. Verify data integrity
5. Update application connection strings
6. Deploy + health check

---

## Backup Verification Checklist

### Dokploy UI Verification (Complete First)
Access Dokploy dashboard → PostgreSQL service → Backups tab

**Verify:**
- [ ] Automated backup schedule: `0 2 * * *` (2 AM daily) or similar
- [ ] Last successful backup timestamp (must be within 24 hours)
- [ ] Backup size (track trend — sudden changes indicate issues)
- [ ] Offsite replication enabled (S3, Google Cloud Storage, or equivalent)
- [ ] Encryption at rest enabled for backup storage

### Manual Backup Test (Run Now)
```bash
# SSH into Dokploy server or use Dokploy MCP tools
# Trigger manual backup and verify completion
```

### Restore Test (Quarterly — Next Due: July 2026)
```bash
# 1. Create test database instance
# 2. Restore from latest backup
# 3. Run verification queries:
SELECT COUNT(*) FROM "user";
SELECT COUNT(*) FROM distress_event;
SELECT COUNT(*) FROM moderation_log;
SELECT MAX(created_at) FROM lesson_feedback;

# 4. Verify data integrity (no corruption)
# 5. Document restore time (compare against 4-hour RTO)
# 6. Delete test instance
```

---

## Backup Monitoring

### Automated Alerts (TO BE IMPLEMENTED)
- [ ] Alert if backup fails
- [ ] Alert if backup size deviates >20% from 7-day average
- [ ] Alert if last successful backup >26 hours ago
- [ ] Alert if offsite replication fails

### Integration with `/api/health`
Currently not monitoring backups. Consider adding:
```typescript
// app/api/health/route.ts
// Add backup health check (query Dokploy API or check backup timestamp)
checks.backup_age_hours = ...
if (backup_age_hours > 26) {
  checks.backup_status = 'CRITICAL: Backup overdue';
}
```

---

## Disaster Recovery Runbook

### Scenario 1: Database Corruption (Data Intact)
1. Stop application (prevent writes)
2. Run `REINDEX` and `VACUUM FULL` on affected tables
3. Verify data integrity with sample queries
4. Restart application
5. Monitor error logs for 24 hours

**Estimated Time:** 1-2 hours

### Scenario 2: Database Instance Failure (Need Full Restore)
1. Provision new PostgreSQL instance in Dokploy
2. Identify most recent valid backup (check backup list)
3. Restore backup to new instance
4. Run migration script: `npx tsx scripts/db-migrate.ts` (ensure schema matches app)
5. Update `DATABASE_URL` in Dokploy environment variables
6. Redeploy application
7. Run health check: `curl https://mental-health-education.soloframehub.com/api/health`
8. Verify critical workflows:
   - User can sign in
   - Provider portal loads patient list
   - Lesson content renders
   - Distress classifier responds

**Estimated Time:** 2-4 hours (within RTO)

### Scenario 3: Complete Platform Loss (Dokploy + DB)
1. Provision new Dokploy instance (or migrate to different infrastructure)
2. Restore PostgreSQL from offsite backup
3. Clone git repository (lesson content + codebase)
4. Redeploy application from `main` branch
5. Verify all environment variables set (see `instrumentation.ts` REQUIRED_ENV)
6. Run full health check suite

**Estimated Time:** 4-8 hours (exceeds RTO — requires pre-planned migration strategy)

---

## Action Items (Priority Order)

1. **IMMEDIATE:** Verify Dokploy PostgreSQL backup configuration (use checklist above)
2. **THIS WEEK:** Document actual backup configuration (replace "TO BE VERIFIED" placeholders)
3. **THIS WEEK:** Set up backup monitoring alerts
4. **THIS MONTH:** Run first quarterly restore test and document results
5. **NEXT QUARTER:** Review backup policy with results from restore test

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| 2026-04-18 | Claude + Mike | Initial policy created (Audit Finding 17) |

