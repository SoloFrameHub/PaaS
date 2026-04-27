# Bug patterns found and their cross-platform risk

A running catalog of bugs discovered during development — captured so we
can detect recurrences when touching a new vertical, lifting another
app, or reviewing PRs. Each entry: what the bug looked like, where it
was fixed, a grep signature for finding more of it, and a one-line
status on whether we've swept the codebase.

**Keep this list updated.** When you fix a bug whose class could
plausibly exist in another file — especially any shape-of-the-bug that
would survive lint but break at runtime or in stricter type checking —
add an entry here.

**Fixes in this monorepo don't propagate upstream.** Many of these
bugs still exist in the source repos that `apps/gtm` and `apps/dwa`
were lifted from — and those source repos are still deployed to
production. After fixing a bug here, if the class likely exists in an
upstream source repo, add a per-repo entry to
[`docs/source-repo-backports.md`](source-repo-backports.md) so the fix
can be ported out.

---

## Runtime bugs — silent until observed

### B-001 · Drizzle `.where()` built with JS `===` instead of `eq()`

**What:** WHERE clauses constructed as `.where(col === value)`. JS
evaluates `col === value` to `false` (comparing a column object to a
string/UUID), which is then passed to `.where()`. The generated SQL
matches zero rows, silently.

**Symptom:** `tsc --noEmit` under strict mode flags this as
`TS2345/TS2367` ("boolean not assignable to SQL"). Without strict
typechecking, the query just quietly does nothing.

**Seen in:** `apps/dwa/app/api/cron/purge-deleted-accounts/route.ts`
(6 clauses across the cron). The GDPR/data-retention cron was a no-op
in production. Fix in [1a61f64](commit 1a61f64).

**Grep signature:**
```
grep -rnE '\.where\([^)]*[a-zA-Z_][\w.]*\.\w+\s*===' apps/ packages/ adapters/
```

**Cross-check:** swept `apps/`, `packages/`, `adapters/`. No other
occurrences as of 1a61f64.

**Going forward:** `pnpm typecheck` at the root must stay green — this
is how we catch this class in CI. `eslint-plugin-drizzle` has a rule
`drizzle/enforce-delete-with-where` that helps adjacently; look into
adding it once the lint rules land.

---

### B-002 · Unescaped apostrophe in single-quoted JSX string literal

**What:** `desc: 'each employee's role'` — single quote closed at the
first apostrophe, then the parser goes off the rails. Gives
`TS1002: Unterminated string literal`.

**Symptom:** TypeScript compile failure, build failure. Catches in
`tsc --noEmit` immediately. Worth flagging because this was literally
line 1 of DWA's typecheck errors — a stop-everything crash hidden
inside an otherwise-valid file.

**Seen in:** `apps/dwa/app/(marketing)/for-employers/page.tsx:248`.
Fix in [1a61f64](commit 1a61f64) — switched outer quotes to double.

**Grep signature:**
```
grep -rnE "^[[:space:]]+[a-zA-Z_]+:\s*'[^']*[a-z]'[a-z]" apps/
```

**Cross-check:** no other occurrences in `apps/`. Clean as of 1a61f64.

---

## Configuration / environment bugs

### B-003 · Dokploy-managed Postgres: data volume can be wiped on first `.saveExternalPort`

**What:** Calling `/api/postgres.saveExternalPort` on a freshly-created
Dokploy-managed Postgres triggered an async swarm reconcile that
recreated the container several times in a ~10-minute window and wiped
the named data volume once. Any schema work applied before the
reconcile settled was lost.

**Symptom:** connection drops mid-`psql` session; after reconnect,
`pg_postmaster_start_time()` shows uptime < 60s and the tables you
committed are gone.

**Seen in:** first apply of `0001_tenancy.sql` on dokploy2 (2026-04-23).
Documented in `infra/dokploy/README.md`, workaround in
`infra/dokploy/migrations-applied.json`.

**Workaround (until we move to a better path):**
1. Open externalPort, poll `pg_postmaster_start_time()` until uptime > 120s
2. Apply all pending migrations in a **single** `psql -v ON_ERROR_STOP=1 -f a.sql -f b.sql` invocation
3. Close externalPort
4. Confirm via `nc -zv` that port is unreachable

**Long-term fix:** run migrations through Drizzle from inside a
tenant-runtime worker on cold start (blueprint §6.1), so the port is
never exposed.

---

### B-004 · Next.js `next-env.d.ts` required but gitignored — lifts must regenerate

**What:** `next-env.d.ts` is auto-generated and `.gitignored`. When
lifting an existing Next.js app via rsync with `--exclude='next-env.d.ts'`,
the target tree has no file to provide Next's image-module declarations
(`declare module '*.svg'` etc via `next/image-types/global`).

**Symptom:** 157 `TS2307` errors like `Cannot find module
'@/public/images/foo.svg' or its corresponding type declarations` even
though the file exists on disk.

