import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Orbit, 
  ArrowRight, 
  Compass, 
  Radio, 
  Rocket, 
  Globe, 
  Cpu, 
  Sparkles, 
  ShieldCheck,
  Activity,
  Terminal,
  Layers,
  Crosshair,
  Sun,
  Globe2,
  Network,
  Wifi,
  Zap,
  Info,
  Calendar,
  Thermometer,
  Weight
} from 'lucide-react';
import { PLANETS } from '../data/planets';
import { MISSIONS } from '../data/missions';
import { DISCOVERIES } from '../data/discoveries';
import { CURRENT_SPACE_WEATHER } from '../data/spaceWeather';
import { ASTEROIDS_DATABASE } from '../data/asteroids';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { FirstTimeGuide } from '../components/common/FirstTimeGuide';
import { GlossaryTooltip } from '../components/common/GlossaryTooltip';
import { formatNumber } from '../utils/formatting';

export const HomePage: React.FC = () => {
  const [selectedTargetIndex, setSelectedTargetIndex] = useState<number>(3); // Mars default
  const activePlanet = PLANETS[selectedTargetIndex] || PLANETS[3];
  
  const spotlightMissions = MISSIONS.slice(0, 3);
  const featuredDiscovery = DISCOVERIES[0];
  const weather = CURRENT_SPACE_WEATHER;
  const apophisAsteroid = ASTEROIDS_DATABASE[0];

  return (
    <div className="flex flex-col min-h-screen cosmic-dust pb-16">
      
      {/* SECTION A: Mission Control Welcome & Orientation */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-12 border-b border-slate-800/80">
        
        {/* Subtle Ambient Atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[500px] rounded-full bg-gradient-to-b from-cyan-500/10 via-space-900 to-transparent blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          
          {/* Tactical Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-space-900/90 border border-cyan-400/30 text-xs font-mono text-cyan-400 shadow-[0_0_15px_rgba(0,242,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="tracking-wider uppercase">NASA Mission Control & Deep Space Observatory</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-outfit tracking-tight text-white uppercase leading-[1.1]">
            COMMAND CENTER FOR <br />
            <span className="nasa-gradient-text text-glow-cyan">
              DEEP SPACE EXPLORATION
            </span>
          </h1>

          {/* Concise Orientation Paragraph */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Inspect real-time 3D planetary orbits, analyze NASA and NOAA space weather telemetry, review verified flight manifests, and simulate gravitational astrodynamics.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link to="/explore">
              <Button
                size="lg"
                variant="primary"
                leftIcon={<Globe className="w-4 h-4" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Launch 3D Planetarium
              </Button>
            </Link>

            <Link to="/missions">
              <Button
                size="lg"
                variant="secondary"
                leftIcon={<Radio className="w-4 h-4 text-amber-400" />}
              >
                Flight Manifest
              </Button>
            </Link>

            <Link to="/simulate/mission-designer">
              <Button
                size="lg"
                variant="outline"
                leftIcon={<Orbit className="w-4 h-4 text-cyan-400" />}
              >
                Plan Trajectory
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 space-y-14">

        {/* First-Time User Onboarding Guide (Friendly & Dismissable) */}
        <FirstTimeGuide />

        {/* SECTION B: Real System Status & Telemetry Hub */}
        <section aria-labelledby="telemetry-overview" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h2 id="telemetry-overview" className="text-xs uppercase font-mono font-bold tracking-wider text-slate-300">
                Live Deep Space Telemetry Hub
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Verified NASA / NOAA / JPL Data Feeds
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
            
            {/* Telemetry Card 1: Deep Space Network */}
            <div className="hud-card p-4 rounded-xl border border-slate-800/80 bg-space-900/80">
              <div className="hud-corner-tl" />
              <div className="hud-corner-br" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-400 uppercase">DEEP SPACE NETWORK</span>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-base font-bold text-white font-outfit">DSN LINK: LOCKED</div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">
                Goldstone (DSS-14) & Madrid (DSS-63) Active
              </p>
            </div>

            {/* Telemetry Card 2: Space Weather */}
            <Link to="/observatory/space-weather" className="hud-card p-4 rounded-xl border border-slate-800/80 hover:border-amber-400/40 transition-all bg-space-900/80 group">
              <div className="hud-corner-tl" />
              <div className="hud-corner-br" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-400 uppercase">SOLAR WIND (DSCOVR)</span>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-base font-bold text-amber-400 font-outfit group-hover:text-amber-300">
                {weather.solarWind.speedKms} km/s
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">
                <GlossaryTooltip term="Kp Index">Kp {weather.geomagneticIndex.kpCurrent.toFixed(1)}</GlossaryTooltip> • {weather.geomagneticIndex.stormLevel}
              </p>
            </Link>

            {/* Telemetry Card 3: Planetary Defense */}
            <Link to="/observatory/neo" className="hud-card p-4 rounded-xl border border-slate-800/80 hover:border-cyan-400/40 transition-all bg-space-900/80 group">
              <div className="hud-corner-tl" />
              <div className="hud-corner-br" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-400 uppercase">PLANETARY DEFENSE</span>
                <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-base font-bold text-cyan-400 font-outfit group-hover:text-cyan-300">
                DEFCON 5 / NOMINAL
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">
                {ASTEROIDS_DATABASE.length} Flagged NEOs • 0 High-Risk Threats
              </p>
            </Link>

            {/* Telemetry Card 4: Cataloged Worlds */}
            <Link to="/discover/exoplanets" className="hud-card p-4 rounded-xl border border-slate-800/80 hover:border-emerald-400/40 transition-all bg-space-900/80 group">
              <div className="hud-corner-tl" />
              <div className="hud-corner-br" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-400 uppercase">CONFIRMED WORLDS</span>
                <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-base font-bold text-emerald-400 font-outfit group-hover:text-emerald-300">
                5,630+ WORLDS
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">
                8 Planets + 68 Habitable Zone Candidates
              </p>
            </Link>

          </div>
        </section>

        {/* SECTION C: Featured Celestial Inspection Console */}
        <section aria-labelledby="target-inspector" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="cyan">Interactive Target Dossier</Badge>
                <Badge variant="neutral">Authentic Ephemeris</Badge>
              </div>
              <h2 id="target-inspector" className="text-2xl sm:text-3xl font-extrabold text-white font-outfit uppercase">
                Planetary Target Inspection
              </h2>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              <span>Launch Full 3D Interactive Viewport</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Planet Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
            {PLANETS.map((planet, idx) => (
              <button
                key={planet.id}
                role="tab"
                aria-selected={selectedTargetIndex === idx}
                onClick={() => setSelectedTargetIndex(idx)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap border ${
                  selectedTargetIndex === idx
                    ? 'bg-space-850 text-cyan-300 border-cyan-400/50 shadow-[0_0_12px_rgba(0,242,255,0.15)] font-bold'
                    : 'bg-space-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: planet.colorHex }}
                />
                <span>{planet.name}</span>
              </button>
            ))}
          </div>

          {/* Selected World Interactive Card */}
          <div className="hud-card flex flex-col lg:flex-row items-center gap-10 rounded-3xl p-6 sm:p-10 relative overflow-hidden bg-space-900/90 border border-slate-800">
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />

            {/* Ambient Background Aura */}
            <div 
              className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
              style={{ backgroundColor: activePlanet.colorHex }}
            />

            {/* Left Column: Data & Narrative */}
            <div className="w-full lg:w-3/5 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="cyan">#{activePlanet.orderFromSun} From Sun</Badge>
                <Badge variant="neutral">{activePlanet.type}</Badge>
                {activePlanet.hasRings && <Badge variant="gold">Ring System</Badge>}
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white font-outfit uppercase">
                {activePlanet.name}
              </h3>
              <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-wide">
                {activePlanet.tagline}
              </p>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans line-clamp-3">
                {activePlanet.overview}
              </p>

              {/* Physical Parameters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-space-950/80 border border-slate-800">
                  <span className="text-slate-500 uppercase text-[10px] block">Mean Distance</span>
                  <span className="text-white font-bold mt-0.5 block font-outfit">
                    {activePlanet.distanceAu} <GlossaryTooltip term="AU">AU</GlossaryTooltip>
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-space-950/80 border border-slate-800">
                  <span className="text-slate-500 uppercase text-[10px] block">Equat. Diameter</span>
                  <span className="text-white font-bold mt-0.5 block font-outfit">
                    {formatNumber(activePlanet.diameterKm)} km
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-space-950/80 border border-slate-800">
                  <span className="text-slate-500 uppercase text-[10px] block">Surface Gravity</span>
                  <span className="text-white font-bold mt-0.5 block font-outfit">
                    {activePlanet.surfaceGravityMs2} m/s²
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-space-950/80 border border-slate-800">
                  <span className="text-slate-500 uppercase text-[10px] block">Mean Temp</span>
                  <span className="text-white font-bold mt-0.5 block font-outfit">
                    {activePlanet.avgTempCelsius}°C
                  </span>
                </div>
              </div>

              {/* CTA links */}
              <div className="pt-2 flex flex-wrap gap-3">
                <Link to={`/explore/${activePlanet.id}`}>
                  <Button
                    size="sm"
                    variant="primary"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Open {activePlanet.name} Dossier
                  </Button>
                </Link>

                <Link to="/explore">
                  <Button
                    size="sm"
                    variant="secondary"
                    leftIcon={<Globe className="w-3.5 h-3.5 text-cyan-400" />}
                  >
                    Locate in 3D Planetarium
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Planetary Visual Representation */}
            <div className="w-full lg:w-2/5 flex flex-col items-center justify-center p-4">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full flex items-center justify-center">
                {/* Outer atmospheric aura */}
                <div 
                  className="absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse-slow"
                  style={{ backgroundColor: activePlanet.colorHex }}
                />

                {/* Spherical Planet Body */}
                <div 
                  className="w-full h-full rounded-full border border-white/20 relative overflow-hidden shadow-2xl flex items-center justify-center"
                  style={{ 
                    background: `radial-gradient(circle at 35% 35%, ${activePlanet.accentColor}, ${activePlanet.roughColor}, #020205)` 
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-white/10" />
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-[11px] font-mono text-slate-400">
                  Orbital Period: {activePlanet.orbitalPeriodDays.toFixed(0)} Earth Days
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION D: Command Operations Workflow Hub */}
        <section aria-labelledby="operations-hub" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="cyan">Command Workflows</Badge>
                <Badge variant="neutral">6 Specialized Consoles</Badge>
              </div>
              <h2 id="operations-hub" className="text-2xl sm:text-3xl font-extrabold text-white font-outfit uppercase">
                Observatories & Flight Simulators
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-400">
              Select an operational suite to start inquiry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Console 1: 3D Solar System */}
            <Link
              to="/explore"
              className="hud-card p-5 rounded-2xl border border-slate-800 hover:border-cyan-400/50 transition-all group relative overflow-hidden"
            >
              <div className="hud-corner-tl" />
              <div className="hud-corner-br" />
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-space-950 border border-slate-800 text-cyan-400">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/30">
                  3D ENGINE
                </span>
              </div>
              <h3 className="text-lg font-outfit font-bold text-white group-hover:text-cyan-300 transition-colors">
                Solar System Planetarium
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
                Explore all 8 planetary bodies and the Sun in real-time 3D. Control simulation speeds, examine axial tilts, and inspect authentic physical and orbital parameters.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-mono text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Launch Viewport</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Console 2: Missions Archive */}
            <Link
              to="/missions"
              className="hud-card p-5 rounded-2xl border border-slate-800 hover:border-amber-400/50 transition-all group relative overflow-hidden"
            >
              <div className="hud-corner-tl" />
              <div className="hud-corner-br" />
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-space-950 border border-slate-800 text-amber-400">
                  <Radio className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/30">
                  FLIGHT OPS
                </span>
              </div>
              <h3 className="text-lg font-outfit font-bold text-white group-hover:text-amber-300 transition-colors">
                Space Missions Archive
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
                Filter and inspect iconic human spaceflight and robotic expeditions from Apollo and Voyager to Curiosity, James Webb, and the Artemis lunar campaign.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-mono text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Browse Manifest</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Console 3: Planetary Defense & Asteroids */}
            <Link
              to="/observatory/neo"
              className="hud-card p-5 rounded-2xl border border-slate-800 hover:border-cyan-400/50 transition-all group relative overflow-hidden"
            >
              <div className="hud-corner-tl" />
              <div className="hud-corner-br" />
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-space-950 border border-slate-800 text-cyan-400">
                  <Crosshair className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/30">
                  CNEOS / JPL
                </span>
              </div>
              <h3 className="text-lg font-outfit font-bold text-white group-hover:text-cyan-300 transition-colors">
                Asteroid & NEO Observatory
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
                Track Near-Earth Objects, inspect the upcoming 2029 radar flyby trajectory of Asteroid Apophis, and analyze Torino and Palermo impact hazard scales.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-mono text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Inspect NEO Radar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Console 4: Mission Trajectory Designer */}
            <Link
              to="/simulate/mission-designer"
              className="hud-card p-5 rounded-2xl border border-slate-800 hover:border-emerald-400/50 transition-all group relative overflow-hidden"
            >
              <div className="hud-corner-tl" />
              <div className="hud-corner-br" />
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-space-950 border border-slate-800 text-emerald-400">
                  <Orbit className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">
                  TRAJECTORY
                </span>
              </div>
              <h3 className="text-lg font-outfit font-bold text-white group-hover:text-emerald-300 transition-colors">
                Space Mission Designer
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
                Compute heliocentric <GlossaryTooltip term="Hohmann Transfer">Hohmann transfer orbits</GlossaryTooltip>, calculate multi-stage <GlossaryTooltip term="Delta-V">Delta-V</GlossaryTooltip> budgets, and solve the Tsiolkovsky rocket equation with payload tradeoffs.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-mono text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Plan Mission</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Console 5: Orbital Mechanics Lab */}
            <Link
              to="/orbital-lab"
              className="hud-card p-5 rounded-2xl border border-slate-800 hover:border-cyan-400/50 transition-all group relative overflow-hidden"
            >
              <div className="hud-corner-tl" />
              <div className="hud-corner-br" />
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-space-950 border border-slate-800 text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/30">
                  PHYSICS
                </span>
              </div>
              <h3 className="text-lg font-outfit font-bold text-white group-hover:text-cyan-300 transition-colors">
                Orbital Mechanics Lab
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
                Experiment with real-time Newtonian mechanics. Modify velocity vectors, test circular and escape speeds, and verify energy conservation with a symplectic integrator.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-mono text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Launch Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Console 6: Space Weather */}
            <Link
              to="/observatory/space-weather"
              className="hud-card p-5 rounded-2xl border border-slate-800 hover:border-amber-400/50 transition-all group relative overflow-hidden"
            >
              <div className="hud-corner-tl" />
              <div className="hud-corner-br" />
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-space-950 border border-slate-800 text-amber-400">
                  <Sun className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/30">
                  NOAA SWPC
                </span>
              </div>
              <h3 className="text-lg font-outfit font-bold text-white group-hover:text-amber-300 transition-colors">
                Space Weather Observatory
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
                Real-time solar wind speed, proton plasma density, interplanetary magnetic field (IMF Bz), solar flare classifications, and live aurora oval visibility forecasts.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-mono text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Check Space Weather</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

          </div>
        </section>

        {/* SECTION E: Recent Activity & NASA APOD Preview */}
        <section aria-labelledby="apod-preview" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="cyan">NASA APOD</Badge>
                <Badge variant="neutral">Verified Dispatch</Badge>
              </div>
              <h2 id="apod-preview" className="text-2xl sm:text-3xl font-extrabold text-white font-outfit uppercase">
                Astronomy Picture of the Day
              </h2>
            </div>
            <Link
              to="/discover"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              <span>View Full Archive & High-Res Image</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="hud-card rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center bg-space-900/90 border border-slate-800">
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />

            <img
              src={featuredDiscovery.url}
              alt={featuredDiscovery.title}
              className="w-full md:w-80 h-52 object-cover rounded-xl border border-slate-700/80 flex-shrink-0"
              loading="lazy"
            />

            <div className="space-y-3 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                <Badge variant="cyan">{featuredDiscovery.date}</Badge>
                <span>Agency: {featuredDiscovery.creditAgency}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-outfit">
                {featuredDiscovery.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-3">
                {featuredDiscovery.explanation}
              </p>

              <div className="pt-2">
                <Link to="/discover">
                  <Button
                    size="sm"
                    variant="primary"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Read Scientific Analysis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION F: Scientific Concepts Primer (For Beginners) */}
        <section aria-labelledby="primer-heading" className="p-6 sm:p-8 rounded-2xl bg-space-900/70 border border-slate-800/80 space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400" />
            <h3 id="primer-heading" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Essential Spaceflight & Astrodynamics Concepts
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Hover or tap any underlined scientific term throughout the application to read concise definitions:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-space-950 border border-slate-800/80 text-center">
              <GlossaryTooltip term="AU">1 AU (150M km)</GlossaryTooltip>
            </div>
            <div className="p-2.5 rounded-lg bg-space-950 border border-slate-800/80 text-center">
              <GlossaryTooltip term="Delta-V">Delta-V (Δv)</GlossaryTooltip>
            </div>
            <div className="p-2.5 rounded-lg bg-space-950 border border-slate-800/80 text-center">
              <GlossaryTooltip term="Hohmann Transfer">Hohmann Transfer</GlossaryTooltip>
            </div>
            <div className="p-2.5 rounded-lg bg-space-950 border border-slate-800/80 text-center">
              <GlossaryTooltip term="Lagrange Points">Lagrange L1–L5</GlossaryTooltip>
            </div>
            <div className="p-2.5 rounded-lg bg-space-950 border border-slate-800/80 text-center">
              <GlossaryTooltip term="Kp Index">Kp Index (0–9)</GlossaryTooltip>
            </div>
            <div className="p-2.5 rounded-lg bg-space-950 border border-slate-800/80 text-center">
              <GlossaryTooltip term="Transit Depth">Transit Depth</GlossaryTooltip>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
