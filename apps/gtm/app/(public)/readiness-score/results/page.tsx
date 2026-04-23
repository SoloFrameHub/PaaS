import { Metadata } from "next";
import { Suspense } from "react";
import ReadinessResults from "./readiness-results";

export const metadata: Metadata = {
  title: "Your Readiness Score Results | Solo GTM OS",
  description:
    "Your personalized customer acquisition readiness score and action plan.",
};

export default function ReadinessResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-neutral-950">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-white" />
        </div>
      }
    >
      <ReadinessResults />
    </Suspense>
  );
}
