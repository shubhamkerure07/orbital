export type DiscoveryMethod = 'Transit' | 'Radial Velocity' | 'Direct Imaging' | 'Microlensing' | 'Transit Timing Variation';
export type PlanetTypeExo = 'Terrestrial' | 'Super-Earth' | 'Sub-Neptune' | 'Gas Giant' | 'Hot Jupiter' | 'Lava World';

export interface ExoplanetData {
  id: string;
  name: string;
  hostStar: {
    name: string;
    spectralType: string;
    temperatureKelvin: number;
    massSolarRelative: number;
    radiusSolarRelative: number;
    constellation: string;
  };
  distanceLightYears: number;
  discoveryYear: number;
  discoveryMethod: DiscoveryMethod;
  discoveryFacility: string;
  planetType: PlanetTypeExo;
  radiusEarthRelative: number;
  massEarthRelative: number;
  orbitalPeriodDays: number;
  semiMajorAxisAu: number;
  eccentricity: number;
  equilibriumTempCelsius: number;
  stellarFluxEarthRelative: number; // S/S_earth
  isInHabitableZone: boolean;
  atmosphereDetected: boolean;
  atmosphericMolecules: string[];
  summary: string;
  keyScientificSignificance: string;
  sourceReference: string;
  sourceUrl: string;
}

