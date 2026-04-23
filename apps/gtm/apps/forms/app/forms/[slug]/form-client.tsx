'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { FormDefinition, FormFieldDefinition } from '@/lib/forms/types';
import FormField from '@/components/form-field';
import FormHoneypot from '@/components/form-honeypot';

interface FormClientProps {
  formDefinition: FormDefinition;
}

export default function FormClient({ formDefinition }: FormClientProps) {
  const router = useRouter();
  const { steps, title, description, settings } = formDefinition;

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [loadedAt] = useState(() => Date.now());

  // Capture UTM parameters on mount
  const [utm, setUtm] = useState<Record<string, string>>({});
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmData: Record<string, string> = {};
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'referrer']) {
      const val = params.get(key);
      if (val) utmData[key.replace('utm_', '')] = val;
    }
    if (document.referrer) utmData.referrer = document.referrer;
    setUtm(utmData);
  }, []);

  const handleFieldChange = useCallback((fieldId: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    setFieldErrors((prev) => {
      if (!prev[fieldId]) return prev;
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  }, []);

  // Check if a field should be visible (showIf logic)
  const isFieldVisible = useCallback(
    (field: FormFieldDefinition) => {
      if (!field.showIf) return true;
      const depValue = formData[field.showIf.fieldId];
      if (Array.isArray(field.showIf.value)) {
        return field.showIf.value.includes(depValue as string);
      }
      // For checkbox arrays, check inclusion
      if (Array.isArray(depValue)) {
        return depValue.includes(field.showIf.value);
      }
      return depValue === field.showIf.value;
    },
    [formData]
  );

  // Validate current step fields
  const validateStep = (): boolean => {
    const step = steps[currentStep];
    const errors: Record<string, string> = {};

    for (const field of step.fields) {
      if (!isFieldVisible(field)) continue;
      if (!field.required) continue;

      const val = formData[field.id];
      if (val === undefined || val === null || val === '') {
        errors[field.id] = `${field.label} is required`;
      } else if (Array.isArray(val) && val.length === 0 && field.type === 'multi-select') {
        errors[field.id] = `Please select at least one option`;
      }

      // URL validation
      if (field.type === 'url' && val && typeof val === 'string') {
        try {
          new URL(val);
        } catch {
          errors[field.id] = 'Please enter a valid URL';
        }
      }

      // Email validation
      if (field.type === 'email' && val && typeof val === 'string') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          errors[field.id] = 'Please enter a valid email address';
        }
      }

      // Min length
      if (field.validation?.minLength && typeof val === 'string' && val.length < field.validation.minLength) {
        errors[field.id] = `Must be at least ${field.validation.minLength} characters`;
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setGlobalError('');

    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formSlug: formDefinition.slug,
          data: formData,
          utm,
          _hp_email_confirm: honeypot,
          _form_loaded_at: loadedAt,
        }),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (result.error?.fieldErrors) {
          setFieldErrors(result.error.fieldErrors);
          // Go to first step that has an error
          for (let i = 0; i < steps.length; i++) {
            const stepFieldIds = steps[i].fields.map((f) => f.id);
            if (Object.keys(result.error.fieldErrors).some((k) => stepFieldIds.includes(k))) {
              setCurrentStep(i);
              break;
            }
          }
        }
        setGlobalError(result.error?.message || 'Submission failed. Please try again.');
        setLoading(false);
        return;
      }

      setSubmitted(true);

      if (result.redirectTo) {
        router.push(result.redirectTo);
      }
    } catch {
      setGlobalError('Network error. Please check your connection and try again.');
      setLoading(false);
    }
  };

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const totalSteps = steps.length;

  if (submitted) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Submitted!</h2>
          <p className="text-gray-600 dark:text-gray-400">{settings.successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              SoloFrameHub
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>

        {/* Progress bar */}
        {totalSteps > 1 && (
          <div className="flex gap-2 mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= currentStep ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        )}

        {/* Step title */}
        {totalSteps > 1 && (
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {step.title}
            </h2>
            {step.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{step.description}</p>
            )}
          </div>
        )}

        {/* Form fields */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isLastStep) handleSubmit();
            else handleNext();
          }}
        >
          <FormHoneypot value={honeypot} onChange={setHoneypot} />

          {step.fields.map((field) => {
            if (!isFieldVisible(field)) return null;
            return (
              <FormField
                key={field.id}
                field={field}
                value={formData[field.id]}
                onChange={handleFieldChange}
                error={fieldErrors[field.id]}
              />
            );
          })}

          {/* Global error */}
          {globalError && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {globalError}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {!isFirstStep ? (
              <button
                type="button"
                onClick={handleBack}
                className="btn border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white disabled:opacity-50"
            >
              {loading
                ? 'Submitting...'
                : isLastStep
                  ? 'Submit'
                  : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
