"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import type { ArtifactMapping } from "@/lib/data/artifact-map";

interface PlaybookCardProps {
  mapping: ArtifactMapping;
  artifact: any;
}

export default function PlaybookCard({ mapping, artifact }: PlaybookCardProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  const isComplete = artifact !== null;
  const version = artifact?.version || 0;

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl border p-6 transition-all ${
        isComplete
          ? "border-green-200 dark:border-green-500/30"
          : "border-gray-100 dark:border-gray-700/60 opacity-70"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isComplete
              ? "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400"
              : "bg-gray-100 dark:bg-gray-700 text-gray-400"
          }`}
        >
          {isComplete ? (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          )}
        </div>
        {isComplete && (
          <span className="text-xs font-bold text-gray-400">v{version}</span>
        )}
      </div>

      <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-1">
        {mapping.artifactLabel}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
        {mapping.artifactDescription}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 font-semibold">
          {isEs ? `Curso ${mapping.courseNumber}` : `Course ${mapping.courseNumber}`}
        </span>
        <div className="flex items-center gap-3">
          {isComplete && (
            <Link
              href={`/dashboard/playbook/${mapping.artifactType}`}
              className="text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors"
            >
              {isEs ? "Ver" : "View"}
            </Link>
          )}
          <Link
            href={`/academy/${mapping.courseId}`}
            className={`text-xs font-bold transition-colors ${
              isComplete
                ? "text-green-600 dark:text-green-400 hover:text-green-700"
                : "text-primary-500 hover:text-primary-600"
            }`}
          >
            {isEs ? (isComplete ? "Refinar →" : "Empezar →") : (isComplete ? "Refine →" : "Start →")}
          </Link>
        </div>
      </div>
    </div>
  );
}
