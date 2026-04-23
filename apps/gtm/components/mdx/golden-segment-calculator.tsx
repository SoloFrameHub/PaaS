'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { usePersistedState } from '@/lib/hooks/usePersistedState';

interface Segment {
  name: string;
  budgetPotential: number;
  techAlignment: number;
  growthSignal: number;
  influencePotential: number;
}

function getTierInfo(score: number, isEs: boolean) {
  if (score >= 10) return { label: isEs ? 'Nivel 1' : 'Tier 1', color: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-500/30' };
  if (score >= 6) return { label: isEs ? 'Nivel 2' : 'Tier 2', color: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-500/30' };
  if (score >= 1) return { label: isEs ? 'Nivel 3' : 'Tier 3', color: 'bg-gray-400', text: 'text-gray-600 dark:text-gray-400', border: 'border-gray-400/30' };
  return { label: 'DQ', color: 'bg-red-500', text: 'text-red-700 dark:text-red-400', border: 'border-red-500/30' };
}

function getScore(seg: Segment) {
  return seg.budgetPotential + seg.techAlignment + seg.growthSignal + seg.influencePotential;
}

const emptySegment = (): Segment => ({
  name: '',
  budgetPotential: 0,
  techAlignment: 0,
  growthSignal: 0,
  influencePotential: 0,
});

export default function GoldenSegmentCalculator() {
  const locale = useLocale();
  const isEs = locale === 'es';

  const DIMENSIONS = isEs ? [
    { key: 'budgetPotential' as const, label: 'Potencial de presupuesto', desc: '¿Pueden pagar tu solución?' },
    { key: 'techAlignment' as const, label: 'Alineación tecnológica', desc: '¿Tu tecnología encaja en su stack?' },
    { key: 'growthSignal' as const, label: 'Señal de crecimiento', desc: '¿Están creciendo/invirtiendo activamente?' },
    { key: 'influencePotential' as const, label: 'Potencial de influencia', desc: '¿Pueden convertirse en cliente referente?' },
  ] : [
    { key: 'budgetPotential' as const, label: 'Budget Potential', desc: 'Can they afford your solution?' },
    { key: 'techAlignment' as const, label: 'Tech Alignment', desc: 'Does your tech fit their stack?' },
    { key: 'growthSignal' as const, label: 'Growth Signal', desc: 'Are they actively growing/investing?' },
    { key: 'influencePotential' as const, label: 'Influence Potential', desc: 'Can they become a reference customer?' },
  ];

  const [workshopData, setWorkshopData, { loaded }] = usePersistedState<Record<string, unknown>>(
    'workshop',
    'icp-workshop',
    {},
  );

  const segments: Segment[] =
    (workshopData.segments as Segment[] | undefined)?.length
      ? (workshopData.segments as Segment[])
      : [emptySegment()];

  const setSegments = (segs: Segment[]) => {
    setWorkshopData((prev) => ({ ...prev, segments: segs }));
  };

  const updateSegment = (idx: number, updates: Partial<Segment>) => {
    const next = segments.map((s, i) => (i === idx ? { ...s, ...updates } : s));
    setSegments(next);
  };

  const addSegment = () => {
    if (segments.length >= 3) return;
    setSegments([...segments, emptySegment()]);
  };

  const removeSegment = (idx: number) => {
    if (segments.length <= 1) return;
    setSegments(segments.filter((_, i) => i !== idx));
  };

  if (!loaded) return null;

  const bestIdx = segments.reduce((best, seg, i) => (getScore(seg) > getScore(segments[best]) ? i : best), 0);

  return (
    <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-primary-500/10 to-fuchsia-500/10 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📊</span>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">{isEs ? 'Calculadora de segmento dorado' : 'Golden Segment Calculator'}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{isEs ? 'Puntúa hasta 3 segmentos en 4 dimensiones (0-3 c/u, máx 12)' : 'Score up to 3 segments across 4 dimensions (0-3 each, max 12)'}</p>
          </div>
        </div>
      </div>

      {/* Segments */}
      <div className="p-5 space-y-6">
        {segments.map((seg, segIdx) => {
          const score = getScore(seg);
          const tier = getTierInfo(score, isEs);
          const isBest = segments.length > 1 && segIdx === bestIdx && score > 0;

          return (
            <div key={segIdx} className={`rounded-xl border ${tier.border} bg-gray-50 dark:bg-gray-800/40 overflow-hidden`}>
              {/* Segment header */}
              <div className="p-4 flex items-center gap-3">
                <input
                  type="text"
                  value={seg.name}
                  onChange={(e) => updateSegment(segIdx, { name: e.target.value })}
                  placeholder={isEs ? `Nombre del segmento ${segIdx + 1} (ej., "Agencias SEO medianas")` : `Segment ${segIdx + 1} name (e.g., "Mid-size SEO Agencies")`}
                  className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                />
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white ${tier.color}`}>
                    {tier.label}
                  </span>
                  <span className={`text-xl font-black ${tier.text}`}>{score}/12</span>
                </div>
                {segments.length > 1 && (
                  <button
                    onClick={() => removeSegment(segIdx)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove segment"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>

              {/* Scoring sliders */}
              <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DIMENSIONS.map((dim) => (
                  <div key={dim.key} className="bg-white dark:bg-gray-900/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">{dim.label}</label>
                      <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{seg[dim.key]}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={3}
                      step={1}
                      value={seg[dim.key]}
                      onChange={(e) => updateSegment(segIdx, { [dim.key]: Number(e.target.value) })}
                      className="w-full h-1.5 rounded-full appearance-none bg-gray-200 dark:bg-gray-700 accent-primary-500 cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                    />
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">{dim.desc}</p>
                  </div>
                ))}
              </div>

              {/* Best segment badge */}
              {isBest && (
                <div className="px-4 pb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    {isEs ? 'Segmento dorado' : 'Golden Segment'}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Add segment button */}
        {segments.length < 3 && (
          <button
            onClick={addSegment}
            className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-colors"
          >
            {isEs ? `+ Agregar segmento (${segments.length}/3)` : `+ Add Segment (${segments.length}/3)`}
          </button>
        )}

        {/* Comparison summary */}
        {segments.length > 1 && segments.some((s) => getScore(s) > 0) && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900/50 rounded-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">{isEs ? 'Comparación' : 'Comparison'}</h4>
            <div className="space-y-2">
              {segments.map((seg, i) => {
                const score = getScore(seg);
                const pct = (score / 12) * 100;
                const tier = getTierInfo(score, isEs);
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-32 truncate">{seg.name || (isEs ? `Segmento ${i + 1}` : `Segment ${i + 1}`)}</span>
                    <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${tier.color}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className={`text-sm font-bold ${tier.text} w-10 text-right`}>{score}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
