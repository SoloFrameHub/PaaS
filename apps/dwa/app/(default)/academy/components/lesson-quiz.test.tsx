// @vitest-environment jsdom
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LessonQuiz from './lesson-quiz';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

const mockQuiz = {
    title: 'Test Quiz',
    passingScore: 80,
    questions: [
        {
            id: 'q1',
            type: 'multiple-choice',
            question: 'What is 2+2?',
            options: [
                { id: 'a', text: '3' },
                { id: 'b', text: '4' }
            ]
        },
        {
            id: 'q2',
            type: 'reflection',
            question: 'Reflect on life',
            minLength: 10
        }
    ]
};

const mockResults = {
    passed: true,
    score: 100,
    questionResults: [
        { id: 'q1', isCorrect: true, question: 'What is 2+2?', userAnswer: '4', type: 'multiple-choice' },
        { id: 'q2', meetsMinLength: true, question: 'Reflect on life', userAnswer: 'Life is good', type: 'reflection' }
    ]
};

import { apiClient } from '@/lib/api/client';

vi.mock('@/lib/api/client', () => ({
    apiClient: {
        get: vi.fn(),
        post: vi.fn(),
    }
}));

describe('LessonQuiz Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(window, 'alert').mockImplementation(() => { });
    });

    it('renders loading state initially', async () => {
        (apiClient.get as any).mockReturnValue(new Promise(() => { })); // Never resolves
        render(<LessonQuiz sectionId="s1" courseId="c1" lessonId="l1" />);
        expect(screen.getByText('Loading Quiz...')).toBeInTheDocument();
    });

    it('renders quiz questions after loading', async () => {
        (apiClient.get as any).mockResolvedValue({ quiz: mockQuiz });

        render(<LessonQuiz sectionId="s1" courseId="c1" lessonId="l1" />);

        await waitFor(() => {
            expect(screen.getByText('Test What You Learned')).toBeInTheDocument();
        });

        expect(screen.getByText('1. What is 2+2?')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Write your reflection here/)).toBeInTheDocument();
    });

    it('validates unanswered questions on submit', async () => {
        (apiClient.get as any).mockResolvedValue({ quiz: mockQuiz });

        render(<LessonQuiz sectionId="s1" courseId="c1" lessonId="l1" />);

        await waitFor(() => screen.getByText('Test What You Learned'));

        const submitButton = screen.getByRole('button', { name: /submit quiz/i });
        fireEvent.click(submitButton);

        expect(window.alert).toHaveBeenCalledWith('Please answer all questions before submitting.');
    });

    it('submits quiz and shows results', async () => {
        (apiClient.get as any).mockResolvedValue({ quiz: mockQuiz });
        (apiClient.post as any).mockResolvedValue({ results: mockResults });

        render(<LessonQuiz sectionId="s1" courseId="c1" lessonId="l1" />);

        await waitFor(() => screen.getByText('Test What You Learned'));

        // Answer Q1
        const option4 = screen.getByLabelText('4');
        fireEvent.click(option4);

        // Answer Q2
        const textarea = screen.getByPlaceholderText(/Write your reflection here/);
        fireEvent.change(textarea, { target: { value: 'Life is good and testing is fun.' } });

        // Submit
        const submitButton = screen.getByRole('button', { name: /submit quiz/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Quiz Results')).toBeInTheDocument();
        });

        expect(screen.getByText(/Passed!/)).toBeInTheDocument();
        expect(screen.getByText(/100%/)).toBeInTheDocument();
    });

    it('handles retry functionality', async () => {
        (apiClient.get as any).mockResolvedValue({ quiz: mockQuiz });
        (apiClient.post as any)
            .mockResolvedValueOnce({ results: { ...mockResults, passed: false, score: 0 } })
            .mockResolvedValueOnce({ results: mockResults });

        render(<LessonQuiz sectionId="s1" courseId="c1" lessonId="l1" />);
        await waitFor(() => screen.getByText('Test What You Learned'));

        // Answer & Submit (Failure first)
        fireEvent.click(screen.getByLabelText('3')); // Answer A (Wrong)
        const textarea = screen.getByPlaceholderText(/Write your reflection here/);
        fireEvent.change(textarea, { target: { value: 'short' } });

        fireEvent.click(screen.getByRole('button', { name: /submit quiz/i }));

        await waitFor(() => screen.getByText('Quiz Results'));
        expect(screen.getByText(/Review and try again/)).toBeInTheDocument();

        // Click Retry
        const retryButton = screen.getByRole('button', { name: /try again/i });
        fireEvent.click(retryButton);

        expect(screen.getByText('Test What You Learned')).toBeInTheDocument();
        expect(screen.queryByText('Quiz Results')).not.toBeInTheDocument();
        expect(screen.getByLabelText('3')).not.toBeChecked(); // Answers cleared
    });
});
