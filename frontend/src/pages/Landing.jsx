import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlineSparkles, HiOutlineCube, HiOutlineLightningBolt, HiOutlineGlobeAlt, HiOutlinePresentationChartBar } from 'react-icons/hi'
import useAuthStore from '../store/useAuthStore'

const revealVariant = {
  hidden: { y: 60, opacity: 0, filter: 'blur(10px)' },
  show: { 
    y: 0, 
    opacity: 1, 
    filter: 'blur(0px)',
    transition: { type: "spring", damping: 30, stiffness: 80 }
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

  const tools = [
    { title: 'NEURAL GENERATOR', icon: HiOutlineSparkles, desc: 'Architecting high-fidelity synthetics from pure text-intent.' },
    { title: 'MATRIX ENHANCER', icon: HiOutlineLightningBolt, desc: 'Upscaling assets through sub-pixel reconstruction algorithms.' },
    { title: 'SYNTHESIS CHAT', icon: HiOutlineGlobeAlt, desc: 'Natural language dialogue for complex asset orchestration.' },
    { title: 'ANALYTICS CORE', icon: HiOutlinePresentationChartBar, desc: 'Real-time telemetry on neural yield and synthetic stability.' }
  ]

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      {/* Cinematic Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent z-[110] origin-left"
        style={{ scaleX }}
      />

      {/* 🚀 HERO SECTION (Screenshot 1 Alignment) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Hyper-Atmospheric Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.12)_0%,transparent 70%)]" />
        <div className="absolute inset-0 opacity-[0.03] neural-grain" />
        
        <motion.div
           initial="hidden"
           animate="show"
           className="relative z-10 w-full max-w-7xl text-center"
        >
            <motion.span 
              variants={revealVariant}
              className="text-[10px] font-black text-indigo-500 uppercase tracking-[1em] mb-12 block"
            >
                The Architect's Console
            </motion.span>

            <motion.h1 
               variants={revealVariant}
               className="text-[14vw] sm:text-[11vw] font-black leading-[0.8] tracking-tighter mb-12 flex flex-wrap justify-center items-baseline"
            >
               <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">PIXEL</span>
               <span className="text-white/10 ml-6 hover:text-white/20 transition-colors cursor-default">FORGE</span>
            </motion.h1>

            <motion.p 
               variants={revealVariant}
               className="text-[10px] sm:text-[11px] font-bold text-white/40 uppercase tracking-[0.6em] mb-16 max-w-2xl mx-auto leading-loose"
            >
                Synthetic Vision & Neural Image Synthesis <br />
                <span className="opacity-50">Precision Protocol v3.0 // Architect Engine</span>
            </motion.p>

            <motion.div 
              variants={revealVariant}
              className="flex flex-col sm:flex-row items-center justify-center gap-8"
            >
                <Link 
                  to={user ? "/chatbot" : "/login"}
                  className="px-14 py-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-4 shadow-[0_20px_60px_rgba(255,255,255,0.2)]"
                >
                  Enter Forge <HiOutlineArrowRight className="w-4 h-4" />
                </Link>
                
                <Link 
                  to="/login"
                  className="px-14 py-6 bg-transparent border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-white/5 hover:border-white/20 transition-all"
                >
                  Sign In
                </Link>
            </motion.div>
        </motion.div>

        {/* 📐 SCROLL INDICATOR - Correct Positioned Right */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="fixed bottom-10 right-10 hidden lg:flex flex-col items-end gap-6 z-50 pointer-events-none"
        >
            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.8em] vertical-text">Scroll to Decode</span>
            <div className="w-[1px] h-24 bg-gradient-to-b from-white/20 via-white/5 to-transparent flex flex-col justify-start">
              <motion.div 
                animate={{ y: [0, 96, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="w-full h-8 bg-indigo-500/40 blur-[2px]"
              />
            </div>
        </motion.div>
      </section>

      {/* 🏛️ ABOUT THE FORGE - Cinematic Professional Section */}
      <section id="about" className="relative py-60 px-6 lg:px-20 max-w-7xl mx-auto">
          <motion.div 
             initial="hidden"
             whileInView="show"
             viewport={{ once: true, margin: "-100px" }}
             className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center"
          >
              <div className="space-y-16">
                  <motion.div variants={revealVariant}>
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.6em] mb-6 block">Legacy & Protocol</span>
                      <h2 className="text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-8">
                        The Neural <br /> Architecture.
                      </h2>
                      <div className="w-20 h-1 bg-white/10 mb-12" />
                  </motion.div>

                  <motion.div variants={revealVariant} className="space-y-8">
                      <p className="text-xl text-white/60 leading-relaxed font-light italic">
                          "PixelForge AI is not just a tool; it is a collaborative neural bridge between human intent and synthetic reality."
                      </p>
                      <p className="text-md text-white/40 leading-relaxed font-medium">
                          Engineered by <span className="text-white">Koushik</span>, the platform utilizes proprietary V3 Matrix world-building architecture. 
                          By prioritizing sub-pixel precision and extreme-fidelity restoration, we empower the creators of the next digital frontier.
                      </p>
                  </motion.div>

                  <motion.div 
                      variants={revealVariant}
                      className="glass p-1px rounded-3xl group transition-all duration-700"
                  >
                      <div className="glass-strong p-10 rounded-3xl bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-6">Omnipotent Synthesis</h4>
                          <p className="text-xs text-white/30 font-medium leading-[2] uppercase tracking-widest">
                             Adaptive Neural Yield / Recursive Rendering / Matrix Stabilization
                          </p>
                      </div>
                  </motion.div>
              </div>

              {/* Tool Gallery Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                  {tools.map((tool, i) => (
                      <motion.div 
                        key={tool.title}
                        variants={revealVariant}
                        className="glass-premium p-8 rounded-[2rem] border-white/5 group hover:bg-white/5 hover:border-white/10 transition-all duration-500 flex flex-col items-center text-center gap-8"
                      >
                          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-500 group-hover:bg-white group-hover:text-black transition-all duration-700">
                              <tool.icon className="w-8 h-8" />
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest leading-tight">{tool.title}</h4>
                            <p className="text-[11px] text-white/30 font-medium leading-relaxed">{tool.desc}</p>
                          </div>
                      </motion.div>
                  ))}
                  
                  {/* Backdrop Decoration */}
                  <div className="absolute -z-10 inset-0 pointer-events-none">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-indigo-600/5 blur-[120px] rounded-full" />
                  </div>
              </div>
          </motion.div>
      </section>

      {/* Professional CTA Section */}
      <section className="py-40 relative px-6 overflow-hidden">
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="max-w-4xl mx-auto glass-strong p-20 rounded-[4rem] border-white/10 text-center relative z-10"
        >
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-10 leading-none">Ready to Forge?</h3>
            <p className="text-xs text-white/40 font-bold uppercase tracking-[0.4em] mb-12">Universal License Matrix :: Access Authorized</p>
            <Link 
              to="/signup" 
              className="inline-flex px-16 py-6 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all"
            >
              Initialize Identity
            </Link>
        </motion.div>
        
        {/* Abstract Geometry */}
        <div className="absolute top-1/2 left-0 w-64 h-64 border border-white/[0.03] rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 border border-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
      </section>
    </div>
  )
}
