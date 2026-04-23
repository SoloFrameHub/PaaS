# ADR 0003 — Shared Postgres + RLS + dedicated-as-SKU

- **Status:** Accepted
- **Date:** 2026-04-22

## Context
DB-per-tenant by default would 50× our ops cost for negligible security gain over RLS in 95% of cases. Schema-per-tenant breaks down at Postgres limits and migration ergonomics. But some customers (clinical, enterprise) genuinely need data-plane isolation.

## Decision
One Postgres for pooled and isolated tiers; every row carries `tenant_id`; RLS enforced. Dedicated DB is a paid SKU triggered by signed PHI/BAA contracts only. (Hard Decisions §C.3, Implementation Blueprint §5, §6.)

## Consequences
- **Good:** new tenant = a row + a CNAME; cheap and fast.
- **Acceptable cost:** RLS bugs are catastrophic — mandatory tenant-leak CI test (ADR 0004).
- **Trigger to revisit:** a customer with their own compliance officer demands DB-per-tenant — build the SKU on first ask.

## Killed alternatives
- Schema-per-tenant.
- DB-per-tenant default.
