# AI/ML Systems

**Depth: [DEEP]** — All systems documented with file paths, function signatures, configuration, safety patterns, and integration points.

---

## System Map

```
User Input (text, voice, quiz, forum post)
    │
    ├─ Maia Classifier (/lib/ai/maia-client.ts)
    │   ├─ distress → none/mild/crisis + provider alert
    │   ├─ forum-topic → topic + routing (needs-provider/community-handles)
    │   ├─ content-quality → publish-ready flag
    │   └─ content-atomization → marketing extraction tags
    │
    ├─ Coaching Chat (/lib/ai/openai-coaching.ts)
    │   ├─ Crisis keyword detection (immediate/high/moderate)
    │   ├─ Context assembly from wellness profile
    │   ├─ LLM response (Claude Haiku via OpenRouter)
    │   └─ Crisis headers for frontend UI intervention
    │
    ├─ Forum Moderation (/lib/ai/forum-moderation.ts)
    │   ├─ Risk scoring (0-3)
    │   ├─ Category flagging
    │   └─ Redis-cached by SHA-256 hash
    │
    ├─ Quiz Reflection (/lib/ai/openai-flows.ts)
    │   └─ AI feedback on student reflections (Gemini 2.5 Flash)
    │
    ├─ Provider RAG (/lib/ai/rag.ts)
    │   ├─ Embedding: text-embedding-3-small (1536 dims)
    │   ├─ Retrieval: cosine similarity (JS, JSONB arrays)
    │   ├─ Synthesis: gpt-4o-mini
    │   └─ Session prep briefs
    │
    └─ Voice (/lib/services/voiceService.ts)
        ├─ STT: OpenAI Whisper (webm/mp3 input)
        └─ TTS: OpenAI tts-1 (alloy/echo/fable/onyx/nova/shimmer)
```

---

## 1. Maia — Unified AI Classification Layer

### Service Architecture
- **Location:** `/services/maia/` (Python FastAPI) + `/services/distress-classifier/`
- **Model:** Fine-tuned DistilBERT (255MB SafeTensors)
- **Runtime:** FastAPI (Python 3.11), Docker Swarm, CPU-only
- **Port:** 8001 (internal: `distress-classifier:8001`)

### Four Classifiers

**1. Distress Detection** (`maia.distress()`)
- Input: text + context (journal/assessment/forum/checkin)
- Output: `{ level: 'none'|'mild'|'crisis', confidence: 0-1, flag: boolean, crisis: boolean }`
- Thresholds: Crisis >= 85%, Mild 60-85%, None < 60%
- On crisis: creates `distressEvent` record, alerts provider

**2. Forum Topic Routing** (`maia.forumTopic()`)
- Input: discussion/post text
- Output: `{ topic, topic_confidence, routing: 'needs-provider'|'community-handles'|'informational', needs_provider: boolean }`
- Topics: anxiety, depression, relationships, medication, coping-strategies, crisis, general-wellness, optimization

**3. Content Quality Scoring** (`maia.contentQuality()`)
- Input: lesson section text
- Output: `{ quality: 'clinically-appropriate'|'needs-revision'|'potentially-harmful'|'overly-clinical'|'missing-validation', confidence, publish_ready: boolean }`

**4. Content Atomization** (`maia.atomization()`)
- Input: lesson section text
- Output: `{ tag: 'standalone-blog-excerpt'|'email-teaser'|'social-snippet'|'needs-full-context'|'not-extractable', confidence, extractable: boolean }`

### Client (`/lib/ai/maia-client.ts`)
- Unified interface for all 4 classifiers
- 3-second timeout with fail-safe defaults (returns safe values on any error)
- Text NEVER stored or logged (privacy-first, HIPAA)
- `maia.health()` for service status

### Safety Wrapper (`/lib/safety/checkDistress.ts`)
- `checkDistress(text, context)` — delegates to maia.distress()
- `isCrisisLevel(text, context)` — convenience boolean
- Integrated into: journal entries, assessment free-text, forum posts, coaching chat

