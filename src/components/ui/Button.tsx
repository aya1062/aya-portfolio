import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'emerald';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isGlowing?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      isGlowing = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'px-3.5 py-1.5 text-xs font-medium tracking-wide',
      md: 'px-5 py-2.5 text-sm font-medium tracking-wide',
      lg: 'px-7 py-3.5 text-base font-semibold tracking-wide',
    };

    const variantClasses = {
      primary:
        'relative bg-gradient-to-r from-brand-cyan to-brand-blue text-[#070D12] font-semibold hover:opacity-95 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_30px_rgba(34,211,238,0.45)] border-0',
      secondary:
        'bg-brand-surface-elevated text-brand-text border border-brand-border hover:border-brand-cyan/40 hover:bg-[#1C2C36] shadow-sm',
      outline:
        'bg-transparent text-brand-cyan border border-brand-cyan/50 hover:bg-brand-cyan/10 hover:border-brand-cyan shadow-[0_0_15px_rgba(34,211,238,0.1)]',
      ghost:
        'bg-transparent text-brand-muted hover:text-brand-text hover:bg-brand-surface/60 border-transparent',
      emerald:
        'bg-brand-emerald text-[#070D12] font-semibold hover:bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] border-0',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'group relative inline-flex items-center justify-center gap-2.5 rounded-full transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none',
          sizeClasses[size],
          variantClasses[variant],
          isGlowing &&
            'before:absolute before:-inset-0.5 before:rounded-full before:bg-gradient-to-r before:from-brand-cyan before:to-brand-emerald before:opacity-30 before:blur-md before:transition-all before:duration-300 group-hover:before:opacity-60',
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {icon && iconPosition === 'left' && (
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5">
              {icon}
            </span>
          )}
          <span>{children}</span>
          {icon && iconPosition === 'right' && (
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
              {icon}
            </span>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
