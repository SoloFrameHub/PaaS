## Multi-server architecture directives

```text
You must architect and implement this platform as a SINGLE CODEBASE modular monolith that is deployable on:
1. one server initially, and
2. multiple servers later under Dokploy + Traefik + Docker Swarm-style deployment.

This is a hard architectural requirement.

## Core principle

Build a monolith that is horizontally deployable.
Do NOT build a monolith that assumes one machine, one process, one local disk, or one in-memory runtime.

The codebase remains one monorepo and one logical application platform.
The runtime may have multiple replicas across multiple servers.

## Non-negotiable deployment assumptions

Assume this platform will be deployed with:
- Dokploy as the deployment control plane
- Traefik as ingress / reverse proxy
- Docker containers
- one or more app replicas
- shared Postgres
- shared Redis
- shared object storage (S3-compatible / MinIO / R2)
- optional sidecars for specialized workloads

Do NOT assume Kubernetes.
Do NOT assume microservices.
Do NOT assume multi-region.
Do NOT assume per-tenant databases by default.

## What “multi-server ready” means

Your implementation must satisfy all of the following:

### 1. Stateless app layer
The app containers must be stateless.
No runtime-critical state may live only in process memory or on local disk.

That means:
- no local-only session storage
- no local-only uploaded files
- no local-only tenant config
- no local-only job state
- no assuming a request will return to the same replica

### 2. Shared state lives outside app replicas
All shared state must live in:
- Postgres for durable relational state
- Redis for cache, rate limiting, ephemeral coordination, optional queues
- object storage for uploads, artifacts, exports, and generated files
- git + database for manifests and published config state

### 3. Tenant routing must be runtime-resolved
Tenants and verticals must be resolved at request time based on:
- host/subdomain
- route context
- authenticated tenant membership
- manifest version assignment

Do NOT hardcode tenant-specific logic into deployments.
Do NOT require a separate deployment for every tenant unless explicitly assigned to an isolated premium topology.

### 4. Replicas must be safe
Any request should be able to land on any healthy app replica.
This requires:
- centralized session and auth state
- no unsafe in-memory caches for correctness
- idempotent workflows where possible
- explicit distributed locking when needed
- background jobs safe under multi-replica execution

### 5. Background jobs must be multi-replica safe
Jobs, workflows, cron tasks, and event subscribers must be designed so that:
- they do not double-run just because multiple replicas exist
- leader election, advisory locking, queue claiming, or unique execution keys are used where needed
- scheduled tasks are safe in distributed deployment

### 6. Local disk is not a source of truth
Local filesystem use inside containers is allowed only for:
- temporary files
- build/runtime internals
- short-lived processing

Local disk must NOT be the source of truth for:
- user uploads
- artifacts
- exports
- prompt packs after publish
- knowledge packs after publish
- tenant assets that must persist across redeploys

### 7. One codebase, multiple deployment tiers
Architect for three deployment tiers:
- pooled shared runtime
- isolated app/runtime
- fully dedicated environment

The default is pooled shared runtime.
The codebase must support all three without forks.

### 8. Premium isolation is a deployment choice, not a code fork
Licensed or regulated customers may later receive:
- isolated app replicas
- isolated services
- dedicated DB
- dedicated storage

This must be possible through deployment topology and tenant assignment, not by branching the app.

## Monorepo and package constraints

Implement as a pnpm monorepo modular monolith with:
- apps/*
- packages/platform-*
- adapters/*
- verticals/*
- infra/*
- tools/*
- services/* only for justified sidecars

No engine may import from apps or verticals.
Apps and verticals depend on packages, never the reverse.
Cross-engine effects should flow through contracts and events, not deep direct imports.

## Data and tenancy constraints

You must implement tenant-aware architecture from day one.

Requirements:
- tenant_id on all tenant-scoped tables
- Postgres RLS for tenant isolation
- Drizzle wrapper that refuses tenant-scoped access without tenant context
- cross-tenant leakage test in CI
- audit logging for state-changing operations
- usage metering by tenant
- manifest version pinned per tenant

Do NOT defer tenant enforcement to “later.”
Do NOT rely only on application-level filtering.

## Manifest and configuration constraints

A vertical must be defined by versioned configuration and assets, not code forks.

Published vertical state must resolve from:
- manifest.json
- manifest.lock
- prompt packs
- knowledge packs
- scenarios
- assessments
- artifacts
- navigation
- workflows
- branding/theme
- billing and entitlement config

Self-serve drafts may exist in the database, but publish must result in a git-tracked, versioned state.

## App design constraints

You must not build features in a way that breaks multi-server deployment.

Forbidden patterns:
- localStorage as the only persistence mechanism for critical product state
- server memory as the only storage for conversations, jobs, or workflow state
- single-instance cron logic with no distributed lock
- local path assumptions for uploads or generated exports
- tenant-specific environment variable sprawl for normal pooled tenants
- direct cross-engine imports that make extraction impossible later

Required patterns:
- persisted state in DB / Redis / object store as appropriate
- object storage URLs or storage abstraction for files
- distributed-safe scheduled jobs
- explicit cache invalidation strategy
- idempotent webhook handling
- stable health endpoints and readiness checks
- app boot that is replica-safe

## Deployment-aware implementation rules

Design the code and repo so that Dokploy deployment is straightforward.

You must provide:
- a clear separation between app containers, sidecars, and shared infrastructure
- environment variable grouping by concern
- healthcheck and readiness endpoints
- startup behavior that is safe under multiple replicas
- migration strategy that avoids multiple app replicas racing dangerously
- a recommendation for where DB migrations run
- a recommendation for separating build server and deploy servers later

Assume Traefik handles routing.
Assume the app may run with multiple replicas behind one hostname.
Assume licensed premium tenants may later get isolated app deployments.
Do NOT assume one Dokploy app per tenant.
Do NOT assume one server forever.

## Workflow / cron / event handling rules

Implement all recurring or asynchronous work with distributed execution safety.

For each scheduled or async system, specify:
- where it runs
- how duplication is prevented
- whether it uses Postgres, Redis, or n8n
- whether execution is idempotent
- how failures are retried
- how observability is captured

Use:
- Postgres LISTEN/NOTIFY + event tables for simple internal eventing
- Redis/BullMQ only when justified
- n8n for customer-visible or low-volume automation
- native workflow runtime for hot paths

## Infra philosophy

Prefer boring, founder-scale infrastructure.

Allowed:
- Dokploy
- Traefik
- Docker
- Docker Swarm style multi-node deployment
- Postgres
- Redis
- MinIO / S3-compatible storage
- Cloudflare in front
- selective sidecars

Not allowed in phase 1:
- Kubernetes
- microservices split
- multi-region
- service mesh
- per-tenant DB by default
- custom AI gateway
- generic no-code workflow builder

## What to produce in your implementation output

As you design and build, explicitly include:

1. the repo structure
2. the package/module boundaries
3. the tenancy enforcement model
4. the file/storage abstraction
5. the session/cache/job strategy for multi-replica safety
6. the Dokploy deployment model
7. the migration strategy from single-server to multi-server
8. the deployment tier model (pooled / isolated / dedicated)
9. the anti-patterns you are intentionally avoiding

If you make a design choice that weakens multi-server readiness, call it out explicitly and justify it.

## Final instruction

At every major architecture decision, prefer:
- horizontal deployability
- central shared state
- versioned manifests/config
- pooled-by-default multi-tenancy
- deployment isolation as a topology choice
- minimal operational burden

Do not optimize for theoretical scale at the cost of founder-speed.
Do not optimize for single-server simplicity in a way that blocks multi-server deployment later.
```