**Seen in:** `apps/gtm` after the 2026-04-23 lift. Fix: regenerate in
each app directory (any `next` invocation does it, or write the
standard boilerplate):
```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

**Going forward:** any new app lift — or CI environment bootstrap —
must either run `next build` once or pre-populate `next-env.d.ts`
before typecheck.

---

## Schema / migration bugs

### B-005 · Postgres `CREATE POLICY` clause order: `FOR` must precede `TO`

**What:** Postgres' grammar is `CREATE POLICY ... [AS ...] [FOR ...]
[TO ...] [USING ...] [WITH CHECK ...]`. Writing `TO platform_tenant
FOR SELECT` in that order gives a syntax error at `FOR`.

**Seen in:** original `infra/migrations/0002_rls_helpers.sql` — the
`tenant_self_read` policy. Fix in [94cfd42](commit 94cfd42).

**Grep signature (to catch recurrences when writing new policies):**
```
grep -rnE 'CREATE POLICY[^;]+\bTO\s+\w+[^;]+\bFOR\s+(SELECT|INSERT|UPDATE|DELETE|ALL)' infra/migrations/
```

**Cross-check:** 0002 was the only file with this pattern. Clean.

---

## Secret / hygiene issues

### B-006 · Source repos ship with live API keys in markdown playbooks

**What:** succession / deployment / N8N-demo markdown files in both
prev-gtmos and mental-health-education-platform-main contained real
values: GitHub PAT, OpenRouter key, a legacy Dokploy API key, Gamma
key, Resend key, N8N JWT.

**Seen in (source repos; all copies were scrubbed from the monorepo
during the 2026-04-23 lift):**
- `prev-gtmos/SUCCESSION-ACCESS-CREDENTIALS.md`
- `prev-gtmos/REMOTE-CHANGES.md`
- `prev-gtmos/SUCCESSION-DEVELOPMENT-GUIDE.md`
- `prev-gtmos/SESSION-PLAYBOOK-2026-02-20.md`
- `mental-health-education-platform-main/docs/reference/legacy-lesson-guides/LESSON-1-1-DEPLOYMENT-RECORD.md`
- `mental-health-education-platform-main/docs/reference/legacy-lesson-guides/LESSON-DEPLOYMENT-CHECKLIST.md`
- `mental-health-education-platform-main/websites/digitalwellness-academy/N8N_DEMO_WORKFLOW.md`
- `mental-health-education-platform-main/websites/digitalwellness-academy/DEMO_REQUEST_IMPLEMENTATION.md`

**Status:** removed from this repo in [f369e54](commit f369e54).
Rotation status: **TBD — user task**. The source directories still hold
them.

**Going forward:** before any future lift, run
`tools/secret-scan.sh` (does not yet exist — write it when we lift the
third vertical). For now, the manual recipe:
```
grep -rnE '(ghp_[A-Za-z0-9]{20,}|ghs_[A-Za-z0-9]{20,}|sk-or-v[0-9]+-[a-f0-9]{30,}|\bre_[A-Za-z0-9_]{20,}\b|AIza[A-Za-z0-9_-]{35}|AKIA[A-Z0-9]{16}|eyJ[A-Za-z0-9_-]{30,}\.[A-Za-z0-9_-]{30,}\.[A-Za-z0-9_-]{10,}|xox[bp]-)' path/to/new/source/
```

---

### B-007 · Firebase removed from the stack but references remained throughout docs

**What:** DWA and GTM moved off Firebase months before the 2026-04-23
monorepo consolidation, but `firebase-config/`, `lib/firebase/`, seed
scripts (`seedFirestore.ts`, `seedRoleplayData.ts`, etc.), and
architecture docs (`README.md`, `PRODUCTION-GUIDE.md`) still named
Firebase as the auth / AI / DB layer.

**Risk category:** **misleading**, not breaking — no live code imports
these modules. But future readers (or AI agents) hit these docs before
current truth and build wrong mental models.

**Seen in / removed:** several commits: [ca22dff](commit ca22dff),
[346ff64](commit 346ff64), [d849549](commit d849549).

**Final cleanup (2026-04-25):** Firebase is firmly legacy — DWA and GTM
moved to VPS+Postgres for cost control with no plans to migrate back.
The remaining 18 files + 1 dead-code directory deleted in one batch
rather than carried as long-term tracking debt:

- `apps/dwa/DEPLOY.md`, `Audits/18-april-audit.md`,
  `Audits/18-april-audit-REMEDIATION.md`,
  `docs/production-deployment-guide.md`, `docs/PRODUCTION-GUIDE.md`,
  `docs/phase-b-audit-report.md`, `docs/MIGRATION-GOOGLE-TO-COOLIFY.md`,
  `docs/token-optimization.md`,
  `docs/archive/2026-Q1/README-stale-solo-frame-hub.md`,
  `docs/archive/2026-Q1/ARCHITECTURE.md` — DWA Firebase-era docs.
- `apps/dwa/docs/course-creation-context-and-prompts/` (8 files) —
  Firebase-era Cursor-prompt files for course content authoring.
- `apps/gtm/lib/firebase/{admin,client}.ts` — dead code; not imported
  anywhere; `_archive/lib/firebase/` copy preserved.

**Kept (not legacy-Firebase, refs are legitimate):**
- `apps/dwa/websites/Implementation Blueprint — PaaS Platform for SVTech site.md`
  — incidental historical mention in a planning doc.
- `apps/gtm/.agents/skills/n8n-automation/references/n8n-nodes-masterlist.md`
  — Firebase Realtime Database listed as one of n8n's many integrations.
- `docs/Paas/audit-prompts/README.md`, `audit-prompts/09.md`,
  `AUDIT-FULL-2026-04-23.md` — current audit infrastructure that
  references Firebase as something to *look for*, not as our stack.

**Source repos:** the dwa source repo (`mental-health-education-platform-main`)
also carries some of these Firebase-era docs — backport the deletes
when you do the next source-repo sync.

**Going forward:** if a doc is misleading-but-not-breaking and the
current truth is in `CLAUDE.md` / current code, default to deletion
not preservation. `git log` keeps history if anyone needs it.

---

## Dependency hygiene

### B-008 · Bare `playwright` import where `@playwright/test` is the installed package

**What:** `import { chromium } from 'playwright'` in a utility script
when only `@playwright/test` is in devDependencies. `@playwright/test`
re-exports the browser launchers, so the fix is just to swap the
specifier.

**Symptom:** `TS2307: Cannot find module 'playwright'`.

**Seen in:** `apps/dwa/scripts/capture-marketing-screenshots.ts`. Fix
in [1a61f64](commit 1a61f64).

**Grep signature:**
```
grep -rnE "from ['\"]playwright['\"]|require\(['\"]playwright['\"]\)" apps/ packages/ adapters/ | grep -v node_modules
```

**Cross-check:** no other occurrences as of 1a61f64.

---

## Blueprint-rule violations (expected pre-extraction, tracked for migration)

### B-009 · Raw `db` imports in app code (123 sites in `apps/`)

**Status: Resolved 2026-04-26** — see status entry near the bottom of
this doc for the full landing summary; commits `31dcfd7..7b1c12c` on
branch `b-009-migration`.

**What:** Blueprint §6 rule: "No raw `db` import outside
`@platform/tenancy/internal`. Everything goes through `withTenant()`."
The lifted apps predate this rule and have 123 direct imports of
`@/lib/db`, bypassing the tenancy boundary.

**Risk category:** **planned migration debt**, not a bug per se.
Tracked here so we don't lose sight of it.

**Grep signature:**
```
grep -rnE "from ['\"]@/lib/db['\"]|from ['\"]@/lib/db/" apps/ | grep -v node_modules | grep -v _archive
```

**Cleanup plan:** blueprint Days 3–4 (`withTenant()` + RLS
scaffolding) and then progressive extraction per vertical. The
`@platform/eslint-plugin`'s `no-direct-db-access` rule already exists
(`packages/eslint-plugin`); turn it on for `apps/*` once a critical
mass of call sites have been migrated.

---

## Framework migrations / runtime boundaries

### B-010 · Next.js 16 rename: `middleware.ts` and `proxy.ts` both present

**What:** Next.js 16 renamed the file convention from `middleware.ts`
to `proxy.ts` (with exported function renamed from `middleware` to
`proxy`). If both files exist at the app root the build hard-errors:
`Error: Both middleware file "./middleware.ts" and proxy file
"./proxy.ts" are detected. Please use "./proxy.ts" only.`

**Symptom:** `next build` exits 1 before compile starts.

**Seen in:** `apps/dwa` — both files existed post-lift. `middleware.ts`
had older request-ID tracing logic; `proxy.ts` had newer security
headers + CSRF. Merged request-ID logic into `proxy.ts` and deleted
`middleware.ts`. Fix in this commit.

**Grep signature:**
```
for d in apps/*/; do [ -f "$d/middleware.ts" ] && [ -f "$d/proxy.ts" ] && echo "collision: $d"; done
```

**Cross-check:** swept `apps/`. Only dwa had the collision. `apps/gtm`
still uses `middleware.ts` and gets the deprecation warning but
builds; migrate later when convenient.

---

### B-011 · Node `crypto` import inside Edge Runtime middleware/proxy

**What:** `import { randomUUID } from 'crypto';` at the top of an Edge
middleware. `crypto` is the Node builtin; it's not available in Edge
Runtime where middleware/proxy runs. In practice this would have
crashed at the first invocation. Replace with the global `crypto`
Web Crypto API — `crypto.randomUUID()` is available without import.

**Symptom:** depends on how Next.js bundles middleware. In older
versions this shipped but threw at runtime; newer Turbopack may flag
it at build as "module not found" in the Edge graph.

**Seen in:** `apps/dwa/middleware.ts` (now deleted; logic moved to
`proxy.ts` using the global `crypto.randomUUID()`).

**Grep signature:**
```
grep -rnE "^import .*\b(randomUUID|randomBytes|createHash)\b.* from ['\"]crypto['\"]" apps/*/middleware.ts apps/*/proxy.ts
```

**Cross-check:** no other occurrences across `apps/*/middleware.ts`
and `apps/*/proxy.ts`.

---

### B-012 · Request header mutation without `NextResponse.next({ request: { headers } })`

**What:** middleware/proxy does `const requestHeaders = new
Headers(request.headers); requestHeaders.set('x-request-id', id);` and
then returns `NextResponse.next()` — without passing the modified
headers. Downstream route handlers and server components see the
**original** request headers, so the mutation is a silent no-op.

**Symptom:** no error; the intended header never reaches downstream
code. Only visible if you verify end-to-end that the header shows up
in an API route.

**Seen in:** `apps/dwa/middleware.ts` (now deleted). Fix: when
propagating request headers, use
`NextResponse.next({ request: { headers: requestHeaders } })`.

**Grep signature:**
```
grep -rnE "NextResponse\.next\(\)" apps/*/middleware.ts apps/*/proxy.ts
```
(then manually inspect each hit for adjacent `requestHeaders.set(...)`
calls that were supposed to be propagated)

**Cross-check:** only the deleted `apps/dwa/middleware.ts` had this
shape. `apps/dwa/proxy.ts` now uses the correct form.

---

### B-013 · Polar SDK `Order.amount` does not exist — use `totalAmount`

**What:** Polar's `@polar-sh/sdk` `Order` model has `subtotalAmount`,
`discountAmount`, `netAmount`, `taxAmount`, `totalAmount`,
`appliedBalanceAmount`, `dueAmount`, `refundedAmount`,
`refundedTaxAmount`, `platformFeeAmount` — **but not** `amount`.
Referencing `order.amount` yields `undefined`; `(undefined ?? 0) / 100
= 0`, so GA4 purchase tracking sent `value: 0` for every order.

**Symptom:** `tsc --noEmit` under `moduleResolution: "bundler"` (which
honors the Polar SDK's `exports` map) flags this as `TS2339` — but
`moduleResolution: "node"` picks up a looser type declaration that
lets it slide. Next.js 16 auto-rewrites `tsconfig.json` to `bundler`
on first build, which is how this finally surfaced.

**Seen in:** `apps/gtm/app/api/webhook/polar/route.ts:80` — the GA4
purchase tracking in the Polar `onOrderPaid` webhook. Fix: use
`order.totalAmount` (cents, after discounts and taxes — matches the
original `/100` intent).

**Grep signature:**
```
grep -rnE '\b(order|payload\.data)\.amount\b' apps/ packages/ adapters/ --include="*.ts" --include="*.tsx" | grep -v /node_modules/ | grep -v /.next/
```

**Cross-check:** only the one GTM webhook site. Clean.

**Going forward:** keep `moduleResolution: "bundler"` in all app
`tsconfig.json` — it matches how Next.js and Turbopack resolve at
runtime and catches `exports`-map mismatches. The current per-app
tsconfigs all need to be `bundler`; `packages/*` tsconfigs can stay
on `node` since they're consumed by bundlers downstream.

---

### B-014 · Node `async_hooks` pulled into client bundle via a shared logger

**What:** a logger module (`lib/logger.ts`) imported a request-context
module (`lib/request-context.ts`) that used `AsyncLocalStorage` from
Node's `async_hooks`. Any client component that used the logger (e.g.,
`components/error-boundary.tsx`, a `'use client'` file) pulled the
entire transitive import graph into the client bundle, where
`async_hooks` does not exist.

**Symptom:** `Error: Module not found: Can't resolve 'async_hooks'` at
build. Turbopack prints the import trace showing
`Client Component SSR → logger → request-context → async_hooks`.

**Seen in:** `apps/dwa/lib/logger.ts` (direct import of
`request-context`) transitively imported by
`apps/dwa/components/error-boundary.tsx`.

**Fix (this commit):** invert the dependency. Logger exposes
`setLoggerContextProvider(fn)` and calls `fn?.()` when enriching logs.
`request-context.ts` is marked `import 'server-only'` and registers
the provider at module import time. Client bundles never import
`request-context`, so `async_hooks` stays out and the logger degrades
to no context enrichment on the browser — consistent with what the
old code did anyway (client calls had no AsyncLocalStorage scope).

**Grep signature (for other occurrences of this class):**
```
grep -rlE "^import .* from ['\"]async_hooks['\"]|^import .* from ['\"]node:async_hooks['\"]" apps/ packages/ adapters/ 2>/dev/null | grep -v /node_modules/ | grep -v /.next/
```
Each hit must be a module that is either (a) marked `server-only`, or
(b) never transitively imported from a `'use client'` file.

**Cross-check:** `apps/dwa/lib/request-context.ts` is now `server-only`
and no longer imported by the client-safe `logger.ts`. No other
occurrences of `async_hooks` imports in `apps/` or `packages/`.

**Going forward:** any module that imports a Node builtin
(`async_hooks`, `fs`, `crypto`, `net`, `child_process`, `worker_threads`,
`perf_hooks`, etc.) should declare `import 'server-only'` as its first
line. That's a hard failure at build if a client component pulls it
in, which beats a late runtime crash.

---

### B-015 · Edge subpath re-exporting a Node-only module pulls Node builtins into the Edge bundle

**What:** a module advertised as the Edge-safe entry point
(`@platform/<pkg>/middleware`) runtime-re-exports a symbol
(`export { X } from './y.js'`) from a sibling module that itself
imports Node-only builtins (`pg`, `crypto`, `fs`, etc.). The
re-exported symbol is never called from Edge code, but the import
graph still reaches the builtin. Turbopack bundles it; Next.js ships
the image; the Edge runtime crashes on first request with:

`Error: The edge runtime does not support Node.js 'crypto' module.`

**Why it slips through:**
- TypeScript strict typecheck: passes (legal).
- `next build` (Turbopack): passes — no runtime info at build time.
- Unit tests: pass — no Edge runtime in Node.
- Only surfaces when the Docker image runs and the first HTTP
  request enters the Edge chunk.

**Seen in:** `packages/tenancy/src/middleware.ts` had
`export { resolveTenant } from './resolveTenant.js'` left over from
the stub era. Once [98cbe3d](commit 98cbe3d) made `resolveTenant`
do real DB work via `withSystemAdmin` (→
`@platform/tenancy/internal` → `pg` → `node:crypto`), the Edge
bundle for `apps/gtm/middleware.ts` dragged `crypto` along. The
runtime `export { ... } from` line was the culprit — type-only
re-exports (`export type { ... }`) are erased at compile time and
stay safe. Fix in [97c6b58](commit 97c6b58): strip the runtime
re-export; keep the type-only one. Apps needing the async resolver
already import it from `@platform/tenancy` root, which is
Node-runtime by convention.

**Grep signature (find other Edge subpaths doing this):**
```
# Every Edge subpath file in workspace packages:
ls packages/*/src/middleware.ts adapters/*/src/middleware.ts 2>/dev/null
# For each, any runtime re-export (NOT `export type`):
grep -nE "^export \{" packages/*/src/middleware.ts adapters/*/src/middleware.ts 2>/dev/null
# For each re-exporting module, see what IT imports — the chain reaches
# back to Node-only builtins in nearly all B-015 cases.
```

**Compiled-output check (the truth at runtime):**
```
grep -E "^(import|export|require)" packages/*/dist/middleware.js
```
If the output contains anything other than plain `export function`
lines, audit each import target for transitive Node dependencies.

**Cross-check:** swept. As of 97c6b58,
`packages/tenancy/dist/middleware.js` has zero runtime imports.
No other `packages/*/src/middleware.ts` exists.

**Going forward:**
- Edge subpath convention: only export pure functions + types.
  Never `export { X } from '...'` at runtime from an Edge subpath,
  unless the target module is also provably Edge-safe (and that's
  fragile — a future commit can regress it invisibly).
- Apply `import 'server-only'` to the Node-runtime sibling modules
  (B-014 discipline). That makes Edge imports of them a hard build
  failure instead of a runtime crash.
- The `docker run` boot test we now do for every app after a build
  (curl / → HTTP 200) catches this class. Add it to CI when we
  land GH Actions for Docker builds.

---

## Workspace hygiene

### B-016 · `drizzle-orm` version skew across workspace packages

**What:** each workspace `package.json` pinned its own
`drizzle-orm` range. `apps/dwa` had `^0.45.2`, `apps/gtm` had
`^0.38.0`, `@platform/tenancy` / `@platform/testing` /
`@platform/identity` had `^0.36.4`. pnpm resolved these to three
different versions in `node_modules/.pnpm/`. Types from these
copies were structurally different (e.g., `ColumnDataType` added
`'dateDuration'` between minors), so when a workspace package
exposed a Drizzle `PgDatabase` / `PgTable` and an app consumed it,
typecheck failed at the boundary with:

`Type 'PgTableWithColumns<...@0.45.2...>' is not assignable to type
'PgTableWithColumns<...@0.36.4...>'.`

**Why it wasn't caught earlier:** pre-`@platform/identity`, no
workspace package exposed Drizzle types that an app consumed. Each
package was self-contained. The factory in `@platform/identity`
(createLuciaInstance) was the first to take an app's db / tables
as parameters.

**Seen in:** `apps/dwa` + `apps/gtm` + `@platform/identity`
boundary, surfaced in [d055698](commit d055698). Fix in that commit:
unified every workspace's `drizzle-orm` to `^0.45.2`. Typecheck
went back to 26/26; the `pnpm-lock.yaml` dropped 126 net lines.

**Grep signature:**
```
grep -E '"drizzle-orm":' apps/*/package.json packages/*/package.json adapters/*/package.json 2>/dev/null | sort -u
```
All hits should print the same version range.

**Cross-check:** all workspace packages on `^0.45.2` as of d055698.

**Going forward:**
- Any dep that flows across a workspace-package boundary (not just
  Drizzle — applies to `zod`, `typescript` peer types, `@types/*`,
  Next.js) must be pinned to a single version across the workspace.
- Consider an `.npmrc` `strict-peer-dependencies=true` setting once
  the tree stabilises — pnpm will refuse to install skewed majors.
- A root `pnpm.overrides` in `package.json` is the hammer if we
  ever need to force a pin faster than editing each leaf
  `package.json`.

---

## Docker / deployment

### B-017 · Monorepo Docker: copying `node_modules` across stages drops pnpm workspace symlinks

**What:** pnpm creates per-workspace `node_modules` directories with
symlinks into `/pnpm/store` (via `.pnpm/`). In a multi-stage
Dockerfile, copying only the top-level `/repo/node_modules` from an
install stage to a builder stage leaves each workspace with just a
`package.json` — the `node_modules/.bin/next` (and every other
workspace-installed binary) is absent. The next `pnpm build` fails:

`sh: next: not found`
`WARN Local package.json exists, but node_modules missing, did you
mean to install?`

**Seen in:** first dwa Docker build attempt. Fix in
[97c6b58](commit 97c6b58): collapse the `deps` and `builder` stages
into one, so `pnpm install` and the `COPY --from=pruner out/full`
both land in the same image layer. A `--mount=type=cache id=pnpm`
BuildKit mount keeps re-runs fast (the pnpm store survives across
builds).

**Grep signature (in existing Dockerfiles):**
```
grep -nE "^COPY --from=[^ ]+ [^ ]+/node_modules" Dockerfile*
```
Any hit crossing a stage boundary is a B-017 candidate in a
monorepo.

**Cross-check:** our single repo-root Dockerfile now does the
combined install+build pattern.

**Going forward:** keep install + build in one stage for pnpm
monorepos. The pnpm store cache-mount is the real caching win — not
splitting stages.

---

### B-018 · `turbo prune --docker` omits root-level config files referenced by workspace packages

**What:** `turbo prune <app> --docker` copies `package.json` +
lockfile + the selected workspace sources into `/repo/out/json` and
`/repo/out/full`. It does NOT copy arbitrary files at the
monorepo root. Workspace packages whose `tsconfig.json` extends
`../../tsconfig.base.json` (or any other shared root file) fail to
build inside a Docker stage:

`error TS5083: Cannot read file '/repo/tsconfig.base.json'.`

**Seen in:** second dwa Docker build attempt. Fix in
[97c6b58](commit 97c6b58): explicit `COPY tsconfig.base.json ./`
after the full-source copy.

**Grep signature (what root files do packages reference?):**
```
grep -hE '"extends"\s*:\s*"\.\.' packages/*/tsconfig.json adapters/*/tsconfig.json | sort -u
```
Any path climbing to the monorepo root is a file the Dockerfile
needs to copy explicitly.

**Cross-check:** `tsconfig.base.json` is the only root-extended
config today. If we add more (shared `eslint.config.js`,
`.browserslistrc`, shared `vitest.config.ts`), they need to land
in the same Dockerfile `COPY` block.

---

### B-019 · `pnpm --filter=<app> build` skips workspace-dep builds; use `turbo run build --filter`

**What:** pnpm's `--filter=<name>` runs the named package's script
directly and does not traverse `dependsOn`-style task graphs. For
a Next.js app that imports compiled output from a workspace
package (`@platform/tenancy/dist/...`), this means:

`Module not found: Can't resolve '@platform/tenancy/middleware'`

…because the workspace package's `dist/` was never emitted.

`turbo run build --filter=<app>` respects `turbo.json`'s
`dependsOn: ["^build"]` and builds workspace dependencies first.

**Seen in:** third dwa Docker build attempt. Fix in
[97c6b58](commit 97c6b58): replace
`RUN pnpm --filter=${APP} build` with
`RUN turbo run build --filter=${APP}`.

**Grep signature (for other build scripts that could hit this):**
```
grep -rnE "pnpm (run )?--filter[= ][^ ]+ build" . --include="*.sh" --include="*.yml" --include="*.yaml" --include=Dockerfile 2>/dev/null | grep -v node_modules
```

**Cross-check:** only the Dockerfile used this pattern. CI + local
use root-level `turbo run build`.

**Going forward:** any fresh automation that builds a subset of
the workspace goes through turbo. pnpm's filter is fine for
non-build tasks (test, lint) that don't depend on workspace
artifacts.

---

## Runtime-config landmines

### B-020 · Non-null assertion (`!`) on `process.env.X` at module init

**What:** `const TOKEN = process.env.POLAR_ACCESS_TOKEN!;` at a
route module's top level. TypeScript's `!` assertion tells the
compiler "this isn't undefined" — at runtime it absolutely can be.
Because the assertion happens at **module init** (not request
time), the first import of the module crashes the route — not with
a clean 500, but with an uncaught `TypeError: Cannot read
properties of undefined` wired through whatever downstream code
consumed the value. Without production logs + full stack traces,
this looks like "the whole API is down."

**Symptom:** route 500s with no useful user-facing message the
first time it's hit after deploy to a fresh environment that
hasn't set the env var.

**Seen in:**
- `apps/gtm/app/api/checkout/route.ts:4-5` — `POLAR_ACCESS_TOKEN!`
  and `POLAR_SUCCESS_URL!`.
- `apps/gtm/drizzle.config.ts:10` — `DATABASE_URL!` at module init
  of drizzle-kit config.

Both fixed in the follow-up commit after this catalog entry landed:
replaced each `!` with an explicit guard that throws a readable
error before the module finishes initializing. The polar route also
moved the guard above the `Checkout({ ... })` export so import-time
failures carry a message pointing at the missing var name.

**Grep signature (tightened — excludes `!==` comparisons):**
```
grep -rnE "process\.env\.[A-Z_][A-Z0-9_]*!([^=]|$)" apps/ packages/ adapters/ --include="*.ts" --include="*.tsx" | grep -v /node_modules/ | grep -v /.next/ | grep -v _archive
```

**Cross-check:** swept. `apps/gtm/app/api/checkout/route.ts` +
`apps/gtm/drizzle.config.ts` were the only runtime hits (the noisy
`process.env.X !== 'Y'` comparisons in redis.ts et al. are not
assertions). Clean across `apps/` and `packages/` after the follow-up
commit.

**Going forward:**
- Replace with an explicit guard that throws a clear error:
  ```ts
  const TOKEN = process.env.POLAR_ACCESS_TOKEN;
  if (!TOKEN) throw new Error('POLAR_ACCESS_TOKEN is required');
  ```
- Or defer to request time: look up inside the handler, return a
  tagged 503 if missing, log once per process.
- Consider a typed env-config module (Zod + `process.env` parse at
  boot) — single place where every var is validated, single place
  that throws on startup with a readable message.

---

### B-021 · `http://localhost:<port>` fallback for URLs consumed in production

**What:** a service-client module reads an env var and falls back
to a localhost URL:

```ts
const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';
const MAIA_URL  = process.env.MAIA_URL  ?? 'http://localhost:8001';
```

In production (inside a Docker Swarm service), `localhost` means
the container itself, so every call fails with
`ECONNREFUSED`/`ENOTFOUND`. Logs fill with connection errors that
look like genuine downstream outages — obscuring that the actual
bug is a missing env var.

**Symptom:** spammy connection-error logs, rate limiter / AI /
cache behavior silently degrades. The app may still answer HTTP
200 because the callers tolerate the failure.

**Seen in + fix status (all addressed in the follow-up commit after
this catalog entry landed):**
- `apps/gtm/lib/redis.ts:4` — aligned to dwa's pattern: no
  `localhost` fallback; if `REDIS_URL` is unset, the getter returns
  `null` and all cache calls no-op. No more spam logs.
- `apps/dwa/lib/redis.ts` — already correct; kept as the reference
  pattern for Redis clients across the platform.
- `apps/dwa/lib/flarum.ts:193-195` — localhost fallbacks now gated
  on `NODE_ENV !== 'production'`; a prod boot with `FLARUM_URL`
  unset throws at the constructor with a readable error.
- `apps/gtm/app/api/notion/callback/route.ts:6` + `apps/gtm/lib/notion/client.ts:18-21`
  — same gate. Prod without `NEXT_PUBLIC_APP_URL` now throws at
  import / first use rather than silently 302-ing OAuth returns to
  `localhost:3000`.

**Intentionally NOT changed:** `apps/dwa/lib/ai/maia-client.ts:26`.
The comment at line 28 (`Finding 13: fail-safe, not fail-hard`)
marks the localhost fallback as an explicit design choice — the
crisis-classifier dependency should degrade to safe fallbacks
rather than crash user sessions. The existing code already warns
in production via `logger.warn`; no additional hardening without
a product decision to change the fail-safe posture.

**Grep signature:**
```
grep -rnE "['\"]https?://localhost|['\"]redis://localhost|['\"]postgres://localhost" apps/ packages/ adapters/ --include="*.ts" --include="*.tsx" | grep -v /node_modules/ | grep -v /.next/ | grep -v _archive | grep -v /test/ | grep -v /e2e/ | grep -v '\.test\.' | grep -v '\.spec\.'
```

Expect only: `maia-client.ts` (fail-safe, kept), `playwright.config.ts`,
`scripts/*.ts` (dev scripts), `openapi/generator.ts` (schema only).
Any other hit is a B-021 regression.

**Cross-check:** swept. Only intentional fallbacks remain.

**Going forward:**
- In production (`NODE_ENV==='production'`), treat a missing
  required URL as startup-fatal — don't silently substitute
  localhost.
- For dev convenience, use a clearly-dev-only default
  (`'redis://localhost:6379'` *only* if `NODE_ENV !== 'production'`;
  otherwise throw or warn loudly once).
- Tie into the same typed env-config module suggested in B-020.
- **And do it lazily** — throwing at module top-level breaks Next.js
  builds in an orthogonal way. See B-022.

---

### B-022 · Throwing at module-init on `NODE_ENV==='production'` breaks `next build`

**What:** a guard like
`if (process.env.NODE_ENV === 'production' && !process.env.X) throw new Error(...)`
at a route's top level or in a singleton's constructor runs during
Next.js's `next build` "Collecting page data" phase. At build time,
`NODE_ENV === 'production'` is already true, but runtime env vars
have not yet been provided — so Next.js imports the module, the
guard fires, and the build hard-errors:

`Error: Failed to collect page data for /api/...`

**Why it's insidious:** the guard is correct for runtime. It looks
like the right defensive pattern. It passes local `pnpm dev` (which
runs `NODE_ENV=development`). It only surfaces inside `next build`
or `docker build`, where it kills the build with a message pointing
at the route, not at the guard.

**Seen in (same follow-up commit that tried to fix B-020/B-021 —
caught during the Docker image rebuild):**
- `apps/gtm/app/api/checkout/route.ts` — the POLAR_* guard ran at
  module load, crashing `next build`.
- `apps/gtm/app/api/notion/callback/route.ts` — `APP_URL` IIFE at
  module top-level ran at build time.
- `apps/dwa/lib/flarum.ts` — `FlarumClient` constructor's
  prod-check ran when `export const flarumClient = new FlarumClient()`
  evaluated during page-data collection.

Fix shape in all three (commit 2027dd1):
- Route files: move the guard into a helper called at the top of
  the HTTP handler, or wrap the expensive export in a
  `getHandler()` lazy init pattern.
- Singletons: leave the constructor side-effect-free; resolve
  URLs/secrets inside a `resolveUrls()` method called on first
  method invocation.

**Grep signature (find other guards that could hit this):**
```
grep -rn "process\.env\.NODE_ENV\s*===\s*['\"]production['\"]" apps/ packages/ adapters/ --include="*.ts" --include="*.tsx" | grep -v /node_modules/ | grep -v /.next/ | grep -v _archive | grep -v '\.test\.' | grep -v '\.spec\.'
```
For each hit, check: is this at module top-level or in a
class constructor that's instantiated at module top-level? If yes,
migrate to lazy init. If no (it's inside a route handler, factory
function, or method called per-request), it's fine.

**Cross-check:** swept. Remaining hits after 2027dd1 are in
request-handler bodies or inside lazily-called methods — safe.

**Going forward:**
- "Does this code run during `next build`?" is a question every
  module-level env guard must answer. If yes, use lazy init.
- The smoke test: if `docker build` succeeds for every app, this
  class is caught. Make that part of CI before we ship v1.

---

## Shell + Docker Swarm integration

### B-023 · `pipe | python3 <<HEREDOC` merges stdin with the heredoc

**What:** bash sees `cmd | python3 <<'PY' … PY` and splices both the
pipe output AND the heredoc into python's stdin. Python reads the
merged stream, treats the first chunk (pipe output) as source code,
and barfs with `SyntaxError` on whatever JSON/text came through. The
heredoc is never executed.

**Why it looks like a Dokploy/API bug:** the symptom is "I call dk
GET, pipe to python, and python blows up on valid JSON." The JSON is
fine; the pipe plumbing is broken.

**Seen in:** provision-05-domains.sh's initial `find_domain_id`
helper. Fixed in [0e6f010](commit 0e6f010) by switching to
`python3 -c '…'` (keeps stdin free for the pipe).

**Grep signature:**
```
grep -rnE "\| *python3 *<<" tools/ infra/ --include="*.sh" 2>/dev/null
```

**Fix pattern:** always use `-c` when you need stdin for a pipe:
```
cmd | python3 -c 'import sys; d = json.load(sys.stdin); …'
```
Use heredocs ONLY when python doesn't need pipe stdin (or with
`< /dev/null` to explicitly close it):
```
python3 <<'PY'
…
PY
```

**Cross-check:** swept `tools/dokploy/*.sh` as of 39cd12c. Only the
fixed site had this shape.

---

### B-024 · Dokploy appends a random 6-char suffix to service appNames

**What:** `postgres.create` / `redis.create` / `application.create`
register a display `name` (e.g., "postgres-primary") but Docker
Swarm's service registry uses `appName = <name>-<6char>` to prevent
collisions across projects on the same cluster. Our postgres is
reachable on the overlay as `postgres-primary-xjydtw:5432`, NOT
`postgres-primary:5432`.

**Symptom:** apps + ops-runner log
`Error: getaddrinfo ENOTFOUND postgres-primary` on every DB call.
Nothing else is wrong — connection refused, auth fail, etc. are all
ruled out because no TCP handshake is even attempted.

**Seen in:** provision-04 + provision-06 initially hardcoded
`postgres://…@postgres-primary:5432`. Fixed in
[39cd12c](commit 39cd12c) — scripts now read `appName` back from
`postgres.one` / `redis.one` and template it into `DATABASE_URL` /
`REDIS_URL`. Next Dokploy service rotation (which changes the
suffix) self-heals on the next `provision-04` / `provision-06` run.

**Grep signature (find hard-coded service hostnames):**
```
grep -rnE "@(postgres-primary|redis-primary)[:/]" tools/ apps/ packages/ adapters/ --include="*.ts" --include="*.sh" --include="*.md" 2>/dev/null | grep -v /node_modules/ | grep -v _archive
```

**Cross-check:** after 39cd12c, only docs / bug-patterns references
remain (describing the pattern itself, not using it as a hostname).

**Going forward:** any script that composes a URL against a Dokploy-
managed sidecar MUST look up `appName` first. Same rule applies if we
ever add `valkey-primary` / `rabbitmq-primary` / etc.

---

### B-025 · CHECK constraints silently rejected plausible values

**What:** `0001_tenancy.sql` has stricter CHECK constraints than the
Drizzle schema in `packages/tenancy/src/schema/` makes obvious. The
offending constraints:

| column | allowed |
|---|---|
| `tenant.kind` | `'first_party','licensed','self_serve'` |
| `tenant.tier` | `'pooled','isolated','dedicated'` |
| `tenant.region` | `'shared-eu','shared-us','dedicated'` |
| `tenant_member.role` | `'super_admin','tenant_admin','operator','member','external_partner'` |
| `system_audit.actor_kind` + `tenant_audit.actor_kind` | `'user','system','workflow','api_key'` |
| `system_audit.outcome` + `tenant_audit.outcome` | `'ok','denied','error'` |

**Seen in (four sites, all fixed in 39cd12c):**
- `tools/tenancy/seed-tenant.ts` defaults — used `kind='pooled'`
  (that's a tier!), `tier='free'` (not allowed), `region='local'`
  (not allowed), `role='owner'` (not allowed).
- `packages/testing/src/tenantLeakHarness.ts` — same wrong values
  hard-coded + `actor_kind='tenant_user'` in its audit insert.
- `tools/platform-ops/run-and-trace.sh` — used
  `actor_kind='ops_runner'` (not allowed). Silently dropped every
  trace row until I figured it out.

**Why it took so long to catch:** the symptom chain is
`INSERT fails with CHECK` → psql exit 1 → ON_ERROR_STOP=1 → schedule
status=error → Dokploy returns HTTP 500 from runManually → no
visible stack trace. The CHECK violation error is in the schedule's
on-disk log file (`/etc/dokploy/schedules/*.log`), not exposed via
the REST API.

**Grep signature:**
```
grep -rnE "actor_kind|outcome" infra/migrations/ packages/ tools/ --include="*.sql" --include="*.ts" --include="*.sh" | grep -vE "// |^[^:]+://" | grep -E "(actor_kind|outcome)[ \"'=]" | head -40
```

Then manually cross-check each literal against the allowed set above.

**Cross-check:** clean as of 39cd12c.

**Going forward:**
- The Drizzle schema doesn't currently encode the CHECK constraints
  (they're only in the raw SQL). Options: (a) mirror them as Zod
  `.enum(...)` in `@platform/contracts`, (b) add `.check()` calls in
  the Drizzle table definitions (Drizzle supports raw CHECK since
  0.31), (c) codegen the enums from the migration via a script.
  Any of those means INSERTs get a compile-time error instead of a
  runtime surprise. Deferred to the B-009 migration work when we
  touch the schemas anyway.
- Second-order lesson: never skip reading the migration SQL because
  "we have the Drizzle types." Types ≠ constraints.

---

### B-026 · Schedule command output is unreadable from the Dokploy REST API

**What:** Dokploy's schedule runner writes each invocation's stdout/
stderr to `/etc/dokploy/schedules/<appName>/<appName>-<timestamp>.log`
on the VPS filesystem. There is NO REST endpoint to read those files
back. The only observable signal from outside the VPS is
`schedule.status = done | error`, with no `errorMessage` populated
even on error.

**Impact:** a failing schedule is a black box. Root-causing anything
requires SSH to the VPS + manually `cat`ing the log file, which
breaks the "deploy and iterate via git push + dk API" workflow.

**Workaround (this commit):** every ops-runner command now goes
through `run-and-trace.sh`, which captures the child's stdout/exit
and best-effort writes them to `system_audit.meta.out_b64`. A
gated admin route (`apps/dwa/app/api/admin/debug/audit/route.ts`)
reads them back for anyone holding `ADMIN_API_SECRET`. No SSH.

Not a bug in our code — Dokploy limitation. But the workaround is
mandatory for anything we schedule; cataloged so the next maintainer
doesn't invent it from scratch.

**Going forward:**
- Retire the workaround when Dokploy ships schedule log reads via
  API (upstream feature request worth filing).
- Keep `run-and-trace` as the canonical entrypoint for ops scripts
  even after that lands — structured system_audit rows are more
  useful than raw log files anyway.

---

### B-027 · Dokploy schedule wiring has two silent traps

**Two related failures around `schedule.create` + idempotency —
surfaced together trying to run the first `ops-leak-harness`.**

---

**Part A — missing `appName`/`serviceName` on create makes
`runManually` 500.**

Calling `POST /api/schedule.create` with only `applicationId` set
(no `appName`, no `serviceName`) succeeds, but Dokploy auto-fills
`appName` with a random placeholder like
`schedule-program-virtual-hard-drive-ogq4v8` and leaves
`serviceName=null`. When `schedule.runManually` is later invoked,
the server uses `appName` (not `applicationId`) to locate the Swarm
service via `docker service ls` / `docker ps --filter`, finds
nothing, and returns HTTP 500 with no body. Same symptom as B-026
(opaque schedule error), different root cause.

---

**Part B — schedules are NOT embedded in `application.one`, so the
existing-id lookup never matched and every re-run of
`provision-06-ops.sh` created a duplicate.**

The original idempotency block read `APP_ONE.schedules[]`. That key
doesn't exist on `application.one` responses. After two provision
runs, `schedule.list?id=<appId>&scheduleType=application` returned
8 schedules: two copies of each name, all but one broken (see Part
A). Only the one schedule that had been hand-repaired in the UI
(`ops-seed-tenant-demo`) was usable; the rest bloated the Dokploy UI
and any of them was liable to be the one state.json pointed at.

---

**Symptom — what it looked like:** after provision-06-ops.sh created
4 schedules pointing at ops-runner, only `ops-seed-tenant-demo`
worked. The other three (`ops-apply-migrations`,
`ops-seed-tenant-gtm`, `ops-leak-harness`) returned 500 on
`runManually`. `/api/schedule.one` showed the working one had
`appName = serviceName = app-override-back-end-system-vleoyy` (the
ops-runner Swarm appName, B-024-suffixed), while the broken three
had `appName = schedule-<adj>-<noun>-<hash>`, `serviceName = null`.
Separately, `schedule.list` revealed 8 rows instead of 4 —
confirming the idempotency bug.

**Caveat — the 500 is the same HTTP shape as "child exited non-zero".**
Dokploy returns 500 on any non-success path for `runManually` (both
"can't locate Swarm service" and "ran the command, exit was 1"). So
the HTTP status alone does not distinguish Part A from a broken
in-container command. The distinguishing signal is
`deployment.allByType?type=schedule&id=<scheduleId>`: a broken-appName
run usually leaves no deployment row (Dokploy bails before recording
one) or a row with no `logPath`; a real-child-error run leaves a row
with `status=error`, a populated `logPath`, and a 1–2s
`finishedAt - startedAt` gap. When you fix Part A and `runManually`
still 500s, pivot to the in-container diagnosis path — B-027
catalogs the wiring trap, not the runtime-of-the-command failure.

**Fix commit:** this commit — `tools/dokploy/provision-06-ops.sh`
now (a) reads the target application's `appName` via
`application.one` (B-024 pattern) and includes `appName` +
`serviceName` on every `schedule.create` body, (b) uses
`/api/schedule.list?id=<appId>&scheduleType=application` for its
existing-id lookup instead of the non-existent
`application.one.schedules`, and (c) on match, calls
`schedule.update` to repair `appName`/`serviceName` in place. Does
not auto-delete orphan duplicates — those need explicit cleanup
(`schedule.delete`) because they're a destructive op.

**Grep signature:**
```bash
grep -rn "schedule.create" tools/ infra/
# Every hit must pass appName AND serviceName, not only applicationId.

grep -rn "application.one.*schedules\|\.schedules\[" tools/ infra/
# Any hit is relying on a field that doesn't exist — use schedule.list instead.
```

**Cross-check:**
- `tools/dokploy/provision-06-ops.sh` — **fixed** in this commit.
- No other provision script currently creates schedules.
  (`grep -rn schedule.create tools/` returns only provision-06.)
- Orphan duplicates in the live environment (`dokploy2`,
  `solofame-prod`, application `ops-runner`): 4 as of this commit.
  State-of-the-world check: `dk GET
  /api/schedule.list?id=<opsApplicationId>&scheduleType=application`
  should return exactly 4 rows, each with
  `appName == serviceName == <ops-runner appName>`. Tracked under
  "schedule reconciliation" in the pending list; cleanup is a one
  delete-per-orphan + one update-per-broken-active in the UI or via
  `dk POST /api/schedule.delete` / `schedule.update`.

**Going forward:**
- When provisioning a new ops-runner-like container with scheduled
  commands, always set `appName = serviceName = <app>.appName`
  (read back from `application.one`), never just `applicationId`.
- Dokploy should arguably resolve `applicationId → appName`
  server-side for application-typed schedules; upstream bug report
  worth filing.
- For idempotency, use `schedule.list?id=<appId>&scheduleType=...`
  — `application.one.schedules` does not exist.
- Add a post-provision verification step: call `runManually` with a
  no-op command on each freshly created schedule. Any 500 surfaces
  the misconfig before real ops try to use it.

---

## Audit batch — B-028..B-038 (production-hardening sweep)

Found during a repo-wide security/correctness audit (2026-04-23).
Every entry below has a grep signature and cross-sweep status. These
are the classes that a strict lint config + `pnpm typecheck` would
not catch — latent tenant/auth/security issues visible only by
reading the trust-boundary code.

### B-028 · `NEXT_PUBLIC_*` env flag gating server-side auth mode

**What:** `apps/gtm/lib/auth.ts` checked
`process.env.NEXT_PUBLIC_MOCK_AUTH === 'true'` before falling through
to real Lucia sessions — with no `NODE_ENV === 'production'` guard.
`NEXT_PUBLIC_*` values are client-visible and baked into the build,
so a leaked or typo'd env var in a prod deploy would silently accept
any `session={"uid":"..."}` cookie as authenticated. DWA already
guarded this in its own lib/auth.ts; GTM was a source-repo-backport
gap.

**Symptom:** no compile error, no lint, no runtime failure — just a
full auth bypass if the flag is ever set in production.

**Seen in:** `apps/gtm/lib/auth.ts`. Fix in this commit (added the
same production guard that DWA has).

**Grep signature:**
```bash
grep -rnE "process\.env\.NEXT_PUBLIC_[A-Z_]+\s*===\s*['\"]?true" apps/
# Any hit that gates a server-only code path (auth, admin, secrets, feature
# flags in server components) is suspect. NEXT_PUBLIC_* is safe only when
# it also has a NODE_ENV !== 'production' (or equivalent) guard.
```

**Cross-check:**
- `apps/gtm/lib/auth.ts` — **fixed** in this commit.
- `apps/dwa/lib/auth.ts` — already guarded.
- Both apps have `NEXT_PUBLIC_MOCK_AUTH` checks in `app/api/test/setup-profile/route.ts` that combine with `NODE_ENV !== 'production'` or `DATABASE_URL` presence — acceptable.
- No other `NEXT_PUBLIC_*`-gated server branches in the monorepo today.

**Going forward:**
- Any new server-side conditional on `process.env.NEXT_PUBLIC_*` must
  carry a matching `NODE_ENV === 'production'` (or `VERCEL_ENV`)
  guard that **throws or refuses** when production is detected.
- Prefer non-public env vars (no `NEXT_PUBLIC_` prefix) for anything
  that gates auth, admin surfaces, or secret handling.
- Needs backport to the upstream gtm source repo
  (`customer-acquisition-academy-vps`) — see
  `docs/source-repo-backports.md`.

---

### B-029 · Bearer-token compare built from `${undefined}` when env var is unset

**What:** `apps/dwa/app/api/admin/create-demo-user/route.ts` built
its expected header as ``` `Bearer ${process.env.N8N_API_KEY}` ```.
When the env var is unset, the expected value is the literal
`"Bearer undefined"`. Any client sending that string
authenticates. The compare was also `!==` (not timing-safe).

**Symptom:** unauthenticated admin bypass when the env var is not
set — silent, no log, no compile error.

**Seen in:** `apps/dwa/app/api/admin/create-demo-user/route.ts:29-31`
(pre-fix). Fix in this commit — explicit `!apiKey` guard, extract
the presented token, `timingSafeEqual` on equal-length buffers.

**Grep signature:**
```bash
grep -rnE "Bearer \\$\\{[[:space:]]*process\\.env\\." apps/ packages/ tools/
# Any hit where the env var may legitimately be unset is a latent bypass.
grep -rnE "authHeader\\s*!==\\s*expected|!==\\s*process\\.env\\." apps/
# Any token-compare not using timingSafeEqual is a side-channel risk.
```

**Cross-check:**
- `apps/dwa/app/api/admin/create-demo-user/route.ts` — **fixed**.
- `apps/dwa/app/api/admin/debug/audit/route.ts` — had a similar
  non-timing-safe `!==` compare (no undefined-token path because it
  short-circuited on missing env) — **fixed** in this commit (B-036).
- `apps/gtm/lib/api/admin-auth.ts` — already uses `timingSafeEqual`
  with a length guard. OK.

**Going forward:**
- Any Bearer compare must: (a) refuse when the env secret is unset
  (`!env`), (b) refuse when the presented token length ≠ expected,
  (c) compare via `timingSafeEqual` on equal-length Buffers.
- Central helper (`@platform/identity`?) for admin-bearer checks so
  this pattern isn't re-implemented per-route.

---

### B-030 · Middleware-forwarded tenant header trusted without DB re-resolution + spoof risk when middleware bypassed

**What:** the tenancy package exported
`getTenantContextFromHeaders(headers)` that read `x-tenant-id`
straight off the request and returned a fully-trusted TenantContext.
In combination with either (a) an app middleware file named
`proxy.ts` (so Next never runs it — see B-031) or (b) a middleware
matcher that excludes `/api/*` (as gtm's did), a client could send
`x-tenant-slug: <any>` and route handlers calling
`requireTenantContext` would resolve + enforce membership against
the attacker-chosen tenant.

**Symptom:** no symptom until someone calls the header helper or
adds an API route behind the missing matcher path; silent
cross-tenant access.

**Seen in:**
- `packages/tenancy/src/middleware.ts` — `getTenantContextFromHeaders`
  — **removed** (breaking change; no callers in the monorepo today).
- `apps/dwa/proxy.ts` — dead file, Next.js never loaded it —
  **renamed** to `middleware.ts` + function renamed `proxy` →
  `middleware` (B-031).
- `apps/gtm/middleware.ts` — matcher excluded `/api/*` — **fixed**
  to include it; tenant headers are now stripped from inbound
  requests before any downstream handler sees them.
- Both apps' middleware now unconditionally
  `requestHeaders.delete('x-tenant-slug')` +
  `.delete('x-tenant-id')` before optionally setting a resolved
  slug.

**Grep signature:**
```bash
# Any file that reads tenant headers without going through requireTenantContext:
grep -rnE "headers\\.get\\(['\"]x-tenant-(id|slug)" apps/ packages/ adapters/

# Next.js middleware must live at the app root and be named middleware.ts:
find apps -maxdepth 2 -name 'proxy.ts' -o -name 'middleware.js'
# Any `proxy.ts` at an app root is dead — rename.
```

**Cross-check:**
- `apps/dwa/middleware.ts` — **fixed** this commit.
- `apps/gtm/middleware.ts` — **fixed** this commit.
- `packages/tenancy/src/middleware.ts` — helper removed; test updated.
- No other files read `x-tenant-*` directly.

**Going forward:**
- Route handlers must call `requireTenantContext(request, {userId})`
  — never read `x-tenant-*` directly.
- App middleware must always delete inbound `x-tenant-*` before
  optionally setting a resolved slug, regardless of whether the
  current request ended up having a resolvable tenant.
- Next.js middleware at an app root MUST be named `middleware.ts`
  (or `.js`) and export `middleware` or the default export.

---

### B-031 · Next.js middleware/proxy filename convention drift across the two apps

**What:** Next.js 16 renamed the Edge middleware convention from
`middleware.ts` + `middleware()` → `proxy.ts` + `proxy()`. Files
named `middleware.ts` still load but emit a build-time deprecation
warning. The monorepo had `apps/dwa/proxy.ts` + `proxy()` (correct
for Next 16) and `apps/gtm/middleware.ts` + `middleware()`
(deprecated but functional). The naming drift made it easy to miss
that both files share critical trust-boundary logic (header strip,
CSRF origin, tenant slug) — a later edit in one was likely to be
inconsistent with the other.

**Symptom:** no runtime failure — both handlers still ran — but
`apps/gtm` emitted `The "middleware" file convention is deprecated`
on every build, and the two apps were structurally divergent for
the same responsibility.

**Original audit error noted here for honesty:** an initial pass of
this audit incorrectly concluded `apps/dwa/proxy.ts` was dead code
(applying pre-Next-16 rules). It was not — the build log confirmed
`ƒ Proxy (Middleware)` on DWA. The actual fix below aligns both
apps on the Next 16 convention.

**Seen in:** both apps. **Fixed** in this commit:
- `apps/gtm/middleware.ts` → `apps/gtm/proxy.ts` (rename)
- `middleware` function → `proxy` function in both apps
- Build log for DWA no longer shows the deprecation warning

**Grep signature:**
```bash
find apps -maxdepth 2 \\( -name 'middleware.ts' -o -name 'middleware.js' \\)
# Any hit on Next 16+ emits a deprecation warning — rename to proxy.ts
# and its exported function to `proxy`. In Next <16 the opposite holds
# (middleware.ts is correct).
```

**Cross-check:** both apps on `proxy.ts` + `proxy()`. Upstream
`mental-health-education-platform` has proxy.ts (OK for Next 16).
Upstream `customer-acquisition-academy-vps` had `middleware.ts` —
add to backport list only once that repo is on Next 16 (it already
is, per the status report).

**Going forward:** see B-030 "Going forward." Keep both apps on
`proxy.ts` + `proxy()` until we consolidate to `apps/shell-mosaic`.

---

### B-032 · Drizzle `bigserial` on a non-sequence column

**What:** `packages/tenancy/src/schema/index.ts` declared
`tenantQuotaCounter.amount`, `billingMeterEvent.amount`,
`billingMeterDaily.amount`, and `eventDispatchLog.outboxId` as
`bigserial(...)` while the SQL migration declares them as plain
`BIGINT`. Drizzle's `bigserial` implies an auto-increment sequence
that doesn't exist on those columns, so inserts that omit the value
(quota counter defaulting to 0, outbox FK join) would fail at
runtime.

**Symptom:** nothing at compile time, nothing until the first real
insert. The metering/outbox emitters are stubs today, so the bug
is latent — we would have caught it at first production emission.

**Seen in:** `packages/tenancy/src/schema/index.ts` — **fixed** in
this commit. SQL migration already correct.

**Grep signature:**
```bash
grep -rnE "bigserial\\(" packages/
# Every hit that corresponds to a SQL column declared `BIGINT NOT NULL`
# (without a DEFAULT nextval / IDENTITY) is the bug. Cross-reference to
# infra/migrations/*.sql.
```

**Cross-check:** all four occurrences in `packages/tenancy/src/schema`
reviewed; only `eventOutbox.id` + `eventDispatchLog.id` +
`billingMeterEvent.id` + `tenantAudit.id` + `systemAudit.id` remain
as `bigserial` (correct — those are real sequences). Clean.

**Going forward:**
- Keep Drizzle schema files reviewed alongside the SQL migration in
  the same PR (CODEOWNERS already covers both under
  `/packages/tenancy/src/schema/` and `/infra/migrations/`).
- Consider a schema-diff test: generate SQL from the Drizzle schema
  and diff against the canonical migrations.

---

### B-033 · JSONB lookup key mismatch between contract type and resolver

**What:** `packages/contracts/src/tenant.ts` declared
`TenantDomainsZ = { primary, aliases }`. `packages/tenancy/src/
resolveTenant.ts::resolveTenantByHost` queried with `@>` against
`{canonical, aliases}`. Tenant rows seeded to match the contract
would fail host resolution; rows seeded to match the resolver would
fail contract validation. No row could satisfy both.

**Symptom:** custom-domain tenants silently 404 at request entry
regardless of DB state, OR contract validation rejects tenant rows
on read.

**Seen in:** `packages/contracts/src/tenant.ts` — **fixed** this
commit. `domains` is now `{ canonical?, aliases? }` (both optional
— SQL column default is `'{}'`), matching the SQL column comment
and the resolver's `@>` query shape.

**Grep signature:**
```bash
grep -rnE "domains\\s*[:=]\\s*\\{\\s*primary" apps/ packages/ verticals/
# Any hit writes a seed in the old shape that the resolver won't find.
grep -rnE "domains\\.\\s*primary|domains\\[['\"]primary" apps/ packages/
# Same for reads.
```

**Cross-check:** only `packages/contracts/src/tenant.ts` carried the
`primary` key; no verticals or app code reads/writes it.

**Going forward:** any JSONB shape used by a resolver and a
contract should have one canonical definition (contract), and the
resolver should import its field names from the contract instead
of hard-coding them.

---

### B-034 · Membership gate silently skipped when `userId` omitted

**What:** `requireTenantContext` defaulted `requireMembership: true`
but only ran the `isTenantMember` check when `options.userId` was
also passed. A caller that forgot to thread the userId got a
resolved TenantContext without membership verification — the RLS
data boundary still held, but the session→tenant binding was not
checked, and audit logs would record actions against the wrong
tenant binding.

**Seen in:** `packages/tenancy/src/requireTenantContext.ts` —
**fixed** this commit. Gate now fails closed when on + no userId;
callers that really want unscoped resolution must explicitly set
`requireMembership: false`.

**Grep signature:**
```bash
grep -rnE "requireTenantContext\\(" apps/ packages/ adapters/ | grep -v "userId"
# Any call site with no `userId` parameter needs explicit
# `requireMembership: false` now, or it will throw.
```

**Cross-check:** no call sites in apps today (spine is wired, not
consumed).

---

### B-035 · ESLint rule name doesn't match behaviour — internal DB surface open to apps

**What:** `tools/eslint-plugin-platform/src/no-direct-db-access.ts`
only caught `import { db } from '@platform/tenancy'` — a symbol
that didn't exist. The real risk — apps reaching into
`@platform/tenancy/internal` (exposes `getDb`, `schema`,
`__closePool`) — was not blocked.

**Symptom:** a future `apps/*/lib/foo.ts` importing from
`@platform/tenancy/internal` would pass lint and compile; tenant
isolation would then depend only on whether that file also pins
`app.tenant_id` (which RLS enforces via fail-closed cast — but the
pattern is fragile).

**Seen in:** `tools/eslint-plugin-platform/src/no-direct-db-access.ts`
— **fixed** this commit. Now blocks
`@platform/tenancy/internal` everywhere except the tenancy package
itself, `packages/testing`, `tools/tenancy`, and
`tools/platform-ops`.

**Grep signature:**
```bash
grep -rn "@platform/tenancy/internal" apps/ adapters/ verticals/
# Any hit outside the allow-list is an architectural violation.
```

**Cross-check:** only the allowed call sites import it today.

---

### B-036 · Non-timing-safe token compare

**What:** `apps/dwa/app/api/admin/debug/audit/route.ts` compared
the Bearer token to `process.env.ADMIN_API_SECRET` with `!==`.
Plain string compare returns early on the first differing byte;
with a remote attacker, timing signal is measurable.

**Seen in:** `apps/dwa/app/api/admin/debug/audit/route.ts` —
**fixed** this commit. Now length-guarded + `timingSafeEqual`.

**Grep signature:**
```bash
grep -rnE "!==\\s*process\\.env\\.[A-Z_]+_(SECRET|KEY|TOKEN)" apps/
```

**Cross-check:** only the audit route had this pattern. GTM's
`checkAdminSecret` was already timing-safe.

---

### B-037 · Unvalidated `path.join` on manifest-supplied asset paths

**What:** `packages/manifest-loader/src/loader.ts` did
`path.join(verticalDir, relPath)` where `relPath` came from
`manifest.json`. For first-party verticals this is trusted, but
Studio / self-serve (Blueprint §9) will accept attacker-controlled
manifests. An asset entry of `../../../etc/passwd` would escape
the vertical tree.

**Seen in:** `packages/manifest-loader/src/loader.ts` — **fixed**
this commit. `resolveInside(verticalDir, relPath)` refuses
absolute paths and any resolved path that escapes `verticalDir`.

**Grep signature:**
```bash
grep -rnE "path\\.join\\([^,]+,\\s*(manifest|lock|asset|entry|rel[A-Z])" packages/ apps/ tools/
# Any hit where the right-hand side is attacker-controlled needs the
# resolveInside pattern (or an equivalent escape check).
```

**Cross-check:** only manifest-loader consumed manifest paths like
this in the monorepo.

---

### B-038 · `new pg.Pool` per request leaks connections

**What:** `apps/gtm/app/api/admin/seed-demo/route.ts` created a
fresh `pg.Pool({ connectionString: DATABASE_URL })` per invocation,
ran one query, then called `pool.end()`. If the endpoint is hit
repeatedly under load (or a caller forgets `await`), connections
balloon against the shared Postgres.

**Seen in:**
`apps/gtm/app/api/admin/seed-demo/route.ts` — **fixed** this
commit. Now uses the shared `getDb()` + Drizzle's `sql.raw` for
the multi-statement seed.

**Grep signature:**
```bash
grep -rnE "new pg\\.Pool\\(" apps/
# Any hit inside a route handler (per-request lifetime) is the bug.
# App-lifetime singletons (lib/db/index.ts) are fine.
```

**Cross-check:** only seed-demo had this; both apps' `lib/db` use
lazy-singleton pools.

### B-040 · Provider-patient link check missing `status='active'` filter

**What:** Provider routes that verify a `providerPatient` row before
returning PHI or accepting mutations check the (providerId, patientId)
pair but forget to filter `status = 'active'`. A revoked/terminated
provider-patient relationship still grants full PHI access to the
ex-provider, because the row remains (just with a different `status`).
This defeats the whole point of making `status` an enum rather than
just deleting the row.

**Seen in:** (all in `apps/dwa/app/api/provider/`, authenticated slice
01 audit 2026-04-24)

- `patients/[patientId]/route.ts` lines 37-42 (GET + PATCH share the check)
- `patients/[patientId]/assign/route.ts` lines 30-34 (POST assign)
- `alerts/[alertId]/resolve/route.ts` lines 28-36 (POST resolve distress alert)
- `session-prep/[patientId]/route.ts` lines 45-50 (GET LLM session brief)

The same repo has *correct* versions that DO filter `status='active'`:

- `provider/patients/route.ts:42`
- `provider/alerts/route.ts:19`

So the bug is inconsistent application of an otherwise-understood
invariant.

**Grep signature:**
```bash
# Find provider link checks and inspect whether status is in the AND clause.
grep -rnE "from\\(providerPatient\\)" apps/ | \
  grep -v "status"
