import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useImageStore from '../store/useImageStore';
import { HiOutlineSparkles, HiOutlineDownload, HiOutlineRefresh, HiOutlineCloudUpload, HiOutlineEye } from 'react-icons/hi';

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
    <div className="min-h-screen bg-[#050505] pt-12 px-6 lg:px-12 pb-20 text-white neural-grain overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Indicator */}
        <div className="mb-16 flex items-center justify-between">
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-2">Workspace Alpha</span>
              <h2 className="text-4xl font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">
                {mode === 'synth' ? 'Image Generation' : 'AI Enhancement'}
              </h2>
           </div>
           <div className="hidden md:flex items-center gap-4 py-3 px-8 glass-glow glass-edge rounded-full shadow-2xl">
              <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
              <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] leading-none">System Live</span>
           </div>
        </div>

        {/* Console Interface */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-glow glass-edge p-10 lg:p-14 rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] border-white/5"
          >
            {mode === 'synth' ? (
              <div className="relative mb-12 group">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
                  placeholder="Visualize your architectural dream..."
                  className="w-full bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-8 lg:p-12 text-2xl lg:text-3xl font-light tracking-wide transition-all duration-700 focus:outline-none focus:border-white/20 focus:bg-white/[0.03] shadow-inner h-72 lg:h-80 resize-none"
                />
                <div className="absolute bottom-8 right-10 text-[10px] font-black text-gray-800 uppercase tracking-widest opacity-20 group-focus-within:opacity-100 transition-opacity">
                  {prompt.length} / 500
                </div>
              </div>
            ) : (
              <div className="relative mb-12 p-24 border border-dashed border-white/5 rounded-[3rem] hover:border-white/20 transition-all duration-700 cursor-pointer group bg-white/[0.005]">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                />
                <div className="flex flex-col items-center gap-8">
                  <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center text-gray-700 group-hover:text-white transition-all duration-700 border border-white/5 group-hover:border-white/20 group-hover:scale-110 shadow-2xl">
                    <HiOutlineCloudUpload className="w-10 h-10" />
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-black uppercase tracking-[0.5em] text-white block mb-3">
                        {selectedFile ? selectedFile.name : 'Select Asset'}
                    </span>
                    <span className="text-[10px] font-bold text-gray-800 uppercase tracking-[0.3em]">
                        Max Payload: 10MB (JPG, PNG, WebP)
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleForge}
              disabled={isGenerating || (mode === 'synth' ? !prompt.trim() : !selectedFile)}
              className={`w-full py-8 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.5em] transition-all duration-700 flex items-center justify-center gap-6 ${
                isGenerating 
                ? 'bg-white/5 text-gray-700 border border-white/5' 
                : 'bg-white text-black hover:bg-gray-200 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.05)]'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-800 border-t-black rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <HiOutlineSparkles className="w-5 h-5" />
                  {mode === 'synth' ? 'Generate' : 'Enhance'}
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Result Stage */}
        <AnimatePresence mode="wait">
          {resultImage && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl mx-auto mb-40"
            >
              <div className="glass-glow glass-edge p-6 rounded-[4rem] shadow-[0_0_150px_rgba(0,0,0,0.6)] group relative">
                 <div className="absolute inset-x-12 top-12 z-20 flex justify-between items-center">
                    <span className="px-6 py-3 glass-glow glass-edge rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Forge Output v6.0</span>
                    <div className="flex gap-4">
                        <a 
                            href={resultImage} 
                            download 
                            className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-2xl"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <HiOutlineDownload className="w-6 h-6" />
                        </a>
                        <button 
                            onClick={clearResult}
                            className="w-16 h-16 rounded-full glass-glow glass-edge text-white flex items-center justify-center hover:scale-110 active:scale-90 transition-all border border-white/5"
                        >
                            <HiOutlineRefresh className="w-6 h-6" />
                        </button>
                    </div>
                 </div>

                <div className="overflow-hidden rounded-[3rem] bg-black/40">
                    <img src={resultImage} alt="Forge Result" className="w-full h-auto transition-all duration-[3000ms] ease-out group-hover:scale-105" />
                </div>
              </div>
              
              {enhancedPrompt && (
                <div className="mt-16 px-16 py-16 glass-glow glass-edge rounded-[3.5rem] border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-white/10" />
                  <span className="text-[11px] font-black text-gray-700 uppercase tracking-[0.6em] block mb-10">Neural Metadata</span>
                  <p className="text-gray-400 font-light text-2xl lg:text-3xl leading-relaxed italic pr-20">
                    "{enhancedPrompt}"
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Archive Section */}
        <section className="pt-32 border-t border-white/[0.03]">
           <div className="text-center mb-32">
              <span className="text-[11px] font-black text-gray-800 uppercase tracking-[1em] block mb-6">Historical Forge</span>
              <h2 className="text-5xl archon-heading mb-6 tracking-[0.4em]">Archives</h2>
              <div className="w-16 h-1 bg-white/10 mx-auto rounded-full" />
           </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            {(Array.isArray(history) ? history : []).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className="aspect-square glass-glow glass-edge rounded-[2.5rem] group overflow-hidden border-white/5 hover:border-white/20 transition-all relative"
              >
                <img src={item.enhanced_url} alt="Archive" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-[1.5s] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-white/40">{item.mode}</span>
                   <a href={item.enhanced_url} target="_blank" rel="noreferrer" className="w-full py-4 rounded-xl bg-white text-black font-black text-[9px] uppercase tracking-widest active:scale-95 transition-all">
                     View Source
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
