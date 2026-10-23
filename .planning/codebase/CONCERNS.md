# Codebase Concerns

**Analysis Date:** 2026-10-23

## Tech Debt

**Canvas Dimensions Mutated in 60 FPS Render Loops:**
- Issue: In multiple canvas components, `canvas.width` and `canvas.height` are reassigned on every single animation frame inside `requestAnimationFrame` loops (e.g. `canvas.width = canvas.parentElement?.clientWidth`). In HTML5 2D Canvas, reassigning `.width` or `.height` completely wipes the canvas context state, resets font and stroke styles, and triggers forced DOM reflows and browser repaint cycles 60 times per second.
- Files: `src/components/orbital-lab/OrbitalCanvas.tsx`, `src/components/knowledge/KnowledgeGraphCanvas.tsx`, `src/components/solar-system/SolarFallback2D.tsx`
- Impact: Continuous layout thrashing, elevated CPU consumption, battery drain on mobile devices, and potential frame rate stutter.
- Fix approach: Decouple canvas resizing from the draw loop. Attach a `ResizeObserver` or window `resize` debounced listener to update dimensions only when container dimensions actually change.

**High-Frequency React State Updates Inside requestAnimationFrame:**
- Issue: In the orbital simulator, `onMetricsUpdate(metrics)` is dispatched on every single animation frame inside the 60 FPS loop, causing `OrbitalLabPage` to update React state at 60 Hz.
- Files: `src/components/orbital-lab/OrbitalCanvas.tsx`, `src/pages/OrbitalLabPage.tsx`
- Impact: Forces the entire `OrbitalLabPage` component hierarchy (control panels, explanation treatises, metric cards) to re-render 60 times a second. Can cause slider dragging input lag, dropped frames, and excessive React reconciliation overhead.
- Fix approach: Throttle `onMetricsUpdate` to 5–10 Hz (every 100–200ms) or use direct DOM refs / lightweight mutable stores for telemetry values that update at 60 FPS.

**O(N) Shift Operations on Trail History Buffer:**
- Issue: Spacecraft orbital trails are maintained via an array ref where `trailRef.current.shift()` is called every frame when the length exceeds 500 points.
- Files: `src/components/orbital-lab/OrbitalCanvas.tsx`
- Impact: Array shift is an O(N) operation in JavaScript that re-indexes all 500 array elements 60 times per second, generating avoidable garbage collection pressure.
- Fix approach: Implement a fixed-size ring buffer with head/tail pointers or a `Float32Array` circular buffer.

**Unbounded LocalStorage Growth Without Schema Validation:**
- Issue: Interplanetary flight architectures in `MissionDesignerPage` are directly written to and read from `localStorage.getItem('orbital_saved_missions')` via `JSON.parse` without schema validation, entry count caps, or storage quota handling.
- Files: `src/pages/MissionDesignerPage.tsx`
- Impact: If invalid or malformed data enters localStorage, or if the data format evolves, the page will fail silently or crash. Repeatedly saving architectures can throw uncaught `QuotaExceededError`.
- Fix approach: Introduce a schema validation layer (e.g., Zod or type guards), cap saved missions to a maximum limit (e.g., 20), and wrap `localStorage` access in a try/catch block with quota error recovery.

**Hardcoded NASA DEMO_KEY Rate Limit:**
- Issue: The APOD service hardcodes `api_key=DEMO_KEY` in the fetch URL rather than reading an environment variable.
- Files: `src/services/nasaApi.ts`
- Impact: The NASA `DEMO_KEY` has a strict ceiling of 30 requests/hour and 50 requests/day per IP. Users frequently hit HTTP 429 rate limit fallbacks.
- Fix approach: Support `import.meta.env.VITE_NASA_API_KEY` with fallback to `DEMO_KEY`, and allow users to configure their own API key via an application settings panel.

## Known Bugs

