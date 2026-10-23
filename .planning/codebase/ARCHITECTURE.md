# Architecture

**Analysis Date:** 2026-10-23

## Pattern Overview

**Overall:** Component-Driven Client-Side SPA with Decoupled Dual-Tier Scientific Engines

The ORBITAL architecture combines a modern React 18 single-page application (SPA) with a strict separation of concerns across presentation, domain data catalogs, 3D WebGL rendering, and mathematical physics engines. It operates with zero backend dependencies, utilizing static typed telemetry datasets and authoritative client-side astrodynamic engines.

**Key Characteristics:**
- **Decoupled Dual-Tier Physics Architecture:** Strict division between analytical SI-unit astrophysical formulas (`src/physics/index.ts`) and numerical symplectic integrators (`src/utils/physics.ts`) tuned for 60 FPS HTML5 canvas simulation.
- **Hybrid Rendering Pipeline:** Seamless blend of standard DOM components (Tailwind CSS Mission Control HUD styling), 3D WebGL rendering (`@react-three/fiber` and `@react-three/drei`), and high-performance 2D HTML5 canvas loops (`requestAnimationFrame`).
- **Resilient Fallback Design:** Automated 2D canvas fallback (`src/components/solar-system/SolarFallback2D.tsx`) for low-power or non-WebGL environments, and resilient cached telemetry fallbacks (`src/services/nasaApi.ts`) for external API requests.
- **Zero-Latency In-Memory Intelligence:** Curated, authoritative astronomical catalogs (`src/data/`) loaded into memory for instant filtering, multi-attribute telemetry search (Cmd+K), and force-directed graph modeling.

## Layers

**Shell & Presentation Layer:**
- Purpose: Application entry, global HUD layout, routing table, and global telemetry search.
- Location: `src/App.tsx`, `src/components/layout/`
- Contains: `Navbar.tsx`, `Footer.tsx`, `GlobalSearchModal.tsx`, route definitions.
- Depends on: `src/pages/`, `src/data/`, `src/types/`
- Used by: Browser runtime (`src/main.tsx`).

**Page Views Layer:**
- Purpose: Top-level route destinations assembling domain components and controls.
- Location: `src/pages/`
- Contains: 16 route pages (`HomePage.tsx`, `ExplorePage.tsx`, `PlanetDetailPage.tsx`, `MissionsPage.tsx`, `RocketsPage.tsx`, `DestinationsPage.tsx`, `OrbitalLabPage.tsx`, `DiscoverPage.tsx`, `AboutPage.tsx`, `NotFoundPage.tsx`, `NeoObservatoryPage.tsx`, `SpaceWeatherPage.tsx`, `ExoplanetsPage.tsx`, `MissionDesignerPage.tsx`, `KnowledgeGraphPage.tsx`, `IntelligencePage.tsx`).
- Depends on: `src/components/`, `src/data/`, `src/physics/`, `src/utils/`
- Used by: `src/App.tsx` via `react-router-dom`.

**Domain Visualizations & Canvases:**
- Purpose: High-framerate interactive spatial and mathematical simulations.
- Location: `src/components/solar-system/`, `src/components/orbital-lab/`, `src/components/knowledge/`, `src/components/rockets/`
- Contains:
  - Three.js R3F 3D Solar System (`SolarSystemCanvas.tsx`, `PlanetMesh.tsx`, `SunMesh.tsx`, `OrbitRing.tsx`)
  - 2D Canvas Symplectic Orbit Sandbox (`OrbitalCanvas.tsx`)
  - 2D Canvas Force-Directed Knowledge Network (`KnowledgeGraphCanvas.tsx`)
  - Staging & Flight Profile Simulators (`LaunchSequenceSimulator.tsx`, `RocketStageInspector.tsx`)
- Depends on: `src/utils/physics.ts`, `src/data/`, `src/types/`
- Used by: `src/pages/`

**Domain Components & Cards:**
- Purpose: Reusable UI cards, comparison grids, and telemetry displays.
- Location: `src/components/planets/`, `src/components/missions/`, `src/components/destinations/`, `src/components/discovery/`
- Contains: `PlanetCard.tsx`, `PlanetComparison.tsx`, `MissionCard.tsx`, `MissionDetailModal.tsx`, `DestinationCard.tsx`, `ApodSection.tsx`.
- Depends on: `src/components/common/`, `src/types/`, `src/utils/formatting.ts`
- Used by: `src/pages/`

