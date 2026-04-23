# Trigger.dev self-hosted (VPS)

Trigger.dev runs as a standalone Docker Compose stack on the VPS at **`/opt/trigger.dev/hosting/docker`**. You manage it via SSH/terminal on the server. Domain and CAA app URL are configured.

---

## Completed

| Step | Status |
|------|--------|
| **Installation** | Webapp + worker at `/opt/trigger.dev/hosting/docker`. All components running (Postgres, Redis, ClickHouse, Electric, MinIO, Registry, Supervisor, Docker Socket Proxy). |
| **Worker token** | `tr_wgt_DFvdp2U8tLHLFkIHNTQDNrduOJ45EBqcYHLH8YKz` (bootstrap; already in worker config). |
| **Domain in .env** | `APP_ORIGIN`, `LOGIN_ORIGIN`, `API_ORIGIN` = `https://trigger.soloframehub.com` in `/opt/trigger.dev/hosting/docker/.env`; webapp restarted. |
| **CAA app** | `TRIGGER_API_URL=https://trigger.soloframehub.com` set on Customer Acquisition Academy in Dokploy. |

---

## Remaining

### 1. Expose Trigger.dev (reverse proxy)

Trigger.dev runs outside Dokploy (manual Docker Compose on the VPS). The webapp listens on **port 3000** inside that stack. Expose it at `https://trigger.soloframehub.com`:

- **Dokploy proxy:** Dokploy uses Traefik. Add a route so `trigger.soloframehub.com` forwards to the host/port where the Trigger.dev webapp is reachable.
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

In **Dokploy → Customer Acquisition Academy → Environment**, add:

```
TRIGGER_SECRET_KEY=<secret-from-step-2>
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

| | Dokploy | Trigger.dev |
|---|---------|-------------|
| **Where** | Dokploy dashboard → projects, apps, DBs, services | VPS at `/opt/trigger.dev/hosting/docker` (manual Docker Compose) |
| **Manage** | Dokploy UI / API | SSH or server terminal; `docker compose` in that directory |
| **CAA app, Postgres, Redis, MinIO** | In Dokploy | — |
| **Trigger.dev webapp + worker** | — | Outside Dokploy |

---

## References

- [Trigger.dev self-hosting – Docker](https://trigger.dev/docs/self-hosting/docker)
- [Dokploy](https://docs.dokploy.com)