```

Any match needs eyeballing — some are the correct legitimate pattern
(e.g., `select displayName from providerPatient where providerId=…`
for a header query that doesn't gate access), but any WHERE that
gates PHI access must include `eq(providerPatient.status, 'active')`.

**Fix:** add the filter:

```ts
.where(and(
  eq(providerPatient.providerId, providerId),
  eq(providerPatient.patientId, patientId),
  eq(providerPatient.status, 'active'),  // required
))
```

**Cross-sweep status:** four DWA routes flagged this audit; source
repo (`mental-health-education-platform`) carries the same bug — add
to `docs/source-repo-backports.md`.

---

### B-041 · Rate-limit key derived from first entry of `X-Forwarded-For`

**What:** Auth routes key their rate limiter on
`request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()`. The
reverse proxy (Traefik / Dokploy) **appends** the real client IP to
the end of XFF. The first entry is whatever the client sent, which
the client fully controls. An attacker rotating that header across
requests rotates the rate-limit bucket with each request, so the
limiter never triggers.

**Seen in:**

- `apps/dwa/app/api/auth/signin/route.ts:14`
- `apps/dwa/app/api/auth/signup/route.ts:15`
- `apps/dwa/app/api/cron/purge-deleted-accounts/route.ts:31` (just a
  logger field, not the rate-limit key, but the same misunderstanding
  of XFF semantics)

**Grep signature:**
```bash
grep -rnE "x-forwarded-for.*split\\(','\\)\\[0\\]" apps/ packages/
```

**Fix:** use the socket IP (`x-real-ip` if set by the trusted reverse
proxy), or count back from the tail of XFF by the number of trusted
proxies. The rightmost entry added by our own Traefik is the
trustworthy one; the leftmost is attacker-controlled.

```ts
// Traefik/Dokploy sets x-real-ip from the socket, not from the client's XFF.
const ip =
  request.headers.get('x-real-ip') ||
  request.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim() ||
  'unknown';
