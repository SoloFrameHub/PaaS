# B-009 multi-tenancy migration — handoff to next session

**Status as of 2026-04-25:** Phase 1 done (plan); Phase 2 done (SQL on disk, uncommitted); Phases 3–10 remain. Two prior agent attempts at the full migration failed — second-half rule changes baked into [`CLAUDE.md`](../../CLAUDE.md) as standard procedure to prevent recurrence.

## Start here

1. Read [`CLAUDE.md`](../../CLAUDE.md) end-to-end. The audit-discipline section and the **"Spawning agents for large work"** section are both load-bearing — they shape every move.
2. Read this handoff fully.
3. Read [`docs/Paas/B-009-migration-plan.md`](B-009-migration-plan.md). It's the approved plan with 8 architectural decisions (D-1..D-8) and the table inventory.
4. Read [`infra/migrations/0003_app_tenancy.sql`](../../infra/migrations/0003_app_tenancy.sql). That's the Phase 2 deliverable — committed-equivalent (it's been written but lives uncommitted in the working tree alongside many other unrelated uncommitted files from prior sessions).
5. Skim [`docs/Paas/bug-patterns.md`](bug-patterns.md) entry **B-009** (the "Status update 2026-04-25" line). Confirms the migration's current framing.

## Goal

Bring `apps/dwa` and `apps/gtm` under the platform's multi-tenant model. Per the user: the platform is multi-tenant from day one — *that's the entire reason for the project*. There are no real customer tenants today; treat existing dev/test rows as throwaway. The deliverable is a **procedure for adding tenants as part of onboarding**, not a fixed seed of N tenants.

## What's done

| Phase | Deliverable | State |
|---|---|---|
| 1 | [`docs/Paas/B-009-migration-plan.md`](B-009-migration-plan.md) — scope inventory, D-1..D-8 architectural decisions, sequenced phases | **done**, on disk on main, uncommitted |
| 2 | [`infra/migrations/0003_app_tenancy.sql`](../../infra/migrations/0003_app_tenancy.sql) — adds `tenant_id NOT NULL` + RLS + indexes + grants to 48 app tables across DWA + GTM | **done**, on disk on main, uncommitted |

## What remains

Per the agreed agent/inline split:

| # | Phase | Approach | Notes |
|---|---|---|---|
| 1 | **Phase 3** — Drizzle schema mirror: add `tenantId: uuid('tenant_id').notNull()` to 48 pgTable definitions across `apps/dwa/lib/db/schema.ts` (17 tables) and `apps/gtm/lib/db/schema.ts` (31 tables) | **Agent** | Mechanical, ~30 edits, no long-running cmds in brief |
| 2 | **Phase 4** — Per-app `withTenantApp` wrappers (~80 lines each) at `apps/{dwa,gtm}/lib/db/with-tenant.ts`. Mirror `packages/tenancy/src/withTenant.ts` but operate on the app's existing pool and yield the app's typed schema | **Inline** | Architectural, small |
| 3 | **Phase 5** — Tenant onboarding: extend `tools/tenancy/seed-tenant.ts` with `--scaffold-app dwa\|gtm\|both` flag (no-op hook for now); add `apps/dwa/app/api/admin/tenants/route.ts` + `apps/gtm/app/api/admin/tenants/route.ts` (POST creates tenant, idempotent by slug, admin-secret-gated) | **Inline** | Needs each app's existing admin-auth shape |
| 4 | **Phase 6** — Extend `packages/testing/src/tenantLeakHarness.ts` (or write `appTablesLeakHarness.ts`) to cover `mood_entry` (DWA) and `roleplay_session` (GTM). Two tenants → cross-tenant query returns zero | **Inline** | Tightly coupled to packages/testing internals |
| 5 | **Phase 7** — Exemplar refactor of 10 routes (5 DWA + 5 GTM). Sets the pattern Phase 8 copies | **Agent** | Bounded, demonstrates the mechanical Phase 8 transform |
| 6–9 | **Phase 8** — Bulk refactor of remaining ~80 `@/lib/db` import sites, split into **4 batches of ~20** | **4 agents** | Each batch gets literal file list |
| 10 | **Phase 9 + 10** — `pnpm -r typecheck` clean, leak harness green, then update [`CLAUDE.md`](../../CLAUDE.md) (remove the outdated "withTenant is a stub" line — already updated this session, but verify), [`docs/Paas/bug-patterns.md`](bug-patterns.md) B-009 entry → resolved, [`docs/Paas/source-repo-backports.md`](source-repo-backports.md) → note migration is monorepo-only | **Agent** | Single agent runs install + verification once at the end |

