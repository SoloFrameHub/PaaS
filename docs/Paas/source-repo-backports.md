# Source-repo backports

The apps in `apps/gtm` and `apps/dwa` were lifted from standalone
repos that are **still deployed** and still receive traffic. Bugs
fixed in this monorepo via [cc063a3](https://github.com/SoloFrameHub/PaaS/commit/cc063a3)
also need to land in the upstream source repos — otherwise the
production deployments keep running the broken code.

This doc lists the backports per source repo, ordered by runtime
severity. Fixes are the same shape as in the monorepo; paths and
specific diffs are noted here so the port is mechanical.

When a bug is fixed upstream, strike it through here (don't delete —
useful for auditing which repos shipped the fix).

---

## Source repos

| Vertical | Monorepo path | Source repo | Remote | Local checkout |
|---|---|---|---|---|
| gtm | `apps/gtm` | `customer-acquisition-academy-vps` | `https://github.com/SoloFrameHub/customer-acquisition-academy-vps.git` | `/Volumes/ext-data/github/GTM-OS/customer-acquisition-academy-vps` |
| dwa | `apps/dwa` | `mental-health-education-platform` | `git@github.com:SoloFrameHub/mental-health-education-platform.git` | `/Volumes/ext-data/github/mental-health-education-platform-main` |

Both source repos are on Next.js 16 (gtm 16.1.6, dwa 16.2.1), so
every bug below that depends on Next 16 behavior is live in both.

---

## Backports for **gtm source** (customer-acquisition-academy-vps)

### [B-013] Polar webhook sends GA4 `value: 0` for every paid order — **HIGH, production impact now**

Every paid Polar order since this line was written has tracked with
`value: 0` in GA4. Purchase-revenue reports are wrong. Ship this fix
first.

**File:** `app/api/webhook/polar/route.ts:95`

**Diff:**
```diff
-            value: (order.amount ?? 0) / 100,
+            value: (order.totalAmount ?? 0) / 100,
```

**Why:** Polar's `Order` type has `totalAmount` (cents, after
discounts and taxes) — not `amount`. The old line evaluates to
`(undefined ?? 0) / 100 = 0` at runtime. `moduleResolution: "bundler"`
+ the Polar SDK's `exports` map catches it at typecheck, which is why
it surfaces on Next 16 builds but not on older `moduleResolution:
"node"` setups.

**Verification after applying:** `pnpm build` should still pass.

**Recommend also:** if the repo's `tsconfig.json` still has
`moduleResolution: "node"`, switch to `"bundler"` — matches how
Next/Turbopack resolves at runtime and will catch future
`exports`-map mismatches in SDK packages.

---

## Backports for **dwa source** (mental-health-education-platform)

Apply in this order — B-010 must land for the repo to build at all on
Next 16, so it blocks the others. If the repo currently doesn't
build, it's probably been broken since the Next 16 upgrade.

### [B-010] `middleware.ts` + `proxy.ts` both present → build fails — **HIGH, build-blocker**

**Files:**
- `middleware.ts` — delete
- `proxy.ts` — merge in the request-id tracing logic that's in the
  deleted `middleware.ts`

**The merge:** apply the same edits the monorepo made in cc063a3
to `apps/dwa/proxy.ts`. Concretely, change the `proxy` function to:

```ts
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const requestId = request.headers.get('x-request-id') || crypto.randomUUID();

    // 1. CSRF Protection for Mutations (POST, PUT, DELETE, PATCH)
    const mutations = ['POST', 'PUT', 'DELETE', 'PATCH'];
    if (mutations.includes(request.method) && pathname.startsWith('/api/')) {
        const origin = request.headers.get('origin');
        const referer = request.headers.get('referer');
        const host = request.headers.get('host');

        const getHostname = (url: string) => { try { return new URL(url).hostname; } catch { return null; } };
        const originHost = origin ? getHostname(origin) : null;
        const refererHost = referer ? getHostname(referer) : null;
        const hostName = host ? host.split(':')[0] : null;
        const isSameOrigin = (originHost && originHost === hostName) || (!originHost && refererHost === hostName);

        if (process.env.NODE_ENV === 'production' && !isSameOrigin) {
            return new NextResponse(
                JSON.stringify({ error: 'CSRF Protection: Invalid origin' }),
                {
                    status: 403,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-request-id': requestId,
                    },
                },
            );
        }
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-request-id', requestId);
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.headers.set('x-request-id', requestId);
    return addSecurityHeaders(response);
}
```

Then `rm middleware.ts`.

**Fixes three bugs in one move:** the file collision itself, plus
**B-011** (Node `crypto` import in Edge Runtime — the deleted
`middleware.ts` had `import { randomUUID } from 'crypto'` which would
crash in Edge; the replacement uses the global `crypto.randomUUID()`),
and **B-012** (the deleted `middleware.ts` mutated `requestHeaders`
but returned a `NextResponse.next()` without passing them, so
downstream handlers never saw `x-request-id` — the replacement uses
`NextResponse.next({ request: { headers: requestHeaders } })`).

