import React, { useState, useEffect } from 'react';
import { fetchNasaApod, ApiFetchResult } from '../../services/nasaApi';
import { DiscoveryItem } from '../../types';
import { Badge } from '../common/Badge';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ExternalLink, Radio, Calendar, Info, RefreshCw } from 'lucide-react';

export const ApodSection: React.FC = () => {
  const [result, setResult] = useState<ApiFetchResult<DiscoveryItem> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadApod = async () => {
    setLoading(true);
    const res = await fetchNasaApod();
    setResult(res);
    setLoading(false);
  };

  useEffect(() => {
    loadApod();
  }, []);

  if (loading) {
    return (
      <div className="p-8 rounded-2xl bg-space-900 border border-slate-800">
        <LoadingSpinner message="Fetching NASA Astronomy Picture of the Day..." />
      </div>
    );
  }

  const item = result?.data;
  if (!item) return null;

  return (
    <div className="rounded-2xl bg-space-900 border border-slate-800 overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Media Frame */}
        <div className="lg:col-span-7 bg-space-950 relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center overflow-hidden">
          {item.mediaType === 'video' ? (
            <iframe
              src={item.url}
              title={item.title}
              className="w-full h-full min-h-[400px] border-0"
              allowFullScreen
            />
          ) : (
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover max-h-[580px]"
            />
          )}

          {/* Status pill on image */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Badge variant={result.isLive ? 'green' : 'gold'}>
              {result.isLive ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live NASA APOD Feed
                </>
              ) : (
                'Curated Astrophysical Archive'
              )}
            </Badge>
          </div>
        </div>

        {/* Narrative & Science Explanation */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold-400" /> {item.date}
              </span>
              <button
                onClick={loadApod}
                className="hover:text-gold-400 transition-colors p-1"
                title="Refresh feed"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-mono tracking-tight mb-4">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-h-64 overflow-y-auto pr-2 mb-6">
              {item.explanation}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800 font-mono text-xs text-slate-400">
            <div>
              <span className="block text-slate-500 uppercase text-[10px]">Image Credit & Attribution</span>
              <span className="text-slate-300 font-semibold">{item.creditAgency}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500">{result.sourceNote}</span>
              {item.hdUrl && (
                <a
                  href={item.hdUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-gold-400 hover:underline"
                >
                  <span>Full HD File</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
