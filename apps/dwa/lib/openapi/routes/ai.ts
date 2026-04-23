import { z } from 'zod';
import { registry } from '../registry';
import { chatSchema } from '@/lib/validations/ai';

const tags = ['AI'];

export function registerAiRoutes() {
  registry.registerPath({
    method: 'post',
    path: '/api/ai/chat',
    summary: 'Send a message to the wellness coach',
    description: 'Authenticated chat with the AI wellness coach. Includes crisis detection and personalized context from the user profile.',
    tags,
    request: {
      body: { content: { 'application/json': { schema: chatSchema } } },
    },
    responses: {
      200: {
        description: 'Coach response',
        content: {
          'application/json': {
            schema: z.object({
              data: z.object({
                message: z.string(),
                crisisDetected: z.boolean(),
                crisisLevel: z.enum(['none', 'low', 'medium', 'high']).optional(),
              }),
            }),
          },
        },
      },
      401: { description: 'Unauthorized' },
      429: { description: 'Rate limited — too many messages' },
      503: { description: 'AI service unavailable' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/ai/voice/tts',
    summary: 'Convert text to speech',
    description: 'Text-to-speech via OpenAI. Returns audio/mpeg stream.',
    tags,
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              text: z.string().min(1).max(4096),
              voice: z.enum(['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']).optional(),
            }),
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Audio stream',
        content: { 'audio/mpeg': { schema: z.string().openapi({ format: 'binary' }) } },
      },
      401: { description: 'Unauthorized' },
      429: { description: 'Rate limited' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/ai/voice/stt',
    summary: 'Convert speech to text',
    description: 'Speech-to-text via OpenAI Whisper. Accepts audio file upload.',
    tags,
    request: {
      body: {
        content: {
          'multipart/form-data': {
            schema: z.object({
              file: z.string().openapi({ format: 'binary', description: 'Audio file (webm, mp3, wav, etc.)' }),
            }),
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Transcribed text',
        content: {
          'application/json': {
            schema: z.object({
              data: z.object({ text: z.string() }),
            }),
          },
        },
      },
      401: { description: 'Unauthorized' },
      429: { description: 'Rate limited' },
    },
  });
}
