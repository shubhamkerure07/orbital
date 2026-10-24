import React, { useState } from 'react';
import { PLANETS } from '../../data/planets';
import { PlanetData } from '../../types';
import { formatNumber, formatTempCelsius, formatEarthRelative } from '../../utils/formatting';
import { Scale, ArrowRightLeft } from 'lucide-react';

export const PlanetComparison: React.FC = () => {
  const [planetAId, setPlanetAId] = useState<string>('earth');
  const [planetBId, setPlanetBId] = useState<string>('mars');

  const planetA = PLANETS.find(p => p.id === planetAId) || PLANETS[2];
  const planetB = PLANETS.find(p => p.id === planetBId) || PLANETS[3];

  const handleSwap = () => {
    setPlanetAId(planetBId);
    setPlanetBId(planetAId);
  };

  const comparisonMetrics = [
    {
      label: 'Equatorial Diameter',
      valA: `${formatNumber(planetA.diameterKm)} km`,
      valB: `${formatNumber(planetB.diameterKm)} km`,
      ratio: (planetA.diameterKm / planetB.diameterKm).toFixed(2),
      unit: 'km'
    },
    {
      label: 'Surface Gravity',
      valA: `${planetA.surfaceGravityMs2} m/s² (${planetA.gravityEarthRelative}g)`,
      valB: `${planetB.surfaceGravityMs2} m/s² (${planetB.gravityEarthRelative}g)`,
      ratio: (planetA.surfaceGravityMs2 / planetB.surfaceGravityMs2).toFixed(2),
      unit: 'm/s²'
    },
    {
      label: 'Orbital Period (Year)',
      valA: `${planetA.orbitalPeriodDays.toFixed(1)} days`,
      valB: `${planetB.orbitalPeriodDays.toFixed(1)} days`,
      ratio: (planetA.orbitalPeriodDays / planetB.orbitalPeriodDays).toFixed(2),
      unit: 'days'
    },
    {
      label: 'Solar Day Length',
      valA: `${planetA.dayLengthHours.toFixed(1)} hours`,
      valB: `${planetB.dayLengthHours.toFixed(1)} hours`,
      ratio: (planetA.dayLengthHours / planetB.dayLengthHours).toFixed(2),
      unit: 'hours'
    },
    {
      label: 'Mean Temperature',
      valA: formatTempCelsius(planetA.avgTempCelsius),
      valB: formatTempCelsius(planetB.avgTempCelsius),
      ratio: null,
      unit: '°C'
    },
    {
      label: 'Mass Relative to Earth',
      valA: formatEarthRelative(planetA.massEarthRelative),
      valB: formatEarthRelative(planetB.massEarthRelative),
      ratio: (planetA.massEarthRelative / planetB.massEarthRelative).toFixed(2),
      unit: 'M⊕'
    },
    {
      label: 'Confirmed Natural Moons',
      valA: `${planetA.moonsCount}`,
      valB: `${planetB.moonsCount}`,
      ratio: null,
      unit: 'moons'
    }
  ];

  return (
    <div className="hud-card rounded-2xl bg-space-900 border border-slate-800 p-6 sm:p-8 shadow-xl relative">
      <div className="hud-corner-tl" />
      <div className="hud-corner-br" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" /> Planetary Differential Analyzer
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-outfit">
            Side-by-Side Ephemeris Comparison
          </h3>
        </div>

        {/* Selectors */}
        <div className="flex items-center gap-2">
          <select
            value={planetAId}
            onChange={(e) => setPlanetAId(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-space-950 text-slate-200 border border-slate-700 font-mono text-xs outline-none hover:border-cyan-400/50 cursor-pointer"
            aria-label="Select first planet for comparison"
          >
            {PLANETS.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <button
            onClick={handleSwap}
            className="p-2 rounded-xl bg-space-850 text-slate-400 hover:text-cyan-300 hover:bg-space-800 border border-slate-800 transition-colors"
            title="Swap celestial targets"
            aria-label="Swap celestial targets"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          <select
            value={planetBId}
            onChange={(e) => setPlanetBId(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-space-950 text-slate-200 border border-slate-700 font-mono text-xs outline-none hover:border-cyan-400/50 cursor-pointer"
            aria-label="Select second planet for comparison"
          >
            {PLANETS.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bodies Header */}
      <div className="grid grid-cols-2 gap-4 py-6 border-b border-slate-800 text-center font-mono">
        <div className="flex flex-col items-center gap-2">
          <div 
            className="w-10 h-10 rounded-full border border-white/20 shadow-md"
            style={{ backgroundColor: planetA.colorHex }}
          />
          <h4 className="text-lg font-bold text-white font-outfit">{planetA.name}</h4>
          <span className="text-xs text-slate-400 font-sans">{planetA.type}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div 
            className="w-10 h-10 rounded-full border border-white/20 shadow-md"
            style={{ backgroundColor: planetB.colorHex }}
          />
          <h4 className="text-lg font-bold text-cyan-300 font-outfit">{planetB.name}</h4>
          <span className="text-xs text-slate-400 font-sans">{planetB.type}</span>
        </div>
      </div>

      {/* Comparison Rows */}
      <div className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
        {comparisonMetrics.map((m, idx) => (
          <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 py-3.5 items-center gap-2">
            <span className="text-slate-400 font-medium text-xs uppercase tracking-wider order-2 sm:order-1 sm:text-left text-center">
              {m.label}
            </span>
            <div className="text-center font-semibold text-slate-200 order-1 sm:order-2">
              {m.valA}
            </div>
            <div className="text-center font-semibold text-cyan-400 order-3">
              {m.valB}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
