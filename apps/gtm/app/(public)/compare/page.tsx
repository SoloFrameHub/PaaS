import { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Compare: Solo GTM OS vs. Hiring vs. Agencies | SoloFrameHub",
  description:
    "See how the Solo GTM OS stacks up against hiring a sales rep, using an agency, or DIY tools. $29.95/month vs. $5K+/month.",
};

const CHECK = (
  <svg
    className="h-5 w-5 text-green-500"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

function getPartial(isEs: boolean) {
  return <span className="text-sm text-amber-400">{isEs ? "Parcial" : "Partial"}</span>;
}

const CROSS = (
  <svg
    className="h-5 w-5 text-neutral-600"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

function getRows(isEs: boolean) {
  const P = getPartial(isEs);
  return [
    {
      feature: isEs ? "Costo mensual" : "Monthly cost",
      os: "$29.95",
      rep: "$5,000+",
      agency: "$3,000-$10,000",
      diy: "$0-$500",
    },
    {
      feature: isEs ? "Tiempo hasta primeros resultados" : "Time to first results",
      os: isEs ? "1-2 semanas" : "1-2 weeks",
      rep: isEs ? "3-6 meses" : "3-6 months",
      agency: isEs ? "1-3 meses" : "1-3 months",
      diy: isEs ? "6-12 meses" : "6-12 months",
    },
    {
      feature: isEs ? "Coaching con IA" : "AI-powered coaching",
      os: CHECK,
      rep: CROSS,
      agency: CROSS,
      diy: CROSS,
    },
    {
      feature: isEs ? "Ruta de aprendizaje estructurada" : "Structured learning path",
      os: CHECK,
      rep: CROSS,
      agency: CROSS,
      diy: P,
    },
    {
      feature: isEs ? "Simulador de roleplay de ventas" : "Sales roleplay simulator",
      os: CHECK,
      rep: CROSS,
      agency: CROSS,
      diy: CROSS,
    },
    {
      feature: isEs ? "Constructor de ICP + validación" : "ICP builder + validation",
      os: CHECK,
      rep: P,
      agency: CHECK,
      diy: P,
    },
    {
      feature: isEs ? "Frameworks de email frío" : "Cold email frameworks",
      os: CHECK,
      rep: CHECK,
      agency: CHECK,
      diy: P,
    },
    {
      feature: isEs ? "Optimización de LinkedIn" : "LinkedIn optimization",
      os: CHECK,
      rep: P,
      agency: CHECK,
      diy: P,
    },
    {
      feature: isEs ? "Gestión del pipeline" : "Pipeline management",
      os: CHECK,
      rep: CHECK,
      agency: P,
      diy: P,
    },
    {
      feature: isEs ? "Scripts de llamada de descubrimiento" : "Discovery call scripts",
      os: CHECK,
      rep: CHECK,
      agency: CROSS,
      diy: CROSS,
    },
    {
      feature: isEs ? "Ejercicios de manejo de objeciones" : "Objection handling drills",
      os: CHECK,
      rep: P,
      agency: CROSS,
      diy: CROSS,
    },
    {
      feature: isEs ? "Comunidad de cohorte + pods" : "Cohort community + pods",
      os: CHECK,
      rep: CROSS,
      agency: CROSS,
      diy: CROSS,
    },
    {
      feature: isEs ? "Evaluaciones personalizadas" : "Personalized assessments",
      os: CHECK,
      rep: CROSS,
      agency: P,
      diy: CROSS,
    },
    {
      feature: isEs ? "Funciona mientras duermes" : "Works while you sleep",
      os: CHECK,
      rep: CROSS,
      agency: CHECK,
      diy: CROSS,
    },
    {
      feature: isEs ? "Escala contigo" : "Scales with you",
      os: CHECK,
      rep: CROSS,
      agency: P,
      diy: CHECK,
    },
    {
      feature: isEs ? "Te quedas con el conocimiento" : "You keep the knowledge",
      os: CHECK,
      rep: CROSS,
      agency: CROSS,
      diy: CHECK,
    },
  ];
}

export default async function ComparePage() {
  const locale = await getLocale();
  const isEs = locale === "es";
  const ROWS = getRows(isEs);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium tracking-wider text-amber-400 uppercase">
            {isEs ? "Ve la diferencia" : "See the difference"}
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {isEs
              ? "$29.95/mes reemplaza a un equipo de ventas de $5K/mes"
              : "$29.95/month replaces a $5K/month sales team"}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-400">
            {isEs
              ? "El Solo GTM OS te da todo lo que un representante de ventas, agencia y biblioteca de cursos te daría — por el 1% del costo."
              : "The Solo GTM OS gives you everything a sales rep, agency, and course library would — for 1% of the cost."}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="px-4 py-4 text-left font-medium text-neutral-400">
                  {isEs ? "Característica" : "Feature"}
                </th>
                <th className="px-4 py-4 text-center font-semibold text-white bg-neutral-800/50 rounded-t-lg">
                  <div className="text-amber-400 text-xs uppercase tracking-wider mb-1">
                    {isEs ? "Recomendado" : "Recommended"}
                  </div>
                  AI Client OS
                </th>
                <th className="px-4 py-4 text-center font-medium text-neutral-400">
                  {isEs ? "Representante de Ventas" : "Sales Rep"}
                </th>
                <th className="px-4 py-4 text-center font-medium text-neutral-400">
                  {isEs ? "Agencia" : "Agency"}
                </th>
                <th className="px-4 py-4 text-center font-medium text-neutral-400">
                  {isEs ? "Herramientas DIY" : "DIY Tools"}
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={i} className="border-b border-neutral-800/50">
                  <td className="px-4 py-3 text-neutral-300">{row.feature}</td>
                  <td className="px-4 py-3 text-center bg-neutral-800/20">
                    <div className="flex items-center justify-center">
                      {typeof row.os === "string" ? (
                        <span className="font-semibold text-white">
                          {row.os}
                        </span>
                      ) : (
                        row.os
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center">
                      {typeof row.rep === "string" ? (
                        <span className="text-neutral-400">{row.rep}</span>
                      ) : (
                        row.rep
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center">
                      {typeof row.agency === "string" ? (
                        <span className="text-neutral-400">{row.agency}</span>
                      ) : (
                        row.agency
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center">
                      {typeof row.diy === "string" ? (
                        <span className="text-neutral-400">{row.diy}</span>
                      ) : (
                        row.diy
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <div className="mb-8 rounded-xl border border-neutral-700 bg-neutral-900 p-8">
            <h2 className="mb-2 text-2xl font-bold text-white">
              {isEs ? "Comienza con una Puntuación de Preparación gratuita" : "Start with a free Readiness Score"}
            </h2>
            <p className="mb-6 text-neutral-400">
              {isEs
                ? "Descubre dónde estás en 5 minutos. Sin tarjeta de crédito."
                : "Find out where you stand in 5 minutes. No credit card required."}
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/readiness-score"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-black transition hover:bg-neutral-200"
              >
                {isEs ? "Realizar la Evaluación de Preparación" : "Take the Readiness Assessment"}
              </Link>
              <Link
                href="/checkout"
                className="rounded-lg border border-neutral-700 px-8 py-3 font-medium text-neutral-300 transition hover:bg-neutral-800"
              >
                {isEs ? "Comenzar Gratis — $29.95/mes después de la beta" : "Start Free — $29.95/month after beta"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
