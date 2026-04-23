# Platform Overview

**Last updated:** April 15, 2026  
**Version:** Production v3.0  
**Repo:** SoloFrameHub/mental-health-education-platform  
**Domain:** mental-health-education.soloframehub.com  
**Dokploy app ID:** MTvypAjHqdhuGJjFg9rLJ

---

## What This Is

A **HIPAA-compliant mental health education + provider coordination platform** built for the **practice licensing + revenue-share model** (B2B2C). Practices license the platform. You split subscription revenue with them. Practices promote to their patients — you don't do customer acquisition.

Two schools of content:
1. **Therapeutic school** — symptoms-based clinical education (CBT, DBT, ERP, nutritional psychiatry, CBT-I)
2. **Optimization school** — peak performance / human optimization (Five Pillars)

---

## Platform Metrics

| Asset | Count | Location |
|-------|-------|----------|
| Therapeutic courses | 24 | 5 clinical tracks |
| Optimization courses | ~10 | 5 pillars |
| Lesson MDX files | 337+ | `/server/data/content/` |
| External quiz JSONs | 421 | `/server/data/quizzes/` |
| Clinical assessments | 22 | `/server/data/assessments/` |
| Checklists | 31 | `/server/data/checklists/` |
| Thought record templates | 16 | `/server/data/thought-records/` |
| Tracking log templates | 21 | `/server/data/tracking-logs/` |
| Interactive lesson components | 36 | `/app/(default)/academy/components/` |
| Shared UI components | 73+ | `/components/` |
| Chart components | 18 | `/components/charts/` |
| Database tables | 18 | `/lib/db/schema.ts` |
| API endpoints | 48 | `/app/api/` |
| Frontend routes | 60+ | `/app/` |
| Type definition files | 13 | `/types/` |
| PDF presentations | 24 | `/public/presentations/` |
| Scripts | 12 | `/scripts/` |

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js (App Router + Turbopack) | 16.2.1 |
| **UI** | React | 19.2.3 |
| **Language** | TypeScript (strict mode) | 5.7.3 |
| **Styling** | Tailwind CSS + @tailwindcss/typography + @tailwindcss/forms | 4.1.18 |
| **Database** | PostgreSQL + Drizzle ORM | drizzle 0.38.0 |
| **Auth** | Lucia (session-based, Argon2 hashing) | 3.2.2 |
| **Caching** | Redis (ioredis, optional — disabled by default) | 5.8.2 |
| **AI/LLM** | OpenAI SDK via OpenRouter (multi-model routing) | openai 6.17.0 |
| **Distress classifier** | DistilBERT (FastAPI, Python 3.11, Docker) | Custom fine-tuned |
| **Content** | MDX (next-mdx-remote + @next/mdx + gray-matter) | 6.0.0 |
| **Charts** | Recharts + Chart.js | 3.7.0 / 4.4.7 |
| **Animation** | Framer Motion | 12.34.0 |
| **Icons** | Lucide React | 0.562.0 |
| **Drag/drop** | @dnd-kit | 6.3.1 |
| **PDF** | pdf-lib + pdf-parse | 1.17.1 |
| **Graphs** | @xyflow/react | 12.10.0 |
| **Validation** | Zod | 3.25.76 |
| **Data fetching** | TanStack React Query | 5.90.16 |
| **Date** | date-fns | 4.1.0 |
| **Sanitization** | isomorphic-dompurify | — |
| **Storage** | AWS S3 / Cloudflare R2 / MinIO (S3-compatible) | @aws-sdk 3.700.0 |
| **Forum** | Flarum (JSON:API integration) | External service |
| **Payments** | Polar.sh (sandbox mode) | — |
| **Analytics** | Umami (optional) | — |
| **Testing** | Vitest (unit) + Playwright (E2E) | 3.2.4 / 1.57.0 |
| **Deployment** | Dokploy (Docker, auto-deploys on push to main) | — |
| **Theme** | next-themes (dark mode, class-based) | — |

---

## Revenue Model

**Practice Licensing + Revenue Share:**
1. Practice pays upfront licensing fee ($X,000) + customization
2. Practice pays recurring OR revenue share on subscriptions (e.g., 70/30 split)
3. You don't do customer acquisition — practice promotes to their patients
4. Scales to 100+ practices without proportional cost increase

**Why defensible:** Practice has skin in the game. Recurring revenue. Network effect (10 practices x 200 patients = 2,000 users without your CAC). Practices do the marketing. Analytics moat = competitors need 1-2 years of data to replicate.

---

## Multi-Role Architecture

| Role | Access | Portal |
|------|--------|--------|
| **user** | Dashboard, academy, coach, community, settings | `/(default)/` |
| **provider** | Patient roster, assignments, alerts, RAG resources, session prep | `/(provider)/` |
| **admin** | Provider application review (approve/reject) | `/(admin)/` |

---

## Document Depth Ratings

Each document in this knowledge base is rated for completeness:

- **[DEEP]** — Every function, every field, every pattern documented
- **[SOLID]** — Core concepts and structure documented, edge cases may be missing
- **[SHALLOW]** — Listed/inventoried but not fully documented
- **[STUB]** — Placeholder, needs work

---

> **This is a living document.** Update it as the platform evolves. Flag sections that become stale.
