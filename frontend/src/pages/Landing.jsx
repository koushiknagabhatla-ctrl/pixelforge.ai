import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineSparkles, HiOutlineLightningBolt, HiOutlineChatAlt2, HiArrowRight } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#010101] overflow-x-hidden pt-20 selection:bg-white/10">
      <div className="bg-animated" />
      <div className="absolute inset-0 neural-grain opacity-[0.05]" />

      {/* 🌌 HERO SECTION */}
      <section className="relative px-6 py-24 sm:py-40 flex flex-col items-center text-center overflow-hidden">
        {/* Spatial Depth Accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full -z-10 animate-pulse" />
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="relative z-10 space-y-10 max-w-5xl"
        >
            <div className="inline-flex items-center gap-3 px-6 py-2 glass border border-white/5 shadow-2xl">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">Architectural Synthesis v16.1</span>
            </div>

            <h1 className="text-6xl sm:text-[110px] font-black leading-[0.9] tracking-tighter text-glass pb-4">
                Pixel Forge AI
            </h1>

            <p className="text-sm sm:text-lg text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed uppercase tracking-[0.1em]">
              The next evolution in generative architecture. A unified neural workspace for high-fidelity image synthesis, 
              precision asset enhancement, and conversational intelligence. Forged for the elite.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
                <Link to="/signup">
                  <button className="btn-monochrome group relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-3">
                        Initialize Session <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-10 py-5 glass border border-white/10 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all">
                    Authorize Identity
                  </button>
                </Link>
            </div>
        </motion.div>
      </section>

      {/* 🛰️ CORE PROTOCOLS (Tools) */}
      <section className="px-6 py-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              title: "Image Generation", 
              desc: "Deploy the Segmind Flux Engine to forge high-fidelity visual constructs.", 
              icon: HiOutlineSparkles,
              mode: 'synth'
            },
            { 
              title: "Asset Enhancer", 
              desc: "Deep-scale restoration using the specialized Klein neural protocol.", 
              icon: HiOutlineLightningBolt,
              mode: 'enhance'
            },
            { 
              title: "Forge AI", 
              desc: "Direct neural link to our semantic architectural core.", 
              icon: HiOutlineChatAlt2,
              mode: 'chat'
            }
          ].map((tool, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass-premium p-12 border border-white/5 flex flex-col gap-8 group hover:border-white/10 transition-all duration-700 shadow-4xl h-full"
            >
              <div className="w-16 h-16 glass-strong flex items-center justify-center text-white/40 border border-white/10 group-hover:text-white transition-colors duration-700">
                  <tool.icon className="w-8 h-8" />
              </div>
              <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white tracking-tight underline decoration-white/10 underline-offset-8 decoration-2">{tool.title}</h3>
                  <p className="text-gray-600 font-bold text-[11px] uppercase tracking-widest leading-loose">
                    {tool.desc}
                  </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🏙️ ARCHITECTURAL FOOTER */}
      <footer className="px-6 py-20 border-t border-white/5 mt-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="space-y-4">
              <div className="flex items-center gap-4">
                  <div className="w-8 h-8 glass flex items-center justify-center border-white/10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2.5" strokeLinecap="square"/>
                      </svg>
                  </div>
                  <h2 className="text-sm font-black uppercase tracking-[0.4em]">Pixel Forge AI</h2>
              </div>
              <p className="text-[10px] text-gray-800 font-black uppercase tracking-widest">Neural Alpha Phase v16.1</p>
           </div>
           
           <div className="flex items-center gap-12">
              <div className="text-right">
                <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest mb-2">Developed By</p>
                <h3 className="text-sm font-black text-white hover:text-gray-400 transition-colors uppercase tracking-widest">Koushik Nagabhatla</h3>
              </div>
              <div className="flex gap-6">
                 <a href="https://github.com/koushiknagabhatla-ctrl" target="_blank" rel="noreferrer" className="w-12 h-12 glass flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <FaGithub className="w-6 h-6" />
                 </a>
                 <a href="https://koushikportfolio-peach.vercel.app/" target="_blank" rel="noreferrer" className="w-12 h-12 glass flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <HiArrowRight className="w-6 h-6 -rotate-45" />
                 </a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
