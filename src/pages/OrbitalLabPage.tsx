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
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant="green">Symplectic Numerical Integrator</Badge>
          <Badge variant="gold">Newtonian Mechanics</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono tracking-tight">
          Orbital Mechanics Laboratory
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Directly manipulate central gravitational mass, orbital insertion velocity, and trajectory angles. Observe Kepler’s laws and energy conservation in a real-time two-body simulation.
        </p>
      </div>

      {/* Simulator Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 2D Physics Canvas */}
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
              <span className="text-slate-500 uppercase text-[10px] block">Current Distance (r)</span>
              <span className="text-slate-100 font-bold text-base mt-0.5 block">
                {metrics.currentDistance.toFixed(1)} <span className="text-xs text-slate-400">units</span>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-space-900 border border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] block">Current Speed (v)</span>
              <span className="text-gold-400 font-bold text-base mt-0.5 block">
                {metrics.currentSpeed.toFixed(1)} <span className="text-xs text-slate-400">km/s</span>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-space-900 border border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] block">Eccentricity (e)</span>
              <span className="text-cyan-400 font-bold text-base mt-0.5 block">
                {metrics.eccentricity.toFixed(3)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-space-900 border border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] block">Escape Velocity</span>
              <span className="text-emerald-400 font-bold text-base mt-0.5 block">
                {metrics.escapeVelocity.toFixed(1)} <span className="text-xs text-slate-400">km/s</span>
              </span>
            </div>
          </div>

          {/* Detailed Orbital Ephemeris Readout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-space-900 border border-slate-800 font-mono text-xs">
            <div>
              <span className="text-slate-500 text-[10px] uppercase block">Periapsis (r_p)</span>
              <span className="text-slate-200 font-semibold">{metrics.periapsis.toFixed(1)} units</span>
            </div>

            <div>
              <span className="text-slate-500 text-[10px] uppercase block">Apoapsis (r_a)</span>
              <span className="text-slate-200 font-semibold">
                {metrics.apoapsis ? `${metrics.apoapsis.toFixed(1)} units` : '∞ (Hyperbolic Unbound)'}
              </span>
            </div>

            <div>
              <span className="text-slate-500 text-[10px] uppercase block">Orbital Period (T)</span>
              <span className="text-slate-200 font-semibold">
                {metrics.orbitalPeriod ? `${metrics.orbitalPeriod.toFixed(1)} sec` : 'N/A (Open Escape)'}
              </span>
            </div>

            <div>
              <span className="text-slate-500 text-[10px] uppercase block">Kinetic Energy (K)</span>
              <span className="text-emerald-400 font-semibold">{metrics.kineticEnergy.toFixed(1)} J/kg</span>
            </div>

            <div>
              <span className="text-slate-500 text-[10px] uppercase block">Potential Energy (U)</span>
              <span className="text-amber-400 font-semibold">{metrics.potentialEnergy.toFixed(1)} J/kg</span>
            </div>

            <div>
              <span className="text-slate-500 text-[10px] uppercase block">Total Energy (E = K + U)</span>
              <span className={`font-semibold ${metrics.totalEnergy >= 0 ? 'text-rose-400' : 'text-cyan-400'}`}>
                {metrics.totalEnergy.toFixed(1)} J/kg ({metrics.totalEnergy >= 0 ? 'Unbound' : 'Bound'})
              </span>
            </div>
          </div>
        </div>

        {/* Right: Sliders & Preset Panel */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-space-900 border border-slate-800 shadow-xl">
          <OrbitalControls
            centralMass={centralMass}
            onMassChange={(m) => {
              setCentralMass(m);
              setActivePresetId(null);
            }}
            radius={initialRadius}
            onRadiusChange={(r) => {
              setInitialRadius(r);
              setActivePresetId(null);
            }}
            velocity={initialVelocity}
            onVelocityChange={(v) => {
              setInitialVelocity(v);
              setActivePresetId(null);
            }}
            angleDeg={velocityAngleDeg}
            onAngleChange={(a) => {
              setVelocityAngleDeg(a);
              setActivePresetId(null);
            }}
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

      {/* Mechanics Explanation & Formulas */}
      <PhysicsExplanation />

    </div>
  );
};
