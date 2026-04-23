import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { profileService } from "@/lib/services/profileService";
import { exportArtifact } from "@/lib/export";
import { exportQuerySchema } from "@/lib/validations/export";
import { activityFeedService } from "@/lib/services/activityFeedService";
import { isRateLimited, EXPENSIVE_RATE_LIMIT } from "@/lib/security";
import type { ExportableArtifact, ExportFormat } from "@/types/execute";
import type { FounderProfile, ProfileArtifacts } from "@/types/profile";

export const GET = withAuth(async (request: NextRequest, { userId }) => {
  const { limited } = await isRateLimited(
    userId,
    EXPENSIVE_RATE_LIMIT,
    "export",
  );
  if (limited) {
    return NextResponse.json(
      {
        error: {
          message: "Rate limit exceeded. Please try again later.",
          code: "RATE_LIMIT",
        },
      },
      { status: 429 },
    );
  }
  const url = new URL(request.url);
  const params = {
    artifactType: url.searchParams.get("artifactType"),
    format: url.searchParams.get("format"),
  };

  const parsed = exportQuerySchema.safeParse(params);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          message: "Invalid parameters. Required: artifactType, format",
          code: "VALIDATION_ERROR",
        },
      },
      { status: 400 },
    );
  }

  const { artifactType, format } = parsed.data;

  const profile = (await profileService.getProfile(
    userId,
  )) as FounderProfile | null;
  if (!profile) {
    return NextResponse.json(
      { error: { message: "Profile not found", code: "NOT_FOUND" } },
      { status: 404 },
    );
  }

  const artifacts = profile.artifacts as ProfileArtifacts | undefined;
  if (!artifacts) {
    return NextResponse.json(
      { error: { message: "No artifacts found", code: "NOT_FOUND" } },
      { status: 404 },
    );
  }

  // Extract artifact content — handle versioned vs non-versioned
  const raw = artifacts[artifactType as keyof ProfileArtifacts];
  if (!raw) {
    return NextResponse.json(
      {
        error: {
          message: `Artifact "${artifactType}" has not been created yet`,
          code: "NOT_FOUND",
        },
      },
      { status: 404 },
    );
  }

  // Versioned artifacts have .content, non-versioned (objectionLibrary, acquisitionPath) are direct
  const content =
    "content" in (raw as Record<string, unknown>)
      ? (raw as { content: unknown }).content
      : raw;

  const metadata = {
    userName: profile.name || "Solo Founder",
    businessName: profile.businessName || "My Business",
    generatedAt: new Date().toISOString().split("T")[0],
  };

  const result = exportArtifact(
    artifactType as ExportableArtifact,
    content,
    format as ExportFormat,
    metadata,
  );

  // Fire-and-forget activity event
  activityFeedService
    .insertEvent(
      userId,
      "artifact_exported",
      `Exported ${artifactType} as ${format}`,
      undefined,
      { artifactType, format },
    )
    .catch(() => {});

  return new NextResponse(result.data, {
    status: 200,
    headers: {
      "Content-Type": result.mimeType,
      "Content-Disposition": `attachment; filename="${result.fileName}"`,
    },
  });
});
