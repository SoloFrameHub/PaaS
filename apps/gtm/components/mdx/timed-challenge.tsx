'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useLocale } from 'next-intl';

interface ChallengeItem {
  id: string;
  stimulus?: string;
  prompt?: string;
  options?: Array<{ id: string; text: string; content?: string }>;
  correctOptionId?: string;
  correctAnswer?: string;
  explanation?: string;
}

interface TimedChallengeProps {
  title: string;
  description?: string;
  timePerItem?: number;
  timeLimit?: number;
  items: ChallengeItem[];
  persistKey?: string;
}

type NormalizedItem = ChallengeItem & { stimulus: string; options: Array<{ id: string; text: string }>; correctOptionId: string };

/** Normalize items to always have stimulus, options, and correctOptionId.
 *  For AI-generated items (prompt+correctAnswer), collects all unique answers
 *  across items to build the option set (e.g., "strong"/"weak" or "I"/"D"/"S"/"C"). */
function normalizeItems(rawItems: ChallengeItem[]): NormalizedItem[] {
  const needsNormalization = rawItems.some(item => !item.options || !item.correctOptionId);

  if (!needsNormalization) {
    return rawItems.map(item => ({
      ...item,
      stimulus: item.stimulus || item.prompt || '',
      options: item.options!.map(o => ({ id: o.id, text: o.text || (o as any).content || '' })),
      correctOptionId: item.correctOptionId!,
    }));
  }

  // Collect unique correctAnswer values to use as shared options
  const uniqueAnswers = Array.from(
    new Set(rawItems.map(item => item.correctAnswer).filter((a): a is string => !!a))
  );
  const sharedOptions = uniqueAnswers.map(ans => ({ id: ans, text: ans }));

  return rawItems.map(item => {
    const stimulus = item.stimulus || item.prompt || '';
    if (item.options && item.correctOptionId) {
      return {
        ...item,
        stimulus,
        options: item.options.map(o => ({ id: o.id, text: o.text || (o as any).content || '' })),
        correctOptionId: item.correctOptionId,
      };
    }
    return {
      ...item,
      stimulus,
      options: sharedOptions,
      correctOptionId: item.correctAnswer || '',
    };
  });
}

interface ItemResult {
  itemId: string;
  selectedOptionId: string | null;
  correct: boolean;
  timeTaken: number;
}

type Phase = 'start' | 'active' | 'feedback' | 'results';

