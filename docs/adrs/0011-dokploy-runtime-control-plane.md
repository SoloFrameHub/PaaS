# ADR 0011 — Dokploy is the runtime control plane

- **Status:** Accepted
- **Date:** 2026-04-22

## Context
We need a runtime control plane (apps, databases, env vars, domains, SSL) without the sprawl of Kubernetes. Terraform-only would mean reinventing app lifecycle. Pure Dokploy would mean no reproducibility for base infra.

## Decision
- **Dokploy** owns: Dokploy apps, databases, Redis, compose stacks, domain records, env vars, deploys.
- **Terraform** owns: VPS base provisioning, dedicated-tier tenant VPS, cloud DNS zones, S3/R2 buckets.

No CI auto-apply for Terraform in Phase 1. (Implementation Blueprint §9.)

## Consequences
- **Good:** zero Kubernetes; Dokploy UI + API for ops; Terraform stays small.
- **Acceptable cost:** Dokploy state isn't in git (config drift risk between Dokploy UI and `infra/dokploy/` reference yamls).
- **Trigger to revisit:** the reference yamls drift from production for >2 weeks — then pin Dokploy state via API export to git.

## Killed alternatives
- Kubernetes.
- All-Terraform (apps, dbs, etc.).
- All-Dokploy (no IaC for base nodes).
