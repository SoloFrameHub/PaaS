# Fix Coolify build (npm ci / Nixpacks failure)

If the build fails with **npm ci** errors, **S3 secrets in build**, or **NIXPACKS_PATH** issues, use the **Dockerfile** build instead of Nixpacks.

---

## 1. Switch to Dockerfile build

1. In **Coolify** → your project → **CAA app** → **Build** (or **Settings**).
2. Set **Build Pack** to **Dockerfile** (not Nixpacks).
3. Set **Dockerfile location** to `Dockerfile` (root).
4. **Start Command:** leave **empty** so the image `CMD` runs (`node server.js`). If you had a custom start command (e.g. reindex + start), remove it; the Dockerfile does not run migrations or reindex (see step 2).
5. Save and **Redeploy**.

---

## 2. Run DB migration once

The Dockerfile does not run `db-migrate` or `reindex` at startup. Run the migration once:

- **Option A – Coolify “Run command” / Terminal:**  
  From the app’s shell (or a one-off container with the same image and env), run:
  ```bash
  npx tsx scripts/db-migrate.ts
  ```
  (Only if the running container has `node_modules` and `tsx`; the standalone image does not. So use Option B if needed.)

- **Option B – From your machine (with DATABASE_URL):**  
  Point `DATABASE_URL` at your Coolify Postgres (use the **public** URL if reachable, or a tunnel), then:
  ```bash
  DATABASE_URL="postgresql://..." npx tsx scripts/db-migrate.ts
  ```

- **Option C – Restore migrate in image:**  
  If you prefer migration on every start, we can change the Dockerfile to copy `tsx` + scripts and run migrate before `node server.js` (image gets larger).

---

## 3. Optional: keep Nixpacks and fix env

If you prefer to keep **Nixpacks**:

- In Coolify → **Environment**, mark **S3_*** and other **secrets** as **Runtime only** (not Build). That avoids “S3 secrets in build arguments” and build-time env issues.
- Set **NIXPACKS_NODE_VERSION** = `20` (or `22`) so the Node version matches your lockfile.
- Ensure **Install Command** is `npm ci` and **Build Command** is `npm run build` (Coolify/Nixpacks defaults).

The repo has a **Dockerfile** and **Next.js `output: 'standalone'`** so the Dockerfile path is the most reliable.
