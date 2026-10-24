import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, ArrowLeft, Home, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-stars-bg">
      <div className="hud-card p-8 rounded-2xl bg-space-900/90 border border-space-800 max-w-lg w-full relative overflow-hidden flex flex-col items-center">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="w-16 h-16 rounded-2xl bg-space-950 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-6 shadow-lg shadow-cyan-400/10">
          <Radio className="w-8 h-8 animate-pulse" />
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-2">
          Telemetry Signal Lost • 404
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight mb-3">
          Deep Space Anomaly
        </h1>

        <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 font-sans leading-relaxed">
          The requested coordinate matrix or mission record could not be resolved in our astronomical database. The probe may have experienced signal degradation or an unplanned trajectory burn.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-space-950 font-bold font-mono text-xs transition-colors shadow-lg shadow-cyan-400/20"
          >
            <Home className="w-4 h-4" />
            <span>Return to Mission Control</span>
          </Link>
          <Link
            to="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-space-950 hover:bg-space-850 text-slate-300 hover:text-white font-mono text-xs border border-space-800 transition-colors"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Open Solar System Orrery</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
