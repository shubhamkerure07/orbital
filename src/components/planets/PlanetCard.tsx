import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Orbit, Compass, Thermometer, Weight } from 'lucide-react';
import { PlanetData } from '../../types';
import { Badge } from '../common/Badge';
import { formatNumber } from '../../utils/formatting';

interface PlanetCardProps {
  planet: PlanetData;
}

export const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
  return (
    <div className="hud-card rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 border border-slate-800 bg-space-900/90">
      
      {/* HUD Corner Ticks */}
      <div className="hud-corner-tl" />
      <div className="hud-corner-br" />

      {/* Top ambient glow matching planet color */}
      <div 
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none transition-opacity group-hover:opacity-30"
        style={{ backgroundColor: planet.colorHex }}
      />

      <div>
        {/* Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <Badge variant="cyan" size="sm">
            #{planet.orderFromSun} From Sun
          </Badge>
          <Badge variant="neutral" size="sm">
            {planet.type}
          </Badge>
        </div>

        {/* Title & Tagline */}
        <div className="flex items-center gap-3 mb-2">
          <div 
            className="w-5 h-5 rounded-full flex-shrink-0 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            style={{ backgroundColor: planet.colorHex }}
          />
          <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors font-outfit uppercase tracking-tight">
            {planet.name}
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-5 leading-relaxed line-clamp-2 font-sans font-light">
          {planet.tagline}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-2.5 mb-6 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-space-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase">
              <Compass className="w-3 h-3 text-cyan-400" /> Diameter
            </span>
            <span className="text-white font-bold mt-1 block font-outfit">
              {formatNumber(planet.diameterKm)} km
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-space-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase">
              <Orbit className="w-3 h-3 text-cyan-400" /> Orbit Period
            </span>
            <span className="text-white font-bold mt-1 block font-outfit">
              {planet.orbitalPeriodDays.toFixed(1)} d
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-space-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase">
              <Thermometer className="w-3 h-3 text-amber-400" /> Mean Temp
            </span>
            <span className="text-white font-bold mt-1 block font-outfit">
              {planet.avgTempCelsius}°C
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-space-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase">
              <Weight className="w-3 h-3 text-emerald-400" /> Gravity
            </span>
            <span className="text-white font-bold mt-1 block font-outfit">
              {planet.surfaceGravityMs2} m/s²
            </span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <Link
        to={`/explore/${planet.id}`}
        className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-space-850 hover:bg-cyan-400 hover:text-space-950 text-slate-200 font-mono text-xs font-bold uppercase tracking-wider border border-slate-700/80 hover:border-cyan-400 transition-all group/btn hover:shadow-[0_0_15px_rgba(0,242,255,0.3)]"
      >
        <span>Examine Telemetry</span>
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};
