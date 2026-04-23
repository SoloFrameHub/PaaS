# Trigger.dev setup in Coolify

Trigger.dev is **not** created by the Coolify API. You add it as a **Docker Compose** deployment using Trigger.dev’s official self-host repo.

---

## 1. Get the Compose files

Trigger.dev splits webapp and worker into two compose files. From their docs:

```bash
git clone --depth=1 https://github.com/triggerdotdev/trigger.dev
cd trigger.dev/hosting/docker
```

- **Webapp** (Postgres, Redis, webapp, registry, etc.): `webapp/docker-compose.yml`
- **Worker** (supervisor + runs): `worker/docker-compose.yml`
- **Combined** (same machine):  
  `docker compose -f webapp/docker-compose.yml -f worker/docker-compose.yml up -d`

---

## 2. Add to Coolify

**Option A – One Compose stack in Coolify**

1. In Coolify → your project → **+ Add Resource** → **Docker Compose**.
2. You need a **single** compose file. Trigger.dev doesn’t ship one; they use two. So either:
   - **Merge** the two YAMLs (include both `webapp` and `worker` services in one file), or
   - Use **two** Coolify resources: one for “Trigger.dev Webapp” (paste `webapp/docker-compose.yml`) and one for “Trigger.dev Worker” (paste `worker/docker-compose.yml`), and in the worker’s env set the webapp URL and **worker token** (see step 3).
3. In both cases, create a `.env` from Trigger.dev’s `hosting/docker/.env.example` and configure it (see [Trigger.dev self-hosting env](https://trigger.dev/docs/self-hosting/env/webapp) and [supervisor env](https://trigger.dev/docs/self-hosting/env/supervisor)). In Coolify you’ll set these as environment variables for the Compose resource(s).

**Option B – Run on the VPS outside Coolify**

From your VPS (e.g. SSH):

```bash
git clone --depth=1 https://github.com/triggerdotdev/trigger.dev
cd trigger.dev/hosting/docker
cp .env.example .env
# Edit .env (webapp URL, auth, etc.)
docker compose -f webapp/docker-compose.yml -f worker/docker-compose.yml up -d
```

Then point the Next.js app at the webapp URL (e.g. `http://your-server:8030`).

---

## 3. Worker token (when webapp and worker are separate)

If you run webapp and worker as **separate** Coolify stacks:

1. Deploy the **webapp** stack first.
2. Check webapp logs for the **bootstrap worker token** (printed once).
3. In the **worker** stack’s env, set `TRIGGER_WORKER_TOKEN=<that token>`.
4. Redeploy the worker.

See [Trigger.dev Docker compose – Worker token](https://trigger.dev/docs/self-hosting/docker#worker-token).

---

## 4. App env vars (Next.js app in Coolify)

After the webapp is reachable:

| Variable | Example | Description |
|----------|---------|-------------|
| `TRIGGER_API_URL` | `http://trigger-webapp:8030` or `https://trigger.yourdomain.com` | Trigger.dev webapp URL (use internal host if same Coolify network). |
| `TRIGGER_SECRET_KEY` | (from Trigger.dev dashboard) | Secret key for the project (create in dashboard → Project → API Keys). |

Add these in Coolify → your **Next.js app** → Environment (or use `coolify-set-app-envs.ts` and extend it for Trigger vars).

---

## 5. Create project and keys in Trigger.dev

1. Open the webapp (e.g. `http://localhost:8030` or your domain).
2. Sign in (magic link is in webapp logs if email isn’t configured).
3. Create a project and copy the **Secret Key** (dev and/or prod).
4. Set `TRIGGER_SECRET_KEY` (and optionally `TRIGGER_API_URL`) on the Next.js app.

---

## References

- [Trigger.dev self-hosting overview](https://trigger.dev/docs/self-hosting/overview)
- [Trigger.dev Docker compose](https://trigger.dev/docs/self-hosting/docker)
- [Trigger.dev webapp env](https://trigger.dev/docs/self-hosting/env/webapp)
- [Trigger.dev supervisor env](https://trigger.dev/docs/self-hosting/env/supervisor)
