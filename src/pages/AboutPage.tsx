import React from 'react';
import { Badge } from '../components/common/Badge';
import { Orbit, ShieldCheck, Cpu, Database, BookOpen, AlertCircle, ExternalLink, Code2, Sparkles, Terminal } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="border-b border-space-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="cyan">MISSION MANIFEST</Badge>
          <Badge variant="neutral">OPEN ASTROPHYSICS ARCHITECTURE v1.2</Badge>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-outfit tracking-tight">
          About ORBITAL
        </h1>
        <p className="text-cyan-400 font-mono text-base mt-2 flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          Next-Generation Space Mission Control & Deep-Space Observatory
        </p>
      </div>

      {/* Section 1: Philosophy & Purpose */}
      <section className="hud-card rounded-2xl bg-space-900/80 border border-space-800 p-6 sm:p-10 space-y-4 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <h2 className="text-xl sm:text-2xl font-bold text-white font-outfit flex items-center gap-2.5">
          <Orbit className="w-5 h-5 text-cyan-400" />
          The Purpose of the Platform
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          ORBITAL was conceived to bridge the gap between static textbook astronomy and interactive engineering visualization. It combines the rigorous precision of an astrophysical observatory console with the immersive spatial perspective of a digital planetarium and the interactive clarity of a physics simulation laboratory.
        </p>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          Our core goal is to make celestial exploration, aerospace propulsion systems, and orbital mechanics directly tangible for students, researchers, engineers, and space enthusiasts—without artificial sensationalism or fabricated scientific figures.
        </p>
      </section>

      {/* Section 2: Real Observations vs Numerical Models */}
      <section className="hud-card rounded-2xl bg-space-900/80 border border-space-800 p-6 sm:p-10 space-y-4 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <h2 className="text-xl sm:text-2xl font-bold text-white font-outfit flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          Real Observations vs. Educational Simulations
        </h2>
        <div className="space-y-3 text-sm text-slate-300 leading-relaxed font-sans">
          <p>
            <strong className="text-white font-semibold">Planetary & Mission Datasets:</strong> Every diameter, orbital period, surface gravity value, atmospheric fraction, and mission launch date in this platform is sourced directly from authoritative public archives (such as the NASA Planetary Fact Sheet and JPL Solar System Dynamics ephemerides).
          </p>
          <p>
            <strong className="text-white font-semibold">3D Solar System Visualization:</strong> The real solar system is vastly sparse. To make 3D exploration functional on standard screens, planet sizes and orbital distances utilize normalized, logarithmic scaling rather than literal physical ratios. Real physical values are faithfully preserved in technical metric cards.
          </p>
          <p>
            <strong className="text-white font-semibold">Orbital Mechanics Lab:</strong> The simulator implements classical Newtonian two-body gravitational mechanics via symplectic Velocity Verlet numerical integration. It accurately illustrates Keplerian orbits, transfer burns, and escape trajectories. Real orbital flight dynamics additionally encounter atmospheric drag, non-spherical gravitational harmonics (J2/J3), and solar radiation pressure, which are omitted from this educational point-mass model.
          </p>
        </div>
      </section>

      {/* Section 3: Technology Architecture */}
      <section className="hud-card rounded-2xl bg-space-900/80 border border-space-800 p-6 sm:p-10 space-y-6 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <h2 className="text-xl sm:text-2xl font-bold text-white font-outfit flex items-center gap-2.5">
          <Cpu className="w-5 h-5 text-emerald-400" />
          Engineering Architecture
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-space-950/80 border border-space-800">
            <span className="text-cyan-400 font-bold block mb-1">Frontend Shell</span>
            <p className="text-slate-400 font-sans">React 18, Vite 5, TypeScript 5, Tailwind CSS with NASA-inspired space palette.</p>
          </div>
          <div className="p-4 rounded-xl bg-space-950/80 border border-space-800">
            <span className="text-emerald-400 font-bold block mb-1">3D Graphics Engine</span>
            <p className="text-slate-400 font-sans">Three.js, React Three Fiber (R3F), Drei, smooth orbital controls, and resilient canvas fallbacks.</p>
          </div>
          <div className="p-4 rounded-xl bg-space-950/80 border border-space-800">
            <span className="text-purple-400 font-bold block mb-1">Physics & Mathematical Engine</span>
            <p className="text-slate-400 font-sans">Symplectic Velocity Verlet integrator, KaTeX LaTeX renderer, and Keplerian orbital solvers.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Authoritative Sources & Attribution */}
      <section className="hud-card rounded-2xl bg-space-900/80 border border-space-800 p-6 sm:p-10 space-y-6 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <h2 className="text-xl sm:text-2xl font-bold text-white font-outfit flex items-center gap-2.5">
          <Database className="w-5 h-5 text-amber-400" />
          Data Sources & Scientific Attribution
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          ORBITAL is built exclusively upon publicly available astronomical catalogs, flight operations manuals, and scientific research releases provided by:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <a
            href="https://science.nasa.gov/"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-space-950/80 border border-space-800 hover:border-cyan-400/40 flex items-center justify-between text-slate-300 group transition-colors"
          >
            <span>NASA Science Mission Directorate</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="https://webb.nasa.gov/"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-space-950/80 border border-space-800 hover:border-cyan-400/40 flex items-center justify-between text-slate-300 group transition-colors"
          >
            <span>Space Telescope Science Institute (STScI)</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="https://www.esa.int/"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-space-950/80 border border-space-800 hover:border-cyan-400/40 flex items-center justify-between text-slate-300 group transition-colors"
          >
            <span>European Space Agency (ESA) Science</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="https://www.isro.gov.in/"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-space-950/80 border border-space-800 hover:border-cyan-400/40 flex items-center justify-between text-slate-300 group transition-colors"
          >
            <span>Indian Space Research Organisation (ISRO)</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </section>

      {/* Section 5: Honest Disclaimers & Limits */}
      <section className="p-5 rounded-2xl bg-space-950 border border-space-800 text-xs font-mono text-slate-400 flex items-start gap-3.5">
        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-slate-200 font-bold block">
            NON-COMMERCIAL EDUCATIONAL DISCLAIMER
          </span>
          <p className="leading-relaxed font-sans text-slate-400">
            ORBITAL is an educational exploration application developed for public study and visualization. It is not affiliated with, sponsored by, or endorsed by NASA, ESA, ISRO, or SpaceX. All mission trademarks and agency names belong to their respective public institutions and corporate operators.
          </p>
        </div>
      </section>

    </div>
  );
};