**Common UI Primitives:**
- Purpose: Reusable HUD tokens, badges, metrics cards, and loaders.
- Location: `src/components/common/`
- Contains: `Badge.tsx`, `MetricCard.tsx`, `EmptyState.tsx`, `LoadingSpinner.tsx`.
- Depends on: `lucide-react`, Tailwind classes.
- Used across all components and pages.

**Astrophysical Physics Engine (Authoritative SI):**
- Purpose: Exact scientific calculations in SI units (m, kg, s, AU, N) with zero third-party dependencies.
- Location: `src/physics/`
- Contains: `index.ts` (Formulas: $\mu = GM$, Vis-viva, Circular/Escape Velocity, Keplerian Period, Hohmann Transfers, Tsiolkovsky Staging, Hill Sphere), `physics.test.ts`.
- Depends on: None (Standard TypeScript Math library).
- Used by: `src/pages/MissionDesignerPage.tsx`, test runner (`npm test`).

**Simulation Engine (Numerical Integrator):**
- Purpose: Real-time 60 FPS trajectory simulation with conserved energy.
- Location: `src/utils/physics.ts`
- Contains: Symplectic Velocity Verlet integration step (`verletStep`), gravitational acceleration calculation (`getAcceleration`), orbital elements extractor (`calculateOrbitalMetrics`), and trajectory predictor (`predictOrbitPath`).
- Depends on: `src/types/`
- Used by: `src/components/orbital-lab/OrbitalCanvas.tsx`.

**Authoritative Astronomical Datasets:**
- Purpose: Static curated datasets with official sources (NASA JPL Horizons, NOAA SWPC, NASA Exoplanet Archive, STScI).
- Location: `src/data/`
- Contains: `planets.ts`, `missions.ts`, `rockets.ts`, `destinations.ts`, `discoveries.ts`, `asteroids.ts`, `exoplanets.ts`, `knowledgeGraph.ts`, `spaceWeather.ts`.
- Depends on: `src/types/`
- Used by: Components, search modal, and pages.

**External API Services:**
- Purpose: Live data ingestion with timeout protection and fallback mechanisms.
- Location: `src/services/`
- Contains: `nasaApi.ts` (NASA APOD REST API integration).
- Depends on: `src/types/`, `src/data/discoveries.ts`
- Used by: `src/components/discovery/ApodSection.tsx`.

## Data Flow

### 1. Telemetry Search & Deep Navigation Flow
1. User presses `Cmd+K` or clicks search in `src/components/layout/Navbar.tsx`.
2. `src/components/layout/GlobalSearchModal.tsx` activates and captures query input.
3. In-memory databases (`PLANETS`, `MISSIONS`, `ROCKETS`, `DESTINATIONS`, `DISCOVERIES`, `ASTEROIDS_DATABASE`, `EXOPLANETS_DATABASE`) are filtered in parallel.
4. User selects an entity -> `navigate(route)` fires -> Route mounts target page with preselected parameters via query string (e.g., `/missions?id=james-webb`).

### 2. Orbital Mechanics Real-Time Integration Loop
1. User adjusts simulation parameters (central mass, radius, velocity, angle) or selects a preset in `src/pages/OrbitalLabPage.tsx`.
2. State updates propagate to `src/components/orbital-lab/OrbitalCanvas.tsx`.
3. The 60 FPS `requestAnimationFrame` loop calls `verletStep(state, centralMass, dt)` in `src/utils/physics.ts`.
4. The canvas renders the primary central body, orbiting body, velocity vector, and decaying orbital trail.
5. Telemetry metrics (`calculateOrbitalMetrics`) are calculated and emitted via `onMetricsUpdate` callback to update React `MetricCard` readouts without stalling the canvas loop.

### 3. Space Mission Trajectory & Staging Flow
1. User selects origin and destination planetary bodies and propulsion engine type in `src/pages/MissionDesignerPage.tsx`.
2. System retrieves planetary semi-major axes and solar mass from `src/physics/index.ts`.
3. `calculateHohmannTransfer` computes transfer orbit semi-major axis, $\Delta v_1$, $\Delta v_2$, total $\Delta v$, and duration in days.
4. `calculateRequiredPropellantMass` calculates fuel mass based on engine specific impulse ($I_{sp}$) and dry mass via the Tsiolkovsky equation.
5. Flight plan state is optionally committed to browser `localStorage` for cross-session persistence.

