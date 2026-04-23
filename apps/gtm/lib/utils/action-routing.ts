/**
 * Action Routing Utilities
 *
 * Converts assessment action types/targets into navigable URLs.
 * Used by assessment results page and dashboard to make quick wins
 * and critical gaps clickable.
 */

import type { ActionType, ActionTarget } from '@/types/profile';
import { getCourseByNumber } from '@/lib/data/curriculum';

export interface ActionRoute {
    href: string;
    label: string;
    icon: 'book' | 'tool' | 'wrench' | 'chat' | 'mic';
}

/**
 * Build a route from an assessment item's action type and target.
 * Returns null if no valid route can be determined.
 */
export function buildActionRoute(
    actionType?: ActionType,
    actionTarget?: ActionTarget,
    fallbackCourseNumber?: number,
): ActionRoute | null {
    if (!actionType && fallbackCourseNumber !== undefined) {
        const course = getCourseByNumber(fallbackCourseNumber);
        if (course) {
            return {
                href: `/academy/${course.id}`,
                label: `Start ${course.title}`,
                icon: 'book',
            };
        }
        return null;
    }

    if (!actionType) return null;

    switch (actionType) {
        case 'course': {
            const courseNum = actionTarget?.courseNumber ?? fallbackCourseNumber;
            if (courseNum === undefined) return null;
            const course = getCourseByNumber(courseNum);
            if (!course) return null;
            return {
                href: `/academy/${course.id}`,
                label: `Start ${course.title}`,
                icon: 'book',
            };
        }

        case 'artifact': {
            const courseNum = actionTarget?.courseNumber ?? fallbackCourseNumber;
            if (courseNum === undefined) return null;
            const course = getCourseByNumber(courseNum);
            if (!course) return null;
            return {
                href: `/academy/${course.id}`,
                label: `Build ${actionTarget?.artifactType ? formatArtifactName(actionTarget.artifactType) : 'Artifact'}`,
                icon: 'tool',
            };
        }

        case 'workshop': {
            const workshopId = actionTarget?.workshopId;
            if (!workshopId) return null;
            return {
                href: `/workshop/${workshopId}`,
                label: `Start Workshop`,
                icon: 'wrench',
            };
        }

        case 'coach-session': {
            return {
                href: '/coach',
                label: 'Talk to Coach',
                icon: 'chat',
            };
        }

        case 'roleplay': {
            const config = actionTarget?.roleplayConfig;
            const params = config
                ? `?disc=${config.discType}&scenario=${config.scenarioType}`
                : '';
            return {
                href: `/roleplay${params}`,
                label: 'Practice Roleplay',
                icon: 'mic',
            };
        }

        default:
            return null;
    }
}

function formatArtifactName(artifactType: string): string {
    const names: Record<string, string> = {
        icpDocument: 'ICP Document',
        positioningStatement: 'Positioning Statement',
        valuePropositionCanvas: 'Value Prop Canvas',
        acquisitionPath: 'Acquisition Path',
        listBuildingCriteria: 'List Building Criteria',
        emailSequences: 'Email Sequences',
        discoveryPlaybook: 'Discovery Playbook',
        objectionLibrary: 'Objection Library',
        personalPlaybook: 'Personal Playbook',
    };
    return names[artifactType] || artifactType;
}
