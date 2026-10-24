import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'interactive';
  hasCorners?: boolean;
  accentBorder?: 'default' | 'cyan' | 'amber' | 'emerald' | 'crimson';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hasCorners = true,
  accentBorder = 'default',
  children,
  className = '',
  ...props
}) => {
  const borderStyles = {
    default: 'border-slate-800/80 hover:border-slate-700',
    cyan: 'border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_15px_rgba(0,242,255,0.06)]',
    amber: 'border-amber-500/30 hover:border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.06)]',
    emerald: 'border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.06)]',
    crimson: 'border-crimson-500/30 hover:border-crimson-400/60 shadow-[0_0_15px_rgba(239,68,68,0.06)]'
  }[accentBorder];

  const variantStyles = {
    default: 'bg-space-900/90 backdrop-blur-sm',
    elevated: 'bg-space-850 shadow-xl border',
    glass: 'bg-space-950/80 backdrop-blur-md',
    interactive: 'bg-space-900/90 hover:bg-space-850 hover:shadow-2xl cursor-pointer transition-all duration-300'
  }[variant];

  return (
    <div
      className={`relative rounded-2xl border ${borderStyles} ${variantStyles} p-5 sm:p-6 overflow-hidden ${className}`}
      {...props}
    >
      {hasCorners && (
        <>
          <div className="hud-corner-tl" />
          <div className="hud-corner-br" />
        </>
      )}
      {children}
    </div>
  );
};