```

**Cross-sweep status:** flagged across DWA auth routes; GTM source
repo likely has the same lift — backport needed.

---

### B-042 · Admin secret accepted as query-string parameter

**What:** Admin / diagnostic endpoints accept an `ADMIN_API_SECRET`
through `request.nextUrl.searchParams.get('key')` and compare with
`!==`. URLs end up in:

- Traefik / Dokploy access logs
- Browser history
- Referer headers sent when the endpoint HTML links out
- Server-side error traces that log the full URL

Plus the `!==` compare is timing-unsafe (same as B-036).

**Seen in:**

- `apps/dwa/app/api/health/ai/route.ts:11-14`

**Grep signature:**
```bash
grep -rnE "searchParams\\.get\\(['\"]key['\"]" apps/
grep -rnE "searchParams\\.get\\(['\"](?:key|secret|token|admin)['\"]" apps/
```

**Fix:** accept the secret via `Authorization: Bearer …` header,
length-guard both buffers, compare with `crypto.timingSafeEqual`:

```ts
import { timingSafeEqual } from 'node:crypto';

const hdr = request.headers.get('authorization') ?? '';
const want = `Bearer ${process.env.ADMIN_API_SECRET ?? ''}`;
if (!process.env.ADMIN_API_SECRET
    || hdr.length !== want.length
    || !timingSafeEqual(Buffer.from(hdr), Buffer.from(want))) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

