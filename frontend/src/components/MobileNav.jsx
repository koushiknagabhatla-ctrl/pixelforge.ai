import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, MessageSquare, Sparkles, Zap, Clock } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Generate', path: '/tools?mode=generate', icon: Sparkles },
  { name: 'Enhance', path: '/tools?mode=enhance', icon: Zap },
  { name: 'Chat', path: '/chatbot', icon: MessageSquare },
  { name: 'History', path: '/history', icon: Clock },
];

const MobileNav = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentMode = searchParams.get('mode');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] md:hidden px-2 py-3 flex items-center justify-around bg-[#010201]/95 backdrop-blur-2xl border-t border-white/[0.04]">
      {navItems.map((item) => {
        let isActive = location.pathname === item.path;
        if (item.path.startsWith('/tools')) {
          const mode = item.path.split('=')[1];
          isActive = location.pathname === '/tools' && currentMode === mode;
        }
        const Icon = item.icon;

        return (
          <NavLink key={item.name} to={item.path}
            className={`flex flex-col items-center gap-1 transition-all duration-300 relative ${isActive ? 'text-white' : 'text-white/15'}`}>
            <motion.div
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white/[0.06]' : ''}`}
              whileTap={{ scale: 0.9 }}>
              <Icon className="w-[18px] h-[18px]" />
            </motion.div>
            {isActive && (
              <motion.div layoutId="mobile-dot" className="absolute -top-0.5 w-1 h-1 bg-white rounded-full" />
            )}
            <span className="text-[8px] font-medium tracking-wide">{item.name}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default MobileNav;
