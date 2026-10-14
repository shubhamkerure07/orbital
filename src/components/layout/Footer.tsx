import React from 'react';
import { Link } from 'react-router-dom';
import { Orbit, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#030712] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-holo-cyan/10 border border-holo-cyan/40 flex items-center justify-center text-holo-cyan">
                <Orbit className="w-4 h-4" />
              </div>
              <span className="font-outfit font-black tracking-widest text-lg text-white">ORBITAL</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-holo-cyan/10 text-holo-cyan border border-holo-cyan/30">v2.0</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Explore Beyond What You Know. A scientific observatory, spacecraft navigation interface, and interactive planetarium engineered with verified astronomical datasets.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>NASA CNEOS • NOAA SWPC • JPL Horizons Verified</span>
            </div>
          </div>

          {/* Column 2: Observatories & Exploration */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-holo-cyan mb-4">
              Observatories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/explore" className="hover:text-holo-cyan transition-colors">3D Solar System</Link></li>
              <li><Link to="/observatory/neo" className="hover:text-holo-cyan transition-colors">NEO & Asteroids (CNEOS)</Link></li>
              <li><Link to="/observatory/space-weather" className="hover:text-holo-cyan transition-colors">Space Weather (NOAA)</Link></li>
              <li><Link to="/discover/exoplanets" className="hover:text-holo-cyan transition-colors">Exoplanet Laboratory</Link></li>
            </ul>
          </div>

          {/* Column 3: Science & Simulations */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-holo-cyan mb-4">
              Simulators & Intel
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/orbital-lab" className="hover:text-holo-cyan transition-colors">Orbital Mechanics Lab</Link></li>
              <li><Link to="/simulate/mission-designer" className="hover:text-holo-cyan transition-colors">Space Mission Designer</Link></li>
              <li><Link to="/discover/knowledge-graph" className="hover:text-holo-cyan transition-colors">Universe Knowledge Graph</Link></li>
              <li><Link to="/intelligence" className="hover:text-holo-cyan transition-colors">Scientific Intelligence</Link></li>
            </ul>
          </div>

          {/* Column 4: Primary Scientific Sources */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-holo-cyan mb-4">
              Verified Sources
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-mono">
              <li><a href="https://science.nasa.gov/solar-system/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">NASA Horizons <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://cneos.jpl.nasa.gov/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">JPL CNEOS <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://www.swpc.noaa.gov/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">NOAA SWPC <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">NASA Exoplanet Archive <ExternalLink className="w-2.5 h-2.5" /></a></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <p>© 2026 ORBITAL Platform. Designed for scientific inquiry, education, and aerospace discovery.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <span>Non-commercial open scientific platform</span>
            <span>Version 2.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
