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

**Still present (not yet cleaned):**
```
apps/dwa/DEPLOY.md
apps/dwa/Audits/18-april-audit.md
apps/dwa/Audits/18-april-audit-REMEDIATION.md
apps/dwa/docs/production-deployment-guide.md
apps/dwa/docs/MIGRATION-GOOGLE-TO-COOLIFY.md
apps/dwa/docs/VPS-REARCHITECTURE.md
apps/dwa/docs/token-optimization.md
apps/dwa/docs/revised-audit-test-document.md
apps/dwa/docs/phase-b-audit-report.md
apps/dwa/docs/TEST-PLAN.md
apps/dwa/docs/archive/2026-Q1/README-stale-solo-frame-hub.md
apps/dwa/docs/archive/2026-Q1/ARCHITECTURE.md
apps/dwa/docs/course-creation-context-and-prompts/course-context-fles/04-MODULE-ARCHITECTURE.md
apps/dwa/docs/course-creation-context-and-prompts/course-context-fles/08-CURSOR-PROMPTS.md
```
These need either deletion or rewrite — judgment call case-by-case.

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

**Seen in:** `apps/gtm/app/api/checkout/route.ts:4-5` —
`POLAR_ACCESS_TOKEN!` and `POLAR_SUCCESS_URL!`. Surfaced by the
deployment-env audit.

**Grep signature:**
```
grep -rnE "process\.env\.[A-Z_][A-Z0-9_]*\s*!" apps/ packages/ adapters/ --include="*.ts" --include="*.tsx" | grep -v /node_modules/ | grep -v /.next/
```

**Cross-check pending:** full sweep of the catch list is follow-up
work. This entry lands so future additions go through a proper
guard, not the bang.

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

**Seen in:**
- `apps/gtm/lib/redis.ts:4` — defaults to `redis://localhost:6379`.
- `apps/dwa/lib/redis.ts:4` — same.
- `apps/dwa/lib/ai/maia-client.ts:26` — defaults to
  `http://localhost:8001`.
- `apps/dwa/lib/flarum.ts:193-196` — defaults to
  `http://localhost:8080`.

Both `docker run` smoke tests from commit 97c6b58 caught these as
hundreds of Redis connection-error log lines — harmless in that
test because it's a bare `docker run` with no sidecars, but the
signal would be indistinguishable from a real Redis outage in
prod.

**Grep signature:**
```
grep -rnE "(process\.env\.[A-Z_][A-Z0-9_]*\s*\?\?|process\.env\.[A-Z_][A-Z0-9_]*\s*\|\|)\s*['\"]https?://localhost|redis://localhost" apps/ packages/ adapters/ --include="*.ts" --include="*.tsx" | grep -v /node_modules/ | grep -v /.next/
```

**Cross-check pending:** list above is the known hits from the
deployment-env audit. Clean sweep + fix is follow-up work.

**Going forward:**
- In production (`NODE_ENV==='production'`), treat a missing
  required URL as startup-fatal — don't silently substitute
  localhost.
- For dev convenience, use a clearly-dev-only default
  (`'redis://localhost:6379'` *only* if `NODE_ENV !== 'production'`;
  otherwise throw or warn loudly once).
- Tie into the same typed env-config module suggested in B-020.
