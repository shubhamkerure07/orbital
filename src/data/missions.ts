import { MissionData } from '../types';

export const MISSIONS: MissionData[] = [
  {
    id: 'james-webb',
    name: 'James Webb Space Telescope (JWST)',
    agency: 'NASA / ESA / CSA',
    operatorCountry: 'United States / Europe / Canada',
    category: 'Space Telescope',
    destination: 'Sun-Earth L2 Lagrange Point (1.5M km from Earth)',
    launchDate: '2021-12-25',
    status: 'active',
    spacecraft: 'JWST Observatory (6.5m Beryllium Gold-coated Primary Mirror)',
    launchVehicle: 'Ariane 5 ECA',
    objectives: [
      'Examine the earliest stars and galaxies formed after the Big Bang',
      'Study galaxy formation and cosmic evolution across 13.5 billion years',
      'Characterize atmospheres of habitable-zone exoplanets',
      'Observe planetary bodies and Kuiper belt objects in our own solar system'
    ],
    scientificAchievements: [
      'Confirmed the earliest known galaxy (JADES-GS-z14-0) at z=14.32, just 290 Myr after Big Bang',
      'Detected carbon dioxide, water vapor, and sulfur dioxide in exoplanet WASP-39 b atmosphere',
      'Imaged the Pillars of Creation in unprecedented infrared detail, revealing infant protostars'
    ],
    milestones: [
      { date: '2021-12-25', title: 'Flawless Launch', description: 'Ariane 5 injected JWST into trajectory saving significant stationkeeping propellant.' },
      { date: '2022-01-24', title: 'Halo Orbit Insertion', description: 'Arrived at the Sun-Earth L2 halo orbit after full sunshield deployment.' },
      { date: '2022-07-12', title: 'First Deep Field Released', description: 'NASA released SMACS 0723, the deepest and sharpest infrared image of the distant universe.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The golden hexagonal mirrors of the James Webb Space Telescope observing the cosmos.',
    officialSourceUrl: 'https://webb.nasa.gov/',
    officialReference: 'NASA Space Telescope Science Institute (STScI)'
  },
  {
    id: 'perseverance',
    name: 'Mars 2020 Perseverance & Ingenuity',
    agency: 'NASA / JPL',
    operatorCountry: 'United States',
    category: 'Rover',
    destination: 'Mars (Jezero Crater)',
    destinationPlanetId: 'mars',
    launchDate: '2020-07-30',
    status: 'active',
    spacecraft: 'Perseverance Rover & Ingenuity Mars Helicopter',
    launchVehicle: 'Atlas V 541',
    objectives: [
      'Search for biosignatures in ancient lacustrine and delta sediments',
      'Collect and seal core rock samples for future Earth return',
      'Produce oxygen from the Martian CO2 atmosphere using MOXIE',
      'Demonstrate powered atmospheric flight on another planet (Ingenuity)'
    ],
    scientificAchievements: [
      'Successfully extracted 24+ core rock and regolith samples from an ancient river delta',
      'MOXIE generated breathable oxygen from Martian atmosphere for over 16 test runs',
      'Ingenuity completed 72 powered atmospheric flights, logging over 128 minutes aloft'
    ],
    milestones: [
      { date: '2021-02-18', title: 'Touchdown in Jezero Crater', description: 'Flawless landing using Sky Crane and Terrain-Relative Navigation.' },
      { date: '2021-04-19', title: 'First Wright Brothers Moment on Mars', description: 'Ingenuity achieved the first powered controlled flight on another world.' },
      { date: '2023-01-20', title: 'Sample Depot Completed', description: 'Deposited 10 sealed titanium sample tubes on Martian surface as backup return cache.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Perseverance rover exploring the ancient delta sediments of Jezero Crater.',
    officialSourceUrl: 'https://mars.nasa.gov/mars2020/',
    officialReference: 'NASA Mars Exploration Program / JPL'
  },
  {
    id: 'voyager-1',
    name: 'Voyager 1',
    agency: 'NASA / JPL',
    operatorCountry: 'United States',
    category: 'Probe',
    destination: 'Interstellar Space (Outer Solar System & Beyond)',
    launchDate: '1977-09-05',
    status: 'active',
    spacecraft: 'Voyager Spacecraft with Golden Record and RTG Power',
    launchVehicle: 'Titan IIIE-Centaur',
    objectives: [
      'Conduct close flyby reconnaissance of Jupiter and Saturn systems',
      'Investigate Saturn’s massive moon Titan and its dense nitrogen atmosphere',
      'Cross the heliopause and measure interstellar cosmic rays and magnetic field'
    ],
    scientificAchievements: [
      'First human-made object to cross the heliopause and enter interstellar space (Aug 2012)',
      'Most distant human artifact from Earth, operating over 24 billion km (163 AU) away',
      'Discovered active volcanoes on Io and complex ring structures around Jupiter and Saturn'
    ],
    milestones: [
      { date: '1979-03-05', title: 'Jupiter Encounter', description: 'Returned close-up images of Jupiter, discovering volcanic activity on Io.' },
      { date: '1980-11-12', title: 'Saturn & Titan Encounter', description: 'Gravity assist deflected spacecraft out of ecliptic plane toward interstellar void.' },
      { date: '2012-08-25', title: 'Interstellar Crossing', description: 'Sensors registered sudden drop in solar wind ions and surge in galactic cosmic rays.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Voyager 1 traveling across the boundary between the heliosphere and deep interstellar space.',
    officialSourceUrl: 'https://voyager.jpl.nasa.gov/',
    officialReference: 'NASA Jet Propulsion Laboratory'
  },
  {
    id: 'voyager-2',
    name: 'Voyager 2',
    agency: 'NASA / JPL',
    operatorCountry: 'United States',
    category: 'Probe',
    destination: 'Jupiter, Saturn, Uranus, Neptune & Interstellar Space',
    launchDate: '1977-08-20',
    status: 'active',
    spacecraft: 'Voyager Outer Planets Explorer',
    launchVehicle: 'Titan IIIE-Centaur',
    objectives: [
      'Execute the historic "Grand Tour" alignment of all four outer gas and ice giants',
      'Provide humanity’s only close-up reconnaissance of Uranus and Neptune',
      'Measure heliosheath plasma characteristics and transition into interstellar medium'
    ],
    scientificAchievements: [
      'Remains the only spacecraft in human history to have visited Uranus (1986) and Neptune (1989)',
      'Discovered Neptune’s Great Dark Spot and Triton’s active nitrogen geysers',
      'Crossed the heliopause in November 2018 with its plasma spectrometer operational'
    ],
    milestones: [
      { date: '1986-01-24', title: 'Uranus Historic Encounter', description: 'Discovered 10 new moons, 2 new rings, and mapped the tilted magnetic dipole.' },
      { date: '1989-08-25', title: 'Neptune & Triton Encounter', description: 'Captured images of active geysers on icy Triton and supersonic cloud bands.' },
      { date: '2018-11-05', title: 'Interstellar Transition', description: 'Second spacecraft to exit the heliosphere, measuring plasma density jumps.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Voyager 2 conducting the historic Grand Tour across the outer planets.',
    officialSourceUrl: 'https://voyager.jpl.nasa.gov/',
    officialReference: 'NASA Jet Propulsion Laboratory'
  },
  {
    id: 'apollo-11',
    name: 'Apollo 11',
    agency: 'NASA',
    operatorCountry: 'United States',
    category: 'Crewed',
    destination: 'The Moon (Sea of Tranquility)',
    destinationPlanetId: 'earth',
    launchDate: '1969-07-16',
    endDate: '1969-07-24',
    status: 'completed',
    spacecraft: 'Apollo CSM-107 (Columbia) & LM-5 (Eagle)',
    launchVehicle: 'Saturn V (SA-506)',
    objectives: [
      'Fulfill the national goal of landing humans on the Moon and returning them safely to Earth',
      'Deploy the Early Apollo Scientific Experiments Package (EASEP)',
      'Collect surface regolith and lunar rock samples for geological analysis'
    ],
    scientificAchievements: [
      'First human beings to walk on the lunar surface (Neil Armstrong & Buzz Aldrin)',
      'Returned 21.55 kg of pristine lunar rock and soil samples confirming ancient magmatic crust',
      'Installed laser ranging retroreflectors still used today to measure lunar distance to millimeter precision'
    ],
    milestones: [
      { date: '1969-07-16', title: 'Launch from Pad 39A', description: 'Saturn V generated 34.5 million Newtons of thrust, boosting crew to trans-lunar injection.' },
      { date: '1969-07-20', title: 'Tranquility Base Touchdown', description: 'Eagle touched down at 20:17:40 UTC: "Houston, Tranquility Base here. The Eagle has landed."' },
      { date: '1969-07-24', title: 'Pacific Splashdown', description: 'Columbia splashed down safely in the North Pacific Ocean, recovered by USS Hornet.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Apollo 11 Saturn V launching towards the Moon on July 16, 1969.',
    officialSourceUrl: 'https://www.nasa.gov/mission/apollo-11/',
    officialReference: 'NASA History Division'
  },
  {
    id: 'curiosity',
    name: 'Mars Science Laboratory Curiosity',
    agency: 'NASA / JPL',
    operatorCountry: 'United States',
    category: 'Rover',
    destination: 'Mars (Gale Crater & Mount Sharp)',
    destinationPlanetId: 'mars',
    launchDate: '2011-11-26',
    status: 'active',
    spacecraft: 'Curiosity Rover (900 kg Nuclear RTG Powered Laboratory)',
    launchVehicle: 'Atlas V 541',
    objectives: [
      'Determine whether Gale Crater ever offered an environment favorable for microbial life',
      'Investigate the role of water in planetary habitability and past climate cycles',
      'Characterize broad spectrum surface radiation for future human exploration'
    ],
    scientificAchievements: [
      'Discovered ancient freshwater lake system with chemical building blocks suitable for life',
      'Confirmed indigenous organic carbon molecules in 3-billion-year-old mudstones',
      'Measured cyclical seasonal variations in atmospheric methane levels'
    ],
    milestones: [
      { date: '2012-08-06', title: 'Sky Crane Landing', description: 'Pioneered rocket-powered Sky Crane descent onto Gale Crater floor.' },
      { date: '2013-03-12', title: 'Habitability Confirmed', description: 'Drill sample from Yellowknife Bay yielded key elements: sulfur, nitrogen, phosphorus, carbon.' },
      { date: '2024-05-30', title: 'Pure Sulfur Crystals Found', description: 'Crushed rock uncovered rare pure elemental sulfur crystals inside Gediz Vallis channel.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Curiosity traversing the foothills of Mount Sharp in Gale Crater.',
    officialSourceUrl: 'https://science.nasa.gov/mission/msl-curiosity/',
    officialReference: 'NASA Mars Exploration Program'
  },
  {
    id: 'cassini-huygens',
    name: 'Cassini-Huygens',
    agency: 'NASA / ESA / ASI',
    operatorCountry: 'United States / Europe / Italy',
    category: 'Orbiter',
    destination: 'Saturn System & Titan',
    destinationPlanetId: 'saturn',
    launchDate: '1997-10-15',
    endDate: '2017-09-15',
    status: 'completed',
    spacecraft: 'Cassini Orbiter & ESA Huygens Titan Probe',
    launchVehicle: 'Titan IVB / Centaur',
    objectives: [
      'Conduct detailed study of Saturnian atmosphere, magnetosphere, and complex ring dynamics',
      'Deploy the Huygens probe directly through the dense atmosphere of Titan to surface landing',
      'Characterize icy satellites, particularly Enceladus and its geological activity'
    ],
    scientificAchievements: [
      'Huygens achieved humanity’s only landing on an outer solar system body on Titan (Jan 2005)',
      'Discovered global subsurface liquid water ocean and hydrothermal vents on Enceladus',
      'Observed dynamic ring particle collisions, propeller moonlets, and vertical ring spires'
    ],
    milestones: [
      { date: '2004-07-01', title: 'Saturn Orbit Insertion', description: 'Crossed the ring plane and became first spacecraft to orbit Saturn.' },
      { date: '2005-01-14', title: 'Huygens Descent on Titan', description: 'Parachuted through orange smog, landing on frozen riverbeds of hydrocarbon pebble mud.' },
      { date: '2017-09-15', title: 'The Grand Finale', description: 'Plunged into Saturn’s upper atmosphere to prevent any biological contamination of Enceladus.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Cassini taking its final high-resolution views of Saturn’s rings before its atmospheric dive.',
    officialSourceUrl: 'https://science.nasa.gov/mission/cassini/',
    officialReference: 'NASA Jet Propulsion Laboratory'
  },
  {
    id: 'artemis-1',
    name: 'Artemis I',
    agency: 'NASA / ESA',
    operatorCountry: 'United States / Europe',
    category: 'Crewed',
    destination: 'The Moon (Distant Retrograde Orbit)',
    destinationPlanetId: 'earth',
    launchDate: '2022-11-16',
    endDate: '2022-12-11',
    status: 'completed',
    spacecraft: 'Orion Crew Module & European Service Module (ESM)',
    launchVehicle: 'Space Launch System (SLS Block 1)',
    objectives: [
      'Certify the integrated SLS rocket and Orion spacecraft systems for human lunar flights',
      'Test Orion heat shield during lunar-velocity atmospheric re-entry (40,000 km/h)',
      'Travel in Distant Retrograde Orbit beyond the Moon, breaking the human-rated distance record'
    ],
    scientificAchievements: [
      'Reached maximum distance of 432,210 km from Earth, farther than any spacecraft built for humans',
      'Flawlessly executed 2 lunar gravity-assist flybys skimming within 130 km of lunar surface',
      'Validated European Service Module propulsion, solar power, and orbital maneuvering'
    ],
    milestones: [
      { date: '2022-11-16', title: 'Nighttime Debut of SLS', description: 'SLS generated 39.1 million Newtons of thrust, delivering Orion to translunar injection.' },
      { date: '2022-11-28', title: 'Maximum Distance Record', description: 'Orion exceeded Apollo 13 record for farthest distance traveled by human-rated craft.' },
      { date: '2022-12-11', title: 'Skip Re-entry & Splashdown', description: 'Pioneered skip re-entry trajectory before parachute splashdown in the Pacific Ocean.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517976487502-53531b40280f?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Artemis I SLS rocket lighting up the night sky at Kennedy Space Center Pad 39B.',
    officialSourceUrl: 'https://www.nasa.gov/mission/artemis-i/',
    officialReference: 'NASA Exploration Systems Development'
  },
  {
    id: 'europa-clipper',
    name: 'Europa Clipper',
    agency: 'NASA / JPL / JHUAPL',
    operatorCountry: 'United States',
    category: 'Orbiter',
    destination: 'Jupiter System & Moon Europa',
    destinationPlanetId: 'jupiter',
    launchDate: '2024-10-14',
    status: 'en-route',
    spacecraft: 'Europa Clipper (Largest planetary probe with 30m solar array span)',
    launchVehicle: 'Falcon Heavy (Expendable)',
    objectives: [
      'Determine the thickness of Europa’s ice shell and investigate ocean water interactions',
      'Analyze the composition of ocean water, surface salts, and organic compounds',
      'Characterize geology to identify prime landing sites for future surface exploration'
    ],
    scientificAchievements: [
      'Successfully departed on Mars-Earth gravity assist trajectory heading toward Jupiter arrival in 2030',
      'Carries deep ice-penetrating radar (REASON), high-resolution mapping cameras, and mass spectrometer'
    ],
    milestones: [
      { date: '2024-10-14', title: 'Launch from LC-39A', description: 'Falcon Heavy boosted Clipper onto interplanetary transfer trajectory.' },
      { date: '2025-02-28', title: 'Upcoming Mars Flyby', description: 'Scheduled Mars gravity assist to bend trajectory toward Earth flyby in 2026.' },
      { date: '2030-04-11', title: 'Jupiter Arrival Target', description: 'Scheduled orbital insertion into Jovian system to execute 49 close flybys of Europa.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Europa Clipper will perform 49 close flybys skimming over Europa’s fractured icy crust.',
    officialSourceUrl: 'https://europa.nasa.gov/',
    officialReference: 'NASA Jet Propulsion Laboratory'
  },
  {
    id: 'chandrayaan-3',
    name: 'Chandrayaan-3',
    agency: 'ISRO',
    operatorCountry: 'India',
    category: 'Lander',
    destination: 'The Moon (South Polar Region, 69.37°S)',
    destinationPlanetId: 'earth',
    launchDate: '2023-07-14',
    endDate: '2023-09-04',
    status: 'completed',
    spacecraft: 'Vikram Lander & Pragyan Rover',
    launchVehicle: 'LVM3 M4',
    objectives: [
      'Demonstrate safe soft-landing capability near lunar south pole',
      'Deploy mobile rover on the lunar regolith',
      'Conduct in-situ chemical analysis and measure thermal conductivity of polar soil'
    ],
    scientificAchievements: [
      'First nation in human history to land a probe within the lunar south polar region (Shiv Shakti Point)',
      'Laser-Induced Breakdown Spectroscopy (LIBS) confirmed unambiguous presence of Sulfur in polar regolith',
      'Thermal probe (ChaSTE) recorded 60°C temperature drop just 8 cm beneath the sunlit surface'
    ],
    milestones: [
      { date: '2023-07-14', title: 'Launch from Sriharikota', description: 'LVM3 vehicle launched Chandrayaan-3 into Earth parking orbit.' },
      { date: '2023-08-23', title: 'Historic Touchdown', description: 'Vikram completed autonomous powered descent, landing safely at 69.37°S, 32.35°E.' },
      { date: '2023-08-25', title: 'Rover Deployment', description: 'Pragyan rolled down ramp to traverse the regolith and perform atomic spectroscopy.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Chandrayaan-3 achieved humanity’s first soft landing near the lunar south pole.',
    officialSourceUrl: 'https://www.isro.gov.in/Chandrayaan3.html',
    officialReference: 'Indian Space Research Organisation (ISRO)'
  }
];
