# Architecture, Configuration & Deployment

**Depth: [SOLID]** — Config files documented, env vars inventoried, deployment path clear. Needs deepening: CSP policy details, bundle analysis results, PWA manifest gap.

---

## System Architecture

```
                    ┌─────────────────────────────────┐
                    │         Dokploy (Docker)         │
                    │    auto-deploys on push to main  │
                    └────────────────┬────────────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
    ┌─────────▼──────────┐  ┌───────▼────────┐  ┌─────────▼──────────┐
    │   Next.js 16 App   │  │   PostgreSQL   │  │   Redis (optional) │
    │   (Node 20 Alpine) │  │   (Managed)    │  │   (disabled by     │
    │   Port 3000        │  │   Drizzle ORM  │  │    default)        │
    └────────┬───────────┘  └────────────────┘  └────────────────────┘
             │
    ┌────────┼──────────────────────────────┐
    │        │                              │
    │  ┌─────▼───────────┐  ┌──────────────▼──────────────┐
    │  │ Maia Classifier  │  │ External Services            │
    │  │ (FastAPI Python)  │  │ - OpenRouter/OpenAI (LLMs)  │
    │  │ DistilBERT 255MB │  │ - Flarum (forum)            │
    │  │ Port 8001        │  │ - NPPES (NPI verification)  │
    │  │ CPU-only         │  │ - S3/R2 (object storage)    │
    │  │ 3s timeout       │  │ - Polar.sh (payments)       │
    │  └──────────────────┘  │ - Umami (analytics)         │
    │                        └─────────────────────────────┘
    │
    │  ┌───────────────────────────────────────┐
    │  │ Client Layer                           │
    │  │ - React 19 + Tailwind 4               │
    │  │ - TanStack React Query                │
    │  │ - next-themes (dark mode)             │
    │  │ - Framer Motion (animations)          │
    │  │ - Service Worker (PWA, cache-first)   │
    │  └───────────────────────────────────────┘
    │
```

---

## Docker Configuration

### Next.js App (`/Dockerfile`)
- **Base:** `node:20-alpine`
- **Build:** Two-stage (builder -> runner)
- **Output:** `standalone` (optimized for Docker)
- **Entrypoint:** `/scripts/docker-entrypoint.js` (runs Drizzle migrations, then starts server)
- **User:** `nextjs:nextjs` (UID 1001, non-root)
- **Port:** 3000
- **Healthcheck:** `GET /api/health` (30s interval, 10s timeout, 3 retries)
- **Includes at runtime:** `/app/server/` (course content, quizzes)

### Distress Classifier (`/services/distress-classifier/Dockerfile`)
- **Base:** `python:3.11-slim`
- **Runtime:** uvicorn + FastAPI
- **User:** `classifier` (UID 1001, non-root)
- **Port:** 8001
- **Healthcheck:** `curl -f http://localhost:8001/health`
- **Model:** Loads fine-tuned model from `./model/` if present, else downloads from HuggingFace

### Maia Service (`/services/maia/Dockerfile`)
- Unified classification service (4 classifiers)
- Separate Docker compose for local and Dokploy deployment

### Compose Files
- `/services/distress-classifier/docker-compose.yml` — local dev
- `/services/distress-classifier/docker-compose-dokploy.yml` — production
- `/services/maia/docker-compose.yml` — local dev
- `/services/maia/docker-compose-dokploy.yml` — production

---

## CI/CD

### GitHub Actions
**`/.github/workflows/deploy-classifier.yml`**
- Trigger: manual workflow dispatch with optional `retrain` input
- Deploys to VPS (46.202.88.248) via SSH + sshpass
- Steps: copy code -> create Python venv -> install deps -> create systemd service -> health check
- Installs to `/opt/distress-classifier/`
- Optional: kicks off fine-tuning in background (3-6 hours on CPU)

### Dokploy Auto-Deploy
- Push to `main` triggers rebuild + deploy
- Config in `/apphosting.yaml`: 1 CPU, 1GB RAM, max 10 instances
- Domain: `mental-health-education.soloframehub.com`

---

## Environment Variables [DEEP]

