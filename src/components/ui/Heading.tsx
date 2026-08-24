import React from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingVariant = 'display' | 'serif' | 'sans';

export interface HeadingProps {
  level?: HeadingLevel;
  variant?: HeadingVariant;
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const variantStyles: Record<HeadingVariant, string> = {
  display: 'font-display',
  serif: 'font-serif',
  sans: 'font-sans',
};

const levelStyles: Record<HeadingLevel, string> = {
  1: 'text-fluid-6xl md:text-6xl',
  2: 'text-fluid-5xl md:text-5xl',
  3: 'text-fluid-4xl md:text-4xl',
  4: 'text-fluid-3xl md:text-3xl',
  5: 'text-fluid-2xl md:text-2xl',
  6: 'text-fluid-xl md:text-xl',
};

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  variant = 'serif',
  children,
  className = '',
  as,
}) => {
  const Component = as || (`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6');

  const baseStyles = `
    font-bold
    leading-tight
    tracking-tight
    text-ivory-200
  `;

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${levelStyles[level]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return <Component className={combinedClassName}>{children}</Component>;
};

export default Heading;
