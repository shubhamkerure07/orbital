import React from 'react';
import { Compass } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-space-900/40 max-w-lg mx-auto">
      <div className="w-12 h-12 rounded-xl bg-space-800 border border-slate-700/60 flex items-center justify-center text-slate-400 mb-4">
        {icon || <Compass className="w-6 h-6 text-gold-400" />}
      </div>
      <h3 className="text-base font-semibold text-slate-200 mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-400 mb-6">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-xs font-mono font-medium rounded-lg bg-space-800 hover:bg-space-700 text-gold-400 border border-gold-500/30 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
