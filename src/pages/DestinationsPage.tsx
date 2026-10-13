import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { DestinationData } from '../types';
import { DestinationCard } from '../components/destinations/DestinationCard';
import { Badge } from '../components/common/Badge';
import { Compass, Thermometer, Weight, Radio, HelpCircle, ShieldCheck, ExternalLink, Globe } from 'lucide-react';

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
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant="cyan">Astrobiology & Planetary Geology</Badge>
          <Badge variant="gold">Target Worlds</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono tracking-tight">
          Destinations Explorer
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Deep-dive monographs on prime celestial exploration targets: from lunar ice traps and Martian riverbeds to outer ocean worlds and temperate exoplanets.
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
      <div className="rounded-3xl bg-space-900 border border-slate-800 overflow-hidden shadow-2xl">
        
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
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 font-mono tracking-tight">
              {activeDestination.name}
            </h2>
          </div>
        </div>

        {/* Detailed Body Information */}
        <div className="p-6 sm:p-10 space-y-10">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] block">Distance From Earth</span>
              <span className="text-slate-200 font-bold text-sm sm:text-base mt-1 block">
                {activeDestination.distanceFromEarth}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] flex items-center gap-1">
                <Weight className="w-3.5 h-3.5 text-emerald-400" /> Surface Gravity
              </span>
              <span className="text-slate-200 font-bold text-sm sm:text-base mt-1 block">
                {activeDestination.surfaceGravity}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" /> Thermal Range
              </span>
              <span className="text-slate-200 font-bold text-sm sm:text-base mt-1 block">
                {activeDestination.surfaceTempRange}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] block">Atmospheric Pressure</span>
              <span className="text-slate-200 font-bold text-sm sm:text-base mt-1 block">
                {activeDestination.atmosphericPressure}
              </span>
            </div>
          </div>

          {/* Overview & Astrobiology Assessment */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-bold text-slate-100 font-mono uppercase tracking-wider text-gold-400">
                Scientific Overview
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeDestination.overview}
              </p>

              <h3 className="text-lg font-bold text-slate-100 font-mono uppercase tracking-wider text-gold-400 pt-4">
                Surface & Geology
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeDestination.surfaceAndGeology}
              </p>

              <h3 className="text-lg font-bold text-slate-100 font-mono uppercase tracking-wider text-gold-400 pt-4">
                Atmosphere & Volatiles
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeDestination.atmosphericDetails}
              </p>
            </div>

            <div className="lg:col-span-5 space-y-6">
              
              {/* Habitability Assessment Card */}
              <div className="p-5 rounded-2xl bg-space-950 border border-gold-500/30 space-y-2">
                <span className="text-xs uppercase font-mono text-gold-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Astrobiological Assessment
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeDestination.habitabilityIndexNotes}
                </p>
              </div>

              {/* Exploration History */}
              <div className="p-5 rounded-2xl bg-space-950 border border-slate-800 space-y-2">
                <span className="text-xs uppercase font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                  <Radio className="w-4 h-4" /> Exploration Record
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeDestination.explorationHistory}
                </p>
              </div>

              {/* Active & Planned Missions */}
              <div className="p-5 rounded-2xl bg-space-950 border border-slate-800 space-y-3">
                <span className="text-xs uppercase font-mono text-slate-400 font-bold">
                  Active & Scheduled Missions
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeDestination.activeMissions.map((mis, i) => (
                    <Badge key={i} variant="neutral" size="sm">{mis}</Badge>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Open Scientific Questions */}
          <div className="rounded-2xl bg-space-950 border border-slate-800 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-100 font-mono flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-gold-400" />
              Open Scientific Questions & Research Frontiers
            </h3>
            <ul className="space-y-3">
              {activeDestination.openQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-gold-400 mt-2 flex-shrink-0" />
                  <span className="leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Source Citation */}
          <div className="p-4 rounded-xl bg-space-950 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Source: {activeDestination.officialReference}</span>
            </div>
            <a
              href={activeDestination.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-gold-400 hover:underline"
            >
              <span>NASA Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>

    </div>
  );
};
