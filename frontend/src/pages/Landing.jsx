import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ title, description, badge, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
    style={{ transformStyle: "preserve-3d" }}
    className="glass-card p-12 rounded-[40px] flex flex-col justify-between min-h-[450px] h-full relative group"
  >
    <div className="absolute inset-0 bg-white/[0.02] rounded-[40px] -z-10 group-hover:bg-white/[0.05] transition-all" />
    <div>
      <div className="text-gray-600 mb-8 font-bold text-[10px] tracking-[0.4em] uppercase">{badge}</div>
      <h3 className="text-4xl font-bold mb-8 text-white tracking-tight leading-tight">{title}</h3>
      <p className="text-gray-500 font-light leading-relaxed text-lg">{description}</p>
    </div>
    <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
      <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-white/10 group-hover:text-white/40 group-hover:border-white/20 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
      <span className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.4em]">Engine: v4.0</span>
    </div>
  </motion.div>
);

const Landing = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="bg-black min-h-screen text-white relative">
      <Navbar />
      
      <main>
        {/* Dynamic 3D Hero */}
        <HeroSection />
        
        {/* Core Architecture Section */}
        <section className="py-48 px-8 lg:px-16 relatives z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
              <div className="max-w-3xl">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="w-20 h-1 bg-white mb-12" 
                />
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">REFINED <span className="text-gray-600">ARCHITECT.</span></h2>
                <p className="text-gray-500 text-xl font-light leading-relaxed max-w-2xl">
                  Every algorithm in Pixel Forge is built for high-performance mission critical environments. We provide the tools for elite computational image engineering.
                </p>
              </div>
              <Button 
                onClick={() => navigate('/signup')}
                variant="outline" 
                className="border-white/10 hover:bg-white/5 h-16 px-12 uppercase text-[10px] tracking-[0.4em] font-bold rounded-2xl transition-all shadow-2xl"
              >
                Enter Architecture
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                badge="Neural Path"
                title="Symmetry Tracking"
                description="Our AI engine doesn't just process; it reconstructs structural integrity. Predict and enhance missing data with proprietary forge networks."
                delay={0.1}
              />
              <FeatureCard 
                badge="Security"
                title="Zero-Trust Logic"
                description="Every workflow is isolated and encrypted. We build systems that assume maximum security requirements from the ground up."
                delay={0.2}
              />
              <FeatureCard 
                badge="Performance"
                title="Edge Resilience"
                description="High-performance throughput for enterprise-scale workloads. Built to sustain the heaviest image processing pipelines."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Global CTA Section */}
        <section className="py-48 px-8 border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight">FORM THE <span className="text-gray-600">UNSEEN.</span></h2>
            <p className="text-gray-500 mb-16 text-xl font-light uppercase tracking-widest leading-loose">
              Join the elite architects using Pixel Forge to push the boundaries of visual clarity and resolution.
            </p>
            <Button 
              onClick={() => navigate('/signup')}
              className="bg-white text-black hover:bg-gray-200 h-20 px-16 rounded-3xl text-xs font-bold uppercase tracking-[0.5em] shadow-[0_0_60px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95"
            >
              Construct Account
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-32 px-12 lg:px-24 border-t border-white/5 bg-black/50 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
          <div className="space-y-6">
            <div className="text-white text-3xl font-bold tracking-tighter uppercase leading-none">
              PIXEL <span className="text-gray-700">FORGE</span>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.5em]">
                © 2026 PIXEL FORGE AI. ALL RIGHTS RESERVED.
                </p>
                <p className="text-gray-700 text-[9px] font-bold uppercase tracking-[0.4em]">
                Developed by <span className="text-gray-400">Koushik</span>
                </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-24 items-start sm:items-center">
            <div className="flex flex-col gap-4">
                <span className="text-[9px] font-bold text-gray-700 uppercase tracking-[0.5em] mb-2">Protocol</span>
                <a href="#" className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-[0.3em]">Documentation</a>
                <a href="#" className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-[0.3em]">Security Spec</a>
            </div>
            <div className="flex flex-col gap-4">
                <span className="text-[9px] font-bold text-gray-700 uppercase tracking-[0.5em] mb-2">Architect</span>
                <a 
                    href="https://github.com/koushiknagabhatla-ctrl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-white/60 hover:text-white transition-colors uppercase tracking-[0.3em] flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub Console
                </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
