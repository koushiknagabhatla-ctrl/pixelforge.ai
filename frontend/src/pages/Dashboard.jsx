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
  const mode = searchParams.get('mode') || 'generate'; 
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (user) fetchHistory(user.id);
  }, [user]);

  const handleExecute = () => {
    if (mode === 'generate') {
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
    <div className="min-h-screen pt-24 px-4 sm:px-8 lg:px-24 pb-32 font-sans relative selection:bg-white/10 bg-[#010101]">
      <div className="max-w-6xl mx-auto">
        
        {/* 🎭 HEADER SECTION */}
        <div className="mb-10 sm:mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-10">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="glass-text-inner px-4 py-1">
                    <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em] block">Workspace Active</span>
                  </div>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-none">
                {mode === 'generate' ? <><span className="text-gray-600">Image</span> Generator</> : <><span className="text-gray-600">Image</span> Upscaler</>}
              </h2>
           </div>
           <div className="flex items-center gap-4 py-3 px-6 glass shadow-2xl rounded-xl">
              <div className="w-2.5 h-2.5 rounded-full border border-white/20 bg-green-500/80 animate-pulse" />
              <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">System Ready</span>
           </div>
        </div>

        {/* 🏛️ CREATION MODULE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 flex flex-col h-full"
          >
            <div className="glass-premium p-2 sm:p-4 flex-1 flex flex-col border border-white/10 shadow-2xl relative overflow-hidden group rounded-[2rem] bg-[#050505]/60">
                
                {mode === 'generate' ? (
                  <div className="relative flex-1 flex flex-col">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
                      placeholder="Describe what you want to create..."
                      className="flex-1 w-full min-h-[300px] bg-transparent rounded-[1.5rem] p-6 sm:p-8 text-base sm:text-lg font-medium resize-none focus:outline-none transition-all placeholder:text-gray-600 text-white"
                    />
                    <div className="absolute bottom-6 right-6 text-[10px] font-black text-gray-700 uppercase tracking-widest">
                      {prompt.length} / 500
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[300px] flex-1 relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    <div className="flex flex-col items-center gap-6 text-center pointer-events-none p-6">
                      <div className="w-20 h-20 rounded-2xl glass-strong flex items-center justify-center text-white border border-white/20 shadow-xl bg-white/5">
                        <HiOutlineCloudUpload className="w-10 h-10" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-black text-white tracking-tight uppercase">Upload Media</h3>
                        <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em]">
                             {selectedFile ? selectedFile.name : "Select an image (Max 4.5MB)"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </div>

            <button
              onClick={handleExecute}
              disabled={isGenerating || (mode === 'generate' ? !prompt.trim() : !selectedFile)}
              className={`w-full mt-6 h-16 sm:h-20 rounded-[1.5rem] font-black text-[12px] uppercase tracking-[0.4em] transition-all duration-300 flex items-center justify-center gap-4 border border-white/10 ${
                isGenerating 
                ? 'bg-white/5 text-gray-600 cursor-not-allowed' 
                : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <HiOutlineSparkles className="w-5 h-5" />
                  {mode === 'generate' ? 'Generate Image' : 'Enhance Image'}
                </>
              )}
            </button>
          </motion.div>

          {/* 📜 INSTRUCTIONS */}
          <div className="lg:col-span-4 flex flex-col">
              <div className="glass-premium p-8 sm:p-10 flex-1 border border-white/10 flex flex-col justify-center relative overflow-hidden rounded-[2rem] bg-[#050505]/40">
                  <div className="glass-text-inner px-4 py-2 mb-8 w-fit bg-black">
                    <h4 className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">Guidelines</h4>
                  </div>
                  <ul className="space-y-6 text-[12px] text-gray-400 font-bold uppercase tracking-widest leading-loose">
                      <li className="flex gap-4 group cursor-default">
                          <span className="text-white/20">01</span>
                          <span className="group-hover:text-white transition-colors">Be highly specific.</span>
                      </li>
                      <li className="flex gap-4 group cursor-default">
                          <span className="text-white/20">02</span>
                          <span className="group-hover:text-white transition-colors">Select correct modes.</span>
                      </li>
                      <li className="flex gap-4 group cursor-default">
                          <span className="text-white/20">03</span>
                          <span className="group-hover:text-white transition-colors">Wait for confirmation.</span>
                      </li>
                  </ul>
              </div>
          </div>
        </div>

        {/* 🎞️ RESULT STAGE */}
        <AnimatePresence mode="wait">
          {resultImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="mt-16 pt-16 border-t border-white/[0.05]"
            >
               <div className="max-w-4xl mx-auto glass-hyper p-4 relative group overflow-hidden border border-white/10 rounded-[2.5rem]">
                  <div className="absolute top-8 right-8 z-20 flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <a href={resultImage} download className="h-16 w-16 glass-premium rounded-2xl text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-3xl border border-white/20">
                          <HiOutlineDownload className="w-6 h-6" />
                      </a>
                      <button onClick={clearResult} className="h-16 w-16 glass-premium rounded-2xl text-white flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-3xl border border-white/20">
                          <HiOutlineRefresh className="w-6 h-6" />
                      </button>
                  </div>
                  <img src={resultImage} alt="Tool Result" className="w-full h-auto rounded-[2rem]" />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
