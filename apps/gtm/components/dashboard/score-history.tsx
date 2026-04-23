"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

interface Snapshot {
  id: string;
  overallReadiness: number;
  icpClarity: number;
  positioningStrength: number;
  messagingConsistency: number;
  channelReadiness: number;
  salesProcessMaturity: number;
  createdAt: string;
}

export default function ScoreHistory() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile/score-history")
      .then((r) => (r.ok ? r.json() : { data: [] }))
      .then((d) => setSnapshots(d.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4">
          {isEs ? "Historial de Puntaje" : "Readiness Score History"}
        </h3>
        <div className="h-32 flex items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
        </div>
      </div>
    );
  }

  if (snapshots.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4">
          {isEs ? "Historial de Puntaje" : "Readiness Score History"}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {isEs ? "Completa tu evaluación de onboarding para hacer seguimiento de tu progreso." : "Complete your onboarding assessment to start tracking your progress over time."}
        </p>
      </div>
    );
  }

  const latest = snapshots[0];
  const first = snapshots[snapshots.length - 1];
  const delta =
    Number(latest.overallReadiness) - Number(first.overallReadiness);
  const maxScore = Math.max(
    ...snapshots.map((s) => Number(s.overallReadiness)),
  );

  const dimensions = isEs ? ([
    { key: "icpClarity", label: "ICP" },
    { key: "positioningStrength", label: "Posicionamiento" },
    { key: "messagingConsistency", label: "Mensajería" },
    { key: "channelReadiness", label: "Canales" },
    { key: "salesProcessMaturity", label: "Ventas" },
  ] as const) : ([
    { key: "icpClarity", label: "ICP" },
    { key: "positioningStrength", label: "Positioning" },
    { key: "messagingConsistency", label: "Messaging" },
    { key: "channelReadiness", label: "Channels" },
    { key: "salesProcessMaturity", label: "Sales" },
  ] as const);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {isEs ? "Historial de Puntaje" : "Readiness Score History"}
        </h3>
        {snapshots.length > 1 && (
          <span
            className={`text-xs font-medium ${delta >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {delta >= 0 ? "+" : ""}
            {delta.toFixed(0)} {isEs ? "desde la primera evaluación" : "since first assessment"}
          </span>
        )}
      </div>

      {/* Overall score large display */}
      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          {Number(latest.overallReadiness).toFixed(0)}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {isEs ? "Preparación actual" : "Current Readiness"}
        </div>
      </div>

      {/* Mini bar chart for dimensions */}
      <div className="space-y-2">
        {dimensions.map((dim) => {
          const val = Number(latest[dim.key]);
          return (
            <div key={dim.key}>
              <div className="flex items-center justify-between text-xs mb-0.5">
                <span className="text-gray-600 dark:text-gray-400">
                  {dim.label}
                </span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">
                  {val.toFixed(0)}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className={`h-full rounded-full transition-all ${val >= 70 ? "bg-green-500" : val >= 40 ? "bg-amber-500" : "bg-red-500"}`}
                  style={{ width: `${Math.min(100, val)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Timeline dots */}
      {snapshots.length > 1 && (
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {snapshots
              .slice(0, 6)
              .reverse()
              .map((snap, i) => (
                <div key={snap.id} className="flex flex-col items-center">
                  <div
                    className="h-6 w-1 rounded-full"
                    style={{
                      backgroundColor:
                        Number(snap.overallReadiness) >= 70
                          ? "#22c55e"
                          : Number(snap.overallReadiness) >= 40
                            ? "#eab308"
                            : "#ef4444",
                      height: `${Math.max(8, (Number(snap.overallReadiness) / (maxScore || 1)) * 24)}px`,
                    }}
                  />
                  <span className="text-[10px] text-gray-400 mt-1">
                    {new Date(snap.createdAt).toLocaleDateString(isEs ? "es-MX" : "en", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