### [B-014] Node `async_hooks` pulled into client bundle via logger → build fails — **HIGH, build-blocker**

Any client component that uses `@/lib/logger` (e.g.,
`components/error-boundary.tsx`) transitively imports
`lib/request-context.ts`, which imports `async_hooks`. Client bundles
don't have `async_hooks`; build errors with
`Module not found: Can't resolve 'async_hooks'`.

**Files:** `lib/logger.ts` and `lib/request-context.ts`.

**Fix:** invert the dependency. Logger stops importing request-context
and instead accepts a context provider function. Request-context
registers itself as the provider and is marked `server-only`.

**`lib/logger.ts`** — replace the top of the file:

```ts
// OLD
import { getRequestContext } from './request-context';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
    [key: string]: any;
}

// NEW
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
    [key: string]: any;
}

interface LoggerRequestContext {
    requestId?: string;
    userId?: string;
    path?: string;
}

type ContextProvider = () => LoggerRequestContext | undefined;

let contextProvider: ContextProvider | undefined;

export function setLoggerContextProvider(fn: ContextProvider): void {
    contextProvider = fn;
}
```

And inside `log()`, change the one call:

```ts
// OLD
const requestCtx = getRequestContext();

// NEW
const requestCtx = contextProvider?.();
```

**`lib/request-context.ts`** — add two lines at the top and one at
the bottom:

```ts
import 'server-only';                              // new: poisons this module for client imports
import { AsyncLocalStorage } from 'async_hooks';
import { setLoggerContextProvider } from './logger'; // new

// ... existing code unchanged ...

// new (add after `export const requestContext = new AsyncLocalStorage<RequestContext>();`):
setLoggerContextProvider(() => requestContext.getStore());
```

**Why this is correct:** the logger's import graph no longer touches
`async_hooks`. Server-side code that uses `withRequestContext()`
already imports `lib/request-context`, which triggers the provider
registration on first import, so server logs still get enriched with
`requestId` / `userId` / `path`. Client bundles never reach
`request-context`, and the provider stays undefined — the logger
simply skips context enrichment in the browser, matching the old
behavior (client calls had no AsyncLocalStorage scope anyway).

**Install:** this requires the `server-only` package:
```
pnpm add server-only
```
(or `npm install server-only` — it's a single-line module by the
Next.js team; no runtime cost.)

---

## Backports for **gtm source** — added after monorepo catalog expansion

### [B-013] Polar webhook GA4 `value: 0` — **still listed above as HIGH**

### [B-020] `/api/checkout` Polar token non-null assertion — **HIGH, crash landmine**

Every request to `/api/checkout` crashes at module init if either
`POLAR_ACCESS_TOKEN` or `POLAR_SUCCESS_URL` is missing. Not a clean
500 — a `TypeError` on undefined, which most deploys surface as
"something in gtm is down" with no message pointing at the cause.

**File:** `app/api/checkout/route.ts`

**Diff:**
```diff
-export const GET = Checkout({
-  accessToken: process.env.POLAR_ACCESS_TOKEN!,
-  successUrl: process.env.POLAR_SUCCESS_URL!,
-  server: (process.env.POLAR_MODE as 'sandbox' | 'production') || 'sandbox',
-});
+const accessToken = process.env.POLAR_ACCESS_TOKEN;
+const successUrl = process.env.POLAR_SUCCESS_URL;
+if (!accessToken || !successUrl) {
+  throw new Error(
+    '/api/checkout is misconfigured: POLAR_ACCESS_TOKEN and POLAR_SUCCESS_URL are required.',
+  );
+}
+
+export const GET = Checkout({
+  accessToken,
+  successUrl,
+  server: (process.env.POLAR_MODE as 'sandbox' | 'production') || 'sandbox',
+});
```

Also check `drizzle.config.ts` for a `process.env.DATABASE_URL!`
pattern; same fix shape (pull into `const`, guard with
`if (!DATABASE_URL) throw ...`).

---

### [B-021] localhost fallback URLs in prod — **MEDIUM, degradation**

Three hits in the gtm source:

1. **`lib/redis.ts:4`** — `process.env.REDIS_URL || 'redis://localhost:6379'`.
   In Dokploy, localhost is the container; the Redis client
   reconnects forever, spamming logs that look like a real outage.

   **Diff:**
   ```diff
   -const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
   -const redisEnabled = process.env.REDIS_ENABLED !== 'false';
   +const redisUrl = process.env.REDIS_URL;
   +const redisEnabled =
   +  process.env.REDIS_ENABLED !== 'false' && Boolean(redisUrl);
   ```

   Plus in `RedisClient.getInstance()`:
   ```diff
   -    if (!redisEnabled) {
   +    if (!redisEnabled || !redisUrl) {
          return null;
   ```

2. **`app/api/notion/callback/route.ts:6`** and
   **`lib/notion/client.ts:18-21`** — both fall back to
   `http://localhost:3000` for `NEXT_PUBLIC_APP_URL`. In prod this
   redirects Notion OAuth returns to localhost (user sees a broken
   page). Fix: gate the localhost fallback on
   `NODE_ENV !== 'production'`; throw in prod with a clear message.
   Full diffs are in [97c6b58](commit 97c6b58).

