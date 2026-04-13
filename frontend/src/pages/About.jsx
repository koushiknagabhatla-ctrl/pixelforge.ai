import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

// Section animation wrapper for parallax feeling
const FadeInSection = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#e2e2e2] overflow-x-hidden pt-32 pb-24 relative font-['Inter']">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-white/5 blur-[150px] rounded-full mix-blend-screen" />
         <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#2A2A2A]/40 blur-[150px] rounded-full mix-blend-screen" />
         <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
         }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Header Title */}
        <FadeInSection className="text-center mb-24 max-w-4xl mx-auto">
           <span className="font-['Manrope'] font-bold tracking-[0.5em] text-[10px] text-zinc-500 uppercase block mb-6">About The Engine</span>
           <h1 className="font-['Manrope'] font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 mb-8 leading-tight">
               ARCHITECTURAL <br/> SYNTHESIS
           </h1>
           <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
               Pixel Forge is an uncompromising suite of neural tools built directly on top of rapid processing engines to accelerate human creativity with zero latency.
           </p>
        </FadeInSection>

        {/* Cinematic Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
            <FadeInSection>
               <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(255,255,255,0.05)] border border-white/5 group">
                  <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-colors duration-1000"></div>
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG50XxpqH_XRzZL1-lyrCZqdPZ-LHJHb4HMXlV4rBqnMgZaEfQvoXsXy_9O5wc6CPIrgb4_8m9WVpxePLCEdOpemK22ILVOJqB6VUWSkK6FWeRl97CLYgfDh2IOoKvSsIlVg2Vy_nBlAU8tKbSjCa-dpmO5c7RHAR7QiZhBBxeBDS6J7XliwbLJ8fnDr7olHwhmmD-eLx-LFo6rdWJsIT0dAdfQqkCliIlqJDJiqjRCEKGcaQsSGixTWRoOEChEwtqPPj00H99IUPh" 
                       className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Brutalist Architecture Render" />
               </div>
            </FadeInSection>

            <div className="space-y-12">
               <FadeInSection delay={0.2}>
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-white text-xl">precision_manufacturing</span>
                  </div>
                  <h2 className="font-['Manrope'] text-3xl md:text-4xl font-bold text-white mb-4">Unparalleled Fidelity</h2>
                  <p className="text-zinc-400 text-base leading-loose">
                      The core engine leverages specialized latent diffusion models optimized directly for architectural coherence and high-end photographic concept art. We abandoned imitations to give professionals pixel-perfect control over structural integrity.
                  </p>
               </FadeInSection>
               
               <FadeInSection delay={0.4}>
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-white text-xl">speed</span>
                  </div>
                  <h2 className="font-['Manrope'] text-3xl md:text-4xl font-bold text-white mb-4">Zero-Friction Workflow</h2>
                  <p className="text-zinc-400 text-base leading-loose">
                      Time is the ultimate creative constraint. Our integration with the latest proprietary Nvidia inference microservices guarantees that generation happens at the speed of thought. Your data is instantly stored, synchronized, and refined in our private cloud.
                  </p>
               </FadeInSection>
            </div>
        </div>

        {/* Developer Footer Node */}
        <FadeInSection delay={0.3} className="pt-32 border-t border-white/10 mt-32 flex flex-col items-center text-center">
            <span className="font-['Manrope'] font-black tracking-[0.4em] text-[12px] text-zinc-600 uppercase block mb-12">Foundry Architect</span>
            
            <a href="https://github.com/koushiknagabhatla-ctrl" target="_blank" rel="noopener noreferrer" 
               className="group relative bg-[#1B1B1B]/80 backdrop-blur-xl border border-white/10 px-12 py-10 rounded-[3rem] w-full max-w-2xl overflow-hidden hover:shadow-[0_20px_80px_rgba(255,255,255,0.05)] hover:-translate-y-2 transition-all duration-500">
               <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               
               <div className="relative z-10 flex flex-col items-center gap-6">
                   <div className="w-20 h-20 bg-white/5 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-500 shadow-2xl">
                       <FaGithub className="w-10 h-10 text-white group-hover:text-black transition-colors duration-500" />
                   </div>
                   <div>
                       <h3 className="font-['Manrope'] text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all duration-500">Koushik Nagabhatla</h3>
                       <p className="font-['Inter'] text-[11px] text-zinc-500 uppercase tracking-widest mt-2">Lead Developer / AI Synthesis</p>
                   </div>
               </div>
            </a>
            
            <p className="font-['Inter'] text-[10px] uppercase tracking-[0.3em] text-neutral-600 mt-20">© 2024 Pixel Forge Neural Systems</p>
        </FadeInSection>

      </div>
    </div>
  );
};

export default About;
