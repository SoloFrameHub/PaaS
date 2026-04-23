# AI/ML Systems — Current Production State

**Date:** April 2026  
**Status:** Production Deployment Reference  
**Purpose:** Complete technical inventory of all AI/ML systems deployed on the Digital Wellness Academy platform  

---

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    User-Facing Layer                             │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Flyout Chat  │  │ Coach Page   │  │ Voice Input/Output   │  │
│  │ (every page) │  │ (/coach)     │  │ (STT + TTS)          │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
│         │                 │                      │              │
│         └────────────┬────┘──────────────────────┘              │
│                      ▼                                          │
│              ┌───────────────┐                                  │
│              │ /api/ai/chat  │ ← Rate limited, streaming       │
│              └───────┬───────┘                                  │
│                      │                                          │
│         ┌────────────┼────────────┐                             │
│         ▼            ▼            ▼                             │
│  ┌─────────────┐ ┌────────┐ ┌──────────────┐                  │
│  │ Maia Client │ │ OpenAI │ │ Context      │                  │
│  │ (distress)  │ │ Router │ │ Assembly     │                  │
│  └──────┬──────┘ └───┬────┘ └──────────────┘                  │
│         │            │                                          │
└─────────┼────────────┼──────────────────────────────────────────┘
          │            │
          ▼            ▼
