import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { HiOutlineSparkles, HiOutlineLightningBolt, HiOutlineChatAlt2 } from 'react-icons/hi';
import { useRef } from 'react';

/* ═══════════════════════════════════
   ANIMATED GLOW BORDER CARD
   ═══════════════════════════════════ */
const GlowBorderCard = ({ children, className = '' }) => (
  <div className={`relative group ${className}`}>
    {/* Outer glow layers */}
    <div className="absolute z-[-1] overflow-hidden h-full w-full rounded-2xl blur-[3px]
      before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[60deg]
      before:bg-[conic-gradient(#000,#402fb5_5%,#000_38%,#000_50%,#cf30aa_60%,#000_87%)] before:transition-all before:duration-[2000ms]
      group-hover:before:rotate-[-120deg]" />
    <div className="absolute z-[-1] overflow-hidden h-full w-full rounded-2xl blur-[2px]
      before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
      before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)] before:transition-all before:duration-[2000ms]
      group-hover:before:rotate-[-98deg]" />
    {/* Inner bright border */}
    <div className="absolute z-[-1] overflow-hidden h-[calc(100%-4px)] w-[calc(100%-4px)] top-[2px] left-[2px] rounded-[14px] blur-[0.5px]
      before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[70deg]
      before:bg-[conic-gradient(#0a0a0f,#402fb5_5%,#0a0a0f_14%,#0a0a0f_50%,#cf30aa_60%,#0a0a0f_64%)] before:brightness-130
      before:transition-all before:duration-[2000ms] group-hover:before:rotate-[-110deg]" />
    {/* Content */}
    <div className="relative bg-[#0a0a0f] rounded-2xl overflow-hidden">
      {children}
    </div>
  </div>
);

/* ═══════════════════════════════════
   SCROLL ANIMATION WRAPPERS
   ═══════════════════════════════════ */
const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const SlideIn = ({ children, direction = 'left', delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: direction === 'left' ? -80 : 80, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const ScaleReveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const ParallaxSection = ({ children, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  return <motion.div ref={ref} style={{ y, opacity }} className={className}>{children}</motion.div>;
};

/* ═══════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════ */
const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const platformTools = [
    { icon: HiOutlineSparkles, title: 'AI Image Generator', desc: 'Transform text descriptions into stunning, high-fidelity images using cutting-edge Stable Diffusion neural networks. Generate photorealistic renders, concept art, architectural visualizations, and creative compositions — all from natural language prompts.' },
    { icon: HiOutlineLightningBolt, title: 'Precision Image Enhancer', desc: 'Elevate any image with AI-powered super-resolution upscaling. Our neural enhancement pipeline analyzes pixel-level patterns and intelligently reconstructs missing detail, producing sharp, artifact-free results even at 4x magnification.' },
    { icon: HiOutlineChatAlt2, title: 'Neural Chat Assistant', desc: 'Engage in natural conversation with our AI-powered creative assistant. Get real-time guidance on prompt engineering, receive artistic suggestions, troubleshoot generation issues, and explore new creative directions.' },
  ];

  const techStack = [
    { label: 'Frontend', items: ['React 18', 'Vite', 'Framer Motion', 'Three.js', 'TailwindCSS'] },
    { label: 'Backend', items: ['FastAPI', 'Python', 'NVIDIA NIM', 'Stable Diffusion'] },
    { label: 'Infrastructure', items: ['Vercel', 'Render', 'Supabase', 'Cloudinary'] },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden relative">
      
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-16 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 origin-left" style={{ scaleX }} />

      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      {/* ═══ HERO ═══ */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 80, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}>
            <motion.span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-indigo-300/50 block mb-6"
              initial={{ opacity: 0, letterSpacing: '0.8em' }} animate={{ opacity: 1, letterSpacing: '0.4em' }} transition={{ delay: 0.3, duration: 1 }}>
              About The Platform
            </motion.span>
            <h1 className="font-['Manrope'] font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] mb-8">
              <motion.span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-200/40 inline-block"
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                The Architect's
              </motion.span><br />
              <motion.span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-100 to-indigo-400/30 inline-block"
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                Console
              </motion.span>
            </h1>
            <motion.p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1 }}>
              Pixel Forge is a full-stack AI creative platform that puts the power of neural image synthesis directly into the hands of creators, designers, and developers.
            </motion.p>
          </motion.div>
          <motion.div className="mt-16 mx-auto w-32 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
            initial={{ width: 0, opacity: 0 }} animate={{ width: 128, opacity: 1 }} transition={{ delay: 1, duration: 1.2 }} />
        </div>
      </section>

      {/* ═══ MISSION with Glow Border Cards ═══ */}
      <section className="relative z-10 py-24 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <SlideIn direction="left">
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-indigo-300/40 block mb-4">Our Vision</span>
            <h2 className="font-['Manrope'] font-bold text-3xl md:text-4xl text-white tracking-tight mb-6">Democratizing Creative AI</h2>
            <div className="space-y-5 text-white/40 text-[15px] leading-relaxed">
              <p>We believe every professional should access the same AI tools once locked behind expensive enterprise subscriptions and complex technical setups. Pixel Forge removes every barrier between imagination and the final pixel.</p>
              <p>Our platform is built on open-source AI models and cloud-native infrastructure, delivering enterprise-grade capabilities through an interface that feels as intuitive as a conversation.</p>
              <p>Every feature is designed with obsessive attention to speed, quality, and reliability.</p>
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.2}>
            <GlowBorderCard>
              <div className="p-8 space-y-8">
                <h3 className="font-['Manrope'] font-bold text-lg text-white">Why Pixel Forge?</h3>
                {[
                  { num: '01', text: 'Instant generation — no GPU required on your end. All processing runs on NVIDIA cloud infrastructure.' },
                  { num: '02', text: 'Permanent cloud storage — every generated and enhanced image is automatically archived.' },
                  { num: '03', text: 'Built for iteration — compare, refine, and version your creative work with intelligent history.' },
                  { num: '04', text: 'Privacy first — your prompts, images, and creative data are never used for model training.' },
                ].map((item, i) => (
                  <motion.div key={i} className="flex gap-4" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.1 * i + 0.3, duration: 0.6 }}>
                    <span className="text-indigo-400/40 font-bold text-sm font-['Manrope'] shrink-0">{item.num}</span>
                    <p className="text-white/35 text-sm leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </GlowBorderCard>
          </SlideIn>
        </div>
      </section>

      {/* ═══ PLATFORM TOOLS with Glow Borders ═══ */}
      <section className="relative z-10 py-24 px-6 bg-gradient-to-b from-[#0a0a0f] to-[#0d0d15] border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-indigo-300/40 block mb-4">Core Tools</span>
            <h2 className="font-['Manrope'] font-bold text-3xl md:text-4xl text-white tracking-tight">Everything You Need</h2>
            <p className="text-white/30 text-sm mt-4 max-w-xl mx-auto">Three powerful tools, one unified platform.</p>
          </FadeUp>

          <div className="space-y-6">
            {platformTools.map((tool, i) => (
              <ScaleReveal key={i} delay={i * 0.15}>
                <ParallaxSection>
                  <GlowBorderCard>
                    <div className="p-8 md:p-10 group">
                      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                        <motion.div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors"
                          whileHover={{ scale: 1.15, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                          <tool.icon className="w-7 h-7 text-indigo-300" />
                        </motion.div>
                        <div>
                          <h3 className="font-['Manrope'] text-xl font-bold text-white mb-3 group-hover:text-indigo-100 transition-colors">{tool.title}</h3>
                          <p className="text-white/35 text-[15px] leading-relaxed group-hover:text-white/45 transition-colors">{tool.desc}</p>
                        </div>
                      </div>
                    </div>
                  </GlowBorderCard>
                </ParallaxSection>
              </ScaleReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="relative z-10 py-24 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-indigo-300/40 block mb-4">Under The Hood</span>
            <h2 className="font-['Manrope'] font-bold text-3xl md:text-4xl text-white tracking-tight">Technology Stack</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {techStack.map((stack, i) => (
              <ScaleReveal key={i} delay={i * 0.1}>
                <GlowBorderCard>
                  <motion.div className="p-7" whileHover={{ y: -4, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                    <h3 className="font-['Manrope'] font-bold text-sm text-indigo-300/60 uppercase tracking-wider mb-5">{stack.label}</h3>
                    <div className="flex flex-wrap gap-2">
                      {stack.items.map((item, j) => (
                        <motion.span key={j}
                          className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg text-xs text-white/50 font-medium hover:bg-indigo-500/10 hover:border-indigo-500/20 hover:text-indigo-200 transition-all cursor-default"
                          initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                          transition={{ delay: 0.05 * j + 0.2 * i }}>
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </GlowBorderCard>
              </ScaleReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DEVELOPER ═══ */}
      <section className="relative z-10 py-24 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <ScaleReveal className="flex flex-col items-center text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-indigo-300/40 block mb-12">Built By</span>
            <GlowBorderCard className="w-full max-w-lg">
              <motion.a href="https://github.com/koushiknagabhatla-ctrl" target="_blank" rel="noopener noreferrer"
                className="relative block px-12 py-10 overflow-hidden group" whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }}>
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 flex flex-col items-center gap-5">
                  <motion.div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500 group-hover:scale-110 transition-all duration-500"
                    whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                    <FaGithub className="w-8 h-8 text-indigo-300 group-hover:text-white transition-colors duration-500" />
                  </motion.div>
                  <div>
                    <h3 className="font-['Manrope'] text-xl font-bold text-white mb-1">Koushik Nagabhatla</h3>
                    <p className="text-xs text-white/30 uppercase tracking-wider">Developer & AI Engineer</p>
                  </div>
                </div>
              </motion.a>
            </GlowBorderCard>

            <motion.p className="text-[10px] uppercase tracking-[0.3em] text-white/15 mt-16"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
              © 2024 Pixel Forge Neural Systems
            </motion.p>
          </ScaleReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
