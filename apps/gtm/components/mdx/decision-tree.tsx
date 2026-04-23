'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocale } from 'next-intl';

// ─── Types ──────────────────────────────────────────────────

interface DecisionOption {
  label?: string;
  text?: string;
  nextId?: string;
  nextNodeId?: string;
}

interface DecisionOutcome {
  label: string;
  description: string;
  recommendation?: string;
  variant?: 'success' | 'warning' | 'info';
}

interface DecisionNode {
  id: string;
  text?: string;
  content?: string;
  type?: 'question' | 'outcome';
  isTerminal?: boolean;
  options?: DecisionOption[];
  choices?: DecisionOption[];
  outcome?: DecisionOutcome | string;
}

interface NormalizedNode {
  id: string;
  text: string;
  type: 'question' | 'outcome';
  options?: Array<{ label: string; nextId: string }>;
  outcome?: DecisionOutcome;
}

function normalizeNode(node: DecisionNode): NormalizedNode {
  const text = node.text || node.content || '';
  const isOutcome = node.type === 'outcome' || node.isTerminal === true;

  const rawOptions = node.options || node.choices || [];
  const options = rawOptions.map((opt) => ({
    label: opt.label || opt.text || '',
    nextId: opt.nextId || opt.nextNodeId || '',
  }));

  let outcome: DecisionOutcome | undefined;
  if (isOutcome) {
    if (typeof node.outcome === 'string') {
      outcome = {
        label: node.outcome.charAt(0).toUpperCase() + node.outcome.slice(1) + ' Outcome',
        description: text,
        variant: node.outcome === 'positive' ? 'success' : node.outcome === 'negative' ? 'warning' : 'info',
      };
    } else if (node.outcome && typeof node.outcome === 'object') {
      outcome = node.outcome;
    } else {
      outcome = { label: 'Outcome', description: text, variant: 'info' };
    }
  }

  return {
    id: node.id,
    text,
    type: isOutcome ? 'outcome' : 'question',
    options: isOutcome ? undefined : options,
    outcome,
  };
}

interface PathEntry {
  nodeId: string;
  choiceLabel: string;
}

interface DecisionTreeProps {
  title: string;
  description?: string;
  nodes: DecisionNode[];
  startNodeId?: string;
  persistKey?: string;
  showPathHistory?: boolean;
}

// ─── Variant Styles ─────────────────────────────────────────

const variantStyles = {
  success: {
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    icon: 'text-emerald-500',
    badge: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
  },
  warning: {
    border: 'border-amber-500/40',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    icon: 'text-amber-500',
    badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
  },
  info: {
    border: 'border-blue-500/40',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    icon: 'text-blue-500',
    badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
  },
} as const;

// ─── Component ──────────────────────────────────────────────

