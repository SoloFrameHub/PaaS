
## Slice 01 — DWA non-academy API routes
Coverage: 44-file slice per docs/audit-prompts/01.md. Every in-scope file READ end-to-end. 23 clean, 21 with findings. DWA is PHI=true, so HIPAA posture bumps several severities.

New bug classes filed: B-040 through B-043.

CRITICAL (1)
Provider-claim-any-patient — POST /api/provider/patients lets any provider insert an active providerPatient row with no consent/invite/admin gate, bypassing the invite-redeem flow. Full PHI access follows.
HIGH (7)
account/delete destroys profile JSONB — handler overwrites data instead of merging, so the 30-day grace-period recovery has nothing left to restore.
Stale /api/diagnostic in prod — dumps PHI key shape + raw error strings to any authenticated user; header says "DELETE THIS FILE".
/api/health?diag=ai-test unauthenticated — every hit calls OpenRouter/OpenAI; trivial cost-amplifier DoS.
Signin XFF-spoof rate-limit bypass (B-041) — uses leftmost X-Forwarded-For; attacker rotates header and rate limit effectively disappears.
Signin differential response for soft-deleted accounts — leaks "account exists but is scheduled for deletion" + timestamps.
Signup account enumeration (B-043) — "Email already used" reveals registrations.
Provider routes skip status='active' (B-040) — 4 sibling routes (patients GET/PATCH, assign POST, alerts resolve, session-prep GET) check link exists but not that it's still active; revoked providers keep PHI access.
MEDIUM (11)
Cron purge timing-unsafe bearer compare + no transaction; health/ai secret in query string (B-042); provider-invite race + no rate limit; /api/profile PUT lets user self-mark onboarding complete + rewrite questionnaire; /api/onboarding/complete unvalidated as casts; TTS no input cap; STT no size/MIME check; /api/demo-request unauthenticated + no rate limit + error echo; /api/forum/discussions uncapped pagination; /api/provider/rag logs PHI in query errors + no rate limit; /api/provider/profile POST silently demotes verified providers; /api/provider/session-prep no rate limit on LLM call.

LOW (1)
/api/admin/providers/[userId] reject path unconditionally sets role='user' (demotes admins if they ever applied as providers).
Plus 5 "Notes" (flagged, not graded)
Public OpenAPI doc, coupled CRON_SECRET/ADMIN_API_SECRET fallback, dead imports in delete route, fire-and-forget distress insert swallows failures, argon2 timing side-channel on !user.

Remediation status
All CRITICAL/HIGH/MEDIUM/LOW were fixed in a follow-up commit and backported:

Monorepo: all ✅
DWA source (mental-health-education-platform): all ✅
GTM source (customer-acquisition-academy-vps): mostly n/a; one item blocked — B-043 signup enumeration fix (sandbox refused the auth-flow edit, pending your explicit permission).
Notes list is deliberately un-remediated — flagged, not graded.

