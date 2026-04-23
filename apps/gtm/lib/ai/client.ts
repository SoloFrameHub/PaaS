/**
 * Centralized AI client factory.
 *
 * Three providers:
 *  - aiClient    → OpenRouter / direct OpenAI (chat completions).
 *  - anthropic   → Anthropic Claude (when ANTHROPIC_API_KEY is set).
 *  - voiceClient → Direct OpenAI always (TTS, STT).
 *
 * Provider selection:
 *  AI_PROVIDER env var: 'openai' | 'anthropic' | 'openrouter' (default: auto-detect)
 */

import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

export type AIProvider = "openai" | "anthropic" | "openrouter";

export function getProvider(): AIProvider {
  const explicit = process.env.AI_PROVIDER as AIProvider | undefined;
  if (explicit && ["openai", "anthropic", "openrouter"].includes(explicit))
    return explicit;
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.OPENROUTER_API_KEY) return "openrouter";
  return "openai";
}

function createAIClient(): OpenAI {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (openRouterKey) {
    return new OpenAI({
      apiKey: openRouterKey,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "",
        "X-Title": "Solo GTM OS",
      },
    });
  }
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    throw new Error("Neither OPENROUTER_API_KEY nor OPENAI_API_KEY is set");
  }
  return new OpenAI({ apiKey: openaiKey });
}

function createAnthropicClient(): Anthropic {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    throw new Error("ANTHROPIC_API_KEY is required when AI_PROVIDER=anthropic");
  }
  return new Anthropic({ apiKey: key });
}

function createVoiceClient(): OpenAI {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error("OPENAI_API_KEY is required for voice features");
  }
  return new OpenAI({ apiKey: key });
}

// Lazy initialization — deferred until first use so importing at build time
// does not throw when API keys are absent from the build env.
let _aiClient: OpenAI | null = null;
export const aiClient = new Proxy({} as OpenAI, {
  get(_target, prop) {
    if (!_aiClient) _aiClient = createAIClient();
    return Reflect.get(_aiClient, prop, _aiClient);
  },
});

let _anthropicClient: Anthropic | null = null;
export const anthropicClient = new Proxy({} as Anthropic, {
  get(_target, prop) {
    if (!_anthropicClient) _anthropicClient = createAnthropicClient();
    return Reflect.get(_anthropicClient, prop, _anthropicClient);
  },
});

let _voiceClient: OpenAI | null = null;
export function getVoiceClient(): OpenAI {
  if (!_voiceClient) _voiceClient = createVoiceClient();
  return _voiceClient;
}

export const isOpenRouter = !!process.env.OPENROUTER_API_KEY;
