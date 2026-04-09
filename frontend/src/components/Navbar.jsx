import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user } = useAuthStore();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-20 z-[100] px-10 flex items-center justify-between border-b border-white/[0.05] bg-black/40 backdrop-blur-3xl"
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <Link to="/" className="flex items-center gap-4 group">
        <div className="w-10 h-10 glass flex items-center justify-center border-white/10 group-hover:bg-white transition-all duration-700 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:stroke-black transition-colors duration-700">
                <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2.5" strokeLinecap="square"/>
            </svg>
        </div>
        <span className="text-[12px] font-black uppercase tracking-[0.5em] text-glass group-hover:text-white transition-all">
            Pixel Forge AI
        </span>
      </Link>

      <div className="flex items-center gap-12">
        <Link to="/#about" className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-[0.4em] transition-colors">About</Link>
        {user ? (
          <Link to="/chatbot">
            <div className="flex items-center gap-4 py-2.5 px-6 glass border border-white/10 hover:bg-white hover:text-black transition-all group">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] whitespace-nowrap">{user.email?.split('@')[0]}</span>
               <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 group-hover:border-black/10" />
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <button className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-white/5 shadow-2xl">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
