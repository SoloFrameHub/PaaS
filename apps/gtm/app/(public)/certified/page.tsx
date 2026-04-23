import Link from "next/link";
import { getLocale } from "next-intl/server";
import { profileRepository } from "@/lib/repositories/profileRepository";

export const metadata = {
  title: "Certified Solo GTM Practitioners — SoloFrameHub",
  description:
    "Public directory of solo founders who have earned the Certified Solo GTM Practitioner badge.",
};

export const revalidate = 3600; // revalidate once per hour

export default async function CertifiedPage() {
  const [locale, founders] = await Promise.all([
    getLocale(),
    profileRepository.getCertifiedFounders(),
  ]);
  const isEs = locale === "es";

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-500 mb-3">
          {isEs ? "Verificado" : "Verified"}
        </span>
        <h1 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-4">
          {isEs ? "Practicantes Certificados Solo GTM" : "Certified Solo GTM Practitioners"}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {isEs
            ? "Estos fundadores completaron el Track 1 (Fundamentos) + Track 3 (Metodología de Ventas) y obtuvieron ≥ 75% en sesiones de roleplay en vivo. Saben cómo ejecutar un GTM completo, solos."
            : "These founders completed Track 1 (Foundations) + Track 3 (Sales Methodology) and scored ≥ 75% in live roleplay sessions. They know how to run a full GTM motion, solo."}
        </p>
      </div>

      {founders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🏅</div>
          <p className="text-xl font-medium mb-2">
            {isEs ? "Sé el primero en certificarte" : "Be the first certified founder"}
          </p>
          <p className="text-sm mb-6">
            {isEs ? "Completa los requisitos y obtén tu insignia." : "Complete the requirements and earn your badge."}
          </p>
          <Link
            href="/certification/criteria"
            className="inline-block bg-gradient-to-r from-primary-500 to-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition"
          >
            {isEs ? "Ver requisitos →" : "View requirements →"}
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {founders.map((founder) => (
            <div
              key={founder.certId}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex items-center gap-6"
            >
              {/* Badge icon */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-md">
                <span className="text-white text-xs font-black">GTM</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-800 dark:text-gray-100">
                  {founder.name}
                </div>
                {founder.businessName && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {founder.businessName}
                  </div>
                )}
                <div className="text-xs text-gray-400 mt-1">
                  {isEs ? "Certificado " : "Certified "}
                  {new Date(founder.earnedAt).toLocaleDateString(isEs ? "es-MX" : "en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </div>
              </div>

              {/* Verify link */}
              {founder.badgrAssertionUrl && (
                <a
                  href={founder.badgrAssertionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-xs font-medium text-primary-500 hover:text-primary-600 border border-primary-200 dark:border-primary-500/30 px-3 py-1.5 rounded-lg transition"
                >
                  {isEs ? "Verificar →" : "Verify →"}
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Link
          href="/certification/criteria"
          className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          {isEs ? "Ver requisitos de certificación" : "View certification requirements"}
        </Link>
      </div>
    </div>
  );
}
