import CoachingChat from "./coaching-chat";
import { getAuthContext, getSubscriptionStatus } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Solo Advisor AI - SoloFrameHub",
  description: "Get personalized sales and marketing advice for your business.",
};

export default async function CoachPage() {
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

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-gray-50 dark:bg-gray-950">
      <div className="flex-1 overflow-hidden p-4 lg:p-8 flex items-center justify-center">
        <CoachingChat profile={profile} />
      </div>
    </div>
  );
}
