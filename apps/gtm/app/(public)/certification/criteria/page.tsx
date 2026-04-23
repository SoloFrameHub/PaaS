import Link from "next/link";
import { getLocale } from "next-intl/server";

export const metadata = {
  title: "Certification Criteria — Certified Solo GTM Practitioner",
  description:
    "What it takes to earn the Certified Solo GTM Practitioner badge from SoloFrameHub.",
};

export default async function CertificationCriteriaPage() {
  const locale = await getLocale();
  const isEs = locale === "es";

  const badgeSignals = isEs
    ? [
        {
          label: "Estrategia",
          desc: "Las decisiones de ICP, posicionamiento y canal están respaldadas por investigación, no por suposiciones.",
        },
        {
          label: "Ejecución",
          desc: "Conversaciones de ventas reales con compradores reales, evaluadas con frameworks probados.",
        },
        {
          label: "Sistemas",
          desc: "Movimiento GTM de extremo a extremo — desde el primer contacto hasta el cierre — documentado y repetible.",
        },
      ]
    : [
        {
          label: "Strategy",
          desc: "ICP, positioning, and channel decisions are research-backed, not guesses.",
        },
        {
          label: "Execution",
          desc: "Live sales conversations with real buyers, scored against proven frameworks.",
        },
        {
          label: "Systems",
          desc: "End-to-end GTM motion — from first outreach to closed deal — documented and repeatable.",
        },
      ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-10 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-500 mb-3">
          {isEs ? "Certificación" : "Certification"}
        </span>
        <h1 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-4">
          {isEs ? "Practicante Certificado Solo GTM" : "Certified Solo GTM Practitioner"}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {isEs
            ? "Una credencial rigurosa basada en resultados para fundadores solos que han demostrado dominio en todo el sistema go-to-market — no solo vieron los videos."
            : "A rigorous, outcome-based credential for solo founders who have demonstrated mastery across the full go-to-market system — not just watched the videos."}
        </p>
      </div>

      {/* Badge visual */}
      <div className="flex justify-center mb-12">
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-2xl">
          <div className="text-center text-white">
            <div className="text-4xl font-black">GTM</div>
            <div className="text-xs font-bold uppercase tracking-widest mt-1">
              {isEs ? "Certificado" : "Certified"}
            </div>
          </div>
        </div>
      </div>

      {/* Criteria */}
      <div className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {isEs ? "Criterios de Elegibilidad" : "Eligibility Criteria"}
        </h2>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center shrink-0 text-primary-600 dark:text-primary-400 font-bold">
              1
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">
                {isEs ? "Completar Track 1: Fundamentos" : "Complete Track 1: Foundations"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isEs
                  ? "Los 5 cursos — Psicología de Ventas, Constructor de ICP, Posicionamiento y Propuesta de Valor, Ruta de Adquisición y Construcción de Listas. Demuestra que tienes las bases estratégicas necesarias para una ejecución GTM efectiva."
                  : "All 5 courses — Sales Psychology, ICP Builder, Positioning & Value Proposition, Acquisition Path, and List Building. Demonstrates you have the strategic groundwork required for effective GTM execution."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400 font-bold">
              2
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">
                {isEs ? "Completar Track 3: Metodología de Ventas" : "Complete Track 3: Sales Methodology"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isEs
                  ? "Los 8 cursos — Personas DISC, Framework de Descubrimiento, Psicología de Ventas Avanzada, Manejo de Objeciones, Negociación, Frameworks de Cierre, Redacción de Propuestas y Operaciones de Ingresos. Demuestra competencia activa en ventas."
                  : "All 8 courses — DISC Personas, Discovery Framework, Sales Psychology Advanced, Objection Handling, Negotiation, Closing Frameworks, Proposal Writing, and Revenue Operations. Demonstrates active selling competency."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center shrink-0 text-green-600 dark:text-green-400 font-bold">
              3
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">
                {isEs ? "Puntuación Promedio de Roleplay ≥ 75%" : "Roleplay Average Score ≥ 75%"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isEs
                  ? "Obtén una puntuación promedio de sesión de roleplay evaluada por IA de 75% o más. Este es el filtro práctico — debes demostrar las habilidades, no solo conocerlas. Las sesiones de roleplay simulan conversaciones reales con prospectos de múltiples tipos de compradores."
                  : "Achieve an average AI-scored roleplay session score of 75% or higher. This is the practical gate — you must demonstrate the skills, not just know them. Roleplay sessions simulate real prospect conversations across multiple buyer types."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What it signals */}
      <div className="space-y-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {isEs ? "Qué Señala la Insignia" : "What the Badge Signals"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {badgeSignals.map((item) => (
            <div
              key={item.label}
              className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700"
            >
              <div className="font-bold text-gray-800 dark:text-gray-100 mb-1">
                {item.label}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Open Badges */}
      <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 mb-12 text-sm text-gray-600 dark:text-gray-300">
        <p>
          {isEs ? (
            <><strong>Estándar Open Badge:</strong> Emitido a través de{" "}
            <span className="font-medium">Badgr.com</span> (Open Badges 3.0). Tu
            insignia está firmada criptográficamente, es verificable de forma independiente y
            portable a LinkedIn, firmas de correo y cualquier plataforma compatible con Open Badge.</>
          ) : (
            <><strong>Open Badge standard:</strong> Issued via{" "}
            <span className="font-medium">Badgr.com</span> (Open Badges 3.0). Your
            badge is cryptographically signed, independently verifiable, and
            portable to LinkedIn, email signatures, and any Open Badge-compatible
            platform.</>
          )}
        </p>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4">
        <Link
          href="/academy"
          className="inline-block bg-gradient-to-r from-primary-500 to-indigo-600 text-white font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition shadow-lg"
        >
          {isEs ? "Comienza a ganar tu certificación →" : "Start earning your certification →"}
        </Link>
        <div>
          <Link
            href="/certified"
            className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            {isEs ? "Ver directorio de fundadores certificados" : "View certified founders directory"}
          </Link>
        </div>
      </div>
    </div>
  );
}