### State Management Strategy
- **Local Component State (`useState`):** Form controls, active tabs, filter parameters, and modal visibility.
- **Animation Loop State (`useRef`):** Particle positions, simulation velocities, and canvas rendering contexts use refs to eliminate React re-render overhead during 60 FPS animation.
- **URL Parameter State (`useSearchParams`, `useParams`):** Mission IDs, destination IDs, rocket selections, and planet IDs are synchronized with the URL for shareable, bookmarkable deep links.
- **Persistent State (`localStorage`):** Mission designer flight plans are persisted under custom local storage keys.

## Key Abstractions

**Astrophysical Constants & Analytical Functions:**
- Purpose: Zero-dependency pure functions returning SI units for celestial mechanics.
- Location: `src/physics/index.ts`
- Pattern: Functional mathematical library with pure deterministic outputs.

**Symplectic Integrator (`verletStep`):**
- Purpose: Energy-conserving Velocity Verlet algorithm preventing numerical decay or artificial orbital expansion.
- Location: `src/utils/physics.ts`
- Pattern: Symplectic state-transition function.

**HUD Tactical Component Wrappers:**
- Purpose: Unified NASA Mission Control visual language with corner brackets, glowing accents, and monospace telemetry.
- Location: `src/index.css` (`.hud-card`, `.hud-corner-tl/tr/bl/br`), `src/components/common/Badge.tsx`, `src/components/common/MetricCard.tsx`.
- Pattern: Design system tokens and primitive wrapper components.

**Fallback-Decorated API Client (`ApiFetchResult<T>`):**
- Purpose: Safely encapsulate external network calls, reporting both live state and source fallback attribution.
- Location: `src/services/nasaApi.ts`
- Pattern: Result Object with Graceful Degradation / Fallback.

## Entry Points

**Web Application Entry:**
- Location: `src/main.tsx`
- Triggers: Browser document load (`index.html`).
- Responsibilities: Mounts React tree into `#root`, wraps with `BrowserRouter` and `React.StrictMode`, loads `src/index.css`.

**Route Orchestrator:**
- Location: `src/App.tsx`
- Triggers: URL route changes.
- Responsibilities: Renders sticky `Navbar`, handles scroll restoration to top on route change (`ScrollToTop`), resolves active page view via `Routes`, renders `Footer`.

**Automated Physics Validation Suite Entry:**
- Location: `src/physics/physics.test.ts`
- Triggers: `npm test` (`npx --yes tsx -e "import { runPhysicsValidationTests } from './src/physics/physics.test'; console.table(runPhysicsValidationTests());"`).
- Responsibilities: Validates LEO speed, Earth escape velocity, Earth orbital period, Earth-to-Mars Hohmann transfer, Tsiolkovsky rocket equation, and Earth Hill sphere against published astrophysical constants.

## Error Handling

**Strategy:** Fail-soft with resilient defaults and visual feedback.

**Patterns:**
- **Network Resilience:** External API calls in `src/services/nasaApi.ts` implement `AbortSignal.timeout(6000)` and `try...catch` blocks that fall back to verified local datasets (`src/data/discoveries.ts`).
- **Mathematical Boundary Guards:** Functions in `src/physics/index.ts` guard against non-positive masses, radii, or negative velocities with explicit exception throwing (`throw new Error(...)`).
- **Routing 404 Catch-All:** `src/App.tsx` defines a wildcard `<Route path="*" element={<NotFoundPage />} />` presenting a themed "Deep Space Anomaly - Telemetry Signal Lost" recovery page.

## Cross-Cutting Concerns

**Logging:** Minimal console output; test suites output formatted telemetry tables via `console.table`.
**Validation:** Strict TypeScript (`strict: true` in `tsconfig.json`) ensures end-to-end type safety across datasets, physics functions, and component props.
**Attribution & Provenance:** Every celestial dataset, mission dossier, and formula includes explicit scientific citations (NASA JPL Horizons, NOAA SWPC, STScI, NASA ADS).

---

*Architecture analysis: 2026-10-23*
