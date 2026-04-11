import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import FramerBackground from '../components/FramerBackground';
import useAuthStore from '../store/useAuthStore';
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
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="min-h-screen bg-transparent overflow-x-hidden pt-20 selection:bg-white/10 relative z-10 w-full font-sans">
      
      {/* 🚀 NEW CRASH-PROOF FRAMER BACKGROUND */}
      <FramerBackground mouse={mouseRef} />

      {/* 🏙️ HERO SECTION - BUILT FROM SCRATCH */}
      <section className="relative min-h-[90vh] px-4 sm:px-10 py-10 sm:py-20 flex flex-col items-center justify-center text-center">
        
        <motion.div
           initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
           animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="space-y-6 sm:space-y-12 max-w-5xl w-full"
        >
            <div className="inline-block relative">
                <div className="absolute inset-0 bg-white blur-xl opacity-10 rounded-full" />
                <div className="glass-premium flex items-center gap-2 sm:gap-3 px-6 py-3 rounded-full border border-white/20 shadow-2xl relative z-10">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">System Online</span>
                </div>
            </div>

            <div className="relative group mx-auto w-full px-2 sm:px-0 mt-8">
                <h1 className="text-5xl xs:text-6xl sm:text-[80px] md:text-[110px] font-black leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 relative z-10 uppercase drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                    Pixel Forge
                </h1>
                <h1 className="text-4xl xs:text-5xl sm:text-[60px] md:text-[80px] font-black leading-none tracking-tight text-white relative z-10 uppercase mt-2">
                   V2 Architecture
                </h1>
            </div>

            <div className="max-w-xl mx-auto px-4 sm:px-0 mt-8">
                <p className="text-[13px] sm:text-[15px] text-gray-400 font-bold max-w-lg mx-auto leading-relaxed uppercase tracking-[0.25em] drop-shadow-md">
                    Seamless synthesis of pure aesthetics and artificial intelligence. Built for absolute perfection.
                </p>
            </div>

            {/* AUTH LISTENER LOGIC ("ENTER" REPLACEMENT) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-12 w-full px-6 sm:px-0">
                {user ? (
                   <button onClick={() => navigate('/chatbot')} className="btn-monochrome h-16 w-full sm:w-auto px-16 text-[12px] shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] flex items-center justify-center gap-4">
                     Enter <HiArrowRight className="w-5 h-5" />
                   </button>
                ) : (
                  <>
                    <button onClick={() => navigate('/signup')} className="btn-monochrome h-16 w-full sm:w-auto px-12 text-[11px] shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                      Generate Now
                    </button>
                    <button onClick={() => navigate('/login')} className="w-full sm:w-auto px-10 h-16 glass border border-white/20 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white/10 transition-all flex items-center justify-center gap-3 bg-black/40 backdrop-blur-2xl shadow-xl">
                      Sign In <HiArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}
            </div>
        </motion.div>
      </section>

      {/* 🏛️ ABOUT SECTION - GLASS REDESIGN */}
      <MotionSection id="about" className="px-5 sm:px-10 py-20 sm:py-32 max-w-7xl mx-auto relative cursor-default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="space-y-6 sm:space-y-8">
                <div className="glass-premium px-5 py-2 inline-block rounded-full border-white/20">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Our Vision</span>
                </div>
                <div className="glass-hyper p-8 sm:p-12 border-white/10 relative overflow-hidden group rounded-[3rem]">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-8">
                        Absolute Purity.
                    </h2>
                    <p className="text-[15px] text-gray-300 font-medium leading-relaxed mb-6 tracking-wide drop-shadow-md">
                        We abandoned imitations. Pixel Forge is an uncompromising suite of neural tools built directly on top of rapid processing engines and state-of-the-art APIs.
                    </p>
                    <p className="text-[12px] text-gray-500 font-black leading-loose uppercase tracking-[0.15em]">
                        From generating complex imagery instantly to chatting naturally with our semantic core, every interaction is tailored to accelerate human creativity.
                    </p>
                </div>
            </div>
            
            <div className="relative w-full h-[400px] flex items-center justify-center perspective-[1000px]">
                 <div className="absolute inset-0 bg-white/5 rounded-[3rem] -z-10 blur-3xl animate-pulse" />
                 <img src={ASSETS.nexus} alt="Generative Hub" className="w-[90%] h-auto max-h-[500px] object-cover rounded-[3rem] filter contrast-125 drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/10 transform hover:rotate-y-12 hover:scale-105 transition-all duration-700" />
            </div>
        </div>
      </MotionSection>

      {/* 🛰️ CORE FEATURES DIRECT ROUTING */}
      <MotionSection className="px-5 sm:px-10 py-20 sm:py-32 relative bg-[#020202]/90 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 sm:mb-24 space-y-6">
                <div className="glass-premium px-6 py-3 inline-block rounded-full border-white/20 shadow-2xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">The Core Suite</span>
                </div>
                <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tighter drop-shadow-md">Direct Access</h3>
                <p className="text-gray-500 font-black text-[12px] uppercase tracking-[0.3em] mt-4">Select an interface below to begin immediately</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {[
                { title: "Generate Space", desc: "Build images from pure thought.", icon: HiOutlineSparkles, link: "/tools?mode=generate" },
                { title: "Enhance Lab", desc: "Sharpen and upscale your assets.", icon: HiOutlineLightningBolt, link: "/tools?mode=enhance" },
                { title: "Neural Chat", desc: "Speak directly to the machine.", icon: HiOutlineChatAlt2, link: "/chatbot" }
            ].map((tool, i) => (
                <Link to={tool.link} key={i}>
                  <div className="glass-hyper p-8 sm:p-10 border border-white/10 flex flex-col gap-6 group relative overflow-hidden rounded-[3rem] hover:-translate-y-3 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(255,255,255,0.05)]">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="relative z-10 space-y-6">
                          <div className="w-16 h-16 glass flex items-center justify-center text-white border-white/20 group-hover:scale-110 transition-transform duration-500 rounded-2xl shadow-xl bg-white/5">
                              <tool.icon className="w-8 h-8" />
                          </div>
                          <div>
                              <h3 className="text-[15px] font-black text-white tracking-widest uppercase mb-3 group-hover:text-gray-200">{tool.title}</h3>
                              <p className="text-gray-400 font-bold text-[12px] uppercase tracking-[0.2em] leading-relaxed">
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
      <footer className="px-5 sm:px-10 py-16 border-t border-white/[0.05] relative bg-[#010101]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-5">
                  <div className="w-12 h-12 glass flex items-center justify-center border-white/10 rounded-[1rem] p-2 bg-white/5 shadow-2xl">
                      <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                  </div>
                  <div className="glass-premium px-6 py-3 rounded-full border border-white/10">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Pixel Forge AI</h2>
                  </div>
              </div>
              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] md:ml-16">Architecture V2 Finalized</p>
           </div>
           
           <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-right w-full sm:w-auto">
              <div>
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] mb-2">Architect</p>
                <h3 className="text-[12px] font-black text-white uppercase tracking-[0.4em]">Koushik Nagabhatla</h3>
              </div>
              <a href="https://github.com/koushiknagabhatla-ctrl" target="_blank" rel="noreferrer" className="w-14 h-14 glass flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 rounded-[1rem] border-white/10 shadow-2xl">
                <FaGithub className="w-7 h-7" />
              </a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
