# Multi-Model AI Methodology

> Portable pattern for Next.js + OpenAI SDK projects.
> Born from the Customer Acquisition Academy, refined for the Mental Health Education Platform.

---

## The Problem

Most projects start with a single `new OpenAI(...)` instance and one model for everything.
That works early on, but it has two costs:

1. **Quality ceiling** — a cheap model handles coaching conversations the same way it
   handles JSON extraction. Sensitive or nuanced tasks deserve a stronger model.
2. **Cost floor** — if you upgrade to a premium model to fix quality, *every* call gets
   expensive, even the ones that were fine on the cheap model.

## The Idea

Route each AI task to the model best suited for it, through a single provider gateway
(OpenRouter), while keeping the OpenAI SDK as the universal interface.

```
┌─────────────┐
│  Your App    │
│              │    OpenAI SDK
│  aiClient ───┼──► OpenRouter ──► Claude (coaching)
│              │                ──► GPT-4o-mini (JSON/structured)
│              │                ──► Gemini Flash (bulk text)
│              │
│  voiceClient─┼──► OpenAI direct ──► TTS (tts-1)
│              │                   ──► STT (whisper-1)
└─────────────┘
```

## Architecture (3 files)

### 1. `lib/ai/client.ts` — Centralized Client Factory

Two singleton clients:

| Client | Routes through | Why |
|--------|---------------|-----|
| `aiClient` | OpenRouter (when `OPENROUTER_API_KEY` is set), else direct OpenAI | Text/chat completions — supports any model on OpenRouter |
| `voiceClient` | Direct OpenAI always | Audio endpoints (TTS, STT) are OpenAI-only — OpenRouter doesn't proxy them |

```typescript
import OpenAI from 'openai';

function createAIClient(): OpenAI {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (openRouterKey) {
    return new OpenAI({
      apiKey: openRouterKey,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || '',
        'X-Title': 'Your App Name',
      },
    });
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });
}

function createVoiceClient(): OpenAI {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });
}

export const aiClient = createAIClient();
export const voiceClient = createVoiceClient();
export const isOpenRouter = !!process.env.OPENROUTER_API_KEY;
```

**Key detail:** OpenRouter's API is wire-compatible with OpenAI's — same SDK, same
`chat.completions.create()` call, you just change the `baseURL` and pass OpenRouter
model IDs (e.g. `anthropic/claude-sonnet-4-5` instead of `gpt-4o-mini`).

### 2. `lib/ai/models.ts` — Task-Specific Model Resolution

Define your AI task types, then map each to a model with a 3-tier override chain:

```
Task-specific env var  →  Legacy env var  →  Hardcoded default
```

```typescript
export type AITask = 'coaching' | 'reflection' | 'flow-text' | 'tts' | 'stt';

const MODEL_CONFIG: Record<AITask, { envVar: string; legacyEnvVar?: string; fallback: string }> = {
  coaching:    { envVar: 'AI_MODEL_COACHING',   legacyEnvVar: 'OPENAI_CHAT_MODEL', fallback: 'gpt-4o-mini' },
  reflection:  { envVar: 'AI_MODEL_REFLECTION', legacyEnvVar: 'OPENAI_FLOW_MODEL', fallback: 'gpt-4o-mini' },
  'flow-text': { envVar: 'AI_MODEL_FLOW_TEXT',  legacyEnvVar: 'OPENAI_FLOW_MODEL', fallback: 'gpt-4o-mini' },
  tts:         { envVar: 'AI_MODEL_TTS',        legacyEnvVar: 'OPENAI_TTS_MODEL',  fallback: 'tts-1' },
  stt:         { envVar: 'AI_MODEL_STT',                                            fallback: 'whisper-1' },
};

export function resolveModel(task: AITask): string {
  const config = MODEL_CONFIG[task];
  return process.env[config.envVar]
    || (config.legacyEnvVar ? process.env[config.legacyEnvVar] : undefined)
    || config.fallback;
}
```

**Why env vars, not a config file?** You can change models per-environment (staging vs
production) and swap a model without redeploying — just update the env var and restart.

### 3. Token Usage Logging

Every AI call should log its token consumption. Without this, you can't track spend
across providers on OpenRouter.

```typescript
export function logTokenUsage(
  task: AITask,
  model: string,
  usage: OpenAI.CompletionUsage | undefined,
) {
  if (!usage) return;
  logger.info('ai_token_usage', {
    task, model,
    promptTokens: usage.prompt_tokens,
    completionTokens: usage.completion_tokens,
    totalTokens: usage.total_tokens,
  });
}
```

Then at every call site:

```typescript
const model = resolveModel('coaching');
const completion = await aiClient.chat.completions.create({ model, messages, ... });
logTokenUsage('coaching', model, completion.usage ?? undefined);
```

---

## Model Selection Guide

The right model per task depends on what you're optimizing for:

| Task Type | Optimize For | Recommended Model | Why |
|-----------|-------------|-------------------|-----|
| **Coaching / chat** | Empathy, nuance, tone | `anthropic/claude-sonnet-4-5` | Strongest at sensitive, open-ended conversation |
| **Structured JSON** | Reliability, cost | `openai/gpt-4o-mini` | Excellent at following JSON schemas, very cheap |
| **Quiz reflection** | Balance of quality & cost | `openai/gpt-4o-mini` | Good enough for rubric-based feedback |
| **Bulk text gen** | Speed, cost | `openai/gpt-4o-mini` or `google/gemini-2.0-flash-001` | Fast and cheap for summaries |
| **RAG extraction** | Precision | `anthropic/claude-sonnet-4-5` or `openai/gpt-4o` | Better at extracting signals from long context |
| **Sales roleplay** | Personality, realism | `anthropic/claude-sonnet-4-5` | More natural in adversarial conversation |
| **Voice TTS/STT** | N/A | `tts-1` / `whisper-1` | Only available through direct OpenAI |

