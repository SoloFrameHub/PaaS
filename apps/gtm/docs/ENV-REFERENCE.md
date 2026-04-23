# Environment Variables Reference

> CAA project `.env.local` — all secrets redacted. For MHE, create equivalent credentials and update values accordingly.

## VPS / SSH

| Variable       | Value                    |
| -------------- | ------------------------ |
| `SSH_HOST`     | `46.202.88.248`          |
| `SSH_USER`     | `root`                   |
| `SSH_URL`      | `ssh root@46.202.88.248` |
| `SSH-PASSWORD` | `<redacted>`             |

## Dokploy API

| Variable                 | Value        |
| ------------------------ | ------------ |
| `DOKPLOY_DEPLOY_API_KEY` | `<redacted>` |

## App Configuration

| Variable                | CAA Value                                                  | MHE Value                                          |
| ----------------------- | ---------------------------------------------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`   | `https://ai-solo-gtm-os.soloframehub.com` | `https://mental-health-education.soloframehub.com` |
| `NEXT_PUBLIC_MOCK_AUTH` | `true` (dev) / `false` (prod)                              | `true` (dev) / `false` (prod)                      |

## Affiliate Tracking (Endorsely) — Optional

| Variable                           | Value              |
| ---------------------------------- | ------------------ |
| `NEXT_PUBLIC_ENDORSELY_ACCOUNT_ID` | `<not configured>` |
| `ENDORSELY_API_KEY`                | `<not configured>` |

## AI Providers

| Variable             | Value                                                              |
| -------------------- | ------------------------------------------------------------------ |
| `AI_PROVIDER`        | `openai` \| `anthropic` \| `openrouter` (auto-detected if omitted) |
| `OPENAI_API_KEY`     | `<redacted>` — can share across CAA & MHE                          |
| `ANTHROPIC_API_KEY`  | `<redacted>` — set to use Claude models (Haiku 4.5 / Sonnet 4.6)   |
| `OPENROUTER_API_KEY` | `<redacted>` — optional, routes through OpenRouter                 |

> **Model defaults when `AI_PROVIDER=anthropic`:**
>
> - Most tasks: `claude-haiku-4-5-20251001` (fast, cost-effective)
> - Assessment / Mini-assessment: `claude-sonnet-4-6` (higher quality for complex analysis)
> - TTS/STT: Always OpenAI (voice endpoints only)
> - Override any task model with `AI_MODEL_{TASK}` env vars (e.g., `AI_MODEL_COACHING=claude-sonnet-4-6`)

## Cloudflare (Edge Services)

| Variable                     | Value                                                       |
| ---------------------------- | ----------------------------------------------------------- |
| `CLOUDFLARE_KV_NAMESPACE_ID` | `30bab90f6a2f4c4db879db66a373e254` (soloframehub-caa-cache) |
| `CLOUDFLARE_ACCOUNT_ID`      | `34822b058adb2109e6d4bc597f8474e9`                          |

> **R2**: Not yet enabled — activate at Cloudflare Dashboard > R2 to use as S3-compatible storage.
> The existing S3 client (`lib/storage/s3.ts`) supports R2 natively via `R2_ENDPOINT`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`.

## n8n (Workflow Automation)

| Variable             | Value                          |
| -------------------- | ------------------------------ |
| `N8N_API_KEY`        | `<redacted>`                   |
| `N8N_URL`            | `https://n8n.soloframehub.com` |
| `N8N_ADMIN_USER`     | `admin`                        |
| `N8N_ADMIN_PASSWORD` | `<redacted>`                   |

## Listmonk (Email Campaigns)

| Variable                  | Value                                     |
| ------------------------- | ----------------------------------------- |
| `LISTMONK_URL`            | `https://listmonk.soloframehub.com/admin` |
| `LISTMONK_ADMIN_USERNAME` | `solo-list`                               |
| `LISTMONK_ADMIN_EMAIL`    | `svtechconsulting@pm.me`                  |
| `LISTMONK_ADMIN-PASSWORD` | `<redacted>`                              |

## NodeBB (Forum)

| Variable         | CAA Value                        | MHE Value                    |
| ---------------- | -------------------------------- | ---------------------------- |
| `NODEBB-USER-ID` | `1`                              | Create new if separate forum |
| `NODEBB-URL`     | `https://forum.soloframehub.com` | TBD                          |
| `NODEBB-API`     | `<redacted>`                     | Create new API key           |

## Mailgun

