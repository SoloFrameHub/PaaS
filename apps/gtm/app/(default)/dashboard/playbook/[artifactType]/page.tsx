import { getAuthContext, getSubscriptionStatus } from "@/lib/auth";
import { getArtifactMapping, type ArtifactType } from "@/lib/data/artifact-map";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import ArtifactDetailView from "./artifact-detail-view";

export default async function ArtifactDetailPage(props: {
  params: Promise<{ artifactType: string }>;
}) {
  const { artifactType } = await props.params;
  const mapping = getArtifactMapping(artifactType as ArtifactType);
  if (!mapping) notFound();

  const { user, profile } = await getAuthContext();
  if (!user) redirect("/signin");
  if (!profile) redirect("/onboarding/welcome");

  const subStatus = await getSubscriptionStatus(user.uid);
  if (subStatus !== "active") redirect("/subscribe");

  const artifact = profile.artifacts?.[artifactType as ArtifactType] ?? null;

  const locale = await getLocale();
  const isEs = locale === "es";

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/dashboard/playbook"
          className="text-sm text-primary-500 hover:text-primary-600 font-semibold mb-2 inline-block"
        >
          ← {isEs ? "Volver al Playbook" : "Back to Playbook"}
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1">
              {mapping.artifactLabel}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {mapping.artifactDescription}
            </p>
          </div>
          {artifact && (
            <span className="text-sm font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">
              v{(artifact as any).version || 1}
            </span>
          )}
        </div>
      </div>

      {artifact ? (
        <ArtifactDetailView artifact={artifact} mapping={mapping} />
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700/60 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
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
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
            {isEs ? "Aún no creado" : "Not Yet Created"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {isEs
              ? `Completa los ejercicios del Curso ${mapping.courseNumber} para construir este artefacto.`
              : `Complete the exercises in Course ${mapping.courseNumber} to build this artifact.`}
          </p>
          <Link
            href={`/academy/${mapping.courseId}`}
            className="btn bg-primary-500 text-white hover:bg-primary-600 px-6 py-2.5 rounded-xl font-semibold"
          >
            {isEs ? `Ir al Curso ${mapping.courseNumber} →` : `Go to Course ${mapping.courseNumber} →`}
          </Link>
        </div>
      )}
    </div>
  );
}
