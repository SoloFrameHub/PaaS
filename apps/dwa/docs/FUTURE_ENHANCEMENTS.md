# Future Enhancements Backlog

This document tracks planned features and optimizations identified during audits and development.

---

## Security & Compliance

### Email Notifications for Account Deletion
**Priority:** High  
**Effort:** 2-3 days  
**Related:** Finding 9 (Account Deletion Grace Period)

**Description:**
Add email notifications for the 30-day account deletion grace period:
1. Deletion confirmation email (with cancellation link + magic token)
2. Reminder email at 23 days (7 days before purge)
3. Purge completion confirmation email

**Requirements:**
- Email service integration (SendGrid, Postmark, or Resend)
- Magic link token generation and validation
- Email templates with branding
- SMTP configuration in production

**Files to modify:**
- `app/api/account/delete/route.ts` - send confirmation email
- `app/api/account/cancel-deletion/route.ts` - verify magic token
- `app/api/cron/purge-deleted-accounts/route.ts` - send reminder + completion emails

---

### Provider Notification on Patient Account Deletion
**Priority:** Medium  
**Effort:** 1 day  
**Related:** Finding 9 (Account Deletion Grace Period)

**Description:**
Notify assigned providers when a patient requests account deletion.

**Requirements:**
- Email to all providers with active assignments
- Include patient displayName (not real PII)
- Suggest transferring notes/assignments before purge
- Add provider notification preferences to settings

**Files to modify:**
- `app/api/account/delete/route.ts` - query provider assignments, send emails
- `lib/db/schema.ts` - add provider notification preferences

---

## Provider Features

### Automated NPI Verification via NPPES API
**Priority:** Medium  
**Effort:** 3-4 days  
**Related:** Finding 18 (Provider NPI Verification Not Automated)

**Description:**
Integrate NPPES NPI Registry API to automatically verify provider credentials.

**NPPES API:**
- Endpoint: https://npiregistry.cms.hhs.gov/api/?version=2.1
- Free, no API key required
- Returns: name, credentials, taxonomy, practice location, active status

**Requirements:**
- Real-time NPI validation on provider signup
- Display verified badge for NPI-verified providers
- Periodic re-verification (monthly cron job)
- Store verification timestamp and status

**Implementation:**
```typescript
// lib/npi-verification.ts
async function verifyNPI(npi: string): Promise<NPIResult> {
  const res = await fetch(`https://npiregistry.cms.hhs.gov/api/?version=2.1&number=${npi}`);
  const data = await res.json();
  return {
    valid: data.result_count === 1,
    name: data.results[0]?.basic?.name,
    credentials: data.results[0]?.basic?.credential,
    taxonomies: data.results[0]?.taxonomies,
  };
}
```

**Files to modify:**
- `app/api/provider/signup/route.ts` - verify NPI on signup
- `lib/db/schema.ts` - add npiVerified, npiVerifiedAt fields
- `app/api/cron/verify-provider-npis/route.ts` - monthly re-verification

---

## Performance & Scalability

### Redis Cache Layer for High-Frequency Reads
**Priority:** Medium  
**Effort:** 2-3 days  
**Related:** Finding 22 (No API Response Caching)

**Description:**
Add Redis caching for frequently accessed, rarely changing data.

**Cache candidates:**
- Profile data (TTL: 5 minutes)
- Course metadata (TTL: 1 hour)
- Provider roster (TTL: 15 minutes)
- Curriculum structure (TTL: 6 hours)

**Implementation:**
```typescript
// lib/cache.ts
async function cachedProfileGet(userId: string): Promise<Profile> {
  const cached = await redis.get(`profile:${userId}`);
  if (cached) return JSON.parse(cached);
  
  const profile = await db.select().from(profile).where(eq(profile.userId, userId));
  await redis.setex(`profile:${userId}`, 300, JSON.stringify(profile));
  return profile;
}
```

**Cache invalidation:**
- Profile updates: invalidate on PATCH /api/profile
- Course metadata: invalidate on admin content updates
- Provider roster: invalidate on patient assignment changes

**Files to create:**
- `lib/cache.ts` - cache helpers with TTL and invalidation
- `lib/cache/profile.ts` - profile-specific cache logic
- `lib/cache/courses.ts` - course metadata cache

**Files to modify:**
- `app/api/profile/route.ts` - use cachedProfileGet
- `app/api/courses/route.ts` - cache course list
- `app/api/provider/patients/route.ts` - cache roster

**Monitoring:**
- Track cache hit rate in logs
- Alert if hit rate < 70%
- Monitor Redis memory usage

---

### Vector Similarity Search with pgvector
**Priority:** Low  
**Effort:** 4-5 days  
**Related:** Finding 19 (Content Embedding Lacks Vector Similarity Index)

**Description:**
Migrate content embedding similarity search from JavaScript cosine similarity to PostgreSQL pgvector extension.

**Current issue:**
- Cosine similarity requires full table scan (slow for 10,000+ embeddings)
- JavaScript-based similarity computation (inefficient)

**pgvector benefits:**
- Native HNSW approximate nearest neighbor index
- 100-1000x faster similarity search
- SQL-based queries (simpler codebase)

**Implementation:**

1. **Install pgvector extension:**
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

2. **Migrate embedding column:**
```sql
ALTER TABLE content_embedding 
  ADD COLUMN embedding_vector vector(1536);

