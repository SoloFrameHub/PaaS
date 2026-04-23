# ADR 0004 — Tenant enforcement at the data boundary

- **Status:** Accepted
- **Date:** 2026-04-22

## Context
Cross-tenant leakage is the worst-class bug we can ship. Per-call-site tenant filtering is brittle — a single missed `where tenant_id =` is a breach.

## Decision
Belt-and-suspenders enforcement:
1. RLS at Postgres on every tenant-scoped table (Blueprint §6.2 Layer 2).
2. `withTenant(ctx, fn)` Drizzle wrapper that issues `SET LOCAL app.tenant_id` and switches role; throws if `tenantId` missing (Layer 3).
3. ESLint rule `@platform/no-direct-db-access` blocks `import { db }` outside `@platform/tenancy/internal`.
4. CI required check: tenant-leak harness inserts as A, attempts read as B, asserts 0 rows + audit-logged denial.

## Consequences
- **Good:** leakage requires three independent failures to ship.
- **Acceptable cost:** every DB call goes through `withTenant` — slightly more verbose than a free `db` import.
- **Trigger to revisit:** profiling shows >5% latency cost from `SET LOCAL`.

## Killed alternatives
- Per-repo manual `tenant_id` filters.
- RLS only (no Drizzle wrapper) — leaves no enforcement at app build time.
