import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the AI client and models before importing voiceService
const mockSpeechCreateFn = vi.fn();
const mockTranscriptionsCreateFn = vi.fn();
vi.mock('@/lib/ai/client', () => ({
    getVoiceClient: () => ({
        audio: {
            speech: { create: mockSpeechCreateFn },
            transcriptions: { create: mockTranscriptionsCreateFn },
        },
    }),
}));

vi.mock('@/lib/ai/models', () => ({
    resolveModel: vi.fn((task: string) => {
        if (task === 'tts') return 'tts-1';
        if (task === 'stt') return 'whisper-1';
        return 'gpt-4o-mini';
    }),
}));

import { voiceService } from './voiceService';

const mockSpeechCreate = mockSpeechCreateFn;
const mockTranscriptionsCreate = mockTranscriptionsCreateFn;

describe('voiceService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        process.env.OPENAI_API_KEY = 'test-key';
    });

    describe('synthesizeSpeech', () => {
        it('should return audio content on success', async () => {
            const mockAudioBytes = new Uint8Array([1, 2, 3]);
            mockSpeechCreate.mockResolvedValue({
                arrayBuffer: () => Promise.resolve(mockAudioBytes.buffer),
            });

            const result = await voiceService.synthesizeSpeech('Hello');

            expect(result).toEqual(new Uint8Array([1, 2, 3]));
            expect(mockSpeechCreate).toHaveBeenCalledWith(
                expect.objectContaining({
                    model: 'tts-1',
                    input: 'Hello',
                })
            );
        });

        it('should return null when OPENAI_API_KEY is not set', async () => {
            delete process.env.OPENAI_API_KEY;
            const result = await voiceService.synthesizeSpeech('Hello');
            expect(result).toBeNull();
            expect(mockSpeechCreate).not.toHaveBeenCalled();
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
            expect(mockTranscriptionsCreate).toHaveBeenCalledWith(
                expect.objectContaining({
                    model: 'whisper-1',
                    language: 'en',
                })
            );
        });

        it('should return null when OPENAI_API_KEY is not set', async () => {
            delete process.env.OPENAI_API_KEY;
            const result = await voiceService.transcribeAudio(Buffer.from(''));
            expect(result).toBeNull();
            expect(mockTranscriptionsCreate).not.toHaveBeenCalled();
        });

        it('should return null on error', async () => {
            mockTranscriptionsCreate.mockRejectedValue(new Error('API Error'));
            const result = await voiceService.transcribeAudio(Buffer.from(''));
            expect(result).toBeNull();
        });
    });
});
