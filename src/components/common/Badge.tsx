import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'cyan' | 'green' | 'red' | 'neutral' | 'purple';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'sm',
  className = ''
}) => {
  const variantStyles = {
    cyan: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/30 shadow-[0_0_8px_rgba(0,242,255,0.1)]',
    gold: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
    green: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',
    red: 'bg-crimson-500/10 text-crimson-400 border-crimson-500/30',
    neutral: 'bg-slate-800/80 text-slate-300 border-slate-700/80',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/30'
  }[variant];

  const sizeStyles = size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs sm:text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-full border ${variantStyles} ${sizeStyles} ${className}`}>
      {children}
    </span>
  );
};
