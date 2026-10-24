import React from 'react';
import { Play, Pause, RotateCcw, Eye, EyeOff, ZoomIn, ZoomOut, Compass } from 'lucide-react';
import { PLANETS } from '../../data/planets';
import { PlanetData } from '../../types';

interface SolarSystemControlsProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
  isPaused: boolean;
  onTogglePause: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  onResetCamera: () => void;
  selectedPlanet: PlanetData | null;
  onSelectPlanet: (planet: PlanetData | null) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const SolarSystemControls: React.FC<SolarSystemControlsProps> = ({
  speed,
  onSpeedChange,
  isPaused,
  onTogglePause,
  showLabels,
  onToggleLabels,
  onResetCamera,
  selectedPlanet,
  onSelectPlanet,
  onZoomIn,
  onZoomOut,
}) => {
  return (
    <div 
      role="toolbar"
      aria-label="3D Solar System Controls"
      className="flex flex-wrap items-center gap-2 p-2.5 rounded-2xl bg-space-900/95 backdrop-blur-md border border-slate-700/80 shadow-2xl text-xs font-mono select-none"
    >
      
      {/* Play / Pause Button */}
      <button
        onClick={onTogglePause}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
          isPaused 
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30'
            : 'bg-space-850 text-slate-200 border-slate-700 hover:bg-space-800 hover:text-white'
        }`}
        title={isPaused ? 'Resume simulation' : 'Pause simulation'}
        aria-label={isPaused ? 'Resume simulation' : 'Pause simulation'}
      >
        {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
        <span>{isPaused ? 'Resume' : 'Pause'}</span>
      </button>

      {/* Speed Multiplier Segmented Control */}
      <div className="flex items-center gap-1 px-2 py-1 bg-space-950 rounded-xl border border-slate-800">
        <span className="text-slate-400 text-[10px] uppercase mr-1">Speed</span>
        {[0.5, 1, 3].map((val) => (
          <button
            key={val}
            onClick={() => onSpeedChange(val)}
            className={`px-2 py-0.5 rounded-lg text-xs transition-all ${
              speed === val 
                ? 'bg-cyan-400 text-space-950 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-white hover:bg-space-800'
            }`}
            aria-label={`${val}x speed`}
          >
            {val}×
          </button>
        ))}
      </div>

      {/* Toggle Labels */}
      <button
        onClick={onToggleLabels}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
          showLabels 
            ? 'bg-space-850 text-cyan-300 border-cyan-400/40' 
            : 'bg-space-950 text-slate-500 border-slate-800 hover:text-slate-300'
        }`}
        title="Toggle planet labels and orbit rings"
        aria-label="Toggle labels"
      >
        {showLabels ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5" />}
        <span className="hidden sm:inline">Labels</span>
      </button>

      {/* Target Focus Dropdown */}
      <div className="relative flex items-center">
        <select
          value={selectedPlanet?.id || ''}
          onChange={(e) => {
            const val = e.target.value;
            if (!val) {
              onSelectPlanet(null);
            } else {
              const found = PLANETS.find(p => p.id === val);
              if (found) onSelectPlanet(found);
            }
          }}
          className="px-3 py-1.5 rounded-xl bg-space-950 text-slate-200 border border-slate-700/80 outline-none hover:border-cyan-400/50 cursor-pointer text-xs font-mono"
          aria-label="Select celestial target"
        >
          <option value="">Target: Entire System</option>
          {PLANETS.map((p) => (
            <option key={p.id} value={p.id}>
              Focus: {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Zoom In / Zoom Out Controls */}
      <div className="flex items-center bg-space-950 rounded-xl border border-slate-800">
        <button
          onClick={onZoomIn}
          className="p-2 text-slate-400 hover:text-cyan-300 transition-colors"
          title="Zoom in (+)"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-4 bg-slate-800" />
        <button
          onClick={onZoomOut}
          className="p-2 text-slate-400 hover:text-cyan-300 transition-colors"
          title="Zoom out (-)"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Reset Camera Viewpoint */}
      <button
        onClick={onResetCamera}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-space-950 hover:bg-space-850 text-slate-300 hover:text-white border border-slate-800 transition-colors"
        title="Reset camera to orbital overview"
        aria-label="Reset camera"
      >
        <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
        <span className="hidden md:inline">Reset</span>
      </button>
    </div>
  );
};
