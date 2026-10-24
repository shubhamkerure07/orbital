import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ROCKETS } from '../data/rockets';
import { RocketData } from '../types';
import { RocketStageInspector } from '../components/rockets/RocketStageInspector';
import { LaunchSequenceSimulator } from '../components/rockets/LaunchSequenceSimulator';
import { Badge } from '../components/common/Badge';
import { Rocket, Gauge, Scale, ExternalLink, ShieldCheck, Flame, Compass } from 'lucide-react';
import { formatNumber } from '../utils/formatting';

export const RocketsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRocketId, setSelectedRocketId] = useState<string>('falcon-9');

  useEffect(() => {
    const idParam = searchParams.get('id');
    if (idParam && ROCKETS.some(r => r.id === idParam)) {
      setSelectedRocketId(idParam);
    }
  }, [searchParams]);

  const currentRocket = ROCKETS.find(r => r.id === selectedRocketId) || ROCKETS[0];

  const handleSelectRocket = (id: string) => {
    setSelectedRocketId(id);
    setSearchParams({ id });
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="cyan">Launch Vehicles & Aerospace Propulsion</Badge>
          <Badge variant="neutral">Multistage Dynamics</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight flex items-center gap-3">
          <Rocket className="w-8 h-8 text-cyan-400" />
          Rocket Explorer & Staging Simulator
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-3xl font-sans leading-relaxed">
          Inspect orbital class launch systems from the Apollo-era Saturn V to contemporary reusable architectures. Explore stage propellants, engine cycles, thrust-to-weight ratios, and sequential flight profiles.
        </p>
      </div>

      {/* Vehicle Quick Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
        {ROCKETS.map((r) => (
          <button
            key={r.id}
            role="tab"
            aria-selected={selectedRocketId === r.id}
            onClick={() => handleSelectRocket(r.id)}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-mono font-bold whitespace-nowrap transition-all shadow-md ${
              selectedRocketId === r.id
                ? 'bg-space-850 text-cyan-300 border-cyan-400/50 shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                : 'bg-space-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <Rocket className="w-4 h-4 text-cyan-400" />
            <span>{r.name}</span>
          </button>
        ))}
      </div>

      {/* Primary Vehicle Overview Banner */}
      <div className="hud-card p-6 sm:p-8 rounded-2xl bg-space-900 border border-slate-800 space-y-5 relative">
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="cyan">{currentRocket.operator}</Badge>
              <Badge variant="neutral">{currentRocket.country}</Badge>
              <Badge variant={currentRocket.status === 'Operational' ? 'green' : 'gold'}>
                {currentRocket.status}
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">
              {currentRocket.name}
            </h2>
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
            <span>First Flight: {currentRocket.firstFlightYear}</span>
            {currentRocket.totalLaunches && (
              <span>• Launches: {currentRocket.totalLaunches} ({currentRocket.successRatePercent}% success)</span>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl font-sans">
          {currentRocket.description}
        </p>

        {/* Quick Numbers Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-space-950/80 border border-slate-800">
            <span className="text-slate-400 uppercase text-[10px] block">Total Height</span>
            <span className="text-white font-bold text-base mt-0.5 block font-outfit">{currentRocket.heightMeters} meters</span>
          </div>
          <div className="p-3.5 rounded-xl bg-space-950/80 border border-slate-800">
            <span className="text-slate-400 uppercase text-[10px] block">Core Diameter</span>
            <span className="text-white font-bold text-base mt-0.5 block font-outfit">{currentRocket.diameterMeters} meters</span>
          </div>
          <div className="p-3.5 rounded-xl bg-space-950/80 border border-slate-800">
            <span className="text-slate-400 uppercase text-[10px] block">Liftoff Gross Mass</span>
            <span className="text-white font-bold text-base mt-0.5 block font-outfit">{formatNumber(currentRocket.grossMassKg)} kg</span>
          </div>
          <div className="p-3.5 rounded-xl bg-space-950/80 border border-slate-800">
            <span className="text-slate-400 uppercase text-[10px] block">LEO Payload Capacity</span>
            <span className="text-cyan-300 font-bold text-base mt-0.5 block font-outfit">{formatNumber(currentRocket.payloadLeoKg)} kg</span>
          </div>
        </div>
      </div>

      {/* Multistage Rocket Anatomical Inspector */}
      <RocketStageInspector rocket={currentRocket} />

      {/* Sequential Launch Profile Simulator */}
      <LaunchSequenceSimulator rocket={currentRocket} />

    </div>
  );
};