UPDATE content_embedding 
  SET embedding_vector = embedding::vector;

ALTER TABLE content_embedding 
  DROP COLUMN embedding;

ALTER TABLE content_embedding 
  RENAME COLUMN embedding_vector TO embedding;
```

3. **Create HNSW index:**
```sql
CREATE INDEX idx_content_embedding_vector 
  ON content_embedding 
  USING hnsw (embedding vector_cosine_ops);
```

4. **Update queries:**
```typescript
// Before (JavaScript cosine similarity)
const results = await db.select().from(contentEmbedding);
const sorted = results.map(r => ({
  ...r,
  similarity: cosineSimilarity(queryEmbedding, r.embedding)
})).sort((a, b) => b.similarity - a.similarity).slice(0, 5);

// After (pgvector)
const results = await db
  .select({
    ...contentEmbedding,
    similarity: sql<number>`1 - (embedding <=> ${queryEmbedding}::vector)`,
  })
  .from(contentEmbedding)
  .orderBy(sql`embedding <=> ${queryEmbedding}::vector`)
  .limit(5);
```

**Files to modify:**
- `lib/db/schema.ts` - change embedding type to `vector(1536)`
- `lib/ai/rag.ts` - use pgvector similarity operator
- `scripts/docker-entrypoint.js` - add vector extension + migration

**Testing:**
- Benchmark query time: before vs after (expect 100x speedup)
- Verify similarity scores match (within 0.01 tolerance)
- Test with 10,000+ embeddings

---

## Database & Infrastructure

### Database Connection Pool Configuration
**Priority:** Low  
**Effort:** 1 hour  
**Related:** Finding 17 (No Database Connection Pooling Config Visible)

**Current status:**
- Using default Drizzle ORM connection pooling
- No explicit pool size configuration

**Recommendation:**
Add explicit pool configuration in production:

```typescript
// lib/db.ts
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,              // Max connections (default: 10)
  min: 5,               // Min idle connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});
```

**Sizing guide:**
- Development: max 5-10
- Staging: max 10-20
- Production: max 20-50 (depends on server count)
- Formula: `max_connections = (server_count * max_pool_size) + buffer`

**Monitoring:**
- Track active connections: `SELECT count(*) FROM pg_stat_activity`
- Alert if > 80% of max_connections
- Monitor connection pool exhaustion errors

**Files to modify:**
- `lib/db.ts` - add explicit Pool configuration
- `.env.example` - add DATABASE_POOL_SIZE env var

---

## Documentation

### Move Inline TODOs to GitHub Issues
**Priority:** Low  
**Effort:** 1 hour  
**Related:** Finding 21 (TODO Comments in Production Code)

**Status:** Complete (moved to this document)

**Remaining TODOs in production code:**
- None (all moved to this backlog)

**Process for future TODOs:**
1. If TODO is < 1 day effort: fix immediately
2. If TODO is > 1 day effort: add to this document with details
3. Never commit TODO without issue reference or backlog entry

---

## Implementation Priority

**Phase 1 (Next Sprint):**
1. Redis cache layer (Finding 22) - immediate performance wins
2. Email notifications for account deletion - complete Finding 9
3. Database pool configuration - production hardening

**Phase 2 (Q2 2026):**
4. NPI verification (Finding 18) - provider trust/compliance
5. Provider notifications on patient deletion - HIPAA best practice

**Phase 3 (Future):**
6. pgvector migration (Finding 19) - performance optimization
7. TODO cleanup automation - CI/CD enforcement

---

## Notes

- All enhancements should include tests before merging
- Security-related features (emails, NPI verification) require security review
- Performance optimizations should include before/after benchmarks
- Database migrations should be backward-compatible with rollback plan
