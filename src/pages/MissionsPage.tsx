import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MISSIONS } from '../data/missions';
import { MissionData } from '../types';
import { MissionCard } from '../components/missions/MissionCard';
import { MissionDetailModal } from '../components/missions/MissionDetailModal';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { Search, Filter, X, Radio, ArrowUpDown, Calendar, Compass } from 'lucide-react';

export const MissionsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedMission, setSelectedMission] = useState<MissionData | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Check if URL has ?id=
  useEffect(() => {
    const idParam = searchParams.get('id');
    if (idParam) {
      const found = MISSIONS.find(m => m.id === idParam);
      if (found) {
        setSelectedMission(found);
      }
    }
  }, [searchParams]);

  const filteredMissions = useMemo(() => {
    return MISSIONS.filter((m) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.destination.toLowerCase().includes(q) ||
        m.agency.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q);

      // Status
      const matchesStatus = statusFilter === 'all' || m.status === statusFilter;

      // Category
      const matchesCategory = categoryFilter === 'all' || m.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    }).sort((a, b) => {
      const dateA = new Date(a.launchDate).getTime();
      const dateB = new Date(b.launchDate).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [searchQuery, statusFilter, categoryFilter, sortOrder]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setSortOrder('newest');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'all' || categoryFilter !== 'all';

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="cyan">Deep Space Flight Operations</Badge>
          <Badge variant="neutral">Verified Mission Archive</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight flex items-center gap-3">
          <Radio className="w-8 h-8 text-cyan-400" />
          Space Missions Explorer & Manifest
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-3xl font-sans leading-relaxed">
          Explore iconic robotic probes, deep-space orbiters, crewed expeditions, and space telescopes. Verified launch dates, milestones, and authentic scientific achievements from NASA, ESA, ISRO, and international space agencies.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-space-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by mission, agency, or destination..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950 border border-slate-700/80 text-white text-xs sm:text-sm placeholder-slate-500 outline-none focus:border-cyan-400 font-sans"
              aria-label="Search missions"
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-space-950 border border-slate-700/80 text-slate-200 text-xs font-mono outline-none hover:border-cyan-400/50 cursor-pointer"
              aria-label="Filter by mission status"
            >
              <option value="all">All Mission Statuses</option>
              <option value="active">Active Missions</option>
              <option value="completed">Completed Missions</option>
              <option value="en-route">En Route</option>
              <option value="planned">Planned Missions</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="md:col-span-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-space-950 border border-slate-700/80 text-slate-200 text-xs font-mono outline-none hover:border-cyan-400/50 cursor-pointer"
              aria-label="Filter by vehicle type"
            >
              <option value="all">All Types</option>
              <option value="Space Telescope">Space Telescope</option>
              <option value="Rover">Rover</option>
              <option value="Orbiter">Orbiter</option>
              <option value="Crewed">Crewed</option>
              <option value="Lander">Lander</option>
              <option value="Probe">Probe</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="md:col-span-2 flex items-center gap-2">
            <button
              onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-space-950 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-400/50 text-xs font-mono transition-colors"
              aria-label={`Sort by launch date: currently ${sortOrder}`}
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>{sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
            </button>
          </div>
        </div>

        {/* Clear Filters bar if applied */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs font-mono">
            <span className="text-slate-400">
              Showing {filteredMissions.length} of {MISSIONS.length} verified missions
            </span>
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-1 text-cyan-400 hover:underline"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear active filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Mission Cards Grid */}
      {filteredMissions.length === 0 ? (
        <EmptyState
          title="No missions match your filters"
          description="Try broadening your search term or resetting category and status filters."
          actionText="Reset All Filters"
          onAction={handleClearFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              onSelect={(m) => {
                setSelectedMission(m);
                setSearchParams({ id: m.id });
              }}
            />
          ))}
        </div>
      )}

      {/* Mission Detail Modal */}
      <MissionDetailModal
        mission={selectedMission}
        onClose={() => {
          setSelectedMission(null);
          setSearchParams({});
        }}
      />

    </div>
  );
};
