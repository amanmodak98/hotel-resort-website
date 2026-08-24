import React from 'react';

export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
export type TextVariant = 'body' | 'muted' | 'accent' | 'error' | 'success';
export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

export interface TextProps {
  size?: TextSize;
  variant?: TextVariant;
  weight?: TextWeight;
  children: React.ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div' | 'label';
  italic?: boolean;
  uppercase?: boolean;
  tracking?: 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
}

const sizeStyles: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
};

const variantStyles: Record<TextVariant, string> = {
  body: 'text-ivory-200',
  muted: 'text-ivory-700',
  accent: 'text-gold-400',
  error: 'text-error',
  success: 'text-success',
};

const weightStyles: Record<TextWeight, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const trackingStyles = {
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
  wider: 'tracking-wider',
  widest: 'tracking-widest',
};

export const Text: React.FC<TextProps> = ({
  size = 'base',
  variant = 'body',
  weight = 'normal',
  children,
  className = '',
  as: Component = 'p',
  italic = false,
  uppercase = false,
  tracking = 'normal',
}) => {
  const baseStyles = `
    leading-relaxed
    ${italic ? 'italic' : ''}
    ${uppercase ? 'uppercase' : ''}
  `;

  const combinedClassName = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${weightStyles[weight]}
    ${trackingStyles[tracking]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return <Component className={combinedClassName}>{children}</Component>;
};

export default Text;
