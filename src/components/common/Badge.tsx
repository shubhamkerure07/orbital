import React from 'react';

interface BadgeProps {
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
    cyan: 'bg-[#00f2ff]/10 text-[#00f2ff] border-[#00f2ff]/30 shadow-[0_0_8px_rgba(0,242,255,0.15)]',
    gold: 'bg-[#f7cc7f]/10 text-[#f7cc7f] border-[#f7cc7f]/30',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    red: 'bg-[#fc3d21]/10 text-[#fc3d21] border-[#fc3d21]/30',
    neutral: 'bg-white/5 text-slate-300 border-white/10',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
  }[variant];

  const sizeStyles = size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs sm:text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-full border ${variantStyles} ${sizeStyles} ${className}`}>
      {children}
    </span>
  );
};
