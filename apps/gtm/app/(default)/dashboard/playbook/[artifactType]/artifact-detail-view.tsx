"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import type { ArtifactMapping } from "@/lib/data/artifact-map";

interface ArtifactDetailViewProps {
  artifact: any;
  mapping: ArtifactMapping;
}

export default function ArtifactDetailView({
  artifact,
  mapping,
}: ArtifactDetailViewProps) {
  const locale = useLocale();
  const isEs = locale === 'es';

  function renderValue(value: any, depth = 0): React.ReactNode {
    if (value === null || value === undefined)
      return <span className="text-gray-400 italic">{isEs ? 'No definido' : 'Not set'}</span>;
    if (typeof value === "string")
      return <span className="text-gray-700 dark:text-gray-300">{value}</span>;
    if (typeof value === "number" || typeof value === "boolean")
      return (
        <span className="text-gray-700 dark:text-gray-300">{String(value)}</span>
      );

    if (Array.isArray(value)) {
      if (value.length === 0)
        return <span className="text-gray-400 italic">{isEs ? 'Vacío' : 'Empty'}</span>;
      // Array of strings
      if (typeof value[0] === "string") {
        return (
          <ul className="space-y-1">
            {value.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <span className="text-primary-500 mt-0.5 shrink-0">-</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      }
      // Array of objects
      return (
        <div className="space-y-3">
          {value.map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50"
            >
              {renderValue(item, depth + 1)}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "object") {
      return (
        <div className={`space-y-3 ${depth > 0 ? "" : ""}`}>
          {Object.entries(value).map(([key, val]) => {
            if (
              key === "version" ||
              key === "history" ||
              key === "createdAt" ||
              key === "createdInCourse"
            )
              return null;
            const label = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (s) => s.toUpperCase())
              .replace(/_/g, " ");
            return (
              <div key={key}>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  {label}
                </div>
                <div>{renderValue(val, depth + 1)}</div>
              </div>
            );
          })}
        </div>
      );
    }

    return <span>{String(value)}</span>;
  }

  const content = artifact?.content ?? artifact;
  const createdAt = artifact?.createdAt;
  const version = artifact?.version;

  return (
    <div className="space-y-6">
      {/* Metadata bar */}
      <div className="flex items-center gap-4 text-xs text-gray-400">
        {createdAt && (
          <span>{isEs ? 'Actualizado: ' : 'Last updated: '}{new Date(createdAt).toLocaleDateString(isEs ? 'es-MX' : 'en-US')}</span>
        )}
        {version && <span>{isEs ? `Versión ${version}` : `Version ${version}`}</span>}
        <span>
          {isEs ? `Curso ${mapping.courseNumber}: ${mapping.courseId}` : `Course ${mapping.courseNumber}: ${mapping.courseId}`}
        </span>
      </div>

      {/* Content sections */}
      {mapping.sections.map((section) => {
        const sectionContent = typeof content === "string" ? content : content;
        return (
          <div
            key={section.id}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60 overflow-hidden"
          >
            <div className="bg-gray-50 dark:bg-gray-700/30 px-6 py-4 border-b border-gray-100 dark:border-gray-700/60">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {section.label}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {section.description}
              </p>
            </div>
            <div className="p-6">
              {section.fields.map((field) => {
                // Navigate to the field value using dot-notation keys
                const keys = field.key.split(".");
                let fieldValue: any = sectionContent;
                for (const k of keys) {
                  fieldValue = fieldValue?.[k];
                }
                return (
                  <div key={field.key} className="mb-4 last:mb-0">
                    <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      {field.label}
                    </div>
                    <div className="text-sm leading-relaxed">
                      {renderValue(fieldValue)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Link
          href={`/academy/${mapping.courseId}`}
          className="btn bg-primary-500 text-white hover:bg-primary-600 px-6 py-2.5 rounded-xl font-semibold text-sm"
        >
          {isEs ? 'Refinar en el curso →' : 'Refine in Course →'}
        </Link>
        <button
          onClick={() => window.print()}
          className="btn bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 px-6 py-2.5 rounded-xl font-semibold text-sm"
        >
          {isEs ? 'Exportar como PDF' : 'Export as PDF'}
        </button>
      </div>
    </div>
  );
}
