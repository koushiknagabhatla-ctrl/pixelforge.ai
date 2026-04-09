import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlineSparkles, HiOutlineLightningBolt, HiOutlineGlobeAlt, HiOutlinePresentationChartBar } from 'react-icons/hi'
import useAuthStore from '../store/useAuthStore'

const revealVariant = {
  hidden: { y: 100, opacity: 0, filter: 'blur(20px)' },
  show: { 
    y: 0, 
    opacity: 1, 
    filter: 'blur(0px)',
    transition: { type: "spring", damping: 40, stiffness: 60 }
  }
}

export default function Landing() {
  const { user } = useAuthStore()
  const { scrollYProgress } = useScroll()
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const tools = [
    { title: 'IMAGE GENERATOR', icon: HiOutlineSparkles, desc: 'Architecting high-fidelity synthetics from pure text-intent.' },
    { title: 'IMAGE ENHANCER', icon: HiOutlineLightningBolt, desc: 'Upscaling assets through sub-pixel reconstruction algorithms.' },
    { title: 'FORGE AI', icon: HiOutlineGlobeAlt, desc: 'Natural language dialogue for complex asset orchestration.' },
    { title: 'SYNC ANALYTICS', icon: HiOutlinePresentationChartBar, desc: 'Real-time telemetry on neural yield and synthetic stability.' }
  ]

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-white/10 font-sans overflow-hidden">
      {/* Dynamic Background */}
      <div className="bg-animated" />
      <div className="fixed inset-0 opacity-[0.015] neural-grain pointer-events-none" />

      {/* 🚀 HERO SECTION — MONOCHROME ELITE */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        <motion.div
           initial="hidden"
           animate="show"
           className="relative z-10 w-full max-w-7xl text-center"
        >
            <motion.div 
              variants={revealVariant}
              className="flex items-center justify-center gap-6 mb-16"
            >
                <div className="h-px w-10 bg-gray-800" />
                <span className="text-[10px] font-black text-white uppercase tracking-[1em]">The Architect's Console</span>
                <div className="h-px w-10 bg-gray-800" />
            </motion.div>

            <motion.h1 
               variants={revealVariant}
               style={{ scale: useTransform(scaleProgress, [0, 0.2], [1, 1.1]) }}
               className="text-[16vw] sm:text-[13vw] font-black leading-[0.85] tracking-tighter mb-16 flex flex-wrap justify-center items-baseline"
            >
               <span className="text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.15)]">PIXEL</span>
               <span className="text-white/5 ml-8 hover:text-white/10 transition-colors cursor-default">FORGE</span>
            </motion.h1>

            <motion.p 
               variants={revealVariant}
               className="text-[10px] sm:text-[12px] font-black text-gray-500 uppercase tracking-[0.8em] mb-20 max-w-3xl mx-auto leading-loose"
            >
                Synthetic Vision & Neural Logic Synthesis <br />
                <span className="text-gray-800">Precision Protocol v12.0 // Monochrome Architecture</span>
            </motion.p>

            <motion.div 
              variants={revealVariant}
              className="flex flex-col sm:flex-row items-center justify-center gap-12"
            >
                <Link 
                  to={user ? "/chatbot" : "/login"}
                  className="px-20 py-8 bg-white text-black text-[11px] font-black uppercase tracking-[0.6em] rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-6 shadow-[0_20px_80px_rgba(255,255,255,0.2)]"
                >
                  Enter Forge <HiOutlineArrowRight className="w-5 h-5" />
                </Link>
                
                <Link 
                  to="/login"
                  className="px-20 py-8 bg-transparent border border-white/5 text-white text-[11px] font-black uppercase tracking-[0.6em] rounded-full hover:bg-white hover:text-black transition-all"
                >
                  Sign In
                </Link>
            </motion.div>
        </motion.div>

        {/* 📐 SCROLL INDICATOR — ELITE FIXED POSITION */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 2 }}
            className="fixed bottom-12 right-12 hidden lg:flex flex-col items-end gap-8 z-[90] pointer-events-none"
        >
            <div className="flex flex-col items-end gap-2 text-right">
              <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.85em]">Scroll to Decode</span>
              <span className="text-[7px] font-bold text-gray-800 uppercase tracking-[0.4em]">Section :: Architectural View</span>
            </div>
            <div className="w-[1px] h-32 bg-white/5 overflow-hidden flex flex-col justify-start">
              <motion.div 
                animate={{ y: [0, 128, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-full h-12 bg-white/40 blur-[1px]"
              />
            </div>
        </motion.div>
      </section>

      {/* 🏛️ ABOUT THE FORGE — PROFESSIONAL TEXT PARALLAX */}
      <section id="about" className="relative py-80 px-6 lg:px-20 max-w-7xl mx-auto">
          <motion.div 
             initial="hidden"
             whileInView="show"
             viewport={{ once: true, margin: "-100px" }}
             className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-start"
          >
              <div className="space-y-24 sticky top-40">
                  <motion.div variants={revealVariant}>
                      <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.8em] mb-8 block">Legacy v12.0</span>
                      <h2 className="text-6xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase mb-12">
                        The Neural <br /> Architecture.
                      </h2>
                      <div className="w-24 h-[1px] bg-white/10" />
                  </motion.div>

                  <motion.div variants={revealVariant} className="space-y-12">
                      <p className="text-2xl text-gray-400 leading-relaxed font-medium tracking-tight">
                          "PixelForge AI is a high-performance neural engine designed for the architects of the future."
                      </p>
                      <p className="text-md text-gray-600 leading-relaxed font-bold uppercase tracking-widest">
                          Utilizing proprietary V12 architecture, we deliver bit-perfect asset generation and restoration at sub-pixel precision.
                      </p>
                  </motion.div>
              </div>

              {/* Tool Gallery Section — MONOCHROME GLASS */}
              <div className="grid grid-cols-1 gap-10 relative">
                  {tools.map((tool, i) => (
                      <motion.div 
                        key={tool.title}
                        variants={revealVariant}
                        whileHover={{ x: 20 }}
                        className="glass-premium p-12 flex flex-col sm:flex-row items-center gap-12 group hover:bg-white hover:border-white transition-all duration-700"
                      >
                          <div className="w-24 h-24 rounded-[2.5rem] glass flex items-center justify-center text-white group-hover:bg-black group-hover:text-white transition-all duration-700 border border-white/5">
                              <tool.icon className="w-10 h-10" />
                          </div>
                          <div className="space-y-4 text-center sm:text-left">
                            <h4 className="text-xs font-black text-white group-hover:text-black uppercase tracking-[0.4em] transition-colors">{tool.title}</h4>
                            <p className="text-[11px] text-gray-600 group-hover:text-black/60 font-black uppercase tracking-widest transition-colors leading-relaxed">
                                {tool.desc}
                            </p>
                          </div>
                      </motion.div>
                  ))}
                  
                  {/* Neural Glow Decor */}
                  <div className="absolute -z-10 inset-0 pointer-events-none">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-white/[0.015] blur-[150px] rounded-full" />
                  </div>
              </div>
          </motion.div>
      </section>

      {/* Professional CTA Section */}
      <section className="py-60 relative px-6 overflow-hidden">
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5 }}
           className="max-w-5xl mx-auto glass-strong p-32 rounded-[5rem] border-white/5 text-center relative z-10 shadow-3xl bg-white/[0.005]"
        >
            <h3 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-16 leading-[0.8]">Ready <br /> to Forge?</h3>
            <p className="text-[10px] text-gray-800 font-black uppercase tracking-[0.8em] mb-20 leading-loose">
                Universal Architecture Matrix <br />
                Neural Verification Level 12.0 :: High-Contrast Yield
            </p>
            <Link 
              to="/signup" 
              className="inline-flex px-24 py-8 bg-white text-black text-[11px] font-black uppercase tracking-[0.6em] rounded-full hover:scale-110 active:scale-95 transition-all shadow-2xl"
            >
              Initialize Identity
            </Link>
        </motion.div>
        
        {/* Abstract Geometry */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] border border-white/[0.02] rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-[800px] h-[800px] border border-white/[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />
      </section>
    </div>
  )
}