---

## Backports for **dwa source** — added after monorepo catalog expansion

### [B-021] Flarum + Notion-style localhost fallback — **MEDIUM**

1. **`lib/flarum.ts:193-195`** — two localhost fallbacks. Apply
   the monorepo's guarded constructor (see apps/dwa/lib/flarum.ts
   in 97c6b58).

2. **`lib/ai/maia-client.ts:26`** — localhost fallback is
   INTENTIONAL per the "Finding 13: fail-safe, not fail-hard"
   comment. Keep as-is. Document it if the team wants the
   behavior formalized.

---

## Applying a backport

The monorepo is authoritative. If a diff here disagrees with the
monorepo's current state of the same file, the monorepo wins.

```bash
cd /Volumes/ext-data/github/mental-health-education-platform-main   # or the gtm source
git checkout -b fix/source-backport-2026-04-23
# apply the diff(s) above
pnpm build   # must pass before committing
git add -A
git commit -m "fix: backport {B-xxx} from solofame-platform monorepo"
git push origin fix/source-backport-2026-04-23
# open PR, merge, deploy
```

**After merging upstream**, come back and mark the bug as backported
in this file. Leave the strikethrough, date it, add the upstream
commit SHA if easy to grab.

---

## Not backporting

Some bugs don't need backporting:

