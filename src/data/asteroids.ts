export type AsteroidClass = 'Aten' | 'Apollo' | 'Amor' | 'Main Belt' | 'Atira';

export interface CloseApproachEvent {
  date: string;
  epochTimestampMs: number;
  missDistanceKm: number;
  missDistanceLd: number; // Lunar Distances (1 LD = 384,400 km)
  missDistanceAu: number;
  relativeVelocityKms: number;
  relativeVelocityKmh: number;
  orbitingBody: string;
}

export interface AsteroidData {
  id: string;
  name: string;
  designation: string;
  classification: AsteroidClass;
  isPotentiallyHazardous: boolean;
  estimatedDiameterMeters: {
    min: number;
    max: number;
  };
  absoluteMagnitudeH: number;
  albedo: number;
  orbitalParameters: {
    semiMajorAxisAu: number;
    eccentricity: number;
    inclinationDeg: number;
    orbitalPeriodDays: number;
    perihelionAu: number;
    aphelionAu: number;
  };
  closeApproaches: CloseApproachEvent[];
  radarObserved: boolean;
  spectralType: string;
  associatedMissions: string[];
  summary: string;
  riskAssessment: {
    torinoScale: number; // 0 to 10
    palermoScaleValue: number;
    hazardExplanation: string;
  };
  sourceReference: string;
  sourceUrl: string;
}

