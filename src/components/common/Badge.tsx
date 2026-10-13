import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'cyan' | 'green' | 'red' | 'neutral' | 'purple';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'sm',
  className = ''
}) => {
  const variantStyles = {
    gold: 'bg-gold-500/10 text-gold-400 border-gold-500/30',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    neutral: 'bg-slate-800 text-slate-300 border-slate-700',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
  }[variant];

  const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs sm:text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-full border ${variantStyles} ${sizeStyles} ${className}`}>
      {children}
    </span>
  );
};
