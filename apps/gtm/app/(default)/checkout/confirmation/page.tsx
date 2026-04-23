"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { useLocale } from "next-intl";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const checkoutId = searchParams.get("checkoutId");
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-2xl mx-auto">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-500/20 mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">
          {isEs ? "Pago exitoso" : "Payment Successful"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {isEs
            ? "Tu suscripción ya está activa. Tienes acceso completo a todo el contenido del OS."
            : "Your subscription is now active. You have full access to all OS content."}
        </p>
        {checkoutId && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
            {isEs ? "ID de pago" : "Checkout ID"}: {checkoutId}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/onboarding/welcome"
            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
          >
            {isEs ? "Comenzar evaluación" : "Start Your Assessment"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-8 text-center text-gray-500">Loading...</div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
