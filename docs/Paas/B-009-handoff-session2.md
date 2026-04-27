# B-009 multi-tenancy migration — session 2 handoff

> **RESOLVED 2026-04-26.** All phases shipped on `b-009-migration`
> (tip moved past `e2c3ed8`). Phase 7 used Option 1 — the 10
> exemplar routes proposed below. See commits
> `df60763..2814bff`:
>
> | Phase | Commit | Subject |
> |---|---|---|
> | 7 | `df60763` | refactor 10 routes to `withTenantApp` |
> | 8a | `e211a21` | DWA non-provider routes + pages |
> | 8b | `64e1731` | DWA provider routes + pages |
> | 8c | `adc8690` | GTM auth + admin + webhooks |
> | 8d | `1e465b4` | GTM core routes + pages |
> | followup | `7b1c12c` | tenant_id columns auto-default from `app.tenant_id` GUC |
> | 9+10 | `2814bff` | docs: mark B-009 resolved (CLAUDE.md, bug-patterns, source-repo-backports) |
>
> Branch has not yet merged to `main`. The text below is preserved
> for historical reference; do not act on it.

**Status as of 2026-04-25:** Phases 1–6 done and committed on
`b-009-migration` (tip `e2c3ed8`); Phases 7–10 remain. Phase 7
(exemplar refactor) is the next step and was paused awaiting
confirmation on which 10 routes to use as exemplars.

This handoff supersedes the table at the top of
[`B-009-handoff.md`](B-009-handoff.md) — everything else in that
doc is still accurate (architectural decisions, agent procedure,
known pitfalls).

## Read first (in this order)

1. [`CLAUDE.md`](../../CLAUDE.md) — especially "Spawning agents
   for large work" and "Audits, reviews, sweeps".
2. [`B-009-handoff.md`](B-009-handoff.md) — original session
   handoff. Still accurate for everything except the "what's
   done" table.
3. [`B-009-migration-plan.md`](B-009-migration-plan.md) —
   approved scope (D-1..D-8).
4. `git log --oneline main..b-009-migration` — see what's
   landed:

