import React, { useState } from 'react';
import { 
  EXOPLANETS_DATABASE, 
  ExoplanetData, 
  DiscoveryMethod 
} from '../data/exoplanets';
import { 
  Sparkles, 
  Search, 
  Globe2, 
  Sun, 
  Activity, 
  Filter, 
  ExternalLink, 
  Compass, 
  Flame, 
  Wind,
  CheckCircle2,
  Orbit,
  Layers
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { MetricCard } from '../components/common/MetricCard';

export const ExoplanetsPage: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<ExoplanetData>(EXOPLANETS_DATABASE[0]);
  const [filterHabitableOnly, setFilterHabitableOnly] = useState<boolean>(false);
  const [filterAtmosphereOnly, setFilterAtmosphereOnly] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPlanets = EXOPLANETS_DATABASE.filter(planet => {
    const matchesSearch = planet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          planet.hostStar.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesHabitable = filterHabitableOnly ? planet.isInHabitableZone : true;
    const matchesAtmo = filterAtmosphereOnly ? planet.atmosphereDetected : true;
    const matchesMethod = selectedMethod === 'all' || planet.discoveryMethod === selectedMethod;

    return matchesSearch && matchesHabitable && matchesAtmo && matchesMethod;
  });

  // Calculate transit depth in parts-per-million (ppm) or percentage: (Rp / R*)^2
  // R_sun ≈ 109 R_earth. R* in R_sun -> R* in R_earth = R*_sun * 109.
  const rStarInEarthUnits = selectedPlanet.hostStar.radiusSolarRelative * 109.2;
  const transitDepthFraction = Math.pow(selectedPlanet.radiusEarthRelative / rStarInEarthUnits, 2);
  const transitDepthPercent = (transitDepthFraction * 100).toFixed(3);
  const transitDepthPpm = Math.round(transitDepthFraction * 1_000_000);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-space-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <Badge variant="cyan">NASA EXOPLANET ARCHIVE (CALTECH/IPAC)</Badge>
            <Badge variant="purple">JWST NIRSpec / MIRI SPECTROSCOPY</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight flex items-center gap-3">
            <Globe2 className="w-8 h-8 text-cyan-400" />
            Exoplanet Discovery & Habitable Zone Laboratory
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-3xl">
            Investigate worlds beyond our solar system, analyze atmospheric transmission spectroscopy from the James Webb Space Telescope, and compute transit photometry light curves.
          </p>
        </div>

        {/* Catalog Counter */}
        <div className="hud-card p-3 rounded-lg border border-cyan-400/30 flex items-center gap-4 bg-space-900/80">
          <div className="w-10 h-10 rounded-full bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">CONFIRMED WORLDS</div>
            <div className="text-sm font-mono font-bold text-cyan-400">5,630+ Exoplanets</div>
            <div className="text-[10px] font-mono text-slate-400">4,190 Planetary Systems</div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          label="Habitable Zone Candidates"
          value="68"
          unit="worlds"
          subtext="Conservative HZ"
          accentColor="border-emerald-400/40"
          icon={<Globe2 className="w-4 h-4 text-emerald-400" />}
        />
        <MetricCard
          label="JWST Atmosphere Targets"
          value="42"
          unit="spectroscopically profiled"
          subtext="CO₂ / H₂O / SO₂ signatures"
          accentColor="border-purple-400/40"
          icon={<Wind className="w-4 h-4 text-purple-400" />}
        />
        <MetricCard
          label="Dominant Discovery Method"
          value="Transit"
          unit="74.2% of discoveries"
          subtext="Kepler & TESS"
          accentColor="border-cyan-400/30"
          icon={<Activity className="w-4 h-4 text-cyan-400" />}
        />
        <MetricCard
          label="Closest Known Exoplanet"
          value="4.24"
          unit="light-years"
          subtext="Proxima Centauri b"
          accentColor="border-amber-400/30"
          icon={<Compass className="w-4 h-4 text-amber-400" />}
        />
      </div>

      {/* Main Content Grid: Catalog & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Filter & Catalog (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="hud-card p-4 rounded-xl border border-slate-800 bg-space-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Exoplanet Target Database
              </span>
              <span className="text-[11px] font-mono text-cyan-400">
                {filteredPlanets.length} Candidates
              </span>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search exoplanet or host star..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-space-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs font-mono text-slate-200"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-mono">
              <button
                onClick={() => setFilterHabitableOnly(!filterHabitableOnly)}
                className={`px-2 py-1 rounded transition-colors ${
                  filterHabitableOnly 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50' 
                    : 'bg-space-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                🌱 Habitable Zone Only
              </button>

              <button
                onClick={() => setFilterAtmosphereOnly(!filterAtmosphereOnly)}
                className={`px-2 py-1 rounded transition-colors ${
                  filterAtmosphereOnly 
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50' 
                    : 'bg-space-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                💨 Atmosphere Detected
              </button>
            </div>
          </div>

          {/* Planet Cards Scroll */}
          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredPlanets.map((planet) => {
              const isSelected = selectedPlanet.id === planet.id;
              return (
                <div
                  key={planet.id}
                  onClick={() => setSelectedPlanet(planet)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-space-850 border-cyan-400 shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                      : 'bg-space-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-space-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-outfit font-bold text-white">
                        {planet.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 ml-1.5">
                        {planet.hostStar.name} System
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {planet.isInHabitableZone && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          HABITABLE
                        </span>
                      )}
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-space-950 text-slate-300 border border-slate-800">
                        {planet.planetType}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-800/50 text-[11px] font-mono">
                    <div>
                      <div className="text-slate-400 text-[9px] uppercase">Radius (R⊕)</div>
                      <div className="text-slate-200">{planet.radiusEarthRelative} × Earth</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[9px] uppercase">Distance</div>
                      <div className="text-cyan-400 font-bold">{planet.distanceLightYears} ly</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[9px] uppercase">Period</div>
                      <div className="text-slate-300">{planet.orbitalPeriodDays} d</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right In-Depth Laboratory Profile (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Inspection HUD Card */}
          <div className="hud-card p-6 rounded-2xl border border-cyan-400/40 bg-space-900/90 relative overflow-hidden">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-space-800 pb-4">
              <div>
                <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase flex items-center gap-1.5">
                  <Orbit className="w-3.5 h-3.5" />
                  SPECTRAL CHARACTERIZATION PROFILE: {selectedPlanet.name}
                </div>
                <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-white mt-1">
                  {selectedPlanet.name}
                </h2>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  Host Star: <span className="text-white font-bold">{selectedPlanet.hostStar.name}</span> ({selectedPlanet.hostStar.spectralType}) in Constellation {selectedPlanet.hostStar.constellation}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedPlanet.isInHabitableZone ? (
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    CIRCUMSTELLAR HABITABLE ZONE
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-400 border border-slate-700">
                    OUTSIDE HABITABLE ZONE
                  </span>
                )}
              </div>
            </div>

            {/* Earth Relative Comparative Telemetry */}
            <div className="my-5 p-4 rounded-xl bg-space-950/80 border border-space-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Radius Ratio</div>
                <div className="text-sm font-mono font-bold text-white mt-0.5">
                  {selectedPlanet.radiusEarthRelative} <span className="text-xs text-slate-400">R⊕</span>
                </div>
                <div className="text-[9px] font-mono text-slate-400">vs. Earth (1.00)</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Mass Ratio</div>
                <div className="text-sm font-mono font-bold text-cyan-400 mt-0.5">
                  {selectedPlanet.massEarthRelative} <span className="text-xs text-slate-400">M⊕</span>
                </div>
                <div className="text-[9px] font-mono text-slate-400">vs. Earth (1.00)</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Equilibrium Temp</div>
                <div className={`text-sm font-mono font-bold mt-0.5 ${
                  selectedPlanet.equilibriumTempCelsius > 100 
                    ? 'text-red-400' 
                    : selectedPlanet.equilibriumTempCelsius < -50 
                    ? 'text-cyan-400' 
                    : 'text-emerald-400'
                }`}>
                  {selectedPlanet.equilibriumTempCelsius}°C
                </div>
                <div className="text-[9px] font-mono text-slate-400">Blackbody Equilibrium</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Stellar Insolation</div>
                <div className="text-sm font-mono font-bold text-amber-400 mt-0.5">
                  {selectedPlanet.stellarFluxEarthRelative} <span className="text-xs text-slate-400">S⊕</span>
                </div>
                <div className="text-[9px] font-mono text-slate-400">Relative Stellar Flux</div>
              </div>
            </div>

            {/* Interactive Transit Photometry Light Curve Simulator */}
            <div className="p-4 rounded-xl bg-space-950/90 border border-space-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  Transit Photometry Light Curve Simulation
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  Transit Depth: {transitDepthPercent}% ({transitDepthPpm} ppm)
                </span>
              </div>

              {/* Graphical Photometric Light Curve Graph */}
              <div className="h-28 w-full bg-space-900 rounded-lg border border-space-800/80 p-2 relative flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between text-[9px] font-mono text-slate-400">
                  <span>Relative Flux: 1.000</span>
                  <span>Ingress → Mid-Transit → Egress</span>
                  <span>Time (Normalized)</span>
                </div>

                {/* SVG Curve showing the light dip */}
                <svg className="w-full h-16 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                  {/* Baseline 100% flux line */}
                  <line x1="0" y1="10" x2="35" y2="10" stroke="#00f2ff" strokeWidth="1.5" />
                  {/* Transit ingress slope */}
                  <line x1="35" y1="10" x2="42" y2="35" stroke="#00f2ff" strokeWidth="1.5" />
                  {/* Bottom of transit (eclipse) */}
                  <line x1="42" y1="35" x2="58" y2="35" stroke="#00f2ff" strokeWidth="1.5" />
                  {/* Transit egress slope */}
                  <line x1="58" y1="35" x2="65" y2="10" stroke="#00f2ff" strokeWidth="1.5" />
                  {/* Baseline out of transit */}
                  <line x1="65" y1="10" x2="100" y2="10" stroke="#00f2ff" strokeWidth="1.5" />

                  {/* Shaded dip area */}
                  <polygon 
                    points="35,10 42,35 58,35 65,10 65,50 35,50" 
                    fill="rgba(0, 242, 255, 0.08)" 
                  />
                </svg>

                <div className="flex justify-between text-[9px] font-mono text-slate-400">
                  <span>Out of Transit (F=1.0)</span>
                  <span className="text-cyan-400">ΔF/F = (Rp / R*)² = {transitDepthPercent}%</span>
                  <span>Out of Transit</span>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-400">
                Formula: Photometric occultation dip is proportional to the square of planet radius over stellar radius: <strong className="text-slate-200">ΔF / F = (R_p / R_* )²</strong>. Detected by {selectedPlanet.discoveryFacility}.
              </div>
            </div>

            {/* Atmospheric Spectroscopy & Detected Molecules */}
            <div className="mt-5 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Wind className="w-4 h-4 text-purple-400" />
                Atmospheric Transmission Spectroscopy (JWST & Hubble)
              </h4>

              {selectedPlanet.atmosphereDetected && selectedPlanet.atmosphericMolecules.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {selectedPlanet.atmosphericMolecules.map((molecule) => (
                      <span 
                        key={molecule}
                        className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                      >
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        {molecule}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Absorption dips in transmission spectra during planetary occultation reveal molecular signatures in the upper atmosphere.
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-space-950 border border-slate-800 text-xs font-mono text-slate-400">
                  No confirmed volatile atmospheric envelope detected to date. High priority target for upcoming JWST Cycle spectroscopy surveys.
                </div>
              )}
            </div>

            {/* Scientific Significance & Summary */}
            <div className="mt-5 pt-4 border-t border-space-800 space-y-2 font-sans">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Scientific Significance & Mission History
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedPlanet.summary}
              </p>
              <p className="text-xs sm:text-sm text-cyan-400/90 leading-relaxed font-mono">
                {selectedPlanet.keyScientificSignificance}
              </p>
            </div>

            {/* Citation & Source Link */}
            <div className="mt-4 pt-3 border-t border-space-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Reference: {selectedPlanet.sourceReference}</span>
              <a
                href={selectedPlanet.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
              >
                NASA Exoplanet Archive <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
