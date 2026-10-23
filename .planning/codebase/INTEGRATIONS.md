# External Integrations
**Analysis Date:** 2026-10-23

## APIs & External Services

**Scientific & Astronomical Data (Curated & Pre-compiled):**
- NASA Jet Propulsion Laboratory (JPL) Horizons & CNEOS - Planetary ephemerides, orbital parameters, and Near-Earth Asteroid radar data
  - SDK/Client: None (pre-compiled into `src/data/planets.ts` and `src/data/asteroids.ts`)
  - Auth: None
- NOAA Space Weather Prediction Center (SWPC) & NASA DONKI - Planetary Kp indices, solar wind plasma velocities, IMF Bz coupling, and coronal mass ejection models
  - SDK/Client: None (modeled into `src/data/spaceWeather.ts`)
  - Auth: None
- NASA Exoplanet Archive (Caltech/IPAC) - Confirmed exoplanet physical characteristics, host star parameters, and discovery facilities
  - SDK/Client: None (modeled into `src/data/exoplanets.ts`)
  - Auth: None
- Space Telescope Science Institute (STScI) - James Webb Space Telescope transmission spectroscopy telemetry datasets
  - SDK/Client: None (modeled into `src/data/exoplanets.ts`)
  - Auth: None

**Web Fonts & Assets:**
- Google Fonts CDN - Serves typography assets (`Outfit`, `Inter`, and `JetBrains Mono`)
  - SDK/Client: HTML `<link rel="stylesheet">` preconnected in `index.html`
  - Auth: None (Public CDN)

## Data Storage

**Databases:**
- None (All data is bundled statically in `src/data/` as TypeScript data structures)

**File Storage:**
- Local filesystem only (`public/` assets and bundled static images/SVGs)

**Caching:**
- Browser HTTP Cache & Vite hashed bundle assets (`dist/assets/*`)
- Browser `localStorage`:
  - Key `orbital_saved_missions` in `src/pages/MissionDesignerPage.tsx` persists user-designed interplanetary trajectories and rocket staging profiles across browser sessions

## Authentication & Identity

**Auth Provider:**
- None (Public Open-Access Scientific Simulator; no authentication required)

## Monitoring & Observability

**Error Tracking:**
- None (No third-party error monitoring like Sentry or Datadog installed)

**Logs:**
- Browser Developer Console (`console.error`, `console.warn`) for runtime logging

## CI/CD & Deployment

**Hosting:**
- Vercel (`orbital-nu-gules.vercel.app`)
  - Configuration: `vercel.json` provides single-page application (SPA) client rewrites to `/index.html`

**CI Pipeline:**
- Vercel automated GitHub deployment pipeline triggered on repository push to `shubhamkerure07/orbital`
- Physics validation test suite executable via `npm test` (`src/physics/physics.test.ts`)

## Environment Configuration

**Required env vars:**
- None (Fully functional client-side application with zero required runtime environment variables)

**Secrets location:**
- No secrets required or stored; `.gitignore` contains defensive rules for `.env` and `.env.*`

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

---

*Integration audit: 2026-10-23*
