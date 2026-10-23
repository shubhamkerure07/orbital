# Orbital — Deep Space Exploration, Simulation & Scientific Intelligence Ecosystem

## What This Is

Orbital is a modular, high-precision deep space exploration, simulation, and scientific intelligence platform combining the precision of an aerospace mission-control console, the realism of an observatory, and the immersion of a digital planetarium. Built with React 18, Three.js, React Three Fiber, TypeScript, and Tailwind CSS, it provides interactive 3D celestial ephemerides, 2D symplectic orbital mechanics sandboxes, planetary defense asteroid tracking, exoplanet photometry analyzers, and interplanetary trajectory mission design.

## Core Value

Zero-dependency, mathematically verified astrodynamics simulation and interactive space telemetry visualization accessible entirely client-side in the browser.

## Requirements

### Validated

- ✓ Interactive 3D Solar System Planetarium (Three.js / React Three Fiber) with planetary orbits, camera lerp, and 2D canvas fallback — v2.0
- ✓ Symplectic Velocity Verlet 2-Body Gravitational Integrator with real-time Keplerian conic extraction and energy conservation telemetry — v2.0
- ✓ Near-Earth Object (NEO) & Planetary Defense Observatory tracking 34,850+ asteroids, close approach distances, and Torino/Palermo impact hazard scales — v2.0
- ✓ Exoplanet Transit Photometry & JWST Atmospheric Transmission Spectroscopy analyzer — v2.0
- ✓ NOAA SWPC Space Weather Observatory with Kp geomagnetic activity, solar wind telemetry, and auroral visibility calculator — v2.0
- ✓ Interplanetary Mission Designer with heliocentric Hohmann transfer solver and Tsiolkovsky multi-stage rocket staging calculator — v2.0
- ✓ Historic & Active Mission Manifest (JWST, Perseverance, Voyager 1/2, Artemis I, Apollo 11, etc.) with category filters and deep telemetry dossiers — v2.0
- ✓ Launch Vehicle Staging Inspector (Falcon 9, Saturn V, Starship, SLS Block 1, Ariane 6) with interactive ascent simulator — v2.0
- ✓ Force-Directed Cosmic Knowledge Graph & Ontology connecting 24 celestial entities and 24 relational edges — v2.0
- ✓ Peer-reviewed Scientific Intelligence treatises with verified mathematical proofs and LaTeX formulas — v2.0
- ✓ Reusable SI Astrophysical Engine (`src/physics/index.ts`) verified against CODATA/NASA constants with 100% automated test pass rate — v2.0

### Active

- [ ] Fix 3D Solar System planet tracking bug (camera locks to moving target world rather than static axis offset)
- [ ] Decouple canvas dimension assignment from 60 FPS requestAnimationFrame render loops across all canvases to prevent layout thrashing
- [ ] Throttle high-frequency React state updates in Orbital Lab from 60 Hz to 10 Hz to eliminate UI input lag
- [ ] Integrate KaTeX mathematical typesetting engine into Scientific Intelligence to render LaTeX equations beautifully
- [ ] Implement Synodic Launch Window calculations (Porkchop plot matrix) for realistic interplanetary mission planning
- [ ] Add true Keplerian orbital eccentricity and inclination to 3D planetary ephemerides

### Out of Scope

- Backend server or database storage — Orbital is intentionally 100% client-side with zero backend dependencies.
- Multi-body general relativistic N-body simulations ($N > 10,000$) — Exceeds WebGL client performance bounds; addressed via analytical Keplerian approximations and 2-body symplectic integrators.
- Native mobile binary apps — WebGL SPA works across mobile and desktop responsive viewports.

## Context

- Architecture is a component-driven React 18 SPA with strict separation of analytical SI physics (`src/physics/`) and numerical simulation integrators (`src/utils/physics.ts`).
- Fully tested core physics suite passing 6/6 tests via `npm test`.
- Production bundle compiled cleanly with Vite and vendor chunking (`three-vendor`, `react-vendor`, `ui-vendor`).
- Detailed codebase analysis completed and persisted in `.planning/codebase/`.

## Constraints

- **Tech Stack**: React 18, Three.js, React Three Fiber, TypeScript 5.6, Tailwind CSS, Vite 5.4.
- **Performance**: 60 FPS rendering on modern browsers, responsive layout down to mobile viewports.
- **Scientific Accuracy**: All equations must use standard SI units with published physical constants (CODATA / NASA JPL).
- **Zero Backend**: All data structures statically compiled or cached client-side.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React Three Fiber + 2D Canvas Fallback | Provides 3D immersion with graceful degradation for low-power GPUs | ✓ Good |
| Symplectic Velocity Verlet Integrator | Energy-conserving numerical integration preserves closed orbits without decay | ✓ Good |
| In-memory typed catalogs | Sub-millisecond instant search and zero backend hosting complexity | ✓ Good |
| GSD Structured Management | Ensures spec-driven enhancement, bug eradication, and milestone delivery | ✓ Good |

---
*Last updated: 2026-10-23 after GSD project initialization*