| Variable                 | Value                                                 |
| ------------------------ | ----------------------------------------------------- |
| `MAILGUN_API_KEY`        | `<redacted>`                                          |
| `MAILGUN_SANDBOX_DOMAIN` | `sandbox509dac70030f4dabbb74fba9b75aff35.mailgun.org` |
| `MAILGUN_BASE_URL`       | `https://api.mailgun.net`                             |

## Fillout Forms

| Variable                | Value                            |
| ----------------------- | -------------------------------- |
| `FILLOUT_FORMS_URL`     | `https://api.fillout.com/v1/api` |
| `FILLOUT_FORMS_API_KEY` | `<redacted>`                     |

## Ghost (Blog CMS) — DEPRECATED

> Ghost blog has been removed from the platform. These env vars are no longer needed.

| Variable                | Value                              | Status     |
| ----------------------- | ---------------------------------- | ---------- |
| `GHOST_CONTENT_API_KEY` | `<redacted>`                       | Deprecated |
| `GHOST_ADMIN-API_KEY`   | `<redacted>`                       | Deprecated |
| `GHOST-API_URL`         | `https://content.soloframehub.com` | Deprecated |

## Polar.sh (Payments)

| Variable                       | CAA Value                                                                        | MHE Value                                                                |
| ------------------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `POLAR_ACCESS_TOKEN`           | `<redacted>`                                                                     | Create new or share                                                      |
| `POLAR_WEBHOOK_SECRET`         | `<redacted>`                                                                     | Create new webhook for MHE domain                                        |
| `POLAR_MODE`                   | `sandbox`                                                                        | `sandbox` (switch to `production` when ready)                            |
| `POLAR_SUCCESS_URL`            | `https://ai-solo-gtm-os.soloframehub.com/checkout/confirmation` | `https://mental-health-education.soloframehub.com/checkout/confirmation` |
| `NEXT_PUBLIC_POLAR_MONTHLY_ID` | `a75bcdb7-34ad-4fc5-b878-b2309ea0611b`                                           | Create new MHE product                                                   |
| `NEXT_PUBLIC_POLAR_ANNUAL_ID`  | `16521213-3716-4406-9437-35f85693b71e`                                           | Create new MHE product                                                   |

## Additional Variables Needed (not in CAA .env.local)

| Variable                       | Description                                                               |
| ------------------------------ | ------------------------------------------------------------------------- |
| `DATABASE_URL`                 | `postgresql://user:pass@hostname:5432/dbname` — set in Dokploy, not local |
| `REDIS_URL`                    | `redis://hostname:6379` — optional, for caching & rate limiting           |
| `RESEND_API_KEY`               | Transactional email (signup verification codes)                           |
| `ADMIN_API_SECRET`             | Auth for `/api/admin/*` endpoints                                         |
| `S3_ENDPOINT`                  | MinIO/S3 endpoint for file uploads                                        |
| `S3_BUCKET`                    | Bucket name (e.g., `mhe-uploads`)                                         |
| `S3_ACCESS_KEY_ID`             | S3 access key                                                             |
| `S3_SECRET_ACCESS_KEY`         | S3 secret key                                                             |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami analytics site ID                                                   |
| `NEXT_PUBLIC_UMAMI_URL`        | Umami instance URL                                                        |

---

## Dokploy MCP Server Setup

The Dokploy MCP (Model Context Protocol) server lets Claude Code manage Dokploy resources (apps, databases, domains, deployments) directly from the CLI/IDE without manual curl commands.

### Prerequisites

- **Node.js 18+** and `npx` available in your PATH
- **Dokploy API key** — generate one in the Dokploy panel under Settings > API
- **Dokploy API URL** — `http://<VPS_IP>:3000/api` (port 3000, NOT the Cloudflare-proxied domain)

### 1. Create `.mcp.json` in your project root

```json
{
  "mcpServers": {
    "dokploy": {
      "command": "npx",
      "args": ["-y", "@ahdev/dokploy-mcp"],
      "env": {
        "DOKPLOY_URL": "http://46.202.88.248:3000/api",
        "DOKPLOY_API_KEY": "<your-dokploy-api-key>"
      }
    }
  }
}
```

> **Important:** Use the direct IP (`http://46.202.88.248:3000/api`), not `https://dokploy.startupapps.cloud`. The Cloudflare-proxied domain has redirect loop issues with API calls.

### 2. Where to place the config

| Location                   | Scope                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------ |
| `<project-root>/.mcp.json` | Project-specific — shared with anyone who clones the repo (add to `.gitignore` if it contains secrets) |
| `~/.claude/settings.json`  | Global — available in all projects for this user                                                       |

