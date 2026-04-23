# Migration: Google/Firebase to GitHub + Coolify

This document records the complete migration of SoloFrameHub from a Google/Firebase-dependent stack to a self-hosted, Google-free architecture running on Coolify. The migration was executed over **Feb 4-5, 2026**.

---

## Table of Contents

- [Before & After](#before--after)
- [Migration Timeline](#migration-timeline)
- [Phase 1: Auth & Database](#phase-1-auth--database)
- [Phase 2: AI Layer](#phase-2-ai-layer)
- [Phase 3: Storage](#phase-3-storage)
- [Phase 4: Containerization & Deployment](#phase-4-containerization--deployment)
- [Phase 5: Domain & DNS](#phase-5-domain--dns)
- [Troubleshooting Log](#troubleshooting-log)
- [Environment Variable Changes](#environment-variable-changes)
- [Files Created, Modified, and Removed](#files-created-modified-and-removed)
- [Lessons Learned](#lessons-learned)

---

## Before & After

| Layer | Before (Google) | After (Self-Hosted) |
|-------|-----------------|---------------------|
| **Auth** | Firebase Auth (session cookies via Firebase Admin SDK) | Lucia 3.2 + PostgreSQL (Argon2 password hashing) |
| **Database** | Firestore (NoSQL) | PostgreSQL + Drizzle ORM |
| **AI / LLM** | Google Genkit + Gemini models | OpenAI API (gpt-4o-mini / gpt-4o) |
| **RAG / Search** | Vertex AI Discovery Engine | Removed (pgvector planned) |
| **TTS** | Google Cloud Text-to-Speech | OpenAI TTS |
| **STT** | Google Cloud Speech-to-Text | OpenAI Whisper |
| **Storage** | Firebase Storage | S3-compatible (MinIO on VPS) |
| **Hosting** | Firebase App Hosting | Coolify on Hostinger KVM VPS |
| **CI/CD** | Firebase CLI deploy | Git push → Coolify auto-build via Dockerfile |

---

## Migration Timeline

All commits are on the `main` branch, in chronological order:

| Commit | Description |
|--------|-------------|
| `cd97a63` | Initial Coolify prep: OpenAI coaching, reindex script, health check endpoint, env & deploy docs |
| `394d05f` | **Main migration commit**: Replace Google stack with Lucia/Postgres, OpenAI, S3 (no Genkit/Firebase) |
| `770eded` | Coolify build infrastructure: Dockerfile, nixpacks.toml, .nvmrc, deployment scripts |
| `f3e3a97` | Cleanup and archive deprecated code |
| `2aa11d9` | Fix: upgrade `pg` from v5 to v8 for drizzle-orm compatibility |
| `496ce2d` | Fix: regenerate package-lock.json for clean builds |
| `23ff7ca` | Fix: complete regeneration of package-lock.json |
| `05e123b` | Fix: add @testing-library/dom peer dependency |
| `68f4567` | Fix: use `npm install` instead of `npm ci` in Dockerfile |
| `82ae611` | Fix: archive remaining genkit-related test scripts |
| `929c9bf` | Remove all Google/Firebase/Genkit dependencies from package.json |
| `8b8ff37` | Fix: remove leftover Firebase scripts, marketing site, fix deps |
| `1e2b0d5` | Fix: add `curl` to Docker image for Coolify health checks |
| `9d87251` | Fix: set `HOSTNAME=0.0.0.0` for health check connectivity |
| `03e919f` | Add DB migration to Docker entrypoint (idempotent `CREATE TABLE IF NOT EXISTS`) |
| `efa307c` | Fix: add explicit camelCase schema to assessment prompt (gpt-4o-mini workaround) |
| `135bad1` | Fix: increase assessment timeout 20s → 60s, add explicit JSON schema |
| `a84c1a6` | Fix: fallback founder category when questionnaire value doesn't match seed data |
| `a298300` | Fix: auth redirect flow (signup → onboarding, signin → dashboard) |
| `9ef2ffd` | Fix: S3 env var compatibility and auto-create bucket on first upload |
| `5a1039f` | Make AI assessment prompt founder-specific (uses questionnaire data) |
| `061bf89` | Wire up logout button and add Update Assessment action |
| `71441cb` | Add Community section to sidebar |

---

## Phase 1: Auth & Database

### What changed

**Firebase Auth** was replaced by **Lucia** with a PostgreSQL session store. **Firestore** was replaced by **PostgreSQL** with **Drizzle ORM**.

### New database schema

```sql
-- users table
CREATE TABLE IF NOT EXISTS "user" (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  hashed_password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- sessions table (Lucia)
CREATE TABLE IF NOT EXISTS "session" (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES "user"(id),
  expires_at TIMESTAMPTZ NOT NULL
);

-- profiles (JSONB for flexible founder data)
CREATE TABLE IF NOT EXISTS "profile" (
  user_id TEXT PRIMARY KEY REFERENCES "user"(id),
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- roleplay sessions
CREATE TABLE IF NOT EXISTS "roleplay_session" (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES "user"(id),
  industry_id TEXT,
  role_id TEXT,
  disc_type TEXT,
  transcript JSONB DEFAULT '[]',
  evaluation JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### New files

- `lib/auth-lucia.ts` - Lucia auth setup with Drizzle PostgreSQL adapter
- `lib/auth.ts` - Server session handling (rewritten from Firebase to Lucia)
- `lib/db/index.ts` - PostgreSQL connection via Drizzle
- `lib/db/schema.ts` - Table schema definitions
- `app/api/auth/signin/route.ts` - Email/password login
- `app/api/auth/signup/route.ts` - Registration with Argon2 hashing
- `app/api/auth/signout/route.ts` - Session destruction

### Dual auth mode

For local development without a database, setting `NEXT_PUBLIC_MOCK_AUTH=true` enables a mock session cookie (`mock-token`), useful for E2E testing with Playwright.

### Troubleshooting

- **`pg` v5 incompatible with Drizzle**: Drizzle ORM requires `pg` v8+. Fixed in `2aa11d9` by upgrading.
- **Auth redirect inconsistency**: Signup was redirecting to dashboard instead of onboarding. Fixed in `a298300` to route signup → onboarding, signin → dashboard.

---

## Phase 2: AI Layer

### What changed

**Google Genkit + Gemini** was replaced by the **OpenAI API** (via the `openai` npm package). All AI flows were rewritten as typed TypeScript functions with Zod schema validation.

### Flows replaced

| Flow | Before (Genkit/Gemini) | After (OpenAI) |
|------|------------------------|-----------------|
| Coaching chat | Genkit `chatFlow` | `openai.chat.completions.create()` |
| ICP validation | Genkit `icpValidationFlow` | `openaiIcpValidation()` with Zod schema |
| Sales roleplay | Genkit `roleplayFlow` | OpenAI chat with DISC persona system prompt |
| Roleplay evaluation | Genkit `evaluateFlow` | OpenAI JSON response with scoring |
| Assessment generation | Genkit `assessmentFlow` | Structured JSON output, 60s timeout |
| Document analysis | Genkit + Vertex AI | HTML scraping + OpenAI |
| Text-to-speech | Google Cloud TTS | OpenAI TTS API |
| Speech-to-text | Google Cloud STT | OpenAI Whisper API |

### New files

- `lib/ai/openai-flows.ts` - All OpenAI flow implementations (~454 lines)
- `lib/ai/fetch-helpers.ts` - Website/LinkedIn scraping (replaces Google APIs)
- `app/api/ai/voice/stt/route.ts` - Whisper speech-to-text endpoint
- `app/api/ai/voice/tts/route.ts` - OpenAI TTS endpoint

### Troubleshooting

- **gpt-4o-mini returns snake_case JSON**: Without an explicit example in the prompt, `gpt-4o-mini` returns `snake_case` keys instead of `camelCase`. Fixed in `efa307c` by adding explicit camelCase JSON examples to the system prompt.
- **Assessment generation timeout**: The default 20s timeout was too short for complex structured JSON output. Fixed in `135bad1` by increasing to 60s and `maxTokens` to 3500.
- **Founder category mismatch**: Questionnaire responses like `"technical-founder"` didn't match seed data IDs like `"technical_purist"`. Fixed in `a84c1a6` with a fallback to `"reluctant_seller"`.

---

## Phase 3: Storage

### What changed

**Firebase Storage** was replaced by **S3-compatible storage** using the `@aws-sdk/client-s3` package, with MinIO self-hosted on the VPS.

### New files

- `lib/storage/s3.ts` - S3-compatible upload client with auto-bucket creation

### Configuration

The storage layer supports multiple backends via environment variables:

```env
# MinIO (self-hosted on VPS)
S3_ENDPOINT=http://minio-uw8c0s4480g0ogco8wkgw00g:9000
S3_BUCKET=caa-uploads
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
S3_REGION=us-east-1

# Cloudflare R2 (alternative)
R2_ENDPOINT=https://xxx.r2.cloudflarestorage.com
R2_BUCKET=caa-uploads
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
```

### MinIO on Coolify

MinIO was deployed as a Docker Compose service in Coolify:

- **Service UUID**: `uw8c0s4480g0ogco8wkgw00g`
- **Container name**: `minio-uw8c0s4480g0ogco8wkgw00g`
- **Internal port**: 9000 (API), 9001 (console)
- **Host ports**: 9010:9000, 9011:9001 (port 9000 was taken by Listmonk)
- **Network**: Joins the `coolify` Docker network via `connect_to_docker_network: true`

### Troubleshooting

- **Bucket doesn't exist on first upload**: Fixed in `9ef2ffd` by adding `HeadBucketCommand` check + auto-create via `CreateBucketCommand`.
- **Port conflict**: Host port 9000 was already used by Listmonk. Remapped MinIO to 9010 (API) and 9011 (console).
- **Container naming**: Coolify names service containers as `{app_name}-{service_uuid}`, not just the UUID. The S3 endpoint must use the full container name within the Docker network.

---

## Phase 4: Containerization & Deployment

### What changed

**Firebase App Hosting** was replaced by a **Dockerfile** deploying to **Coolify** on a Hostinger KVM VPS (32GB RAM).

### Dockerfile

Multi-stage build: Node.js 20 Alpine → standalone Next.js output.

Key decisions:
- `output: 'standalone'` in `next.config.js` for minimal Docker image
- `apk add --no-cache curl` for Coolify health checks
- `scripts/docker-entrypoint.js` runs idempotent DB migrations before starting the server
- User `nextjs` (UID 1001) for security

### Coolify configuration

| Setting | Value |
|---------|-------|
| Build pack | Dockerfile |
| Dockerfile location | `Dockerfile` (root) |
| Port | 3000 |
| Health check | GET `/api/health` |
| App UUID | `hc40g0sckkws0wso0s4ks8g4` |

### Services created via Coolify API

| Service | UUID | Internal URL |
|---------|------|--------------|
| PostgreSQL | `mcwwwwogco80cksk8o48wskk` | `postgres://caa_user:...@mcwwwwogco80cksk8o48wskk:5432/caa_academy` |
| Redis | `i8oogw88skcssw084cs408w0` | `redis://default:...@i8oogw88skcssw084cs408w0:6379/0` |
| MinIO | `uw8c0s4480g0ogco8wkgw00g` | `http://minio-uw8c0s4480g0ogco8wkgw00g:9000` |

### Helper scripts created

- `scripts/coolify-create-postgres.ts` - Create PostgreSQL via Coolify API
- `scripts/coolify-create-redis.ts` - Create Redis via Coolify API
- `scripts/coolify-create-minio.ts` - Create MinIO via Coolify API
- `scripts/coolify-set-app-envs.ts` - Set app env vars via Coolify API
- `scripts/coolify-app-env.ts` - List app env vars
- `scripts/coolify-inspect.ts` - Inspect VPS state (servers, projects, deployments)
- `scripts/docker-entrypoint.js` - Container startup with DB migration
- `scripts/db-migrate.ts` - Manual migration script

### Deployment flow

```
Git push to GitHub
  → Coolify detects push (webhook)
  → Builds Docker image from Dockerfile
  → docker-entrypoint.js runs CREATE TABLE IF NOT EXISTS migrations
  → Starts Next.js server (node server.js)
  → Health check passes on /api/health
  → Container marked healthy
```

### Build approach: Nixpacks vs Dockerfile

Initially tried **Nixpacks** (Coolify's default builder). Switched to **Dockerfile** because:

1. Nixpacks had issues with `npm ci` and S3 secrets leaking into build arguments
2. `NIXPACKS_NODE_VERSION` needed to be pinned
3. Dockerfile gave full control over the build process
4. Standalone Next.js output works cleanly with a Dockerfile

### Troubleshooting

- **`npm ci` fails in Dockerfile**: `package-lock.json` was out of sync. Fixed by regenerating it (`23ff7ca`), then switching from `npm ci` to `npm install` in the Dockerfile (`68f4567`).
- **Health check fails - container unreachable**: Coolify health checks run from outside the container. Next.js was binding to `localhost` only. Fixed in `9d87251` by setting `HOSTNAME=0.0.0.0`.
- **Health check fails - no curl**: Alpine base image doesn't include `curl`. Fixed in `1e2b0d5` by adding `apk add --no-cache curl`.
- **DB tables don't exist on first deploy**: The standalone image doesn't include `tsx` or `node_modules`, so you can't run `npx tsx scripts/db-migrate.ts` inside it. Fixed in `03e919f` by adding a JavaScript entrypoint (`scripts/docker-entrypoint.js`) that runs idempotent `CREATE TABLE IF NOT EXISTS` SQL before starting the server.
- **`__NEXT_PRIVATE_STANDALONE_CONFIG` env var**: If set from a previous standalone build, Next.js skips loading `next.config.js` entirely and uses a stale JSON config. Functions like `generateBuildId` and `headers` are silently lost. **Fix**: `unset __NEXT_PRIVATE_STANDALONE_CONFIG` before building.
- **`NODE_ENV=production` skips devDependencies**: Tailwind CSS build tools are in `devDependencies`. When `NODE_ENV=production`, `npm install` skips them. **Fix**: `npm install --include=dev` in the Dockerfile build stage.
- **TypeScript OOM on build**: Subdirectories with their own `package.json`/`tsconfig` (like `soloframehub-v2/`) get scanned by TypeScript's `**/*.ts` glob and cause out-of-memory. **Fix**: Added excludes to `tsconfig.json` for `_archive`, `soloframehub-v2`, `node_modules`.
- **Leftover Firebase/Genkit scripts cause build errors**: TypeScript still compiles files in `scripts/` that imported Firebase/Genkit modules. **Fix**: Deleted the scripts entirely (archiving to `_archive/` wasn't sufficient since TypeScript still found them). Committed in `929c9bf` and `8b8ff37`.

---

## Phase 5: Domain & DNS

### Setup

| Setting | Value |
|---------|-------|
| Domain | `ai-customer-acquisition-academy.soloframehub.com` |
| DNS provider | Cloudflare |
| Record type | A record (not proxied / DNS only) |
| Points to | `46.202.88.248` |
| Coolify config | `domains` field via PATCH API |

### Why not proxied?

Cloudflare proxy was disabled (DNS only / grey cloud) to let Coolify's built-in Traefik handle SSL termination directly. This avoids double-proxy issues and lets Coolify manage Let's Encrypt certificates.

---

## Environment Variable Changes

### Removed

All Google/Firebase/Genkit environment variables:

```env
# Removed
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID
GOOGLE_GENAI_API_KEY
GOOGLE_APPLICATION_CREDENTIALS
VERTEX_AI_LOCATION
VERTEX_AI_PROJECT
NEXT_PUBLIC_FIREBASE_*
```

### Added

```env
# Required
DATABASE_URL=postgres://user:pass@host:5432/dbname
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=https://ai-customer-acquisition-academy.soloframehub.com
NEXT_PUBLIC_MOCK_AUTH=false

# Storage (S3-compatible)
S3_ENDPOINT=http://minio-uw8c0s4480g0ogco8wkgw00g:9000
S3_BUCKET=caa-uploads
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
S3_REGION=us-east-1

# Optional
REDIS_URL=redis://default:pass@host:6379/0
OPENAI_FLOW_MODEL=gpt-4o-mini
COOLIFY_BASE_URL=http://46.202.88.248:8000/api/v1
COOLIFY_API_KEY=...
```

---

## Files Created, Modified, and Removed

### Created

| File | Purpose |
|------|---------|
| `lib/auth-lucia.ts` | Lucia auth with Drizzle PostgreSQL adapter |
| `lib/db/index.ts` | PostgreSQL connection |
| `lib/db/schema.ts` | Drizzle table definitions |
| `lib/ai/openai-flows.ts` | All OpenAI AI flows (replaces Genkit) |
| `lib/ai/fetch-helpers.ts` | Web scraping helpers (replaces Google APIs) |
| `lib/storage/s3.ts` | S3-compatible upload client |
| `app/api/auth/signin/route.ts` | Lucia login endpoint |
| `app/api/auth/signup/route.ts` | Lucia registration endpoint |
| `app/api/auth/signout/route.ts` | Logout endpoint |
| `app/api/health/route.ts` | Health check for Coolify |
| `app/api/ai/voice/stt/route.ts` | OpenAI Whisper STT |
| `app/api/ai/voice/tts/route.ts` | OpenAI TTS |
| `Dockerfile` | Multi-stage Docker build |
| `nixpacks.toml` | Nixpacks config (backup) |
| `.nvmrc` | Node 20 version pin |
| `scripts/docker-entrypoint.js` | Container startup with DB migration |
| `scripts/db-migrate.ts` | Manual migration script |
| `scripts/coolify-create-postgres.ts` | Create PostgreSQL via API |
| `scripts/coolify-create-redis.ts` | Create Redis via API |
| `scripts/coolify-create-minio.ts` | Create MinIO via API |
| `scripts/coolify-set-app-envs.ts` | Set env vars via API |
| `scripts/coolify-app-env.ts` | List env vars |
| `scripts/coolify-inspect.ts` | Inspect VPS state |

### Modified

| File | Change |
|------|--------|
| `lib/auth.ts` | Complete rewrite: Firebase Admin → Lucia sessions |
| `next.config.js` | Updated CSP headers (removed Google, added OpenAI) |
| `package.json` | Replaced all Google/Firebase/Genkit deps with OpenAI, Lucia, Drizzle, S3 |
| `tsconfig.json` | Added excludes for `_archive`, `soloframehub-v2` |
| `app/api/auth/session/route.ts` | Rewritten for Lucia session verification |
| `app/api/onboarding/analyze/route.ts` | OpenAI assessment with 60s timeout |
| `app/api/ai/*/route.ts` | All AI routes rewritten for OpenAI |
| `lib/services/roleplayService.server.ts` | Added founder category fallback |

### Removed / Archived

| File | Reason |
|------|--------|
| `lib/firebase/admin.ts` | Replaced by Lucia (stub left in `_archive/`) |
| `lib/firebase/client.ts` | Replaced by Lucia (stub left in `_archive/`) |
| `scripts/setup-vertex-ai.ts` | No longer using Vertex AI |
| `scripts/seedRoleplayData.ts` | Firestore seeding no longer needed |
| `scripts/test-stt-auth.ts` | Google STT testing no longer needed |
| `genkit-flows/*.ts.bak` | Genkit flow backups |
| `apphosting.yaml` | Firebase App Hosting config |
| All `@google-cloud/*` packages | No Google dependencies |
| All `@genkit-ai/*` packages | No Genkit dependencies |
| All `firebase*` packages | No Firebase dependencies |

---

## Lessons Learned

1. **Delete, don't archive, when TypeScript still compiles it.** Moving files to `_archive/` wasn't enough because TypeScript's `**/*.ts` glob still scanned them. Had to add explicit excludes in `tsconfig.json` AND delete the worst offenders.

2. **gpt-4o-mini needs explicit JSON examples.** Unlike Gemini, `gpt-4o-mini` returns `snake_case` by default when asked for JSON. Including a concrete camelCase example in the system prompt fixed this reliably.

3. **Standalone Next.js + Docker has hidden env traps.** The `__NEXT_PRIVATE_STANDALONE_CONFIG` env var silently overrides `next.config.js` with a serialized JSON version that can't contain functions. This caused CSP headers and `generateBuildId` to disappear without error.

4. **Health checks need both `curl` and `0.0.0.0`.** Alpine images don't include `curl` (needed by Coolify's health checker), and Next.js binds to `localhost` by default (unreachable from outside the container). Both must be fixed.

5. **Coolify container names follow a pattern.** Database containers use the UUID as the container name. Service containers (Docker Compose) use `{app_name}-{service_uuid}`. Getting this wrong means your S3 endpoint won't resolve within the Docker network.

6. **`npm ci` vs `npm install` in Docker.** `npm ci` requires a perfectly synced `package-lock.json`. After a major dependency overhaul (removing 20+ Google packages, adding 10+ new ones), `npm install` was more reliable in the Dockerfile.

7. **AI timeouts need to be generous.** The default 20s timeout was fine for Genkit/Gemini but too short for OpenAI's structured JSON output on assessment generation. 60s with `maxTokens: 3500` was the sweet spot.

8. **Run DB migrations in the entrypoint, not as a separate step.** Using `CREATE TABLE IF NOT EXISTS` in a JavaScript entrypoint (`docker-entrypoint.js`) is idempotent and runs automatically on every container start, eliminating the need for manual migration steps.

9. **Port conflicts are common on multi-service VPS.** MinIO's default port 9000 conflicted with Listmonk. Always check existing port usage before deploying new services.

10. **Coolify API is powerful for automation.** Creating databases, setting env vars, and managing deployments via the Coolify REST API (`/api/v1`) enabled scripted infrastructure setup instead of manual UI clicks.
