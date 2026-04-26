# SoloFrame Platform — Status Report (2026-04-23)

## 1. What this is

A **multi-tenant PaaS** for shipping branded vertical SaaS apps from a single modular-monolith codebase. The working theory: a small core engine + content-only "vertical manifests" beats N forked codebases. The goal product is a platform where a new vertical (e.g. "Digital Wellness Academy", "GTM-OS") ships via content + a JSON manifest — no engine fork — and where you can eventually license the same engine white-label or expose a self-serve Studio.

Two planning documents in `/Volumes/ext-data/github/PaaS/` drive everything:
- [Productized Platform Blueprint — Hard Decisions Edition.md](./Productized%20Platform%20Blueprint%20%E2%80%94%20Hard%20Decisions%20Edition.md) — the "what / why / what's killed" canon (~29 KB)
- [Implementation Blueprint — SoloFrame Platform.md](./Implementation%20Blueprint%20%E2%80%94%20SoloFrame%20Platform.md) — the sequenced build plan (~75 KB)

Implementation lives in [../solofame-platform/](../solofame-platform/) — a pnpm + Turborepo monorepo.

## 2. Status & timeline

- **37 commits, 2 days of active work** (2026-04-22 → 2026-04-23) — this is a fresh, fast-moving build.
- Early scaffold → **first tenant seeded end-to-end on a live Docker Swarm tonight** (2026-04-23, commit `2880405`). That's the milestone line: the data plane is proven working.
- 16 ADRs accepted (`docs/adrs/`), 0 rejected.
- 2 migrations applied on prod Postgres (`infra/migrations/`).
- **Proven end-to-end chain:** Dokploy schedule → docker exec → ops-seed-tenant → run-and-trace → `@platform/tenancy` `withSystemAdmin` → Postgres → `system_audit` trace row → admin debug endpoint readback.

## 3. Architecture — four layers

Declared in `CLAUDE.md` and ADR-0001:

1. **Core** — `packages/*` (`@platform/*`) + `adapters/*` (`@adapter/*`). Internal. Never sold.
2. **Verticals** — `verticals/*`. First-party branded apps. A vertical = `manifest.json` + content + prompts. **Hard rule: no vertical may fork an engine.**
3. **Licensed** — same vertical code re-skinned per customer (not yet active).
4. **Studio** — self-serve sandboxed builder (not yet active).

**Admission rule:** no engine lands in `packages/` without ≥2 vertical consumers or a third committed use case.

Deployment model (ADR-0012): one Next.js + tRPC server per environment, packaged as a single Docker image, **one Dokploy app per first-party vertical** so they scale and roll back independently.

## 4. Core packages (`packages/*`)

| Package | Status | Purpose |
|---|---|---|
| `@platform/contracts` | **Complete** | Zod-validated `VerticalManifestZ`, fixed `RoleZ` enum (5 roles), fixed `EventNameZ` enum (12 events). Both registries closed — additions require a platform PR (ADR-0007). |
| `@platform/tenancy` | **Load-bearing, working** | `withTenant` opens a Drizzle tx, `SET LOCAL ROLE platform_tenant`, `SET LOCAL app.tenant_id` — RLS policies key off that GUC. `withSystemAdmin` is the only legal escape hatch. Resolver (`resolveTenantBySlug`/`ByHost` with 60s in-process cache), `requireTenantContext` with membership gate (landed today, commit `a925101`). |
| `@platform/identity` | **Functional** | Lucia factory, wired into both apps. |
| `@platform/manifest-loader` | **Functional** | Reads, validates, hashes manifests. Dev-only hot-reload (ADR-0005). `getManifestById` with in-process cache (commit `95f8d00`). |
| `@platform/testing` | **Functional** | `tenantLeakHarness` — inserts rows as tenant A, pins `app.tenant_id` to B, asserts 0 rows visible. The RLS regression gate. |
| `@platform/prompt-registry` | Stub with parser/registry (~216 LOC) | YAML prompt loader. |
| `@platform/observability`, `@platform/ai-orchestration`, `@platform/ui-shell`, `@platform/ui-primitives` | **Stubs** | Pinned public API, implementations pending. |