- **B-001 (Drizzle `===`)**: the cron file in dwa source is identical
  to what was lifted, so the no-op was shipping there too — but
  [1a61f64](https://github.com/SoloFrameHub/PaaS/commit/1a61f64)
  only fixed the monorepo copy. Worth folding into the dwa backport
  PR above. (Grep `apps/dwa/app/api/cron/purge-deleted-accounts/route.ts`
  before lift date for the exact diff — 6 `eq(col, val)` substitutions.)
- **B-003 (Dokploy volume wipe)**: infrastructure-only, not in app code.
- **B-004 (`next-env.d.ts` missing after lift)**: only affected the
  lift itself; source repos have the file committed in `.gitignore`
  exception or Next regenerates it locally.
- **B-005 (Postgres `CREATE POLICY` order)**: migration-only, not in
  app code.
- **B-006 (secrets in playbooks)**: flagged in the main bug-patterns
  doc; rotation is Mike's task and the files in source repos still
  contain live keys — a cleanup sweep in the source repos would be a
  separate effort.
- **B-007, B-008, B-009**: monorepo hygiene only. B-009 (multi-tenant
  migration) landed 2026-04-26 on the monorepo branch `b-009-migration`
  — adds `tenant_id` + RLS to 48 app tables and routes 53 sites
  through `withTenantApp`/`withSystemAdminApp`. Source repos
  (`mental-health-education-platform-main`, `customer-acquisition-academy-vps`)
  do not get this work because they lack the platform spine
  (`@platform/tenancy`, the tenant/tenant_member tables, RLS helper
  policies). Backporting would require lifting the spine first, which
  defeats the lift-and-shift framing of the source repos.

---

## Audit sweep — B-028, B-029, B-036 (production-hardening)

All three land upstream. These are security-critical; schedule
ahead of any feature work in the source repos.

### [B-028] GTM source — mock-auth bypass in production

**Applies to:** `customer-acquisition-academy-vps` (gtm source).
Same file shape (`lib/auth.ts`) lifted intact.

**Diff:** copy the guard from this monorepo's
`apps/gtm/lib/auth.ts:getServerSession` — an explicit
`NODE_ENV === 'production'` check that throws before falling
through to `getMockSession`. DWA's source
(`mental-health-education-platform`) already has the correct
guard; GTM source does not.

**Severity:** CRITICAL — any deploy with
`NEXT_PUBLIC_MOCK_AUTH=true` accidentally set is a full auth
bypass.

---

### [B-029] DWA source — `Bearer ${undefined}` in create-demo-user

**Applies to:** `mental-health-education-platform` (dwa source).
Same file: `app/api/admin/create-demo-user/route.ts`.

**Diff:** replace the template-literal build + `!==` compare with
the explicit-env-guard + `timingSafeEqual` pattern from this
monorepo's `apps/dwa/app/api/admin/create-demo-user/route.ts`.

**Severity:** CRITICAL — unauthenticated admin bypass whenever
`N8N_API_KEY` is unset (any attacker sending
`Authorization: Bearer undefined` is admin).

---

### [B-036] DWA source — admin/debug/audit timing-unsafe compare

**Applies to:** `mental-health-education-platform` (dwa source) if
that repo carries the same admin/debug/audit route. Check
`app/api/admin/debug/audit/route.ts` (or the equivalent dashboard
debug endpoint). Apply the same length-guard + `timingSafeEqual`
fix.

**Severity:** MEDIUM — timing side-channel against a high-value
secret.

---

## Not-for-backport (monorepo-only)

- **B-030, B-031, B-033, B-034, B-035, B-037**: all touch
  `@platform/tenancy`, app middleware wiring, the ESLint plugin, or
  manifest-loader — none of these existed in the source repos.
- **B-032**: only the Drizzle schema in
  `@platform/tenancy/src/schema/` had the drift. Not upstream.
- **B-038**: only the monorepo's gtm `seed-demo` route had the
  per-request pool pattern.

---

## Audit sweep — slice 01 (2026-04-24, DWA non-academy API routes)

All of the following were lifted intact from the DWA source repo
(`mental-health-education-platform`) and need to land upstream. Apply
them in the order below (CRITICAL → HIGH → MEDIUM); B-040 and the
B-043 enumeration pair are HIPAA-adjacent so they should run ahead of
any feature work.

### [slice-01] Provider-claim-any-patient (CRITICAL)

**Applies to:** `mental-health-education-platform` if the source repo
carries `app/api/provider/patients/route.ts` POST handler.

**Diff (conceptual):** delete the POST handler, or wrap it with an
admin-only guard. The invite-redeem flow in
`provider/invite/route.ts` is the consented path.

### [B-040] Provider-patient link check missing `status='active'` (HIGH)

**Applies to:** `mental-health-education-platform`.

**Files:**
- `app/api/provider/patients/[patientId]/route.ts` (GET + PATCH)
- `app/api/provider/patients/[patientId]/assign/route.ts` (POST)
- `app/api/provider/alerts/[alertId]/resolve/route.ts` (POST)
- `app/api/provider/session-prep/[patientId]/route.ts` (GET)

**Diff:** add `eq(providerPatient.status, 'active')` to the `and(...)`
clause in each link-check query. See B-040 in
`docs/bug-patterns.md` for the exact shape.

### [slice-01] `account/delete` overwrites entire profile JSONB (HIGH)

**Applies to:** `mental-health-education-platform`.

**File:** `app/api/account/delete/route.ts:45-54`.

**Diff:**
```diff
-    await db
-      .update(profile)
-      .set({
-        data: {
-          _pendingDeletion: true,
-          _deletionScheduledAt: now.toISOString(),
-          _purgeAfter: purgeDate.toISOString(),
-        },
-      })
-      .where(eq(profile.userId, userId));
+    const [existingProfile] = await db
+      .select({ data: profile.data })
+      .from(profile)
+      .where(eq(profile.userId, userId));
+    const nextData = {
+      ...((existingProfile?.data as Record<string, unknown>) ?? {}),
+      _pendingDeletion: true,
+      _deletionScheduledAt: now.toISOString(),
+      _purgeAfter: purgeDate.toISOString(),
+    };
+    await db
+      .update(profile)
+      .set({ data: nextData })
+      .where(eq(profile.userId, userId));
```

### [slice-01] Stale `/api/diagnostic` in production (HIGH)

**Applies to:** `mental-health-education-platform`.

**File:** `app/api/diagnostic/route.ts` — delete outright, or gate
behind `withAdminAuth` + `process.env.NODE_ENV !== 'production'`.

### [slice-01] `/api/health?diag=ai-test` unauthenticated AI cost
amplifier (HIGH)

**Applies to:** `mental-health-education-platform`.

**File:** `app/api/health/route.ts:79-98`.

**Diff:** require `ADMIN_API_SECRET` (via header + `timingSafeEqual`)
for any request that includes `diag=ai`, `diag=ai-test`, or
`diag=maia`. Plain `GET /api/health` stays unauthenticated for the
Dokploy/Traefik health probe.

### [B-041] Rate-limit key from first-entry of XFF (HIGH)

**Applies to:** both DWA and GTM source repos.

**Files:**
- `app/api/auth/signin/route.ts` line ~14
- `app/api/auth/signup/route.ts` line ~15

**Diff:** see B-041 in `docs/bug-patterns.md` — switch to `x-real-ip`
with an `at(-1)` tail fallback.

### [B-043] Account-enumeration via differential auth responses (HIGH)

**Applies to:** `mental-health-education-platform` (DWA source). GTM
source uses Better Auth — that slice's enumeration profile is
different; audit separately when GTM routes come up.

**Files:**
- `app/api/auth/signup/route.ts` line ~48 (collapse the
  `Email already used` branch to the generic 200 path)
- `app/api/auth/signin/route.ts` lines ~47-75 (collapse the three
  login-failure branches to one generic 400; add dummy argon2 verify
  on the `!user` path to level timing)

### [slice-01] Cron purge timing-unsafe compare + no transaction (MEDIUM)

**Applies to:** `mental-health-education-platform`.

**File:** `app/api/cron/purge-deleted-accounts/route.ts:29,69-122`.

**Diff:** switch bearer compare to `timingSafeEqual`; wrap the
per-user delete-sequence in `db.transaction(async tx => { ... })`.

### [B-042] `health/ai` admin-secret in query string (MEDIUM)

**Applies to:** `mental-health-education-platform`.

**File:** `app/api/health/ai/route.ts:11-14`.

**Diff:** accept via `Authorization: Bearer …` header with
`timingSafeEqual` compare. See B-042.

### [slice-01] Provider invite race + brute-force (MEDIUM)

**Applies to:** `mental-health-education-platform`.

**File:** `app/api/provider/invite/route.ts:45-74`.

**Diff:** atomic `UPDATE providerInvite SET usedBy=... WHERE
code=... AND usedBy IS NULL AND expiresAt > now() RETURNING *` with
early-exit on empty result; add IP-keyed rate-limit on PUT.

---

## Remediation status (2026-04-24)

All DWA-source backports above were applied in commit-in-progress
(see `git status` at the repo root). The files in the source repo
now match the monorepo byte-for-byte for:

- `lib/security.ts`
- `app/api/account/delete/route.ts`
- `app/api/admin/providers/[userId]/route.ts`
- `app/api/ai/voice/{stt,tts}/route.ts`
- `app/api/auth/{signin,signup}/route.ts`
- `app/api/cron/purge-deleted-accounts/route.ts`
- `app/api/demo-request/route.ts` (was untracked in source)
- `app/api/forum/discussions/route.ts`
- `app/api/health/{route,ai/route}.ts`
- `app/api/onboarding/complete/route.ts`
- `app/api/profile/route.ts`
- `app/api/provider/alerts/[alertId]/resolve/route.ts`
- `app/api/provider/invite/route.ts`
- `app/api/provider/patients/{route, [patientId]/route, [patientId]/assign/route}.ts`
- `app/api/provider/profile/route.ts`
- `app/api/provider/rag/route.ts`
- `app/api/provider/session-prep/[patientId]/route.ts`

Plus `app/api/diagnostic/` was deleted.

`npx tsc --noEmit` reports zero errors under `app/api/**` and `lib/**`
(the few errors that remain are in an unrelated in-progress marketing
page tree).

### GTM source — B-041 completed; B-043 (signup enumeration) pending

GTM's `lib/security.ts` already had a correct `getClientIp` helper
(prefers `x-real-ip` / `cf-connecting-ip` over XFF, uses `.pop()` on
XFF). The only remaining leftmost-XFF site was
`app/api/forms/submit/route.ts:43` — **fixed** this sweep to use
`getClientIp(request)`.

**Still pending (blocked):** `app/api/auth/signup/route.ts:74-81` has
the same `Email already used` 400 response as the DWA source's pre-fix
state. The sandbox refused the edit as "auth-flow modification in a
sibling repo". Apply this diff manually:

```diff
   const existing = await db
     .select()
     .from(schema.user)
     .where(eq(schema.user.email, email))
     .limit(1);
-  if (existing.length > 0) {
-    return NextResponse.json({ error: "Email already used" }, { status: 400 });
-  }
-
-  const passwordHash = await hash(password, {
+  // Always run argon2 hashing regardless of whether the email is taken —
+  // keeps response time constant, defeats timing enumeration, and the
+  // response body below is uniform across both paths. (B-043.)
+  const passwordHash = await hash(password, {
     memoryCost: 19456,
     timeCost: 2,
     outputLen: 32,
     parallelism: 1,
   });
+
+  if (existing.length > 0) {
+    logger.info("signup_email_already_registered", {});
+    // TODO: when wired, also send a "you already have an account" email
+    // via Resend so the legitimate owner knows someone tried.
+    return NextResponse.json({ ok: true, redirect: "/signin" }, { status: 200 });
+  }
```

GTM signin (`app/api/auth/signin/route.ts`) should be reviewed at the
same time for the same three-branch collapse + dummy-argon2-on-miss
pattern the monorepo applies — see
`apps/dwa/app/api/auth/signin/route.ts` in this monorepo for the
canonical version.

---

## Audit sweep — slice 02 (2026-04-24, DWA lib/)

All three of these were lifted from the DWA source repo intact and
need to land upstream. Order of application: B-044 first (production
security), then B-045 (privacy / arbitrary file read), then B-046
(log hygiene).

### [B-044] Dokploy-blind mock-auth production guard — **HIGH**

**Applies to:** `mental-health-education-platform` (DWA source).

**Files:**
- `lib/security.ts` — `isRateLimited()` top-of-function mock guard
- `lib/repositories/profileRepository.ts` — `getProfileRepository()` mock guard

Both checks currently read:
```ts
if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production') {
  throw new Error(…);
}
```

On Dokploy (no `VERCEL_ENV`), the compound is always false and the
throw never fires — mock auth in prod silently disables rate
limiting / points the profile repo at `/tmp`. Fix: drop the
`VERCEL_ENV` conjunct.

Canonical form already exists in the same repo at `lib/auth.ts` (DWA
source) — `NODE_ENV === 'production'` alone.

Copy the diffs from the monorepo's `apps/dwa/lib/security.ts` and
`apps/dwa/lib/repositories/profileRepository.ts` after the slice-02
remediation commit.

### [B-045] Path traversal in filesystem helpers — **HIGH**

**Applies to:** `mental-health-education-platform` (DWA source).
Every one of the seven files listed in `docs/bug-patterns.md`
B-045 exists upstream with the same shape.

**Files:**
- `lib/assessments.ts`
- `lib/checklists.ts`
- `lib/thought-records.ts`
- `lib/tracking-logs.ts`
- `lib/lessons.ts`
- `lib/services/quizService.ts`
- `lib/utils/lesson-engagement.ts`

**Diff:** add `lib/utils/safe-path.ts` with the `safeResolveInside`
helper (see the file in the monorepo after this commit), then
replace `path.join(BASE, …)` with `safeResolveInside(BASE, …)` at
every affected call site. Treat `null` return as file-not-found
(existing catch paths already return null for `ENOENT`, so the
handling is symmetric).

### [B-046] `with-auth.ts` XFF-leftmost logger IP — **LOW**

**Applies to:** `mental-health-education-platform` (DWA source).
Same file: `lib/api/with-auth.ts`.

**Diff:** import `getClientIp` from `@/lib/security` and replace the
two inline `x-forwarded-for.split(',')[0]` extractions with
`getClientIp(request)`. No other change.

### Not-for-backport from slice 02

- `apps/dwa/lib/ai/fetch-helpers.ts` — only used under `_archive/`,
  so no live exposure. Flagged for deletion in a follow-up sweep.
- `mockProfileRepository` prototype-pollution vector — dev-mode
  only; not shipped to prod.
- RAG embeddings not userId-scoped — table holds platform content,
  not per-user data.
- `flarum.ts:460` userId-in-token fallback — userId is session-sourced,
  not attacker-controlled.

### GTM source — slice 02 scope

GTM is a marketing app; no lesson/assessment filesystem layer, so
B-045 does not apply. Check `customer-acquisition-academy-vps` for:

- `lib/security.ts` mock-auth guard shape — if it uses the dual
  `NODE_ENV && VERCEL_ENV` compound, apply the B-044 fix there too.
- Logger IP extraction in any `with-auth`-equivalent — should already
  be using `getClientIp`. Spot-checked: it is.

---

## Audit sweep — slice 03 (2026-04-24, DWA components + hooks + types + specs)

Three defense-in-depth + hygiene fixes applied here land upstream in
both source repos (DWA and GTM), because both repos carry identical
copies of the affected Mosaic-derived component files.

### [B-047] `realtime-chart.tsx` `.innerHTML = …` → `.textContent` — **LOW**

**Applies to:** both `mental-health-education-platform` and
`customer-acquisition-academy-vps` sources. File: `components/charts/realtime-chart.tsx`.

**Diff:** two substitutions, lines 123 and 131:
```diff
-      chartValue.current.innerHTML = currentValue.toString()
+      chartValue.current.textContent = currentValue.toString()
...
-      chartDeviation.current.innerHTML = `${diff > 0 ? '+' : ''}${diff.toFixed(2)}%`
+      chartDeviation.current.textContent = `${diff > 0 ? '+' : ''}${diff.toFixed(2)}%`
```

No XSS today because the dataset values are numeric, but
`.textContent` makes the invariant explicit. Applied to both
upstream repos in this sweep.

### [B-048] `components/ui/sidebar.tsx` missing useEffect deps — **LOW**

**Applies to:** both source repos. File: `components/ui/sidebar.tsx`.

**Diff:** add `[sidebarOpen, setSidebarOpen]` as the dependency array
for the two `useEffect` blocks that register the outside-click and
escape-key listeners. Currently they re-register listeners on every
render. Applied to both upstream repos in this sweep.

### [line-chart-09 name drift] copy-paste cleanup — **INFO**

**Applies to:** both source repos. File: `components/charts/line-chart-09.tsx`.

**Diff:** rename `LineChart08Props` → `LineChart09Props` and
`export default function LineChart08` → `LineChart09` inside the
`line-chart-09.tsx` file. Default-export callers are unaffected
(the imported binding's name doesn't come from the declaration).
Applied to both upstream repos in this sweep.

### [spec drift] `specs/auth.md` — **INFO**

**Applies to:** `mental-health-education-platform` (DWA source has
`specs/`; GTM source does not).

`specs/auth.md` still documented the pre-B-043 enumeration-vulnerable
behavior (`"Email already used" | 400`). Rewritten to describe the
current no-enumeration invariant. Copied byte-for-byte to the source
repo.

### Not-for-backport from slice 03

- `components/charts/realtime-chart.tsx` innerHTML finding is only
  worth B-047 treatment at the component boundary; the equivalent
  pattern does not recur across the slice 03 surface.
- The other slice 03 INFOs (`any[]` widening in
  `components/ui/sidebar.tsx`, hardcoded mailto in
  `forms/demo-request-form.tsx`, Ref-based PWA scope) are
  documentation/hygiene observations — no code change.

---

## Audit sweep — slice 04 (2026-04-24, DWA services/forum/scripts/docker/public/e2e/configs)

GTM source is not affected by slice 04 findings — it has no
`services/`, no `docker/minio-compose.yml`, no
`deploy-classifier*.sh`, and the MDX lesson/forum wiring that
slice 04 touched are DWA-specific. DWA source (`mental-health-education-platform`)
carries every file with a slice 04 finding, except for the two
stale monorepo-only build files (B-053). All DWA backports were
applied in this sweep (not pending).

### [B-049] CRITICAL — plaintext root SSH password in committed scripts + runbook

**Applies to:** `mental-health-education-platform`.

**Files (source-repo paths):**
- `deploy-classifier.sh`
- `deploy-classifier-with-model.sh`
- `services/maia/DOKPLOY_DEPLOYMENT.md:73`

**Diff shape:** rewrite both scripts to require
`$CLASSIFIER_SSH_HOST` from env, drop `sshpass -p <literal>`, drop
`-o StrictHostKeyChecking=no`, switch the systemd unit's
`User=root` to `User=distress-classifier` (with a `useradd`
block). Scrub the `SSH into VPS` snippet in the MAIA guide to a
plain `ssh "$CLASSIFIER_SSH_HOST"` with a paragraph explaining
the rotation requirement. All three files now match the monorepo
byte-for-byte.

**Mike's follow-ups (out of sweep, required regardless of repo
access level):**
1. Rotate `root@46.202.88.248` password. The leaked value should be
   treated as compromised — it's in git history on both the
   monorepo and the DWA source repo, and the DWA source had a
   public-ish lifetime when the platform was in the standalone-repo
   phase.