export const ASTEROIDS_DATABASE: AsteroidData[] = [
  {
    id: '99942-apophis',
    name: '99942 Apophis',
    designation: '2004 MN4',
    classification: 'Aten',
    isPotentiallyHazardous: true,
    estimatedDiameterMeters: { min: 340, max: 375 },
    absoluteMagnitudeH: 19.7,
    albedo: 0.33,
    orbitalParameters: {
      semiMajorAxisAu: 0.9224,
      eccentricity: 0.1912,
      inclinationDeg: 3.331,
      orbitalPeriodDays: 323.6,
      perihelionAu: 0.746,
      aphelionAu: 1.099
    },
    closeApproaches: [
      {
        date: '2029-04-13 21:46 UTC',
        epochTimestampMs: 1870811160000,
        missDistanceKm: 31600,
        missDistanceLd: 0.082,
        missDistanceAu: 0.000211,
        relativeVelocityKms: 7.43,
        relativeVelocityKmh: 26748,
        orbitingBody: 'Earth'
      },
      {
        date: '2036-04-13 14:15 UTC',
        epochTimestampMs: 2091622500000,
        missDistanceKm: 46800000,
        missDistanceLd: 121.7,
        missDistanceAu: 0.3128,
        relativeVelocityKms: 10.98,
        relativeVelocityKmh: 39528,
        orbitingBody: 'Earth'
      }
    ],
    radarObserved: true,
    spectralType: 'Sq (Stony-silicate)',
    associatedMissions: ['OSIRIS-APEX (NASA En route)'],
    summary: 'Apophis is one of the most thoroughly tracked Near-Earth Asteroids. On April 13, 2029, it will pass within 31,600 km of Earth’s surface—closer than geostationary weather satellites—visible to the naked eye across Europe, Africa, and Asia.',
    riskAssessment: {
      torinoScale: 0,
      palermoScaleValue: -2.8,
      hazardExplanation: 'Extensive radar and optical tracking by Goldstone Observatory and planetary radar have completely ruled out any Earth impact probability for the next 100+ years.'
    },
    sourceReference: 'NASA JPL Center for Near Earth Object Studies (CNEOS) / Goldstone Radar',
    sourceUrl: 'https://cneos.jpl.nasa.gov/news/news210.html'
  },
  {
    id: '101955-bennu',
    name: '101955 Bennu',
    designation: '1999 RQ36',
    classification: 'Apollo',
    isPotentiallyHazardous: true,
    estimatedDiameterMeters: { min: 480, max: 510 },
    absoluteMagnitudeH: 20.9,
    albedo: 0.044,
    orbitalParameters: {
      semiMajorAxisAu: 1.126,
      eccentricity: 0.2037,
      inclinationDeg: 6.035,
      orbitalPeriodDays: 436.6,
      perihelionAu: 0.897,
      aphelionAu: 1.356
    },
    closeApproaches: [
      {
        date: '2135-09-25 18:00 UTC',
        epochTimestampMs: 5229952800000,
        missDistanceKm: 197000,
        missDistanceLd: 0.51,
        missDistanceAu: 0.00132,
        relativeVelocityKms: 6.12,
        relativeVelocityKmh: 22032,
        orbitingBody: 'Earth'
      }
    ],
    radarObserved: true,
    spectralType: 'B-type (Carbonaceous rubble-pile)',
    associatedMissions: ['OSIRIS-REx (NASA Sample Return Success 2023)'],
    summary: 'Bennu is an ancient carbonaceous rubble-pile asteroid with very low bulk density (~1190 kg/m³). In September 2023, NASA’s OSIRIS-REx spacecraft successfully returned 121.6 grams of pristine carbon and water-bearing material from Bennu to Earth.',
    riskAssessment: {
      torinoScale: 0,
      palermoScaleValue: -1.59,
      hazardExplanation: 'Cumulative impact probability across the late 22nd century is approximately 1 in 1,750 (0.057%). High-precision orbit determination models gravitational keyholes during the 2135 flyby.'
    },
    sourceReference: 'NASA OSIRIS-REx Science Team / JPL CNEOS',
    sourceUrl: 'https://www.nasa.gov/mission/osiris-rex/'
  },
  {
    id: '65803-didymos',
    name: '65803 Didymos & Dimorphos',
    designation: '1996 GT',
    classification: 'Apollo',
    isPotentiallyHazardous: true,
    estimatedDiameterMeters: { min: 760, max: 800 },
    absoluteMagnitudeH: 18.2,
    albedo: 0.15,
    orbitalParameters: {
      semiMajorAxisAu: 1.644,
      eccentricity: 0.3838,
      inclinationDeg: 3.408,
      orbitalPeriodDays: 770.2,
      perihelionAu: 1.013,
      aphelionAu: 2.275
    },
    closeApproaches: [
      {
        date: '2022-10-04 12:00 UTC',
        epochTimestampMs: 1664884800000,
        missDistanceKm: 10600000,
        missDistanceLd: 27.6,
        missDistanceAu: 0.0708,
        relativeVelocityKms: 6.1,
        relativeVelocityKmh: 21960,
        orbitingBody: 'Earth'
      }
    ],
    radarObserved: true,
    spectralType: 'Xk-type (Stony binary)',
    associatedMissions: ['DART (NASA 2022 Impact)', 'Hera (ESA En route)'],
    summary: 'Didymos is a binary asteroid system with satellite moonlet Dimorphos (160m). On September 26, 2022, NASA’s DART mission intentionally impacted Dimorphos at 22,500 km/h, shortening its orbital period by 33 minutes and validating kinetic impactor planetary defense.',
    riskAssessment: {
      torinoScale: 0,
      palermoScaleValue: -4.1,
      hazardExplanation: 'Non-threatening to Earth; selected deliberately as the ideal benchmark target for kinetic planetary defense testing due to measurable binary orbital period shifts.'
    },
    sourceReference: 'NASA Planetary Defense Coordination Office (PDCO)',
    sourceUrl: 'https://science.nasa.gov/mission/dart/'
  },
  {
    id: '162173-ryugu',
    name: '162173 Ryugu',
    designation: '1999 JU3',
    classification: 'Apollo',
    isPotentiallyHazardous: true,
    estimatedDiameterMeters: { min: 860, max: 900 },
    absoluteMagnitudeH: 19.3,
    albedo: 0.045,
    orbitalParameters: {
      semiMajorAxisAu: 1.190,
      eccentricity: 0.1902,
      inclinationDeg: 5.884,
      orbitalPeriodDays: 474.3,
      perihelionAu: 0.963,
      aphelionAu: 1.416
    },
    closeApproaches: [
      {
        date: '2020-12-06 02:00 UTC',
        epochTimestampMs: 1607220000000,
        missDistanceKm: 8900000,
        missDistanceLd: 23.1,
        missDistanceAu: 0.0595,
        relativeVelocityKms: 7.8,
        relativeVelocityKmh: 28080,
        orbitingBody: 'Earth'
      }
    ],
    radarObserved: true,
    spectralType: 'Cb-type (Hydrated carbonaceous)',
    associatedMissions: ['Hayabusa2 (JAXA Sample Return)'],
    summary: 'Ryugu is a spinning-top shaped carbonaceous rubble-pile asteroid surveyed by JAXA’s Hayabusa2 spacecraft, which returned 5.4 grams of asteroid soil containing 20+ amino acids and prebiotic organic matter in December 2020.',
    riskAssessment: {
      torinoScale: 0,
      palermoScaleValue: -3.8,
      hazardExplanation: 'Orbit is well-constrained; does not pose significant impact hazard over century timescales.'
    },
    sourceReference: 'JAXA Hayabusa2 Science Team / Nature Astronomy',
    sourceUrl: 'https://www.isas.jaxa.jp/en/missions/spacecraft/current/hayabusa2.html'
  },
  {
    id: '16-psyche',
    name: '16 Psyche',
    designation: '16 Psyche',
    classification: 'Main Belt',
    isPotentiallyHazardous: false,
    estimatedDiameterMeters: { min: 220000, max: 230000 },
    absoluteMagnitudeH: 5.9,
    albedo: 0.15,
    orbitalParameters: {
      semiMajorAxisAu: 2.924,
      eccentricity: 0.134,
      inclinationDeg: 3.095,
      orbitalPeriodDays: 1827.0,
      perihelionAu: 2.532,
      aphelionAu: 3.316
    },
    closeApproaches: [],
    radarObserved: true,
    spectralType: 'M-type (Metallic Nickel-Iron)',
    associatedMissions: ['Psyche (NASA En route, launched Oct 2023)'],
    summary: 'Psyche is one of the largest asteroids in the main belt (~226 km diameter) and appears to be the exposed metallic nickel-iron core of an early protoplanet stripped of its rocky mantle by catastrophic collisions.',
    riskAssessment: {
      torinoScale: 0,
      palermoScaleValue: -10,
      hazardExplanation: 'Located entirely inside the main asteroid belt between Mars and Jupiter with stable orbital eccentricity; zero Earth collision risk.'
    },
    sourceReference: 'NASA JPL / Psyche Mission (Arizona State University)',
    sourceUrl: 'https://science.nasa.gov/mission/psyche/'
  },
  {
    id: '433-eros',
    name: '433 Eros',
    designation: '1898 DQ',
    classification: 'Amor',
    isPotentiallyHazardous: false,
    estimatedDiameterMeters: { min: 16800, max: 34400 },
    absoluteMagnitudeH: 11.16,
    albedo: 0.25,
    orbitalParameters: {
      semiMajorAxisAu: 1.458,
      eccentricity: 0.2227,
      inclinationDeg: 10.829,
      orbitalPeriodDays: 643.2,
      perihelionAu: 1.133,
      aphelionAu: 1.783
    },
    closeApproaches: [
      {
        date: '2012-01-31 09:00 UTC',
        epochTimestampMs: 1328000400000,
        missDistanceKm: 26700000,
        missDistanceLd: 69.5,
        missDistanceAu: 0.1787,
        relativeVelocityKms: 5.86,
        relativeVelocityKmh: 21096,
        orbitingBody: 'Earth'
      }
    ],
    radarObserved: true,
    spectralType: 'S-type (Silicate-rich)',
    associatedMissions: ['NEAR Shoemaker (NASA Landed 2001)'],
    summary: 'Eros was the first discovered Near-Earth Asteroid (1898) and the first asteroid ever orbited and landed upon by a spacecraft (NEAR Shoemaker in February 2001). An elongated banana-shaped stony body with extensive boulder distribution.',
    riskAssessment: {
      torinoScale: 0,
      palermoScaleValue: -6.2,
      hazardExplanation: 'Amor class asteroid whose perihelion remains strictly outside Earth’s orbit at 1.133 AU. No current impact threat.'
    },
    sourceReference: 'NASA APL / NEAR Shoemaker Archive',
    sourceUrl: 'https://science.nasa.gov/mission/near-shoemaker/'
  }
];
