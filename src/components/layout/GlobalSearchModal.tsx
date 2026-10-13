import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Globe, Rocket, Compass, Radio, ExternalLink } from 'lucide-react';
import { PLANETS } from '../../data/planets';
import { MISSIONS } from '../../data/missions';
import { ROCKETS } from '../../data/rockets';
import { DESTINATIONS } from '../../data/destinations';
import { DISCOVERIES } from '../../data/discoveries';
import { Badge } from '../common/Badge';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Planet' | 'Mission' | 'Rocket' | 'Destination' | 'Discovery';
  route: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
  }

  const handleSelect = (route: string) => {
    onClose();
    navigate(route);
  };

  const getCategoryIcon = (cat: SearchResultItem['category']) => {
    switch (cat) {
      case 'Planet': return <Globe className="w-4 h-4 text-cyan-400" />;
      case 'Mission': return <Radio className="w-4 h-4 text-gold-400" />;
      case 'Rocket': return <Rocket className="w-4 h-4 text-amber-400" />;
      case 'Destination': return <Compass className="w-4 h-4 text-emerald-400" />;
      case 'Discovery': return <ExternalLink className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div 
        className="w-full max-w-2xl bg-space-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-space-850">
          <Search className="w-5 h-5 text-gold-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search planets, missions, rockets, destinations, or physics..."
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base outline-none font-sans"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-xs font-mono px-2 py-1 bg-space-800 text-slate-400 rounded border border-slate-700 hover:text-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 divide-y divide-slate-800/40">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-slate-500 font-mono text-xs">
              <p className="mb-2">Type a celestial body, vehicle, or topic name to explore.</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4 text-slate-400">
                {['Jupiter', 'James Webb', 'Falcon 9', 'Europa', 'Apollo 11', 'Orbit'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-md bg-space-800 hover:bg-space-750 border border-slate-700/60 text-xs transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="font-mono text-sm">No telemetry records match &quot;{query}&quot;</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for Mars, Voyager, SLS, Titan, or Kepler</p>
            </div>
          ) : (
            results.map((res) => (
              <div
                key={`${res.category}-${res.id}`}
                onClick={() => handleSelect(res.route)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-space-800/70 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-space-950 border border-slate-800 group-hover:border-gold-500/40">
                    {getCategoryIcon(res.category)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-gold-400 transition-colors truncate">
                      {res.title}
                    </h4>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {res.subtitle}
                    </p>
                  </div>
                </div>
                <Badge variant={res.category === 'Planet' ? 'cyan' : res.category === 'Mission' ? 'gold' : 'neutral'} size="sm">
                  {res.category}
                </Badge>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-space-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>{results.length} telemetry records found</span>
          <span>Navigation: Click or Enter</span>
        </div>
      </div>
    </div>
  );
};
