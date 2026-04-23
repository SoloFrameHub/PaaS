'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { usePersistedState } from '@/lib/hooks/usePersistedState';

interface ICPWorkshopProps {
  step: number;
}

const TOTAL_STEPS = 13;

interface WorkshopData {
  // Step 1: Niche
  targetMarket?: string;
  nicheReason?: string;
  // Step 2: Firmographics
  companySize?: string;
  industry?: string;
  geography?: string;
  techStack?: string;
  // Step 3: Golden Segment (segments stored separately by Calculator)
  segments?: unknown[];
  // Step 4: ICP vs Persona
  championTitle?: string;
  championGoals?: string;
  economicBuyerTitle?: string;
  // Step 5: Psychographics
  buyerMindset?: string;
  riskTolerance?: string;
  careerAmbition?: string;
  // Step 6: Behavioral Signals
  triggerEvents?: string[];
  timingSignals?: string;
  // Step 7: Anti-Persona
  disqualifiers?: string[];
  antiPersonaTraits?: string;
  // Step 8: Account Tiering
  tier1Criteria?: string;
  tier2Criteria?: string;
  tier3Criteria?: string;
  // Step 9: Enrichment
  dataSourcePrimary?: string;
  dataSourceSecondary?: string;
  verificationProcess?: string;
  // Step 10: Buying Committee
  committeeRoles?: { title: string; influence: string; messaging: string }[];
  // Step 11: Creating Urgency
  compellingEvent?: string;
  costOfInaction?: string;
  // Step 12: Execution
  validHundredCriteria?: string;
  outreachChannel?: string;
  // Step 13: Creator Persona
  followerPersona?: string;
  wedgeProduct?: string;
  // Meta
  completedSteps?: number[];
}

interface FieldDef {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'list' | 'committee';
}

