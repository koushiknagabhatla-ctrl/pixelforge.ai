import { motion, useScroll, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlineSparkles, HiOutlineCube, HiOutlineLightningBolt } from 'react-icons/hi'
import useAuthStore from '../store/useAuthStore'

const revealVariant = {
  hidden: { y: 40, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", damping: 25, stiffness: 80 }
  }
}

export default function Landing() {
  const { user } = useAuthStore()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const aboutFeatures = [
    { title: 'NEURAL ENGINE', desc: 'Proprietary V3 architecture for extreme-fidelity asset restoration.' },
    { title: 'SYNTHESIS YIELD', desc: 'Accelerated GPU cycles delivering architectural drafts in sub-second timeframes.' },
    { title: 'MATRIX ARCH', desc: 'Deep-aware spatial depth estimation for immersive world-building.' }
  ]

  return (
    <div className="relative min-h-screen bg-[#050505] text-white">
      {/* Cinematic Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 z-[110] origin-left"
        style={{ scaleX }}
      />

      {/* 🚀 HERO SECTION (Screenshot 1 Alignment) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Deep Atmospheric Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.08)_0%,transparent 70%)]" />
        
        <motion.div
           initial="hidden"
           animate="show"
           className="relative z-10 w-full max-w-7xl text-center"
        >
            <motion.span 
              variants={revealVariant}
              className="text-[10px] font-black text-white/40 uppercase tracking-[1em] mb-12 block"
            >
                The Architect's Console
            </motion.span>

            <motion.h1 
               variants={revealVariant}
               className="text-[12vw] sm:text-[10vw] font-black leading-[0.85] tracking-tighter mb-12 flex flex-wrap justify-center items-baseline"
            >
               <span className="text-white">PIXEL</span>
               <span className="text-white/10 ml-4">FORGE</span>
            </motion.h1>

            <motion.p 
               variants={revealVariant}
               className="text-[10px] sm:text-xs font-bold text-white/50 uppercase tracking-[0.5em] mb-16"
            >
                Synthetic Vision & Neural Image Synthesis
            </motion.p>

            <motion.div 
              variants={revealVariant}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
                <Link 
                  to={user ? "/chatbot" : "/login"}
                  className="px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                >
                  Enter Forge <HiOutlineArrowRight className="w-4 h-4" />
                </Link>
                
                <Link 
                  to="/login"
                  className="px-12 py-5 bg-transparent border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-white/5 transition-colors"
                >
                  Sign In
                </Link>
            </motion.div>
        </motion.div>

        {/* Floating Indicator */}
        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.8em]">Scroll to Decode</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* 🏛️ ABOUT SECTION (Scroll Reveal) */}
      <section className="relative py-40 px-6 lg:px-20 max-w-7xl mx-auto">
          <motion.div 
             initial="hidden"
             whileInView="show"
             viewport={{ once: true, margin: "-100px" }}
             className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center"
          >
              <div className="space-y-12">
                  <motion.div variants={revealVariant}>
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em] mb-4 block">About Architecture</span>
                      <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tighter uppercase">
                        The Future of <br /> Vision Synthesis
                      </h2>
                  </motion.div>

                  <motion.p variants={revealVariant} className="text-lg text-white/50 leading-relaxed font-medium">
                      PixelForge AI is a high-performance neural engine designed for architects of the future. 
                      Utilizing proprietary V3 Matrix architecture, we deliver bit-perfect asset generation 
                      and restoration at sub-pixel precision.
                  </motion.p>

                  <div className="grid grid-cols-1 gap-8">
                      {aboutFeatures.map((f, i) => (
                          <motion.div 
                            key={f.title}
                            variants={revealVariant}
                            className="glass-premium p-8 rounded-3xl border-white/5 group hover:bg-white/5 transition-all"
                          >
                              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-3">{f.title}</h4>
                              <p className="text-[13px] text-white/40 font-medium leading-relaxed">{f.desc}</p>
                          </motion.div>
                      ))}
                  </div>
              </div>

              {/* Decorative Visual Bridge */}
              <motion.div 
                variants={revealVariant}
                className="hidden lg:block relative aspect-square"
              >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/10 rounded-full blur-[120px]" />
                  <div className="relative h-full w-full border border-white/5 rounded-[4rem] flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.03] neural-grain" />
                      <HiOutlineCube className="w-40 h-40 text-white/10 animate-pulse" />
                  </div>
              </motion.div>
          </motion.div>
      </section>
    </div>
  )
}
