import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { Sparkles, Zap, MessageSquare } from 'lucide-react';
import { useRef } from 'react';
import { AnimatedBorderCard } from '../components/ui/animated-border-card';

/* ═══ Scroll wrappers ═══ */
const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}>{children}</motion.div>
);

const SlideIn = ({ children, direction = 'left', delay = 0, className = '' }) => (
  <motion.div initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}>{children}</motion.div>
);

const ScaleReveal = ({ children, delay = 0, className = '' }) => (
  <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}>{children}</motion.div>
);

const ParallaxSection = ({ children, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>;
};

/* ═══ ABOUT PAGE ═══ */
const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const platformTools = [
    { icon: Sparkles, title: 'Image Generation', desc: "Type a description — a landscape, a product shot, a character concept — and get a finished image in seconds. The AI handles composition, lighting, and detail automatically. You just describe what you want." },
    { icon: Zap, title: 'Image Enhancement', desc: "Upload any image that needs more detail or sharpness. The enhancer analyzes the existing pixels and intelligently fills in what's missing, giving you a cleaner, higher-resolution version without artifacts." },
    { icon: MessageSquare, title: 'Creative Assistant', desc: "Not sure how to phrase your prompt? The chat assistant can help you refine ideas, suggest styles, troubleshoot results, and explore creative directions you might not have considered." },
  ];

  const techStack = [
    { label: 'Frontend', items: ['React 18', 'Vite', 'Framer Motion', 'Three.js', 'TailwindCSS'] },
    { label: 'Backend', items: ['FastAPI', 'Python', 'NVIDIA NIM', 'Stable Diffusion'] },
    { label: 'Infrastructure', items: ['Vercel', 'Render', 'Supabase', 'Cloudinary'] },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#010201] text-white overflow-x-hidden relative">
      
      {/* Progress bar */}
      <motion.div className="fixed top-16 left-0 right-0 h-px bg-white/20 z-50 origin-left" style={{ scaleX }} />

      {/* ═══ HERO ═══ */}
      <section className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <motion.span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/20 block mb-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
              About
            </motion.span>
            <h1 className="font-headline text-5xl md:text-7xl tracking-tight mb-8">
              <motion.span className="text-white inline-block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
                The story behind
              </motion.span><br />
              <motion.span className="text-white/40 inline-block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}>
                Pixel Forge
              </motion.span>
            </h1>
            <motion.p className="text-white/30 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
              A platform built to make AI image tools accessible to everyone — designers, developers, hobbyists, and anyone in between.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══ MISSION ═══ */}
      <section className="relative z-10 py-24 px-6 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <SlideIn direction="left">
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/20 block mb-4">Why we built this</span>
            <h2 className="font-headline text-3xl md:text-4xl text-white tracking-tight mb-6">Good tools shouldn't be complicated</h2>
            <div className="space-y-5 text-white/35 text-[15px] leading-[1.8]">
              <p>Most AI image tools feel like they were built for engineers. You need to understand model architectures, configure environments, and wrestle with command-line interfaces just to generate a single image.</p>
              <p>We thought that was backwards. The technology should adapt to the user, not the other way around. So we built Pixel Forge to be the simplest path from "I have an idea" to "here's the finished image."</p>
              <p>Everything runs in the cloud on dedicated hardware. You don't need a powerful computer or a GPU. Just open your browser and start creating.</p>
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.15}>
            <AnimatedBorderCard className="p-8 space-y-7 flex flex-col justify-start">
              <h3 className="font-headline font-semibold text-base text-white/80">What makes this different</h3>
              {[
                { num: '01', text: "No downloads, no setup. Everything works directly in your browser." },
                { num: '02', text: "Your images are saved automatically. No more losing work because you forgot to export." },
                { num: '03', text: "Compare original and enhanced images side by side with an interactive slider." },
                { num: '04', text: "We don't train on your data. Your creative work stays yours — period." },
              ].map((item, i) => (
                <motion.div key={i} className="flex gap-4" initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.1 * i + 0.2, duration: 0.5 }}>
                  <span className="text-white/15 font-semibold text-sm font-headline shrink-0">{item.num}</span>
                  <p className="text-white/30 text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </AnimatedBorderCard>
          </SlideIn>
        </div>
      </section>

      {/* ═══ TOOLS ═══ */}
      <section className="relative z-10 py-24 px-6 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-16">
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/20 block mb-4">The toolkit</span>
            <h2 className="font-headline text-3xl md:text-4xl text-white tracking-tight">Three tools, one platform</h2>
          </FadeUp>

          <div className="space-y-6">
            {platformTools.map((tool, i) => (
              <ScaleReveal key={i} delay={i * 0.1}>
                <ParallaxSection className="h-full">
                  <AnimatedBorderCard className="p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start w-full">
                      <motion.div
                        className="w-11 h-11 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:bg-white/[0.08] transition-colors"
                        whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <tool.icon className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                      </motion.div>
                      <div>
                        <h3 className="font-headline text-lg font-semibold text-white/90 mb-2">{tool.title}</h3>
                        <p className="text-white/40 text-[15px] leading-[1.8] group-hover:text-white/50 transition-colors">{tool.desc}</p>
                      </div>
                    </div>
                  </AnimatedBorderCard>
                </ParallaxSection>
              </ScaleReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="relative z-10 py-24 px-6 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-16">
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/20 block mb-4">Under the hood</span>
            <h2 className="font-headline text-3xl md:text-4xl text-white tracking-tight">Built with modern tools</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {techStack.map((stack, i) => (
              <ScaleReveal key={i} delay={i * 0.08} className="h-full">
                <AnimatedBorderCard className="p-6 h-full flex flex-col justify-start text-left">
                  <h3 className="font-headline font-semibold text-xs text-white/35 uppercase tracking-wider mb-4">{stack.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item, j) => (
                      <motion.span key={j}
                        className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.05] rounded-lg text-xs text-white/40 font-medium hover:bg-white/[0.06] hover:text-white/60 transition-all cursor-default"
                        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                        transition={{ delay: 0.04 * j + 0.15 * i }}>
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </AnimatedBorderCard>
              </ScaleReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DEVELOPER ═══ */}
      <section className="relative z-10 py-24 px-6 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <ScaleReveal className="flex flex-col items-center text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/20 block mb-10">Built by</span>
            <motion.a href="https://github.com/koushiknagabhatla-ctrl" target="_blank" rel="noopener noreferrer"
              className="block group h-full"
              whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.25 }}>
              <AnimatedBorderCard className="px-12 py-10">
                <div className="flex flex-col items-center gap-4">
                  <motion.div className="w-14 h-14 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-white group-hover:border-white/20 transition-all duration-400"
                    whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                    <FaGithub className="w-7 h-7 text-white/40 group-hover:text-black transition-colors duration-400" />
                  </motion.div>
                  <div className="text-center">
                    <h3 className="font-headline text-xl font-semibold text-white mb-1">Koushik Nagabhatla</h3>
                    <p className="text-xs text-white/25">Developer & Designer</p>
                  </div>
                </div>
              </AnimatedBorderCard>
            </motion.a>

            <p className="text-[11px] text-white/10 mt-16">© 2024 Pixel Forge</p>
          </ScaleReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
