# ADR 0009 — Postgres outbox + LISTEN/NOTIFY; BullMQ when it hurts

- **Status:** Accepted
- **Date:** 2026-04-22

## Context
Kafka, RabbitMQ, SQS each carry significant operational tax. At our scale (sub-100 events/sec sustained), they are overkill.

## Decision
Events are rows in `event_outbox`; in-process workers listen via `pg_notify('event_outbox', id)`. One outbox per write-heavy engine. **No Kafka, no RabbitMQ, no SQS.** When throughput exceeds ~500/s sustained or a subscriber falls >30s behind, add BullMQ on Redis (already deployed). (Hard Decisions §C.4.)

## Consequences
- **Good:** no extra infra, transactional outbox by construction (insert + business write in same tx).
- **Acceptable cost:** `LISTEN/NOTIFY` payload is capped — IDs only, workers re-read the row.
- **Trigger to revisit:** sustained >500 events/sec or subscriber lag >30s.

## Killed alternatives
- Kafka.
- Redis Streams.
- Serverless event bridges.
