# Dokploy Deployment Guide for AI Assistants

This document describes how to interact with the Dokploy deployment platform on VPS `46.202.88.248`. Follow these instructions exactly.

---

## 1. Access Methods (Priority Order)

### A. MCP Tools (PREFERRED - Always Try First)

Dokploy has MCP (Model Context Protocol) tools available. **You MUST use these instead of raw API calls whenever possible.** MCP tools handle authentication automatically and are less error-prone.

Before using any MCP tool, you must load it first using `ToolSearch`:

```
ToolSearch query: "select:mcp__dokploy__project-all"
```

Or search by keyword:
```
ToolSearch query: "+dokploy application"
```

### B. Direct API (Fallback Only)

Only use direct `curl` API calls for operations NOT covered by MCP tools (redis, compose, sshKey, settings, certificates).

---

## 2. Complete MCP Tools Reference

### Project Management
| Tool | Description |
|------|-------------|
| `mcp__dokploy__project-all` | List all projects |
| `mcp__dokploy__project-create` | Create a new project |
| `mcp__dokploy__project-one` | Get a project by ID |
| `mcp__dokploy__project-update` | Update project name/description |
| `mcp__dokploy__project-remove` | Delete a project |
| `mcp__dokploy__project-duplicate` | Duplicate a project/environment |

### Application Lifecycle
| Tool | Description |
|------|-------------|
| `mcp__dokploy__application-create` | Create a new application in a project |
| `mcp__dokploy__application-one` | Get application details by ID |
| `mcp__dokploy__application-update` | Update application settings |
| `mcp__dokploy__application-deploy` | Deploy the application |
| `mcp__dokploy__application-redeploy` | Redeploy the application |
| `mcp__dokploy__application-start` | Start a stopped application |
| `mcp__dokploy__application-stop` | Stop a running application |
| `mcp__dokploy__application-reload` | Reload application config |
| `mcp__dokploy__application-delete` | Delete an application |
| `mcp__dokploy__application-move` | Move app to different environment |
| `mcp__dokploy__application-cancelDeployment` | Cancel an in-progress deploy |
| `mcp__dokploy__application-markRunning` | Force-mark app as running |
| `mcp__dokploy__application-cleanQueues` | Clean deployment queues |
| `mcp__dokploy__application-refreshToken` | Refresh app token |

### Application Configuration
| Tool | Description |
|------|-------------|
| `mcp__dokploy__application-saveEnvironment` | Set environment variables |
| `mcp__dokploy__application-saveBuildType` | Set build type (dockerfile, nixpacks, etc.) |
| `mcp__dokploy__application-saveGitProvider` | Configure generic git provider |
| `mcp__dokploy__application-saveGithubProvider` | Configure GitHub as source |
| `mcp__dokploy__application-saveGitlabProvider` | Configure GitLab as source |
| `mcp__dokploy__application-saveGiteaProvider` | Configure Gitea as source |
| `mcp__dokploy__application-saveBitbucketProvider` | Configure Bitbucket as source |
| `mcp__dokploy__application-saveDockerProvider` | Configure Docker image as source |
| `mcp__dokploy__application-disconnectGitProvider` | Remove git provider |

### Application Monitoring & Traefik
| Tool | Description |
|------|-------------|
| `mcp__dokploy__application-readAppMonitoring` | Read app monitoring/metrics |
| `mcp__dokploy__application-readTraefikConfig` | Read Traefik reverse proxy config |
| `mcp__dokploy__application-updateTraefikConfig` | Update Traefik config |

### Domain Management
| Tool | Description |
|------|-------------|
| `mcp__dokploy__domain-create` | Create a domain for a service |
| `mcp__dokploy__domain-one` | Get domain details by ID |
| `mcp__dokploy__domain-update` | Update domain settings |
| `mcp__dokploy__domain-delete` | Delete a domain |
| `mcp__dokploy__domain-byApplicationId` | List domains for an application |
| `mcp__dokploy__domain-byComposeId` | List domains for a compose service |
| `mcp__dokploy__domain-generateDomain` | Generate a suggested domain |
| `mcp__dokploy__domain-validateDomain` | Validate domain DNS |
| `mcp__dokploy__domain-canGenerateTraefikMeDomains` | Check traefik.me availability |

