import React, { useState, useEffect, useRef } from 'react';
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
  Info,
  Activity,
  Wifi,
  ChevronDown,
  Crosshair,
  Sun,
  Globe2,
  Network,
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';
import { GlobalSearchModal } from './GlobalSearchModal';

interface NavItem {
  to: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
  badge?: string;
}

interface NavGroup {
  label: string;
  icon: React.ReactNode;
  to?: string;
  items?: NavItem[];
}

export const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const [clockUtc, setClockUtc] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClockUtc(now.toISOString().slice(11, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const navGroups: NavGroup[] = [
    { 
      to: '/explore', 
      label: 'Solar System', 
      icon: <Globe className="w-3.5 h-3.5" />,
      items: [
        { to: '/explore', label: '3D Planetarium', desc: 'Real-time planetary ephemeris, axial tilts & orbits', icon: <Globe className="w-4 h-4 text-cyan-400" />, badge: '3D' },
        { to: '/destinations', label: 'Planetary Targets', desc: 'Moons, dwarf worlds & deep exploration targets', icon: <Compass className="w-4 h-4 text-cyan-400" /> }
      ]
    },
    { 
      to: '/missions', 
      label: 'Flight Ops', 
      icon: <Radio className="w-3.5 h-3.5" />,
      items: [
        { to: '/missions', label: 'Mission Manifest', desc: 'Active & historic NASA, ESA, ISRO expeditions', icon: <Radio className="w-4 h-4 text-amber-400" /> },
        { to: '/rockets', label: 'Launch Vehicles', desc: 'Saturn V, Falcon 9, Starship & staging simulator', icon: <Rocket className="w-4 h-4 text-emerald-400" /> }
      ]
    },
    { 
      label: 'Observatories', 
      icon: <Crosshair className="w-3.5 h-3.5" />,
      items: [
        { to: '/observatory/neo', label: 'NEO & Asteroids', desc: 'Planetary defense, Apophis radar & close approaches', icon: <Crosshair className="w-4 h-4 text-cyan-400" />, badge: 'CNEOS' },
        { to: '/observatory/space-weather', label: 'Space Weather', desc: 'Real-time solar wind, Kp index & aurora forecast', icon: <Sun className="w-4 h-4 text-amber-400" />, badge: 'NOAA' },
        { to: '/discover/exoplanets', label: 'Exoplanet Laboratory', desc: 'Habitable worlds & transit spectroscopy', icon: <Globe2 className="w-4 h-4 text-emerald-400" />, badge: 'JWST' }
      ]
    },
    { 
      label: 'Simulators', 
      icon: <Cpu className="w-3.5 h-3.5" />,
      items: [
        { to: '/orbital-lab', label: 'Orbital Mechanics Lab', desc: 'Symplectic 2D n-body gravitational sandbox', icon: <Cpu className="w-4 h-4 text-cyan-400" /> },
        { to: '/simulate/mission-designer', label: 'Mission Designer', desc: 'Hohmann transfer & Tsiolkovsky delta-V staging planner', icon: <Orbit className="w-4 h-4 text-emerald-400" />, badge: 'PLAN' }
      ]
    },
    { 
      label: 'Discoveries', 
      icon: <BookOpen className="w-3.5 h-3.5" />,
      items: [
        { to: '/discover', label: 'APOD & Breakthroughs', desc: 'NASA APOD and astrophysical discoveries', icon: <BookOpen className="w-4 h-4 text-cyan-400" /> },
        { to: '/discover/knowledge-graph', label: 'Universe Knowledge Graph', desc: 'Interactive cosmic ontology & force network', icon: <Network className="w-4 h-4 text-purple-400" />, badge: 'GRAPH' }
      ]
    },
    { 
      to: '/intelligence', 
      label: 'Intelligence', 
      icon: <Terminal className="w-3.5 h-3.5" /> 
    },
    { 
      to: '/about', 
      label: 'About', 
      icon: <Info className="w-3.5 h-3.5" /> 
    },
  ];

  return (
    <>
      {/* Top Mission Control Telemetry Ribbon */}
      <div className="w-full bg-[#02050e] border-b border-white/5 py-1 px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[10px] font-mono tracking-wider text-slate-400 select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>NASA MC-SYS: NOMINAL</span>
          </div>
          <span className="hidden md:inline text-slate-600">|</span>
          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <Wifi className="w-2.5 h-2.5 text-emerald-400" />
            <span>DEEP SPACE DSN-84: LINK LOCKED</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-400 hidden sm:inline">KENNEDY SPACE CENTER: 28°35′N 80°39′W</span>
          <div className="flex items-center gap-1.5 text-slate-200">
            <Activity className="w-3 h-3 text-amber-400" />
            <span className="text-cyan-400 font-bold tracking-widest">{clockUtc}</span>
          </div>
        </div>
      </div>

      {/* Main Persistent Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-space-950/90 border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1 relative flex-shrink-0"
            aria-label="Orbital Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-space-900 to-space-950 border border-cyan-400/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-all group-hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] relative overflow-hidden">
              <Orbit className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-400" />
            </div>

            <div className="flex flex-col">
              <span className="font-outfit font-black tracking-[0.2em] text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors">
                ORBITAL
              </span>
              <span className="text-[9px] font-mono tracking-widest text-cyan-400/90 -mt-1 uppercase hidden sm:block">
                Mission Control v1.2
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navGroups.map((group) => {
              const hasItems = !!group.items && group.items.length > 0;
              const isGroupActive = group.to 
                ? (location.pathname === group.to || (group.to !== '/' && location.pathname.startsWith(group.to)))
                : (group.items?.some(it => location.pathname.startsWith(it.to)) ?? false);

              if (!hasItems && group.to) {
                return (
                  <NavLink
                    key={group.label}
                    to={group.to}
                    className={({ isActive }) => `
                      px-3 py-2 rounded-xl text-xs font-mono font-medium tracking-wide transition-all flex items-center gap-1.5
                      ${isActive 
                        ? 'bg-space-850 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,242,255,0.1)]' 
                        : 'text-slate-300 hover:text-white hover:bg-space-900/60'
                      }
                    `}
                  >
                    {group.icon}
                    <span>{group.label}</span>
                  </NavLink>
                );
              }

              return (
                <div 
                  key={group.label} 
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(group.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === group.label ? null : group.label)}
                    aria-expanded={activeDropdown === group.label}
                    className={`
                      px-3 py-2 rounded-xl text-xs font-mono font-medium tracking-wide transition-all flex items-center gap-1.5
                      ${isGroupActive 
                        ? 'bg-space-850 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,242,255,0.1)]' 
                        : 'text-slate-300 hover:text-white hover:bg-space-900/60'
                      }
                    `}
                  >
                    {group.icon}
                    <span>{group.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === group.label ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === group.label && (
                    <div 
                      className="absolute top-full left-0 mt-1.5 w-72 p-2 rounded-2xl bg-space-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                    >
                      <div className="space-y-1">
                        {group.items?.map((item) => {
                          const isItemActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
                          return (
                            <Link
                              key={item.to}
                              to={item.to}
                              className={`
                                flex items-start gap-3 p-2.5 rounded-xl transition-all group
                                ${isItemActive ? 'bg-space-800 border border-cyan-500/30' : 'hover:bg-space-850/80'}
                              `}
                            >
                              <div className="p-2 rounded-lg bg-space-950 border border-slate-800 group-hover:border-cyan-500/40 flex-shrink-0 mt-0.5">
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className={`text-xs font-semibold font-mono ${isItemActive ? 'text-cyan-300' : 'text-slate-200 group-hover:text-cyan-300'}`}>
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/30">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-400 line-clamp-1 font-sans mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Controls: Search & Mobile Menu Button */}
          <div className="flex items-center gap-2.5">
            
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-space-900 hover:bg-space-850 text-slate-300 hover:text-white border border-slate-700/80 hover:border-cyan-400/50 transition-all font-mono text-xs shadow-sm group"
              aria-label="Open Command Search"
              title="Search database (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-slate-300">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-space-950 text-slate-400 border border-slate-800 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-space-900 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-16 bg-space-950/98 backdrop-blur-2xl border-b border-slate-800 p-6 space-y-6 max-h-[calc(100vh-4rem)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-6">
              {navGroups.map((group) => (
                <div key={group.label} className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400 font-bold tracking-wider px-1">
                    {group.icon}
                    <span>{group.label}</span>
                  </div>

                  {group.items ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                      {group.items.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-xl bg-space-900 border border-slate-800/80 hover:border-cyan-400/40 text-slate-200"
                        >
                          <div className="p-2 rounded-lg bg-space-950 text-cyan-400">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white font-mono">{item.label}</div>
                            <div className="text-[10px] text-slate-400 font-sans line-clamp-1">{item.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : group.to ? (
                    <div className="pl-2">
                      <Link
                        to={group.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl bg-space-900 border border-slate-800/80 hover:border-cyan-400/40 text-slate-200"
                      >
                        <div className="p-2 rounded-lg bg-space-950 text-cyan-400">
                          {group.icon}
                        </div>
                        <div className="text-xs font-semibold text-white font-mono">{group.label}</div>
                      </Link>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>ORBITAL Space Operations</span>
              <span className="text-cyan-400">v1.2.0</span>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Search Modal */}
      <GlobalSearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};
