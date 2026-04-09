import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user } = useAuthStore();

  return (
    <motion.nav 
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-16 z-[100] px-10 flex items-center justify-between border-b border-white/[0.04] bg-black/50 backdrop-blur-3xl"
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.05)]" />
      
      <Link to="/" className="flex items-center gap-4 group">
        <div className="w-8 h-8 glass flex items-center justify-center border-white/5 group-hover:bg-white transition-all duration-700 shadow-xl">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:stroke-black transition-colors">
                <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2.5" strokeLinecap="square"/>
            </svg>
        </div>
        <div className="glass-text-inner !px-4 !py-1 group-hover:bg-white/10 transition-colors">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-glass">
                Pixel Forge AI
            </span>
        </div>
      </Link>

      <div className="flex items-center gap-10">
        <Link to="/#about" className="text-[9px] font-black text-gray-700 hover:text-white uppercase tracking-[0.4em] transition-colors">About</Link>
        {user ? (
          <Link to="/chatbot">
            <div className="flex items-center gap-3 py-1.5 px-4 glass border border-white/5 hover:bg-white hover:text-black transition-all group">
               <span className="text-[9px] font-black uppercase tracking-[0.4em] whitespace-nowrap">{user.email?.split('@')[0]}</span>
               <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 group-hover:border-black/10 transition-colors" />
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <button className="px-6 py-2.5 bg-white text-black text-[9px] font-black uppercase tracking-[0.4em] rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-white/10 shadow-xl">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
