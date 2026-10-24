import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { DestinationData } from '../types';
import { DestinationCard } from '../components/destinations/DestinationCard';
import { Badge } from '../components/common/Badge';
import { Compass, Thermometer, Weight, Radio, HelpCircle, ShieldCheck, ExternalLink, Globe } from 'lucide-react';
import { GlossaryTooltip } from '../components/common/GlossaryTooltip';

export const DestinationsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDestId, setSelectedDestId] = useState<string>('moon');

  useEffect(() => {
    const idParam = searchParams.get('id');
    if (idParam && DESTINATIONS.some(d => d.id === idParam)) {
      setSelectedDestId(idParam);
    }
  }, [searchParams]);

  const activeDestination = DESTINATIONS.find(d => d.id === selectedDestId) || DESTINATIONS[0];

  const handleSelect = (dest: DestinationData) => {
    setSelectedDestId(dest.id);
    setSearchParams({ id: dest.id });
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="cyan">Astrobiology & Planetary Geology</Badge>
          <Badge variant="neutral">Prime Exploration Targets</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight flex items-center gap-3">
          <Compass className="w-8 h-8 text-cyan-400" />
          Planetary Destinations & Moons
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-3xl font-sans leading-relaxed">
          Deep-dive monographs on prime celestial exploration targets: from lunar permanently shadowed polar craters and Martian ancient river deltas to subsurface ocean worlds (Europa, Enceladus) and methane lakes on Titan.
        </p>
      </div>

      {/* Destination Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {DESTINATIONS.map((dest) => (
          <DestinationCard
            key={dest.id}
            destination={dest}
            isSelected={dest.id === activeDestination.id}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Selected Destination In-Depth Profile */}
      <div className="hud-card rounded-3xl bg-space-900 border border-slate-800 overflow-hidden shadow-2xl relative">
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        {/* Banner with Hero Image */}
        <div className="relative h-72 sm:h-96 w-full bg-space-950">
          <img
            src={activeDestination.heroImageUrl}
            alt={activeDestination.name}
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-space-900/40 to-transparent" />

          <div className="absolute bottom-6 left-6 sm:left-10 right-6 sm:right-10">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="cyan">{activeDestination.category}</Badge>
              <Badge variant="neutral">Parent Body: {activeDestination.parentBodyOrStar}</Badge>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-outfit tracking-tight">
              {activeDestination.name}
            </h2>
          </div>
        </div>

        {/* Detailed Body Information */}
        <div className="p-6 sm:p-10 space-y-10">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] block">Distance From Earth</span>
              <span className="text-white font-bold text-sm sm:text-base mt-1 block font-outfit">
                {activeDestination.distanceFromEarth}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] flex items-center gap-1">
                <Weight className="w-3.5 h-3.5 text-emerald-400" /> Surface Gravity
              </span>
              <span className="text-white font-bold text-sm sm:text-base mt-1 block font-outfit">
                {activeDestination.surfaceGravity}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" /> Temperature
              </span>
              <span className="text-white font-bold text-sm sm:text-base mt-1 block font-outfit">
                {activeDestination.surfaceTempRange}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] block">Atmospheric Pressure</span>
              <span className="text-cyan-300 font-bold text-sm sm:text-base mt-1 block truncate font-outfit">
                {activeDestination.atmosphericPressure}
              </span>
            </div>
          </div>

          {/* Overview Narrative */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-outfit flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              Planetary Characteristics & Geology
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {activeDestination.overview}
            </p>
          </div>

          {/* Key Exploration Questions */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-outfit flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              Primary Scientific Enquiries & Research Frontiers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeDestination.openQuestions.map((question: string, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-space-950 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>{question}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Missions */}
          {activeDestination.activeMissions.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <h3 className="text-lg font-bold text-white font-outfit flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                Associated Space Missions & Probes
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeDestination.activeMissions.map((m, idx) => (
                  <span key={idx} className="px-3.5 py-2 rounded-xl bg-space-950 border border-slate-800 text-xs font-mono text-slate-200">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
