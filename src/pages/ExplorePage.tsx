import React from 'react';
import { SolarSystemCanvas } from '../components/solar-system/SolarSystemCanvas';
import { PLANETS } from '../data/planets';
import { PlanetCard } from '../components/planets/PlanetCard';
import { PlanetComparison } from '../components/planets/PlanetComparison';
import { Globe, Info, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const ExplorePage: React.FC = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="cyan">Digital Planetarium</Badge>
            <Badge variant="gold">Interactive 3D Engine</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono tracking-tight">
            The Solar System
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Inspect our planetary neighborhood in real-time 3D. Click any world to adjust focus, examine axial tilts, and inspect authentic physical and orbital parameters.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500 bg-space-900 px-3 py-2 rounded-xl border border-slate-800">
          <span>Interaction: Click + Drag to Orbit • Scroll to Zoom</span>
        </div>
      </div>

      {/* Primary 3D Solar System Viewport */}
      <SolarSystemCanvas />

      {/* Scientific Scaling & Ephemeris Documentation Banner */}
      <div className="p-5 rounded-2xl bg-space-900/60 border border-slate-800/80 flex items-start gap-3.5 text-xs font-mono text-slate-400">
        <Info className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-slate-200 font-bold block">
            SCIENTIFIC VISUALIZATION SCALING METHODOLOGY
          </span>
          <p className="leading-relaxed">
            In physical reality, the Solar System is predominantly empty space. If Earth were the size of a marble (1 cm), Neptune would be located more than 3.5 kilometers away, making a true-scale 3D viewport unusable on standard displays. ORBITAL applies a normalized logarithmic visual scaling model to planetary distances and radii for interactive inspection, while presenting true physical parameters (AU, km, gravitational fields) in data readouts.
          </p>
        </div>
      </div>

      {/* Side-by-side Comparative Analysis Tool */}
      <PlanetComparison />

      {/* Planetary Catalog Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-100 font-mono flex items-center gap-2">
            <Globe className="w-5 h-5 text-gold-400" />
            Planetary Dossiers
          </h2>
          <span className="text-xs font-mono text-slate-500">8 Terrestrial & Gas Worlds</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANETS.map((planet) => (
            <PlanetCard key={planet.id} planet={planet} />
          ))}
        </div>
      </section>

    </div>
  );
};
