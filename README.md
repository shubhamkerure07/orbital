# 🪐 ORBITAL — NASA Mission Control & Deep Space Observatory

[![Vercel Deployment](https://img.shields.io/badge/Live_Deployment-orbital--nu--gules.vercel.app-00f2ff?style=for-the-badge&logo=vercel)](https://orbital-nu-gules.vercel.app/)
[![React 18](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> **"THE UNIVERSE IS YOURS TO EXPLORE."**  
> Explore beyond what you know with a combination of an advanced spacecraft navigation console, a modern scientific observatory, and a real-time digital planetarium.

🌐 **Live Application:** [https://orbital-nu-gules.vercel.app/](https://orbital-nu-gules.vercel.app/)  
📂 **GitHub Repository:** [https://github.com/shubhamkerure07/orbital](https://github.com/shubhamkerure07/orbital)

---

## 🛰️ Visual Identity & Design System

Inspired by cutting-edge aerospace mission control consoles (NASA Goddard & JPL), cybernetic HUD telemetry interfaces, and digital observatories:
* **Typography:** Geometric modern display font (**Outfit**), body legibility (**Inter**), and high-precision telemetry monospace (**JetBrains Mono**).
* **Color Palette:** Deep Obsidian Space (`#020205`, `#060810`), Holo Cyan (`#00f2ff`), NASA Deep Blue (`#0b3d91`), Aerospace Coral/Red (`#fc3d21`), and Stellar Warm Gold (`#f7cc7f`).
* **Tactical HUD Accents:** Corner bracket framing, telemetry ribbons, glowing status indicators, and subtle cosmic dust particles.

---

## 🌟 Modules & Core Features

### 1. 🌍 Planetary Exploration & 3D Planetarium (`/explore`)
* **3D Solar System (React Three Fiber & Three.js)**: Real-time interactive model featuring the Sun, Mercury, Venus, Earth (with orbiting Moon), Mars, Jupiter, Saturn (with rings), Uranus ($97.8^\circ$ axial tilt), and Neptune.
* **Camera Navigation**: Smooth camera lerp focusing onto selected worlds, orbit trails, and lighting.
* **Planetary Controls**: Play/pause simulation, speed multiplier (0.5×, 1×, 3×), target focus selector, reset camera, label toggling, and zoom controls.
* **Resilient 2D WebGL Fallback**: Interactive 2D HTML5 canvas mode automatically loaded if WebGL is unsupported.
* **Planetary Differential Analyzer**: Side-by-side comparative analysis between any two planetary bodies.

### 2. 📋 Comprehensive Planetary Dossiers (`/explore/:planetId`)
* Authentic physical parameters: Equatorial diameter, distance from Sun (AU/km), orbital period, orbital velocity, sidereal rotation & day length, surface gravity ($g$ and $\text{m/s}^2$), and thermal extremes.
* Atmospheric composition percentage graphs.
* Key geological landforms and related historical/active space exploration missions.

### 3. 🚀 Flight Operations & Missions Catalog (`/missions`)
* Verified missions including **James Webb Space Telescope (JWST)**, **Mars 2020 Perseverance & Ingenuity**, **Voyager 1 & 2**, **Apollo 11**, **MSL Curiosity**, **Cassini-Huygens**, **Artemis I**, **Europa Clipper**, and **Chandrayaan-3**.
* Interactive search and multi-parameter filtering (by status, category, and destination).
* Mission detail modal featuring verified achievements, milestones, and official agency citations.

### 4. 🛰️ Rocket Explorer & Staging Simulator (`/rockets`)
* Orbital launch vehicles: **Falcon 9 Block 5**, **Saturn V**, **Space Launch System (SLS Block 1)**, **Starship & Super Heavy**, and **Ariane 6**.
* **Interactive Multistage Schematic**: Clickable SVG rocket stages detailing engine counts, thrust outputs (kN), propellant combinations, burn times, and staging purposes.
* **Flight Profile Simulator**: Step-by-step launch sequence (Liftoff $\to$ Max-Q $\to$ MECO $\to$ Staging $\to$ Fairing Jettison $\to$ Orbital Insertion) with live altitude, velocity (km/h), and Mach number calculation.
* **Capacity Matrix**: Comparative payload capacities to Low Earth Orbit (LEO) and Geostationary Transfer Orbit (GTO).

### 5. 🪐 Target Worlds & Destinations (`/destinations`)
* Monographic guides to **The Moon (Luna)**, **Mars**, **Europa**, **Titan**, and **TRAPPIST-1e**.
* Surface environments, geological histories, atmospheric pressures, and astrobiological habitability indices.
* Open scientific frontiers and active/scheduled robotic spacecraft visits.

### 6. ⚛️ Orbital Mechanics Laboratory (`/orbital-lab`)
* **Newtonian Two-Body Physics Engine**: Real-time symplectic Velocity Verlet numerical integrator ($\mathbf{F} = \frac{GMm}{r^2}\hat{\mathbf{r}}$).
* **Live Controls**: Sliders for central body mass ($M$), initial orbital radius ($r_0$), orbital insertion speed ($v_0$), velocity vector angle (tangential vs radial), and simulation speed.
* **Analytical Trajectory Overlay**: Dotted Keplerian predicted conic sections rendered simultaneously with true numerical integration history.
* **Real-time Telemetry Readout**: Instantaneous distance, velocity, kinetic energy ($K$), potential energy ($U$), total energy ($E$), eccentricity ($e$), periapsis, apoapsis, and orbital period.
* **Educational Presets**:
  1. *Stable Circular Orbit* ($v = \sqrt{GM/r}$, $e = 0$)
  2. *Elliptical Transfer Orbit* ($0 < e < 1$)
  3. *Sub-orbital Decaying Trajectory* (impact with surface)
  4. *Hyperbolic Escape Trajectory* ($v > \sqrt{2GM/r}$, $e > 1$, $E > 0$)

### 7. 🔭 Space Discoveries & NASA APOD (`/discover`)
* Live integration with NASA's Astronomy Picture of the Day (APOD) API with graceful offline fallback to high-resolution astrophysics archives.
* Peer-reviewed astronomical discovery dispatches across early cosmic dawn, black holes, and astrobiology.

### 8. 🔍 Global Keyboard Search (`Cmd/Ctrl + K`)
* Instant modal search querying across all planets, missions, launch vehicles, destinations, and physics topics.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | React 18, TypeScript 5, Vite 5 |
| **Styling** | Tailwind CSS, Custom Mission Control HUD design tokens |
| **Fonts** | Outfit, Inter, JetBrains Mono (Google Fonts) |
| **3D Engine** | Three.js, React Three Fiber (R3F), `@react-three/drei` |
| **Routing** | React Router v6 (configured with SPA rewrites via `vercel.json`) |
| **Icons** | Lucide React |
| **Numerical Physics** | Symplectic Velocity Verlet 2-body gravitational integrator |

---

## 🚀 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shubhamkerure07/orbital.git
   cd orbital
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Production Build & Verification**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🔬 Scientific Simulation Assumptions & Boundaries

1. **Normalized Planetary Scales**: True physical distances and planetary diameters are reported in data cards. The 3D viewport applies normalized logarithmic spacing so that outer planets (e.g., Neptune at 30 AU) remain visible and interactable alongside inner terrestrial worlds.
2. **Two-Body Gravitational Model**: The Orbital Lab models a single satellite orbiting a primary point mass. Real spaceflight dynamics additionally experience non-spherical gravitational harmonics ($J_2$ oblateness), atmospheric drag, solar radiation pressure, and $N$-body tidal perturbations.
3. **Flight Profile Visualizer**: Flight telemetry sequences illustrate published nominal flight trajectories for educational understanding rather than predictive aerodynamic load simulations.

---

## 🏛️ Authoritative Data Attribution

* **NASA Science Mission Directorate & JPL**: Planetary physical parameters, Mars exploration telemetry, Voyager trajectory data.
* **Space Telescope Science Institute (STScI)**: James Webb Space Telescope discoveries and deep-field spectroscopic observations.
* **European Space Agency (ESA)**: Ariane 6 engineering parameters and Cassini-Huygens Titan mission data.
* **Indian Space Research Organisation (ISRO)**: Chandrayaan-3 lunar south pole coordinates and landing data.

---

## 📄 License
Educational non-commercial exploration platform. Developed for scientific communication and open learning.