## Slice 02 — DWA lib/ — complete
Ledger delta
Before	After	Δ
Pending	6903	6818	−85
Clean (✅)	24	99	+75
Findings (🔍)	36	46	+10
Skipped-binary (⏭️)	2041	2041	0
All 85 files in apps/dwa/lib/** READ end-to-end by the main agent. No subagents, no scope narrowing, no partial reads.

Findings filed (3 new patterns, B-044..B-046)
ID	Severity	Pattern	Sites in DWA
B-044	HIGH	Dokploy-blind NEXT_PUBLIC_MOCK_AUTH production guard (depends on VERCEL_ENV)	lib/security.ts:66, lib/repositories/profileRepository.ts:19
B-045	HIGH	Path traversal via path.join(BASE, userId, ...) in seven fs-reading helpers	assessments.ts:23, checklists.ts:22, thought-records.ts:22, tracking-logs.ts:22, lessons.ts:95, services/quizService.ts:39,85,110, utils/lesson-engagement.ts:17
B-046	LOW	with-auth.ts logger-context IP uses leftmost x-forwarded-for (same family as B-041)	lib/api/with-auth.ts:75-77, 119-121
Plus five observations recorded without action (dead-code SSRF in ai/fetch-helpers.ts, RAG userId-scoping, mock-repo proto-pollution, flarum userId token fallback, pre-existing pg import in db/index.ts).

Remediations applied
Monorepo (apps/dwa/ + apps/gtm/):

apps/dwa/lib/utils/safe-path.ts — new safeResolveInside() helper (allow-list regex + path.resolve containment check).
B-044: removed VERCEL_ENV === 'production' conjunct from apps/dwa/lib/security.ts:64-74 and apps/dwa/lib/repositories/profileRepository.ts:17-28.
B-045: all 7 call sites converted to safeResolveInside().
B-046: apps/dwa/lib/api/with-auth.ts now uses getClientIp() from lib/security.
Bonus: apps/gtm/lib/security.ts had no production guard at all on the mock path — added one. Monorepo GTM was never safe from the same class of defect.
Source repos:

mental-health-education-platform: all 10 DWA files copied byte-for-byte from monorepo (security, repositories/profileRepository, api/with-auth, utils/safe-path [new], assessments, checklists, thought-records, tracking-logs, lessons, services/quizService, utils/lesson-engagement). Typecheck clean for all backported files.
customer-acquisition-academy-vps (GTM source / GTO OS): B-028 guard finally landed in lib/auth.ts (had been "pending" in source-repo-backports.md); B-044-style guard added to lib/security.ts. Typecheck clean.
Updates to docs
docs/AUDIT-FULL-2026-04-23.md — Slice 02 section added with full findings + ledger updated for all 85 files.
docs/bug-patterns.md — B-044, B-045, B-046 entries appended with why/sweep-grep/fix shape.
docs/source-repo-backports.md — slice-02 backport section added covering which changes go where.

## Slice 03 — audit complete
Coverage ledger
Before: total=9004 pending=6818 clean=99 findings=46 skipped=2041
After:  total=9004 pending=6721 clean=192 findings=50 skipped=2041
Delta: -97 pending → +93 clean, +4 findings. 0 slice-03 rows remain ⏳.

Every file in scope (76 apps/dwa/components/ + 3 apps/dwa/hooks/ + 13 apps/dwa/types/ + 5 apps/dwa/specs/) was read end-to-end by the main agent — no subagents, no skips, no scope narrowing.

Findings (cataloged as B-047, B-048)
B-047 (LOW, defense-in-depth) — apps/dwa/components/charts/realtime-chart.tsx:123,:131 used element.innerHTML = for numeric-only labels. No active XSS today (numbers only), but the sink is XSS-shaped. Swapped to .textContent.
B-048 (LOW) — apps/dwa/components/ui/sidebar.tsx:30-48 had two useEffect blocks with no deps array, re-registering document click/keydown listeners on every render. Added [sidebarOpen, setSidebarOpen].
apps/dwa/specs/auth.md drift (INFO) — spec described the pre-B-043 email-enumeration behavior as the contract. Rewrote the security invariants and error table to match the post-remediation reality and added an explicit "no user enumeration" invariant.
apps/dwa/components/charts/line-chart-09.tsx:18 name drift (INFO) — LineChart08Props / LineChart08 inside the -09 file (default export, so callers work either way). Renamed to LineChart09.
All observations (forum contentHtml type, DerivedMetric.formula RCE landmine if ever eval'd, tracks: any[] widening, hardcoded user email, PWA scope) are recorded in the audit doc as no-action notes because the live risk surfaces in files outside slice 03.

Remediation — Soloframe monorepo, mental-health-education-platform, customer-acquisition-academy-vps
All three fixes applied to the monorepo (commit pending at your discretion), and byte-identical copies landed in both source repos:

mental-health-education-platform: 3 code files + specs/auth.md
customer-acquisition-academy-vps: 3 code files (no specs/ in that repo)
tsc --noEmit under the slice 03 paths is clean in all three trees. The only remaining TS error in the DWA source is the pre-existing B-002 apostrophe bug in app/(marketing)/for-employers/page.tsx:248, already cataloged.

docs/bug-patterns.md now carries B-047 and B-048 long-form entries; docs/source-repo-backports.md has the per-repo slice-03 backport block; docs/AUDIT-FULL-2026-04-23.md has the slice-03 findings section and the coverage ledger is up to date.

## Slice 04 — DWA services/forum/scripts/docker/public/e2e/configs
Coverage
112 files read end-to-end (96 clean, 16 with findings)
Ledger: 288 clean / 66 findings / 6609 pending / 2041 skipped = 9004 total
10 new findings (B-049..B-058)
ID	Severity	Summary
B-049	CRITICAL	Plaintext root SSH password + sshpass + StrictHostKeyChecking=no in 3 committed files (scripts + runbook)
B-050	HIGH	ML classifier published on host interface with no auth + open CORS + no rate limit (crisis-detection layer)
B-051	MEDIUM	minio-compose.yml defaults to minioadmin/minioadmin with host-wide ports
B-052	MEDIUM	:latest Docker tags for Flarum + MinIO
B-053	LOW	Stale pre-monorepo apps/dwa/Dockerfile + nixpacks.toml (monorepo-only)
B-054	LOW	Dockerfile COPY … 2>/dev/null || true shell syntax
B-055	LOW	E2E test drift — pre-B-042 query-string auth test passed for wrong reason
B-056	INFO	Unused execSync import in docker-entrypoint.js
B-057	CRITICAL	Second, different leaked root SSH password in legacy lesson-content guide (cross-scope discovery)
B-058	MEDIUM	GH Actions workflow -o StrictHostKeyChecking=no (tracked, not auto-fixed — requires KNOWN_HOSTS wiring)
Remediation
Monorepo (solofame-platform): all 9 auto-fixable findings applied in place; stale files deleted.
DWA source (mental-health-education-platform): all applicable findings backported byte-for-byte to the same files (docs/source-repo-backports.md has the full list).
GTM source (customer-acquisition-academy-vps): no slice 04 files apply (spot-checked — no sshpass, no services/, no MinIO/Flarum refs).
Critical follow-ups for Mike (out of auto-remediation scope)
Rotate both leaked VPS root passwords on 46.202.88.248 — B-049 and B-057 credentials are in git history on both repos and must be considered burned.
Set PasswordAuthentication no in the VPS sshd_config so the next rotation is the last.
Consider git filter-repo history rewrite on both monorepo + DWA source to remove plaintext credentials from clones-forward.
Fix B-058 workflow MITM risk by wiring a KNOWN_HOSTS GH secret (see docs/bug-patterns.md#B-058 for fix shape).