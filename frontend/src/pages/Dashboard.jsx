import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useImageStore from '../store/useImageStore';
import { HiOutlineSparkles, HiOutlineDownload, HiOutlineRefresh, HiOutlineCloudUpload } from 'react-icons/hi';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { isGenerating, resultImage, enhancedPrompt, history, generateImage, runTool, fetchHistory, clearResult } = useImageStore();
  const [prompt, setPrompt] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'synth'; 
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (user) fetchHistory(user.id);
  }, [user]);

  const handleForge = () => {
    if (mode === 'synth') {
      if (!prompt.trim()) return;
      generateImage(prompt, user.id);
    } else {
      if (!selectedFile) return;
      runTool(mode, selectedFile, user.id);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen pt-10 px-4 lg:px-10 pb-20 text-white relative transition-all duration-700 selection:bg-white selection:text-black">
      <div className="max-w-5xl mx-auto">
        
        {/* Nav Indicator (Compact) */}
        <div className="mb-12 flex items-center justify-between">
           <div className="flex flex-col">
              <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] mb-2">Alpha Node</span>
              <h2 className="text-3xl font-black uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                {mode === 'synth' ? 'Generation' : 'Enhancement'}
              </h2>
           </div>
           <div className="hidden md:flex items-center gap-4 py-2.5 px-6 glass-glow glass-edge rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
              <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">System Steady</span>
           </div>
        </div>

        {/* Console Interface (Compact) */}
        <div className="max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="glass-glow glass-edge p-8 lg:p-10 rounded-[2.5rem] shadow-2xl border-white/[0.02]"
          >
            {mode === 'synth' ? (
              <div className="relative mb-10 group">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
                  placeholder="Architectural prompt input..."
                  className="w-full bg-white/[0.005] border border-white/5 rounded-3xl p-6 lg:p-8 text-xl lg:text-2xl font-light tracking-wide transition-all duration-700 focus:outline-none focus:border-white/10 focus:bg-white/[0.01] shadow-inner h-60 lg:h-64 resize-none"
                />
                <div className="absolute bottom-6 right-8 text-[9px] font-black text-gray-900 uppercase tracking-widest opacity-20 group-focus-within:opacity-100 transition-opacity">
                  {prompt.length} / 500
                </div>
              </div>
            ) : (
              <div className="relative mb-10 p-16 border border-dashed border-white/5 rounded-[2rem] hover:border-white/10 transition-all duration-700 cursor-pointer group bg-white/[0.005]">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                />
                <div className="flex flex-col items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center text-gray-800 group-hover:text-white transition-all duration-700 border border-white/5 group-hover:border-white/10 group-hover:scale-105 shadow-xl">
                    <HiOutlineCloudUpload className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-white/60 block mb-2">
                        {selectedFile ? selectedFile.name : 'Select Asset'}
                    </span>
                    <span className="text-[9px] font-bold text-gray-900 uppercase tracking-[0.2em]">
                        Payload limit: 10MB
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleForge}
              disabled={isGenerating || (mode === 'synth' ? !prompt.trim() : !selectedFile)}
              className={`w-full py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] transition-all duration-700 flex items-center justify-center gap-5 ${
                isGenerating 
                ? 'bg-white/5 text-gray-800' 
                : 'bg-white text-black hover:bg-white/90 active:scale-95 shadow-xl'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-gray-900 border-t-black rounded-full animate-spin" />
                  Forging...
                </>
              ) : (
                <>
                  <HiOutlineSparkles className="w-4 h-4" />
                  {mode === 'synth' ? 'Generate' : 'Enhance'}
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Result Stage (Refined) */}
        <AnimatePresence mode="wait">
          {resultImage && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto mb-32"
            >
              <div className="glass-glow glass-edge p-5 rounded-[3.5rem] shadow-3xl group relative">
                 <div className="absolute inset-x-10 top-10 z-20 flex justify-between items-center">
                    <span className="px-5 py-2 glass-glow glass-edge rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Result Node</span>
                    <div className="flex gap-3">
                        <a 
                            href={resultImage} 
                            download 
                            className="w-13 h-13 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-2xl"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <HiOutlineDownload className="w-5 h-5" />
                        </a>
                        <button 
                            onClick={clearResult}
                            className="w-13 h-13 rounded-full glass-glow glass-edge text-white flex items-center justify-center hover:scale-110 active:scale-90 transition-all border border-white/5"
                        >
                            <HiOutlineRefresh className="w-5 h-5" />
                        </button>
                    </div>
                 </div>

                <div className="overflow-hidden rounded-[2.8rem] bg-black/20">
                    <img src={resultImage} alt="Forge Yield" className="w-full h-auto transition-all duration-[3000ms] ease-out group-hover:scale-105" />
                </div>
              </div>
              
              {enhancedPrompt && (
                <div className="mt-12 px-12 py-12 glass-glow glass-edge rounded-[2.8rem] border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-white/5" />
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] block mb-8">Metadata</span>
                  <p className="text-gray-500 font-light text-xl lg:text-2xl leading-relaxed italic pr-12">
                    "{enhancedPrompt}"
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Historical Archive (Compact) */}
        <section className="pt-24 border-t border-white/[0.02]">
           <div className="text-center mb-24 flex flex-col items-center">
              <span className="text-[10px] font-black text-gray-900 uppercase tracking-[0.8em] mb-4">Historical Archive</span>
              <div className="w-12 h-1 bg-white/5 rounded-full" />
           </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-2">
            {(Array.isArray(history) ? history : []).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 1 }}
                className="aspect-square glass-glow glass-edge rounded-3xl group overflow-hidden border-white/5 hover:border-white/10 transition-all relative"
              >
                <img src={item.enhanced_url} alt="Archive Node" className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-[1.5s] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                   <span className="text-[9px] font-black uppercase tracking-[0.3em] mb-6 text-white/30 truncate w-full">{item.mode}</span>
                   <a href={item.enhanced_url} target="_blank" rel="noreferrer" className="w-full py-3.5 rounded-xl bg-white text-black font-black text-[8.5px] uppercase tracking-widest transition-all active:scale-95">
                     Open Node
                   </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
