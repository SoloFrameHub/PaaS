# SoloFrameHub V3 — Solo GTM OS

## Stack

- **Framework**: Next.js 16.1.6 (Turbopack, standalone output)
- **Styling**: Tailwind CSS v4, @tailwindcss/postcss v4.0.3
- **Auth**: Lucia + Drizzle ORM + PostgreSQL
- **AI**: Multi-provider (OpenAI, Anthropic Claude, OpenRouter via `AI_PROVIDER` env var)
- **Storage**: S3/MinIO
- **Deployment**: Dokploy on VPS (46.202.88.248)
- **Background Jobs**: n8n (`n8n.soloframehub.com`) — ~~Trigger.dev~~ deprecated (too expensive)
- **Forum**: NodeBB (Docker compose, internal network)
- **Payments**: Polar.sh
- **Deprecated**: Ghost blog (removed), Trigger.dev (cost-prohibitive)

## Commands

```bash
npm run dev              # Dev server (Turbopack)
npm run build            # Production build
npm run lint             # ESLint
npm run test             # Vitest unit tests
npm run test:coverage    # Vitest with coverage
npm run test:e2e         # Playwright E2E tests
npm run test:all         # Unit + E2E
npm run validate-lessons # Validate MDX curriculum
```

## Key Conventions

- Use Dokploy MCP tools for deployment — never raw curl when an MCP tool exists
- Interactive MDX components must include `persistKey` prop (format: `{courseId}-{lessonId}-{descriptor}`)
- Docker entrypoint: `scripts/docker-entrypoint.js` runs DB migration before server
- Archived code goes to `_archive/` (excluded via tsconfig)
- NodeBB API requires `_uid` in every request (master token pattern)
- Assessment AI timeout: 60s (not default 20s)

## Environment Pitfalls

- If `__NEXT_PRIVATE_STANDALONE_CONFIG` is set, Next.js skips `next.config.js` → `unset` it
- If `NODE_ENV=production`, `npm install` skips devDeps → use `--include=dev`
- Dokploy `memoryLimit`: never use string like `"512M"` — use `null` or integer
- Never set Dokploy `certificateType: "none"` — it removes Traefik router configs entirely
