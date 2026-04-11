import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
import { useEffect, useState } from 'react';

const ASSETS = {
  nexus: "/assets/nexus.png",
  enhancer: "/assets/enhancer.png",
  entity: "/assets/entity.png"
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
  // Mobile check to adjust parallax intensity safely
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 });
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
       const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
       window.addEventListener('resize', handleResize);
       return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const mouseX = useMotionValue(windowSize.width / 2);
  const mouseY = useMotionValue(windowSize.height / 2);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  // 3D Parallax mappings (Inverse logic for floating effect)
  const floatX1 = useTransform(springX, [0, windowSize.width], [60, -60]);
  const floatY1 = useTransform(springY, [0, windowSize.height], [60, -60]);
  
  const floatX2 = useTransform(springX, [0, windowSize.width], [-90, 90]);
  const floatY2 = useTransform(springY, [0, windowSize.height], [-90, 90]);

  const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
  };

  return (
    <div onMouseMove={handleMouseMove} className="min-h-screen bg-transparent overflow-x-hidden pt-20 selection:bg-white/20 relative z-10 w-full">
      
      {/* 🔮 3D MOTION BACKGROUND (PARALLAX + KEYFRAMED) */}
      <div className="absolute inset-0 w-full h-[100vh] overflow-hidden -z-20 pointer-events-none perspective-[1000px]">
         <motion.div 
            style={{ x: floatX1, y: floatY1 }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[120vw] sm:w-[50vw] h-[120vw] sm:h-[50vw] rounded-full bg-white/[0.04] blur-[100px] sm:blur-[150px]"
         />
         <motion.div 
            style={{ x: floatX2, y: floatY2 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] right-[-10%] w-[150vw] sm:w-[40vw] h-[150vw] sm:h-[40vw] rounded-full bg-white/[0.02] blur-[90px] sm:blur-[120px]"
         />
      </div>

      {/* 🏙️ HERO SECTION */}
      <section className="relative min-h-[85vh] px-4 sm:px-10 py-10 sm:py-20 flex flex-col items-center justify-center text-center">
        
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="space-y-6 sm:space-y-10 max-w-4xl w-full"
        >
            <div className="inline-block">
                <div className="glass-text-inner flex items-center gap-2 sm:gap-3 px-3 sm:px-4">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/60 animate-pulse" />
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/50">Ultimate Creation Interface</span>
                </div>
            </div>

            <div className="relative group mx-auto w-full sm:w-fit px-4 sm:px-0">
                <div className="glass-hyper p-6 sm:p-10 border-white/[0.05] relative w-full overflow-hidden rounded-[1.5rem] sm:rounded-2xl">
                    <h1 className="text-3xl xs:text-4xl sm:text-[42px] md:text-[54px] font-black leading-tight tracking-tight text-glass relative z-10 uppercase break-words sm:whitespace-nowrap">
                        Pixel Forge AI
                    </h1>
                </div>
            </div>

            <div className="max-w-xl mx-auto px-4 sm:px-0">
                <div className="glass-text-inner p-4 sm:p-5 border-white/10 bg-white/[0.01] rounded-[1rem]">
                    <p className="text-[11px] sm:text-[12px] text-gray-400 font-bold max-w-lg mx-auto leading-relaxed uppercase tracking-[0.1em] sm:tracking-[0.2em]">
                      A high-precision design laboratory. Shape the future of your imagination using our premium generative workspace.
                    </p>
                </div>
            </div>

            {/* Mobile gap fixes for buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-8 w-full px-6 sm:px-0">
                <Link to="/signup" className="w-full sm:w-auto">
                  <button className="btn-monochrome h-12 w-full sm:w-auto px-10 text-[10px] sm:text-[11px]">
                    Generate Now
                  </button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 glass border border-white/10 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/10 transition-all h-12 flex items-center justify-center gap-3">
                    Sign In <HiArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
            </div>
        </motion.div>
      </section>

      {/* 🏛️ VISION SECTION */}
      <MotionSection id="about" className="px-5 sm:px-10 py-16 sm:py-20 max-w-7xl mx-auto relative cursor-default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                <div className="glass-text-inner px-4 py-2 inline-block">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Vision</span>
                </div>
                <div className="glass-premium p-6 sm:p-10 border-white/10 relative overflow-hidden group rounded-[1.5rem] sm:rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4 sm:mb-6 underline decoration-white/10 underline-offset-8 leading-snug">
                        Limitless Clarity.
                    </h2>
                    <p className="text-[12px] sm:text-[13px] text-gray-300 font-bold leading-relaxed mb-4">
                        Pixel Forge is built for creators who demand absolute perfection. We bridge the gap between abstract ideas and flawless reality.
                    </p>
                    <p className="text-[11px] sm:text-[12px] text-gray-500 font-bold leading-loose uppercase tracking-wide sm:tracking-widest">
                        Utilizing the world's best generative models and smartest enhancing pipelines, we give you unprecedented control over digital asset creation. No friction, no complex hurdles—just pure, high-fidelity design.
                    </p>
                </div>
            </div>
            
            <div className="lg:col-span-5 relative w-full h-full min-h-[300px] flex items-center justify-center pointer-events-none sm:pointer-events-auto">
               <motion.div 
                 style={{ rotateX: floatY2, rotateY: floatX1 }}
                 className="relative w-full h-full perspective-[1500px]"
               >
                 <div className="relative glass-hyper p-2 sm:p-3 border-white/10 shadow-2xl rounded-[1.5rem] sm:rounded-2xl w-full">
                    <img src={ASSETS.nexus} alt="Generative Hub" className="w-full h-auto object-cover rounded-[1rem] sm:rounded-[1.5rem] filter contrast-[1.05]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-[1.5rem]" />
                 </div>
               </motion.div>
            </div>
        </div>
      </MotionSection>

      {/* 🛰️ CORE FEATURES */}
      <MotionSection className="px-5 sm:px-10 py-16 sm:py-20 relative bg-[#030303]/40 border-y border-white/[0.02]">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 space-y-4 sm:space-y-5">
                <div className="glass-text-inner px-4 py-2 inline-block">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Tool Suite</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Professional Utilities</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
                { title: "Generate", desc: "Instantly create high-resolution imagery.", icon: HiOutlineSparkles, img: ASSETS.nexus },
                { title: "Enhance", desc: "Upscale and restore details flawlessly.", icon: HiOutlineLightningBolt, img: ASSETS.enhancer },
                { title: "Chatbot", desc: "Discuss concepts natively with AI.", icon: HiOutlineChatAlt2, img: ASSETS.entity }
            ].map((tool, i) => (
                <div key={i} className="glass-premium p-6 sm:p-8 border border-white/10 flex flex-col gap-4 sm:gap-5 group relative overflow-hidden rounded-[1.5rem] sm:rounded-2xl">
                    <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.15] transition-all duration-1000 transform group-hover:scale-105 pointer-events-none">
                        <img src={tool.img} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative z-10 space-y-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 glass flex items-center justify-center text-white/30 border-white/10 group-hover:text-white transition-colors duration-1000 rounded-[1rem]">
                            <tool.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="glass-text-inner px-3 py-1 inline-block">
                            <h3 className="text-[10px] sm:text-[11px] font-black text-white tracking-widest uppercase">{tool.title}</h3>
                        </div>
                        <p className="text-gray-400 font-bold text-[10px] sm:text-[11px] uppercase tracking-widest leading-loose">
                            {tool.desc}
                        </p>
                    </div>
                </div>
            ))}
            </div>
        </div>
      </MotionSection>

      {/* 🏙️ FOOTER */}
      <footer className="px-5 sm:px-10 py-12 sm:py-16 border-t border-white/5 mt-10 sm:mt-20 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
            <div className="space-y-3 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="w-8 h-8 glass flex items-center justify-center border-white/10 rounded-lg p-0.5">
                      <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  </div>
                  <div className="glass-text-inner px-4 py-1">
                    <h2 className="text-[9px] font-black uppercase tracking-[0.4em]">Pixel Forge AI</h2>
                  </div>
              </div>
              <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest md:ml-12">Production Ready 2026</p>
           </div>
           
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-center sm:text-right w-full sm:w-auto">
              <div>
                <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1.5">Architect</p>
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Koushik Nagabhatla</h3>
              </div>
              <a href="https://github.com/koushiknagabhatla-ctrl" target="_blank" rel="noreferrer" className="w-10 h-10 glass flex items-center justify-center hover:bg-white hover:text-black transition-all rounded-lg border-white/10">
                <FaGithub className="w-5 h-5" />
              </a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
