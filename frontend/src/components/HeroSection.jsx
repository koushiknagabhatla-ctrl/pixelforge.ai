import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight } from 'react-icons/hi'
import useAuthStore from '../store/useAuthStore'

export default function HeroSection() {
  const { user } = useAuthStore();

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden selection:bg-white selection:text-black">
      {/* Background Neural Pulse - Subtle Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-8"
        >
            <span className="text-[9px] font-black uppercase tracking-[1em] text-white/20">The Architect's Console</span>
        </motion.div>

        <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter mb-8 text-white">
          Pixel <span className="text-white/10">Forge</span>
        </h1>

        <p className="text-[11px] md:text-xs font-medium text-white/30 uppercase tracking-[0.5em] max-w-2xl mx-auto mb-16 leading-relaxed">
          Synthetic Vision & Neural Image <span className="text-white">Synthesis</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            to={user ? "/chatbot" : "/login"} 
            className="px-10 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all duration-500 flex items-center gap-3 group shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
          >
            {user ? "Go to Chatbot" : "Enter Forge"}
            <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {!user && (
            <Link to="/login" className="px-10 py-5 rounded-full border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all duration-500 active:scale-95">
              Sign In
            </Link>
          )}
        </div>
      </motion.div>

      {/* Discover Hint (Refined) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute bottom-10 flex flex-col items-center gap-4"
      >
          <span className="text-[8px] font-black text-gray-900 uppercase tracking-[0.6em] opacity-30 select-none">Discover Imagery</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/10 to-transparent" />
      </motion.div>
    </div>
  )
}
