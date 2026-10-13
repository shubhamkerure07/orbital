import { DiscoveryItem } from '../types';

export const DISCOVERIES: DiscoveryItem[] = [
  {
    id: 'disc-jwst-dawn',
    title: 'JWST Confirms Earliest Known Galaxy Just 290 Million Years Post-Big Bang',
    date: '2024-05-30',
    explanation: 'Using the NIRSpec spectrograph, the JADES international collaboration confirmed the galaxy JADES-GS-z14-0 at a spectroscopic redshift of z = 14.32. This observation establishes that massive, luminous galaxies with ionized oxygen and gas formed far faster and earlier in cosmic history than standard cosmological models predicted.',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    creditAgency: 'NASA / ESA / CSA / STScI / JADES Collaboration',
    tags: ['Cosmology', 'JWST', 'Deep Field', 'Early Universe'],
    relatedTopic: 'James Webb Space Telescope',
    topicRoute: '/missions'
  },
  {
    id: 'disc-enceladus-phosphorus',
    title: 'Detection of Phosphates in Enceladus Ocean Fulfills All CHNOPS Astrobiology Requirements',
    date: '2023-06-14',
    explanation: 'Analysis of data from Cassini’s Cosmic Dust Analyzer revealed high concentrations of sodium phosphate salts in ice grains vented from the plumes of Saturn’s moon Enceladus. Phosphorus was the last unconfirmed essential element (among Carbon, Hydrogen, Nitrogen, Oxygen, Phosphorus, Sulfur) needed for nucleic acids, cell membranes, and ATP energy storage in living organisms.',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    creditAgency: 'Nature / NASA JPL / Cassini CDA Team / Postberg et al.',
    tags: ['Astrobiology', 'Enceladus', 'Ocean Worlds', 'Saturn'],
    relatedTopic: 'Destinations',
    topicRoute: '/destinations'
  },
  {
    id: 'disc-sgra-blackhole',
    title: 'Event Horizon Telescope Unveils First Silhouette of Sagittarius A*',
    date: '2022-05-12',
    explanation: 'A global network of synchronized millimeter-wavelength radio observatories synthesized a telescope the size of planet Earth, resolving the bright ring of synchrotron radiation orbiting the event horizon of Sagittarius A*—the 4.15-million-solar-mass supermassive black hole at the center of the Milky Way.',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    creditAgency: 'Event Horizon Telescope (EHT) Collaboration',
    tags: ['Black Holes', 'General Relativity', 'Astrophysics', 'Radio Astronomy'],
    relatedTopic: 'Orbital Mechanics',
    topicRoute: '/orbital-lab'
  },
  {
    id: 'disc-parker-corona',
    title: 'Parker Solar Probe Successfully Dives Inside the Sun’s Alfvén Critical Surface',
    date: '2021-12-14',
    explanation: 'Flying at speeds exceeding 500,000 km/h, the Parker Solar Probe crossed below the Alfvén critical boundary at 18.8 solar radii, sampling the magnetic structures and turbulent plasma of the solar corona in situ for the first time in human history. This solved the mystery of switchbacks—kinks in solar wind magnetic fields.',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&w=1200&q=80',
    creditAgency: 'NASA / Johns Hopkins Applied Physics Laboratory (JHUAPL)',
    tags: ['Heliophysics', 'The Sun', 'Solar Wind', 'Space Weather'],
    relatedTopic: 'The Sun (Sol)',
    topicRoute: '/explore'
  },
  {
    id: 'disc-mars-organics',
    title: 'Perseverance Uncovers Diverse Organic Molecules in Jezero Crater Delta Deposits',
    date: '2023-11-28',
    explanation: 'Using the SHERLOC deep-UV Raman and fluorescence spectrometer, NASA’s Perseverance rover detected a rich variety of cyclic aromatic organic compounds within sulphate and carbonate minerals in the delta front of Jezero Crater. These rocks were deposited in an ancient river delta that may have preserved ancient biosignatures.',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=1200&q=80',
    creditAgency: 'NASA / JPL-Caltech / SHERLOC Science Team',
    tags: ['Mars Exploration', 'Perseverance', 'Biosignatures', 'Geology'],
    relatedTopic: 'Mars Missions',
    topicRoute: '/missions'
  },
  {
    id: 'disc-trappist-spectroscopy',
    title: 'JWST Constrains Secondary Atmosphere Scenarios on TRAPPIST-1 B and C',
    date: '2024-03-18',
    explanation: 'MIRI thermal emission photometric observations of the innermost rocky worlds of the TRAPPIST-1 system revealed bare rock or very thin CO2-depleted atmospheres on worlds b and c, focusing the primary search for temperate, water-retaining atmospheres onto TRAPPIST-1e, d, and f located farther in the star’s habitable zone.',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    creditAgency: 'Nature / NASA Goddard / JWST Transiting Exoplanet Team',
    tags: ['Exoplanets', 'TRAPPIST-1', 'Astrobiology', 'Transmission Spectroscopy'],
    relatedTopic: 'Exoplanets',
    topicRoute: '/destinations'
  }
];
