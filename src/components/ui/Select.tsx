import { SelectHTMLAttributes, forwardRef } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options?: { value: string | number; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      options = [],
      className = '',
      id,
      required,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    const baseSelectStyles = `
      w-full
      bg-navy-700
      border border-gold-400/20
      text-ivory-200
      rounded-lg
      px-4 py-3 pr-10
      text-base
      appearance-none
      cursor-pointer
      transition-all duration-300
      focus:outline-none
      focus:border-gold-400
      focus:ring-2
      focus:ring-gold-400/20
      disabled:opacity-50
      disabled:cursor-not-allowed
      ${hasError ? 'border-error focus:border-error focus:ring-error/20' : ''}
    `;

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-ivory-700 mb-2 tracking-wide"
          >
            {label}
            {required && <span className="text-error ml-1" aria-label="required">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`${baseSelectStyles} ${className}`}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
            }
            {...props}
          >
            {children ||
              options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>

          {/* Dropdown Arrow */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ivory-700">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {error && (
          <p
            id={`${selectId}-error`}
            className="mt-2 text-sm text-error"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={`${selectId}-helper`}
            className="mt-2 text-sm text-ivory-700"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
