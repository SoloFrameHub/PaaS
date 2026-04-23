import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse, validateBody } from "@/lib/api/response-utils";
import { profileService } from "@/lib/services/profileService";
import { connectedAccountService } from "@/lib/services/connectedAccountService";
import { notionClient } from "@/lib/notion/client";
import { renderArtifactMarkdown } from "@/lib/export/markdown-renderer";
import { markdownToNotionBlocks } from "@/lib/notion/block-builder";
import { activityFeedService } from "@/lib/services/activityFeedService";
import { z } from "zod";
import type { ExportableArtifact } from "@/types/execute";
import type { FounderProfile, ProfileArtifacts } from "@/types/profile";

const ARTIFACT_TITLES: Record<string, string> = {
  icpDocument: "Ideal Customer Profile",
  positioningStatement: "Positioning Statement",
  valuePropositionCanvas: "Value Proposition Canvas",
  listBuildingCriteria: "List Building Criteria",
  discoveryPlaybook: "Discovery Playbook",
  objectionLibrary: "Objection Library",
  emailSequences: "Email Sequences",
  personalPlaybook: "Personal Playbook",
};

const exportNotionSchema = z.object({
  artifactType: z.enum([
    "icpDocument",
    "positioningStatement",
    "valuePropositionCanvas",
    "listBuildingCriteria",
    "discoveryPlaybook",
    "objectionLibrary",
    "emailSequences",
    "personalPlaybook",
  ]),
  parentPageId: z.string().min(1, "Parent page ID is required"),
});

export const POST = withAuth(async (request: NextRequest, { userId }) => {
  const { artifactType, parentPageId } = await validateBody(
    request,
    exportNotionSchema,
  );

  // Check Notion connection
  const connection = await connectedAccountService.getConnection(
    userId,
    "notion",
  );
  if (!connection) {
    return successResponse(
      { error: "Notion not connected. Connect via Settings > Apps." },
      400,
    );
  }

  // Get profile and artifact
  const profile = (await profileService.getProfile(
    userId,
  )) as FounderProfile | null;
  if (!profile?.artifacts) {
    return successResponse({ error: "No artifacts found" }, 404);
  }

  const artifacts = profile.artifacts as ProfileArtifacts;
  const raw = artifacts[artifactType as keyof ProfileArtifacts];
  if (!raw) {
    return successResponse(
      { error: `Artifact "${artifactType}" not created yet` },
      404,
    );
  }

  const content =
    "content" in (raw as Record<string, unknown>)
      ? (raw as { content: unknown }).content
      : raw;

  // Render to markdown, then convert to Notion blocks
  const metadata = {
    userName: profile.name || "Solo Founder",
    businessName: profile.businessName || "My Business",
    generatedAt: new Date().toISOString().split("T")[0],
  };

  const markdown = renderArtifactMarkdown(
    artifactType as ExportableArtifact,
    content,
    metadata,
  );
  const blocks = markdownToNotionBlocks(markdown);
  const title = `${ARTIFACT_TITLES[artifactType]} — ${metadata.businessName}`;

  const page = await notionClient.createPage(
    connection.accessToken,
    title,
    blocks,
    parentPageId,
  );

  // Fire-and-forget activity event
  activityFeedService
    .insertEvent(
      userId,
      "artifact_exported",
      `Exported ${artifactType} to Notion`,
      undefined,
      { artifactType, format: "notion", notionPageId: page.id },
    )
    .catch(() => {});

  return successResponse({
    exported: true,
    pageId: page.id,
    pageUrl: page.url,
  });
});
