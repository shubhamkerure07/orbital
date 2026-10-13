import React from 'react';
import { BookOpen, ShieldAlert, Cpu } from 'lucide-react';

export const PhysicsExplanation: React.FC = () => {
  return (
    <div className="rounded-2xl bg-space-900 border border-slate-800 p-6 sm:p-8 space-y-6 text-slate-300 font-sans">
      <div className="flex items-center gap-2 text-gold-400 font-mono text-xs uppercase tracking-wider">
        <BookOpen className="w-4 h-4" /> Mechanics Curriculum & Numerical Integrity
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-mono">
        Classical Two-Body Orbital Dynamics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
          <span className="text-gold-400 font-bold block mb-1">Newtonian Gravitation</span>
          <code className="text-slate-200 block text-sm mb-2">F = G·M·m / r²</code>
          <p className="text-slate-400 font-sans text-xs">
            Gravitational attractive force is directly proportional to the product of both masses and inversely proportional to the square of their separation distance.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
          <span className="text-cyan-400 font-bold block mb-1">Circular Orbital Velocity</span>
          <code className="text-slate-200 block text-sm mb-2">v_circ = √(G·M / r)</code>
          <p className="text-slate-400 font-sans text-xs">
            The precise velocity at which centripetal acceleration matches gravitational pull, maintaining a constant orbital distance with zero radial acceleration.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
          <span className="text-emerald-400 font-bold block mb-1">Escape Velocity</span>
          <code className="text-slate-200 block text-sm mb-2">v_esc = √(2·G·M / r)</code>
          <p className="text-slate-400 font-sans text-xs">
            The minimum speed required for an unpowered object to escape the gravitational influence of a primary body entirely, corresponding to total specific energy E ≥ 0.
          </p>
        </div>
      </div>

      {/* Trajectory Classification */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-100 font-mono uppercase tracking-wider">
          Conic Section Trajectory Classification:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-space-950/80 border border-slate-800">
            <span className="text-cyan-400 font-bold block">e = 0 (Circular)</span>
            <span className="text-slate-400">Constant speed, constant distance, bound orbit.</span>
          </div>
          <div className="p-3 rounded-lg bg-space-950/80 border border-slate-800">
            <span className="text-gold-400 font-bold block">0 &lt; e &lt; 1 (Elliptical)</span>
            <span className="text-slate-400">Periodic bound orbit with distinct periapsis and apoapsis.</span>
          </div>
          <div className="p-3 rounded-lg bg-space-950/80 border border-slate-800">
            <span className="text-purple-400 font-bold block">e = 1 (Parabolic)</span>
            <span className="text-slate-400">Marginal escape trajectory with net zero total energy at infinity.</span>
          </div>
          <div className="p-3 rounded-lg bg-space-950/80 border border-slate-800">
            <span className="text-rose-400 font-bold block">e &gt; 1 (Hyperbolic)</span>
            <span className="text-slate-400">Unbound flyby trajectory with positive excess speed at infinity.</span>
          </div>
        </div>
      </div>

      {/* Scientific Limitations & Assumptions */}
      <div className="p-4 rounded-xl bg-space-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-400 font-mono">
        <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-slate-200 font-bold block mb-1">
            NUMERICAL INTEGRATION MODEL ASSUMPTIONS & BOUNDARIES:
          </span>
          This simulator uses symplectic Velocity Verlet numerical integration. The model assumes spherically symmetric point masses in pure vacuum. Real spacecraft trajectories also account for atmospheric drag (which causes orbital decay in Low Earth Orbit), solar radiation pressure, Earth oblateness (J2 perturbation causing nodal precession), and N-body gravitational perturbations from the Moon and Jupiter.
        </div>
      </div>
    </div>
  );
};
