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
- `withTenant` is fully wired (B-009, 2026-04-26): opens a Drizzle transaction, pins `SET LOCAL ROLE platform_tenant`/`platform_system`, and sets `app.tenant_id`/`app.user_id` GUCs. Tenant-scoped tables have `tenant_id NOT NULL DEFAULT current_setting('app.tenant_id', true)::uuid`, so inserts inside `withTenantApp` auto-fill the column from the GUC.
- For `apps/dwa` and `apps/gtm`, use the per-app wrappers `withTenantApp` / `withSystemAdminApp` from `apps/{dwa,gtm}/lib/db/with-tenant.ts`. These mirror `withTenant` but yield a transaction typed against the app's local Drizzle schema (per ADR §D-1 in [docs/Paas/B-009-migration-plan.md](docs/Paas/B-009-migration-plan.md)).

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

## Audits, reviews, sweeps — mandatory discipline

Any task phrased as "audit", "review", "sweep", "comprehensive", "complete", "full", "deep", "production-harden", "security review", or otherwise implies exhaustive coverage triggers the rules below. These rules are non-negotiable. They exist because prior audits quietly narrowed scope and produced confident-looking summaries that missed the majority of the code — that cost the user months.

1. **Declare scope BEFORE touching any file.** Produce a complete file inventory of the audit target. Every file or directory is categorized as:
   - `READ` — will be fully read and analyzed.
   - `VENDORED` — third-party code not authored here (`node_modules/`, `**/dist/`, `**/.next/`, `**/.turbo/`, `coverage/`, build output, lockfiles). These are not our code and are out of scope by definition.
   - `GENERATED` — `.d.ts.map`, `.js.map`, `tsbuildinfo`, `.next/*`, `dist/*`, etc. Out of scope.
   - `EXPLICIT SKIP (reason)` — only with an explicit reason that is either (a) previously approved by the user in the same conversation, or (b) obviously non-code (binary assets, images, fonts, `public/*.pdf`, video). Any judgement call of "probably low value" is NOT a valid reason.

   Wait for the user to approve the inventory before reading any in-scope file. Do not take "yes proceed" from the original high-level request as approval for the inventory — the inventory is a separate gate.

2. **Produce a coverage ledger in the final report.** For every file in the inventory, one of: `READ (findings: N)` / `READ (clean)` / `SKIPPED (reason)` / `PARTIAL (what was read, what wasn't, why)`. A file in the inventory that doesn't appear in the ledger is a bug in the report.

3. **No subagents without explicit permission.** For audits, the user has stated subagents are forbidden by default — the audit is performed by the main agent, reading each file directly. If a subagent is proposed, it must be explicitly approved with scope, and its output must be verified file-by-file before being folded into the report.

4. **No "budget" decisions.** Do not shrink scope because the task is large. Do not triage to "highest risk" without explicit permission. Do not summarize when asked to audit. If the task genuinely cannot fit, STOP and report what remains — do not produce a summary that hides the gap.

5. **When a tool call or subagent fails, report it — do not silently degrade.** If a helper call errors (e.g., an Agent spawn fails), surface that error and ask how to proceed. Do not quietly fall back to a narrower method.

6. **The final summary is not self-graded.** Do not claim "definition of done" or "comprehensive" unless the coverage ledger shows 100% of the in-scope inventory in `READ` state. Partial completions are reported as partial, explicitly, with what remains.

7. **If the user says "every line of code", that is literal.** Not "every important file", not "highest-risk paths", not "representative sample". Every file marked `READ` in the inventory is read end-to-end.

## Spawning agents for large work — standard procedure

This rule exists because two consecutive agent attempts on the B-009
migration failed (one stream-idle-timeout after producing only the
plan, one stalled before reading anything) and lost hours of
uncommitted work each. The pattern below is the *standard procedure*
when delegating to subagents for large work — use it instead of
one-shot "do everything" briefs.

1. **Plan first, in-conversation.** Produce a plan doc at
   `docs/Paas/<task>-plan.md` with: scope inventory, architectural
   decisions (numbered D-1, D-2, …), sequenced phases, verification
   gates. Do this in the main conversation, not via an agent —
   architectural calls require user input that agents can't gather.

2. **Split into bounded tasks.** Each agent gets one phase, capped at
   ~10–15 min of pure edits. Agents that take longer hit stream
   timeouts and lose all uncommitted work. If a phase is bigger
   (e.g., an 80-site bulk refactor), split into batches with literal
   file lists in the brief.

3. **No long-running commands in agent briefs.** Forbid
   `pnpm install`, `pnpm test`, `pnpm build`, `next build`, `git push`,
   `gh pr create`, anything that hits the network or initializes a
   cold `node_modules` tree. Agents in `isolation: "worktree"` start
   from a fresh checkout with no `node_modules` — running install
   hangs them. Verification is via `grep` / file existence / static
   reads only. The main-conversation user runs the typecheck/test
   commands after merging.

