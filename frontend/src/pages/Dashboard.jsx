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
    <div className="min-h-screen pt-32 px-10 lg:px-28 pb-56 font-sans relative selection:bg-white/10">
      <div className="max-w-6xl mx-auto">
        
        {/* 🎭 HEADER STAGE (NEURAL BLACK) */}
        <div className="mb-24 flex flex-col md:flex-row items-end md:items-center justify-between gap-12">
           <div className="space-y-5">
              <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <span className="text-[11px] font-black text-gray-800 uppercase tracking-[0.6em] block">NEXUS CORE v16.0</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                {mode === 'synth' ? <><span className="text-gray-600">Image</span> Generation</> : <><span className="text-gray-600">Asset</span> Enhancer</>}
              </h2>
           </div>
           <div className="flex items-center gap-7 py-5 px-10 glass-strong border-white/5 shadow-2xl">
              <div className="w-3 h-3 rounded-full bg-white/40 animate-pulse border border-white/10" />
              <span className="text-[11px] font-black text-white/30 uppercase tracking-[0.5em]">Forge Initialized</span>
           </div>
        </div>

        {/* 🏛️ WORKSPACE ARCHITECTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8"
          >
            <div className="glass-premium p-4 h-full flex flex-col border border-white/10 shadow-[0_60px_100px_rgba(0,0,0,0.9)] relative overflow-hidden group">
                <div className="absolute inset-0 neural-grain opacity-[0.04] pointer-events-none" />
                
                {mode === 'synth' ? (
                  <div className="relative flex-1">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
                      placeholder="Describe the architectural directives..."
                      className="w-full h-96 bg-[#050505]/40 border border-white/[0.03] rounded-[2.5rem] p-12 text-xl font-medium resize-none focus:outline-none focus:bg-white/[0.04] transition-all duration-1000 placeholder:text-gray-800 leading-relaxed"
                    />
                    <div className="absolute bottom-10 right-12 text-[11px] font-black text-gray-800 uppercase tracking-widest">
                      {prompt.length} / 500
                    </div>
                  </div>
                ) : (
                  <div className="tool-dropzone flex flex-col items-center justify-center min-h-[450px] flex-1 border-white/[0.05]">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                    />
                    <div className="flex flex-col items-center gap-10 text-center pointer-events-none">
                      <div className="w-28 h-28 rounded-[2rem] glass-strong flex items-center justify-center text-white/30 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-700">
                        <HiOutlineCloudUpload className="w-12 h-12" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-3xl font-black text-white tracking-tight">Upload Directive</h3>
                        <p className="text-[11px] font-black text-gray-700 uppercase tracking-[0.4em]">
                             VOLUMETRIC ASSET :: MAX 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </div>

            <button
              onClick={handleForge}
              disabled={isGenerating || (mode === 'synth' ? !prompt.trim() : !selectedFile)}
              className={`w-full mt-12 h-24 rounded-[3rem] font-black text-[14px] uppercase tracking-[0.6em] transition-all duration-1000 flex items-center justify-center gap-8 border border-white/5 shadow-inner ${
                isGenerating 
                ? 'bg-white/5 text-gray-800 cursor-not-allowed' 
                : 'bg-white text-black hover:scale-[1.03] active:scale-[0.98] shadow-white/10 shadow-4xl'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                  Forging Architecture...
                </>
              ) : (
                <>
                  <HiOutlineSparkles className="w-6 h-6" />
                  Initialize Matrix
                </>
              )}
            </button>
          </motion.div>

          {/* 📜 NEURAL DIRECTIVES */}
          <div className="lg:col-span-4 flex flex-col gap-10">
              <div className="glass-premium p-12 flex-1 border border-white/10 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute inset-0 neural-grain opacity-[0.02] pointer-events-none" />
                  <h4 className="text-[11px] font-black text-gray-700 uppercase tracking-[0.5em] mb-12">Neural Directives</h4>
                  <ul className="space-y-10 text-[13px] text-gray-500 font-bold uppercase tracking-widest leading-loose">
                      <li className="flex gap-5 group hover:text-white transition-colors cursor-default">
                          <span className="text-white/10 group-hover:text-white/40 transition-colors">01</span>
                          <span>Analyze spatial fidelity.</span>
                      </li>
                      <li className="flex gap-5 group hover:text-white transition-colors cursor-default">
                          <span className="text-white/10 group-hover:text-white/40 transition-colors">02</span>
                          <span>Calibrate volumetric lux.</span>
                      </li>
                      <li className="flex gap-5 group hover:text-white transition-colors cursor-default">
                          <span className="text-white/10 group-hover:text-white/40 transition-colors">03</span>
                          <span>Synchronize Klein engine.</span>
                      </li>
                  </ul>
              </div>
          </div>
        </div>

        {/* 🎞️ RESULT STAGE */}
        <AnimatePresence mode="wait">
          {resultImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-40 pt-32 border-t border-white/5"
            >
               <div className="max-w-4xl mx-auto glass-hyper p-5 relative group overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,1)] border border-white/10 rounded-[4rem]">
                  <div className="absolute inset-0 neural-grain opacity-[0.06] pointer-events-none" />
                  <div className="absolute top-12 right-12 z-20 flex gap-8 opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-6 group-hover:translate-y-0">
                      <a href={resultImage} download className="h-20 w-20 glass-premium rounded-3xl text-white flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-4xl backdrop-blur-3xl">
                          <HiOutlineDownload className="w-8 h-8" />
                      </a>
                      <button onClick={clearResult} className="h-20 w-20 glass-premium rounded-3xl text-white flex items-center justify-center hover:bg-white/10 transition-all shadow-4xl backdrop-blur-3xl">
                          <HiOutlineRefresh className="w-8 h-8" />
                      </button>
                  </div>
                  <img src={resultImage} alt="Neural Output" className="w-full h-auto rounded-[3.5rem] shadow-black shadow-4xl" />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
