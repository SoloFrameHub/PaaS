# Architecture Decision Records

One file per accepted decision. New ADRs get the next number. Use [`0000-template.md`](./0000-template.md) as the starting point.

| # | Title |
|---|---|
| [0001](./0001-modular-monolith.md) | Modular monolith over microservices |
| [0002](./0002-two-shells.md) | Two shells, not infinite |
| [0003](./0003-shared-postgres-rls.md) | Shared Postgres + RLS + dedicated-as-SKU |
| [0004](./0004-tenant-enforcement-data-boundary.md) | Tenant enforcement at the data boundary |
| [0005](./0005-manifest-hot-reload-dev-only.md) | Manifest hot-reload is dev-only |
| [0006](./0006-git-is-the-manifest-registry.md) | Git is the manifest registry |
| [0007](./0007-fixed-roles-and-events.md) | Roles and events are fixed registries |
| [0008](./0008-clinical-instruments-platform-owned.md) | Clinical instruments are platform-owned |
| [0009](./0009-postgres-outbox-no-kafka.md) | Postgres outbox + LISTEN/NOTIFY; BullMQ when it hurts |
| [0010](./0010-n8n-and-native-dsl.md) | n8n + native DSL hybrid for workflows |
| [0011](./0011-dokploy-runtime-control-plane.md) | Dokploy is the runtime control plane |
| [0012](./0012-one-dokploy-app-per-vertical.md) | One Dokploy app per first-party vertical |
| [0013](./0013-openrouter-primary-native-fallback.md) | OpenRouter primary, native fallback |
| [0014](./0014-pgvector-default.md) | pgvector default; adapter ready for Qdrant |
| [0015](./0015-no-new-code-in-apps-lib.md) | No new code in `apps/*/lib/` |
