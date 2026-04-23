# ADR 0013 — OpenRouter primary, native fallback

- **Status:** Accepted
- **Date:** 2026-04-22

## Context
A custom AI gateway is six months of work for marginal gains; LiteLLM proxy adds ops cost. Per-vertical hardcoded model choices defeat manifest-driven control.

## Decision
Keep the existing `lib/ai/client.ts` pattern: OpenRouter primary, native OpenAI/Anthropic adapters as fallback. Add per-tenant token metering, redaction policy from manifest, and a hard cap on prompt length per task. Per-task model selection lives in `manifest.ai.modelOverrides`. (Hard Decisions §C.7.)

## Consequences
- **Good:** swap GPT-5 / Claude 5 by editing manifest, no code change.
- **Acceptable cost:** OpenRouter fees on top of model cost.
- **Trigger to revisit:** OpenRouter outage exceeds business tolerance, or fees exceed savings vs. native — then route per-model directly.

## Killed alternatives
- Custom AI gateway.
- LiteLLM proxy.
- Per-vertical hardcoded models.
