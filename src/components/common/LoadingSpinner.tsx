import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading celestial telemetry...',
  size = 'md'
}) => {
  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-10 h-10' : 'w-6 h-6';

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 gap-3 text-center">
      <Loader2 className={`${iconSize} text-gold-400 animate-spin`} />
      <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-wide">{message}</p>
    </div>
  );
};