### Cost Impact (approximate, via OpenRouter)

| Model | Input $/1M tokens | Output $/1M tokens |
|-------|-------------------|-------------------|
| `openai/gpt-4o-mini` | $0.15 | $0.60 |
| `openai/gpt-4o` | $2.50 | $10.00 |
| `anthropic/claude-sonnet-4-5` | $3.00 | $15.00 |
| `google/gemini-2.0-flash-001` | $0.10 | $0.40 |

By routing only coaching + roleplay through Claude (~20% of calls) and keeping
everything else on GPT-4o-mini, you get measurably better quality on the tasks that
matter while keeping average cost near the GPT-4o-mini baseline.

---

## Environment Variables

```bash
# Primary: OpenRouter routes text/chat to any provider
OPENROUTER_API_KEY=sk-or-...

# Required for voice (TTS/STT) and as text fallback if no OpenRouter key
OPENAI_API_KEY=sk-...

# Task-specific model overrides (OpenRouter model IDs when using OpenRouter)
AI_MODEL_COACHING=anthropic/claude-sonnet-4-5
AI_MODEL_REFLECTION=openai/gpt-4o-mini
AI_MODEL_FLOW_TEXT=openai/gpt-4o-mini
AI_MODEL_TTS=tts-1
AI_MODEL_STT=whisper-1
OPENAI_TTS_VOICE=alloy

# Legacy (still work — overridden by task-specific vars above)
# OPENAI_CHAT_MODEL=gpt-4o-mini
# OPENAI_FLOW_MODEL=gpt-4o-mini
```

---

## Applying to the Customer Acquisition Academy

The CAA currently uses Firebase Genkit + Gemini exclusively. To adopt multi-model:

### Option A: OpenAI SDK Migration (recommended if leaving Firebase)

Replace Genkit flows with direct `aiClient.chat.completions.create()` calls using the
pattern above. This is what the mental-health-education-platform does. Best if you're
already moving away from Firebase toward Postgres + Drizzle.

**Migration path per flow:**
1. Create `lib/ai/client.ts` and `lib/ai/models.ts` (copy from this repo)
2. Add task types for CAA flows: `'coaching'`, `'roleplay'`, `'assessment'`,
   `'rag-extraction'`, `'quiz-reflection'`, `'document-analysis'`, etc.
3. Replace each Genkit flow with a plain async function that uses `aiClient`
4. Map each task to its optimal model in `MODEL_CONFIG`

**Suggested CAA model mapping:**

| CAA Flow | Task Type | Recommended Model |
|----------|-----------|-------------------|
| coachingChat | coaching | `anthropic/claude-sonnet-4-5` |
| salesRoleplay / salesRoleplay3D | roleplay | `anthropic/claude-sonnet-4-5` |
| salesRoleplayEval3D | evaluation | `openai/gpt-4o` |
| assessmentGenerator | assessment | `openai/gpt-4o-mini` |
| quizReflection | reflection | `openai/gpt-4o-mini` |
| ragIndexer | rag-extraction | `anthropic/claude-sonnet-4-5` |
| documentAnalyzer | document-analysis | `openai/gpt-4o-mini` |
| icpValidation | structured-json | `openai/gpt-4o-mini` |
| linkedinAnalyzer | structured-json | `openai/gpt-4o-mini` |
| websiteAnalyzer | structured-json | `openai/gpt-4o-mini` |

High-empathy / long-context tasks → Claude. Structured extraction → GPT-4o-mini.

### Option B: Keep Genkit, Add Model Switching

If you want to stay on Genkit, you can add alternative model plugins and switch per-flow:

```typescript
// Add OpenAI plugin alongside Google AI
import { openAI } from 'genkitx-openai';

export const ai = genkit({
  plugins: [
    googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY }),
    openAI({ apiKey: process.env.OPENAI_API_KEY }),
  ],
});

// Then per flow:
const { text } = await ai.generate({
  model: process.env.AI_MODEL_COACHING || 'googleai/gemini-2.0-flash',
  // ...
});
```

This keeps Genkit's orchestration but lets you route specific flows to non-Google models.
Trade-off: more plugins to maintain, and you still can't reach Claude without a
Genkit-Claude plugin (which doesn't exist officially — you'd need the OpenAI-compatible
plugin pointing at OpenRouter).

---

## Key Principles

1. **One client, one import** — Never `new OpenAI(...)` in feature files. Always
   `import { aiClient } from '@/lib/ai/client'`.

2. **Models are config, not code** — Switch models via env vars, not code changes.
   This lets you A/B test models in staging before rolling to production.

3. **Log every token** — `logTokenUsage()` after every completion. You can't optimize
   what you can't measure.

4. **Voice stays on OpenAI** — Audio APIs aren't on OpenRouter. Keep a separate
   `voiceClient` that always connects directly.

5. **Graceful fallback** — If `OPENROUTER_API_KEY` isn't set, everything falls back to
   direct OpenAI with `OPENAI_API_KEY`. Zero-config for local development.

6. **Legacy compat** — Old env vars (`OPENAI_CHAT_MODEL`, etc.) still work. New
   task-specific vars (`AI_MODEL_COACHING`, etc.) take priority when set.