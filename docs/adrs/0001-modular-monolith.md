# ADR 0001 — Modular monolith over microservices

- **Status:** Accepted
- **Date:** 2026-04-22
- **Deciders:** platform team

## Context
At founder scale we cannot afford the operational tax of microservices (service mesh, per-service CI, distributed tracing, deploy orchestration). But we need rollback granularity per first-party vertical so a bad DWA deploy does not block a GTM ship.

## Decision
One Next.js + tRPC server per first-party vertical, packaged as one Docker image, deployed as one Dokploy app each. All `@platform/*` packages live in the same monorepo and are imported, not network-called. (Hard Decisions §C.1, Implementation Blueprint §3.)

## Consequences
- **Good:** zero RPC overhead, refactor across engines is a normal PR, single CI pipeline.
- **Acceptable cost:** every first-party vertical is rebuilt when an engine changes.
- **Trigger to revisit:** any single engine sustains >30% of a vertical's CPU, or a licensed customer demands service-level isolation a process boundary cannot satisfy.

## Killed alternatives
- Microservices — operational tax not justified at our scale.
- One shared backend serving all vertical front-ends — creates blast-radius coupling on deploys.
