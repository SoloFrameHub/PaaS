import { z } from "zod";

export const exportQuerySchema = z.object({
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
  format: z.enum(["markdown", "csv", "html"]),
});

export type ExportQuery = z.infer<typeof exportQuerySchema>;
