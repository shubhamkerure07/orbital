import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Orbit, 
  Search, 
  Menu, 
  X, 
  Globe, 
  Radio, 
  Rocket, 
  Compass, 
  Cpu, 
  BookOpen, 
  Info 
} from 'lucide-react';
import { GlobalSearchModal } from './GlobalSearchModal';

export const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Listen for Ctrl+K or Cmd+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', icon: <Orbit className="w-4 h-4" /> },
    { to: '/explore', label: 'Explore', icon: <Globe className="w-4 h-4" /> },
    { to: '/missions', label: 'Missions', icon: <Radio className="w-4 h-4" /> },
    { to: '/rockets', label: 'Rockets', icon: <Rocket className="w-4 h-4" /> },
    { to: '/destinations', label: 'Destinations', icon: <Compass className="w-4 h-4" /> },
    { to: '/orbital-lab', label: 'Orbital Lab', icon: <Cpu className="w-4 h-4" /> },
    { to: '/discover', label: 'Discover', icon: <BookOpen className="w-4 h-4" /> },
    { to: '/about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-space-950/85 border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-500/20 to-space-900 border border-gold-500/40 flex items-center justify-center text-gold-400 group-hover:border-gold-500 transition-colors shadow-sm shadow-gold-500/10">
              <Orbit className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-extrabold tracking-widest text-base sm:text-lg text-slate-100 group-hover:text-gold-400 transition-colors">
                ORBITAL
              </span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 -mt-1 uppercase hidden sm:block">
                Astrophysics Console
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 text-xs xl:text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-gold-400 bg-gold-500/10 border border-gold-500/30' 
                      : 'text-slate-300 hover:text-slate-100 hover:bg-space-850 border border-transparent'
                  }`}
                >
                  <span className={isActive ? 'text-gold-400' : 'text-slate-400'}>{link.icon}</span>
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Actions: Search Trigger & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-space-900 border border-slate-700 hover:border-gold-500/50 text-slate-300 hover:text-slate-100 transition-colors text-xs font-mono"
              aria-label="Search space database"
            >
              <Search className="w-3.5 h-3.5 text-gold-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-space-800 rounded border border-slate-700 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-space-900 border border-slate-800 text-slate-300 hover:text-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-space-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-gold-500/10 text-gold-400 border border-gold-500/30' 
                      : 'text-slate-300 hover:bg-space-850 hover:text-slate-100'
                  }`}
                >
                  <span className={isActive ? 'text-gold-400' : 'text-slate-400'}>{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
