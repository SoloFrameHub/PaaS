/**
 * OpenRouter-based AI client for content generation tasks.
 * Uses the same OpenRouter routing as lib/ai/client.ts but with
 * settings tuned for long-form content generation.
 */

import OpenAI from "openai";

const MODEL = "anthropic/claude-sonnet-4-5";

function createContentClient(): OpenAI {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (openRouterKey) {
    return new OpenAI({
      apiKey: openRouterKey,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "",
        "X-Title": "Customer Acquisition Academy - Content Pipeline",
      },
    });
  }
  // Fallback to direct OpenAI (won't have Anthropic models)
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
}

const client = createContentClient();

export interface ContentGenerationOptions {
  systemPrompt: string;
  userPrompt: string;
  maxTokens?: number;
  temperature?: number;
}

export async function generateContent(
  options: ContentGenerationOptions
): Promise<string> {
  const { systemPrompt, userPrompt, maxTokens = 8192, temperature = 0.3 } = options;

  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: maxTokens,
    temperature,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("AI returned empty response");
  }
  return content;
}
