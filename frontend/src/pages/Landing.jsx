import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WebGLShader } from '../components/ui/web-gl-shader';
import { LiquidButton } from '../components/ui/liquid-glass-button';
import { StarButton } from '../components/ui/star-button';
import RadialOrbitalTimeline from '../components/ui/radial-orbital-timeline';
import useAuthStore from '../store/useAuthStore';
import { HiArrowRight } from 'react-icons/hi';
import { Calendar, Code, FileText, User, Clock, Sparkles, Zap, Shield, Sliders, Cloud, Brain } from 'lucide-react';

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
   TIMELINE DATA for Orbital Timeline
   ═══════════════════════════════════════════ */
const timelineData = [
  {
    id: 1,
    title: "AI Generation",
    date: "Core",
    content: "Create stunning visuals from text with neural synthesis powered by Stable Diffusion.",
    category: "Generation",
    icon: Sparkles,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Enhancement",
    date: "Core",
    content: "Upscale and sharpen any image with AI super-resolution neural networks.",
    category: "Enhancement",
    icon: Zap,
    relatedIds: [1, 3],
    status: "completed",
    energy: 95,
  },
  {
    id: 3,
    title: "Neural Chat",
    date: "Core",
    content: "Converse with our AI for creative guidance and prompt engineering help.",
    category: "Chat",
    icon: Brain,
    relatedIds: [2, 4],
    status: "completed",
    energy: 90,
  },
  {
    id: 4,
    title: "Privacy",
    date: "Security",
    content: "All processing in isolated silos. Your creative work remains completely private.",
    category: "Security",
    icon: Shield,
    relatedIds: [3, 5],
    status: "completed",
    energy: 85,
  },
  {
    id: 5,
    title: "Cloud Sync",
    date: "Infra",
    content: "Assets stored in high-availability cloud. Access from any device, anywhere.",
    category: "Infrastructure",
    icon: Cloud,
    relatedIds: [4, 6],
    status: "in-progress",
    energy: 70,
  },
  {
    id: 6,
    title: "Fine Control",
    date: "Pro",
    content: "Advanced prompt engineering, negative prompting, and parameter control.",
    category: "Pro",
    icon: Sliders,
    relatedIds: [5],
    status: "in-progress",
    energy: 60,
  },
];

/* ═══════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════ */
const Landing = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const capabilities = [
    { icon: Sparkles, title: 'Neural Synthesis', desc: 'State-of-the-art diffusion models generate images with extraordinary detail from natural language.' },
    { icon: Zap, title: 'Zero-Latency Engine', desc: 'NVIDIA inference microservices for instantaneous generation. Your vision materializes in seconds.' },
    { icon: Shield, title: 'Private & Secure', desc: 'All processing in isolated silos. Your creative work and data remain completely private.' },
    { icon: Sliders, title: 'Precision Control', desc: 'Fine-tune every aspect with advanced prompt engineering and parameter control.' },
    { icon: Cloud, title: 'Cloud Sync', desc: 'Assets permanently stored in high-availability cloud infrastructure.' },
    { icon: Brain, title: 'Intelligent Assistant', desc: 'Neural chat understands context and guides you through complex creative workflows.' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden relative w-full">
      
      {/* ═══ HERO with WebGL Shader ═══ */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center text-center z-10 overflow-hidden">
        {/* WebGL Background */}
        <div className="absolute inset-0 z-0">
          <WebGLShader />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full">
          <div className="relative border border-[#27272a]/50 p-2 w-full mx-auto max-w-3xl">
            <main className="relative border border-[#27272a]/50 py-10 overflow-hidden backdrop-blur-sm bg-black/20">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <h1 className="mb-3 text-white text-center text-6xl sm:text-7xl font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)] font-['Manrope']">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-indigo-200/40">PIXEL</span>
                  {' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-100 to-indigo-400/30">FORGE</span>
                </h1>
                
                <p className="text-white/60 px-6 text-center text-xs md:text-sm lg:text-lg max-w-lg mx-auto">
                  Next-generation AI image synthesis platform. Create, enhance, and transform visual content with architectural precision.
                </p>
                
                {/* Status indicator */}
                <div className="flex items-center justify-center gap-1">
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  <p className="text-xs text-green-500">Neural Engine Online</p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  {user ? (
                    <div className="flex justify-center">
                      <LiquidButton 
                        className="text-white border border-white/10 rounded-full" 
                        size="xl"
                        onClick={() => navigate('/chatbot')}
                      >
                        Enter Forge
                      </LiquidButton>
                    </div>
                  ) : (
                    <>
                      <StarButton 
                        lightColor="#818cf8" 
                        className="rounded-3xl h-12 px-8 text-base"
                        onClick={() => navigate('/signup')}
                      >
                        Get Started
                      </StarButton>
                      <LiquidButton 
                        className="text-white border border-white/10 rounded-full" 
                        size="lg"
                        onClick={() => navigate('/login')}
                      >
                        Sign In
                      </LiquidButton>
                    </>
                  )}
                </div>
              </motion.div>
            </main>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* ═══ FEATURES — Radial Orbital Timeline ═══ */}
      <section className="relative z-10 py-12 bg-gradient-to-b from-[#0a0a0f] to-[#0d0d15] border-t border-white/[0.04]">
        <FadeUp className="text-center mb-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-indigo-300/50 block mb-4">Platform Capabilities</span>
          <h2 className="font-['Manrope'] font-bold text-3xl md:text-5xl text-white tracking-tight">What Powers The Forge</h2>
          <p className="text-white/30 text-sm mt-4 max-w-xl mx-auto">Click on any node to explore capabilities. Connected nodes show related features.</p>
        </FadeUp>

        <RadialOrbitalTimeline timelineData={timelineData} />
      </section>

      {/* ═══ CAPABILITIES GRID ═══ */}
      <section className="relative z-10 py-28 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-indigo-300/50 block mb-4">Engineered Capabilities</span>
            <h2 className="font-['Manrope'] font-bold text-3xl md:text-5xl text-white tracking-tight">Built for Professionals</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => (
              <StaggerCard key={i} i={i} className="group">
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-7 hover:bg-white/[0.04] hover:border-indigo-500/10 transition-all duration-500">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-5 group-hover:bg-indigo-500/20 transition-colors">
                    <cap.icon className="w-5 h-5 text-indigo-300" />
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
