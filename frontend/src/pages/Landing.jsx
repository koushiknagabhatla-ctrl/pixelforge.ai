import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import ThreeBackground from '../components/ThreeBackground';
import { 
  HiOutlineSparkles, 
  HiOutlineLightningBolt, 
  HiOutlineChatAlt2, 
  HiArrowRight 
} from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';

const ASSETS = {
  nexus: "/assets/nexus.png",
};

const MotionSection = ({ children, className, id }) => (
  <motion.section
    id={id}
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
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
      // Normalize to 0-1 for the 3D Engine
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="min-h-screen bg-transparent overflow-x-hidden pt-20 selection:bg-white/10 relative z-10 w-full">
      
      {/* NATIVE 3D MODEL BACKGROUND */}
      <ThreeBackground mouse={mouseRef} />

      {/* 🏙️ HERO SECTION */}
      <section className="relative min-h-[90vh] px-4 sm:px-10 py-10 sm:py-20 flex flex-col items-center justify-center text-center">
        
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="space-y-6 sm:space-y-10 max-w-5xl w-full"
        >
            <div className="inline-block">
                <div className="glass-text-inner flex items-center gap-2 sm:gap-3 px-4 py-2 bg-black/40">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Next Generation Architect</span>
                </div>
            </div>

            <div className="relative group mx-auto w-full px-2 sm:px-0">
                <div className="p-2 sm:p-6 relative w-full overflow-hidden">
                    <h1 className="text-4xl xs:text-5xl sm:text-[60px] md:text-[80px] font-black leading-none tracking-tighter text-white relative z-10 uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                        Pixel Forge AI
                    </h1>
                </div>
            </div>

            <div className="max-w-xl mx-auto px-4 sm:px-0">
                <p className="text-[12px] sm:text-[14px] text-gray-300 font-bold max-w-lg mx-auto leading-relaxed uppercase tracking-widest drop-shadow-md">
                    Seamless synthesis of native 3D geometry and artificial intelligence. Build, restore, and generate with flawless perfection.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-8 w-full px-6 sm:px-0">
                <Link to="/signup" className="w-full sm:w-auto">
                  <button className="btn-monochrome h-14 w-full sm:w-auto px-12 text-[11px] shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                    Generate Now
                  </button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-10 py-5 glass border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/10 transition-all h-14 flex items-center justify-center gap-3 bg-black/40 backdrop-blur-xl">
                    Sign In <HiArrowRight className="w-4 h-4" />
                  </button>
                </Link>
            </div>
        </motion.div>
      </section>

      {/* 🏛️ ABOUT SECTION */}
      <MotionSection id="about" className="px-5 sm:px-10 py-20 sm:py-32 max-w-7xl mx-auto relative cursor-default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="space-y-6 sm:space-y-8">
                <div className="glass-text-inner px-4 py-2 inline-block bg-black/40">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Our Vision</span>
                </div>
                <div className="glass-premium p-8 sm:p-12 border-white/10 relative overflow-hidden group rounded-[2rem] bg-black/60 backdrop-blur-3xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-6 underline decoration-white/10 underline-offset-8 leading-snug">
                        Absolute Purity.
                    </h2>
                    <p className="text-[14px] text-gray-200 font-bold leading-relaxed mb-6 tracking-wide shadow-black drop-shadow-md">
                        We don't settle for imitations. Pixel Forge is an uncompromising suite of neural tools built directly on top of raw 3D rendering engines and state-of-the-art APIs.
                    </p>
                    <p className="text-[12px] text-gray-400 font-bold leading-loose uppercase tracking-[0.15em]">
                        From generating complex imagery instantly to chatting naturally with our semantic core, every interaction is perfectly tailored to accelerate human creativity without technical friction.
                    </p>
                </div>
            </div>
            
            <div className="relative w-full h-[400px] flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-[2rem] -z-10 blur-xl" />
                 <img src={ASSETS.nexus} alt="Generative Hub" className="w-[90%] h-auto max-h-[500px] object-cover rounded-[2rem] filter contrast-125 drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/5" />
            </div>
        </div>
      </MotionSection>

      {/* 🛰️ CORE FEATURES DIRECT ROUTING */}
      <MotionSection className="px-5 sm:px-10 py-20 sm:py-32 relative bg-[#030303]/80 border-t border-white/[0.03]">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 sm:mb-20 space-y-5">
                <div className="glass-text-inner px-5 py-2 inline-block bg-black/40">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">The Core Suite</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Direct Access Tools</h3>
                <p className="text-gray-400 font-bold text-[11px] uppercase tracking-widest mt-4">Select an interface below to begin immediately</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { title: "Generate Space", desc: "Build images from pure thought.", icon: HiOutlineSparkles, link: "/tools?mode=generate" },
                { title: "Enhance Lab", desc: "Sharpen and upscale your assets.", icon: HiOutlineLightningBolt, link: "/tools?mode=enhance" },
                { title: "Neural Chat", desc: "Speak directly to the machine.", icon: HiOutlineChatAlt2, link: "/chatbot" }
            ].map((tool, i) => (
                <Link to={tool.link} key={i}>
                  <div className="glass-premium p-8 sm:p-10 border border-white/10 flex flex-col gap-6 group relative overflow-hidden rounded-[2rem] hover:-translate-y-2 transition-transform duration-500 bg-black/50 hover:bg-black/70">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="relative z-10 space-y-5">
                          <div className="w-14 h-14 glass flex items-center justify-center text-white border-white/20 group-hover:scale-110 transition-transform duration-500 rounded-2xl shadow-2xl bg-white/5">
                              <tool.icon className="w-7 h-7" />
                          </div>
                          <div>
                              <h3 className="text-[14px] font-black text-white tracking-widest uppercase mb-2 group-hover:text-gray-200">{tool.title}</h3>
                              <p className="text-gray-400 font-bold text-[11px] uppercase tracking-[0.2em] leading-relaxed">
                                  {tool.desc}
                              </p>
                          </div>
                      </div>
                  </div>
                </Link>
            ))}
            </div>
        </div>
      </MotionSection>

      {/* 🏙️ FOOTER */}
      <footer className="px-5 sm:px-10 py-16 border-t border-white/[0.05] relative bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="w-10 h-10 glass flex items-center justify-center border-white/10 rounded-xl p-1 bg-white/5">
                      <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,1)]" />
                  </div>
                  <div className="glass-text-inner px-5 py-2">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Pixel Forge AI</h2>
                  </div>
              </div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] md:ml-14">Architecture Finalized 2026</p>
           </div>
           
           <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-right w-full sm:w-auto">
              <div>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-2">Architect</p>
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Koushik Nagabhatla</h3>
              </div>
              <a href="https://github.com/koushiknagabhatla-ctrl" target="_blank" rel="noreferrer" className="w-12 h-12 glass flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 rounded-xl border-white/10 shadow-xl">
                <FaGithub className="w-6 h-6" />
              </a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