**Cross-sweep status:** one hit in slice 01. Re-grep after fix lands.

---

### B-043 · Differential auth responses enable account enumeration

**What:** Signup returns different status/body for "email taken" vs
"email available". Signin returns different status/body for
"credentials wrong" vs "account is soft-deleted" vs "no such user"
(and further leaks a timing side channel when the code short-circuits
before the argon2 verify). For a mental-health platform these are
worse than normal: confirming someone has a DWA account and is
mid-deletion is a concrete privacy breach.

**Seen in:**

- `apps/dwa/app/api/auth/signup/route.ts:48-49` — returns
  `'Email already used'` 400 for a taken email.
- `apps/dwa/app/api/auth/signin/route.ts:47-65` — three distinct
  responses for user-missing, user-soft-deleted, and password-wrong.
  The soft-deleted branch leaks `deletedAt` + `purgeAfter`
  timestamps.
- `apps/dwa/app/api/auth/signin/route.ts:67-75` — no argon2 verify
  when user is missing → timing oracle ("no such user" returns fast).

**Grep signature:**
```bash
# Look for email-conflict responses that differ from the generic success path.
grep -rn "Email already used\\|already registered\\|already exists" apps/**/auth/**/*.ts
# Look for signin paths that return status codes other than 400 on credential failure.
grep -rn "Invalid email or password" apps/**/auth/**/*.ts
```

