# Credential rotation list — deferred until audit close-out

Produced 2026-04-24 by cross-repo `gitleaks detect` against three repos
with project `.gitleaks.toml` configs applied, plus the pre-existing
audit findings (B-006, B-049, B-057, B-058). Only credentials that
are **actually burned** (committed to git history or otherwise
distributed outside this machine) are listed here.

User has deferred rotation until the audit is done and the
recurrence-prevention gate is in place. As of this document, the gate
is: `gitleaks` pre-commit hook + `.gitleaks.toml` in all three repos,
`secret-scan` GH Actions workflow on solofame-platform, and the
"Secret handling — non-negotiable" section in [CLAUDE.md](../../CLAUDE.md).

When rotation happens, work through this file top-to-bottom. Every
entry resolved: strike through (don't delete) and add the date.

**Things explicitly NOT on this list (do not waste rotation time):**
- `.env.local` secrets in solofame-platform. `.env.local` is
  gitignored and `gitleaks detect` confirmed it is not in git history
  at any SHA. Those values are fine where they are; the rotation
  question only applies to credentials that have left the local
  machine.
- Firebase web API keys (`AIza...`) in legacy `apphosting.yaml`
  files. These are public-by-design per Firebase's own docs (gated by
  Firebase Security Rules, not secrecy). The files themselves should
  be deleted because Firebase is no longer used — that is a cleanup
  task, not a rotation task.
- GA4 `G-XXXXXXXXXX` measurement IDs. Public identifiers, not secrets.
- Chatwoot `websiteToken` values. Ship in client-side JS by design.
- LinkedIn client IDs. OAuth client IDs are public.
- The 18 `curl -H 'x-api-key: YOUR_API_KEY'` hits in
  `apps/gtm/docs/dokploy-conversion/DOKPLOY-API-REFERENCE.md` — all
  literal `YOUR_API_KEY` placeholders. Already allowlisted.

---

## CRITICAL — rotate and scrub from git history

These credentials are in the working tree and in git history on the
two source repos. Git history on a private repo is not private to
someone who ever cloned it (including Claude Code sessions, CI
caches, local clones elsewhere). History rewrite (`git filter-repo`)
+ rotation is the only remediation; a working-tree delete alone is
not sufficient.

### VPS root password for `46.202.88.248` (× 2 distinct values)

- `customer-acquisition-academy-vps` git history:
  `SUCCESSION-ACCESS-CREDENTIALS.md`, `REMOTE-CHANGES.md`,
  `SUCCESSION-DEVELOPMENT-GUIDE.md`, `SESSION-PLAYBOOK-2026-02-20.md`
  (B-049).
- `mental-health-education-platform` git history:
  `docs/reference/legacy-lesson-guides/LESSON-1-1-DEPLOYMENT-RECORD.md`,
  `LESSON-DEPLOYMENT-CHECKLIST.md`, `LESSON-1-1-EXECUTION-PLAN.md`
  (B-049 + B-057 — a different password than B-049).
- **Action:**
  1. Rotate root password on the VPS.
  2. Set `PasswordAuthentication no` in `/etc/ssh/sshd_config` so
     the rotated password is the last one — future auth is ed25519
     only.
  3. Update the GH Actions workflow
     `apps/dwa/.github/workflows/deploy-classifier.yml` to stop using
     `sshpass -p "$VPS_PASS"` + `-o StrictHostKeyChecking=no` (this
     is B-058 — not auto-fixed; needs a `KNOWN_HOSTS` secret).

### GitHub Personal Access Token (× 2)

- `customer-acquisition-academy-vps` —
  `SUCCESSION-ACCESS-CREDENTIALS.md:82, :85`. Two distinct PATs.
- **Action:** revoke both on github.com (Settings → Developer
  settings → PATs), then regenerate with minimum scope, then store
  in 1Password — not in a markdown file.

### OpenAI / OpenRouter API key

- `mental-health-education-platform` —
  `docs/SUCCESSION-ACCESS-CREDENTIALS.md:68`.
- **Action:** rotate in the OpenAI / OpenRouter dashboard. If it is
  the same key present in `.env.local` on the monorepo, replace that
  too (the key is burned either way).

### Dokploy API key

- `customer-acquisition-academy-vps` —
  `SUCCESSION-ACCESS-CREDENTIALS.md:57` (curl-auth-header).
- `mental-health-education-platform` — `docs/SUCCESSION-ACCESS-CREDENTIALS.md:123`,
  `docs/SUCCESSION-OPS-RUNBOOK.md:32,41,67,84,179`,
  `docs/ai-routing-sec-sucession.md:389`,
  `docs/reference/legacy-lesson-guides/WORKFLOW-API-DRIVEN-LESSON-CREATION.md:82,130,131,157,158`.
- **Action:** regenerate via Dokploy UI, replace in local
  `dk`/`curl` helper scripts.

### Resend, Gamma, N8N JWT keys (from pre-monorepo B-006)

- Listed in B-006 as having shipped in the same
  `SUCCESSION-*.md` / `SESSION-PLAYBOOK-*.md` / `N8N_DEMO_WORKFLOW.md`
  files. Treat all of them as burned.
- **Action:** rotate each in its dashboard (Resend, Gamma, N8N).

---

## Post-rotation: scrub git history

After the rotation values are new and working:

1. `git filter-repo --invert-paths --path <file>` on each source repo
   for the files above. One command per repo; pass all paths at once.
2. `git push --force-with-lease origin main` (force push is OK here —
   you own both repos, and the point is to remove the old SHAs).
3. Ask anyone with a clone to re-clone; old clones still have the
   pre-filter history.
4. Delete the caches: GitHub Actions run caches on both repos if any,
   and local `.git/fsck` pruning (`git gc --prune=now --aggressive`).
5. Re-run `gitleaks detect --log-opts="--all"` on each repo and
   confirm zero findings.

## Then: remove the now-stale "delete these lines after purge"
comments in both `.gitleaks.toml` allowlists (DWA source and GTM
source). The allowlist paths that currently include `_archive/` can
stay; the comment markers about pending purge can be removed.
