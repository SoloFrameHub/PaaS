# Coolify services deployed (API-created)

These were created via the Coolify API on **2026-02-04**. App env vars can be set **via API** or in the Coolify UI.

**Set app env vars via API:**

```bash
npx tsx scripts/coolify-set-app-envs.ts [app_uuid]
# Optional: include OPENAI_API_KEY from .env.local
COOLIFY_SET_OPENAI_KEY=1 npx tsx scripts/coolify-set-app-envs.ts
```

**List app env vars:** `npx tsx scripts/coolify-app-env.ts <app_uuid>`

Coolify env API: `GET/PATCH /applications/{uuid}/envs`, `PATCH /applications/{uuid}/envs/bulk`. See [deepwiki Coolify Application API](https://deepwiki.com/coollabsio/coolify/8.2-application-api-endpoints#environment-variable-management).

---

## 1. PostgreSQL

- **UUID:** `mcwwwwogco80cksk8o48wskk`
- **Internal URL (use this for the app in Coolify):**  
  `postgres://caa_user:caa_ml8kibsp@mcwwwwogco80cksk8o48wskk:5432/caa_academy`
- **For Drizzle/Postgres client:** use as-is or with `?sslmode=disable` if needed.

**Add in Coolify → App → Environment:**

```env
DATABASE_URL=postgres://caa_user:caa_ml8kibsp@mcwwwwogco80cksk8o48wskk:5432/caa_academy
```

---

## 2. Redis

- **UUID:** `i8oogw88skcssw084cs408w0`
- **Internal URL (use this for the app in Coolify):**  
  `redis://default:redis_ml8kifdw@i8oogw88skcssw084cs408w0:6379/0`

**Add in Coolify → App → Environment:**

```env
REDIS_URL=redis://default:redis_ml8kifdw@i8oogw88skcssw084cs408w0:6379/0
```

---

## 3. App (Next.js)

- **App UUID:** `hc40g0sckkws0wso0s4ks8g4`
- **FQDN:** http://hc40g0sckkws0wso0s4ks8g4.46.202.88.248.sslip.io
- **Status (at creation):** exited:unhealthy — set env vars and redeploy.

**Required env vars** (script `coolify-set-app-envs.ts` sets these via API; add `OPENAI_API_KEY` in UI or with `COOLIFY_SET_OPENAI_KEY=1`):

| Variable | Value (example / secret) |
|----------|--------------------------|
| `DATABASE_URL` | `postgres://caa_user:caa_ml8kibsp@mcwwwwogco80cksk8o48wskk:5432/caa_academy` |
| `REDIS_URL` | `redis://default:redis_ml8kifdw@i8oogw88skcssw084cs408w0:6379/0` |
| `NEXT_PUBLIC_APP_URL` | `http://hc40g0sckkws0wso0s4ks8g4.46.202.88.248.sslip.io` (or your custom domain) |
| `NEXT_PUBLIC_MOCK_AUTH` | `false` |
| `OPENAI_API_KEY` | (your OpenAI API key — set in UI or via script with `COOLIFY_SET_OPENAI_KEY=1`) |

After setting env vars, run **Redeploy** in Coolify. Health check path is already set to `/api/health`.

---

## 4. MinIO

Not created via API (Coolify has no one-click MinIO API). Add via **Coolify → Add Resource → Docker Compose** using the YAML in [COOLIFY-SERVICES.md](./COOLIFY-SERVICES.md#3-minio-s3-compatible-object-storage-for-uploads). Then add `S3_*` env vars to the app.

---

## 5. Database migration

After the app has `DATABASE_URL` and is running (or from a one-off container), run:

```bash
npx tsx scripts/db-migrate.ts
```

This creates the tables (users, sessions, profiles, roleplay_session) in Postgres.
