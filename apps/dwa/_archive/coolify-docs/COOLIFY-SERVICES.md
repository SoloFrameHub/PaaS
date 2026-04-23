# Coolify services for Customer Acquisition Academy

The app runs on a **Google-free** stack. These services should be created **in Coolify** (on your VPS) and their connection details added to the **Next.js app** environment.

**Setting app env vars:** Use the API (recommended) or the UI. From the repo:

```bash
# Set DATABASE_URL, REDIS_URL, NEXT_PUBLIC_APP_URL, NEXT_PUBLIC_MOCK_AUTH (and optionally OPENAI_API_KEY)
npx tsx scripts/coolify-set-app-envs.ts [app_uuid]
COOLIFY_SET_OPENAI_KEY=1 npx tsx scripts/coolify-set-app-envs.ts   # also push OPENAI_API_KEY from .env.local

# List current env vars
npx tsx scripts/coolify-app-env.ts <app_uuid>
```

Coolify env API: `GET /applications/{uuid}/envs`, `POST /applications/{uuid}/envs`, `PATCH /applications/{uuid}/envs/bulk`, `DELETE /applications/{uuid}/envs/{env_uuid}`. See [Application API – Environment Variable Management](https://deepwiki.com/coollabsio/coolify/8.2-application-api-endpoints#environment-variable-management).

---

## 1. PostgreSQL (users, profiles, sessions, roleplay)

**Create via script (Coolify API):**

```bash
npx tsx scripts/coolify-create-postgres.ts
```

- Uses `COOLIFY_BASE_URL`, `COOLIFY_API_KEY` from `.env.local` (and optional `COOLIFY_SERVER_UUID`, `COOLIFY_PROJECT_UUID`).
- Script prints a **`DATABASE_URL`** — add it to the **app** environment in Coolify.
- If the app runs in the same Coolify project/network, use the **internal Postgres host** (e.g. the service name or `host.docker.internal`) in `DATABASE_URL` so the app can reach the DB without going through the public port.

**Manual alternative:** In Coolify UI → your project → **+ Add Resource** → **Database** → **PostgreSQL**. Then set `DATABASE_URL` in the app env to the connection string Coolify shows.

---

## 2. Redis (sessions / cache, optional)

**Create via script (Coolify API):**

```bash
npx tsx scripts/coolify-create-redis.ts
```

- Script prints **`REDIS_URL`** — add it to the app environment in Coolify if you use Redis (e.g. for session store or rate limiting).

**Manual alternative:** Coolify → **+ Add Resource** → **Database** → **Redis**. Copy the connection URL into the app env as `REDIS_URL`.

---

## 3. MinIO (S3-compatible object storage for uploads)

MinIO is **not** a built-in “database” in Coolify; add it as a **Docker Compose** or **Docker Image** service.

**Option A – Coolify UI (Docker Compose):**

1. In Coolify → your project → **+ Add Resource** → **Docker Compose** (or **Docker Image** if you prefer a single container).
2. Use the compose file in the repo: **[docker/minio-compose.yml](../docker/minio-compose.yml)** (or paste its contents). Replace passwords or use Coolify env vars (`SERVICE_USER_MINIO`, `SERVICE_PASSWORD_MINIO`).

3. Deploy. Note the **internal host/port** (e.g. `minio:9000` if the app is in the same Compose network, or the server host + public port).

**Option B – One-click (if available):** Coolify may offer a **MinIO** template under **+ Add Resource** → check the service list. If present, use it and set the same env vars below.

**App environment variables (add to Next.js app in Coolify):**

| Variable | Example | Description |
|---------|--------|-------------|
| `S3_ENDPOINT` | `http://minio:9000` or `http://YOUR_SERVER_IP:9000` | S3 API endpoint (use internal host if same network). |
| `S3_ACCESS_KEY` | same as `MINIO_ROOT_USER` | Access key. |
| `S3_SECRET_KEY` | same as `MINIO_ROOT_PASSWORD` | Secret key. |
| `S3_BUCKET` | `caa-uploads` | Bucket name (create in MinIO console on port 9001 if needed). |
| `S3_REGION` | `us-east-1` | Optional; MinIO often uses a dummy region. |

If these are set, the app uses S3-compatible storage for onboarding uploads instead of skipping uploads.

---

## 4. Trigger.dev (background jobs, optional)

Trigger.dev runs **outside Coolify**—installed manually on the VPS (e.g. at `/opt/trigger.dev/hosting/docker`) via Docker Compose from the [Trigger.dev repo](https://github.com/triggerdotdev/trigger.dev). You manage it via SSH/terminal, not the Coolify UI.

**In Coolify you only:** Set `TRIGGER_API_URL` and `TRIGGER_SECRET_KEY` on the Next.js app so it can talk to your self-hosted Trigger.dev. See **[TRIGGER-DEPLOYED.md](./TRIGGER-DEPLOYED.md)** for the full setup (already done on your VPS) and connection steps.

---

## Summary: what to add in Coolify

| Service | How to add | App env vars |
|--------|------------|---------------|
| **PostgreSQL** | `npx tsx scripts/coolify-create-postgres.ts` or UI → Database → PostgreSQL | `DATABASE_URL` |
| **Redis** | `npx tsx scripts/coolify-create-redis.ts` or UI → Database → Redis | `REDIS_URL` (optional) |
| **MinIO** | UI → Docker Compose (or template) with MinIO container | `S3_ENDPOINT`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_BUCKET` |
| **Trigger.dev** | Outside Coolify (manual Docker Compose on VPS). See [TRIGGER-DEPLOYED.md](./TRIGGER-DEPLOYED.md). | `TRIGGER_API_URL`, `TRIGGER_SECRET_KEY` on app |

After adding each service, set the listed variables in **Coolify → your app → Environment**, then redeploy the app.

**Full checklist (done vs missing):** [COOLIFY-SETUP-CHECKLIST.md](./COOLIFY-SETUP-CHECKLIST.md)
