import { Suspense } from 'react';
import RAGSearchInterface from './rag-search-interface';

export const metadata = { title: 'Clinical Resources | Provider Portal' };

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Clinical Resources</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Search course content, assessments, and clinical references using AI-powered retrieval.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {EXAMPLE_QUERIES.map(q => (
          <ExampleChip key={q} query={q} />
        ))}
      </div>

      <Suspense fallback={null}>
        <RAGSearchInterface />
      </Suspense>
    </div>
  );
}

const EXAMPLE_QUERIES = [
  'What does the platform cover for panic disorder?',
  'How to interpret a PHQ-9 score of 14?',
  'DBT distress tolerance skills available in the course',
  'Exposure hierarchy for social anxiety',
  'Sleep hygiene modules',
  'Crisis intervention steps for patients',
];

function ExampleChip({ query }: { query: string }) {
  return (
    <button
      data-query={query}
      className="example-query-chip text-left rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-xs text-gray-600 dark:text-gray-400 hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
    >
      {query}
    </button>
  );
}
