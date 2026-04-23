/**
 * Export Engine — orchestrates artifact export to various formats.
 */

import type {
  ExportableArtifact,
  ExportFormat,
  ExportResult,
} from "@/types/execute";
import { renderArtifactMarkdown } from "./markdown-renderer";
import { renderArtifactCsv } from "./csv-renderer";

interface ExportMetadata {
  userName: string;
  businessName: string;
  generatedAt: string;
}

const MIME_TYPES: Record<ExportFormat, string> = {
  markdown: "text/markdown",
  csv: "text/csv",
  html: "text/html",
};

const EXTENSIONS: Record<ExportFormat, string> = {
  markdown: "md",
  csv: "csv",
  html: "html",
};

const ARTIFACT_SLUGS: Record<ExportableArtifact, string> = {
  icpDocument: "icp-document",
  positioningStatement: "positioning-statement",
  valuePropositionCanvas: "value-proposition-canvas",
  listBuildingCriteria: "list-building-criteria",
  discoveryPlaybook: "discovery-playbook",
  objectionLibrary: "objection-library",
  emailSequences: "email-sequences",
  personalPlaybook: "personal-playbook",
};

/**
 * Export an artifact to the specified format.
 * For HTML format, wraps the markdown in a printable HTML page (for browser print-to-PDF).
 */
export function exportArtifact(
  artifactType: ExportableArtifact,
  content: unknown,
  format: ExportFormat,
  metadata: ExportMetadata,
): ExportResult {
  const slug = ARTIFACT_SLUGS[artifactType];
  const fileName = `${slug}-${metadata.generatedAt.replace(/[:/]/g, "-")}.${EXTENSIONS[format]}`;

  let data: string;

  switch (format) {
    case "markdown":
      data = renderArtifactMarkdown(artifactType, content, metadata);
      break;
    case "csv":
      data = renderArtifactCsv(artifactType, content);
      break;
    case "html":
      data = wrapInPrintableHtml(
        renderArtifactMarkdown(artifactType, content, metadata),
        metadata,
      );
      break;
  }

  return {
    data,
    mimeType: MIME_TYPES[format],
    fileName,
  };
}

function wrapInPrintableHtml(
  markdown: string,
  metadata: ExportMetadata,
): string {
  // Simple markdown-to-HTML: convert headers, bold, lists, blockquotes, hr
  let html = markdown
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^---$/gm, "<hr>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>");

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>");

  // Wrap remaining plain text lines in <p>
  html = html
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<")) return trimmed;
      return `<p>${trimmed}</p>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${metadata.businessName} — Export</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; color: #1a1a1a; line-height: 1.6; }
    h1 { font-size: 1.75rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; }
    h2 { font-size: 1.35rem; margin-top: 1.5rem; color: #374151; }
    h3 { font-size: 1.1rem; color: #6b7280; }
    blockquote { border-left: 4px solid #3b82f6; padding: 0.75rem 1rem; margin: 1rem 0; background: #eff6ff; }
    ul { padding-left: 1.5rem; }
    li { margin: 0.25rem 0; }
    hr { border: none; border-top: 1px solid #e5e7eb; margin: 1.5rem 0; }
    strong { color: #111827; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
${html}
</body>
</html>`;
}
