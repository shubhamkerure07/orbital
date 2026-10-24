import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Globe, Rocket, Compass, Radio, ExternalLink, Crosshair, ArrowRight, CornerDownLeft } from 'lucide-react';
import { PLANETS } from '../../data/planets';
import { MISSIONS } from '../../data/missions';
import { ROCKETS } from '../../data/rockets';
import { DESTINATIONS } from '../../data/destinations';
import { DISCOVERIES } from '../../data/discoveries';
import { ASTEROIDS_DATABASE } from '../../data/asteroids';
import { EXOPLANETS_DATABASE } from '../../data/exoplanets';
import { Badge } from '../common/Badge';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Planet' | 'Mission' | 'Rocket' | 'Destination' | 'Discovery' | 'Asteroid' | 'Exoplanet' | 'System';
  route: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const q = query.trim().toLowerCase();

  // Search through all core databases
  const results: SearchResultItem[] = [];

  if (q.length > 0) {
    // Planets
    PLANETS.forEach(p => {
      if (p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q) || p.overview.toLowerCase().includes(q)) {
        results.push({
          id: p.id,
          title: p.name,
          subtitle: `${p.type} • ${p.tagline}`,
          category: 'Planet',
          route: `/explore/${p.id}`
        });
      }
    });

    // Missions
    MISSIONS.forEach(m => {
      if (m.name.toLowerCase().includes(q) || m.destination.toLowerCase().includes(q) || m.agency.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)) {
        results.push({
          id: m.id,
          title: m.name,
          subtitle: `${m.agency} • ${m.destination} (${m.status})`,
          category: 'Mission',
          route: `/missions?id=${m.id}`
        });
      }
    });

    // Rockets
    ROCKETS.forEach(r => {
      if (r.name.toLowerCase().includes(q) || r.operator.toLowerCase().includes(q) || r.propulsionSummary.toLowerCase().includes(q)) {
        results.push({
          id: r.id,
          title: r.name,
          subtitle: `${r.operator} • ${r.status} (${r.stagesCount} Stages)`,
          category: 'Rocket',
          route: `/rockets?id=${r.id}`
        });
      }
    });

    // Destinations
    DESTINATIONS.forEach(d => {
      if (d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q) || d.overview.toLowerCase().includes(q)) {
        results.push({
          id: d.id,
          title: d.name,
          subtitle: `${d.category} • Orbiting ${d.parentBodyOrStar}`,
          category: 'Destination',
          route: `/destinations?id=${d.id}`
        });
      }
    });

    // Discoveries
    DISCOVERIES.forEach(disc => {
      if (disc.title.toLowerCase().includes(q) || disc.explanation.toLowerCase().includes(q) || disc.tags.some(t => t.toLowerCase().includes(q))) {
        results.push({
          id: disc.id,
          title: disc.title,
          subtitle: `${disc.date} • ${disc.creditAgency}`,
          category: 'Discovery',
          route: `/discover`
        });
      }
    });

    // Asteroids
    ASTEROIDS_DATABASE.forEach(ast => {
      if (ast.name.toLowerCase().includes(q) || ast.designation.toLowerCase().includes(q) || ast.summary.toLowerCase().includes(q)) {
        const nextApp = ast.closeApproaches && ast.closeApproaches.length > 0 ? ast.closeApproaches[0] : null;
        results.push({
          id: ast.id,
          title: ast.name,
          subtitle: `NEO / PHA • ${nextApp ? `Miss Distance: ${nextApp.missDistanceLd} LD (${nextApp.date})` : 'Main Belt'}`,
          category: 'Asteroid',
          route: `/observatory/neo`
        });
      }
    });

    // Exoplanets
    EXOPLANETS_DATABASE.forEach(exo => {
      if (exo.name.toLowerCase().includes(q) || exo.hostStar.name.toLowerCase().includes(q) || exo.planetType.toLowerCase().includes(q)) {
        results.push({
          id: exo.id,
          title: exo.name,
          subtitle: `${exo.planetType} • ${exo.distanceLightYears} ly • ${exo.hostStar.name} (${exo.isInHabitableZone ? 'Habitable Zone' : 'Extreme'})`,
          category: 'Exoplanet',
          route: `/discover/exoplanets`
        });
      }
    });

    // Core Platform Systems
    const coreSystems = [
      { name: 'Solar System 3D Planetarium', desc: 'Real-time 3D planetary ephemeris, axial tilts & orbits', route: '/explore', tags: ['planetarium', 'sun', 'orbit', 'solar', 'planets'] },
      { name: 'Space Weather Observatory', desc: 'Real-time solar wind, Kp index & aurora forecast', route: '/observatory/space-weather', tags: ['weather', 'sun', 'flare', 'cme', 'aurora', 'kp'] },
      { name: 'Space Mission Designer', desc: 'Hohmann transfer & Tsiolkovsky delta-V staging calculator', route: '/simulate/mission-designer', tags: ['designer', 'hohmann', 'delta-v', 'trajectory', 'staging', 'fuel'] },
      { name: 'Universe Knowledge Graph', desc: 'Interactive cosmic ontology & force-directed network', route: '/discover/knowledge-graph', tags: ['graph', 'ontology', 'network', 'relativity', 'physics'] },
      { name: 'Orbital Mechanics Lab', desc: 'Symplectic 2D n-body gravitational sandbox', route: '/orbital-lab', tags: ['lab', 'simulator', 'gravity', 'newton'] },
      { name: 'Scientific Intelligence', desc: 'Mathematical formulations, LaTeX proofs & peer-reviewed citations', route: '/intelligence', tags: ['intelligence', 'treatise', 'math', 'formulas', 'citations'] }
    ];

    coreSystems.forEach(sys => {
      if (sys.name.toLowerCase().includes(q) || sys.desc.toLowerCase().includes(q) || sys.tags.some(t => t.includes(q))) {
        results.push({
          id: sys.route,
          title: sys.name,
          subtitle: sys.desc,
          category: 'System',
          route: sys.route
        });
      }
    });
  }

  // Handle keyboard navigation (Arrow Up, Arrow Down, Enter, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : Math.max(0, results.length - 1)));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results.length > 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex].route);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, results, selectedIndex]);

  // Keep selected item in view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const handleSelect = (route: string) => {
    onClose();
    navigate(route);
  };

  const getCategoryIcon = (cat: SearchResultItem['category']) => {
    switch (cat) {
      case 'Planet': return <Globe className="w-4 h-4 text-cyan-400" />;
      case 'Mission': return <Radio className="w-4 h-4 text-amber-400" />;
      case 'Rocket': return <Rocket className="w-4 h-4 text-emerald-400" />;
      case 'Destination': return <Compass className="w-4 h-4 text-cyan-400" />;
      case 'Discovery': return <ExternalLink className="w-4 h-4 text-purple-400" />;
      case 'Asteroid': return <Crosshair className="w-4 h-4 text-cyan-400" />;
      case 'Exoplanet': return <Globe className="w-4 h-4 text-emerald-400" />;
      case 'System': return <Compass className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Global Search Command Palette"
    >
      <div 
        className="w-full max-w-2xl bg-space-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-space-850">
          <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search planets, missions, asteroids, exoplanets, or physics..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm sm:text-base outline-none font-sans"
            aria-label="Search query"
          />
          {query && (
            <button 
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
              }}
              className="text-slate-400 hover:text-white p-1"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-xs font-mono px-2 py-1 bg-space-800 text-slate-400 rounded-md border border-slate-700 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div ref={resultsContainerRef} className="flex-1 overflow-y-auto p-3 space-y-1">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-slate-500 font-mono text-xs">
              <p className="mb-2 text-slate-400">Search 34,800+ celestial records, flight manifests & physics simulators</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4 text-slate-400">
                {['Mars', 'James Webb', 'Hohmann Transfer', 'Apophis', 'TRAPPIST-1e', 'Solar Wind', 'Lagrange'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-lg bg-space-800 hover:bg-space-750 text-slate-300 border border-slate-700/60 text-xs transition-colors hover:border-cyan-400/40"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="font-mono text-sm text-slate-300">No telemetry records match &quot;{query}&quot;</p>
              <p className="text-xs text-slate-500 mt-1 font-sans">Try searching for Earth, Voyager, Falcon 9, Apollo 11, or Aurora</p>
            </div>
          ) : (
            results.map((res, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={`${res.category}-${res.id}`}
                  onClick={() => handleSelect(res.route)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors group ${
                    isSelected ? 'bg-space-800 border border-cyan-500/40' : 'hover:bg-space-850 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-space-950 border border-slate-800 group-hover:border-cyan-500/40">
                      {getCategoryIcon(res.category)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {res.title}
                      </h4>
                      <p className="text-xs text-slate-400 truncate mt-0.5 font-sans">
                        {res.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant={res.category === 'Planet' ? 'cyan' : res.category === 'Mission' ? 'gold' : res.category === 'Asteroid' ? 'cyan' : 'neutral'} size="sm">
                      {res.category}
                    </Badge>
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-space-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>{results.length} telemetry records found</span>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">Use ↑ ↓ to navigate</span>
            <span>↵ Select</span>
          </div>
        </div>
      </div>
    </div>
  );
};
