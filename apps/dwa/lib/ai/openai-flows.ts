/**
 * OpenAI-based replacements for all former Genkit/Gemini flows.
 * Routes through OpenRouter when configured, otherwise direct OpenAI.
 */

import OpenAI from 'openai';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { aiClient, assertAIKey } from '@/lib/ai/client';
import { resolveModel, logTokenUsage } from '@/lib/ai/models';

async function chatJson<T>(params: {
  system?: string;
  prompt: string;
  schema: z.ZodType<T>;
  temperature?: number;
  maxTokens?: number;
}): Promise<T> {
  const { system, prompt, schema, temperature = 0.5, maxTokens = 2000 } = params;
  assertAIKey();

  const messages: OpenAI.ChatCompletionMessageParam[] = [];
  if (system) messages.push({ role: 'system', content: system });
  messages.push({ role: 'user', content: prompt });

  const model = resolveModel('quiz-reflection');
  const completion = await aiClient.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
    response_format: { type: 'json_object' },
  });
  logTokenUsage('quiz-reflection', model, completion.usage ?? undefined);

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error('OpenAI returned no content');
  const parsed = JSON.parse(content) as unknown;
  return schema.parse(parsed);
}

async function chatText(params: {
  system: string;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}): Promise<string> {
  const { system, prompt, temperature = 0.8, maxTokens = 500 } = params;
  assertAIKey();

  const model = resolveModel('quiz-reflection');
  const completion = await aiClient.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: prompt },
    ],
    temperature,
    max_tokens: maxTokens,
  });
  logTokenUsage('quiz-reflection', model, completion.usage ?? undefined);

  const content = completion.choices[0]?.message?.content;
  if (content == null) throw new Error('OpenAI returned no content');
  return content.trim();
}

// --- Quiz reflection (for quizService) ---
const QuizReflectionOutput = z.object({
  feedback: z.string(),
  suggestions: z.array(z.string()),
  score: z.number().min(0).max(100),
});

export type QuizReflectionOutput = z.infer<typeof QuizReflectionOutput>;

export async function openaiQuizReflection(input: {
  reflection: string;
  aiPrompt: string;
  wellnessContext?: {
    focusArea?: string;
    symptoms?: string[];
    goals?: string[];
    challenges?: string[];
  };
  /** @deprecated Use wellnessContext instead */
  founderContext?: {
    founderCategory?: string;
    industry?: string;
    targetRoles?: string[];
    painPoints?: string[];
    ragSignals?: unknown;
  };
}): Promise<QuizReflectionOutput> {
  const { reflection, aiPrompt, wellnessContext, founderContext } = input;
  const ctx = wellnessContext || founderContext;
  const systemPrompt = `You are a supportive WELLNESS EDUCATOR. Review the learner's reflection on a mental wellness exercise.

LEARNER CONTEXT: Focus area ${wellnessContext?.focusArea || founderContext?.founderCategory || 'general wellness'}, Symptoms ${wellnessContext?.symptoms?.join(', ') || founderContext?.industry || 'mental health'}, Goals ${wellnessContext?.goals?.join(', ') || founderContext?.targetRoles?.join(', ') || 'improving wellbeing'}, Challenges ${wellnessContext?.challenges?.join(', ') || founderContext?.painPoints?.join(', ') || 'exploring'}.

EXERCISE: ${aiPrompt || 'Evaluate depth and self-awareness.'}

Give SPECIFIC, compassionate feedback: acknowledge their effort, identify insights, gently challenge blind spots, suggest 2-3 actionable wellness practices. Score 0-100 based on engagement and reflection depth. Return JSON only: { "feedback": string, "suggestions": string[], "score": number }.`;

  const prompt = `Student Reflection: <<<${reflection}>>>\nRespond with JSON only.`;
  return chatJson({
    system: systemPrompt,
    prompt,
    schema: QuizReflectionOutput,
    temperature: 0.4,
    maxTokens: 500,
  });
}
