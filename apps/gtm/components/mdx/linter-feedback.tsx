'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';

interface RubricItem {
  id: string;
  label: string;
  description: string;
  keywords?: string[];
  antiKeywords?: string[];
  minLength?: number;
  maxLength?: number;
}

interface RubricResult {
  id: string;
  label: string;
  description: string;
  passed: boolean;
  reason: string;
}

interface LinterFeedbackProps {
  title: string;
  description?: string;
  inputLabel?: string;
  inputPlaceholder?: string;
  rubric?: RubricItem[];
  rules?: RubricItem[];
  persistKey?: string;
}

export default function LinterFeedback({
  title,
  description,
  inputLabel,
  inputPlaceholder,
  rubric: rubricProp,
  rules,
  persistKey,
}: LinterFeedbackProps) {
  const locale = useLocale();
  const isEs = locale === 'es';

  const resolvedInputLabel = inputLabel ?? (isEs ? 'Tu contenido' : 'Your Content');
  const resolvedInputPlaceholder = inputPlaceholder ?? (isEs ? 'Pega o escribe tu contenido aquí...' : 'Paste or type your content here...');

  // Normalize: AI uses "rules" but component expects "rubric"
  const rubric = rubricProp || rules || [];
  const [content, setContent] = useState('');
  const [results, setResults] = useState<RubricResult[] | null>(null);

  // Load from localStorage
  useEffect(() => {
    if (!persistKey) return;
    try {
      const saved = localStorage.getItem(`linter-${persistKey}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setContent(parsed.content || '');
      }
    } catch {}
  }, [persistKey]);

  // Save to localStorage
  useEffect(() => {
    if (!persistKey) return;
    try {
      localStorage.setItem(`linter-${persistKey}`, JSON.stringify({ content }));
    } catch {}
  }, [content, persistKey]);

  const canRun = content.trim().length >= 30;

  const runLinter = useCallback(() => {
    const text = content.trim().toLowerCase();
    const textLength = content.trim().length;

    const evaluated: RubricResult[] = rubric.map((item) => {
      const checks: { passed: boolean; reason: string }[] = [];

      // Keywords check: at least one keyword present
      if (item.keywords && item.keywords.length > 0) {
        const found = item.keywords.some((kw) => text.includes(kw.toLowerCase()));
        checks.push({
          passed: found,
          reason: found
            ? 'Contains relevant keywords'
            : `Missing keywords (e.g., ${item.keywords.slice(0, 3).join(', ')})`,
        });
      }

      // Anti-keywords check: none should be present
      if (item.antiKeywords && item.antiKeywords.length > 0) {
        const foundBad = item.antiKeywords.filter((kw) => text.includes(kw.toLowerCase()));
        checks.push({
          passed: foundBad.length === 0,
          reason:
            foundBad.length === 0
              ? 'No problematic language detected'
              : `Found problematic terms: ${foundBad.join(', ')}`,
        });
      }

      // Min length check
      if (item.minLength !== undefined) {
        checks.push({
          passed: textLength >= item.minLength,
          reason:
            textLength >= item.minLength
              ? `Meets minimum length (${item.minLength}+ chars)`
              : `Too short (${textLength}/${item.minLength} chars)`,
        });
      }

      // Max length check
      if (item.maxLength !== undefined) {
        checks.push({
          passed: textLength <= item.maxLength,
          reason:
            textLength <= item.maxLength
              ? `Within max length (${item.maxLength} chars)`
              : `Too long (${textLength}/${item.maxLength} chars)`,
        });
      }

      // If no checks were configured, pass by default
      if (checks.length === 0) {
        return { id: item.id, label: item.label, description: item.description, passed: true, reason: 'No specific checks configured' };
      }

      const allPassed = checks.every((c) => c.passed);
      const failedCheck = checks.find((c) => !c.passed);

      return {
        id: item.id,
        label: item.label,
        description: item.description,
        passed: allPassed,
        reason: allPassed ? checks[0].reason : failedCheck!.reason,
      };
    });

    setResults(evaluated);
  }, [content, rubric]);

  const passedCount = results ? results.filter((r) => r.passed).length : 0;
  const totalCount = rubric.length;

  return (
    <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-bold text-white/80 uppercase tracking-wider">{isEs ? "Analizador de contenido" : "Content Linter"}</div>
            <div className="text-white font-bold">{title}</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">{description}</p>
        )}

        {/* Input area */}
        <div className="mb-5">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
            {resolvedInputLabel}
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={resolvedInputPlaceholder}
            rows={5}
            aria-label={resolvedInputLabel}
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-y"
          />
          <p className="text-xs text-gray-400 mt-1">
            {content.trim().length} {isEs ? "caracteres" : "characters"} ({content.trim().length < 30 ? (isEs ? `${30 - content.trim().length} más necesarios` : `${30 - content.trim().length} more needed`) : (isEs ? 'listo para analizar' : 'ready to lint')})
          </p>
        </div>

        {/* Run / Re-check button */}
        <button
          onClick={runLinter}
          disabled={!canRun}
          aria-disabled={!canRun}
          className={`w-full py-3 rounded-xl text-sm font-bold transition-all mb-5 ${
            canRun
              ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25 cursor-pointer'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
          }`}
        >
          {results ? (isEs ? 'Reanálizar' : 'Re-check') : (isEs ? 'Analizar' : 'Run Linter')}
        </button>

        {/* Results */}
        {results && (
          <div>
            {/* Score summary */}
            <div className="flex items-center justify-between mb-4 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{isEs ? "Puntaje general" : "Overall Score"}</span>
              <span
                className={`text-lg font-bold ${
                  passedCount === totalCount
                    ? 'text-emerald-500'
                    : passedCount >= totalCount / 2
                    ? 'text-amber-500'
                    : 'text-red-500'
                }`}
              >
                {passedCount}/{totalCount}
              </span>
            </div>

            {/* Per-criterion results */}
            <div className="space-y-2">
              {results.map((result) => (
                <div
                  key={result.id}
                  className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${
                    result.passed
                      ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-500/30'
                      : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-500/30'
                  }`}
                >
                  {/* Pass/Fail icon */}
                  <div className="shrink-0 mt-0.5">
                    {result.passed ? (
                      <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Passed">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Failed">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${result.passed ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                      {result.label}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{result.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
