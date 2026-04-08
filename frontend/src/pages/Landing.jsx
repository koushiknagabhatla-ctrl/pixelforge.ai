import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen text-white relative">
      <Navbar />
      
      <main className="pt-32 px-6">
        {/* Dynamic Architect Hero */}
        <section className="max-w-7xl mx-auto flex flex-col items-center text-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center font-black text-2xl text-black mb-12 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
          >
            P
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-gradient tracking-tighter mb-8"
          >
            PIXEL FORGE
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-500 max-w-2xl font-light uppercase tracking-[0.4em] mb-16"
          >
            The Architect's Console for Neural Image Synthesis
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-6"
          >
            <button 
              onClick={() => navigate('/signup')}
              className="px-12 py-6 bg-white text-black font-black text-xs uppercase tracking-[0.4em] rounded-2xl hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-2xl"
            >
              Enter Forge
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="px-12 py-6 glass-button font-black text-xs uppercase tracking-[0.4em] rounded-2xl"
            >
              Sign In
            </button>
          </motion.div>
        </section>

        {/* Feature Grid */}
        <section className="max-w-7xl mx-auto py-40 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { tag: "Neural", title: "Imagen 3 Engine", desc: "Highest fidelity generation directly from Google's deep research neural networks." },
            { tag: "Architecture", title: "Prompt Forge", desc: "Built-in Gemini Flash prompt enhancement layer for professional artistic results." },
            { tag: "Cloud", title: "Vercel Optimized", desc: "Lightweight architecture built specifically for serverless performance and speed." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-12 rounded-3xl"
            >
              <div className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em] mb-8">{feature.tag}</div>
              <h3 className="text-3xl font-bold mb-6">{feature.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center">
        <span className="text-[9px] font-black text-gray-800 uppercase tracking-[1em]">
          Pixel Forge Architecture v2.0
        </span>
      </footer>
    </div>
  );
}
