"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import type { CoachingNudge, NudgeType } from "@/types/execute";

interface CoachingNudgesProps {
  nudges: CoachingNudge[];
}

const NUDGE_STYLES: Record<
  NudgeType,
  { icon: string; border: string; bg: string }
> = {
  outreach_gap: {
    icon: "\uD83D\uDCE8",
    border: "border-blue-200 dark:border-blue-500/30",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  pipeline_stale: {
    icon: "\u23F3",
    border: "border-amber-200 dark:border-amber-500/30",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  assessment_weakness: {
    icon: "\uD83C\uDFAF",
    border: "border-red-200 dark:border-red-500/30",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
  artifact_missing: {
    icon: "\uD83D\uDCC4",
    border: "border-purple-200 dark:border-purple-500/30",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  streak_risk: {
    icon: "\uD83D\uDD25",
    border: "border-orange-200 dark:border-orange-500/30",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  milestone_approaching: {
    icon: "\u2B50",
    border: "border-green-200 dark:border-green-500/30",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
};

export default function CoachingNudges({ nudges }: CoachingNudgesProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  if (nudges.length === 0) return null;

  const visible = nudges.filter((n) => !dismissed.has(n.id));
  if (visible.length === 0) return null;

  async function handleDismiss(nudgeId: string) {
    setDismissed((prev) => new Set([...prev, nudgeId]));
    try {
      await fetch("/api/coaching/dismiss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nudgeId }),
      });
    } catch {
      // Silent — already dismissed in UI
    }
  }

  return (
    <div className="col-span-full space-y-3 mb-2">
      {visible.map((nudge) => {
        const style = NUDGE_STYLES[nudge.type];
        return (
          <div
            key={nudge.id}
            className={`${style.bg} ${style.border} border rounded-xl px-5 py-4 flex items-start gap-4`}
          >
            <span className="text-xl shrink-0 mt-0.5">{style.icon}</span>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-0.5">
                {nudge.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {nudge.message}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {nudge.actionUrl && (
                <Link
                  href={nudge.actionUrl}
                  className="text-xs font-bold text-primary-500 hover:text-primary-600 whitespace-nowrap"
                >
                  {nudge.actionLabel || (isEs ? "Ir" : "Go")} &rarr;
                </Link>
              )}
              <button
                onClick={() => handleDismiss(nudge.id)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-lg leading-none"
                title={isEs ? "Descartar" : "Dismiss"}
              >
                &times;
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
