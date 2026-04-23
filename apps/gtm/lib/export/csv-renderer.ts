/**
 * Renders profile artifacts as CSV.
 * Flattens structured artifacts into rows suitable for spreadsheet import.
 */

import type { ExportableArtifact } from "@/types/execute";
import type {
  ICPDocument,
  ValuePropCanvas,
  ListCriteria,
  DiscoveryPlaybook,
  EmailSequence,
  PersonalPlaybook,
} from "@/types/profile";

function escapeCsv(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function toCsv(headers: string[], rows: string[][]): string {
  const headerLine = headers.map(escapeCsv).join(",");
  const dataLines = rows.map((row) => row.map(escapeCsv).join(","));
  return [headerLine, ...dataLines].join("\n");
}

export function renderArtifactCsv(
  artifactType: ExportableArtifact,
  content: unknown,
): string {
  return RENDERERS[artifactType](content);
}

const RENDERERS: Record<ExportableArtifact, (content: unknown) => string> = {
  icpDocument: (c) => {
    const doc = c as ICPDocument;
    const rows: string[][] = [];
    if (doc.summary) rows.push(["Summary", doc.summary]);
    if (doc.decisionMaker?.title)
      rows.push(["Decision Maker Title", doc.decisionMaker.title]);
    doc.decisionMaker?.responsibilities?.forEach((r) =>
      rows.push(["Responsibility", r]),
    );
    doc.decisionMaker?.painPoints?.forEach((p) => rows.push(["Pain Point", p]));
    doc.decisionMaker?.goals?.forEach((g) => rows.push(["Goal", g]));
    if (doc.company?.size) rows.push(["Company Size", doc.company.size]);
    doc.company?.industry?.forEach((i) => rows.push(["Industry", i]));
    doc.company?.characteristics?.forEach((ch) =>
      rows.push(["Characteristic", ch]),
    );
    if (doc.buyingProcess?.budget)
      rows.push(["Budget", doc.buyingProcess.budget]);
    if (doc.buyingProcess?.timeline)
      rows.push(["Timeline", doc.buyingProcess.timeline]);
    doc.buyingProcess?.triggers?.forEach((t) =>
      rows.push(["Buying Trigger", t]),
    );
    doc.buyingProcess?.stakeholders?.forEach((s) =>
      rows.push(["Stakeholder", s]),
    );
    return toCsv(["Field", "Value"], rows);
  },

  positioningStatement: (c) => {
    return toCsv(["Field", "Value"], [["Positioning Statement", c as string]]);
  },

  valuePropositionCanvas: (c) => {
    const canvas = c as ValuePropCanvas;
    const rows: string[][] = [];
    canvas.customerJobs?.forEach((j) => rows.push(["Customer Job", j]));
    canvas.pains?.forEach((p) => rows.push(["Pain", p]));
    canvas.gains?.forEach((g) => rows.push(["Gain", g]));
    canvas.painRelievers?.forEach((p) => rows.push(["Pain Reliever", p]));
    canvas.gainCreators?.forEach((g) => rows.push(["Gain Creator", g]));
    return toCsv(["Category", "Value"], rows);
  },

  listBuildingCriteria: (c) => {
    const criteria = c as ListCriteria;
    const rows: string[][] = [];
    criteria.sources?.forEach((s) => rows.push(["Source", s]));
    if (criteria.filters) {
      for (const [key, values] of Object.entries(criteria.filters)) {
        values.forEach((v: string) => rows.push([`Filter: ${key}`, v]));
      }
    }
    criteria.exclusions?.forEach((e) => rows.push(["Exclusion", e]));
    if (criteria.prioritization)
      rows.push(["Prioritization", criteria.prioritization]);
    return toCsv(["Category", "Value"], rows);
  },

  discoveryPlaybook: (c) => {
    const playbook = c as DiscoveryPlaybook;
    const rows: string[][] = [];
    const sections: [string, string[]][] = [
      ["Opening", playbook.openingQuestions],
      ["Pain", playbook.painQuestions],
      ["Impact", playbook.impactQuestions],
      ["Decision", playbook.decisionQuestions],
      ["Closing", playbook.closingQuestions],
    ];
    for (const [phase, questions] of sections) {
      questions?.forEach((q, i) => rows.push([phase, String(i + 1), q]));
    }
    return toCsv(["Phase", "Order", "Question"], rows);
  },

  objectionLibrary: (c) => {
    const lib = c as {
      entries: { objection: string; response: string; category?: string }[];
    };
    const rows = (lib.entries || []).map((e) => [
      e.category || "",
      e.objection,
      e.response,
    ]);
    return toCsv(["Category", "Objection", "Response"], rows);
  },

  emailSequences: (c) => {
    const sequences = c as EmailSequence[];
    const rows: string[][] = [];
    (sequences || []).forEach((seq) => {
      seq.emails?.forEach((email, i) => {
        rows.push([
          seq.name,
          seq.purpose,
          String(i + 1),
          email.subject,
          email.timing,
          email.body,
        ]);
      });
    });
    return toCsv(
      ["Sequence", "Purpose", "Step", "Subject", "Timing", "Body"],
      rows,
    );
  },

  personalPlaybook: (c) => {
    const playbook = c as PersonalPlaybook;
    const rows: string[][] = [];
    playbook.keyMetrics?.forEach((m) => rows.push(["Key Metric", "", m]));
    if (playbook.weeklyRhythm) {
      for (const [day, tasks] of Object.entries(playbook.weeklyRhythm)) {
        tasks.forEach((t: string) => rows.push(["Weekly Rhythm", day, t]));
      }
    }
    if (playbook.messageTemplates) {
      for (const [name, template] of Object.entries(
        playbook.messageTemplates,
      )) {
        rows.push(["Message Template", name, template]);
      }
    }
    if (playbook.processSteps) {
      for (const [process, steps] of Object.entries(playbook.processSteps)) {
        steps.forEach((s: string) => rows.push(["Process Step", process, s]));
      }
    }
    return toCsv(["Category", "SubCategory", "Value"], rows);
  },
};