2. Set `PasswordAuthentication no` in the VPS's `sshd_config` so the
   rotation is the last one. SSH key auth only, going forward.
3. Consider a `git filter-repo` rewrite of both repos to remove the
   plaintext from history. Even after rotation, keeping the
   credential in `git log` looks bad in any sort of security
   review.

### [B-050] HIGH — classifier port exposed on host interface

**Applies to:** `mental-health-education-platform`.

**Files:**
- `services/distress-classifier/docker-compose-dokploy.yml`
- `services/distress-classifier/docker-compose.yml`
- `services/maia/docker-compose-dokploy.yml`
- `services/maia/docker-compose.yml`

**Diff shape:**
- Dokploy compose (overlay-reachable): `ports: - "8001:8001"` →
  `expose: - "8001"`. Traffic flows over the `dokploy-network`
  overlay by service-DNS name (`http://maia:8001`,
  `http://distress-classifier:8001`).
- Local dev compose: `ports: - "8001:8001"` →
  `ports: - "127.0.0.1:8001:8001"`. Next.js app on the dev host
  still reaches via loopback; LAN does not.

All four files applied in the DWA source repo in this sweep.

### [B-051] MEDIUM — MinIO default `minioadmin/minioadmin` + host-wide ports

**Applies to:** `mental-health-education-platform`.