const STEP_CONFIG: Record<number, { title: string; fields: FieldDef[] }> = {
  1: {
    title: 'Target Market & Niche',
    fields: [
      { key: 'targetMarket', label: 'Target Market', placeholder: 'e.g., "Mid-size SEO agencies with 10-50 employees"', type: 'text' },
      { key: 'nicheReason', label: 'Why This Niche?', placeholder: 'What makes this niche a good fit for you?', type: 'textarea' },
    ],
  },
  2: {
    title: 'Firmographic Profile',
    fields: [
      { key: 'companySize', label: 'Company Size', placeholder: 'e.g., "10-50 employees, $1M-$5M revenue"', type: 'text' },
      { key: 'industry', label: 'Industry / Vertical', placeholder: 'e.g., "Digital Marketing / SEO"', type: 'text' },
      { key: 'geography', label: 'Geography', placeholder: 'e.g., "US & UK, English-speaking"', type: 'text' },
      { key: 'techStack', label: 'Tech Stack', placeholder: 'e.g., "Ahrefs, Screaming Frog, HubSpot"', type: 'text' },
    ],
  },
  3: {
    title: 'Golden Segment Scores',
    fields: [], // Handled by GoldenSegmentCalculator
  },
  4: {
    title: 'Champion & Economic Buyer',
    fields: [
      { key: 'championTitle', label: 'Champion Title/Role', placeholder: 'e.g., "VP of Marketing" or "Head of SEO"', type: 'text' },
      { key: 'championGoals', label: 'Champion Goals', placeholder: 'What does this person need to achieve?', type: 'textarea' },
      { key: 'economicBuyerTitle', label: 'Economic Buyer Title', placeholder: 'Who signs the check? e.g., "CEO" or "CFO"', type: 'text' },
    ],
  },
  5: {
    title: 'Psychographic Profile',
    fields: [
      { key: 'buyerMindset', label: 'Buyer Mindset', placeholder: 'How do they think about solutions? Risk-averse? Data-driven?', type: 'textarea' },
      { key: 'riskTolerance', label: 'Risk Tolerance', placeholder: 'e.g., "Low — needs proven ROI and case studies"', type: 'text' },
      { key: 'careerAmbition', label: 'Career Ambition', placeholder: 'What career milestone is your champion chasing?', type: 'text' },
    ],
  },
  6: {
    title: 'Behavioral & Timing Signals',
    fields: [
      { key: 'triggerEvents', label: 'Trigger Events (one per line)', placeholder: 'e.g., "New funding round\nNew CMO hired\nRecent IPO"', type: 'list' },
      { key: 'timingSignals', label: 'Timing Signals', placeholder: 'When in the year/quarter do they buy?', type: 'textarea' },
    ],
  },
  7: {
    title: 'Anti-Persona (Who NOT to Target)',
    fields: [
      { key: 'disqualifiers', label: 'Disqualifiers (one per line)', placeholder: 'e.g., "Less than 5 employees\nNo budget allocated\nAlready using competitor X"', type: 'list' },
      { key: 'antiPersonaTraits', label: 'Anti-Persona Traits', placeholder: 'What makes someone a BAD fit even if they seem interested?', type: 'textarea' },
    ],
  },
  8: {
    title: 'Account Tiering Criteria',
    fields: [
      { key: 'tier1Criteria', label: 'Tier 1 (Dream Accounts)', placeholder: 'What makes an account "Tier 1"?', type: 'textarea' },
      { key: 'tier2Criteria', label: 'Tier 2 (Good Fit)', placeholder: 'Solid fit but not dream accounts...', type: 'textarea' },
      { key: 'tier3Criteria', label: 'Tier 3 (Opportunistic)', placeholder: 'Worth pursuing if they come to you...', type: 'textarea' },
    ],
  },
  9: {
    title: 'Data Enrichment Strategy',
    fields: [
      { key: 'dataSourcePrimary', label: 'Primary Data Source', placeholder: 'e.g., "LinkedIn Sales Navigator"', type: 'text' },
      { key: 'dataSourceSecondary', label: 'Secondary Data Source', placeholder: 'e.g., "BuiltWith, Crunchbase"', type: 'text' },
      { key: 'verificationProcess', label: 'Verification Process', placeholder: 'How do you verify data quality before outreach?', type: 'textarea' },
    ],
  },
  10: {
    title: 'Buying Committee Map',
    fields: [
      { key: 'committeeRoles', label: 'Committee Roles', placeholder: '', type: 'committee' },
    ],
  },
  11: {
    title: 'Urgency & Compelling Events',
    fields: [
      { key: 'compellingEvent', label: 'Compelling Event', placeholder: 'What event creates urgency to buy NOW?', type: 'textarea' },
      { key: 'costOfInaction', label: 'Cost of Inaction', placeholder: 'What does it cost them NOT to solve this?', type: 'textarea' },
    ],
  },
  12: {
    title: 'Execution Plan',
    fields: [
      { key: 'validHundredCriteria', label: '"Valid 100" Criteria', placeholder: 'What criteria define your first 100 perfect-fit accounts?', type: 'textarea' },
      { key: 'outreachChannel', label: 'Primary Outreach Channel', placeholder: 'e.g., "LinkedIn DMs + Cold Email Sequence"', type: 'text' },
    ],
  },
  13: {
    title: 'Creator Persona & Wedge',
    fields: [
      { key: 'followerPersona', label: 'Follower Persona', placeholder: 'Who is the ideal person who follows your content?', type: 'textarea' },
      { key: 'wedgeProduct', label: 'Wedge Product', placeholder: 'What is the low-friction first product/offer?', type: 'text' },
    ],
  },
};

