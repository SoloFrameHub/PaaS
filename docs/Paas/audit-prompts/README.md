# Audit prompts — chat-by-chat index

This directory holds one markdown file per audit slice. Each file is a
self-contained prompt. Paste the file path into a new Claude Code chat
(e.g. "perform the audit defined in `docs/audit-prompts/05.md`") and
Claude will execute that slice end-to-end.

## Usage pattern

Every chat should start with the preamble in `00.md`, then proceed to
the numbered slice.

Suggested one-liner for starting a new chat:

> Read and follow `docs/audit-prompts/00.md`, then perform the audit
> defined in `docs/audit-prompts/NN.md`.

## Slice index

| # | Slice | Approx. files |
|---|---|---|
| 00 | **Session preamble** (setup + ledger helper) | — |
| 01 | DWA non-academy API routes | 44 |
| 02 | DWA `lib/` | 85 |
| 03 | DWA `components/` + `hooks/` + `types/` + `specs/` | 97 |
| 04 | DWA `services/` + `forum/` + `scripts/` + `docker/` + `public/` + `e2e/` + top-level configs | 65 |
| 05 | DWA `server/` (engine + data sweep) | 984 |
| 06 | DWA `_archive/` + `Audits/` + embedded docs/template projects | 790 |
| 07 | GTM API routes part 1 | 45 |
| 08 | GTM API routes part 2 | 46 |
| 09 | GTM `lib/` external integrations (attio, hunter, notion, pipedrive, brevo, badgr, whatsapp, nodebb, email, firebase-residue, redis, security) | 70 |
| 10 | GTM `lib/` domain logic (ai, analytics, api, forms, prompts, services, repositories, utils, validations, book, auth) | 72 |
| 11 | GTM `components/` part 1 | 93 |
| 12 | GTM `components/` part 2 | 93 |
| 13 | GTM `scripts/` + `seed-data/` + `e2e/` + `apps/forms/` sub-app + top-level configs | 120 |
| 14 | GTM `server/` (engine + data sweep) | 1595 |
| 15 | GTM `_archive/` + `docs/` + `content/` | 700 |
| 16 | Marketing static sites sweep (`apps/dwa/websites`, `apps/gtm/website`, `soloframehub-website-feb`) | 564 |
| 17 | Platform packages + adapters + tools re-verify | 59 |
| 18 | Verticals + infra + root configs + docs + `.github` | 65 |
| 19 | **Fix every CRITICAL / HIGH** + verification + final summary | (all) |

## Rules for every chat

1. `CLAUDE.md` "Audits, reviews, sweeps — mandatory discipline" is in
   effect.
2. **No subagents.** Every file is read by the main session.
3. **No scope narrowing.** Every file in the slice is READ or findings
   are filed.
4. **No budget decisions.** If the slice cannot fit in one chat,
   checkpoint to the ledger and stop — a follow-up chat resumes.
5. **Update the live ledger** (`docs/AUDIT-FULL-2026-04-23.md`) in
   place after each file or batch.
6. **Catalog new bug classes** as `B-NNN` entries in
   `docs/bug-patterns.md` with grep signatures.
7. **Print a ledger delta** at the end of every chat so the user can
   track progress.

## Key artifacts

- `docs/AUDIT-FULL-2026-04-23.md` — master ledger and findings list.
  Source of truth across chats.
- `docs/bug-patterns.md` — append-only catalog of discovered bug
  classes.
- `docs/source-repo-backports.md` — fixes still owed to the upstream
  source repos.
- `/tmp/mark-audited.py` — ledger helper. Recreated per-chat via
  prompt `00.md` if missing.

## Phase 1 findings already fixed

B-028 … B-038 were landed in Phase 1 (commit pending or already
landed). Slices that re-encounter these should verify the fix is
intact, not re-diagnose the pre-fix code.

## Outstanding CRITICAL / HIGH findings from Phase 1 (not yet fixed)

These are queued for slice 19, but any slice may land them earlier if
in scope:

- **CRITICAL PHI IDOR** in `apps/dwa/app/api/clinical-data/[componentType]/[componentId]/route.ts`
  — regular user can read any other user's clinical data via
  `?userId=<victim>`.
- **CRITICAL Polar webhook placeholder-secret** in
  `apps/gtm/app/api/webhook/polar/route.ts` — when `POLAR_WEBHOOK_SECRET`
  is unset, the webhook accepts forged signatures keyed to a
  hard-coded placeholder string.
- **HIGH B-039 JSONB silent dot-path writes** across 4 academy routes
  in `apps/dwa/app/api/academy/`.

Also, the user has been asked to rotate all secrets in
`/Volumes/ext-data/github/solofame-platform/.env.local` (OPENROUTER,
RESEND, DB, Redis, admin secrets, encryption keys) — independent of
this audit.
