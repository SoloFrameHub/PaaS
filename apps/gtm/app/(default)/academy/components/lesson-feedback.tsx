'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

interface LessonFeedbackProps {
    courseId: string;
    lessonId: string;
    courseTitle: string;
    lessonTitle: string;
}

type Sentiment = 'positive' | 'negative';
type Step = 'trigger' | 'sentiment' | 'details' | 'done';

const POSITIVE_CATEGORIES_EN = [
    { value: 'clear_explanation', label: 'Clear explanation' },
    { value: 'great_examples', label: 'Great examples' },
    { value: 'practical_advice', label: 'Practical and actionable' },
    { value: 'well_structured', label: 'Well structured' },
    { value: 'other', label: 'Something else' },
];

const POSITIVE_CATEGORIES_ES = [
    { value: 'clear_explanation', label: 'Explicación clara' },
    { value: 'great_examples', label: 'Buenos ejemplos' },
    { value: 'practical_advice', label: 'Práctico y aplicable' },
    { value: 'well_structured', label: 'Bien estructurado' },
    { value: 'other', label: 'Otro motivo' },
];

const NEGATIVE_CATEGORIES_EN = [
    { value: 'confusing', label: 'Hard to follow / confusing' },
    { value: 'missing_context', label: 'Missing context or background' },
    { value: 'outdated', label: 'Content feels outdated' },
    { value: 'too_basic', label: 'Too basic for my level' },
    { value: 'too_advanced', label: 'Moved too fast' },
    { value: 'other', label: 'Something else' },
];

const NEGATIVE_CATEGORIES_ES = [
    { value: 'confusing', label: 'Difícil de seguir / confuso' },
    { value: 'missing_context', label: 'Falta contexto o antecedentes' },
    { value: 'outdated', label: 'El contenido parece desactualizado' },
    { value: 'too_basic', label: 'Muy básico para mi nivel' },
    { value: 'too_advanced', label: 'Fue demasiado rápido' },
    { value: 'other', label: 'Otro motivo' },
];

export default function LessonFeedback({ courseId, lessonId, courseTitle, lessonTitle }: LessonFeedbackProps) {
    const locale = useLocale();
    const isEs = locale === 'es';
    const [step, setStep] = useState<Step>('trigger');
    const [sentiment, setSentiment] = useState<Sentiment | null>(null);
    const [category, setCategory] = useState('');
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const categories = sentiment === 'positive'
        ? (isEs ? POSITIVE_CATEGORIES_ES : POSITIVE_CATEGORIES_EN)
        : (isEs ? NEGATIVE_CATEGORIES_ES : NEGATIVE_CATEGORIES_EN);

    const handleSentiment = (s: Sentiment) => {
        setSentiment(s);
        setCategory('');
        setComment('');
        setStep('details');
    };

    const handleSubmit = async () => {
        if (!sentiment) return;
        setSubmitting(true);
        try {
            await fetch('/api/academy/lesson-feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId, lessonId, sentiment, category: category || undefined, comment: comment || undefined }),
            });
        } catch {
            // non-blocking — don't surface errors to the user
        } finally {
            setSubmitting(false);
            setStep('done');
        }
    };

    const handleClose = () => {
        setStep('trigger');
        setSentiment(null);
        setCategory('');
        setComment('');
    };

    if (step === 'done') {
        return (
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span className="text-green-500 text-base">✓</span>
                <span>{isEs ? 'Gracias por tu retroalimentación — nos ayuda a mejorar esta lección.' : 'Thanks for your feedback — it helps us improve this lesson.'}</span>
            </div>
        );
    }

    if (step === 'trigger') {
        return (
            <button
                onClick={() => setStep('sentiment')}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-500 transition-colors"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                {isEs ? 'Calificar esta lección' : 'Rate this lesson'}
            </button>
        );
    }

    return (
        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{isEs ? 'Retroalimentación' : 'Lesson Feedback'}</p>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{lessonTitle}</p>
                    <p className="text-xs text-gray-400">{courseTitle}</p>
                </div>
                <button onClick={handleClose} className="text-gray-300 hover:text-gray-500 transition-colors mt-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {step === 'sentiment' && (
                <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{isEs ? '¿Cómo fue esta lección?' : 'How was this lesson?'}</p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => handleSentiment('positive')}
                            className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-gray-100 dark:border-gray-800 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all text-sm font-medium text-gray-600 dark:text-gray-300"
                        >
                            <span className="text-xl">👍</span> {isEs ? 'Útil' : 'Helpful'}
                        </button>
                        <button
                            onClick={() => handleSentiment('negative')}
                            className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-gray-100 dark:border-gray-800 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all text-sm font-medium text-gray-600 dark:text-gray-300"
                        >
                            <span className="text-xl">👎</span> {isEs ? 'Necesita mejora' : 'Needs work'}
                        </button>
                    </div>
                </div>
            )}

            {step === 'details' && sentiment && (
                <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {isEs
                            ? (sentiment === 'positive' ? '¿Qué destacó?' : '¿Qué podría mejorar?')
                            : (sentiment === 'positive' ? 'What stood out?' : 'What could be better?')}
                    </p>

                    {/* Category chips */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map(c => (
                            <button
                                key={c.value}
                                onClick={() => setCategory(prev => prev === c.value ? '' : c.value)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${category === c.value
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400'
                                    : 'border-gray-100 dark:border-gray-800 text-gray-500 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                            >
                                {c.label}
                            </button>
                        ))}
                    </div>

                    {/* Optional comment */}
                    <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder={isEs
                            ? (sentiment === 'positive' ? '¿Algo más que encontraste valioso? (opcional)' : '¿Qué mejoraría esta lección? (opcional)')
                            : (sentiment === 'positive' ? 'Anything else you found valuable? (optional)' : 'What would make this lesson better? (optional)')}
                        rows={3}
                        maxLength={1000}
                        className="w-full text-sm rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 resize-none"
                    />

                    <div className="flex items-center justify-between gap-3">
                        <button
                            onClick={() => setStep('sentiment')}
                            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {isEs ? '← Atrás' : '← Back'}
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="px-5 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-colors disabled:opacity-50"
                        >
                            {submitting ? (isEs ? 'Enviando…' : 'Sending…') : (isEs ? 'Enviar retroalimentación' : 'Submit feedback')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
