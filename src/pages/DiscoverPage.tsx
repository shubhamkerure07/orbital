import React, { useState } from 'react';
import { DISCOVERIES } from '../data/discoveries';
import { ApodSection } from '../components/discovery/ApodSection';
import { Badge } from '../components/common/Badge';
import { Sparkles, Calendar, ExternalLink, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DiscoverPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags = Array.from(new Set(DISCOVERIES.flatMap(d => d.tags)));

  const filteredDiscoveries = selectedTag === 'all'
    ? DISCOVERIES
    : DISCOVERIES.filter(d => d.tags.includes(selectedTag));

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="purple">Astrophysics & Deep Space Observation</Badge>
          <Badge variant="cyan">NASA APOD API</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-cyan-400" />
          Space Discoveries & Astronomy Picture Archive
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-3xl font-sans leading-relaxed">
          Daily astronomical observations and peer-reviewed scientific milestones across cosmology, gravitational wave astronomy, exoplanet characterization, and deep space spectroscopy.
        </p>
      </div>

      {/* Featured NASA APOD Live Component */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-outfit flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Astronomy Picture of the Day
          </h2>
          <span className="text-xs font-mono text-slate-400">Live NASA Science Data</span>
        </div>
        <ApodSection />
      </section>

      {/* Verified Cosmic Discoveries Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-outfit flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              Verified Astrophysical Breakthroughs
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5 font-sans">
              Peer-reviewed discoveries from space telescopes, gravitational observatories, and planetary probes
            </p>
          </div>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap gap-1.5" role="tablist">
            <button
              onClick={() => setSelectedTag('all')}
              role="tab"
              aria-selected={selectedTag === 'all'}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                selectedTag === 'all'
                  ? 'bg-cyan-400 text-space-950 font-bold shadow-md'
                  : 'bg-space-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              All Topics
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                role="tab"
                aria-selected={selectedTag === tag}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                  selectedTag === tag
                    ? 'bg-cyan-400 text-space-950 font-bold shadow-md'
                    : 'bg-space-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Discoveries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiscoveries.map((item) => (
            <div
              key={item.id}
              className="hud-card rounded-2xl bg-space-900 border border-slate-800 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-lg relative"
            >
              <div className="hud-corner-tl" />
              <div className="hud-corner-br" />

              <div>
                <div className="relative h-48 w-full overflow-hidden bg-space-950">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="cyan" size="sm">{item.date}</Badge>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <span className="text-[11px] font-mono text-cyan-400 block">
                    Source: {item.creditAgency}
                  </span>

                  <h3 className="text-lg font-bold text-white font-outfit group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 font-sans">
                    {item.explanation}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded bg-space-950 text-[10px] font-mono text-slate-400 border border-slate-800">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 py-3.5 bg-space-950/80 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="truncate max-w-[200px]">{item.creditAgency}</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                  <span>Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
