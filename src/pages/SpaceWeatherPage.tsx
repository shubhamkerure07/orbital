import React, { useState } from 'react';
import { 
  CURRENT_SPACE_WEATHER, 
  HISTORICAL_SPACE_WEATHER_BENCHMARKS 
} from '../data/spaceWeather';
import { 
  Sun, 
  Compass, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Radio, 
  AlertCircle, 
  Flame, 
  Navigation,
  Globe2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { MetricCard } from '../components/common/MetricCard';

export const SpaceWeatherPage: React.FC = () => {
  const weather = CURRENT_SPACE_WEATHER;
  const [userLatitude, setUserLatitude] = useState<number>(45);

  // Aurora visibility rule of thumb based on Kp index:
  // Kp 0-2: > 66° Lat
  // Kp 3: 63° Lat
  // Kp 5 (G1): 56° Lat
  // Kp 7 (G3): 50° Lat
  // Kp 9 (G5): < 40° Lat
  const kpCurrent = weather.geomagneticIndex.kpCurrent;
  const thresholdLat = weather.geomagneticIndex.auroraLatitudeThresholdDeg;
  const isAuroraVisibleAtUserLat = Math.abs(userLatitude) >= thresholdLat;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Badge variant="green">NOAA SPACE WEATHER PREDICTION CENTER</Badge>
            <Badge variant="cyan">SOLAR DYNAMICS OBSERVATORY (SDO)</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight flex items-center gap-3">
            <Sun className="w-8 h-8 text-amber-400 animate-spin-slow" />
            Space Weather & Heliophysics Observatory
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-3xl">
            Live interplanetary space weather telemetry, solar wind magnetic coupling (IMF Bz), solar flare classifications, coronal mass ejections, and geomagnetic aurora forecasts.
          </p>
        </div>

        {/* Global Space Weather Warning Indicator */}
        <div className="hud-card p-3 rounded-lg border border-amber-400/30 flex items-center gap-4 bg-space-900/80">
          <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">NOAA GEOMAGNETIC SCALE</div>
            <div className="text-sm font-mono font-bold text-amber-400">{weather.geomagneticIndex.stormLevel}</div>
            <div className="text-[10px] font-mono text-slate-400">Kp = {kpCurrent.toFixed(2)} (Quiet to Unsettled)</div>
          </div>
        </div>
      </div>

      {/* Primary Telemetry Stream Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          label="Solar Wind Speed"
          value={weather.solarWind.speedKms.toString()}
          unit="km/s"
          subtext="DSCOVR Satellite"
          accentColor="border-cyan-400/30"
          icon={<Zap className="w-4 h-4 text-cyan-400" />}
        />
        <MetricCard
          label="Proton Density"
          value={weather.solarWind.densityPcm3.toString()}
          unit="protons/cm³"
          subtext="Nominal plasma flow"
          accentColor="border-emerald-400/30"
          icon={<Compass className="w-4 h-4 text-emerald-400" />}
        />
        <MetricCard
          label="Interplanetary Bz"
          value={`${weather.solarWind.imfBz_nT} nT`}
          unit="Southward coupling"
          subtext="Magnetic reconnection"
          accentColor="border-amber-400/30"
          icon={<Navigation className="w-4 h-4 text-amber-400" />}
        />
        <MetricCard
          label="Radio Blackout (X-Ray)"
          value={weather.satelliteRadioConditions.radioBlackoutScale}
          unit="NOAA R-Scale"
          subtext="HF Comm Nominal"
          accentColor="border-cyan-400/30"
          icon={<Radio className="w-4 h-4 text-cyan-400" />}
        />
      </div>

      {/* Main Grid: Kp Gauge & Solar Wind Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Planetary Kp Index Gauge & Aurora Forecaster (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Kp Gauge HUD Card */}
          <div className="hud-card p-6 rounded-2xl border border-cyan-400/40 bg-space-900/90 relative overflow-hidden">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Planetary Kp Index (Geomagnetic Activity)
              </span>
              <span className="text-[10px] font-mono text-slate-400">3-Hour Cadence</span>
            </div>

            {/* Gauge visualization 0 to 9 */}
            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-extrabold font-outfit text-white">
                    {kpCurrent.toFixed(2)}
                  </div>
                  <div className="text-xs font-mono text-slate-400">CURRENT PLANETARY KP VALUE</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-cyan-400 font-bold">24h Max: {weather.geomagneticIndex.kpMax24h}</div>
                  <div className="text-[10px] font-mono text-slate-400">Baseline Ground Magnetometers</div>
                </div>
              </div>

              {/* 9-step segmented bar */}
              <div className="grid grid-cols-9 gap-1.5 pt-2">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
                  const isActive = kpCurrent >= index;
                  let colorClass = 'bg-emerald-500/80';
                  if (index >= 4 && index <= 6) colorClass = 'bg-amber-400';
                  if (index >= 7) colorClass = 'bg-red-500';

                  return (
                    <div key={index} className="flex flex-col items-center gap-1">
                      <div 
                        className={`w-full h-8 rounded-sm transition-all ${
                          isActive 
                            ? `${colorClass} shadow-[0_0_8px_currentColor]` 
                            : 'bg-space-950 border border-slate-800'
                        }`}
                      />
                      <span className="text-[9px] font-mono text-slate-400">{index}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between text-[9px] font-mono text-slate-400 px-1">
                <span className="text-emerald-400">0-3 Quiet</span>
                <span className="text-amber-400">4-6 Unsettled / Storm</span>
                <span className="text-red-400">7-9 Severe G4-G5</span>
              </div>
            </div>

            {/* Interactive Aurora Visibility Calculator */}
            <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-slate-300 flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                  Aurora Visibility Latitude Calculator
                </span>
                <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                  isAuroraVisibleAtUserLat 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {isAuroraVisibleAtUserLat ? 'AURORA VISIBLE' : 'EQUATORWARD OF OVAL'}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Your Observer Latitude:</span>
                  <span className="text-cyan-400 font-bold">{userLatitude}° N/S</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={userLatitude}
                  onChange={(e) => setUserLatitude(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-space-950 h-1.5 rounded cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>20° (Tropical)</span>
                  <span>50° (Mid-Latitudes)</span>
                  <span>80° (Arctic)</span>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-400 bg-space-950 p-2.5 rounded-lg border border-slate-800 leading-relaxed">
                Current auroral equatorward boundary is at approximately <strong className="text-white">{thresholdLat}°</strong> geomagnetic latitude. Auroras expand toward mid-latitudes during G3+ geomagnetic storms.
              </div>
            </div>

          </div>

          {/* Spacecraft & Satellite Impact Matrix */}
          <div className="hud-card p-5 rounded-2xl border border-slate-800 bg-space-900/60 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Orbital Asset & Infrastructure Impact Matrix
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-space-950 border border-slate-800/80">
                <div className="text-[10px] text-slate-400 uppercase">LEO Satellite Atmospheric Drag</div>
                <div className="text-emerald-400 font-bold mt-0.5">NOMINAL (Low Drag)</div>
                <div className="text-[10px] text-slate-400 mt-1">Thermospheric heating minimal; orbit decay rates standard.</div>
              </div>

              <div className="p-3 rounded-lg bg-space-950 border border-slate-800/80">
                <div className="text-[10px] text-slate-400 uppercase">Single Event Upsets (SEUs)</div>
                <div className="text-emerald-400 font-bold mt-0.5">LEVEL 0 (Quiet)</div>
                <div className="text-[10px] text-slate-400 mt-1">Solar proton flux &gt;10 MeV is beneath sensitive electronics thresholds.</div>
              </div>

              <div className="p-3 rounded-lg bg-space-950 border border-slate-800/80">
                <div className="text-[10px] text-slate-400 uppercase">GNSS / GPS Signal Scintillation</div>
                <div className="text-cyan-400 font-bold mt-0.5">UNSTRESSED (Nominal)</div>
                <div className="text-[10px] text-slate-400 mt-1">Total Electron Content (TEC) gradients stable across mid-latitudes.</div>
              </div>

              <div className="p-3 rounded-lg bg-space-950 border border-slate-800/80">
                <div className="text-[10px] text-slate-400 uppercase">High Voltage Power Grids</div>
                <div className="text-emerald-400 font-bold mt-0.5">0.0 A/km GIC</div>
                <div className="text-[10px] text-slate-400 mt-1">Geomagnetically Induced Currents negligible at transformer neutrals.</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Solar Flare Telemetry, CME Shockwave, Historical Storms (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Solar Flare & Active Region Telemetry */}
          <div className="hud-card p-6 rounded-2xl border border-slate-800 bg-space-900/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                Solar Flare Detection Telemetry (GOES-16/18 X-Ray Sensor)
              </span>
              <span className="text-[10px] font-mono text-cyan-400">REAL-TIME FLUX MONITOR</span>
            </div>

            <div className="space-y-3">
              {weather.solarFlares.map((flare) => (
                <div key={flare.id} className="p-3.5 rounded-xl bg-space-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs font-mono ${
                      flare.classification.startsWith('X')
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : flare.classification.startsWith('M')
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {flare.classification[0]}
                    </div>
                    <div>
                      <div className="text-sm font-outfit font-bold text-white flex items-center gap-2">
                        {flare.id}
                        {flare.earthDirected && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            EARTH-DIRECTED
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-mono text-slate-400">
                        Active Region: <span className="text-slate-200 font-semibold">{flare.activeRegion}</span> | Peak: {flare.peakTimeUtc}
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right font-mono">
                    <div className="text-[10px] text-slate-400 uppercase">X-Ray Peak Flux</div>
                    <div className="text-xs font-bold text-cyan-400">{flare.fluxPeakWm2}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coronal Mass Ejection Shockwave Arrival Window */}
          <div className="hud-card p-6 rounded-2xl border border-cyan-400/30 bg-space-900/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Coronal Mass Ejection (CME) Transit Predictor (WSA-Enlil Model)
              </span>
              <span className="text-[10px] font-mono text-amber-400">NASA DONKI MODEL</span>
            </div>

            {weather.coronalMassEjections.map((cme) => (
              <div key={cme.id} className="p-4 rounded-xl bg-space-950 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-sm font-outfit font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    {cme.id} (Ejected with {cme.associatedFlare})
                  </div>
                  <div className="text-xs font-mono text-cyan-400 font-bold">
                    Shock Velocity: {cme.speedKms} km/s
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono pt-1">
                  <div className="bg-space-900 p-2 rounded border border-slate-800">
                    <div className="text-[9px] text-slate-400 uppercase">Sun-Earth Transit</div>
                    <div className="text-white font-bold">{cme.earthTransitHours} hours</div>
                  </div>
                  <div className="bg-space-900 p-2 rounded border border-slate-800">
                    <div className="text-[9px] text-slate-400 uppercase">Predicted Arrival Window</div>
                    <div className="text-amber-400 font-bold">{cme.arrivalWindowUtc}</div>
                  </div>
                  <div className="bg-space-900 p-2 rounded border border-slate-800 col-span-2 sm:col-span-1">
                    <div className="text-[9px] text-slate-400 uppercase">Expected Density Shock</div>
                    <div className="text-cyan-400 font-bold">Halo Glancing Blow</div>
                  </div>
                </div>

                <p className="text-xs font-mono text-slate-300 leading-relaxed pt-1">
                  <strong className="text-slate-100">Predicted Impact:</strong> {cme.potentialImpact}
                </p>
              </div>
            ))}
          </div>

          {/* Historical Superstorm Benchmarks */}
          <div className="hud-card p-6 rounded-2xl border border-slate-800 bg-space-900/60 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Historical Superstorm Benchmark Database
            </h3>

            <div className="space-y-3">
              {HISTORICAL_SPACE_WEATHER_BENCHMARKS.map((storm) => (
                <div key={storm.name} className="p-3.5 rounded-xl bg-space-950 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit font-bold text-white">
                      {storm.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/40 font-bold">
                      Kp {storm.estimatedKp} | Dst {storm.peakDst}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Occurred: {storm.date}
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {storm.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
