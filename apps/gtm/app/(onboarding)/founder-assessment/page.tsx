import { redirect } from "next/navigation";

/**
 * Legacy onboarding path — redirect to the new multi-step onboarding flow.
 * Kept as a redirect to avoid breaking bookmarks or auth redirects that reference this path.
 */
export default function FounderAssessmentPage() {
  redirect("/onboarding/welcome");
}
