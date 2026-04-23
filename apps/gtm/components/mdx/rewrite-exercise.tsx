'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';

// ─── Types ──────────────────────────────────────────────────
interface RewriteExerciseProps {
  title: string;
  description?: string;
  prompt?: string;
  original?: string;
  promptLabel?: string;
  expertAnswer?: string;
  expertRewrite?: string;
  expertLabel?: string;
  hints?: string[];
  hint?: string;
  evaluationCriteria?: string[];
  criteria?: string[];
  persistKey?: string;
}

// ─── Component ──────────────────────────────────────────────
export default function RewriteExercise({
  title,
  description,
  prompt: promptProp,
  original,
  promptLabel,
  expertAnswer: expertAnswerProp,
  expertRewrite,
  expertLabel,
  hints: hintsProp,
  hint,
  evaluationCriteria: evaluationCriteriaProp,
  criteria,
  persistKey,
}: RewriteExerciseProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  // Normalize: AI uses original/expertRewrite/hint/criteria
  const prompt = promptProp || original || '';
  const expertAnswer = expertAnswerProp || expertRewrite || '';
  const resolvedPromptLabel = promptLabel ?? (isEs ? 'Original' : 'Original');
  const resolvedExpertLabel = expertLabel ?? (isEs ? 'Reescritura experta' : 'Expert Rewrite');
  const hints = hintsProp || (hint ? [hint] : []);
  const evaluationCriteria = evaluationCriteriaProp || criteria || [];
  const [userText, setUserText] = useState('');
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [compared, setCompared] = useState(false);
  const [checkedCriteria, setCheckedCriteria] = useState<Set<number>>(new Set());
  const [bestAttempt, setBestAttempt] = useState<string | null>(null);

  // Load persisted state
  useEffect(() => {
    if (!persistKey) return;
    try {
      const saved = localStorage.getItem(`rewrite-${persistKey}`);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.bestAttempt) setBestAttempt(data.bestAttempt);
      }
    } catch {}
  }, [persistKey]);

  // Persist best attempt
  const persistAttempt = useCallback(
    (text: string) => {
      if (!persistKey) return;
      // Keep the longer / more recent attempt as "best"
      const best = bestAttempt && bestAttempt.length > text.length ? bestAttempt : text;
      setBestAttempt(best);
      try {
        localStorage.setItem(`rewrite-${persistKey}`, JSON.stringify({ bestAttempt: best }));
      } catch {}
    },
    [persistKey, bestAttempt],
  );

  const canCompare = userText.trim().length >= 20;

  const handleCompare = () => {
    if (!canCompare) return;
    setCompared(true);
    persistAttempt(userText.trim());
  };

  const handleRevealHint = () => {
    if (hintsRevealed < hints.length) {
      setHintsRevealed((prev) => prev + 1);
    }
  };

  const toggleCriterion = (idx: number) => {
    setCheckedCriteria((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleReset = () => {
    setUserText('');
    setHintsRevealed(0);
    setCompared(false);
    setCheckedCriteria(new Set());
  };

  return (
    <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
        <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{title}</h4>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* Prompt / "Before" text */}
        <div>
          <label className="block text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1.5 uppercase tracking-wide">
            {resolvedPromptLabel}
          </label>
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/30">
            <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{prompt}</p>
          </div>
        </div>

        {/* Hints */}
        {hints.length > 0 && (
          <div>
            {hintsRevealed > 0 && (
              <div className="space-y-2 mb-3">
                {hints.slice(0, hintsRevealed).map((hint, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-500/30 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="font-semibold text-primary-600 dark:text-primary-400">{isEs ? `Pista ${i + 1}:` : `Hint ${i + 1}:`}</span>{' '}
                    {hint}
                  </div>
                ))}
              </div>
            )}
            {hintsRevealed < hints.length && (
              <button
                onClick={handleRevealHint}
                className="text-xs font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label={`Show hint ${hintsRevealed + 1} of ${hints.length}`}
              >
                {isEs ? `Mostrar pista (${hintsRevealed}/${hints.length})` : `Show Hint (${hintsRevealed}/${hints.length})`}
              </button>
            )}
          </div>
        )}

        {/* User textarea */}
        <div>
          <label
            htmlFor={`rewrite-input-${title.replace(/\s/g, '-')}`}
            className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide"
          >
            {isEs ? "Tu reescritura" : "Your Rewrite"}
          </label>
          <textarea
            id={`rewrite-input-${title.replace(/\s/g, '-')}`}
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            placeholder={isEs ? "Escribe tu versión mejorada aquí..." : "Write your improved version here..."}
            rows={4}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-y"
            aria-describedby={canCompare ? undefined : `rewrite-hint-${title.replace(/\s/g, '-')}`}
          />
          {!canCompare && userText.length > 0 && (
            <p
              id={`rewrite-hint-${title.replace(/\s/g, '-')}`}
              className="text-xs text-gray-400 dark:text-gray-600 mt-1"
            >
              {isEs ? `${20 - userText.trim().length} caracteres más para comparar` : `${20 - userText.trim().length} more characters needed to compare`}
            </p>
          )}
        </div>

        {/* Compare button */}
        {!compared && (
          <button
            onClick={handleCompare}
            disabled={!canCompare}
            className="w-full py-3 rounded-xl bg-primary-500 text-white font-bold text-sm hover:bg-primary-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {isEs ? "Comparar con el experto" : "Compare with Expert"}
          </button>
        )}

        {/* Side-by-side comparison */}
        {compared && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* User's rewrite */}
              <div>
                <label className="block text-xs font-semibold text-primary-600 dark:text-primary-400 mb-1.5 uppercase tracking-wide">
                  {isEs ? "Tu versión" : "Your Version"}
                </label>
                <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-500/30 h-full">
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {userText}
                  </p>
                </div>
              </div>
              {/* Expert answer */}
              <div>
                <label className="block text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1.5 uppercase tracking-wide">
                  {resolvedExpertLabel}
                </label>
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-500/30 h-full">
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {expertAnswer}
                  </p>
                </div>
              </div>
            </div>

            {/* Evaluation criteria as self-check checkboxes */}
            {evaluationCriteria.length > 0 && (
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {isEs ? "Lista de autoevaluación" : "Self-Evaluation Checklist"}
                  </p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                  {evaluationCriteria.map((criterion, idx) => {
                    const isChecked = checkedCriteria.has(idx);
                    return (
                      <button
                        key={idx}
                        role="checkbox"
                        aria-checked={isChecked}
                        onClick={() => toggleCriterion(idx)}
                        className={`w-full flex items-start gap-3 p-3 text-left transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/30 ${
                          isChecked ? 'opacity-70' : ''
                        }`}
                      >
                        <span
                          className={`shrink-0 mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                            isChecked
                              ? 'bg-emerald-500 border-emerald-500'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {isChecked && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        <span
                          className={`text-sm leading-relaxed ${
                            isChecked
                              ? 'line-through text-gray-400 dark:text-gray-600'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {criterion}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {evaluationCriteria.length > 0 && (
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-400 dark:text-gray-600">
                      {checkedCriteria.size}/{evaluationCriteria.length} {isEs ? "criterios cumplidos" : "criteria met"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Try again */}
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl border-2 border-primary-500 text-primary-500 font-bold text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              aria-label="Reset and try the exercise again"
            >
              {isEs ? "Intentar de nuevo" : "Try Again"}
            </button>

            {bestAttempt && bestAttempt !== userText && (
              <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
                {isEs ? "Tu mejor intento anterior fue guardado." : "Your previous best attempt has been saved."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
