/**
 * Centralized AI Client Factory
 *
 * Creates two clients:
 * - aiClient: Routes through OpenRouter when OPENROUTER_API_KEY is set, otherwise direct OpenAI
 * - voiceClient: Always direct OpenAI (OpenRouter doesn't support audio endpoints)
 */

import OpenAI from 'openai';

function createAIClient(): OpenAI {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (openRouterKey) {
    return new OpenAI({
      apiKey: openRouterKey,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || '',
        'X-Title': 'Mental Health Education Platform',
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

/** True when at least one chat-capable AI key is configured (OpenRouter or OpenAI). */
export const hasAIKey = !!(process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY);

export function assertAIKey(): void {
  if (!hasAIKey) {
    throw new Error('No AI API key configured — set OPENROUTER_API_KEY or OPENAI_API_KEY');
  }
}
