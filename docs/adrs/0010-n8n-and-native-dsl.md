# ADR 0010 — n8n + native DSL hybrid for workflows

- **Status:** Accepted
- **Date:** 2026-04-22

## Context
Pure n8n's cold-start latency and DAG opacity are wrong for hot paths (onboarding, lesson completion → XP → badge). Pure custom is a year of UI work. Temporal is overkill ops cost.

## Decision
- **n8n** for cron facilitator posts, CRM sync, low-volume webhooks, customer-visible automations exposed in Studio.
- **Native `WorkflowTemplate` runtime** in `@platform/workflow-engine` for transactional/latency-sensitive flows, executed inline.

(Hard Decisions §C.5.)

## Consequences
- **Good:** n8n already runs (no new infra). Native DSL keeps hot paths fast.
- **Acceptable cost:** two engines for "workflow-shaped things" — discipline required on which to use.
- **Trigger to revisit:** native DSL exceeds ~200 LoC, or n8n becomes a UI bottleneck for customers — then evaluate Inngest or DBOS.

## Killed alternatives
- Temporal.
- Inngest.
- Pure n8n.
- Pure custom.
