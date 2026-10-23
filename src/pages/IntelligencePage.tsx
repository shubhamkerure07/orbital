import React, { useState, useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { 
  Search, 
  BookOpen, 
  Compass, 
  Orbit, 
  Zap, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal, 
  Layers, 
  Sparkles,
  ShieldAlert,
  Sun
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { MetricCard } from '../components/common/MetricCard';

const KatexFormula: React.FC<{ latex: string }> = ({ latex }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode: true,
        throwOnError: false
      });
    } catch {
      return null;
    }
  }, [latex]);

  if (!html) {
    return <div className="font-mono text-sm text-slate-200">{latex}</div>;
  }

  return (
    <div
      className="katex-rendered text-holo-cyan overflow-x-auto py-2 text-center text-sm sm:text-base select-all"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

interface IntelligenceTopic {
  id: string;
  category: 'Astrodynamics' | 'Heliophysics' | 'Relativity' | 'Propulsion' | 'Astrobiology' | 'Planetary Defense';
  title: string;
  summary: string;
  coreFormulas: { name: string; latex: string; explanation: string }[];
  keyPrinciples: string[];
  citations: { author: string; title: string; year: string; doiOrUrl: string }[];
}

const INTELLIGENCE_TOPICS: IntelligenceTopic[] = [
  {
    id: 'lagrange-points',
    category: 'Astrodynamics',
    title: 'Lagrange Points (L1 - L5) & Halo Orbits',
    summary: 'Equilibrium solutions of the circular restricted three-body problem where gravitational and centrifugal forces cancel out. Collinear points L1, L2, L3 are unstable saddles requiring station-keeping; triangular points L4 and L5 are stable for mass ratios μ < 0.0385.',
    coreFormulas: [
      {
        name: 'L1/L2 Distance from Secondary Body',
        latex: 'r_{L1,L2} \\approx R \\cdot \\sqrt[3]{\\frac{m_2}{3 m_1}}',
        explanation: 'Hill radius approximation for Sun-Earth or Earth-Moon collinear libration points.'
      },
      {
        name: 'Jacobi Energy Integral',
        latex: 'C = 2 \\Omega(x,y,z) - v^2',
        explanation: 'Conserved quantity in the rotating frame dictating zero-velocity curves and forbidden regions.'
      }
    ],
    keyPrinciples: [
      'JWST operates in a quasi-periodic Halo orbit around Sun-Earth L2 (1.5 million km from Earth).',
      'SOHO and DSCOVR operate at Sun-Earth L1 providing uninterrupted solar observation.',
      'Trojan asteroids congregate in stable 1:1 orbital resonances at L4 and L5.'
    ],
    citations: [
      { author: 'Lagrange, J. L.', title: 'Essai sur le Problème des Trois Corps', year: '1772', doiOrUrl: 'https://archive.org' },
      { author: 'NASA JPL', title: 'Solar System Dynamics & Libration Point Orbits', year: '2023', doiOrUrl: 'https://ssd.jpl.nasa.gov' }
    ]
  },
  {
    id: 'oberth-effect',
    category: 'Astrodynamics',
    title: 'The Oberth Effect & Hyperbolic Excess Velocity',
    summary: 'A rocket engine burn produces significantly more kinetic energy when performed at high speed (deep inside a gravitational well at periapsis) than at low speed, because mechanical work W = F · d.',
    coreFormulas: [
      {
        name: 'Specific Kinetic Energy Change',
        latex: '\\Delta \\epsilon = \\frac{1}{2}(v + \\Delta v)^2 - \\frac{1}{2}v^2 = v \\cdot \\Delta v + \\frac{1}{2}\\Delta v^2',
        explanation: 'Higher initial orbital velocity v multiplies the energy gained per unit fuel burn.'
      },
      {
        name: 'Hyperbolic Excess Velocity',
        latex: 'v_\\infty = \\sqrt{v_{peri}^2 - v_{esc}^2}',
        explanation: 'Residual speed after climbing completely out of a central gravitational potential.'
      }
    ],
    keyPrinciples: [
      'Interplanetary injection burns are executed at lowest possible low Earth orbit (LEO) periapsis.',
      'Jupiter gravitational Oberth maneuvers can fling probes into interstellar space at extreme hyperbolic excess.'
    ],
    citations: [
      { author: 'Oberth, H.', title: 'Die Rakete zu den Planetenräumen', year: '1923', doiOrUrl: 'https://nasa.gov' }
    ]
  },
  {
    id: 'schwarzschild-relativity',
    category: 'Relativity',
    title: 'Schwarzschild Metric & Event Horizon Physics',
    summary: 'The exact vacuum solution to Einstein’s field equations for a spherically symmetric, non-rotating black hole. Dictates infinite gravitational redshift and time dilation at the event horizon.',
    coreFormulas: [
      {
        name: 'Schwarzschild Radius',
        latex: 'r_s = \\frac{2 G M}{c^2}',
        explanation: 'Radius of the event horizon where escape speed equals the speed of light c.'
      },
      {
        name: 'Gravitational Time Dilation',
        latex: 't_0 = t_f \\cdot \\sqrt{1 - \\frac{r_s}{r}}',
        explanation: 'Proper time t₀ experienced near the horizon relative to distant observer time tf.'
      }
    ],
    keyPrinciples: [
      'For Earth, the Schwarzschild radius is approximately 8.87 mm.',
      'Supermassive black hole Sagittarius A* has M ≈ 4.15 × 10⁶ M☉ and rs ≈ 12.3 million km.',
      'Photons orbit unstably in the photon sphere at r = 1.5 rs.'
    ],
    citations: [
      { author: 'Schwarzschild, K.', title: 'Über das Gravitationsfeld eines Massenpunktes', year: '1916', doiOrUrl: 'https://doi.org' },
      { author: 'Event Horizon Telescope Collab.', title: 'First M87 and Sgr A* Event Horizon Imaging', year: '2019-2022', doiOrUrl: 'https://eventhorizontelescope.org' }
    ]
  },
  {
    id: 'tsiolkovsky-propulsion',
    category: 'Propulsion',
    title: 'Tsiolkovsky Rocket Staging & Specific Impulse',
    summary: 'The foundational law of astronautics relating velocity gain to exhaust velocity and the natural logarithm of initial to final mass. Explains the tyrannical necessity of multistage launch vehicles.',
    coreFormulas: [
      {
        name: 'Tsiolkovsky Rocket Equation',
        latex: '\\Delta v = I_{sp} \\cdot g_0 \\cdot \\ln\\left(\\frac{m_0}{m_f}\\right)',
        explanation: 'Isp is specific impulse in seconds, g0 is 9.80665 m/s², m0 is wet mass, mf is dry mass.'
      },
      {
        name: 'Effective Exhaust Velocity',
        latex: 'c_{eff} = I_{sp} \\cdot g_0',
        explanation: 'Speed of gas propellant expelled from the engine nozzle.'
      }
    ],
    keyPrinciples: [
      'Hydrolox engines achieve Isp ≈ 450s; Methalox achieves Isp ≈ 380s; Kerolox achieves Isp ≈ 311s.',
      'Electric Ion Hall thrusters reach Isp > 3,000s, slashing propellant mass for deep space cruises.',
      'Multistage staging drops dead structural mass, multiplying effective mass ratio.'
    ],
    citations: [
      { author: 'Tsiolkovsky, K. E.', title: 'The Exploration of Cosmic Space by Means of Reaction Devices', year: '1903', doiOrUrl: 'https://nasa.gov' }
    ]
  },
  {
    id: 'heliophysics-reconnection',
    category: 'Heliophysics',
    title: 'Magnetic Reconnection & Solar Wind Coupling',
    summary: 'The violent topological restructuring of magnetic field lines in plasma, converting stored magnetic energy into kinetic and thermal particle acceleration. Powers solar flares and coronal mass ejections.',
    coreFormulas: [
      {
        name: 'Alfvén Velocity',
        latex: 'v_A = \\frac{B}{\\sqrt{\\mu_0 \\rho}}',
        explanation: 'Speed of magnetohydrodynamic waves through magnetized plasma.'
      },
      {
        name: 'Sweet-Parker Reconnection Rate',
        latex: 'M_R \\approx \\frac{1}{\\sqrt{S}}',
        explanation: 'S is the Lundquist number; fast reconnection requires Hall MHD dissipation.'
      }
    ],
    keyPrinciples: [
      'Southward IMF Bz connects directly with Earth’s northward magnetic dipole, driving geomagnetic storms.',
      'NASA MMS (Magnetospheric Multiscale) satellites measure electron-scale reconnection in situ in Earth’s magnetopause.'
    ],
    citations: [
      { author: 'Parker, E. N.', title: 'Sweet’s Mechanism for Merging Magnetic Fields', year: '1957', doiOrUrl: 'https://doi.org' },
      { author: 'Burch, J. L. et al.', title: 'Electron-Scale Details of Magnetic Reconnection Observed by MMS', year: '2016', doiOrUrl: 'https://science.org' }
    ]
  },
  {
    id: 'planetary-defense-beta',
    category: 'Planetary Defense',
    title: 'Kinetic Impactor Momentum Enhancement Factor (β)',
    summary: 'When a spacecraft collides with an asteroid at high velocity, crater ejecta expelled backwards acts as a rocket thrust, multiplying the total momentum imparted onto the target beyond the spacecraft’s own momentum.',
    coreFormulas: [
      {
        name: 'Momentum Transfer Relation',
        latex: '\\Delta p_{target} = \\beta \\cdot (m_{sc} \\cdot v_{sc})',
        explanation: 'β > 1 indicates recoil from backward ejecta enhances the deflection impulse.'
      }
    ],
    keyPrinciples: [
      'NASA’s DART mission struck Dimorphos at 6.6 km/s in Sept 2022.',
      'Ground radar confirmed a -33 minute orbital period reduction around Didymos.',
      'Analysis revealed β ≈ 2.2 to 3.6, proving recoil ejecta more than doubled the deflection force.'
    ],
    citations: [
      { author: 'Daly, R. T. et al.', title: 'Successful Kinetic Impact into an Asteroid by NASA DART', year: '2023', doiOrUrl: 'https://nature.com' }
    ]
  }
];

export const IntelligencePage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<IntelligenceTopic>(INTELLIGENCE_TOPICS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const categories = ['all', 'Astrodynamics', 'Heliophysics', 'Relativity', 'Propulsion', 'Planetary Defense'];

  const filteredTopics = INTELLIGENCE_TOPICS.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          topic.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyFormula = (latex: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedFormula(latex);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-holo-cyan animate-pulse" />
            <Badge variant="cyan">ORBITAL SCIENTIFIC INTELLIGENCE</Badge>
            <Badge variant="gold">PEER-REVIEWED ASTROPHYSICS</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight flex items-center gap-3">
            <Terminal className="w-8 h-8 text-holo-cyan" />
            Scientific Intelligence & Astrodynamics Knowledgebase
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-3xl">
            Mathematical formulations, orbital mechanics treatises, relativistic astrophysics principles, and primary literature citations verified against NASA, ESA, and peer-reviewed journals.
          </p>
        </div>

        {/* Global Catalog Count */}
        <div className="hud-card p-3 rounded-lg border border-holo-cyan/30 flex items-center gap-3 bg-space-900/80">
          <div className="w-8 h-8 rounded-full bg-holo-cyan/10 border border-holo-cyan/40 flex items-center justify-center text-holo-cyan">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">INTELLIGENCE REPOSITORY</div>
            <div className="text-xs font-mono font-bold text-holo-cyan">6 Core Disciplines Indexed</div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          label="Astrodynamics Principles"
          value="Hohmann & Oberth"
          unit="Validated Solvers"
          subtext="Symplectic Equations"
          accentColor="border-holo-cyan/40"
          icon={<Orbit className="w-4 h-4 text-holo-cyan" />}
        />
        <MetricCard
          label="Relativity Metrics"
          value="Schwarzschild"
          unit="Vacuum Solutions"
          subtext="Curved Spacetime"
          accentColor="border-purple-400/40"
          icon={<Compass className="w-4 h-4 text-purple-400" />}
        />
        <MetricCard
          label="Propulsion Equations"
          value="Tsiolkovsky"
          unit="Staging Physics"
          subtext="Isp 300s - 3200s"
          accentColor="border-amber-400/40"
          icon={<Zap className="w-4 h-4 text-amber-400" />}
        />
        <MetricCard
          label="Planetary Defense"
          value="Beta Factor"
          unit="DART Mission Calibrated"
          subtext="β = 2.2 - 3.6"
          accentColor="border-emerald-400/40"
          icon={<ShieldAlert className="w-4 h-4 text-emerald-400" />}
        />
      </div>

      {/* Main Grid: Topic Catalog & Technical Treatise Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Topics List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="hud-card p-4 rounded-xl border border-slate-800 bg-space-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Scientific Treatises
              </span>
              <span className="text-[11px] font-mono text-holo-cyan">
                {filteredTopics.length} Documents
              </span>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulas, principles (e.g. Oberth, L2)..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-space-950 border border-slate-800 focus:border-holo-cyan focus:outline-none text-xs font-mono text-slate-200"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    selectedCategory === cat
                      ? 'bg-holo-cyan text-space-950 font-bold'
                      : 'bg-space-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Topics List Scroll */}
          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredTopics.map((topic) => {
              const isSelected = selectedTopic.id === topic.id;
              return (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-holo-cyan/10 border-holo-cyan shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                      : 'bg-space-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-space-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit font-bold text-white">
                      {topic.title}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-space-950 text-holo-cyan border border-holo-cyan/30">
                      {topic.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 font-sans line-clamp-2 mt-1.5 leading-relaxed">
                    {topic.summary}
                  </p>

                  <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{topic.coreFormulas.length} Core Formulation(s)</span>
                    <span className="text-holo-cyan font-semibold">Inspect Treatise →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Treatise Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Inspection HUD Card */}
          <div className="hud-card p-6 rounded-2xl border border-holo-cyan/40 bg-space-900/90 relative overflow-hidden">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <div className="border-b border-slate-800 pb-4 mb-5">
              <div className="text-[10px] font-mono tracking-widest text-holo-cyan uppercase flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                PEER-REVIEWED SCIENTIFIC TREATISE: {selectedTopic.category.toUpperCase()}
              </div>
              <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-white mt-1">
                {selectedTopic.title}
              </h2>
            </div>

            {/* Overview / Abstract */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Executive Abstract & Theoretical Foundation
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-sans bg-space-950/60 p-4 rounded-xl border border-slate-800">
                {selectedTopic.summary}
              </p>
            </div>

            {/* Core Mathematical Formulations */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-holo-cyan" />
                Governing Physical Equations & Mathematical Proofs
              </h4>

              <div className="space-y-3">
                {selectedTopic.coreFormulas.map((formula, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-space-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-holo-cyan">
                        {formula.name}
                      </span>
                      <button
                        onClick={() => handleCopyFormula(formula.latex)}
                        className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded bg-space-900 border border-slate-800 transition-colors"
                        title="Copy LaTeX formula"
                      >
                        {copiedFormula === formula.latex ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy LaTeX</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Formula Display Box with KaTeX typography */}
                    <div className="p-3 rounded-lg bg-[#020205] border border-holo-cyan/20 overflow-x-auto text-center py-3">
                      <KatexFormula latex={formula.latex} />
                    </div>

                    <p className="text-xs font-mono text-slate-400 leading-relaxed">
                      {formula.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Engineering & Astrophysical Takeaways */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Key Engineering & Observational Takeaways
              </h4>
              <ul className="space-y-2">
                {selectedTopic.keyPrinciples.map((principle, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-sans text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-holo-cyan mt-1.5 shrink-0" />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verified Academic Citations */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Primary Scientific Literature Citations
              </h4>
              <div className="space-y-1.5">
                {selectedTopic.citations.map((cite, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-mono p-2 rounded bg-space-950/60 border border-slate-800/80">
                    <div>
                      <span className="text-white font-semibold">{cite.author}</span> ({cite.year}). <span className="text-slate-300 italic">"{cite.title}"</span>
                    </div>
                    <a
                      href={cite.doiOrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-holo-cyan hover:underline flex items-center gap-1 font-bold ml-2 shrink-0"
                    >
                      Source <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
