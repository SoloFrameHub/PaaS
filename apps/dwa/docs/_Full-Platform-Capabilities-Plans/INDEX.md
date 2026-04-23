# Digital Wellness Academy — Full Platform Knowledge Base

**Last updated:** April 15, 2026  
**Purpose:** Living reference for the complete platform — architecture, features, AI/ML, content, business logic, and strategic plans.  
**Rule:** Update these docs when the platform changes. Flag sections that become stale.

> **Live platform counts** (lessons, quizzes, endpoints, tables) are auto-generated in [../STATE.md](../STATE.md). Narrative references to counts inside these docs may drift — trust STATE.md for current numbers.

---

## Documents

| # | Document | Depth | What It Covers |
|---|----------|-------|---------------|
| 00 | [OVERVIEW](00-OVERVIEW.md) | **[DEEP]** | Executive summary, platform metrics, tech stack, revenue model, role architecture |
| 01 | [ARCHITECTURE](01-ARCHITECTURE.md) | **[SOLID]** | System architecture, Docker, CI/CD, env vars (60+), Next.js/TS/Tailwind config, testing, PWA, logging, storage, Redis, styling |
| 02 | [DATABASE-API](02-DATABASE-API.md) | **[DEEP]** | All DB tables with columns, all API endpoints with methods/auth, validation schemas, middleware (auth/moderation/errors). Live counts in [STATE.md](../STATE.md). |
| 03 | [FEATURES](03-FEATURES.md) | **[SOLID]** | Layout hierarchy, landing page, 9-step onboarding, dashboard, academy, coach, community/forum, provider portal, settings, tracking, wellness alerts |
| 04 | [AI-ML-SYSTEMS](04-AI-ML-SYSTEMS.md) | **[DEEP]** | Maia (4 classifiers), coaching chat (dual-layer safety), RAG, forum moderation, quiz reflection, model router, voice, analytics events, safety architecture |
| 05 | [CONTENT-CURRICULUM](05-CONTENT-CURRICULUM.md) | **[DEEP]** | All 5 tracks + optimization pillars, every course listed, lesson/quiz/assessment/checklist/thought-record/tracking-log schemas, 36 interactive components, evidence grading |
| 06 | [BUSINESS-LOGIC](06-BUSINESS-LOGIC.md) | **[SOLID]** | Profile system (repository pattern), wellness scoring, alerts, actions, onboarding assessment, personalization, content loading, PDF generation, forum client, security, auth, scripts |
| 07 | [ML-STRATEGY](07-ML-STRATEGY.md) | **[DEEP]** | Nebius application ML plan — deployed systems, GPU roadmap (adaptive learning, risk stratification, ClinicalBERT, content intelligence), data flywheel, GPU credit allocation, competitive positioning, implementation timeline |
| 08 | [ML-RESEARCH-LANDSCAPE](08-ML-RESEARCH-LANDSCAPE.md) | **[DEEP]** | Adaptive learning models (BKT, IRT, FSRS), Socratic AI tutoring, clinical safety models, learning analytics ML, RAG best practices, competitive landscape, fine-tuning vs RAG decision framework, 25+ cited papers |

---

## Depth Ratings

- **[DEEP]** — Every function, field, and pattern documented. Ready to build from.
- **[SOLID]** — Core concepts and structure documented. Edge cases may need investigation.
- **[SHALLOW]** — Listed/inventoried but internals not fully documented.
- **[STUB]** — Placeholder, needs significant work.

---

## What's Still Shallow (Needs Deepening in Future Sessions)

| Area | Current State | What's Missing |
|------|-------------|----------------|
| WellnessProfile type | Referenced but not fully documented | Full 30+ field type definition from `/types/wellness-profile.ts` |
| Personalization algorithm | Mentioned in 06 | Exact weighting, ranking formula, edge case handling |
| CSP policy | Mentioned as "strict defaults" in 01 | Full Content-Security-Policy string |
| PWA manifest | Flagged as missing in 01 | No manifest.json exists — needs creation for installability |
| Dashboard widget implementations | Listed in 03 | Exact data sources, rendering logic per widget |
| E2E test coverage | Config documented in 01 | What tests exist in `/e2e/`, what's covered vs. gaps |
| Polar.sh payment integration | Env vars in 01 | How payments actually flow, webhook handling, plan management |
| Flarum setup/config | Client documented in 06 | Flarum server setup, extensions, SSO integration details |
| Design tokens | Colors listed in 01 | Full spacing scale, component patterns, responsive breakpoints |
| Error boundary behavior | Routes listed in 03 | What each error boundary renders, recovery strategies |
| ADR (Architecture Decision Records) | 2 exist in `/docs/` | Content of 0001-repository-pattern.md, 0002-redis-rate-limiting.md |

---

## Related Documents (Outside This Directory)

| Document | Location | Purpose |
|----------|----------|---------|
| CLAUDE.md | `/.claude/CLAUDE.md` | Strategic project context for Claude Code |
| VISION.md | `/.claude/VISION.md` | Full strategic vision |
| Course Build Blueprint | `/.claude/COURSE_BUILD_BLUEPRINT.md` | 5-step course creation process |
| Course Quality Standards | `/.claude/COURSE_QUALITY_STANDARDS.md` | A+ quality requirements |
| Nebius Application Strategy | `/docs/v3-update-research-Nebius/Nebius AI Discovery Award 2026...md` | Award application framework |
| Distress Classifier Implementation | `/docs/v3-update-research-Nebius/01_DISTRESS_CLASSIFIER_IMPLEMENTATION.md` | Production deployment details |
| Cloud Architecture Strategy | `/docs/v3-update-research-Nebius/02_CLOUD_ARCHITECTURE_STRATEGY.md` | Google Cloud migration plan |
| AI Systems Current State | `/docs/v3-update-research-Nebius/05_AI_SYSTEMS_CURRENT_STATE.md` | Technical AI inventory (detailed) |
| Complete Platform Capabilities | `/docs/_4-15COMPLETE_PLATFORM_CAPABILITIES.md` | Earlier comprehensive audit (1300 lines) |

---

## How to Use This Knowledge Base

1. **Starting a new conversation about this project?** Read `INDEX.md` first to orient.
2. **Building a new feature?** Check `02-DATABASE-API.md` for schema + endpoints, `06-BUSINESS-LOGIC.md` for service patterns.
3. **Working on AI/ML?** Read `04-AI-ML-SYSTEMS.md` (current state) + `07-ML-STRATEGY.md` (roadmap) + `08-ML-RESEARCH-LANDSCAPE.md` (research).
4. **Building courses?** Read `05-CONTENT-CURRICULUM.md` + `/.claude/COURSE_BUILD_BLUEPRINT.md`.
5. **Deploying or configuring?** Read `01-ARCHITECTURE.md` for env vars, Docker, CI/CD.
6. **Pitching to Nebius?** Read `07-ML-STRATEGY.md` — it's structured as the pitch document.
