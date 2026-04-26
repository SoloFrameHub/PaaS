# Deployment Environment Variables — `apps/gtm` & `apps/dwa`

First-deploy reference for Dokploy's Environment tab. Paired with the monorepo `Dockerfile` (root) and the app-per-vertical model described in the Implementation Blueprint §8 and ADR-0012. Every "required" row below cites a specific `file:line` so you can audit before pasting.

All entries derived from `grep -rnE "process\.env\.[A-Z_][A-Z0-9_]*"` across `app/`, `lib/`, `components/`, `middleware.ts`/`proxy.ts`, and `next.config.js` — test files and `_archive/` excluded. Runtime defaults set by the Dockerfile (`NODE_ENV`, `PORT`, `HOSTNAME`, `NEXT_TELEMETRY_DISABLED`) don't need to be set in Dokploy.

---

## `apps/dwa` (Digital Wellness Academy)

| Var | Required? | Purpose | Notes |
|---|---|---|---|
| `DATABASE_URL` | **required** | Postgres connection for Lucia sessions, profiles, RAG vectors. | Guarded at `apps/dwa/app/api/auth/signin/route.ts:10`, `signup/route.ts:11`, `signout/route.ts:6`; read at `apps/dwa/lib/db/index.ts:16`. Without it, all auth routes return stub 200s and the app is effectively read-only. |
| `NEXT_PUBLIC_APP_URL` | **required** | Public base URL — used for cookie `secure` derivation, OpenRouter `HTTP-Referer`, and absolute links. | `apps/dwa/lib/utils.ts:36`, `lib/ai/client.ts:18`, `lib/auth-lucia.ts:40`. Health check reports `MISSING` if unset. |
| `OPENAI_API_KEY` or `OPENROUTER_API_KEY` | **required** (one of) | LLM + embeddings for coach chat, RAG, MAIA. | `apps/dwa/lib/ai/client.ts:12,23,27,35`, `lib/ai/rag.ts:21`. `hasAIKey` returns false if neither set; chat routes degrade. OpenRouter preferred when both set. |
| `ADMIN_API_SECRET` | **required** (for admin/cron) | Bearer auth for `/api/health/ai` and cron purge. | `apps/dwa/app/api/health/ai/route.ts:12`, `cron/purge-deleted-accounts/route.ts:27`. |
| `REDIS_URL` | recommended | Rate limits, session cache, idempotency. | `apps/dwa/lib/redis.ts:4`. Falls back to no-op client if unset (logged); rate limiting effectively disabled. |
| `MAIA_URL` (alias `DISTRESS_CLASSIFIER_URL`) | recommended | Mental-health distress classifier sidecar. | `apps/dwa/lib/ai/maia-client.ts:26,32-34`. In production without it, maia calls fall back to `http://localhost:8001` — will fail in Swarm. Code warns when unset on prod non-Vercel. |
| `DATABASE_POOL_SIZE` | optional | Overrides pg pool `max` (default 20 prod / 10 dev). | `apps/dwa/lib/db/index.ts:21`. |
| `REDIS_ENABLED` | optional | Set `false` to disable Redis even when `REDIS_URL` is set. | `apps/dwa/lib/redis.ts:5`. |
| `N8N_URL`, `N8N_API_KEY` | optional | Demo-request + admin user-create webhooks. | `apps/dwa/app/api/demo-request/route.ts:20,26`, `api/admin/create-demo-user/route.ts:29`. |
| `CRON_SECRET` | optional | Separate secret for cron (else falls back to `ADMIN_API_SECRET`). | `apps/dwa/app/api/cron/purge-deleted-accounts/route.ts:27`. |
| `FLARUM_URL`, `FLARUM_PUBLIC_URL`, `FLARUM_API_KEY` | optional | Forum integration. | `apps/dwa/lib/flarum.ts:193-196`. Defaults to `http://localhost:8080` — unusable in prod unless set. |
| `S3_ENDPOINT` / `R2_ENDPOINT`, `S3_BUCKET` / `R2_BUCKET`, `S3_ACCESS_KEY_ID` / `AWS_ACCESS_KEY_ID` / `R2_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` / `AWS_SECRET_ACCESS_KEY` / `R2_SECRET_ACCESS_KEY`, `S3_REGION` / `AWS_REGION`, `S3_PUBLIC_URL` / `R2_PUBLIC_URL` | optional | Object storage (uploads, recordings). | `apps/dwa/lib/storage/s3.ts:8-16,57`. Region defaults to `auto`. |
| `OPENAI_TTS_VOICE` | optional | TTS voice name. Default `alloy`. | `apps/dwa/lib/services/voiceService.ts:18`. |
| `AI_MODEL_COACHING` | optional | Override default coaching model. | Reported by health route; reads elsewhere in AI pipeline. |
| `NEXT_PUBLIC_MOCK_AUTH` | optional | Dev-only mock auth. **Must NOT be `true` in production** — `apps/dwa/lib/auth.ts:58` throws if both set. | Leave unset in Dokploy. |
| `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_VERSION` | optional | Logger service/version labels. | `apps/dwa/lib/logger.ts:89-90`. |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID`, `NEXT_PUBLIC_UMAMI_URL` | optional | Client-side analytics script. | `apps/dwa/components/analytics/umami-script.tsx:17-18`. |
| `ANALYZE` | optional | Build-time only (`=true` enables `@next/bundle-analyzer`). | `apps/dwa/next.config.js:104`. |

---

## `apps/gtm` (Go-To-Market OS)

| Var | Required? | Purpose | Notes |
|---|---|---|---|
| `DATABASE_URL` | **required** | Postgres for Lucia sessions, profiles, forms, book search. | Guarded at `apps/gtm/app/api/auth/signin/route.ts:14`, `signup/route.ts:22`, `signout/route.ts:6`, `reset-password/route.ts:9`, `reset-password/confirm/route.ts:10`; read at `apps/gtm/lib/db/index.ts:10`, `app/api/book/search/route.ts:12`. |
| `TENANT_ROOT_DOMAINS` | **required** | Comma-separated root domains for subdomain-tenant resolution in edge middleware. | `apps/gtm/middleware.ts:10`. Without it, no subdomain is ever resolved to a tenant. |
| `NEXT_PUBLIC_APP_URL` | **required** | Public base URL — cookie secure flag, Notion OAuth redirect, absolute email links. | `apps/gtm/lib/utils.ts:36`, `lib/auth-lucia.ts:38`, `lib/notion/client.ts:19`, `app/api/notion/callback/route.ts:6`. |
| `ADMIN_API_SECRET` | **required** (for admin routes) | Bearer auth for admin forms pages + internal persona-respond. | `apps/gtm/lib/api/admin-auth.ts:4`, `app/(default)/dashboard/admin/forms/page.tsx:18`, `app/api/internal/persona-respond/route.ts:6`. |
| `ADMIN_EMAILS` | **required** (for admin UI) | Comma-separated emails that can view `/dashboard/admin/forms`. | `apps/gtm/app/(default)/dashboard/admin/forms/page.tsx:13`, `[id]/page.tsx:17`. |
| `ENCRYPTION_KEY` | **required** (if using Notion tokens / encrypted columns) | Hex key for AES-GCM at rest. | `apps/gtm/lib/utils/encryption.ts:13`. Code throws if missing at call-time. |
| `POLAR_ACCESS_TOKEN`, `POLAR_SUCCESS_URL` | **required** (for checkout) | Polar SDK bootstrap. Non-null-asserted. | `apps/gtm/app/api/checkout/route.ts:4-5`. Request crashes if unset. |
| `OPENAI_API_KEY` *or* `ANTHROPIC_API_KEY` *or* `OPENROUTER_API_KEY` | **required** (one of) | LLM for AI chat, onboarding, ICP validation. | `apps/gtm/lib/ai/client.ts:22-23,28,39,47,55`. `AI_PROVIDER` explicit override also read. |
| `REDIS_URL` | recommended | Rate limits, caches. | `apps/gtm/lib/redis.ts:4`. Defaults to `redis://localhost:6379` — will fail in Swarm unless set. |
| `RESEND_API_KEY` | recommended | Transactional email (readiness follow-ups, digest). | `apps/gtm/lib/email/resend.ts:8`. Code returns a no-op sender if unset. |
| `POLAR_MODE` | recommended | `sandbox` or `production`. Defaults `sandbox`. | `apps/gtm/app/api/checkout/route.ts:6`. |
| `POLAR_WEBHOOK_SECRET`, `ATTIO_WEBHOOK_SECRET`, `NODEBB_WEBHOOK_SECRET` | recommended (per integration) | HMAC verification for incoming webhooks. | `apps/gtm/app/api/webhook/polar/route.ts:11`, `webhook/attio/route.ts:14`, `api/webhooks/nodebb/route.ts:9`. |
| `NEXT_PUBLIC_POLAR_MONTHLY_ID`, `NEXT_PUBLIC_POLAR_ANNUAL_ID`, `NEXT_PUBLIC_POLAR_BOOK_PRODUCT_ID` | recommended | Product IDs rendered in plan/book UI. | `apps/gtm/app/(default)/settings/plans/plans-panel.tsx:8-9`, `components/book/buy-book-button.tsx:5`, `book-paywall.tsx:89`, `api/webhook/polar/route.ts:8`. |
| `NODEBB_URL`, `NODEBB_API_KEY`, `NODEBB_ADMIN_UID`, `NODEBB_PODS_PARENT_CID`, `FACILITATOR_BOT_UID` | recommended (community) | Forum/pods/facilitator bot integration. | `apps/gtm/lib/nodebb/client.ts:22,26,35`, `lib/services/podService.ts:22,30`, `facilitatorService.ts:34`, `personaService.ts:31`. |
| `NEXT_PUBLIC_FORUM_URL` | recommended | Public forum link used in sidebar/pods. Defaults to `https://ai-caa-forum.soloframehub.com`. | `apps/gtm/lib/services/communityService.ts:9`, `components/ui/sidebar.tsx:384`. |
| `BADGR_BASE_URL`, `BADGR_ISSUER_ID`, `BADGR_BADGE_EN_ID`, `BADGR_BADGE_ES_ID`, `BADGR_USERNAME`, `BADGR_PASSWORD` | optional | Open Badges issuer. | `apps/gtm/lib/badgr/client.ts:16-19,41-42`. No-op if IDs blank. |
| `N8N_FORM_WEBHOOK_URL` | optional | Forms submission relay. | `apps/gtm/lib/forms/workflows.ts:76`. |
| `LISTMONK_API_URL` / `LISTMONK_URL`, `LISTMONK_API_USER` / `LISTMONK_ADMIN_USERNAME`, `LISTMONK_API_PASS` / `LISTMONK_ADMIN_PASSWORD`, `LISTMONK_DEFAULT_LIST_ID` | optional | Listmonk mailing list subscribe. | `apps/gtm/lib/forms/workflows.ts:125-132`. |
| `NOTION_CLIENT_ID`, `NOTION_CLIENT_SECRET` | optional | Notion OAuth. | `apps/gtm/lib/notion/client.ts:13,16`. |
| `GA4_MEASUREMENT_ID`, `GA4_API_SECRET` | optional | Server-side GA4 Measurement Protocol. | `apps/gtm/lib/analytics/ga4-server.ts:10-11`. |
| `BETA_EMAILS` | optional | Signup whitelist (comma list). | `apps/gtm/app/api/auth/signup/route.ts:15`. |
| `OPEN_ACCESS` | optional | Set `true` to bypass subscription checks. | `apps/gtm/lib/auth.ts:85`. |
| `AI_PROVIDER` | optional | Force provider (`anthropic`/`openrouter`/`openai`). | `apps/gtm/lib/ai/client.ts:19`. |
| `OPENAI_TTS_VOICE` | optional | TTS voice. Default `alloy`. | `apps/gtm/lib/services/voiceService.ts:19`. |
| `S3_*` / `R2_*` / `AWS_*` | optional | Object storage (same schema as dwa). | `apps/gtm/lib/storage/s3.ts:8-16,57`. |
| `NEXT_PUBLIC_MOCK_AUTH` | optional | Dev-only. Test-only route guards against production use. | `apps/gtm/app/api/test/setup-profile/route.ts:13`. Leave unset in Dokploy. |
| `NEXT_PUBLIC_METABASE_URL`, `NEXT_PUBLIC_UMAMI_WEBSITE_ID`, `NEXT_PUBLIC_UMAMI_URL` | optional | Embedded analytics dashboards. | `apps/gtm/app/(default)/analytics/page.tsx:6`, `components/analytics/umami-script.tsx:17-18`. |
| `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_VERSION` | optional | Logger labels. | `apps/gtm/lib/logger.ts:57-58`. |
| `NEXT_PUBLIC_RATE_COP`, `NEXT_PUBLIC_RATE_MXN`, `NEXT_PUBLIC_RATE_CLP` | optional | FX rate overrides. | `apps/gtm/lib/data/currency-config.ts:27-29`. |
| `ANALYZE` | optional | Build-time bundle analyzer. | `apps/gtm/next.config.js:116`. |

