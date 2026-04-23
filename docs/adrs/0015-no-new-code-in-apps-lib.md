# ADR 0015 — No new code in `apps/*/lib/`

- **Status:** Accepted
- **Date:** 2026-04-22

## Context
The single rule that prevents the platform from re-fragmenting after extraction. If `apps/<vertical>/lib/` is allowed to grow, the next person will paste a service into the wrong app and we'll be back to the duplication this monorepo exists to fix.

## Decision
All new shareable logic lives in a `packages/<engine>/` or `verticals/<id>/extensions/<pkg>/`. Nothing logic-bearing is added under `apps/<vertical>/lib/` after Day 22. CI-enforced via dependency-cruiser path rule.

## Consequences
- **Good:** every PR forces the question "is this an engine, an extension, or a vertical asset?".
- **Acceptable cost:** sometimes feels heavy for a 30-line helper — accept it.
- **Trigger to revisit:** never. Loosening this rule is the path back to the world we started in.

## Killed alternatives
- "Just for now" exceptions (always become permanent).
