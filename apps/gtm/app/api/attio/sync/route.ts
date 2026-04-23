import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse } from "@/lib/api/response-utils";
import { profileService } from "@/lib/services/profileService";
import { attioSyncService } from "@/lib/services/attioSyncService";
import type { FounderProfile } from "@/types/profile";

export const POST = withAuth(async (_request: NextRequest, { userId }) => {
  const profile = (await profileService.getProfile(
    userId,
  )) as FounderProfile | null;
  if (!profile) {
    return successResponse({ error: "Profile not found" }, 404);
  }

  const result = await attioSyncService.fullSync(userId, profile);
  return successResponse(result);
});
