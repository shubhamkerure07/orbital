import React from 'react';
import { Link } from 'react-router-dom';
import { Orbit, ArrowLeft, Radio } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-stars-bg">
      <div className="w-16 h-16 rounded-2xl bg-space-900 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 shadow-xl shadow-gold-500/10">
        <Radio className="w-8 h-8 animate-pulse" />
      </div>

      <span className="font-mono text-xs uppercase tracking-widest text-gold-400 mb-2">
        Telemetry Signal Lost • 404
      </span>

      <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 font-mono tracking-tight mb-4">
        Deep Space Anomaly
      </h1>

      <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
        The requested coordinates or mission record do not exist in our astronomical catalog. The probe may have experienced signal degradation or an unplanned trajectory burn.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-space-950 font-bold font-mono text-xs transition-colors shadow-lg shadow-gold-500/20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Earth Base Station</span>
      </Link>
    </div>
  );
};
