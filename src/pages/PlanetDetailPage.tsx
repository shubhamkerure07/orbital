import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PLANETS } from '../data/planets';
import { MISSIONS } from '../data/missions';
import { Badge } from '../components/common/Badge';
import { MetricCard } from '../components/common/MetricCard';
import { 
  ArrowLeft, 
  ArrowRight, 
  Orbit, 
  Compass, 
  Thermometer, 
  Weight, 
  Clock, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { formatNumber, formatTempCelsius, formatDistance, formatEarthRelative } from '../utils/formatting';
import { NotFoundPage } from './NotFoundPage';

export const PlanetDetailPage: React.FC = () => {
  const { planetId } = useParams<{ planetId: string }>();
  const navigate = useNavigate();

  const planetIndex = PLANETS.findIndex(p => p.id === planetId);

  if (planetIndex === -1) {
    return <NotFoundPage />;
  }

  const planet = PLANETS[planetIndex];

  const prevPlanet = planetIndex > 0 ? PLANETS[planetIndex - 1] : PLANETS[PLANETS.length - 1];
  const nextPlanet = planetIndex < PLANETS.length - 1 ? PLANETS[planetIndex + 1] : PLANETS[0];

  const relatedMissions = MISSIONS.filter(m => 
    planet.relatedMissionIds.includes(m.id) || m.destinationPlanetId === planet.id
  );

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Top Navigation Bar: Back & Prev/Next */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <Link
          to="/explore"
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-gold-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to 3D Solar System</span>
        </Link>

        {/* Planet switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/explore/${prevPlanet.id}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-space-900 hover:bg-space-850 text-slate-300 text-xs font-mono border border-slate-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{prevPlanet.name}</span>
          </button>

          <select
            value={planet.id}
            onChange={(e) => navigate(`/explore/${e.target.value}`)}
            className="px-3 py-1.5 rounded-lg bg-space-950 text-slate-200 border border-slate-700 text-xs font-mono outline-none"
          >
            {PLANETS.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <button
            onClick={() => navigate(`/explore/${nextPlanet.id}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-space-900 hover:bg-space-850 text-slate-300 text-xs font-mono border border-slate-800"
          >
            <span className="hidden sm:inline">{nextPlanet.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hero Overview */}
      <div className="rounded-3xl bg-space-900 border border-slate-800 p-8 sm:p-12 relative overflow-hidden">
        <div 
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: planet.colorHex }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="cyan">#{planet.orderFromSun} Body From Sun</Badge>
              <Badge variant="neutral">{planet.type}</Badge>
              {planet.hasRings && <Badge variant="gold">Planetary Rings</Badge>}
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 font-mono tracking-tight flex items-center gap-4">
              <span 
                className="w-7 h-7 rounded-full inline-block flex-shrink-0 border border-white/30"
                style={{ backgroundColor: planet.colorHex }}
              />
              {planet.name}
            </h1>

            <p className="text-gold-400 font-mono text-base">{planet.tagline}</p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {planet.overview}
            </p>
          </div>

          <div className="lg:col-span-4 flex items-center justify-center">
            <div 
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-white/20 shadow-2xl relative flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${planet.accentColor}, ${planet.roughColor}, #000000)`
              }}
            >
              <div className="absolute inset-0 rounded-full blur-md opacity-30" style={{ backgroundColor: planet.colorHex }} />
            </div>
          </div>
        </div>
      </div>

      {/* Complete Physical Characteristics Grid */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-100 font-mono flex items-center gap-2">
          <Compass className="w-5 h-5 text-gold-400" />
          Physical & Orbital Parameters
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Equatorial Diameter"
            value={formatNumber(planet.diameterKm)}
            unit="km"
            subtext={`Mean planetary radius: ${formatNumber(Math.round(planet.diameterKm / 2))} km`}
            icon={<Compass className="w-4 h-4" />}
          />

          <MetricCard
            label="Distance From Sun"
            value={planet.distanceAu.toFixed(3)}
            unit="AU"
            subtext={`${formatDistance(planet.distanceFromSunMillionKm)}`}
            icon={<Orbit className="w-4 h-4" />}
          />

          <MetricCard
            label="Orbital Period (Year)"
            value={planet.orbitalPeriodDays.toFixed(1)}
            unit="days"
            subtext={`${(planet.orbitalPeriodDays / 365.25).toFixed(2)} Earth years`}
            icon={<Clock className="w-4 h-4" />}
          />

          <MetricCard
            label="Mean Orbital Speed"
            value={planet.orbitalVelocityKms.toFixed(2)}
            unit="km/s"
            subtext={`${formatNumber(Math.round(planet.orbitalVelocityKms * 3600))} km/h`}
            icon={<Orbit className="w-4 h-4" />}
          />

          <MetricCard
            label="Surface Gravity"
            value={planet.surfaceGravityMs2.toFixed(2)}
            unit="m/s²"
            subtext={`${planet.gravityEarthRelative.toFixed(2)}× Earth surface gravity`}
            icon={<Weight className="w-4 h-4" />}
          />

          <MetricCard
            label="Mean Temperature"
            value={formatTempCelsius(planet.avgTempCelsius)}
            subtext={`Min: ${planet.minTempCelsius ?? 'N/A'}°C | Max: ${planet.maxTempCelsius ?? 'N/A'}°C`}
            icon={<Thermometer className="w-4 h-4" />}
          />

          <MetricCard
            label="Sidereal Rotation"
            value={Math.abs(planet.rotationPeriodHours).toFixed(1)}
            unit="hours"
            subtext={planet.rotationPeriodHours < 0 ? 'Retrograde spin (clockwise)' : 'Prograde spin (counter-clockwise)'}
            icon={<Clock className="w-4 h-4" />}
          />

          <MetricCard
            label="Axial Tilt"
            value={`${planet.axialTiltDegrees.toFixed(1)}°`}
            subtext="Obliquity to orbit plane"
            icon={<Compass className="w-4 h-4" />}
          />
        </div>
      </section>

      {/* Atmospheric Composition Breakdown */}
      <section className="rounded-2xl bg-space-900 border border-slate-800 p-6 sm:p-8 space-y-6">
        <h3 className="text-xl font-bold text-slate-100 font-mono flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          Atmospheric Composition & Chemistry
        </h3>

        <div className="space-y-4">
          {planet.atmosphereComposition.map((gas) => (
            <div key={gas.gas} className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-slate-300">
                <span>{gas.gas}</span>
                <span className="text-gold-400 font-bold">{gas.percentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-space-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-gold-500 to-cyan-400 rounded-full"
                  style={{ width: `${Math.min(100, gas.percentage)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Geological and Scientific Features */}
      <section className="rounded-2xl bg-space-900 border border-slate-800 p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-slate-100 font-mono">
          Distinguishing Geological Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {planet.keyFeatures.map((feat, i) => (
            <div key={i} className="p-4 rounded-xl bg-space-950 border border-slate-800/80 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-gold-400 mt-2 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{feat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Space Missions */}
      {relatedMissions.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-100 font-mono flex items-center gap-2">
            <Radio className="w-5 h-5 text-gold-400" />
            Exploration Missions To {planet.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedMissions.map((m) => (
              <div key={m.id} className="p-5 rounded-xl bg-space-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-100 font-mono">{m.name}</h4>
                  <span className="text-xs font-mono text-slate-400">{m.agency} • Launch: {m.launchDate}</span>
                </div>
                <Link
                  to={`/missions?id=${m.id}`}
                  className="px-3 py-1.5 rounded-lg bg-space-800 hover:bg-space-750 text-gold-400 text-xs font-mono border border-gold-500/30"
                >
                  View Mission
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Citation and Authority */}
      <div className="p-4 rounded-xl bg-space-950 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Scientific Reference: {planet.officialSource}</span>
        </div>
        <a
          href={planet.officialSourceUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-gold-400 hover:underline"
        >
          <span>NASA Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