export default function DecisionTree({
  title,
  description,
  nodes: rawNodes,
  startNodeId,
  persistKey,
  showPathHistory = true,
}: DecisionTreeProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  // Normalize all nodes to handle AI-generated format
  const nodes = useMemo(() => rawNodes.map(normalizeNode), [rawNodes]);
  const firstNodeId = startNodeId || nodes[0]?.id || '';

  const [currentNodeId, setCurrentNodeId] = useState(firstNodeId);
  const [path, setPath] = useState<PathEntry[]>([]);
  const [exploredPaths, setExploredPaths] = useState<string[][]>([]);
  const [animating, setAnimating] = useState(false);

  // Load persisted state
  useEffect(() => {
    if (!persistKey) return;
    try {
      const saved = localStorage.getItem(`decision-tree-${persistKey}`);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.exploredPaths) setExploredPaths(data.exploredPaths);
      }
    } catch {}
  }, [persistKey]);

  // Persist explored paths
  useEffect(() => {
    if (!persistKey || exploredPaths.length === 0) return;
    try {
      localStorage.setItem(
        `decision-tree-${persistKey}`,
        JSON.stringify({ exploredPaths })
      );
    } catch {}
  }, [exploredPaths, persistKey]);

  const currentNode = nodes.find((n) => n.id === currentNodeId);

  const handleChoice = useCallback(
    (option: { label: string; nextId: string }) => {
      setAnimating(true);
      const newPath = [...path, { nodeId: currentNodeId, choiceLabel: option.label }];
      setPath(newPath);

      setTimeout(() => {
        setCurrentNodeId(option.nextId);
        setAnimating(false);

        // If the next node is an outcome, record the explored path
        const nextNode = nodes.find((n) => n.id === option.nextId);
        if (nextNode?.type === 'outcome') {
          setExploredPaths((prev) => {
            const sig = [...newPath.map((e) => e.nodeId), option.nextId].join('->');
            if (prev.some((p) => p.join('->') === sig)) return prev;
            return [...prev, [...newPath.map((e) => e.nodeId), option.nextId]];
          });
        }
      }, 250);
    },
    [currentNodeId, path, nodes]
  );

  const handleStartOver = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentNodeId(firstNodeId);
      setPath([]);
      setAnimating(false);
    }, 250);
  }, [firstNodeId]);

  const handleGoBack = useCallback(() => {
    if (path.length === 0) return;
    setAnimating(true);
    const prevEntry = path[path.length - 1];

    setTimeout(() => {
      setPath((prev) => prev.slice(0, -1));
      setCurrentNodeId(prevEntry.nodeId);
      setAnimating(false);
    }, 250);
  }, [path]);

  // Count unique outcome nodes explored
  const outcomeNodeIds = nodes.filter((n) => n.type === 'outcome').map((n) => n.id);
  const exploredOutcomes = new Set(
    exploredPaths.map((p) => p[p.length - 1]).filter((id) => outcomeNodeIds.includes(id))
  );

  if (!currentNode) return null;

  return (
    <div className="not-prose my-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-primary-50 dark:bg-primary-900/20 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-500/20 dark:bg-primary-500/30 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{title}</h4>
              {description && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{description}</p>
              )}
            </div>
          </div>
          {outcomeNodeIds.length > 0 && (
            <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40 px-2.5 py-1 rounded-full">
              {exploredOutcomes.size}/{outcomeNodeIds.length} {isEs ? 'caminos' : 'paths'}
            </span>
          )}
        </div>
      </div>

      {/* Breadcrumb trail */}
      {showPathHistory && path.length > 0 && (
        <div className="px-4 pt-3 pb-1 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-gray-400 dark:text-gray-600 mr-1">{isEs ? 'Camino:' : 'Path:'}</span>
          {path.map((entry, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded-md">
                {entry.choiceLabel}
              </span>
              {i < path.length - 1 && (
                <svg className="w-3 h-3 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Current node content */}
      <div
        className={`p-6 transition-all duration-300 ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
        role="region"
        aria-live="polite"
      >
        {currentNode.type === 'question' ? (
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-100 text-sm mb-4 leading-relaxed">
              {currentNode.text}
            </p>
            <div className="space-y-2">
              {currentNode.options?.map((option) => (
                <button
                  key={option.nextId}
                  onClick={() => handleChoice(option)}
                  disabled={animating}
                  className="w-full text-left p-3.5 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-400 dark:hover:border-primary-500/60 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 disabled:opacity-50"
                  aria-label={`Choose: ${option.label}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full border-2 border-primary-300 dark:border-primary-500/50 flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : currentNode.type === 'outcome' && currentNode.outcome ? (
          (() => {
            const variant = currentNode.outcome.variant || 'info';
            const styles = variantStyles[variant];
            return (
              <div className={`p-4 rounded-xl border ${styles.border} ${styles.bg}`}>
                <div className="flex items-start gap-3">
                  <div className={`shrink-0 mt-0.5 ${styles.icon}`}>
                    {variant === 'success' ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : variant === 'warning' ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-md mb-2 ${styles.badge}`}>
                      {currentNode.outcome.label}
                    </span>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {currentNode.outcome.description}
                    </p>
                    {currentNode.outcome.recommendation && (
                      <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">{isEs ? 'Recomendación' : 'Recommendation'}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {currentNode.outcome.recommendation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()
        ) : null}
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-between px-6 pb-5 border-t border-gray-100 dark:border-gray-700/50 pt-4">
        <button
          onClick={handleGoBack}
          disabled={path.length === 0 || animating}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label="Go back one step"
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isEs ? 'Probar otro camino' : 'Try Another Path'}
          </span>
        </button>

        {(path.length > 0 || currentNode.type === 'outcome') && (
          <button
            onClick={handleStartOver}
            disabled={animating}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-30 transition-colors"
            aria-label="Start over from the beginning"
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {isEs ? 'Empezar de nuevo' : 'Start Over'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