---

## Platform-wide vars (set identically on both apps)

Derived from `packages/tenancy`, `packages/identity`, and `packages/manifest-loader`. These are not referenced from app source directly — they flow through workspace packages the Next bundle imports.

| Var | Required? | Purpose | Notes |
|---|---|---|---|
| `DATABASE_URL` (or `PLATFORM_DATABASE_URL`) | **required** | Tenant rows, identity sessions. Both apps share one Postgres. | `packages/tenancy/src/internal/db.ts:22` — `PLATFORM_DATABASE_URL` wins if set, else `DATABASE_URL`. |
| `TENANT_ROOT_DOMAINS` | **required** | Comma-separated roots for subdomain-slug resolution (e.g. `soloframehub.com,ai-solo-gtm-os.soloframehub.com`). | `apps/gtm/middleware.ts:10`, `apps/dwa/proxy.ts:5`. |
| `NEXT_PUBLIC_APP_URL` | **required** | Used by `isSecureCookieContext` to derive cookie `secure` flag. | `packages/identity/src/createLuciaInstance.ts:69-73`. |
| `PLATFORM_DATABASE_POOL_SIZE` | optional | Tenant resolver pool `max`. Default 20. | `packages/tenancy/src/internal/db.ts:28`. |
| `TENANT_RESOLVER_TTL_MS` | optional | In-process tenant-row cache TTL. Default 60 000 ms. | `packages/tenancy/src/resolveTenant.ts:51`. |
| `MANIFEST_VERTICAL_ROOT` | optional | Directory for vertical manifest loading. Defaults to `<cwd>/verticals`. | `packages/manifest-loader/src/loader.ts:179`. |
| `NODE_ENV=production` | set by Dockerfile | — | `Dockerfile:65,81`. |
| `NEXT_TELEMETRY_DISABLED=1` | set by Dockerfile | — | `Dockerfile:64,82`. |
| `PORT=3000`, `HOSTNAME=0.0.0.0` | set by Dockerfile | — | `Dockerfile:83-84`. |