## 5. Adapters (`adapters/*`)

Each external integration is its own package; engines depend on **interfaces** and wiring picks the adapter. All eight are **stubs** — interfaces pinned, bodies pending:

- `@adapter/llm-openrouter` — primary LLM (ADR-0013)
- `@adapter/vector-pgvector` — default vector store (ADR-0014)
- `@adapter/mail-resend`, `@adapter/pay-polar`, `@adapter/storage-s3`
- `@adapter/forum-flarum` (used by DWA), `@adapter/forum-nodebb` (used by GTM)
- `@adapter/classifier-maia` — mental-health distress classifier sidecar

## 6. Database & tenant isolation (the spine)

`infra/migrations/0001_tenancy.sql` + `0002_rls_helpers.sql` are **applied on the live DB**:

- Two Postgres roles: `platform_system` (all tenant data, via `system_bypass` policy), `platform_tenant` (RLS-scoped to `current_setting('app.tenant_id')::uuid`). Neither has `BYPASSRLS`.
- Tables: `tenant`, `tenant_member`, `tenant_audit`, `system_audit`, `tenant_quota_counter`, `billing_meter_event`, `billing_meter_daily`, `event_outbox`, `event_dispatch_log`.
- **Postgres-as-event-bus** (ADR-0009): `event_outbox` + LISTEN/NOTIFY trigger — no Kafka, no SQS, at least until volume forces it.
- Metering raw events for billing (ai.tokens.in/out, storage.bytes, mau, emails.outbound) with a daily rollup table.
- `apply_tenant_policies(regclass)` helper — any new tenant-scoped table calls it once.

ADR-0003 + ADR-0004: shared Postgres + RLS is the default; dedicated DB is a paid SKU. Enforcement at the **data** boundary, not app code.

## 7. The vertical manifest

12-primitive manifest (`packages/contracts/src/manifest.ts`): id, version, kind, modules, compliance, ai config, branding, navigation, prompts, knowledge, scenarios, assessments, artifacts, workflows, events, roles, billingPlans, features, extensions. All Zod-validated, semver-pinned, git-tracked (ADR-0006).

**Two live first-party verticals:**

- `verticals/dwa/manifest.json` — Digital Wellness Academy. PHI=true, 2557-day retention, Flarum forum, MAIA distress classifier, guardrails `never-diagnose` + `always-988-on-crisis`.
- `verticals/gtm/manifest.json` — GTM-OS. PHI=false, 395-day retention, NodeBB forum, no clinical guardrails.

`verticals/_template/` is the scaffold for new verticals; `tools/new-vertical` is the CLI.

## 8. Apps (the shells)

Both shells were lifted out of pre-existing production repos on 2026-04-22 (commit `f369e54`) and stabilized:

- `apps/dwa` — Next 16, React 19, Lucia auth, Drizzle, OpenAI/OpenRouter, pgvector RAG, Flarum integration, MAIA sidecar. Was the "Mental Health Refactoring" app.
- `apps/gtm` — Next 16, Polar checkout, NodeBB community, Notion OAuth, Resend email, Badgr open-badge issuer. Was the "GTM-OS" app.

Both apps: typecheck green across 25 Turbo tasks (commit `1a61f64`), build verified on Day 2 (commit `cc063a3`), bundled into a single multi-app `Dockerfile` with `APP=gtm|dwa` build-arg, edge-middleware regressions fixed (`97c6b58`).

The blueprint calls for consolidating both into ADR-0002's **two** shells (`shell-mosaic` + `shell-studio-tenant`). Right now they're the original lifted shells — consolidation is pending.

## 9. Deployment (live on Dokploy)

Dokploy is the **runtime control plane** (ADR-0011). State pinned in `infra/dokploy/state.json`:

- Project `solofame-prod` on `dokploy2` — project + env + postgres + redis live.
- Postgres: `postgres-primary-xjydtw` (pgvector/pgvector:pg16), DB `solofame`, user `app_user`.
- Redis: `redis-primary-t7c2ws` (redis:7-alpine).
- Sidecars: n8n + Metabase (commit `0134b52`).
- Apps: `gtm` at gtm.soloframehub.com, `dwa` at dwa.soloframehub.com — both wired with Let's Encrypt certs (commit `0e6f010`).
- **ops-runner** container + 4 manual-trigger schedules: `apply-migrations`, `seed-tenant-demo`, `seed-tenant-gtm`, `leak-harness` (commit `5920c76`).

Provisioning is scripted in `tools/dokploy/provision-01..06` — all idempotent, all driven by Dokploy's REST API via the `dk` wrapper.

**First tenant seeded tonight** (2026-04-23, 11:26 PM): `tenant 0c3d0495-ae0b-45ce-b3a2-e2fb424da733 (slug=demo)` on `postgres-primary-xjydtw` via ops-runner from **inside** the Swarm — no external port exposed. B-003 path permanently sidestepped.

## 10. Engineering discipline

- **`docs/bug-patterns.md`** — 983 lines cataloging 26 bug classes (B-001…B-026), each with grep signature, symptom, fix commit, and cross-codebase sweep status. Tonight alone added B-023…B-026 from the ops-runner end-to-end arc.
- **`docs/source-repo-backports.md`** — 352 lines tracking which fixes still need to be ported back to the pre-lift source repos (which remain deployed).
- **`.dependency-cruiser.cjs`** — architectural guardrails enforced in CI.
- **`tools/eslint-plugin-platform`** — custom lint rules (stub).
- **CI:** GitHub Actions + CODEOWNERS + typescript-eslint wired (commit `7da36a0`).
- **ADR-0015:** no new code lands in `apps/*/lib/` — new shared code belongs in `packages/`.

## 11. User value (why this exists)

For the **operator** (you):
1. **One codebase, many branded apps.** DWA and GTM-OS are content + manifest, not forks. New vertical = scaffold + manifest + content.
2. **Isolated blast radius.** Each first-party vertical is its own Dokploy app — deploy, roll back, and scale independently. One bad deploy doesn't take the portfolio down.
3. **Shared data plane, isolated tenants.** Shared Postgres + RLS means no per-tenant DB provisioning overhead, but tenant data cannot leak — enforced at the DB, not app code.
4. **Ops as code.** Six idempotent provision scripts replay the infra from any empty Dokploy. No click-ops.

For the **end customer** (eventually):
5. **Licensed SKU** — resell the engine to partners without forking.
6. **Studio SKU** — self-serve vertical builder on a locked-down allowlist.
7. **Compliance-aware content** — PHI/GDPR settings are vertical-level, so verticals with stricter rules (DWA) get stricter data handling automatically.

## 12. What's next (based on git trajectory)

- **Real AI orchestration + prompt-registry bodies** — both currently stubs.
- **Outbox dispatcher** — the tables and trigger exist; the worker that drains `event_outbox` → subscribers doesn't yet.
- **Billing meter wiring** — tables exist; no emitter in the engines yet.
- **Shell consolidation** — `apps/dwa` and `apps/gtm` → `apps/shell-mosaic` with manifest-driven branding.
- **Cloud logs dashboard** to replace the temporary `/api/admin/debug/audit` endpoint (noted in commit `079a2da`).
- **Backport sweep** to upstream source repos per `source-repo-backports.md`.

---

**Bottom line:** 2 days in, the spine is real — RLS-enforced multi-tenant Postgres, a Zod-validated manifest system, two verticals with working manifests, two apps green-building, a scripted Dokploy deploy, and an end-to-end tenant-seed chain proven on a live Swarm tonight. The engines (AI orchestration, prompt registry, observability, UI shells) are still largely stubs with pinned APIs — the next phase fills those in against the already-working data plane.