**Total: 7 agent runs + 3 inline phases.**

## Phase 8 batch split (decide after Phase 7 lands)

Re-grep `@/lib/db` import sites to get the post-Phase-7 list, then split deterministically:

- **8a** — `apps/dwa/app/api/auth/**`, `apps/dwa/app/api/profile/**`, `apps/dwa/app/api/health/**`
- **8b** — `apps/dwa/app/api/admin/**`, `apps/dwa/app/api/cron/**`, `apps/dwa/app/api/provider/**`
- **8c** — remaining DWA routes + DWA pages (`apps/dwa/app/**/page.tsx`)
- **8d** — `apps/gtm/app/api/**`

Each batch agent gets the literal file list, the wrapper import path, and "use `withTenantApp` unless route is in plan §D-7's `withSystemAdminApp` list."

## Sequencing

Each phase consumes prior phase output, so agents must run sequentially:

```
Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 → Phase 8a → 8b → 8c → 8d → Phase 9-10
   (agent) (inline) (inline) (inline) (agent)  (4 agents)              (agent)
```

**Branching strategy:**
1. Create a `b-009-migration` feature branch on main (commit Phases 1+2 to it first, since those currently sit uncommitted in the working tree).
2. Each agent's worktree branches off `b-009-migration` (NOT main) so it sees prior phases' commits.
3. Main conversation merges each agent's worktree branch back into `b-009-migration` between phases.
4. When all phases complete, user reviews `b-009-migration` end-to-end and merges to main.

## Standard procedure for agent briefs (CLAUDE.md is canonical)

Every agent brief must include:

1. **Read the plan first.** Phase scope is fixed — execute, don't redesign.
2. **No long-running commands.** Forbidden: `pnpm install`, `pnpm test`, `pnpm build`, `next build`, `git push`, `gh pr create`, network calls. Verification by `grep`/file existence/static read only. Main conversation runs the typecheck/test commands after merging.
3. **Commit before declaring done** with prescribed message format: `feat(scope): description (B-009 phase N)`.
4. **Stop and flag** architectural questions; do not improvise past plan decisions.
5. **Coverage ledger + diff stats** in the final report.

These are codified in [`CLAUDE.md`](../../CLAUDE.md) → "Spawning agents for large work — standard procedure". Read it.

## Known pitfalls (from this session's attempts)

- **Stream-idle-timeout** on 13-min agent runs. Keep each phase ≤10–15 min of edits. The very first attempt produced a 310-line plan and timed out; lost the plan because it was uncommitted. Mitigation: **commit per phase boundary**.
- **Cold worktree stall.** Second attempt hung at "Now let me read the plan." for 600s — likely env init. Mitigation: **no `pnpm install` in brief**; agents do file edits only, not commands that need `node_modules`.
- **Schema name collisions.** DWA and GTM both declare `lesson_feedback` and `profile` tables. `profile` is identical; `lesson_feedback` shapes diverge (DWA: `serial id` + `rating`; GTM: `text id` + `sentiment`). Per CLAUDE.md "one Dokploy app per vertical" they likely deploy to separate DBs, but the Phase 2 migration uses `IF EXISTS` guards so it works regardless. Just be aware when reading the schemas that overlap is by name only, not by shape.
- **Drizzle `references` to `tenant.id` from app code.** App schemas can't import from `@platform/tenancy/internal` (B-035 ESLint rule). Phase 3 agent should declare `tenantId: uuid('tenant_id').notNull()` *without* `.references()`. The FK is enforced by Postgres (declared in `0003_app_tenancy.sql`). Drizzle types stay clean.
- **GTM table count was 31 not 32.** Plan said 32 ("excluded one as system-only" implying 33 total). Actual: 33 in scope, 1 excluded (`book_search_index`), 1 dual-counted with DWA via shared name (`profile`+`lesson_feedback`), 31 GTM-unique to migrate. Phase 2 SQL covers the actual count via `IF EXISTS`; don't sweat the plan-vs-reality 1-table drift.

