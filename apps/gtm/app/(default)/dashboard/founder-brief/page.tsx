import { redirect } from "next/navigation";
import { getAuthContext } from "@/lib/auth";
import { computePitchDayScore } from "@/lib/services/pitchDayScoreService";
import { getLocale } from "next-intl/server";
import { PrintButton } from "./print-button";

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

function getColor(score: number): string {
  if (score >= 75) return "text-green-600";
  if (score >= 50) return "text-amber-600";
  return "text-red-600";
}

function getBgColor(score: number): string {
  if (score >= 75) return "bg-green-50";
  if (score >= 50) return "bg-amber-50";
  return "bg-red-50";
}

export default async function FounderBriefPage() {
  const { user, profile } = await getAuthContext();
  if (!user) redirect("/signin");

  const locale = await getLocale();
  const isEs = locale === "es";

  const score = await computePitchDayScore(user.uid, locale);

  const founderName = String(user.displayName || user.email || "");
  const companyName = profile?.questionnaire?.industry || "";
  const generatedDate = new Date().toLocaleDateString(
    isEs ? "es-CO" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <div className="max-w-3xl mx-auto p-8 print:p-4 print:max-w-none">
      {/* Print button (hidden in print) */}
      <div className="print:hidden mb-6 flex justify-between items-center">
        <a
          href="/dashboard"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← {isEs ? "Volver al Dashboard" : "Back to Dashboard"}
        </a>
        <PrintButton label={isEs ? "Imprimir Brief" : "Print Brief"} />
      </div>

      {/* Header */}
      <div className="border-b-2 border-gray-900 pb-6 mb-8 print:pb-4 print:mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black text-gray-900 print:text-2xl">
              {isEs ? "Brief del Fundador" : "Founder Brief"}
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              {founderName}
              {companyName ? ` — ${companyName}` : ""}
            </p>
          </div>
          <div className="text-right">
            <div
              className={`text-5xl font-black ${getColor(score.composite)} print:text-4xl`}
            >
              {score.composite}
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {isEs ? "Puntuación Compuesta" : "Composite Score"}
            </div>
          </div>
        </div>
        <div
          className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-bold ${getBgColor(score.composite)} ${getColor(score.composite)}`}
        >
          {score.label}
        </div>
      </div>

      {/* Score Breakdown */}
      <section className="mb-8 print:mb-6">
        <h2 className="text-lg font-black text-gray-800 mb-4 uppercase tracking-wide">
          {isEs ? "Desglose de Puntuación" : "Score Breakdown"}
        </h2>
        <div className="grid grid-cols-2 gap-4 print:grid-cols-4">
          {(
            [
              [
                "readiness",
                isEs ? "Preparación" : "Readiness",
                "30%",
              ],
              [
                "artifacts",
                isEs ? "Artefactos" : "Artifacts",
                "25%",
              ],
              ["pipeline", "Pipeline", "20%"],
              ["roleplay", "Roleplay", "25%"],
            ] as const
          ).map(([key, label, weight]) => (
            <div
              key={key}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200 print:p-2"
            >
              <div className="text-[10px] font-bold uppercase text-gray-400 mb-1">
                {label} ({weight})
              </div>
              <div
                className={`text-2xl font-black ${getColor(score.breakdown[key])}`}
              >
                {score.breakdown[key]}%
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artifact Checklist */}
      <section className="mb-8 print:mb-6">
        <h2 className="text-lg font-black text-gray-800 mb-4 uppercase tracking-wide">
          {isEs ? "Checklist de Artefactos" : "Artifact Checklist"}
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {score.artifactDetails.map((a) => {
            const labels = ARTIFACT_LABELS[a.key] || { en: a.key, es: a.key };
            return (
              <div
                key={a.key}
                className={`flex items-center gap-2 p-2 rounded-lg text-sm ${
                  a.completed
                    ? "text-green-700 bg-green-50"
                    : "text-gray-400 bg-gray-50"
                }`}
              >
                <span>{a.completed ? "✓" : "○"}</span>
                <span className={a.completed ? "font-medium" : ""}>
                  {isEs ? labels.es : labels.en}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top Deals */}
      {score.topDeals.length > 0 && (
        <section className="mb-8 print:mb-6">
          <h2 className="text-lg font-black text-gray-800 mb-4 uppercase tracking-wide">
            {isEs ? "Top 3 Deals por Valor" : "Top 3 Deals by Value"}
          </h2>
          <div className="space-y-2">
            {score.topDeals.map((deal, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200"
              >
                <div>
                  <span className="font-bold text-gray-800">{deal.name}</span>
                  {deal.company && (
                    <span className="text-gray-500 ml-2">
                      {isEs ? "en" : "at"} {deal.company}
                    </span>
                  )}
                </div>
                <div className="font-bold text-gray-800">
                  {deal.value
                    ? `$${(deal.value / 100).toLocaleString("en-US")}`
                    : "—"}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Roleplay Stats */}
      <section className="mb-8 print:mb-6">
        <h2 className="text-lg font-black text-gray-800 mb-4 uppercase tracking-wide">
          {isEs ? "Rendimiento en Roleplay" : "Roleplay Performance"}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-[10px] font-bold uppercase text-gray-400 mb-1">
              {isEs ? "Sesiones Completadas" : "Sessions Completed"}
            </div>
            <div className="text-2xl font-black text-gray-800">
              {score.roleplaySessions}
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-[10px] font-bold uppercase text-gray-400 mb-1">
              {isEs ? "Puntuación Promedio" : "Average Score"}
            </div>
            <div
              className={`text-2xl font-black ${getColor(score.breakdown.roleplay)}`}
            >
              {score.breakdown.roleplay}%
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4 text-xs text-gray-400 flex justify-between">
        <span>
          {isEs ? "Generado el" : "Generated on"} {generatedDate}
        </span>
        <span>Solo GTM OS — soloframehub.com</span>
      </div>

      {/* Print styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
        }
      `,
        }}
      />
    </div>
  );
}
