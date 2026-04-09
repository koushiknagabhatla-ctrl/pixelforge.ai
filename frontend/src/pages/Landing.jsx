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

// Neural Assets
const assets = {
  hero: "https://c.anhvn.com/assets/nexus_core_architecture.png", // Fallback placeholder logic
  enhancer: "https://c.anhvn.com/assets/neural_detail_enhancer.png",
  chat: "https://c.anhvn.com/assets/forge_ai_entity.png"
};

const MotionSection = ({ children, className }) => (
  <motion.section
    initial={{ opacity: 0, y: 100 }}
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
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#010101] overflow-x-hidden pt-20 selection:bg-white/10">
      <div className="bg-animated" />
      <div className="absolute inset-0 neural-grain" />

      {/* 🌌 HERO NEXUS */}
      <section className="relative min-h-screen px-6 py-24 sm:py-48 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Spatial Depth Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-white/[0.015] blur-[160px] rounded-full -z-10" />
        
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="relative z-10 space-y-16 max-w-6xl w-full"
        >
            <div className="inline-block hover-lift">
                <div className="glass-text-inner flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.7em] text-white/60">Neural Matrix Synchronization Phase IV</span>
                </div>
            </div>

            <div className="relative group">
                <div className="absolute -inset-10 bg-white/[0.01] blur-[100px] rounded-full group-hover:bg-white/[0.03] transition-all duration-1000" />
                <div className="glass-hyper p-16 sm:p-24 border-white/[0.05] relative overflow-hidden">
                    <div className="absolute inset-0 neural-grain opacity-10" />
                    <h1 className="text-6xl sm:text-[96px] font-black leading-[0.9] tracking-tighter text-glass pb-4 relative z-10">
                        Pixel Forge AI
                    </h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto hover-lift">
                <div className="glass-text-inner p-10 px-16 border-white/5 bg-white/[0.005]">
                    <p className="text-[13px] text-gray-400 font-bold max-w-2xl mx-auto leading-relaxed uppercase tracking-[0.25em]">
                      A primary intelligence unified across three semantic pillars: synthetic imagery, 
                      volumetric enhancement, and conversational architecture.
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-16">
                <Link to="/signup" className="hover-lift">
                  <button className="btn-monochrome h-20 px-16 text-[12px]">
                    Initialize Matrix
                  </button>
                </Link>
                <Link to="/login" className="hover-lift">
                  <button className="px-12 py-5 glass border border-white/10 text-[10px] font-black uppercase tracking-[0.6em] hover:bg-white/5 transition-all h-20 flex items-center gap-5">
                    Authorize Handshake <HiArrowRight className="w-5 h-5" />
                  </button>
                </Link>
            </div>
        </motion.div>
      </section>

      {/* 🏛️ THE NEURAL MISSION (Matter about website) */}
      <MotionSection className="px-6 py-40 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
                <div className="glass-text-inner !px-6 !py-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Architectural Philosophy</span>
                </div>
                <div className="glass-strong p-12 border-white/5 hover-lift">
                    <h2 className="text-4xl font-black text-white tracking-tighter mb-8 leading-tight">
                        Synthetic Intelligence. <br/>
                        <span className="text-gray-700 underline decoration-white/10 underline-offset-[12px]">Human Directives.</span>
                    </h2>
                    <p className="text-[14px] text-gray-500 font-bold leading-[2] uppercase tracking-widest">
                        Pixel Forge is founded on the principle of volumetric clarity. We bridge the gap between abstract 
                        imagination and digital materialization through a proprietary handshake with the world's most 
                        advanced neural networks. Our engine doesn't just generate; it synthesizes with architectural precision.
                    </p>
                </div>
            </div>
            <div className="relative group hover-lift">
                <div className="glass-hyper p-4 border-white/10 shadow-[0_100px_200px_rgba(0,0,0,1)]">
                    <img src={assets.hero} alt="Nexus Architecture" className="w-full h-auto rounded-[3.5rem] opacity-80 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="absolute inset-x-8 bottom-8 glass-strong p-8 border-white/10">
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Asset ID :: NEXUS_HUB_01</p>
                    </div>
                </div>
            </div>
        </div>
      </MotionSection>

      {/* 🛰️ CORE PROTOCOLS (Tools Showcase) */}
      <MotionSection className="px-6 py-40 bg-zinc-950/20">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-32 space-y-8">
                <div className="glass-text-inner !px-6 !py-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">Tool Matrix Protocols</span>
                </div>
                <h3 className="text-5xl font-black text-white tracking-tighter">Unified Workspace</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
                { 
                title: "SYNTHESIS", 
                desc: "Deploying Flux-1.1 Pro for zero-latent image generation.", 
                icon: HiOutlineSparkles,
                img: assets.hero
                },
                { 
                title: "RESTORATION", 
                desc: "High-fidelity detailing via the Klein 9B neural enhancer.", 
                icon: HiOutlineLightningBolt,
                img: assets.enhancer
                },
                { 
                title: "SEMANTICS", 
                desc: "Direct conversational link to our architectural nexus.", 
                icon: HiOutlineChatAlt2,
                img: assets.chat
                }
            ].map((tool, i) => (
                <motion.div
                key={i}
                whileHover={{ y: -15, scale: 1.02 }}
                className="glass-premium p-10 border border-white/5 flex flex-col gap-10 group transition-all duration-1000 shadow-4xl h-full relative overflow-hidden"
                >
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
                    <img src={tool.img} alt={tool.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <div className="relative z-10 space-y-8 h-full flex flex-col">
                    <div className="w-16 h-16 glass-strong flex items-center justify-center text-white/40 border border-white/10 group-hover:text-white transition-colors duration-1000">
                        <tool.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-4 mt-auto">
                        <div className="glass-text-inner !px-5 !py-1 w-fit">
                            <h3 className="text-[16px] font-black text-white tracking-widest uppercase">{tool.title}</h3>
                        </div>
                        <p className="text-gray-500 font-bold text-[11px] uppercase tracking-widest leading-loose">
                            {tool.desc}
                        </p>
                    </div>
                </div>
                </motion.div>
            ))}
            </div>
        </div>
      </MotionSection>

      {/* 🗺️ NEURAL ROADMAP */}
      <MotionSection className="px-6 py-48 max-w-5xl mx-auto">
        <div className="text-center mb-32">
            <div className="glass-text-inner !px-6 !py-2 mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Development Trajectory</span>
            </div>
            <h3 className="text-4xl font-black text-white tracking-tighter">Neural Roadmap</h3>
        </div>
        <div className="space-y-12">
            {[
                { phase: "Q2 2026", title: "Volumetric Video Synthesis", desc: "Deploying initial frame-interpolation protocols for liquid motion.", icon: HiOutlineCube },
                { phase: "Q3 2026", title: "Multi-Agent Handshake", desc: "Cooperative AI instances for cross-domain architectural tasks.", icon: HiOutlineTerminal },
                { phase: "Q4 2026", title: "Global Nexus Expansion", desc: "Full decentralized compute integration for 10x faster synthesis.", icon: HiOutlineTrendingUp }
            ].map((step, i) => (
                <div key={i} className="glass-premium p-10 border-white/5 flex flex-col md:flex-row items-center gap-12 group hover-lift transition-all">
                    <div className="text-white/20 font-black text-5xl group-hover:text-white transition-colors tracking-tighter w-40 shrink-0">
                        {step.phase}
                    </div>
                    <div className="flex-1 space-y-4">
                        <div className="glass-text-inner !px-4 !py-1">
                            <h4 className="text-[14px] font-black text-white tracking-widest uppercase">{step.title}</h4>
                        </div>
                        <p className="text-gray-600 font-bold text-[11px] uppercase tracking-widest">{step.desc}</p>
                    </div>
                    <div className="w-16 h-16 glass flex items-center justify-center text-white/20 group-hover:text-white border-white/5">
                        <step.icon className="w-8 h-8" />
                    </div>
                </div>
            ))}
        </div>
      </MotionSection>

      {/* 🏙️ FOOTER */}
      <footer className="px-6 py-24 border-t border-white/5 mt-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
           <div className="space-y-6">
              <div className="flex items-center gap-5 hover-lift">
                  <div className="w-12 h-12 glass flex items-center justify-center border-white/10 shadow-2xl">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2.5" strokeLinecap="square"/>
                      </svg>
                  </div>
                  <div className="glass-text-inner !px-6 !py-1.5">
                    <h2 className="text-[12px] font-black uppercase tracking-[0.5em]">Pixel Forge AI</h2>
                  </div>
              </div>
              <p className="text-[10px] text-gray-800 font-bold uppercase tracking-widest ml-16">Unrestricted Neural Handshake v19.0</p>
           </div>
           
           <div className="flex items-center gap-12">
              <div className="text-right">
                <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest mb-3">Principal Architect</p>
                <h3 className="text-sm font-black text-white hover:text-gray-400 transition-colors uppercase tracking-[0.4em]">Koushik Nagabhatla</h3>
              </div>
              <div className="flex gap-6">
                 <a href="https://github.com/koushiknagabhatla-ctrl" target="_blank" rel="noreferrer" className="w-14 h-14 glass flex items-center justify-center hover:bg-white hover:text-black transition-all hover-lift">
                    <FaGithub className="w-7 h-7" />
                 </a>
                 <a href="https://koushikportfolio-peach.vercel.app/" target="_blank" rel="noreferrer" className="w-14 h-14 glass flex items-center justify-center hover:bg-white hover:text-black transition-all hover-lift">
                    <HiArrowRight className="w-7 h-7 -rotate-45" />
                 </a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
