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
    <div className="min-h-screen pt-12 px-6 lg:px-20 pb-32 text-slate-200 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Nav Indicator */}
        <div className="mb-16 flex items-end justify-between">
           <div className="space-y-3">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.4em] block">System Logic 10.0</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase">
                {mode === 'synth' ? 'Synthesis Alpha' : 'Asset Enhancement'}
              </h2>
           </div>
           <div className="hidden md:flex items-center gap-4 py-3 px-6 glass rounded-full border-white/5">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Neural Link Steady</span>
           </div>
        </div>

        {/* Console Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <div className="glass-strong p-2 overflow-hidden shadow-2xl">
                {mode === 'synth' ? (
                  <div className="relative group">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
                      placeholder="Input architectural neural prompt..."
                      className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-8 text-lg sm:text-xl font-medium tracking-tight h-[400px] resize-none focus:outline-none focus:bg-white/[0.04] transition-all input-glow"
                    />
                    <div className="absolute bottom-6 right-8 text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">
                      {prompt.length} / 500
                    </div>
                  </div>
                ) : (
                  <div className="relative group p-20 border border-white/5 rounded-[4rem] flex flex-col items-center justify-center bg-white/[0.01] hover:bg-white/[0.02] transition-colors cursor-pointer min-h-[500px]">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                    />
                    <div className="flex flex-col items-center gap-12 text-center pointer-events-none">
                      <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-500/10 flex items-center justify-center text-slate-700 group-hover:text-white transition-all duration-700 shadow-inner group-hover:scale-110">
                        <HiOutlineCloudUpload className="w-12 h-12" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-black uppercase tracking-[0.4em] text-white">Select Asset</h3>
                        <p className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.3em]">
                            Max Payload: 10MB (JPG, PNG, WEBP)
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
              className={`w-full mt-8 py-6 rounded-2xl font-black text-sm uppercase tracking-[0.5em] transition-all flex items-center justify-center gap-5 ${
                isGenerating 
                ? 'bg-white/5 text-slate-600 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-2xl shadow-indigo-600/20'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Forging Neural Matrix...
                </>
              ) : (
                <>
                  <HiOutlineSparkles className="w-5 h-5" />
                  {mode === 'synth' ? 'Initialize Synthesis' : 'Enhance Asset'}
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Context Sidebar */}
          <div className="lg:col-span-5 space-y-8">
              <div className="glass p-8">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] mb-6">Engine Protocols</h4>
                  <ul className="space-y-4">
                      {['Sub-pixel Optimization', 'Spatial Depth Estimation', 'Chromatic Correction'].map(p => (
                          <li key={p} className="flex items-center gap-4 text-xs font-medium text-slate-400">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/40" />
                              {p}
                          </li>
                      ))}
                  </ul>
              </div>
              
              <div className="glass p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                      <HiOutlineSparkles className="w-20 h-20" />
                  </div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] mb-4">Neural Guidance</h4>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                      "For extreme architectural fidelity, include lighting terminology such as 'volumetric scattering' or 'global illumination' in your prompt matrix."
                  </p>
              </div>
          </div>
        </div>

        {/* Result Stage */}
        <AnimatePresence mode="wait">
          {resultImage && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-20"
            >
               <div className="text-center mb-12">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.8em]">Synthesis Yield</span>
               </div>
               
               <div className="glass-strong p-4 max-w-4xl mx-auto shadow-3xl group relative overflow-hidden animate-in fade-in zoom-in duration-1000">
                  <div className="absolute top-8 right-8 z-20 flex gap-4">
                      <a href={resultImage} download className="p-4 glass rounded-xl text-white hover:bg-white hover:text-black transition-all shadow-2xl">
                          <HiOutlineDownload className="w-6 h-6" />
                      </a>
                      <button onClick={clearResult} className="p-4 glass rounded-xl text-white hover:bg-white/10 transition-all border-white/5">
                          <HiOutlineRefresh className="w-6 h-6" />
                      </button>
                  </div>
                  
                  <img src={resultImage} alt="Forge Output" className="w-full h-auto rounded-xl shadow-inner transition-transform duration-[5s] hover:scale-105" />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
