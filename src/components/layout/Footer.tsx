import React from 'react';
import { Link } from 'react-router-dom';
import { Orbit, ExternalLink, ShieldCheck, Activity, Wifi } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#02050e] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                <Orbit className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-outfit font-black tracking-widest text-lg text-white">ORBITAL</span>
                <span className="text-[9px] font-mono tracking-widest text-cyan-400 -mt-1 uppercase">Mission Control 1.2</span>
              </div>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Explore Beyond What You Know. A scientific space observatory, trajectory mission control, and interactive planetarium engineered with verified NASA, JPL, and NOAA datasets.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs font-mono text-slate-400 pt-2">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>NASA CNEOS Verified</span>
              </div>
              <span className="hidden sm:inline text-slate-700">•</span>
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Wifi className="w-3.5 h-3.5" />
                <span>JPL Solar System Dynamics</span>
              </div>
            </div>
          </div>

          {/* Column 2: Observatories & Planets */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-cyan-400 mb-4">
              Observatories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/explore" className="hover:text-cyan-300 transition-colors">3D Solar System</Link></li>
              <li><Link to="/destinations" className="hover:text-cyan-300 transition-colors">Planetary Targets</Link></li>
              <li><Link to="/observatory/neo" className="hover:text-cyan-300 transition-colors">NEO & Asteroids (CNEOS)</Link></li>
              <li><Link to="/observatory/space-weather" className="hover:text-cyan-300 transition-colors">Space Weather (NOAA)</Link></li>
              <li><Link to="/discover/exoplanets" className="hover:text-cyan-300 transition-colors">Exoplanet Laboratory</Link></li>
            </ul>
          </div>

          {/* Column 3: Flight Ops & Simulations */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-cyan-400 mb-4">
              Flight & Physics
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/missions" className="hover:text-cyan-300 transition-colors">Mission Flight Manifest</Link></li>
              <li><Link to="/rockets" className="hover:text-cyan-300 transition-colors">Launch Vehicle Staging</Link></li>
              <li><Link to="/orbital-lab" className="hover:text-cyan-300 transition-colors">Orbital Mechanics Lab</Link></li>
              <li><Link to="/simulate/mission-designer" className="hover:text-cyan-300 transition-colors">Mission Trajectory Designer</Link></li>
              <li><Link to="/discover/knowledge-graph" className="hover:text-cyan-300 transition-colors">Cosmic Knowledge Graph</Link></li>
              <li><Link to="/intelligence" className="hover:text-cyan-300 transition-colors">Scientific Treatises</Link></li>
            </ul>
          </div>

          {/* Column 4: Primary Scientific Sources */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-cyan-400 mb-4">
              Scientific Sources
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-mono">
              <li>
                <a href="https://science.nasa.gov/solar-system/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>NASA Horizons</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </a>
              </li>
              <li>
                <a href="https://cneos.jpl.nasa.gov/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>JPL CNEOS Sentry</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </a>
              </li>
              <li>
                <a href="https://www.swpc.noaa.gov/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>NOAA SWPC</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </a>
              </li>
              <li>
                <a href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>NASA Exoplanets</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-300 transition-colors flex items-center justify-between pt-1 text-slate-300">
                  <span>Architecture & Sources</span>
                  <span className="text-cyan-400">&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <p>© 2026 ORBITAL Platform. Designed for scientific inquiry, education, and aerospace discovery.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <span>Non-commercial open scientific architecture</span>
            <span className="text-cyan-400 font-semibold">Version 1.2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