**3D Planet Tracking Lerps to Static Offset Instead of Orbital Position:**
- Symptoms: When a user clicks to inspect a planet in the 3D Solar System view, the camera focuses on an empty point along the X-axis rather than following the moving planet.
- Files: `src/components/solar-system/SolarSystemCanvas.tsx`, `src/components/solar-system/PlanetMesh.tsx`
- Trigger: Select any planet (e.g., Earth, Mars, Jupiter) while the simulation is running.
- Cause: In `PlanetMesh.tsx`, planets orbit by rotating their parent `orbitGroupRef` around the Y-axis. In `SolarSystemCanvas.tsx`, `CameraController` computes `desiredCamPos` using fixed coordinates `(selectedPlanet.orbitRadiusVisual, 0, 0)` without taking into account the live rotation angle. Furthermore, `targetPos` is allocated on line 39 but never applied to `OrbitControls.target`.
- Workaround: Pause simulation at initial epoch before inspecting planets, or manually drag OrbitControls.
- Fix approach: Read the live world coordinates via `planetMeshRef.current.getWorldPosition(targetVec)` each frame, interpolate `camera.position` relative to the live target, and update `controlsRef.current.target`.

**Zoom In and Zoom Out Buttons Reset Camera Instead of Dollying:**
- Symptoms: Clicking the Zoom In (+) or Zoom Out (-) buttons in the solar system controls resets the camera position and orientation back to `[0, 45, 65]` instead of zooming in/out.
- Files: `src/components/solar-system/SolarSystemCanvas.tsx`
- Trigger: Click the zoom buttons on the bottom control HUD.
- Cause: `handleZoomIn` and `handleZoomOut` alter `resetTrigger` (`setResetTrigger(prev => prev + 0.001)`). `CameraController` listens to `resetTrigger` in a `useEffect` that unconditionally resets `camera.position.set(0, 45, 65)`.
- Fix approach: Separate camera reset triggers from zoom controls. Use `controlsRef.current.dollyIn()` / `dollyOut()` or adjust `camera.position` along the camera forward vector.

**Lerp and OrbitControls Jitter Conflict:**
- Symptoms: When a planet is selected, user attempts to manually rotate or pan the camera cause intense visual stutter and rubber-banding.
- Files: `src/components/solar-system/SolarSystemCanvas.tsx`
- Trigger: User drags mouse to rotate camera while a planet is selected.
- Cause: `useFrame` continuously forces camera position towards `desiredCamPos` every frame, fighting the user's mouse drag input handled by `OrbitControls`.
- Fix approach: Stop camera interpolation once the distance between camera and target is beneath a small threshold ($\epsilon < 0.1$), handing full control back to `OrbitControls`.

**Silent Earth Fallback on Invalid Planet Detail Route:**
- Symptoms: Navigating to an invalid planet URL (e.g. `/explore/unknown-planet`) displays Earth's data under the wrong route URL without error indication, and previous/next navigation loops incorrectly.
- Files: `src/pages/PlanetDetailPage.tsx`
- Trigger: Direct navigation to `/explore/:planetId` with a non-existent ID.
- Fix approach: Check `if (planetIndex === -1)` and redirect to `<NotFoundPage />` or navigate to `/explore`.

## Security Considerations

**Unsandboxed Video iframes in NASA APOD:**
- Risk: When NASA APOD returns a video URL, it is rendered in an `<iframe>` with `allowFullScreen` but without `sandbox` attributes or domain whitelisting. If an API payload returns an unexpected or malicious URL, it could execute arbitrary JavaScript.
- Files: `src/components/discovery/ApodSection.tsx`, `src/services/nasaApi.ts`
- Current mitigation: Basic browser same-origin policy.
- Recommendations: Validate that `item.url` matches verified domains (`youtube.com`, `youtube-nocookie.com`, `player.vimeo.com`), and apply strict iframe sandbox attributes: `sandbox="allow-scripts allow-same-origin allow-presentation"`.

**Missing Production Security Headers:**
- Risk: `vercel.json` provides only client-side SPA rewrites without configuring HTTP response headers. The application lacks protections against MIME-sniffing, clickjacking, and cross-site scripting.
- Files: `vercel.json`
- Current mitigation: None configured at the host level.
- Recommendations: Add HTTP security headers in `vercel.json`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.

