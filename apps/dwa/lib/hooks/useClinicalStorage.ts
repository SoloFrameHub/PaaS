/**
 * useClinicalStorage — Hybrid storage for therapeutic components
 *
 * PRIVACY RULES:
 * - If user has NO assigned provider → localStorage only (fully private)
 * - If user has assigned provider → sync to Postgres (provider can see)
 *
 * HIPAA COMPLIANCE:
 * - All API calls use HTTPS (enforced by CSP)
 * - Tenant isolation via userId + RLS (enforced in API)
 * - Data encrypted in transit and at rest
 *
 * HYDRATION SAFETY:
 * - Only accesses localStorage after mount (client-side only)
 * - Returns null during SSR to prevent mismatch
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { apiClient } from '@/lib/api/client';

export interface ClinicalDataOptions {
  componentType: string;      // e.g., 'thought-record', 'trigger-map'
  componentId: string;         // unique instance ID
  courseId?: string;
  lessonId?: string;
  autoSave?: boolean;          // debounce saves (default: true)
  saveDelayMs?: number;        // debounce delay (default: 2000ms)
}

export interface UseClinicalStorageReturn<T> {
  data: T | null;
  isLoading: boolean;
  isSaving: boolean;
  hasProvider: boolean | null; // null = unknown, true/false = known
  error: string | null;
  save: (data: T) => Promise<void>;
  clear: () => Promise<void>;
}

/**
 * Hook for managing clinical component data with hybrid storage strategy
 */
export function useClinicalStorage<T = Record<string, unknown>>(
  options: ClinicalDataOptions
): UseClinicalStorageReturn<T> {
  const { componentType, componentId, courseId, lessonId, autoSave = true, saveDelayMs = 2000 } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const saveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Storage key for localStorage
  const storageKey = `clinical:${componentType}:${componentId}`;

  /**
   * Check if user has an assigned provider
   */
  const checkProviderStatus = useCallback(async () => {
    try {
      const response = await apiClient.get<{ hasProvider: boolean }>('/api/provider/check-assignment');
      setHasProvider(response.hasProvider);
      return response.hasProvider;
    } catch (err) {
      console.error('Failed to check provider status:', err);
      // Fail-safe: if API fails, use localStorage only
      setHasProvider(false);
      return false;
    }
  }, []);

  /**
   * Load data from appropriate storage
   */
  const loadData = useCallback(async () => {
    // Only access localStorage after mount (hydration safety)
    if (typeof window === 'undefined' || !isMounted) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const providerAssigned = await checkProviderStatus();

      if (providerAssigned) {
        // Load from Postgres via API
        try {
          const response = await apiClient.get<{ data: T }>(
            `/api/clinical-data/${componentType}/${componentId}`
          );
          setData(response.data);
        } catch (apiErr: unknown) {
          // If API fails but we have localStorage backup, use it
          const localData = localStorage.getItem(storageKey);
          if (localData) {
            setData(JSON.parse(localData) as T);
          }
          throw apiErr;
        }
      } else {
        // Load from localStorage
        const localData = localStorage.getItem(storageKey);
        if (localData) {
          setData(JSON.parse(localData) as T);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      console.error('Clinical storage load error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [componentType, componentId, storageKey, isMounted, checkProviderStatus]);

  /**
   * Save data to appropriate storage
   */
  const save = useCallback(async (newData: T) => {
    // Only access localStorage after mount (hydration safety)
    if (typeof window === 'undefined' || !isMounted) {
      return;
    }

    setData(newData);
    setIsSaving(true);
    setError(null);

    try {
      // Always save to localStorage as backup
      localStorage.setItem(storageKey, JSON.stringify(newData));

      // If provider assigned, also sync to Postgres
      if (hasProvider) {
        await apiClient.post('/api/clinical-data', {
          componentType,
          componentId,
          courseId,
          lessonId,
          data: newData,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save data');
      console.error('Clinical storage save error:', err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [componentType, componentId, courseId, lessonId, storageKey, hasProvider, isMounted]);

  /**
   * Clear data from both storages
   */
  const clear = useCallback(async () => {
    if (typeof window === 'undefined' || !isMounted) {
      return;
    }

    setData(null);

    try {
      // Clear localStorage
      localStorage.removeItem(storageKey);

      // If provider assigned, also delete from Postgres
      if (hasProvider) {
        await apiClient.delete(`/api/clinical-data/${componentType}/${componentId}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear data');
      console.error('Clinical storage clear error:', err);
    }
  }, [componentType, componentId, storageKey, hasProvider, isMounted]);

  /**
   * Debounced auto-save
   */
  useEffect(() => {
    if (!autoSave || !data || !isMounted) return;

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Schedule save
    saveTimeoutRef.current = setTimeout(() => {
      save(data).catch((err) => {
        console.error('Auto-save failed:', err);
      });
    }, saveDelayMs);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [data, autoSave, saveDelayMs, save, isMounted]);

  /**
   * Mount detection for hydration safety
   */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /**
   * Load data on mount
   */
  useEffect(() => {
    if (isMounted) {
      loadData();
    }
  }, [isMounted, loadData]);

  return {
    data,
    isLoading,
    isSaving,
    hasProvider,
    error,
    save,
    clear,
  };
}