| Commit | Phase | Deliverable |
|---|---|---|
| `31dcfd7` | 1+2 | plan + `0003_app_tenancy.sql` + CLAUDE.md procedure sections |
| `4af6bc6` | 3 | 17 DWA + 31 GTM `tenantId` Drizzle columns (Agent #1, worktree-built) |
| `aa6934d` | 4 | `apps/{dwa,gtm}/lib/db/with-tenant.ts` (`withTenantApp` + `withSystemAdminApp`) |
| `26ff686` | 5 | `apps/{dwa,gtm}/app/api/admin/tenants/route.ts` + `tools/tenancy/seed-tenant.ts --scaffold-app` flag |
| `e2c3ed8` | 6 | `packages/testing/src/appTablesLeakHarness.ts` (`mood_entry` + `roleplay_session` probes) |

## Known issue with worktree agents

Agent #1's worktree was originally based on `main`, not the
current branch (`b-009-migration`). It caught this mid-run and
rebased onto `b-009-migration` before editing. Future Phase 7/8/9
agents will hit the same issue and need the same self-correction
step in their brief. Add this verbatim:

> Your worktree may have been branched off `main` rather than
> `b-009-migration`. Before editing anything, run `git log
> --oneline -5` — if commit `e2c3ed8` (or whichever the current
> tip of `b-009-migration` is) is NOT in the log, rebase with
> `git rebase b-009-migration` so prior phases' commits are
> visible. Verify post-rebase that `infra/migrations/0003_app_tenancy.sql`
> exists and `apps/dwa/lib/db/with-tenant.ts` exists.

## Open question — answer this BEFORE spawning Agent #2

Phase 7 needs 10 exemplar routes (5 DWA + 5 GTM) covering the
patterns Phase 8 will mechanically copy. Proposed list:

**Pattern A — `withTenantApp` (tenant CRUD with auth):**
- `apps/dwa/app/api/forum/bookmarks/route.ts`
- `apps/dwa/app/api/onboarding/in-your-words/route.ts`
- `apps/dwa/app/api/clinical-data/route.ts`
- `apps/gtm/app/api/component-state/route.ts`
- `apps/gtm/app/api/academy/lesson-feedback/route.ts`

**Pattern B — `withSystemAdminApp` (cron sweeps):**
- `apps/dwa/app/api/cron/purge-deleted-accounts/route.ts`
- `apps/gtm/app/api/admin/daily-digest/route.ts`

**Pattern E — `withSystemAdminApp` (admin-secret-gated cross-tenant view):**
- `apps/dwa/app/api/admin/providers/route.ts`
- `apps/gtm/app/api/admin/forms/route.ts`

**Pattern C — resolve-then-pin (webhook):**
- `apps/gtm/app/api/webhook/polar/route.ts`

Pattern D (signup auth flow that mixes `getDb()` for user/session
+ `withTenantApp` for profile) was deliberately omitted — DWA/GTM
signup don't actually insert a tenant-scoped row, so it'd be a
degenerate exemplar. If a real Pattern D case emerges in Phase
8, handle it inline.

**Three options:**

1. Approve the 10 above and spawn Agent #2.
2. Trim to 6 (3 patterns × 2 apps) for a smaller agent budget.
3. Different exemplar choices.

Lean is option 1 — matches the original handoff's "5+5" exactly,
and the `webhook/polar` route is the most complex transform in
the whole migration; getting it locked in as an exemplar is high
leverage.

## What remains after Phase 7

| Phase | Scope | Approach |
|---|---|---|
| **8a** | `apps/dwa/app/api/auth/**`, `profile/**`, `health/**` | agent |
| **8b** | `apps/dwa/app/api/admin/**`, `cron/**`, `provider/**` | agent |
| **8c** | remaining DWA routes + DWA pages | agent |
| **8d** | `apps/gtm/app/api/**` | agent |
| **9+10** | `pnpm -r typecheck` clean, leak harness green, doc updates | agent |

Re-grep `@/lib/db` after Phase 7 lands; current count is ~77
sites monorepo-wide. Each batch agent gets the literal file
list determined by re-grepping post-Phase-7.

## Transformation reference (for Phase 7/8 agents)

**Pattern A — before/after:**

```ts
// before
import { getDb } from '@/lib/db';
import { forumBookmark } from '@/lib/db/schema';

export const POST = withAuth(async (request, { userId }) => {
  const db = getDb();
  if (!db) throw new AppError('Database not available', 503);
  await db.insert(forumBookmark).values({ userId, discussionId });
});

// after
import { withTenantApp } from '@/lib/db/with-tenant';
import { forumBookmark } from '@/lib/db/schema';
import { requireTenantContext } from '@platform/tenancy';

export const POST = withAuth(async (request, { userId }) => {
  const ctx = await requireTenantContext(request, { userId });
  await withTenantApp(ctx, async (tx) => {
    await tx.insert(forumBookmark)
      .values({ userId, discussionId, tenantId: ctx.tenantId });
  });
});
```

Key transforms:
1. `import { getDb }` → `import { withTenantApp } from '@/lib/db/with-tenant'`
2. Add `import { requireTenantContext } from '@platform/tenancy'`
3. Resolve ctx: `const ctx = await requireTenantContext(request, { userId })`
4. Wrap body: `await withTenantApp(ctx, async (tx) => { ... })`
5. `db` → `tx` inside the wrapper
6. **Add `tenantId: ctx.tenantId`** to every `.values({})` block (writes only — RLS handles read-side filtering automatically)
7. Drop the `if (!db)` 503 branch — `withTenantApp` throws `TenancyError` if no DB

**Pattern B — `withSystemAdminApp`:** same shape but no `requireTenantContext`; just `await withSystemAdminApp(async (tx) => { ... })`. Used for cron sweeps that operate cross-tenant.

**Pattern E — admin-secret + system_admin:** keep the existing
admin-secret check; replace the `getDb()` block with
`withSystemAdminApp`.

**Pattern C — webhook resolve-then-pin (`webhook/polar`):**
1. Verify webhook signature.
2. `await withSystemAdminApp` to look up the tenant from the
   external customer ID (`subscription` table → `userId` →
   `tenant_member` lookup).
3. Build a `TenantContext` for the resolved tenant.
4. Re-enter the work in `await withTenantApp(ctx, ...)` for the
   tenant-scoped writes.

The plan §D-7 lists the routes that should use
`withSystemAdminApp` (Patterns B/C/E). Anything else uses
`withTenantApp`.

## Branch hygiene

The working tree on `b-009-migration` carries a lot of unrelated
dirty state from prior sessions (`apps/dwa` modifications,
deleted docs, etc.). **Do not `git add -A`.** Stage only the
specific files each phase produces.

## First action

Confirm the 10 exemplar routes (option 1, 2, or 3 above), then
draft the Agent #2 brief. The brief must include:
- The worktree-base correction noted above.
- The standard constraints from CLAUDE.md "Spawning agents for
  large work" (no `pnpm install/test/build`, commit before
  declaring done, coverage ledger).
- The transformation reference above (Patterns A/B/C/E with
  before/after code).
- Commit message format: `feat(apps): refactor 10 exemplar
  routes to withTenantApp (B-009 phase 7)`.
