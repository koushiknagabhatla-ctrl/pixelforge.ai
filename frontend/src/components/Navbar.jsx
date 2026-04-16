import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Home, Info, Wrench, MessageSquare, LogOut, Sparkles, Zap } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import {
  Popover, PopoverTrigger, PopoverContent,
  PopoverHeader, PopoverTitle, PopoverDescription,
  PopoverFooter,
} from './ui/popover';
import { Button } from './ui/button';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/about', label: 'About', icon: Info },
  { to: '/tools?mode=generate', label: 'Tools', icon: Wrench },
  { to: '/chatbot', label: 'Chat', icon: MessageSquare, protected: true },
];

const Navbar = () => {
  const { user, signOut } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const getUserAvatar = () => user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;
  const getUserInitials = () => {
    const name = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || '';
    if (name.includes('@')) return name.charAt(0).toUpperCase();
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 h-16 bg-[#09090b]/80 backdrop-blur-2xl border-b border-white/[0.04] z-[100] px-5 sm:px-8 flex items-center justify-between"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 group">
        <motion.div
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center"
        >
          <div className="w-3 h-3 rounded-sm bg-white/80" />
        </motion.div>
        <span className="text-sm font-semibold tracking-tight text-white/90 hidden sm:block font-['Space_Grotesk']">Pixel Forge</span>
      </Link>

      {/* Center Nav */}
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => {
          if (item.protected && !user) return null;
          const basePath = item.to.split('?')[0];
          const isActive = item.to === '/' ? location.pathname === '/' : location.pathname === basePath;
          const Icon = item.icon;

          return (
            <Link key={item.to} to={item.to} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <motion.div
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-white/35 hover:text-white/60'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/[0.06] border border-white/[0.08] rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}

        {/* Generate/Enhance pills only on tools page */}
        {location.pathname === '/tools' && user && (
          <div className="flex items-center gap-1 ml-3 pl-3 border-l border-white/[0.06]">
            {[
              { label: 'Generate', mode: 'generate', icon: Sparkles },
              { label: 'Enhance', mode: 'enhance', icon: Zap },
            ].map(({ label, mode, icon: MIcon }) => {
              const isActive = new URLSearchParams(location.search).get('mode') === mode;
              return (
                <Link key={mode} to={`/tools?mode=${mode}`}>
                  <motion.div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      isActive ? 'bg-white text-black' : 'text-white/30 hover:text-white/50'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <MIcon className="w-3 h-3" />
                    {label}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Right: Auth */}
      <div className="flex items-center gap-3">
        {/* Mobile nav links */}
        <div className="flex md:hidden items-center gap-4">
          {navItems.filter(n => !n.protected || user).slice(0, 3).map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[11px] font-medium transition-colors ${
                location.pathname === link.to.split('?')[0] ? 'text-white' : 'text-white/25'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full p-0 h-9 w-9 flex items-center justify-center hover:ring-2 hover:ring-white/10 transition-all"
              >
                <Avatar className="h-8 w-8 border border-white/[0.08]">
                  <AvatarImage src={getUserAvatar()} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </motion.button>
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
                  className="w-full justify-start text-white/40 hover:text-white hover:bg-white/[0.04] text-xs"
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
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 rounded-lg bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors"
            >
              Sign In
            </motion.button>
          </Link>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
