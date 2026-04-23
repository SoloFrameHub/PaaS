import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loadQuiz, loadFullQuiz, evaluateAnswers } from './quizService';
import fs from 'fs';
import path from 'path';

// Mock fs
vi.mock('fs', () => ({
    default: {
        existsSync: vi.fn(),
        readFileSync: vi.fn(),
    }
}));

// Mock Path
vi.mock('path', async () => {
    const actual = await vi.importActual('path') as any;
    return {
        default: {
            ...actual.default,
            join: vi.fn((...args) => args.join('/')),
        }
    };
});

vi.mock('@/lib/ai/openai-flows', () => ({
    openaiQuizReflection: vi.fn().mockResolvedValue({ feedback: 'Great reflection! Keep refining your approach.' }),
}));

describe('QuizService', () => {
    const mockSectionId = 'section1';
    const mockCourseId = 'course1';
    const mockLessonId = '1';
    const mockQuizData = {
        lessonId: '1',
        courseId: 'course1',
        sectionId: 'section1',
        title: 'Test Quiz',
        passingScore: 70,
        questions: [
            {
                id: 'q1',
                type: 'single_choice',
                question: 'What is 2+2?',
                options: [{ id: '4', text: '4' }, { id: '5', text: '5' }],
                correctAnswer: '4',
                explanation: 'Math.'
            },
            {
                id: 'q2',
                type: 'reflection',
                question: 'How do you feel?',
                minLength: 10
            }
        ]
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('loadQuiz', () => {
        it('should return null if quiz fails to exist', () => {
            (fs.existsSync as any).mockReturnValue(false);
            const quiz = loadQuiz(mockSectionId, mockCourseId, mockLessonId);
            expect(quiz).toBeNull();
        });

        it('should return quiz without answers for frontend', () => {
            (fs.existsSync as any).mockReturnValue(true);
            (fs.readFileSync as any).mockReturnValue(JSON.stringify(mockQuizData));

            const quiz = loadQuiz(mockSectionId, mockCourseId, mockLessonId);
            expect(quiz).toBeDefined();
            expect(quiz?.questions[0].correctAnswer).toBeUndefined();
            // Preserves original type (single_choice) for proper UI rendering
            expect(quiz?.questions[0].type).toBe('single_choice');
        });
    });

    describe('evaluateAnswers', () => {
        it('should return error if quiz not found', async () => {
            (fs.existsSync as any).mockReturnValue(false);
            const result = await evaluateAnswers(mockSectionId, mockCourseId, mockLessonId, {});
            expect(result.success).toBe(false);
            expect(result.error).toBe('Quiz not found');
        });

        it('should evaluate multiple choice questions correctly', async () => {
            (fs.existsSync as any).mockReturnValue(true);
            (fs.readFileSync as any).mockReturnValue(JSON.stringify(mockQuizData));

            const result = await evaluateAnswers(mockSectionId, mockCourseId, mockLessonId, { 'q1': '4' });

            expect(result.success).toBe(true);
            expect(result.results?.score).toBe(100);
            expect(result.results?.passed).toBe(true);
            expect(result.results?.questionResults[0].isCorrect).toBe(true);
        });

        it('should handle reflections based on length if AI is not used', async () => {
            (fs.existsSync as any).mockReturnValue(true);
            (fs.readFileSync as any).mockReturnValue(JSON.stringify(mockQuizData));

            const result = await evaluateAnswers(mockSectionId, mockCourseId, mockLessonId, { 'q2': 'This is long enough' });

            expect(result.success).toBe(true);
            const reflectionResult = result.results?.questionResults.find(r => r.id === 'q2');
            expect(reflectionResult?.meetsMinLength).toBe(true);
        });
    });
});
