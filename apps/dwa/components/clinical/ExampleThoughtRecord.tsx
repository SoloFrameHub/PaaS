/**
 * Example therapeutic component using useClinicalStorage
 *
 * This demonstrates the hybrid storage pattern:
 * - If user has NO provider → saves to localStorage only (private)
 * - If user HAS provider → syncs to Postgres (provider can review)
 *
 * USAGE:
 * <ExampleThoughtRecord
 *   courseId="mood-emotional-health"
 *   lessonId="depression-action-1"
 * />
 */

'use client';

import { useState } from 'react';
import { useClinicalStorage } from '@/lib/hooks/useClinicalStorage';

interface ThoughtRecordData {
  situation: string;
  automaticThought: string;
  emotion: string;
  intensityBefore: number;
  evidence: string[];
  alternativeThought: string;
  intensityAfter: number;
}

interface ExampleThoughtRecordProps {
  courseId: string;
  lessonId: string;
  onComplete?: () => void;
}

export default function ExampleThoughtRecord({
  courseId,
  lessonId,
  onComplete,
}: ExampleThoughtRecordProps) {
  // Use the clinical storage hook
  const {
    data,
    isLoading,
    isSaving,
    hasProvider,
    error,
    save,
    clear,
  } = useClinicalStorage<ThoughtRecordData>({
    componentType: 'thought-record',
    componentId: `${courseId}-${lessonId}-1`,
    courseId,
    lessonId,
    autoSave: true, // auto-saves after 2 seconds of inactivity
  });

  const [formData, setFormData] = useState<Partial<ThoughtRecordData>>(
    data || {
      situation: '',
      automaticThought: '',
      emotion: '',
      intensityBefore: 5,
      evidence: [],
      alternativeThought: '',
      intensityAfter: 5,
    }
  );

  const handleChange = (field: keyof ThoughtRecordData, value: string | number | string[]) => {
    const updated = { ...formData, [field]: value } as ThoughtRecordData;
    setFormData(updated);
    save(updated);
  };

  const handleClear = async () => {
    await clear();
    setFormData({
      situation: '',
      automaticThought: '',
      emotion: '',
      intensityBefore: 5,
      evidence: [],
      alternativeThought: '',
      intensityAfter: 5,
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 rounded-lg bg-blue-50 dark:bg-blue-950/20">
        <p className="text-gray-600 dark:text-gray-400">Loading thought record...</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-500/20">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          Thought Record Exercise
        </h3>
        {isSaving && (
          <span className="text-xs text-blue-600 dark:text-blue-400">Saving...</span>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-500/30 rounded text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {hasProvider !== null && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400">
          {hasProvider
            ? '🔒 Your responses are saved securely and visible to your provider for clinical review.'
            : '🔐 Your responses are completely private and stored only on your device.'}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Situation: What happened?
          </label>
          <textarea
            value={formData.situation || ''}
            onChange={(e) => handleChange('situation', e.target.value)}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600"
            rows={2}
            placeholder="Describe the situation that triggered this thought..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Automatic Thought: What went through your mind?
          </label>
          <textarea
            value={formData.automaticThought || ''}
            onChange={(e) => handleChange('automaticThought', e.target.value)}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600"
            rows={2}
            placeholder="What did you think in the moment?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Emotion: How did you feel?
          </label>
          <input
            type="text"
            value={formData.emotion || ''}
            onChange={(e) => handleChange('emotion', e.target.value)}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600"
            placeholder="e.g., anxious, sad, angry"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Intensity Before (1-10): {formData.intensityBefore}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.intensityBefore || 5}
            onChange={(e) => handleChange('intensityBefore', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Alternative Thought: What's a more balanced perspective?
          </label>
          <textarea
            value={formData.alternativeThought || ''}
            onChange={(e) => handleChange('alternativeThought', e.target.value)}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600"
            rows={3}
            placeholder="Challenge the automatic thought with evidence and reason..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Intensity After (1-10): {formData.intensityAfter}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.intensityAfter || 5}
            onChange={(e) => handleChange('intensityAfter', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded text-sm font-medium"
          >
            Clear
          </button>
          {onComplete && (
            <button
              onClick={onComplete}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium"
            >
              Complete Exercise
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
