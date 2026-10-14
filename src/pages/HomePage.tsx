import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Orbit, 
  ArrowRight, 
  Compass, 
  Radio, 
  Rocket, 
  ChevronDown, 
  Globe, 
  Cpu, 
  Sparkles, 
  ShieldCheck,
  Activity,
  Terminal,
  Layers
} from 'lucide-react';
import { PLANETS } from '../data/planets';
import { MISSIONS } from '../data/missions';
import { DISCOVERIES } from '../data/discoveries';
import { Badge } from '../components/common/Badge';
import { PlanetCard } from '../components/planets/PlanetCard';
import { MissionCard } from '../components/missions/MissionCard';
import { formatNumber } from '../utils/formatting';

export const HomePage: React.FC = () => {
  const featuredPlanet = PLANETS[3]; // Mars
  const spotlightMissions = MISSIONS.slice(0, 3);
  const featuredDiscovery = DISCOVERIES[0];

  return (
    <div className="flex flex-col min-h-screen cosmic-dust">
      
      {/* Cinematic Mission Control Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center overflow-hidden border-b border-white/10">
        
        {/* Atmospheric Blue / Cyan Light Beams */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-b from-[#00f2ff]/15 via-[#0b3d91]/20 to-transparent blur-[120px] pointer-events-none" />
        
        {/* Subtle Cyber Horizon Curved Grid Line */}
        <div className="absolute -bottom-96 left-1/2 -translate-x-1/2 w-[1400px] sm:w-[2000px] h-[600px] rounded-[100%] border-t border-holo-cyan/30 shadow-[0_0_50px_rgba(0,242,255,0.2)] bg-gradient-to-b from-holo-cyan/5 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-6 pt-10">
          
          {/* Tactical Mission Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-space-900/90 border border-holo-cyan/40 text-xs font-mono text-holo-cyan shadow-[0_0_20px_rgba(0,242,255,0.25)]">
            <span className="w-2 h-2 rounded-full bg-holo-cyan animate-pulse" />
            <span className="tracking-wider">DEEP SPACE OBSERVATORY & SCIENTIFIC NAVIGATION CONSOLE</span>
          </div>

          {/* Hero Heading in Outfit Black Typography */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-outfit tracking-[-0.03em] text-white leading-[1.08] uppercase">
            THE UNIVERSE IS YOURS <br />
            <span className="nasa-gradient-text text-glow-cyan">
              TO EXPLORE.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans font-light">
            Travel across worlds, discover humanity’s greatest space missions, and explore the fundamental gravitational physics that shapes our universe.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/explore"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-holo-cyan hover:bg-[#33f5ff] text-space-950 font-bold font-mono text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(0,242,255,0.4)] group"
            >
              <span>Begin Exploration</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/missions"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-space-900/90 hover:bg-space-850 text-slate-200 border border-slate-700/80 hover:border-holo-cyan/60 font-mono text-xs sm:text-sm tracking-wider uppercase transition-all hover:shadow-[0_0_20px_rgba(0,242,255,0.15)]"
            >
              <Radio className="w-4 h-4 text-holo-cyan" />
              <span>Explore Missions</span>
            </Link>
          </div>

          {/* HUD Tactical Telemetry Quick-Read Bar */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left font-mono text-xs">
            <div className="hud-card p-4 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-holo-cyan" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-holo-cyan" />
              <span className="text-slate-400 uppercase text-[10px] block">Planetary System</span>
              <span className="text-white font-bold text-lg mt-0.5 block font-outfit">8 Worlds + Sun</span>
              <span className="text-[10px] text-holo-cyan/80">3D Interactive Ephemeris</span>
            </div>

            <div className="hud-card p-4 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-holo-cyan" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-holo-cyan" />
              <span className="text-slate-400 uppercase text-[10px] block">Space Missions</span>
              <span className="text-gold-400 font-bold text-lg mt-0.5 block font-outfit">Verified Archive</span>
              <span className="text-[10px] text-slate-400">Apollo to JWST & Artemis</span>
            </div>

            <div className="hud-card p-4 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-holo-cyan" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-holo-cyan" />
              <span className="text-slate-400 uppercase text-[10px] block">Launch Vehicles</span>
              <span className="text-holo-cyan font-bold text-lg mt-0.5 block font-outfit">Multistage Sim</span>
              <span className="text-[10px] text-slate-400">Falcon, Saturn, SLS, Starship</span>
            </div>

            <div className="hud-card p-4 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-holo-cyan" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-holo-cyan" />
              <span className="text-slate-400 uppercase text-[10px] block">Orbital Physics</span>
              <span className="text-emerald-400 font-bold text-lg mt-0.5 block font-outfit">Velocity Verlet</span>
              <span className="text-[10px] text-slate-400">F = GMm/r² Live Numerical</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-500 animate-bounce">
          <span className="text-[9px] font-mono uppercase tracking-widest text-holo-cyan">Telemetry Scan</span>
          <ChevronDown className="w-4 h-4 text-holo-cyan" />
        </div>
      </section>

      {/* Section A: Featured Planet Spotlight (Mars) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="hud-card flex flex-col lg:flex-row items-center gap-12 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          
          {/* Tactical Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-holo-cyan" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-holo-cyan" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-holo-cyan" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-holo-cyan" />

          <div 
            className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: featuredPlanet.colorHex }}
          />

          <div className="w-full lg:w-1/2 space-y-5">
            <div className="flex items-center gap-2">
              <Badge variant="gold">Target Dossier</Badge>
              <Badge variant="cyan">#{featuredPlanet.orderFromSun} From Sun</Badge>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white font-outfit tracking-tight uppercase">
              {featuredPlanet.name}
            </h2>
            <p className="text-holo-cyan font-mono text-sm tracking-wide">{featuredPlanet.tagline}</p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              {featuredPlanet.overview}
            </p>

            {/* Measurements Grid */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-space-950/80 border border-white/5">
                <span className="text-slate-500 uppercase text-[10px] block">Equatorial Diameter</span>
                <span className="text-white font-bold text-sm mt-0.5 block font-outfit">{formatNumber(featuredPlanet.diameterKm)} km</span>
              </div>
              <div className="p-3.5 rounded-xl bg-space-950/80 border border-white/5">
                <span className="text-slate-500 uppercase text-[10px] block">Surface Gravity</span>
                <span className="text-white font-bold text-sm mt-0.5 block font-outfit">{featuredPlanet.surfaceGravityMs2} m/s² ({featuredPlanet.gravityEarthRelative}g)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-space-950/80 border border-white/5">
                <span className="text-slate-500 uppercase text-[10px] block">Orbital Year</span>
                <span className="text-white font-bold text-sm mt-0.5 block font-outfit">{featuredPlanet.orbitalPeriodDays.toFixed(0)} Earth Days</span>
              </div>
              <div className="p-3.5 rounded-xl bg-space-950/80 border border-white/5">
                <span className="text-slate-500 uppercase text-[10px] block">Mean Temperature</span>
                <span className="text-white font-bold text-sm mt-0.5 block font-outfit">{featuredPlanet.avgTempCelsius}°C</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to={`/explore/${featuredPlanet.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-holo-cyan hover:bg-[#33f5ff] text-space-950 font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)]"
              >
                <span>Access Full {featuredPlanet.name} Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full flex items-center justify-center shadow-2xl">
              {/* Outer atmospheric aura */}
              <div 
                className="absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse"
                style={{ backgroundColor: featuredPlanet.colorHex }}
              />
              {/* Spherical Body */}
              <div 
                className="w-full h-full rounded-full border border-white/20 relative overflow-hidden shadow-inner flex items-center justify-center"
                style={{ 
                  background: `radial-gradient(circle at 35% 35%, ${featuredPlanet.accentColor}, ${featuredPlanet.roughColor}, #000000)` 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-70" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section B: Solar System Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase text-holo-cyan tracking-wider flex items-center gap-1.5 mb-1">
              <Globe className="w-4 h-4" /> Celestial Inventory
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-outfit uppercase">
              The Solar System At A Glance
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs font-mono text-holo-cyan hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Launch Interactive 3D Planetarium</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANETS.slice(0, 4).map((p) => (
            <PlanetCard key={p.id} planet={p} />
          ))}
        </div>
      </section>

      {/* Section C: Mission Spotlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase text-holo-cyan tracking-wider flex items-center gap-1.5 mb-1">
              <Radio className="w-4 h-4" /> Flight Operations
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-outfit uppercase">
              Humanity&apos;s Greatest Space Missions
            </h2>
          </div>
          <Link
            to="/missions"
            className="text-xs font-mono text-holo-cyan hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Browse All {MISSIONS.length} Verified Missions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spotlightMissions.map((m) => (
            <MissionCard 
              key={m.id} 
              mission={m} 
              onSelect={() => window.location.assign(`/missions?id=${m.id}`)} 
            />
          ))}
        </div>
      </section>

      {/* Section D: Beyond Our Solar System (Exoplanets & Deep Cosmos) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="hud-card rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-holo-cyan" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-holo-cyan" />
          
          <div className="max-w-2xl space-y-4">
            <Badge variant="purple">Deep Astrophysics</Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-outfit uppercase">
              Beyond Our Solar System: Exoplanets & The Deep Cosmos
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Astronomers have confirmed over 5,500 planets orbiting distant stars in our galaxy. From the temperate rocky worlds of TRAPPIST-1 to supermassive black holes at galactic centers, humanity’s horizon expands every single day.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/destinations"
                className="px-5 py-2.5 rounded-xl bg-space-850 hover:bg-space-800 text-holo-cyan border border-holo-cyan/40 text-xs font-mono font-semibold transition-all shadow-[0_0_15px_rgba(0,242,255,0.15)]"
              >
                Explore TRAPPIST-1e & Ocean Worlds &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section E: Orbital Lab Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="hud-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-holo-cyan" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-holo-cyan" />

          <div className="lg:col-span-6 space-y-5">
            <Badge variant="green">Newtonian Physics Engine</Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-outfit uppercase">
              Orbital Mechanics Laboratory
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Experiment with gravitational attraction, test Hohmann transfer orbits, tweak initial velocity vectors, and experience why reaching orbit is fundamentally a game of tangential speed rather than height.
            </p>
            <div className="p-4 rounded-xl bg-space-950/80 border border-white/5 font-mono text-xs text-slate-400 space-y-2">
              <div className="flex justify-between text-slate-200 font-semibold">
                <span>Circular Orbit Condition:</span>
                <span className="text-holo-cyan">v = √(GM / r)</span>
              </div>
              <div className="flex justify-between text-slate-200 font-semibold">
                <span>Escape Trajectory Threshold:</span>
                <span className="text-emerald-400">v_esc = √(2GM / r)</span>
              </div>
            </div>
            <Link
              to="/orbital-lab"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-holo-cyan hover:bg-[#33f5ff] text-space-950 font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)]"
            >
              <span>Launch Orbital Mechanics Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-space-950 rounded-2xl border border-white/5 relative">
            {/* Visual orbit illustration */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-holo-cyan shadow-[0_0_30px_rgba(0,242,255,0.6)] flex items-center justify-center text-space-950 font-mono font-black text-xs">
                M
              </div>
              <div className="absolute inset-0 rounded-full border border-dashed border-holo-cyan/40 animate-spin-slow" />
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_10px_#00f2ff]" />
            </div>
            <span className="text-[11px] font-mono text-slate-400 mt-4">
              Real-time Symplectic Velocity Verlet Integrator
            </span>
          </div>
        </div>
      </section>

      {/* Section E2: Connected Observatories & Laboratory Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase text-holo-cyan tracking-wider flex items-center gap-1.5 mb-1">
              <Layers className="w-4 h-4" /> Integrated Scientific Infrastructure
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-outfit uppercase">
              Connected Observatories & Laboratories
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            6 Specialized Scientific Suites
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Card 1: NEO Observatory */}
          <Link
            to="/observatory/neo"
            className="hud-card p-5 rounded-2xl border border-slate-800 hover:border-holo-cyan/50 transition-all group relative overflow-hidden"
          >
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-holo-cyan/15 text-holo-cyan border border-holo-cyan/40">
                NASA CNEOS
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-holo-cyan group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-outfit font-bold text-white group-hover:text-holo-cyan transition-colors">
              Asteroid & NEO Observatory
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
              Track 34,000+ near-Earth asteroids, inspect 2029 Apophis radar flyby trajectories, and analyze Torino impact hazard scales.
            </p>
          </Link>

          {/* Card 2: Space Weather */}
          <Link
            to="/observatory/space-weather"
            className="hud-card p-5 rounded-2xl border border-slate-800 hover:border-amber-400/50 transition-all group relative overflow-hidden"
          >
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-400/15 text-amber-400 border border-amber-400/40">
                NOAA SWPC
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-outfit font-bold text-white group-hover:text-amber-400 transition-colors">
              Space Weather Observatory
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
              Real-time solar wind speed, proton density, Kp index gauge, CME transit models, and live aurora oval visibility forecasts.
            </p>
          </Link>

          {/* Card 3: Exoplanets */}
          <Link
            to="/discover/exoplanets"
            className="hud-card p-5 rounded-2xl border border-slate-800 hover:border-emerald-400/50 transition-all group relative overflow-hidden"
          >
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-400/15 text-emerald-400 border border-emerald-400/40">
                JWST / CALTECH
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-outfit font-bold text-white group-hover:text-emerald-400 transition-colors">
              Exoplanet Discovery Lab
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
              Analyze 5,600+ confirmed exoplanets, test transit light curves ΔF/F = (Rp/R*)², and inspect JWST atmospheric molecules.
            </p>
          </Link>

          {/* Card 4: Mission Designer */}
          <Link
            to="/simulate/mission-designer"
            className="hud-card p-5 rounded-2xl border border-slate-800 hover:border-holo-cyan/50 transition-all group relative overflow-hidden"
          >
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-holo-cyan/15 text-holo-cyan border border-holo-cyan/40">
                TRAJECTORY SOLVER
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-holo-cyan group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-outfit font-bold text-white group-hover:text-holo-cyan transition-colors">
              Space Mission Designer
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
              Compute heliocentric Hohmann transfer arcs, solve Tsiolkovsky propellant mass staging, and store flight plans.
            </p>
          </Link>

          {/* Card 5: Knowledge Graph */}
          <Link
            to="/discover/knowledge-graph"
            className="hud-card p-5 rounded-2xl border border-slate-800 hover:border-purple-400/50 transition-all group relative overflow-hidden"
          >
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-400/15 text-purple-400 border border-purple-400/40">
                FORCE NETWORK
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-outfit font-bold text-white group-hover:text-purple-400 transition-colors">
              Universe Knowledge Graph
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
              Interactive 60 FPS topological force canvas revealing how black holes, stellar evolution, and orbital physics connect.
            </p>
          </Link>

          {/* Card 6: Scientific Intelligence */}
          <Link
            to="/intelligence"
            className="hud-card p-5 rounded-2xl border border-slate-800 hover:border-holo-cyan/50 transition-all group relative overflow-hidden"
          >
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-holo-cyan/15 text-holo-cyan border border-holo-cyan/40">
                ASTROPHYSICS REPO
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-holo-cyan group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-outfit font-bold text-white group-hover:text-holo-cyan transition-colors">
              Scientific Intelligence
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
              Validated LaTeX mathematical proofs, Lagrange L1-L5 points, Oberth effect derivations, and peer-reviewed citations.
            </p>
          </Link>

        </div>
      </section>

      {/* Section F: Space Discovery Spotlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase text-holo-cyan tracking-wider flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4" /> Astrophysics Dispatch
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-outfit uppercase">
              Latest Cosmic Discoveries
            </h2>
          </div>
          <Link
            to="/discover"
            className="text-xs font-mono text-holo-cyan hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Open Astronomy Picture Archive</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="hud-card rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center">
          <img
            src={featuredDiscovery.url}
            alt={featuredDiscovery.title}
            className="w-full md:w-80 h-52 object-cover rounded-xl border border-white/10"
          />
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Badge variant="cyan">{featuredDiscovery.date}</Badge>
              <span>{featuredDiscovery.creditAgency}</span>
            </div>
            <h3 className="text-xl font-bold text-white font-outfit">
              {featuredDiscovery.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
              {featuredDiscovery.explanation}
            </p>
            <Link
              to="/discover"
              className="inline-flex items-center gap-1 text-holo-cyan font-mono text-xs font-semibold hover:underline"
            >
              <span>Read Full Scientific Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
