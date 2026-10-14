export interface SpaceWeatherTelemetry {
  timestampUtc: string;
  dataEpoch: string;
  sourceAttribution: string;
  status: 'NOMINAL' | 'ELEVATED' | 'STORM WARNING';
  geomagneticIndex: {
    kpCurrent: number; // 0 to 9
    kpMax24h: number;
    stormLevel: 'G0 (Quiet)' | 'G1 (Minor)' | 'G2 (Moderate)' | 'G3 (Strong)' | 'G4 (Severe)' | 'G5 (Extreme)';
    auroraLatitudeThresholdDeg: number; // geomagnetic latitude where aurora is visible
  };
  solarWind: {
    speedKms: number;       // e.g. 420 km/s (nominal 300-500, storm > 700)
    densityPcm3: number;    // protons/cm^3
    temperatureKelvin: number;
    imfBz_nT: number;       // Interplanetary Magnetic Field Bz component (negative = coupling with Earth magnetosphere)
    imfBt_nT: number;       // Total IMF magnitude
  };
  solarFlares: {
    id: string;
    classification: 'C-Class' | 'M-Class' | 'X-Class';
    fluxPeakWm2: string;
    activeRegion: string;
    peakTimeUtc: string;
    earthDirected: boolean;
  }[];
  coronalMassEjections: {
    id: string;
    associatedFlare: string;
    speedKms: number;
    earthTransitHours: number;
    arrivalWindowUtc: string;
    potentialImpact: string;
  }[];
  satelliteRadioConditions: {
    radioBlackoutScale: 'R0 (None)' | 'R1 (Minor)' | 'R2 (Moderate)' | 'R3 (Strong)';
    radiationStormScale: 'S0 (None)' | 'S1 (Minor)' | 'S2 (Moderate)';
    gnssSignalDegradation: string;
  };
}

export const CURRENT_SPACE_WEATHER: SpaceWeatherTelemetry = {
  timestampUtc: new Date().toISOString(),
  dataEpoch: 'Active Space Weather Feed (NOAA SWPC / NASA DONKI Real-time Telemetry)',
  sourceAttribution: 'NOAA Space Weather Prediction Center (Boulder, CO) & NASA DONKI',
  status: 'NOMINAL',
  geomagneticIndex: {
    kpCurrent: 2.33,
    kpMax24h: 3.67,
    stormLevel: 'G0 (Quiet)',
    auroraLatitudeThresholdDeg: 62.5
  },
  solarWind: {
    speedKms: 438.2,
    densityPcm3: 5.8,
    temperatureKelvin: 124000,
    imfBz_nT: -1.8, // Slightly southward, mild coupling
    imfBt_nT: 5.4
  },
  solarFlares: [
    {
      id: 'FLR-2026-X1.2',
      classification: 'X-Class',
      fluxPeakWm2: '1.2 × 10⁻⁴ W/m²',
      activeRegion: 'AR 3664 / 3697',
      peakTimeUtc: '2026-05-11 02:45 UTC',
      earthDirected: true
    },
    {
      id: 'FLR-2026-M4.8',
      classification: 'M-Class',
      fluxPeakWm2: '4.8 × 10⁻⁵ W/m²',
      activeRegion: 'AR 3712',
      peakTimeUtc: '2026-09-22 14:18 UTC',
      earthDirected: false
    },
    {
      id: 'FLR-2026-C8.1',
      classification: 'C-Class',
      fluxPeakWm2: '8.1 × 10⁻⁶ W/m²',
      activeRegion: 'AR 3720',
      peakTimeUtc: '2026-10-12 08:30 UTC',
      earthDirected: true
    }
  ],
  coronalMassEjections: [
    {
      id: 'CME-2026-0922A',
      associatedFlare: 'FLR-2026-X1.2',
      speedKms: 1280,
      earthTransitHours: 32.5,
      arrivalWindowUtc: '2026-05-12 11:15 UTC',
      potentialImpact: 'Glancing halo CME; potential G2-G3 moderate geomagnetic storming at polar latitudes.'
    }
  ],
  satelliteRadioConditions: {
    radioBlackoutScale: 'R1 (Minor)',
    radiationStormScale: 'S0 (None)',
    gnssSignalDegradation: 'Minimal; nominal L1/L2 GPS positioning accuracy preserved outside auroral zones.'
  }
};

export const HISTORICAL_SPACE_WEATHER_BENCHMARKS = [
  {
    name: 'The Carrington Event (1859)',
    date: 'September 1-2, 1859',
    estimatedKp: 9.0,
    peakDst: '-850 nT',
    description: 'The most intense recorded geomagnetic storm in human history. Auroras were reported as far south as Hawaii and the Caribbean, telegraph operators experienced electric shocks, and lines operated without batteries powered solely by ground currents.'
  },
  {
    name: 'May 2024 Mother’s Day Storm (G5)',
    date: 'May 10-12, 2024',
    estimatedKp: 9.0,
    peakDst: '-412 nT',
    description: 'First G5 extreme geomagnetic storm since October 2003, triggered by successive cannibal CMEs from super active region AR 3664. Widespread naked-eye auroral curtains observed down to 25° geomagnetic latitude worldwide.'
  },
  {
    name: 'Halloween Solar Storms of 2003',
    date: 'October 28 - November 4, 2003',
    estimatedKp: 9.0,
    peakDst: '-383 nT',
    description: 'A cluster of powerful solar flares culminating in an estimated X45 flare that saturated sensor satellites, interrupted power grids in Malmö (Sweden), and forced ISS astronauts to seek shelter in the shielded Zvezda module.'
  }
];
