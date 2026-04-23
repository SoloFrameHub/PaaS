'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';

interface SwipeCard {
  id: string;
  text?: string;
  content?: string;
  correctOption: 'a' | 'b';
  explanation?: string;
}

interface SwipeDecisionProps {
  title: string;
  description?: string;
  optionA: string;
  optionB: string;
  cards: SwipeCard[];
  persistKey?: string;
}

export default function SwipeDecision({ title, description, optionA, optionB, cards, persistKey }: SwipeDecisionProps) {
  const locale = useLocale();
  const isEs = locale === 'es';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [currentExplanation, setCurrentExplanation] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [mistakes, setMistakes] = useState<Array<{ card: SwipeCard; picked: 'a' | 'b' }>>([]);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [animClass, setAnimClass] = useState('');

  // Load persisted best score
  useEffect(() => {
    if (!persistKey) return;
    try {
      const saved = localStorage.getItem(`swipe-${persistKey}`);
      if (saved) setBestScore(JSON.parse(saved).bestScore ?? null);
    } catch {}
  }, [persistKey]);

  const saveBest = useCallback((newScore: number) => {
    if (!persistKey) return;
    const best = bestScore !== null ? Math.max(bestScore, newScore) : newScore;
    setBestScore(best);
    try {
      localStorage.setItem(`swipe-${persistKey}`, JSON.stringify({ bestScore: best }));
    } catch {}
  }, [persistKey, bestScore]);

  const handleChoice = useCallback((choice: 'a' | 'b') => {
    if (feedback || finished) return;
    const card = cards[currentIndex];
    const isCorrect = choice === card.correctOption;

    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback('correct');
      setAnimClass('translate-y-[-20px] opacity-0');
    } else {
      setFeedback('wrong');
      setMistakes((m) => [...m, { card, picked: choice }]);
      setAnimClass('animate-[shake_0.3s_ease-in-out]');
    }
    setCurrentExplanation(card.explanation || null);

    setTimeout(() => {
      if (!isCorrect) setAnimClass('translate-y-[-20px] opacity-0');
    }, 400);

    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex >= cards.length) {
        const finalScore = isCorrect ? score + 1 : score;
        setFinished(true);
        saveBest(finalScore);
      } else {
        setCurrentIndex(nextIndex);
      }
      setFeedback(null);
      setCurrentExplanation(null);
      setAnimClass('');
    }, 1500);
  }, [feedback, finished, cards, currentIndex, score, saveBest]);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleChoice('a');
      if (e.key === 'ArrowRight') handleChoice('b');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleChoice]);

  const reset = () => {
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setCurrentExplanation(null);
    setFinished(false);
    setMistakes([]);
    setAnimClass('');
  };

  const card = cards[currentIndex];

  return (
    <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{title}</h4>
            {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
          </div>
          {!finished && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{isEs ? `Tarjeta ${currentIndex + 1}/${cards.length}` : `Card ${currentIndex + 1}/${cards.length}`}</span>
              <span className="px-2 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold">{score} {isEs ? "correctas" : "correct"}</span>
            </div>
          )}
        </div>
        {/* Progress bar */}
        {!finished && (
          <div className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary-500 rounded-full transition-all duration-300" style={{ width: `${(currentIndex / cards.length) * 100}%` }} />
          </div>
        )}
      </div>

      {/* Card area */}
      <div className="p-6">
        {!finished ? (
          <>
            {/* Card */}
            <div
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 text-center min-h-[140px] flex items-center justify-center transition-all duration-300 ${animClass} ${
                feedback === 'correct' ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' :
                feedback === 'wrong' ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : ''
              }`}
            >
              <p className="text-gray-800 dark:text-gray-100 font-medium leading-relaxed">{card.text || card.content}</p>
              {feedback && (
                <div className="absolute top-3 right-3">
                  {feedback === 'correct' ? (
                    <span className="text-emerald-500 text-xl">&#10003;</span>
                  ) : (
                    <span className="text-red-500 text-xl">&#10007;</span>
                  )}
                </div>
              )}
            </div>

            {/* Explanation */}
            {currentExplanation && (
              <div className="mt-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/80 text-xs text-gray-600 dark:text-gray-400 text-center">
                {currentExplanation}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleChoice('a')}
                disabled={!!feedback}
                className="flex-1 py-4 rounded-xl font-bold text-sm border-2 transition-all duration-200 disabled:opacity-50 border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                aria-label={`Choose ${optionA}`}
              >
                <span className="text-xs text-blue-400 block mb-1">{isEs ? "← Izquierda" : "← Left"}</span>
                {optionA}
              </button>
              <button
                onClick={() => handleChoice('b')}
                disabled={!!feedback}
                className="flex-1 py-4 rounded-xl font-bold text-sm border-2 transition-all duration-200 disabled:opacity-50 border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40"
                aria-label={`Choose ${optionB}`}
              >
                <span className="text-xs text-amber-400 block mb-1">{isEs ? "Derecha →" : "Right →"}</span>
                {optionB}
              </button>
            </div>
          </>
        ) : (
          /* Results */
          <div className="text-center">
            <div className="text-4xl font-black text-primary-600 dark:text-primary-400 mb-1">{score}/{cards.length}</div>
            <p className="text-sm text-gray-500 mb-4">
              {score === cards.length
                ? (isEs ? '¡Puntaje perfecto!' : 'Perfect score!')
                : score >= cards.length * 0.7
                  ? (isEs ? '¡Buen trabajo!' : 'Great job!')
                  : (isEs ? '¡Sigue practicando!' : 'Keep practicing!')}
            </p>
            {bestScore !== null && <p className="text-xs text-gray-400 mb-4">{isEs ? `Mejor: ${bestScore}/${cards.length}` : `Best: ${bestScore}/${cards.length}`}</p>}

            {mistakes.length > 0 && (
              <div className="text-left mt-4 space-y-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{isEs ? "Revisar errores:" : "Review mistakes:"}</p>
                {mistakes.map((m, i) => (
                  <div key={i} className="p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 text-sm">
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{m.card.text}</p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      {isEs ? "Respondiste" : "You said"}: {m.picked === 'a' ? optionA : optionB} — {isEs ? "Correcto" : "Correct"}: {m.card.correctOption === 'a' ? optionA : optionB}
                    </p>
                    {m.card.explanation && <p className="text-xs text-gray-500 mt-1">{m.card.explanation}</p>}
                  </div>
                ))}
              </div>
            )}

            <button onClick={reset} className="mt-6 px-6 py-3 rounded-xl bg-primary-500 text-white font-bold text-sm hover:bg-primary-600 transition-colors">
              {isEs ? "Jugar de nuevo" : "Play Again"}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}
