# ADR 0005 — Manifest hot-reload is dev-only

- **Status:** Accepted (CHANGE REQUEST from prior decisions)
- **Date:** 2026-04-22

## Context
Mid-flight session state — in-progress assessments, roleplay turns, workflow runs — makes mid-deploy prompt swaps a class of bug we cannot afford. "Reload manifest without redeploy" gives near-zero benefit when Dokploy deploys are cheap.

## Decision
- **Dev:** manifest changes hot-reload on file save.
- **Prod:** manifest changes ship via the same git → CI → Dokploy redeploy as code. The `manifest-loader` validates `manifest.lock` at boot and freezes; runtime reload is forbidden.

(Implementation Blueprint §7.5.)

## Consequences
- **Good:** correctness > config velocity; in-flight sessions stay coherent.
- **Acceptable cost:** ~30s extra to ship a prompt change in prod.
- **Trigger to revisit:** a customer-facing case where 30s deploy latency materially hurts.

## Killed alternatives
- Live manifest reload via S3-poll or LISTEN/NOTIFY.
