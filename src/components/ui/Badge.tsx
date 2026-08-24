import React from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
  pill?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-gold-400/20 text-gold-300 border-gold-400/30',
  secondary: 'bg-navy-700 text-ivory-200 border-gold-400/20',
  success: 'bg-success/20 text-success-light border-success/30',
  warning: 'bg-warning/20 text-warning-light border-warning/30',
  error: 'bg-error/20 text-error-light border-error/30',
  info: 'bg-info/20 text-info-light border-info/30',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  pill = false,
}) => {
  const baseStyles = `
    inline-flex
    items-center
    justify-center
    font-medium
    tracking-wide
    uppercase
    border
    transition-all
    duration-300
    ${pill ? 'rounded-full' : 'rounded-md'}
  `;

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return <span className={combinedClassName}>{children}</span>;
};

export default Badge;
