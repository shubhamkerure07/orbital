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
  ExternalLink
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
    <div className="flex flex-col min-h-screen space-stars-bg">
      
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center overflow-hidden border-b border-slate-800/80">
        
        {/* Background Atmosphere & Planetary Visual Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full bg-gradient-to-b from-blue-600/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />
        
        {/* Subtle Horizon Arc */}
        <div className="absolute -bottom-96 left-1/2 -translate-x-1/2 w-[1200px] sm:w-[1800px] h-[600px] rounded-[100%] border-t-2 border-cyan-400/20 bg-gradient-to-b from-cyan-950/20 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 pt-12">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-space-900/90 border border-gold-500/30 text-xs font-mono text-gold-400 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Spaceflight & Astronomical Observatory</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-100 font-mono tracking-tight leading-[1.1]">
            THE UNIVERSE IS YOURS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-amber-300 to-cyan-400">
              TO EXPLORE.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Travel across worlds, discover humanity’s greatest space missions, and explore the fundamental gravitational physics that shapes our universe.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/explore"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-space-950 font-bold font-mono text-sm transition-all shadow-xl shadow-gold-500/20 group"
            >
              <span>Begin Exploration</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/missions"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-space-900 hover:bg-space-850 text-slate-200 border border-slate-700/80 hover:border-gold-500/40 font-mono text-sm transition-all"
            >
              <Radio className="w-4 h-4 text-gold-400" />
              <span>Explore Missions</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-space-900/80 border border-slate-800 backdrop-blur-sm">
              <span className="text-slate-500 uppercase text-[10px] block">Planetary Bodies</span>
              <span className="text-slate-200 font-bold text-lg">8 Worlds + Sun</span>
            </div>
            <div className="p-3.5 rounded-xl bg-space-900/80 border border-slate-800 backdrop-blur-sm">
              <span className="text-slate-500 uppercase text-[10px] block">Space Missions</span>
              <span className="text-gold-400 font-bold text-lg">Verified Archive</span>
            </div>
            <div className="p-3.5 rounded-xl bg-space-900/80 border border-slate-800 backdrop-blur-sm">
              <span className="text-slate-500 uppercase text-[10px] block">Launch Vehicles</span>
              <span className="text-cyan-400 font-bold text-lg">Multistage Sim</span>
            </div>
            <div className="p-3.5 rounded-xl bg-space-900/80 border border-slate-800 backdrop-blur-sm">
              <span className="text-slate-500 uppercase text-[10px] block">Orbital Physics</span>
              <span className="text-emerald-400 font-bold text-lg">Newtonian 2-Body</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-500 animate-bounce">
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* Section A: Featured Planet Spotlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 rounded-3xl bg-space-900/80 border border-slate-800 p-8 sm:p-12 relative overflow-hidden">
          
          <div 
            className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: featuredPlanet.colorHex }}
          />

          <div className="w-full lg:w-1/2 space-y-5">
            <div className="flex items-center gap-2">
              <Badge variant="gold">Planetary Spotlight</Badge>
              <Badge variant="neutral">#{featuredPlanet.orderFromSun} From Sun</Badge>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono tracking-tight">
              {featuredPlanet.name}
            </h2>
            <p className="text-gold-400 font-mono text-sm">{featuredPlanet.tagline}</p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {featuredPlanet.overview}
            </p>

            {/* Measurements Grid */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
              <div className="p-3 rounded-xl bg-space-950 border border-slate-800">
                <span className="text-slate-500 uppercase text-[10px] block">Equatorial Diameter</span>
                <span className="text-slate-200 font-bold text-sm mt-0.5 block">{formatNumber(featuredPlanet.diameterKm)} km</span>
              </div>
              <div className="p-3 rounded-xl bg-space-950 border border-slate-800">
                <span className="text-slate-500 uppercase text-[10px] block">Surface Gravity</span>
                <span className="text-slate-200 font-bold text-sm mt-0.5 block">{featuredPlanet.surfaceGravityMs2} m/s² ({featuredPlanet.gravityEarthRelative}g)</span>
              </div>
              <div className="p-3 rounded-xl bg-space-950 border border-slate-800">
                <span className="text-slate-500 uppercase text-[10px] block">Orbital Year</span>
                <span className="text-slate-200 font-bold text-sm mt-0.5 block">{featuredPlanet.orbitalPeriodDays.toFixed(0)} Earth Days</span>
              </div>
              <div className="p-3 rounded-xl bg-space-950 border border-slate-800">
                <span className="text-slate-500 uppercase text-[10px] block">Average Temp</span>
                <span className="text-slate-200 font-bold text-sm mt-0.5 block">{featuredPlanet.avgTempCelsius}°C</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to={`/explore/${featuredPlanet.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-space-950 font-bold font-mono text-xs transition-colors"
              >
                <span>Explore {featuredPlanet.name} Complete Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full flex items-center justify-center shadow-2xl">
              {/* Outer atmospheric aura */}
              <div 
                className="absolute inset-0 rounded-full blur-xl opacity-40 animate-pulse"
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
            <span className="text-xs font-mono uppercase text-gold-400 tracking-wider flex items-center gap-1.5 mb-1">
              <Globe className="w-4 h-4" /> Celestial Inventory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">
              The Solar System At A Glance
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs font-mono text-gold-400 hover:underline flex items-center gap-1 font-semibold"
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
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider flex items-center gap-1.5 mb-1">
              <Radio className="w-4 h-4" /> Flight Operations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">
              Humanity&apos;s Greatest Space Missions
            </h2>
          </div>
          <Link
            to="/missions"
            className="text-xs font-mono text-gold-400 hover:underline flex items-center gap-1 font-semibold"
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
        <div className="rounded-3xl bg-gradient-to-br from-space-900 to-space-950 border border-slate-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <Badge variant="purple">Deep Astrophysics</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">
              Beyond Our Solar System: Exoplanets & The Deep Cosmos
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Astronomers have confirmed over 5,500 planets orbiting distant stars in our galaxy. From the temperate rocky worlds of TRAPPIST-1 to supermassive black holes at galactic centers, humanity’s horizon expands every single day.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/destinations"
                className="px-5 py-2.5 rounded-xl bg-space-800 hover:bg-space-750 text-slate-200 border border-slate-700 text-xs font-mono font-semibold transition-colors"
              >
                Explore TRAPPIST-1e & Ocean Worlds &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section E: Orbital Lab Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-space-900 border border-slate-800 p-8 sm:p-12">
          <div className="lg:col-span-6 space-y-5">
            <Badge variant="green">Newtonian Physics Engine</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">
              Orbital Mechanics Laboratory
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Experiment with gravitational attraction, test Hohmann transfer orbits, tweak initial velocity vectors, and experience why reaching orbit is fundamentally a game of tangential speed rather than height.
            </p>
            <div className="p-4 rounded-xl bg-space-950 border border-slate-800 font-mono text-xs text-slate-400 space-y-2">
              <div className="flex justify-between text-slate-200 font-semibold">
                <span>Circular Orbit Condition:</span>
                <span className="text-gold-400">v = √(GM / r)</span>
              </div>
              <div className="flex justify-between text-slate-200 font-semibold">
                <span>Escape Trajectory Threshold:</span>
                <span className="text-emerald-400">v_esc = √(2GM / r)</span>
              </div>
            </div>
            <Link
              to="/orbital-lab"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-space-950 font-bold font-mono text-xs transition-colors shadow-lg shadow-gold-500/20"
            >
              <span>Launch Orbital Mechanics Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-space-950 rounded-2xl border border-slate-800 relative">
            {/* Visual orbit illustration */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gold-500 shadow-xl shadow-gold-500/40 flex items-center justify-center text-space-950 font-mono font-bold text-xs">
                M
              </div>
              <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-spin-slow" />
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-100 shadow-md shadow-cyan-400" />
            </div>
            <span className="text-[11px] font-mono text-slate-500 mt-4">
              Real-time Symplectic Velocity Verlet Integrator
            </span>
          </div>
        </div>
      </section>

      {/* Section F: Space Discovery Spotlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase text-purple-400 tracking-wider flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4" /> Astrophysics Dispatch
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">
              Latest Cosmic Discoveries
            </h2>
          </div>
          <Link
            to="/discover"
            className="text-xs font-mono text-gold-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Open Astronomy Picture Archive</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="rounded-2xl bg-space-900 border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center">
          <img
            src={featuredDiscovery.url}
            alt={featuredDiscovery.title}
            className="w-full md:w-80 h-52 object-cover rounded-xl border border-slate-800"
          />
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Badge variant="cyan">{featuredDiscovery.date}</Badge>
              <span>{featuredDiscovery.creditAgency}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-100 font-mono">
              {featuredDiscovery.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
              {featuredDiscovery.explanation}
            </p>
            <Link
              to="/discover"
              className="inline-flex items-center gap-1 text-gold-400 font-mono text-xs font-semibold hover:underline"
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
