# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

pnpm 9 + Turborepo monorepo, TypeScript ESM, Node ≥ 20. Workspaces: `apps/*`, `packages/*`, `adapters/*`, `tools/*` (see [pnpm-workspace.yaml](pnpm-workspace.yaml)). `verticals/*` and `services/*` are tracked outside the workspace globs (vertical manifests are content, not packages).

## Commands

```bash
corepack enable && corepack prepare pnpm@9.15.0 --activate
pnpm install
pnpm -r build          # or: turbo run build
pnpm -r typecheck
pnpm -r test
pnpm -r lint

# single package
pnpm --filter @platform/tenancy build
pnpm --filter @platform/tenancy typecheck

# clean
pnpm -r clean          # removes dist + .turbo + tsbuildinfo
```

Most packages are still stubs: `lint`/`test` scripts currently echo placeholders. Treat `typecheck` as the real correctness gate until those land.

Turbo task graph ([turbo.json](turbo.json)): `build`, `typecheck`, `test`, `lint` all `dependsOn: ["^build"]`, so dependents need their deps built first. `dev` is `cache: false, persistent: true`.

## Architecture — the four layers

The platform is a **modular monolith** (ADR-style decisions in [docs/adrs/](docs/adrs/)). One Next.js + tRPC server per environment, packaged as a single Docker image, deployed to one Dokploy app per first-party vertical. `@platform/*` packages are imported, never invoked over the network.

1. **Core** — `packages/*` (`@platform/*`) + `adapters/*` (`@adapter/*`). Internal platform. Never sold directly.
2. **Verticals** — `verticals/*`. First-party branded apps you operate. A vertical is a `manifest.json` + content + prompts + (optionally) extension package. **Hard rule: no vertical may fork an engine.** If it needs something, the engine grows a hook.
3. **Licensed** — same vertical code, re-skinned per customer. Manifests are platform-reviewed and version-pinned.
4. **Studio** — self-serve sandboxed builder. Narrower allowed module set than first-party.

**Engine admission rule:** no engine lands in `packages/` without ≥2 vertical consumers or a third committed use case.

## The vertical manifest is the source of truth

A vertical is fully described by 12 primitives, all Zod-validated and semver-versioned. Schema: [packages/contracts/src/manifest.ts](packages/contracts/src/manifest.ts). Loader: [packages/manifest-loader/src/](packages/manifest-loader/src/).

Two registries are **closed enums** — adding to them requires a platform PR, not a vertical change:

- **Roles** — [packages/contracts/src/roles.ts](packages/contracts/src/roles.ts): `super_admin | tenant_admin | operator | member | external_partner`. Verticals *enable* roles; they don't *define* them. No custom RBAC in v1.
- **Events** — [packages/contracts/src/events.ts](packages/contracts/src/events.ts): fixed `EventNameZ` enum. Billing and analytics depend on cross-tenant legibility — free-form event names break that.

Clinical instruments (GAD-7, PHQ-9, etc.) are platform-owned and immutable; verticals reference them and cannot fork them.

## Tenant isolation — the load-bearing rule

Every DB-touching engine MUST go through [packages/tenancy](packages/tenancy/src/). The `withTenant(ctx, fn)` wrapper opens a transaction and `SET LOCAL app.tenant_id` / `SET LOCAL ROLE` so RLS is enforced.

- Engines **import the `TenantTx` type alias** from `@platform/tenancy` and accept it as a parameter. Never reach for `db` directly.
- `withSystemAdmin` is the only legal escape hatch and is reserved for platform-level work.
- The current `withTenant` body is a stub that throws — the real Drizzle wiring lands with migration 0001 (Blueprint §10 Day 3). Until then, write engines against the type signature, not against runtime behavior.

Tenant resolution happens in each app's `middleware.ts` via `resolveTenant({ host })` from [packages/tenancy/src/resolveTenant.ts](packages/tenancy/src/resolveTenant.ts) — also currently a stub returning `null`.

## Adapters

Each external integration is its own package under `adapters/` (`@adapter/*`): `llm-openrouter`, `mail-resend`, `pay-polar`, `storage-s3`, `vector-pgvector`, `forum-flarum`, `forum-nodebb`, `classifier-maia`. Engines depend on adapter *interfaces* (defined in the engine), and the wiring picks an adapter per environment. Don't import an adapter directly from a vertical — go through the engine.

## Shells

Two app shells, not three or per-vertical (Blueprint §C.2):

- `apps/shell-mosaic` — Cruip Mosaic-derived. Used by all first-party and licensed verticals. Branding via theme pack, navigation via manifest.
- `apps/shell-studio-tenant` — stripped-down generic runtime for Studio-created tenants. Smaller surface, locked layout.

Note: `apps/` is currently empty in the repo — shells haven't been scaffolded yet.

## Current implementation state

This repo is in early-scaffold. Many files are intentional documented stubs that pin a public API shape so other packages can be written against them today. Look for comments referencing `Blueprint §X` or `ADR NNNN` and `lands in Commit N` — those are the deliberate forward-references. Don't "fix" a stub by inventing the implementation; check the referenced blueprint section first.

## Where to look for the "why"

- [docs/adrs/](docs/adrs/) — architectural decisions (currently empty; populated as decisions land).
- [docs/runbooks/](docs/runbooks/) — deploy, rollback, tenant onboarding, incident.
- [../PaaS/Productized Platform Blueprint — Hard Decisions Edition.md](../PaaS/Productized%20Platform%20Blueprint%20%E2%80%94%20Hard%20Decisions%20Edition.md) — the canonical "what / why / what's killed" document. Section references in code (`§6.3`, `§7.2`, etc.) point here.
- [../PaaS/Implementation Blueprint — SoloFrame Platform.md](../PaaS/Implementation%20Blueprint%20%E2%80%94%20SoloFrame%20Platform.md) — sequenced implementation plan.

## Deployment

Dokploy. Per-environment configuration under [infra/dokploy/env/](infra/dokploy/env/) (`dev`, `staging`, `prod`). One Dokploy app per first-party vertical so they scale and roll back independently. A Dokploy MCP is wired into Claude Code in this workspace — prefer it over manual UI/CLI for reading deploy state and logs.
