import RoleplayInterface from "./roleplay-interface";
import { getAuthContext, getSubscriptionStatus } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sales Roleplay - SoloFrameHub",
  description: "Practice your sales conversations with AI personas.",
};

export default async function RoleplayPage() {
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
      <div className="flex-1 overflow-hidden p-4 lg:p-12 flex items-center justify-center">
        <RoleplayInterface profile={profile} />
      </div>
    </div>
  );
}
