import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { Home, Info, Wrench, MessageSquare, BookOpen } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const navItems = [
  { to: '/', label: 'Home', icon: Home, gradientFrom: '#a955ff', gradientTo: '#ea51ff' },
  { to: '/about', label: 'About', icon: Info, gradientFrom: '#56CCF2', gradientTo: '#2F80ED' },
  { to: '/tools?mode=generate', label: 'Tools', icon: Wrench, gradientFrom: '#FF9966', gradientTo: '#FF5E62' },
  { to: '/chatbot', label: 'Chat', icon: MessageSquare, gradientFrom: '#80FF72', gradientTo: '#7EE8FA', protected: true },
];

const Navbar = () => {
  const { user, signOut } = useAuthStore();
  const [showIdentity, setShowIdentity] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0a0a0f]/80 backdrop-blur-2xl border-b border-white/[0.04] z-[100] px-5 sm:px-10 flex items-center justify-between">
      
      {/* Logo */}
      <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-3 group">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-all">
          <div className="w-3 h-3 rounded-sm bg-indigo-400" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/80 hidden sm:block font-['Manrope']">Pixel Forge</span>
      </Link>

      {/* Gradient Nav Menu */}
      <div className="hidden md:flex items-center gap-3">
        {navItems.map((item) => {
          // Skip protected routes if not logged in
          if (item.protected && !user) return null;
          
          const isActive = item.to === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(item.to.split('?')[0]);
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => window.scrollTo(0, 0)}
              className="gradient-nav-item"
              style={{
                '--nav-gradient': `linear-gradient(45deg, ${item.gradientFrom}, ${item.gradientTo})`,
                '--nav-glow': `${item.gradientFrom}40`,
                ...(isActive ? {
                  background: `linear-gradient(45deg, ${item.gradientFrom}, ${item.gradientTo})`,
                  width: '120px',
                  borderColor: 'transparent',
                  boxShadow: `0 0 20px ${item.gradientFrom}40`,
                } : {}),
              }}
            >
              <span className={`nav-icon ${isActive ? '!scale-0 !opacity-0' : ''}`}>
                <Icon className="w-4 h-4 text-white/50" />
              </span>
              <span className={`nav-label ${isActive ? '!scale-100' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Auth */}
      <div className="flex items-center gap-4">
        {/* Mobile nav labels */}
        <div className="flex md:hidden items-center gap-4">
          {navItems.slice(0, 3).map(link => (
            <Link 
              key={link.to}
              to={link.to}
              onClick={() => window.scrollTo(0, 0)}
              className={`text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                location.pathname === link.to.split('?')[0] ? 'text-indigo-300' : 'text-white/30 hover:text-white/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {user ? (
          <div className="relative">
            <button 
              onClick={() => setShowIdentity(!showIdentity)}
              className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all group"
            >
              <div className="relative">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <FcGoogle className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/60 hidden sm:block truncate max-w-[80px]">
                {user.email?.split('@')[0]}
              </span>
            </button>

            <AnimatePresence>
              {showIdentity && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute right-0 mt-3 w-56 bg-[#14141f]/95 backdrop-blur-2xl rounded-xl border border-white/[0.06] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                >
                  <div className="mb-3 pb-3 border-b border-white/[0.05] px-2">
                    <p className="text-[9px] text-white/20 uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-xs font-medium text-white/70 truncate">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => { if(window.confirm('Sign out?')) signOut(); setShowIdentity(false); }}
                    className="w-full px-3 py-2.5 rounded-lg flex items-center gap-3 hover:bg-white/[0.05] transition-colors text-white/40 hover:text-white/70"
                  >
                    <HiOutlineLogout className="w-4 h-4" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link to="/login">
            <button className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all group">
              <FcGoogle className="w-3.5 h-3.5" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-200/70 group-hover:text-indigo-200">Sign In</span>
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
