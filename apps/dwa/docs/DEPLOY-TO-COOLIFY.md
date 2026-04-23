# Deploy this repo to Coolify

**Stack: Google-free.** Next.js + Lucia (Postgres) + OpenAI + optional MinIO/Redis/Trigger.dev on your VPS.

---

## 1. Add services in Coolify (Postgres, optional Redis, MinIO, Trigger.dev)

**You must add at least PostgreSQL** so the app can store users and profiles (unless you run with `NEXT_PUBLIC_MOCK_AUTH=true` for dev only).

See **[COOLIFY-SETUP-CHECKLIST.md](./COOLIFY-SETUP-CHECKLIST.md)** for what’s done vs missing. Then follow **[COOLIFY-SERVICES.md](./COOLIFY-SERVICES.md)** to:

- Create **PostgreSQL** (run `npx tsx scripts/coolify-create-postgres.ts`) and set `DATABASE_URL` on the app.
- Optionally create **Redis** (`npx tsx scripts/coolify-create-redis.ts`) and set `REDIS_URL`.
- Optionally add **MinIO** (Docker Compose in Coolify) and set `S3_*` env vars for file uploads.
- Optionally add **Trigger.dev** (Docker Compose) for background jobs.

---

## 2. Set environment variables on the app

In Coolify → your project → **app** → **Environment**, set the variables from **[COOLIFY-ENV.md](./COOLIFY-ENV.md)**. At minimum:

- `NEXT_PUBLIC_APP_URL` = your live app URL (no trailing slash).
- `NEXT_PUBLIC_MOCK_AUTH` = **`false`** for production.
- `DATABASE_URL` = Postgres connection string (from step 1).
- `OPENAI_API_KEY` = your OpenAI API key (as secret).

---

## 3. Run database migrations

After Postgres is created and `DATABASE_URL` is set, run the schema migration once (e.g. from your machine or a Coolify one-off):

```bash
npx tsx scripts/db-migrate.ts
```

Or ensure your deploy process runs this before `npm run start` if you add it to the start command.

---

## 4. Build: use Dockerfile if Nixpacks fails

If the build fails with **npm ci** or **NIXPACKS_PATH**, switch the app to **Dockerfile** in Coolify (Build Pack = Dockerfile, Dockerfile location = `Dockerfile`). Leave Start Command empty. See **[COOLIFY-BUILD-FIX.md](./COOLIFY-BUILD-FIX.md)** for details and how to run the DB migration once.

---

## 5. Start command and port

- **Start command:**  
  - **Nixpacks:** `npx tsx scripts/db-migrate.ts && npx tsx scripts/reindex-course-content.ts && npm run start`  
  - **Dockerfile:** leave empty (image runs `node server.js`). Run `db-migrate` once; see [COOLIFY-BUILD-FIX.md](./COOLIFY-BUILD-FIX.md).
- **Port:** `3000` (or set `PORT`).

The reindex script only checks that `server/data/content` exists and counts lesson files; it does not push course content to any database.

---

## 6. Push code and deploy

- Ensure Coolify is configured to deploy from **`SoloFrameHub/customer-acquisition-academy-vps`** (branch **`main`**).
- Push your code to GitHub; Coolify will build and deploy (or trigger a manual deploy).
- Point your domain to the app in Coolify and set `NEXT_PUBLIC_APP_URL` to that URL. Redeploy so the client gets the correct URL.

---

## 7. Verify

- Open the app URL and sign up / sign in (Lucia + Postgres).
- Test coaching chat (OpenAI), academy, and onboarding.
- `GET /api/health` should return `200` and `{ "status": "ok", "service": "soloframehub-academy" }`.

---

## What runs where

- **Course content:** Read from the repo at build time (`server/data/content`). No database for curriculum.
- **Users, profiles, sessions, roleplay:** Stored in **PostgreSQL** (and optional Redis for sessions).
- **File uploads (onboarding):** Stored in **MinIO** (or other S3-compatible) when `S3_*` env vars are set.
- **AI:** **OpenAI API** (coaching, roleplay, ICP, assessment, quiz reflection).

No Google/Firebase/Genkit dependencies.
