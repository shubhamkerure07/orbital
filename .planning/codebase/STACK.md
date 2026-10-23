# Technology Stack
**Analysis Date:** 2026-10-23

## Languages

**Primary:**
- TypeScript 5.6.3 - Application codebase (`src/**/*.{ts,tsx}`), physics simulation engine, UI components, and static datasets
- JavaScript (ES2020 / ESNext) - Bundled output, build configuration (`vite.config.ts`, `tailwind.config.js`, `postcss.config.js`)

**Secondary:**
- HTML5 - Application root shell (`index.html`)
- CSS3 - Tailwind directives and custom HUD styling tokens (`src/index.css`)

## Runtime

**Environment:**
- Browser ECMAScript 2020+ environment with WebGL 2.0 / Canvas API support (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge)
- Node.js 18.x or higher (development server and build-time compilation)

**Package Manager:**
- npm (lockfile version 3)
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React 18.3.1 - Declarative component UI library (`src/main.tsx`, `src/App.tsx`, `src/components/*`)
- React DOM 18.3.1 - DOM mounting and rendering (`src/main.tsx`)
- React Router DOM 6.27.0 - Client-side single-page routing and navigation (`src/App.tsx`, `src/main.tsx`)

**3D & Visualization:**
- Three.js 0.169.0 - Low-level WebGL 3D rendering engine (`src/components/solar-system/SolarSystemCanvas.tsx`)
- `@react-three/fiber` 8.17.10 - Declarative React wrapper for Three.js scene graphs
- `@react-three/drei` 9.114.0 - OrbitControls, Stars, and camera helpers for R3F scenes

**Testing:**
- Custom TypeScript Physics Test Harness - Automated numerical validation suite for Keplerian, Newtonian, and Tsiolkovsky calculations (`src/physics/physics.test.ts`) executed via `npx --yes tsx`

**Build/Dev:**
- Vite 5.4.9 - Next-generation frontend tooling, dev server with HMR, and production bundler (`vite.config.ts`)
- `@vitejs/plugin-react` 4.3.3 - Vite React plugin providing JSX Fast Refresh
- TypeScript Compiler (`tsc`) 5.6.3 - Static type checking prior to build (`tsconfig.json`, `tsconfig.node.json`)
- PostCSS 8.4.47 & Autoprefixer 10.4.20 - CSS transformations and vendor prefixing (`postcss.config.js`)
- Tailwind CSS 3.4.14 - Utility-first styling framework (`tailwind.config.js`)

## Key Dependencies

**Critical:**
- `three` 0.169.0 - Powering 3D planetary rendering, materials, lights, and orbit cameras
- `@react-three/fiber` 8.17.10 - Bridges Three.js lifecycle with React component tree
- `@react-three/drei` 9.114.0 - OrbitControls and canvas helpers for 3D interactions
- `react-router-dom` 6.27.0 - Handles multi-view routing across 10 mission control observatory tabs
- `framer-motion` 11.11.9 - UI animations and view transitions

**Infrastructure & Utilities:**
- `lucide-react` 0.453.0 - NASA HUD telemetry icon set
- `clsx` 2.1.1 - Conditional className composition
- `tailwind-merge` 2.5.4 - Conflict-free Tailwind class resolution

## Configuration

**Environment:**
- No runtime environment variables (`.env`) required; all astrophysical datasets and simulation engines operate client-side
- `.gitignore` configured to ignore `.env`, `.env.*`, `node_modules`, `dist`, logs, and build artifacts

**Build:**
- `vite.config.ts`: Configures `@vitejs/plugin-react`, dev server on port 3000, and Rollup vendor chunking (`three-vendor`, `react-vendor`, `ui-vendor`) with 1000 kB chunk warning limit
- `tsconfig.json`: Target ES2020, module ESNext, moduleResolution `bundler`, strict mode, JSX `react-jsx`
- `tsconfig.node.json`: Compiler options for build scripts including `vite.config.ts`
- `tailwind.config.js`: Custom theme extensions for space palettes, holo-cyan glows, NASA accents, typography tokens (`Outfit`, `Inter`, `JetBrains Mono`), and custom keyframe animations
- `postcss.config.js`: Configures Tailwind CSS and Autoprefixer plugins
- `vercel.json`: Single-page application wildcard rewrite routing all traffic (`/(.*)`) to `/index.html`

## Platform Requirements

**Development:**
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)
- Modern web browser with WebGL 2.0 support

**Production:**
- Vercel Edge / Static Hosting (`orbital-nu-gules.vercel.app`)
- Compatible with any static CDN/web server (Netlify, Cloudflare Pages, AWS S3/CloudFront) with client-side SPA fallback

---

*Stack analysis: 2026-10-23*
