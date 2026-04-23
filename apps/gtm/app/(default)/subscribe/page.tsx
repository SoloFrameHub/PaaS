import { getAuthContext, getSubscriptionStatus } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import PlansPanel from "@/app/(default)/settings/plans/plans-panel";

export const metadata = {
  title: "Subscribe - SoloFrameHub",
  description: "Subscribe to access the Solo GTM OS",
};

export default async function SubscribePage() {
  const [{ user, profile }, locale] = await Promise.all([
    getAuthContext(),
    getLocale(),
  ]);
  const isEs = locale === "es";

  if (!user) {
    redirect("/signin");
  }

  if (!user.emailVerified) {
    redirect("/verify-email");
  }

  // Already subscribed (or open access mode) — send to onboarding or dashboard
  const status = await getSubscriptionStatus(user.uid);
  if (status === "active") {
    if (!profile || !profile.onboardingCompleted) {
      redirect("/onboarding/welcome");
    }
    redirect("/dashboard");
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          {isEs ? "Suscríbete para Acceder al OS" : "Subscribe to Access the OS"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          {isEs
            ? "Obtén acceso completo a los 7 tracks, simulaciones de roleplay de IA ilimitadas, sprints de cohorte y coaching de IA personalizado."
            : "Get full access to all 7 tracks, unlimited AI roleplay simulations, cohort sprints, and personalized AI coaching."}
        </p>
      </div>
      <PlansPanel />
    </div>
  );
}
