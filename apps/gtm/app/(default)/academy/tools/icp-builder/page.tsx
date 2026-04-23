import ICPBuilderForm from "./icp-builder-form";
import { getAuthContext, getSubscriptionStatus } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export const metadata = {
  title: "ICP Builder - SoloFrameHub",
  description: "Validate your target audience with our board of AI personas.",
};

export default async function ICPBuilderPage() {
  const { user, profile } = await getAuthContext();

  if (!user) {
    redirect("/signin");
  }

  if (!profile) {
    redirect("/onboarding/welcome");
  }

  const subStatus = await getSubscriptionStatus(user.uid);
  if (subStatus !== "active") {
    redirect("/subscribe");
  }

  const locale = await getLocale();
  const isEs = locale === "es";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <nav className="flex mb-4 text-xs font-black uppercase tracking-widest text-gray-400 gap-2">
          <span className="hover:text-primary-500 cursor-pointer">{isEs ? "Academia" : "Academy"}</span>
          <span>/</span>
          <span className="text-primary-500">{isEs ? "Herramientas" : "Tools"}</span>
          <span>/</span>
          <span>ICP Builder</span>
        </nav>
        <h1 className="text-4xl lg:text-5xl font-black text-gray-800 dark:text-gray-100 tracking-tight">
          {isEs ? "Constructor de Perfil de Cliente Ideal" : "Ideal Customer Profile"}{" "}
          {!isEs && <span className="text-primary-500">Builder</span>}
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
          {isEs
            ? "Deja de adivinar. Pon tu ICP frente a un comité de compradores escépticos y comprueba si tu mensaje realmente resuena."
            : "Stop guessing. Put your ICP in front of a committee of skeptical buyers and see if your messaging actually resonates."}
        </p>
      </div>

      <ICPBuilderForm />
    </div>
  );
}
