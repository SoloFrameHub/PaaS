# ADR 0002 — Two shells, not infinite

- **Status:** Accepted
- **Date:** 2026-04-22

## Context
First-party verticals need polish; Studio-built tenants need a tightly constrained surface. A single universal shell forces a lowest common denominator; per-vertical shells fork the UI and defeat the point of a platform.

## Decision
Two shells only:
- **`apps/shell-mosaic`** — Cruip-Mosaic-derived workhorse for first-party + licensed.
- **`apps/shell-studio-tenant`** — stripped-down generic runtime for Studio tenants.

(Hard Decisions §C.2.)

## Consequences
- **Good:** ~10× less UI maintenance than per-vertical shells.
- **Acceptable cost:** any "custom shell" request is a paid services engagement.
- **Trigger to revisit:** licensed customer pays for a custom shell.

## Killed alternatives
- One universal shell.
- Per-vertical custom shells.
