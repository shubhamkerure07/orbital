# Codebase Structure

**Analysis Date:** 2026-10-23

## Directory Layout

```
c language/
├── .git/                   # Git source control repository
├── .planning/              # Project planning, specs, and architectural documentation
│   └── codebase/           # Codebase analysis documents
├── public/                 # Static assets served as-is (favicons, icons)
├── src/                    # Primary application source code
│   ├── components/         # Modular React UI components
│   │   ├── common/         # Atomic UI building blocks (Badge, MetricCard, Spinner, EmptyState)
│   │   ├── destinations/   # Destination monographs & exploration target cards
│   │   ├── discovery/      # APOD viewer and astronomical milestone components
│   │   ├── knowledge/      # Force-directed interactive knowledge graph canvas
│   │   ├── layout/         # Application shell (Navbar, Footer, GlobalSearchModal)
│   │   ├── missions/       # Flight operations cards and detail modal dialogs
│   │   ├── orbital-lab/    # Symplectic 2D orbital mechanics canvas & controls
│   │   ├── planets/        # Planet cards, ephemeris overview, and comparative tool
│   │   ├── rockets/        # Rocket staging inspector and ascent flight simulator
│   │   └── solar-system/   # 3D Three.js/R3F planetarium & 2D canvas fallback
│   ├── data/               # Curated astronomical databases & static telemetry records
│   ├── pages/              # 16 Route-level page views mapped in React Router
│   ├── physics/            # Authoritative SI physics library & validation tests
│   ├── services/           # External API integrations (NASA APOD client)
│   ├── types/              # TypeScript interface definitions & domain models
│   ├── utils/              # Helper utilities (formatting, simulation integrator)
│   ├── App.tsx             # Root application component with routing table
│   ├── index.css           # Global Tailwind directives & NASA HUD design tokens
│   └── main.tsx            # Application bootstrapping & DOM mount
├── index.html              # HTML entry point with Google Fonts preconnects
├── package.json            # Node.js dependencies, scripts, and build metadata
├── postcss.config.js       # PostCSS plugins configuration (Tailwind, Autoprefixer)
├── tailwind.config.js      # Tailwind CSS design system tokens (space palette, Outfit font)
├── tsconfig.json           # TypeScript compiler configuration (ES2020, React JSX)
├── tsconfig.node.json      # Node-specific TypeScript config for Vite
├── vercel.json             # Vercel SPA routing rewrites configuration
└── vite.config.ts          # Vite build tool configuration & manual chunking
```

## Directory Purposes

**`src/physics/`:**
- Purpose: Authoritative, SI-unit mathematical astrodynamics engine and validation suite.
- Contains: Pure calculation functions, astrophysical constants, and validation runner.
- Key files: `src/physics/index.ts`, `src/physics/physics.test.ts`.

**`src/data/`:**
- Purpose: Static, peer-reviewed astronomical databases and telemetry catalogs.
- Contains: TypeScript data files with typed domain entities and scientific citations.
- Key files:
  - `src/data/planets.ts`: Solar system bodies and Sun physical parameters.
  - `src/data/missions.ts`: Historic and active NASA/ESA/ISRO flight operations.
  - `src/data/rockets.ts`: Launch vehicles, staging configurations, and flight profiles.
  - `src/data/destinations.ts`: Planetary destinations and habitability metrics.
  - `src/data/asteroids.ts`: Near-Earth asteroids, close approaches, and Torino ratings.
  - `src/data/exoplanets.ts`: NASA Exoplanet Archive confirmed worlds and spectroscopy data.
  - `src/data/spaceWeather.ts`: NOAA SWPC geomagnetic $K_p$, solar wind, and flare benchmarks.
  - `src/data/knowledgeGraph.ts`: Cosmic ontology nodes and relational directed edges.
  - `src/data/discoveries.ts`: Astronomical breakthroughs and NASA APOD archive records.

**`src/pages/`:**
- Purpose: Route-level page views mapped directly to application URLs.
- Contains: React page components that compose domain components and handle local page state.
- Key files:
  - `src/pages/HomePage.tsx`: Mission Control overview with HUD cards and hero banner.
  - `src/pages/ExplorePage.tsx`: Interactive 3D planetarium and planetary comparative analysis.
  - `src/pages/PlanetDetailPage.tsx`: Detailed monograph for individual planets.
  - `src/pages/MissionsPage.tsx`: Flight operations manifest with search, status filters, and detail dialog.
  - `src/pages/RocketsPage.tsx`: Launch vehicle staging schematics and ascent sequencer.
  - `src/pages/DestinationsPage.tsx`: Astrobiology target exploration dossiers.
  - `src/pages/OrbitalLabPage.tsx`: Symplectic numerical 2D orbital sandbox.
  - `src/pages/DiscoverPage.tsx`: NASA APOD live component and discovery catalog.
  - `src/pages/NeoObservatoryPage.tsx`: Planetary defense, asteroid tracking, and close approach charts.
  - `src/pages/SpaceWeatherPage.tsx`: NOAA SWPC solar wind, $K_p$ index, and aurora visibility calculator.
  - `src/pages/ExoplanetsPage.tsx`: Alien worlds catalog, transit photometry dips, and JWST spectroscopy.
  - `src/pages/MissionDesignerPage.tsx`: Hohmann transfer trajectory solver and Tsiolkovsky staging calculator.
  - `src/pages/KnowledgeGraphPage.tsx`: Force-directed cosmic knowledge ontology canvas.
  - `src/pages/IntelligencePage.tsx`: Astrodynamics, relativity, and propulsion scientific treatises with LaTeX formulas.
  - `src/pages/AboutPage.tsx`: Mission statement, data sources, and architecture philosophy.
  - `src/pages/NotFoundPage.tsx`: 404 recovery view.