**File:** `docker/minio-compose.yml`.

**Diff shape:**
- `${VAR:-minioadmin}` → `${VAR:?message}` (fail-fast if unset).
- `ports: ["9000:9000", "9001:9001"]` → bound to 127.0.0.1.

### [B-052] MEDIUM — `:latest` Docker tags pinned

**Applies to:** `mental-health-education-platform`.

**Files:**
- `forum/Dockerfile`: `FROM crazymax/flarum:latest` → `FROM crazymax/flarum:1.8.9`.
- `docker/minio-compose.yml`: `image: minio/minio:latest` →
  `image: minio/minio:RELEASE.2025-01-20T14-49-07Z`.

### [B-054] LOW — Dockerfile conditional COPY syntax

**Applies to:** `mental-health-education-platform`.

**File:** `services/distress-classifier/Dockerfile`.

**Diff shape:** replace
`COPY model/ ./model/ 2>/dev/null || true` +
`COPY metrics.json ./ 2>/dev/null || true` with plain
`COPY model/ ./model/` + `COPY metrics.json ./`. The shell
redirection syntax does not work in Dockerfile COPY; the old
pattern was a silent no-op that only worked because the paths
always existed in-tree. App code already has a HuggingFace
fallback if `./model/` is absent at runtime.

### [B-055] LOW — E2E test drift after B-042

