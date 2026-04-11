import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useImageStore from '../store/useImageStore';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { HiOutlineSparkles, HiOutlineDownload, HiOutlineRefresh, HiOutlineCloudUpload, HiOutlineCheckCircle } from 'react-icons/hi';
import ParticleBackground from '../components/ParticleBackground';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { isGenerating, resultImage, generateImage, runTool, fetchHistory, clearResult } = useImageStore();
  const [prompt, setPrompt] = useState("");
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'generate'; 
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (user) fetchHistory(user.id);
  }, [user]);

  // Cleanup ObjectURLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Clean dashboard on mode change
  useEffect(() => {
     clearResult();
     setSelectedFile(null);
     if (previewUrl) URL.revokeObjectURL(previewUrl);
     setPreviewUrl(null);
  }, [mode]);

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
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create a fast local rendered preview of the selected image
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      clearResult(); // if uploading a new file, clear the old result
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-8 lg:px-24 pb-32 font-sans relative selection:bg-white/10 bg-transparent flex flex-col justify-center">
      
      {/* 🚀 FLAWLESS HTML5 3D PARTICLE ENGINE */}
      <ParticleBackground />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* 🎭 HEADER SECTION */}
        <div className="mb-10 sm:mb-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-10">
           <div className="space-y-4">
              <div className="inline-block relative">
                <div className="absolute inset-0 bg-white blur-xl opacity-10 rounded-full" />
                <div className="glass-premium flex items-center gap-2 sm:gap-3 px-5 py-2 rounded-full border border-white/20 relative z-10 shadow-2xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white">Workspace Active</span>
                </div>
              </div>
              <h2 className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600 tracking-tighter leading-none uppercase">
                {mode === 'generate' ? 'Image Generator' : 'Image Upscaler'}
              </h2>
           </div>
        </div>

        {/* 🏛️ CREATION MODULE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 flex flex-col h-full"
          >
            <div className="glass-hyper p-2 sm:p-4 flex-1 flex flex-col border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group rounded-[3rem] bg-black/60 backdrop-blur-3xl">
                
                {mode === 'generate' ? (
                  <div className="relative flex-1 flex flex-col">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
                      placeholder="Describe what you want to create natively..."
                      className="flex-1 w-full min-h-[300px] bg-transparent rounded-[2.5rem] p-8 sm:p-10 text-[18px] sm:text-[22px] font-medium resize-none focus:outline-none transition-all placeholder:text-gray-700 text-white"
                    />
                    <div className="absolute bottom-8 right-8 text-[11px] font-black text-gray-500 uppercase tracking-[0.3em]">
                      {prompt.length} / 500
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[400px] flex-1 relative overflow-hidden rounded-[2.5rem]">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30" 
                    />
                    
                    {/* VISUAL PREVIEW ENGINE */}
                    {previewUrl ? (
                        <>
                          <div className="absolute inset-0 bg-cover bg-center blur-3xl opacity-30" style={{ backgroundImage: `url(${previewUrl})` }} />
                          <div className="absolute inset-0 bg-black/40 z-10" />
                          <img src={previewUrl} alt="Preview" className="w-[80%] h-[80%] object-contain rounded-2xl relative z-20 shadow-2xl border border-white/10 group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute top-6 right-6 z-40">
                              <div className="glass-premium px-4 py-2 border-white/20 rounded-full flex gap-2 items-center bg-black/60 shadow-xl">
                                  <HiOutlineCheckCircle className="w-5 h-5 text-white" />
                                  <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] mt-0.5">Media Loaded</span>
                              </div>
                          </div>
                        </>
                    ) : (
                      <div className="flex flex-col items-center gap-6 text-center pointer-events-none p-6 z-20">
                        <div className="w-24 h-24 rounded-3xl glass-hyper flex items-center justify-center text-white border border-white/20 shadow-2xl bg-white/5">
                          <HiOutlineCloudUpload className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-3xl font-black text-white tracking-tight uppercase">Upload Target</h3>
                          <p className="text-[12px] font-black text-gray-500 uppercase tracking-[0.3em]">
                               Select a local image file
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
            </div>

            <button
              onClick={handleExecute}
              disabled={isGenerating || (mode === 'generate' ? !prompt.trim() : !selectedFile)}
              className={`w-full mt-6 h-20 sm:h-24 rounded-[3rem] font-black text-[13px] uppercase tracking-[0.4em] transition-all duration-300 flex items-center justify-center gap-4 ${
                isGenerating 
                ? 'bg-white/5 text-gray-600 cursor-not-allowed border-white/5' 
                : 'glass-hyper bg-white hover:bg-gray-200 text-black shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_80px_rgba(255,255,255,0.6)] cursor-pointer hover:scale-[1.01]'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-6 h-6 border-[3px] border-black/10 border-t-white rounded-full animate-spin" />
                  Synthesis engaged...
                </>
              ) : (
                <>
                  <HiOutlineSparkles className="w-6 h-6" />
                  {mode === 'generate' ? 'Generate Target' : 'Enhance Target'}
                </>
              )}
            </button>
          </motion.div>

          {/* 📜 INSTRUCTIONS */}
          <div className="lg:col-span-4 flex flex-col">
              <div className="glass-hyper p-8 sm:p-12 flex-1 border border-white/10 flex flex-col justify-center relative overflow-hidden rounded-[3rem] bg-black/40 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,1)]">
                  <div className="glass-premium px-5 py-2 mb-10 w-fit rounded-full border border-white/20">
                    <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Guidelines</h4>
                  </div>
                  <ul className="space-y-8 text-[13px] text-gray-400 font-bold uppercase tracking-[0.2em] leading-loose">
                      <li className="flex gap-5 group cursor-default">
                          <span className="text-white/20 select-none">01</span>
                          <span className="group-hover:text-white transition-colors">Provide maximum specificity.</span>
                      </li>
                      <li className="flex gap-5 group cursor-default">
                          <span className="text-white/20 select-none">02</span>
                          <span className="group-hover:text-white transition-colors">Select the correct mode.</span>
                      </li>
                      <li className="flex gap-5 group cursor-default">
                          <span className="text-white/20 select-none">03</span>
                          <span className="group-hover:text-white transition-colors">Deploy and wait for engine.</span>
                      </li>
                  </ul>
              </div>
          </div>
        </div>

        {/* 🎞️ RESULT STAGE (NATIVE COMPARE SLIDER) */}
        <AnimatePresence mode="wait">
          {resultImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-20 relative"
            >
               {mode === 'enhance' ? (
                 <div className="glass-premium px-5 py-2 rounded-full border border-white/20 absolute -top-16 left-1/2 -translate-x-1/2 z-20">
                    <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] shadow-xl">Interactive Comparison</h4>
                 </div>
               ) : null}
               
               <div className="w-full max-w-5xl mx-auto glass-hyper p-6 relative group overflow-hidden border border-white/10 rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,1)] bg-black/60">
                  <div className="absolute top-10 right-10 z-50 flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <a href={resultImage} download className="h-16 w-16 glass-hyper rounded-2xl text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-3xl border border-white/20 shadow-2xl">
                          <HiOutlineDownload className="w-6 h-6" />
                      </a>
                      <button onClick={clearResult} className="h-16 w-16 glass-hyper rounded-2xl text-white flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-3xl border border-white/20 shadow-2xl">
                          <HiOutlineRefresh className="w-6 h-6" />
                      </button>
                  </div>
                  
                  <div className="relative rounded-[3rem] overflow-hidden w-full bg-black/50 border border-white/5">
                      {mode === 'enhance' && previewUrl ? (
                         <div className="w-full relative aspect-square sm:aspect-video rounded-[3rem] overflow-hidden">
                             <ReactCompareSlider
                                itemOne={<ReactCompareSliderImage src={previewUrl} alt="Original Image" className="object-contain w-full h-full" />}
                                itemTwo={<ReactCompareSliderImage src={resultImage} alt="Enhanced Image" className="object-contain w-full h-full" />}
                                className="w-full h-full rounded-[3rem]"
                             />
                         </div>
                      ) : (
                         <img src={resultImage} alt="Generated Asset" className="w-full h-auto object-contain rounded-[3rem]" />
                      )}
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
