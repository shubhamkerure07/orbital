import React from 'react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  icon?: React.ReactNode;
  accentColor?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  subtext,
  icon,
  accentColor = 'border-slate-800/80',
  className = ''
}) => {
  return (
    <div className={`p-4 rounded-xl bg-space-900/90 border ${accentColor} hover:border-cyan-400/40 transition-all duration-300 relative overflow-hidden group shadow-md ${className}`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono font-medium">{label}</span>
        {icon && <div className="text-slate-400 group-hover:text-cyan-400 transition-colors flex-shrink-0">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight">{value}</span>
        {unit && <span className="text-xs text-slate-400 font-mono">{unit}</span>}
      </div>
      {subtext && (
        <p className="mt-1.5 text-xs text-slate-400 font-sans line-clamp-1">{subtext}</p>
      )}
    </div>
  );
};
