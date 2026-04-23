'use client';

import { useLocale } from 'next-intl';
import type { FormFieldDefinition } from '@/lib/forms/types';

interface FormFieldProps {
  field: FormFieldDefinition;
  value: unknown;
  onChange: (fieldId: string, value: unknown) => void;
  error?: string;
}

export default function FormField({ field, value, onChange, error }: FormFieldProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const baseLabel = (
    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
      {field.label}
      {field.required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );

  const helpText = field.description && (
    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{field.description}</p>
  );

  const errorText = error && (
    <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
  );

  // Text / Email / URL
  if (field.type === 'text' || field.type === 'email' || field.type === 'url') {
    return (
      <div className="mb-4">
        {baseLabel}
        <input
          id={field.id}
          type={field.type}
          value={(value as string) || ''}
          onChange={(e) => onChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          className={`form-input w-full ${error ? 'border-red-400 dark:border-red-500' : ''}`}
          required={field.required}
          minLength={field.validation?.minLength}
          maxLength={field.validation?.maxLength}
        />
        {helpText}
        {errorText}
      </div>
    );
  }

  // Textarea
  if (field.type === 'textarea') {
    return (
      <div className="mb-4">
        {baseLabel}
        <textarea
          id={field.id}
          value={(value as string) || ''}
          onChange={(e) => onChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          className={`form-textarea w-full ${error ? 'border-red-400 dark:border-red-500' : ''}`}
          rows={4}
          required={field.required}
          minLength={field.validation?.minLength}
          maxLength={field.validation?.maxLength}
        />
        {helpText}
        {errorText}
      </div>
    );
  }

  // Select
  if (field.type === 'select') {
    return (
      <div className="mb-4">
        {baseLabel}
        <select
          id={field.id}
          value={(value as string) || ''}
          onChange={(e) => onChange(field.id, e.target.value)}
          className={`form-select w-full ${error ? 'border-red-400 dark:border-red-500' : ''}`}
          required={field.required}
        >
          <option value="">{isEs ? "Seleccionar..." : "Select..."}</option>
          {field.options?.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        {helpText}
        {errorText}
      </div>
    );
  }

  // Radio — Button Toggle
  if (field.type === 'radio') {
    const selected = value as string;
    return (
      <div className="mb-4">
        {baseLabel}
        <div className="space-y-2 mt-1">
          {field.options?.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(field.id, opt.id)}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                selected === opt.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <span className="font-medium">{opt.label}</span>
              {opt.description && (
                <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">{opt.description}</span>
              )}
            </button>
          ))}
        </div>
        {helpText}
        {errorText}
      </div>
    );
  }

  // Checkbox
  if (field.type === 'checkbox') {
    const checkedValues = (value as string[]) || [];
    return (
      <div className="mb-4">
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {field.label}
          </legend>
          {field.options?.map((opt) => (
            <label key={opt.id} className="flex items-start gap-2 py-1.5 cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox mt-0.5"
                checked={checkedValues.includes(opt.id)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...checkedValues, opt.id]
                    : checkedValues.filter((v) => v !== opt.id);
                  onChange(field.id, next);
                }}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{opt.label}</span>
            </label>
          ))}
        </fieldset>
        {helpText}
        {errorText}
      </div>
    );
  }

  // Multi-select — Button Toggle (multiple)
  if (field.type === 'multi-select') {
    const selectedValues = (value as string[]) || [];
    return (
      <div className="mb-4">
        {baseLabel}
        <div className="flex flex-wrap gap-2 mt-1">
          {field.options?.map((opt) => {
            const isSelected = selectedValues.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  const next = isSelected
                    ? selectedValues.filter((v) => v !== opt.id)
                    : [...selectedValues, opt.id];
                  onChange(field.id, next);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {helpText}
        {errorText}
      </div>
    );
  }

  // Hidden
  if (field.type === 'hidden') {
    return <input type="hidden" name={field.id} value={(value as string) || ''} />;
  }

  return null;
}
