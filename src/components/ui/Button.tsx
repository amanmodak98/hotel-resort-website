import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  href?: string;
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gold-400 text-navy-900 hover:bg-gold-300 active:bg-gold-500 shadow-sm hover:shadow-gold-sm',
  secondary: 'bg-navy-700 text-ivory-200 hover:bg-navy-600 active:bg-navy-800 border border-gold-400/20',
  outline: 'bg-transparent text-gold-400 border-2 border-gold-400 hover:bg-gold-400/10 active:bg-gold-400/20',
  ghost: 'bg-transparent text-ivory-200 hover:bg-navy-700 active:bg-navy-600',
  link: 'bg-transparent text-gold-400 hover:text-gold-300 underline-offset-4 hover:underline',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
};

const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';
const loadingStyles = 'opacity-70 cursor-wait';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      className = '',
      disabled = false,
      loading = false,
      fullWidth = false,
      href,
      to,
      onClick,
      type = 'button',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-semibold tracking-wide uppercase
      rounded-lg
      transition-all duration-300 ease-out
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900
      ${fullWidth ? 'w-full' : ''}
    `;

    const combinedClassName = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${disabled ? disabledStyles : ''}
      ${loading ? loadingStyles : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </>
    );

    // External link
    if (href) {
      return (
        <motion.a
          href={href}
          className={combinedClassName}
          aria-label={ariaLabel}
          aria-disabled={disabled || loading}
          whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
          whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
          {...props}
        >
          {content}
        </motion.a>
      );
    }

    // Internal link
    if (to) {
      return (
        <motion.div
          whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
          whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        >
          <Link
            to={to}
            className={combinedClassName}
            aria-label={ariaLabel}
            aria-disabled={disabled || loading}
            onClick={(e) => {
              if (disabled || loading) {
                e.preventDefault();
              }
            }}
            {...props}
          >
            {content}
          </Link>
        </motion.div>
      );
    }

    // Button
    return (
      <motion.button
        ref={ref}
        type={type}
        className={combinedClassName}
        disabled={disabled || loading}
        onClick={onClick}
        aria-label={ariaLabel}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
