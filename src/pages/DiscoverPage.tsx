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
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant="purple">Astrophysics & Observation</Badge>
          <Badge variant="gold">NASA APOD API</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono tracking-tight">
          Space Discoveries & Astronomy
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Live astronomical observations and verified scientific milestones across cosmology, exoplanet characterization, and deep space spectroscopy.
        </p>
      </div>

      {/* Featured NASA APOD Live Component */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-100 font-mono flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold-400" />
            Astronomy Picture of the Day
          </h2>
          <span className="text-xs font-mono text-slate-400">NASA Science Data</span>
        </div>
        <ApodSection />
      </section>

      {/* Verified Cosmic Discoveries Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-mono flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              Verified Astrophysical Breakthroughs
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Peer-reviewed discoveries from space telescopes and planetary probes
            </p>
          </div>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                selectedTag === 'all'
                  ? 'bg-gold-500 text-space-950 font-bold'
                  : 'bg-space-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All Topics
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  selectedTag === tag
                    ? 'bg-gold-500 text-space-950 font-bold'
                    : 'bg-space-900 text-slate-400 hover:text-slate-200 border border-slate-800'
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
              className="rounded-2xl bg-space-900 border border-slate-800 hover:border-gold-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-space-950">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((t) => (
                      <Badge key={t} variant="cyan" size="sm">{t}</Badge>
                    ))}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-gold-400" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-100 font-mono group-hover:text-gold-400 transition-colors line-clamp-2 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {item.explanation}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3.5 bg-space-950/80 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="truncate max-w-[180px]">{item.creditAgency}</span>
                {item.topicRoute && (
                  <Link
                    to={item.topicRoute}
                    className="text-gold-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
