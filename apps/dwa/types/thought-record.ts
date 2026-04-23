// ── Thought Record Types ──

export interface ThoughtRecordField {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'rating' | 'select';
    placeholder?: string;
    required?: boolean;
    min?: number;
    max?: number;
    unit?: string;
    options?: { value: string; label: string }[];
}

export interface CognitiveDistortion {
    id: string;
    name: string;
    description: string;
}

export interface ThoughtRecordConfig {
    id: string;
    title: string;
    description: string;
    instructions: string;
    fields: ThoughtRecordField[];
    distortionsList?: CognitiveDistortion[];
    disclaimer?: string;
}

export interface ThoughtRecordEntry {
    id: string;
    recordId: string;
    courseId: string;
    lessonId: string;
    date: string;
    values: Record<string, string | number>;
    createdAt: string;
}

// ── API Response Types ──

export interface ThoughtRecordLoadResponse {
    config: ThoughtRecordConfig;
    entries: ThoughtRecordEntry[];
}

export interface ThoughtRecordSubmitResponse {
    entry: ThoughtRecordEntry;
}
