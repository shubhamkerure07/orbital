export type CelestialType = 'Star' | 'Terrestrial Planet' | 'Gas Giant' | 'Ice Giant' | 'Dwarf Planet' | 'Moon';

export interface PlanetData {
  id: string;
  name: string;
  tagline: string;
  type: CelestialType;
  orderFromSun: number;
  diameterKm: number;
  massEarthRelative: number;
  distanceFromSunMillionKm: number; // AU or Millions km
  distanceAu: number;
  orbitalPeriodDays: number;
  orbitalVelocityKms: number;
  rotationPeriodHours: number;
  dayLengthHours: number;
  avgTempCelsius: number;
  minTempCelsius?: number;
  maxTempCelsius?: number;
  surfaceGravityMs2: number;
  gravityEarthRelative: number;
  moonsCount: number;
  notableMoons: string[];
  atmosphereComposition: { gas: string; percentage: number }[];
  colorHex: string;
  roughColor: string;
  accentColor: string;
  hasRings: boolean;
  ringsRadiusInner?: number;
  ringsRadiusOuter?: number;
  axialTiltDegrees: number;
  sizeVisualScale: number;
  orbitRadiusVisual: number;
  overview: string;
  keyFeatures: string[];
  scientificNotes: string;
  relatedMissionIds: string[];
  officialSource: string;
  officialSourceUrl: string;
}

export type MissionStatus = 'active' | 'completed' | 'planned' | 'en-route';
export type MissionCategory = 'Orbiter' | 'Rover' | 'Lander' | 'Flyby' | 'Space Telescope' | 'Crewed' | 'Sample Return' | 'Probe';

export interface MissionMilestone {
  date: string;
  title: string;
  description: string;
}

export interface MissionData {
  id: string;
  name: string;
  agency: string;
  operatorCountry: string;
  category: MissionCategory;
  destination: string;
  destinationPlanetId?: string;
  launchDate: string;
  endDate?: string;
  status: MissionStatus;
  spacecraft: string;
  launchVehicle?: string;
  objectives: string[];
  scientificAchievements: string[];
  milestones: MissionMilestone[];
  imageUrl: string;
  imageCaption: string;
  officialSourceUrl: string;
  officialReference: string;
}

export interface RocketStage {
  stageNumber: number;
  name: string;
  engines: string;
  thrustKn: number;
  propellant: string;
  burnTimeSeconds: number;
  purpose: string;
  reusable: boolean;
}

export interface LaunchSequenceStep {
  timeOffset: string;
  title: string;
  altitudeKm: number;
  velocityKmh: number;
  description: string;
  phase: 'countdown' | 'boost' | 'staging' | 'fairing' | 'orbital-insertion' | 'deployment';
}

export interface RocketData {
  id: string;
  name: string;
  operator: string;
  country: string;
  heightMeters: number;
  diameterMeters: number;
  stagesCount: number;
  grossMassKg: number;
  payloadLeoKg: number;
  payloadGtoKg?: number;
  payloadMarsKg?: number;
  propulsionSummary: string;
  firstFlightYear: number;
  status: 'Operational' | 'Retired' | 'Under Development';
  totalLaunches?: number;
  successRatePercent?: number;
  stages: RocketStage[];
  launchSequence: LaunchSequenceStep[];
  description: string;
  officialSource: string;
  sourceUrl: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface DestinationData {
  id: string;
  name: string;
  category: 'Moon' | 'Terrestrial Planet' | 'Ocean World' | 'Gas Giant World' | 'Exoplanet';
  parentBodyOrStar: string;
  distanceFromEarth: string;
  surfaceGravity: string;
  surfaceTempRange: string;
  atmosphericPressure: string;
  habitabilityIndexNotes: string;
  overview: string;
  surfaceAndGeology: string;
  atmosphericDetails: string;
  explorationHistory: string;
  openQuestions: string[];
  activeMissions: string[];
  heroImageUrl: string;
  color: string;
  officialReference: string;
  sourceUrl: string;
}

export interface OrbitalPreset {
  id: string;
  name: string;
  description: string;
  centralMass: number; // in arbitrary units or 10^24 kg
  radius: number;      // simulation units
  velocity: number;    // simulation units
  theoreticalTrajectory: 'circular' | 'elliptical' | 'hyperbolic' | 'decay';
  notes: string;
}

export interface DiscoveryItem {
  id: string;
  title: string;
  date: string;
  explanation: string;
  mediaType: 'image' | 'video';
  url: string;
  hdUrl?: string;
  copyright?: string;
  creditAgency: string;
  tags: string[];
  relatedTopic?: string;
  topicRoute?: string;
}
