'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePersistedState } from '@/lib/hooks/usePersistedState';

interface AILessonCoachProps {
  lessonContext: string;
  courseId?: string;
  lessonId?: string;
  maxQuestions?: number;
}

interface QA {
  question: string;
  answer: string;
}

export default function AILessonCoach({
  lessonContext,
  courseId = 'course-1',
  lessonId = 'unknown',
  maxQuestions = 3,
}: AILessonCoachProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [history, setHistory, { loaded }] = usePersistedState<QA[]>(
    'coach',
    `${courseId}-${lessonId}`,
    [],
  );
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-open if there's prior history
  useEffect(() => {
    if (loaded && history.length > 0) setOpen(true);
  }, [loaded, history.length]);

  const remaining = maxQuestions - history.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || remaining <= 0 || loading) return;

    setInput('');
    setError(null);
    setLoading(true);

    try {
      // Build chat history for context
      const chatHistory = history.flatMap((qa) => [
        { role: 'user' as const, content: qa.question },
        { role: 'assistant' as const, content: qa.answer },
      ]);

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          history: chatHistory,
          context: {
            courseId: parseInt(courseId.replace(/\D/g, '')) || 1,
            lessonId,
            sectionId: lessonContext,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error?.message || 'Failed to get response');
      }

      const data = await res.json();
      const answer = data.data?.message || 'No response received.';

      setHistory((prev) => [...prev, { question, answer }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!loaded) return null;

  return (
    <div className="not-prose my-8">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full py-3 px-5 rounded-xl border-2 border-dashed border-primary-300 dark:border-primary-700 bg-primary-50/50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 font-semibold text-sm hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          {isEs ? `¿Necesitas ayuda? Pregúntale a tu Coach IA (${remaining} ${remaining !== 1 ? 'preguntas disponibles' : 'pregunta disponible'})` : `Need help? Ask your AI Coach (${remaining} question${remaining !== 1 ? 's' : ''} available)`}
        </button>
      ) : (
        <div className="rounded-2xl bg-white dark:bg-gray-800/60 border border-primary-200 dark:border-primary-800/50 overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary-500/10 to-blue-500/10 border-b border-primary-200 dark:border-primary-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎓</span>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{isEs ? 'Coach IA de la lección' : 'AI Lesson Coach'}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {remaining > 0
                    ? (isEs ? `${remaining} ${remaining !== 1 ? 'preguntas restantes' : 'pregunta restante'}` : `${remaining} question${remaining !== 1 ? 's' : ''} remaining`)
                    : (isEs ? 'Sin preguntas disponibles' : 'No questions remaining')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Collapse coach"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
            </button>
          </div>

          {/* Chat history */}
          {history.length > 0 && (
            <div className="divide-y divide-gray-100 dark:divide-gray-700/50 max-h-96 overflow-y-auto">
              {history.map((qa, i) => (
                <div key={i} className="p-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">Q</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{qa.question}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-xs font-bold text-primary-600 dark:text-primary-400">A</span>
                    <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{qa.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Input */}
          {remaining > 0 ? (
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 dark:border-gray-700/50">
              {error && (
                <div className="mb-3 p-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-lg">
                  {error}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isEs ? 'Pregunta sobre esta lección...' : 'Ask about this lesson...'}
                  disabled={loading}
                  className="flex-1 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      {isEs ? 'Pensando...' : 'Thinking...'}
                    </>
                  ) : (
                    isEs ? 'Preguntar' : 'Ask'
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 border-t border-gray-100 dark:border-gray-700/50 text-center text-sm text-gray-500 dark:text-gray-400">
              {isEs
                ? `Usaste todas las ${maxQuestions} preguntas de esta lección. Revisa las respuestas arriba o avanza a la siguiente lección.`
                : `You have used all ${maxQuestions} questions for this lesson. Review the answers above or move to the next lesson.`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