export default function TimedChallenge({
  title,
  description,
  timePerItem: timePerItemProp,
  timeLimit,
  items: rawItems,
  persistKey,
}: TimedChallengeProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const timePerItem = timePerItemProp ?? timeLimit ?? 10;
  const items = useMemo(() => normalizeItems(rawItems), [rawItems]);
  const [phase, setPhase] = useState<Phase>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timePerItem);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [results, setResults] = useState<ItemResult[]>([]);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [bestAvgTime, setBestAvgTime] = useState<number | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answeredRef = useRef(false);

  const currentItem = items[currentIndex] ?? null;

  // Load persisted best score
  useEffect(() => {
    if (!persistKey) return;
    try {
      const saved = localStorage.getItem(`timed-challenge-${persistKey}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setBestScore(parsed.bestScore ?? null);
        setBestAvgTime(parsed.bestAvgTime ?? null);
      }
    } catch { /* ignore */ }
  }, [persistKey]);

  // Persist best score
  const persistBest = useCallback(
    (score: number, avgTime: number) => {
      if (!persistKey) return;
      try {
        const isBetter =
          bestScore === null ||
          score > bestScore ||
          (score === bestScore && avgTime < (bestAvgTime ?? Infinity));
        if (isBetter) {
          setBestScore(score);
          setBestAvgTime(avgTime);
          localStorage.setItem(
            `timed-challenge-${persistKey}`,
            JSON.stringify({ bestScore: score, bestAvgTime: avgTime })
          );
        }
      } catch { /* ignore */ }
    },
    [persistKey, bestScore, bestAvgTime]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  const handleAnswer = useCallback(
    (optionId: string | null) => {
      if (answeredRef.current || !currentItem) return;
      answeredRef.current = true;

      if (timerRef.current) clearInterval(timerRef.current);

      const timeTaken = (Date.now() - startTimeRef.current) / 1000;
      const correct = optionId === currentItem.correctOptionId;

      const result: ItemResult = {
        itemId: currentItem.id,
        selectedOptionId: optionId,
        correct,
        timeTaken: Math.min(timeTaken, timePerItem),
      };

      setSelectedOptionId(optionId);
      setResults((prev) => {
        const updated = [...prev, result];

        // Auto-advance after 1.5s
        feedbackTimeoutRef.current = setTimeout(() => {
          const nextIndex = currentIndex + 1;
          if (nextIndex >= items.length) {
            const score = updated.filter((r) => r.correct).length;
            const avg =
              updated.reduce((sum, r) => sum + r.timeTaken, 0) / updated.length;
            persistBest(score, Math.round(avg * 100) / 100);
            setPhase('results');
          } else {
            setCurrentIndex(nextIndex);
            setTimeLeft(timePerItem);
            setSelectedOptionId(null);
            answeredRef.current = false;
            startTimeRef.current = Date.now();
            setPhase('active');
          }
        }, 1500);

        return updated;
      });
      setPhase('feedback');
    },
    [currentItem, currentIndex, items.length, timePerItem, persistBest]
  );

  // Countdown timer
  useEffect(() => {
    if (phase !== 'active') return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          clearInterval(timerRef.current!);
          handleAnswer(null);
          return 0;
        }
        return Math.max(0, prev - 0.1);
      });
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, currentIndex, handleAnswer]);

  const startChallenge = () => {
    setResults([]);
    setCurrentIndex(0);
    setTimeLeft(timePerItem);
    setSelectedOptionId(null);
    answeredRef.current = false;
    startTimeRef.current = Date.now();
    setPhase('active');
  };

  // Keyboard: 1-4 keys
  useEffect(() => {
    if (phase !== 'active' || !currentItem) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= currentItem.options.length) {
        e.preventDefault();
        handleAnswer(currentItem.options[num - 1].id);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase, currentItem, handleAnswer]);

  // Timer visual helpers
  const timerFraction = timeLeft / timePerItem;
  const timerColor =
    timeLeft <= 3 ? (timeLeft <= 1.5 ? 'text-red-500' : 'text-amber-500') : 'text-primary-500';
  const timerTrailColor =
    timeLeft <= 3
      ? timeLeft <= 1.5
        ? 'stroke-red-500'
        : 'stroke-amber-500'
      : 'stroke-primary-500';

  // SVG circle timer
  const circleRadius = 28;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const circleDashoffset = circleCircumference * (1 - timerFraction);

  // Results computation
  const totalCorrect = results.filter((r) => r.correct).length;
  const avgTime =
    results.length > 0
      ? Math.round((results.reduce((s, r) => s + r.timeTaken, 0) / results.length) * 100) / 100
      : 0;

  return (
    <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-primary-500 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{title}</h4>
        </div>
        {description && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>

      {/* Start Screen */}
      {phase === 'start' && (
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-primary-600 dark:text-primary-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            {items.length} {isEs ? (items.length !== 1 ? 'preguntas' : 'pregunta') : (items.length !== 1 ? 'questions' : 'question')} &middot; {timePerItem}s {isEs ? 'c/u' : 'each'}
          </p>
          {bestScore !== null && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
              {isEs ? 'Mejor' : 'Best'}: {bestScore}/{items.length} {isEs ? 'correctas' : 'correct'}
              {bestAvgTime !== null && <> &middot; {bestAvgTime}s {isEs ? 'promedio' : 'avg'}</>}
            </p>
          )}
          <button
            onClick={startChallenge}
            className="mt-2 px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            aria-label="Start timed challenge"
          >
            {isEs ? 'Iniciar desafío' : 'Start Challenge'}
          </button>
        </div>
      )}

      {/* Active / Feedback Phase */}
      {(phase === 'active' || phase === 'feedback') && currentItem && (
        <div className="p-6">
          {/* Progress + Timer Row */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {currentIndex + 1} / {items.length}
            </span>

            {/* SVG Circle Timer */}
            <div className="relative w-16 h-16" aria-label={`${Math.ceil(timeLeft)} seconds remaining`}>
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r={circleRadius}
                  fill="none"
                  className="stroke-gray-200 dark:stroke-gray-700"
                  strokeWidth="4"
                />
                <circle
                  cx="32"
                  cy="32"
                  r={circleRadius}
                  fill="none"
                  className={`${timerTrailColor} transition-colors duration-300`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={circleDashoffset}
                  style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                />
              </svg>
              <span
                className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${timerColor} transition-colors duration-300`}
              >
                {Math.ceil(timeLeft)}
              </span>
            </div>
          </div>

          {/* Stimulus */}
          <p className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {currentItem.stimulus}
          </p>

          {/* Options */}
          <div className="space-y-2" role="group" aria-label="Answer options">
            {currentItem.options.map((option, idx) => {
              const isSelected = selectedOptionId === option.id;
              const isCorrect = option.id === currentItem.correctOptionId;
              const showFeedback = phase === 'feedback';
              const timedOut = phase === 'feedback' && selectedOptionId === null;

              let optionClasses =
                'w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800';

              if (showFeedback) {
                if (isCorrect) {
                  optionClasses +=
                    ' border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';
                } else if (isSelected && !isCorrect) {
                  optionClasses +=
                    ' border-red-500 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300';
                } else if (timedOut) {
                  optionClasses +=
                    ' border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 opacity-50';
                } else {
                  optionClasses +=
                    ' border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 opacity-50';
                }
              } else {
                optionClasses +=
                  ' border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-800/30 cursor-pointer';
              }

              return (
                <button
                  key={option.id}
                  onClick={() => {
                    if (phase === 'active') handleAnswer(option.id);
                  }}
                  disabled={phase === 'feedback'}
                  className={optionClasses}
                  aria-label={`Option ${idx + 1}: ${option.text}`}
                >
                  <span className="shrink-0 w-6 h-6 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400">
                    {idx + 1}
                  </span>
                  <span className="flex-1">{option.text}</span>
                  {showFeedback && isCorrect && (
                    <svg
                      className="w-5 h-5 text-emerald-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  {showFeedback && isSelected && !isCorrect && (
                    <svg
                      className="w-5 h-5 text-red-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation during feedback */}
          {phase === 'feedback' && currentItem.explanation && (
            <div className="mt-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {currentItem.explanation}
              </p>
            </div>
          )}

          {/* Timeout indicator */}
          {phase === 'feedback' && selectedOptionId === null && (
            <div className="mt-3 flex items-center gap-2 text-xs text-red-500 dark:text-red-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {isEs ? '¡Tiempo!' : 'Time\'s up!'}
            </div>
          )}
        </div>
      )}

      {/* Results Screen */}
      {phase === 'results' && (
        <div className="p-8 flex flex-col items-center text-center">
          {/* Score circle */}
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-4 ${
              totalCorrect === items.length
                ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : totalCorrect >= items.length / 2
                ? 'bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                : 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400'
            }`}
          >
            {totalCorrect}/{items.length}
          </div>

          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
            {totalCorrect === items.length
              ? (isEs ? '¡Puntaje perfecto!' : 'Perfect Score!')
              : totalCorrect >= items.length / 2
              ? (isEs ? '¡Buen trabajo!' : 'Good Job!')
              : (isEs ? '¡Sigue practicando!' : 'Keep Practicing')}
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span>{totalCorrect} {isEs ? 'correctas' : 'correct'}</span>
            <span>&middot;</span>
            <span>{avgTime}s {isEs ? 'promedio' : 'avg time'}</span>
          </div>

          {bestScore !== null && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
              {isEs ? 'Mejor marca' : 'Personal best'}: {bestScore}/{items.length}
              {bestAvgTime !== null && <> &middot; {bestAvgTime}s {isEs ? 'promedio' : 'avg'}</>}
            </p>
          )}

          {/* Per-item summary */}
          <div className="w-full max-w-sm mb-6">
            <div className="flex gap-1.5 justify-center">
              {results.map((r, idx) => (
                <div
                  key={idx}
                  className={`w-8 h-2 rounded-full ${
                    r.correct ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                  aria-label={`Question ${idx + 1}: ${r.correct ? 'correct' : 'incorrect'}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={startChallenge}
            className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            {isEs ? 'Intentar de nuevo' : 'Try Again'}
          </button>
        </div>
      )}
    </div>
  );
}
