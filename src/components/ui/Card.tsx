import React from 'react';
import { motion } from 'framer-motion';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'glass';

export interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-navy-700 border border-gold-400/10',
  elevated: 'bg-navy-700 shadow-lg border border-gold-400/10',
  outlined: 'bg-transparent border-2 border-gold-400/30',
  glass: 'bg-navy-700/60 backdrop-blur-luxury border border-gold-400/20',
};

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  hoverable = false,
  onClick,
}) => {
  const baseStyles = `
    rounded-2xl
    overflow-hidden
    transition-all duration-300
    ${onClick ? 'cursor-pointer' : ''}
  `;

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const hoverProps = hoverable
    ? {
        whileHover: { y: -4, boxShadow: '0 0 30px rgba(200, 169, 110, 0.25)' },
        transition: { duration: 0.3 },
      }
    : {};

  return (
    <motion.div
      className={combinedClassName}
      onClick={onClick}
      {...hoverProps}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-5 border-b border-gold-400/10 ${className}`}>
      {children}
    </div>
  );
};

export const CardBody: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return <div className={`px-6 py-5 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-t border-gold-400/10 bg-navy-800/50 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
