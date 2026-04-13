import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import Background3D from '../components/Background3D';
import useAuthStore from '../store/useAuthStore';

// Simple animation wrappers
const MotionSection = ({ children, className, id }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.section>
);

const Landing = () => {
  const containerRef = useRef(null);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div ref={containerRef} className="min-h-screen bg-[#131313] text-[#e2e2e2] overflow-x-hidden pt-16 relative w-full font-['Inter']">
      
      {/* Interactive 3D Cursor Tracking Background */}
      <Background3D />

      {/* Grid overlay for aesthetic */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.2
      }}></div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-8 text-center z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
           animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="relative z-10 w-full max-w-4xl"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

          <h1 className="font-['Manrope'] font-extrabold text-5xl md:text-7xl lg:text-[9rem] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-2xl mb-6">
              PIXEL FORGE
          </h1>
          <p className="font-['Manrope'] font-light tracking-[0.4em] text-zinc-400 text-xs md:text-sm lg:text-base max-w-2xl mx-auto uppercase">
              THE ARCHITECT'S CONSOLE FOR NEURAL IMAGE SYNTHESIS
          </p>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
            {user ? (
               <button onClick={() => navigate('/chatbot')} className="group relative px-10 py-5 bg-white text-black rounded-full font-['Manrope'] font-bold text-sm tracking-widest uppercase overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                 <span className="relative z-10">ENTER FORGE</span>
                 <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </button>
            ) : (
              <>
                <button onClick={() => navigate('/signup')} className="group relative px-10 py-5 bg-white text-black rounded-full font-['Manrope'] font-bold text-sm tracking-widest uppercase overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                  <span className="relative z-10">ENTER FORGE</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button onClick={() => navigate('/login')} className="px-10 py-5 bg-[#353535] text-white rounded-full font-['Manrope'] font-bold text-sm tracking-widest uppercase transition-all hover:bg-[#474747] active:scale-95 backdrop-blur-md border border-white/10">
                    SIGN IN
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="font-['Inter'] uppercase tracking-widest text-[10px] text-zinc-500">Discover Foundry</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-600 to-transparent"></div>
        </motion.div>
      </section>

      {/* Features Bento Grid */}
      <MotionSection className="max-w-7xl mx-auto px-8 py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Large Feature Card */}
          <div className="md:col-span-8 bg-[#1B1B1B]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-12 relative overflow-hidden group">
            <div className="absolute inset-y-0 right-0 w-1/2 opacity-40 mix-blend-screen pointer-events-none transition-transform duration-1000 group-hover:scale-105">
              <img className="w-full h-full object-cover filter grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoUrR5l4sqBZICYK6AKYgbrhNECw_CJv8x-_thNaBqmv8gZcSGW4o9JTg0VguM9LTxGyG5zNkSi50v0jeZB7TfN7aW79ksX02bxv3h4rMft4-uHd9Y1J7tlD_klgxTiExELlX1zp_nXL-OrQlcsMFjyrZiePbbYov3VwX32PRIs9aRr8dlVmsyIEWgDhPHr3aoqUneBBCjIPSXEzhhiEC2cQDwMzcsB_hoCQIhYaWsGukcIauGnvJTI34YP5HKkeekJFh8nvg4qafp" alt="Abstract render" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B1B1B] to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-md">
              <span className="font-['Inter'] uppercase tracking-widest text-[10px] text-zinc-500 mb-4 block">Engine Core</span>
              <h2 className="text-white font-['Manrope'] text-4xl font-bold mb-6">Neural Foundry</h2>
              <p className="text-zinc-400 font-['Inter'] text-lg leading-relaxed mb-8">
                  Experience the next generation of generative AI. Our proprietary architecture delivers unparalleled fidelity, ensuring every pixel is synthesized with architectural precision and creative intent.
              </p>
              <span className="inline-flex items-center gap-2 text-white font-['Manrope'] font-bold text-sm tracking-widest uppercase cursor-pointer group-hover:gap-4 transition-all">
                  Explore Technicals <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Small Feature Card 1 */}
          <div className="md:col-span-4 bg-[#2A2A2A]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 flex flex-col justify-between hover:bg-[#353535]/80 transition-colors">
            <span className="material-symbols-outlined text-4xl text-white mb-8">tune</span>
            <div>
              <h3 className="text-white font-['Manrope'] text-xl font-bold mb-3">Precision Control</h3>
              <p className="text-zinc-400 font-['Inter'] text-sm leading-relaxed">
                  Fine-tune every aspect of your synthesis with modular weights, negative prompting, and latent space manipulation.
              </p>
            </div>
          </div>

          {/* Small Feature Card 2 */}
          <div className="md:col-span-4 bg-[#1F1F1F]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 flex flex-col justify-between hover:bg-[#2A2A2A]/80 transition-colors">
            <span className="material-symbols-outlined text-4xl text-white mb-8">sync_alt</span>
            <div>
              <h3 className="text-white font-['Manrope'] text-xl font-bold mb-3">Real-time Sync</h3>
              <p className="text-zinc-400 font-['Inter'] text-sm leading-relaxed">
                  Synchronize your forge assets across desktop and cloud seamlessly with ultra-low latency infrastructure.
              </p>
            </div>
          </div>

          {/* Medium Feature Card */}
          <div className="md:col-span-8 bg-[#0E0E0E]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-12 flex items-center justify-between gap-12 group overflow-hidden relative">
             <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className="absolute inset-0 bg-white/10 blur-[100px] group-hover:bg-white/20 transition-all rounded-full scale-150"></div>
             </div>
            <div className="relative z-10 max-w-sm">
              <h2 className="text-white font-['Manrope'] text-3xl font-bold mb-4">Architectural Motifs</h2>
              <p className="text-zinc-500 font-['Inter'] text-base">
                  Built for professionals who demand structural integrity in their visual assets. Perfect for architectural visualization and high-end concept art.
              </p>
            </div>
            <div className="hidden md:flex relative z-10 w-48 h-48 rounded-full border border-white/10 items-center justify-center group-hover:rotate-180 transition-all duration-1000">
              <div className="w-32 h-32 border-t border-b border-white/40 rounded-full animate-spin-slow"></div>
            </div>
          </div>
          
        </div>
      </MotionSection>

      {/* Creative Showcase */}
      <MotionSection className="bg-[#1B1B1B] py-32 px-8 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="font-['Manrope'] font-extrabold text-4xl md:text-5xl text-white mb-6 tracking-tight">FORGED REALITIES</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
              { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG50XxpqH_XRzZL1-lyrCZqdPZ-LHJHb4HMXlV4rBqnMgZaEfQvoXsXy_9O5wc6CPIrgb4_8m9WVpxePLCEdOpemK22ILVOJqB6VUWSkK6FWeRl97CLYgfDh2IOoKvSsIlVg2Vy_nBlAU8tKbSjCa-dpmO5c7RHAR7QiZhBBxeBDS6J7XliwbLJ8fnDr7olHwhmmD-eLx-LFo6rdWJsIT0dAdfQqkCliIlqJDJiqjRCEKGcaQsSGixTWRoOEChEwtqPPj00H99IUPh", title: "Subject_01: Brutalist Core" },
              { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgEi0B2qqcEYTkZwr95gZAcnEqNQT6CPm9xgWLcopPN73tPcLpE12K_wAcYImonG_OGifMSfVp82mG9htB5uf-oYQ5hmUgb8hoSVHgSqLYXbTh2YzZVyJPu-wGR5WvQRCVLAgY8J6-_yqbChsJqHpgaHZd-1n3AEWkZpLLBK4uWI34uyeo6OhJpwxJyRr1XsomLg71_Z5YwAU9GeD4_DDXLWbzUuh6blXx91FicmEGz3NSeQ_MUyySLd4L9G26LHZ7fTkWvO9LHNzm", title: "Subject_02: Synaptic Mesh", mt: "mt-8" },
              { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAf4QkWeXuGNE-SEgYXyWmZ0ez8EznXgAZbovk1FBlIFjawn2wQ0jbYQFKt55QykzZkUbIZZfg5g5sum6hlTNNf4LdLLw077L-3uAsv3mDxOGGbylaF3TmWD-5vXnszskDwsTxbVcbKHieZiqb3nQihklcQMApVKQUkuXGSVxSZo1iEbRUmBIJep2SSikeMvflwC8GqPFu5r4IkUsNuJ4LHJQG4_oPtXt80ep9nVj5jzU5Kzp8LyXl7v-Fn93vXjcUhQWU6JJrtSz22", title: "Subject_03: Fluid Form" },
              { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnGjCBV_INoVrHxjW4EKWGZ15coIEcBSW5XTJHfokvgzf6U_ZGuCxjsU3a8r6r2OrIIJvJyAWqXbY-ddAJnri2rF1DPcqTaohPtftVT5uiXbrpu-hGvHZELl7MZ_M9_86CPwOjJ-EfHo539kvkxY4cuzSlWgKB7TGx5IoWbJPNVb_u8ghSu3-yG7uc5esicPSa3WTW4vbDx_leL9adAY0wZp_s-lSn3nfpF5DHDW3A6z49r30NwzEgxY6udlOrvCePc3KLk2SmvU9L", title: "Subject_04: Obsidian Void", mt: "mt-8" }
          ].map((item, i) => (
             <div key={i} className={`aspect-[4/5] bg-surface rounded-xl overflow-hidden relative group border border-white/10 shadow-2xl ${item.mt || ''}`}>
                <img className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110" src={item.src} alt={item.title} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>
                <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black via-black/80 to-transparent w-full">
                   <p className="text-[10px] font-['Inter'] uppercase tracking-widest text-white">{item.title}</p>
                </div>
             </div>
          ))}
        </div>
      </MotionSection>

      {/* Footer / CTA Section */}
      <footer className="py-32 px-8 text-center relative z-10 bg-[#0E0E0E]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-white/20 to-transparent"></div>
        <h2 className="font-['Manrope'] font-bold text-4xl md:text-6xl text-white mb-8 tracking-tighter mt-12">PREPARE FOR IGNITION</h2>
        <p className="text-zinc-500 font-['Inter'] uppercase tracking-widest text-xs mb-12">Architectural Grade Generation</p>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-sm">token</span>
                <span className="text-sm font-black tracking-tighter text-white uppercase font-['Manrope']">PIXEL FORGE</span>
            </div>
            <span className="hidden md:inline text-white/20">|</span>
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600">© 2024 Pixel Forge Neural Systems</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
