# ADR 0006 — Git is the manifest registry

- **Status:** Accepted
- **Date:** 2026-04-22

## Context
A separate config server (LaunchDarkly, custom, etc.) for prompts and manifests means a second deployment plane, second auth model, second backup strategy, and no PR-style review for prompt edits.

## Decision
All Blueprint §B primitives live under `verticals/<id>/` in the monorepo. Versioning is content-addressed (`prompts/coaching/v3.md` + sha256 in `manifest.lock`). Studio writes drafts to a Postgres draft store and **commits to git via a service account on publish**. (Hard Decisions §C.6.)

## Consequences
- **Good:** every change is a PR; rollback is `git revert`; same tooling for first-party + Studio tenants.
- **Acceptable cost:** Studio publish involves a git commit + CI + redeploy (not millisecond-fast).
- **Trigger to revisit:** Studio passes ~50 active tenants and git churn becomes a problem — then shard by tenant repo or move to a managed config store with git mirror.

## Killed alternatives
- DB-only prompt store.
- Promptlayer / Helicone as source of truth.
- Per-tenant prompt forks in DB.
