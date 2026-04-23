/**
 * Renders profile artifacts as Markdown documents.
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

interface ExportMetadata {
  userName: string;
  businessName: string;
  generatedAt: string;
}

export function renderArtifactMarkdown(
  artifactType: ExportableArtifact,
  content: unknown,
  metadata: ExportMetadata,
): string {
  const header = [
    `# ${ARTIFACT_TITLES[artifactType]}`,
    "",
    `**Business:** ${metadata.businessName}`,
    `**Author:** ${metadata.userName}`,
    `**Exported:** ${metadata.generatedAt}`,
    "",
    "---",
    "",
  ].join("\n");

  const body = RENDERERS[artifactType](content);
  return header + body;
}

const ARTIFACT_TITLES: Record<ExportableArtifact, string> = {
  icpDocument: "Ideal Customer Profile",
  positioningStatement: "Positioning Statement",
  valuePropositionCanvas: "Value Proposition Canvas",
  listBuildingCriteria: "List Building Criteria",
  discoveryPlaybook: "Discovery Playbook",
  objectionLibrary: "Objection Library",
  emailSequences: "Email Sequences",
  personalPlaybook: "Personal Playbook",
};

const RENDERERS: Record<ExportableArtifact, (content: unknown) => string> = {
  icpDocument: (c) => {
    const doc = c as ICPDocument;
    const lines: string[] = [];
    if (doc.summary) lines.push(`## Summary\n\n${doc.summary}\n`);
    if (doc.decisionMaker) {
      lines.push(`## Decision Maker\n`);
      if (doc.decisionMaker.title)
        lines.push(`**Title:** ${doc.decisionMaker.title}\n`);
      if (doc.decisionMaker.responsibilities?.length) {
        lines.push(`### Responsibilities\n`);
        doc.decisionMaker.responsibilities.forEach((r) => lines.push(`- ${r}`));
        lines.push("");
      }
      if (doc.decisionMaker.painPoints?.length) {
        lines.push(`### Pain Points\n`);
        doc.decisionMaker.painPoints.forEach((p) => lines.push(`- ${p}`));
        lines.push("");
      }
      if (doc.decisionMaker.goals?.length) {
        lines.push(`### Goals\n`);
        doc.decisionMaker.goals.forEach((g) => lines.push(`- ${g}`));
        lines.push("");
      }
    }
    if (doc.company) {
      lines.push(`## Company Profile\n`);
      if (doc.company.size) lines.push(`**Size:** ${doc.company.size}\n`);
      if (doc.company.industry?.length) {
        lines.push(`### Industries\n`);
        doc.company.industry.forEach((i) => lines.push(`- ${i}`));
        lines.push("");
      }
      if (doc.company.characteristics?.length) {
        lines.push(`### Characteristics\n`);
        doc.company.characteristics.forEach((ch) => lines.push(`- ${ch}`));
        lines.push("");
      }
    }
    if (doc.buyingProcess) {
      lines.push(`## Buying Process\n`);
      if (doc.buyingProcess.budget)
        lines.push(`**Budget:** ${doc.buyingProcess.budget}\n`);
      if (doc.buyingProcess.timeline)
        lines.push(`**Timeline:** ${doc.buyingProcess.timeline}\n`);
      if (doc.buyingProcess.triggers?.length) {
        lines.push(`### Triggers\n`);
        doc.buyingProcess.triggers.forEach((t) => lines.push(`- ${t}`));
        lines.push("");
      }
      if (doc.buyingProcess.stakeholders?.length) {
        lines.push(`### Stakeholders\n`);
        doc.buyingProcess.stakeholders.forEach((s) => lines.push(`- ${s}`));
        lines.push("");
      }
    }
    return lines.join("\n");
  },

  positioningStatement: (c) => {
    const statement = c as string;
    return `## Your Positioning Statement\n\n> ${statement}\n`;
  },

  valuePropositionCanvas: (c) => {
    const canvas = c as ValuePropCanvas;
    const lines: string[] = [];
    if (canvas.customerJobs?.length) {
      lines.push(`## Customer Jobs\n`);
      canvas.customerJobs.forEach((j) => lines.push(`- ${j}`));
      lines.push("");
    }
    if (canvas.pains?.length) {
      lines.push(`## Pains\n`);
      canvas.pains.forEach((p) => lines.push(`- ${p}`));
      lines.push("");
    }
    if (canvas.gains?.length) {
      lines.push(`## Gains\n`);
      canvas.gains.forEach((g) => lines.push(`- ${g}`));
      lines.push("");
    }
    if (canvas.painRelievers?.length) {
      lines.push(`## Pain Relievers\n`);
      canvas.painRelievers.forEach((p) => lines.push(`- ${p}`));
      lines.push("");
    }
    if (canvas.gainCreators?.length) {
      lines.push(`## Gain Creators\n`);
      canvas.gainCreators.forEach((g) => lines.push(`- ${g}`));
      lines.push("");
    }
    return lines.join("\n");
  },

  listBuildingCriteria: (c) => {
    const criteria = c as ListCriteria;
    const lines: string[] = [];
    if (criteria.sources?.length) {
      lines.push(`## Sources\n`);
      criteria.sources.forEach((s) => lines.push(`- ${s}`));
      lines.push("");
    }
    if (criteria.filters && Object.keys(criteria.filters).length) {
      lines.push(`## Filters\n`);
      for (const [key, values] of Object.entries(criteria.filters)) {
        lines.push(`### ${key}\n`);
        values.forEach((v: string) => lines.push(`- ${v}`));
        lines.push("");
      }
    }
    if (criteria.exclusions?.length) {
      lines.push(`## Exclusions\n`);
      criteria.exclusions.forEach((e) => lines.push(`- ${e}`));
      lines.push("");
    }
    if (criteria.prioritization) {
      lines.push(`## Prioritization\n\n${criteria.prioritization}\n`);
    }
    return lines.join("\n");
  },

  discoveryPlaybook: (c) => {
    const playbook = c as DiscoveryPlaybook;
    const sections: [string, string[]][] = [
      ["Opening Questions", playbook.openingQuestions],
      ["Pain Questions", playbook.painQuestions],
      ["Impact Questions", playbook.impactQuestions],
      ["Decision Questions", playbook.decisionQuestions],
      ["Closing Questions", playbook.closingQuestions],
    ];
    const lines: string[] = [];
    for (const [title, questions] of sections) {
      if (questions?.length) {
        lines.push(`## ${title}\n`);
        questions.forEach((q, i) => lines.push(`${i + 1}. ${q}`));
        lines.push("");
      }
    }
    return lines.join("\n");
  },

  objectionLibrary: (c) => {
    const lib = c as {
      entries: { objection: string; response: string; category?: string }[];
    };
    if (!lib.entries?.length) return "*No objections recorded yet.*\n";
    const lines: string[] = [];
    lib.entries.forEach((entry, i) => {
      lines.push(`## ${i + 1}. ${entry.objection}\n`);
      if (entry.category) lines.push(`**Category:** ${entry.category}\n`);
      lines.push(`**Response:** ${entry.response}\n`);
    });
    return lines.join("\n");
  },

  emailSequences: (c) => {
    const sequences = c as EmailSequence[];
    if (!sequences?.length) return "*No email sequences created yet.*\n";
    const lines: string[] = [];
    sequences.forEach((seq) => {
      lines.push(`## ${seq.name}\n`);
      lines.push(`**Purpose:** ${seq.purpose}\n`);
      seq.emails?.forEach((email, i) => {
        lines.push(`### Email ${i + 1}: ${email.subject}\n`);
        lines.push(`**Timing:** ${email.timing}\n`);
        lines.push(`${email.body}\n`);
      });
    });
    return lines.join("\n");
  },

  personalPlaybook: (c) => {
    const playbook = c as PersonalPlaybook;
    const lines: string[] = [];
    if (playbook.keyMetrics?.length) {
      lines.push(`## Key Metrics\n`);
      playbook.keyMetrics.forEach((m) => lines.push(`- ${m}`));
      lines.push("");
    }
    if (playbook.weeklyRhythm && Object.keys(playbook.weeklyRhythm).length) {
      lines.push(`## Weekly Rhythm\n`);
      for (const [day, tasks] of Object.entries(playbook.weeklyRhythm)) {
        lines.push(`### ${day}\n`);
        tasks.forEach((t: string) => lines.push(`- ${t}`));
        lines.push("");
      }
    }
    if (
      playbook.messageTemplates &&
      Object.keys(playbook.messageTemplates).length
    ) {
      lines.push(`## Message Templates\n`);
      for (const [name, template] of Object.entries(
        playbook.messageTemplates,
      )) {
        lines.push(`### ${name}\n`);
        lines.push(`${template}\n`);
      }
    }
    if (playbook.processSteps && Object.keys(playbook.processSteps).length) {
      lines.push(`## Process Steps\n`);
      for (const [process, steps] of Object.entries(playbook.processSteps)) {
        lines.push(`### ${process}\n`);
        steps.forEach((s: string, i: number) => lines.push(`${i + 1}. ${s}`));
        lines.push("");
      }
    }
    return lines.join("\n");
  },
};
