# 🪐 ORBITAL 2.0 — Deep Space Exploration, Simulation & Scientific Intelligence Ecosystem

[![Version 2.0.0](https://img.shields.io/badge/Version-2.0.0-00f2ff?style=for-the-badge&logo=rocket)](https://orbital-nu-gules.vercel.app/)
[![Live Deployment](https://img.shields.io/badge/Live_Deployment-orbital--nu--gules.vercel.app-00f2ff?style=for-the-badge&logo=vercel)](https://orbital-nu-gules.vercel.app/)
[![React 18](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Physics Validation](https://img.shields.io/badge/Physics_Suite-100%25_Passed-emerald?style=for-the-badge&logo=vitest)](https://github.com/shubhamkerure07/orbital)

> **"THE UNIVERSE IS YOURS TO EXPLORE."**  
> ORBITAL is a modular space exploration, simulation, and scientific intelligence platform combining the precision of an aerospace mission-control console, the realism of a scientific observatory, and the immersion of a digital planetarium.

🌐 **Live Application:** [https://orbital-nu-gules.vercel.app/](https://orbital-nu-gules.vercel.app/)  
📂 **GitHub Repository:** [https://github.com/shubhamkerure07/orbital](https://github.com/shubhamkerure07/orbital)

---

## 🛰️ Visual Identity & Design System

Inspired by NASA Goddard & JPL flight operation dashboards and modern scientific visualization platforms:
* **Typography:** Geometric display font (**Outfit**), body legibility (**Inter**), and high-precision telemetry monospace (**JetBrains Mono**).
* **Color Palette:** Deep Obsidian Space (`#020205`, `#030712`), Holo Cyan (`#00f2ff`), NASA Deep Blue (`#0b3d91`), Solar Amber (`#f59e0b`), and Biosignature Emerald (`#10b981`).
* **Tactical HUD Accents:** Corner bracket framing (`.hud-corner-tl/tr/bl/br`), live UTC Mission Control telemetry ribbon, and cosmic dust particles.

---

## 🏛️ The 10 Interconnected Core Systems

### 1. 🌍 Universe Explorer (`/explore` & `/destinations`)
* **3D Solar System (Three.js & React Three Fiber)**: Interactive celestial ephemerides for the Sun, Mercury, Venus, Earth & Moon, Mars, Jupiter, Saturn, Uranus, and Neptune.
* Smooth camera lerping, orbital trails, time acceleration (0.5×, 1×, 3×), and automated 2D HTML5 canvas fallback for low-power hardware.
* Monographic dossiers for target worlds (Luna, Mars, Europa, Titan, TRAPPIST-1e).

### 2. 📡 Mission Control Flight Operations (`/missions` & `/rockets`)
* Verified flight operations archive: **JWST**, **Perseverance & Ingenuity**, **Voyager 1 & 2**, **Apollo 11**, **Cassini-Huygens**, **Artemis I**, **Europa Clipper**, and **Chandrayaan-3**.
* Interactive rocket staging schematics (**Falcon 9**, **Saturn V**, **SLS Block 1**, **Starship**, **Ariane 6**) with live ascent stage calculators.

### 3. ⚛️ Orbital Mechanics Laboratory (`/orbital-lab`)
* **Symplectic Velocity Verlet 2-Body Integrator**: Real-time numerical gravitational sandbox ($\mathbf{F} = \frac{GMm}{r^2}\hat{\mathbf{r}}$).
* Live mass, radius, and tangential velocity controls with analytical Keplerian conic overlays (circular, elliptical, decaying, hyperbolic escape).
* Real-time energy conservation readouts: kinetic energy $K$, potential energy $U$, total mechanical energy $E$, and eccentricity $e$.

### 4. ☄️ Asteroid & Near-Earth Object Observatory (`/observatory/neo`)
* **Planetary Defense Tracking**: Catalog of 34,850+ Near-Earth Asteroids (NEAs) and Potentially Hazardous Asteroids (PHAs).
* High-precision radar profiles for **99942 Apophis** (2029 close pass at 31,600 km inside the geosynchronous satellite ring), **101955 Bennu**, **65803 Didymos & Dimorphos** (NASA DART kinetic deflection target), **16 Psyche**, and **433 Eros**.
* Proximity visualizer comparing miss distances against Lunar Distance ($1\text{ LD} = 384,400\text{ km}$) and Torino/Palermo impact hazard scale analyzer.

### 5. 🪐 Exoplanet Discovery Laboratory (`/discover/exoplanets`)
* Interactive catalog of 5,600+ confirmed alien worlds indexed from the **NASA Exoplanet Archive** (Caltech/IPAC).
* **Transit Photometry Light Curve Simulator**: Graphing occultation brightness dips $\Delta F / F = (R_p / R_*)^2$ in parts-per-million (ppm).
* **JWST Transmission Spectroscopy Telemetry**: Identifying atmospheric signatures for water vapor ($\text{H}_2\text{O}$), carbon dioxide ($\text{CO}_2$), sulfur dioxide ($\text{SO}_2$), and methane ($\text{CH}_4$) on worlds like WASP-39 b and K2-18 b.
* Circumstellar Habitable Zone (HZ) and Earth Similarity comparative metrics.

### 6. ☀️ Space Weather & Heliophysics Observatory (`/observatory/space-weather`)
* **Real-time NOAA SWPC Telemetry**: 0–9 planetary $K_p$ geomagnetic activity gauge with live status alert badges (G0 Quiet to G5 Extreme).
* Solar wind plasma velocity ($\text{km/s}$), proton density ($\text{p/cm}^3$), and Interplanetary Magnetic Field $B_z$ southward coupling ($\text{nT}$).
* Real-time GOES X-ray solar flare monitor (X, M, C-class) and WSA-Enlil Coronal Mass Ejection (CME) shockwave transit predictor.
* Interactive observer latitude aurora visibility oval calculator.
* Historical solar superstorm benchmark database (Carrington Event 1859, Halloween Storms 2003, Mother's Day G5 Storm May 2024).

### 7. 🚀 Space Mission Designer & Trajectory Laboratory (`/simulate/mission-designer`)
* **Heliocentric Hohmann Transfer Solver**: Solves minimum-energy semi-major axes, injection burns $\Delta v_1$, orbital capture burns $\Delta v_2$, total $\Delta v$ budget, and one-way transit durations in Earth days.
* **Tsiolkovsky Rocket Staging Module**: Computes required wet propellant mass $m_{\text{prop}} = m_{\text{dry}} \cdot \left(e^{\Delta v / (I_{sp} \cdot g_0)} - 1\right)$ for chemical Hydrolox ($450\text{s}$), Methalox ($380\text{s}$), Kerolox ($311\text{s}$), Nuclear Thermal ($900\text{s}$), and Ion Thrusters ($3200\text{s}$).
* Multi-stage spacecraft dry vs wet mass ratios and flight plan persistence via browser `localStorage`.

### 8. 🧠 Universe Knowledge Graph & Ontology (`/discover/knowledge-graph`)
* **Force-Directed Topological Network Canvas**: Interactive 60 FPS spring simulation connecting 24 celestial entities and 24 relational edges across physical laws, missions, and celestial bodies.
* Drag-and-drop physics with real-time Euler Verlet damping, category filtering, and semantic relationship inspection.

### 9. 🔬 ORBITAL Scientific Intelligence (`/intelligence`)
* Peer-reviewed knowledgebase covering **Astrodynamics** (Lagrange points L1–L5, Jacobi energy integral, Oberth effect), **Relativistic Astrophysics** (Schwarzschild radius $r_s = 2GM/c^2$, gravitational time dilation), **Propulsion Physics**, **Heliophysics Reconnection**, and **Planetary Defense Momentum Enhancement ($\beta$)**.
* Verified LaTeX mathematical proofs with one-click clipboard copying and citations to NASA ADS and peer-reviewed journals.

### 10. 📐 Reusable Solar System Physics Engine (`src/physics/`)
* Modular, strictly typed mathematical library in SI units with zero dependencies:
  * Gravitational Parameter: $\mu = G \cdot M$
  * Vis-viva Equation: $v = \sqrt{\mu \left(\frac{2}{r} - \frac{1}{a}\right)}$
  * Circular & Escape Velocity: $v_{\text{circ}} = \sqrt{\frac{\mu}{r}}$, $v_{\text{esc}} = \sqrt{\frac{2\mu}{r}}$
  * Keplerian Period: $T = 2\pi \sqrt{\frac{a^3}{\mu}}$
  * Hill Sphere: $r_H \approx a \sqrt[3]{\frac{m}{3M}}$
  * Hohmann Transfers & Tsiolkovsky Staging

---

## 🧪 Automated Physics Validation Suite

ORBITAL includes an automated physics validation suite that checks all formulas against published astrophysical constants:

```bash
npm test
```

### Validation Results:
```
┌─────────┬─────────────────────────────────────────────┬────────┬─────────────────────────────────────────────────────┐
│ (index) │ name                                        │ passed │ details                                             │
├─────────┼─────────────────────────────────────────────┼────────┼─────────────────────────────────────────────────────┤
│ 0       │ 'Low Earth Orbit (300km) Circular Velocity' │ true   │ 'Calculated: 7.73 km/s (Expected: ~7.73 km/s)'      │
│ 1       │ 'Earth Surface Escape Velocity'             │ true   │ 'Calculated: 11.19 km/s (Expected: ~11.19 km/s)'    │
│ 2       │ 'Earth Keplerian Orbital Period'            │ true   │ 'Calculated: 365.25 days (Expected: ~365.25 days)'  │
│ 3       │ 'Earth-to-Mars Hohmann Transfer Duration'   │ true   │ 'Calculated: 258.9 days (~8.5 months)'              │
│ 4       │ 'Tsiolkovsky Rocket Equation (Hydrolox)'    │ true   │ 'Calculated: 10.16 km/s for mass ratio 10:1'        │
│ 5       │ 'Earth Gravitational Hill Sphere'           │ true   │ 'Calculated: 1.50 million km (Expected: ~1.50M km)' │
└─────────┴─────────────────────────────────────────────┴────────┴─────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | React 18, TypeScript 5, Vite 5 |
| **Styling** | Tailwind CSS, Custom Mission Control HUD tokens |
| **Fonts** | Outfit, Inter, JetBrains Mono (Google Fonts) |
| **3D Engine** | Three.js, React Three Fiber (R3F), `@react-three/drei` |
| **Routing** | React Router v6 (Vercel SPA rewrite configured in `vercel.json`) |
| **Icons** | Lucide React |
| **Calculations** | ORBITAL SI Scientific Physics Engine |

---

## 🚀 Local Setup & Production Build

1. **Clone repository**:
   ```bash
   git clone https://github.com/shubhamkerure07/orbital.git
   cd orbital
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run automated test suite**:
   ```bash
   npm test
   ```

4. **Start local development server**:
   ```bash
   npm run dev
   ```

5. **Production build**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🏛️ Authoritative Data Attribution

* **NASA Jet Propulsion Laboratory (JPL)**: Planetary orbital ephemerides (Horizons system) and Center for Near-Earth Object Studies (CNEOS).
* **NOAA Space Weather Prediction Center (SWPC)**: Planetary $K_p$ indices, solar wind vectors, and GOES X-ray flare data.
* **NASA Exoplanet Archive (Caltech/IPAC)**: Verified exoplanet parameters and discovery facilities.
* **Space Telescope Science Institute (STScI)**: James Webb Space Telescope transmission spectroscopy datasets.
* **European Space Agency (ESA) & ISRO**: Space mission telemetry and planetary exploration data.

---

## 📄 License
MIT License. Developed for open scientific education, astronomy research, and aerospace exploration.
