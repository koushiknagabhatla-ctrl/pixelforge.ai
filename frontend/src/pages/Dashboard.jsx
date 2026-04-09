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
    <div className="min-h-screen pt-20 px-4 sm:px-8 lg:px-24 pb-32 font-sans relative selection:bg-white/10">
      <div className="max-w-6xl mx-auto">
        
        {/* 🎭 HEADER STAGE (v26.0 DASHBOARD) */}
        <div className="mb-8 sm:mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-10">
           <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="glass-text-inner !px-3 !py-0.5">
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.5em] block">NEXUS CORE v26.0</span>
                  </div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
                {mode === 'synth' ? <><span className="text-gray-700">Image</span> Generation</> : <><span className="text-gray-700">Local</span> Enhancer</>}
              </h2>
           </div>
           <div className="flex items-center gap-6 py-3 px-6 sm:py-4 sm:px-8 glass border-white/5 shadow-2xl">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/40 animate-pulse border border-white/10" />
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Engine Safe</span>
           </div>
        </div>

        {/* 🏛️ WORKSPACE ARCHITECTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mb-10 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8"
          >
            <div className="glass-premium p-1 sm:p-4 h-full flex flex-col border border-white/10 shadow-3xl relative overflow-hidden group">
                
                {mode === 'synth' ? (
                  <div className="relative flex-1">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
                      placeholder="Describe the directives..."
                      className="w-full h-64 sm:h-80 bg-[#050505]/40 border border-white/[0.03] rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 text-base sm:text-lg font-medium resize-none focus:outline-none focus:bg-white/[0.04] transition-all duration-1000 placeholder:text-gray-900 leading-relaxed"
                    />
                    <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 text-[9px] sm:text-[10px] font-black text-gray-900 uppercase tracking-widest">
                      {prompt.length} / 500
                    </div>
                  </div>
                ) : (
                  <div className="tool-dropzone flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] flex-1 border-white/[0.05] relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                    />
                    <div className="flex flex-col items-center gap-6 sm:gap-10 text-center pointer-events-none p-6">
                      <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-[1.2rem] sm:rounded-[1.5rem] glass-strong flex items-center justify-center text-white/30 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-700">
                        <HiOutlineCloudUpload className="w-8 h-8 sm:w-10 sm:h-10" />
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="glass-text-inner !px-4 !py-1 sm:!px-5 sm:!py-1">
                            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight uppercase">Upload Directive</h3>
                        </div>
                        <p className="text-[9px] sm:text-[10px] font-black text-gray-800 uppercase tracking-[0.4em]">
                             ASSET MODULE :: MAX 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </div>

            <button
              onClick={handleForge}
              disabled={isGenerating || (mode === 'synth' ? !prompt.trim() : !selectedFile)}
              className={`w-full mt-6 sm:mt-10 h-16 sm:h-20 rounded-[1.5rem] sm:rounded-[2rem] font-black text-[10px] sm:text-[12px] uppercase tracking-[0.6em] transition-all duration-1000 flex items-center justify-center gap-5 sm:gap-8 border border-white/5 shadow-2xl ${
                isGenerating 
                ? 'bg-white/5 text-gray-800 cursor-not-allowed' 
                : 'bg-white text-black hover:scale-[1.01] active:scale-[0.98] shadow-white/10 shadow-4xl'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                  Forging...
                </>
              ) : (
                <>
                  <HiOutlineSparkles className="w-5 h-5" />
                  Initialize Matrix
                </>
              )}
            </button>
          </motion.div>

          {/* 📜 NEURAL DIRECTIVES */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8">
              <div className="glass-premium p-8 sm:p-10 flex-1 border border-white/10 flex flex-col justify-center relative overflow-hidden">
                  <div className="glass-text-inner !px-4 !py-1 mb-6 sm:mb-10 w-fit">
                    <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em]">Directives</h4>
                  </div>
                  <ul className="space-y-5 sm:space-y-8 text-[10px] sm:text-[11px] text-gray-600 font-bold uppercase tracking-widest leading-loose">
                      <li className="flex gap-4 sm:gap-5 group hover:text-white transition-colors cursor-default">
                          <span className="text-white/10 group-hover:text-white/40 transition-colors">01</span>
                          <span>Maintain fidelity.</span>
                      </li>
                      <li className="flex gap-4 sm:gap-5 group hover:text-white transition-colors cursor-default">
                          <span className="text-white/10 group-hover:text-white/40 transition-colors">02</span>
                          <span>Calibrate lux.</span>
                      </li>
                      <li className="flex gap-4 sm:gap-5 group hover:text-white transition-colors cursor-default">
                          <span className="text-white/10 group-hover:text-white/40 transition-colors">03</span>
                          <span>Sync engine.</span>
                      </li>
                  </ul>
              </div>
          </div>
        </div>

        {/* 🎞️ RESULT STAGE */}
        <AnimatePresence mode="wait">
          {resultImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 sm:mt-32 pt-10 sm:pt-28 border-t border-white/5"
            >
               <div className="max-w-4xl mx-auto glass-hyper p-2 sm:p-4 relative group overflow-hidden shadow-6xl border border-white/10 rounded-[2.5rem] sm:rounded-[3.5rem]">
                  <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-20 flex gap-4 sm:gap-6 opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-4 group-hover:translate-y-0">
                      <a href={resultImage} download className="h-12 w-12 sm:h-16 sm:w-16 glass-premium rounded-xl sm:rounded-2xl text-white flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-4xl backdrop-blur-3xl">
                          <HiOutlineDownload className="w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                      <button onClick={clearResult} className="h-12 w-12 sm:h-16 sm:w-16 glass-premium rounded-xl sm:rounded-2xl text-white flex items-center justify-center hover:bg-white/10 transition-all shadow-4xl backdrop-blur-3xl">
                          <HiOutlineRefresh className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                  </div>
                  <img src={resultImage} alt="Neural Output" className="w-full h-auto rounded-[2rem] sm:rounded-[3rem] shadow-black shadow-4xl" />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