**Fix:**

- Signup: always return the same 200/202 envelope
  ("check your inbox"). Mail-send for real signups, password-reset
  mail for existing accounts. (Requires the mail adapter wired.)
- Signin: collapse the three "invalid login" branches to one 400
  body; surface soft-deletion recovery only after successful
  credential verification.
- Dummy argon2 compare on the `!user` branch so response time is
  constant.

**Cross-sweep status:** DWA source repo carries the same shape; GTM
source repo's auth flow is different (Better Auth) — check the GTM
routes separately when that slice runs.


---

## Audit sweep — B-044..B-046 (Slice 02: DWA lib/)

All three land upstream in the DWA source repo. The first is a
security-critical production-guard defect; the second is a path-
traversal family; the third is a small log-correlation defect.

### B-044 · Mock-auth prod guard depends on `VERCEL_ENV === 'production'`

**Blast radius:** Dokploy production runtimes. Wherever a guard was
written as
`NODE_ENV === 'production' && VERCEL_ENV === 'production'` the
second conjunct is always false off Vercel, so the "throw on mock in
prod" branch silently never runs.

**Why this pattern appeared:** early versions of the app were
dual-targeted (Vercel + Dokploy). The dual check was intended as a
defence in depth — belt AND suspenders — but `VERCEL_ENV` is a
Vercel-only variable, so outside Vercel it degrades the guard from
belt+suspenders to *no belt*. On Dokploy `VERCEL_ENV === 'production'`
is always `false`, so the entire compound evaluates false and the
mock code path runs even with `NODE_ENV=production` +
`NEXT_PUBLIC_MOCK_AUTH=true`.

**Impact:**
- `apps/dwa/lib/security.ts:64-74` — mock bypass makes `isRateLimited`
  return `{ limited: false, ... }` with no throw. **Rate limiting is
  silently disabled** on any Dokploy prod deploy that has
  `NEXT_PUBLIC_MOCK_AUTH=true` set in its env.
- `apps/dwa/lib/repositories/profileRepository.ts:17-23` — mock
  repository returned instead of throwing. Writes go to `/tmp/...`,
  not Postgres; subsequent reads return stale/nothing.

**Why it's easy to miss:** build and tests both pass; the Vercel
conjunct makes the code *look* correct if you only scan for the
presence of `process.env.NODE_ENV === 'production'`. Only a prod
deploy on a non-Vercel host without the env var set exposes it.

**Canonical guard shape:** `apps/dwa/lib/auth.ts:55-64` already does
this correctly — `NODE_ENV === 'production'` alone, no `VERCEL_ENV`.
Every mock-gate in the repo should match that shape.

**How to find (sweep):**

```bash
# Any compound guard relying on VERCEL_ENV to close a production check
grep -rnE "NODE_ENV ===? ['\"]production['\"] && process\.env\.VERCEL_ENV" \
  apps/ packages/
# Any lone VERCEL_ENV reference in non-build code
grep -rn "process\.env\.VERCEL_ENV" apps/**/lib/ apps/**/app/
```

**Fix:** replace the compound with `NODE_ENV === 'production'` alone,
or split into two explicit steps with a clear per-host fallback. Do
not add more env conjuncts to "harden" the guard — each one reduces
its strength.

**Cross-sweep status:** DWA source repo carries both files
byte-for-byte (lifted). GTM source uses Better Auth and a different
mock path; audit its equivalent when that slice runs.

---

### B-045 · Path traversal in filesystem helpers that accept user-controlled IDs

**Pattern:** a server helper builds a filesystem path by joining a
fixed base directory with one or more string segments that originate
in a Next dynamic route param (`[courseId]`, `[lessonId]`, etc.):

```ts
const filePath = path.join(BASE_PATH, userId, `lesson-${lessonId}.md`);
const content = fs.readFileSync(filePath, 'utf-8');
```

Without validation, URL-encoded `../` segments in the param
(`%2E%2E%2F`) and similar tricks traverse out of `BASE_PATH` once
`path.join` normalises. Next.js decodes route params before handing
them to the handler, and `path.join` happily resolves `..` out of
the base. Combined with `fs.readFileSync(...).toString('utf-8')` or
`JSON.parse`, the result is arbitrary-file read for any file whose
extension/structure matches (often `.json` or `.md` — the attacker
gets to choose the suffix via which helper they call).

**Affected files (DWA):**
- `apps/dwa/lib/assessments.ts:23` — reads `ASSESSMENTS_PATH/${id}.json`
- `apps/dwa/lib/checklists.ts:22` — reads `CHECKLISTS_PATH/${id}.json`
- `apps/dwa/lib/thought-records.ts:22` — reads `THOUGHT_RECORDS_PATH/${id}.json`
- `apps/dwa/lib/tracking-logs.ts:22` — reads `TRACKING_LOGS_PATH/${id}.json`
- `apps/dwa/lib/lessons.ts:95` — reads `CONTENT_PATH/${track}/${course}/lesson-${id}.md`
- `apps/dwa/lib/services/quizService.ts:39,85,110` — reads `QUIZ_BASE_PATH/${section}/${course}/lesson-${id}.json`
- `apps/dwa/lib/utils/lesson-engagement.ts:17` — reads lesson markdown + lesson-map jsons

Every one of them is called from a route whose params come from
`context.params` with no shape validation other than
`z.string().min(1)`.

**How to find (sweep):**

```bash
grep -rnE "path\.join\([A-Z_]+,\s*[a-z]" apps/**/lib/
# Any hit where the second+ arg is a lowercase identifier coming in
# from the caller is the bug.

grep -rnE "fs\.(readFile|readFileSync)" apps/**/lib/ \
  | grep -v "__tests__\|\.test\."
# Trace each call's path argument to see if any segment is caller-
# supplied.
```

**Fix:** a small helper that hard-validates each segment and verifies
the resolved path stays inside the base via `path.resolve`:

```ts
// apps/dwa/lib/utils/safe-path.ts
import path from 'path';

const SAFE_SEGMENT = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;

export function safeResolveInside(base: string, ...parts: string[]): string | null {
  for (const p of parts) {
    if (typeof p !== 'string' || !SAFE_SEGMENT.test(p)) return null;
  }
  const resolvedBase = path.resolve(base);
  const resolved = path.resolve(resolvedBase, ...parts);
  if (resolved !== resolvedBase && !resolved.startsWith(resolvedBase + path.sep)) {
    return null;
  }
  return resolved;
}
```

Then at each call site, replace `path.join(BASE, id, …)` with
`safeResolveInside(BASE, id, …)` and treat `null` the same as
file-not-found (existing fallback paths already handle that — the
try/catch returns null on `ENOENT`).

The allow-list regex is intentionally tight (`[A-Za-z0-9._-]` only,
capped at 64 chars). Every real ID in the repo is `gad7`, `phq9`,
`anxiety-management`, numeric lesson ids, etc. If a future ID needs
a character outside the allow-list, widen it deliberately here — not
by bypassing the check at a call site.

**Cross-sweep status:** DWA source repo has every one of these
files with the same path.join shape. Backport the same `safe-path`
helper + call-site substitutions. GTM source is a marketing app
with no analogous per-lesson filesystem layer; nothing to backport
there.

---

### B-046 · XFF-leftmost IP in non-rate-limit logger context

**Pattern:** `with-auth.ts` style middleware extracts the client IP
from `x-forwarded-for?.split(',')[0]` purely for logger enrichment.
B-041 fixed the rate-limit call sites to use `getClientIp` (which
prefers `x-real-ip` and tails XFF), but logger-only sites were left
untouched.

**Blast radius:** lower than B-041 (logs only, not a security
control). But the header is still client-settable, so
audit/log trails record attacker-chosen values, which poisons
correlation (a real attacker can pick any "victim IP" to attribute
their activity to).

**Affected files (DWA):** `apps/dwa/lib/api/with-auth.ts:75-77` and
`:119-121`.

**Fix:** route through the same `getClientIp(request)` helper already
exported from `apps/dwa/lib/security.ts`. No other change needed.

**Cross-sweep status:** DWA source carries the same file. GTM source's
`with-auth`-equivalent already uses `getClientIp`; no action.

---

### B-047 · `.innerHTML =` used to render chart value/deviation labels

**Pattern:** A Chart.js-wrapper React component writes the "current
value" and "% deviation" strings into DOM nodes via
`element.innerHTML = …`. Today the values are numeric-only (`Number.toString()`,
`diff.toFixed(2)`), so there's no active XSS — but the sink is
indistinguishable from one that ships untrusted HTML into the page,
and if `data.datasets[0].data` is ever widened to include a string
(attacker-controllable label text), the assignment becomes a direct
XSS vector.