4. **Commit per phase boundary.** Brief each agent to commit before
   declaring done, with a prescribed message format
   (`feat(scope): description (TASK phase N)`). A stream timeout
   mid-run still leaves prior commits durable on the worktree branch.

5. **Read the plan first; do not re-litigate.** Brief explicitly says:
   "Plan is approved scope. Execute, do not redesign. If you find a
   flaw mid-execution, stop and flag it — do not silently improvise
   past architectural decisions."

6. **Sequential when phases depend on each other.** Each agent spawns
   from a feature branch that already contains prior phases' commits.
   Don't try to parallelize phases that consume each other's output —
   produces merge conflicts and stale assumptions. The main
   conversation merges each agent's worktree branch into the feature
   branch between agents.

7. **Coverage ledger + diff stats** before the agent declares done.
   Same discipline as the audit rules above — no self-grading,
   partial completions reported as partial with explicit "what
   remains."

## Secret handling — non-negotiable

This rule exists because the same defect class has recurred across
multiple files: plaintext API keys in markdown playbooks (B-006),
plaintext root SSH passwords in deploy scripts (B-049), a second
plaintext root SSH password in a lesson guide (B-057), default
credentials shipped in docker-compose (B-051), bearer-compare built
from `${undefined}` (B-029), admin secrets accepted as query strings
(B-042), `VERCEL_ENV`-gated production guards that silently opened in
Dokploy (B-044), and `StrictHostKeyChecking=no` in a GH Actions
workflow (B-058). The user has spent multiple multi-hour rotation
cycles as a result. This rule makes the next recurrence mechanically
impossible.

**Never write a plaintext credential into any tracked file, ever.** A
"credential" includes: API keys, bearer tokens, passwords, SSH private
keys, database URLs with embedded passwords, webhook signing secrets,
encryption keys, JWT signing secrets, service-account JSON. Applies
to: source code, shell scripts, `.md`/`.mdx` docs, runbooks, commit
messages, `docker-compose*.yml`, `Dockerfile`, GH Actions YAML, any
file under `infra/`, `scripts/`, `apps/*/docs/`, and every runbook
slot under `docs/`.

**The only acceptable shapes:**
- Environment variable reference: `$VAR`, `${VAR}`, `process.env.VAR`.
- Obvious placeholder: `YOUR_API_KEY`, `<API_KEY>`, `REPLACE_ME`.
- Redacted documentation: `sk-...REDACTED...`, `ghp_xxxx`, `•••`.
- The repo's `.env.example` file with the value field empty:
  `RESEND_API_KEY=`.

**What to do when a credential is needed in docs:**
- Reference the variable name, not the value.
- If an example is needed, use an obvious fake: `YOUR_API_KEY`.
- If a runbook step requires retrieving the real value, tell the
  reader where to get it (1Password vault name, Dokploy environment
  tab, etc.) — do not paste it.

**What to do when you see a plaintext credential in existing code:**
- Do not commit the file as-is, even to "fix it later."
- Replace the plaintext value with a placeholder or env reference.
- Add the actual value to the rotation list at
  `docs/Paas/rotation-list.md` so the user can rotate it during the
  next close-out pass.
- If the file is already in git history (not just the working tree),
  note "in git history — needs filter-repo + rotation" next to the
  entry; a working-tree edit does not burn the credential any less.

**Enforcement:** `.gitleaks.toml` + `.git/hooks/pre-commit` in this
repo (and in both source repos) blocks commits that introduce
secrets. The `secret-scan` GitHub Actions workflow catches anything
that bypasses the hook (including `--no-verify`). If either gate
fires, treat it as a real leak until proven otherwise — do not
silence by adding paths to the allowlist without explicit user
approval. The allowlist is for false-positive classes (MDX component
props, placeholder strings, public-by-design web keys), never for
real secrets the author intends to commit.

**Scripted deploys must not use password auth.** `sshpass`,
`StrictHostKeyChecking=no`, and plaintext `$VPS_PASS` env vars in
workflows are all banned. SSH deploys use ed25519 keys and pinned
`~/.ssh/known_hosts` entries; the GH Actions workflow uses a
`KNOWN_HOSTS` secret, not `-o StrictHostKeyChecking=no`.

## Deployment

Dokploy. Per-environment configuration under [infra/dokploy/env/](infra/dokploy/env/) (`dev`, `staging`, `prod`). One Dokploy app per first-party vertical so they scale and roll back independently. A Dokploy MCP is wired into Claude Code in this workspace — prefer it over manual UI/CLI for reading deploy state and logs.