### PostgreSQL Database
| Tool | Description |
|------|-------------|
| `mcp__dokploy__postgres-create` | Create a PostgreSQL database service |
| `mcp__dokploy__postgres-one` | Get database details |
| `mcp__dokploy__postgres-deploy` | Deploy the database |
| `mcp__dokploy__postgres-start` | Start the database |
| `mcp__dokploy__postgres-stop` | Stop the database |
| `mcp__dokploy__postgres-reload` | Reload database config |
| `mcp__dokploy__postgres-rebuild` | Rebuild the database container |
| `mcp__dokploy__postgres-remove` | Delete the database |
| `mcp__dokploy__postgres-move` | Move to different environment |
| `mcp__dokploy__postgres-changeStatus` | Change database status |
| `mcp__dokploy__postgres-update` | Update database settings |
| `mcp__dokploy__postgres-saveEnvironment` | Set database env vars |
| `mcp__dokploy__postgres-saveExternalPort` | Expose database on external port |

### MySQL Database
| Tool | Description |
|------|-------------|
| `mcp__dokploy__mysql-create` | Create a MySQL database service |
| `mcp__dokploy__mysql-one` | Get database details |
| `mcp__dokploy__mysql-deploy` | Deploy the database |
| `mcp__dokploy__mysql-start` | Start the database |
| `mcp__dokploy__mysql-stop` | Stop the database |
| `mcp__dokploy__mysql-reload` | Reload database config |
| `mcp__dokploy__mysql-rebuild` | Rebuild the database container |
| `mcp__dokploy__mysql-remove` | Delete the database |
| `mcp__dokploy__mysql-move` | Move to different environment |
| `mcp__dokploy__mysql-changeStatus` | Change database status |
| `mcp__dokploy__mysql-update` | Update database settings |
| `mcp__dokploy__mysql-saveEnvironment` | Set database env vars |
| `mcp__dokploy__mysql-saveExternalPort` | Expose database on external port |

---

## 3. Direct API Reference (For Operations Without MCP Tools)

### Authentication

**Auth header**: `x-api-key: <API_KEY>` (NOT Bearer token)

```bash
# Get the API key from .env.local
API_KEY="<your DOKPLOY_DEPLOY_API_KEY from .env.local>"
```

### Base URLs

- **Panel (HTTPS, via Cloudflare)**: `https://dokploy.startupapps.cloud`
- **API (direct, no Cloudflare)**: `http://46.202.88.248:3000`

**IMPORTANT**: For API calls use the direct IP URL `http://46.202.88.248:3000`. The Cloudflare-proxied panel URL has redirect loop issues for API calls.

### API Style

Dokploy uses **RPC-style endpoints**, NOT REST. All endpoints are POST unless noted.

```
POST /api/<resource>.<action>
```

Examples:
```bash
# List all projects
curl -s -X GET "http://46.202.88.248:3000/api/project.all" \
  -H "x-api-key: $API_KEY"

# Get a specific application
curl -s -X GET "http://46.202.88.248:3000/api/application.one?applicationId=YOUR_APP_ID" \
  -H "x-api-key: $API_KEY"

# Deploy an application
curl -s -X POST "http://46.202.88.248:3000/api/application.deploy" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"applicationId": "YOUR_APP_ID"}'
```

### Operations NOT Covered by MCP (Use curl)

| Operation | Endpoint | Method |
|-----------|----------|--------|
| Compose create | `POST /api/compose.create` | POST |
| Compose update (YAML) | `POST /api/compose.update` | POST |
| Compose deploy | `POST /api/compose.deploy` | POST |
| Compose delete | `POST /api/compose.delete` | POST |
| Redis operations | `POST /api/redis.*` | POST |
| SSH key management | `POST /api/sshKey.*` | POST |
| Certificates | `POST /api/certificates.create` | POST |
| Read Traefik files | `GET /api/settings.readTraefikFile?path=...` | GET |
| Update Traefik files | `POST /api/settings.updateTraefikFile` | POST |
| Reload Traefik | `POST /api/settings.reloadTraefik` | POST |
| List Traefik dirs | `GET /api/settings.readDirectories` | GET |

### Environment Variables

```bash
# Set env vars for an application
curl -s -X POST "http://46.202.88.248:3000/api/application.saveEnvironment" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "applicationId": "YOUR_APP_ID",
    "env": "KEY1=value1\nKEY2=value2\nKEY3=value3"
  }'
```

Note: Environment variables are passed as a single newline-delimited string, NOT as a JSON object.

---

## 4. Common Workflows

### Discover Your Project and App IDs

