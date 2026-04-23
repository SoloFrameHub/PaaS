'use client';

import { useState } from 'react';

interface LessonFeedbackProps {
    courseId: string;
    lessonId: string;
    lessonTitle: string;
}

type Sentiment = 'positive' | 'negative';

const POSITIVE_CATEGORIES = [
    { value: 'helpful_content', label: 'Clear & helpful' },
    { value: 'good_examples', label: 'Great examples' },
    { value: 'valuable_exercises', label: 'Good exercises' },
    { value: 'easy_to_follow', label: 'Well structured' },
    { value: 'other', label: 'Something else' },
] as const;

const NEGATIVE_CATEGORIES = [
    { value: 'confusing', label: 'Hard to follow' },
    { value: 'level_mismatch', label: 'Wrong difficulty' },
    { value: 'needs_better_examples', label: 'Needs better examples' },
    { value: 'technical_issue', label: 'Something is broken' },
    { value: 'missing_content', label: 'Missing info' },
    { value: 'too_long', label: 'Too long' },
    { value: 'suggestion', label: 'I have a suggestion' },
] as const;

const PLACEHOLDERS: Record<string, string> = {
    helpful_content: 'What specifically was helpful or well explained?',
    good_examples: 'Which example or scenario worked best for you?',
    valuable_exercises: 'Which activity was most useful, and why?',
    easy_to_follow: 'What made this lesson well structured?',
    confusing: 'Which part was confusing, and what would make it clearer?',
    level_mismatch: 'Was it too basic or too advanced? What level would fit better?',
    needs_better_examples: 'What kind of examples would be more helpful here?',
    technical_issue: 'Describe exactly what happened so we can fix it right away.',
    missing_content: 'What topic or concept should have been included?',
    suggestion: "What's your suggestion for improving this lesson?",
    too_long: 'Which section felt unnecessary or could be condensed?',
    other: 'Share your thoughts about this lesson...',
};

export default function LessonFeedback({ courseId, lessonId, lessonTitle }: LessonFeedbackProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [sentiment, setSentiment] = useState<Sentiment | null>(null);
    const [category, setCategory] = useState<string>('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState<string>('');

    const categories = sentiment === 'positive' ? POSITIVE_CATEGORIES : NEGATIVE_CATEGORIES;
    const canSubmit = sentiment !== null && category !== '' && message.trim().length > 0;

    const handleSentiment = (s: Sentiment) => {
        setSentiment(s);
        setCategory('');
        setMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        setStatus('sending');
        try {
            const rating = sentiment === 'positive' ? 5 : 2;
            const response = await fetch('/api/academy/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId, lessonId, rating, category, message: message.trim() }),
            });

            if (response.ok) {
                setStatus('sent');
            } else {
                const body = await response.json().catch(() => null);
                const msg = body?.error?.message || body?.error || `HTTP ${response.status}`;
                setErrorMsg(msg);
                setStatus('error');
            }
        } catch (err) {
            setErrorMsg(err instanceof Error ? err.message : 'Network error');
            setStatus('error');
        }
    };

    const handleReset = () => {
        setSentiment(null);
        setCategory('');
        setMessage('');
        setStatus('idle');
        setIsOpen(false);
    };

    if (status === 'sent') {
        return (
            <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl text-center">
                <p className="text-green-700 dark:text-green-300 font-medium">Thanks for your feedback!</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">This helps us improve the lesson.</p>
                <button onClick={handleReset} className="text-xs text-green-600 dark:text-green-400 underline mt-2 block mx-auto">
                    Close
                </button>
            </div>
        );
    }

    if (!isOpen) {
        return (
            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    Share feedback on this lesson
                </button>
            </div>
        );
    }

    return (
        <div className="mt-8 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 dark:bg-gray-800/50 px-5 py-3 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">Lesson Feedback</h3>
                    <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{lessonTitle}</p>
                </div>
                <button onClick={handleReset} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-5">
                {/* Step 1: Sentiment */}
                <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        How was this lesson for you?
                    </p>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => handleSentiment('positive')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                                sentiment === 'positive'
                                    ? 'bg-green-500 text-white border-green-500'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-600'
                            }`}
                        >
                            <span aria-hidden>👍</span> It was helpful
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSentiment('negative')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                                sentiment === 'negative'
                                    ? 'bg-amber-500 text-white border-amber-500'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-600'
                            }`}
                        >
                            <span aria-hidden>✏️</span> Needs improvement
                        </button>
                    </div>
                </div>

                {/* Step 2: Category */}
                {sentiment !== null && (
                    <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                            {sentiment === 'positive' ? 'What worked well?' : 'What could be better?'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((c) => (
                                <button
                                    key={c.value}
                                    type="button"
                                    onClick={() => setCategory(c.value)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                        category === c.value
                                            ? sentiment === 'positive'
                                                ? 'bg-green-500 text-white border-green-500'
                                                : 'bg-amber-500 text-white border-amber-500'
                                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                                    }`}
                                >
                                    {c.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Message */}
                {category !== '' && (
                    <div>
                        <label htmlFor="feedback-message" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                            Tell us more
                        </label>
                        <textarea
                            id="feedback-message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={PLACEHOLDERS[category] ?? 'Share your thoughts...'}
                            maxLength={2000}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-y"
                        />
                        {message.length > 0 && (
                            <p className="text-[10px] text-gray-400 mt-1 text-right">{message.length}/2000</p>
                        )}
                    </div>
                )}

                {status === 'error' && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                        Failed to submit: {errorMsg || 'Please try again.'}
                    </p>
                )}

                {category !== '' && (
                    <button
                        type="submit"
                        disabled={!canSubmit || status === 'sending'}
                        className="w-full py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {status === 'sending' ? 'Sending...' : 'Submit Feedback'}
                    </button>
                )}
            </form>
        </div>
    );
}
