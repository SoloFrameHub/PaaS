# Trigger.dev self-hosted (VPS)

Trigger.dev runs **outside Coolify**: it’s a manual Docker Compose stack on the VPS at **`/opt/trigger.dev/hosting/docker`**. You manage it via SSH/terminal on the server, not from the Coolify dashboard. Domain and CAA app URL are configured.

---

## ✅ Completed

| Step | Status |
|------|--------|
| **Installation** | Webapp + worker at `/opt/trigger.dev/hosting/docker`. All components running (Postgres, Redis, ClickHouse, Electric, MinIO, Registry, Supervisor, Docker Socket Proxy). |
| **Worker token** | `tr_wgt_DFvdp2U8tLHLFkIHNTQDNrduOJ45EBqcYHLH8YKz` (bootstrap; already in worker config). |
| **Domain in .env** | `APP_ORIGIN`, `LOGIN_ORIGIN`, `API_ORIGIN` = `https://trigger.soloframehub.com` in `/opt/trigger.dev/hosting/docker/.env`; webapp restarted. |
| **CAA app** | `TRIGGER_API_URL=https://trigger.soloframehub.com` set on Customer Acquisition Academy in Coolify. |

---

## 🔄 Remaining

### 1. Expose Trigger.dev (reverse proxy)

Trigger.dev runs **outside Coolify** (manual Docker Compose on the VPS). The webapp listens on **port 3000** inside that stack. Expose it at `https://trigger.soloframehub.com`:

- **Coolify proxy:** If Coolify’s proxy (e.g. Traefik) is the main reverse proxy on the VPS, add a route so `trigger.soloframehub.com` forwards to the host/port where the Trigger.dev webapp is reachable (e.g. `localhost:3000` or the server IP + published port).
- **Other proxy:** If you use Nginx/Caddy/etc. on the same server, add a server block so `trigger.soloframehub.com` → `localhost:3000` (or the correct host/port).

### 2. Access webapp and get secret key

1. Visit **https://trigger.soloframehub.com** (after proxy is live).
2. Get magic link from logs:
   ```bash
   cd /opt/trigger.dev/hosting/docker/webapp
   docker compose logs webapp | grep -i magic
   ```
3. Log in, create a project (e.g. `customer-acquisition-academy`), copy the **Secret Key**.

### 3. Add secret key to CAA app

In **Coolify → Customer Acquisition Academy → Environment**, add:

```
TRIGGER_SECRET_KEY=<secret-from-step-2>
```

Or from the repo:

```bash
COOLIFY_TRIGGER_SECRET_KEY=tr_dev_xxx npx tsx scripts/coolify-set-app-envs.ts
```

Then redeploy the CAA app so it picks up the key.

### 4. Initialize in app repo (when you add background tasks)

From this repo:

```bash
npx trigger.dev@latest init -p <project-ref> -a https://trigger.soloframehub.com
```

Use the project ref from the Trigger.dev dashboard.

---

## Where Trigger.dev runs

| | Coolify | Trigger.dev |
|---|--------|-------------|
| **Where** | Coolify dashboard → projects, apps, DBs, services | VPS at `/opt/trigger.dev/hosting/docker` (manual Docker Compose) |
| **Manage** | Coolify UI / API | SSH or server terminal; `docker compose` in that directory |
| **CAA app, Postgres, Redis, MinIO** | ✅ In Coolify | — |
| **Trigger.dev webapp + worker** | — | ✅ Outside Coolify |

Full setup and troubleshooting are also in **`/opt/trigger.dev/TRIGGER-DEPLOYED.md`** on the VPS.

---

## References

- [Trigger.dev self-hosting – Docker](https://trigger.dev/docs/self-hosting/docker)
- [Coolify](https://coolify.soloframehub.com)
