'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocale } from 'next-intl';

// ─── Types ──────────────────────────────────────────────────
interface Category {
  id: string;
  label: string;
  color?: string;
}

interface ClassifyItem {
  id: string;
  text?: string;
  content?: string;
  correctCategoryId?: string;
  correctCategory?: string;
  explanation?: string;
}

interface ClassifyExerciseProps {
  title: string;
  description?: string;
  categories: Category[];
  items: ClassifyItem[];
  persistKey?: string;
  shuffleItems?: boolean;
}

// ─── Color helpers ──────────────────────────────────────────
const CATEGORY_COLORS = [
  { bg: 'bg-primary-500', hover: 'hover:bg-primary-600', text: 'text-primary-500' },
  { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-600', text: 'text-emerald-500' },
  { bg: 'bg-amber-500', hover: 'hover:bg-amber-600', text: 'text-amber-500' },
  { bg: 'bg-rose-500', hover: 'hover:bg-rose-600', text: 'text-rose-500' },
  { bg: 'bg-violet-500', hover: 'hover:bg-violet-600', text: 'text-violet-500' },
  { bg: 'bg-cyan-500', hover: 'hover:bg-cyan-600', text: 'text-cyan-500' },
];

function getCategoryColor(index: number) {
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
}

// ─── Shuffle utility ────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ─── Component ──────────────────────────────────────────────
export default function ClassifyExercise({
  title,
  description,
  categories,
  items,
  persistKey,
  shuffleItems = true,
}: ClassifyExerciseProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [orderedItems, setOrderedItems] = useState<ClassifyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [finished, setFinished] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  // Initialize items
  useEffect(() => {
    setOrderedItems(shuffleItems ? shuffle(items) : [...items]);
  }, [items, shuffleItems]);

  // Load best score from localStorage
  useEffect(() => {
    if (!persistKey) return;
    try {
      const saved = localStorage.getItem(`classify-${persistKey}`);
      if (saved) {
        const data = JSON.parse(saved);
        if (typeof data.bestScore === 'number') setBestScore(data.bestScore);
      }
    } catch {}
  }, [persistKey]);

  // Save best score to localStorage
  const persistBestScore = useCallback(
    (score: number) => {
      if (!persistKey) return;
      const newBest = bestScore === null ? score : Math.max(bestScore, score);
      setBestScore(newBest);
      try {
        localStorage.setItem(`classify-${persistKey}`, JSON.stringify({ bestScore: newBest }));
      } catch {}
    },
    [persistKey, bestScore],
  );

  // Derived
  const total = orderedItems.length;
  const currentItem = orderedItems[currentIndex] ?? null;
  const progress = total > 0 ? (Object.keys(answers).length / total) * 100 : 0;

  const currentScore = useMemo(() => {
    return Object.entries(answers).reduce((acc, [itemId, catId]) => {
      const item = items.find((i) => i.id === itemId);
      return (item?.correctCategoryId || item?.correctCategory) === catId ? acc + 1 : acc;
    }, 0);
  }, [answers, items]);

  const categoryColorMap = useMemo(() => {
    const map: Record<string, ReturnType<typeof getCategoryColor>> = {};
    categories.forEach((cat, i) => {
      map[cat.id] = getCategoryColor(i);
    });
    return map;
  }, [categories]);

  // Handle classification
  const handleClassify = (categoryId: string) => {
    if (!currentItem || feedback) return;

    const isCorrect = (currentItem.correctCategoryId || currentItem.correctCategory) === categoryId;
    const newAnswers = { ...answers, [currentItem.id]: categoryId };
    setAnswers(newAnswers);
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 >= total) {
        const finalScore = Object.entries(newAnswers).reduce((acc, [itemId, catId]) => {
          const item = items.find((i) => i.id === itemId);
          return (item?.correctCategoryId || item?.correctCategory) === catId ? acc + 1 : acc;
        }, 0);
        persistBestScore(finalScore);
        setFinished(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 800);
  };

  // Try again
  const handleRetry = () => {
    setOrderedItems(shuffleItems ? shuffle(items) : [...items]);
    setCurrentIndex(0);
    setAnswers({});
    setFeedback(null);
    setFinished(false);
  };

  // ─── Results summary ───────────────────────────────────
  if (finished) {
    const finalScore = Object.entries(answers).reduce((acc, [itemId, catId]) => {
      const item = items.find((i) => i.id === itemId);
      return (item?.correctCategoryId || item?.correctCategory) === catId ? acc + 1 : acc;
    }, 0);
    const pct = total > 0 ? Math.round((finalScore / total) * 100) : 0;

    return (
      <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{title}</h4>
        </div>

        {/* Score */}
        <div className="p-6 text-center">
          <div
            className={`text-4xl font-bold mb-1 ${
              pct >= 80
                ? 'text-emerald-500'
                : pct >= 50
                  ? 'text-amber-500'
                  : 'text-red-500'
            }`}
          >
            {finalScore}/{total}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">{pct}% {isEs ? 'correctas' : 'correct'}</p>
          {bestScore !== null && (
            <p className="text-xs text-gray-400 dark:text-gray-600">
              {isEs ? 'Mejor puntaje' : 'Best score'}: {bestScore}/{total}
            </p>
          )}
        </div>

        {/* Review */}
        <div className="px-4 pb-2">
          <div className="space-y-2">
            {orderedItems.map((item) => {
              const userCat = answers[item.id];
              const isCorrect = userCat === (item.correctCategoryId || item.correctCategory);
              const correctLabel = categories.find((c) => c.id === (item.correctCategoryId || item.correctCategory))?.label;
              const userLabel = categories.find((c) => c.id === userCat)?.label;
              const color = categoryColorMap[(item.correctCategoryId || item.correctCategory) ?? ''];

              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border text-sm ${
                    isCorrect
                      ? 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-900/10'
                      : 'border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-900/10'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5" aria-hidden="true">
                      {isCorrect ? (
                        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 dark:text-gray-200 font-medium">{item.text || item.content}</p>
                      {!isCorrect && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {isEs ? 'Tu respuesta' : 'Your answer'}: <span className="text-red-500">{userLabel}</span>{' '}
                          <span className={color?.text}>({correctLabel})</span>
                        </p>
                      )}
                      {item.explanation && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.explanation}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Retry */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleRetry}
            className="w-full py-3 rounded-xl bg-primary-500 text-white font-bold text-sm hover:bg-primary-600 transition-colors"
            aria-label="Try the exercise again"
          >
            {isEs ? 'Intentar de nuevo' : 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  // ─── Active exercise ───────────────────────────────────
  return (
    <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{title}</h4>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            {currentIndex + 1}/{total}
          </span>
        </div>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{description}</p>
        )}
        {/* Progress bar */}
        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="px-4 pt-4 flex flex-wrap gap-2" role="group" aria-label="Classification categories">
        {categories.map((cat, i) => {
          const color = getCategoryColor(i);
          return (
            <button
              key={cat.id}
              onClick={() => handleClassify(cat.id)}
              disabled={feedback !== null}
              className={`px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50 ${color.bg} ${color.hover}`}
              aria-label={`Classify as ${cat.label}`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Current item card */}
      <div className="p-4" aria-live="polite">
        {currentItem && (
          <div
            className={`relative p-5 rounded-xl border-2 transition-all duration-300 ${
              feedback === 'correct'
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                : feedback === 'incorrect'
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/30'
            }`}
          >
            <p className="text-gray-800 dark:text-gray-100 text-sm font-medium leading-relaxed">
              {currentItem.text || currentItem.content}
            </p>
            {feedback && (
              <div className="mt-3 flex items-center gap-2">
                {feedback === 'correct' ? (
                  <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {isEs ? '¡Correcto!' : 'Correct!'}
                  </span>
                ) : (
                  <span className="text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    {categories.find((c) => c.id === (currentItem.correctCategoryId || currentItem.correctCategory))?.label}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Running score */}
      <div className="px-4 pb-4">
        <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
          {isEs ? 'Puntaje' : 'Score'}: {currentScore}/{Object.keys(answers).length} {isEs ? 'correctas' : 'correct'}
        </p>
      </div>
    </div>
  );
}