export default function ICPWorkshop({ step }: ICPWorkshopProps) {
  const locale = useLocale();
  const isEs = locale === 'es';

  const [data, setData, { loaded }] = usePersistedState<WorkshopData>(
    'workshop',
    'icp-workshop',
    {},
  );
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([step]));
  const [exporting, setExporting] = useState(false);

  const updateField = (key: string, value: unknown) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const markStepComplete = () => {
    setData((prev) => {
      const completed = new Set(prev.completedSteps || []);
      completed.add(step);
      return { ...prev, completedSteps: Array.from(completed) };
    });
  };

  const toggleStep = (s: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  };

  const completedSteps = new Set(data.completedSteps || []);
  const completedCount = completedSteps.size;
  const config = STEP_CONFIG[step];

  const exportSummary = () => {
    setExporting(true);
    const lines: string[] = [isEs ? '=== TU DOCUMENTO ICP ===' : '=== YOUR ICP DOCUMENT ===', ''];
    for (let s = 1; s <= TOTAL_STEPS; s++) {
      const cfg = STEP_CONFIG[s];
      lines.push(`## ${s}. ${cfg.title}`);
      if (s === 3 && data.segments) {
        (data.segments as { name: string; budgetPotential: number; techAlignment: number; growthSignal: number; influencePotential: number }[]).forEach((seg) => {
          const score = seg.budgetPotential + seg.techAlignment + seg.growthSignal + seg.influencePotential;
          lines.push(`  - ${seg.name || 'Unnamed'}: ${score}/12`);
        });
      } else if (s === 10 && data.committeeRoles) {
        data.committeeRoles.forEach((r) => {
          lines.push(`  - ${r.title} (Influence: ${r.influence}) — ${r.messaging}`);
        });
      } else {
        cfg.fields.forEach((f) => {
          const val = (data as Record<string, unknown>)[f.key];
          if (Array.isArray(val)) {
            lines.push(`  ${f.label}: ${val.join(', ')}`);
          } else if (val) {
            lines.push(`  ${f.label}: ${val}`);
          }
        });
      }
      lines.push('');
    }

    const text = lines.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-icp-document.txt';
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setExporting(false), 1000);
  };

  if (!loaded) return null;

  // Collect all prior steps that have any data
  const priorSteps = [];
  for (let s = 1; s < step; s++) {
    const cfg = STEP_CONFIG[s];
    const hasData = s === 3
      ? (data.segments && (data.segments as unknown[]).length > 0)
      : cfg.fields.some((f) => {
          const val = (data as Record<string, unknown>)[f.key];
          return val && (typeof val === 'string' ? val.trim() : true);
        });
    if (hasData || completedSteps.has(s)) {
      priorSteps.push(s);
    }
  }

  return (
    <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-emerald-500/10 to-primary-500/10 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">🏗️</span>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">{isEs ? "Tu Workshop ICP" : "Your ICP Workshop"}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{isEs ? `Sección ${step} de ${TOTAL_STEPS}` : `Section ${step} of ${TOTAL_STEPS}`} — {config.title}</p>
          </div>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{completedCount}/{TOTAL_STEPS}</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${(completedCount / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Prior completed steps (collapsed) */}
        {priorSteps.length > 0 && (
          <div className="space-y-2">
            {priorSteps.map((s) => {
              const cfg = STEP_CONFIG[s];
              const isExpanded = expandedSteps.has(s);
              const isComplete = completedSteps.has(s);
              return (
                <div key={s} className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <button
                    onClick={() => toggleStep(s)}
                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isComplete ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                      {isComplete ? '✓' : s}
                    </span>
                    <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">{cfg.title}</span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {isExpanded && (
                    <div className="px-3 pb-3 pt-1">
                      <StepFields fields={cfg.fields} data={data} onUpdate={updateField} readOnly isEs={isEs} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Current step */}
        <div className="rounded-xl border-2 border-primary-300 dark:border-primary-700 bg-primary-50/30 dark:bg-primary-900/10 p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold">{step}</span>
            <h4 className="font-bold text-gray-800 dark:text-gray-100">{config.title}</h4>
            {step === 3 && <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">{isEs ? "(Usa la Calculadora arriba)" : "(Use the Calculator above)"}</span>}
          </div>

          {config.fields.length > 0 ? (
            <StepFields fields={config.fields} data={data} onUpdate={updateField} isEs={isEs} />
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              {isEs ? "Usa la Calculadora de Segmentos arriba para puntuar tus segmentos. Tus puntajes se guardan automáticamente." : "Use the Golden Segment Calculator above to score your segments. Your scores are automatically saved here."}
            </p>
          )}

          <button
            onClick={markStepComplete}
            className={`mt-4 w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              completedSteps.has(step)
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 cursor-default'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            }`}
          >
            {completedSteps.has(step) ? (isEs ? '✓ Sección completa' : '✓ Section Complete') : (isEs ? 'Marcar sección completa' : 'Mark Section Complete')}
          </button>
        </div>

        {/* Export (step 13) */}
        {step === 13 && completedCount >= 10 && (
          <button
            onClick={exportSummary}
            disabled={exporting}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-primary-500 hover:from-emerald-600 hover:to-primary-600 text-white rounded-xl text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {exporting ? (isEs ? 'Descargando...' : 'Downloading...') : (isEs ? '📄 Exportar documento ICP' : '📄 Export ICP Summary Document')}
          </button>
        )}
      </div>
    </div>
  );
}

/* --- Sub-component for rendering step fields --- */

function StepFields({
  fields,
  data,
  onUpdate,
  readOnly = false,
  isEs = false,
}: {
  fields: FieldDef[];
  data: WorkshopData;
  onUpdate: (key: string, value: unknown) => void;
  readOnly?: boolean;
  isEs?: boolean;
}) {
  return (
    <div className="space-y-3">
      {fields.map((field) => {
        if (field.type === 'committee') {
          return <CommitteeField key={field.key} data={data} onUpdate={onUpdate} readOnly={readOnly} isEs={isEs} />;
        }

        const value = (data as Record<string, unknown>)[field.key];
        const strValue = Array.isArray(value) ? value.join('\n') : ((value as string) || '');

        if (readOnly) {
          return (
            <div key={field.key}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-0.5">{field.label}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{strValue || <span className="italic text-gray-400">{isEs ? 'Sin completar' : 'Not filled'}</span>}</p>
            </div>
          );
        }

        if (field.type === 'textarea') {
          return (
            <div key={field.key}>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{field.label}</label>
              <textarea
                value={strValue}
                onChange={(e) => onUpdate(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
                className="w-full bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
              />
            </div>
          );
        }

        if (field.type === 'list') {
          return (
            <div key={field.key}>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{field.label}</label>
              <textarea
                value={strValue}
                onChange={(e) => onUpdate(field.key, e.target.value.split('\n').filter(Boolean))}
                placeholder={field.placeholder}
                rows={3}
                className="w-full bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
              />
            </div>
          );
        }

        return (
          <div key={field.key}>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{field.label}</label>
            <input
              type="text"
              value={strValue}
              onChange={(e) => onUpdate(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </div>
        );
      })}
    </div>
  );
}

/* --- Committee role editor for step 10 --- */

function CommitteeField({
  data,
  onUpdate,
  readOnly,
  isEs = false,
}: {
  data: WorkshopData;
  onUpdate: (key: string, value: unknown) => void;
  readOnly: boolean;
  isEs?: boolean;
}) {
  const roles = data.committeeRoles || [{ title: '', influence: '', messaging: '' }];

  const updateRole = (idx: number, field: string, value: string) => {
    const next = roles.map((r, i) => (i === idx ? { ...r, [field]: value } : r));
    onUpdate('committeeRoles', next);
  };

  const addRole = () => {
    if (roles.length >= 5) return;
    onUpdate('committeeRoles', [...roles, { title: '', influence: '', messaging: '' }]);
  };

  const removeRole = (idx: number) => {
    if (roles.length <= 1) return;
    onUpdate('committeeRoles', roles.filter((_, i) => i !== idx));
  };

  if (readOnly) {
    return (
      <div className="space-y-2">
        {roles.filter((r) => r.title).map((r, i) => (
          <div key={i} className="bg-white/60 dark:bg-gray-800/40 rounded-lg p-2.5">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{r.title}</p>
            <p className="text-xs text-gray-500">{isEs ? "Influencia" : "Influence"}: {r.influence} | {r.messaging}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">{isEs ? "Roles del comité de compra" : "Buying Committee Roles"}</label>
      {roles.map((role, i) => (
        <div key={i} className="flex gap-2 items-start">
          <div className="flex-1 grid grid-cols-3 gap-2">
            <input
              type="text"
              value={role.title}
              onChange={(e) => updateRole(i, 'title', e.target.value)}
              placeholder={isEs ? "Cargo/Rol" : "Title/Role"}
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
            <input
              type="text"
              value={role.influence}
              onChange={(e) => updateRole(i, 'influence', e.target.value)}
              placeholder={isEs ? "Nivel de influencia" : "Influence level"}
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
            <input
              type="text"
              value={role.messaging}
              onChange={(e) => updateRole(i, 'messaging', e.target.value)}
              placeholder={isEs ? "Mensaje clave" : "Key message"}
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </div>
          {roles.length > 1 && (
            <button onClick={() => removeRole(i)} className="p-1 text-gray-400 hover:text-red-500 mt-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
          )}
        </div>
      ))}
      {roles.length < 5 && (
        <button onClick={addRole} className="text-xs text-primary-500 hover:text-primary-600 font-medium">{isEs ? "+ Agregar rol" : "+ Add Role"}</button>
      )}
    </div>
  );
}
