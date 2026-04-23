"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/app/app-provider";
import { useLocale } from "next-intl";
import { formatLocalEquivalent, getCurrencyConfig, TAX_DISCLAIMER } from "@/lib/data/currency-config";

const MONTHLY_PRODUCT_ID = process.env.NEXT_PUBLIC_POLAR_MONTHLY_ID ?? "";
const ANNUAL_PRODUCT_ID = process.env.NEXT_PUBLIC_POLAR_ANNUAL_ID ?? "";

const FEATURES_EN = [
  "Full MAGNET framework curriculum",
  "The Solo Founder's Playbook (full book)",
  "AI coaching assistant",
  "Sales roleplay simulations",
  "ICP Builder tool",
  "Community forum access",
  "Analytics dashboard",
];

const FEATURES_ES = [
  "Currículo completo del framework MAGNET",
  "El Playbook del Fundador Solo (libro completo)",
  "Coach IA personalizado",
  "Simulaciones de roleplay de ventas",
  "Herramienta de ICP Builder",
  "Acceso al foro comunitario",
  "Dashboard de analíticas",
];

interface SubscriptionInfo {
  status: string;
  productId: string | null;
  currentPeriodEnd: string | null;
}

export default function PlansPanel() {
  const locale = useLocale();
  const isEs = locale === "es";
  const FEATURES = isEs ? FEATURES_ES : FEATURES_EN;
  // Default to CO for Spanish locale — in future this could come from user profile
  const countryCode = isEs ? "CO" : "";
  const [annual, setAnnual] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [currentSub, setCurrentSub] = useState<SubscriptionInfo | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetch("/api/subscription")
      .then((r) => r.json())
      .then((data) => setCurrentSub(data.subscription))
      .catch(() => {});
  }, []);

  const productId = annual ? ANNUAL_PRODUCT_ID : MONTHLY_PRODUCT_ID;
  const isSubscribed = currentSub?.status === "active";
  const [copied, setCopied] = useState(false);

  const paymentLink =
    "https://buy.polar.sh/polar_cl_5kdgZ7QpABnaVU1NWM6t4SIKxojRXd1w3U37r1lzDRL";

  const copyPaymentLink = useCallback(() => {
    navigator.clipboard.writeText(paymentLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [paymentLink]);

  function handleCheckout() {
    if (!productId) {
      alert(
        isEs
          ? "Este intervalo de facturación aún no está disponible. Intenta la otra opción."
          : "This billing interval is not yet available. Please try the other option.",
      );
      return;
    }

    setLoading(true);

    const url = new URL("/api/checkout", window.location.origin);
    url.searchParams.set("products", productId);
    if (user?.email) {
      url.searchParams.set("customerEmail", user.email);
    }
    if (user?.uid) {
      url.searchParams.set("customerExternalId", user.uid);
    }

    window.location.href = url.toString();
  }

  return (
    <div className="grow">
      <div className="p-6 space-y-6">
        <section>
          <div className="mb-8">
            <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-4">
              {isEs ? "Suscripción al OS" : "OS Subscription"}
            </h2>
            {isSubscribed ? (
              <div className="text-sm">
                {isEs ? (
                  <>
                    Tu suscripción está{" "}
                    <strong className="font-medium text-green-600">activa</strong>
                    {currentSub.currentPeriodEnd && (
                      <>
                        {" "}y se renueva el{" "}
                        <strong className="font-medium">
                          {new Date(currentSub.currentPeriodEnd).toLocaleDateString("es-CO")}
                        </strong>
                      </>
                    )}
                    .
                  </>
                ) : (
                  <>
                    Your subscription is{" "}
                    <strong className="font-medium text-green-600">active</strong>
                    {currentSub.currentPeriodEnd && (
                      <>
                        {" "}and renews on{" "}
                        <strong className="font-medium">
                          {new Date(currentSub.currentPeriodEnd).toLocaleDateString()}
                        </strong>
                      </>
                    )}
                    .
                  </>
                )}
              </div>
            ) : (
              <div className="text-sm">
                {isEs
                  ? "Suscríbete para acceder al Solo GTM OS completo."
                  : "Subscribe to get full access to the Solo GTM OS."}
              </div>
            )}
          </div>

          {/* Pricing card */}
          <div className="max-w-md mx-auto">
            <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-sm rounded-b-lg">
              <div
                className="absolute top-0 left-0 right-0 h-0.5 bg-primary-500"
                aria-hidden="true"
              ></div>
              <div className="px-5 pt-5 pb-6 border-b border-gray-200 dark:border-gray-700/60">
                <header className="flex items-center mb-2">
                  <div className="w-6 h-6 rounded-full shrink-0 bg-primary-500 mr-3">
                    <svg
                      className="w-6 h-6 fill-current text-white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17a.833.833 0 01-.833-.833 3.333 3.333 0 00-3.334-3.334.833.833 0 110-1.666 3.333 3.333 0 003.334-3.334.833.833 0 111.666 0 3.333 3.333 0 003.334 3.334.833.833 0 110 1.666 3.333 3.333 0 00-3.334 3.334c0 .46-.373.833-.833.833z" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">
                    {isEs ? "Acceso Completo" : "Full Access"}
                  </h3>
                </header>

                {/* Toggle switch */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-sm text-gray-500 font-medium">
                    {isEs ? "Mensual" : "Monthly"}
                  </div>
                  <div className="form-switch">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="sr-only"
                      checked={annual}
                      onChange={() => setAnnual(!annual)}
                    />
                    <label htmlFor="toggle">
                      <span
                        className="bg-white shadow-sm"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">{isEs ? "Pagar anualmente" : "Pay annually"}</span>
                    </label>
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {isEs ? "Anual" : "Annually"} <span className="text-green-500">{isEs ? "(Ahorra 57%)" : "(Save 57%)"}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-gray-800 dark:text-gray-100 font-bold mb-4">
                  {annual ? (
                    <>
                      <span className="text-2xl">$</span>
                      <span className="text-3xl">259</span>
                      <span className="text-xl">.95</span>
                      <span className="text-gray-500 font-medium text-sm">
                        {isEs ? "/año" : "/year"}
                      </span>
                      <span className="text-gray-400 text-sm ml-2">
                        (~$22/{isEs ? "mes" : "mo"})
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">$</span>
                      <span className="text-3xl">49</span>
                      <span className="text-xl">.95</span>
                      <span className="text-gray-500 font-medium text-sm">
                        /{isEs ? "mes" : "mo"}
                      </span>
                    </>
                  )}
                  {/* Local currency equivalent */}
                  {isEs && countryCode && (
                    <div className="text-sm text-gray-400 dark:text-gray-500 font-normal mt-1">
                      ≈ {formatLocalEquivalent(annual ? 25995 : 4995, countryCode)}
                      <span className="text-xs ml-1">
                        {isEs ? "(cobro en USD)" : ""}
                      </span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                {isSubscribed ? (
                  <button
                    className="btn w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-white dark:disabled:bg-gray-800 disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
                    disabled
                  >
                    <svg
                      className="w-3 h-3 shrink-0 fill-current mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                    <span>{isEs ? "Suscrito" : "Subscribed"}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleCheckout}
                    disabled={loading || !productId}
                    className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? (isEs ? "Redirigiendo..." : "Redirecting...")
                      : (isEs ? "Suscribirme" : "Subscribe Now")}
                  </button>
                )}
              </div>
              <div className="px-5 pt-4 pb-5">
                <div className="text-xs text-gray-800 dark:text-gray-100 font-semibold uppercase mb-4">
                  {isEs ? "Incluido en tu plan" : "What\u0027s included"}
                </div>
                <ul>
                  {FEATURES.map((feature) => (
                    <li key={feature} className="flex items-center py-1">
                      <svg
                        className="w-3 h-3 shrink-0 fill-current text-green-500 mr-2"
                        viewBox="0 0 12 12"
                      >
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <div className="text-sm">{feature}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tax disclaimer (Spanish only) */}
        {isEs && (
          <section>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-800/30">
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                {TAX_DISCLAIMER}
              </p>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section>
          <div className="my-8">
            <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold">
              {isEs ? "Preguntas Frecuentes" : "FAQs"}
            </h2>
          </div>
          <ul className="space-y-5">
            <li>
              <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                {isEs ? "¿Puedo cambiar entre mensual y anual?" : "Can I switch between monthly and annual?"}
              </div>
              <div className="text-sm">
                {isEs
                  ? "Sí, puedes cambiar en cualquier momento. Los cambios se aplican al inicio de tu siguiente ciclo de facturación."
                  : "Yes, you can switch at any time. Changes take effect at the start of your next billing cycle."}
              </div>
            </li>
            <li>
              <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                {isEs ? "¿Puedo cancelar en cualquier momento?" : "Can I cancel anytime?"}
              </div>
              <div className="text-sm">
                {isEs
                  ? "Por supuesto. Puedes cancelar tu suscripción en cualquier momento y mantendrás acceso hasta el final de tu período de facturación actual."
                  : "Absolutely. You can cancel your subscription at any time and you\u0027ll retain access until the end of your current billing period."}
              </div>
            </li>
            <li>
              <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                {isEs ? "¿Tienes más preguntas?" : "Got more questions?"}
              </div>
              <div className="text-sm">
                {isEs ? "Escríbenos a " : "Reach out to us at "}
                <a
                  className="font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  href="mailto:support@soloframehub.com"
                >
                  support@soloframehub.com
                </a>
                .
              </div>
            </li>
          </ul>
        </section>

        {/* Payment link */}
        <section>
          <div className="my-8">
            <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold">
              {isEs ? "Compartir Link de Pago" : "Share Payment Link"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={paymentLink}
              className="form-input w-full text-sm bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400"
            />
            <button
              onClick={copyPaymentLink}
              className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white shrink-0"
            >
              {copied ? (isEs ? "¡Copiado!" : "Copied!") : (isEs ? "Copiar" : "Copy")}
            </button>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            {isEs
              ? "Comparte este link para que otros puedan elegir un plan y suscribirse directamente."
              : "Share this link to let others choose a plan and subscribe directly."}
          </p>
        </section>
      </div>
    </div>
  );
}