**Applies to:** `mental-health-education-platform`.

**File:** `e2e/api.spec.ts`.

**Diff shape:** replace the `?key=wrong-key` tests with
header-based tests (Authorization: Bearer wrong-key → 403) and
add a regression guard that `?key=anything` still returns 403.
The old test passed after B-042 for the wrong reason.

### [B-056] INFO — unused import

**Applies to:** `mental-health-education-platform`.

**File:** `scripts/docker-entrypoint.js`.

**Diff:** drop the unused `const { execSync } = require('child_process')`.

### [B-057] CRITICAL — second leaked root SSH password in legacy lesson-content guide

**Applies to:** `mental-health-education-platform`.

**File:** `docs/reference/legacy-lesson-guides/LESSON-1-1-EXECUTION-PLAN.md:665,669`.

**Diff shape:** replace `sshpass -p '<literal>' scp …` / `ssh …`
with plain `scp` / `ssh` and a paragraph explaining that the
committed password must be rotated.

Scope note: this file was excluded from slice 04's nominal scope
(`*/docs/*` was on the `!-path` filter list in the prompt's find
command). It was surfaced by a full-tree credential sweep after
fixing B-049; applying the fix immediately was the lower-risk
choice compared to waiting for a later slice to hit `docs/`.

### Not-for-backport from slice 04