**Blast radius:** zero today (dataset values are numeric in every
call site); worth fixing as defense-in-depth against a future
mis-use. In a mental-health context the extra strictness is cheap
insurance.

**Seen in:**
- `apps/dwa/components/charts/realtime-chart.tsx:123,131` — Fixed
  in this slice by swapping both writes to `.textContent`.
- Upstream source repos (DWA `mental-health-education-platform` and
  GTM `customer-acquisition-academy-vps`) carry the same two
  `.innerHTML =` lines in their copies of `realtime-chart.tsx`. Both
  backported in this sweep.

**Grep signature:**
```
grep -rnE '\.innerHTML\s*=' apps/*/components/ components/
```

**Cross-check:** no other `.innerHTML =` writes in DWA/GTM/monorepo
component trees (verified during slice 03).

---

### B-048 · `useEffect(fn)` with no deps array re-registers document-level listeners on every render

**Pattern:** Two `useEffect` blocks in `components/ui/sidebar.tsx`
attach `document.addEventListener('click' | 'keydown', …)` and
return a cleanup — but the effect itself has *no dependency array*,
so React treats every render as an effect change: unmount listener,
re-register listener, on every render.

**Blast radius:** correctness is preserved (the cleanup fires before
each re-register), but the churn is a real perf smell. On parent
re-renders (e.g. nav, theme toggle) the listener is detached and
re-attached synchronously.

**Seen in:**
- `apps/dwa/components/ui/sidebar.tsx:30-38, 41-48` — Fixed in this
  slice by adding `[sidebarOpen, setSidebarOpen]` as the effect deps.
- Both source repos (`mental-health-education-platform` and
  `customer-acquisition-academy-vps`) carry identical copies of
  the file with the same missing deps array. Both backported in
  this sweep.

**Grep signature:** `react-hooks/exhaustive-deps` catches this class
automatically if the rule is enabled. Alternatively:
```
grep -Pzo 'useEffect\(\(\) => \{[\s\S]*?\n  \}\)(?!,)' apps/*/components/
```

**Cross-check:** no other unparameterised `useEffect` with
`addEventListener`/`setInterval` in the slice 03 surface; the other
`useEffect` blocks in the chart components and hook files all pass
`[]` or explicit deps.

---

### [INFO, slice 03] `specs/auth.md` drift after B-043 remediation

Not a runtime bug — a documentation bug. The spec at
`apps/dwa/specs/auth.md` still enumerated `Email already used
(signup) | 400 | "Email already used"` as the contract, which is
exactly the response the B-043 fix eliminated. The spec has been
rewritten to describe the current "no-enumeration" behavior
(signup returns 200 `{ ok, redirect: '/signin' }` whether the email
is registered or not; signin collapses failure branches with a dummy
argon2 on the `!user` path). Backported to the DWA source-repo
`specs/auth.md` in this sweep.

Worth keeping in mind: any future signup-flow refactor needs to
treat this spec line as a hard invariant, not an implementation
detail. "Tell the user their email is taken" is a persistent UX
instinct that reintroduces account enumeration.

---

### B-049 · Plaintext root SSH password + `sshpass` + `StrictHostKeyChecking=no` in committed deploy scripts

**Pattern:** A VPS deployment script is written during an early
spike, `sshpass -p "<literal>" ssh -o StrictHostKeyChecking=no root@<ip>`
gets committed, and the credential persists in the repo (and
forever in `git log`) even after the team shifts to proper SSH key
auth in CI. Variations ship with the same password inlined in a
second script, in a troubleshooting snippet embedded in a
deployment runbook, or in a legacy lesson-content guide.

**Blast radius:** catastrophic. Anyone with read access to the repo
— including anyone who's ever had a clone, anyone reading the
public GitHub mirror history, and anyone who scraped the repo while
it was briefly public — has persistent **root** on the VPS. The
MITM bypass (`-o StrictHostKeyChecking=no` + `-o UserKnownHostsFile=/dev/null`
in some variants) makes the first-connection host-key
authentication a no-op, so any attacker on path can also
impersonate the VPS transparently.

**Seen in (monorepo, fixed in slice 04):**
- `apps/dwa/deploy-classifier.sh:9-10` — `VPS_HOST="root@46.202.88.248"` + `VPS_PASS="scJx4BdYgGBgMuuDrja86#"`.
- `apps/dwa/deploy-classifier-with-model.sh:9-10` — same.
- `apps/dwa/services/maia/DOKPLOY_DEPLOYMENT.md:73` — same password in a
  "SSH into VPS" troubleshooting snippet in the deployment guide.
- `apps/dwa/.github/workflows/deploy-classifier.yml` — uses
  `${{ secrets.VPS_PASSWORD }}` (correctly via GH Secrets) but keeps
  `-o StrictHostKeyChecking=no`. Tracked as B-058.

**Seen in (DWA source repo `mental-health-education-platform`, same
three files):**
- `deploy-classifier.sh`, `deploy-classifier-with-model.sh`,
  `services/maia/DOKPLOY_DEPLOYMENT.md` — backported the
  sanitization in this sweep.

**Not in GTM source** (`customer-acquisition-academy-vps` does not
carry a `services/` tree or `deploy-classifier*.sh`).

**Remediation applied:**
1. Sanitized shell scripts: drop `VPS_PASS`, drop `sshpass`,
   require `CLASSIFIER_SSH_HOST` from env, drop
   `-o StrictHostKeyChecking=no`. Service systemd unit switched
   from `User=root` to `User=distress-classifier` with a
   `useradd --system` step (defense in depth; not the primary fix).
2. Sanitized runbook: replace the `sshpass -p '…' ssh …` snippet
   with an `ssh "$CLASSIFIER_SSH_HOST"` example + a paragraph
   explaining why the old shape was removed.
3. Applied the same diff in the DWA source repo.

