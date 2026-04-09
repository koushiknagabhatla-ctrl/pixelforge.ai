import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useImageStore from '../store/useImageStore';
import { HiOutlineSparkles, HiOutlineDownload, HiOutlineRefresh, HiOutlineCloudUpload } from 'react-icons/hi';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { isGenerating, resultImage, generateImage, runTool, fetchHistory, clearResult } = useImageStore();
  const [prompt, setPrompt] = useState("");
  const [searchParams] = useSearchParams();
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
    <div className="min-h-screen pt-24 px-6 lg:px-20 pb-40 text-platinum relative selection:bg-white/10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Nav Indicator */}
        <div className="mb-20 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-8">
           <div className="space-y-4">
              <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] block">Architectural Protocol v12.0</span>
              <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                {mode === 'synth' ? 'Image Generation' : 'Asset Enhancement'}
              </h2>
           </div>
           <div className="flex items-center gap-6 py-4 px-8 glass-premium border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" />
              <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Neural Link Secure</span>
           </div>
        </div>

        {/* Console Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 h-full"
          >
            <div className="glass-strong p-3 h-full flex flex-col shadow-3xl border border-white/5">
                {mode === 'synth' ? (
                  <div className="relative group flex-1">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
                      placeholder="Input architectural neural directive..."
                      className="w-full h-[450px] bg-white/[0.01] border border-white/5 rounded-[2rem] p-10 text-xl font-medium tracking-tight resize-none focus:outline-none focus:bg-white/[0.02] transition-all duration-700 placeholder:text-gray-800"
                    />
                    <div className="absolute bottom-10 right-10 text-[9px] font-black text-gray-800 uppercase tracking-[0.3em]">
                      Intensity :: {prompt.length} / 500
                    </div>
                  </div>
                ) : (
                  <div className="tool-dropzone flex flex-col items-center justify-center min-h-[450px] flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                    />
                    <div className="flex flex-col items-center gap-12 text-center pointer-events-none">
                      <div className="w-32 h-32 rounded-[3rem] glass-premium flex items-center justify-center text-gray-600 group-hover:text-white transition-all duration-700 group-hover:scale-110 border border-white/5">
                        <HiOutlineCloudUpload className="w-10 h-10" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-3xl font-black uppercase tracking-[0.4em] text-white">Select Raw Asset</h3>
                        <p className="text-[10px] font-black text-gray-800 uppercase tracking-[0.4em]">
                             JPG / PNG / WEBP :: LIMIT 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </div>

            <motion.button
              onClick={handleForge}
              disabled={isGenerating || (mode === 'synth' ? !prompt.trim() : !selectedFile)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full mt-10 py-8 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.6em] transition-all flex items-center justify-center gap-6 border border-white/5 ${
                isGenerating 
                ? 'bg-white/5 text-gray-800 cursor-not-allowed' 
                : 'bg-white text-black hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)]'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Deconstructing Matrix...
                </>
              ) : (
                <>
                  <HiOutlineSparkles className="w-5 h-5" />
                  {mode === 'synth' ? 'Execute Synthesis' : 'Enhance Architecture'}
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Context Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-10">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-premium p-10 flex-1 border border-white/5"
              >
                  <h4 className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-10">Engine Directives</h4>
                  <ul className="space-y-8">
                      {[
                        { name: 'Sub-pixel Precision', status: 'Active' },
                        { name: 'Contrast Calibration', status: 'Standby' },
                        { name: 'Spatial Denoise', status: 'Optimized' }
                      ].map(p => (
                          <li key={p.name} className="flex flex-col gap-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">{p.name}</span>
                                <span className="text-[8px] font-bold text-gray-800 uppercase tracking-widest">{p.status}</span>
                              </div>
                              <div className="w-full h-1 bg-white/[0.02] rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 2 }}
                                    className="h-full bg-white/10"
                                  />
                              </div>
                          </li>
                      ))}
                  </ul>
              </motion.div>
              
              <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.4 }}
                 className="glass p-10 relative overflow-hidden group border border-white/5"
              >
                  <h4 className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-6">Neural Tip</h4>
                  <p className="text-[11px] text-gray-400 leading-loose italic uppercase tracking-wider font-medium">
                      "For maximum depth clarity, use lighting terminology such as 'monochrome high-contrast' or 'soft diffused studio' in your prompt matrix."
                  </p>
              </motion.div>
          </div>
        </div>

        {/* Result Stage */}
        <AnimatePresence mode="wait">
          {resultImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-32 pt-20 border-t border-white/5"
            >
               <div className="text-center mb-16">
                  <span className="text-[10px] font-black text-white uppercase tracking-[1em]">Forged Entity</span>
               </div>
               
               <div className="max-w-5xl mx-auto glass-strong p-4 relative group overflow-hidden shadow-[0_60px_100px_rgba(0,0,0,0.8)] border border-white/10">
                  <div className="absolute top-10 right-10 z-20 flex gap-6">
                      <a href={resultImage} download className="h-16 w-16 glass rounded-2xl text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 shadow-2xl">
                          <HiOutlineDownload className="w-6 h-6" />
                      </a>
                      <button onClick={clearResult} className="h-16 w-16 glass rounded-2xl text-white flex items-center justify-center hover:bg-neutral-900 transition-all duration-500">
                          <HiOutlineRefresh className="w-6 h-6" />
                      </button>
                  </div>
                  
                  <img 
                    src={resultImage} 
                    alt="Forge Output" 
                    className="w-full h-auto rounded-[1.5rem] transition-all duration-[3s] group-hover:scale-[1.02] filter grayscale-[0.2] group-hover:grayscale-0" 
                  />
                  
                  {/* Neural Overlay Decor */}
                  <div className="absolute inset-0 opacity-[0.03] neural-grain pointer-events-none" />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
