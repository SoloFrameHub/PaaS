'use client';

import { useState, useEffect, createContext, useContext, useCallback, Children, type ReactNode } from 'react';
import { useLocale } from 'next-intl';

// ─── Assessment Context ─────────────────────────────────────
// Replaces broken DOM querySelector scraping with proper React state management.
// Children (LikertScale, ScenarioQuiz) register their values via context,
// and AssessmentEngine reads from context to compute scores.

interface AssessmentContextValue {
  registerLikert: (questionId: string, value: number) => void;
  registerScenario: (questionId: string, selectedId: string, correct: boolean) => void;
  generation: number; // incremented on reset to force children to clear state
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

function useAssessmentContext() {
  return useContext(AssessmentContext);
}

// ─── LikertScale ───────────────────────────────────────────
interface LikertScaleProps {
  question: string;
  questionId?: string;
  scale?: number;
  labels?: string[];
}

export function LikertScale({ question, questionId, scale = 5, labels }: LikertScaleProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [value, setValue] = useState<number | null>(null);
  const ctx = useAssessmentContext();
  const stableId = questionId || question.slice(0, 40);

  const defaultLabels = scale === 5
    ? (isEs
        ? ['Muy en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Muy de acuerdo']
        : ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'])
    : ['1', '2', '3', '4', '5', '6', '7'];
  const displayLabels = labels || defaultLabels;

  // Reset when generation changes (retake)
  useEffect(() => {
    if (ctx) setValue(null);
  }, [ctx?.generation]);

  const handleSelect = (v: number) => {
    setValue(v);
    ctx?.registerLikert(stableId, v);
  };

  return (
    <div className="py-4 border-b border-gray-100 dark:border-gray-700/50 last:border-0">
      <p className="font-medium text-gray-800 dark:text-gray-100 text-sm mb-3">{question}</p>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: scale }, (_, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i + 1)}
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-200 ${
              value === i + 1
                ? 'bg-primary-500 border-primary-500 text-white'
                : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-primary-300 dark:hover:border-primary-500/50'
            }`}
          >
            {displayLabels[i] || String(i + 1)}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── ScenarioQuiz ──────────────────────────────────────────
interface ScenarioQuizOption {
  id: string;
  text: string;
}

interface ScenarioQuizProps {
  question: string;
  questionId?: string;
  options: ScenarioQuizOption[];
  correctId: string;
  explanation: string;
}

export function ScenarioQuiz({ question, questionId, options, correctId, explanation }: ScenarioQuizProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const ctx = useAssessmentContext();
  const stableId = questionId || question.slice(0, 40);

  // Reset when generation changes (retake)
  useEffect(() => {
    if (ctx) {
      setSelected(null);
      setRevealed(false);
    }
  }, [ctx?.generation]);

  const handleSelect = (id: string) => {
    if (revealed) return;
    setSelected(id);
    setRevealed(true);
    ctx?.registerScenario(stableId, id, id === correctId);
  };

  return (
    <div className="py-4 border-b border-gray-100 dark:border-gray-700/50 last:border-0">
      <p className="font-medium text-gray-800 dark:text-gray-100 text-sm mb-3">{question}</p>
      <div className="space-y-2">
        {options.map((opt) => {
          let style = 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-300';
          if (revealed && opt.id === correctId) {
            style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300';
          } else if (revealed && opt.id === selected && opt.id !== correctId) {
            style = 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300';
          }
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={revealed}
              className={`w-full text-left p-3 rounded-lg text-sm border transition-all duration-200 ${style}`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className="mt-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-sm text-gray-600 dark:text-gray-400">
          <span className="font-bold text-gray-800 dark:text-gray-200">
            {selected === correctId ? (isEs ? '¡Correcto!' : 'Correct!') : (isEs ? 'No exactamente.' : 'Not quite.')}
          </span>{' '}
          {explanation}
        </div>
      )}
    </div>
  );
}

// ─── AssessmentEngine ──────────────────────────────────────
interface ScoringFeedback {
  min: number;
  max: number;
  label: string;
  message: string;
}

interface AssessmentEngineProps {
  title: string;
  children: ReactNode;
  persistKey?: string;
  scoringFeedback?: ScoringFeedback[];
}

export function AssessmentEngine({ title, children, persistKey, scoringFeedback }: AssessmentEngineProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [generation, setGeneration] = useState(0);

  // Stores for child values — keyed by questionId
  const [likertValues, setLikertValues] = useState<Map<string, number>>(new Map());
  const [scenarioValues, setScenarioValues] = useState<Map<string, { selectedId: string; correct: boolean }>>(new Map());

  // Load persisted state
  useEffect(() => {
    if (!persistKey) return;
    try {
      const saved = localStorage.getItem(`assessment-${persistKey}`);
      if (saved) {
        const data = JSON.parse(saved);
        setSubmitted(data.submitted);
        setScore(data.score);
      }
    } catch {}
  }, [persistKey]);

  const registerLikert = useCallback((questionId: string, value: number) => {
    setLikertValues(prev => {
      const next = new Map(prev);
      next.set(questionId, value);
      return next;
    });
  }, []);

  const registerScenario = useCallback((questionId: string, selectedId: string, correct: boolean) => {
    setScenarioValues(prev => {
      const next = new Map(prev);
      next.set(questionId, { selectedId, correct });
      return next;
    });
  }, []);

  const handleSubmit = () => {
    let total = 0;

    likertValues.forEach((val) => {
      total += val;
    });

    scenarioValues.forEach(({ correct }) => {
      if (correct) total += 5;
    });

    setScore(total);
    setSubmitted(true);

    if (persistKey) {
      try {
        localStorage.setItem(`assessment-${persistKey}`, JSON.stringify({ submitted: true, score: total }));
      } catch {}
    }
  };

  const handleRetake = () => {
    setSubmitted(false);
    setScore(null);
    setLikertValues(new Map());
    setScenarioValues(new Map());
    setGeneration(g => g + 1);

    if (persistKey) {
      try {
        localStorage.removeItem(`assessment-${persistKey}`);
      } catch {}
    }
  };

  const getFeedback = (): ScoringFeedback | null => {
    if (score === null || !scoringFeedback) return null;
    return scoringFeedback.find((f) => score >= f.min && score <= f.max) || null;
  };

  const feedback = getFeedback();
  const childCount = Children.count(children);

  return (
    <AssessmentContext.Provider value={{ registerLikert, registerScenario, generation }}>
      <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-primary-50 dark:bg-primary-900/20 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{childCount} {isEs ? 'preguntas' : 'questions'}</p>
        </div>

        {/* Questions */}
        <div className="px-4">
          {children}
        </div>

        {/* Submit / Results */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl bg-primary-500 text-white font-bold text-sm hover:bg-primary-600 transition-colors"
            >
              {isEs ? 'Enviar evaluación' : 'Submit Assessment'}
            </button>
          ) : (
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">{score}</div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">{isEs ? 'Tu puntaje' : 'Your Score'}</p>
              {feedback && (
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/80">
                  <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">{feedback.label}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{feedback.message}</p>
                </div>
              )}
              <button
                onClick={handleRetake}
                className="mt-3 text-xs text-primary-500 hover:underline"
              >
                {isEs ? 'Repetir evaluación' : 'Retake Assessment'}
              </button>
            </div>
          )}
        </div>
      </div>
    </AssessmentContext.Provider>
  );
}
