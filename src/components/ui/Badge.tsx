import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'cyan' | 'blue' | 'emerald' | 'neutral';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'cyan',
  dot = false,
  ...props
}) => {
  const variantStyles = {
    cyan: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/30',
    blue: 'bg-brand-blue/10 text-brand-blue border-brand-blue/30',
    emerald: 'bg-brand-emerald/10 text-brand-emerald border-brand-emerald/30',
    neutral: 'bg-brand-surface text-brand-muted border-brand-border',
  };

  const dotColors = {
    cyan: 'bg-brand-cyan animate-pulse',
    blue: 'bg-brand-blue animate-pulse',
    emerald: 'bg-brand-emerald animate-pulse',
    neutral: 'bg-brand-muted',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono font-medium tracking-wider uppercase backdrop-blur-sm',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor]', dotColors[variant])}
        />
      )}
      <span>{children}</span>
    </div>
  );
};