┌──────────────┐  ┌──────────────────────────────────────────────┐
│ Distress     │  │              Model Router                    │
│ Classifier   │  │                                              │
│ (FastAPI)    │  │  Coaching → Claude Haiku 4.5 (via OpenRouter)│
│ DistilBERT   │  │  Quiz     → Gemini 2.5 Flash                │
│ 255MB        │  │  Forum    → Gemini 2.5 Flash                │
│ CPU-only     │  │  TTS      → OpenAI tts-1 (direct)           │
│ 3s timeout   │  │  STT      → OpenAI Whisper (direct)         │
│              │  │  RAG      → gpt-4o-mini (direct)            │
└──────────────┘  └──────────────────────────────────────────────┘
```

---

## System 1: Distress Classifier (Maia)

### Overview
Real-time mental health crisis detection on all user-generated text. The core safety system.

### Technical Details

| Property | Value |
|----------|-------|
| **Model** | Fine-tuned DistilBERT (255MB) |
| **Runtime** | FastAPI (Python 3.11), Docker Swarm |
| **Inference** | CPU-only (no GPU dependency) |
| **Endpoint** | Internal: `distress-classifier:8001` |
| **Timeout** | 3-second hard limit |
| **Fail-safe** | Returns `none` if unavailable |
| **Privacy** | Zero-knowledge — input text never stored |

### Classification Levels

| Level | Confidence Threshold | Response |
|-------|---------------------|----------|
| **None** | < 60% | No intervention |
| **Mild** | 60–85% | Supportive resources surfaced |
| **Crisis** | ≥ 85% | Provider notification + 988 Lifeline escalation + UI intervention |

### Integration Points
- Journal entries (on submit)
- Assessment free-text responses (on submit)
- Forum posts (pre-publish screening)
- Coaching chat messages (before LLM processing)

### Unified Client (`/lib/ai/maia-client.ts`)
Single interface for multiple classification tasks:
- Distress detection (none/mild/crisis)
- Forum topic routing (needs-provider vs. community-handles)
- Content quality scoring
- Content atomization tagging (for marketing pipeline)

### Key Files
- Service: Dokploy-managed container
- Client: `/lib/ai/maia-client.ts`
- Safety integration: `/lib/safety/checkDistress.ts`
- API route: `/app/api/safety/classify`

---

## System 2: Wellness Coaching Chat

### Overview
Context-aware therapeutic companion with multi-modal interaction (text + voice), crisis gating, and trauma-informed design.

### Technical Details

| Property | Value |
|----------|-------|
| **Primary Model** | Claude Haiku 4.5 (via OpenRouter) |
| **Routing** | `/lib/ai/client.ts` → OpenRouter fallback to direct OpenAI |
| **Streaming** | Server-sent events for real-time response delivery |
| **Rate limiting** | Configurable via `AI_RATE_LIMIT` env var |
| **History** | Last 5–20 messages per conversation |

### Context Assembly (`/lib/services/profileContextService.ts`)

The coaching engine builds a dynamic wellness profile for each user:

```
User Profile Context
├── Primary symptoms + severity
├── Secondary symptoms
├── Wellness goals
├── Learning preferences + time commitment
├── Life context
│   ├── Age, life stage
│   ├── Living situation
│   └── Support network
├── Coping strategies
├── Therapy history
├── Triggers + time patterns
├── Personal reflections (user's own words)
└── Progress metrics
    ├── XP total
    ├── Course completion %
    └── Streak days
```

### Crisis Detection (Dual-Layer)

**Layer 1 — Keyword matching** (`/lib/ai/openai-coaching.ts`):
- **Immediate triggers:** "want to die", "kill myself", "ending my life", "suicide plan"
- **High triggers:** "suicidal", "self-harm", "don't want to be here", "hopeless"
- **Moderate triggers:** "can't take it anymore", "feeling trapped", "overwhelmed"

**Layer 2 — ML classification** (Maia):
- Every user message classified before LLM processes it
- Crisis detection via HTTP headers (`X-Crisis-Detected`, `X-Crisis-Level`)
- Frontend receives crisis state for UI intervention

**Crisis response:**
- Pre-built, clinically-reviewed responses
- 988 Suicide & Crisis Lifeline prominently displayed
- Link to `/resources/crisis` for comprehensive help
- Blocks further AI chat continuation until acknowledged

### Voice Capabilities

| Feature | Endpoint | Model |
|---------|----------|-------|
| Speech-to-Text | POST `/api/ai/voice/stt` | OpenAI Whisper |
| Text-to-Speech | POST `/api/ai/voice/tts` | OpenAI tts-1 |

- STT accepts webm/mp3 audio via MediaRecorder API
- TTS returns audio/mpeg stream with play/pause controls
- Voice endpoints always use direct OpenAI (OpenRouter incompatible)

### UI Components
- **Flyout chat** (`/components/ai/flyout-chat.tsx`): 380×520px floating widget, available on every page, context-aware greeting based on current page
- **Dedicated coach page** (`/app/(default)/coach/coaching-chat.tsx`): Full-screen coaching interface
- **Open advisor button** (`/components/ai/open-advisor-button.tsx`): Dispatches `open-flyout-chat` event

### Key Files
- Engine: `/lib/ai/openai-coaching.ts`
- Chat API: `/app/api/ai/chat/route.ts`
- Models: `/lib/ai/models.ts`
- Client factory: `/lib/ai/client.ts`
- Validation: `/lib/validations/ai.ts`
- Types: `/types/ai.ts`

---

## System 3: Provider RAG (Retrieval-Augmented Generation)

### Overview
Knowledge retrieval system that enables providers to query the full course library and clinical assessment content in natural language. Powers automated session prep briefs.

### Technical Details

| Property | Value |
|----------|-------|
| **Embedding Model** | OpenAI `text-embedding-3-small` (1536 dims) |
| **Storage** | `content_embedding` table (Drizzle ORM), JSONB float arrays |
| **Retrieval** | Cosine similarity in JavaScript (no pgvector) |
| **Synthesis** | gpt-4o-mini |
| **Auth** | Provider authentication required |

### Knowledge Base Contents
- All course descriptions + lesson summaries (380+ lessons across 5 clinical tracks)
- Standardized clinical assessments:
  - PHQ-9 (depression)
  - GAD-7 (anxiety)
  - PDSS-SR (panic disorder)
  - OCD screening
  - Additional assessment instruments

### API

**POST `/api/provider/rag`**
- Input: Query string (3–500 characters), optional source filter (`course` | `assessment` | `clinical`)
- Output: Synthesized answer + source citations + model used
- Requires provider session authentication

### Session Prep Feature
Generates clinical session briefs for providers:
- Synthesizes patient's recent course activity
- Surfaces relevant quiz scores and completion patterns
- References applicable clinical content
- Provides evidence-based talking points for appointments

### Database Schema (`content_embedding` table)

| Column | Type | Purpose |
|--------|------|---------|
| sourceType | text | 'course', 'assessment', 'clinical' |
| sourceId | text | Reference to source content |
| chunkIndex | integer | Position within chunked document |
| title | text | Human-readable chunk title |
| body | text | Full text content |
| embedding | jsonb | Float array (1536 dimensions) |
| metadata | jsonb | Additional context |

### Seed Script (`/scripts/seed-embeddings.ts`)
- One-time execution to populate embeddings
- Chunks all course descriptions + lesson content
- Chunks all clinical assessments
- Generates embeddings via OpenAI API
- Upserts to database with deduplication

### Key Files
- Engine: `/lib/ai/rag.ts`
- API: `/app/api/provider/rag/route.ts`
- Schema: `/lib/db/schema.ts` (`content_embedding` table)
- Seed: `/scripts/seed-embeddings.ts`

---

## System 4: Forum Moderation AI

### Overview
AI-powered screening of forum posts for safety, quality, and appropriate routing.

### Technical Details

| Property | Value |
|----------|-------|
| **Model** | Gemini 2.5 Flash |
| **Purpose** | Content safety screening, community guidelines compliance |
| **Integration** | Pre-publish post screening, feeds into Maia unified classifier |

### Key Files
- Engine: `/lib/ai/forum-moderation.ts`

---

## System 5: Multi-Model Router

### Overview
Centralized model selection and routing system that assigns the optimal model per task type.

### Model Assignments

| Task | Default Model | Override Env Var |
|------|--------------|-----------------|
| Coaching chat | `anthropic/claude-haiku-4-5` | `AI_MODEL_COACHING` |
| Quiz reflection | `google/gemini-2.5-flash` | `AI_MODEL_QUIZ_REFLECTION` |
| Forum moderation | `google/gemini-2.5-flash` | `AI_MODEL_FORUM_MODERATION` |
| Text-to-Speech | OpenAI `tts-1` | `AI_MODEL_TTS` |
| Speech-to-Text | OpenAI `whisper-1` | `AI_MODEL_STT` |
| RAG synthesis | `gpt-4o-mini` | (hardcoded in rag.ts) |

### Routing Logic (`/lib/ai/client.ts`)
1. Check for `OPENROUTER_API_KEY` → route through OpenRouter
2. Fall back to direct OpenAI API
3. Voice endpoints always bypass OpenRouter (incompatible)
4. Per-task model resolution via `/lib/ai/models.ts`

### Environment Variables
- `OPENAI_API_KEY` — direct OpenAI access
- `OPENROUTER_API_KEY` — multi-provider routing
- `MAIA_URL` — distress classifier service endpoint
- `DATABASE_URL` — Drizzle ORM connection
- `AI_MODEL_*` — per-task model overrides

---

## Known Limitations & Planned Upgrades

| Limitation | Current State | Planned Upgrade |
|-----------|--------------|-----------------|
| Embedding storage | JSONB float arrays (JS cosine similarity) | pgvector with HNSW index |
| Conversation memory | Capped at 20 messages, no persistence | Long-term conversation storage |
| RAG access | Provider-only | Extend to user-facing coaching chat |
| AI feedback | None collected | Thumbs up/down + free-text feedback |
| Conversation analytics | None | Usage patterns, satisfaction metrics |
| A/B testing | None | Prompt variant testing framework |
| Adaptive learning | Static course sequences | IRT + BKT + FSRS personalization |
| Risk scoring | Raw data only | Composite ML-powered risk tiers |
| Clinical NLP | Binary distress (none/mild/crisis) | Granular categorization (ClinicalBERT) |
