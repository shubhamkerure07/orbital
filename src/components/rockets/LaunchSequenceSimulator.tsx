import React, { useState, useEffect } from 'react';
import { RocketData } from '../../types';
import { Play, Pause, RotateCcw, SkipForward, SkipBack, Compass, Gauge, Wind, AlertCircle } from 'lucide-react';
import { Badge } from '../common/Badge';
import { formatNumber } from '../../utils/formatting';

interface LaunchSequenceSimulatorProps {
  rocket: RocketData;
}

export const LaunchSequenceSimulator: React.FC<LaunchSequenceSimulatorProps> = ({ rocket }) => {
  const steps = rocket.launchSequence;
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeStep = steps[currentStepIdx] || steps[0];

  useEffect(() => {
    // Reset when rocket changes
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [rocket.id]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const progressPercent = ((currentStepIdx) / Math.max(1, steps.length - 1)) * 100;
  const machNumber = (activeStep.velocityKmh / 1234.8).toFixed(1);

  return (
    <div className="hud-card rounded-2xl bg-space-900 border border-slate-800 p-6 sm:p-8 shadow-xl relative">
      <div className="hud-corner-tl" />
      <div className="hud-corner-br" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase font-mono text-cyan-400 tracking-wider flex items-center gap-1.5 mb-1">
            <Compass className="w-4 h-4" /> Flight Profile Simulator
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-outfit">
            {rocket.name} Launch Sequence
          </h3>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}
            disabled={currentStepIdx === 0}
            className="p-2.5 rounded-xl bg-space-950 text-slate-400 hover:text-white disabled:opacity-30 border border-slate-800 transition-colors"
            title="Previous step"
            aria-label="Previous step"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-md ${
              isPlaying
                ? 'bg-amber-500 text-space-950 hover:bg-amber-400'
                : 'bg-cyan-400 text-space-950 hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,242,255,0.3)]'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Start Simulation'}</span>
          </button>

          <button
            onClick={() => setCurrentStepIdx(Math.min(steps.length - 1, currentStepIdx + 1))}
            disabled={currentStepIdx === steps.length - 1}
            className="p-2.5 rounded-xl bg-space-950 text-slate-400 hover:text-white disabled:opacity-30 border border-slate-800 transition-colors"
            title="Next step"
            aria-label="Next step"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx(0);
            }}
            className="p-2.5 rounded-xl bg-space-950 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Reset flight profile"
            aria-label="Reset flight profile"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-time Telemetry Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-6 border-b border-slate-800 font-mono">
        <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase block">Mission Clock</span>
          <span className="text-xl sm:text-2xl font-bold text-cyan-400 mt-1 block font-outfit">
            {activeStep.timeOffset}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-cyan-400" /> Altitude
          </span>
          <span className="text-xl sm:text-2xl font-bold text-white mt-1 block font-outfit">
            {activeStep.altitudeKm.toFixed(1)} <span className="text-xs text-slate-400 font-mono">km</span>
          </span>
        </div>

        <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-emerald-400" /> Velocity
          </span>
          <span className="text-xl sm:text-2xl font-bold text-white mt-1 block font-outfit">
            {formatNumber(activeStep.velocityKmh)} <span className="text-xs text-slate-400 font-mono">km/h</span>
          </span>
        </div>

        <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
            <Wind className="w-3.5 h-3.5 text-purple-400" /> Mach Number
          </span>
          <span className="text-xl sm:text-2xl font-bold text-white mt-1 block font-outfit">
            Mach {machNumber}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="py-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>Phase: {activeStep.phase.toUpperCase()}</span>
          <span>Step {currentStepIdx + 1} of {steps.length}</span>
        </div>
        <div className="w-full h-2 bg-space-950 rounded-full overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Current Event Card */}
      <div className="p-5 rounded-xl bg-space-950/80 border border-cyan-500/30 my-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="cyan" size="sm">{activeStep.timeOffset}</Badge>
          <h4 className="text-lg font-bold text-white font-mono">
            {activeStep.title}
          </h4>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          {activeStep.description}
        </p>
      </div>

      {/* Interactive Step Clickers */}
      <div className="flex flex-wrap gap-2 pt-2">
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx(idx);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
              currentStepIdx === idx
                ? 'bg-cyan-400 text-space-950 font-bold border-cyan-300 shadow-md'
                : 'bg-space-950 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
            }`}
          >
            {s.timeOffset} • {s.title}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs font-mono text-slate-500">
        <AlertCircle className="w-4 h-4 text-slate-600 flex-shrink-0" />
        <span>Educational profile visualization synthesized from official flight logs. Does not predict active aerodynamic dispersions.</span>
      </div>
    </div>
  );
};
