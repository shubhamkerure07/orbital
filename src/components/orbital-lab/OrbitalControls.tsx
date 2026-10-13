import React from 'react';
import { ORBITAL_PRESETS } from '../../utils/physics';
import { OrbitalPreset } from '../../types';
import { Play, Pause, RotateCcw, Sliders, Sparkles } from 'lucide-react';

interface OrbitalControlsProps {
  centralMass: number;
  onMassChange: (m: number) => void;
  radius: number;
  onRadiusChange: (r: number) => void;
  velocity: number;
  onVelocityChange: (v: number) => void;
  angleDeg: number;
  onAngleChange: (a: number) => void;
  simSpeed: number;
  onSpeedChange: (s: number) => void;
  isPaused: boolean;
  onTogglePause: () => void;
  onReset: () => void;
  onApplyPreset: (preset: OrbitalPreset) => void;
  activePresetId: string | null;
}

export const OrbitalControls: React.FC<OrbitalControlsProps> = ({
  centralMass,
  onMassChange,
  radius,
  onRadiusChange,
  velocity,
  onVelocityChange,
  angleDeg,
  onAngleChange,
  simSpeed,
  onSpeedChange,
  isPaused,
  onTogglePause,
  onReset,
  onApplyPreset,
  activePresetId
}) => {
  return (
    <div className="space-y-6">
      
      {/* Educational Presets */}
      <div>
        <label className="text-xs font-mono uppercase text-gold-400 font-semibold tracking-wider flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Physics Educational Scenarios
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ORBITAL_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => onApplyPreset(p)}
              className={`p-3 rounded-xl border text-left transition-all font-mono ${
                activePresetId === p.id
                  ? 'bg-gold-500/10 border-gold-500 text-gold-400 shadow-md'
                  : 'bg-space-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span className="text-xs font-bold block">{p.name}</span>
              <span className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{p.theoreticalTrajectory}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Sliders */}
      <div className="p-5 rounded-2xl bg-space-950 border border-slate-800/80 space-y-4">
        
        {/* Central Mass */}
        <div>
          <div className="flex justify-between text-xs font-mono mb-1.5">
            <span className="text-slate-400">Central Body Mass (M)</span>
            <span className="text-gold-400 font-semibold">{centralMass} × 10²⁴ kg</span>
          </div>
          <input
            type="range"
            min="20"
            max="250"
            step="5"
            value={centralMass}
            onChange={(e) => onMassChange(Number(e.target.value))}
            className="w-full accent-gold-500 bg-space-850 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        {/* Orbital Distance */}
        <div>
          <div className="flex justify-between text-xs font-mono mb-1.5">
            <span className="text-slate-400">Initial Radius (r₀)</span>
            <span className="text-cyan-400 font-semibold">{radius} units</span>
          </div>
          <input
            type="range"
            min="60"
            max="280"
            step="5"
            value={radius}
            onChange={(e) => onRadiusChange(Number(e.target.value))}
            className="w-full accent-cyan-500 bg-space-850 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        {/* Velocity */}
        <div>
          <div className="flex justify-between text-xs font-mono mb-1.5">
            <span className="text-slate-400">Orbital Speed (v₀)</span>
            <span className="text-emerald-400 font-semibold">{velocity.toFixed(1)} km/s</span>
          </div>
          <input
            type="range"
            min="5"
            max="55"
            step="0.5"
            value={velocity}
            onChange={(e) => onVelocityChange(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-space-850 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        {/* Velocity Angle */}
        <div>
          <div className="flex justify-between text-xs font-mono mb-1.5">
            <span className="text-slate-400">Velocity Vector Direction</span>
            <span className="text-purple-400 font-semibold">{angleDeg}° (90° = Tangential)</span>
          </div>
          <input
            type="range"
            min="30"
            max="150"
            step="2"
            value={angleDeg}
            onChange={(e) => onAngleChange(Number(e.target.value))}
            className="w-full accent-purple-500 bg-space-850 h-1.5 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Simulation Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={onTogglePause}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-md ${
            isPaused
              ? 'bg-amber-500 text-space-950 hover:bg-amber-400'
              : 'bg-gold-500 text-space-950 hover:bg-gold-400'
          }`}
        >
          {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
          <span>{isPaused ? 'Resume Integrator' : 'Pause'}</span>
        </button>

        <button
          onClick={onReset}
          className="p-2.5 rounded-xl bg-space-950 hover:bg-space-850 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
          title="Reset Satellite State"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Speed Buttons */}
        <div className="flex items-center bg-space-950 rounded-xl border border-slate-800 p-1 font-mono text-xs">
          {[0.5, 1, 2, 4].map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2.5 py-1 rounded-lg ${simSpeed === s ? 'bg-gold-500 text-space-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
