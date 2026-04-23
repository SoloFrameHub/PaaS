# Deployment Summary — 2026-02-11

## Overview

Deployed the standalone **Forms App** at `forms.soloframehub.com` and restored the **CAA App** after build failures caused by a missing `resend` dependency.

---

## Root Cause

`resend` was installed locally via `npm install` but the `package.json` change was **never committed**. All Docker builds on the VPS failed with:

```
Module not found: Can't resolve 'resend'
Import trace: ./lib/email/resend.ts → ./lib/forms/workflows.ts → ./app/api/forms/submit/route.ts
```

---

## Fixes Applied

### CAA App (`ai-solo-gtm-os.soloframehub.com`)

| Fix | Commit |
|-----|--------|
| Added `resend` to `package.json` + `package-lock.json` | `adcdb5c` |
| Added `resend` to `serverExternalPackages` in `next.config.js` | `9d6c642` |
| Excluded `apps/` from `tsconfig.json` and added `.dockerignore` | `7816f57` |
| Added `RESEND_API_KEY` env var in Dokploy | — |

**Status:** LIVE

### Forms App (`forms.soloframehub.com`)

| Fix | Details |
|-----|---------|
| Fixed `dockerContextPath` | Changed from `.` to `./apps/forms` (was using root `package.json` instead of forms app's) |
| Removed invalid memory limit | `"512m"` was being parsed as 512 bytes by Docker — set to `null` |
| Added `RESEND_API_KEY` env var | — |
| Standalone app created at `apps/forms/` | Own `package.json`, `Dockerfile`, `next.config.js`, `entrypoint.js` |

**Dokploy Config:**
- App ID: `InfJoXV0oFdIjl6DyZCoF`
- App Name: `app-hack-digital-array-8v3pnx`
- Domain ID: `9CRiYzZnauR9azDAdnKBP`
- Build: Dockerfile, context `./apps/forms`, build path `/apps/forms`
- Shares CAA PostgreSQL database

**Status:** LIVE

---

## Verified URLs

| URL | Status |
|-----|--------|
| `https://forms.soloframehub.com/forms/book-reviewer` | 200 |
| `https://forms.soloframehub.com/forms/beta-tester` | 200 |
| `https://forms.soloframehub.com/forms/caa-waitlist` | 200 |
| `https://forms.soloframehub.com/forms/academy-waitlist` | 200 |
| `https://forms.soloframehub.com/forms/contact` | 200 |
| `https://forms.soloframehub.com/api/health` | `{"status":"ok","app":"soloframehub-forms"}` |
| `https://ai-solo-gtm-os.soloframehub.com/api/health` | 200 |

---

## Commits Pushed

| Hash | Message |
|------|---------|
| `dfb61cd` | feat: add standalone forms app at `apps/forms/` |
| `7816f57` | fix: exclude `apps/` from CAA build and add `.dockerignore` |
| `9d6c642` | fix: add resend to `serverExternalPackages` for Turbopack resolution |
| `adcdb5c` | fix: add resend dependency to `package.json` |

---

## Lessons Learned

1. **Always verify dependencies are committed** — `npm install` locally doesn't mean `package.json`/`package-lock.json` changes are pushed.
2. **Dokploy `memoryLimit`** — Do NOT use `"512M"` or `"512m"`. Dokploy strips the suffix; Docker sees `512` bytes. Use `null` instead.
3. **Dokploy `dockerContextPath`** — For monorepo subdirectories, must be set to `./apps/forms` (not `.`), otherwise Docker context defaults to repo root.
4. **Dokploy deployment logs** — API key cannot read them. Use SSH: `ssh -i ~/.ssh/vps_backup root@46.202.88.248`.
5. **Dokploy `cleanCache`** — Doesn't always clear Docker layer cache. If cached layers are stale, push a small change to force cache invalidation.
