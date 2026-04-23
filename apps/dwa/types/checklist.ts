// ── Checklist Types ──

export interface ChecklistItem {
    id: string;
    label: string;
    type: 'checkbox' | 'text' | 'rating';
    category?: string;
    placeholder?: string;
    min?: number;
    max?: number;
}

export interface ChecklistConfig {
    id: string;
    title: string;
    description: string;
    instructions: string;
    items: ChecklistItem[];
    disclaimer?: string;
}

export interface ChecklistProgress {
    checklistId: string;
    courseId: string;
    lessonId: string;
    items: Record<string, boolean>;
    values: Record<string, string | number>;
    completedAt?: string;
    updatedAt: string;
}

// ── API Response Types ──

export interface ChecklistLoadResponse {
    config: ChecklistConfig;
    progress: ChecklistProgress | null;
}

export interface ChecklistSaveResponse {
    progress: ChecklistProgress;
    xpAwarded?: number;
}
