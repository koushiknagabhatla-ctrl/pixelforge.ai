import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineSparkles, HiOutlineLightningBolt, HiOutlineChatAlt2, HiArrowRight } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#010101] overflow-x-hidden pt-20 selection:bg-white/10">
      <div className="bg-animated" />
      <div className="absolute inset-0 neural-grain" />

      {/* 🌌 HERO SECTION */}
      <section className="relative px-6 py-24 sm:py-32 flex flex-col items-center text-center overflow-hidden">
        {/* Spatial Depth Accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.015] blur-[120px] rounded-full -z-10 animate-pulse" />
        
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="relative z-10 space-y-12 max-w-4xl"
        >
            <div className="inline-block">
                <div className="glass-text-inner flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white/50">Neural Synthesis v17.0</span>
                </div>
            </div>

            <h1 className="text-5xl sm:text-[64px] font-black leading-[1] tracking-tighter text-glass pb-2">
                Pixel Forge AI
            </h1>

            <div className="max-w-2xl mx-auto">
                <div className="glass-text-inner p-8 border-white/5 bg-white/[0.005]">
                    <p className="text-[12px] sm:text-[13px] text-gray-500 font-bold max-w-xl mx-auto leading-relaxed uppercase tracking-[0.2em]">
                      A unified laboratory for high-fidelity image synthesis and neural asset restoration. 
                      Precision-engineered for the modern creative architect.
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
                <Link to="/signup">
                  <button className="btn-monochrome group relative overflow-hidden h-16">
                    <span className="relative z-10 flex items-center gap-4">
                        Initialize <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-10 py-5 glass border border-white/10 text-[9px] font-black uppercase tracking-[0.5em] hover:bg-white/5 transition-all h-16">
                    Authorize Identity
                  </button>
                </Link>
            </div>
        </motion.div>
      </section>

      {/* 🛰️ CORE PROTOCOLS */}
      <section className="px-6 py-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Generation", 
              desc: "Deploying Flux-1.1 Pro for high-fidelity visual constructs.", 
              icon: HiOutlineSparkles
            },
            { 
              title: "Enhancement", 
              desc: "Localized asset restoration using the Klein protocol.", 
              icon: HiOutlineLightningBolt
            },
            { 
              title: "Nexus AI", 
              desc: "Direct semantic link to our core architectural hub.", 
              icon: HiOutlineChatAlt2
            }
          ].map((tool, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="glass p-10 border border-white/5 flex flex-col gap-6 group hover:border-white/10 transition-all duration-700 shadow-4xl h-full"
            >
              <div className="w-14 h-14 glass-strong flex items-center justify-center text-white/30 border border-white/10 group-hover:text-white transition-colors duration-700">
                  <tool.icon className="w-7 h-7" />
              </div>
              <div className="space-y-3">
                  <div className="inline-block glass-text-inner !px-4 !py-1 mb-2">
                    <h3 className="text-[14px] font-black text-white tracking-widest uppercase">{tool.title}</h3>
                  </div>
                  <p className="text-gray-600 font-bold text-[10px] uppercase tracking-widest leading-loose">
                    {tool.desc}
                  </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🏙️ FOOTER */}
      <footer className="px-6 py-20 border-t border-white/5 mt-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="space-y-4">
              <div className="flex items-center gap-4">
                  <div className="w-8 h-8 glass flex items-center justify-center border-white/10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2.5" strokeLinecap="square"/>
                      </svg>
                  </div>
                  <span className="glass-text-inner !px-4 !py-1">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em]">Pixel Forge AI</h2>
                  </span>
              </div>
              <p className="text-[9px] text-gray-800 font-black uppercase tracking-widest ml-14">Neural Alpha Phase v17.0</p>
           </div>
           
           <div className="flex items-center gap-10">
              <div className="text-right">
                <p className="text-[9px] text-gray-700 font-black uppercase tracking-widest mb-2">Developed By</p>
                <h3 className="text-[11px] font-black text-white hover:text-gray-400 transition-colors uppercase tracking-[0.4em]">Koushik Nagabhatla</h3>
              </div>
              <div className="flex gap-4">
                 <a href="https://github.com/koushiknagabhatla-ctrl" target="_blank" rel="noreferrer" className="w-10 h-10 glass flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <FaGithub className="w-5 h-5" />
                 </a>
                 <a href="https://koushikportfolio-peach.vercel.app/" target="_blank" rel="noreferrer" className="w-10 h-10 glass flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <HiArrowRight className="w-5 h-5 -rotate-45" />
                 </a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
