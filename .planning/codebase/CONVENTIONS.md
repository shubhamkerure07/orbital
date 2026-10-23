# Coding Conventions
**Analysis Date:** 2026-10-23

## Naming Patterns

**Files:**
- **React Components**: UpperCamelCase (PascalCase) with `.tsx` extension:
  - `src/components/common/Badge.tsx`
  - `src/components/common/MetricCard.tsx`
  - `src/components/planets/PlanetCard.tsx`
  - `src/components/layout/Navbar.tsx`
  - `src/components/layout/Footer.tsx`
  - `src/components/solar-system/SolarSystemCanvas.tsx`
- **Pages**: UpperCamelCase suffixed with `Page.tsx`:
  - `src/pages/HomePage.tsx`
  - `src/pages/ExplorePage.tsx`
  - `src/pages/MissionsPage.tsx`
  - `src/pages/OrbitalLabPage.tsx`
  - `src/pages/MissionDesignerPage.tsx`
  - `src/pages/NeoObservatoryPage.tsx`
- **Data & Utilities**: Lower camelCase with `.ts` extension:
  - `src/data/planets.ts`
  - `src/data/missions.ts`
  - `src/data/spaceWeather.ts`
  - `src/utils/physics.ts`
  - `src/utils/formatting.ts`
  - `src/services/nasaApi.ts`
- **Tests**: Co-located `<feature>.test.ts`:
  - `src/physics/physics.test.ts`
- **Type Definitions**: Co-located barrel in `src/types/index.ts`
- **Entry Points**: `src/main.tsx` and `src/App.tsx`

**Functions:**
- **Helper & Physics Calculation Functions**: Lower camelCase starting with verb prefix:
  - `calculateCircularVelocity` (`src/physics/index.ts`)
  - `calculateEscapeVelocity` (`src/physics/index.ts`)
  - `calculateOrbitalPeriod` (`src/physics/index.ts`)
  - `calculateHohmannTransfer` (`src/physics/index.ts`)
  - `calculateTsiolkovskyDeltaV` (`src/physics/index.ts`)
  - `formatNumber`, `formatDistance`, `formatTempCelsius` (`src/utils/formatting.ts`)
  - `fetchNasaApod` (`src/services/nasaApi.ts`)
  - `verletStep`, `getAcceleration`, `calculateOrbitalMetrics` (`src/utils/physics.ts`)
- **React Functional Components**: PascalCase:
  - `export const Badge: React.FC<BadgeProps> = ...` (`src/components/common/Badge.tsx`)
  - `export const PlanetCard: React.FC<PlanetCardProps> = ...` (`src/components/planets/PlanetCard.tsx`)
  - `function CameraController(...)` (`src/components/solar-system/SolarSystemCanvas.tsx`)
- **Event Handlers**: Lower camelCase prefixed with `handle`:
  - `handleApplyPreset` (`src/pages/OrbitalLabPage.tsx`)
  - `handleReset` (`src/pages/OrbitalLabPage.tsx`)
  - `handleSelectRocket` (`src/pages/RocketsPage.tsx`)
  - `handleClearFilters` (`src/pages/MissionsPage.tsx`)

**Variables & Constants:**
- **Global Constants & Physical Constants**: Upper SNAKE_CASE:
  - `G_CONST`, `G0_EARTH`, `METERS_PER_AU`, `CELESTIAL_MASSES_KG`, `CELESTIAL_RADII_M` (`src/physics/index.ts`)
  - `SIM_G` (`src/utils/physics.ts`)
  - `PLANETS`, `SUN_DATA` (`src/data/planets.ts`)
  - `MISSIONS` (`src/data/missions.ts`)
  - `ASTEROIDS_DATABASE` (`src/data/asteroids.ts`)
- **State & Local Variables**: Lower camelCase:
  - `selectedMission`, `filterHazardousOnly`, `activePresetId`, `simSpeed`
- **Boolean Flags**: Prefixed with `is`, `has`, or `matches`:
  - `isPaused`, `isCollided`, `isEscaped`, `isLive`, `hasRings`, `isInHabitableZone`, `matchesSearch`

**Types & Interfaces:**
- **Interfaces & Types**: PascalCase describing noun concepts:
  - `PlanetData`, `MissionData`, `RocketData`, `DestinationData`, `OrbitalPreset` (`src/types/index.ts`)
  - `SimulationMetrics`, `BodyState` (`src/utils/physics.ts`)
  - `HohmannTransferResult` (`src/physics/index.ts`)
  - `BadgeProps`, `MetricCardProps`, `PlanetCardProps` (component props)
- **Union Literal Types**: PascalCase:
  - `CelestialType`, `MissionStatus`, `MissionCategory`, `DiscoveryMethod`

## Code Style

**Formatting:**
- **Indentation**: 2 spaces across all `.ts` and `.tsx` files
- **Semicolons**: Always required and consistently present (`src/physics/index.ts`, `src/services/nasaApi.ts`)
- **Quotes**: Single quotes (`'...'`) for JavaScript/TypeScript imports and code strings; double quotes (`"..."`) for HTML/JSX attributes
- **Trailing Commas**: Used on multiline objects, arrays, and interface declarations

