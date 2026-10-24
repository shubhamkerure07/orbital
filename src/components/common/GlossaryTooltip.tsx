import React, { useState } from 'react';
import { HelpCircle, Info } from 'lucide-react';

export const SCIENTIFIC_GLOSSARY: Record<string, { definition: string; category: string }> = {
  'AU': {
    definition: 'Astronomical Unit: Mean distance between Earth and Sun (~149.6 million km). Used for solar system scales.',
    category: 'Distance'
  },
  'Delta-V': {
    definition: 'Δv (Delta-V): Measure of impulse per unit mass required to perform an orbital maneuver or escape gravity.',
    category: 'Astrodynamics'
  },
  'Hohmann Transfer': {
    definition: 'An elliptical transfer orbit used to transfer a spacecraft between two circular orbits in the same plane using minimal propellant.',
    category: 'Orbital Mechanics'
  },
  'Periapsis': {
    definition: 'The point in an orbit closest to the central gravitational body being orbited (e.g. Perigee for Earth, Perihelion for Sun).',
    category: 'Orbital Mechanics'
  },
  'Apoapsis': {
    definition: 'The highest or farthest point in an elliptical orbit from the central gravitational body (e.g. Apogee for Earth, Aphelion for Sun).',
    category: 'Orbital Mechanics'
  },
  'Kp Index': {
    definition: 'Geomagnetic storm index from 0 to 9 quantifying disturbances in Earth’s magnetic field caused by solar wind.',
    category: 'Heliophysics'
  },
  'Lagrange Points': {
    definition: 'Five positions (L1–L5) in an orbital configuration where gravitational forces and orbital motion balance each other.',
    category: 'Gravitational Physics'
  },
  'Transit Depth': {
    definition: 'The fraction of starlight blocked by an exoplanet during transit: ΔF/F = (Rp/R*)², revealing the planet’s radius.',
    category: 'Exoplanets'
  },
  'Hill Sphere': {
    definition: 'The spherical region around an astronomical body where its own gravity dominates the attraction of satellites.',
    category: 'Gravitational Physics'
  },
  'Torino Scale': {
    definition: '0 to 10 impact hazard scale quantifying collision probability and kinetic energy of Near-Earth Asteroids.',
    category: 'Planetary Defense'
  },
  'Specific Impulse': {
    definition: 'Isp (seconds): Rocket engine fuel efficiency metric. Higher Isp yields more delta-v per kg of propellant.',
    category: 'Propulsion'
  },
  'Light-Year': {
    definition: 'The distance light travels in one Julian year in vacuum (~9.46 trillion km or 63,241 AU).',
    category: 'Cosmology'
  }
};

interface GlossaryTooltipProps {
  term: keyof typeof SCIENTIFIC_GLOSSARY | string;
  children?: React.ReactNode;
  showIcon?: boolean;
}

export const GlossaryTooltip: React.FC<GlossaryTooltipProps> = ({
  term,
  children,
  showIcon = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const entry = SCIENTIFIC_GLOSSARY[term] || {
    definition: `${term}: Space science measurement parameter.`,
    category: 'Astrophysics'
  };

  return (
    <span
      className="relative inline-flex items-center gap-1 cursor-help group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      role="button"
      aria-label={`Definition of ${term}`}
    >
      <span className="underline decoration-dotted decoration-cyan-400/60 underline-offset-4 group-hover:text-cyan-400 transition-colors">
        {children || term}
      </span>
      {showIcon && (
        <HelpCircle className="w-3 h-3 text-cyan-400/70 group-hover:text-cyan-400 flex-shrink-0" />
      )}

      {isOpen && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-space-900/95 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-2xl z-50 text-left pointer-events-none"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-cyan-400">{term}</span>
            <span className="text-[10px] font-mono uppercase text-slate-400 px-1.5 py-0.5 rounded bg-space-800 border border-slate-700">
              {entry.category}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {entry.definition}
          </p>
        </div>
      )}
    </span>
  );
};
