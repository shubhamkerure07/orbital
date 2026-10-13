import React from 'react';
import { Link } from 'react-router-dom';
import { Orbit, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-space-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <Orbit className="w-4 h-4" />
              </div>
              <span className="font-mono font-bold tracking-widest text-lg text-slate-100">ORBITAL</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Explore Beyond What You Know. A scientific observatory, spacecraft navigation interface, and interactive planetarium engineered with verified astronomical datasets.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Public Scientific Data & Educational Physics</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-200 mb-4">
              Exploration
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/explore" className="hover:text-gold-400 transition-colors">3D Solar System</Link></li>
              <li><Link to="/missions" className="hover:text-gold-400 transition-colors">Mission Catalog</Link></li>
              <li><Link to="/rockets" className="hover:text-gold-400 transition-colors">Rocket Vehicles</Link></li>
              <li><Link to="/destinations" className="hover:text-gold-400 transition-colors">Planetary Worlds</Link></li>
            </ul>
          </div>

          {/* Column 3: Science & Tools */}
          <div>
            <h4 className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-200 mb-4">
              Laboratories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/orbital-lab" className="hover:text-gold-400 transition-colors">Orbital Mechanics Lab</Link></li>
              <li><Link to="/discover" className="hover:text-gold-400 transition-colors">Space Discoveries</Link></li>
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">Observatory Specs</Link></li>
              <li><a href="https://science.nasa.gov/" target="_blank" rel="noreferrer" className="hover:text-gold-400 transition-colors inline-flex items-center gap-1">NASA Science <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          {/* Column 4: Primary Scientific Sources */}
          <div>
            <h4 className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-200 mb-4">
              Verified Sources
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500 font-mono">
              <li><a href="https://science.nasa.gov/solar-system/" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors flex items-center justify-between">NASA Horizons <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://webb.nasa.gov/" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors flex items-center justify-between">JWST Science (STScI) <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://www.esa.int/" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors flex items-center justify-between">ESA Science <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://www.isro.gov.in/" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors flex items-center justify-between">ISRO Data <ExternalLink className="w-2.5 h-2.5" /></a></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <p>© 2026 ORBITAL Platform. Designed for scientific inquiry, education, and aerospace discovery.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <span>Non-commercial open educational interface</span>
            <span>All planetary ephemerides documented</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
