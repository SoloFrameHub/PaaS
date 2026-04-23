"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import type { PitchDayScore } from "@/lib/services/pitchDayScoreService";

function getScoreColor(score: number): string {
  if (score >= 75) return "#10B981"; // green
  if (score >= 50) return "#F59E0B"; // yellow
  return "#EF4444"; // red
}

const ARTIFACT_LABELS: Record<string, { en: string; es: string }> = {
  icp: { en: "ICP Definition", es: "Definición de ICP" },
  positioning: { en: "Positioning", es: "Posicionamiento" },
  valueProposition: { en: "Value Proposition", es: "Propuesta de Valor" },
  acquisitionPath: { en: "Acquisition Path", es: "Ruta de Adquisición" },
  discoveryPlaybook: { en: "Discovery Playbook", es: "Playbook de Discovery" },
  emailSequences: { en: "Email Sequences", es: "Secuencias de Email" },
  objectionLibrary: { en: "Objection Library", es: "Biblioteca de Objeciones" },
  personalPlaybook: { en: "Personal Playbook", es: "Playbook Personal" },
};

export function PitchDayScoreWidget() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [data, setData] = useState<PitchDayScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/dashboard/pitch-day-score?locale=${locale}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.data) setData(json.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [locale]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  if (!data || !data.eligible) return null;

  const color = getScoreColor(data.composite);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">
          {isEs ? "Pitch Day" : "Pitch Day Score"}
        </h3>
        <a
          href="/dashboard/founder-brief"
          className="text-xs text-primary-500 hover:text-primary-600 font-bold"
        >
          {isEs ? "Ver Brief →" : "View Brief →"}
        </a>
      </div>

      <div className="flex items-center gap-6">
        {/* Circular Score */}
        <div className="relative w-24 h-24 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-100 dark:text-gray-700"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(data.composite / 100) * 264} 264`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-black" style={{ color }}>
              {data.composite}
            </span>
          </div>
        </div>

        {/* Breakdown bars */}
        <div className="flex-1 space-y-2">
          {(
            [
              ["readiness", isEs ? "Preparación" : "Readiness"],
              ["artifacts", isEs ? "Artefactos" : "Artifacts"],
              ["pipeline", "Pipeline"],
              ["roleplay", "Roleplay"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <div className="flex justify-between text-[10px] text-gray-400 mb-0.5">
                <span>{label}</span>
                <span>{data.breakdown[key]}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${data.breakdown[key]}%`,
                    backgroundColor: getScoreColor(data.breakdown[key]),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center">
        <span
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={{
            color,
            backgroundColor: `${color}15`,
          }}
        >
          {data.label}
        </span>
      </div>
    </div>
  );
}