---

## Dokploy internal networking

Dokploy apps deployed to the same project share a Docker Swarm overlay network. You reach sibling services by their service name, not by public hostname. For this deployment, Postgres runs as Dokploy service `postgres-primary` (see `infra/dokploy/state.json` — `postgresId: 7WxLR0C38J18q1RqAeU5s`, `postgresName: postgres-primary`, database `solofame`, user `app_user`). Redis runs as `redis-primary`.

Set `DATABASE_URL` on both gtm and dwa to:

```
postgres://app_user:${SOLOFAME_POSTGRES_PASSWORD}@postgres-primary:5432/solofame
```

Set `REDIS_URL` to:

```
redis://:${SOLOFAME_REDIS_PASSWORD}@redis-primary:6379
```

(Adjust the credential vars to whatever you named them in Dokploy's Environment tab — they're substituted at deploy time, not runtime.) Do **not** use `localhost`, a public hostname, or an sslip.io domain; the Swarm DNS resolver handles sibling lookups directly.

---

## First-deploy checklist

1. `git push origin main` — the branch Dokploy is tracking. The `Dockerfile` in the repo root handles both apps via the `APP` build-arg (`apps/gtm` / `apps/dwa`).
2. Run `tools/dokploy/provision-03-apps.sh` to create/update the two applications, wire the Dockerfile build type, and pass `APP=gtm`/`APP=dwa` as the build-arg. Confirm both appear in the Dokploy UI.
3. In Dokploy's Environment tab for **each** app, paste the required + recommended vars from the table above. Use the `postgres-primary:5432` / `redis-primary:6379` service names for `DATABASE_URL` / `REDIS_URL`. Save.
4. Trigger a deploy per app (UI or CLI). Watch logs — the first successful boot logs `db_pool_initialized` (dwa) and no `DATABASE_URL not set` warnings.
5. Run the schema migrations against `postgres-primary` (drizzle-kit or the migrations listed in `infra/dokploy/migrations-applied.json`), then seed the first tenant with `pnpm tsx tools/tenancy/seed-tenant.ts` — this inserts the row that `TENANT_ROOT_DOMAINS` + `resolveTenant` look up.
6. Attach domains in Dokploy (e.g. `ai-solo-gtm-os.soloframehub.com` → gtm, `digital-wellness-academy.soloframehub.com` → dwa) and let Traefik issue certs. Update `NEXT_PUBLIC_APP_URL` on each app to its HTTPS domain and redeploy so the cookie `secure` flag flips on.
7. Smoke-test: `GET /api/health` on dwa returns 200 with `openai_key: set` / `redis_url: set`; `GET /` on each domain renders; signup → signin round-trip works against Postgres.
