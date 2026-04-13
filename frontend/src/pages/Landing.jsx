import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Background3D from '../components/Background3D';
import useAuthStore from '../store/useAuthStore';
import { HiOutlineSparkles, HiOutlineLightningBolt, HiOutlineChatAlt2, HiArrowRight } from 'react-icons/hi';

/* ═══════════════════════════════════════════
   ANIMATION WRAPPERS
   ═══════════════════════════════════════════ */
const FadeUp = ({ children, className = '', delay = 0, id }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerCard = ({ children, className = '', i = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ═══════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════ */
const Landing = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const tools = [
    { title: 'AI Image Generator', desc: 'Create stunning visuals from text descriptions. Powered by Stable Diffusion neural networks for photorealistic output.', icon: HiOutlineSparkles, link: '/tools?mode=generate' },
    { title: 'Image Enhancer', desc: 'Upscale and sharpen any image with AI-powered super resolution. Restore details and improve quality instantly.', icon: HiOutlineLightningBolt, link: '/tools?mode=enhance' },
    { title: 'Neural Chat', desc: 'Converse naturally with our AI assistant. Get creative guidance, prompt engineering help, and technical support.', icon: HiOutlineChatAlt2, link: '/chatbot' },
  ];

  const capabilities = [
    { icon: 'auto_awesome', title: 'Neural Synthesis', desc: 'State-of-the-art diffusion models generate images with extraordinary detail, coherence, and artistic precision from natural language.' },
    { icon: 'speed', title: 'Zero-Latency Engine', desc: 'Built on NVIDIA inference microservices for instantaneous generation. Your creative vision materializes in seconds, not minutes.' },
    { icon: 'security', title: 'Private & Secure', desc: 'All processing occurs in isolated computational silos. Your creative work and data remain completely private and proprietary.' },
    { icon: 'tune', title: 'Precision Control', desc: 'Fine-tune every aspect of generation with advanced prompt engineering, negative prompting, and modular parameter control.' },
    { icon: 'cloud_sync', title: 'Cloud Sync', desc: 'Assets are permanently stored in high-availability cloud infrastructure. Access your creations from any device, anywhere.' },
    { icon: 'psychology', title: 'Intelligent Assistant', desc: 'Our neural chat understands context, helps refine prompts, and guides you through complex creative workflows seamlessly.' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden relative w-full">
      
      {/* 3D Cursor-Tracking Background */}
      <Background3D />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl space-y-8"
        >
          {/* Subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          {/* Status badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl"
          >
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-indigo-200/80">Neural Engine Online</span>
          </motion.div>

          {/* Title */}
          <h1 className="font-['Manrope'] font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-indigo-200/40">PIXEL</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-100 to-indigo-400/30">FORGE</span>
          </h1>
          
          <p className="font-['Inter'] text-sm md:text-base text-indigo-200/50 max-w-lg mx-auto leading-relaxed tracking-wide">
            Next-generation AI image synthesis platform. Create, enhance, and transform visual content with architectural precision.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            {user ? (
              <button onClick={() => navigate('/chatbot')} className="group relative px-10 py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl font-['Manrope'] font-bold text-sm tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_15px_40px_rgba(99,102,241,0.3)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.5)] flex items-center gap-3">
                Enter Forge <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/signup')} className="group relative px-10 py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl font-['Manrope'] font-bold text-sm tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_15px_40px_rgba(99,102,241,0.3)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.5)] flex items-center gap-3">
                  Get Started <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => navigate('/login')} className="px-10 py-4 bg-white/[0.04] hover:bg-white/[0.08] text-white rounded-2xl font-['Manrope'] font-bold text-sm tracking-wider transition-all border border-white/[0.08] hover:border-white/[0.15] backdrop-blur-xl">
                  Sign In
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* ═══ TOOLS BENTO GRID ═══ */}
      <section className="max-w-6xl mx-auto px-6 py-28 relative z-10">
        <FadeUp className="text-center mb-16">
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-indigo-300/50 block mb-4">Platform Tools</span>
          <h2 className="font-['Manrope'] font-bold text-3xl md:text-5xl text-white tracking-tight">What You Can Build</h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tools.map((tool, i) => (
            <StaggerCard key={i} i={i}>
              <Link to={tool.link}>
                <div className="group relative bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-indigo-500/20 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,0.08)] overflow-hidden h-full">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10 space-y-5">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all duration-500">
                      <tool.icon className="w-6 h-6 text-indigo-300" />
                    </div>
                    <div>
                      <h3 className="font-['Manrope'] text-lg font-bold text-white mb-2 group-hover:text-indigo-100 transition-colors">{tool.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/50 transition-colors">{tool.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-400/60 group-hover:text-indigo-300 transition-colors">
                      <span className="text-xs font-semibold uppercase tracking-wider">Launch</span>
                      <HiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerCard>
          ))}
        </div>
      </section>

      {/* ═══ CAPABILITIES GRID ═══ */}
      <section className="relative z-10 py-28 border-t border-white/[0.04] bg-gradient-to-b from-[#0a0a0f] to-[#0d0d15]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-indigo-300/50 block mb-4">Engineered Capabilities</span>
            <h2 className="font-['Manrope'] font-bold text-3xl md:text-5xl text-white tracking-tight">Built for Professionals</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => (
              <StaggerCard key={i} i={i} className="group">
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-7 hover:bg-white/[0.04] hover:border-indigo-500/10 transition-all duration-500">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-5">
                    <span className="material-symbols-outlined text-indigo-300 text-xl">{cap.icon}</span>
                  </div>
                  <h3 className="font-['Manrope'] text-base font-bold text-white mb-2">{cap.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{cap.desc}</p>
                </div>
              </StaggerCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative z-10 py-16 px-6 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-indigo-400" />
            <span className="font-['Manrope'] font-bold text-sm text-white/60 tracking-wide">Pixel Forge AI</span>
          </div>
          <p className="text-xs text-white/20 tracking-wider">© 2024 Pixel Forge Neural Systems. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
