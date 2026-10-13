import React from 'react';
import { DestinationData } from '../../types';
import { Badge } from '../common/Badge';
import { Compass, Thermometer, Weight, ArrowRight } from 'lucide-react';

interface DestinationCardProps {
  destination: DestinationData;
  isSelected: boolean;
  onSelect: (dest: DestinationData) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  isSelected,
  onSelect
}) => {
  return (
    <div
      onClick={() => onSelect(destination)}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between group ${
        isSelected
          ? 'bg-space-850 border-gold-500 shadow-xl shadow-gold-500/10'
          : 'bg-space-900 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div>
        <div className="relative h-44 w-full overflow-hidden bg-space-950">
          <img
            src={destination.heroImageUrl}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-transparent to-transparent" />
          
          <div className="absolute top-3 left-3 flex gap-1.5">
            <Badge variant="cyan" size="sm">{destination.category}</Badge>
          </div>
        </div>

        <div className="p-5">
          <span className="text-[11px] font-mono text-slate-500 block mb-1">
            Orbiting: {destination.parentBodyOrStar}
          </span>
          <h3 className="text-xl font-bold text-slate-100 font-mono group-hover:text-gold-400 transition-colors mb-2">
            {destination.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {destination.overview}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-space-950 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase">
                <Weight className="w-3 h-3 text-emerald-400" /> Gravity
              </span>
              <span className="text-slate-200 font-semibold block mt-0.5 truncate">
                {destination.surfaceGravity}
              </span>
            </div>

            <div className="p-2 rounded-lg bg-space-950 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase">
                <Thermometer className="w-3 h-3 text-amber-400" /> Temp Range
              </span>
              <span className="text-slate-200 font-semibold block mt-0.5 truncate">
                {destination.surfaceTempRange}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 bg-space-950/70 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
        <span>{destination.activeMissions.length} Active / Planned Missions</span>
        <span className="text-gold-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
          Inspect &rarr;
        </span>
      </div>
    </div>
  );
};
