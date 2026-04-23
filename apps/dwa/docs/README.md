# /docs/ — Where to find things

Canonical, maintained documentation. One source of truth per topic.

## Start here

| Need | Read |
|------|------|
| What is this project, what's built, current priorities | [STATE.md](STATE.md) |
| Full platform capabilities (architecture, DB, API, features, AI/ML, content) | [_Full-Platform-Capabilities-Plans/INDEX.md](_Full-Platform-Capabilities-Plans/INDEX.md) |
| Nebius application strategy + implementation details | [v3-update-research-Nebius/](v3-update-research-Nebius/) |
| Strategic vision | [../.claude/VISION.md](../.claude/VISION.md) |
| Project directive (unchanging) | [../.claude/CLAUDE.md](../.claude/CLAUDE.md) |

## Live metrics

`STATE.md` contains an auto-generated metrics block. Regenerate after adding/removing courses, lessons, endpoints, or DB tables:

```bash
npm run snapshot
```

A **pre-push hook** runs this automatically and blocks `git push` if `STATE.md` is stale. Install it once per clone:

```bash
ln -sf ../../scripts/hooks/pre-push .git/hooks/pre-push
```

Do not hand-edit the metrics block — edits are overwritten on regenerate.

## Building courses

- [../.claude/COURSE_BUILD_BLUEPRINT.md](../.claude/COURSE_BUILD_BLUEPRINT.md) — 5-step canonical process
- [../.claude/COURSE_QUALITY_STANDARDS.md](../.claude/COURSE_QUALITY_STANDARDS.md) — A+ requirements
- [LESSON_INTERACTIVITY_PLAYBOOK.md](LESSON_INTERACTIVITY_PLAYBOOK.md) — component patterns
- [LESSON_CREATION_PROTOCOL.md](LESSON_CREATION_PROTOCOL.md) — per-lesson workflow

## Architecture Decision Records

- [adr/0001-repository-pattern.md](adr/0001-repository-pattern.md)
- [adr/0002-redis-rate-limiting.md](adr/0002-redis-rate-limiting.md)

## Topic-specific (still current)

| Topic | Doc |
|-------|-----|
| Backups | [BACKUP-POLICY.md](BACKUP-POLICY.md) |
| Load testing | [LOAD-TESTING.md](LOAD-TESTING.md) |
| Account deletion grace period | [ACCOUNT_DELETION_GRACE_PERIOD.md](ACCOUNT_DELETION_GRACE_PERIOD.md) |
| Future enhancements (backlog) | [FUTURE_ENHANCEMENTS.md](FUTURE_ENHANCEMENTS.md) |
| AI flow validation | [AI-FLOW-VALIDATION-REPORT.md](AI-FLOW-VALIDATION-REPORT.md) |
| Deploy (Coolify) | [DEPLOY-TO-COOLIFY.md](DEPLOY-TO-COOLIFY.md) |
| Google → Coolify migration | [MIGRATION-GOOGLE-TO-COOLIFY.md](MIGRATION-GOOGLE-TO-COOLIFY.md) |

## Archive

Historical reports, one-shot audits, dated plans, and superseded docs:

- [archive/2026-Q1/](archive/2026-Q1/)

If a topic isn't listed above and isn't in archive, it may still need triage. Prefer consolidating into `STATE.md` or `_Full-Platform-Capabilities-Plans/` over creating new top-level docs.