**Still requires (out of this sweep — Mike's task):**
- Rotate `root@46.202.88.248`'s password. The leaked value must be
  considered compromised regardless of who currently has repo
  access, because the git history retains it.
- Swap root password auth for SSH key auth on the VPS
  (`PasswordAuthentication no` in sshd_config) so the rotation is
  the last password round.
- `git log -p -- apps/dwa/deploy-classifier*.sh` will still surface
  the plaintext on any clone; consider a history rewrite (`git
  filter-repo`) after rotation to eliminate the credential from
  clones-forward.

**Grep signature:**
```
grep -rnE 'sshpass -p .[A-Za-z0-9+/]{8,}|VPS_PASS=.[A-Za-z0-9+/]{8,}'
```

**Cross-check:** this is the same failure class as B-006
("secrets in playbooks"); the difference is that B-006 was about
env/infra playbooks and this is about day-to-day operational
scripts checked in during the startup-speed phase of the project.
If your repo has ever invoked `sshpass -p` on a hardcoded literal
anywhere, treat the password as burned and rotate.

---

### B-050 · Unauthenticated ML inference service published to the host with `allow_origins=["*"]`

**Pattern:** A FastAPI service binds `uvicorn.run(host="0.0.0.0")`
and is wired in `docker-compose*.yml` with `ports: "8001:8001"`.
The service has no auth (the deployer assumes network-level
isolation) and `CORSMiddleware(allow_origins=["*"])`. Dokploy's
overlay network (`dokploy-network`) provides intra-swarm DNS, so
the `ports:` publish is strictly unnecessary — any sibling service
on the overlay can reach the classifier via service name — but it
still exposes port 8001 on the host's network interface. If the
host firewall ever opens the port (intentionally or by mistake),
the classifier is publicly reachable with no auth, no rate limit,
and no origin check.

**Seen in:**
- `apps/dwa/services/distress-classifier/docker-compose-dokploy.yml:10-11`
- `apps/dwa/services/distress-classifier/docker-compose.yml:10-11`
- `apps/dwa/services/maia/docker-compose-dokploy.yml:10-11`
- `apps/dwa/services/maia/docker-compose.yml:11-12`
- Same four files in DWA source repo.

Inline comments ("Internal Docker network only — not exposed
externally") reflect the author's *intent* but `ports: 8001:8001`
is how Docker declares the opposite. `expose:` is the overlay-only
shape; `ports: 127.0.0.1:X:Y` is the loopback-only shape.

**Blast radius:**
- DoS / cost amplification: arbitrary text submitted for ML
  inference. A single actor can pin the CPU / GPU and starve
  legitimate crisis classifications, which is especially bad
  because the caller is mental-health safety logic.
- Exfiltration of model behavior: the `/metrics` endpoint reveals
  training set size, F1, AUC-ROC, TP/FP/FN/TN — details an attacker
  could use to tune inputs that evade the classifier.
- The classifier is explicitly documented as the crisis-detection
  layer for user journal entries and assessment responses. A
  crafted payload that *sounds* distressed but classifies as "none"
  silently bypasses the safety layer.

**Remediation applied:**
- Dokploy compose files: replace `ports: 8001:8001` with
  `expose: 8001` — the service is reachable on the overlay via its
  service name (`distress-classifier` / `maia`) but not on the
  host network interface.
- Local-dev compose files: `ports: 127.0.0.1:8001:8001`. Host-local
  Next.js app still reaches via loopback; LAN does not.
- Same diff backported to DWA source repo.

**Not remediated (accept-and-document):**
- `allow_origins=["*"]` kept as-is because the service is now
  unpublished, so CORS is moot for overlay traffic. If the service
  ever grows a public endpoint, change this first.
- Adding an internal bearer token + `ADMIN_API_SECRET`-style
  `timingSafeEqual` check on `/classify`: deferred. Rationale:
  until the service is ever published, the overlay-only reachability
  IS the boundary, and adding a shared secret creates a new thing
  that can leak (see B-049, B-057). Revisit if the architecture
  changes.

**Grep signature:**
```
grep -rnE '^\s*-\s*"[0-9]+:[0-9]+"\s*$' services/ apps/*/services/
# Flags any compose port mapping that's not bound to an interface.
```

---

### B-051 · `minio-compose.yml` ships default `minioadmin/minioadmin` creds + host-wide ports

**Pattern:** A MinIO compose file written during scaffolding uses
`${SERVICE_USER_MINIO:-minioadmin}` / `${SERVICE_PASSWORD_MINIO:-minioadmin}`
as env defaults. The defaults are the well-known MinIO root creds
listed on the first page of its docs. The compose also publishes
`9000` and `9001` on `0.0.0.0`. If the operator forgets to set the
Coolify/Dokploy env vars (or if the env vars don't propagate because
of a UI copy-paste typo), the instance boots with
`minioadmin/minioadmin` on a publicly reachable socket.

**Seen in:**
- `apps/dwa/docker/minio-compose.yml:11-17`
- Same file in DWA source repo.

**Blast radius:** full S3 admin on whatever bucket the MinIO serves
— user-uploaded content, signed-URL targets, backup tarballs
depending on what `caa-uploads` holds. The admin web console on
9001 is also exposed.

**Remediation applied:**
- Credentials must come from env; `${VAR:?message}` instead of
  `${VAR:-default}` fails the compose deploy fast if the value
  isn't set.
- Ports bound to 127.0.0.1 only. Traefik/Coolify's reverse proxy
  publishes the S3 route with TLS + any auth layer; the raw host
  socket stays local.
- Image pinned (see B-052).
- Same diff backported to DWA source repo.

**Grep signature:**
```
grep -rnE '\$\{[A-Z_]+:-[a-z]{6,16}\}' docker/ services/ infra/
# Flags env defaults that look like they could be well-known creds.
```

---

### B-052 · `:latest` Docker tags in shipped Dockerfiles

**Pattern:** Third-party images are pulled with `image: foo/bar:latest`
or `FROM foo/bar:latest`. The image ID resolved at build time is
whatever tag `latest` pointed at on that day — which means two
consecutive builds can produce images with different core
versions. For Flarum this has concrete breakage: a core upgrade
behind `:latest` can invalidate the custom extension's
`flarum/core: ^1.8.0` constraint at extension-load time, crashing
the container on boot.

**Seen in:**
- `apps/dwa/forum/Dockerfile:1` — `FROM crazymax/flarum:latest`.
- `apps/dwa/docker/minio-compose.yml:8` — `image: minio/minio:latest`.
- Same two files in DWA source repo.

**Blast radius:** build non-determinism + silent supply-chain risk.
No immediate exploit, but a compromised upstream `:latest` tag
would land in the next deploy. Pinning localizes the blast window
to the explicit tag bump.

**Remediation applied:**
- Flarum: pin to `1.8.9` (current stable as of slice 04 date).
- MinIO: pin to `RELEASE.2025-01-20T14-49-07Z` (current stable
  release tag).
- Both files in DWA source repo get the same pin.

**Grep signature:**
```
grep -rnE '(^FROM\s+[^[:space:]]+:latest|image:\s+[^[:space:]]+:latest)' .
```

---

### B-053 · Stale pre-monorepo build config retained after lift

**Pattern:** The DWA app was lifted from a standalone repo into
`apps/dwa/` during the monorepo migration. The standalone-repo
Dockerfile + `nixpacks.toml` were lifted with it, but the real
build is now driven by the repo-root `Dockerfile` + `turbo prune`
pipeline. The `apps/dwa/Dockerfile` still references `npm install`
and `COPY … /app/scripts/docker-entrypoint.js ./entrypoint.js`,
which doesn't line up with the pnpm/turbo standalone pipeline at
all — but the file's presence silently confuses anyone who
`docker build` inside `apps/dwa/`.

**Seen in (monorepo only — removed in slice 04):**
- `apps/dwa/Dockerfile` — deleted.
- `apps/dwa/nixpacks.toml` — deleted.

**DWA source repo keeps both**: they're correct there (the source
repo *is* standalone).

**Blast radius:** low (no runtime path), but a real landmine for
engineers who assume the per-app Dockerfile is the live one.
Deleting leaves the repo-root Dockerfile as the single source of
truth.

**Grep signature:** periodic `diff apps/<app>/Dockerfile /Dockerfile`
after any lift; if the per-app file exists and is materially
different from the root pipeline, it's likely stale.

---

### B-054 · `COPY … 2>/dev/null || true` in Dockerfile (shell syntax in a COPY line)

**Pattern:** A Dockerfile tries to make a copy optional with
`COPY model/ ./model/ 2>/dev/null || true`. Dockerfile COPY does
NOT run through a shell; BuildKit parses the line as
`COPY <src1> <src2> <src3> <dest>` where `2>/dev/null` is
interpreted as an additional source path. The COPY either fails
hard (missing source) or succeeds only because the happens-to-be-
present layout makes the syntax accidentally valid.

**Seen in:**
- `apps/dwa/services/distress-classifier/Dockerfile:19, 22` — same
  in DWA source repo. Both fixed in this sweep to plain
  `COPY model/ ./model/` + `COPY metrics.json ./`; the app code
  already has a fallback to the HuggingFace base model if
  `./model/` is absent at runtime.

**Blast radius:** build correctness, not production security.
Operationally it just means the "optional copy" pattern wasn't
doing what the author thought.

**Grep signature:**
```
grep -rnE '^\s*(COPY|ADD)[^#]*(\||>|2>|&)' .
```

---

### B-055 · E2E test drift after admin-auth shape change (B-042)

**Pattern:** B-042 switched `/api/health/ai` from `?key=<secret>`
query-string auth to `Authorization: Bearer <secret>` header. The
E2E test at `apps/dwa/e2e/api.spec.ts:45-51` still sent
`?key=wrong-key` and asserted 403. That assertion passed after
B-042 — but for the wrong reason: no Authorization header present
returns 403 regardless of query-string content. The test became a
no-op that didn't actually exercise the header-auth path.

**Remediation applied:**
- Header-based test added (wrong Bearer → 403).
- Regression-guard test added: `?key=anything` → 403 (will flip to
  failure if anyone tries to re-add query-string auth for
  convenience).
- Both e2e specs backported to DWA source repo.

**Lesson:** when changing an auth shape, rewrite the test the same
commit; a test that passes after the change but doesn't reference
the new shape is worse than a deleted test — it gives false
confidence.

---

### B-056 · Unused `execSync` import in `docker-entrypoint.js` (INFO)

Housekeeping: `const { execSync } = require('child_process')` at
`apps/dwa/scripts/docker-entrypoint.js:5` was never referenced.
Removed in monorepo + DWA source repo. No behavior change.

---

### B-057 · Second leaked root SSH password in legacy lesson-content deployment guide

**Pattern:** Same class as B-049 but a second, different root
password (`jJnMo7tYb8DVao3zU3ZTUodgKG4c84kEMmkpZdWmLyC#`) shows up
in `apps/dwa/docs/reference/legacy-lesson-guides/LESSON-1-1-EXECUTION-PLAN.md:665,669`.
The file describes a lesson-content deployment path that predates
the Dokploy setup. The leaked credential targets the same VPS
(`46.202.88.248`), which means the VPS has had at least two
distinct root passwords committed to the repo over time —
rotating one does not rotate the other.

**Seen in:**
- Monorepo: `apps/dwa/docs/reference/legacy-lesson-guides/LESSON-1-1-EXECUTION-PLAN.md`
- DWA source: `docs/reference/legacy-lesson-guides/LESSON-1-1-EXECUTION-PLAN.md`

**Remediation applied:**
- Both files scrubbed: `sshpass -p '<literal>' ssh root@…` replaced
  with `ssh root@…` and a paragraph explaining the redaction +
  rotation requirement.

**Scope crossing:** the audit prompt for slice 04 excluded
`apps/dwa/docs/*` (`! -path '*/docs/*'` in the scope find
command). This finding surfaced during a full-tree credential
sweep I ran after fixing B-049 — the prompt's scope would have
missed it. Flagged here explicitly rather than deferred because
the cost of "wait until slice 12 hits docs" is another weeks of
a live leaked credential.

**Still requires (Mike's task):** both passwords are burned;
rotate both and configure the VPS for SSH-key-only auth so the
rotation is the last of its kind.

---

### B-058 · `StrictHostKeyChecking=no` in GH Actions workflow (MITM bypass, separate from credential leak)

**Pattern:** `apps/dwa/.github/workflows/deploy-classifier.yml`
correctly pulls the VPS password from `${{ secrets.VPS_PASSWORD }}`
(no credential leak), but every ssh/scp invocation carries
`-o StrictHostKeyChecking=no`. First-connection host-key
verification becomes a no-op: any attacker on path between
GitHub's ubuntu-latest runner and the VPS can impersonate the VPS
without the workflow detecting it. Host-key pinning via a
`KNOWN_HOSTS` secret is the standard fix.

**Not remediated in slice 04:** the workflow is out of slice 04's
file-type scope (`.yml` under `.github/workflows/`). Fix shape
(for later):
1. `ssh-keyscan "$host" | ssh-keygen -lf -` locally; verify
   fingerprint out of band.
2. Add the full `ssh-keyscan` output as a GH Actions secret
   `KNOWN_HOSTS`.
3. In the workflow, before any ssh call:
   `echo "${{ secrets.KNOWN_HOSTS }}" > ~/.ssh/known_hosts`
4. Drop `-o StrictHostKeyChecking=no` from every ssh/scp line.
5. Better: drop `sshpass` entirely and use
   `actions/setup-ssh-key` + an SSH-key secret; delete
   `VPS_PASSWORD` secret from the repo.

---

### B-059 · `addEventListener` inside a function called from `useEffect` with no cleanup — listeners accumulate

**What:** A component's `useEffect` calls a helper function (e.g.
`scrollSpy()`) that internally does `window.addEventListener(...)`
without returning anything. Every time the effect's deps change, the
helper is called again and attaches a fresh listener. The previous
listener is never removed because the cleanup branch is missing
entirely. Listeners pile up, fire all of them on every event, and
old closures stay alive holding stale state.

**Symptom:** no compile error, no obvious break — just gradually
worsening scroll/keyboard latency on long-lived pages, and (less
obviously) old closures keeping unmounted DOM/state in memory.

**Seen in:** `apps/gtm/components/docs/ui/docs-secondary-nav.tsx` —
`scrollSpy()` was called from `useEffect(scrollSpy, [links])` and
attached a `'scroll'` listener with no cleanup. Fixed in this
sweep by inlining the listener attach into the `useEffect` body and
returning `() => window.removeEventListener('scroll', onScroll)`.

**Grep signature:**
```bash
# any addEventListener inside a non-arrow named function (likely
# called from a useEffect without cleanup) — needs human eyeballs:
grep -rnE "^\s*window\.addEventListener|^\s*document\.addEventListener" apps/*/components/ apps/*/hooks/
# then check: is the surrounding scope a function returning something
# that wires removeEventListener? if not, this is the pattern.
```

**Cross-check:** Adjacent class to B-048. Listed separately because
B-048 is "no deps array on the useEffect itself"; B-059 is "deps
array fine, but the listener attach happens inside a helper that
doesn't clean up."

**Going forward:**
- Always attach listeners inside `useEffect` and return a cleanup
  function. If a helper composes the listener, give it the same
  signature: `() => () => void` (callable that returns the cleanup).
- ESLint's `react-hooks/exhaustive-deps` does NOT catch this pattern —
  the deps array is correct; the bug is downstream of the deps.

---

## Sweep — 2026-04-24 (cross-codebase grep against all B-001..B-058)

A full sweep ran every documented B-NNN signature against
`apps/`, `packages/`, `adapters/`, `tools/`, `infra/`, `docs/`,
`verticals/`, root configs, and `.github/workflows/` — read-only
inventory in [`docs/Paas/audit-prompts/`](audit-prompts/) (per the
CLAUDE.md audit-discipline rules — scope declared and approved
before the sweep, coverage ledger at the end).

**Result:** 9 NEW true positives + 1 adjacent class (B-059 above).
All fixed in this sweep; workspace `pnpm -r typecheck` clean.

| Pattern | New site fixed |
|---|---|
| B-028 | `apps/gtm/lib/repositories/masterDataRepositoryFactory.ts` — wrap in `getMasterDataRepository()` with `NODE_ENV==='production'` throw on mock; mirror `apps/gtm/lib/auth.ts` shape |
| B-028 | `apps/gtm/app/api/onboarding/analyze/route.ts:233-247` — guard `isMockMode && NODE_ENV==='production'` → throw `AppError` 500 (`MOCK_AUTH_IN_PROD`) before `createMockAssessment` is reached |
| B-040 | `apps/dwa/app/(provider)/provider/patients/[patientId]/page.tsx:35` — page.tsx providerPatient lookup now ANDs `eq(providerPatient.status, 'active')` |
| B-041 | `apps/gtm/apps/forms/app/api/forms/submit/route.ts:41` — switched the rate-limit IP from `xff.split(',')[0]` to `x-real-ip || xff.split(',').at(-1)` (the trailing entry the proxy appends) |
| B-043 | `apps/gtm/app/api/auth/signup/route.ts:71-83` — uniform 200 envelope on duplicate email; argon2 hash runs regardless of duplicate so response time is constant; no Lucia session created on the duplicate path |
| B-045 | `apps/gtm/lib/lessons.ts:122-145` — partial-mitigation hardening: prefix-match `startsWith` now uses `path.sep` so a sibling like `<CONTENT_PATH>_evil/` no longer passes the boundary check |
| B-047 | `apps/gtm/components/charts/realtime-chart.tsx:123, 131` — `.innerHTML =` → `.textContent =` (mirrors DWA fix) |
| B-048 | `apps/gtm/components/ui/sidebar.tsx:32, 43` — added `[sidebarOpen, setSidebarOpen]` deps to both useEffects (mirrors DWA fix) |
| B-052 | `apps/gtm/scripts/openclaw/docker-compose.yml:14` — `ghcr.io/openclaw/openclaw:latest` → `:v2026.4.23` (current stable as of sweep) |
| B-053 | `apps/gtm/Dockerfile` — deleted; root `Dockerfile` (with `apps/gtm/.dockerignore` already in place) is the live build path |
| B-059 | `apps/gtm/components/docs/ui/docs-secondary-nav.tsx` — see B-059 entry above |

**Backport list (out-of-scope of this sweep — Mike's task):** every GTM-side
fix above except B-053 (which is monorepo-only) needs porting to
`customer-acquisition-academy-vps`. Add to
[`docs/Paas/source-repo-backports.md`](source-repo-backports.md).

**Still-tracked (not fixed in this sweep):**
- **B-058** — `apps/dwa/.github/workflows/deploy-classifier.yml` still
  carries `sshpass` + `StrictHostKeyChecking=no` + hardcoded VPS IP.
  Fix needs `KNOWN_HOSTS` GH secret + SSH-key auth setup; out-of-band
  prep required. The workflow's `VPS_PASSWORD` is supplied via GH Secret
  (no plaintext leak), but the MITM bypass remains.
- **B-007** — **Resolved 2026-04-25.** Bulk-deleted 18 legacy docs +
  one dead-code dir (`apps/gtm/lib/firebase/`). Firebase is firmly
  legacy with no plans to revive — see B-007 entry above for the full
  delete list and the 5 files kept (legitimate historical/audit refs).
- **B-009** — **Resolved 2026-04-26.** 53 sites refactored across DWA + GTM
  in 9 sequential commits on `b-009-migration` (`31dcfd7`..`7b1c12c`):
  - `infra/migrations/0003_app_tenancy.sql` adds `tenant_id NOT NULL`
    + RLS to 48 app tables (17 DWA, 31 GTM).
  - `0004_app_tenancy_defaults.sql` sets the column DEFAULT to read
    from `app.tenant_id` GUC, so inserts inside `withTenantApp` auto-fill.
  - Per-app wrappers `apps/{dwa,gtm}/lib/db/with-tenant.ts` provide
    `withTenantApp` (Pattern A) and `withSystemAdminApp` (Pattern B/E).
  - 53 routes + pages now go through the wrappers; cron/admin sweeps
    use `withSystemAdminApp`; webhooks (Polar/NodeBB/Attio) use the
    resolve-then-pin shape (lookup tenant via `tenant_member` or pod
    mapping, then `withTenantApp`).
  - Auth/session/health routes correctly retain raw `getDb()` per D-2
    (`user`/`session` are RLS-excluded; `@platform/identity` is the
    planned home for those).
  - Verification: `pnpm --filter ./apps/dwa typecheck` and `apps/gtm
    typecheck` both clean. Leak harness in `packages/testing` extended
    to cover `mood_entry` + `roleplay_session`; runtime check requires
    `TEST_DATABASE_URL`.
  - Plan + decisions D-1..D-8: [docs/Paas/B-009-migration-plan.md](B-009-migration-plan.md).
