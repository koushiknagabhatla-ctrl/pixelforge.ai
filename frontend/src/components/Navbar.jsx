import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineLogout } from 'react-icons/hi';

const Navbar = () => {
  const { user, signOut } = useAuthStore();

  return (
    <motion.nav 
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 h-16 z-[100] px-10 flex items-center justify-between border-b border-white/[0.04] bg-black/50 backdrop-blur-3xl"
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.05)]" />
      
      <Link to="/" className="flex items-center gap-4 group hover-lift shrink-0">
        <div className="w-8 h-8 glass flex items-center justify-center border-white/5 group-hover:bg-white transition-all duration-700 shadow-xl">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:stroke-black transition-colors">
                <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2.5" strokeLinecap="square"/>
            </svg>
        </div>
        <div className="glass-text-inner !px-3 !py-0.5 group-hover:bg-white/10 transition-colors">
            <span className="text-[9.5px] font-black uppercase tracking-[0.4em] text-glass">
                Pixel Forge AI
            </span>
        </div>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/#about" className="text-[8.5px] font-black text-gray-800 hover:text-white uppercase tracking-[0.4em] transition-colors hover-lift">About</Link>
        
        {user ? (
          <div className="flex items-center gap-5">
            <Link to="/chatbot" className="hover-lift">
              <div className="flex items-center gap-3 py-1 px-3 glass border border-white/5 hover:border-white/20 transition-all group relative overflow-hidden">
                 <span className="text-[8.5px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">{user.email?.split('@')[0]}</span>
                 <div className="relative">
                    <div className="w-5 h-5 rounded-full glass-strong flex items-center justify-center border border-white/10 relative z-10">
                        <FcGoogle className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute inset-0 bg-white blur-md opacity-40 group-hover:opacity-80 transition-opacity rounded-full scale-110" />
                 </div>
              </div>
            </Link>
            
            <button 
              onClick={signOut}
              className="flex items-center gap-2 text-[8.5px] font-black text-gray-800 hover:text-white uppercase tracking-[0.4em] transition-all group hover-lift"
            >
              <HiOutlineLogout className="w-3.5 h-3.5 text-gray-800 group-hover:text-white transition-colors" />
              <span className="hidden sm:block">Sign Out</span>
            </button>
          </div>
        ) : (
          <Link to="/login" className="hover-lift">
            <button className="flex items-center gap-4 px-5 py-2 glass border border-white/10 hover:border-white/30 group relative overflow-hidden transition-all duration-700">
               <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50 group-hover:text-white transition-colors">Sign In</span>
               <div className="relative">
                  <div className="w-5 h-5 rounded-full glass-strong flex items-center justify-center border border-white/10 relative z-10 group-hover:bg-white transition-all">
                      <FcGoogle className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute inset-0 bg-white blur-md opacity-20 group-hover:opacity-100 transition-opacity rounded-full scale-125" />
               </div>
            </button>
          </Link>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