## First action: spawn Agent #1 (Phase 3)

Skeleton brief:

> You are executing **Phase 3** of the B-009 multi-tenancy migration. Read [`docs/Paas/B-009-migration-plan.md`](B-009-migration-plan.md) and [`docs/Paas/B-009-handoff.md`](B-009-handoff.md) FIRST. Phase 1 (plan) and Phase 2 (`infra/migrations/0003_app_tenancy.sql`) are already done; do not modify them.
>
> **Task:** mirror the SQL migration in the Drizzle schemas. For each table listed in the migration plan as "tenant_id added", add this column to the table's pgTable definition in `apps/dwa/lib/db/schema.ts` or `apps/gtm/lib/db/schema.ts`:
>
> ```ts
> tenantId: uuid('tenant_id').notNull(),
> ```
>
> Do NOT add `.references()` — the FK is enforced by Postgres (B-035 ESLint rule blocks the necessary cross-package import). Document this with an inline comment on each addition.
>
> **Tables to update** (per plan):
> - DWA (17): `profile`, `mood_entry`, `coach_session`, `lesson_feedback`, `forum_bookmark`, `distress_event`, `provider_profile`, `provider_patient`, `patient_assignment`, `provider_invite`, `content_embedding`, `moderation_log`, `ai_classification_event`, `forum_topic_classification`, `content_quality_score`, `content_atomization_tag`, `clinical_component_data`
> - GTM (31): `profile`, `subscription`, `roleplay_session`, `lesson_event`, `chat_session`, `chat_message`, `assessment_snapshot`, `forum_topic_sync`, `forum_post_sync`, `content_version`, `pod`, `pod_member`, `member_matching_profile`, `pod_activity`, `facilitator_context`, `persona_activity`, `forum_analytics_event`, `nodebb_user_map`, `activity_event`, `social_signal`, `book_purchase`, `book_reading_event`, `seo_research`, `form_submission`, `user_component_state`, `form_workflow_log`, `connected_account`, `outreach_log`, `pipeline_deal`, `lesson_feedback`, `document_embedding`
> - **EXCLUDED:** `user`, `session` (Lucia auth — stay app-local until @platform/identity claims them); `book_search_index` (system-only catalog content).
>
> **Constraints (from CLAUDE.md "Spawning agents for large work"):**
> - **Do NOT run `pnpm install`, `pnpm test`, `pnpm build`, `next build`, or any network/cold-start command.** Static edits + grep verification only.
> - Verify completeness via `grep -c "tenantId: uuid('tenant_id')" apps/dwa/lib/db/schema.ts apps/gtm/lib/db/schema.ts` — must be 17 and 31.
> - Commit before declaring done with message: `feat(apps): mirror tenant_id in dwa/gtm drizzle schemas (B-009 phase 3)`.
> - Stop and flag if anything looks off vs the plan; do not improvise.
>
> **Final report:** coverage ledger (every table → updated/skipped), commit hash, diff stat (added lines per file), worktree branch path.

Run with `subagent_type: "general-purpose"` and `isolation: "worktree"`.

## After Phase 3 lands

Pull the worktree branch into `b-009-migration`. Then move to **Phase 4 (inline)**: write `apps/dwa/lib/db/with-tenant.ts` and `apps/gtm/lib/db/with-tenant.ts`. Reference implementation is [`packages/tenancy/src/withTenant.ts`](../../packages/tenancy/src/withTenant.ts) — copy the structure, but use the app's `getDb()` pool and the app's local schema typing. Per plan §D-1.

Continue down the table.

## Open questions for the user (if not already answered)

- **Feature branch name:** OK to use `b-009-migration`? Or different convention?
- **Source repos:** Plan §"Out of scope" says source repos (`mental-health-education-platform-main`, `customer-acquisition-academy-vps`) don't get this migration because they don't have the platform spine. Confirm.
- **Phase 9 verification gate:** Required tests are `pnpm -r typecheck` + extended leak harness. Anything else needed before merge to main?
