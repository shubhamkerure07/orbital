# ORBITAL — Explore Beyond What You Know

A complete, premium, interactive space exploration and astrophysics platform. Combines a modern scientific observatory console, an interactive 3D digital planetarium, and an educational orbital mechanics laboratory.

---

## 🛰️ Overview & Core Objectives

**Project Name:** ORBITAL  
**Tagline:** *Explore Beyond What You Know.*  
**Primary Goal:** Make space exploration interactive, educational, scientifically responsible, and visually unforgettable.

ORBITAL delivers an authentic space exploration experience using verified astronomical ephemerides, flight manuals, and astrophysical observations—without fabricated telemetry or generic placeholder concepts.

---

## 🌟 Core Features & Modules

### 1. Cinematic Observatory Homepage (`/`)
* **Atmospheric Horizon Hero**: Deep space lighting, typography, and responsive viewport sizing.
* **Featured Planet Spotlight**: Comprehensive planetary highlights with authentic measurements.
* **Solar System Preview**: Quick-access interactive preview cards for celestial bodies.
* **Mission Spotlight**: Verified historical and active space missions with status pills.
* **Cosmic Frontier**: Exoplanet profiles (TRAPPIST-1e) and deep-field cosmological discoveries.
* **Orbital Lab Preview**: Mini interactive preview of two-body gravitational mechanics.

### 2. Interactive 3D Solar System (`/explore`)
* **Full Three.js & React Three Fiber (R3F) Canvas**: High-performance WebGL solar system with Sun, Mercury, Venus, Earth (with Moon), Mars, Jupiter, Saturn (with dynamic rings), Uranus, and Neptune.
* **Planetary Materials & Axial Tilts**: Authentic inclination angles (e.g. Uranus sideways 97.8° tilt, Venus retrograde rotation).
* **Smooth Camera Transitions**: Automatic smooth lerping toward focused targets upon selection.
* **Interactive Controls**: Play, pause, speed multipliers (0.5×, 1×, 3×), reset camera, label toggling, target focus dropdown, zoom in/out.
* **Mobile-Optimized Bottom Sheet**: Compact slide-in details without obstructing 3D viewport.
* **Resilient 2D WebGL Fallback**: Interactive 2D HTML5 canvas mode if WebGL is unavailable or disabled.
* **Planetary Differential Analyzer**: Side-by-side comparison tool comparing diameter, gravity, orbital year, day length, temperature, and mass between any two celestial bodies.

### 3. Planetary Dossiers (`/explore/:planetId`)
* Typed scientific metrics: Equatorial diameter, mean distance from Sun (AU and millions of km), orbital period, orbital velocity, sidereal day length, surface gravity ($g$ and $\text{m/s}^2$), mean and extreme temperatures.
* Atmospheric composition percentage graphs.
* Key geological landforms and active research questions.
* Previous/Next planet navigation and related exploration missions.

### 4. Space Missions Explorer (`/missions`)
* Verified missions including **James Webb Space Telescope (JWST)**, **Mars 2020 Perseverance & Ingenuity**, **Voyager 1 & 2**, **Apollo 11**, **Curiosity**, **Cassini-Huygens**, **Artemis I**, **Europa Clipper**, and **Chandrayaan-3**.
* Multi-parameter filtering: Filter by status (active, completed, planned, en-route), category (rover, orbiter, telescope, crewed, probe), and search by keywords.
* Sorting by launch date (newest/oldest).
* In-depth mission detail modal: Verified objectives, scientific breakthroughs, and chronological mission milestones.

