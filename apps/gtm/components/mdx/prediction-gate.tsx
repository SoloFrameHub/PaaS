'use client';

import { useState, useEffect, useMemo, type ReactNode } from 'react';
import { useLocale } from 'next-intl';

interface PredictionChoice {
  id: string;
  text: string;
  isCorrect?: boolean;
}

interface PredictionGateProps {
  title?: string;
  scenario?: string;
  question: string;
  predictionType?: 'text' | 'choice';
  type?: 'text' | 'choice';
  choices?: PredictionChoice[];
  correctId?: string;
  reveal?: string;
  revealLabel?: string;
  insight?: string;
  persistKey?: string;
  children?: ReactNode;
}

export default function PredictionGate({
  title: titleProp, scenario: scenarioProp, question,
  predictionType: predictionTypeProp, type: typeProp,
  choices: choicesProp, correctId,
  reveal: revealProp, revealLabel, insight, persistKey,
  children,
}: PredictionGateProps) {
  const locale = useLocale();
  const isEs = locale === 'es';

  // Normalize: AI uses type/correctId/children instead of predictionType/isCorrect/reveal
  const title = titleProp || (isEs ? 'Haz tu predicción' : 'Make Your Prediction');
  const resolvedRevealLabel = revealLabel ?? (isEs ? 'La respuesta' : 'The Answer');
  const scenario = scenarioProp || '';
  const predictionType = predictionTypeProp || typeProp || 'choice';
  const reveal = revealProp || null;

  // Apply correctId to choices if provided
  const choices = useMemo(() => {
    if (!choicesProp) return undefined;
    if (correctId) {
      return choicesProp.map(c => ({
        ...c,
        isCorrect: c.isCorrect ?? (c.id === correctId),
      }));
    }
    return choicesProp;
  }, [choicesProp, correctId]);

  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [textPrediction, setTextPrediction] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  // Load persisted state
  useEffect(() => {
    if (!persistKey) return;
    try {
      const saved = localStorage.getItem(`prediction-${persistKey}`);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.unlocked) {
          setUnlocked(true);
          setSelectedChoice(data.selectedChoice || null);
          setTextPrediction(data.textPrediction || '');
        }
      }
    } catch {}
  }, [persistKey]);

  const commit = () => {
    setUnlocked(true);
    if (persistKey) {
      try {
        localStorage.setItem(`prediction-${persistKey}`, JSON.stringify({
          unlocked: true,
          selectedChoice,
          textPrediction,
        }));
      } catch {}
    }
  };

  const canSubmitText = predictionType === 'text' && textPrediction.length >= 30;
  const canSubmitChoice = predictionType === 'choice' && selectedChoice !== null;
  const canSubmit = canSubmitText || canSubmitChoice;

  const correctChoice = choices?.find((c) => c.isCorrect);

  return (
    <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
        <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{title}</h4>
      </div>

      <div className="p-6">
        {/* Scenario */}
        {scenario && (
          <div className="border-l-4 border-primary-400 pl-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{scenario}</p>
          </div>
        )}

        {/* Question */}
        <p className="font-bold text-gray-800 dark:text-gray-100 mb-4">{question}</p>

        {/* Prediction input */}
        {predictionType === 'choice' && choices ? (
          <div className="space-y-2 mb-6">
            {choices.map((c) => {
              let style = 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-300';
              if (unlocked && c.isCorrect) {
                style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300';
              } else if (unlocked && c.id === selectedChoice && !c.isCorrect && correctChoice) {
                style = 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300';
              } else if (c.id === selectedChoice) {
                style = 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300';
              }
              return (
                <button
                  key={c.id}
                  onClick={() => !unlocked && setSelectedChoice(c.id)}
                  disabled={unlocked}
                  className={`w-full text-left p-3 rounded-lg text-sm border-2 transition-all duration-200 ${style}`}
                >
                  {c.text}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mb-6">
            <textarea
              value={textPrediction}
              onChange={(e) => !unlocked && setTextPrediction(e.target.value)}
              disabled={unlocked}
              placeholder={isEs ? "Escribe tu predicción aquí (mínimo 30 caracteres)..." : "Type your prediction here (at least 30 characters)..."}
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none min-h-[80px] resize-y disabled:opacity-60"
            />
            <p className="text-xs text-gray-400 mt-1">{textPrediction.length}/30 {isEs ? "caracteres mínimo" : "characters minimum"}</p>
          </div>
        )}

        {/* Submit button */}
        {!unlocked && (
          <button
            onClick={commit}
            disabled={!canSubmit}
            className="w-full py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-primary-500 text-white hover:bg-primary-600"
          >
            {isEs ? "Confirmar mi predicción" : "Lock In My Prediction"}
          </button>
        )}

        {/* Reveal area */}
        <div className={`mt-6 transition-all duration-500 ${unlocked ? 'opacity-100 max-h-[2000px]' : 'opacity-40 max-h-[80px] overflow-hidden pointer-events-none select-none'}`}>
          {!unlocked && (
            <div className="flex items-center justify-center gap-2 py-6 text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm font-medium">{isEs ? "Haz tu predicción para desbloquear" : "Make your prediction to unlock"}</span>
            </div>
          )}

          {unlocked && (
            <>
              <div className="border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 rounded-r-xl p-4">
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">{resolvedRevealLabel}</p>
                <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {reveal || children}
                </div>
              </div>

              {insight && (
                <div className="mt-4 p-4 rounded-xl bg-primary-50 dark:bg-primary-900/10 border border-primary-200 dark:border-primary-500/20">
                  <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">{isEs ? "Insight clave" : "Key Insight"}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{insight}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
