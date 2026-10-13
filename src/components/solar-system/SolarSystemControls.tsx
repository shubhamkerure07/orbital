import React from 'react';
import { Play, Pause, RotateCcw, Tag, Eye, EyeOff, ZoomIn, ZoomOut } from 'lucide-react';
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
    <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-2xl bg-space-900/90 backdrop-blur-md border border-slate-700/80 shadow-2xl text-xs font-mono">
      
      {/* Play / Pause */}
      <button
        onClick={onTogglePause}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
          isPaused 
            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30'
            : 'bg-space-800 text-slate-200 border-slate-700 hover:bg-space-750'
        }`}
        title={isPaused ? 'Resume simulation' : 'Pause simulation'}
      >
        {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
        <span>{isPaused ? 'Resume' : 'Pause'}</span>
      </button>

      {/* Speed Multiplier */}
      <div className="flex items-center gap-2 px-2.5 py-1 bg-space-950 rounded-lg border border-slate-800">
        <span className="text-slate-400 text-[11px]">Speed:</span>
        <button
          onClick={() => onSpeedChange(0.5)}
          className={`px-1.5 py-0.5 rounded ${speed === 0.5 ? 'bg-gold-500 text-space-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          0.5×
        </button>
        <button
          onClick={() => onSpeedChange(1)}
          className={`px-1.5 py-0.5 rounded ${speed === 1 ? 'bg-gold-500 text-space-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          1×
        </button>
        <button
          onClick={() => onSpeedChange(3)}
          className={`px-1.5 py-0.5 rounded ${speed === 3 ? 'bg-gold-500 text-space-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          3×
        </button>
      </div>

      {/* Toggle Labels */}
      <button
        onClick={onToggleLabels}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-colors ${
          showLabels 
            ? 'bg-space-800 text-gold-400 border-gold-500/30' 
            : 'bg-space-950 text-slate-500 border-slate-800 hover:text-slate-300'
        }`}
        title="Toggle planet labels"
      >
        {showLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        <span className="hidden sm:inline">Labels</span>
      </button>

      {/* Target Focus Dropdown */}
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
        className="px-2.5 py-1.5 rounded-lg bg-space-950 text-slate-200 border border-slate-700 outline-none hover:border-gold-500/50 cursor-pointer text-xs"
        aria-label="Select celestial target"
      >
        <option value="">Overview: Entire System</option>
        {PLANETS.map((p) => (
          <option key={p.id} value={p.id}>
            Focus: {p.name}
          </option>
        ))}
      </select>

      {/* Zoom In / Zoom Out */}
      <div className="flex items-center bg-space-950 rounded-lg border border-slate-800">
        <button
          onClick={onZoomIn}
          className="p-1.5 text-slate-400 hover:text-slate-200"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-3.5 bg-slate-800" />
        <button
          onClick={onZoomOut}
          className="p-1.5 text-slate-400 hover:text-slate-200"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Reset Camera */}
      <button
        onClick={onResetCamera}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-space-950 hover:bg-space-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
        title="Reset camera viewpoint"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span className="hidden md:inline">Reset</span>
      </button>
    </div>
  );
};
