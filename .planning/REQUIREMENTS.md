# Requirements: ORBITAL

**Defined:** 2026-10-23  
**Core Value:** Zero-dependency, mathematically verified astrodynamics simulation and interactive space telemetry visualization accessible entirely client-side in the browser.

## Current Milestone (v2.1 Polish & Scientific Fidelity) Requirements

Requirements for the current polish and enhancement milestone.

### 3D Visualization & Graphics Stability (VIS)

- [ ] **VIS-01**: Planet camera tracking smoothly lerps to live world position of selected revolving planet in 3D Solar System instead of static X-axis offset
- [ ] **VIS-02**: Zoom in/out controls adjust camera distance along viewing axis without abruptly resetting camera angle or position
- [ ] **VIS-03**: Hand off camera rotation control cleanly to OrbitControls once camera lerp approaches target threshold ($\epsilon < 0.1$) to prevent jitter
- [ ] **VIS-04**: Invalid planet detail routes (`/explore/:invalidId`) gracefully redirect or render the themed 404 recovery view instead of falling back to Earth

### Canvas Performance & Frame Optimization (PERF)

- [ ] **PERF-01**: Decouple canvas dimension assignment (`canvas.width`/`height`) from 60 FPS `requestAnimationFrame` loops via ResizeObserver across `OrbitalCanvas`, `KnowledgeGraphCanvas`, and `SolarFallback2D`
- [ ] **PERF-02**: Throttle telemetry dispatch (`onMetricsUpdate`) in Orbital Lab from 60 Hz to 10 Hz (100ms) to eliminate React reconciliation lag during physics runs
- [ ] **PERF-03**: Optimize orbital trajectory prediction in Orbital Lab by memoizing pre-computed conic points instead of re-integrating 450 steps every single animation frame
- [ ] **PERF-04**: Replace O(N) array `.shift()` on 500-point spacecraft trail buffer with ring buffer or pre-allocated typed array

### Scientific Intelligence & Formula Rendering (SCI)

- [ ] **SCI-01**: Render LaTeX mathematical formulas across all Scientific Intelligence treatises using KaTeX typography instead of raw monospace LaTeX strings
- [ ] **SCI-02**: Validate exponent boundaries in Tsiolkovsky propellant calculation (`calculateRequiredPropellantMass`) to prevent IEEE 754 arithmetic overflow ($> 10^{308}$)

### Data Persistence & API Resilience (DATA)

- [ ] **DATA-01**: Guard `localStorage` access in Mission Designer with JSON schema validation, max entry capping (20 entries), and quota exhaustion recovery
- [ ] **DATA-02**: Sanitize NASA APOD video embed iframes with explicit sandbox permissions (`allow-scripts allow-same-origin allow-presentation`) and domain validation

## Future (v2.2+) Requirements

Deferred to future releases.

### Advanced Astrodynamics

- **ASTRO-01**: Keplerian elliptical orbits with true eccentricity and inclination in 3D Solar System
- **ASTRO-02**: Synodic interplanetary launch window generator (Porkchop plots) in Mission Designer
- **ASTRO-03**: Multi-body gravitational perturbation sandbox (Sun-Earth-Moon Restricted 3-Body Problem)

### Live Scientific Ingestion

- **LIVE-01**: Direct REST integration with NOAA SWPC live 1-minute solar wind plasma feed
- **LIVE-02**: Direct REST integration with NASA JPL SSD Small-Body Database API with user-provided API key support

## Out of Scope

| Feature | Reason |
|---------|--------|
| Server-side rendering (SSR) or Node backend | Orbital is strictly architected as a zero-backend, client-side static application |
| User accounts, passwords, or cloud database sync | Unnecessary complexity; local browser persistence (`localStorage`) fully suffices |
| Native mobile wrappers (Capacitor / Cordova) | Fully responsive WebGL/HTML5 canvas delivers optimal performance on mobile browsers |
| N-Body full general relativity tensor solver | Computationally infeasible in client-side real-time JavaScript |

## Traceability

Which phases cover which requirements.

| Requirement | Phase | Status |
|-------------|-------|--------|
| VIS-01 | Phase 1 | Pending |
| VIS-02 | Phase 1 | Pending |
| VIS-03 | Phase 1 | Pending |
| VIS-04 | Phase 1 | Pending |
| PERF-01 | Phase 2 | Pending |
| PERF-02 | Phase 2 | Pending |
| PERF-03 | Phase 2 | Pending |
| PERF-04 | Phase 2 | Pending |
| SCI-01 | Phase 3 | Pending |
| SCI-02 | Phase 3 | Pending |
| DATA-01 | Phase 4 | Pending |
| DATA-02 | Phase 4 | Pending |

**Coverage:**
- v2.1 requirements: 12 total
- Mapped to phases: 12
- Unmapped: 0 ✓

---
*Requirements defined: 2026-10-23*  
*Last updated: 2026-10-23 after initialization*
