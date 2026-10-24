import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, Compass, Orbit, Thermometer, Weight, Clock } from 'lucide-react';
import { PlanetData } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatNumber, formatTempCelsius } from '../../utils/formatting';

interface PlanetInfoSheetProps {
  planet: PlanetData | null;
  onClose: () => void;
}

export const PlanetInfoSheet: React.FC<PlanetInfoSheetProps> = ({ planet, onClose }) => {
  const navigate = useNavigate();

  if (!planet) return null;

  return (
    <div className="absolute right-4 bottom-4 md:top-20 md:bottom-auto w-[calc(100%-2rem)] sm:w-96 max-h-[75vh] md:max-h-[82vh] overflow-y-auto bg-space-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl p-5 z-30 animate-in fade-in slide-in-from-right-4 duration-200">
      <div className="hud-corner-tl" />
      <div className="hud-corner-br" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="cyan" size="sm">
              #{planet.orderFromSun} From Sun
            </Badge>
            <Badge variant="neutral" size="sm">
              {planet.type}
            </Badge>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight flex items-center gap-2">
            <span 
              className="w-3.5 h-3.5 rounded-full inline-block flex-shrink-0" 
              style={{ backgroundColor: planet.colorHex }} 
            />
            {planet.name}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 font-sans">{planet.tagline}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-space-800 text-slate-400 hover:text-white hover:bg-space-750 transition-colors"
          aria-label="Close planet overview"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scientific Overview */}
      <div className="py-3 text-xs sm:text-sm text-slate-300 leading-relaxed border-b border-slate-800/60 font-sans">
        {planet.overview}
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5 py-4 border-b border-slate-800/60 font-mono text-xs">
        <div className="p-2.5 rounded-lg bg-space-950/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase">
            <Compass className="w-3 h-3 text-cyan-400" /> Diameter
          </span>
          <span className="text-white font-semibold block mt-1">
            {formatNumber(planet.diameterKm)} km
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-space-950/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase">
            <Orbit className="w-3 h-3 text-cyan-400" /> Orbit Period
          </span>
          <span className="text-white font-semibold block mt-1">
            {planet.orbitalPeriodDays.toFixed(1)} days
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-space-950/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase">
            <Thermometer className="w-3 h-3 text-amber-400" /> Avg Temp
          </span>
          <span className="text-white font-semibold block mt-1">
            {formatTempCelsius(planet.avgTempCelsius)}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-space-950/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase">
            <Weight className="w-3 h-3 text-emerald-400" /> Gravity
          </span>
          <span className="text-white font-semibold block mt-1">
            {planet.surfaceGravityMs2} m/s² ({planet.gravityEarthRelative}g)
          </span>
        </div>
      </div>

      {/* Moons info if available */}
      {planet.moonsCount > 0 && (
        <div className="py-2.5 text-xs text-slate-400 font-mono border-b border-slate-800/60">
          <span className="text-slate-300 font-semibold">{planet.moonsCount} Moons</span>: {planet.notableMoons.join(', ')}
        </div>
      )}

      {/* Atmospheric composition */}
      {planet.atmosphereComposition.length > 0 && (
        <div className="py-2.5 text-xs font-mono space-y-1.5 border-b border-slate-800/60">
          <span className="text-slate-400 text-[10px] uppercase block">Atmosphere Signature</span>
          <div className="flex flex-wrap gap-1.5">
            {planet.atmosphereComposition.slice(0, 3).map((gas, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-space-950 border border-slate-800 text-[11px] text-slate-300">
                {gas.gas} {gas.percentage}%
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="pt-4 flex items-center gap-2">
        <button
          onClick={() => navigate(`/explore/${planet.id}`)}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-space-950 font-bold text-xs sm:text-sm transition-all shadow-md font-mono"
        >
          <span>Open Full Dossier</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={onClose}
          className="py-2 px-3 rounded-xl bg-space-800 hover:bg-space-750 text-slate-300 text-xs font-mono border border-slate-700 transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
