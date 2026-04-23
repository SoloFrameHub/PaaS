# ADR 0007 — Roles and events are fixed registries

- **Status:** Accepted
- **Date:** 2026-04-22

## Context
The two cross-cutting names that, if left ungoverned, will sprawl across 50 tenants and become unrefactorable: role names and event names. Custom roles per tenant break role-based UI; custom event names break analytics + billing legibility.

## Decision
- **Roles:** fixed enum in `@platform/contracts/roles` — `super_admin | tenant_admin | operator | member | external_partner`. Verticals enable roles, do not define them. Custom roles for licensed tenants are a case-by-case ask, not a primitive.
- **Events:** fixed enum in `@platform/contracts/events`. New names require a platform PR.

(Hard Decisions §B, Implementation Blueprint §7.2.)

## Consequences
- **Good:** analytics dashboards and billing meters work across all tenants without per-tenant adapters.
- **Acceptable cost:** new event = platform PR (not a tenant self-serve edit).
- **Trigger to revisit:** legitimate request for a custom role from a paying licensed tenant — handle as scoped extension, not as opening the registry.

## Killed alternatives
- Free-form role strings.
- Per-tenant event vocabularies.
