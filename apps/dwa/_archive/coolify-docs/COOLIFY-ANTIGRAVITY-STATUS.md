# Coolify & Antigravity Push/Index Status

**Generated:** 2026-02-01  
**Purpose:** Status of the project where Google Antigravity has been pushing course content and indexing to the database via Coolify and GitHub.

---

## 0. Course content vs database (pgvector)

- **Course content** lives on disk in `server/data/content` (markdown lessons). It is served from the filesystem at runtime. Nothing in this repo pushes course content to Postgres, pgvector, or any other database.
- **The database (and pgvector when you add it)** is for **user artifacts**: user profiles, onboarding data, **user-uploaded documents** (pitch decks, proposals), and RAG over those documents. The current RAG flow indexes **user docs** to Vertex AI (or in the VPS stack, to pgvector) and stores derived signals on the user profile. So you are correct: the DB is for user data and user documents, not for course content. The old Antigravity idea of “push course content to pgvector in Coolify” was a misalignment; this codebase does not do that, and the reindex script only verifies that lesson files exist on disk.

---

## 1. Coolify overview

- **Base URL:** `http://46.202.88.248:8000/api/v1` (from `.env.local`)
- **Server:** Single server `localhost` (Coolify host), reachable, IP `host.docker.internal`
- **Projects:** Platform, backups, **Customer Acquisition Academy** (project uuid `skkcooso08k0ogsg8ocw8gwk`)
- **Deployed app:** **caa-app** (Customer Acquisition Academy) on branch `main`

---

## 2. Deployment status (from API)

| Field | Value |
|-------|--------|
| **Status** | `in_progress` (at time of check) |
| **Commit** | `d9279c48c0ee9438d39a7c5a56b960a87cf054af` |
| **Commit message** | `fix: use relative imports in rag.ts to bypass build alias issues` |
| **Git source** | `https://github.com/SoloFrameHub/customer-acquisition-academy-vps.git` (branch `main`) |
| **Finished at** | `null` (deployment had not completed) |

So Coolify is deploying from **GitHub repo `SoloFrameHub/customer-acquisition-academy-vps`**, not from this local workspace path. This repo may be the same codebase (e.g. cloned as `soloframehub-v3`) or a different clone; the important point is **Coolify only sees what is on GitHub**.

---

## 3. Start command and “index to database”

Coolify is configured so that **every deploy** runs:

```bash
npx tsx scripts/reindex-course-content.ts && npm run start
```

So the intended flow is:

1. Push to GitHub (`SoloFrameHub/customer-acquisition-academy-vps`, `main`).
2. Coolify detects the push (or a manual deploy is triggered).
3. Coolify clones the repo, builds (e.g. Nixpacks → `npm ci` → `npm run build`).
4. On **start**, it first runs `scripts/reindex-course-content.ts` (push/index course content to the database), then `npm run start` (Next.js).

**In this workspace:** `scripts/reindex-course-content.ts` runs at container start. It does **not** use any Google products. It only verifies that `server/data/content` exists and counts lesson `.md` files, then exits 0. Course content is served from the filesystem at runtime; AI is provided via the OpenAI API.

---

## 4. GitHub vs local

- **Coolify is deploying:** commit `d9279c48` on `main` of `SoloFrameHub/customer-acquisition-academy-vps`.
- **This workspace:** `main` tracks `origin/main`; there are many **modified** files and some **untracked** files. Any changes not pushed to `origin/main` are **not** in the deployment Coolify is running.

So for “Antigravity pushing and indexing” to be reflected in Coolify:

- Content/code must be committed and pushed to the **same** GitHub repo and branch that Coolify uses (`main` of `SoloFrameHub/customer-acquisition-academy-vps`).
- The reindex script must exist in that repo at `scripts/reindex-course-content.ts` for the current start command to work.

---

## 5. Build progress (from last deployment logs)

At the time the Coolify API was queried, the deployment was still building:

- Nixpacks build (setup → install → build) was running.
- `npm ci` and `npm run build` had run.
- Next.js had **compiled successfully** (~17.9s); TypeScript check was in progress.
- No final success/failure for the **overall** deployment (e.g. reindex step + start) was in the captured logs.

So the deployment was **in progress**, not yet confirmed as fully successful or failed.

---

## 6. How to check current status yourself

1. **Coolify API (servers, projects, deployments):**
   ```bash
   npx tsx scripts/coolify-inspect.ts
   ```
   (Uses `COOLIFY_BASE_URL` and `COOLIFY_API_KEY` from `.env.local`.)

2. **Coolify UI:**  
   Open `http://46.202.88.248:8000` (or your Coolify URL), go to the **Customer Acquisition Academy** project → **caa-app** → **Deployments**. Check the latest deployment for:
   - Status: **Finished** vs **Failed** vs **In progress**
   - Logs for `reindex-course-content.ts` (stdout/stderr) and any errors before `npm run start`

3. **GitHub:**  
   Confirm that `SoloFrameHub/customer-acquisition-academy-vps` `main` has:
   - The commit Coolify reports (e.g. `d9279c48`).
   - The file `scripts/reindex-course-content.ts` if you expect reindex on every deploy.

---

## 7. Recommendations

1. **Reindex script**  
   `scripts/reindex-course-content.ts` is in this repo (content check only; no Google/Vertex). Push to the same GitHub repo Coolify uses so deploys run it.

2. **Push local changes to get them deployed**  
   To have Antigravity’s (or your) latest content and code reflected in Coolify, commit and push to `main` of `SoloFrameHub/customer-acquisition-academy-vps`. Then either wait for webhook-triggered deploy or trigger a deploy in Coolify.

3. **Watch the deployment to completion**  
   In Coolify, open the latest deployment and check:
   - Build finishes (Next.js build + TypeScript).
   - `npx tsx scripts/reindex-course-content.ts` runs and exits successfully (if the script is present).
   - `npm run start` starts the app and the app is reachable.

4. **If reindex fails**  
   Check Coolify deployment logs for:
   - Missing env (e.g. `DATABASE_URL`, Firebase/Vertex if still used).
   - Missing or wrong paths to course content.
   - Permissions or network errors talking to the database.

This document reflects the state at the time `scripts/coolify-inspect.ts` was run and the Coolify API was queried; run the script again and refresh the Coolify UI for current status.
