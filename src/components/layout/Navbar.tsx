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
  Layers
} from 'lucide-react';
import { GlobalSearchModal } from './GlobalSearchModal';

interface NavGroup {
  label: string;
  icon: React.ReactNode;
  to?: string;
  items?: {
    to: string;
    label: string;
    desc: string;
    icon: React.ReactNode;
    badge?: string;
  }[];
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
    }, 200);
  };

  const navGroups: NavGroup[] = [
    { 
      to: '/explore', 
      label: 'Explore', 
      icon: <Globe className="w-3.5 h-3.5" /> 
    },
    { 
      to: '/missions', 
      label: 'Missions', 
      icon: <Radio className="w-3.5 h-3.5" />,
      items: [
        { to: '/missions', label: 'Active Manifest', desc: 'NASA, ESA, ISRO flight ops', icon: <Radio className="w-3.5 h-3.5 text-holo-cyan" /> },
        { to: '/rockets', label: 'Launch Vehicles', desc: 'Saturn V, Falcon 9, Starship', icon: <Rocket className="w-3.5 h-3.5 text-holo-cyan" /> },
        { to: '/destinations', label: 'Planetary Targets', desc: 'Planets, dwarf worlds & moons', icon: <Compass className="w-3.5 h-3.5 text-holo-cyan" /> }
      ]
    },
    { 
      label: 'Observatory', 
      icon: <Crosshair className="w-3.5 h-3.5" />,
      items: [
        { to: '/observatory/neo', label: 'NEO & Asteroids', desc: 'Planetary defense & close approaches', icon: <Crosshair className="w-3.5 h-3.5 text-holo-cyan" />, badge: 'CNEOS' },
        { to: '/observatory/space-weather', label: 'Space Weather', desc: 'Solar wind, Kp index & aurora forecast', icon: <Sun className="w-3.5 h-3.5 text-amber-400" />, badge: 'NOAA' }
      ]
    },
    { 
      label: 'Simulate', 
      icon: <Cpu className="w-3.5 h-3.5" />,
      items: [
        { to: '/orbital-lab', label: 'Orbital Mechanics Lab', desc: 'Symplectic 2D n-body gravitational sandbox', icon: <Cpu className="w-3.5 h-3.5 text-holo-cyan" /> },
        { to: '/simulate/mission-designer', label: 'Mission Designer', desc: 'Hohmann transfer & Tsiolkovsky delta-V planner', icon: <Orbit className="w-3.5 h-3.5 text-emerald-400" />, badge: 'NEW' }
      ]
    },
    { 
      label: 'Discover', 
      icon: <BookOpen className="w-3.5 h-3.5" />,
      items: [
        { to: '/discover', label: 'APOD & Breakthroughs', desc: 'NASA APOD and astrophysical discoveries', icon: <BookOpen className="w-3.5 h-3.5 text-holo-cyan" /> },
        { to: '/discover/exoplanets', label: 'Exoplanet Laboratory', desc: 'Habitable worlds & transit spectroscopy', icon: <Globe2 className="w-3.5 h-3.5 text-emerald-400" />, badge: 'JWST' },
        { to: '/discover/knowledge-graph', label: 'Universe Knowledge Graph', desc: 'Interactive cosmic ontology & force network', icon: <Network className="w-3.5 h-3.5 text-purple-400" />, badge: 'GRAPH' }
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
      <div className="w-full bg-[#020205] border-b border-white/5 py-1 px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[10px] font-mono tracking-wider text-slate-400 select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-holo-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-holo-cyan animate-pulse" />
            <span className="font-bold">NASA MC-SYS: NOMINAL</span>
          </div>
          <span className="hidden md:inline text-slate-400">|</span>
          <div className="hidden md:flex items-center gap-1 text-slate-400">
            <Wifi className="w-2.5 h-2.5 text-emerald-400" />
            <span>DEEP SPACE DSN-84: LINK LOCKED</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-400 hidden sm:inline">COORDINATES: 28°35′N 80°39′W</span>
          <div className="flex items-center gap-1.5 text-slate-200">
            <Activity className="w-3 h-3 text-gold-400 animate-pulse" />
            <span className="text-holo-cyan font-bold">{clockUtc}</span>
          </div>
        </div>
      </div>

      {/* Main Persistent Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-space-950/90 border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo with HUD Corner Brackets */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-holo-cyan rounded-lg p-1 relative"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-holo-cyan/20 via-space-900 to-space-950 border border-holo-cyan/40 flex items-center justify-center text-holo-cyan group-hover:border-holo-cyan transition-all group-hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] relative overflow-hidden">
              <Orbit className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
              {/* Corner tick */}
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-holo-cyan" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-holo-cyan" />
            </div>

            <div className="flex flex-col">
              <span className="font-outfit font-black tracking-[0.2em] text-lg sm:text-xl text-white group-hover:text-holo-cyan transition-colors">
                ORBITAL
              </span>
              <span className="text-[9px] font-mono tracking-widest text-holo-cyan/80 -mt-1 uppercase hidden sm:block">
                Mission Control v2.0
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
                    className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 relative group ${
                      isGroupActive 
                        ? 'text-holo-cyan bg-holo-cyan/10 border border-holo-cyan/40 shadow-[0_0_12px_rgba(0,242,255,0.2)]' 
                        : 'text-slate-300 hover:text-white hover:bg-space-850 border border-transparent'
                    }`}
                  >
                    {isGroupActive && (
                      <>
                        <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-holo-cyan" />
                        <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-holo-cyan" />
                      </>
                    )}
                    <span className={isGroupActive ? 'text-holo-cyan' : 'text-slate-400 group-hover:text-holo-cyan transition-colors'}>
                      {group.icon}
                    </span>
                    <span>{group.label}</span>
                  </NavLink>
                );
              }

              // Dropdown Group Item
              const isOpen = activeDropdown === group.label;

              return (
                <div 
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(group.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => setActiveDropdown(isOpen ? null : group.label)}
                    className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 relative group ${
                      isGroupActive || isOpen
                        ? 'text-holo-cyan bg-holo-cyan/10 border border-holo-cyan/40 shadow-[0_0_12px_rgba(0,242,255,0.2)]' 
                        : 'text-slate-300 hover:text-white hover:bg-space-850 border border-transparent'
                    }`}
                  >
                    <span className={isGroupActive ? 'text-holo-cyan' : 'text-slate-400 group-hover:text-holo-cyan'}>
                      {group.icon}
                    </span>
                    <span>{group.label}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180 text-holo-cyan' : 'text-slate-500'}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-72 p-2 rounded-xl bg-space-900/98 backdrop-blur-2xl border border-holo-cyan/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="hud-corner-tl" />
                      <div className="hud-corner-tr" />
                      
                      <div className="space-y-1">
                        {group.items?.map((item) => {
                          const isItemActive = location.pathname === item.to;
                          return (
                            <Link
                              key={item.to}
                              to={item.to}
                              className={`flex items-start gap-2.5 p-2 rounded-lg transition-colors text-xs font-mono ${
                                isItemActive 
                                  ? 'bg-holo-cyan/15 text-white border border-holo-cyan/30' 
                                  : 'text-slate-300 hover:bg-space-850 hover:text-white'
                              }`}
                            >
                              <div className="mt-0.5 p-1 rounded bg-space-950 border border-slate-800">
                                {item.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-white">{item.label}</span>
                                  {item.badge && (
                                    <span className="px-1 py-0.2 rounded text-[8px] font-mono bg-holo-cyan/20 text-holo-cyan border border-holo-cyan/40 font-bold">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                                  {item.desc}
                                </div>
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

          {/* Actions: Search Trigger & Mobile Menu Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-space-900 border border-slate-700/80 hover:border-holo-cyan/60 text-slate-300 hover:text-white transition-all text-xs font-mono group hover:shadow-[0_0_15px_rgba(0,242,255,0.15)]"
              aria-label="Search space database"
            >
              <Search className="w-3.5 h-3.5 text-holo-cyan group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Telemetry Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-space-950 rounded border border-slate-800 text-slate-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-space-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-holo-cyan" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-space-900/98 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
            {navGroups.map((group) => {
              if (!group.items) {
                const isActive = group.to ? location.pathname === group.to : false;
                return (
                  <Link
                    key={group.label}
                    to={group.to || '#'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono font-medium transition-colors ${
                      isActive 
                        ? 'bg-holo-cyan/15 text-holo-cyan border border-holo-cyan/40' 
                        : 'text-slate-300 hover:bg-space-850 hover:text-white'
                    }`}
                  >
                    <span className={isActive ? 'text-holo-cyan' : 'text-slate-400'}>{group.icon}</span>
                    {group.label}
                  </Link>
                );
              }

              // Group with children in mobile menu
              return (
                <div key={group.label} className="space-y-1 pt-1">
                  <div className="px-3 py-1 text-[10px] font-mono font-bold text-holo-cyan uppercase tracking-wider flex items-center gap-1.5">
                    {group.icon}
                    <span>{group.label}</span>
                  </div>
                  <div className="pl-3 space-y-1">
                    {group.items.map((item) => {
                      const isActive = location.pathname === item.to;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
                            isActive
                              ? 'bg-holo-cyan/15 text-holo-cyan border border-holo-cyan/40 font-bold'
                              : 'text-slate-300 hover:bg-space-850 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-holo-cyan/20 text-holo-cyan">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
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
