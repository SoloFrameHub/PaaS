import AcademyDashboard from "./academy-dashboard";
import { getAuthContext, getSubscriptionStatus } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getPreviousScores } from "@/lib/services/scoreHistoryService";

export const metadata = {
  title: "Dashboard - SoloFrameHub",
  description: "Your Acquisition OS Progress",
};

export default async function DashboardPage() {
  const { user, profile } = await getAuthContext();

  // 1. Not authenticated -> signin
  if (!user) {
    redirect("/signin");
  }

  // 1.5. Email not verified -> verify
  if (!user.emailVerified) {
    redirect("/verify-email");
  }

  // 2. Authenticated but no profile OR onboarding not complete -> onboarding
  if (!profile || !profile.onboardingCompleted) {
    redirect("/onboarding/welcome");
  }

  // 3. No active subscription -> subscribe
  const subStatus = await getSubscriptionStatus(user.uid);
  if (subStatus !== "active") {
    redirect("/subscribe");
  }

  // Fetch previous scores for delta display (non-blocking)
  const previousScores = profile.assessment
    ? await getPreviousScores(user.uid)
    : null;

  return <AcademyDashboard profile={profile} previousScores={previousScores} />;
}
