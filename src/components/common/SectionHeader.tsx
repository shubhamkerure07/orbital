import React from 'react';
import { Badge } from './Badge';

export interface SectionHeaderProps {
  badgeText?: string;
  badgeVariant?: 'cyan' | 'gold' | 'green' | 'red' | 'neutral' | 'purple';
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  badgeVariant = 'cyan',
  title,
  description,
  action,
  icon,
  className = ''
}) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 ${className}`}>
      <div className="space-y-1.5">
        {badgeText && (
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={badgeVariant}>{badgeText}</Badge>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit tracking-tight flex items-center gap-2.5">
          {icon && <span className="text-cyan-400">{icon}</span>}
          <span>{title}</span>
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-sans">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};
