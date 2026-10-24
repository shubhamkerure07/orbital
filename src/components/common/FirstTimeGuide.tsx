import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  X, 
  Orbit, 
  Radio, 
  Cpu, 
  Crosshair, 
  Compass, 
  CheckCircle2, 
  ChevronRight,
  Info
} from 'lucide-react';
import { Button } from './Button';

export const FirstTimeGuide: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    const dismissed = localStorage.getItem('orbital_guide_dismissed');
    if (!dismissed) {
      setIsDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('orbital_guide_dismissed', 'true');
  };

  const handleResetGuide = () => {
    setIsDismissed(false);
    setActiveStep(0);
  };

  if (isDismissed) {
    return (
      <div className="flex justify-end pt-2 pb-1">
        <button
          onClick={handleResetGuide}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline px-3 py-1 rounded-lg bg-space-900/60 border border-slate-800 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>New to Orbital? Open Mission Control Primer</span>
        </button>
      </div>
    );
  }

  const steps = [
    {
      title: 'Welcome to NASA-Inspired Mission Control',
      badge: 'Step 1 of 4 • Orientation',
      desc: 'ORBITAL is an educational deep-space observatory that unites real astronomical databases, interactive 3D planetary physics, and spaceflight mission archives.',
      highlight: 'Every metric displayed is sourced from verified NASA, JPL, and NOAA datasets—no fabricated numbers.',
      actionLabel: 'Next: 3D Solar System & Orbit Navigation',
      link: '/explore'
    },
    {
      title: 'Navigate the 3D Solar System & Planetary Dossiers',
      badge: 'Step 2 of 4 • Digital Planetarium',
      desc: 'Click and drag in the 3D Planetarium to orbit the Sun. Scroll to zoom in and out. Click any planet to inspect its real physical mass, orbital period, surface gravity, and atmosphere.',
      highlight: 'Tip: Click the "Labels" button to toggle orbital paths and planet names on or off.',
      actionLabel: 'Next: Space Missions & Launch Vehicles',
      link: '/missions'
    },
    {
      title: 'Explore Historic & Active Space Flight Operations',
      badge: 'Step 3 of 4 • Flight Manifest',
      desc: 'Browse human spaceflight and robotic probes from Apollo and Voyager to Artemis and the James Webb Space Telescope. Inspect multi-stage rocket architectures and simulated launch sequences.',
      highlight: 'Filter missions by operator (NASA, ESA, ISRO), destination, and operational status.',
      actionLabel: 'Next: Orbital Physics & Trajectory Planning',
      link: '/orbital-lab'
    },
    {
      title: 'Simulate Gravitational Physics & Mission Trajectories',
      badge: 'Step 4 of 4 • Laboratories',
      desc: 'Experiment with real Newtonian mechanics in the 2D Orbital Lab (Velocity Verlet integration), or design interplanetary Hohmann transfer orbits between Earth and Mars.',
      highlight: 'Hover over dotted scientific terms (like AU, Delta-V, and Kp Index) anywhere in the console to read quick explanations.',
      actionLabel: 'Start Exploring Now',
      link: '/explore'
    }
  ];

  const current = steps[activeStep];

  return (
    <aside aria-label="First-time user onboarding" className="hud-card rounded-2xl p-6 sm:p-8 border border-cyan-500/30 bg-gradient-to-r from-space-900 via-space-900 to-space-850 shadow-2xl relative mb-8">
      <div className="hud-corner-tl" />
      <div className="hud-corner-br" />

      {/* Dismiss Button */}
      <button
        onClick={handleDismiss}
        className="absolute top-4 right-4 p-1.5 rounded-lg bg-space-950/80 hover:bg-space-800 text-slate-400 hover:text-slate-100 border border-slate-800 transition-colors"
        aria-label="Dismiss guide"
        title="Dismiss guide"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-cyan-400/10 text-cyan-400 border border-cyan-400/30">
            <Sparkles className="w-3 h-3" />
            {current.badge}
          </span>
          <span className="text-xs font-mono text-slate-400">Flight Director Primer</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold font-outfit text-white">
          {current.title}
        </h3>

        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          {current.desc}
        </p>

        <div className="p-3.5 rounded-xl bg-space-950/80 border border-slate-800 text-xs font-mono text-cyan-300/90 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <span>{current.highlight}</span>
        </div>

        {/* Navigation Dots and Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Step dots */}
          <div className="flex items-center gap-2">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeStep === idx 
                    ? 'w-6 bg-cyan-400' 
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to guide step ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDismiss}
              className="text-xs font-mono text-slate-400 hover:text-slate-200 px-3 py-2"
            >
              Skip Orientation
            </button>

            {activeStep < steps.length - 1 ? (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setActiveStep(prev => prev + 1)}
                rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
              >
                {current.actionLabel}
              </Button>
            ) : (
              <Link to={current.link}>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleDismiss}
                  rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                >
                  {current.actionLabel}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