For project-level (recommended), the file goes alongside your `package.json`. Make sure `.mcp.json` is in `.gitignore` since it contains the API key.

### 3. Restart Claude Code

After creating/editing `.mcp.json`, restart Claude Code (close and reopen the terminal or IDE extension). The MCP server starts automatically on next conversation.

### 4. Verify it works

In a Claude Code conversation, ask something like:

> "List all Dokploy projects"

Claude will use the `mcp__dokploy__project-all` tool. If the MCP server is loaded correctly, you'll see the tool call and results.

### 5. Available MCP Tools

| Category         | Tools                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Notes                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **Projects**     | `project-all`, `project-create`, `project-one`, `project-remove`, `project-update`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Full CRUD                      |
| **Applications** | `application-create`, `application-deploy`, `application-redeploy`, `application-start`, `application-stop`, `application-update`, `application-one`, `application-saveEnvironment`, `application-saveBuildType`, `application-saveGitProvider`, `application-saveGithubProvider`, `application-saveGitlabProvider`, `application-saveGiteaProvider`, `application-saveBitbucketProvider`, `application-saveDockerProvider`, `application-refreshToken`, `application-move`, `application-delete`, `application-markRunning`, `application-reload`, `application-cancelDeployment`, `application-cleanQueues`, `application-readAppMonitoring`, `application-readTraefikConfig`, `application-updateTraefikConfig`, `application-disconnectGitProvider` | Deploy, env vars, build config |
| **Domains**      | `domain-create`, `domain-delete`, `domain-update`, `domain-one`, `domain-byApplicationId`, `domain-byComposeId`, `domain-generateDomain`, `domain-validateDomain`, `domain-canGenerateTraefikMeDomains`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | SSL cert type, HTTPS, paths    |
| **PostgreSQL**   | `postgres-create`, `postgres-deploy`, `postgres-start`, `postgres-stop`, `postgres-update`, `postgres-one`, `postgres-remove`, `postgres-rebuild`, `postgres-reload`, `postgres-changeStatus`, `postgres-saveEnvironment`, `postgres-saveExternalPort`, `postgres-move`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Full DB lifecycle              |
| **MySQL**        | `mysql-create`, `mysql-deploy`, `mysql-start`, `mysql-stop`, `mysql-update`, `mysql-one`, `mysql-remove`, `mysql-rebuild`, `mysql-reload`, `mysql-changeStatus`, `mysql-saveEnvironment`, `mysql-saveExternalPort`, `mysql-move`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Same as PostgreSQL             |

### 6. What MCP does NOT cover

These require manual `curl` calls to `http://46.202.88.248:3000/api`:

| Resource         | API pattern                                                                                                    | Example                                                                                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Redis**        | `POST /api/redis.create`, `redis.deploy`, etc.                                                                 | `curl -X POST http://46.202.88.248:3000/api/redis.create -H "x-api-key: <key>" -H "Content-Type: application/json" -d '{"projectId":"...","name":"my-redis"}'` |
| **Compose**      | `compose.create`, `compose.update`, `compose.deploy`, `compose.delete`                                         | Used for MinIO and other multi-container services                                                                                                              |
| **SSH Keys**     | `sshKey.create`, `sshKey.one`, `sshKey.remove`                                                                 | Needed for private Git repos                                                                                                                                   |
| **Settings**     | `settings.readTraefikFile`, `settings.updateTraefikFile`, `settings.reloadTraefik`, `settings.readDirectories` | Traefik config management                                                                                                                                      |
| **Certificates** | `certificates.create`                                                                                          | Origin/custom SSL certs                                                                                                                                        |

### 7. Common Usage Examples

**Deploy an application:**

```
Claude, deploy the MHE app (applicationId: MTvypAjHqdhuGJjFg9rLJ)
```

**Set environment variables:**

```
Claude, set these env vars on the MHE app:
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
```

**Check application status:**

```
Claude, show me the MHE application details
```

**Create a domain:**

```
Claude, add domain mental-health-education.soloframehub.com to the MHE app with Let's Encrypt
```

### 8. Key Gotchas

- **NEVER set `certificateType: "none"`** on domains — this causes Dokploy to skip generating Traefik router configs, making the service completely inaccessible
- **Always use `certificateType: "letsencrypt"`** — works even behind Cloudflare proxy
- **Auth header is `x-api-key`**, not `Authorization: Bearer`
- **API is RPC-style** — all endpoints are `POST /api/<resource>.<action>`, not REST
- **Env vars format** — newline-separated `KEY=VAL\nKEY2=VAL2` string, not JSON object
