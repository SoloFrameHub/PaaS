/**
 * Task-specific model resolution with 3-tier override chain:
 *   Task-specific env var  →  Legacy env var  →  Hardcoded default
 *
 * Supports OpenAI and Anthropic models. Provider determines which
 * default model family is used when no env override is set.
 *
 * Plus token usage logging for spend tracking across providers.
 */

import type OpenAI from "openai";
import { logger } from "@/lib/logger";
import { getProvider } from "@/lib/ai/client";

export type AITask =
  | "coaching"
  | "roleplay"
  | "roleplay-eval"
  | "assessment"
  | "mini-assessment"
  | "icp-validation"
  | "website-analysis"
  | "linkedin-analysis"
  | "rag-extraction"
  | "quiz-reflection"
  | "facilitator"
  | "persona"
  | "tts"
  | "stt"
  | "workshop"
  | "daily-digest";

const MODEL_CONFIG: Record<
  AITask,
  {
    envVar: string;
    legacyEnvVar?: string;
    fallback: string;
    claudeFallback?: string;
  }
> = {
  coaching: {
    envVar: "AI_MODEL_COACHING",
    legacyEnvVar: "OPENAI_CHAT_MODEL",
    fallback: "gpt-4o-mini",
    claudeFallback: "claude-haiku-4-5-20251001",
  },
  roleplay: {
    envVar: "AI_MODEL_ROLEPLAY",
    legacyEnvVar: "OPENAI_FLOW_MODEL",
    fallback: "gpt-4o-mini",
    claudeFallback: "claude-haiku-4-5-20251001",
  },
  "roleplay-eval": {
    envVar: "AI_MODEL_ROLEPLAY_EVAL",
    legacyEnvVar: "OPENAI_FLOW_MODEL",
    fallback: "gpt-4o-mini",
    claudeFallback: "claude-haiku-4-5-20251001",
  },
  assessment: {
    envVar: "AI_MODEL_ASSESSMENT",
    legacyEnvVar: "OPENAI_FLOW_MODEL",
    fallback: "gpt-4o-mini",
    claudeFallback: "claude-sonnet-4-6",
  },
  "icp-validation": {
    envVar: "AI_MODEL_ICP_VALIDATION",
    legacyEnvVar: "OPENAI_FLOW_MODEL",
    fallback: "gpt-4o-mini",
    claudeFallback: "claude-haiku-4-5-20251001",
  },
  "website-analysis": {
    envVar: "AI_MODEL_WEBSITE_ANALYSIS",
    legacyEnvVar: "OPENAI_FLOW_MODEL",
    fallback: "gpt-4o-mini",
    claudeFallback: "claude-haiku-4-5-20251001",
  },
  "linkedin-analysis": {
    envVar: "AI_MODEL_LINKEDIN_ANALYSIS",
    legacyEnvVar: "OPENAI_FLOW_MODEL",
    fallback: "gpt-4o-mini",
    claudeFallback: "claude-haiku-4-5-20251001",
  },
  "rag-extraction": {
    envVar: "AI_MODEL_RAG_EXTRACTION",
    legacyEnvVar: "OPENAI_FLOW_MODEL",
    fallback: "gpt-4o-mini",
    claudeFallback: "claude-haiku-4-5-20251001",
  },
  "quiz-reflection": {
    envVar: "AI_MODEL_QUIZ_REFLECTION",
    legacyEnvVar: "OPENAI_FLOW_MODEL",
    fallback: "gpt-4o-mini",
    claudeFallback: "claude-haiku-4-5-20251001",
  },
  "mini-assessment": {
    envVar: "AI_MODEL_MINI_ASSESSMENT",
    legacyEnvVar: "OPENAI_FLOW_MODEL",
    fallback: "gpt-4o-mini",
    claudeFallback: "claude-sonnet-4-6",
  },
  facilitator: {
    envVar: "AI_MODEL_FACILITATOR",
    legacyEnvVar: "OPENAI_FLOW_MODEL",
    fallback: "gpt-4o-mini",
    claudeFallback: "claude-haiku-4-5-20251001",
  },
  persona: {
    envVar: "AI_MODEL_PERSONA",
    legacyEnvVar: "OPENAI_FLOW_MODEL",
    fallback: "gpt-4o-mini",
    claudeFallback: "claude-haiku-4-5-20251001",
  },
  tts: {
    envVar: "AI_MODEL_TTS",
    legacyEnvVar: "OPENAI_TTS_MODEL",
    fallback: "tts-1",
  },
  stt: { envVar: "AI_MODEL_STT", fallback: "whisper-1" },
  workshop: {
    envVar: "AI_MODEL_WORKSHOP",
    legacyEnvVar: "OPENAI_FLOW_MODEL",
    fallback: "gpt-4o-mini",
    claudeFallback: "claude-haiku-4-5-20251001",
  },
  "daily-digest": {
    envVar: "AI_MODEL_DAILY_DIGEST",
    fallback: "gpt-4o-mini",
    claudeFallback: "claude-haiku-4-5-20251001",
  },
};

export function resolveModel(task: AITask): string {
  const config = MODEL_CONFIG[task];
  const explicit =
    process.env[config.envVar] ||
    (config.legacyEnvVar ? process.env[config.legacyEnvVar] : undefined);
  if (explicit) return explicit;

  // Use Claude defaults when provider is anthropic
  if (config.claudeFallback && getProvider() === "anthropic") {
    return config.claudeFallback;
  }
  return config.fallback;
}

export function logTokenUsage(
  task: AITask,
  model: string,
  usage:
    | OpenAI.CompletionUsage
    | { input_tokens: number; output_tokens: number }
    | undefined,
) {
  if (!usage) return;
  // Normalize Anthropic usage shape to common format
  const promptTokens =
    "prompt_tokens" in usage
      ? usage.prompt_tokens
      : (usage as { input_tokens: number }).input_tokens;
  const completionTokens =
    "completion_tokens" in usage
      ? usage.completion_tokens
      : (usage as { output_tokens: number }).output_tokens;
  logger.info("ai_token_usage", {
    task,
    model,
    promptTokens,
    completionTokens,
    totalTokens: promptTokens + completionTokens,
  });
}