### Service Endpoints
| Endpoint | Purpose |
|----------|---------|
| `POST /classify` | Original distress endpoint (backwards compat) |
| `POST /v1/classify/{classifier}` | Unified API |
| `GET /v1/health` | Per-model status |
| `GET /v1/metrics` | All classifier metrics |

### Deployment
- VPS: 46.202.88.248 (Hostinger)
- Directory: `/opt/distress-classifier/`
- Systemd service: `/etc/systemd/system/distress-classifier.service`
- Logs: `/opt/distress-classifier/classifier.log`
- Fine-tuning: `/services/distress-classifier/finetune.py` (3-6 hours on CPU)
- Evaluation: `/services/distress-classifier/evaluate.py`

---

## 2. Wellness Coaching Chat

### Engine (`/lib/ai/openai-coaching.ts`)

**Crisis Detection (keyword-based, Layer 1):**
- **Immediate:** "want to die", "kill myself", "ending my life", "suicide plan", "hang myself"
- **High:** "suicidal", "self-harm", "cutting myself", "no reason to live", "hopeless"
- **Moderate:** "can't take it anymore", "feeling trapped", "desperate", "falling apart"
- 13+ research-backed keywords per level

**System Prompt:**
- 100+ lines defining role, capabilities, limitations
- Trauma-informed principles: safety, choice, validation, pacing, cultural humility
- Evidence-based techniques: CBT, DBT, grounding, psychoeducation
- Explicit boundary statements (not a therapist, not emergency service)

**Crisis Response:**
- Pre-built clinically-reviewed responses (not LLM-generated)
- 988 Suicide & Crisis Lifeline prominently displayed
- Link to `/resources/crisis`
- Blocks further AI chat until acknowledged

**Functions:**
- `detectCrisisLevel(message)` -> 'none'|'moderate'|'high'|'immediate'
- Main chat handler: takes message + history + contextString, streams response
- Crisis headers: `X-Crisis-Detected`, `X-Crisis-Level` for frontend UI intervention

### Context Assembly (`/lib/services/profileContextService.ts`)

`getSafeContext()` builds de-identified wellness summary:
- Symptom categories (not raw scores)
- Goals and learning style
- De-identified demographics (age range, life stage, not name)
- Assessment summary (score, priority, recommended courses)
- Progress metrics (completed courses, streak, XP)
- Sanitizes user text against prompt injection patterns

### Voice (`/lib/services/voiceService.ts`)
- `synthesizeSpeech(text, voice?)` — OpenAI TTS, returns Uint8Array
- `transcribeAudio(buffer)` — OpenAI Whisper, returns string
- Voices: alloy, echo, fable, onyx, nova, shimmer

### UI
- **Flyout:** `/components/ai/flyout-chat.tsx` (380x520px, every page, context-aware greeting)
- **Coach page:** `/app/(default)/coach/coaching-chat.tsx` (full-screen)
- **Open button:** `/components/ai/open-advisor-button.tsx` (dispatches event)
- Features: streaming display, loading animation, crisis-level visual highlighting, voice recording UI

### API Route (`POST /api/ai/chat`)
- Rate limited (configurable via `AI_RATE_LIMIT`)
- Builds dynamic wellness context from user profile
- Streams responses (SSE)
- Crisis detection via headers
- Dual-layer safety: keyword detection (Layer 1) + Maia classifier (Layer 2)

---

## 3. Provider RAG System

### Engine (`/lib/ai/rag.ts`)

**Pipeline:**
1. **Embed query:** OpenAI `text-embedding-3-small` (1536 dims)
2. **Retrieve:** Cosine similarity in JavaScript against JSONB float arrays
3. **Synthesize:** gpt-4o-mini generates clinically-grounded answer
4. **Attribute:** Top-K chunks ranked by score, sources cited

**Functions:**
- `searchRAG(query, sourceFilter?)` — full pipeline
- `generateSessionPrep(patientId)` — clinical session brief
- `upsertEmbedding(...)` — store/update embeddings

**Knowledge Base:**
- All course descriptions + lesson summaries (380+ lessons)
- Standardized assessments: GAD-7, PHQ-9, PDSS-SR, OCD, PSQI, etc.
- Supports filtering by sourceType: 'course' | 'assessment' | 'clinical'

