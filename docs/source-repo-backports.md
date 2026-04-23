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
- **B-007, B-008, B-009**: monorepo hygiene only.
