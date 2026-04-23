# Coolify setup checklist

Use this to see what’s done and what’s still missing for the Customer Acquisition Academy stack.

---

## Done (via API or already configured)

| Item | How | Notes |
|------|-----|--------|
| **PostgreSQL** | `npx tsx scripts/coolify-create-postgres.ts` | Created; internal URL set on app via `coolify-set-app-envs.ts`. |
| **Redis** | `npx tsx scripts/coolify-create-redis.ts` | Created; internal URL set on app. |
| **App env vars** | `npx tsx scripts/coolify-set-app-envs.ts` | `DATABASE_URL`, `REDIS_URL`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_MOCK_AUTH` set via API. |
| **Health check** | PATCH application | Path `/api/health`, method GET, return code 200. |
| **OpenAI** | Manual / env | Set `OPENAI_API_KEY` in Coolify (UI or `COOLIFY_SET_OPENAI_KEY=1` when running the set-envs script). |

---

## Done (Trigger.dev, MinIO, DB migration)

| Item | Notes |
|------|--------|
| **Trigger.dev** | Runs **outside Coolify** (manual Docker Compose at `/opt/trigger.dev/hosting/docker`). Manage via SSH/terminal. [TRIGGER-DEPLOYED.md](./TRIGGER-DEPLOYED.md). `TRIGGER_API_URL` set on CAA app; add `TRIGGER_SECRET_KEY` after creating a project. |
| **MinIO** | Created in Coolify (service caa-minio). S3_* set on app. Create bucket `caa-uploads` in MinIO console. |
| **DB migration** | Runs on every app deploy (start command includes `npx tsx scripts/db-migrate.ts`). |

## Optional (later)

| Item | Purpose | How |
|------|---------|-----|
| **Trigger.dev project + init** | Use background tasks from the app | Create project in Trigger.dev webapp, get secret key, set on app; run `npx trigger.dev@latest init -p <ref> -a <url>`. See [TRIGGER-DEPLOYED.md](./TRIGGER-DEPLOYED.md). |
| **Trigger.dev auth/domain** | Webapp login and public URL | Set `APP_ORIGIN`/`API_ORIGIN` and `EMAIL_TRANSPORT` in `/opt/trigger.dev/hosting/docker/.env`. |
| **Uptime Kuma** | HTTP/uptime monitoring | Coolify → Add Resource → One-click or Docker Compose. |
| **Umami / Plausible / PostHog** | Analytics | Same; see [VPS-REARCHITECTURE.md](./VPS-REARCHITECTURE.md). |
| **Backup** | Postgres + app data | restic/Borg to S3-compatible (e.g. MinIO) or VPS snapshots; cron on server. |
| **pgvector** | RAG over user documents | Enable extension in Postgres; add table + migration when you implement RAG. |

---

## Quick reference

- **Set app env vars:** `npx tsx scripts/coolify-set-app-envs.ts` ([COOLIFY-SERVICES.md](./COOLIFY-SERVICES.md))
- **List app env vars:** `npx tsx scripts/coolify-app-env.ts <app_uuid>`
- **Deployed services details:** [COOLIFY-DEPLOYED-SERVICES.md](./COOLIFY-DEPLOYED-SERVICES.md)
- **Trigger.dev (self-hosted):** [TRIGGER-DEPLOYED.md](./TRIGGER-DEPLOYED.md)
