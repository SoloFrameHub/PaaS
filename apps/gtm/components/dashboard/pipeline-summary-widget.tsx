"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import type { PipelineStats, DealStage } from "@/types/execute";

interface PipelineSummaryWidgetProps {
  stats: PipelineStats;
}

const STAGE_COLORS: Record<DealStage, string> = {
  lead: "bg-gray-200 dark:bg-gray-600",
  contacted: "bg-blue-200 dark:bg-blue-600",
  meeting: "bg-indigo-300 dark:bg-indigo-500",
  proposal: "bg-purple-300 dark:bg-purple-500",
  won: "bg-green-300 dark:bg-green-500",
  lost: "bg-red-200 dark:bg-red-600",
};

const ACTIVE_STAGES: DealStage[] = ["lead", "contacted", "meeting", "proposal"];

export default function PipelineSummaryWidget({
  stats,
}: PipelineSummaryWidgetProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  const activeDeals = ACTIVE_STAGES.reduce(
    (sum, s) => sum + stats.byStage[s].count,
    0,
  );
  const activeValue = ACTIVE_STAGES.reduce(
    (sum, s) => sum + stats.byStage[s].value,
    0,
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">
          {isEs ? "Pipeline" : "Pipeline"}
        </h3>
        <Link
          href="/dashboard/pipeline"
          className="text-xs text-primary-500 hover:text-primary-600 font-bold"
        >
          {isEs ? "Ver →" : "View →"}
        </Link>
      </div>

      <div className="text-center mb-4">
        <div
          className={`text-5xl font-black mb-1 ${activeDeals > 0 ? "text-indigo-500" : "text-gray-300 dark:text-gray-600"}`}
        >
          {activeDeals}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
          {isEs ? "Negocios Activos" : "Active Deals"}
        </div>
      </div>

      {/* Mini stage bar */}
      {activeDeals > 0 && (
        <div className="flex h-2 rounded-full overflow-hidden mb-3">
          {ACTIVE_STAGES.map((stage) => {
            const count = stats.byStage[stage].count;
            if (count === 0) return null;
            const pct = (count / activeDeals) * 100;
            return (
              <div
                key={stage}
                className={`${STAGE_COLORS[stage]} transition-all`}
                style={{ width: `${pct}%` }}
                title={`${stage}: ${count}`}
              />
            );
          })}
        </div>
      )}

      <div className="space-y-1.5 pt-3 border-t border-gray-100 dark:border-gray-700/60">
        {activeValue > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {isEs ? "Valor del pipeline" : "Pipeline Value"}
            </span>
            <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
              ${(activeValue / 100).toLocaleString()}
            </span>
          </div>
        )}
        {stats.byStage.won.count > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {isEs ? "Tasa de cierre" : "Win Rate"}
            </span>
            <span className="text-sm font-bold text-green-500">
              {(stats.conversionRate * 100).toFixed(0)}%
            </span>
          </div>
        )}
        {activeDeals === 0 && (
          <p className="text-xs text-gray-400 text-center pt-1">
            {isEs ? "Agrega tu primer negocio para empezar." : "Add your first deal to start tracking."}
          </p>
        )}
      </div>
    </div>
  );
}
