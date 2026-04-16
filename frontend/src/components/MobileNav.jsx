import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, MessageSquare, Sparkles, Clock } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Chat', path: '/chatbot', icon: MessageSquare },
  { name: 'Tools', path: '/tools?mode=generate', icon: Sparkles },
  { name: 'History', path: '/history', icon: Clock },
];

const MobileNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] lg:hidden px-4 py-3 flex items-center justify-around bg-[#09090b]/95 backdrop-blur-2xl border-t border-white/[0.04]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path.startsWith('/tools') && location.pathname === '/tools');
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