### Core Application
| Variable | Purpose | Required |
|----------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXT_PUBLIC_APP_URL` | Public app URL | Yes |
| `NODE_ENV` | development/production/test | Yes |

### Authentication
| Variable | Purpose | Required |
|----------|---------|----------|
| `ADMIN_API_SECRET` | API authentication secret | No |
| `NEXT_PUBLIC_MOCK_AUTH` | Mock auth for dev/testing (true/false) | No |

### AI/ML Services
| Variable | Purpose | Required |
|----------|---------|----------|
| `OPENROUTER_API_KEY` | Primary LLM routing (multi-provider) | One of these |
| `OPENAI_API_KEY` | Direct OpenAI fallback | One of these |
| `GOOGLE_GENAI_API_KEY` | Google Generative AI | No |
| `MAIA_URL` | Maia classifier service URL | No (default: localhost:8001) |
| `DISTRESS_CLASSIFIER_URL` | FastAPI classifier URL | No |
| `AI_MODEL_COACHING` | Override coaching model | No (default: claude-haiku-4-5) |
| `OPENAI_TTS_VOICE` | TTS voice selection | No |

### Forum
| Variable | Purpose | Required |
|----------|---------|----------|
| `FLARUM_URL` | Flarum base URL | For forum |
| `FLARUM_PUBLIC_URL` | Flarum public URL (avatars) | For forum |
| `FLARUM_API_KEY` | Flarum API authentication | For forum |

### Storage (S3-compatible, fallback chain)
| Variable | Purpose | Notes |
|----------|---------|-------|
| `S3_ACCESS_KEY_ID` / `AWS_ACCESS_KEY_ID` / `R2_ACCESS_KEY_ID` | Access key | Fallback chain |
| `S3_SECRET_ACCESS_KEY` / `AWS_SECRET_ACCESS_KEY` / `R2_SECRET_ACCESS_KEY` | Secret key | Fallback chain |
| `S3_ENDPOINT` / `R2_ENDPOINT` | Endpoint URL | For R2/MinIO |
| `S3_BUCKET` / `R2_BUCKET` | Bucket name | Required for storage |
| `S3_PUBLIC_URL` / `R2_PUBLIC_URL` | CDN serving URL | Optional |
| `S3_REGION` / `AWS_REGION` | Region (default: auto) | Optional |

### Redis
| Variable | Purpose | Required |
|----------|---------|----------|
| `REDIS_URL` | Redis connection URL | No |
| `REDIS_ENABLED` | Enable/disable Redis (default: false) | No |

### Payments (Polar.sh)
| Variable | Purpose | Required |
|----------|---------|----------|
| `POLAR_ACCESS_TOKEN` | Polar API token | For payments |
| `POLAR_WEBHOOK_SECRET` | Webhook verification | For payments |
| `POLAR_MODE` | sandbox/production | For payments |
| `POLAR_SUCCESS_URL` | Post-checkout redirect | For payments |
| `NEXT_PUBLIC_POLAR_MONTHLY_ID` | Monthly plan ID | For payments |
| `NEXT_PUBLIC_POLAR_ANNUAL_ID` | Annual plan ID | For payments |

### Analytics
| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_UMAMI_URL` | Umami analytics URL | No |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami website ID | No |

### Firebase (legacy, still configured)
| Variable | Purpose | Required |
|----------|---------|----------|
| `FIREBASE_PROJECT_ID` | Firebase project | No |
| `FIREBASE_CLIENT_EMAIL` | Service account email | No |
| `FIREBASE_PRIVATE_KEY` | Service account key (SECRET) | No |
| `VERTEX_AI_DATA_STORE_ID` | Vertex AI search | No |
| `VERTEX_AI_PROJECT_ID` | Vertex AI project | No |

### Coolify (alternative deployment, not currently active)
Multiple `COOLIFY_*` env vars for alternative Coolify deployment path. Not in active use.

### Trigger.dev (background jobs, not currently active)
`TRIGGER_API_URL`, `TRIGGER_SECRET_KEY` — configured but not actively used.

---

## Next.js Configuration (`/next.config.js`) [SOLID]

