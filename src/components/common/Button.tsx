import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-mono font-medium rounded-xl transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-space-950 active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 tracking-wide',
    md: 'text-xs sm:text-sm px-4 py-2.5 gap-2 tracking-wider',
    lg: 'text-sm sm:text-base px-6 py-3.5 gap-2.5 tracking-wider font-semibold'
  }[size];

  const variantStyles = {
    primary: 'bg-cyan-400 hover:bg-cyan-300 text-space-950 font-bold shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:shadow-[0_0_25px_rgba(0,242,255,0.5)]',
    secondary: 'bg-space-900 hover:bg-space-850 text-slate-100 border border-slate-700/80 hover:border-cyan-400/50 shadow-md',
    outline: 'bg-transparent text-slate-300 border border-slate-700 hover:border-cyan-400/60 hover:text-cyan-400',
    ghost: 'bg-transparent text-slate-400 hover:text-slate-100 hover:bg-space-800/60',
    danger: 'bg-crimson-600 hover:bg-crimson-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
  }[variant];

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
      ) : leftIcon ? (
        <span className="flex-shrink-0">{leftIcon}</span>
      ) : null}

      <span>{children}</span>

      {!isLoading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
};
