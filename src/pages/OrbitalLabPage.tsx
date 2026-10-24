import React, { useState } from 'react';
import { OrbitalCanvas } from '../components/orbital-lab/OrbitalCanvas';
import { OrbitalControls } from '../components/orbital-lab/OrbitalControls';
import { PhysicsExplanation } from '../components/orbital-lab/PhysicsExplanation';
import { SimulationMetrics, ORBITAL_PRESETS } from '../utils/physics';
import { OrbitalPreset } from '../types';
import { Badge } from '../components/common/Badge';
import { MetricCard } from '../components/common/MetricCard';
import { Cpu, Orbit, Compass, Gauge, Activity, Zap, Layers } from 'lucide-react';
import { formatNumber } from '../utils/formatting';
import { GlossaryTooltip } from '../components/common/GlossaryTooltip';

export const OrbitalLabPage: React.FC = () => {
  // Simulator parameters
  const [centralMass, setCentralMass] = useState<number>(100);
  const [initialRadius, setInitialRadius] = useState<number>(180);
  const [initialVelocity, setInitialVelocity] = useState<number>(23.57);
  const [velocityAngleDeg, setVelocityAngleDeg] = useState<number>(90); // 90° = tangential
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activePresetId, setActivePresetId] = useState<string | null>('circular');
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  // Live telemetry metrics from canvas integrator
  const [metrics, setMetrics] = useState<SimulationMetrics>({
    currentDistance: 180,
    currentSpeed: 23.57,
    kineticEnergy: 277.7,
    potentialEnergy: -555.5,
    totalEnergy: -277.7,
    semiMajorAxis: 180,
    eccentricity: 0.0,
    periapsis: 180,
    apoapsis: 180,
    orbitalPeriod: 48.0,
    escapeVelocity: 33.33,
    isCollided: false,
    isEscaped: false
  });

  const handleApplyPreset = (preset: OrbitalPreset) => {
    setActivePresetId(preset.id);
    setCentralMass(preset.centralMass);
    setInitialRadius(preset.radius);
    setInitialVelocity(preset.velocity);
    setVelocityAngleDeg(90);
    setResetTrigger(prev => prev + 1);
  };

  const handleReset = () => {
    setResetTrigger(prev => prev + 1);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="cyan">Symplectic Numerical Integrator</Badge>
          <Badge variant="neutral">Newtonian Gravitational Physics</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight flex items-center gap-3">
          <Cpu className="w-8 h-8 text-cyan-400" />
          Orbital Mechanics Laboratory
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-3xl font-sans leading-relaxed">
          Directly manipulate central gravitational mass, orbital insertion velocity, and trajectory angles. Observe Kepler’s laws and mechanical energy conservation in a real-time Velocity Verlet point-mass simulation.
        </p>
      </div>

      {/* Simulator Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 2D Physics Canvas & Live Telemetry */}
        <div className="lg:col-span-8 space-y-4">
          <OrbitalCanvas
            centralMass={centralMass}
            initialRadius={initialRadius}
            initialVelocity={initialVelocity}
            velocityAngleDeg={velocityAngleDeg}
            simSpeed={simSpeed}
            isPaused={isPaused}
            onMetricsUpdate={setMetrics}
            resetTrigger={resetTrigger}
          />

          {/* Live Telemetry Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-space-900 border border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] block">Current Distance (r)</span>
              <span className="text-white font-bold text-base mt-0.5 block font-outfit">
                {metrics.currentDistance.toFixed(1)} <span className="text-xs text-slate-400">units</span>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-space-900 border border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] block">Current Speed (v)</span>
              <span className="text-cyan-400 font-bold text-base mt-0.5 block font-outfit">
                {metrics.currentSpeed.toFixed(1)} <span className="text-xs text-slate-400">km/s</span>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-space-900 border border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] block">Total Mechanical Energy</span>
              <span className={`font-bold text-base mt-0.5 block font-outfit ${metrics.totalEnergy < 0 ? 'text-emerald-400' : 'text-crimson-400'}`}>
                {metrics.totalEnergy.toFixed(1)} <span className="text-xs text-slate-400">J/kg</span>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-space-900 border border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] block">Escape Threshold (v_esc)</span>
              <span className="text-amber-400 font-bold text-base mt-0.5 block font-outfit">
                {metrics.escapeVelocity.toFixed(1)} <span className="text-xs text-slate-400">km/s</span>
              </span>
            </div>
          </div>

          {/* Orbital Parameters Bar */}
          <div className="p-4 rounded-xl bg-space-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Orbit Semi-Major Axis (a)</span>
              <span className="text-white font-bold">{metrics.semiMajorAxis > 0 ? `${metrics.semiMajorAxis.toFixed(1)} units` : 'Hyperbolic / Open'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Eccentricity (e)</span>
              <span className="text-cyan-400 font-bold">{metrics.eccentricity.toFixed(3)}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">
                <GlossaryTooltip term="Periapsis">Periapsis (q)</GlossaryTooltip>
              </span>
              <span className="text-white font-bold">{metrics.periapsis.toFixed(1)} units</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">
                <GlossaryTooltip term="Apoapsis">Apoapsis (Q)</GlossaryTooltip>
              </span>
              <span className="text-white font-bold">
                {metrics.apoapsis !== null && metrics.apoapsis > 0 ? `${metrics.apoapsis.toFixed(1)} units` : '∞ (Unbound)'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Kepler Period (T)</span>
              <span className="text-white font-bold">{metrics.orbitalPeriod ? `${metrics.orbitalPeriod.toFixed(1)} s` : 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Right: Controls Panel */}
        <div className="lg:col-span-4 hud-card rounded-2xl bg-space-900 border border-slate-800 p-6 shadow-xl relative">
          <div className="hud-corner-tl" />
          <div className="hud-corner-br" />

          <OrbitalControls
            centralMass={centralMass}
            onMassChange={setCentralMass}
            radius={initialRadius}
            onRadiusChange={setInitialRadius}
            velocity={initialVelocity}
            onVelocityChange={setInitialVelocity}
            angleDeg={velocityAngleDeg}
            onAngleChange={setVelocityAngleDeg}
            simSpeed={simSpeed}
            onSpeedChange={setSimSpeed}
            isPaused={isPaused}
            onTogglePause={() => setIsPaused(prev => !prev)}
            onReset={handleReset}
            onApplyPreset={handleApplyPreset}
            activePresetId={activePresetId}
          />
        </div>

      </div>

      {/* Scientific Foundations & KaTeX Mathematical Exposition */}
      <PhysicsExplanation />

    </div>
  );
};
