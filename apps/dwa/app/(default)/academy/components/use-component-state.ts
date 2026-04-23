'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import { apiClient } from '@/lib/api/client';
import type {
    LessonComponentState,
    ComponentStateLoadResponse,
    ComponentStateSaveResponse,
    ComponentStateSaveRequest,
} from '@/types/component-state';

// Module-level cache: deduplicates GET requests when multiple components mount on the same page
const fetchCache = new Map<string, Promise<LessonComponentState | null>>();

function getCacheKey(courseId: string, lessonId: string) {
    return `${courseId}::${lessonId}`;
}

function fetchState(courseId: string, lessonId: string): Promise<LessonComponentState | null> {
    const key = getCacheKey(courseId, lessonId);
    const cached = fetchCache.get(key);
    if (cached) return cached;

    const promise = apiClient
        .get<ComponentStateLoadResponse>(`/api/academy/component-state/${courseId}/${lessonId}`)
        .then(res => res.state)
        .catch(() => null)
        .finally(() => {
            // Clear cache after settling so future navigations re-fetch
            setTimeout(() => fetchCache.delete(key), 100);
        });

    fetchCache.set(key, promise);
    return promise;
}

/** Simple hash for auto-generating persistKeys from text */
export function hashText(text: string): string {
    let h = 0;
    for (let i = 0; i < text.length; i++) {
        h = ((h << 5) - h + text.charCodeAt(i)) | 0;
    }
    return Math.abs(h).toString(36);
}

/**
 * Shared hook for server-persisted component interaction state.
 * Uses useParams() to read courseId/lessonId from the route — no prop drilling needed.
 * Deduplicates GET requests across multiple components on the same page.
 * Debounces PUT saves at 1 second.
 */
export function useComponentState() {
    const params = useParams<{ courseId: string; lessonId: string }>();
    const courseId = params?.courseId ?? '';
    const lessonId = params?.lessonId ?? '';

    const [state, setState] = useState<LessonComponentState | null>(null);
    const [loading, setLoading] = useState(true);
    const latestRef = useRef<LessonComponentState | null>(null);
    const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Load on mount (deduplicated across components)
    useEffect(() => {
        if (!courseId || !lessonId) {
            setLoading(false);
            return;
        }

        let cancelled = false;
        fetchState(courseId, lessonId).then(loaded => {
            if (cancelled) return;
            setState(loaded);
            latestRef.current = loaded;
            setLoading(false);
        });

        return () => { cancelled = true; };
    }, [courseId, lessonId]);

    // Debounced save
    const save = useCallback((update: ComponentStateSaveRequest) => {
        if (!courseId || !lessonId) return;

        if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        saveTimerRef.current = setTimeout(async () => {
            try {
                const result = await apiClient.put<ComponentStateSaveResponse>(
                    `/api/academy/component-state/${courseId}/${lessonId}`,
                    update
                );
                setState(result.state);
                latestRef.current = result.state;
            } catch {
                // Silent failure — component still works locally
            }
        }, 1000);
    }, [courseId, lessonId]);

    // ── Component-specific helpers ──

    const markFlipCardReviewed = useCallback((persistKey: string) => {
        const current = latestRef.current;
        const reviewed = current?.flipCards?.reviewed ?? [];
        if (reviewed.includes(persistKey)) return;

        const newReviewed = [...reviewed, persistKey];

        // Optimistic update
        const empty: LessonComponentState = {
            courseId, lessonId,
            flipCards: { reviewed: [] },
            accordions: { opened: [] },
            slides: {},
            updatedAt: '',
        };
        const updated = { ...(current ?? empty), flipCards: { reviewed: newReviewed }, updatedAt: new Date().toISOString() };
        setState(updated);
        latestRef.current = updated;

        save({ flipCards: { reviewed: newReviewed } });
    }, [courseId, lessonId, save]);

    const markAccordionOpened = useCallback((persistKey: string) => {
        const current = latestRef.current;
        const opened = current?.accordions?.opened ?? [];
        if (opened.includes(persistKey)) return;

        const newOpened = [...opened, persistKey];

        const empty: LessonComponentState = {
            courseId, lessonId,
            flipCards: { reviewed: [] },
            accordions: { opened: [] },
            slides: {},
            updatedAt: '',
        };
        const updated = { ...(current ?? empty), accordions: { opened: newOpened }, updatedAt: new Date().toISOString() };
        setState(updated);
        latestRef.current = updated;

        save({ accordions: { opened: newOpened } });
    }, [courseId, lessonId, save]);

    const updateSlideState = useCallback((persistKey: string, current: number, visited: number[]) => {
        const prev = latestRef.current;
        const empty: LessonComponentState = {
            courseId, lessonId,
            flipCards: { reviewed: [] },
            accordions: { opened: [] },
            slides: {},
            updatedAt: '',
        };
        const updated = {
            ...(prev ?? empty),
            slides: { ...(prev?.slides ?? {}), [persistKey]: { current, visited } },
            updatedAt: new Date().toISOString(),
        };
        setState(updated);
        latestRef.current = updated;

        save({ slides: { [persistKey]: { current, visited } } });
    }, [courseId, lessonId, save]);

    // ── Generic Record-based component helpers ──

    type RecordFields = 'checkins' | 'scenarios' | 'bodyMaps' | 'groundingExercises'
        | 'copingRanker' | 'exposureHierarchy' | 'exposureLogs' | 'exposurePlans';

    /** Get the value for a Record-based component state field */
    const getComponentData = useCallback(<F extends RecordFields>(
        field: F,
        key: string,
    ): NonNullable<LessonComponentState[F]>[string] | undefined => {
        const current = latestRef.current;
        if (!current) return undefined;
        const record = current[field] as Record<string, unknown> | undefined;
        return record?.[key] as NonNullable<LessonComponentState[F]>[string] | undefined;
    }, []);

    /** Save a value for a Record-based component state field (optimistic + debounced server save) */
    const saveComponentData = useCallback(<F extends RecordFields>(
        field: F,
        key: string,
        value: NonNullable<LessonComponentState[F]>[string],
    ) => {
        const prev = latestRef.current;
        const empty: LessonComponentState = {
            courseId, lessonId,
            flipCards: { reviewed: [] },
            accordions: { opened: [] },
            slides: {},
            updatedAt: '',
        };
        const base = prev ?? empty;
        const existingRecord = (base[field] as Record<string, unknown> | undefined) ?? {};
        const updated = {
            ...base,
            [field]: { ...existingRecord, [key]: value },
            updatedAt: new Date().toISOString(),
        };
        setState(updated);
        latestRef.current = updated;

        save({ [field]: { [key]: value } } as ComponentStateSaveRequest);
    }, [courseId, lessonId, save]);

    return {
        state,
        loading,
        markFlipCardReviewed,
        markAccordionOpened,
        updateSlideState,
        getComponentData,
        saveComponentData,
    };
}
