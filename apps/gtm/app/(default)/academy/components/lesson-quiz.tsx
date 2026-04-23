'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { apiClient } from '@/lib/api/client';

import { Quiz, QuizResults } from '@/types/course';
import { GA4Events } from '@/lib/analytics/ga4';

interface LessonQuizProps {
    sectionId: string;
    courseId: string;
    lessonId: string;
}

export default function LessonQuiz({ sectionId, courseId, lessonId }: LessonQuizProps) {
    const locale = useLocale();
    const isEs = locale === 'es';
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [results, setResults] = useState<QuizResults | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        async function loadQuiz() {
            try {
                const data = await apiClient.get<any>(`/api/academy/quiz/${sectionId}/${courseId}/${lessonId}`);
                if (data.quiz) {
                    setQuiz(data.quiz);
                    GA4Events.quizStarted(courseId, lessonId);
                } else {
                    setError('No quiz available for this lesson');
                }
            } catch (err) {
                console.error('Failed to load quiz:', err);
                setError('Failed to load quiz');
            } finally {
                setLoading(false);
            }
        }

        loadQuiz();
    }, [sectionId, courseId, lessonId]);

    const handleAnswerChange = (questionId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = async () => {
        if (!quiz) return;

        const unanswered = quiz.questions.filter(q => !answers[q.id]);
        if (unanswered.length > 0) {
            alert(isEs ? 'Por favor responde todas las preguntas antes de enviar.' : 'Please answer all questions before submitting.');
            return;
        }

        setSubmitting(true);
        try {
            const data = await apiClient.post<any>(`/api/academy/quiz/${sectionId}/${courseId}/${lessonId}`, { answers });
            setResults(data.results);
            if (data.results) {
                GA4Events.quizCompleted(courseId, lessonId, data.results.score, quiz.questions.length, data.results.passed);
            }
        } catch (err: any) {
            console.error('Error submitting quiz:', err);
            alert('Failed to submit quiz: ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleRetry = () => {
        setAnswers({});
        setResults(null);
    };

    if (loading) {
        return (
            <section className="mt-12 p-8 rounded-3xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center animate-pulse">
                        <span>📝</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{isEs ? 'Cargando quiz...' : 'Loading Quiz...'}</h3>
                    </div>
                </div>
            </section>
        );
    }

    if (error || !quiz) {
        return null; // No quiz for this lesson
    }

    // Results view
    if (results) {
        return (
            <section data-testid="quiz-results" className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-500/20">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white">
                        {results.passed ? '🎉' : '📚'}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{isEs ? 'Resultados del quiz' : 'Quiz Results'}</h3>
                        <p className="text-sm text-gray-500">
                            {isEs ? 'Puntaje' : 'Score'}: <span className={`font-bold ${results.passed ? 'text-green-600' : 'text-amber-600'}`}>{results.score}%</span>
                            {results.passed ? (isEs ? ' - ¡Aprobado!' : ' - Passed!') : (isEs ? ' - Revisa e intenta de nuevo' : ' - Review and try again')}
                        </p>
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    {results.questionResults.map((qr, idx) => (
                        <div key={qr.id} className={`p-4 rounded-2xl border ${qr.isCorrect || qr.meetsMinLength
                            ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-500/20'
                            : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-500/20'
                            }`}>
                            <div className="flex justify-between items-start mb-2">
                                <p className="font-bold text-gray-800 dark:text-gray-100">{idx + 1}. {qr.question}</p>
                                <span className={`text-xs font-black uppercase tracking-widest px-2 py-1 rounded-md ${qr.isCorrect || qr.meetsMinLength
                                    ? 'bg-green-500 text-white'
                                    : 'bg-red-500 text-white'
                                    }`}>
                                    {qr.isCorrect || qr.meetsMinLength ? (isEs ? 'CORRECTO' : 'CORRECT') : (isEs ? 'INCORRECTO' : 'INCORRECT')}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {isEs ? 'Tu respuesta' : 'Your answer'}: <span className="font-medium underline decoration-2 underline-offset-2">{qr.userAnswer}</span>
                            </p>
                            {qr.type === 'multiple-choice' && !qr.isCorrect && (
                                <p className="text-sm text-green-700 dark:text-green-400 mt-2 font-semibold">
                                    {isEs ? 'Respuesta correcta' : 'Correct answer'}: {qr.correctAnswer}
                                </p>
                            )}
                            {qr.explanation && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 p-3 bg-white/50 dark:bg-black/20 rounded-xl border border-gray-100 dark:border-gray-800 italic">
                                    {qr.explanation}
                                </p>
                            )}
                            {qr.aiFeedback && (
                                <div className="mt-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-800/30">
                                    <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-1">{isEs ? 'Coaching IA' : 'AI Coaching'}</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">{qr.aiFeedback}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex gap-3">
                    {!results.passed && (
                        <button
                            onClick={handleRetry}
                            className="btn bg-amber-500 hover:bg-amber-600 text-white"
                        >
                            {isEs ? 'Intentar de nuevo' : 'Try Again'}
                        </button>
                    )}
                </div>
            </section>
        );
    }

    // Quiz form view
    return (
        <section data-testid="quiz" className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-500/20">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white">
                    📝
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{isEs ? 'Pon a prueba lo aprendido' : 'Test What You Learned'}</h3>
                    <p className="text-sm text-gray-500">{isEs ? 'Responde las preguntas para verificar tu comprensión' : 'Answer the questions below to check your understanding'}</p>
                </div>
            </div>

            <div className="space-y-8">
                {quiz.questions.map((q, idx) => (
                    <div key={q.id} data-testid="quiz-question" className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <p className="font-medium text-gray-800 dark:text-gray-100 mb-4">{idx + 1}. {q.question}</p>

                        {q.type === 'multiple-choice' && q.options && (
                            <div className="space-y-2">
                                {q.options.map((option) => (
                                    <label
                                        key={option.id}
                                        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${answers[q.id] === option.id
                                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-amber-300'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name={q.id}
                                            value={option.id}
                                            data-testid="quiz-option"
                                            checked={answers[q.id] === option.id}
                                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                            className="form-radio text-amber-500"
                                        />
                                        <span className="text-gray-700 dark:text-gray-300">{option.text}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {q.type === 'reflection' && (
                            <div>
                                <textarea
                                    className="form-textarea w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 min-h-[120px]"
                                    placeholder={isEs ? `Escribe tu reflexión aquí (mínimo ${q.minLength || 50} caracteres)...` : `Write your reflection here (minimum ${q.minLength || 50} characters)...`}
                                    value={answers[q.id] || ''}
                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    {(answers[q.id]?.length || 0)} / {q.minLength || 50} {isEs ? 'caracteres mínimo' : 'characters minimum'}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    data-testid="submit-quiz-button"
                    className="btn bg-amber-500 hover:bg-amber-600 text-white disabled:opacity-50"
                >
                    {submitting ? (isEs ? 'Enviando...' : 'Submitting...') : (isEs ? 'Enviar quiz' : 'Submit Quiz')}
                </button>
            </div>
        </section>
    );
}
