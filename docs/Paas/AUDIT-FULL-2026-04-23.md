# Full-Repository Audit — 2026-04-23

Commissioned by Mike. Discipline per new `CLAUDE.md` rule (Audits, reviews, sweeps).

## Rules of engagement

- Every file below is either **READ**, **CLEAN** (read, nothing flagged), **SKIPPED-BINARY** (image/font/PDF — not auditable line-by-line), or **PENDING**.
- No file is silently dropped.
- No subagents. All reads performed by the main agent.
- Findings are recorded inline in this file with severity and the exact `file:line` citation.
- This is a living document, updated in-place as the audit proceeds.

## Summary counters

- Total files in ledger: 9004
- SKIPPED-BINARY: 2041
- Source to audit: 6963

**Live progress (end of slice 04):**
- CLEAN: 288
- FINDINGS: 66
- PENDING: 6609
- Cumulative slices completed: 01, 02, 03, 04

## Findings (live — appended as they're found)

Severity legend: **CRITICAL** / **HIGH** / **MEDIUM** / **LOW** / **INFO**.

Previous audit findings (B-028..B-038) already documented in `docs/bug-patterns.md`.

New findings from this full-repo pass are recorded below as they are found:

<!-- FINDINGS:APPEND-HERE -->

## Slice 02 — DWA lib/ (2026-04-24)

Full read of 85 files under `apps/dwa/lib/**`. Full reading by the main
agent (no subagents). Coverage ledger updated for every file in scope.
New findings below; see `docs/bug-patterns.md` for B-044..B-048
long-form cross-platform entries.

### B-044 — Dokploy-blind `NEXT_PUBLIC_MOCK_AUTH` production guard (HIGH)

Two call sites guard the mock path with
`NODE_ENV === 'production' && VERCEL_ENV === 'production'`. Dokploy
does not set `VERCEL_ENV`, so mock mode bypasses the guard silently in
Dokploy production.

- `apps/dwa/lib/security.ts:66` — guard only throws when
  `VERCEL_ENV === 'production'`. In Dokploy prod with
  `NEXT_PUBLIC_MOCK_AUTH=true`, `isRateLimited` returns
  `{ limited: false, ... }` — rate limiting completely disabled.
- `apps/dwa/lib/repositories/profileRepository.ts:19` — same pattern.
  Mock repo returned instead of throwing in Dokploy prod.

The canonical guard shape in `apps/dwa/lib/auth.ts:58` is
`NODE_ENV === 'production'` alone — that one is correct. Fix: align
both sites to that shape.

**Remediation:** applied — both files now use `NODE_ENV === 'production'`
alone; `VERCEL_ENV` is no longer part of the compound.

### B-045 — Path traversal in filesystem helpers that accept user-controlled IDs (HIGH)

Seven helpers build filesystem paths via
`path.join(BASE, <user-controlled-id>, ...)` without resolving and
verifying containment. Callers are Next dynamic route handlers that
pass params straight through. URL-encoded segment traversal
(`%2F`-laden ids, `..` segments) escapes the base directory and can
read arbitrary `.json`/`.md` files on disk.

- `apps/dwa/lib/assessments.ts:23`
- `apps/dwa/lib/checklists.ts:22`
- `apps/dwa/lib/thought-records.ts:22`
- `apps/dwa/lib/tracking-logs.ts:22`
- `apps/dwa/lib/lessons.ts:95` (three user-controlled segments)
- `apps/dwa/lib/services/quizService.ts:39, 85, 110` (three segments)
- `apps/dwa/lib/utils/lesson-engagement.ts:17` (three segments)

**Remediation:** applied — introduced `apps/dwa/lib/utils/safe-path.ts`
with `safeResolveInside(base, ...parts)` that rejects any part
containing `/`, `\`, `..`, or non-allowlist characters, then verifies
the resolved path stays within `base` via `path.resolve`. All seven
callers now use it. Returns `null` on violation; callers treat it the
same as file-not-found (existing fallback paths).

### B-046 — `with-auth.ts` IP logging uses first-of-XFF (LOW)

`apps/dwa/lib/api/with-auth.ts:75-77` and `:119-121` extract the
logger-context IP from `x-forwarded-for?.split(',')[0]` — the
attacker-controlled head of the chain. Rate-limiting (`security.ts`)
already uses the correct `getClientIp` helper (B-041 fix). This site
only affects log correlation, but the defect shape is the same.

**Remediation:** applied — both `withAuth` and `withAdminAuth` now
call `getClientIp(request)` from `@/lib/security`.

### Observations (no action)

- `apps/dwa/lib/db/index.ts` imports `pg` and `drizzle-orm/node-postgres`
  directly. This is the documented pre-existing exception to the
  `no-direct-db-access` ESLint rule (DWA has its own Drizzle pool;
  `@platform/tenancy/internal` is the newer forbidden path). No change.
- `apps/dwa/lib/ai/fetch-helpers.ts` has `fetch(url, { redirect: 'follow' })`
  with unvalidated URL (classic SSRF vector into 169.254.169.254 et al).
  The only callers are under `apps/dwa/_archive/`, so there's no live
  exposure today. Flagging for deletion in a follow-up sweep rather than
  hardening dead code.
- `apps/dwa/lib/ai/rag.ts:retrieveChunks` is not userId-scoped, but the
  `contentEmbedding` table holds platform-shared clinical/course text,
  not per-user data. Noted, no change.
- `apps/dwa/lib/repositories/mockProfileRepository.ts:74-110` has
  naive dot-notation path assignment that walks into `__proto__` →
  prototype pollution vector. Mock-only (dev), but replacing it with
  `sanitize-jsonb` semantics would make it symmetric with the
  Postgres path. Deferred — not a live risk and the mock repo is
  scheduled for removal once Lucia is everywhere.
- `apps/dwa/lib/flarum.ts:460` falls back to
  `\`${this.apiKey}; userId=${userId}\`` where `userId` comes from
  session.uid. Not attacker-controlled in the session context, so no
  immediate risk; added as a "Flarum API key injection hazard"
  comment note during review. No change.

## Slice 03 — DWA components + hooks + types + specs (2026-04-24)

Full read of 97 files under `apps/dwa/components/` (76),
`apps/dwa/hooks/` (3), `apps/dwa/types/` (13), and `apps/dwa/specs/`
(5). Main-agent reading only (no subagents). Coverage ledger flipped
for every file in scope.

Nothing CRITICAL or HIGH surfaced. The slice is mostly Cruip Mosaic
derived chart/UI components plus a handful of typed API contracts and
a small markdown spec set — very low XSS / auth-bypass surface. The
three items below are defense-in-depth / hygiene fixes applied to
the monorepo and backported to both upstream source repos in this
sweep.

### B-047 — `.innerHTML =` as chart value label sink (LOW)

`apps/dwa/components/charts/realtime-chart.tsx:123,131` wrote two
numeric-only strings via `element.innerHTML = …`. No active XSS —
dataset values are numeric today — but the sink shape is identical
to a live XSS vector. Defense-in-depth swap to `.textContent`
makes the invariant explicit.

**Remediation:** applied — both writes use `textContent`. Backported
to `mental-health-education-platform` and
`customer-acquisition-academy-vps` (identical file in both source
repos).

### B-048 — Sidebar useEffect missing dependency array (LOW)

`apps/dwa/components/ui/sidebar.tsx:30-38, 41-48` — two `useEffect`
blocks with no deps array registered `document` `click` and
`keydown` listeners. React re-registers on every render (the
cleanup does run so correctness holds, but the churn is real).

**Remediation:** applied — both effects now declare
`[sidebarOpen, setSidebarOpen]` as deps. Backported to both source
repos.

### specs/auth.md drift post-B-043 (INFO)

`apps/dwa/specs/auth.md:28` still documented the enumeration-leaky
`Email already used | 400 | "Email already used"` contract even
though the B-043 remediation (slice 01) changed the code to return
`200 { ok, redirect: '/signin' }` indistinguishable from success.
Rewrote the invariants + error-behavior table to match current
behavior and added a "no user enumeration" invariant bullet.

**Remediation:** applied — spec now describes post-B-043 behavior.
Backported to the DWA source repo (`specs/auth.md`).

### line-chart-09.tsx copy-paste name drift (INFO)

`apps/dwa/components/charts/line-chart-09.tsx` had
`interface LineChart08Props` and `export default function LineChart08`
inside the `-09` file. Default-exported, so callers `import
LineChart09 from '…/line-chart-09'` work regardless — but the
naming drift is confusing.

**Remediation:** applied — renamed to `LineChart09Props` /
`function LineChart09`. Backported to both source repos.

### Observations (no action)

- `apps/dwa/types/tracking-log.ts:36` has `DerivedMetric.formula:
  string`. If the server ever evaluates that free-form formula via
  `new Function` / `Math.eval`, it's an RCE landmine. Scope-grep on
  slice 03 found no evaluator here; the evaluator lives in
  `apps/dwa/lib/...` (slice 02) and was already audited. No action.
- `apps/dwa/types/forum.ts:60` types `contentHtml: string`. Any
  consumer that feeds this into `dangerouslySetInnerHTML` without
  sanitisation is an XSS vector; scope-grep of slice 03 found zero
  `dangerouslySetInnerHTML` sites. The consumer is outside the
  slice (forum post rendering); follow-up for that slice.
- `apps/dwa/components/ui/sidebar.tsx:14-19` widens `tracks` and
  `pathCourses` to `any[]`. Next `Link` blocks `javascript:` URLs so
  the `href={\`/academy/${course.id}\`}` pattern is safe from
  scheme-based XSS, but the any-typing defeats contract checking.
  Noted.
- `apps/dwa/components/forms/demo-request-form.tsx:58-60` hardcodes
  `aistartuplaunch@gmail.com` as a mailto link. Intentional —
  matches `userEmail` in CLAUDE.md. No change.
- `apps/dwa/components/pwa-registration.tsx:7` only excludes
  `localhost`. Preview/staging envs also register `/sw.js`. Not a
  security issue; noted.

## Slice 04 — DWA services/forum/scripts/docker/public/e2e/top-level configs (2026-04-24)

Full end-to-end read of 98 source files covering:

- `apps/dwa/services/` — MAIA + distress-classifier FastAPI services,
  Dockerfiles, docker-compose files, training + evaluation scripts.
- `apps/dwa/forum/` — Flarum Dockerfile + the `rps-ai-moderation`
  PHP extension (listener, client, risk evaluator) + admin JS.
- `apps/dwa/scripts/` — DB migrate, curriculum validate, OpenAPI gen,
  snapshot, seeds, screenshot capture, test helpers, pre-push hook,
  index migration SQL.
- `apps/dwa/docker/minio-compose.yml`.
- `apps/dwa/public/sw.js`, `fonts.css`, `openapi.json`.
- `apps/dwa/e2e/**` — Playwright specs (12) + fixtures/helpers/test-data.
- App-root configs: `Dockerfile`, `nixpacks.toml`, `next.config.js`,
  `proxy.ts`, `instrumentation.ts`, `vitest.config.ts`,
  `playwright.config.ts`, `eslint.config.mjs`, `postcss.config.js`,
  `tsconfig.json`, `package.json`, `.gitignore`, `.gitleaks.toml`,
  `.dockerignore`, `.npmrc`, `.nvmrc`, `generate_curriculum.py`,
  `deploy-classifier*.sh`, `update-e2e-imports.js`,
  `update-e2e-tests.sh`, `next-env.d.ts`, `CHANGELOG.md`,
  `DEPLOY.md`, `DEPLOY_NOTES.md`, `README.md`, `SCREENSHOT_GUIDE.md`.

Main-agent reading only (no subagents). Public images/pdfs/fonts
categorized as SKIPPED-BINARY per scope.

### B-049 — Plaintext root SSH password + `sshpass` + `StrictHostKeyChecking=no` (CRITICAL)

Three files in monorepo and three in DWA source committed the same
root VPS password alongside `-o StrictHostKeyChecking=no`:

- `apps/dwa/deploy-classifier.sh:9-10`
- `apps/dwa/deploy-classifier-with-model.sh:9-10`
- `apps/dwa/services/maia/DOKPLOY_DEPLOYMENT.md:73`

**Remediation applied:** both scripts rewritten to require
`$CLASSIFIER_SSH_HOST` from the environment, drop `sshpass`, drop
`-o StrictHostKeyChecking=no`, and switch the systemd unit from
`User=root` to a dedicated `distress-classifier` service user. The
MAIA deployment guide's "SSH into VPS" snippet is scrubbed to a
plain `ssh "$CLASSIFIER_SSH_HOST"` with a paragraph explaining
rotation. Backported byte-for-byte to DWA source repo.

**Mike's follow-up (out of sweep):** rotate the VPS password,
configure SSH-key-only auth, and consider a `git filter-repo`
rewrite on both repos to remove the plaintext from history.

### B-050 — Classifier service published on the host interface with no auth + `allow_origins=["*"]` (HIGH)

Four compose files exposed ML inference on port 8001 of the host
with no authentication, open CORS, and no rate limit. The service
is the crisis-detection layer for user journal entries and
assessment responses; DoS or evasion has safety-critical impact.

Remediation applied: Dokploy compose files now use `expose:`
(overlay-only reachability via service DNS); local-dev compose
files bind `127.0.0.1:8001:8001` (loopback only). Backported.

### B-051 — MinIO default `minioadmin/minioadmin` creds + host-wide ports (MEDIUM)

`apps/dwa/docker/minio-compose.yml` defaulted both `MINIO_ROOT_USER`
and `MINIO_ROOT_PASSWORD` to the well-known `minioadmin` string if
env wasn't set, and published ports 9000/9001 on `0.0.0.0`.

Remediation applied: `${VAR:?message}` fail-fast for both creds,
ports bound to 127.0.0.1. Backported.

### B-052 — `:latest` Docker tags pinned (MEDIUM)

`FROM crazymax/flarum:latest` and `image: minio/minio:latest`
replaced with specific version tags (`1.8.9`,
`RELEASE.2025-01-20T14-49-07Z`). Backported.

### B-053 — Stale pre-monorepo `apps/dwa/Dockerfile` + `nixpacks.toml` (LOW)

Remediation applied: both files deleted from the monorepo. The DWA
source repo retains both (they are correct at repo root for a
standalone Next app).

### B-054 — Dockerfile `COPY … 2>/dev/null || true` shell syntax (LOW)

`apps/dwa/services/distress-classifier/Dockerfile:19,22` replaced
with plain `COPY model/ ./model/` + `COPY metrics.json ./`. The
shell redirection doesn't work in Dockerfile COPY. Backported.

### B-055 — E2E test drift after B-042 (LOW)

`apps/dwa/e2e/api.spec.ts:45-51` still tested the pre-B-042
query-string auth. Rewritten to header-based tests plus a
regression guard. Backported.

### B-056 — Unused `execSync` import in `docker-entrypoint.js` (INFO)

Housekeeping. Backported.

### B-057 — Second leaked root SSH password in legacy lesson-content guide (CRITICAL — cross-scope)

`apps/dwa/docs/reference/legacy-lesson-guides/LESSON-1-1-EXECUTION-PLAN.md:665,669`
contained a second, different root password for the same VPS.
Surfaced by a full-tree credential sweep after fixing B-049.
`/docs/*` was excluded from slice 04's nominal file scope per the
prompt's find filter, but leaving a live leaked credential in
place until the relevant slice would have been days-to-weeks.

Remediation applied: sanitized in both the monorepo and the DWA
source repo.

### B-058 — `StrictHostKeyChecking=no` in GH Actions workflow (MEDIUM, tracked not fixed)

`apps/dwa/.github/workflows/deploy-classifier.yml` correctly uses
a GH Actions secret for the VPS password, but every ssh/scp line
still carries `-o StrictHostKeyChecking=no`. Fix requires wiring a
`KNOWN_HOSTS` secret and is out of slice 04's `.yml`-filtered
scope. Fix shape documented in `docs/bug-patterns.md#B-058`.

### Observations (no action)

- `apps/dwa/proxy.ts`: tenant-header strip intact (B-030 fix); matcher
  correctly includes `/api/*`. Clean.
- `apps/dwa/next.config.js`: CSP `script-src 'self'` in prod (no
  `unsafe-inline` / `unsafe-eval`); `connect-src` limited; `frame-src`
  limited to the forum domain; `form-action 'self'`. Clean.
- `apps/dwa/instrumentation.ts`: keep-alive self-ping every 4 minutes
  to `NEXT_PUBLIC_APP_URL/api/health`. Hits the public URL from
  inside the container; suboptimal network path but no security
  issue (logs env keys, not values).
- Distress-classifier `/classify` endpoint: no PHI logged (explicit
  comment at `app.py:177-180`). Good.
- Forum `rps-ai-moderation` PHP: no `eval`/`system`/`exec`;
  moderation API key held in Flarum settings, not code.
- E2E helpers (`signInAsProvider`) rely on NEXT_PUBLIC_MOCK_AUTH
  being on — acceptable given the slice 02 B-044 hardening of the
  mock-auth guard.
- `apps/dwa/scripts/docker-entrypoint.js`: migration error is
  logged non-fatally (server starts anyway). Intentional; DDL is
  idempotent.
- `apps/dwa/public/openapi.json`: no `admin|debug|internal` routes
  surfaced. Clean.
- `apps/dwa/public/sw.js`: safe `'self'`-scoped cache, no bypass
  of `/api/`.

## Coverage ledger

Legend: ✅=READ (clean), 🔍=READ (findings filed), ⏭️=SKIPPED-BINARY, ⏳=PENDING.

| # | Path | Status | Note |
|---|---|---|---|
| 1 | `.changeset/config.json` | ⏳ | pending |
| 2 | `.claude/settings.json` | ⏳ | pending |
| 3 | `.claude/settings.local.json` | ⏳ | pending |
| 4 | `.dependency-cruiser.cjs` | ⏳ | pending |
| 5 | `.dockerignore` | ⏳ | pending |
| 6 | `.env.local` | ⏳ | pending |
| 7 | `.github/CODEOWNERS` | ⏳ | pending |
| 8 | `.github/workflows/ci.yml` | ⏳ | pending |
| 9 | `.gitignore` | ⏳ | pending |
| 10 | `.npmrc` | ⏳ | pending |
| 11 | `.nvmrc` | ⏳ | pending |
| 12 | `CLAUDE.md` | ✅ | root guidance; just updated with new audit-discipline rule |
| 13 | `Dockerfile` | ⏳ | pending |
| 14 | `Dockerfile.ops` | ⏳ | pending |
| 15 | `README.md` | ⏳ | pending |
| 16 | `adapters/classifier-maia/package.json` | ⏳ | pending |
| 17 | `adapters/classifier-maia/src/index.ts` | ⏳ | pending |
| 18 | `adapters/classifier-maia/tsconfig.json` | ⏳ | pending |
| 19 | `adapters/forum-flarum/package.json` | ⏳ | pending |
| 20 | `adapters/forum-flarum/src/index.ts` | ⏳ | pending |
| 21 | `adapters/forum-flarum/tsconfig.json` | ⏳ | pending |
| 22 | `adapters/forum-nodebb/package.json` | ⏳ | pending |
| 23 | `adapters/forum-nodebb/src/index.ts` | ⏳ | pending |
| 24 | `adapters/forum-nodebb/tsconfig.json` | ⏳ | pending |
| 25 | `adapters/llm-openrouter/package.json` | ⏳ | pending |
| 26 | `adapters/llm-openrouter/src/index.ts` | ⏳ | pending |
| 27 | `adapters/llm-openrouter/tsconfig.json` | ⏳ | pending |
| 28 | `adapters/mail-resend/package.json` | ⏳ | pending |
| 29 | `adapters/mail-resend/src/index.ts` | ⏳ | pending |
| 30 | `adapters/mail-resend/tsconfig.json` | ⏳ | pending |
| 31 | `adapters/pay-polar/package.json` | ⏳ | pending |
| 32 | `adapters/pay-polar/src/index.ts` | ⏳ | pending |
| 33 | `adapters/pay-polar/tsconfig.json` | ⏳ | pending |
| 34 | `adapters/storage-s3/package.json` | ⏳ | pending |
| 35 | `adapters/storage-s3/src/index.ts` | ⏳ | pending |
| 36 | `adapters/storage-s3/tsconfig.json` | ⏳ | pending |
| 37 | `adapters/vector-pgvector/package.json` | ⏳ | pending |
| 38 | `adapters/vector-pgvector/src/index.ts` | ⏳ | pending |
| 39 | `adapters/vector-pgvector/tsconfig.json` | ⏳ | pending |
| 40 | `apps/dwa/.agent/COURSE-SYSTEM-FINAL-VERIFICATION.md` | ⏳ | pending |
| 41 | `apps/dwa/.agent/workflows/10-10-production-ready.md` | ⏳ | pending |
| 42 | `apps/dwa/.dockerignore` | ✅ | slice 04 |
| 43 | `apps/dwa/.gemini/MEMORY.md` | ⏳ | pending |
| 44 | `apps/dwa/.github/workflows/deploy-classifier.yml` | 🔍 | slice 04 — B-049..B-058 |
| 45 | `apps/dwa/.gitignore` | ✅ | slice 04 |
| 46 | `apps/dwa/.gitleaks.toml` | ✅ | slice 04 |
| 47 | `apps/dwa/.npmrc` | ✅ | slice 04 |
| 48 | `apps/dwa/.nvmrc` | ✅ | slice 04 |
| 49 | `apps/dwa/Audits/18-april-audit-REMEDIATION.md` | ⏳ | pending |
| 50 | `apps/dwa/Audits/18-april-audit.md` | ⏳ | pending |
| 51 | `apps/dwa/Audits/2026-04-20-comprehensive-audit.md` | ⏳ | pending |
| 52 | `apps/dwa/Audits/AUDIT-STATUS-2026-04-20.md` | ⏳ | pending |
| 53 | `apps/dwa/CHANGELOG.md` | ✅ | slice 04 |
| 54 | `apps/dwa/DEPLOY.md` | ✅ | slice 04 |
| 55 | `apps/dwa/DEPLOY_NOTES.md` | ✅ | slice 04 |
| 56 | `apps/dwa/Dockerfile` | 🔍 | slice 04 — B-049..B-058 |
| 57 | `apps/dwa/README.md` | ✅ | slice 04 |
| 58 | `apps/dwa/SCREENSHOT_GUIDE.md` | ✅ | slice 04 |
| 59 | `apps/dwa/_Full-Platform-Capabilities-Plans/_4-15COMPLETE_PLATFORM_CAPABILITIES.md` | ⏳ | pending |
| 60 | `apps/dwa/_archive/3d-matrix/3d-matrix-integration.md` | ⏳ | pending |
| 61 | `apps/dwa/_archive/3d-matrix/output/data/clientRoles.json` | ⏳ | pending |
| 62 | `apps/dwa/_archive/3d-matrix/output/data/discPatterns.json` | ⏳ | pending |
| 63 | `apps/dwa/_archive/3d-matrix/output/data/founderCategories.json` | ⏳ | pending |
| 64 | `apps/dwa/_archive/3d-matrix/output/data/industries/agencies.json` | ⏳ | pending |
| 65 | `apps/dwa/_archive/3d-matrix/output/data/industries/devtools.json` | ⏳ | pending |
| 66 | `apps/dwa/_archive/3d-matrix/output/data/industries/ecommerce.json` | ⏳ | pending |
| 67 | `apps/dwa/_archive/3d-matrix/output/data/industries/edtech.json` | ⏳ | pending |
| 68 | `apps/dwa/_archive/3d-matrix/output/data/industries/fintech.json` | ⏳ | pending |
| 69 | `apps/dwa/_archive/3d-matrix/output/data/industries/healthtech.json` | ⏳ | pending |
| 70 | `apps/dwa/_archive/3d-matrix/output/data/industries/hr_recruiting.json` | ⏳ | pending |
| 71 | `apps/dwa/_archive/3d-matrix/output/data/industries/manufacturing.json` | ⏳ | pending |
| 72 | `apps/dwa/_archive/3d-matrix/output/data/industries/martech.json` | ⏳ | pending |
| 73 | `apps/dwa/_archive/3d-matrix/output/data/industries/professional_services.json` | ⏳ | pending |
| 74 | `apps/dwa/_archive/3d-matrix/output/data/industries/real_estate.json` | ⏳ | pending |
| 75 | `apps/dwa/_archive/3d-matrix/output/data/industries/saas_startup.json` | ⏳ | pending |
| 76 | `apps/dwa/_archive/3d-matrix/output/types/ClientRole.ts` | ⏳ | pending |
| 77 | `apps/dwa/_archive/3d-matrix/output/types/DiscPattern.ts` | ⏳ | pending |
| 78 | `apps/dwa/_archive/3d-matrix/output/types/FounderCategory.ts` | ⏳ | pending |
| 79 | `apps/dwa/_archive/3d-matrix/output/types/Industry.ts` | ⏳ | pending |
| 80 | `apps/dwa/_archive/3d-matrix/output/types/index.ts` | ⏳ | pending |
| 81 | `apps/dwa/_archive/academy-components/founder-context-panel.tsx` | ⏳ | pending |
| 82 | `apps/dwa/_archive/academy-components/personalized-example.tsx` | ⏳ | pending |
| 83 | `apps/dwa/_archive/api-routes/ai/icp-validation/route.ts` | ⏳ | pending |
| 84 | `apps/dwa/_archive/api-routes/onboarding/analyze/route.test.ts` | ⏳ | pending |
| 85 | `apps/dwa/_archive/api-routes/onboarding/analyze/route.ts` | ⏳ | pending |
| 86 | `apps/dwa/_archive/api-routes/onboarding/business/route.ts` | ⏳ | pending |
| 87 | `apps/dwa/_archive/api-routes/onboarding/complete-assessment/route.ts` | ⏳ | pending |
| 88 | `apps/dwa/_archive/api-routes/onboarding/context/route.ts` | ⏳ | pending |
| 89 | `apps/dwa/_archive/api-routes/onboarding/goal/route.ts` | ⏳ | pending |
| 90 | `apps/dwa/_archive/api-routes/onboarding/industries/route.ts` | ⏳ | pending |
| 91 | `apps/dwa/_archive/api-routes/onboarding/upload/route.test.ts` | ⏳ | pending |
| 92 | `apps/dwa/_archive/api-routes/onboarding/upload/route.ts` | ⏳ | pending |
| 93 | `apps/dwa/_archive/api/test/setup-profile/route.ts` | ⏳ | pending |
| 94 | `apps/dwa/_archive/audits/20-april-gemini-OUTDATED.md` | ⏳ | pending |
| 95 | `apps/dwa/_archive/coolify-docs/COOLIFY-ANTIGRAVITY-STATUS.md` | ⏳ | pending |
| 96 | `apps/dwa/_archive/coolify-docs/COOLIFY-BUILD-FIX.md` | ⏳ | pending |
| 97 | `apps/dwa/_archive/coolify-docs/COOLIFY-DEPLOYED-SERVICES.md` | ⏳ | pending |
| 98 | `apps/dwa/_archive/coolify-docs/COOLIFY-ENV.md` | ⏳ | pending |
| 99 | `apps/dwa/_archive/coolify-docs/COOLIFY-SERVICES.md` | ⏳ | pending |
| 100 | `apps/dwa/_archive/coolify-docs/COOLIFY-SETUP-CHECKLIST.md` | ⏳ | pending |
| 101 | `apps/dwa/_archive/coolify-docs/COOLIFY-TRIGGER-SETUP.md` | ⏳ | pending |
| 102 | `apps/dwa/_archive/genkit-flows/config.ts.bak` | ⏳ | pending |
| 103 | `apps/dwa/_archive/genkit-flows/flows/assessmentGenerator.ts.bak` | ⏳ | pending |
| 104 | `apps/dwa/_archive/genkit-flows/flows/coachingChat.ts.bak` | ⏳ | pending |
| 105 | `apps/dwa/_archive/genkit-flows/flows/documentAnalyzer.ts.bak` | ⏳ | pending |
| 106 | `apps/dwa/_archive/genkit-flows/flows/icpValidation.test.ts.bak` | ⏳ | pending |
| 107 | `apps/dwa/_archive/genkit-flows/flows/icpValidation.ts.bak` | ⏳ | pending |
| 108 | `apps/dwa/_archive/genkit-flows/flows/linkedinAnalyzer.ts.bak` | ⏳ | pending |
| 109 | `apps/dwa/_archive/genkit-flows/flows/quizReflection.ts.bak` | ⏳ | pending |
| 110 | `apps/dwa/_archive/genkit-flows/flows/ragIndexer.ts.bak` | ⏳ | pending |
| 111 | `apps/dwa/_archive/genkit-flows/flows/salesRoleplay.ts.bak` | ⏳ | pending |
| 112 | `apps/dwa/_archive/genkit-flows/flows/salesRoleplay3D.ts.bak` | ⏳ | pending |
| 113 | `apps/dwa/_archive/genkit-flows/flows/salesRoleplayEval3D.ts.bak` | ⏳ | pending |
| 114 | `apps/dwa/_archive/genkit-flows/flows/websiteAnalyzer.ts.bak` | ⏳ | pending |
| 115 | `apps/dwa/_archive/genkit-flows/index.ts.bak` | ⏳ | pending |
| 116 | `apps/dwa/_archive/genkit-flows/telemetry.test.ts.bak` | ⏳ | pending |
| 117 | `apps/dwa/_archive/genkit-flows/telemetry.ts.bak` | ⏳ | pending |
| 118 | `apps/dwa/_archive/genkit-flows/vertexIndexer.test.ts.bak` | ⏳ | pending |
| 119 | `apps/dwa/_archive/genkit-flows/vertexIndexer.ts.bak` | ⏳ | pending |
| 120 | `apps/dwa/_archive/genkit-flows/vertexRetriever.ts.bak` | ⏳ | pending |
| 121 | `apps/dwa/_archive/lib/api/onboarding-client.ts` | ⏳ | pending |
| 122 | `apps/dwa/_archive/lib/context/FounderContext.tsx` | ⏳ | pending |
| 123 | `apps/dwa/_archive/lib/repositories/fileMasterDataRepository.ts` | ⏳ | pending |
| 124 | `apps/dwa/_archive/lib/repositories/masterDataRepository.ts` | ⏳ | pending |
| 125 | `apps/dwa/_archive/lib/repositories/masterDataRepositoryFactory.ts` | ⏳ | pending |
| 126 | `apps/dwa/_archive/lib/repositories/mockMasterDataRepository.ts` | ⏳ | pending |
| 127 | `apps/dwa/_archive/lib/services/onboardingService.test.ts` | ⏳ | pending |
| 128 | `apps/dwa/_archive/lib/services/profileContextService.test.ts` | ⏳ | pending |
| 129 | `apps/dwa/_archive/old-onboarding/analyzing/page.tsx` | ⏳ | pending |
| 130 | `apps/dwa/_archive/old-onboarding/business/page.tsx` | ⏳ | pending |
| 131 | `apps/dwa/_archive/old-onboarding/context/page.tsx` | ⏳ | pending |
| 132 | `apps/dwa/_archive/old-onboarding/founder-assessment/page.tsx` | ⏳ | pending |
| 133 | `apps/dwa/_archive/old-onboarding/goal/page.tsx` | ⏳ | pending |
| 134 | `apps/dwa/_archive/old-onboarding/questionnaire/page.tsx` | ⏳ | pending |
| 135 | `apps/dwa/_archive/scripts/list-models.ts.bak` | ⏳ | pending |
| 136 | `apps/dwa/_archive/scripts/phase-a-ai-validation.ts` | ⏳ | pending |
| 137 | `apps/dwa/_archive/scripts/phase-a-content-audit.ts` | ⏳ | pending |
| 138 | `apps/dwa/_archive/scripts/setup-vertex-ai.ts` | ⏳ | pending |
| 139 | `apps/dwa/_archive/scripts/test-ai-layer.ts` | ⏳ | pending |
| 140 | `apps/dwa/_archive/scripts/test-integrity.ts` | ⏳ | pending |
| 141 | `apps/dwa/_archive/scripts/test-persistence.ts` | ⏳ | pending |
| 142 | `apps/dwa/_archive/scripts/test-rag-flows.ts` | ⏳ | pending |
| 143 | `apps/dwa/_archive/scripts/test-spicy-audit.ts` | ⏳ | pending |
| 144 | `apps/dwa/_archive/scripts/test-stt-auth.ts` | ⏳ | pending |
| 145 | `apps/dwa/_archive/test-models.ts` | ⏳ | pending |
| 146 | `apps/dwa/_archive/test-structured-output.ts` | ⏳ | pending |
| 147 | `apps/dwa/app/(admin)/admin/providers/admin-provider-actions.tsx` | ⏳ | pending |
| 148 | `apps/dwa/app/(admin)/admin/providers/page.tsx` | ⏳ | pending |
| 149 | `apps/dwa/app/(admin)/layout.tsx` | ⏳ | pending |
| 150 | `apps/dwa/app/(alternative)/components-library/accordion/page.tsx` | ⏳ | pending |
| 151 | `apps/dwa/app/(alternative)/components-library/alert/banners-01.tsx` | ⏳ | pending |
| 152 | `apps/dwa/app/(alternative)/components-library/alert/banners-02.tsx` | ⏳ | pending |
| 153 | `apps/dwa/app/(alternative)/components-library/alert/notifications.tsx` | ⏳ | pending |
| 154 | `apps/dwa/app/(alternative)/components-library/alert/page.tsx` | ⏳ | pending |
| 155 | `apps/dwa/app/(alternative)/components-library/alert/toasts-01.tsx` | ⏳ | pending |
| 156 | `apps/dwa/app/(alternative)/components-library/alert/toasts-02.tsx` | ⏳ | pending |
| 157 | `apps/dwa/app/(alternative)/components-library/alert/toasts-03.tsx` | ⏳ | pending |
| 158 | `apps/dwa/app/(alternative)/components-library/avatar/page.tsx` | ⏳ | pending |
| 159 | `apps/dwa/app/(alternative)/components-library/badge/page.tsx` | ⏳ | pending |
| 160 | `apps/dwa/app/(alternative)/components-library/breadcrumb/page.tsx` | ⏳ | pending |
| 161 | `apps/dwa/app/(alternative)/components-library/button/page.tsx` | ⏳ | pending |
| 162 | `apps/dwa/app/(alternative)/components-library/dropdown/page.tsx` | ⏳ | pending |
| 163 | `apps/dwa/app/(alternative)/components-library/form/form-switches.tsx` | ⏳ | pending |
| 164 | `apps/dwa/app/(alternative)/components-library/form/page.tsx` | ⏳ | pending |
| 165 | `apps/dwa/app/(alternative)/components-library/icons/page.tsx` | ⏳ | pending |
| 166 | `apps/dwa/app/(alternative)/components-library/modal/basic-examples.tsx` | ⏳ | pending |
| 167 | `apps/dwa/app/(alternative)/components-library/modal/feedback-examples.tsx` | ⏳ | pending |
| 168 | `apps/dwa/app/(alternative)/components-library/modal/page.tsx` | ⏳ | pending |
| 169 | `apps/dwa/app/(alternative)/components-library/modal/product-examples.tsx` | ⏳ | pending |
| 170 | `apps/dwa/app/(alternative)/components-library/pagination/page.tsx` | ⏳ | pending |
| 171 | `apps/dwa/app/(alternative)/components-library/tabs/page.tsx` | ⏳ | pending |
| 172 | `apps/dwa/app/(alternative)/components-library/tooltip/page.tsx` | ⏳ | pending |
| 173 | `apps/dwa/app/(alternative)/layout.tsx` | ⏳ | pending |
| 174 | `apps/dwa/app/(alternative)/utility/404/page.tsx` | ⏳ | pending |
| 175 | `apps/dwa/app/(alternative)/utility/changelog/page.tsx` | ⏳ | pending |
| 176 | `apps/dwa/app/(alternative)/utility/empty-state/page.tsx` | ⏳ | pending |
| 177 | `apps/dwa/app/(alternative)/utility/faqs/page.tsx` | ⏳ | pending |
| 178 | `apps/dwa/app/(alternative)/utility/roadmap/page.tsx` | ⏳ | pending |
| 179 | `apps/dwa/app/(auth)/auth-header.tsx` | ⏳ | pending |
| 180 | `apps/dwa/app/(auth)/auth-image.tsx` | ⏳ | pending |
| 181 | `apps/dwa/app/(auth)/error.tsx` | ⏳ | pending |
| 182 | `apps/dwa/app/(auth)/reset-password/page.tsx` | ⏳ | pending |
| 183 | `apps/dwa/app/(auth)/signin/page.tsx` | ⏳ | pending |
| 184 | `apps/dwa/app/(auth)/signup/page.tsx` | ⏳ | pending |
| 185 | `apps/dwa/app/(default)/academy/[courseId]/[lessonId]/page.tsx` | ⏳ | pending |
| 186 | `apps/dwa/app/(default)/academy/[courseId]/complete/page.tsx` | ⏳ | pending |
| 187 | `apps/dwa/app/(default)/academy/[courseId]/error.tsx` | ⏳ | pending |
| 188 | `apps/dwa/app/(default)/academy/[courseId]/page.tsx` | ⏳ | pending |
| 189 | `apps/dwa/app/(default)/academy/components/assessment-history-chart.tsx` | ⏳ | pending |
| 190 | `apps/dwa/app/(default)/academy/components/body-map.tsx` | ⏳ | pending |
| 191 | `apps/dwa/app/(default)/academy/components/callout.tsx` | ⏳ | pending |
| 192 | `apps/dwa/app/(default)/academy/components/checkin.tsx` | ⏳ | pending |
| 193 | `apps/dwa/app/(default)/academy/components/checklist.tsx` | ⏳ | pending |
| 194 | `apps/dwa/app/(default)/academy/components/complete-button.tsx` | ⏳ | pending |
| 195 | `apps/dwa/app/(default)/academy/components/coping-strategy-ranker-dynamic.tsx` | ⏳ | pending |
| 196 | `apps/dwa/app/(default)/academy/components/coping-strategy-ranker.tsx` | ⏳ | pending |
| 197 | `apps/dwa/app/(default)/academy/components/engagement-summary.tsx` | ⏳ | pending |
| 198 | `apps/dwa/app/(default)/academy/components/enhanced-accordion.tsx` | ⏳ | pending |
| 199 | `apps/dwa/app/(default)/academy/components/exposure-hierarchy.tsx` | ⏳ | pending |
| 200 | `apps/dwa/app/(default)/academy/components/exposure-log.tsx` | ⏳ | pending |
| 201 | `apps/dwa/app/(default)/academy/components/exposure-plan-worksheet.tsx` | ⏳ | pending |
| 202 | `apps/dwa/app/(default)/academy/components/flip-card.tsx` | ⏳ | pending |
| 203 | `apps/dwa/app/(default)/academy/components/gamma-presentation.tsx` | ⏳ | pending |
| 204 | `apps/dwa/app/(default)/academy/components/guided-grounding.tsx` | ⏳ | pending |
| 205 | `apps/dwa/app/(default)/academy/components/insight-grid.tsx` | ⏳ | pending |
| 206 | `apps/dwa/app/(default)/academy/components/interactive-breathing.tsx` | ⏳ | pending |
| 207 | `apps/dwa/app/(default)/academy/components/interactive-scenario.tsx` | ⏳ | pending |
| 208 | `apps/dwa/app/(default)/academy/components/lesson-diagrams.tsx` | ⏳ | pending |
| 209 | `apps/dwa/app/(default)/academy/components/lesson-feedback.tsx` | ⏳ | pending |
| 210 | `apps/dwa/app/(default)/academy/components/lesson-quiz.test.tsx` | ⏳ | pending |
| 211 | `apps/dwa/app/(default)/academy/components/lesson-quiz.tsx` | ⏳ | pending |
| 212 | `apps/dwa/app/(default)/academy/components/likert-assessment.tsx` | ⏳ | pending |
| 213 | `apps/dwa/app/(default)/academy/components/mindfulness-timer.tsx` | ⏳ | pending |
| 214 | `apps/dwa/app/(default)/academy/components/scenario-card.tsx` | ⏳ | pending |
| 215 | `apps/dwa/app/(default)/academy/components/slide-navigation.tsx` | ⏳ | pending |
| 216 | `apps/dwa/app/(default)/academy/components/step-by-step.tsx` | ⏳ | pending |
| 217 | `apps/dwa/app/(default)/academy/components/thought-record.tsx` | ⏳ | pending |
| 218 | `apps/dwa/app/(default)/academy/components/toolkit-card.tsx` | ⏳ | pending |
| 219 | `apps/dwa/app/(default)/academy/components/tracking-log.tsx` | ⏳ | pending |
| 220 | `apps/dwa/app/(default)/academy/components/tracking-trend-chart.tsx` | ⏳ | pending |
| 221 | `apps/dwa/app/(default)/academy/components/use-component-state.ts` | ⏳ | pending |
| 222 | `apps/dwa/app/(default)/academy/components/use-confetti.tsx` | ⏳ | pending |
| 223 | `apps/dwa/app/(default)/academy/loading.tsx` | ⏳ | pending |
| 224 | `apps/dwa/app/(default)/academy/my-path/page.tsx` | ⏳ | pending |
| 225 | `apps/dwa/app/(default)/academy/page.tsx` | ⏳ | pending |
| 226 | `apps/dwa/app/(default)/coach/coaching-chat.tsx` | ⏳ | pending |
| 227 | `apps/dwa/app/(default)/coach/loading.tsx` | ⏳ | pending |
| 228 | `apps/dwa/app/(default)/coach/page.tsx` | ⏳ | pending |
| 229 | `apps/dwa/app/(default)/community/feed/feed-left-content.tsx` | ⏳ | pending |
| 230 | `apps/dwa/app/(default)/community/feed/feed-posts.tsx` | ⏳ | pending |
| 231 | `apps/dwa/app/(default)/community/feed/feed-right-content.tsx` | ⏳ | pending |
| 232 | `apps/dwa/app/(default)/community/feed/page.tsx` | ⏳ | pending |
| 233 | `apps/dwa/app/(default)/community/forum/create-post-modal.tsx` | ⏳ | pending |
| 234 | `apps/dwa/app/(default)/community/forum/forum-entries.tsx` | ⏳ | pending |
| 235 | `apps/dwa/app/(default)/community/forum/forum-left-content.tsx` | ⏳ | pending |
| 236 | `apps/dwa/app/(default)/community/forum/forum-right-content.tsx` | ⏳ | pending |
| 237 | `apps/dwa/app/(default)/community/forum/page.tsx` | ⏳ | pending |
| 238 | `apps/dwa/app/(default)/community/forum/post/[id]/error.tsx` | ⏳ | pending |
| 239 | `apps/dwa/app/(default)/community/forum/post/[id]/forum-entry-dynamic.tsx` | ⏳ | pending |
| 240 | `apps/dwa/app/(default)/community/forum/post/[id]/forum-post-right-content.tsx` | ⏳ | pending |
| 241 | `apps/dwa/app/(default)/community/forum/post/[id]/page.tsx` | ⏳ | pending |
| 242 | `apps/dwa/app/(default)/community/forum/post/forum-entry.tsx` | ⏳ | pending |
| 243 | `apps/dwa/app/(default)/community/forum/post/forum-post-right-content.tsx` | ⏳ | pending |
| 244 | `apps/dwa/app/(default)/community/forum/post/page.tsx` | ⏳ | pending |
| 245 | `apps/dwa/app/(default)/community/loading.tsx` | ⏳ | pending |
| 246 | `apps/dwa/app/(default)/community/meetups/meetups-posts.tsx` | ⏳ | pending |
| 247 | `apps/dwa/app/(default)/community/meetups/page.tsx` | ⏳ | pending |
| 248 | `apps/dwa/app/(default)/community/meetups/post/page.tsx` | ⏳ | pending |
| 249 | `apps/dwa/app/(default)/community/tab-card.tsx` | ⏳ | pending |
| 250 | `apps/dwa/app/(default)/community/tile-card.tsx` | ⏳ | pending |
| 251 | `apps/dwa/app/(default)/community/users-tabs/page.tsx` | ⏳ | pending |
| 252 | `apps/dwa/app/(default)/community/users-tiles/page.tsx` | ⏳ | pending |
| 253 | `apps/dwa/app/(default)/dashboard/academy-dashboard.tsx` | ⏳ | pending |
| 254 | `apps/dwa/app/(default)/dashboard/analytics/analytics-card-01.tsx` | ⏳ | pending |
| 255 | `apps/dwa/app/(default)/dashboard/analytics/analytics-card-02.tsx` | ⏳ | pending |
| 256 | `apps/dwa/app/(default)/dashboard/analytics/analytics-card-03.tsx` | ⏳ | pending |
| 257 | `apps/dwa/app/(default)/dashboard/analytics/analytics-card-04.tsx` | ⏳ | pending |
| 258 | `apps/dwa/app/(default)/dashboard/analytics/analytics-card-05.tsx` | ⏳ | pending |
| 259 | `apps/dwa/app/(default)/dashboard/analytics/analytics-card-06.tsx` | ⏳ | pending |
| 260 | `apps/dwa/app/(default)/dashboard/analytics/analytics-card-07.tsx` | ⏳ | pending |
| 261 | `apps/dwa/app/(default)/dashboard/analytics/analytics-card-08.tsx` | ⏳ | pending |
| 262 | `apps/dwa/app/(default)/dashboard/analytics/analytics-card-09.tsx` | ⏳ | pending |
| 263 | `apps/dwa/app/(default)/dashboard/analytics/analytics-card-10.tsx` | ⏳ | pending |
| 264 | `apps/dwa/app/(default)/dashboard/analytics/analytics-card-11.tsx` | ⏳ | pending |
| 265 | `apps/dwa/app/(default)/dashboard/analytics/page.tsx` | ⏳ | pending |
| 266 | `apps/dwa/app/(default)/dashboard/components/dashboard-path-preview.tsx` | ⏳ | pending |
| 267 | `apps/dwa/app/(default)/dashboard/components/next-steps.tsx` | ⏳ | pending |
| 268 | `apps/dwa/app/(default)/dashboard/components/wellness-alerts-display.tsx` | ⏳ | pending |
| 269 | `apps/dwa/app/(default)/dashboard/components/wellness-health.tsx` | ⏳ | pending |
| 270 | `apps/dwa/app/(default)/dashboard/dashboard-card-01.tsx` | ⏳ | pending |
| 271 | `apps/dwa/app/(default)/dashboard/dashboard-card-02.tsx` | ⏳ | pending |
| 272 | `apps/dwa/app/(default)/dashboard/dashboard-card-03.tsx` | ⏳ | pending |
| 273 | `apps/dwa/app/(default)/dashboard/dashboard-card-04.tsx` | ⏳ | pending |
| 274 | `apps/dwa/app/(default)/dashboard/dashboard-card-05.tsx` | ⏳ | pending |
| 275 | `apps/dwa/app/(default)/dashboard/dashboard-card-06.tsx` | ⏳ | pending |
| 276 | `apps/dwa/app/(default)/dashboard/dashboard-card-07.tsx` | ⏳ | pending |
| 277 | `apps/dwa/app/(default)/dashboard/dashboard-card-08.tsx` | ⏳ | pending |
| 278 | `apps/dwa/app/(default)/dashboard/dashboard-card-09.tsx` | ⏳ | pending |
| 279 | `apps/dwa/app/(default)/dashboard/dashboard-card-10.tsx` | ⏳ | pending |
| 280 | `apps/dwa/app/(default)/dashboard/dashboard-card-11.tsx` | ⏳ | pending |
| 281 | `apps/dwa/app/(default)/dashboard/error.tsx` | ⏳ | pending |
| 282 | `apps/dwa/app/(default)/dashboard/loading.tsx` | ⏳ | pending |
| 283 | `apps/dwa/app/(default)/dashboard/page.tsx` | ⏳ | pending |
| 284 | `apps/dwa/app/(default)/docs/api/page.tsx` | ⏳ | pending |
| 285 | `apps/dwa/app/(default)/docs/architecture/page.tsx` | ⏳ | pending |
| 286 | `apps/dwa/app/(default)/docs/page.tsx` | ⏳ | pending |
| 287 | `apps/dwa/app/(default)/error.tsx` | ⏳ | pending |
| 288 | `apps/dwa/app/(default)/layout.tsx` | ⏳ | pending |
| 289 | `apps/dwa/app/(default)/optimization/[courseId]/[lessonId]/page.tsx` | ⏳ | pending |
| 290 | `apps/dwa/app/(default)/optimization/[courseId]/page.tsx` | ⏳ | pending |
| 291 | `apps/dwa/app/(default)/optimization/page.tsx` | ⏳ | pending |
| 292 | `apps/dwa/app/(default)/provider-pending/page.tsx` | ⏳ | pending |
| 293 | `apps/dwa/app/(default)/provider-rejected/page.tsx` | ⏳ | pending |
| 294 | `apps/dwa/app/(default)/provider-signup/page.tsx` | ⏳ | pending |
| 295 | `apps/dwa/app/(default)/resources/crisis/page.tsx` | ⏳ | pending |
| 296 | `apps/dwa/app/(default)/settings/account/account-panel.tsx` | ⏳ | pending |
| 297 | `apps/dwa/app/(default)/settings/account/page.tsx` | ⏳ | pending |
| 298 | `apps/dwa/app/(default)/settings/apps/apps-panel.tsx` | ⏳ | pending |
| 299 | `apps/dwa/app/(default)/settings/apps/page.tsx` | ⏳ | pending |
| 300 | `apps/dwa/app/(default)/settings/billing/billing-panel.tsx` | ⏳ | pending |
| 301 | `apps/dwa/app/(default)/settings/billing/page.tsx` | ⏳ | pending |
| 302 | `apps/dwa/app/(default)/settings/feedback/feedback-panel.tsx` | ⏳ | pending |
| 303 | `apps/dwa/app/(default)/settings/feedback/page.tsx` | ⏳ | pending |
| 304 | `apps/dwa/app/(default)/settings/loading.tsx` | ⏳ | pending |
| 305 | `apps/dwa/app/(default)/settings/notifications/notifications-panel.tsx` | ⏳ | pending |
| 306 | `apps/dwa/app/(default)/settings/notifications/page.tsx` | ⏳ | pending |
| 307 | `apps/dwa/app/(default)/settings/plans/page.tsx` | ⏳ | pending |
| 308 | `apps/dwa/app/(default)/settings/plans/plans-panel.tsx` | ⏳ | pending |
| 309 | `apps/dwa/app/(default)/settings/settings-sidebar.tsx` | ⏳ | pending |
| 310 | `apps/dwa/app/(double-sidebar)/community/profile/page.tsx` | ⏳ | pending |
| 311 | `apps/dwa/app/(double-sidebar)/community/profile/profile-body.tsx` | ⏳ | pending |
| 312 | `apps/dwa/app/(double-sidebar)/community/profile/profile-sidebar.tsx` | ⏳ | pending |
| 313 | `apps/dwa/app/(double-sidebar)/inbox/inbox-body.tsx` | ⏳ | pending |
| 314 | `apps/dwa/app/(double-sidebar)/inbox/inbox-sidebar.tsx` | ⏳ | pending |
| 315 | `apps/dwa/app/(double-sidebar)/inbox/mail-item.tsx` | ⏳ | pending |
| 316 | `apps/dwa/app/(double-sidebar)/inbox/page.tsx` | ⏳ | pending |
| 317 | `apps/dwa/app/(double-sidebar)/layout.tsx` | ⏳ | pending |
| 318 | `apps/dwa/app/(double-sidebar)/messages/channels.tsx` | ⏳ | pending |
| 319 | `apps/dwa/app/(double-sidebar)/messages/direct-messages.tsx` | ⏳ | pending |
| 320 | `apps/dwa/app/(double-sidebar)/messages/messages-body.tsx` | ⏳ | pending |
| 321 | `apps/dwa/app/(double-sidebar)/messages/messages-chat.tsx` | ⏳ | pending |
| 322 | `apps/dwa/app/(double-sidebar)/messages/messages-footer.tsx` | ⏳ | pending |
| 323 | `apps/dwa/app/(double-sidebar)/messages/messages-header.tsx` | ⏳ | pending |
| 324 | `apps/dwa/app/(double-sidebar)/messages/messages-sidebar.tsx` | ⏳ | pending |
| 325 | `apps/dwa/app/(double-sidebar)/messages/page.tsx` | ⏳ | pending |
| 326 | `apps/dwa/app/(marketing)/application/page.tsx` | ⏳ | pending |
| 327 | `apps/dwa/app/(marketing)/architecture/page.tsx` | ⏳ | pending |
| 328 | `apps/dwa/app/(marketing)/courses/page.tsx` | ⏳ | pending |
| 329 | `apps/dwa/app/(marketing)/for-employers/page.tsx` | ⏳ | pending |
| 330 | `apps/dwa/app/(marketing)/for-platforms/page.tsx` | ⏳ | pending |
| 331 | `apps/dwa/app/(marketing)/for-practices/feature-screenshot.tsx` | ⏳ | pending |
| 332 | `apps/dwa/app/(marketing)/for-practices/page.tsx` | ⏳ | pending |
| 333 | `apps/dwa/app/(marketing)/layout.tsx` | ⏳ | pending |
| 334 | `apps/dwa/app/(marketing)/page.tsx` | ⏳ | pending |
| 335 | `apps/dwa/app/(marketing)/request-demo/page.tsx` | ⏳ | pending |
| 336 | `apps/dwa/app/(onboarding)/error.tsx` | ⏳ | pending |
| 337 | `apps/dwa/app/(onboarding)/onboarding-context.tsx` | ⏳ | pending |
| 338 | `apps/dwa/app/(onboarding)/onboarding-header.tsx` | ⏳ | pending |
| 339 | `apps/dwa/app/(onboarding)/onboarding-progress.tsx` | ⏳ | pending |
| 340 | `apps/dwa/app/(onboarding)/onboarding/about-you/page.tsx` | ⏳ | pending |
| 341 | `apps/dwa/app/(onboarding)/onboarding/assessment/page.tsx` | ⏳ | pending |
| 342 | `apps/dwa/app/(onboarding)/onboarding/goals/page.tsx` | ⏳ | pending |
| 343 | `apps/dwa/app/(onboarding)/onboarding/in-your-words/page.tsx` | ⏳ | pending |
| 344 | `apps/dwa/app/(onboarding)/onboarding/layout.tsx` | ⏳ | pending |
| 345 | `apps/dwa/app/(onboarding)/onboarding/page.tsx` | ⏳ | pending |
| 346 | `apps/dwa/app/(onboarding)/onboarding/safety/page.tsx` | ⏳ | pending |
| 347 | `apps/dwa/app/(onboarding)/onboarding/symptoms/page.tsx` | ⏳ | pending |
| 348 | `apps/dwa/app/(onboarding)/onboarding/welcome/page.tsx` | ⏳ | pending |
| 349 | `apps/dwa/app/(onboarding)/onboarding/your-experience/page.tsx` | ⏳ | pending |
| 350 | `apps/dwa/app/(provider)/layout.tsx` | ⏳ | pending |
| 351 | `apps/dwa/app/(provider)/provider-sidebar.tsx` | ⏳ | pending |
| 352 | `apps/dwa/app/(provider)/provider/alerts/page.tsx` | ⏳ | pending |
| 353 | `apps/dwa/app/(provider)/provider/alerts/resolve-alert-button.tsx` | ⏳ | pending |
| 354 | `apps/dwa/app/(provider)/provider/dashboard/page.tsx` | ⏳ | pending |
| 355 | `apps/dwa/app/(provider)/provider/page.tsx` | ⏳ | pending |
| 356 | `apps/dwa/app/(provider)/provider/patients/[patientId]/assign-course-panel.tsx` | ⏳ | pending |
| 357 | `apps/dwa/app/(provider)/provider/patients/[patientId]/page.tsx` | ⏳ | pending |
| 358 | `apps/dwa/app/(provider)/provider/patients/[patientId]/provider-notes-editor.tsx` | ⏳ | pending |
| 359 | `apps/dwa/app/(provider)/provider/patients/[patientId]/session-prep-button.tsx` | ⏳ | pending |
| 360 | `apps/dwa/app/(provider)/provider/patients/invite-code-panel.tsx` | ⏳ | pending |
| 361 | `apps/dwa/app/(provider)/provider/patients/page.tsx` | ⏳ | pending |
| 362 | `apps/dwa/app/(provider)/provider/profile/page.tsx` | ⏳ | pending |
| 363 | `apps/dwa/app/(provider)/provider/profile/provider-profile-form.tsx` | ⏳ | pending |
| 364 | `apps/dwa/app/(provider)/provider/resources/page.tsx` | ⏳ | pending |
| 365 | `apps/dwa/app/(provider)/provider/resources/rag-search-interface.tsx` | ⏳ | pending |
| 366 | `apps/dwa/app/api/academy/assessment/[courseId]/[lessonId]/route.ts` | 🔍 | see live findings list (B-039 + per-file notes) |
| 367 | `apps/dwa/app/api/academy/checklist/[courseId]/[lessonId]/route.ts` | 🔍 | see live findings list (B-039 + per-file notes) |
| 368 | `apps/dwa/app/api/academy/complete-lesson/route.ts` | 🔍 | see live findings list (B-039 + per-file notes) |
| 369 | `apps/dwa/app/api/academy/component-state/[courseId]/[lessonId]/route.ts` | 🔍 | see live findings list (B-039 + per-file notes) |
| 370 | `apps/dwa/app/api/academy/feedback/route.ts` | 🔍 | see live findings list (B-039 + per-file notes) |
| 371 | `apps/dwa/app/api/academy/quiz/[sectionId]/[courseId]/[lessonId]/route.ts` | 🔍 | see live findings list (B-039 + per-file notes) |
| 372 | `apps/dwa/app/api/academy/thought-record/[courseId]/[lessonId]/route.ts` | 🔍 | see live findings list (B-039 + per-file notes) |
| 373 | `apps/dwa/app/api/academy/tracking-log/[courseId]/[lessonId]/route.ts` | 🔍 | see live findings list (B-039 + per-file notes) |
| 374 | `apps/dwa/app/api/account/cancel-deletion/route.ts` | ✅ | slice 01 |
| 375 | `apps/dwa/app/api/account/delete/route.ts` | 🔍 | slice 01 |
| 376 | `apps/dwa/app/api/admin/create-demo-user/route.ts` | 🔍 | see live findings list (B-039 + per-file notes) |
| 377 | `apps/dwa/app/api/admin/debug/audit/route.ts` | 🔍 | see live findings list (B-039 + per-file notes) |
| 378 | `apps/dwa/app/api/admin/providers/[userId]/route.ts` | 🔍 | slice 01 |
| 379 | `apps/dwa/app/api/admin/providers/route.ts` | ✅ | slice 01 |
| 380 | `apps/dwa/app/api/ai/chat/route.ts` | 🔍 | see live findings list (B-039 + per-file notes) |
| 381 | `apps/dwa/app/api/ai/voice/stt/route.ts` | 🔍 | slice 01 |
| 382 | `apps/dwa/app/api/ai/voice/tts/route.ts` | 🔍 | slice 01 |
| 383 | `apps/dwa/app/api/auth/session/route.test.ts` | ⏳ | pending |
| 384 | `apps/dwa/app/api/auth/session/route.ts` | ✅ | slice 01 |
| 385 | `apps/dwa/app/api/auth/signin/route.ts` | 🔍 | slice 01 |
| 386 | `apps/dwa/app/api/auth/signout/route.ts` | ✅ | slice 01 |
| 387 | `apps/dwa/app/api/auth/signup/route.ts` | 🔍 | slice 01 |
| 388 | `apps/dwa/app/api/clinical-data/[componentType]/[componentId]/route.ts` | 🔍 | see live findings list (B-039 + per-file notes) |
| 389 | `apps/dwa/app/api/clinical-data/route.ts` | 🔍 | see live findings list (B-039 + per-file notes) |
| 390 | `apps/dwa/app/api/cron/purge-deleted-accounts/route.ts` | 🔍 | slice 01 |
| 391 | `apps/dwa/app/api/demo-request/route.ts` | 🔍 | slice 01 |
| 392 | `apps/dwa/app/api/diagnostic/route.ts` | 🔍 | slice 01 |
| 393 | `apps/dwa/app/api/docs/route.ts` | ✅ | slice 01 |
| 394 | `apps/dwa/app/api/forum/bookmarks/route.ts` | ✅ | slice 01 |
| 395 | `apps/dwa/app/api/forum/discussions/[id]/route.ts` | ✅ | slice 01 |
| 396 | `apps/dwa/app/api/forum/discussions/route.ts` | 🔍 | slice 01 |
| 397 | `apps/dwa/app/api/forum/posts/[id]/like/route.ts` | ✅ | slice 01 |
| 398 | `apps/dwa/app/api/forum/posts/route.ts` | ✅ | slice 01 |
| 399 | `apps/dwa/app/api/forum/tags/route.ts` | ✅ | slice 01 |
| 400 | `apps/dwa/app/api/health/ai/route.ts` | 🔍 | slice 01 |
| 401 | `apps/dwa/app/api/health/route.ts` | 🔍 | slice 01 |
| 402 | `apps/dwa/app/api/hello/route.ts` | ✅ | slice 01 |
| 403 | `apps/dwa/app/api/onboarding/about-you/route.ts` | ✅ | slice 01 |
| 404 | `apps/dwa/app/api/onboarding/assessment/route.ts` | ✅ | slice 01 |
| 405 | `apps/dwa/app/api/onboarding/basic-info/route.ts` | ✅ | slice 01 |
| 406 | `apps/dwa/app/api/onboarding/complete/route.ts` | 🔍 | slice 01 |
| 407 | `apps/dwa/app/api/onboarding/crisis-screening/route.ts` | ✅ | slice 01 |
| 408 | `apps/dwa/app/api/onboarding/goals/route.ts` | ✅ | slice 01 |
| 409 | `apps/dwa/app/api/onboarding/in-your-words/route.ts` | ✅ | slice 01 |
| 410 | `apps/dwa/app/api/onboarding/questionnaire/route.ts` | ✅ | slice 01 |
| 411 | `apps/dwa/app/api/onboarding/symptoms/route.ts` | ✅ | slice 01 |
| 412 | `apps/dwa/app/api/onboarding/your-experience/route.ts` | ✅ | slice 01 |
| 413 | `apps/dwa/app/api/profile/route.ts` | 🔍 | slice 01 |
| 414 | `apps/dwa/app/api/provider/alerts/[alertId]/resolve/route.ts` | ✅ | slice 01 |
| 415 | `apps/dwa/app/api/provider/alerts/route.ts` | ✅ | slice 01 |
| 416 | `apps/dwa/app/api/provider/check-assignment/route.ts` | ✅ | slice 01 |
| 417 | `apps/dwa/app/api/provider/invite/route.ts` | 🔍 | slice 01 |
| 418 | `apps/dwa/app/api/provider/patients/[patientId]/assign/route.ts` | 🔍 | slice 01 |
| 419 | `apps/dwa/app/api/provider/patients/[patientId]/route.ts` | 🔍 | slice 01 |
| 420 | `apps/dwa/app/api/provider/patients/route.ts` | 🔍 | slice 01 |
| 421 | `apps/dwa/app/api/provider/profile/route.ts` | 🔍 | slice 01 |
| 422 | `apps/dwa/app/api/provider/rag/route.ts` | 🔍 | slice 01 |
| 423 | `apps/dwa/app/api/provider/session-prep/[patientId]/route.ts` | 🔍 | slice 01 |
| 424 | `apps/dwa/app/api/safety/classify/route.ts` | 🔍 | see live findings list (B-039 + per-file notes) |
| 425 | `apps/dwa/app/api/test/setup-profile/route.ts` | 🔍 | see live findings list (B-039 + per-file notes) |
| 426 | `apps/dwa/app/app-provider.tsx` | ⏳ | pending |
| 427 | `apps/dwa/app/components/landing/hero.tsx` | ⏳ | pending |
| 428 | `apps/dwa/app/components/landing/track-framework.tsx` | ⏳ | pending |
| 429 | `apps/dwa/app/css/additional-styles/utility-patterns.css` | ⏳ | pending |
| 430 | `apps/dwa/app/css/style.css` | ⏳ | pending |
| 431 | `apps/dwa/app/error.tsx` | ⏳ | pending |
| 432 | `apps/dwa/app/flyout-context.tsx` | ⏳ | pending |
| 433 | `apps/dwa/app/global-error.tsx` | ⏳ | pending |
| 434 | `apps/dwa/app/layout.tsx` | ⏳ | pending |
| 435 | `apps/dwa/app/not-found.tsx` | ⏳ | pending |
| 436 | `apps/dwa/app/page.tsx` | ⏳ | pending |
| 437 | `apps/dwa/app/selected-items-context.tsx` | ⏳ | pending |
| 438 | `apps/dwa/app/theme-provider.tsx` | ⏳ | pending |
| 439 | `apps/dwa/components/accordion-basic.tsx` | ✅ | slice 03 |
| 440 | `apps/dwa/components/accordion-table-item.tsx` | ✅ | slice 03 |
| 441 | `apps/dwa/components/accordion-table-rich-item.tsx` | ✅ | slice 03 |
| 442 | `apps/dwa/components/ai/flyout-chat.tsx` | ✅ | slice 03 |
| 443 | `apps/dwa/components/ai/open-advisor-button.tsx` | ✅ | slice 03 |
| 444 | `apps/dwa/components/analytics/umami-script.tsx` | ✅ | slice 03 |
| 445 | `apps/dwa/components/banner-02.tsx` | ✅ | slice 03 |
| 446 | `apps/dwa/components/banner.tsx` | ✅ | slice 03 |
| 447 | `apps/dwa/components/channel-menu.tsx` | ✅ | slice 03 |
| 448 | `apps/dwa/components/charts/bar-chart-01.tsx` | ✅ | slice 03 |
| 449 | `apps/dwa/components/charts/bar-chart-02.tsx` | ✅ | slice 03 |
| 450 | `apps/dwa/components/charts/bar-chart-03.tsx` | ✅ | slice 03 |
| 451 | `apps/dwa/components/charts/bar-chart-04.tsx` | ✅ | slice 03 |
| 452 | `apps/dwa/components/charts/bar-chart-05.tsx` | ✅ | slice 03 |
| 453 | `apps/dwa/components/charts/bar-chart-06.tsx` | ✅ | slice 03 |
| 454 | `apps/dwa/components/charts/chartjs-config.tsx` | ✅ | slice 03 |
| 455 | `apps/dwa/components/charts/doughnut-chart.tsx` | ✅ | slice 03 |
| 456 | `apps/dwa/components/charts/line-chart-01.tsx` | ✅ | slice 03 |
| 457 | `apps/dwa/components/charts/line-chart-02.tsx` | ✅ | slice 03 |
| 458 | `apps/dwa/components/charts/line-chart-03.tsx` | ✅ | slice 03 |
| 459 | `apps/dwa/components/charts/line-chart-04.tsx` | ✅ | slice 03 |
| 460 | `apps/dwa/components/charts/line-chart-05.tsx` | ✅ | slice 03 |
| 461 | `apps/dwa/components/charts/line-chart-06.tsx` | ✅ | slice 03 |
| 462 | `apps/dwa/components/charts/line-chart-07.tsx` | ✅ | slice 03 |
| 463 | `apps/dwa/components/charts/line-chart-08.tsx` | ✅ | slice 03 |
| 464 | `apps/dwa/components/charts/line-chart-09.tsx` | 🔍 | slice 03 |
| 465 | `apps/dwa/components/charts/pie-chart.tsx` | ✅ | slice 03 |
| 466 | `apps/dwa/components/charts/polar-chart.tsx` | ✅ | slice 03 |
| 467 | `apps/dwa/components/charts/realtime-chart.tsx` | 🔍 | slice 03 |
| 468 | `apps/dwa/components/clinical/ExampleThoughtRecord.tsx` | ✅ | slice 03 |
| 469 | `apps/dwa/components/date-select.tsx` | ✅ | slice 03 |
| 470 | `apps/dwa/components/datepicker.tsx` | ✅ | slice 03 |
| 471 | `apps/dwa/components/delete-button.tsx` | ✅ | slice 03 |
| 472 | `apps/dwa/components/dropdown-filter.tsx` | ✅ | slice 03 |
| 473 | `apps/dwa/components/dropdown-full.tsx` | ✅ | slice 03 |
| 474 | `apps/dwa/components/dropdown-help.tsx` | ✅ | slice 03 |
| 475 | `apps/dwa/components/dropdown-notifications.tsx` | ✅ | slice 03 |
| 476 | `apps/dwa/components/dropdown-profile.tsx` | ✅ | slice 03 |
| 477 | `apps/dwa/components/dropdown-switch.tsx` | ✅ | slice 03 |
| 478 | `apps/dwa/components/edit-menu-card.tsx` | ✅ | slice 03 |
| 479 | `apps/dwa/components/edit-menu.tsx` | ✅ | slice 03 |
| 480 | `apps/dwa/components/error-boundary.tsx` | ✅ | slice 03 |
| 481 | `apps/dwa/components/forms/demo-request-form.tsx` | ✅ | slice 03 |
| 482 | `apps/dwa/components/modal-action.tsx` | ✅ | slice 03 |
| 483 | `apps/dwa/components/modal-basic.tsx` | ✅ | slice 03 |
| 484 | `apps/dwa/components/modal-blank.tsx` | ✅ | slice 03 |
| 485 | `apps/dwa/components/modal-cookies.tsx` | ✅ | slice 03 |
| 486 | `apps/dwa/components/notification.tsx` | ✅ | slice 03 |
| 487 | `apps/dwa/components/pagination-classic.tsx` | ✅ | slice 03 |
| 488 | `apps/dwa/components/pagination-numeric-2.tsx` | ✅ | slice 03 |
| 489 | `apps/dwa/components/pagination-numeric.tsx` | ✅ | slice 03 |
| 490 | `apps/dwa/components/pwa-registration.tsx` | ✅ | slice 03 |
| 491 | `apps/dwa/components/query-provider.tsx` | ✅ | slice 03 |
| 492 | `apps/dwa/components/search-form.test.tsx` | ✅ | slice 03 |
| 493 | `apps/dwa/components/search-form.tsx` | ✅ | slice 03 |
| 494 | `apps/dwa/components/search-modal.tsx` | ✅ | slice 03 |
| 495 | `apps/dwa/components/theme-toggle.tsx` | ✅ | slice 03 |
| 496 | `apps/dwa/components/toast-02.tsx` | ✅ | slice 03 |
| 497 | `apps/dwa/components/toast-03.tsx` | ✅ | slice 03 |
| 498 | `apps/dwa/components/toast.tsx` | ✅ | slice 03 |
| 499 | `apps/dwa/components/tooltip.tsx` | ✅ | slice 03 |
| 500 | `apps/dwa/components/ui/calendar.tsx` | ✅ | slice 03 |
| 501 | `apps/dwa/components/ui/header.test.tsx` | ✅ | slice 03 |
| 502 | `apps/dwa/components/ui/header.tsx` | ✅ | slice 03 |
| 503 | `apps/dwa/components/ui/interactive-checkbox.tsx` | ✅ | slice 03 |
| 504 | `apps/dwa/components/ui/learning-path-timeline.tsx` | ✅ | slice 03 |
| 505 | `apps/dwa/components/ui/logo.test.tsx` | ✅ | slice 03 |
| 506 | `apps/dwa/components/ui/logo.tsx` | ✅ | slice 03 |
| 507 | `apps/dwa/components/ui/popover.tsx` | ✅ | slice 03 |
| 508 | `apps/dwa/components/ui/sidebar-link-group.tsx` | ✅ | slice 03 |
| 509 | `apps/dwa/components/ui/sidebar-link.tsx` | ✅ | slice 03 |
| 510 | `apps/dwa/components/ui/sidebar.test.tsx` | ✅ | slice 03 |
| 511 | `apps/dwa/components/ui/sidebar.tsx` | 🔍 | slice 03 |
| 512 | `apps/dwa/components/utils/use-item-selection.tsx` | ✅ | slice 03 |
| 513 | `apps/dwa/components/utils/use-window-width.tsx` | ✅ | slice 03 |
| 514 | `apps/dwa/components/utils/utils.ts` | ✅ | slice 03 |
| 515 | `apps/dwa/deploy-classifier-with-model.sh` | 🔍 | slice 04 — B-049..B-058 |
| 516 | `apps/dwa/deploy-classifier.sh` | 🔍 | slice 04 — B-049..B-058 |
| 517 | `apps/dwa/docker/minio-compose.yml` | 🔍 | slice 04 — B-049..B-058 |
| 518 | `apps/dwa/docs/5-pillar-refactoring/COURSE_9_BUILD_STATUS.md` | ⏳ | pending |
| 519 | `apps/dwa/docs/5-pillar-refactoring/Course-1-research.md` | ⏳ | pending |
| 520 | `apps/dwa/docs/5-pillar-refactoring/Course-2-workplace-mental-health.md` | ⏳ | pending |
| 521 | `apps/dwa/docs/5-pillar-refactoring/Course-5-research.md` | ⏳ | pending |
| 522 | `apps/dwa/docs/5-pillar-refactoring/Course-6-research.md` | ⏳ | pending |
| 523 | `apps/dwa/docs/5-pillar-refactoring/course-10-research.md` | ⏳ | pending |
| 524 | `apps/dwa/docs/5-pillar-refactoring/course-11-research.md` | ⏳ | pending |
| 525 | `apps/dwa/docs/5-pillar-refactoring/course-12-research.md` | ⏳ | pending |
| 526 | `apps/dwa/docs/5-pillar-refactoring/course-13-research.md` | ⏳ | pending |
| 527 | `apps/dwa/docs/5-pillar-refactoring/course-14-research.md` | ⏳ | pending |
| 528 | `apps/dwa/docs/5-pillar-refactoring/course-15-research.md` | ⏳ | pending |
| 529 | `apps/dwa/docs/5-pillar-refactoring/course-16-research.md` | ⏳ | pending |
| 530 | `apps/dwa/docs/5-pillar-refactoring/course-17-research.md` | ⏳ | pending |
| 531 | `apps/dwa/docs/5-pillar-refactoring/course-18-research.md` | ⏳ | pending |
| 532 | `apps/dwa/docs/5-pillar-refactoring/course-19-research.md` | ⏳ | pending |
| 533 | `apps/dwa/docs/5-pillar-refactoring/course-3-research.md` | ⏳ | pending |
| 534 | `apps/dwa/docs/5-pillar-refactoring/course-4-research.md` | ⏳ | pending |
| 535 | `apps/dwa/docs/5-pillar-refactoring/course-7-lesson-outlines.md` | ⏳ | pending |
| 536 | `apps/dwa/docs/5-pillar-refactoring/course-7-research.md` | ⏳ | pending |
| 537 | `apps/dwa/docs/5-pillar-refactoring/course-8-lesson-outlines-FULL-20.md` | ⏳ | pending |
| 538 | `apps/dwa/docs/5-pillar-refactoring/course-8-lesson-outlines.md` | ⏳ | pending |
| 539 | `apps/dwa/docs/5-pillar-refactoring/course-8-research.md` | ⏳ | pending |
| 540 | `apps/dwa/docs/5-pillar-refactoring/course-9-lesson-outline.md` | ⏳ | pending |
| 541 | `apps/dwa/docs/5-pillar-refactoring/course-9-research.md` | ⏳ | pending |
| 542 | `apps/dwa/docs/ACCOUNT_DELETION_GRACE_PERIOD.md` | ⏳ | pending |
| 543 | `apps/dwa/docs/AI-FLOW-VALIDATION-REPORT.md` | ⏳ | pending |
| 544 | `apps/dwa/docs/ARCHITECTURAL-IMPROVEMENT-PLAN.md` | ⏳ | pending |
| 545 | `apps/dwa/docs/BACKUP-POLICY.md` | ⏳ | pending |
| 546 | `apps/dwa/docs/BETA_LAUNCH_READINESS_REPORT.md` | ⏳ | pending |
| 547 | `apps/dwa/docs/CBT_FUNDAMENTALS_BUILD_REPORT.md` | ⏳ | pending |
| 548 | `apps/dwa/docs/CONTENT-AUDIT-REPORT.md` | ⏳ | pending |
| 549 | `apps/dwa/docs/COURSES_14-16_BUILD_STATUS.md` | ⏳ | pending |
| 550 | `apps/dwa/docs/COURSES_8-10_COMPREHENSIVE_AUDIT.md` | ⏳ | pending |
| 551 | `apps/dwa/docs/COURSES_8-10_DEPLOYMENT_STATUS.md` | ⏳ | pending |
| 552 | `apps/dwa/docs/COURSE_17_BUILD_REPORT.md` | ⏳ | pending |
| 553 | `apps/dwa/docs/COURSE_1_FIXES_APPLIED.md` | ⏳ | pending |
| 554 | `apps/dwa/docs/COURSE_1_FIX_REQUIRED.md` | ⏳ | pending |
| 555 | `apps/dwa/docs/COURSE_1_TEST_REPORT.md` | ⏳ | pending |
| 556 | `apps/dwa/docs/DEPLOY-TO-COOLIFY.md` | ⏳ | pending |
| 557 | `apps/dwa/docs/FUTURE_ENHANCEMENTS.md` | ⏳ | pending |
| 558 | `apps/dwa/docs/IMPLEMENTATION-PLAN-2026-03-25.md` | ⏳ | pending |
| 559 | `apps/dwa/docs/LESSON_CREATION_PROTOCOL.md` | ⏳ | pending |
| 560 | `apps/dwa/docs/LESSON_INTERACTIVITY_PLAYBOOK.md` | ⏳ | pending |
| 561 | `apps/dwa/docs/LOAD-TESTING.md` | ⏳ | pending |
| 562 | `apps/dwa/docs/MIGRATION-GOOGLE-TO-COOLIFY.md` | ⏳ | pending |
| 563 | `apps/dwa/docs/OPTIMIZATION_COURSES_AUDIT_REPORT.md` | ⏳ | pending |
| 564 | `apps/dwa/docs/OPTIMIZATION_COURSES_FINAL_COMPLIANCE_AUDIT.md` | ⏳ | pending |
| 565 | `apps/dwa/docs/OPTIMIZATION_COURSES_FINAL_REPORT.md` | ⏳ | pending |
| 566 | `apps/dwa/docs/OPTIMIZATION_REMEDIATION_PLAN.md` | ⏳ | pending |
| 567 | `apps/dwa/docs/PLATFORM-ARCHITECTURE-AND-FEATURES.md` | ⏳ | pending |
| 568 | `apps/dwa/docs/PRODUCTION-GUIDE.md` | ⏳ | pending |
| 569 | `apps/dwa/docs/PROVIDER-AUDIT-2026-03-25.md` | ⏳ | pending |
| 570 | `apps/dwa/docs/README.md` | ⏳ | pending |
| 571 | `apps/dwa/docs/ROADMAP-9.5-QUALITY.md` | ⏳ | pending |
| 572 | `apps/dwa/docs/ROOT_CAUSE_ANALYSIS_COURSE_QUALITY_ISSUES.md` | ⏳ | pending |
| 573 | `apps/dwa/docs/Revised-curriculum.md` | ⏳ | pending |
| 574 | `apps/dwa/docs/STATE.md` | ⏳ | pending |
| 575 | `apps/dwa/docs/SUCCESSION-BUSINESS-CONTEXT.md` | ⏳ | pending |
| 576 | `apps/dwa/docs/SoloFrameHub Cohort Forum Design: Research Report v2.md` | ⏳ | pending |
| 577 | `apps/dwa/docs/TEST-PLAN.md` | ⏳ | pending |
| 578 | `apps/dwa/docs/TESTING.md` | ⏳ | pending |
| 579 | `apps/dwa/docs/TRANSITION-TARGET.md` | ⏳ | pending |
| 580 | `apps/dwa/docs/TRIGGER-DEPLOYED.md` | ⏳ | pending |
| 581 | `apps/dwa/docs/VPS-REARCHITECTURE.md` | ⏳ | pending |
| 582 | `apps/dwa/docs/_Full-Platform-Capabilities-Plans/00-OVERVIEW.md` | ⏳ | pending |
| 583 | `apps/dwa/docs/_Full-Platform-Capabilities-Plans/01-ARCHITECTURE.md` | ⏳ | pending |
| 584 | `apps/dwa/docs/_Full-Platform-Capabilities-Plans/02-DATABASE-API.md` | ⏳ | pending |
| 585 | `apps/dwa/docs/_Full-Platform-Capabilities-Plans/03-FEATURES.md` | ⏳ | pending |
| 586 | `apps/dwa/docs/_Full-Platform-Capabilities-Plans/04-AI-ML-SYSTEMS.md` | ⏳ | pending |
| 587 | `apps/dwa/docs/_Full-Platform-Capabilities-Plans/05-CONTENT-CURRICULUM.md` | ⏳ | pending |
| 588 | `apps/dwa/docs/_Full-Platform-Capabilities-Plans/06-BUSINESS-LOGIC.md` | ⏳ | pending |
| 589 | `apps/dwa/docs/_Full-Platform-Capabilities-Plans/07-ML-STRATEGY.md` | ⏳ | pending |
| 590 | `apps/dwa/docs/_Full-Platform-Capabilities-Plans/08-ML-RESEARCH-LANDSCAPE.md` | ⏳ | pending |
| 591 | `apps/dwa/docs/_Full-Platform-Capabilities-Plans/Gemini-analysis.md` | ⏳ | pending |
| 592 | `apps/dwa/docs/_Full-Platform-Capabilities-Plans/INDEX.md` | ⏳ | pending |
| 593 | `apps/dwa/docs/_archive/MULTIDIMENSIONAL-TEST-PLAN.md` | ⏳ | pending |
| 594 | `apps/dwa/docs/_archive/QC_CHECKLIST.md` | ⏳ | pending |
| 595 | `apps/dwa/docs/_archive/TESTING-STATUS.md` | ⏳ | pending |
| 596 | `apps/dwa/docs/_archive/legacy-e2e-reports/E2E-FINAL-SUMMARY.md` | ⏳ | pending |
| 597 | `apps/dwa/docs/_archive/legacy-e2e-reports/E2E-OPTION-2-IMPLEMENTATION.md` | ⏳ | pending |
| 598 | `apps/dwa/docs/_archive/legacy-e2e-reports/E2E-ROOT-CAUSE-ANALYSIS.md` | ⏳ | pending |
| 599 | `apps/dwa/docs/_archive/legacy-e2e-reports/E2E-TEST-FIXES-FINAL.md` | ⏳ | pending |
| 600 | `apps/dwa/docs/_archive/legacy-e2e-reports/E2E-TEST-FIXES-STATUS.md` | ⏳ | pending |
| 601 | `apps/dwa/docs/_archive/legacy-e2e-reports/E2E-TEST-FIXES.md` | ⏳ | pending |
| 602 | `apps/dwa/docs/_archive/legacy-e2e-reports/E2E-TEST-REPORT.md` | ⏳ | pending |
| 603 | `apps/dwa/docs/_archive/legacy-e2e-reports/E2E-TEST-RUN-RESULTS.md` | ⏳ | pending |
| 604 | `apps/dwa/docs/_archive/legacy-e2e-reports/E2E-TEST-SUMMARY.md` | ⏳ | pending |
| 605 | `apps/dwa/docs/_archive/legacy-e2e-reports/E2E-TESTING-SUMMARY.md` | ⏳ | pending |
| 606 | `apps/dwa/docs/_archive/legacy-e2e-reports/E2E-TESTING.md` | ⏳ | pending |
| 607 | `apps/dwa/docs/_archive/legacy-e2e-reports/MIGRATION-SUMMARY.md` | ⏳ | pending |
| 608 | `apps/dwa/docs/_archive/legacy-e2e-reports/analyze-test-failures.sh` | ⏳ | pending |
| 609 | `apps/dwa/docs/_archive/scripts_legacy/download-icons.js` | ⏳ | pending |
| 610 | `apps/dwa/docs/_archive/scripts_legacy/migrate-icons.js` | ⏳ | pending |
| 611 | `apps/dwa/docs/_archive/scripts_legacy/public/assets/icons/sprite.svg` | ⏭️ | binary asset |
| 612 | `apps/dwa/docs/_archive/scripts_legacy/validate-quizzes.js` | ⏳ | pending |
| 613 | `apps/dwa/docs/adr/0001-repository-pattern.md` | ⏳ | pending |
| 614 | `apps/dwa/docs/adr/0002-redis-rate-limiting.md` | ⏳ | pending |
| 615 | `apps/dwa/docs/antigravity-platform-page-improvements.md` | ⏳ | pending |
| 616 | `apps/dwa/docs/archive/2026-Q1/2026-01-03-ARTIFACT-DIRECTORY.md` | ⏳ | pending |
| 617 | `apps/dwa/docs/archive/2026-Q1/2026-01-03-E2E-AUDIT.md` | ⏳ | pending |
| 618 | `apps/dwa/docs/archive/2026-Q1/2026-01-03-E2E-VERIFICATION-REPORT.md` | ⏳ | pending |
| 619 | `apps/dwa/docs/archive/2026-Q1/2026-01-03-IMPLEMENTATION-PLAN.md` | ⏳ | pending |
| 620 | `apps/dwa/docs/archive/2026-Q1/2026-01-03-MISSING-TESTIDS.md` | ⏳ | pending |
| 621 | `apps/dwa/docs/archive/2026-Q1/2026-01-03-MOSAIC-SELECTORS.md` | ⏳ | pending |
| 622 | `apps/dwa/docs/archive/2026-Q1/2026-01-03-ROUTE-MAP.md` | ⏳ | pending |
| 623 | `apps/dwa/docs/archive/2026-Q1/2026-01-03-TEST-STATUS-DASHBOARD.md` | ⏳ | pending |
| 624 | `apps/dwa/docs/archive/2026-Q1/2026-01-03-WALKTHROUGH.md` | ⏳ | pending |
| 625 | `apps/dwa/docs/archive/2026-Q1/AI_System_Architecture.md` | ⏳ | pending |
| 626 | `apps/dwa/docs/archive/2026-Q1/API.md` | ⏳ | pending |
| 627 | `apps/dwa/docs/archive/2026-Q1/ARCHITECTURE.md` | ⏳ | pending |
| 628 | `apps/dwa/docs/archive/2026-Q1/COURSES_17-19_FINAL_QA_REPORT.md` | ⏳ | pending |
| 629 | `apps/dwa/docs/archive/2026-Q1/COURSES_9-10_FINAL_QA_REPORT.md` | ⏳ | pending |
| 630 | `apps/dwa/docs/archive/2026-Q1/COURSE_11_QA_REPORT.md` | ⏳ | pending |
| 631 | `apps/dwa/docs/archive/2026-Q1/COURSE_12_QA_REPORT.md` | ⏳ | pending |
| 632 | `apps/dwa/docs/archive/2026-Q1/COURSE_13_QA_REPORT.md` | ⏳ | pending |
| 633 | `apps/dwa/docs/archive/2026-Q1/COURSE_15_QA_REPORT.md` | ⏳ | pending |
| 634 | `apps/dwa/docs/archive/2026-Q1/COURSE_16_QA_REPORT.md` | ⏳ | pending |
| 635 | `apps/dwa/docs/archive/2026-Q1/COURSE_18_QA_REPORT.md` | ⏳ | pending |
| 636 | `apps/dwa/docs/archive/2026-Q1/COURSE_19_QA_REPORT.md` | ⏳ | pending |
| 637 | `apps/dwa/docs/archive/2026-Q1/COURSE_4_QA_REPORT.md` | ⏳ | pending |
| 638 | `apps/dwa/docs/archive/2026-Q1/COURSE_8_QA_REPORT.md` | ⏳ | pending |
| 639 | `apps/dwa/docs/archive/2026-Q1/PLATFORM-ANALYSIS.md` | ⏳ | pending |
| 640 | `apps/dwa/docs/archive/2026-Q1/README-stale-solo-frame-hub.md` | ⏳ | pending |
| 641 | `apps/dwa/docs/continuation_prompt.md` | ⏳ | pending |
| 642 | `apps/dwa/docs/course-creation-context-and-prompts/course-context-fles/00-QUICK-START.md` | ⏳ | pending |
| 643 | `apps/dwa/docs/course-creation-context-and-prompts/course-context-fles/01-TECHNICAL-ARCHITECTURE.md` | ⏳ | pending |
| 644 | `apps/dwa/docs/course-creation-context-and-prompts/course-context-fles/02-DESIGN-SYSTEM.md` | ⏳ | pending |
| 645 | `apps/dwa/docs/course-creation-context-and-prompts/course-context-fles/03-DATABASE-SCHEMA.md` | ⏳ | pending |
| 646 | `apps/dwa/docs/course-creation-context-and-prompts/course-context-fles/04-MODULE-ARCHITECTURE.md` | ⏳ | pending |
| 647 | `apps/dwa/docs/course-creation-context-and-prompts/course-context-fles/05-AI-FLOWS-LIBRARY.md` | ⏳ | pending |
| 648 | `apps/dwa/docs/course-creation-context-and-prompts/course-context-fles/06-INTERACTIVE-COMPONENTS.md` | ⏳ | pending |
| 649 | `apps/dwa/docs/course-creation-context-and-prompts/course-context-fles/07-PEDAGOGICAL-PATTERNS.md` | ⏳ | pending |
| 650 | `apps/dwa/docs/course-creation-context-and-prompts/course-context-fles/08-CURSOR-PROMPTS.md` | ⏳ | pending |
| 651 | `apps/dwa/docs/course-creation-context-and-prompts/course-context-fles/09-CONTENT-GENERATION.md` | ⏳ | pending |
| 652 | `apps/dwa/docs/course-creation-context-and-prompts/course-context-fles/10-GAMIFICATION-SYSTEM.md` | ⏳ | pending |
| 653 | `apps/dwa/docs/course-creation-context-and-prompts/course-context-fles/11-DEPLOYMENT-GUIDE.md` | ⏳ | pending |
| 654 | `apps/dwa/docs/course-creation-context-and-prompts/course-context-fles/Bootstrap Marketing curriculum for solo technical founders.md` | ⏳ | pending |
| 655 | `apps/dwa/docs/course_migration_guide.md` | ⏳ | pending |
| 656 | `apps/dwa/docs/creator-economy-gap-analysis.md` | ⏳ | pending |
| 657 | `apps/dwa/docs/development-guide.md` | ⏳ | pending |
| 658 | `apps/dwa/docs/error-log.md` | ⏳ | pending |
| 659 | `apps/dwa/docs/forum-implementation.md` | ⏳ | pending |
| 660 | `apps/dwa/docs/gamma-scripts.md` | ⏳ | pending |
| 661 | `apps/dwa/docs/gemini-model-comparison.md` | ⏳ | pending |
| 662 | `apps/dwa/docs/images/human silhouette SVG.svg` | ⏭️ | binary asset |
| 663 | `apps/dwa/docs/images/human-silhouette.svg` | ⏭️ | binary asset |
| 664 | `apps/dwa/docs/index.html` | ⏳ | pending |
| 665 | `apps/dwa/docs/interactive-reference.md` | ⏳ | pending |
| 666 | `apps/dwa/docs/june-2025-leads.csv` | ⏳ | pending |
| 667 | `apps/dwa/docs/mosaic-next/.gitignore` | ⏳ | pending |
| 668 | `apps/dwa/docs/mosaic-next/CHANGELOG.md` | ⏳ | pending |
| 669 | `apps/dwa/docs/mosaic-next/README.md` | ⏳ | pending |
| 670 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/accordion/page.tsx` | ⏳ | pending |
| 671 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/alert/banners-01.tsx` | ⏳ | pending |
| 672 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/alert/banners-02.tsx` | ⏳ | pending |
| 673 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/alert/notifications.tsx` | ⏳ | pending |
| 674 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/alert/page.tsx` | ⏳ | pending |
| 675 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/alert/toasts-01.tsx` | ⏳ | pending |
| 676 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/alert/toasts-02.tsx` | ⏳ | pending |
| 677 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/alert/toasts-03.tsx` | ⏳ | pending |
| 678 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/avatar/page.tsx` | ⏳ | pending |
| 679 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/badge/page.tsx` | ⏳ | pending |
| 680 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/breadcrumb/page.tsx` | ⏳ | pending |
| 681 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/button/page.tsx` | ⏳ | pending |
| 682 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/dropdown/page.tsx` | ⏳ | pending |
| 683 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/form/form-switches.tsx` | ⏳ | pending |
| 684 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/form/page.tsx` | ⏳ | pending |
| 685 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/icons/page.tsx` | ⏳ | pending |
| 686 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/modal/basic-examples.tsx` | ⏳ | pending |
| 687 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/modal/feedback-examples.tsx` | ⏳ | pending |
| 688 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/modal/page.tsx` | ⏳ | pending |
| 689 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/modal/product-examples.tsx` | ⏳ | pending |
| 690 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/pagination/page.tsx` | ⏳ | pending |
| 691 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/tabs/page.tsx` | ⏳ | pending |
| 692 | `apps/dwa/docs/mosaic-next/app/(alternative)/components-library/tooltip/page.tsx` | ⏳ | pending |
| 693 | `apps/dwa/docs/mosaic-next/app/(alternative)/finance/cards/page.tsx` | ⏳ | pending |
| 694 | `apps/dwa/docs/mosaic-next/app/(alternative)/finance/transactions/page.tsx` | ⏳ | pending |
| 695 | `apps/dwa/docs/mosaic-next/app/(alternative)/finance/transactions/transaction-context.tsx` | ⏳ | pending |
| 696 | `apps/dwa/docs/mosaic-next/app/(alternative)/finance/transactions/transaction-dropdown.tsx` | ⏳ | pending |
| 697 | `apps/dwa/docs/mosaic-next/app/(alternative)/finance/transactions/transaction-panel.tsx` | ⏳ | pending |
| 698 | `apps/dwa/docs/mosaic-next/app/(alternative)/finance/transactions/transactions-properties.tsx` | ⏳ | pending |
| 699 | `apps/dwa/docs/mosaic-next/app/(alternative)/finance/transactions/transactions-table-item.tsx` | ⏳ | pending |
| 700 | `apps/dwa/docs/mosaic-next/app/(alternative)/finance/transactions/transactions-table.tsx` | ⏳ | pending |
| 701 | `apps/dwa/docs/mosaic-next/app/(alternative)/layout.tsx` | ⏳ | pending |
| 702 | `apps/dwa/docs/mosaic-next/app/(alternative)/utility/404/page.tsx` | ⏳ | pending |
| 703 | `apps/dwa/docs/mosaic-next/app/(alternative)/utility/changelog/page.tsx` | ⏳ | pending |
| 704 | `apps/dwa/docs/mosaic-next/app/(alternative)/utility/empty-state/page.tsx` | ⏳ | pending |
| 705 | `apps/dwa/docs/mosaic-next/app/(alternative)/utility/faqs/page.tsx` | ⏳ | pending |
| 706 | `apps/dwa/docs/mosaic-next/app/(alternative)/utility/roadmap/page.tsx` | ⏳ | pending |
| 707 | `apps/dwa/docs/mosaic-next/app/(auth)/auth-header.tsx` | ⏳ | pending |
| 708 | `apps/dwa/docs/mosaic-next/app/(auth)/auth-image.tsx` | ⏳ | pending |
| 709 | `apps/dwa/docs/mosaic-next/app/(auth)/reset-password/page.tsx` | ⏳ | pending |
| 710 | `apps/dwa/docs/mosaic-next/app/(auth)/signin/page.tsx` | ⏳ | pending |
| 711 | `apps/dwa/docs/mosaic-next/app/(auth)/signup/page.tsx` | ⏳ | pending |
| 712 | `apps/dwa/docs/mosaic-next/app/(default)/calendar/calendar-context.tsx` | ⏳ | pending |
| 713 | `apps/dwa/docs/mosaic-next/app/(default)/calendar/calendar-navigation.tsx` | ⏳ | pending |
| 714 | `apps/dwa/docs/mosaic-next/app/(default)/calendar/calendar-properties.tsx` | ⏳ | pending |
| 715 | `apps/dwa/docs/mosaic-next/app/(default)/calendar/calendar-table.tsx` | ⏳ | pending |
| 716 | `apps/dwa/docs/mosaic-next/app/(default)/calendar/page.tsx` | ⏳ | pending |
| 717 | `apps/dwa/docs/mosaic-next/app/(default)/calendar/title.tsx` | ⏳ | pending |
| 718 | `apps/dwa/docs/mosaic-next/app/(default)/campaigns/campaign-card.tsx` | ⏳ | pending |
| 719 | `apps/dwa/docs/mosaic-next/app/(default)/campaigns/campaigns-properties.tsx` | ⏳ | pending |
| 720 | `apps/dwa/docs/mosaic-next/app/(default)/campaigns/page.tsx` | ⏳ | pending |
| 721 | `apps/dwa/docs/mosaic-next/app/(default)/community/feed/feed-left-content.tsx` | ⏳ | pending |
| 722 | `apps/dwa/docs/mosaic-next/app/(default)/community/feed/feed-posts.tsx` | ⏳ | pending |
| 723 | `apps/dwa/docs/mosaic-next/app/(default)/community/feed/feed-right-content.tsx` | ⏳ | pending |
| 724 | `apps/dwa/docs/mosaic-next/app/(default)/community/feed/page.tsx` | ⏳ | pending |
| 725 | `apps/dwa/docs/mosaic-next/app/(default)/community/forum/forum-entries.tsx` | ⏳ | pending |
| 726 | `apps/dwa/docs/mosaic-next/app/(default)/community/forum/forum-left-content.tsx` | ⏳ | pending |
| 727 | `apps/dwa/docs/mosaic-next/app/(default)/community/forum/forum-right-content.tsx` | ⏳ | pending |
| 728 | `apps/dwa/docs/mosaic-next/app/(default)/community/forum/page.tsx` | ⏳ | pending |
| 729 | `apps/dwa/docs/mosaic-next/app/(default)/community/forum/post/forum-entry.tsx` | ⏳ | pending |
| 730 | `apps/dwa/docs/mosaic-next/app/(default)/community/forum/post/forum-post-right-content.tsx` | ⏳ | pending |
| 731 | `apps/dwa/docs/mosaic-next/app/(default)/community/forum/post/page.tsx` | ⏳ | pending |
| 732 | `apps/dwa/docs/mosaic-next/app/(default)/community/meetups/meetups-posts.tsx` | ⏳ | pending |
| 733 | `apps/dwa/docs/mosaic-next/app/(default)/community/meetups/page.tsx` | ⏳ | pending |
| 734 | `apps/dwa/docs/mosaic-next/app/(default)/community/meetups/post/page.tsx` | ⏳ | pending |
| 735 | `apps/dwa/docs/mosaic-next/app/(default)/community/tab-card.tsx` | ⏳ | pending |
| 736 | `apps/dwa/docs/mosaic-next/app/(default)/community/tile-card.tsx` | ⏳ | pending |
| 737 | `apps/dwa/docs/mosaic-next/app/(default)/community/users-tabs/page.tsx` | ⏳ | pending |
| 738 | `apps/dwa/docs/mosaic-next/app/(default)/community/users-tiles/page.tsx` | ⏳ | pending |
| 739 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-01.tsx` | ⏳ | pending |
| 740 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-02.tsx` | ⏳ | pending |
| 741 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-03.tsx` | ⏳ | pending |
| 742 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-04.tsx` | ⏳ | pending |
| 743 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-05.tsx` | ⏳ | pending |
| 744 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-06.tsx` | ⏳ | pending |
| 745 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-07.tsx` | ⏳ | pending |
| 746 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-08.tsx` | ⏳ | pending |
| 747 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-09.tsx` | ⏳ | pending |
| 748 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-10.tsx` | ⏳ | pending |
| 749 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-11.tsx` | ⏳ | pending |
| 750 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/analytics/page.tsx` | ⏳ | pending |
| 751 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/dashboard-card-01.tsx` | ⏳ | pending |
| 752 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/dashboard-card-02.tsx` | ⏳ | pending |
| 753 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/dashboard-card-03.tsx` | ⏳ | pending |
| 754 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/dashboard-card-04.tsx` | ⏳ | pending |
| 755 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/dashboard-card-05.tsx` | ⏳ | pending |
| 756 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/dashboard-card-06.tsx` | ⏳ | pending |
| 757 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/dashboard-card-07.tsx` | ⏳ | pending |
| 758 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/dashboard-card-08.tsx` | ⏳ | pending |
| 759 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/dashboard-card-09.tsx` | ⏳ | pending |
| 760 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/dashboard-card-10.tsx` | ⏳ | pending |
| 761 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/dashboard-card-11.tsx` | ⏳ | pending |
| 762 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-01.tsx` | ⏳ | pending |
| 763 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-02.tsx` | ⏳ | pending |
| 764 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-03.tsx` | ⏳ | pending |
| 765 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-04.tsx` | ⏳ | pending |
| 766 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-05.tsx` | ⏳ | pending |
| 767 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-06.tsx` | ⏳ | pending |
| 768 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-07.tsx` | ⏳ | pending |
| 769 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-08.tsx` | ⏳ | pending |
| 770 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-09.tsx` | ⏳ | pending |
| 771 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-10.tsx` | ⏳ | pending |
| 772 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-11.tsx` | ⏳ | pending |
| 773 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-12.tsx` | ⏳ | pending |
| 774 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-13.tsx` | ⏳ | pending |
| 775 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-14.tsx` | ⏳ | pending |
| 776 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/fintech/fintech-intro.tsx` | ⏳ | pending |
| 777 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/fintech/page.tsx` | ⏳ | pending |
| 778 | `apps/dwa/docs/mosaic-next/app/(default)/dashboard/page.tsx` | ⏳ | pending |
| 779 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/(cart)/cart-2/page.tsx` | ⏳ | pending |
| 780 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/(cart)/cart-3/page.tsx` | ⏳ | pending |
| 781 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/(cart)/cart-items.tsx` | ⏳ | pending |
| 782 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/(cart)/cart/page.tsx` | ⏳ | pending |
| 783 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-2/page.tsx` | ⏳ | pending |
| 784 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-cards-01.tsx` | ⏳ | pending |
| 785 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-cards-02.tsx` | ⏳ | pending |
| 786 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-cards-03.tsx` | ⏳ | pending |
| 787 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-cards-04.tsx` | ⏳ | pending |
| 788 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-cards-05.tsx` | ⏳ | pending |
| 789 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-cards-06.tsx` | ⏳ | pending |
| 790 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-cards-07.tsx` | ⏳ | pending |
| 791 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-sidebar.tsx` | ⏳ | pending |
| 792 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/(shop)/shop/page.tsx` | ⏳ | pending |
| 793 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/customers/customers-table-item.tsx` | ⏳ | pending |
| 794 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/customers/customers-table.tsx` | ⏳ | pending |
| 795 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/customers/page.tsx` | ⏳ | pending |
| 796 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/invoices/invoices-properties.tsx` | ⏳ | pending |
| 797 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/invoices/invoices-table-item.tsx` | ⏳ | pending |
| 798 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/invoices/invoices-table.tsx` | ⏳ | pending |
| 799 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/invoices/page.tsx` | ⏳ | pending |
| 800 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/orders/orders-properties.tsx` | ⏳ | pending |
| 801 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/orders/orders-table-item.tsx` | ⏳ | pending |
| 802 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/orders/orders-table.tsx` | ⏳ | pending |
| 803 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/orders/page.tsx` | ⏳ | pending |
| 804 | `apps/dwa/docs/mosaic-next/app/(default)/ecommerce/product/page.tsx` | ⏳ | pending |
| 805 | `apps/dwa/docs/mosaic-next/app/(default)/jobs/company/page.tsx` | ⏳ | pending |
| 806 | `apps/dwa/docs/mosaic-next/app/(default)/jobs/jobs-item.tsx` | ⏳ | pending |
| 807 | `apps/dwa/docs/mosaic-next/app/(default)/jobs/jobs-sidebar.tsx` | ⏳ | pending |
| 808 | `apps/dwa/docs/mosaic-next/app/(default)/jobs/page.tsx` | ⏳ | pending |
| 809 | `apps/dwa/docs/mosaic-next/app/(default)/jobs/post/page.tsx` | ⏳ | pending |
| 810 | `apps/dwa/docs/mosaic-next/app/(default)/jobs/sort-dropdown.tsx` | ⏳ | pending |
| 811 | `apps/dwa/docs/mosaic-next/app/(default)/layout.tsx` | ⏳ | pending |
| 812 | `apps/dwa/docs/mosaic-next/app/(default)/settings/account/account-panel.tsx` | ⏳ | pending |
| 813 | `apps/dwa/docs/mosaic-next/app/(default)/settings/account/page.tsx` | ⏳ | pending |
| 814 | `apps/dwa/docs/mosaic-next/app/(default)/settings/apps/apps-panel.tsx` | ⏳ | pending |
| 815 | `apps/dwa/docs/mosaic-next/app/(default)/settings/apps/page.tsx` | ⏳ | pending |
| 816 | `apps/dwa/docs/mosaic-next/app/(default)/settings/billing/billing-panel.tsx` | ⏳ | pending |
| 817 | `apps/dwa/docs/mosaic-next/app/(default)/settings/billing/page.tsx` | ⏳ | pending |
| 818 | `apps/dwa/docs/mosaic-next/app/(default)/settings/feedback/feedback-panel.tsx` | ⏳ | pending |
| 819 | `apps/dwa/docs/mosaic-next/app/(default)/settings/feedback/page.tsx` | ⏳ | pending |
| 820 | `apps/dwa/docs/mosaic-next/app/(default)/settings/notifications/notifications-panel.tsx` | ⏳ | pending |
| 821 | `apps/dwa/docs/mosaic-next/app/(default)/settings/notifications/page.tsx` | ⏳ | pending |
| 822 | `apps/dwa/docs/mosaic-next/app/(default)/settings/plans/page.tsx` | ⏳ | pending |
| 823 | `apps/dwa/docs/mosaic-next/app/(default)/settings/plans/plans-panel.tsx` | ⏳ | pending |
| 824 | `apps/dwa/docs/mosaic-next/app/(default)/settings/settings-sidebar.tsx` | ⏳ | pending |
| 825 | `apps/dwa/docs/mosaic-next/app/(default)/tasks/kanban/page.tsx` | ⏳ | pending |
| 826 | `apps/dwa/docs/mosaic-next/app/(default)/tasks/kanban/task-01.tsx` | ⏳ | pending |
| 827 | `apps/dwa/docs/mosaic-next/app/(default)/tasks/kanban/task-02.tsx` | ⏳ | pending |
| 828 | `apps/dwa/docs/mosaic-next/app/(default)/tasks/kanban/task-03.tsx` | ⏳ | pending |
| 829 | `apps/dwa/docs/mosaic-next/app/(default)/tasks/kanban/task-04.tsx` | ⏳ | pending |
| 830 | `apps/dwa/docs/mosaic-next/app/(default)/tasks/kanban/task-05.tsx` | ⏳ | pending |
| 831 | `apps/dwa/docs/mosaic-next/app/(default)/tasks/kanban/task-06.tsx` | ⏳ | pending |
| 832 | `apps/dwa/docs/mosaic-next/app/(default)/tasks/kanban/task-07.tsx` | ⏳ | pending |
| 833 | `apps/dwa/docs/mosaic-next/app/(default)/tasks/kanban/task-08.tsx` | ⏳ | pending |
| 834 | `apps/dwa/docs/mosaic-next/app/(default)/tasks/kanban/task-09.tsx` | ⏳ | pending |
| 835 | `apps/dwa/docs/mosaic-next/app/(default)/tasks/kanban/tasks-groups.tsx` | ⏳ | pending |
| 836 | `apps/dwa/docs/mosaic-next/app/(default)/tasks/list/page.tsx` | ⏳ | pending |
| 837 | `apps/dwa/docs/mosaic-next/app/(double-sidebar)/community/profile/page.tsx` | ⏳ | pending |
| 838 | `apps/dwa/docs/mosaic-next/app/(double-sidebar)/community/profile/profile-body.tsx` | ⏳ | pending |
| 839 | `apps/dwa/docs/mosaic-next/app/(double-sidebar)/community/profile/profile-sidebar.tsx` | ⏳ | pending |
| 840 | `apps/dwa/docs/mosaic-next/app/(double-sidebar)/inbox/inbox-body.tsx` | ⏳ | pending |
| 841 | `apps/dwa/docs/mosaic-next/app/(double-sidebar)/inbox/inbox-sidebar.tsx` | ⏳ | pending |
| 842 | `apps/dwa/docs/mosaic-next/app/(double-sidebar)/inbox/mail-item.tsx` | ⏳ | pending |
| 843 | `apps/dwa/docs/mosaic-next/app/(double-sidebar)/inbox/page.tsx` | ⏳ | pending |
| 844 | `apps/dwa/docs/mosaic-next/app/(double-sidebar)/layout.tsx` | ⏳ | pending |
| 845 | `apps/dwa/docs/mosaic-next/app/(double-sidebar)/messages/channels.tsx` | ⏳ | pending |
| 846 | `apps/dwa/docs/mosaic-next/app/(double-sidebar)/messages/direct-messages.tsx` | ⏳ | pending |
| 847 | `apps/dwa/docs/mosaic-next/app/(double-sidebar)/messages/messages-body.tsx` | ⏳ | pending |
| 848 | `apps/dwa/docs/mosaic-next/app/(double-sidebar)/messages/messages-chat.tsx` | ⏳ | pending |
| 849 | `apps/dwa/docs/mosaic-next/app/(double-sidebar)/messages/messages-footer.tsx` | ⏳ | pending |
| 850 | `apps/dwa/docs/mosaic-next/app/(double-sidebar)/messages/messages-header.tsx` | ⏳ | pending |
| 851 | `apps/dwa/docs/mosaic-next/app/(double-sidebar)/messages/messages-sidebar.tsx` | ⏳ | pending |
| 852 | `apps/dwa/docs/mosaic-next/app/(double-sidebar)/messages/page.tsx` | ⏳ | pending |
| 853 | `apps/dwa/docs/mosaic-next/app/(onboarding)/onboarding-01/page.tsx` | ⏳ | pending |
| 854 | `apps/dwa/docs/mosaic-next/app/(onboarding)/onboarding-02/page.tsx` | ⏳ | pending |
| 855 | `apps/dwa/docs/mosaic-next/app/(onboarding)/onboarding-03/page.tsx` | ⏳ | pending |
| 856 | `apps/dwa/docs/mosaic-next/app/(onboarding)/onboarding-04/page.tsx` | ⏳ | pending |
| 857 | `apps/dwa/docs/mosaic-next/app/(onboarding)/onboarding-header.tsx` | ⏳ | pending |
| 858 | `apps/dwa/docs/mosaic-next/app/(onboarding)/onboarding-image.tsx` | ⏳ | pending |
| 859 | `apps/dwa/docs/mosaic-next/app/(onboarding)/onboarding-progress.tsx` | ⏳ | pending |
| 860 | `apps/dwa/docs/mosaic-next/app/(pay)/ecommerce/pay/page.tsx` | ⏳ | pending |
| 861 | `apps/dwa/docs/mosaic-next/app/(pay)/ecommerce/pay/pay-form.tsx` | ⏳ | pending |
| 862 | `apps/dwa/docs/mosaic-next/app/api/hello/route.ts` | ⏳ | pending |
| 863 | `apps/dwa/docs/mosaic-next/app/app-provider.tsx` | ⏳ | pending |
| 864 | `apps/dwa/docs/mosaic-next/app/css/additional-styles/utility-patterns.css` | ⏳ | pending |
| 865 | `apps/dwa/docs/mosaic-next/app/css/style.css` | ⏳ | pending |
| 866 | `apps/dwa/docs/mosaic-next/app/flyout-context.tsx` | ⏳ | pending |
| 867 | `apps/dwa/docs/mosaic-next/app/layout.tsx` | ⏳ | pending |
| 868 | `apps/dwa/docs/mosaic-next/app/not-found.tsx` | ⏳ | pending |
| 869 | `apps/dwa/docs/mosaic-next/app/page.tsx` | ⏳ | pending |
| 870 | `apps/dwa/docs/mosaic-next/app/selected-items-context.tsx` | ⏳ | pending |
| 871 | `apps/dwa/docs/mosaic-next/app/theme-provider.tsx` | ⏳ | pending |
| 872 | `apps/dwa/docs/mosaic-next/assets/soloframeHubLogo.png` | ⏭️ | binary asset |
| 873 | `apps/dwa/docs/mosaic-next/components/accordion-basic.tsx` | ⏳ | pending |
| 874 | `apps/dwa/docs/mosaic-next/components/accordion-table-item.tsx` | ⏳ | pending |
| 875 | `apps/dwa/docs/mosaic-next/components/accordion-table-rich-item.tsx` | ⏳ | pending |
| 876 | `apps/dwa/docs/mosaic-next/components/banner-02.tsx` | ⏳ | pending |
| 877 | `apps/dwa/docs/mosaic-next/components/banner.tsx` | ⏳ | pending |
| 878 | `apps/dwa/docs/mosaic-next/components/channel-menu.tsx` | ⏳ | pending |
| 879 | `apps/dwa/docs/mosaic-next/components/charts/bar-chart-01.tsx` | ⏳ | pending |
| 880 | `apps/dwa/docs/mosaic-next/components/charts/bar-chart-02.tsx` | ⏳ | pending |
| 881 | `apps/dwa/docs/mosaic-next/components/charts/bar-chart-03.tsx` | ⏳ | pending |
| 882 | `apps/dwa/docs/mosaic-next/components/charts/bar-chart-04.tsx` | ⏳ | pending |
| 883 | `apps/dwa/docs/mosaic-next/components/charts/bar-chart-05.tsx` | ⏳ | pending |
| 884 | `apps/dwa/docs/mosaic-next/components/charts/bar-chart-06.tsx` | ⏳ | pending |
| 885 | `apps/dwa/docs/mosaic-next/components/charts/chartjs-config.tsx` | ⏳ | pending |
| 886 | `apps/dwa/docs/mosaic-next/components/charts/doughnut-chart.tsx` | ⏳ | pending |
| 887 | `apps/dwa/docs/mosaic-next/components/charts/line-chart-01.tsx` | ⏳ | pending |
| 888 | `apps/dwa/docs/mosaic-next/components/charts/line-chart-02.tsx` | ⏳ | pending |
| 889 | `apps/dwa/docs/mosaic-next/components/charts/line-chart-03.tsx` | ⏳ | pending |
| 890 | `apps/dwa/docs/mosaic-next/components/charts/line-chart-04.tsx` | ⏳ | pending |
| 891 | `apps/dwa/docs/mosaic-next/components/charts/line-chart-05.tsx` | ⏳ | pending |
| 892 | `apps/dwa/docs/mosaic-next/components/charts/line-chart-06.tsx` | ⏳ | pending |
| 893 | `apps/dwa/docs/mosaic-next/components/charts/line-chart-07.tsx` | ⏳ | pending |
| 894 | `apps/dwa/docs/mosaic-next/components/charts/line-chart-08.tsx` | ⏳ | pending |
| 895 | `apps/dwa/docs/mosaic-next/components/charts/line-chart-09.tsx` | ⏳ | pending |
| 896 | `apps/dwa/docs/mosaic-next/components/charts/pie-chart.tsx` | ⏳ | pending |
| 897 | `apps/dwa/docs/mosaic-next/components/charts/polar-chart.tsx` | ⏳ | pending |
| 898 | `apps/dwa/docs/mosaic-next/components/charts/realtime-chart.tsx` | ⏳ | pending |
| 899 | `apps/dwa/docs/mosaic-next/components/date-select.tsx` | ⏳ | pending |
| 900 | `apps/dwa/docs/mosaic-next/components/datepicker.tsx` | ⏳ | pending |
| 901 | `apps/dwa/docs/mosaic-next/components/delete-button.tsx` | ⏳ | pending |
| 902 | `apps/dwa/docs/mosaic-next/components/dropdown-filter.tsx` | ⏳ | pending |
| 903 | `apps/dwa/docs/mosaic-next/components/dropdown-full.tsx` | ⏳ | pending |
| 904 | `apps/dwa/docs/mosaic-next/components/dropdown-help.tsx` | ⏳ | pending |
| 905 | `apps/dwa/docs/mosaic-next/components/dropdown-notifications.tsx` | ⏳ | pending |
| 906 | `apps/dwa/docs/mosaic-next/components/dropdown-profile.tsx` | ⏳ | pending |
| 907 | `apps/dwa/docs/mosaic-next/components/dropdown-switch.tsx` | ⏳ | pending |
| 908 | `apps/dwa/docs/mosaic-next/components/edit-menu-card.tsx` | ⏳ | pending |
| 909 | `apps/dwa/docs/mosaic-next/components/edit-menu.tsx` | ⏳ | pending |
| 910 | `apps/dwa/docs/mosaic-next/components/modal-action.tsx` | ⏳ | pending |
| 911 | `apps/dwa/docs/mosaic-next/components/modal-basic.tsx` | ⏳ | pending |
| 912 | `apps/dwa/docs/mosaic-next/components/modal-blank.tsx` | ⏳ | pending |
| 913 | `apps/dwa/docs/mosaic-next/components/modal-cookies.tsx` | ⏳ | pending |
| 914 | `apps/dwa/docs/mosaic-next/components/notification.tsx` | ⏳ | pending |
| 915 | `apps/dwa/docs/mosaic-next/components/pagination-classic.tsx` | ⏳ | pending |
| 916 | `apps/dwa/docs/mosaic-next/components/pagination-numeric-2.tsx` | ⏳ | pending |
| 917 | `apps/dwa/docs/mosaic-next/components/pagination-numeric.tsx` | ⏳ | pending |
| 918 | `apps/dwa/docs/mosaic-next/components/search-form.tsx` | ⏳ | pending |
| 919 | `apps/dwa/docs/mosaic-next/components/search-modal.tsx` | ⏳ | pending |
| 920 | `apps/dwa/docs/mosaic-next/components/theme-toggle.tsx` | ⏳ | pending |
| 921 | `apps/dwa/docs/mosaic-next/components/toast-02.tsx` | ⏳ | pending |
| 922 | `apps/dwa/docs/mosaic-next/components/toast-03.tsx` | ⏳ | pending |
| 923 | `apps/dwa/docs/mosaic-next/components/toast.tsx` | ⏳ | pending |
| 924 | `apps/dwa/docs/mosaic-next/components/tooltip.tsx` | ⏳ | pending |
| 925 | `apps/dwa/docs/mosaic-next/components/ui/calendar.tsx` | ⏳ | pending |
| 926 | `apps/dwa/docs/mosaic-next/components/ui/header.tsx` | ⏳ | pending |
| 927 | `apps/dwa/docs/mosaic-next/components/ui/logo.tsx` | ⏳ | pending |
| 928 | `apps/dwa/docs/mosaic-next/components/ui/popover.tsx` | ⏳ | pending |
| 929 | `apps/dwa/docs/mosaic-next/components/ui/sidebar-link-group.tsx` | ⏳ | pending |
| 930 | `apps/dwa/docs/mosaic-next/components/ui/sidebar-link.tsx` | ⏳ | pending |
| 931 | `apps/dwa/docs/mosaic-next/components/ui/sidebar.tsx` | ⏳ | pending |
| 932 | `apps/dwa/docs/mosaic-next/components/utils/use-item-selection.tsx` | ⏳ | pending |
| 933 | `apps/dwa/docs/mosaic-next/components/utils/use-window-width.tsx` | ⏳ | pending |
| 934 | `apps/dwa/docs/mosaic-next/components/utils/utils.ts` | ⏳ | pending |
| 935 | `apps/dwa/docs/mosaic-next/lib/utils.ts` | ⏳ | pending |
| 936 | `apps/dwa/docs/mosaic-next/next.config.js` | ⏳ | pending |
| 937 | `apps/dwa/docs/mosaic-next/package.json` | ⏳ | pending |
| 938 | `apps/dwa/docs/mosaic-next/postcss.config.js` | ⏳ | pending |
| 939 | `apps/dwa/docs/mosaic-next/public/favicon.ico` | ⏭️ | binary asset |
| 940 | `apps/dwa/docs/mosaic-next/public/images/404-illustration-dark.svg` | ⏭️ | binary asset |
| 941 | `apps/dwa/docs/mosaic-next/public/images/404-illustration.svg` | ⏭️ | binary asset |
| 942 | `apps/dwa/docs/mosaic-next/public/images/announcement-icon.svg` | ⏭️ | binary asset |
| 943 | `apps/dwa/docs/mosaic-next/public/images/applications-image-01.jpg` | ⏭️ | binary asset |
| 944 | `apps/dwa/docs/mosaic-next/public/images/applications-image-02.jpg` | ⏭️ | binary asset |
| 945 | `apps/dwa/docs/mosaic-next/public/images/applications-image-03.jpg` | ⏭️ | binary asset |
| 946 | `apps/dwa/docs/mosaic-next/public/images/applications-image-04.jpg` | ⏭️ | binary asset |
| 947 | `apps/dwa/docs/mosaic-next/public/images/applications-image-05.jpg` | ⏭️ | binary asset |
| 948 | `apps/dwa/docs/mosaic-next/public/images/applications-image-06.jpg` | ⏭️ | binary asset |
| 949 | `apps/dwa/docs/mosaic-next/public/images/applications-image-07.jpg` | ⏭️ | binary asset |
| 950 | `apps/dwa/docs/mosaic-next/public/images/applications-image-08.jpg` | ⏭️ | binary asset |
| 951 | `apps/dwa/docs/mosaic-next/public/images/applications-image-09.jpg` | ⏭️ | binary asset |
| 952 | `apps/dwa/docs/mosaic-next/public/images/applications-image-10.jpg` | ⏭️ | binary asset |
| 953 | `apps/dwa/docs/mosaic-next/public/images/applications-image-11.jpg` | ⏭️ | binary asset |
| 954 | `apps/dwa/docs/mosaic-next/public/images/applications-image-12.jpg` | ⏭️ | binary asset |
| 955 | `apps/dwa/docs/mosaic-next/public/images/applications-image-13.jpg` | ⏭️ | binary asset |
| 956 | `apps/dwa/docs/mosaic-next/public/images/applications-image-14.jpg` | ⏭️ | binary asset |
| 957 | `apps/dwa/docs/mosaic-next/public/images/applications-image-15.jpg` | ⏭️ | binary asset |
| 958 | `apps/dwa/docs/mosaic-next/public/images/applications-image-16.jpg` | ⏭️ | binary asset |
| 959 | `apps/dwa/docs/mosaic-next/public/images/applications-image-17.jpg` | ⏭️ | binary asset |
| 960 | `apps/dwa/docs/mosaic-next/public/images/applications-image-18.jpg` | ⏭️ | binary asset |
| 961 | `apps/dwa/docs/mosaic-next/public/images/applications-image-19.jpg` | ⏭️ | binary asset |
| 962 | `apps/dwa/docs/mosaic-next/public/images/applications-image-20.jpg` | ⏭️ | binary asset |
| 963 | `apps/dwa/docs/mosaic-next/public/images/applications-image-21.jpg` | ⏭️ | binary asset |
| 964 | `apps/dwa/docs/mosaic-next/public/images/applications-image-22.jpg` | ⏭️ | binary asset |
| 965 | `apps/dwa/docs/mosaic-next/public/images/applications-image-23.jpg` | ⏭️ | binary asset |
| 966 | `apps/dwa/docs/mosaic-next/public/images/applications-image-24.jpg` | ⏭️ | binary asset |
| 967 | `apps/dwa/docs/mosaic-next/public/images/applications-image-25.jpg` | ⏭️ | binary asset |
| 968 | `apps/dwa/docs/mosaic-next/public/images/applications-image-26.jpg` | ⏭️ | binary asset |
| 969 | `apps/dwa/docs/mosaic-next/public/images/applications-image-27.jpg` | ⏭️ | binary asset |
| 970 | `apps/dwa/docs/mosaic-next/public/images/applications-image-28.jpg` | ⏭️ | binary asset |
| 971 | `apps/dwa/docs/mosaic-next/public/images/applications-image-29.jpg` | ⏭️ | binary asset |
| 972 | `apps/dwa/docs/mosaic-next/public/images/applications-image-30.jpg` | ⏭️ | binary asset |
| 973 | `apps/dwa/docs/mosaic-next/public/images/applications-image-31.jpg` | ⏭️ | binary asset |
| 974 | `apps/dwa/docs/mosaic-next/public/images/applications-image-32.jpg` | ⏭️ | binary asset |
| 975 | `apps/dwa/docs/mosaic-next/public/images/auth-image.jpg` | ⏭️ | binary asset |
| 976 | `apps/dwa/docs/mosaic-next/public/images/avatar-01.jpg` | ⏭️ | binary asset |
| 977 | `apps/dwa/docs/mosaic-next/public/images/avatar-02.jpg` | ⏭️ | binary asset |
| 978 | `apps/dwa/docs/mosaic-next/public/images/avatar-03.jpg` | ⏭️ | binary asset |
| 979 | `apps/dwa/docs/mosaic-next/public/images/avatar-04.jpg` | ⏭️ | binary asset |
| 980 | `apps/dwa/docs/mosaic-next/public/images/avatar-05.jpg` | ⏭️ | binary asset |
| 981 | `apps/dwa/docs/mosaic-next/public/images/avatar-06.jpg` | ⏭️ | binary asset |
| 982 | `apps/dwa/docs/mosaic-next/public/images/channel-01.png` | ⏭️ | binary asset |
| 983 | `apps/dwa/docs/mosaic-next/public/images/channel-02.png` | ⏭️ | binary asset |
| 984 | `apps/dwa/docs/mosaic-next/public/images/channel-03.png` | ⏭️ | binary asset |
| 985 | `apps/dwa/docs/mosaic-next/public/images/chat-image.jpg` | ⏭️ | binary asset |
| 986 | `apps/dwa/docs/mosaic-next/public/images/company-bg.jpg` | ⏭️ | binary asset |
| 987 | `apps/dwa/docs/mosaic-next/public/images/company-icon-01.svg` | ⏭️ | binary asset |
| 988 | `apps/dwa/docs/mosaic-next/public/images/company-icon-02.svg` | ⏭️ | binary asset |
| 989 | `apps/dwa/docs/mosaic-next/public/images/company-icon-03.svg` | ⏭️ | binary asset |
| 990 | `apps/dwa/docs/mosaic-next/public/images/company-icon-04.svg` | ⏭️ | binary asset |
| 991 | `apps/dwa/docs/mosaic-next/public/images/company-icon-05.svg` | ⏭️ | binary asset |
| 992 | `apps/dwa/docs/mosaic-next/public/images/company-icon-06.svg` | ⏭️ | binary asset |
| 993 | `apps/dwa/docs/mosaic-next/public/images/company-icon-07.svg` | ⏭️ | binary asset |
| 994 | `apps/dwa/docs/mosaic-next/public/images/company-icon-08.svg` | ⏭️ | binary asset |
| 995 | `apps/dwa/docs/mosaic-next/public/images/favicon.png` | ⏭️ | binary asset |
| 996 | `apps/dwa/docs/mosaic-next/public/images/feed-image-01.jpg` | ⏭️ | binary asset |
| 997 | `apps/dwa/docs/mosaic-next/public/images/feed-image-02.jpg` | ⏭️ | binary asset |
| 998 | `apps/dwa/docs/mosaic-next/public/images/group-avatar-01.png` | ⏭️ | binary asset |
| 999 | `apps/dwa/docs/mosaic-next/public/images/group-avatar-02.png` | ⏭️ | binary asset |
| 1000 | `apps/dwa/docs/mosaic-next/public/images/group-avatar-03.png` | ⏭️ | binary asset |
| 1001 | `apps/dwa/docs/mosaic-next/public/images/group-avatar-04.png` | ⏭️ | binary asset |
| 1002 | `apps/dwa/docs/mosaic-next/public/images/icon-01.svg` | ⏭️ | binary asset |
| 1003 | `apps/dwa/docs/mosaic-next/public/images/icon-02.svg` | ⏭️ | binary asset |
| 1004 | `apps/dwa/docs/mosaic-next/public/images/icon-03.svg` | ⏭️ | binary asset |
| 1005 | `apps/dwa/docs/mosaic-next/public/images/inbox-image.jpg` | ⏭️ | binary asset |
| 1006 | `apps/dwa/docs/mosaic-next/public/images/meetup-image.jpg` | ⏭️ | binary asset |
| 1007 | `apps/dwa/docs/mosaic-next/public/images/meetup-photo-01.jpg` | ⏭️ | binary asset |
| 1008 | `apps/dwa/docs/mosaic-next/public/images/meetup-photo-02.jpg` | ⏭️ | binary asset |
| 1009 | `apps/dwa/docs/mosaic-next/public/images/meetup-photo-03.jpg` | ⏭️ | binary asset |
| 1010 | `apps/dwa/docs/mosaic-next/public/images/meetups-thumb-01.jpg` | ⏭️ | binary asset |
| 1011 | `apps/dwa/docs/mosaic-next/public/images/meetups-thumb-02.jpg` | ⏭️ | binary asset |
| 1012 | `apps/dwa/docs/mosaic-next/public/images/meetups-thumb-03.jpg` | ⏭️ | binary asset |
| 1013 | `apps/dwa/docs/mosaic-next/public/images/meetups-thumb-04.jpg` | ⏭️ | binary asset |
| 1014 | `apps/dwa/docs/mosaic-next/public/images/meetups-thumb-05.jpg` | ⏭️ | binary asset |
| 1015 | `apps/dwa/docs/mosaic-next/public/images/meetups-thumb-06.jpg` | ⏭️ | binary asset |
| 1016 | `apps/dwa/docs/mosaic-next/public/images/meetups-thumb-07.jpg` | ⏭️ | binary asset |
| 1017 | `apps/dwa/docs/mosaic-next/public/images/meetups-thumb-08.jpg` | ⏭️ | binary asset |
| 1018 | `apps/dwa/docs/mosaic-next/public/images/modal-image.jpg` | ⏭️ | binary asset |
| 1019 | `apps/dwa/docs/mosaic-next/public/images/onboarding-image.jpg` | ⏭️ | binary asset |
| 1020 | `apps/dwa/docs/mosaic-next/public/images/pay-bg.jpg` | ⏭️ | binary asset |
| 1021 | `apps/dwa/docs/mosaic-next/public/images/product-image.jpg` | ⏭️ | binary asset |
| 1022 | `apps/dwa/docs/mosaic-next/public/images/profile-bg.jpg` | ⏭️ | binary asset |
| 1023 | `apps/dwa/docs/mosaic-next/public/images/related-product-01.jpg` | ⏭️ | binary asset |
| 1024 | `apps/dwa/docs/mosaic-next/public/images/related-product-02.jpg` | ⏭️ | binary asset |
| 1025 | `apps/dwa/docs/mosaic-next/public/images/related-product-03.jpg` | ⏭️ | binary asset |
| 1026 | `apps/dwa/docs/mosaic-next/public/images/shop-category-01.png` | ⏭️ | binary asset |
| 1027 | `apps/dwa/docs/mosaic-next/public/images/shop-category-02.png` | ⏭️ | binary asset |
| 1028 | `apps/dwa/docs/mosaic-next/public/images/shop-category-03.png` | ⏭️ | binary asset |
| 1029 | `apps/dwa/docs/mosaic-next/public/images/shop-category-04.png` | ⏭️ | binary asset |
| 1030 | `apps/dwa/docs/mosaic-next/public/images/task-image-01.jpg` | ⏭️ | binary asset |
| 1031 | `apps/dwa/docs/mosaic-next/public/images/task-image-02.jpg` | ⏭️ | binary asset |
| 1032 | `apps/dwa/docs/mosaic-next/public/images/transactions-image-01.svg` | ⏭️ | binary asset |
| 1033 | `apps/dwa/docs/mosaic-next/public/images/transactions-image-02.svg` | ⏭️ | binary asset |
| 1034 | `apps/dwa/docs/mosaic-next/public/images/transactions-image-03.svg` | ⏭️ | binary asset |
| 1035 | `apps/dwa/docs/mosaic-next/public/images/transactions-image-04.svg` | ⏭️ | binary asset |
| 1036 | `apps/dwa/docs/mosaic-next/public/images/transactions-image-05.svg` | ⏭️ | binary asset |
| 1037 | `apps/dwa/docs/mosaic-next/public/images/transactions-image-06.svg` | ⏭️ | binary asset |
| 1038 | `apps/dwa/docs/mosaic-next/public/images/transactions-image-07.svg` | ⏭️ | binary asset |
| 1039 | `apps/dwa/docs/mosaic-next/public/images/transactions-image-08.svg` | ⏭️ | binary asset |
| 1040 | `apps/dwa/docs/mosaic-next/public/images/user-128-01.jpg` | ⏭️ | binary asset |
| 1041 | `apps/dwa/docs/mosaic-next/public/images/user-28-01.jpg` | ⏭️ | binary asset |
| 1042 | `apps/dwa/docs/mosaic-next/public/images/user-28-02.jpg` | ⏭️ | binary asset |
| 1043 | `apps/dwa/docs/mosaic-next/public/images/user-28-03.jpg` | ⏭️ | binary asset |
| 1044 | `apps/dwa/docs/mosaic-next/public/images/user-28-04.jpg` | ⏭️ | binary asset |
| 1045 | `apps/dwa/docs/mosaic-next/public/images/user-28-05.jpg` | ⏭️ | binary asset |
| 1046 | `apps/dwa/docs/mosaic-next/public/images/user-28-06.jpg` | ⏭️ | binary asset |
| 1047 | `apps/dwa/docs/mosaic-next/public/images/user-28-07.jpg` | ⏭️ | binary asset |
| 1048 | `apps/dwa/docs/mosaic-next/public/images/user-28-08.jpg` | ⏭️ | binary asset |
| 1049 | `apps/dwa/docs/mosaic-next/public/images/user-28-09.jpg` | ⏭️ | binary asset |
| 1050 | `apps/dwa/docs/mosaic-next/public/images/user-28-10.jpg` | ⏭️ | binary asset |
| 1051 | `apps/dwa/docs/mosaic-next/public/images/user-28-11.jpg` | ⏭️ | binary asset |
| 1052 | `apps/dwa/docs/mosaic-next/public/images/user-28-12.jpg` | ⏭️ | binary asset |
| 1053 | `apps/dwa/docs/mosaic-next/public/images/user-32-01.jpg` | ⏭️ | binary asset |
| 1054 | `apps/dwa/docs/mosaic-next/public/images/user-32-02.jpg` | ⏭️ | binary asset |
| 1055 | `apps/dwa/docs/mosaic-next/public/images/user-32-03.jpg` | ⏭️ | binary asset |
| 1056 | `apps/dwa/docs/mosaic-next/public/images/user-32-04.jpg` | ⏭️ | binary asset |
| 1057 | `apps/dwa/docs/mosaic-next/public/images/user-32-05.jpg` | ⏭️ | binary asset |
| 1058 | `apps/dwa/docs/mosaic-next/public/images/user-32-06.jpg` | ⏭️ | binary asset |
| 1059 | `apps/dwa/docs/mosaic-next/public/images/user-32-07.jpg` | ⏭️ | binary asset |
| 1060 | `apps/dwa/docs/mosaic-next/public/images/user-32-08.jpg` | ⏭️ | binary asset |
| 1061 | `apps/dwa/docs/mosaic-next/public/images/user-36-05.jpg` | ⏭️ | binary asset |
| 1062 | `apps/dwa/docs/mosaic-next/public/images/user-40-01.jpg` | ⏭️ | binary asset |
| 1063 | `apps/dwa/docs/mosaic-next/public/images/user-40-02.jpg` | ⏭️ | binary asset |
| 1064 | `apps/dwa/docs/mosaic-next/public/images/user-40-03.jpg` | ⏭️ | binary asset |
| 1065 | `apps/dwa/docs/mosaic-next/public/images/user-40-04.jpg` | ⏭️ | binary asset |
| 1066 | `apps/dwa/docs/mosaic-next/public/images/user-40-05.jpg` | ⏭️ | binary asset |
| 1067 | `apps/dwa/docs/mosaic-next/public/images/user-40-06.jpg` | ⏭️ | binary asset |
| 1068 | `apps/dwa/docs/mosaic-next/public/images/user-40-07.jpg` | ⏭️ | binary asset |
| 1069 | `apps/dwa/docs/mosaic-next/public/images/user-40-08.jpg` | ⏭️ | binary asset |
| 1070 | `apps/dwa/docs/mosaic-next/public/images/user-40-09.jpg` | ⏭️ | binary asset |
| 1071 | `apps/dwa/docs/mosaic-next/public/images/user-40-10.jpg` | ⏭️ | binary asset |
| 1072 | `apps/dwa/docs/mosaic-next/public/images/user-40-11.jpg` | ⏭️ | binary asset |
| 1073 | `apps/dwa/docs/mosaic-next/public/images/user-40-12.jpg` | ⏭️ | binary asset |
| 1074 | `apps/dwa/docs/mosaic-next/public/images/user-64-01.jpg` | ⏭️ | binary asset |
| 1075 | `apps/dwa/docs/mosaic-next/public/images/user-64-02.jpg` | ⏭️ | binary asset |
| 1076 | `apps/dwa/docs/mosaic-next/public/images/user-64-03.jpg` | ⏭️ | binary asset |
| 1077 | `apps/dwa/docs/mosaic-next/public/images/user-64-04.jpg` | ⏭️ | binary asset |
| 1078 | `apps/dwa/docs/mosaic-next/public/images/user-64-05.jpg` | ⏭️ | binary asset |
| 1079 | `apps/dwa/docs/mosaic-next/public/images/user-64-06.jpg` | ⏭️ | binary asset |
| 1080 | `apps/dwa/docs/mosaic-next/public/images/user-64-07.jpg` | ⏭️ | binary asset |
| 1081 | `apps/dwa/docs/mosaic-next/public/images/user-64-08.jpg` | ⏭️ | binary asset |
| 1082 | `apps/dwa/docs/mosaic-next/public/images/user-64-09.jpg` | ⏭️ | binary asset |
| 1083 | `apps/dwa/docs/mosaic-next/public/images/user-64-10.jpg` | ⏭️ | binary asset |
| 1084 | `apps/dwa/docs/mosaic-next/public/images/user-64-11.jpg` | ⏭️ | binary asset |
| 1085 | `apps/dwa/docs/mosaic-next/public/images/user-64-12.jpg` | ⏭️ | binary asset |
| 1086 | `apps/dwa/docs/mosaic-next/public/images/user-64-13.jpg` | ⏭️ | binary asset |
| 1087 | `apps/dwa/docs/mosaic-next/public/images/user-64-14.jpg` | ⏭️ | binary asset |
| 1088 | `apps/dwa/docs/mosaic-next/public/images/user-avatar-32.png` | ⏭️ | binary asset |
| 1089 | `apps/dwa/docs/mosaic-next/public/images/user-avatar-80.png` | ⏭️ | binary asset |
| 1090 | `apps/dwa/docs/mosaic-next/tsconfig.json` | ⏳ | pending |
| 1091 | `apps/dwa/docs/nodebb-category-setup.md` | ⏳ | pending |
| 1092 | `apps/dwa/docs/phase-b-audit-report.md` | ⏳ | pending |
| 1093 | `apps/dwa/docs/platform-architecture.html` | ⏳ | pending |
| 1094 | `apps/dwa/docs/production-deployment-guide.md` | ⏳ | pending |
| 1095 | `apps/dwa/docs/reference/AI Wellness Coach System.md` | ⏳ | pending |
| 1096 | `apps/dwa/docs/reference/INTERACTIVITY.md` | ⏳ | pending |
| 1097 | `apps/dwa/docs/reference/Symptom-Based Onboarding Flow.md` | ⏳ | pending |
| 1098 | `apps/dwa/docs/reference/course-research-prompts/11. Bipolar Disorder_ Mood Stability Strategies_Re.md` | ⏳ | pending |
| 1099 | `apps/dwa/docs/reference/course-research-prompts/13. Low Self-Esteem &amp; Self-Worth_Research Prom.md` | ⏳ | pending |
| 1100 | `apps/dwa/docs/reference/course-research-prompts/14. Managing Perfectionism_Research Prompt__Review.md` | ⏳ | pending |
| 1101 | `apps/dwa/docs/reference/course-research-prompts/15. Loneliness &amp; Social Isolation_Research Pro.md` | ⏳ | pending |
| 1102 | `apps/dwa/docs/reference/course-research-prompts/16. Health Anxiety &amp; Somatic Symptoms_Research.md` | ⏳ | pending |
| 1103 | `apps/dwa/docs/reference/course-research-prompts/17. Attention &amp; Focus Difficulties (ADHD)_Rese.md` | ⏳ | pending |
| 1104 | `apps/dwa/docs/reference/course-research-prompts/18. Eating &amp; Body Image Concerns_Research Prom.md` | ⏳ | pending |
| 1105 | `apps/dwa/docs/reference/course-research-prompts/19. Substance Use &amp; Cravings Management_Resear.md` | ⏳ | pending |
| 1106 | `apps/dwa/docs/reference/course-research-prompts/20. Life Transitions &amp; Adjustment Difficulties.md` | ⏳ | pending |
| 1107 | `apps/dwa/docs/reference/course-research-prompts/Chronic Stress & Burnout Management.md` | ⏳ | pending |
| 1108 | `apps/dwa/docs/reference/course-research-prompts/Course 12_ Emotional Dysregulation &amp; DBT Skill.md` | ⏳ | pending |
| 1109 | `apps/dwa/docs/reference/course-research-prompts/Depression Course Research Package.md` | ⏳ | pending |
| 1110 | `apps/dwa/docs/reference/course-research-prompts/Grief & Loss: Navigating Bereavement.md` | ⏳ | pending |
| 1111 | `apps/dwa/docs/reference/course-research-prompts/Managing Anger & Irritability.md` | ⏳ | pending |
| 1112 | `apps/dwa/docs/reference/course-research-prompts/Obsessive-compulsive disorder.md` | ⏳ | pending |
| 1113 | `apps/dwa/docs/reference/course-research-prompts/Panic Disorder Course Research.md` | ⏳ | pending |
| 1114 | `apps/dwa/docs/reference/course-research-prompts/Sleep & Insomnia Course Research.md` | ⏳ | pending |
| 1115 | `apps/dwa/docs/reference/course-research-prompts/Social Anxiety Course Research.md` | ⏳ | pending |
| 1116 | `apps/dwa/docs/reference/course-research-prompts/Trauma Recovery Course Research.md` | ⏳ | pending |
| 1117 | `apps/dwa/docs/reference/course-research-prompts/anxiety-course-research-package.md` | ⏳ | pending |
| 1118 | `apps/dwa/docs/reference/course-research-prompts/course-numbers.md` | ⏳ | pending |
| 1119 | `apps/dwa/docs/reference/high-value-catalogue/00-QUICK-START.md` | ⏳ | pending |
| 1120 | `apps/dwa/docs/reference/high-value-catalogue/01-TECHNICAL-ARCHITECTURE.md` | ⏳ | pending |
| 1121 | `apps/dwa/docs/reference/high-value-catalogue/02-DESIGN-SYSTEM.md` | ⏳ | pending |
| 1122 | `apps/dwa/docs/reference/high-value-catalogue/03-DATABASE-SCHEMA.md` | ⏳ | pending |
| 1123 | `apps/dwa/docs/reference/high-value-catalogue/04-INTERACTIVE-COMPONENTS.md` | ⏳ | pending |
| 1124 | `apps/dwa/docs/reference/high-value-catalogue/05-CURSOR-PROMPTS.md` | ⏳ | pending |
| 1125 | `apps/dwa/docs/reference/high-value-catalogue/Evaluation of the Spec-Driven Documentation Package.docx` | ⏭️ | binary asset |
| 1126 | `apps/dwa/docs/reference/high-value-catalogue/Go-To-Market (GTM) Blueprint-20251123085414.md` | ⏳ | pending |
| 1127 | `apps/dwa/docs/reference/high-value-catalogue/High-Value Course Catalog for Real Psychiatric Services Educational Platform-20251123085441.md` | ⏳ | pending |
| 1128 | `apps/dwa/docs/reference/high-value-catalogue/Project Description-20251123085405.md` | ⏳ | pending |
| 1129 | `apps/dwa/docs/reference/high-value-catalogue/Why Stay w Supabase-20251123085452.md` | ⏳ | pending |
| 1130 | `apps/dwa/docs/reference/high-value-catalogue/five detailed, research-grounded user personas-20251123085425.md` | ⏳ | pending |
| 1131 | `apps/dwa/docs/reference/high-value-catalogue/mental-wellness-evaluation-by-chatgpt.md` | ⏳ | pending |
| 1132 | `apps/dwa/docs/reference/legacy-lesson-guides/ANXIETY-TOOLKIT-RECREATION-COMPLETE.md` | ⏳ | pending |
| 1133 | `apps/dwa/docs/reference/legacy-lesson-guides/COURSE-STRUCTURE-REFERENCE.md` | ⏳ | pending |
| 1134 | `apps/dwa/docs/reference/legacy-lesson-guides/LESSON-1-1-COMPLETION-PLAN.md` | ⏳ | pending |
| 1135 | `apps/dwa/docs/reference/legacy-lesson-guides/LESSON-1-1-COMPREHENSIVE-FIXES.md` | ⏳ | pending |
| 1136 | `apps/dwa/docs/reference/legacy-lesson-guides/LESSON-1-1-EXECUTION-PLAN.md` | 🔍 | slice 04 — B-049..B-058 |
| 1137 | `apps/dwa/docs/reference/legacy-lesson-guides/LESSON-1-1-EXPERIENTIAL-GUIDE.md` | ⏳ | pending |
| 1138 | `apps/dwa/docs/reference/legacy-lesson-guides/LESSON-1-1-FEATURE-SUMMARY.md` | ⏳ | pending |
| 1139 | `apps/dwa/docs/reference/legacy-lesson-guides/LESSON-1-1-IMPLEMENTATION-COMPLETE.md` | ⏳ | pending |
| 1140 | `apps/dwa/docs/reference/legacy-lesson-guides/LESSON-1-1-MIGRATION-SUMMARY.md` | ⏳ | pending |
| 1141 | `apps/dwa/docs/reference/legacy-lesson-guides/LESSON-1-1-QUICK-START.md` | ⏳ | pending |
| 1142 | `apps/dwa/docs/reference/legacy-lesson-guides/LESSON-CREATION-GUIDE.md` | ⏳ | pending |
| 1143 | `apps/dwa/docs/reference/legacy-lesson-guides/README-API-LESSON-WORKFLOW.md` | ⏳ | pending |
| 1144 | `apps/dwa/docs/reference/legacy-lesson-guides/WORKBOOK-SYSTEM-GUIDE.md` | ⏳ | pending |
| 1145 | `apps/dwa/docs/reference/nutrition-research-prompts/COURSE 1_Gut-Brain Foundations_ Evidence-Based Research Sum.md` | ⏳ | pending |
| 1146 | `apps/dwa/docs/reference/nutrition-research-prompts/COURSE 2_ Dietary Patterns Research Prompt_text_I'.md` | ⏳ | pending |
| 1147 | `apps/dwa/docs/reference/nutrition-research-prompts/COURSE 3_Precision Nutrition Protocols for Mental Health_ E.md` | ⏳ | pending |
| 1148 | `apps/dwa/docs/reference/nutrition-research-prompts/COURSE 4_ Food-Mood Mastery Research Prompt_text_I.md` | ⏳ | pending |
| 1149 | `apps/dwa/docs/reference/nutrition-research-prompts/nutrition-course-creation-prompt.md` | ⏳ | pending |
| 1150 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 1: Understanding Your Anxiety/Lesson 2 Your Interactive Anxiety Journeyv.html` | ⏳ | pending |
| 1151 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 1: Understanding Your Anxiety/Lesson 3: Your Nervous system gas and brav.html` | ⏳ | pending |
| 1152 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 1: Understanding Your Anxiety/Lesson 4: Activity Your Anxiety Journey Becoming.html` | ⏳ | pending |
| 1153 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 1: Understanding Your Anxiety/Section-1-Downoad What Is Anxiety Understanding Your Body's Alarm System.pdf` | ⏭️ | binary asset |
| 1154 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 1: Understanding Your Anxiety/Section-1-Your-Nervous-System-The-Gas-and-The-Brake.pdf` | ⏭️ | binary asset |
| 1155 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 1: Understanding Your Anxiety/Section-1-download-your-nevous-system.png` | ⏭️ | binary asset |
| 1156 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 1: Understanding Your Anxiety/Section-1-intro-What-Is-Anxiety-Understanding-Your-Bodys-Alarm-System.pdf` | ⏭️ | binary asset |
| 1157 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 2: Taming Your Thoughts/Lesson 1: Your Thoughts, Feelings, and Actions.html` | ⏳ | pending |
| 1158 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 2: Taming Your Thoughts/Lesson 2: Spotting "Thinking Traps"Your field.html` | ⏳ | pending |
| 1159 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 2: Taming Your Thoughts/Lesson 3: Finding Balance: Simple Ways to Ch.html` | ⏳ | pending |
| 1160 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 2: Taming Your Thoughts/Lesson 4: Track Your Thoughts: A Simple Way.html` | ⏳ | pending |
| 1161 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 2: Taming Your Thoughts/Section-2-AFinal-Thought-From-Autumn-Part 2 Complete- You've Built Mental Clarity!.pdf` | ⏭️ | binary asset |
| 1162 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 2: Taming Your Thoughts/Section-2-Intro-Taming-Your-Thoughts-How-Your-Mind-Shapes-Your-Anxiety.pdf` | ⏭️ | binary asset |
| 1163 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 3: Calming the Storm/Lesson 3.1: Crisis Mode: Quick Skills to Calm Dow.html` | ⏳ | pending |
| 1164 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 3: Calming the Storm/Lesson 3.2: Ground Yourself: Simple Ways to.html` | ⏳ | pending |
| 1165 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 3: Calming the Storm/Lesson 3.3: Riding the Wave of Emotion.html` | ⏳ | pending |
| 1166 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 3: Calming the Storm/Lesson 3.4: DBT Skills Challenge.html` | ⏳ | pending |
| 1167 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 3: Calming the Storm/Section-3 Complete: You Can Calm the Storm.pdf` | ⏭️ | binary asset |
| 1168 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 3: Calming the Storm/Section-3-Intro-Calming-the-Storm-Managing-Big-Emotions.pdf` | ⏭️ | binary asset |
| 1169 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 4, The Avoidance Trap/Lesson 4.1: The Avoidance Trap.html` | ⏳ | pending |
| 1170 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 4, The Avoidance Trap/Lesson 4.2: Building Your Fear Ladder.html` | ⏳ | pending |
| 1171 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 4, The Avoidance Trap/Lesson 4.3: Climbing the Ladder with Your Toolkit.html` | ⏳ | pending |
| 1172 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 4, The Avoidance Trap/Lesson 4.4: You Are Brave.html` | ⏳ | pending |
| 1173 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 5/Lesson 5.1: The Social Anxiety Toolkit.html` | ⏳ | pending |
| 1174 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 5/Lesson 5.2: Assertive Communication.html` | ⏳ | pending |
| 1175 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 5/Lesson 5.3: The Art of the Healthy Boundary.html` | ⏳ | pending |
| 1176 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 5/Lesson 5.4: Your Boundary Starter Pack.html` | ⏳ | pending |
| 1177 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 5/Section 5 Self-Assessment.html` | ⏳ | pending |
| 1178 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 6/Lesson 6.1: The Physical Foundation.html` | ⏳ | pending |
| 1179 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 6/Lesson 6.2: Building a Resilience Routine.html` | ⏳ | pending |
| 1180 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 6/Lesson 6.3: Your Personal Relapse Prevention.html` | ⏳ | pending |
| 1181 | `apps/dwa/docs/reference/original-course-content/Course: Anxiety Toolkit: Evidence-Based Strategies for Daily Life/Section 6/Lesson 6.4- Section-6-Lesson 6.4- Your Toolkit for Life.pdf` | ⏭️ | binary asset |
| 1182 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 1 The Neuroscience of Sleep & Mental Health/Lesson 1.1 Printable Pittsburgh Sleep Quality Inde.html` | ⏳ | pending |
| 1183 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 1 The Neuroscience of Sleep & Mental Health/Lesson 1.1 The Neuroscience of Sleep & Mental Health - David Glenn, PMHNP-BC.html` | ⏳ | pending |
| 1184 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 1 The Neuroscience of Sleep & Mental Health/Lesson 1.2 Worksheet: My Personalized Sleep Plan.html` | ⏳ | pending |
| 1185 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 1 The Neuroscience of Sleep & Mental Health/Lesson 1.3: Quieting the Racing Mind.html` | ⏳ | pending |
| 1186 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 1 The Neuroscience of Sleep & Mental Health/Lesson 1.4: Building Your Sleep Sanctuary.html` | ⏳ | pending |
| 1187 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 1 The Neuroscience of Sleep & Mental Health/Lesson 1.5- Practitioner Notes.pdf` | ⏭️ | binary asset |
| 1188 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 1 The Neuroscience of Sleep & Mental Health/Section 1- Guided Journal & Goal-Setting.pdf` | ⏭️ | binary asset |
| 1189 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 1 The Neuroscience of Sleep & Mental Health/Section 1: Self-Assessment` | ⏳ | pending |
| 1190 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 1 The Neuroscience of Sleep & Mental Health/Section-1-Pittsburgh Sleep Quality Index.pdf` | ⏭️ | binary asset |
| 1191 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 1 The Neuroscience of Sleep & Mental Health/Section-1-Worksheet 1.1- Your Sleep & Anxiety Baseline.pdf` | ⏭️ | binary asset |
| 1192 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 1 The Neuroscience of Sleep & Mental Health/Section-10intro-Sleep-Mastery-The-Foundation-of-Mental-Wellness.pdf` | ⏭️ | binary asset |
| 1193 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 2: Sleep as a Biological Reset /Lesson 2.2 Sleep for Mood, Focus, and Productivity.html` | ⏳ | pending |
| 1194 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 2: Sleep as a Biological Reset /Lesson 2.2 Worksheet 2.2: The Night & Day Reflection Log.html` | ⏳ | pending |
| 1195 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 2: Sleep as a Biological Reset /Lesson 2.3: Sleep for Physical Resilience.html` | ⏳ | pending |
| 1196 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 2: Sleep as a Biological Reset /Lesson 2.4: Your Resilient & Adaptable Sleep System.html` | ⏳ | pending |
| 1197 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 2: Sleep as a Biological Reset /Lesson 2.5: Nutrition for Nourishing Sleep.html` | ⏳ | pending |
| 1198 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 2: Sleep as a Biological Reset /Section 2- Practitioner Notes - Sleep as a Biological Reset-1.pdf` | ⏭️ | binary asset |
| 1199 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 2: Sleep as a Biological Reset /Section 2- Practitioner Notes - Sleep as a Biological Reset.pdf` | ⏭️ | binary asset |
| 1200 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 2: Sleep as a Biological Reset /Section-2-Intro-Sleep-as-a-Biological-Reset.pdf` | ⏭️ | binary asset |
| 1201 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 2: Sleep as a Biological Reset /Section-2-intro-SteepAsABiologicalReset.pdf` | ⏭️ | binary asset |
| 1202 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 2: Sleep as a Biological Reset /Worksheet 2.2- The Night n Day Reflection Log.pdf` | ⏭️ | binary asset |
| 1203 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 3: Lesson 3.1 - From Practice to Identity: Building Your Sustainable Sleep Ritual /Lesson 3.2: The 24-Hour Sleep System.html` | ⏳ | pending |
| 1204 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 3: Lesson 3.1 - From Practice to Identity: Building Your Sustainable Sleep Ritual /Lesson 3.3: Your Personal Sleep Blueprint.html` | ⏳ | pending |
| 1205 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 3: Lesson 3.1 - From Practice to Identity: Building Your Sustainable Sleep Ritual /Lesson 3.4: "Your Journey Forward: Living as a Resilient Sleeper.html` | ⏳ | pending |
| 1206 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 3: Lesson 3.1 - From Practice to Identity: Building Your Sustainable Sleep Ritual /Section 3- Practitioner Notes - From Practice to Identity copy.pdf` | ⏭️ | binary asset |
| 1207 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 3: Lesson 3.1 - From Practice to Identity: Building Your Sustainable Sleep Ritual /Section 3- Practitioner Notes - From Practice to Identity.pdf` | ⏭️ | binary asset |
| 1208 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 3: Lesson 3.1 - From Practice to Identity: Building Your Sustainable Sleep Ritual /The-Resilient-Sleeper-Integrating-Skills-for-Long-Term-Wellness.pdf` | ⏭️ | binary asset |
| 1209 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 4: Supplemental Sleep Analysis /Sleep Disorder Screening Checklist.html` | ⏳ | pending |
| 1210 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 4: Supplemental Sleep Analysis /lesson 4.1 A Deeper Look: The Neuroscience of Your Nightly Reset.html` | ⏳ | pending |
| 1211 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 4: Supplemental Sleep Analysis /lesson 4.2-Sleep Mastery: The Foundation of Mental Wellness.html` | ⏳ | pending |
| 1212 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 4: Supplemental Sleep Analysis /lesson 4.3 Neurotransmitter Sleep Chart.html` | ⏳ | pending |
| 1213 | `apps/dwa/docs/reference/original-course-content/Course: Sleep Mastery - The Foundation of Mental Wellness/Section 4: Supplemental Sleep Analysis /lesson 4.4 Advanced Sleep Science Guide.html` | ⏳ | pending |
| 1214 | `apps/dwa/docs/reference/original-course-content/Course: The Food-Mood Connection/Section 1: The Groundwork /Lesson 1.2: Your Gut as Your Second Brain.html` | ⏳ | pending |
| 1215 | `apps/dwa/docs/reference/original-course-content/Course: The Food-Mood Connection/Section 1: The Groundwork /Lesson 1.3: The Gut Garden.html` | ⏳ | pending |
| 1216 | `apps/dwa/docs/reference/original-course-content/Course: The Food-Mood Connection/Section 1: The Groundwork /Lesson 1.4: The Inflammation Connection.html` | ⏳ | pending |
| 1217 | `apps/dwa/docs/reference/original-course-content/Course: The Food-Mood Connection/Section 1: The Groundwork /Lesson 1.5: Common Roadblocks & How to Overcome Them.html` | ⏳ | pending |
| 1218 | `apps/dwa/docs/reference/original-course-content/Course: The Food-Mood Connection/Section 1: The Groundwork /Lesson 1.6-Meal Timing Template for Mental Energy.pdf` | ⏭️ | binary asset |
| 1219 | `apps/dwa/docs/reference/original-course-content/Course: The Food-Mood Connection/Section 1: The Groundwork /Lesson 1.7: Building Your Support System.html` | ⏳ | pending |
| 1220 | `apps/dwa/docs/reference/original-course-content/Course: The Food-Mood Connection/Section 1: The Groundwork /Section 1- intro -The-Food-Mood-Connection.pdf` | ⏭️ | binary asset |
| 1221 | `apps/dwa/docs/reference/original-course-content/Course: The Food-Mood Connection/Section 2: The Building Blocks - What Your Brain Needs to Thrive /Fuel-Your-Brain-Master-Your-Mood.pdf` | ⏭️ | binary asset |
| 1222 | `apps/dwa/docs/reference/original-course-content/Course: The Food-Mood Connection/Section 2: The Building Blocks - What Your Brain Needs to Thrive /Lesson 2.2: The Blood Sugar Rollercoaster.html` | ⏳ | pending |
| 1223 | `apps/dwa/docs/reference/original-course-content/Course: The Food-Mood Connection/Section 2: The Building Blocks - What Your Brain Needs to Thrive /Lesson 2.4 The Right Carbs` | ⏳ | pending |
| 1224 | `apps/dwa/docs/reference/original-course-content/Course: The Food-Mood Connection/Section 2: The Building Blocks - What Your Brain Needs to Thrive /Lesson 2.7 Powering Up with Protein & Healthy Fats.html` | ⏳ | pending |
| 1225 | `apps/dwa/docs/research-update-12-jan-26/1. DISC Academic Foundation.docx` | ⏭️ | binary asset |
| 1226 | `apps/dwa/docs/research-update-12-jan-26/AI & Automation for Customer Acquisition (Solo Fou.md` | ⏳ | pending |
| 1227 | `apps/dwa/docs/research-update-12-jan-26/AI and Automation for Customer Acquisition_ A Comprehensive Report.docx` | ⏭️ | binary asset |
| 1228 | `apps/dwa/docs/research-update-12-jan-26/B2B Sales Discovery and Qualification Frameworks for Solo Founders.docx` | ⏭️ | binary asset |
| 1229 | `apps/dwa/docs/research-update-12-jan-26/Behavioral Architecture in the Solo Enterprise_ A Psychometric and Strategic Analysis of DISC in High-Stakes Commerce.md` | ⏳ | pending |
| 1230 | `apps/dwa/docs/research-update-12-jan-26/CORE METRICS.docx` | ⏭️ | binary asset |
| 1231 | `apps/dwa/docs/research-update-12-jan-26/Cold Email Best Practices for Solo Founders (2024–.md` | ⏳ | pending |
| 1232 | `apps/dwa/docs/research-update-12-jan-26/Cold Email for Solo Founders_ B2B Focus, Compliance, and Best Practices.docx` | ⏭️ | binary asset |
| 1233 | `apps/dwa/docs/research-update-12-jan-26/Emerging Trends in B2B Customer Acquisition_ 2026.md` | ⏳ | pending |
| 1234 | `apps/dwa/docs/research-update-12-jan-26/LinkedIn B2B Marketing Strategies for Solo Founders (2025).docx` | ⏭️ | binary asset |
| 1235 | `apps/dwa/docs/research-update-12-jan-26/LinkedIn B2B Marketing for Solo Founders in 2025.md` | ⏳ | pending |
| 1236 | `apps/dwa/docs/research-update-12-jan-26/MANUSCRIPT-RESEARCH-INTEGRATION-GUIDE.md` | ⏳ | pending |
| 1237 | `apps/dwa/docs/research-update-12-jan-26/PROMPT-1-Content-Discovery-Mapping.md` | ⏳ | pending |
| 1238 | `apps/dwa/docs/research-update-12-jan-26/PROMPT-2-Research-Gap-Analysis.md` | ⏳ | pending |
| 1239 | `apps/dwa/docs/research-update-12-jan-26/PROMPT-3-Diff-Generation-Per-Course.md` | ⏳ | pending |
| 1240 | `apps/dwa/docs/research-update-12-jan-26/Part 1_ Community‑Led Growth (CLG) – Definition, Emergence & Principles.docx` | ⏭️ | binary asset |
| 1241 | `apps/dwa/docs/research-update-12-jan-26/Psychology of Sales Resistance Among Technical Fou.md` | ⏳ | pending |
| 1242 | `apps/dwa/docs/research-update-12-jan-26/QUICK-START-Research-Integration.md` | ⏳ | pending |
| 1243 | `apps/dwa/docs/research-update-12-jan-26/RESEARCH-INTEGRATION-MASTER-WORKFLOW.md` | ⏳ | pending |
| 1244 | `apps/dwa/docs/research-update-12-jan-26/Research community-led growth and social proof str.md` | ⏳ | pending |
| 1245 | `apps/dwa/docs/research-update-12-jan-26/Research customer success and retention strategies.md` | ⏳ | pending |
| 1246 | `apps/dwa/docs/research-update-12-jan-26/Research discovery call frameworks and qualificati.md` | ⏳ | pending |
| 1247 | `apps/dwa/docs/research-update-12-jan-26/Research pricing psychology and objection handling.md` | ⏳ | pending |
| 1248 | `apps/dwa/docs/research-update-12-jan-26/Research sales and customer acquisition metrics fo.md` | ⏳ | pending |
| 1249 | `apps/dwa/docs/research-update-12-jan-26/Research sales sustainability and founder mental h.md` | ⏳ | pending |
| 1250 | `apps/dwa/docs/research-update-12-jan-26/Research the application of DISC behavioral assess.md` | ⏳ | pending |
| 1251 | `apps/dwa/docs/research-update-12-jan-26/Research the differences between bootstrap and VC-.md` | ⏳ | pending |
| 1252 | `apps/dwa/docs/research-update-12-jan-26/The 2025 B2B LinkedIn Ecosystem_ A Comprehensive Strategic Report for Solo Founders.md` | ⏳ | pending |
| 1253 | `apps/dwa/docs/research-update-12-jan-26/The 2025 State of Cold Email for B2B Solo Founders_ Infrastructure, Psychology, and Effectiveness.md` | ⏳ | pending |
| 1254 | `apps/dwa/docs/research-update-12-jan-26/The Autonomous Customer Success Architecture_ Retention Systems for the Resource-Constrained B2B Founder.md` | ⏳ | pending |
| 1255 | `apps/dwa/docs/research-update-12-jan-26/The Autonomous Founder_ A Comprehensive Analysis of AI, Automation, and Human-Centric Customer Acquisition Architectures in 2025.md` | ⏳ | pending |
| 1256 | `apps/dwa/docs/research-update-12-jan-26/The Cognitive and Neurobiological Architecture of Sales Resistance_ An Exhaustive Analysis of Technical Founder Psychology.md` | ⏳ | pending |
| 1257 | `apps/dwa/docs/research-update-12-jan-26/The Minimum Viable Qualification (MVQ) Architecture_ Adapting Enterprise Sales Methodologies for the Resource-Constrained Solopreneur.md` | ⏳ | pending |
| 1258 | `apps/dwa/docs/research-update-12-jan-26/The Psychology of Founders’ Sales Avoidance_ Anxiety, Patterns, and Transformation.docx` | ⏭️ | binary asset |
| 1259 | `apps/dwa/docs/research-update-12-jan-26/The Solo Founder’s Playbook_ Community-Led Growth and Social Proof as High-Leverage Acquisition Channels.md` | ⏳ | pending |
| 1260 | `apps/dwa/docs/revised-audit-test-document.md` | ⏳ | pending |
| 1261 | `apps/dwa/docs/sales-academy-update-requirements-summary-include-MAGNETS-context.md` | ⏳ | pending |
| 1262 | `apps/dwa/docs/screenshots/artifact_creation_icp_1765899000792.png` | ⏭️ | binary asset |
| 1263 | `apps/dwa/docs/screenshots/artifacts_page_1765898837272.png` | ⏭️ | binary asset |
| 1264 | `apps/dwa/docs/screenshots/course-context-prompts.md` | ⏳ | pending |
| 1265 | `apps/dwa/docs/screenshots/dashboard_sales_state_1765898825361.png` | ⏭️ | binary asset |
| 1266 | `apps/dwa/docs/screenshots/demo_script_creation_1765899048431.png` | ⏭️ | binary asset |
| 1267 | `apps/dwa/docs/screenshots/execution-loop-visual.png` | ⏭️ | binary asset |
| 1268 | `apps/dwa/docs/screenshots/icp-builder-mockup.png` | ⏭️ | binary asset |
| 1269 | `apps/dwa/docs/screenshots/login_page_1765898808505.png` | ⏭️ | binary asset |
| 1270 | `apps/dwa/docs/screenshots/objection_handler_creation_1765899038241.png` | ⏭️ | binary asset |
| 1271 | `apps/dwa/docs/screenshots/pipeline-state-machine-mockup.png` | ⏭️ | binary asset |
| 1272 | `apps/dwa/docs/screenshots/roleplay_setup_1765898846051.png` | ⏭️ | binary asset |
| 1273 | `apps/dwa/docs/screenshots/sales-academy-visual.png` | ⏭️ | binary asset |
| 1274 | `apps/dwa/docs/screenshots/sales-roleplay-mockup.png` | ⏭️ | binary asset |
| 1275 | `apps/dwa/docs/simple-next.zip` | ⏭️ | binary asset |
| 1276 | `apps/dwa/docs/solo-founders-ai-playbook-manuscript.md` | ⏳ | pending |
| 1277 | `apps/dwa/docs/solo-founders-ai-sales-academy.html` | ⏳ | pending |
| 1278 | `apps/dwa/docs/solo-founders-ai-startup-academy.html` | ⏳ | pending |
| 1279 | `apps/dwa/docs/solo-founders-sales-academy-marketing-overview.md` | ⏳ | pending |
| 1280 | `apps/dwa/docs/soloframehub-website-for-design-compatability.html` | ⏳ | pending |
| 1281 | `apps/dwa/docs/soloframehub-website/8-gtm-frameworks-compounding-growth-book.html` | ⏳ | pending |
| 1282 | `apps/dwa/docs/soloframehub-website/assets/fonts/inter-v12-latin-500-Cerq10X2.woff2` | ⏭️ | binary asset |
| 1283 | `apps/dwa/docs/soloframehub-website/assets/fonts/inter-v12-latin-500.woff2` | ⏭️ | binary asset |
| 1284 | `apps/dwa/docs/soloframehub-website/assets/fonts/inter-v12-latin-600-LgqL8muc.woff2` | ⏭️ | binary asset |
| 1285 | `apps/dwa/docs/soloframehub-website/assets/fonts/inter-v12-latin-600.woff2` | ⏭️ | binary asset |
| 1286 | `apps/dwa/docs/soloframehub-website/assets/fonts/inter-v12-latin-regular-C38fXH4l.woff2` | ⏭️ | binary asset |
| 1287 | `apps/dwa/docs/soloframehub-website/assets/fonts/inter-v12-latin-regular.woff2` | ⏭️ | binary asset |
| 1288 | `apps/dwa/docs/soloframehub-website/assets/fonts/poppins-v20-latin-500-C8OXljZJ.woff2` | ⏭️ | binary asset |
| 1289 | `apps/dwa/docs/soloframehub-website/assets/fonts/poppins-v20-latin-500.woff2` | ⏭️ | binary asset |
| 1290 | `apps/dwa/docs/soloframehub-website/assets/fonts/poppins-v20-latin-600-zEkxB9Mr.woff2` | ⏭️ | binary asset |
| 1291 | `apps/dwa/docs/soloframehub-website/assets/fonts/poppins-v20-latin-600.woff2` | ⏭️ | binary asset |
| 1292 | `apps/dwa/docs/soloframehub-website/assets/fonts/poppins-v20-latin-regular-cpxAROuN.woff2` | ⏭️ | binary asset |
| 1293 | `apps/dwa/docs/soloframehub-website/assets/fonts/poppins-v20-latin-regular.woff2` | ⏭️ | binary asset |
| 1294 | `apps/dwa/docs/soloframehub-website/assets/images/THE SOLO FOUNDER'S AI DOMINANCE-BVoatvat.jpg` | ⏭️ | binary asset |
| 1295 | `apps/dwa/docs/soloframehub-website/assets/images/THE SOLO FOUNDER'S AI DOMINANCE.jpg` | ⏭️ | binary asset |
| 1296 | `apps/dwa/docs/soloframehub-website/assets/images/THE SOLO FOUNDER'S AI REVOLUTION-BqcfcIE5.jpg` | ⏭️ | binary asset |
| 1297 | `apps/dwa/docs/soloframehub-website/assets/images/THE SOLO FOUNDER'S AI REVOLUTION.jpg` | ⏭️ | binary asset |
| 1298 | `apps/dwa/docs/soloframehub-website/assets/images/The Solo Founder's Al Playbook-CzeP4O3w.jpg` | ⏭️ | binary asset |
| 1299 | `apps/dwa/docs/soloframehub-website/assets/images/The Solo Founder's Al Playbook.jpg` | ⏭️ | binary asset |
| 1300 | `apps/dwa/docs/soloframehub-website/assets/images/ai-roleplay-sales-academy.webp` | ⏭️ | binary asset |
| 1301 | `apps/dwa/docs/soloframehub-website/assets/images/icp-builder-mockup-RNroGrGr.png` | ⏭️ | binary asset |
| 1302 | `apps/dwa/docs/soloframehub-website/assets/images/icp-builder-mockup.png` | ⏭️ | binary asset |
| 1303 | `apps/dwa/docs/soloframehub-website/assets/images/integrated-intelligence.webp` | ⏭️ | binary asset |
| 1304 | `apps/dwa/docs/soloframehub-website/assets/images/pipeline-state-machine-mockup.webp` | ⏭️ | binary asset |
| 1305 | `apps/dwa/docs/soloframehub-website/assets/images/soloframeHubLogo-kE1xy1EH.png` | ⏭️ | binary asset |
| 1306 | `apps/dwa/docs/soloframehub-website/assets/images/soloframeHubLogo.png` | ⏭️ | binary asset |
| 1307 | `apps/dwa/docs/soloframehub-website/assets/images/soloframehub-logo-main.png` | ⏭️ | binary asset |
| 1308 | `apps/dwa/docs/soloframehub-website/assets/images/soloframehub-site-icon-DqxkSNUD.png` | ⏭️ | binary asset |
| 1309 | `apps/dwa/docs/soloframehub-website/assets/images/soloframehub-site-icon.png` | ⏭️ | binary asset |
| 1310 | `apps/dwa/docs/soloframehub-website/assets/images/soloframehublogo.jpg` | ⏭️ | binary asset |
| 1311 | `apps/dwa/docs/soloframehub-website/assets/images/traditional video lesson.jpg` | ⏭️ | binary asset |
| 1312 | `apps/dwa/docs/soloframehub-website/assets/images/traditional-lesson.png` | ⏭️ | binary asset |
| 1313 | `apps/dwa/docs/soloframehub-website/assets/js/main-ZXJkhpVc.js` | ⏳ | pending |
| 1314 | `apps/dwa/docs/soloframehub-website/assets/js/main-ZXJkhpVc.js.br` | ⏭️ | binary asset |
| 1315 | `apps/dwa/docs/soloframehub-website/assets/js/main-ZXJkhpVc.js.gz` | ⏭️ | binary asset |
| 1316 | `apps/dwa/docs/soloframehub-website/assets/main-DyzhHRE5.css` | ⏳ | pending |
| 1317 | `apps/dwa/docs/soloframehub-website/assets/main-DyzhHRE5.css.br` | ⏭️ | binary asset |
| 1318 | `apps/dwa/docs/soloframehub-website/assets/main-DyzhHRE5.css.gz` | ⏭️ | binary asset |
| 1319 | `apps/dwa/docs/soloframehub-website/assets/tailwind-BMYBDeOU.css` | ⏳ | pending |
| 1320 | `apps/dwa/docs/soloframehub-website/assets/tailwind-BMYBDeOU.css.br` | ⏭️ | binary asset |
| 1321 | `apps/dwa/docs/soloframehub-website/assets/tailwind-BMYBDeOU.css.gz` | ⏭️ | binary asset |
| 1322 | `apps/dwa/docs/soloframehub-website/community-forums.html` | ⏳ | pending |
| 1323 | `apps/dwa/docs/soloframehub-website/index 2.html` | ⏳ | pending |
| 1324 | `apps/dwa/docs/soloframehub-website/index.html` | ⏳ | pending |
| 1325 | `apps/dwa/docs/soloframehub-website/platform-architecture.html` | ⏳ | pending |
| 1326 | `apps/dwa/docs/soloframehub-website/solo-founder-apps.html` | ⏳ | pending |
| 1327 | `apps/dwa/docs/soloframehub-website/solo-founders-ai-60-day-roadmap-book.html` | ⏳ | pending |
| 1328 | `apps/dwa/docs/soloframehub-website/solo-founders-ai-gtm-academy.html` | ⏳ | pending |
| 1329 | `apps/dwa/docs/soloframehub-website/solo-founders-ai-playbook.html` | ⏳ | pending |
| 1330 | `apps/dwa/docs/soloframehub-website/solo-founders-ai-startup-academy.html` | ⏳ | pending |
| 1331 | `apps/dwa/docs/soloframehub-website/solo-founders-lead-gen-sales-academy.html` | ⏳ | pending |
| 1332 | `apps/dwa/docs/soloframehub-website/tailwind_theme/tailwind.css` | ⏳ | pending |
| 1333 | `apps/dwa/docs/soloframehub-website/updated-course-pages/BUILD-SYSTEM-COMPLETE.md` | ⏳ | pending |
| 1334 | `apps/dwa/docs/soloframehub-website/updated-course-pages/BUILD-SYSTEM-MIGRATION.md` | ⏳ | pending |
| 1335 | `apps/dwa/docs/soloframehub-website/updated-course-pages/OPTIMIZATION-SUMMARY.md` | ⏳ | pending |
| 1336 | `apps/dwa/docs/soloframehub-website/updated-course-pages/QUICK-START.md` | ⏳ | pending |
| 1337 | `apps/dwa/docs/soloframehub-website/updated-course-pages/academy-homepage.html` | ⏳ | pending |
| 1338 | `apps/dwa/docs/soloframehub-website/updated-course-pages/course-page.html` | ⏳ | pending |
| 1339 | `apps/dwa/docs/soloframehub-website/updated-course-pages/founder-profile.html` | ⏳ | pending |
| 1340 | `apps/dwa/docs/soloframehub-website/updated-course-pages/lesson-page.html` | ⏳ | pending |
| 1341 | `apps/dwa/docs/soloframehub-website/updated-course-pages/soloframehub-academies-page.html` | ⏳ | pending |
| 1342 | `apps/dwa/docs/soloframehub-website/updated-course-pages/website-optimization-analysis.md` | ⏳ | pending |
| 1343 | `apps/dwa/docs/stellar-next.zip` | ⏭️ | binary asset |
| 1344 | `apps/dwa/docs/stellar-next/.gitignore` | ⏳ | pending |
| 1345 | `apps/dwa/docs/stellar-next/.vscode/settings.json` | ⏳ | pending |
| 1346 | `apps/dwa/docs/stellar-next/CHANGELOG.md` | ⏳ | pending |
| 1347 | `apps/dwa/docs/stellar-next/README.md` | ⏳ | pending |
| 1348 | `apps/dwa/docs/stellar-next/app/(auth)/auth-logo.tsx` | ⏳ | pending |
| 1349 | `apps/dwa/docs/stellar-next/app/(auth)/layout.tsx` | ⏳ | pending |
| 1350 | `apps/dwa/docs/stellar-next/app/(auth)/reset-password/page.tsx` | ⏳ | pending |
| 1351 | `apps/dwa/docs/stellar-next/app/(auth)/signin/page.tsx` | ⏳ | pending |
| 1352 | `apps/dwa/docs/stellar-next/app/(auth)/signup/page.tsx` | ⏳ | pending |
| 1353 | `apps/dwa/docs/stellar-next/app/(default)/about/page.tsx` | ⏳ | pending |
| 1354 | `apps/dwa/docs/stellar-next/app/(default)/changelog/page.tsx` | ⏳ | pending |
| 1355 | `apps/dwa/docs/stellar-next/app/(default)/changelog/post-item.tsx` | ⏳ | pending |
| 1356 | `apps/dwa/docs/stellar-next/app/(default)/customers/customers-list.tsx` | ⏳ | pending |
| 1357 | `apps/dwa/docs/stellar-next/app/(default)/customers/page.tsx` | ⏳ | pending |
| 1358 | `apps/dwa/docs/stellar-next/app/(default)/customers/single-post/page.tsx` | ⏳ | pending |
| 1359 | `apps/dwa/docs/stellar-next/app/(default)/customers/single-post/related-posts.tsx` | ⏳ | pending |
| 1360 | `apps/dwa/docs/stellar-next/app/(default)/integrations/integrations-list.tsx` | ⏳ | pending |
| 1361 | `apps/dwa/docs/stellar-next/app/(default)/integrations/integrations-section.tsx` | ⏳ | pending |
| 1362 | `apps/dwa/docs/stellar-next/app/(default)/integrations/page.tsx` | ⏳ | pending |
| 1363 | `apps/dwa/docs/stellar-next/app/(default)/integrations/single-post/page.tsx` | ⏳ | pending |
| 1364 | `apps/dwa/docs/stellar-next/app/(default)/layout.tsx` | ⏳ | pending |
| 1365 | `apps/dwa/docs/stellar-next/app/(default)/page.tsx` | ⏳ | pending |
| 1366 | `apps/dwa/docs/stellar-next/app/(default)/pricing-section.tsx` | ⏳ | pending |
| 1367 | `apps/dwa/docs/stellar-next/app/(default)/pricing/page.tsx` | ⏳ | pending |
| 1368 | `apps/dwa/docs/stellar-next/app/(default)/pricing/pricing-section.tsx` | ⏳ | pending |
| 1369 | `apps/dwa/docs/stellar-next/app/api/hello/route.ts` | ⏳ | pending |
| 1370 | `apps/dwa/docs/stellar-next/app/css/additional-styles/theme.css` | ⏳ | pending |
| 1371 | `apps/dwa/docs/stellar-next/app/css/additional-styles/utility-patterns.css` | ⏳ | pending |
| 1372 | `apps/dwa/docs/stellar-next/app/css/style.css` | ⏳ | pending |
| 1373 | `apps/dwa/docs/stellar-next/app/layout.tsx` | ⏳ | pending |
| 1374 | `apps/dwa/docs/stellar-next/components/clients.tsx` | ⏳ | pending |
| 1375 | `apps/dwa/docs/stellar-next/components/cta-02.tsx` | ⏳ | pending |
| 1376 | `apps/dwa/docs/stellar-next/components/cta-03.tsx` | ⏳ | pending |
| 1377 | `apps/dwa/docs/stellar-next/components/cta.tsx` | ⏳ | pending |
| 1378 | `apps/dwa/docs/stellar-next/components/customers.tsx` | ⏳ | pending |
| 1379 | `apps/dwa/docs/stellar-next/components/faqs.tsx` | ⏳ | pending |
| 1380 | `apps/dwa/docs/stellar-next/components/features-02.tsx` | ⏳ | pending |
| 1381 | `apps/dwa/docs/stellar-next/components/features-03.tsx` | ⏳ | pending |
| 1382 | `apps/dwa/docs/stellar-next/components/features-04.tsx` | ⏳ | pending |
| 1383 | `apps/dwa/docs/stellar-next/components/features-05.tsx` | ⏳ | pending |
| 1384 | `apps/dwa/docs/stellar-next/components/features.tsx` | ⏳ | pending |
| 1385 | `apps/dwa/docs/stellar-next/components/hero-about.tsx` | ⏳ | pending |
| 1386 | `apps/dwa/docs/stellar-next/components/hero.tsx` | ⏳ | pending |
| 1387 | `apps/dwa/docs/stellar-next/components/highlighter.tsx` | ⏳ | pending |
| 1388 | `apps/dwa/docs/stellar-next/components/integrations-carousel.tsx` | ⏳ | pending |
| 1389 | `apps/dwa/docs/stellar-next/components/mdx/image.tsx` | ⏳ | pending |
| 1390 | `apps/dwa/docs/stellar-next/components/mdx/link.tsx` | ⏳ | pending |
| 1391 | `apps/dwa/docs/stellar-next/components/mdx/mdx.tsx` | ⏳ | pending |
| 1392 | `apps/dwa/docs/stellar-next/components/mdx/utils.ts` | ⏳ | pending |
| 1393 | `apps/dwa/docs/stellar-next/components/particles.tsx` | ⏳ | pending |
| 1394 | `apps/dwa/docs/stellar-next/components/post-date.tsx` | ⏳ | pending |
| 1395 | `apps/dwa/docs/stellar-next/components/pricing.tsx` | ⏳ | pending |
| 1396 | `apps/dwa/docs/stellar-next/components/recruitment.tsx` | ⏳ | pending |
| 1397 | `apps/dwa/docs/stellar-next/components/story.tsx` | ⏳ | pending |
| 1398 | `apps/dwa/docs/stellar-next/components/team.tsx` | ⏳ | pending |
| 1399 | `apps/dwa/docs/stellar-next/components/testimonials-02.tsx` | ⏳ | pending |
| 1400 | `apps/dwa/docs/stellar-next/components/testimonials-carousel.tsx` | ⏳ | pending |
| 1401 | `apps/dwa/docs/stellar-next/components/testimonials.tsx` | ⏳ | pending |
| 1402 | `apps/dwa/docs/stellar-next/components/ui/footer.tsx` | ⏳ | pending |
| 1403 | `apps/dwa/docs/stellar-next/components/ui/header.tsx` | ⏳ | pending |
| 1404 | `apps/dwa/docs/stellar-next/components/ui/logo.tsx` | ⏳ | pending |
| 1405 | `apps/dwa/docs/stellar-next/components/ui/mobile-menu.tsx` | ⏳ | pending |
| 1406 | `apps/dwa/docs/stellar-next/components/utils/mouse-position.tsx` | ⏳ | pending |
| 1407 | `apps/dwa/docs/stellar-next/content/update/new-cloud-architecture.mdx` | ⏳ | pending |
| 1408 | `apps/dwa/docs/stellar-next/content/update/refreshed-main-menu-navigation.mdx` | ⏳ | pending |
| 1409 | `apps/dwa/docs/stellar-next/content/update/updates-to-the-filtering-api.mdx` | ⏳ | pending |
| 1410 | `apps/dwa/docs/stellar-next/content/update/weekly-update-stellar-x.mdx` | ⏳ | pending |
| 1411 | `apps/dwa/docs/stellar-next/next.config.js` | ⏳ | pending |
| 1412 | `apps/dwa/docs/stellar-next/package.json` | ⏳ | pending |
| 1413 | `apps/dwa/docs/stellar-next/postcss.config.js` | ⏳ | pending |
| 1414 | `apps/dwa/docs/stellar-next/public/favicon.ico` | ⏭️ | binary asset |
| 1415 | `apps/dwa/docs/stellar-next/public/images/about-icon.svg` | ⏭️ | binary asset |
| 1416 | `apps/dwa/docs/stellar-next/public/images/about-illustration.svg` | ⏭️ | binary asset |
| 1417 | `apps/dwa/docs/stellar-next/public/images/auth-illustration.svg` | ⏭️ | binary asset |
| 1418 | `apps/dwa/docs/stellar-next/public/images/avatar-01.jpg` | ⏭️ | binary asset |
| 1419 | `apps/dwa/docs/stellar-next/public/images/avatar-02.jpg` | ⏭️ | binary asset |
| 1420 | `apps/dwa/docs/stellar-next/public/images/avatar-03.jpg` | ⏭️ | binary asset |
| 1421 | `apps/dwa/docs/stellar-next/public/images/avatar-04.jpg` | ⏭️ | binary asset |
| 1422 | `apps/dwa/docs/stellar-next/public/images/avatar-05.jpg` | ⏭️ | binary asset |
| 1423 | `apps/dwa/docs/stellar-next/public/images/avatar-06.jpg` | ⏭️ | binary asset |
| 1424 | `apps/dwa/docs/stellar-next/public/images/avatar-07.jpg` | ⏭️ | binary asset |
| 1425 | `apps/dwa/docs/stellar-next/public/images/avatar-08.jpg` | ⏭️ | binary asset |
| 1426 | `apps/dwa/docs/stellar-next/public/images/avatar-09.jpg` | ⏭️ | binary asset |
| 1427 | `apps/dwa/docs/stellar-next/public/images/avatar-10.jpg` | ⏭️ | binary asset |
| 1428 | `apps/dwa/docs/stellar-next/public/images/avatar-11.jpg` | ⏭️ | binary asset |
| 1429 | `apps/dwa/docs/stellar-next/public/images/avatar-12.jpg` | ⏭️ | binary asset |
| 1430 | `apps/dwa/docs/stellar-next/public/images/avatar-13.jpg` | ⏭️ | binary asset |
| 1431 | `apps/dwa/docs/stellar-next/public/images/avatar-14.jpg` | ⏭️ | binary asset |
| 1432 | `apps/dwa/docs/stellar-next/public/images/avatar-15.jpg` | ⏭️ | binary asset |
| 1433 | `apps/dwa/docs/stellar-next/public/images/avatar-16.jpg` | ⏭️ | binary asset |
| 1434 | `apps/dwa/docs/stellar-next/public/images/avatar-17.jpg` | ⏭️ | binary asset |
| 1435 | `apps/dwa/docs/stellar-next/public/images/avatar-18.jpg` | ⏭️ | binary asset |
| 1436 | `apps/dwa/docs/stellar-next/public/images/avatar-19.jpg` | ⏭️ | binary asset |
| 1437 | `apps/dwa/docs/stellar-next/public/images/carousel-icon-01.svg` | ⏭️ | binary asset |
| 1438 | `apps/dwa/docs/stellar-next/public/images/carousel-icon-02.svg` | ⏭️ | binary asset |
| 1439 | `apps/dwa/docs/stellar-next/public/images/carousel-icon-03.svg` | ⏭️ | binary asset |
| 1440 | `apps/dwa/docs/stellar-next/public/images/carousel-icon-04.svg` | ⏭️ | binary asset |
| 1441 | `apps/dwa/docs/stellar-next/public/images/carousel-icon-05.svg` | ⏭️ | binary asset |
| 1442 | `apps/dwa/docs/stellar-next/public/images/changelog-01.png` | ⏭️ | binary asset |
| 1443 | `apps/dwa/docs/stellar-next/public/images/changelog-02.png` | ⏭️ | binary asset |
| 1444 | `apps/dwa/docs/stellar-next/public/images/changelog-03.png` | ⏭️ | binary asset |
| 1445 | `apps/dwa/docs/stellar-next/public/images/changelog-04.png` | ⏭️ | binary asset |
| 1446 | `apps/dwa/docs/stellar-next/public/images/client-01.svg` | ⏭️ | binary asset |
| 1447 | `apps/dwa/docs/stellar-next/public/images/client-02.svg` | ⏭️ | binary asset |
| 1448 | `apps/dwa/docs/stellar-next/public/images/client-03.svg` | ⏭️ | binary asset |
| 1449 | `apps/dwa/docs/stellar-next/public/images/client-04.svg` | ⏭️ | binary asset |
| 1450 | `apps/dwa/docs/stellar-next/public/images/client-05.svg` | ⏭️ | binary asset |
| 1451 | `apps/dwa/docs/stellar-next/public/images/client-06.svg` | ⏭️ | binary asset |
| 1452 | `apps/dwa/docs/stellar-next/public/images/client-07.svg` | ⏭️ | binary asset |
| 1453 | `apps/dwa/docs/stellar-next/public/images/client-08.svg` | ⏭️ | binary asset |
| 1454 | `apps/dwa/docs/stellar-next/public/images/client-09.svg` | ⏭️ | binary asset |
| 1455 | `apps/dwa/docs/stellar-next/public/images/customer-01.jpg` | ⏭️ | binary asset |
| 1456 | `apps/dwa/docs/stellar-next/public/images/customer-01.svg` | ⏭️ | binary asset |
| 1457 | `apps/dwa/docs/stellar-next/public/images/customer-02.jpg` | ⏭️ | binary asset |
| 1458 | `apps/dwa/docs/stellar-next/public/images/customer-02.svg` | ⏭️ | binary asset |
| 1459 | `apps/dwa/docs/stellar-next/public/images/customer-03.jpg` | ⏭️ | binary asset |
| 1460 | `apps/dwa/docs/stellar-next/public/images/customer-03.svg` | ⏭️ | binary asset |
| 1461 | `apps/dwa/docs/stellar-next/public/images/customer-04.jpg` | ⏭️ | binary asset |
| 1462 | `apps/dwa/docs/stellar-next/public/images/customer-04.svg` | ⏭️ | binary asset |
| 1463 | `apps/dwa/docs/stellar-next/public/images/customer-05.jpg` | ⏭️ | binary asset |
| 1464 | `apps/dwa/docs/stellar-next/public/images/customer-05.svg` | ⏭️ | binary asset |
| 1465 | `apps/dwa/docs/stellar-next/public/images/customer-06.jpg` | ⏭️ | binary asset |
| 1466 | `apps/dwa/docs/stellar-next/public/images/customer-06.svg` | ⏭️ | binary asset |
| 1467 | `apps/dwa/docs/stellar-next/public/images/customer-07.jpg` | ⏭️ | binary asset |
| 1468 | `apps/dwa/docs/stellar-next/public/images/customer-07.svg` | ⏭️ | binary asset |
| 1469 | `apps/dwa/docs/stellar-next/public/images/customer-08.jpg` | ⏭️ | binary asset |
| 1470 | `apps/dwa/docs/stellar-next/public/images/customer-08.svg` | ⏭️ | binary asset |
| 1471 | `apps/dwa/docs/stellar-next/public/images/customer-09.jpg` | ⏭️ | binary asset |
| 1472 | `apps/dwa/docs/stellar-next/public/images/customer-09.svg` | ⏭️ | binary asset |
| 1473 | `apps/dwa/docs/stellar-next/public/images/customer-10.svg` | ⏭️ | binary asset |
| 1474 | `apps/dwa/docs/stellar-next/public/images/customer-avatar-01.jpg` | ⏭️ | binary asset |
| 1475 | `apps/dwa/docs/stellar-next/public/images/customer-avatar-02.jpg` | ⏭️ | binary asset |
| 1476 | `apps/dwa/docs/stellar-next/public/images/customer-avatar-03.jpg` | ⏭️ | binary asset |
| 1477 | `apps/dwa/docs/stellar-next/public/images/customer-badge.svg` | ⏭️ | binary asset |
| 1478 | `apps/dwa/docs/stellar-next/public/images/customer-bg-01.png` | ⏭️ | binary asset |
| 1479 | `apps/dwa/docs/stellar-next/public/images/customer-bg-02.png` | ⏭️ | binary asset |
| 1480 | `apps/dwa/docs/stellar-next/public/images/customer-bg-03.png` | ⏭️ | binary asset |
| 1481 | `apps/dwa/docs/stellar-next/public/images/customer-bg-04.png` | ⏭️ | binary asset |
| 1482 | `apps/dwa/docs/stellar-next/public/images/customer-bg-05.png` | ⏭️ | binary asset |
| 1483 | `apps/dwa/docs/stellar-next/public/images/customer-bg-06.png` | ⏭️ | binary asset |
| 1484 | `apps/dwa/docs/stellar-next/public/images/customer-bg-07.png` | ⏭️ | binary asset |
| 1485 | `apps/dwa/docs/stellar-next/public/images/customer-bg-08.png` | ⏭️ | binary asset |
| 1486 | `apps/dwa/docs/stellar-next/public/images/customer-bg-09.png` | ⏭️ | binary asset |
| 1487 | `apps/dwa/docs/stellar-next/public/images/customer-bg-10.png` | ⏭️ | binary asset |
| 1488 | `apps/dwa/docs/stellar-next/public/images/feature-image-01.png` | ⏭️ | binary asset |
| 1489 | `apps/dwa/docs/stellar-next/public/images/feature-image-02.png` | ⏭️ | binary asset |
| 1490 | `apps/dwa/docs/stellar-next/public/images/feature-image-03.png` | ⏭️ | binary asset |
| 1491 | `apps/dwa/docs/stellar-next/public/images/feature-image-04.png` | ⏭️ | binary asset |
| 1492 | `apps/dwa/docs/stellar-next/public/images/glow-bottom.svg` | ⏭️ | binary asset |
| 1493 | `apps/dwa/docs/stellar-next/public/images/glow-top.svg` | ⏭️ | binary asset |
| 1494 | `apps/dwa/docs/stellar-next/public/images/integration-image.png` | ⏭️ | binary asset |
| 1495 | `apps/dwa/docs/stellar-next/public/images/integrations-01.svg` | ⏭️ | binary asset |
| 1496 | `apps/dwa/docs/stellar-next/public/images/integrations-02.svg` | ⏭️ | binary asset |
| 1497 | `apps/dwa/docs/stellar-next/public/images/integrations-03.svg` | ⏭️ | binary asset |
| 1498 | `apps/dwa/docs/stellar-next/public/images/integrations-04.svg` | ⏭️ | binary asset |
| 1499 | `apps/dwa/docs/stellar-next/public/images/integrations-05.svg` | ⏭️ | binary asset |
| 1500 | `apps/dwa/docs/stellar-next/public/images/integrations-06.svg` | ⏭️ | binary asset |
| 1501 | `apps/dwa/docs/stellar-next/public/images/integrations-07.svg` | ⏭️ | binary asset |
| 1502 | `apps/dwa/docs/stellar-next/public/images/integrations-08.svg` | ⏭️ | binary asset |
| 1503 | `apps/dwa/docs/stellar-next/public/images/integrations-09.svg` | ⏭️ | binary asset |
| 1504 | `apps/dwa/docs/stellar-next/public/images/integrations-10.svg` | ⏭️ | binary asset |
| 1505 | `apps/dwa/docs/stellar-next/public/images/integrations-11.svg` | ⏭️ | binary asset |
| 1506 | `apps/dwa/docs/stellar-next/public/images/integrations-12.svg` | ⏭️ | binary asset |
| 1507 | `apps/dwa/docs/stellar-next/public/images/integrations-13.svg` | ⏭️ | binary asset |
| 1508 | `apps/dwa/docs/stellar-next/public/images/integrations-14.svg` | ⏭️ | binary asset |
| 1509 | `apps/dwa/docs/stellar-next/public/images/integrations-15.svg` | ⏭️ | binary asset |
| 1510 | `apps/dwa/docs/stellar-next/public/images/integrations-16.svg` | ⏭️ | binary asset |
| 1511 | `apps/dwa/docs/stellar-next/public/images/integrations-17.svg` | ⏭️ | binary asset |
| 1512 | `apps/dwa/docs/stellar-next/public/images/integrations-18.svg` | ⏭️ | binary asset |
| 1513 | `apps/dwa/docs/stellar-next/public/images/integrations-19.svg` | ⏭️ | binary asset |
| 1514 | `apps/dwa/docs/stellar-next/public/images/integrations-20.svg` | ⏭️ | binary asset |
| 1515 | `apps/dwa/docs/stellar-next/public/images/integrations-21.svg` | ⏭️ | binary asset |
| 1516 | `apps/dwa/docs/stellar-next/public/images/integrations-22.svg` | ⏭️ | binary asset |
| 1517 | `apps/dwa/docs/stellar-next/public/images/integrations-23.svg` | ⏭️ | binary asset |
| 1518 | `apps/dwa/docs/stellar-next/public/images/integrations-24.svg` | ⏭️ | binary asset |
| 1519 | `apps/dwa/docs/stellar-next/public/images/logo.svg` | ⏭️ | binary asset |
| 1520 | `apps/dwa/docs/stellar-next/public/images/page-illustration-02.svg` | ⏭️ | binary asset |
| 1521 | `apps/dwa/docs/stellar-next/public/images/page-illustration.svg` | ⏭️ | binary asset |
| 1522 | `apps/dwa/docs/stellar-next/public/images/post-avatar.jpg` | ⏭️ | binary asset |
| 1523 | `apps/dwa/docs/stellar-next/public/images/pricing-icon-01.svg` | ⏭️ | binary asset |
| 1524 | `apps/dwa/docs/stellar-next/public/images/pricing-icon-02.svg` | ⏭️ | binary asset |
| 1525 | `apps/dwa/docs/stellar-next/public/images/pricing-icon-03.svg` | ⏭️ | binary asset |
| 1526 | `apps/dwa/docs/stellar-next/public/images/pricing-icon-04.svg` | ⏭️ | binary asset |
| 1527 | `apps/dwa/docs/stellar-next/public/images/pricing-icon-05.svg` | ⏭️ | binary asset |
| 1528 | `apps/dwa/docs/stellar-next/public/images/pricing-icon-06.svg` | ⏭️ | binary asset |
| 1529 | `apps/dwa/docs/stellar-next/public/images/pricing-icon-07.svg` | ⏭️ | binary asset |
| 1530 | `apps/dwa/docs/stellar-next/public/images/pricing-illustration-top.svg` | ⏭️ | binary asset |
| 1531 | `apps/dwa/docs/stellar-next/public/images/pricing-illustration.svg` | ⏭️ | binary asset |
| 1532 | `apps/dwa/docs/stellar-next/public/images/recruitment-01.jpg` | ⏭️ | binary asset |
| 1533 | `apps/dwa/docs/stellar-next/public/images/recruitment-02.jpg` | ⏭️ | binary asset |
| 1534 | `apps/dwa/docs/stellar-next/public/images/recruitment-03.jpg` | ⏭️ | binary asset |
| 1535 | `apps/dwa/docs/stellar-next/public/images/recruitment-04.jpg` | ⏭️ | binary asset |
| 1536 | `apps/dwa/docs/stellar-next/public/images/star.svg` | ⏭️ | binary asset |
| 1537 | `apps/dwa/docs/stellar-next/public/images/team-01.png` | ⏭️ | binary asset |
| 1538 | `apps/dwa/docs/stellar-next/public/images/team-02.png` | ⏭️ | binary asset |
| 1539 | `apps/dwa/docs/stellar-next/public/images/team-03.png` | ⏭️ | binary asset |
| 1540 | `apps/dwa/docs/stellar-next/public/images/team-04.png` | ⏭️ | binary asset |
| 1541 | `apps/dwa/docs/stellar-next/public/images/team-05.png` | ⏭️ | binary asset |
| 1542 | `apps/dwa/docs/stellar-next/public/images/team-06.png` | ⏭️ | binary asset |
| 1543 | `apps/dwa/docs/stellar-next/public/images/team-07.png` | ⏭️ | binary asset |
| 1544 | `apps/dwa/docs/stellar-next/public/images/team-08.png` | ⏭️ | binary asset |
| 1545 | `apps/dwa/docs/stellar-next/public/images/team-09.png` | ⏭️ | binary asset |
| 1546 | `apps/dwa/docs/stellar-next/public/images/team-10.png` | ⏭️ | binary asset |
| 1547 | `apps/dwa/docs/stellar-next/public/images/team-11.png` | ⏭️ | binary asset |
| 1548 | `apps/dwa/docs/stellar-next/public/images/team-12.png` | ⏭️ | binary asset |
| 1549 | `apps/dwa/docs/stellar-next/public/images/team-13.png` | ⏭️ | binary asset |
| 1550 | `apps/dwa/docs/stellar-next/public/images/team-14.png` | ⏭️ | binary asset |
| 1551 | `apps/dwa/docs/stellar-next/public/images/team-15.png` | ⏭️ | binary asset |
| 1552 | `apps/dwa/docs/stellar-next/public/images/team-16.png` | ⏭️ | binary asset |
| 1553 | `apps/dwa/docs/stellar-next/public/images/team-17.png` | ⏭️ | binary asset |
| 1554 | `apps/dwa/docs/stellar-next/public/images/team-18.png` | ⏭️ | binary asset |
| 1555 | `apps/dwa/docs/stellar-next/public/images/team-19.png` | ⏭️ | binary asset |
| 1556 | `apps/dwa/docs/stellar-next/public/images/team-20.png` | ⏭️ | binary asset |
| 1557 | `apps/dwa/docs/stellar-next/public/images/team.jpg` | ⏭️ | binary asset |
| 1558 | `apps/dwa/docs/stellar-next/public/images/testimonial-01.jpg` | ⏭️ | binary asset |
| 1559 | `apps/dwa/docs/stellar-next/public/images/testimonial-01.png` | ⏭️ | binary asset |
| 1560 | `apps/dwa/docs/stellar-next/public/images/testimonial-02.jpg` | ⏭️ | binary asset |
| 1561 | `apps/dwa/docs/stellar-next/public/images/testimonial-02.png` | ⏭️ | binary asset |
| 1562 | `apps/dwa/docs/stellar-next/public/images/testimonial-03.jpg` | ⏭️ | binary asset |
| 1563 | `apps/dwa/docs/stellar-next/public/images/testimonial-03.png` | ⏭️ | binary asset |
| 1564 | `apps/dwa/docs/stellar-next/tsconfig.json` | ⏳ | pending |
| 1565 | `apps/dwa/docs/tidy-next.zip` | ⏭️ | binary asset |
| 1566 | `apps/dwa/docs/token-optimization.md` | ⏳ | pending |
| 1567 | `apps/dwa/docs/update-context/EXECUTION_PACKAGE_SUMMARY.md` | ⏳ | pending |
| 1568 | `apps/dwa/docs/update-context/Lesson_By_Lesson_Update_Checklist.md` | ⏳ | pending |
| 1569 | `apps/dwa/docs/update-context/Progress_Tracker.md` | ⏳ | pending |
| 1570 | `apps/dwa/docs/update-context/Quick_Reference_Update_Guide.md` | ⏳ | pending |
| 1571 | `apps/dwa/docs/update-context/SAMPLE_Bootstrap_Marketing_Lesson_3.md` | ⏳ | pending |
| 1572 | `apps/dwa/docs/update-context/Track_2_Update_Guide_Bootstrap_Marketing.md` | ⏳ | pending |
| 1573 | `apps/dwa/docs/update-context/courses-that-need-to-be-created.md` | ⏳ | pending |
| 1574 | `apps/dwa/docs/v3-update-research-Nebius/01_DISTRESS_CLASSIFIER_IMPLEMENTATION.md` | ⏳ | pending |
| 1575 | `apps/dwa/docs/v3-update-research-Nebius/02_CLOUD_ARCHITECTURE_STRATEGY.md` | ⏳ | pending |
| 1576 | `apps/dwa/docs/v3-update-research-Nebius/04_ML_INTEGRATION_STRATEGY.md` | ⏳ | pending |
| 1577 | `apps/dwa/docs/v3-update-research-Nebius/05_AI_SYSTEMS_CURRENT_STATE.md` | ⏳ | pending |
| 1578 | `apps/dwa/docs/v3-update-research-Nebius/06_ML_RESEARCH_LANDSCAPE.md` | ⏳ | pending |
| 1579 | `apps/dwa/docs/v3-update-research-Nebius/5k in gpu credits are meaningless.md` | ⏳ | pending |
| 1580 | `apps/dwa/docs/v3-update-research-Nebius/Digital Wellness Academy — Comprehensive Platform Specification (1).md` | ⏳ | pending |
| 1581 | `apps/dwa/docs/v3-update-research-Nebius/Digital Wellness Academy — Comprehensive Platform Specification.md` | ⏳ | pending |
| 1582 | `apps/dwa/docs/v3-update-research-Nebius/Digital Wellness Academy — Target Licensee Market Analysis.md` | ⏳ | pending |
| 1583 | `apps/dwa/docs/v3-update-research-Nebius/Digital-Mental-Health-Platform-Transforming-Psychiatric-Care-Through-Technology.pdf` | ⏭️ | binary asset |
| 1584 | `apps/dwa/docs/v3-update-research-Nebius/I can easily build these capabilities on my existi.md` | ⏳ | pending |
| 1585 | `apps/dwa/docs/v3-update-research-Nebius/Nebius AI Discovery Award 2026 — Application Strategy for Digital Wellness Academy.md` | ⏳ | pending |
| 1586 | `apps/dwa/docs/v3-update-research-Nebius/_Plan-Generate-training-data-for-maia-classifiers.md` | ⏳ | pending |
| 1587 | `apps/dwa/docs/v3-update-research-Nebius/i built this to get away from learnworlds, explain.md` | ⏳ | pending |
| 1588 | `apps/dwa/docs/v3-update-research-Nebius/mhe-upgrade-needs-analysis.md` | ⏳ | pending |
| 1589 | `apps/dwa/docs/v3-update-research-Nebius/no, just layout all the features and capabilities.md` | ⏳ | pending |
| 1590 | `apps/dwa/docs/v3-update-research-Nebius/recent chats reveal the status of this mental heal.md` | ⏳ | pending |
| 1591 | `apps/dwa/docs/v3-update-research-Nebius/what companies do you think i'm competing against.md` | ⏳ | pending |
| 1592 | `apps/dwa/docs/word-count-analysis.json` | ⏳ | pending |
| 1593 | `apps/dwa/e2e/all-lessons-render.spec.ts` | ✅ | slice 04 |
| 1594 | `apps/dwa/e2e/api.spec.ts` | 🔍 | slice 04 — B-049..B-058 |
| 1595 | `apps/dwa/e2e/auth.spec.ts` | ✅ | slice 04 |
| 1596 | `apps/dwa/e2e/courses.spec.ts` | ✅ | slice 04 |
| 1597 | `apps/dwa/e2e/dashboard.spec.ts` | ✅ | slice 04 |
| 1598 | `apps/dwa/e2e/error-handling-and-accessibility.spec.ts` | ✅ | slice 04 |
| 1599 | `apps/dwa/e2e/fixtures.ts` | ✅ | slice 04 |
| 1600 | `apps/dwa/e2e/helpers.ts` | ✅ | slice 04 |
| 1601 | `apps/dwa/e2e/landing.spec.ts` | ✅ | slice 04 |
| 1602 | `apps/dwa/e2e/onboarding.spec.ts` | ✅ | slice 04 |
| 1603 | `apps/dwa/e2e/provider-portal.spec.ts` | ✅ | slice 04 |
| 1604 | `apps/dwa/e2e/test-data.ts` | ✅ | slice 04 |
| 1605 | `apps/dwa/e2e/tools-and-community.spec.ts` | ✅ | slice 04 |
| 1606 | `apps/dwa/e2e/user-feedback-fixes.spec.ts` | ✅ | slice 04 |
| 1607 | `apps/dwa/e2e/wellness-coach.spec.ts` | ✅ | slice 04 |
| 1608 | `apps/dwa/eslint.config.mjs` | ✅ | slice 04 |
| 1609 | `apps/dwa/forum/Dockerfile` | 🔍 | slice 04 — B-049..B-058 |
| 1610 | `apps/dwa/forum/extensions/rps-ai-moderation/composer.json` | ✅ | slice 04 |
| 1611 | `apps/dwa/forum/extensions/rps-ai-moderation/extend.php` | ✅ | slice 04 |
| 1612 | `apps/dwa/forum/extensions/rps-ai-moderation/js/package.json` | ✅ | slice 04 |
| 1613 | `apps/dwa/forum/extensions/rps-ai-moderation/js/src/admin/index.tsx` | ✅ | slice 04 |
| 1614 | `apps/dwa/forum/extensions/rps-ai-moderation/js/tsconfig.json` | ✅ | slice 04 |
| 1615 | `apps/dwa/forum/extensions/rps-ai-moderation/js/webpack.config.js` | ✅ | slice 04 |
| 1616 | `apps/dwa/forum/extensions/rps-ai-moderation/resources/locale/en.yml` | ✅ | slice 04 |
| 1617 | `apps/dwa/forum/extensions/rps-ai-moderation/src/Listeners/PostSavingListener.php` | ✅ | slice 04 |
| 1618 | `apps/dwa/forum/extensions/rps-ai-moderation/src/Service/AiModerationClient.php` | ✅ | slice 04 |
| 1619 | `apps/dwa/forum/extensions/rps-ai-moderation/src/Service/RiskEvaluator.php` | ✅ | slice 04 |
| 1620 | `apps/dwa/generate_curriculum.py` | ✅ | slice 04 |
| 1621 | `apps/dwa/hooks/useAudioRecorder.ts` | ✅ | slice 03 |
| 1622 | `apps/dwa/hooks/useBookmarks.ts` | ✅ | slice 03 |
| 1623 | `apps/dwa/hooks/useForum.ts` | ✅ | slice 03 |
| 1624 | `apps/dwa/instrumentation.ts` | ✅ | slice 04 |
| 1625 | `apps/dwa/lib/ai/client.ts` | ✅ | slice 02 — read clean |
| 1626 | `apps/dwa/lib/ai/fetch-helpers.ts` | ✅ | slice 02 — read clean |
| 1627 | `apps/dwa/lib/ai/forum-moderation.ts` | ✅ | slice 02 — read clean |
| 1628 | `apps/dwa/lib/ai/maia-client.ts` | ✅ | slice 02 — read clean |
| 1629 | `apps/dwa/lib/ai/models.ts` | ✅ | slice 02 — read clean |
| 1630 | `apps/dwa/lib/ai/openai-coaching.ts` | ✅ | slice 02 — read clean |
| 1631 | `apps/dwa/lib/ai/openai-flows.ts` | ✅ | slice 02 — read clean |
| 1632 | `apps/dwa/lib/ai/rag.ts` | ✅ | slice 02 — read clean |
| 1633 | `apps/dwa/lib/analytics/umami.ts` | ✅ | slice 02 — read clean |
| 1634 | `apps/dwa/lib/api/client.ts` | ✅ | slice 02 — read clean |
| 1635 | `apps/dwa/lib/api/errors.ts` | ✅ | slice 02 — read clean |
| 1636 | `apps/dwa/lib/api/query-client.ts` | ✅ | slice 02 — read clean |
| 1637 | `apps/dwa/lib/api/response-utils.ts` | ✅ | slice 02 — read clean |
| 1638 | `apps/dwa/lib/api/with-auth.ts` | 🔍 | slice 02 findings (B-044..B-046) |
| 1639 | `apps/dwa/lib/api/with-moderation.ts` | ✅ | slice 02 — read clean |
| 1640 | `apps/dwa/lib/assessments.ts` | 🔍 | slice 02 findings (B-044..B-046) |
| 1641 | `apps/dwa/lib/auth-lucia.ts` | ✅ | slice 02 — read clean |
| 1642 | `apps/dwa/lib/auth.ts` | ✅ | slice 02 — read clean |
| 1643 | `apps/dwa/lib/checklists.ts` | 🔍 | slice 02 findings (B-044..B-046) |
| 1644 | `apps/dwa/lib/data/curriculum.ts` | ✅ | slice 02 — read clean |
| 1645 | `apps/dwa/lib/data/landing-curriculum.ts` | ✅ | slice 02 — read clean |
| 1646 | `apps/dwa/lib/data/onboarding-data.ts` | ✅ | slice 02 — read clean |
| 1647 | `apps/dwa/lib/data/optimization-curriculum.ts` | ✅ | slice 02 — read clean |
| 1648 | `apps/dwa/lib/data/personas.ts` | ✅ | slice 02 — read clean |
| 1649 | `apps/dwa/lib/data/terminology.ts` | ✅ | slice 02 — read clean |
| 1650 | `apps/dwa/lib/db/index.ts` | ✅ | slice 02 — read clean |
| 1651 | `apps/dwa/lib/db/retry.ts` | ✅ | slice 02 — read clean |
| 1652 | `apps/dwa/lib/db/schema.ts` | ✅ | slice 02 — read clean |
| 1653 | `apps/dwa/lib/flarum.ts` | ✅ | slice 02 — read clean |
| 1654 | `apps/dwa/lib/hooks/useClinicalStorage.ts` | ✅ | slice 02 — read clean |
| 1655 | `apps/dwa/lib/lessons.ts` | 🔍 | slice 02 findings (B-044..B-046) |
| 1656 | `apps/dwa/lib/logger.ts` | ✅ | slice 02 — read clean |
| 1657 | `apps/dwa/lib/openapi/generator.ts` | ✅ | slice 02 — read clean |
| 1658 | `apps/dwa/lib/openapi/registry.ts` | ✅ | slice 02 — read clean |
| 1659 | `apps/dwa/lib/openapi/routes/academy.ts` | ✅ | slice 02 — read clean |
| 1660 | `apps/dwa/lib/openapi/routes/ai.ts` | ✅ | slice 02 — read clean |
| 1661 | `apps/dwa/lib/openapi/routes/auth.ts` | ✅ | slice 02 — read clean |
| 1662 | `apps/dwa/lib/openapi/routes/forum.ts` | ✅ | slice 02 — read clean |
| 1663 | `apps/dwa/lib/openapi/routes/health.ts` | ✅ | slice 02 — read clean |
| 1664 | `apps/dwa/lib/openapi/routes/index.ts` | ✅ | slice 02 — read clean |
| 1665 | `apps/dwa/lib/openapi/routes/onboarding.ts` | ✅ | slice 02 — read clean |
| 1666 | `apps/dwa/lib/openapi/schemas.ts` | ✅ | slice 02 — read clean |
| 1667 | `apps/dwa/lib/pdf-worksheets.ts` | ✅ | slice 02 — read clean |
| 1668 | `apps/dwa/lib/redis.ts` | ✅ | slice 02 — read clean |
| 1669 | `apps/dwa/lib/repositories/mockProfileRepository.test.ts` | ✅ | slice 02 — read clean |
| 1670 | `apps/dwa/lib/repositories/mockProfileRepository.ts` | ✅ | slice 02 — read clean |
| 1671 | `apps/dwa/lib/repositories/postgresProfileRepository.ts` | ✅ | slice 02 — read clean |
| 1672 | `apps/dwa/lib/repositories/profileRepository.ts` | 🔍 | slice 02 findings (B-044..B-046) |
| 1673 | `apps/dwa/lib/request-context.ts` | ✅ | slice 02 — read clean |
| 1674 | `apps/dwa/lib/safety/checkDistress.ts` | ✅ | slice 02 — read clean |
| 1675 | `apps/dwa/lib/security.test.ts` | ✅ | slice 02 — read clean |
| 1676 | `apps/dwa/lib/security.ts` | 🔍 | slice 02 findings (B-044..B-046) |
| 1677 | `apps/dwa/lib/services/npiService.ts` | ✅ | slice 02 — read clean |
| 1678 | `apps/dwa/lib/services/onboardingService.ts` | ✅ | slice 02 — read clean |
| 1679 | `apps/dwa/lib/services/profileContextService.ts` | ✅ | slice 02 — read clean |
| 1680 | `apps/dwa/lib/services/profileCoreService.test.ts` | ✅ | slice 02 — read clean |
| 1681 | `apps/dwa/lib/services/profileCoreService.ts` | ✅ | slice 02 — read clean |
| 1682 | `apps/dwa/lib/services/profileService.test.ts` | ✅ | slice 02 — read clean |
| 1683 | `apps/dwa/lib/services/profileService.ts` | ✅ | slice 02 — read clean |
| 1684 | `apps/dwa/lib/services/quizService.test.ts` | ✅ | slice 02 — read clean |
| 1685 | `apps/dwa/lib/services/quizService.ts` | 🔍 | slice 02 findings (B-044..B-046) |
| 1686 | `apps/dwa/lib/services/voiceService.test.ts` | ✅ | slice 02 — read clean |
| 1687 | `apps/dwa/lib/services/voiceService.ts` | ✅ | slice 02 — read clean |
| 1688 | `apps/dwa/lib/storage/s3.ts` | ✅ | slice 02 — read clean |
| 1689 | `apps/dwa/lib/thought-records.ts` | 🔍 | slice 02 findings (B-044..B-046) |
| 1690 | `apps/dwa/lib/tracking-logs.ts` | 🔍 | slice 02 findings (B-044..B-046) |
| 1691 | `apps/dwa/lib/utils.ts` | ✅ | slice 02 — read clean |
| 1692 | `apps/dwa/lib/utils/__tests__/wellness-actions.test.ts` | ✅ | slice 02 — read clean |
| 1693 | `apps/dwa/lib/utils/__tests__/wellness-alerts.test.ts` | ✅ | slice 02 — read clean |
| 1694 | `apps/dwa/lib/utils/__tests__/wellness-scores.test.ts` | ✅ | slice 02 — read clean |
| 1695 | `apps/dwa/lib/utils/demo-accounts.ts` | ✅ | slice 02 — read clean |
| 1696 | `apps/dwa/lib/utils/lesson-engagement.ts` | 🔍 | slice 02 findings (B-044..B-046) |
| 1697 | `apps/dwa/lib/utils/object.ts` | ✅ | slice 02 — read clean |
| 1698 | `apps/dwa/lib/utils/onboarding-assessment.ts` | ✅ | slice 02 — read clean |
| 1699 | `apps/dwa/lib/utils/personalization.ts` | ✅ | slice 02 — read clean |
| 1700 | `apps/dwa/lib/utils/sanitize-jsonb.ts` | ✅ | slice 02 — read clean |
| 1701 | `apps/dwa/lib/utils/wellness-actions.ts` | ✅ | slice 02 — read clean |
| 1702 | `apps/dwa/lib/utils/wellness-alerts.ts` | ✅ | slice 02 — read clean |
| 1703 | `apps/dwa/lib/utils/wellness-scores.ts` | ✅ | slice 02 — read clean |
| 1704 | `apps/dwa/lib/validations/academy.ts` | ✅ | slice 02 — read clean |
| 1705 | `apps/dwa/lib/validations/ai.ts` | ✅ | slice 02 — read clean |
| 1706 | `apps/dwa/lib/validations/auth.ts` | ✅ | slice 02 — read clean |
| 1707 | `apps/dwa/lib/validations/clinical.ts` | ✅ | slice 02 — read clean |
| 1708 | `apps/dwa/lib/validations/forum.ts` | ✅ | slice 02 — read clean |
| 1709 | `apps/dwa/lib/validations/onboarding.ts` | ✅ | slice 02 — read clean |
| 1710 | `apps/dwa/load-tests/auth-load.js` | ⏳ | pending |
| 1711 | `apps/dwa/mental-health-refactoring-docs/AI Wellness Coach System.md` | ⏳ | pending |
| 1712 | `apps/dwa/mental-health-refactoring-docs/INTERACTIVITY.md` | ⏳ | pending |
| 1713 | `apps/dwa/mental-health-refactoring-docs/Symptom-Based Onboarding Flow.md` | ⏳ | pending |
| 1714 | `apps/dwa/mental-health-refactoring-docs/courses-research/Chronic Stress & Burnout Management.md` | ⏳ | pending |
| 1715 | `apps/dwa/mental-health-refactoring-docs/courses-research/Depression Course Research Package.md` | ⏳ | pending |
| 1716 | `apps/dwa/mental-health-refactoring-docs/courses-research/Grief & Loss: Navigating Bereavement.md` | ⏳ | pending |
| 1717 | `apps/dwa/mental-health-refactoring-docs/courses-research/Managing Anger & Irritability.md` | ⏳ | pending |
| 1718 | `apps/dwa/mental-health-refactoring-docs/courses-research/Obsessive-compulsive disorder.md` | ⏳ | pending |
| 1719 | `apps/dwa/mental-health-refactoring-docs/courses-research/Panic Disorder Course Research.md` | ⏳ | pending |
| 1720 | `apps/dwa/mental-health-refactoring-docs/courses-research/Sleep & Insomnia Course Research.md` | ⏳ | pending |
| 1721 | `apps/dwa/mental-health-refactoring-docs/courses-research/Social Anxiety Course Research.md` | ⏳ | pending |
| 1722 | `apps/dwa/mental-health-refactoring-docs/courses-research/Trauma Recovery Course Research.md` | ⏳ | pending |
| 1723 | `apps/dwa/mental-health-refactoring-docs/courses-research/anxiety-course-research-package.md` | ⏳ | pending |
| 1724 | `apps/dwa/mental-health-refactoring-docs/courses-research/course-numbers.md` | ⏳ | pending |
| 1725 | `apps/dwa/next-env.d.ts` | ✅ | slice 04 |
| 1726 | `apps/dwa/next.config.js` | ✅ | slice 04 |
| 1727 | `apps/dwa/nixpacks.toml` | 🔍 | slice 04 — B-049..B-058 |
| 1728 | `apps/dwa/package.json` | ✅ | slice 04 |
| 1729 | `apps/dwa/playwright.config.ts` | ✅ | slice 04 |
| 1730 | `apps/dwa/postcss.config.js` | ✅ | slice 04 |
| 1731 | `apps/dwa/proxy.ts` | ✅ | slice 04 |
| 1732 | `apps/dwa/public/assets/images/THE SOLO FOUNDER'S AI DOMINANCE.jpg` | ⏭️ | binary asset |
| 1733 | `apps/dwa/public/assets/images/THE SOLO FOUNDER'S AI REVOLUTION.jpg` | ⏭️ | binary asset |
| 1734 | `apps/dwa/public/assets/images/The Solo Founder's Al Playbook.jpg` | ⏭️ | binary asset |
| 1735 | `apps/dwa/public/assets/images/ai-roleplay-sales-academy.webp` | ⏭️ | binary asset |
| 1736 | `apps/dwa/public/assets/images/icp-builder-mockup.png` | ⏭️ | binary asset |
| 1737 | `apps/dwa/public/assets/images/integrated-intelligence.webp` | ⏭️ | binary asset |
| 1738 | `apps/dwa/public/assets/images/pipeline-state-machine-mockup.webp` | ⏭️ | binary asset |
| 1739 | `apps/dwa/public/assets/images/soloframeHubLogo.png` | ⏭️ | binary asset |
| 1740 | `apps/dwa/public/assets/images/soloframehub-site-icon.png` | ⏭️ | binary asset |
| 1741 | `apps/dwa/public/assets/images/soloframehublogo.jpg` | ⏭️ | binary asset |
| 1742 | `apps/dwa/public/assets/images/traditional video lesson.jpg` | ⏭️ | binary asset |
| 1743 | `apps/dwa/public/assets/images/traditional-lesson.png` | ⏭️ | binary asset |
| 1744 | `apps/dwa/public/favicon.ico` | ⏭️ | binary asset |
| 1745 | `apps/dwa/public/fonts/woff2/fonts.css` | ✅ | slice 04 |
| 1746 | `apps/dwa/public/fonts/woff2/inter-v20-latin-500.woff2` | ⏭️ | binary asset |
| 1747 | `apps/dwa/public/fonts/woff2/inter-v20-latin-500italic.woff2` | ⏭️ | binary asset |
| 1748 | `apps/dwa/public/fonts/woff2/inter-v20-latin-600.woff2` | ⏭️ | binary asset |
| 1749 | `apps/dwa/public/fonts/woff2/inter-v20-latin-italic.woff2` | ⏭️ | binary asset |
| 1750 | `apps/dwa/public/fonts/woff2/inter-v20-latin-regular.woff2` | ⏭️ | binary asset |
| 1751 | `apps/dwa/public/fonts/woff2/poppins-v24-latin-500.woff2` | ⏭️ | binary asset |
| 1752 | `apps/dwa/public/fonts/woff2/poppins-v24-latin-500italic.woff2` | ⏭️ | binary asset |
| 1753 | `apps/dwa/public/fonts/woff2/poppins-v24-latin-600.woff2` | ⏭️ | binary asset |
| 1754 | `apps/dwa/public/fonts/woff2/poppins-v24-latin-600italic.woff2` | ⏭️ | binary asset |
| 1755 | `apps/dwa/public/fonts/woff2/poppins-v24-latin-italic.woff2` | ⏭️ | binary asset |
| 1756 | `apps/dwa/public/fonts/woff2/poppins-v24-latin-regular.woff2` | ⏭️ | binary asset |
| 1757 | `apps/dwa/public/images/404-illustration-dark.svg` | ⏭️ | binary asset |
| 1758 | `apps/dwa/public/images/404-illustration.svg` | ⏭️ | binary asset |
| 1759 | `apps/dwa/public/images/announcement-icon.svg` | ⏭️ | binary asset |
| 1760 | `apps/dwa/public/images/applications-image-01.jpg` | ⏭️ | binary asset |
| 1761 | `apps/dwa/public/images/applications-image-02.jpg` | ⏭️ | binary asset |
| 1762 | `apps/dwa/public/images/applications-image-03.jpg` | ⏭️ | binary asset |
| 1763 | `apps/dwa/public/images/applications-image-04.jpg` | ⏭️ | binary asset |
| 1764 | `apps/dwa/public/images/applications-image-05.jpg` | ⏭️ | binary asset |
| 1765 | `apps/dwa/public/images/applications-image-06.jpg` | ⏭️ | binary asset |
| 1766 | `apps/dwa/public/images/applications-image-07.jpg` | ⏭️ | binary asset |
| 1767 | `apps/dwa/public/images/applications-image-08.jpg` | ⏭️ | binary asset |
| 1768 | `apps/dwa/public/images/applications-image-09.jpg` | ⏭️ | binary asset |
| 1769 | `apps/dwa/public/images/applications-image-10.jpg` | ⏭️ | binary asset |
| 1770 | `apps/dwa/public/images/applications-image-11.jpg` | ⏭️ | binary asset |
| 1771 | `apps/dwa/public/images/applications-image-12.jpg` | ⏭️ | binary asset |
| 1772 | `apps/dwa/public/images/applications-image-13.jpg` | ⏭️ | binary asset |
| 1773 | `apps/dwa/public/images/applications-image-14.jpg` | ⏭️ | binary asset |
| 1774 | `apps/dwa/public/images/applications-image-15.jpg` | ⏭️ | binary asset |
| 1775 | `apps/dwa/public/images/applications-image-16.jpg` | ⏭️ | binary asset |
| 1776 | `apps/dwa/public/images/applications-image-17.jpg` | ⏭️ | binary asset |
| 1777 | `apps/dwa/public/images/applications-image-18.jpg` | ⏭️ | binary asset |
| 1778 | `apps/dwa/public/images/applications-image-19.jpg` | ⏭️ | binary asset |
| 1779 | `apps/dwa/public/images/applications-image-20.jpg` | ⏭️ | binary asset |
| 1780 | `apps/dwa/public/images/applications-image-21.jpg` | ⏭️ | binary asset |
| 1781 | `apps/dwa/public/images/applications-image-22.jpg` | ⏭️ | binary asset |
| 1782 | `apps/dwa/public/images/applications-image-23.jpg` | ⏭️ | binary asset |
| 1783 | `apps/dwa/public/images/applications-image-24.jpg` | ⏭️ | binary asset |
| 1784 | `apps/dwa/public/images/applications-image-25.jpg` | ⏭️ | binary asset |
| 1785 | `apps/dwa/public/images/applications-image-26.jpg` | ⏭️ | binary asset |
| 1786 | `apps/dwa/public/images/applications-image-27.jpg` | ⏭️ | binary asset |
| 1787 | `apps/dwa/public/images/applications-image-28.jpg` | ⏭️ | binary asset |
| 1788 | `apps/dwa/public/images/applications-image-29.jpg` | ⏭️ | binary asset |
| 1789 | `apps/dwa/public/images/applications-image-30.jpg` | ⏭️ | binary asset |
| 1790 | `apps/dwa/public/images/applications-image-31.jpg` | ⏭️ | binary asset |
| 1791 | `apps/dwa/public/images/applications-image-32.jpg` | ⏭️ | binary asset |
| 1792 | `apps/dwa/public/images/auth-image.jpg` | ⏭️ | binary asset |
| 1793 | `apps/dwa/public/images/avatar-01.jpg` | ⏭️ | binary asset |
| 1794 | `apps/dwa/public/images/avatar-02.jpg` | ⏭️ | binary asset |
| 1795 | `apps/dwa/public/images/avatar-03.jpg` | ⏭️ | binary asset |
| 1796 | `apps/dwa/public/images/avatar-04.jpg` | ⏭️ | binary asset |
| 1797 | `apps/dwa/public/images/avatar-05.jpg` | ⏭️ | binary asset |
| 1798 | `apps/dwa/public/images/avatar-06.jpg` | ⏭️ | binary asset |
| 1799 | `apps/dwa/public/images/channel-01.png` | ⏭️ | binary asset |
| 1800 | `apps/dwa/public/images/channel-02.png` | ⏭️ | binary asset |
| 1801 | `apps/dwa/public/images/channel-03.png` | ⏭️ | binary asset |
| 1802 | `apps/dwa/public/images/chat-image.jpg` | ⏭️ | binary asset |
| 1803 | `apps/dwa/public/images/company-bg.jpg` | ⏭️ | binary asset |
| 1804 | `apps/dwa/public/images/company-icon-01.svg` | ⏭️ | binary asset |
| 1805 | `apps/dwa/public/images/company-icon-02.svg` | ⏭️ | binary asset |
| 1806 | `apps/dwa/public/images/company-icon-03.svg` | ⏭️ | binary asset |
| 1807 | `apps/dwa/public/images/company-icon-04.svg` | ⏭️ | binary asset |
| 1808 | `apps/dwa/public/images/company-icon-05.svg` | ⏭️ | binary asset |
| 1809 | `apps/dwa/public/images/company-icon-06.svg` | ⏭️ | binary asset |
| 1810 | `apps/dwa/public/images/company-icon-07.svg` | ⏭️ | binary asset |
| 1811 | `apps/dwa/public/images/company-icon-08.svg` | ⏭️ | binary asset |
| 1812 | `apps/dwa/public/images/courses/anger-management.webp` | ⏭️ | binary asset |
| 1813 | `apps/dwa/public/images/courses/anxiety-management.webp` | ⏭️ | binary asset |
| 1814 | `apps/dwa/public/images/courses/anxiety-toolkit-foundations.webp` | ⏭️ | binary asset |
| 1815 | `apps/dwa/public/images/courses/anxiety-toolkit-resilience.webp` | ⏭️ | binary asset |
| 1816 | `apps/dwa/public/images/courses/anxiety-toolkit-skills.webp` | ⏭️ | binary asset |
| 1817 | `apps/dwa/public/images/courses/anxiety-toolkit.webp` | ⏭️ | binary asset |
| 1818 | `apps/dwa/public/images/courses/bipolar-disorder.webp` | ⏭️ | binary asset |
| 1819 | `apps/dwa/public/images/courses/depression-action.webp` | ⏭️ | binary asset |
| 1820 | `apps/dwa/public/images/courses/dietary-patterns.webp` | ⏭️ | binary asset |
| 1821 | `apps/dwa/public/images/courses/emotional-dysregulation.webp` | ⏭️ | binary asset |
| 1822 | `apps/dwa/public/images/courses/food-mood-connection.webp` | ⏭️ | binary asset |
| 1823 | `apps/dwa/public/images/courses/food-mood-mastery.webp` | ⏭️ | binary asset |
| 1824 | `apps/dwa/public/images/courses/grief-loss.webp` | ⏭️ | binary asset |
| 1825 | `apps/dwa/public/images/courses/gut-brain-foundations.webp` | ⏭️ | binary asset |
| 1826 | `apps/dwa/public/images/courses/low-self-esteem.webp` | ⏭️ | binary asset |
| 1827 | `apps/dwa/public/images/courses/managing-perfectionism.webp` | ⏭️ | binary asset |
| 1828 | `apps/dwa/public/images/courses/ocd-toolkit.webp` | ⏭️ | binary asset |
| 1829 | `apps/dwa/public/images/courses/panic-disorder.webp` | ⏭️ | binary asset |
| 1830 | `apps/dwa/public/images/courses/precision-nutrition.webp` | ⏭️ | binary asset |
| 1831 | `apps/dwa/public/images/courses/sleep-insomnia.webp` | ⏭️ | binary asset |
| 1832 | `apps/dwa/public/images/courses/sleep-mastery.webp` | ⏭️ | binary asset |
| 1833 | `apps/dwa/public/images/courses/social-anxiety.webp` | ⏭️ | binary asset |
| 1834 | `apps/dwa/public/images/courses/stress-burnout.webp` | ⏭️ | binary asset |
| 1835 | `apps/dwa/public/images/courses/trauma-recovery.webp` | ⏭️ | binary asset |
| 1836 | `apps/dwa/public/images/favicon.png` | ⏭️ | binary asset |
| 1837 | `apps/dwa/public/images/feed-image-01.jpg` | ⏭️ | binary asset |
| 1838 | `apps/dwa/public/images/feed-image-02.jpg` | ⏭️ | binary asset |
| 1839 | `apps/dwa/public/images/group-avatar-01.png` | ⏭️ | binary asset |
| 1840 | `apps/dwa/public/images/group-avatar-02.png` | ⏭️ | binary asset |
| 1841 | `apps/dwa/public/images/group-avatar-03.png` | ⏭️ | binary asset |
| 1842 | `apps/dwa/public/images/group-avatar-04.png` | ⏭️ | binary asset |
| 1843 | `apps/dwa/public/images/home/avatar-01.jpg` | ⏭️ | binary asset |
| 1844 | `apps/dwa/public/images/home/avatar-02.jpg` | ⏭️ | binary asset |
| 1845 | `apps/dwa/public/images/home/avatar-03.jpg` | ⏭️ | binary asset |
| 1846 | `apps/dwa/public/images/home/avatar-04.jpg` | ⏭️ | binary asset |
| 1847 | `apps/dwa/public/images/home/avatar-05.jpg` | ⏭️ | binary asset |
| 1848 | `apps/dwa/public/images/home/avatar-06.jpg` | ⏭️ | binary asset |
| 1849 | `apps/dwa/public/images/home/large-testimonial.jpg` | ⏭️ | binary asset |
| 1850 | `apps/dwa/public/images/home/logo-01.svg` | ⏭️ | binary asset |
| 1851 | `apps/dwa/public/images/home/logo-02.svg` | ⏭️ | binary asset |
| 1852 | `apps/dwa/public/images/home/logo-03.svg` | ⏭️ | binary asset |
| 1853 | `apps/dwa/public/images/home/logo-04.svg` | ⏭️ | binary asset |
| 1854 | `apps/dwa/public/images/home/logo-05.svg` | ⏭️ | binary asset |
| 1855 | `apps/dwa/public/images/home/planet-overlay.svg` | ⏭️ | binary asset |
| 1856 | `apps/dwa/public/images/home/planet-tag-01.png` | ⏭️ | binary asset |
| 1857 | `apps/dwa/public/images/home/planet-tag-02.png` | ⏭️ | binary asset |
| 1858 | `apps/dwa/public/images/home/planet-tag-03.png` | ⏭️ | binary asset |
| 1859 | `apps/dwa/public/images/home/planet-tag-04.png` | ⏭️ | binary asset |
| 1860 | `apps/dwa/public/images/home/planet.png` | ⏭️ | binary asset |
| 1861 | `apps/dwa/public/images/home/stripes-dark.svg` | ⏭️ | binary asset |
| 1862 | `apps/dwa/public/images/icon-01.svg` | ⏭️ | binary asset |
| 1863 | `apps/dwa/public/images/icon-02.svg` | ⏭️ | binary asset |
| 1864 | `apps/dwa/public/images/icon-03.svg` | ⏭️ | binary asset |
| 1865 | `apps/dwa/public/images/inbox-image.jpg` | ⏭️ | binary asset |
| 1866 | `apps/dwa/public/images/landing/fonts/inter-v12-latin-500.woff2` | ⏭️ | binary asset |
| 1867 | `apps/dwa/public/images/landing/fonts/inter-v12-latin-600.woff2` | ⏭️ | binary asset |
| 1868 | `apps/dwa/public/images/landing/fonts/inter-v12-latin-regular.woff2` | ⏭️ | binary asset |
| 1869 | `apps/dwa/public/images/landing/fonts/poppins-v20-latin-500.woff2` | ⏭️ | binary asset |
| 1870 | `apps/dwa/public/images/landing/fonts/poppins-v20-latin-600.woff2` | ⏭️ | binary asset |
| 1871 | `apps/dwa/public/images/landing/fonts/poppins-v20-latin-regular.woff2` | ⏭️ | binary asset |
| 1872 | `apps/dwa/public/images/landing/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK book cover.webp` | ⏭️ | binary asset |
| 1873 | `apps/dwa/public/images/landing/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK.webp` | ⏭️ | binary asset |
| 1874 | `apps/dwa/public/images/landing/images/THE SOLO FOUNDER'S AI DOMINANCE.jpg` | ⏭️ | binary asset |
| 1875 | `apps/dwa/public/images/landing/images/THE SOLO FOUNDER'S AI REVOLUTION.jpg` | ⏭️ | binary asset |
| 1876 | `apps/dwa/public/images/landing/images/The Solo Founder's Al Playbook.jpg` | ⏭️ | binary asset |
| 1877 | `apps/dwa/public/images/landing/images/ai-roleplay-sales-academy.webp` | ⏭️ | binary asset |
| 1878 | `apps/dwa/public/images/landing/images/icp-builder-mockup.png` | ⏭️ | binary asset |
| 1879 | `apps/dwa/public/images/landing/images/integrated-intelligence.webp` | ⏭️ | binary asset |
| 1880 | `apps/dwa/public/images/landing/images/logo-transparent.png` | ⏭️ | binary asset |
| 1881 | `apps/dwa/public/images/landing/images/mike-sullivan-author-creator.png` | ⏭️ | binary asset |
| 1882 | `apps/dwa/public/images/landing/images/pipeline-state-machine-mockup.webp` | ⏭️ | binary asset |
| 1883 | `apps/dwa/public/images/landing/images/soloframeHubLogo.png` | ⏭️ | binary asset |
| 1884 | `apps/dwa/public/images/landing/images/soloframehub-logo-sm.png` | ⏭️ | binary asset |
| 1885 | `apps/dwa/public/images/landing/images/soloframehub-logo-w-white.png` | ⏭️ | binary asset |
| 1886 | `apps/dwa/public/images/landing/images/soloframehub-site-icon.png` | ⏭️ | binary asset |
| 1887 | `apps/dwa/public/images/landing/images/soloframehublogo.jpg` | ⏭️ | binary asset |
| 1888 | `apps/dwa/public/images/landing/images/traditional video lesson.jpg` | ⏭️ | binary asset |
| 1889 | `apps/dwa/public/images/landing/images/traditional-lesson.png` | ⏭️ | binary asset |
| 1890 | `apps/dwa/public/images/meetup-image.jpg` | ⏭️ | binary asset |
| 1891 | `apps/dwa/public/images/meetup-photo-01.jpg` | ⏭️ | binary asset |
| 1892 | `apps/dwa/public/images/meetup-photo-02.jpg` | ⏭️ | binary asset |
| 1893 | `apps/dwa/public/images/meetup-photo-03.jpg` | ⏭️ | binary asset |
| 1894 | `apps/dwa/public/images/meetups-thumb-01.jpg` | ⏭️ | binary asset |
| 1895 | `apps/dwa/public/images/meetups-thumb-02.jpg` | ⏭️ | binary asset |
| 1896 | `apps/dwa/public/images/meetups-thumb-03.jpg` | ⏭️ | binary asset |
| 1897 | `apps/dwa/public/images/meetups-thumb-04.jpg` | ⏭️ | binary asset |
| 1898 | `apps/dwa/public/images/meetups-thumb-05.jpg` | ⏭️ | binary asset |
| 1899 | `apps/dwa/public/images/meetups-thumb-06.jpg` | ⏭️ | binary asset |
| 1900 | `apps/dwa/public/images/meetups-thumb-07.jpg` | ⏭️ | binary asset |
| 1901 | `apps/dwa/public/images/meetups-thumb-08.jpg` | ⏭️ | binary asset |
| 1902 | `apps/dwa/public/images/modal-image.jpg` | ⏭️ | binary asset |
| 1903 | `apps/dwa/public/images/onboarding-image.jpg` | ⏭️ | binary asset |
| 1904 | `apps/dwa/public/images/pay-bg.jpg` | ⏭️ | binary asset |
| 1905 | `apps/dwa/public/images/practices/01-provider-dashboard.png` | ⏭️ | binary asset |
| 1906 | `apps/dwa/public/images/practices/02-provider-patients.png` | ⏭️ | binary asset |
| 1907 | `apps/dwa/public/images/practices/03-distress-alerts.png` | ⏭️ | binary asset |
| 1908 | `apps/dwa/public/images/practices/05-provider-resources.png` | ⏭️ | binary asset |
| 1909 | `apps/dwa/public/images/practices/06-student-dashboard.png` | ⏭️ | binary asset |
| 1910 | `apps/dwa/public/images/practices/07-interactive-lesson.png` | ⏭️ | binary asset |
| 1911 | `apps/dwa/public/images/practices/08-ai-coach.png` | ⏭️ | binary asset |
| 1912 | `apps/dwa/public/images/practices/09-course-catalog.png` | ⏭️ | binary asset |
| 1913 | `apps/dwa/public/images/practices/10-analytics.png` | ⏭️ | binary asset |
| 1914 | `apps/dwa/public/images/product-image.jpg` | ⏭️ | binary asset |
| 1915 | `apps/dwa/public/images/profile-bg.jpg` | ⏭️ | binary asset |
| 1916 | `apps/dwa/public/images/related-product-01.jpg` | ⏭️ | binary asset |
| 1917 | `apps/dwa/public/images/related-product-02.jpg` | ⏭️ | binary asset |
| 1918 | `apps/dwa/public/images/related-product-03.jpg` | ⏭️ | binary asset |
| 1919 | `apps/dwa/public/images/shop-category-01.png` | ⏭️ | binary asset |
| 1920 | `apps/dwa/public/images/shop-category-02.png` | ⏭️ | binary asset |
| 1921 | `apps/dwa/public/images/shop-category-03.png` | ⏭️ | binary asset |
| 1922 | `apps/dwa/public/images/shop-category-04.png` | ⏭️ | binary asset |
| 1923 | `apps/dwa/public/images/soloframehub-logo-main.png` | ⏭️ | binary asset |
| 1924 | `apps/dwa/public/images/task-image-01.jpg` | ⏭️ | binary asset |
| 1925 | `apps/dwa/public/images/task-image-02.jpg` | ⏭️ | binary asset |
| 1926 | `apps/dwa/public/images/tracks/anxiety-and-fear.webp` | ⏭️ | binary asset |
| 1927 | `apps/dwa/public/images/tracks/mood-and-emotions.webp` | ⏭️ | binary asset |
| 1928 | `apps/dwa/public/images/tracks/nutrition-and-brain-health.webp` | ⏭️ | binary asset |
| 1929 | `apps/dwa/public/images/tracks/sleep-and-recovery.webp` | ⏭️ | binary asset |
| 1930 | `apps/dwa/public/images/tracks/stress-and-resilience.webp` | ⏭️ | binary asset |
| 1931 | `apps/dwa/public/images/transactions-image-01.svg` | ⏭️ | binary asset |
| 1932 | `apps/dwa/public/images/transactions-image-02.svg` | ⏭️ | binary asset |
| 1933 | `apps/dwa/public/images/transactions-image-03.svg` | ⏭️ | binary asset |
| 1934 | `apps/dwa/public/images/transactions-image-04.svg` | ⏭️ | binary asset |
| 1935 | `apps/dwa/public/images/transactions-image-05.svg` | ⏭️ | binary asset |
| 1936 | `apps/dwa/public/images/transactions-image-06.svg` | ⏭️ | binary asset |
| 1937 | `apps/dwa/public/images/transactions-image-07.svg` | ⏭️ | binary asset |
| 1938 | `apps/dwa/public/images/transactions-image-08.svg` | ⏭️ | binary asset |
| 1939 | `apps/dwa/public/images/user-128-01.jpg` | ⏭️ | binary asset |
| 1940 | `apps/dwa/public/images/user-28-01.jpg` | ⏭️ | binary asset |
| 1941 | `apps/dwa/public/images/user-28-02.jpg` | ⏭️ | binary asset |
| 1942 | `apps/dwa/public/images/user-28-03.jpg` | ⏭️ | binary asset |
| 1943 | `apps/dwa/public/images/user-28-04.jpg` | ⏭️ | binary asset |
| 1944 | `apps/dwa/public/images/user-28-05.jpg` | ⏭️ | binary asset |
| 1945 | `apps/dwa/public/images/user-28-06.jpg` | ⏭️ | binary asset |
| 1946 | `apps/dwa/public/images/user-28-07.jpg` | ⏭️ | binary asset |
| 1947 | `apps/dwa/public/images/user-28-08.jpg` | ⏭️ | binary asset |
| 1948 | `apps/dwa/public/images/user-28-09.jpg` | ⏭️ | binary asset |
| 1949 | `apps/dwa/public/images/user-28-10.jpg` | ⏭️ | binary asset |
| 1950 | `apps/dwa/public/images/user-28-11.jpg` | ⏭️ | binary asset |
| 1951 | `apps/dwa/public/images/user-28-12.jpg` | ⏭️ | binary asset |
| 1952 | `apps/dwa/public/images/user-32-01.jpg` | ⏭️ | binary asset |
| 1953 | `apps/dwa/public/images/user-32-02.jpg` | ⏭️ | binary asset |
| 1954 | `apps/dwa/public/images/user-32-03.jpg` | ⏭️ | binary asset |
| 1955 | `apps/dwa/public/images/user-32-04.jpg` | ⏭️ | binary asset |
| 1956 | `apps/dwa/public/images/user-32-05.jpg` | ⏭️ | binary asset |
| 1957 | `apps/dwa/public/images/user-32-06.jpg` | ⏭️ | binary asset |
| 1958 | `apps/dwa/public/images/user-32-07.jpg` | ⏭️ | binary asset |
| 1959 | `apps/dwa/public/images/user-32-08.jpg` | ⏭️ | binary asset |
| 1960 | `apps/dwa/public/images/user-36-05.jpg` | ⏭️ | binary asset |
| 1961 | `apps/dwa/public/images/user-40-01.jpg` | ⏭️ | binary asset |
| 1962 | `apps/dwa/public/images/user-40-02.jpg` | ⏭️ | binary asset |
| 1963 | `apps/dwa/public/images/user-40-03.jpg` | ⏭️ | binary asset |
| 1964 | `apps/dwa/public/images/user-40-04.jpg` | ⏭️ | binary asset |
| 1965 | `apps/dwa/public/images/user-40-05.jpg` | ⏭️ | binary asset |
| 1966 | `apps/dwa/public/images/user-40-06.jpg` | ⏭️ | binary asset |
| 1967 | `apps/dwa/public/images/user-40-07.jpg` | ⏭️ | binary asset |
| 1968 | `apps/dwa/public/images/user-40-08.jpg` | ⏭️ | binary asset |
| 1969 | `apps/dwa/public/images/user-40-09.jpg` | ⏭️ | binary asset |
| 1970 | `apps/dwa/public/images/user-40-10.jpg` | ⏭️ | binary asset |
| 1971 | `apps/dwa/public/images/user-40-11.jpg` | ⏭️ | binary asset |
| 1972 | `apps/dwa/public/images/user-40-12.jpg` | ⏭️ | binary asset |
| 1973 | `apps/dwa/public/images/user-64-01.jpg` | ⏭️ | binary asset |
| 1974 | `apps/dwa/public/images/user-64-02.jpg` | ⏭️ | binary asset |
| 1975 | `apps/dwa/public/images/user-64-03.jpg` | ⏭️ | binary asset |
| 1976 | `apps/dwa/public/images/user-64-04.jpg` | ⏭️ | binary asset |
| 1977 | `apps/dwa/public/images/user-64-05.jpg` | ⏭️ | binary asset |
| 1978 | `apps/dwa/public/images/user-64-06.jpg` | ⏭️ | binary asset |
| 1979 | `apps/dwa/public/images/user-64-07.jpg` | ⏭️ | binary asset |
| 1980 | `apps/dwa/public/images/user-64-08.jpg` | ⏭️ | binary asset |
| 1981 | `apps/dwa/public/images/user-64-09.jpg` | ⏭️ | binary asset |
| 1982 | `apps/dwa/public/images/user-64-10.jpg` | ⏭️ | binary asset |
| 1983 | `apps/dwa/public/images/user-64-11.jpg` | ⏭️ | binary asset |
| 1984 | `apps/dwa/public/images/user-64-12.jpg` | ⏭️ | binary asset |
| 1985 | `apps/dwa/public/images/user-64-13.jpg` | ⏭️ | binary asset |
| 1986 | `apps/dwa/public/images/user-64-14.jpg` | ⏭️ | binary asset |
| 1987 | `apps/dwa/public/images/user-avatar-32.png` | ⏭️ | binary asset |
| 1988 | `apps/dwa/public/images/user-avatar-80.png` | ⏭️ | binary asset |
| 1989 | `apps/dwa/public/openapi.json` | ✅ | slice 04 |
| 1990 | `apps/dwa/public/presentations/anger-management.pdf` | ⏭️ | binary asset |
| 1991 | `apps/dwa/public/presentations/anxiety-management.pdf` | ⏭️ | binary asset |
| 1992 | `apps/dwa/public/presentations/anxiety-toolkit-foundations.pdf` | ⏭️ | binary asset |
| 1993 | `apps/dwa/public/presentations/anxiety-toolkit-resilience.pdf` | ⏭️ | binary asset |
| 1994 | `apps/dwa/public/presentations/anxiety-toolkit-skills.pdf` | ⏭️ | binary asset |
| 1995 | `apps/dwa/public/presentations/anxiety-toolkit.pdf` | ⏭️ | binary asset |
| 1996 | `apps/dwa/public/presentations/bipolar-disorder.pdf` | ⏭️ | binary asset |
| 1997 | `apps/dwa/public/presentations/depression-action.pdf` | ⏭️ | binary asset |
| 1998 | `apps/dwa/public/presentations/dietary-patterns.pdf` | ⏭️ | binary asset |
| 1999 | `apps/dwa/public/presentations/emotional-dysregulation.pdf` | ⏭️ | binary asset |
| 2000 | `apps/dwa/public/presentations/food-mood-connection.pdf` | ⏭️ | binary asset |
| 2001 | `apps/dwa/public/presentations/food-mood-mastery.pdf` | ⏭️ | binary asset |
| 2002 | `apps/dwa/public/presentations/grief-loss.pdf` | ⏭️ | binary asset |
| 2003 | `apps/dwa/public/presentations/gut-brain-foundations.pdf` | ⏭️ | binary asset |
| 2004 | `apps/dwa/public/presentations/low-self-esteem.pdf` | ⏭️ | binary asset |
| 2005 | `apps/dwa/public/presentations/managing-perfectionism.pdf` | ⏭️ | binary asset |
| 2006 | `apps/dwa/public/presentations/ocd-toolkit.pdf` | ⏭️ | binary asset |
| 2007 | `apps/dwa/public/presentations/panic-disorder.pdf` | ⏭️ | binary asset |
| 2008 | `apps/dwa/public/presentations/precision-nutrition.pdf` | ⏭️ | binary asset |
| 2009 | `apps/dwa/public/presentations/sleep-insomnia.pdf` | ⏭️ | binary asset |
| 2010 | `apps/dwa/public/presentations/sleep-mastery.pdf` | ⏭️ | binary asset |
| 2011 | `apps/dwa/public/presentations/social-anxiety.pdf` | ⏭️ | binary asset |
| 2012 | `apps/dwa/public/presentations/stress-burnout.pdf` | ⏭️ | binary asset |
| 2013 | `apps/dwa/public/presentations/trauma-recovery.pdf` | ⏭️ | binary asset |
| 2014 | `apps/dwa/public/sw.js` | ✅ | slice 04 |
| 2015 | `apps/dwa/scripts/audit-word-counts.js` | ✅ | slice 04 |
| 2016 | `apps/dwa/scripts/capture-marketing-screenshots.ts` | ✅ | slice 04 |
| 2017 | `apps/dwa/scripts/db-migrate.ts` | ✅ | slice 04 |
| 2018 | `apps/dwa/scripts/deep-render-test.mjs` | ✅ | slice 04 |
| 2019 | `apps/dwa/scripts/docker-entrypoint.js` | 🔍 | slice 04 — B-049..B-058 |
| 2020 | `apps/dwa/scripts/generate-openapi.ts` | ✅ | slice 04 |
| 2021 | `apps/dwa/scripts/hooks/pre-push` | ✅ | slice 04 |
| 2022 | `apps/dwa/scripts/migrations/001-add-missing-indexes.sql` | ✅ | slice 04 |
| 2023 | `apps/dwa/scripts/reindex-course-content.ts` | ✅ | slice 04 |
| 2024 | `apps/dwa/scripts/seed-demo-data.ts` | ✅ | slice 04 |
| 2025 | `apps/dwa/scripts/seed-embeddings.ts` | ✅ | slice 04 |
| 2026 | `apps/dwa/scripts/setup-secrets.sh` | ✅ | slice 04 |
| 2027 | `apps/dwa/scripts/setup-test-accounts.ts` | ✅ | slice 04 |
| 2028 | `apps/dwa/scripts/snapshot-platform.ts` | ✅ | slice 04 |
| 2029 | `apps/dwa/scripts/test-audio.webm` | ⏭️ | binary asset |
| 2030 | `apps/dwa/scripts/test-cycle-detection.ts` | ✅ | slice 04 |
| 2031 | `apps/dwa/scripts/update-screenshots.py` | ✅ | slice 04 |
| 2032 | `apps/dwa/scripts/validate-curriculum.ts` | ✅ | slice 04 |
| 2033 | `apps/dwa/scripts/validate-lessons.mjs` | ✅ | slice 04 |
| 2034 | `apps/dwa/scripts/verify-rate-limits.ts` | ✅ | slice 04 |
| 2035 | `apps/dwa/server/data/assessments/anger-self-check.json` | ⏳ | pending |
| 2036 | `apps/dwa/server/data/assessments/bipolar-mood-check.json` | ⏳ | pending |
| 2037 | `apps/dwa/server/data/assessments/burnout-self-check.json` | ⏳ | pending |
| 2038 | `apps/dwa/server/data/assessments/dietary-pattern-check.json` | ⏳ | pending |
| 2039 | `apps/dwa/server/data/assessments/emotional-dysregulation-check.json` | ⏳ | pending |
| 2040 | `apps/dwa/server/data/assessments/food-mood-awareness.json` | ⏳ | pending |
| 2041 | `apps/dwa/server/data/assessments/food-mood-mastery-check.json` | ⏳ | pending |
| 2042 | `apps/dwa/server/data/assessments/gad7.json` | ⏳ | pending |
| 2043 | `apps/dwa/server/data/assessments/grief-experience-check.json` | ⏳ | pending |
| 2044 | `apps/dwa/server/data/assessments/gut-brain-awareness.json` | ⏳ | pending |
| 2045 | `apps/dwa/server/data/assessments/insomnia-severity-check.json` | ⏳ | pending |
| 2046 | `apps/dwa/server/data/assessments/lesson-map.json` | ⏳ | pending |
| 2047 | `apps/dwa/server/data/assessments/nutrient-awareness-check.json` | ⏳ | pending |
| 2048 | `apps/dwa/server/data/assessments/ocd-self-check.json` | ⏳ | pending |
| 2049 | `apps/dwa/server/data/assessments/pdss-sr.json` | ⏳ | pending |
| 2050 | `apps/dwa/server/data/assessments/perfectionism-self-check.json` | ⏳ | pending |
| 2051 | `apps/dwa/server/data/assessments/phq2.json` | ⏳ | pending |
| 2052 | `apps/dwa/server/data/assessments/phq9.json` | ⏳ | pending |
| 2053 | `apps/dwa/server/data/assessments/psqi-sleep-quality.json` | ⏳ | pending |
| 2054 | `apps/dwa/server/data/assessments/self-esteem-check.json` | ⏳ | pending |
| 2055 | `apps/dwa/server/data/assessments/spin.json` | ⏳ | pending |
| 2056 | `apps/dwa/server/data/assessments/trauma-response-check.json` | ⏳ | pending |
| 2057 | `apps/dwa/server/data/checklists/anti-inflammatory-eating-plan.json` | ⏳ | pending |
| 2058 | `apps/dwa/server/data/checklists/anxiety-first-aid.json` | ⏳ | pending |
| 2059 | `apps/dwa/server/data/checklists/anxiety-toolkit-top5.json` | ⏳ | pending |
| 2060 | `apps/dwa/server/data/checklists/assertive-communication.json` | ⏳ | pending |
| 2061 | `apps/dwa/server/data/checklists/bedroom-audit.json` | ⏳ | pending |
| 2062 | `apps/dwa/server/data/checklists/boundary-starter-pack.json` | ⏳ | pending |
| 2063 | `apps/dwa/server/data/checklists/dbt-skills-practice-plan.json` | ⏳ | pending |
| 2064 | `apps/dwa/server/data/checklists/distress-tolerance-toolkit.json` | ⏳ | pending |
| 2065 | `apps/dwa/server/data/checklists/grief-self-care.json` | ⏳ | pending |
| 2066 | `apps/dwa/server/data/checklists/gut-brain-action-plan.json` | ⏳ | pending |
| 2067 | `apps/dwa/server/data/checklists/gut-health-habits.json` | ⏳ | pending |
| 2068 | `apps/dwa/server/data/checklists/lesson-map.json` | ⏳ | pending |
| 2069 | `apps/dwa/server/data/checklists/lifestyle-audit.json` | ⏳ | pending |
| 2070 | `apps/dwa/server/data/checklists/ocd-lifestyle-support.json` | ⏳ | pending |
| 2071 | `apps/dwa/server/data/checklists/perfectionism-maintenance.json` | ⏳ | pending |
| 2072 | `apps/dwa/server/data/checklists/personalized-nutrition-plan.json` | ⏳ | pending |
| 2073 | `apps/dwa/server/data/checklists/recovery-practices.json` | ⏳ | pending |
| 2074 | `apps/dwa/server/data/checklists/relapse-prevention-checklist.json` | ⏳ | pending |
| 2075 | `apps/dwa/server/data/checklists/resilience-routine.json` | ⏳ | pending |
| 2076 | `apps/dwa/server/data/checklists/safety-behaviors.json` | ⏳ | pending |
| 2077 | `apps/dwa/server/data/checklists/self-care-stabilization.json` | ⏳ | pending |
| 2078 | `apps/dwa/server/data/checklists/self-compassion-for-perfectionism.json` | ⏳ | pending |
| 2079 | `apps/dwa/server/data/checklists/self-compassion-practice.json` | ⏳ | pending |
| 2080 | `apps/dwa/server/data/checklists/self-worth-maintenance.json` | ⏳ | pending |
| 2081 | `apps/dwa/server/data/checklists/sleep-blueprint-checklist.json` | ⏳ | pending |
| 2082 | `apps/dwa/server/data/checklists/sleep-hygiene.json` | ⏳ | pending |
| 2083 | `apps/dwa/server/data/checklists/sleep-toolkit.json` | ⏳ | pending |
| 2084 | `apps/dwa/server/data/checklists/social-confidence-builder.json` | ⏳ | pending |
| 2085 | `apps/dwa/server/data/checklists/social-rhythm-checklist.json` | ⏳ | pending |
| 2086 | `apps/dwa/server/data/checklists/supplement-safety-checklist.json` | ⏳ | pending |
| 2087 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-management/lesson-1.md` | ⏳ | pending |
| 2088 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-management/lesson-2.md` | ⏳ | pending |
| 2089 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-management/lesson-3.md` | ⏳ | pending |
| 2090 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-management/lesson-4.md` | ⏳ | pending |
| 2091 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-management/lesson-5.md` | ⏳ | pending |
| 2092 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-management/lesson-6.md` | ⏳ | pending |
| 2093 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-management/lesson-7.md` | ⏳ | pending |
| 2094 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-management/lesson-8.md` | ⏳ | pending |
| 2095 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-foundations/lesson-1.md` | ⏳ | pending |
| 2096 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-foundations/lesson-2.md` | ⏳ | pending |
| 2097 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-foundations/lesson-3.md` | ⏳ | pending |
| 2098 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-foundations/lesson-4.md` | ⏳ | pending |
| 2099 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-foundations/lesson-5.md` | ⏳ | pending |
| 2100 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-foundations/lesson-6.md` | ⏳ | pending |
| 2101 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-foundations/lesson-7.md` | ⏳ | pending |
| 2102 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-foundations/lesson-8.md` | ⏳ | pending |
| 2103 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-resilience/lesson-1.md` | ⏳ | pending |
| 2104 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-resilience/lesson-2.md` | ⏳ | pending |
| 2105 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-resilience/lesson-3.md` | ⏳ | pending |
| 2106 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-resilience/lesson-4.md` | ⏳ | pending |
| 2107 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-resilience/lesson-5.md` | ⏳ | pending |
| 2108 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-resilience/lesson-6.md` | ⏳ | pending |
| 2109 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-resilience/lesson-7.md` | ⏳ | pending |
| 2110 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-resilience/lesson-8.md` | ⏳ | pending |
| 2111 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-skills/lesson-1.md` | ⏳ | pending |
| 2112 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-skills/lesson-2.md` | ⏳ | pending |
| 2113 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-skills/lesson-3.md` | ⏳ | pending |
| 2114 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-skills/lesson-4.md` | ⏳ | pending |
| 2115 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-skills/lesson-5.md` | ⏳ | pending |
| 2116 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-skills/lesson-6.md` | ⏳ | pending |
| 2117 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-skills/lesson-7.md` | ⏳ | pending |
| 2118 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit-skills/lesson-8.md` | ⏳ | pending |
| 2119 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit/lesson-1.md` | ⏳ | pending |
| 2120 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit/lesson-10.md` | ⏳ | pending |
| 2121 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit/lesson-11.md` | ⏳ | pending |
| 2122 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit/lesson-12.md` | ⏳ | pending |
| 2123 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit/lesson-2.md` | ⏳ | pending |
| 2124 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit/lesson-3.md` | ⏳ | pending |
| 2125 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit/lesson-4.md` | ⏳ | pending |
| 2126 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit/lesson-5.md` | ⏳ | pending |
| 2127 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit/lesson-6.md` | ⏳ | pending |
| 2128 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit/lesson-7.md` | ⏳ | pending |
| 2129 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit/lesson-8.md` | ⏳ | pending |
| 2130 | `apps/dwa/server/data/content/anxiety-and-fear/anxiety-toolkit/lesson-9.md` | ⏳ | pending |
| 2131 | `apps/dwa/server/data/content/anxiety-and-fear/ocd-toolkit/lesson-1.md` | ⏳ | pending |
| 2132 | `apps/dwa/server/data/content/anxiety-and-fear/ocd-toolkit/lesson-2.md` | ⏳ | pending |
| 2133 | `apps/dwa/server/data/content/anxiety-and-fear/ocd-toolkit/lesson-3.md` | ⏳ | pending |
| 2134 | `apps/dwa/server/data/content/anxiety-and-fear/ocd-toolkit/lesson-4.md` | ⏳ | pending |
| 2135 | `apps/dwa/server/data/content/anxiety-and-fear/ocd-toolkit/lesson-5.md` | ⏳ | pending |
| 2136 | `apps/dwa/server/data/content/anxiety-and-fear/ocd-toolkit/lesson-6.md` | ⏳ | pending |
| 2137 | `apps/dwa/server/data/content/anxiety-and-fear/ocd-toolkit/lesson-7.md` | ⏳ | pending |
| 2138 | `apps/dwa/server/data/content/anxiety-and-fear/ocd-toolkit/lesson-8.md` | ⏳ | pending |
| 2139 | `apps/dwa/server/data/content/anxiety-and-fear/panic-disorder/lesson-1.md` | ⏳ | pending |
| 2140 | `apps/dwa/server/data/content/anxiety-and-fear/panic-disorder/lesson-2.md` | ⏳ | pending |
| 2141 | `apps/dwa/server/data/content/anxiety-and-fear/panic-disorder/lesson-3.md` | ⏳ | pending |
| 2142 | `apps/dwa/server/data/content/anxiety-and-fear/panic-disorder/lesson-4.md` | ⏳ | pending |
| 2143 | `apps/dwa/server/data/content/anxiety-and-fear/panic-disorder/lesson-5.md` | ⏳ | pending |
| 2144 | `apps/dwa/server/data/content/anxiety-and-fear/panic-disorder/lesson-6.md` | ⏳ | pending |
| 2145 | `apps/dwa/server/data/content/anxiety-and-fear/panic-disorder/lesson-7.md` | ⏳ | pending |
| 2146 | `apps/dwa/server/data/content/anxiety-and-fear/panic-disorder/lesson-8.md` | ⏳ | pending |
| 2147 | `apps/dwa/server/data/content/anxiety-and-fear/social-anxiety/lesson-1.md` | ⏳ | pending |
| 2148 | `apps/dwa/server/data/content/anxiety-and-fear/social-anxiety/lesson-2.md` | ⏳ | pending |
| 2149 | `apps/dwa/server/data/content/anxiety-and-fear/social-anxiety/lesson-3.md` | ⏳ | pending |
| 2150 | `apps/dwa/server/data/content/anxiety-and-fear/social-anxiety/lesson-4.md` | ⏳ | pending |
| 2151 | `apps/dwa/server/data/content/anxiety-and-fear/social-anxiety/lesson-5.md` | ⏳ | pending |
| 2152 | `apps/dwa/server/data/content/anxiety-and-fear/social-anxiety/lesson-6.md` | ⏳ | pending |
| 2153 | `apps/dwa/server/data/content/anxiety-and-fear/social-anxiety/lesson-7.md` | ⏳ | pending |
| 2154 | `apps/dwa/server/data/content/anxiety-and-fear/social-anxiety/lesson-8.md` | ⏳ | pending |
| 2155 | `apps/dwa/server/data/content/mood-emotional-health/anger-management/lesson-1.md` | ⏳ | pending |
| 2156 | `apps/dwa/server/data/content/mood-emotional-health/anger-management/lesson-2.md` | ⏳ | pending |
| 2157 | `apps/dwa/server/data/content/mood-emotional-health/anger-management/lesson-3.md` | ⏳ | pending |
| 2158 | `apps/dwa/server/data/content/mood-emotional-health/anger-management/lesson-4.md` | ⏳ | pending |
| 2159 | `apps/dwa/server/data/content/mood-emotional-health/anger-management/lesson-5.md` | ⏳ | pending |
| 2160 | `apps/dwa/server/data/content/mood-emotional-health/anger-management/lesson-6.md` | ⏳ | pending |
| 2161 | `apps/dwa/server/data/content/mood-emotional-health/anger-management/lesson-7.md` | ⏳ | pending |
| 2162 | `apps/dwa/server/data/content/mood-emotional-health/anger-management/lesson-8.md` | ⏳ | pending |
| 2163 | `apps/dwa/server/data/content/mood-emotional-health/bipolar-disorder/lesson-1.md` | ⏳ | pending |
| 2164 | `apps/dwa/server/data/content/mood-emotional-health/bipolar-disorder/lesson-2.md` | ⏳ | pending |
| 2165 | `apps/dwa/server/data/content/mood-emotional-health/bipolar-disorder/lesson-3.md` | ⏳ | pending |
| 2166 | `apps/dwa/server/data/content/mood-emotional-health/bipolar-disorder/lesson-4.md` | ⏳ | pending |
| 2167 | `apps/dwa/server/data/content/mood-emotional-health/bipolar-disorder/lesson-5.md` | ⏳ | pending |
| 2168 | `apps/dwa/server/data/content/mood-emotional-health/bipolar-disorder/lesson-6.md` | ⏳ | pending |
| 2169 | `apps/dwa/server/data/content/mood-emotional-health/bipolar-disorder/lesson-7.md` | ⏳ | pending |
| 2170 | `apps/dwa/server/data/content/mood-emotional-health/bipolar-disorder/lesson-8.md` | ⏳ | pending |
| 2171 | `apps/dwa/server/data/content/mood-emotional-health/depression-action/lesson-1.md` | ⏳ | pending |
| 2172 | `apps/dwa/server/data/content/mood-emotional-health/depression-action/lesson-2.md` | ⏳ | pending |
| 2173 | `apps/dwa/server/data/content/mood-emotional-health/depression-action/lesson-3.md` | ⏳ | pending |
| 2174 | `apps/dwa/server/data/content/mood-emotional-health/depression-action/lesson-4.md` | ⏳ | pending |
| 2175 | `apps/dwa/server/data/content/mood-emotional-health/depression-action/lesson-5.md` | ⏳ | pending |
| 2176 | `apps/dwa/server/data/content/mood-emotional-health/depression-action/lesson-6.md` | ⏳ | pending |
| 2177 | `apps/dwa/server/data/content/mood-emotional-health/depression-action/lesson-7.md` | ⏳ | pending |
| 2178 | `apps/dwa/server/data/content/mood-emotional-health/depression-action/lesson-8.md` | ⏳ | pending |
| 2179 | `apps/dwa/server/data/content/mood-emotional-health/emotional-dysregulation/lesson-1.md` | ⏳ | pending |
| 2180 | `apps/dwa/server/data/content/mood-emotional-health/emotional-dysregulation/lesson-2.md` | ⏳ | pending |
| 2181 | `apps/dwa/server/data/content/mood-emotional-health/emotional-dysregulation/lesson-3.md` | ⏳ | pending |
| 2182 | `apps/dwa/server/data/content/mood-emotional-health/emotional-dysregulation/lesson-4.md` | ⏳ | pending |
| 2183 | `apps/dwa/server/data/content/mood-emotional-health/emotional-dysregulation/lesson-5.md` | ⏳ | pending |
| 2184 | `apps/dwa/server/data/content/mood-emotional-health/emotional-dysregulation/lesson-6.md` | ⏳ | pending |
| 2185 | `apps/dwa/server/data/content/mood-emotional-health/emotional-dysregulation/lesson-7.md` | ⏳ | pending |
| 2186 | `apps/dwa/server/data/content/mood-emotional-health/emotional-dysregulation/lesson-8.md` | ⏳ | pending |
| 2187 | `apps/dwa/server/data/content/mood-emotional-health/grief-loss/lesson-1.md` | ⏳ | pending |
| 2188 | `apps/dwa/server/data/content/mood-emotional-health/grief-loss/lesson-2.md` | ⏳ | pending |
| 2189 | `apps/dwa/server/data/content/mood-emotional-health/grief-loss/lesson-3.md` | ⏳ | pending |
| 2190 | `apps/dwa/server/data/content/mood-emotional-health/grief-loss/lesson-4.md` | ⏳ | pending |
| 2191 | `apps/dwa/server/data/content/mood-emotional-health/grief-loss/lesson-5.md` | ⏳ | pending |
| 2192 | `apps/dwa/server/data/content/mood-emotional-health/grief-loss/lesson-6.md` | ⏳ | pending |
| 2193 | `apps/dwa/server/data/content/mood-emotional-health/grief-loss/lesson-7.md` | ⏳ | pending |
| 2194 | `apps/dwa/server/data/content/mood-emotional-health/grief-loss/lesson-8.md` | ⏳ | pending |
| 2195 | `apps/dwa/server/data/content/mood-emotional-health/low-self-esteem/lesson-1.md` | ⏳ | pending |
| 2196 | `apps/dwa/server/data/content/mood-emotional-health/low-self-esteem/lesson-2.md` | ⏳ | pending |
| 2197 | `apps/dwa/server/data/content/mood-emotional-health/low-self-esteem/lesson-3.md` | ⏳ | pending |
| 2198 | `apps/dwa/server/data/content/mood-emotional-health/low-self-esteem/lesson-4.md` | ⏳ | pending |
| 2199 | `apps/dwa/server/data/content/mood-emotional-health/low-self-esteem/lesson-5.md` | ⏳ | pending |
| 2200 | `apps/dwa/server/data/content/mood-emotional-health/low-self-esteem/lesson-6.md` | ⏳ | pending |
| 2201 | `apps/dwa/server/data/content/mood-emotional-health/low-self-esteem/lesson-7.md` | ⏳ | pending |
| 2202 | `apps/dwa/server/data/content/mood-emotional-health/low-self-esteem/lesson-8.md` | ⏳ | pending |
| 2203 | `apps/dwa/server/data/content/mood-emotional-health/managing-perfectionism/lesson-1.md` | ⏳ | pending |
| 2204 | `apps/dwa/server/data/content/mood-emotional-health/managing-perfectionism/lesson-2.md` | ⏳ | pending |
| 2205 | `apps/dwa/server/data/content/mood-emotional-health/managing-perfectionism/lesson-3.md` | ⏳ | pending |
| 2206 | `apps/dwa/server/data/content/mood-emotional-health/managing-perfectionism/lesson-4.md` | ⏳ | pending |
| 2207 | `apps/dwa/server/data/content/mood-emotional-health/managing-perfectionism/lesson-5.md` | ⏳ | pending |
| 2208 | `apps/dwa/server/data/content/mood-emotional-health/managing-perfectionism/lesson-6.md` | ⏳ | pending |
| 2209 | `apps/dwa/server/data/content/mood-emotional-health/managing-perfectionism/lesson-7.md` | ⏳ | pending |
| 2210 | `apps/dwa/server/data/content/mood-emotional-health/managing-perfectionism/lesson-8.md` | ⏳ | pending |
| 2211 | `apps/dwa/server/data/content/nutrition-brain-health/dietary-patterns/lesson-1.md` | ⏳ | pending |
| 2212 | `apps/dwa/server/data/content/nutrition-brain-health/dietary-patterns/lesson-10.md` | ⏳ | pending |
| 2213 | `apps/dwa/server/data/content/nutrition-brain-health/dietary-patterns/lesson-11.md` | ⏳ | pending |
| 2214 | `apps/dwa/server/data/content/nutrition-brain-health/dietary-patterns/lesson-12.md` | ⏳ | pending |
| 2215 | `apps/dwa/server/data/content/nutrition-brain-health/dietary-patterns/lesson-2.md` | ⏳ | pending |
| 2216 | `apps/dwa/server/data/content/nutrition-brain-health/dietary-patterns/lesson-3.md` | ⏳ | pending |
| 2217 | `apps/dwa/server/data/content/nutrition-brain-health/dietary-patterns/lesson-4.md` | ⏳ | pending |
| 2218 | `apps/dwa/server/data/content/nutrition-brain-health/dietary-patterns/lesson-5.md` | ⏳ | pending |
| 2219 | `apps/dwa/server/data/content/nutrition-brain-health/dietary-patterns/lesson-6.md` | ⏳ | pending |
| 2220 | `apps/dwa/server/data/content/nutrition-brain-health/dietary-patterns/lesson-7.md` | ⏳ | pending |
| 2221 | `apps/dwa/server/data/content/nutrition-brain-health/dietary-patterns/lesson-8.md` | ⏳ | pending |
| 2222 | `apps/dwa/server/data/content/nutrition-brain-health/dietary-patterns/lesson-9.md` | ⏳ | pending |
| 2223 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-connection/lesson-1.md` | ⏳ | pending |
| 2224 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-connection/lesson-2.md` | ⏳ | pending |
| 2225 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-connection/lesson-3.md` | ⏳ | pending |
| 2226 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-connection/lesson-4.md` | ⏳ | pending |
| 2227 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-connection/lesson-5.md` | ⏳ | pending |
| 2228 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-connection/lesson-6.md` | ⏳ | pending |
| 2229 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-connection/lesson-7.md` | ⏳ | pending |
| 2230 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-connection/lesson-8.md` | ⏳ | pending |
| 2231 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-connection/lesson-9.md` | ⏳ | pending |
| 2232 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-mastery/lesson-1.md` | ⏳ | pending |
| 2233 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-mastery/lesson-10.md` | ⏳ | pending |
| 2234 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-mastery/lesson-11.md` | ⏳ | pending |
| 2235 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-mastery/lesson-12.md` | ⏳ | pending |
| 2236 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-mastery/lesson-2.md` | ⏳ | pending |
| 2237 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-mastery/lesson-3.md` | ⏳ | pending |
| 2238 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-mastery/lesson-4.md` | ⏳ | pending |
| 2239 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-mastery/lesson-5.md` | ⏳ | pending |
| 2240 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-mastery/lesson-6.md` | ⏳ | pending |
| 2241 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-mastery/lesson-7.md` | ⏳ | pending |
| 2242 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-mastery/lesson-8.md` | ⏳ | pending |
| 2243 | `apps/dwa/server/data/content/nutrition-brain-health/food-mood-mastery/lesson-9.md` | ⏳ | pending |
| 2244 | `apps/dwa/server/data/content/nutrition-brain-health/gut-brain-foundations/lesson-1.md` | ⏳ | pending |
| 2245 | `apps/dwa/server/data/content/nutrition-brain-health/gut-brain-foundations/lesson-10.md` | ⏳ | pending |
| 2246 | `apps/dwa/server/data/content/nutrition-brain-health/gut-brain-foundations/lesson-11.md` | ⏳ | pending |
| 2247 | `apps/dwa/server/data/content/nutrition-brain-health/gut-brain-foundations/lesson-12.md` | ⏳ | pending |
| 2248 | `apps/dwa/server/data/content/nutrition-brain-health/gut-brain-foundations/lesson-2.md` | ⏳ | pending |
| 2249 | `apps/dwa/server/data/content/nutrition-brain-health/gut-brain-foundations/lesson-3.md` | ⏳ | pending |
| 2250 | `apps/dwa/server/data/content/nutrition-brain-health/gut-brain-foundations/lesson-4.md` | ⏳ | pending |
| 2251 | `apps/dwa/server/data/content/nutrition-brain-health/gut-brain-foundations/lesson-5.md` | ⏳ | pending |
| 2252 | `apps/dwa/server/data/content/nutrition-brain-health/gut-brain-foundations/lesson-6.md` | ⏳ | pending |
| 2253 | `apps/dwa/server/data/content/nutrition-brain-health/gut-brain-foundations/lesson-7.md` | ⏳ | pending |
| 2254 | `apps/dwa/server/data/content/nutrition-brain-health/gut-brain-foundations/lesson-8.md` | ⏳ | pending |
| 2255 | `apps/dwa/server/data/content/nutrition-brain-health/gut-brain-foundations/lesson-9.md` | ⏳ | pending |
| 2256 | `apps/dwa/server/data/content/nutrition-brain-health/precision-nutrition/lesson-1.md` | ⏳ | pending |
| 2257 | `apps/dwa/server/data/content/nutrition-brain-health/precision-nutrition/lesson-10.md` | ⏳ | pending |
| 2258 | `apps/dwa/server/data/content/nutrition-brain-health/precision-nutrition/lesson-11.md` | ⏳ | pending |
| 2259 | `apps/dwa/server/data/content/nutrition-brain-health/precision-nutrition/lesson-12.md` | ⏳ | pending |
| 2260 | `apps/dwa/server/data/content/nutrition-brain-health/precision-nutrition/lesson-2.md` | ⏳ | pending |
| 2261 | `apps/dwa/server/data/content/nutrition-brain-health/precision-nutrition/lesson-3.md` | ⏳ | pending |
| 2262 | `apps/dwa/server/data/content/nutrition-brain-health/precision-nutrition/lesson-4.md` | ⏳ | pending |
| 2263 | `apps/dwa/server/data/content/nutrition-brain-health/precision-nutrition/lesson-5.md` | ⏳ | pending |
| 2264 | `apps/dwa/server/data/content/nutrition-brain-health/precision-nutrition/lesson-6.md` | ⏳ | pending |
| 2265 | `apps/dwa/server/data/content/nutrition-brain-health/precision-nutrition/lesson-7.md` | ⏳ | pending |
| 2266 | `apps/dwa/server/data/content/nutrition-brain-health/precision-nutrition/lesson-8.md` | ⏳ | pending |
| 2267 | `apps/dwa/server/data/content/nutrition-brain-health/precision-nutrition/lesson-9.md` | ⏳ | pending |
| 2268 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-1.md` | ⏳ | pending |
| 2269 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-10.md` | ⏳ | pending |
| 2270 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-11.md` | ⏳ | pending |
| 2271 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-12.md` | ⏳ | pending |
| 2272 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-13.md` | ⏳ | pending |
| 2273 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-14.md` | ⏳ | pending |
| 2274 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-15.md` | ⏳ | pending |
| 2275 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-16.md` | ⏳ | pending |
| 2276 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-17.md` | ⏳ | pending |
| 2277 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-18.md` | ⏳ | pending |
| 2278 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-19.md` | ⏳ | pending |
| 2279 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-2.md` | ⏳ | pending |
| 2280 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-20.md` | ⏳ | pending |
| 2281 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-3.md` | ⏳ | pending |
| 2282 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-4.md` | ⏳ | pending |
| 2283 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-5.md` | ⏳ | pending |
| 2284 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-6.md` | ⏳ | pending |
| 2285 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-7.md` | ⏳ | pending |
| 2286 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-8.md` | ⏳ | pending |
| 2287 | `apps/dwa/server/data/content/optimization/emotional-mastery/stress-challenge-navigation/lesson-9.md` | ⏳ | pending |
| 2288 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-1.mdx` | ⏳ | pending |
| 2289 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-10.mdx` | ⏳ | pending |
| 2290 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-11.mdx` | ⏳ | pending |
| 2291 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-12.mdx` | ⏳ | pending |
| 2292 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-13.mdx` | ⏳ | pending |
| 2293 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-14.mdx` | ⏳ | pending |
| 2294 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-15.mdx` | ⏳ | pending |
| 2295 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-16.mdx` | ⏳ | pending |
| 2296 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-17.mdx` | ⏳ | pending |
| 2297 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-18.mdx` | ⏳ | pending |
| 2298 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-19.mdx` | ⏳ | pending |
| 2299 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-2.mdx` | ⏳ | pending |
| 2300 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-20.mdx` | ⏳ | pending |
| 2301 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-3.mdx` | ⏳ | pending |
| 2302 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-4.mdx` | ⏳ | pending |
| 2303 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-5.mdx` | ⏳ | pending |
| 2304 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-6.mdx` | ⏳ | pending |
| 2305 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-7.mdx` | ⏳ | pending |
| 2306 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-8.mdx` | ⏳ | pending |
| 2307 | `apps/dwa/server/data/content/optimization/emotional-resilience/cbt-fundamentals/lesson-9.mdx` | ⏳ | pending |
| 2308 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-1.mdx` | ⏳ | pending |
| 2309 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-10.mdx` | ⏳ | pending |
| 2310 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-11.mdx` | ⏳ | pending |
| 2311 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-12.mdx` | ⏳ | pending |
| 2312 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-13.mdx` | ⏳ | pending |
| 2313 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-14.mdx` | ⏳ | pending |
| 2314 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-15.mdx` | ⏳ | pending |
| 2315 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-16.mdx` | ⏳ | pending |
| 2316 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-17.mdx` | ⏳ | pending |
| 2317 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-18.mdx` | ⏳ | pending |
| 2318 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-19.mdx` | ⏳ | pending |
| 2319 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-2.mdx` | ⏳ | pending |
| 2320 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-20.mdx` | ⏳ | pending |
| 2321 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-3.mdx` | ⏳ | pending |
| 2322 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-4.mdx` | ⏳ | pending |
| 2323 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-5.mdx` | ⏳ | pending |
| 2324 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-6.mdx` | ⏳ | pending |
| 2325 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-7.mdx` | ⏳ | pending |
| 2326 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-8.mdx` | ⏳ | pending |
| 2327 | `apps/dwa/server/data/content/optimization/emotional-resilience/growth-mindset/lesson-9.mdx` | ⏳ | pending |
| 2328 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-1.mdx` | ⏳ | pending |
| 2329 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-10.mdx` | ⏳ | pending |
| 2330 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-11.mdx` | ⏳ | pending |
| 2331 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-12.mdx` | ⏳ | pending |
| 2332 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-13.mdx` | ⏳ | pending |
| 2333 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-14.mdx` | ⏳ | pending |
| 2334 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-15.mdx` | ⏳ | pending |
| 2335 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-16.mdx` | ⏳ | pending |
| 2336 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-17.mdx` | ⏳ | pending |
| 2337 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-18.mdx` | ⏳ | pending |
| 2338 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-19.mdx` | ⏳ | pending |
| 2339 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-2.mdx` | ⏳ | pending |
| 2340 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-20.mdx` | ⏳ | pending |
| 2341 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-3.mdx` | ⏳ | pending |
| 2342 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-4.mdx` | ⏳ | pending |
| 2343 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-5.mdx` | ⏳ | pending |
| 2344 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-6.mdx` | ⏳ | pending |
| 2345 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-7.mdx` | ⏳ | pending |
| 2346 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-8.mdx` | ⏳ | pending |
| 2347 | `apps/dwa/server/data/content/optimization/emotional-resilience/healthy-boundaries/lesson-9.mdx` | ⏳ | pending |
| 2348 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-1.mdx` | ⏳ | pending |
| 2349 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-10.mdx` | ⏳ | pending |
| 2350 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-11.mdx` | ⏳ | pending |
| 2351 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-12.mdx` | ⏳ | pending |
| 2352 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-13.mdx` | ⏳ | pending |
| 2353 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-14.mdx` | ⏳ | pending |
| 2354 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-15.mdx` | ⏳ | pending |
| 2355 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-16.mdx` | ⏳ | pending |
| 2356 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-17.mdx` | ⏳ | pending |
| 2357 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-18.mdx` | ⏳ | pending |
| 2358 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-19.mdx` | ⏳ | pending |
| 2359 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-2.mdx` | ⏳ | pending |
| 2360 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-20.mdx` | ⏳ | pending |
| 2361 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-3.mdx` | ⏳ | pending |
| 2362 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-4.mdx` | ⏳ | pending |
| 2363 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-5.mdx` | ⏳ | pending |
| 2364 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-6.mdx` | ⏳ | pending |
| 2365 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-7.mdx` | ⏳ | pending |
| 2366 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-8.mdx` | ⏳ | pending |
| 2367 | `apps/dwa/server/data/content/optimization/mental-clarity/digital-wellness/lesson-9.mdx` | ⏳ | pending |
| 2368 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-1.mdx` | ⏳ | pending |
| 2369 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-10.mdx` | ⏳ | pending |
| 2370 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-11.mdx` | ⏳ | pending |
| 2371 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-12.mdx` | ⏳ | pending |
| 2372 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-13.mdx` | ⏳ | pending |
| 2373 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-14.mdx` | ⏳ | pending |
| 2374 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-15.mdx` | ⏳ | pending |
| 2375 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-16.mdx` | ⏳ | pending |
| 2376 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-17.mdx` | ⏳ | pending |
| 2377 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-18.mdx` | ⏳ | pending |
| 2378 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-19.mdx` | ⏳ | pending |
| 2379 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-2.mdx` | ⏳ | pending |
| 2380 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-20.mdx` | ⏳ | pending |
| 2381 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-3.mdx` | ⏳ | pending |
| 2382 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-4.mdx` | ⏳ | pending |
| 2383 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-5.mdx` | ⏳ | pending |
| 2384 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-6.mdx` | ⏳ | pending |
| 2385 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-7.mdx` | ⏳ | pending |
| 2386 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-8.mdx` | ⏳ | pending |
| 2387 | `apps/dwa/server/data/content/optimization/movement-exercise/music-movement-wellness/lesson-9.mdx` | ⏳ | pending |
| 2388 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-1.mdx` | ⏳ | pending |
| 2389 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-10.mdx` | ⏳ | pending |
| 2390 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-11.mdx` | ⏳ | pending |
| 2391 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-12.mdx` | ⏳ | pending |
| 2392 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-13.mdx` | ⏳ | pending |
| 2393 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-14.mdx` | ⏳ | pending |
| 2394 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-15.mdx` | ⏳ | pending |
| 2395 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-16.mdx` | ⏳ | pending |
| 2396 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-17.mdx` | ⏳ | pending |
| 2397 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-18.mdx` | ⏳ | pending |
| 2398 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-19.mdx` | ⏳ | pending |
| 2399 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-2.mdx` | ⏳ | pending |
| 2400 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-20.mdx` | ⏳ | pending |
| 2401 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-3.mdx` | ⏳ | pending |
| 2402 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-4.mdx` | ⏳ | pending |
| 2403 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-5.mdx` | ⏳ | pending |
| 2404 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-6.mdx` | ⏳ | pending |
| 2405 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-7.mdx` | ⏳ | pending |
| 2406 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-8.mdx` | ⏳ | pending |
| 2407 | `apps/dwa/server/data/content/optimization/movement-exercise/recreational-therapy/lesson-9.mdx` | ⏳ | pending |
| 2408 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-1.md` | ⏳ | pending |
| 2409 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-10.md` | ⏳ | pending |
| 2410 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-11.md` | ⏳ | pending |
| 2411 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-12.md` | ⏳ | pending |
| 2412 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-13.md` | ⏳ | pending |
| 2413 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-14.md` | ⏳ | pending |
| 2414 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-15.md` | ⏳ | pending |
| 2415 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-16.md` | ⏳ | pending |
| 2416 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-17.md` | ⏳ | pending |
| 2417 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-18.md` | ⏳ | pending |
| 2418 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-19.md` | ⏳ | pending |
| 2419 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-2.md` | ⏳ | pending |
| 2420 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-20.md` | ⏳ | pending |
| 2421 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-3.md` | ⏳ | pending |
| 2422 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-4.md` | ⏳ | pending |
| 2423 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-5.md` | ⏳ | pending |
| 2424 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-5.md.bak` | ⏳ | pending |
| 2425 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-6.md` | ⏳ | pending |
| 2426 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-7.md` | ⏳ | pending |
| 2427 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-8.md` | ⏳ | pending |
| 2428 | `apps/dwa/server/data/content/optimization/physical-vitality/movement-for-mental-performance/lesson-9.md` | ⏳ | pending |
| 2429 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-1.md` | ⏳ | pending |
| 2430 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-10.md` | ⏳ | pending |
| 2431 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-11.md` | ⏳ | pending |
| 2432 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-12.md` | ⏳ | pending |
| 2433 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-13.md` | ⏳ | pending |
| 2434 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-14.md` | ⏳ | pending |
| 2435 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-15.md` | ⏳ | pending |
| 2436 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-16.md` | ⏳ | pending |
| 2437 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-17.md` | ⏳ | pending |
| 2438 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-18.md` | ⏳ | pending |
| 2439 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-19.md` | ⏳ | pending |
| 2440 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-2.md` | ⏳ | pending |
| 2441 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-20.md` | ⏳ | pending |
| 2442 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-3.md` | ⏳ | pending |
| 2443 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-4.md` | ⏳ | pending |
| 2444 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-5.md` | ⏳ | pending |
| 2445 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-6.md` | ⏳ | pending |
| 2446 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-7.md` | ⏳ | pending |
| 2447 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-8.md` | ⏳ | pending |
| 2448 | `apps/dwa/server/data/content/optimization/physical-vitality/workplace-mental-health/lesson-9.md` | ⏳ | pending |
| 2449 | `apps/dwa/server/data/content/optimization/purpose-meaning/coaching-mentoring/lesson-1.mdx` | ⏳ | pending |
| 2450 | `apps/dwa/server/data/content/optimization/purpose-meaning/coaching-mentoring/lesson-10.mdx` | ⏳ | pending |
| 2451 | `apps/dwa/server/data/content/optimization/purpose-meaning/coaching-mentoring/lesson-11.mdx` | ⏳ | pending |
| 2452 | `apps/dwa/server/data/content/optimization/purpose-meaning/coaching-mentoring/lesson-12.mdx` | ⏳ | pending |
| 2453 | `apps/dwa/server/data/content/optimization/purpose-meaning/coaching-mentoring/lesson-13.mdx` | ⏳ | pending |
| 2454 | `apps/dwa/server/data/content/optimization/purpose-meaning/coaching-mentoring/lesson-14.mdx` | ⏳ | pending |
| 2455 | `apps/dwa/server/data/content/optimization/purpose-meaning/coaching-mentoring/lesson-15.mdx` | ⏳ | pending |
| 2456 | `apps/dwa/server/data/content/optimization/purpose-meaning/coaching-mentoring/lesson-2.mdx` | ⏳ | pending |
| 2457 | `apps/dwa/server/data/content/optimization/purpose-meaning/coaching-mentoring/lesson-3.mdx` | ⏳ | pending |
| 2458 | `apps/dwa/server/data/content/optimization/purpose-meaning/coaching-mentoring/lesson-4.mdx` | ⏳ | pending |
| 2459 | `apps/dwa/server/data/content/optimization/purpose-meaning/coaching-mentoring/lesson-5.mdx` | ⏳ | pending |
| 2460 | `apps/dwa/server/data/content/optimization/purpose-meaning/coaching-mentoring/lesson-6.mdx` | ⏳ | pending |
| 2461 | `apps/dwa/server/data/content/optimization/purpose-meaning/coaching-mentoring/lesson-7.mdx` | ⏳ | pending |
| 2462 | `apps/dwa/server/data/content/optimization/purpose-meaning/coaching-mentoring/lesson-8.mdx` | ⏳ | pending |
| 2463 | `apps/dwa/server/data/content/optimization/purpose-meaning/coaching-mentoring/lesson-9.mdx` | ⏳ | pending |
| 2464 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-1.mdx` | ⏳ | pending |
| 2465 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-10.mdx` | ⏳ | pending |
| 2466 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-11.mdx` | ⏳ | pending |
| 2467 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-12.mdx` | ⏳ | pending |
| 2468 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-13.mdx` | ⏳ | pending |
| 2469 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-14.mdx` | ⏳ | pending |
| 2470 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-15.mdx` | ⏳ | pending |
| 2471 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-16.mdx` | ⏳ | pending |
| 2472 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-17.mdx` | ⏳ | pending |
| 2473 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-18.mdx` | ⏳ | pending |
| 2474 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-19.mdx` | ⏳ | pending |
| 2475 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-2.mdx` | ⏳ | pending |
| 2476 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-20.mdx` | ⏳ | pending |
| 2477 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-3.mdx` | ⏳ | pending |
| 2478 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-4.mdx` | ⏳ | pending |
| 2479 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-5.mdx` | ⏳ | pending |
| 2480 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-6.mdx` | ⏳ | pending |
| 2481 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-7.mdx` | ⏳ | pending |
| 2482 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-8.mdx` | ⏳ | pending |
| 2483 | `apps/dwa/server/data/content/optimization/purpose-meaning/legacy-building/lesson-9.mdx` | ⏳ | pending |
| 2484 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-1.mdx` | ⏳ | pending |
| 2485 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-10.mdx` | ⏳ | pending |
| 2486 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-11.mdx` | ⏳ | pending |
| 2487 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-12.mdx` | ⏳ | pending |
| 2488 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-13.mdx` | ⏳ | pending |
| 2489 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-14.mdx` | ⏳ | pending |
| 2490 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-15.mdx` | ⏳ | pending |
| 2491 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-16.mdx` | ⏳ | pending |
| 2492 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-17.mdx` | ⏳ | pending |
| 2493 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-18.mdx` | ⏳ | pending |
| 2494 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-19.mdx` | ⏳ | pending |
| 2495 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-2.mdx` | ⏳ | pending |
| 2496 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-20.mdx` | ⏳ | pending |
| 2497 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-3.mdx` | ⏳ | pending |
| 2498 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-4.mdx` | ⏳ | pending |
| 2499 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-5.mdx` | ⏳ | pending |
| 2500 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-6.mdx` | ⏳ | pending |
| 2501 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-7.mdx` | ⏳ | pending |
| 2502 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-8.mdx` | ⏳ | pending |
| 2503 | `apps/dwa/server/data/content/optimization/purpose-meaning/mental-health-first-aid/lesson-9.mdx` | ⏳ | pending |
| 2504 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-1.mdx` | ⏳ | pending |
| 2505 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-10.mdx` | ⏳ | pending |
| 2506 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-11.mdx` | ⏳ | pending |
| 2507 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-12.mdx` | ⏳ | pending |
| 2508 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-13.mdx` | ⏳ | pending |
| 2509 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-14.mdx` | ⏳ | pending |
| 2510 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-15.mdx` | ⏳ | pending |
| 2511 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-16.mdx` | ⏳ | pending |
| 2512 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-17.mdx` | ⏳ | pending |
| 2513 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-18.mdx` | ⏳ | pending |
| 2514 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-19.mdx` | ⏳ | pending |
| 2515 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-2.mdx` | ⏳ | pending |
| 2516 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-20.mdx` | ⏳ | pending |
| 2517 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-3.mdx` | ⏳ | pending |
| 2518 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-4.mdx` | ⏳ | pending |
| 2519 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-5.mdx` | ⏳ | pending |
| 2520 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-6.mdx` | ⏳ | pending |
| 2521 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-7.mdx` | ⏳ | pending |
| 2522 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-8.mdx` | ⏳ | pending |
| 2523 | `apps/dwa/server/data/content/optimization/purpose-meaning/purpose-and-responsibility/lesson-9.mdx` | ⏳ | pending |
| 2524 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-1.mdx` | ⏳ | pending |
| 2525 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-10.mdx` | ⏳ | pending |
| 2526 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-11.mdx` | ⏳ | pending |
| 2527 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-12.mdx` | ⏳ | pending |
| 2528 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-13.mdx` | ⏳ | pending |
| 2529 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-14.mdx` | ⏳ | pending |
| 2530 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-15.mdx` | ⏳ | pending |
| 2531 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-16.mdx` | ⏳ | pending |
| 2532 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-17.mdx` | ⏳ | pending |
| 2533 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-18.mdx` | ⏳ | pending |
| 2534 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-19.mdx` | ⏳ | pending |
| 2535 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-2.mdx` | ⏳ | pending |
| 2536 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-20.mdx` | ⏳ | pending |
| 2537 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-3.mdx` | ⏳ | pending |
| 2538 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-4.mdx` | ⏳ | pending |
| 2539 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-5.mdx` | ⏳ | pending |
| 2540 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-6.mdx` | ⏳ | pending |
| 2541 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-7.mdx` | ⏳ | pending |
| 2542 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-8.mdx` | ⏳ | pending |
| 2543 | `apps/dwa/server/data/content/optimization/social-connection/family-parenting-mental-health/lesson-9.mdx` | ⏳ | pending |
| 2544 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-1.mdx` | ⏳ | pending |
| 2545 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-10.mdx` | ⏳ | pending |
| 2546 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-11.mdx` | ⏳ | pending |
| 2547 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-12.mdx` | ⏳ | pending |
| 2548 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-13.mdx` | ⏳ | pending |
| 2549 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-14.mdx` | ⏳ | pending |
| 2550 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-15.mdx` | ⏳ | pending |
| 2551 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-16.mdx` | ⏳ | pending |
| 2552 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-17.mdx` | ⏳ | pending |
| 2553 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-18.mdx` | ⏳ | pending |
| 2554 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-19.mdx` | ⏳ | pending |
| 2555 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-2.mdx` | ⏳ | pending |
| 2556 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-20.mdx` | ⏳ | pending |
| 2557 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-3.mdx` | ⏳ | pending |
| 2558 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-4.mdx` | ⏳ | pending |
| 2559 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-5.mdx` | ⏳ | pending |
| 2560 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-6.mdx` | ⏳ | pending |
| 2561 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-7.mdx` | ⏳ | pending |
| 2562 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-8.mdx` | ⏳ | pending |
| 2563 | `apps/dwa/server/data/content/optimization/social-connection/relationship-dynamics/lesson-9.mdx` | ⏳ | pending |
| 2564 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-1.md` | ⏳ | pending |
| 2565 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-10.md` | ⏳ | pending |
| 2566 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-11.md` | ⏳ | pending |
| 2567 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-12.md` | ⏳ | pending |
| 2568 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-13.md` | ⏳ | pending |
| 2569 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-14.md` | ⏳ | pending |
| 2570 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-15.md` | ⏳ | pending |
| 2571 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-16.md` | ⏳ | pending |
| 2572 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-17.md` | ⏳ | pending |
| 2573 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-18.md` | ⏳ | pending |
| 2574 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-19.md` | ⏳ | pending |
| 2575 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-2.md` | ⏳ | pending |
| 2576 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-20.md` | ⏳ | pending |
| 2577 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-3.md` | ⏳ | pending |
| 2578 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-4.md` | ⏳ | pending |
| 2579 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-5.md` | ⏳ | pending |
| 2580 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-6.md` | ⏳ | pending |
| 2581 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-7.md` | ⏳ | pending |
| 2582 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-8.md` | ⏳ | pending |
| 2583 | `apps/dwa/server/data/content/optimization/social-connection/social-circle-mastery/lesson-9.md` | ⏳ | pending |
| 2584 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-1.mdx` | ⏳ | pending |
| 2585 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-10.mdx` | ⏳ | pending |
| 2586 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-11.mdx` | ⏳ | pending |
| 2587 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-12.mdx` | ⏳ | pending |
| 2588 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-13.mdx` | ⏳ | pending |
| 2589 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-14.mdx` | ⏳ | pending |
| 2590 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-15.mdx` | ⏳ | pending |
| 2591 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-16.mdx` | ⏳ | pending |
| 2592 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-17.mdx` | ⏳ | pending |
| 2593 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-18.mdx` | ⏳ | pending |
| 2594 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-19.mdx` | ⏳ | pending |
| 2595 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-2.mdx` | ⏳ | pending |
| 2596 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-20.mdx` | ⏳ | pending |
| 2597 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-3.mdx` | ⏳ | pending |
| 2598 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-4.mdx` | ⏳ | pending |
| 2599 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-5.mdx` | ⏳ | pending |
| 2600 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-6.mdx` | ⏳ | pending |
| 2601 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-7.mdx` | ⏳ | pending |
| 2602 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-8.mdx` | ⏳ | pending |
| 2603 | `apps/dwa/server/data/content/optimization/social-connection/team-sports-collective-activity/lesson-9.mdx` | ⏳ | pending |
| 2604 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-1.mdx` | ⏳ | pending |
| 2605 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-10.mdx` | ⏳ | pending |
| 2606 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-11.mdx` | ⏳ | pending |
| 2607 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-12.mdx` | ⏳ | pending |
| 2608 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-13.mdx` | ⏳ | pending |
| 2609 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-14.mdx` | ⏳ | pending |
| 2610 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-15.mdx` | ⏳ | pending |
| 2611 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-16.mdx` | ⏳ | pending |
| 2612 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-17.mdx` | ⏳ | pending |
| 2613 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-18.mdx` | ⏳ | pending |
| 2614 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-19.mdx` | ⏳ | pending |
| 2615 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-2.mdx` | ⏳ | pending |
| 2616 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-20.mdx` | ⏳ | pending |
| 2617 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-3.mdx` | ⏳ | pending |
| 2618 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-4.mdx` | ⏳ | pending |
| 2619 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-5.mdx` | ⏳ | pending |
| 2620 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-6.mdx` | ⏳ | pending |
| 2621 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-7.mdx` | ⏳ | pending |
| 2622 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-8.mdx` | ⏳ | pending |
| 2623 | `apps/dwa/server/data/content/optimization/stress-management/adventure-outdoor-mental-health/lesson-9.mdx` | ⏳ | pending |
| 2624 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-1.mdx` | ⏳ | pending |
| 2625 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-10.mdx` | ⏳ | pending |
| 2626 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-11.mdx` | ⏳ | pending |
| 2627 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-12.mdx` | ⏳ | pending |
| 2628 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-13.mdx` | ⏳ | pending |
| 2629 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-14.mdx` | ⏳ | pending |
| 2630 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-15.mdx` | ⏳ | pending |
| 2631 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-16.mdx` | ⏳ | pending |
| 2632 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-17.mdx` | ⏳ | pending |
| 2633 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-18.mdx` | ⏳ | pending |
| 2634 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-19.mdx` | ⏳ | pending |
| 2635 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-2.mdx` | ⏳ | pending |
| 2636 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-20.mdx` | ⏳ | pending |
| 2637 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-3.mdx` | ⏳ | pending |
| 2638 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-4.mdx` | ⏳ | pending |
| 2639 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-5.mdx` | ⏳ | pending |
| 2640 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-6.mdx` | ⏳ | pending |
| 2641 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-7.mdx` | ⏳ | pending |
| 2642 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-8.mdx` | ⏳ | pending |
| 2643 | `apps/dwa/server/data/content/optimization/stress-management/creative-expression/lesson-9.mdx` | ⏳ | pending |
| 2644 | `apps/dwa/server/data/content/sleep-recovery/sleep-insomnia/lesson-1.md` | ⏳ | pending |
| 2645 | `apps/dwa/server/data/content/sleep-recovery/sleep-insomnia/lesson-2.md` | ⏳ | pending |
| 2646 | `apps/dwa/server/data/content/sleep-recovery/sleep-insomnia/lesson-3.md` | ⏳ | pending |
| 2647 | `apps/dwa/server/data/content/sleep-recovery/sleep-insomnia/lesson-4.md` | ⏳ | pending |
| 2648 | `apps/dwa/server/data/content/sleep-recovery/sleep-insomnia/lesson-5.md` | ⏳ | pending |
| 2649 | `apps/dwa/server/data/content/sleep-recovery/sleep-insomnia/lesson-6.md` | ⏳ | pending |
| 2650 | `apps/dwa/server/data/content/sleep-recovery/sleep-insomnia/lesson-7.md` | ⏳ | pending |
| 2651 | `apps/dwa/server/data/content/sleep-recovery/sleep-insomnia/lesson-8.md` | ⏳ | pending |
| 2652 | `apps/dwa/server/data/content/sleep-recovery/sleep-mastery/lesson-1.md` | ⏳ | pending |
| 2653 | `apps/dwa/server/data/content/sleep-recovery/sleep-mastery/lesson-10.md` | ⏳ | pending |
| 2654 | `apps/dwa/server/data/content/sleep-recovery/sleep-mastery/lesson-11.md` | ⏳ | pending |
| 2655 | `apps/dwa/server/data/content/sleep-recovery/sleep-mastery/lesson-12.md` | ⏳ | pending |
| 2656 | `apps/dwa/server/data/content/sleep-recovery/sleep-mastery/lesson-2.md` | ⏳ | pending |
| 2657 | `apps/dwa/server/data/content/sleep-recovery/sleep-mastery/lesson-3.md` | ⏳ | pending |
| 2658 | `apps/dwa/server/data/content/sleep-recovery/sleep-mastery/lesson-4.md` | ⏳ | pending |
| 2659 | `apps/dwa/server/data/content/sleep-recovery/sleep-mastery/lesson-5.md` | ⏳ | pending |
| 2660 | `apps/dwa/server/data/content/sleep-recovery/sleep-mastery/lesson-6.md` | ⏳ | pending |
| 2661 | `apps/dwa/server/data/content/sleep-recovery/sleep-mastery/lesson-7.md` | ⏳ | pending |
| 2662 | `apps/dwa/server/data/content/sleep-recovery/sleep-mastery/lesson-8.md` | ⏳ | pending |
| 2663 | `apps/dwa/server/data/content/sleep-recovery/sleep-mastery/lesson-9.md` | ⏳ | pending |
| 2664 | `apps/dwa/server/data/content/stress-resilience/stress-burnout/lesson-1.md` | ⏳ | pending |
| 2665 | `apps/dwa/server/data/content/stress-resilience/stress-burnout/lesson-2.md` | ⏳ | pending |
| 2666 | `apps/dwa/server/data/content/stress-resilience/stress-burnout/lesson-3.md` | ⏳ | pending |
| 2667 | `apps/dwa/server/data/content/stress-resilience/stress-burnout/lesson-4.md` | ⏳ | pending |
| 2668 | `apps/dwa/server/data/content/stress-resilience/stress-burnout/lesson-5.md` | ⏳ | pending |
| 2669 | `apps/dwa/server/data/content/stress-resilience/stress-burnout/lesson-6.md` | ⏳ | pending |
| 2670 | `apps/dwa/server/data/content/stress-resilience/stress-burnout/lesson-7.md` | ⏳ | pending |
| 2671 | `apps/dwa/server/data/content/stress-resilience/stress-burnout/lesson-8.md` | ⏳ | pending |
| 2672 | `apps/dwa/server/data/content/stress-resilience/trauma-recovery/lesson-1.md` | ⏳ | pending |
| 2673 | `apps/dwa/server/data/content/stress-resilience/trauma-recovery/lesson-2.md` | ⏳ | pending |
| 2674 | `apps/dwa/server/data/content/stress-resilience/trauma-recovery/lesson-3.md` | ⏳ | pending |
| 2675 | `apps/dwa/server/data/content/stress-resilience/trauma-recovery/lesson-4.md` | ⏳ | pending |
| 2676 | `apps/dwa/server/data/content/stress-resilience/trauma-recovery/lesson-5.md` | ⏳ | pending |
| 2677 | `apps/dwa/server/data/content/stress-resilience/trauma-recovery/lesson-6.md` | ⏳ | pending |
| 2678 | `apps/dwa/server/data/content/stress-resilience/trauma-recovery/lesson-7.md` | ⏳ | pending |
| 2679 | `apps/dwa/server/data/content/stress-resilience/trauma-recovery/lesson-8.md` | ⏳ | pending |
| 2680 | `apps/dwa/server/data/curriculumData.js` | ⏳ | pending |
| 2681 | `apps/dwa/server/data/personas.js` | ⏳ | pending |
| 2682 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-management/lesson-1.json` | ⏳ | pending |
| 2683 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-management/lesson-2.json` | ⏳ | pending |
| 2684 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-management/lesson-3.json` | ⏳ | pending |
| 2685 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-management/lesson-4.json` | ⏳ | pending |
| 2686 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-management/lesson-5.json` | ⏳ | pending |
| 2687 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-management/lesson-6.json` | ⏳ | pending |
| 2688 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-management/lesson-7.json` | ⏳ | pending |
| 2689 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-management/lesson-8.json` | ⏳ | pending |
| 2690 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-foundations/lesson-1.json` | ⏳ | pending |
| 2691 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-foundations/lesson-2.json` | ⏳ | pending |
| 2692 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-foundations/lesson-3.json` | ⏳ | pending |
| 2693 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-foundations/lesson-4.json` | ⏳ | pending |
| 2694 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-foundations/lesson-5.json` | ⏳ | pending |
| 2695 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-foundations/lesson-6.json` | ⏳ | pending |
| 2696 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-foundations/lesson-7.json` | ⏳ | pending |
| 2697 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-foundations/lesson-8.json` | ⏳ | pending |
| 2698 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-resilience/lesson-1.json` | ⏳ | pending |
| 2699 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-resilience/lesson-2.json` | ⏳ | pending |
| 2700 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-resilience/lesson-3.json` | ⏳ | pending |
| 2701 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-resilience/lesson-4.json` | ⏳ | pending |
| 2702 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-resilience/lesson-5.json` | ⏳ | pending |
| 2703 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-resilience/lesson-6.json` | ⏳ | pending |
| 2704 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-resilience/lesson-7.json` | ⏳ | pending |
| 2705 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-resilience/lesson-8.json` | ⏳ | pending |
| 2706 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-skills/lesson-1.json` | ⏳ | pending |
| 2707 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-skills/lesson-2.json` | ⏳ | pending |
| 2708 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-skills/lesson-3.json` | ⏳ | pending |
| 2709 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-skills/lesson-4.json` | ⏳ | pending |
| 2710 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-skills/lesson-5.json` | ⏳ | pending |
| 2711 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-skills/lesson-6.json` | ⏳ | pending |
| 2712 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-skills/lesson-7.json` | ⏳ | pending |
| 2713 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit-skills/lesson-8.json` | ⏳ | pending |
| 2714 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit/lesson-1.json` | ⏳ | pending |
| 2715 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit/lesson-10.json` | ⏳ | pending |
| 2716 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit/lesson-11.json` | ⏳ | pending |
| 2717 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit/lesson-12.json` | ⏳ | pending |
| 2718 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit/lesson-2.json` | ⏳ | pending |
| 2719 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit/lesson-3.json` | ⏳ | pending |
| 2720 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit/lesson-4.json` | ⏳ | pending |
| 2721 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit/lesson-5.json` | ⏳ | pending |
| 2722 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit/lesson-6.json` | ⏳ | pending |
| 2723 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit/lesson-7.json` | ⏳ | pending |
| 2724 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit/lesson-8.json` | ⏳ | pending |
| 2725 | `apps/dwa/server/data/quizzes/anxiety-and-fear/anxiety-toolkit/lesson-9.json` | ⏳ | pending |
| 2726 | `apps/dwa/server/data/quizzes/anxiety-and-fear/ocd-toolkit/lesson-1.json` | ⏳ | pending |
| 2727 | `apps/dwa/server/data/quizzes/anxiety-and-fear/ocd-toolkit/lesson-2.json` | ⏳ | pending |
| 2728 | `apps/dwa/server/data/quizzes/anxiety-and-fear/ocd-toolkit/lesson-3.json` | ⏳ | pending |
| 2729 | `apps/dwa/server/data/quizzes/anxiety-and-fear/ocd-toolkit/lesson-4.json` | ⏳ | pending |
| 2730 | `apps/dwa/server/data/quizzes/anxiety-and-fear/ocd-toolkit/lesson-5.json` | ⏳ | pending |
| 2731 | `apps/dwa/server/data/quizzes/anxiety-and-fear/ocd-toolkit/lesson-6.json` | ⏳ | pending |
| 2732 | `apps/dwa/server/data/quizzes/anxiety-and-fear/ocd-toolkit/lesson-7.json` | ⏳ | pending |
| 2733 | `apps/dwa/server/data/quizzes/anxiety-and-fear/ocd-toolkit/lesson-8.json` | ⏳ | pending |
| 2734 | `apps/dwa/server/data/quizzes/anxiety-and-fear/panic-disorder/lesson-1.json` | ⏳ | pending |
| 2735 | `apps/dwa/server/data/quizzes/anxiety-and-fear/panic-disorder/lesson-2.json` | ⏳ | pending |
| 2736 | `apps/dwa/server/data/quizzes/anxiety-and-fear/panic-disorder/lesson-3.json` | ⏳ | pending |
| 2737 | `apps/dwa/server/data/quizzes/anxiety-and-fear/panic-disorder/lesson-4.json` | ⏳ | pending |
| 2738 | `apps/dwa/server/data/quizzes/anxiety-and-fear/panic-disorder/lesson-5.json` | ⏳ | pending |
| 2739 | `apps/dwa/server/data/quizzes/anxiety-and-fear/panic-disorder/lesson-6.json` | ⏳ | pending |
| 2740 | `apps/dwa/server/data/quizzes/anxiety-and-fear/panic-disorder/lesson-7.json` | ⏳ | pending |
| 2741 | `apps/dwa/server/data/quizzes/anxiety-and-fear/panic-disorder/lesson-8.json` | ⏳ | pending |
| 2742 | `apps/dwa/server/data/quizzes/anxiety-and-fear/social-anxiety/lesson-1.json` | ⏳ | pending |
| 2743 | `apps/dwa/server/data/quizzes/anxiety-and-fear/social-anxiety/lesson-2.json` | ⏳ | pending |
| 2744 | `apps/dwa/server/data/quizzes/anxiety-and-fear/social-anxiety/lesson-3.json` | ⏳ | pending |
| 2745 | `apps/dwa/server/data/quizzes/anxiety-and-fear/social-anxiety/lesson-4.json` | ⏳ | pending |
| 2746 | `apps/dwa/server/data/quizzes/anxiety-and-fear/social-anxiety/lesson-5.json` | ⏳ | pending |
| 2747 | `apps/dwa/server/data/quizzes/anxiety-and-fear/social-anxiety/lesson-6.json` | ⏳ | pending |
| 2748 | `apps/dwa/server/data/quizzes/anxiety-and-fear/social-anxiety/lesson-7.json` | ⏳ | pending |
| 2749 | `apps/dwa/server/data/quizzes/anxiety-and-fear/social-anxiety/lesson-8.json` | ⏳ | pending |
| 2750 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-1.json` | ⏳ | pending |
| 2751 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-10.json` | ⏳ | pending |
| 2752 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-11.json` | ⏳ | pending |
| 2753 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-12.json` | ⏳ | pending |
| 2754 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-13.json` | ⏳ | pending |
| 2755 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-14.json` | ⏳ | pending |
| 2756 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-15.json` | ⏳ | pending |
| 2757 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-16.json` | ⏳ | pending |
| 2758 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-17.json` | ⏳ | pending |
| 2759 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-18.json` | ⏳ | pending |
| 2760 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-19.json` | ⏳ | pending |
| 2761 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-2.json` | ⏳ | pending |
| 2762 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-20.json` | ⏳ | pending |
| 2763 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-3.json` | ⏳ | pending |
| 2764 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-4.json` | ⏳ | pending |
| 2765 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-5.json` | ⏳ | pending |
| 2766 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-6.json` | ⏳ | pending |
| 2767 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-7.json` | ⏳ | pending |
| 2768 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-8.json` | ⏳ | pending |
| 2769 | `apps/dwa/server/data/quizzes/emotional-mastery/stress-challenge-navigation/lesson-9.json` | ⏳ | pending |
| 2770 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-1.json` | ⏳ | pending |
| 2771 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-10.json` | ⏳ | pending |
| 2772 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-11.json` | ⏳ | pending |
| 2773 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-12.json` | ⏳ | pending |
| 2774 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-13.json` | ⏳ | pending |
| 2775 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-14.json` | ⏳ | pending |
| 2776 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-15.json` | ⏳ | pending |
| 2777 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-16.json` | ⏳ | pending |
| 2778 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-17.json` | ⏳ | pending |
| 2779 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-18.json` | ⏳ | pending |
| 2780 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-19.json` | ⏳ | pending |
| 2781 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-2.json` | ⏳ | pending |
| 2782 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-20.json` | ⏳ | pending |
| 2783 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-3.json` | ⏳ | pending |
| 2784 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-4.json` | ⏳ | pending |
| 2785 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-5.json` | ⏳ | pending |
| 2786 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-6.json` | ⏳ | pending |
| 2787 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-7.json` | ⏳ | pending |
| 2788 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-8.json` | ⏳ | pending |
| 2789 | `apps/dwa/server/data/quizzes/emotional-resilience/cbt-fundamentals/lesson-9.json` | ⏳ | pending |
| 2790 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-1.json` | ⏳ | pending |
| 2791 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-10.json` | ⏳ | pending |
| 2792 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-11.json` | ⏳ | pending |
| 2793 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-12.json` | ⏳ | pending |
| 2794 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-13.json` | ⏳ | pending |
| 2795 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-14.json` | ⏳ | pending |
| 2796 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-15.json` | ⏳ | pending |
| 2797 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-16.json` | ⏳ | pending |
| 2798 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-17.json` | ⏳ | pending |
| 2799 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-18.json` | ⏳ | pending |
| 2800 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-19.json` | ⏳ | pending |
| 2801 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-2.json` | ⏳ | pending |
| 2802 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-20.json` | ⏳ | pending |
| 2803 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-3.json` | ⏳ | pending |
| 2804 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-4.json` | ⏳ | pending |
| 2805 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-5.json` | ⏳ | pending |
| 2806 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-6.json` | ⏳ | pending |
| 2807 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-7.json` | ⏳ | pending |
| 2808 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-8.json` | ⏳ | pending |
| 2809 | `apps/dwa/server/data/quizzes/emotional-resilience/growth-mindset/lesson-9.json` | ⏳ | pending |
| 2810 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-1.json` | ⏳ | pending |
| 2811 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-10.json` | ⏳ | pending |
| 2812 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-11.json` | ⏳ | pending |
| 2813 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-12.json` | ⏳ | pending |
| 2814 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-13.json` | ⏳ | pending |
| 2815 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-14.json` | ⏳ | pending |
| 2816 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-15.json` | ⏳ | pending |
| 2817 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-16.json` | ⏳ | pending |
| 2818 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-17.json` | ⏳ | pending |
| 2819 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-18.json` | ⏳ | pending |
| 2820 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-19.json` | ⏳ | pending |
| 2821 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-2.json` | ⏳ | pending |
| 2822 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-20.json` | ⏳ | pending |
| 2823 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-3.json` | ⏳ | pending |
| 2824 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-4.json` | ⏳ | pending |
| 2825 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-5.json` | ⏳ | pending |
| 2826 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-6.json` | ⏳ | pending |
| 2827 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-7.json` | ⏳ | pending |
| 2828 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-8.json` | ⏳ | pending |
| 2829 | `apps/dwa/server/data/quizzes/emotional-resilience/healthy-boundaries/lesson-9.json` | ⏳ | pending |
| 2830 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-1.json` | ⏳ | pending |
| 2831 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-10.json` | ⏳ | pending |
| 2832 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-11.json` | ⏳ | pending |
| 2833 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-12.json` | ⏳ | pending |
| 2834 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-13.json` | ⏳ | pending |
| 2835 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-14.json` | ⏳ | pending |
| 2836 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-15.json` | ⏳ | pending |
| 2837 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-16.json` | ⏳ | pending |
| 2838 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-17.json` | ⏳ | pending |
| 2839 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-18.json` | ⏳ | pending |
| 2840 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-19.json` | ⏳ | pending |
| 2841 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-2.json` | ⏳ | pending |
| 2842 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-20.json` | ⏳ | pending |
| 2843 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-3.json` | ⏳ | pending |
| 2844 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-4.json` | ⏳ | pending |
| 2845 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-5.json` | ⏳ | pending |
| 2846 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-6.json` | ⏳ | pending |
| 2847 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-7.json` | ⏳ | pending |
| 2848 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-8.json` | ⏳ | pending |
| 2849 | `apps/dwa/server/data/quizzes/mental-clarity/digital-wellness/lesson-9.json` | ⏳ | pending |
| 2850 | `apps/dwa/server/data/quizzes/mood-emotional-health/anger-management/lesson-1.json` | ⏳ | pending |
| 2851 | `apps/dwa/server/data/quizzes/mood-emotional-health/anger-management/lesson-2.json` | ⏳ | pending |
| 2852 | `apps/dwa/server/data/quizzes/mood-emotional-health/anger-management/lesson-3.json` | ⏳ | pending |
| 2853 | `apps/dwa/server/data/quizzes/mood-emotional-health/anger-management/lesson-4.json` | ⏳ | pending |
| 2854 | `apps/dwa/server/data/quizzes/mood-emotional-health/anger-management/lesson-5.json` | ⏳ | pending |
| 2855 | `apps/dwa/server/data/quizzes/mood-emotional-health/anger-management/lesson-6.json` | ⏳ | pending |
| 2856 | `apps/dwa/server/data/quizzes/mood-emotional-health/anger-management/lesson-7.json` | ⏳ | pending |
| 2857 | `apps/dwa/server/data/quizzes/mood-emotional-health/anger-management/lesson-8.json` | ⏳ | pending |
| 2858 | `apps/dwa/server/data/quizzes/mood-emotional-health/bipolar-disorder/lesson-1.json` | ⏳ | pending |
| 2859 | `apps/dwa/server/data/quizzes/mood-emotional-health/bipolar-disorder/lesson-2.json` | ⏳ | pending |
| 2860 | `apps/dwa/server/data/quizzes/mood-emotional-health/bipolar-disorder/lesson-3.json` | ⏳ | pending |
| 2861 | `apps/dwa/server/data/quizzes/mood-emotional-health/bipolar-disorder/lesson-4.json` | ⏳ | pending |
| 2862 | `apps/dwa/server/data/quizzes/mood-emotional-health/bipolar-disorder/lesson-5.json` | ⏳ | pending |
| 2863 | `apps/dwa/server/data/quizzes/mood-emotional-health/bipolar-disorder/lesson-6.json` | ⏳ | pending |
| 2864 | `apps/dwa/server/data/quizzes/mood-emotional-health/bipolar-disorder/lesson-7.json` | ⏳ | pending |
| 2865 | `apps/dwa/server/data/quizzes/mood-emotional-health/bipolar-disorder/lesson-8.json` | ⏳ | pending |
| 2866 | `apps/dwa/server/data/quizzes/mood-emotional-health/depression-action/lesson-1.json` | ⏳ | pending |
| 2867 | `apps/dwa/server/data/quizzes/mood-emotional-health/depression-action/lesson-2.json` | ⏳ | pending |
| 2868 | `apps/dwa/server/data/quizzes/mood-emotional-health/depression-action/lesson-3.json` | ⏳ | pending |
| 2869 | `apps/dwa/server/data/quizzes/mood-emotional-health/depression-action/lesson-4.json` | ⏳ | pending |
| 2870 | `apps/dwa/server/data/quizzes/mood-emotional-health/depression-action/lesson-5.json` | ⏳ | pending |
| 2871 | `apps/dwa/server/data/quizzes/mood-emotional-health/depression-action/lesson-6.json` | ⏳ | pending |
| 2872 | `apps/dwa/server/data/quizzes/mood-emotional-health/depression-action/lesson-7.json` | ⏳ | pending |
| 2873 | `apps/dwa/server/data/quizzes/mood-emotional-health/depression-action/lesson-8.json` | ⏳ | pending |
| 2874 | `apps/dwa/server/data/quizzes/mood-emotional-health/emotional-dysregulation/lesson-1.json` | ⏳ | pending |
| 2875 | `apps/dwa/server/data/quizzes/mood-emotional-health/emotional-dysregulation/lesson-2.json` | ⏳ | pending |
| 2876 | `apps/dwa/server/data/quizzes/mood-emotional-health/emotional-dysregulation/lesson-3.json` | ⏳ | pending |
| 2877 | `apps/dwa/server/data/quizzes/mood-emotional-health/emotional-dysregulation/lesson-4.json` | ⏳ | pending |
| 2878 | `apps/dwa/server/data/quizzes/mood-emotional-health/emotional-dysregulation/lesson-5.json` | ⏳ | pending |
| 2879 | `apps/dwa/server/data/quizzes/mood-emotional-health/emotional-dysregulation/lesson-6.json` | ⏳ | pending |
| 2880 | `apps/dwa/server/data/quizzes/mood-emotional-health/emotional-dysregulation/lesson-7.json` | ⏳ | pending |
| 2881 | `apps/dwa/server/data/quizzes/mood-emotional-health/emotional-dysregulation/lesson-8.json` | ⏳ | pending |
| 2882 | `apps/dwa/server/data/quizzes/mood-emotional-health/grief-loss/lesson-1.json` | ⏳ | pending |
| 2883 | `apps/dwa/server/data/quizzes/mood-emotional-health/grief-loss/lesson-2.json` | ⏳ | pending |
| 2884 | `apps/dwa/server/data/quizzes/mood-emotional-health/grief-loss/lesson-3.json` | ⏳ | pending |
| 2885 | `apps/dwa/server/data/quizzes/mood-emotional-health/grief-loss/lesson-4.json` | ⏳ | pending |
| 2886 | `apps/dwa/server/data/quizzes/mood-emotional-health/grief-loss/lesson-5.json` | ⏳ | pending |
| 2887 | `apps/dwa/server/data/quizzes/mood-emotional-health/grief-loss/lesson-6.json` | ⏳ | pending |
| 2888 | `apps/dwa/server/data/quizzes/mood-emotional-health/grief-loss/lesson-7.json` | ⏳ | pending |
| 2889 | `apps/dwa/server/data/quizzes/mood-emotional-health/grief-loss/lesson-8.json` | ⏳ | pending |
| 2890 | `apps/dwa/server/data/quizzes/mood-emotional-health/low-self-esteem/lesson-1.json` | ⏳ | pending |
| 2891 | `apps/dwa/server/data/quizzes/mood-emotional-health/low-self-esteem/lesson-2.json` | ⏳ | pending |
| 2892 | `apps/dwa/server/data/quizzes/mood-emotional-health/low-self-esteem/lesson-3.json` | ⏳ | pending |
| 2893 | `apps/dwa/server/data/quizzes/mood-emotional-health/low-self-esteem/lesson-4.json` | ⏳ | pending |
| 2894 | `apps/dwa/server/data/quizzes/mood-emotional-health/low-self-esteem/lesson-5.json` | ⏳ | pending |
| 2895 | `apps/dwa/server/data/quizzes/mood-emotional-health/low-self-esteem/lesson-6.json` | ⏳ | pending |
| 2896 | `apps/dwa/server/data/quizzes/mood-emotional-health/low-self-esteem/lesson-7.json` | ⏳ | pending |
| 2897 | `apps/dwa/server/data/quizzes/mood-emotional-health/low-self-esteem/lesson-8.json` | ⏳ | pending |
| 2898 | `apps/dwa/server/data/quizzes/mood-emotional-health/managing-perfectionism/lesson-1.json` | ⏳ | pending |
| 2899 | `apps/dwa/server/data/quizzes/mood-emotional-health/managing-perfectionism/lesson-2.json` | ⏳ | pending |
| 2900 | `apps/dwa/server/data/quizzes/mood-emotional-health/managing-perfectionism/lesson-3.json` | ⏳ | pending |
| 2901 | `apps/dwa/server/data/quizzes/mood-emotional-health/managing-perfectionism/lesson-4.json` | ⏳ | pending |
| 2902 | `apps/dwa/server/data/quizzes/mood-emotional-health/managing-perfectionism/lesson-5.json` | ⏳ | pending |
| 2903 | `apps/dwa/server/data/quizzes/mood-emotional-health/managing-perfectionism/lesson-6.json` | ⏳ | pending |
| 2904 | `apps/dwa/server/data/quizzes/mood-emotional-health/managing-perfectionism/lesson-7.json` | ⏳ | pending |
| 2905 | `apps/dwa/server/data/quizzes/mood-emotional-health/managing-perfectionism/lesson-8.json` | ⏳ | pending |
| 2906 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-1.json` | ⏳ | pending |
| 2907 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-10.json` | ⏳ | pending |
| 2908 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-11.json` | ⏳ | pending |
| 2909 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-12.json` | ⏳ | pending |
| 2910 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-13.json` | ⏳ | pending |
| 2911 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-14.json` | ⏳ | pending |
| 2912 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-15.json` | ⏳ | pending |
| 2913 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-16.json` | ⏳ | pending |
| 2914 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-17.json` | ⏳ | pending |
| 2915 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-18.json` | ⏳ | pending |
| 2916 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-19.json` | ⏳ | pending |
| 2917 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-2.json` | ⏳ | pending |
| 2918 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-20.json` | ⏳ | pending |
| 2919 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-3.json` | ⏳ | pending |
| 2920 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-4.json` | ⏳ | pending |
| 2921 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-5.json` | ⏳ | pending |
| 2922 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-6.json` | ⏳ | pending |
| 2923 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-7.json` | ⏳ | pending |
| 2924 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-8.json` | ⏳ | pending |
| 2925 | `apps/dwa/server/data/quizzes/movement-exercise/music-movement-wellness/lesson-9.json` | ⏳ | pending |
| 2926 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-1.json` | ⏳ | pending |
| 2927 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-10.json` | ⏳ | pending |
| 2928 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-11.json` | ⏳ | pending |
| 2929 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-12.json` | ⏳ | pending |
| 2930 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-13.json` | ⏳ | pending |
| 2931 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-14.json` | ⏳ | pending |
| 2932 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-15.json` | ⏳ | pending |
| 2933 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-16.json` | ⏳ | pending |
| 2934 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-17.json` | ⏳ | pending |
| 2935 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-18.json` | ⏳ | pending |
| 2936 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-19.json` | ⏳ | pending |
| 2937 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-2.json` | ⏳ | pending |
| 2938 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-20.json` | ⏳ | pending |
| 2939 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-3.json` | ⏳ | pending |
| 2940 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-4.json` | ⏳ | pending |
| 2941 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-5.json` | ⏳ | pending |
| 2942 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-6.json` | ⏳ | pending |
| 2943 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-7.json` | ⏳ | pending |
| 2944 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-8.json` | ⏳ | pending |
| 2945 | `apps/dwa/server/data/quizzes/movement-exercise/recreational-therapy/lesson-9.json` | ⏳ | pending |
| 2946 | `apps/dwa/server/data/quizzes/nutrition-brain-health/dietary-patterns/lesson-1.json` | ⏳ | pending |
| 2947 | `apps/dwa/server/data/quizzes/nutrition-brain-health/dietary-patterns/lesson-10.json` | ⏳ | pending |
| 2948 | `apps/dwa/server/data/quizzes/nutrition-brain-health/dietary-patterns/lesson-11.json` | ⏳ | pending |
| 2949 | `apps/dwa/server/data/quizzes/nutrition-brain-health/dietary-patterns/lesson-12.json` | ⏳ | pending |
| 2950 | `apps/dwa/server/data/quizzes/nutrition-brain-health/dietary-patterns/lesson-2.json` | ⏳ | pending |
| 2951 | `apps/dwa/server/data/quizzes/nutrition-brain-health/dietary-patterns/lesson-3.json` | ⏳ | pending |
| 2952 | `apps/dwa/server/data/quizzes/nutrition-brain-health/dietary-patterns/lesson-4.json` | ⏳ | pending |
| 2953 | `apps/dwa/server/data/quizzes/nutrition-brain-health/dietary-patterns/lesson-5.json` | ⏳ | pending |
| 2954 | `apps/dwa/server/data/quizzes/nutrition-brain-health/dietary-patterns/lesson-6.json` | ⏳ | pending |
| 2955 | `apps/dwa/server/data/quizzes/nutrition-brain-health/dietary-patterns/lesson-7.json` | ⏳ | pending |
| 2956 | `apps/dwa/server/data/quizzes/nutrition-brain-health/dietary-patterns/lesson-8.json` | ⏳ | pending |
| 2957 | `apps/dwa/server/data/quizzes/nutrition-brain-health/dietary-patterns/lesson-9.json` | ⏳ | pending |
| 2958 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-connection/lesson-1.json` | ⏳ | pending |
| 2959 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-connection/lesson-2.json` | ⏳ | pending |
| 2960 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-connection/lesson-3.json` | ⏳ | pending |
| 2961 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-connection/lesson-4.json` | ⏳ | pending |
| 2962 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-connection/lesson-5.json` | ⏳ | pending |
| 2963 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-connection/lesson-6.json` | ⏳ | pending |
| 2964 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-connection/lesson-7.json` | ⏳ | pending |
| 2965 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-connection/lesson-8.json` | ⏳ | pending |
| 2966 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-connection/lesson-9.json` | ⏳ | pending |
| 2967 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-mastery/lesson-1.json` | ⏳ | pending |
| 2968 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-mastery/lesson-10.json` | ⏳ | pending |
| 2969 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-mastery/lesson-11.json` | ⏳ | pending |
| 2970 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-mastery/lesson-12.json` | ⏳ | pending |
| 2971 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-mastery/lesson-2.json` | ⏳ | pending |
| 2972 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-mastery/lesson-3.json` | ⏳ | pending |
| 2973 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-mastery/lesson-4.json` | ⏳ | pending |
| 2974 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-mastery/lesson-5.json` | ⏳ | pending |
| 2975 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-mastery/lesson-6.json` | ⏳ | pending |
| 2976 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-mastery/lesson-7.json` | ⏳ | pending |
| 2977 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-mastery/lesson-8.json` | ⏳ | pending |
| 2978 | `apps/dwa/server/data/quizzes/nutrition-brain-health/food-mood-mastery/lesson-9.json` | ⏳ | pending |
| 2979 | `apps/dwa/server/data/quizzes/nutrition-brain-health/gut-brain-foundations/lesson-1.json` | ⏳ | pending |
| 2980 | `apps/dwa/server/data/quizzes/nutrition-brain-health/gut-brain-foundations/lesson-10.json` | ⏳ | pending |
| 2981 | `apps/dwa/server/data/quizzes/nutrition-brain-health/gut-brain-foundations/lesson-11.json` | ⏳ | pending |
| 2982 | `apps/dwa/server/data/quizzes/nutrition-brain-health/gut-brain-foundations/lesson-12.json` | ⏳ | pending |
| 2983 | `apps/dwa/server/data/quizzes/nutrition-brain-health/gut-brain-foundations/lesson-2.json` | ⏳ | pending |
| 2984 | `apps/dwa/server/data/quizzes/nutrition-brain-health/gut-brain-foundations/lesson-3.json` | ⏳ | pending |
| 2985 | `apps/dwa/server/data/quizzes/nutrition-brain-health/gut-brain-foundations/lesson-4.json` | ⏳ | pending |
| 2986 | `apps/dwa/server/data/quizzes/nutrition-brain-health/gut-brain-foundations/lesson-5.json` | ⏳ | pending |
| 2987 | `apps/dwa/server/data/quizzes/nutrition-brain-health/gut-brain-foundations/lesson-6.json` | ⏳ | pending |
| 2988 | `apps/dwa/server/data/quizzes/nutrition-brain-health/gut-brain-foundations/lesson-7.json` | ⏳ | pending |
| 2989 | `apps/dwa/server/data/quizzes/nutrition-brain-health/gut-brain-foundations/lesson-8.json` | ⏳ | pending |
| 2990 | `apps/dwa/server/data/quizzes/nutrition-brain-health/gut-brain-foundations/lesson-9.json` | ⏳ | pending |
| 2991 | `apps/dwa/server/data/quizzes/nutrition-brain-health/precision-nutrition/lesson-1.json` | ⏳ | pending |
| 2992 | `apps/dwa/server/data/quizzes/nutrition-brain-health/precision-nutrition/lesson-10.json` | ⏳ | pending |
| 2993 | `apps/dwa/server/data/quizzes/nutrition-brain-health/precision-nutrition/lesson-11.json` | ⏳ | pending |
| 2994 | `apps/dwa/server/data/quizzes/nutrition-brain-health/precision-nutrition/lesson-12.json` | ⏳ | pending |
| 2995 | `apps/dwa/server/data/quizzes/nutrition-brain-health/precision-nutrition/lesson-2.json` | ⏳ | pending |
| 2996 | `apps/dwa/server/data/quizzes/nutrition-brain-health/precision-nutrition/lesson-3.json` | ⏳ | pending |
| 2997 | `apps/dwa/server/data/quizzes/nutrition-brain-health/precision-nutrition/lesson-4.json` | ⏳ | pending |
| 2998 | `apps/dwa/server/data/quizzes/nutrition-brain-health/precision-nutrition/lesson-5.json` | ⏳ | pending |
| 2999 | `apps/dwa/server/data/quizzes/nutrition-brain-health/precision-nutrition/lesson-6.json` | ⏳ | pending |
| 3000 | `apps/dwa/server/data/quizzes/nutrition-brain-health/precision-nutrition/lesson-7.json` | ⏳ | pending |
| 3001 | `apps/dwa/server/data/quizzes/nutrition-brain-health/precision-nutrition/lesson-8.json` | ⏳ | pending |
| 3002 | `apps/dwa/server/data/quizzes/nutrition-brain-health/precision-nutrition/lesson-9.json` | ⏳ | pending |
| 3003 | `apps/dwa/server/data/quizzes/optimization/cbt-fundamentals/lesson-1.json` | ⏳ | pending |
| 3004 | `apps/dwa/server/data/quizzes/optimization/cbt-fundamentals/lesson-2.json` | ⏳ | pending |
| 3005 | `apps/dwa/server/data/quizzes/optimization/cbt-fundamentals/lesson-3.json` | ⏳ | pending |
| 3006 | `apps/dwa/server/data/quizzes/optimization/cbt-fundamentals/lesson-4.json` | ⏳ | pending |
| 3007 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-1.json` | ⏳ | pending |
| 3008 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-10.json` | ⏳ | pending |
| 3009 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-11.json` | ⏳ | pending |
| 3010 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-12.json` | ⏳ | pending |
| 3011 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-13.json` | ⏳ | pending |
| 3012 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-14.json` | ⏳ | pending |
| 3013 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-15.json` | ⏳ | pending |
| 3014 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-16.json` | ⏳ | pending |
| 3015 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-17.json` | ⏳ | pending |
| 3016 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-18.json` | ⏳ | pending |
| 3017 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-19.json` | ⏳ | pending |
| 3018 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-2.json` | ⏳ | pending |
| 3019 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-20.json` | ⏳ | pending |
| 3020 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-3.json` | ⏳ | pending |
| 3021 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-4.json` | ⏳ | pending |
| 3022 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-5.json` | ⏳ | pending |
| 3023 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-6.json` | ⏳ | pending |
| 3024 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-7.json` | ⏳ | pending |
| 3025 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-8.json` | ⏳ | pending |
| 3026 | `apps/dwa/server/data/quizzes/optimization/social-circle-mastery/lesson-9.json` | ⏳ | pending |
| 3027 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-1.json` | ⏳ | pending |
| 3028 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-10.json` | ⏳ | pending |
| 3029 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-11.json` | ⏳ | pending |
| 3030 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-12.json` | ⏳ | pending |
| 3031 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-13.json` | ⏳ | pending |
| 3032 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-14.json` | ⏳ | pending |
| 3033 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-15.json` | ⏳ | pending |
| 3034 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-16.json` | ⏳ | pending |
| 3035 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-17.json` | ⏳ | pending |
| 3036 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-18.json` | ⏳ | pending |
| 3037 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-19.json` | ⏳ | pending |
| 3038 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-2.json` | ⏳ | pending |
| 3039 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-20.json` | ⏳ | pending |
| 3040 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-3.json` | ⏳ | pending |
| 3041 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-4.json` | ⏳ | pending |
| 3042 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-5.json` | ⏳ | pending |
| 3043 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-6.json` | ⏳ | pending |
| 3044 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-7.json` | ⏳ | pending |
| 3045 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-8.json` | ⏳ | pending |
| 3046 | `apps/dwa/server/data/quizzes/physical-vitality/movement-for-mental-performance/lesson-9.json` | ⏳ | pending |
| 3047 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-1.json` | ⏳ | pending |
| 3048 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-10.json` | ⏳ | pending |
| 3049 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-11.json` | ⏳ | pending |
| 3050 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-12.json` | ⏳ | pending |
| 3051 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-13.json` | ⏳ | pending |
| 3052 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-14.json` | ⏳ | pending |
| 3053 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-15.json` | ⏳ | pending |
| 3054 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-16.json` | ⏳ | pending |
| 3055 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-17.json` | ⏳ | pending |
| 3056 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-18.json` | ⏳ | pending |
| 3057 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-19.json` | ⏳ | pending |
| 3058 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-2.json` | ⏳ | pending |
| 3059 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-20.json` | ⏳ | pending |
| 3060 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-3.json` | ⏳ | pending |
| 3061 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-4.json` | ⏳ | pending |
| 3062 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-5.json` | ⏳ | pending |
| 3063 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-6.json` | ⏳ | pending |
| 3064 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-7.json` | ⏳ | pending |
| 3065 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-8.json` | ⏳ | pending |
| 3066 | `apps/dwa/server/data/quizzes/physical-vitality/workplace-mental-health/lesson-9.json` | ⏳ | pending |
| 3067 | `apps/dwa/server/data/quizzes/purpose-meaning/coaching-mentoring/lesson-1.json` | ⏳ | pending |
| 3068 | `apps/dwa/server/data/quizzes/purpose-meaning/coaching-mentoring/lesson-10.json` | ⏳ | pending |
| 3069 | `apps/dwa/server/data/quizzes/purpose-meaning/coaching-mentoring/lesson-11.json` | ⏳ | pending |
| 3070 | `apps/dwa/server/data/quizzes/purpose-meaning/coaching-mentoring/lesson-12.json` | ⏳ | pending |
| 3071 | `apps/dwa/server/data/quizzes/purpose-meaning/coaching-mentoring/lesson-13.json` | ⏳ | pending |
| 3072 | `apps/dwa/server/data/quizzes/purpose-meaning/coaching-mentoring/lesson-14.json` | ⏳ | pending |
| 3073 | `apps/dwa/server/data/quizzes/purpose-meaning/coaching-mentoring/lesson-15.json` | ⏳ | pending |
| 3074 | `apps/dwa/server/data/quizzes/purpose-meaning/coaching-mentoring/lesson-2.json` | ⏳ | pending |
| 3075 | `apps/dwa/server/data/quizzes/purpose-meaning/coaching-mentoring/lesson-3.json` | ⏳ | pending |
| 3076 | `apps/dwa/server/data/quizzes/purpose-meaning/coaching-mentoring/lesson-4.json` | ⏳ | pending |
| 3077 | `apps/dwa/server/data/quizzes/purpose-meaning/coaching-mentoring/lesson-5.json` | ⏳ | pending |
| 3078 | `apps/dwa/server/data/quizzes/purpose-meaning/coaching-mentoring/lesson-6.json` | ⏳ | pending |
| 3079 | `apps/dwa/server/data/quizzes/purpose-meaning/coaching-mentoring/lesson-7.json` | ⏳ | pending |
| 3080 | `apps/dwa/server/data/quizzes/purpose-meaning/coaching-mentoring/lesson-8.json` | ⏳ | pending |
| 3081 | `apps/dwa/server/data/quizzes/purpose-meaning/coaching-mentoring/lesson-9.json` | ⏳ | pending |
| 3082 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-1.json` | ⏳ | pending |
| 3083 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-10.json` | ⏳ | pending |
| 3084 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-11.json` | ⏳ | pending |
| 3085 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-12.json` | ⏳ | pending |
| 3086 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-13.json` | ⏳ | pending |
| 3087 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-14.json` | ⏳ | pending |
| 3088 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-15.json` | ⏳ | pending |
| 3089 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-16.json` | ⏳ | pending |
| 3090 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-17.json` | ⏳ | pending |
| 3091 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-18.json` | ⏳ | pending |
| 3092 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-19.json` | ⏳ | pending |
| 3093 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-2.json` | ⏳ | pending |
| 3094 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-20.json` | ⏳ | pending |
| 3095 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-3.json` | ⏳ | pending |
| 3096 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-4.json` | ⏳ | pending |
| 3097 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-5.json` | ⏳ | pending |
| 3098 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-6.json` | ⏳ | pending |
| 3099 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-7.json` | ⏳ | pending |
| 3100 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-8.json` | ⏳ | pending |
| 3101 | `apps/dwa/server/data/quizzes/purpose-meaning/legacy-building/lesson-9.json` | ⏳ | pending |
| 3102 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-1.json` | ⏳ | pending |
| 3103 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-10.json` | ⏳ | pending |
| 3104 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-11.json` | ⏳ | pending |
| 3105 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-12.json` | ⏳ | pending |
| 3106 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-13.json` | ⏳ | pending |
| 3107 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-14.json` | ⏳ | pending |
| 3108 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-15.json` | ⏳ | pending |
| 3109 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-16.json` | ⏳ | pending |
| 3110 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-17.json` | ⏳ | pending |
| 3111 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-18.json` | ⏳ | pending |
| 3112 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-19.json` | ⏳ | pending |
| 3113 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-2.json` | ⏳ | pending |
| 3114 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-20.json` | ⏳ | pending |
| 3115 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-3.json` | ⏳ | pending |
| 3116 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-4.json` | ⏳ | pending |
| 3117 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-5.json` | ⏳ | pending |
| 3118 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-6.json` | ⏳ | pending |
| 3119 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-7.json` | ⏳ | pending |
| 3120 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-8.json` | ⏳ | pending |
| 3121 | `apps/dwa/server/data/quizzes/purpose-meaning/mental-health-first-aid/lesson-9.json` | ⏳ | pending |
| 3122 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-1.json` | ⏳ | pending |
| 3123 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-10.json` | ⏳ | pending |
| 3124 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-11.json` | ⏳ | pending |
| 3125 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-12.json` | ⏳ | pending |
| 3126 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-13.json` | ⏳ | pending |
| 3127 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-14.json` | ⏳ | pending |
| 3128 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-15.json` | ⏳ | pending |
| 3129 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-16.json` | ⏳ | pending |
| 3130 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-17.json` | ⏳ | pending |
| 3131 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-18.json` | ⏳ | pending |
| 3132 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-19.json` | ⏳ | pending |
| 3133 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-2.json` | ⏳ | pending |
| 3134 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-20.json` | ⏳ | pending |
| 3135 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-3.json` | ⏳ | pending |
| 3136 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-4.json` | ⏳ | pending |
| 3137 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-5.json` | ⏳ | pending |
| 3138 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-6.json` | ⏳ | pending |
| 3139 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-7.json` | ⏳ | pending |
| 3140 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-8.json` | ⏳ | pending |
| 3141 | `apps/dwa/server/data/quizzes/purpose-meaning/purpose-and-responsibility/lesson-9.json` | ⏳ | pending |
| 3142 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-insomnia/lesson-1.json` | ⏳ | pending |
| 3143 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-insomnia/lesson-2.json` | ⏳ | pending |
| 3144 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-insomnia/lesson-3.json` | ⏳ | pending |
| 3145 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-insomnia/lesson-4.json` | ⏳ | pending |
| 3146 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-insomnia/lesson-5.json` | ⏳ | pending |
| 3147 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-insomnia/lesson-6.json` | ⏳ | pending |
| 3148 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-insomnia/lesson-7.json` | ⏳ | pending |
| 3149 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-insomnia/lesson-8.json` | ⏳ | pending |
| 3150 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-mastery/lesson-1.json` | ⏳ | pending |
| 3151 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-mastery/lesson-10.json` | ⏳ | pending |
| 3152 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-mastery/lesson-11.json` | ⏳ | pending |
| 3153 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-mastery/lesson-12.json` | ⏳ | pending |
| 3154 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-mastery/lesson-2.json` | ⏳ | pending |
| 3155 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-mastery/lesson-3.json` | ⏳ | pending |
| 3156 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-mastery/lesson-4.json` | ⏳ | pending |
| 3157 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-mastery/lesson-5.json` | ⏳ | pending |
| 3158 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-mastery/lesson-6.json` | ⏳ | pending |
| 3159 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-mastery/lesson-7.json` | ⏳ | pending |
| 3160 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-mastery/lesson-8.json` | ⏳ | pending |
| 3161 | `apps/dwa/server/data/quizzes/sleep-recovery/sleep-mastery/lesson-9.json` | ⏳ | pending |
| 3162 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-1.json` | ⏳ | pending |
| 3163 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-10.json` | ⏳ | pending |
| 3164 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-11.json` | ⏳ | pending |
| 3165 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-12.json` | ⏳ | pending |
| 3166 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-13.json` | ⏳ | pending |
| 3167 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-14.json` | ⏳ | pending |
| 3168 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-15.json` | ⏳ | pending |
| 3169 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-16.json` | ⏳ | pending |
| 3170 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-17.json` | ⏳ | pending |
| 3171 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-18.json` | ⏳ | pending |
| 3172 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-19.json` | ⏳ | pending |
| 3173 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-2.json` | ⏳ | pending |
| 3174 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-20.json` | ⏳ | pending |
| 3175 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-3.json` | ⏳ | pending |
| 3176 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-4.json` | ⏳ | pending |
| 3177 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-5.json` | ⏳ | pending |
| 3178 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-6.json` | ⏳ | pending |
| 3179 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-7.json` | ⏳ | pending |
| 3180 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-8.json` | ⏳ | pending |
| 3181 | `apps/dwa/server/data/quizzes/social-connection/family-parenting-mental-health/lesson-9.json` | ⏳ | pending |
| 3182 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-1.json` | ⏳ | pending |
| 3183 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-10.json` | ⏳ | pending |
| 3184 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-11.json` | ⏳ | pending |
| 3185 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-12.json` | ⏳ | pending |
| 3186 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-13.json` | ⏳ | pending |
| 3187 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-14.json` | ⏳ | pending |
| 3188 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-15.json` | ⏳ | pending |
| 3189 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-16.json` | ⏳ | pending |
| 3190 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-17.json` | ⏳ | pending |
| 3191 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-18.json` | ⏳ | pending |
| 3192 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-19.json` | ⏳ | pending |
| 3193 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-2.json` | ⏳ | pending |
| 3194 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-20.json` | ⏳ | pending |
| 3195 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-3.json` | ⏳ | pending |
| 3196 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-4.json` | ⏳ | pending |
| 3197 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-5.json` | ⏳ | pending |
| 3198 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-6.json` | ⏳ | pending |
| 3199 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-7.json` | ⏳ | pending |
| 3200 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-8.json` | ⏳ | pending |
| 3201 | `apps/dwa/server/data/quizzes/social-connection/relationship-dynamics/lesson-9.json` | ⏳ | pending |
| 3202 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-1.json` | ⏳ | pending |
| 3203 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-10.json` | ⏳ | pending |
| 3204 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-11.json` | ⏳ | pending |
| 3205 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-12.json` | ⏳ | pending |
| 3206 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-13.json` | ⏳ | pending |
| 3207 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-14.json` | ⏳ | pending |
| 3208 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-15.json` | ⏳ | pending |
| 3209 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-16.json` | ⏳ | pending |
| 3210 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-17.json` | ⏳ | pending |
| 3211 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-18.json` | ⏳ | pending |
| 3212 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-19.json` | ⏳ | pending |
| 3213 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-2.json` | ⏳ | pending |
| 3214 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-20.json` | ⏳ | pending |
| 3215 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-3.json` | ⏳ | pending |
| 3216 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-4.json` | ⏳ | pending |
| 3217 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-5.json` | ⏳ | pending |
| 3218 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-6.json` | ⏳ | pending |
| 3219 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-7.json` | ⏳ | pending |
| 3220 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-8.json` | ⏳ | pending |
| 3221 | `apps/dwa/server/data/quizzes/social-connection/team-sports-collective-activity/lesson-9.json` | ⏳ | pending |
| 3222 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-1.json` | ⏳ | pending |
| 3223 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-10.json` | ⏳ | pending |
| 3224 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-11.json` | ⏳ | pending |
| 3225 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-12.json` | ⏳ | pending |
| 3226 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-13.json` | ⏳ | pending |
| 3227 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-14.json` | ⏳ | pending |
| 3228 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-15.json` | ⏳ | pending |
| 3229 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-16.json` | ⏳ | pending |
| 3230 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-17.json` | ⏳ | pending |
| 3231 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-18.json` | ⏳ | pending |
| 3232 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-19.json` | ⏳ | pending |
| 3233 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-2.json` | ⏳ | pending |
| 3234 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-20.json` | ⏳ | pending |
| 3235 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-3.json` | ⏳ | pending |
| 3236 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-4.json` | ⏳ | pending |
| 3237 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-5.json` | ⏳ | pending |
| 3238 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-6.json` | ⏳ | pending |
| 3239 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-7.json` | ⏳ | pending |
| 3240 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-8.json` | ⏳ | pending |
| 3241 | `apps/dwa/server/data/quizzes/stress-management/adventure-outdoor-mental-health/lesson-9.json` | ⏳ | pending |
| 3242 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-1.json` | ⏳ | pending |
| 3243 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-10.json` | ⏳ | pending |
| 3244 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-11.json` | ⏳ | pending |
| 3245 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-12.json` | ⏳ | pending |
| 3246 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-13.json` | ⏳ | pending |
| 3247 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-14.json` | ⏳ | pending |
| 3248 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-15.json` | ⏳ | pending |
| 3249 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-16.json` | ⏳ | pending |
| 3250 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-17.json` | ⏳ | pending |
| 3251 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-18.json` | ⏳ | pending |
| 3252 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-19.json` | ⏳ | pending |
| 3253 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-2.json` | ⏳ | pending |
| 3254 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-20.json` | ⏳ | pending |
| 3255 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-3.json` | ⏳ | pending |
| 3256 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-4.json` | ⏳ | pending |
| 3257 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-5.json` | ⏳ | pending |
| 3258 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-6.json` | ⏳ | pending |
| 3259 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-7.json` | ⏳ | pending |
| 3260 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-8.json` | ⏳ | pending |
| 3261 | `apps/dwa/server/data/quizzes/stress-management/creative-expression/lesson-9.json` | ⏳ | pending |
| 3262 | `apps/dwa/server/data/quizzes/stress-resilience/stress-burnout/lesson-1.json` | ⏳ | pending |
| 3263 | `apps/dwa/server/data/quizzes/stress-resilience/stress-burnout/lesson-2.json` | ⏳ | pending |
| 3264 | `apps/dwa/server/data/quizzes/stress-resilience/stress-burnout/lesson-3.json` | ⏳ | pending |
| 3265 | `apps/dwa/server/data/quizzes/stress-resilience/stress-burnout/lesson-4.json` | ⏳ | pending |
| 3266 | `apps/dwa/server/data/quizzes/stress-resilience/stress-burnout/lesson-5.json` | ⏳ | pending |
| 3267 | `apps/dwa/server/data/quizzes/stress-resilience/stress-burnout/lesson-6.json` | ⏳ | pending |
| 3268 | `apps/dwa/server/data/quizzes/stress-resilience/stress-burnout/lesson-7.json` | ⏳ | pending |
| 3269 | `apps/dwa/server/data/quizzes/stress-resilience/stress-burnout/lesson-8.json` | ⏳ | pending |
| 3270 | `apps/dwa/server/data/quizzes/stress-resilience/trauma-recovery/lesson-1.json` | ⏳ | pending |
| 3271 | `apps/dwa/server/data/quizzes/stress-resilience/trauma-recovery/lesson-2.json` | ⏳ | pending |
| 3272 | `apps/dwa/server/data/quizzes/stress-resilience/trauma-recovery/lesson-3.json` | ⏳ | pending |
| 3273 | `apps/dwa/server/data/quizzes/stress-resilience/trauma-recovery/lesson-4.json` | ⏳ | pending |
| 3274 | `apps/dwa/server/data/quizzes/stress-resilience/trauma-recovery/lesson-5.json` | ⏳ | pending |
| 3275 | `apps/dwa/server/data/quizzes/stress-resilience/trauma-recovery/lesson-6.json` | ⏳ | pending |
| 3276 | `apps/dwa/server/data/quizzes/stress-resilience/trauma-recovery/lesson-7.json` | ⏳ | pending |
| 3277 | `apps/dwa/server/data/quizzes/stress-resilience/trauma-recovery/lesson-8.json` | ⏳ | pending |
| 3278 | `apps/dwa/server/data/thought-records/anger-thought-record.json` | ⏳ | pending |
| 3279 | `apps/dwa/server/data/thought-records/anxiety-thought-record.json` | ⏳ | pending |
| 3280 | `apps/dwa/server/data/thought-records/bipolar-thought-record.json` | ⏳ | pending |
| 3281 | `apps/dwa/server/data/thought-records/boundary-setting-worksheet.json` | ⏳ | pending |
| 3282 | `apps/dwa/server/data/thought-records/continuing-bonds-reflection.json` | ⏳ | pending |
| 3283 | `apps/dwa/server/data/thought-records/depression-thought-record.json` | ⏳ | pending |
| 3284 | `apps/dwa/server/data/thought-records/emotion-analysis-worksheet.json` | ⏳ | pending |
| 3285 | `apps/dwa/server/data/thought-records/intrusive-thought-record.json` | ⏳ | pending |
| 3286 | `apps/dwa/server/data/thought-records/lesson-map.json` | ⏳ | pending |
| 3287 | `apps/dwa/server/data/thought-records/nutrition-thought-record.json` | ⏳ | pending |
| 3288 | `apps/dwa/server/data/thought-records/panic-thought-record.json` | ⏳ | pending |
| 3289 | `apps/dwa/server/data/thought-records/perfectionism-thought-record.json` | ⏳ | pending |
| 3290 | `apps/dwa/server/data/thought-records/self-esteem-thought-record.json` | ⏳ | pending |
| 3291 | `apps/dwa/server/data/thought-records/sleep-thought-record.json` | ⏳ | pending |
| 3292 | `apps/dwa/server/data/thought-records/social-anxiety-thought-record.json` | ⏳ | pending |
| 3293 | `apps/dwa/server/data/thought-records/trigger-response-record.json` | ⏳ | pending |
| 3294 | `apps/dwa/server/data/tracking-logs/activity-mood-log.json` | ⏳ | pending |
| 3295 | `apps/dwa/server/data/tracking-logs/anger-episode-log.json` | ⏳ | pending |
| 3296 | `apps/dwa/server/data/tracking-logs/anxiety-tracker.json` | ⏳ | pending |
| 3297 | `apps/dwa/server/data/tracking-logs/behavioral-experiment-log.json` | ⏳ | pending |
| 3298 | `apps/dwa/server/data/tracking-logs/dietary-pattern-log.json` | ⏳ | pending |
| 3299 | `apps/dwa/server/data/tracking-logs/emotion-skills-log.json` | ⏳ | pending |
| 3300 | `apps/dwa/server/data/tracking-logs/food-mood-log.json` | ⏳ | pending |
| 3301 | `apps/dwa/server/data/tracking-logs/grief-wave-log.json` | ⏳ | pending |
| 3302 | `apps/dwa/server/data/tracking-logs/gut-brain-tracker.json` | ⏳ | pending |
| 3303 | `apps/dwa/server/data/tracking-logs/lesson-map.json` | ⏳ | pending |
| 3304 | `apps/dwa/server/data/tracking-logs/mindful-eating-log.json` | ⏳ | pending |
| 3305 | `apps/dwa/server/data/tracking-logs/mood-stability-log.json` | ⏳ | pending |
| 3306 | `apps/dwa/server/data/tracking-logs/nutrient-supplement-log.json` | ⏳ | pending |
| 3307 | `apps/dwa/server/data/tracking-logs/ocd-cycle-log.json` | ⏳ | pending |
| 3308 | `apps/dwa/server/data/tracking-logs/panic-attack-log.json` | ⏳ | pending |
| 3309 | `apps/dwa/server/data/tracking-logs/perfectionism-pattern-log.json` | ⏳ | pending |
| 3310 | `apps/dwa/server/data/tracking-logs/self-criticism-log.json` | ⏳ | pending |
| 3311 | `apps/dwa/server/data/tracking-logs/sleep-diary.json` | ⏳ | pending |
| 3312 | `apps/dwa/server/data/tracking-logs/sleep-reflection-log.json` | ⏳ | pending |
| 3313 | `apps/dwa/server/data/tracking-logs/stress-trigger-log.json` | ⏳ | pending |
| 3314 | `apps/dwa/server/data/tracking-logs/window-of-tolerance-tracker.json` | ⏳ | pending |
| 3315 | `apps/dwa/services/distress-classifier/.dockerignore` | ✅ | slice 04 |
| 3316 | `apps/dwa/services/distress-classifier/Dockerfile` | 🔍 | slice 04 — B-049..B-058 |
| 3317 | `apps/dwa/services/distress-classifier/README.md` | ✅ | slice 04 |
| 3318 | `apps/dwa/services/distress-classifier/app.py` | ✅ | slice 04 |
| 3319 | `apps/dwa/services/distress-classifier/docker-compose-dokploy.yml` | 🔍 | slice 04 — B-049..B-058 |
| 3320 | `apps/dwa/services/distress-classifier/docker-compose.yml` | 🔍 | slice 04 — B-049..B-058 |
| 3321 | `apps/dwa/services/distress-classifier/evaluate.py` | ✅ | slice 04 |
| 3322 | `apps/dwa/services/distress-classifier/finetune.py` | ✅ | slice 04 |
| 3323 | `apps/dwa/services/distress-classifier/metrics.json` | ✅ | slice 04 |
| 3324 | `apps/dwa/services/distress-classifier/requirements.txt` | ✅ | slice 04 |
| 3325 | `apps/dwa/services/maia/.gitignore` | ✅ | slice 04 |
| 3326 | `apps/dwa/services/maia/DOKPLOY_DEPLOYMENT.md` | 🔍 | slice 04 — B-049..B-058 |
| 3327 | `apps/dwa/services/maia/Dockerfile` | ✅ | slice 04 |
| 3328 | `apps/dwa/services/maia/app.py` | ✅ | slice 04 |
| 3329 | `apps/dwa/services/maia/classifiers/__init__.py` | ✅ | slice 04 |
| 3330 | `apps/dwa/services/maia/classifiers/base.py` | ✅ | slice 04 |
| 3331 | `apps/dwa/services/maia/classifiers/content_atomization.py` | ✅ | slice 04 |
| 3332 | `apps/dwa/services/maia/classifiers/content_quality.py` | ✅ | slice 04 |
| 3333 | `apps/dwa/services/maia/classifiers/distress.py` | ✅ | slice 04 |
| 3334 | `apps/dwa/services/maia/classifiers/forum_topic.py` | ✅ | slice 04 |
| 3335 | `apps/dwa/services/maia/docker-compose-dokploy.yml` | 🔍 | slice 04 — B-049..B-058 |
| 3336 | `apps/dwa/services/maia/docker-compose.yml` | 🔍 | slice 04 — B-049..B-058 |
| 3337 | `apps/dwa/services/maia/evaluate.py` | ✅ | slice 04 |
| 3338 | `apps/dwa/services/maia/requirements.txt` | ✅ | slice 04 |
| 3339 | `apps/dwa/services/maia/training/__init__.py` | ✅ | slice 04 |
| 3340 | `apps/dwa/services/maia/training/base_trainer.py` | ✅ | slice 04 |
| 3341 | `apps/dwa/services/maia/training/datasets/__init__.py` | ✅ | slice 04 |
| 3342 | `apps/dwa/services/maia/training/generate_training_data.py` | ✅ | slice 04 |
| 3343 | `apps/dwa/services/maia/training/kaggle_train_all.py` | ✅ | slice 04 |
| 3344 | `apps/dwa/services/maia/training/train_content_atomization.py` | ✅ | slice 04 |
| 3345 | `apps/dwa/services/maia/training/train_content_quality.py` | ✅ | slice 04 |
| 3346 | `apps/dwa/services/maia/training/train_distress.py` | ✅ | slice 04 |
| 3347 | `apps/dwa/services/maia/training/train_forum_topic.py` | ✅ | slice 04 |
| 3348 | `apps/dwa/specs/academy.md` | ✅ | slice 03 |
| 3349 | `apps/dwa/specs/ai.md` | ✅ | slice 03 |
| 3350 | `apps/dwa/specs/auth.md` | 🔍 | slice 03 |
| 3351 | `apps/dwa/specs/forum.md` | ✅ | slice 03 |
| 3352 | `apps/dwa/specs/onboarding.md` | ✅ | slice 03 |
| 3353 | `apps/dwa/tsconfig.json` | ✅ | slice 04 |
| 3354 | `apps/dwa/types/ai.ts` | ✅ | slice 03 |
| 3355 | `apps/dwa/types/assessment.ts` | ✅ | slice 03 |
| 3356 | `apps/dwa/types/checklist.ts` | ✅ | slice 03 |
| 3357 | `apps/dwa/types/component-state.ts` | ✅ | slice 03 |
| 3358 | `apps/dwa/types/course.ts` | ✅ | slice 03 |
| 3359 | `apps/dwa/types/forum.ts` | ✅ | slice 03 |
| 3360 | `apps/dwa/types/index.ts` | ✅ | slice 03 |
| 3361 | `apps/dwa/types/profile.ts` | ✅ | slice 03 |
| 3362 | `apps/dwa/types/thought-record.ts` | ✅ | slice 03 |
| 3363 | `apps/dwa/types/tracking-log.ts` | ✅ | slice 03 |
| 3364 | `apps/dwa/types/user.ts` | ✅ | slice 03 |
| 3365 | `apps/dwa/types/wellness-profile.ts` | ✅ | slice 03 |
| 3366 | `apps/dwa/types/wellness-scores.ts` | ✅ | slice 03 |
| 3367 | `apps/dwa/update-e2e-imports.js` | ✅ | slice 04 |
| 3368 | `apps/dwa/update-e2e-tests.sh` | ✅ | slice 04 |
| 3369 | `apps/dwa/vitest-setup.ts` | ✅ | slice 04 |
| 3370 | `apps/dwa/vitest.config.ts` | ✅ | slice 04 |
| 3371 | `apps/dwa/websites/Digital Wellness Redesign - Perplexity.md` | ⏳ | pending |
| 3372 | `apps/dwa/websites/GTM OS Site/.htaccess` | ⏳ | pending |
| 3373 | `apps/dwa/websites/GTM OS Site/8-gtm-frameworks-compounding-growth-book.html` | ⏳ | pending |
| 3374 | `apps/dwa/websites/GTM OS Site/about.html` | ⏳ | pending |
| 3375 | `apps/dwa/websites/GTM OS Site/assets/audio/solo-growth-via-ai-and-retention.m4a` | ⏳ | pending |
| 3376 | `apps/dwa/websites/GTM OS Site/assets/fonts/inter-v12-latin-500.woff2` | ⏭️ | binary asset |
| 3377 | `apps/dwa/websites/GTM OS Site/assets/fonts/inter-v12-latin-600.woff2` | ⏭️ | binary asset |
| 3378 | `apps/dwa/websites/GTM OS Site/assets/fonts/inter-v12-latin-regular.woff2` | ⏭️ | binary asset |
| 3379 | `apps/dwa/websites/GTM OS Site/assets/fonts/poppins-v20-latin-500.woff2` | ⏭️ | binary asset |
| 3380 | `apps/dwa/websites/GTM OS Site/assets/fonts/poppins-v20-latin-600.woff2` | ⏭️ | binary asset |
| 3381 | `apps/dwa/websites/GTM OS Site/assets/fonts/poppins-v20-latin-regular.woff2` | ⏭️ | binary asset |
| 3382 | `apps/dwa/websites/GTM OS Site/assets/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK book cover.webp` | ⏭️ | binary asset |
| 3383 | `apps/dwa/websites/GTM OS Site/assets/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK.webp` | ⏭️ | binary asset |
| 3384 | `apps/dwa/websites/GTM OS Site/assets/images/THE SOLO FOUNDER'S AI DOMINANCE.jpg` | ⏭️ | binary asset |
| 3385 | `apps/dwa/websites/GTM OS Site/assets/images/THE SOLO FOUNDER'S AI REVOLUTION.jpg` | ⏭️ | binary asset |
| 3386 | `apps/dwa/websites/GTM OS Site/assets/images/The Solo Founder's Al Playbook.jpg` | ⏭️ | binary asset |
| 3387 | `apps/dwa/websites/GTM OS Site/assets/images/academy/caa-ai-help-sidebar.webp` | ⏭️ | binary asset |
| 3388 | `apps/dwa/websites/GTM OS Site/assets/images/academy/caa-lesson-page.webp` | ⏭️ | binary asset |
| 3389 | `apps/dwa/websites/GTM OS Site/assets/images/academy/caa-onboarding-results.jpg` | ⏭️ | binary asset |
| 3390 | `apps/dwa/websites/GTM OS Site/assets/images/academy/caa-roleplay-simulation-screen.webp` | ⏭️ | binary asset |
| 3391 | `apps/dwa/websites/GTM OS Site/assets/images/academy/caa-sales-simulation-customer-job-role-selector.webp` | ⏭️ | binary asset |
| 3392 | `apps/dwa/websites/GTM OS Site/assets/images/academy/caa-sales-simulation-framework-selector.webp` | ⏭️ | binary asset |
| 3393 | `apps/dwa/websites/GTM OS Site/assets/images/academy/caa-sales-simulation-industry-selector.webp` | ⏭️ | binary asset |
| 3394 | `apps/dwa/websites/GTM OS Site/assets/images/academy/caa-solo-advisor-ai-coach.webp` | ⏭️ | binary asset |
| 3395 | `apps/dwa/websites/GTM OS Site/assets/images/academy/caa-student-dashboard.webp` | ⏭️ | binary asset |
| 3396 | `apps/dwa/websites/GTM OS Site/assets/images/academy/lesson-quizes.webp` | ⏭️ | binary asset |
| 3397 | `apps/dwa/websites/GTM OS Site/assets/images/academy/mike-sullivan-author-creator-solo-founder.webp` | ⏭️ | binary asset |
| 3398 | `apps/dwa/websites/GTM OS Site/assets/images/academy/platform-analytics-intelligence.webp` | ⏭️ | binary asset |
| 3399 | `apps/dwa/websites/GTM OS Site/assets/images/ai-roleplay-sales-academy.webp` | ⏭️ | binary asset |
| 3400 | `apps/dwa/websites/GTM OS Site/assets/images/available_at_amazon_en_horizontal.png` | ⏭️ | binary asset |
| 3401 | `apps/dwa/websites/GTM OS Site/assets/images/available_at_amazon_en_horizontal.webp` | ⏭️ | binary asset |
| 3402 | `apps/dwa/websites/GTM OS Site/assets/images/customer-acquisition-playbook-cover.webp` | ⏭️ | binary asset |
| 3403 | `apps/dwa/websites/GTM OS Site/assets/images/icp-builder-mockup.png` | ⏭️ | binary asset |
| 3404 | `apps/dwa/websites/GTM OS Site/assets/images/integrated-intelligence.webp` | ⏭️ | binary asset |
| 3405 | `apps/dwa/websites/GTM OS Site/assets/images/mike-sullivan-author-creator.png` | ⏭️ | binary asset |
| 3406 | `apps/dwa/websites/GTM OS Site/assets/images/pipeline-state-machine-mockup.webp` | ⏭️ | binary asset |
| 3407 | `apps/dwa/websites/GTM OS Site/assets/images/solo-founders-customer-acquisition-paybook-cover-opt.webp` | ⏭️ | binary asset |
| 3408 | `apps/dwa/websites/GTM OS Site/assets/images/solo-founders-customer-acquisition-paybook-cover-website-opt.webp` | ⏭️ | binary asset |
| 3409 | `apps/dwa/websites/GTM OS Site/assets/images/solo-founders-customer-acquisition-paybook-cover-website.webp` | ⏭️ | binary asset |
| 3410 | `apps/dwa/websites/GTM OS Site/assets/images/soloframeHubLogo-opt.webp` | ⏭️ | binary asset |
| 3411 | `apps/dwa/websites/GTM OS Site/assets/images/soloframeHubLogo.png` | ⏭️ | binary asset |
| 3412 | `apps/dwa/websites/GTM OS Site/assets/images/soloframeHubLogo.webp` | ⏭️ | binary asset |
| 3413 | `apps/dwa/websites/GTM OS Site/assets/images/soloframehub-logo-sm.png` | ⏭️ | binary asset |
| 3414 | `apps/dwa/websites/GTM OS Site/assets/images/soloframehub-logo-sm.webp` | ⏭️ | binary asset |
| 3415 | `apps/dwa/websites/GTM OS Site/assets/images/soloframehub-logo-w-white.png` | ⏭️ | binary asset |
| 3416 | `apps/dwa/websites/GTM OS Site/assets/images/soloframehub-site-icon-opt.png` | ⏭️ | binary asset |
| 3417 | `apps/dwa/websites/GTM OS Site/assets/images/soloframehub-site-icon.png` | ⏭️ | binary asset |
| 3418 | `apps/dwa/websites/GTM OS Site/assets/images/soloframehublogo.jpg` | ⏭️ | binary asset |
| 3419 | `apps/dwa/websites/GTM OS Site/assets/images/traditional video lesson.jpg` | ⏭️ | binary asset |
| 3420 | `apps/dwa/websites/GTM OS Site/assets/images/traditional-lesson.png` | ⏭️ | binary asset |
| 3421 | `apps/dwa/websites/GTM OS Site/blog-accountability-pods.html` | ⏳ | pending |
| 3422 | `apps/dwa/websites/GTM OS Site/blog-ai-coaching-rag.html` | ⏳ | pending |
| 3423 | `apps/dwa/websites/GTM OS Site/blog-ai-coaching.html` | ⏳ | pending |
| 3424 | `apps/dwa/websites/GTM OS Site/blog-bootstrapped-sales-strategy.html` | ⏳ | pending |
| 3425 | `apps/dwa/websites/GTM OS Site/blog-byok-integrations.html` | ⏳ | pending |
| 3426 | `apps/dwa/websites/GTM OS Site/blog-certified-gtm.html` | ⏳ | pending |
| 3427 | `apps/dwa/websites/GTM OS Site/blog-cold-email-startups.html` | ⏳ | pending |
| 3428 | `apps/dwa/websites/GTM OS Site/blog-first-10-customers.html` | ⏳ | pending |
| 3429 | `apps/dwa/websites/GTM OS Site/blog-five-layers.html` | ⏳ | pending |
| 3430 | `apps/dwa/websites/GTM OS Site/blog-founder-customer-acquisition.html` | ⏳ | pending |
| 3431 | `apps/dwa/websites/GTM OS Site/blog-gtm-strategy.html` | ⏳ | pending |
| 3432 | `apps/dwa/websites/GTM OS Site/blog-icp-template-startups.html` | ⏳ | pending |
| 3433 | `apps/dwa/websites/GTM OS Site/blog-linkedin-outreach-founders.html` | ⏳ | pending |
| 3434 | `apps/dwa/websites/GTM OS Site/blog-quick-win-path.html` | ⏳ | pending |
| 3435 | `apps/dwa/websites/GTM OS Site/blog-sales-pipeline-founders.html` | ⏳ | pending |
| 3436 | `apps/dwa/websites/GTM OS Site/blog/ai-tools-b2b-customer-acquisition.html` | ⏳ | pending |
| 3437 | `apps/dwa/websites/GTM OS Site/blog/automate-customer-acquisition-solo-founder.html` | ⏳ | pending |
| 3438 | `apps/dwa/websites/GTM OS Site/blog/b2b-saas-metrics-solo-founders.html` | ⏳ | pending |
| 3439 | `apps/dwa/websites/GTM OS Site/blog/build-ideal-customer-profile-30-minutes.html` | ⏳ | pending |
| 3440 | `apps/dwa/websites/GTM OS Site/blog/cold-email-system-for-technical-founders.html` | ⏳ | pending |
| 3441 | `apps/dwa/websites/GTM OS Site/blog/disc-framework-sell-to-any-buyer-personality.html` | ⏳ | pending |
| 3442 | `apps/dwa/websites/GTM OS Site/blog/first-discovery-call-framework-for-founders.html` | ⏳ | pending |
| 3443 | `apps/dwa/websites/GTM OS Site/blog/from-code-to-customers-engineers-sales-playbook.html` | ⏳ | pending |
| 3444 | `apps/dwa/websites/GTM OS Site/blog/handling-sales-objections-without-being-sleazy.html` | ⏳ | pending |
| 3445 | `apps/dwa/websites/GTM OS Site/blog/index.html` | ⏳ | pending |
| 3446 | `apps/dwa/websites/GTM OS Site/blog/why-engineers-make-better-salespeople.html` | ⏳ | pending |
| 3447 | `apps/dwa/websites/GTM OS Site/es/.htaccess` | ⏳ | pending |
| 3448 | `apps/dwa/websites/GTM OS Site/es/8-gtm-frameworks-compounding-growth-book.html` | ⏳ | pending |
| 3449 | `apps/dwa/websites/GTM OS Site/es/about.html` | ⏳ | pending |
| 3450 | `apps/dwa/websites/GTM OS Site/es/blog-adquisicion-clientes-fundador.html` | ⏳ | pending |
| 3451 | `apps/dwa/websites/GTM OS Site/es/blog-estrategia-gtm-fundador.html` | ⏳ | pending |
| 3452 | `apps/dwa/websites/GTM OS Site/es/blog-integraciones-byok.html` | ⏳ | pending |
| 3453 | `apps/dwa/websites/GTM OS Site/es/blog-plantilla-icp-startups.html` | ⏳ | pending |
| 3454 | `apps/dwa/websites/GTM OS Site/es/blog-primeros-10-clientes.html` | ⏳ | pending |
| 3455 | `apps/dwa/websites/GTM OS Site/es/blog-ruta-victoria-rapida.html` | ⏳ | pending |
| 3456 | `apps/dwa/websites/GTM OS Site/es/for-founders.html` | ⏳ | pending |
| 3457 | `apps/dwa/websites/GTM OS Site/es/founder-apps.html` | ⏳ | pending |
| 3458 | `apps/dwa/websites/GTM OS Site/es/founders-ai-60-day-roadmap-book.html` | ⏳ | pending |
| 3459 | `apps/dwa/websites/GTM OS Site/es/founders-ai-customer-acquisition-playbook.html` | ⏳ | pending |
| 3460 | `apps/dwa/websites/GTM OS Site/es/founders-ai-gtm-academy.html` | ⏳ | pending |
| 3461 | `apps/dwa/websites/GTM OS Site/es/founders-ai-startup-academy.html` | ⏳ | pending |
| 3462 | `apps/dwa/websites/GTM OS Site/es/gtm-os.html` | ⏳ | pending |
| 3463 | `apps/dwa/websites/GTM OS Site/es/index-dark-backup.html` | ⏳ | pending |
| 3464 | `apps/dwa/websites/GTM OS Site/es/index.html` | ⏳ | pending |
| 3465 | `apps/dwa/websites/GTM OS Site/es/legal/acceptable-use-policy.html` | ⏳ | pending |
| 3466 | `apps/dwa/websites/GTM OS Site/es/legal/ai-disclaimer.html` | ⏳ | pending |
| 3467 | `apps/dwa/websites/GTM OS Site/es/legal/community-guidelines.html` | ⏳ | pending |
| 3468 | `apps/dwa/websites/GTM OS Site/es/legal/cookie-policy.html` | ⏳ | pending |
| 3469 | `apps/dwa/websites/GTM OS Site/es/legal/earnings-disclaimer.html` | ⏳ | pending |
| 3470 | `apps/dwa/websites/GTM OS Site/es/legal/privacy-policy.html` | ⏳ | pending |
| 3471 | `apps/dwa/websites/GTM OS Site/es/legal/refund-policy.html` | ⏳ | pending |
| 3472 | `apps/dwa/websites/GTM OS Site/es/legal/terms-of-service.html` | ⏳ | pending |
| 3473 | `apps/dwa/websites/GTM OS Site/es/methodology.html` | ⏳ | pending |
| 3474 | `apps/dwa/websites/GTM OS Site/es/platform-architecture.html` | ⏳ | pending |
| 3475 | `apps/dwa/websites/GTM OS Site/es/pricing.html` | ⏳ | pending |
| 3476 | `apps/dwa/websites/GTM OS Site/favicon.ico` | ⏭️ | binary asset |
| 3477 | `apps/dwa/websites/GTM OS Site/fonts/woff2/fonts.css` | ⏳ | pending |
| 3478 | `apps/dwa/websites/GTM OS Site/fonts/woff2/inter-v20-latin-500.woff2` | ⏭️ | binary asset |
| 3479 | `apps/dwa/websites/GTM OS Site/fonts/woff2/inter-v20-latin-500italic.woff2` | ⏭️ | binary asset |
| 3480 | `apps/dwa/websites/GTM OS Site/fonts/woff2/inter-v20-latin-600.woff2` | ⏭️ | binary asset |
| 3481 | `apps/dwa/websites/GTM OS Site/fonts/woff2/inter-v20-latin-italic.woff2` | ⏭️ | binary asset |
| 3482 | `apps/dwa/websites/GTM OS Site/fonts/woff2/inter-v20-latin-regular.woff2` | ⏭️ | binary asset |
| 3483 | `apps/dwa/websites/GTM OS Site/fonts/woff2/poppins-v24-latin-500.woff2` | ⏭️ | binary asset |
| 3484 | `apps/dwa/websites/GTM OS Site/fonts/woff2/poppins-v24-latin-500italic.woff2` | ⏭️ | binary asset |
| 3485 | `apps/dwa/websites/GTM OS Site/fonts/woff2/poppins-v24-latin-600.woff2` | ⏭️ | binary asset |
| 3486 | `apps/dwa/websites/GTM OS Site/fonts/woff2/poppins-v24-latin-600italic.woff2` | ⏭️ | binary asset |
| 3487 | `apps/dwa/websites/GTM OS Site/fonts/woff2/poppins-v24-latin-italic.woff2` | ⏭️ | binary asset |
| 3488 | `apps/dwa/websites/GTM OS Site/fonts/woff2/poppins-v24-latin-regular.woff2` | ⏭️ | binary asset |
| 3489 | `apps/dwa/websites/GTM OS Site/for-founders.html` | ⏳ | pending |
| 3490 | `apps/dwa/websites/GTM OS Site/founder-apps.html` | ⏳ | pending |
| 3491 | `apps/dwa/websites/GTM OS Site/founders-ai-60-day-roadmap-book.html` | ⏳ | pending |
| 3492 | `apps/dwa/websites/GTM OS Site/founders-ai-customer-acquisition-playbook.html` | ⏳ | pending |
| 3493 | `apps/dwa/websites/GTM OS Site/founders-ai-gtm-academy.html` | ⏳ | pending |
| 3494 | `apps/dwa/websites/GTM OS Site/founders-ai-startup-academy.html` | ⏳ | pending |
| 3495 | `apps/dwa/websites/GTM OS Site/gtm-os-dark-backup.html` | ⏳ | pending |
| 3496 | `apps/dwa/websites/GTM OS Site/gtm-os.html` | ⏳ | pending |
| 3497 | `apps/dwa/websites/GTM OS Site/home.html` | ⏳ | pending |
| 3498 | `apps/dwa/websites/GTM OS Site/images/404-illustration-dark.svg` | ⏭️ | binary asset |
| 3499 | `apps/dwa/websites/GTM OS Site/images/404-illustration.svg` | ⏭️ | binary asset |
| 3500 | `apps/dwa/websites/GTM OS Site/images/announcement-icon.svg` | ⏭️ | binary asset |
| 3501 | `apps/dwa/websites/GTM OS Site/images/applications-image-01.jpg` | ⏭️ | binary asset |
| 3502 | `apps/dwa/websites/GTM OS Site/images/applications-image-02.jpg` | ⏭️ | binary asset |
| 3503 | `apps/dwa/websites/GTM OS Site/images/applications-image-03.jpg` | ⏭️ | binary asset |
| 3504 | `apps/dwa/websites/GTM OS Site/images/applications-image-04.jpg` | ⏭️ | binary asset |
| 3505 | `apps/dwa/websites/GTM OS Site/images/applications-image-05.jpg` | ⏭️ | binary asset |
| 3506 | `apps/dwa/websites/GTM OS Site/images/applications-image-06.jpg` | ⏭️ | binary asset |
| 3507 | `apps/dwa/websites/GTM OS Site/images/applications-image-07.jpg` | ⏭️ | binary asset |
| 3508 | `apps/dwa/websites/GTM OS Site/images/applications-image-08.jpg` | ⏭️ | binary asset |
| 3509 | `apps/dwa/websites/GTM OS Site/images/applications-image-09.jpg` | ⏭️ | binary asset |
| 3510 | `apps/dwa/websites/GTM OS Site/images/applications-image-10.jpg` | ⏭️ | binary asset |
| 3511 | `apps/dwa/websites/GTM OS Site/images/applications-image-11.jpg` | ⏭️ | binary asset |
| 3512 | `apps/dwa/websites/GTM OS Site/images/applications-image-12.jpg` | ⏭️ | binary asset |
| 3513 | `apps/dwa/websites/GTM OS Site/images/applications-image-13.jpg` | ⏭️ | binary asset |
| 3514 | `apps/dwa/websites/GTM OS Site/images/applications-image-14.jpg` | ⏭️ | binary asset |
| 3515 | `apps/dwa/websites/GTM OS Site/images/applications-image-15.jpg` | ⏭️ | binary asset |
| 3516 | `apps/dwa/websites/GTM OS Site/images/applications-image-16.jpg` | ⏭️ | binary asset |
| 3517 | `apps/dwa/websites/GTM OS Site/images/applications-image-17.jpg` | ⏭️ | binary asset |
| 3518 | `apps/dwa/websites/GTM OS Site/images/applications-image-18.jpg` | ⏭️ | binary asset |
| 3519 | `apps/dwa/websites/GTM OS Site/images/applications-image-19.jpg` | ⏭️ | binary asset |
| 3520 | `apps/dwa/websites/GTM OS Site/images/applications-image-20.jpg` | ⏭️ | binary asset |
| 3521 | `apps/dwa/websites/GTM OS Site/images/applications-image-21.jpg` | ⏭️ | binary asset |
| 3522 | `apps/dwa/websites/GTM OS Site/images/applications-image-22.jpg` | ⏭️ | binary asset |
| 3523 | `apps/dwa/websites/GTM OS Site/images/applications-image-23.jpg` | ⏭️ | binary asset |
| 3524 | `apps/dwa/websites/GTM OS Site/images/applications-image-24.jpg` | ⏭️ | binary asset |
| 3525 | `apps/dwa/websites/GTM OS Site/images/applications-image-25.jpg` | ⏭️ | binary asset |
| 3526 | `apps/dwa/websites/GTM OS Site/images/applications-image-26.jpg` | ⏭️ | binary asset |
| 3527 | `apps/dwa/websites/GTM OS Site/images/applications-image-27.jpg` | ⏭️ | binary asset |
| 3528 | `apps/dwa/websites/GTM OS Site/images/applications-image-28.jpg` | ⏭️ | binary asset |
| 3529 | `apps/dwa/websites/GTM OS Site/images/applications-image-29.jpg` | ⏭️ | binary asset |
| 3530 | `apps/dwa/websites/GTM OS Site/images/applications-image-30.jpg` | ⏭️ | binary asset |
| 3531 | `apps/dwa/websites/GTM OS Site/images/applications-image-31.jpg` | ⏭️ | binary asset |
| 3532 | `apps/dwa/websites/GTM OS Site/images/applications-image-32.jpg` | ⏭️ | binary asset |
| 3533 | `apps/dwa/websites/GTM OS Site/images/auth-image.jpg` | ⏭️ | binary asset |
| 3534 | `apps/dwa/websites/GTM OS Site/images/avatar-01.jpg` | ⏭️ | binary asset |
| 3535 | `apps/dwa/websites/GTM OS Site/images/avatar-02.jpg` | ⏭️ | binary asset |
| 3536 | `apps/dwa/websites/GTM OS Site/images/avatar-03.jpg` | ⏭️ | binary asset |
| 3537 | `apps/dwa/websites/GTM OS Site/images/avatar-04.jpg` | ⏭️ | binary asset |
| 3538 | `apps/dwa/websites/GTM OS Site/images/avatar-05.jpg` | ⏭️ | binary asset |
| 3539 | `apps/dwa/websites/GTM OS Site/images/avatar-06.jpg` | ⏭️ | binary asset |
| 3540 | `apps/dwa/websites/GTM OS Site/images/book/Figure 10.3- The Multi-Touch Newsletter Journey.jpg` | ⏭️ | binary asset |
| 3541 | `apps/dwa/websites/GTM OS Site/images/book/Figure 10.3-The Multi-Touch-Newsletter-Journey.jpg` | ⏭️ | binary asset |
| 3542 | `apps/dwa/websites/GTM OS Site/images/book/Figure-1.1-Identity-Threat-Framework.jpg` | ⏭️ | binary asset |
| 3543 | `apps/dwa/websites/GTM OS Site/images/book/Figure-10.1-Playbook-Selection.jpg` | ⏭️ | binary asset |
| 3544 | `apps/dwa/websites/GTM OS Site/images/book/Figure-10.2-Playbook-Progression.jpg` | ⏭️ | binary asset |
| 3545 | `apps/dwa/websites/GTM OS Site/images/book/Figure-10.3-The Multi-Touch-Newsletter-Journey.jpg` | ⏭️ | binary asset |
| 3546 | `apps/dwa/websites/GTM OS Site/images/book/Figure-12.1-Weekly-Rhythm.jpg` | ⏭️ | binary asset |
| 3547 | `apps/dwa/websites/GTM OS Site/images/book/Figure-12.2-Neuroscience-Momentum.jpg` | ⏭️ | binary asset |
| 3548 | `apps/dwa/websites/GTM OS Site/images/book/Figure-12.3-Compound-Effect.jpg` | ⏭️ | binary asset |
| 3549 | `apps/dwa/websites/GTM OS Site/images/book/Figure-14.1-AEO-Implementation-Plan.jpg` | ⏭️ | binary asset |
| 3550 | `apps/dwa/websites/GTM OS Site/images/book/Figure-14.2-PageSpeed-Optimization.png` | ⏭️ | binary asset |
| 3551 | `apps/dwa/websites/GTM OS Site/images/book/Figure-15.1-Proof-Ladder.jpg` | ⏭️ | binary asset |
| 3552 | `apps/dwa/websites/GTM OS Site/images/book/Figure-2.1-ICP-framework.jpg` | ⏭️ | binary asset |
| 3553 | `apps/dwa/websites/GTM OS Site/images/book/Figure-3.1-5-Domain-Infrastructure.jpg` | ⏭️ | binary asset |
| 3554 | `apps/dwa/websites/GTM OS Site/images/book/Figure-3.2-Why-Warmup-Works.jpg` | ⏭️ | binary asset |
| 3555 | `apps/dwa/websites/GTM OS Site/images/book/Figure-3.3-Domain-Warmup.jpg` | ⏭️ | binary asset |
| 3556 | `apps/dwa/websites/GTM OS Site/images/book/Figure-4.1-MVQ-Discovery-Framework.jpg` | ⏭️ | binary asset |
| 3557 | `apps/dwa/websites/GTM OS Site/images/book/Figure-5.1-Value-Anchoring.jpg` | ⏭️ | binary asset |
| 3558 | `apps/dwa/websites/GTM OS Site/images/book/Figure-5.2-Pricing-Tier-Framework.jpg` | ⏭️ | binary asset |
| 3559 | `apps/dwa/websites/GTM OS Site/images/book/Figure-6.1-Retention-Flywheel.jpg` | ⏭️ | binary asset |
| 3560 | `apps/dwa/websites/GTM OS Site/images/book/Figure-6.2-Customer-Health-Score.jpg` | ⏭️ | binary asset |
| 3561 | `apps/dwa/websites/GTM OS Site/images/book/Figure-7.1-Automation-Failure-Matrix.jpg` | ⏭️ | binary asset |
| 3562 | `apps/dwa/websites/GTM OS Site/images/book/Figure-7.2-Automation-Stack.jpg` | ⏭️ | binary asset |
| 3563 | `apps/dwa/websites/GTM OS Site/images/book/Figure-7.2-Kanbox-Results.jpg` | ⏭️ | binary asset |
| 3564 | `apps/dwa/websites/GTM OS Site/images/book/Figure-7.3-email-list-results.jpg` | ⏭️ | binary asset |
| 3565 | `apps/dwa/websites/GTM OS Site/images/book/Figure-7.4-Coolify-1-click-deployment.jpg` | ⏭️ | binary asset |
| 3566 | `apps/dwa/websites/GTM OS Site/images/book/Figure-7.5-n8n-Workflow.jpg` | ⏭️ | binary asset |
| 3567 | `apps/dwa/websites/GTM OS Site/images/book/Figure-8.1-LTV-CAC-Benchmarks.jpg` | ⏭️ | binary asset |
| 3568 | `apps/dwa/websites/GTM OS Site/images/book/Figure-8.2-Essential-Dashboard.jpg` | ⏭️ | binary asset |
| 3569 | `apps/dwa/websites/GTM OS Site/images/book/Figure-9.1-Emotional-Logical-Split.jpg` | ⏭️ | binary asset |
| 3570 | `apps/dwa/websites/GTM OS Site/images/book/Figure-I.1-Solo-Founder-Constraint-Triangle.jpg` | ⏭️ | binary asset |
| 3571 | `apps/dwa/websites/GTM OS Site/images/book/Figure-P.1-Book-Journey-Map.jpg` | ⏭️ | binary asset |
| 3572 | `apps/dwa/websites/GTM OS Site/images/book/coolify-dashboard.jpg` | ⏭️ | binary asset |
| 3573 | `apps/dwa/websites/GTM OS Site/images/book/cover-solo-founders-customer-acquisition-paybook-cover.jpg` | ⏭️ | binary asset |
| 3574 | `apps/dwa/websites/GTM OS Site/images/book/customer-acquisition-cover-ebook-final.jpg` | ⏭️ | binary asset |
| 3575 | `apps/dwa/websites/GTM OS Site/images/book/instantly-domain-wormup.jpg` | ⏭️ | binary asset |
| 3576 | `apps/dwa/websites/GTM OS Site/images/book/kanbox-enriched-emails.jpg` | ⏭️ | binary asset |
| 3577 | `apps/dwa/websites/GTM OS Site/images/book/mike-sullivan-author-creator-solo-founder.jpg` | ⏭️ | binary asset |
| 3578 | `apps/dwa/websites/GTM OS Site/images/book/page-speed-insights-desktop-after.png` | ⏭️ | binary asset |
| 3579 | `apps/dwa/websites/GTM OS Site/images/book/page-speed-insights-mobile-after.png` | ⏭️ | binary asset |
| 3580 | `apps/dwa/websites/GTM OS Site/images/book/visual-asset-prompts.md` | ⏳ | pending |
| 3581 | `apps/dwa/websites/GTM OS Site/images/channel-01.png` | ⏭️ | binary asset |
| 3582 | `apps/dwa/websites/GTM OS Site/images/channel-02.png` | ⏭️ | binary asset |
| 3583 | `apps/dwa/websites/GTM OS Site/images/channel-03.png` | ⏭️ | binary asset |
| 3584 | `apps/dwa/websites/GTM OS Site/images/chat-image.jpg` | ⏭️ | binary asset |
| 3585 | `apps/dwa/websites/GTM OS Site/images/company-bg.jpg` | ⏭️ | binary asset |
| 3586 | `apps/dwa/websites/GTM OS Site/images/company-icon-01.svg` | ⏭️ | binary asset |
| 3587 | `apps/dwa/websites/GTM OS Site/images/company-icon-02.svg` | ⏭️ | binary asset |
| 3588 | `apps/dwa/websites/GTM OS Site/images/company-icon-03.svg` | ⏭️ | binary asset |
| 3589 | `apps/dwa/websites/GTM OS Site/images/company-icon-04.svg` | ⏭️ | binary asset |
| 3590 | `apps/dwa/websites/GTM OS Site/images/company-icon-05.svg` | ⏭️ | binary asset |
| 3591 | `apps/dwa/websites/GTM OS Site/images/company-icon-06.svg` | ⏭️ | binary asset |
| 3592 | `apps/dwa/websites/GTM OS Site/images/company-icon-07.svg` | ⏭️ | binary asset |
| 3593 | `apps/dwa/websites/GTM OS Site/images/company-icon-08.svg` | ⏭️ | binary asset |
| 3594 | `apps/dwa/websites/GTM OS Site/images/favicon.png` | ⏭️ | binary asset |
| 3595 | `apps/dwa/websites/GTM OS Site/images/feed-image-01.jpg` | ⏭️ | binary asset |
| 3596 | `apps/dwa/websites/GTM OS Site/images/feed-image-02.jpg` | ⏭️ | binary asset |
| 3597 | `apps/dwa/websites/GTM OS Site/images/group-avatar-01.png` | ⏭️ | binary asset |
| 3598 | `apps/dwa/websites/GTM OS Site/images/group-avatar-02.png` | ⏭️ | binary asset |
| 3599 | `apps/dwa/websites/GTM OS Site/images/group-avatar-03.png` | ⏭️ | binary asset |
| 3600 | `apps/dwa/websites/GTM OS Site/images/group-avatar-04.png` | ⏭️ | binary asset |
| 3601 | `apps/dwa/websites/GTM OS Site/images/home/avatar-01.jpg` | ⏭️ | binary asset |
| 3602 | `apps/dwa/websites/GTM OS Site/images/home/avatar-02.jpg` | ⏭️ | binary asset |
| 3603 | `apps/dwa/websites/GTM OS Site/images/home/avatar-03.jpg` | ⏭️ | binary asset |
| 3604 | `apps/dwa/websites/GTM OS Site/images/home/avatar-04.jpg` | ⏭️ | binary asset |
| 3605 | `apps/dwa/websites/GTM OS Site/images/home/avatar-05.jpg` | ⏭️ | binary asset |
| 3606 | `apps/dwa/websites/GTM OS Site/images/home/avatar-06.jpg` | ⏭️ | binary asset |
| 3607 | `apps/dwa/websites/GTM OS Site/images/home/large-testimonial.jpg` | ⏭️ | binary asset |
| 3608 | `apps/dwa/websites/GTM OS Site/images/home/logo-01.svg` | ⏭️ | binary asset |
| 3609 | `apps/dwa/websites/GTM OS Site/images/home/logo-02.svg` | ⏭️ | binary asset |
| 3610 | `apps/dwa/websites/GTM OS Site/images/home/logo-03.svg` | ⏭️ | binary asset |
| 3611 | `apps/dwa/websites/GTM OS Site/images/home/logo-04.svg` | ⏭️ | binary asset |
| 3612 | `apps/dwa/websites/GTM OS Site/images/home/logo-05.svg` | ⏭️ | binary asset |
| 3613 | `apps/dwa/websites/GTM OS Site/images/home/planet-overlay.svg` | ⏭️ | binary asset |
| 3614 | `apps/dwa/websites/GTM OS Site/images/home/planet-tag-01.png` | ⏭️ | binary asset |
| 3615 | `apps/dwa/websites/GTM OS Site/images/home/planet-tag-02.png` | ⏭️ | binary asset |
| 3616 | `apps/dwa/websites/GTM OS Site/images/home/planet-tag-03.png` | ⏭️ | binary asset |
| 3617 | `apps/dwa/websites/GTM OS Site/images/home/planet-tag-04.png` | ⏭️ | binary asset |
| 3618 | `apps/dwa/websites/GTM OS Site/images/home/planet.png` | ⏭️ | binary asset |
| 3619 | `apps/dwa/websites/GTM OS Site/images/home/stripes-dark.svg` | ⏭️ | binary asset |
| 3620 | `apps/dwa/websites/GTM OS Site/images/icon-01.svg` | ⏭️ | binary asset |
| 3621 | `apps/dwa/websites/GTM OS Site/images/icon-02.svg` | ⏭️ | binary asset |
| 3622 | `apps/dwa/websites/GTM OS Site/images/icon-03.svg` | ⏭️ | binary asset |
| 3623 | `apps/dwa/websites/GTM OS Site/images/inbox-image.jpg` | ⏭️ | binary asset |
| 3624 | `apps/dwa/websites/GTM OS Site/images/landing/fonts/inter-v12-latin-500.woff2` | ⏭️ | binary asset |
| 3625 | `apps/dwa/websites/GTM OS Site/images/landing/fonts/inter-v12-latin-600.woff2` | ⏭️ | binary asset |
| 3626 | `apps/dwa/websites/GTM OS Site/images/landing/fonts/inter-v12-latin-regular.woff2` | ⏭️ | binary asset |
| 3627 | `apps/dwa/websites/GTM OS Site/images/landing/fonts/poppins-v20-latin-500.woff2` | ⏭️ | binary asset |
| 3628 | `apps/dwa/websites/GTM OS Site/images/landing/fonts/poppins-v20-latin-600.woff2` | ⏭️ | binary asset |
| 3629 | `apps/dwa/websites/GTM OS Site/images/landing/fonts/poppins-v20-latin-regular.woff2` | ⏭️ | binary asset |
| 3630 | `apps/dwa/websites/GTM OS Site/images/landing/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK book cover.webp` | ⏭️ | binary asset |
| 3631 | `apps/dwa/websites/GTM OS Site/images/landing/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK.webp` | ⏭️ | binary asset |
| 3632 | `apps/dwa/websites/GTM OS Site/images/landing/images/THE SOLO FOUNDER'S AI DOMINANCE.jpg` | ⏭️ | binary asset |
| 3633 | `apps/dwa/websites/GTM OS Site/images/landing/images/THE SOLO FOUNDER'S AI REVOLUTION.jpg` | ⏭️ | binary asset |
| 3634 | `apps/dwa/websites/GTM OS Site/images/landing/images/The Solo Founder's Al Playbook.jpg` | ⏭️ | binary asset |
| 3635 | `apps/dwa/websites/GTM OS Site/images/landing/images/ai-roleplay-sales-academy.webp` | ⏭️ | binary asset |
| 3636 | `apps/dwa/websites/GTM OS Site/images/landing/images/icp-builder-mockup.png` | ⏭️ | binary asset |
| 3637 | `apps/dwa/websites/GTM OS Site/images/landing/images/integrated-intelligence.webp` | ⏭️ | binary asset |
| 3638 | `apps/dwa/websites/GTM OS Site/images/landing/images/logo-transparent.png` | ⏭️ | binary asset |
| 3639 | `apps/dwa/websites/GTM OS Site/images/landing/images/mike-sullivan-author-creator.png` | ⏭️ | binary asset |
| 3640 | `apps/dwa/websites/GTM OS Site/images/landing/images/pipeline-state-machine-mockup.webp` | ⏭️ | binary asset |
| 3641 | `apps/dwa/websites/GTM OS Site/images/landing/images/soloframeHubLogo.png` | ⏭️ | binary asset |
| 3642 | `apps/dwa/websites/GTM OS Site/images/landing/images/soloframehub-logo-sm.png` | ⏭️ | binary asset |
| 3643 | `apps/dwa/websites/GTM OS Site/images/landing/images/soloframehub-logo-w-white.png` | ⏭️ | binary asset |
| 3644 | `apps/dwa/websites/GTM OS Site/images/landing/images/soloframehub-site-icon.png` | ⏭️ | binary asset |
| 3645 | `apps/dwa/websites/GTM OS Site/images/landing/images/soloframehublogo.jpg` | ⏭️ | binary asset |
| 3646 | `apps/dwa/websites/GTM OS Site/images/landing/images/traditional video lesson.jpg` | ⏭️ | binary asset |
| 3647 | `apps/dwa/websites/GTM OS Site/images/landing/images/traditional-lesson.png` | ⏭️ | binary asset |
| 3648 | `apps/dwa/websites/GTM OS Site/images/meetup-image.jpg` | ⏭️ | binary asset |
| 3649 | `apps/dwa/websites/GTM OS Site/images/meetup-photo-01.jpg` | ⏭️ | binary asset |
| 3650 | `apps/dwa/websites/GTM OS Site/images/meetup-photo-02.jpg` | ⏭️ | binary asset |
| 3651 | `apps/dwa/websites/GTM OS Site/images/meetup-photo-03.jpg` | ⏭️ | binary asset |
| 3652 | `apps/dwa/websites/GTM OS Site/images/meetups-thumb-01.jpg` | ⏭️ | binary asset |
| 3653 | `apps/dwa/websites/GTM OS Site/images/meetups-thumb-02.jpg` | ⏭️ | binary asset |
| 3654 | `apps/dwa/websites/GTM OS Site/images/meetups-thumb-03.jpg` | ⏭️ | binary asset |
| 3655 | `apps/dwa/websites/GTM OS Site/images/meetups-thumb-04.jpg` | ⏭️ | binary asset |
| 3656 | `apps/dwa/websites/GTM OS Site/images/meetups-thumb-05.jpg` | ⏭️ | binary asset |
| 3657 | `apps/dwa/websites/GTM OS Site/images/meetups-thumb-06.jpg` | ⏭️ | binary asset |
| 3658 | `apps/dwa/websites/GTM OS Site/images/meetups-thumb-07.jpg` | ⏭️ | binary asset |
| 3659 | `apps/dwa/websites/GTM OS Site/images/meetups-thumb-08.jpg` | ⏭️ | binary asset |
| 3660 | `apps/dwa/websites/GTM OS Site/images/modal-image.jpg` | ⏭️ | binary asset |
| 3661 | `apps/dwa/websites/GTM OS Site/images/onboarding-image.jpg` | ⏭️ | binary asset |
| 3662 | `apps/dwa/websites/GTM OS Site/images/pay-bg.jpg` | ⏭️ | binary asset |
| 3663 | `apps/dwa/websites/GTM OS Site/images/product-image.jpg` | ⏭️ | binary asset |
| 3664 | `apps/dwa/websites/GTM OS Site/images/profile-bg.jpg` | ⏭️ | binary asset |
| 3665 | `apps/dwa/websites/GTM OS Site/images/related-product-01.jpg` | ⏭️ | binary asset |
| 3666 | `apps/dwa/websites/GTM OS Site/images/related-product-02.jpg` | ⏭️ | binary asset |
| 3667 | `apps/dwa/websites/GTM OS Site/images/related-product-03.jpg` | ⏭️ | binary asset |
| 3668 | `apps/dwa/websites/GTM OS Site/images/shop-category-01.png` | ⏭️ | binary asset |
| 3669 | `apps/dwa/websites/GTM OS Site/images/shop-category-02.png` | ⏭️ | binary asset |
| 3670 | `apps/dwa/websites/GTM OS Site/images/shop-category-03.png` | ⏭️ | binary asset |
| 3671 | `apps/dwa/websites/GTM OS Site/images/shop-category-04.png` | ⏭️ | binary asset |
| 3672 | `apps/dwa/websites/GTM OS Site/images/soloframehub-logo-main.png` | ⏭️ | binary asset |
| 3673 | `apps/dwa/websites/GTM OS Site/images/task-image-01.jpg` | ⏭️ | binary asset |
| 3674 | `apps/dwa/websites/GTM OS Site/images/task-image-02.jpg` | ⏭️ | binary asset |
| 3675 | `apps/dwa/websites/GTM OS Site/images/transactions-image-01.svg` | ⏭️ | binary asset |
| 3676 | `apps/dwa/websites/GTM OS Site/images/transactions-image-02.svg` | ⏭️ | binary asset |
| 3677 | `apps/dwa/websites/GTM OS Site/images/transactions-image-03.svg` | ⏭️ | binary asset |
| 3678 | `apps/dwa/websites/GTM OS Site/images/transactions-image-04.svg` | ⏭️ | binary asset |
| 3679 | `apps/dwa/websites/GTM OS Site/images/transactions-image-05.svg` | ⏭️ | binary asset |
| 3680 | `apps/dwa/websites/GTM OS Site/images/transactions-image-06.svg` | ⏭️ | binary asset |
| 3681 | `apps/dwa/websites/GTM OS Site/images/transactions-image-07.svg` | ⏭️ | binary asset |
| 3682 | `apps/dwa/websites/GTM OS Site/images/transactions-image-08.svg` | ⏭️ | binary asset |
| 3683 | `apps/dwa/websites/GTM OS Site/images/user-128-01.jpg` | ⏭️ | binary asset |
| 3684 | `apps/dwa/websites/GTM OS Site/images/user-28-01.jpg` | ⏭️ | binary asset |
| 3685 | `apps/dwa/websites/GTM OS Site/images/user-28-02.jpg` | ⏭️ | binary asset |
| 3686 | `apps/dwa/websites/GTM OS Site/images/user-28-03.jpg` | ⏭️ | binary asset |
| 3687 | `apps/dwa/websites/GTM OS Site/images/user-28-04.jpg` | ⏭️ | binary asset |
| 3688 | `apps/dwa/websites/GTM OS Site/images/user-28-05.jpg` | ⏭️ | binary asset |
| 3689 | `apps/dwa/websites/GTM OS Site/images/user-28-06.jpg` | ⏭️ | binary asset |
| 3690 | `apps/dwa/websites/GTM OS Site/images/user-28-07.jpg` | ⏭️ | binary asset |
| 3691 | `apps/dwa/websites/GTM OS Site/images/user-28-08.jpg` | ⏭️ | binary asset |
| 3692 | `apps/dwa/websites/GTM OS Site/images/user-28-09.jpg` | ⏭️ | binary asset |
| 3693 | `apps/dwa/websites/GTM OS Site/images/user-28-10.jpg` | ⏭️ | binary asset |
| 3694 | `apps/dwa/websites/GTM OS Site/images/user-28-11.jpg` | ⏭️ | binary asset |
| 3695 | `apps/dwa/websites/GTM OS Site/images/user-28-12.jpg` | ⏭️ | binary asset |
| 3696 | `apps/dwa/websites/GTM OS Site/images/user-32-01.jpg` | ⏭️ | binary asset |
| 3697 | `apps/dwa/websites/GTM OS Site/images/user-32-02.jpg` | ⏭️ | binary asset |
| 3698 | `apps/dwa/websites/GTM OS Site/images/user-32-03.jpg` | ⏭️ | binary asset |
| 3699 | `apps/dwa/websites/GTM OS Site/images/user-32-04.jpg` | ⏭️ | binary asset |
| 3700 | `apps/dwa/websites/GTM OS Site/images/user-32-05.jpg` | ⏭️ | binary asset |
| 3701 | `apps/dwa/websites/GTM OS Site/images/user-32-06.jpg` | ⏭️ | binary asset |
| 3702 | `apps/dwa/websites/GTM OS Site/images/user-32-07.jpg` | ⏭️ | binary asset |
| 3703 | `apps/dwa/websites/GTM OS Site/images/user-32-08.jpg` | ⏭️ | binary asset |
| 3704 | `apps/dwa/websites/GTM OS Site/images/user-36-05.jpg` | ⏭️ | binary asset |
| 3705 | `apps/dwa/websites/GTM OS Site/images/user-40-01.jpg` | ⏭️ | binary asset |
| 3706 | `apps/dwa/websites/GTM OS Site/images/user-40-02.jpg` | ⏭️ | binary asset |
| 3707 | `apps/dwa/websites/GTM OS Site/images/user-40-03.jpg` | ⏭️ | binary asset |
| 3708 | `apps/dwa/websites/GTM OS Site/images/user-40-04.jpg` | ⏭️ | binary asset |
| 3709 | `apps/dwa/websites/GTM OS Site/images/user-40-05.jpg` | ⏭️ | binary asset |
| 3710 | `apps/dwa/websites/GTM OS Site/images/user-40-06.jpg` | ⏭️ | binary asset |
| 3711 | `apps/dwa/websites/GTM OS Site/images/user-40-07.jpg` | ⏭️ | binary asset |
| 3712 | `apps/dwa/websites/GTM OS Site/images/user-40-08.jpg` | ⏭️ | binary asset |
| 3713 | `apps/dwa/websites/GTM OS Site/images/user-40-09.jpg` | ⏭️ | binary asset |
| 3714 | `apps/dwa/websites/GTM OS Site/images/user-40-10.jpg` | ⏭️ | binary asset |
| 3715 | `apps/dwa/websites/GTM OS Site/images/user-40-11.jpg` | ⏭️ | binary asset |
| 3716 | `apps/dwa/websites/GTM OS Site/images/user-40-12.jpg` | ⏭️ | binary asset |
| 3717 | `apps/dwa/websites/GTM OS Site/images/user-64-01.jpg` | ⏭️ | binary asset |
| 3718 | `apps/dwa/websites/GTM OS Site/images/user-64-02.jpg` | ⏭️ | binary asset |
| 3719 | `apps/dwa/websites/GTM OS Site/images/user-64-03.jpg` | ⏭️ | binary asset |
| 3720 | `apps/dwa/websites/GTM OS Site/images/user-64-04.jpg` | ⏭️ | binary asset |
| 3721 | `apps/dwa/websites/GTM OS Site/images/user-64-05.jpg` | ⏭️ | binary asset |
| 3722 | `apps/dwa/websites/GTM OS Site/images/user-64-06.jpg` | ⏭️ | binary asset |
| 3723 | `apps/dwa/websites/GTM OS Site/images/user-64-07.jpg` | ⏭️ | binary asset |
| 3724 | `apps/dwa/websites/GTM OS Site/images/user-64-08.jpg` | ⏭️ | binary asset |
| 3725 | `apps/dwa/websites/GTM OS Site/images/user-64-09.jpg` | ⏭️ | binary asset |
| 3726 | `apps/dwa/websites/GTM OS Site/images/user-64-10.jpg` | ⏭️ | binary asset |
| 3727 | `apps/dwa/websites/GTM OS Site/images/user-64-11.jpg` | ⏭️ | binary asset |
| 3728 | `apps/dwa/websites/GTM OS Site/images/user-64-12.jpg` | ⏭️ | binary asset |
| 3729 | `apps/dwa/websites/GTM OS Site/images/user-64-13.jpg` | ⏭️ | binary asset |
| 3730 | `apps/dwa/websites/GTM OS Site/images/user-64-14.jpg` | ⏭️ | binary asset |
| 3731 | `apps/dwa/websites/GTM OS Site/images/user-avatar-32.png` | ⏭️ | binary asset |
| 3732 | `apps/dwa/websites/GTM OS Site/images/user-avatar-80.png` | ⏭️ | binary asset |
| 3733 | `apps/dwa/websites/GTM OS Site/index-dark-backup.html` | ⏳ | pending |
| 3734 | `apps/dwa/websites/GTM OS Site/index.html` | ⏳ | pending |
| 3735 | `apps/dwa/websites/GTM OS Site/legal/acceptable-use-policy.html` | ⏳ | pending |
| 3736 | `apps/dwa/websites/GTM OS Site/legal/ai-disclaimer.html` | ⏳ | pending |
| 3737 | `apps/dwa/websites/GTM OS Site/legal/community-guidelines.html` | ⏳ | pending |
| 3738 | `apps/dwa/websites/GTM OS Site/legal/cookie-policy.html` | ⏳ | pending |
| 3739 | `apps/dwa/websites/GTM OS Site/legal/earnings-disclaimer.html` | ⏳ | pending |
| 3740 | `apps/dwa/websites/GTM OS Site/legal/privacy-policy.html` | ⏳ | pending |
| 3741 | `apps/dwa/websites/GTM OS Site/legal/refund-policy.html` | ⏳ | pending |
| 3742 | `apps/dwa/websites/GTM OS Site/legal/terms-of-service.html` | ⏳ | pending |
| 3743 | `apps/dwa/websites/GTM OS Site/methodology.html` | ⏳ | pending |
| 3744 | `apps/dwa/websites/GTM OS Site/platform-architecture-dark-backup.html` | ⏳ | pending |
| 3745 | `apps/dwa/websites/GTM OS Site/platform-architecture.html` | ⏳ | pending |
| 3746 | `apps/dwa/websites/GTM OS Site/pricing.html` | ⏳ | pending |
| 3747 | `apps/dwa/websites/GTM OS Site/robots.txt` | ⏳ | pending |
| 3748 | `apps/dwa/websites/GTM OS Site/sitemap.xml` | ⏳ | pending |
| 3749 | `apps/dwa/websites/GTM OS Site/src/css/fonts.css` | ⏳ | pending |
| 3750 | `apps/dwa/websites/GTM OS Site/src/js/ga4-events.js` | ⏳ | pending |
| 3751 | `apps/dwa/websites/GTM OS Site/src/js/main.js` | ⏳ | pending |
| 3752 | `apps/dwa/websites/GTM OS Site/sw.js` | ⏳ | pending |
| 3753 | `apps/dwa/websites/GTM OS Site/tailwind_theme/tailwind.css` | ⏳ | pending |
| 3754 | `apps/dwa/websites/INDEX.md` | ⏳ | pending |
| 3755 | `apps/dwa/websites/Implementation Blueprint — PaaS Platform for SVTech site.md` | ⏳ | pending |
| 3756 | `apps/dwa/websites/digitalwellness-academy-site/.gitignore` | ⏳ | pending |
| 3757 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/UNMATCHED.md` | ⏳ | pending |
| 3758 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-001-understanding-managing-anxiety.md` | ⏳ | pending |
| 3759 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-002-managing-panic-attacks-panic-disorder.md` | ⏳ | pending |
| 3760 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-003-social-anxiety-building-confidence.md` | ⏳ | pending |
| 3761 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-004-ocd-exposure-response-prevention.md` | ⏳ | pending |
| 3762 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-005-anxiety-toolkit-dbt-crisis-skills.md` | ⏳ | pending |
| 3763 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-006-depression-treatment-recovery.md` | ⏳ | pending |
| 3764 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-007-behavioral-activation-for-depression.md` | ⏳ | pending |
| 3765 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-008-self-compassion-depression.md` | ⏳ | pending |
| 3766 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-009-bipolar-disorder-managing-mood-swings.md` | ⏳ | pending |
| 3767 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-010-seasonal-affective-disorder-sad.md` | ⏳ | pending |
| 3768 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-011-trauma-processing-ptsd.md` | ⏳ | pending |
| 3769 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-012-complex-trauma-developmental-wounds.md` | ⏳ | pending |
| 3770 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-013-grief-loss-healing-after-loss.md` | ⏳ | pending |
| 3771 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-014-attachment-wounds-relationship-patterns.md` | ⏳ | pending |
| 3772 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-015-somatic-approaches-to-trauma.md` | ⏳ | pending |
| 3773 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-016-communication-skills-assertiveness.md` | ⏳ | pending |
| 3774 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-017-conflict-resolution-in-relationships.md` | ⏳ | pending |
| 3775 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-018-breaking-codependency-patterns.md` | ⏳ | pending |
| 3776 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-019-building-healthy-relationships.md` | ⏳ | pending |
| 3777 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-020-intimacy-emotional-connection.md` | ⏳ | pending |
| 3778 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-021-emotional-regulation-skills-dbt.md` | ⏳ | pending |
| 3779 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-022-distress-tolerance-crisis-skills.md` | ⏳ | pending |
| 3780 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-023-mindfulness-fundamentals.md` | ⏳ | pending |
| 3781 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/dwa-024-building-self-esteem-confidence.md` | ⏳ | pending |
| 3782 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-1-movement-medicine.md` | ⏳ | pending |
| 3783 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-10-relationship-dynamics.md` | ⏳ | pending |
| 3784 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-11-family-parenting-mental-health.md` | ⏳ | pending |
| 3785 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-12-purpose-and-responsibility.md` | ⏳ | pending |
| 3786 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-13-mental-health-first-aid.md` | ⏳ | pending |
| 3787 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-14-coaching-mentoring.md` | ⏳ | pending |
| 3788 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-15-legacy-building.md` | ⏳ | pending |
| 3789 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-16-recreational-therapy.md` | ⏳ | pending |
| 3790 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-17-creative-expression.md` | ⏳ | pending |
| 3791 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-18-adventure-outdoor-mental-health.md` | ⏳ | pending |
| 3792 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-19-music-movement-wellness.md` | ⏳ | pending |
| 3793 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-2-workplace-mental-health.md` | ⏳ | pending |
| 3794 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-3-digital-wellness.md` | ⏳ | pending |
| 3795 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-4-growth-mindset.md` | ⏳ | pending |
| 3796 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-5-cbt-fundamentals.md` | ⏳ | pending |
| 3797 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-6-stress-challenge-navigation.md` | ⏳ | pending |
| 3798 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-7-boundaries-bootcamp.md` | ⏳ | pending |
| 3799 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-8-social-circle-mastery.md` | ⏳ | pending |
| 3800 | `apps/dwa/websites/digitalwellness-academy-site/content-rewrite/opt-9-team-sports-mental-health.md` | ⏳ | pending |
| 3801 | `apps/dwa/websites/digitalwellness-academy-site/dwa-course-image-prompts.md` | ⏳ | pending |
| 3802 | `apps/dwa/websites/digitalwellness-academy-site/package.json` | ⏳ | pending |
| 3803 | `apps/dwa/websites/digitalwellness-academy-site/site/404.html` | ⏳ | pending |
| 3804 | `apps/dwa/websites/digitalwellness-academy-site/site/README.md` | ⏳ | pending |
| 3805 | `apps/dwa/websites/digitalwellness-academy-site/site/about.html` | ⏳ | pending |
| 3806 | `apps/dwa/websites/digitalwellness-academy-site/site/architecture.html` | ⏳ | pending |
| 3807 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/css/main.css` | ⏳ | pending |
| 3808 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/css/page.css` | ⏳ | pending |
| 3809 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/apple-touch-icon.png` | ⏭️ | binary asset |
| 3810 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/bg/abstract-bg-3.webp` | ⏭️ | binary asset |
| 3811 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/blog/blog-hero-1.webp` | ⏭️ | binary asset |
| 3812 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/blog/blog-hero-2.webp` | ⏭️ | binary asset |
| 3813 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/blog/blog-post-1.webp` | ⏭️ | binary asset |
| 3814 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/blog/blog-post-2.webp` | ⏭️ | binary asset |
| 3815 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/blog/blog-post-3.webp` | ⏭️ | binary asset |
| 3816 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/blog/blog-post-4.webp` | ⏭️ | binary asset |
| 3817 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/blog/blog-post-5.webp` | ⏭️ | binary asset |
| 3818 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/blog/blog-post-6.webp` | ⏭️ | binary asset |
| 3819 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/blog/blog-post-7.webp` | ⏭️ | binary asset |
| 3820 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/blog/blog-post-9.webp` | ⏭️ | binary asset |
| 3821 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/blog/blog-post-portrait-1.webp` | ⏭️ | binary asset |
| 3822 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/activities-3.webp` | ⏭️ | binary asset |
| 3823 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/campus-4.webp` | ⏭️ | binary asset |
| 3824 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/campus-8.webp` | ⏭️ | binary asset |
| 3825 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/courses-12.webp` | ⏭️ | binary asset |
| 3826 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/courses-13.webp` | ⏭️ | binary asset |
| 3827 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/courses-14.webp` | ⏭️ | binary asset |
| 3828 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/courses-3.webp` | ⏭️ | binary asset |
| 3829 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/courses-4.webp` | ⏭️ | binary asset |
| 3830 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/courses-5.webp` | ⏭️ | binary asset |
| 3831 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/courses-7.webp` | ⏭️ | binary asset |
| 3832 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/courses-8.webp` | ⏭️ | binary asset |
| 3833 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/courses-9.webp` | ⏭️ | binary asset |
| 3834 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/education-1.webp` | ⏭️ | binary asset |
| 3835 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/education-5.webp` | ⏭️ | binary asset |
| 3836 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/education-square-2.webp` | ⏭️ | binary asset |
| 3837 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/events-3.webp` | ⏭️ | binary asset |
| 3838 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/events-5.webp` | ⏭️ | binary asset |
| 3839 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/events-7.webp` | ⏭️ | binary asset |
| 3840 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/showcase-4.webp` | ⏭️ | binary asset |
| 3841 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/students-3.webp` | ⏭️ | binary asset |
| 3842 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/students-7.webp` | ⏭️ | binary asset |
| 3843 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/students-9.webp` | ⏭️ | binary asset |
| 3844 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/teacher-1.webp` | ⏭️ | binary asset |
| 3845 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/teacher-10.webp` | ⏭️ | binary asset |
| 3846 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/teacher-2.webp` | ⏭️ | binary asset |
| 3847 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/teacher-4.webp` | ⏭️ | binary asset |
| 3848 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/teacher-6.webp` | ⏭️ | binary asset |
| 3849 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/teacher-7.webp` | ⏭️ | binary asset |
| 3850 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/teacher-8.webp` | ⏭️ | binary asset |
| 3851 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/education/teacher-9.webp` | ⏭️ | binary asset |
| 3852 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/favicon.png` | ⏭️ | binary asset |
| 3853 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/logo.webp` | ⏭️ | binary asset |
| 3854 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-f-1.webp` | ⏭️ | binary asset |
| 3855 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-f-12.webp` | ⏭️ | binary asset |
| 3856 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-f-13.webp` | ⏭️ | binary asset |
| 3857 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-f-3.webp` | ⏭️ | binary asset |
| 3858 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-f-7.webp` | ⏭️ | binary asset |
| 3859 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-f-8.webp` | ⏭️ | binary asset |
| 3860 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-f-9.webp` | ⏭️ | binary asset |
| 3861 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-m-10.webp` | ⏭️ | binary asset |
| 3862 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-m-11.webp` | ⏭️ | binary asset |
| 3863 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-m-12.webp` | ⏭️ | binary asset |
| 3864 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-m-2.webp` | ⏭️ | binary asset |
| 3865 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-m-3.webp` | ⏭️ | binary asset |
| 3866 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-m-4.webp` | ⏭️ | binary asset |
| 3867 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-m-5.webp` | ⏭️ | binary asset |
| 3868 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-m-6.webp` | ⏭️ | binary asset |
| 3869 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-m-8.webp` | ⏭️ | binary asset |
| 3870 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/img/person/person-m-9.webp` | ⏭️ | binary asset |
| 3871 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/js/main.js` | ⏳ | pending |
| 3872 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/_sections.scss` | ⏳ | pending |
| 3873 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/_variables.scss` | ⏳ | pending |
| 3874 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/layouts/_aos.scss` | ⏳ | pending |
| 3875 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/layouts/_footer.scss` | ⏳ | pending |
| 3876 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/layouts/_general.scss` | ⏳ | pending |
| 3877 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/layouts/_header.scss` | ⏳ | pending |
| 3878 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/layouts/_navmenu.scss` | ⏳ | pending |
| 3879 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/layouts/_page-titles.scss` | ⏳ | pending |
| 3880 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/layouts/_preloader.scss` | ⏳ | pending |
| 3881 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/layouts/_scrolltop.scss` | ⏳ | pending |
| 3882 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/main.scss` | ⏳ | pending |
| 3883 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_about.scss` | ⏳ | pending |
| 3884 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_blog-comment-form.scss` | ⏳ | pending |
| 3885 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_blog-comments.scss` | ⏳ | pending |
| 3886 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_blog-details.scss` | ⏳ | pending |
| 3887 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_blog-hero.scss` | ⏳ | pending |
| 3888 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_blog-posts.scss` | ⏳ | pending |
| 3889 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_contact.scss` | ⏳ | pending |
| 3890 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_course-categories.scss` | ⏳ | pending |
| 3891 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_course-details.scss` | ⏳ | pending |
| 3892 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_courses-2.scss` | ⏳ | pending |
| 3893 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_courses-events.scss` | ⏳ | pending |
| 3894 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_courses-hero.scss` | ⏳ | pending |
| 3895 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_cta.scss` | ⏳ | pending |
| 3896 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_enroll.scss` | ⏳ | pending |
| 3897 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_error-404.scss` | ⏳ | pending |
| 3898 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_featured-courses.scss` | ⏳ | pending |
| 3899 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_featured-instructors.scss` | ⏳ | pending |
| 3900 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_instructor-profile.scss` | ⏳ | pending |
| 3901 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_instructors.scss` | ⏳ | pending |
| 3902 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_pagination-2.scss` | ⏳ | pending |
| 3903 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_pricing.scss` | ⏳ | pending |
| 3904 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_privacy.scss` | ⏳ | pending |
| 3905 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_recent-blog-posts.scss` | ⏳ | pending |
| 3906 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_starter-section.scss` | ⏳ | pending |
| 3907 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_terms-of-service.scss` | ⏳ | pending |
| 3908 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/scss/sections/_testimonials.scss` | ⏳ | pending |
| 3909 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/aos/aos.cjs.js` | ⏳ | pending |
| 3910 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/aos/aos.css` | ⏳ | pending |
| 3911 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/aos/aos.esm.js` | ⏳ | pending |
| 3912 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/aos/aos.js` | ⏳ | pending |
| 3913 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/aos/aos.js.map` | ⏳ | pending |
| 3914 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap-icons/bootstrap-icons.css` | ⏳ | pending |
| 3915 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap-icons/bootstrap-icons.json` | ⏳ | pending |
| 3916 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap-icons/bootstrap-icons.min.css` | ⏳ | pending |
| 3917 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap-icons/bootstrap-icons.scss` | ⏳ | pending |
| 3918 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap-icons/fonts/bootstrap-icons.woff` | ⏭️ | binary asset |
| 3919 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap-icons/fonts/bootstrap-icons.woff2` | ⏭️ | binary asset |
| 3920 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-grid.css` | ⏳ | pending |
| 3921 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-grid.css.map` | ⏳ | pending |
| 3922 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-grid.min.css` | ⏳ | pending |
| 3923 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-grid.min.css.map` | ⏳ | pending |
| 3924 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-grid.rtl.css` | ⏳ | pending |
| 3925 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-grid.rtl.css.map` | ⏳ | pending |
| 3926 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-grid.rtl.min.css` | ⏳ | pending |
| 3927 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-grid.rtl.min.css.map` | ⏳ | pending |
| 3928 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-reboot.css` | ⏳ | pending |
| 3929 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-reboot.css.map` | ⏳ | pending |
| 3930 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-reboot.min.css` | ⏳ | pending |
| 3931 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-reboot.min.css.map` | ⏳ | pending |
| 3932 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-reboot.rtl.css` | ⏳ | pending |
| 3933 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-reboot.rtl.css.map` | ⏳ | pending |
| 3934 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-reboot.rtl.min.css` | ⏳ | pending |
| 3935 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-reboot.rtl.min.css.map` | ⏳ | pending |
| 3936 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-utilities.css` | ⏳ | pending |
| 3937 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-utilities.css.map` | ⏳ | pending |
| 3938 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-utilities.min.css` | ⏳ | pending |
| 3939 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-utilities.min.css.map` | ⏳ | pending |
| 3940 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-utilities.rtl.css` | ⏳ | pending |
| 3941 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-utilities.rtl.css.map` | ⏳ | pending |
| 3942 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-utilities.rtl.min.css` | ⏳ | pending |
| 3943 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap-utilities.rtl.min.css.map` | ⏳ | pending |
| 3944 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap.css` | ⏳ | pending |
| 3945 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap.css.map` | ⏳ | pending |
| 3946 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap.min.css` | ⏳ | pending |
| 3947 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap.min.css.map` | ⏳ | pending |
| 3948 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap.rtl.css` | ⏳ | pending |
| 3949 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap.rtl.css.map` | ⏳ | pending |
| 3950 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap.rtl.min.css` | ⏳ | pending |
| 3951 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/css/bootstrap.rtl.min.css.map` | ⏳ | pending |
| 3952 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/js/bootstrap.bundle.js` | ⏳ | pending |
| 3953 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/js/bootstrap.bundle.js.map` | ⏳ | pending |
| 3954 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/js/bootstrap.bundle.min.js` | ⏳ | pending |
| 3955 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/js/bootstrap.bundle.min.js.map` | ⏳ | pending |
| 3956 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/js/bootstrap.esm.js` | ⏳ | pending |
| 3957 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/js/bootstrap.esm.js.map` | ⏳ | pending |
| 3958 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/js/bootstrap.esm.min.js` | ⏳ | pending |
| 3959 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/js/bootstrap.esm.min.js.map` | ⏳ | pending |
| 3960 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/js/bootstrap.js` | ⏳ | pending |
| 3961 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/js/bootstrap.js.map` | ⏳ | pending |
| 3962 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/js/bootstrap.min.js` | ⏳ | pending |
| 3963 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/bootstrap/js/bootstrap.min.js.map` | ⏳ | pending |
| 3964 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/php-email-form/php-email-form.php` | ⏳ | pending |
| 3965 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/php-email-form/validate.js` | ⏳ | pending |
| 3966 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/purecounter/purecounter_vanilla.js` | ⏳ | pending |
| 3967 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/purecounter/purecounter_vanilla.js.map` | ⏳ | pending |
| 3968 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/swiper/swiper-bundle.min.css` | ⏳ | pending |
| 3969 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/swiper/swiper-bundle.min.js` | ⏳ | pending |
| 3970 | `apps/dwa/websites/digitalwellness-academy-site/site/assets/vendor/swiper/swiper-bundle.min.js.map` | ⏳ | pending |
| 3971 | `apps/dwa/websites/digitalwellness-academy-site/site/contact.html` | ⏳ | pending |
| 3972 | `apps/dwa/websites/digitalwellness-academy-site/site/courses-learner.html` | ⏳ | pending |
| 3973 | `apps/dwa/websites/digitalwellness-academy-site/site/courses.html` | ⏳ | pending |
| 3974 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-001-understanding-managing-anxiety.html` | ⏳ | pending |
| 3975 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-002-managing-panic-attacks-panic-disorder.html` | ⏳ | pending |
| 3976 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-003-social-anxiety-building-confidence.html` | ⏳ | pending |
| 3977 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-004-ocd-exposure-response-prevention.html` | ⏳ | pending |
| 3978 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-005-anxiety-toolkit-dbt-crisis-skills.html` | ⏳ | pending |
| 3979 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-006-depression-treatment-recovery.html` | ⏳ | pending |
| 3980 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-007-behavioral-activation-for-depression.html` | ⏳ | pending |
| 3981 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-008-self-compassion-depression.html` | ⏳ | pending |
| 3982 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-009-bipolar-disorder-managing-mood-swings.html` | ⏳ | pending |
| 3983 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-010-seasonal-affective-disorder-sad.html` | ⏳ | pending |
| 3984 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-011-trauma-processing-ptsd.html` | ⏳ | pending |
| 3985 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-012-complex-trauma-developmental-wounds.html` | ⏳ | pending |
| 3986 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-013-grief-loss-healing-after-loss.html` | ⏳ | pending |
| 3987 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-014-attachment-wounds-relationship-patterns.html` | ⏳ | pending |
| 3988 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-015-somatic-approaches-to-trauma.html` | ⏳ | pending |
| 3989 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-016-communication-skills-assertiveness.html` | ⏳ | pending |
| 3990 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-017-conflict-resolution-in-relationships.html` | ⏳ | pending |
| 3991 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-018-breaking-codependency-patterns.html` | ⏳ | pending |
| 3992 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-019-building-healthy-relationships.html` | ⏳ | pending |
| 3993 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-020-intimacy-emotional-connection.html` | ⏳ | pending |
| 3994 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-021-emotional-regulation-skills-dbt.html` | ⏳ | pending |
| 3995 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-022-distress-tolerance-crisis-skills.html` | ⏳ | pending |
| 3996 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-023-mindfulness-fundamentals.html` | ⏳ | pending |
| 3997 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/dwa-024-building-self-esteem-confidence.html` | ⏳ | pending |
| 3998 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-1-movement-medicine.html` | ⏳ | pending |
| 3999 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-10-relationship-dynamics.html` | ⏳ | pending |
| 4000 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-11-family-parenting-mental-health.html` | ⏳ | pending |
| 4001 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-12-purpose-and-responsibility.html` | ⏳ | pending |
| 4002 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-13-mental-health-first-aid.html` | ⏳ | pending |
| 4003 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-14-coaching-mentoring.html` | ⏳ | pending |
| 4004 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-15-legacy-building.html` | ⏳ | pending |
| 4005 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-16-recreational-therapy.html` | ⏳ | pending |
| 4006 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-17-creative-expression.html` | ⏳ | pending |
| 4007 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-18-adventure-outdoor-mental-health.html` | ⏳ | pending |
| 4008 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-19-music-movement-wellness.html` | ⏳ | pending |
| 4009 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-2-workplace-mental-health.html` | ⏳ | pending |
| 4010 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-3-digital-wellness.html` | ⏳ | pending |
| 4011 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-4-growth-mindset.html` | ⏳ | pending |
| 4012 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-5-cbt-fundamentals.html` | ⏳ | pending |
| 4013 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-6-stress-challenge-navigation.html` | ⏳ | pending |
| 4014 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-7-boundaries-bootcamp.html` | ⏳ | pending |
| 4015 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-8-social-circle-mastery.html` | ⏳ | pending |
| 4016 | `apps/dwa/websites/digitalwellness-academy-site/site/courses/opt-9-team-sports-mental-health.html` | ⏳ | pending |
| 4017 | `apps/dwa/websites/digitalwellness-academy-site/site/css/tailwind.css` | ⏳ | pending |
| 4018 | `apps/dwa/websites/digitalwellness-academy-site/site/custom-content.html` | ⏳ | pending |
| 4019 | `apps/dwa/websites/digitalwellness-academy-site/site/favicon.ico` | ⏭️ | binary asset |
| 4020 | `apps/dwa/websites/digitalwellness-academy-site/site/for-enterprises.html` | ⏳ | pending |
| 4021 | `apps/dwa/websites/digitalwellness-academy-site/site/for-investors.html` | ⏳ | pending |
| 4022 | `apps/dwa/websites/digitalwellness-academy-site/site/for-providers.html` | ⏳ | pending |
| 4023 | `apps/dwa/websites/digitalwellness-academy-site/site/for-universities.html` | ⏳ | pending |
| 4024 | `apps/dwa/websites/digitalwellness-academy-site/site/framework.html` | ⏳ | pending |
| 4025 | `apps/dwa/websites/digitalwellness-academy-site/site/hipaa-hosting.html` | ⏳ | pending |
| 4026 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-001-understanding-managing-anxiety.jpg` | ⏭️ | binary asset |
| 4027 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-002-managing-panic-attacks-panic-disorder.jpg` | ⏭️ | binary asset |
| 4028 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-003-social-anxiety-building-confidence.jpg` | ⏭️ | binary asset |
| 4029 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-004-ocd-exposure-response-prevention.jpg` | ⏭️ | binary asset |
| 4030 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-005-anxiety-toolkit-dbt-crisis-skills.jpg` | ⏭️ | binary asset |
| 4031 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-006-depression-treatment-recovery.jpg` | ⏭️ | binary asset |
| 4032 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-007-behavioral-activation-for-depression.jpg` | ⏭️ | binary asset |
| 4033 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-008-self-compassion-depression.jpg` | ⏭️ | binary asset |
| 4034 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-009-bipolar-disorder-managing-mood-swings.jpg` | ⏭️ | binary asset |
| 4035 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-010-seasonal-affective-disorder-sad.jpg` | ⏭️ | binary asset |
| 4036 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-011-trauma-processing-ptsd.jpg` | ⏭️ | binary asset |
| 4037 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-012-complex-trauma-developmental-wounds.jpg` | ⏭️ | binary asset |
| 4038 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-013-grief-loss-healing-after-loss.jpg` | ⏭️ | binary asset |
| 4039 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-014-attachment-wounds-relationship-patterns.jpg` | ⏭️ | binary asset |
| 4040 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-015-somatic-approaches-to-trauma.jpg` | ⏭️ | binary asset |
| 4041 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-016-communication-skills-assertiveness.jpg` | ⏭️ | binary asset |
| 4042 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-017-conflict-resolution-in-relationships.jpg` | ⏭️ | binary asset |
| 4043 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-018-breaking-codependency-patterns.jpg` | ⏭️ | binary asset |
| 4044 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-019-building-healthy-relationships.jpg` | ⏭️ | binary asset |
| 4045 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-020-intimacy-emotional-connection.jpg` | ⏭️ | binary asset |
| 4046 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-021-emotional-regulation-skills-dbt.jpg` | ⏭️ | binary asset |
| 4047 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-022-distress-tolerance-crisis-skills.jpg` | ⏭️ | binary asset |
| 4048 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-023-mindfulness-fundamentals.jpg` | ⏭️ | binary asset |
| 4049 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/dwa-024-building-self-esteem-confidence.jpg` | ⏭️ | binary asset |
| 4050 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-1-movement-medicine.jpg` | ⏭️ | binary asset |
| 4051 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-10-relationship-dynamics.jpg` | ⏭️ | binary asset |
| 4052 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-11-family-parenting-mental-health.jpg` | ⏭️ | binary asset |
| 4053 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-12-purpose-and-responsibility.jpg` | ⏭️ | binary asset |
| 4054 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-13-mental-health-first-aid.jpg` | ⏭️ | binary asset |
| 4055 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-14-coaching-mentoring.jpg` | ⏭️ | binary asset |
| 4056 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-15-legacy-building.jpg` | ⏭️ | binary asset |
| 4057 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-16-recreational-therapy.jpg` | ⏭️ | binary asset |
| 4058 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-17-creative-expression.jpg` | ⏭️ | binary asset |
| 4059 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-18-adventure-outdoor-mental-health.jpg` | ⏭️ | binary asset |
| 4060 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-19-music-movement-wellness.jpg` | ⏭️ | binary asset |
| 4061 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-2-workplace-mental-health.jpg` | ⏭️ | binary asset |
| 4062 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-3-digital-wellness.jpg` | ⏭️ | binary asset |
| 4063 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-4-growth-mindset.jpg` | ⏭️ | binary asset |
| 4064 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-5-cbt-fundamentals.jpg` | ⏭️ | binary asset |
| 4065 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-6-stress-challenge-navigation.jpg` | ⏭️ | binary asset |
| 4066 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-7-boundaries-bootcamp.jpg` | ⏭️ | binary asset |
| 4067 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-8-social-circle-mastery.jpg` | ⏭️ | binary asset |
| 4068 | `apps/dwa/websites/digitalwellness-academy-site/site/images/courses/opt-9-team-sports-mental-health.jpg` | ⏭️ | binary asset |
| 4069 | `apps/dwa/websites/digitalwellness-academy-site/site/images/framework/01-hero.webp` | ⏭️ | binary asset |
| 4070 | `apps/dwa/websites/digitalwellness-academy-site/site/images/framework/02-two-schools.webp` | ⏭️ | binary asset |
| 4071 | `apps/dwa/websites/digitalwellness-academy-site/site/images/framework/03-comparison.webp` | ⏭️ | binary asset |
| 4072 | `apps/dwa/websites/digitalwellness-academy-site/site/images/framework/04-pillars-overview.webp` | ⏭️ | binary asset |
| 4073 | `apps/dwa/websites/digitalwellness-academy-site/site/images/framework/05-pillar-1-movement.webp` | ⏭️ | binary asset |
| 4074 | `apps/dwa/websites/digitalwellness-academy-site/site/images/framework/06-pillar-2-cognitive.webp` | ⏭️ | binary asset |
| 4075 | `apps/dwa/websites/digitalwellness-academy-site/site/images/framework/07-pillar-3-social.webp` | ⏭️ | binary asset |
| 4076 | `apps/dwa/websites/digitalwellness-academy-site/site/images/framework/08-pillar-4-digital.webp` | ⏭️ | binary asset |
| 4077 | `apps/dwa/websites/digitalwellness-academy-site/site/images/framework/09-pillar-5-purpose.webp` | ⏭️ | binary asset |
| 4078 | `apps/dwa/websites/digitalwellness-academy-site/site/images/framework/10-synergy.webp` | ⏭️ | binary asset |
| 4079 | `apps/dwa/websites/digitalwellness-academy-site/site/images/framework/11-ecosystem.webp` | ⏭️ | binary asset |
| 4080 | `apps/dwa/websites/digitalwellness-academy-site/site/images/icon.jpg` | ⏭️ | binary asset |
| 4081 | `apps/dwa/websites/digitalwellness-academy-site/site/images/logo.jpg` | ⏭️ | binary asset |
| 4082 | `apps/dwa/websites/digitalwellness-academy-site/site/images/og-image-pricing.jpg` | ⏭️ | binary asset |
| 4083 | `apps/dwa/websites/digitalwellness-academy-site/site/images/og-image-providers.jpg` | ⏭️ | binary asset |
| 4084 | `apps/dwa/websites/digitalwellness-academy-site/site/images/og-image.jpg` | ⏭️ | binary asset |
| 4085 | `apps/dwa/websites/digitalwellness-academy-site/site/index.html` | ⏳ | pending |
| 4086 | `apps/dwa/websites/digitalwellness-academy-site/site/marketing-flywheel.html` | ⏳ | pending |
| 4087 | `apps/dwa/websites/digitalwellness-academy-site/site/platform.html` | ⏳ | pending |
| 4088 | `apps/dwa/websites/digitalwellness-academy-site/site/pricing.html` | ⏳ | pending |
| 4089 | `apps/dwa/websites/digitalwellness-academy-site/site/robots.txt` | ⏳ | pending |
| 4090 | `apps/dwa/websites/digitalwellness-academy-site/site/sitemap.xml` | ⏳ | pending |
| 4091 | `apps/dwa/websites/digitalwellness-academy-site/site/treatment-integration.html` | ⏳ | pending |
| 4092 | `apps/dwa/websites/digitalwellness-academy-site/src.css` | ⏳ | pending |
| 4093 | `apps/dwa/websites/digitalwellness-academy-site/tailwind.config.js` | ⏳ | pending |
| 4094 | `apps/dwa/websites/digitalwellness-academy/PLATFORM_DIFFERENTIATORS.md` | ⏳ | pending |
| 4095 | `apps/dwa/websites/digitalwellness-academy/README.md` | ⏳ | pending |
| 4096 | `apps/dwa/websites/digitalwellness-academy/SITE_REDESIGN_AUDIT.md` | ⏳ | pending |
| 4097 | `apps/dwa/websites/digitalwellness-academy/VALUE_PROPOSITION_FRAMEWORK.md` | ⏳ | pending |
| 4098 | `apps/dwa/websites/digitalwellness-academy/index-REDESIGN.html` | ⏳ | pending |
| 4099 | `apps/dwa/websites/digitalwellness-academy/index.html` | ⏳ | pending |
| 4100 | `apps/dwa/websites/simple-next/.gitignore` | ⏳ | pending |
| 4101 | `apps/dwa/websites/simple-next/.vscode/settings.json` | ⏳ | pending |
| 4102 | `apps/dwa/websites/simple-next/CHANGELOG.md` | ⏳ | pending |
| 4103 | `apps/dwa/websites/simple-next/README.md` | ⏳ | pending |
| 4104 | `apps/dwa/websites/simple-next/app/(auth)/layout.tsx` | ⏳ | pending |
| 4105 | `apps/dwa/websites/simple-next/app/(auth)/reset-password/page.tsx` | ⏳ | pending |
| 4106 | `apps/dwa/websites/simple-next/app/(auth)/signin/page.tsx` | ⏳ | pending |
| 4107 | `apps/dwa/websites/simple-next/app/(auth)/signup/page.tsx` | ⏳ | pending |
| 4108 | `apps/dwa/websites/simple-next/app/(default)/apps/hero.tsx` | ⏳ | pending |
| 4109 | `apps/dwa/websites/simple-next/app/(default)/apps/page.tsx` | ⏳ | pending |
| 4110 | `apps/dwa/websites/simple-next/app/(default)/blog/[slug]/page.tsx` | ⏳ | pending |
| 4111 | `apps/dwa/websites/simple-next/app/(default)/blog/[slug]/post-nav.tsx` | ⏳ | pending |
| 4112 | `apps/dwa/websites/simple-next/app/(default)/blog/page.tsx` | ⏳ | pending |
| 4113 | `apps/dwa/websites/simple-next/app/(default)/customers/hero.tsx` | ⏳ | pending |
| 4114 | `apps/dwa/websites/simple-next/app/(default)/customers/page.tsx` | ⏳ | pending |
| 4115 | `apps/dwa/websites/simple-next/app/(default)/documentation/[slug]/documentation-provider.tsx` | ⏳ | pending |
| 4116 | `apps/dwa/websites/simple-next/app/(default)/documentation/[slug]/hamburger.tsx` | ⏳ | pending |
| 4117 | `apps/dwa/websites/simple-next/app/(default)/documentation/[slug]/page.tsx` | ⏳ | pending |
| 4118 | `apps/dwa/websites/simple-next/app/(default)/documentation/[slug]/sidebar.tsx` | ⏳ | pending |
| 4119 | `apps/dwa/websites/simple-next/app/(default)/documentation/page.tsx` | ⏳ | pending |
| 4120 | `apps/dwa/websites/simple-next/app/(default)/layout.tsx` | ⏳ | pending |
| 4121 | `apps/dwa/websites/simple-next/app/(default)/page.tsx` | ⏳ | pending |
| 4122 | `apps/dwa/websites/simple-next/app/(default)/pricing/page.tsx` | ⏳ | pending |
| 4123 | `apps/dwa/websites/simple-next/app/(default)/support/hero.tsx` | ⏳ | pending |
| 4124 | `apps/dwa/websites/simple-next/app/(default)/support/page.tsx` | ⏳ | pending |
| 4125 | `apps/dwa/websites/simple-next/app/(default)/support/search.tsx` | ⏳ | pending |
| 4126 | `apps/dwa/websites/simple-next/app/api/hello/route.ts` | ⏳ | pending |
| 4127 | `apps/dwa/websites/simple-next/app/css/additional-styles/custom-fonts.css` | ⏳ | pending |
| 4128 | `apps/dwa/websites/simple-next/app/css/additional-styles/theme.css` | ⏳ | pending |
| 4129 | `apps/dwa/websites/simple-next/app/css/additional-styles/utility-patterns.css` | ⏳ | pending |
| 4130 | `apps/dwa/websites/simple-next/app/css/style.css` | ⏳ | pending |
| 4131 | `apps/dwa/websites/simple-next/app/layout.tsx` | ⏳ | pending |
| 4132 | `apps/dwa/websites/simple-next/components/accordion.tsx` | ⏳ | pending |
| 4133 | `apps/dwa/websites/simple-next/components/app-card.tsx` | ⏳ | pending |
| 4134 | `apps/dwa/websites/simple-next/components/app-list.tsx` | ⏳ | pending |
| 4135 | `apps/dwa/websites/simple-next/components/business-categories.tsx` | ⏳ | pending |
| 4136 | `apps/dwa/websites/simple-next/components/compare-plans.tsx` | ⏳ | pending |
| 4137 | `apps/dwa/websites/simple-next/components/cta-alternative.tsx` | ⏳ | pending |
| 4138 | `apps/dwa/websites/simple-next/components/cta.tsx` | ⏳ | pending |
| 4139 | `apps/dwa/websites/simple-next/components/dropdown.tsx` | ⏳ | pending |
| 4140 | `apps/dwa/websites/simple-next/components/faqs-02.tsx` | ⏳ | pending |
| 4141 | `apps/dwa/websites/simple-next/components/faqs.tsx` | ⏳ | pending |
| 4142 | `apps/dwa/websites/simple-next/components/features-home.tsx` | ⏳ | pending |
| 4143 | `apps/dwa/websites/simple-next/components/features-planet.tsx` | ⏳ | pending |
| 4144 | `apps/dwa/websites/simple-next/components/hero-home.tsx` | ⏳ | pending |
| 4145 | `apps/dwa/websites/simple-next/components/large-testimonial.tsx` | ⏳ | pending |
| 4146 | `apps/dwa/websites/simple-next/components/mdx/banner.tsx` | ⏳ | pending |
| 4147 | `apps/dwa/websites/simple-next/components/mdx/image.tsx` | ⏳ | pending |
| 4148 | `apps/dwa/websites/simple-next/components/mdx/link.tsx` | ⏳ | pending |
| 4149 | `apps/dwa/websites/simple-next/components/mdx/mdx.tsx` | ⏳ | pending |
| 4150 | `apps/dwa/websites/simple-next/components/mdx/utils.ts` | ⏳ | pending |
| 4151 | `apps/dwa/websites/simple-next/components/newsletter.tsx` | ⏳ | pending |
| 4152 | `apps/dwa/websites/simple-next/components/page-illustration.tsx` | ⏳ | pending |
| 4153 | `apps/dwa/websites/simple-next/components/page-navigation.tsx` | ⏳ | pending |
| 4154 | `apps/dwa/websites/simple-next/components/post-date.tsx` | ⏳ | pending |
| 4155 | `apps/dwa/websites/simple-next/components/post-item.tsx` | ⏳ | pending |
| 4156 | `apps/dwa/websites/simple-next/components/pricing-tables.tsx` | ⏳ | pending |
| 4157 | `apps/dwa/websites/simple-next/components/search-modal.tsx` | ⏳ | pending |
| 4158 | `apps/dwa/websites/simple-next/components/testimonial.tsx` | ⏳ | pending |
| 4159 | `apps/dwa/websites/simple-next/components/testimonials-carousel.tsx` | ⏳ | pending |
| 4160 | `apps/dwa/websites/simple-next/components/testimonials-grid.tsx` | ⏳ | pending |
| 4161 | `apps/dwa/websites/simple-next/components/tooltip.tsx` | ⏳ | pending |
| 4162 | `apps/dwa/websites/simple-next/components/ui/footer.tsx` | ⏳ | pending |
| 4163 | `apps/dwa/websites/simple-next/components/ui/header.tsx` | ⏳ | pending |
| 4164 | `apps/dwa/websites/simple-next/components/ui/logo.tsx` | ⏳ | pending |
| 4165 | `apps/dwa/websites/simple-next/components/ui/mobile-menu.tsx` | ⏳ | pending |
| 4166 | `apps/dwa/websites/simple-next/components/wall-of-love.tsx` | ⏳ | pending |
| 4167 | `apps/dwa/websites/simple-next/content/blog/community-digest-summer-edition.mdx` | ⏳ | pending |
| 4168 | `apps/dwa/websites/simple-next/content/blog/create-and-deploy-a-blog-with-simple.mdx` | ⏳ | pending |
| 4169 | `apps/dwa/websites/simple-next/content/blog/getting-started-with-nextjs.mdx` | ⏳ | pending |
| 4170 | `apps/dwa/websites/simple-next/content/blog/getting-started-with-vuejs-and-stripe.mdx` | ⏳ | pending |
| 4171 | `apps/dwa/websites/simple-next/content/blog/how-to-identify-high-intent-leads.mdx` | ⏳ | pending |
| 4172 | `apps/dwa/websites/simple-next/content/blog/how-to-work-with-friendly-apis.mdx` | ⏳ | pending |
| 4173 | `apps/dwa/websites/simple-next/content/blog/introducing-the-testing-field-guide.mdx` | ⏳ | pending |
| 4174 | `apps/dwa/websites/simple-next/content/blog/why-we-think-simple-is-good-for-developers.mdx` | ⏳ | pending |
| 4175 | `apps/dwa/websites/simple-next/content/docs/aspect-ratio.mdx` | ⏳ | pending |
| 4176 | `apps/dwa/websites/simple-next/content/docs/discarding-changes.mdx` | ⏳ | pending |
| 4177 | `apps/dwa/websites/simple-next/content/docs/fundamentals.mdx` | ⏳ | pending |
| 4178 | `apps/dwa/websites/simple-next/content/docs/getting-started.mdx` | ⏳ | pending |
| 4179 | `apps/dwa/websites/simple-next/content/docs/progress-with-links.mdx` | ⏳ | pending |
| 4180 | `apps/dwa/websites/simple-next/next.config.js` | ⏳ | pending |
| 4181 | `apps/dwa/websites/simple-next/package.json` | ⏳ | pending |
| 4182 | `apps/dwa/websites/simple-next/postcss.config.js` | ⏳ | pending |
| 4183 | `apps/dwa/websites/simple-next/public/favicon.ico` | ⏭️ | binary asset |
| 4184 | `apps/dwa/websites/simple-next/public/images/auth-bg.svg` | ⏭️ | binary asset |
| 4185 | `apps/dwa/websites/simple-next/public/images/avatar-01.jpg` | ⏭️ | binary asset |
| 4186 | `apps/dwa/websites/simple-next/public/images/avatar-02.jpg` | ⏭️ | binary asset |
| 4187 | `apps/dwa/websites/simple-next/public/images/avatar-03.jpg` | ⏭️ | binary asset |
| 4188 | `apps/dwa/websites/simple-next/public/images/avatar-04.jpg` | ⏭️ | binary asset |
| 4189 | `apps/dwa/websites/simple-next/public/images/avatar-05.jpg` | ⏭️ | binary asset |
| 4190 | `apps/dwa/websites/simple-next/public/images/avatar-06.jpg` | ⏭️ | binary asset |
| 4191 | `apps/dwa/websites/simple-next/public/images/badge.svg` | ⏭️ | binary asset |
| 4192 | `apps/dwa/websites/simple-next/public/images/blog-author-01.jpg` | ⏭️ | binary asset |
| 4193 | `apps/dwa/websites/simple-next/public/images/blog-author-02.jpg` | ⏭️ | binary asset |
| 4194 | `apps/dwa/websites/simple-next/public/images/docs-illustration.png` | ⏭️ | binary asset |
| 4195 | `apps/dwa/websites/simple-next/public/images/features-02-overlay-01.png` | ⏭️ | binary asset |
| 4196 | `apps/dwa/websites/simple-next/public/images/features-02-overlay-02.png` | ⏭️ | binary asset |
| 4197 | `apps/dwa/websites/simple-next/public/images/features-02-overlay-03.png` | ⏭️ | binary asset |
| 4198 | `apps/dwa/websites/simple-next/public/images/integration-01.svg` | ⏭️ | binary asset |
| 4199 | `apps/dwa/websites/simple-next/public/images/integration-02.svg` | ⏭️ | binary asset |
| 4200 | `apps/dwa/websites/simple-next/public/images/integration-03.svg` | ⏭️ | binary asset |
| 4201 | `apps/dwa/websites/simple-next/public/images/integration-04.svg` | ⏭️ | binary asset |
| 4202 | `apps/dwa/websites/simple-next/public/images/integration-05.svg` | ⏭️ | binary asset |
| 4203 | `apps/dwa/websites/simple-next/public/images/integration-06.svg` | ⏭️ | binary asset |
| 4204 | `apps/dwa/websites/simple-next/public/images/integration-07.svg` | ⏭️ | binary asset |
| 4205 | `apps/dwa/websites/simple-next/public/images/integration-08.svg` | ⏭️ | binary asset |
| 4206 | `apps/dwa/websites/simple-next/public/images/integration-09.svg` | ⏭️ | binary asset |
| 4207 | `apps/dwa/websites/simple-next/public/images/integration-10.svg` | ⏭️ | binary asset |
| 4208 | `apps/dwa/websites/simple-next/public/images/integration-11.svg` | ⏭️ | binary asset |
| 4209 | `apps/dwa/websites/simple-next/public/images/integration-12.svg` | ⏭️ | binary asset |
| 4210 | `apps/dwa/websites/simple-next/public/images/integration-13.svg` | ⏭️ | binary asset |
| 4211 | `apps/dwa/websites/simple-next/public/images/integration-14.svg` | ⏭️ | binary asset |
| 4212 | `apps/dwa/websites/simple-next/public/images/integration-15.svg` | ⏭️ | binary asset |
| 4213 | `apps/dwa/websites/simple-next/public/images/integration-16.svg` | ⏭️ | binary asset |
| 4214 | `apps/dwa/websites/simple-next/public/images/integration-17.svg` | ⏭️ | binary asset |
| 4215 | `apps/dwa/websites/simple-next/public/images/integration-18.svg` | ⏭️ | binary asset |
| 4216 | `apps/dwa/websites/simple-next/public/images/integration-19.svg` | ⏭️ | binary asset |
| 4217 | `apps/dwa/websites/simple-next/public/images/integration-20.svg` | ⏭️ | binary asset |
| 4218 | `apps/dwa/websites/simple-next/public/images/integration-21.svg` | ⏭️ | binary asset |
| 4219 | `apps/dwa/websites/simple-next/public/images/large-testimonial.jpg` | ⏭️ | binary asset |
| 4220 | `apps/dwa/websites/simple-next/public/images/logo-01.svg` | ⏭️ | binary asset |
| 4221 | `apps/dwa/websites/simple-next/public/images/logo-02.svg` | ⏭️ | binary asset |
| 4222 | `apps/dwa/websites/simple-next/public/images/logo-03.svg` | ⏭️ | binary asset |
| 4223 | `apps/dwa/websites/simple-next/public/images/logo-04.svg` | ⏭️ | binary asset |
| 4224 | `apps/dwa/websites/simple-next/public/images/logo-05.svg` | ⏭️ | binary asset |
| 4225 | `apps/dwa/websites/simple-next/public/images/logo-06.svg` | ⏭️ | binary asset |
| 4226 | `apps/dwa/websites/simple-next/public/images/logo-07.svg` | ⏭️ | binary asset |
| 4227 | `apps/dwa/websites/simple-next/public/images/logo-08.svg` | ⏭️ | binary asset |
| 4228 | `apps/dwa/websites/simple-next/public/images/logo-09.svg` | ⏭️ | binary asset |
| 4229 | `apps/dwa/websites/simple-next/public/images/planet-overlay.svg` | ⏭️ | binary asset |
| 4230 | `apps/dwa/websites/simple-next/public/images/planet-tag-01.png` | ⏭️ | binary asset |
| 4231 | `apps/dwa/websites/simple-next/public/images/planet-tag-02.png` | ⏭️ | binary asset |
| 4232 | `apps/dwa/websites/simple-next/public/images/planet-tag-03.png` | ⏭️ | binary asset |
| 4233 | `apps/dwa/websites/simple-next/public/images/planet-tag-04.png` | ⏭️ | binary asset |
| 4234 | `apps/dwa/websites/simple-next/public/images/planet.png` | ⏭️ | binary asset |
| 4235 | `apps/dwa/websites/simple-next/public/images/stripes-dark.svg` | ⏭️ | binary asset |
| 4236 | `apps/dwa/websites/simple-next/public/images/stripes.svg` | ⏭️ | binary asset |
| 4237 | `apps/dwa/websites/simple-next/public/images/testimonial-01.jpg` | ⏭️ | binary asset |
| 4238 | `apps/dwa/websites/simple-next/public/images/testimonial-02.jpg` | ⏭️ | binary asset |
| 4239 | `apps/dwa/websites/simple-next/public/images/testimonial-03.jpg` | ⏭️ | binary asset |
| 4240 | `apps/dwa/websites/simple-next/public/images/testimonial-04.jpg` | ⏭️ | binary asset |
| 4241 | `apps/dwa/websites/simple-next/public/images/testimonial-05.jpg` | ⏭️ | binary asset |
| 4242 | `apps/dwa/websites/simple-next/public/images/testimonial-06.jpg` | ⏭️ | binary asset |
| 4243 | `apps/dwa/websites/simple-next/public/images/testimonial-07.jpg` | ⏭️ | binary asset |
| 4244 | `apps/dwa/websites/simple-next/public/images/testimonial-08.jpg` | ⏭️ | binary asset |
| 4245 | `apps/dwa/websites/simple-next/public/images/testimonial-09.jpg` | ⏭️ | binary asset |
| 4246 | `apps/dwa/websites/simple-next/public/images/testimonial-10.jpg` | ⏭️ | binary asset |
| 4247 | `apps/dwa/websites/simple-next/public/images/testimonial-11.jpg` | ⏭️ | binary asset |
| 4248 | `apps/dwa/websites/simple-next/public/images/testimonial-12.jpg` | ⏭️ | binary asset |
| 4249 | `apps/dwa/websites/simple-next/public/images/testimonial-13.jpg` | ⏭️ | binary asset |
| 4250 | `apps/dwa/websites/simple-next/public/images/testimonial-14.jpg` | ⏭️ | binary asset |
| 4251 | `apps/dwa/websites/simple-next/public/images/testimonial-15.jpg` | ⏭️ | binary asset |
| 4252 | `apps/dwa/websites/simple-next/public/images/testimonial-16.jpg` | ⏭️ | binary asset |
| 4253 | `apps/dwa/websites/simple-next/public/images/testimonial-17.jpg` | ⏭️ | binary asset |
| 4254 | `apps/dwa/websites/simple-next/public/images/testimonial-18.jpg` | ⏭️ | binary asset |
| 4255 | `apps/dwa/websites/simple-next/public/images/testimonial-19.jpg` | ⏭️ | binary asset |
| 4256 | `apps/dwa/websites/simple-next/public/images/testimonial-20.jpg` | ⏭️ | binary asset |
| 4257 | `apps/dwa/websites/simple-next/public/images/testimonial-21.jpg` | ⏭️ | binary asset |
| 4258 | `apps/dwa/websites/simple-next/public/images/testimonial-22.jpg` | ⏭️ | binary asset |
| 4259 | `apps/dwa/websites/simple-next/public/images/video-testimonial-01.jpg` | ⏭️ | binary asset |
| 4260 | `apps/dwa/websites/simple-next/public/images/video-testimonial-02.jpg` | ⏭️ | binary asset |
| 4261 | `apps/dwa/websites/simple-next/tsconfig.json` | ⏳ | pending |
| 4262 | `apps/dwa/websites/simple-next/utils/useMasonry.tsx` | ⏳ | pending |
| 4263 | `apps/dwa/websites/simple-next/utils/useScrollspy.tsx` | ⏳ | pending |
| 4264 | `apps/dwa/websites/soloframehub-critique.md` | ⏳ | pending |
| 4265 | `apps/dwa/websites/svtech-outline.md` | ⏳ | pending |
| 4266 | `apps/dwa/websites/svtech-site/index.html` | ⏳ | pending |
| 4267 | `apps/dwa/websites/tidy-next/.gitignore` | ⏳ | pending |
| 4268 | `apps/dwa/websites/tidy-next/.vscode/settings.json` | ⏳ | pending |
| 4269 | `apps/dwa/websites/tidy-next/CHANGELOG.md` | ⏳ | pending |
| 4270 | `apps/dwa/websites/tidy-next/README.md` | ⏳ | pending |
| 4271 | `apps/dwa/websites/tidy-next/app/(auth)/layout.tsx` | ⏳ | pending |
| 4272 | `apps/dwa/websites/tidy-next/app/(auth)/request-demo/page.tsx` | ⏳ | pending |
| 4273 | `apps/dwa/websites/tidy-next/app/(auth)/reset-password/page.tsx` | ⏳ | pending |
| 4274 | `apps/dwa/websites/tidy-next/app/(auth)/signin/page.tsx` | ⏳ | pending |
| 4275 | `apps/dwa/websites/tidy-next/app/(default)/about/content.tsx` | ⏳ | pending |
| 4276 | `apps/dwa/websites/tidy-next/app/(default)/about/page.tsx` | ⏳ | pending |
| 4277 | `apps/dwa/websites/tidy-next/app/(default)/blog/[slug]/page.tsx` | ⏳ | pending |
| 4278 | `apps/dwa/websites/tidy-next/app/(default)/blog/page.tsx` | ⏳ | pending |
| 4279 | `apps/dwa/websites/tidy-next/app/(default)/layout.tsx` | ⏳ | pending |
| 4280 | `apps/dwa/websites/tidy-next/app/(default)/page.tsx` | ⏳ | pending |
| 4281 | `apps/dwa/websites/tidy-next/app/(default)/pricing/page.tsx` | ⏳ | pending |
| 4282 | `apps/dwa/websites/tidy-next/app/(default)/support/content.tsx` | ⏳ | pending |
| 4283 | `apps/dwa/websites/tidy-next/app/(default)/support/page.tsx` | ⏳ | pending |
| 4284 | `apps/dwa/websites/tidy-next/app/(default)/wall-of-love/page.tsx` | ⏳ | pending |
| 4285 | `apps/dwa/websites/tidy-next/app/(default)/wall-of-love/wall-of-love-single/content.tsx` | ⏳ | pending |
| 4286 | `apps/dwa/websites/tidy-next/app/(default)/wall-of-love/wall-of-love-single/hero.tsx` | ⏳ | pending |
| 4287 | `apps/dwa/websites/tidy-next/app/(default)/wall-of-love/wall-of-love-single/page.tsx` | ⏳ | pending |
| 4288 | `apps/dwa/websites/tidy-next/app/api/hello/route.ts` | ⏳ | pending |
| 4289 | `apps/dwa/websites/tidy-next/app/css/additional-styles/range-slider.css` | ⏳ | pending |
| 4290 | `apps/dwa/websites/tidy-next/app/css/additional-styles/theme.css` | ⏳ | pending |
| 4291 | `apps/dwa/websites/tidy-next/app/css/additional-styles/toggle-switch.css` | ⏳ | pending |
| 4292 | `apps/dwa/websites/tidy-next/app/css/additional-styles/utility-patterns.css` | ⏳ | pending |
| 4293 | `apps/dwa/websites/tidy-next/app/css/style.css` | ⏳ | pending |
| 4294 | `apps/dwa/websites/tidy-next/app/layout.tsx` | ⏳ | pending |
| 4295 | `apps/dwa/websites/tidy-next/app/not-found.tsx` | ⏳ | pending |
| 4296 | `apps/dwa/websites/tidy-next/components/blog-tags.tsx` | ⏳ | pending |
| 4297 | `apps/dwa/websites/tidy-next/components/clients-02.tsx` | ⏳ | pending |
| 4298 | `apps/dwa/websites/tidy-next/components/clients.tsx` | ⏳ | pending |
| 4299 | `apps/dwa/websites/tidy-next/components/cta-02.tsx` | ⏳ | pending |
| 4300 | `apps/dwa/websites/tidy-next/components/cta-box.tsx` | ⏳ | pending |
| 4301 | `apps/dwa/websites/tidy-next/components/cta-dark.tsx` | ⏳ | pending |
| 4302 | `apps/dwa/websites/tidy-next/components/cta-pricing.tsx` | ⏳ | pending |
| 4303 | `apps/dwa/websites/tidy-next/components/cta.tsx` | ⏳ | pending |
| 4304 | `apps/dwa/websites/tidy-next/components/customers.tsx` | ⏳ | pending |
| 4305 | `apps/dwa/websites/tidy-next/components/faqs.tsx` | ⏳ | pending |
| 4306 | `apps/dwa/websites/tidy-next/components/features-blocks.tsx` | ⏳ | pending |
| 4307 | `apps/dwa/websites/tidy-next/components/features-home-02.tsx` | ⏳ | pending |
| 4308 | `apps/dwa/websites/tidy-next/components/features-home-03.tsx` | ⏳ | pending |
| 4309 | `apps/dwa/websites/tidy-next/components/features-home.tsx` | ⏳ | pending |
| 4310 | `apps/dwa/websites/tidy-next/components/features-pricing.tsx` | ⏳ | pending |
| 4311 | `apps/dwa/websites/tidy-next/components/features-table.tsx` | ⏳ | pending |
| 4312 | `apps/dwa/websites/tidy-next/components/hero-about.tsx` | ⏳ | pending |
| 4313 | `apps/dwa/websites/tidy-next/components/hero-blog.tsx` | ⏳ | pending |
| 4314 | `apps/dwa/websites/tidy-next/components/hero-home.tsx` | ⏳ | pending |
| 4315 | `apps/dwa/websites/tidy-next/components/hero-pricing.tsx` | ⏳ | pending |
| 4316 | `apps/dwa/websites/tidy-next/components/hero-support.tsx` | ⏳ | pending |
| 4317 | `apps/dwa/websites/tidy-next/components/hero-wol.tsx` | ⏳ | pending |
| 4318 | `apps/dwa/websites/tidy-next/components/mdx/image.tsx` | ⏳ | pending |
| 4319 | `apps/dwa/websites/tidy-next/components/mdx/link.tsx` | ⏳ | pending |
| 4320 | `apps/dwa/websites/tidy-next/components/mdx/mdx.tsx` | ⏳ | pending |
| 4321 | `apps/dwa/websites/tidy-next/components/mdx/utils.ts` | ⏳ | pending |
| 4322 | `apps/dwa/websites/tidy-next/components/modal-video-01.tsx` | ⏳ | pending |
| 4323 | `apps/dwa/websites/tidy-next/components/modal-video-02.tsx` | ⏳ | pending |
| 4324 | `apps/dwa/websites/tidy-next/components/newsletter.tsx` | ⏳ | pending |
| 4325 | `apps/dwa/websites/tidy-next/components/post-date.tsx` | ⏳ | pending |
| 4326 | `apps/dwa/websites/tidy-next/components/post-item.tsx` | ⏳ | pending |
| 4327 | `apps/dwa/websites/tidy-next/components/pricing-tables.tsx` | ⏳ | pending |
| 4328 | `apps/dwa/websites/tidy-next/components/pricing.tsx` | ⏳ | pending |
| 4329 | `apps/dwa/websites/tidy-next/components/related-stories.tsx` | ⏳ | pending |
| 4330 | `apps/dwa/websites/tidy-next/components/separator.tsx` | ⏳ | pending |
| 4331 | `apps/dwa/websites/tidy-next/components/stats-02.tsx` | ⏳ | pending |
| 4332 | `apps/dwa/websites/tidy-next/components/stats.tsx` | ⏳ | pending |
| 4333 | `apps/dwa/websites/tidy-next/components/target.tsx` | ⏳ | pending |
| 4334 | `apps/dwa/websites/tidy-next/components/team-members.tsx` | ⏳ | pending |
| 4335 | `apps/dwa/websites/tidy-next/components/team.tsx` | ⏳ | pending |
| 4336 | `apps/dwa/websites/tidy-next/components/testimonials.tsx` | ⏳ | pending |
| 4337 | `apps/dwa/websites/tidy-next/components/ui/footer.tsx` | ⏳ | pending |
| 4338 | `apps/dwa/websites/tidy-next/components/ui/header.tsx` | ⏳ | pending |
| 4339 | `apps/dwa/websites/tidy-next/components/ui/logo.tsx` | ⏳ | pending |
| 4340 | `apps/dwa/websites/tidy-next/components/ui/mobile-menu.tsx` | ⏳ | pending |
| 4341 | `apps/dwa/websites/tidy-next/components/utils/accordion.tsx` | ⏳ | pending |
| 4342 | `apps/dwa/websites/tidy-next/components/utils/dropdown.tsx` | ⏳ | pending |
| 4343 | `apps/dwa/websites/tidy-next/components/utils/tooltip.tsx` | ⏳ | pending |
| 4344 | `apps/dwa/websites/tidy-next/content/blog/4-must-know-skill-to-be-an-effective-leader.mdx` | ⏳ | pending |
| 4345 | `apps/dwa/websites/tidy-next/content/blog/40-creative-content-ideas-to-post-on-your-blog.mdx` | ⏳ | pending |
| 4346 | `apps/dwa/websites/tidy-next/content/blog/a-sneak-peek-of-the-new-tidy-web-portal.mdx` | ⏳ | pending |
| 4347 | `apps/dwa/websites/tidy-next/content/blog/elevating-collaboration-with-tidy-and-google-workspace.mdx` | ⏳ | pending |
| 4348 | `apps/dwa/websites/tidy-next/content/blog/how-startups-can-sell-more-using-smart-channels.mdx` | ⏳ | pending |
| 4349 | `apps/dwa/websites/tidy-next/content/blog/how-to-level-up-your-marketing-strategy-with-tidy-pro.mdx` | ⏳ | pending |
| 4350 | `apps/dwa/websites/tidy-next/content/blog/introducing-the-tidy-mentor-network.mdx` | ⏳ | pending |
| 4351 | `apps/dwa/websites/tidy-next/content/blog/remote-founder-stand-up-with-mark-muller.mdx` | ⏳ | pending |
| 4352 | `apps/dwa/websites/tidy-next/content/blog/the-best-marketing-channels-to-promote-your-products.mdx` | ⏳ | pending |
| 4353 | `apps/dwa/websites/tidy-next/content/blog/where-to-post-remote-jobs-for-developers-for-free.mdx` | ⏳ | pending |
| 4354 | `apps/dwa/websites/tidy-next/next.config.js` | ⏳ | pending |
| 4355 | `apps/dwa/websites/tidy-next/package.json` | ⏳ | pending |
| 4356 | `apps/dwa/websites/tidy-next/postcss.config.js` | ⏳ | pending |
| 4357 | `apps/dwa/websites/tidy-next/public/favicon.ico` | ⏭️ | binary asset |
| 4358 | `apps/dwa/websites/tidy-next/public/images/about-hero.jpg` | ⏭️ | binary asset |
| 4359 | `apps/dwa/websites/tidy-next/public/images/about-intro.jpg` | ⏭️ | binary asset |
| 4360 | `apps/dwa/websites/tidy-next/public/images/blog-post-01.jpg` | ⏭️ | binary asset |
| 4361 | `apps/dwa/websites/tidy-next/public/images/blog-post-02.jpg` | ⏭️ | binary asset |
| 4362 | `apps/dwa/websites/tidy-next/public/images/blog-post-03.jpg` | ⏭️ | binary asset |
| 4363 | `apps/dwa/websites/tidy-next/public/images/blog-post-04.jpg` | ⏭️ | binary asset |
| 4364 | `apps/dwa/websites/tidy-next/public/images/blog-post-05.jpg` | ⏭️ | binary asset |
| 4365 | `apps/dwa/websites/tidy-next/public/images/blog-post-06.jpg` | ⏭️ | binary asset |
| 4366 | `apps/dwa/websites/tidy-next/public/images/blog-post-07.jpg` | ⏭️ | binary asset |
| 4367 | `apps/dwa/websites/tidy-next/public/images/blog-post-08.jpg` | ⏭️ | binary asset |
| 4368 | `apps/dwa/websites/tidy-next/public/images/blog-post-09.jpg` | ⏭️ | binary asset |
| 4369 | `apps/dwa/websites/tidy-next/public/images/blog-post-10.jpg` | ⏭️ | binary asset |
| 4370 | `apps/dwa/websites/tidy-next/public/images/cta-image.png` | ⏭️ | binary asset |
| 4371 | `apps/dwa/websites/tidy-next/public/images/customer-avatar-01.jpg` | ⏭️ | binary asset |
| 4372 | `apps/dwa/websites/tidy-next/public/images/customer-avatar-02.jpg` | ⏭️ | binary asset |
| 4373 | `apps/dwa/websites/tidy-next/public/images/customer-avatar-03.jpg` | ⏭️ | binary asset |
| 4374 | `apps/dwa/websites/tidy-next/public/images/customer-avatar-04.jpg` | ⏭️ | binary asset |
| 4375 | `apps/dwa/websites/tidy-next/public/images/customer-avatar-05.jpg` | ⏭️ | binary asset |
| 4376 | `apps/dwa/websites/tidy-next/public/images/customers-01.jpg` | ⏭️ | binary asset |
| 4377 | `apps/dwa/websites/tidy-next/public/images/customers-02.jpg` | ⏭️ | binary asset |
| 4378 | `apps/dwa/websites/tidy-next/public/images/customers-03.jpg` | ⏭️ | binary asset |
| 4379 | `apps/dwa/websites/tidy-next/public/images/features-home-01.jpg` | ⏭️ | binary asset |
| 4380 | `apps/dwa/websites/tidy-next/public/images/features-home-02.png` | ⏭️ | binary asset |
| 4381 | `apps/dwa/websites/tidy-next/public/images/features-home-3-01.jpg` | ⏭️ | binary asset |
| 4382 | `apps/dwa/websites/tidy-next/public/images/features-home-3-02.jpg` | ⏭️ | binary asset |
| 4383 | `apps/dwa/websites/tidy-next/public/images/features-home-3-03.jpg` | ⏭️ | binary asset |
| 4384 | `apps/dwa/websites/tidy-next/public/images/hero-image-01.jpg` | ⏭️ | binary asset |
| 4385 | `apps/dwa/websites/tidy-next/public/images/news-author-01.jpg` | ⏭️ | binary asset |
| 4386 | `apps/dwa/websites/tidy-next/public/images/news-author-02.jpg` | ⏭️ | binary asset |
| 4387 | `apps/dwa/websites/tidy-next/public/images/news-author-03.jpg` | ⏭️ | binary asset |
| 4388 | `apps/dwa/websites/tidy-next/public/images/news-author-04.jpg` | ⏭️ | binary asset |
| 4389 | `apps/dwa/websites/tidy-next/public/images/news-author-05.jpg` | ⏭️ | binary asset |
| 4390 | `apps/dwa/websites/tidy-next/public/images/news-author-06.jpg` | ⏭️ | binary asset |
| 4391 | `apps/dwa/websites/tidy-next/public/images/news-author-07.jpg` | ⏭️ | binary asset |
| 4392 | `apps/dwa/websites/tidy-next/public/images/news-inner-image-02.jpg` | ⏭️ | binary asset |
| 4393 | `apps/dwa/websites/tidy-next/public/images/news-inner-image.jpg` | ⏭️ | binary asset |
| 4394 | `apps/dwa/websites/tidy-next/public/images/news-single.jpg` | ⏭️ | binary asset |
| 4395 | `apps/dwa/websites/tidy-next/public/images/request-demo-bg.jpg` | ⏭️ | binary asset |
| 4396 | `apps/dwa/websites/tidy-next/public/images/reset-password-bg.jpg` | ⏭️ | binary asset |
| 4397 | `apps/dwa/websites/tidy-next/public/images/sign-in-bg.jpg` | ⏭️ | binary asset |
| 4398 | `apps/dwa/websites/tidy-next/public/images/support-avatar-01.jpg` | ⏭️ | binary asset |
| 4399 | `apps/dwa/websites/tidy-next/public/images/support-avatar-02.jpg` | ⏭️ | binary asset |
| 4400 | `apps/dwa/websites/tidy-next/public/images/support-avatar-03.jpg` | ⏭️ | binary asset |
| 4401 | `apps/dwa/websites/tidy-next/public/images/support-avatar-04.jpg` | ⏭️ | binary asset |
| 4402 | `apps/dwa/websites/tidy-next/public/images/support-avatar-05.jpg` | ⏭️ | binary asset |
| 4403 | `apps/dwa/websites/tidy-next/public/images/support-avatar-06.jpg` | ⏭️ | binary asset |
| 4404 | `apps/dwa/websites/tidy-next/public/images/target.png` | ⏭️ | binary asset |
| 4405 | `apps/dwa/websites/tidy-next/public/images/team-01.jpg` | ⏭️ | binary asset |
| 4406 | `apps/dwa/websites/tidy-next/public/images/team-02.jpg` | ⏭️ | binary asset |
| 4407 | `apps/dwa/websites/tidy-next/public/images/team-03.jpg` | ⏭️ | binary asset |
| 4408 | `apps/dwa/websites/tidy-next/public/images/team-member-01.jpg` | ⏭️ | binary asset |
| 4409 | `apps/dwa/websites/tidy-next/public/images/team-member-02.jpg` | ⏭️ | binary asset |
| 4410 | `apps/dwa/websites/tidy-next/public/images/team-member-03.jpg` | ⏭️ | binary asset |
| 4411 | `apps/dwa/websites/tidy-next/public/images/team-member-04.jpg` | ⏭️ | binary asset |
| 4412 | `apps/dwa/websites/tidy-next/public/images/team-member-05.jpg` | ⏭️ | binary asset |
| 4413 | `apps/dwa/websites/tidy-next/public/images/team-member-06.jpg` | ⏭️ | binary asset |
| 4414 | `apps/dwa/websites/tidy-next/public/images/team-member-07.jpg` | ⏭️ | binary asset |
| 4415 | `apps/dwa/websites/tidy-next/public/images/team-member-08.jpg` | ⏭️ | binary asset |
| 4416 | `apps/dwa/websites/tidy-next/public/images/testimonial-01.jpg` | ⏭️ | binary asset |
| 4417 | `apps/dwa/websites/tidy-next/public/images/testimonial-02.jpg` | ⏭️ | binary asset |
| 4418 | `apps/dwa/websites/tidy-next/public/images/testimonial-03.jpg` | ⏭️ | binary asset |
| 4419 | `apps/dwa/websites/tidy-next/public/images/testimonial-04.jpg` | ⏭️ | binary asset |
| 4420 | `apps/dwa/websites/tidy-next/public/images/testimonial-05.jpg` | ⏭️ | binary asset |
| 4421 | `apps/dwa/websites/tidy-next/public/images/testimonial-06.jpg` | ⏭️ | binary asset |
| 4422 | `apps/dwa/websites/tidy-next/public/images/wof-hero.jpg` | ⏭️ | binary asset |
| 4423 | `apps/dwa/websites/tidy-next/public/images/wof-single-hero.jpg` | ⏭️ | binary asset |
| 4424 | `apps/dwa/websites/tidy-next/public/images/wof-single.jpg` | ⏭️ | binary asset |
| 4425 | `apps/dwa/websites/tidy-next/public/videos/video.mp4` | ⏭️ | binary asset |
| 4426 | `apps/dwa/websites/tidy-next/tsconfig.json` | ⏳ | pending |
| 4427 | `apps/gtm/.agents/skills/ab-test-setup/SKILL.md` | ⏳ | pending |
| 4428 | `apps/gtm/.agents/skills/ab-test-setup/evals/evals.json` | ⏳ | pending |
| 4429 | `apps/gtm/.agents/skills/ab-test-setup/references/sample-size-guide.md` | ⏳ | pending |
| 4430 | `apps/gtm/.agents/skills/ab-test-setup/references/test-templates.md` | ⏳ | pending |
| 4431 | `apps/gtm/.agents/skills/ad-creative/SKILL.md` | ⏳ | pending |
| 4432 | `apps/gtm/.agents/skills/ad-creative/evals/evals.json` | ⏳ | pending |
| 4433 | `apps/gtm/.agents/skills/ad-creative/references/generative-tools.md` | ⏳ | pending |
| 4434 | `apps/gtm/.agents/skills/ad-creative/references/platform-specs.md` | ⏳ | pending |
| 4435 | `apps/gtm/.agents/skills/agent-skill-builder/SKILL.md` | ⏳ | pending |
| 4436 | `apps/gtm/.agents/skills/agent-skill-builder/references/frontmatter-reference.md` | ⏳ | pending |
| 4437 | `apps/gtm/.agents/skills/agent-skill-builder/references/gpt-migration-checklist.md` | ⏳ | pending |
| 4438 | `apps/gtm/.agents/skills/agent-skill-builder/references/skill-template.md` | ⏳ | pending |
| 4439 | `apps/gtm/.agents/skills/ahrefs-automation/SKILL.md` | ⏳ | pending |
| 4440 | `apps/gtm/.agents/skills/ai-humanizer/SKILL.md` | ⏳ | pending |
| 4441 | `apps/gtm/.agents/skills/ai-humanizer/references/style-guide.md` | ⏳ | pending |
| 4442 | `apps/gtm/.agents/skills/ai-seo/SKILL.md` | ⏳ | pending |
| 4443 | `apps/gtm/.agents/skills/ai-seo/evals/evals.json` | ⏳ | pending |
| 4444 | `apps/gtm/.agents/skills/ai-seo/references/content-patterns.md` | ⏳ | pending |
| 4445 | `apps/gtm/.agents/skills/ai-seo/references/platform-ranking-factors.md` | ⏳ | pending |
| 4446 | `apps/gtm/.agents/skills/analytics-tracking/SKILL.md` | ⏳ | pending |
| 4447 | `apps/gtm/.agents/skills/analytics-tracking/evals/evals.json` | ⏳ | pending |
| 4448 | `apps/gtm/.agents/skills/analytics-tracking/references/event-library.md` | ⏳ | pending |
| 4449 | `apps/gtm/.agents/skills/analytics-tracking/references/ga4-implementation.md` | ⏳ | pending |
| 4450 | `apps/gtm/.agents/skills/analytics-tracking/references/gtm-implementation.md` | ⏳ | pending |
| 4451 | `apps/gtm/.agents/skills/apollo-automation/SKILL.md` | ⏳ | pending |
| 4452 | `apps/gtm/.agents/skills/attio-automation/SKILL.md` | ⏳ | pending |
| 4453 | `apps/gtm/.agents/skills/bigmailer-automation/SKILL.md` | ⏳ | pending |
| 4454 | `apps/gtm/.agents/skills/case-study-builder/SKILL.md` | ⏳ | pending |
| 4455 | `apps/gtm/.agents/skills/case-study-builder/references/case-study-examples.md` | ⏳ | pending |
| 4456 | `apps/gtm/.agents/skills/churn-prevention/SKILL.md` | ⏳ | pending |
| 4457 | `apps/gtm/.agents/skills/churn-prevention/evals/evals.json` | ⏳ | pending |
| 4458 | `apps/gtm/.agents/skills/churn-prevention/references/cancel-flow-patterns.md` | ⏳ | pending |
| 4459 | `apps/gtm/.agents/skills/churn-prevention/references/dunning-playbook.md` | ⏳ | pending |
| 4460 | `apps/gtm/.agents/skills/clay-gtm-outbound/SKILL.md` | ⏳ | pending |
| 4461 | `apps/gtm/.agents/skills/clay-gtm-outbound/references/Clay Automated Outbound Certification.md` | ⏳ | pending |
| 4462 | `apps/gtm/.agents/skills/clay-gtm-outbound/references/Clay Outbound Email Prompt (3 Email Sequence).md` | ⏳ | pending |
| 4463 | `apps/gtm/.agents/skills/clay-gtm-outbound/references/Clay Outbound Email Prompt (4 Email Sequence).md` | ⏳ | pending |
| 4464 | `apps/gtm/.agents/skills/clay-gtm-outbound/references/Clay Personalization & Sequencing on Lemlist.md` | ⏳ | pending |
| 4465 | `apps/gtm/.agents/skills/clay-gtm-outbound/references/Clay Signals.md` | ⏳ | pending |
| 4466 | `apps/gtm/.agents/skills/clay-gtm-outbound/references/Outbound Email Frameworks & Templates.md` | ⏳ | pending |
| 4467 | `apps/gtm/.agents/skills/clay-gtm-outbound/references/Prospecting with Clay.md` | ⏳ | pending |
| 4468 | `apps/gtm/.agents/skills/clay-gtm-outbound/references/Saving Clay Credits.md` | ⏳ | pending |
| 4469 | `apps/gtm/.agents/skills/cold-email/SKILL.md` | ⏳ | pending |
| 4470 | `apps/gtm/.agents/skills/cold-email/evals/evals.json` | ⏳ | pending |
| 4471 | `apps/gtm/.agents/skills/cold-email/references/benchmarks.md` | ⏳ | pending |
| 4472 | `apps/gtm/.agents/skills/cold-email/references/follow-up-sequences.md` | ⏳ | pending |
| 4473 | `apps/gtm/.agents/skills/cold-email/references/frameworks.md` | ⏳ | pending |
| 4474 | `apps/gtm/.agents/skills/cold-email/references/personalization.md` | ⏳ | pending |
| 4475 | `apps/gtm/.agents/skills/cold-email/references/subject-lines.md` | ⏳ | pending |
| 4476 | `apps/gtm/.agents/skills/competitive-ads-extractor/SKILL.md` | ⏳ | pending |
| 4477 | `apps/gtm/.agents/skills/competitor-alternatives/SKILL.md` | ⏳ | pending |
| 4478 | `apps/gtm/.agents/skills/competitor-alternatives/evals/evals.json` | ⏳ | pending |
| 4479 | `apps/gtm/.agents/skills/competitor-alternatives/references/content-architecture.md` | ⏳ | pending |
| 4480 | `apps/gtm/.agents/skills/competitor-alternatives/references/templates.md` | ⏳ | pending |
| 4481 | `apps/gtm/.agents/skills/content-research-writer/SKILL.md` | ⏳ | pending |
| 4482 | `apps/gtm/.agents/skills/content-strategy/SKILL.md` | ⏳ | pending |
| 4483 | `apps/gtm/.agents/skills/content-strategy/evals/evals.json` | ⏳ | pending |
| 4484 | `apps/gtm/.agents/skills/content-strategy/references/headless-cms.md` | ⏳ | pending |
| 4485 | `apps/gtm/.agents/skills/copy-anatomy/SKILL.md` | ⏳ | pending |
| 4486 | `apps/gtm/.agents/skills/copy-editing/SKILL.md` | ⏳ | pending |
| 4487 | `apps/gtm/.agents/skills/copy-editing/evals/evals.json` | ⏳ | pending |
| 4488 | `apps/gtm/.agents/skills/copy-editing/references/plain-english-alternatives.md` | ⏳ | pending |
| 4489 | `apps/gtm/.agents/skills/copywriting/SKILL.md` | ⏳ | pending |
| 4490 | `apps/gtm/.agents/skills/copywriting/evals/evals.json` | ⏳ | pending |
| 4491 | `apps/gtm/.agents/skills/copywriting/references/copy-frameworks.md` | ⏳ | pending |
| 4492 | `apps/gtm/.agents/skills/copywriting/references/natural-transitions.md` | ⏳ | pending |
| 4493 | `apps/gtm/.agents/skills/customer-research/SKILL.md` | ⏳ | pending |
| 4494 | `apps/gtm/.agents/skills/customer-research/evals/evals.json` | ⏳ | pending |
| 4495 | `apps/gtm/.agents/skills/customer-research/references/source-guides.md` | ⏳ | pending |
| 4496 | `apps/gtm/.agents/skills/customer-segments/SKILL.md` | ⏳ | pending |
| 4497 | `apps/gtm/.agents/skills/email-sequence/SKILL.md` | ⏳ | pending |
| 4498 | `apps/gtm/.agents/skills/email-sequence/evals/evals.json` | ⏳ | pending |
| 4499 | `apps/gtm/.agents/skills/email-sequence/references/copy-guidelines.md` | ⏳ | pending |
| 4500 | `apps/gtm/.agents/skills/email-sequence/references/email-types.md` | ⏳ | pending |
| 4501 | `apps/gtm/.agents/skills/email-sequence/references/sequence-templates.md` | ⏳ | pending |
| 4502 | `apps/gtm/.agents/skills/emailoctopus-automation/SKILL.md` | ⏳ | pending |
| 4503 | `apps/gtm/.agents/skills/experimentation/SKILL.md` | ⏳ | pending |
| 4504 | `apps/gtm/.agents/skills/experimentation/references/experiment-framework.md` | ⏳ | pending |
| 4505 | `apps/gtm/.agents/skills/experimentation/references/experiment-tracking-template.md` | ⏳ | pending |
| 4506 | `apps/gtm/.agents/skills/facebook-automation/SKILL.md` | ⏳ | pending |
| 4507 | `apps/gtm/.agents/skills/form-cro/SKILL.md` | ⏳ | pending |
| 4508 | `apps/gtm/.agents/skills/form-cro/evals/evals.json` | ⏳ | pending |
| 4509 | `apps/gtm/.agents/skills/free-tool-strategy/SKILL.md` | ⏳ | pending |
| 4510 | `apps/gtm/.agents/skills/free-tool-strategy/evals/evals.json` | ⏳ | pending |
| 4511 | `apps/gtm/.agents/skills/free-tool-strategy/references/tool-types.md` | ⏳ | pending |
| 4512 | `apps/gtm/.agents/skills/googleads-automation/SKILL.md` | ⏳ | pending |
| 4513 | `apps/gtm/.agents/skills/googledocs-automation/SKILL.md` | ⏳ | pending |
| 4514 | `apps/gtm/.agents/skills/gumroad-automation/SKILL.md` | ⏳ | pending |
| 4515 | `apps/gtm/.agents/skills/hashnode-automation/SKILL.md` | ⏳ | pending |
| 4516 | `apps/gtm/.agents/skills/heyreach-automation/SKILL.md` | ⏳ | pending |
| 4517 | `apps/gtm/.agents/skills/hunter-automation/SKILL.md` | ⏳ | pending |
| 4518 | `apps/gtm/.agents/skills/icp-persona/SKILL.md` | ⏳ | pending |
| 4519 | `apps/gtm/.agents/skills/icp-persona/references/b2b-buyer-persona-template.md` | ⏳ | pending |
| 4520 | `apps/gtm/.agents/skills/icp-persona/references/b2b-icp-template.md` | ⏳ | pending |
| 4521 | `apps/gtm/.agents/skills/icp-persona/references/b2b-user-persona-template.md` | ⏳ | pending |
| 4522 | `apps/gtm/.agents/skills/icp-persona/references/b2c-user-persona-template.md` | ⏳ | pending |
| 4523 | `apps/gtm/.agents/skills/instantly-automation/SKILL.md` | ⏳ | pending |
| 4524 | `apps/gtm/.agents/skills/kit-automation/SKILL.md` | ⏳ | pending |
| 4525 | `apps/gtm/.agents/skills/landing-page/SKILL.md` | ⏳ | pending |
| 4526 | `apps/gtm/.agents/skills/landing-page/references/landing-page-framework.md` | ⏳ | pending |
| 4527 | `apps/gtm/.agents/skills/launch-strategy/SKILL.md` | ⏳ | pending |
| 4528 | `apps/gtm/.agents/skills/launch-strategy/evals/evals.json` | ⏳ | pending |
| 4529 | `apps/gtm/.agents/skills/lead-magnets/SKILL.md` | ⏳ | pending |
| 4530 | `apps/gtm/.agents/skills/lead-magnets/references/benchmarks.md` | ⏳ | pending |
| 4531 | `apps/gtm/.agents/skills/lead-magnets/references/format-guide.md` | ⏳ | pending |
| 4532 | `apps/gtm/.agents/skills/lead-research-assistant/SKILL.md` | ⏳ | pending |
| 4533 | `apps/gtm/.agents/skills/lemlist-automation/SKILL.md` | ⏳ | pending |
| 4534 | `apps/gtm/.agents/skills/lifecycle-marketing-campaigns/SKILL.md` | ⏳ | pending |
| 4535 | `apps/gtm/.agents/skills/lifecycle-marketing-campaigns/references/campaign-examples.md` | ⏳ | pending |
| 4536 | `apps/gtm/.agents/skills/marketing-advantages/SKILL.md` | ⏳ | pending |
| 4537 | `apps/gtm/.agents/skills/marketing-ideas/SKILL.md` | ⏳ | pending |
| 4538 | `apps/gtm/.agents/skills/marketing-ideas/evals/evals.json` | ⏳ | pending |
| 4539 | `apps/gtm/.agents/skills/marketing-ideas/references/ideas-by-category.md` | ⏳ | pending |
| 4540 | `apps/gtm/.agents/skills/marketing-product-ideas/SKILL.md` | ⏳ | pending |
| 4541 | `apps/gtm/.agents/skills/marketing-product-ideas/references/Marketing Laws, Principles & Mental Models.md` | ⏳ | pending |
| 4542 | `apps/gtm/.agents/skills/marketing-product-ideas/references/Top of Funnel Awareness Experiments.md` | ⏳ | pending |
| 4543 | `apps/gtm/.agents/skills/marketing-product-ideas/references/Trial to Paid Conversion Experiments.md` | ⏳ | pending |
| 4544 | `apps/gtm/.agents/skills/marketing-psychology/SKILL.md` | ⏳ | pending |
| 4545 | `apps/gtm/.agents/skills/marketing-psychology/evals/evals.json` | ⏳ | pending |
| 4546 | `apps/gtm/.agents/skills/metaads-automation/SKILL.md` | ⏳ | pending |
| 4547 | `apps/gtm/.agents/skills/n8n-automation/SKILL.md` | ⏳ | pending |
| 4548 | `apps/gtm/.agents/skills/n8n-automation/references/n8n-ai-agent-prompt-formula.md` | ⏳ | pending |
| 4549 | `apps/gtm/.agents/skills/n8n-automation/references/n8n-build-example-joke-email.md` | ⏳ | pending |
| 4550 | `apps/gtm/.agents/skills/n8n-automation/references/n8n-build-example-weather-alert.md` | ⏳ | pending |
| 4551 | `apps/gtm/.agents/skills/n8n-automation/references/n8n-nodes-masterlist.md` | ⏳ | pending |
| 4552 | `apps/gtm/.agents/skills/n8n-automation/references/n8n-workflow-automation-guide.md` | ⏳ | pending |
| 4553 | `apps/gtm/.agents/skills/omnisend-automation/SKILL.md` | ⏳ | pending |
| 4554 | `apps/gtm/.agents/skills/onboarding-cro/SKILL.md` | ⏳ | pending |
| 4555 | `apps/gtm/.agents/skills/onboarding-cro/evals/evals.json` | ⏳ | pending |
| 4556 | `apps/gtm/.agents/skills/onboarding-cro/references/experiments.md` | ⏳ | pending |
| 4557 | `apps/gtm/.agents/skills/openai-automation/SKILL.md` | ⏳ | pending |
| 4558 | `apps/gtm/.agents/skills/openclaw/SKILL.md` | ⏳ | pending |
| 4559 | `apps/gtm/.agents/skills/openclaw/references/openclaw-overview.md` | ⏳ | pending |
| 4560 | `apps/gtm/.agents/skills/openclaw/references/workflow-engineering.md` | ⏳ | pending |
| 4561 | `apps/gtm/.agents/skills/page-cro/SKILL.md` | ⏳ | pending |
| 4562 | `apps/gtm/.agents/skills/page-cro/evals/evals.json` | ⏳ | pending |
| 4563 | `apps/gtm/.agents/skills/page-cro/references/experiments.md` | ⏳ | pending |
| 4564 | `apps/gtm/.agents/skills/paid-ads/SKILL.md` | ⏳ | pending |
| 4565 | `apps/gtm/.agents/skills/paid-ads/evals/evals.json` | ⏳ | pending |
| 4566 | `apps/gtm/.agents/skills/paid-ads/references/ad-copy-templates.md` | ⏳ | pending |
| 4567 | `apps/gtm/.agents/skills/paid-ads/references/audience-targeting.md` | ⏳ | pending |
| 4568 | `apps/gtm/.agents/skills/paid-ads/references/platform-setup-checklists.md` | ⏳ | pending |
| 4569 | `apps/gtm/.agents/skills/paywall-upgrade-cro/SKILL.md` | ⏳ | pending |
| 4570 | `apps/gtm/.agents/skills/paywall-upgrade-cro/evals/evals.json` | ⏳ | pending |
| 4571 | `apps/gtm/.agents/skills/paywall-upgrade-cro/references/experiments.md` | ⏳ | pending |
| 4572 | `apps/gtm/.agents/skills/performance-marketing/SKILL.md` | ⏳ | pending |
| 4573 | `apps/gtm/.agents/skills/performance-marketing/references/operating-checklist.md` | ⏳ | pending |
| 4574 | `apps/gtm/.agents/skills/performance-marketing/references/performance-marketing-playbook.md` | ⏳ | pending |
| 4575 | `apps/gtm/.agents/skills/perplexityai-automation/SKILL.md` | ⏳ | pending |
| 4576 | `apps/gtm/.agents/skills/phantombuster-automation/SKILL.md` | ⏳ | pending |
| 4577 | `apps/gtm/.agents/skills/popup-cro/SKILL.md` | ⏳ | pending |
| 4578 | `apps/gtm/.agents/skills/popup-cro/evals/evals.json` | ⏳ | pending |
| 4579 | `apps/gtm/.agents/skills/press-release/SKILL.md` | ⏳ | pending |
| 4580 | `apps/gtm/.agents/skills/press-release/references/press-release-templates.md` | ⏳ | pending |
| 4581 | `apps/gtm/.agents/skills/pricing-strategy/SKILL.md` | ⏳ | pending |
| 4582 | `apps/gtm/.agents/skills/pricing-strategy/evals/evals.json` | ⏳ | pending |
| 4583 | `apps/gtm/.agents/skills/pricing-strategy/references/research-methods.md` | ⏳ | pending |
| 4584 | `apps/gtm/.agents/skills/pricing-strategy/references/tier-structure.md` | ⏳ | pending |
| 4585 | `apps/gtm/.agents/skills/product-launch-gtm/SKILL.md` | ⏳ | pending |
| 4586 | `apps/gtm/.agents/skills/product-launch-gtm/references/Product Launch & GTM Assistant.md` | ⏳ | pending |
| 4587 | `apps/gtm/.agents/skills/product-launch-gtm/references/Product Launch Plan & GTM Channel Template _ James Praise x MIA - Product Launch Plan & Channels.md` | ⏳ | pending |
| 4588 | `apps/gtm/.agents/skills/product-launch-gtm/references/Product Launch Plan & GTM Channel Template _ James Praise x MIA - Product Launch Tasks.md` | ⏳ | pending |
| 4589 | `apps/gtm/.agents/skills/product-marketing-context/SKILL.md` | ⏳ | pending |
| 4590 | `apps/gtm/.agents/skills/product-marketing-context/evals/evals.json` | ⏳ | pending |
| 4591 | `apps/gtm/.agents/skills/product-messaging/SKILL.md` | ⏳ | pending |
| 4592 | `apps/gtm/.agents/skills/product-messaging/references/messaging-example-mia.md` | ⏳ | pending |
| 4593 | `apps/gtm/.agents/skills/product-onboarding-activation/SKILL.md` | ⏳ | pending |
| 4594 | `apps/gtm/.agents/skills/product-positioning/SKILL.md` | ⏳ | pending |
| 4595 | `apps/gtm/.agents/skills/product-positioning/references/positioning-example-mia.md` | ⏳ | pending |
| 4596 | `apps/gtm/.agents/skills/programmatic-seo/SKILL.md` | ⏳ | pending |
| 4597 | `apps/gtm/.agents/skills/programmatic-seo/evals/evals.json` | ⏳ | pending |
| 4598 | `apps/gtm/.agents/skills/programmatic-seo/references/playbooks.md` | ⏳ | pending |
| 4599 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/.claude-plugin/marketplace.json` | ⏳ | pending |
| 4600 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/.claude-plugin/plugin.json` | ⏳ | pending |
| 4601 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/.gitignore` | ⏳ | pending |
| 4602 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/AGENTS.md` | ⏳ | pending |
| 4603 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/README.md` | ⏳ | pending |
| 4604 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/commands/ralph-cancel.md` | ⏳ | pending |
| 4605 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/commands/ralph-init.md` | ⏳ | pending |
| 4606 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/commands/ralph-marketer.md` | ⏳ | pending |
| 4607 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/commands/ralph-status.md` | ⏳ | pending |
| 4608 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/hooks/hooks.json` | ⏳ | pending |
| 4609 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/hooks/stop-hook.sh` | ⏳ | pending |
| 4610 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/package.json` | ⏳ | pending |
| 4611 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/scripts/src/db/init.js` | ⏳ | pending |
| 4612 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/scripts/src/db/query.js` | ⏳ | pending |
| 4613 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/scripts/src/db/seed.js` | ⏳ | pending |
| 4614 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/scripts/src/db/status.js` | ⏳ | pending |
| 4615 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/scripts/src/test.js` | ⏳ | pending |
| 4616 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/skills/copywriter/SKILL.md` | ⏳ | pending |
| 4617 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/templates/package.json` | ⏳ | pending |
| 4618 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/templates/prd.json` | ⏳ | pending |
| 4619 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/templates/progress.txt` | ⏳ | pending |
| 4620 | `apps/gtm/.agents/skills/ralph-wiggum-marketer/templates/prompt.md` | ⏳ | pending |
| 4621 | `apps/gtm/.agents/skills/referral-program/SKILL.md` | ⏳ | pending |
| 4622 | `apps/gtm/.agents/skills/referral-program/evals/evals.json` | ⏳ | pending |
| 4623 | `apps/gtm/.agents/skills/referral-program/references/affiliate-programs.md` | ⏳ | pending |
| 4624 | `apps/gtm/.agents/skills/referral-program/references/program-examples.md` | ⏳ | pending |
| 4625 | `apps/gtm/.agents/skills/remotion/SKILL.md` | ⏳ | pending |
| 4626 | `apps/gtm/.agents/skills/remotion/references/concept-catalog.md` | ⏳ | pending |
| 4627 | `apps/gtm/.agents/skills/remotion/references/video-creation-process.md` | ⏳ | pending |
| 4628 | `apps/gtm/.agents/skills/remotion/rules/3d.md` | ⏳ | pending |
| 4629 | `apps/gtm/.agents/skills/remotion/rules/animations.md` | ⏳ | pending |
| 4630 | `apps/gtm/.agents/skills/remotion/rules/assets.md` | ⏳ | pending |
| 4631 | `apps/gtm/.agents/skills/remotion/rules/assets/charts-bar-chart.tsx` | ⏳ | pending |
| 4632 | `apps/gtm/.agents/skills/remotion/rules/assets/text-animations-typewriter.tsx` | ⏳ | pending |
| 4633 | `apps/gtm/.agents/skills/remotion/rules/assets/text-animations-word-highlight.tsx` | ⏳ | pending |
| 4634 | `apps/gtm/.agents/skills/remotion/rules/audio.md` | ⏳ | pending |
| 4635 | `apps/gtm/.agents/skills/remotion/rules/calculate-metadata.md` | ⏳ | pending |
| 4636 | `apps/gtm/.agents/skills/remotion/rules/can-decode.md` | ⏳ | pending |
| 4637 | `apps/gtm/.agents/skills/remotion/rules/charts.md` | ⏳ | pending |
| 4638 | `apps/gtm/.agents/skills/remotion/rules/compositions.md` | ⏳ | pending |
| 4639 | `apps/gtm/.agents/skills/remotion/rules/display-captions.md` | ⏳ | pending |
| 4640 | `apps/gtm/.agents/skills/remotion/rules/extract-frames.md` | ⏳ | pending |
| 4641 | `apps/gtm/.agents/skills/remotion/rules/fonts.md` | ⏳ | pending |
| 4642 | `apps/gtm/.agents/skills/remotion/rules/get-audio-duration.md` | ⏳ | pending |
| 4643 | `apps/gtm/.agents/skills/remotion/rules/get-video-dimensions.md` | ⏳ | pending |
| 4644 | `apps/gtm/.agents/skills/remotion/rules/get-video-duration.md` | ⏳ | pending |
| 4645 | `apps/gtm/.agents/skills/remotion/rules/gifs.md` | ⏳ | pending |
| 4646 | `apps/gtm/.agents/skills/remotion/rules/images.md` | ⏳ | pending |
| 4647 | `apps/gtm/.agents/skills/remotion/rules/import-srt-captions.md` | ⏳ | pending |
| 4648 | `apps/gtm/.agents/skills/remotion/rules/lottie.md` | ⏳ | pending |
| 4649 | `apps/gtm/.agents/skills/remotion/rules/measuring-dom-nodes.md` | ⏳ | pending |
| 4650 | `apps/gtm/.agents/skills/remotion/rules/measuring-text.md` | ⏳ | pending |
| 4651 | `apps/gtm/.agents/skills/remotion/rules/sequencing.md` | ⏳ | pending |
| 4652 | `apps/gtm/.agents/skills/remotion/rules/tailwind.md` | ⏳ | pending |
| 4653 | `apps/gtm/.agents/skills/remotion/rules/text-animations.md` | ⏳ | pending |
| 4654 | `apps/gtm/.agents/skills/remotion/rules/timing.md` | ⏳ | pending |
| 4655 | `apps/gtm/.agents/skills/remotion/rules/transcribe-captions.md` | ⏳ | pending |
| 4656 | `apps/gtm/.agents/skills/remotion/rules/transitions.md` | ⏳ | pending |
| 4657 | `apps/gtm/.agents/skills/remotion/rules/trimming.md` | ⏳ | pending |
| 4658 | `apps/gtm/.agents/skills/remotion/rules/videos.md` | ⏳ | pending |
| 4659 | `apps/gtm/.agents/skills/reply-io-automation/SKILL.md` | ⏳ | pending |
| 4660 | `apps/gtm/.agents/skills/resend-automation/SKILL.md` | ⏳ | pending |
| 4661 | `apps/gtm/.agents/skills/revops/SKILL.md` | ⏳ | pending |
| 4662 | `apps/gtm/.agents/skills/revops/evals/evals.json` | ⏳ | pending |
| 4663 | `apps/gtm/.agents/skills/revops/references/automation-playbooks.md` | ⏳ | pending |
| 4664 | `apps/gtm/.agents/skills/revops/references/lifecycle-definitions.md` | ⏳ | pending |
| 4665 | `apps/gtm/.agents/skills/revops/references/routing-rules.md` | ⏳ | pending |
| 4666 | `apps/gtm/.agents/skills/revops/references/scoring-models.md` | ⏳ | pending |
| 4667 | `apps/gtm/.agents/skills/saas-landing-pages/SKILL.md` | ⏳ | pending |
| 4668 | `apps/gtm/.agents/skills/saas-landing-pages/references/page-frameworks.md` | ⏳ | pending |
| 4669 | `apps/gtm/.agents/skills/sales-enablement/SKILL.md` | ⏳ | pending |
| 4670 | `apps/gtm/.agents/skills/sales-enablement/evals/evals.json` | ⏳ | pending |
| 4671 | `apps/gtm/.agents/skills/sales-enablement/references/deck-frameworks.md` | ⏳ | pending |
| 4672 | `apps/gtm/.agents/skills/sales-enablement/references/demo-scripts.md` | ⏳ | pending |
| 4673 | `apps/gtm/.agents/skills/sales-enablement/references/objection-library.md` | ⏳ | pending |
| 4674 | `apps/gtm/.agents/skills/sales-enablement/references/one-pager-templates.md` | ⏳ | pending |
| 4675 | `apps/gtm/.agents/skills/schema-markup/SKILL.md` | ⏳ | pending |
| 4676 | `apps/gtm/.agents/skills/schema-markup/evals/evals.json` | ⏳ | pending |
| 4677 | `apps/gtm/.agents/skills/schema-markup/references/schema-examples.md` | ⏳ | pending |
| 4678 | `apps/gtm/.agents/skills/semrush-automation/SKILL.md` | ⏳ | pending |
| 4679 | `apps/gtm/.agents/skills/seo-audit/SKILL.md` | ⏳ | pending |
| 4680 | `apps/gtm/.agents/skills/seo-audit/evals/evals.json` | ⏳ | pending |
| 4681 | `apps/gtm/.agents/skills/seo-audit/references/ai-writing-detection.md` | ⏳ | pending |
| 4682 | `apps/gtm/.agents/skills/serpapi-automation/SKILL.md` | ⏳ | pending |
| 4683 | `apps/gtm/.agents/skills/signup-flow-cro/SKILL.md` | ⏳ | pending |
| 4684 | `apps/gtm/.agents/skills/signup-flow-cro/evals/evals.json` | ⏳ | pending |
| 4685 | `apps/gtm/.agents/skills/site-architecture/SKILL.md` | ⏳ | pending |
| 4686 | `apps/gtm/.agents/skills/site-architecture/evals/evals.json` | ⏳ | pending |
| 4687 | `apps/gtm/.agents/skills/site-architecture/references/mermaid-templates.md` | ⏳ | pending |
| 4688 | `apps/gtm/.agents/skills/site-architecture/references/navigation-patterns.md` | ⏳ | pending |
| 4689 | `apps/gtm/.agents/skills/site-architecture/references/site-type-templates.md` | ⏳ | pending |
| 4690 | `apps/gtm/.agents/skills/skill-to-prompt/SKILL.md` | ⏳ | pending |
| 4691 | `apps/gtm/.agents/skills/skill-to-prompt/references/AI Prompting Techniques.pdf` | ⏭️ | binary asset |
| 4692 | `apps/gtm/.agents/skills/skill-to-prompt/references/docx-generator.js` | ⏳ | pending |
| 4693 | `apps/gtm/.agents/skills/skill-to-prompt/references/prompt-structure-guide.md` | ⏳ | pending |
| 4694 | `apps/gtm/.agents/skills/slackbot-automation/SKILL.md` | ⏳ | pending |
| 4695 | `apps/gtm/.agents/skills/social-content/SKILL.md` | ⏳ | pending |
| 4696 | `apps/gtm/.agents/skills/social-content/evals/evals.json` | ⏳ | pending |
| 4697 | `apps/gtm/.agents/skills/social-content/references/platforms.md` | ⏳ | pending |
| 4698 | `apps/gtm/.agents/skills/social-content/references/post-templates.md` | ⏳ | pending |
| 4699 | `apps/gtm/.agents/skills/social-content/references/reverse-engineering.md` | ⏳ | pending |
| 4700 | `apps/gtm/.agents/skills/tailwindcss/SKILL.md` | ⏳ | pending |
| 4701 | `apps/gtm/.agents/skills/tailwindcss/resources/component-library.md` | ⏳ | pending |
| 4702 | `apps/gtm/.agents/skills/tailwindcss/resources/configuration.md` | ⏳ | pending |
| 4703 | `apps/gtm/.agents/skills/tailwindcss/resources/utility-patterns.md` | ⏳ | pending |
| 4704 | `apps/gtm/.agents/skills/tailwindcss/skill-rules-fragment.json` | ⏳ | pending |
| 4705 | `apps/gtm/.agents/skills/twitter-algorithm-optimizer/SKILL.md` | ⏳ | pending |
| 4706 | `apps/gtm/.agents/skills/typefully-automation/SKILL.md` | ⏳ | pending |
| 4707 | `apps/gtm/.agents/skills/typefully/CHANGELOG.md` | ⏳ | pending |
| 4708 | `apps/gtm/.agents/skills/typefully/SKILL.md` | ⏳ | pending |
| 4709 | `apps/gtm/.agents/skills/typefully/scripts/typefully.js` | ⏳ | pending |
| 4710 | `apps/gtm/.agents/skills/vibe-coding/SKILL.md` | ⏳ | pending |
| 4711 | `apps/gtm/.agents/skills/vibe-coding/references/claude-skills-guide.md` | ⏳ | pending |
| 4712 | `apps/gtm/.agents/skills/vibe-coding/references/web-dev-fundamentals.md` | ⏳ | pending |
| 4713 | `apps/gtm/.agents/skills/woodpecker-co-automation/SKILL.md` | ⏳ | pending |
| 4714 | `apps/gtm/.agents/skills/x-article-publisher/.claude-plugin/plugin.json` | ⏳ | pending |
| 4715 | `apps/gtm/.agents/skills/x-article-publisher/.gitignore` | ⏳ | pending |
| 4716 | `apps/gtm/.agents/skills/x-article-publisher/LICENSE` | ⏳ | pending |
| 4717 | `apps/gtm/.agents/skills/x-article-publisher/README.md` | ⏳ | pending |
| 4718 | `apps/gtm/.agents/skills/x-article-publisher/README_CN.md` | ⏳ | pending |
| 4719 | `apps/gtm/.agents/skills/x-article-publisher/docs/GUIDE.md` | ⏳ | pending |
| 4720 | `apps/gtm/.agents/skills/x-article-publisher/skills/x-article-publisher/SKILL.md` | ⏳ | pending |
| 4721 | `apps/gtm/.agents/skills/x-article-publisher/skills/x-article-publisher/scripts/copy_to_clipboard.py` | ⏳ | pending |
| 4722 | `apps/gtm/.agents/skills/x-article-publisher/skills/x-article-publisher/scripts/parse_markdown.py` | ⏳ | pending |
| 4723 | `apps/gtm/.agents/skills/x-article-publisher/skills/x-article-publisher/scripts/table_to_image.py` | ⏳ | pending |
| 4724 | `apps/gtm/.claire/worktrees/naughty-mestorf/server/data/content/es/creator-track/webinar-challenge-funnels/lesson-3.md` | ⏳ | pending |
| 4725 | `apps/gtm/.dockerignore` | ⏳ | pending |
| 4726 | `apps/gtm/.env.example` | ⏳ | pending |
| 4727 | `apps/gtm/.gitignore` | ⏳ | pending |
| 4728 | `apps/gtm/.npmrc` | ⏳ | pending |
| 4729 | `apps/gtm/.nvmrc` | ⏳ | pending |
| 4730 | `apps/gtm/CLAUDE.md` | ⏳ | pending |
| 4731 | `apps/gtm/Dockerfile` | ⏳ | pending |
| 4732 | `apps/gtm/PLATFORM-ANALYSIS.md` | ⏳ | pending |
| 4733 | `apps/gtm/README.md` | ⏳ | pending |
| 4734 | `apps/gtm/SUCCESSION-BUSINESS-CONTEXT.md` | ⏳ | pending |
| 4735 | `apps/gtm/SUCCESSION-OPS-RUNBOOK.md` | ⏳ | pending |
| 4736 | `apps/gtm/_archive/3d-matrix/3d-matrix-integration.md` | ⏳ | pending |
| 4737 | `apps/gtm/_archive/3d-matrix/output/data/clientRoles.json` | ⏳ | pending |
| 4738 | `apps/gtm/_archive/3d-matrix/output/data/discPatterns.json` | ⏳ | pending |
| 4739 | `apps/gtm/_archive/3d-matrix/output/data/founderCategories.json` | ⏳ | pending |
| 4740 | `apps/gtm/_archive/3d-matrix/output/data/industries/agencies.json` | ⏳ | pending |
| 4741 | `apps/gtm/_archive/3d-matrix/output/data/industries/devtools.json` | ⏳ | pending |
| 4742 | `apps/gtm/_archive/3d-matrix/output/data/industries/ecommerce.json` | ⏳ | pending |
| 4743 | `apps/gtm/_archive/3d-matrix/output/data/industries/edtech.json` | ⏳ | pending |
| 4744 | `apps/gtm/_archive/3d-matrix/output/data/industries/fintech.json` | ⏳ | pending |
| 4745 | `apps/gtm/_archive/3d-matrix/output/data/industries/healthtech.json` | ⏳ | pending |
| 4746 | `apps/gtm/_archive/3d-matrix/output/data/industries/hr_recruiting.json` | ⏳ | pending |
| 4747 | `apps/gtm/_archive/3d-matrix/output/data/industries/manufacturing.json` | ⏳ | pending |
| 4748 | `apps/gtm/_archive/3d-matrix/output/data/industries/martech.json` | ⏳ | pending |
| 4749 | `apps/gtm/_archive/3d-matrix/output/data/industries/professional_services.json` | ⏳ | pending |
| 4750 | `apps/gtm/_archive/3d-matrix/output/data/industries/real_estate.json` | ⏳ | pending |
| 4751 | `apps/gtm/_archive/3d-matrix/output/data/industries/saas_startup.json` | ⏳ | pending |
| 4752 | `apps/gtm/_archive/3d-matrix/output/seed/seedFirestore.ts` | ⏳ | pending |
| 4753 | `apps/gtm/_archive/3d-matrix/output/types/ClientRole.ts` | ⏳ | pending |
| 4754 | `apps/gtm/_archive/3d-matrix/output/types/DiscPattern.ts` | ⏳ | pending |
| 4755 | `apps/gtm/_archive/3d-matrix/output/types/FounderCategory.ts` | ⏳ | pending |
| 4756 | `apps/gtm/_archive/3d-matrix/output/types/Industry.ts` | ⏳ | pending |
| 4757 | `apps/gtm/_archive/3d-matrix/output/types/index.ts` | ⏳ | pending |
| 4758 | `apps/gtm/_archive/genkit-flows/config.ts.bak` | ⏳ | pending |
| 4759 | `apps/gtm/_archive/genkit-flows/flows/assessmentGenerator.ts.bak` | ⏳ | pending |
| 4760 | `apps/gtm/_archive/genkit-flows/flows/coachingChat.ts.bak` | ⏳ | pending |
| 4761 | `apps/gtm/_archive/genkit-flows/flows/documentAnalyzer.ts.bak` | ⏳ | pending |
| 4762 | `apps/gtm/_archive/genkit-flows/flows/icpValidation.test.ts.bak` | ⏳ | pending |
| 4763 | `apps/gtm/_archive/genkit-flows/flows/icpValidation.ts.bak` | ⏳ | pending |
| 4764 | `apps/gtm/_archive/genkit-flows/flows/linkedinAnalyzer.ts.bak` | ⏳ | pending |
| 4765 | `apps/gtm/_archive/genkit-flows/flows/quizReflection.ts.bak` | ⏳ | pending |
| 4766 | `apps/gtm/_archive/genkit-flows/flows/ragIndexer.ts.bak` | ⏳ | pending |
| 4767 | `apps/gtm/_archive/genkit-flows/flows/salesRoleplay.ts.bak` | ⏳ | pending |
| 4768 | `apps/gtm/_archive/genkit-flows/flows/salesRoleplay3D.ts.bak` | ⏳ | pending |
| 4769 | `apps/gtm/_archive/genkit-flows/flows/salesRoleplayEval3D.ts.bak` | ⏳ | pending |
| 4770 | `apps/gtm/_archive/genkit-flows/flows/websiteAnalyzer.ts.bak` | ⏳ | pending |
| 4771 | `apps/gtm/_archive/genkit-flows/index.ts.bak` | ⏳ | pending |
| 4772 | `apps/gtm/_archive/genkit-flows/telemetry.test.ts.bak` | ⏳ | pending |
| 4773 | `apps/gtm/_archive/genkit-flows/telemetry.ts.bak` | ⏳ | pending |
| 4774 | `apps/gtm/_archive/genkit-flows/vertexIndexer.test.ts.bak` | ⏳ | pending |
| 4775 | `apps/gtm/_archive/genkit-flows/vertexIndexer.ts.bak` | ⏳ | pending |
| 4776 | `apps/gtm/_archive/genkit-flows/vertexRetriever.ts.bak` | ⏳ | pending |
| 4777 | `apps/gtm/_archive/lib/firebase/admin.ts` | ⏳ | pending |
| 4778 | `apps/gtm/_archive/lib/firebase/client.ts` | ⏳ | pending |
| 4779 | `apps/gtm/_archive/old-docs/2026-01-03-ARTIFACT-DIRECTORY.md` | ⏳ | pending |
| 4780 | `apps/gtm/_archive/old-docs/2026-01-03-E2E-AUDIT.md` | ⏳ | pending |
| 4781 | `apps/gtm/_archive/old-docs/2026-01-03-E2E-VERIFICATION-REPORT.md` | ⏳ | pending |
| 4782 | `apps/gtm/_archive/old-docs/2026-01-03-IMPLEMENTATION-PLAN.md` | ⏳ | pending |
| 4783 | `apps/gtm/_archive/old-docs/2026-01-03-MISSING-TESTIDS.md` | ⏳ | pending |
| 4784 | `apps/gtm/_archive/old-docs/2026-01-03-MOSAIC-SELECTORS.md` | ⏳ | pending |
| 4785 | `apps/gtm/_archive/old-docs/2026-01-03-ROUTE-MAP.md` | ⏳ | pending |
| 4786 | `apps/gtm/_archive/old-docs/2026-01-03-TEST-STATUS-DASHBOARD.md` | ⏳ | pending |
| 4787 | `apps/gtm/_archive/old-docs/2026-01-03-WALKTHROUGH.md` | ⏳ | pending |
| 4788 | `apps/gtm/_archive/old-docs/3d-roleplay-matrix-specification.md` | ⏳ | pending |
| 4789 | `apps/gtm/_archive/old-docs/AI-FLOW-VALIDATION-REPORT.md` | ⏳ | pending |
| 4790 | `apps/gtm/_archive/old-docs/AI_System_Architecture.md` | ⏳ | pending |
| 4791 | `apps/gtm/_archive/old-docs/ARCHITECTURAL-IMPROVEMENT-PLAN.md` | ⏳ | pending |
| 4792 | `apps/gtm/_archive/old-docs/CHANGELOG.md` | ⏳ | pending |
| 4793 | `apps/gtm/_archive/old-docs/CODE-AUDIT-REPORT.md` | ⏳ | pending |
| 4794 | `apps/gtm/_archive/old-docs/CONTENT-AUDIT-REPORT.md` | ⏳ | pending |
| 4795 | `apps/gtm/_archive/old-docs/CONTENT_INVENTORY_REPORT_2025-01-13.md` | ⏳ | pending |
| 4796 | `apps/gtm/_archive/old-docs/DEPLOY.md` | ⏳ | pending |
| 4797 | `apps/gtm/_archive/old-docs/LESSON_CREATION_PROTOCOL.md` | ⏳ | pending |
| 4798 | `apps/gtm/_archive/old-docs/LOAD-TESTING.md` | ⏳ | pending |
| 4799 | `apps/gtm/_archive/old-docs/RESEARCH_GAP_ANALYSIS_2025-01-13.md` | ⏳ | pending |
| 4800 | `apps/gtm/_archive/old-docs/Revised-curriculum.md` | ⏳ | pending |
| 4801 | `apps/gtm/_archive/old-docs/SoloFrameHub Cohort Forum Design: Research Report v2.md` | ⏳ | pending |
| 4802 | `apps/gtm/_archive/old-docs/TEST-PLAN.md` | ⏳ | pending |
| 4803 | `apps/gtm/_archive/old-docs/TESTING.md` | ⏳ | pending |
| 4804 | `apps/gtm/_archive/old-docs/_archive/MULTIDIMENSIONAL-TEST-PLAN.md` | ⏳ | pending |
| 4805 | `apps/gtm/_archive/old-docs/_archive/QC_CHECKLIST.md` | ⏳ | pending |
| 4806 | `apps/gtm/_archive/old-docs/_archive/TESTING-STATUS.md` | ⏳ | pending |
| 4807 | `apps/gtm/_archive/old-docs/_archive/legacy-e2e-reports/E2E-FINAL-SUMMARY.md` | ⏳ | pending |
| 4808 | `apps/gtm/_archive/old-docs/_archive/legacy-e2e-reports/E2E-OPTION-2-IMPLEMENTATION.md` | ⏳ | pending |
| 4809 | `apps/gtm/_archive/old-docs/_archive/legacy-e2e-reports/E2E-ROOT-CAUSE-ANALYSIS.md` | ⏳ | pending |
| 4810 | `apps/gtm/_archive/old-docs/_archive/legacy-e2e-reports/E2E-TEST-FIXES-FINAL.md` | ⏳ | pending |
| 4811 | `apps/gtm/_archive/old-docs/_archive/legacy-e2e-reports/E2E-TEST-FIXES-STATUS.md` | ⏳ | pending |
| 4812 | `apps/gtm/_archive/old-docs/_archive/legacy-e2e-reports/E2E-TEST-FIXES.md` | ⏳ | pending |
| 4813 | `apps/gtm/_archive/old-docs/_archive/legacy-e2e-reports/E2E-TEST-REPORT.md` | ⏳ | pending |
| 4814 | `apps/gtm/_archive/old-docs/_archive/legacy-e2e-reports/E2E-TEST-RUN-RESULTS.md` | ⏳ | pending |
| 4815 | `apps/gtm/_archive/old-docs/_archive/legacy-e2e-reports/E2E-TEST-SUMMARY.md` | ⏳ | pending |
| 4816 | `apps/gtm/_archive/old-docs/_archive/legacy-e2e-reports/E2E-TESTING-SUMMARY.md` | ⏳ | pending |
| 4817 | `apps/gtm/_archive/old-docs/_archive/legacy-e2e-reports/E2E-TESTING.md` | ⏳ | pending |
| 4818 | `apps/gtm/_archive/old-docs/_archive/legacy-e2e-reports/MIGRATION-SUMMARY.md` | ⏳ | pending |
| 4819 | `apps/gtm/_archive/old-docs/_archive/legacy-e2e-reports/analyze-test-failures.sh` | ⏳ | pending |
| 4820 | `apps/gtm/_archive/old-docs/_archive/scripts_legacy/download-icons.js` | ⏳ | pending |
| 4821 | `apps/gtm/_archive/old-docs/_archive/scripts_legacy/migrate-icons.js` | ⏳ | pending |
| 4822 | `apps/gtm/_archive/old-docs/_archive/scripts_legacy/public/assets/icons/sprite.svg` | ⏭️ | binary asset |
| 4823 | `apps/gtm/_archive/old-docs/_archive/scripts_legacy/validate-quizzes.js` | ⏳ | pending |
| 4824 | `apps/gtm/_archive/old-docs/antigravity-platform-page-improvements.md` | ⏳ | pending |
| 4825 | `apps/gtm/_archive/old-docs/cohort-forum-strategy.md` | ⏳ | pending |
| 4826 | `apps/gtm/_archive/old-docs/competitive-analysis-action-plan-2026-03-27.md` | ⏳ | pending |
| 4827 | `apps/gtm/_archive/old-docs/continuation_prompt.md` | ⏳ | pending |
| 4828 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/Course 4 - Bootstrap Marketing Foundations.md` | ⏳ | pending |
| 4829 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/Course 5: Brand Creation & Positioning.md` | ⏳ | pending |
| 4830 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/Course_00_Sales_Psychology.md` | ⏳ | pending |
| 4831 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/Course_01_ICP_Builder_Workshop.md` | ⏳ | pending |
| 4832 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/Course_02_Positioning & Value Proposition.md` | ⏳ | pending |
| 4833 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/Course_04_List_Building_Prospecting_Infrastructure.md` | ⏳ | pending |
| 4834 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/Course_08_Cold_Email_Mastery.md` | ⏳ | pending |
| 4835 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/Course_13_DISC_Buyer_Personas.md` | ⏳ | pending |
| 4836 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/Course_14_Discovery_Framework_BANT_MEDDIC.md` | ⏳ | pending |
| 4837 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/Course_15_Discovery_Call_Simulations.md` | ⏳ | pending |
| 4838 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/Course_17_Objection_Handling_Database.md` | ⏳ | pending |
| 4839 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/Curriculum.md` | ⏳ | pending |
| 4840 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/course-context-fles/00-QUICK-START.md` | ⏳ | pending |
| 4841 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/course-context-fles/01-TECHNICAL-ARCHITECTURE.md` | ⏳ | pending |
| 4842 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/course-context-fles/02-DESIGN-SYSTEM.md` | ⏳ | pending |
| 4843 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/course-context-fles/03-DATABASE-SCHEMA.md` | ⏳ | pending |
| 4844 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/course-context-fles/04-MODULE-ARCHITECTURE.md` | ⏳ | pending |
| 4845 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/course-context-fles/05-AI-FLOWS-LIBRARY.md` | ⏳ | pending |
| 4846 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/course-context-fles/06-INTERACTIVE-COMPONENTS.md` | ⏳ | pending |
| 4847 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/course-context-fles/07-PEDAGOGICAL-PATTERNS.md` | ⏳ | pending |
| 4848 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/course-context-fles/08-CURSOR-PROMPTS.md` | ⏳ | pending |
| 4849 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/course-context-fles/09-CONTENT-GENERATION.md` | ⏳ | pending |
| 4850 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/course-context-fles/10-GAMIFICATION-SYSTEM.md` | ⏳ | pending |
| 4851 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/course-context-fles/11-DEPLOYMENT-GUIDE.md` | ⏳ | pending |
| 4852 | `apps/gtm/_archive/old-docs/course-creation-context-and-prompts/course-context-fles/Bootstrap Marketing curriculum for solo technical founders.md` | ⏳ | pending |
| 4853 | `apps/gtm/_archive/old-docs/course_migration_guide.md` | ⏳ | pending |
| 4854 | `apps/gtm/_archive/old-docs/creator-economy-gap-analysis.md` | ⏳ | pending |
| 4855 | `apps/gtm/_archive/old-docs/error-log.md` | ⏳ | pending |
| 4856 | `apps/gtm/_archive/old-docs/gemini-model-comparison.md` | ⏳ | pending |
| 4857 | `apps/gtm/_archive/old-docs/mosaic-next/.gitignore` | ⏳ | pending |
| 4858 | `apps/gtm/_archive/old-docs/mosaic-next/CHANGELOG.md` | ⏳ | pending |
| 4859 | `apps/gtm/_archive/old-docs/mosaic-next/README.md` | ⏳ | pending |
| 4860 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/accordion/page.tsx` | ⏳ | pending |
| 4861 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/alert/banners-01.tsx` | ⏳ | pending |
| 4862 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/alert/banners-02.tsx` | ⏳ | pending |
| 4863 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/alert/notifications.tsx` | ⏳ | pending |
| 4864 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/alert/page.tsx` | ⏳ | pending |
| 4865 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/alert/toasts-01.tsx` | ⏳ | pending |
| 4866 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/alert/toasts-02.tsx` | ⏳ | pending |
| 4867 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/alert/toasts-03.tsx` | ⏳ | pending |
| 4868 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/avatar/page.tsx` | ⏳ | pending |
| 4869 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/badge/page.tsx` | ⏳ | pending |
| 4870 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/breadcrumb/page.tsx` | ⏳ | pending |
| 4871 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/button/page.tsx` | ⏳ | pending |
| 4872 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/dropdown/page.tsx` | ⏳ | pending |
| 4873 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/form/form-switches.tsx` | ⏳ | pending |
| 4874 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/form/page.tsx` | ⏳ | pending |
| 4875 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/icons/page.tsx` | ⏳ | pending |
| 4876 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/modal/basic-examples.tsx` | ⏳ | pending |
| 4877 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/modal/feedback-examples.tsx` | ⏳ | pending |
| 4878 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/modal/page.tsx` | ⏳ | pending |
| 4879 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/modal/product-examples.tsx` | ⏳ | pending |
| 4880 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/pagination/page.tsx` | ⏳ | pending |
| 4881 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/tabs/page.tsx` | ⏳ | pending |
| 4882 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/components-library/tooltip/page.tsx` | ⏳ | pending |
| 4883 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/finance/cards/page.tsx` | ⏳ | pending |
| 4884 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/finance/transactions/page.tsx` | ⏳ | pending |
| 4885 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/finance/transactions/transaction-context.tsx` | ⏳ | pending |
| 4886 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/finance/transactions/transaction-dropdown.tsx` | ⏳ | pending |
| 4887 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/finance/transactions/transaction-panel.tsx` | ⏳ | pending |
| 4888 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/finance/transactions/transactions-properties.tsx` | ⏳ | pending |
| 4889 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/finance/transactions/transactions-table-item.tsx` | ⏳ | pending |
| 4890 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/finance/transactions/transactions-table.tsx` | ⏳ | pending |
| 4891 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/layout.tsx` | ⏳ | pending |
| 4892 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/utility/404/page.tsx` | ⏳ | pending |
| 4893 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/utility/changelog/page.tsx` | ⏳ | pending |
| 4894 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/utility/empty-state/page.tsx` | ⏳ | pending |
| 4895 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/utility/faqs/page.tsx` | ⏳ | pending |
| 4896 | `apps/gtm/_archive/old-docs/mosaic-next/app/(alternative)/utility/roadmap/page.tsx` | ⏳ | pending |
| 4897 | `apps/gtm/_archive/old-docs/mosaic-next/app/(auth)/auth-header.tsx` | ⏳ | pending |
| 4898 | `apps/gtm/_archive/old-docs/mosaic-next/app/(auth)/auth-image.tsx` | ⏳ | pending |
| 4899 | `apps/gtm/_archive/old-docs/mosaic-next/app/(auth)/reset-password/page.tsx` | ⏳ | pending |
| 4900 | `apps/gtm/_archive/old-docs/mosaic-next/app/(auth)/signin/page.tsx` | ⏳ | pending |
| 4901 | `apps/gtm/_archive/old-docs/mosaic-next/app/(auth)/signup/page.tsx` | ⏳ | pending |
| 4902 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/calendar/calendar-context.tsx` | ⏳ | pending |
| 4903 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/calendar/calendar-navigation.tsx` | ⏳ | pending |
| 4904 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/calendar/calendar-properties.tsx` | ⏳ | pending |
| 4905 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/calendar/calendar-table.tsx` | ⏳ | pending |
| 4906 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/calendar/page.tsx` | ⏳ | pending |
| 4907 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/calendar/title.tsx` | ⏳ | pending |
| 4908 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/campaigns/campaign-card.tsx` | ⏳ | pending |
| 4909 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/campaigns/campaigns-properties.tsx` | ⏳ | pending |
| 4910 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/campaigns/page.tsx` | ⏳ | pending |
| 4911 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/feed/feed-left-content.tsx` | ⏳ | pending |
| 4912 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/feed/feed-posts.tsx` | ⏳ | pending |
| 4913 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/feed/feed-right-content.tsx` | ⏳ | pending |
| 4914 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/feed/page.tsx` | ⏳ | pending |
| 4915 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/forum/forum-entries.tsx` | ⏳ | pending |
| 4916 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/forum/forum-left-content.tsx` | ⏳ | pending |
| 4917 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/forum/forum-right-content.tsx` | ⏳ | pending |
| 4918 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/forum/page.tsx` | ⏳ | pending |
| 4919 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/forum/post/forum-entry.tsx` | ⏳ | pending |
| 4920 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/forum/post/forum-post-right-content.tsx` | ⏳ | pending |
| 4921 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/forum/post/page.tsx` | ⏳ | pending |
| 4922 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/meetups/meetups-posts.tsx` | ⏳ | pending |
| 4923 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/meetups/page.tsx` | ⏳ | pending |
| 4924 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/meetups/post/page.tsx` | ⏳ | pending |
| 4925 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/tab-card.tsx` | ⏳ | pending |
| 4926 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/tile-card.tsx` | ⏳ | pending |
| 4927 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/users-tabs/page.tsx` | ⏳ | pending |
| 4928 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/community/users-tiles/page.tsx` | ⏳ | pending |
| 4929 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-01.tsx` | ⏳ | pending |
| 4930 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-02.tsx` | ⏳ | pending |
| 4931 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-03.tsx` | ⏳ | pending |
| 4932 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-04.tsx` | ⏳ | pending |
| 4933 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-05.tsx` | ⏳ | pending |
| 4934 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-06.tsx` | ⏳ | pending |
| 4935 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-07.tsx` | ⏳ | pending |
| 4936 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-08.tsx` | ⏳ | pending |
| 4937 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-09.tsx` | ⏳ | pending |
| 4938 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-10.tsx` | ⏳ | pending |
| 4939 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/analytics/analytics-card-11.tsx` | ⏳ | pending |
| 4940 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/analytics/page.tsx` | ⏳ | pending |
| 4941 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/dashboard-card-01.tsx` | ⏳ | pending |
| 4942 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/dashboard-card-02.tsx` | ⏳ | pending |
| 4943 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/dashboard-card-03.tsx` | ⏳ | pending |
| 4944 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/dashboard-card-04.tsx` | ⏳ | pending |
| 4945 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/dashboard-card-05.tsx` | ⏳ | pending |
| 4946 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/dashboard-card-06.tsx` | ⏳ | pending |
| 4947 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/dashboard-card-07.tsx` | ⏳ | pending |
| 4948 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/dashboard-card-08.tsx` | ⏳ | pending |
| 4949 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/dashboard-card-09.tsx` | ⏳ | pending |
| 4950 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/dashboard-card-10.tsx` | ⏳ | pending |
| 4951 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/dashboard-card-11.tsx` | ⏳ | pending |
| 4952 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-01.tsx` | ⏳ | pending |
| 4953 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-02.tsx` | ⏳ | pending |
| 4954 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-03.tsx` | ⏳ | pending |
| 4955 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-04.tsx` | ⏳ | pending |
| 4956 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-05.tsx` | ⏳ | pending |
| 4957 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-06.tsx` | ⏳ | pending |
| 4958 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-07.tsx` | ⏳ | pending |
| 4959 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-08.tsx` | ⏳ | pending |
| 4960 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-09.tsx` | ⏳ | pending |
| 4961 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-10.tsx` | ⏳ | pending |
| 4962 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-11.tsx` | ⏳ | pending |
| 4963 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-12.tsx` | ⏳ | pending |
| 4964 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-13.tsx` | ⏳ | pending |
| 4965 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/fintech/fintech-card-14.tsx` | ⏳ | pending |
| 4966 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/fintech/fintech-intro.tsx` | ⏳ | pending |
| 4967 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/fintech/page.tsx` | ⏳ | pending |
| 4968 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/dashboard/page.tsx` | ⏳ | pending |
| 4969 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/(cart)/cart-2/page.tsx` | ⏳ | pending |
| 4970 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/(cart)/cart-3/page.tsx` | ⏳ | pending |
| 4971 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/(cart)/cart-items.tsx` | ⏳ | pending |
| 4972 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/(cart)/cart/page.tsx` | ⏳ | pending |
| 4973 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-2/page.tsx` | ⏳ | pending |
| 4974 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-cards-01.tsx` | ⏳ | pending |
| 4975 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-cards-02.tsx` | ⏳ | pending |
| 4976 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-cards-03.tsx` | ⏳ | pending |
| 4977 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-cards-04.tsx` | ⏳ | pending |
| 4978 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-cards-05.tsx` | ⏳ | pending |
| 4979 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-cards-06.tsx` | ⏳ | pending |
| 4980 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-cards-07.tsx` | ⏳ | pending |
| 4981 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/(shop)/shop-sidebar.tsx` | ⏳ | pending |
| 4982 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/(shop)/shop/page.tsx` | ⏳ | pending |
| 4983 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/customers/customers-table-item.tsx` | ⏳ | pending |
| 4984 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/customers/customers-table.tsx` | ⏳ | pending |
| 4985 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/customers/page.tsx` | ⏳ | pending |
| 4986 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/invoices/invoices-properties.tsx` | ⏳ | pending |
| 4987 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/invoices/invoices-table-item.tsx` | ⏳ | pending |
| 4988 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/invoices/invoices-table.tsx` | ⏳ | pending |
| 4989 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/invoices/page.tsx` | ⏳ | pending |
| 4990 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/orders/orders-properties.tsx` | ⏳ | pending |
| 4991 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/orders/orders-table-item.tsx` | ⏳ | pending |
| 4992 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/orders/orders-table.tsx` | ⏳ | pending |
| 4993 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/orders/page.tsx` | ⏳ | pending |
| 4994 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/ecommerce/product/page.tsx` | ⏳ | pending |
| 4995 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/jobs/company/page.tsx` | ⏳ | pending |
| 4996 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/jobs/jobs-item.tsx` | ⏳ | pending |
| 4997 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/jobs/jobs-sidebar.tsx` | ⏳ | pending |
| 4998 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/jobs/page.tsx` | ⏳ | pending |
| 4999 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/jobs/post/page.tsx` | ⏳ | pending |
| 5000 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/jobs/sort-dropdown.tsx` | ⏳ | pending |
| 5001 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/layout.tsx` | ⏳ | pending |
| 5002 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/settings/account/account-panel.tsx` | ⏳ | pending |
| 5003 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/settings/account/page.tsx` | ⏳ | pending |
| 5004 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/settings/apps/apps-panel.tsx` | ⏳ | pending |
| 5005 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/settings/apps/page.tsx` | ⏳ | pending |
| 5006 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/settings/billing/billing-panel.tsx` | ⏳ | pending |
| 5007 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/settings/billing/page.tsx` | ⏳ | pending |
| 5008 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/settings/feedback/feedback-panel.tsx` | ⏳ | pending |
| 5009 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/settings/feedback/page.tsx` | ⏳ | pending |
| 5010 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/settings/notifications/notifications-panel.tsx` | ⏳ | pending |
| 5011 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/settings/notifications/page.tsx` | ⏳ | pending |
| 5012 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/settings/plans/page.tsx` | ⏳ | pending |
| 5013 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/settings/plans/plans-panel.tsx` | ⏳ | pending |
| 5014 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/settings/settings-sidebar.tsx` | ⏳ | pending |
| 5015 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/tasks/kanban/page.tsx` | ⏳ | pending |
| 5016 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/tasks/kanban/task-01.tsx` | ⏳ | pending |
| 5017 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/tasks/kanban/task-02.tsx` | ⏳ | pending |
| 5018 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/tasks/kanban/task-03.tsx` | ⏳ | pending |
| 5019 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/tasks/kanban/task-04.tsx` | ⏳ | pending |
| 5020 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/tasks/kanban/task-05.tsx` | ⏳ | pending |
| 5021 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/tasks/kanban/task-06.tsx` | ⏳ | pending |
| 5022 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/tasks/kanban/task-07.tsx` | ⏳ | pending |
| 5023 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/tasks/kanban/task-08.tsx` | ⏳ | pending |
| 5024 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/tasks/kanban/task-09.tsx` | ⏳ | pending |
| 5025 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/tasks/kanban/tasks-groups.tsx` | ⏳ | pending |
| 5026 | `apps/gtm/_archive/old-docs/mosaic-next/app/(default)/tasks/list/page.tsx` | ⏳ | pending |
| 5027 | `apps/gtm/_archive/old-docs/mosaic-next/app/(double-sidebar)/community/profile/page.tsx` | ⏳ | pending |
| 5028 | `apps/gtm/_archive/old-docs/mosaic-next/app/(double-sidebar)/community/profile/profile-body.tsx` | ⏳ | pending |
| 5029 | `apps/gtm/_archive/old-docs/mosaic-next/app/(double-sidebar)/community/profile/profile-sidebar.tsx` | ⏳ | pending |
| 5030 | `apps/gtm/_archive/old-docs/mosaic-next/app/(double-sidebar)/inbox/inbox-body.tsx` | ⏳ | pending |
| 5031 | `apps/gtm/_archive/old-docs/mosaic-next/app/(double-sidebar)/inbox/inbox-sidebar.tsx` | ⏳ | pending |
| 5032 | `apps/gtm/_archive/old-docs/mosaic-next/app/(double-sidebar)/inbox/mail-item.tsx` | ⏳ | pending |
| 5033 | `apps/gtm/_archive/old-docs/mosaic-next/app/(double-sidebar)/inbox/page.tsx` | ⏳ | pending |
| 5034 | `apps/gtm/_archive/old-docs/mosaic-next/app/(double-sidebar)/layout.tsx` | ⏳ | pending |
| 5035 | `apps/gtm/_archive/old-docs/mosaic-next/app/(double-sidebar)/messages/channels.tsx` | ⏳ | pending |
| 5036 | `apps/gtm/_archive/old-docs/mosaic-next/app/(double-sidebar)/messages/direct-messages.tsx` | ⏳ | pending |
| 5037 | `apps/gtm/_archive/old-docs/mosaic-next/app/(double-sidebar)/messages/messages-body.tsx` | ⏳ | pending |
| 5038 | `apps/gtm/_archive/old-docs/mosaic-next/app/(double-sidebar)/messages/messages-chat.tsx` | ⏳ | pending |
| 5039 | `apps/gtm/_archive/old-docs/mosaic-next/app/(double-sidebar)/messages/messages-footer.tsx` | ⏳ | pending |
| 5040 | `apps/gtm/_archive/old-docs/mosaic-next/app/(double-sidebar)/messages/messages-header.tsx` | ⏳ | pending |
| 5041 | `apps/gtm/_archive/old-docs/mosaic-next/app/(double-sidebar)/messages/messages-sidebar.tsx` | ⏳ | pending |
| 5042 | `apps/gtm/_archive/old-docs/mosaic-next/app/(double-sidebar)/messages/page.tsx` | ⏳ | pending |
| 5043 | `apps/gtm/_archive/old-docs/mosaic-next/app/(onboarding)/onboarding-01/page.tsx` | ⏳ | pending |
| 5044 | `apps/gtm/_archive/old-docs/mosaic-next/app/(onboarding)/onboarding-02/page.tsx` | ⏳ | pending |
| 5045 | `apps/gtm/_archive/old-docs/mosaic-next/app/(onboarding)/onboarding-03/page.tsx` | ⏳ | pending |
| 5046 | `apps/gtm/_archive/old-docs/mosaic-next/app/(onboarding)/onboarding-04/page.tsx` | ⏳ | pending |
| 5047 | `apps/gtm/_archive/old-docs/mosaic-next/app/(onboarding)/onboarding-header.tsx` | ⏳ | pending |
| 5048 | `apps/gtm/_archive/old-docs/mosaic-next/app/(onboarding)/onboarding-image.tsx` | ⏳ | pending |
| 5049 | `apps/gtm/_archive/old-docs/mosaic-next/app/(onboarding)/onboarding-progress.tsx` | ⏳ | pending |
| 5050 | `apps/gtm/_archive/old-docs/mosaic-next/app/(pay)/ecommerce/pay/page.tsx` | ⏳ | pending |
| 5051 | `apps/gtm/_archive/old-docs/mosaic-next/app/(pay)/ecommerce/pay/pay-form.tsx` | ⏳ | pending |
| 5052 | `apps/gtm/_archive/old-docs/mosaic-next/app/api/hello/route.ts` | ⏳ | pending |
| 5053 | `apps/gtm/_archive/old-docs/mosaic-next/app/app-provider.tsx` | ⏳ | pending |
| 5054 | `apps/gtm/_archive/old-docs/mosaic-next/app/css/additional-styles/utility-patterns.css` | ⏳ | pending |
| 5055 | `apps/gtm/_archive/old-docs/mosaic-next/app/css/style.css` | ⏳ | pending |
| 5056 | `apps/gtm/_archive/old-docs/mosaic-next/app/flyout-context.tsx` | ⏳ | pending |
| 5057 | `apps/gtm/_archive/old-docs/mosaic-next/app/layout.tsx` | ⏳ | pending |
| 5058 | `apps/gtm/_archive/old-docs/mosaic-next/app/not-found.tsx` | ⏳ | pending |
| 5059 | `apps/gtm/_archive/old-docs/mosaic-next/app/page.tsx` | ⏳ | pending |
| 5060 | `apps/gtm/_archive/old-docs/mosaic-next/app/selected-items-context.tsx` | ⏳ | pending |
| 5061 | `apps/gtm/_archive/old-docs/mosaic-next/app/theme-provider.tsx` | ⏳ | pending |
| 5062 | `apps/gtm/_archive/old-docs/mosaic-next/assets/soloframeHubLogo.png` | ⏭️ | binary asset |
| 5063 | `apps/gtm/_archive/old-docs/mosaic-next/components/accordion-basic.tsx` | ⏳ | pending |
| 5064 | `apps/gtm/_archive/old-docs/mosaic-next/components/accordion-table-item.tsx` | ⏳ | pending |
| 5065 | `apps/gtm/_archive/old-docs/mosaic-next/components/accordion-table-rich-item.tsx` | ⏳ | pending |
| 5066 | `apps/gtm/_archive/old-docs/mosaic-next/components/banner-02.tsx` | ⏳ | pending |
| 5067 | `apps/gtm/_archive/old-docs/mosaic-next/components/banner.tsx` | ⏳ | pending |
| 5068 | `apps/gtm/_archive/old-docs/mosaic-next/components/channel-menu.tsx` | ⏳ | pending |
| 5069 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/bar-chart-01.tsx` | ⏳ | pending |
| 5070 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/bar-chart-02.tsx` | ⏳ | pending |
| 5071 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/bar-chart-03.tsx` | ⏳ | pending |
| 5072 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/bar-chart-04.tsx` | ⏳ | pending |
| 5073 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/bar-chart-05.tsx` | ⏳ | pending |
| 5074 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/bar-chart-06.tsx` | ⏳ | pending |
| 5075 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/chartjs-config.tsx` | ⏳ | pending |
| 5076 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/doughnut-chart.tsx` | ⏳ | pending |
| 5077 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/line-chart-01.tsx` | ⏳ | pending |
| 5078 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/line-chart-02.tsx` | ⏳ | pending |
| 5079 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/line-chart-03.tsx` | ⏳ | pending |
| 5080 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/line-chart-04.tsx` | ⏳ | pending |
| 5081 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/line-chart-05.tsx` | ⏳ | pending |
| 5082 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/line-chart-06.tsx` | ⏳ | pending |
| 5083 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/line-chart-07.tsx` | ⏳ | pending |
| 5084 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/line-chart-08.tsx` | ⏳ | pending |
| 5085 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/line-chart-09.tsx` | ⏳ | pending |
| 5086 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/pie-chart.tsx` | ⏳ | pending |
| 5087 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/polar-chart.tsx` | ⏳ | pending |
| 5088 | `apps/gtm/_archive/old-docs/mosaic-next/components/charts/realtime-chart.tsx` | ⏳ | pending |
| 5089 | `apps/gtm/_archive/old-docs/mosaic-next/components/date-select.tsx` | ⏳ | pending |
| 5090 | `apps/gtm/_archive/old-docs/mosaic-next/components/datepicker.tsx` | ⏳ | pending |
| 5091 | `apps/gtm/_archive/old-docs/mosaic-next/components/delete-button.tsx` | ⏳ | pending |
| 5092 | `apps/gtm/_archive/old-docs/mosaic-next/components/dropdown-filter.tsx` | ⏳ | pending |
| 5093 | `apps/gtm/_archive/old-docs/mosaic-next/components/dropdown-full.tsx` | ⏳ | pending |
| 5094 | `apps/gtm/_archive/old-docs/mosaic-next/components/dropdown-help.tsx` | ⏳ | pending |
| 5095 | `apps/gtm/_archive/old-docs/mosaic-next/components/dropdown-notifications.tsx` | ⏳ | pending |
| 5096 | `apps/gtm/_archive/old-docs/mosaic-next/components/dropdown-profile.tsx` | ⏳ | pending |
| 5097 | `apps/gtm/_archive/old-docs/mosaic-next/components/dropdown-switch.tsx` | ⏳ | pending |
| 5098 | `apps/gtm/_archive/old-docs/mosaic-next/components/edit-menu-card.tsx` | ⏳ | pending |
| 5099 | `apps/gtm/_archive/old-docs/mosaic-next/components/edit-menu.tsx` | ⏳ | pending |
| 5100 | `apps/gtm/_archive/old-docs/mosaic-next/components/modal-action.tsx` | ⏳ | pending |
| 5101 | `apps/gtm/_archive/old-docs/mosaic-next/components/modal-basic.tsx` | ⏳ | pending |
| 5102 | `apps/gtm/_archive/old-docs/mosaic-next/components/modal-blank.tsx` | ⏳ | pending |
| 5103 | `apps/gtm/_archive/old-docs/mosaic-next/components/modal-cookies.tsx` | ⏳ | pending |
| 5104 | `apps/gtm/_archive/old-docs/mosaic-next/components/notification.tsx` | ⏳ | pending |
| 5105 | `apps/gtm/_archive/old-docs/mosaic-next/components/pagination-classic.tsx` | ⏳ | pending |
| 5106 | `apps/gtm/_archive/old-docs/mosaic-next/components/pagination-numeric-2.tsx` | ⏳ | pending |
| 5107 | `apps/gtm/_archive/old-docs/mosaic-next/components/pagination-numeric.tsx` | ⏳ | pending |
| 5108 | `apps/gtm/_archive/old-docs/mosaic-next/components/search-form.tsx` | ⏳ | pending |
| 5109 | `apps/gtm/_archive/old-docs/mosaic-next/components/search-modal.tsx` | ⏳ | pending |
| 5110 | `apps/gtm/_archive/old-docs/mosaic-next/components/theme-toggle.tsx` | ⏳ | pending |
| 5111 | `apps/gtm/_archive/old-docs/mosaic-next/components/toast-02.tsx` | ⏳ | pending |
| 5112 | `apps/gtm/_archive/old-docs/mosaic-next/components/toast-03.tsx` | ⏳ | pending |
| 5113 | `apps/gtm/_archive/old-docs/mosaic-next/components/toast.tsx` | ⏳ | pending |
| 5114 | `apps/gtm/_archive/old-docs/mosaic-next/components/tooltip.tsx` | ⏳ | pending |
| 5115 | `apps/gtm/_archive/old-docs/mosaic-next/components/ui/calendar.tsx` | ⏳ | pending |
| 5116 | `apps/gtm/_archive/old-docs/mosaic-next/components/ui/header.tsx` | ⏳ | pending |
| 5117 | `apps/gtm/_archive/old-docs/mosaic-next/components/ui/logo.tsx` | ⏳ | pending |
| 5118 | `apps/gtm/_archive/old-docs/mosaic-next/components/ui/popover.tsx` | ⏳ | pending |
| 5119 | `apps/gtm/_archive/old-docs/mosaic-next/components/ui/sidebar-link-group.tsx` | ⏳ | pending |
| 5120 | `apps/gtm/_archive/old-docs/mosaic-next/components/ui/sidebar-link.tsx` | ⏳ | pending |
| 5121 | `apps/gtm/_archive/old-docs/mosaic-next/components/ui/sidebar.tsx` | ⏳ | pending |
| 5122 | `apps/gtm/_archive/old-docs/mosaic-next/components/utils/use-item-selection.tsx` | ⏳ | pending |
| 5123 | `apps/gtm/_archive/old-docs/mosaic-next/components/utils/use-window-width.tsx` | ⏳ | pending |
| 5124 | `apps/gtm/_archive/old-docs/mosaic-next/components/utils/utils.ts` | ⏳ | pending |
| 5125 | `apps/gtm/_archive/old-docs/mosaic-next/lib/utils.ts` | ⏳ | pending |
| 5126 | `apps/gtm/_archive/old-docs/mosaic-next/next.config.js` | ⏳ | pending |
| 5127 | `apps/gtm/_archive/old-docs/mosaic-next/package.json` | ⏳ | pending |
| 5128 | `apps/gtm/_archive/old-docs/mosaic-next/postcss.config.js` | ⏳ | pending |
| 5129 | `apps/gtm/_archive/old-docs/mosaic-next/public/favicon.ico` | ⏭️ | binary asset |
| 5130 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/404-illustration-dark.svg` | ⏭️ | binary asset |
| 5131 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/404-illustration.svg` | ⏭️ | binary asset |
| 5132 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/announcement-icon.svg` | ⏭️ | binary asset |
| 5133 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-01.jpg` | ⏭️ | binary asset |
| 5134 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-02.jpg` | ⏭️ | binary asset |
| 5135 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-03.jpg` | ⏭️ | binary asset |
| 5136 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-04.jpg` | ⏭️ | binary asset |
| 5137 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-05.jpg` | ⏭️ | binary asset |
| 5138 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-06.jpg` | ⏭️ | binary asset |
| 5139 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-07.jpg` | ⏭️ | binary asset |
| 5140 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-08.jpg` | ⏭️ | binary asset |
| 5141 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-09.jpg` | ⏭️ | binary asset |
| 5142 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-10.jpg` | ⏭️ | binary asset |
| 5143 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-11.jpg` | ⏭️ | binary asset |
| 5144 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-12.jpg` | ⏭️ | binary asset |
| 5145 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-13.jpg` | ⏭️ | binary asset |
| 5146 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-14.jpg` | ⏭️ | binary asset |
| 5147 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-15.jpg` | ⏭️ | binary asset |
| 5148 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-16.jpg` | ⏭️ | binary asset |
| 5149 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-17.jpg` | ⏭️ | binary asset |
| 5150 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-18.jpg` | ⏭️ | binary asset |
| 5151 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-19.jpg` | ⏭️ | binary asset |
| 5152 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-20.jpg` | ⏭️ | binary asset |
| 5153 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-21.jpg` | ⏭️ | binary asset |
| 5154 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-22.jpg` | ⏭️ | binary asset |
| 5155 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-23.jpg` | ⏭️ | binary asset |
| 5156 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-24.jpg` | ⏭️ | binary asset |
| 5157 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-25.jpg` | ⏭️ | binary asset |
| 5158 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-26.jpg` | ⏭️ | binary asset |
| 5159 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-27.jpg` | ⏭️ | binary asset |
| 5160 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-28.jpg` | ⏭️ | binary asset |
| 5161 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-29.jpg` | ⏭️ | binary asset |
| 5162 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-30.jpg` | ⏭️ | binary asset |
| 5163 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-31.jpg` | ⏭️ | binary asset |
| 5164 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/applications-image-32.jpg` | ⏭️ | binary asset |
| 5165 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/auth-image.jpg` | ⏭️ | binary asset |
| 5166 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/avatar-01.jpg` | ⏭️ | binary asset |
| 5167 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/avatar-02.jpg` | ⏭️ | binary asset |
| 5168 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/avatar-03.jpg` | ⏭️ | binary asset |
| 5169 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/avatar-04.jpg` | ⏭️ | binary asset |
| 5170 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/avatar-05.jpg` | ⏭️ | binary asset |
| 5171 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/avatar-06.jpg` | ⏭️ | binary asset |
| 5172 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/channel-01.png` | ⏭️ | binary asset |
| 5173 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/channel-02.png` | ⏭️ | binary asset |
| 5174 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/channel-03.png` | ⏭️ | binary asset |
| 5175 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/chat-image.jpg` | ⏭️ | binary asset |
| 5176 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/company-bg.jpg` | ⏭️ | binary asset |
| 5177 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/company-icon-01.svg` | ⏭️ | binary asset |
| 5178 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/company-icon-02.svg` | ⏭️ | binary asset |
| 5179 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/company-icon-03.svg` | ⏭️ | binary asset |
| 5180 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/company-icon-04.svg` | ⏭️ | binary asset |
| 5181 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/company-icon-05.svg` | ⏭️ | binary asset |
| 5182 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/company-icon-06.svg` | ⏭️ | binary asset |
| 5183 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/company-icon-07.svg` | ⏭️ | binary asset |
| 5184 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/company-icon-08.svg` | ⏭️ | binary asset |
| 5185 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/favicon.png` | ⏭️ | binary asset |
| 5186 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/feed-image-01.jpg` | ⏭️ | binary asset |
| 5187 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/feed-image-02.jpg` | ⏭️ | binary asset |
| 5188 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/group-avatar-01.png` | ⏭️ | binary asset |
| 5189 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/group-avatar-02.png` | ⏭️ | binary asset |
| 5190 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/group-avatar-03.png` | ⏭️ | binary asset |
| 5191 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/group-avatar-04.png` | ⏭️ | binary asset |
| 5192 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/icon-01.svg` | ⏭️ | binary asset |
| 5193 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/icon-02.svg` | ⏭️ | binary asset |
| 5194 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/icon-03.svg` | ⏭️ | binary asset |
| 5195 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/inbox-image.jpg` | ⏭️ | binary asset |
| 5196 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/meetup-image.jpg` | ⏭️ | binary asset |
| 5197 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/meetup-photo-01.jpg` | ⏭️ | binary asset |
| 5198 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/meetup-photo-02.jpg` | ⏭️ | binary asset |
| 5199 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/meetup-photo-03.jpg` | ⏭️ | binary asset |
| 5200 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/meetups-thumb-01.jpg` | ⏭️ | binary asset |
| 5201 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/meetups-thumb-02.jpg` | ⏭️ | binary asset |
| 5202 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/meetups-thumb-03.jpg` | ⏭️ | binary asset |
| 5203 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/meetups-thumb-04.jpg` | ⏭️ | binary asset |
| 5204 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/meetups-thumb-05.jpg` | ⏭️ | binary asset |
| 5205 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/meetups-thumb-06.jpg` | ⏭️ | binary asset |
| 5206 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/meetups-thumb-07.jpg` | ⏭️ | binary asset |
| 5207 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/meetups-thumb-08.jpg` | ⏭️ | binary asset |
| 5208 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/modal-image.jpg` | ⏭️ | binary asset |
| 5209 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/onboarding-image.jpg` | ⏭️ | binary asset |
| 5210 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/pay-bg.jpg` | ⏭️ | binary asset |
| 5211 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/product-image.jpg` | ⏭️ | binary asset |
| 5212 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/profile-bg.jpg` | ⏭️ | binary asset |
| 5213 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/related-product-01.jpg` | ⏭️ | binary asset |
| 5214 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/related-product-02.jpg` | ⏭️ | binary asset |
| 5215 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/related-product-03.jpg` | ⏭️ | binary asset |
| 5216 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/shop-category-01.png` | ⏭️ | binary asset |
| 5217 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/shop-category-02.png` | ⏭️ | binary asset |
| 5218 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/shop-category-03.png` | ⏭️ | binary asset |
| 5219 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/shop-category-04.png` | ⏭️ | binary asset |
| 5220 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/task-image-01.jpg` | ⏭️ | binary asset |
| 5221 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/task-image-02.jpg` | ⏭️ | binary asset |
| 5222 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/transactions-image-01.svg` | ⏭️ | binary asset |
| 5223 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/transactions-image-02.svg` | ⏭️ | binary asset |
| 5224 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/transactions-image-03.svg` | ⏭️ | binary asset |
| 5225 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/transactions-image-04.svg` | ⏭️ | binary asset |
| 5226 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/transactions-image-05.svg` | ⏭️ | binary asset |
| 5227 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/transactions-image-06.svg` | ⏭️ | binary asset |
| 5228 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/transactions-image-07.svg` | ⏭️ | binary asset |
| 5229 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/transactions-image-08.svg` | ⏭️ | binary asset |
| 5230 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-128-01.jpg` | ⏭️ | binary asset |
| 5231 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-28-01.jpg` | ⏭️ | binary asset |
| 5232 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-28-02.jpg` | ⏭️ | binary asset |
| 5233 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-28-03.jpg` | ⏭️ | binary asset |
| 5234 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-28-04.jpg` | ⏭️ | binary asset |
| 5235 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-28-05.jpg` | ⏭️ | binary asset |
| 5236 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-28-06.jpg` | ⏭️ | binary asset |
| 5237 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-28-07.jpg` | ⏭️ | binary asset |
| 5238 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-28-08.jpg` | ⏭️ | binary asset |
| 5239 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-28-09.jpg` | ⏭️ | binary asset |
| 5240 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-28-10.jpg` | ⏭️ | binary asset |
| 5241 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-28-11.jpg` | ⏭️ | binary asset |
| 5242 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-28-12.jpg` | ⏭️ | binary asset |
| 5243 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-32-01.jpg` | ⏭️ | binary asset |
| 5244 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-32-02.jpg` | ⏭️ | binary asset |
| 5245 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-32-03.jpg` | ⏭️ | binary asset |
| 5246 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-32-04.jpg` | ⏭️ | binary asset |
| 5247 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-32-05.jpg` | ⏭️ | binary asset |
| 5248 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-32-06.jpg` | ⏭️ | binary asset |
| 5249 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-32-07.jpg` | ⏭️ | binary asset |
| 5250 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-32-08.jpg` | ⏭️ | binary asset |
| 5251 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-36-05.jpg` | ⏭️ | binary asset |
| 5252 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-40-01.jpg` | ⏭️ | binary asset |
| 5253 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-40-02.jpg` | ⏭️ | binary asset |
| 5254 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-40-03.jpg` | ⏭️ | binary asset |
| 5255 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-40-04.jpg` | ⏭️ | binary asset |
| 5256 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-40-05.jpg` | ⏭️ | binary asset |
| 5257 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-40-06.jpg` | ⏭️ | binary asset |
| 5258 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-40-07.jpg` | ⏭️ | binary asset |
| 5259 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-40-08.jpg` | ⏭️ | binary asset |
| 5260 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-40-09.jpg` | ⏭️ | binary asset |
| 5261 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-40-10.jpg` | ⏭️ | binary asset |
| 5262 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-40-11.jpg` | ⏭️ | binary asset |
| 5263 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-40-12.jpg` | ⏭️ | binary asset |
| 5264 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-64-01.jpg` | ⏭️ | binary asset |
| 5265 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-64-02.jpg` | ⏭️ | binary asset |
| 5266 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-64-03.jpg` | ⏭️ | binary asset |
| 5267 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-64-04.jpg` | ⏭️ | binary asset |
| 5268 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-64-05.jpg` | ⏭️ | binary asset |
| 5269 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-64-06.jpg` | ⏭️ | binary asset |
| 5270 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-64-07.jpg` | ⏭️ | binary asset |
| 5271 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-64-08.jpg` | ⏭️ | binary asset |
| 5272 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-64-09.jpg` | ⏭️ | binary asset |
| 5273 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-64-10.jpg` | ⏭️ | binary asset |
| 5274 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-64-11.jpg` | ⏭️ | binary asset |
| 5275 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-64-12.jpg` | ⏭️ | binary asset |
| 5276 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-64-13.jpg` | ⏭️ | binary asset |
| 5277 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-64-14.jpg` | ⏭️ | binary asset |
| 5278 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-avatar-32.png` | ⏭️ | binary asset |
| 5279 | `apps/gtm/_archive/old-docs/mosaic-next/public/images/user-avatar-80.png` | ⏭️ | binary asset |
| 5280 | `apps/gtm/_archive/old-docs/mosaic-next/tsconfig.json` | ⏳ | pending |
| 5281 | `apps/gtm/_archive/old-docs/new-lesson-context/course-10-email-nurture-and-newsletter-systems.md` | ⏳ | pending |
| 5282 | `apps/gtm/_archive/old-docs/new-lesson-context/course-11-social-proof-and-referral-systems.md` | ⏳ | pending |
| 5283 | `apps/gtm/_archive/old-docs/new-lesson-context/course-12-marketing-automation-and-analytics.md` | ⏳ | pending |
| 5284 | `apps/gtm/_archive/old-docs/new-lesson-context/course-15-discovery-call-simulations.md` | ⏳ | pending |
| 5285 | `apps/gtm/_archive/old-docs/new-lesson-context/course-17-objection-handling-database.md` | ⏳ | pending |
| 5286 | `apps/gtm/_archive/old-docs/new-lesson-context/course-18-proposals-pricing-and-negotiation.md` | ⏳ | pending |
| 5287 | `apps/gtm/_archive/old-docs/new-lesson-context/course-19-closing-and-next-steps.md` | ⏳ | pending |
| 5288 | `apps/gtm/_archive/old-docs/new-lesson-context/course-20-sales-pipeline-management.md` | ⏳ | pending |
| 5289 | `apps/gtm/_archive/old-docs/new-lesson-context/course-3-choose-your-acquisition-path.md` | ⏳ | pending |
| 5290 | `apps/gtm/_archive/old-docs/new-lesson-context/course-4-list-building-prospecting-etc.md` | ⏳ | pending |
| 5291 | `apps/gtm/_archive/old-docs/new-lesson-context/course-5-technical-content-engine.md` | ⏳ | pending |
| 5292 | `apps/gtm/_archive/old-docs/new-lesson-context/course-6-seo-and-answer-engine-optimization.md` | ⏳ | pending |
| 5293 | `apps/gtm/_archive/old-docs/new-lesson-context/course-7-linkedin-growth-engine.md` | ⏳ | pending |
| 5294 | `apps/gtm/_archive/old-docs/new-lesson-context/course-8-cold-email-mastery.md` | ⏳ | pending |
| 5295 | `apps/gtm/_archive/old-docs/new-lesson-context/course-9-community-based-lead-generation.md` | ⏳ | pending |
| 5296 | `apps/gtm/_archive/old-docs/new-lesson-context/onboarding-questioniere.md` | ⏳ | pending |
| 5297 | `apps/gtm/_archive/old-docs/nodebb-category-setup.md` | ⏳ | pending |
| 5298 | `apps/gtm/_archive/old-docs/phase-b-audit-report.md` | ⏳ | pending |
| 5299 | `apps/gtm/_archive/old-docs/platform-audit-2026-03-22.md` | ⏳ | pending |
| 5300 | `apps/gtm/_archive/old-docs/production-deployment-guide.md` | ⏳ | pending |
| 5301 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/1. DISC Academic Foundation.docx` | ⏭️ | binary asset |
| 5302 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/AI & Automation for Customer Acquisition (Solo Fou.md` | ⏳ | pending |
| 5303 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/AI and Automation for Customer Acquisition_ A Comprehensive Report.docx` | ⏭️ | binary asset |
| 5304 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/B2B Sales Discovery and Qualification Frameworks for Solo Founders.docx` | ⏭️ | binary asset |
| 5305 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/Behavioral Architecture in the Solo Enterprise_ A Psychometric and Strategic Analysis of DISC in High-Stakes Commerce.md` | ⏳ | pending |
| 5306 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/CORE METRICS.docx` | ⏭️ | binary asset |
| 5307 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/Cold Email Best Practices for Solo Founders (2024–.md` | ⏳ | pending |
| 5308 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/Cold Email for Solo Founders_ B2B Focus, Compliance, and Best Practices.docx` | ⏭️ | binary asset |
| 5309 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/Emerging Trends in B2B Customer Acquisition_ 2026.md` | ⏳ | pending |
| 5310 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/LinkedIn B2B Marketing Strategies for Solo Founders (2025).docx` | ⏭️ | binary asset |
| 5311 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/LinkedIn B2B Marketing for Solo Founders in 2025.md` | ⏳ | pending |
| 5312 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/MANUSCRIPT-RESEARCH-INTEGRATION-GUIDE.md` | ⏳ | pending |
| 5313 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/PROMPT-1-Content-Discovery-Mapping.md` | ⏳ | pending |
| 5314 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/PROMPT-2-Research-Gap-Analysis.md` | ⏳ | pending |
| 5315 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/PROMPT-3-Diff-Generation-Per-Course.md` | ⏳ | pending |
| 5316 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/Part 1_ Community‑Led Growth (CLG) – Definition, Emergence & Principles.docx` | ⏭️ | binary asset |
| 5317 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/Psychology of Sales Resistance Among Technical Fou.md` | ⏳ | pending |
| 5318 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/QUICK-START-Research-Integration.md` | ⏳ | pending |
| 5319 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/RESEARCH-INTEGRATION-MASTER-WORKFLOW.md` | ⏳ | pending |
| 5320 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/Research community-led growth and social proof str.md` | ⏳ | pending |
| 5321 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/Research customer success and retention strategies.md` | ⏳ | pending |
| 5322 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/Research discovery call frameworks and qualificati.md` | ⏳ | pending |
| 5323 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/Research pricing psychology and objection handling.md` | ⏳ | pending |
| 5324 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/Research sales and customer acquisition metrics fo.md` | ⏳ | pending |
| 5325 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/Research sales sustainability and founder mental h.md` | ⏳ | pending |
| 5326 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/Research the application of DISC behavioral assess.md` | ⏳ | pending |
| 5327 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/Research the differences between bootstrap and VC-.md` | ⏳ | pending |
| 5328 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/The 2025 B2B LinkedIn Ecosystem_ A Comprehensive Strategic Report for Solo Founders.md` | ⏳ | pending |
| 5329 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/The 2025 State of Cold Email for B2B Solo Founders_ Infrastructure, Psychology, and Effectiveness.md` | ⏳ | pending |
| 5330 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/The Autonomous Customer Success Architecture_ Retention Systems for the Resource-Constrained B2B Founder.md` | ⏳ | pending |
| 5331 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/The Autonomous Founder_ A Comprehensive Analysis of AI, Automation, and Human-Centric Customer Acquisition Architectures in 2025.md` | ⏳ | pending |
| 5332 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/The Cognitive and Neurobiological Architecture of Sales Resistance_ An Exhaustive Analysis of Technical Founder Psychology.md` | ⏳ | pending |
| 5333 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/The Minimum Viable Qualification (MVQ) Architecture_ Adapting Enterprise Sales Methodologies for the Resource-Constrained Solopreneur.md` | ⏳ | pending |
| 5334 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/The Psychology of Founders’ Sales Avoidance_ Anxiety, Patterns, and Transformation.docx` | ⏭️ | binary asset |
| 5335 | `apps/gtm/_archive/old-docs/research-update-12-jan-26/The Solo Founder’s Playbook_ Community-Led Growth and Social Proof as High-Leverage Acquisition Channels.md` | ⏳ | pending |
| 5336 | `apps/gtm/_archive/old-docs/revised-audit-test-document.md` | ⏳ | pending |
| 5337 | `apps/gtm/_archive/old-docs/sales-academy-update-requirements-summary-include-MAGNETS-context.md` | ⏳ | pending |
| 5338 | `apps/gtm/_archive/old-docs/screenshots/artifact_creation_icp_1765899000792.png` | ⏭️ | binary asset |
| 5339 | `apps/gtm/_archive/old-docs/screenshots/artifacts_page_1765898837272.png` | ⏭️ | binary asset |
| 5340 | `apps/gtm/_archive/old-docs/screenshots/course-context-prompts.md` | ⏳ | pending |
| 5341 | `apps/gtm/_archive/old-docs/screenshots/dashboard_sales_state_1765898825361.png` | ⏭️ | binary asset |
| 5342 | `apps/gtm/_archive/old-docs/screenshots/demo_script_creation_1765899048431.png` | ⏭️ | binary asset |
| 5343 | `apps/gtm/_archive/old-docs/screenshots/execution-loop-visual.png` | ⏭️ | binary asset |
| 5344 | `apps/gtm/_archive/old-docs/screenshots/icp-builder-mockup.png` | ⏭️ | binary asset |
| 5345 | `apps/gtm/_archive/old-docs/screenshots/login_page_1765898808505.png` | ⏭️ | binary asset |
| 5346 | `apps/gtm/_archive/old-docs/screenshots/objection_handler_creation_1765899038241.png` | ⏭️ | binary asset |
| 5347 | `apps/gtm/_archive/old-docs/screenshots/pipeline-state-machine-mockup.png` | ⏭️ | binary asset |
| 5348 | `apps/gtm/_archive/old-docs/screenshots/roleplay_setup_1765898846051.png` | ⏭️ | binary asset |
| 5349 | `apps/gtm/_archive/old-docs/screenshots/sales-academy-visual.png` | ⏭️ | binary asset |
| 5350 | `apps/gtm/_archive/old-docs/screenshots/sales-roleplay-mockup.png` | ⏭️ | binary asset |
| 5351 | `apps/gtm/_archive/old-docs/solo-founders-ai-playbook-manuscript.md` | ⏳ | pending |
| 5352 | `apps/gtm/_archive/old-docs/solo-founders-sales-academy-marketing-overview.md` | ⏳ | pending |
| 5353 | `apps/gtm/_archive/old-docs/task.md` | ⏳ | pending |
| 5354 | `apps/gtm/_archive/old-docs/token-optimization.md` | ⏳ | pending |
| 5355 | `apps/gtm/_archive/old-docs/update-context/EXECUTION_PACKAGE_SUMMARY.md` | ⏳ | pending |
| 5356 | `apps/gtm/_archive/old-docs/update-context/Lesson_By_Lesson_Update_Checklist.md` | ⏳ | pending |
| 5357 | `apps/gtm/_archive/old-docs/update-context/Progress_Tracker.md` | ⏳ | pending |
| 5358 | `apps/gtm/_archive/old-docs/update-context/Quick_Reference_Update_Guide.md` | ⏳ | pending |
| 5359 | `apps/gtm/_archive/old-docs/update-context/SAMPLE_Bootstrap_Marketing_Lesson_3.md` | ⏳ | pending |
| 5360 | `apps/gtm/_archive/old-docs/update-context/Track_2_Update_Guide_Bootstrap_Marketing.md` | ⏳ | pending |
| 5361 | `apps/gtm/_archive/old-docs/update-context/courses-that-need-to-be-created.md` | ⏳ | pending |
| 5362 | `apps/gtm/_archive/old-docs/word-count-analysis.json` | ⏳ | pending |
| 5363 | `apps/gtm/_archive/old-html/index.html` | ⏳ | pending |
| 5364 | `apps/gtm/_archive/old-html/platform-architecture.html` | ⏳ | pending |
| 5365 | `apps/gtm/_archive/old-html/simple-html/.editorconfig` | ⏳ | pending |
| 5366 | `apps/gtm/_archive/old-html/simple-html/.gitignore` | ⏳ | pending |
| 5367 | `apps/gtm/_archive/old-html/simple-html/CHANGELOG.md` | ⏳ | pending |
| 5368 | `apps/gtm/_archive/old-html/simple-html/README.md` | ⏳ | pending |
| 5369 | `apps/gtm/_archive/old-html/simple-html/_pgbackup/index-chatgpt_1765727744.html` | ⏳ | pending |
| 5370 | `apps/gtm/_archive/old-html/simple-html/_pgbackup/pinegrow_1765727501.json` | ⏳ | pending |
| 5371 | `apps/gtm/_archive/old-html/simple-html/_pgbackup/pinegrow_1765727531.json` | ⏳ | pending |
| 5372 | `apps/gtm/_archive/old-html/simple-html/_pgbackup/pinegrow_1765727540.json` | ⏳ | pending |
| 5373 | `apps/gtm/_archive/old-html/simple-html/_pgbackup/pinegrow_1765727541.json` | ⏳ | pending |
| 5374 | `apps/gtm/_archive/old-html/simple-html/_pgbackup/pinegrow_1765727549.json` | ⏳ | pending |
| 5375 | `apps/gtm/_archive/old-html/simple-html/_pgbackup/pinegrow_1765727744.json` | ⏳ | pending |
| 5376 | `apps/gtm/_archive/old-html/simple-html/_pginfo/fonts.json` | ⏳ | pending |
| 5377 | `apps/gtm/_archive/old-html/simple-html/apps.html` | ⏳ | pending |
| 5378 | `apps/gtm/_archive/old-html/simple-html/blog-post.html` | ⏳ | pending |
| 5379 | `apps/gtm/_archive/old-html/simple-html/blog.html` | ⏳ | pending |
| 5380 | `apps/gtm/_archive/old-html/simple-html/css/additional-styles/custom-fonts.css` | ⏳ | pending |
| 5381 | `apps/gtm/_archive/old-html/simple-html/css/additional-styles/theme.css` | ⏳ | pending |
| 5382 | `apps/gtm/_archive/old-html/simple-html/css/additional-styles/utility-patterns.css` | ⏳ | pending |
| 5383 | `apps/gtm/_archive/old-html/simple-html/css/style.css` | ⏳ | pending |
| 5384 | `apps/gtm/_archive/old-html/simple-html/css/vendors/aos.css` | ⏳ | pending |
| 5385 | `apps/gtm/_archive/old-html/simple-html/customers.html` | ⏳ | pending |
| 5386 | `apps/gtm/_archive/old-html/simple-html/documentation.html` | ⏳ | pending |
| 5387 | `apps/gtm/_archive/old-html/simple-html/images/auth-bg.svg` | ⏭️ | binary asset |
| 5388 | `apps/gtm/_archive/old-html/simple-html/images/avatar-01.jpg` | ⏭️ | binary asset |
| 5389 | `apps/gtm/_archive/old-html/simple-html/images/avatar-02.jpg` | ⏭️ | binary asset |
| 5390 | `apps/gtm/_archive/old-html/simple-html/images/avatar-03.jpg` | ⏭️ | binary asset |
| 5391 | `apps/gtm/_archive/old-html/simple-html/images/avatar-04.jpg` | ⏭️ | binary asset |
| 5392 | `apps/gtm/_archive/old-html/simple-html/images/avatar-05.jpg` | ⏭️ | binary asset |
| 5393 | `apps/gtm/_archive/old-html/simple-html/images/avatar-06.jpg` | ⏭️ | binary asset |
| 5394 | `apps/gtm/_archive/old-html/simple-html/images/badge.svg` | ⏭️ | binary asset |
| 5395 | `apps/gtm/_archive/old-html/simple-html/images/blog-author-01.jpg` | ⏭️ | binary asset |
| 5396 | `apps/gtm/_archive/old-html/simple-html/images/blog-author-02.jpg` | ⏭️ | binary asset |
| 5397 | `apps/gtm/_archive/old-html/simple-html/images/docs-illustration.png` | ⏭️ | binary asset |
| 5398 | `apps/gtm/_archive/old-html/simple-html/images/features-02-overlay-01.png` | ⏭️ | binary asset |
| 5399 | `apps/gtm/_archive/old-html/simple-html/images/features-02-overlay-02.png` | ⏭️ | binary asset |
| 5400 | `apps/gtm/_archive/old-html/simple-html/images/features-02-overlay-03.png` | ⏭️ | binary asset |
| 5401 | `apps/gtm/_archive/old-html/simple-html/images/integration-01.svg` | ⏭️ | binary asset |
| 5402 | `apps/gtm/_archive/old-html/simple-html/images/integration-02.svg` | ⏭️ | binary asset |
| 5403 | `apps/gtm/_archive/old-html/simple-html/images/integration-03.svg` | ⏭️ | binary asset |
| 5404 | `apps/gtm/_archive/old-html/simple-html/images/integration-04.svg` | ⏭️ | binary asset |
| 5405 | `apps/gtm/_archive/old-html/simple-html/images/integration-05.svg` | ⏭️ | binary asset |
| 5406 | `apps/gtm/_archive/old-html/simple-html/images/integration-06.svg` | ⏭️ | binary asset |
| 5407 | `apps/gtm/_archive/old-html/simple-html/images/integration-07.svg` | ⏭️ | binary asset |
| 5408 | `apps/gtm/_archive/old-html/simple-html/images/integration-08.svg` | ⏭️ | binary asset |
| 5409 | `apps/gtm/_archive/old-html/simple-html/images/integration-09.svg` | ⏭️ | binary asset |
| 5410 | `apps/gtm/_archive/old-html/simple-html/images/integration-10.svg` | ⏭️ | binary asset |
| 5411 | `apps/gtm/_archive/old-html/simple-html/images/integration-11.svg` | ⏭️ | binary asset |
| 5412 | `apps/gtm/_archive/old-html/simple-html/images/integration-12.svg` | ⏭️ | binary asset |
| 5413 | `apps/gtm/_archive/old-html/simple-html/images/integration-13.svg` | ⏭️ | binary asset |
| 5414 | `apps/gtm/_archive/old-html/simple-html/images/integration-14.svg` | ⏭️ | binary asset |
| 5415 | `apps/gtm/_archive/old-html/simple-html/images/integration-15.svg` | ⏭️ | binary asset |
| 5416 | `apps/gtm/_archive/old-html/simple-html/images/integration-16.svg` | ⏭️ | binary asset |
| 5417 | `apps/gtm/_archive/old-html/simple-html/images/integration-17.svg` | ⏭️ | binary asset |
| 5418 | `apps/gtm/_archive/old-html/simple-html/images/integration-18.svg` | ⏭️ | binary asset |
| 5419 | `apps/gtm/_archive/old-html/simple-html/images/integration-19.svg` | ⏭️ | binary asset |
| 5420 | `apps/gtm/_archive/old-html/simple-html/images/integration-20.svg` | ⏭️ | binary asset |
| 5421 | `apps/gtm/_archive/old-html/simple-html/images/integration-21.svg` | ⏭️ | binary asset |
| 5422 | `apps/gtm/_archive/old-html/simple-html/images/large-testimonial.jpg` | ⏭️ | binary asset |
| 5423 | `apps/gtm/_archive/old-html/simple-html/images/logo-01.svg` | ⏭️ | binary asset |
| 5424 | `apps/gtm/_archive/old-html/simple-html/images/logo-02.svg` | ⏭️ | binary asset |
| 5425 | `apps/gtm/_archive/old-html/simple-html/images/logo-03.svg` | ⏭️ | binary asset |
| 5426 | `apps/gtm/_archive/old-html/simple-html/images/logo-04.svg` | ⏭️ | binary asset |
| 5427 | `apps/gtm/_archive/old-html/simple-html/images/logo-05.svg` | ⏭️ | binary asset |
| 5428 | `apps/gtm/_archive/old-html/simple-html/images/logo-06.svg` | ⏭️ | binary asset |
| 5429 | `apps/gtm/_archive/old-html/simple-html/images/logo-07.svg` | ⏭️ | binary asset |
| 5430 | `apps/gtm/_archive/old-html/simple-html/images/logo-08.svg` | ⏭️ | binary asset |
| 5431 | `apps/gtm/_archive/old-html/simple-html/images/logo-09.svg` | ⏭️ | binary asset |
| 5432 | `apps/gtm/_archive/old-html/simple-html/images/planet-overlay.svg` | ⏭️ | binary asset |
| 5433 | `apps/gtm/_archive/old-html/simple-html/images/planet-tag-01.png` | ⏭️ | binary asset |
| 5434 | `apps/gtm/_archive/old-html/simple-html/images/planet-tag-02.png` | ⏭️ | binary asset |
| 5435 | `apps/gtm/_archive/old-html/simple-html/images/planet-tag-03.png` | ⏭️ | binary asset |
| 5436 | `apps/gtm/_archive/old-html/simple-html/images/planet-tag-04.png` | ⏭️ | binary asset |
| 5437 | `apps/gtm/_archive/old-html/simple-html/images/planet.png` | ⏭️ | binary asset |
| 5438 | `apps/gtm/_archive/old-html/simple-html/images/stripes-dark.svg` | ⏭️ | binary asset |
| 5439 | `apps/gtm/_archive/old-html/simple-html/images/stripes.svg` | ⏭️ | binary asset |
| 5440 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-01.jpg` | ⏭️ | binary asset |
| 5441 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-02.jpg` | ⏭️ | binary asset |
| 5442 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-03.jpg` | ⏭️ | binary asset |
| 5443 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-04.jpg` | ⏭️ | binary asset |
| 5444 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-05.jpg` | ⏭️ | binary asset |
| 5445 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-06.jpg` | ⏭️ | binary asset |
| 5446 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-07.jpg` | ⏭️ | binary asset |
| 5447 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-08.jpg` | ⏭️ | binary asset |
| 5448 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-09.jpg` | ⏭️ | binary asset |
| 5449 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-10.jpg` | ⏭️ | binary asset |
| 5450 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-11.jpg` | ⏭️ | binary asset |
| 5451 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-12.jpg` | ⏭️ | binary asset |
| 5452 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-13.jpg` | ⏭️ | binary asset |
| 5453 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-14.jpg` | ⏭️ | binary asset |
| 5454 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-15.jpg` | ⏭️ | binary asset |
| 5455 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-16.jpg` | ⏭️ | binary asset |
| 5456 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-17.jpg` | ⏭️ | binary asset |
| 5457 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-18.jpg` | ⏭️ | binary asset |
| 5458 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-19.jpg` | ⏭️ | binary asset |
| 5459 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-20.jpg` | ⏭️ | binary asset |
| 5460 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-21.jpg` | ⏭️ | binary asset |
| 5461 | `apps/gtm/_archive/old-html/simple-html/images/testimonial-22.jpg` | ⏭️ | binary asset |
| 5462 | `apps/gtm/_archive/old-html/simple-html/images/video-testimonial-01.jpg` | ⏭️ | binary asset |
| 5463 | `apps/gtm/_archive/old-html/simple-html/images/video-testimonial-02.jpg` | ⏭️ | binary asset |
| 5464 | `apps/gtm/_archive/old-html/simple-html/index-chatgpt.html` | ⏳ | pending |
| 5465 | `apps/gtm/_archive/old-html/simple-html/index.html` | ⏳ | pending |
| 5466 | `apps/gtm/_archive/old-html/simple-html/js/main.js` | ⏳ | pending |
| 5467 | `apps/gtm/_archive/old-html/simple-html/js/vendors/alpinejs.min.js` | ⏳ | pending |
| 5468 | `apps/gtm/_archive/old-html/simple-html/js/vendors/aos.js` | ⏳ | pending |
| 5469 | `apps/gtm/_archive/old-html/simple-html/js/vendors/focus.min.js` | ⏳ | pending |
| 5470 | `apps/gtm/_archive/old-html/simple-html/package.json` | ⏳ | pending |
| 5471 | `apps/gtm/_archive/old-html/simple-html/pinegrow.json` | ⏳ | pending |
| 5472 | `apps/gtm/_archive/old-html/simple-html/pricing.html` | ⏳ | pending |
| 5473 | `apps/gtm/_archive/old-html/simple-html/reset-password.html` | ⏳ | pending |
| 5474 | `apps/gtm/_archive/old-html/simple-html/signin.html` | ⏳ | pending |
| 5475 | `apps/gtm/_archive/old-html/simple-html/signup.html` | ⏳ | pending |
| 5476 | `apps/gtm/_archive/old-html/simple-html/style.css` | ⏳ | pending |
| 5477 | `apps/gtm/_archive/old-html/simple-html/support.html` | ⏳ | pending |
| 5478 | `apps/gtm/_archive/old-html/solo-founders-ai-sales-academy.html` | ⏳ | pending |
| 5479 | `apps/gtm/_archive/old-html/solo-founders-ai-startup-academy.html` | ⏳ | pending |
| 5480 | `apps/gtm/_archive/old-html/soloframehub-website-for-design-compatability.html` | ⏳ | pending |
| 5481 | `apps/gtm/_archive/old-logs/test-list.json` | ⏳ | pending |
| 5482 | `apps/gtm/_archive/old-scripts/audit-word-counts.js` | ⏳ | pending |
| 5483 | `apps/gtm/_archive/old-scripts/generate_curriculum.py` | ⏳ | pending |
| 5484 | `apps/gtm/_archive/old-scripts/load-tests/auth-load.js` | ⏳ | pending |
| 5485 | `apps/gtm/_archive/old-scripts/proxy.ts` | ⏳ | pending |
| 5486 | `apps/gtm/_archive/old-scripts/test-audio.webm` | ⏭️ | binary asset |
| 5487 | `apps/gtm/_archive/old-scripts/test-cycle-detection.ts` | ⏳ | pending |
| 5488 | `apps/gtm/_archive/old-scripts/test-integrity.ts` | ⏳ | pending |
| 5489 | `apps/gtm/_archive/old-scripts/test-models.ts` | ⏳ | pending |
| 5490 | `apps/gtm/_archive/old-scripts/test-persistence.ts` | ⏳ | pending |
| 5491 | `apps/gtm/_archive/old-scripts/test-structured-output.ts` | ⏳ | pending |
| 5492 | `apps/gtm/_archive/old-scripts/update-e2e-imports.js` | ⏳ | pending |
| 5493 | `apps/gtm/_archive/old-scripts/update-e2e-tests.sh` | ⏳ | pending |
| 5494 | `apps/gtm/_archive/old-scripts/validate-lessons.mjs` | ⏳ | pending |
| 5495 | `apps/gtm/_archive/old-scripts/verify-rate-limits.ts` | ⏳ | pending |
| 5496 | `apps/gtm/_archive/scripts/list-models.ts.bak` | ⏳ | pending |
| 5497 | `apps/gtm/_archive/scripts/phase-a-ai-validation.ts` | ⏳ | pending |
| 5498 | `apps/gtm/_archive/scripts/phase-a-content-audit.ts` | ⏳ | pending |
| 5499 | `apps/gtm/_archive/scripts/seed-production.ts` | ⏳ | pending |
| 5500 | `apps/gtm/_archive/scripts/seedRoleplayData.ts` | ⏳ | pending |
| 5501 | `apps/gtm/_archive/scripts/setup-vertex-ai.ts` | ⏳ | pending |
| 5502 | `apps/gtm/_archive/scripts/test-ai-layer.ts` | ⏳ | pending |
| 5503 | `apps/gtm/_archive/scripts/test-rag-flows.ts` | ⏳ | pending |
| 5504 | `apps/gtm/_archive/scripts/test-spicy-audit.ts` | ⏳ | pending |
| 5505 | `apps/gtm/_archive/scripts/test-stt-auth.ts` | ⏳ | pending |
| 5506 | `apps/gtm/_archive/scripts/verify-sovereignty.ts` | ⏳ | pending |
| 5507 | `apps/gtm/_archive/trigger-dev/lib-trigger.ts` | ⏳ | pending |
| 5508 | `apps/gtm/_archive/trigger-dev/trigger.config.ts` | ⏳ | pending |
| 5509 | `apps/gtm/_archive/trigger-dev/trigger/batch-create-course.ts` | ⏳ | pending |
| 5510 | `apps/gtm/_archive/trigger-dev/trigger/batch-retrofit.ts` | ⏳ | pending |
| 5511 | `apps/gtm/_archive/trigger-dev/trigger/check-run.ts` | ⏳ | pending |
| 5512 | `apps/gtm/_archive/trigger-dev/trigger/create-lesson.ts` | ⏳ | pending |
| 5513 | `apps/gtm/_archive/trigger-dev/trigger/retrofit-lesson.ts` | ⏳ | pending |
| 5514 | `apps/gtm/_archive/trigger-dev/trigger/test-trigger.ts` | ⏳ | pending |
| 5515 | `apps/gtm/_archive/trigger-dev/trigger/utils/ai-content-client.ts` | ⏳ | pending |
| 5516 | `apps/gtm/_archive/trigger-dev/trigger/utils/component-catalog.ts` | ⏳ | pending |
| 5517 | `apps/gtm/_archive/trigger-dev/trigger/utils/lesson-io.ts` | ⏳ | pending |
| 5518 | `apps/gtm/app/(alternative)/components-library/accordion/page.tsx` | ⏳ | pending |
| 5519 | `apps/gtm/app/(alternative)/components-library/alert/banners-01.tsx` | ⏳ | pending |
| 5520 | `apps/gtm/app/(alternative)/components-library/alert/banners-02.tsx` | ⏳ | pending |
| 5521 | `apps/gtm/app/(alternative)/components-library/alert/notifications.tsx` | ⏳ | pending |
| 5522 | `apps/gtm/app/(alternative)/components-library/alert/page.tsx` | ⏳ | pending |
| 5523 | `apps/gtm/app/(alternative)/components-library/alert/toasts-01.tsx` | ⏳ | pending |
| 5524 | `apps/gtm/app/(alternative)/components-library/alert/toasts-02.tsx` | ⏳ | pending |
| 5525 | `apps/gtm/app/(alternative)/components-library/alert/toasts-03.tsx` | ⏳ | pending |
| 5526 | `apps/gtm/app/(alternative)/components-library/avatar/page.tsx` | ⏳ | pending |
| 5527 | `apps/gtm/app/(alternative)/components-library/badge/page.tsx` | ⏳ | pending |
| 5528 | `apps/gtm/app/(alternative)/components-library/breadcrumb/page.tsx` | ⏳ | pending |
| 5529 | `apps/gtm/app/(alternative)/components-library/button/page.tsx` | ⏳ | pending |
| 5530 | `apps/gtm/app/(alternative)/components-library/dropdown/page.tsx` | ⏳ | pending |
| 5531 | `apps/gtm/app/(alternative)/components-library/form/form-switches.tsx` | ⏳ | pending |
| 5532 | `apps/gtm/app/(alternative)/components-library/form/page.tsx` | ⏳ | pending |
| 5533 | `apps/gtm/app/(alternative)/components-library/icons/page.tsx` | ⏳ | pending |
| 5534 | `apps/gtm/app/(alternative)/components-library/modal/basic-examples.tsx` | ⏳ | pending |
| 5535 | `apps/gtm/app/(alternative)/components-library/modal/feedback-examples.tsx` | ⏳ | pending |
| 5536 | `apps/gtm/app/(alternative)/components-library/modal/page.tsx` | ⏳ | pending |
| 5537 | `apps/gtm/app/(alternative)/components-library/modal/product-examples.tsx` | ⏳ | pending |
| 5538 | `apps/gtm/app/(alternative)/components-library/pagination/page.tsx` | ⏳ | pending |
| 5539 | `apps/gtm/app/(alternative)/components-library/tabs/page.tsx` | ⏳ | pending |
| 5540 | `apps/gtm/app/(alternative)/components-library/tooltip/page.tsx` | ⏳ | pending |
| 5541 | `apps/gtm/app/(alternative)/finance/cards/page.tsx` | ⏳ | pending |
| 5542 | `apps/gtm/app/(alternative)/finance/transactions/page.tsx` | ⏳ | pending |
| 5543 | `apps/gtm/app/(alternative)/finance/transactions/transaction-context.tsx` | ⏳ | pending |
| 5544 | `apps/gtm/app/(alternative)/finance/transactions/transaction-dropdown.tsx` | ⏳ | pending |
| 5545 | `apps/gtm/app/(alternative)/finance/transactions/transaction-panel.tsx` | ⏳ | pending |
| 5546 | `apps/gtm/app/(alternative)/finance/transactions/transactions-properties.tsx` | ⏳ | pending |
| 5547 | `apps/gtm/app/(alternative)/finance/transactions/transactions-table-item.tsx` | ⏳ | pending |
| 5548 | `apps/gtm/app/(alternative)/finance/transactions/transactions-table.tsx` | ⏳ | pending |
| 5549 | `apps/gtm/app/(alternative)/layout.tsx` | ⏳ | pending |
| 5550 | `apps/gtm/app/(alternative)/utility/404/page.tsx` | ⏳ | pending |
| 5551 | `apps/gtm/app/(alternative)/utility/changelog/page.tsx` | ⏳ | pending |
| 5552 | `apps/gtm/app/(alternative)/utility/empty-state/page.tsx` | ⏳ | pending |
| 5553 | `apps/gtm/app/(alternative)/utility/faqs/page.tsx` | ⏳ | pending |
| 5554 | `apps/gtm/app/(alternative)/utility/roadmap/page.tsx` | ⏳ | pending |
| 5555 | `apps/gtm/app/(auth)/auth-header.tsx` | ⏳ | pending |
| 5556 | `apps/gtm/app/(auth)/auth-image.tsx` | ⏳ | pending |
| 5557 | `apps/gtm/app/(auth)/reset-password/page.tsx` | ⏳ | pending |
| 5558 | `apps/gtm/app/(auth)/signin/page.tsx` | ⏳ | pending |
| 5559 | `apps/gtm/app/(auth)/signup/page.tsx` | ⏳ | pending |
| 5560 | `apps/gtm/app/(auth)/verify-email/page.tsx` | ⏳ | pending |
| 5561 | `apps/gtm/app/(book)/book/[chapterSlug]/page.tsx` | ⏳ | pending |
| 5562 | `apps/gtm/app/(book)/book/page.tsx` | ⏳ | pending |
| 5563 | `apps/gtm/app/(book)/layout.tsx` | ⏳ | pending |
| 5564 | `apps/gtm/app/(default)/academy/[courseId]/[lessonId]/page.tsx` | ⏳ | pending |
| 5565 | `apps/gtm/app/(default)/academy/[courseId]/page.tsx` | ⏳ | pending |
| 5566 | `apps/gtm/app/(default)/academy/components/complete-button.tsx` | ⏳ | pending |
| 5567 | `apps/gtm/app/(default)/academy/components/founder-context-panel.tsx` | ⏳ | pending |
| 5568 | `apps/gtm/app/(default)/academy/components/lesson-feedback.tsx` | ⏳ | pending |
| 5569 | `apps/gtm/app/(default)/academy/components/lesson-quiz.test.tsx` | ⏳ | pending |
| 5570 | `apps/gtm/app/(default)/academy/components/lesson-quiz.tsx` | ⏳ | pending |
| 5571 | `apps/gtm/app/(default)/academy/components/personalized-example.tsx` | ⏳ | pending |
| 5572 | `apps/gtm/app/(default)/academy/page.tsx` | ⏳ | pending |
| 5573 | `apps/gtm/app/(default)/academy/tools/icp-builder/icp-builder-form.tsx` | ⏳ | pending |
| 5574 | `apps/gtm/app/(default)/academy/tools/icp-builder/page.tsx` | ⏳ | pending |
| 5575 | `apps/gtm/app/(default)/analytics/page.tsx` | ⏳ | pending |
| 5576 | `apps/gtm/app/(default)/checkout/confirmation/page.tsx` | ⏳ | pending |
| 5577 | `apps/gtm/app/(default)/coach/coaching-chat.tsx` | ⏳ | pending |
| 5578 | `apps/gtm/app/(default)/coach/page.tsx` | ⏳ | pending |
| 5579 | `apps/gtm/app/(default)/community/community-hub.tsx` | ⏳ | pending |
| 5580 | `apps/gtm/app/(default)/community/entrance-survey/entrance-survey-flow.tsx` | ⏳ | pending |
| 5581 | `apps/gtm/app/(default)/community/entrance-survey/page.tsx` | ⏳ | pending |
| 5582 | `apps/gtm/app/(default)/community/feed/[topicId]/page.tsx` | ⏳ | pending |
| 5583 | `apps/gtm/app/(default)/community/feed/[topicId]/topic-detail.tsx` | ⏳ | pending |
| 5584 | `apps/gtm/app/(default)/community/feed/feed-left-content.tsx` | ⏳ | pending |
| 5585 | `apps/gtm/app/(default)/community/feed/feed-posts.tsx` | ⏳ | pending |
| 5586 | `apps/gtm/app/(default)/community/feed/feed-right-content.tsx` | ⏳ | pending |
| 5587 | `apps/gtm/app/(default)/community/feed/new-post-form.tsx` | ⏳ | pending |
| 5588 | `apps/gtm/app/(default)/community/feed/page.tsx` | ⏳ | pending |
| 5589 | `apps/gtm/app/(default)/community/forum/forum-content.tsx` | ⏳ | pending |
| 5590 | `apps/gtm/app/(default)/community/forum/forum-entries.tsx` | ⏳ | pending |
| 5591 | `apps/gtm/app/(default)/community/forum/forum-left-content.tsx` | ⏳ | pending |
| 5592 | `apps/gtm/app/(default)/community/forum/forum-right-content.tsx` | ⏳ | pending |
| 5593 | `apps/gtm/app/(default)/community/forum/page.tsx` | ⏳ | pending |
| 5594 | `apps/gtm/app/(default)/community/forum/post/forum-entry.tsx` | ⏳ | pending |
| 5595 | `apps/gtm/app/(default)/community/forum/post/forum-post-right-content.tsx` | ⏳ | pending |
| 5596 | `apps/gtm/app/(default)/community/forum/post/page.tsx` | ⏳ | pending |
| 5597 | `apps/gtm/app/(default)/community/meetups/meetups-posts.tsx` | ⏳ | pending |
| 5598 | `apps/gtm/app/(default)/community/meetups/page.tsx` | ⏳ | pending |
| 5599 | `apps/gtm/app/(default)/community/meetups/post/page.tsx` | ⏳ | pending |
| 5600 | `apps/gtm/app/(default)/community/page.tsx` | ⏳ | pending |
| 5601 | `apps/gtm/app/(default)/community/pods/[podId]/page.tsx` | ⏳ | pending |
| 5602 | `apps/gtm/app/(default)/community/pods/[podId]/pod-detail.tsx` | ⏳ | pending |
| 5603 | `apps/gtm/app/(default)/community/tab-card.tsx` | ⏳ | pending |
| 5604 | `apps/gtm/app/(default)/community/tile-card.tsx` | ⏳ | pending |
| 5605 | `apps/gtm/app/(default)/community/users-tabs/page.tsx` | ⏳ | pending |
| 5606 | `apps/gtm/app/(default)/community/users-tiles/page.tsx` | ⏳ | pending |
| 5607 | `apps/gtm/app/(default)/dashboard/academy-dashboard.tsx` | ⏳ | pending |
| 5608 | `apps/gtm/app/(default)/dashboard/admin/forms/[id]/admin-form-detail.tsx` | ⏳ | pending |
| 5609 | `apps/gtm/app/(default)/dashboard/admin/forms/[id]/page.tsx` | ⏳ | pending |
| 5610 | `apps/gtm/app/(default)/dashboard/admin/forms/admin-forms-list.tsx` | ⏳ | pending |
| 5611 | `apps/gtm/app/(default)/dashboard/admin/forms/page.tsx` | ⏳ | pending |
| 5612 | `apps/gtm/app/(default)/dashboard/analytics/analytics-card-01.tsx` | ⏳ | pending |
| 5613 | `apps/gtm/app/(default)/dashboard/analytics/analytics-card-02.tsx` | ⏳ | pending |
| 5614 | `apps/gtm/app/(default)/dashboard/analytics/analytics-card-03.tsx` | ⏳ | pending |
| 5615 | `apps/gtm/app/(default)/dashboard/analytics/analytics-card-04.tsx` | ⏳ | pending |
| 5616 | `apps/gtm/app/(default)/dashboard/analytics/analytics-card-05.tsx` | ⏳ | pending |
| 5617 | `apps/gtm/app/(default)/dashboard/analytics/analytics-card-06.tsx` | ⏳ | pending |
| 5618 | `apps/gtm/app/(default)/dashboard/analytics/analytics-card-07.tsx` | ⏳ | pending |
| 5619 | `apps/gtm/app/(default)/dashboard/analytics/analytics-card-08.tsx` | ⏳ | pending |
| 5620 | `apps/gtm/app/(default)/dashboard/analytics/analytics-card-09.tsx` | ⏳ | pending |
| 5621 | `apps/gtm/app/(default)/dashboard/analytics/analytics-card-10.tsx` | ⏳ | pending |
| 5622 | `apps/gtm/app/(default)/dashboard/analytics/analytics-card-11.tsx` | ⏳ | pending |
| 5623 | `apps/gtm/app/(default)/dashboard/analytics/page.tsx` | ⏳ | pending |
| 5624 | `apps/gtm/app/(default)/dashboard/badges/page.tsx` | ⏳ | pending |
| 5625 | `apps/gtm/app/(default)/dashboard/dashboard-card-01.tsx` | ⏳ | pending |
| 5626 | `apps/gtm/app/(default)/dashboard/dashboard-card-02.tsx` | ⏳ | pending |
| 5627 | `apps/gtm/app/(default)/dashboard/dashboard-card-03.tsx` | ⏳ | pending |
| 5628 | `apps/gtm/app/(default)/dashboard/dashboard-card-04.tsx` | ⏳ | pending |
| 5629 | `apps/gtm/app/(default)/dashboard/dashboard-card-05.tsx` | ⏳ | pending |
| 5630 | `apps/gtm/app/(default)/dashboard/dashboard-card-06.tsx` | ⏳ | pending |
| 5631 | `apps/gtm/app/(default)/dashboard/dashboard-card-07.tsx` | ⏳ | pending |
| 5632 | `apps/gtm/app/(default)/dashboard/dashboard-card-08.tsx` | ⏳ | pending |
| 5633 | `apps/gtm/app/(default)/dashboard/dashboard-card-09.tsx` | ⏳ | pending |
| 5634 | `apps/gtm/app/(default)/dashboard/dashboard-card-10.tsx` | ⏳ | pending |
| 5635 | `apps/gtm/app/(default)/dashboard/dashboard-card-11.tsx` | ⏳ | pending |
| 5636 | `apps/gtm/app/(default)/dashboard/fintech/fintech-card-01.tsx` | ⏳ | pending |
| 5637 | `apps/gtm/app/(default)/dashboard/fintech/fintech-card-02.tsx` | ⏳ | pending |
| 5638 | `apps/gtm/app/(default)/dashboard/fintech/fintech-card-03.tsx` | ⏳ | pending |
| 5639 | `apps/gtm/app/(default)/dashboard/fintech/fintech-card-04.tsx` | ⏳ | pending |
| 5640 | `apps/gtm/app/(default)/dashboard/fintech/fintech-card-05.tsx` | ⏳ | pending |
| 5641 | `apps/gtm/app/(default)/dashboard/fintech/fintech-card-06.tsx` | ⏳ | pending |
| 5642 | `apps/gtm/app/(default)/dashboard/fintech/fintech-card-07.tsx` | ⏳ | pending |
| 5643 | `apps/gtm/app/(default)/dashboard/fintech/fintech-card-08.tsx` | ⏳ | pending |
| 5644 | `apps/gtm/app/(default)/dashboard/fintech/fintech-card-09.tsx` | ⏳ | pending |
| 5645 | `apps/gtm/app/(default)/dashboard/fintech/fintech-card-10.tsx` | ⏳ | pending |
| 5646 | `apps/gtm/app/(default)/dashboard/fintech/fintech-card-11.tsx` | ⏳ | pending |
| 5647 | `apps/gtm/app/(default)/dashboard/fintech/fintech-card-12.tsx` | ⏳ | pending |
| 5648 | `apps/gtm/app/(default)/dashboard/fintech/fintech-card-13.tsx` | ⏳ | pending |
| 5649 | `apps/gtm/app/(default)/dashboard/fintech/fintech-card-14.tsx` | ⏳ | pending |
| 5650 | `apps/gtm/app/(default)/dashboard/fintech/fintech-intro.tsx` | ⏳ | pending |
| 5651 | `apps/gtm/app/(default)/dashboard/fintech/page.tsx` | ⏳ | pending |
| 5652 | `apps/gtm/app/(default)/dashboard/founder-brief/page.tsx` | ⏳ | pending |
| 5653 | `apps/gtm/app/(default)/dashboard/founder-brief/print-button.tsx` | ⏳ | pending |
| 5654 | `apps/gtm/app/(default)/dashboard/outreach/outreach-page-client.tsx` | ⏳ | pending |
| 5655 | `apps/gtm/app/(default)/dashboard/outreach/page.tsx` | ⏳ | pending |
| 5656 | `apps/gtm/app/(default)/dashboard/page.tsx` | ⏳ | pending |
| 5657 | `apps/gtm/app/(default)/dashboard/pipeline/page.tsx` | ⏳ | pending |
| 5658 | `apps/gtm/app/(default)/dashboard/pipeline/pipeline-page-client.tsx` | ⏳ | pending |
| 5659 | `apps/gtm/app/(default)/dashboard/playbook/[artifactType]/artifact-detail-view.tsx` | ⏳ | pending |
| 5660 | `apps/gtm/app/(default)/dashboard/playbook/[artifactType]/page.tsx` | ⏳ | pending |
| 5661 | `apps/gtm/app/(default)/dashboard/playbook/page.tsx` | ⏳ | pending |
| 5662 | `apps/gtm/app/(default)/dashboard/roleplay-stats.tsx` | ⏳ | pending |
| 5663 | `apps/gtm/app/(default)/guide/mark-viewed.tsx` | ⏳ | pending |
| 5664 | `apps/gtm/app/(default)/guide/page.tsx` | ⏳ | pending |
| 5665 | `apps/gtm/app/(default)/layout.tsx` | ⏳ | pending |
| 5666 | `apps/gtm/app/(default)/roleplay/page.tsx` | ⏳ | pending |
| 5667 | `apps/gtm/app/(default)/roleplay/roleplay-interface.tsx` | ⏳ | pending |
| 5668 | `apps/gtm/app/(default)/settings/account/account-panel.tsx` | ⏳ | pending |
| 5669 | `apps/gtm/app/(default)/settings/account/page.tsx` | ⏳ | pending |
| 5670 | `apps/gtm/app/(default)/settings/apps/apps-panel.tsx` | ⏳ | pending |
| 5671 | `apps/gtm/app/(default)/settings/apps/page.tsx` | ⏳ | pending |
| 5672 | `apps/gtm/app/(default)/settings/billing/billing-panel.tsx` | ⏳ | pending |
| 5673 | `apps/gtm/app/(default)/settings/billing/page.tsx` | ⏳ | pending |
| 5674 | `apps/gtm/app/(default)/settings/feedback/feedback-panel.tsx` | ⏳ | pending |
| 5675 | `apps/gtm/app/(default)/settings/feedback/page.tsx` | ⏳ | pending |
| 5676 | `apps/gtm/app/(default)/settings/notifications/notifications-panel.tsx` | ⏳ | pending |
| 5677 | `apps/gtm/app/(default)/settings/notifications/page.tsx` | ⏳ | pending |
| 5678 | `apps/gtm/app/(default)/settings/plans/page.tsx` | ⏳ | pending |
| 5679 | `apps/gtm/app/(default)/settings/plans/plans-panel.tsx` | ⏳ | pending |
| 5680 | `apps/gtm/app/(default)/settings/settings-sidebar.tsx` | ⏳ | pending |
| 5681 | `apps/gtm/app/(default)/subscribe/page.tsx` | ⏳ | pending |
| 5682 | `apps/gtm/app/(default)/workshop/[workshopId]/page.tsx` | ⏳ | pending |
| 5683 | `apps/gtm/app/(default)/workshop/[workshopId]/workshop-player.tsx` | ⏳ | pending |
| 5684 | `apps/gtm/app/(docs)/docs/[topic]/[slug]/page.tsx` | ⏳ | pending |
| 5685 | `apps/gtm/app/(docs)/docs/layout.tsx` | ⏳ | pending |
| 5686 | `apps/gtm/app/(docs)/docs/page.tsx` | ⏳ | pending |
| 5687 | `apps/gtm/app/(double-sidebar)/community/profile/page.tsx` | ⏳ | pending |
| 5688 | `apps/gtm/app/(double-sidebar)/community/profile/profile-body.tsx` | ⏳ | pending |
| 5689 | `apps/gtm/app/(double-sidebar)/community/profile/profile-sidebar.tsx` | ⏳ | pending |
| 5690 | `apps/gtm/app/(double-sidebar)/inbox/inbox-body.tsx` | ⏳ | pending |
| 5691 | `apps/gtm/app/(double-sidebar)/inbox/inbox-sidebar.tsx` | ⏳ | pending |
| 5692 | `apps/gtm/app/(double-sidebar)/inbox/mail-item.tsx` | ⏳ | pending |
| 5693 | `apps/gtm/app/(double-sidebar)/inbox/page.tsx` | ⏳ | pending |
| 5694 | `apps/gtm/app/(double-sidebar)/layout.tsx` | ⏳ | pending |
| 5695 | `apps/gtm/app/(double-sidebar)/messages/channels.tsx` | ⏳ | pending |
| 5696 | `apps/gtm/app/(double-sidebar)/messages/direct-messages.tsx` | ⏳ | pending |
| 5697 | `apps/gtm/app/(double-sidebar)/messages/messages-body.tsx` | ⏳ | pending |
| 5698 | `apps/gtm/app/(double-sidebar)/messages/messages-chat.tsx` | ⏳ | pending |
| 5699 | `apps/gtm/app/(double-sidebar)/messages/messages-footer.tsx` | ⏳ | pending |
| 5700 | `apps/gtm/app/(double-sidebar)/messages/messages-header.tsx` | ⏳ | pending |
| 5701 | `apps/gtm/app/(double-sidebar)/messages/messages-sidebar.tsx` | ⏳ | pending |
| 5702 | `apps/gtm/app/(double-sidebar)/messages/page.tsx` | ⏳ | pending |
| 5703 | `apps/gtm/app/(onboarding)/founder-assessment/page.tsx` | ⏳ | pending |
| 5704 | `apps/gtm/app/(onboarding)/onboarding-01/page.tsx` | ⏳ | pending |
| 5705 | `apps/gtm/app/(onboarding)/onboarding-02/page.tsx` | ⏳ | pending |
| 5706 | `apps/gtm/app/(onboarding)/onboarding-03/page.tsx` | ⏳ | pending |
| 5707 | `apps/gtm/app/(onboarding)/onboarding-04/page.tsx` | ⏳ | pending |
| 5708 | `apps/gtm/app/(onboarding)/onboarding-context.tsx` | ⏳ | pending |
| 5709 | `apps/gtm/app/(onboarding)/onboarding-header.tsx` | ⏳ | pending |
| 5710 | `apps/gtm/app/(onboarding)/onboarding-image.tsx` | ⏳ | pending |
| 5711 | `apps/gtm/app/(onboarding)/onboarding-progress.tsx` | ⏳ | pending |
| 5712 | `apps/gtm/app/(onboarding)/onboarding/analyzing/page.tsx` | ⏳ | pending |
| 5713 | `apps/gtm/app/(onboarding)/onboarding/assessment/page.tsx` | ⏳ | pending |
| 5714 | `apps/gtm/app/(onboarding)/onboarding/business/page.tsx` | ⏳ | pending |
| 5715 | `apps/gtm/app/(onboarding)/onboarding/context/page.tsx` | ⏳ | pending |
| 5716 | `apps/gtm/app/(onboarding)/onboarding/goal/page.tsx` | ⏳ | pending |
| 5717 | `apps/gtm/app/(onboarding)/onboarding/layout.tsx` | ⏳ | pending |
| 5718 | `apps/gtm/app/(onboarding)/onboarding/page.tsx` | ⏳ | pending |
| 5719 | `apps/gtm/app/(onboarding)/onboarding/questionnaire/page.tsx` | ⏳ | pending |
| 5720 | `apps/gtm/app/(onboarding)/onboarding/welcome/page.tsx` | ⏳ | pending |
| 5721 | `apps/gtm/app/(pay)/ecommerce/pay/page.tsx` | ⏳ | pending |
| 5722 | `apps/gtm/app/(pay)/ecommerce/pay/pay-form.tsx` | ⏳ | pending |
| 5723 | `apps/gtm/app/(public)/certification/criteria/page.tsx` | ⏳ | pending |
| 5724 | `apps/gtm/app/(public)/certified/page.tsx` | ⏳ | pending |
| 5725 | `apps/gtm/app/(public)/compare/page.tsx` | ⏳ | pending |
| 5726 | `apps/gtm/app/(public)/forms/[slug]/form-client.tsx` | ⏳ | pending |
| 5727 | `apps/gtm/app/(public)/forms/[slug]/page.tsx` | ⏳ | pending |
| 5728 | `apps/gtm/app/(public)/forms/thank-you/page.tsx` | ⏳ | pending |
| 5729 | `apps/gtm/app/(public)/layout.tsx` | ⏳ | pending |
| 5730 | `apps/gtm/app/(public)/readiness-score/page.tsx` | ⏳ | pending |
| 5731 | `apps/gtm/app/(public)/readiness-score/results/page.tsx` | ⏳ | pending |
| 5732 | `apps/gtm/app/(public)/readiness-score/results/readiness-results.tsx` | ⏳ | pending |
| 5733 | `apps/gtm/app/(public)/welcome/page.tsx` | ⏳ | pending |
| 5734 | `apps/gtm/app/api/academy/complete-lesson/route.ts` | ⏳ | pending |
| 5735 | `apps/gtm/app/api/academy/lesson-feedback/route.ts` | ⏳ | pending |
| 5736 | `apps/gtm/app/api/academy/mini-assessment/route.ts` | ⏳ | pending |
| 5737 | `apps/gtm/app/api/academy/quiz/[sectionId]/[courseId]/[lessonId]/route.ts` | ⏳ | pending |
| 5738 | `apps/gtm/app/api/academy/save-artifact/route.ts` | ⏳ | pending |
| 5739 | `apps/gtm/app/api/admin/content-version/route.ts` | ⏳ | pending |
| 5740 | `apps/gtm/app/api/admin/daily-digest/route.ts` | ⏳ | pending |
| 5741 | `apps/gtm/app/api/admin/facilitator/route.ts` | ⏳ | pending |
| 5742 | `apps/gtm/app/api/admin/forms/[id]/route.ts` | ⏳ | pending |
| 5743 | `apps/gtm/app/api/admin/forms/export/route.ts` | ⏳ | pending |
| 5744 | `apps/gtm/app/api/admin/forms/route.ts` | ⏳ | pending |
| 5745 | `apps/gtm/app/api/admin/forum-setup/route.ts` | ⏳ | pending |
| 5746 | `apps/gtm/app/api/admin/forum-sync/route.ts` | ⏳ | pending |
| 5747 | `apps/gtm/app/api/admin/readiness-followup/route.ts` | ⏳ | pending |
| 5748 | `apps/gtm/app/api/admin/seed-demo/route.ts` | ⏳ | pending |
| 5749 | `apps/gtm/app/api/admin/weekly-progress/route.ts` | ⏳ | pending |
| 5750 | `apps/gtm/app/api/ai/chat/route.ts` | ⏳ | pending |
| 5751 | `apps/gtm/app/api/ai/icp-validation/route.ts` | ⏳ | pending |
| 5752 | `apps/gtm/app/api/ai/roleplay/evaluate/route.ts` | ⏳ | pending |
| 5753 | `apps/gtm/app/api/ai/roleplay/route.ts` | ⏳ | pending |
| 5754 | `apps/gtm/app/api/ai/voice/stt/route.ts` | ⏳ | pending |
| 5755 | `apps/gtm/app/api/ai/voice/tts/route.ts` | ⏳ | pending |
| 5756 | `apps/gtm/app/api/ai/workshop/route.ts` | ⏳ | pending |
| 5757 | `apps/gtm/app/api/attio/enrich/route.ts` | ⏳ | pending |
| 5758 | `apps/gtm/app/api/attio/sync/route.ts` | ⏳ | pending |
| 5759 | `apps/gtm/app/api/auth/resend-code/route.ts` | ⏳ | pending |
| 5760 | `apps/gtm/app/api/auth/reset-password/confirm/route.ts` | ⏳ | pending |
| 5761 | `apps/gtm/app/api/auth/reset-password/route.ts` | ⏳ | pending |
| 5762 | `apps/gtm/app/api/auth/session/route.test.ts` | ⏳ | pending |
| 5763 | `apps/gtm/app/api/auth/session/route.ts` | ⏳ | pending |
| 5764 | `apps/gtm/app/api/auth/signin/route.ts` | ⏳ | pending |
| 5765 | `apps/gtm/app/api/auth/signout/route.ts` | ⏳ | pending |
| 5766 | `apps/gtm/app/api/auth/signup/route.ts` | ⏳ | pending |
| 5767 | `apps/gtm/app/api/auth/verify-email/route.ts` | ⏳ | pending |
| 5768 | `apps/gtm/app/api/book/reading-event/route.ts` | ⏳ | pending |
| 5769 | `apps/gtm/app/api/book/search/route.ts` | ⏳ | pending |
| 5770 | `apps/gtm/app/api/certification/check/route.ts` | ⏳ | pending |
| 5771 | `apps/gtm/app/api/checkout/route.ts` | ⏳ | pending |
| 5772 | `apps/gtm/app/api/coaching/dismiss/route.ts` | ⏳ | pending |
| 5773 | `apps/gtm/app/api/community/activity/route.ts` | ⏳ | pending |
| 5774 | `apps/gtm/app/api/community/entrance-survey/route.ts` | ⏳ | pending |
| 5775 | `apps/gtm/app/api/community/feed/[topicId]/route.ts` | ⏳ | pending |
| 5776 | `apps/gtm/app/api/community/feed/[topicId]/vote/route.ts` | ⏳ | pending |
| 5777 | `apps/gtm/app/api/community/feed/create/route.ts` | ⏳ | pending |
| 5778 | `apps/gtm/app/api/community/feed/route.ts` | ⏳ | pending |
| 5779 | `apps/gtm/app/api/community/forum/route.ts` | ⏳ | pending |
| 5780 | `apps/gtm/app/api/community/matching/route.ts` | ⏳ | pending |
| 5781 | `apps/gtm/app/api/community/members/[userId]/route.ts` | ⏳ | pending |
| 5782 | `apps/gtm/app/api/community/pods/[podId]/members/route.ts` | ⏳ | pending |
| 5783 | `apps/gtm/app/api/community/pods/[podId]/route.ts` | ⏳ | pending |
| 5784 | `apps/gtm/app/api/community/pods/route.ts` | ⏳ | pending |
| 5785 | `apps/gtm/app/api/component-state/route.ts` | ⏳ | pending |
| 5786 | `apps/gtm/app/api/dashboard/pitch-day-score/route.ts` | ⏳ | pending |
| 5787 | `apps/gtm/app/api/forms/submit/route.ts` | ⏳ | pending |
| 5788 | `apps/gtm/app/api/health/route.ts` | ⏳ | pending |
| 5789 | `apps/gtm/app/api/hello/route.ts` | ⏳ | pending |
| 5790 | `apps/gtm/app/api/hunter/domain-search/route.ts` | ⏳ | pending |
| 5791 | `apps/gtm/app/api/internal/persona-respond/route.ts` | ⏳ | pending |
| 5792 | `apps/gtm/app/api/locale/route.ts` | ⏳ | pending |
| 5793 | `apps/gtm/app/api/notion/authorize/route.ts` | ⏳ | pending |
| 5794 | `apps/gtm/app/api/notion/callback/route.ts` | ⏳ | pending |
| 5795 | `apps/gtm/app/api/og/route.tsx` | ⏳ | pending |
| 5796 | `apps/gtm/app/api/onboarding/analyze/route.test.ts` | ⏳ | pending |
| 5797 | `apps/gtm/app/api/onboarding/analyze/route.ts` | ⏳ | pending |
| 5798 | `apps/gtm/app/api/onboarding/business/route.test.ts` | ⏳ | pending |
| 5799 | `apps/gtm/app/api/onboarding/business/route.ts` | ⏳ | pending |
| 5800 | `apps/gtm/app/api/onboarding/complete-assessment/route.test.ts` | ⏳ | pending |
| 5801 | `apps/gtm/app/api/onboarding/complete-assessment/route.ts` | ⏳ | pending |
| 5802 | `apps/gtm/app/api/onboarding/complete/route.ts` | ⏳ | pending |
| 5803 | `apps/gtm/app/api/onboarding/context/route.test.ts` | ⏳ | pending |
| 5804 | `apps/gtm/app/api/onboarding/context/route.ts` | ⏳ | pending |
| 5805 | `apps/gtm/app/api/onboarding/goal/route.ts` | ⏳ | pending |
| 5806 | `apps/gtm/app/api/onboarding/industries/route.ts` | ⏳ | pending |
| 5807 | `apps/gtm/app/api/onboarding/questionnaire/route.test.ts` | ⏳ | pending |
| 5808 | `apps/gtm/app/api/onboarding/questionnaire/route.ts` | ⏳ | pending |
| 5809 | `apps/gtm/app/api/onboarding/upload/route.test.ts` | ⏳ | pending |
| 5810 | `apps/gtm/app/api/onboarding/upload/route.ts` | ⏳ | pending |
| 5811 | `apps/gtm/app/api/outreach/[id]/route.ts` | ⏳ | pending |
| 5812 | `apps/gtm/app/api/outreach/route.ts` | ⏳ | pending |
| 5813 | `apps/gtm/app/api/outreach/stats/route.ts` | ⏳ | pending |
| 5814 | `apps/gtm/app/api/pipeline/[id]/move/route.ts` | ⏳ | pending |
| 5815 | `apps/gtm/app/api/pipeline/[id]/route.ts` | ⏳ | pending |
| 5816 | `apps/gtm/app/api/pipeline/route.ts` | ⏳ | pending |
| 5817 | `apps/gtm/app/api/pipeline/stats/route.ts` | ⏳ | pending |
| 5818 | `apps/gtm/app/api/profile/artifacts/route.ts` | ⏳ | pending |
| 5819 | `apps/gtm/app/api/profile/export-notion/route.ts` | ⏳ | pending |
| 5820 | `apps/gtm/app/api/profile/export/route.ts` | ⏳ | pending |
| 5821 | `apps/gtm/app/api/profile/reassess/route.ts` | ⏳ | pending |
| 5822 | `apps/gtm/app/api/profile/route.ts` | ⏳ | pending |
| 5823 | `apps/gtm/app/api/profile/score-history/route.ts` | ⏳ | pending |
| 5824 | `apps/gtm/app/api/roleplay/roles/route.ts` | ⏳ | pending |
| 5825 | `apps/gtm/app/api/settings/connections/[provider]/route.ts` | ⏳ | pending |
| 5826 | `apps/gtm/app/api/settings/connections/route.ts` | ⏳ | pending |
| 5827 | `apps/gtm/app/api/subscription/route.ts` | ⏳ | pending |
| 5828 | `apps/gtm/app/api/test/setup-profile/route.ts` | ⏳ | pending |
| 5829 | `apps/gtm/app/api/webhook/attio/route.ts` | ⏳ | pending |
| 5830 | `apps/gtm/app/api/webhook/polar/route.ts` | ⏳ | pending |
| 5831 | `apps/gtm/app/api/webhooks/nodebb/route.ts` | ⏳ | pending |
| 5832 | `apps/gtm/app/app-provider.tsx` | ⏳ | pending |
| 5833 | `apps/gtm/app/components/landing/hero.tsx` | ⏳ | pending |
| 5834 | `apps/gtm/app/components/landing/track-framework.tsx` | ⏳ | pending |
| 5835 | `apps/gtm/app/css/additional-styles/utility-patterns.css` | ⏳ | pending |
| 5836 | `apps/gtm/app/css/style.css` | ⏳ | pending |
| 5837 | `apps/gtm/app/flyout-context.tsx` | ⏳ | pending |
| 5838 | `apps/gtm/app/layout.tsx` | ⏳ | pending |
| 5839 | `apps/gtm/app/not-found.tsx` | ⏳ | pending |
| 5840 | `apps/gtm/app/page.tsx` | ⏳ | pending |
| 5841 | `apps/gtm/app/selected-items-context.tsx` | ⏳ | pending |
| 5842 | `apps/gtm/app/theme-provider.tsx` | ⏳ | pending |
| 5843 | `apps/gtm/apps/forms/.gitignore` | ⏳ | pending |
| 5844 | `apps/gtm/apps/forms/.npmrc` | ⏳ | pending |
| 5845 | `apps/gtm/apps/forms/Dockerfile` | ⏳ | pending |
| 5846 | `apps/gtm/apps/forms/app/api/forms/submit/route.ts` | ⏳ | pending |
| 5847 | `apps/gtm/apps/forms/app/api/health/route.ts` | ⏳ | pending |
| 5848 | `apps/gtm/apps/forms/app/forms/[slug]/form-client.tsx` | ⏳ | pending |
| 5849 | `apps/gtm/apps/forms/app/forms/[slug]/page.tsx` | ⏳ | pending |
| 5850 | `apps/gtm/apps/forms/app/forms/thank-you/page.tsx` | ⏳ | pending |
| 5851 | `apps/gtm/apps/forms/app/globals.css` | ⏳ | pending |
| 5852 | `apps/gtm/apps/forms/app/layout.tsx` | ⏳ | pending |
| 5853 | `apps/gtm/apps/forms/app/not-found.tsx` | ⏳ | pending |
| 5854 | `apps/gtm/apps/forms/app/page.tsx` | ⏳ | pending |
| 5855 | `apps/gtm/apps/forms/components/form-field.tsx` | ⏳ | pending |
| 5856 | `apps/gtm/apps/forms/components/form-honeypot.tsx` | ⏳ | pending |
| 5857 | `apps/gtm/apps/forms/entrypoint.js` | ⏳ | pending |
| 5858 | `apps/gtm/apps/forms/lib/db.ts` | ⏳ | pending |
| 5859 | `apps/gtm/apps/forms/lib/forms/definitions.ts` | ⏳ | pending |
| 5860 | `apps/gtm/apps/forms/lib/forms/scoring.ts` | ⏳ | pending |
| 5861 | `apps/gtm/apps/forms/lib/forms/types.ts` | ⏳ | pending |
| 5862 | `apps/gtm/apps/forms/lib/forms/workflows.ts` | ⏳ | pending |
| 5863 | `apps/gtm/apps/forms/lib/validations/forms.ts` | ⏳ | pending |
| 5864 | `apps/gtm/apps/forms/next.config.js` | ⏳ | pending |
| 5865 | `apps/gtm/apps/forms/package.json` | ⏳ | pending |
| 5866 | `apps/gtm/apps/forms/postcss.config.js` | ⏳ | pending |
| 5867 | `apps/gtm/apps/forms/public/.gitkeep` | ⏳ | pending |
| 5868 | `apps/gtm/apps/forms/tsconfig.json` | ⏳ | pending |
| 5869 | `apps/gtm/components/accordion-basic.tsx` | ⏳ | pending |
| 5870 | `apps/gtm/components/accordion-table-item.tsx` | ⏳ | pending |
| 5871 | `apps/gtm/components/accordion-table-rich-item.tsx` | ⏳ | pending |
| 5872 | `apps/gtm/components/ai/flyout-chat.tsx` | ⏳ | pending |
| 5873 | `apps/gtm/components/analytics/umami-script.tsx` | ⏳ | pending |
| 5874 | `apps/gtm/components/banner-02.tsx` | ⏳ | pending |
| 5875 | `apps/gtm/components/banner.tsx` | ⏳ | pending |
| 5876 | `apps/gtm/components/book/book-academy-cta.tsx` | ⏳ | pending |
| 5877 | `apps/gtm/components/book/book-paywall.tsx` | ⏳ | pending |
| 5878 | `apps/gtm/components/book/book-search.tsx` | ⏳ | pending |
| 5879 | `apps/gtm/components/book/buy-book-button.tsx` | ⏳ | pending |
| 5880 | `apps/gtm/components/book/chapter-sidebar.tsx` | ⏳ | pending |
| 5881 | `apps/gtm/components/book/mark-read-button.tsx` | ⏳ | pending |
| 5882 | `apps/gtm/components/celebrations/badge-earned-modal.tsx` | ⏳ | pending |
| 5883 | `apps/gtm/components/celebrations/celebration-provider.tsx` | ⏳ | pending |
| 5884 | `apps/gtm/components/celebrations/confetti-burst.tsx` | ⏳ | pending |
| 5885 | `apps/gtm/components/celebrations/level-up-overlay.tsx` | ⏳ | pending |
| 5886 | `apps/gtm/components/celebrations/streak-toast.tsx` | ⏳ | pending |
| 5887 | `apps/gtm/components/channel-menu.tsx` | ⏳ | pending |
| 5888 | `apps/gtm/components/charts/bar-chart-01.tsx` | ⏳ | pending |
| 5889 | `apps/gtm/components/charts/bar-chart-02.tsx` | ⏳ | pending |
| 5890 | `apps/gtm/components/charts/bar-chart-03.tsx` | ⏳ | pending |
| 5891 | `apps/gtm/components/charts/bar-chart-04.tsx` | ⏳ | pending |
| 5892 | `apps/gtm/components/charts/bar-chart-05.tsx` | ⏳ | pending |
| 5893 | `apps/gtm/components/charts/bar-chart-06.tsx` | ⏳ | pending |
| 5894 | `apps/gtm/components/charts/chartjs-config.tsx` | ⏳ | pending |
| 5895 | `apps/gtm/components/charts/doughnut-chart.tsx` | ⏳ | pending |
| 5896 | `apps/gtm/components/charts/line-chart-01.tsx` | ⏳ | pending |
| 5897 | `apps/gtm/components/charts/line-chart-02.tsx` | ⏳ | pending |
| 5898 | `apps/gtm/components/charts/line-chart-03.tsx` | ⏳ | pending |
| 5899 | `apps/gtm/components/charts/line-chart-04.tsx` | ⏳ | pending |
| 5900 | `apps/gtm/components/charts/line-chart-05.tsx` | ⏳ | pending |
| 5901 | `apps/gtm/components/charts/line-chart-06.tsx` | ⏳ | pending |
| 5902 | `apps/gtm/components/charts/line-chart-07.tsx` | ⏳ | pending |
| 5903 | `apps/gtm/components/charts/line-chart-08.tsx` | ⏳ | pending |
| 5904 | `apps/gtm/components/charts/line-chart-09.tsx` | ⏳ | pending |
| 5905 | `apps/gtm/components/charts/pie-chart.tsx` | ⏳ | pending |
| 5906 | `apps/gtm/components/charts/polar-chart.tsx` | ⏳ | pending |
| 5907 | `apps/gtm/components/charts/realtime-chart.tsx` | ⏳ | pending |
| 5908 | `apps/gtm/components/dashboard/acquisition-health.tsx` | ⏳ | pending |
| 5909 | `apps/gtm/components/dashboard/artifact-export-buttons.tsx` | ⏳ | pending |
| 5910 | `apps/gtm/components/dashboard/artifact-status.tsx` | ⏳ | pending |
| 5911 | `apps/gtm/components/dashboard/badge-showcase.tsx` | ⏳ | pending |
| 5912 | `apps/gtm/components/dashboard/channel-activity-bar.tsx` | ⏳ | pending |
| 5913 | `apps/gtm/components/dashboard/coaching-nudges.tsx` | ⏳ | pending |
| 5914 | `apps/gtm/components/dashboard/journey-map.tsx` | ⏳ | pending |
| 5915 | `apps/gtm/components/dashboard/next-actions.tsx` | ⏳ | pending |
| 5916 | `apps/gtm/components/dashboard/outreach-stats-widget.tsx` | ⏳ | pending |
| 5917 | `apps/gtm/components/dashboard/pipeline-summary-widget.tsx` | ⏳ | pending |
| 5918 | `apps/gtm/components/dashboard/pitch-day-score.tsx` | ⏳ | pending |
| 5919 | `apps/gtm/components/dashboard/playbook-card.tsx` | ⏳ | pending |
| 5920 | `apps/gtm/components/dashboard/playbook-progress.tsx` | ⏳ | pending |
| 5921 | `apps/gtm/components/dashboard/score-history.tsx` | ⏳ | pending |
| 5922 | `apps/gtm/components/dashboard/streak-widget.tsx` | ⏳ | pending |
| 5923 | `apps/gtm/components/dashboard/welcome-guide.tsx` | ⏳ | pending |
| 5924 | `apps/gtm/components/dashboard/xp-level-bar.tsx` | ⏳ | pending |
| 5925 | `apps/gtm/components/date-select.tsx` | ⏳ | pending |
| 5926 | `apps/gtm/components/datepicker.tsx` | ⏳ | pending |
| 5927 | `apps/gtm/components/delete-button.tsx` | ⏳ | pending |
| 5928 | `apps/gtm/components/docs-next/.gitignore` | ⏳ | pending |
| 5929 | `apps/gtm/components/docs-next/.vscode/settings.json` | ⏳ | pending |
| 5930 | `apps/gtm/components/docs-next/CHANGELOG.md` | ⏳ | pending |
| 5931 | `apps/gtm/components/docs-next/README.md` | ⏳ | pending |
| 5932 | `apps/gtm/components/docs-next/app/[topic]/[slug]/page.tsx` | ⏳ | pending |
| 5933 | `apps/gtm/components/docs-next/app/api/hello/route.ts` | ⏳ | pending |
| 5934 | `apps/gtm/components/docs-next/app/app-provider.tsx` | ⏳ | pending |
| 5935 | `apps/gtm/components/docs-next/app/css/additional-styles/range-slider.css` | ⏳ | pending |
| 5936 | `apps/gtm/components/docs-next/app/css/additional-styles/theme.css` | ⏳ | pending |
| 5937 | `apps/gtm/components/docs-next/app/css/additional-styles/toggle-switch.css` | ⏳ | pending |
| 5938 | `apps/gtm/components/docs-next/app/css/additional-styles/utility-patterns.css` | ⏳ | pending |
| 5939 | `apps/gtm/components/docs-next/app/css/style.css` | ⏳ | pending |
| 5940 | `apps/gtm/components/docs-next/app/layout.tsx` | ⏳ | pending |
| 5941 | `apps/gtm/components/docs-next/app/page.tsx` | ⏳ | pending |
| 5942 | `apps/gtm/components/docs-next/app/theme-provider.tsx` | ⏳ | pending |
| 5943 | `apps/gtm/components/docs-next/components/mdx/accordion.tsx` | ⏳ | pending |
| 5944 | `apps/gtm/components/docs-next/components/mdx/banner.tsx` | ⏳ | pending |
| 5945 | `apps/gtm/components/docs-next/components/mdx/image.tsx` | ⏳ | pending |
| 5946 | `apps/gtm/components/docs-next/components/mdx/link.tsx` | ⏳ | pending |
| 5947 | `apps/gtm/components/docs-next/components/mdx/mdx.tsx` | ⏳ | pending |
| 5948 | `apps/gtm/components/docs-next/components/mdx/modal-video.tsx` | ⏳ | pending |
| 5949 | `apps/gtm/components/docs-next/components/mdx/table.tsx` | ⏳ | pending |
| 5950 | `apps/gtm/components/docs-next/components/mdx/tag.tsx` | ⏳ | pending |
| 5951 | `apps/gtm/components/docs-next/components/mdx/utils.ts` | ⏳ | pending |
| 5952 | `apps/gtm/components/docs-next/components/ui/feedback.tsx` | ⏳ | pending |
| 5953 | `apps/gtm/components/docs-next/components/ui/footer.tsx` | ⏳ | pending |
| 5954 | `apps/gtm/components/docs-next/components/ui/hamburger.tsx` | ⏳ | pending |
| 5955 | `apps/gtm/components/docs-next/components/ui/header.tsx` | ⏳ | pending |
| 5956 | `apps/gtm/components/docs-next/components/ui/logo.tsx` | ⏳ | pending |
| 5957 | `apps/gtm/components/docs-next/components/ui/page-navigation.tsx` | ⏳ | pending |
| 5958 | `apps/gtm/components/docs-next/components/ui/search-modal.tsx` | ⏳ | pending |
| 5959 | `apps/gtm/components/docs-next/components/ui/search.tsx` | ⏳ | pending |
| 5960 | `apps/gtm/components/docs-next/components/ui/secondary-nav.tsx` | ⏳ | pending |
| 5961 | `apps/gtm/components/docs-next/components/ui/sidebar-link-group.tsx` | ⏳ | pending |
| 5962 | `apps/gtm/components/docs-next/components/ui/sidebar-link-subgroup.tsx` | ⏳ | pending |
| 5963 | `apps/gtm/components/docs-next/components/ui/sidebar-link.tsx` | ⏳ | pending |
| 5964 | `apps/gtm/components/docs-next/components/ui/sidebar.tsx` | ⏳ | pending |
| 5965 | `apps/gtm/components/docs-next/components/ui/theme-toggle.tsx` | ⏳ | pending |
| 5966 | `apps/gtm/components/docs-next/components/ui/topic-title.tsx` | ⏳ | pending |
| 5967 | `apps/gtm/components/docs-next/content/docs/fundamentals.mdx` | ⏳ | pending |
| 5968 | `apps/gtm/components/docs-next/content/docs/how-can-we-help.mdx` | ⏳ | pending |
| 5969 | `apps/gtm/components/docs-next/content/docs/marketing-api-quick-start.mdx` | ⏳ | pending |
| 5970 | `apps/gtm/components/docs-next/next.config.js` | ⏳ | pending |
| 5971 | `apps/gtm/components/docs-next/package.json` | ⏳ | pending |
| 5972 | `apps/gtm/components/docs-next/postcss.config.js` | ⏳ | pending |
| 5973 | `apps/gtm/components/docs-next/public/favicon.ico` | ⏭️ | binary asset |
| 5974 | `apps/gtm/components/docs-next/public/fonts/Aspekta-350.woff2` | ⏭️ | binary asset |
| 5975 | `apps/gtm/components/docs-next/public/fonts/Aspekta-400.woff2` | ⏭️ | binary asset |
| 5976 | `apps/gtm/components/docs-next/public/fonts/Aspekta-500.woff2` | ⏭️ | binary asset |
| 5977 | `apps/gtm/components/docs-next/public/fonts/Aspekta-650.woff2` | ⏭️ | binary asset |
| 5978 | `apps/gtm/components/docs-next/public/images/content-image-01.jpg` | ⏭️ | binary asset |
| 5979 | `apps/gtm/components/docs-next/public/images/content-image-02.jpg` | ⏭️ | binary asset |
| 5980 | `apps/gtm/components/docs-next/public/images/feedback-01.svg` | ⏭️ | binary asset |
| 5981 | `apps/gtm/components/docs-next/public/images/feedback-02.svg` | ⏭️ | binary asset |
| 5982 | `apps/gtm/components/docs-next/public/images/feedback-03.svg` | ⏭️ | binary asset |
| 5983 | `apps/gtm/components/docs-next/public/images/feedback-04.svg` | ⏭️ | binary asset |
| 5984 | `apps/gtm/components/docs-next/public/images/hero-illustration.svg` | ⏭️ | binary asset |
| 5985 | `apps/gtm/components/docs-next/public/images/logo.svg` | ⏭️ | binary asset |
| 5986 | `apps/gtm/components/docs-next/public/videos/video.mp4` | ⏭️ | binary asset |
| 5987 | `apps/gtm/components/docs-next/tsconfig.json` | ⏳ | pending |
| 5988 | `apps/gtm/components/docs/docs-provider.tsx` | ⏳ | pending |
| 5989 | `apps/gtm/components/docs/mdx/docs-accordion.tsx` | ⏳ | pending |
| 5990 | `apps/gtm/components/docs/mdx/docs-banner.tsx` | ⏳ | pending |
| 5991 | `apps/gtm/components/docs/mdx/docs-mdx.tsx` | ⏳ | pending |
| 5992 | `apps/gtm/components/docs/mdx/docs-table.tsx` | ⏳ | pending |
| 5993 | `apps/gtm/components/docs/mdx/docs-tag.tsx` | ⏳ | pending |
| 5994 | `apps/gtm/components/docs/mdx/docs-utils.ts` | ⏳ | pending |
| 5995 | `apps/gtm/components/docs/ui/docs-feedback.tsx` | ⏳ | pending |
| 5996 | `apps/gtm/components/docs/ui/docs-footer.tsx` | ⏳ | pending |
| 5997 | `apps/gtm/components/docs/ui/docs-hamburger.tsx` | ⏳ | pending |
| 5998 | `apps/gtm/components/docs/ui/docs-header.tsx` | ⏳ | pending |
| 5999 | `apps/gtm/components/docs/ui/docs-page-navigation.tsx` | ⏳ | pending |
| 6000 | `apps/gtm/components/docs/ui/docs-search-modal.tsx` | ⏳ | pending |
| 6001 | `apps/gtm/components/docs/ui/docs-search.tsx` | ⏳ | pending |
| 6002 | `apps/gtm/components/docs/ui/docs-secondary-nav.tsx` | ⏳ | pending |
| 6003 | `apps/gtm/components/docs/ui/docs-sidebar-link-group.tsx` | ⏳ | pending |
| 6004 | `apps/gtm/components/docs/ui/docs-sidebar-link.tsx` | ⏳ | pending |
| 6005 | `apps/gtm/components/docs/ui/docs-sidebar.tsx` | ⏳ | pending |
| 6006 | `apps/gtm/components/docs/ui/docs-theme-toggle.tsx` | ⏳ | pending |
| 6007 | `apps/gtm/components/docs/ui/docs-topic-title.tsx` | ⏳ | pending |
| 6008 | `apps/gtm/components/dropdown-filter.tsx` | ⏳ | pending |
| 6009 | `apps/gtm/components/dropdown-full.tsx` | ⏳ | pending |
| 6010 | `apps/gtm/components/dropdown-help.tsx` | ⏳ | pending |
| 6011 | `apps/gtm/components/dropdown-notifications.tsx` | ⏳ | pending |
| 6012 | `apps/gtm/components/dropdown-profile.tsx` | ⏳ | pending |
| 6013 | `apps/gtm/components/dropdown-switch.tsx` | ⏳ | pending |
| 6014 | `apps/gtm/components/edit-menu-card.tsx` | ⏳ | pending |
| 6015 | `apps/gtm/components/edit-menu.tsx` | ⏳ | pending |
| 6016 | `apps/gtm/components/error-boundary.tsx` | ⏳ | pending |
| 6017 | `apps/gtm/components/forms/form-field.tsx` | ⏳ | pending |
| 6018 | `apps/gtm/components/forms/form-honeypot.tsx` | ⏳ | pending |
| 6019 | `apps/gtm/components/locale-switcher.tsx` | ⏳ | pending |
| 6020 | `apps/gtm/components/mdx/ai-lesson-coach.tsx` | ⏳ | pending |
| 6021 | `apps/gtm/components/mdx/artifact-exercise.tsx` | ⏳ | pending |
| 6022 | `apps/gtm/components/mdx/assessment-engine.tsx` | ⏳ | pending |
| 6023 | `apps/gtm/components/mdx/classify-exercise.tsx` | ⏳ | pending |
| 6024 | `apps/gtm/components/mdx/comparison-builder.tsx` | ⏳ | pending |
| 6025 | `apps/gtm/components/mdx/concept-reframe.tsx` | ⏳ | pending |
| 6026 | `apps/gtm/components/mdx/contextual-note.tsx` | ⏳ | pending |
| 6027 | `apps/gtm/components/mdx/decision-tree.tsx` | ⏳ | pending |
| 6028 | `apps/gtm/components/mdx/enhanced-accordion.tsx` | ⏳ | pending |
| 6029 | `apps/gtm/components/mdx/example-card.tsx` | ⏳ | pending |
| 6030 | `apps/gtm/components/mdx/flip-card.tsx` | ⏳ | pending |
| 6031 | `apps/gtm/components/mdx/golden-segment-calculator.tsx` | ⏳ | pending |
| 6032 | `apps/gtm/components/mdx/icp-workshop.tsx` | ⏳ | pending |
| 6033 | `apps/gtm/components/mdx/index.ts` | ⏳ | pending |
| 6034 | `apps/gtm/components/mdx/insight-card.tsx` | ⏳ | pending |
| 6035 | `apps/gtm/components/mdx/interactive-checklist.tsx` | ⏳ | pending |
| 6036 | `apps/gtm/components/mdx/linter-feedback.tsx` | ⏳ | pending |
| 6037 | `apps/gtm/components/mdx/mini-roleplay.tsx` | ⏳ | pending |
| 6038 | `apps/gtm/components/mdx/persona-builder.tsx` | ⏳ | pending |
| 6039 | `apps/gtm/components/mdx/personalized-example.tsx` | ⏳ | pending |
| 6040 | `apps/gtm/components/mdx/prediction-gate.tsx` | ⏳ | pending |
| 6041 | `apps/gtm/components/mdx/progressive-reveal.tsx` | ⏳ | pending |
| 6042 | `apps/gtm/components/mdx/range-slider.tsx` | ⏳ | pending |
| 6043 | `apps/gtm/components/mdx/rewrite-exercise.tsx` | ⏳ | pending |
| 6044 | `apps/gtm/components/mdx/scenario-simulator.tsx` | ⏳ | pending |
| 6045 | `apps/gtm/components/mdx/slide-navigation.tsx` | ⏳ | pending |
| 6046 | `apps/gtm/components/mdx/step-card.tsx` | ⏳ | pending |
| 6047 | `apps/gtm/components/mdx/strategy-duel.tsx` | ⏳ | pending |
| 6048 | `apps/gtm/components/mdx/swipe-decision.tsx` | ⏳ | pending |
| 6049 | `apps/gtm/components/mdx/takeaway-box.tsx` | ⏳ | pending |
| 6050 | `apps/gtm/components/mdx/template-builder.tsx` | ⏳ | pending |
| 6051 | `apps/gtm/components/mdx/timed-challenge.tsx` | ⏳ | pending |
| 6052 | `apps/gtm/components/modal-action.tsx` | ⏳ | pending |
| 6053 | `apps/gtm/components/modal-basic.tsx` | ⏳ | pending |
| 6054 | `apps/gtm/components/modal-blank.tsx` | ⏳ | pending |
| 6055 | `apps/gtm/components/modal-cookies.tsx` | ⏳ | pending |
| 6056 | `apps/gtm/components/notification.tsx` | ⏳ | pending |
| 6057 | `apps/gtm/components/pagination-classic.tsx` | ⏳ | pending |
| 6058 | `apps/gtm/components/pagination-numeric-2.tsx` | ⏳ | pending |
| 6059 | `apps/gtm/components/pagination-numeric.tsx` | ⏳ | pending |
| 6060 | `apps/gtm/components/pwa-registration.tsx` | ⏳ | pending |
| 6061 | `apps/gtm/components/query-provider.tsx` | ⏳ | pending |
| 6062 | `apps/gtm/components/search-form.test.tsx` | ⏳ | pending |
| 6063 | `apps/gtm/components/search-form.tsx` | ⏳ | pending |
| 6064 | `apps/gtm/components/search-modal.tsx` | ⏳ | pending |
| 6065 | `apps/gtm/components/theme-toggle.tsx` | ⏳ | pending |
| 6066 | `apps/gtm/components/toast-02.tsx` | ⏳ | pending |
| 6067 | `apps/gtm/components/toast-03.tsx` | ⏳ | pending |
| 6068 | `apps/gtm/components/toast.tsx` | ⏳ | pending |
| 6069 | `apps/gtm/components/tooltip.tsx` | ⏳ | pending |
| 6070 | `apps/gtm/components/ui/calendar.tsx` | ⏳ | pending |
| 6071 | `apps/gtm/components/ui/currency-display.tsx` | ⏳ | pending |
| 6072 | `apps/gtm/components/ui/header.test.tsx` | ⏳ | pending |
| 6073 | `apps/gtm/components/ui/header.tsx` | ⏳ | pending |
| 6074 | `apps/gtm/components/ui/interactive-checkbox.tsx` | ⏳ | pending |
| 6075 | `apps/gtm/components/ui/logo.test.tsx` | ⏳ | pending |
| 6076 | `apps/gtm/components/ui/logo.tsx` | ⏳ | pending |
| 6077 | `apps/gtm/components/ui/popover.tsx` | ⏳ | pending |
| 6078 | `apps/gtm/components/ui/sidebar-link-group.tsx` | ⏳ | pending |
| 6079 | `apps/gtm/components/ui/sidebar-link.tsx` | ⏳ | pending |
| 6080 | `apps/gtm/components/ui/sidebar.test.tsx` | ⏳ | pending |
| 6081 | `apps/gtm/components/ui/sidebar.tsx` | ⏳ | pending |
| 6082 | `apps/gtm/components/utils/use-item-selection.tsx` | ⏳ | pending |
| 6083 | `apps/gtm/components/utils/use-window-width.tsx` | ⏳ | pending |
| 6084 | `apps/gtm/components/utils/utils.ts` | ⏳ | pending |
| 6085 | `apps/gtm/content/docs/account-setup.mdx` | ⏳ | pending |
| 6086 | `apps/gtm/content/docs/ai-coaching.mdx` | ⏳ | pending |
| 6087 | `apps/gtm/content/docs/assessments.mdx` | ⏳ | pending |
| 6088 | `apps/gtm/content/docs/course-tracks.mdx` | ⏳ | pending |
| 6089 | `apps/gtm/content/docs/faq.mdx` | ⏳ | pending |
| 6090 | `apps/gtm/content/docs/forum.mdx` | ⏳ | pending |
| 6091 | `apps/gtm/content/docs/how-it-works.mdx` | ⏳ | pending |
| 6092 | `apps/gtm/content/docs/platform-overview.mdx` | ⏳ | pending |
| 6093 | `apps/gtm/content/docs/pods.mdx` | ⏳ | pending |
| 6094 | `apps/gtm/content/docs/pricing.mdx` | ⏳ | pending |
| 6095 | `apps/gtm/content/docs/quick-start.mdx` | ⏳ | pending |
| 6096 | `apps/gtm/content/docs/templates.mdx` | ⏳ | pending |
| 6097 | `apps/gtm/docs/API.md` | ⏳ | pending |
| 6098 | `apps/gtm/docs/ENV-REFERENCE.md` | ⏳ | pending |
| 6099 | `apps/gtm/docs/FORMS-DEPLOYMENT-SUMMARY-2026-02-11.md` | ⏳ | pending |
| 6100 | `apps/gtm/docs/GTM OS Espanol/B. Curriculum Updates by Track (Solo + Small Teams.md` | ⏳ | pending |
| 6101 | `apps/gtm/docs/GTM OS Espanol/C. Product &amp; UX Localization (for Early-Stage.md` | ⏳ | pending |
| 6102 | `apps/gtm/docs/GTM OS Espanol/D. Colombia-First + Incubator Fit_Prompt D1 – Colo.md` | ⏳ | pending |
| 6103 | `apps/gtm/docs/GTM OS Espanol/Prompt A1 – LatAm sales culture for solo founders.md` | ⏳ | pending |
| 6104 | `apps/gtm/docs/GTM OS Espanol/Prompt A2 – WhatsApp and conversational commerce a.md` | ⏳ | pending |
| 6105 | `apps/gtm/docs/GTM OS Espanol/Prompt A3 – Email + LinkedIn vs WhatsApp in LatAm.md` | ⏳ | pending |
| 6106 | `apps/gtm/docs/GTM OS Espanol/Prompt A4 – Country differences inside LatAm (Colo.md` | ⏳ | pending |
| 6107 | `apps/gtm/docs/GTM OS Espanol/Prompt B2 – LatAm-specific GTM examples for Market.md` | ⏳ | pending |
| 6108 | `apps/gtm/docs/GTM OS Espanol/Prompt B3 – Objection library &amp; roleplays loca.md` | ⏳ | pending |
| 6109 | `apps/gtm/docs/GTM OS Espanol/Prompt B4 – Creator &amp; SME funnels in LatAm for.md` | ⏳ | pending |
| 6110 | `apps/gtm/docs/GTM OS Espanol/Prompt B5 – Customer success &amp; retention for L.md` | ⏳ | pending |
| 6111 | `apps/gtm/docs/GTM OS Espanol/Prompt C2 – Currency, pricing examples, and financ.md` | ⏳ | pending |
| 6112 | `apps/gtm/docs/GTM OS Espanol/Prompt C3 – Channel emphasis in UI &amp; workflows.md` | ⏳ | pending |
| 6113 | `apps/gtm/docs/GTM OS Espanol/Prompt D2 – What incubators_accelerators want from.md` | ⏳ | pending |
| 6114 | `apps/gtm/docs/GTM OS Espanol/Prompt D3 – Cohort program design using Solo GTM O.md` | ⏳ | pending |
| 6115 | `apps/gtm/docs/GTM OS Espanol/as of april 3, 2026, $100 usd = 364,789.90 cop.md` | ⏳ | pending |
| 6116 | `apps/gtm/docs/INTERACTIVE-AND-VISUAL-DESIGN-EXAMPLES.MD` | ⏳ | pending |
| 6117 | `apps/gtm/docs/PROJECT_OVERVIEW.md` | ⏳ | pending |
| 6118 | `apps/gtm/docs/PageSpeed Insights-desktopo.pdf` | ⏭️ | binary asset |
| 6119 | `apps/gtm/docs/PageSpeed Insights.pdf` | ⏭️ | binary asset |
| 6120 | `apps/gtm/docs/TRANSITION-TARGET.md` | ⏳ | pending |
| 6121 | `apps/gtm/docs/TRIGGER-DEPLOYED.md` | ⏳ | pending |
| 6122 | `apps/gtm/docs/Track 4: AI-Powered Acquisition (7 courses to define)/Prompt 1 – AI Sales Strategy (2026)_Working course.md` | ⏳ | pending |
| 6123 | `apps/gtm/docs/Track 4: AI-Powered Acquisition (7 courses to define)/Prompt 2 – Email Deliverability &amp; Infrastructu.md` | ⏳ | pending |
| 6124 | `apps/gtm/docs/Track 4: AI-Powered Acquisition (7 courses to define)/Prompt 3 – AI Lead Research &amp; Enrichment_Worki.md` | ⏳ | pending |
| 6125 | `apps/gtm/docs/Track 4: AI-Powered Acquisition (7 courses to define)/Prompt 4 – AI Outreach Automation_Working course t.md` | ⏳ | pending |
| 6126 | `apps/gtm/docs/Track 4: AI-Powered Acquisition (7 courses to define)/Prompt 5 – LinkedIn AI Tools (2026)_Working course.md` | ⏳ | pending |
| 6127 | `apps/gtm/docs/Track 4: AI-Powered Acquisition (7 courses to define)/Prompt 6 – Autonomous SDR _ AI Agents for Sales_Wo (1).md` | ⏳ | pending |
| 6128 | `apps/gtm/docs/Track 4: AI-Powered Acquisition (7 courses to define)/Prompt 6 – Autonomous SDR _ AI Agents for Sales_Wo.md` | ⏳ | pending |
| 6129 | `apps/gtm/docs/Track 4: AI-Powered Acquisition (7 courses to define)/Prompt 7 – Building Custom AI Sales Agents_Working.md` | ⏳ | pending |
| 6130 | `apps/gtm/docs/Track 4: AI-Powered Acquisition (7 courses to define)/Prompt 8 – Customer Onboarding &amp; Retention for.md` | ⏳ | pending |
| 6131 | `apps/gtm/docs/Track 4: AI-Powered Acquisition (7 courses to define)/Prompt 9 – Solo Founder Sales Operations Stack 202.md` | ⏳ | pending |
| 6132 | `apps/gtm/docs/VPS-REARCHITECTURE.md` | ⏳ | pending |
| 6133 | `apps/gtm/docs/WEBSITE-UPDATE-PROMPT.md` | ⏳ | pending |
| 6134 | `apps/gtm/docs/adr/0001-repository-pattern.md` | ⏳ | pending |
| 6135 | `apps/gtm/docs/adr/0002-redis-rate-limiting.md` | ⏳ | pending |
| 6136 | `apps/gtm/docs/caa-architecture.md` | ⏳ | pending |
| 6137 | `apps/gtm/docs/cold-email/campaigns/ai-educators-instantly-sequence-v2.md` | ⏳ | pending |
| 6138 | `apps/gtm/docs/cold-email/campaigns/campaign-1-ai-educators-youtube.md` | ⏳ | pending |
| 6139 | `apps/gtm/docs/cold-email/campaigns/campaign-3-technical-purists-sf-v2.md` | ⏳ | pending |
| 6140 | `apps/gtm/docs/cold-email/campaigns/campaign-4-founders-west-coast-v2.md` | ⏳ | pending |
| 6141 | `apps/gtm/docs/cold-email/campaigns/linkedin-claude-code-post.md` | ⏳ | pending |
| 6142 | `apps/gtm/docs/development-guide.md` | ⏳ | pending |
| 6143 | `apps/gtm/docs/dokploy-conversion/DOKPLOY-API-REFERENCE.md` | ⏳ | pending |
| 6144 | `apps/gtm/docs/dokploy-conversion/dokploy-ai-troublehooting.md` | ⏳ | pending |
| 6145 | `apps/gtm/docs/dokploy-conversion/dokploy-mcp-config.md` | ⏳ | pending |
| 6146 | `apps/gtm/docs/dokploy-conversion/secure-dokploy.md` | ⏳ | pending |
| 6147 | `apps/gtm/docs/dokploy-guide-for-ai.md` | ⏳ | pending |
| 6148 | `apps/gtm/docs/interactive-mdx-components.md` | ⏳ | pending |
| 6149 | `apps/gtm/docs/manuscript/00a-introduction.md` | ⏳ | pending |
| 6150 | `apps/gtm/docs/manuscript/00b-how-to-use-this-book.md` | ⏳ | pending |
| 6151 | `apps/gtm/docs/manuscript/00c-part-01-header.md` | ⏳ | pending |
| 6152 | `apps/gtm/docs/manuscript/01-chapter-01.md` | ⏳ | pending |
| 6153 | `apps/gtm/docs/manuscript/02-chapter-02.md` | ⏳ | pending |
| 6154 | `apps/gtm/docs/manuscript/03-chapter-03.md` | ⏳ | pending |
| 6155 | `apps/gtm/docs/manuscript/03a-part-02-header.md` | ⏳ | pending |
| 6156 | `apps/gtm/docs/manuscript/04-chapter-04.md` | ⏳ | pending |
| 6157 | `apps/gtm/docs/manuscript/05-chapter-05.md` | ⏳ | pending |
| 6158 | `apps/gtm/docs/manuscript/06-chapter-06.md` | ⏳ | pending |
| 6159 | `apps/gtm/docs/manuscript/07-chapter-07.md` | ⏳ | pending |
| 6160 | `apps/gtm/docs/manuscript/07a-part-03-header.md` | ⏳ | pending |
| 6161 | `apps/gtm/docs/manuscript/08-chapter-08.md` | ⏳ | pending |
| 6162 | `apps/gtm/docs/manuscript/09-chapter-09.md` | ⏳ | pending |
| 6163 | `apps/gtm/docs/manuscript/10-chapter-10.md` | ⏳ | pending |
| 6164 | `apps/gtm/docs/manuscript/10.5-appendix-playbook-examples.md` | ⏳ | pending |
| 6165 | `apps/gtm/docs/manuscript/11-chapter-11.md` | ⏳ | pending |
| 6166 | `apps/gtm/docs/manuscript/12-chapter-12.md` | ⏳ | pending |
| 6167 | `apps/gtm/docs/manuscript/12a-part-04-header.md` | ⏳ | pending |
| 6168 | `apps/gtm/docs/manuscript/13-chapter-13.md` | ⏳ | pending |
| 6169 | `apps/gtm/docs/manuscript/14-chapter-14.md` | ⏳ | pending |
| 6170 | `apps/gtm/docs/manuscript/15-chapter-15.md` | ⏳ | pending |
| 6171 | `apps/gtm/docs/manuscript/16-next-30-days.md` | ⏳ | pending |
| 6172 | `apps/gtm/docs/manuscript/ABOUT-THE-AUTHOR.md` | ⏳ | pending |
| 6173 | `apps/gtm/docs/manuscript/APPENDIX-FRAMEWORK-INDEX.md` | ⏳ | pending |
| 6174 | `apps/gtm/docs/manuscript/APPENDIX-GLOSSARY.md` | ⏳ | pending |
| 6175 | `apps/gtm/docs/manuscript/APPENDIX-SOURCES-CITATIONS.md` | ⏳ | pending |
| 6176 | `apps/gtm/docs/manuscript/CONTINUE-YOUR-JOURNEY.md` | ⏳ | pending |
| 6177 | `apps/gtm/docs/manuscript/COPYRIGHT-PAGE.md` | ⏳ | pending |
| 6178 | `apps/gtm/docs/manuscript/HALF-TITLE.md` | ⏳ | pending |
| 6179 | `apps/gtm/docs/manuscript/TABLE-OF-CONTENTS.md` | ⏳ | pending |
| 6180 | `apps/gtm/docs/manuscript/TITLE-PAGE.md` | ⏳ | pending |
| 6181 | `apps/gtm/docs/manuscript/visuals/Figure 10.3- The Multi-Touch Newsletter Journey.jpg` | ⏭️ | binary asset |
| 6182 | `apps/gtm/docs/manuscript/visuals/Figure 10.3-The Multi-Touch-Newsletter-Journey.jpg` | ⏭️ | binary asset |
| 6183 | `apps/gtm/docs/manuscript/visuals/Figure-1.1-Identity-Threat-Framework.jpg` | ⏭️ | binary asset |
| 6184 | `apps/gtm/docs/manuscript/visuals/Figure-10.1-Playbook-Selection.jpg` | ⏭️ | binary asset |
| 6185 | `apps/gtm/docs/manuscript/visuals/Figure-10.2-Playbook-Progression.jpg` | ⏭️ | binary asset |
| 6186 | `apps/gtm/docs/manuscript/visuals/Figure-10.3-The Multi-Touch-Newsletter-Journey.jpg` | ⏭️ | binary asset |
| 6187 | `apps/gtm/docs/manuscript/visuals/Figure-12.1-Weekly-Rhythm.jpg` | ⏭️ | binary asset |
| 6188 | `apps/gtm/docs/manuscript/visuals/Figure-12.2-Neuroscience-Momentum.jpg` | ⏭️ | binary asset |
| 6189 | `apps/gtm/docs/manuscript/visuals/Figure-12.3-Compound-Effect.jpg` | ⏭️ | binary asset |
| 6190 | `apps/gtm/docs/manuscript/visuals/Figure-14.1-AEO-Implementation-Plan.jpg` | ⏭️ | binary asset |
| 6191 | `apps/gtm/docs/manuscript/visuals/Figure-14.2-PageSpeed-Optimization.png` | ⏭️ | binary asset |
| 6192 | `apps/gtm/docs/manuscript/visuals/Figure-15.1-Proof-Ladder.jpg` | ⏭️ | binary asset |
| 6193 | `apps/gtm/docs/manuscript/visuals/Figure-2.1-ICP-framework.jpg` | ⏭️ | binary asset |
| 6194 | `apps/gtm/docs/manuscript/visuals/Figure-3.1-5-Domain-Infrastructure.jpg` | ⏭️ | binary asset |
| 6195 | `apps/gtm/docs/manuscript/visuals/Figure-3.2-Why-Warmup-Works.jpg` | ⏭️ | binary asset |
| 6196 | `apps/gtm/docs/manuscript/visuals/Figure-3.3-Domain-Warmup.jpg` | ⏭️ | binary asset |
| 6197 | `apps/gtm/docs/manuscript/visuals/Figure-4.1-MVQ-Discovery-Framework.jpg` | ⏭️ | binary asset |
| 6198 | `apps/gtm/docs/manuscript/visuals/Figure-5.1-Value-Anchoring.jpg` | ⏭️ | binary asset |
| 6199 | `apps/gtm/docs/manuscript/visuals/Figure-5.2-Pricing-Tier-Framework.jpg` | ⏭️ | binary asset |
| 6200 | `apps/gtm/docs/manuscript/visuals/Figure-6.1-Retention-Flywheel.jpg` | ⏭️ | binary asset |
| 6201 | `apps/gtm/docs/manuscript/visuals/Figure-6.2-Customer-Health-Score.jpg` | ⏭️ | binary asset |
| 6202 | `apps/gtm/docs/manuscript/visuals/Figure-7.1-Automation-Failure-Matrix.jpg` | ⏭️ | binary asset |
| 6203 | `apps/gtm/docs/manuscript/visuals/Figure-7.2-Automation-Stack.jpg` | ⏭️ | binary asset |
| 6204 | `apps/gtm/docs/manuscript/visuals/Figure-7.2-Kanbox-Results.jpg` | ⏭️ | binary asset |
| 6205 | `apps/gtm/docs/manuscript/visuals/Figure-7.3-email-list-results.jpg` | ⏭️ | binary asset |
| 6206 | `apps/gtm/docs/manuscript/visuals/Figure-7.4-Coolify-1-click-deployment.jpg` | ⏭️ | binary asset |
| 6207 | `apps/gtm/docs/manuscript/visuals/Figure-7.5-n8n-Workflow.jpg` | ⏭️ | binary asset |
| 6208 | `apps/gtm/docs/manuscript/visuals/Figure-8.1-LTV-CAC-Benchmarks.jpg` | ⏭️ | binary asset |
| 6209 | `apps/gtm/docs/manuscript/visuals/Figure-8.2-Essential-Dashboard.jpg` | ⏭️ | binary asset |
| 6210 | `apps/gtm/docs/manuscript/visuals/Figure-9.1-Emotional-Logical-Split.jpg` | ⏭️ | binary asset |
| 6211 | `apps/gtm/docs/manuscript/visuals/Figure-I.1-Solo-Founder-Constraint-Triangle.jpg` | ⏭️ | binary asset |
| 6212 | `apps/gtm/docs/manuscript/visuals/Figure-P.1-Book-Journey-Map.jpg` | ⏭️ | binary asset |
| 6213 | `apps/gtm/docs/manuscript/visuals/coolify-dashboard.jpg` | ⏭️ | binary asset |
| 6214 | `apps/gtm/docs/manuscript/visuals/cover-solo-founders-customer-acquisition-paybook-cover.jpg` | ⏭️ | binary asset |
| 6215 | `apps/gtm/docs/manuscript/visuals/customer-acquisition-cover-ebook-final.jpg` | ⏭️ | binary asset |
| 6216 | `apps/gtm/docs/manuscript/visuals/instantly-domain-wormup.jpg` | ⏭️ | binary asset |
| 6217 | `apps/gtm/docs/manuscript/visuals/kanbox-enriched-emails.jpg` | ⏭️ | binary asset |
| 6218 | `apps/gtm/docs/manuscript/visuals/mike-sullivan-author-creator-solo-founder.jpg` | ⏭️ | binary asset |
| 6219 | `apps/gtm/docs/manuscript/visuals/page-speed-insights-desktop-after.png` | ⏭️ | binary asset |
| 6220 | `apps/gtm/docs/manuscript/visuals/page-speed-insights-mobile-after.png` | ⏭️ | binary asset |
| 6221 | `apps/gtm/docs/manuscript/visuals/visual-asset-prompts.md` | ⏳ | pending |
| 6222 | `apps/gtm/docs/marketing-relaunch-plan-social-profiles.md` | ⏳ | pending |
| 6223 | `apps/gtm/docs/marketing-relaunch-plan.md` | ⏳ | pending |
| 6224 | `apps/gtm/docs/marketing-setup-prompts.md` | ⏳ | pending |
| 6225 | `apps/gtm/docs/mikes-refernces.txt` | ⏳ | pending |
| 6226 | `apps/gtm/docs/multi-model-ai-setup.md` | ⏳ | pending |
| 6227 | `apps/gtm/docs/platform-product-analysis.md` | ⏳ | pending |
| 6228 | `apps/gtm/docs/platform-report.md` | ⏳ | pending |
| 6229 | `apps/gtm/docs/solo-gtm-perplexity-research.md` | ⏳ | pending |
| 6230 | `apps/gtm/docs/website-reloaded-2/_pginfo/fonts.json` | ⏳ | pending |
| 6231 | `apps/gtm/docs/website-reloaded-2/cohort-forum-research-v2.md` | ⏳ | pending |
| 6232 | `apps/gtm/docs/website-reloaded-2/customer-acquisition-academy-screenshots/caa-ai-help-sidebar.webp.webp` | ⏭️ | binary asset |
| 6233 | `apps/gtm/docs/website-reloaded-2/customer-acquisition-academy-screenshots/caa-lesson-page.webp` | ⏭️ | binary asset |
| 6234 | `apps/gtm/docs/website-reloaded-2/customer-acquisition-academy-screenshots/caa-onboarding-results.jpg` | ⏭️ | binary asset |
| 6235 | `apps/gtm/docs/website-reloaded-2/customer-acquisition-academy-screenshots/caa-roleplay-simulation-screen.webp` | ⏭️ | binary asset |
| 6236 | `apps/gtm/docs/website-reloaded-2/customer-acquisition-academy-screenshots/caa-sales-simulation-customer-job-role-selector.webp` | ⏭️ | binary asset |
| 6237 | `apps/gtm/docs/website-reloaded-2/customer-acquisition-academy-screenshots/caa-sales-simulation-framework-selector.webp` | ⏭️ | binary asset |
| 6238 | `apps/gtm/docs/website-reloaded-2/customer-acquisition-academy-screenshots/caa-sales-simulation-industry-selector.webp` | ⏭️ | binary asset |
| 6239 | `apps/gtm/docs/website-reloaded-2/customer-acquisition-academy-screenshots/caa-solo-advisor-ai-coach.webp` | ⏭️ | binary asset |
| 6240 | `apps/gtm/docs/website-reloaded-2/customer-acquisition-academy-screenshots/caa-student-dashboard.webp` | ⏭️ | binary asset |
| 6241 | `apps/gtm/docs/website-reloaded-2/customer-acquisition-academy-screenshots/lesson-quizes.webp` | ⏭️ | binary asset |
| 6242 | `apps/gtm/docs/website-reloaded-2/customer-acquisition-academy-screenshots/mike-sullivan-author-creator-solo-founder.webp` | ⏭️ | binary asset |
| 6243 | `apps/gtm/docs/website-reloaded-2/customer-acquisition-academy-screenshots/optimized/caa-lesson-page.webp` | ⏭️ | binary asset |
| 6244 | `apps/gtm/docs/website-reloaded-2/customer-acquisition-academy-screenshots/optimized/caa-onboarding-results.webp` | ⏭️ | binary asset |
| 6245 | `apps/gtm/docs/website-reloaded-2/customer-acquisition-academy-screenshots/optimized/caa-solo-advisor-ai-coach.webp` | ⏭️ | binary asset |
| 6246 | `apps/gtm/docs/website-reloaded-2/customer-acquisition-academy-screenshots/optimized/caa-student-dashboard.webp` | ⏭️ | binary asset |
| 6247 | `apps/gtm/docs/website-reloaded-2/customer-acquisition-academy-screenshots/optimized/lesson-quizes.webp` | ⏭️ | binary asset |
| 6248 | `apps/gtm/docs/website-reloaded-2/email-marketing/1st-50-personalized_emails.csv` | ⏳ | pending |
| 6249 | `apps/gtm/docs/website-reloaded-2/email-marketing/flagged_for_review.csv` | ⏳ | pending |
| 6250 | `apps/gtm/docs/website-reloaded-2/email-marketing/gemini-handoff-prompt.md` | ⏳ | pending |
| 6251 | `apps/gtm/docs/website-reloaded-2/email-marketing/hyper-personalization-prompt.md` | ⏳ | pending |
| 6252 | `apps/gtm/docs/website-reloaded-2/email-marketing/instantly.io-formatting.md` | ⏳ | pending |
| 6253 | `apps/gtm/docs/website-reloaded-2/email-marketing/kanbox-enriched-email-lists.png` | ⏭️ | binary asset |
| 6254 | `apps/gtm/docs/website-reloaded-2/email-marketing/round-1-navigator_1-298.csv` | ⏳ | pending |
| 6255 | `apps/gtm/docs/website-reloaded-2/manuscript/manuscript-combined.md` | ⏳ | pending |
| 6256 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure 10.3- The Multi-Touch Newsletter Journey.jpg` | ⏭️ | binary asset |
| 6257 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure 10.3-The Multi-Touch-Newsletter-Journey.jpg` | ⏭️ | binary asset |
| 6258 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-1.1-Identity-Threat-Framework.jpg` | ⏭️ | binary asset |
| 6259 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-10.1-Playbook-Selection.jpg` | ⏭️ | binary asset |
| 6260 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-10.2-Playbook-Progression.jpg` | ⏭️ | binary asset |
| 6261 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-10.3-The Multi-Touch-Newsletter-Journey.jpg` | ⏭️ | binary asset |
| 6262 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-12.1-Weekly-Rhythm.jpg` | ⏭️ | binary asset |
| 6263 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-12.2-Neuroscience-Momentum.jpg` | ⏭️ | binary asset |
| 6264 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-12.3-Compound-Effect.jpg` | ⏭️ | binary asset |
| 6265 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-14.1-AEO-Implementation-Plan.jpg` | ⏭️ | binary asset |
| 6266 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-14.2-PageSpeed-Optimization.png` | ⏭️ | binary asset |
| 6267 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-15.1-Proof-Ladder.jpg` | ⏭️ | binary asset |
| 6268 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-2.1-ICP-framework.jpg` | ⏭️ | binary asset |
| 6269 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-3.1-5-Domain-Infrastructure.jpg` | ⏭️ | binary asset |
| 6270 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-3.2-Why-Warmup-Works.jpg` | ⏭️ | binary asset |
| 6271 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-3.3-Domain-Warmup.jpg` | ⏭️ | binary asset |
| 6272 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-4.1-MVQ-Discovery-Framework.jpg` | ⏭️ | binary asset |
| 6273 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-5.1-Value-Anchoring.jpg` | ⏭️ | binary asset |
| 6274 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-5.2-Pricing-Tier-Framework.jpg` | ⏭️ | binary asset |
| 6275 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-6.1-Retention-Flywheel.jpg` | ⏭️ | binary asset |
| 6276 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-6.2-Customer-Health-Score.jpg` | ⏭️ | binary asset |
| 6277 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-7.1-Automation-Failure-Matrix.jpg` | ⏭️ | binary asset |
| 6278 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-7.2-Automation-Stack.jpg` | ⏭️ | binary asset |
| 6279 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-7.2-Kanbox-Results.jpg` | ⏭️ | binary asset |
| 6280 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-7.3-email-list-results.jpg` | ⏭️ | binary asset |
| 6281 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-7.4-Coolify-1-click-deployment.jpg` | ⏭️ | binary asset |
| 6282 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-7.5-n8n-Workflow.jpg` | ⏭️ | binary asset |
| 6283 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-8.1-LTV-CAC-Benchmarks.jpg` | ⏭️ | binary asset |
| 6284 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-8.2-Essential-Dashboard.jpg` | ⏭️ | binary asset |
| 6285 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-9.1-Emotional-Logical-Split.jpg` | ⏭️ | binary asset |
| 6286 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-I.1-Solo-Founder-Constraint-Triangle.jpg` | ⏭️ | binary asset |
| 6287 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/Figure-P.1-Book-Journey-Map.jpg` | ⏭️ | binary asset |
| 6288 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/coolify-dashboard.jpg` | ⏭️ | binary asset |
| 6289 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/cover-solo-founders-customer-acquisition-paybook-cover.jpg` | ⏭️ | binary asset |
| 6290 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/customer-acquisition-cover-ebook-final.jpg` | ⏭️ | binary asset |
| 6291 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/instantly-domain-wormup.jpg` | ⏭️ | binary asset |
| 6292 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/kanbox-enriched-emails.jpg` | ⏭️ | binary asset |
| 6293 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/mike-sullivan-author-creator-solo-founder.jpg` | ⏭️ | binary asset |
| 6294 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/page-speed-insights-desktop-after.png` | ⏭️ | binary asset |
| 6295 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/page-speed-insights-mobile-after.png` | ⏭️ | binary asset |
| 6296 | `apps/gtm/docs/website-reloaded-2/manuscript/visuals/visual-asset-prompts.md` | ⏳ | pending |
| 6297 | `apps/gtm/docs/website-reloaded-2/pinegrow.json` | ⏳ | pending |
| 6298 | `apps/gtm/docs/website-reloaded-2/platform-architecture.md` | ⏳ | pending |
| 6299 | `apps/gtm/docs/website-reloaded-2/solo-founders-ai-gtm-academy.md` | ⏳ | pending |
| 6300 | `apps/gtm/docs/website-reloaded-2/soloframehub-website.zip` | ⏭️ | binary asset |
| 6301 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/.htaccess` | ⏳ | pending |
| 6302 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/8-gtm-frameworks-compounding-growth-book.html` | ⏳ | pending |
| 6303 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/es/index_1770744712.html` | ⏳ | pending |
| 6304 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/es/solo-founders-ai-customer-acquisition-playbook_1770744712.html` | ⏳ | pending |
| 6305 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/index_1770744712.html` | ⏳ | pending |
| 6306 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744278.json` | ⏳ | pending |
| 6307 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744336.json` | ⏳ | pending |
| 6308 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744359.json` | ⏳ | pending |
| 6309 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744385.json` | ⏳ | pending |
| 6310 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744405.json` | ⏳ | pending |
| 6311 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744422.json` | ⏳ | pending |
| 6312 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744449.json` | ⏳ | pending |
| 6313 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744450.json` | ⏳ | pending |
| 6314 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744480.json` | ⏳ | pending |
| 6315 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744586.json` | ⏳ | pending |
| 6316 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744587.json` | ⏳ | pending |
| 6317 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744608.json` | ⏳ | pending |
| 6318 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744631.json` | ⏳ | pending |
| 6319 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744652.json` | ⏳ | pending |
| 6320 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744683.json` | ⏳ | pending |
| 6321 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744712.json` | ⏳ | pending |
| 6322 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744716.json` | ⏳ | pending |
| 6323 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744718.json` | ⏳ | pending |
| 6324 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744719.json` | ⏳ | pending |
| 6325 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/pinegrow_1770744721.json` | ⏳ | pending |
| 6326 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/solo-founders-ai-customer-acquisition-academy_1770428125.html` | ⏳ | pending |
| 6327 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pgbackup/solo-founders-ai-customer-acquisition-playbook_1770744712.html` | ⏳ | pending |
| 6328 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pginfo/class.tracker.json` | ⏳ | pending |
| 6329 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/_pginfo/fonts.json` | ⏳ | pending |
| 6330 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/fonts/inter-v12-latin-500.woff2` | ⏭️ | binary asset |
| 6331 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/fonts/inter-v12-latin-600.woff2` | ⏭️ | binary asset |
| 6332 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/fonts/inter-v12-latin-regular.woff2` | ⏭️ | binary asset |
| 6333 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/fonts/poppins-v20-latin-500.woff2` | ⏭️ | binary asset |
| 6334 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/fonts/poppins-v20-latin-600.woff2` | ⏭️ | binary asset |
| 6335 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/fonts/poppins-v20-latin-regular.woff2` | ⏭️ | binary asset |
| 6336 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK book cover.webp` | ⏭️ | binary asset |
| 6337 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK.webp` | ⏭️ | binary asset |
| 6338 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/THE SOLO FOUNDER'S AI DOMINANCE.jpg` | ⏭️ | binary asset |
| 6339 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/THE SOLO FOUNDER'S AI REVOLUTION.jpg` | ⏭️ | binary asset |
| 6340 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/The Solo Founder's Al Playbook.jpg` | ⏭️ | binary asset |
| 6341 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/academy/caa-ai-help-sidebar.webp` | ⏭️ | binary asset |
| 6342 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/academy/caa-lesson-page.webp` | ⏭️ | binary asset |
| 6343 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/academy/caa-onboarding-results.jpg` | ⏭️ | binary asset |
| 6344 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/academy/caa-roleplay-simulation-screen.webp` | ⏭️ | binary asset |
| 6345 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/academy/caa-sales-simulation-customer-job-role-selector.webp` | ⏭️ | binary asset |
| 6346 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/academy/caa-sales-simulation-framework-selector.webp` | ⏭️ | binary asset |
| 6347 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/academy/caa-sales-simulation-industry-selector.webp` | ⏭️ | binary asset |
| 6348 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/academy/caa-solo-advisor-ai-coach.webp` | ⏭️ | binary asset |
| 6349 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/academy/caa-student-dashboard.webp` | ⏭️ | binary asset |
| 6350 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/academy/lesson-quizes.webp` | ⏭️ | binary asset |
| 6351 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/academy/mike-sullivan-author-creator-solo-founder.webp` | ⏭️ | binary asset |
| 6352 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/academy/platform-analytics-intelligence.webp` | ⏭️ | binary asset |
| 6353 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/ai-roleplay-sales-academy.webp` | ⏭️ | binary asset |
| 6354 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/available_at_amazon_en_horizontal.png` | ⏭️ | binary asset |
| 6355 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/customer-acquisition-playbook-cover.webp` | ⏭️ | binary asset |
| 6356 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/icp-builder-mockup.png` | ⏭️ | binary asset |
| 6357 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/integrated-intelligence.webp` | ⏭️ | binary asset |
| 6358 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/mike-sullivan-author-creator.png` | ⏭️ | binary asset |
| 6359 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/pipeline-state-machine-mockup.webp` | ⏭️ | binary asset |
| 6360 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/solo-founders-customer-acquisition-paybook-cover-website.webp` | ⏭️ | binary asset |
| 6361 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/soloframeHubLogo.png` | ⏭️ | binary asset |
| 6362 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/soloframehub-logo-sm.png` | ⏭️ | binary asset |
| 6363 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/soloframehub-logo-w-white.png` | ⏭️ | binary asset |
| 6364 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/soloframehub-site-icon.png` | ⏭️ | binary asset |
| 6365 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/soloframehublogo.jpg` | ⏭️ | binary asset |
| 6366 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/traditional video lesson.jpg` | ⏭️ | binary asset |
| 6367 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/assets/images/traditional-lesson.png` | ⏭️ | binary asset |
| 6368 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/community-forums.html` | ⏳ | pending |
| 6369 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/.htaccess` | ⏳ | pending |
| 6370 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/8-gtm-frameworks-compounding-growth-book.html` | ⏳ | pending |
| 6371 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/community-forums.html` | ⏳ | pending |
| 6372 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/index.html` | ⏳ | pending |
| 6373 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/legal/acceptable-use-policy.html` | ⏳ | pending |
| 6374 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/legal/ai-disclaimer.html` | ⏳ | pending |
| 6375 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/legal/community-guidelines.html` | ⏳ | pending |
| 6376 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/legal/cookie-policy.html` | ⏳ | pending |
| 6377 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/legal/earnings-disclaimer.html` | ⏳ | pending |
| 6378 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/legal/privacy-policy.html` | ⏳ | pending |
| 6379 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/legal/refund-policy.html` | ⏳ | pending |
| 6380 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/legal/terms-of-service.html` | ⏳ | pending |
| 6381 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/platform-architecture.html` | ⏳ | pending |
| 6382 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/solo-founder-apps.html` | ⏳ | pending |
| 6383 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/solo-founders-ai-60-day-roadmap-book.html` | ⏳ | pending |
| 6384 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/solo-founders-ai-customer-acquisition-academy.html` | ⏳ | pending |
| 6385 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/solo-founders-ai-customer-acquisition-playbook.html` | ⏳ | pending |
| 6386 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/solo-founders-ai-gtm-academy.html` | ⏳ | pending |
| 6387 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/es/solo-founders-ai-startup-academy.html` | ⏳ | pending |
| 6388 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/fonts/woff2/fonts.css` | ⏳ | pending |
| 6389 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/fonts/woff2/inter-v20-latin-500.woff2` | ⏭️ | binary asset |
| 6390 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/fonts/woff2/inter-v20-latin-500italic.woff2` | ⏭️ | binary asset |
| 6391 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/fonts/woff2/inter-v20-latin-600.woff2` | ⏭️ | binary asset |
| 6392 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/fonts/woff2/inter-v20-latin-italic.woff2` | ⏭️ | binary asset |
| 6393 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/fonts/woff2/inter-v20-latin-regular.woff2` | ⏭️ | binary asset |
| 6394 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/fonts/woff2/poppins-v24-latin-500.woff2` | ⏭️ | binary asset |
| 6395 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/fonts/woff2/poppins-v24-latin-500italic.woff2` | ⏭️ | binary asset |
| 6396 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/fonts/woff2/poppins-v24-latin-600.woff2` | ⏭️ | binary asset |
| 6397 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/fonts/woff2/poppins-v24-latin-600italic.woff2` | ⏭️ | binary asset |
| 6398 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/fonts/woff2/poppins-v24-latin-italic.woff2` | ⏭️ | binary asset |
| 6399 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/fonts/woff2/poppins-v24-latin-regular.woff2` | ⏭️ | binary asset |
| 6400 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/index 2.html` | ⏳ | pending |
| 6401 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/index-book-cover copy.html` | ⏳ | pending |
| 6402 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/index-es.html` | ⏳ | pending |
| 6403 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/index-real.html` | ⏳ | pending |
| 6404 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/index.html` | ⏳ | pending |
| 6405 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/legal/acceptable-use-policy.html` | ⏳ | pending |
| 6406 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/legal/ai-disclaimer.html` | ⏳ | pending |
| 6407 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/legal/community-guidelines.html` | ⏳ | pending |
| 6408 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/legal/cookie-policy.html` | ⏳ | pending |
| 6409 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/legal/earnings-disclaimer.html` | ⏳ | pending |
| 6410 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/legal/privacy-policy.html` | ⏳ | pending |
| 6411 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/legal/refund-policy.html` | ⏳ | pending |
| 6412 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/legal/terms-of-service.html` | ⏳ | pending |
| 6413 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/pinegrow.json` | ⏳ | pending |
| 6414 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/platform-architecture.html` | ⏳ | pending |
| 6415 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/sitemap.xml` | ⏳ | pending |
| 6416 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/solo-founder-apps.html` | ⏳ | pending |
| 6417 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/solo-founders-ai-60-day-roadmap-book.html` | ⏳ | pending |
| 6418 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/solo-founders-ai-customer-acquisition-academy.html` | ⏳ | pending |
| 6419 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/solo-founders-ai-customer-acquisition-playbook.html` | ⏳ | pending |
| 6420 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/solo-founders-ai-gtm-academy.html` | ⏳ | pending |
| 6421 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/solo-founders-ai-startup-academy.html` | ⏳ | pending |
| 6422 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/src/css/fonts.css` | ⏳ | pending |
| 6423 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/src/css/tailwind-input.css` | ⏳ | pending |
| 6424 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/src/css/tailwind.css` | ⏳ | pending |
| 6425 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/src/index 2.html` | ⏳ | pending |
| 6426 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/src/index-book-cover copy.html` | ⏳ | pending |
| 6427 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/src/index-es.html` | ⏳ | pending |
| 6428 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/src/index.html` | ⏳ | pending |
| 6429 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/src/js/main.js` | ⏳ | pending |
| 6430 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/src/solo-founders-ai-customer-acquisition-academy.html` | ⏳ | pending |
| 6431 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/tailwind.config.js` | ⏳ | pending |
| 6432 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/tailwind_theme/index.html` | ⏳ | pending |
| 6433 | `apps/gtm/docs/website-reloaded-2/soloframehub-website/tailwind_theme/tailwind.css` | ⏳ | pending |
| 6434 | `apps/gtm/drizzle.config.ts` | ⏳ | pending |
| 6435 | `apps/gtm/e2e/auth.spec.ts` | ⏳ | pending |
| 6436 | `apps/gtm/e2e/comprehensive.spec.ts` | ⏳ | pending |
| 6437 | `apps/gtm/e2e/courses.spec.ts` | ⏳ | pending |
| 6438 | `apps/gtm/e2e/dashboard.spec.ts` | ⏳ | pending |
| 6439 | `apps/gtm/e2e/error-handling-and-accessibility.spec.ts` | ⏳ | pending |
| 6440 | `apps/gtm/e2e/fixtures.ts` | ⏳ | pending |
| 6441 | `apps/gtm/e2e/helpers.ts` | ⏳ | pending |
| 6442 | `apps/gtm/e2e/onboarding-full-pipeline.spec.ts` | ⏳ | pending |
| 6443 | `apps/gtm/e2e/onboarding-scenarios.spec.ts` | ⏳ | pending |
| 6444 | `apps/gtm/e2e/onboarding.spec.ts` | ⏳ | pending |
| 6445 | `apps/gtm/e2e/roleplay.spec.ts` | ⏳ | pending |
| 6446 | `apps/gtm/e2e/test-data.ts` | ⏳ | pending |
| 6447 | `apps/gtm/e2e/tools-and-community.spec.ts` | ⏳ | pending |
| 6448 | `apps/gtm/eslint.config.mjs` | ⏳ | pending |
| 6449 | `apps/gtm/hooks/useAudioRecorder.ts` | ⏳ | pending |
| 6450 | `apps/gtm/i18n/request.ts` | ⏳ | pending |
| 6451 | `apps/gtm/lib/ai/client.ts` | ⏳ | pending |
| 6452 | `apps/gtm/lib/ai/digest-nudge.ts` | ⏳ | pending |
| 6453 | `apps/gtm/lib/ai/fetch-helpers.ts` | ⏳ | pending |
| 6454 | `apps/gtm/lib/ai/models.ts` | ⏳ | pending |
| 6455 | `apps/gtm/lib/ai/openai-coaching.ts` | ⏳ | pending |
| 6456 | `apps/gtm/lib/ai/openai-flows.ts` | ⏳ | pending |
| 6457 | `apps/gtm/lib/ai/vectorizer.ts` | ⏳ | pending |
| 6458 | `apps/gtm/lib/analytics/ga4-server.ts` | ⏳ | pending |
| 6459 | `apps/gtm/lib/analytics/ga4.ts` | ⏳ | pending |
| 6460 | `apps/gtm/lib/analytics/umami.ts` | ⏳ | pending |
| 6461 | `apps/gtm/lib/api/admin-auth.ts` | ⏳ | pending |
| 6462 | `apps/gtm/lib/api/client.ts` | ⏳ | pending |
| 6463 | `apps/gtm/lib/api/errors.ts` | ⏳ | pending |
| 6464 | `apps/gtm/lib/api/onboarding-client.ts` | ⏳ | pending |
| 6465 | `apps/gtm/lib/api/query-client.ts` | ⏳ | pending |
| 6466 | `apps/gtm/lib/api/response-utils.ts` | ⏳ | pending |
| 6467 | `apps/gtm/lib/api/with-auth.ts` | ⏳ | pending |
| 6468 | `apps/gtm/lib/attio/client.ts` | ⏳ | pending |
| 6469 | `apps/gtm/lib/attio/types.ts` | ⏳ | pending |
| 6470 | `apps/gtm/lib/auth-lucia.ts` | ⏳ | pending |
| 6471 | `apps/gtm/lib/auth.ts` | ⏳ | pending |
| 6472 | `apps/gtm/lib/badgr/client.ts` | ⏳ | pending |
| 6473 | `apps/gtm/lib/book-access.ts` | ⏳ | pending |
| 6474 | `apps/gtm/lib/book.ts` | ⏳ | pending |
| 6475 | `apps/gtm/lib/brevo/client.ts` | ⏳ | pending |
| 6476 | `apps/gtm/lib/context/FounderContext.tsx` | ⏳ | pending |
| 6477 | `apps/gtm/lib/data/artifact-map.ts` | ⏳ | pending |
| 6478 | `apps/gtm/lib/data/badges.ts` | ⏳ | pending |
| 6479 | `apps/gtm/lib/data/book-structure.ts` | ⏳ | pending |
| 6480 | `apps/gtm/lib/data/content-status.ts` | ⏳ | pending |
| 6481 | `apps/gtm/lib/data/country-variants.ts` | ⏳ | pending |
| 6482 | `apps/gtm/lib/data/currency-config.ts` | ⏳ | pending |
| 6483 | `apps/gtm/lib/data/curriculum.ts` | ⏳ | pending |
| 6484 | `apps/gtm/lib/data/forum-bots.ts` | ⏳ | pending |
| 6485 | `apps/gtm/lib/data/landing-curriculum.ts` | ⏳ | pending |
| 6486 | `apps/gtm/lib/data/latam-objections.ts` | ⏳ | pending |
| 6487 | `apps/gtm/lib/data/onboarding-data.ts` | ⏳ | pending |
| 6488 | `apps/gtm/lib/data/outreach-channels.ts` | ⏳ | pending |
| 6489 | `apps/gtm/lib/data/personas-forum.ts` | ⏳ | pending |
| 6490 | `apps/gtm/lib/data/personas.ts` | ⏳ | pending |
| 6491 | `apps/gtm/lib/data/quick-win.ts` | ⏳ | pending |
| 6492 | `apps/gtm/lib/data/terminology.ts` | ⏳ | pending |
| 6493 | `apps/gtm/lib/data/whatsapp-templates.ts` | ⏳ | pending |
| 6494 | `apps/gtm/lib/data/workshops.ts` | ⏳ | pending |
| 6495 | `apps/gtm/lib/data/xp-levels.ts` | ⏳ | pending |
| 6496 | `apps/gtm/lib/db/index.ts` | ⏳ | pending |
| 6497 | `apps/gtm/lib/db/migrations/003_community_tables.sql` | ⏳ | pending |
| 6498 | `apps/gtm/lib/db/schema.ts` | ⏳ | pending |
| 6499 | `apps/gtm/lib/email/resend.ts` | ⏳ | pending |
| 6500 | `apps/gtm/lib/email/templates/daily-digest.ts` | ⏳ | pending |
| 6501 | `apps/gtm/lib/export/csv-renderer.ts` | ⏳ | pending |
| 6502 | `apps/gtm/lib/export/index.ts` | ⏳ | pending |
| 6503 | `apps/gtm/lib/export/markdown-renderer.ts` | ⏳ | pending |
| 6504 | `apps/gtm/lib/firebase/admin.ts` | ⏳ | pending |
| 6505 | `apps/gtm/lib/firebase/client.ts` | ⏳ | pending |
| 6506 | `apps/gtm/lib/forms/definitions.ts` | ⏳ | pending |
| 6507 | `apps/gtm/lib/forms/scoring.ts` | ⏳ | pending |
| 6508 | `apps/gtm/lib/forms/types.ts` | ⏳ | pending |
| 6509 | `apps/gtm/lib/forms/workflows.ts` | ⏳ | pending |
| 6510 | `apps/gtm/lib/hooks/usePersistedState.ts` | ⏳ | pending |
| 6511 | `apps/gtm/lib/hunter/client.ts` | ⏳ | pending |
| 6512 | `apps/gtm/lib/lessons.ts` | ⏳ | pending |
| 6513 | `apps/gtm/lib/logger.ts` | ⏳ | pending |
| 6514 | `apps/gtm/lib/nodebb/client.ts` | ⏳ | pending |
| 6515 | `apps/gtm/lib/nodebb/types.ts` | ⏳ | pending |
| 6516 | `apps/gtm/lib/notion/block-builder.ts` | ⏳ | pending |
| 6517 | `apps/gtm/lib/notion/client.ts` | ⏳ | pending |
| 6518 | `apps/gtm/lib/notion/types.ts` | ⏳ | pending |
| 6519 | `apps/gtm/lib/pipedrive/client.ts` | ⏳ | pending |
| 6520 | `apps/gtm/lib/prompts/facilitator/friday-synthesis.ts` | ⏳ | pending |
| 6521 | `apps/gtm/lib/prompts/facilitator/mid-week-nudge.ts` | ⏳ | pending |
| 6522 | `apps/gtm/lib/prompts/facilitator/weekly-kickoff.ts` | ⏳ | pending |
| 6523 | `apps/gtm/lib/prompts/personas/alex.ts` | ⏳ | pending |
| 6524 | `apps/gtm/lib/prompts/personas/jordan.ts` | ⏳ | pending |
| 6525 | `apps/gtm/lib/prompts/personas/morgan.ts` | ⏳ | pending |
| 6526 | `apps/gtm/lib/prompts/personas/sam.ts` | ⏳ | pending |
| 6527 | `apps/gtm/lib/redis.ts` | ⏳ | pending |
| 6528 | `apps/gtm/lib/repositories/fileMasterDataRepository.ts` | ⏳ | pending |
| 6529 | `apps/gtm/lib/repositories/masterDataRepository.ts` | ⏳ | pending |
| 6530 | `apps/gtm/lib/repositories/masterDataRepositoryFactory.ts` | ⏳ | pending |
| 6531 | `apps/gtm/lib/repositories/mockMasterDataRepository.ts` | ⏳ | pending |
| 6532 | `apps/gtm/lib/repositories/mockProfileRepository.test.ts` | ⏳ | pending |
| 6533 | `apps/gtm/lib/repositories/mockProfileRepository.ts` | ⏳ | pending |
| 6534 | `apps/gtm/lib/repositories/postgresProfileRepository.ts` | ⏳ | pending |
| 6535 | `apps/gtm/lib/repositories/profileRepository.ts` | ⏳ | pending |
| 6536 | `apps/gtm/lib/security.test.ts` | ⏳ | pending |
| 6537 | `apps/gtm/lib/security.ts` | ⏳ | pending |
| 6538 | `apps/gtm/lib/services/activityFeedService.ts` | ⏳ | pending |
| 6539 | `apps/gtm/lib/services/attioSyncService.ts` | ⏳ | pending |
| 6540 | `apps/gtm/lib/services/badgeService.ts` | ⏳ | pending |
| 6541 | `apps/gtm/lib/services/certificationService.ts` | ⏳ | pending |
| 6542 | `apps/gtm/lib/services/coachingNudgeService.ts` | ⏳ | pending |
| 6543 | `apps/gtm/lib/services/communityService.ts` | ⏳ | pending |
| 6544 | `apps/gtm/lib/services/connectedAccountService.ts` | ⏳ | pending |
| 6545 | `apps/gtm/lib/services/digestService.ts` | ⏳ | pending |
| 6546 | `apps/gtm/lib/services/facilitatorService.ts` | ⏳ | pending |
| 6547 | `apps/gtm/lib/services/forumStructureService.ts` | ⏳ | pending |
| 6548 | `apps/gtm/lib/services/forumSyncService.ts` | ⏳ | pending |
| 6549 | `apps/gtm/lib/services/milestoneService.ts` | ⏳ | pending |
| 6550 | `apps/gtm/lib/services/nodebbUserService.ts` | ⏳ | pending |
| 6551 | `apps/gtm/lib/services/onboardingService.test.ts` | ⏳ | pending |
| 6552 | `apps/gtm/lib/services/onboardingService.ts` | ⏳ | pending |
| 6553 | `apps/gtm/lib/services/outreachService.ts` | ⏳ | pending |
| 6554 | `apps/gtm/lib/services/personaService.ts` | ⏳ | pending |
| 6555 | `apps/gtm/lib/services/pipelineService.ts` | ⏳ | pending |
| 6556 | `apps/gtm/lib/services/pitchDayScoreService.ts` | ⏳ | pending |
| 6557 | `apps/gtm/lib/services/podMatchingService.ts` | ⏳ | pending |
| 6558 | `apps/gtm/lib/services/podService.ts` | ⏳ | pending |
| 6559 | `apps/gtm/lib/services/profileContextService.test.ts` | ⏳ | pending |
| 6560 | `apps/gtm/lib/services/profileContextService.ts` | ⏳ | pending |
| 6561 | `apps/gtm/lib/services/profileCoreService.test.ts` | ⏳ | pending |
| 6562 | `apps/gtm/lib/services/profileCoreService.ts` | ⏳ | pending |
| 6563 | `apps/gtm/lib/services/profileService.test.ts` | ⏳ | pending |
| 6564 | `apps/gtm/lib/services/profileService.ts` | ⏳ | pending |
| 6565 | `apps/gtm/lib/services/quizService.test.ts` | ⏳ | pending |
| 6566 | `apps/gtm/lib/services/quizService.ts` | ⏳ | pending |
| 6567 | `apps/gtm/lib/services/ragService.ts` | ⏳ | pending |
| 6568 | `apps/gtm/lib/services/roleplayPromptBuilder.test.ts` | ⏳ | pending |
| 6569 | `apps/gtm/lib/services/roleplayPromptBuilder.ts` | ⏳ | pending |
| 6570 | `apps/gtm/lib/services/roleplayService.server.test.ts` | ⏳ | pending |
| 6571 | `apps/gtm/lib/services/roleplayService.server.ts` | ⏳ | pending |
| 6572 | `apps/gtm/lib/services/roleplayService.ts` | ⏳ | pending |
| 6573 | `apps/gtm/lib/services/scoreHistoryService.ts` | ⏳ | pending |
| 6574 | `apps/gtm/lib/services/streakService.ts` | ⏳ | pending |
| 6575 | `apps/gtm/lib/services/unlockService.ts` | ⏳ | pending |
| 6576 | `apps/gtm/lib/services/voiceService.test.ts` | ⏳ | pending |
| 6577 | `apps/gtm/lib/services/voiceService.ts` | ⏳ | pending |
| 6578 | `apps/gtm/lib/storage/s3.ts` | ⏳ | pending |
| 6579 | `apps/gtm/lib/utils.ts` | ⏳ | pending |
| 6580 | `apps/gtm/lib/utils/action-routing.ts` | ⏳ | pending |
| 6581 | `apps/gtm/lib/utils/encryption.ts` | ⏳ | pending |
| 6582 | `apps/gtm/lib/utils/object.ts` | ⏳ | pending |
| 6583 | `apps/gtm/lib/validations/academy.ts` | ⏳ | pending |
| 6584 | `apps/gtm/lib/validations/ai.ts` | ⏳ | pending |
| 6585 | `apps/gtm/lib/validations/community.ts` | ⏳ | pending |
| 6586 | `apps/gtm/lib/validations/export.ts` | ⏳ | pending |
| 6587 | `apps/gtm/lib/validations/forms.ts` | ⏳ | pending |
| 6588 | `apps/gtm/lib/validations/onboarding.test.ts` | ⏳ | pending |
| 6589 | `apps/gtm/lib/validations/onboarding.ts` | ⏳ | pending |
| 6590 | `apps/gtm/lib/validations/outreach.ts` | ⏳ | pending |
| 6591 | `apps/gtm/lib/validations/pipeline.ts` | ⏳ | pending |
| 6592 | `apps/gtm/lib/whatsapp/client.ts` | ⏳ | pending |
| 6593 | `apps/gtm/messages/en.json` | ⏳ | pending |
| 6594 | `apps/gtm/messages/es.json` | ⏳ | pending |
| 6595 | `apps/gtm/next-env.d.ts` | ⏳ | pending |
| 6596 | `apps/gtm/next.config.js` | ⏳ | pending |
| 6597 | `apps/gtm/package.json` | ⏳ | pending |
| 6598 | `apps/gtm/playwright.config.ts` | ⏳ | pending |
| 6599 | `apps/gtm/postcss.config.js` | ⏳ | pending |
| 6600 | `apps/gtm/proxy.ts` | ⏳ | pending |
| 6601 | `apps/gtm/public/8-gtm-frameworks-compounding-growth-book.html` | ⏳ | pending |
| 6602 | `apps/gtm/public/assets/fonts/inter-v12-latin-500.woff2` | ⏭️ | binary asset |
| 6603 | `apps/gtm/public/assets/fonts/inter-v12-latin-600.woff2` | ⏭️ | binary asset |
| 6604 | `apps/gtm/public/assets/fonts/inter-v12-latin-regular.woff2` | ⏭️ | binary asset |
| 6605 | `apps/gtm/public/assets/fonts/poppins-v20-latin-500.woff2` | ⏭️ | binary asset |
| 6606 | `apps/gtm/public/assets/fonts/poppins-v20-latin-600.woff2` | ⏭️ | binary asset |
| 6607 | `apps/gtm/public/assets/fonts/poppins-v20-latin-regular.woff2` | ⏭️ | binary asset |
| 6608 | `apps/gtm/public/assets/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK book cover.webp` | ⏭️ | binary asset |
| 6609 | `apps/gtm/public/assets/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK.webp` | ⏭️ | binary asset |
| 6610 | `apps/gtm/public/assets/images/THE SOLO FOUNDER'S AI DOMINANCE.jpg` | ⏭️ | binary asset |
| 6611 | `apps/gtm/public/assets/images/THE SOLO FOUNDER'S AI REVOLUTION.jpg` | ⏭️ | binary asset |
| 6612 | `apps/gtm/public/assets/images/The Solo Founder's Al Playbook.jpg` | ⏭️ | binary asset |
| 6613 | `apps/gtm/public/assets/images/academy/caa-ai-help-sidebar.webp` | ⏭️ | binary asset |
| 6614 | `apps/gtm/public/assets/images/academy/caa-lesson-page.webp` | ⏭️ | binary asset |
| 6615 | `apps/gtm/public/assets/images/academy/caa-onboarding-results.jpg` | ⏭️ | binary asset |
| 6616 | `apps/gtm/public/assets/images/academy/caa-roleplay-simulation-screen.webp` | ⏭️ | binary asset |
| 6617 | `apps/gtm/public/assets/images/academy/caa-sales-simulation-customer-job-role-selector.webp` | ⏭️ | binary asset |
| 6618 | `apps/gtm/public/assets/images/academy/caa-sales-simulation-framework-selector.webp` | ⏭️ | binary asset |
| 6619 | `apps/gtm/public/assets/images/academy/caa-sales-simulation-industry-selector.webp` | ⏭️ | binary asset |
| 6620 | `apps/gtm/public/assets/images/academy/caa-solo-advisor-ai-coach.webp` | ⏭️ | binary asset |
| 6621 | `apps/gtm/public/assets/images/academy/caa-student-dashboard.webp` | ⏭️ | binary asset |
| 6622 | `apps/gtm/public/assets/images/academy/lesson-quizes.webp` | ⏭️ | binary asset |
| 6623 | `apps/gtm/public/assets/images/academy/mike-sullivan-author-creator-solo-founder.webp` | ⏭️ | binary asset |
| 6624 | `apps/gtm/public/assets/images/academy/platform-analytics-intelligence.webp` | ⏭️ | binary asset |
| 6625 | `apps/gtm/public/assets/images/ai-roleplay-sales-academy.webp` | ⏭️ | binary asset |
| 6626 | `apps/gtm/public/assets/images/available_at_amazon_en_horizontal.png` | ⏭️ | binary asset |
| 6627 | `apps/gtm/public/assets/images/available_at_amazon_en_horizontal.webp` | ⏭️ | binary asset |
| 6628 | `apps/gtm/public/assets/images/customer-acquisition-playbook-cover.webp` | ⏭️ | binary asset |
| 6629 | `apps/gtm/public/assets/images/icp-builder-mockup.png` | ⏭️ | binary asset |
| 6630 | `apps/gtm/public/assets/images/integrated-intelligence.webp` | ⏭️ | binary asset |
| 6631 | `apps/gtm/public/assets/images/mike-sullivan-author-creator.png` | ⏭️ | binary asset |
| 6632 | `apps/gtm/public/assets/images/pipeline-state-machine-mockup.webp` | ⏭️ | binary asset |
| 6633 | `apps/gtm/public/assets/images/solo-founders-customer-acquisition-paybook-cover-opt.webp` | ⏭️ | binary asset |
| 6634 | `apps/gtm/public/assets/images/solo-founders-customer-acquisition-paybook-cover-website-opt.webp` | ⏭️ | binary asset |
| 6635 | `apps/gtm/public/assets/images/solo-founders-customer-acquisition-paybook-cover-website.webp` | ⏭️ | binary asset |
| 6636 | `apps/gtm/public/assets/images/soloframeHubLogo-opt.webp` | ⏭️ | binary asset |
| 6637 | `apps/gtm/public/assets/images/soloframeHubLogo.png` | ⏭️ | binary asset |
| 6638 | `apps/gtm/public/assets/images/soloframeHubLogo.webp` | ⏭️ | binary asset |
| 6639 | `apps/gtm/public/assets/images/soloframehub-logo-sm.png` | ⏭️ | binary asset |
| 6640 | `apps/gtm/public/assets/images/soloframehub-logo-sm.webp` | ⏭️ | binary asset |
| 6641 | `apps/gtm/public/assets/images/soloframehub-logo-w-white.png` | ⏭️ | binary asset |
| 6642 | `apps/gtm/public/assets/images/soloframehub-site-icon-opt.png` | ⏭️ | binary asset |
| 6643 | `apps/gtm/public/assets/images/soloframehub-site-icon.png` | ⏭️ | binary asset |
| 6644 | `apps/gtm/public/assets/images/soloframehublogo.jpg` | ⏭️ | binary asset |
| 6645 | `apps/gtm/public/assets/images/traditional video lesson.jpg` | ⏭️ | binary asset |
| 6646 | `apps/gtm/public/assets/images/traditional-lesson.png` | ⏭️ | binary asset |
| 6647 | `apps/gtm/public/blog-byok-integrations.html` | ⏳ | pending |
| 6648 | `apps/gtm/public/blog-certified-solo-gtm.html` | ⏳ | pending |
| 6649 | `apps/gtm/public/blog-quick-win-path.html` | ⏳ | pending |
| 6650 | `apps/gtm/public/blog/ai-tools-b2b-customer-acquisition.html` | ⏳ | pending |
| 6651 | `apps/gtm/public/blog/automate-customer-acquisition-solo-founder.html` | ⏳ | pending |
| 6652 | `apps/gtm/public/blog/b2b-saas-metrics-solo-founders.html` | ⏳ | pending |
| 6653 | `apps/gtm/public/blog/build-ideal-customer-profile-30-minutes.html` | ⏳ | pending |
| 6654 | `apps/gtm/public/blog/cold-email-system-for-technical-founders.html` | ⏳ | pending |
| 6655 | `apps/gtm/public/blog/disc-framework-sell-to-any-buyer-personality.html` | ⏳ | pending |
| 6656 | `apps/gtm/public/blog/first-discovery-call-framework-for-founders.html` | ⏳ | pending |
| 6657 | `apps/gtm/public/blog/from-code-to-customers-engineers-sales-playbook.html` | ⏳ | pending |
| 6658 | `apps/gtm/public/blog/handling-sales-objections-without-being-sleazy.html` | ⏳ | pending |
| 6659 | `apps/gtm/public/blog/index.html` | ⏳ | pending |
| 6660 | `apps/gtm/public/blog/why-engineers-make-better-salespeople.html` | ⏳ | pending |
| 6661 | `apps/gtm/public/community-forums.html` | ⏳ | pending |
| 6662 | `apps/gtm/public/es/.htaccess` | ⏳ | pending |
| 6663 | `apps/gtm/public/es/8-gtm-frameworks-compounding-growth-book.html` | ⏳ | pending |
| 6664 | `apps/gtm/public/es/community-forums.html` | ⏳ | pending |
| 6665 | `apps/gtm/public/es/index.html` | ⏳ | pending |
| 6666 | `apps/gtm/public/es/legal/acceptable-use-policy.html` | ⏳ | pending |
| 6667 | `apps/gtm/public/es/legal/ai-disclaimer.html` | ⏳ | pending |
| 6668 | `apps/gtm/public/es/legal/community-guidelines.html` | ⏳ | pending |
| 6669 | `apps/gtm/public/es/legal/cookie-policy.html` | ⏳ | pending |
| 6670 | `apps/gtm/public/es/legal/earnings-disclaimer.html` | ⏳ | pending |
| 6671 | `apps/gtm/public/es/legal/privacy-policy.html` | ⏳ | pending |
| 6672 | `apps/gtm/public/es/legal/refund-policy.html` | ⏳ | pending |
| 6673 | `apps/gtm/public/es/legal/terms-of-service.html` | ⏳ | pending |
| 6674 | `apps/gtm/public/es/platform-architecture.html` | ⏳ | pending |
| 6675 | `apps/gtm/public/es/solo-founder-apps.html` | ⏳ | pending |
| 6676 | `apps/gtm/public/es/solo-founders-ai-60-day-roadmap-book.html` | ⏳ | pending |
| 6677 | `apps/gtm/public/es/solo-founders-ai-client-acquisition-os.html` | ⏳ | pending |
| 6678 | `apps/gtm/public/es/solo-founders-ai-customer-acquisition-playbook.html` | ⏳ | pending |
| 6679 | `apps/gtm/public/es/solo-founders-ai-gtm-academy.html` | ⏳ | pending |
| 6680 | `apps/gtm/public/es/solo-founders-ai-startup-academy.html` | ⏳ | pending |
| 6681 | `apps/gtm/public/favicon.ico` | ⏭️ | binary asset |
| 6682 | `apps/gtm/public/fonts/woff2/fonts.css` | ⏳ | pending |
| 6683 | `apps/gtm/public/fonts/woff2/inter-v20-latin-500.woff2` | ⏭️ | binary asset |
| 6684 | `apps/gtm/public/fonts/woff2/inter-v20-latin-500italic.woff2` | ⏭️ | binary asset |
| 6685 | `apps/gtm/public/fonts/woff2/inter-v20-latin-600.woff2` | ⏭️ | binary asset |
| 6686 | `apps/gtm/public/fonts/woff2/inter-v20-latin-italic.woff2` | ⏭️ | binary asset |
| 6687 | `apps/gtm/public/fonts/woff2/inter-v20-latin-regular.woff2` | ⏭️ | binary asset |
| 6688 | `apps/gtm/public/fonts/woff2/poppins-v24-latin-500.woff2` | ⏭️ | binary asset |
| 6689 | `apps/gtm/public/fonts/woff2/poppins-v24-latin-500italic.woff2` | ⏭️ | binary asset |
| 6690 | `apps/gtm/public/fonts/woff2/poppins-v24-latin-600.woff2` | ⏭️ | binary asset |
| 6691 | `apps/gtm/public/fonts/woff2/poppins-v24-latin-600italic.woff2` | ⏭️ | binary asset |
| 6692 | `apps/gtm/public/fonts/woff2/poppins-v24-latin-italic.woff2` | ⏭️ | binary asset |
| 6693 | `apps/gtm/public/fonts/woff2/poppins-v24-latin-regular.woff2` | ⏭️ | binary asset |
| 6694 | `apps/gtm/public/home.html` | ⏳ | pending |
| 6695 | `apps/gtm/public/images/404-illustration-dark.svg` | ⏭️ | binary asset |
| 6696 | `apps/gtm/public/images/404-illustration.svg` | ⏭️ | binary asset |
| 6697 | `apps/gtm/public/images/announcement-icon.svg` | ⏭️ | binary asset |
| 6698 | `apps/gtm/public/images/applications-image-01.jpg` | ⏭️ | binary asset |
| 6699 | `apps/gtm/public/images/applications-image-02.jpg` | ⏭️ | binary asset |
| 6700 | `apps/gtm/public/images/applications-image-03.jpg` | ⏭️ | binary asset |
| 6701 | `apps/gtm/public/images/applications-image-04.jpg` | ⏭️ | binary asset |
| 6702 | `apps/gtm/public/images/applications-image-05.jpg` | ⏭️ | binary asset |
| 6703 | `apps/gtm/public/images/applications-image-06.jpg` | ⏭️ | binary asset |
| 6704 | `apps/gtm/public/images/applications-image-07.jpg` | ⏭️ | binary asset |
| 6705 | `apps/gtm/public/images/applications-image-08.jpg` | ⏭️ | binary asset |
| 6706 | `apps/gtm/public/images/applications-image-09.jpg` | ⏭️ | binary asset |
| 6707 | `apps/gtm/public/images/applications-image-10.jpg` | ⏭️ | binary asset |
| 6708 | `apps/gtm/public/images/applications-image-11.jpg` | ⏭️ | binary asset |
| 6709 | `apps/gtm/public/images/applications-image-12.jpg` | ⏭️ | binary asset |
| 6710 | `apps/gtm/public/images/applications-image-13.jpg` | ⏭️ | binary asset |
| 6711 | `apps/gtm/public/images/applications-image-14.jpg` | ⏭️ | binary asset |
| 6712 | `apps/gtm/public/images/applications-image-15.jpg` | ⏭️ | binary asset |
| 6713 | `apps/gtm/public/images/applications-image-16.jpg` | ⏭️ | binary asset |
| 6714 | `apps/gtm/public/images/applications-image-17.jpg` | ⏭️ | binary asset |
| 6715 | `apps/gtm/public/images/applications-image-18.jpg` | ⏭️ | binary asset |
| 6716 | `apps/gtm/public/images/applications-image-19.jpg` | ⏭️ | binary asset |
| 6717 | `apps/gtm/public/images/applications-image-20.jpg` | ⏭️ | binary asset |
| 6718 | `apps/gtm/public/images/applications-image-21.jpg` | ⏭️ | binary asset |
| 6719 | `apps/gtm/public/images/applications-image-22.jpg` | ⏭️ | binary asset |
| 6720 | `apps/gtm/public/images/applications-image-23.jpg` | ⏭️ | binary asset |
| 6721 | `apps/gtm/public/images/applications-image-24.jpg` | ⏭️ | binary asset |
| 6722 | `apps/gtm/public/images/applications-image-25.jpg` | ⏭️ | binary asset |
| 6723 | `apps/gtm/public/images/applications-image-26.jpg` | ⏭️ | binary asset |
| 6724 | `apps/gtm/public/images/applications-image-27.jpg` | ⏭️ | binary asset |
| 6725 | `apps/gtm/public/images/applications-image-28.jpg` | ⏭️ | binary asset |
| 6726 | `apps/gtm/public/images/applications-image-29.jpg` | ⏭️ | binary asset |
| 6727 | `apps/gtm/public/images/applications-image-30.jpg` | ⏭️ | binary asset |
| 6728 | `apps/gtm/public/images/applications-image-31.jpg` | ⏭️ | binary asset |
| 6729 | `apps/gtm/public/images/applications-image-32.jpg` | ⏭️ | binary asset |
| 6730 | `apps/gtm/public/images/auth-image.jpg` | ⏭️ | binary asset |
| 6731 | `apps/gtm/public/images/avatar-01.jpg` | ⏭️ | binary asset |
| 6732 | `apps/gtm/public/images/avatar-02.jpg` | ⏭️ | binary asset |
| 6733 | `apps/gtm/public/images/avatar-03.jpg` | ⏭️ | binary asset |
| 6734 | `apps/gtm/public/images/avatar-04.jpg` | ⏭️ | binary asset |
| 6735 | `apps/gtm/public/images/avatar-05.jpg` | ⏭️ | binary asset |
| 6736 | `apps/gtm/public/images/avatar-06.jpg` | ⏭️ | binary asset |
| 6737 | `apps/gtm/public/images/book/Figure 10.3- The Multi-Touch Newsletter Journey.jpg` | ⏭️ | binary asset |
| 6738 | `apps/gtm/public/images/book/Figure 10.3-The Multi-Touch-Newsletter-Journey.jpg` | ⏭️ | binary asset |
| 6739 | `apps/gtm/public/images/book/Figure-1.1-Identity-Threat-Framework.jpg` | ⏭️ | binary asset |
| 6740 | `apps/gtm/public/images/book/Figure-10.1-Playbook-Selection.jpg` | ⏭️ | binary asset |
| 6741 | `apps/gtm/public/images/book/Figure-10.2-Playbook-Progression.jpg` | ⏭️ | binary asset |
| 6742 | `apps/gtm/public/images/book/Figure-10.3-The Multi-Touch-Newsletter-Journey.jpg` | ⏭️ | binary asset |
| 6743 | `apps/gtm/public/images/book/Figure-12.1-Weekly-Rhythm.jpg` | ⏭️ | binary asset |
| 6744 | `apps/gtm/public/images/book/Figure-12.2-Neuroscience-Momentum.jpg` | ⏭️ | binary asset |
| 6745 | `apps/gtm/public/images/book/Figure-12.3-Compound-Effect.jpg` | ⏭️ | binary asset |
| 6746 | `apps/gtm/public/images/book/Figure-14.1-AEO-Implementation-Plan.jpg` | ⏭️ | binary asset |
| 6747 | `apps/gtm/public/images/book/Figure-14.2-PageSpeed-Optimization.png` | ⏭️ | binary asset |
| 6748 | `apps/gtm/public/images/book/Figure-15.1-Proof-Ladder.jpg` | ⏭️ | binary asset |
| 6749 | `apps/gtm/public/images/book/Figure-2.1-ICP-framework.jpg` | ⏭️ | binary asset |
| 6750 | `apps/gtm/public/images/book/Figure-3.1-5-Domain-Infrastructure.jpg` | ⏭️ | binary asset |
| 6751 | `apps/gtm/public/images/book/Figure-3.2-Why-Warmup-Works.jpg` | ⏭️ | binary asset |
| 6752 | `apps/gtm/public/images/book/Figure-3.3-Domain-Warmup.jpg` | ⏭️ | binary asset |
| 6753 | `apps/gtm/public/images/book/Figure-4.1-MVQ-Discovery-Framework.jpg` | ⏭️ | binary asset |
| 6754 | `apps/gtm/public/images/book/Figure-5.1-Value-Anchoring.jpg` | ⏭️ | binary asset |
| 6755 | `apps/gtm/public/images/book/Figure-5.2-Pricing-Tier-Framework.jpg` | ⏭️ | binary asset |
| 6756 | `apps/gtm/public/images/book/Figure-6.1-Retention-Flywheel.jpg` | ⏭️ | binary asset |
| 6757 | `apps/gtm/public/images/book/Figure-6.2-Customer-Health-Score.jpg` | ⏭️ | binary asset |
| 6758 | `apps/gtm/public/images/book/Figure-7.1-Automation-Failure-Matrix.jpg` | ⏭️ | binary asset |
| 6759 | `apps/gtm/public/images/book/Figure-7.2-Automation-Stack.jpg` | ⏭️ | binary asset |
| 6760 | `apps/gtm/public/images/book/Figure-7.2-Kanbox-Results.jpg` | ⏭️ | binary asset |
| 6761 | `apps/gtm/public/images/book/Figure-7.3-email-list-results.jpg` | ⏭️ | binary asset |
| 6762 | `apps/gtm/public/images/book/Figure-7.4-Coolify-1-click-deployment.jpg` | ⏭️ | binary asset |
| 6763 | `apps/gtm/public/images/book/Figure-7.5-n8n-Workflow.jpg` | ⏭️ | binary asset |
| 6764 | `apps/gtm/public/images/book/Figure-8.1-LTV-CAC-Benchmarks.jpg` | ⏭️ | binary asset |
| 6765 | `apps/gtm/public/images/book/Figure-8.2-Essential-Dashboard.jpg` | ⏭️ | binary asset |
| 6766 | `apps/gtm/public/images/book/Figure-9.1-Emotional-Logical-Split.jpg` | ⏭️ | binary asset |
| 6767 | `apps/gtm/public/images/book/Figure-I.1-Solo-Founder-Constraint-Triangle.jpg` | ⏭️ | binary asset |
| 6768 | `apps/gtm/public/images/book/Figure-P.1-Book-Journey-Map.jpg` | ⏭️ | binary asset |
| 6769 | `apps/gtm/public/images/book/coolify-dashboard.jpg` | ⏭️ | binary asset |
| 6770 | `apps/gtm/public/images/book/cover-solo-founders-customer-acquisition-paybook-cover.jpg` | ⏭️ | binary asset |
| 6771 | `apps/gtm/public/images/book/customer-acquisition-cover-ebook-final.jpg` | ⏭️ | binary asset |
| 6772 | `apps/gtm/public/images/book/instantly-domain-wormup.jpg` | ⏭️ | binary asset |
| 6773 | `apps/gtm/public/images/book/kanbox-enriched-emails.jpg` | ⏭️ | binary asset |
| 6774 | `apps/gtm/public/images/book/mike-sullivan-author-creator-solo-founder.jpg` | ⏭️ | binary asset |
| 6775 | `apps/gtm/public/images/book/page-speed-insights-desktop-after.png` | ⏭️ | binary asset |
| 6776 | `apps/gtm/public/images/book/page-speed-insights-mobile-after.png` | ⏭️ | binary asset |
| 6777 | `apps/gtm/public/images/book/visual-asset-prompts.md` | ⏳ | pending |
| 6778 | `apps/gtm/public/images/channel-01.png` | ⏭️ | binary asset |
| 6779 | `apps/gtm/public/images/channel-02.png` | ⏭️ | binary asset |
| 6780 | `apps/gtm/public/images/channel-03.png` | ⏭️ | binary asset |
| 6781 | `apps/gtm/public/images/chat-image.jpg` | ⏭️ | binary asset |
| 6782 | `apps/gtm/public/images/company-bg.jpg` | ⏭️ | binary asset |
| 6783 | `apps/gtm/public/images/company-icon-01.svg` | ⏭️ | binary asset |
| 6784 | `apps/gtm/public/images/company-icon-02.svg` | ⏭️ | binary asset |
| 6785 | `apps/gtm/public/images/company-icon-03.svg` | ⏭️ | binary asset |
| 6786 | `apps/gtm/public/images/company-icon-04.svg` | ⏭️ | binary asset |
| 6787 | `apps/gtm/public/images/company-icon-05.svg` | ⏭️ | binary asset |
| 6788 | `apps/gtm/public/images/company-icon-06.svg` | ⏭️ | binary asset |
| 6789 | `apps/gtm/public/images/company-icon-07.svg` | ⏭️ | binary asset |
| 6790 | `apps/gtm/public/images/company-icon-08.svg` | ⏭️ | binary asset |
| 6791 | `apps/gtm/public/images/favicon.png` | ⏭️ | binary asset |
| 6792 | `apps/gtm/public/images/feed-image-01.jpg` | ⏭️ | binary asset |
| 6793 | `apps/gtm/public/images/feed-image-02.jpg` | ⏭️ | binary asset |
| 6794 | `apps/gtm/public/images/group-avatar-01.png` | ⏭️ | binary asset |
| 6795 | `apps/gtm/public/images/group-avatar-02.png` | ⏭️ | binary asset |
| 6796 | `apps/gtm/public/images/group-avatar-03.png` | ⏭️ | binary asset |
| 6797 | `apps/gtm/public/images/group-avatar-04.png` | ⏭️ | binary asset |
| 6798 | `apps/gtm/public/images/home/avatar-01.jpg` | ⏭️ | binary asset |
| 6799 | `apps/gtm/public/images/home/avatar-02.jpg` | ⏭️ | binary asset |
| 6800 | `apps/gtm/public/images/home/avatar-03.jpg` | ⏭️ | binary asset |
| 6801 | `apps/gtm/public/images/home/avatar-04.jpg` | ⏭️ | binary asset |
| 6802 | `apps/gtm/public/images/home/avatar-05.jpg` | ⏭️ | binary asset |
| 6803 | `apps/gtm/public/images/home/avatar-06.jpg` | ⏭️ | binary asset |
| 6804 | `apps/gtm/public/images/home/large-testimonial.jpg` | ⏭️ | binary asset |
| 6805 | `apps/gtm/public/images/home/logo-01.svg` | ⏭️ | binary asset |
| 6806 | `apps/gtm/public/images/home/logo-02.svg` | ⏭️ | binary asset |
| 6807 | `apps/gtm/public/images/home/logo-03.svg` | ⏭️ | binary asset |
| 6808 | `apps/gtm/public/images/home/logo-04.svg` | ⏭️ | binary asset |
| 6809 | `apps/gtm/public/images/home/logo-05.svg` | ⏭️ | binary asset |
| 6810 | `apps/gtm/public/images/home/planet-overlay.svg` | ⏭️ | binary asset |
| 6811 | `apps/gtm/public/images/home/planet-tag-01.png` | ⏭️ | binary asset |
| 6812 | `apps/gtm/public/images/home/planet-tag-02.png` | ⏭️ | binary asset |
| 6813 | `apps/gtm/public/images/home/planet-tag-03.png` | ⏭️ | binary asset |
| 6814 | `apps/gtm/public/images/home/planet-tag-04.png` | ⏭️ | binary asset |
| 6815 | `apps/gtm/public/images/home/planet.png` | ⏭️ | binary asset |
| 6816 | `apps/gtm/public/images/home/stripes-dark.svg` | ⏭️ | binary asset |
| 6817 | `apps/gtm/public/images/icon-01.svg` | ⏭️ | binary asset |
| 6818 | `apps/gtm/public/images/icon-02.svg` | ⏭️ | binary asset |
| 6819 | `apps/gtm/public/images/icon-03.svg` | ⏭️ | binary asset |
| 6820 | `apps/gtm/public/images/inbox-image.jpg` | ⏭️ | binary asset |
| 6821 | `apps/gtm/public/images/landing/fonts/inter-v12-latin-500.woff2` | ⏭️ | binary asset |
| 6822 | `apps/gtm/public/images/landing/fonts/inter-v12-latin-600.woff2` | ⏭️ | binary asset |
| 6823 | `apps/gtm/public/images/landing/fonts/inter-v12-latin-regular.woff2` | ⏭️ | binary asset |
| 6824 | `apps/gtm/public/images/landing/fonts/poppins-v20-latin-500.woff2` | ⏭️ | binary asset |
| 6825 | `apps/gtm/public/images/landing/fonts/poppins-v20-latin-600.woff2` | ⏭️ | binary asset |
| 6826 | `apps/gtm/public/images/landing/fonts/poppins-v20-latin-regular.woff2` | ⏭️ | binary asset |
| 6827 | `apps/gtm/public/images/landing/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK book cover.webp` | ⏭️ | binary asset |
| 6828 | `apps/gtm/public/images/landing/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK.webp` | ⏭️ | binary asset |
| 6829 | `apps/gtm/public/images/landing/images/THE SOLO FOUNDER'S AI DOMINANCE.jpg` | ⏭️ | binary asset |
| 6830 | `apps/gtm/public/images/landing/images/THE SOLO FOUNDER'S AI REVOLUTION.jpg` | ⏭️ | binary asset |
| 6831 | `apps/gtm/public/images/landing/images/The Solo Founder's Al Playbook.jpg` | ⏭️ | binary asset |
| 6832 | `apps/gtm/public/images/landing/images/ai-roleplay-sales-academy.webp` | ⏭️ | binary asset |
| 6833 | `apps/gtm/public/images/landing/images/icp-builder-mockup.png` | ⏭️ | binary asset |
| 6834 | `apps/gtm/public/images/landing/images/integrated-intelligence.webp` | ⏭️ | binary asset |
| 6835 | `apps/gtm/public/images/landing/images/logo-transparent.png` | ⏭️ | binary asset |
| 6836 | `apps/gtm/public/images/landing/images/mike-sullivan-author-creator.png` | ⏭️ | binary asset |
| 6837 | `apps/gtm/public/images/landing/images/pipeline-state-machine-mockup.webp` | ⏭️ | binary asset |
| 6838 | `apps/gtm/public/images/landing/images/soloframeHubLogo.png` | ⏭️ | binary asset |
| 6839 | `apps/gtm/public/images/landing/images/soloframehub-logo-sm.png` | ⏭️ | binary asset |
| 6840 | `apps/gtm/public/images/landing/images/soloframehub-logo-w-white.png` | ⏭️ | binary asset |
| 6841 | `apps/gtm/public/images/landing/images/soloframehub-site-icon.png` | ⏭️ | binary asset |
| 6842 | `apps/gtm/public/images/landing/images/soloframehublogo.jpg` | ⏭️ | binary asset |
| 6843 | `apps/gtm/public/images/landing/images/traditional video lesson.jpg` | ⏭️ | binary asset |
| 6844 | `apps/gtm/public/images/landing/images/traditional-lesson.png` | ⏭️ | binary asset |
| 6845 | `apps/gtm/public/images/meetup-image.jpg` | ⏭️ | binary asset |
| 6846 | `apps/gtm/public/images/meetup-photo-01.jpg` | ⏭️ | binary asset |
| 6847 | `apps/gtm/public/images/meetup-photo-02.jpg` | ⏭️ | binary asset |
| 6848 | `apps/gtm/public/images/meetup-photo-03.jpg` | ⏭️ | binary asset |
| 6849 | `apps/gtm/public/images/meetups-thumb-01.jpg` | ⏭️ | binary asset |
| 6850 | `apps/gtm/public/images/meetups-thumb-02.jpg` | ⏭️ | binary asset |
| 6851 | `apps/gtm/public/images/meetups-thumb-03.jpg` | ⏭️ | binary asset |
| 6852 | `apps/gtm/public/images/meetups-thumb-04.jpg` | ⏭️ | binary asset |
| 6853 | `apps/gtm/public/images/meetups-thumb-05.jpg` | ⏭️ | binary asset |
| 6854 | `apps/gtm/public/images/meetups-thumb-06.jpg` | ⏭️ | binary asset |
| 6855 | `apps/gtm/public/images/meetups-thumb-07.jpg` | ⏭️ | binary asset |
| 6856 | `apps/gtm/public/images/meetups-thumb-08.jpg` | ⏭️ | binary asset |
| 6857 | `apps/gtm/public/images/modal-image.jpg` | ⏭️ | binary asset |
| 6858 | `apps/gtm/public/images/onboarding-image.jpg` | ⏭️ | binary asset |
| 6859 | `apps/gtm/public/images/pay-bg.jpg` | ⏭️ | binary asset |
| 6860 | `apps/gtm/public/images/product-image.jpg` | ⏭️ | binary asset |
| 6861 | `apps/gtm/public/images/profile-bg.jpg` | ⏭️ | binary asset |
| 6862 | `apps/gtm/public/images/related-product-01.jpg` | ⏭️ | binary asset |
| 6863 | `apps/gtm/public/images/related-product-02.jpg` | ⏭️ | binary asset |
| 6864 | `apps/gtm/public/images/related-product-03.jpg` | ⏭️ | binary asset |
| 6865 | `apps/gtm/public/images/shop-category-01.png` | ⏭️ | binary asset |
| 6866 | `apps/gtm/public/images/shop-category-02.png` | ⏭️ | binary asset |
| 6867 | `apps/gtm/public/images/shop-category-03.png` | ⏭️ | binary asset |
| 6868 | `apps/gtm/public/images/shop-category-04.png` | ⏭️ | binary asset |
| 6869 | `apps/gtm/public/images/soloframehub-logo-main.png` | ⏭️ | binary asset |
| 6870 | `apps/gtm/public/images/task-image-01.jpg` | ⏭️ | binary asset |
| 6871 | `apps/gtm/public/images/task-image-02.jpg` | ⏭️ | binary asset |
| 6872 | `apps/gtm/public/images/transactions-image-01.svg` | ⏭️ | binary asset |
| 6873 | `apps/gtm/public/images/transactions-image-02.svg` | ⏭️ | binary asset |
| 6874 | `apps/gtm/public/images/transactions-image-03.svg` | ⏭️ | binary asset |
| 6875 | `apps/gtm/public/images/transactions-image-04.svg` | ⏭️ | binary asset |
| 6876 | `apps/gtm/public/images/transactions-image-05.svg` | ⏭️ | binary asset |
| 6877 | `apps/gtm/public/images/transactions-image-06.svg` | ⏭️ | binary asset |
| 6878 | `apps/gtm/public/images/transactions-image-07.svg` | ⏭️ | binary asset |
| 6879 | `apps/gtm/public/images/transactions-image-08.svg` | ⏭️ | binary asset |
| 6880 | `apps/gtm/public/images/user-128-01.jpg` | ⏭️ | binary asset |
| 6881 | `apps/gtm/public/images/user-28-01.jpg` | ⏭️ | binary asset |
| 6882 | `apps/gtm/public/images/user-28-02.jpg` | ⏭️ | binary asset |
| 6883 | `apps/gtm/public/images/user-28-03.jpg` | ⏭️ | binary asset |
| 6884 | `apps/gtm/public/images/user-28-04.jpg` | ⏭️ | binary asset |
| 6885 | `apps/gtm/public/images/user-28-05.jpg` | ⏭️ | binary asset |
| 6886 | `apps/gtm/public/images/user-28-06.jpg` | ⏭️ | binary asset |
| 6887 | `apps/gtm/public/images/user-28-07.jpg` | ⏭️ | binary asset |
| 6888 | `apps/gtm/public/images/user-28-08.jpg` | ⏭️ | binary asset |
| 6889 | `apps/gtm/public/images/user-28-09.jpg` | ⏭️ | binary asset |
| 6890 | `apps/gtm/public/images/user-28-10.jpg` | ⏭️ | binary asset |
| 6891 | `apps/gtm/public/images/user-28-11.jpg` | ⏭️ | binary asset |
| 6892 | `apps/gtm/public/images/user-28-12.jpg` | ⏭️ | binary asset |
| 6893 | `apps/gtm/public/images/user-32-01.jpg` | ⏭️ | binary asset |
| 6894 | `apps/gtm/public/images/user-32-02.jpg` | ⏭️ | binary asset |
| 6895 | `apps/gtm/public/images/user-32-03.jpg` | ⏭️ | binary asset |
| 6896 | `apps/gtm/public/images/user-32-04.jpg` | ⏭️ | binary asset |
| 6897 | `apps/gtm/public/images/user-32-05.jpg` | ⏭️ | binary asset |
| 6898 | `apps/gtm/public/images/user-32-06.jpg` | ⏭️ | binary asset |
| 6899 | `apps/gtm/public/images/user-32-07.jpg` | ⏭️ | binary asset |
| 6900 | `apps/gtm/public/images/user-32-08.jpg` | ⏭️ | binary asset |
| 6901 | `apps/gtm/public/images/user-36-05.jpg` | ⏭️ | binary asset |
| 6902 | `apps/gtm/public/images/user-40-01.jpg` | ⏭️ | binary asset |
| 6903 | `apps/gtm/public/images/user-40-02.jpg` | ⏭️ | binary asset |
| 6904 | `apps/gtm/public/images/user-40-03.jpg` | ⏭️ | binary asset |
| 6905 | `apps/gtm/public/images/user-40-04.jpg` | ⏭️ | binary asset |
| 6906 | `apps/gtm/public/images/user-40-05.jpg` | ⏭️ | binary asset |
| 6907 | `apps/gtm/public/images/user-40-06.jpg` | ⏭️ | binary asset |
| 6908 | `apps/gtm/public/images/user-40-07.jpg` | ⏭️ | binary asset |
| 6909 | `apps/gtm/public/images/user-40-08.jpg` | ⏭️ | binary asset |
| 6910 | `apps/gtm/public/images/user-40-09.jpg` | ⏭️ | binary asset |
| 6911 | `apps/gtm/public/images/user-40-10.jpg` | ⏭️ | binary asset |
| 6912 | `apps/gtm/public/images/user-40-11.jpg` | ⏭️ | binary asset |
| 6913 | `apps/gtm/public/images/user-40-12.jpg` | ⏭️ | binary asset |
| 6914 | `apps/gtm/public/images/user-64-01.jpg` | ⏭️ | binary asset |
| 6915 | `apps/gtm/public/images/user-64-02.jpg` | ⏭️ | binary asset |
| 6916 | `apps/gtm/public/images/user-64-03.jpg` | ⏭️ | binary asset |
| 6917 | `apps/gtm/public/images/user-64-04.jpg` | ⏭️ | binary asset |
| 6918 | `apps/gtm/public/images/user-64-05.jpg` | ⏭️ | binary asset |
| 6919 | `apps/gtm/public/images/user-64-06.jpg` | ⏭️ | binary asset |
| 6920 | `apps/gtm/public/images/user-64-07.jpg` | ⏭️ | binary asset |
| 6921 | `apps/gtm/public/images/user-64-08.jpg` | ⏭️ | binary asset |
| 6922 | `apps/gtm/public/images/user-64-09.jpg` | ⏭️ | binary asset |
| 6923 | `apps/gtm/public/images/user-64-10.jpg` | ⏭️ | binary asset |
| 6924 | `apps/gtm/public/images/user-64-11.jpg` | ⏭️ | binary asset |
| 6925 | `apps/gtm/public/images/user-64-12.jpg` | ⏭️ | binary asset |
| 6926 | `apps/gtm/public/images/user-64-13.jpg` | ⏭️ | binary asset |
| 6927 | `apps/gtm/public/images/user-64-14.jpg` | ⏭️ | binary asset |
| 6928 | `apps/gtm/public/images/user-avatar-32.png` | ⏭️ | binary asset |
| 6929 | `apps/gtm/public/images/user-avatar-80.png` | ⏭️ | binary asset |
| 6930 | `apps/gtm/public/legal/acceptable-use-policy.html` | ⏳ | pending |
| 6931 | `apps/gtm/public/legal/ai-disclaimer.html` | ⏳ | pending |
| 6932 | `apps/gtm/public/legal/community-guidelines.html` | ⏳ | pending |
| 6933 | `apps/gtm/public/legal/cookie-policy.html` | ⏳ | pending |
| 6934 | `apps/gtm/public/legal/earnings-disclaimer.html` | ⏳ | pending |
| 6935 | `apps/gtm/public/legal/privacy-policy.html` | ⏳ | pending |
| 6936 | `apps/gtm/public/legal/refund-policy.html` | ⏳ | pending |
| 6937 | `apps/gtm/public/legal/terms-of-service.html` | ⏳ | pending |
| 6938 | `apps/gtm/public/platform-architecture.html` | ⏳ | pending |
| 6939 | `apps/gtm/public/robots.txt` | ⏳ | pending |
| 6940 | `apps/gtm/public/sitemap.xml` | ⏳ | pending |
| 6941 | `apps/gtm/public/solo-founder-apps.html` | ⏳ | pending |
| 6942 | `apps/gtm/public/solo-founders-ai-60-day-roadmap-book.html` | ⏳ | pending |
| 6943 | `apps/gtm/public/solo-founders-ai-client-acquisition-os.html` | ⏳ | pending |
| 6944 | `apps/gtm/public/solo-founders-ai-customer-acquisition-playbook.html` | ⏳ | pending |
| 6945 | `apps/gtm/public/solo-founders-ai-gtm-academy.html` | ⏳ | pending |
| 6946 | `apps/gtm/public/solo-founders-ai-startup-academy.html` | ⏳ | pending |
| 6947 | `apps/gtm/public/solo-gtm-os.html` | ⏳ | pending |
| 6948 | `apps/gtm/public/src/css/fonts.css` | ⏳ | pending |
| 6949 | `apps/gtm/public/src/js/ga4-events.js` | ⏳ | pending |
| 6950 | `apps/gtm/public/src/js/main.js` | ⏳ | pending |
| 6951 | `apps/gtm/public/sw.js` | ⏳ | pending |
| 6952 | `apps/gtm/public/tailwind_theme/tailwind.css` | ⏳ | pending |
| 6953 | `apps/gtm/scripts/cloudflare-firewall.sh` | ⏳ | pending |
| 6954 | `apps/gtm/scripts/content-pipeline.ts` | ⏳ | pending |
| 6955 | `apps/gtm/scripts/content-quality-check.ts` | ⏳ | pending |
| 6956 | `apps/gtm/scripts/db-migrate.ts` | ⏳ | pending |
| 6957 | `apps/gtm/scripts/docker-entrypoint.js` | ⏳ | pending |
| 6958 | `apps/gtm/scripts/dokploy-status.ts` | ⏳ | pending |
| 6959 | `apps/gtm/scripts/extract-quizzes.js` | ⏳ | pending |
| 6960 | `apps/gtm/scripts/index-book-search.ts` | ⏳ | pending |
| 6961 | `apps/gtm/scripts/index-lesson-embeddings.ts` | ⏳ | pending |
| 6962 | `apps/gtm/scripts/n8n-facilitator-workflow.json` | ⏳ | pending |
| 6963 | `apps/gtm/scripts/openclaw/config/config.json` | ⏳ | pending |
| 6964 | `apps/gtm/scripts/openclaw/docker-compose.yml` | ⏳ | pending |
| 6965 | `apps/gtm/scripts/openclaw/setup-cron-jobs.sh` | ⏳ | pending |
| 6966 | `apps/gtm/scripts/openclaw/skills/caa-facilitator-rhythm/SKILL.md` | ⏳ | pending |
| 6967 | `apps/gtm/scripts/openclaw/skills/caa-forum-sync/SKILL.md` | ⏳ | pending |
| 6968 | `apps/gtm/scripts/openclaw/skills/caa-health-check/SKILL.md` | ⏳ | pending |
| 6969 | `apps/gtm/scripts/openclaw/skills/caa-persona-responder/SKILL.md` | ⏳ | pending |
| 6970 | `apps/gtm/scripts/openclaw/skills/caa-readiness-followup/SKILL.md` | ⏳ | pending |
| 6971 | `apps/gtm/scripts/openclaw/skills/caa-weekly-progress/SKILL.md` | ⏳ | pending |
| 6972 | `apps/gtm/scripts/ops/backup.sh` | ⏳ | pending |
| 6973 | `apps/gtm/scripts/ops/health-check.sh` | ⏳ | pending |
| 6974 | `apps/gtm/scripts/ops/install-crons.sh` | ⏳ | pending |
| 6975 | `apps/gtm/scripts/ops/lib.sh` | ⏳ | pending |
| 6976 | `apps/gtm/scripts/ops/maintenance.sh` | ⏳ | pending |
| 6977 | `apps/gtm/scripts/ops/ops.conf` | ⏳ | pending |
| 6978 | `apps/gtm/scripts/ops/restore.sh` | ⏳ | pending |
| 6979 | `apps/gtm/scripts/ops/security-audit.sh` | ⏳ | pending |
| 6980 | `apps/gtm/scripts/reindex-course-content.ts` | ⏳ | pending |
| 6981 | `apps/gtm/scripts/seed-demo-data.sql` | ⏳ | pending |
| 6982 | `apps/gtm/scripts/setup-ga4-property.ts` | ⏳ | pending |
| 6983 | `apps/gtm/scripts/translate-content.ts` | ⏳ | pending |
| 6984 | `apps/gtm/scripts/validate-curriculum.ts` | ⏳ | pending |
| 6985 | `apps/gtm/seed-data/clientRoles.json` | ⏳ | pending |
| 6986 | `apps/gtm/seed-data/discPatterns.json` | ⏳ | pending |
| 6987 | `apps/gtm/seed-data/founderCategories.json` | ⏳ | pending |
| 6988 | `apps/gtm/seed-data/industries/agencies.json` | ⏳ | pending |
| 6989 | `apps/gtm/seed-data/industries/devtools.json` | ⏳ | pending |
| 6990 | `apps/gtm/seed-data/industries/ecommerce.json` | ⏳ | pending |
| 6991 | `apps/gtm/seed-data/industries/edtech.json` | ⏳ | pending |
| 6992 | `apps/gtm/seed-data/industries/fintech.json` | ⏳ | pending |
| 6993 | `apps/gtm/seed-data/industries/healthtech.json` | ⏳ | pending |
| 6994 | `apps/gtm/seed-data/industries/hr_recruiting.json` | ⏳ | pending |
| 6995 | `apps/gtm/seed-data/industries/manufacturing.json` | ⏳ | pending |
| 6996 | `apps/gtm/seed-data/industries/martech.json` | ⏳ | pending |
| 6997 | `apps/gtm/seed-data/industries/professional_services.json` | ⏳ | pending |
| 6998 | `apps/gtm/seed-data/industries/real_estate.json` | ⏳ | pending |
| 6999 | `apps/gtm/seed-data/industries/saas_startup.json` | ⏳ | pending |
| 7000 | `apps/gtm/server/data/content/ai-acquisition/ai-acquisition-strategy/lesson-1.md` | ⏳ | pending |
| 7001 | `apps/gtm/server/data/content/ai-acquisition/ai-acquisition-strategy/lesson-10.md` | ⏳ | pending |
| 7002 | `apps/gtm/server/data/content/ai-acquisition/ai-acquisition-strategy/lesson-2.md` | ⏳ | pending |
| 7003 | `apps/gtm/server/data/content/ai-acquisition/ai-acquisition-strategy/lesson-3.md` | ⏳ | pending |
| 7004 | `apps/gtm/server/data/content/ai-acquisition/ai-acquisition-strategy/lesson-4.md` | ⏳ | pending |
| 7005 | `apps/gtm/server/data/content/ai-acquisition/ai-acquisition-strategy/lesson-5.md` | ⏳ | pending |
| 7006 | `apps/gtm/server/data/content/ai-acquisition/ai-acquisition-strategy/lesson-6.md` | ⏳ | pending |
| 7007 | `apps/gtm/server/data/content/ai-acquisition/ai-acquisition-strategy/lesson-7.md` | ⏳ | pending |
| 7008 | `apps/gtm/server/data/content/ai-acquisition/ai-acquisition-strategy/lesson-8.md` | ⏳ | pending |
| 7009 | `apps/gtm/server/data/content/ai-acquisition/ai-acquisition-strategy/lesson-9.md` | ⏳ | pending |
| 7010 | `apps/gtm/server/data/content/ai-acquisition/ai-lead-research/lesson-1.md` | ⏳ | pending |
| 7011 | `apps/gtm/server/data/content/ai-acquisition/ai-lead-research/lesson-10.md` | ⏳ | pending |
| 7012 | `apps/gtm/server/data/content/ai-acquisition/ai-lead-research/lesson-2.md` | ⏳ | pending |
| 7013 | `apps/gtm/server/data/content/ai-acquisition/ai-lead-research/lesson-3.md` | ⏳ | pending |
| 7014 | `apps/gtm/server/data/content/ai-acquisition/ai-lead-research/lesson-4.md` | ⏳ | pending |
| 7015 | `apps/gtm/server/data/content/ai-acquisition/ai-lead-research/lesson-5.md` | ⏳ | pending |
| 7016 | `apps/gtm/server/data/content/ai-acquisition/ai-lead-research/lesson-6.md` | ⏳ | pending |
| 7017 | `apps/gtm/server/data/content/ai-acquisition/ai-lead-research/lesson-7.md` | ⏳ | pending |
| 7018 | `apps/gtm/server/data/content/ai-acquisition/ai-lead-research/lesson-8.md` | ⏳ | pending |
| 7019 | `apps/gtm/server/data/content/ai-acquisition/ai-lead-research/lesson-9.md` | ⏳ | pending |
| 7020 | `apps/gtm/server/data/content/ai-acquisition/ai-outreach-automation/lesson-1.md` | ⏳ | pending |
| 7021 | `apps/gtm/server/data/content/ai-acquisition/ai-outreach-automation/lesson-10.md` | ⏳ | pending |
| 7022 | `apps/gtm/server/data/content/ai-acquisition/ai-outreach-automation/lesson-11.md` | ⏳ | pending |
| 7023 | `apps/gtm/server/data/content/ai-acquisition/ai-outreach-automation/lesson-12.md` | ⏳ | pending |
| 7024 | `apps/gtm/server/data/content/ai-acquisition/ai-outreach-automation/lesson-2.md` | ⏳ | pending |
| 7025 | `apps/gtm/server/data/content/ai-acquisition/ai-outreach-automation/lesson-3.md` | ⏳ | pending |
| 7026 | `apps/gtm/server/data/content/ai-acquisition/ai-outreach-automation/lesson-4.md` | ⏳ | pending |
| 7027 | `apps/gtm/server/data/content/ai-acquisition/ai-outreach-automation/lesson-5.md` | ⏳ | pending |
| 7028 | `apps/gtm/server/data/content/ai-acquisition/ai-outreach-automation/lesson-6.md` | ⏳ | pending |
| 7029 | `apps/gtm/server/data/content/ai-acquisition/ai-outreach-automation/lesson-7.md` | ⏳ | pending |
| 7030 | `apps/gtm/server/data/content/ai-acquisition/ai-outreach-automation/lesson-8.md` | ⏳ | pending |
| 7031 | `apps/gtm/server/data/content/ai-acquisition/ai-outreach-automation/lesson-9.md` | ⏳ | pending |
| 7032 | `apps/gtm/server/data/content/ai-acquisition/autonomous-sdr/lesson-1.md` | ⏳ | pending |
| 7033 | `apps/gtm/server/data/content/ai-acquisition/autonomous-sdr/lesson-10.md` | ⏳ | pending |
| 7034 | `apps/gtm/server/data/content/ai-acquisition/autonomous-sdr/lesson-2.md` | ⏳ | pending |
| 7035 | `apps/gtm/server/data/content/ai-acquisition/autonomous-sdr/lesson-3.md` | ⏳ | pending |
| 7036 | `apps/gtm/server/data/content/ai-acquisition/autonomous-sdr/lesson-4.md` | ⏳ | pending |
| 7037 | `apps/gtm/server/data/content/ai-acquisition/autonomous-sdr/lesson-5.md` | ⏳ | pending |
| 7038 | `apps/gtm/server/data/content/ai-acquisition/autonomous-sdr/lesson-6.md` | ⏳ | pending |
| 7039 | `apps/gtm/server/data/content/ai-acquisition/autonomous-sdr/lesson-7.md` | ⏳ | pending |
| 7040 | `apps/gtm/server/data/content/ai-acquisition/autonomous-sdr/lesson-8.md` | ⏳ | pending |
| 7041 | `apps/gtm/server/data/content/ai-acquisition/autonomous-sdr/lesson-9.md` | ⏳ | pending |
| 7042 | `apps/gtm/server/data/content/ai-acquisition/custom-ai-agents/lesson-1.md` | ⏳ | pending |
| 7043 | `apps/gtm/server/data/content/ai-acquisition/custom-ai-agents/lesson-10.md` | ⏳ | pending |
| 7044 | `apps/gtm/server/data/content/ai-acquisition/custom-ai-agents/lesson-11.md` | ⏳ | pending |
| 7045 | `apps/gtm/server/data/content/ai-acquisition/custom-ai-agents/lesson-12.md` | ⏳ | pending |
| 7046 | `apps/gtm/server/data/content/ai-acquisition/custom-ai-agents/lesson-2.md` | ⏳ | pending |
| 7047 | `apps/gtm/server/data/content/ai-acquisition/custom-ai-agents/lesson-3.md` | ⏳ | pending |
| 7048 | `apps/gtm/server/data/content/ai-acquisition/custom-ai-agents/lesson-4.md` | ⏳ | pending |
| 7049 | `apps/gtm/server/data/content/ai-acquisition/custom-ai-agents/lesson-5.md` | ⏳ | pending |
| 7050 | `apps/gtm/server/data/content/ai-acquisition/custom-ai-agents/lesson-6.md` | ⏳ | pending |
| 7051 | `apps/gtm/server/data/content/ai-acquisition/custom-ai-agents/lesson-7.md` | ⏳ | pending |
| 7052 | `apps/gtm/server/data/content/ai-acquisition/custom-ai-agents/lesson-8.md` | ⏳ | pending |
| 7053 | `apps/gtm/server/data/content/ai-acquisition/custom-ai-agents/lesson-9.md` | ⏳ | pending |
| 7054 | `apps/gtm/server/data/content/ai-acquisition/email-deliverability/lesson-1.md` | ⏳ | pending |
| 7055 | `apps/gtm/server/data/content/ai-acquisition/email-deliverability/lesson-10.md` | ⏳ | pending |
| 7056 | `apps/gtm/server/data/content/ai-acquisition/email-deliverability/lesson-11.md` | ⏳ | pending |
| 7057 | `apps/gtm/server/data/content/ai-acquisition/email-deliverability/lesson-12.md` | ⏳ | pending |
| 7058 | `apps/gtm/server/data/content/ai-acquisition/email-deliverability/lesson-2.md` | ⏳ | pending |
| 7059 | `apps/gtm/server/data/content/ai-acquisition/email-deliverability/lesson-3.md` | ⏳ | pending |
| 7060 | `apps/gtm/server/data/content/ai-acquisition/email-deliverability/lesson-4.md` | ⏳ | pending |
| 7061 | `apps/gtm/server/data/content/ai-acquisition/email-deliverability/lesson-5.md` | ⏳ | pending |
| 7062 | `apps/gtm/server/data/content/ai-acquisition/email-deliverability/lesson-6.md` | ⏳ | pending |
| 7063 | `apps/gtm/server/data/content/ai-acquisition/email-deliverability/lesson-7.md` | ⏳ | pending |
| 7064 | `apps/gtm/server/data/content/ai-acquisition/email-deliverability/lesson-8.md` | ⏳ | pending |
| 7065 | `apps/gtm/server/data/content/ai-acquisition/email-deliverability/lesson-9.md` | ⏳ | pending |
| 7066 | `apps/gtm/server/data/content/ai-acquisition/linkedin-ai/lesson-1.md` | ⏳ | pending |
| 7067 | `apps/gtm/server/data/content/ai-acquisition/linkedin-ai/lesson-10.md` | ⏳ | pending |
| 7068 | `apps/gtm/server/data/content/ai-acquisition/linkedin-ai/lesson-2.md` | ⏳ | pending |
| 7069 | `apps/gtm/server/data/content/ai-acquisition/linkedin-ai/lesson-3.md` | ⏳ | pending |
| 7070 | `apps/gtm/server/data/content/ai-acquisition/linkedin-ai/lesson-4.md` | ⏳ | pending |
| 7071 | `apps/gtm/server/data/content/ai-acquisition/linkedin-ai/lesson-5.md` | ⏳ | pending |
| 7072 | `apps/gtm/server/data/content/ai-acquisition/linkedin-ai/lesson-6.md` | ⏳ | pending |
| 7073 | `apps/gtm/server/data/content/ai-acquisition/linkedin-ai/lesson-7.md` | ⏳ | pending |
| 7074 | `apps/gtm/server/data/content/ai-acquisition/linkedin-ai/lesson-8.md` | ⏳ | pending |
| 7075 | `apps/gtm/server/data/content/ai-acquisition/linkedin-ai/lesson-9.md` | ⏳ | pending |
| 7076 | `apps/gtm/server/data/content/creator-track/audience-to-buyer/lesson-1.md` | ⏳ | pending |
| 7077 | `apps/gtm/server/data/content/creator-track/audience-to-buyer/lesson-10.md` | ⏳ | pending |
| 7078 | `apps/gtm/server/data/content/creator-track/audience-to-buyer/lesson-2.md` | ⏳ | pending |
| 7079 | `apps/gtm/server/data/content/creator-track/audience-to-buyer/lesson-3.md` | ⏳ | pending |
| 7080 | `apps/gtm/server/data/content/creator-track/audience-to-buyer/lesson-4.md` | ⏳ | pending |
| 7081 | `apps/gtm/server/data/content/creator-track/audience-to-buyer/lesson-5.md` | ⏳ | pending |
| 7082 | `apps/gtm/server/data/content/creator-track/audience-to-buyer/lesson-6.md` | ⏳ | pending |
| 7083 | `apps/gtm/server/data/content/creator-track/audience-to-buyer/lesson-7.md` | ⏳ | pending |
| 7084 | `apps/gtm/server/data/content/creator-track/audience-to-buyer/lesson-8.md` | ⏳ | pending |
| 7085 | `apps/gtm/server/data/content/creator-track/audience-to-buyer/lesson-9.md` | ⏳ | pending |
| 7086 | `apps/gtm/server/data/content/creator-track/community-led-sales/lesson-1.md` | ⏳ | pending |
| 7087 | `apps/gtm/server/data/content/creator-track/community-led-sales/lesson-2.md` | ⏳ | pending |
| 7088 | `apps/gtm/server/data/content/creator-track/community-led-sales/lesson-3.md` | ⏳ | pending |
| 7089 | `apps/gtm/server/data/content/creator-track/community-led-sales/lesson-4.md` | ⏳ | pending |
| 7090 | `apps/gtm/server/data/content/creator-track/community-led-sales/lesson-5.md` | ⏳ | pending |
| 7091 | `apps/gtm/server/data/content/creator-track/community-led-sales/lesson-6.md` | ⏳ | pending |
| 7092 | `apps/gtm/server/data/content/creator-track/community-led-sales/lesson-7.md` | ⏳ | pending |
| 7093 | `apps/gtm/server/data/content/creator-track/community-led-sales/lesson-8.md` | ⏳ | pending |
| 7094 | `apps/gtm/server/data/content/creator-track/creator-metrics/lesson-1.md` | ⏳ | pending |
| 7095 | `apps/gtm/server/data/content/creator-track/creator-metrics/lesson-2.md` | ⏳ | pending |
| 7096 | `apps/gtm/server/data/content/creator-track/creator-metrics/lesson-3.md` | ⏳ | pending |
| 7097 | `apps/gtm/server/data/content/creator-track/creator-metrics/lesson-4.md` | ⏳ | pending |
| 7098 | `apps/gtm/server/data/content/creator-track/creator-metrics/lesson-5.md` | ⏳ | pending |
| 7099 | `apps/gtm/server/data/content/creator-track/creator-metrics/lesson-6.md` | ⏳ | pending |
| 7100 | `apps/gtm/server/data/content/creator-track/creator-metrics/lesson-7.md` | ⏳ | pending |
| 7101 | `apps/gtm/server/data/content/creator-track/creator-metrics/lesson-8.md` | ⏳ | pending |
| 7102 | `apps/gtm/server/data/content/creator-track/creator-sales-conversations/lesson-1.md` | ⏳ | pending |
| 7103 | `apps/gtm/server/data/content/creator-track/creator-sales-conversations/lesson-10.md` | ⏳ | pending |
| 7104 | `apps/gtm/server/data/content/creator-track/creator-sales-conversations/lesson-2.md` | ⏳ | pending |
| 7105 | `apps/gtm/server/data/content/creator-track/creator-sales-conversations/lesson-3.md` | ⏳ | pending |
| 7106 | `apps/gtm/server/data/content/creator-track/creator-sales-conversations/lesson-4.md` | ⏳ | pending |
| 7107 | `apps/gtm/server/data/content/creator-track/creator-sales-conversations/lesson-5.md` | ⏳ | pending |
| 7108 | `apps/gtm/server/data/content/creator-track/creator-sales-conversations/lesson-6.md` | ⏳ | pending |
| 7109 | `apps/gtm/server/data/content/creator-track/creator-sales-conversations/lesson-7.md` | ⏳ | pending |
| 7110 | `apps/gtm/server/data/content/creator-track/creator-sales-conversations/lesson-8.md` | ⏳ | pending |
| 7111 | `apps/gtm/server/data/content/creator-track/creator-sales-conversations/lesson-9.md` | ⏳ | pending |
| 7112 | `apps/gtm/server/data/content/creator-track/creator-sales-mindset/lesson-1.md` | ⏳ | pending |
| 7113 | `apps/gtm/server/data/content/creator-track/creator-sales-mindset/lesson-2.md` | ⏳ | pending |
| 7114 | `apps/gtm/server/data/content/creator-track/creator-sales-mindset/lesson-3.md` | ⏳ | pending |
| 7115 | `apps/gtm/server/data/content/creator-track/creator-sales-mindset/lesson-4.md` | ⏳ | pending |
| 7116 | `apps/gtm/server/data/content/creator-track/creator-sales-mindset/lesson-5.md` | ⏳ | pending |
| 7117 | `apps/gtm/server/data/content/creator-track/creator-sales-mindset/lesson-6.md` | ⏳ | pending |
| 7118 | `apps/gtm/server/data/content/creator-track/creator-sales-mindset/lesson-7.md` | ⏳ | pending |
| 7119 | `apps/gtm/server/data/content/creator-track/creator-sales-mindset/lesson-8.md` | ⏳ | pending |
| 7120 | `apps/gtm/server/data/content/creator-track/dm-selling-social-commerce/lesson-1.md` | ⏳ | pending |
| 7121 | `apps/gtm/server/data/content/creator-track/dm-selling-social-commerce/lesson-2.md` | ⏳ | pending |
| 7122 | `apps/gtm/server/data/content/creator-track/dm-selling-social-commerce/lesson-3.md` | ⏳ | pending |
| 7123 | `apps/gtm/server/data/content/creator-track/dm-selling-social-commerce/lesson-4.md` | ⏳ | pending |
| 7124 | `apps/gtm/server/data/content/creator-track/dm-selling-social-commerce/lesson-5.md` | ⏳ | pending |
| 7125 | `apps/gtm/server/data/content/creator-track/dm-selling-social-commerce/lesson-6.md` | ⏳ | pending |
| 7126 | `apps/gtm/server/data/content/creator-track/dm-selling-social-commerce/lesson-7.md` | ⏳ | pending |
| 7127 | `apps/gtm/server/data/content/creator-track/dm-selling-social-commerce/lesson-8.md` | ⏳ | pending |
| 7128 | `apps/gtm/server/data/content/creator-track/scaling-creator-sales/lesson-1.md` | ⏳ | pending |
| 7129 | `apps/gtm/server/data/content/creator-track/scaling-creator-sales/lesson-10.md` | ⏳ | pending |
| 7130 | `apps/gtm/server/data/content/creator-track/scaling-creator-sales/lesson-2.md` | ⏳ | pending |
| 7131 | `apps/gtm/server/data/content/creator-track/scaling-creator-sales/lesson-3.md` | ⏳ | pending |
| 7132 | `apps/gtm/server/data/content/creator-track/scaling-creator-sales/lesson-4.md` | ⏳ | pending |
| 7133 | `apps/gtm/server/data/content/creator-track/scaling-creator-sales/lesson-5.md` | ⏳ | pending |
| 7134 | `apps/gtm/server/data/content/creator-track/scaling-creator-sales/lesson-6.md` | ⏳ | pending |
| 7135 | `apps/gtm/server/data/content/creator-track/scaling-creator-sales/lesson-7.md` | ⏳ | pending |
| 7136 | `apps/gtm/server/data/content/creator-track/scaling-creator-sales/lesson-8.md` | ⏳ | pending |
| 7137 | `apps/gtm/server/data/content/creator-track/scaling-creator-sales/lesson-9.md` | ⏳ | pending |
| 7138 | `apps/gtm/server/data/content/creator-track/webinar-challenge-funnels/lesson-1.md` | ⏳ | pending |
| 7139 | `apps/gtm/server/data/content/creator-track/webinar-challenge-funnels/lesson-10.md` | ⏳ | pending |
| 7140 | `apps/gtm/server/data/content/creator-track/webinar-challenge-funnels/lesson-2.md` | ⏳ | pending |
| 7141 | `apps/gtm/server/data/content/creator-track/webinar-challenge-funnels/lesson-3.md` | ⏳ | pending |
| 7142 | `apps/gtm/server/data/content/creator-track/webinar-challenge-funnels/lesson-4.md` | ⏳ | pending |
| 7143 | `apps/gtm/server/data/content/creator-track/webinar-challenge-funnels/lesson-5.md` | ⏳ | pending |
| 7144 | `apps/gtm/server/data/content/creator-track/webinar-challenge-funnels/lesson-6.md` | ⏳ | pending |
| 7145 | `apps/gtm/server/data/content/creator-track/webinar-challenge-funnels/lesson-7.md` | ⏳ | pending |
| 7146 | `apps/gtm/server/data/content/creator-track/webinar-challenge-funnels/lesson-8.md` | ⏳ | pending |
| 7147 | `apps/gtm/server/data/content/creator-track/webinar-challenge-funnels/lesson-9.md` | ⏳ | pending |
| 7148 | `apps/gtm/server/data/content/customer-success/advocacy/lesson-1.md` | ⏳ | pending |
| 7149 | `apps/gtm/server/data/content/customer-success/advocacy/lesson-2.md` | ⏳ | pending |
| 7150 | `apps/gtm/server/data/content/customer-success/advocacy/lesson-3.md` | ⏳ | pending |
| 7151 | `apps/gtm/server/data/content/customer-success/advocacy/lesson-4.md` | ⏳ | pending |
| 7152 | `apps/gtm/server/data/content/customer-success/advocacy/lesson-5.md` | ⏳ | pending |
| 7153 | `apps/gtm/server/data/content/customer-success/advocacy/lesson-6.md` | ⏳ | pending |
| 7154 | `apps/gtm/server/data/content/customer-success/advocacy/lesson-7.md` | ⏳ | pending |
| 7155 | `apps/gtm/server/data/content/customer-success/advocacy/lesson-8.md` | ⏳ | pending |
| 7156 | `apps/gtm/server/data/content/customer-success/expansion/lesson-1.md` | ⏳ | pending |
| 7157 | `apps/gtm/server/data/content/customer-success/expansion/lesson-2.md` | ⏳ | pending |
| 7158 | `apps/gtm/server/data/content/customer-success/expansion/lesson-3.md` | ⏳ | pending |
| 7159 | `apps/gtm/server/data/content/customer-success/expansion/lesson-4.md` | ⏳ | pending |
| 7160 | `apps/gtm/server/data/content/customer-success/expansion/lesson-5.md` | ⏳ | pending |
| 7161 | `apps/gtm/server/data/content/customer-success/expansion/lesson-6.md` | ⏳ | pending |
| 7162 | `apps/gtm/server/data/content/customer-success/expansion/lesson-7.md` | ⏳ | pending |
| 7163 | `apps/gtm/server/data/content/customer-success/expansion/lesson-8.md` | ⏳ | pending |
| 7164 | `apps/gtm/server/data/content/customer-success/onboarding/lesson-1.md` | ⏳ | pending |
| 7165 | `apps/gtm/server/data/content/customer-success/onboarding/lesson-10.md` | ⏳ | pending |
| 7166 | `apps/gtm/server/data/content/customer-success/onboarding/lesson-2.md` | ⏳ | pending |
| 7167 | `apps/gtm/server/data/content/customer-success/onboarding/lesson-3.md` | ⏳ | pending |
| 7168 | `apps/gtm/server/data/content/customer-success/onboarding/lesson-4.md` | ⏳ | pending |
| 7169 | `apps/gtm/server/data/content/customer-success/onboarding/lesson-5.md` | ⏳ | pending |
| 7170 | `apps/gtm/server/data/content/customer-success/onboarding/lesson-6.md` | ⏳ | pending |
| 7171 | `apps/gtm/server/data/content/customer-success/onboarding/lesson-7.md` | ⏳ | pending |
| 7172 | `apps/gtm/server/data/content/customer-success/onboarding/lesson-8.md` | ⏳ | pending |
| 7173 | `apps/gtm/server/data/content/customer-success/onboarding/lesson-9.md` | ⏳ | pending |
| 7174 | `apps/gtm/server/data/content/customer-success/retention/lesson-1.md` | ⏳ | pending |
| 7175 | `apps/gtm/server/data/content/customer-success/retention/lesson-10.md` | ⏳ | pending |
| 7176 | `apps/gtm/server/data/content/customer-success/retention/lesson-2.md` | ⏳ | pending |
| 7177 | `apps/gtm/server/data/content/customer-success/retention/lesson-3.md` | ⏳ | pending |
| 7178 | `apps/gtm/server/data/content/customer-success/retention/lesson-4.md` | ⏳ | pending |
| 7179 | `apps/gtm/server/data/content/customer-success/retention/lesson-5.md` | ⏳ | pending |
| 7180 | `apps/gtm/server/data/content/customer-success/retention/lesson-6.md` | ⏳ | pending |
| 7181 | `apps/gtm/server/data/content/customer-success/retention/lesson-7.md` | ⏳ | pending |
| 7182 | `apps/gtm/server/data/content/customer-success/retention/lesson-8.md` | ⏳ | pending |
| 7183 | `apps/gtm/server/data/content/customer-success/retention/lesson-9.md` | ⏳ | pending |
| 7184 | `apps/gtm/server/data/content/es/ai-acquisition/ai-acquisition-strategy/lesson-1.md` | ⏳ | pending |
| 7185 | `apps/gtm/server/data/content/es/ai-acquisition/ai-acquisition-strategy/lesson-10.md` | ⏳ | pending |
| 7186 | `apps/gtm/server/data/content/es/ai-acquisition/ai-acquisition-strategy/lesson-2.md` | ⏳ | pending |
| 7187 | `apps/gtm/server/data/content/es/ai-acquisition/ai-acquisition-strategy/lesson-3.md` | ⏳ | pending |
| 7188 | `apps/gtm/server/data/content/es/ai-acquisition/ai-acquisition-strategy/lesson-4.md` | ⏳ | pending |
| 7189 | `apps/gtm/server/data/content/es/ai-acquisition/ai-acquisition-strategy/lesson-5.md` | ⏳ | pending |
| 7190 | `apps/gtm/server/data/content/es/ai-acquisition/ai-acquisition-strategy/lesson-6.md` | ⏳ | pending |
| 7191 | `apps/gtm/server/data/content/es/ai-acquisition/ai-acquisition-strategy/lesson-7.md` | ⏳ | pending |
| 7192 | `apps/gtm/server/data/content/es/ai-acquisition/ai-acquisition-strategy/lesson-8.md` | ⏳ | pending |
| 7193 | `apps/gtm/server/data/content/es/ai-acquisition/ai-acquisition-strategy/lesson-9.md` | ⏳ | pending |
| 7194 | `apps/gtm/server/data/content/es/ai-acquisition/ai-lead-research/lesson-1.md` | ⏳ | pending |
| 7195 | `apps/gtm/server/data/content/es/ai-acquisition/ai-lead-research/lesson-10.md` | ⏳ | pending |
| 7196 | `apps/gtm/server/data/content/es/ai-acquisition/ai-lead-research/lesson-2.md` | ⏳ | pending |
| 7197 | `apps/gtm/server/data/content/es/ai-acquisition/ai-lead-research/lesson-3.md` | ⏳ | pending |
| 7198 | `apps/gtm/server/data/content/es/ai-acquisition/ai-lead-research/lesson-4.md` | ⏳ | pending |
| 7199 | `apps/gtm/server/data/content/es/ai-acquisition/ai-lead-research/lesson-5.md` | ⏳ | pending |
| 7200 | `apps/gtm/server/data/content/es/ai-acquisition/ai-lead-research/lesson-6.md` | ⏳ | pending |
| 7201 | `apps/gtm/server/data/content/es/ai-acquisition/ai-lead-research/lesson-7.md` | ⏳ | pending |
| 7202 | `apps/gtm/server/data/content/es/ai-acquisition/ai-lead-research/lesson-8.md` | ⏳ | pending |
| 7203 | `apps/gtm/server/data/content/es/ai-acquisition/ai-lead-research/lesson-9.md` | ⏳ | pending |
| 7204 | `apps/gtm/server/data/content/es/ai-acquisition/ai-outreach-automation/lesson-1.md` | ⏳ | pending |
| 7205 | `apps/gtm/server/data/content/es/ai-acquisition/ai-outreach-automation/lesson-10.md` | ⏳ | pending |
| 7206 | `apps/gtm/server/data/content/es/ai-acquisition/ai-outreach-automation/lesson-11.md` | ⏳ | pending |
| 7207 | `apps/gtm/server/data/content/es/ai-acquisition/ai-outreach-automation/lesson-12.md` | ⏳ | pending |
| 7208 | `apps/gtm/server/data/content/es/ai-acquisition/ai-outreach-automation/lesson-2.md` | ⏳ | pending |
| 7209 | `apps/gtm/server/data/content/es/ai-acquisition/ai-outreach-automation/lesson-3.md` | ⏳ | pending |
| 7210 | `apps/gtm/server/data/content/es/ai-acquisition/ai-outreach-automation/lesson-4.md` | ⏳ | pending |
| 7211 | `apps/gtm/server/data/content/es/ai-acquisition/ai-outreach-automation/lesson-5.md` | ⏳ | pending |
| 7212 | `apps/gtm/server/data/content/es/ai-acquisition/ai-outreach-automation/lesson-6.md` | ⏳ | pending |
| 7213 | `apps/gtm/server/data/content/es/ai-acquisition/ai-outreach-automation/lesson-7.md` | ⏳ | pending |
| 7214 | `apps/gtm/server/data/content/es/ai-acquisition/ai-outreach-automation/lesson-8.md` | ⏳ | pending |
| 7215 | `apps/gtm/server/data/content/es/ai-acquisition/ai-outreach-automation/lesson-9.md` | ⏳ | pending |
| 7216 | `apps/gtm/server/data/content/es/ai-acquisition/autonomous-sdr/lesson-1.md` | ⏳ | pending |
| 7217 | `apps/gtm/server/data/content/es/ai-acquisition/autonomous-sdr/lesson-10.md` | ⏳ | pending |
| 7218 | `apps/gtm/server/data/content/es/ai-acquisition/autonomous-sdr/lesson-2.md` | ⏳ | pending |
| 7219 | `apps/gtm/server/data/content/es/ai-acquisition/autonomous-sdr/lesson-3.md` | ⏳ | pending |
| 7220 | `apps/gtm/server/data/content/es/ai-acquisition/autonomous-sdr/lesson-4.md` | ⏳ | pending |
| 7221 | `apps/gtm/server/data/content/es/ai-acquisition/autonomous-sdr/lesson-5.md` | ⏳ | pending |
| 7222 | `apps/gtm/server/data/content/es/ai-acquisition/autonomous-sdr/lesson-6.md` | ⏳ | pending |
| 7223 | `apps/gtm/server/data/content/es/ai-acquisition/autonomous-sdr/lesson-7.md` | ⏳ | pending |
| 7224 | `apps/gtm/server/data/content/es/ai-acquisition/autonomous-sdr/lesson-8.md` | ⏳ | pending |
| 7225 | `apps/gtm/server/data/content/es/ai-acquisition/autonomous-sdr/lesson-9.md` | ⏳ | pending |
| 7226 | `apps/gtm/server/data/content/es/ai-acquisition/custom-ai-agents/lesson-1.md` | ⏳ | pending |
| 7227 | `apps/gtm/server/data/content/es/ai-acquisition/custom-ai-agents/lesson-10.md` | ⏳ | pending |
| 7228 | `apps/gtm/server/data/content/es/ai-acquisition/custom-ai-agents/lesson-11.md` | ⏳ | pending |
| 7229 | `apps/gtm/server/data/content/es/ai-acquisition/custom-ai-agents/lesson-12.md` | ⏳ | pending |
| 7230 | `apps/gtm/server/data/content/es/ai-acquisition/custom-ai-agents/lesson-2.md` | ⏳ | pending |
| 7231 | `apps/gtm/server/data/content/es/ai-acquisition/custom-ai-agents/lesson-3.md` | ⏳ | pending |
| 7232 | `apps/gtm/server/data/content/es/ai-acquisition/custom-ai-agents/lesson-4.md` | ⏳ | pending |
| 7233 | `apps/gtm/server/data/content/es/ai-acquisition/custom-ai-agents/lesson-5.md` | ⏳ | pending |
| 7234 | `apps/gtm/server/data/content/es/ai-acquisition/custom-ai-agents/lesson-6.md` | ⏳ | pending |
| 7235 | `apps/gtm/server/data/content/es/ai-acquisition/custom-ai-agents/lesson-7.md` | ⏳ | pending |
| 7236 | `apps/gtm/server/data/content/es/ai-acquisition/custom-ai-agents/lesson-8.md` | ⏳ | pending |
| 7237 | `apps/gtm/server/data/content/es/ai-acquisition/custom-ai-agents/lesson-9.md` | ⏳ | pending |
| 7238 | `apps/gtm/server/data/content/es/ai-acquisition/email-deliverability/lesson-1.md` | ⏳ | pending |
| 7239 | `apps/gtm/server/data/content/es/ai-acquisition/email-deliverability/lesson-10.md` | ⏳ | pending |
| 7240 | `apps/gtm/server/data/content/es/ai-acquisition/email-deliverability/lesson-11.md` | ⏳ | pending |
| 7241 | `apps/gtm/server/data/content/es/ai-acquisition/email-deliverability/lesson-12.md` | ⏳ | pending |
| 7242 | `apps/gtm/server/data/content/es/ai-acquisition/email-deliverability/lesson-2.md` | ⏳ | pending |
| 7243 | `apps/gtm/server/data/content/es/ai-acquisition/email-deliverability/lesson-3.md` | ⏳ | pending |
| 7244 | `apps/gtm/server/data/content/es/ai-acquisition/email-deliverability/lesson-4.md` | ⏳ | pending |
| 7245 | `apps/gtm/server/data/content/es/ai-acquisition/email-deliverability/lesson-5.md` | ⏳ | pending |
| 7246 | `apps/gtm/server/data/content/es/ai-acquisition/email-deliverability/lesson-6.md` | ⏳ | pending |
| 7247 | `apps/gtm/server/data/content/es/ai-acquisition/email-deliverability/lesson-7.md` | ⏳ | pending |
| 7248 | `apps/gtm/server/data/content/es/ai-acquisition/email-deliverability/lesson-8.md` | ⏳ | pending |
| 7249 | `apps/gtm/server/data/content/es/ai-acquisition/email-deliverability/lesson-9.md` | ⏳ | pending |
| 7250 | `apps/gtm/server/data/content/es/ai-acquisition/linkedin-ai/lesson-1.md` | ⏳ | pending |
| 7251 | `apps/gtm/server/data/content/es/ai-acquisition/linkedin-ai/lesson-10.md` | ⏳ | pending |
| 7252 | `apps/gtm/server/data/content/es/ai-acquisition/linkedin-ai/lesson-2.md` | ⏳ | pending |
| 7253 | `apps/gtm/server/data/content/es/ai-acquisition/linkedin-ai/lesson-3.md` | ⏳ | pending |
| 7254 | `apps/gtm/server/data/content/es/ai-acquisition/linkedin-ai/lesson-4.md` | ⏳ | pending |
| 7255 | `apps/gtm/server/data/content/es/ai-acquisition/linkedin-ai/lesson-5.md` | ⏳ | pending |
| 7256 | `apps/gtm/server/data/content/es/ai-acquisition/linkedin-ai/lesson-6.md` | ⏳ | pending |
| 7257 | `apps/gtm/server/data/content/es/ai-acquisition/linkedin-ai/lesson-7.md` | ⏳ | pending |
| 7258 | `apps/gtm/server/data/content/es/ai-acquisition/linkedin-ai/lesson-8.md` | ⏳ | pending |
| 7259 | `apps/gtm/server/data/content/es/ai-acquisition/linkedin-ai/lesson-9.md` | ⏳ | pending |
| 7260 | `apps/gtm/server/data/content/es/creator-track/audience-to-buyer/lesson-1.md` | ⏳ | pending |
| 7261 | `apps/gtm/server/data/content/es/creator-track/audience-to-buyer/lesson-10.md` | ⏳ | pending |
| 7262 | `apps/gtm/server/data/content/es/creator-track/audience-to-buyer/lesson-2.md` | ⏳ | pending |
| 7263 | `apps/gtm/server/data/content/es/creator-track/audience-to-buyer/lesson-3.md` | ⏳ | pending |
| 7264 | `apps/gtm/server/data/content/es/creator-track/audience-to-buyer/lesson-4.md` | ⏳ | pending |
| 7265 | `apps/gtm/server/data/content/es/creator-track/audience-to-buyer/lesson-5.md` | ⏳ | pending |
| 7266 | `apps/gtm/server/data/content/es/creator-track/audience-to-buyer/lesson-6.md` | ⏳ | pending |
| 7267 | `apps/gtm/server/data/content/es/creator-track/audience-to-buyer/lesson-7.md` | ⏳ | pending |
| 7268 | `apps/gtm/server/data/content/es/creator-track/audience-to-buyer/lesson-8.md` | ⏳ | pending |
| 7269 | `apps/gtm/server/data/content/es/creator-track/audience-to-buyer/lesson-9.md` | ⏳ | pending |
| 7270 | `apps/gtm/server/data/content/es/creator-track/community-led-sales/lesson-1.md` | ⏳ | pending |
| 7271 | `apps/gtm/server/data/content/es/creator-track/community-led-sales/lesson-2.md` | ⏳ | pending |
| 7272 | `apps/gtm/server/data/content/es/creator-track/community-led-sales/lesson-3.md` | ⏳ | pending |
| 7273 | `apps/gtm/server/data/content/es/creator-track/community-led-sales/lesson-4.md` | ⏳ | pending |
| 7274 | `apps/gtm/server/data/content/es/creator-track/community-led-sales/lesson-5.md` | ⏳ | pending |
| 7275 | `apps/gtm/server/data/content/es/creator-track/community-led-sales/lesson-6.md` | ⏳ | pending |
| 7276 | `apps/gtm/server/data/content/es/creator-track/community-led-sales/lesson-7.md` | ⏳ | pending |
| 7277 | `apps/gtm/server/data/content/es/creator-track/community-led-sales/lesson-8.md` | ⏳ | pending |
| 7278 | `apps/gtm/server/data/content/es/creator-track/creator-metrics/lesson-1.md` | ⏳ | pending |
| 7279 | `apps/gtm/server/data/content/es/creator-track/creator-metrics/lesson-2.md` | ⏳ | pending |
| 7280 | `apps/gtm/server/data/content/es/creator-track/creator-metrics/lesson-3.md` | ⏳ | pending |
| 7281 | `apps/gtm/server/data/content/es/creator-track/creator-metrics/lesson-4.md` | ⏳ | pending |
| 7282 | `apps/gtm/server/data/content/es/creator-track/creator-metrics/lesson-5.md` | ⏳ | pending |
| 7283 | `apps/gtm/server/data/content/es/creator-track/creator-metrics/lesson-6.md` | ⏳ | pending |
| 7284 | `apps/gtm/server/data/content/es/creator-track/creator-metrics/lesson-7.md` | ⏳ | pending |
| 7285 | `apps/gtm/server/data/content/es/creator-track/creator-metrics/lesson-8.md` | ⏳ | pending |
| 7286 | `apps/gtm/server/data/content/es/creator-track/creator-sales-conversations/lesson-1.md` | ⏳ | pending |
| 7287 | `apps/gtm/server/data/content/es/creator-track/creator-sales-conversations/lesson-10.md` | ⏳ | pending |
| 7288 | `apps/gtm/server/data/content/es/creator-track/creator-sales-conversations/lesson-2.md` | ⏳ | pending |
| 7289 | `apps/gtm/server/data/content/es/creator-track/creator-sales-conversations/lesson-3.md` | ⏳ | pending |
| 7290 | `apps/gtm/server/data/content/es/creator-track/creator-sales-conversations/lesson-4.md` | ⏳ | pending |
| 7291 | `apps/gtm/server/data/content/es/creator-track/creator-sales-conversations/lesson-5.md` | ⏳ | pending |
| 7292 | `apps/gtm/server/data/content/es/creator-track/creator-sales-conversations/lesson-6.md` | ⏳ | pending |
| 7293 | `apps/gtm/server/data/content/es/creator-track/creator-sales-conversations/lesson-7.md` | ⏳ | pending |
| 7294 | `apps/gtm/server/data/content/es/creator-track/creator-sales-conversations/lesson-8.md` | ⏳ | pending |
| 7295 | `apps/gtm/server/data/content/es/creator-track/creator-sales-conversations/lesson-9.md` | ⏳ | pending |
| 7296 | `apps/gtm/server/data/content/es/creator-track/creator-sales-mindset/lesson-1.md` | ⏳ | pending |
| 7297 | `apps/gtm/server/data/content/es/creator-track/creator-sales-mindset/lesson-2.md` | ⏳ | pending |
| 7298 | `apps/gtm/server/data/content/es/creator-track/creator-sales-mindset/lesson-3.md` | ⏳ | pending |
| 7299 | `apps/gtm/server/data/content/es/creator-track/creator-sales-mindset/lesson-4.md` | ⏳ | pending |
| 7300 | `apps/gtm/server/data/content/es/creator-track/creator-sales-mindset/lesson-5.md` | ⏳ | pending |
| 7301 | `apps/gtm/server/data/content/es/creator-track/creator-sales-mindset/lesson-6.md` | ⏳ | pending |
| 7302 | `apps/gtm/server/data/content/es/creator-track/creator-sales-mindset/lesson-7.md` | ⏳ | pending |
| 7303 | `apps/gtm/server/data/content/es/creator-track/creator-sales-mindset/lesson-8.md` | ⏳ | pending |
| 7304 | `apps/gtm/server/data/content/es/creator-track/dm-selling-social-commerce/lesson-1.md` | ⏳ | pending |
| 7305 | `apps/gtm/server/data/content/es/creator-track/dm-selling-social-commerce/lesson-2.md` | ⏳ | pending |
| 7306 | `apps/gtm/server/data/content/es/creator-track/dm-selling-social-commerce/lesson-3.md` | ⏳ | pending |
| 7307 | `apps/gtm/server/data/content/es/creator-track/dm-selling-social-commerce/lesson-4.md` | ⏳ | pending |
| 7308 | `apps/gtm/server/data/content/es/creator-track/dm-selling-social-commerce/lesson-5.md` | ⏳ | pending |
| 7309 | `apps/gtm/server/data/content/es/creator-track/dm-selling-social-commerce/lesson-6.md` | ⏳ | pending |
| 7310 | `apps/gtm/server/data/content/es/creator-track/dm-selling-social-commerce/lesson-7.md` | ⏳ | pending |
| 7311 | `apps/gtm/server/data/content/es/creator-track/dm-selling-social-commerce/lesson-8.md` | ⏳ | pending |
| 7312 | `apps/gtm/server/data/content/es/creator-track/scaling-creator-sales/lesson-1.md` | ⏳ | pending |
| 7313 | `apps/gtm/server/data/content/es/creator-track/scaling-creator-sales/lesson-10.md` | ⏳ | pending |
| 7314 | `apps/gtm/server/data/content/es/creator-track/scaling-creator-sales/lesson-2.md` | ⏳ | pending |
| 7315 | `apps/gtm/server/data/content/es/creator-track/scaling-creator-sales/lesson-3.md` | ⏳ | pending |
| 7316 | `apps/gtm/server/data/content/es/creator-track/scaling-creator-sales/lesson-4.md` | ⏳ | pending |
| 7317 | `apps/gtm/server/data/content/es/creator-track/scaling-creator-sales/lesson-5.md` | ⏳ | pending |
| 7318 | `apps/gtm/server/data/content/es/creator-track/scaling-creator-sales/lesson-6.md` | ⏳ | pending |
| 7319 | `apps/gtm/server/data/content/es/creator-track/scaling-creator-sales/lesson-7.md` | ⏳ | pending |
| 7320 | `apps/gtm/server/data/content/es/creator-track/scaling-creator-sales/lesson-8.md` | ⏳ | pending |
| 7321 | `apps/gtm/server/data/content/es/creator-track/scaling-creator-sales/lesson-9.md` | ⏳ | pending |
| 7322 | `apps/gtm/server/data/content/es/creator-track/webinar-challenge-funnels/lesson-1.md` | ⏳ | pending |
| 7323 | `apps/gtm/server/data/content/es/creator-track/webinar-challenge-funnels/lesson-10.md` | ⏳ | pending |
| 7324 | `apps/gtm/server/data/content/es/creator-track/webinar-challenge-funnels/lesson-2.md` | ⏳ | pending |
| 7325 | `apps/gtm/server/data/content/es/creator-track/webinar-challenge-funnels/lesson-3.md` | ⏳ | pending |
| 7326 | `apps/gtm/server/data/content/es/creator-track/webinar-challenge-funnels/lesson-4.md` | ⏳ | pending |
| 7327 | `apps/gtm/server/data/content/es/creator-track/webinar-challenge-funnels/lesson-5.md` | ⏳ | pending |
| 7328 | `apps/gtm/server/data/content/es/creator-track/webinar-challenge-funnels/lesson-6.md` | ⏳ | pending |
| 7329 | `apps/gtm/server/data/content/es/creator-track/webinar-challenge-funnels/lesson-7.md` | ⏳ | pending |
| 7330 | `apps/gtm/server/data/content/es/creator-track/webinar-challenge-funnels/lesson-8.md` | ⏳ | pending |
| 7331 | `apps/gtm/server/data/content/es/creator-track/webinar-challenge-funnels/lesson-9.md` | ⏳ | pending |
| 7332 | `apps/gtm/server/data/content/es/customer-success/advocacy/lesson-1.md` | ⏳ | pending |
| 7333 | `apps/gtm/server/data/content/es/customer-success/advocacy/lesson-2.md` | ⏳ | pending |
| 7334 | `apps/gtm/server/data/content/es/customer-success/advocacy/lesson-3.md` | ⏳ | pending |
| 7335 | `apps/gtm/server/data/content/es/customer-success/advocacy/lesson-4.md` | ⏳ | pending |
| 7336 | `apps/gtm/server/data/content/es/customer-success/advocacy/lesson-5.md` | ⏳ | pending |
| 7337 | `apps/gtm/server/data/content/es/customer-success/advocacy/lesson-6.md` | ⏳ | pending |
| 7338 | `apps/gtm/server/data/content/es/customer-success/advocacy/lesson-7.md` | ⏳ | pending |
| 7339 | `apps/gtm/server/data/content/es/customer-success/advocacy/lesson-8.md` | ⏳ | pending |
| 7340 | `apps/gtm/server/data/content/es/customer-success/expansion/lesson-1.md` | ⏳ | pending |
| 7341 | `apps/gtm/server/data/content/es/customer-success/expansion/lesson-2.md` | ⏳ | pending |
| 7342 | `apps/gtm/server/data/content/es/customer-success/expansion/lesson-3.md` | ⏳ | pending |
| 7343 | `apps/gtm/server/data/content/es/customer-success/expansion/lesson-4.md` | ⏳ | pending |
| 7344 | `apps/gtm/server/data/content/es/customer-success/expansion/lesson-5.md` | ⏳ | pending |
| 7345 | `apps/gtm/server/data/content/es/customer-success/expansion/lesson-6.md` | ⏳ | pending |
| 7346 | `apps/gtm/server/data/content/es/customer-success/expansion/lesson-7.md` | ⏳ | pending |
| 7347 | `apps/gtm/server/data/content/es/customer-success/expansion/lesson-8.md` | ⏳ | pending |
| 7348 | `apps/gtm/server/data/content/es/customer-success/onboarding/lesson-1.md` | ⏳ | pending |
| 7349 | `apps/gtm/server/data/content/es/customer-success/onboarding/lesson-10.md` | ⏳ | pending |
| 7350 | `apps/gtm/server/data/content/es/customer-success/onboarding/lesson-2.md` | ⏳ | pending |
| 7351 | `apps/gtm/server/data/content/es/customer-success/onboarding/lesson-3.md` | ⏳ | pending |
| 7352 | `apps/gtm/server/data/content/es/customer-success/onboarding/lesson-4.md` | ⏳ | pending |
| 7353 | `apps/gtm/server/data/content/es/customer-success/onboarding/lesson-5.md` | ⏳ | pending |
| 7354 | `apps/gtm/server/data/content/es/customer-success/onboarding/lesson-6.md` | ⏳ | pending |
| 7355 | `apps/gtm/server/data/content/es/customer-success/onboarding/lesson-7.md` | ⏳ | pending |
| 7356 | `apps/gtm/server/data/content/es/customer-success/onboarding/lesson-8.md` | ⏳ | pending |
| 7357 | `apps/gtm/server/data/content/es/customer-success/onboarding/lesson-9.md` | ⏳ | pending |
| 7358 | `apps/gtm/server/data/content/es/customer-success/retention/lesson-1.md` | ⏳ | pending |
| 7359 | `apps/gtm/server/data/content/es/customer-success/retention/lesson-10.md` | ⏳ | pending |
| 7360 | `apps/gtm/server/data/content/es/customer-success/retention/lesson-2.md` | ⏳ | pending |
| 7361 | `apps/gtm/server/data/content/es/customer-success/retention/lesson-3.md` | ⏳ | pending |
| 7362 | `apps/gtm/server/data/content/es/customer-success/retention/lesson-4.md` | ⏳ | pending |
| 7363 | `apps/gtm/server/data/content/es/customer-success/retention/lesson-5.md` | ⏳ | pending |
| 7364 | `apps/gtm/server/data/content/es/customer-success/retention/lesson-6.md` | ⏳ | pending |
| 7365 | `apps/gtm/server/data/content/es/customer-success/retention/lesson-7.md` | ⏳ | pending |
| 7366 | `apps/gtm/server/data/content/es/customer-success/retention/lesson-8.md` | ⏳ | pending |
| 7367 | `apps/gtm/server/data/content/es/customer-success/retention/lesson-9.md` | ⏳ | pending |
| 7368 | `apps/gtm/server/data/content/es/foundations/choose-path/lesson-1.md` | ⏳ | pending |
| 7369 | `apps/gtm/server/data/content/es/foundations/choose-path/lesson-2.md` | ⏳ | pending |
| 7370 | `apps/gtm/server/data/content/es/foundations/choose-path/lesson-3.md` | ⏳ | pending |
| 7371 | `apps/gtm/server/data/content/es/foundations/choose-path/lesson-4.md` | ⏳ | pending |
| 7372 | `apps/gtm/server/data/content/es/foundations/choose-path/lesson-5.md` | ⏳ | pending |
| 7373 | `apps/gtm/server/data/content/es/foundations/choose-path/lesson-6.md` | ⏳ | pending |
| 7374 | `apps/gtm/server/data/content/es/foundations/icp-builder/lesson-1.md` | ⏳ | pending |
| 7375 | `apps/gtm/server/data/content/es/foundations/icp-builder/lesson-10.md` | ⏳ | pending |
| 7376 | `apps/gtm/server/data/content/es/foundations/icp-builder/lesson-11.md` | ⏳ | pending |
| 7377 | `apps/gtm/server/data/content/es/foundations/icp-builder/lesson-12.md` | ⏳ | pending |
| 7378 | `apps/gtm/server/data/content/es/foundations/icp-builder/lesson-13.md` | ⏳ | pending |
| 7379 | `apps/gtm/server/data/content/es/foundations/icp-builder/lesson-2.md` | ⏳ | pending |
| 7380 | `apps/gtm/server/data/content/es/foundations/icp-builder/lesson-3.md` | ⏳ | pending |
| 7381 | `apps/gtm/server/data/content/es/foundations/icp-builder/lesson-4.md` | ⏳ | pending |
| 7382 | `apps/gtm/server/data/content/es/foundations/icp-builder/lesson-5.md` | ⏳ | pending |
| 7383 | `apps/gtm/server/data/content/es/foundations/icp-builder/lesson-6.md` | ⏳ | pending |
| 7384 | `apps/gtm/server/data/content/es/foundations/icp-builder/lesson-7.md` | ⏳ | pending |
| 7385 | `apps/gtm/server/data/content/es/foundations/icp-builder/lesson-8.md` | ⏳ | pending |
| 7386 | `apps/gtm/server/data/content/es/foundations/icp-builder/lesson-9.md` | ⏳ | pending |
| 7387 | `apps/gtm/server/data/content/es/foundations/list-building/lesson-1.md` | ⏳ | pending |
| 7388 | `apps/gtm/server/data/content/es/foundations/list-building/lesson-10.md` | ⏳ | pending |
| 7389 | `apps/gtm/server/data/content/es/foundations/list-building/lesson-11.md` | ⏳ | pending |
| 7390 | `apps/gtm/server/data/content/es/foundations/list-building/lesson-2.md` | ⏳ | pending |
| 7391 | `apps/gtm/server/data/content/es/foundations/list-building/lesson-3.md` | ⏳ | pending |
| 7392 | `apps/gtm/server/data/content/es/foundations/list-building/lesson-4.md` | ⏳ | pending |
| 7393 | `apps/gtm/server/data/content/es/foundations/list-building/lesson-5.md` | ⏳ | pending |
| 7394 | `apps/gtm/server/data/content/es/foundations/list-building/lesson-6.md` | ⏳ | pending |
| 7395 | `apps/gtm/server/data/content/es/foundations/list-building/lesson-7.md` | ⏳ | pending |
| 7396 | `apps/gtm/server/data/content/es/foundations/list-building/lesson-8.md` | ⏳ | pending |
| 7397 | `apps/gtm/server/data/content/es/foundations/list-building/lesson-9.md` | ⏳ | pending |
| 7398 | `apps/gtm/server/data/content/es/foundations/positioning-value/lesson-1.md` | ⏳ | pending |
| 7399 | `apps/gtm/server/data/content/es/foundations/positioning-value/lesson-10.md` | ⏳ | pending |
| 7400 | `apps/gtm/server/data/content/es/foundations/positioning-value/lesson-2.md` | ⏳ | pending |
| 7401 | `apps/gtm/server/data/content/es/foundations/positioning-value/lesson-3.md` | ⏳ | pending |
| 7402 | `apps/gtm/server/data/content/es/foundations/positioning-value/lesson-4.md` | ⏳ | pending |
| 7403 | `apps/gtm/server/data/content/es/foundations/positioning-value/lesson-5.md` | ⏳ | pending |
| 7404 | `apps/gtm/server/data/content/es/foundations/positioning-value/lesson-6.md` | ⏳ | pending |
| 7405 | `apps/gtm/server/data/content/es/foundations/positioning-value/lesson-7.md` | ⏳ | pending |
| 7406 | `apps/gtm/server/data/content/es/foundations/positioning-value/lesson-8.md` | ⏳ | pending |
| 7407 | `apps/gtm/server/data/content/es/foundations/positioning-value/lesson-9.md` | ⏳ | pending |
| 7408 | `apps/gtm/server/data/content/es/foundations/sales-psychology/lesson-1.md` | ⏳ | pending |
| 7409 | `apps/gtm/server/data/content/es/foundations/sales-psychology/lesson-2.md` | ⏳ | pending |
| 7410 | `apps/gtm/server/data/content/es/foundations/sales-psychology/lesson-3.md` | ⏳ | pending |
| 7411 | `apps/gtm/server/data/content/es/foundations/sales-psychology/lesson-4.md` | ⏳ | pending |
| 7412 | `apps/gtm/server/data/content/es/foundations/sales-psychology/lesson-5.md` | ⏳ | pending |
| 7413 | `apps/gtm/server/data/content/es/foundations/sales-psychology/lesson-6.md` | ⏳ | pending |
| 7414 | `apps/gtm/server/data/content/es/foundations/sales-psychology/lesson-7.md` | ⏳ | pending |
| 7415 | `apps/gtm/server/data/content/es/foundations/sales-psychology/lesson-8.md` | ⏳ | pending |
| 7416 | `apps/gtm/server/data/content/es/marketing-engine/cold-email-mastery/lesson-1.md` | ⏳ | pending |
| 7417 | `apps/gtm/server/data/content/es/marketing-engine/cold-email-mastery/lesson-10.md` | ⏳ | pending |
| 7418 | `apps/gtm/server/data/content/es/marketing-engine/cold-email-mastery/lesson-11.md` | ⏳ | pending |
| 7419 | `apps/gtm/server/data/content/es/marketing-engine/cold-email-mastery/lesson-12.md` | ⏳ | pending |
| 7420 | `apps/gtm/server/data/content/es/marketing-engine/cold-email-mastery/lesson-2.md` | ⏳ | pending |
| 7421 | `apps/gtm/server/data/content/es/marketing-engine/cold-email-mastery/lesson-3.md` | ⏳ | pending |
| 7422 | `apps/gtm/server/data/content/es/marketing-engine/cold-email-mastery/lesson-4.md` | ⏳ | pending |
| 7423 | `apps/gtm/server/data/content/es/marketing-engine/cold-email-mastery/lesson-5.md` | ⏳ | pending |
| 7424 | `apps/gtm/server/data/content/es/marketing-engine/cold-email-mastery/lesson-6.md` | ⏳ | pending |
| 7425 | `apps/gtm/server/data/content/es/marketing-engine/cold-email-mastery/lesson-7.md` | ⏳ | pending |
| 7426 | `apps/gtm/server/data/content/es/marketing-engine/cold-email-mastery/lesson-8.md` | ⏳ | pending |
| 7427 | `apps/gtm/server/data/content/es/marketing-engine/cold-email-mastery/lesson-9.md` | ⏳ | pending |
| 7428 | `apps/gtm/server/data/content/es/marketing-engine/community-lead-gen/lesson-1.md` | ⏳ | pending |
| 7429 | `apps/gtm/server/data/content/es/marketing-engine/community-lead-gen/lesson-10.md` | ⏳ | pending |
| 7430 | `apps/gtm/server/data/content/es/marketing-engine/community-lead-gen/lesson-11.md` | ⏳ | pending |
| 7431 | `apps/gtm/server/data/content/es/marketing-engine/community-lead-gen/lesson-2.md` | ⏳ | pending |
| 7432 | `apps/gtm/server/data/content/es/marketing-engine/community-lead-gen/lesson-3.md` | ⏳ | pending |
| 7433 | `apps/gtm/server/data/content/es/marketing-engine/community-lead-gen/lesson-4.md` | ⏳ | pending |
| 7434 | `apps/gtm/server/data/content/es/marketing-engine/community-lead-gen/lesson-5.md` | ⏳ | pending |
| 7435 | `apps/gtm/server/data/content/es/marketing-engine/community-lead-gen/lesson-6.md` | ⏳ | pending |
| 7436 | `apps/gtm/server/data/content/es/marketing-engine/community-lead-gen/lesson-7.md` | ⏳ | pending |
| 7437 | `apps/gtm/server/data/content/es/marketing-engine/community-lead-gen/lesson-8.md` | ⏳ | pending |
| 7438 | `apps/gtm/server/data/content/es/marketing-engine/community-lead-gen/lesson-9.md` | ⏳ | pending |
| 7439 | `apps/gtm/server/data/content/es/marketing-engine/course-11-social-proof-referral/lesson-1.md` | ⏳ | pending |
| 7440 | `apps/gtm/server/data/content/es/marketing-engine/course-11-social-proof-referral/lesson-10.md` | ⏳ | pending |
| 7441 | `apps/gtm/server/data/content/es/marketing-engine/course-11-social-proof-referral/lesson-2.md` | ⏳ | pending |
| 7442 | `apps/gtm/server/data/content/es/marketing-engine/course-11-social-proof-referral/lesson-3.md` | ⏳ | pending |
| 7443 | `apps/gtm/server/data/content/es/marketing-engine/course-11-social-proof-referral/lesson-4.md` | ⏳ | pending |
| 7444 | `apps/gtm/server/data/content/es/marketing-engine/course-11-social-proof-referral/lesson-5.md` | ⏳ | pending |
| 7445 | `apps/gtm/server/data/content/es/marketing-engine/course-11-social-proof-referral/lesson-6.md` | ⏳ | pending |
| 7446 | `apps/gtm/server/data/content/es/marketing-engine/course-11-social-proof-referral/lesson-7.md` | ⏳ | pending |
| 7447 | `apps/gtm/server/data/content/es/marketing-engine/course-11-social-proof-referral/lesson-8.md` | ⏳ | pending |
| 7448 | `apps/gtm/server/data/content/es/marketing-engine/course-11-social-proof-referral/lesson-9.md` | ⏳ | pending |
| 7449 | `apps/gtm/server/data/content/es/marketing-engine/course-12-marketing-automation-analytics/lesson-1.md` | ⏳ | pending |
| 7450 | `apps/gtm/server/data/content/es/marketing-engine/course-12-marketing-automation-analytics/lesson-10.md` | ⏳ | pending |
| 7451 | `apps/gtm/server/data/content/es/marketing-engine/course-12-marketing-automation-analytics/lesson-2.md` | ⏳ | pending |
| 7452 | `apps/gtm/server/data/content/es/marketing-engine/course-12-marketing-automation-analytics/lesson-3.md` | ⏳ | pending |
| 7453 | `apps/gtm/server/data/content/es/marketing-engine/course-12-marketing-automation-analytics/lesson-4.md` | ⏳ | pending |
| 7454 | `apps/gtm/server/data/content/es/marketing-engine/course-12-marketing-automation-analytics/lesson-5.md` | ⏳ | pending |
| 7455 | `apps/gtm/server/data/content/es/marketing-engine/course-12-marketing-automation-analytics/lesson-6.md` | ⏳ | pending |
| 7456 | `apps/gtm/server/data/content/es/marketing-engine/course-12-marketing-automation-analytics/lesson-7.md` | ⏳ | pending |
| 7457 | `apps/gtm/server/data/content/es/marketing-engine/course-12-marketing-automation-analytics/lesson-8.md` | ⏳ | pending |
| 7458 | `apps/gtm/server/data/content/es/marketing-engine/course-12-marketing-automation-analytics/lesson-9.md` | ⏳ | pending |
| 7459 | `apps/gtm/server/data/content/es/marketing-engine/email-nurture/lesson-1.md` | ⏳ | pending |
| 7460 | `apps/gtm/server/data/content/es/marketing-engine/email-nurture/lesson-10.md` | ⏳ | pending |
| 7461 | `apps/gtm/server/data/content/es/marketing-engine/email-nurture/lesson-2.md` | ⏳ | pending |
| 7462 | `apps/gtm/server/data/content/es/marketing-engine/email-nurture/lesson-3.md` | ⏳ | pending |
| 7463 | `apps/gtm/server/data/content/es/marketing-engine/email-nurture/lesson-4.md` | ⏳ | pending |
| 7464 | `apps/gtm/server/data/content/es/marketing-engine/email-nurture/lesson-5.md` | ⏳ | pending |
| 7465 | `apps/gtm/server/data/content/es/marketing-engine/email-nurture/lesson-6.md` | ⏳ | pending |
| 7466 | `apps/gtm/server/data/content/es/marketing-engine/email-nurture/lesson-7.md` | ⏳ | pending |
| 7467 | `apps/gtm/server/data/content/es/marketing-engine/email-nurture/lesson-8.md` | ⏳ | pending |
| 7468 | `apps/gtm/server/data/content/es/marketing-engine/email-nurture/lesson-9.md` | ⏳ | pending |
| 7469 | `apps/gtm/server/data/content/es/marketing-engine/linkedin-engine/lesson-1.md` | ⏳ | pending |
| 7470 | `apps/gtm/server/data/content/es/marketing-engine/linkedin-engine/lesson-10.md` | ⏳ | pending |
| 7471 | `apps/gtm/server/data/content/es/marketing-engine/linkedin-engine/lesson-2.md` | ⏳ | pending |
| 7472 | `apps/gtm/server/data/content/es/marketing-engine/linkedin-engine/lesson-3.md` | ⏳ | pending |
| 7473 | `apps/gtm/server/data/content/es/marketing-engine/linkedin-engine/lesson-4.md` | ⏳ | pending |
| 7474 | `apps/gtm/server/data/content/es/marketing-engine/linkedin-engine/lesson-5.md` | ⏳ | pending |
| 7475 | `apps/gtm/server/data/content/es/marketing-engine/linkedin-engine/lesson-6.md` | ⏳ | pending |
| 7476 | `apps/gtm/server/data/content/es/marketing-engine/linkedin-engine/lesson-7.md` | ⏳ | pending |
| 7477 | `apps/gtm/server/data/content/es/marketing-engine/linkedin-engine/lesson-8.md` | ⏳ | pending |
| 7478 | `apps/gtm/server/data/content/es/marketing-engine/linkedin-engine/lesson-9.md` | ⏳ | pending |
| 7479 | `apps/gtm/server/data/content/es/marketing-engine/seo-aeo/lesson-1.md` | ⏳ | pending |
| 7480 | `apps/gtm/server/data/content/es/marketing-engine/seo-aeo/lesson-10.md` | ⏳ | pending |
| 7481 | `apps/gtm/server/data/content/es/marketing-engine/seo-aeo/lesson-11.md` | ⏳ | pending |
| 7482 | `apps/gtm/server/data/content/es/marketing-engine/seo-aeo/lesson-12.md` | ⏳ | pending |
| 7483 | `apps/gtm/server/data/content/es/marketing-engine/seo-aeo/lesson-2.md` | ⏳ | pending |
| 7484 | `apps/gtm/server/data/content/es/marketing-engine/seo-aeo/lesson-3.md` | ⏳ | pending |
| 7485 | `apps/gtm/server/data/content/es/marketing-engine/seo-aeo/lesson-4.md` | ⏳ | pending |
| 7486 | `apps/gtm/server/data/content/es/marketing-engine/seo-aeo/lesson-5.md` | ⏳ | pending |
| 7487 | `apps/gtm/server/data/content/es/marketing-engine/seo-aeo/lesson-6.md` | ⏳ | pending |
| 7488 | `apps/gtm/server/data/content/es/marketing-engine/seo-aeo/lesson-7.md` | ⏳ | pending |
| 7489 | `apps/gtm/server/data/content/es/marketing-engine/seo-aeo/lesson-8.md` | ⏳ | pending |
| 7490 | `apps/gtm/server/data/content/es/marketing-engine/seo-aeo/lesson-9.md` | ⏳ | pending |
| 7491 | `apps/gtm/server/data/content/es/marketing-engine/technical-content/lesson-1.md` | ⏳ | pending |
| 7492 | `apps/gtm/server/data/content/es/marketing-engine/technical-content/lesson-10.md` | ⏳ | pending |
| 7493 | `apps/gtm/server/data/content/es/marketing-engine/technical-content/lesson-11.md` | ⏳ | pending |
| 7494 | `apps/gtm/server/data/content/es/marketing-engine/technical-content/lesson-12.md` | ⏳ | pending |
| 7495 | `apps/gtm/server/data/content/es/marketing-engine/technical-content/lesson-13.md` | ⏳ | pending |
| 7496 | `apps/gtm/server/data/content/es/marketing-engine/technical-content/lesson-2.md` | ⏳ | pending |
| 7497 | `apps/gtm/server/data/content/es/marketing-engine/technical-content/lesson-3.md` | ⏳ | pending |
| 7498 | `apps/gtm/server/data/content/es/marketing-engine/technical-content/lesson-4.md` | ⏳ | pending |
| 7499 | `apps/gtm/server/data/content/es/marketing-engine/technical-content/lesson-5.md` | ⏳ | pending |
| 7500 | `apps/gtm/server/data/content/es/marketing-engine/technical-content/lesson-6.md` | ⏳ | pending |
| 7501 | `apps/gtm/server/data/content/es/marketing-engine/technical-content/lesson-7.md` | ⏳ | pending |
| 7502 | `apps/gtm/server/data/content/es/marketing-engine/technical-content/lesson-8.md` | ⏳ | pending |
| 7503 | `apps/gtm/server/data/content/es/marketing-engine/technical-content/lesson-9.md` | ⏳ | pending |
| 7504 | `apps/gtm/server/data/content/es/operations-systems/analytics/lesson-1.md` | ⏳ | pending |
| 7505 | `apps/gtm/server/data/content/es/operations-systems/analytics/lesson-10.md` | ⏳ | pending |
| 7506 | `apps/gtm/server/data/content/es/operations-systems/analytics/lesson-2.md` | ⏳ | pending |
| 7507 | `apps/gtm/server/data/content/es/operations-systems/analytics/lesson-3.md` | ⏳ | pending |
| 7508 | `apps/gtm/server/data/content/es/operations-systems/analytics/lesson-4.md` | ⏳ | pending |
| 7509 | `apps/gtm/server/data/content/es/operations-systems/analytics/lesson-5.md` | ⏳ | pending |
| 7510 | `apps/gtm/server/data/content/es/operations-systems/analytics/lesson-6.md` | ⏳ | pending |
| 7511 | `apps/gtm/server/data/content/es/operations-systems/analytics/lesson-7.md` | ⏳ | pending |
| 7512 | `apps/gtm/server/data/content/es/operations-systems/analytics/lesson-8.md` | ⏳ | pending |
| 7513 | `apps/gtm/server/data/content/es/operations-systems/analytics/lesson-9.md` | ⏳ | pending |
| 7514 | `apps/gtm/server/data/content/es/operations-systems/automation/lesson-1.md` | ⏳ | pending |
| 7515 | `apps/gtm/server/data/content/es/operations-systems/automation/lesson-10.md` | ⏳ | pending |
| 7516 | `apps/gtm/server/data/content/es/operations-systems/automation/lesson-2.md` | ⏳ | pending |
| 7517 | `apps/gtm/server/data/content/es/operations-systems/automation/lesson-3.md` | ⏳ | pending |
| 7518 | `apps/gtm/server/data/content/es/operations-systems/automation/lesson-4.md` | ⏳ | pending |
| 7519 | `apps/gtm/server/data/content/es/operations-systems/automation/lesson-5.md` | ⏳ | pending |
| 7520 | `apps/gtm/server/data/content/es/operations-systems/automation/lesson-6.md` | ⏳ | pending |
| 7521 | `apps/gtm/server/data/content/es/operations-systems/automation/lesson-7.md` | ⏳ | pending |
| 7522 | `apps/gtm/server/data/content/es/operations-systems/automation/lesson-8.md` | ⏳ | pending |
| 7523 | `apps/gtm/server/data/content/es/operations-systems/automation/lesson-9.md` | ⏳ | pending |
| 7524 | `apps/gtm/server/data/content/es/operations-systems/capstone/lesson-1.md` | ⏳ | pending |
| 7525 | `apps/gtm/server/data/content/es/operations-systems/capstone/lesson-10.md` | ⏳ | pending |
| 7526 | `apps/gtm/server/data/content/es/operations-systems/capstone/lesson-11.md` | ⏳ | pending |
| 7527 | `apps/gtm/server/data/content/es/operations-systems/capstone/lesson-12.md` | ⏳ | pending |
| 7528 | `apps/gtm/server/data/content/es/operations-systems/capstone/lesson-2.md` | ⏳ | pending |
| 7529 | `apps/gtm/server/data/content/es/operations-systems/capstone/lesson-3.md` | ⏳ | pending |
| 7530 | `apps/gtm/server/data/content/es/operations-systems/capstone/lesson-4.md` | ⏳ | pending |
| 7531 | `apps/gtm/server/data/content/es/operations-systems/capstone/lesson-5.md` | ⏳ | pending |
| 7532 | `apps/gtm/server/data/content/es/operations-systems/capstone/lesson-6.md` | ⏳ | pending |
| 7533 | `apps/gtm/server/data/content/es/operations-systems/capstone/lesson-7.md` | ⏳ | pending |
| 7534 | `apps/gtm/server/data/content/es/operations-systems/capstone/lesson-8.md` | ⏳ | pending |
| 7535 | `apps/gtm/server/data/content/es/operations-systems/capstone/lesson-9.md` | ⏳ | pending |
| 7536 | `apps/gtm/server/data/content/es/operations-systems/crm-setup/lesson-1.md` | ⏳ | pending |
| 7537 | `apps/gtm/server/data/content/es/operations-systems/crm-setup/lesson-10.md` | ⏳ | pending |
| 7538 | `apps/gtm/server/data/content/es/operations-systems/crm-setup/lesson-2.md` | ⏳ | pending |
| 7539 | `apps/gtm/server/data/content/es/operations-systems/crm-setup/lesson-3.md` | ⏳ | pending |
| 7540 | `apps/gtm/server/data/content/es/operations-systems/crm-setup/lesson-4.md` | ⏳ | pending |
| 7541 | `apps/gtm/server/data/content/es/operations-systems/crm-setup/lesson-5.md` | ⏳ | pending |
| 7542 | `apps/gtm/server/data/content/es/operations-systems/crm-setup/lesson-6.md` | ⏳ | pending |
| 7543 | `apps/gtm/server/data/content/es/operations-systems/crm-setup/lesson-7.md` | ⏳ | pending |
| 7544 | `apps/gtm/server/data/content/es/operations-systems/crm-setup/lesson-8.md` | ⏳ | pending |
| 7545 | `apps/gtm/server/data/content/es/operations-systems/crm-setup/lesson-9.md` | ⏳ | pending |
| 7546 | `apps/gtm/server/data/content/es/operations-systems/finance/lesson-1.md` | ⏳ | pending |
| 7547 | `apps/gtm/server/data/content/es/operations-systems/finance/lesson-2.md` | ⏳ | pending |
| 7548 | `apps/gtm/server/data/content/es/operations-systems/finance/lesson-3.md` | ⏳ | pending |
| 7549 | `apps/gtm/server/data/content/es/operations-systems/finance/lesson-4.md` | ⏳ | pending |
| 7550 | `apps/gtm/server/data/content/es/operations-systems/finance/lesson-5.md` | ⏳ | pending |
| 7551 | `apps/gtm/server/data/content/es/operations-systems/finance/lesson-6.md` | ⏳ | pending |
| 7552 | `apps/gtm/server/data/content/es/operations-systems/finance/lesson-7.md` | ⏳ | pending |
| 7553 | `apps/gtm/server/data/content/es/operations-systems/legal/lesson-1.md` | ⏳ | pending |
| 7554 | `apps/gtm/server/data/content/es/operations-systems/legal/lesson-2.md` | ⏳ | pending |
| 7555 | `apps/gtm/server/data/content/es/operations-systems/legal/lesson-3.md` | ⏳ | pending |
| 7556 | `apps/gtm/server/data/content/es/operations-systems/legal/lesson-4.md` | ⏳ | pending |
| 7557 | `apps/gtm/server/data/content/es/operations-systems/legal/lesson-5.md` | ⏳ | pending |
| 7558 | `apps/gtm/server/data/content/es/operations-systems/legal/lesson-6.md` | ⏳ | pending |
| 7559 | `apps/gtm/server/data/content/es/operations-systems/legal/lesson-7.md` | ⏳ | pending |
| 7560 | `apps/gtm/server/data/content/es/operations-systems/outsourcing/lesson-1.md` | ⏳ | pending |
| 7561 | `apps/gtm/server/data/content/es/operations-systems/outsourcing/lesson-2.md` | ⏳ | pending |
| 7562 | `apps/gtm/server/data/content/es/operations-systems/outsourcing/lesson-3.md` | ⏳ | pending |
| 7563 | `apps/gtm/server/data/content/es/operations-systems/outsourcing/lesson-4.md` | ⏳ | pending |
| 7564 | `apps/gtm/server/data/content/es/operations-systems/outsourcing/lesson-5.md` | ⏳ | pending |
| 7565 | `apps/gtm/server/data/content/es/operations-systems/outsourcing/lesson-6.md` | ⏳ | pending |
| 7566 | `apps/gtm/server/data/content/es/operations-systems/outsourcing/lesson-7.md` | ⏳ | pending |
| 7567 | `apps/gtm/server/data/content/es/operations-systems/outsourcing/lesson-8.md` | ⏳ | pending |
| 7568 | `apps/gtm/server/data/content/es/operations-systems/playbook/lesson-1.md` | ⏳ | pending |
| 7569 | `apps/gtm/server/data/content/es/operations-systems/playbook/lesson-10.md` | ⏳ | pending |
| 7570 | `apps/gtm/server/data/content/es/operations-systems/playbook/lesson-2.md` | ⏳ | pending |
| 7571 | `apps/gtm/server/data/content/es/operations-systems/playbook/lesson-3.md` | ⏳ | pending |
| 7572 | `apps/gtm/server/data/content/es/operations-systems/playbook/lesson-4.md` | ⏳ | pending |
| 7573 | `apps/gtm/server/data/content/es/operations-systems/playbook/lesson-5.md` | ⏳ | pending |
| 7574 | `apps/gtm/server/data/content/es/operations-systems/playbook/lesson-6.md` | ⏳ | pending |
| 7575 | `apps/gtm/server/data/content/es/operations-systems/playbook/lesson-7.md` | ⏳ | pending |
| 7576 | `apps/gtm/server/data/content/es/operations-systems/playbook/lesson-8.md` | ⏳ | pending |
| 7577 | `apps/gtm/server/data/content/es/operations-systems/playbook/lesson-9.md` | ⏳ | pending |
| 7578 | `apps/gtm/server/data/content/es/operations-systems/scale/lesson-1.md` | ⏳ | pending |
| 7579 | `apps/gtm/server/data/content/es/operations-systems/scale/lesson-10.md` | ⏳ | pending |
| 7580 | `apps/gtm/server/data/content/es/operations-systems/scale/lesson-2.md` | ⏳ | pending |
| 7581 | `apps/gtm/server/data/content/es/operations-systems/scale/lesson-3.md` | ⏳ | pending |
| 7582 | `apps/gtm/server/data/content/es/operations-systems/scale/lesson-4.md` | ⏳ | pending |
| 7583 | `apps/gtm/server/data/content/es/operations-systems/scale/lesson-5.md` | ⏳ | pending |
| 7584 | `apps/gtm/server/data/content/es/operations-systems/scale/lesson-6.md` | ⏳ | pending |
| 7585 | `apps/gtm/server/data/content/es/operations-systems/scale/lesson-7.md` | ⏳ | pending |
| 7586 | `apps/gtm/server/data/content/es/operations-systems/scale/lesson-8.md` | ⏳ | pending |
| 7587 | `apps/gtm/server/data/content/es/operations-systems/scale/lesson-9.md` | ⏳ | pending |
| 7588 | `apps/gtm/server/data/content/es/sales-methodology/closing-closing/lesson-1.md` | ⏳ | pending |
| 7589 | `apps/gtm/server/data/content/es/sales-methodology/closing-closing/lesson-10.md` | ⏳ | pending |
| 7590 | `apps/gtm/server/data/content/es/sales-methodology/closing-closing/lesson-2.md` | ⏳ | pending |
| 7591 | `apps/gtm/server/data/content/es/sales-methodology/closing-closing/lesson-3.md` | ⏳ | pending |
| 7592 | `apps/gtm/server/data/content/es/sales-methodology/closing-closing/lesson-4.md` | ⏳ | pending |
| 7593 | `apps/gtm/server/data/content/es/sales-methodology/closing-closing/lesson-5.md` | ⏳ | pending |
| 7594 | `apps/gtm/server/data/content/es/sales-methodology/closing-closing/lesson-6.md` | ⏳ | pending |
| 7595 | `apps/gtm/server/data/content/es/sales-methodology/closing-closing/lesson-7.md` | ⏳ | pending |
| 7596 | `apps/gtm/server/data/content/es/sales-methodology/closing-closing/lesson-8.md` | ⏳ | pending |
| 7597 | `apps/gtm/server/data/content/es/sales-methodology/closing-closing/lesson-9.md` | ⏳ | pending |
| 7598 | `apps/gtm/server/data/content/es/sales-methodology/course-15-discovery-simulations/lesson-1.md` | ⏳ | pending |
| 7599 | `apps/gtm/server/data/content/es/sales-methodology/course-15-discovery-simulations/lesson-10.md` | ⏳ | pending |
| 7600 | `apps/gtm/server/data/content/es/sales-methodology/course-15-discovery-simulations/lesson-2.md` | ⏳ | pending |
| 7601 | `apps/gtm/server/data/content/es/sales-methodology/course-15-discovery-simulations/lesson-3.md` | ⏳ | pending |
| 7602 | `apps/gtm/server/data/content/es/sales-methodology/course-15-discovery-simulations/lesson-4.md` | ⏳ | pending |
| 7603 | `apps/gtm/server/data/content/es/sales-methodology/course-15-discovery-simulations/lesson-5.md` | ⏳ | pending |
| 7604 | `apps/gtm/server/data/content/es/sales-methodology/course-15-discovery-simulations/lesson-6.md` | ⏳ | pending |
| 7605 | `apps/gtm/server/data/content/es/sales-methodology/course-15-discovery-simulations/lesson-7.md` | ⏳ | pending |
| 7606 | `apps/gtm/server/data/content/es/sales-methodology/course-15-discovery-simulations/lesson-8.md` | ⏳ | pending |
| 7607 | `apps/gtm/server/data/content/es/sales-methodology/course-15-discovery-simulations/lesson-9.md` | ⏳ | pending |
| 7608 | `apps/gtm/server/data/content/es/sales-methodology/demo-architecture/lesson-1.md` | ⏳ | pending |
| 7609 | `apps/gtm/server/data/content/es/sales-methodology/demo-architecture/lesson-2.md` | ⏳ | pending |
| 7610 | `apps/gtm/server/data/content/es/sales-methodology/demo-architecture/lesson-3.md` | ⏳ | pending |
| 7611 | `apps/gtm/server/data/content/es/sales-methodology/demo-architecture/lesson-4.md` | ⏳ | pending |
| 7612 | `apps/gtm/server/data/content/es/sales-methodology/demo-architecture/lesson-5.md` | ⏳ | pending |
| 7613 | `apps/gtm/server/data/content/es/sales-methodology/demo-architecture/lesson-6.md` | ⏳ | pending |
| 7614 | `apps/gtm/server/data/content/es/sales-methodology/demo-architecture/lesson-7.md` | ⏳ | pending |
| 7615 | `apps/gtm/server/data/content/es/sales-methodology/demo-architecture/lesson-8.md` | ⏳ | pending |
| 7616 | `apps/gtm/server/data/content/es/sales-methodology/demo-architecture/lesson-9.md` | ⏳ | pending |
| 7617 | `apps/gtm/server/data/content/es/sales-methodology/disc-personas/lesson-1.md` | ⏳ | pending |
| 7618 | `apps/gtm/server/data/content/es/sales-methodology/disc-personas/lesson-10.md` | ⏳ | pending |
| 7619 | `apps/gtm/server/data/content/es/sales-methodology/disc-personas/lesson-11.md` | ⏳ | pending |
| 7620 | `apps/gtm/server/data/content/es/sales-methodology/disc-personas/lesson-12.md` | ⏳ | pending |
| 7621 | `apps/gtm/server/data/content/es/sales-methodology/disc-personas/lesson-2.md` | ⏳ | pending |
| 7622 | `apps/gtm/server/data/content/es/sales-methodology/disc-personas/lesson-3.md` | ⏳ | pending |
| 7623 | `apps/gtm/server/data/content/es/sales-methodology/disc-personas/lesson-4.md` | ⏳ | pending |
| 7624 | `apps/gtm/server/data/content/es/sales-methodology/disc-personas/lesson-5.md` | ⏳ | pending |
| 7625 | `apps/gtm/server/data/content/es/sales-methodology/disc-personas/lesson-6.md` | ⏳ | pending |
| 7626 | `apps/gtm/server/data/content/es/sales-methodology/disc-personas/lesson-7.md` | ⏳ | pending |
| 7627 | `apps/gtm/server/data/content/es/sales-methodology/disc-personas/lesson-8.md` | ⏳ | pending |
| 7628 | `apps/gtm/server/data/content/es/sales-methodology/disc-personas/lesson-9.md` | ⏳ | pending |
| 7629 | `apps/gtm/server/data/content/es/sales-methodology/discovery-framework/lesson-1.md` | ⏳ | pending |
| 7630 | `apps/gtm/server/data/content/es/sales-methodology/discovery-framework/lesson-10.md` | ⏳ | pending |
| 7631 | `apps/gtm/server/data/content/es/sales-methodology/discovery-framework/lesson-11.md` | ⏳ | pending |
| 7632 | `apps/gtm/server/data/content/es/sales-methodology/discovery-framework/lesson-12.md` | ⏳ | pending |
| 7633 | `apps/gtm/server/data/content/es/sales-methodology/discovery-framework/lesson-2.md` | ⏳ | pending |
| 7634 | `apps/gtm/server/data/content/es/sales-methodology/discovery-framework/lesson-3.md` | ⏳ | pending |
| 7635 | `apps/gtm/server/data/content/es/sales-methodology/discovery-framework/lesson-4.md` | ⏳ | pending |
| 7636 | `apps/gtm/server/data/content/es/sales-methodology/discovery-framework/lesson-5.md` | ⏳ | pending |
| 7637 | `apps/gtm/server/data/content/es/sales-methodology/discovery-framework/lesson-6.md` | ⏳ | pending |
| 7638 | `apps/gtm/server/data/content/es/sales-methodology/discovery-framework/lesson-7.md` | ⏳ | pending |
| 7639 | `apps/gtm/server/data/content/es/sales-methodology/discovery-framework/lesson-8.md` | ⏳ | pending |
| 7640 | `apps/gtm/server/data/content/es/sales-methodology/discovery-framework/lesson-9.md` | ⏳ | pending |
| 7641 | `apps/gtm/server/data/content/es/sales-methodology/objection-handling/lesson-1.md` | ⏳ | pending |
| 7642 | `apps/gtm/server/data/content/es/sales-methodology/objection-handling/lesson-10.md` | ⏳ | pending |
| 7643 | `apps/gtm/server/data/content/es/sales-methodology/objection-handling/lesson-2.md` | ⏳ | pending |
| 7644 | `apps/gtm/server/data/content/es/sales-methodology/objection-handling/lesson-3.md` | ⏳ | pending |
| 7645 | `apps/gtm/server/data/content/es/sales-methodology/objection-handling/lesson-4.md` | ⏳ | pending |
| 7646 | `apps/gtm/server/data/content/es/sales-methodology/objection-handling/lesson-5.md` | ⏳ | pending |
| 7647 | `apps/gtm/server/data/content/es/sales-methodology/objection-handling/lesson-6.md` | ⏳ | pending |
| 7648 | `apps/gtm/server/data/content/es/sales-methodology/objection-handling/lesson-7.md` | ⏳ | pending |
| 7649 | `apps/gtm/server/data/content/es/sales-methodology/objection-handling/lesson-8.md` | ⏳ | pending |
| 7650 | `apps/gtm/server/data/content/es/sales-methodology/objection-handling/lesson-9.md` | ⏳ | pending |
| 7651 | `apps/gtm/server/data/content/es/sales-methodology/pipeline-management/lesson-1.md` | ⏳ | pending |
| 7652 | `apps/gtm/server/data/content/es/sales-methodology/pipeline-management/lesson-10.md` | ⏳ | pending |
| 7653 | `apps/gtm/server/data/content/es/sales-methodology/pipeline-management/lesson-2.md` | ⏳ | pending |
| 7654 | `apps/gtm/server/data/content/es/sales-methodology/pipeline-management/lesson-3.md` | ⏳ | pending |
| 7655 | `apps/gtm/server/data/content/es/sales-methodology/pipeline-management/lesson-4.md` | ⏳ | pending |
| 7656 | `apps/gtm/server/data/content/es/sales-methodology/pipeline-management/lesson-5.md` | ⏳ | pending |
| 7657 | `apps/gtm/server/data/content/es/sales-methodology/pipeline-management/lesson-6.md` | ⏳ | pending |
| 7658 | `apps/gtm/server/data/content/es/sales-methodology/pipeline-management/lesson-7.md` | ⏳ | pending |
| 7659 | `apps/gtm/server/data/content/es/sales-methodology/pipeline-management/lesson-8.md` | ⏳ | pending |
| 7660 | `apps/gtm/server/data/content/es/sales-methodology/pipeline-management/lesson-9.md` | ⏳ | pending |
| 7661 | `apps/gtm/server/data/content/es/sales-methodology/proposals-pricing/lesson-1.md` | ⏳ | pending |
| 7662 | `apps/gtm/server/data/content/es/sales-methodology/proposals-pricing/lesson-10.md` | ⏳ | pending |
| 7663 | `apps/gtm/server/data/content/es/sales-methodology/proposals-pricing/lesson-2.md` | ⏳ | pending |
| 7664 | `apps/gtm/server/data/content/es/sales-methodology/proposals-pricing/lesson-3.md` | ⏳ | pending |
| 7665 | `apps/gtm/server/data/content/es/sales-methodology/proposals-pricing/lesson-4.md` | ⏳ | pending |
| 7666 | `apps/gtm/server/data/content/es/sales-methodology/proposals-pricing/lesson-5.md` | ⏳ | pending |
| 7667 | `apps/gtm/server/data/content/es/sales-methodology/proposals-pricing/lesson-6.md` | ⏳ | pending |
| 7668 | `apps/gtm/server/data/content/es/sales-methodology/proposals-pricing/lesson-7.md` | ⏳ | pending |
| 7669 | `apps/gtm/server/data/content/es/sales-methodology/proposals-pricing/lesson-8.md` | ⏳ | pending |
| 7670 | `apps/gtm/server/data/content/es/sales-methodology/proposals-pricing/lesson-9.md` | ⏳ | pending |
| 7671 | `apps/gtm/server/data/content/foundations/choose-path/lesson-1.md` | ⏳ | pending |
| 7672 | `apps/gtm/server/data/content/foundations/choose-path/lesson-2.md` | ⏳ | pending |
| 7673 | `apps/gtm/server/data/content/foundations/choose-path/lesson-3.md` | ⏳ | pending |
| 7674 | `apps/gtm/server/data/content/foundations/choose-path/lesson-4.md` | ⏳ | pending |
| 7675 | `apps/gtm/server/data/content/foundations/choose-path/lesson-5.md` | ⏳ | pending |
| 7676 | `apps/gtm/server/data/content/foundations/choose-path/lesson-6.md` | ⏳ | pending |
| 7677 | `apps/gtm/server/data/content/foundations/icp-builder/lesson-1.md` | ⏳ | pending |
| 7678 | `apps/gtm/server/data/content/foundations/icp-builder/lesson-10.md` | ⏳ | pending |
| 7679 | `apps/gtm/server/data/content/foundations/icp-builder/lesson-11.md` | ⏳ | pending |
| 7680 | `apps/gtm/server/data/content/foundations/icp-builder/lesson-12.md` | ⏳ | pending |
| 7681 | `apps/gtm/server/data/content/foundations/icp-builder/lesson-13.md` | ⏳ | pending |
| 7682 | `apps/gtm/server/data/content/foundations/icp-builder/lesson-2.md` | ⏳ | pending |
| 7683 | `apps/gtm/server/data/content/foundations/icp-builder/lesson-3.md` | ⏳ | pending |
| 7684 | `apps/gtm/server/data/content/foundations/icp-builder/lesson-4.md` | ⏳ | pending |
| 7685 | `apps/gtm/server/data/content/foundations/icp-builder/lesson-5.md` | ⏳ | pending |
| 7686 | `apps/gtm/server/data/content/foundations/icp-builder/lesson-6.md` | ⏳ | pending |
| 7687 | `apps/gtm/server/data/content/foundations/icp-builder/lesson-7.md` | ⏳ | pending |
| 7688 | `apps/gtm/server/data/content/foundations/icp-builder/lesson-8.md` | ⏳ | pending |
| 7689 | `apps/gtm/server/data/content/foundations/icp-builder/lesson-9.md` | ⏳ | pending |
| 7690 | `apps/gtm/server/data/content/foundations/list-building/lesson-1.md` | ⏳ | pending |
| 7691 | `apps/gtm/server/data/content/foundations/list-building/lesson-10.md` | ⏳ | pending |
| 7692 | `apps/gtm/server/data/content/foundations/list-building/lesson-11.md` | ⏳ | pending |
| 7693 | `apps/gtm/server/data/content/foundations/list-building/lesson-2.md` | ⏳ | pending |
| 7694 | `apps/gtm/server/data/content/foundations/list-building/lesson-3.md` | ⏳ | pending |
| 7695 | `apps/gtm/server/data/content/foundations/list-building/lesson-4.md` | ⏳ | pending |
| 7696 | `apps/gtm/server/data/content/foundations/list-building/lesson-5.md` | ⏳ | pending |
| 7697 | `apps/gtm/server/data/content/foundations/list-building/lesson-6.md` | ⏳ | pending |
| 7698 | `apps/gtm/server/data/content/foundations/list-building/lesson-7.md` | ⏳ | pending |
| 7699 | `apps/gtm/server/data/content/foundations/list-building/lesson-8.md` | ⏳ | pending |
| 7700 | `apps/gtm/server/data/content/foundations/list-building/lesson-9.md` | ⏳ | pending |
| 7701 | `apps/gtm/server/data/content/foundations/positioning-value/lesson-1.md` | ⏳ | pending |
| 7702 | `apps/gtm/server/data/content/foundations/positioning-value/lesson-10.md` | ⏳ | pending |
| 7703 | `apps/gtm/server/data/content/foundations/positioning-value/lesson-2.md` | ⏳ | pending |
| 7704 | `apps/gtm/server/data/content/foundations/positioning-value/lesson-3.md` | ⏳ | pending |
| 7705 | `apps/gtm/server/data/content/foundations/positioning-value/lesson-4.md` | ⏳ | pending |
| 7706 | `apps/gtm/server/data/content/foundations/positioning-value/lesson-5.md` | ⏳ | pending |
| 7707 | `apps/gtm/server/data/content/foundations/positioning-value/lesson-6.md` | ⏳ | pending |
| 7708 | `apps/gtm/server/data/content/foundations/positioning-value/lesson-7.md` | ⏳ | pending |
| 7709 | `apps/gtm/server/data/content/foundations/positioning-value/lesson-8.md` | ⏳ | pending |
| 7710 | `apps/gtm/server/data/content/foundations/positioning-value/lesson-9.md` | ⏳ | pending |
| 7711 | `apps/gtm/server/data/content/foundations/sales-psychology/lesson-1.md` | ⏳ | pending |
| 7712 | `apps/gtm/server/data/content/foundations/sales-psychology/lesson-2.md` | ⏳ | pending |
| 7713 | `apps/gtm/server/data/content/foundations/sales-psychology/lesson-3.md` | ⏳ | pending |
| 7714 | `apps/gtm/server/data/content/foundations/sales-psychology/lesson-4.md` | ⏳ | pending |
| 7715 | `apps/gtm/server/data/content/foundations/sales-psychology/lesson-5.md` | ⏳ | pending |
| 7716 | `apps/gtm/server/data/content/foundations/sales-psychology/lesson-6.md` | ⏳ | pending |
| 7717 | `apps/gtm/server/data/content/foundations/sales-psychology/lesson-7.md` | ⏳ | pending |
| 7718 | `apps/gtm/server/data/content/foundations/sales-psychology/lesson-8.md` | ⏳ | pending |
| 7719 | `apps/gtm/server/data/content/marketing-engine/cold-email-mastery/lesson-1.md` | ⏳ | pending |
| 7720 | `apps/gtm/server/data/content/marketing-engine/cold-email-mastery/lesson-10.md` | ⏳ | pending |
| 7721 | `apps/gtm/server/data/content/marketing-engine/cold-email-mastery/lesson-11.md` | ⏳ | pending |
| 7722 | `apps/gtm/server/data/content/marketing-engine/cold-email-mastery/lesson-12.md` | ⏳ | pending |
| 7723 | `apps/gtm/server/data/content/marketing-engine/cold-email-mastery/lesson-2.md` | ⏳ | pending |
| 7724 | `apps/gtm/server/data/content/marketing-engine/cold-email-mastery/lesson-3.md` | ⏳ | pending |
| 7725 | `apps/gtm/server/data/content/marketing-engine/cold-email-mastery/lesson-4.md` | ⏳ | pending |
| 7726 | `apps/gtm/server/data/content/marketing-engine/cold-email-mastery/lesson-5.md` | ⏳ | pending |
| 7727 | `apps/gtm/server/data/content/marketing-engine/cold-email-mastery/lesson-6.md` | ⏳ | pending |
| 7728 | `apps/gtm/server/data/content/marketing-engine/cold-email-mastery/lesson-7.md` | ⏳ | pending |
| 7729 | `apps/gtm/server/data/content/marketing-engine/cold-email-mastery/lesson-8.md` | ⏳ | pending |
| 7730 | `apps/gtm/server/data/content/marketing-engine/cold-email-mastery/lesson-9.md` | ⏳ | pending |
| 7731 | `apps/gtm/server/data/content/marketing-engine/community-lead-gen/lesson-1.md` | ⏳ | pending |
| 7732 | `apps/gtm/server/data/content/marketing-engine/community-lead-gen/lesson-10.md` | ⏳ | pending |
| 7733 | `apps/gtm/server/data/content/marketing-engine/community-lead-gen/lesson-11.md` | ⏳ | pending |
| 7734 | `apps/gtm/server/data/content/marketing-engine/community-lead-gen/lesson-2.md` | ⏳ | pending |
| 7735 | `apps/gtm/server/data/content/marketing-engine/community-lead-gen/lesson-3.md` | ⏳ | pending |
| 7736 | `apps/gtm/server/data/content/marketing-engine/community-lead-gen/lesson-4.md` | ⏳ | pending |
| 7737 | `apps/gtm/server/data/content/marketing-engine/community-lead-gen/lesson-5.md` | ⏳ | pending |
| 7738 | `apps/gtm/server/data/content/marketing-engine/community-lead-gen/lesson-6.md` | ⏳ | pending |
| 7739 | `apps/gtm/server/data/content/marketing-engine/community-lead-gen/lesson-7.md` | ⏳ | pending |
| 7740 | `apps/gtm/server/data/content/marketing-engine/community-lead-gen/lesson-8.md` | ⏳ | pending |
| 7741 | `apps/gtm/server/data/content/marketing-engine/community-lead-gen/lesson-9.md` | ⏳ | pending |
| 7742 | `apps/gtm/server/data/content/marketing-engine/course-11-social-proof-referral/lesson-1.md` | ⏳ | pending |
| 7743 | `apps/gtm/server/data/content/marketing-engine/course-11-social-proof-referral/lesson-10.md` | ⏳ | pending |
| 7744 | `apps/gtm/server/data/content/marketing-engine/course-11-social-proof-referral/lesson-2.md` | ⏳ | pending |
| 7745 | `apps/gtm/server/data/content/marketing-engine/course-11-social-proof-referral/lesson-3.md` | ⏳ | pending |
| 7746 | `apps/gtm/server/data/content/marketing-engine/course-11-social-proof-referral/lesson-4.md` | ⏳ | pending |
| 7747 | `apps/gtm/server/data/content/marketing-engine/course-11-social-proof-referral/lesson-5.md` | ⏳ | pending |
| 7748 | `apps/gtm/server/data/content/marketing-engine/course-11-social-proof-referral/lesson-6.md` | ⏳ | pending |
| 7749 | `apps/gtm/server/data/content/marketing-engine/course-11-social-proof-referral/lesson-7.md` | ⏳ | pending |
| 7750 | `apps/gtm/server/data/content/marketing-engine/course-11-social-proof-referral/lesson-8.md` | ⏳ | pending |
| 7751 | `apps/gtm/server/data/content/marketing-engine/course-11-social-proof-referral/lesson-9.md` | ⏳ | pending |
| 7752 | `apps/gtm/server/data/content/marketing-engine/course-12-marketing-automation-analytics/lesson-1.md` | ⏳ | pending |
| 7753 | `apps/gtm/server/data/content/marketing-engine/course-12-marketing-automation-analytics/lesson-10.md` | ⏳ | pending |
| 7754 | `apps/gtm/server/data/content/marketing-engine/course-12-marketing-automation-analytics/lesson-2.md` | ⏳ | pending |
| 7755 | `apps/gtm/server/data/content/marketing-engine/course-12-marketing-automation-analytics/lesson-3.md` | ⏳ | pending |
| 7756 | `apps/gtm/server/data/content/marketing-engine/course-12-marketing-automation-analytics/lesson-4.md` | ⏳ | pending |
| 7757 | `apps/gtm/server/data/content/marketing-engine/course-12-marketing-automation-analytics/lesson-5.md` | ⏳ | pending |
| 7758 | `apps/gtm/server/data/content/marketing-engine/course-12-marketing-automation-analytics/lesson-6.md` | ⏳ | pending |
| 7759 | `apps/gtm/server/data/content/marketing-engine/course-12-marketing-automation-analytics/lesson-7.md` | ⏳ | pending |
| 7760 | `apps/gtm/server/data/content/marketing-engine/course-12-marketing-automation-analytics/lesson-8.md` | ⏳ | pending |
| 7761 | `apps/gtm/server/data/content/marketing-engine/course-12-marketing-automation-analytics/lesson-9.md` | ⏳ | pending |
| 7762 | `apps/gtm/server/data/content/marketing-engine/email-nurture/lesson-1.md` | ⏳ | pending |
| 7763 | `apps/gtm/server/data/content/marketing-engine/email-nurture/lesson-10.md` | ⏳ | pending |
| 7764 | `apps/gtm/server/data/content/marketing-engine/email-nurture/lesson-2.md` | ⏳ | pending |
| 7765 | `apps/gtm/server/data/content/marketing-engine/email-nurture/lesson-3.md` | ⏳ | pending |
| 7766 | `apps/gtm/server/data/content/marketing-engine/email-nurture/lesson-4.md` | ⏳ | pending |
| 7767 | `apps/gtm/server/data/content/marketing-engine/email-nurture/lesson-5.md` | ⏳ | pending |
| 7768 | `apps/gtm/server/data/content/marketing-engine/email-nurture/lesson-6.md` | ⏳ | pending |
| 7769 | `apps/gtm/server/data/content/marketing-engine/email-nurture/lesson-7.md` | ⏳ | pending |
| 7770 | `apps/gtm/server/data/content/marketing-engine/email-nurture/lesson-8.md` | ⏳ | pending |
| 7771 | `apps/gtm/server/data/content/marketing-engine/email-nurture/lesson-9.md` | ⏳ | pending |
| 7772 | `apps/gtm/server/data/content/marketing-engine/linkedin-engine/lesson-1.md` | ⏳ | pending |
| 7773 | `apps/gtm/server/data/content/marketing-engine/linkedin-engine/lesson-10.md` | ⏳ | pending |
| 7774 | `apps/gtm/server/data/content/marketing-engine/linkedin-engine/lesson-2.md` | ⏳ | pending |
| 7775 | `apps/gtm/server/data/content/marketing-engine/linkedin-engine/lesson-3.md` | ⏳ | pending |
| 7776 | `apps/gtm/server/data/content/marketing-engine/linkedin-engine/lesson-4.md` | ⏳ | pending |
| 7777 | `apps/gtm/server/data/content/marketing-engine/linkedin-engine/lesson-5.md` | ⏳ | pending |
| 7778 | `apps/gtm/server/data/content/marketing-engine/linkedin-engine/lesson-6.md` | ⏳ | pending |
| 7779 | `apps/gtm/server/data/content/marketing-engine/linkedin-engine/lesson-7.md` | ⏳ | pending |
| 7780 | `apps/gtm/server/data/content/marketing-engine/linkedin-engine/lesson-8.md` | ⏳ | pending |
| 7781 | `apps/gtm/server/data/content/marketing-engine/linkedin-engine/lesson-9.md` | ⏳ | pending |
| 7782 | `apps/gtm/server/data/content/marketing-engine/seo-aeo/lesson-1.md` | ⏳ | pending |
| 7783 | `apps/gtm/server/data/content/marketing-engine/seo-aeo/lesson-10.md` | ⏳ | pending |
| 7784 | `apps/gtm/server/data/content/marketing-engine/seo-aeo/lesson-11.md` | ⏳ | pending |
| 7785 | `apps/gtm/server/data/content/marketing-engine/seo-aeo/lesson-12.md` | ⏳ | pending |
| 7786 | `apps/gtm/server/data/content/marketing-engine/seo-aeo/lesson-2.md` | ⏳ | pending |
| 7787 | `apps/gtm/server/data/content/marketing-engine/seo-aeo/lesson-3.md` | ⏳ | pending |
| 7788 | `apps/gtm/server/data/content/marketing-engine/seo-aeo/lesson-4.md` | ⏳ | pending |
| 7789 | `apps/gtm/server/data/content/marketing-engine/seo-aeo/lesson-5.md` | ⏳ | pending |
| 7790 | `apps/gtm/server/data/content/marketing-engine/seo-aeo/lesson-6.md` | ⏳ | pending |
| 7791 | `apps/gtm/server/data/content/marketing-engine/seo-aeo/lesson-7.md` | ⏳ | pending |
| 7792 | `apps/gtm/server/data/content/marketing-engine/seo-aeo/lesson-8.md` | ⏳ | pending |
| 7793 | `apps/gtm/server/data/content/marketing-engine/seo-aeo/lesson-9.md` | ⏳ | pending |
| 7794 | `apps/gtm/server/data/content/marketing-engine/technical-content/lesson-1.md` | ⏳ | pending |
| 7795 | `apps/gtm/server/data/content/marketing-engine/technical-content/lesson-10.md` | ⏳ | pending |
| 7796 | `apps/gtm/server/data/content/marketing-engine/technical-content/lesson-11.md` | ⏳ | pending |
| 7797 | `apps/gtm/server/data/content/marketing-engine/technical-content/lesson-12.md` | ⏳ | pending |
| 7798 | `apps/gtm/server/data/content/marketing-engine/technical-content/lesson-13.md` | ⏳ | pending |
| 7799 | `apps/gtm/server/data/content/marketing-engine/technical-content/lesson-2.md` | ⏳ | pending |
| 7800 | `apps/gtm/server/data/content/marketing-engine/technical-content/lesson-3.md` | ⏳ | pending |
| 7801 | `apps/gtm/server/data/content/marketing-engine/technical-content/lesson-4.md` | ⏳ | pending |
| 7802 | `apps/gtm/server/data/content/marketing-engine/technical-content/lesson-5.md` | ⏳ | pending |
| 7803 | `apps/gtm/server/data/content/marketing-engine/technical-content/lesson-6.md` | ⏳ | pending |
| 7804 | `apps/gtm/server/data/content/marketing-engine/technical-content/lesson-7.md` | ⏳ | pending |
| 7805 | `apps/gtm/server/data/content/marketing-engine/technical-content/lesson-8.md` | ⏳ | pending |
| 7806 | `apps/gtm/server/data/content/marketing-engine/technical-content/lesson-9.md` | ⏳ | pending |
| 7807 | `apps/gtm/server/data/content/operations-systems/analytics/lesson-1.md` | ⏳ | pending |
| 7808 | `apps/gtm/server/data/content/operations-systems/analytics/lesson-10.md` | ⏳ | pending |
| 7809 | `apps/gtm/server/data/content/operations-systems/analytics/lesson-2.md` | ⏳ | pending |
| 7810 | `apps/gtm/server/data/content/operations-systems/analytics/lesson-3.md` | ⏳ | pending |
| 7811 | `apps/gtm/server/data/content/operations-systems/analytics/lesson-4.md` | ⏳ | pending |
| 7812 | `apps/gtm/server/data/content/operations-systems/analytics/lesson-5.md` | ⏳ | pending |
| 7813 | `apps/gtm/server/data/content/operations-systems/analytics/lesson-6.md` | ⏳ | pending |
| 7814 | `apps/gtm/server/data/content/operations-systems/analytics/lesson-7.md` | ⏳ | pending |
| 7815 | `apps/gtm/server/data/content/operations-systems/analytics/lesson-8.md` | ⏳ | pending |
| 7816 | `apps/gtm/server/data/content/operations-systems/analytics/lesson-9.md` | ⏳ | pending |
| 7817 | `apps/gtm/server/data/content/operations-systems/automation/lesson-1.md` | ⏳ | pending |
| 7818 | `apps/gtm/server/data/content/operations-systems/automation/lesson-10.md` | ⏳ | pending |
| 7819 | `apps/gtm/server/data/content/operations-systems/automation/lesson-2.md` | ⏳ | pending |
| 7820 | `apps/gtm/server/data/content/operations-systems/automation/lesson-3.md` | ⏳ | pending |
| 7821 | `apps/gtm/server/data/content/operations-systems/automation/lesson-4.md` | ⏳ | pending |
| 7822 | `apps/gtm/server/data/content/operations-systems/automation/lesson-5.md` | ⏳ | pending |
| 7823 | `apps/gtm/server/data/content/operations-systems/automation/lesson-6.md` | ⏳ | pending |
| 7824 | `apps/gtm/server/data/content/operations-systems/automation/lesson-7.md` | ⏳ | pending |
| 7825 | `apps/gtm/server/data/content/operations-systems/automation/lesson-8.md` | ⏳ | pending |
| 7826 | `apps/gtm/server/data/content/operations-systems/automation/lesson-9.md` | ⏳ | pending |
| 7827 | `apps/gtm/server/data/content/operations-systems/capstone/lesson-1.md` | ⏳ | pending |
| 7828 | `apps/gtm/server/data/content/operations-systems/capstone/lesson-10.md` | ⏳ | pending |
| 7829 | `apps/gtm/server/data/content/operations-systems/capstone/lesson-11.md` | ⏳ | pending |
| 7830 | `apps/gtm/server/data/content/operations-systems/capstone/lesson-12.md` | ⏳ | pending |
| 7831 | `apps/gtm/server/data/content/operations-systems/capstone/lesson-2.md` | ⏳ | pending |
| 7832 | `apps/gtm/server/data/content/operations-systems/capstone/lesson-3.md` | ⏳ | pending |
| 7833 | `apps/gtm/server/data/content/operations-systems/capstone/lesson-4.md` | ⏳ | pending |
| 7834 | `apps/gtm/server/data/content/operations-systems/capstone/lesson-5.md` | ⏳ | pending |
| 7835 | `apps/gtm/server/data/content/operations-systems/capstone/lesson-6.md` | ⏳ | pending |
| 7836 | `apps/gtm/server/data/content/operations-systems/capstone/lesson-7.md` | ⏳ | pending |
| 7837 | `apps/gtm/server/data/content/operations-systems/capstone/lesson-8.md` | ⏳ | pending |
| 7838 | `apps/gtm/server/data/content/operations-systems/capstone/lesson-9.md` | ⏳ | pending |
| 7839 | `apps/gtm/server/data/content/operations-systems/crm-setup/lesson-1.md` | ⏳ | pending |
| 7840 | `apps/gtm/server/data/content/operations-systems/crm-setup/lesson-10.md` | ⏳ | pending |
| 7841 | `apps/gtm/server/data/content/operations-systems/crm-setup/lesson-2.md` | ⏳ | pending |
| 7842 | `apps/gtm/server/data/content/operations-systems/crm-setup/lesson-3.md` | ⏳ | pending |
| 7843 | `apps/gtm/server/data/content/operations-systems/crm-setup/lesson-4.md` | ⏳ | pending |
| 7844 | `apps/gtm/server/data/content/operations-systems/crm-setup/lesson-5.md` | ⏳ | pending |
| 7845 | `apps/gtm/server/data/content/operations-systems/crm-setup/lesson-6.md` | ⏳ | pending |
| 7846 | `apps/gtm/server/data/content/operations-systems/crm-setup/lesson-7.md` | ⏳ | pending |
| 7847 | `apps/gtm/server/data/content/operations-systems/crm-setup/lesson-8.md` | ⏳ | pending |
| 7848 | `apps/gtm/server/data/content/operations-systems/crm-setup/lesson-9.md` | ⏳ | pending |
| 7849 | `apps/gtm/server/data/content/operations-systems/finance/lesson-1.md` | ⏳ | pending |
| 7850 | `apps/gtm/server/data/content/operations-systems/finance/lesson-2.md` | ⏳ | pending |
| 7851 | `apps/gtm/server/data/content/operations-systems/finance/lesson-3.md` | ⏳ | pending |
| 7852 | `apps/gtm/server/data/content/operations-systems/finance/lesson-4.md` | ⏳ | pending |
| 7853 | `apps/gtm/server/data/content/operations-systems/finance/lesson-5.md` | ⏳ | pending |
| 7854 | `apps/gtm/server/data/content/operations-systems/finance/lesson-6.md` | ⏳ | pending |
| 7855 | `apps/gtm/server/data/content/operations-systems/finance/lesson-7.md` | ⏳ | pending |
| 7856 | `apps/gtm/server/data/content/operations-systems/legal/lesson-1.md` | ⏳ | pending |
| 7857 | `apps/gtm/server/data/content/operations-systems/legal/lesson-2.md` | ⏳ | pending |
| 7858 | `apps/gtm/server/data/content/operations-systems/legal/lesson-3.md` | ⏳ | pending |
| 7859 | `apps/gtm/server/data/content/operations-systems/legal/lesson-4.md` | ⏳ | pending |
| 7860 | `apps/gtm/server/data/content/operations-systems/legal/lesson-5.md` | ⏳ | pending |
| 7861 | `apps/gtm/server/data/content/operations-systems/legal/lesson-6.md` | ⏳ | pending |
| 7862 | `apps/gtm/server/data/content/operations-systems/legal/lesson-7.md` | ⏳ | pending |
| 7863 | `apps/gtm/server/data/content/operations-systems/outsourcing/lesson-1.md` | ⏳ | pending |
| 7864 | `apps/gtm/server/data/content/operations-systems/outsourcing/lesson-2.md` | ⏳ | pending |
| 7865 | `apps/gtm/server/data/content/operations-systems/outsourcing/lesson-3.md` | ⏳ | pending |
| 7866 | `apps/gtm/server/data/content/operations-systems/outsourcing/lesson-4.md` | ⏳ | pending |
| 7867 | `apps/gtm/server/data/content/operations-systems/outsourcing/lesson-5.md` | ⏳ | pending |
| 7868 | `apps/gtm/server/data/content/operations-systems/outsourcing/lesson-6.md` | ⏳ | pending |
| 7869 | `apps/gtm/server/data/content/operations-systems/outsourcing/lesson-7.md` | ⏳ | pending |
| 7870 | `apps/gtm/server/data/content/operations-systems/outsourcing/lesson-8.md` | ⏳ | pending |
| 7871 | `apps/gtm/server/data/content/operations-systems/playbook/lesson-1.md` | ⏳ | pending |
| 7872 | `apps/gtm/server/data/content/operations-systems/playbook/lesson-10.md` | ⏳ | pending |
| 7873 | `apps/gtm/server/data/content/operations-systems/playbook/lesson-2.md` | ⏳ | pending |
| 7874 | `apps/gtm/server/data/content/operations-systems/playbook/lesson-3.md` | ⏳ | pending |
| 7875 | `apps/gtm/server/data/content/operations-systems/playbook/lesson-4.md` | ⏳ | pending |
| 7876 | `apps/gtm/server/data/content/operations-systems/playbook/lesson-5.md` | ⏳ | pending |
| 7877 | `apps/gtm/server/data/content/operations-systems/playbook/lesson-6.md` | ⏳ | pending |
| 7878 | `apps/gtm/server/data/content/operations-systems/playbook/lesson-7.md` | ⏳ | pending |
| 7879 | `apps/gtm/server/data/content/operations-systems/playbook/lesson-8.md` | ⏳ | pending |
| 7880 | `apps/gtm/server/data/content/operations-systems/playbook/lesson-9.md` | ⏳ | pending |
| 7881 | `apps/gtm/server/data/content/operations-systems/scale/lesson-1.md` | ⏳ | pending |
| 7882 | `apps/gtm/server/data/content/operations-systems/scale/lesson-10.md` | ⏳ | pending |
| 7883 | `apps/gtm/server/data/content/operations-systems/scale/lesson-2.md` | ⏳ | pending |
| 7884 | `apps/gtm/server/data/content/operations-systems/scale/lesson-3.md` | ⏳ | pending |
| 7885 | `apps/gtm/server/data/content/operations-systems/scale/lesson-4.md` | ⏳ | pending |
| 7886 | `apps/gtm/server/data/content/operations-systems/scale/lesson-5.md` | ⏳ | pending |
| 7887 | `apps/gtm/server/data/content/operations-systems/scale/lesson-6.md` | ⏳ | pending |
| 7888 | `apps/gtm/server/data/content/operations-systems/scale/lesson-7.md` | ⏳ | pending |
| 7889 | `apps/gtm/server/data/content/operations-systems/scale/lesson-8.md` | ⏳ | pending |
| 7890 | `apps/gtm/server/data/content/operations-systems/scale/lesson-9.md` | ⏳ | pending |
| 7891 | `apps/gtm/server/data/content/sales-methodology/closing-closing/lesson-1.md` | ⏳ | pending |
| 7892 | `apps/gtm/server/data/content/sales-methodology/closing-closing/lesson-10.md` | ⏳ | pending |
| 7893 | `apps/gtm/server/data/content/sales-methodology/closing-closing/lesson-2.md` | ⏳ | pending |
| 7894 | `apps/gtm/server/data/content/sales-methodology/closing-closing/lesson-3.md` | ⏳ | pending |
| 7895 | `apps/gtm/server/data/content/sales-methodology/closing-closing/lesson-4.md` | ⏳ | pending |
| 7896 | `apps/gtm/server/data/content/sales-methodology/closing-closing/lesson-5.md` | ⏳ | pending |
| 7897 | `apps/gtm/server/data/content/sales-methodology/closing-closing/lesson-6.md` | ⏳ | pending |
| 7898 | `apps/gtm/server/data/content/sales-methodology/closing-closing/lesson-7.md` | ⏳ | pending |
| 7899 | `apps/gtm/server/data/content/sales-methodology/closing-closing/lesson-8.md` | ⏳ | pending |
| 7900 | `apps/gtm/server/data/content/sales-methodology/closing-closing/lesson-9.md` | ⏳ | pending |
| 7901 | `apps/gtm/server/data/content/sales-methodology/course-15-discovery-simulations/lesson-1.md` | ⏳ | pending |
| 7902 | `apps/gtm/server/data/content/sales-methodology/course-15-discovery-simulations/lesson-10.md` | ⏳ | pending |
| 7903 | `apps/gtm/server/data/content/sales-methodology/course-15-discovery-simulations/lesson-2.md` | ⏳ | pending |
| 7904 | `apps/gtm/server/data/content/sales-methodology/course-15-discovery-simulations/lesson-3.md` | ⏳ | pending |
| 7905 | `apps/gtm/server/data/content/sales-methodology/course-15-discovery-simulations/lesson-4.md` | ⏳ | pending |
| 7906 | `apps/gtm/server/data/content/sales-methodology/course-15-discovery-simulations/lesson-5.md` | ⏳ | pending |
| 7907 | `apps/gtm/server/data/content/sales-methodology/course-15-discovery-simulations/lesson-6.md` | ⏳ | pending |
| 7908 | `apps/gtm/server/data/content/sales-methodology/course-15-discovery-simulations/lesson-7.md` | ⏳ | pending |
| 7909 | `apps/gtm/server/data/content/sales-methodology/course-15-discovery-simulations/lesson-8.md` | ⏳ | pending |
| 7910 | `apps/gtm/server/data/content/sales-methodology/course-15-discovery-simulations/lesson-9.md` | ⏳ | pending |
| 7911 | `apps/gtm/server/data/content/sales-methodology/demo-architecture/lesson-1.md` | ⏳ | pending |
| 7912 | `apps/gtm/server/data/content/sales-methodology/demo-architecture/lesson-2.md` | ⏳ | pending |
| 7913 | `apps/gtm/server/data/content/sales-methodology/demo-architecture/lesson-3.md` | ⏳ | pending |
| 7914 | `apps/gtm/server/data/content/sales-methodology/demo-architecture/lesson-4.md` | ⏳ | pending |
| 7915 | `apps/gtm/server/data/content/sales-methodology/demo-architecture/lesson-5.md` | ⏳ | pending |
| 7916 | `apps/gtm/server/data/content/sales-methodology/demo-architecture/lesson-6.md` | ⏳ | pending |
| 7917 | `apps/gtm/server/data/content/sales-methodology/demo-architecture/lesson-7.md` | ⏳ | pending |
| 7918 | `apps/gtm/server/data/content/sales-methodology/demo-architecture/lesson-8.md` | ⏳ | pending |
| 7919 | `apps/gtm/server/data/content/sales-methodology/demo-architecture/lesson-9.md` | ⏳ | pending |
| 7920 | `apps/gtm/server/data/content/sales-methodology/disc-personas/lesson-1.md` | ⏳ | pending |
| 7921 | `apps/gtm/server/data/content/sales-methodology/disc-personas/lesson-10.md` | ⏳ | pending |
| 7922 | `apps/gtm/server/data/content/sales-methodology/disc-personas/lesson-11.md` | ⏳ | pending |
| 7923 | `apps/gtm/server/data/content/sales-methodology/disc-personas/lesson-12.md` | ⏳ | pending |
| 7924 | `apps/gtm/server/data/content/sales-methodology/disc-personas/lesson-2.md` | ⏳ | pending |
| 7925 | `apps/gtm/server/data/content/sales-methodology/disc-personas/lesson-3.md` | ⏳ | pending |
| 7926 | `apps/gtm/server/data/content/sales-methodology/disc-personas/lesson-4.md` | ⏳ | pending |
| 7927 | `apps/gtm/server/data/content/sales-methodology/disc-personas/lesson-5.md` | ⏳ | pending |
| 7928 | `apps/gtm/server/data/content/sales-methodology/disc-personas/lesson-6.md` | ⏳ | pending |
| 7929 | `apps/gtm/server/data/content/sales-methodology/disc-personas/lesson-7.md` | ⏳ | pending |
| 7930 | `apps/gtm/server/data/content/sales-methodology/disc-personas/lesson-8.md` | ⏳ | pending |
| 7931 | `apps/gtm/server/data/content/sales-methodology/disc-personas/lesson-9.md` | ⏳ | pending |
| 7932 | `apps/gtm/server/data/content/sales-methodology/discovery-framework/lesson-1.md` | ⏳ | pending |
| 7933 | `apps/gtm/server/data/content/sales-methodology/discovery-framework/lesson-10.md` | ⏳ | pending |
| 7934 | `apps/gtm/server/data/content/sales-methodology/discovery-framework/lesson-11.md` | ⏳ | pending |
| 7935 | `apps/gtm/server/data/content/sales-methodology/discovery-framework/lesson-12.md` | ⏳ | pending |
| 7936 | `apps/gtm/server/data/content/sales-methodology/discovery-framework/lesson-2.md` | ⏳ | pending |
| 7937 | `apps/gtm/server/data/content/sales-methodology/discovery-framework/lesson-3.md` | ⏳ | pending |
| 7938 | `apps/gtm/server/data/content/sales-methodology/discovery-framework/lesson-4.md` | ⏳ | pending |
| 7939 | `apps/gtm/server/data/content/sales-methodology/discovery-framework/lesson-5.md` | ⏳ | pending |
| 7940 | `apps/gtm/server/data/content/sales-methodology/discovery-framework/lesson-6.md` | ⏳ | pending |
| 7941 | `apps/gtm/server/data/content/sales-methodology/discovery-framework/lesson-7.md` | ⏳ | pending |
| 7942 | `apps/gtm/server/data/content/sales-methodology/discovery-framework/lesson-8.md` | ⏳ | pending |
| 7943 | `apps/gtm/server/data/content/sales-methodology/discovery-framework/lesson-9.md` | ⏳ | pending |
| 7944 | `apps/gtm/server/data/content/sales-methodology/objection-handling/lesson-1.md` | ⏳ | pending |
| 7945 | `apps/gtm/server/data/content/sales-methodology/objection-handling/lesson-10.md` | ⏳ | pending |
| 7946 | `apps/gtm/server/data/content/sales-methodology/objection-handling/lesson-2.md` | ⏳ | pending |
| 7947 | `apps/gtm/server/data/content/sales-methodology/objection-handling/lesson-3.md` | ⏳ | pending |
| 7948 | `apps/gtm/server/data/content/sales-methodology/objection-handling/lesson-4.md` | ⏳ | pending |
| 7949 | `apps/gtm/server/data/content/sales-methodology/objection-handling/lesson-5.md` | ⏳ | pending |
| 7950 | `apps/gtm/server/data/content/sales-methodology/objection-handling/lesson-6.md` | ⏳ | pending |
| 7951 | `apps/gtm/server/data/content/sales-methodology/objection-handling/lesson-7.md` | ⏳ | pending |
| 7952 | `apps/gtm/server/data/content/sales-methodology/objection-handling/lesson-8.md` | ⏳ | pending |
| 7953 | `apps/gtm/server/data/content/sales-methodology/objection-handling/lesson-9.md` | ⏳ | pending |
| 7954 | `apps/gtm/server/data/content/sales-methodology/pipeline-management/lesson-1.md` | ⏳ | pending |
| 7955 | `apps/gtm/server/data/content/sales-methodology/pipeline-management/lesson-10.md` | ⏳ | pending |
| 7956 | `apps/gtm/server/data/content/sales-methodology/pipeline-management/lesson-2.md` | ⏳ | pending |
| 7957 | `apps/gtm/server/data/content/sales-methodology/pipeline-management/lesson-3.md` | ⏳ | pending |
| 7958 | `apps/gtm/server/data/content/sales-methodology/pipeline-management/lesson-4.md` | ⏳ | pending |
| 7959 | `apps/gtm/server/data/content/sales-methodology/pipeline-management/lesson-5.md` | ⏳ | pending |
| 7960 | `apps/gtm/server/data/content/sales-methodology/pipeline-management/lesson-6.md` | ⏳ | pending |
| 7961 | `apps/gtm/server/data/content/sales-methodology/pipeline-management/lesson-7.md` | ⏳ | pending |
| 7962 | `apps/gtm/server/data/content/sales-methodology/pipeline-management/lesson-8.md` | ⏳ | pending |
| 7963 | `apps/gtm/server/data/content/sales-methodology/pipeline-management/lesson-9.md` | ⏳ | pending |
| 7964 | `apps/gtm/server/data/content/sales-methodology/proposals-pricing/lesson-1.md` | ⏳ | pending |
| 7965 | `apps/gtm/server/data/content/sales-methodology/proposals-pricing/lesson-10.md` | ⏳ | pending |
| 7966 | `apps/gtm/server/data/content/sales-methodology/proposals-pricing/lesson-2.md` | ⏳ | pending |
| 7967 | `apps/gtm/server/data/content/sales-methodology/proposals-pricing/lesson-3.md` | ⏳ | pending |
| 7968 | `apps/gtm/server/data/content/sales-methodology/proposals-pricing/lesson-4.md` | ⏳ | pending |
| 7969 | `apps/gtm/server/data/content/sales-methodology/proposals-pricing/lesson-5.md` | ⏳ | pending |
| 7970 | `apps/gtm/server/data/content/sales-methodology/proposals-pricing/lesson-6.md` | ⏳ | pending |
| 7971 | `apps/gtm/server/data/content/sales-methodology/proposals-pricing/lesson-7.md` | ⏳ | pending |
| 7972 | `apps/gtm/server/data/content/sales-methodology/proposals-pricing/lesson-8.md` | ⏳ | pending |
| 7973 | `apps/gtm/server/data/content/sales-methodology/proposals-pricing/lesson-9.md` | ⏳ | pending |
| 7974 | `apps/gtm/server/data/curriculumData.js` | ⏳ | pending |
| 7975 | `apps/gtm/server/data/personas.js` | ⏳ | pending |
| 7976 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-acquisition-strategy/lesson-1.json` | ⏳ | pending |
| 7977 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-acquisition-strategy/lesson-10.json` | ⏳ | pending |
| 7978 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-acquisition-strategy/lesson-2.json` | ⏳ | pending |
| 7979 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-acquisition-strategy/lesson-3.json` | ⏳ | pending |
| 7980 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-acquisition-strategy/lesson-4.json` | ⏳ | pending |
| 7981 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-acquisition-strategy/lesson-5.json` | ⏳ | pending |
| 7982 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-acquisition-strategy/lesson-6.json` | ⏳ | pending |
| 7983 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-acquisition-strategy/lesson-7.json` | ⏳ | pending |
| 7984 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-acquisition-strategy/lesson-8.json` | ⏳ | pending |
| 7985 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-acquisition-strategy/lesson-9.json` | ⏳ | pending |
| 7986 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-lead-research/lesson-1.json` | ⏳ | pending |
| 7987 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-lead-research/lesson-10.json` | ⏳ | pending |
| 7988 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-lead-research/lesson-2.json` | ⏳ | pending |
| 7989 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-lead-research/lesson-3.json` | ⏳ | pending |
| 7990 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-lead-research/lesson-4.json` | ⏳ | pending |
| 7991 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-lead-research/lesson-5.json` | ⏳ | pending |
| 7992 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-lead-research/lesson-6.json` | ⏳ | pending |
| 7993 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-lead-research/lesson-7.json` | ⏳ | pending |
| 7994 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-lead-research/lesson-8.json` | ⏳ | pending |
| 7995 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-lead-research/lesson-9.json` | ⏳ | pending |
| 7996 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-outreach-automation/lesson-1.json` | ⏳ | pending |
| 7997 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-outreach-automation/lesson-10.json` | ⏳ | pending |
| 7998 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-outreach-automation/lesson-11.json` | ⏳ | pending |
| 7999 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-outreach-automation/lesson-12.json` | ⏳ | pending |
| 8000 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-outreach-automation/lesson-2.json` | ⏳ | pending |
| 8001 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-outreach-automation/lesson-3.json` | ⏳ | pending |
| 8002 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-outreach-automation/lesson-4.json` | ⏳ | pending |
| 8003 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-outreach-automation/lesson-5.json` | ⏳ | pending |
| 8004 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-outreach-automation/lesson-6.json` | ⏳ | pending |
| 8005 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-outreach-automation/lesson-7.json` | ⏳ | pending |
| 8006 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-outreach-automation/lesson-8.json` | ⏳ | pending |
| 8007 | `apps/gtm/server/data/quizzes/ai-acquisition/ai-outreach-automation/lesson-9.json` | ⏳ | pending |
| 8008 | `apps/gtm/server/data/quizzes/ai-acquisition/autonomous-sdr/lesson-1.json` | ⏳ | pending |
| 8009 | `apps/gtm/server/data/quizzes/ai-acquisition/autonomous-sdr/lesson-10.json` | ⏳ | pending |
| 8010 | `apps/gtm/server/data/quizzes/ai-acquisition/autonomous-sdr/lesson-2.json` | ⏳ | pending |
| 8011 | `apps/gtm/server/data/quizzes/ai-acquisition/autonomous-sdr/lesson-3.json` | ⏳ | pending |
| 8012 | `apps/gtm/server/data/quizzes/ai-acquisition/autonomous-sdr/lesson-4.json` | ⏳ | pending |
| 8013 | `apps/gtm/server/data/quizzes/ai-acquisition/autonomous-sdr/lesson-5.json` | ⏳ | pending |
| 8014 | `apps/gtm/server/data/quizzes/ai-acquisition/autonomous-sdr/lesson-6.json` | ⏳ | pending |
| 8015 | `apps/gtm/server/data/quizzes/ai-acquisition/autonomous-sdr/lesson-7.json` | ⏳ | pending |
| 8016 | `apps/gtm/server/data/quizzes/ai-acquisition/autonomous-sdr/lesson-8.json` | ⏳ | pending |
| 8017 | `apps/gtm/server/data/quizzes/ai-acquisition/autonomous-sdr/lesson-9.json` | ⏳ | pending |
| 8018 | `apps/gtm/server/data/quizzes/ai-acquisition/custom-ai-agents/lesson-1.json` | ⏳ | pending |
| 8019 | `apps/gtm/server/data/quizzes/ai-acquisition/custom-ai-agents/lesson-10.json` | ⏳ | pending |
| 8020 | `apps/gtm/server/data/quizzes/ai-acquisition/custom-ai-agents/lesson-11.json` | ⏳ | pending |
| 8021 | `apps/gtm/server/data/quizzes/ai-acquisition/custom-ai-agents/lesson-12.json` | ⏳ | pending |
| 8022 | `apps/gtm/server/data/quizzes/ai-acquisition/custom-ai-agents/lesson-2.json` | ⏳ | pending |
| 8023 | `apps/gtm/server/data/quizzes/ai-acquisition/custom-ai-agents/lesson-3.json` | ⏳ | pending |
| 8024 | `apps/gtm/server/data/quizzes/ai-acquisition/custom-ai-agents/lesson-4.json` | ⏳ | pending |
| 8025 | `apps/gtm/server/data/quizzes/ai-acquisition/custom-ai-agents/lesson-5.json` | ⏳ | pending |
| 8026 | `apps/gtm/server/data/quizzes/ai-acquisition/custom-ai-agents/lesson-6.json` | ⏳ | pending |
| 8027 | `apps/gtm/server/data/quizzes/ai-acquisition/custom-ai-agents/lesson-7.json` | ⏳ | pending |
| 8028 | `apps/gtm/server/data/quizzes/ai-acquisition/custom-ai-agents/lesson-8.json` | ⏳ | pending |
| 8029 | `apps/gtm/server/data/quizzes/ai-acquisition/custom-ai-agents/lesson-9.json` | ⏳ | pending |
| 8030 | `apps/gtm/server/data/quizzes/ai-acquisition/email-deliverability/lesson-1.json` | ⏳ | pending |
| 8031 | `apps/gtm/server/data/quizzes/ai-acquisition/email-deliverability/lesson-10.json` | ⏳ | pending |
| 8032 | `apps/gtm/server/data/quizzes/ai-acquisition/email-deliverability/lesson-11.json` | ⏳ | pending |
| 8033 | `apps/gtm/server/data/quizzes/ai-acquisition/email-deliverability/lesson-12.json` | ⏳ | pending |
| 8034 | `apps/gtm/server/data/quizzes/ai-acquisition/email-deliverability/lesson-2.json` | ⏳ | pending |
| 8035 | `apps/gtm/server/data/quizzes/ai-acquisition/email-deliverability/lesson-3.json` | ⏳ | pending |
| 8036 | `apps/gtm/server/data/quizzes/ai-acquisition/email-deliverability/lesson-4.json` | ⏳ | pending |
| 8037 | `apps/gtm/server/data/quizzes/ai-acquisition/email-deliverability/lesson-5.json` | ⏳ | pending |
| 8038 | `apps/gtm/server/data/quizzes/ai-acquisition/email-deliverability/lesson-6.json` | ⏳ | pending |
| 8039 | `apps/gtm/server/data/quizzes/ai-acquisition/email-deliverability/lesson-7.json` | ⏳ | pending |
| 8040 | `apps/gtm/server/data/quizzes/ai-acquisition/email-deliverability/lesson-8.json` | ⏳ | pending |
| 8041 | `apps/gtm/server/data/quizzes/ai-acquisition/email-deliverability/lesson-9.json` | ⏳ | pending |
| 8042 | `apps/gtm/server/data/quizzes/ai-acquisition/linkedin-ai/lesson-1.json` | ⏳ | pending |
| 8043 | `apps/gtm/server/data/quizzes/ai-acquisition/linkedin-ai/lesson-10.json` | ⏳ | pending |
| 8044 | `apps/gtm/server/data/quizzes/ai-acquisition/linkedin-ai/lesson-2.json` | ⏳ | pending |
| 8045 | `apps/gtm/server/data/quizzes/ai-acquisition/linkedin-ai/lesson-3.json` | ⏳ | pending |
| 8046 | `apps/gtm/server/data/quizzes/ai-acquisition/linkedin-ai/lesson-4.json` | ⏳ | pending |
| 8047 | `apps/gtm/server/data/quizzes/ai-acquisition/linkedin-ai/lesson-5.json` | ⏳ | pending |
| 8048 | `apps/gtm/server/data/quizzes/ai-acquisition/linkedin-ai/lesson-6.json` | ⏳ | pending |
| 8049 | `apps/gtm/server/data/quizzes/ai-acquisition/linkedin-ai/lesson-7.json` | ⏳ | pending |
| 8050 | `apps/gtm/server/data/quizzes/ai-acquisition/linkedin-ai/lesson-8.json` | ⏳ | pending |
| 8051 | `apps/gtm/server/data/quizzes/ai-acquisition/linkedin-ai/lesson-9.json` | ⏳ | pending |
| 8052 | `apps/gtm/server/data/quizzes/creator-track/audience-to-buyer/lesson-1.json` | ⏳ | pending |
| 8053 | `apps/gtm/server/data/quizzes/creator-track/audience-to-buyer/lesson-10.json` | ⏳ | pending |
| 8054 | `apps/gtm/server/data/quizzes/creator-track/audience-to-buyer/lesson-2.json` | ⏳ | pending |
| 8055 | `apps/gtm/server/data/quizzes/creator-track/audience-to-buyer/lesson-3.json` | ⏳ | pending |
| 8056 | `apps/gtm/server/data/quizzes/creator-track/audience-to-buyer/lesson-4.json` | ⏳ | pending |
| 8057 | `apps/gtm/server/data/quizzes/creator-track/audience-to-buyer/lesson-5.json` | ⏳ | pending |
| 8058 | `apps/gtm/server/data/quizzes/creator-track/audience-to-buyer/lesson-6.json` | ⏳ | pending |
| 8059 | `apps/gtm/server/data/quizzes/creator-track/audience-to-buyer/lesson-7.json` | ⏳ | pending |
| 8060 | `apps/gtm/server/data/quizzes/creator-track/audience-to-buyer/lesson-8.json` | ⏳ | pending |
| 8061 | `apps/gtm/server/data/quizzes/creator-track/audience-to-buyer/lesson-9.json` | ⏳ | pending |
| 8062 | `apps/gtm/server/data/quizzes/creator-track/community-led-sales/lesson-1.json` | ⏳ | pending |
| 8063 | `apps/gtm/server/data/quizzes/creator-track/community-led-sales/lesson-2.json` | ⏳ | pending |
| 8064 | `apps/gtm/server/data/quizzes/creator-track/community-led-sales/lesson-3.json` | ⏳ | pending |
| 8065 | `apps/gtm/server/data/quizzes/creator-track/community-led-sales/lesson-4.json` | ⏳ | pending |
| 8066 | `apps/gtm/server/data/quizzes/creator-track/community-led-sales/lesson-5.json` | ⏳ | pending |
| 8067 | `apps/gtm/server/data/quizzes/creator-track/community-led-sales/lesson-6.json` | ⏳ | pending |
| 8068 | `apps/gtm/server/data/quizzes/creator-track/community-led-sales/lesson-7.json` | ⏳ | pending |
| 8069 | `apps/gtm/server/data/quizzes/creator-track/community-led-sales/lesson-8.json` | ⏳ | pending |
| 8070 | `apps/gtm/server/data/quizzes/creator-track/creator-metrics/lesson-1.json` | ⏳ | pending |
| 8071 | `apps/gtm/server/data/quizzes/creator-track/creator-metrics/lesson-2.json` | ⏳ | pending |
| 8072 | `apps/gtm/server/data/quizzes/creator-track/creator-metrics/lesson-3.json` | ⏳ | pending |
| 8073 | `apps/gtm/server/data/quizzes/creator-track/creator-metrics/lesson-4.json` | ⏳ | pending |
| 8074 | `apps/gtm/server/data/quizzes/creator-track/creator-metrics/lesson-5.json` | ⏳ | pending |
| 8075 | `apps/gtm/server/data/quizzes/creator-track/creator-metrics/lesson-6.json` | ⏳ | pending |
| 8076 | `apps/gtm/server/data/quizzes/creator-track/creator-metrics/lesson-7.json` | ⏳ | pending |
| 8077 | `apps/gtm/server/data/quizzes/creator-track/creator-metrics/lesson-8.json` | ⏳ | pending |
| 8078 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-conversations/lesson-1.json` | ⏳ | pending |
| 8079 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-conversations/lesson-10.json` | ⏳ | pending |
| 8080 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-conversations/lesson-2.json` | ⏳ | pending |
| 8081 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-conversations/lesson-3.json` | ⏳ | pending |
| 8082 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-conversations/lesson-4.json` | ⏳ | pending |
| 8083 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-conversations/lesson-5.json` | ⏳ | pending |
| 8084 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-conversations/lesson-6.json` | ⏳ | pending |
| 8085 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-conversations/lesson-7.json` | ⏳ | pending |
| 8086 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-conversations/lesson-8.json` | ⏳ | pending |
| 8087 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-conversations/lesson-9.json` | ⏳ | pending |
| 8088 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-mindset/lesson-1.json` | ⏳ | pending |
| 8089 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-mindset/lesson-2.json` | ⏳ | pending |
| 8090 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-mindset/lesson-3.json` | ⏳ | pending |
| 8091 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-mindset/lesson-4.json` | ⏳ | pending |
| 8092 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-mindset/lesson-5.json` | ⏳ | pending |
| 8093 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-mindset/lesson-6.json` | ⏳ | pending |
| 8094 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-mindset/lesson-7.json` | ⏳ | pending |
| 8095 | `apps/gtm/server/data/quizzes/creator-track/creator-sales-mindset/lesson-8.json` | ⏳ | pending |
| 8096 | `apps/gtm/server/data/quizzes/creator-track/dm-selling-social-commerce/lesson-1.json` | ⏳ | pending |
| 8097 | `apps/gtm/server/data/quizzes/creator-track/dm-selling-social-commerce/lesson-2.json` | ⏳ | pending |
| 8098 | `apps/gtm/server/data/quizzes/creator-track/dm-selling-social-commerce/lesson-3.json` | ⏳ | pending |
| 8099 | `apps/gtm/server/data/quizzes/creator-track/dm-selling-social-commerce/lesson-4.json` | ⏳ | pending |
| 8100 | `apps/gtm/server/data/quizzes/creator-track/dm-selling-social-commerce/lesson-5.json` | ⏳ | pending |
| 8101 | `apps/gtm/server/data/quizzes/creator-track/dm-selling-social-commerce/lesson-6.json` | ⏳ | pending |
| 8102 | `apps/gtm/server/data/quizzes/creator-track/dm-selling-social-commerce/lesson-7.json` | ⏳ | pending |
| 8103 | `apps/gtm/server/data/quizzes/creator-track/dm-selling-social-commerce/lesson-8.json` | ⏳ | pending |
| 8104 | `apps/gtm/server/data/quizzes/creator-track/scaling-creator-sales/lesson-1.json` | ⏳ | pending |
| 8105 | `apps/gtm/server/data/quizzes/creator-track/scaling-creator-sales/lesson-10.json` | ⏳ | pending |
| 8106 | `apps/gtm/server/data/quizzes/creator-track/scaling-creator-sales/lesson-2.json` | ⏳ | pending |
| 8107 | `apps/gtm/server/data/quizzes/creator-track/scaling-creator-sales/lesson-3.json` | ⏳ | pending |
| 8108 | `apps/gtm/server/data/quizzes/creator-track/scaling-creator-sales/lesson-4.json` | ⏳ | pending |
| 8109 | `apps/gtm/server/data/quizzes/creator-track/scaling-creator-sales/lesson-5.json` | ⏳ | pending |
| 8110 | `apps/gtm/server/data/quizzes/creator-track/scaling-creator-sales/lesson-6.json` | ⏳ | pending |
| 8111 | `apps/gtm/server/data/quizzes/creator-track/scaling-creator-sales/lesson-7.json` | ⏳ | pending |
| 8112 | `apps/gtm/server/data/quizzes/creator-track/scaling-creator-sales/lesson-8.json` | ⏳ | pending |
| 8113 | `apps/gtm/server/data/quizzes/creator-track/scaling-creator-sales/lesson-9.json` | ⏳ | pending |
| 8114 | `apps/gtm/server/data/quizzes/creator-track/webinar-challenge-funnels/lesson-1.json` | ⏳ | pending |
| 8115 | `apps/gtm/server/data/quizzes/creator-track/webinar-challenge-funnels/lesson-10.json` | ⏳ | pending |
| 8116 | `apps/gtm/server/data/quizzes/creator-track/webinar-challenge-funnels/lesson-2.json` | ⏳ | pending |
| 8117 | `apps/gtm/server/data/quizzes/creator-track/webinar-challenge-funnels/lesson-3.json` | ⏳ | pending |
| 8118 | `apps/gtm/server/data/quizzes/creator-track/webinar-challenge-funnels/lesson-4.json` | ⏳ | pending |
| 8119 | `apps/gtm/server/data/quizzes/creator-track/webinar-challenge-funnels/lesson-5.json` | ⏳ | pending |
| 8120 | `apps/gtm/server/data/quizzes/creator-track/webinar-challenge-funnels/lesson-6.json` | ⏳ | pending |
| 8121 | `apps/gtm/server/data/quizzes/creator-track/webinar-challenge-funnels/lesson-7.json` | ⏳ | pending |
| 8122 | `apps/gtm/server/data/quizzes/creator-track/webinar-challenge-funnels/lesson-8.json` | ⏳ | pending |
| 8123 | `apps/gtm/server/data/quizzes/creator-track/webinar-challenge-funnels/lesson-9.json` | ⏳ | pending |
| 8124 | `apps/gtm/server/data/quizzes/customer-success/advocacy/lesson-1.json` | ⏳ | pending |
| 8125 | `apps/gtm/server/data/quizzes/customer-success/advocacy/lesson-2.json` | ⏳ | pending |
| 8126 | `apps/gtm/server/data/quizzes/customer-success/advocacy/lesson-3.json` | ⏳ | pending |
| 8127 | `apps/gtm/server/data/quizzes/customer-success/advocacy/lesson-4.json` | ⏳ | pending |
| 8128 | `apps/gtm/server/data/quizzes/customer-success/advocacy/lesson-5.json` | ⏳ | pending |
| 8129 | `apps/gtm/server/data/quizzes/customer-success/advocacy/lesson-6.json` | ⏳ | pending |
| 8130 | `apps/gtm/server/data/quizzes/customer-success/advocacy/lesson-7.json` | ⏳ | pending |
| 8131 | `apps/gtm/server/data/quizzes/customer-success/advocacy/lesson-8.json` | ⏳ | pending |
| 8132 | `apps/gtm/server/data/quizzes/customer-success/expansion/lesson-1.json` | ⏳ | pending |
| 8133 | `apps/gtm/server/data/quizzes/customer-success/expansion/lesson-2.json` | ⏳ | pending |
| 8134 | `apps/gtm/server/data/quizzes/customer-success/expansion/lesson-3.json` | ⏳ | pending |
| 8135 | `apps/gtm/server/data/quizzes/customer-success/expansion/lesson-4.json` | ⏳ | pending |
| 8136 | `apps/gtm/server/data/quizzes/customer-success/expansion/lesson-5.json` | ⏳ | pending |
| 8137 | `apps/gtm/server/data/quizzes/customer-success/expansion/lesson-6.json` | ⏳ | pending |
| 8138 | `apps/gtm/server/data/quizzes/customer-success/expansion/lesson-7.json` | ⏳ | pending |
| 8139 | `apps/gtm/server/data/quizzes/customer-success/expansion/lesson-8.json` | ⏳ | pending |
| 8140 | `apps/gtm/server/data/quizzes/customer-success/onboarding/lesson-1.json` | ⏳ | pending |
| 8141 | `apps/gtm/server/data/quizzes/customer-success/onboarding/lesson-10.json` | ⏳ | pending |
| 8142 | `apps/gtm/server/data/quizzes/customer-success/onboarding/lesson-2.json` | ⏳ | pending |
| 8143 | `apps/gtm/server/data/quizzes/customer-success/onboarding/lesson-3.json` | ⏳ | pending |
| 8144 | `apps/gtm/server/data/quizzes/customer-success/onboarding/lesson-4.json` | ⏳ | pending |
| 8145 | `apps/gtm/server/data/quizzes/customer-success/onboarding/lesson-5.json` | ⏳ | pending |
| 8146 | `apps/gtm/server/data/quizzes/customer-success/onboarding/lesson-6.json` | ⏳ | pending |
| 8147 | `apps/gtm/server/data/quizzes/customer-success/onboarding/lesson-7.json` | ⏳ | pending |
| 8148 | `apps/gtm/server/data/quizzes/customer-success/onboarding/lesson-8.json` | ⏳ | pending |
| 8149 | `apps/gtm/server/data/quizzes/customer-success/onboarding/lesson-9.json` | ⏳ | pending |
| 8150 | `apps/gtm/server/data/quizzes/customer-success/retention/lesson-1.json` | ⏳ | pending |
| 8151 | `apps/gtm/server/data/quizzes/customer-success/retention/lesson-10.json` | ⏳ | pending |
| 8152 | `apps/gtm/server/data/quizzes/customer-success/retention/lesson-2.json` | ⏳ | pending |
| 8153 | `apps/gtm/server/data/quizzes/customer-success/retention/lesson-3.json` | ⏳ | pending |
| 8154 | `apps/gtm/server/data/quizzes/customer-success/retention/lesson-4.json` | ⏳ | pending |
| 8155 | `apps/gtm/server/data/quizzes/customer-success/retention/lesson-5.json` | ⏳ | pending |
| 8156 | `apps/gtm/server/data/quizzes/customer-success/retention/lesson-6.json` | ⏳ | pending |
| 8157 | `apps/gtm/server/data/quizzes/customer-success/retention/lesson-7.json` | ⏳ | pending |
| 8158 | `apps/gtm/server/data/quizzes/customer-success/retention/lesson-8.json` | ⏳ | pending |
| 8159 | `apps/gtm/server/data/quizzes/customer-success/retention/lesson-9.json` | ⏳ | pending |
| 8160 | `apps/gtm/server/data/quizzes/es/ai-acquisition/ai-acquisition-strategy/lesson-10.json` | ⏳ | pending |
| 8161 | `apps/gtm/server/data/quizzes/es/creator-track/audience-to-buyer/lesson-1.json` | ⏳ | pending |
| 8162 | `apps/gtm/server/data/quizzes/es/creator-track/audience-to-buyer/lesson-2.json` | ⏳ | pending |
| 8163 | `apps/gtm/server/data/quizzes/es/creator-track/audience-to-buyer/lesson-3.json` | ⏳ | pending |
| 8164 | `apps/gtm/server/data/quizzes/es/creator-track/audience-to-buyer/lesson-4.json` | ⏳ | pending |
| 8165 | `apps/gtm/server/data/quizzes/es/creator-track/audience-to-buyer/lesson-5.json` | ⏳ | pending |
| 8166 | `apps/gtm/server/data/quizzes/es/creator-track/audience-to-buyer/lesson-6.json` | ⏳ | pending |
| 8167 | `apps/gtm/server/data/quizzes/es/creator-track/audience-to-buyer/lesson-7.json` | ⏳ | pending |
| 8168 | `apps/gtm/server/data/quizzes/es/creator-track/audience-to-buyer/lesson-8.json` | ⏳ | pending |
| 8169 | `apps/gtm/server/data/quizzes/es/creator-track/audience-to-buyer/lesson-9.json` | ⏳ | pending |
| 8170 | `apps/gtm/server/data/quizzes/es/creator-track/creator-metrics/lesson-1.json` | ⏳ | pending |
| 8171 | `apps/gtm/server/data/quizzes/es/creator-track/creator-metrics/lesson-2.json` | ⏳ | pending |
| 8172 | `apps/gtm/server/data/quizzes/es/creator-track/creator-metrics/lesson-3.json` | ⏳ | pending |
| 8173 | `apps/gtm/server/data/quizzes/es/creator-track/creator-metrics/lesson-4.json` | ⏳ | pending |
| 8174 | `apps/gtm/server/data/quizzes/es/creator-track/creator-metrics/lesson-5.json` | ⏳ | pending |
| 8175 | `apps/gtm/server/data/quizzes/es/creator-track/creator-metrics/lesson-6.json` | ⏳ | pending |
| 8176 | `apps/gtm/server/data/quizzes/es/creator-track/creator-metrics/lesson-7.json` | ⏳ | pending |
| 8177 | `apps/gtm/server/data/quizzes/es/creator-track/creator-metrics/lesson-8.json` | ⏳ | pending |
| 8178 | `apps/gtm/server/data/quizzes/es/creator-track/creator-sales-mindset/lesson-6.json` | ⏳ | pending |
| 8179 | `apps/gtm/server/data/quizzes/es/creator-track/creator-sales-mindset/lesson-7.json` | ⏳ | pending |
| 8180 | `apps/gtm/server/data/quizzes/es/creator-track/creator-sales-mindset/lesson-8.json` | ⏳ | pending |
| 8181 | `apps/gtm/server/data/quizzes/es/customer-success/onboarding/lesson-2.json` | ⏳ | pending |
| 8182 | `apps/gtm/server/data/quizzes/es/customer-success/onboarding/lesson-5.json` | ⏳ | pending |
| 8183 | `apps/gtm/server/data/quizzes/es/foundations/choose-path/lesson-1.json` | ⏳ | pending |
| 8184 | `apps/gtm/server/data/quizzes/es/foundations/choose-path/lesson-2.json` | ⏳ | pending |
| 8185 | `apps/gtm/server/data/quizzes/es/foundations/choose-path/lesson-3.json` | ⏳ | pending |
| 8186 | `apps/gtm/server/data/quizzes/es/foundations/choose-path/lesson-4.json` | ⏳ | pending |
| 8187 | `apps/gtm/server/data/quizzes/es/foundations/choose-path/lesson-5.json` | ⏳ | pending |
| 8188 | `apps/gtm/server/data/quizzes/es/foundations/choose-path/lesson-6.json` | ⏳ | pending |
| 8189 | `apps/gtm/server/data/quizzes/es/foundations/icp-builder/lesson-1.json` | ⏳ | pending |
| 8190 | `apps/gtm/server/data/quizzes/es/foundations/icp-builder/lesson-10.json` | ⏳ | pending |
| 8191 | `apps/gtm/server/data/quizzes/es/foundations/icp-builder/lesson-11.json` | ⏳ | pending |
| 8192 | `apps/gtm/server/data/quizzes/es/foundations/icp-builder/lesson-12.json` | ⏳ | pending |
| 8193 | `apps/gtm/server/data/quizzes/es/foundations/icp-builder/lesson-13.json` | ⏳ | pending |
| 8194 | `apps/gtm/server/data/quizzes/es/foundations/icp-builder/lesson-2.json` | ⏳ | pending |
| 8195 | `apps/gtm/server/data/quizzes/es/foundations/icp-builder/lesson-3.json` | ⏳ | pending |
| 8196 | `apps/gtm/server/data/quizzes/es/foundations/icp-builder/lesson-4.json` | ⏳ | pending |
| 8197 | `apps/gtm/server/data/quizzes/es/foundations/icp-builder/lesson-5.json` | ⏳ | pending |
| 8198 | `apps/gtm/server/data/quizzes/es/foundations/icp-builder/lesson-6.json` | ⏳ | pending |
| 8199 | `apps/gtm/server/data/quizzes/es/foundations/icp-builder/lesson-7.json` | ⏳ | pending |
| 8200 | `apps/gtm/server/data/quizzes/es/foundations/icp-builder/lesson-8.json` | ⏳ | pending |
| 8201 | `apps/gtm/server/data/quizzes/es/foundations/icp-builder/lesson-9.json` | ⏳ | pending |
| 8202 | `apps/gtm/server/data/quizzes/es/foundations/list-building/lesson-1.json` | ⏳ | pending |
| 8203 | `apps/gtm/server/data/quizzes/es/foundations/list-building/lesson-10.json` | ⏳ | pending |
| 8204 | `apps/gtm/server/data/quizzes/es/foundations/list-building/lesson-11.json` | ⏳ | pending |
| 8205 | `apps/gtm/server/data/quizzes/es/foundations/list-building/lesson-2.json` | ⏳ | pending |
| 8206 | `apps/gtm/server/data/quizzes/es/foundations/list-building/lesson-3.json` | ⏳ | pending |
| 8207 | `apps/gtm/server/data/quizzes/es/foundations/list-building/lesson-4.json` | ⏳ | pending |
| 8208 | `apps/gtm/server/data/quizzes/es/foundations/list-building/lesson-5.json` | ⏳ | pending |
| 8209 | `apps/gtm/server/data/quizzes/es/foundations/list-building/lesson-6.json` | ⏳ | pending |
| 8210 | `apps/gtm/server/data/quizzes/es/foundations/list-building/lesson-7.json` | ⏳ | pending |
| 8211 | `apps/gtm/server/data/quizzes/es/foundations/list-building/lesson-8.json` | ⏳ | pending |
| 8212 | `apps/gtm/server/data/quizzes/es/foundations/list-building/lesson-9.json` | ⏳ | pending |
| 8213 | `apps/gtm/server/data/quizzes/es/foundations/positioning-value/lesson-1.json` | ⏳ | pending |
| 8214 | `apps/gtm/server/data/quizzes/es/foundations/positioning-value/lesson-10.json` | ⏳ | pending |
| 8215 | `apps/gtm/server/data/quizzes/es/foundations/positioning-value/lesson-2.json` | ⏳ | pending |
| 8216 | `apps/gtm/server/data/quizzes/es/foundations/positioning-value/lesson-3.json` | ⏳ | pending |
| 8217 | `apps/gtm/server/data/quizzes/es/foundations/positioning-value/lesson-4.json` | ⏳ | pending |
| 8218 | `apps/gtm/server/data/quizzes/es/foundations/positioning-value/lesson-5.json` | ⏳ | pending |
| 8219 | `apps/gtm/server/data/quizzes/es/foundations/positioning-value/lesson-6.json` | ⏳ | pending |
| 8220 | `apps/gtm/server/data/quizzes/es/foundations/positioning-value/lesson-7.json` | ⏳ | pending |
| 8221 | `apps/gtm/server/data/quizzes/es/foundations/positioning-value/lesson-8.json` | ⏳ | pending |
| 8222 | `apps/gtm/server/data/quizzes/es/foundations/positioning-value/lesson-9.json` | ⏳ | pending |
| 8223 | `apps/gtm/server/data/quizzes/es/foundations/sales-psychology/lesson-1.json` | ⏳ | pending |
| 8224 | `apps/gtm/server/data/quizzes/es/foundations/sales-psychology/lesson-2.json` | ⏳ | pending |
| 8225 | `apps/gtm/server/data/quizzes/es/foundations/sales-psychology/lesson-3.json` | ⏳ | pending |
| 8226 | `apps/gtm/server/data/quizzes/es/foundations/sales-psychology/lesson-4.json` | ⏳ | pending |
| 8227 | `apps/gtm/server/data/quizzes/es/foundations/sales-psychology/lesson-5.json` | ⏳ | pending |
| 8228 | `apps/gtm/server/data/quizzes/es/foundations/sales-psychology/lesson-6.json` | ⏳ | pending |
| 8229 | `apps/gtm/server/data/quizzes/es/foundations/sales-psychology/lesson-7.json` | ⏳ | pending |
| 8230 | `apps/gtm/server/data/quizzes/es/foundations/sales-psychology/lesson-8.json` | ⏳ | pending |
| 8231 | `apps/gtm/server/data/quizzes/es/marketing-engine/seo-aeo/lesson-1.json` | ⏳ | pending |
| 8232 | `apps/gtm/server/data/quizzes/es/marketing-engine/technical-content/lesson-1.json` | ⏳ | pending |
| 8233 | `apps/gtm/server/data/quizzes/es/marketing-engine/technical-content/lesson-10.json` | ⏳ | pending |
| 8234 | `apps/gtm/server/data/quizzes/es/marketing-engine/technical-content/lesson-11.json` | ⏳ | pending |
| 8235 | `apps/gtm/server/data/quizzes/es/marketing-engine/technical-content/lesson-12.json` | ⏳ | pending |
| 8236 | `apps/gtm/server/data/quizzes/es/marketing-engine/technical-content/lesson-13.json` | ⏳ | pending |
| 8237 | `apps/gtm/server/data/quizzes/es/marketing-engine/technical-content/lesson-2.json` | ⏳ | pending |
| 8238 | `apps/gtm/server/data/quizzes/es/marketing-engine/technical-content/lesson-3.json` | ⏳ | pending |
| 8239 | `apps/gtm/server/data/quizzes/es/marketing-engine/technical-content/lesson-4.json` | ⏳ | pending |
| 8240 | `apps/gtm/server/data/quizzes/es/marketing-engine/technical-content/lesson-5.json` | ⏳ | pending |
| 8241 | `apps/gtm/server/data/quizzes/es/marketing-engine/technical-content/lesson-6.json` | ⏳ | pending |
| 8242 | `apps/gtm/server/data/quizzes/es/marketing-engine/technical-content/lesson-7.json` | ⏳ | pending |
| 8243 | `apps/gtm/server/data/quizzes/es/marketing-engine/technical-content/lesson-8.json` | ⏳ | pending |
| 8244 | `apps/gtm/server/data/quizzes/es/marketing-engine/technical-content/lesson-9.json` | ⏳ | pending |
| 8245 | `apps/gtm/server/data/quizzes/es/operations-systems/crm-setup/lesson-10.json` | ⏳ | pending |
| 8246 | `apps/gtm/server/data/quizzes/es/operations-systems/crm-setup/lesson-2.json` | ⏳ | pending |
| 8247 | `apps/gtm/server/data/quizzes/es/operations-systems/crm-setup/lesson-3.json` | ⏳ | pending |
| 8248 | `apps/gtm/server/data/quizzes/es/operations-systems/crm-setup/lesson-4.json` | ⏳ | pending |
| 8249 | `apps/gtm/server/data/quizzes/es/operations-systems/crm-setup/lesson-6.json` | ⏳ | pending |
| 8250 | `apps/gtm/server/data/quizzes/es/operations-systems/crm-setup/lesson-7.json` | ⏳ | pending |
| 8251 | `apps/gtm/server/data/quizzes/es/operations-systems/crm-setup/lesson-9.json` | ⏳ | pending |
| 8252 | `apps/gtm/server/data/quizzes/es/sales-methodology/disc-personas/lesson-1.json` | ⏳ | pending |
| 8253 | `apps/gtm/server/data/quizzes/es/sales-methodology/disc-personas/lesson-10.json` | ⏳ | pending |
| 8254 | `apps/gtm/server/data/quizzes/es/sales-methodology/disc-personas/lesson-2.json` | ⏳ | pending |
| 8255 | `apps/gtm/server/data/quizzes/es/sales-methodology/disc-personas/lesson-3.json` | ⏳ | pending |
| 8256 | `apps/gtm/server/data/quizzes/es/sales-methodology/disc-personas/lesson-4.json` | ⏳ | pending |
| 8257 | `apps/gtm/server/data/quizzes/es/sales-methodology/disc-personas/lesson-5.json` | ⏳ | pending |
| 8258 | `apps/gtm/server/data/quizzes/es/sales-methodology/disc-personas/lesson-6.json` | ⏳ | pending |
| 8259 | `apps/gtm/server/data/quizzes/es/sales-methodology/disc-personas/lesson-7.json` | ⏳ | pending |
| 8260 | `apps/gtm/server/data/quizzes/es/sales-methodology/disc-personas/lesson-8.json` | ⏳ | pending |
| 8261 | `apps/gtm/server/data/quizzes/es/sales-methodology/disc-personas/lesson-9.json` | ⏳ | pending |
| 8262 | `apps/gtm/server/data/quizzes/es/sales-methodology/discovery-framework/lesson-1.json` | ⏳ | pending |
| 8263 | `apps/gtm/server/data/quizzes/es/sales-methodology/discovery-framework/lesson-2.json` | ⏳ | pending |
| 8264 | `apps/gtm/server/data/quizzes/es/sales-methodology/discovery-framework/lesson-3.json` | ⏳ | pending |
| 8265 | `apps/gtm/server/data/quizzes/es/sales-methodology/discovery-framework/lesson-4.json` | ⏳ | pending |
| 8266 | `apps/gtm/server/data/quizzes/es/sales-methodology/discovery-framework/lesson-5.json` | ⏳ | pending |
| 8267 | `apps/gtm/server/data/quizzes/es/sales-methodology/discovery-framework/lesson-6.json` | ⏳ | pending |
| 8268 | `apps/gtm/server/data/quizzes/es/sales-methodology/discovery-framework/lesson-7.json` | ⏳ | pending |
| 8269 | `apps/gtm/server/data/quizzes/es/sales-methodology/discovery-framework/lesson-8.json` | ⏳ | pending |
| 8270 | `apps/gtm/server/data/quizzes/foundations/choose-path/lesson-1.json` | ⏳ | pending |
| 8271 | `apps/gtm/server/data/quizzes/foundations/choose-path/lesson-2.json` | ⏳ | pending |
| 8272 | `apps/gtm/server/data/quizzes/foundations/choose-path/lesson-3.json` | ⏳ | pending |
| 8273 | `apps/gtm/server/data/quizzes/foundations/choose-path/lesson-4.json` | ⏳ | pending |
| 8274 | `apps/gtm/server/data/quizzes/foundations/choose-path/lesson-5.json` | ⏳ | pending |
| 8275 | `apps/gtm/server/data/quizzes/foundations/choose-path/lesson-6.json` | ⏳ | pending |
| 8276 | `apps/gtm/server/data/quizzes/foundations/icp-builder/lesson-1.json` | ⏳ | pending |
| 8277 | `apps/gtm/server/data/quizzes/foundations/icp-builder/lesson-10.json` | ⏳ | pending |
| 8278 | `apps/gtm/server/data/quizzes/foundations/icp-builder/lesson-11.json` | ⏳ | pending |
| 8279 | `apps/gtm/server/data/quizzes/foundations/icp-builder/lesson-12.json` | ⏳ | pending |
| 8280 | `apps/gtm/server/data/quizzes/foundations/icp-builder/lesson-13.json` | ⏳ | pending |
| 8281 | `apps/gtm/server/data/quizzes/foundations/icp-builder/lesson-2.json` | ⏳ | pending |
| 8282 | `apps/gtm/server/data/quizzes/foundations/icp-builder/lesson-3.json` | ⏳ | pending |
| 8283 | `apps/gtm/server/data/quizzes/foundations/icp-builder/lesson-4.json` | ⏳ | pending |
| 8284 | `apps/gtm/server/data/quizzes/foundations/icp-builder/lesson-5.json` | ⏳ | pending |
| 8285 | `apps/gtm/server/data/quizzes/foundations/icp-builder/lesson-6.json` | ⏳ | pending |
| 8286 | `apps/gtm/server/data/quizzes/foundations/icp-builder/lesson-7.json` | ⏳ | pending |
| 8287 | `apps/gtm/server/data/quizzes/foundations/icp-builder/lesson-8.json` | ⏳ | pending |
| 8288 | `apps/gtm/server/data/quizzes/foundations/icp-builder/lesson-9.json` | ⏳ | pending |
| 8289 | `apps/gtm/server/data/quizzes/foundations/list-building/lesson-1.json` | ⏳ | pending |
| 8290 | `apps/gtm/server/data/quizzes/foundations/list-building/lesson-10.json` | ⏳ | pending |
| 8291 | `apps/gtm/server/data/quizzes/foundations/list-building/lesson-11.json` | ⏳ | pending |
| 8292 | `apps/gtm/server/data/quizzes/foundations/list-building/lesson-2.json` | ⏳ | pending |
| 8293 | `apps/gtm/server/data/quizzes/foundations/list-building/lesson-3.json` | ⏳ | pending |
| 8294 | `apps/gtm/server/data/quizzes/foundations/list-building/lesson-4.json` | ⏳ | pending |
| 8295 | `apps/gtm/server/data/quizzes/foundations/list-building/lesson-5.json` | ⏳ | pending |
| 8296 | `apps/gtm/server/data/quizzes/foundations/list-building/lesson-6.json` | ⏳ | pending |
| 8297 | `apps/gtm/server/data/quizzes/foundations/list-building/lesson-7.json` | ⏳ | pending |
| 8298 | `apps/gtm/server/data/quizzes/foundations/list-building/lesson-8.json` | ⏳ | pending |
| 8299 | `apps/gtm/server/data/quizzes/foundations/list-building/lesson-9.json` | ⏳ | pending |
| 8300 | `apps/gtm/server/data/quizzes/foundations/positioning-value/lesson-1.json` | ⏳ | pending |
| 8301 | `apps/gtm/server/data/quizzes/foundations/positioning-value/lesson-10.json` | ⏳ | pending |
| 8302 | `apps/gtm/server/data/quizzes/foundations/positioning-value/lesson-2.json` | ⏳ | pending |
| 8303 | `apps/gtm/server/data/quizzes/foundations/positioning-value/lesson-3.json` | ⏳ | pending |
| 8304 | `apps/gtm/server/data/quizzes/foundations/positioning-value/lesson-4.json` | ⏳ | pending |
| 8305 | `apps/gtm/server/data/quizzes/foundations/positioning-value/lesson-5.json` | ⏳ | pending |
| 8306 | `apps/gtm/server/data/quizzes/foundations/positioning-value/lesson-6.json` | ⏳ | pending |
| 8307 | `apps/gtm/server/data/quizzes/foundations/positioning-value/lesson-7.json` | ⏳ | pending |
| 8308 | `apps/gtm/server/data/quizzes/foundations/positioning-value/lesson-8.json` | ⏳ | pending |
| 8309 | `apps/gtm/server/data/quizzes/foundations/positioning-value/lesson-9.json` | ⏳ | pending |
| 8310 | `apps/gtm/server/data/quizzes/foundations/sales-psychology/lesson-1.json` | ⏳ | pending |
| 8311 | `apps/gtm/server/data/quizzes/foundations/sales-psychology/lesson-2.json` | ⏳ | pending |
| 8312 | `apps/gtm/server/data/quizzes/foundations/sales-psychology/lesson-3.json` | ⏳ | pending |
| 8313 | `apps/gtm/server/data/quizzes/foundations/sales-psychology/lesson-4.json` | ⏳ | pending |
| 8314 | `apps/gtm/server/data/quizzes/foundations/sales-psychology/lesson-5.json` | ⏳ | pending |
| 8315 | `apps/gtm/server/data/quizzes/foundations/sales-psychology/lesson-6.json` | ⏳ | pending |
| 8316 | `apps/gtm/server/data/quizzes/foundations/sales-psychology/lesson-7.json` | ⏳ | pending |
| 8317 | `apps/gtm/server/data/quizzes/foundations/sales-psychology/lesson-8.json` | ⏳ | pending |
| 8318 | `apps/gtm/server/data/quizzes/marketing-engine/cold-email-mastery/lesson-1.json` | ⏳ | pending |
| 8319 | `apps/gtm/server/data/quizzes/marketing-engine/cold-email-mastery/lesson-10.json` | ⏳ | pending |
| 8320 | `apps/gtm/server/data/quizzes/marketing-engine/cold-email-mastery/lesson-11.json` | ⏳ | pending |
| 8321 | `apps/gtm/server/data/quizzes/marketing-engine/cold-email-mastery/lesson-12.json` | ⏳ | pending |
| 8322 | `apps/gtm/server/data/quizzes/marketing-engine/cold-email-mastery/lesson-2.json` | ⏳ | pending |
| 8323 | `apps/gtm/server/data/quizzes/marketing-engine/cold-email-mastery/lesson-3.json` | ⏳ | pending |
| 8324 | `apps/gtm/server/data/quizzes/marketing-engine/cold-email-mastery/lesson-4.json` | ⏳ | pending |
| 8325 | `apps/gtm/server/data/quizzes/marketing-engine/cold-email-mastery/lesson-5.json` | ⏳ | pending |
| 8326 | `apps/gtm/server/data/quizzes/marketing-engine/cold-email-mastery/lesson-6.json` | ⏳ | pending |
| 8327 | `apps/gtm/server/data/quizzes/marketing-engine/cold-email-mastery/lesson-7.json` | ⏳ | pending |
| 8328 | `apps/gtm/server/data/quizzes/marketing-engine/cold-email-mastery/lesson-8.json` | ⏳ | pending |
| 8329 | `apps/gtm/server/data/quizzes/marketing-engine/cold-email-mastery/lesson-9.json` | ⏳ | pending |
| 8330 | `apps/gtm/server/data/quizzes/marketing-engine/community-lead-gen/lesson-1.json` | ⏳ | pending |
| 8331 | `apps/gtm/server/data/quizzes/marketing-engine/community-lead-gen/lesson-10.json` | ⏳ | pending |
| 8332 | `apps/gtm/server/data/quizzes/marketing-engine/community-lead-gen/lesson-11.json` | ⏳ | pending |
| 8333 | `apps/gtm/server/data/quizzes/marketing-engine/community-lead-gen/lesson-2.json` | ⏳ | pending |
| 8334 | `apps/gtm/server/data/quizzes/marketing-engine/community-lead-gen/lesson-3.json` | ⏳ | pending |
| 8335 | `apps/gtm/server/data/quizzes/marketing-engine/community-lead-gen/lesson-4.json` | ⏳ | pending |
| 8336 | `apps/gtm/server/data/quizzes/marketing-engine/community-lead-gen/lesson-5.json` | ⏳ | pending |
| 8337 | `apps/gtm/server/data/quizzes/marketing-engine/community-lead-gen/lesson-6.json` | ⏳ | pending |
| 8338 | `apps/gtm/server/data/quizzes/marketing-engine/community-lead-gen/lesson-7.json` | ⏳ | pending |
| 8339 | `apps/gtm/server/data/quizzes/marketing-engine/community-lead-gen/lesson-8.json` | ⏳ | pending |
| 8340 | `apps/gtm/server/data/quizzes/marketing-engine/community-lead-gen/lesson-9.json` | ⏳ | pending |
| 8341 | `apps/gtm/server/data/quizzes/marketing-engine/course-11-social-proof-referral/lesson-1.json` | ⏳ | pending |
| 8342 | `apps/gtm/server/data/quizzes/marketing-engine/course-11-social-proof-referral/lesson-10.json` | ⏳ | pending |
| 8343 | `apps/gtm/server/data/quizzes/marketing-engine/course-11-social-proof-referral/lesson-2.json` | ⏳ | pending |
| 8344 | `apps/gtm/server/data/quizzes/marketing-engine/course-11-social-proof-referral/lesson-3.json` | ⏳ | pending |
| 8345 | `apps/gtm/server/data/quizzes/marketing-engine/course-11-social-proof-referral/lesson-4.json` | ⏳ | pending |
| 8346 | `apps/gtm/server/data/quizzes/marketing-engine/course-11-social-proof-referral/lesson-5.json` | ⏳ | pending |
| 8347 | `apps/gtm/server/data/quizzes/marketing-engine/course-11-social-proof-referral/lesson-6.json` | ⏳ | pending |
| 8348 | `apps/gtm/server/data/quizzes/marketing-engine/course-11-social-proof-referral/lesson-7.json` | ⏳ | pending |
| 8349 | `apps/gtm/server/data/quizzes/marketing-engine/course-11-social-proof-referral/lesson-8.json` | ⏳ | pending |
| 8350 | `apps/gtm/server/data/quizzes/marketing-engine/course-11-social-proof-referral/lesson-9.json` | ⏳ | pending |
| 8351 | `apps/gtm/server/data/quizzes/marketing-engine/course-12-marketing-automation-analytics/lesson-1.json` | ⏳ | pending |
| 8352 | `apps/gtm/server/data/quizzes/marketing-engine/course-12-marketing-automation-analytics/lesson-10.json` | ⏳ | pending |
| 8353 | `apps/gtm/server/data/quizzes/marketing-engine/course-12-marketing-automation-analytics/lesson-2.json` | ⏳ | pending |
| 8354 | `apps/gtm/server/data/quizzes/marketing-engine/course-12-marketing-automation-analytics/lesson-3.json` | ⏳ | pending |
| 8355 | `apps/gtm/server/data/quizzes/marketing-engine/course-12-marketing-automation-analytics/lesson-4.json` | ⏳ | pending |
| 8356 | `apps/gtm/server/data/quizzes/marketing-engine/course-12-marketing-automation-analytics/lesson-5.json` | ⏳ | pending |
| 8357 | `apps/gtm/server/data/quizzes/marketing-engine/course-12-marketing-automation-analytics/lesson-6.json` | ⏳ | pending |
| 8358 | `apps/gtm/server/data/quizzes/marketing-engine/course-12-marketing-automation-analytics/lesson-7.json` | ⏳ | pending |
| 8359 | `apps/gtm/server/data/quizzes/marketing-engine/course-12-marketing-automation-analytics/lesson-8.json` | ⏳ | pending |
| 8360 | `apps/gtm/server/data/quizzes/marketing-engine/course-12-marketing-automation-analytics/lesson-9.json` | ⏳ | pending |
| 8361 | `apps/gtm/server/data/quizzes/marketing-engine/email-nurture/lesson-1.json` | ⏳ | pending |
| 8362 | `apps/gtm/server/data/quizzes/marketing-engine/email-nurture/lesson-10.json` | ⏳ | pending |
| 8363 | `apps/gtm/server/data/quizzes/marketing-engine/email-nurture/lesson-2.json` | ⏳ | pending |
| 8364 | `apps/gtm/server/data/quizzes/marketing-engine/email-nurture/lesson-3.json` | ⏳ | pending |
| 8365 | `apps/gtm/server/data/quizzes/marketing-engine/email-nurture/lesson-4.json` | ⏳ | pending |
| 8366 | `apps/gtm/server/data/quizzes/marketing-engine/email-nurture/lesson-5.json` | ⏳ | pending |
| 8367 | `apps/gtm/server/data/quizzes/marketing-engine/email-nurture/lesson-6.json` | ⏳ | pending |
| 8368 | `apps/gtm/server/data/quizzes/marketing-engine/email-nurture/lesson-7.json` | ⏳ | pending |
| 8369 | `apps/gtm/server/data/quizzes/marketing-engine/email-nurture/lesson-8.json` | ⏳ | pending |
| 8370 | `apps/gtm/server/data/quizzes/marketing-engine/email-nurture/lesson-9.json` | ⏳ | pending |
| 8371 | `apps/gtm/server/data/quizzes/marketing-engine/linkedin-engine/lesson-1.json` | ⏳ | pending |
| 8372 | `apps/gtm/server/data/quizzes/marketing-engine/linkedin-engine/lesson-10.json` | ⏳ | pending |
| 8373 | `apps/gtm/server/data/quizzes/marketing-engine/linkedin-engine/lesson-2.json` | ⏳ | pending |
| 8374 | `apps/gtm/server/data/quizzes/marketing-engine/linkedin-engine/lesson-3.json` | ⏳ | pending |
| 8375 | `apps/gtm/server/data/quizzes/marketing-engine/linkedin-engine/lesson-4.json` | ⏳ | pending |
| 8376 | `apps/gtm/server/data/quizzes/marketing-engine/linkedin-engine/lesson-5.json` | ⏳ | pending |
| 8377 | `apps/gtm/server/data/quizzes/marketing-engine/linkedin-engine/lesson-6.json` | ⏳ | pending |
| 8378 | `apps/gtm/server/data/quizzes/marketing-engine/linkedin-engine/lesson-7.json` | ⏳ | pending |
| 8379 | `apps/gtm/server/data/quizzes/marketing-engine/linkedin-engine/lesson-8.json` | ⏳ | pending |
| 8380 | `apps/gtm/server/data/quizzes/marketing-engine/linkedin-engine/lesson-9.json` | ⏳ | pending |
| 8381 | `apps/gtm/server/data/quizzes/marketing-engine/seo-aeo/lesson-1.json` | ⏳ | pending |
| 8382 | `apps/gtm/server/data/quizzes/marketing-engine/seo-aeo/lesson-10.json` | ⏳ | pending |
| 8383 | `apps/gtm/server/data/quizzes/marketing-engine/seo-aeo/lesson-11.json` | ⏳ | pending |
| 8384 | `apps/gtm/server/data/quizzes/marketing-engine/seo-aeo/lesson-12.json` | ⏳ | pending |
| 8385 | `apps/gtm/server/data/quizzes/marketing-engine/seo-aeo/lesson-2.json` | ⏳ | pending |
| 8386 | `apps/gtm/server/data/quizzes/marketing-engine/seo-aeo/lesson-3.json` | ⏳ | pending |
| 8387 | `apps/gtm/server/data/quizzes/marketing-engine/seo-aeo/lesson-4.json` | ⏳ | pending |
| 8388 | `apps/gtm/server/data/quizzes/marketing-engine/seo-aeo/lesson-5.json` | ⏳ | pending |
| 8389 | `apps/gtm/server/data/quizzes/marketing-engine/seo-aeo/lesson-6.json` | ⏳ | pending |
| 8390 | `apps/gtm/server/data/quizzes/marketing-engine/seo-aeo/lesson-7.json` | ⏳ | pending |
| 8391 | `apps/gtm/server/data/quizzes/marketing-engine/seo-aeo/lesson-8.json` | ⏳ | pending |
| 8392 | `apps/gtm/server/data/quizzes/marketing-engine/seo-aeo/lesson-9.json` | ⏳ | pending |
| 8393 | `apps/gtm/server/data/quizzes/marketing-engine/technical-content/lesson-1.json` | ⏳ | pending |
| 8394 | `apps/gtm/server/data/quizzes/marketing-engine/technical-content/lesson-10.json` | ⏳ | pending |
| 8395 | `apps/gtm/server/data/quizzes/marketing-engine/technical-content/lesson-11.json` | ⏳ | pending |
| 8396 | `apps/gtm/server/data/quizzes/marketing-engine/technical-content/lesson-12.json` | ⏳ | pending |
| 8397 | `apps/gtm/server/data/quizzes/marketing-engine/technical-content/lesson-13.json` | ⏳ | pending |
| 8398 | `apps/gtm/server/data/quizzes/marketing-engine/technical-content/lesson-2.json` | ⏳ | pending |
| 8399 | `apps/gtm/server/data/quizzes/marketing-engine/technical-content/lesson-3.json` | ⏳ | pending |
| 8400 | `apps/gtm/server/data/quizzes/marketing-engine/technical-content/lesson-4.json` | ⏳ | pending |
| 8401 | `apps/gtm/server/data/quizzes/marketing-engine/technical-content/lesson-5.json` | ⏳ | pending |
| 8402 | `apps/gtm/server/data/quizzes/marketing-engine/technical-content/lesson-6.json` | ⏳ | pending |
| 8403 | `apps/gtm/server/data/quizzes/marketing-engine/technical-content/lesson-7.json` | ⏳ | pending |
| 8404 | `apps/gtm/server/data/quizzes/marketing-engine/technical-content/lesson-8.json` | ⏳ | pending |
| 8405 | `apps/gtm/server/data/quizzes/marketing-engine/technical-content/lesson-9.json` | ⏳ | pending |
| 8406 | `apps/gtm/server/data/quizzes/operations-systems/analytics/lesson-1.json` | ⏳ | pending |
| 8407 | `apps/gtm/server/data/quizzes/operations-systems/analytics/lesson-10.json` | ⏳ | pending |
| 8408 | `apps/gtm/server/data/quizzes/operations-systems/analytics/lesson-2.json` | ⏳ | pending |
| 8409 | `apps/gtm/server/data/quizzes/operations-systems/analytics/lesson-3.json` | ⏳ | pending |
| 8410 | `apps/gtm/server/data/quizzes/operations-systems/analytics/lesson-4.json` | ⏳ | pending |
| 8411 | `apps/gtm/server/data/quizzes/operations-systems/analytics/lesson-5.json` | ⏳ | pending |
| 8412 | `apps/gtm/server/data/quizzes/operations-systems/analytics/lesson-6.json` | ⏳ | pending |
| 8413 | `apps/gtm/server/data/quizzes/operations-systems/analytics/lesson-7.json` | ⏳ | pending |
| 8414 | `apps/gtm/server/data/quizzes/operations-systems/analytics/lesson-8.json` | ⏳ | pending |
| 8415 | `apps/gtm/server/data/quizzes/operations-systems/analytics/lesson-9.json` | ⏳ | pending |
| 8416 | `apps/gtm/server/data/quizzes/operations-systems/automation/lesson-1.json` | ⏳ | pending |
| 8417 | `apps/gtm/server/data/quizzes/operations-systems/automation/lesson-10.json` | ⏳ | pending |
| 8418 | `apps/gtm/server/data/quizzes/operations-systems/automation/lesson-2.json` | ⏳ | pending |
| 8419 | `apps/gtm/server/data/quizzes/operations-systems/automation/lesson-3.json` | ⏳ | pending |
| 8420 | `apps/gtm/server/data/quizzes/operations-systems/automation/lesson-4.json` | ⏳ | pending |
| 8421 | `apps/gtm/server/data/quizzes/operations-systems/automation/lesson-5.json` | ⏳ | pending |
| 8422 | `apps/gtm/server/data/quizzes/operations-systems/automation/lesson-6.json` | ⏳ | pending |
| 8423 | `apps/gtm/server/data/quizzes/operations-systems/automation/lesson-7.json` | ⏳ | pending |
| 8424 | `apps/gtm/server/data/quizzes/operations-systems/automation/lesson-8.json` | ⏳ | pending |
| 8425 | `apps/gtm/server/data/quizzes/operations-systems/automation/lesson-9.json` | ⏳ | pending |
| 8426 | `apps/gtm/server/data/quizzes/operations-systems/capstone/lesson-1.json` | ⏳ | pending |
| 8427 | `apps/gtm/server/data/quizzes/operations-systems/capstone/lesson-10.json` | ⏳ | pending |
| 8428 | `apps/gtm/server/data/quizzes/operations-systems/capstone/lesson-11.json` | ⏳ | pending |
| 8429 | `apps/gtm/server/data/quizzes/operations-systems/capstone/lesson-12.json` | ⏳ | pending |
| 8430 | `apps/gtm/server/data/quizzes/operations-systems/capstone/lesson-2.json` | ⏳ | pending |
| 8431 | `apps/gtm/server/data/quizzes/operations-systems/capstone/lesson-3.json` | ⏳ | pending |
| 8432 | `apps/gtm/server/data/quizzes/operations-systems/capstone/lesson-4.json` | ⏳ | pending |
| 8433 | `apps/gtm/server/data/quizzes/operations-systems/capstone/lesson-5.json` | ⏳ | pending |
| 8434 | `apps/gtm/server/data/quizzes/operations-systems/capstone/lesson-6.json` | ⏳ | pending |
| 8435 | `apps/gtm/server/data/quizzes/operations-systems/capstone/lesson-7.json` | ⏳ | pending |
| 8436 | `apps/gtm/server/data/quizzes/operations-systems/capstone/lesson-8.json` | ⏳ | pending |
| 8437 | `apps/gtm/server/data/quizzes/operations-systems/capstone/lesson-9.json` | ⏳ | pending |
| 8438 | `apps/gtm/server/data/quizzes/operations-systems/crm-setup/lesson-1.json` | ⏳ | pending |
| 8439 | `apps/gtm/server/data/quizzes/operations-systems/crm-setup/lesson-10.json` | ⏳ | pending |
| 8440 | `apps/gtm/server/data/quizzes/operations-systems/crm-setup/lesson-2.json` | ⏳ | pending |
| 8441 | `apps/gtm/server/data/quizzes/operations-systems/crm-setup/lesson-3.json` | ⏳ | pending |
| 8442 | `apps/gtm/server/data/quizzes/operations-systems/crm-setup/lesson-4.json` | ⏳ | pending |
| 8443 | `apps/gtm/server/data/quizzes/operations-systems/crm-setup/lesson-5.json` | ⏳ | pending |
| 8444 | `apps/gtm/server/data/quizzes/operations-systems/crm-setup/lesson-6.json` | ⏳ | pending |
| 8445 | `apps/gtm/server/data/quizzes/operations-systems/crm-setup/lesson-7.json` | ⏳ | pending |
| 8446 | `apps/gtm/server/data/quizzes/operations-systems/crm-setup/lesson-8.json` | ⏳ | pending |
| 8447 | `apps/gtm/server/data/quizzes/operations-systems/crm-setup/lesson-9.json` | ⏳ | pending |
| 8448 | `apps/gtm/server/data/quizzes/operations-systems/finance/lesson-1.json` | ⏳ | pending |
| 8449 | `apps/gtm/server/data/quizzes/operations-systems/finance/lesson-2.json` | ⏳ | pending |
| 8450 | `apps/gtm/server/data/quizzes/operations-systems/finance/lesson-3.json` | ⏳ | pending |
| 8451 | `apps/gtm/server/data/quizzes/operations-systems/finance/lesson-4.json` | ⏳ | pending |
| 8452 | `apps/gtm/server/data/quizzes/operations-systems/finance/lesson-5.json` | ⏳ | pending |
| 8453 | `apps/gtm/server/data/quizzes/operations-systems/finance/lesson-6.json` | ⏳ | pending |
| 8454 | `apps/gtm/server/data/quizzes/operations-systems/finance/lesson-7.json` | ⏳ | pending |
| 8455 | `apps/gtm/server/data/quizzes/operations-systems/legal/lesson-1.json` | ⏳ | pending |
| 8456 | `apps/gtm/server/data/quizzes/operations-systems/legal/lesson-2.json` | ⏳ | pending |
| 8457 | `apps/gtm/server/data/quizzes/operations-systems/legal/lesson-3.json` | ⏳ | pending |
| 8458 | `apps/gtm/server/data/quizzes/operations-systems/legal/lesson-4.json` | ⏳ | pending |
| 8459 | `apps/gtm/server/data/quizzes/operations-systems/legal/lesson-5.json` | ⏳ | pending |
| 8460 | `apps/gtm/server/data/quizzes/operations-systems/legal/lesson-6.json` | ⏳ | pending |
| 8461 | `apps/gtm/server/data/quizzes/operations-systems/legal/lesson-7.json` | ⏳ | pending |
| 8462 | `apps/gtm/server/data/quizzes/operations-systems/outsourcing/lesson-1.json` | ⏳ | pending |
| 8463 | `apps/gtm/server/data/quizzes/operations-systems/outsourcing/lesson-2.json` | ⏳ | pending |
| 8464 | `apps/gtm/server/data/quizzes/operations-systems/outsourcing/lesson-3.json` | ⏳ | pending |
| 8465 | `apps/gtm/server/data/quizzes/operations-systems/outsourcing/lesson-4.json` | ⏳ | pending |
| 8466 | `apps/gtm/server/data/quizzes/operations-systems/outsourcing/lesson-5.json` | ⏳ | pending |
| 8467 | `apps/gtm/server/data/quizzes/operations-systems/outsourcing/lesson-6.json` | ⏳ | pending |
| 8468 | `apps/gtm/server/data/quizzes/operations-systems/outsourcing/lesson-7.json` | ⏳ | pending |
| 8469 | `apps/gtm/server/data/quizzes/operations-systems/outsourcing/lesson-8.json` | ⏳ | pending |
| 8470 | `apps/gtm/server/data/quizzes/operations-systems/playbook/lesson-1.json` | ⏳ | pending |
| 8471 | `apps/gtm/server/data/quizzes/operations-systems/playbook/lesson-10.json` | ⏳ | pending |
| 8472 | `apps/gtm/server/data/quizzes/operations-systems/playbook/lesson-2.json` | ⏳ | pending |
| 8473 | `apps/gtm/server/data/quizzes/operations-systems/playbook/lesson-3.json` | ⏳ | pending |
| 8474 | `apps/gtm/server/data/quizzes/operations-systems/playbook/lesson-4.json` | ⏳ | pending |
| 8475 | `apps/gtm/server/data/quizzes/operations-systems/playbook/lesson-5.json` | ⏳ | pending |
| 8476 | `apps/gtm/server/data/quizzes/operations-systems/playbook/lesson-6.json` | ⏳ | pending |
| 8477 | `apps/gtm/server/data/quizzes/operations-systems/playbook/lesson-7.json` | ⏳ | pending |
| 8478 | `apps/gtm/server/data/quizzes/operations-systems/playbook/lesson-8.json` | ⏳ | pending |
| 8479 | `apps/gtm/server/data/quizzes/operations-systems/playbook/lesson-9.json` | ⏳ | pending |
| 8480 | `apps/gtm/server/data/quizzes/operations-systems/scale/lesson-1.json` | ⏳ | pending |
| 8481 | `apps/gtm/server/data/quizzes/operations-systems/scale/lesson-10.json` | ⏳ | pending |
| 8482 | `apps/gtm/server/data/quizzes/operations-systems/scale/lesson-2.json` | ⏳ | pending |
| 8483 | `apps/gtm/server/data/quizzes/operations-systems/scale/lesson-3.json` | ⏳ | pending |
| 8484 | `apps/gtm/server/data/quizzes/operations-systems/scale/lesson-4.json` | ⏳ | pending |
| 8485 | `apps/gtm/server/data/quizzes/operations-systems/scale/lesson-5.json` | ⏳ | pending |
| 8486 | `apps/gtm/server/data/quizzes/operations-systems/scale/lesson-6.json` | ⏳ | pending |
| 8487 | `apps/gtm/server/data/quizzes/operations-systems/scale/lesson-7.json` | ⏳ | pending |
| 8488 | `apps/gtm/server/data/quizzes/operations-systems/scale/lesson-8.json` | ⏳ | pending |
| 8489 | `apps/gtm/server/data/quizzes/operations-systems/scale/lesson-9.json` | ⏳ | pending |
| 8490 | `apps/gtm/server/data/quizzes/sales-methodology/closing-closing/lesson-1.json` | ⏳ | pending |
| 8491 | `apps/gtm/server/data/quizzes/sales-methodology/closing-closing/lesson-10.json` | ⏳ | pending |
| 8492 | `apps/gtm/server/data/quizzes/sales-methodology/closing-closing/lesson-2.json` | ⏳ | pending |
| 8493 | `apps/gtm/server/data/quizzes/sales-methodology/closing-closing/lesson-3.json` | ⏳ | pending |
| 8494 | `apps/gtm/server/data/quizzes/sales-methodology/closing-closing/lesson-4.json` | ⏳ | pending |
| 8495 | `apps/gtm/server/data/quizzes/sales-methodology/closing-closing/lesson-5.json` | ⏳ | pending |
| 8496 | `apps/gtm/server/data/quizzes/sales-methodology/closing-closing/lesson-6.json` | ⏳ | pending |
| 8497 | `apps/gtm/server/data/quizzes/sales-methodology/closing-closing/lesson-7.json` | ⏳ | pending |
| 8498 | `apps/gtm/server/data/quizzes/sales-methodology/closing-closing/lesson-8.json` | ⏳ | pending |
| 8499 | `apps/gtm/server/data/quizzes/sales-methodology/closing-closing/lesson-9.json` | ⏳ | pending |
| 8500 | `apps/gtm/server/data/quizzes/sales-methodology/course-15-discovery-simulations/lesson-1.json` | ⏳ | pending |
| 8501 | `apps/gtm/server/data/quizzes/sales-methodology/course-15-discovery-simulations/lesson-10.json` | ⏳ | pending |
| 8502 | `apps/gtm/server/data/quizzes/sales-methodology/course-15-discovery-simulations/lesson-2.json` | ⏳ | pending |
| 8503 | `apps/gtm/server/data/quizzes/sales-methodology/course-15-discovery-simulations/lesson-3.json` | ⏳ | pending |
| 8504 | `apps/gtm/server/data/quizzes/sales-methodology/course-15-discovery-simulations/lesson-4.json` | ⏳ | pending |
| 8505 | `apps/gtm/server/data/quizzes/sales-methodology/course-15-discovery-simulations/lesson-5.json` | ⏳ | pending |
| 8506 | `apps/gtm/server/data/quizzes/sales-methodology/course-15-discovery-simulations/lesson-6.json` | ⏳ | pending |
| 8507 | `apps/gtm/server/data/quizzes/sales-methodology/course-15-discovery-simulations/lesson-7.json` | ⏳ | pending |
| 8508 | `apps/gtm/server/data/quizzes/sales-methodology/course-15-discovery-simulations/lesson-8.json` | ⏳ | pending |
| 8509 | `apps/gtm/server/data/quizzes/sales-methodology/course-15-discovery-simulations/lesson-9.json` | ⏳ | pending |
| 8510 | `apps/gtm/server/data/quizzes/sales-methodology/demo-architecture/lesson-1.json` | ⏳ | pending |
| 8511 | `apps/gtm/server/data/quizzes/sales-methodology/demo-architecture/lesson-2.json` | ⏳ | pending |
| 8512 | `apps/gtm/server/data/quizzes/sales-methodology/demo-architecture/lesson-3.json` | ⏳ | pending |
| 8513 | `apps/gtm/server/data/quizzes/sales-methodology/demo-architecture/lesson-4.json` | ⏳ | pending |
| 8514 | `apps/gtm/server/data/quizzes/sales-methodology/demo-architecture/lesson-5.json` | ⏳ | pending |
| 8515 | `apps/gtm/server/data/quizzes/sales-methodology/demo-architecture/lesson-6.json` | ⏳ | pending |
| 8516 | `apps/gtm/server/data/quizzes/sales-methodology/demo-architecture/lesson-7.json` | ⏳ | pending |
| 8517 | `apps/gtm/server/data/quizzes/sales-methodology/demo-architecture/lesson-8.json` | ⏳ | pending |
| 8518 | `apps/gtm/server/data/quizzes/sales-methodology/demo-architecture/lesson-9.json` | ⏳ | pending |
| 8519 | `apps/gtm/server/data/quizzes/sales-methodology/disc-personas/lesson-1.json` | ⏳ | pending |
| 8520 | `apps/gtm/server/data/quizzes/sales-methodology/disc-personas/lesson-10.json` | ⏳ | pending |
| 8521 | `apps/gtm/server/data/quizzes/sales-methodology/disc-personas/lesson-11.json` | ⏳ | pending |
| 8522 | `apps/gtm/server/data/quizzes/sales-methodology/disc-personas/lesson-12.json` | ⏳ | pending |
| 8523 | `apps/gtm/server/data/quizzes/sales-methodology/disc-personas/lesson-2.json` | ⏳ | pending |
| 8524 | `apps/gtm/server/data/quizzes/sales-methodology/disc-personas/lesson-3.json` | ⏳ | pending |
| 8525 | `apps/gtm/server/data/quizzes/sales-methodology/disc-personas/lesson-4.json` | ⏳ | pending |
| 8526 | `apps/gtm/server/data/quizzes/sales-methodology/disc-personas/lesson-5.json` | ⏳ | pending |
| 8527 | `apps/gtm/server/data/quizzes/sales-methodology/disc-personas/lesson-6.json` | ⏳ | pending |
| 8528 | `apps/gtm/server/data/quizzes/sales-methodology/disc-personas/lesson-7.json` | ⏳ | pending |
| 8529 | `apps/gtm/server/data/quizzes/sales-methodology/disc-personas/lesson-8.json` | ⏳ | pending |
| 8530 | `apps/gtm/server/data/quizzes/sales-methodology/disc-personas/lesson-9.json` | ⏳ | pending |
| 8531 | `apps/gtm/server/data/quizzes/sales-methodology/discovery-framework/lesson-1.json` | ⏳ | pending |
| 8532 | `apps/gtm/server/data/quizzes/sales-methodology/discovery-framework/lesson-10.json` | ⏳ | pending |
| 8533 | `apps/gtm/server/data/quizzes/sales-methodology/discovery-framework/lesson-11.json` | ⏳ | pending |
| 8534 | `apps/gtm/server/data/quizzes/sales-methodology/discovery-framework/lesson-12.json` | ⏳ | pending |
| 8535 | `apps/gtm/server/data/quizzes/sales-methodology/discovery-framework/lesson-2.json` | ⏳ | pending |
| 8536 | `apps/gtm/server/data/quizzes/sales-methodology/discovery-framework/lesson-3.json` | ⏳ | pending |
| 8537 | `apps/gtm/server/data/quizzes/sales-methodology/discovery-framework/lesson-4.json` | ⏳ | pending |
| 8538 | `apps/gtm/server/data/quizzes/sales-methodology/discovery-framework/lesson-5.json` | ⏳ | pending |
| 8539 | `apps/gtm/server/data/quizzes/sales-methodology/discovery-framework/lesson-6.json` | ⏳ | pending |
| 8540 | `apps/gtm/server/data/quizzes/sales-methodology/discovery-framework/lesson-7.json` | ⏳ | pending |
| 8541 | `apps/gtm/server/data/quizzes/sales-methodology/discovery-framework/lesson-8.json` | ⏳ | pending |
| 8542 | `apps/gtm/server/data/quizzes/sales-methodology/discovery-framework/lesson-9.json` | ⏳ | pending |
| 8543 | `apps/gtm/server/data/quizzes/sales-methodology/objection-handling/lesson-1.json` | ⏳ | pending |
| 8544 | `apps/gtm/server/data/quizzes/sales-methodology/objection-handling/lesson-10.json` | ⏳ | pending |
| 8545 | `apps/gtm/server/data/quizzes/sales-methodology/objection-handling/lesson-2.json` | ⏳ | pending |
| 8546 | `apps/gtm/server/data/quizzes/sales-methodology/objection-handling/lesson-3.json` | ⏳ | pending |
| 8547 | `apps/gtm/server/data/quizzes/sales-methodology/objection-handling/lesson-4.json` | ⏳ | pending |
| 8548 | `apps/gtm/server/data/quizzes/sales-methodology/objection-handling/lesson-5.json` | ⏳ | pending |
| 8549 | `apps/gtm/server/data/quizzes/sales-methodology/objection-handling/lesson-6.json` | ⏳ | pending |
| 8550 | `apps/gtm/server/data/quizzes/sales-methodology/objection-handling/lesson-7.json` | ⏳ | pending |
| 8551 | `apps/gtm/server/data/quizzes/sales-methodology/objection-handling/lesson-8.json` | ⏳ | pending |
| 8552 | `apps/gtm/server/data/quizzes/sales-methodology/objection-handling/lesson-9.json` | ⏳ | pending |
| 8553 | `apps/gtm/server/data/quizzes/sales-methodology/pipeline-management/lesson-1.json` | ⏳ | pending |
| 8554 | `apps/gtm/server/data/quizzes/sales-methodology/pipeline-management/lesson-10.json` | ⏳ | pending |
| 8555 | `apps/gtm/server/data/quizzes/sales-methodology/pipeline-management/lesson-2.json` | ⏳ | pending |
| 8556 | `apps/gtm/server/data/quizzes/sales-methodology/pipeline-management/lesson-3.json` | ⏳ | pending |
| 8557 | `apps/gtm/server/data/quizzes/sales-methodology/pipeline-management/lesson-4.json` | ⏳ | pending |
| 8558 | `apps/gtm/server/data/quizzes/sales-methodology/pipeline-management/lesson-5.json` | ⏳ | pending |
| 8559 | `apps/gtm/server/data/quizzes/sales-methodology/pipeline-management/lesson-6.json` | ⏳ | pending |
| 8560 | `apps/gtm/server/data/quizzes/sales-methodology/pipeline-management/lesson-7.json` | ⏳ | pending |
| 8561 | `apps/gtm/server/data/quizzes/sales-methodology/pipeline-management/lesson-8.json` | ⏳ | pending |
| 8562 | `apps/gtm/server/data/quizzes/sales-methodology/pipeline-management/lesson-9.json` | ⏳ | pending |
| 8563 | `apps/gtm/server/data/quizzes/sales-methodology/proposals-pricing/lesson-1.json` | ⏳ | pending |
| 8564 | `apps/gtm/server/data/quizzes/sales-methodology/proposals-pricing/lesson-10.json` | ⏳ | pending |
| 8565 | `apps/gtm/server/data/quizzes/sales-methodology/proposals-pricing/lesson-2.json` | ⏳ | pending |
| 8566 | `apps/gtm/server/data/quizzes/sales-methodology/proposals-pricing/lesson-3.json` | ⏳ | pending |
| 8567 | `apps/gtm/server/data/quizzes/sales-methodology/proposals-pricing/lesson-4.json` | ⏳ | pending |
| 8568 | `apps/gtm/server/data/quizzes/sales-methodology/proposals-pricing/lesson-5.json` | ⏳ | pending |
| 8569 | `apps/gtm/server/data/quizzes/sales-methodology/proposals-pricing/lesson-6.json` | ⏳ | pending |
| 8570 | `apps/gtm/server/data/quizzes/sales-methodology/proposals-pricing/lesson-7.json` | ⏳ | pending |
| 8571 | `apps/gtm/server/data/quizzes/sales-methodology/proposals-pricing/lesson-8.json` | ⏳ | pending |
| 8572 | `apps/gtm/server/data/quizzes/sales-methodology/proposals-pricing/lesson-9.json` | ⏳ | pending |
| 8573 | `apps/gtm/server/data/research/course-21-ai-acquisition-strategy.md` | ⏳ | pending |
| 8574 | `apps/gtm/server/data/research/course-22-email-deliverability.md` | ⏳ | pending |
| 8575 | `apps/gtm/server/data/research/course-23-ai-lead-research.md` | ⏳ | pending |
| 8576 | `apps/gtm/server/data/research/course-24-ai-outreach-automation.md` | ⏳ | pending |
| 8577 | `apps/gtm/server/data/research/course-25-linkedin-ai.md` | ⏳ | pending |
| 8578 | `apps/gtm/server/data/research/course-26-autonomous-sdr.md` | ⏳ | pending |
| 8579 | `apps/gtm/server/data/research/course-27-custom-ai-agents.md` | ⏳ | pending |
| 8580 | `apps/gtm/server/data/research/course-28-creator-sales-mindset.md` | ⏳ | pending |
| 8581 | `apps/gtm/server/data/research/course-36-customer-onboarding.md` | ⏳ | pending |
| 8582 | `apps/gtm/server/data/research/course-37-retention-churn.md` | ⏳ | pending |
| 8583 | `apps/gtm/server/data/research/course-38-expansion-upsell.md` | ⏳ | pending |
| 8584 | `apps/gtm/server/data/research/course-39-customer-advocacy.md` | ⏳ | pending |
| 8585 | `apps/gtm/server/data/research/course-40-crm-setup.md` | ⏳ | pending |
| 8586 | `apps/gtm/server/data/research/course-41-sales-analytics.md` | ⏳ | pending |
| 8587 | `apps/gtm/server/data/research/course-42-sales-automation.md` | ⏳ | pending |
| 8588 | `apps/gtm/server/data/research/course-43-outsourcing-vas.md` | ⏳ | pending |
| 8589 | `apps/gtm/server/data/research/course-44-sales-playbook.md` | ⏳ | pending |
| 8590 | `apps/gtm/server/data/research/course-45-scaling-first-hire.md` | ⏳ | pending |
| 8591 | `apps/gtm/server/data/research/course-46-sales-legal.md` | ⏳ | pending |
| 8592 | `apps/gtm/server/data/research/course-47-sales-finance.md` | ⏳ | pending |
| 8593 | `apps/gtm/server/data/research/course-48-capstone.md` | ⏳ | pending |
| 8594 | `apps/gtm/server/data/research/design-blueprint-tracks-4-7.md` | ⏳ | pending |
| 8595 | `apps/gtm/skills-lock.json` | ⏳ | pending |
| 8596 | `apps/gtm/soloframehub-website-feb/8-gtm-frameworks-compounding-growth-book.html` | ⏳ | pending |
| 8597 | `apps/gtm/soloframehub-website-feb/_pginfo/class.tracker.json` | ⏳ | pending |
| 8598 | `apps/gtm/soloframehub-website-feb/_pginfo/fonts.json` | ⏳ | pending |
| 8599 | `apps/gtm/soloframehub-website-feb/assets/fonts/inter-v12-latin-500.woff2` | ⏭️ | binary asset |
| 8600 | `apps/gtm/soloframehub-website-feb/assets/fonts/inter-v12-latin-600.woff2` | ⏭️ | binary asset |
| 8601 | `apps/gtm/soloframehub-website-feb/assets/fonts/inter-v12-latin-regular.woff2` | ⏭️ | binary asset |
| 8602 | `apps/gtm/soloframehub-website-feb/assets/fonts/poppins-v20-latin-500.woff2` | ⏭️ | binary asset |
| 8603 | `apps/gtm/soloframehub-website-feb/assets/fonts/poppins-v20-latin-600.woff2` | ⏭️ | binary asset |
| 8604 | `apps/gtm/soloframehub-website-feb/assets/fonts/poppins-v20-latin-regular.woff2` | ⏭️ | binary asset |
| 8605 | `apps/gtm/soloframehub-website-feb/assets/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK book cover.webp` | ⏭️ | binary asset |
| 8606 | `apps/gtm/soloframehub-website-feb/assets/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK.webp` | ⏭️ | binary asset |
| 8607 | `apps/gtm/soloframehub-website-feb/assets/images/THE SOLO FOUNDER'S AI DOMINANCE.jpg` | ⏭️ | binary asset |
| 8608 | `apps/gtm/soloframehub-website-feb/assets/images/THE SOLO FOUNDER'S AI REVOLUTION.jpg` | ⏭️ | binary asset |
| 8609 | `apps/gtm/soloframehub-website-feb/assets/images/The Solo Founder's Al Playbook.jpg` | ⏭️ | binary asset |
| 8610 | `apps/gtm/soloframehub-website-feb/assets/images/academy/caa-ai-help-sidebar.webp` | ⏭️ | binary asset |
| 8611 | `apps/gtm/soloframehub-website-feb/assets/images/academy/caa-lesson-page.webp` | ⏭️ | binary asset |
| 8612 | `apps/gtm/soloframehub-website-feb/assets/images/academy/caa-onboarding-results.jpg` | ⏭️ | binary asset |
| 8613 | `apps/gtm/soloframehub-website-feb/assets/images/academy/caa-roleplay-simulation-screen.webp` | ⏭️ | binary asset |
| 8614 | `apps/gtm/soloframehub-website-feb/assets/images/academy/caa-sales-simulation-customer-job-role-selector.webp` | ⏭️ | binary asset |
| 8615 | `apps/gtm/soloframehub-website-feb/assets/images/academy/caa-sales-simulation-framework-selector.webp` | ⏭️ | binary asset |
| 8616 | `apps/gtm/soloframehub-website-feb/assets/images/academy/caa-sales-simulation-industry-selector.webp` | ⏭️ | binary asset |
| 8617 | `apps/gtm/soloframehub-website-feb/assets/images/academy/caa-solo-advisor-ai-coach.webp` | ⏭️ | binary asset |
| 8618 | `apps/gtm/soloframehub-website-feb/assets/images/academy/caa-student-dashboard.webp` | ⏭️ | binary asset |
| 8619 | `apps/gtm/soloframehub-website-feb/assets/images/academy/lesson-quizes.webp` | ⏭️ | binary asset |
| 8620 | `apps/gtm/soloframehub-website-feb/assets/images/academy/mike-sullivan-author-creator-solo-founder.webp` | ⏭️ | binary asset |
| 8621 | `apps/gtm/soloframehub-website-feb/assets/images/academy/platform-analytics-intelligence.webp` | ⏭️ | binary asset |
| 8622 | `apps/gtm/soloframehub-website-feb/assets/images/ai-roleplay-sales-academy.webp` | ⏭️ | binary asset |
| 8623 | `apps/gtm/soloframehub-website-feb/assets/images/available_at_amazon_en_horizontal.png` | ⏭️ | binary asset |
| 8624 | `apps/gtm/soloframehub-website-feb/assets/images/customer-acquisition-playbook-cover.webp` | ⏭️ | binary asset |
| 8625 | `apps/gtm/soloframehub-website-feb/assets/images/icp-builder-mockup.png` | ⏭️ | binary asset |
| 8626 | `apps/gtm/soloframehub-website-feb/assets/images/integrated-intelligence.webp` | ⏭️ | binary asset |
| 8627 | `apps/gtm/soloframehub-website-feb/assets/images/mike-sullivan-author-creator.png` | ⏭️ | binary asset |
| 8628 | `apps/gtm/soloframehub-website-feb/assets/images/pipeline-state-machine-mockup.webp` | ⏭️ | binary asset |
| 8629 | `apps/gtm/soloframehub-website-feb/assets/images/solo-founders-customer-acquisition-paybook-cover-website.webp` | ⏭️ | binary asset |
| 8630 | `apps/gtm/soloframehub-website-feb/assets/images/soloframeHubLogo.png` | ⏭️ | binary asset |
| 8631 | `apps/gtm/soloframehub-website-feb/assets/images/soloframehub-logo-sm.png` | ⏭️ | binary asset |
| 8632 | `apps/gtm/soloframehub-website-feb/assets/images/soloframehub-logo-w-white.png` | ⏭️ | binary asset |
| 8633 | `apps/gtm/soloframehub-website-feb/assets/images/soloframehub-site-icon.png` | ⏭️ | binary asset |
| 8634 | `apps/gtm/soloframehub-website-feb/assets/images/soloframehublogo.jpg` | ⏭️ | binary asset |
| 8635 | `apps/gtm/soloframehub-website-feb/assets/images/traditional video lesson.jpg` | ⏭️ | binary asset |
| 8636 | `apps/gtm/soloframehub-website-feb/assets/images/traditional-lesson.png` | ⏭️ | binary asset |
| 8637 | `apps/gtm/soloframehub-website-feb/blog/2026-02-12-ai-tools-b2b-customer-acquisition.md` | ⏳ | pending |
| 8638 | `apps/gtm/soloframehub-website-feb/blog/2026-02-12-automate-customer-acquisition-solo-founder.md` | ⏳ | pending |
| 8639 | `apps/gtm/soloframehub-website-feb/blog/2026-02-12-b2b-saas-metrics-solo-founders.md` | ⏳ | pending |
| 8640 | `apps/gtm/soloframehub-website-feb/blog/2026-02-12-build-ideal-customer-profile-30-minutes.md` | ⏳ | pending |
| 8641 | `apps/gtm/soloframehub-website-feb/blog/2026-02-12-cold-email-system-for-technical-founders.md` | ⏳ | pending |
| 8642 | `apps/gtm/soloframehub-website-feb/blog/2026-02-12-disc-framework-sell-to-any-buyer-personality.md` | ⏳ | pending |
| 8643 | `apps/gtm/soloframehub-website-feb/blog/2026-02-12-first-discovery-call-framework-for-founders.md` | ⏳ | pending |
| 8644 | `apps/gtm/soloframehub-website-feb/blog/2026-02-12-from-code-to-customers-engineers-sales-playbook.md` | ⏳ | pending |
| 8645 | `apps/gtm/soloframehub-website-feb/blog/2026-02-12-handling-sales-objections-without-being-sleazy.md` | ⏳ | pending |
| 8646 | `apps/gtm/soloframehub-website-feb/blog/2026-02-12-why-engineers-make-better-salespeople.md` | ⏳ | pending |
| 8647 | `apps/gtm/soloframehub-website-feb/blog/ai-tools-b2b-customer-acquisition.html` | ⏳ | pending |
| 8648 | `apps/gtm/soloframehub-website-feb/blog/automate-customer-acquisition-solo-founder.html` | ⏳ | pending |
| 8649 | `apps/gtm/soloframehub-website-feb/blog/b2b-saas-metrics-solo-founders.html` | ⏳ | pending |
| 8650 | `apps/gtm/soloframehub-website-feb/blog/build-ideal-customer-profile-30-minutes.html` | ⏳ | pending |
| 8651 | `apps/gtm/soloframehub-website-feb/blog/cold-email-system-for-technical-founders.html` | ⏳ | pending |
| 8652 | `apps/gtm/soloframehub-website-feb/blog/disc-framework-sell-to-any-buyer-personality.html` | ⏳ | pending |
| 8653 | `apps/gtm/soloframehub-website-feb/blog/first-discovery-call-framework-for-founders.html` | ⏳ | pending |
| 8654 | `apps/gtm/soloframehub-website-feb/blog/from-code-to-customers-engineers-sales-playbook.html` | ⏳ | pending |
| 8655 | `apps/gtm/soloframehub-website-feb/blog/handling-sales-objections-without-being-sleazy.html` | ⏳ | pending |
| 8656 | `apps/gtm/soloframehub-website-feb/blog/index.html` | ⏳ | pending |
| 8657 | `apps/gtm/soloframehub-website-feb/blog/why-engineers-make-better-salespeople.html` | ⏳ | pending |
| 8658 | `apps/gtm/soloframehub-website-feb/community-forums.html` | ⏳ | pending |
| 8659 | `apps/gtm/soloframehub-website-feb/es/.htaccess` | ⏳ | pending |
| 8660 | `apps/gtm/soloframehub-website-feb/es/8-gtm-frameworks-compounding-growth-book.html` | ⏳ | pending |
| 8661 | `apps/gtm/soloframehub-website-feb/es/community-forums.html` | ⏳ | pending |
| 8662 | `apps/gtm/soloframehub-website-feb/es/index.html` | ⏳ | pending |
| 8663 | `apps/gtm/soloframehub-website-feb/es/legal/acceptable-use-policy.html` | ⏳ | pending |
| 8664 | `apps/gtm/soloframehub-website-feb/es/legal/ai-disclaimer.html` | ⏳ | pending |
| 8665 | `apps/gtm/soloframehub-website-feb/es/legal/community-guidelines.html` | ⏳ | pending |
| 8666 | `apps/gtm/soloframehub-website-feb/es/legal/cookie-policy.html` | ⏳ | pending |
| 8667 | `apps/gtm/soloframehub-website-feb/es/legal/earnings-disclaimer.html` | ⏳ | pending |
| 8668 | `apps/gtm/soloframehub-website-feb/es/legal/privacy-policy.html` | ⏳ | pending |
| 8669 | `apps/gtm/soloframehub-website-feb/es/legal/refund-policy.html` | ⏳ | pending |
| 8670 | `apps/gtm/soloframehub-website-feb/es/legal/terms-of-service.html` | ⏳ | pending |
| 8671 | `apps/gtm/soloframehub-website-feb/es/platform-architecture.html` | ⏳ | pending |
| 8672 | `apps/gtm/soloframehub-website-feb/es/solo-founder-apps.html` | ⏳ | pending |
| 8673 | `apps/gtm/soloframehub-website-feb/es/solo-founders-ai-60-day-roadmap-book.html` | ⏳ | pending |
| 8674 | `apps/gtm/soloframehub-website-feb/es/solo-founders-ai-customer-acquisition-academy.html` | ⏳ | pending |
| 8675 | `apps/gtm/soloframehub-website-feb/es/solo-founders-ai-customer-acquisition-playbook.html` | ⏳ | pending |
| 8676 | `apps/gtm/soloframehub-website-feb/es/solo-founders-ai-gtm-academy.html` | ⏳ | pending |
| 8677 | `apps/gtm/soloframehub-website-feb/es/solo-founders-ai-startup-academy.html` | ⏳ | pending |
| 8678 | `apps/gtm/soloframehub-website-feb/fonts/woff2/fonts.css` | ⏳ | pending |
| 8679 | `apps/gtm/soloframehub-website-feb/fonts/woff2/inter-v20-latin-500.woff2` | ⏭️ | binary asset |
| 8680 | `apps/gtm/soloframehub-website-feb/fonts/woff2/inter-v20-latin-500italic.woff2` | ⏭️ | binary asset |
| 8681 | `apps/gtm/soloframehub-website-feb/fonts/woff2/inter-v20-latin-600.woff2` | ⏭️ | binary asset |
| 8682 | `apps/gtm/soloframehub-website-feb/fonts/woff2/inter-v20-latin-italic.woff2` | ⏭️ | binary asset |
| 8683 | `apps/gtm/soloframehub-website-feb/fonts/woff2/inter-v20-latin-regular.woff2` | ⏭️ | binary asset |
| 8684 | `apps/gtm/soloframehub-website-feb/fonts/woff2/poppins-v24-latin-500.woff2` | ⏭️ | binary asset |
| 8685 | `apps/gtm/soloframehub-website-feb/fonts/woff2/poppins-v24-latin-500italic.woff2` | ⏭️ | binary asset |
| 8686 | `apps/gtm/soloframehub-website-feb/fonts/woff2/poppins-v24-latin-600.woff2` | ⏭️ | binary asset |
| 8687 | `apps/gtm/soloframehub-website-feb/fonts/woff2/poppins-v24-latin-600italic.woff2` | ⏭️ | binary asset |
| 8688 | `apps/gtm/soloframehub-website-feb/fonts/woff2/poppins-v24-latin-italic.woff2` | ⏭️ | binary asset |
| 8689 | `apps/gtm/soloframehub-website-feb/fonts/woff2/poppins-v24-latin-regular.woff2` | ⏭️ | binary asset |
| 8690 | `apps/gtm/soloframehub-website-feb/google-search-console-analysis.md` | ⏳ | pending |
| 8691 | `apps/gtm/soloframehub-website-feb/index 2.html` | ⏳ | pending |
| 8692 | `apps/gtm/soloframehub-website-feb/index-book-cover copy.html` | ⏳ | pending |
| 8693 | `apps/gtm/soloframehub-website-feb/index-es.html` | ⏳ | pending |
| 8694 | `apps/gtm/soloframehub-website-feb/index-real.html` | ⏳ | pending |
| 8695 | `apps/gtm/soloframehub-website-feb/index.html` | ⏳ | pending |
| 8696 | `apps/gtm/soloframehub-website-feb/legal/acceptable-use-policy.html` | ⏳ | pending |
| 8697 | `apps/gtm/soloframehub-website-feb/legal/ai-disclaimer.html` | ⏳ | pending |
| 8698 | `apps/gtm/soloframehub-website-feb/legal/community-guidelines.html` | ⏳ | pending |
| 8699 | `apps/gtm/soloframehub-website-feb/legal/cookie-policy.html` | ⏳ | pending |
| 8700 | `apps/gtm/soloframehub-website-feb/legal/earnings-disclaimer.html` | ⏳ | pending |
| 8701 | `apps/gtm/soloframehub-website-feb/legal/privacy-policy.html` | ⏳ | pending |
| 8702 | `apps/gtm/soloframehub-website-feb/legal/refund-policy.html` | ⏳ | pending |
| 8703 | `apps/gtm/soloframehub-website-feb/legal/terms-of-service.html` | ⏳ | pending |
| 8704 | `apps/gtm/soloframehub-website-feb/next.config.js` | ⏳ | pending |
| 8705 | `apps/gtm/soloframehub-website-feb/platform-architecture.html` | ⏳ | pending |
| 8706 | `apps/gtm/soloframehub-website-feb/sitemap.xml` | ⏳ | pending |
| 8707 | `apps/gtm/soloframehub-website-feb/solo-founder-apps.html` | ⏳ | pending |
| 8708 | `apps/gtm/soloframehub-website-feb/solo-founders-ai-60-day-roadmap-book.html` | ⏳ | pending |
| 8709 | `apps/gtm/soloframehub-website-feb/solo-founders-ai-customer-acquisition-academy.html` | ⏳ | pending |
| 8710 | `apps/gtm/soloframehub-website-feb/solo-founders-ai-customer-acquisition-playbook.html` | ⏳ | pending |
| 8711 | `apps/gtm/soloframehub-website-feb/solo-founders-ai-gtm-academy.html` | ⏳ | pending |
| 8712 | `apps/gtm/soloframehub-website-feb/solo-founders-ai-startup-academy.html` | ⏳ | pending |
| 8713 | `apps/gtm/soloframehub-website-feb/src/css/fonts.css` | ⏳ | pending |
| 8714 | `apps/gtm/soloframehub-website-feb/src/css/tailwind-input.css` | ⏳ | pending |
| 8715 | `apps/gtm/soloframehub-website-feb/src/css/tailwind.css` | ⏳ | pending |
| 8716 | `apps/gtm/soloframehub-website-feb/src/index 2.html` | ⏳ | pending |
| 8717 | `apps/gtm/soloframehub-website-feb/src/index-book-cover copy.html` | ⏳ | pending |
| 8718 | `apps/gtm/soloframehub-website-feb/src/index-es.html` | ⏳ | pending |
| 8719 | `apps/gtm/soloframehub-website-feb/src/index.html` | ⏳ | pending |
| 8720 | `apps/gtm/soloframehub-website-feb/src/js/main.js` | ⏳ | pending |
| 8721 | `apps/gtm/soloframehub-website-feb/src/solo-founders-ai-customer-acquisition-academy.html` | ⏳ | pending |
| 8722 | `apps/gtm/soloframehub-website-feb/tailwind.config.js` | ⏳ | pending |
| 8723 | `apps/gtm/soloframehub-website-feb/tailwind_theme/index.html` | ⏳ | pending |
| 8724 | `apps/gtm/soloframehub-website-feb/tailwind_theme/tailwind.css` | ⏳ | pending |
| 8725 | `apps/gtm/soloframehub-website-feb/tsconfig.json` | ⏳ | pending |
| 8726 | `apps/gtm/tsconfig.json` | ⏳ | pending |
| 8727 | `apps/gtm/types/ai.ts` | ⏳ | pending |
| 8728 | `apps/gtm/types/book.ts` | ⏳ | pending |
| 8729 | `apps/gtm/types/course.ts` | ⏳ | pending |
| 8730 | `apps/gtm/types/execute.ts` | ⏳ | pending |
| 8731 | `apps/gtm/types/index.ts` | ⏳ | pending |
| 8732 | `apps/gtm/types/profile.ts` | ⏳ | pending |
| 8733 | `apps/gtm/types/roleplay/ClientRole.ts` | ⏳ | pending |
| 8734 | `apps/gtm/types/roleplay/DiscPattern.ts` | ⏳ | pending |
| 8735 | `apps/gtm/types/roleplay/FounderCategory.ts` | ⏳ | pending |
| 8736 | `apps/gtm/types/roleplay/Industry.ts` | ⏳ | pending |
| 8737 | `apps/gtm/types/roleplay/index.ts` | ⏳ | pending |
| 8738 | `apps/gtm/types/user.ts` | ⏳ | pending |
| 8739 | `apps/gtm/vitest-setup.ts` | ⏳ | pending |
| 8740 | `apps/gtm/vitest.config.ts` | ⏳ | pending |
| 8741 | `apps/gtm/website/.htaccess` | ⏳ | pending |
| 8742 | `apps/gtm/website/8-gtm-frameworks-compounding-growth-book.html` | ⏳ | pending |
| 8743 | `apps/gtm/website/_pgbackup/index-es_1770822932.html` | ⏳ | pending |
| 8744 | `apps/gtm/website/_pgbackup/index_1770822932.html` | ⏳ | pending |
| 8745 | `apps/gtm/website/_pgbackup/index_1770857747.html` | ⏳ | pending |
| 8746 | `apps/gtm/website/_pgbackup/pinegrow_1770822802.json` | ⏳ | pending |
| 8747 | `apps/gtm/website/_pgbackup/pinegrow_1770822811.json` | ⏳ | pending |
| 8748 | `apps/gtm/website/_pgbackup/pinegrow_1770822824.json` | ⏳ | pending |
| 8749 | `apps/gtm/website/_pgbackup/pinegrow_1770822833.json` | ⏳ | pending |
| 8750 | `apps/gtm/website/_pgbackup/pinegrow_1770822848.json` | ⏳ | pending |
| 8751 | `apps/gtm/website/_pgbackup/pinegrow_1770822887.json` | ⏳ | pending |
| 8752 | `apps/gtm/website/_pgbackup/pinegrow_1770822903.json` | ⏳ | pending |
| 8753 | `apps/gtm/website/_pgbackup/pinegrow_1770822923.json` | ⏳ | pending |
| 8754 | `apps/gtm/website/_pgbackup/pinegrow_1770822932.json` | ⏳ | pending |
| 8755 | `apps/gtm/website/_pgbackup/pinegrow_1770824241.json` | ⏳ | pending |
| 8756 | `apps/gtm/website/_pgbackup/pinegrow_1770824267.json` | ⏳ | pending |
| 8757 | `apps/gtm/website/_pgbackup/pinegrow_1770857142.json` | ⏳ | pending |
| 8758 | `apps/gtm/website/_pgbackup/pinegrow_1770857747.json` | ⏳ | pending |
| 8759 | `apps/gtm/website/_pgbackup/pinegrow_1770857750.json` | ⏳ | pending |
| 8760 | `apps/gtm/website/_pginfo/class.tracker.json` | ⏳ | pending |
| 8761 | `apps/gtm/website/_pginfo/fonts.json` | ⏳ | pending |
| 8762 | `apps/gtm/website/assets/fonts/inter-v12-latin-500.woff2` | ⏭️ | binary asset |
| 8763 | `apps/gtm/website/assets/fonts/inter-v12-latin-600.woff2` | ⏭️ | binary asset |
| 8764 | `apps/gtm/website/assets/fonts/inter-v12-latin-regular.woff2` | ⏭️ | binary asset |
| 8765 | `apps/gtm/website/assets/fonts/poppins-v20-latin-500.woff2` | ⏭️ | binary asset |
| 8766 | `apps/gtm/website/assets/fonts/poppins-v20-latin-600.woff2` | ⏭️ | binary asset |
| 8767 | `apps/gtm/website/assets/fonts/poppins-v20-latin-regular.woff2` | ⏭️ | binary asset |
| 8768 | `apps/gtm/website/assets/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK book cover.webp` | ⏭️ | binary asset |
| 8769 | `apps/gtm/website/assets/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK.webp` | ⏭️ | binary asset |
| 8770 | `apps/gtm/website/assets/images/THE SOLO FOUNDER'S AI DOMINANCE.jpg` | ⏭️ | binary asset |
| 8771 | `apps/gtm/website/assets/images/THE SOLO FOUNDER'S AI REVOLUTION.jpg` | ⏭️ | binary asset |
| 8772 | `apps/gtm/website/assets/images/The Solo Founder's Al Playbook.jpg` | ⏭️ | binary asset |
| 8773 | `apps/gtm/website/assets/images/academy/caa-ai-help-sidebar.webp` | ⏭️ | binary asset |
| 8774 | `apps/gtm/website/assets/images/academy/caa-lesson-page.webp` | ⏭️ | binary asset |
| 8775 | `apps/gtm/website/assets/images/academy/caa-onboarding-results.jpg` | ⏭️ | binary asset |
| 8776 | `apps/gtm/website/assets/images/academy/caa-roleplay-simulation-screen.webp` | ⏭️ | binary asset |
| 8777 | `apps/gtm/website/assets/images/academy/caa-sales-simulation-customer-job-role-selector.webp` | ⏭️ | binary asset |
| 8778 | `apps/gtm/website/assets/images/academy/caa-sales-simulation-framework-selector.webp` | ⏭️ | binary asset |
| 8779 | `apps/gtm/website/assets/images/academy/caa-sales-simulation-industry-selector.webp` | ⏭️ | binary asset |
| 8780 | `apps/gtm/website/assets/images/academy/caa-solo-advisor-ai-coach.webp` | ⏭️ | binary asset |
| 8781 | `apps/gtm/website/assets/images/academy/caa-student-dashboard.webp` | ⏭️ | binary asset |
| 8782 | `apps/gtm/website/assets/images/academy/lesson-quizes.webp` | ⏭️ | binary asset |
| 8783 | `apps/gtm/website/assets/images/academy/mike-sullivan-author-creator-solo-founder.webp` | ⏭️ | binary asset |
| 8784 | `apps/gtm/website/assets/images/academy/platform-analytics-intelligence.webp` | ⏭️ | binary asset |
| 8785 | `apps/gtm/website/assets/images/ai-roleplay-sales-academy.webp` | ⏭️ | binary asset |
| 8786 | `apps/gtm/website/assets/images/attio-logo.svg` | ⏭️ | binary asset |
| 8787 | `apps/gtm/website/assets/images/available_at_amazon_en_horizontal.png` | ⏭️ | binary asset |
| 8788 | `apps/gtm/website/assets/images/customer-acquisition-playbook-cover.webp` | ⏭️ | binary asset |
| 8789 | `apps/gtm/website/assets/images/hunter-logo.svg` | ⏭️ | binary asset |
| 8790 | `apps/gtm/website/assets/images/icp-builder-mockup.png` | ⏭️ | binary asset |
| 8791 | `apps/gtm/website/assets/images/integrated-intelligence.webp` | ⏭️ | binary asset |
| 8792 | `apps/gtm/website/assets/images/mike-sullivan-author-creator.png` | ⏭️ | binary asset |
| 8793 | `apps/gtm/website/assets/images/pipeline-state-machine-mockup.webp` | ⏭️ | binary asset |
| 8794 | `apps/gtm/website/assets/images/solo-founders-customer-acquisition-paybook-cover-website.webp` | ⏭️ | binary asset |
| 8795 | `apps/gtm/website/assets/images/soloframeHubLogo.png` | ⏭️ | binary asset |
| 8796 | `apps/gtm/website/assets/images/soloframehub-logo-sm.png` | ⏭️ | binary asset |
| 8797 | `apps/gtm/website/assets/images/soloframehub-logo-w-white.png` | ⏭️ | binary asset |
| 8798 | `apps/gtm/website/assets/images/soloframehub-site-icon.png` | ⏭️ | binary asset |
| 8799 | `apps/gtm/website/assets/images/soloframehublogo.jpg` | ⏭️ | binary asset |
| 8800 | `apps/gtm/website/assets/images/traditional video lesson.jpg` | ⏭️ | binary asset |
| 8801 | `apps/gtm/website/assets/images/traditional-lesson.png` | ⏭️ | binary asset |
| 8802 | `apps/gtm/website/blog-accountability-pods.html` | ⏳ | pending |
| 8803 | `apps/gtm/website/blog-ai-coaching-rag.html` | ⏳ | pending |
| 8804 | `apps/gtm/website/blog-ai-coaching.html` | ⏳ | pending |
| 8805 | `apps/gtm/website/blog-bootstrapped-sales-strategy.html` | ⏳ | pending |
| 8806 | `apps/gtm/website/blog-byok-integrations.html` | ⏳ | pending |
| 8807 | `apps/gtm/website/blog-certified-solo-gtm.html` | ⏳ | pending |
| 8808 | `apps/gtm/website/blog-cold-email-startups.html` | ⏳ | pending |
| 8809 | `apps/gtm/website/blog-first-10-customers.html` | ⏳ | pending |
| 8810 | `apps/gtm/website/blog-five-layers.html` | ⏳ | pending |
| 8811 | `apps/gtm/website/blog-icp-template-startups.html` | ⏳ | pending |
| 8812 | `apps/gtm/website/blog-linkedin-outreach-founders.html` | ⏳ | pending |
| 8813 | `apps/gtm/website/blog-quick-win-path.html` | ⏳ | pending |
| 8814 | `apps/gtm/website/blog-sales-pipeline-solopreneurs.html` | ⏳ | pending |
| 8815 | `apps/gtm/website/blog-solo-founder-customer-acquisition.html` | ⏳ | pending |
| 8816 | `apps/gtm/website/blog-solo-gtm-strategy.html` | ⏳ | pending |
| 8817 | `apps/gtm/website/es/.htaccess` | ⏳ | pending |
| 8818 | `apps/gtm/website/es/8-gtm-frameworks-compounding-growth-book.html` | ⏳ | pending |
| 8819 | `apps/gtm/website/es/blog-adquisicion-clientes-fundador.html` | ⏳ | pending |
| 8820 | `apps/gtm/website/es/blog-estrategia-gtm-fundador.html` | ⏳ | pending |
| 8821 | `apps/gtm/website/es/blog-integraciones-byok.html` | ⏳ | pending |
| 8822 | `apps/gtm/website/es/blog-plantilla-icp-startups.html` | ⏳ | pending |
| 8823 | `apps/gtm/website/es/blog-primeros-10-clientes.html` | ⏳ | pending |
| 8824 | `apps/gtm/website/es/blog-ruta-victoria-rapida.html` | ⏳ | pending |
| 8825 | `apps/gtm/website/es/index.html` | ⏳ | pending |
| 8826 | `apps/gtm/website/es/legal/acceptable-use-policy.html` | ⏳ | pending |
| 8827 | `apps/gtm/website/es/legal/ai-disclaimer.html` | ⏳ | pending |
| 8828 | `apps/gtm/website/es/legal/community-guidelines.html` | ⏳ | pending |
| 8829 | `apps/gtm/website/es/legal/cookie-policy.html` | ⏳ | pending |
| 8830 | `apps/gtm/website/es/legal/earnings-disclaimer.html` | ⏳ | pending |
| 8831 | `apps/gtm/website/es/legal/privacy-policy.html` | ⏳ | pending |
| 8832 | `apps/gtm/website/es/legal/refund-policy.html` | ⏳ | pending |
| 8833 | `apps/gtm/website/es/legal/terms-of-service.html` | ⏳ | pending |
| 8834 | `apps/gtm/website/es/platform-architecture.html` | ⏳ | pending |
| 8835 | `apps/gtm/website/es/solo-founder-apps.html` | ⏳ | pending |
| 8836 | `apps/gtm/website/es/solo-founders-ai-60-day-roadmap-book.html` | ⏳ | pending |
| 8837 | `apps/gtm/website/es/solo-founders-ai-client-acquisition-os.html` | ⏳ | pending |
| 8838 | `apps/gtm/website/es/solo-founders-ai-customer-acquisition-playbook.html` | ⏳ | pending |
| 8839 | `apps/gtm/website/es/solo-founders-ai-gtm-academy.html` | ⏳ | pending |
| 8840 | `apps/gtm/website/es/solo-founders-ai-startup-academy.html` | ⏳ | pending |
| 8841 | `apps/gtm/website/fonts/woff2/fonts.css` | ⏳ | pending |
| 8842 | `apps/gtm/website/fonts/woff2/inter-v20-latin-500.woff2` | ⏭️ | binary asset |
| 8843 | `apps/gtm/website/fonts/woff2/inter-v20-latin-500italic.woff2` | ⏭️ | binary asset |
| 8844 | `apps/gtm/website/fonts/woff2/inter-v20-latin-600.woff2` | ⏭️ | binary asset |
| 8845 | `apps/gtm/website/fonts/woff2/inter-v20-latin-italic.woff2` | ⏭️ | binary asset |
| 8846 | `apps/gtm/website/fonts/woff2/inter-v20-latin-regular.woff2` | ⏭️ | binary asset |
| 8847 | `apps/gtm/website/fonts/woff2/poppins-v24-latin-500.woff2` | ⏭️ | binary asset |
| 8848 | `apps/gtm/website/fonts/woff2/poppins-v24-latin-500italic.woff2` | ⏭️ | binary asset |
| 8849 | `apps/gtm/website/fonts/woff2/poppins-v24-latin-600.woff2` | ⏭️ | binary asset |
| 8850 | `apps/gtm/website/fonts/woff2/poppins-v24-latin-600italic.woff2` | ⏭️ | binary asset |
| 8851 | `apps/gtm/website/fonts/woff2/poppins-v24-latin-italic.woff2` | ⏭️ | binary asset |
| 8852 | `apps/gtm/website/fonts/woff2/poppins-v24-latin-regular.woff2` | ⏭️ | binary asset |
| 8853 | `apps/gtm/website/index.html` | ⏳ | pending |
| 8854 | `apps/gtm/website/legal/acceptable-use-policy.html` | ⏳ | pending |
| 8855 | `apps/gtm/website/legal/ai-disclaimer.html` | ⏳ | pending |
| 8856 | `apps/gtm/website/legal/community-guidelines.html` | ⏳ | pending |
| 8857 | `apps/gtm/website/legal/cookie-policy.html` | ⏳ | pending |
| 8858 | `apps/gtm/website/legal/earnings-disclaimer.html` | ⏳ | pending |
| 8859 | `apps/gtm/website/legal/privacy-policy.html` | ⏳ | pending |
| 8860 | `apps/gtm/website/legal/refund-policy.html` | ⏳ | pending |
| 8861 | `apps/gtm/website/legal/terms-of-service.html` | ⏳ | pending |
| 8862 | `apps/gtm/website/pinegrow.json` | ⏳ | pending |
| 8863 | `apps/gtm/website/platform-architecture.html` | ⏳ | pending |
| 8864 | `apps/gtm/website/sitemap.xml` | ⏳ | pending |
| 8865 | `apps/gtm/website/solo-founder-apps.html` | ⏳ | pending |
| 8866 | `apps/gtm/website/solo-founders-ai-60-day-roadmap-book.html` | ⏳ | pending |
| 8867 | `apps/gtm/website/solo-founders-ai-customer-acquisition-playbook.html` | ⏳ | pending |
| 8868 | `apps/gtm/website/solo-founders-ai-gtm-academy.html` | ⏳ | pending |
| 8869 | `apps/gtm/website/solo-founders-ai-startup-academy.html` | ⏳ | pending |
| 8870 | `apps/gtm/website/solo-gtm-os.html` | ⏳ | pending |
| 8871 | `apps/gtm/website/src/css/fonts.css` | ⏳ | pending |
| 8872 | `apps/gtm/website/src/css/tailwind-input.css` | ⏳ | pending |
| 8873 | `apps/gtm/website/src/css/tailwind.css` | ⏳ | pending |
| 8874 | `apps/gtm/website/src/index.html` | ⏳ | pending |
| 8875 | `apps/gtm/website/src/js/main.js` | ⏳ | pending |
| 8876 | `apps/gtm/website/src/solo-founders-ai-client-acquisition-os.html` | ⏳ | pending |
| 8877 | `apps/gtm/website/tailwind.config.js` | ⏳ | pending |
| 8878 | `apps/gtm/website/tailwind_theme/index.html` | ⏳ | pending |
| 8879 | `apps/gtm/website/tailwind_theme/tailwind.css` | ⏳ | pending |
| 8880 | `docs/STATUS-REPORT-2026-04-23.md` | ⏳ | pending |
| 8881 | `docs/adrs/0000-template.md` | ⏳ | pending |
| 8882 | `docs/adrs/0001-modular-monolith.md` | ⏳ | pending |
| 8883 | `docs/adrs/0002-two-shells.md` | ⏳ | pending |
| 8884 | `docs/adrs/0003-shared-postgres-rls.md` | ⏳ | pending |
| 8885 | `docs/adrs/0004-tenant-enforcement-data-boundary.md` | ⏳ | pending |
| 8886 | `docs/adrs/0005-manifest-hot-reload-dev-only.md` | ⏳ | pending |
| 8887 | `docs/adrs/0006-git-is-the-manifest-registry.md` | ⏳ | pending |
| 8888 | `docs/adrs/0007-fixed-roles-and-events.md` | ⏳ | pending |
| 8889 | `docs/adrs/0008-clinical-instruments-platform-owned.md` | ⏳ | pending |
| 8890 | `docs/adrs/0009-postgres-outbox-no-kafka.md` | ⏳ | pending |
| 8891 | `docs/adrs/0010-n8n-and-native-dsl.md` | ⏳ | pending |
| 8892 | `docs/adrs/0011-dokploy-runtime-control-plane.md` | ⏳ | pending |
| 8893 | `docs/adrs/0012-one-dokploy-app-per-vertical.md` | ⏳ | pending |
| 8894 | `docs/adrs/0013-openrouter-primary-native-fallback.md` | ⏳ | pending |
| 8895 | `docs/adrs/0014-pgvector-default.md` | ⏳ | pending |
| 8896 | `docs/adrs/0015-no-new-code-in-apps-lib.md` | ⏳ | pending |
| 8897 | `docs/adrs/README.md` | ⏳ | pending |
| 8898 | `docs/bug-patterns.md` | ⏳ | pending |
| 8899 | `docs/deployment-env.md` | ⏳ | pending |
| 8900 | `docs/source-repo-backports.md` | ⏳ | pending |
| 8901 | `eslint.config.mjs` | ⏳ | pending |
| 8902 | `infra/dokploy/README.md` | ⏳ | pending |
| 8903 | `infra/dokploy/migrations-applied.json` | ⏳ | pending |
| 8904 | `infra/dokploy/state.json` | ⏳ | pending |
| 8905 | `infra/migrations/0001_tenancy.sql` | ⏳ | pending |
| 8906 | `infra/migrations/0002_rls_helpers.sql` | ⏳ | pending |
| 8907 | `package.json` | ⏳ | pending |
| 8908 | `packages/ai-orchestration/package.json` | ⏳ | pending |
| 8909 | `packages/ai-orchestration/src/index.ts` | ⏳ | pending |
| 8910 | `packages/ai-orchestration/tsconfig.json` | ⏳ | pending |
| 8911 | `packages/contracts/package.json` | ⏳ | pending |
| 8912 | `packages/contracts/src/events.ts` | ⏳ | pending |
| 8913 | `packages/contracts/src/index.ts` | ⏳ | pending |
| 8914 | `packages/contracts/src/manifest.ts` | ⏳ | pending |
| 8915 | `packages/contracts/src/roles.ts` | ⏳ | pending |
| 8916 | `packages/contracts/src/tenant.ts` | ⏳ | pending |
| 8917 | `packages/contracts/tsconfig.json` | ⏳ | pending |
| 8918 | `packages/identity/package.json` | ⏳ | pending |
| 8919 | `packages/identity/src/createLuciaInstance.ts` | ⏳ | pending |
| 8920 | `packages/identity/src/index.ts` | ⏳ | pending |
| 8921 | `packages/identity/tsconfig.json` | ⏳ | pending |
| 8922 | `packages/manifest-loader/package.json` | ⏳ | pending |
| 8923 | `packages/manifest-loader/src/errors.ts` | ⏳ | pending |
| 8924 | `packages/manifest-loader/src/hash.ts` | ⏳ | pending |
| 8925 | `packages/manifest-loader/src/index.ts` | ⏳ | pending |
| 8926 | `packages/manifest-loader/src/loader.ts` | ⏳ | pending |
| 8927 | `packages/manifest-loader/test/get-manifest-by-id.test.ts` | ⏳ | pending |
| 8928 | `packages/manifest-loader/test/loader.test.ts` | ⏳ | pending |
| 8929 | `packages/manifest-loader/test/real-verticals.test.ts` | ⏳ | pending |
| 8930 | `packages/manifest-loader/tsconfig.json` | ⏳ | pending |
| 8931 | `packages/observability/package.json` | ⏳ | pending |
| 8932 | `packages/observability/src/index.ts` | ⏳ | pending |
| 8933 | `packages/observability/tsconfig.json` | ⏳ | pending |
| 8934 | `packages/prompt-registry/package.json` | ⏳ | pending |
| 8935 | `packages/prompt-registry/src/index.ts` | ⏳ | pending |
| 8936 | `packages/prompt-registry/src/parser.ts` | ⏳ | pending |
| 8937 | `packages/prompt-registry/src/registry.ts` | ⏳ | pending |
| 8938 | `packages/prompt-registry/test/parser.test.ts` | ⏳ | pending |
| 8939 | `packages/prompt-registry/tsconfig.json` | ⏳ | pending |
| 8940 | `packages/tenancy/package.json` | ⏳ | pending |
| 8941 | `packages/tenancy/src/errors.ts` | ⏳ | pending |
| 8942 | `packages/tenancy/src/index.ts` | ⏳ | pending |
| 8943 | `packages/tenancy/src/internal/db.ts` | ⏳ | pending |
| 8944 | `packages/tenancy/src/internal/index.ts` | ⏳ | pending |
| 8945 | `packages/tenancy/src/isTenantMember.ts` | ⏳ | pending |
| 8946 | `packages/tenancy/src/middleware.ts` | ⏳ | pending |
| 8947 | `packages/tenancy/src/requireTenantContext.ts` | ⏳ | pending |
| 8948 | `packages/tenancy/src/resolveTenant.ts` | ⏳ | pending |
| 8949 | `packages/tenancy/src/schema/index.ts` | ⏳ | pending |
| 8950 | `packages/tenancy/src/withTenant.ts` | ⏳ | pending |
| 8951 | `packages/tenancy/test/middleware.test.ts` | ⏳ | pending |
| 8952 | `packages/tenancy/test/requireTenantContext.test.ts` | ⏳ | pending |
| 8953 | `packages/tenancy/test/withTenant.test.ts` | ⏳ | pending |
| 8954 | `packages/tenancy/tsconfig.json` | ⏳ | pending |
| 8955 | `packages/testing/package.json` | ⏳ | pending |
| 8956 | `packages/testing/src/index.ts` | ⏳ | pending |
| 8957 | `packages/testing/src/runLeakHarnessCli.ts` | ⏳ | pending |
| 8958 | `packages/testing/src/tenantLeakHarness.ts` | ⏳ | pending |
| 8959 | `packages/testing/test/harness.test.ts` | ⏳ | pending |
| 8960 | `packages/testing/tsconfig.json` | ⏳ | pending |
| 8961 | `packages/ui-primitives/package.json` | ⏳ | pending |
| 8962 | `packages/ui-primitives/src/index.ts` | ⏳ | pending |
| 8963 | `packages/ui-primitives/tsconfig.json` | ⏳ | pending |
| 8964 | `packages/ui-shell/package.json` | ⏳ | pending |
| 8965 | `packages/ui-shell/src/index.ts` | ⏳ | pending |
| 8966 | `packages/ui-shell/tsconfig.json` | ⏳ | pending |
| 8967 | `pnpm-workspace.yaml` | ⏳ | pending |
| 8968 | `tools/dokploy/dk` | ⏳ | pending |
| 8969 | `tools/dokploy/provision-01-core.sh` | ⏳ | pending |
| 8970 | `tools/dokploy/provision-02-sidecars.sh` | ⏳ | pending |
| 8971 | `tools/dokploy/provision-03-apps.sh` | ⏳ | pending |
| 8972 | `tools/dokploy/provision-04-app-env.sh` | ⏳ | pending |
| 8973 | `tools/dokploy/provision-05-domains.sh` | ⏳ | pending |
| 8974 | `tools/dokploy/provision-06-ops.sh` | ⏳ | pending |
| 8975 | `tools/eslint-plugin-platform/package.json` | ⏳ | pending |
| 8976 | `tools/eslint-plugin-platform/src/index.ts` | ⏳ | pending |
| 8977 | `tools/eslint-plugin-platform/src/no-cross-vertical-import.ts` | ⏳ | pending |
| 8978 | `tools/eslint-plugin-platform/src/no-direct-db-access.ts` | ⏳ | pending |
| 8979 | `tools/eslint-plugin-platform/tsconfig.json` | ⏳ | pending |
| 8980 | `tools/new-vertical/package.json` | ⏳ | pending |
| 8981 | `tools/new-vertical/src/cli.ts` | ⏳ | pending |
| 8982 | `tools/new-vertical/tsconfig.json` | ⏳ | pending |
| 8983 | `tools/platform-ops/run-and-trace.sh` | ⏳ | pending |
| 8984 | `tools/tenancy/package.json` | ⏳ | pending |
| 8985 | `tools/tenancy/seed-tenant.ts` | ⏳ | pending |
| 8986 | `tools/tenancy/tsconfig.json` | ⏳ | pending |
| 8987 | `tsconfig.base.json` | ⏳ | pending |
| 8988 | `turbo.json` | ⏳ | pending |
| 8989 | `verticals/_template/README.md` | ⏳ | pending |
| 8990 | `verticals/_template/branding/theme.json` | ⏳ | pending |
| 8991 | `verticals/_template/manifest.json` | ⏳ | pending |
| 8992 | `verticals/_template/navigation.json` | ⏳ | pending |
| 8993 | `verticals/dwa/branding/theme.json` | ⏳ | pending |
| 8994 | `verticals/dwa/manifest.json` | ⏳ | pending |
| 8995 | `verticals/dwa/manifest.lock` | ⏳ | pending |
| 8996 | `verticals/dwa/navigation.json` | ⏳ | pending |
| 8997 | `verticals/dwa/prompts/coaching/_active.txt` | ⏳ | pending |
| 8998 | `verticals/dwa/prompts/coaching/v1.md` | ⏳ | pending |
| 8999 | `verticals/gtm/branding/theme.json` | ⏳ | pending |
| 9000 | `verticals/gtm/manifest.json` | ⏳ | pending |
| 9001 | `verticals/gtm/manifest.lock` | ⏳ | pending |
| 9002 | `verticals/gtm/navigation.json` | ⏳ | pending |
| 9003 | `verticals/gtm/prompts/coaching/_active.txt` | ⏳ | pending |
| 9004 | `verticals/gtm/prompts/coaching/v1.md` | ⏳ | pending |

## Findings recorded during pass

### B-039 · HIGH — silent JSONB dot-path writes repeated across academy routes

The `academy/assessment` route explicitly warns:
> "Must NOT use dot-path 'assessment.assessmentHistory' here. If profile.assessment is JSON null in the DB, jsonb_set silently fails through a null intermediate key and the result is lost."

Yet four sibling routes still use the dot-path pattern, identical shape:

- [apps/dwa/app/api/academy/checklist/[courseId]/[lessonId]/route.ts:75](apps/dwa/app/api/academy/checklist/[courseId]/[lessonId]/route.ts#L75) — `'progress.checklists'`
- [apps/dwa/app/api/academy/component-state/[courseId]/[lessonId]/route.ts:83](apps/dwa/app/api/academy/component-state/[courseId]/[lessonId]/route.ts#L83) — `'progress.componentStates'`
- [apps/dwa/app/api/academy/thought-record/[courseId]/[lessonId]/route.ts:74](apps/dwa/app/api/academy/thought-record/[courseId]/[lessonId]/route.ts#L74) — `'progress.thoughtRecords'`
- [apps/dwa/app/api/academy/tracking-log/[courseId]/[lessonId]/route.ts:79](apps/dwa/app/api/academy/tracking-log/[courseId]/[lessonId]/route.ts#L79) — `'progress.trackingLogs'`

**Risk:** when `profile.progress` is `null` in the DB, these saves silently lose data. Exactly the failure mode the assessment route already called out. Affected user data: thought records, tracking logs, checklist progress, component interaction state.

**Fix (blueprint):** merge the full `progress` object at the top level (as the assessment route does for `assessment`), never through a dot-path that traverses a nullable intermediate.

### PHI IDOR (CRITICAL — previously identified in Phase 1, not yet fixed)

- [apps/dwa/app/api/clinical-data/[componentType]/[componentId]/route.ts:15-68](apps/dwa/app/api/clinical-data/[componentType]/[componentId]/route.ts#L15-L68)
- A regular authenticated user (non-provider) can pass `?userId=<victim>` and the `where` clause uses that query-supplied value instead of the session userId. The provider-assignment gate at line 28 only fires when `role === 'provider'`; it's a no-op for regular users.
- **Scheduled for fix in Phase 3 of this audit.**

### Polar webhook placeholder-secret bypass (CRITICAL — previously identified, not yet fixed)

- [apps/gtm/app/api/webhook/polar/route.ts:10-22](apps/gtm/app/api/webhook/polar/route.ts#L10-L22)
- When `POLAR_WEBHOOK_SECRET` is unset, the webhook is configured with the literal string `"__MISSING_POLAR_WEBHOOK_SECRET__"`, which is visible in source. An attacker can HMAC-sign a forged webhook with that known value and grant themselves a paid subscription.
- Module-load-time read of the env var (B-020/B-021 lazy-init pattern) compounds the problem: setting the env after process start has no effect.
- **Scheduled for fix in Phase 3 of this audit.**

### Notes (flagged for follow-up, not yet severity-graded)

- [apps/dwa/app/api/academy/feedback/route.ts:10-22](apps/dwa/app/api/academy/feedback/route.ts#L10-L22) — runtime `CREATE TABLE IF NOT EXISTS` on first-ever insert. Bypasses the migration system; schema drift potential. Table shape defined in two places (migration + this runtime DDL).
- [apps/dwa/app/api/academy/feedback/route.ts:30-37](apps/dwa/app/api/academy/feedback/route.ts#L30-L37) — when no DB configured, logs the entire `message` field to application logs. If a user reports distress/PHI in feedback, it lands in logs.
- [apps/dwa/app/api/ai/chat/route.ts:258](apps/dwa/app/api/ai/chat/route.ts#L258) — default error response `\`Wellness coach error: ${errorMsg.slice(0, 200)}\`` surfaces 200 chars of internal error to client. Could leak upstream API response or path fragments.
- [apps/dwa/app/api/ai/chat/route.ts:185](apps/dwa/app/api/ai/chat/route.ts#L185) — Redis cache key `ai:ctx:${userId}` is NOT tenant-prefixed. With multi-tenancy live, same-userId across tenants would collide. Same gap likely repo-wide in Redis usage.
- [apps/dwa/app/api/academy/assessment](apps/dwa/app/api/academy/assessment/[courseId]/[lessonId]/route.ts) — no rate limiting on the scoring endpoint. Assessment scoring is cheap but repeated submissions could be a DoS vector on the profile update path.
- [apps/dwa/app/api/academy/complete-lesson/route.ts:81-89](apps/dwa/app/api/academy/complete-lesson/route.ts#L81-L89) — swallows errors in profile.updateProgress via try/catch with only a log. User-visible state (XP, badges, course completion) can silently diverge. Intentional per the comment, but worth a retry or user-surfaced warning.

## Slice 01 — DWA non-academy API routes

44-file slice per `docs/audit-prompts/01.md`. Every file in scope was READ end-to-end. 23 clean, 21 with findings. DWA is tagged `PHI=true` so a handful of these findings land at CRITICAL/HIGH on a HIPAA posture. Grouped below; new bug classes appended to `docs/bug-patterns.md` as B-040..B-043.

### CRITICAL — Provider can unilaterally claim any user as a patient
- [apps/dwa/app/api/provider/patients/route.ts:146-171](apps/dwa/app/api/provider/patients/route.ts#L146-L171)
- `POST /api/provider/patients` accepts `{ patientId, displayName, notes }` from any user with role=provider and inserts a `providerPatient` row with `status: 'active'`. There is no consent step, no invite redemption, no patient-side confirmation. The only existence check is `user.id = patientId` (line 159). Once the link exists, that provider can read the patient's full PHI via the sibling GET routes.
- The invite/redeem flow in [provider/invite/route.ts](apps/dwa/app/api/provider/invite/route.ts) exists precisely so the patient has to opt in; this POST bypasses it.
- **Fix:** either delete the POST handler outright (relationship establishment belongs to invite-redeem), or require the caller to be an admin (`withAdminAuth`) and record the admin's identity in an audit log.

### HIGH — `account/delete` overwrites the entire profile JSONB, breaking the 30-day grace-period recovery
- [apps/dwa/app/api/account/delete/route.ts:45-54](apps/dwa/app/api/account/delete/route.ts#L45-L54)
- The soft-delete handler does `update(profile).set({ data: { _pendingDeletion: true, _deletionScheduledAt, _purgeAfter } })` — no spread, no merge. All pre-existing profile data (assessment, onboarding, progress, questionnaire, symptoms, free-text "in your words" fields) is destroyed the moment the user clicks delete.
- The paired `cancel-deletion` route at [apps/dwa/app/api/account/cancel-deletion/route.ts:62-75](apps/dwa/app/api/account/cancel-deletion/route.ts#L62-L75) reads `currentProfile.data` and `delete`s the three flags — but by then there is nothing else left to restore. Cancel-deletion's "recovery" is a no-op in practice.
- **Fix:** spread existing data. `data: { ...(currentProfile?.data ?? {}), _pendingDeletion: true, _deletionScheduledAt, _purgeAfter }` — mirror the pattern the cancel route relies on.

### HIGH — Stale diagnostic endpoint in production with PHI shape leak
- [apps/dwa/app/api/diagnostic/route.ts:1-216](apps/dwa/app/api/diagnostic/route.ts#L1-L216)
- File header says "DELETE THIS FILE once the bug is found" — still shipping. Any authenticated user hits `GET /api/diagnostic` and receives a structured dump of their own `profile` keys, assessment keys, questionnaire keys, wellness-score history length, serialization-issue report, and raw `String(error)` of every internal failure. It's own-data so not IDOR, but it is a PHI-structure-disclosure oracle and the `String(e)` fallbacks surface stack traces on any upstream failure.
- No `withAdminAuth`, no env gate (`if (process.env.NODE_ENV !== 'production')`), no admin-secret.
- **Fix:** delete the file. If it must stay for prod debugging, gate behind `withAdminAuth` AND `NODE_ENV !== 'production'`.

### HIGH — `/api/health?diag=ai-test` is an unauthenticated AI cost amplifier
- [apps/dwa/app/api/health/route.ts:80-98](apps/dwa/app/api/health/route.ts#L80-L98)
- The health endpoint is reachable without auth (Dokploy health probes hit it). An attacker sending `GET /api/health?diag=ai-test` triggers a real `aiClient.chat.completions.create(...)` against OpenRouter/OpenAI on every request — billed to the project.
- Even with `max_tokens: 5`, a single attacker can issue hundreds of requests per second. Budget-DoS + noisy-neighbor effect on actual inference.
- The same endpoint with `?diag=ai` leaks env-var-presence booleans and URLs (MEDIUM info-disclosure on top).
- **Fix:** gate the `ai` and `ai-test` diagnostic branches behind `ADMIN_API_SECRET` header the same way `health/ai/route.ts` does (but use header + `timingSafeEqual`, see B-042 below). Plain `GET /api/health` with no diag query should remain unauthenticated for the load-balancer probe.

### HIGH — Signin rate limit bypassed by spoofing `X-Forwarded-For`
- [apps/dwa/app/api/auth/signin/route.ts:14-15](apps/dwa/app/api/auth/signin/route.ts#L14-L15)
- [apps/dwa/app/api/auth/signup/route.ts:15-16](apps/dwa/app/api/auth/signup/route.ts#L15-L16)
- `const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()` takes the *first* entry of the XFF list. Traefik/Dokploy appends the real client IP to the tail, so the first entry is the attacker-supplied value. An attacker rotates the header across requests and the rate-limit key rotates with it — effectively unlimited.
- This is the DWA source-repo pattern lifted intact. New bug class **B-041**.
- **Fix:** use the rightmost trusted entry (count back from the reverse proxy), or use `request.headers.get('x-real-ip')` which Traefik/Dokploy sets from the socket, not from the attacker's header.

### HIGH — Signin differential response leaks "account exists but is scheduled for deletion"
- [apps/dwa/app/api/auth/signin/route.ts:47-65](apps/dwa/app/api/auth/signin/route.ts#L47-L65)
- Three distinct responses for three states: user missing (400 "Invalid email or password"), user soft-deleted (403 "Account is scheduled for deletion" + `deletedAt` + `purgeAfter` timestamps), wrong password (400 "Invalid email or password").
- For a mental-health platform specifically, "this email is registered at DWA" plus "this person started deleting their account on 2026-04-12" is significantly worse than generic account-exists disclosure.
- **Fix:** when `user.deletedAt` is set, surface the same generic "Invalid email or password" response. Expose the deletion-grace-period UI only post-authentication (server verifies credentials first, then surfaces a recovery path).

### HIGH — Signup returns `Email already used` → account enumeration
- [apps/dwa/app/api/auth/signup/route.ts:48-49](apps/dwa/app/api/auth/signup/route.ts#L48-L49)
- Attackers iterate a candidate list and learn which emails are registered at a mental-health platform. Classic enumeration. New bug class **B-043** (differential signup/signin responses).
- **Fix:** on conflict, return a generic 200 with "If this email isn't registered, check your inbox for a verification link" and send a password-reset email to the existing account (standard pattern). Requires the mail adapter to be wired first.

### HIGH — Provider routes skip `status='active'` filter on the link check
- [apps/dwa/app/api/provider/patients/[patientId]/route.ts:37-42](apps/dwa/app/api/provider/patients/[patientId]/route.ts#L37-L42) (GET + PATCH)
- [apps/dwa/app/api/provider/patients/[patientId]/assign/route.ts:30-34](apps/dwa/app/api/provider/patients/[patientId]/assign/route.ts#L30-L34) (POST)
- [apps/dwa/app/api/provider/alerts/[alertId]/resolve/route.ts:28-36](apps/dwa/app/api/provider/alerts/[alertId]/resolve/route.ts#L28-L36) (POST)
- [apps/dwa/app/api/provider/session-prep/[patientId]/route.ts:45-50](apps/dwa/app/api/provider/session-prep/[patientId]/route.ts#L45-L50) (GET)
- The `providerPatient` row check verifies the (providerId, patientId) pair exists but does NOT require `status = 'active'`. A revoked/terminated link still lets the ex-provider read the ex-patient's PHI, push new assignments, generate LLM session briefs, and resolve distress alerts.
- Contrast with [apps/dwa/app/api/provider/patients/route.ts:42](apps/dwa/app/api/provider/patients/route.ts#L42) and [apps/dwa/app/api/provider/alerts/route.ts:19](apps/dwa/app/api/provider/alerts/route.ts#L19), which *do* filter `status='active'`. The check is inconsistent across the surface area.
- New bug class **B-040**.
- **Fix:** add `eq(providerPatient.status, 'active')` to every link-check clause. Grep signature in B-040.

### MEDIUM — Cron purge uses timing-unsafe bearer compare
- [apps/dwa/app/api/cron/purge-deleted-accounts/route.ts:29](apps/dwa/app/api/cron/purge-deleted-accounts/route.ts#L29)
- `authHeader !== \`Bearer ${cronSecret}\`` is byte-comparison, leaking the secret over network timing. Same class as B-036.
- The pre-check at line 29 does prevent the B-029 `Bearer ${undefined}` bypass (good — env-unset returns 401 correctly).
- **Fix:** length-guard + `crypto.timingSafeEqual(Buffer.from(authHeader), Buffer.from(\`Bearer \${cronSecret}\`))`.
- Secondary issue: the purge loop at lines 69-122 runs five DELETEs + one UPDATE per user with no enclosing transaction. A mid-loop crash leaves the account half-purged (e.g. sessions and mood wiped, user row still present). **Fix:** wrap each per-user block in `db.transaction(async tx => {...})`.
- Tertiary: GET that mutates — a browser prefetcher with stale cookies pointed at this URL would trigger a purge. LOW, mitigated by the bearer check, but violates REST semantics. Move to POST.

### MEDIUM — `health/ai` accepts the admin secret in the query string
- [apps/dwa/app/api/health/ai/route.ts:11-14](apps/dwa/app/api/health/ai/route.ts#L11-L14)
- `const key = request.nextUrl.searchParams.get('key'); if (!key || key !== process.env.ADMIN_API_SECRET)` — the secret travels in the URL, which ends up in Dokploy/Traefik access logs, the browser's history, and HTTP referrer headers if the response links anywhere.
- The compare is also not timing-safe (same as above). And the diag block at lines 27-46 returns `error.message` verbatim, which could surface upstream API error text.
- New bug class **B-042** (secrets-in-query-string pattern; separate from B-036 which is about the compare).
- **Fix:** accept the secret in an `Authorization: Bearer …` header, length-guard + `timingSafeEqual`, and redact the raw upstream error before returning it.

### MEDIUM — Provider invite redemption is racy and brute-forceable
- [apps/dwa/app/api/provider/invite/route.ts:45-74](apps/dwa/app/api/provider/invite/route.ts#L45-L74)
- No rate limit on PUT (code redemption). `generateCode` produces 8 chars × 32-char alphabet = ~1.1 T codes, which is fine *if* the attacker is rate-limited. Without a limit, a distributed attacker can brute-force the code space while many are concurrently valid.
- Race: two distinct patients redeeming the same code at the same instant both pass the `isNull(usedBy)` guard, both insert a `providerPatient` row (different (providerId, patientId) so `onConflictDoNothing` doesn't merge them), and both UPDATE the invite — the code gets "used" twice, linking the provider to two patients from one invite.
- **Fix:** use an atomic `UPDATE providerInvite SET usedBy=... WHERE code=... AND usedBy IS NULL AND expiresAt > now() RETURNING *` and only proceed on non-empty return. Add an IP-keyed rate limit on the PUT handler (same `AUTH_RATE_LIMIT` or stricter).

### MEDIUM — `/api/profile` PUT lets a user self-mark onboarding complete and overwrite their questionnaire
- [apps/dwa/app/api/profile/route.ts:41-57](apps/dwa/app/api/profile/route.ts#L41-L57)
- The allowlist is `{ name, onboardingCompleted, questionnaire }`. There is no Zod schema — `questionnaire: {...}` can be any shape. This is the same JSONB that drives [onboarding/assessment/route.ts:24-33](apps/dwa/app/api/onboarding/assessment/route.ts#L24-L33)'s score computation: an attacker writes `{ questionnaire: { primarySymptoms: [] } }`, re-triggers the assessment endpoint, and their wellness scores are whatever they chose.
- Not a privilege escalation to anyone else's data, but a clinical-data integrity bug: the numbers providers see on their dashboards stop corresponding to what the patient actually answered in onboarding.
- **Fix:** either drop `onboardingCompleted`/`questionnaire` from the allowlist (those paths already have dedicated endpoints with Zod), or Zod-validate each allowed field.

### MEDIUM — `/api/onboarding/complete` accepts unvalidated body casts
- [apps/dwa/app/api/onboarding/complete/route.ts:32-49](apps/dwa/app/api/onboarding/complete/route.ts#L32-L49)
- `(assessmentBody.recommendedCourses as string[])`, `(assessmentBody.selectedStartCourse as string)`, `(assessmentBody.priorityFocus as SymptomCategory[])` — all TypeScript `as` casts, zero runtime validation. Arbitrary strings (or objects) flow into the saved assessment and later into dashboard renderers. Less severe than `/api/profile` PUT because scores are recomputed server-side, but priorityFocus / recommendedCourses are free-form strings saved as-is.
- **Fix:** define a Zod schema mirroring the shape and `safeParse` the body.

### MEDIUM — `/api/ai/voice/tts` has no input validation
- [apps/dwa/app/api/ai/voice/tts/route.ts:26-36](apps/dwa/app/api/ai/voice/tts/route.ts#L26-L36)
- `const { text } = body; if (!text) …` — any type, unbounded length. A user can send tens of megabytes of text and charge the OpenAI TTS bill for the synthesis. Rate limit at line 9 caps request count but not size per request.
- **Fix:** `z.object({ text: z.string().min(1).max(5000) })` (or whatever the product cap should be).

### MEDIUM — `/api/ai/voice/stt` has no file size or MIME validation
- [apps/dwa/app/api/ai/voice/stt/route.ts:29-43](apps/dwa/app/api/ai/voice/stt/route.ts#L29-L43)
- `formData.get('audio') as File` — whatever the client uploads goes straight into `voiceService.transcribeAudio(buffer)`. The Next.js default body limit will bound this somewhat, but explicit `file.size > N` and `file.type.startsWith('audio/')` checks should happen here.
- **Fix:** reject files over a product-defined max (e.g. 25 MB) and non-audio MIMEs before reading the buffer.

### MEDIUM — `/api/demo-request` is a public unauthenticated form with no rate limit
- [apps/dwa/app/api/demo-request/route.ts:14-62](apps/dwa/app/api/demo-request/route.ts#L14-L62)
- Contact-form spam magnet. No captcha, no rate limit, no origin check (it's POST so the proxy's CSRF origin check *does* fire, but that's trivially bypassed by any browser tab on an attacker's own domain issuing a `fetch` to `https://digitalwellness.academy/api/demo-request` — Next.js's origin check only blocks when origin is missing or wrong, not for well-formed POSTs from a spoofed origin server-side).
- Error path at line 58 echoes `error.message` back to the client — can surface n8n upstream text.
- Env-var-missing outbound call: `fetch(\`${process.env.N8N_URL}/webhook/demo-request\`, { headers: { Authorization: \`Bearer ${process.env.N8N_API_KEY}\` } })` — if N8N_URL is unset the URL becomes `undefined/webhook/demo-request` which fetch rejects. Not a bypass (outbound), but noisy failure.
- **Fix:** add IP-keyed rate limit (`DEMO_RATE_LIMIT` in `@/lib/security`), redact error text before returning, guard the env vars at module level (see B-020).

### MEDIUM — `/api/forum/discussions` GET has uncapped pagination
- [apps/dwa/app/api/forum/discussions/route.ts:11-25](apps/dwa/app/api/forum/discussions/route.ts#L11-L25)
- `page: Number(params.get('page')) || 1, limit: Number(params.get('limit')) || 20` — no upper bound on either. `?limit=100000` goes straight to Flarum.
- **Fix:** `Math.min(Number(...) || 20, 100)` matching the pagination idiom used in `provider/patients/route.ts`.

### MEDIUM — `/api/provider/rag` logs PHI in query errors + no rate limit
- [apps/dwa/app/api/provider/rag/route.ts:20-40](apps/dwa/app/api/provider/rag/route.ts#L20-L40)
- `logger.error('RAG query error', { userId, query: parsed.data.query, … })` — provider queries routinely contain patient identifiers (alias, course notes, treatment details) and on any upstream failure that text goes to application logs. The `CompliancePolicyZ.redactPromptsInAudit` option exists precisely for this; nothing enforces it.
- No rate limit on the RAG call, which runs embedding + retrieval + LLM synthesis per request.
- **Fix:** drop `query` from the log entry (keep only `userId` + error message), wrap with `isRateLimited(userId, AI_RATE_LIMIT, 'rag')`.

### MEDIUM — `/api/provider/profile` POST can self-demote a verified provider
- [apps/dwa/app/api/provider/profile/route.ts:58-162](apps/dwa/app/api/provider/profile/route.ts#L58-L162)
- The POST always runs the verification pipeline from scratch and resets `verificationStatus` + `verificationMethod` + `verifiedAt` on every upsert (`onConflictDoUpdate`). A verified provider who edits their bio/specialty ends up with `verificationStatus='manual_review'` — their dashboard-facing verification badge drops.
- Worse: the role elevation at line 160-162 only fires when `verificationStatus === 'verified'`, but there's no corresponding *demotion* on the non-verified path. So a verified provider who re-POSTs lands in an inconsistent state — `user.role='provider'` but `providerProfile.verificationStatus='manual_review'`. Any code that gates on `verificationStatus` thinks they're under review; any code that gates on `user.role` thinks they're a provider.
- **Fix:** split POST into "create profile" and "update profile (preserves verification)". Only re-run NPI verification when `npiNumber` actually changed. Never touch `user.role` / `verificationStatus` from the update path.

### MEDIUM — `/api/provider/session-prep` has no rate limit on an LLM call
- [apps/dwa/app/api/provider/session-prep/[patientId]/route.ts:115](apps/dwa/app/api/provider/session-prep/[patientId]/route.ts#L115)
- Every GET triggers `generateSessionPrepBrief(ctx)` which calls the coaching LLM. No `isRateLimited(...)` guard. Not as hot as the RAG endpoint but worth a cap (e.g. once per minute per (provider, patient)).

### LOW — `/api/admin/providers/[userId]` reject path forces role='user'
- [apps/dwa/app/api/admin/providers/[userId]/route.ts:66](apps/dwa/app/api/admin/providers/[userId]/route.ts#L66)
- The reject branch unconditionally runs `update(user).set({ role: 'user' })`. If the target user has a role other than `user`/`provider` (e.g., `admin`), rejecting their provider application demotes them. Edge case (an admin is unlikely to apply as a provider), but the fix is one line: only demote when the current role is `provider`.

### Notes (not severity-graded, but worth filing)

- [apps/dwa/app/api/docs/route.ts:1-13](apps/dwa/app/api/docs/route.ts#L1-L13) — the OpenAPI document is served publicly. If admin/internal endpoints are in the generated spec (I didn't open the generator), this leaks a map of every authenticated surface. Worth gating behind `withAdminAuth` or `NODE_ENV !== 'production'` unless the spec is intentionally public-API.
- [apps/dwa/app/api/cron/purge-deleted-accounts/route.ts:27](apps/dwa/app/api/cron/purge-deleted-accounts/route.ts#L27) — `process.env.CRON_SECRET || process.env.ADMIN_API_SECRET` fallback means rotating ADMIN_API_SECRET also rotates the cron credential. Probably intentional, but couples two concerns that want to rotate independently.
- [apps/dwa/app/api/account/delete/route.ts:5](apps/dwa/app/api/account/delete/route.ts#L5) — imports `moodEntry, coachSession, patientAssignment` but never uses them. Minor; the cron purge at lines 92-98 is the place that actually deletes them. Dead import.
- [apps/dwa/app/api/onboarding/in-your-words/route.ts:42-57](apps/dwa/app/api/onboarding/in-your-words/route.ts#L42-L57) — the fire-and-forget `db.insert(distressEvent)` inside a `.then()` without awaiting means any transient DB error won't bubble to the user but will be logged. That's the intended design; just noting that the handler returns `success: true` even if the distress-classification insert fails — the user is never told their distress was or wasn't filed. Acceptable given the UX (fire-and-forget), but means a silent mis-configuration (Maia offline) is invisible to the patient.
- [apps/dwa/app/api/auth/signin/route.ts:67-72](apps/dwa/app/api/auth/signin/route.ts#L67-L72) — when `!user` (line 47-49), we skip argon2 verify and return fast. Attackers can time-distinguish "no such user" (fast) from "user exists, wrong password" (slow). Classic timing side channel. Fix: perform a dummy verify against a constant hash when the user is missing, then compare-return. LOW given the already-present enumeration vector on deletion and on signup — fixing those first matters more.
- [apps/dwa/app/api/forum/bookmarks/route.ts:32-36](apps/dwa/app/api/forum/bookmarks/route.ts#L32-L36) — no existence check on `discussionId` before insert. A user can bookmark arbitrary strings (stored per-user, so no cross-user pollution, just junk rows).

### Remediation status (slice 01)

All CRITICAL / HIGH / MEDIUM / LOW findings above were fixed in a follow-up
commit to this slice, with backports into the two source repos. The
`Notes` list is deliberately not remediated — those items were flagged for
follow-up rather than graded.

| Finding | Monorepo | DWA source (`mental-health-education-platform`) | GTM source (`customer-acquisition-academy-vps`) |
|---|---|---|---|
| provider/patients POST claims any patient | ✅ gated behind `withAdminAuth` with both-user role checks + audit log | ✅ backported | n/a |
| account/delete overwrites profile JSONB | ✅ merge-spread existing data | ✅ backported | n/a |
| /api/diagnostic stale debug endpoint | ✅ file deleted | ✅ deleted | n/a |
| /api/health?diag=ai-test unauthenticated | ✅ admin-only via `Authorization` header + `timingSafeEqual` | ✅ backported | n/a |
| XFF spoof on rate-limit key (B-041) | ✅ shared `getClientIp(request)` helper in `lib/security.ts` (prefers `x-real-ip`, falls back to rightmost XFF entry) | ✅ backported | ✅ helper already correct; `app/api/forms/submit` last `[0]` hit fixed |
| Signin differential responses / timing (B-043) | ✅ collapsed to one response, dummy argon2 on `!user` | ✅ backported | ⚠️ GTM signin already uses the rate-limit helper correctly; its enumeration profile is essentially the same as the signup profile — see below |
| Signup "Email already used" enumeration (B-043) | ✅ uniform 200 response + unconditional argon2 hash | ✅ backported | ❌ **blocked** — sandbox refused auth-flow edit. Pending explicit user permission. |
| Provider link check missing `status='active'` (B-040) — 4 routes | ✅ filter added in patients/[patientId] GET + PATCH, assign POST, alerts resolve, session-prep GET | ✅ backported | n/a |
| Cron purge timing-unsafe + no transaction | ✅ `timingSafeEqual` + per-user `db.transaction` | ✅ backported | n/a |
| health/ai admin secret in URL (B-042) | ✅ moved to `Authorization: Bearer` + `timingSafeEqual` + redacted error | ✅ backported | n/a |
| onboarding/complete no Zod | ✅ `completeBodySchema` | ✅ backported | n/a |
| profile PUT self-set `onboardingCompleted` | ✅ allowlist narrowed to `{name}`, Zod-validated | ✅ backported | n/a |
| TTS no Zod / length cap | ✅ `z.object({ text: z.string().min(1).max(5000) })` | ✅ backported | n/a |
| STT no size / MIME check | ✅ 25 MB cap + `audio/*` MIME guard | ✅ backported | n/a |
| forum/discussions uncapped pagination | ✅ `MAX_PAGE=200, MAX_LIMIT=100` | ✅ backported | n/a |
| demo-request no rate limit + error echo | ✅ `DEMO_RATE_LIMIT` (3/hour) + error scrub | ✅ backported (untracked file in source) | n/a |
| provider/rag PHI in logs + no rate limit | ✅ removed `query` from error log, added `AI_RATE_LIMIT` gate | ✅ backported | n/a |
| provider/session-prep no rate limit | ✅ `AI_RATE_LIMIT` keyed on (provider, patient) | ✅ backported | n/a |
| provider/invite race + brute-force | ✅ atomic `UPDATE ... RETURNING` + `AUTH_RATE_LIMIT` on PUT | ✅ backported | n/a |
| provider/profile self-demotion | ✅ preserve existing verification state when NPI unchanged; reconcile `user.role` ↔ `verificationStatus` on every run | ✅ backported | n/a |
| admin/providers reject unconditional role='user' | ✅ demote only when current role is `provider` | ✅ backported | n/a |

**GTM signup enumeration (B-043) — blocked:**
the sandbox declined the edit to
`customer-acquisition-academy-vps/app/api/auth/signup/route.ts` as "auth
flow modification in a sibling repo". The diff is prepared (uniform 200
response + unconditional argon2 hash, same shape as the monorepo and DWA
source fix) but needs explicit user permission to apply. See the
remediation note in `docs/source-repo-backports.md` for the exact diff.

