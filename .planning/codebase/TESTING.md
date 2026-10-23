# Testing Patterns
**Analysis Date:** 2026-10-23

## Test Framework

**Runner:**
- Direct TypeScript execution via `tsx` (TypeScript Execute) invoked through `npx --yes tsx`.
- Defined in `package.json` line 10 under `"scripts"`:
  ```json
  "test": "npx --yes tsx -e \"import { runPhysicsValidationTests } from './src/physics/physics.test'; console.table(runPhysicsValidationTests());\""
  ```
- No Jest, Vitest, Mocha, or Cypress dependencies are installed.

**Assertion Library:**
- Custom delta-tolerance assertions comparing calculated values against established CODATA / NASA / JPL benchmarks using native JavaScript `Math.abs(calculated - expected) < tolerance`.

**Run Commands:**
```bash
npm test              # Run physics validation suite via tsx and output results as a console table
npm run build         # Typecheck via tsc and build production bundle via vite
```

## Test File Organization

**Location:**
- Co-located with the implementation file in the module directory:
  - Physics unit test: `src/physics/physics.test.ts` co-located with `src/physics/index.ts`.

**Naming:**
- Matches `<feature>.test.ts` pattern.

**Structure:**
```
src/
├── physics/
│   ├── index.ts              # Core scientific equations & celestial constants
│   └── physics.test.ts       # Scientific validation test suite
```

## Test Structure

**Suite Organization:**
```typescript
import {
  calculateCircularVelocity,
  calculateEscapeVelocity,
  calculateOrbitalPeriod,
  calculateHohmannTransfer,
  calculateTsiolkovskyDeltaV,
  calculateHillSphereRadius,
  CELESTIAL_MASSES_KG,
  CELESTIAL_RADII_M,
  METERS_PER_AU
} from './index';

export function runPhysicsValidationTests(): { name: string; passed: boolean; details: string }[] {
  const tests: { name: string; passed: boolean; details: string }[] = [];

  // Test 1: Low Earth Orbit Speed (300 km altitude)
  try {
    const rLeo = CELESTIAL_RADII_M.EARTH + 300000;
    const vLeo = calculateCircularVelocity(CELESTIAL_MASSES_KG.EARTH, rLeo);
    // Expected ~ 7726 m/s
    const passed = Math.abs(vLeo - 7726) < 20;
    tests.push({
      name: 'Low Earth Orbit (300km) Circular Velocity',
      passed,
      details: `Calculated: ${(vLeo / 1000).toFixed(2)} km/s (Expected: ~7.73 km/s)`
    });
  } catch (err: any) {
    tests.push({ name: 'LEO Circular Velocity', passed: false, details: err.message });
  }

  // ... additional tests ...

  return tests;
}
```

**Patterns:**
- **Execution**: The suite returns an array of result objects containing `{ name, passed, details }`.
- **Display**: Output is rendered in terminal tabular format via `console.table()`.
- **Fault Tolerance**: Each validation case is wrapped in an individual `try ... catch` block, preventing a single equation failure from halting remaining tests.
- **Assertion Tolerance**:
  - Low Earth Orbit velocity: `Math.abs(vLeo - 7726) < 20` m/s.
  - Surface escape speed: `Math.abs(vEsc - 11186) < 30` m/s.
  - Keplerian period: `Math.abs(periodDays - 365.25) < 0.5` days.
  - Hohmann transfer duration: `Math.abs(hohmann.transferDurationDays - 258.8) < 3` days.
  - Tsiolkovsky delta-V: `Math.abs(deltaV - 10161) < 20` m/s.
  - Hill sphere radius: `Math.abs(rHillKm - 1496500) < 50000` km.

## Mocking

**Framework:**
- None. No mocking libraries (Vitest, Jest mock, Sinon) are used.

**Patterns:**
- Real physical constants and pure mathematical equations are tested without stubs or spies.

**What to Mock (Future Unit/Integration Tests):**
- Network requests in `src/services/nasaApi.ts` (`globalThis.fetch` or Mock Service Worker for NASA APOD API).
- Canvas / WebGL context methods in `@react-three/fiber` and custom Canvas components (`HTMLCanvasElement.getContext('2d')`).
- `window.scrollTo` calls in `ScrollToTop` (`src/App.tsx`).

**What NOT to Mock:**
- Mathematical algorithms and physics equations (`src/physics/index.ts`, `src/utils/physics.ts`).
- Static datasets and celestial catalogs (`src/data/*.ts`).
- String and unit formatting logic (`src/utils/formatting.ts`).

## Fixtures and Factories

**Test Data:**
- Astronomical constants in `src/physics/index.ts` serve as ground-truth test fixtures:
  - `CELESTIAL_MASSES_KG.EARTH` = `5.9722e24` kg
  - `CELESTIAL_RADII_M.EARTH` = `6371000` m
  - `METERS_PER_AU` = `149597870700` m
  - `G0_EARTH` = `9.80665` m/s²

**Location:**
- Constants are defined and exported directly from `src/physics/index.ts`.

## Coverage

**Requirements:**
- No test coverage thresholds or coverage tools (c8, istanbul, nyc) are enforced in `package.json`.

**View Coverage:**
- Not currently configured.

## Test Types

**Unit Tests:**
- Focuses entirely on scientific precision testing for astrodynamics and orbital mechanics (`src/physics/physics.test.ts`).
- Validates:
  1. Circular orbital velocity formula.
  2. Escape velocity calculations.
  3. Kepler's third law heliocentric orbital periods.
  4. Co-planar Hohmann transfer orbit duration and delta-V.
  5. Tsiolkovsky rocket equation with multi-stage propellants.
  6. Gravitational Hill sphere dominance radius.

**Integration Tests:**
- Not currently implemented.
- Recommended targets:
  - `src/services/nasaApi.ts`: Testing API success and offline fallback handling.
  - `src/utils/physics.ts`: Testing Velocity Verlet integration trajectory conservation over multiple time steps.

**E2E Tests:**
- Not configured. No Cypress, Playwright, or Puppeteer setup.

## Common Patterns

**Async Testing:**
- Not currently used in the test suite. When testing async services like `fetchNasaApod()`, use standard `async / await`:
  ```typescript
  const result = await fetchNasaApod();
  assert(result.data !== null);
  ```

**Error Testing:**
- Current pattern catches exceptions and records failure state:
  ```typescript
  try {
    calculateCircularVelocity(-1, 100);
    tests.push({ name: 'Negative mass validation', passed: false, details: 'Expected error not thrown' });
  } catch (err: any) {
    tests.push({ name: 'Negative mass validation', passed: true, details: err.message });
  }
  ```

---

*Testing analysis: 2026-10-23*
