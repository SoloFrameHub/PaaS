import type { ProfileArtifacts } from '@/types/profile';

export type ArtifactType = keyof ProfileArtifacts;

export interface ArtifactSection {
    id: string;
    label: string;
    description: string;
    fields: ArtifactField[];
}

export interface ArtifactField {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'list' | 'record';
    placeholder?: string;
    required?: boolean;
}

export interface ArtifactMapping {
    artifactType: ArtifactType;
    courseId: string;
    courseNumber: number;
    artifactLabel: string;
    artifactDescription: string;
    sections: ArtifactSection[];
}

// ─── Course → Artifact Mappings ────────────────────────────────────

export const ARTIFACT_MAPPINGS: ArtifactMapping[] = [
    {
        artifactType: 'icpDocument',
        courseId: 'icp-builder',
        courseNumber: 1,
        artifactLabel: 'ICP Document',
        artifactDescription: 'Your Ideal Customer Profile — who you sell to and why',
        sections: [
            {
                id: 'summary',
                label: 'ICP Summary',
                description: 'A one-paragraph description of your ideal customer',
                fields: [
                    { key: 'summary', label: 'ICP Summary', type: 'textarea', placeholder: 'Describe your ideal customer in one paragraph...', required: true },
                ],
            },
            {
                id: 'decisionMaker',
                label: 'Decision Maker Profile',
                description: 'The person who signs the check',
                fields: [
                    { key: 'decisionMaker.title', label: 'Job Title', type: 'text', placeholder: 'e.g., VP of Marketing' },
                    { key: 'decisionMaker.responsibilities', label: 'Key Responsibilities', type: 'list', placeholder: 'What they are accountable for...' },
                    { key: 'decisionMaker.painPoints', label: 'Pain Points', type: 'list', placeholder: 'What keeps them up at night...' },
                    { key: 'decisionMaker.goals', label: 'Goals', type: 'list', placeholder: 'What success looks like for them...' },
                ],
            },
            {
                id: 'company',
                label: 'Company Profile',
                description: 'The type of company you target',
                fields: [
                    { key: 'company.size', label: 'Company Size', type: 'text', placeholder: 'e.g., 50-200 employees' },
                    { key: 'company.industry', label: 'Industries', type: 'list', placeholder: 'Target industries...' },
                    { key: 'company.characteristics', label: 'Characteristics', type: 'list', placeholder: 'What makes them a good fit...' },
                ],
            },
            {
                id: 'buyingProcess',
                label: 'Buying Process',
                description: 'How they buy',
                fields: [
                    { key: 'buyingProcess.triggers', label: 'Buying Triggers', type: 'list', placeholder: 'What events cause them to look for a solution...' },
                    { key: 'buyingProcess.stakeholders', label: 'Stakeholders', type: 'list', placeholder: 'Who else is involved in the decision...' },
                    { key: 'buyingProcess.timeline', label: 'Typical Timeline', type: 'text', placeholder: 'e.g., 2-4 weeks' },
                    { key: 'buyingProcess.budget', label: 'Budget Range', type: 'text', placeholder: 'e.g., $5K-$25K/year' },
                ],
            },
        ],
    },
    {
        artifactType: 'positioningStatement',
        courseId: 'positioning-value',
        courseNumber: 2,
        artifactLabel: 'Positioning Statement',
        artifactDescription: 'How you differentiate from competitors in one clear statement',
        sections: [
            {
                id: 'statement',
                label: 'Your Positioning Statement',
                description: 'For [target customer] who [need], [your product] is [category] that [key benefit]. Unlike [competitors], we [differentiator].',
                fields: [
                    { key: 'content', label: 'Positioning Statement', type: 'textarea', placeholder: 'For [target customer] who [need], [your product] is [category] that [key benefit]. Unlike [competitors], we [differentiator].', required: true },
                ],
            },
        ],
    },
    {
        artifactType: 'valuePropositionCanvas',
        courseId: 'positioning-value',
        courseNumber: 2,
        artifactLabel: 'Value Proposition Canvas',
        artifactDescription: 'Map customer jobs, pains, and gains to your solution',
        sections: [
            {
                id: 'customer',
                label: 'Customer Side',
                description: 'What your customer is trying to do, their pains and desired gains',
                fields: [
                    { key: 'customerJobs', label: 'Customer Jobs', type: 'list', placeholder: 'What tasks are they trying to complete...' },
                    { key: 'pains', label: 'Pains', type: 'list', placeholder: 'What frustrates them about current solutions...' },
                    { key: 'gains', label: 'Desired Gains', type: 'list', placeholder: 'What outcomes would delight them...' },
                ],
            },
            {
                id: 'solution',
                label: 'Your Solution',
                description: 'How your product addresses each job, pain, and gain',
                fields: [
                    { key: 'products', label: 'Products & Services', type: 'list', placeholder: 'What you offer...' },
                    { key: 'painRelievers', label: 'Pain Relievers', type: 'list', placeholder: 'How you eliminate customer pains...' },
                    { key: 'gainCreators', label: 'Gain Creators', type: 'list', placeholder: 'How you create customer gains...' },
                ],
            },
        ],
    },
    {
        artifactType: 'acquisitionPath',
        courseId: 'choose-path',
        courseNumber: 3,
        artifactLabel: 'Acquisition Path',
        artifactDescription: 'Your chosen go-to-market strategy: inbound, outbound, or hybrid',
        sections: [
            {
                id: 'path',
                label: 'Your Acquisition Path',
                description: 'Based on your business model, resources, and audience',
                fields: [
                    { key: 'primary', label: 'Primary Path', type: 'text', placeholder: 'inbound, outbound, or hybrid' },
                    { key: 'channels', label: 'Chosen Channels', type: 'list', placeholder: 'The specific channels you will use...' },
                ],
            },
        ],
    },
    {
        artifactType: 'listBuildingCriteria',
        courseId: 'list-building',
        courseNumber: 4,
        artifactLabel: 'List Building Criteria',
        artifactDescription: 'Your prospecting system: sources, filters, and prioritization',
        sections: [
            {
                id: 'criteria',
                label: 'List Building System',
                description: 'Where you find prospects and how you qualify them',
                fields: [
                    { key: 'sources', label: 'Lead Sources', type: 'list', placeholder: 'Where you find prospects (LinkedIn, events, directories...)' },
                    { key: 'exclusions', label: 'Exclusion Criteria', type: 'list', placeholder: 'Who you explicitly do NOT target...' },
                    { key: 'prioritization', label: 'Prioritization Method', type: 'textarea', placeholder: 'How you rank and prioritize leads...' },
                ],
            },
        ],
    },
    {
        artifactType: 'emailSequences',
        courseId: 'cold-email-mastery',
        courseNumber: 8,
        artifactLabel: 'Email Sequences',
        artifactDescription: 'Your cold email templates and follow-up sequences',
        sections: [
            {
                id: 'sequence',
                label: 'Primary Email Sequence',
                description: 'Your main outreach sequence with subject lines, body copy, and timing',
                fields: [
                    { key: 'name', label: 'Sequence Name', type: 'text', placeholder: 'e.g., Cold outreach - ICP Decision Makers' },
                    { key: 'purpose', label: 'Sequence Purpose', type: 'textarea', placeholder: 'What this sequence aims to achieve...' },
                ],
            },
        ],
    },
    {
        artifactType: 'discoveryPlaybook',
        courseId: 'discovery-framework',
        courseNumber: 14,
        artifactLabel: 'Discovery Playbook',
        artifactDescription: 'Your structured discovery call questions by stage',
        sections: [
            {
                id: 'questions',
                label: 'Discovery Questions',
                description: 'Organized questions for each stage of a discovery call',
                fields: [
                    { key: 'openingQuestions', label: 'Opening Questions', type: 'list', placeholder: 'Rapport-building and agenda-setting questions...' },
                    { key: 'painQuestions', label: 'Pain Discovery Questions', type: 'list', placeholder: 'Questions that uncover the real problem...' },
                    { key: 'impactQuestions', label: 'Impact Questions', type: 'list', placeholder: 'Questions that quantify the cost of inaction...' },
                    { key: 'decisionQuestions', label: 'Decision Process Questions', type: 'list', placeholder: 'Questions about timeline, budget, stakeholders...' },
                    { key: 'closingQuestions', label: 'Next Steps Questions', type: 'list', placeholder: 'Questions that advance the deal...' },
                ],
            },
        ],
    },
    {
        artifactType: 'objectionLibrary',
        courseId: 'objection-handling',
        courseNumber: 17,
        artifactLabel: 'Objection Library',
        artifactDescription: 'Your database of common objections and proven responses',
        sections: [
            {
                id: 'library',
                label: 'Objection Responses',
                description: 'Catalog of objections you encounter and your best responses',
                fields: [
                    { key: 'entries', label: 'Objection → Response Pairs', type: 'list', placeholder: 'Add objections and your responses...' },
                ],
            },
        ],
    },
    {
        artifactType: 'personalPlaybook',
        courseId: 'playbook',
        courseNumber: 44,
        artifactLabel: 'Personal Sales Playbook',
        artifactDescription: 'Your complete one-page acquisition system',
        sections: [
            {
                id: 'rhythm',
                label: 'Weekly Rhythm',
                description: 'Your daily and weekly sales activities',
                fields: [
                    { key: 'keyMetrics', label: 'Key Metrics', type: 'list', placeholder: 'The numbers you track weekly...' },
                ],
            },
            {
                id: 'process',
                label: 'Sales Process',
                description: 'Your repeatable process from prospect to close',
                fields: [
                    { key: 'processSteps', label: 'Process Steps', type: 'list', placeholder: 'Step-by-step from lead to customer...' },
                ],
            },
        ],
    },
];

