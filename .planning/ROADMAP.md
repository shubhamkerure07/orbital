# Roadmap: ORBITAL

## Overview

This roadmap drives the **v2.1 Polish & Scientific Fidelity Milestone** for the ORBITAL Deep Space Exploration, Simulation & Scientific Intelligence Ecosystem. Building upon the verified v2.0 foundation, this milestone resolves 3D camera tracking and zoom ergonomics, decouples 60 FPS canvas render loops from DOM reflows and React state churn, integrates KaTeX math typography into scientific treatises, and hardens client-side persistence and security boundaries.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases: Urgent insertions

Phases execute in numeric order: 1 → 2 → 3 → 4.

- [x] **Phase 1: 3D Visualization & Navigation Stabilization** - Fix camera tracking of orbiting bodies, zoom dollying, lerp jitter, and invalid planet route handling. (completed 2026-10-23)
- [ ] **Phase 2: Canvas Performance & Render Loop Optimization** - Decouple canvas sizing from 60 FPS draw loops, throttle telemetry React state updates, and optimize trajectory precomputations.
- [ ] **Phase 3: Scientific Intelligence Math Rendering & Formula Guards** - Render formatted LaTeX mathematical proofs with KaTeX and guard astrodynamics exponential equations against overflow.
- [ ] **Phase 4: Persistence Hardening & Security Defenses** - Add schema validation and quota resilience to local storage flight plans, and sanitize third-party video iframe embeds.

---

## Phase Details

### Phase 1: 3D Visualization & Navigation Stabilization
**Goal**: Ensure smooth, jitter-free 3D camera navigation in the planetarium that follows moving bodies dynamically and provides intuitive zoom controls.
**Depends on**: Nothing (first phase)
**Requirements**: VIS-01, VIS-02, VIS-03, VIS-04
**Success Criteria** (what must be TRUE):
  1. Selecting any revolving planet smoothly lerps the camera to the live world coordinates of the planet.
  2. Clicking Zoom In and Zoom Out controls dollies the camera along its line of sight without resetting rotation or origin coordinates.
  3. Once the camera approaches within $\epsilon < 0.1$ of the target position, manual OrbitControls pan/rotate works without rubber-banding or stutter.
  4. Navigating to an invalid planet URL (`/explore/:planetId`) renders the deep space 404 recovery page instead of falling back silently to Earth.
**Plans**: 2 plans

Plans:
- [ ] 01-01: Fix live world coordinate tracking and zoom dollying in `SolarSystemCanvas.tsx`
- [ ] 01-02: Eliminate lerp/OrbitControls fighting and add invalid planet route guard in `PlanetDetailPage.tsx`

### Phase 2: Canvas Performance & Render Loop Optimization
**Goal**: Eliminate DOM layout thrashing and high-frequency React reconciliation overhead across all 2D simulation canvases.
**Depends on**: Phase 1
**Requirements**: PERF-01, PERF-02, PERF-03, PERF-04
**Success Criteria** (what must be TRUE):
  1. `canvas.width` and `canvas.height` are updated strictly on element resize events via `ResizeObserver`, never on animation frames.
  2. Orbital Lab telemetry (`onMetricsUpdate`) dispatches at a throttled cadence (10 Hz / 100ms) while preserving 60 FPS canvas motion.
  3. Trajectory paths are cached and recomputed only when orbital initial conditions change, saving 450 integration steps per frame.
  4. Spacecraft trails use a high-performance circular buffer avoiding O(N) `.shift()` re-indexing.
**Plans**: 2 plans

Plans:
- [ ] 02-01: Decouple canvas resizing from requestAnimationFrame loops across `OrbitalCanvas`, `KnowledgeGraphCanvas`, and `SolarFallback2D`
- [ ] 02-02: Throttle telemetry state dispatch, memoize analytical trajectory prediction, and implement circular trail buffer

### Phase 3: Scientific Intelligence Math Rendering & Formula Guards
**Goal**: Present beautiful LaTeX mathematical typography across scientific treatises and prevent IEEE 754 arithmetic overflow in rocket calculations.
**Depends on**: Phase 2
**Requirements**: SCI-01, SCI-02
**Success Criteria** (what must be TRUE):
  1. Scientific treatises on astrodynamics, general relativity, and propulsion display rendered KaTeX math formatting rather than raw backslash LaTeX markup.
  2. Large delta-V inputs in `calculateRequiredPropellantMass` are checked before exponentiation, preventing `Infinity` or `NaN`.
**Plans**: 2 plans

Plans:
- [ ] 03-01: Install and integrate `katex` rendering for LaTeX formula displays in `IntelligencePage.tsx`
- [ ] 03-02: Implement arithmetic boundary guards in `src/physics/index.ts` with accompanying unit tests in `src/physics/physics.test.ts`

### Phase 4: Persistence Hardening & Security Defenses
**Goal**: Protect client-side storage from schema drift and quota exhaustion, and sandbox third-party media embeds.
**Depends on**: Phase 3
**Requirements**: DATA-01, DATA-02
**Success Criteria** (what must be TRUE):
  1. Interplanetary flight architectures saved to `localStorage` are capped at 20 entries, validated with type guards, and wrapped in quota-resilient handlers.
  2. NASA APOD video iframes enforce verified video domains (`youtube.com`, `vimeo.com`) and include strict `sandbox` attributes.
**Plans**: 1 plan

Plans:
- [ ] 04-01: Implement schema-validated storage adapter in `MissionDesignerPage.tsx` and sandbox video embeds in `ApodSection.tsx`

---

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. 3D Visualization & Navigation | 0/2 | Complete    | 2026-10-23 |
| 2. Canvas Performance & Optimization | 0/2 | Not started | - |
| 3. Scientific Math & Formula Guards | 0/2 | Not started | - |
| 4. Persistence & Security Defenses | 0/1 | Not started | - |

---
*Roadmap defined: 2026-10-23*  
*Last updated: 2026-10-23 after GSD project initialization*