```
1. ToolSearch: "select:mcp__dokploy__project-all"
2. Call mcp__dokploy__project-all → find your project ID
3. ToolSearch: "select:mcp__dokploy__project-one"
4. Call mcp__dokploy__project-one with projectId → lists all apps, databases, etc. with their IDs
```

### Deploy After Code Push

```
1. ToolSearch: "select:mcp__dokploy__application-deploy"
2. Call mcp__dokploy__application-deploy with applicationId
```

### Update Environment Variables

```
1. ToolSearch: "select:mcp__dokploy__application-saveEnvironment"
2. Call mcp__dokploy__application-saveEnvironment with applicationId and env string
3. Then redeploy: mcp__dokploy__application-redeploy
```

### Check Application Status

```
1. ToolSearch: "select:mcp__dokploy__application-one"
2. Call mcp__dokploy__application-one with applicationId
   → Returns status, build info, git config, env vars, etc.
```

### Add a Custom Domain

```
1. ToolSearch: "select:mcp__dokploy__domain-create"
2. Call mcp__dokploy__domain-create with:
   - applicationId (or composeId for compose services)
   - host: "your-subdomain.yourdomain.com"
   - https: true
   - certificateType: "letsencrypt"  ← CRITICAL (see warnings below)
```

### Read Deployment Logs

The API key **cannot** read deployment logs. You must use SSH:

```bash
ssh -i ~/.ssh/vps_backup root@46.202.88.248
# Then check Docker logs:
docker logs <container_name> --tail 100
```

---

## 5. Critical Warnings

### NEVER set `certificateType: "none"`
Setting `certificateType` to `"none"` causes Dokploy to NOT generate Traefik router configs. This makes the service **completely inaccessible** — not just without SSL, but with no routing at all. Always use `"letsencrypt"`.

### Memory Limits — Do NOT Use String Values
```
WRONG: memoryLimit: "512M"   → Dokploy strips the "M", Docker sees 512 BYTES
WRONG: memoryLimit: "2048m"  → Same problem
RIGHT: memoryLimit: null     → No limit (Docker default)
RIGHT: memoryLimit: 2684354560  → Numeric bytes (if you must set a limit)
```

### Docker Context Path for Monorepo Subdirectories
If your app is in a subdirectory (e.g., `apps/myapp/`), set:
```
dockerContextPath: "./apps/myapp"   (NOT ".")
customGitBuildPath: "/apps/myapp"
```

### Cache Busting
`cleanCache: true` doesn't always clear Docker layer cache. If cached layers are wrong, push a trivial change to `package.json` (e.g., add a comment in description) to bust the cache.

### Always Verify Dependencies Are Committed
Running `npm install` locally changes `node_modules` but does NOT update the remote. If you added packages, make sure `package.json` and `package-lock.json` are committed and pushed before deploying.

---

## 6. SSL/TLS Architecture

- All DNS records use **Cloudflare Proxied** (orange cloud) — server IP is hidden
- Cloudflare SSL mode: **Full (Strict)**
- **Traefik uses Let's Encrypt** certificates (`certificateType: "letsencrypt"`)
- Let's Encrypt certs work fine behind Cloudflare proxy
- Certificate files are stored at: `/etc/dokploy/traefik/dynamic/certificates/`

---

## 7. VPS Access

- **IP**: `46.202.88.248`
- **SSH**: `ssh -i ~/.ssh/vps_backup root@46.202.88.248`
- **Dokploy Panel**: `https://dokploy.startupapps.cloud` (may have redirect issues) or `http://46.202.88.248:3000`

---

## 8. Quick Start Checklist

When working with Dokploy on this VPS:

1. **Get your project/app IDs** — Use `mcp__dokploy__project-all` then `mcp__dokploy__project-one`
2. **Always use MCP tools first** — Only fall back to curl for unsupported operations
3. **Auth is `x-api-key` header** — NOT Bearer token
4. **API base is `http://46.202.88.248:3000`** — NOT the Cloudflare URL
5. **Endpoints are RPC-style** — `POST /api/resource.action`, not REST
6. **Env vars are newline-delimited strings** — NOT JSON objects
7. **Always use `certificateType: "letsencrypt"`** — NEVER `"none"`
8. **Memory limits must be numeric or null** — NEVER strings like `"512M"`
9. **Redeploy after env var changes** — Env vars don't take effect until redeployed
10. **Check deployment logs via SSH** — API key can't read them
