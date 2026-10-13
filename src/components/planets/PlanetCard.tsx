import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Orbit, Compass, Thermometer, Weight } from 'lucide-react';
import { PlanetData } from '../../types';
import { Badge } from '../common/Badge';
import { formatNumber, formatTempCelsius } from '../../utils/formatting';

interface PlanetCardProps {
  planet: PlanetData;
}

export const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
  return (
    <div className="rounded-2xl bg-space-900 border border-slate-800 hover:border-gold-500/40 transition-all duration-300 p-6 flex flex-col justify-between group relative overflow-hidden">
      
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
            className="w-5 h-5 rounded-full flex-shrink-0 border border-white/20 shadow-sm"
            style={{ backgroundColor: planet.colorHex }}
          />
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-gold-400 transition-colors font-mono tracking-tight">
            {planet.name}
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-5 leading-relaxed line-clamp-2">
          {planet.tagline}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-2.5 mb-6 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-space-950 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase">
              <Compass className="w-3 h-3 text-gold-400" /> Diameter
            </span>
            <span className="text-slate-200 font-semibold mt-1 block">
              {formatNumber(planet.diameterKm)} km
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-space-950 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase">
              <Orbit className="w-3 h-3 text-cyan-400" /> Orbit Period
            </span>
            <span className="text-slate-200 font-semibold mt-1 block">
              {planet.orbitalPeriodDays.toFixed(1)} d
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-space-950 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase">
              <Thermometer className="w-3 h-3 text-amber-400" /> Avg Temp
            </span>
            <span className="text-slate-200 font-semibold mt-1 block">
              {planet.avgTempCelsius}°C
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-space-950 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase">
              <Weight className="w-3 h-3 text-emerald-400" /> Gravity
            </span>
            <span className="text-slate-200 font-semibold mt-1 block">
              {planet.surfaceGravityMs2} m/s²
            </span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <Link
        to={`/explore/${planet.id}`}
        className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-space-800 hover:bg-gold-500 hover:text-space-950 text-slate-200 font-mono text-xs font-semibold border border-slate-700/80 hover:border-gold-500 transition-all group/btn"
      >
        <span>Explore Characteristics</span>
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};
