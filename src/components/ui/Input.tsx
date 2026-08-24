import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      id,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    const baseInputStyles = `
      w-full
      bg-navy-700
      border border-gold-400/20
      text-ivory-200
      rounded-lg
      px-4 py-3
      text-base
      placeholder:text-ivory-700
      transition-all duration-300
      focus:outline-none
      focus:border-gold-400
      focus:ring-2
      focus:ring-gold-400/20
      disabled:opacity-50
      disabled:cursor-not-allowed
      ${hasError ? 'border-error focus:border-error focus:ring-error/20' : ''}
      ${leftIcon ? 'pl-12' : ''}
      ${rightIcon ? 'pr-12' : ''}
    `;

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-ivory-700 mb-2 tracking-wide"
          >
            {label}
            {required && <span className="text-error ml-1" aria-label="required">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory-700 pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`${baseInputStyles} ${className}`}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory-700 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-error"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-2 text-sm text-ivory-700"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
