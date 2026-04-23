# ADR 0008 — Clinical instruments are platform-owned

- **Status:** Accepted
- **Date:** 2026-04-22

## Context
Validated clinical instruments (GAD-7, PHQ-9, PDSS-SR, OCD scales) have regulated scoring rules. A vertical that "tweaks" them invalidates the score and creates real liability.

## Decision
GAD-7, PHQ-9, PDSS-SR, OCD instruments live in `@platform/instruments`, immutable from a vertical's perspective. Verticals reference them via `instrumentRef`; they cannot fork. Quizzes (non-clinical) are vertical-owned. (Hard Decisions §B, Implementation Blueprint §3.2.)

## Consequences
- **Good:** clinical scores remain valid across every vertical that uses them.
- **Acceptable cost:** updating an instrument = platform PR + version bump.
- **Trigger to revisit:** a regulator publishes a revised version of an instrument — bump and require manifests to opt into the new version.

## Killed alternatives
- Per-vertical instrument copies.
