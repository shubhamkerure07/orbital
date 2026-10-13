import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ROCKETS } from '../data/rockets';
import { RocketData } from '../types';
import { RocketStageInspector } from '../components/rockets/RocketStageInspector';
import { LaunchSequenceSimulator } from '../components/rockets/LaunchSequenceSimulator';
import { Badge } from '../components/common/Badge';
import { Rocket, Gauge, Scale, ExternalLink, ShieldCheck, Flame } from 'lucide-react';
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
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant="gold">Launch Vehicles & Aerospace Propulsion</Badge>
          <Badge variant="cyan">Multistage Dynamics</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono tracking-tight">
          Rocket Explorer & Staging Simulator
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Inspect orbital class launch systems from the Apollo-era Saturn V to contemporary reusable architectures. Explore stage propellants, engine cycles, and sequential flight profiles.
        </p>
      </div>

      {/* Vehicle Quick Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {ROCKETS.map((r) => (
          <button
            key={r.id}
            onClick={() => handleSelectRocket(r.id)}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-mono font-bold whitespace-nowrap transition-all shadow-md ${
              selectedRocketId === r.id
                ? 'bg-gold-500 text-space-950 border-gold-400 shadow-gold-500/20'
                : 'bg-space-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-slate-100'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>{r.name}</span>
          </button>
        ))}
      </div>

      {/* Primary Vehicle Overview Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-space-900 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="cyan">{currentRocket.operator}</Badge>
              <Badge variant="neutral">{currentRocket.country}</Badge>
              <Badge variant={currentRocket.status === 'Operational' ? 'green' : 'gold'}>
                {currentRocket.status}
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">
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

        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          {currentRocket.description}
        </p>

        {/* Quick Numbers Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
          <div className="p-3 rounded-xl bg-space-950 border border-slate-800">
            <span className="text-slate-500 uppercase text-[10px] block">Total Height</span>
            <span className="text-slate-100 font-bold text-base mt-0.5 block">{currentRocket.heightMeters} meters</span>
          </div>
          <div className="p-3 rounded-xl bg-space-950 border border-slate-800">
            <span className="text-slate-500 uppercase text-[10px] block">Core Diameter</span>
            <span className="text-slate-100 font-bold text-base mt-0.5 block">{currentRocket.diameterMeters} meters</span>
          </div>
          <div className="p-3 rounded-xl bg-space-950 border border-slate-800">
            <span className="text-slate-500 uppercase text-[10px] block">Payload to LEO</span>
            <span className="text-gold-400 font-bold text-base mt-0.5 block">{formatNumber(currentRocket.payloadLeoKg)} kg</span>
          </div>
          <div className="p-3 rounded-xl bg-space-950 border border-slate-800">
            <span className="text-slate-500 uppercase text-[10px] block">Propulsion Stages</span>
            <span className="text-cyan-400 font-bold text-base mt-0.5 block">{currentRocket.stagesCount} Stages</span>
          </div>
        </div>
      </div>

      {/* Component 1: Interactive Stage Inspector */}
      <RocketStageInspector rocket={currentRocket} />

      {/* Component 2: Step-by-Step Flight Profile Simulator */}
      <LaunchSequenceSimulator rocket={currentRocket} />

      {/* Comparative Launch Vehicle Matrix Table */}
      <section className="rounded-2xl bg-space-900 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-100 font-mono flex items-center gap-2">
            <Scale className="w-5 h-5 text-gold-400" />
            Launch Vehicle Capacity Matrix
          </h3>
          <span className="text-xs font-mono text-slate-400">Verified Payload Standards</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs divide-y divide-slate-800">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-3">Vehicle</th>
                <th className="py-3 px-3">Operator</th>
                <th className="py-3 px-3">Height</th>
                <th className="py-3 px-3">Liftoff Mass</th>
                <th className="py-3 px-3">LEO Payload</th>
                <th className="py-3 px-3">GTO / TLI Payload</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {ROCKETS.map((r) => (
                <tr 
                  key={r.id} 
                  onClick={() => handleSelectRocket(r.id)}
                  className={`hover:bg-space-850 cursor-pointer transition-colors ${
                    r.id === currentRocket.id ? 'bg-gold-500/10 text-gold-300' : ''
                  }`}
                >
                  <td className="py-3.5 px-3 font-bold text-slate-100">{r.name}</td>
                  <td className="py-3.5 px-3 text-slate-400">{r.operator}</td>
                  <td className="py-3.5 px-3">{r.heightMeters} m</td>
                  <td className="py-3.5 px-3">{formatNumber(r.grossMassKg)} kg</td>
                  <td className="py-3.5 px-3 font-semibold text-gold-400">{formatNumber(r.payloadLeoKg)} kg</td>
                  <td className="py-3.5 px-3 text-cyan-400">{r.payloadGtoKg ? `${formatNumber(r.payloadGtoKg)} kg` : 'N/A'}</td>
                  <td className="py-3.5 px-3">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-space-950 border border-slate-700">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-space-950 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Authority Reference: {currentRocket.officialSource}</span>
          </div>
          <a
            href={currentRocket.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-gold-400 hover:underline"
          >
            <span>Official Vehicle Documentation</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

    </div>
  );
};
