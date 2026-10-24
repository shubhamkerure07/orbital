import React from 'react';
import { Calendar, Compass, CheckCircle2, Clock, Navigation, ArrowRight } from 'lucide-react';
import { MissionData } from '../../types';
import { Badge } from '../common/Badge';

interface MissionCardProps {
  mission: MissionData;
  onSelect: (mission: MissionData) => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, onSelect }) => {
  const getStatusBadge = (status: MissionData['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="green" size="sm"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active</Badge>;
      case 'completed':
        return <Badge variant="neutral" size="sm"><CheckCircle2 className="w-3 h-3 text-slate-400" /> Completed</Badge>;
      case 'planned':
        return <Badge variant="gold" size="sm"><Clock className="w-3 h-3 text-amber-400" /> Planned</Badge>;
      case 'en-route':
        return <Badge variant="cyan" size="sm"><Navigation className="w-3 h-3 text-cyan-400 animate-pulse" /> En Route</Badge>;
    }
  };

  return (
    <div 
      onClick={() => onSelect(mission)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(mission);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View mission details for ${mission.name}`}
      className="hud-card group rounded-2xl bg-space-900 border border-slate-800 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-cyan-500/5 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
    >
      <div className="hud-corner-tl" />
      <div className="hud-corner-br" />

      <div>
        {/* Thumbnail Image Header */}
        <div className="relative h-48 w-full overflow-hidden bg-space-950">
          <img 
            src={mission.imageUrl} 
            alt={mission.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-transparent to-transparent" />
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {getStatusBadge(mission.status)}
            <Badge variant="cyan" size="sm">{mission.category}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Launch: {mission.launchDate}</span>
            <span className="text-slate-600">•</span>
            <span>{mission.agency}</span>
          </div>

          <h3 className="text-lg font-bold text-white font-mono group-hover:text-cyan-300 transition-colors tracking-tight line-clamp-1 mb-2">
            {mission.name}
          </h3>

          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 mb-3">
            <Compass className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Destination: {mission.destination}</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4 font-sans">
            {mission.objectives[0]}
          </p>
        </div>
      </div>

      {/* Footer Info & Verification link */}
      <div className="px-5 py-3 bg-space-950/80 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="truncate max-w-[180px]">{mission.officialReference}</span>
        <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