**`src/components/solar-system/`:**
- Purpose: WebGL 3D planetarium rendering using Three.js / React Three Fiber, with 2D fallback.
- Contains: R3F Canvas container, meshes, orbit rings, lighting, controls, and canvas fallback.
- Key files: `SolarSystemCanvas.tsx`, `PlanetMesh.tsx`, `SunMesh.tsx`, `OrbitRing.tsx`, `SolarFallback2D.tsx`.

**`src/components/layout/`:**
- Purpose: Global layout frame and persistent navigation.
- Contains: Desktop/mobile navbar, live UTC clock ribbon, footer, and search modal.
- Key files: `Navbar.tsx`, `Footer.tsx`, `GlobalSearchModal.tsx`.

**`src/components/common/`:**
- Purpose: Reusable UI primitives and design system elements.
- Contains: Badges, metric cards, spinners, empty states.
- Key files: `Badge.tsx`, `MetricCard.tsx`, `LoadingSpinner.tsx`, `EmptyState.tsx`.

**`src/utils/`:**
- Purpose: Shared utility functions and numerical simulation logic.
- Contains: Symplectic Velocity Verlet integrator, string and number formatting helpers.
- Key files: `src/utils/physics.ts`, `src/utils/formatting.ts`.

**`src/services/`:**
- Purpose: External network communication with third-party APIs.
- Contains: API clients with error handling and fallback data.
- Key files: `src/services/nasaApi.ts`.

**`src/types/`:**
- Purpose: Centralized TypeScript type definitions.
- Contains: Interfaces for celestial bodies, missions, rockets, orbits, and discoveries.
- Key files: `src/types/index.ts`.

## Key File Locations

**Entry Points:**
- `index.html`: Web document root with Google Fonts (Outfit, Inter, JetBrains Mono).
- `src/main.tsx`: React application DOM mount and provider bootstrapping.
- `src/App.tsx`: Central route table with scroll restoration.
- `src/physics/physics.test.ts`: Automated physics test suite entry point.

**Configuration:**
- `package.json`: Project manifest, scripts, and dependency definitions.
- `vite.config.ts`: Vite bundler configuration with manual code splitting chunks (`three-vendor`, `react-vendor`, `ui-vendor`).
- `tailwind.config.js`: Custom space color palettes (`space`, `holo`, `nasa`, `gold`), typography, and animations.
- `tsconfig.json`: TypeScript compiler options (`ES2020`, `bundler` resolution, strict type checking).
- `vercel.json`: Single Page Application rewrite rules ensuring deep client-side routes resolve to `index.html`.

**Core Logic:**
- `src/physics/index.ts`: Mathematical physics engine.
- `src/utils/physics.ts`: Velocity Verlet numerical integration step and trajectory calculations.
- `src/components/layout/GlobalSearchModal.tsx`: Real-time multi-database search indexing.

## Naming Conventions

**Files:**
- React Components & Pages: PascalCase (`PlanetCard.tsx`, `ExplorePage.tsx`, `SolarSystemCanvas.tsx`).
- Utilities, Services & Datasets: camelCase (`formatting.ts`, `nasaApi.ts`, `planets.ts`, `spaceWeather.ts`).
- Types & Modules: camelCase or `index.ts` (`index.ts`, `physics.ts`).

**Directories:**
- Feature/Component Folders: kebab-case (`solar-system`, `orbital-lab`, `common`, `layout`).

## Where to Add New Code

**Adding a New Page or Mission Control System:**
1. Create page component in `src/pages/NewFeaturePage.tsx`.
2. Register route in `src/App.tsx` within `<Routes>`.
3. Add navigation link or dropdown entry in `src/components/layout/Navbar.tsx` (`navGroups`).
4. Register telemetry route and keywords in `src/components/layout/GlobalSearchModal.tsx` (`coreSystems`).
5. Add footer link in `src/components/layout/Footer.tsx`.

**Adding a New Astronomical Dataset:**
1. Define TypeScript interface in `src/types/index.ts` or co-locate with data file if self-contained.
2. Create dataset file in `src/data/newDataset.ts` exporting typed array.
3. Add dataset search indexing in `src/components/layout/GlobalSearchModal.tsx`.

**Adding New Scientific Formulas or Physics Tests:**
1. Add pure mathematical function and SI constants to `src/physics/index.ts`.
2. Add validation unit test case to `src/physics/physics.test.ts` with known published astrophysical values.
3. Run `npm test` to verify zero regression.

**Adding New Reusable UI Widgets:**
- Primitive or generic widgets: `src/components/common/`.
- Domain-specific components: `src/components/<domain>/`.

## Special Directories

**`src/physics/`:**
- Purpose: Zero-dependency SI scientific physics calculations.
- Generated: No.
- Committed: Yes.

**`src/data/`:**
- Purpose: Authoritative static scientific catalogs providing deterministic in-memory data.
- Generated: No.
- Committed: Yes.

---

*Structure analysis: 2026-10-23*
