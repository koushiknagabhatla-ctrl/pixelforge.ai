import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  HiOutlineSparkles, 
  HiOutlineLightningBolt, 
  HiOutlineChatAlt2, 
  HiArrowRight,
  HiOutlineCube,
  HiOutlineTrendingUp,
  HiOutlineTerminal
} from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { useRef } from 'react';

// Neural Background Asset
const BG_ASSET = "https://c.anhvn.com/assets/pixelforge_nexus_background.png"; // Fallback placeholder
const HERO_ASSET = "https://c.anhvn.com/assets/nexus_core_architecture.png";

const MotionSection = ({ children, className }) => (
  <motion.section
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.section>
);

const Landing = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#010101] overflow-x-hidden pt-20 selection:bg-white/10 relative">
      <div className="bg-animated" />
      
      {/* 🌌 CINEMATIC UNDERLAY */}
      <motion.div 
        style={{ y: yParallax }}
        className="fixed inset-0 z-0 opacity-[0.2] pointer-events-none filter blur-[80px] scale-110"
      >
        <img src={BG_ASSET} alt="Neural Void" className="w-full h-full object-cover grayscale" />
      </motion.div>
      
      <div className="absolute inset-0 neural-grain z-10" />

      {/* 🏙️ HERO PRECISION (Compressed) */}
      <section className="relative min-h-[90vh] px-6 py-20 flex flex-col items-center justify-center text-center overflow-hidden z-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.01] blur-[140px] rounded-full -z-10" />
        
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="space-y-12 max-w-4xl w-full"
        >
            <div className="inline-block">
                <div className="glass-text-inner flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                    <span className="text-[8.5px] font-black uppercase tracking-[0.6em] text-white/50">Neural Framework v20.0</span>
                </div>
            </div>

            <div className="relative group mx-auto w-fit">
                <div className="glass-hyper p-10 sm:p-14 border-white/[0.04] relative">
                    <h1 className="text-4xl sm:text-[56px] font-black leading-none tracking-tighter text-glass relative z-10">
                        Pixel Forge AI
                    </h1>
                </div>
            </div>

            <div className="max-w-2xl mx-auto">
                <div className="glass-text-inner !p-6 !px-12 border-white/5 bg-white/[0.005]">
                    <p className="text-[11px] text-gray-400 font-bold max-w-xl mx-auto leading-loose uppercase tracking-[0.2em]">
                      A high-density laboratory for high-fidelity assets. 
                      Precision-engineered for the modern creative architect.
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10">
                <Link to="/signup">
                  <button className="btn-monochrome h-16 px-12">
                    Initialize Matrix
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-10 py-5 glass border border-white/10 text-[9px] font-black uppercase tracking-[0.5em] hover:bg-white/5 transition-all h-16 flex items-center gap-4">
                    Authorize Identity <HiArrowRight className="w-4 h-4" />
                  </button>
                </Link>
            </div>
        </motion.div>
      </section>

      {/* 🏛️ THE MISSION (Compressed Matter) */}
      <MotionSection className="px-6 py-24 max-w-7xl mx-auto z-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
                <div className="glass-text-inner !px-4 !py-1">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Philosophy</span>
                </div>
                <div className="glass-premium p-10 border-white/5">
                    <h2 className="text-3xl font-black text-white tracking-tighter mb-6 leading-tight">
                        Synthetic Clarity.
                    </h2>
                    <p className="text-[12px] text-gray-500 font-bold leading-relaxed uppercase tracking-widest">
                        Pixel Forge bridges abstract imagination and digital materialization. Our engine synthesizes high-fidelity directives with architectural precision, allowing architects to manifest complex visual concepts through a direct neural handshake.
                    </p>
                </div>
            </div>
            <div className="relative glass-hyper p-3 border-white/5 shadow-2xl">
                <img src={HERO_ASSET} alt="Neural Hub" className="w-full h-auto rounded-[2rem] opacity-70 hover:opacity-100 transition-opacity duration-1000" />
            </div>
        </div>
      </MotionSection>

      {/* 🛰️ CORE PROTOCOLS (Compressed Matrix) */}
      <MotionSection className="px-6 py-24 z-20 relative">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 space-y-6">
                <div className="glass-text-inner !px-5 !py-1">
                    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30">Intelligence Matrix</span>
                </div>
                <h3 className="text-4xl font-black text-white tracking-tighter">Core Utilities</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { title: "SYNTHESIS", desc: "Flux-1.1 Pro generation engine.", icon: HiOutlineSparkles },
                { title: "RESTORATION", desc: "Klein 9B detail enhancement.", icon: HiOutlineLightningBolt },
                { title: "SEMANTICS", desc: "Direct neural chat hub.", icon: HiOutlineChatAlt2 }
            ].map((tool, i) => (
                <div key={i} className="glass-premium p-8 border border-white/5 flex flex-col gap-6 group">
                <div className="w-14 h-14 glass-strong flex items-center justify-center text-white/20 border-white/5 group-hover:text-white transition-colors duration-1000">
                    <tool.icon className="w-7 h-7" />
                </div>
                <div className="space-y-3">
                    <div className="glass-text-inner !px-4 !py-1">
                        <h3 className="text-[13px] font-black text-white tracking-widest uppercase">{tool.title}</h3>
                    </div>
                    <p className="text-gray-600 font-bold text-[9.5px] uppercase tracking-widest leading-loose">
                        {tool.desc}
                    </p>
                </div>
                </div>
            ))}
            </div>
        </div>
      </MotionSection>

      {/* 🗺️ NEURAL ROADMAP (High Density) */}
      <MotionSection className="px-6 py-32 max-w-5xl mx-auto z-20 relative">
        <div className="text-center mb-20 space-y-6">
            <div className="glass-text-inner !px-5 !py-1">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Trajectory</span>
            </div>
            <h3 className="text-3xl font-black text-white tracking-tighter">Platform Evolution</h3>
        </div>
        <div className="space-y-8">
            {[
                { phase: "Q2 26", title: "Video Synth", desc: "Volumetric interpolation.", icon: HiOutlineCube },
                { phase: "Q3 26", title: "Agent Handshake", desc: "Multi-agent tasks.", icon: HiOutlineTerminal },
                { phase: "Q4 26", title: "Nexus Expansion", desc: "Decentralized compute.", icon: HiOutlineTrendingUp }
            ].map((step, i) => (
                <div key={i} className="glass-premium p-8 border-white/5 flex items-center gap-10 group">
                    <div className="text-white/10 font-black text-3xl group-hover:text-white transition-colors tracking-tighter w-24 shrink-0">
                        {step.phase}
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="glass-text-inner !px-3 !py-0.5">
                            <h4 className="text-[11px] font-black text-white tracking-widest uppercase">{step.title}</h4>
                        </div>
                        <p className="text-gray-800 font-bold text-[9px] uppercase tracking-widest">{step.desc}</p>
                    </div>
                    <div className="w-12 h-12 glass flex items-center justify-center text-white/10 group-hover:text-white border-white/5">
                        <step.icon className="w-6 h-6" />
                    </div>
                </div>
            ))}
        </div>
      </MotionSection>

      {/* 🏙️ FOOTER */}
      <footer className="px-6 py-20 border-t border-white/5 mt-32 z-20 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                  <div className="w-10 h-10 glass flex items-center justify-center border-white/10 shadow-2xl">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2.5" strokeLinecap="square"/>
                      </svg>
                  </div>
                  <div className="glass-text-inner !px-5 !py-1">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em]">Pixel Forge AI</h2>
                  </div>
              </div>
              <p className="text-[9px] text-gray-800 font-bold uppercase tracking-widest ml-14">v20.0 Neural Alpha</p>
           </div>
           
           <div className="flex items-center gap-12 text-right">
              <div>
                <p className="text-[9px] text-gray-800 font-black uppercase tracking-widest mb-2">Architect</p>
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Koushik Nagabhatla</h3>
              </div>
              <div className="flex gap-4">
                 <a href="https://github.com/koushiknagabhatla-ctrl" target="_blank" rel="noreferrer" className="w-12 h-12 glass flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <FaGithub className="w-6 h-6" />
                 </a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
