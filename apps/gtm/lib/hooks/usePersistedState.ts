'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

let authFailed = false;

function syncToServer(componentType: string, persistKey: string, state: unknown) {
  fetch('/api/component-state', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ componentType, persistKey, state }),
  }).catch(() => {});
}

export function usePersistedState<T>(
  componentType: string,
  persistKey: string,
  defaultValue: T,
): [T, (value: T | ((prev: T) => T)) => void, { loaded: boolean }] {
  const localStorageKey = `${componentType}-${persistKey}`;
  const [value, setValueRaw] = useState<T>(defaultValue);
  const [loaded, setLoaded] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const valueRef = useRef<T>(defaultValue);
  const serverFetchedRef = useRef(false);

  // 1. Load from localStorage immediately
  useEffect(() => {
    try {
      const raw = localStorage.getItem(localStorageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as T;
        setValueRaw(parsed);
        valueRef.current = parsed;
      }
    } catch {}
    setLoaded(true);
  }, [localStorageKey]);

  // 2. Background-fetch from server (server wins if present)
  useEffect(() => {
    if (!loaded || serverFetchedRef.current || authFailed) return;
    serverFetchedRef.current = true;

    (async () => {
      try {
        const res = await fetch(
          `/api/component-state?type=${encodeURIComponent(componentType)}&key=${encodeURIComponent(persistKey)}`,
        );
        if (res.status === 401) {
          authFailed = true;
          return;
        }
        if (!res.ok) return;

        const json = await res.json();
        if (json.data?.state) {
          // Server has data - use it as authoritative source
          const serverState = json.data.state as T;
          setValueRaw(serverState);
          valueRef.current = serverState;
          try {
            localStorage.setItem(localStorageKey, JSON.stringify(serverState));
          } catch {}
        } else {
          // Server empty but localStorage has data - push to server
          const hasLocalData = JSON.stringify(valueRef.current) !== JSON.stringify(defaultValue);
          if (hasLocalData) {
            syncToServer(componentType, persistKey, valueRef.current);
          }
        }
      } catch {
        // Network error - stay on localStorage
      }
    })();
  }, [loaded, componentType, persistKey, localStorageKey, defaultValue]);

  // 3. Setter - writes to localStorage immediately, debounced to server
  const update = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValueRaw((prev) => {
        const next = typeof newValue === 'function' ? (newValue as (p: T) => T)(prev) : newValue;
        valueRef.current = next;

        try {
          localStorage.setItem(localStorageKey, JSON.stringify(next));
        } catch {}

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          if (!authFailed) {
            syncToServer(componentType, persistKey, next);
          }
        }, 500);

        return next;
      });
    },
    [localStorageKey, componentType, persistKey],
  );

  return [value, update, { loaded }];
}
