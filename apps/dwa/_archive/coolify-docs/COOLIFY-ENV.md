# Coolify environment variables (live deploy)

Set these in **Coolify** → your project → **app** → **Environment** (Build / Runtime). Use **secrets** for API keys and passwords.

**Stack: no Google.** Auth is Lucia + Postgres; AI is OpenAI; storage is S3-compatible (MinIO) when configured.

---

## Required for app to run

| Variable | Where | Description |
|----------|--------|-------------|
| `NEXT_PUBLIC_APP_URL` | Runtime | Public URL of the app (e.g. `https://customer-acquisition-academy.soloframehub.com`). No trailing slash. |
| `NEXT_PUBLIC_MOCK_AUTH` | Runtime | Set **`false`** for production (Lucia + Postgres). Use `true` only for local/dev without a DB. |
| `DATABASE_URL` | Runtime (secret) | Postgres connection string. Create DB with `npx tsx scripts/coolify-create-postgres.ts` and add the printed URL. Required for real auth and profiles when `NEXT_PUBLIC_MOCK_AUTH=false`. |
| `OPENAI_API_KEY` | **Secret** | Required for AI: coaching chat, roleplay, ICP validation, onboarding analysis, quiz reflection. |

---

## Optional (per feature)

| Variable | Description |
|----------|-------------|
| `OPENAI_CHAT_MODEL` | Chat model (default `gpt-4o-mini`). e.g. `gpt-4o`. |
| `REDIS_URL` | If you add Redis (e.g. `npx tsx scripts/coolify-create-redis.ts`). Used for sessions/cache if you switch to Redis store. |
| `S3_ENDPOINT` | S3-compatible endpoint (e.g. MinIO). If set with credentials, onboarding file uploads use S3. |
| `S3_ACCESS_KEY` | S3/MinIO access key. |
| `S3_SECRET_KEY` | **Secret.** S3/MinIO secret key. |
| `S3_BUCKET` | Bucket name (e.g. `caa-uploads`). |
| `S3_REGION` | Optional (e.g. `us-east-1` for MinIO). |
| `TRIGGER_SECRET_KEY` | If you self-host Trigger.dev for background jobs. |

See **[COOLIFY-SERVICES.md](./COOLIFY-SERVICES.md)** for how to add Postgres, Redis, MinIO, and Trigger.dev in Coolify.

---

## Build-time (optional)

| Variable | Description |
|----------|-------------|
| `NODE_VERSION` or `NIXPACKS_NODE_VERSION` | e.g. `20` or `22` if you need a specific Node version. |

---

## Start command in Coolify

```bash
npx tsx scripts/reindex-course-content.ts && npm run start
```

Port: Next.js default **3000** (or set `PORT` if your Coolify template expects it).

---

## Health check

- **URL:** `GET /api/health`
- **Expected:** `200` and `{ "status": "ok", "service": "soloframehub-academy" }`

Use this in Coolify as the health check path if the UI supports it (e.g. `/api/health`).