export const EXOPLANETS_DATABASE: ExoplanetData[] = [
  {
    id: 'trappist-1e',
    name: 'TRAPPIST-1e',
    hostStar: {
      name: 'TRAPPIST-1',
      spectralType: 'M8V (Ultra-cool Red Dwarf)',
      temperatureKelvin: 2566,
      massSolarRelative: 0.089,
      radiusSolarRelative: 0.121,
      constellation: 'Aquarius'
    },
    distanceLightYears: 39.46,
    discoveryYear: 2017,
    discoveryMethod: 'Transit',
    discoveryFacility: 'TRAPPIST / Spitzer Space Telescope',
    planetType: 'Terrestrial',
    radiusEarthRelative: 0.92,
    massEarthRelative: 0.69,
    orbitalPeriodDays: 6.1,
    semiMajorAxisAu: 0.029,
    eccentricity: 0.005,
    equilibriumTempCelsius: -27,
    stellarFluxEarthRelative: 0.66,
    isInHabitableZone: true,
    atmosphereDetected: false, // Under observation by JWST
    atmosphericMolecules: ['CO2 (Targeted)', 'H2O (Targeted)'],
    summary: 'TRAPPIST-1e is considered one of the prime targets in modern astrobiology. Orbiting comfortably in the conservative habitable zone of an ultra-cool dwarf star, its bulk density is remarkably similar to Earth, indicating an iron-rich rocky core.',
    keyScientificSignificance: 'Subject of multiple JWST Cycle 1, 2, and 3 transmission spectroscopy campaigns to constrain whether rocky planets orbiting M-dwarfs can retain atmospheres against stellar flare erosion.',
    sourceReference: 'NASA Exoplanet Archive / Gillon et al. (Nature 2017)',
    sourceUrl: 'https://exoplanetarchive.ipac.caltech.edu/overview/TRAPPIST-1e'
  },
  {
    id: 'proxima-centauri-b',
    name: 'Proxima Centauri b',
    hostStar: {
      name: 'Proxima Centauri (Alpha Centauri C)',
      spectralType: 'M5.5Ve (Red Dwarf Flaring Star)',
      temperatureKelvin: 3042,
      massSolarRelative: 0.122,
      radiusSolarRelative: 0.154,
      constellation: 'Centaurus'
    },
    distanceLightYears: 4.24,
    discoveryYear: 2016,
    discoveryMethod: 'Radial Velocity',
    discoveryFacility: 'ESO 3.6m Telescope / HARPS Spectrograph',
    planetType: 'Terrestrial',
    radiusEarthRelative: 1.07,
    massEarthRelative: 1.17, // Minimum mass (m sin i)
    orbitalPeriodDays: 11.186,
    semiMajorAxisAu: 0.0485,
    eccentricity: 0.08,
    equilibriumTempCelsius: -39,
    stellarFluxEarthRelative: 0.65,
    isInHabitableZone: true,
    atmosphereDetected: false,
    atmosphericMolecules: [],
    summary: 'The closest known extrasolar planet to Earth, orbiting our nearest stellar neighbor just 4.24 light-years away. It receives roughly 65% of Earth’s solar flux, but is subjected to periodic superflares and strong ultraviolet irradiation.',
    keyScientificSignificance: 'The premier candidate for future interstellar laser-sail probes (such as Breakthrough Starshot) to photograph directly in situ.',
    sourceReference: 'European Southern Observatory (ESO) / Anglada-Escudé et al.',
    sourceUrl: 'https://www.eso.org/public/news/eso1629/'
  },
  {
    id: 'kepler-452b',
    name: 'Kepler-452b',
    hostStar: {
      name: 'Kepler-452',
      spectralType: 'G2V (Sun-like Yellow Dwarf)',
      temperatureKelvin: 5757,
      massSolarRelative: 1.037,
      radiusSolarRelative: 1.11,
      constellation: 'Cygnus'
    },
    distanceLightYears: 1780,
    discoveryYear: 2015,
    discoveryMethod: 'Transit',
    discoveryFacility: 'NASA Kepler Space Telescope',
    planetType: 'Super-Earth',
    radiusEarthRelative: 1.63,
    massEarthRelative: 5.0, // Estimated
    orbitalPeriodDays: 384.84,
    semiMajorAxisAu: 1.046,
    eccentricity: 0.035,
    equilibriumTempCelsius: -8,
    stellarFluxEarthRelative: 1.10,
    isInHabitableZone: true,
    atmosphereDetected: false,
    atmosphericMolecules: [],
    summary: 'Often referred to as "Earth’s Older Cousin", Kepler-452b has an orbital period of 385 days around a star remarkably similar to our Sun in mass and temperature, but approximately 1.5 billion years older.',
    keyScientificSignificance: 'Provides insight into the long-term evolutionary fate of habitable-zone terrestrial planets as their host star slowly brightens over billions of years.',
    sourceReference: 'NASA Kepler Mission / Jenkins et al. (AJ 2015)',
    sourceUrl: 'https://science.nasa.gov/exoplanet-catalog/kepler-452-b/'
  },
  {
    id: 'wasp-39b',
    name: 'WASP-39 b (Bocaprins)',
    hostStar: {
      name: 'WASP-39 (Malmok)',
      spectralType: 'G8V',
      temperatureKelvin: 5400,
      massSolarRelative: 0.93,
      radiusSolarRelative: 0.895,
      constellation: 'Virgo'
    },
    distanceLightYears: 698,
    discoveryYear: 2011,
    discoveryMethod: 'Transit',
    discoveryFacility: 'SuperWASP / JWST Transiting Exoplanet Community',
    planetType: 'Gas Giant',
    radiusEarthRelative: 14.22, // 1.27 Jupiter radii
    massEarthRelative: 89.0,   // 0.28 Jupiter masses ("Hot Saturn")
    orbitalPeriodDays: 4.055,
    semiMajorAxisAu: 0.0486,
    eccentricity: 0.0,
    equilibriumTempCelsius: 876,
    stellarFluxEarthRelative: 380,
    isInHabitableZone: false,
    atmosphereDetected: true,
    atmosphericMolecules: ['CO2 (Confirmed)', 'H2O (Confirmed)', 'SO2 (Confirmed)', 'CO (Confirmed)', 'Na', 'K'],
    summary: 'A puffed-up, low-density hot giant planet. In 2022, the James Webb Space Telescope used WASP-39 b to capture the first unambiguous detection of carbon dioxide and sulfur dioxide photochemistry in an exoplanet atmosphere.',
    keyScientificSignificance: 'Gold-standard benchmark for exoplanetary atmospheric transmission spectroscopy and atmospheric chemistry modeling.',
    sourceReference: 'NASA JWST Transiting Exoplanet Early Release Science Team / Nature 2023',
    sourceUrl: 'https://webb.nasa.gov/content/news/wasp39b.html'
  },
  {
    id: 'k2-18b',
    name: 'K2-18 b',
    hostStar: {
      name: 'K2-18',
      spectralType: 'M2.8V (Red Dwarf)',
      temperatureKelvin: 3457,
      massSolarRelative: 0.495,
      radiusSolarRelative: 0.469,
      constellation: 'Leo'
    },
    distanceLightYears: 124,
    discoveryYear: 2015,
    discoveryMethod: 'Transit',
    discoveryFacility: 'NASA Kepler K2 Mission / JWST NIRISS & NIRSpec',
    planetType: 'Sub-Neptune',
    radiusEarthRelative: 2.61,
    massEarthRelative: 8.63,
    orbitalPeriodDays: 32.94,
    semiMajorAxisAu: 0.143,
    eccentricity: 0.20,
    equilibriumTempCelsius: -6,
    stellarFluxEarthRelative: 1.22,
    isInHabitableZone: true,
    atmosphereDetected: true,
    atmosphericMolecules: ['CH4 (Methane)', 'CO2 (Carbon Dioxide)', 'No detectable Ammonia'],
    summary: 'A sub-Neptune world located in the habitable zone of its star. JWST observations confirmed abundant methane and carbon dioxide with a scarcity of ammonia, consistent with hypotheses of a hydrogen-rich atmosphere overlying a water ocean (a candidate Hycean world).',
    keyScientificSignificance: 'Testing grounds for the "Hycean" planet hypothesis—ocean-covered worlds with hydrogen atmospheres that could harbor microbial ocean life.',
    sourceReference: 'NASA / Madhusudhan et al. (Astrophysical Journal Letters 2023)',
    sourceUrl: 'https://science.nasa.gov/exoplanet-catalog/k2-18-b/'
  },
  {
    id: '55-cancri-e',
    name: '55 Cancri e (Janssen)',
    hostStar: {
      name: '55 Cancri A (Copernicus)',
      spectralType: 'G8V (Binary companion to M dwarf)',
      temperatureKelvin: 5196,
      massSolarRelative: 0.905,
      radiusSolarRelative: 0.943,
      constellation: 'Cancer'
    },
    distanceLightYears: 41.06,
    discoveryYear: 2004,
    discoveryMethod: 'Radial Velocity',
    discoveryFacility: 'Harlan J. Smith Telescope / Spitzer / JWST',
    planetType: 'Lava World',
    radiusEarthRelative: 1.87,
    massEarthRelative: 7.99,
    orbitalPeriodDays: 0.7365, // ~17.7 hours!
    semiMajorAxisAu: 0.0154,
    eccentricity: 0.05,
    equilibriumTempCelsius: 1950,
    stellarFluxEarthRelative: 2400,
    isInHabitableZone: false,
    atmosphereDetected: true,
    atmosphericMolecules: ['CO / CO2 (Carbon-rich secondary magma vapor)'],
    summary: 'A hellish super-Earth orbiting so close to its star that its surface temperature exceeds 2,000°C. In 2024, JWST MIRI thermal measurements indicated it retains a thick carbon-monoxide or carbon-dioxide atmosphere continually outgassing from a global molten magma ocean.',
    keyScientificSignificance: 'First evidence of a secondary volatile atmosphere around any rocky super-Earth outside the solar system.',
    sourceReference: 'Nature / NASA JPL / Hu et al. (2024)',
    sourceUrl: 'https://science.nasa.gov/exoplanet-catalog/55-cancri-e/'
  }
];
