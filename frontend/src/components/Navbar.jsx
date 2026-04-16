import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Home, Info, Wrench, MessageSquare, LogOut } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import {
  Popover, PopoverTrigger, PopoverContent,
  PopoverHeader, PopoverTitle, PopoverDescription,
  PopoverBody, PopoverFooter,
} from './ui/popover';
import { Button } from './ui/button';
import { GlassFilter } from './ui/liquid-radio';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/about', label: 'About', icon: Info },
  { to: '/tools', label: 'Tools', icon: Wrench, protected: true },
  { to: '/chatbot', label: 'Chat', icon: MessageSquare, protected: true },
];

const Navbar = () => {
  const { user, signOut } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const currentMode = searchParams.get('mode') || 'generate';
  const [toolMode, setToolMode] = useState(currentMode);

  const handleToolModeChange = (value) => {
    setToolMode(value);
    navigate(`/tools?mode=${value}`);
  };

  const getUserAvatar = () => {
    return user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;
  };

  const getUserInitials = () => {
    const name = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || '';
    if (name.includes('@')) return name.charAt(0).toUpperCase();
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  const isToolsPage = location.pathname === '/tools';

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0a0a0f]/80 backdrop-blur-2xl border-b border-white/[0.04] z-[100] px-4 sm:px-8 flex items-center justify-between">
      
      {/* Logo */}
      <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-all">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="#818cf8" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M12 8L8 10.5V15.5L12 18L16 15.5V10.5L12 8Z" fill="#6366f1" fillOpacity="0.3" stroke="#818cf8" strokeWidth="1" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/80 hidden sm:block font-['Manrope']">Pixel Forge</span>
      </Link>

      {/* Center: Navigation + Liquid Radio Toggle */}
      <div className="flex items-center gap-4">
        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            if (item.protected && !user) return null;
            const basePath = item.to.split('?')[0];
            const isActive = item.to === '/' ? location.pathname === '/' : location.pathname === basePath;
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => window.scrollTo(0, 0)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                    : 'text-white/30 hover:text-white/60 hover:bg-white/[0.03]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Liquid Radio Toggle — only on Tools page */}
        {isToolsPage && user && (
          <div className="inline-flex h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] p-0.5">
            <RadioGroup
              value={toolMode}
              onValueChange={handleToolModeChange}
              className="group relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-md after:bg-indigo-500/20 after:border after:border-indigo-500/30 after:shadow-[0_0_12px_rgba(99,102,241,0.15)] after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=enhance]:after:translate-x-full data-[state=generate]:after:translate-x-0"
              data-state={toolMode}
            >
              <div
                className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-md"
                style={{ filter: 'url("#radio-glass")' }}
              />
              <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors text-white/40 group-data-[state=generate]:text-indigo-200 text-xs font-bold uppercase tracking-wider">
                Generate
                <RadioGroupItem value="generate" className="sr-only" />
              </label>
              <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors text-white/40 group-data-[state=enhance]:text-indigo-200 text-xs font-bold uppercase tracking-wider">
                Enhance
                <RadioGroupItem value="enhance" className="sr-only" />
              </label>
              <GlassFilter />
            </RadioGroup>
          </div>
        )}
      </div>

      {/* Right: Auth */}
      <div className="flex items-center gap-3">
        {/* Mobile nav */}
        <div className="flex md:hidden items-center gap-3">
          {navItems.slice(0, 3).map(link => {
            if (link.protected && !user) return null;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => window.scrollTo(0, 0)}
                className={`text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors ${
                  location.pathname === link.to.split('?')[0] ? 'text-indigo-300' : 'text-white/30'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <button className="rounded-full p-0 h-9 w-9 flex items-center justify-center hover:ring-2 hover:ring-indigo-500/30 transition-all">
                <Avatar className="h-8 w-8 border border-white/[0.08]">
                  <AvatarImage src={getUserAvatar()} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-60" align="end">
              <PopoverHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={getUserAvatar()} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <PopoverTitle className="truncate text-sm">{user.user_metadata?.full_name || user.user_metadata?.name || 'User'}</PopoverTitle>
                    <PopoverDescription className="truncate">{user.email}</PopoverDescription>
                  </div>
                </div>
              </PopoverHeader>
              <PopoverFooter>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/50 hover:text-white hover:bg-white/[0.05] text-xs"
                  size="sm"
                  onClick={() => { if (window.confirm('Sign out?')) signOut(); }}
                >
                  <LogOut className="mr-2 h-3.5 w-3.5" />
                  Sign Out
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        ) : (
          <Link to="/login">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all text-xs font-semibold uppercase tracking-wider text-indigo-200/70 hover:text-indigo-200">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
