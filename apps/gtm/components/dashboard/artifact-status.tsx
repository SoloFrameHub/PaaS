import Link from "next/link";
import { getLocale } from "next-intl/server";
import { ARTIFACT_MAPPINGS } from "@/lib/data/artifact-map";
import ArtifactExportButtons from "./artifact-export-buttons";
import type { ProfileArtifacts } from "@/types/profile";
import type { ExportableArtifact } from "@/types/execute";

interface ArtifactStatusProps {
  artifacts: ProfileArtifacts;
}

function hasContent(artifact: unknown): boolean {
  return artifact != null;
}

function getVersion(artifact: any): number | null {
  if (!artifact) return null;
  return artifact.version ?? artifact.v ?? 1;
}

export default async function ArtifactStatus({ artifacts }: ArtifactStatusProps) {
  const locale = await getLocale();
  const isEs = locale === 'es';
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          {isEs ? "Artefactos del Playbook" : "Playbook Artifacts"}
        </h2>
        <Link
          href="/dashboard/playbook"
          className="text-xs text-primary-500 hover:text-primary-600 font-bold"
        >
          {isEs ? "Ver todos →" : "View All →"}
        </Link>
      </div>
      <div className="space-y-2">
        {ARTIFACT_MAPPINGS.map((mapping) => {
          const key = mapping.artifactType as keyof ProfileArtifacts;
          const built = hasContent(artifacts[key]);
          const version = getVersion(artifacts[key]);
          return (
            <div
              key={mapping.artifactType}
              className="flex items-center justify-between py-1.5"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                    built
                      ? "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {built ? "\u2713" : "\u2013"}
                </span>
                <span
                  className={`text-sm ${built ? "text-gray-800 dark:text-gray-200" : "text-gray-400 dark:text-gray-500"}`}
                >
                  {mapping.artifactLabel}
                </span>
                {built && version && (
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">
                    v{version}
                  </span>
                )}
              </div>
              {built ? (
                <ArtifactExportButtons
                  artifactType={mapping.artifactType as ExportableArtifact}
                />
              ) : (
                <Link
                  href={`/academy/${mapping.courseId}`}
                  className="text-[11px] text-primary-500 hover:text-primary-600 font-medium"
                >
                  {isEs ? `Curso ${mapping.courseNumber} →` : `Course ${mapping.courseNumber} →`}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
