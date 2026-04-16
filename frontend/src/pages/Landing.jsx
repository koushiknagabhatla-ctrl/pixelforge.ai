import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { WebGLShader } from '../components/ui/web-gl-shader';
import { LiquidButton } from '../components/ui/liquid-glass-button';
import { StarButton } from '../components/ui/star-button';
import RadialOrbitalTimeline from '../components/ui/radial-orbital-timeline';
import { AnimatedBorderCard } from '../components/ui/animated-border-card';
import useAuthStore from '../store/useAuthStore';
import { ArrowRight, Sparkles, Zap, Shield, Sliders, Cloud, Brain } from 'lucide-react';
import { useRef } from 'react';

/* ═══ Scroll animation wrappers ═══ */
const FadeUp = ({ children, className = '', delay = 0, id }) => (
  <motion.div id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}>
    {children}
  </motion.div>
);

const StaggerCard = ({ children, className = '', i = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}>
    {children}
  </motion.div>
);

/* ═══ Timeline data ═══ */
const timelineData = [
  { id: 1, title: "Image Generation", date: "Core", content: "Turn your ideas into visuals. Describe what you're imagining, and watch it come to life in seconds.", category: "Generation", icon: Sparkles, relatedIds: [2], status: "completed", energy: 100 },
  { id: 2, title: "Smart Enhancement", date: "Core", content: "Take any image and make it sharper, cleaner, and more detailed — without losing the original feel.", category: "Enhancement", icon: Zap, relatedIds: [1, 3], status: "completed", energy: 95 },
  { id: 3, title: "Creative Assistant", date: "Core", content: "Not sure how to describe what you want? Chat with the assistant — it'll help you get there.", category: "Chat", icon: Brain, relatedIds: [2, 4], status: "completed", energy: 90 },
  { id: 4, title: "Your Data, Your Rules", date: "Security", content: "We don't use your images to train anything. What you create stays yours, always.", category: "Security", icon: Shield, relatedIds: [3, 5], status: "completed", energy: 85 },
  { id: 5, title: "Saved to the Cloud", date: "Infra", content: "Every image you create or enhance is saved automatically. Pick up where you left off, on any device.", category: "Infrastructure", icon: Cloud, relatedIds: [4, 6], status: "in-progress", energy: 70 },
  { id: 6, title: "Dial It In", date: "Pro", content: "For the detail-oriented: tweak prompts, adjust parameters, and control exactly how your images turn out.", category: "Pro", icon: Sliders, relatedIds: [5], status: "in-progress", energy: 60 },
];

/* ═══ LANDING PAGE ═══ */
const Landing = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.96]);

  const capabilities = [
    { icon: Sparkles, title: 'Text to Image', desc: 'Describe anything in plain language and get a high-quality image back. No design skills needed.' },
    { icon: Zap, title: 'Fast Processing', desc: 'Images generate in seconds, not minutes. Powered by dedicated GPU infrastructure running 24/7.' },
    { icon: Shield, title: 'Private by Default', desc: "Your images and prompts are never used for training. We don't sell your data or share it with anyone." },
    { icon: Sliders, title: 'Full Control', desc: 'Adjust everything from style to composition. Negative prompts, seed control, and aspect ratios included.' },
    { icon: Cloud, title: 'Auto-Saved', desc: 'Every creation is automatically stored in the cloud. Access your entire history from any browser.' },
    { icon: Brain, title: 'Built-In Help', desc: "Stuck on a prompt? The AI assistant can suggest improvements, fix issues, and explore new directions with you." },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-x-hidden relative w-full">
      
      {/* ═══ HERO ═══ */}
      <motion.section ref={heroRef} style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[100vh] flex flex-col items-center justify-center text-center z-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <WebGLShader />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full">
          <div className="relative border border-zinc-800/50 p-2 w-full mx-auto max-w-3xl">
            <main className="relative border border-zinc-800/50 py-10 overflow-hidden backdrop-blur-sm bg-black/20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-6">
                
                <h1 className="mb-3 text-center text-6xl sm:text-7xl font-bold tracking-tighter md:text-[clamp(2rem,8vw,7rem)] font-headline">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">PIXEL</span>
                  {' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/25">FORGE</span>
                </h1>
                
                <p className="text-white/45 px-6 text-center text-sm md:text-base max-w-md mx-auto leading-relaxed">
                  Create and enhance images with AI. Simple tools, professional results, no learning curve.
                </p>
                
                <div className="flex items-center justify-center gap-1">
                  <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  </span>
                  <p className="text-[11px] text-emerald-400/80 ml-1">Online</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  {user ? (
                    <div onClick={() => navigate('/chatbot')} className="cursor-pointer">
                      <LiquidButton className="px-8 py-3 rounded-full text-sm font-semibold flex items-center gap-2">
                        Open Studio <ArrowRight className="w-4 h-4" />
                      </LiquidButton>
                    </div>
                  ) : (
                    <>
                      <div onClick={() => navigate('/signup')} className="cursor-pointer">
                        <LiquidButton className="px-8 py-3 rounded-full text-sm font-semibold">
                          Get Started Free
                        </LiquidButton>
                      </div>
                      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/login')}
                        className="px-8 py-3 bg-white/[0.06] border border-white/[0.08] text-white/70 rounded-full text-sm font-medium hover:bg-white/[0.1] transition-colors">
                        Sign In
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            </main>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/15">Scroll to explore</span>
          <motion.div className="w-px h-8 bg-gradient-to-b from-white/15 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        </motion.div>
      </motion.section>

      {/* ═══ FEATURES — Orbital Timeline ═══ */}
      <section className="relative z-10 py-12 bg-gradient-to-b from-[#09090b] to-[#0c0c0e] border-t border-white/[0.04]">
        <FadeUp className="text-center mb-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/25 block mb-4">What You Can Do</span>
          <h2 className="font-headline text-3xl md:text-5xl text-white tracking-tight">Explore the Platform</h2>
          <p className="text-white/25 text-sm mt-4 max-w-lg mx-auto">Click on any node to see how each feature connects.</p>
        </FadeUp>
        <RadialOrbitalTimeline timelineData={timelineData} />
      </section>

      {/* ═══ CAPABILITIES ═══ */}
      <section className="relative z-10 py-28 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/25 block mb-4">Features</span>
            <h2 className="font-headline text-3xl md:text-5xl text-white tracking-tight">Everything included</h2>
            <p className="text-white/25 text-sm mt-4 max-w-md mx-auto">No feature gates, no hidden costs. Every tool is available from day one.</p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => (
              <StaggerCard key={i} i={i} className="group h-full">
                <AnimatedBorderCard className="p-6 h-full flex flex-col items-start text-left">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-white/[0.08] transition-colors">
                    <cap.icon className="w-4 h-4 text-white/50 group-hover:text-white/70 transition-colors" />
                  </div>
                  <h3 className="font-headline text-[15px] font-semibold text-white/90 mb-2">{cap.title}</h3>
                  <p className="text-[13px] text-white/30 leading-relaxed">{cap.desc}</p>
                </AnimatedBorderCard>
              </StaggerCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-sm bg-white/30" />
            <span className="font-headline font-medium text-sm text-white/40">Pixel Forge</span>
          </div>
          <p className="text-xs text-white/15">© 2024 Pixel Forge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