## Shorter version

If you want a more compact block to append to your existing prompt, use this:

```text
Important architecture constraint:

Build this as a modular monolith that is horizontally deployable across multiple servers under Dokploy + Traefik, even if initial deployment is on one VPS.

This means:
- app replicas must be stateless
- Postgres, Redis, and object storage are the shared state layer
- no local disk as source of truth
- no in-memory-only critical state
- sessions, files, manifests, jobs, and tenant config must survive replica changes
- background jobs / cron / workflows must be safe under multi-replica execution
- tenant routing must resolve at runtime, not via separate deployments by default
- premium isolated tenants are a deployment topology choice, not a code fork
- code must support pooled, isolated, and dedicated deployment tiers
- no Kubernetes, no microservices, no per-tenant DB by default

Design package boundaries, persistence, job execution, storage abstraction, and deployment conventions accordingly.
```


## Best way to use this

I’d use it in this order:

1. **Primary Claude Code prompt**: your implementation blueprint prompt.
2. **Immediately prepend** the long directive block above.
3. **Then add one explicit ask** at the end:
    - “Audit your proposed design against these multi-server directives and list any violations.”[^1][^2]

That last instruction is useful because it forces Claude to self-check for things like:

- local file dependence,
- unsafe cron behavior,
- sticky-session assumptions,
- one-instance build/deploy assumptions.[^3][^2]


## One extra line I strongly recommend

Add this single sentence near the end of your prompt:

```text
Before finalizing, produce a section called “Multi-server readiness audit” with PASS/FAIL for sessions, storage, jobs, routing, state, manifests, migrations, and deployment topology.
```

That gives you a fast review checklist every time Claude proposes architecture or code.[^2][^1]

If you want, I can now combine:

- your earlier **implementation prompt**
- plus these **multi-server directives**
into one **final Claude Code master prompt** you can paste in directly.

<div align="center">⁂</div>

[^1]: paas-creation.md

[^2]: Productized-Platform-Blueprint-Hard-Decisions-Edition.md

[^3]: PROJECT_OVERVIEW.md

