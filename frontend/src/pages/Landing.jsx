import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

// Atomic Static Assets (Local)
const ASSETS = {
  nexus: "/assets/nexus.png",
  enhancer: "/assets/enhancer.png",
  entity: "/assets/entity.png"
};

const MotionSection = ({ children, className }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.section>
);

const Landing = () => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="min-h-screen bg-transparent overflow-x-hidden pt-20 selection:bg-white/10 relative z-10">
      <div className="absolute inset-0 neural-grain" />

      {/* 🏙️ HERO PRECISION (Atomic Scale) */}
      <section className="relative min-h-[85vh] px-10 py-20 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.01] blur-[150px] rounded-full -z-10" />
        
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="space-y-10 max-w-4xl w-full"
        >
            <div className="inline-block">
                <div className="glass-text-inner flex items-center gap-3">
                    <div className="w-1.2 h-1.2 rounded-full bg-white/40 animate-pulse" />
                    <span className="text-[7.5px] font-black uppercase tracking-[0.5em] text-white/40">Atomic Framework v23.0</span>
                </div>
            </div>

            <div className="relative group mx-auto w-fit">
                <div className="glass-hyper p-8 sm:p-10 border-white/[0.03] relative">
                    <h1 className="text-3xl sm:text-[36px] font-black leading-none tracking-tight text-glass relative z-10 uppercase">
                        Pixel Forge AI
                    </h1>
                </div>
            </div>

            <div className="max-w-xl mx-auto">
                <div className="glass-text-inner !p-4 !px-10 border-white/5 bg-white/[0.005]">
                    <p className="text-[9px] text-gray-500 font-bold max-w-lg mx-auto leading-relaxed uppercase tracking-[0.2em]">
                      A high-precision laboratory for neural asset synthesis. 
                      Surgical engineering for the modern creative architect.
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                <Link to="/signup">
                  <button className="btn-monochrome h-12 px-10 text-[9px]">
                    Initialize Matrix
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-8 py-4 glass border border-white/10 text-[8px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all h-12 flex items-center gap-3">
                    Authorize Identity <HiArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
            </div>
        </motion.div>
      </section>

      {/* 🏛️ THE MISSION */}
      <MotionSection className="px-10 py-20 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-8">
                <div className="glass-text-inner !px-4 !py-1">
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30">Philosophy</span>
                </div>
                <div className="glass-premium p-10 border-white/5">
                    <h2 className="text-2xl font-black text-white tracking-tight mb-5 underline decoration-white/5 underline-offset-8">
                        Neural Clarity.
                    </h2>
                    <p className="text-[11px] text-gray-600 font-bold leading-loose uppercase tracking-widest">
                        Pixel Forge bridges abstract imagination and digital materialization. Our engine synthesizes high-fidelity directives with surgical precision, manifesting concepts through direct neural handshakes with the world's most advanced synthetic cores.
                    </p>
                </div>
            </div>
            <div className="lg:col-span-5 relative glass-hyper p-2 border-white/5 shadow-2xl opacity-60 hover:opacity-100 transition-opacity duration-1000">
                <img src={ASSETS.nexus} alt="Neural Hub" className="w-full h-auto rounded-[1.5rem]" />
            </div>
        </div>
      </MotionSection>

      {/* 🛰️ CORE PROTOCOLS */}
      <MotionSection className="px-10 py-20 relative bg-zinc-950/20">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-5">
                <div className="glass-text-inner !px-4 !py-1">
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30">Matrix Protocols</span>
                </div>
                <h3 className="text-3xl font-black text-white tracking-tight">System Utilities</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { title: "SYNTHESIS", desc: "Flux Generation Core.", icon: HiOutlineSparkles, img: ASSETS.nexus },
                { title: "RESTORATION", desc: "Klein Enhancement.", icon: HiOutlineLightningBolt, img: ASSETS.enhancer },
                { title: "SEMANTICS", desc: "Direct Neural Chat.", icon: HiOutlineChatAlt2, img: ASSETS.entity }
            ].map((tool, i) => (
                <div key={i} className="glass-premium p-6 border border-white/5 flex flex-col gap-5 group relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-1000 grayscale pointer-events-none">
                        <img src={tool.img} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative z-10 space-y-4">
                        <div className="w-12 h-12 glass flex items-center justify-center text-white/20 border-white/5 group-hover:text-white transition-colors duration-1000">
                            <tool.icon className="w-6 h-6" />
                        </div>
                        <div className="glass-text-inner !px-3 !py-1">
                            <h3 className="text-[11px] font-black text-white tracking-widest uppercase">{tool.title}</h3>
                        </div>
                        <p className="text-gray-700 font-bold text-[8.5px] uppercase tracking-widest leading-loose">
                            {tool.desc}
                        </p>
                    </div>
                </div>
            ))}
            </div>
        </div>
      </MotionSection>

      {/* 🗺️ TRAJECTORY */}
      <MotionSection className="px-10 py-32 max-w-4xl mx-auto relative">
        <div className="text-center mb-16 space-y-5">
            <div className="glass-text-inner !px-4 !py-1">
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30">Trajectory</span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">Platform Evolution</h3>
        </div>
        <div className="space-y-6">
            {[
                { phase: "BETA .01", title: "Video Synth", desc: "Volumetric interpolation.", icon: HiOutlineCube },
                { phase: "BETA .02", title: "Agent Sync", desc: "Multi-agent tasks.", icon: HiOutlineTerminal },
                { phase: "ALPHA .03", title: "Global Expansion", desc: "Decentralized Compute.", icon: HiOutlineTrendingUp }
            ].map((step, i) => (
                <div key={i} className="glass-premium p-6 border-white/5 flex items-center gap-8 group hover:translate-x-2 transition-all duration-700">
                    <div className="text-white/5 font-black text-2xl group-hover:text-white transition-colors tracking-tight w-24 shrink-0">
                        {step.phase}
                    </div>
                    <div className="flex-1 space-y-1">
                        <div className="glass-text-inner !px-3 !py-0.5">
                            <h4 className="text-[10px] font-black text-white tracking-widest uppercase">{step.title}</h4>
                        </div>
                        <p className="text-gray-800 font-bold text-[8px] uppercase tracking-widest">{step.desc}</p>
                    </div>
                    <div className="w-10 h-10 glass flex items-center justify-center text-white/10 group-hover:text-white border-white/5">
                        <step.icon className="w-5 h-5" />
                    </div>
                </div>
            ))}
        </div>
      </MotionSection>

      {/* 🏙️ FOOTER */}
      <footer className="px-10 py-16 border-t border-white/5 mt-20 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 glass flex items-center justify-center border-white/5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2.5" strokeLinecap="square"/>
                      </svg>
                  </div>
                  <div className="glass-text-inner !px-4 !py-1">
                    <h2 className="text-[9px] font-black uppercase tracking-[0.4em]">Pixel Forge AI</h2>
                  </div>
              </div>
              <p className="text-[8px] text-gray-800 font-bold uppercase tracking-widest ml-12">v23.0 Neural Skylight</p>
           </div>
           
           <div className="flex items-center gap-10 text-right">
              <div>
                <p className="text-[8px] text-gray-800 font-black uppercase tracking-widest mb-1.5">Architect</p>
                <h3 className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Koushik Nagabhatla</h3>
              </div>
              <a href="https://github.com/koushiknagabhatla-ctrl" target="_blank" rel="noreferrer" className="w-10 h-10 glass flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <FaGithub className="w-5 h-5" />
              </a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
