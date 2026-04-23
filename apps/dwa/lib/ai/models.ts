/**
 * Per-Task Model Resolution + Token Usage Logging
 *
 * Each AI task maps to an env var (with legacy fallback) and a default model.
 * This allows swapping models per task via environment variables.
 */

import type OpenAI from 'openai';
import { logger } from '@/lib/logger';

export type AITask = 'coaching' | 'quiz-reflection' | 'tts' | 'stt' | 'forum-moderation';

const MODEL_CONFIG: Record<AITask, { envVar: string; legacyEnvVar?: string; fallback: string }> = {
  'coaching':          { envVar: 'AI_MODEL_COACHING',          legacyEnvVar: 'OPENAI_CHAT_MODEL', fallback: 'anthropic/claude-haiku-4-5' },
  'quiz-reflection':   { envVar: 'AI_MODEL_QUIZ_REFLECTION',   legacyEnvVar: 'OPENAI_FLOW_MODEL', fallback: 'google/gemini-2.5-flash' },
  'tts':               { envVar: 'AI_MODEL_TTS',               legacyEnvVar: 'OPENAI_TTS_MODEL',  fallback: 'tts-1' },
  'stt':               { envVar: 'AI_MODEL_STT',                                                   fallback: 'whisper-1' },
  'forum-moderation':  { envVar: 'AI_MODEL_FORUM_MODERATION',                                      fallback: 'google/gemini-2.5-flash' },
};

export function resolveModel(task: AITask): string {
  const config = MODEL_CONFIG[task];
  return process.env[config.envVar]
    || (config.legacyEnvVar ? process.env[config.legacyEnvVar] : undefined)
    || config.fallback;
}

export function logTokenUsage(task: AITask, model: string, usage: OpenAI.CompletionUsage | undefined) {
  if (!usage) return;
  logger.info('ai_token_usage', {
    task, model,
    promptTokens: usage.prompt_tokens,
    completionTokens: usage.completion_tokens,
    totalTokens: usage.total_tokens,
  });
}