**Arithmetic Overflow in Rocket Propellant Calculation:**
- Risk: In `calculateRequiredPropellantMass`, the formula calculates `dryMassKg * (Math.exp(deltaV / (isp * g0)) - 1)`. If delta-V is large and specific impulse is low, `Math.exp()` exceeds IEEE 754 float limits ($> 10^{308}$) and yields `Infinity` or `NaN`.
- Files: `src/physics/index.ts`, `src/pages/MissionDesignerPage.tsx`
- Current mitigation: Basic check for negative dry mass.
- Recommendations: Validate exponent value before computing `Math.exp()`, and assert `Number.isFinite(result)` before returning.

## Performance Bottlenecks

**Three.js Vector Allocations in 60 FPS Camera Frame:**
- Problem: `new THREE.Vector3()` is instantiated twice every single animation frame inside `useFrame`.
- Files: `src/components/solar-system/SolarSystemCanvas.tsx`
- Cause: Local variables allocated inside the frame hook rather than reused.
- Improvement path: Allocate reusable vector instances in a `useRef` outside the loop (`targetVec.current.set(...)`).

**Continuous 450-Step Trajectory Re-computation:**
- Problem: `predictOrbitPath()` executes a 450-step numerical integration loop every animation frame inside `render()`, even when simulation parameters remain unchanged.
- Files: `src/components/orbital-lab/OrbitalCanvas.tsx`, `src/utils/physics.ts`
- Cause: Trajectory prediction invoked directly inside the canvas draw loop.
- Improvement path: Pre-compute the analytical trajectory points once when mass/velocity/radius change, storing them in a ref.

**Linear Search in Knowledge Graph Physics Ticks:**
- Problem: The force-directed graph loop performs multiple `Array.find()` and `Array.some()` passes across visible nodes and edges every frame ($O(E \cdot N)$ per tick).
- Files: `src/components/knowledge/KnowledgeGraphCanvas.tsx`
- Cause: Nodes stored as a flat array rather than an indexed Map.
- Improvement path: Maintain a `Map<string, SimNode>` and an adjacency list to achieve $O(1)$ lookups during spring and repulsion force calculations.

**Heavy 3D Bundle Without Route-Level Code Splitting:**
- Problem: `@react-three/fiber`, `@react-three/drei`, and `three` are bundled together into a vendor chunk exceeding 800 KB, causing Vite to trigger bundle size warnings.
- Files: `vite.config.ts`, `src/App.tsx`
- Cause: Static imports of 3D pages in `App.tsx` mean initial load of text-only pages (`/missions`, `/about`, `/rockets`) still downloads the entire 3D Three.js bundle.
- Improvement path: Use `React.lazy()` for `ExplorePage`, `SolarSystemCanvas`, and 3D submodules.

## Fragile Areas

**Static Mock Data Presented as Live Aerospace Telemetry:**
- Files: `src/pages/SpaceWeatherPage.tsx`, `src/pages/NeoObservatoryPage.tsx`, `src/pages/ExoplanetsPage.tsx`
- Why fragile: Headings and telemetry badges declare "Real-Time Telemetry", "34,850+ Tracked NEOs Updated Daily by JPL", and "3-Hour Cadence Kp Index", but the data is completely static hardcoded JSON. Users testing the application with expectations of real live solar flares or NEO close approaches will observe stale numbers.
- Safe modification: Add prominent UI indicators showing whether data is live, cached, or reference historical telemetry, and integrate real NOAA SWPC / NASA JPL SSD REST API clients.

**Unrendered Raw LaTeX in Scientific Intelligence:**
- Files: `src/pages/IntelligencePage.tsx`
- Why fragile: Mathematical formulas are stored in raw LaTeX (e.g. `r_{L1,L2} \approx R \cdot \sqrt[3]{\frac{m_2}{3 m_1}}`, `v_\infty = \sqrt{v_{peri}^2 - v_{esc}^2}`) and displayed inside a monospace `<div>`. Without a LaTeX renderer, users see unformatted markup strings with backslashes.
- Safe modification: Integrate `katex` / `react-katex` to render formatted mathematical typography.

## Scaling Limits

**Client-Side In-Memory Search:**
- Current capacity: Searches ~50 items across static arrays.
- Files: `src/components/layout/GlobalSearchModal.tsx`
- Limit: Works smoothly for 50 items. If connected to full catalogs (34,000+ NEOs or 5,600+ exoplanets), client-side linear array filtering will block the main UI thread.
- Scaling path: Introduce client-side indexed search (e.g. MiniSearch/Fuse.js in a Web Worker) or backend search endpoints with pagination.

