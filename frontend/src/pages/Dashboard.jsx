import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useImageStore from '../store/useImageStore';
import { HiOutlineSparkles, HiOutlineDownload, HiOutlineEye, HiOutlineRefresh, HiOutlineCloudUpload } from 'react-icons/hi';

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
    <div className="min-h-screen bg-[#050505] pt-12 px-6 lg:px-12 pb-20 text-white neural-grain">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Indicator */}
        <div className="mb-16 flex items-center justify-between">
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-2">Neural Workspace</span>
              <h2 className="text-3xl archon-heading">{mode === 'synth' ? 'Matrix Synthesis' : 'Vision Modulation'}</h2>
           </div>
           <div className="hidden md:flex items-center gap-4 py-2 px-6 glass-premium rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-none">Cluster Status: Active</span>
           </div>
        </div>

        {/* Forge Console */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-premium p-10 rounded-[40px] border-white/[0.03]"
          >
            {mode === 'synth' ? (
              <div className="relative mb-10 group">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
                  placeholder="Describe the architecture of your vision..."
                  className="forge-input-premium h-64 resize-none text-2xl font-light tracking-wide transition-all"
                />
                <div className="absolute bottom-6 right-8 text-[10px] font-bold text-gray-700 uppercase tracking-widest opacity-40 group-focus-within:opacity-100 transition-opacity">
                  {prompt.length} / 500
                </div>
              </div>
            ) : (
              <div className="relative mb-10 p-20 border border-dashed border-white/5 rounded-[40px] hover:border-white/20 transition-all cursor-pointer group bg-white/[0.01]">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                />
                <div className="flex flex-col items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-gray-600 group-hover:text-white transition-all border border-white/5 group-hover:border-white/20">
                    <HiOutlineCloudUpload className="w-10 h-10" />
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-black uppercase tracking-[0.4em] text-white block mb-2">
                        {selectedFile ? selectedFile.name : 'Ingest Asset'}
                    </span>
                    <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">
                        Standard Modulation Input (PNG, JPG, WEBP)
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleForge}
              disabled={isGenerating || (mode === 'synth' ? !prompt.trim() : !selectedFile)}
              className={`pill-button w-full flex items-center justify-center gap-6 ${
                isGenerating 
                ? 'bg-white/5 text-gray-600' 
                : 'pill-primary'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-600 border-t-black rounded-full animate-spin" />
                  Neural Sequence in Progress...
                </>
              ) : (
                <>
                  <HiOutlineSparkles className="w-5 h-5" />
                  {mode === 'synth' ? 'Forge Matrix' : 'Begin Modulation'}
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
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-4xl mx-auto mb-32"
            >
              <div className="glass-premium p-4 rounded-[48px] overflow-hidden group relative">
                 <div className="absolute inset-x-8 top-8 z-20 flex justify-between">
                    <span className="px-4 py-2 glass-premium rounded-full text-[9px] font-black uppercase tracking-widest">Archon Output v3</span>
                    <div className="flex gap-2">
                        <a 
                            href={resultImage} 
                            download 
                            className="p-4 rounded-full bg-white text-black hover:scale-110 active:scale-95 transition-all shadow-2xl"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <HiOutlineDownload className="w-5 h-5" />
                        </a>
                        <button 
                            onClick={clearResult}
                            className="p-4 rounded-full glass-premium text-white hover:scale-110 active:scale-95 transition-all"
                        >
                            <HiOutlineRefresh className="w-5 h-5" />
                        </button>
                    </div>
                 </div>

                <img src={resultImage} alt="Neural Asset" className="w-full h-auto rounded-[32px] grayscale hover:grayscale-0 transition-all duration-[2000ms]" />
              </div>
              
              {enhancedPrompt && (
                <div className="mt-12 px-10 py-10 glass-premium rounded-[32px] border-white/5">
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.5em] block mb-8">Architectural Metadata</span>
                  <p className="text-gray-500 font-medium text-lg leading-relaxed italic pr-12">
                    "{enhancedPrompt}"
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Archive Section */}
        <section className="pt-20 border-t border-white/5">
           <div className="text-center mb-24">
              <h2 className="text-4xl archon-heading mb-4">Neural Archive</h2>
              <div className="w-px h-16 bg-white/10 mx-auto" />
           </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(Array.isArray(history) ? history : []).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="aspect-square glass-premium rounded-[32px] group overflow-hidden border-white/5 hover:border-white/20 transition-all"
              >
                <img src={item.enhanced_url} alt="Archive" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <a href={item.enhanced_url} target="_blank" rel="noreferrer" className="pill-button pill-primary py-3 !px-6 !text-[8px]">
                     View Matrix
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
