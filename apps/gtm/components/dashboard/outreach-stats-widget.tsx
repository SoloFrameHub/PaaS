"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import type { OutreachStats } from "@/types/execute";

interface OutreachStatsWidgetProps {
  stats: OutreachStats;
}

const CHANNEL_ICONS: Record<string, string> = {
  email: "\u2709",
  linkedin: "\uD83D\uDCBC",
  phone: "\uD83D\uDCDE",
  twitter: "\uD83D\uDCAC",
  event: "\uD83C\uDF1F",
  other: "\u2022",
};

export default function OutreachStatsWidget({
  stats,
}: OutreachStatsWidgetProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  const topChannels = Object.entries(stats.byChannel)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">
          {isEs ? "Contactos (7d)" : "Outreach (7d)"}
        </h3>
        <Link
          href="/dashboard/outreach"
          className="text-xs text-primary-500 hover:text-primary-600 font-bold"
        >
          {isEs ? "Registrar →" : "Log →"}
        </Link>
      </div>

      <div className="text-center mb-4">
        <div
          className={`text-5xl font-black mb-1 ${stats.totalActions > 0 ? "text-blue-500" : "text-gray-300 dark:text-gray-600"}`}
        >
          {stats.totalActions}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
          {isEs ? "Total Acciones" : "Total Actions"}
        </div>
      </div>

      {topChannels.length > 0 ? (
        <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-700/60">
          {topChannels.map(([channel, count]) => (
            <div key={channel} className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <span>{CHANNEL_ICONS[channel] || "\u2022"}</span>
                <span className="capitalize">{channel}</span>
              </span>
              <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                {count}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 mt-3 text-center">
          {isEs ? "Sin contactos esta semana. ¡Empieza a registrar!" : "No outreach logged this week. Start tracking!"}
        </p>
      )}
    </div>
  );
}