**Linting:**
- No external ESLint or Prettier config file present in root
- Compiler-level typechecking and strictness defined in `tsconfig.json`:
  - `"target": "ES2020"`
  - `"strict": true`
  - `"noFallthroughCasesInSwitch": true`
  - `"noUnusedLocals": false`
  - `"noUnusedParameters": false`
  - `"skipLibCheck": true`
  - `"moduleResolution": "bundler"`
- Strict type checking is enforced during production builds (`npm run build` runs `tsc && vite build`).

## Import Organization

**Order:**
1. React core and hook imports (`import React, { useState, useEffect, useRef } from 'react';`)
2. Third-party dependencies:
   - React router: `react-router-dom` (`Routes`, `Route`, `Link`, `useLocation`, `useSearchParams`)
   - Icons: `lucide-react` (`Orbit`, `Rocket`, `Search`, `Compass`, `Radio`)
   - 3D Graphics: `three`, `@react-three/fiber`, `@react-three/drei`
3. Internal domain mathematics & physics layers (`../physics`, `../utils/physics`)
4. Data repositories & static catalogs (`../data/planets`, `../data/missions`)
5. Shared type definitions (`../types`)
6. UI components: common components first, followed by feature/domain components (`../components/common/Badge`, `../components/planets/PlanetCard`)
7. CSS stylesheets (`import './index.css';`)

**Path Aliases:**
- Standard relative imports (`./`, `../`, `../../`). No custom tsconfig path aliases (`@/`) are configured.

## Error Handling

**Patterns:**
- **Physics Core Guard Clauses**:
  - `src/physics/index.ts` validates physical parameters using early guard clauses and throws standard `Error` objects:
  ```typescript
  if (massKg <= 0) throw new Error('Mass must be strictly positive');
  if (radiusM <= 0) throw new Error('Orbital radius must be positive');
  if (semiMajorAxisM <= 0) throw new Error('Semi-major axis must be positive for bound orbit');
  ```
- **Async API Resilience & Fallbacks**:
  - `src/services/nasaApi.ts` wraps network requests with `AbortSignal.timeout(6000)` and catches network or HTTP errors, returning an `ApiFetchResult<T>` structure with `isLive: false` and falling back to local curated data:
  ```typescript
  try {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(6000)
    });
    if (!response.ok) throw new Error(`NASA API returned status ${response.status}`);
    // Return live payload
  } catch (err) {
    return {
      data: DISCOVERIES[0],
      isLive: false,
      error: err instanceof Error ? err.message : 'Network error',
      sourceNote: 'Curated deep-space observation (fallback)'
    };
  }
  ```
- **Testing Guard Traps**:
  - `src/physics/physics.test.ts` encloses each test case in `try ... catch` blocks to record failure reasons without crashing the entire test runner.

## Logging

**Framework:**
- Native `console` only; no external logging libraries.

**Patterns:**
- `console.table(runPhysicsValidationTests())` is used as the test suite reporter in `package.json`.
- Production frontend components remain clean of diagnostic `console.log` statements.

## Comments

**When to Comment:**
- Physics equations and orbital dynamics principles are documented in module headers (`src/physics/index.ts`, `src/utils/physics.ts`).
- Complex algorithms (e.g., Velocity Verlet symplectic integrator, force-directed graph physics) feature inline mechanical explanations.
- Scientific visualization scaling assumptions are documented inline (e.g. `src/pages/ExplorePage.tsx` explaining logarithmic vs. true distance scaling).

**JSDoc/TSDoc:**
- Exported mathematical physics functions use JSDoc annotations detailing formula, parameters, units, and return values:
  ```typescript
  /**
   * Circular orbital velocity at distance r from center of mass M
   * v = √(μ / r)
   * @param massKg Central body mass in kg
   * @param radiusM Distance from center in meters
   * @returns velocity in m/s
   */
  ```

## Function Design

**Size:**
- Atomic components are small and concise (`Badge.tsx`: 33 lines, `MetricCard.tsx`: 38 lines).
- Interactive 3D and canvas controllers encapsulate their own tick loops and resize logic (`SolarSystemCanvas.tsx`: ~210 lines, `KnowledgeGraphCanvas.tsx`: ~390 lines).

**Parameters:**
- Complex prop lists are bundled into explicit interface declarations (`BadgeProps`, `MetricCardProps`, `PlanetCardProps`).
- Default parameter values are provided directly via object destructuring:
  ```typescript
  export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'cyan',
    size = 'sm',
    className = ''
  }) => { ... }
  ```

**Return Values:**
- Explicit return types are provided for domain physics calculations and data parsers (`number`, `HohmannTransferResult`, `ApiFetchResult<T>`).
- React components either use `React.FC<Props>` or infer JSX return types.

## Module Design

**Exports:**
- Named exports are standard across the codebase (`export const Badge`, `export function calculateCircularVelocity`).
- `src/App.tsx` provides both named and default exports for router compatibility.

**Barrel Files:**
- `src/types/index.ts` acts as the global type catalog.
- `src/physics/index.ts` exposes all verified physics constants, equations, and helper formulas.

---

*Convention analysis: 2026-10-23*