- **B-053** (stale `apps/dwa/Dockerfile` + `nixpacks.toml`) is
  monorepo-only. The DWA source repo's `Dockerfile` + `nixpacks.toml`
  at its root are the live build configs for the standalone app;
  they must stay.
- **B-058** (GH Actions `StrictHostKeyChecking=no`) is tracked but
  not auto-remediated — fix requires wiring a `KNOWN_HOSTS`
  secret, which is a separate operator task. The workflow lives
  at `apps/dwa/.github/workflows/deploy-classifier.yml` in the
  monorepo (and at `.github/workflows/deploy-classifier.yml` in
  the DWA source repo). Apply the same fix in both when done.

### GTM source — slice 04 scope

`customer-acquisition-academy-vps` does not carry `services/`,
`docker/minio-compose.yml`, `deploy-classifier*.sh`, or the MDX
lesson-content layer touched by slice 04. No GTM backports from
this slice. Spot-checked:
- No `sshpass -p` in the GTM source tree.
- No `FROM crazymax/flarum` or `minio/minio` references.
- No `services/` tree (GTM is marketing, not platform).

---

## Sweep 2026-04-24 — bug-patterns.md cross-codebase grep

A full sweep of B-001..B-058 against the monorepo turned up 9 NEW
true positives + 1 adjacent class (B-059, listener accumulation).
All applied in the monorepo and then backported to source repos in
the same session. Per-source-repo per-fix status below.

### DWA source (`mental-health-education-platform-main`)

| Bug | File | Status |
|---|---|---|
| B-040 | `app/(provider)/provider/patients/[patientId]/page.tsx:35` | **Backported** — added `eq(providerPatient.status, 'active')` to gate PHI on active link only |

Applied; `tsc --noEmit` introduces no new errors.

**B-002 also backported (2026-04-25):**
`app/(marketing)/for-employers/page.tsx:248` — switched the outer
quotes to double, escaped the inner apostrophe properly. Same
one-line shape that landed in the monorepo at commit 1a61f64. The
typecheck cascade (7 errors from a single unterminated string
literal) is gone; remaining errors in the source-repo typecheck
are pre-existing (next.js image-module declarations + a separate
`docs/stellar-next/` site tree that doesn't share the tsconfig).

### GTM source (`customer-acquisition-academy-vps`, lives at `/Volumes/ext-data/github/GTM-OS/customer-acquisition-academy-vps/`)

| Bug | File | Status |
|---|---|---|
| B-028 | `lib/repositories/masterDataRepositoryFactory.ts` | **Backported** — wrap module-init switch in `getMasterDataRepository()` with `NODE_ENV==='production'` throw on mock |
| B-028 | `app/api/onboarding/analyze/route.ts:233` | **Backported** — guard `isMockMode && NODE_ENV==='production'` → `AppError 500 (MOCK_AUTH_IN_PROD)` before `createMockAssessment` runs (also imports `AppError` from `@/lib/api/errors`) |
| B-041 | `apps/forms/app/api/forms/submit/route.ts:41` | **Backported** — switched rate-limit IP from `xff.split(',')[0]` to `x-real-ip ‖ xff.split(',').at(-1)` |
| B-043 | `app/api/auth/signup/route.ts:79` | **Backported** — uniform 200 envelope on duplicate email; argon2 hash unconditional; no Lucia session created on duplicate path |
| B-045 | `lib/lessons.ts:122-145` | **Backported** — `startsWith` now uses `path.sep` to defend against `<CONTENT_PATH>_evil/` prefix-match edge case |
| B-047 | `components/charts/realtime-chart.tsx:123, 131` | **Already backported** in prior sweep (file already had `.textContent`) |
| B-048 | `components/ui/sidebar.tsx:32, 43` | **Already backported** in prior sweep (deps array already in place) |
| B-052 | `scripts/openclaw/docker-compose.yml:14` | **Backported** — pinned `:latest` → `:v2026.4.23` (current stable per `gh api /repos/openclaw/openclaw/releases`) |
| B-059 | `components/docs/ui/docs-secondary-nav.tsx` | **Backported** — refactored scroll listener attach into `useEffect` body with cleanup |

`tsc --noEmit` introduces no new errors from these backports.
Pre-existing B-004 next-env.d.ts module declaration errors are
unrelated (run `next build` once or write the standard
`/// <reference types="next" />` boilerplate to clear).

### Not backported from sweep 2026-04-24

- **B-053** monorepo-only (deletion of stale per-app `Dockerfile`).
  Source repos are standalone; their per-repo Dockerfile IS the
  live build path. Do not delete.
- **B-058** still requires `KNOWN_HOSTS` secret + SSH-key auth setup
  out-of-band. Same workflow lives at
  `apps/dwa/.github/workflows/deploy-classifier.yml` in monorepo and
  at the DWA source repo's `.github/workflows/deploy-classifier.yml`.
  Both copies still carry `sshpass` + `StrictHostKeyChecking=no`.
