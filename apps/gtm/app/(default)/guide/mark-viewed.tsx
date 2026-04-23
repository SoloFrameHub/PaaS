"use client";

import { useEffect } from "react";

/**
 * Invisible client component that marks the guide as viewed in localStorage.
 * Used by the onboarding checklist on the dashboard to track this step.
 */
export function MarkGuideViewed() {
  useEffect(() => {
    localStorage.setItem("sfh-guide-viewed", "true");
  }, []);
  return null;
}
