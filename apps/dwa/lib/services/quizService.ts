/**
 * Quiz Service for Next.js
 * Handles quiz loading and evaluation
 */

import fs from 'fs';
import path from 'path';
import { logger } from '../logger';
import { Quiz, QuizQuestion, QuizOption } from '@/types/course';
import { safeResolveInside } from '../utils/safe-path';

const QUIZ_BASE_PATH = path.join(process.cwd(), 'server/data/quizzes');

function resolveQuizPath(sectionId: string, courseId: string, lessonId: string): string | null {
    return safeResolveInside(QUIZ_BASE_PATH, sectionId, courseId, `lesson-${lessonId}.json`);
}

export interface QuizResult {
    id: string;
    type: string;
    question: string;
    userAnswer: string;
    correctAnswer?: string;
    isCorrect?: boolean;
    explanation?: string;
    meetsMinLength?: boolean;
    aiFeedback?: string;
}

export interface QuizResults {
    totalQuestions: number;
    correctAnswers: number;
    score: number;
    passed: boolean;
    questionResults: QuizResult[];
    learningPlan?: { generated: boolean; content: string };
}

/**
 * Load quiz data for a specific lesson (for frontend - no answers)
 */
export function loadQuiz(sectionId: string, courseId: string, lessonId: string): Quiz | null {
    try {
        const quizPath = resolveQuizPath(sectionId, courseId, lessonId);
        if (!quizPath || !fs.existsSync(quizPath)) {
            return null;
        }

        const quizData = JSON.parse(fs.readFileSync(quizPath, 'utf8'));

        // Return quiz without correct answers (for frontend)
        return {
            lessonId: quizData.lessonId,
            courseId: quizData.courseId,
            sectionId: quizData.sectionId,
            title: quizData.title,
            passingScore: quizData.passingScore || 70,
            questions: quizData.questions.map((q: QuizQuestion) => {
                const isChoice = q.type === 'multiple-choice' || q.type === 'single_choice' || q.type === 'true-false';
                if (isChoice) {
                    return {
                        id: q.id,
                        type: q.type,
                        question: q.question,
                        options: q.options
                        // Note: correctAnswer NOT included
                    };
                } else {
                    return {
                        id: q.id,
                        type: q.type,
                        question: q.question,
                        minLength: q.minLength || 50
                    };
                }
            })
        };
    } catch (error) {
        logger.error('Error loading quiz', { error, sectionId, courseId, lessonId });
        return null;
    }
}

/**
 * Load full quiz data including answers (for server-side evaluation only)
 */
export function loadFullQuiz(sectionId: string, courseId: string, lessonId: string): Quiz | null {
    try {
        const quizPath = resolveQuizPath(sectionId, courseId, lessonId);
        if (!quizPath || !fs.existsSync(quizPath)) {
            return null;
        }

        const quizData = JSON.parse(fs.readFileSync(quizPath, 'utf8'));

        // Normalize questions (map promptForAI to aiPrompt)
        quizData.questions = quizData.questions.map((q: QuizQuestion & { promptForAI?: string }) => ({
            ...q,
            aiPrompt: q.aiPrompt || q.promptForAI
        }));

        return quizData;
    } catch (error) {
        logger.error('Error loading full quiz', { error, sectionId, courseId, lessonId });
        return null;
    }
}

/**
 * Check if a quiz exists for a lesson
 */
export function hasQuiz(sectionId: string, courseId: string, lessonId: string): boolean {
    const quizPath = resolveQuizPath(sectionId, courseId, lessonId);
    return !!quizPath && fs.existsSync(quizPath);
}

/**
 * Evaluate quiz answers (server-side)
 */
export async function evaluateAnswers(
    sectionId: string,
    courseId: string,
    lessonId: string,
    answers: Record<string, string>,
    userContext?: {
        // Wellness context (new)
        primarySymptom?: string;
        wellnessGoals?: string[];
        areasForGrowth?: string[];
        // Legacy founder context (for backwards compatibility)
        founderCategory?: string;
        industry?: string;
        targetRoles?: string[];
        painPoints?: string[];
    }
): Promise<{ success: boolean; results?: QuizResults; error?: string }> {
    const quiz = loadFullQuiz(sectionId, courseId, lessonId);

    if (!quiz) {
        return { success: false, error: 'Quiz not found' };
    }

    const results: QuizResults = {
        totalQuestions: quiz.questions.length,
        correctAnswers: 0,
        score: 0,
        passed: false,
        questionResults: []
    };

    const { openaiQuizReflection } = await import('@/lib/ai/openai-flows');

    const questionPromises = quiz.questions.map(async (question) => {
        const userAnswer = answers[question.id];
        const isChoice = question.type === 'multiple-choice' || question.type === 'single_choice' || question.type === 'true-false';

        if (isChoice) {
            const isCorrect = userAnswer === question.correctAnswer;

            // Get the actual text of the selected option and correct answer
            const userAnswerText = question.options?.find((o: QuizOption) => o.id === userAnswer)?.text || userAnswer;
            const correctAnswerText = question.options?.find((o: QuizOption) => o.id === question.correctAnswer)?.text || question.correctAnswer;

            return {
                id: question.id,
                type: question.type,
                question: question.question,
                userAnswer: userAnswerText,
                correctAnswer: correctAnswerText,
                isCorrect: isCorrect,
                explanation: question.explanation,
                valid: true
            };
        } else if (question.type === 'reflection') {
            const meetsMinLength = Boolean(userAnswer && userAnswer.length >= (question.minLength || 50));

            let aiFeedback = meetsMinLength
                ? 'Great reflection! Keep refining your approach as you progress.'
                : `Please write at least ${question.minLength || 50} characters for a meaningful reflection.`;

            // If we have an AI prompt and the user provided a reflection, use OpenAI
            if (meetsMinLength && question.aiPrompt) {
                try {
                    const aiResult = await openaiQuizReflection({
                        reflection: userAnswer,
                        aiPrompt: question.aiPrompt,
                        founderContext: userContext,
                    });
                    aiFeedback = aiResult.feedback;
                } catch (error: unknown) {
                    logger.error('AI Reflection Error', { error, lessonId });
                    // Keep the default feedback if AI fails
                }
            }

            return {
                id: question.id,
                type: question.type,
                question: question.question,
                userAnswer: userAnswer,
                meetsMinLength: meetsMinLength,
                isCorrect: meetsMinLength, // Reflections are "correct" if enough effort
                aiFeedback: aiFeedback,
                valid: true
            };
        }
        return { valid: false };
    });

    const calculatedResults = (await Promise.all(questionPromises)).filter(r => r.valid) as QuizResult[];

    // Aggregating results
    calculatedResults.forEach(r => {
        results.questionResults.push(r);
        if (r.isCorrect) results.correctAnswers++;
    });

    // Calculate score (only MC questions count toward percentage)
    const mcQuestions = quiz.questions.filter(q => q.type === 'multiple-choice' || q.type === 'single_choice' || q.type === 'true-false');
    const mcCorrect = results.questionResults
        .filter(r => (r.type === 'multiple-choice' || r.type === 'single_choice' || r.type === 'true-false') && r.isCorrect)
        .length;

    results.score = mcQuestions.length > 0
        ? Math.round((mcCorrect / mcQuestions.length) * 100)
        : 100;

    results.passed = results.score >= (quiz.passingScore || 70);

    return { success: true, results };
}