### 5. Rocket Explorer & Staging Simulator (`/rockets`)
* Orbital launch vehicles: **Falcon 9 Block 5**, **Saturn V**, **Space Launch System (SLS Block 1)**, **Starship & Super Heavy**, and **Ariane 6**.
* **Interactive Multistage Schematic**: Clickable SVG rocket stages detailing engine counts, thrust outputs (kN), propellant combinations, burn times, and staging purposes.
* **Flight Profile Simulator**: Step-by-step flight timeline (Liftoff $\to$ Max-Q $\to$ MECO $\to$ Staging $\to$ Fairing Jettison $\to$ Orbital Insertion) with live altitude, speed (km/h), and Mach number calculation.
* **Capacity Matrix**: Comparative payload capacities to Low Earth Orbit (LEO) and Geostationary Transfer Orbit (GTO).

### 6. Destinations Explorer (`/destinations`)
* Monographic guides to **The Moon (Luna)**, **Mars**, **Europa**, **Titan**, and **TRAPPIST-1e**.
* Surface environments, geological histories, atmospheric pressures, and astrobiological habitability indices.
* Open scientific frontiers and current/planned robotic missions.

### 7. Orbital Mechanics Laboratory (`/orbital-lab`)
* **Newtonian Two-Body Physics Engine**: Real-time symplectic Velocity Verlet numerical integrator ($\mathbf{F} = \frac{GMm}{r^2}\hat{\mathbf{r}}$).
* **Live User Controls**: Central body mass ($M$), initial orbital radius ($r_0$), orbital insertion speed ($v_0$), velocity vector angle (tangential vs radial), simulation speed.
* **Analytical Trajectory Overlay**: Dotted Keplerian predicted conic sections rendered simultaneously with true numerical integration history.
* **Real-time Telemetry Readout**: Instantaneous distance, velocity, kinetic energy ($K$), potential energy ($U$), total specific energy ($E$), eccentricity ($e$), periapsis, apoapsis, and orbital period.
* **Educational Presets**:
  1. *Stable Circular Orbit* ($v = \sqrt{GM/r}$, $e = 0$)
  2. *Elliptical Transfer Orbit* ($0 < e < 1$)
  3. *Sub-orbital Decaying Trajectory* (impact with surface)
  4. *Hyperbolic Escape Trajectory* ($v > \sqrt{2GM/r}$, $e > 1$, $E > 0$)
* Classical mechanics documentation and numerical assumptions explained.

### 8. Space Discovery (`/discover`)
* Live integration with NASA's Astronomy Picture of the Day (APOD) API with graceful offline fallback to high-resolution astrophysics archives.
* Peer-reviewed astronomical discovery dispatches across early cosmic dawn, black holes, and astrobiology.

### 9. Global Search (`Cmd/Ctrl + K`)
* Keyboard-accessible modal querying across all planets, missions, launch vehicles, destinations, and physics topics.
* Instant keyboard navigation and categorized result badges.

### 10. Observatory Specifications (`/about`)
* Scientific methodology, observational vs simulation distinctions, data source attribution, and ethical non-commercial educational disclosure.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | React 18, TypeScript 5, Vite 5 |
| **Styling** | Tailwind CSS (Dark astrophysics design tokens, JetBrains Mono telemetry typography) |
| **3D Engine** | Three.js, React Three Fiber (R3F), `@react-three/drei` |
| **Routing** | React Router v6 |
| **Icons** | Lucide React |
| **Numerical Physics** | Symplectic Velocity Verlet 2-body gravitational integrator |

---

## 🚀 Installation & Local Development

### Prerequisites
* Node.js v18+ (tested on Node v24.19)
* npm v9+

### Commands

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

3. **Verify TypeScript & Production Build**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 🔬 Scientific Simulation Assumptions & Boundaries

1. **Normalized Planetary Scales**: True physical distances and planetary diameters are reported in data cards. The 3D viewport applies normalized logarithmic spacing so that outer planets (e.g., Neptune at 30 AU) remain visible and interactable alongside inner terrestrial worlds.
2. **Two-Body Gravitational Model**: The Orbital Lab models a single satellite orbiting a primary point mass. Real spaceflight dynamics also experience non-spherical gravitational harmonics ($J_2$ oblateness), atmospheric drag, solar radiation pressure, and $N$-body tidal perturbations.
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
