import React, { useState, useEffect } from 'react';
import { 
  calculateHohmannTransfer, 
  calculateRequiredPropellantMass, 
  CELESTIAL_MASSES_KG,
  METERS_PER_AU,
  G0_EARTH
} from '../physics';
import { 
  Rocket, 
  Compass, 
  Orbit, 
  Activity, 
  Save, 
  Trash2, 
  Calendar, 
  Zap, 
  Fuel, 
  Gauge, 
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { MetricCard } from '../components/common/MetricCard';

interface PlanetaryTarget {
  id: string;
  name: string;
  semiMajorAxisAu: number;
  massKg: number;
  orbitalRadiusKm: number;
  color: string;
}

const PLANETARY_TARGETS: PlanetaryTarget[] = [
  { id: 'mercury', name: 'Mercury', semiMajorAxisAu: 0.387, massKg: CELESTIAL_MASSES_KG.MERCURY, orbitalRadiusKm: 57.9e6, color: '#9ca3af' },
  { id: 'venus', name: 'Venus', semiMajorAxisAu: 0.723, massKg: CELESTIAL_MASSES_KG.VENUS, orbitalRadiusKm: 108.2e6, color: '#f59e0b' },
  { id: 'earth', name: 'Earth', semiMajorAxisAu: 1.000, massKg: CELESTIAL_MASSES_KG.EARTH, orbitalRadiusKm: 149.6e6, color: '#3b82f6' },
  { id: 'mars', name: 'Mars', semiMajorAxisAu: 1.524, massKg: CELESTIAL_MASSES_KG.MARS, orbitalRadiusKm: 227.9e6, color: '#ef4444' },
  { id: 'jupiter', name: 'Jupiter', semiMajorAxisAu: 5.204, massKg: CELESTIAL_MASSES_KG.JUPITER, orbitalRadiusKm: 778.5e6, color: '#d97706' },
  { id: 'saturn', name: 'Saturn', semiMajorAxisAu: 9.582, massKg: CELESTIAL_MASSES_KG.SATURN, orbitalRadiusKm: 1434.0e6, color: '#eab308' },
];

interface EngineOption {
  id: string;
  name: string;
  type: string;
  ispSec: number;
  thrustKn: string;
  notes: string;
}

const ENGINE_OPTIONS: EngineOption[] = [
  { id: 'hydrolox', name: 'Hydrolox (LH2/LOX)', type: 'Chemical Cryogenic', ispSec: 450, thrustKn: '1,000 kN', notes: 'RL10 / Centaur upper stage equivalent' },
  { id: 'methalox', name: 'Methalox (CH4/LOX)', type: 'Chemical High-Efficiency', ispSec: 380, thrustKn: '2,200 kN', notes: 'Raptor Vacuum / Prometheus equivalent' },
  { id: 'kerolox', name: 'Kerolox (RP-1/LOX)', type: 'Chemical Storable', ispSec: 311, thrustKn: '934 kN', notes: 'Merlin 1D Vacuum equivalent' },
  { id: 'ntr', name: 'Nuclear Thermal (DRACO)', type: 'Fission Thermal', ispSec: 900, thrustKn: '150 kN', notes: 'High specific impulse deep space propulsion' },
  { id: 'hall-ion', name: 'Next-Gen Hall Ion Thruster', type: 'Electric Ion', ispSec: 3200, thrustKn: '0.5 kN', notes: 'Continuous low-thrust interplanetary cruise' },
];

interface SavedMission {
  id: string;
  name: string;
  departure: string;
  target: string;
  deltaVTotalKmS: number;
  durationDays: number;
  propellantKg: number;
  engine: string;
  savedAt: string;
}

export const MissionDesignerPage: React.FC = () => {
  const [departurePlanetId, setDeparturePlanetId] = useState<string>('earth');
  const [targetPlanetId, setTargetPlanetId] = useState<string>('mars');
  const [dryMassKg, setDryMassKg] = useState<number>(5000); // 5 tons default spacecraft
  const [selectedEngineId, setSelectedEngineId] = useState<string>('hydrolox');
  const [missionName, setMissionName] = useState<string>('Ares Explorer I');
  const [savedMissions, setSavedMissions] = useState<SavedMission[]>([]);

  // Load saved missions from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('orbital_saved_missions');
      if (stored) {
        setSavedMissions(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, []);

  const departure = PLANETARY_TARGETS.find(p => p.id === departurePlanetId) || PLANETARY_TARGETS[2];
  const target = PLANETARY_TARGETS.find(p => p.id === targetPlanetId) || PLANETARY_TARGETS[3];
  const engine = ENGINE_OPTIONS.find(e => e.id === selectedEngineId) || ENGINE_OPTIONS[0];

  // Calculate Hohmann transfer around the Sun
  const r1_M = departure.semiMajorAxisAu * METERS_PER_AU;
  const r2_M = target.semiMajorAxisAu * METERS_PER_AU;

  let transferResult = {
    deltaV1_ms: 0,
    deltaV2_ms: 0,
    totalDeltaV_ms: 0,
    transferDurationSec: 0,
    transferDurationDays: 0,
    semiMajorAxisTransM: 0
  };

  try {
    if (departurePlanetId !== targetPlanetId) {
      transferResult = calculateHohmannTransfer(r1_M, r2_M, CELESTIAL_MASSES_KG.SUN);
    }
  } catch (err) {
    console.error(err);
  }

  // Calculate fuel mass required via Tsiolkovsky equation
  let propellantMassKg = 0;
  if (transferResult.totalDeltaV_ms > 0) {
    try {
      propellantMassKg = calculateRequiredPropellantMass(
        dryMassKg,
        transferResult.totalDeltaV_ms,
        engine.ispSec
      );
    } catch {
      propellantMassKg = 0;
    }
  }

  const totalWetMassKg = dryMassKg + propellantMassKg;
  const massRatio = dryMassKg > 0 ? (totalWetMassKg / dryMassKg).toFixed(2) : '1.0';

  // Save current mission design
  const handleSaveMission = () => {
    const newMission: SavedMission = {
      id: Date.now().toString(),
      name: missionName.trim() || `${departure.name} to ${target.name} Flight Plan`,
      departure: departure.name,
      target: target.name,
      deltaVTotalKmS: Number((transferResult.totalDeltaV_ms / 1000).toFixed(2)),
      durationDays: Math.round(transferResult.transferDurationDays),
      propellantKg: Math.round(propellantMassKg),
      engine: engine.name,
      savedAt: new Date().toLocaleDateString()
    };

    const updated = [newMission, ...savedMissions];
    setSavedMissions(updated);
    try {
      localStorage.setItem('orbital_saved_missions', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedMissions.filter(m => m.id !== id);
    setSavedMissions(updated);
    try {
      localStorage.setItem('orbital_saved_missions', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-holo-cyan animate-pulse" />
            <Badge variant="cyan">HOHMANN TRAJECTORY SOLVER</Badge>
            <Badge variant="gold">TSIOLKOVSKY ROCKET PROPULSION</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight flex items-center gap-3">
            <Compass className="w-8 h-8 text-holo-cyan" />
            Space Mission Designer & Trajectory Laboratory
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-3xl">
            Design interplanetary exploration architectures, optimize heliocentric transfer orbits, evaluate propulsion delta-V budgets, and compute spacecraft propellant mass staging.
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={handleSaveMission}
          className="px-4 py-2 rounded-lg bg-holo-cyan text-space-950 font-mono font-bold text-xs flex items-center gap-2 hover:bg-white transition-all shadow-[0_0_15px_rgba(0,242,255,0.4)]"
        >
          <Save className="w-4 h-4" />
          SAVE FLIGHT ARCHITECTURE
        </button>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          label="Total Mission Δv"
          value={(transferResult.totalDeltaV_ms / 1000).toFixed(2)}
          unit="km/s"
          subtext="Heliocentric budget"
          accentColor="border-holo-cyan/40"
          icon={<Gauge className="w-4 h-4 text-holo-cyan" />}
        />
        <MetricCard
          label="One-Way Transit Time"
          value={Math.round(transferResult.transferDurationDays).toString()}
          unit="days"
          subtext={`${(transferResult.transferDurationDays / 30.4).toFixed(1)} Earth months`}
          accentColor="border-amber-400/40"
          icon={<Calendar className="w-4 h-4 text-amber-400" />}
        />
        <MetricCard
          label="Propellant Mass Required"
          value={Math.round(propellantMassKg).toLocaleString()}
          unit="kg"
          subtext={`Wet Mass: ${Math.round(totalWetMassKg).toLocaleString()} kg`}
          accentColor="border-purple-400/40"
          icon={<Fuel className="w-4 h-4 text-purple-400" />}
        />
        <MetricCard
          label="Spacecraft Mass Ratio"
          value={massRatio}
          unit="m₀ / m_f"
          subtext={`Isp: ${engine.ispSec} s`}
          accentColor="border-emerald-400/40"
          icon={<Zap className="w-4 h-4 text-emerald-400" />}
        />
      </div>

      {/* Main Designer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Interactive Configuration (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Mission Name & Routing */}
          <div className="hud-card p-5 rounded-xl border border-slate-800 bg-space-900/70 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-holo-cyan flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Mission Parameters & Trajectory Route
            </h3>

            {/* Mission Name */}
            <div>
              <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                Mission Designation
              </label>
              <input
                type="text"
                value={missionName}
                onChange={(e) => setMissionName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-space-950 border border-slate-800 focus:border-holo-cyan focus:outline-none text-xs font-mono text-white"
              />
            </div>

            {/* Departure Body */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Departure Body
                </label>
                <select
                  value={departurePlanetId}
                  onChange={(e) => setDeparturePlanetId(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-space-950 border border-slate-800 focus:border-holo-cyan focus:outline-none text-xs font-mono text-white"
                >
                  {PLANETARY_TARGETS.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.semiMajorAxisAu} AU)</option>
                  ))}
                </select>
              </div>

              {/* Destination Body */}
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Target Destination
                </label>
                <select
                  value={targetPlanetId}
                  onChange={(e) => setTargetPlanetId(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-space-950 border border-slate-800 focus:border-holo-cyan focus:outline-none text-xs font-mono text-white"
                >
                  {PLANETARY_TARGETS.map(p => (
                    <option key={p.id} value={p.id} disabled={p.id === departurePlanetId}>
                      {p.name} ({p.semiMajorAxisAu} AU)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dry Mass Slider */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Spacecraft Dry Mass (Payload + Structure):</span>
                <span className="text-holo-cyan font-bold">{dryMassKg.toLocaleString()} kg</span>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={dryMassKg}
                onChange={(e) => setDryMassKg(Number(e.target.value))}
                className="w-full accent-holo-cyan bg-space-950 h-1.5 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>500 kg (Small Probe)</span>
                <span>10,000 kg (Heavy Lander)</span>
                <span>50,000 kg (Crew Hab)</span>
              </div>
            </div>

            {/* Propulsion Engine Selection */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <label className="text-[10px] font-mono uppercase text-slate-400 block">
                Primary Propulsion System
              </label>

              <div className="space-y-1.5">
                {ENGINE_OPTIONS.map(eng => (
                  <div
                    key={eng.id}
                    onClick={() => setSelectedEngineId(eng.id)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                      selectedEngineId === eng.id
                        ? 'bg-holo-cyan/15 border-holo-cyan shadow-sm'
                        : 'bg-space-950 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-white">{eng.name}</span>
                      <span className="text-holo-cyan font-bold">{eng.ispSec} s Isp</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5 flex justify-between">
                      <span>{eng.type}</span>
                      <span>Thrust: {eng.thrustKn}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Saved Flight Architectures */}
          <div className="hud-card p-4 rounded-xl border border-slate-800 bg-space-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Saved Mission Architectures
              </span>
              <span className="text-[10px] font-mono text-holo-cyan">
                {savedMissions.length} Stored
              </span>
            </div>

            {savedMissions.length === 0 ? (
              <p className="text-xs font-mono text-slate-400 py-2">
                No missions saved yet. Design an interplanetary route and click "Save Flight Architecture".
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {savedMissions.map(m => (
                  <div key={m.id} className="p-2.5 rounded-lg bg-space-950 border border-slate-800/80 flex items-center justify-between gap-2 text-xs font-mono">
                    <div>
                      <div className="font-bold text-white">{m.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {m.departure} → {m.target} | Δv: {m.deltaVTotalKmS} km/s | {m.durationDays}d
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteSaved(m.id)}
                      className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete flight plan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Trajectory Schematic & Burn Budget (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Inspection HUD Card */}
          <div className="hud-card p-6 rounded-2xl border border-holo-cyan/40 bg-space-900/90 relative overflow-hidden">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <div className="border-b border-slate-800 pb-4 mb-5">
              <div className="text-[10px] font-mono tracking-widest text-holo-cyan uppercase flex items-center gap-1.5">
                <Orbit className="w-3.5 h-3.5" />
                ORBITAL FLIGHT PROFILE: {departure.name.toUpperCase()} TO {target.name.toUpperCase()}
              </div>
              <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-white mt-1">
                {departure.name} → {target.name} Heliocentric Transfer
              </h2>
              <div className="text-xs font-mono text-slate-400 mt-0.5">
                Transfer Ellipse Semi-Major Axis: <span className="text-white font-bold">{((r1_M + r2_M) / (2 * METERS_PER_AU)).toFixed(3)} AU</span>
              </div>
            </div>

            {/* Trajectory Burn Staging Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              
              <div className="p-4 rounded-xl bg-space-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-holo-cyan flex items-center gap-1.5">
                    <Rocket className="w-3.5 h-3.5" />
                    Burn 1: Injection (Δv₁)
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {(transferResult.deltaV1_ms / 1000).toFixed(2)} km/s
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Prograde burn at {departure.name}'s orbital distance ({departure.semiMajorAxisAu} AU) to inject into the elliptical transfer orbit toward {target.name}.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-space-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    Burn 2: Orbital Insertion (Δv₂)
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {(transferResult.deltaV2_ms / 1000).toFixed(2)} km/s
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Circularization or orbital capture burn at target distance ({target.semiMajorAxisAu} AU) to match the velocity of {target.name}.
                </div>
              </div>

            </div>

            {/* Visual Hohmann Transfer Arc Schematic */}
            <div className="p-4 rounded-xl bg-space-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Heliocentric Trajectory Diagram</span>
                <span className="text-holo-cyan font-bold">180° Orbital Arc</span>
              </div>

              {/* Scaled Visual Orbit Arc */}
              <div className="h-44 w-full bg-[#030712] rounded-lg border border-slate-800/80 relative flex items-center justify-center overflow-hidden">
                
                {/* Sun at center */}
                <div className="w-6 h-6 rounded-full bg-amber-400 shadow-[0_0_20px_#f59e0b] flex items-center justify-center text-[8px] font-bold text-space-950 z-20">
                  ☀
                </div>

                {/* Inner Orbit Circle */}
                <div className="absolute w-28 h-28 rounded-full border border-dashed border-slate-700/60 pointer-events-none" />

                {/* Outer Orbit Circle */}
                <div className="absolute w-48 h-48 rounded-full border border-dashed border-slate-700/60 pointer-events-none" />

                {/* Transfer Ellipse Arc */}
                <div className="absolute w-38 h-48 rounded-[50%] border-2 border-holo-cyan/70 border-b-transparent border-l-transparent transform rotate-45 pointer-events-none" />

                {/* Departure Planet Pin */}
                <div className="absolute left-[36%] top-[50%] transform -translate-y-1/2 flex items-center gap-1 z-20">
                  <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                  <span className="text-[9px] font-mono font-bold text-white">{departure.name}</span>
                </div>

                {/* Target Arrival Pin */}
                <div className="absolute right-[22%] top-[50%] transform -translate-y-1/2 flex items-center gap-1 z-20">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
                  <span className="text-[9px] font-mono font-bold text-white">{target.name}</span>
                </div>

                {/* Trajectory label */}
                <div className="absolute bottom-2 right-3 text-[10px] font-mono text-holo-cyan">
                  Transfer: {Math.round(transferResult.transferDurationDays)} Days
                </div>
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>Departure Point (Perihelion/Aphelion)</span>
                <span>Minimum Energy Hohmann Trajectory</span>
                <span>Arrival Target</span>
              </div>
            </div>

            {/* Mass Budget Breakdown Table */}
            <div className="mt-5 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Spacecraft Staged Mass Budget
              </h4>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="bg-space-950 p-3 rounded-lg border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 uppercase">Payload Dry Mass (mf)</div>
                  <div className="text-sm font-bold text-white mt-0.5">{dryMassKg.toLocaleString()} kg</div>
                  <div className="text-[10px] text-slate-400">Instruments + Structure</div>
                </div>

                <div className="bg-space-950 p-3 rounded-lg border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 uppercase">Propellant Mass (m_prop)</div>
                  <div className="text-sm font-bold text-purple-400 mt-0.5">{Math.round(propellantMassKg).toLocaleString()} kg</div>
                  <div className="text-[10px] text-slate-400">Expended for Burns</div>
                </div>

                <div className="bg-space-950 p-3 rounded-lg border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 uppercase">Total Wet Mass (m₀)</div>
                  <div className="text-sm font-bold text-holo-cyan mt-0.5">{Math.round(totalWetMassKg).toLocaleString()} kg</div>
                  <div className="text-[10px] text-slate-400">Launch Configuration</div>
                </div>
              </div>
            </div>

            {/* Physics Formulation Note */}
            <div className="mt-4 p-3 rounded-lg bg-space-950 border border-slate-800 text-[11px] font-mono text-slate-400 leading-relaxed">
              <strong className="text-white">Scientific Verification:</strong> Delta-V computed via orbital vis-viva mechanics around the Sun (mass M_sun = 1.989e30 kg). Mass ratio determined via Tsiolkovsky relation Δv = Isp · g₀ · ln(m₀ / mf).
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
