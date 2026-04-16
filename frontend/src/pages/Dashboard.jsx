import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useImageStore from '../store/useImageStore';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { HiOutlineSparkles, HiOutlineDownload, HiOutlineRefresh, HiOutlineCloudUpload, HiOutlineCheckCircle } from 'react-icons/hi';
import { LiquidButton } from '../components/ui/liquid-glass-button';

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

  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

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
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      clearResult();
    }
  };

  return (
    <div className="min-h-screen pt-8 px-4 sm:px-8 lg:px-24 pb-32 font-sans relative selection:bg-indigo-500/20 bg-transparent flex flex-col justify-center">
      
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* HEADER */}
        <div className="mb-10 sm:mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/5 border border-indigo-500/10">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-200/60">Workspace Active</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300/40 tracking-tighter leading-none font-['Manrope']">
                {mode === 'generate' ? 'Image Generator' : 'Image Enhancer'}
              </h2>
           </div>
        </div>

        {/* CREATION MODULE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 flex flex-col h-full"
          >
            <div
              className="p-2 sm:p-3 flex-1 flex flex-col border border-white/[0.06] relative overflow-hidden rounded-3xl backdrop-blur-2xl"
              style={{
                background: 'linear-gradient(160deg, rgba(20,20,35,0.7) 0%, rgba(10,10,18,0.8) 100%)',
                boxShadow: '0 0 6px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.08), inset 3px 3px 0.5px -3px rgba(99,102,241,0.1), inset -3px -3px 0.5px -3px rgba(99,102,241,0.08), 0 0 12px rgba(99,102,241,0.04)',
              }}
            >
                
                {mode === 'generate' ? (
                  <div className="relative flex-1 flex flex-col">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
                      placeholder="Describe what you want to create..."
                      className="flex-1 w-full min-h-[300px] bg-transparent rounded-2xl p-6 sm:p-8 text-base sm:text-lg font-medium resize-none focus:outline-none transition-all placeholder:text-white/10 text-white"
                    />
                    <div className="absolute bottom-6 right-6 text-[10px] font-bold text-white/15 uppercase tracking-wider">
                      {prompt.length} / 500
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[400px] flex-1 relative overflow-hidden rounded-2xl">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30" 
                    />
                    
                    {previewUrl ? (
                        <>
                          <div className="absolute inset-0 bg-cover bg-center blur-3xl opacity-20" style={{ backgroundImage: `url(${previewUrl})` }} />
                          <div className="absolute inset-0 bg-black/30 z-10" />
                          <img src={previewUrl} alt="Preview" className="w-[80%] h-[80%] object-contain rounded-xl relative z-20 shadow-2xl border border-white/[0.06]" />
                          <div className="absolute top-4 right-4 z-40">
                              <div className="px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-full flex gap-2 items-center border border-white/[0.08]">
                                  <HiOutlineCheckCircle className="w-4 h-4 text-indigo-300" />
                                  <span className="text-[9px] font-bold text-indigo-200/80 uppercase tracking-wider">Loaded</span>
                              </div>
                          </div>
                        </>
                    ) : (
                      <div className="flex flex-col items-center gap-5 text-center pointer-events-none p-6 z-20">
                        <div className="w-20 h-20 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-300">
                          <HiOutlineCloudUpload className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-white/80 tracking-tight font-['Manrope']">Upload Image</h3>
                          <p className="text-xs text-white/25">Select a local image file to enhance</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
            </div>

            {/* Execute button with liquid glass effect */}
            <div className="mt-4 flex justify-center">
              <LiquidButton
                onClick={handleExecute}
                disabled={isGenerating || (mode === 'generate' ? !prompt.trim() : !selectedFile)}
                className={`w-full h-16 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all ${
                  isGenerating 
                  ? 'text-white/30 cursor-not-allowed' 
                  : 'text-white cursor-pointer hover:scale-[1.01]'
                }`}
                size="xxl"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/10 border-t-indigo-400 rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <HiOutlineSparkles className="w-5 h-5" />
                    {mode === 'generate' ? 'Generate Image' : 'Enhance Image'}
                  </>
                )}
              </LiquidButton>
            </div>
          </motion.div>

          {/* INSTRUCTIONS */}
          <div className="lg:col-span-4 flex flex-col">
              <div
                className="p-6 sm:p-8 flex-1 flex flex-col justify-center relative overflow-hidden rounded-3xl backdrop-blur-2xl border border-white/[0.06]"
                style={{
                  background: 'linear-gradient(160deg, rgba(20,20,35,0.5) 0%, rgba(10,10,18,0.6) 100%)',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
                }}
              >
                  <div className="px-4 py-1.5 mb-8 w-fit rounded-full bg-indigo-500/5 border border-indigo-500/10">
                    <h4 className="text-[10px] font-bold text-indigo-200/50 uppercase tracking-[0.3em]">Guidelines</h4>
                  </div>
                  <ul className="space-y-6 text-sm text-white/35 font-medium leading-relaxed">
                      <li className="flex gap-4 group cursor-default">
                          <span className="text-indigo-400/30 font-bold text-xs shrink-0">01</span>
                          <span className="group-hover:text-white/60 transition-colors">Provide maximum specificity in your prompt.</span>
                      </li>
                      <li className="flex gap-4 group cursor-default">
                          <span className="text-indigo-400/30 font-bold text-xs shrink-0">02</span>
                          <span className="group-hover:text-white/60 transition-colors">Select the correct mode from the navbar toggle.</span>
                      </li>
                      <li className="flex gap-4 group cursor-default">
                          <span className="text-indigo-400/30 font-bold text-xs shrink-0">03</span>
                          <span className="group-hover:text-white/60 transition-colors">Click generate and wait for the neural engine.</span>
                      </li>
                  </ul>
              </div>
          </div>
        </div>

        {/* RESULT STAGE */}
        <AnimatePresence mode="wait">
          {resultImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 relative"
            >
               {mode === 'enhance' ? (
                 <div className="px-4 py-1.5 rounded-full bg-indigo-500/5 border border-indigo-500/10 absolute -top-12 left-1/2 -translate-x-1/2 z-20">
                    <h4 className="text-[10px] font-bold text-indigo-200/50 uppercase tracking-[0.3em]">Interactive Comparison</h4>
                 </div>
               ) : null}
               
               <div
                 className="w-full max-w-5xl mx-auto p-4 relative group overflow-hidden border border-white/[0.06] rounded-3xl backdrop-blur-2xl"
                 style={{
                   background: 'linear-gradient(160deg, rgba(20,20,35,0.6) 0%, rgba(10,10,18,0.7) 100%)',
                   boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                 }}
               >
                  <div className="absolute top-6 right-6 z-50 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <a href={resultImage} download className="h-12 w-12 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white flex items-center justify-center hover:bg-indigo-500/20 transition-colors backdrop-blur-xl">
                          <HiOutlineDownload className="w-5 h-5" />
                      </a>
                      <button onClick={clearResult} className="h-12 w-12 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.1] transition-colors backdrop-blur-xl">
                          <HiOutlineRefresh className="w-5 h-5" />
                      </button>
                  </div>
                  
                  <div className="relative rounded-2xl overflow-hidden w-full bg-black/30 border border-white/[0.04]">
                      {mode === 'enhance' && previewUrl ? (
                         <div className="w-full relative aspect-square sm:aspect-video rounded-2xl overflow-hidden">
                             <ReactCompareSlider
                                itemOne={<ReactCompareSliderImage src={previewUrl} alt="Original Image" className="object-contain w-full h-full" />}
                                itemTwo={<ReactCompareSliderImage src={resultImage} alt="Enhanced Image" className="object-contain w-full h-full" />}
                                className="w-full h-full rounded-2xl"
                             />
                         </div>
                      ) : (
                         <img src={resultImage} alt="Generated Asset" className="w-full h-auto object-contain rounded-2xl" />
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
