"use client";

import { useLocale } from 'next-intl';

const METABASE_URL =
  process.env.NEXT_PUBLIC_METABASE_URL || "https://metabase.soloframehub.com";

const DASHBOARDS_EN = [
  {
    title: "Completion Patterns",
    description:
      "40% drop-off triggers content regeneration. Track lesson and course completion funnels.",
    embedId: "COMPLETION_DASHBOARD_ID",
  },
  {
    title: "AI Coaching Conversations",
    description:
      "Repeated questions reveal knowledge gaps. Surface common topics from coaching sessions.",
    embedId: "COACHING_DASHBOARD_ID",
  },
  {
    title: "Community Discussions",
    description:
      "Confusion clusters surface from forum activity. Track hot topics and unanswered questions.",
    embedId: "COMMUNITY_DASHBOARD_ID",
  },
  {
    title: "Assessment Performance",
    description:
      "AI evaluates strategic work. Score distributions, improvement trends, and path recommendations.",
    embedId: "ASSESSMENT_DASHBOARD_ID",
  },
  {
    title: "Curriculum Updates",
    description:
      "Source books updated = curriculum inherits. Track manuscript and content version changes.",
    embedId: "CURRICULUM_DASHBOARD_ID",
  },
];

const DASHBOARDS_ES = [
  {
    title: "Patrones de Completación",
    description:
      "Un abandono del 40% activa la regeneración de contenido. Rastrea los embudos de completación de lecciones y cursos.",
    embedId: "COMPLETION_DASHBOARD_ID",
  },
  {
    title: "Conversaciones de Coaching con IA",
    description:
      "Las preguntas repetidas revelan brechas de conocimiento. Identifica los temas más comunes en las sesiones de coaching.",
    embedId: "COACHING_DASHBOARD_ID",
  },
  {
    title: "Discusiones de la Comunidad",
    description:
      "Los grupos de confusión emergen de la actividad del foro. Rastrea los temas más activos y preguntas sin respuesta.",
    embedId: "COMMUNITY_DASHBOARD_ID",
  },
  {
    title: "Rendimiento en Evaluaciones",
    description:
      "La IA evalúa el trabajo estratégico. Distribuciones de puntuación, tendencias de mejora y recomendaciones de ruta.",
    embedId: "ASSESSMENT_DASHBOARD_ID",
  },
  {
    title: "Actualizaciones del Currículo",
    description:
      "Los libros fuente actualizados se heredan en el currículo. Rastrea los cambios de versión en manuscritos y contenido.",
    embedId: "CURRICULUM_DASHBOARD_ID",
  },
];

export default function AnalyticsPage() {
  const locale = useLocale();
  const isEs = locale === 'es';
  const DASHBOARDS = isEs ? DASHBOARDS_ES : DASHBOARDS_EN;
  const hasEmbeds = DASHBOARDS.some((d) => !d.embedId.includes("_ID"));

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
          {isEs ? 'Analíticas de la Plataforma' : 'Platform Analytics'}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {isEs
            ? 'Inteligencia en tiempo real sobre completación de cursos, coaching con IA, discusiones de la comunidad, evaluaciones y actualizaciones del currículo.'
            : 'Live intelligence from course completion, AI coaching, community discussions, assessments, and curriculum updates.'}
        </p>
      </div>

      {!hasEmbeds && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            {isEs ? (
              <><strong>Configuración requerida:</strong> Los IDs de los paneles deben configurarse. Crea paneles en{' '}
              <a href={METABASE_URL} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Metabase</a>
              , activa el uso compartido público y actualiza los IDs en esta página.</>
            ) : (
              <><strong>Setup required:</strong> Dashboard embed IDs need to be configured. Create dashboards in{' '}
              <a href={METABASE_URL} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Metabase</a>
              , enable public sharing, and update the embed IDs in this page.</>
            )}
          </p>
        </div>
      )}

      <div className="space-y-10">
        {DASHBOARDS.map((dashboard) => (
          <section
            key={dashboard.title}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {dashboard.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {dashboard.description}
              </p>
            </div>
            <div className="p-0">
              {dashboard.embedId.includes("_ID") ? (
                <div className="flex items-center justify-center h-64 text-gray-400 dark:text-gray-500 text-sm">
                  {isEs ? 'Panel de Metabase pendiente de configuración' : 'Metabase dashboard embed pending configuration'}
                </div>
              ) : (
                <iframe
                  src={`${METABASE_URL}/public/dashboard/${dashboard.embedId}`}
                  frameBorder="0"
                  width="100%"
                  height="600"
                  className="w-full"
                  title={dashboard.title}
                />
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
