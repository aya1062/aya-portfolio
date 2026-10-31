import React from 'react';
import { cn } from '../../lib/utils';

interface AuroraGlowProps {
  className?: string;
  variant?: 'cyan' | 'blue' | 'emerald' | 'composite';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  intensity?: 'subtle' | 'medium' | 'vibrant';
  animated?: boolean;
}

export const AuroraGlow: React.FC<AuroraGlowProps> = ({
  className,
  variant = 'composite',
  size = 'lg',
  intensity = 'medium',
  animated = true,
}) => {
  const sizeClasses = {
    sm: 'w-[200px] h-[200px]',
    md: 'w-[400px] h-[400px]',
    lg: 'w-[650px] h-[650px]',
    xl: 'w-[900px] h-[900px]',
  };

  const intensityOpacity = {
    subtle: 'opacity-20',
    medium: 'opacity-40',
    vibrant: 'opacity-70',
  };

  if (variant === 'composite') {
    return (
      <div
        className={cn(
          'pointer-events-none absolute -z-10 overflow-visible select-none',
          animated && 'animate-glow-breathe',
          className
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            'absolute -top-1/4 -left-1/4 rounded-full bg-brand-cyan/20 blur-[100px]',
            sizeClasses[size],
            intensityOpacity[intensity]
          )}
        />
        <div
          className={cn(
            'absolute -bottom-1/4 -right-1/4 rounded-full bg-brand-blue/20 blur-[120px]',
            sizeClasses[size],
            intensityOpacity[intensity]
          )}
        />
        <div
          className={cn(
            'absolute top-1/3 left-1/3 rounded-full bg-brand-emerald/15 blur-[90px]',
            sizeClasses[size],
            intensityOpacity[intensity]
          )}
        />
      </div>
    );
  }

  const colorClasses = {
    cyan: 'bg-brand-cyan/25 blur-[100px]',
    blue: 'bg-brand-blue/25 blur-[110px]',
    emerald: 'bg-brand-emerald/20 blur-[90px]',
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute -z-10 rounded-full select-none',
        sizeClasses[size],
        colorClasses[variant],
        intensityOpacity[intensity],
        animated && 'animate-glow-breathe',
        className
      )}
    />
  );
};
