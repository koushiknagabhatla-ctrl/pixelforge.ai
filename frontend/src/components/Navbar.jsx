import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineUser, HiOutlineLogout } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import useAuthStore from '../store/useAuthStore';

const Navbar = () => {
  const { user, signOut } = useAuthStore();
  const [showIdentity, setShowIdentity] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-black/40 backdrop-blur-3xl border-b border-white/[0.04] z-[100] px-4 sm:px-12 flex items-center justify-between selection:bg-white/10">
      
      <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-3 sm:gap-4 group cursor-pointer">
        <div className="w-9 h-9 sm:w-10 sm:h-10 glass flex items-center justify-center border-white/5 group-hover:bg-white group-hover:bg-opacity-5 transition-all duration-700 shadow-2xl shrink-0 p-1">
          <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
        </div>
        <div className="glass-text-inner !px-3 sm:!px-4 !py-1 hidden xs:block">
          <h1 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-white whitespace-nowrap">Pixel Forge AI</h1>
        </div>
      </Link>

      <div className="flex items-center gap-4 sm:gap-12">
        <Link 
          to="/#about" 
          onClick={(e) => {
            if (window.location.pathname === '/') {
                e.preventDefault();
                const element = document.getElementById('about');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-white transition-all hidden md:block cursor-pointer"
        >
          About
        </Link>
        
        {user ? (
          <div className="relative">
            <button 
                onClick={() => setShowIdentity(!showIdentity)}
                className="flex items-center gap-3 sm:gap-4 glass !pr-3 sm:!pr-4 !pl-1.5 py-1.5 border-white/10 hover:bg-white/5 transition-all group"
            >
                <div className="relative">
                   <div className="w-7 h-7 rounded-full glass-strong flex items-center justify-center border border-white/10 relative z-10 shadow-inner group-hover:scale-110 transition-transform">
                       <FcGoogle className="w-4 h-4" />
                   </div>
                   <div className="absolute inset-0 bg-white blur-md opacity-40 rounded-full scale-125 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white hidden sm:block truncate max-w-[100px]">
                  {user.email?.split('@')[0]}
                </span>
            </button>

            <AnimatePresence>
                {showIdentity && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 10, scale: 0.95 }}
                     className="absolute right-0 mt-4 w-60 sm:w-64 glass-strong p-4 border-white/10 shadow-4xl"
                   >
                       <div className="mb-4 pb-4 border-b border-white/5">
                           <p className="text-[7px] font-bold text-gray-800 uppercase tracking-widest mb-1">Identity Protocol</p>
                           <p className="text-[10px] font-black text-white truncate">{user.email}</p>
                       </div>
                       <button 
                          onClick={() => {
                              if(window.confirm('Terminate Neural Sync?')) signOut();
                              setShowIdentity(false);
                          }}
                          className="w-full h-12 glass flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all group"
                       >
                           <HiOutlineLogout className="w-5 h-5 opacity-40 group-hover:opacity-100" />
                           <span className="text-[9px] font-black uppercase tracking-widest">Sign Out</span>
                       </button>
                   </motion.div>
                )}
            </AnimatePresence>
          </div>
        ) : (
          <Link to="/login">
            <button className="flex items-center gap-3 sm:gap-4 glass !px-4 sm:!px-6 py-2 sm:py-2.5 border-white/10 hover:bg-white/5 transition-all group relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
                <div className="relative flex items-center gap-2 sm:gap-3">
                   <div className="relative">
                      <FcGoogle className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10" />
                      <div className="absolute inset-0 bg-white blur-md opacity-40 rounded-full scale-150" />
                   </div>
                   <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white">Sign In</span>
                </div>
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
