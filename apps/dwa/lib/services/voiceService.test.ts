import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockSpeechCreate, mockTranscriptionsCreate } = vi.hoisted(() => ({
    mockSpeechCreate: vi.fn(),
    mockTranscriptionsCreate: vi.fn(),
}));

vi.mock('@/lib/ai/client', () => ({
    voiceClient: {
        audio: {
            speech: { create: mockSpeechCreate },
            transcriptions: { create: mockTranscriptionsCreate },
        },
    },
}));

vi.mock('@/lib/ai/models', () => ({
    resolveModel: (task: string) => {
        if (task === 'tts') return 'tts-1';
        if (task === 'stt') return 'whisper-1';
        return 'unknown';
    },
}));

import { voiceService } from './voiceService';

describe('voiceService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.stubEnv('OPENAI_API_KEY', 'test-key');
    });

    describe('synthesizeSpeech', () => {
        it('should return audio content on success', async () => {
            const mockAudioContent = new Uint8Array([1, 2, 3]);
            mockSpeechCreate.mockResolvedValue({
                arrayBuffer: () => Promise.resolve(mockAudioContent.buffer),
            });

            const result = await voiceService.synthesizeSpeech('Hello');

            expect(result).toEqual(new Uint8Array([1, 2, 3]));
            expect(mockSpeechCreate).toHaveBeenCalledWith({
                model: 'tts-1',
                voice: 'alloy',
                input: 'Hello',
            });
        });

        it('should return null when no API key', async () => {
            vi.stubEnv('OPENAI_API_KEY', '');
            const result = await voiceService.synthesizeSpeech('Hello');
            expect(result).toBeNull();
        });

        it('should return null on error', async () => {
            mockSpeechCreate.mockRejectedValue(new Error('API Error'));
            const result = await voiceService.synthesizeSpeech('Hello');
            expect(result).toBeNull();
        });
    });

    describe('transcribeAudio', () => {
        it('should return transcript on success', async () => {
            mockTranscriptionsCreate.mockResolvedValue({ text: 'Hello world' });

            const result = await voiceService.transcribeAudio(Buffer.from('fake-audio'));

            expect(result).toBe('Hello world');
            expect(mockTranscriptionsCreate).toHaveBeenCalledWith({
                file: expect.anything(),
                model: 'whisper-1',
                language: 'en',
            });
        });

        it('should return null when no API key', async () => {
            vi.stubEnv('OPENAI_API_KEY', '');
            const result = await voiceService.transcribeAudio(Buffer.from(''));
            expect(result).toBeNull();
        });

        it('should return null on error', async () => {
            mockTranscriptionsCreate.mockRejectedValue(new Error('API Error'));
            const result = await voiceService.transcribeAudio(Buffer.from(''));
            expect(result).toBeNull();
        });
    });
});
