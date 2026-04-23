# syntax=docker/dockerfile:1.7
# Monorepo builder for a single Next.js app (apps/<APP>).
#
# Build locally:
#   docker build --build-arg APP=dwa -t solofame/dwa:local .
#   docker build --build-arg APP=gtm -t solofame/gtm:local .
#
# Dokploy picks this up automatically as the buildType=dockerfile target
# (see tools/dokploy/provision-03-apps.sh). The APP build-arg is passed
# through application.saveBuildType's dockerBuildStage / buildArgs.
#
# Requires:
#   - apps/<APP>/next.config.js has `output: 'standalone'`
#   - apps/<APP>/next.config.js has `outputFileTracingRoot: path.join(__dirname, '../..')`
#     so the standalone output traces workspace package files from root.

ARG NODE_VERSION=20-alpine
ARG PNPM_VERSION=9.15.0
ARG TURBO_VERSION=2.3.3

# ─── Base: pnpm + turbo globally available ─────────────────────────────
FROM node:${NODE_VERSION} AS base
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV COREPACK_DEFAULT_TO_LATEST=0
RUN corepack enable \
 && corepack prepare pnpm@${PNPM_VERSION} --activate \
 && npm install -g turbo@${TURBO_VERSION}

# ─── Stage 1: prune the monorepo to just <APP>'s dep closure ───────────
# `turbo prune` emits two directories:
#   out/json  — package.json + pnpm-lock.yaml + workspace manifests (deps-only)
#   out/full  — full source for the pruned subset
# Keeping them separate lets Docker cache the expensive `pnpm install`
# across source edits — the json layer changes only when deps change.
FROM base AS pruner
ARG APP
WORKDIR /repo
COPY . .
RUN turbo prune ${APP} --docker

# ─── Stage 2: install + build ──────────────────────────────────────────
# Install against the pruned manifests first (cache layer when only source
# changes), then drop full source on top and build. We DON'T split "deps"
# and "builder" into two stages because pnpm's per-workspace node_modules
# are symlinks into /pnpm/store — copying only the top-level node_modules
# across a stage boundary loses those symlinks and `next` ends up off PATH
# in the app's .bin. Keeping install + build in one stage preserves the
# workspace layout; the pnpm store cache-mount gives us the re-run win.
FROM base AS builder
ARG APP
WORKDIR /repo
COPY --from=pruner /repo/out/json/ ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile
COPY --from=pruner /repo/out/full/ ./
# `turbo prune --docker` does NOT copy arbitrary root files — only
# workspace manifests and source. Packages extend `tsconfig.base.json`
# from the root, so we copy it explicitly. Add other root files here
# if new packages start referencing them (e.g., a shared eslint
# config, .browserslistrc, etc.).
COPY tsconfig.base.json ./
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# `turbo run build --filter=<APP>` respects `dependsOn: ["^build"]` in
# turbo.json, so @platform/tenancy / @platform/identity / etc. emit
# their dist/ before the app's next build tries to resolve them.
# (`pnpm --filter=<APP> build` would skip workspace-dep builds entirely.)
RUN turbo run build --filter=${APP}

# ─── Stage 4: runtime ──────────────────────────────────────────────────
# Next.js standalone output ships its own minimal runtime tree. We copy it
# under /app and symlink server.js so the CMD is constant regardless of APP.
FROM node:${NODE_VERSION} AS runner
ARG APP
RUN apk add --no-cache libc6-compat tini \
 && addgroup --system --gid 1001 nextjs \
 && adduser --system --uid 1001 --ingroup nextjs nextjs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

WORKDIR /app
COPY --from=builder --chown=nextjs:nextjs /repo/apps/${APP}/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /repo/apps/${APP}/.next/static ./apps/${APP}/.next/static
COPY --from=builder --chown=nextjs:nextjs /repo/apps/${APP}/public ./apps/${APP}/public

# Fixed entrypoint so signals propagate correctly under Docker/Swarm.
RUN ln -s apps/${APP}/server.js /app/server.js

USER nextjs
EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
