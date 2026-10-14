export type GraphNodeType = 
  | 'body' 
  | 'mission' 
  | 'rocket' 
  | 'concept' 
  | 'discovery' 
  | 'observatory';

export interface GraphNode {
  id: string;
  label: string;
  type: GraphNodeType;
  category: string;
  summary: string;
  route?: string;
  colorHex: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: string;
  weight?: number;
}

export interface UniverseKnowledgeGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export const KNOWLEDGE_GRAPH_DATA: UniverseKnowledgeGraphData = {
  nodes: [
    // Bodies
    { id: 'node-earth', label: 'Earth (Terra)', type: 'body', category: 'Terrestrial Planet', summary: 'Baseline home world and origin of planetary space exploration.', route: '/explore/earth', colorHex: '#2B82C9' },
    { id: 'node-sun', label: 'The Sun (Sol)', type: 'body', category: 'G2V Star', summary: 'Central gravitational source governing all solar system orbits.', route: '/explore', colorHex: '#FDB813' },
    { id: 'node-moon', label: 'The Moon (Luna)', type: 'body', category: 'Natural Satellite', summary: 'Earth’s companion world and target of Apollo and Artemis exploration.', route: '/destinations?id=moon', colorHex: '#D1D5DB' },
    { id: 'node-mars', label: 'Mars', type: 'body', category: 'Terrestrial Planet', summary: 'Target of extensive rover, lander, and sample return missions.', route: '/explore/mars', colorHex: '#C1440E' },
    { id: 'node-jupiter', label: 'Jupiter', type: 'body', category: 'Gas Giant', summary: 'Most massive planet in the solar system with extensive moon system.', route: '/explore/jupiter', colorHex: '#D39C7E' },
    { id: 'node-europa', label: 'Europa', type: 'body', category: 'Ocean World', summary: 'Icy moon harboring a vast subsurface liquid water ocean.', route: '/destinations?id=europa', colorHex: '#93C5FD' },
    { id: 'node-saturn', label: 'Saturn', type: 'body', category: 'Gas Giant', summary: 'Famous ringed planet explored extensively by Cassini-Huygens.', route: '/explore/saturn', colorHex: '#E2BF7D' },
    { id: 'node-titan', label: 'Titan', type: 'body', category: 'Ocean World', summary: 'Hydrocarbon lake world with dense nitrogen atmosphere.', route: '/destinations?id=titan', colorHex: '#F59E0B' },
    { id: 'node-bennu', label: '101955 Bennu', type: 'body', category: 'Near-Earth Asteroid', summary: 'Carbonaceous rubble pile asteroid sampled by OSIRIS-REx.', route: '/observatory/neo', colorHex: '#8C857B' },
    { id: 'node-apophis', label: '99942 Apophis', type: 'body', category: 'Near-Earth Asteroid', summary: 'Potentially Hazardous Asteroid making historic close flyby in 2029.', route: '/observatory/neo', colorHex: '#E5A93C' },
    { id: 'node-trappist1e', label: 'TRAPPIST-1e', type: 'body', category: 'Exoplanet', summary: 'Temperate rocky exoplanet orbiting in conservative habitable zone.', route: '/discover/exoplanets', colorHex: '#10B981' },

    // Missions
    { id: 'node-apollo11', label: 'Apollo 11', type: 'mission', category: 'Crewed Lunar Mission', summary: 'First human landing on the Moon on July 20, 1969.', route: '/missions?id=apollo-11', colorHex: '#F6C358' },
    { id: 'node-artemis1', label: 'Artemis I', type: 'mission', category: 'Lunar Test Flight', summary: 'Uncrewed test flight of SLS rocket and Orion spacecraft.', route: '/missions?id=artemis-1', colorHex: '#F97316' },
    { id: 'node-perseverance', label: 'Perseverance & Ingenuity', type: 'mission', category: 'Mars Rover', summary: 'Robotic exploration and sample caching in Jezero Crater delta.', route: '/missions?id=perseverance', colorHex: '#EF4444' },
    { id: 'node-jwst', label: 'James Webb Space Telescope', type: 'mission', category: 'Infrared Observatory', summary: 'Observing the cosmic dawn and exoplanet transmission spectra.', route: '/missions?id=james-webb', colorHex: '#FBBF24' },
    { id: 'node-cassini', label: 'Cassini-Huygens', type: 'mission', category: 'Saturnian Orbiter', summary: 'Explored Saturnian rings, deployed Huygens on Titan, discovered Enceladus plumes.', route: '/missions?id=cassini-huygens', colorHex: '#38BDF8' },
    { id: 'node-voyager1', label: 'Voyager 1', type: 'mission', category: 'Interstellar Probe', summary: 'Furthest human artifact from Earth, operating beyond heliopause.', route: '/missions?id=voyager-1', colorHex: '#60A5FA' },
    { id: 'node-clipper', label: 'Europa Clipper', type: 'mission', category: 'Jovian Orbiter', summary: 'Investigating habitability of Europa’s subsurface liquid ocean.', route: '/missions?id=europa-clipper', colorHex: '#00F2FF' },

    // Rockets & Launch Vehicles
    { id: 'node-saturnv', label: 'Saturn V', type: 'rocket', category: 'Super Heavy Lift', summary: 'Moon rocket developed by NASA Marshall Space Flight Center.', route: '/rockets?id=saturn-v', colorHex: '#F8FAFC' },
    { id: 'node-falcon9', label: 'Falcon 9', type: 'rocket', category: 'Reusable Medium Lift', summary: 'First orbital class reusable booster by SpaceX.', route: '/rockets?id=falcon-9', colorHex: '#94A3B8' },
    { id: 'node-sls', label: 'Space Launch System', type: 'rocket', category: 'Super Heavy Lift', summary: 'NASA deep space exploration backbone for the Artemis program.', route: '/rockets?id=sls', colorHex: '#F97316' },
    { id: 'node-starship', label: 'Starship & Super Heavy', type: 'rocket', category: 'Fully Reusable Heavy', summary: 'Methane-powered next-generation heavy lift architecture.', route: '/rockets?id=starship', colorHex: '#CBD5E1' },

    // Scientific & Physics Concepts
    { id: 'node-hohmann', label: 'Hohmann Transfer Orbit', type: 'concept', category: 'Orbital Mechanics', summary: 'Fuel-optimal two-impulse elliptical transfer between circular orbits.', route: '/orbital-lab', colorHex: '#00F2FF' },
    { id: 'node-tsiolkovsky', label: 'Tsiolkovsky Rocket Equation', type: 'concept', category: 'Astrodynamics', summary: 'Fundamental relationship governing rocket velocity change and mass ratio.', route: '/simulate/mission-designer', colorHex: '#10B981' },
    { id: 'node-kepler', label: 'Kepler’s Laws of Planetary Motion', type: 'concept', category: 'Classical Mechanics', summary: 'Three empirical laws defining elliptical planetary orbits.', route: '/orbital-lab', colorHex: '#A78BFA' },
    { id: 'node-habitable-zone', label: 'Circumstellar Habitable Zone', type: 'concept', category: 'Astrobiology', summary: 'Orbital range around a star where liquid water can remain stable.', route: '/discover/exoplanets', colorHex: '#34D399' },
    { id: 'node-tidal-heating', label: 'Tidal Flexing & Resonance', type: 'concept', category: 'Geophysics', summary: 'Gravitational tidal forces generating internal heat in Europa and Io.', route: '/destinations?id=europa', colorHex: '#F472B6' },
    { id: 'node-solar-wind', label: 'Solar Wind & CME Dynamics', type: 'concept', category: 'Heliophysics', summary: 'Stream of charged plasma emitted by the Sun creating space weather.', route: '/observatory/space-weather', colorHex: '#FBBF24' }
  ],
  edges: [
    // Mission destinations
    { id: 'e1', source: 'node-apollo11', target: 'node-moon', relationship: 'Landed Astronauts on' },
    { id: 'e2', source: 'node-artemis1', target: 'node-moon', relationship: 'Tested Flight Corridor to' },
    { id: 'e3', source: 'node-perseverance', target: 'node-mars', relationship: 'Exploring Jezero Crater on' },
    { id: 'e4', source: 'node-cassini', target: 'node-saturn', relationship: 'Orbited and Surveyed' },
    { id: 'e5', source: 'node-cassini', target: 'node-titan', relationship: 'Deployed Huygens Probe onto' },
    { id: 'e6', source: 'node-clipper', target: 'node-europa', relationship: 'Will Execute 49 Close Flybys of' },
    { id: 'e7', source: 'node-voyager1', target: 'node-jupiter', relationship: 'Gravity Assist Encounter with' },
    { id: 'e8', source: 'node-voyager1', target: 'node-saturn', relationship: 'Gravity Assist Encounter with' },

    // Rockets launching missions
    { id: 'e9', source: 'node-saturnv', target: 'node-apollo11', relationship: 'Launched' },
    { id: 'e10', source: 'node-sls', target: 'node-artemis1', relationship: 'Launched' },
    { id: 'e11', source: 'node-falcon9', target: 'node-earth', relationship: 'Operates Low Earth Orbit Service for' },

    // Concepts to Missions / Bodies
    { id: 'e12', source: 'node-hohmann', target: 'node-mars', relationship: 'Calculates Transfer Window to' },
    { id: 'e13', source: 'node-hohmann', target: 'node-perseverance', relationship: 'Governed Interplanetary Trajectory of' },
    { id: 'e14', source: 'node-tsiolkovsky', target: 'node-saturnv', relationship: 'Dictated 3-Stage Mass Ratio of' },
    { id: 'e15', source: 'node-tsiolkovsky', target: 'node-starship', relationship: 'Requires Orbital Refueling per' },
    { id: 'e16', source: 'node-kepler', target: 'node-sun', relationship: 'Describes All Planetary Motion around' },
    { id: 'e17', source: 'node-habitable-zone', target: 'node-trappist1e', relationship: 'Classifies Astrobiological Potential of' },
    { id: 'e18', source: 'node-habitable-zone', target: 'node-earth', relationship: 'Defines Solar System Baseline at' },
    { id: 'e19', source: 'node-tidal-heating', target: 'node-europa', relationship: 'Maintains Subsurface Ocean of' },
    { id: 'e20', source: 'node-solar-wind', target: 'node-sun', relationship: 'Continuous Plasma Outflow from' },
    { id: 'e21', source: 'node-solar-wind', target: 'node-earth', relationship: 'Generates Auroras and Geomagnetic Storms at' },

    // Asteroids
    { id: 'e22', source: 'node-apophis', target: 'node-earth', relationship: 'Historic 31,600 km Close Approach to' },
    { id: 'e23', source: 'node-bennu', target: 'node-earth', relationship: 'Returned Pristine Carbon Samples to' },

    // Telescopes
    { id: 'e24', source: 'node-jwst', target: 'node-trappist1e', relationship: 'Actively Probing Atmosphere of' }
  ]
};
