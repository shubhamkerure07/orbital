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
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
