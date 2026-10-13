import React from 'react';
import { X, ExternalLink, Calendar, Compass, ShieldCheck, CheckCircle2, Rocket, ArrowRight } from 'lucide-react';
import { MissionData } from '../../types';
import { Badge } from '../common/Badge';

interface MissionDetailModalProps {
  mission: MissionData | null;
  onClose: () => void;
}

export const MissionDetailModal: React.FC<MissionDetailModalProps> = ({ mission, onClose }) => {
  if (!mission) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-space-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-72 w-full flex-shrink-0 bg-space-950">
          <img 
            src={mission.imageUrl} 
            alt={mission.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-space-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-space-950/80 hover:bg-space-850 text-slate-300 hover:text-slate-100 border border-slate-700 transition-colors"
            aria-label="Close mission detail"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="cyan">{mission.category}</Badge>
              <Badge variant={mission.status === 'active' ? 'green' : 'neutral'}>
                {mission.status.toUpperCase()}
              </Badge>
              <span className="text-xs font-mono text-slate-400">Operator: {mission.operatorCountry}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
              {mission.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-300">
          
          {/* Key Quick Facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-space-950 border border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] block">Agency</span>
              <span className="text-slate-200 font-semibold">{mission.agency}</span>
            </div>
            <div className="p-3 rounded-xl bg-space-950 border border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] block">Destination</span>
              <span className="text-slate-200 font-semibold truncate">{mission.destination}</span>
            </div>
            <div className="p-3 rounded-xl bg-space-950 border border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] block">Launch Date</span>
              <span className="text-slate-200 font-semibold">{mission.launchDate}</span>
            </div>
            <div className="p-3 rounded-xl bg-space-950 border border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] block">Launcher</span>
              <span className="text-slate-200 font-semibold truncate">{mission.launchVehicle || 'Titan / Centaur'}</span>
            </div>
          </div>

          {/* Objectives */}
          <div>
            <h4 className="text-sm uppercase font-mono font-bold tracking-wider text-gold-400 mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4" /> Primary Mission Objectives
            </h4>
            <ul className="space-y-2">
              {mission.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 flex-shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Scientific Achievements */}
          <div>
            <h4 className="text-sm uppercase font-mono font-bold tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Verified Scientific Breakthroughs
            </h4>
            <div className="space-y-2.5">
              {mission.scientificAchievements.map((ach, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-space-950 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {ach}
                </div>
              ))}
            </div>
          </div>

          {/* Milestones Timeline */}
          {mission.milestones.length > 0 && (
            <div>
              <h4 className="text-sm uppercase font-mono font-bold tracking-wider text-slate-200 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-400" /> Mission Milestones
              </h4>
              <div className="space-y-3 border-l-2 border-slate-800 ml-2 pl-4">
                {mission.milestones.map((m, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-gold-400" />
                    <span className="text-xs font-mono text-gold-400 font-semibold">{m.date}</span>
                    <h5 className="text-sm font-semibold text-slate-200 mt-0.5">{m.title}</h5>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{m.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* External Citation */}
          <div className="p-4 rounded-xl bg-space-950 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <div>
              <span className="block text-slate-500 text-[10px]">VERIFIED SCIENTIFIC AUTHORITY</span>
              <span className="text-slate-300 font-semibold">{mission.officialReference}</span>
            </div>
            <a
              href={mission.officialSourceUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-space-800 hover:bg-space-750 text-gold-400 border border-gold-500/30 transition-colors"
            >
              <span>Official NASA/Agency Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-space-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-space-800 hover:bg-space-700 text-slate-200 font-mono text-xs transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
