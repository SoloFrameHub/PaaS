# ADR 0012 — One Dokploy app per first-party vertical

- **Status:** Accepted
- **Date:** 2026-04-22

## Context
A single shared Next.js app for all verticals couples deploys: a bad DWA push blocks GTM. Per-vertical apps allow independent rollback, env vars, scaling, blue/green.

## Decision
One Dokploy app per first-party vertical (`gtm`, `dwa`, `tenant-runtime`, `studio`, plus a `workers` process). Pooled self-serve tenants are served by `tenant-runtime`. Isolated licensed tenants get a cloned Dokploy app from `apps/dwa` or `apps/gtm` template. (Hard Decisions §C.1, Implementation Blueprint §8.2.)

## Consequences
- **Good:** independent rollback/scaling; env-var isolation per vertical; Traefik blue/green works out of the box.
- **Acceptable cost:** N images instead of one; one Dokploy app to manage per vertical.
- **Trigger to revisit:** image build cost grows past ~10 min — split heavy modules into separate worker images.

## Killed alternatives
- One shared Next.js app.
- One Dokploy app per tenant (untenable for self-serve).
