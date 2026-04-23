# SoloFrame Platform

Monorepo for the SoloFrame Platform: engines (`@platform/*`), adapters (`@adapter/*`), first-party verticals (`verticals/*`), and deployable apps (`apps/*`).

See:
- `docs/adrs/` — architectural decisions.
- `docs/runbooks/` — deploy, rollback, tenant onboarding, incident.
- [Productized Platform Blueprint — Hard Decisions Edition](../PaaS/Productized%20Platform%20Blueprint%20%E2%80%94%20Hard%20Decisions%20Edition.md)
- [Implementation Blueprint — SoloFrame Platform](../PaaS/Implementation%20Blueprint%20%E2%80%94%20SoloFrame%20Platform.md)

## Requirements

- Node ≥ 20
- pnpm ≥ 9 (`corepack enable && corepack prepare pnpm@9.15.0 --activate`)

## Commands

```bash
pnpm install
pnpm -r build
pnpm -r typecheck
pnpm -r test
```
