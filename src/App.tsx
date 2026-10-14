import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { PlanetDetailPage } from './pages/PlanetDetailPage';
import { MissionsPage } from './pages/MissionsPage';
import { RocketsPage } from './pages/RocketsPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { OrbitalLabPage } from './pages/OrbitalLabPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { NeoObservatoryPage } from './pages/NeoObservatoryPage';
import { SpaceWeatherPage } from './pages/SpaceWeatherPage';
import { ExoplanetsPage } from './pages/ExoplanetsPage';
import { MissionDesignerPage } from './pages/MissionDesignerPage';
import { KnowledgeGraphPage } from './pages/KnowledgeGraphPage';
import { IntelligencePage } from './pages/IntelligencePage';

// Scroll restoration on navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <div className="flex flex-col min-h-screen bg-space-950 text-slate-100 selection:bg-gold-500 selection:text-space-950">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/explore/:planetId" element={<PlanetDetailPage />} />
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/rockets" element={<RocketsPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/orbital-lab" element={<OrbitalLabPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/discover/exoplanets" element={<ExoplanetsPage />} />
          <Route path="/discover/knowledge-graph" element={<KnowledgeGraphPage />} />
          <Route path="/observatory/neo" element={<NeoObservatoryPage />} />
          <Route path="/observatory/space-weather" element={<SpaceWeatherPage />} />
          <Route path="/simulate/mission-designer" element={<MissionDesignerPage />} />
          <Route path="/intelligence" element={<IntelligencePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
