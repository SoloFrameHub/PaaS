# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .

# NEXT_PUBLIC_* vars must be present at build time (inlined by Next.js)
ARG NEXT_PUBLIC_POLAR_MONTHLY_ID=a75bcdb7-34ad-4fc5-b878-b2309ea0611b
ARG NEXT_PUBLIC_POLAR_ANNUAL_ID=16521213-3716-4406-9437-35f85693b71e
ARG NEXT_PUBLIC_APP_URL=https://ai-solo-gtm-os.soloframehub.com
ARG NEXT_PUBLIC_FORUM_URL=https://ai-caa-forum.soloframehub.com
ENV NEXT_PUBLIC_POLAR_MONTHLY_ID=$NEXT_PUBLIC_POLAR_MONTHLY_ID
ENV NEXT_PUBLIC_POLAR_ANNUAL_ID=$NEXT_PUBLIC_POLAR_ANNUAL_ID
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_FORUM_URL=$NEXT_PUBLIC_FORUM_URL
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN apk add --no-cache curl
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Course content and quizzes (read at runtime)
COPY --from=builder --chown=nextjs:nodejs /app/server ./server
# Book manuscript chapters (read at runtime for dynamic rendering)
COPY --from=builder --chown=nextjs:nodejs /app/docs/manuscript ./docs/manuscript
# Master data (seed-data JSON)
COPY --from=builder --chown=nextjs:nodejs /app/seed-data ./seed-data
# Entrypoint: runs DB migration then starts server
COPY --from=builder --chown=nextjs:nodejs /app/scripts/docker-entrypoint.js ./entrypoint.js
# Seed scripts (called via admin API)
COPY --from=builder --chown=nextjs:nodejs /app/scripts/seed-demo-data.sql ./scripts/seed-demo-data.sql

USER nextjs

EXPOSE 3000

CMD ["node", "entrypoint.js"]