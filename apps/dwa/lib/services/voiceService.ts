/**
 * Voice: OpenAI TTS + Whisper. No Google Cloud TTS/STT.
 */

import { voiceClient } from '@/lib/ai/client';
import { resolveModel } from '@/lib/ai/models';
import { logger } from '@/lib/logger';

export const voiceService = {
  /**
   * Synthesize text to speech (OpenAI TTS).
   */
  async synthesizeSpeech(text: string): Promise<Uint8Array | null> {
    try {
      if (!process.env.OPENAI_API_KEY) return null;
      const response = await voiceClient.audio.speech.create({
        model: resolveModel('tts'),
        voice: (process.env.OPENAI_TTS_VOICE as 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer') || 'alloy',
        input: text.slice(0, 4096),
      });
      const buffer = Buffer.from(await response.arrayBuffer());
      return new Uint8Array(buffer);
    } catch (error) {
      logger.error('TTS Error', {
        error: error instanceof Error ? error.message : String(error),
      });
      return null;
    }
  },

  /**
   * Transcribe audio to text (OpenAI Whisper).
   * @param audioBuffer Audio buffer (WebM/Opus, MP3, etc.)
   */
  async transcribeAudio(audioBuffer: Buffer): Promise<string | null> {
    try {
      if (!process.env.OPENAI_API_KEY) return null;
      const { Readable } = await import('stream');
      const stream = Readable.from(audioBuffer);
      const transcription = await voiceClient.audio.transcriptions.create({
        file: stream as any,
        model: resolveModel('stt'),
        language: 'en',
      });
      return transcription.text || null;
    } catch (error) {
      logger.error('STT Error', {
        error: error instanceof Error ? error.message : String(error),
      });
      return null;
    }
  },
};
