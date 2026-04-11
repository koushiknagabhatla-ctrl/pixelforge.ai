import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiOutlineHome, 
  HiOutlineChatAlt2, 
  HiOutlineSparkles,
  HiOutlineClock
} from 'react-icons/hi';

const navItems = [
  { name: 'HOME', path: '/', icon: HiOutlineHome },
  { name: 'FORGE AI', path: '/chatbot', icon: HiOutlineChatAlt2 },
  { name: 'GENERATION', path: '/tools?mode=generate', icon: HiOutlineSparkles },
  { name: 'ARCHIVES', path: '/history', icon: HiOutlineClock },
];

const MobileNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] lg:hidden mobile-nav-surface px-4 py-3 flex items-center justify-around">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || 
                        (item.path.startsWith('/tools') && location.pathname === '/tools');

        return (
          <NavLink
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center gap-1.5 transition-all duration-500 relative ${
              isActive ? 'text-white' : 'text-gray-800'
            }`}
          >
            <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-700
                ${isActive ? 'bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : ''}
            `}>
              <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-800'}`} />
            </div>
            {isActive && (
              <motion.div 
                layoutId="activeBubble"
                className="absolute -top-1 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" 
              />
            )}
            <span className="text-[7px] font-black uppercase tracking-widest">{item.name.split(' ')[0]}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default MobileNav;
