import { getAuthContext, getSubscriptionStatus } from "@/lib/auth";
import {
  ARTIFACT_MAPPINGS,
  countCompletedArtifacts,
} from "@/lib/data/artifact-map";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import PlaybookCard from "@/components/dashboard/playbook-card";
import PlaybookProgress from "@/components/dashboard/playbook-progress";

export const metadata = {
  title: "Your Playbook - SoloFrameHub",
  description: "Your personalized sales playbook built from course exercises",
};

export default async function PlaybookPage() {
  const { user, profile } = await getAuthContext();

  if (!user) redirect("/signin");
  if (!profile) redirect("/onboarding/welcome");

  const subStatus = await getSubscriptionStatus(user.uid);
  if (subStatus !== "active") redirect("/subscribe");

  const locale = await getLocale();
  const isEs = locale === "es";
  const artifacts = profile.artifacts;
  const completed = countCompletedArtifacts(artifacts);
  const total = Object.keys(artifacts).length;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-sm text-primary-500 hover:text-primary-600 font-semibold mb-2 inline-block"
        >
          {isEs ? "← Volver al panel" : "← Back to Dashboard"}
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {isEs ? "Tu playbook de ventas" : "Your Sales Playbook"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
          {isEs
            ? "Cada curso construye un artefacto real de negocio. Juntos forman tu playbook de ventas completo y personalizado. Haz clic en cualquier artefacto para verlo, refinarlo o empezar a construirlo."
            : "Every course builds a real business artifact. Together, they form your complete, personalized sales playbook. Click any artifact to view, refine, or start building it."}
        </p>
      </div>

      {/* Progress */}
      <PlaybookProgress completed={completed} total={total} />

      {/* Artifact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {ARTIFACT_MAPPINGS.map((mapping) => {
          const artifact = artifacts[mapping.artifactType];
          return (
            <PlaybookCard
              key={mapping.artifactType}
              mapping={mapping}
              artifact={artifact}
            />
          );
        })}
      </div>

      {/* Export Hint */}
      {completed >= 5 && (
        <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/60 p-6 text-center">
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-1">
            {isEs ? "Exportar tu playbook" : "Export Your Playbook"}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isEs
              ? "Usa la función de imprimir de tu navegador (Ctrl/Cmd+P) para guardar tu playbook como PDF."
              : "Use your browser's print function (Ctrl/Cmd+P) to save your playbook as a PDF."}
          </p>
        </div>
      )}
    </div>
  );
}
