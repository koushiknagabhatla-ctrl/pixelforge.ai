import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineCube } from 'react-icons/hi'
import useAuthStore from '../store/useAuthStore'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

const item = {
  hidden: { y: 60, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      type: "spring", 
      damping: 20, 
      stiffness: 100 
    } 
  }
}

const features = [
  { icon: HiOutlineLightningBolt, title: 'Extreme Velocity', desc: 'GPU-accelerated synthesis delivering results in sub-second cycles.' },
  { icon: HiOutlineShieldCheck, title: 'Neural Integrity', desc: 'Bit-perfect restoration of architectural and photographic assets.' },
  { icon: HiOutlineCube, title: 'Spatial Engine', desc: 'Proprietary 3D-aware depth estimation for immersive rendering.' }
]

export default function Landing() {
  const { user } = useAuthStore()

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-40 px-6 overflow-hidden">
      {/* Background Mesh Flare - Local Enhancement */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none select-none" />
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl w-full text-center relative z-10"
      >
        <motion.div variants={item} className="mb-6">
          <span className="px-4 py-1.5 rounded-full glass border-white/5 text-[10px] sm:text-xs font-mono font-bold text-indigo-400 uppercase tracking-[0.3em]">
            PixelForge Engine v10.0
          </span>
        </motion.div>

        <motion.h1 
          variants={item}
          className="text-5xl sm:text-7xl lg:text-8xl font-black mb-10 tracking-tighter leading-[0.9] text-white"
        >
          {["FORGING", "THE", "FUTURE", "OF", "VISION"].map((word, i) => (
            <motion.span 
              key={i} 
              className="inline-block mr-[0.2em] last:mr-0"
              whileHover={{ scale: 1.05, color: '#6366f1' }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p 
          variants={item}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 font-medium leading-relaxed mb-12"
        >
          An elite neural ecosystem for professional image synthesis, 
          architectural restoration, and high-fidelity vision engineering.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-32">
          <Link 
            to={user ? "/chatbot" : "/login"}
            className="group relative px-10 py-5 btn-primary overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3 text-sm">
              {user ? 'Enter Command Center' : 'Initialize Session'}
              <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          
          {!user && (
            <Link to="/signup" className="px-10 py-5 btn-secondary text-sm">
              Create Index
            </Link>
          )}
        </motion.div>

        {/* Feature Grid with Bobbing Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {features.map((f, i) => (
             <motion.div
               key={f.title}
               variants={item}
               whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(99,102,241,0.15)" }}
               animate={{ y: [0, -4, 0] }}
               transition={{ 
                 y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 },
                 default: { type: "spring", damping: 15 }
               }}
               className="glass p-8 text-left group transition-colors hover:border-indigo-500/30"
             >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
                    <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {f.desc}
                </p>
             </motion.div>
           ))}
        </div>
      </motion.div>

      {/* Discovery Footer Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-4 text-slate-600"
      >
          <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Explore Architecture</span>
          <div className="w-px h-12 bg-gradient-to-b from-indigo-500/40 to-transparent" />
      </motion.div>
    </div>
  )
}