**Seed Script:** `/scripts/seed-embeddings.ts`
- One-time execution: chunks courses + assessments
- Generates embeddings via OpenAI API
- Upserts to `contentEmbedding` table
- Hard cap: 1000 embeddings loaded per query (bounds latency)

**Current Limitation:** JSONB float arrays with JS cosine similarity. Works but won't scale beyond ~5,000 embeddings. Planned migration to pgvector.

---

## 4. Forum Moderation (`/lib/ai/forum-moderation.ts`)

**System prompt:** Mental-health-aware moderation
- Distinguishes recovery discussion from harmful promotion
- Risk levels: 0 (safe), 1 (sensitive), 2 (concerning), 3 (severe)

**`moderateContent(text, contentType)`:**
- Redis caching by SHA-256 hash (avoids re-classifying identical content)
- Returns: riskLevel, flaggedCategories, reasoning, crisisResourcesNeeded
- Categories: self-harm, violence, harassment, misinformation, spam, crisis-signals
- 3-second timeout, fail-safe to allow
- Posts with riskLevel >= 2 blocked by middleware (returns 422 + crisis resources)

---

## 5. Quiz Reflection (`/lib/ai/openai-flows.ts`)

**Functions:**
- `chatJson(schema, systemPrompt, userPrompt)` — structured JSON response (Zod validated)
- `chatText(systemPrompt, userPrompt)` — free-form text
- `openaiQuizReflection(aiPrompt, context)` — AI feedback on student reflections
  - Uses QuizReflectionOutput Zod schema
  - Receives wellness context for personalization

---

## 6. Model Router (`/lib/ai/models.ts`)

| Task | Default Model | Env Override | OpenRouter |
|------|--------------|-------------|------------|
| coaching | `anthropic/claude-haiku-4-5` | `AI_MODEL_COACHING` | Yes |
| quiz-reflection | `google/gemini-2.5-flash` | `AI_MODEL_QUIZ_REFLECTION` | Yes |
| forum-moderation | `google/gemini-2.5-flash` | `AI_MODEL_FORUM_MODERATION` | Yes |
| tts | `tts-1` | `AI_MODEL_TTS` | No (direct OpenAI) |
| stt | `whisper-1` | `AI_MODEL_STT` | No (direct OpenAI) |
| RAG synthesis | `gpt-4o-mini` | (hardcoded) | No |

**Client Factory (`/lib/ai/client.ts`):**
- `aiClient` — routes through OpenRouter if `OPENROUTER_API_KEY` set, else direct OpenAI
- `voiceClient` — always direct OpenAI (OpenRouter doesn't support audio)
- `hasAIKey` — boolean check

**Token Logging:**
- `logTokenUsage(task, usage)` — structured log of prompt/completion/total tokens per task

---

## 7. Analytics Event Tracking (`/lib/analytics/umami.ts`)

Events tracked:
- Lesson: started, completed (with duration)
- Course: started, completed
- Quiz: started, completed (with score + pass)
- Coaching: session started/ended, message sent
- Onboarding: step completed, overall completed
- Assessment: generated
- Forum: visited

---

## Safety Architecture Summary

```
User text input
    │
    ▼
┌─ Layer 1: Keyword Detection ─────────────────┐
│  Immediate triggers → hard block + 988        │
│  High triggers → escalation                   │
│  Moderate triggers → caution                  │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌─ Layer 2: Maia ML Classifier ─────────────────┐
│  DistilBERT inference (3s timeout)            │
│  Crisis >= 85% confidence → provider alert    │
│  Fail-safe: returns 'none' on any error       │
│  Text NEVER stored (HIPAA)                    │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌─ Layer 3: Provider Coordination ──────────────┐
│  distressEvent created (metadata only)        │
│  Provider alert dashboard                     │
│  Resolve workflow with timestamps             │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌─ Layer 4: User-Facing Safety ─────────────────┐
│  Crisis modal with 988 number                 │
│  Link to /resources/crisis                    │
│  Blocks further AI interaction                │
│  Pre-built (non-LLM) crisis responses         │
└───────────────────────────────────────────────┘
```
