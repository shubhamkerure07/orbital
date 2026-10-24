import React from 'react';
import { KnowledgeGraphCanvas } from '../components/knowledge/KnowledgeGraphCanvas';
import { Badge } from '../components/common/Badge';
import { MetricCard } from '../components/common/MetricCard';
import { Network, Sparkles, Orbit, Compass, Share2, Info, BookOpen } from 'lucide-react';
import { GlossaryTooltip } from '../components/common/GlossaryTooltip';

export const KnowledgeGraphPage: React.FC = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">SEMANTIC ASTROPHYSICS ONTOLOGY</Badge>
            <Badge variant="purple">FORCE-DIRECTED NETWORK</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight flex items-center gap-3">
            <Network className="w-8 h-8 text-cyan-400" />
            Universe Knowledge Graph & Ontology
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-3xl font-sans leading-relaxed">
            Explore interconnected entities across cosmic scales. Discover how stars birth black holes, how spacecraft utilize gravity assists, and how fundamental physics governs planetary orbits.
          </p>
        </div>

        {/* Status */}
        <div className="hud-card p-3 rounded-xl border border-cyan-400/30 flex items-center gap-3 bg-space-900/80">
          <div className="w-9 h-9 rounded-xl bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">NETWORK GRAPH</div>
            <div className="text-xs font-mono font-bold text-cyan-300">24 Nodes • 24 Relational Edges</div>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          label="Entities Indexed"
          value="24"
          unit="Cosmic Objects"
          subtext="Stars, Black Holes, Probes"
          accentColor="border-cyan-400/30"
          icon={<Network className="w-4 h-4 text-cyan-400" />}
        />
        <MetricCard
          label="Semantic Relations"
          value="24"
          unit="Directed Edges"
          subtext="Orbits, Gravitational, Physics"
          accentColor="border-purple-400/30"
          icon={<Orbit className="w-4 h-4 text-purple-400" />}
        />
        <MetricCard
          label="Physics Principles"
          value="4"
          unit="Core Laws"
          subtext="General Relativity, Kepler, Tsiolkovsky"
          accentColor="border-amber-400/30"
          icon={<Compass className="w-4 h-4 text-amber-400" />}
        />
        <MetricCard
          label="Interactive Simulation"
          value="60 FPS"
          unit="Euler Verlet"
          subtext="Draggable Spring Canvas"
          accentColor="border-emerald-400/30"
          icon={<Sparkles className="w-4 h-4 text-emerald-400" />}
        />
      </div>

      {/* Main Interactive Graph View */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Click and drag nodes to perturb physics springs. Click any node to inspect telemetry.</span>
          <span className="text-cyan-400">LIVE TOPOLOGY ENGINE</span>
        </div>

        <KnowledgeGraphCanvas />
      </div>

      {/* Ontological Legend Card */}
      <div className="hud-card p-5 rounded-2xl border border-slate-800 bg-space-900/60 space-y-3 relative">
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          Ontology Architecture & Relational Semantics
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          The ORBITAL Knowledge Graph links celestial objects with the physical laws that govern them and the human missions that explore them. Edges represent physical relationships such as gravitational capture, Keplerian orbit, nuclear fusion progenitor pathways, and spacecraft flyby trajectories.
        </p>
      </div>

    </div>
  );
};