**Fixed-Coordinate Canvas Layouts on Small Viewports:**
- Current capacity: Designed for desktop displays (>800px).
- Files: `src/components/knowledge/KnowledgeGraphCanvas.tsx`, `src/components/solar-system/SolarFallback2D.tsx`
- Limit: Initial node positions are hardcoded with center (400, 300) and fixed radius 240px. On mobile devices (<400px), nodes are shoved against boundary walls and overlap.
- Scaling path: Compute initial radial layout proportionally to `canvas.width` and `canvas.height`.

## Dependencies at Risk

**React Three Fiber / Three.js Compatibility:**
- Risk: React 18 is currently paired with `@react-three/fiber` 8.17. Upgrading to React 19 will trigger peer dependency conflicts until R3F v9 is adopted. Three.js (0.169.0) frequently introduces breaking API modifications between minor versions.
- Files: `package.json`
- Impact: Unchecked dependency updates can break 3D canvas rendering.
- Migration plan: Strictly pin Three.js and R3F versions; thoroughly test canvas shaders and camera controllers prior to updating.

**Non-Standard Test Invocation Script:**
- Risk: `"test": "npx --yes tsx -e ..."` relies on an ad-hoc `tsx` one-liner that downloads dependencies on-the-fly and lacks standard test assertion features, test coverage reporting, and watch mode.
- Files: `package.json`
- Impact: Inability to run standard test suites in CI without network access, and absence of component/unit testing framework.
- Migration plan: Install `vitest` as a devDependency with a dedicated `vitest.config.ts`.

## Missing Critical Features

**Lack of True Keplerian Elliptical Orbits in 3D Planetarium:**
- Problem: The 3D solar system renders circular concentric orbits centered on the Sun. Planetary eccentricity (e.g., Mercury $e = 0.2056$, Mars $e = 0.0934$) and orbital inclination are simplified away.
- Blocks: Realistic astrodynamics simulation and accurate celestial alignment display.

**Synodic Launch Window Calculation (Porkchop Plots):**
- Problem: `MissionDesignerPage` calculates Hohmann transfers assuming coplanar circular orbits without synodic launch window constraints or planetary phase angles.
- Blocks: True mission planning, which requires scheduling launches around planetary alignments (e.g. Earth-Mars 26-month windows).

**Application Settings & Custom API Key Storage:**
- Problem: No UI for users to store their own NASA or NOAA API keys, leaving all requests constrained by the public rate limits.
- Blocks: Reliable live data exploration.

## Test Coverage Gaps

**Zero Component and Page Unit Tests:**
- What's not tested: All 16 React pages and 20+ components (`App.tsx`, `ExplorePage.tsx`, `OrbitalLabPage.tsx`, `MissionDesignerPage.tsx`, etc.).
- Files: `src/pages/*`, `src/components/*`
- Risk: Regressions in routing, modal state, filter logic, and telemetry calculations can be introduced without detection.
- Priority: High

**WebGL 3D Canvas Fallback & Lifecycle:**
- What's not tested: WebGL context creation failure, 2D fallback mounting, canvas resize behavior, camera lerping.
- Files: `src/components/solar-system/*`
- Risk: Black screens or rendering crashes on unsupported mobile GPUs.
- Priority: High

**Physics Engine Edge Case Validation:**
- What's not tested: Zero mass inputs, negative radii, division by zero at origin ($r \to 0$), parabolic and hyperbolic trajectories in `src/utils/physics.ts`.
- Files: `src/utils/physics.ts`, `src/physics/index.ts`
- Risk: Numerical explosions leading to `NaN` coordinates and disappearing canvas bodies.
- Priority: Medium

**NASA API Error & Timeout Scenarios:**
- What's not tested: Network timeouts, 429 rate limit responses, non-JSON error payloads, video vs image media types in `fetchNasaApod()`.
- Files: `src/services/nasaApi.ts`
- Risk: Unhandled promise rejections or broken layout when NASA APOD fails.
- Priority: Medium

---

*Concerns audit: 2026-10-23*
