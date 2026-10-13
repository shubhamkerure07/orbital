import React, { useState } from 'react';
import { RocketData, RocketStage } from '../../types';
import { Badge } from '../common/Badge';
import { Gauge, Flame, Clock, Layers, ShieldCheck } from 'lucide-react';
import { formatNumber } from '../../utils/formatting';

interface RocketStageInspectorProps {
  rocket: RocketData;
}

export const RocketStageInspector: React.FC<RocketStageInspectorProps> = ({ rocket }) => {
  const [selectedStageIdx, setSelectedStageIdx] = useState<number>(0);
  const activeStage = rocket.stages[selectedStageIdx] || rocket.stages[0];

  return (
    <div className="rounded-2xl bg-space-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase font-mono text-gold-400 tracking-wider flex items-center gap-1.5 mb-1">
            <Layers className="w-4 h-4" /> Multistage Propulsion Anatomy
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-mono">
            {rocket.name} Stage Architecture
          </h3>
        </div>

        {/* Stage Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-space-950 rounded-xl border border-slate-800">
          {rocket.stages.map((stage, idx) => (
            <button
              key={stage.stageNumber}
              onClick={() => setSelectedStageIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedStageIdx === idx
                  ? 'bg-gold-500 text-space-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-space-850'
              }`}
            >
              Stage {stage.stageNumber}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
        
        {/* Visual Rocket Schematic (Interactive SVG) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-space-950 rounded-2xl border border-slate-800/80 relative">
          <div className="text-center mb-3">
            <span className="text-[11px] font-mono text-slate-500 uppercase">
              Vehicle Height: {rocket.heightMeters} m • Diameter: {rocket.diameterMeters} m
            </span>
          </div>

          <svg viewBox="0 0 160 480" className="w-36 sm:w-44 h-80 sm:h-96">
            <defs>
              <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D97706" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
            </defs>

            {/* Fairing / Nose Cone (Top) */}
            <path
              d="M 80 20 Q 60 70 55 100 L 105 100 Q 100 70 80 20 Z"
              fill={selectedStageIdx === 1 ? 'url(#activeGrad)' : 'url(#rocketGrad)'}
              stroke="#CBD5E1"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors"
              onClick={() => setSelectedStageIdx(Math.min(1, rocket.stages.length - 1))}
            />
            <text x="80" y="70" textAnchor="middle" fill="#0F172A" fontSize="9" fontWeight="bold">FAIRING</text>

            {/* Upper Stage (Stage 2) */}
            <rect
              x="55"
              y="105"
              width="50"
              height="80"
              rx="2"
              fill={selectedStageIdx === 1 ? 'url(#activeGrad)' : 'url(#rocketGrad)'}
              stroke="#94A3B8"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors"
              onClick={() => setSelectedStageIdx(Math.min(1, rocket.stages.length - 1))}
            />
            <text x="80" y="145" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">STAGE 2</text>

            {/* Interstage */}
            <rect x="57" y="188" width="46" height="12" fill="#1E293B" stroke="#64748B" strokeWidth="1" />

            {/* First Stage Booster (Stage 1) */}
            <rect
              x="55"
              y="203"
              width="50"
              height="200"
              rx="3"
              fill={selectedStageIdx === 0 ? 'url(#activeGrad)' : 'url(#rocketGrad)'}
              stroke="#CBD5E1"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors"
              onClick={() => setSelectedStageIdx(0)}
            />
            <text x="80" y="300" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="bold" fontFamily="monospace">STAGE 1</text>

            {/* Engine Nozzles at Bottom */}
            <path d="M 60 405 L 56 425 L 72 425 L 68 405 Z" fill="#334155" />
            <path d="M 74 405 L 70 427 L 90 427 L 86 405 Z" fill="#475569" />
            <path d="M 92 405 L 88 425 L 104 425 L 100 405 Z" fill="#334155" />

            {/* Exhaust plume when active */}
            {selectedStageIdx === 0 && (
              <polygon points="65,427 80,470 95,427" fill="#F59E0B" opacity="0.8" />
            )}
          </svg>

          <p className="text-[11px] font-mono text-slate-400 mt-3 text-center">
            Click on rocket segments to inspect stage telemetry
          </p>
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xl font-bold text-slate-100 font-mono flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gold-400" />
              {activeStage.name}
            </h4>
            <Badge variant={activeStage.reusable ? 'green' : 'neutral'} size="sm">
              {activeStage.reusable ? 'Reusable Booster' : 'Expendable Architecture'}
            </Badge>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {activeStage.purpose}
          </p>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-space-950 border border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> Propulsion Engines
              </span>
              <span className="text-slate-200 font-semibold block mt-1">
                {activeStage.engines}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-space-950 border border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-gold-400" /> Thrust Output
              </span>
              <span className="text-slate-200 font-semibold block mt-1">
                {formatNumber(activeStage.thrustKn)} kN ({((activeStage.thrustKn / 9.80665) / 1000).toFixed(0)} metric tons)
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-space-950 border border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-cyan-400" /> Propellant Mix
              </span>
              <span className="text-slate-200 font-semibold block mt-1">
                {activeStage.propellant}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-space-950 border border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-purple-400" /> Nominal Burn Time
              </span>
              <span className="text-slate-200 font-semibold block mt-1">
                {activeStage.burnTimeSeconds} seconds (~{(activeStage.burnTimeSeconds / 60).toFixed(1)} min)
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-space-950/70 border border-slate-800 text-xs font-mono text-slate-400">
            <span className="text-gold-400 font-semibold block mb-0.5">Tsiolkovsky Rocket Equation Context:</span>
            Δv = I_sp · g_0 · ln(m_initial / m_final). Each consecutive stage discards dead dry structure mass, multiplying the final burnout velocity necessary to achieve stable orbit.
          </div>
        </div>

      </div>
    </div>
  );
};