// ─── Lookup helpers ────────────────────────────────────────────────

const COURSE_TO_ARTIFACTS = new Map<string, ArtifactMapping[]>();
for (const m of ARTIFACT_MAPPINGS) {
    const existing = COURSE_TO_ARTIFACTS.get(m.courseId) || [];
    existing.push(m);
    COURSE_TO_ARTIFACTS.set(m.courseId, existing);
}

const ARTIFACT_TYPE_MAP = new Map<ArtifactType, ArtifactMapping>();
for (const m of ARTIFACT_MAPPINGS) {
    ARTIFACT_TYPE_MAP.set(m.artifactType, m);
}

export function getArtifactsForCourse(courseId: string): ArtifactMapping[] {
    return COURSE_TO_ARTIFACTS.get(courseId) || [];
}

export function getArtifactMapping(artifactType: ArtifactType): ArtifactMapping | undefined {
    return ARTIFACT_TYPE_MAP.get(artifactType);
}

export function getArtifactSection(artifactType: ArtifactType, sectionId: string): ArtifactSection | undefined {
    const mapping = ARTIFACT_TYPE_MAP.get(artifactType);
    return mapping?.sections.find(s => s.id === sectionId);
}

/** Count how many artifacts have content in a profile */
export function countCompletedArtifacts(artifacts: ProfileArtifacts): number {
    return Object.values(artifacts).filter(v => v !== null).length;
}

/** Get artifact completion status for each type */
export function getArtifactStatuses(artifacts: ProfileArtifacts): Record<ArtifactType, 'complete' | 'empty'> {
    const result = {} as Record<ArtifactType, 'complete' | 'empty'>;
    for (const key of Object.keys(artifacts) as ArtifactType[]) {
        result[key] = artifacts[key] !== null ? 'complete' : 'empty';
    }
    return result;
}
