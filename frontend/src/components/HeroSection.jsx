import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight } from 'react-icons/hi'

export default function HeroSection() {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden neural-grain">
      {/* Background Neural Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] animate-archon-pulse pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-8"
        >
            <span className="text-[10px] font-black uppercase tracking-[1em] text-gray-500">The Architect's Console</span>
        </motion.div>

        <h1 className="text-7xl md:text-9xl archon-heading mb-8 text-white">
          Pixel <span className="text-white/20">Forge</span>
        </h1>

        <p className="text-sm md:text-base font-medium text-gray-500 uppercase tracking-[0.4em] max-w-2xl mx-auto mb-16 leading-relaxed">
          Synthetic Vision & Neural Image <span className="text-white">Synthesis</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/tools" className="pill-button pill-primary flex items-center gap-3 group">
            Enter Forge
            <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/login" className="pill-button pill-secondary">
            Sign In
          </Link>
        </div>
      </motion.div>

      {/* Discover Gallery Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
          <span className="text-[8px] font-bold text-gray-700 uppercase tracking-[0.5em]">Discover Imagery</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </div>
  )
}
