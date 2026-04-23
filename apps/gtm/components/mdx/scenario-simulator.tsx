'use client';

import { useState, useEffect, useMemo } from 'react';
import { useLocale } from 'next-intl';

interface SimulatorLever {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
  prefix?: boolean;
}

interface SimulatorOutput {
  id: string;
  label: string;
  formula: string;
  unit?: string;
  prefix?: boolean;
  precision?: number;
  highlight?: 'positive' | 'negative' | 'neutral';
  description?: string;
}

interface ScenarioSimulatorProps {
  title: string;
  description?: string;
  levers: SimulatorLever[];
  outputs: SimulatorOutput[];
  insight?: string;
  persistKey?: string;
}

function formatValue(value: number, unit?: string, prefix?: boolean): string {
  const formatted = Number.isInteger(value) ? value.toLocaleString() : value.toFixed(1);
  if (!unit) return formatted;
  return prefix ? `${unit}${formatted}` : `${formatted}${unit}`;
}

function calculateOutput(formula: string, values: Record<string, number>): number {
  const keys = Object.keys(values);
  const vals = Object.values(values);
  try {
    const fn = new Function(...keys, `return (${formula})`);
    const result = fn(...vals);
    return typeof result === 'number' && isFinite(result) ? result : 0;
  } catch {
    return 0;
  }
}

export default function ScenarioSimulator({ title, description, levers, outputs, insight, persistKey }: ScenarioSimulatorProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const defaultValues = useMemo(() => {
    const v: Record<string, number> = {};
    levers.forEach((l) => { v[l.id] = l.defaultValue; });
    return v;
  }, [levers]);

  const [values, setValues] = useState<Record<string, number>>(defaultValues);

  // Load persisted state
  useEffect(() => {
    if (!persistKey) return;
    try {
      const saved = localStorage.getItem(`simulator-${persistKey}`);
      if (saved) setValues(JSON.parse(saved));
    } catch {}
  }, [persistKey]);

  // Save state
  useEffect(() => {
    if (!persistKey) return;
    try {
      localStorage.setItem(`simulator-${persistKey}`, JSON.stringify(values));
    } catch {}
  }, [persistKey, values]);

  const updateValue = (id: string, val: number) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  // Calculate outputs
  const computed = useMemo(() => {
    const result: Record<string, number> = {};
    outputs.forEach((o) => {
      result[o.id] = calculateOutput(o.formula, values);
    });
    return result;
  }, [outputs, values]);

  // Build insight string
  const insightText = useMemo(() => {
    if (!insight) return '';
    let text = insight;
    // Replace {leverId} with lever values
    levers.forEach((l) => {
      text = text.replace(new RegExp(`\\{${l.id}\\}`, 'g'), formatValue(values[l.id], l.unit, l.prefix));
    });
    // Replace {outputId} with computed values
    outputs.forEach((o) => {
      text = text.replace(new RegExp(`\\{${o.id}\\}`, 'g'), formatValue(computed[o.id], o.unit, o.prefix));
    });
    return text;
  }, [insight, levers, outputs, values, computed]);

  const highlightColors = {
    positive: 'text-emerald-600 dark:text-emerald-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-800 dark:text-gray-100',
  };

  return (
    <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-primary-500 to-indigo-600">
        <h4 className="font-bold text-white text-sm">{title}</h4>
        {description && <p className="text-xs text-white/70 mt-1">{description}</p>}
      </div>

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Levers */}
          <div className="lg:w-2/5 space-y-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{isEs ? 'Ajustar palancas' : 'Adjust Levers'}</p>
            {levers.map((lever) => (
              <div key={lever.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{lever.label}</label>
                  <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                    {formatValue(values[lever.id], lever.unit, lever.prefix)}
                  </span>
                </div>
                <input
                  type="range"
                  min={lever.min}
                  max={lever.max}
                  step={lever.step}
                  value={values[lever.id]}
                  onChange={(e) => updateValue(lever.id, Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-gray-200 dark:bg-gray-700 accent-primary-500 cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                  <span>{formatValue(lever.min, lever.unit, lever.prefix)}</span>
                  <span>{formatValue(lever.max, lever.unit, lever.prefix)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Outputs */}
          <div className="lg:w-3/5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{isEs ? 'Resultados proyectados' : 'Projected Results'}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {outputs.map((output) => (
                <div key={output.id} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-500 mb-1">{output.label}</p>
                  <p className={`text-2xl font-black ${highlightColors[output.highlight || 'neutral']}`}>
                    {formatValue(
                      output.precision !== undefined
                        ? Number(computed[output.id].toFixed(output.precision))
                        : Math.round(computed[output.id] * 100) / 100,
                      output.unit, output.prefix
                    )}
                  </p>
                  {output.description && <p className="text-xs text-gray-400 mt-1">{output.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insight */}
        {insightText && (
          <div className="mt-6 p-4 rounded-xl bg-primary-50 dark:bg-primary-900/10 border border-primary-200 dark:border-primary-500/20">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{insightText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