- `output: 'standalone'` — Docker-optimized builds
- **Security headers:**
  - `X-DNS-Prefetch-Control: on`
  - `X-XSS-Protection: 1; mode=block`
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: origin-when-cross-origin`
  - `Content-Security-Policy` — strict defaults (needs documentation of exact policy)
  - `Strict-Transport-Security: max-age=63072000` (production only)
- **Images:** AVIF + WebP, remote patterns for Flarum avatars
- **Server external packages:** `pdf-parse`
- **Experimental:** Server actions body size 10MB
- **Bundle analysis:** Supports `ANALYZE=true` build flag

---

## TypeScript Configuration (`/tsconfig.json`)

- Target: ES2017, Module: ESNext, Strict mode
- JSX: react-jsx
- Path alias: `@/*` -> `./*` (root imports)
- Excluded: `node_modules`, `_archive`, `soloframehub-v2`, `forum`, `tailwind-templates`

---

## Package.json Scripts

| Command | Purpose |
|---------|---------|
| `dev` | `next dev --turbopack` |
| `build` | `next build` (standalone output) |
| `start` | `next start` |
| `lint` | `eslint .` |
| `validate-lessons` | `tsx scripts/validate-curriculum.ts` |
| `test` | `vitest` (unit tests) |
| `test:coverage` | `vitest run --coverage` (v8 provider) |
| `test:e2e` | `playwright test` |
| `test:e2e:ui` | `playwright test --ui` |
| `test:e2e:debug` | `playwright test --debug` |
| `test:all` | Coverage + E2E combined |
| `analyze` | `ANALYZE=true next build` (bundle analysis) |
| `generate:openapi` | OpenAPI 3.0 spec generation |

---

## Testing Configuration [SOLID]

### Vitest (`/vitest.config.ts`)
- Environment: Node, globals enabled
- Coverage: v8 provider, reporters: text + json + html
- Setup: `@testing-library/jest-dom`, cleanup after each test

### Playwright (`/playwright.config.ts`)
- Test directory: `./e2e`
- Base URL: `http://localhost:3111` (test server on separate port)
- Workers: 1 (sequential to avoid race conditions with mock storage)
- Retries: 2 on first failure
- Timeouts: action 15s, navigation 60s, test 90s, expect 10s
- Screenshot + video on failure, trace on first retry
- Web server: builds with `NEXT_PUBLIC_MOCK_AUTH=true`, `REDIS_ENABLED=false`, `NODE_ENV=test`

---

## PWA Configuration [SHALLOW]

### Service Worker (`/public/sw.js`)
- Cache name: `wellness-academy-cache-v3`
- **Never cache:** API calls (`/api/`), auth routes, HTML navigation
- **Network First:** Lesson content (`/academy/`)
- **Cache First:** Static assets (JS, CSS, fonts, images)
- Registration: non-localhost domains only

### Missing
- No `manifest.json` in `/public/` — **PWA installability is not configured**
- No app icons for home screen

---

## Logging & Monitoring [SOLID]

### Structured Logger (`/lib/logger.ts`)
- **Development:** Human-readable console output with timestamps
- **Production:** Google Cloud Logging JSON format (severity: INFO/WARNING/ERROR/DEBUG)
- Error reporting context: service name + version
- Stack traces included for Error objects
- AI token usage logged per task (prompt/completion/total)

### Analytics (`/lib/analytics/umami.ts`)
- Event tracking via `window.umami.track()`
- Events tracked: lesson started/completed, course started/completed, quiz started/completed (with score), coaching session, onboarding steps, assessment generated, forum visited

### Missing
- No APM (Application Performance Monitoring)
- No centralized error tracking (Sentry, etc.)
- Metabase analytics mentioned as "in development" — not yet deployed

---

## Storage Configuration (`/lib/storage/s3.ts`) [SOLID]

Supports 3 providers with fallback chain:
1. **AWS S3** (via `AWS_*` env vars)
2. **Cloudflare R2** (via `R2_*` env vars)
3. **MinIO** (S3-compatible, via `S3_ENDPOINT`)

Functions:
- `uploadBuffer(key, buffer, contentType)` — returns public URL or key
- `hasS3()` — boolean check for configured storage

---

## Redis Configuration (`/lib/redis.ts`) [SOLID]

- Singleton client via ioredis
- Disableable: `REDIS_ENABLED=false`
- Retry: max 3 retries, exponential backoff (max 2s), lazy connection
- Helpers: `getCache<T>(key)`, `setCache(key, value, ttlSeconds=3600)`, `invalidateCache(key)`
- Fallback: in-memory rate limiting when Redis unavailable

---

## Styling & Theme [SHALLOW]

- **Primary:** Indigo palette (primary-500: `#6366F1`)
- **Accent:** Violet, Blue, Green, Teal, Orange, Amber, Purple (per track)
- **Neutrals:** Warm gray (gray-50 through gray-950)
- **Dark mode:** Class-based via next-themes, `dark:` prefix
- **Font:** Inter (Google Fonts, variable)
- **Plugins:** @tailwindcss/forms (base strategy), @tailwindcss/typography
- **Custom variants:** `dark`, `sidebar-expanded`

> **Needs deepening:** Full design token documentation, spacing scale, component design patterns.

---

## Claude Code Configuration (`.claude/`) [SHALLOW]

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Strategic project context (revenue model, priorities, standards) |
| `VISION.md` | Full strategic vision document |
| `COURSE_BUILD_BLUEPRINT.md` | Canonical 5-step course creation process |
| `COURSE_QUALITY_STANDARDS.md` | A+ quality requirements |
| `settings.json` | Claude Code settings (experimental features, permissions) |
| `settings.local.json` | Local overrides |
| `launch.json` | Dev server configs (DWA marketing site on port 3099) |
| `agents/deployer.md` | Deployment verification agent |
| `agents/reviewer.md` | Code review agent |
| Various `*_PROMPT.md` files | Task-specific prompts for course building, testing, analysis |
