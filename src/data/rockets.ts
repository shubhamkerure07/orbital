import { RocketData } from '../types';

export const ROCKETS: RocketData[] = [
  {
    id: 'falcon-9',
    name: 'Falcon 9 Block 5',
    operator: 'SpaceX',
    country: 'United States',
    heightMeters: 70.0,
    diameterMeters: 3.7,
    stagesCount: 2,
    grossMassKg: 549054,
    payloadLeoKg: 22800, // Expendable, ~17,500 kg reusable drone ship
    payloadGtoKg: 8300,
    payloadMarsKg: 4020,
    propulsionSummary: '9 × Merlin 1D sea-level engines on Stage 1; 1 × Merlin 1D Vacuum engine on Stage 2 (RP-1 / LOX)',
    firstFlightYear: 2010,
    status: 'Operational',
    totalLaunches: 380,
    successRatePercent: 99.2,
    colorScheme: {
      primary: '#E2E8F0',
      secondary: '#1E293B',
      accent: '#0EA5E9'
    },
    description: 'Falcon 9 is the world’s first orbital class reusable rocket. It pioneered propulsive vertical booster landings on autonomous drone ships and landing pads, radically lowering commercial launch costs and providing reliable cargo and crew transit to the International Space Station.',
    stages: [
      {
        stageNumber: 1,
        name: 'First Stage Booster (B10xx)',
        engines: '9 × SpaceX Merlin 1D engines in Octaweb configuration',
        thrustKn: 7607, // ~1,710,000 lbf at sea level
        propellant: 'Sub-cooled Liquid Oxygen (LOX) and RP-1 Rocket Propellant',
        burnTimeSeconds: 162,
        purpose: 'Provides initial high-thrust atmospheric ascent, lifts vehicle through Max-Q, separates, and performs boostback and entry burns for landing.',
        reusable: true
      },
      {
        stageNumber: 2,
        name: 'Second Stage (M-Vac)',
        engines: '1 × Merlin Vacuum (MVac) with radiation-cooled niobium nozzle extension',
        thrustKn: 981,
        propellant: 'Liquid Oxygen (LOX) and RP-1',
        burnTimeSeconds: 397,
        purpose: 'Operates in pure vacuum to accelerate payloads to orbital velocity (~7.8 km/s) or execute restartable burns for GTO/heliocentric injection.',
        reusable: false
      }
    ],
    launchSequence: [
      {
        timeOffset: 'T-00:00:03',
        title: 'Ignition Sequence Start',
        altitudeKm: 0,
        velocityKmh: 0,
        description: 'Computer initiates ignition of all 9 Merlin 1D engines. Vehicle health monitoring system validates nominal pressures.',
        phase: 'countdown'
      },
      {
        timeOffset: 'T+00:00:00',
        title: 'Liftoff',
        altitudeKm: 0.1,
        velocityKmh: 50,
        description: 'Hold-down clamps release. The rocket clears the launch tower with 7.6 MN of thrust.',
        phase: 'boost'
      },
      {
        timeOffset: 'T+00:01:12',
        title: 'Max-Q (Maximum Dynamic Pressure)',
        altitudeKm: 12.5,
        velocityKmh: 1850,
        description: 'Vehicle encounters the peak mechanical stress from the combination of rising atmospheric airspeed and air density.',
        phase: 'boost'
      },
      {
        timeOffset: 'T+00:02:27',
        title: 'MECO (Main Engine Cutoff)',
        altitudeKm: 65.0,
        velocityKmh: 6800,
        description: 'First stage engines shut down. 3 pneumatic pushers separate the booster from the upper stage.',
        phase: 'staging'
      },
      {
        timeOffset: 'T+00:02:35',
        title: 'SES-1 (Second Stage Ignition)',
        altitudeKm: 70.0,
        velocityKmh: 6950,
        description: 'Single Merlin Vacuum engine ignites, delivering 981 kN of thrust to continue orbital insertion.',
        phase: 'staging'
      },
      {
        timeOffset: 'T+00:03:15',
        title: 'Payload Fairing Jettison',
        altitudeKm: 112.0,
        velocityKmh: 8300,
        description: 'Protective composite fairing halves separate and fall away outside the dense atmosphere.',
        phase: 'fairing'
      },
      {
        timeOffset: 'T+00:08:42',
        title: 'SECO-1 & Orbital Insertion',
        altitudeKm: 210.0,
        velocityKmh: 27500,
        description: 'Merlin Vacuum engine cuts off. Spacecraft reaches stable parking orbit around Earth.',
        phase: 'orbital-insertion'
      }
    ],
    officialSource: 'SpaceX Falcon 9 User’s Guide',
    sourceUrl: 'https://www.spacex.com/vehicles/falcon-9/'
  },
  {
    id: 'saturn-v',
    name: 'Saturn V',
    operator: 'NASA',
    country: 'United States',
    heightMeters: 110.6,
    diameterMeters: 10.1,
    stagesCount: 3,
    grossMassKg: 2970000,
    payloadLeoKg: 140000,
    payloadGtoKg: 48600, // Translunar injection payload
    payloadMarsKg: 0,
    propulsionSummary: 'Stage 1: 5 × Rocketdyne F-1; Stage 2: 5 × Rocketdyne J-2; Stage 3: 1 × Rocketdyne J-2',
    firstFlightYear: 1967,
    status: 'Retired',
    totalLaunches: 13,
    successRatePercent: 100,
    colorScheme: {
      primary: '#F8FAFC',
      secondary: '#0F172A',
      accent: '#E5A93C'
    },
    description: 'The towering Saturn V was developed by Wernher von Braun’s team at NASA Marshall Space Flight Center to land astronauts on the Moon. Generating 34.5 million Newtons of liftoff thrust, it successfully launched all crewed Apollo lunar missions and the Skylab space station without a single flight failure.',
    stages: [
      {
        stageNumber: 1,
        name: 'S-IC (First Stage)',
        engines: '5 × Rocketdyne F-1 (single-nozzle liquid engines)',
        thrustKn: 34500,
        propellant: 'RP-1 Rocket Kerosene and Liquid Oxygen (LOX)',
        burnTimeSeconds: 150,
        purpose: 'Consumes 15 tons of propellant per second to lift the nearly 3,000-ton rocket off Pad 39A to an altitude of 68 km.',
        reusable: false
      },
      {
        stageNumber: 2,
        name: 'S-II (Second Stage)',
        engines: '5 × Rocketdyne J-2 hydrolox engines',
        thrustKn: 4400,
        propellant: 'Liquid Hydrogen (LH2) and Liquid Oxygen (LOX)',
        burnTimeSeconds: 360,
        purpose: 'High specific impulse stage that carried the Apollo stack through the upper atmosphere to 175 km altitude.',
        reusable: false
      },
      {
        stageNumber: 3,
        name: 'S-IVB (Third Stage)',
        engines: '1 × Rocketdyne J-2 restartable engine',
        thrustKn: 1000,
        propellant: 'Liquid Hydrogen (LH2) and Liquid Oxygen (LOX)',
        burnTimeSeconds: 500, // Total between 2 burns
        purpose: 'Burned once for 2.5 minutes to achieve Earth parking orbit, and reignited for 6 minutes for Trans-Lunar Injection (TLI).',
        reusable: false
      }
    ],
    launchSequence: [
      {
        timeOffset: 'T-00:00:08',
        title: 'F-1 Engine Ignition Sequence',
        altitudeKm: 0,
        velocityKmh: 0,
        description: 'Center engine ignites first, followed by opposed pairs to reduce structural vibrations.',
        phase: 'countdown'
      },
      {
        timeOffset: 'T+00:00:00',
        title: 'Liftoff from Pad 39A',
        altitudeKm: 0.1,
        velocityKmh: 40,
        description: 'All 5 F-1 engines reach full thrust of 34.5 MN, launching the 2,970-ton Moon rocket.',
        phase: 'boost'
      },
      {
        timeOffset: 'T+00:01:24',
        title: 'Max-Q',
        altitudeKm: 13.5,
        velocityKmh: 2400,
        description: 'Maximum aerodynamic resistance reached in mid-stratosphere.',
        phase: 'boost'
      },
      {
        timeOffset: 'T+00:02:41',
        title: 'S-IC Inboard & Outboard Cutoff',
        altitudeKm: 67.0,
        velocityKmh: 8600,
        description: 'Booster burns out; separation rockets fire to push S-IC away from S-II stage.',
        phase: 'staging'
      },
      {
        timeOffset: 'T+00:03:17',
        title: 'Launch Escape Tower Jettison',
        altitudeKm: 95.0,
        velocityKmh: 10200,
        description: 'Emergency escape motor jettisoned once high enough for abort directly into ocean orbit.',
        phase: 'fairing'
      },
      {
        timeOffset: 'T+00:11:40',
        title: 'Earth Orbit Insertion (S-IVB 1st Cutoff)',
        altitudeKm: 185.0,
        velocityKmh: 28000,
        description: 'Apollo spacecraft enters circular parking orbit at 185 km before Trans-Lunar Injection.',
        phase: 'orbital-insertion'
      }
    ],
    officialSource: 'NASA Apollo Saturn V Flight Manual',
    sourceUrl: 'https://www.nasa.gov/mission/saturn-v/'
  },
  {
    id: 'sls',
    name: 'Space Launch System (SLS Block 1)',
    operator: 'NASA',
    country: 'United States',
    heightMeters: 98.1,
    diameterMeters: 8.4,
    stagesCount: 2,
    grossMassKg: 2600000,
    payloadLeoKg: 95000,
    payloadGtoKg: 27000, // Trans-Lunar Injection (TLI) to Moon
    propulsionSummary: '2 × 5-segment Solid Rocket Boosters + Core Stage with 4 × Aerojet Rocketdyne RS-25 hydrolox engines',
    firstFlightYear: 2022,
    status: 'Operational',
    totalLaunches: 1,
    successRatePercent: 100,
    colorScheme: {
      primary: '#F97316', // Orange core tank insulation
      secondary: '#FFFFFF',
      accent: '#38BDF8'
    },
    description: 'NASA’s heavy-lift cornerstone for the Artemis lunar program. SLS pairs two massive 5-segment solid rocket boosters with a liquid hydrogen/liquid oxygen core stage powered by upgraded Space Shuttle main engines (RS-25) to launch astronauts in the Orion spacecraft toward the Moon.',
    stages: [
      {
        stageNumber: 1,
        name: 'Core Stage & 5-Segment Solid Boosters',
        engines: '4 × RS-25D Core Engines + 2 × Northrop Grumman Solid Rocket Boosters',
        thrustKn: 39100, // 8.8 million lbf
        propellant: 'Hydrolox (Core) & Polybutadiene Acrylonitrile (Boosters)',
        burnTimeSeconds: 126, // Boosters 126s, Core 480s
        purpose: 'Generates 39.1 million Newtons of thrust at liftoff—15% more than the Saturn V—propelling Orion out of Earth’s atmosphere.',
        reusable: false
      },
      {
        stageNumber: 2,
        name: 'Interim Cryogenic Propulsion Stage (ICPS)',
        engines: '1 × Aerojet Rocketdyne RL10B-2 engine',
        thrustKn: 110,
        propellant: 'Liquid Hydrogen and Liquid Oxygen',
        burnTimeSeconds: 700,
        purpose: 'Performs Earth orbit insertion and executes the vital Trans-Lunar Injection burn sending Orion toward the Moon.',
        reusable: false
      }
    ],
    launchSequence: [
      {
        timeOffset: 'T-00:00:06',
        title: 'RS-25 Core Engines Ignition',
        altitudeKm: 0,
        velocityKmh: 0,
        description: 'Four RS-25 cryogenic engines roar to life beneath the orange core stage.',
        phase: 'countdown'
      },
      {
        timeOffset: 'T+00:00:00',
        title: 'Twin Solid Boosters Ignite & Liftoff',
        altitudeKm: 0.1,
        velocityKmh: 60,
        description: 'Both 5-segment solid rocket boosters ignite. SLS ascends from Launch Pad 39B.',
        phase: 'boost'
      },
      {
        timeOffset: 'T+00:02:12',
        title: 'Solid Rocket Booster Separation',
        altitudeKm: 46.0,
        velocityKmh: 5100,
        description: 'Spent boosters jettison cleanly as 16 small booster separation motors fire.',
        phase: 'staging'
      },
      {
        timeOffset: 'T+00:03:20',
        title: 'Fairing & Service Module Panels Jettison',
        altitudeKm: 102.0,
        velocityKmh: 8400,
        description: 'Three structural fairing panels peel away from the European Service Module.',
        phase: 'fairing'
      },
      {
        timeOffset: 'T+00:08:04',
        title: 'Core Stage Shutdown (MECO)',
        altitudeKm: 160.0,
        velocityKmh: 27900,
        description: 'RS-25 engines shut down; Core stage separates, leaving ICPS and Orion in suborbital trajectory.',
        phase: 'staging'
      },
      {
        timeOffset: 'T+01:30:00',
        title: 'Trans-Lunar Injection (TLI)',
        altitudeKm: 2800.0,
        velocityKmh: 36400,
        description: 'ICPS fires RL10 engine for 18 minutes, accelerating Orion to lunar transfer velocity.',
        phase: 'orbital-insertion'
      }
    ],
    officialSource: 'NASA SLS Reference Guide',
    sourceUrl: 'https://www.nasa.gov/humans-in-space/space-launch-system/'
  },
  {
    id: 'starship',
    name: 'Starship & Super Heavy',
    operator: 'SpaceX',
    country: 'United States',
    heightMeters: 121.3,
    diameterMeters: 9.0,
    stagesCount: 2,
    grossMassKg: 5000000,
    payloadLeoKg: 150000, // Fully reusable configuration
    payloadGtoKg: 100000, // With orbital refilling
    payloadMarsKg: 100000,
    propulsionSummary: 'Booster: 33 × Raptor 2/3 engines (methalox); Ship: 6 × Raptor engines (3 sea-level, 3 vacuum)',
    firstFlightYear: 2023,
    status: 'Under Development',
    totalLaunches: 5,
    successRatePercent: 80,
    colorScheme: {
      primary: '#94A3B8', // Stainless steel 304L
      secondary: '#0F172A', // Black thermal ceramic tiles
      accent: '#F59E0B'
    },
    description: 'Starship is designed as a fully reusable, two-stage-to-orbit super heavy lift launch vehicle with unprecedented capacity. Constructed of 304L stainless steel and powered by clean-burning liquid methane and liquid oxygen, Starship is targeted for crewed lunar landings (Artemis III) and eventual Mars colonization.',
    stages: [
      {
        stageNumber: 1,
        name: 'Super Heavy Booster',
        engines: '33 × SpaceX Raptor 2/3 engines',
        thrustKn: 74500, // ~16.7 million lbf (more than double Saturn V)
        propellant: 'Sub-cooled Liquid Methane (CH4) and Liquid Oxygen (LOX)',
        burnTimeSeconds: 165,
        purpose: 'Provides colossal liftoff impulse, executes "hot staging" separation, returns to launch mount, and is caught mid-air by the Mechazilla "chopstick" arms.',
        reusable: true
      },
      {
        stageNumber: 2,
        name: 'Starship Spacecraft',
        engines: '3 × Sea-Level Raptor + 3 × Vacuum Raptor engines',
        thrustKn: 14700,
        propellant: 'Liquid Methane and Liquid Oxygen',
        burnTimeSeconds: 380,
        purpose: 'Integrated upper stage and payload/crew cabin capable of atmospheric belly-flop reentry, flip-and-burn landing on Earth, the Moon, or Mars.',
        reusable: true
      }
    ],
    launchSequence: [
      {
        timeOffset: 'T-00:00:03',
        title: '33 Raptor Engines Chill & Spin-Up',
        altitudeKm: 0,
        velocityKmh: 0,
        description: 'High-pressure turbopumps spool up; 33 methane-oxygen engines ignite simultaneously.',
        phase: 'countdown'
      },
      {
        timeOffset: 'T+00:00:00',
        title: 'Liftoff from Starbase Pad A',
        altitudeKm: 0.1,
        velocityKmh: 45,
        description: '74.5 MN of thrust lifts the 5,000-ton rocket stack off the orbital launch mount.',
        phase: 'boost'
      },
      {
        timeOffset: 'T+00:01:02',
        title: 'Max-Q',
        altitudeKm: 10.0,
        velocityKmh: 1700,
        description: 'Vehicle pushes through maximum aerodynamic stress while supersonic.',
        phase: 'boost'
      },
      {
        timeOffset: 'T+00:02:42',
        title: 'Hot-Staging Ring Event',
        altitudeKm: 68.0,
        velocityKmh: 5600,
        description: 'Starship upper stage engines ignite while still attached to the booster through a vented ring.',
        phase: 'staging'
      },
      {
        timeOffset: 'T+00:06:54',
        title: 'Booster Catch by Mechazilla Tower',
        altitudeKm: 0.05,
        velocityKmh: 10,
        description: 'Super Heavy booster maneuvers back to Starbase and is caught in mid-air by tower arms.',
        phase: 'staging'
      },
      {
        timeOffset: 'T+00:08:30',
        title: 'Orbital Insertion Cutoff',
        altitudeKm: 180.0,
        velocityKmh: 27100,
        description: 'Starship engines shut down as spacecraft reaches near-orbital trans-atmospheric trajectory.',
        phase: 'orbital-insertion'
      }
    ],
    officialSource: 'SpaceX Starship Capabilities Guide',
    sourceUrl: 'https://www.spacex.com/vehicles/starship/'
  },
  {
    id: 'ariane-6',
    name: 'Ariane 6 (A64 / A62)',
    operator: 'Arianespace / ESA',
    country: 'Europe (France / Germany / Italy)',
    heightMeters: 62.0,
    diameterMeters: 5.4,
    stagesCount: 2,
    grossMassKg: 860000,
    payloadLeoKg: 21600,
    payloadGtoKg: 11500,
    propulsionSummary: 'Vulcain 2.1 hydrolox core + 2 or 4 P120C solid boosters + Vinci reignitable upper stage',
    firstFlightYear: 2024,
    status: 'Operational',
    totalLaunches: 1,
    successRatePercent: 100,
    colorScheme: {
      primary: '#E2E8F0',
      secondary: '#1E3A8A',
      accent: '#3B82F6'
    },
    description: 'Ariane 6 is Europe’s new modular heavy-lift launch vehicle, engineered to guarantee independent European access to space. Equipped with a restartable cryogenic Vinci engine, it can inject multiple satellites into different orbits in a single mission.',
    stages: [
      {
        stageNumber: 1,
        name: 'Cryogenic Main Stage + P120C Boosters',
        engines: '1 × Vulcain 2.1 Engine + 4 × P120C Solid Rocket Motors',
        thrustKn: 15000,
        propellant: 'LOX/LH2 (Core) & Hydroxy-terminated Polybutadiene (Boosters)',
        burnTimeSeconds: 135,
        purpose: 'Maintains ascent impulse out of Europe’s Spaceport in Kourou, French Guiana.',
        reusable: false
      },
      {
        stageNumber: 2,
        name: 'Cryogenic Upper Stage (ULPM)',
        engines: '1 × Vinci Re-ignitable Engine with Auxiliary Propulsion Unit (APU)',
        thrustKn: 180,
        propellant: 'Liquid Oxygen and Liquid Hydrogen',
        burnTimeSeconds: 900,
        purpose: 'Provides multiple restarts to deploy satellite constellations into distinct orbital planes and deorbit itself cleanly.',
        reusable: false
      }
    ],
    launchSequence: [
      {
        timeOffset: 'T-00:00:04',
        title: 'Vulcain 2.1 Core Engine Ignition',
        altitudeKm: 0,
        velocityKmh: 0,
        description: 'Cryogenic core engine ignites; diagnostics check chamber pressure.',
        phase: 'countdown'
      },
      {
        timeOffset: 'T+00:00:00',
        title: 'Solid Boosters Ignition & Liftoff',
        altitudeKm: 0.1,
        velocityKmh: 45,
        description: 'P120C solid boosters ignite and Ariane 6 lifts off from Kourou Spaceport.',
        phase: 'boost'
      },
      {
        timeOffset: 'T+00:02:15',
        title: 'Solid Boosters Jettison',
        altitudeKm: 55.0,
        velocityKmh: 5400,
        description: 'Spent P120C boosters separate and fall harmlessly into the Atlantic Ocean.',
        phase: 'staging'
      },
      {
        timeOffset: 'T+00:03:40',
        title: 'Fairing Separation',
        altitudeKm: 120.0,
        velocityKmh: 8100,
        description: 'Payload fairings release once aerothermal heating falls beneath safety limits.',
        phase: 'fairing'
      },
      {
        timeOffset: 'T+00:07:50',
        title: 'Main Stage Cutoff & Vinci Ignition',
        altitudeKm: 180.0,
        velocityKmh: 24500,
        description: 'Vulcain shuts down; Vinci upper stage ignites for initial orbital insertion.',
        phase: 'orbital-insertion'
      }
    ],
    officialSource: 'ESA Ariane 6 Launch System',
    sourceUrl: 'https://www.esa.int/Enabling_Support/Space_Transportation/Ariane_6'
  }
];
