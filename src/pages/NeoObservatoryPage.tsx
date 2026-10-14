import React, { useState } from 'react';
import { 
  ASTEROIDS_DATABASE, 
  AsteroidData 
} from '../data/asteroids';
import { 
  ShieldAlert, 
  Crosshair, 
  Search, 
  Activity, 
  Orbit, 
  Compass, 
  AlertTriangle, 
  Info, 
  Zap, 
  ArrowUpRight,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { MetricCard } from '../components/common/MetricCard';

interface TorinoScaleDef {
  level: number;
  name: string;
  description: string;
}

const TORINO_SCALE_DEFINITIONS: TorinoScaleDef[] = [
  { level: 0, name: 'No Hazard (White)', description: 'Zero or effectively zero probability of collision.' },
  { level: 1, name: 'Normal (Green)', description: 'Routine pass; careful calculation will likely reassign to 0.' },
  { level: 2, name: 'Meriting Attention (Yellow)', description: 'Close approach requiring astronomer monitoring.' },
  { level: 4, name: 'Close Encounter (Yellow)', description: '1% or greater chance of localized regional destruction.' },
  { level: 8, name: 'Certain Collision (Red)', description: 'Localized tsunami or regional impact devastation.' },
  { level: 10, name: 'Global Catastrophe (Red)', description: 'Global climate alteration and existential civilizational threat.' }
];

export const NeoObservatoryPage: React.FC = () => {
  const [selectedAsteroid, setSelectedAsteroid] = useState<AsteroidData>(ASTEROIDS_DATABASE[0]);
  const [filterHazardousOnly, setFilterHazardousOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredAsteroids = ASTEROIDS_DATABASE.filter(ast => {
    const matchesSearch = ast.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ast.designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesHazard = filterHazardousOnly ? ast.isPotentiallyHazardous : true;
    return matchesSearch && matchesHazard;
  });

  const nextApproach = selectedAsteroid.closeApproaches && selectedAsteroid.closeApproaches.length > 0 
    ? selectedAsteroid.closeApproaches[0] 
    : null;

  const meanDiameter = Math.round(
    (selectedAsteroid.estimatedDiameterMeters.min + selectedAsteroid.estimatedDiameterMeters.max) / 2
  );

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-holo-cyan animate-pulse" />
            <Badge variant="cyan">NASA CNEOS / JPL SENTRY EQUIVALENT</Badge>
            <Badge variant="gold">RADAR TELEMETRY</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight flex items-center gap-3">
            <Crosshair className="w-8 h-8 text-holo-cyan" />
            Asteroid & Near-Earth Object Observatory
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-3xl">
            Real-time planetary defense monitoring, close-approach trajectory analysis, and orbital tracking of Near-Earth Asteroids (NEAs) and Potentially Hazardous Asteroids (PHAs).
          </p>
        </div>

        {/* Global Planetary Defense Status */}
        <div className="hud-card p-3 rounded-lg border border-holo-cyan/30 flex items-center gap-4 bg-space-900/80">
          <div className="w-10 h-10 rounded-full bg-holo-cyan/10 border border-holo-cyan/40 flex items-center justify-center text-holo-cyan">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">DEFENSE THREAT LEVEL</div>
            <div className="text-sm font-mono font-bold text-emerald-400">DEFCON 5 / NOMINAL</div>
            <div className="text-[10px] font-mono text-slate-400">No known &gt;140m impacts in 100 yrs</div>
          </div>
        </div>
      </div>

      {/* Quick Observatory Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          label="Tracked NEOs (Cataloged)"
          value="34,850+"
          unit="objects"
          subtext="Updated Daily by JPL"
          accentColor="border-holo-cyan/40"
          icon={<Orbit className="w-4 h-4 text-holo-cyan" />}
        />
        <MetricCard
          label="Potentially Hazardous (PHAs)"
          value="2,410"
          unit="diameter > 140m"
          subtext="MOID < 0.05 AU"
          accentColor="border-amber-400/40"
          icon={<AlertTriangle className="w-4 h-4 text-amber-400" />}
        />
        <MetricCard
          label="Closest Tracked Approach"
          value="31,600"
          unit="km (Apophis 2029)"
          subtext="Inside GEO Satellite Ring"
          accentColor="border-holo-cyan/40"
          icon={<Compass className="w-4 h-4 text-holo-cyan" />}
        />
        <MetricCard
          label="Active Planetary Defense"
          value="DART Verified"
          unit="Kinetic Deflection"
          subtext="-33 min orbital shift"
          accentColor="border-emerald-400/40"
          icon={<Zap className="w-4 h-4 text-emerald-400" />}
        />
      </div>

      {/* Main Interactive Grid: Left Catalog, Right In-Depth Radar HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left List & Filters (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="hud-card p-4 rounded-xl border border-slate-800 bg-space-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Observatory Telemetry Target List
              </span>
              <span className="text-[11px] font-mono text-holo-cyan">
                {filteredAsteroids.length} Target(s)
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search asteroid by name (e.g. Apophis, Bennu)..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-space-950 border border-slate-800 focus:border-holo-cyan focus:outline-none text-xs font-mono text-slate-200"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between text-xs font-mono pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={filterHazardousOnly}
                  onChange={(e) => setFilterHazardousOnly(e.target.checked)}
                  className="rounded bg-space-950 border-slate-700 text-holo-cyan focus:ring-holo-cyan"
                />
                Show Hazardous (PHA) Only
              </label>
              <span className="text-[10px] text-slate-400">JPL MOID &lt; 0.05 AU</span>
            </div>
          </div>

          {/* Asteroid Cards List */}
          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredAsteroids.map((ast) => {
              const isSelected = selectedAsteroid.id === ast.id;
              const closeApp = ast.closeApproaches && ast.closeApproaches.length > 0 ? ast.closeApproaches[0] : null;
              const avgDiam = Math.round((ast.estimatedDiameterMeters.min + ast.estimatedDiameterMeters.max) / 2);

              return (
                <div
                  key={ast.id}
                  onClick={() => setSelectedAsteroid(ast)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-holo-cyan/10 border-holo-cyan shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                      : 'bg-space-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-space-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-outfit font-bold text-white">
                        {ast.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        ({ast.designation})
                      </span>
                    </div>
                    {ast.isPotentiallyHazardous ? (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/30">
                        PHA
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        SAFE
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-800/50 text-[11px] font-mono">
                    <div>
                      <div className="text-slate-400 text-[9px] uppercase">Diameter</div>
                      <div className="text-slate-200">{avgDiam} m</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[9px] uppercase">Miss Dist.</div>
                      <div className="text-holo-cyan font-bold">{closeApp ? `${closeApp.missDistanceLd} LD` : 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[9px] uppercase">Torino</div>
                      <div className={`font-bold ${ast.riskAssessment.torinoScale > 0 ? 'text-amber-400' : 'text-slate-300'}`}>
                        Scale {ast.riskAssessment.torinoScale}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Radar & Mission In-Depth Profile (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Inspection HUD Card */}
          <div className="hud-card p-6 rounded-2xl border border-holo-cyan/40 bg-space-900/90 relative overflow-hidden">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            {/* Target Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="text-[10px] font-mono tracking-widest text-holo-cyan uppercase flex items-center gap-1.5">
                  <Crosshair className="w-3.5 h-3.5" />
                  RADAR TELEMETRY TARGET PROFILE: {selectedAsteroid.designation}
                </div>
                <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-white mt-1">
                  {selectedAsteroid.name}
                </h2>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  Spectral Type: <span className="text-holo-cyan font-bold">{selectedAsteroid.spectralType}</span> | Orbital Group: <span className="text-slate-200">{selectedAsteroid.classification}</span>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col items-end gap-1.5">
                <div className="px-2.5 py-1 rounded bg-space-950 border border-holo-cyan/50 text-right">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">Mean Diameter</div>
                  <div className="text-xs font-mono font-bold text-holo-cyan">~{meanDiameter} meters</div>
                </div>
              </div>
            </div>

            {/* Close Approach Radar Telemetry Box */}
            <div className="my-5 p-4 rounded-xl bg-space-950/80 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Next Close Pass</div>
                <div className="text-xs font-mono font-bold text-white mt-0.5">{nextApproach ? nextApproach.date : 'None within epoch'}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Miss Distance</div>
                <div className="text-xs font-mono font-bold text-holo-cyan mt-0.5">
                  {nextApproach ? `${nextApproach.missDistanceLd} LD` : 'Stable Orbit'}
                </div>
                <div className="text-[9px] font-mono text-slate-400">
                  {nextApproach ? `(${(nextApproach.missDistanceKm).toLocaleString()} km)` : 'Belt'}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Relative Speed</div>
                <div className="text-xs font-mono font-bold text-amber-400 mt-0.5">
                  {nextApproach ? `${nextApproach.relativeVelocityKms} km/s` : 'Orbital'}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Torino Impact Risk</div>
                <div className="text-xs font-mono font-bold text-white mt-0.5">
                  Level {selectedAsteroid.riskAssessment.torinoScale} / 10
                </div>
              </div>
            </div>

            {/* Distance Visualizer (Relative to Moon Distance) */}
            {nextApproach && (
              <div className="space-y-2 mb-5 p-4 rounded-xl bg-space-950/60 border border-slate-800/80">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">Miss Distance Proximity Gauge:</span>
                  <span className="text-holo-cyan font-bold">
                    {nextApproach.missDistanceLd < 1 
                      ? `INSIDE LUNAR ORBIT (${(nextApproach.missDistanceLd * 100).toFixed(1)}% lunar dist)`
                      : `${nextApproach.missDistanceLd} Lunar Distances`}
                  </span>
                </div>

                {/* Graphical Scale */}
                <div className="relative h-6 bg-space-900 rounded-lg overflow-hidden border border-slate-800 flex items-center px-2">
                  <div className="absolute left-3 flex items-center gap-1 z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                    <span className="text-[9px] font-mono font-bold text-white">EARTH</span>
                  </div>
                  
                  {/* 1 Lunar Distance marker (scaled to 40% width) */}
                  <div className="absolute left-[40%] top-0 bottom-0 w-[1px] bg-slate-600 flex flex-col justify-between">
                    <span className="text-[8px] font-mono text-slate-400 -mt-1 pl-1">MOON (1 LD)</span>
                  </div>

                  {/* Asteroid flyby pin */}
                  {(() => {
                    const percent = Math.min(Math.max((nextApproach.missDistanceLd / 5) * 100, 15), 95);
                    return (
                      <div 
                        className="absolute flex items-center gap-1 transform -translate-x-1/2 transition-all duration-700 z-20"
                        style={{ left: `${percent}%` }}
                      >
                        <div className="w-3 h-3 rounded-full bg-holo-cyan border border-white animate-ping absolute" />
                        <div className="w-3 h-3 rounded-full bg-holo-cyan border border-white relative" />
                        <span className="text-[9px] font-mono font-bold text-holo-cyan whitespace-nowrap hidden sm:inline">
                          {selectedAsteroid.name}
                        </span>
                      </div>
                    );
                  })()}
                </div>

                <div className="flex justify-between text-[9px] font-mono text-slate-400">
                  <span>0 km (Surface)</span>
                  <span>384,400 km (1 LD)</span>
                  <span>1,922,000 km (5 LD)</span>
                </div>
              </div>
            )}

            {/* Scientific Overview & Historical Mission Context */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-holo-cyan" />
                Scientific Assessment & Physical Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {selectedAsteroid.summary}
              </p>

              {/* Related Spacecraft Exploration */}
              {selectedAsteroid.associatedMissions && selectedAsteroid.associatedMissions.length > 0 && (
                <div className="p-3 rounded-lg bg-holo-cyan/5 border border-holo-cyan/30 flex items-center gap-3">
                  <Zap className="w-4 h-4 text-holo-cyan flex-shrink-0" />
                  <div className="text-xs font-mono">
                    <span className="text-slate-400">Target of In-Situ Robotic Exploration: </span>
                    <span className="text-holo-cyan font-bold">{selectedAsteroid.associatedMissions.join('; ')}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Orbital Parameters Grid */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                Keplerian Orbital Elements
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="bg-space-950 p-2 rounded border border-slate-800/80">
                  <div className="text-[9px] text-slate-400 uppercase">Semi-Major Axis</div>
                  <div className="text-slate-200 font-bold">{selectedAsteroid.orbitalParameters.semiMajorAxisAu} AU</div>
                </div>
                <div className="bg-space-950 p-2 rounded border border-slate-800/80">
                  <div className="text-[9px] text-slate-400 uppercase">Eccentricity</div>
                  <div className="text-slate-200 font-bold">{selectedAsteroid.orbitalParameters.eccentricity}</div>
                </div>
                <div className="bg-space-950 p-2 rounded border border-slate-800/80">
                  <div className="text-[9px] text-slate-400 uppercase">Inclination</div>
                  <div className="text-slate-200 font-bold">{selectedAsteroid.orbitalParameters.inclinationDeg}°</div>
                </div>
                <div className="bg-space-950 p-2 rounded border border-slate-800/80">
                  <div className="text-[9px] text-slate-400 uppercase">Orbital Period</div>
                  <div className="text-slate-200 font-bold">{selectedAsteroid.orbitalParameters.orbitalPeriodDays} days</div>
                </div>
              </div>
            </div>

          </div>

          {/* Torino Scale Educational Reference Card */}
          <div className="hud-card p-4 rounded-xl border border-slate-800 bg-space-900/50">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Torino Impact Hazard Scale Reference
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
              {TORINO_SCALE_DEFINITIONS.map((scale: TorinoScaleDef) => (
                <div key={scale.level} className="p-2 rounded bg-space-950 border border-slate-800 flex items-start gap-2">
                  <span className="w-4 h-4 rounded text-center text-[10px] font-bold bg-slate-800 text-holo-cyan shrink-0">
                    {scale.level}
                  </span>
                  <div>
                    <div className="text-white font-bold">{scale.name}</div>
                    <div className="text-slate-400 text-[10px]">{scale.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
