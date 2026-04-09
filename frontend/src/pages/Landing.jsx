import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

export default function Landing() {
  const capabilities = [
    { tag: "Neural Foundry", title: "Unleash high-fidelity generations with precision latency controls.", desc: "Experience parallel synthesis architecture delivered through our proprietary neural clusters." },
    { tag: "Precision Control", title: "Fine-tune every aspect of your synthesis with modular weights.", desc: "Professional grade management for architectural visualization and high-end concept art." },
    { tag: "Real-time Sync", title: "Synchronize your forge assets across devices and cloud.", desc: "Seamless workflow integration with ultra-low latency infrastructure." }
  ];

  const realities = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=400&q=80"
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white relative">
      <HeroSection />
      
      <main className="px-6 relative z-10">
        {/* Engineered Capabilities Grid */}
        <section className="max-w-7xl mx-auto py-40">
           <div className="text-center mb-32">
              <h2 className="text-[10px] font-black uppercase tracking-[1em] text-gray-700 mb-6">Engineered Capabilities</h2>
              <div className="w-px h-16 bg-white/10 mx-auto" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="glass-premium p-12 rounded-[40px] border-white/[0.03] group hover:border-white/10 transition-colors"
                >
                  <div className="text-[9px] font-black text-white px-3 py-1 bg-white/5 rounded-full inline-block uppercase tracking-[0.4em] mb-10 group-hover:bg-white group-hover:text-black transition-colors">
                    {cap.tag}
                  </div>
                  <h3 className="text-2xl font-bold mb-8 leading-tight">{cap.title}</h3>
                  <p className="text-[11px] font-medium text-gray-600 uppercase tracking-widest leading-relaxed">
                    {cap.desc}
                  </p>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Forged Realities Gallery */}
        <section className="max-w-7xl mx-auto py-40">
           <div className="text-center mb-32">
              <h2 className="text-5xl archon-heading mb-6">Forged Realities</h2>
              <div className="h-px w-32 bg-white mx-auto" />
           </div>

           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {realities.map((url, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="aspect-[4/5] rounded-[32px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 group cursor-crosshair"
                >
                  <img src={url} alt="Forged Reality" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
                </motion.div>
              ))}
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
